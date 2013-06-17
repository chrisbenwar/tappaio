import re
import os, sys
import socket
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import unicodedata

from klwebserver import HomeHandler
from klsocketserver import WSHandler 

from tornado.options import define, options

def we_are_frozen():
    """Returns whether we are frozen via py2exe.
    This will affect how we find out where we are located."""

    return hasattr(sys, "frozen")


def module_path():
    """ This will get us the program's directory,
    even if we are frozen using py2exe"""

    if we_are_frozen():
        return os.path.dirname(unicode(sys.executable, sys.getfilesystemencoding( )))

    return os.path.dirname(unicode(__file__, sys.getfilesystemencoding( )))

define("port", default=9999, help="run on the given port", type=int)

print os.getcwd()
class Application(tornado.web.Application):
	def __init__(self):
		handlers = [
			(r"/", HomeHandler),
			(r"/partials/(.*)", tornado.web.StaticFileHandler, {'path': 'partials/' }), 
    	(r'/ws', WSHandler),
		]
		settings = dict(
			template_path=os.path.join(module_path(), "templates"),
			static_path=os.path.join(module_path(), "static"),
			debug=True,
		)
		tornado.web.Application.__init__(self, handlers, **settings)

def main():	
	print "Tappa-io is ready for action."
	print "Type this in your web browser:"

	addrs = socket.gethostbyname_ex(socket.gethostname()) 
	print([ip + ':9999' for ip in addrs[2] if not ip.startswith("127.")][:1])
	server = tornado.httpserver.HTTPServer(Application())
	server.listen(options.port)
	server.listen(8888)


if __name__ == "__main__":
	main()
	tornado.ioloop.IOLoop.instance().start()

