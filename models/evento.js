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
        }
      }
    });
    return Classe;
  };
  var population = [
    {
      bio: 'Cliente é muito feliz',
      userId: 0
    },
    {
      bio: 'Cliente é muito calmo',
      userId: 1
    },
  ];
  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
