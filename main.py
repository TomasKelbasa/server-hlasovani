radio.set_group(15)
odpovedi = [{"serial" : 156840, "vote": 3}]
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
        radio.send_value("confirm", serial_num)

def on_button_pressed_a():
    for v in odpovedi:
        print(String.from_char_code(v["vote"]+65))
input.on_button_pressed(Button.A, on_button_pressed_a)
def on_button_pressed_b():
    for i in range (0,5):
        suma = 0
        for p in odpovedi:
            if p["vote"] == i:
                suma += 1
        print(String.from_char_code(i+65))
        print(": ")
        print(suma)
input.on_button_pressed(Button.B, on_button_pressed_b)