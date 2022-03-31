radio.setGroup(15)
let odpovedi =  {
	
}

radio.onReceivedValue(function on_received_value(name: string, value: number) {
    let serial_num: number;
    
    if (name == "answer") {
        serial_num = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    }
    
})
basic.forever(function on_forever() {
    
})
