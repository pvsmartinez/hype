(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Favorito', {
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.promoter, {foreignKey: 'promoter_id'})
          Classe.belongsTo(models.fornecedor, {foreignKey: 'fornecedor_id'})
        }
      }
    });
    return Classe;
  };

  var population = [
    {
      promoter_id: 1,
      fornecedor_id: 2
    },
    {
      promoter_id: 2,
      fornecedor_id: 1
    }
  ];

  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
