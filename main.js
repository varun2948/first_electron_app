const {app,Menu, Tray , BrowserWindow,Notification} = require('electron');
const path =require('path');
let appIcon = null

function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
    appIcon = new Tray('overlay.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])
  contextMenu.items[1].checked = false
  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)
    // win.setOverlayIcon(path.join(__dirname, 'overlay.png'),'Description for overlay')
}


function showNotification(){
    const notification = {
        title :"Basic Notifcation",
        body: "Notification From The Main Process"
    }
    new Notification(notification).show();
    
}

app.whenReady().then(()=>{
    createWindow();

    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    })
}).then(showNotification)

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
})