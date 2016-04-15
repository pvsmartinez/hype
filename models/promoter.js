(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Promoter', {
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      senha: Sequelize.STRING,
      especialidade: Sequelize.STRING,
      experiencia: Sequelize.STRING,
      biografia: Sequelize.STRING,
      dataNascimento: Sequelize.DATE
    }, {
      classMethods: {
        associate: function(models) {
          Classe.hasOne(models.tarifacao, {foreignKey: 'promoter_id'})
        }
      }
    });
    return Classe;
  };

  var population = [
    {
      nome: "Felipe",
      email: "admin@admin.com",
      senha: "admin",
      especialidade: "Festas",
      experiencia: "Muitas Festas",
      biografia: "Varias Festas",
      dataNascimento: new Date(new Date().getTime() - 18 * 365*24*60*60*1000)
    },
    {
      nome: "Felipe 2",
      email: "admin2@admin2.com",
      senha: "admin2",
      especialidade: "Casamentos",
      experiencia: "Muitas Casamentos",
      biografia: "Varias Casamentos",
      dataNascimento: new Date(new Date().getTime() - 18 * 365*24*60*60*1000)
    }
  ];

  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
