
// this file controls the electron instance that will run the app

const {app, BrowserWindow, ipcMain} = require('electron');
// require('electron-reload')(__dirname, {
//   ignored: /dev-scripts|node_modules/
// });

let win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(`file://${__dirname}/index.html`);
}

// look for an .oryxrc file in the home dir:
// it will define evernote api keys and stuff for user

app.on('ready', createWindow)
