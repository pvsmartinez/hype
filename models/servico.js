(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Servico', {
      descricao: Sequelize.STRING
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.fornecedor);
          Classe.hasMany(models.valorServico);
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
