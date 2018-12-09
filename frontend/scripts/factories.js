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

comparison_api.factory('agentsFactory',function($http){
    return {
         getAllAgents : function(){
            return $http({
                url: 'backend/agents/getAgents',
                method: 'GET', 
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            })  
        },
        getGroups_roles : function(){
            return $http({
                url: 'backend/agents/getGroups_roles',
                method: 'GET', 
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            })  
        }, 
        getAllRoles : function(){
            return $http({
                url: 'backend/agents/getRoles',
                method: 'GET', 
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            })  
        },
        changeRole: function(id,name){
            var roleID = 'roleID=' + id+'&name='+name;
            return $http({
                method: "POST",
                data :  roleID ,
                url: 'backend/agents/changeRoleById',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        addRole: function(name){
            var role = 'name='+name;
            return $http({
                method: "POST",
                data :  role ,
                url: 'backend/agents/addRole',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        deleteRole: function(id){
            var roleID = 'id='+id;
            return $http({
                method: "POST",
                data :  roleID ,
                url: 'backend/agents/deleteRole',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        getAllGroups : function(){
            return $http({
                url: 'backend/agents/getGroups',
                method: 'GET', 
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            })  
        },
        changeGroup: function(id,name){
            var groupID = 'groupID=' + id+'&name='+name;
            return $http({
                method: "POST",
                data :  groupID ,
                url: 'backend/agents/changeGroupById',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        addGroup: function(name){
            var group = 'name='+name;
            return $http({
                method: "POST",
                data :  group ,
                url: 'backend/agents/addGroup',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        deleteGroup: function(id){
            var groupID = 'id='+id;
            return $http({
                method: "POST",
                data :  groupID ,
                url: 'backend/agents/deleteGroup',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        roleGroupRel: function(data, group_id){ 
            var store = 'data='+JSON.stringify(data) +'&group_id='+group_id; 
            return $http({
                method: "POST",
                data :  store ,
                url: 'backend/agents/roleGroupRel',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        }
    }
})


comparison_api.factory('countriesFactory',function($http){
    return {
        getCountries : function(){
            return $http({
                url: 'backend/dashboard/getCountries',
                method: 'GET', 
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            }) 
        },
        changeCountries : function(id){
            var projectID = 'projectID=' + id;
            return $http({
                method: "POST",
                data :  projectID ,
                url: 'backend/dashboard/getCountriesByID',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        getCountryProjectRel : function(){ 
            return $http({
                method: "GET", 
                url: 'backend/dashboard/getCountryProjectRel',
                dataType: "json",
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        addCountry : function(name, projects){ 

            var data = 'name=' + name+ '&projects='+JSON.stringify(projects);
            return $http({
                method: "POST",
                url: 'backend/dashboard/addCountry', 
                data :  data ,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        removeCountry : function(id){  
            var data = 'id=' + id;
            return $http({
                method: "POST",
                url: 'backend/dashboard/removeCountry', 
                data :  data ,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        getProjectsBasedOnCountry : function(id){  
            var countryID = 'countryID=' + id;
            return $http({
                method: "POST",
                data :  countryID ,
                url: 'backend/dashboard/getProjectsBasedOnCountry',  
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        editCountry : function(name,countryId, projects){  
            var data = 'name=' + name+'&countryId=' + countryId+ '&projects='+JSON.stringify(projects);
            return $http({
                method: "POST",
                data :  data ,
                url: 'backend/dashboard/editCountry',  
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        deleleCountry : function(id){  
            var countryID = 'countryID=' + id;
            return $http({
                method: "POST",
                data :  countryID ,
                url: 'backend/dashboard/deleleCountry',  
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        }
    }
})

comparison_api.factory('projectsFactory',function($http){
    return {
        getProjects :function(){
            return $http({
                url: 'backend/dashboard/getProjects',
                method: 'GET', 
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            }) 
        },
        removeRelProject : function(id){  
            var data = 'id=' + id;
            return $http({
                method: "POST",
                url: 'backend/dashboard/removeRelProject', 
                data :  data ,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        addProject : function(name, countries){  
            var data = 'name=' + name+ '&countries='+JSON.stringify(countries);
            return $http({
                method: "POST",
                url: 'backend/dashboard/addProject', 
                data :  data ,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        editProject : function(name,projectId, countries){  
            var data = 'name=' + name+'&projectId=' + projectId+ '&countries='+JSON.stringify(countries);
            return $http({
                method: "POST",
                data :  data ,
                url: 'backend/dashboard/editProject',  
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        },
        deleleProject : function(id){  
            var projectID = 'projectID=' + id;
            return $http({
                method: "POST",
                data :  projectID ,
                url: 'backend/dashboard/deleleProject',  
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
        } 
    }
})

comparison_api.factory('userFactory',function($http){
    return {
        login: function(data){
            return $http({
                url: 'backend/user/login',
                method: 'POST',
                data :  data ,
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            })
        },
        update_user: function(data){
            return $http({
                url: 'backend/user/update_user',
                method: 'POST', 
                data :  data ,
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            })
        },
        check_auth: function(){
            return $http({
                url: 'backend/user/check_auth',
                method: 'GET', 
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            })
        },
        logout :function(){ 
             return $http({
                url: 'backend/user/logout',
                method: 'GET', 
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            }) 
        },
        addUser :function(data){ 
             return $http({
                url: 'backend/user/addUser',
                method: 'POST',
                data :  data ,
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            }) 
        },
        deleteUser :function(data){ 
             return $http({
                url: 'backend/user/deleteUser',
                method: 'POST',
                data :  data ,
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
            }) 
        },
        userSLA :function(data){ 
             return $http({
                url: 'backend/user/userSLA',
                method: 'POST',
                data :  data ,
                dataType: "json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                }
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