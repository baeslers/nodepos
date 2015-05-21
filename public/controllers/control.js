angular.module('controlpanel', ['app']).controller('control', [
'$scope',
'$window',
'jwtHelper',
'$rootScope',
'$location',
'AuthService',
function($scope, $window, jwtHelper, $rootScope, $location, AuthService){
	$scope.user = AuthService.checkAuth();
	if ($location.path() == '/#/controlpanel' && $scope.user == undefined){
		$rootScope.errormessage = 'you are not permitted to be here';
		$location.path('/error');
	}
	$scope.pchange = function(){
		$scope.pchange = true;
	}
	$scope.redeemInit = function(){
		$scope.redeeminit = true;
	}
	$scope.fetchRewards = function(){
		$scope.fetchrewards = true;
	}
	$scope.changePassword = function(oldpass, newpass){
		AuthService.changePassword();
	}
	$scope.logout = function(){
		AuthService.logout();
	}
}]);