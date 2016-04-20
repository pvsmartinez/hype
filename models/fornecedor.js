(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Fornecedor', {
      nome: Sequelize.STRING,
      servico: Sequelize.STRING,
      preco: Sequelize.REAL
    }, {
      classMethods: {
        associate: function(models) {
          Classe.hasMany(models.favorito, {foreignKey: 'fornecedor_id'})
        }
      }
    });
    return Classe;
  };

  var population = [
    {
      nome: "Fornecedor Buffet",
      servico: "Buffet",
      preco: 1000.00,
    },
    {
      nome: "Fornecedor Filmagem",
      servico: "Filmagem",
      preco: 2000.00,
    }
  ];

  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
