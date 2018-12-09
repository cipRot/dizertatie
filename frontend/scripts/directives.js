/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
comparison_api.directive('ngSpinnerBar', ['$rootScope',
    function($rootScope) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                    Layout.closeMainMenu();
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setMainMenuActiveLink('match'); // activate selected link in the sidebar menu

                    // auto scorll to page top
                    setTimeout(function () {
                        App.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
comparison_api.directive('a',
    function() {
        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function(e) {
                        e.preventDefault(); // prevent link click for above criteria
                    });
                }
            }
        };
    });

comparison_api.directive('ckr',
    function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                 elem.click(function(){  
                    elem.parent().toggleClass('checked'); 
                    if(elem.parent().hasClass('checked')){
                        scope.projectList[attrs.prjName] = attrs.value;
                    } else { 
                        delete scope.projectList[attrs.prjName] 
                    }  
                 })
            }
        };
    });

comparison_api.directive('ckr2',
    function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                 elem.click(function(){  
                    elem.parent().toggleClass('checked'); 
                    if(elem.parent().hasClass('checked')){
                        scope.editProjectList[attrs.prjName] = attrs.value;
                    } else { 
                        delete scope.editProjectList[attrs.prjName] 
                    }  
                 })
            }
        };
    });

comparison_api.directive('ckrpr',
    function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                 elem.click(function(){  
                    elem.parent().toggleClass('checked'); 
                    if(elem.parent().hasClass('checked')){
                        scope.countryList[attrs.cntName] = attrs.value;
                    } else { 
                        delete scope.countryList[attrs.cntName] 
                    }  
                 })
            }
        };
    });

comparison_api.directive('ckrpr2',
    function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                 elem.click(function(){  
                    elem.parent().toggleClass('checked'); 
                    if(elem.parent().hasClass('checked')){
                        scope.editCountryList[attrs.cntName] = attrs.value;
                    } else { 
                        delete scope.editCountryList[attrs.cntName] 
                    }  
                 })
            }
        };
    });