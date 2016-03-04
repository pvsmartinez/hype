(function () {
    'use strict';
    function exemploService($resource, $http, $q) {
        // no service coloque as chamadas para nosso api.
        var User = $resource('/rest/users/:id');
        var isEmailTaken = function (email) {
            var def = $q.defer();
            $http.get('/api/isEmailTaken/' + email).then(function (data) {
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };
        return {
            User: User,
            isEmailTaken: isEmailTaken
        };
    }

    angular.module('hype').factory('exemploService', exemploService);
}());
