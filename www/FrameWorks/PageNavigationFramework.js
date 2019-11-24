


  //Global Variables

 // var PageRouteKey = "";

  function PageNavigationFramework() {

      var MyInstance = this;

      this.CreatePreferenceDict = function (RouteKey) {
          try {
              OneViewConsole.Debug("CreatePreferenceDict start", "PageNavigationFramework.CreatePreferenceDict");
              var NavigationPreferenceDict = {};
              var PageRouteKey = "";
              //alert(PageRouteKey + ', RouteKey : ' + RouteKey);
              if (PageRouteKey == "") {
                  PageRouteKey = RouteKey;
              }
              if (NavigationPreferenceDict[PageRouteKey] == undefined) {
                  NavigationPreferenceDict[PageRouteKey] = {};
                  var RouteKeySplitted = PageRouteKey.split("##");
                  var Separator = "##";
                  var Len = RouteKeySplitted.length;
                  if (Len == 4) {
                      if (PageRouteKey.indexOf("Approve") == -1) {
                          var Partial = "DcP";
                          var Completed = "DcC";
                          var Key1 = "";
                          var Key2 = "";
                          var Key3 = "";
                          var Key4 = "";

                          if (PageRouteKey.indexOf(Partial) != -1) {
                              Key1 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + RouteKeySplitted[2] + Separator + Partial;
                              Key2 = RouteKeySplitted[0] + Separator + "*" + Separator + RouteKeySplitted[2] + Separator + Partial;
                              Key3 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + "*" + Separator + Partial;
                              Key4 = RouteKeySplitted[0] + Separator + "*" + Separator + "*" + Separator + Partial;
                          }

                          else if (PageRouteKey.indexOf(Completed) != -1) {
                              Key1 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + RouteKeySplitted[2] + Separator + Completed;
                              Key2 = RouteKeySplitted[0] + Separator + "*" + Separator + RouteKeySplitted[2] + Separator + Completed;
                              Key3 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + "*" + Separator + Completed;
                              Key4 = RouteKeySplitted[0] + Separator + "*" + Separator + "*" + Separator + Completed;
                          }

                          var Key5 = RouteKeySplitted[0] + Separator + "*" + Separator + "*" + Separator + "*";
                          var Key6 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + RouteKeySplitted[2] + Separator + "*";
                          var Key7 = RouteKeySplitted[0] + Separator + "*" + Separator + RouteKeySplitted[2] + Separator + "*";
                          var Key8 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + "*" + Separator + "*";


                          NavigationPreferenceDict[PageRouteKey] = {
                              1: { "RouteKey": Key1, IsExecuted: false, IsCRExecuted: false }, 2: { "RouteKey": Key2, IsExecuted: false, IsCRExecuted: false }, 3: { "RouteKey": Key3, IsExecuted: false, IsCRExecuted: false }, 4: { "RouteKey": Key4, IsExecuted: false, IsCRExecuted: false },
                              5: { "RouteKey": Key5, IsExecuted: false, IsCRExecuted: false }, 6: { "RouteKey": Key6, IsExecuted: false, IsCRExecuted: false }, 7: { "RouteKey": Key7, IsExecuted: false, IsCRExecuted: false }, 8: { "RouteKey": Key8, IsExecuted: false, IsCRExecuted: false }
                          }
                      }
                      else {
                          var Level = RouteKeySplitted[3];
                         // alert('Level : ' + Level);
                          //var Key1 = "";
                          //var Key2 = "";
                          var AnyLevel = "L*";
                          var LevelCompleted = "LC";

                          if (Level.indexOf(LevelCompleted) == -1 && Level.indexOf(AnyLevel) == -1) {
                              // alert('all');
                              var Key1 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + RouteKeySplitted[2] + Separator + Level;
                              var Key2 = RouteKeySplitted[0] + Separator + "*" + Separator + RouteKeySplitted[2] + Separator + Level;
                              var Key3 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + "*" + Separator + Level;
                              var Key4 = RouteKeySplitted[0] + Separator + "*" + Separator + "*" + Separator + Level;


                              var Key5 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + RouteKeySplitted[2] + Separator + AnyLevel;
                              var Key6 = RouteKeySplitted[0] + Separator + "*" + Separator + RouteKeySplitted[2] + Separator + AnyLevel;
                              var Key7 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + "*" + Separator + AnyLevel;
                              var Key8 = RouteKeySplitted[0] + Separator + "*" + Separator + "*" + Separator + AnyLevel;

                              var Key9 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + RouteKeySplitted[2] + Separator + LevelCompleted;
                              var Key10 = RouteKeySplitted[0] + Separator + "*" + Separator + RouteKeySplitted[2] + Separator + LevelCompleted;
                              var Key11 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + "*" + Separator + LevelCompleted;
                              var Key12 = RouteKeySplitted[0] + Separator + "*" + Separator + "*" + Separator + LevelCompleted;

                              NavigationPreferenceDict[PageRouteKey] = {
                                  1: { "RouteKey": Key1, IsExecuted: false, IsCRExecuted: false }, 2: { "RouteKey": Key2, IsExecuted: false, IsCRExecuted: false }, 3: { "RouteKey": Key3, IsExecuted: false, IsCRExecuted: false }, 4: { "RouteKey": Key4, IsExecuted: false, IsCRExecuted: false },
                                  5: { "RouteKey": Key5, IsExecuted: false, IsCRExecuted: false }, 6: { "RouteKey": Key6, IsExecuted: false, IsCRExecuted: false }, 7: { "RouteKey": Key7, IsExecuted: false, IsCRExecuted: false }, 8: { "RouteKey": Key8, IsExecuted: false, IsCRExecuted: false },
                                  9: { "RouteKey": Key9, IsExecuted: false, IsCRExecuted: false }, 10: { "RouteKey": Key10, IsExecuted: false, IsCRExecuted: false }, 11: { "RouteKey": Key11, IsExecuted: false, IsCRExecuted: false }, 12: { "RouteKey": Key12, IsExecuted: false, IsCRExecuted: false }
                              }

                          }
                          else if (Level.indexOf(LevelCompleted) == -1) {
                              // alert('completed');
                              var Key1 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + RouteKeySplitted[2] + Separator + AnyLevel;
                              var Key2 = RouteKeySplitted[0] + Separator + "*" + Separator + RouteKeySplitted[2] + Separator + AnyLevel;
                              var Key3 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + "*" + Separator + AnyLevel;
                              var Key4 = RouteKeySplitted[0] + Separator + "*" + Separator + "*" + Separator + AnyLevel;

                              var Key5 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + RouteKeySplitted[2] + Separator + AnyLevel;
                              var Key6 = RouteKeySplitted[0] + Separator + "*" + Separator + RouteKeySplitted[2] + Separator + AnyLevel;
                              var Key7 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + "*" + Separator + AnyLevel;
                              var Key8 = RouteKeySplitted[0] + Separator + "*" + Separator + "*" + Separator + AnyLevel;

                              NavigationPreferenceDict[PageRouteKey] = {
                                  1: { "RouteKey": Key1, IsExecuted: false, IsCRExecuted: false }, 2: { "RouteKey": Key2, IsExecuted: false, IsCRExecuted: false }, 3: { "RouteKey": Key3, IsExecuted: false, IsCRExecuted: false }, 4: { "RouteKey": Key4, IsExecuted: false, IsCRExecuted: false },
                                  5: { "RouteKey": Key5, IsExecuted: false, IsCRExecuted: false }, 6: { "RouteKey": Key6, IsExecuted: false, IsCRExecuted: false }, 7: { "RouteKey": Key7, IsExecuted: false, IsCRExecuted: false }, 8: { "RouteKey": Key8, IsExecuted: false, IsCRExecuted: false }
                              }
                          }
                          else if (Level.indexOf(AnyLevel) == -1) {
                             // alert('any');
                              var Key1 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + RouteKeySplitted[2] + Separator + LevelCompleted;
                              var Key2 = RouteKeySplitted[0] + Separator + "*" + Separator + RouteKeySplitted[2] + Separator + LevelCompleted;
                              var Key3 = RouteKeySplitted[0] + Separator + RouteKeySplitted[1] + Separator + "*" + Separator + LevelCompleted;
                              var Key4 = RouteKeySplitted[0] + Separator + "*" + Separator + "*" + Separator + LevelCompleted;

                              NavigationPreferenceDict[PageRouteKey] = {
                                  1: { "RouteKey": Key1, IsExecuted: false, IsCRExecuted: false }, 2: { "RouteKey": Key2, IsExecuted: false, IsCRExecuted: false },
                                  3: { "RouteKey": Key3, IsExecuted: false, IsCRExecuted: false }, 4: { "RouteKey": Key4, IsExecuted: false, IsCRExecuted: false }
                              }
                          }
                      }
                  }

                  else {
                      //  alert('PageNavigationFramework.CreatePreferenceDict Len not equal to 4 : Not Implemented');
                  }

                  // alert('NavigationPreferenceDict 11 : ' + JSON.stringify(NavigationPreferenceDict));
              }


              OneViewConsole.Debug("CreatePreferenceDict end", "PageNavigationFramework.CreatePreferenceDict");

              return NavigationPreferenceDict;
          }
          catch (Excep) {
             // alert("PageNavigationFramework.CreatePreferenceDict Excep 11 : " + Excep);
              //alert("PageNavigationFramework.CreatePreferenceDict Excep 22 : " + JSON.stringify(Excep));
              throw oOneViewExceptionHandler.Create("Framework", "PageNavigationFramework.CreatePreferenceDict", Excep);
          }
      }


      this.RedirectByPreference = function (RouteKey, $location, xlatService, $scope) {
          try {
              OneViewConsole.Debug("RedirectByPreference start", "PageNavigationFramework.RedirectByPreference");
             
              var PageRouteKey = "";
              //alert(PageRouteKey + ', RouteKey : ' + RouteKey);
              if (PageRouteKey == "") {
                  PageRouteKey = RouteKey;
              }

              var Separator = "##";
              //var ColonSeparator = "0";
              var RouteKeySplitted = RouteKey.split(Separator);
              var Len = RouteKeySplitted.length;

              var NewRouteKey = "";
              var NavigationPreferenceDict = MyInstance.CreatePreferenceDict(RouteKey);
            // alert('NavigationPreferenceDict : ' + JSON.stringify(NavigationPreferenceDict));
              var NavigationData = NavigationPreferenceDict[PageRouteKey];
              var AllRouter = OneViewRouteSegmentProvider.segments['nav'];
             // alert('AllRouter : ' + JSON.stringify(AllRouter));
              
              var ConfiguredRouterKeyData = "";
              for (var key in NavigationData) {
                  var KeyDetails = NavigationData[key];
                  // alert(key + ', KeyDetails : ' + JSON.stringify(KeyDetails));
                  var LocalKey = KeyDetails.RouteKey;
                 // alert(RouteKey + ',  LocalKey : ' + LocalKey);
                  if (KeyDetails.IsExecuted != true) {
                      NewRouteKey = LocalKey + "CNR";
                      NavigationData[key] = { RouteKey: LocalKey, IsExecuted: true, IsCRExecuted: KeyDetails.IsCRExecuted };
                      ConfiguredRouterKeyData = AllRouter.children[NewRouteKey];
                  }

                  if (ConfiguredRouterKeyData != undefined) {
                      break;
                  }

                  else {
                      if (KeyDetails.IsCRExecuted != true) {
                          NewRouteKey = LocalKey + "CR";
                          NavigationData[key] = { RouteKey: LocalKey, IsExecuted: KeyDetails.IsExecuted, IsCRExecuted: true };
                          ConfiguredRouterKeyData = AllRouter.children[NewRouteKey];
                      }

                      if (ConfiguredRouterKeyData != undefined) {
                          break;
                      }
                  } 
               
              }


             // alert('ConfiguredRouterKeyData :' + ConfiguredRouterKeyData);
              if (ConfiguredRouterKeyData != undefined && ConfiguredRouterKeyData != "") {
                  var templateUrl = ConfiguredRouterKeyData.params.templateUrl;
                  if (NewRouteKey.indexOf("CR") != -1) {
                      MyInstance.DisplayConfirmationMessage(xlatService, $location, NewRouteKey, $scope, templateUrl)
                  }
                  else if (NewRouteKey.indexOf("CNR") != -1) {                     
                      MyInstance.DisplayInfoMessage(xlatService, NewRouteKey);                                       
                      if (templateUrl != "" && templateUrl != undefined && templateUrl != null) {
                          $location.path(NewRouteKey);
                      }
                  }                  
              }
              else {
                  $location.path("/login");
              }


              NavigationPreferenceDict = {};

              OneViewConsole.Debug("RedirectByPreference end", "PageNavigationFramework.RedirectByPreference");
          }
          catch (Excep) {
             //  alert("PageNavigationFramework.RedirectByPreference Excep 11 : " + Excep);
             //  alert("PageNavigationFramework.RedirectByPreference Excep 22 : " + JSON.stringify(Excep));
              throw oOneViewExceptionHandler.Create("Framework", "PageNavigationFramework.RedirectByPreference", Excep);
          }
      }

      this.DisplayConfirmationMessage = function (xlatService, $location, RouteKey, $scope, templateUrl) {
          try {
              OneViewConsole.Debug("DisplayConfirmationMessage start", "PageNavigationFramework.DisplayConfirmationMessage");

              var MsgKey = RouteKey + "_MsgKey";

              var CurrentLanguage = xlatService.getCurrentLanguage();
              var CurrentPage = xlatService.getCurrentPage();             
              var MsgString = oGlobalizationComponent.GetLocalizedStringIfExists(MsgKey, CurrentPage, CurrentLanguage);
             // alert('MsgString 2 :' + MsgString);

              var DisplayMsg = "";
              if (MsgString == undefined || MsgString == null || MsgString == "") {

                  if (RouteKey.indexOf('Approve') != -1) {
                      DisplayMsg = xlatService.xlat("IN-SU-LVI-004 :: Record approved successfully. Are you sure, you want to navigate back ?");
                  }
                  else if (RouteKey.indexOf('Update') != -1) {
                      DisplayMsg = xlatService.xlat("IN-SU-LVI-003 :: Record updated successfully. Are you sure, you want to navigate back ?");
                  }
                  else if (RouteKey.indexOf('Save') != -1) {
                      DisplayMsg = xlatService.xlat("IN-SU-LVI-001 :: Record added successfully. Are you sure, you want to navigate back ?");
                  }
                  else if (RouteKey.indexOf('Submit') != -1) {
                      DisplayMsg = xlatService.xlat("IN-SU-LVI-002 :: Record added successfully. Are you sure, you want to navigate back ?");
                  }

                  else {
                      DisplayMsg = xlatService.xlat("IN-SU-LVI-005 :: Operation performed successfully. Are you sure, you want to navigate back ?");
                  }
              }
              else {
                  DisplayMsg = MsgString;
              }

              var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
              oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat("Confirm"), DisplayMsg, function (ConfirmationId) {
                  if (ConfirmationId == '2') {
                      if (templateUrl != "" && templateUrl != undefined && templateUrl != null) {
                          $location.path(RouteKey);
                          $scope.$apply();
                      }
                      MyInstance.ClearData();
                  }
                  else {                      
                      MyInstance.ClearData();
                  }
              });

              OneViewConsole.Debug("DisplayConfirmationMessage end", "PageNavigationFramework.DisplayConfirmationMessage");
          }
          catch (Excep) {
            //  alert("PageNavigationFramework.DisplayConfirmationMessage Excep 11 : " + Excep);
            //  alert("PageNavigationFramework.DisplayConfirmationMessage Excep 22 : " + JSON.stringify(Excep));
              throw oOneViewExceptionHandler.Create("Framework", "PageNavigationFramework.DisplayConfirmationMessage", Excep);
          }
      }

      this.ClearData = function () {
          try {
              OneViewConsole.Debug("ClearData start", "PageNavigationFramework.ClearData");

              NavigationPreferenceDict = {};
              PageRouteKey = "";

              OneViewConsole.Debug("ClearData end", "PageNavigationFramework.ClearData");
          }
          catch (Excep) {
            //  alert("PageNavigationFramework.ClearData Excep 11 : " + Excep);
            //  alert("PageNavigationFramework.ClearData Excep 22 : " + JSON.stringify(Excep));
              throw oOneViewExceptionHandler.Create("Framework", "PageNavigationFramework.ClearData", Excep);
          }
      }

      this.DisplayInfoMessage = function (xlatService, MessageKey) {
          try {
              OneViewConsole.Debug("DisplayInfoMessage start", "PageNavigationFramework.DisplayInfoMessage");
                            
              var MsgKey = MessageKey + "_MsgKey"
              var CurrentLanguage = xlatService.getCurrentLanguage();
              var CurrentPage = xlatService.getCurrentPage();
            //  alert(MsgKey + ', CurrentLanguage :' + CurrentLanguage + "," + CurrentPage);
              var MsgString = oGlobalizationComponent.GetLocalizedStringIfExists(MsgKey, CurrentPage, CurrentLanguage);
             // alert('MsgString :' + MsgString);

              
              if (MessageKey.indexOf('Approve') != -1) {
                  if (MessageKey.indexOf('LC') != -1) {
                      if (MsgString == undefined || MsgString == null || MsgString == "") {
                          alert(xlatService.xlat("IN-SU-LVI-001 :: Record approved successfully"));
                      }
                      else {
                          alert(xlatService.xlat(MsgKey));
                      }
                  }
              }
              else if (MessageKey.indexOf('Update') != -1) {
                  if (MsgString == undefined || MsgString == null || MsgString == "") {
                      alert(xlatService.xlat("IN-SU-LVI-004 :: Record updated successfully"));
                  }
                  else {
                      alert(xlatService.xlat(MsgKey));
                  }
              }
              else if (MessageKey.indexOf('Save') != -1) {
                  if (MsgString == undefined || MsgString == null || MsgString == "") {
                      alert(xlatService.xlat("IN-SU-LVI-002 :: Record saved successfully"));
                  }
                  else {
                      alert(xlatService.xlat(MsgKey));
                  }
              }
              else if (MessageKey.indexOf('Submit') != -1) {
                  if (MsgString == undefined || MsgString == null || MsgString == "") {
                      alert(xlatService.xlat("IN-SU-LVI-003 :: Record saved successfully"));
                  }
                  else {
                      alert(xlatService.xlat(MsgKey));
                  }
              }              
              else {
                  //other case when any new operation
                  alert('IN-SU-LVI-003 :: Operation Performed Successfully');
              }


              OneViewConsole.Debug("DisplayInfoMessage end", "PageNavigationFramework.DisplayInfoMessage");
          }
          catch (Excep) {
            //  alert("PageNavigationFramework.DisplayInfoMessage Excep 11 : " + Excep);
            //  alert("PageNavigationFramework.DisplayInfoMessage Excep 22 : " + JSON.stringify(Excep));
              throw oOneViewExceptionHandler.Create("Framework", "PageNavigationFramework.DisplayInfoMessage", Excep);
          }
      }


      this.GetOperationKey = function (OperationName, Level) {
          try {
              var OperationKey = "";
              var ServiceId = OneViewSessionStorage.Get("ServiceId");
              var PlaceId = OneViewSessionStorage.Get("DcPlaceId");
              var TemplateId = OneViewSessionStorage.Get("TemplateId");
              var Separator = "##";

              if (OperationName.indexOf("Approve") != -1) {
                  OperationKey = ServiceId + OperationName + Separator + PlaceId + Separator + TemplateId + Separator + "L" + Level;
              }
              else {
                  var DcStatusKey = "DcP";
                  if (OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == 'true') {
                      DcStatusKey = "DcC";
                  }
                  OperationKey = ServiceId + OperationName + Separator + PlaceId + Separator + TemplateId + Separator + DcStatusKey;
              }


              return OperationKey;
          }
          catch (Excep) {
              throw oOneViewExceptionHandler.Create("Framework", "PageNavigationFramework.GetOperationKey", Excep);
          }
      }

      this.GetApprovalLevelKey = function (ApprovalInfoResponse) {
          try {
              var Level;
              var OnDeviceApprovalLevels = ApprovalInfoResponse[0].DcApprovalProfileInfo.DcApprovalProfile.OnDeviceApprovalLevels;
              var NextApprovalIndex = ApprovalInfoResponse[0].NextApprovalIndex;

              Level = NextApprovalIndex;
              if (NextApprovalIndex != 1 && NextApprovalIndex == OnDeviceApprovalLevels) {
                  Level = "C";
              }

              return Level;
          }
          catch (Excep) {
              throw oOneViewExceptionHandler.Create("Framework", "PageNavigationFramework.GetOperationKey", Excep);
          }
      }
  }