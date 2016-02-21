(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('User', {
      email: Sequelize.STRING,
      senha: Sequelize.STRING
    });
    return Classe;
  };
  module.exports = defineClass;
}());
