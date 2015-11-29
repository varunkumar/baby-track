import RPi.GPIO as GPIO
import time
import random

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

red_led = 4
green_led = 15
ping_button = 14

buttons = [19, 16, 26, 20]

GPIO.setup(red_led, GPIO.OUT)
GPIO.setup(green_led, GPIO.OUT)

GPIO.setup(ping_button, GPIO.IN, GPIO.PUD_UP)

for button in buttons:
    GPIO.setup(button, GPIO.IN, GPIO.PUD_UP)

buttonPressed = -1
while True:
    for i in range(len(buttons)):
        if GPIO.input(buttons[i]) == False:
            buttonPressed = i
            break
        if GPIO.input(buttons[i]) == True and buttonPressed == i:
            print("Button-" + str(i) + " action")
            buttonPressed = -1
            break
    
    # Ping button
    if GPIO.input(ping_button) == False:
        buttonPressed = 4
        
    if GPIO.input(ping_button) == True and buttonPressed == 4:
        print("Ping button")
        buttonPressed = -1
        
    time.sleep(0.1)
    
GPIO.output(green_led, 1)
time.sleep(5)
GPIO.output(green_led, 0)

GPIO.cleanup()
