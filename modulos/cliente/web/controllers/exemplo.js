(function () {
    'use strict';
    function exemploCtrl($scope, exemploService) {
        // No controller, coloque tudo relacionado ao Scope. Em geral são variaveis ou açoes de click
        $scope.nome = 'Pedro';
        $scope.newUser = {};
        $scope.post = function (newUser) {
            exemploService.isEmailTaken(newUser.email).then(function (resp) {
                if (resp.data.length > 0) {
                    console.log('nope!');
                } else {
                    var user = new exemploService.User();
                    user.email = newUser.email;
                    user.senha = newUser.senha;
                    exemploService.User.save(user, function () {
                        console.log('user saved with success');
                    });
                }
            });
        };
    }

    angular.module('hype').controller('exemploCtrl', exemploCtrl);
}());