angular.module('comparison_api').controller('CountryController', function($rootScope,$scope,$http,projectsFactory,agentsFactory,countriesFactory,$location){
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
    $scope.projectList = {};
    $scope.editProjectList = {};

    function getC(){
        countriesFactory.getCountryProjectRel().then(function(response){ 
            $scope.countries = response.data;
        }); 
        projectsFactory.getProjects().then(function(data){
            $scope.defaultProject = '';
            $scope.projects = data.data; 
        });
        countriesFactory.getCountries().then(function(response){ 
            $scope.countries_simple = response.data;
            $scope.defaultCon = '';
        }); 
    } 
 
    $scope.modal_open = function(){
        angular.element('#myModal').modal('show');
    }

    $scope.modal_open2 = function(){
        getC();
        angular.element('#myModal2').modal('show');
        $scope.defaultCon = '';
        $scope.edit_name = '';
        angular.element('input[type="checkbox"]').parent().removeClass('checked').parent().parent().removeClass('font-red-soft');
        angular.element('input[type="checkbox"]').attr('disabled', false);
    }

    $scope.modal_open3 = function(){
        countriesFactory.getCountries().then(function(response){ 
            $scope.cc = response.data; 
            angular.element('#myModal3').modal('show');
            $scope.deleleCountry = '';
        }); 
        
    }

    $scope.changeCon = function(id){ 
        if(id){
            countriesFactory.getProjectsBasedOnCountry(id).then(function(response){ 
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

    $scope.saveChanges = function(name, projects){ 
        if(angular.element("#form").valid()){
            countriesFactory.addCountry(name, projects).then(function(response){
                getC();
                angular.element('#myModal').modal('hide');
                bootbox.alert('Country was added!');  
                $scope.projectList = {};
                angular.element('input[type="checkbox"]').parent().removeClass('checked').parent().parent().removeClass('font-red-soft');
                $scope.name = '';
            }); 
        }
         
    }


    $scope.saveEditChanges = function(name,countryId, projects){ 
         
        countriesFactory.editCountry(name,countryId, projects).then(function(response){
            $scope.editProjectList = {};
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
        countriesFactory.removeCountry(id).then(function(response){
            getC(); 
            bootbox.alert('Relationship on DB was removed!');  
        });  
    }

    $scope.submitDelete = function(id){ 
        countriesFactory.deleleCountry(id).then(function(response){
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
