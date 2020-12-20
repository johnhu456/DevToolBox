var usb=require('usb')

$(document).ready(function(){
    console.log('ready')
    console.log(usb.getDeviceList());
})

