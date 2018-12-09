/*
*@update by: Mihai Moraru <mihai.moraru@tga-systems.com>
*@date: 07-01-2016
*@added the validation rules for new dealer and new sp forms
*@date: 04-02-2016
*@added the validation rules for merge-profiles form
*@date: 03-03-2016
*@added phone and street number type number, minlength, maxlenth for ProfileCreation form
Update by: Florin Scripcaru
Date: 23.05.2016
*/

define(['jquery', 'libs/config'], function($, Config){
    
    // "Add User" Form Validation
    var handleValidationAccountCreation = function(formID) {

    var form1 = $(formID);
    var error1 = $('.alert-danger', form1);
    var success1 = $('.alert-success', form1);
            
    var tabs = [ "user_info", "platform", "acd" ];
                
    form1.validate({
                
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",  // validate all fields including form hidden input
        onkeyup: false, //turn off auto validate whilst typing
                
        rules: {
            "user_info#first_name": {
                required: true
            },
            "user_info#last_name": {
                required: true
            },
            "user_info#username": {
                required: true                                          
            },
            "user_info#password": {
                required: true                                          
            },
            "user_info#email": {
                required: true
            },
            "user_info#status": {
                required: true
            }, 
            "user_info#phone": {
                required: false
            },                
            "user_info#role": {
                required: true
            }
        },
                
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change done by hightlight
            $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
        },

        success: function (label, element) {           
            var icon = $(element).parent('.input-icon').children('i');

            $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
            icon.removeClass("fa-warning").addClass("fa-check");    
        },

        submitHandler: function (form) {
            success1.show();
            error1.hide();
        },
                
        invalidHandler: function (event, validator) { //display error alert on form submit             
            success1.hide();
            error1.show();
            Metronic.scrollTo(error1, -200);
        },
                        
        errorPlacement: function (error, element) { // render error placement for each input type

            if (element.parent(".input-group").size() > 0) {
                error.insertAfter(element.parent(".input-group"));
            } else if (element.attr("data-error-container")) { 
                error.appendTo(element.attr("data-error-container"));
            } else if (element.parents('.radio-list').size() > 0) { 
                error.appendTo(element.parents('.radio-list').attr("data-error-container"));
            } else if (element.parents('.radio-inline').size() > 0) { 
                error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
            } else if (element.parents('.checkbox-list').size() > 0) {
                error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
            } else if (element.parents('.checkbox-inline').size() > 0) { 
                error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
            } else {
                error.insertAfter(element); // for other inputs, just perform default behavior
            }
        },
                
        showErrors: function(errorMap, errorList) {

            this.defaultShowErrors();
            displayErrorBadge();

            }
        });
            
        displayErrorBadge = function() {
                
            _.each(tabs, function(value, key){
            
                var errornum = $(":input[name^='"+value+"']").parent().children("i.fa-warning").length;
                         
                if($("a[href='#tab_"+value+"']").children("span").length > 0){
                    $("a[href='#tab_"+value+"']").children("span").remove();
                }
                    
                if(errornum > 0){ 
                    $("a[href='#tab_"+value+"']").append('<span class="badge badge-danger">'+ errornum +'</span>');
                }     
            });        
        };
    };
    
    // "Create Profile" Form Validation
    var handleValidationProfileCreation = function(formID) {

        var form1 = $(formID);
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);
               
        form1.validate({
                
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: ":hidden",  // validate all fields including form hidden input
            onkeyup: true, //turn off auto validate whilst typing
            
            rules: {
                "profile_info#first_name": {
                    required: true                                         
                },
                "profile_info#last_name": {
                    required: true                                         
                },
                "profile_info#phone": {
                    required: true                                   
                },
                "profile_info#street": {
                    required: true                                         
                },
                "profile_info#street_number": {
                    required: true                                
                },
                "profile_info#country": {
                    required: true                                         
                },
                "profile_info#county": {
                    required: true
                },
                "profile_info#city": {
                    required: true
                }
            },
           
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label, element) {           
                var icon = $(element).parent('.input-icon').children('i');

                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                icon.removeClass("fa-warning").addClass("fa-check");    
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();
            },
                    
            invalidHandler: function (event, validator) { //display error alert on form submit             
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },
                    
            errorPlacement: function (error, element) { // render error placement for each input type
                
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();              
            }
        });
        
        displayErrorBadge = function() {
            
            _.each(tabs, function(value, key){
                
                var errornum = $(":input[name^='"+value+"']").parent().children("i.fa-warning").length;

                if($("a[href='#tab_"+value+"']").children("span").length > 0){
                    $("a[href='#tab_"+value+"']").children("span").remove();
                }
                
                if(errornum > 0){ 
                    $("a[href='#tab_"+value+"']").append('<span class="badge badge-danger">'+ errornum +'</span>');
                }
            });
        };
    };

    // "Create Dealer" Form Validation
    var handleValidationDealerCreation = function(formID) {

        var form1 = $(formID);
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);
            
        form1.validate({
                
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: ":hidden",  // validate all fields including form hidden input
            onkeyup: true, //turn off auto validate whilst typing
                
            rules: {
                "dealer_info#name": {
                    required: true,                                        
                },
                "dealer_info#address": {
                    required: true                                          
                },
                "dealer_info#phone": {
                    required: true                                          
                },
                "dealer_info#country": {
                    required: true                                         
                },
                "dealer_info#city": {
                    required: true
                },
                "dealer_info#county": {
                    required: true
                }
            },
               
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label, element) {           
                
                var icon = $(element).parent('.input-icon').children('i');
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                icon.removeClass("fa-warning").addClass("fa-check");
                    
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();
            },
                    
            invalidHandler: function (event, validator) { //display error alert on form submit             
                
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },
                        
            errorPlacement: function (error, element) { // render error placement for each input type
                
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }  
            },
                
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();                   
            }
        });
            
        displayErrorBadge = function() {
                
            _.each(tabs, function(value, key){
                    
                var errornum = $(":input[name^='"+value+"']").parent().children("i.fa-warning").length;

                if($("a[href='#tab_"+value+"']").children("span").length > 0){
                    $("a[href='#tab_"+value+"']").children("span").remove();
                }
                    
                if(errornum > 0){ 
                    $("a[href='#tab_"+value+"']").append('<span class="badge badge-danger">'+ errornum +'</span>');
                }     
            });        
        };
    };

    // "Create Service Partner" Form Validation
    var handleValidationSPCreation = function(formID) {

        var form1 = $(formID);
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);
                    
        form1.validate({
            
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: ":hidden",  // validate all fields including form hidden input
            onkeyup: true, //turn off auto validate whilst typing

            rules: {
                "sp_info#name": {
                    required: true
                },
                "sp_info#area": {
                    required: true
                },
                "sp_info#address": {
                    required: true                                      
                },
                "sp_info#phone_1": {
                    required: true                                        
                },
                "sp_info#county": {
                    required: true                                     
                },
                "sp_info#email": {
                    required: true
                },
                "sp_info#p_m_t": {
                    required: true
                },
                "sp_info#p_friday": {
                    required: true
                }
            },
               

            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
               $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label, element) {           
                var icon = $(element).parent('.input-icon').children('i');

                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                icon.removeClass("fa-warning").addClass("fa-check");
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();
            },
                    
            invalidHandler: function (event, validator) { //display error alert on form submit             
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },
                        
            errorPlacement: function (error, element) { // render error placement for each input type
                
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                } 
            },
                
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();                   
            }
        });
    };
    
    //"Create Case" Form Validation
    var handleValidationCaseCreation = function(formID) {
            
        var form1 = $(formID);
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);
                        
        form1.validate({
            
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: ":hidden",  // validate all fields including form hidden input
            onkeyup: false, //turn off auto validate whilst typing
             
            messages: {
                "case_info#product": {
                    required: $.validator.format("Please select a product")
                }
            },
            
            rules: {
                "case_info#case_reason": {
                    required: true
                },
                "case_info#product": {
                    required: true,
                },
                "case_info#sp_assign": {
                    required: true
                },
                "case_info#new_sp": {
                    required: true
                },
                "case_info#case_status": {
                    required: true
                }, 
                "case_info#case_source": {
                    required: true
                },
                "case_info#callerid": {
                    required: true
                },
                "contact_dealer": {
                    required: true
                },
                "contact_person": {
                    required: true
                },
                "contact_details": {
                    required: true
                }
            },
               
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label, element) {           
                
                var icon = $(element).parent('.input-icon').children('i');
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                icon.removeClass("fa-warning").addClass("fa-check");     
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();
            },
                    
            invalidHandler: function (event, validator) { //display error alert on form submit             
                
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },
                    
            errorPlacement: function (error, element) { // render error placement for each input type

                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
                
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();                                    
            }
        });
            
        displayErrorBadge = function() {
            
            _.each(tabs, function(value, key){
            
                var errornum = $(":input[name^='"+value+"']").parent().children("i.fa-warning").length;

                if($("a[href='#tab_"+value+"']").children("span").length > 0){
                    $("a[href='#tab_"+value+"']").children("span").remove();
                }
                if(errornum > 0){ 
                    $("a[href='#tab_"+value+"']").append('<span class="badge badge-danger">'+ errornum +'</span>');
                }
            });
        };        
    };

    //Check percentage in "Manage Distribution Service Partner" to be 100%
    var handleValidationSPPercentage = function(formID) {
                
        var form1 = $(formID);
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);
                   
        form1.validate({
                
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: ":hidden",  // validate all fields including form hidden input
            onkeyup: false, //turn off auto validate whilst typing

            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
               $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label, element) {           
                
                var icon = $(element).parent('.input-icon').children('i');
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                icon.removeClass("fa-warning").addClass("fa-check");    
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();
            },
                    
            invalidHandler: function (event, validator) { //display error alert on form submit             
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },
                    
            errorPlacement: function (error, element) { // render error placement for each input type
                
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();                   
            }
        });
            
        displayErrorBadge = function() {
            
            _.each(tabs, function(value, key){
                
                var errornum = $(":input[name^='"+value+"']").parent().children("i.fa-warning").length;

                if($("a[href='#tab_"+value+"']").children("span").length > 0){
                    $("a[href='#tab_"+value+"']").children("span").remove();
                }
                
                if(errornum > 0){ 
                    $("a[href='#tab_"+value+"']").append('<span class="badge badge-danger">'+ errornum +'</span>');
                } 
            });  
        };
    };
    
    //"Create Product" Form Validation 
    var handleValidationProductCreation = function(formID) {
            
        var form1 = $(formID);
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);
                
        form1.validate({
            
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: ":hidden",  // validate all fields including form hidden input
            onkeyup: false, //turn off auto validate whilst typing
            onfocusout: false,

            messages: {
                "product_info#product_category": {
                    required: true
                },
                "product_info#product_model": {
                    required: true
                },
                "product_info#product_dealer": {
                    required: true
                }
            },   

            rules: {
                "product_info#product_category": {
                    required: true
                },
                "product_info#product_model": {
                    required: true
                },
                
                "product_info#product_brand": {
                    required: true
                },
                "product_info#product_dealer": {
                    required: true
                },
                "product_info#production_date": {
                    required: true
                }
            },
               
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label, element) {           
                
                var icon = $(element).parent('.input-icon').children('i');
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                icon.removeClass("fa-warning").addClass("fa-check");      
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();
            },
                    
            invalidHandler: function (event, validator) { //display error alert on form submit             
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },
                        
            errorPlacement: function (error, element) { // render error placement for each input type
                    
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
                
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();                   
            }
        });
            
        displayErrorBadge = function() {
            
            _.each(tabs, function(value, key){
                
                var errornum = $(":input[name^='"+value+"']").parent().children("i.fa-warning").length;

                if($("a[href='#tab_"+value+"']").children("span").length > 0){
                    $("a[href='#tab_"+value+"']").children("span").remove();
                }
                
                if(errornum > 0){ 
                    $("a[href='#tab_"+value+"']").append('<span class="badge badge-danger">'+ errornum +'</span>');
                }        
            });
        };     
    };

    //"Product Administration" Form Validation
    var handleValidationProductAdmistration = function(formID) {
            
        var form1 = $(formID);
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);
               
        form1.validate({
                
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: ":hidden",  // validate all fields including form hidden input
            onkeyup: false, //turn off auto validate whilst typing
            onfocusout: false,

            messages: {
                "product#std_warranty": {
                    required: "Select product warranty."
                },
            },   

            rules: {
                "product#name": {
                    required: true                
                },
                "product#model": {
                    required: true
                },
                "product#std_warranty": {
                    required: true                 
                },
                "s2id_family_products": {
                    required: true
                }
            },
               
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label, element) {           
                
                var icon = $(element).parent('.input-icon').children('i');
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                icon.removeClass("fa-warning").addClass("fa-check");
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();
            },
                    
            invalidHandler: function (event, validator) { //display error alert on form submit             
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },
                        
            errorPlacement: function (error, element) { // render error placement for each input type
                    
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
                
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();
            }
        });
            
        displayErrorBadge = function() {
            
            _.each(tabs, function(value, key){
                
                var errornum = $(":input[name^='"+value+"']").parent().children("i.fa-warning").length;

                if($("a[href='#tab_"+value+"']").children("span").length > 0){
                    $("a[href='#tab_"+value+"']").children("span").remove();
                }
                
                if(errornum > 0){ 
                    $("a[href='#tab_"+value+"']").append('<span class="badge badge-danger">'+ errornum +'</span>');
                }        
            });
        };        
    };

    //"Create Profile Draft" Form Validation
    var handleValidationDraftProfileCreation = function(formID2) {

        var form1 = $(formID2);
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);

        form1.validate({
                
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: ":hidden",  // validate all fields including form hidden input
            onkeyup: true, //turn off auto validate whilst typing
                    
            rules: {    
                "profile_info#first_name": {
                    required: true                                        
                },
                "profile_info#last_name": {
                    required: true                                         
                },   
                "profile_info#country": {
                    required: true                                         
                },
                "profile_info#county": {
                    required: true
                },
                "profile_info#city": {
                    required: true
                }
            },
               
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label, element) {           
                
                var icon = $(element).parent('.input-icon').children('i');
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                icon.removeClass("fa-warning").addClass("fa-check");                    
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();
            },
                    
            invalidHandler: function (event, validator) { //display error alert on form submit             
                
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },
                        
            errorPlacement: function (error, element) { // render error placement for each input type
                
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();                 
            }
        });
            
        displayErrorBadge = function() {
            
            _.each(tabs, function(value, key){
                
                var errornum = $(":input[name^='"+value+"']").parent().children("i.fa-warning").length;

                if($("a[href='#tab_"+value+"']").children("span").length > 0){
                    $("a[href='#tab_"+value+"']").children("span").remove();
                }
                
                if(errornum > 0){ 
                    $("a[href='#tab_"+value+"']").append('<span class="badge badge-danger">'+ errornum +'</span>');
                } 
            });
        };            
    };

    //"Merge Profiles" Form Validation
    var handleValidationMergeProfiles = function(formID) {

        var form1 = $(formID);
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);
              
        form1.validate({
                
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: ":hidden",  // validate all fields including form hidden input
            onkeyup: true, //turn off auto validate whilst typing
                 
            messages: {
                "check_name": {
                    required: '*'
                },
                "check_surname": {
                    required: '*'
                },
                "check_phone": {
                    required: '*'
                },
                "check_street": {
                    required: '*'
                },
                "check_street_number": {
                    required: '*'
                },
                "check_country": {
                    required: '*'
                },
                "check_county": {
                    required: '*'
                },
                "check_city": {
                    required: '*'
                }
            },
            
            rules: {
                "check_name": {
                    required: true,                                       
                },
                "check_surname": {
                    required: true,                                       
                },
                "check_phone": {
                    required: true                                      
                },
                "check_street": {
                    required: true                                       
                },
                "check_street_number": {
                    required: true                                     
                },
                "check_country": {
                    required: true                                        
                },
                "check_county": {
                    required: true                                       
                },
                "check_city": {
                    required: true                                       
                }
            },
               
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label, element) {           
                
                var icon = $(element).parent('.input-icon').children('i');
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                icon.removeClass("fa-warning").addClass("fa-check");      
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();
            },
                    
            invalidHandler: function (event, validator) { //display error alert on form submit             
                
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },
                        
            errorPlacement: function (error, element) { // render error placement for each input type
                    
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }  
            },
                
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();                    
            }
        });
            
        displayErrorBadge = function() {
            
            _.each(tabs, function(value, key){
                
                var errornum = $(":input[name^='"+value+"']").parent().children("i.fa-warning").length;

                if($("a[href='#tab_"+value+"']").children("span").length > 0){
                    $("a[href='#tab_"+value+"']").children("span").remove();
                }
                
                if(errornum > 0){ 
                    $("a[href='#tab_"+value+"']").append('<span class="badge badge-danger">'+ errornum +'</span>');
                }
                
            });
        };
    };

    //"Edit Dealer" Form Validation
    var handleValidationDealerEdit = function(formID) {

        var form1 = $(formID);
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);
               
        form1.validate({
                
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: ":hidden",  // validate all fields including form hidden input
            onkeyup: true, //turn off auto validate whilst typing

            rules: {
                "dealer_name": {
                    required: true
                },
                "dealer_address": {
                    required: true
                },
                "dealer_phone": {
                    required: true,
                    minlength: 10,  
                    maxlength: 15                                         
                },
                "dealer_country": {
                    required: true                                         
                },
                "dealer_info#dealer_city": {
                    required: true
                },
                "dealer_info#county": {
                    required: true
                }
            },
               
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label, element) {           
                
                var icon = $(element).parent('.input-icon').children('i');
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                icon.removeClass("fa-warning").addClass("fa-check");    
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();
            },
                    
            invalidHandler: function (event, validator) { //display error alert on form submit             
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },
                        
            errorPlacement: function (error, element) { // render error placement for each input type

                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').size() > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').size() > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }    
            },
                
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();                 
            }
        });
            
        displayErrorBadge = function() {
            
            _.each(tabs, function(value, key){
                
                var errornum = $(":input[name^='"+value+"']").parent().children("i.fa-warning").length;

                if($("a[href='#tab_"+value+"']").children("span").length > 0){
                    $("a[href='#tab_"+value+"']").children("span").remove();
                }
                
                if(errornum > 0){ 
                    $("a[href='#tab_"+value+"']").append('<span class="badge badge-danger">'+ errornum +'</span>');
                }      
            });  
        };
    };

    return {
        init1: function (formID) {
            handleValidationAccountCreation(formID);    
        },

        init3: function (formID) {
            handleValidationProfileCreation(formID);            
        },   
                
        init4: function (formID) {
            handleValidationCaseCreation(formID);            
        },
                
        init5: function (formID) {
            handleValidationProductCreation(formID);            
        },

        init6: function (formID) {
            handleValidationDraftProfileCreation(formID);            
        }, 

        init7: function (formID) {
            handleValidationDealerCreation(formID)            
        },

        init8: function (formID) {
            handleValidationSPCreation(formID)            
        },

        init9: function (formID) {
            handleValidationSPPercentage(formID);          
        },

        init10: function (formID) {
            handleValidationMergeProfiles(formID);          
        },

        init11: function (formID) {
            handleValidationDealerEdit(formID);          
        },

        init12: function(formID){
            handleValidationProductAdmistration(formID);
        },
        
        resetForm: function () {
            //Reset Form
        }
    };
});
