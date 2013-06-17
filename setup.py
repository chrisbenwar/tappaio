from distutils.core import setup
import os
import py2exe

cssFiles = [ 'static/css/' + x for x in os.listdir('static/css') ]
jsFiles = [ 'static/js/' + x for x in os.listdir('static/js') ]
partialFiles = [ 'partials/' + x for x in os.listdir('partials') ]

setup(console=['tappaio.py'],
		data_files=[ 
			('.', ['index.html'] ), 
			('static/js', jsFiles ), 
			('static/css', cssFiles ), 
			('partials', partialFiles ), 
		])
