//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const electron = require('electron')
// Module to control application life.
const app = electron.app
const {ipcMain} = require('electron')
const path = require('path')
const fs = require('fs');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
//Adds the main Menu to our app

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let secondWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({titleBarStyle: 'hidden',
    width: 1281,
    height: 800,
    minWidth: 1281,
    minHeight: 800,
    backgroundColor: '#182962',
    show: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })

  secondWindow = new BrowserWindow({frame: false,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    maxWidth: 800,
    maxHeight: 600,
    backgroundColor: '#182962',
    show: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })

  secondWindow.loadURL(`file://${__dirname}/windows/generatewallet.html`)

  // and load the index.html of the app.
  fs.stat(userDataPath+'/wallet.dat', function(err, stat) {
    if(err == null) {
      console.log('File exists');
      mainWindow.loadURL(`file://${__dirname}/index.html`);
      //mainWindow.webContents.openDevTools();

    } //else if(err.code == 'ENOENT') {
        // file does not exist
        //fs.writeFile('log.txt', 'Some log\n');
      //}
      else {
        secondWindow.show();
             // secondWindow.webContents.openDevTools();
        console.log('Some error error: ', userDataPath);
        //fs.writeFile(userDataPath+'/wallet.dat', 'test', function(err, result) {
       //  if(err) console.log('error', err);
      // });
      }
    });


  // Show the mainwindow when it is loaded and ready to show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

    secondWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    createWindow();
  })

  require('./menu/mainmenu')
}

ipcMain.on('open-second-window', (event, arg)=> {
  secondWindow.show()
})

ipcMain.on('close-second-window', (event, arg)=> {
  secondWindow.hide()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
 // if (process.platform !== 'darwin') {
    app.quit()
  //}
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
