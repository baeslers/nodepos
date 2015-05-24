var app = angular.module('app', ['ngTable', 'ui.router', 'angular-loading-bar', 'angular-jwt', 'homectrl', 'auth', 'AuthCtrl', 'item', 'controlpanel', 'errorctrl', 'itemctrl', 'pointofsale', 'cartctrl', 'SquareService', 'uploadctrl', 'upload', 'jsTree.directive', 'flow']).
config(function($stateProvider, $urlRouterProvider, $httpProvider){

  $httpProvider.interceptors.push('authInterceptor');
  $httpProvider.interceptors.push('progressHandler');

  $urlRouterProvider.otherwise('/');

  $stateProvider.
  state('home', {
  	url: '/',
  	templateUrl: 'views/home.html',
  	controller: 'home'
  }).
  state('auth', {
  	url: '/auth',
  	templateUrl: 'views/auth.html',
  	controller: 'authcontroller'
  }).
  state('cp', {
    url: '/controlpanel',
    templateUrl: 'views/controlpanel.html',
    controller: 'control'
  }).
  state('error', {
    url: '/error',
    templateUrl: 'views/error.html',
    controller: 'error'
  }).
  state('item', {
    url: '/item',
    templateUrl: 'views/item.html',
    controller: 'itemcontroller'
  }).
  state('pos', {
    url: '/pos',
    templateUrl: 'views/pos.html',
    controller: 'posctrl'
  }).
  state('cc', {
    url: '/',
    templateUrl: '/views/cc.html',
    controller: 'cartctrl'
  });  
});

app.factory('progressHandler', function($rootScope, $q, $window){
  return {
    response: function(response){
      var a = $q.defer(response);
      return response || $q.when(response);
    }
  }
});

app.factory('authInterceptor', function ($rootScope, $q, $window, jwtHelper) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        $window.user = jwtHelper.decodeToken($window.sessionStorage.token);      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        console.log('unauthorized!');
      }
      return response || $q.when(response);
    }
  };
});

