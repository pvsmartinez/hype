(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Servico', {
      descricao: Sequelize.STRING
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.fornecedor);
          Classe.hasOne(models.valorServico);
        }
      }
    });
    return Classe;
  };
  module.exports = defineClass;
}());