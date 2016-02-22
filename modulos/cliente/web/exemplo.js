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
      exemploService.isEmailTaken(newUser.email).then(function(resp){
        if(resp.data.length > 0) {
          console.log('nope!');
        } else {
          var user = new exemploService.User();
          user.email = newUser.email;
          user.senha = newUser.senha;
          exemploService.User.save(user, function() {
            console.log('user saved with success');
          });
        }
      });
    };
  }
  function exemploService($resource, $http, $q) {
    // no service coloque as chamadas para nosso api.
    var User = $resource('/rest/users/:id');
    var isEmailTaken = function(email) {
      var def = $q.defer();
      $http.get('/api/isEmailTaken/'+email).then(function (data) {
				def.resolve(data);
			}, function () {
        console.error('Erro de Servidor!');
				def.reject([]);
			});
      return def.promise;
    };
    return {
      User : User,
      isEmailTaken : isEmailTaken
    };
  }
}());
