angular.module('auth', ['app']).service('AuthService', [
'$http', 
'$window',
'jwtHelper',
'$location',
function($http, $window, jwtHelper, $location){
	this.checkAuth = function(){
		if ($window.sessionStorage.token){
			return jwtHelper.decodeToken($window.sessionStorage.token);
		} else {
			return undefined;
		}
	}
	this.logout = function(){
		delete $window.sessionStorage.token;
		$location.path('/');		
	}
	this.login = function(username, password){
		return $http.post('auth/signin', {
			username: username,
			password: password
		});
	}
	this.register = function(userObject){
		return $http.post('auth/register', {
		  	userObj: userObject		
		});
	}
}]);