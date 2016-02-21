(function(){
  'use strict';
  angular.module('hype', ['ngRoute', 'ui.bootstrap']);
  angular.module('hype').config(config);
  function config($locationProvider) {
    $locationProvider.html5Mode(true);
  }
}());
