(function () {
    'use strict';
    function promoterSrvc($resource, $http, $q) {
        // no service coloque as chamadas para nosso api.
        var Promoter = $resource('/rest/promoters/:id');

        var isEmailTaken = function (email) {
            var def = $q.defer();
            $http.get('/api/isEmailTaken/' + email).then(function (data) {
                def.resolve(data);
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };
        return {
            isEmailTaken: isEmailTaken,
            Promoter: Promoter
        };
    }

    angular.module('hype').factory('promoterSrvc', promoterSrvc);
}());
