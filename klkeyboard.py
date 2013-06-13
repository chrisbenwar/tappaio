from pykeyboard import PyKeyboard

class KLKeyboard(object):

	def __init__(self):
		self.keyboard = PyKeyboard()
		pass

	def hitKey(self, key):
		self.keyboard.tap_key(key)

