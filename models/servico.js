(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Servico', {
      nome: Sequelize.STRING,
      fornecedor: Sequelize.STRING,
      estado: Sequelize.STRING,
      orcamento: Sequelize.REAL
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
      nome: "Buffet do Fornecedor Buffet",
      fornecedor: "Fornecedor Buffet",
      estado: "Orçamento pedido",
      orcamento: 0,
      promoter_id: 1
    },
    {
      nome: "Filmagem do Fornecedor Buffet",
      fornecedor: "Fornecedor Filmagem",
      estado: "Orçamento enviado",
      orcamento: 2000.00,
      promoter_id: 2
    }
  ];

  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
