import tornado.ioloop
import tornado.web
import tornado.websocket
from klmouse import KLMouse 

class WSHandler(tornado.websocket.WebSocketHandler):
	def open(self):
		print 'new connection'
		self.write_message("Hello World")
		self.klMouse = KLMouse()

	def on_message(self, message):
		try:
			evType, x, y, t = message.split(',')

			self.klMouse.mouse(evType, x, y, t)

		except Exception, e:
			print str(e)
		#print 'message received %s' % message

	def on_close(self):
		print 'connection closed'
			
application = tornado.web.Application([
    (r'/ws', WSHandler),
])

