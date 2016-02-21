(function(){
  'use strict';
  angular.module('hype').config(config);
  angular.module('hype').controller('exemploCtrl', exemploCtrl);
  angular.module('hype').factory('exemploService', exemploService);
  function config($routeProvider) {
    // No config, coloque as rotas, que unem o html com o controller
    $routeProvider.when('/', {
			templateUrl: '/cliente/web/exemplo.html',
			controller: 'exemploCtrl'
		});
  }
  function exemploCtrl($scope, exemploService) {
    // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click
    $scope.nome = 'Pedro';
    $scope.newUser = {};
    $scope.post = function (newUser) {
      var user = new exemploService.User();
      user.email = newUser.email;
      user.senha = newUser.senha;
      exemploService.User.save(user, function() {
        console.log('user saved with success');
      });
    };
  }
  function exemploService($resource) {
    // no service coloque as chamadas para nosso api.
    var User = $resource('/rest/users/:id');
    return {
      User : User
    };
  }
}());
