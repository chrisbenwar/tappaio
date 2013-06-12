from pymouse import PyMouse

class KLMouse(object):
	ABSOLUTE = 1,
	RELATIVE = 2,

	def __init__(self):
		self.m = PyMouse()
		self.t = 0
		self.lastX = 0
		self.lastY = 0
		self.mode = KLMouse.RELATIVE	

	def mouse(self, evType, x, y, t):
		print evType, x, y, t
		if t > self.t:
			xDim, yDim = self.m.screen_size() 

			if self.mode == KLMouse.ABSOLUTE:
				xNew = int(float(x) * xDim)   
				yNew = int(float(y) * yDim) 
			else:
				xNew = int(float(x) * xDim)   
				yNew = int(float(y) * yDim)  

			print xNew 
			print yNew 

			mX, mY = self.m.position()    

			if evType == 'left' or evType == 'right':  
				mX, mY = self.m.position();
				self.m.click(mX, mY, {'left':1,'right':2}[evType])      
			else:	
				if self.mode == KLMouse.ABSOLUTE:
					self.m.move(xNew, yNew) 		
				if self.mode == KLMouse.RELATIVE:
					self.m.move(mX + xNew, mY + yNew) 		
			self.t = t
