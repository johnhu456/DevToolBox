const $=require('jquery')
const { ipcRenderer }=require('electron');
$(document).ready(function(){
    console.log('ready')
})
ipcRenderer.on('captured-image', function(event, payload){
    var image = new Image()
    image.src = payload
    $(document.body).append(image)
});

