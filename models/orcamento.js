(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Orcamento', {
      nome: Sequelize.STRING
    }, {
      classMethods: {
        associate: function(models) {
          Classe.hasOne(models.evento);
          Classe.hasOne(models.promoter);
          Classe.hasMany(models.propostaServico, {as : "servicos"});
        }
      }
    });
    return Classe;
  };
  module.exports = defineClass;
}());
