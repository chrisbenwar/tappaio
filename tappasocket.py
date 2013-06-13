import tornado.ioloop
import tornado.web
import tornado.websocket
import threading
import time

from klsocketserver import application

class WSThread(threading.Thread):
	def run(self):
		application.listen(8888)
		tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__': 
	sock = WSThread()
	sock.daemon = True
	sock.start()
	
	while True:
		time.sleep(1)
