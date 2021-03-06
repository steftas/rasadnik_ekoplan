angular.
  	module('indexPage').
  	component('indexPage', {
    	templateUrl: 'pages/index/index.template.html',
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
          this.orderProp = 'age';

          //get product
          $scope.getProduct = function() {
            $scope.getProductsService(function(data) {
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

          $scope.getProduct();
          $scope.getCategory();
        }
    	]
	});