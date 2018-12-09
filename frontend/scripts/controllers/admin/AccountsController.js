angular.module('comparison_api').controller('AccountsController', 
	function($rootScope, $scope, $http, countriesFactory, projectsFactory, agentsFactory,$location){
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components

        if(!$scope.checkRole('ROLE_LIST_ACCOUNTS')){
            $location.path('/dashboard');
        }
        App.initAjax();  
        angular.element( "#date_start, #date_end" ).datepicker({
		  "data-date-format": "yyyy-dd-mm"
		}); 
	    angular.element( "#date_start" ).val(moment().subtract(29, 'days').format('YYYY-MM-DD'));
	    angular.element( "#date_end" ).val(moment().format('YYYY-MM-DD'));
    });

    

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
    //datatables
    var table = angular.element('#table').DataTable({ 
 		"dom": "<'row'<'col-md-8 col-sm-12'l><'col-md-4 col-sm-12'<'table-group-actions pull-right'>B>r><'table-scrollable't><'row'<'col-md-4 col-sm-12'i><'col-md-8 col-sm-12'p>>", // datatable layout
        //"pageLength": 20, // default records per page
        "language": { // language settings
            // metronic spesific
            "metronicGroupActions": "_TOTAL_ records selected:  ",
            "metronicAjaxRequestGeneralError": "Could not complete request. Please check your internet connection",

            // data tables spesific
            "lengthMenu": "View _MENU_ records",
            "info": "Found total _TOTAL_ records",
            "infoEmpty": "No records found to show",
            "emptyTable": "No data available in table",
            "zeroRecords": "No matching records found",
            
            "paginate": {
                "previous": "Prev",
                "next": "Next",
                "last": "Last",
                "first": "First",
                "page": "Page",
                "pageOf": "of"
            }
        },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "order": [], //Initial no order.
 
        // Load data for the table's content from an Ajax source
        "ajax": {
            "url": "backend/table/ajax_list",
            "type": "POST",
            "data": function ( data ) {
                data.email_to = angular.element('#email_to').val();
                data.subject = angular.element('#subject').val();
                data.time = angular.element('#time').val();
                data.id_email_from = angular.element('#author').val();
                data.date_start = angular.element('#date_start').val();
                data.date_end = angular.element('#date_end').val();
                data.country = angular.element('#country').val();
                data.project = angular.element('#project').val();
            }
        },
 
        //Set column definition initialisation properties.
        "columnDefs": [{ 
            "targets": [ 0 ], //first column / numbering column
            "orderable": false, //set not orderable
        }], 
        "buttons": [
            {
            	"extend": 'excelHtml5',
            	"title": 'ExcelTest',
            	"exportOptions": {
		            "columns": 'th:not(:last-child)'
		        }
	        },
	        {
	            "extend": 'csvHtml5',
	            "title": 'CsvTest',
	            "exportOptions": {
		            "columns": 'th:not(:last-child)'
		        }
	        }
        ] 
	});
 
    angular.element('#btn-filter').click(function(){ //button filter event click
        table.ajax.reload();  //just reload table
    });
    angular.element('#btn-reset').click(function(){ //button reset event click
        angular.element('#form-filter')[0].reset();
        table.ajax.reload();  //just reload table
        $scope.defaultCountry = '';
        $scope.defaultProject = '';
        $scope.defaultUser = '';
    });
});
