const {app, BrowserWindow} = require('electron');

const path = require('path');
const url = require('url');

const window = {
    create() {
        this._mainWindow = new BrowserWindow({width: 800, height: 600});
        this._mainWindow.loadURL('http://localhost:4200');
        
        this._mainWindow.loadURL(url.format({
          pathname: path.join(__dirname, 'dist/index.html'),
          protocol: 'file:',
          slashes: true,
          icon: `${__dirname}/dist/favicon.ico`
        }));

        this._mainWindow.on('closed', () => { this._mainWindow = null; });
    },
    isOpened() {
        return !!this._mainWindow;
    },
    createByCondition() {
        if (!window.isOpened()) {
            window.create();
          }
    },
    close() {
        if (process.platform !== 'darwin') {
            app.quit();
          }
    }
};

app.on('ready', window.create);
app.on('window-all-closed', window.close);
app.on('activate', window.createByCondition);
