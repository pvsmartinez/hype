(function(){
  'use strict';
  angular.module('hype').config(config);
  angular.module('hype').controller('exemploCtrl', exemploCtrl);
  function config($routeProvider) {
    $routeProvider.when('/', {
			templateUrl: '/cliente/web/exemplo.html',
			controller: 'exemploCtrl'
		});
  }
  function exemploCtrl($scope) {
    $scope.nome = 'Pedro';
  }
}());
