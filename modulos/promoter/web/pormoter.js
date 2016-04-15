(function () {
    'use strict';

    function config($routeProvider) {
        // No config, coloque as rotas, que unem o html com o controller
        $routeProvider.when('/promoter/novoPromoter', {
            templateUrl: '/promoter/web/views/novoPromoterView.html',
            controller: 'novoPromoterCtrl'
        });
        $routeProvider.when('/promoter', {
            templateUrl: '/promoter/web/views/promoterView.html',
            controller: 'promoterCtrl'
        });
        $routeProvider.when('/promoter/perfil', {
            templateUrl: '/promoter/web/views/perfilPromoterView.html',
            controller: 'perfilPromoterCtrl'
        });
        $routeProvider.when('/promoter/fornecedores', {
            templateUrl: '/promoter/web/views/fornecedoresPromoterView.html',
            controller: 'fornecedoresPromoterCtrl'
        });
        $routeProvider.when('/promoter/meusServicos', {
            templateUrl: '/promoter/web/views/servicosPromoterView.html',
            controller: 'servicosPromoterCtrl'
        });
    }

    angular.module('hype').config(config);
}());
