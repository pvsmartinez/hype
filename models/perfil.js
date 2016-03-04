(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Perfil', {
      nome: Sequelize.STRING,
      birthday: Sequelize.DATE,
      sexo: Sequelize.BOOLEAN
    }, {
      classMethods: {
        associate: function(models) {
          Classe.belongsTo(models.user, {as: 'user'});
        }
      }
    });
    return Classe;
  };
  var population = [
    {
      nome: 'Pedro Santana',
      birthday: new Date('1994-12-01 13:10:10'),
      sexo: false,
      user: {
        email: 'cliente1@gmail.com'
      }
    },
    {
      nome: 'Rafael Freitas',
      birthday: new Date('1989-05-11 13:10:10'),
      sexo: true,
      user: {
        email: 'cliente2@gmail.com'
      }
    },
    {
      nome: 'João Batista',
      birthday: new Date('1993-04-01 13:10:10'),
      sexo: true,
      user: {
        email: 'fornecedor1@gmail.com'
      }
    },
    {
      nome: 'Filipe Arena',
      birthday: new Date('1980-12-01 13:10:10'),
      sexo: false,
      user: {
        email: 'fornecedor2@gmail.com'
      }
    },
    {
      nome: 'Felipe Paiva',
      birthday: new Date('1990-12-01 13:10:10'),
      sexo: true,
      user: {
        email: 'promoter1@gmail.com'
      }
    },
    {
      nome: 'Du Levy',
      birthday: new Date('0000-12-25 00:00:00'),
      sexo: true,
      user: {
        email: 'promoter2@gmail.com'
      }
    },
  ];
  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
