(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Servico', {
      descricao: Sequelize.STRING
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.fornecedor);
          Classe.hasMany(models.valorServico);
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
