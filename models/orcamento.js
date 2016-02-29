(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Orcamento', {
      nome: Sequelize.STRING(1024),
      preco: Sequelize.FLOAT,
      descricao: Sequelize.STRING(1024)
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.evento);
          Classe.hasMany(models.propostaServico);
        }
      }
    });
    return Classe;
  };
  module.exports = defineClass;
}());