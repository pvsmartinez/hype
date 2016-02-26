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
          Classe.belongsTo(models.user);
          Classe.hasMany(models.servico);
          Classe.hasMany(models.propostaServico);
        }
      }
    });
    return Classe;
  };
  module.exports = defineClass;
}());