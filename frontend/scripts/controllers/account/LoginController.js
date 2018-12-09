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
            var data ="username="+username+"&password="+password;  
         
            userFactory.login(data).success(function(data){ 
                if (!data.error) { 
                    $scope.err = false;
                    $scope.errMes = '';
                    localStorage.active = data.active;
                    localStorage.user_id = data.id;
                    localStorage.username = data.username;
                    localStorage.email = data.email; 
                    var roles = data.roles; 
                    roles.forEach(function(v, k){ 
                        localStorage[v.name] = v.name;
                    });  
                    $rootScope.header_user = data.username;
                   $location.path('/dashboard');
                } else {   
                    $scope.err = true;
                    $scope.errMes = data.msg; 
                } 
            })
        } else {
            $scope.err = true;
            $scope.errMes = 'Enter credentials!';
        }
    	
	}
}); 
