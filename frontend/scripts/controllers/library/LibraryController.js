angular.module('comparison_api').controller('LibraryController', function($rootScope, $scope, $location, $http) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax(); 
    }); 

    


    $(function() {
    	$scope.test = function(){
			$http({
		        url: 'http://localhost:3000/compareApi',
		        method: 'GET', 
		        dataType: "json",
		        headers : {
		            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
		        }
		    }).success(function(data){ 
		    	window.test = data; 
				loadIframe("frame",data.URL) 
		    })
		}

	function loadIframe(iframeName , url) {
	    var $iframe = $('#' + iframeName);
	    if ( $iframe.length ) {
	        $iframe.attr('src',url);   
	        return false;
	    }
	    return true;
	}

	$scope.uploadFile = function(type){
	 	var file1;
	 	var file2;
	    var uploadUrl;
	    if(type ==="read"){
	   		file1 = $scope.myFile; 
	   		uploadUrl = "http://localhost:3000/readPDF"; 
	   		uploadFileToUrl(uploadUrl, file1);
	    }else if(type ==="compareTwoFiles"){
	   		file1 = $scope.readFileOne; 
	   		file2 = $scope.readFileTwo ; 
	   		uploadUrl = "http://localhost:3000/compareTwoFilesApi";
	   		compareTwofiles(uploadUrl, file1, file2);
	    } else {
	   		file1 = $scope.myFileUpload; 
	   		uploadUrl = "http://localhost:3000/uploadPDF"; 
	  	 	uploadFileToUrl(uploadUrl, file1);
	    } 
	};

	function compareTwofiles(uploadUrl, file1, file2){
 
	   	var fd = new FormData(); 
	   	fd.append('file', file1);  
   		fd.append('file', file2);  
	    $http.post(uploadUrl, fd, {
	      transformRequest: angular.identity,
	      headers: {'Content-Type': undefined}
	    }).success(function(data){ 
	   		 loadIframe("frame",data.URL) 
	   	}) 
	}

	function uploadFileToUrl(uploadUrl, file1){
 
	   var fd = new FormData(); 
	   fd.append('file', file1); 

	  
	   $http.post(uploadUrl, fd, {
	      transformRequest: angular.identity,
	      headers: {'Content-Type': undefined}
	   })

	   .success(function(data){ 
	   		angular.element("#div_one").html(data);
	   		getFiles();
	   })

	   .error(function(){
	   });
	}

	getFiles();

	function getFiles(){
		$http({
	        url: 'http://localhost:3000/getAllDocuments',
	        method: 'GET', 
	        dataType: "json",
	        headers : {
	            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
	        }
	    }).success(function(data){ 
	    	console.log(data)
	    	$scope.getAllDocuments = data;
	    })
	}
    

    $scope.compareDocuments = function(text){
    	angular.element('#result').html(text);
   		angular.element('#result').diffString(angular.element('#div_one').html());
   		$scope.del = angular.element("del").text().length;
   		$scope.ins = angular.element("ins").text().length;
   		$scope.normal = angular.element('#result').text().length + $scope.ins;
   		$scope.first_div = angular.element('#div_one').text().length;
   		$scope.res = (($scope.normal - ( $scope.del )) / $scope.normal) * 100;
   		//console.log($scope.del, $scope.ins, $scope.normal,$scope.first_div)
    }

		  // We can attach the `fileselect` event to all file inputs on the page
		  $(document).on('change', ':file', function() {
		    var input = $(this),
		        numFiles = input.get(0).files ? input.get(0).files.length : 1,
		        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		    input.trigger('fileselect', [numFiles, label]);
		  });

		  // We can watch for our custom `fileselect` event like this
		  $(document).ready( function() {
		      $(':file').on('fileselect', function(event, numFiles, label) {

		          var input = $(this).parents('.input-group').find(':text'),
		              log = numFiles > 1 ? numFiles + ' files selected' : label;

		          if( input.length ) {
		              input.val(log);
		          } else {
		              if( log ) alert(log);
		          }

		      });
		  });
	  
	});

    
});

