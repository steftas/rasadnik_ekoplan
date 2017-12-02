angular.
  	module('galantPage', ['jkuri.gallery']).
  	component('galantPage', {
    	templateUrl: 'pages/galanterija/galanterija.template.html',
    	controller: ['$scope', '$document', '$http', '$routeParams', 'DataService',
        function storeController($scope, $document, $http, $routeParams, DataService) {
          var self = this;
          self.images = [
              {thumb: 'assets/img/galanterija/g1.jpg', img: 'assets/img/galanterija/g1.jpg'},
              {thumb: 'assets/img/galanterija/g2.jpg', img: 'assets/img/galanterija/g2.jpg'},
              {thumb: 'assets/img/galanterija/g3.jpg', img: 'assets/img/galanterija/g3.jpg'},
              {thumb: 'assets/img/galanterija/g4.jpg', img: 'assets/img/galanterija/g4.jpg'},
              {thumb: 'assets/img/galanterija/g5.jpg', img: 'assets/img/galanterija/g5.jpg'},
              {thumb: 'assets/img/galanterija/g6.jpg', img: 'assets/img/galanterija/g6.jpg'},
              {thumb: 'assets/img/galanterija/g7.jpg', img: 'assets/img/galanterija/g7.jpg'},
              {thumb: 'assets/img/galanterija/g8.jpg', img: 'assets/img/galanterija/g8.jpg'},
              {thumb: 'assets/img/galanterija/g9.jpg', img: 'assets/img/galanterija/g9.jpg'},
              {thumb: 'assets/img/galanterija/g10.jpg', img: 'assets/img/galanterija/g10.jpg'},
              {thumb: 'assets/img/galanterija/g11.jpg', img: 'assets/img/galanterija/g11.jpg'},
              {thumb: 'assets/img/galanterija/g12.jpg', img: 'assets/img/galanterija/g12.jpg'},
              {thumb: 'assets/img/galanterija/g13.jpg', img: 'assets/img/galanterija/g13.jpg'},
              {thumb: 'assets/img/galanterija/g14.jpg', img: 'assets/img/galanterija/g14.jpg'},
              {thumb: 'assets/img/galanterija/g15.jpg', img: 'assets/img/galanterija/g15.jpg'},
              {thumb: 'assets/img/galanterija/g16.jpg', img: 'assets/img/galanterija/g16.jpg'},
              {thumb: 'assets/img/galanterija/g17.jpg', img: 'assets/img/galanterija/g17.jpg'},
              {thumb: 'assets/img/galanterija/g18.jpg', img: 'assets/img/galanterija/g18.jpg'},
              {thumb: 'assets/img/galanterija/g19.jpg', img: 'assets/img/galanterija/g19.jpg'},
              {thumb: 'assets/img/galanterija/g20.jpg', img: 'assets/img/galanterija/g20.jpg'},
              {thumb: 'assets/img/galanterija/g21.jpg', img: 'assets/img/galanterija/g21.jpg'},
              {thumb: 'assets/img/galanterija/g22.jpg', img: 'assets/img/galanterija/g22.jpg'},
              {thumb: 'assets/img/galanterija/g23.jpg', img: 'assets/img/galanterija/g23.jpg'},
              {thumb: 'assets/img/galanterija/g24.jpg', img: 'assets/img/galanterija/g24.jpg'},
              {thumb: 'assets/img/galanterija/g25.jpg', img: 'assets/img/galanterija/g25.jpg'},
              {thumb: 'assets/img/galanterija/g26.jpg', img: 'assets/img/galanterija/g26.jpg'},
              {thumb: 'assets/img/galanterija/g27.jpg', img: 'assets/img/galanterija/g28.jpg'}
          ];

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
    	]
	});