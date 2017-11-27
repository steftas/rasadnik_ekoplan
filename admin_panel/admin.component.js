angular.
  module('adminPage').
  component('adminPage', {
    templateUrl: 'admin_panel/admin.template.html',
    controller: [ '$http', '$scope', '$location',
      	function adminController($http, $scope, $location) {
	        $scope.API = 'ekoPlanAPI/';
	        $scope.state = {};
	        $scope.state.username = "";
	        $scope.state.password = "";

	        $scope.login = function() {
		    	$scope.userLogin(function(data) {
		    		if (data.result == true) {
		    			$location.url('admin_porudzbine');
		    		} else {
		    			alert('wrong credentials');
		    		}
		    	});
		    };

		    $scope.userLogin = function(callback) {
		    	$http({

		            method: 'POST',
		            url: $scope.API + 'User/login',
		            dataType: 'json',
		            headers: {
		                'Content-Type': 'application/json'
		            },
		            data: JSON.stringify($scope.state),
		        }).then(function(res) {
		            if(callback) {
		            	callback(res.data);
		            }
		        }).catch(function(e) {
		        	console.log('error', e)
		            // d.reject(e);
		        });
		    }
		}

    ]

  });