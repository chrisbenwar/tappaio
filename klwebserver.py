from klmouse import KLMouse 
from klkeyboard import *

class WebController(object):

	def __init__(self):
		self.klMouse = KLMouse()

	def index(self):
		f = file('/home/chris/dev/python/io/keyboard.htm', 'r')
		return f.read()
	index.exposed = True
	
	def text(self, text):
		textStr = text.encode('utf-8')
		fireKeys(textStr, 0)
		print textStr
	text.exposed = True

	def use(self, evType, x, y, t):
		self.klMouse.mouse(evType, x, y, t)

	use.exposed = True

