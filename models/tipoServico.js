(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('TipoServico', {
      nome: Sequelize.STRING
    });
    return Classe;
  };
  var population = [];
  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
