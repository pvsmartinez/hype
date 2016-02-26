(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('ValorServico', {
      caracteristicas: Sequelize.STRING,
      valor: Sequelize.FLOAT
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.servico);
        }
      }
    });
    return Classe;
  };
  module.exports = defineClass;
}());