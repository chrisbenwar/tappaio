from distutils.core import setup
import os
import py2exe

cssFiles = [ 'css/' + x for x in os.listdir('css') ]
jsFiles = [ 'js/' + x for x in os.listdir('js') ]

setup(console=['tappaio.py'],
		data_files=[ 
			('.', ['KeyListener.config'] ), 
			('.', ['keyboard.htm'] ), 
			('js', jsFiles ), 
			('css', cssFiles ), 
		])
