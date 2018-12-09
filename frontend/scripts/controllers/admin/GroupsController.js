angular.module('comparison_api').controller('GroupsController', function($rootScope,$scope,$http,agentsFactory ,$location){
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        loadGroups();
        if(!$scope.checkRole('ROLE_LIST_ACCOUNTS')){
            $location.path('/dashboard');
        }
    });


	function loadGroups(){
		agentsFactory.getAllGroups().then(function(response){ 
	    	$scope.groups = response.data;
		});
	}	
	

	$scope.edit = function(id){
		angular.element('#myModal').modal('show');
		var item = $scope.groups.filter(function(role){
			return role.id == id;
		})
		$scope.group = item[0].name;
		$scope.name = item[0].name;
		$scope.id = item[0].id;

	}

	$scope.edit_changes = function(id,name){
		agentsFactory.changeGroup(id,name).then(function(response){
		 	if(response.data == 'true'){
		 		loadGroups();
		 		bootbox.alert('Changes saved!');
		 	} else{
		 		bootbox.alert('Changes not saved!');
		 	}
		 	angular.element('#myModal').modal('hide');
		});
	}


	$scope.add_group = function(){
		angular.element('#addGroup').modal('show');
	}

	$scope.insert_group_btn = function(name){
		agentsFactory.addGroup(name).then(function(response){
		 	if(response.data == 'true'){
		 		loadGroups();
		 		bootbox.alert('Role added successfully!');
		 	} else{
		 		bootbox.alert('Action failed!');
		 	}
		 	angular.element('#addGroup').modal('hide');
		});
	}

	$scope.delete = function(id){ 
		agentsFactory.deleteGroup(id).then(function(response){
		 	if(response.data == 'true'){
		 		loadGroups();
		 		bootbox.alert('Role deleted!');
		 	} else{
		 		bootbox.alert('Action failed!');
		 	}
		 	angular.element('#addGroup').modal('hide');
		});
	}

});
