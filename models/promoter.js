(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Promoter', {
      bio: Sequelize.STRING
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.user);
          Classe.hasMany(models.tipoEvento, {as:'especialidades'});
          Classe.hasMany(models.orcamento);
        }
      }
    });
    return Classe;
  };
  module.exports = defineClass;
}());
