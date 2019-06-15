var comparison_api = angular.module("comparison_api", [
  "pascalprecht.translate",
    "ui.router",
    "ngWebSocket",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
comparison_api.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
comparison_api.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */

/* Setup App Main Controller */
comparison_api.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
       
            // angular.forEach(localStorage, function(k,v){
            //     console.log(v);
            //     $rootScope.storage = {};
            //     $rootScope.storage[v] = v;
            // })
        
        $scope.checkRole = function(text){
            return localStorage[text] == text;
        } 


    });
}]);

/* Setup Layout Part - Quick Sidebar */

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
comparison_api.controller('HeaderController', ['$scope', '$rootScope', '$http', '$location', '$locale', 'userFactory',function($scope ,$rootScope, $http ,$location, $locale, userFactory) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
    $scope.logout = function(){
        bootbox.confirm({
            message: "Are you sure you want to logout?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i>No' ,
                },
                confirm: {
                    label: '<i class="fa fa-check"></i>YES'
                }
            },
            callback: function (result) {
                // if (result == true){
                //     userFactory.logout().then(function(response){
                //         if(response.data.out == true){
                //             $location.path('/login');
                //             localStorage.clear();
                //         }else {
                //             bootbox.alert('Try again!');
                //         }
                        
                //     })
                     
                // }

                if (result == true){ 

                    console.log(1)
                    $location.path('/login');
                    $scope.$apply();
                     
                    localStorage.clear();
                } 
            }
        });
    } 

    


   
    
}]);


/* Setup Layout Part - Footer */
comparison_api.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
comparison_api.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
    
        .state('login', {
            url: "/login",
            templateUrl: "frontend/templates/account/login.html" ,
            data: {pageTitle: ''},
            controller: "LoginController",
            authenticate: false,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/account/LoginController.js' 
                        ]
                    });
                }]
            }
        })

        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "frontend/templates/dashboard/dashboard.html" ,
            data: {pageTitle: 'Dashboard'},
            controller: "DashboardController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/dashboard/DashboardController.js' 
                        ]
                    });
                }]
            }
        })

        .state('create', {
            url: "/create",
            templateUrl: "frontend/templates/account/create.html" ,
            data: {pageTitle: 'create page'},
            controller: "CreateController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/account/CreateController.js' 
                        ]
                    });
                }]
            }
        })

        .state('library', {
            url: "/library",
            templateUrl: "frontend/templates/library/library.html" ,
            data: {pageTitle: 'Library page'},
            controller: "LibraryController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/library/LibraryController.js' 
                        ]
                    });
                }]
            }
        })

        .state('sla', {
            url: "/sla",
            templateUrl: "frontend/templates/sla/sla.html" ,
            data: {pageTitle: 'SLA page'},
            controller: "SLAController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/sla/SLAController.js' 
                        ]
                    });
                }]
            }
        }) 
 
        // $urlRouterProvider.otherwise( function($injector, $location){
        //     var $state = $injector.get('$state');
        //     if($state.current.authenticate == true){
        //         $state.go('dashboard');
        //     }
        //     else{
        //         $state.go('login');
        //     }
        // });

}]);

/* Init global settings and run the app */
comparison_api.run(["$rootScope", "settings", "$state", "$location", "$http", 'userFactory',function($rootScope, settings, $state, $location, $http, userFactory) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
  
    });



}]);
