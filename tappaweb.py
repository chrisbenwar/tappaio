import cherrypy
import threading
import time

from klwebserver import WebController

class WebThread(threading.Thread):
	def run(self):
		cherrypy.quickstart(WebController(), '/', 'KeyListener.config')	

if __name__ == '__main__': 
	web = WebThread()
	web.daemon = True
	web.start()

	while True:
		time.sleep(1)
