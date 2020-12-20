const {app, BrowserWindow,ipcMain,ipcRenderer } = require('electron')
const $=require('jquery')
var screenshotWindow = null;
var win = null;
function createWindow() {
    win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            nodeIntegration:true,
            webviewTag:true
        }
    })
    win.loadFile('index.html')
}
function createScreenShotWindow(width,height){
  screenshotWindow = new BrowserWindow({
    width:width,
    height:height,
      webPreferences: {
        nodeIntegration:true,
        webSecurity:false,
        devTools:true
      }
  });
  var url = `file://${__dirname}/screenshot/index.html`;
  screenshotWindow.loadURL(url)
}
app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow() 
  }
})

//IPC
ipcMain.on('screenshot-captured',function(event, payload){
  createScreenShotWindow(payload['width'],payload['height']);
  var data = payload['image'];
  screenshotWindow.once('ready-to-show', () => { //when the new window is ready, show it up
    screenshotWindow.show()
    screenshotWindow.webContents.send('captured-image',data);
  })
  screenshotWindow.on('closed', function() { //set new window to null when we're done
    screenshotWindow = null
  })
});