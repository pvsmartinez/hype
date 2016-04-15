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

                var promoter = new promoterSrvc.Promoter();
                promoter.nome = newPromoter.nome;
                promoter.email = newPromoter.email;
                promoter.senha = newPromoter.senha;
                promoter.especialidade = newPromoter.especialidade;
                promoter.experiencia = newPromoter.experiencia;
                promoter.biografia = newPromoter.biografia;
                promoter.dataNascimento = newPromoter.dataNascimento;

                //TODO: Save
                promoter.$save(function (promoter, putResponseHeaders) {
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
        $scope.newPromoter = {
            nome: "Felipe",
            email: "admin@admin.com",
            especialidade: "Festas",
            experiencia: "Muitas Festas",
            biografia: "Varias Festas",
            dataNascimento: new Date(99,5,24)
        };
        $scope.message = ""

        $scope.alterPromoter = function (isvalid, newPromoter) {
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

                var promoter = new promoterSrvc.Promoter();
                promoter.nome = newPromoter.nome;
                promoter.email = newPromoter.email;
                promoter.senha = newPromoter.senha;
                promoter.especialidade = newPromoter.especialidade;
                promoter.experiencia = newPromoter.experiencia;
                promoter.biografia = newPromoter.biografia;
                promoter.dataNascimento = newPromoter.dataNascimento;

                //TODO: alter
                // promoter.$save(function (promoter, putResponseHeaders) {
                    $scope.showError = false;
                    $scope.message = "Usuário alterado com sucesso";
                    console.log('promoter altered with success');
                // });
            });
        };
    };
    function fornecedoresPromoterCtrl($scope, $location, promoterSrvc) {
        // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click
        $scope.showError = false;
        $scope.message = ""
        $scope.onlyFavorito = false;
        var fornecedores = [
        {
            nome: "Fornecedor Buffet",
            servico: "Buffet",
            preco: 1000,
            favorito: false
        },
        {
            nome: "Fornecedor Filmagem",
            servico: "Filmagem",
            preco: 2000,
            favorito: true
        }];
        $scope.fornecedores = fornecedores;

        $scope.filterFavorito = function () {
            if($scope.onlyFavorito){
                $scope.fornecedores = fornecedores.filter(function(value){
                    return value.favorito
                });
            }else{
                $scope.fornecedores = fornecedores;
            }
        };
    };
    function servicosPromoterCtrl($scope, $location, promoterSrvc) {
        // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click
        $scope.showError = false;
        $scope.message = ""
        $scope.servicos = [
        {
            nome: "Buffet do fornecedor de Buffet",
            fornecedor: "Fornecedor de Buffet",
            estado: "Orçamento pedido",
            orcamento: 0
        },
        {
            nome: "Filmagem do fornecedor de Filmagem",
            fornecedor: "Fornecedor de Filmagem",
            estado: "Orçamento mandado",
            orcamento: 2000
        }];

        $scope.cancel = function (servico) {
            servico.estado = "Cancelado"
        };
    };

    angular.module('hype').controller('novoPromoterCtrl', novoPromoterCtrl);
    angular.module('hype').controller('promoterCtrl', promoterCtrl);
    angular.module('hype').controller('perfilPromoterCtrl', perfilPromoterCtrl);
    angular.module('hype').controller('fornecedoresPromoterCtrl', fornecedoresPromoterCtrl);
    angular.module('hype').controller('servicosPromoterCtrl', servicosPromoterCtrl);
}());