(function(){
  "use strict";
  var defineClass = function (Sequelize, sequelize) {
    var Classe = sequelize.define('User', {
      email: Sequelize.STRING,
      senha: Sequelize.STRING
    });
    return Classe;
  };
  var population = [
    {
      email: 'cliente1@gmail.com',
      senha: 'cliente1@gmail.com'
    },
    {
      email: 'cliente2@gmail.com',
      senha: 'cliente2@gmail.com'
    },
    {
      email: 'fornecedor1@gmail.com',
      senha: 'fornecedor1@gmail.com'
    },
    {
      email: 'fornecedor2@gmail.com',
      senha: 'fornecedor2@gmail.com'
    },
    {
      email: 'promoter1@gmail.com',
      senha: 'promoter1@gmail.com'
    },
    {
      email: 'promoter2@gmail.com',
      senha: 'promoter2@gmail.com'
    },
  ];
  module.exports = {
    defineClass : defineClass,
    population : population
  };
}());
