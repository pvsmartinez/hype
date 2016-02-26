(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('TipoEvento', {
      nome: Sequelize.STRING
    });
    return Classe;
  };
  module.exports = defineClass;
}());
