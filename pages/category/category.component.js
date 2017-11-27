angular.
  	module('categoryPage').
  	component('categoryPage', {
    	templateUrl: 'pages/category/category.template.html',
    	controller: ['$http', '$scope', '$routeParams', 'DataService',
        function storeController($http, $scope, $routeParams, DataService) {
          $scope.API = 'ekoPlanAPI/';

          // get store and cart from service
          $scope.store = DataService.store;
          $scope.cart = DataService.cart;

          // use routing to pick the selected product
          if ($routeParams.productId != null) {
            $scope.product = $scope.store.getProduct($routeParams.productId);
          }
          var self = this;
          self.products = [];
          self.category = [];


          ///////////////             /////////////////
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

              self.products = $scope.products;
            });
          }

          //get product by id
          $scope.getProductById = function(id) {
            $scope.getProductsServiceById(id, function(data) {
              $scope.product = data;
                $scope.products['images'] = [
                      data[i].image1, 
                      data[i].image2, 
                      data[i].image3, 
                      data[i].image4
                  ];
            });
          }

          //get product by category
          $scope.getProductByCategory = function(category) {
            $scope.getProductsServiceByCategory(category, function(data) {

              $scope.products = data;
              for(var i = 0; i < data.length; i++) {
                $scope.products[i]['images'] = [
                      data[i].image1, 
                      data[i].image2, 
                      data[i].image3, 
                      data[i].image4
                  ];
              }

              self.products = $scope.products;
            });
          }

          //get category 
          $scope.getCategory = function() {
            $scope.getCategoryService(function(data){
              $scope.data = {
                model: null,
              }
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
                  // data: JSON.stringify({
                  //       'data': data
                  // }),
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
                  // data: JSON.stringify({
                  //       'data': data
                  // }),
              }).then(function(res) {
                  if(callback) {
                    callback(res.data);
                  }
              }).catch(function(e) {
                console.log('error', e)
                  // d.reject(e);
              });
          }

          $scope.getProductsServiceByCategory = function(category, callback) {
            $http({
                  method: 'POST',
                  url: $scope.API + 'Product/getProductByCategory',
                  dataType: 'json',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({
                        'category': category
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

          $scope.getProductsServiceById = function(id, callback) {
            $http({
                  method: 'POST',
                  url: $scope.API + 'Product/getProductByCategory',
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

          if ($routeParams.productId) {
            $scope.getProductById($routeParams.productId);
          }

          if ($routeParams.categoryId) {
            $scope.getProductByCategory($routeParams.categoryId);
          } else {
            $scope.getProducty();
          }
          $scope.getCategory();

          self.displayProductsFrom = 1;
          self.displayProductsTo = 12;
          self.currentPage = 0;
          self.pageSize = 12;

          self.numberOfPages = function(){
              return Math.ceil(self.products.length/self.pageSize);                
          }

          self.productsTo = function() {
            self.displayProductsTo = self.displayProductsTo + self.pageSize;
            if (self.displayProductsTo > self.products.length) {
              self.displayProductsTo = self.products.length;
            } else {
              return self.displayProductsTo;
            }
          }

          self.productsToMin = function() {
            self.displayProductsTo = self.displayProductsTo - self.pageSize;
            if (self.displayProductsTo < self.pageSize) {
              self.displayProductsTo = self.pageSize;
            } else {
              return self.displayProductsTo;
            }
          }
        }
      ]
    }).
    filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });