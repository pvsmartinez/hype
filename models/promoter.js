(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Promoter', {
      bio: Sequelize.STRING
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.user, {as: 'user'});
          Classe.hasMany(models.tipoEvento, {as:'especialidades'});
          Classe.hasMany(models.orcamento);
        }
      }
    });
    return Classe;
  };

  var population = [
    {
      bio: 'Ouça os meus conselhos!',
      userId: 5
    },
    {
      bio: 'Agua se tornará vinho. Só preciso de 3 pães e 3 vinhos.',
      userId: 6
    },
  ];

  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
