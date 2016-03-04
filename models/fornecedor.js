(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Fornecedor', {
      bio: Sequelize.STRING,
      segunda: Sequelize.BOOLEAN,
      terca: Sequelize.BOOLEAN,
      quarta: Sequelize.BOOLEAN,
      quinta: Sequelize.BOOLEAN,
      sexta: Sequelize.BOOLEAN,
      sabado: Sequelize.BOOLEAN,
      domingo: Sequelize.BOOLEAN
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.user, {as: 'user'});
          Classe.hasMany(models.servico);
          Classe.hasMany(models.propostaServico);
        }
      }
    });
    return Classe;
  };
  var population = [
    {
      bio: 'Pois é eu sou um palhaço :/',
      user: {
        email: 'fornecedor1@gmail.com'
      }
    },
    {
      bio: 'ha la la la lã',
      user: {
        email: 'fornecedor2@gmail.com'
      }
    },
  ];
  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
