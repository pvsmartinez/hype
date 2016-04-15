(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Tarifacao', {
      valorTarifa: Sequelize.REAL,
      requisicoes: Sequelize.INTEGER,
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.promoter, {foreignKey: 'promoter_id'})
        }
      }
    });
    return Classe;
  };

  var population = [
    {
      valorTarifa: 0.01,
      requisicoes: 0,
      promoter_id: 1
    },
    {
      valorTarifa: 0.02,
      requisicoes: 0,
      promoter_id: 2
    }
  ];

  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
