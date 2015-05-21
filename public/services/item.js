angular.module('item', ['app']).service('ItemService', [
'$http', 
function($http){
	this.all = function(){
		return $http.get('/api/items');
	}
	this.create = function(item){
		return $http.post('/square/item', {
			item: item
		});
	}
	this.makeMod = function(mod){
		return $http.post('/square/mod', {
			mod: mod
		});
	}
	this.itemList = function(){
		return $http.get('/square/items');
	}
	this.getIngs = function(){
		return $http.get('/square/ingredients');
	}
}]);