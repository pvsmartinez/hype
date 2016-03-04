(function () {
    'use strict';

    function config($routeProvider) {
        // No config, coloque as rotas, que unem o html com o controller
        $routeProvider.when('/', {
            templateUrl: '/cliente/web/views/exemplo.html',
            controller: 'exemploCtrl'
        });
    }

    angular.module('hype').config(config);
}());
