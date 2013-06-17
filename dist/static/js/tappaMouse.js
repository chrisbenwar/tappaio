'use strict';
var tappa = tappa || {};

tappa.MouseCtrl = function($scope) {
	klMouse.init();
}

var klMouse = {
	down: false,
	lastTS: 0,
	lastX: 0,
	lastY: 0,
	startX: 0,
	startY: 0,
	timer: null,
	delay: 50,
	livePos: {"x": 0, "y": 0},
	scale: 0.1,
	usingTimer: false,
	ws: null,
  moveMode: 'ocr',
	$mouseArea: null,
	log: function(text) { },

	init: function() {
		klMouse.$mouseArea = $('#mouseArea');
		console.log('initializing mouse');

		if(klMouse.usingTimer)
		{
			timer = window.setInterval(function() {
				var x = klMouse.livePos.x;
				var y = klMouse.livePos.y;
				var inArea = x > 0 && y > 0 && 
					x < klMouse.$mouseArea.width() && y < klMouse.$mouse.height();

				klMouse.log('tm' + x + ', ' + y);

				if(klMouse.down && inArea)
				{
					var centreX = klMouse.$mouseArea.width() / 2;
					var centreY = klMouse.$mouseArea.height() / 2;
					var newX = (x - centreX) * klMouse.scale;
					var newY = (y - centreY) * klMouse.scale;

					klMouse.fireMouse('m', newX , newY);
				}		
			}, klMouse.delay);	

		}
		klMouse.attach();
	},

	fireMouseClick: function(button) {
		klMouse.log(button + ': ' + klMouse.lastX + ', ' + klMouse.lastY);
		klMouse.fireMouse(button, klMouse.lastX, klMouse.lastY)
		return false;
	},

	fireMouse: function(type, x, y) {
		console.log('fire');
		var $m = $('#mouseArea');
		var xP = x / $m.width();
		var yP = y / $m.height();	
		
		var fire = true;

		var ts = +new Date();

		if(type == 'm')
		{
			if(ts - klMouse.lastTS < klMouse.delay)
			{
				fire = false;
			}
			else
			{
				klMouse.lastTS = ts;
			}
		}

		if(fire)
		{
			if(type == 'm')
			{
				console.log('' + klMouse.lastX + ', ' + klMouse.lastY);
				klMouse.lastX = x;
				klMouse.lastY = y;
			}

			console.log(xP + ', ' + yP);
			
			tappa.socket.send([type,xP,yP, ts].join());
		}
	},

	attach: function() {
		console.log('attach');
		var $m = $('#mouseArea');
		$m.mousedown(function(e) {
			klMouse.down = true;
			klMouse.startX = e.offsetX
			klMouse.startY = e.offsetY
		});
		$(document).mouseup(function(e) {
			klMouse.down = false;
		});
		$m.mousemove(function(e) {
			klMouse.livePos.x = e.offsetX;
			klMouse.livePos.y = e.offsetY;
			var newX = (e.offsetX - klMouse.startX) * klMouse.scale;
			var newY = (e.offsetY - klMouse.startY) * klMouse.scale;
			klMouse.fireMouse(klMouse.moveMode, e.offsetX, e.offsetY);
		});
		$m.bind('touchstart', function(e) {
			klMouse.log('start');    
			klMouse.down = true;
      e.preventDefault();
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			var elm = $(this).offset();
			var x = touch.pageX - elm.left;
			var y = touch.pageY - elm.top;

			if(x < $(this).width() && x > 0) {
				if(y < $(this).height() && y > 0){
					klMouse.startX = x; 
					klMouse.startY = y; 
				}
			}
		});
		$(document).bind('touchend', function(e) {
			klMouse.down = false;
		});
		$m.bind('touchmove', function(e) {
      e.preventDefault();
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			var elm = $(this).offset();
			var x = touch.pageX - elm.left;
			var y = touch.pageY - elm.top;
			klMouse.livePos.x = x;
			klMouse.livePos.y = y;
			klMouse.log('move' + x + ', ' + y);

			if(x < $(this).width() && x > 0) {
				if(y < $(this).height() && y > 0){
					var newX = (x - klMouse.startX) * klMouse.scale;
					var newY = (y - klMouse.startY) * klMouse.scale;

					klMouse.fireMouse('m', newX, newY);
				}
			}
		});
		
	}
}

$(document).ready(function() {
	klMouse.init();	
});
