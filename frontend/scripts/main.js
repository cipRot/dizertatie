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
                if (result == true){
                    userFactory.logout().then(function(response){
                        if(response.data.out == true){
                            $location.path('/login');
                            localStorage.clear();
                        }else {
                            bootbox.alert('Try again!');
                        }
                        
                    })
                     
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
            data: {pageTitle: 'eMail Log'},
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

        .state('profile', {
            url: "/profile",
            templateUrl: "frontend/templates/account/profile.html" ,
            data: {pageTitle: 'Profile page'},
            controller: "ProfileController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/account/ProfileController.js' 
                        ]
                    });
                }]
            }
        })

        .state('history', {
            url: "/history",
            templateUrl: "frontend/templates/history/history.html" ,
            data: {pageTitle: 'History page'},
            controller: "HistoryController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/history/HistoryController.js' 
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


        .state('admin/users', {
            url: "/admin/users",
            templateUrl: "frontend/templates/admin/users.html" ,
            data: {pageTitle: 'Admin - User page'},
            controller: "UsersController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/admin/UsersController.js' 
                        ]
                    });
                }]
            }
        })

        .state('admin/accounts', {
            url: "/admin/accounts",
            templateUrl: "frontend/templates/admin/accounts.html" ,
            data: {pageTitle: 'Admin - ACC page'},
            controller: "AccountsController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/admin/AccountsController.js' 
                        ]
                    });
                }]
            }
        })

        .state('admin/groups', {
            url: "/admin/groups",
            templateUrl: "frontend/templates/admin/groups.html" ,
            data: {pageTitle: 'Admin - Groups page'},
            controller: "GroupsController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/admin/GroupsController.js' 
                        ]
                    });
                }]
            }
        })

        .state('admin/roles', {
            url: "/admin/roles",
            templateUrl: "frontend/templates/admin/roles.html" ,
            data: {pageTitle: 'Admin - Roles page'},
            controller: "RolesController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/admin/RolesController.js' 
                        ]
                    });
                }]
            }
        })

        .state('admin/roles/set', {
            url: "/admin/roles/set",
            templateUrl: "frontend/templates/admin/setroles.html" ,
            data: {pageTitle: 'Admin - Set roles page'},
            controller: "SETrolesController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/admin/SETrolesController.js' 
                        ]
                    });
                }]
            }
        })

        .state('admin/country', {
            url: "/admin/country",
            templateUrl: "frontend/templates/admin/country.html" ,
            data: {pageTitle: 'Admin - Countries page'},
            controller: "CountryController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/admin/CountryController.js' 
                        ]
                    });
                }]
            }
        })

        .state('admin/project', {
            url: "/admin/project",
            templateUrl: "frontend/templates/admin/project.html" ,
            data: {pageTitle: 'Admin - Project page'},
            controller: "ProjectController",
            authenticate: true,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'comparison_api',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'frontend/scripts/controllers/admin/ProjectController.js' 
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
