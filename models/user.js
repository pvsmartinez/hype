(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('User', {
      email: Sequelize.STRING,
      senha: Sequelize.STRING
    }, {
      classMethods: {
        associate: function(models) {
          Classe.hasOne(models.perfil, {as: 'perfil', foreignKey: 'userId'});
        }
      }
    });
    return Classe;
  };
  var population = [
    {
      id: 1,
      email: 'cliente1@gmail.com',
      senha: 'cliente1@gmail.com'
    },
    {
      id: 2,
      email: 'cliente2@gmail.com',
      senha: 'cliente2@gmail.com'
    },
    {
      id: 3,
      email: 'fornecedor1@gmail.com',
      senha: 'fornecedor1@gmail.com'
    },
    {
      id: 4,
      email: 'fornecedor2@gmail.com',
      senha: 'fornecedor2@gmail.com'
    },
    {
      id: 5,
      email: 'promoter1@gmail.com',
      senha: 'promoter1@gmail.com'
    },
    {
      id: 6,
      email: 'promoter2@gmail.com',
      senha: 'promoter2@gmail.com'
    },
  ];
  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
