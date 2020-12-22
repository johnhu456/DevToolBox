const $=require('jquery')
var usbDetect=require('usb-detection')
$(document).ready(function(){
    console.log('ready')
    $('#usb-table').hide()
    usbDetect.startMonitoring();
    usbDetect.find(function(err, devices) {
        console.log(devices,err)
        var availables = filteriPhoneDevice(devices)
        for (const iterator of availables) {
            console.log(iterator)
            $('.lds-spinner').hide()
            $('#usb-table').show()
            $('#usb-table').append(`<td id="${iterator.locationId}">${iterator.deviceName}</td>`)
            $(`#${iterator.locationId}`).on('drop',function(payload){
                event.preventDefault();  
                event.stopPropagation();
                console.log(payload)
            })
            $(`#${iterator.locationId}`).on('dragover',function(payload){
                event.preventDefault();  
                event.stopPropagation();
                console.log(payload)
            })
            $(`#${iterator.locationId}`).on('dragleave',function(payload){
                event.preventDefault();  
                event.stopPropagation();
                console.log(payload)
            })
            $(`#${iterator.locationId}`).on('click',function(payload){
                console.log(payload)
            })
        }
    });
    usbDetect.stopMonitoring();
})

function filteriPhoneDevice(devices) {
    var availableDevices = new Array()
    for (const device of devices) {
        if (device.productId==4776 && device.vendorId==1452) {
            availableDevices.push(device)
        }
    }
    return availableDevices
}

