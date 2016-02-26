(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Orcamento', {
      nome: Sequelize.STRING
    }, {
      classMethods: {
        associate: function(models) {
          Classe.hasOne(models.evento);
          Classe.hasOne(models.promoter);
          Classe.hasMany(models.propostaServico, {as : "servicos"});
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
