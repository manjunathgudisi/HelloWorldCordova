
// create the controller and inject Angular's $scope
 MyApp.value('loader', {show: true});
 
 MyApp.controller('mainController', function ($scope, $routeSegment, loader, $location, snapRemote) {
        // create a message to display in our view
        $scope.$routeSegment = $routeSegment;
        $scope.loader = loader;

        $scope.$on('routeSegmentChange', function() {
           $location.replace();
        });
        
        $scope.Logout = function () {
            /*
			var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
			oOneViewCordovaPlugin.DefaultConfirmBox("Confirm", OneViewGlobalization[CurrentLanguage].SignOut_Confirm_Message, function (ConfirmationId) {
					if (ConfirmationId == "2") {

						$location.url('/login');

						OneViewSessionStorage.Clear();
						ClearGlobalVariable();
						//oOneViewAppInfoPlugin.ClearCache();

						//alert('Success : ' + OneViewGlobalization[CurrentLanguage].SignOut_Success_Message);
					}
			});
            */
            
            $location.url('/login');
            
        }

        $scope.OpenBellPopUp = function () {

            if ($scope.Notification != true) {
                var _oDcPendingTaskBO = new DcPendingTaskBO();
                _oDcPendingTaskBO.OpenBellPopUp($scope, OneViewSessionStorage.Get("LoginUserId"));
            }
            else {
                $scope.Notification = false;
            }
        }
        
        $scope.MyDownloads = function () {

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                var _oOneViewAppConfig = new OneViewAppConfig();
                _oOneViewAppConfig.CheckForNewUpdates('');
                $location.url('/nav/downloads');

            }
            else {
                alert('Notification : ' + OneViewGlobalization[CurrentLanguage].NoInternetConnection);                
            }
        }

        $scope.MyActionFollowUpDownloads = function () {

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                var _oOneViewAppConfig = new OneViewAppConfig();
                _oOneViewAppConfig.CheckForNewUpdates('');
                $location.url('/nav/actionfollowupdownloads');

            }
            else {
                alert('Notification : ' + OneViewGlobalization[CurrentLanguage].NoInternetConnection);                
            }
        }

        $scope.LoadMyActions = function () {
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var UserId = OneViewSessionStorage.Get("LoginUserId");
            var _oMyActionDAO = new MyActionDAO();
            TotalCount = _oMyActionDAO.GetAllActionsCount(ServiceId, -1, -1, UserId);
            if (TotalCount > 0) {              
                $location.url('nav/my-actions');
            }
            else {                
                alert("IN-NF-MAC-001 :: No actions are available to followUp");
            }
        }

        //Todo:Harshil(5/Feb/2016)
        //need chnage with dynaic menu feature
        //for arbory incedent report
        $scope.LoadDefaultIncidentReport = function () {
            var UserId = OneViewSessionStorage.Get("LoginUserId");
            var query = "SELECT * FROM DcProfileEntity WHERE DcUserId= " + UserId + " AND TemplateNodeId = 146";
            var result = window.OneViewSqlite.excecuteSqlReader(query);
            var queryresult = JSON.parse(result);
            if (queryresult.length > 0) {
                OneViewSessionStorage.Remove("DcId");
                $location.url("/newdc?TemplateNodeId='146'");
            }
            else {
                //  toaster.pop('warning', xlatService.xlat('Title_Notification'), "No profiles are available to conduct data capture");
                alert("IN-NF-MAU-003 :: No profiles are available to conduct data capture");
            }
        }


        $scope.LoadIncidentReport = function () {
            var UserId = OneViewSessionStorage.Get("LoginUserId");
            var query = "SELECT * FROM DcProfileEntity WHERE DcUserId= " + UserId + " AND TemplateNodeId = 483";
            var result = window.OneViewSqlite.excecuteSqlReader(query);
            var queryresult = JSON.parse(result);
            if (queryresult.length > 0) {
                OneViewSessionStorage.Remove("DcId");
                $location.url('/483');
            }
            else {
                //  toaster.pop('warning', xlatService.xlat('Title_Notification'), "No profiles are available to conduct data capture");
                alert("IN-NF-MAU-003 :: No profiles are available to conduct data capture");
            }           
        }

        $scope.LoadDispatchingTemplate = function () {         
            var UserId = OneViewSessionStorage.Get("LoginUserId");
            var query = "SELECT * FROM DcProfileEntity WHERE DcUserId= " + UserId + " AND TemplateNodeId = 8272";
            var result = window.OneViewSqlite.excecuteSqlReader(query);
            var queryresult = JSON.parse(result);
            if (queryresult.length > 0) {
                //var _oDcDAO = new DcDAO();
                //var DcCount = _oDcDAO.GetDcCountByServiceAndTemplateId(OneViewSessionStorage.Get("ServiceId"), 8272);                
                //if (DcCount > 0) {
                //    OneViewSessionStorage.Remove("DcId");
                //    OneViewSessionStorage.Save("TemplateId", "8272");
                //    $location.url('/8272');
                //}
                //else {
                //    navigator.notification.alert("IN-NF-MAU-004 :: No records available", ['OK'], "");
                //}
                OneViewSessionStorage.Remove("DcId");
                OneViewSessionStorage.Save("TemplateId", "8272");
                $location.url('/8272');
            }
            else {
                //  toaster.pop('warning', xlatService.xlat('Title_Notification'), "No profiles are available to conduct data capture");
                alert("IN-NF-MAU-003 :: No profiles are available to conduct data capture");
            }                   
        }

        var oOneViewSidePanel = new OneViewSidePanel();
        
        ToggleSidePanel = function () {            
            oOneViewSidePanel.Clear();
          snapRemote.toggle("right");
        }
        
        OpenSidePanel = function () {
            oOneViewSidePanel.Clear();
          snapRemote.open("right");
        }
        
        CloseSidePanel = function () {
            oOneViewSidePanel.Clear();
          snapRemote.close("right");
        }
        
        $scope.$parent.myScrollOptions = {
            snap: false,
            onScrollEnd: function ()
            {
                alert('finshed scrolling');
            }
        };
        
      /*  snapRemote.getSnapper().then(function(snapper) {
         // console.log(snapper.state('left'));
          //snapper.state(''
          snapper.on('close', function() {
            //alert("asd");
            document.getElementById("RightPanel").innerHTML = "";
          });
        });*/
  });
 

    
  //MyApp.controller('DasboardController', function($scope, xlatService) {
  //  	// Registering page name for globalization
  //   // xlatService.setCurrentPage('DashBoard_Page');
  //    xlatService.setCurrentPage('3');
  //    document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

  //    var _oDcPendingTaskBO = new DcPendingTaskBO();    
  //    _oDcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));
  //});
  
  MyApp.controller('AlertsController', function ($scope, xlatService) {
      xlatService.setCurrentPage('4');
      document.getElementById('PageTitle').innerHTML = "My Alerts";      
  });
  
  MyApp.controller('ActionController', function ($scope, xlatService) {
      xlatService.setCurrentPage('12');
      document.getElementById('PageTitle').innerHTML = "My Actions";
  });
  
  MyApp.controller('SupportController', function ($scope, xlatService) {
      xlatService.setCurrentPage('13');
      document.getElementById('PageTitle').innerHTML = "My Support";
  });
  
  MyApp.controller('ListViewGroupController', function($scope) {
    // Toggle Button Dynamic Loader
   //	$scope.Band = ["Red", "Amber", "Green"];
    
    $scope.Band = [{name:"Red", color: "red"}, {name:"Amber", color: "orange"}, {name:"Green", color:"green"}];
	
   /* $scope.$watch('RAGBand', function(v){
        console.log('changed', v);
    });	*/
  });
 
  MyApp.controller('NotificationController', function ($scope, xlatService, $location) {

      try {

          // xlatService.setCurrentPage('13');
          document.getElementById('PageTitle').innerHTML = "Notification";

          var MessageKey = $location.search().MessageKey;
          //alert('MessageKey : ' + MessageKey)
          document.getElementById('NotificationDiv').innerHTML = MessageKey;

      }
      catch (Excep) {
          alert('NotificationController Excep : ' + Excep);
      }
  });

  MyApp.controller('LogoutController', function ($scope, xlatService, $location) {

      try {

          // xlatService.setCurrentPage('13');
          document.getElementById('PageTitle').innerHTML = "Sign Out";

          var IsNavigate = false;
          var Url;

          ////////////////*********************** Clearing session and global variables before doing logout only************************ START///////////////////////////

          var IsSuccess = confirm(OneViewGlobalization[CurrentLanguage].SignOut_Confirm_Message);

          if (IsSuccess == true) {

              $location.url('/login');

              OneViewSessionStorage.Clear();
              ClearGlobalVariable();
              //oOneViewAppInfoPlugin.ClearCache(); 

              //alert('Success : ' + OneViewGlobalization[CurrentLanguage].SignOut_Success_Message);
          }
      }
      catch (Excep) {
          alert('LogoutController Excep : ' + Excep);
      }
  });

  //MyApp.controller('CookingAndBlastController', function ($scope) {
  //    $scope.NCForm = false;
  //    $scope.SignPad = false;
  //    $scope.signURL = '';

  //    $scope.ShowNC = function () {
  //        $scope.NCForm = true;
  //    }

  //    $scope.HideNC = function () {
  //        $scope.NCForm = false;
  //    }

  //    $scope.ShowSignPad = function () {
  //        signaturePad.clear();
  //        $scope.SignPad = true;
  //    }


  //    var wrapper = document.getElementById("signature-pad"),
  //    clearButton = wrapper.querySelector("[data-action=clear]"),
  //    saveButton = wrapper.querySelector("[data-action=save]"),
  //    canvas = wrapper.querySelector("canvas"),
  //    signaturePad;

  //    // Adjust canvas coordinate space taking into account pixel ratio,
  //    // to make it look crisp on mobile devices.
  //    // This also causes canvas to be cleared.
  //    function resizeCanvas() {
  //        var ratio = window.devicePixelRatio || 1;
  //        canvas.width = canvas.offsetWidth * ratio;
  //        canvas.height = canvas.offsetHeight * ratio;
  //        canvas.getContext("2d").scale(ratio, ratio);
  //    }

  //    window.onresize = resizeCanvas;
  //    resizeCanvas();

  //    signaturePad = new SignaturePad(canvas);

  //    clearButton.addEventListener("click", function (event) {
  //        signaturePad.clear();
  //    });

  //    $scope.HideSignPad = function () {
  //        if (signaturePad.isEmpty()) {
  //            alert("Please provide signature first.");
  //        } else {
  //            //window.open(signaturePad.toDataURL());
  //            // $scope.signURL = signaturePad.toDataURL();
  //            $scope.SignPad = false;
  //            //signaturePad.clear();
  //            // alert($scope.signURL);
  //            //alert($scope.SignPad);
  //        }
  //    };


  //});

  /* 
    scotchApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });**/
    
    
// ********************************************************
// * Grouped Checkbox Button			                  *
// ********************************************************

MyApp.directive('buttonToggle', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, attr, ctrl) {
            var classToToggle = attr.buttonToggle;
            element.bind('click', function() {
                var checked = ctrl.$viewValue;
                $scope.$apply(function(scope) {
                    ctrl.$setViewValue(!checked);
                });
            });

            $scope.$watch(attr.ngModel, function(newValue, oldValue) {
                newValue ? element.addClass(classToToggle) : element.removeClass(classToToggle);
            });
        }
    };
});

// ********************************************************
// * Grouped Radio Buttons							                  *
// ********************************************************

MyApp.directive('buttonsRadioCustom', function () {
    return {
        restrict: 'E',
        scope: { model: '=', options: '=' },
        controller: function ($scope) {
            $scope.activate = function (option) {
                $scope.model = option;
               // console.log(option);
            };
        },
        template: "<button class='button' " +
					"ng-class='{activated: option == model}'" +
					"ng-repeat='option in options' " +
					"ng-click='activate(option)'>{{option}} " +
				  "</button>"
    };
});

// ********************************************************
// * Grouped Radio Buttons							                  *
// ********************************************************

MyApp.directive('buttonsRadio', function () {
    return {
        restrict: 'E',
        scope: { model: '=', options: '=' },
        controller: function ($scope) {
            $scope.activate = function (option) {
                $scope.model = option;
                $scope.MyStyle = { 'background': option.color };

                $scope.applyStyle = function (option) {
                    if ($scope.model == option) {
                        //alert($scope.MyStyle);
                        return $scope.MyStyle;
                    }
                };
                // alert($scope.MyStyle)
                //console.log(option);
            };


        },
        template: "<button class='button button-block' " +
          "ng-class='{activated: option == model}'" +
					"ng-style='applyStyle(option)'" +
					"ng-repeat='option in options' " +
					"ng-click='activate(option)'>{{option.name}} " +
				  "</button>"
    };
});

// ********************************************************
// * TickList							                  *
// ********************************************************
MyApp.directive('tickList', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: '<ul class="list settings" ng-transclude></ul>',
        scope: {
            multiple: '@',
            selectedIcon: '@',
            $onChange: '&onChange'
        },
        controller: ['$scope', function($scope) {
            var items = $scope.items = [];
            this.scope = $scope;

            this.addItem = function(item) {
                items.push(item);
            };
            this.selectItem = function(item) {
                $scope.$apply(function() {
                    if ($scope.multiple) {
                        item.$select(!item.model.selected);
                    } else {
                        var i, l = items.length;
                        for (i = 0; i < l; ++i) {
                            items[i].$select(false);
                        }
                        item.$select(true);
                    }
                });
            }
        } ]
    }
})

MyApp.directive('tickListItem', function() {
    return {
        restrict: 'E',
        require: '^tickList',
        transclude: true,
        scope: {
            selected: '@',
            $onChange: '&onChange',
            selectedIcon: '@',
            model: '='
        },
        template: '<li class="item item-icon-right" ng-class="selected"><div class="text" ng-transclude></div><i ng-if="selected" class="icon icon-check" ></i></li>',
        
        link: function (scope, element, attrs, tickListCtrl) {

           // alert(element[0].innerHTML);
            function tap(eventArgs) {
                tickListCtrl.selectItem(scope);
            }

            scope.$select = function (value) {

                //scope.model.selected = "selected";
                var val = scope.model.selected;
                scope.selected = value;
                if (scope.model) scope.model.selected = value;
                if (val != value) scope.$onChange(scope.model);
                if (scope.model.selected == true) {
                    scope.model.selected = "selected";
                }
                else {
                    scope.model.selected = "";
                }
            };
            if (!scope.model) {
                scope.model = { selected: scope.selected == 'true' };
            }
            //set selected icon: defined in: tickListItem -> tickList -> default
            //element.find('i').addClass(scope.selectedIcon || tickListCtrl.scope.selectedIcon || 'icon icon-check');
            tickListCtrl.addItem(scope);
            element.bind('click', function (eventArgs) {
                tap(eventArgs);
            });
            //$ionicGesture.on('tap', tap, element);
        }
    }
});

MyApp.directive('tickListItemPre', function() {
    return {
        restrict: 'E',
        require: '^tickList',
        transclude: true,
        scope: {
            selected: '@',
            $onChange: '&onChange',
            selectedIcon: '@',
            model: '='
        },
        template: '<li class="item item-icon-right" ng-class="selected" style="overflow: inherit;text-overflow: inherit;white-space: normal;"><div class="text" ng-transclude></div><i ng-if="selected" class="icon icon-check" ></i></li>',
        
        link: function (scope, element, attrs, tickListCtrl) {

           // alert(element[0].innerHTML);
            function tap(eventArgs) {
                tickListCtrl.selectItem(scope);
            }

            scope.$select = function (value) {

                //scope.model.selected = "selected";
                var val = scope.model.selected;
                scope.selected = value;
                if (scope.model) scope.model.selected = value;
                if (val != value) scope.$onChange(scope.model);
                if (scope.model.selected == true) {
                    scope.model.selected = "selected";
                }
                else {
                    scope.model.selected = "";
                }
            };
            if (!scope.model) {
                scope.model = { selected: scope.selected == 'true' };
            }
            //set selected icon: defined in: tickListItem -> tickList -> default
            //element.find('i').addClass(scope.selectedIcon || tickListCtrl.scope.selectedIcon || 'icon icon-check');
            tickListCtrl.addItem(scope);
            element.bind('click', function (eventArgs) {
                tap(eventArgs);
            });
            //$ionicGesture.on('tap', tap, element);
        }
    }
});


// ********************************************************
// * TickList - Setting							                  *
// ********************************************************

MyApp.directive('tickListItemSettings', function() {
    return {
        restrict: 'E',
        require: '^tickList',
        transclude: true,
        scope: {
            selected: '@',
            $onChange: '&onChange',
            selectedIcon: '@',
            model: '='
        },
        template: '<li class="item item-icon-right" ng-class="selected"><div class="text" ng-transclude></div><span ng-if="selected" class="badge badge-balanced">Connected</span></li>',
        
        link: function (scope, element, attrs, tickListCtrl) {

           // alert(element[0].innerHTML);
            function tap(eventArgs) {
                tickListCtrl.selectItem(scope);
            }

            scope.$select = function (value) {

                //scope.model.selected = "selected";
                var val = scope.model.selected;
                scope.selected = value;
                if (scope.model) scope.model.selected = value;
                if (val != value) scope.$onChange(scope.model);
                if (scope.model.selected == true) {
                    scope.model.selected = "selected";
                }
                else {
                    scope.model.selected = "";
                }
            };
            if (!scope.model) {
                scope.model = { selected: scope.selected == 'true' };
            }
            //set selected icon: defined in: tickListItem -> tickList -> default
            //element.find('i').addClass(scope.selectedIcon || tickListCtrl.scope.selectedIcon || 'icon icon-check');
            tickListCtrl.addItem(scope);
            element.bind('click', function (eventArgs) {
                tap(eventArgs);
            });
            //$ionicGesture.on('tap', tap, element);
        }
    }
});


// ********************************************************
// * Grouped Radio Buttons							                  *
// ********************************************************

//MyApp.directive('buttonsBand', function () {
//    return {
//        restrict: 'E',
//        scope: { model: '=', options: '=' },
//        controller: function ($scope) {
//            $scope.activate = function (option) {
//                $scope.model = option;
//                console.log(option);
//            };
//        },
//        template: "<button class='button' " +
//    				"ng-class='{activated: option == model}'" +
//    				"ng-repeat='option in options' " +
//    				"ng-click='activate(option)'>{{option}} " +
//    			  "</button>"
//    };
//});

MyApp.directive('buttonsBandOld', function() {
	return {
		restrict: 'E',
		scope: { model: '=', options:'='},
		controller: function($scope){
		    $scope.activate = function (option, options) {
		        for (var i = 0; i < options.length; i++) {
		            if (options[i].Name == option.Name) {
		                option.Selected = true;
		            }
		            else {
		                options[i].Selected = false;
		            }
		        }
		        $scope.model = option.Name;
		        BandSelection(option);
		        AnswerModeNCActionEvent(option);
                
		    };
		    $scope.appliedStyle = function (option) {
		        if (option.Name == $scope.model || option.Selected) {
		            return option.ColourIndex;
		        }
		    };
		},
		template: "<button class='button' "+
					"ng-class='{activated : option.Name == model}'" +
                    "ng-style='{backgroundColor: appliedStyle(option)}'" +                   
					"ng-repeat='option in options' "+
					"ng-click='activate(option,options)'>{{option.Name}} " +                  
				  "</button>"
	};
});



MyApp.directive('buttonsBand_OLD', function () {
    return {
        restrict: 'E',
        scope: { model: '=', options: '=' },
        controller: function ($scope) {
            $scope.activate = function (option, options) {
                var ISSuccess = true;

                var oDefaultValidationResponse = new DefaultValidationResponse();
                if (AnswerModePreControlEvents != null) {
                    oDefaultValidationResponse = AnswerModePreControlEvents(option.AttributeNodeId, option.ControlId, "");
                ISSuccess = oDefaultValidationResponse.IsSuccess;
            }
             
                if (ISSuccess) {
                    for (var i = 0; i < options.length; i++) {
                        if (options[i].Name == option.Name) {
                            option.Selected = true;
                        }
                        else {
                            options[i].Selected = false;
                        }
                    }
               
                $scope.model = option.Name;
                BandSelection(option);
                AnswerModeNCActionEvent(option);
                }
            };
            $scope.appliedStyle = function (option) {                
                if (option.Name == $scope.model || option.Selected) {
                    return option.ColourIndex;
                }
                else if (option.DefaultBackgroundColour != undefined) {                
                    return option.DefaultBackgroundColour;                   
                }
            };
        },
        template: "<button class='button' id='{{option.Id}}'" +
					"ng-class='{activated : option.Name == model}'" +
                    "ng-style='{backgroundColor: appliedStyle(option)}'" +
					"ng-repeat='option in options' " +
					"ng-click='activate(option,options)'>{{option.Name}} " +
				  "</button>"
    };
});


MyApp.directive('buttonsBand', function () {
    return {
        restrict: 'E',
        scope: { model: '=', options: '=' },
        controller: function ($scope) {
            $scope.activate = function (option, options) {
                var ISSuccess = true;

                var oDefaultValidationResponse = new DefaultValidationResponse();
                if (AnswerModePreControlEvents != null) {
                    oDefaultValidationResponse = AnswerModePreControlEvents(option.AttributeNodeId, option.ControlId, "");
                    ISSuccess = oDefaultValidationResponse.IsSuccess;
                }

                if (ISSuccess) {
                    for (var i = 0; i < options.length; i++) {
                        if (options[i].Name == option.Name) {
                            if (option.Selected == false) {
                                option.Selected = true;
                            }
                            else {
                                options[i].Selected = false;
                            }
                        }
                        else {
                            options[i].Selected = false;
                        }
                    }

                    $scope.model = option.Name;
                    BandSelection(option);
                    AnswerModeNCActionEvent(option);
                }
            };
            $scope.appliedStyle = function (option) {

                if (option.Name == $scope.model && option.Selected == true) {
                    return option.ColourIndex;
                }
                else if (option.Name == $scope.model && option.Selected == false) {
                    //alert(OneViewSessionStorage.Get("DcId"));
                    // if (OneViewSessionStorage.Get("DcId") == null) {
                    //alert("appliedStyle**********Name : " + option.Name + "-- ID : " + option.Id + "  Selected Status:   " + option.Selected);
                    $scope.model = "";
                    //return "";
                    //}
                    //else {
                    //    option.Selected = true;
                    //    return option.ColourIndex;
                    //}
                }
                else if (option.DefaultBackgroundColour != undefined) {
                    return option.DefaultBackgroundColour;
                }
            };
        },

        template: "<button class='button' id='{{option.Id}}'" +
					"ng-class='{activated : option.Name == model}'" +
                    "ng-style='{backgroundColor: appliedStyle(option)}'" +
					"ng-repeat='option in options' " +
					"ng-click='activate(option,options)'>{{option.Name}} " +
				  "</button>"
    };
});


MyApp.directive('buttonsBandColor', function () {
    return {
        restrict: 'E',
        scope: { model: '=', options: '=' },
        controller: function ($scope) {
            $scope.activate = function (option, options) {

                for (var i = 0; i < options.length; i++) {
                    // alert("Loop");
                    if (options[i].Name == option.Name) {
                        option.Selected = true;

                    }
                    else {
                        options[i].Selected = false;
                    }
                }
                $scope.model = option.Name;
                BandSelection(option);
		        AnswerModeNCActionEvent(option);
            };
        },
        template: "<button class='button icon' " +
                    "ng-class='{activated : option.Name == model}'" +
                    "ng-style='{backgroundColor: option.ColourIndex}'" +
                    "ng-repeat='option in options' " +
                    "ng-click='activate(option,options)'>{{option.Name}}" +
                  "</button>"
    };
});


MyApp.directive('buttonsTab', function () {
    return {
        restrict: 'E',
        scope: { model: '=', options: '=' },
        controller: function ($scope) {
            $scope.activate = function (option, options) {
                for (var i = 0; i < options.length; i++) {
                    if (options[i].Name == option.Name) {
                        option.Selected = true;
                    }
                    else {
                        options[i].Selected = false;
                    }
                }
                $scope.model = option.Name;


            };
            $scope.appliedStyle = function (option) {
                if (option.Name == $scope.model || option.Selected) {
                    return option.ColourIndex;
                }
            };
        },
        template: "<button class='button' " +
					"ng-class='{activated : option.Name == model}'" +
                    "ng-style='{backgroundColor: appliedStyle(option)}'" +
					"ng-repeat='option in options' " +
					"ng-click='activate(option,options)'>{{option.Name}} " +
				  "</button>"
    };
});


// ********************************************************
// * TickList							                  *
// ********************************************************
MyApp.directive('tickListShift', function () {
    return {
        restrict: 'E',
        transclude: true,
        template: '<ul class="list settings" ng-transclude></ul>',
        scope: {
            multiple: '@',
            selectedIcon: '@',
            $onChange: '&onChange'
        },
        controller: ['$scope', function ($scope) {
            var items = $scope.items = [];
            this.scope = $scope;

            this.addItem = function (item) {
                items.push(item);
            };
            this.selectItem = function (item) {
                $scope.$apply(function () {
                    if ($scope.multiple) {
                        item.$select(!item.model.selected);
                    } else {
                        var i, l = items.length;
                        for (i = 0; i < l; ++i) {
                            items[i].$select(false);
                        }
                        item.$select(true);
                    }
                });
            }
        }]
    }
})



// ********************************************************
// * TickList - Setting							                  *
// ********************************************************
MyApp.directive('tickListItemSettingsShift', function () {
    return {
        restrict: 'E',
        require: '^tickListShift',
        transclude: true,
        scope: {
            selected: '@',
            $onChange: '&onChange',
            selectedIcon: '@',
            model: '='
        },
        template: '<li class="item item-icon-right" ng-class="selected"><div class="text" ng-transclude></div><span ng-if="selected" class="badge badge-balanced">Selected</span></li>',

        link: function (scope, element, attrs, tickListCtrl) {

            // alert(element[0].innerHTML);
            function tap(eventArgs) {
                tickListCtrl.selectItem(scope);
            }

            scope.$select = function (value) {

                //scope.model.selected = "selected";
                var val = scope.model.selected;
                scope.selected = value;
                if (scope.model) scope.model.selected = value;
                if (val != value) scope.$onChange(scope.model);
                if (scope.model.selected == true) {
                    scope.model.selected = "selected";
                }
                else {
                    scope.model.selected = "";
                }
            };
            if (!scope.model) {
                scope.model = { selected: scope.selected == 'true' };
            }
            //set selected icon: defined in: tickListItem -> tickList -> default
            //element.find('i').addClass(scope.selectedIcon || tickListCtrl.scope.selectedIcon || 'icon icon-check');
            tickListCtrl.addItem(scope);
            element.bind('click', function (eventArgs) {
                tap(eventArgs);
            });
            //$ionicGesture.on('tap', tap, element);
        }
    }
});
