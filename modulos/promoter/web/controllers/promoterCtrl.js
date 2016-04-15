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
                // promoter.$save(function (promoter, putResponseHeaders) {
                    $scope.showError = false;
                    $scope.newPromoter = {};
                    $scope.message = "Usuário Cadastrado com sucesso";
                    console.log('promoter saved with success');
                // });
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
            //TODO: Login
            $location.path('/promoter/meusServicos');
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

    };
    function servicosPromoterCtrl($scope, $location, promoterSrvc) {
        // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click

    };

    angular.module('hype').controller('novoPromoterCtrl', novoPromoterCtrl);
    angular.module('hype').controller('promoterCtrl', promoterCtrl);
    angular.module('hype').controller('perfilPromoterCtrl', perfilPromoterCtrl);
    angular.module('hype').controller('fornecedoresPromoterCtrl', fornecedoresPromoterCtrl);
    angular.module('hype').controller('servicosPromoterCtrl', servicosPromoterCtrl);
}());