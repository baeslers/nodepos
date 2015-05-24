angular.module('uploadctrl', ['app']).controller('UploadCtrl', ['$scope', 'Upload', function($scope, Upload){
	$scope.upload = function(picture){
		console.log(picture);
		Upload.upload(picture)
		  .then(function(){}, function(data, status, config, headers){
		  	
		  }, function(){

		  });
	}
}]);