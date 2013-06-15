import re
import os.path
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import unicodedata

from klwebserver import HomeHandler
from klsocketserver import WSHandler 

from tornado.options import define, options

define("port", default=9999, help="run on the given port", type=int)

class Application(tornado.web.Application):
	def __init__(self):
		handlers = [
			(r"/", HomeHandler),
    	(r'/ws', WSHandler),
		]
		settings = dict(
			template_path=os.path.join(os.path.dirname(__file__), "templates"),
			static_path=os.path.join(os.path.dirname(__file__), "static"),
			debug=True,
		)
		tornado.web.Application.__init__(self, handlers, **settings)

def main():	
	server = tornado.httpserver.HTTPServer(Application())
	server.listen(options.port)
	server.listen(8888)
	tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
	main()
