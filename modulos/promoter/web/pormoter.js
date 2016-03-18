(function () {
    'use strict';

    function config($routeProvider) {
        // No config, coloque as rotas, que unem o html com o controller
        $routeProvider.when('/promoter', {
            templateUrl: '/promoter/web/views/promoterView.html',
            controller: 'promoterCtrl'
        });
    }

    angular.module('hype').config(config);
}());
