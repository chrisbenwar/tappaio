'use strict';
var tappa = tappa || {};
(function(tappa) {
	tappa.KeyboardCtrl = function($scope) {
		$scope.keys = [];
		$scope.specialKeys = [];

		var aKey = ("A").charCodeAt(0);
		var ZKey = ("Z").charCodeAt(0);
		for(var i = aKey; i <= ZKey; i++)
		{
			$scope.keys.push({
				'letter': String.fromCharCode(i),
				'text': String.fromCharCode(i)
			});
		}
		$scope.specialKeys.push({
			'letter': ' ',
			'text': 'SPACE'
		});
	},

	tappa.fireKey = function(letter, type) {
		console.log('firing key');
		tappa.socket.send(['key', letter, null, null]);
	}
})(tappa);
