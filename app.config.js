var EkoPlan = angular.
  module('eko-plan').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          template: '<index-page></index-page>'
        }).
        when('/prodavnica', {
          template: '<shop-page></shop-page>'
        }).
        when('/prodavnica/:categoryId', {
          template: '<category-page></category-page>'
        }).
        when('/prodavnica/proizvod/:productId', {
          template: '<product-page></product-page>'
        }).
        when('/checkout', {
          template: '<checkout-page></checkout-page>'
        }).
        when('/success', {
          template: '<success-page></success-page>'
        }).
        when('/kontakt', {
          template: '<contact-page></contact-page>'
        }).
        when('/galanterija', {
          template: '<galant-page></galant-page>'
        }).
        when('/sibirski_limun', {
          template: '<limun-page></limun-page>'
        }).
        when('/paulovnija', {
          template: '<paulovnija-page></paulovnija-page>'
        }).
        when('/ekoplan_adminPanel', {
          template: '<admin-page></admin-page>'
        }).
        when('/admin_porudzbine', {
          template: '<admin-orders></admin-orders>'
        }).
        when('/admin_proizvodi', {
          template: '<admin-products></admin-products>'
        }).
        when('/admin_kategorije', {
          template: '<admin-categories></admin-categries>'
        }).
        otherwise('/');
    }
  ]);

EkoPlan.factory("DataService", function() {
  var myStore = new store();
  var myCart = new shoppingCart("eko-plan");
  
  return {
    store: myStore,
    cart: myCart
  };
});

EkoPlan.directive('loading', ['$http' ,function ($http) {
      return {
          restrict: 'A',
          link: function (scope, elm, attrs) {
              scope.isLoading = function () {
                  return $http.pendingRequests.length > 0;
              };
              scope.$watch(scope.isLoading, function (v) {
                  if(v){
                      elm.show();
                  }else{
                      elm.hide();
                  }
              });
          }
      };
  }]);