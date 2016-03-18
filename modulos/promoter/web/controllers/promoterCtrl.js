(function () {
    'use strict';
    function promoterCtrl($scope, promoterSrvc) {
        // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click
        $scope.promoters = [];
        promoterSrvc.Promoter.query().$promise.then(function(promoters) {
            $scope.promoters = promoters;
        });

        $scope.newUser = {};
        $scope.newPromoter = {};
        $scope.newPerfil = {};

        $scope.createPromoter = function (isvalid, newUser, newPromoter, newPerfil) {
            if(!isvalid){
                $scope.message = "Ainda existem campos inválidos";
                return;
            }

            promoterSrvc.isEmailTaken(newUser.email).then(function (resp) {
                console.log("Teste");    
                if(resp.data.length != 0){
                    console.log("E-mail já cadastrado");
                    $scope.message = "E-mail já cadastrado";
                    return;
                }
                var user = new promoterSrvc.User();
                user.email = newUser.email;
                user.senha = newUser.senha;
                user.$save(function (user, putResponseHeaders) {
                    console.log('user saved with success');
                    return;
                    $scope.newUser.id = user.id;
                    
                    var promoter = new promoterSrvc.Promoter();
                    promoter.bio = newPromoter.bio;
                    promoter.userId = $scope.newUser.id;
                    promoter.$save(function(promoter, putResponseHeaders){
                        console.log('Promoter saved with success');
                        $scope.newPromoter.id = promoter.id;
                    });

                    var perfil = new promoterSrvc.Perfil();
                    perfil.nome = newPerfil.nome;
                    perfil.birthday = newPerfil.birthday;
                    perfil.sexo = sexo;
                    perfil.userId = $scope.newUser.id;
                    perfil.$save(function(perfil, putResponseHeaders){
                        console.log('Perfil saved with success');
                        $scope.newPerfil.id = perfil.id;
                    });
                })
            });
        };        
    };

    angular.module('hype').controller('promoterCtrl', promoterCtrl);
}());