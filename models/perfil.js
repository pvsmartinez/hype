(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Perfil', {
      nome: Sequelize.STRING,
      birthday: Sequelize.DATE,
      sexo: Sequelize.BOOLEAN
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.user);
        }
      }
    });
    return Classe;
  };
  module.exports = defineClass;
}());
