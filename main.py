radio.set_group(15)
odpovedi = {}
radio.on_received_value(on_received_value)

def on_received_value(name, value):
    global odpovedi
    if name == "answer":
        serial_num = radio.received_packet(RadioPacketProperty.SERIAL_NUMBER)
        
def on_forever():
    pass
basic.forever(on_forever)
