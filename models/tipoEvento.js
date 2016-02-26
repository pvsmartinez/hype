(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('TipoEvento', {
      nome: Sequelize.STRING
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
