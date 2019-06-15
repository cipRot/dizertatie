angular.module('comparison_api').controller('CreateController', function($rootScope, $scope, $http, $timeout, $location,  userFactory) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();      
    }); 
    $scope.type = "normal";
    $scope.create= function(){
    	var username = $scope.username; 
        var password = $scope.password;
        var type = $scope.type
         
        var data = {
            username,
            password,
            type
        }

         
        userFactory.addUser(data).then(function(response){
            console.log(response)
            var msg = response.data.msg;
            var status = response.data.sts;
            localStorage.username = username; 
            $scope.header_user = username;
            bootbox.alert(msg);
        })
        
    }

 
});

