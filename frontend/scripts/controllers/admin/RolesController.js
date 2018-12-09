angular.module('comparison_api').controller('RolesController', function($rootScope,$scope,$http,agentsFactory,$location){
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        loadRoles();
        if(!$scope.checkRole('ROLE_LIST_ACCOUNTS')){
            $location.path('/dashboard');
        }
    });
	
	function loadRoles(){
		agentsFactory.getAllRoles().then(function(response){ 
	    	$scope.roles = response.data;
		});
	}	
	

	$scope.edit = function(id){
		angular.element('#myModal').modal('show');
		var item = $scope.roles.filter(function(role){
			return role.id == id;
		})
		$scope.role = item[0].name;
		$scope.name = item[0].name;
		$scope.id = item[0].id;

	}

	$scope.edit_changes = function(id,name){
		agentsFactory.changeRole(id,name).then(function(response){
		 	if(response.data == 'true'){
		 		loadRoles();
		 		bootbox.alert('Changes saved!');
		 	} else{
		 		bootbox.alert('Changes not saved!');
		 	}
		 	angular.element('#myModal').modal('hide');
		});
	}


	$scope.add_role = function(){
		angular.element('#addRole').modal('show');
	}

	$scope.insert_role_btn = function(name){
		agentsFactory.addRole(name).then(function(response){
		 	if(response.data == 'true'){
		 		loadRoles();
		 		bootbox.alert('Role added successfully!');
		 	} else{
		 		bootbox.alert('Action failed!');
		 	}
		 	angular.element('#addRole').modal('hide');
		});
	}

	$scope.delete = function(id){ 
		agentsFactory.deleteRole(id).then(function(response){
		 	if(response.data == 'true'){
		 		loadRoles();
		 		bootbox.alert('Role deleted!');
		 	} else{
		 		bootbox.alert('Action failed!');
		 	}
		 	angular.element('#addRole').modal('hide');
		});
	}


});
