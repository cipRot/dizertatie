angular.module('comparison_api').controller('UsersController', function($rootScope,$scope,$http,userFactory,agentsFactory,$location){
	$scope.$on('$viewContentLoaded', function() {
	    // initialize core components
	    App.initAjax();
	    agentsFactory.getAllGroups().then(function(response){ 
            $scope.groups = response.data;
        });
        if(!$scope.checkRole('ROLE_LIST_ACCOUNTS')){
            $location.path('/dashboard');
        }
        console.log($scope.checkRole('ROLE_LIST_ACCOUNTS'))
    });
        
    


    $scope.username;
    $scope.password;
    $scope.re_password;
    $scope.email;
    $scope.add_Group = "1";


	var table = angular.element('#users').DataTable({
		"dom": "<'row'<'col-md-8 col-sm-12'l><'col-md-4 col-sm-12'<'table-group-actions pull-right' B>f>r><'table-scrollable't><'row'<'col-md-4 col-sm-12'i><'col-md-8 col-sm-12'p>>", // datatable layout
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
        "pagingType": "full_numbers",
	    "processing": true,
	    "serverSide": true,
	    "ajax":{
	     	"url": "backend/users/users",
	     	"dataType": "json",
	     	"type": "POST"
	    },               
  		"columns": [ 
  			{ "data": "id"},
          	{ "data": "username" },
          	{ "data": "email" },
          	{ "data": "last_login" },
            { 
                "className":      '',
                "orderable":      false,
                "data":           null,
                "render": function ( data, type, row, meta ) { 
                    if(data.disabled == 1){
                        return 'Disabled';
                    } else {
                        return 'Enabled';
                    }
                  
                }
            },    
          	{ "data": "author" },
          	{ "data": "grp_name" },  
          	{
                "className":      '',
                "orderable":      false,
                "data":           null,
                "render": function ( data, type, row, meta ) {  
                    /*if(data.disabled == 0){
                        return '<a class="status_btn">Disable</a> | <a class="edit_btn">Edit</a> | <a class="delete_btn">Delete</a>';
                    } else {
                        return '<a class="status_btn">Enable</a> | <a class="edit_btn">Edit</a> | <a class="delete_btn">Delete</a>';
                    }*/
                    if(data.disabled == 0){
                        return '<a class="status_btn">Disable</a> | <a class="edit_btn">Edit</a>';
                    } else {
                        return '<a class="status_btn">Enable</a> | <a class="edit_btn">Edit</a>';
                    } 
                } 
            } 
            
        ],  
        "buttons": [
            {
                "extend": 'excelHtml5',
                "title": 'Users',
                "exportOptions": {
                    "columns": 'th:not(:last-child)'
                }
            },
            {
                "extend": 'csvHtml5',
                "title": 'Users',
                "exportOptions": {
                    "columns": 'th:not(:last-child)'
                }
            }
        ]  

	});  


    //DELETE BTN (CANT ALWAYS DELETE BECAUSE OF FOREIGN KEY FROM EMAILS)
    // angular.element('#users tbody').on( 'click', 'a.delete_btn', function () {
    //     var data = table.row( $(this).parents('tr') ).data();
    //     var id ="id="+data.id;
    //     console.log(data);
    //     bootbox.confirm({
    //         message: "Are you sure you want to delete user "+data.username+"?",
    //         buttons: {
    //             cancel: {
    //                 label: '<i class="fa fa-times"></i>No' ,
    //             },
    //             confirm: {
    //                 label: '<i class="fa fa-check"></i>YES'
    //             }
    //         },
    //         callback: function (result) {
    //             if (result == true){
    //                 userFactory.deleteUser(id).then(function(response){ 
    //                     var status = response.data; 
    //                     if(status == 'true'){
    //                         bootbox.alert('User deleted !');
    //                         table.draw();
    //                     } else {
    //                         bootbox.alert('Action failed !');
    //                     }
    //                 }) 
    //             }
    //         }
    //     });
        
    // });

    angular.element('#users tbody').on( 'click', 'a.status_btn', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var data ="id="+data.id+"&status="+data.disabled;
        $http({
            url: 'backend/users/toggleStatus',
            method: 'POST', 
            dataType: "json",
            data: data,
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
        	}
        }).success(function(data){ 
        	table.draw();
        })  
    });

    angular.element('#users tbody').on( 'click', 'a.edit_btn', function () {
        var data = table.row( $(this).parents('tr') ).data(); 
        angular.element('#myModal').modal('show');
        $scope.username = data.username; 
        $scope.email = data.email;
        $scope.edit_id = data.id;
        if(data.grp_name){
            var grp_id = $scope.groups.filter(function(grp){
                return grp.name == data.grp_name; 
            });
            $scope.defaultGroup = grp_id[0].id;
        } else {
            $scope.defaultGroup= "";
        }
        $scope.$apply();
    });

    $scope.saveChanges = function(username,email,password,re_password,user_group){
        if(!password){
            password = "";
        }
        if(!re_password){
            re_password = "";
        }
         
        var grp_id = $scope.groups.filter(function(grp){
            return grp.id == user_group; 
        }); 
        $scope.defaultGroup = grp_id[0].id;
 

        var data = 'id='+$scope.edit_id+"&username="+username+"&email="+email+"&password="+password+"&re_password="+re_password+"&user_group="+grp_id[0].id;
        $http({
            url: 'backend/users/saveUserChanges',
            method: 'POST', 
            dataType: "json",
            data: data,
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            }
        }).success(function(data){ 
            var msg = data.msg;
            var status = data.sts;
            if(status != "failed"){
                angular.element('#myModal').modal('hide');
                table.draw();
                bootbox.alert(msg);
            } else { 
                bootbox.alert(msg);
            } 
        })  
    }


    $scope.modal_open = function(){
        angular.element('#addUser').modal('show');
    }

    $scope.addUser = function(username,email,password,re_password,user_group){
        var data = "username="+username+"&email="+email+"&password="+password+"&re_password="+re_password+"&group_id="+user_group;
        
        if(angular.element("#addUser form").valid()){
            userFactory.addUser(data).then(function(response){ 
                var status = response.data.sts;
                var message = response.data.msg;
                if(status == "success"){
                    $scope.new_username = "";
                    $scope.new_email = "";
                    $scope.new_password = "";
                    $scope.new_re_password = "";
                    $scope.add_Group = "1"; 

                    angular.element('#addUser').modal('hide');
                    table.draw();
                    bootbox.alert(message);
                } else {
                    bootbox.alert(message);
                }
            })    
        }
    }

    angular.element("#addUser form").validate({
        rules: {
            new_email: {
                required: true,
                email: true
            },
            new_username: {
                required: true
            },
            new_password: { 
                required: true,
            },
            new_re_password: { 
                required: true,
                equalTo: "#new_password"
            }
        }
    });
});
