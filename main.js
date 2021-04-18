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

}
function createTrayIcon (){
    appIcon = new Tray('overlay.png')
    const contextMenu = Menu.buildFromTemplate([
      {
          label: 'Show App',
          click: () => {
            createWindow();
          }
        },
        {
          label: 'Quit',
          click: () => {
            app.quit() // actually quit the app.
          }
        },
    ])
    // Call this again for Linux because we modified the context menu
    appIcon.setContextMenu(contextMenu)
}

function showNotification(){
    const notification = {
        title :"Basic Notifcation",
        body: "Notification From The Main Process"
    }
    const myNotification =new Notification(notification)
    myNotification.show();
    const notificationInterval =setInterval(() => {
        myNotification.show();
    }, 3000);
    
    myNotification.on('click', (event, arg)=>{
        console.log('Notification clicked')
        clearInterval(notificationInterval);
    });
}

app.whenReady().then(()=>{
    createWindow();
    createTrayIcon();
    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    })
}).then(showNotification)

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        // app.quit();
    }
})