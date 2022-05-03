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
        
        // pošle klientovi potvrzení o přijetí odpovědi
        radio.sendValue("confirm", serial_num)
    }
    
})
// OVLÁDÁNÍ SERVERU
// A - přepínač hlasování (povoleno - server přijímá odpovědi, zakázáno - server nepříjímá odpovědi)
// B - zobrazení odpovědí
// A+B - reset odpovědí 
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (canVote) {
        canVote = false
    } else {
        canVote = true
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
        console.log(String.fromCharCode(i + 65) + ": " + suma)
        basic.showString(String.fromCharCode(i + 65) + ":" + suma)
    }
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    for (let i = 0; i < odpovedi.length; i++) {
        odpovedi.removeAt(i)
    }
})
