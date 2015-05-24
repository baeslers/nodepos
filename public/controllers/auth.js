angular.module('AuthCtrl', ['app']).controller('authcontroller', [
'$scope',
'AuthService',
'$location',
'$window',
'jwtHelper',
'$timeout',
function($scope, AuthService, $location, $window, $timeout){
  
  function handleRes(res){
    console.log(res);
    if (res.data){
      if (res.data.message){
        $scope.authMessage = res.data.message;
      }
    }
  }
  $scope.change = function(){
    setTimeout(function(){
      $location.path('/');
    }, 2);
  }
  $scope.login = function(userObj){
    AuthService.login(userObj.username, userObj.password)
      .then(handleRes, handleRes)
  }
  $scope.register = function(user){
  	AuthService.register(user)
  	  .then(handleRes, handleRes)
  }

}]);