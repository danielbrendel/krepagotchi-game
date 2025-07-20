const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let cfgBuild;

function config(item)
{
    const filepath = path.resolve(__dirname, '..', item + '.json');
    const data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data);
}

app.whenReady().then(() => {
    cfgBuild = config('build');
    
    mainWindow = new BrowserWindow({
        title: cfgBuild.name,
        width: cfgBuild.width,
        height: cfgBuild.height,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            backgroundThrottling: false
        },
        icon: cfgBuild.icon
    });

    if (cfgBuild.aot) {
        mainWindow.setAlwaysOnTop(true, 'screen');
    }

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
        const isExternal = !url.startsWith('file://');
        if (isExternal) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });
    
    Menu.setApplicationMenu(null);
    mainWindow.loadFile(path.resolve(__dirname, '..', 'game', 'index.html'));
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});