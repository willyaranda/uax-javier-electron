const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

var Tray = require('tray');
var path = require('path');
var Menu = require('menu');


// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 900, height: 700});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

//Se mofidica el valor por defecto para hacer que la ventana se minimize
//a la barra de estado
    mainWindow.setSkipTaskbar(true);

//Se asigna la imagen y texto del icono en la barra de estado
    var appIcono = new Tray(path.join(__dirname, 'icono.png'));

//Iinicio en la barra de estado

    //mainWindow.setOverlayIcon(appIcono, "Trending Topics");


//Se define el menú de la aplicación con la opcion de salir
    var application_menu = [
    {
    label: 'Salir',
    submenu: [
      {
        label: 'Salir',
        //accelerator: 'CmdOrCtrl+Z',
        click: function() {
          var win = BrowserWindow.getFocusedWindow();
            win.close();
        }
      }
    ]}
  ];

  menu = Menu.buildFromTemplate(application_menu);
  Menu.setApplicationMenu(menu);


  mainWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
