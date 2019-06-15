comparison_api.factory('emailFactory',function($http){
    return { 
        deleteEmail: function(data){
            var data = 'data='+JSON.stringify(data);
            return $http({
                method: "POST",
                data :  data ,
                url: 'backend/dashboard/deleteEmail',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        }
    }
})

 
comparison_api.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign; 
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);

 
 
comparison_api.factory('userFactory',function($http){
    return {
        login: function(data){
            return $http({
                url: 'http://localhost:3000/login',
                method: 'POST',
                data :  data 
            })
        },
        update_user: function(data){
            return $http({
                url: 'backend/main/update_user',
                method: 'POST', 
                data :  data 
            })
        },
        check_auth: function(){
            return $http({
                url: 'http://localhost:3000/check_auth',
                method: 'GET'
            })
        },
        logout :function(){ 
             return $http({
                url: 'http://localhost:3000/check_auth',
                method: 'GET'
            }) 
        },
        addUser :function(data){ 
             return $http({
                url: 'http://localhost:3000/addUser',
                method: 'POST',
                data :  data 
            }) 
        },
        deleteUser :function(data){ 
             return $http({
                url: 'http://localhost:3000/deleteUser',
                method: 'POST',
                data :  data 
            }) 
        }
         
    } 
    
})
comparison_api.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign; 
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
 
comparison_api.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'frontend/assets',
        globalPath: 'frontend/assets/global',
        layoutPath: 'frontend/assets/layouts/layout3',
    };

    $rootScope.settings = settings;

    return settings;
}]);