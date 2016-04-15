(function(){
  'use strict';
  angular.module('hype', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngMessages']);
  angular.module('hype').config(config);
  function config($locationProvider) {
    $locationProvider.html5Mode(true);
  }
}());
