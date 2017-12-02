angular.
  	module('productPage').
  	component('productPage', {
    	templateUrl: 'pages/product/product.template.html',
    	controller: ['$http', '$scope', '$routeParams', 'DataService',
        function storeController($http, $scope, $routeParams, DataService) {
          $scope.API = 'ekoPlanAPI/';

          // get store and cart from service
          $scope.store = DataService.store;
          $scope.cart = DataService.cart;

          var self = this;

          self.setImage = function setImage(imageUrl) {
            self.mainImageUrl = imageUrl;
          }

          // random products
          var shuffleArray = function(array) {
            var m = array.length, t, i;

            // While there remain elements to shuffle
            while (m) {
              // Pick a remaining element…
              i = Math.floor(Math.random() * m--);

              // And swap it with the current element.
              t = array[m];
              array[m] = array[i];
              array[i] = t;
            }

            return array;
          }

          ///////////////             /////////////////
          //get product
          $scope.getProduct = function() {
            $scope.getProductsService(function(data) {
              $scope.products = data;
              $scope.randomProd = shuffleArray($scope.products);
              for(var i = 0; i < data.length; i++) {
                // console.log($scope.products[i]);
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
              $scope.product['images'] = [
                    data.image1, 
                    data.image2, 
                    data.image3, 
                    data.image4
                ];
              self.product_one = $scope.product;
              self.setImage(self.product_one.images[0]);
              self.product_one.quantity = 1;
              self.myFunc = function() {
                self.product_one.quantity++;              
              };
              self.myFuncMin = function() {
                self.product_one.quantity--;
              };
            });
          }

          //get product by category
          $scope.getProductByCategory = function(category) {
            $scope.getProductsServiceByCategory(category, function(data) {

              $scope.products = data;
              for(var i = 0; i < data.length; i++) {
                // console.log($scope.products[i]);
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
                  url: $scope.API + 'Product/getProductById',
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

          if ($routeParams.productId != null) {
            $scope.getProductById($routeParams.productId);
          }

          $scope.getProduct();
          $scope.getCategory();
          
	    	}
    	]
	});