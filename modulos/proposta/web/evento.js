(function() {
  'use strict';
  angular.module('hype').config(config);
  angular.module('hype').controller('eventoPCt', eventoPCt);
  angular.module('hype').factory('Res', Res);

  function config($routeProvider) {
    // No config, coloque as rotas, que unem o html com o controller
    $routeProvider.when('/evento-mock/:id', {
      templateUrl: '/proposta/web/views/evento.html',
      controller: 'eventoPCt'
    });
  }

  function eventoPCt($scope, $routeParams, Res) {
    var evento = new Res.evento();
    var user = new Res.user();

  }

  function Res($resource) {
    return {
      evento: $resource('/rest/eventos/:id'),
      user: $resource('/rest/users/:id')
    };
  }

}());
