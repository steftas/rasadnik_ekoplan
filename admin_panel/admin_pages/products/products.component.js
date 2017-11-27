angular.
    module('adminProducts').
    component('adminProducts', {
      templateUrl: 'admin_panel/admin_pages/products/products.template.html',
      controller: ['$http', '$scope', '$interval',
        function adminOrdersController($http, $scope, $interval) {
          $scope.API = 'ekoPlanAPI/';
          var self = this;
          $scope.id = null;
          $scope.name = null;
          $scope.price = null;
          $scope.description = null;
          $scope.stockDesc = null;
          $scope.stock = null;
          $scope.firstPage = null;

          //get product
          $scope.getProduct = function() {
            $scope.getProductsService(function(data) {
              $scope.products = data;
              for(var i = 0; i < data.length; i++) {
                $scope.products[i]['images'] = [
                      data[i].image1, 
                      data[i].image2, 
                      data[i].image3, 
                      data[i].image4
                  ];
              }
            });
          }

          //get category 
          $scope.getCategory = function() {
            $scope.getCategoryService(function(data){
              $scope.data = {
                model: null,
              }
              $scope.categories = data;
            });
          }

          // delete product //
          $scope.deleteProduct = function(id) {
            $scope.deleteProductService(id, function(data) {
              if(data) {
                $scope.getProduct();
              }
            });
          }

          $scope.editProduct = function(id, name, price, description, stockDesc, stock, firstPage, category) {
            $scope.id = id;
            $scope.name = name;
            $scope.price = price;
            $scope.description = description;
            $scope.stockDesc = stockDesc;
            $scope.stock = stock;
            $scope.firstPage = firstPage;
            $scope.data.model = category;
          }
          $scope.check = function(stock) {
            return $scope.stock = stock;
          }
          $scope.checkF = function(firstPage) {
            return $scope.firstPage = firstPage;
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

          $scope.getProductsService = function(callback) {
            $http({
                  method: 'POST',
                  url: $scope.API + 'Product/getProducts',
                  dataType: 'json',
                  headers: {
                      'Content-Type': 'application/json'
                  },
              }).then(function(res) {
                  console.log('result', res.data);

                  if(callback) {
                    callback(res.data);
                  }
              }).catch(function(e) {
                console.log('error', e)
                  // d.reject(e);
              });
          }

          $scope.deleteProductService = function(id, callback) {
            $http({
                  method: 'POST',
                  url: $scope.API + 'Product/deleteProduct',
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

          $scope.getOrders = function() {
            $scope.getOrdersService(function(data) {
              console.log(data);
              
              if (data.result) {
                $scope.orders = data.result;
                self.orders = data.result;
              } else {
                console.log('wrong credentials');
              }
            });
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

          $scope.getProduct();
          $scope.getCategory();
          $scope.getOrders();

          $interval( function() {
            $scope.getOrders();
          }, 10000);
        }
      ]
  });