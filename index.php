<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js" data-ng-app="MetronicApp"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js" data-ng-app="MetronicApp"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" data-ng-app="comparison_api"> 
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <title data-ng-bind="$state.current.data.pageTitle"></title>
        <!-- <meta charset="utf-8" /> -->
        <!--meta headers to turn off cache   -->
        <meta http-equiv="cache-control" content="max-age=0" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
        <meta http-equiv="expires" content="0" />
        <!-- <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" /> -->
        <meta http-equiv="pragma" content="no-cache" />
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" /> 
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"> 
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
        <link href="frontend/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="frontend/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
        <link href="frontend/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="frontend/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" /> 

        <link href="frontend/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />  


        
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN DYMANICLY LOADED CSS FILES(all plugin and page related styles must be loaded between GLOBAL and THEME css files ) -->
        <link id="ng_load_plugins_before" />
        <!-- END DYMANICLY LOADED CSS FILES -->
        <!-- BEGIN THEME STYLES -->
        <!-- DOC: To use 'rounded corners' style just load 'components-rounded.css' stylesheet instead of 'components.css' in the below style tag -->
        <link href="frontend/assets/global/css/components.min.css" id="style_components" rel="stylesheet" type="text/css" />
        <link href="frontend/assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
        <link href="frontend/assets/layouts/layout3/css/layout.min.css" rel="stylesheet" type="text/css" />
        <link href="frontend/assets/layouts/layout3/css/themes/default.min.css" rel="stylesheet" type="text/css" id="style_color" />
        <link href="frontend/assets/layouts/layout3/css/custom.css" rel="stylesheet" type="text/css" /> 
        <!-- END THEME STYLES -->
        <link href="frontend/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css"  type="text/css"/>
        <link rel="shortcut icon" href="frontend/assets/layouts/layout3/img/transparent.png" type="image/png" />
        <!-- <link rel="shortcut icon" href="about:blank"> -->
        <!-- fullcalendar -added -->
        <link href="frontend/assets/global/plugins/fullcalendar/fullcalendar.min.css" rel="stylesheet" type="text/css" />
        <link href="frontend/assets/global/plugins/audioplayer/source/audioplayer/audioplayer.css" rel="stylesheet" type="text/css" />
        <link href="frontend/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet" type="text/css"/>
        <!-- <link href="frontend/assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css" /> -->
       
        <link href="frontend/assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css" rel="stylesheet" type="text/css"/>
        <link href="frontend/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css" rel="stylesheet" type="text/css"/>
        <link href="frontend/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css"/>

        <link rel="shortcut icon" href="frontend/assets/layouts/layout3/img/transparent.png" type="image/png">
    </head>
    <!-- END HEAD -->
    <!-- BEGIN BODY -->
    <!-- DOC: Apply "page-header-menu-fixed" class to set the mega menu fixed  -->
    <!-- DOC: Apply "page-header-top-fixed" class to set the top menu fixed  -->

    <body ng-controller="AppController">
        <div ui-view></div>


        <!-- END FOOTER -->
        <!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
        <!-- BEGIN CORE JQUERY PLUGINS -->
        <!--[if lt IE 9]>
		<script src="frontend/assets/global/plugins/respond.min.js"></script>
		<script src="frontend/assets/global/plugins/excanvas.min.js"></script>
		<![endif]-->

        <script src="frontend/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>
        <!-- <script src="frontend/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script> -->
        <script src="frontend/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>

        <script src="frontend/assets/global/plugins/angularjs/angular.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/angularjs/angular-sanitize.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/angularjs/angular-touch.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/angularjs/plugins/angular-websocket.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/angularjs/plugins/angular-translate.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/angularjs/plugins/angular-ui-router.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/angularjs/plugins/ocLazyLoad.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/angularjs/plugins/ui-bootstrap-tpls.min.js" type="text/javascript"></script>
        <!-- END CORE ANGULARJS PLUGINS -->
        <!-- BEGIN APP LEVEL ANGULARJS SCRIPTS -->

        <script src="frontend/scripts/main.js" type="text/javascript"></script>
        <script src="frontend/scripts/factories.js" type="text/javascript"></script>
        <script src="frontend/scripts/directives.js" type="text/javascript"></script>


        <!-- END APP LEVEL ANGULARJS SCRIPTS -->
        <!-- BEGIN APP LEVEL JQUERY SCRIPTS -->
        <script src="frontend/assets/global/scripts/app.min.js" type="text/javascript"></script>
        <script src="frontend/assets/layouts/layout3/scripts/layout.min.js" type="text/javascript"></script>
        <script src="frontend/assets/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>
        <script src="frontend/assets/layouts/layout3/scripts/demo.min.js" type="text/javascript"></script>
        <script src="frontend/assets/layouts/layout3/scripts/countid.min.js" type="text/javascript"></script>
        <!-- added new -->
        <script src="frontend/assets/global/plugins/moment.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="frontend/assets/global/plugins/jquery-validation/js/jquery.validate.js"></script>
        <script type="text/javascript" src="frontend/assets/global/plugins/audioplayer/source/audioplayer/audioplayer.js"></script>
        <script src="frontend/assets/global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>

        <!-- END APP LEVEL JQUERY SCRIPTS -->
        <!-- END JAVASCRIPTS -->
        <script src="frontend/assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>
 
        <!-- <script src="frontend/assets/global/plugins/datatables/media/js/jquery.dataTables.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/datatables/extensions/TableTools/js/dataTables.tableTools.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/datatables/extensions/ColReorder/js/dataTables.colReorder.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/datatables/extensions/Scroller/js/dataTables.scroller.min.js" type="text/javascript"></script>
        <script src="frontend/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js" type="text/javascript"></script>-->
        <script type="text/javascript" src="frontend/assets/global/plugins/jsdiff/jsdiff.js"></script> 
        <script type="text/javascript" src="dropzone.js"></script>

    </body>
    <!-- END BODY -->

</html>
