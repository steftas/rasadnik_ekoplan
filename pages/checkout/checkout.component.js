angular.
  	module('checkoutPage').
  	component('checkoutPage', {
    	templateUrl: 'pages/checkout/checkout.template.html',
    	controller: ['$http', '$scope', '$routeParams', 'DataService',
	        function storeController($http, $scope, $routeParams, DataService) {
	        	$scope.API = 'ekoPlanAPI/';

	        	$scope.customer = {};

		        // get store and cart from service
		        $scope.store = DataService.store;
		        $scope.cart = DataService.cart;

		        $scope.type = false;

		        console.log($scope.cart.items);

		        for (var i = 0; i < $scope.cart.items.length; i++) {
		        	if ( $scope.cart.items[i].type === 'За македонскиот пазар') {
		        		$scope.type = true;
		        	}
		        }

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
		                }
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

		        $scope.sendMailService = function(customer, items, callback) {
		          $http({
		                method: 'POST',
		                url: $scope.API + 'Orders/sendMailOrder',
		                dataType: 'json',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                data: JSON.stringify({
		                      'customer': customer,
		                      'items': items
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

		        	var sum = 0;
		        	for (var i=0; i<items.length; i++) {
		        		var s = parseInt(items[i].quantity) * parseInt(items[i].price);
		        		sum += s;
		        	}
		        	customer['price'] = sum;

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

											// fix me
											$scope.sendMailService(customer, items, function(data) {

												window.location.assign("#!/success");
											});
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