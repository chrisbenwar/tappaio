import uinput

def createListenEvents():
	listenTo = filter(lambda x: str.find(x, 'KEY_') == 0, dir(uinput))
	listenTo = map(lambda x: getattr(uinput, x), listenTo)
	return tuple(listenTo) 

def createKeyCode(key):
	if(str.isalpha(key)):
		return getattr(uinput, 'KEY_' + str.upper(key))  
	else:
		return getattr(uinput, 'KEY_SPACE')

def hitKey(key):
	device.emit(createKeyCode(key), 1)  
	device.emit(createKeyCode(key), 0)

def fireKeys(text, interval):
	i = 1
	for letter in text:
		if interval == 0:
			hitKey(letter)
		else:
			Timer(interval * i, hitKey, [letter]).start()		
		i = i + 1

events = createListenEvents()  
device = uinput.Device(events)
