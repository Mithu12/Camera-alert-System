# Camera 1


import socketio

sio = socketio.Client()


@sio.event
def connect():
    print('connection established')


@sio.event
def my_message(data):
    print('message received with ', data)


@sio.event
def disconnect():
    print('disconnected from server')


sio.connect('http://localhost:5000')
a = [x for x in range(20)]

while True:
    x = input('enter value')
    if x == '':
        break
    sio.emit('sender', {'cameraId': 1})


sio.wait()


# Camera 2
import socketio

sio = socketio.Client()

2
@sio.event
def connect():
    print('connection established')


@sio.event
def my_message(data):
    print('message received with ', data)


@sio.event
def disconnect():
    print('disconnected from server')


sio.connect('http://localhost:5000')
a = [x for x in range(20)]

while True:
    x = input('enter value')
    if x == '':
        break
    sio.emit('sender', {'cameraId': 2})


sio.wait()
