angular.
  	module('successPage').
  	component('successPage', {
    	templateUrl: 'pages/checkout_success/success.template.html',
    	controller: ['$http', '$scope', '$routeParams', 'DataService',
	        function storeController($http, $scope, $routeParams, DataService) {
	        	$scope.API = 'ekoPlanAPI/';

	        	$scope.customer = {};

		        // get store and cart from service
		        $scope.store = DataService.store;
		        $scope.cart = DataService.cart;

		        var self = this;

		        //get category 
		        $scope.getCategory = function() {
		          $scope.getCategoryService(function(data){
		            $scope.categories = data;
		            self.categories = $scope.categories;
		          });
		        }

		        $scope.getCategoryService = function(callback) {
		          $http({
		                method: 'POST',
		                url: $scope.API + 'Category/getCategory',
		                dataType: 'json',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		            }).then(function(res) {
		                if(callback) {
		                  callback(res.data);
		                }
		            }).catch(function(e) {
		              console.log('error', e)
		                // d.reject(e);
		            });
		        }

		        $scope.insertOrder = function(customer, callback) {
		          $http({
		                method: 'POST',
		                url: $scope.API + 'Orders/createOrder',
		                dataType: 'json',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                data: JSON.stringify({
		                      'data': customer
		                }),
		            }).then(function(res) {
		                if(callback) {
		                  callback(res.data);
		                }
		            }).catch(function(e) {
		              console.log('error', e)
		                // d.reject(e);
		            });
		        }

		        $scope.createOrders = function(item, id, callback) {
		          $http({
		                method: 'POST',
		                url: $scope.API + 'Orders/createItemOrders',
		                dataType: 'json',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                data: JSON.stringify({
		                      'item': item,
		                      'order_id': id
		                }),
		            }).then(function(res) {
		                if(callback) {
		                  callback(res.data);
		                }
		            }).catch(function(e) {
		              console.log('error', e)
		                // d.reject(e);
		            });
		        }

		        $scope.getCategory();

		        $scope.naruci = function() {
		        	var customer = $scope.customer;
		        	var items = DataService.cart.items;

		        	if (items.length == 0) {
		        		return;
		        	}

		        	if (customer.name && customer.address && customer.lastname && customer.zip && customer.city && customer.phone && customer.email && items) {
		        		$scope.insertOrder(customer, function(data) {
		        			if (!data.result) {
		        				return;
		        			}

		        			var check = items.length;
		        			for(var i = 0; i<items.length; i++) {
								$scope.createOrders(items[i], data.result, function(data) {
									if (data.result == true) {
										check -= 1;
										if (check == 0) {
											DataService.cart.items = [];
											$('#ek-modal').modal('show');
										}
									}
								});
							}
		        		});				

		        	}
		        }
		    }
    	]
	});