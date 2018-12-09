angular.module('comparison_api').controller('ProjectController', function($rootScope,$scope,$http,projectsFactory,agentsFactory,countriesFactory,$location){
	$scope.$on('$viewContentLoaded', function() {
	    // initialize core components
	    App.initAjax();
        getC();   
        if(!$scope.checkRole('ROLE_LIST_ACCOUNTS')){
            $location.path('/dashboard');
        }
    });

    $scope.edit_c_name = true;
    $scope.edit_name = '';
    $scope.countryList = {};
    $scope.editCountryList = {};
    
    function getC(){
        countriesFactory.getCountryProjectRel().then(function(response){ 
            $scope.projects = response.data;
        });  
        projectsFactory.getProjects().then(function(response){
            $scope.defaultProject = '';
            $scope.pro = response.data; 
            console.log($scope.pro); 
        });
        countriesFactory.getCountries().then(function(response){ 
            $scope.countries = response.data;
            $scope.defaultCon = '';
        });  
    } 

    $scope.modal_open = function(){
        angular.element('#myModal').modal('show');
    }

    $scope.modal_open2 = function(){
        getC(); 
        angular.element('#myModal2').modal('show');
        $scope.defaultPR = '';
        $scope.edit_name = '';
        angular.element('input[type="checkbox"]').parent().removeClass('checked').parent().parent().removeClass('font-red-soft');
        angular.element('input[type="checkbox"]').attr('disabled', false);
    }

    $scope.modal_open3 = function(){
        projectsFactory.getProjects().then(function(response){
            $scope.projs = response.data;  
            angular.element('#myModal3').modal('show');
            $scope.deleteProject = '';
        });

    }


    $scope.changePro = function(id){ 
        if(id){
            countriesFactory.changeCountries(id).then(function(response){  
                angular.element('input[type="checkbox"]').parent().removeClass('checked').parent().parent().removeClass('font-red-soft');
                angular.element('input[type="checkbox"]').attr('disabled', false); 
                if(response.data != 'null'){
                    response.data.forEach(function(v,k){  
                        angular.element('#'+v.name.replace(' ', '')).parent().addClass('checked').parent().parent().addClass('font-red-soft');
                        angular.element('#'+v.name.replace(' ', '')).attr('disabled', true);
                    })
                } 
            }) 
            $scope.edit_c_name = false;
        } else {
            angular.element('input[type="checkbox"]').parent().removeClass('checked').parent().parent().removeClass('font-red-soft');
            angular.element('input[type="checkbox"]').attr('disabled', true);
            $scope.edit_c_name = true;
        } 
    }  

    $scope.saveChanges = function(name, contries){  
        if(angular.element("#form").valid()){
            projectsFactory.addProject(name, contries).then(function(response){
                getC(); 
                angular.element('#myModal').modal('hide');
                bootbox.alert('Project was added!');  
                $scope.countryList = {};
                angular.element('input[type="checkbox"]').parent().removeClass('checked').parent().parent().removeClass('font-red-soft');
                $scope.name = '';
            });  
        } 

    }


    $scope.saveEditChanges = function(name,projectId, countries){ 

        projectsFactory.editProject(name, projectId, countries).then(function(response){
            $scope.editCountryList = {};
            angular.element('input[type="checkbox"]').parent().removeClass('checked').parent().parent().removeClass('font-red-soft');
            $scope.name = ''; 
            getC(); 
            angular.element('#myModal2').modal('hide');
            if(response.data.status == 'yes'){
                bootbox.alert('Data was modified!'); 
            } else {
                bootbox.alert('Data not modified!'); 
            }  
        }); 
   
    }

    $scope.remove = function(id){
        projectsFactory.removeRelProject(id).then(function(response){
            getC(); 
            bootbox.alert('Relationship on DB was removed!');  
        });  
    }

    $scope.submitDelete = function(id){
        projectsFactory.deleleProject(id).then(function(response){
            getC(); 
            angular.element('#myModal3').modal('hide');
            bootbox.alert('Project was removed!');  
        });
    }
    
    angular.element("#form").validate({
        rules: {
            name: {
                required: true 
            } 
        }
    });
});
