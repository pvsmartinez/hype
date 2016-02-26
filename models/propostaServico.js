(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('PropostaServico', {
      data: Sequelize.DATE,
      comentarios: Sequelize.STRING,
      valor: Sequelize.FLOAT
    }, {
      classMethods: {
        associate: function(models) {
          Classe.hasOne(models.valorServico);
        }
      }
    });
    return Classe;
  };
  module.exports = defineClass;
}());
