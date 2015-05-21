var app = angular.module('homectrl', ['app']).controller('home', [
'$scope',
'$window',
'ItemService',
'AuthService',
'jwtHelper',
function($scope, $window, ItemService, AuthService, jwtHelper){ 
  function handleRes(res){
  	if (res.data.items){
  		$scope.items = res.data.items;
  	}
  }
  if ($window.sessionStorage.token){
    $scope.user = jwtHelper.decodeToken($window.sessionStorage.token);
  }


}]);
