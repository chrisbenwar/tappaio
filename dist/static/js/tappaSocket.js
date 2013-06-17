'use strict';

var tappa = tappa || {};

(function(tappa) {
	tappa.socket = {
		_socket:null,

		create: function() {
			try {
				this._socket = new WebSocket("ws://192.168.0.3:8888/ws");
				this._socket.onopen = klMouse.wsOpen;
			}
			catch(exception) {
//console.log(exception);
			}
		},

		open: function() {
			console.log(exception);
			this._socket.send('Hello there!');
		},

		send: function(data) {
			this._socket.send(data);
		}
	}

	tappa.socket.create();

})(tappa);
