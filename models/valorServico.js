(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('ValorServico', {
      porPessoa: Sequelize.FLOAT,
      porHora: Sequelize.FLOAT
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.servico);
        }
      }
    });
    return Classe;
  };
  var population = [];
  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
