import {app, BrowserWindow, screen, ipcMain} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
  const electronScreen = screen;
  const windowSize = electronScreen.getPrimaryDisplay().workAreaSize;
  const size = Object.assign({}, windowSize);

  if (serve) {
    size.width = 1200;
    size.height = 600;
  } else {
    size.width = 800;
    size.height = 600;
  }

  // Create the browser window.
  win = new BrowserWindow({
    x: (windowSize.width - size.width) / 2,
    y: (windowSize.height - size.height) / 2,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  ipcMain.on('window-size', (event, size) => {
    const windowSize = screen.getPrimaryDisplay().workAreaSize;
    const y = (windowSize.height - size.height) / 2;
    const x = (windowSize.width - size.width) / 2;

    win.setSize(size.width, size.height);
    win.setPosition(x < 0 ? 0 : x, y < 0 ? 0 : y);
  });

  ipcMain.on('font-loaded', (event, args) => {
    win.webContents.send('font-loaded', args);
  });

  ipcMain.on('capture', (event, message) => {
    win.webContents.send('capture', message);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
