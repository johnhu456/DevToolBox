const $=require('jquery');
const electron = require('electron');
const clipboard=require('electron').clipboard;
const ipcRenderer=require('electron').ipcRenderer;
try {
    remote = require('' + 'electron').remote
  } catch (e) {
    remote = require('' + 'remote')
  }
$(document).ready(function(){
    $("#notification-btn").click(function(){
        ipcRenderer.send('switch-panel', {'index': 0})
    });
    $("#installer-btn").click(function(){
      ipcRenderer.send('switch-panel', {'index': 1})
    })
});