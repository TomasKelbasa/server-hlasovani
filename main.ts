radio.setGroup(15)
let odpovedi = [ {
    "serial" : 156840,
    "vote" : 0,
}
]
_py.py_array_pop(odpovedi)
let canVote = true
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    let zmeneno: boolean;
    let serial_num: number;
    let counter: number;
    
    if (name == "answer" && canVote) {
        zmeneno = false
        serial_num = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        counter = -1
        for (let o of odpovedi) {
            counter += 1
            if (o["serial"] == serial_num) {
                odpovedi[counter]["vote"] = value
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
        radio.sendValue("voting", 0)
    } else {
        canVote = true
        radio.sendValue("voting", 1)
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
        basic.showString(String.fromCharCode(i + 65) + ":" + suma, 50)
    }
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    for (let i = 0; i < odpovedi.length; i++) {
        odpovedi.removeAt(i)
    }
})
