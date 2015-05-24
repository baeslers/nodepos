angular.module('upload', ['app']).service('Upload', ['$http', function($http){
	this.upload = function(picture){
		return $http.post('/upload', {
			pic: picture
		});
	}
}]);