angular.module('comparison_api').controller('ProfileController', function($rootScope, $scope, $http, $timeout, $location, Timer, userFactory) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();      
    });

    userFactory.check_auth().then(function(response){ 
        $scope.username = response.data.username ;
        $scope.email = response.data.email; 
    });   

    $scope.update= function(){
    	var username = $scope.username;
        var email = $scope.email;
        var password = $scope.password;
        var re_password = $scope.re_password;
        var old_password = $scope.old_password; 

        if(re_password == undefined){
            re_password = ""; 
        }

        if(password == undefined){
            password = ""; 
        } 

        var data = 'username='+username+'&email='+email+'&password='+password+'&re_password='+re_password+'&old_password='+old_password;

        if(angular.element("#form").valid()){
            userFactory.update_user(data).then(function(response){
                var msg = response.data.msg;
                var status = response.data.sts;
                localStorage.username = username; 
                $scope.header_user = username;
                bootbox.alert(msg);
            })
        }
    }


    angular.element("#form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            username: {
                required: true
            },
            old_password: { 
                required: true,
            }, 
            re_password: { 
                equalTo: "#password"
            }
        }
    });
});

