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

          var self = this;
          self.products = [];

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

          $scope.getProductByCategory($routeParams.categoryId);
          $scope.getCategory();

          $scope.categoryNameId = $routeParams.categoryId;

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