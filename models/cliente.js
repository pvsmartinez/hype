(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Cliente', {
      bio: Sequelize.STRING
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.user, {as: 'user', foreignKey: 'userId'});
        }
      }
    });
    return Classe;
  };
  var population = [
    {
      bio: 'Cliente é muito feliz',
      user: {
        email: 'cliente1@gmail.com'
      }
    },
    {
      bio: 'Cliente é muito calmo',
      user: {
        email: 'cliente2@gmail.com'
      }
    },
  ];
  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
