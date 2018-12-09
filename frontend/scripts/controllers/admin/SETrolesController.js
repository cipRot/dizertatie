angular.module('comparison_api').controller('SETrolesController', function($rootScope,$scope,$http,agentsFactory,$location){
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        refresh();
        if(!$scope.checkRole('ROLE_LIST_ACCOUNTS')){
            $location.path('/dashboard');
        }
    });
    $scope.selectedRoles = [];
    $scope.remaningRoles= [];
    $scope.output = [];
    $scope.showSaveBtn = true;
    $scope.showHeadings = false;

    function refresh(){
        agentsFactory.getAllRoles().then(function(response){
            $scope.roles = response.data; 
            $scope.remaningRoles = response.data; 
        });

        agentsFactory.getGroups_roles().then(function(response){
            $scope.output = [];
        	$scope.groups = response.data; 
            $scope.groups.forEach(function(v,k){ 
                if($scope.output[v.id_group]){
                    $scope.output[v.id_group].push(v);
                } else {
                    $scope.output[v.id_group] = [];
                    $scope.output[v.id_group].push(v);
                }  
            });  
        });
    }

    $scope.enter = function(data){  
        var aR = $scope.remaningRoles;
        data.forEach(function(v){
            aR = aR.filter(function(item) { 
                return item.id !== v.id_role
            })
        });
        $scope.remaningRoles2= aR; 
        $scope.selectedRoles = data.slice(); 
        $scope.selectedGroupName = data[0].group_name;
        $scope.selectedGroupId =data[0].id_group;
        $scope.showHeadings = true;
        $scope.showSaveBtn = true; 
        angular.element('#myModal').modal('show');
    }   

    $scope.add = function(data){ 
        $scope.remaningRoles2 = $scope.remaningRoles2.filter(function(item) {
            return item.id !== data.id 
        }); 

        $scope.selectedRoles.push({
            id_group: $scope.selectedGroupId,
            group_name: $scope.selectedGroupName,
            id_role: data.id, 
            role_name: data.name
        });

        $scope.showSaveBtn = true; 

    }

    $scope.remove = function(data){  
        console.log(data);
        $scope.selectedRoles = $scope.selectedRoles.filter(function(item) { 
            return item.id_role !== data.id_role
        });

        $scope.remaningRoles2.push({
            id: data.id_role,
            name: data.role_name 
        }); 
        $scope.showSaveBtn = true; 
    }

    $scope.save = function(){ 
        var selected = $scope.selectedRoles; 
        console.log(selected, $scope.selectedGroupId);
        agentsFactory.roleGroupRel(selected, $scope.selectedGroupId).then(function(response){ 
            if(response.data == 'true'){
                refresh();
                angular.element('#myModal').modal('hide');
                bootbox.alert('Done');
            }
        });

    }

})