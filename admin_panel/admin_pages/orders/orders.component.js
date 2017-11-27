angular.
  	module('adminOrders').
  	component('adminOrders', {
    	templateUrl: 'admin_panel/admin_pages/orders/orders.template.html',
    	controller: ['$http', '$scope', '$interval',
        	function adminOrdersController($http, $scope, $interval) {
            $scope.API = 'ekoPlanAPI/';
        		var self = this;
            $scope.state = {};
            $scope.orders = {};

            $scope.init = function() {
              $scope.getOrders();
            }

            $scope.listOfOrders = function(order_id) {
              $scope.ordersForModal = [];
              $scope.getOrdersForOrder(order_id, function(data) {
                $scope.ordersForModal = data.result;

                $scope.sum = 0;
                for (order in data.result) {
                  var calc = parseInt(data.result[order].price) * parseInt(data.result[order].quantity);
                  $scope.sum += calc;
                }
                 $scope.init();
                $("#orders").modal()
              })
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

            $interval( function() {
              $scope.getOrders();
            }, 10000);
	    	}
    	]
	});