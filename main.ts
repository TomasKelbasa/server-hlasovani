radio.setGroup(15)
let odpovedi = [ {
    "serial" : 156840,
    "vote" : 3,
}
]
let canVote = true
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    let zmeneno: boolean;
    let serial_num: number;
    
    if (name == "answer" && canVote) {
        zmeneno = false
        serial_num = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        for (let o of odpovedi) {
            if (o["serial"] == serial_num) {
                o["vote"] = value
                zmeneno = true
            }
            
        }
        if (!zmeneno) {
            odpovedi.push( {
                "serial" : serial_num,
                "vote" : value,
            }
            )
        }
        
        radio.sendValue("confirm", serial_num)
    }
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    for (let v of odpovedi) {
        console.log(String.fromCharCode(v["vote"] + 65))
    }
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    let suma: number;
    for (let i = 0; i < 5; i++) {
        suma = 0
        for (let p of odpovedi) {
            if (p["vote"] == i) {
                suma += 1
            }
            
        }
        console.log(String.fromCharCode(i + 65))
        console.log(": ")
        console.log(suma)
    }
})
