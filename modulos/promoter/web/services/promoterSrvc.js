(function () {
    'use strict';
    function promoterSrvc($resource, $http, $q) {
        // no service coloque as chamadas para nosso api.
        var Promoter = $resource('/rest/promoters/:id', {}, {
        save: {
            method: 'POST',
            headers: { 'x-access-token': localStorage.token }
        }});

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

        var login = function (promoter) {
            var def = $q.defer();
            $http.post('/api/login/', {email: promoter.email, senha: promoter.senha}).then(function (resp) {
                var data = resp.data;
                if(!data.success){
                    def.reject(data.message);
                    return;
                }
                console.log(data.token)
                localStorage.token = data.token;
                def.resolve([]);
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };

        return {
            isEmailTaken: isEmailTaken,
            Promoter: Promoter,
            login: login
        };
    }

    angular.module('hype').factory('promoterSrvc', promoterSrvc);
}());
