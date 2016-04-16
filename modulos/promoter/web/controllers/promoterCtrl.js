(function () {
    'use strict';
    function novoPromoterCtrl($scope, promoterSrvc) {
        // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click
        $scope.showError = false;
        $scope.newPromoter = {};
        $scope.message = ""

        $scope.createPromoter = function (isvalid, newPromoter) {
            if(!isvalid){
                $scope.showError = true;
                $scope.message = "Ainda existem campos inválidos";
                return;
            }

            promoterSrvc.isEmailTaken(newPromoter.email).then(function (resp) {
                if(resp.data.length != 0){
                    $scope.showError = true;
                    $scope.message = "E-mail já cadastrado";
                    return;
                }

                promoterSrvc.novoPromoter(newPromoter).then(function (resp) {
                    $scope.showError = false;
                    $scope.newPromoter = {};
                    $scope.message = "Usuário Cadastrado com sucesso";
                    console.log('promoter saved with success');
                });
            });
        };
    };

    function promoterCtrl($scope, $location, promoterSrvc) {
        // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click
        localStorage.removeItem('token');
        $scope.showError = false;
        $scope.promoter = {};
        $scope.message = ""

        $scope.login = function (isvalid, promoter) {
            if(!isvalid){
                $scope.showError = true;
                $scope.message = "e-mail e/ou senha inválidos";
                return;
            }
            promoterSrvc.login(promoter).then(function(resp){
                $location.path('/promoter/meusServicos');
            }, function(resp){
                $scope.showError = true;
                $scope.message = "e-mail e/ou senha inválidos";
            });
        };
    };

    function perfilPromoterCtrl($scope, $location, promoterSrvc) {
        // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click
        $scope.showError = false;
        $scope.message = "";
        var oldEmail;
        promoterSrvc.getPerfil().then(function(promoter){
            $scope.newPromoter = promoter;
            oldEmail = promoter.email;
            $scope.newPromoter.dataNascimento = new Date(promoter.dataNascimento)
        }, function(err){
            $scope.message = "Falha ao carregar perfil";
        });

        var alter = function(newPromoter){
            var promoter = new promoterSrvc.Promoter();
            Object.keys(newPromoter).map(function(value, index) {
                promoter[value] = newPromoter[value];
            });

            promoter.$update({id: newPromoter.id}, function (updatedPromoter, putResponseHeaders) {
                oldEmail = updatedPromoter.email;
                $scope.showError = false;
                $scope.message = "Usuário alterado com sucesso";
                console.log('promoter altered with success');
            });
        };
        
        $scope.alterPromoter = function (isvalid, newPromoter) {
            if(!isvalid){
                $scope.showError = true;
                $scope.message = "Ainda existem campos inválidos";
                return;
            }
            if(oldEmail == newPromoter.email){
                alter(newPromoter);
            }else{
                promoterSrvc.isEmailTaken(newPromoter.email).then(function (resp) {
                    if(resp.data.length != 0){
                        $scope.showError = true;
                        $scope.message = "E-mail já cadastrado";
                    }else{
                        alter(newPromoter);
                    }
                });
            }
        };

        $scope.removePromoter = function () {
            var promoter = new promoterSrvc.Promoter();
            promoter.$remove({id: $scope.newPromoter.id}, function () {
                $location.path('/promoter');
            });
        };
    };

    function fornecedoresPromoterCtrl($scope, $location, promoterSrvc) {
        // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click
        $scope.message = ""
        $scope.onlyFavorito = false;
        var fixedFornecedors = []
        promoterSrvc.getFornecedors().then(function(fornecedors){
            fixedFornecedors = fornecedors;
            $scope.fornecedors = fornecedors;
        }, function(err){
            $scope.message = "Falha ao carregar perfil";
        });
        $scope.changeFavorito = function(fornecedor) {
            if(fornecedor.favorito){
                promoterSrvc.addToFavoritos(fornecedor)
            }
            else{
                promoterSrvc.removeFromFavoritos(fornecedor)
            }
        }
        $scope.filterFavorito = function () {
            if($scope.onlyFavorito){
                $scope.fornecedors = fixedFornecedors.filter(function(value){
                    return value.favorito
                });
            }else{
                $scope.fornecedors = fixedFornecedors;
            }
        };
    };

    function servicosPromoterCtrl($scope, $location, promoterSrvc) {
        // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click
        $scope.message = ""
        promoterSrvc.getServicos().then(function(servicos){
            $scope.servicos = servicos;
        }, function(err){
            $scope.message = "Falha ao carregar perfil";
        });

        $scope.cancel = function (servico) {
            promoterSrvc.cancelServico(servico).then(function (newServico){
                Object.keys(newServico).map(function(value) {
                    servico[value] = newServico[value];
                });
            });
        };
    };

    angular.module('hype').controller('novoPromoterCtrl', novoPromoterCtrl);
    angular.module('hype').controller('promoterCtrl', promoterCtrl);
    angular.module('hype').controller('perfilPromoterCtrl', perfilPromoterCtrl);
    angular.module('hype').controller('fornecedoresPromoterCtrl', fornecedoresPromoterCtrl);
    angular.module('hype').controller('servicosPromoterCtrl', servicosPromoterCtrl);
}());