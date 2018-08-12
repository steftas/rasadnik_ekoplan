angular.
  	module('adminOrdersBih').
  	component('adminOrdersBih', {
    	templateUrl: 'admin_panel/admin_pages/ordersBIH/orders.template.html',
    	controller: ['$http', '$scope', '$interval',
        	function adminOrdersController($http, $scope, $interval) {
            $scope.API = 'ekoPlanAPI/';
        		var self = this;
            $scope.state = {};
            $scope.orders = {};

            $scope.init = function() {
              $scope.getOrders();
            }

            $scope.listOfOrders = function(order) {
              $scope.ordersForModal = [];
              $scope.customText = '';

              $scope.getOrdersForOrder(order.id, function(data) {
                if (order.custom_added === 'true') {
                  $scope.customText = data.result;
                } else {
                  $scope.ordersForModal = data.result;

                  $scope.sum = 0;
                  for (order_val in data.result) {
                    var calc = parseInt(data.result[order_val].price) * parseInt(data.result[order_val].quantity);
                    $scope.sum += calc;
                  }
                }
              });

              $scope.init();
              $("#orders").modal();
            }

            $scope.getOrders = function() {

              $scope.getOrdersService(function(data) {
                
                if (data.result) {
                  $scope.orders = data.result;
                  self.orders = data.result;

                } else {
                  console.log('wrong credentials');
                }
              });
            };

            $scope.deleteOrder = function(orderID) {

              $scope.deleteOrderService(orderID, function(data) {
                var r = confirm("Da li hoces da izbrises?");
                if (r === true) {
                  $scope.init();
                };                
              })
            };

            $scope.getOrdersService = function(callback) {
              $http({

                  method: 'GET',
                  url: $scope.API + 'Orders/getOrders',
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

            $scope.getOrdersForOrder = function(order_id, callback) {
              $http({

                  method: 'POST',
                  url: $scope.API + 'Orders/getListofOrders',
                  dataType: 'json',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({
                    'id': order_id
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

            $scope.deleteOrderService = function(id, callback) {
              $http({

                  method: 'POST',
                  url: $scope.API + 'Orders/deleteOrder',
                  dataType: 'json',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({
                    'id': id
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

            $scope.createOrders = function() {
              var customer = $scope.customer;

              customer['order_state'] = 'bih';
              customer['price'] = 0;
              customer['custom_added'] = true;

              if (customer.name && customer.address && customer.lastname && customer.zip && customer.city && customer.phone && customer.email && customer.order_text) {
                $scope.insertOrder(customer, function(data) {
                  console.log(data);

                  if (!data.result) {
                    return;
                  } else {
                    $('#orderModalADD').modal('toggle');
                  }
                });       
              }
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

            // $interval( function() {
            //   $scope.getOrders();
            // }, 10000);
	    	}
    	]
	});