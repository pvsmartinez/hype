(function () {
    'use strict';
    function promoterSrvc($resource, $http, $q) {
        // no service coloque as chamadas para nosso api.
        var Promoter = $resource('/rest/promoters/:id', {}, {
            get:    {method:'GET', headers: { 'x-access-token': localStorage.token }},
            save:   {method:'POST', headers: { 'x-access-token': localStorage.token }},
            update:   {method:'PUT', headers: { 'x-access-token': localStorage.token }},
            query:  {method:'GET', headers: { 'x-access-token': localStorage.token }, isArray:true},
            remove: {method:'DELETE', headers: { 'x-access-token': localStorage.token }},
            delete: {method:'DELETE', headers: { 'x-access-token': localStorage.token }} 
        });

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
                localStorage.token = data.token;
                def.resolve([]);
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };

        var novoPromoter = function (promoter) {
            var def = $q.defer();
            $http.post('/api/novoPromoter/', promoter).then(function (resp) {
                def.resolve([]);
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };

        var getPerfil = function () {
            var def = $q.defer();
            $http.get('/api/loadPerfil/', {headers: { 'x-access-token': localStorage.token }}).then(function (resp) {
                def.resolve(resp.data);
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };

        var getFornecedors = function () {
            var def = $q.defer();
            $http.get('/api/loadFornecedors/', {headers: { 'x-access-token': localStorage.token }}).then(function (resp) {
                def.resolve(resp.data);
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };

        var getServicos = function () {
            var def = $q.defer();
            $http.get('/api/loadServicos/', {headers: { 'x-access-token': localStorage.token }}).then(function (resp) {
                def.resolve(resp.data);
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };

        var addToFavoritos = function (fornecedor) {
            var def = $q.defer();
            $http.post('/api/addToFavoritos/', {fornecedorId: fornecedor.id}, {headers: { 'x-access-token': localStorage.token }}).then(function (resp) {
                def.resolve();
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };

        var removeFromFavoritos = function (fornecedor) {
            var def = $q.defer();
            $http.post('/api/removeFromFavoritos/', {fornecedorId: fornecedor.id}, {headers: { 'x-access-token': localStorage.token }}).then(function (resp) {
                def.resolve();
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };

        var cancelServico = function (servico) {
            var def = $q.defer();
            $http.post('/api/cancelServico/', {servicoId: servico.id}, {headers: { 'x-access-token': localStorage.token }}).then(function (resp) {
                def.resolve(resp.data);
            }, function () {
                console.error('Erro de Servidor!');
                def.reject([]);
            });
            return def.promise;
        };

        return {
            isEmailTaken: isEmailTaken,
            Promoter: Promoter,
            login: login,
            novoPromoter: novoPromoter,
            getPerfil: getPerfil,
            getFornecedors: getFornecedors,
            getServicos: getServicos,
            addToFavoritos: addToFavoritos,
            removeFromFavoritos: removeFromFavoritos,
            cancelServico: cancelServico
        };
    }

    angular.module('hype').factory('promoterSrvc', promoterSrvc);
}());
