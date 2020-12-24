const $=require('jquery')
var usbDetect=require('usb-detection')
const shelljs=require('shelljs');
$(document).ready(function(){
    console.log('ready')
    $('#usb-table').hide()
    usbDetect.startMonitoring();
    usbDetect.find(function(err, devices) {
        $('.lds-spinner').hide()
        $('#usb-table').show()
        console.log(devices,err)
        var availables = filteriPhoneDevice(devices)
        for (const iterator of availables) {
            console.log(iterator)
            $('#usb-table').append(`<td id="${iterator.locationId}">${iterator.deviceName}</td>`)
            $('#usb-table').append(`<td id="${iterator.locationId}_progress"></td>`)
            $(`#${iterator.locationId}`).on('drop',function(event){
                event.preventDefault();  
                event.stopPropagation();
                //Install the ipa to this device
                var ipapath = event.originalEvent.dataTransfer.files[0].path
                if (ipapath.includes(".ipa")) {
                    var process = shelljs.exec(`ideviceinstaller -i ${ipapath} -u ${iterator.serialNumber}`,{async:true})
                    process.stdout.on('data',function(data){
                        $(`#${iterator.locationId}_progress`).text(data)
                    })
                }
            })
            $(`#${iterator.locationId}`).on('dragover',function(event){
                event.preventDefault();  
                event.stopPropagation();
            })
            $(`#${iterator.locationId}`).on('dragleave',function(event){
                event.preventDefault();  
                event.stopPropagation();
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

