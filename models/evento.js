(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Evento', {
      start: Sequelize.DATE,
      end: Sequelize.DATE,
      info: Sequelize.STRING(1024)
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.cliente);
          Classe.hasOne(models.tipoEvento);
          Classe.hasMany(models.tipoServico);
        }
      }
    });
    return Classe;
  };
  module.exports = defineClass;
}());
