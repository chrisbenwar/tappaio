function KeyListenerControl($scope) {
	$scope.keys = [];
	var aKey = ("A").charCodeAt(0);
	var ZKey = ("z").charCodeAt(0);
	for(var i = aKey; i <= ZKey; i++)
	{
		$scope.keys.push({
			'letter': String.fromCharCode(i)
		});
	}
}

function fireKey(letter, type) {
	//$('#logger').html($('#logger').html() + type);
	$.ajax('/text', {
		"data": {
			"text": letter
		}
	});
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
	

	init: function() {
		klMouse.$mouse = $('#mouse');
		console.log('init');
		if(klMouse.usingTimer)
		{
			timer = window.setInterval(function() {
				var x = klMouse.livePos.x;
				var y = klMouse.livePos.y;
				var inArea = x > 0 && y > 0 && x < klMouse.$mouse.width() && y < klMouse.$mouse.height();

				klMouse.log('tm' + x + ', ' + y);

				if(klMouse.down && inArea)
				{
					var centreX = klMouse.$mouse.width() / 2;
					var centreY = klMouse.$mouse.height() / 2;
					var newX = (x - centreX) * klMouse.scale;
					var newY = (y - centreY) * klMouse.scale;

					klMouse.fireMouse('m', newX , newY);
				}		
			}, klMouse.delay);	

		}
		klMouse.attach();

		klMouse.createWebSocket();
	},
	createWebSocket: function() {
		try {
			klMouse.log('1');
			klMouse.ws = new WebSocket("ws://192.168.0.3:8888/ws");
			klMouse.log('2');

			klMouse.ws.onopen = klMouse.wsOpen;
			klMouse.log('3');

		}
		catch(exception) {
			console.log(exception);
		}
		
	},
	wsOpen: function() {
		klMouse.log('It opened!');

		klMouse.ws.send('Hello there!')
	},
	log: function(text) {
		return;
		$l = $('#logger');
		$l.show();
		$l.html($l.html() + text);
	},

	fireMouseClick: function(button) {
		klMouse.log(button + ': ' + klMouse.lastX + ', ' + klMouse.lastY);
		klMouse.fireMouse(button, klMouse.lastX, klMouse.lastY)
		return false;
	},

	fireMouse: function(type, x, y) {
		klMouse.log('fire');
		var $m = $('#mouse');

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
			
			/*
			$.ajax('/mouse', {
				"data": {
					"evType": type,
					"x": xP,
					"y": yP,
					"t": ts
				}	
			});		
			*/
			
			klMouse.ws.send([type,xP,yP, ts].join())
		}
	},

	attach: function() {
		var $m = $('#mouse');
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
