'use strict';

var tappa = tappa || {};

angular.module(
  'tappaio', []
).config(
  [
    '$routeProvider', 
    function($routeProvider) {
      $routeProvider.when('/keyboard', {
        templateUrl: 'partials/keyboard.html', 
        controller: tappa.KeyboardCtrl
      });

      $routeProvider.when('/mouse', {
        templateUrl: 'partials/mouse.html',
        controller: tappa.MouseCtrl
      });

      $routeProvider.otherwise({
        redirectTo: '/keyboard'
      });
    }
  ]
)
 

