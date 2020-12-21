const $=require('jquery')
var usbDetect=require('usb-detection')
$(document).ready(function(){
    console.log('ready')
    usbDetect.startMonitoring();
    usbDetect.find(function(err, devices) {
        var availables = filteriPhoneDevice(devices)
        for (const iterator of devices) {
            $('#usb-table').append(`<tr><td>${iterator.deviceName}</td></tr>`)
        }
    });
})

function filteriPhoneDevice(devices) {
    var availableDevices = new Array()
    for (const device of devices) {
        // if (device.productId==4776 && device.vendorId==1452) {
            availableDevices.push(device)
        // }
    }
    return availableDevices
}

