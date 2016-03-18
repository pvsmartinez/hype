(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('Perfil', {
      nome: Sequelize.STRING,
      birthday: Sequelize.DATE,
      sexo: Sequelize.BOOLEAN
    });
    return Classe;
  };
  var population = [
    {
      nome: 'Pedro Santana',
      birthday: new Date('1994-12-01 13:10:10'),
      sexo: false,
      userId: 1
    },
    {
      nome: 'Rafael Freitas',
      birthday: new Date('1989-05-11 13:10:10'),
      sexo: true,
      userId: 2
    },
    {
      nome: 'João Batista',
      birthday: new Date('1993-04-01 13:10:10'),
      sexo: true,
      userId: 3
    },
    {
      nome: 'Filipe Arena',
      birthday: new Date('1980-12-01 13:10:10'),
      sexo: false,
      userId: 4
    },
    {
      nome: 'Felipe Paiva',
      birthday: new Date('1990-12-01 13:10:10'),
      sexo: true,
      userId: 5
    },
    {
      nome: 'Du Levy',
      birthday: new Date('0000-12-25 00:00:00'),
      sexo: true,
      userId: 6
    },
  ];

  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
