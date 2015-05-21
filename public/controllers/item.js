angular.module('itemctrl', ['app']).controller('itemcontroller', [
'$scope',
'ItemService',
function($scope, ItemService){

	function handleRes(res){
		if (res.data.ingredients){
			$scope.modifiers = {ingredients: res.data.ingredients, social: res.data.social};
		} else {
			$scope.message = {error: 'no data recieved'};
		}
	}
	var itemObj = {};
	//set these to be the norm for now
	itemObj.pricing_type = 'FIXED_PRICING';
	itemObj.price_money = {
		currency_code: 'USD'
	};
	//set up the model
	$scope.itemObj = {};
	$scope.itemObj.variations = itemObj;
  function verify_and_return(str){
   	return parseFloat(str);
  };

   $scope.create = function(item){
     item.variations.price_money.amount = verify_and_return(item.variations.price_money.amount);
     ItemService.create(item)
       .then(handleRes, handleRes);
   };
   $scope.makemod = function(){
   	 $scope.ingcreate = true;
     $scope.itemsview = false;
     $scope.itemcreate = false;
   }
   $scope.makeitem = function(){
   	 $scope.ingcreate = false;
     $scope.itemsview = false;
     $scope.itemcreate = true;
   }
   $scope.viewitems = function(){
   	 $scope.ingcreate = false;
     $scope.itemcreate = false;
     $scope.itemsview = true;
   }
   $scope.addmod = function(list, opt){
   	 var obj = {list: list, opt: opt};
     ItemService.makemod(obj)
       .then(handleRes, handleRes);
   }
   $scope.posting = function(ing){
   	ItemService.makeIng(ing)
   	  .then(handleRes, handleRes);
   }
}]);