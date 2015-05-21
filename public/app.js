var app = angular.module('app', ['ngTable', 'ui.router', 'angular-jwt', 'homectrl', 'auth', 'AuthCtrl', 'item', 'controlpanel', 'ngTable', 'errorctrl', 'itemctrl']).
config(function($stateProvider, $urlRouterProvider, $httpProvider){

  $httpProvider.interceptors.push('authInterceptor');

  $urlRouterProvider.otherwise('/');

  $stateProvider.
  state('home', {
  	url: '/',
  	templateUrl: 'views/home.html',
  	controller: 'home'
  }).
  state('auth', {
  	url: '/',
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
  });
});

app.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
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

