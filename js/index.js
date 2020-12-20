const $=require('jquery');
const electron = require('electron');
const shelljs=require('shelljs');
const clipboard=require('electron').clipboard;
const ipcRenderer=require('electron').ipcRenderer;
try {
    remote = require('' + 'electron').remote
  } catch (e) {
    remote = require('' + 'remote')
  }
$(document).ready(function(){
    $("#notification-btn").click(function(){
        shelljs.exec(`screencapture -ic my.png`, function (res) {
            const image = clipboard.readImage()
            const size = image.getSize()
            const imageData = image.toDataURL()
            ipcRenderer.send('screenshot-captured', { 'image': imageData,'width':size.width,'height':size.height });
        })
    });
    $("#installer-btn").click(function(){
      $('#main-panel').attr('src', './installer/index.html')
  });
});