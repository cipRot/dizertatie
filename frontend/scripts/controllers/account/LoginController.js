angular.module('comparison_api').controller('LoginController', function($rootScope, $scope, $http, $timeout ,$location, $locale, userFactory) {
    $scope.$on('$viewContentLoaded', function() {
        App.initAjax(); 
    });

    $scope.err = false;
    $scope.errMes = '';

    $scope.login =function(){
        if(angular.element(".login_form").valid()){
            var username = $scope.username;
            var password = $scope.password;  
            var data ={
                username , 
                password 
            };
         
            userFactory.login(data).success(function(data){ 
                console.log(data)
                if (data.msg !== "No user found!") {
                console.log(data) 
                    $scope.err = false;
                    $scope.errMes = '';
                    localStorage.active = true;
                    localStorage.user_id = data.data._id;
                    localStorage.username = data.data.username;
                    localStorage.type = data.data.type;   
                    $rootScope.header_user = data.data.username;
                    $rootScope.header_user_type = data.data.type;
                   $location.path('/dashboard');
                } else {   
                    $scope.err = true;
                    $scope.errMes = data.msg; 
                    bootbox.alert(data.msg); 
                } 
            })
        } else {
            $scope.err = true;
            $scope.errMes = 'Enter credentials!';
            bootbox.alert('Enter credentials!');
        }
    	
	}
}); 
