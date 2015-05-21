angular.module('AuthCtrl', ['app']).controller('authcontroller', [
'$scope',
'AuthService',
'$location',
'$window',
'jwtHelper',
function($scope, AuthService, $location, $window, jwtHelper){
  
  function handleRes(res){
    console.log(res);
    if (res.data){
      if (res.data.token){
        $window.sessionStorage.token = res.data.token;
        $location.path('/controlpanel');
      }
      if (res.data.message){
        $scope.authMessage = res.data.message;
      }
    }
  }
  $scope.login_start = true;
  $scope.regButton = function(){
  	$scope.login_start = false;
  	$scope.register_start = true;
  }
  $scope.logButton = function(){
  	$scope.login_start = true;
  	$scope.register_start = false;
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