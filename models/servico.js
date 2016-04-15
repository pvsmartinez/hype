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
      preco: 0
    },
    {
      nome: "Filmagem do Fornecedor Buffet",
      fornecedor: "Fornecedor Filmagem",
      estado: "Orçamento enviado",
      preco: 2000.00
    }
  ];

  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
