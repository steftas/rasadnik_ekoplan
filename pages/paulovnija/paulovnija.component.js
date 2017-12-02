angular.
  	module('paulovnijaPage').
  	component('paulovnijaPage', {
    	templateUrl: 'pages/paulovnija/paulovnija.template.html',
    	controller: ['$http', '$scope', '$routeParams', 'DataService',
        function storeController($http, $scope, $routeParams, DataService) {
          $scope.API = 'ekoPlanAPI/';

          var self = this;
          this.orderProp = 'age';

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

          $scope.getCategory();
        }
    ]});