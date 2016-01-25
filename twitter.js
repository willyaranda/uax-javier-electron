//Importacion API y registro datos de acceso
var Twitter = require('twitter');

var clientetwt = new Twitter({
 consumer_key: 'yq3aqNLCHTJnmxl0aGhHOmkWh',
 consumer_secret: '555wHnfOTQtURlZ96ncqRCKS35iZ1p8OkTxqDmy6tPN4IkVoYz',
 access_token_key: '741163074-CuiJHZPA1T77Qv79iUzAv35WmezdUIhX2kWotnLv',
 access_token_secret: 'lRrh9z1MaBGWgYbGYCy5zui8RXjh9oHGHDbWprgVX9E5R'
});

//Array que almacena los hastag ya mostrados como notificación
var hashtagUsados = [];


//Función de recuperación y escritura de Trending Topics
function nuevott(pnuevot) {

  var textbox1 = document.getElementById('intervalo');
  var list = document.getElementById('listatrending');
  var nuevotwt = document.createElement('li');

  var escribirtt = function(trending) {
    var cadenatrend;

//En caso de ser un hashtag se elimina la # de la URL para evitar errores
    if (trending[0] == '#') {
      cadenatrend = trending.substr(1,trending.length)}
    else {
      cadenatrend = trending
    };

//Definicion URL hipervinculo
    var cadena_busqueda = '"' + "https://twitter.com/search?q=%23" +
    cadenatrend + "&src=tyah" + '"';

//Se añade el Trending Topica la lista
    nuevotwt.innerHTML = "<a href=" + cadena_busqueda + ">" + trending + "</a>";
    list.appendChild(nuevotwt);
  };

//Implementación de la notificación de escritorio
  var sendDesktopNotification = function(hashtag) {
    new Notification('Nuevo hashtag:', {
    body: hashtag
  });
  }

//Recuperación de Trending Topics, procesado y salida
  var mostrartrendings = function(woeid) {
    clientetwt.get('trends/place', {id: woeid}, function(err, res) {
      var data = res[0];
      var trends = data.trends;
      trends.forEach(function(trend){
//Se añade el Trending Topic a la salida
        escribirtt(trend.name);
//Se comprueba si es hashtag y si ha sido mostrado buscándolo en el array
        if (trend.name[0] == '#') {
          if (hashtagUsados.indexOf(trend.name) == -1){
            hashtagUsados.push(trend.name);
            sendDesktopNotification(trend.name);
          }
        }
      });
    });
  }

//Recuperación de idenficador woid para las coordenadas de Madrid
  function getTrending() {

    clientetwt.get('trends/closest', {lat: 40.43, long: -3.67}, function(err, data) {
        mostrartrendings(data[0].woeid)});
  }

  getTrending();
}


window.onfocus = function() {
}

window.onblur = function() {

}

window.onresize = function() {

}

window.onload = function() {

  var remote = require('remote');
  var BrowserWindow = remote.require('browser-window');
  var win = BrowserWindow.getFocusedWindow();

//Se lee el valor almacenado en el texbox como segundos de refresco
  var tiempo = document.getElementById('intervalo');
  var tiemposeg = tiempo.value * 1000;
  var refrescoTT = window.setInterval(nuevott, tiemposeg);

  document.getElementById("intervalo").onchange = function() {
//Se interrumpe el intervalo  y se relanza con los segundos actualizados
    tiemposeg = tiempo.value * 1000;
    clearInterval(refrescoTT);
    refrescoTT = window.setInterval(nuevott, tiemposeg);
  }

//Recuperación de Trending Topics sin esperar al contador
  document.getElementById("nuevott").onclick = function() {
    nuevott()
  }
}
