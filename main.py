radio.set_group(15)
odpovedi = [{"serial" : 156840, "vote": 0}]
odpovedi.pop()
canVote = True

radio.on_received_value(on_received_value)

def on_received_value(name, value):
    global odpovedi
    if name == "answer" and canVote:
        zmeneno = False
        serial_num = radio.received_packet(RadioPacketProperty.SERIAL_NUMBER)
        for o in odpovedi:
            if o["serial"] == serial_num:
                o["vote"] = value
                zmeneno = True
        if not zmeneno:
            odpovedi.push({"serial" : serial_num, "vote": value})
        #pošle klientovi potvrzení o přijetí odpovědi
        radio.send_value("confirm", serial_num)

#OVLÁDÁNÍ SERVERU
#A - přepínač hlasování (povoleno - server přijímá odpovědi, zakázáno - server nepříjímá odpovědi)
#B - zobrazení odpovědí
#A+B - reset odpovědí 
def on_button_pressed_a():
    global canVote
    if canVote:
        canVote = False
        radio.send_value("voting", 0)
    else:
        canVote = True
        radio.send_value("voting", 1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    for i in range (0,5):
        suma = 0
        for p in odpovedi:
            if p["vote"] == i:
                suma += 1
        print(String.from_char_code(i+65) + ": " + suma)
        basic.show_string(String.from_char_code(i+65) + ":" + suma, 50)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_ab():
    for i in range(odpovedi.length):
        odpovedi.remove_at(i)
input.on_button_pressed(Button.AB, on_button_pressed_ab)