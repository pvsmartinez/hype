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
      nome: 'Festa de 15 Anos'
    },
    {
      nome: 'Casamento'
    },
    {
      nome: 'Confraternização'
    }
  ];
  
  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
