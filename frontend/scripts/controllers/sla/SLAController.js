angular.module('comparison_api').controller('SLAController', 
	function($rootScope, $scope, $http, countriesFactory, projectsFactory, agentsFactory, userFactory,$location){
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        if(!$scope.checkRole('ROLE_FULL_HISTORY')){
            $location.path('/dashboard');
        }
        (function(){
	 		var start = moment().subtract(29, 'days');
		    var end = moment(); 
			angular.element('#input_range').daterangepicker({
			    locale: {
			      format: 'YYYY-MM-DD'
			    },
			    startDate: start,
		        endDate: end,
		        ranges: {
		           'Today': [moment(), moment()],
		           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
		           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		           'This Month': [moment().startOf('month'), moment().endOf('month')],
		           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		        }
			}, 
			function(start, end, label) {
			    //alert("A new date range was chosen: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
			    $scope.start = start.format('YYYY-MM-DD');
			    $scope.end = end.format('YYYY-MM-DD'); 
			});
	 	})();  
    });
    $scope.start = moment().subtract(29, 'days').format('YYYY-MM-DD');
    $scope.end = moment().format('YYYY-MM-DD');
    $scope.loading = false;
    $scope.total_time = 0;
	$scope.total_emails = 0;
	$scope.average_time =  0;

    countriesFactory.getCountries().then(function(data){
        $scope.defaultCountry = '';
        $scope.countries = data.data;
    });

    projectsFactory.getProjects().then(function(data){
        $scope.defaultProject = '';
        $scope.projects = data.data; 
    });

    agentsFactory.getAllAgents().then(function(data){
        $scope.defaultUser = '';
        $scope.users = data.data; 
    });

 	$scope.changeCountry = function(id){
        if(id){
            countriesFactory.changeCountries(id).then(function(data){
                $scope.defaultCountry = '';
                $scope.countries = data.data;
            }) 
        } else {
            countriesFactory.getCountries().then(function(data){
                $scope.defaultCountry = '';
                $scope.countries = data.data;
            });
        }
        
    }
	
 

	$scope.getSLA = function(){
		if(angular.element("#form").valid()){
			$scope.loading = true;
			var start_date = $scope.start;
			var end_date = $scope.end;	
			var country = $scope.defaultCountry;
			var project = $scope.defaultProject;
			var agent = $scope.defaultUser;
			console.log(start_date, end_date, country,project,agent);
			var data = 'start_date='+start_date+'&end_date='+end_date+'&country='+country+'&project='+project+'&agent='+agent;
			userFactory.userSLA(data).then(function(response){
				$scope.loading = false;
				$scope.total_time = response.data.Total_Time || 0;
				$scope.total_emails = response.data.Emails;
				$scope.average_time = response.data.average_time || 0; 
			})
		}	
	}

	angular.element("#form").validate({
        rules: {
            project: {
                required: true 
            },
            country: {
                required: true
            },
            user: { 
                required: true,
            } 
        }
    });

});
