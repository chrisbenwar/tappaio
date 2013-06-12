import cherrypy
import tornado.ioloop
import tornado.web
import tornado.websocket
import threading
import time

from klwebserver import WebController
from klsocketserver import application

class WSThread(threading.Thread):
	def run(self):
		application.listen(8888)
		tornado.ioloop.IOLoop.instance().start()

class WebThread(threading.Thread):
	def run(self):
		cherrypy.quickstart(WebController(), '/', '/home/chris/dev/python/io/KeyListener.config')	

if __name__ == '__main__': 
	web = WebThread()
	web.daemon = True
	web.start()

	sock = WSThread()
	sock.daemon = True
	sock.start()
	
	while True:
		time.sleep(1)
