(function() {
  "use strict";
  var defineClass = function(Sequelize, sequelize) {
    var Classe = sequelize.define('Evento', {
      start: Sequelize.DATE,
      info: Sequelize.STRING(1024)
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.cliente, {
            as: 'cliente'
          });
          Classe.hasOne(models.tipoEvento);
          Classe.hasMany(models.tipoServico);
        }
      }
    });
    return Classe;
  };
  var population = [{
    start: new Date(),
    info: 'meu aniversario é hoje, é hoje, é hoje!',
    cliente: {
      email: 'cliente1@gmail.com'
    }
  }, {
    start: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    info: 'Palestra interessante',
    cliente: {
      email: 'cliente2@gmail.com'
    }
  }];
  module.exports = {
    defineClass: defineClass,
    population: population
  };
}());
