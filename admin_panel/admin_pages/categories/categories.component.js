angular.
    module('adminCategories', ['ngFileUpload']).
    component('adminCategories', {
      templateUrl: 'admin_panel/admin_pages/categories/categories.template.html',
      controller: ['$http', '$scope', '$interval', 'Upload',
          function adminOrdersController($http, $scope, $interval, Upload) {
            $scope.API = 'ekoPlanAPI/';
            var self = this;

            $scope.categories = '';
            $scope.orders = '';

            $scope.name = null;
            $scope.id = null;
            $scope.firstPage = null;
            $scope.categories = '';

            $scope.categoryName = '';
            $scope.categoryFirstPage = false;
            $scope.file = '';

            //get category 
            $scope.getCategory = function() {
              $scope.getCategoryService(function(data){
                $scope.categories = data;
              });
            }

            // add category
            $scope.saveCategory = function() {
              var data = {};
              if ($scope.categoryFirstPage === undefined) {
                $scope.categoryFirstPage = false;
              }

              data['firstPage'] = String($scope.categoryFirstPage);
              data['name'] = $scope.categoryName;

              $scope.insertCategoryService(data, function(data) {
                $scope.getCategory();
              });
            }
            $scope.checked = function(checkedFirstPage) {
              $scope.categoryFirstPage = checkedFirstPage;
            }

            // edit category
            $scope.editCateogry = function(id, name, imgUrl, firstPage) {
              $scope.name = name;
              $scope.firstPage = firstPage;
              $scope.id = id;
            }

            $scope.checkF = function(firstPage) {
              return $scope.firstPage = firstPage;
            }

            $scope.saveEditCategory = function() {
              var data = {
                'name': $scope.name,
                'firstPage': $scope.firstPage,
                'active': 'true'
              };

              console.log('data', data)
              $scope.updateCategoryService($scope.id, data, function(data) {
                console.log(data);
              });
            }

            // delete category //
            $scope.deleteCategory = function(id) {
              $scope.deleteCategoryService(id, function(data) {
                if(data) {
                  $scope.getCategory();
                }
              });
            }

            // file upload //
            $scope.fileUpload = function(file) {
              console.log(file);
            }

            $scope.onFileSelect = function(file) {
              console.log('file is', file);
            }

            $scope.sendPicture = function(file, callback) {
              $http({

                    method: 'POST',
                    url: $scope.API + 'Category/insertCategory',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: JSON.stringify({
                      'file': file
                    })
                }).then(function(res) {
                    if(callback) {
                      callback(res.data);
                    }
                }).catch(function(e) {
                  console.log('error', e)
                    // d.reject(e);
                });
            }

            $scope.insertCategoryService = function(data, callback) {
              $http({
                    method: 'POST',
                    url: $scope.API + 'Category/insertCategory',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                          'data': data
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

            $scope.getCategoryService = function(callback) {
              $http({
                    method: 'POST',
                    url: $scope.API + 'Category/getCategory',
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

            $scope.deleteCategoryService = function(id, callback) {
              $http({
                    method: 'POST',
                    url: $scope.API + 'Category/deleteCategory',
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

            $scope.updateCategoryService = function(id, data, callback) {
              $http({
                    method: 'POST',
                    url: $scope.API + 'Category/deleteCategory',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                          'id': id,
                          'data': data
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

            $scope.getOrders();
            $scope.getCategory();

            $interval( function() {
              $scope.getOrders();
            }, 10000);
        }
      ]
  });