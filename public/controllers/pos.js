angular.module('pointofsale', ['app']).controller('posctrl', [
'$scope',
'ItemService',
function($scope, ItemService){

  $scope.department = ['Deli', 'Bakery', 'Grocery', 'Floral', 'Wine'];

  function format(item){
  	var itemObj = {};
  	for (x in item.variations){

  	}
  	return itemObj;
  }

  function buildObject(tv, itemObj, callback){
  	for (x in tv){
  	  itemObj[x] = tv[x];
  	}
  	callback(itemObj);
  }
  function buildarray(item){
  	var variation = item.variations;
  	var name = item.name;
  	var arr = [];
    for (x in variation){
    	var tv = variation[x];
    	var itemObj = {};
    	buildObject(tv, itemObj, function(result){
    		itemObj.name = item.name+' - '+result.name;
    		itemObj.price = (itemObj.price_money.amount/100);
        	arr.push(itemObj);
    	});
    }
    return arr;
  }

  $scope.initTable = function(){
    ItemService.getIngs()
      .then(function(data, status, headers, config){
        $scope.ingredients = data.data.data;
      });
    ItemService.itemList()
      .then(function(data, status, headers, config){
        var items = data.data.data;
        var final_item_array = [];
        for (x in items){
          	var vars = buildarray(items[x]);
          	for (x in vars){
          		final_item_array.push(vars[x]);
          	}          
        }
        $scope.items = final_item_array;
      });
  }
}]);