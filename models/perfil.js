(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Perfil', {
      nome: Sequelize.STRING,
      birthday: Sequelize.DATE,
      sexo: Sequelize.BOOLEAN
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.user);
        }
      }
    });
    return Classe;
  };
  var population = [
    {
      nome: 'João Batista',
      birthday: ''
    },
    {
      email: 'cliente2@gmail.com',
      senha: 'cliente2@gmail.com'
    },
    {
      email: 'fornecedor1@gmail.com',
      senha: 'fornecedor1@gmail.com'
    },
    {
      email: 'fornecedor2@gmail.com',
      senha: 'fornecedor2@gmail.com'
    },
    {
      email: 'promoter1@gmail.com',
      senha: 'promoter1@gmail.com'
    },
    {
      email: 'promoter2@gmail.com',
      senha: 'promoter2@gmail.com'
    },
  ];
  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
