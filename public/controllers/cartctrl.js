angular.module('cartctrl', ['app']).controller('cartctrl', [
'$scope',
'SquareService',
function($scope, SquareService){
  	$scope.cart = [{
    	name: 'Hoss',
    	price: 7.99
  	},
  	{
    	name: 'Jerk',
    	price: 6.99
  	},
  	{
    	name: 'Small Coffee',
    	price: 1.99
    }];
  function total(){
  	$scope.total = 0;
  	for (x in $scope.cart){
  		$scope.total += $scope.cart[x].price;
  	}
  	console.log($scope.total);
  }
  total();
  $scope.remove = function(item){
  	$scope.cart.splice($scope.cart.indexOf(item), $scope.cart.indexOf(item)+1);
  	console.log($scope.cart);
  	total();
  }
}]);