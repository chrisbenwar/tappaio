from klmouse import KLMouse 

class WebController(object):

	def __init__(self):
		self.klMouse = KLMouse()

	def index(self):
		f = file('keyboard.htm', 'r')
		return f.read()
	index.exposed = True
	
	def use(self, evType, x, y, t):
		self.klMouse.mouse(evType, x, y, t)

	use.exposed = True

