
// Global variable for saving selected probe
var ConnectedProbe = {};
var NewConnectProbe = {};
var IsNewProbe = false;

/// <summary>
/// Settings controller (For event registration)
/// </summary>
MyApp.controller('SettingsControllerNew', function ($scope, $location, xlatService, $timeout, $compile) {
    var _oSettingsFacade = new SettingsFacade();

    // Initialize page   
    _oSettingsFacade.Init($scope, xlatService);

    // Page load
    _oSettingsFacade.PageLoad($scope, xlatService, '');
   
    /// <summary>
    /// Load all settings event registration
    /// while end user press the settings menu, this event will invoke
    /// </summary>  
    $scope.ShowSettings = function () {
        var _oSettingsFacade = new SettingsFacade();
        _oSettingsFacade.ShowSettings($scope, '', xlatService);
    }


    /// <summary>
    /// Settings onchange event registration
    /// while end user changing the settings, this event will invoke
    /// </summary>
    /// <param name="SettingsObj">Selected setting info</param>
    $scope.SettingsOnChange = function (SettingsObj) {
        var _oSettingsFacade = new SettingsFacade();
        _oSettingsFacade.SettingsOnChange($scope, SettingsObj, xlatService, '', '', $location, $compile);
    };


    /// <summary>
    /// OnProbeChange event registration
    /// while end user changing probe, this event will invoke
    /// </summary>
    /// <param name="probeObj">Selected probe info</param>
    $scope.OnProbeChange = function (probeObj) {
        var _oSettingsFacade = new SettingsFacade();
        _oSettingsFacade.OnProbeChange($scope, probeObj, xlatService, '', '', $timeout);
    }

    $scope.OnNewProbeChange = function (probeObj) {
        var _oSettingsFacade = new SettingsFacade();
        _oSettingsFacade.OnNewProbeChange($scope, probeObj, xlatService, '', '', $timeout);
    }

    $scope.OnSelectVariable = function (variableObj) {
        if (variableObj.Id == 1)
            IsDataLogModeEnabled = variableObj.selected;
        else if (variableObj.Id == 2)
            IsDebugModeEnabled = variableObj.selected;
        else if (variableObj.Id == 3)
            IsInfoModeEnabled = variableObj.selected;
        else if (variableObj.Id == 4)
            IsWarnModeEnabled = variableObj.selected;
        else if (variableObj.Id == 5)
            IsFatalModeEnabled = variableObj.selected;

    }

    $scope.ResetPassword = function () {
        var _oSettingsFacade = new SettingsFacade();
        _oSettingsFacade.ResetPassword($scope, xlatService, $location);
    }


    $scope.SubmitAutoManualPin = function (SettingsObj) {
  
        var _oSettingsFacade = new SettingsFacade();
        _oSettingsFacade.SubmitAutoManualPin($scope, xlatService, $location, SettingsObj);
    }

    $scope.OnShiftChange = function (ShiftObj) {
        var _oSettingsFacade = new SettingsFacade();
        _oSettingsFacade.OnShiftChange($scope, ShiftObj, xlatService, '', '', $timeout);
    }

    //$scope.probes = [
    //  { title: "Probe Name 1" },
    //  { title: "Probe Name 2" },
    //  { title: "Probe Name 3" },
    //  { title: "Probe Name 4" },
    //  { title: "Probe Name 5", selected: "true" }
    //];
 
    $scope.Settings = true;
    $scope.SettingsToolBar = false;
    $scope.BackVisible = false;
  
})


/// <summary>
/// Settings facade / Work flow / Assembler
/// </summary>
function SettingsFacade() {

    // SettingsFacade object
        OneViewConsole.Debug("SettingsFacade Start", "Facade.SettingsFacade");

        var MyInstance = this;
        
        // Vallidation list for LoadAllPairedDevices
        this.LoadAllPairedDevices_ClientValidatorConfigList = [{ 'IsDefaultClientValidator': true, 'IsCustomClientValidator': false, 'ClassName': 'BluetoothOnValidation' }];


        // Vallidation list for ChangeProbe 
        this.ChangeProbe_ClientValidatorConfigList = [];

        

        /// <summary>
        /// Initialize page   
        /// </summary>
        /// <param name="$scope">Current scope</param>  
        /// <param name="xlatService">xlatService for globalization</param>   
        this.Init = function ($scope, xlatService) {
            try {
                OneViewConsole.Debug("Init Start", "SettingsFacade.Init");
                // Registering page name for globalization
                // xlatService.setCurrentPage('Settings_Page');
                xlatService.setCurrentPage('8');
                document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

                OneViewConsole.Debug("Init End", "SettingsFacade.Init");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.Init", xlatService);
            }
        }

        /// <summary>
        /// PageLoad 
        /// </summary>
        /// <param name="$scope">Current scope</param>   
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="SpinService">SpinService for loader</param>
        this.PageLoad = function ($scope, xlatService, SpinService) {
            try {
                OneViewConsole.Debug("PageLoad Start", "SettingsFacade.PageLoad");

                var _oSettingsPresenter = new SettingsPresenter();
                _oSettingsPresenter.PageLoad($scope, xlatService);

                OneViewConsole.Debug("PageLoad End", "SettingsFacade.PageLoad");

            }
            catch (Excep) {           
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.PageLoad", xlatService);
            }
            finally {
                _oSettingsPresenter = null;
            }
        }

        /// <summary>
        /// Show all settings
        /// </summary>
        /// <param name="$scope">Current scope</param>   
        /// <param name="SpinService">SpinService for loader</param>
        this.ShowSettings = function ($scope, SpinService, xlatService) {
            try {
                OneViewConsole.Debug("ShowSettings Start", "SettingsFacade.ShowSettings");

                $scope.settingvisible = true;
                $scope.probevisible = false;
                $scope.LogsVisible = false;
                $scope.BackVisible = false;
                $scope.UpdatePassword = false;
                $scope.PasswordUpdateButton = false;
                $scope.ShiftsVisible = false;
                $scope.NewProbevisible = false;
                $scope.ShowAutoManualValidationPage = false;

                OneViewConsole.Debug("ShowSettings End", "SettingsFacade.ShowSettings");


            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.ShowSettings", xlatService);
            }
        }

        /// <summary>
        /// Load all paired devices on device
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="SettingsObj">Selected settingsObj info</param>
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="toaster">toaster for toast messages</param>
        /// <param name="SpinService">SpinService for loader</param>
        this.SettingsOnChange_OLD = function ($scope, SettingsObj, xlatService, toaster, SpinService) {
            try {
                OneViewConsole.Debug("SettingsOnChange Start", "SettingsFacade.SettingsOnChange");
                // If it is Probe Configuration
                if (SettingsObj.title == "Probe Configuration") {
                    LoadAllPairedDevices($scope, SettingsObj, xlatService, toaster, SpinService);
                }
                else if (SettingsObj.title == "Auto/Manual Temperature Configuration") {
                      
                    if (IsGlobalAutoTemperatureManualAllowed == true) {
                     
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('AutoManual_Confirm_Title'), xlatService.xlat('AutoManual_Confirm_Auto_Message'), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                IsGlobalAutoTemperatureManualAllowed = false;
                                SettingsObj.badgetxt = "Auto";
                                $scope.$apply();
                            }
                        });
                    }
                    else {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('AutoManual_Confirm_Title'), xlatService.xlat('AutoManual_Confirm_Manual_Message'), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                IsGlobalAutoTemperatureManualAllowed = true;
                                SettingsObj.badgetxt = "Manual";
                                $scope.$apply();
                            }
                        });                      
                    } 
                }
                else if (SettingsObj.title == "My Downloads : Cleaning View") {
                      
                    if (IsGlobalCleaningProfiledownloadView == true) {
                     
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox("Confirmation", "IN-NF-MSE-015 :: Are you sure you want to disable the my downloads cleaning view", function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                IsGlobalCleaningProfiledownloadView = false;
                                OneViewLocalStorage.Save("IsGlobalCleaningProfiledownloadView", false);
                                SettingsObj.badgetxt = "Disabled";
                                $scope.$apply();
                            }
                        });
                    }
                    else {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox("Confirmation", "IN-NF-MSE-016 :: Are you sure you want to enable the my downloads cleaning view", function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                IsGlobalCleaningProfiledownloadView = true;
                                OneViewLocalStorage.Save("IsGlobalCleaningProfiledownloadView", true);
                                SettingsObj.badgetxt = "Enabled";
                                $scope.$apply();
                            }
                        });                      
                    } 
                }   
                else if (SettingsObj.title == "Conflict Resolve Mode") {

                    if (OneViewGlobalConflictResolveMode == 1) {

                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox("Confirmation", "IN-NF-MSE-017 :: Are you sure you want to chane Conflict Resolve Mode to 'Use Server'", function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                OneViewGlobalConflictResolveMode = 2;
                                OneViewLocalStorage.Save("OneViewGlobalConflictResolveMode", 2);
                                SettingsObj.badgetxt = "Use Server";
                                $scope.$apply();
                            }
                        });
                    }
                    else {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox("Confirmation", "IN-NF-MSE-018 :: Are you sure you want to chane Conflict Resolve Mode to 'Use Mine'", function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                OneViewGlobalConflictResolveMode = 1;
                                OneViewLocalStorage.Save("OneViewGlobalConflictResolveMode", 1);
                                SettingsObj.badgetxt = "Use Mine";
                                $scope.$apply();
                            }
                        });
                    }
                }
                else if (SettingsObj.title == "Restore DB") {

                    var Message = "IN-MG-MSE-004 :: Are you sure want to restore the DB ?";
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.RestoreDb();

                        var _DcPendingTaskBO = new DcPendingTaskBO();
                        _DcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

                        alert('IN-SU-MSE-002 :: DB Restored successfully');
                    }
                }
                else if (SettingsObj.title == "Copy DB") {

                    var Message = "IN-MG-MSE-005 :: Are you sure want to copy the DB ?";
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.CopyDb();
                        alert('IN-SU-MSE-003 :: DB Copied successfully');
                    }
                }

                else if (SettingsObj.title == "Upload DB") {

                    var Message = "IN-MG-MSE-006 :: Are you sure want to upload the DB ?";
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.UploadDb();
                        //alert('IN-SU-MSE-004 :: DB ulpoaded successfully');
                    }
                }

                else if (SettingsObj.title == "Upload Logs") {

                    var Message = "IN-MG-MSE-007 :: Are you sure want to upload the Logs ?";
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.UploadLogs();
                        //alert('IN-SU-MSE-005 :: Logs ulpoaded successfully');
                    }
                }

                else if (SettingsObj.title == "ClearAll DC And Actions") {

                    var Message = "IN-MG-MSE-008 :: Are you sure want to clear all DC and Actions ?";
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.ClearAllDCAndActions();

                        var _DcPendingTaskBO = new DcPendingTaskBO();
                        _DcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

                        alert('IN-SU-MSE-006 :: Cleared successfully');
                    }
                }

                else if (SettingsObj.title == "Clean DB") {

                    var Message = "IN-MG-MSE-009 :: Are you sure want to clean the DB ?";
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.CleanDb();

                        var _DcPendingTaskBO = new DcPendingTaskBO();
                        _DcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

                        oOneViewAppInfoPlugin.ClearCacheFiles();

                        alert('IN-SU-MSE-007 :: DB Cleaned successfully');
                    }
                }

                else if (SettingsObj.title == "Enable Logs") {
                    LoadAllLogVariables($scope, SettingsObj, xlatService, toaster);
                }

                else if (SettingsObj.title == "Refresh") {

                    var Message = "IN-MG-MSE-010 :: You might lose all your data capture on clicking ok. Please upload before upgrade. Are you sure want to refresh ?";
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        oOneViewProgressbar.Start("Refreshing WiNAiM Updates");

                        var _oDbStructureController = new DbStructureController();
                        _oDbStructureController.ReCreate();

                        var _DcPendingTaskBO = new DcPendingTaskBO();
                        _DcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

                        oOneViewAppInfoPlugin.ClearCacheFiles();

                        oOneViewProgressbar.SetProgressValue(25);

                        var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(xlatService);
                        var GlobalizationMetdataSuccess = _oGlobalizationMetadataBO.DownloadPageWiseMetadata(true);
                      
                        if (GlobalizationMetdataSuccess == true) {

                            oOneViewProgressbar.SetProgressValue(50);
                            //GetMetadata for static pages from Db
                            var oGlobalizationComponent = new GlobalizationComponent();
                            var MetaDataList = oGlobalizationComponent.LoadLocalizedMetadata(OneViewStaticPageList);

                            oOneViewProgressbar.SetProgressValue(75);

                            //Form metadata to required structure
                            oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, OneViewGlobalcurrentLanguage);

                            oOneViewProgressbar.SetProgressValue(100);

                            alert('IN-SU-MSE-011 :: Refreshed successfully');
                        }                      

                        oOneViewProgressbar.Stop();                      
                    }
                }

                else if (SettingsObj.title == "Refresh Page Globalization") {

                    var Message = "IN-MG-MSE-012 :: Are you sure want to refresh Page Globalization ?";
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {
                        
                        oOneViewProgressbar.Start("Refreshing Page Globalization");
                        oOneViewProgressbar.SetProgressValue(25);

                        var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(xlatService);
                        var GlobalizationMetdataSuccess = _oGlobalizationMetadataBO.DownloadPageWiseMetadata(true);
                       
                        if (GlobalizationMetdataSuccess == true) {

                            oOneViewProgressbar.SetProgressValue(50);
                            //GetMetadata for static pages from Db
                            var oGlobalizationComponent = new GlobalizationComponent();
                            var MetaDataList = oGlobalizationComponent.LoadLocalizedMetadata(OneViewStaticPageList);

                            oOneViewProgressbar.SetProgressValue(75);

                            //Form metadata to required structure
                            oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, OneViewGlobalcurrentLanguage);

                            oOneViewProgressbar.SetProgressValue(100);
                            alert('IN-SU-MSE-013 :: Refreshed successfully');
                        }
                      
                        oOneViewProgressbar.Stop();
                    }
                }

                else if (SettingsObj.title == "Check For Updates") {

                    // Checking network availability
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                    OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "SettingsFacade.SettingsOnChange");

                    // If network is available
                    if (NetworkDetails.IsNetworkAvailable == true) {
                       
                        var _oOneViewAppConfig = new OneViewAppConfig();
                        _oOneViewAppConfig.CheckForNewUpdates(toaster, true);
                    }
                    else {
                        alert(xlatService.xlat('NoInternetConnection'));
                       // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                        OneViewConsole.Info("No Internet Connection", "SettingsFacade.SettingsOnChange");
                    }
                }

                else if (SettingsObj.title == "Reset Password") {

                    // Checking network availability
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                        OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "SettingsFacade.SettingsOnChange");

                    // If network is available
                        if (NetworkDetails.IsNetworkAvailable == true) {

                            $scope.OldPassword = "";
                            $scope.NewPassword = "";
                            $scope.ConfirmPassword = "";
                       
                            $scope.settingvisible = false;
                            $scope.probevisible = false;
                            $scope.BackVisible = true;
                            $scope.UpdatePassword = true;
                            $scope.PasswordUpdateButton = true;

                            $scope.ShiftsVisible = false;
                        }
                        else {
                            alert(xlatService.xlat('NoInternetConnection'));
                            // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                            OneViewConsole.Info("No Internet Connection", "SettingsFacade.SettingsOnChange");
                        }
                    }


                OneViewConsole.Debug("SettingsOnChange End", "SettingsFacade.SettingsOnChange");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.SettingsOnChange", xlatService);
            }
            finally {
                oOneViewCordovaPlugin = null;
                Message = null;
                IsSuccess = null;
                oDbStructureController = null;
                NetworkDetails = null;
            }
        }


        this.SettingsOnChange = function ($scope, SettingsObj, xlatService, toaster, SpinService, $location, $compile) {
            try {
                OneViewConsole.Debug("SettingsOnChange Start", "SettingsFacade.SettingsOnChange");
                // If it is Probe Configuration
                //if (SettingsObj.title == "Probe Synchronize") {
                
                var _StateManagementComponent = new StateManagementComponent(xlatService);

                if (SettingsObj.Id == "Setting_ProbeConfiguration_ProbeSynchronize") {
                    IsGlobalBlueThermLiveTemperatureIndicatorEnabled = true;
                    MyInstance.EnableDisableBlueThermTemperatureIndicator("Enabled", "");
                    LoadAllPairedDevices($scope, SettingsObj, xlatService, toaster, SpinService);
                }
                //else if (SettingsObj.title == "Temperature Reading") {
                else if (SettingsObj.Id == "Setting_ProbeConfiguration_TemperatureReading") {

                    //if (IsGlobalAutoTemperatureManualAllowed == true) {

                    //    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    //    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('AutoManual_Confirm_Title'), xlatService.xlat('AutoManual_Confirm_Auto_Message'), function (ConfirmationId) {

                    //        if (ConfirmationId == "2") {
                    //            IsGlobalAutoTemperatureManualAllowed = false;
                    //            SettingsObj.badgetxt = "Auto";
                    //            if (document.getElementById('lblTempReading') != null) {
                    //                document.getElementById('lblTempReading').innerHTML = "Auto";
                    //            }
                                
                    //            if (document.getElementById('lblBlueThermStatus') != null) {
                    //                document.getElementById('lblBlueThermStatus').className = "balanced";
                    //                document.getElementById('lblBlueThermStatus').innerHTML = xlatService.xlat('Auto');
                    //            }
                    //            $scope.$apply();
                    //        }
                    //    });
                    //}
                    //else {
                    //    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    //    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('AutoManual_Confirm_Title'), xlatService.xlat('AutoManual_Confirm_Manual_Message'), function (ConfirmationId) {

                    //        if (ConfirmationId == "2") {
                    //            IsGlobalAutoTemperatureManualAllowed = true;
                    //            SettingsObj.badgetxt = "Manual";
                    //            if (document.getElementById('lblTempReading') != null) {
                    //                document.getElementById('lblTempReading').innerHTML = "Manual";
                    //            }
                    //            if (document.getElementById('lblBlueThermStatus') != null) {
                    //                document.getElementById('lblBlueThermStatus').className = "assertive";
                    //                document.getElementById('lblBlueThermStatus').innerHTML = xlatService.xlat('Manual');
                    //            }
                    //            $scope.$apply();
                    //        }
                    //    });
                    //}
                    AutoManualstatusCallEvent($scope, SettingsObj, xlatService, toaster, SpinService, $location, $compile);
                }
                else if (SettingsObj.Id == "Setting_ProbeConfiguration_NewProbeSynchronize") {

                    var oDefaultValidationResponse = new DefaultValidationResponse();
                    var _oBluetoothOnValidation = new BluetoothOnValidation();
                    oDefaultValidationResponse = _oBluetoothOnValidation.Validate($scope, xlatService);
                   // alert(JSON.stringify(oDefaultValidationResponse));
             
                    if (oDefaultValidationResponse.IsSuccess == true) {
                        var _oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
                        var ProbeDetails = _oOneViewAppInfoPlugin.Scan();

                        if (ProbeDetails != undefined && ProbeDetails != null && ProbeDetails != "") {

                            LoadNewPairedProbeDevices($scope, SettingsObj, xlatService, ProbeDetails);
                        }
                        else {
                            alert(xlatService.xlat("Device Sync failed, Please check App permissions and Bluetooth status"));
                        }
                    }
                    else {
                        alert(xlatService.xlat(oDefaultValidationResponse.MessageKey));
                    }

                }
                //else if (SettingsObj.title == "My Downloads : Cleaning View") {
                else if (SettingsObj.Id == "Setting_Download_CleaningView") {

                    if (IsGlobalCleaningProfiledownloadView == true) {

                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox( xlatService.xlat( "Confirmation"), xlatService.xlat( "IN-NF-MSE-015 :: Are you sure you want to disable the my downloads cleaning view"), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                IsGlobalCleaningProfiledownloadView = false;
                                OneViewLocalStorage.Save("IsGlobalCleaningProfiledownloadView", false);
                                SettingsObj.badgetxt = "Disabled";
                                if (document.getElementById('lblMyDownLoadView') != null) {
                                    document.getElementById('lblMyDownLoadView').innerHTML = "Disabled";
                                }
                                $scope.$apply();
                            }
                        });
                    }
                    else {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox( xlatService.xlat( "Confirmation"),  xlatService.xlat("IN-NF-MSE-016 :: Are you sure you want to enable the my downloads cleaning view"), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                IsGlobalCleaningProfiledownloadView = true;
                                OneViewLocalStorage.Save("IsGlobalCleaningProfiledownloadView", true);
                                SettingsObj.badgetxt = "Enabled";
                                if (document.getElementById('lblMyDownLoadView') != null) {
                                    document.getElementById('lblMyDownLoadView').innerHTML = "Enabled";
                                }
                                $scope.$apply();
                            }
                        });
                    }
                }
                //else if (SettingsObj.title == "Conflict Resolve Mode") {
                else if (SettingsObj.Id == "Setting_Application_ConflictResolveMode") {

                    if (OneViewGlobalConflictResolveMode == 1) {

                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('IN-NF-MSE-017 :: Are you sure you want to change Conflict Resolve Mode to Use Server'), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                OneViewGlobalConflictResolveMode = 2;
                                OneViewLocalStorage.Save("OneViewGlobalConflictResolveMode", 2);
                                SettingsObj.badgetxt = "Use Server";
                                if (document.getElementById('lblResolveMode') != null) {
                                    document.getElementById('lblResolveMode').innerHTML = xlatService.xlat('Use Server');
                                }                                
                                $scope.$apply();
                            }
                        });
                    }
                    else {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('IN-NF-MSE-018 :: Are you sure you want to change Conflict Resolve Mode to Use Mine'), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                OneViewGlobalConflictResolveMode = 1;
                                OneViewLocalStorage.Save("OneViewGlobalConflictResolveMode", 1);
                                SettingsObj.badgetxt = "Use Mine";
                                if (document.getElementById('lblResolveMode') != null) {
                                    document.getElementById('lblResolveMode').innerHTML = xlatService.xlat('Use Mine');
                                }                                
                                $scope.$apply();
                            }
                        });
                    }
                }                    
                else if (SettingsObj.Id == "Setting_Application_GlobalOVGuidChecking") {

                    if (IsGlobalOVGuidCheckingEnabled == true) {

                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('IN-NF-MSE-019 :: Are you sure you want to disable the Oneview Version Conflict'), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                IsGlobalOVGuidCheckingEnabled = false;
                                OneViewLocalStorage.Save("IsGlobalOVGuidCheckingEnabled", false);
                                SettingsObj.badgetxt = "Disabled";
                                if (document.getElementById('lblGlobalOVGuidChecking') != null) {
                                    document.getElementById('lblGlobalOVGuidChecking').innerHTML = xlatService.xlat('Disabled');
                                }
                                $scope.$apply();
                            }
                        });
                    }
                    else {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('IN-NF-MSE-020 :: Are you sure you want to enable the Oneview Version Conflict'), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                IsGlobalOVGuidCheckingEnabled = true;
                                OneViewLocalStorage.Save("IsGlobalOVGuidCheckingEnabled", true);
                                SettingsObj.badgetxt = "Enabled";
                                if (document.getElementById('lblGlobalOVGuidChecking') != null) {
                                    document.getElementById('lblGlobalOVGuidChecking').innerHTML = xlatService.xlat('Enabled');
                                }
                                $scope.$apply();
                            }
                        });
                    }
                }
                //else if (SettingsObj.title == "Restore DB") {
                else if (SettingsObj.Id == "Setting_DB_RestoreDB") {

                    var Message = xlatService.xlat('IN-MG-MSE-004 :: Are you sure want to restore the DB ?');
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.RestoreDb();

                        var _DcPendingTaskBO = new DcPendingTaskBO();
                        _DcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

                        alert(xlatService.xlat('IN-SU-MSE-002 :: DB Restored successfully'));
                    }
                }
                //else if (SettingsObj.title == "Copy DB") {
                else if (SettingsObj.Id == "Setting_DB_CopyDB") {

                    var Message = xlatService.xlat('IN-MG-MSE-005 :: Are you sure want to copy the DB ?');
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.CopyDb();
                        alert(xlatService.xlat('IN-SU-MSE-003 :: DB Copied successfully'));
                    }
                }

                //else if (SettingsObj.title == "Upload DB") {
                else if (SettingsObj.Id == "Setting_DB_UploadDB") {

                    var Message = xlatService.xlat('IN-MG-MSE-006 :: Are you sure want to upload the DB ?');
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.UploadDb();
                        //alert('IN-SU-MSE-004 :: DB ulpoaded successfully');
                    }
                }

                //else if (SettingsObj.title == "Upload Logs") {
                else if (SettingsObj.Id == "Setting_Log_UploadLogs") {

                    var Message = xlatService.xlat('IN-MG-MSE-007 :: Are you sure want to upload the Logs ?');
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.UploadLogs();
                        //alert('IN-SU-MSE-005 :: Logs ulpoaded successfully');
                    }
                }

                //else if (SettingsObj.title == "ClearAll DC And Actions") {
                else if (SettingsObj.Id == "Setting_DB_CleanDCActions") {

                    var Message = xlatService.xlat('IN-MG-MSE-008 :: Are you sure want to clear all DC and Actions ?');
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.ClearAllDCAndActions();

                        var _DcPendingTaskBO = new DcPendingTaskBO();
                        _DcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

                        alert(xlatService.xlat('IN-SU-MSE-006 :: Cleared successfully'));
                    }
                }

                //else if (SettingsObj.title == "Clean DB") {
                else if (SettingsObj.Id == "Setting_DB_CleanDB") {

                    var Message = xlatService.xlat('IN-MG-MSE-009 :: Are you sure want to clean the DB ?');
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var _oDefaultMasterDAO = new DefaultMasterDAO("MultiMediaSubElements");
                        var MultiMediaSubElementsLst = _oDefaultMasterDAO.GetAllMasters();

                        for (var i = 0; i < MultiMediaSubElementsLst.length; i++) {
                            var oFile = MultiMediaSubElementsLst[i].LocalURL.substring(7).split('/');
                            var FileName = oFile[oFile.length - 1];                            
                            oOneViewAppInfoPlugin.ClearCacheFilesByName(FileName);
                        }

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.CleanDb();

                        var _DcPendingTaskBO = new DcPendingTaskBO();
                        _DcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

                        //oOneViewAppInfoPlugin.ClearCacheFiles();

                        alert(xlatService.xlat('IN-SU-MSE-007 :: DB Cleaned successfully'));
                    }
                }

                //else if (SettingsObj.title == "Enable Logs") {
                else if (SettingsObj.Id == "Setting_Log_EnableLogs") {
                    LoadAllLogVariables($scope, SettingsObj, xlatService, toaster);
                }

                //else if (SettingsObj.title == "Refresh") {
                else if (SettingsObj.Id == "Setting_Application_Refresh") {

                    var Message = xlatService.xlat("IN-MG-MSE-010 :: You might lose all your data capture on clicking ok. Please upload before upgrade. Are you sure want to refresh ?");
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        oOneViewProgressbar.Start( xlatService.xlat( "Refreshing WiNAiM Updates"));

                        var _oDefaultMasterDAO = new DefaultMasterDAO("MultiMediaSubElements");
                        var MultiMediaSubElementsLst = _oDefaultMasterDAO.GetAllMasters();

                        for (var i = 0; i < MultiMediaSubElementsLst.length; i++) {
                            var oFile = MultiMediaSubElementsLst[i].LocalURL.substring(7).split('/');
                            var FileName = oFile[oFile.length - 1];                            
                            oOneViewAppInfoPlugin.ClearCacheFilesByName(FileName);
                        }

                        var _oDbStructureController = new DbStructureController();
                        _oDbStructureController.ReCreate();

                        var _DcPendingTaskBO = new DcPendingTaskBO();
                        _DcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

                        //oOneViewAppInfoPlugin.ClearCacheFiles();

                        oOneViewProgressbar.SetProgressValue(25);

                        var PageIds = [];
                        var _oDefaultPageConfigMetaDataBO = new DefaultPageConfigMetaDataBO(xlatService);
                        var IsPageConfigMetaDataSuccess = _oDefaultPageConfigMetaDataBO.Download(PageIds);

                        if (IsPageConfigMetaDataSuccess == true) {

                            var _oACLConfigMetaDataBO = new ACLConfigMetaDataBO(xlatService);
                            var IsACLConfigMetaDataSuccess = _oACLConfigMetaDataBO.Download();

                            if (IsACLConfigMetaDataSuccess == true) {

                                var _oMenuConfigMetaDataBO = new MenuConfigMetaDataBO(xlatService);
                                var MenuConfigMetaDataSuccess = _oMenuConfigMetaDataBO.Download();

                                if (MenuConfigMetaDataSuccess == true) {

                                    var _oRouterConfigMetaDataBO = new RouterConfigMetaDataBO(xlatService);
                                    var RouterConfigMetaDatasuccess = _oRouterConfigMetaDataBO.Download();
                                }
                            }
                        }

                        // Resetting Band, TemplateMetada, and DAT Entities
                        var _RefreshMetadataHandler = new RefreshMetadataHandler(xlatService);
                        _RefreshMetadataHandler.Refresh();

                        var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(xlatService);
                        var GlobalizationMetdataSuccess = _oGlobalizationMetadataBO.DownloadPageWiseMetadata(true);

                        if (GlobalizationMetdataSuccess == true) {

                            oOneViewProgressbar.SetProgressValue(50);
                            //GetMetadata for static pages from Db
                            var oGlobalizationComponent = new GlobalizationComponent();
                            var MetaDataList = oGlobalizationComponent.LoadLocalizedMetadata(OneViewStaticPageList);

                            oOneViewProgressbar.SetProgressValue(75);

                            //Form metadata to required structure
                            oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, OneViewGlobalcurrentLanguage);

                            // Router Resetting
                            var _oOneViewRouterComponet = new OneViewRouterComponet();
                            _oOneViewRouterComponet.ResetRouter();

                            // Menu Loading
                            var _oDefaultMenuComponent = new DefaultMenuComponent();
                            _oDefaultMenuComponent.ResetMenu($scope, $compile);
                            
                            var _oDefaultMasterDAO = new DefaultMasterDAO("BusinessEventEntity");
                            var IsExist = _oDefaultMasterDAO.IsTableExist();

                            if (IsExist == true) {
                                OneViewLocalStorage.Remove("AutoDownloadMetadataForBE");
                                var _oMobileAutoSyncMetadataDownloadBO = new MobileAutoSyncMetadataDownloadBO(xlatService);
                                //var _IsExistMobileAutoSyncMetadata = _oMobileAutoSyncMetadataDownloadBO.IsExistMobileAutoSyncMetadata();
                                //if (_IsExistMobileAutoSyncMetadata == false) {
                                var MobileAutoSyncMetadatasuccess = _oMobileAutoSyncMetadataDownloadBO.Download();
                                var _oBusinessEventFramework = new BusinessEventFramework();
                                _oBusinessEventFramework.GenerateAutoDownloadMetadataForBE();
                                //}
                            }

                            oOneViewProgressbar.SetProgressValue(100);

                            alert(xlatService.xlat('IN-SU-MSE-011 :: Refreshed successfully'));
                        }

                        oOneViewProgressbar.Stop();
                    }
                }

                //else if (SettingsObj.title == "RefreshTab") {
                else if (SettingsObj.Id == "Setting_Application_RefreshTab") {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                    OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "SettingsFacade.SettingsOnChange");

                    // If network is available
                    if (NetworkDetails.IsNetworkAvailable == true) {
                        var Message = xlatService.xlat("IN-MG-MSE-010 :: You might lose all your data capture on clicking ok. Please upload before upgrade. Are you sure want to refresh tab ?");
                        var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                        if (IsSuccess == true) {

                            oOneViewProgressbar.Start(xlatService.xlat("Refreshing WiNAiM Updates"));

                            oOneViewProgressbar.SetProgressValue(25);

                            var _oCloudManagerBO = new CloudManagerBO(xlatService);
                            var ServicesIds = _oCloudManagerBO.GetAllServicesIds();

                            oOneViewProgressbar.SetProgressValue(50);

                            for (var k = 0; k < ServicesIds.length; k++) {

                                OneViewSessionStorage.Save("ServiceId", ServicesIds[k]);
                                _oCloudManagerBO.InitializeDBContext(ServicesIds[k]);

                                var _oDefaultMasterDAO = new DefaultMasterDAO("MultiMediaSubElements");
                                var MultiMediaSubElementsLst = _oDefaultMasterDAO.GetAllMasters();

                                for (var i = 0; i < MultiMediaSubElementsLst.length; i++) {
                                    var oFile = MultiMediaSubElementsLst[i].LocalURL.substring(7).split('/');
                                    var FileName = oFile[oFile.length - 1];
                                    oOneViewAppInfoPlugin.ClearCacheFilesByName(FileName);
                                }

                                var _oDbStructureController = new DbStructureController();
                                _oDbStructureController.ReCreate();

                                var _DcPendingTaskBO = new DcPendingTaskBO();
                                _DcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

                                var PageIds = [];
                                var _oDefaultPageConfigMetaDataBO = new DefaultPageConfigMetaDataBO(xlatService);
                                var IsPageConfigMetaDataSuccess = _oDefaultPageConfigMetaDataBO.Download(PageIds);

                                if (IsPageConfigMetaDataSuccess == true) {

                                    var _oACLConfigMetaDataBO = new ACLConfigMetaDataBO(xlatService);
                                    var IsACLConfigMetaDataSuccess = _oACLConfigMetaDataBO.Download();

                                    if (IsACLConfigMetaDataSuccess == true) {

                                        var _oMenuConfigMetaDataBO = new MenuConfigMetaDataBO(xlatService);
                                        var MenuConfigMetaDataSuccess = _oMenuConfigMetaDataBO.Download();

                                        if (MenuConfigMetaDataSuccess == true) {

                                            var _oRouterConfigMetaDataBO = new RouterConfigMetaDataBO(xlatService);
                                            var RouterConfigMetaDatasuccess = _oRouterConfigMetaDataBO.Download();

                                        }
                                    }
                                }

                                var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(xlatService);
                                var GlobalizationMetdataSuccess = _oGlobalizationMetadataBO.DownloadPageWiseMetadata(true);

                                var _oDefaultMasterDAO = new DefaultMasterDAO("BusinessEventEntity");
                                var IsExist = _oDefaultMasterDAO.IsTableExist();

                                if (IsExist == true) {
                                    OneViewLocalStorage.Remove("AutoDownloadMetadataForBE");
                                    var _oMobileAutoSyncMetadataDownloadBO = new MobileAutoSyncMetadataDownloadBO(xlatService);
                                    //var _IsExistMobileAutoSyncMetadata = _oMobileAutoSyncMetadataDownloadBO.IsExistMobileAutoSyncMetadata();
                                    //if (_IsExistMobileAutoSyncMetadata == false) {
                                        var MobileAutoSyncMetadatasuccess = _oMobileAutoSyncMetadataDownloadBO.Download();
                                        var _oBusinessEventFramework = new BusinessEventFramework();
                                        _oBusinessEventFramework.GenerateAutoDownloadMetadataForBE();
                                    //}
                                }
                            }

                            OneViewLocalStorage.Remove("AccessTokenId");

                            oOneViewProgressbar.SetProgressValue(100);

                            alert(xlatService.xlat('IN-SU-MSE-011 :: Refreshed successfully. Please login to Continue.'));
                            $location.url('/login');

                            OneViewSessionStorage.Clear();
                            ClearGlobalVariable();

                            oOneViewProgressbar.Stop();
                        }
                    }
                    else {
                        alert(xlatService.xlat('NoInternetConnection'));
                        OneViewConsole.Info("No Internet Connection", "SettingsFacade.SettingsOnChange");
                    }
                }

                //else if (SettingsObj.title == "Refresh Page Globalization") {
                else if (SettingsObj.Id == "Setting_Application_RefreshGlobalization") {

                    var Message = xlatService.xlat("IN-MG-MSE-012 :: Are you sure want to refresh Page Globalization ?");
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        oOneViewProgressbar.Start(xlatService.xlat("Refreshing Page Globalization"));
                        oOneViewProgressbar.SetProgressValue(25);

                        var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(xlatService);
                        var GlobalizationMetdataSuccess = _oGlobalizationMetadataBO.DownloadPageWiseMetadata(true);

                        if (GlobalizationMetdataSuccess == true) {

                            oOneViewProgressbar.SetProgressValue(50);
                            //GetMetadata for static pages from Db
                            var oGlobalizationComponent = new GlobalizationComponent();
                            var MetaDataList = oGlobalizationComponent.LoadLocalizedMetadata(OneViewStaticPageList);

                            oOneViewProgressbar.SetProgressValue(75);

                            //Form metadata to required structure
                            oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, OneViewGlobalcurrentLanguage);

                            oOneViewProgressbar.SetProgressValue(100);
                            alert(xlatService.xlat('IN-SU-MSE-013 :: Refreshed successfully'));
                        }

                        oOneViewProgressbar.Stop();
                    }
                }

                else if (SettingsObj.Id == "Setting_Application_RefreshCloudManager") {

                    // Checking network availability
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                    OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "SettingsFacade.SettingsOnChange");

                    // If network is available
                    if (NetworkDetails.IsNetworkAvailable == true) {

                        var Message = xlatService.xlat("IN-MG-MSE-014 :: Are you sure want to refresh Cloud Manager ?");
                        var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                        if (IsSuccess == true) {

                            var _SettingsBO = new SettingsBO();
                            var RefreshCloudManagerIsSuccess = _SettingsBO.RefreshCloudManagerBO(xlatService);

                            if (RefreshCloudManagerIsSuccess == true) {
                                alert(xlatService.xlat('IN-SU-MSE-015 :: Refreshed successfully.Please login to Continue.'));
                                $location.url('/login');

                                OneViewSessionStorage.Clear();
                                ClearGlobalVariable();
                            }

                        }
                    }
                    else {
                        alert(xlatService.xlat('NoInternetConnection'));
                        OneViewConsole.Info("No Internet Connection", "SettingsFacade.SettingsOnChange");
                    }
                }

                else if (SettingsObj.Id == "Setting_Application_RefreshMetadataConfiguration") {

                    // Checking network availability
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                    OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "SettingsFacade.SettingsOnChange");                

                    // If network is available
                    if (NetworkDetails.IsNetworkAvailable == true) {

                        var Message = xlatService.xlat("IN-MG-MSE-016 :: Are you sure want to refresh Configuration ?");
                        var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                        if (IsSuccess == true) {                           

                            var _SettingsBO = new SettingsBO();
                            var RefreshMetadataIsSuccess = _SettingsBO.RefreshMetadataConfigurationBO(xlatService,$scope, $compile);

                            if (RefreshMetadataIsSuccess == true) {
                                alert(xlatService.xlat('IN-SU-MSE-017 :: Refreshed successfully'));
                            }                         
                           
                        }
                    }
                    else {
                        alert(xlatService.xlat('NoInternetConnection'));                      
                        OneViewConsole.Info("No Internet Connection", "SettingsFacade.SettingsOnChange");
                    }
                }
                else if (SettingsObj.Id == "Setting_Application_RefreshDATEntityTypes") {

                    // Checking network availability
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                    OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "SettingsFacade.SettingsOnChange");

                    // If network is available
                    if (NetworkDetails.IsNetworkAvailable == true) {

                        var Message = xlatService.xlat("IN-MG-MSE-016 :: Are you sure want to refresh DATEntity Types ?");
                        var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                        if (IsSuccess == true) {

                            var _SettingsBO = new SettingsBO();
                            var RefreshMetadataIsSuccess = _SettingsBO.RefreshDATEntityTypesBO(xlatService, $scope, $compile);

                            if (RefreshMetadataIsSuccess == true) {
                                alert(xlatService.xlat('IN-SU-MSE-017 :: Refreshed successfully'));
                            }

                        }
                    }
                    else {
                        alert(xlatService.xlat('NoInternetConnection'));
                        OneViewConsole.Info("No Internet Connection", "SettingsFacade.SettingsOnChange");
                    }
                }

                else if (SettingsObj.Id == "Setting_Application_RefreshDcCustomHtml") {

                    // Checking network availability
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                    OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "SettingsFacade.SettingsOnChange");

                    // If network is available
                    if (NetworkDetails.IsNetworkAvailable == true) {

                        var Message = xlatService.xlat("IN-MG-MSE-016 :: Are you sure want to refresh DC Custom Html ?");
                        var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                        if (IsSuccess == true) {

                            oOneViewProgressbar.Start(xlatService.xlat("Refreshing DC Custom Html"));
                            oOneViewProgressbar.SetProgressValue(25);

                            var FilterParams = {
                                OSGuid: OneViewSessionStorage.Get("ServiceId"),
                                UserId: OneViewSessionStorage.Get("LoginUserId"),
                                TemplateId: [],
                                FromDate: '',
                                ToDate: '',
                                DcPlaceDimension: 0,
                                DcPlaceIds: [],
                                IsDCPlaceGroup: false,
                                IsTemplateGroup: false,
                                DCPlaceRCOType: -1
                            }

                            var _oDcProfileDAO = new DcProfileDAO();
                            var Result = _oDcProfileDAO.GetAllTemplatesByServiceAndUserId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

                            for (var i = 0; i < Result.length; i++) {
                                FilterParams.TemplateId.push(Result[i].TemplateNodeId);
                            }

                            oOneViewProgressbar.SetProgressValue(50);

                            var _oProfileDownloadFacade = new ProfileDownloadFacade();
                            var RefreshDcCustomHtmlSuccess = _oProfileDownloadFacade.DownloadDcCustomPageHtml(FilterParams, IsDevPageTestEnable);

                            oOneViewProgressbar.SetProgressValue(100);

                            if (RefreshDcCustomHtmlSuccess == true) {
                                alert(xlatService.xlat('IN-SU-MSE-019 :: Refreshed successfully'));
                            }

                            oOneViewProgressbar.Stop();
                        }
                    }
                    else {
                        alert(xlatService.xlat('NoInternetConnection'));
                        OneViewConsole.Info("No Internet Connection", "SettingsFacade.SettingsOnChange");
                    }
                }

                //else if (SettingsObj.title == "Check For Updates") {
                else if (SettingsObj.Id == "Setting_Application_CheckUpdates") {

                    //// Checking network availability
                    //var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    //var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                    //OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "SettingsFacade.SettingsOnChange");

                    //// If network is available
                    //if (NetworkDetails.IsNetworkAvailable == true) {

                    //    var _oOneViewAppConfig = new OneViewAppConfig();
                    //    _oOneViewAppConfig.CheckForNewUpdates(toaster, true);
                    //}
                    //else {
                    //    alert(xlatService.xlat('NoInternetConnection'));
                    //    // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                    //    OneViewConsole.Info("No Internet Connection", "SettingsFacade.SettingsOnChange");
                    //}
                    MyInstance.GoToAPKUpgradeProcess($location,xlatService);
                }

                //else if (SettingsObj.title == "Change Password") {
                else if (SettingsObj.Id == "Setting_Profile_ChangePassword") {

                    // Checking network availability
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                    OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "SettingsFacade.SettingsOnChange");

                    // If network is available
                    if (NetworkDetails.IsNetworkAvailable == true) {

                        $scope.OldPassword = "";
                        $scope.NewPassword = "";
                        $scope.ConfirmPassword = "";

                        $scope.settingvisible = false;
                        $scope.probevisible = false;
                        $scope.BackVisible = true;
                        $scope.SettingsToolBar = true;

                        $scope.UpdatePassword = true;
                        $scope.PasswordUpdateButton = true;

                        $scope.ShiftsVisible = false;
                    }
                    else {
                        alert(xlatService.xlat('NoInternetConnection'));
                        // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                        OneViewConsole.Info("No Internet Connection", "SettingsFacade.SettingsOnChange");
                    }
                }

                else if (SettingsObj.Id == "Setting_StateManagement_NewDc") {
                    _StateManagementComponent.GetAndUpdatePageState(SettingsObj.Id);
                }

                else if (SettingsObj.Id == "Setting_ProbeConfiguration_TempIndicator") {
                    MyInstance.GetBlueThermTemperatureIndicator(xlatService);
                }

                else if (SettingsObj.Id == "Setting_NewDcDateSelectionEnable_DcStartDate") {
                    MyInstance.EnableOrDisableNewDcPageDcStartDateSelection(xlatService, SettingsObj);
                }
                else if (SettingsObj.Id == "Setting_Application_AutoUpload") {
                    MyInstance.EnableOrDisableAutoUpload(xlatService, SettingsObj);
                }
                else if (SettingsObj.Id == "Setting_Application_AutoProfileDownload") {
                    MyInstance.EnableOrDisableAutoProfileDownload(xlatService, SettingsObj);
                }
                else if (SettingsObj.Id == "Setting_Application_AutoActionFollowupDownload") {
                    MyInstance.EnableOrDisableAutoActionFollowupDownload(xlatService, SettingsObj);
                }
                else if (SettingsObj.Id == "Setting_AutoSync_StartSync") {
                    MyInstance.SyncServiceOperations($scope, SettingsObj, xlatService);
                }
                else if (SettingsObj.Id == "Setting_AutoMasterMetadataDownload") {
                    MyInstance.AutoMasterMetadataDownload($scope, SettingsObj, xlatService);
                }
                else if (SettingsObj.Id == "Setting_Application_GeoLocationValidation") {
                    MyInstance.EnableOrDisableGeoLocationValidation(xlatService, SettingsObj);
                }
                else if (SettingsObj.Id == "Setting_Application_Landingpagedailysync") {
                    MyInstance.EnableOrDisableLandingpagedailysync(xlatService, SettingsObj);
                }
                else if (SettingsObj.Id == "Setting_DB_UploadImagesAndDbAcrossService") {

                    var Message = xlatService.xlat('IN-MG-MSE-006 :: Are you sure want to upload the images and DB for all services ?');
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        var oDbStructureController = new DbStructureController();
                        oDbStructureController.UploadImagesAndDbAcrossService(xlatService);
                        
                    }
                }
                else if (SettingsObj.Id == "Setting_MobileAutoSync_Sync") {
                    MyInstance.EnableOrDisableMobileAutoSync(xlatService, SettingsObj);
                }
                else if (SettingsObj.Id == "Setting_MobileAutoSync_Refresh") {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                    OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "SettingsFacade.SettingsOnChange");

                    // If network is available
                    if (NetworkDetails.IsNetworkAvailable == true) {
                        var Message = xlatService.xlat('IN-MG-MSE-006 :: Are you sure want to Refresh Mobile Auto Sync Metadata ?');
                        var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                        if (IsSuccess == true) {

                            var _SettingsBO = new SettingsBO();
                            var RefreshMetadataIsSuccess = _SettingsBO.RefreshMobileAutoSyncMetadata(xlatService);

                            if (RefreshMetadataIsSuccess == true) {
                                alert(xlatService.xlat('IN-SU-MSE-021 ::Mobile Auto Sync Metadata Refreshed successfully'));
                            }

                        }
                    }
                    else {
                        alert(xlatService.xlat('NoInternetConnection'));
                        OneViewConsole.Info("No Internet Connection", "DasboardFacade.DownLoadProfile");
                    }
                }
                if (SettingsObj.Id == "Setting_ShiftSelection") {
                    MyInstance.LoadAllValidShifts($scope, SettingsObj, xlatService);
                }

               

                OneViewConsole.Debug("SettingsOnChange End", "SettingsFacade.SettingsOnChange");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.SettingsOnChange", xlatService);
            }
            finally {
                oOneViewCordovaPlugin = null;
                Message = null;
                IsSuccess = null;
                oDbStructureController = null;
                NetworkDetails = null;
            }
        }     


        var HideSubHtmlDivs = function ($scope) {
            try {
                OneViewConsole.Debug("HideSubHtmlDivs Start", "SettingsFacade.HideSubHtmlDivs");

                $scope.probevisible = false;
                $scope.LogsVisible = false;
                $scope.BackVisible = false;
                $scope.UpdatePassword = false;
                $scope.PasswordUpdateButton = false;
                $scope.ShiftsVisible = false;
                $scope.NewProbevisible = false;
                $scope.ShowAutoManualValidationPage = false;

                OneViewConsole.Debug("HideSubHtmlDivs End", "SettingsFacade.HideSubHtmlDivs");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.HideSubHtmlDivs", xlatService);
            }
        }


        this.GetBlueThermTemperatureIndicator = function (xlatService) {
            try {
                //alert('IsGlobalBlueThermLiveTemperatureIndicatorEnabled Selected index :' + IsGlobalBlueThermLiveTemperatureIndicatorEnabled);
                if (IsGlobalBlueThermLiveTemperatureIndicatorEnabled == true) {
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('AutoManual_Confirm_Title'), xlatService.xlat('DisableProbeIndicator'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            IsGlobalBlueThermLiveTemperatureIndicatorEnabled = false;
                            MyInstance.EnableDisableBlueThermTemperatureIndicator("Disabled", "none");
                            $scope.$apply();
                        }
                    });
                }
                else {
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('AutoManual_Confirm_Title'), xlatService.xlat('EnableProbeIndicator'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            IsGlobalBlueThermLiveTemperatureIndicatorEnabled = true;
                            MyInstance.EnableDisableBlueThermTemperatureIndicator("Enabled", "");
                            $scope.$apply();
                        }
                    });

                }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.GetBlueThermTemperatureIndicator", xlatService);
            }
        }


        this.EnableDisableBlueThermTemperatureIndicator = function (DisplayString, HideShow) {
            try {

                if (document.getElementById('lblTempIndicator') != null) {
                    document.getElementById('lblTempIndicator').innerHTML = DisplayString;
                    document.getElementById("divBlueThermLiveTemperatureIndicator").style.display = HideShow;
                }
            }
            catch (Excep) {
                //alert('EnableDisableBlueThermTemperatureIndicator Excep : ' + Excep);
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.EnableDisableBlueThermTemperatureIndicator", xlatService);
            }
        }

        var LoadAllLogVariables = function ($scope, SettingsObj, xlatService, toaster) {
            try {
                OneViewConsole.Debug("LoadAllLogVariables Start", "SettingsFacade.LoadAllLogVariables");

                $scope.LogVariableList = [
                                         { "Id": 1, "Name": xlatService.xlat('IsDataLogModeEnabled'), "selected": IsDataLogModeEnabled },
                                         { "Id": 2, "Name": xlatService.xlat('IsDebugModeEnabled'), "selected": IsDebugModeEnabled },
                                         { "Id": 3, "Name": xlatService.xlat('IsInfoModeEnabled') , "selected": IsInfoModeEnabled },
                                         { "Id": 4, "Name": xlatService.xlat('IsWarnModeEnabled'), "selected": IsWarnModeEnabled },
                                         { "Id": 5, "Name": xlatService.xlat('IsFatalModeEnabled'), "selected": IsFatalModeEnabled }
                ];

                if (SettingsObj.newpage) {
                    $scope.settingvisible = false;
                    $scope.probevisible = false;
                    $scope.LogsVisible = true;
                    $scope.BackVisible = true;
                    $scope.UpdatePassword = false;
                    $scope.ShiftsVisible = false;
                }

                OneViewConsole.Debug("LoadAllLogVariables End", "SettingsFacade.LoadAllLogVariables");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.LoadAllLogVariables", xlatService);
            }
        }

        this.ResetPassword = function ($scope, xlatService, $location) {
            try {
                OneViewConsole.Debug("ResetPassword Start", "SettingsFacade.ResetPassword");
                
                if ($scope.OldPassword != undefined && $scope.OldPassword != "" && $scope.NewPassword != undefined && $scope.NewPassword != "" && $scope.ConfirmPassword != undefined && $scope.ConfirmPassword != "") {

                    var _oUserMasterBO = new UserMasterBO(xlatService);
                    var IsSuccess = _oUserMasterBO.ResetPassword(OneViewSessionStorage.Get("LoginUserId"), $scope.OldPassword, $scope.NewPassword, $scope.ConfirmPassword);

                    if (IsSuccess == true) {

                        $scope.OldPassword = "";
                        $scope.NewPassword = "";
                        $scope.ConfirmPassword = "";

                        alert(xlatService.xlat('IN-SU-MSE-014 :: Password changed successfully'));

                        $location.url('/login');

                        OneViewSessionStorage.Clear();
                        ClearGlobalVariable();
                    }
                }
                else if ($scope.OldPassword == undefined || $scope.OldPassword == "") {
                    alert(xlatService.xlat('VL-CU-MSE-001 :: Please enter Old Password'));
                }
                else if ($scope.NewPassword == undefined || $scope.NewPassword == "") {
                    alert(xlatService.xlat('VL-CU-MSE-002 :: Please enter New Password'));
                }
                else if ($scope.ConfirmPassword == undefined || $scope.ConfirmPassword == "") {
                    alert(xlatService.xlat('VL-CU-MSE-003 :: Please enter Confirm Password'));
                }
               
                OneViewConsole.Debug("ResetPassword End", "SettingsFacade.ResetPassword");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.ResetPassword", xlatService);
            }
        }

        /// <summary>
        /// Change one probe to another probe 
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="probeObj">Selected probe info</param>
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="toaster">toaster for toast messages</param>
        /// <param name="SpinService">SpinService for loader</param>
        this.OnProbeChange = function ($scope, probeObj, xlatService, toaster, SpinService, $timeout) {
            try {
                OneViewConsole.Debug("OnProbeChange Start", "SettingsFacade.OnProbeChange");

                var _oVallidationHandler = new VallidationHandler();
                var _oSettingsPresenter = new SettingsPresenter();
                var parm = { scope: $scope, toaster: toaster, xlatService: xlatService, ClientValidatorConfigList: MyInstance.LoadAllPairedDevices_ClientValidatorConfigList };
                ///    var oDefaultValidationResponse = _oVallidationHandler.Validate($scope, toaster, xlatService, MyInstance.LoadAllPairedDevices_ClientValidatorConfigList);
                var oDefaultValidationResponse = _oVallidationHandler.Validate(parm);
                // If vallidation success
                if (oDefaultValidationResponse.IsSuccess == true) {

                    // if no probe is connected 
                    if (ConnectedProbe[0] == undefined) {

                        ConnectProbe($scope, probeObj, xlatService, toaster, $timeout);
                    }
                        //User trying to connect a probe while another probe was connected already
                    else if (ConnectedProbe[0] != undefined && ConnectedProbe[0].Name != probeObj.Name) {

                        // Update model with disconnection status
                        _oSettingsPresenter.UpdateProbeDisconnectStatus($scope, probeObj);
                    
                        //  toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('DisconnectExistingProbe'));
                        alert(xlatService.xlat('DisconnectExistingProbe'));
                    }
                        //Disconnect the connected probe
                    else if (ConnectedProbe[0] != undefined && ConnectedProbe[0].Name == probeObj.Name) {
                        DisConnectProbe($scope, probeObj, xlatService, toaster);
                    }
                }
                else {

                    $scope.settingvisible = true;
                    $scope.probevisible = false;
                    $scope.LogsVisible = false;
                    $scope.BackVisible = false;
                    $scope.UpdatePassword = false;

                    $scope.ShiftsVisible = false;
                }

                OneViewConsole.Debug("OnProbeChange End", "SettingsFacade.OnProbeChange");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.OnProbeChange", xlatService);
            }
            finally {
                _oVallidationHandler = null;
                _oSettingsPresenter = null;
                parm = null;
                oDefaultValidationResponse = null;
            }
        }



    /// <summary>
    /// Change one probe to another probe 
    /// </summary>
    /// <param name="$scope">Current scope</param>
    /// <param name="probeObj">Selected probe info</param>
    /// <param name="xlatService">xlatService for globalization</param>
    /// <param name="toaster">toaster for toast messages</param>
    /// <param name="SpinService">SpinService for loader</param>
        this.OnNewProbeChange = function ($scope, probeObj, xlatService, toaster, SpinService, $timeout) {
            try {
                OneViewConsole.Debug("OnProbeChange Start", "SettingsFacade.OnProbeChange");
         
               // var _oVallidationHandler = new VallidationHandler();
                var _oSettingsPresenter = new SettingsPresenter();
              //  var parm = { scope: $scope, toaster: toaster, xlatService: xlatService, ClientValidatorConfigList: MyInstance.LoadAllPairedDevices_ClientValidatorConfigList };
                ///    var oDefaultValidationResponse = _oVallidationHandler.Validate($scope, toaster, xlatService, MyInstance.LoadAllPairedDevices_ClientValidatorConfigList);

               
                var _oBluetoothOnValidation = new BluetoothOnValidation();
                var oDefaultValidationResponse = _oBluetoothOnValidation.Validate($scope, xlatService);
                 //alert(JSON.stringify(oDefaultValidationResponse));
               // var oDefaultValidationResponse = _oVallidationHandler.Validate(parm);

                // If vallidation success
                if (oDefaultValidationResponse.IsSuccess == true) {

                    // if no probe is connected 
                    if (ConnectedProbe[0] == undefined) {

                        ConnectNewProbe($scope, probeObj, xlatService, toaster, $timeout);
                    }
                        //User trying to connect a probe while another probe was connected already
                    else if (ConnectedProbe[0] != undefined && ConnectedProbe[0].Name != probeObj.Name) {

                        // Update model with disconnection status
                        //  _oSettingsPresenter.UpdateProbeDisconnectStatus($scope, probeObj);
                        _oSettingsPresenter.UpdateNewProbeDisconnectStatus($scope, probeObj);

                        //  toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('DisconnectExistingProbe'));
                        alert(xlatService.xlat('DisconnectExistingProbe'));
                    }
                        //Disconnect the connected probe
                    else if (ConnectedProbe[0] != undefined && ConnectedProbe[0].Name == probeObj.Name) {
                        DisConnectNewProbe($scope, probeObj, xlatService, toaster, $timeout);
                    }
                }
                else {

                    $scope.settingvisible = true;
                    $scope.probevisible = false;
                    $scope.LogsVisible = false;
                    $scope.BackVisible = false;
                    $scope.UpdatePassword = false;

                    $scope.ShiftsVisible = false;
                    $scope.NewProbevisible = false;
                }
             
                OneViewConsole.Debug("OnProbeChange End", "SettingsFacade.OnProbeChange");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.OnProbeChange", xlatService);
            }
            finally {
                _oVallidationHandler = null;
                _oSettingsPresenter = null;
                parm = null;
                oDefaultValidationResponse = null;
            }
        }


    /// <summary>
    /// Change one probe to another probe 
    /// </summary>
    /// <param name="$scope">Current scope</param>
    /// <param name="probeObj">Selected probe info</param>
    /// <param name="xlatService">xlatService for globalization</param>
    /// <param name="toaster">toaster for toast messages</param>
    /// <param name="SpinService">SpinService for loader</param>
        this.OnNewProbeChange_OLD = function ($scope, probeObj, xlatService, toaster, SpinService, $timeout) {
            try {
                OneViewConsole.Debug("OnNewProbeChange Start", "SettingsFacade.OnNewProbeChange");

               // alert(probeObj + "----" + JSON.stringify(probeObj));
                /*
                   case CONNECTED:
                if (mDevice.isReady()) {
                    Util.setButton(mConnectButton, "disconnect", true);
                } else {
                    Util.setButton(mConnectButton, "reading..", false);
                }
                break;
            case DISCONNECTED:
            case UNKNOWN:
            default:
                Util.setButton(mConnectButton, "connect", true);
                break;
            case CONNECTING:
            case DISCONNECTING:
                Util.setButton(mConnectButton, "wait..", false);
                break;
            case UNSUPPORTED:
                Util.setButton(mConnectButton, "unsupported", false);
                break;
            case UNAVAILABLE:
                Util.setButton(mConnectButton, "unavailable", false);
                break;
                */

                var ProbeName = probeObj.Name;
                var _oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
                var ProbeDetails = _oOneViewAppInfoPlugin.ConnectNewProbe(ProbeName);

                if (ProbeDetails.IsAnyException == true) {

                }
                else {
                    alert(ProbeDetails.ConnectionState);
                    //LabelName.toUpperCase().trim() 
                    if (ProbeDetails.ConnectionState.toUpperCase().trim() == "CONNECTED") {

                        alert(xlatService.xlat('ProbeConnectedSuccesfully'));                       
                        $scope.probes[probeObj.Index].selected = true;
                        NewConnectProbe[0] = { "Index": probeObj.Index, "Id": probeObj.Name, "Name": probeObj.Name };
                        alert("NewConnectProbe : " + JSON.stringify(NewConnectProbe));
                        //_oSettingsPresenter.SaveSelectedDevice(probeObj);

                    }
                    else {
                     alert(xlatService.xlat('Please try again once again'));
                    }
                }





                //var _oVallidationHandler = new VallidationHandler();
                //var _oSettingsPresenter = new SettingsPresenter();
                //var parm = { scope: $scope, toaster: toaster, xlatService: xlatService, ClientValidatorConfigList: MyInstance.LoadAllPairedDevices_ClientValidatorConfigList };
                /////    var oDefaultValidationResponse = _oVallidationHandler.Validate($scope, toaster, xlatService, MyInstance.LoadAllPairedDevices_ClientValidatorConfigList);
                //var oDefaultValidationResponse = _oVallidationHandler.Validate(parm);
                //// If vallidation success
                //if (oDefaultValidationResponse.IsSuccess == true) {

                    // if no probe is connected 
                //if (NewConnectProbe[0] == undefined) {

                //        ConnectProbe($scope, probeObj, xlatService, toaster, $timeout);
                //    }
                //        //User trying to connect a probe while another probe was connected already
                //else if (NewConnectProbe[0] != undefined && NewConnectProbe[0].Name != probeObj.Name) {

                //        // Update model with disconnection status
                //        _oSettingsPresenter.UpdateProbeDisconnectStatus($scope, probeObj);

                //        //  toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('DisconnectExistingProbe'));
                //        alert(xlatService.xlat('DisconnectExistingProbe'));
                //    }
                //        //Disconnect the connected probe
                //else if (NewConnectProbe[0] != undefined && NewConnectProbe[0].Name == probeObj.Name) {
                //        DisConnectProbe($scope, probeObj, xlatService, toaster);
                //    }
                //}
                //else {

                //    $scope.settingvisible = true;
                //    $scope.probevisible = false;
                //    $scope.LogsVisible = false;
                //    $scope.BackVisible = false;
                //    $scope.UpdatePassword = false;

                //    $scope.ShiftsVisible = false;
                //}

                OneViewConsole.Debug("OnNewProbeChange End", "SettingsFacade.OnNewProbeChange");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.OnNewProbeChange", xlatService);
            }
            finally {
                _oVallidationHandler = null;
                _oSettingsPresenter = null;
                parm = null;
                oDefaultValidationResponse = null;
            }
        }


        /// <summary>
        /// Load all paired devices on device
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="SettingsObj">SettingsObj info</param>
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="toaster">toaster for toast messages</param>
        /// <param name="SpinService">SpinService for loader</param>
         var LoadAllPairedDevices = function ($scope, SettingsObj, xlatService, toaster, SpinService) {
            try {

                OneViewConsole.Debug("LoadAllPairedDevices Start", "SettingsFacade.LoadAllPairedDevices");

                var _oVallidationHandler = new VallidationHandler();

                var parm = { scope: $scope, toaster: toaster, xlatService: xlatService, ClientValidatorConfigList: MyInstance.LoadAllPairedDevices_ClientValidatorConfigList }
                //1. BluetoothOnValidation(DefaultClientValidator)//if bluetoooth is on vallidaion success     
                //  var oDefaultValidationResponse = _oVallidationHandler.Validate($scope, toaster, xlatService, MyInstance.LoadAllPairedDevices_ClientValidatorConfigList);
                var oDefaultValidationResponse = _oVallidationHandler.Validate(parm);
               
                // If vallidation success
                if (oDefaultValidationResponse.IsSuccess == true) {

                    // Get all paired devices
                    var oOneViewBluetoothPlugin = new OneViewBluetoothPlugin();
                    var DeviceList = oOneViewBluetoothPlugin.GetAllPairedDevices();

                    // If paired devices are available
                    if (DeviceList.length != 0) {

                        // Show all paired devices
                        var _oSettingsPresenter = new SettingsPresenter();
                        _oSettingsPresenter.ShowPairedDevices($scope, DeviceList, SettingsObj);
                    }
                        // If no devices available
                    else {
                        alert(xlatService.xlat('Nodevicesfound'));
                       // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('Nodevicesfound'));
                    }
                }
                OneViewConsole.Debug("LoadAllPairedDevices End", "SettingsFacade.LoadAllPairedDevices");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.OnProbeChange", xlatService);
            }
            finally {
                _oVallidationHandler = null;
                parm = null;
                oDefaultValidationResponse = null;
                oOneViewBluetoothPlugin = null;
                DeviceList = null;
                _oSettingsPresenter = null;
            }
        }


        /// <summary>
        /// Change one probe to another probe 
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="probeObj">Selected probe info</param>
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="toaster">toaster for toast messages</param>
        var ConnectProbe = function ($scope, probeObj, xlatService, toaster, $timeout) {
            oSetDefaultSpinner.Start();
            try {
                OneViewConsole.Debug("ConnectProbe Start", "SettingsFacade.ConnectProbe");

                var oOneViewBluetoothTemperatureLoggerPlugin = new OneViewBluetoothTemperatureLoggerPlugin();
                var _oSettingsPresenter = new SettingsPresenter();

                //Connect the selected probe to BlueTherm service
                var result = oOneViewBluetoothTemperatureLoggerPlugin.Connect(probeObj.Name, "BlueThermProbe");
       
                alert("Please press the probe button until blue light blinks continuously");
               
                $timeout( function() {
                   
                    try{
                        var oBluetoothTemperatureLoggerBO = new BluetoothTemperatureLoggerBO()
                        var IsConnectionAlive = oBluetoothTemperatureLoggerBO.IsConnectionAlive(probeObj.Name);
                        
                        if (IsConnectionAlive) {
                            alert(xlatService.xlat('ProbeConnectedSuccesfully'));
                          //  toaster.pop('success', xlatService.xlat('Title_Notification'), probeObj.Name + " " + xlatService.xlat('ProbeConnectedSuccesfully'));
                            $scope.probes[probeObj.Index].selected = true;                            
                            //Save selected probe information
                            ////alert('Connected successfully');
                            _oSettingsPresenter.SaveSelectedDevice(probeObj);
                        }
                        else {                        
                            // toaster.pop('error', xlatService.xlat('Title_Notification'), probeObj.Name + " " + xlatService.xlat('ProbeConnectionFailed'));
                            alert(xlatService.xlat('ProbeConnectionFailed'));
                            $scope.probes[probeObj.Index].selected = '';
                           //// alert('Connection failed try again');
                            oOneViewBluetoothTemperatureLoggerPlugin.DisConnect("BlueThermProbe");

                        }
                        oSetDefaultSpinner.Stop();
                    }
                    catch (Excep)
                    {
                        oSetDefaultSpinner.Stop();
                        throw Excep;
                    }
                    //finally {
                    //    oBluetoothTemperatureLoggerBO = null;
                    //    IsConnectionAlive = null;
                    //}
                }, 3000, $scope, probeObj, xlatService, toaster, oOneViewBluetoothTemperatureLoggerPlugin, _oSettingsPresenter);

                //var oBluetoothTemperatureLoggerBO = new BluetoothTemperatureLoggerBO()
                //var IsConnectionAlive = true;//= oBluetoothTemperatureLoggerBO.IsConnectionAlive(probeObj.Name);
                //for (var i = 0; i < 3; i++)
                //{
                //    //IsConnectionAlive = oBluetoothTemperatureLoggerBO.IsConnectionAlive(probeObj.Name);
                //    //if (IsConnectionAlive)
                //     //   break;
                //}
            
                //if (IsConnectionAlive) {
             
                //    toaster.pop('custom', xlatService.xlat('Title_Notification'), probeObj.Name + " connected successfully");
                //    //Save selected probe information
                //    _oSettingsPresenter.SaveSelectedDevice(probeObj);
                //}
                //else {
                //    toaster.pop('custom', xlatService.xlat('Title_Notification'), probeObj.Name + " connection failed try again");
                //    //oOneViewBluetoothTemperatureLoggerPlugin.DisConnect("BlueThermProbe");
                //    $scope.probes[probeObj.Index].selected = '';
                //}

                OneViewConsole.Debug("ConnectProbe End", "SettingsFacade.ConnectProbe");
            
            }
            catch (Excep) {              
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.OnProbeChange", xlatService);
            }
            //finally {
            //    //////////oOneViewBluetoothTemperatureLoggerPlugin = null; ////Dont un-comment 
            //    _oSettingsPresenter = null;
            //    result = null;
            //}
     
        }


    /// <summary>
    /// Change one probe to another probe 
    /// </summary>
    /// <param name="$scope">Current scope</param>
    /// <param name="probeObj">Selected probe info</param>
    /// <param name="xlatService">xlatService for globalization</param>
    /// <param name="toaster">toaster for toast messages</param>
        var ConnectNewProbe = function ($scope, probeObj, xlatService, toaster, $timeout) {
            oSetDefaultSpinner.Start();
            try {
                OneViewConsole.Debug("ConnectProbe Start", "SettingsFacade.ConnectProbe");

                var oOneViewBluetoothTemperatureLoggerPlugin = new OneViewBluetoothTemperatureLoggerPlugin();
                var _oSettingsPresenter = new SettingsPresenter();

                if (OneViewLocalStorage.Get("SHUTDOWNProbeDetails") != null) {
                    OneViewLocalStorage.Remove("SHUTDOWNProbeDetails");
                    document.getElementById("divBlueThermLiveProbeConnectionButton").style.display = "none";
                }

              //  alert("Please press the probe button until blue light blinks continuously");

              //  $timeout(function () {
                     $timeout( function() {
                    try {
                        var oBluetoothTemperatureLoggerBO = new BluetoothTemperatureLoggerBO()
                        // var IsConnectionAlive = oBluetoothTemperatureLoggerBO.IsConnectionAlive(probeObj.Name);
                        //var IsConnectionAlive = true;
                        //CONNECTING
                        IsNewProbe = true;
                        var ProbeName = probeObj.Name;
                        var _oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
                        var ProbeDetails = _oOneViewAppInfoPlugin.ConnectNewProbe(ProbeName);

                        if (ProbeDetails.ConnectionState.toUpperCase().trim() == "CONNECTING") {
                            $scope.probes[probeObj.Index].selected = '';
                            ProbeDetails = _oOneViewAppInfoPlugin.ConnectNewProbe(ProbeName);
                            if (ProbeDetails.ConnectionState.toUpperCase().trim() == "CONNECTED") {
                                alert(xlatService.xlat('ProbeConnectedSuccesfully'));
                                $scope.probes[probeObj.Index].selected = true;
                                _oSettingsPresenter.SaveSelectedDevice(probeObj);

                                OneViewLocalStorage.Remove("SHUTDOWNProbeDetails");
                                document.getElementById("divBlueThermLiveProbeConnectionButton").style.display = "none";
                            }

                        }

                        else if (ProbeDetails.ConnectionState.toUpperCase().trim() == "CONNECTED") {
                            alert(xlatService.xlat('ProbeConnectedSuccesfully'));
                            //  toaster.pop('success', xlatService.xlat('Title_Notification'), probeObj.Name + " " + xlatService.xlat('ProbeConnectedSuccesfully'));
                            $scope.probes[probeObj.Index].selected = true;
                            //Save selected probe information
                            ////alert('Connected successfully');
                            _oSettingsPresenter.SaveSelectedDevice(probeObj);

                            OneViewLocalStorage.Remove("SHUTDOWNProbeDetails");
                            document.getElementById("divBlueThermLiveProbeConnectionButton").style.display = "none";
                        }
                        else {
                            // toaster.pop('error', xlatService.xlat('Title_Notification'), probeObj.Name + " " + xlatService.xlat('ProbeConnectionFailed'));
                            alert(xlatService.xlat('ProbeConnectionFailed'));
                            $scope.probes[probeObj.Index].selected = '';
                           //_oOneViewAppInfoPlugin.DisConnectNewProbe(ProbeName);


                            //DisConnectNewProbe
                            //DisconnectNewProbe
                            //// alert('Connection failed try again');
                            // oOneViewBluetoothTemperatureLoggerPlugin.DisConnect("BlueThermProbe");

                        }
                         oSetDefaultSpinner.Stop();

                      //  alert(JSON.stringify($scope.probes));
                    }
                    catch (Excep) {
                        throw Excep;
                        oSetDefaultSpinner.Stop();
                    }
                    //finally {
                    //    oBluetoothTemperatureLoggerBO = null;
                    //    IsConnectionAlive = null;
                    //}
                }, 3000, $scope, probeObj, xlatService, toaster, oOneViewBluetoothTemperatureLoggerPlugin, _oSettingsPresenter);
              

                OneViewConsole.Debug("ConnectProbe End", "SettingsFacade.ConnectProbe");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.OnProbeChange", xlatService);
            }
            //finally {
            //    //////////oOneViewBluetoothTemperatureLoggerPlugin = null; ////Dont un-comment 
            //    _oSettingsPresenter = null;
            //    result = null;
            //}

        }

        var sleep = function (milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        }




        /// <summary>
        /// Change one probe to another probe 
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="probeObj">Selected probe info</param>
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="toaster">toaster for toast messages</param>
        var DisConnectProbe = function ($scope, probeObj, xlatService, toaster) {
            try {
                OneViewConsole.Debug("DisConnectProbe Start", "SettingsFacade.DisConnectProbe");

                var oOneViewBluetoothTemperatureLoggerPlugin = new OneViewBluetoothTemperatureLoggerPlugin();
                var _oSettingsPresenter = new SettingsPresenter();

                var IsSuccess = confirm("Are you sure want to disconnect the probe ?");

                if (IsSuccess == true) {

                    //Disconnect the selected probe from BlueTherm Service
                    oOneViewBluetoothTemperatureLoggerPlugin.DisConnect("BlueThermProbe");

                    // clearing the connected probe info
                    ConnectedProbe = {};

                    $scope.probes[probeObj.Index].selected = '';

                    // toaster.pop('success', xlatService.xlat('Title_Notification'), probeObj.Name + " disconnected successfully");
                    alert(probeObj.Name + " disconnected successfully");
                }
                else {
                    // Update model with connection status
                    _oSettingsPresenter.UpdateProbeSelectedStatus($scope, probeObj);
                }

                OneViewConsole.Debug("DisConnectProbe End", "SettingsFacade.DisConnectProbe");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.OnProbeChange", xlatService);
            }
            finally {
                oOneViewBluetoothTemperatureLoggerPlugin = null;
                _oSettingsPresenter = null;
                IsSuccess = null;
            }
        }


    /// <summary>
    /// Change one probe to another probe 
    /// </summary>
    /// <param name="$scope">Current scope</param>
    /// <param name="probeObj">Selected probe info</param>
    /// <param name="xlatService">xlatService for globalization</param>
    /// <param name="toaster">toaster for toast messages</param>
        var DisConnectNewProbe = function ($scope, probeObj, xlatService, toaster, $timeout) {
            try {
                OneViewConsole.Debug("DisConnectProbe Start", "SettingsFacade.DisConnectProbe");

                var oOneViewBluetoothTemperatureLoggerPlugin = new OneViewBluetoothTemperatureLoggerPlugin();
                var _oSettingsPresenter = new SettingsPresenter();

                var IsSuccess = confirm("Are you sure want to disconnect the probe ?");

                if (IsSuccess == true) {

                    //Disconnect the selected probe from BlueTherm Service
                    // oOneViewBluetoothTemperatureLoggerPlugin.DisConnect("BlueThermProbe");

                    var ProbeName = probeObj.Name;
                  //  var _oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
                  //  _oOneViewAppInfoPlugin.DisConnectNewProbe(ProbeName);

                    var _oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
                    var ProbeDetailsConnectionState = _oOneViewAppInfoPlugin.DisconnectNewProbe(ProbeName);

                    // clearing the connected probe info
                    ConnectedProbe = {};

                    $scope.probes[probeObj.Index].selected = false;

                    // toaster.pop('success', xlatService.xlat('Title_Notification'), probeObj.Name + " disconnected successfully");
                    //alert(probeObj.Name + " disconnected successfully");
                }
                else {
                    // Update model with connection status
                    oSetDefaultSpinner.Start();
                    $timeout(function () {
                        try {
                            // $scope.probes[probeObj.Index].selected = true;
                            var _oSettingsPresenter = new SettingsPresenter();
                        _oSettingsPresenter.UpdateProbeSelectedStatus($scope, probeObj);
                        oSetDefaultSpinner.Stop();
                        }
                        catch (Excep) {
                            oSetDefaultSpinner.Stop();
                            oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.OnProbeChange", xlatService);
                        }
                    }, 1000, $scope, probeObj, xlatService, toaster, oOneViewBluetoothTemperatureLoggerPlugin, _oSettingsPresenter);
                }

                OneViewConsole.Debug("DisConnectProbe End", "SettingsFacade.DisConnectProbe");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.OnProbeChange", xlatService);
            }
            finally {
                oOneViewBluetoothTemperatureLoggerPlugin = null;
                _oSettingsPresenter = null;
                IsSuccess = null;
            }
        }

    
    //////////////************************ New Probe load code Start ******************** /////////////////////////////

        var LoadNewPairedProbeDevices = function ($scope, SettingsObj, xlatService, DeviceList) {
            try {

                OneViewConsole.Debug("LoadNewPairedProbeDevices Start", "SettingsFacade.LoadNewPairedProbeDevices");


                    // If paired devices are available
                if (DeviceList != null && DeviceList.length != 0) {

                    IsGlobalBlueThermLiveTemperatureIndicatorEnabled = true;
                    MyInstance.EnableDisableBlueThermTemperatureIndicator("Enabled", "");

                    // Show all paired devices
                    var _oSettingsPresenter = new SettingsPresenter();
                    _oSettingsPresenter.ShowNewPairedProbeDevices($scope, DeviceList, SettingsObj);
                }
                    // If no devices available
                else {
                    alert(xlatService.xlat('Nodevicesfound'));
                    // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('Nodevicesfound'));
                }
                
                OneViewConsole.Debug("LoadNewPairedProbeDevices End", "SettingsFacade.LoadNewPairedProbeDevices");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.LoadNewPairedProbeDevices", xlatService);
            }
            finally {
               
            }
        }

    //////////////************************ New Probe load code End ******************** /////////////////////////////

        this.EnableOrDisableNewDcPageDcStartDateSelection = function (xlatService,SettingsObj) {
            try {
                //alert('IsNewDcPageDcStartDateSelectionEnabled :' + IsNewDcPageDcStartDateSelectionEnabled);
                var _DOM = new DOM();
                if (IsNewDcPageDcStartDateSelectionEnabled == true) {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('NewNewDcPageDcStartDate_Confirm_Title'), xlatService.xlat('NewNewDcPageDcStartDate_Confirm_Disable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            IsNewDcPageDcStartDateSelectionEnabled = false;
                            SettingsObj.badgetxt = "Disable";                           
                            _DOM.AddInnerHtml('lblNewDcStartDateSelection', "Disable");
                            $scope.$apply();
                        }
                    });
                }
                else {
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('NewNewDcPageDcStartDate_Confirm_Title'), xlatService.xlat('NewNewDcPageDcStartDate_Confirm_Enable_Message'), function (ConfirmationId) {
                       
                        if (ConfirmationId == "2") {
                            IsNewDcPageDcStartDateSelectionEnabled = true;
                            SettingsObj.badgetxt = "Enable";
                            _DOM.AddInnerHtml('lblNewDcStartDateSelection', "Enable");
                            $scope.$apply();
                        }
                    });
                }
                
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.EnableOrDisableNewDcPageDcStartDateSelection", xlatService);
            }
        }


        this.EnableOrDisableAutoUpload = function (xlatService, SettingsObj) {
            try {
               
                //alert('IsAutoUploadEnabled :' + IsAutoUploadEnabled);
                var _DOM = new DOM();
                var AutoUploadEnabledStatus = false;
                if (OneViewLocalStorage.Get("IsAutoUploadEnabled") == null) {
                    
                    if (document.getElementById('lblAutoUpload').innerHTML = "Enable") {
                        AutoUploadEnabledStatus = true;
                    }                  
                }
                else {
                    AutoUploadEnabledStatus = OneViewLocalStorage.Get("IsAutoUploadEnabled");
                }

                if (AutoUploadEnabledStatus == "true") {
                  
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('AutoUpload_Confirm_Disable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            //IsAutoUploadEnabled = false;
                            OneViewLocalStorage.Save("IsAutoUploadEnabled", false)
                            //SettingsObj.badgetxt = "Disable";
                            _DOM.AddInnerHtml('lblAutoUpload', "Disable");
                            $scope.$apply();
                        }
                    });
                }

                else {
              
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('AutoUpload_Confirm_Enable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            // IsAutoUploadEnabled = true; 
                            OneViewLocalStorage.Save("IsAutoUploadEnabled", true)
                            //SettingsObj.badgetxt = "Enable";
                            _DOM.AddInnerHtml('lblAutoUpload', "Enable");
                            $scope.$apply();
                        }
                    });
                }
              

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.EnableOrDisableAutoUpload", xlatService);
            }
        }


        this.EnableOrDisableAutoProfileDownload = function (xlatService, SettingsObj) {
            try {

                //alert('IsAutoProfileDownloadEnabled :' + IsAutoProfileDownloadEnabled);
                var _DOM = new DOM();
                var AutoProfileDownloadEnabledStatus = false;
                if (OneViewLocalStorage.Get("IsAutoProfileDownloadEnabled") == null) {

                    if (document.getElementById('lblAutoProfileDownload').innerHTML = "Enable") {
                        AutoProfileDownloadEnabledStatus = true;
                    }
                }
                else {
                    AutoProfileDownloadEnabledStatus = OneViewLocalStorage.Get("IsAutoProfileDownloadEnabled");
                }

                if (AutoProfileDownloadEnabledStatus == "true") {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('AutoProfileDownload_Confirm_Disable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            //IsAutoProfileDownloadEnabled = false;
                            OneViewLocalStorage.Save("IsAutoProfileDownloadEnabled", false)
                            //SettingsObj.badgetxt = "Disable";
                            _DOM.AddInnerHtml('lblAutoProfileDownload', "Disable");
                            $scope.$apply();
                        }
                    });
                }

                else {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('AutoProfileDownload_Confirm_Enable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            // IsAutoProfileDownloadEnabled = true; 
                            OneViewLocalStorage.Save("IsAutoProfileDownloadEnabled", true)
                            //SettingsObj.badgetxt = "Enable";
                            _DOM.AddInnerHtml('lblAutoProfileDownload', "Enable");
                            $scope.$apply();
                        }
                    });
                }


            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.EnableOrDisableAutoUpload", xlatService);
            }
        }

        this.EnableOrDisableAutoActionFollowupDownload = function (xlatService, SettingsObj) {
            try {

                //alert('IsAutoActionFollowupDownloadEnabled :' + IsAutoActionFollowupDownloadEnabled);
                var _DOM = new DOM();
                var AutoActionFollowupDownloadEnabledStatus = false;
                if (OneViewLocalStorage.Get("IsAutoActionFollowupDownloadEnabled") == null) {

                    if (document.getElementById('lblAutoActionFollowupDownload').innerHTML = "Enable") {
                        AutoActionFollowupDownloadEnabledStatus = true;
                    }
                }
                else {
                    AutoActionFollowupDownloadEnabledStatus = OneViewLocalStorage.Get("IsAutoActionFollowupDownloadEnabled");
                }

                if (AutoActionFollowupDownloadEnabledStatus == "true") {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('AutoActionFollowupDownload_Confirm_Disable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                         
                            OneViewLocalStorage.Save("IsAutoActionFollowupDownloadEnabled", false)
                            //SettingsObj.badgetxt = "Disable";
                            _DOM.AddInnerHtml('lblAutoActionFollowupDownload', "Disable");
                            $scope.$apply();
                        }
                    });
                }

                else {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('AutoActionFollowupDownload_Confirm_Enable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            
                            OneViewLocalStorage.Save("IsAutoActionFollowupDownloadEnabled", true)
                            //SettingsObj.badgetxt = "Enable";
                            _DOM.AddInnerHtml('lblAutoActionFollowupDownload', "Enable");
                            $scope.$apply();
                        }
                    });
                }


            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.EnableOrDisableAutoActionFollowupDownload", xlatService);
            }
        }


        this.LoadAllValidShifts = function ($scope, SettingsObj, xlatService) {
            try {
                OneViewConsole.Debug("LoadAllValidShifts Start", "SettingsFacade.LoadAllValidShifts");
                
                var oDateTime = new DateTime();
                var DCDateTime = oDateTime.GetDateAndTime(); // CurrentDateTime : (dd-mm-yyyy hh:mm:ss)
                DCDateTime = oDateTime.ConvertDateTimeToInteger(DCDateTime);

                var _oShiftMasterDAO = new ShiftMasterDAO();
                var ShiftList = _oShiftMasterDAO.GetValidShiftByService(OneViewSessionStorage.Get("ServiceId"), DCDateTime);

                if (ShiftList.length != 0) {
                    // Show all Shifts for current service
                    var _oSettingsPresenter = new SettingsPresenter();
                    _oSettingsPresenter.ShowAllValidShifts($scope, ShiftList, SettingsObj);
                }
                    // If no Shifts available
                else {
                    alert(xlatService.xlat('NoShiftsfound'));                    
                }

                OneViewConsole.Debug("LoadAllValidShifts Start", "SettingsFacade.LoadAllValidShifts");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.GetValidShifts", xlatService);
            }
        }


        this.OnShiftChange = function ($scope, ShiftObj, xlatService, $timeout) {
            try {
                OneViewConsole.Debug("OnShiftChange Start", "SettingsFacade.OnShiftChange");
                var _oSettingsPresenter = new SettingsPresenter();

                //alert(GlobalShiftId + ' , OnShiftChange ' + JSON.stringify(ShiftObj));                
                var ShiftId = "";
               if (ShiftObj != undefined) { 
                   for (var temp in $scope.ShiftsData) {                       
                       var CurrentShift = $scope.ShiftsData[temp];
                       if (ShiftObj.Id == CurrentShift.Id && ShiftObj.selected == true) {
                           $scope.ShiftsData[CurrentShift.Index].selected = true;
                           ShiftId = ShiftObj.Id;
                       }
                       else {
                           $scope.ShiftsData[CurrentShift.Index].selected = '';
                       }
                    }                 
                   _oSettingsPresenter.SaveSelectedShift(ShiftObj);
                 
               }

               OneViewLocalStorage.Save("GlobalShiftId", ShiftId);
               GlobalShiftId = ShiftId;
               
               //alert('GlobalShiftId : ' + GlobalShiftId);
                OneViewConsole.Debug("OnShiftChange End", "SettingsFacade.OnShiftChange");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.OnShiftChange", xlatService);
            }
            finally {

            }
        }

        this.GoToAPKUpgradeProcess = function ($location, xlatService) {
            try {
                OneViewConsole.Debug("GoToAPKUpgradeProcess Start", "SettingsFacade.GoToAPKUpgradeProcess");
                
                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "DasboardFacade.DownLoad");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    var oAPKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
                    var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
                    if (oAPKUpgradeProcessStatus != null) {
                        oAPKUpgradeProcessStatus = JSON.parse(oAPKUpgradeProcessStatus);
                        oAPKUpgradeProcessBO.SetUpgradeStepCompleted(oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName, oAPKUpgradeProcessStatus.LatestVersion);
                        if (oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted != true) {
                            $location.url('/APKUpgrade');
                        }
                    }
                    else {
                        OneViewLocalStorage.Remove("APKUpgradeProcessStatus");
                        //check for update
                        var response = oAPKUpgradeProcessBO.CheckIsUpgradeAvailable();
                        if (response.IsUpgradeAvailable == true) {
                            // alert(xlatService.xlat('NewUpdateAvailablePart1') + response.LatestVersion + xlatService.xlat('NewUpdateAvailablePart2') + response.CurrentVersion);
                            //download metadata
                            var _oAPKUpgradeProcessMetadataDownloadBO = new APKUpgradeProcessMetadataDownloadBO(xlatService);
                            var Result = _oAPKUpgradeProcessMetadataDownloadBO.DownloadMetadataFromServer();
                            //Metadata downloaded , then go to APKUpgradePage
                            if (Result.IsSuccess == true) {
                                var NewUpdateMsg = oAPKUpgradeProcessBO.FormUpgradeStartMessage(xlatService);
                                alert(NewUpdateMsg);
                                var IsOperationAccessAllowed = oAPKUpgradeProcessBO.ValidationForAPKUpgradeProcess("IsAllowDcProfileDownload");
                                if (IsOperationAccessAllowed == true) {
                                    alert('OperationAccessPermissionKey = IsAllowDcProfileDownload  , IsOperationAccessAllowed = ' + IsOperationAccessAllowed + ' , Not implemented exception.');
                                }
                                else {
                                    //navigate to upgrade
                                    $location.url('/APKUpgrade');
                                }
                            }
                            else {
                                //go to error page
                                $location.url('/notifycall?MessageKey=' + Result.Message);
                            }
                        }
                        else {
                            //No update available
                            alert(xlatService.xlat('NoUpdatesAvailable'));
                        }
                    }                                      

                }
                else {
                    alert(xlatService.xlat('NoInternetConnection'));
                    OneViewConsole.Info("No Internet Connection", "DasboardFacade.DownLoadProfile");
                }


                OneViewConsole.Debug("GoToAPKUpgradeProcess End", "SettingsFacade.GoToAPKUpgradeProcess");

            }
            catch (Excep) {
               // alert("SettingsFacade.GoToAPKUpgradeProcess Excep 11 : " + Excep);
               // alert("SettingsFacade.GoToAPKUpgradeProcess Excep 22 : " + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.GoToAPKUpgradeProcess", xlatService);
            }
            finally {

            }
        }


        this.SyncServiceOperations = function ($scope, SettingsObj, xlatService) {
            try {
                OneViewConsole.Debug("SyncServiceOperations Start", "SettingsFacade.SyncServiceOperations");

                var IsAutoSyncEnabled = OneViewLocalStorage.Get("IsAutoSyncEnabled");

                
                var _DOM = new DOM();
                if (IsAutoSyncEnabled != 'true') {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat("IN-MG-MSE-006 :: Are you sure you want to enable Auto Sync ?"), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            oOneviewSyncFrameworkPlugin.StartService();
                            IsAutoSyncEnabled = "true";
                            OneViewLocalStorage.Save("IsAutoSyncEnabled", "true");
                            IsGlobalAutoSyncEnabled = true;
                            SettingsObj.badgetxt = "Enable";
                            _DOM.AddInnerHtml('lblAutoSync', xlatService.xlat('Enable'));
                            $scope.$apply();
                        }
                    });
                }

                else {
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('IN-MG-MSE-007 :: Are you sure you want to disable Auto Sync ?'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            oOneviewSyncFrameworkPlugin.StopService();
                            IsAutoSyncEnabled = "false";
                            OneViewLocalStorage.Save("IsAutoSyncEnabled", "false");
                            IsGlobalAutoSyncEnabled = false;
                            SettingsObj.badgetxt = "Disable";
                            _DOM.AddInnerHtml('lblAutoSync', xlatService.xlat('Disable'));
                            $scope.$apply();
                        }
                    });
                }


                // alert("IN-SU-MSE-017 ::  Sync Master On-Progress.");

                OneViewConsole.Debug("SyncServiceOperations Start", "SettingsFacade.SyncServiceOperations");
            }
            catch (Excep) {
               // alert("SettingsFacade.SyncServiceOperations Excep : " + Excep + ", " + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.SyncServiceOperations", xlatService);
            }
        }

        this.AutoMasterMetadataDownload = function ($scope, SettingsObj, xlatService) {
            try {
                OneViewConsole.Debug("AutoMasterMetadataDownload Start", "SettingsFacade.AutoMasterMetadataDownload");

                var IsAutoMetadataDownload = OneViewLocalStorage.Get("IsAutoMetadataDownload");


                var _DOM = new DOM();
                if (IsAutoMetadataDownload != 'true') {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat("IN-MG-MSE-006 :: Are you sure you want to enable Auto Metadata Download ?"), function (ConfirmationId) {

                        if (ConfirmationId == "2") {                         

                            IsAutoMetadataDownload = "true";
                            OneViewLocalStorage.Save("IsAutoMetadataDownload", "true");

                            SettingsObj.badgetxt = "Enable";
                            _DOM.AddInnerHtml('lblAutoMetadataDownload', xlatService.xlat('Enable'));
                            $scope.$apply();
                        }
                    });
                }

                else {
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('IN-MG-MSE-007 :: Are you sure you want to disable Auto Metadata Download ?'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                          

                            IsAutoMetadataDownload = "false";
                            OneViewLocalStorage.Save("IsAutoMetadataDownload", "false");

                            SettingsObj.badgetxt = "Disable";
                            _DOM.AddInnerHtml('lblAutoMetadataDownload', xlatService.xlat('Disable'));
                            $scope.$apply();
                        }
                    });
                }


                // alert("IN-SU-MSE-017 ::  Sync Master On-Progress.");

                OneViewConsole.Debug("AutoMasterMetadataDownload Start", "SettingsFacade.AutoMasterMetadataDownload");
            }
            catch (Excep) {
                // alert("SettingsFacade.AutoMasterMetadataDownload Excep : " + Excep + ", " + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.AutoMasterMetadataDownload", xlatService);
            }
        }

        this.EnableOrDisableGeoLocationValidation = function (xlatService, SettingsObj) {
            try {
                
                var _DOM = new DOM();
                var IsGeoLocationValidatoionEnabled = "false";

                if (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") == null) {

                    if (document.getElementById('lblEnableGeoLocationValidation').innerHTML == "Enable") {
                        IsGeoLocationValidatoionEnabled = "true";
                    }
                }
                else {
                    IsGeoLocationValidatoionEnabled = OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled");
                }
                
                
                if (IsGeoLocationValidatoionEnabled == "false") {                    
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('GeoLocationValidation_Confirm_Title'), xlatService.xlat('GeoLocationValidation_Confirm_Enable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            OneViewLocalStorage.Save("IsGlobalGeoLocationValidationEnabled", true)
                            if (OneViewLocalStorage.Get("LocalStorageDistanceSpan") == null) {
                                OneViewLocalStorage.Save("LocalStorageDistanceSpan", "500");
                            }                            
                            SettingsObj.badgetxt = "Enable";
                            _DOM.AddInnerHtml('lblEnableGeoLocationValidation', "Enable");
                            var _value = "";
                            regDistanceSpan = (/^-?\d*(\.\d+)?$/);
                            do {
                                _value = prompt(xlatService.xlat("Please enter distance(m)"), OneViewLocalStorage.Get("LocalStorageDistanceSpan"));
                                
                            }
                            while (!regDistanceSpan.test(_value) && _value != null);

                            if (_value != null && _value != "") {
                                //OneViewGlobalDistanceSpan = _value;
                                OneViewLocalStorage.Save("LocalStorageDistanceSpan", _value);
                            }
                            _DOM.AddInnerHtml('lblDistanceSpan', OneViewLocalStorage.Get("LocalStorageDistanceSpan") + "(m)&nbsp;&nbsp;&nbsp;");
                            $scope.$apply();
                        }
                    });                  
                }
                else {
                    
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('GeoLocationValidation_Confirm_Title'), xlatService.xlat('GeoLocationValidation_Confirm_Disable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            OneViewLocalStorage.Save("IsGlobalGeoLocationValidationEnabled", false)
                            SettingsObj.badgetxt = "Disable";
                            _DOM.AddInnerHtml('lblEnableGeoLocationValidation', "Disable");
                            _DOM.AddInnerHtml('lblDistanceSpan', "");
                            $scope.$apply();
                        }
                    });
                }


            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.EnableOrDisableGeoLocationValidation", xlatService);
            }
        }

        this.EnableOrDisableLandingpagedailysync = function (xlatService, SettingsObj) {
            try {

                var _DOM = new DOM();
                var IsLandingpagedailysyncEnabled = "false";

                if (OneViewLocalStorage.Get("IsGlobalLandingpagedailysyncEnabled") == null) {

                    if (document.getElementById('lblLandingpagedailysync').innerHTML == "Enable") {
                        IsLandingpagedailysyncEnabled = "true";
                    }
                }
                else {
                    IsLandingpagedailysyncEnabled = OneViewLocalStorage.Get("IsGlobalLandingpagedailysyncEnabled");
                }


                if (IsLandingpagedailysyncEnabled == "false") {
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Landingpagedailysync_Confirm_Title'), xlatService.xlat('Landingpagedailysync_Confirm_Enable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            OneViewLocalStorage.Save("IsGlobalLandingpagedailysyncEnabled", true);
                            SettingsObj.badgetxt = "Enable";
                            _DOM.AddInnerHtml('lblLandingpagedailysync', "Enable");
                            $scope.$apply();
                        }
                    });
                }
                else {
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Landingpagedailysync_Confirm_Title'), xlatService.xlat('Landingpagedailysync_Confirm_Disable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            OneViewLocalStorage.Save("IsGlobalLandingpagedailysyncEnabled", false)
                            SettingsObj.badgetxt = "Disable";
                            _DOM.AddInnerHtml('lblLandingpagedailysync', "Disable");
                       
                            $scope.$apply();
                        }
                    });
                }


            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.EnableOrDisableLandingpagedailysync", xlatService);
            }
        }


        this.EnableOrDisableMobileAutoSync = function (xlatService, SettingsObj) {
            try {

                var _DOM = new DOM();
                var IsGlobalMobileAutoSyncEnabled = "false";

                if (OneViewLocalStorage.Get("IsGlobalMobileAutoSyncEnabled") == null) {

                    if (document.getElementById('lblMobileAutoSync').innerHTML == "Enable") {
                        IsGlobalMobileAutoSyncEnabled = "true";
                    }
                }
                else {
                    IsGlobalMobileAutoSyncEnabled = OneViewLocalStorage.Get("IsGlobalMobileAutoSyncEnabled");
                }

                //alert('IsGlobalMobileAutoSyncEnabled : ' + IsGlobalMobileAutoSyncEnabled);
                if (IsGlobalMobileAutoSyncEnabled == "false") {
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('MobileAutoSync_Confirm_Title'), xlatService.xlat('MobileAutoSync_Confirm_Enable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            OneViewLocalStorage.Save("IsGlobalMobileAutoSyncEnabled", true);
                            //alert('OneViewLocalStorage.Get("IsGlobalMobileAutoSyncEnabled") 22 : ' + OneViewLocalStorage.Get("IsGlobalMobileAutoSyncEnabled"));
                            SettingsObj.badgetxt = "Enable";
                            _DOM.AddInnerHtml('lblMobileAutoSync', "Enable");
                            $scope.$apply();
                          
                        }
                    });
                }
                else {
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('MobileAutoSync_Confirm_Title'), xlatService.xlat('MobileAutoSync_Confirm_Disable_Message'), function (ConfirmationId) {

                        if (ConfirmationId == "2") {
                            OneViewLocalStorage.Save("IsGlobalMobileAutoSyncEnabled", false);
                            //alert('OneViewLocalStorage.Get("IsGlobalMobileAutoSyncEnabled") 33 : ' + OneViewLocalStorage.Get("IsGlobalMobileAutoSyncEnabled"));
                            SettingsObj.badgetxt = "Disable";
                            _DOM.AddInnerHtml('lblMobileAutoSync', "Disable");

                            $scope.$apply();

                        }
                    });
                }

                
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.EnableOrDisableLandingpagedailysync", xlatService);
            }

        }

        var AutoManualstatusCallEvent = function ($scope, SettingsObj, xlatService, toaster, SpinService, $location, $compile) {
            try {
                OneViewConsole.Debug("AutoManualstatusCallEvent Start", "SettingsFacade.AutoManualstatusCallEvent");

                var _SettingsBO = new SettingsBO();        
                var _IsAutoManualPinValidationRequired = _SettingsBO.IsAutoManualPinValidationRequired();
            
                if (_IsAutoManualPinValidationRequired ==true) {

                    HideSubHtmlDivs($scope);

                    $scope.settingvisible = false;
                    $scope.BackVisible = true;
                    $scope.SettingsToolBar = true;
                    $scope.ShowAutoManualValidationPage = true;

                    $scope.AutoManualPin = "";

                }
                else {
                    if (IsGlobalAutoTemperatureManualAllowed == true) {

                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('AutoManual_Confirm_Title'), xlatService.xlat('AutoManual_Confirm_Auto_Message'), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                IsGlobalAutoTemperatureManualAllowed = false;
                                SettingsObj.badgetxt = "Auto";
                                if (document.getElementById('lblTempReading') != null) {
                                    document.getElementById('lblTempReading').innerHTML = "Auto";
                                }

                                if (document.getElementById('lblBlueThermStatus') != null) {
                                    document.getElementById('lblBlueThermStatus').className = "balanced";
                                    document.getElementById('lblBlueThermStatus').innerHTML = xlatService.xlat('Auto');
                                }
                                
                                _SettingsBO.DeleteManualPinValidationDetailsFromLocalbyUser();
                                $scope.$apply();
                            }
                        });
                    }
                    else {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('AutoManual_Confirm_Title'), xlatService.xlat('AutoManual_Confirm_Manual_Message'), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                IsGlobalAutoTemperatureManualAllowed = true;
                                SettingsObj.badgetxt = "Manual";
                                if (document.getElementById('lblTempReading') != null) {
                                    document.getElementById('lblTempReading').innerHTML = "Manual";
                                }
                                if (document.getElementById('lblBlueThermStatus') != null) {
                                    document.getElementById('lblBlueThermStatus').className = "assertive";
                                    document.getElementById('lblBlueThermStatus').innerHTML = xlatService.xlat('Manual');
                                }
                                $scope.$apply();
                            }
                        });
                    }
                }



                OneViewConsole.Debug("AutoManualstatusCallEvent End", "SettingsFacade.AutoManualstatusCallEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.AutoManualstatusCallEvent", xlatService);
            }
        }

        this.SubmitAutoManualPin = function ($scope, xlatService, $location, SettingsObj) {
            try {
                OneViewConsole.Debug("SubmitAutoManualPin Start", "SettingsFacade.SubmitAutoManualPin");

                var _SettingsBO = new SettingsBO();
                if (_SettingsBO.IsPinValid($scope.AutoManualPin,$scope, xlatService)) {
               
                    ShowSettingsPageBack($scope, xlatService);

                    IsGlobalAutoTemperatureManualAllowed = true;
                    SettingsObj.badgetxt = "Manual";
                    if (document.getElementById('lblTempReading') != null) {
                        document.getElementById('lblTempReading').innerHTML = "Manual";
                    }
                    if (document.getElementById('lblBlueThermStatus') != null) {
                        document.getElementById('lblBlueThermStatus').className = "assertive";
                        document.getElementById('lblBlueThermStatus').innerHTML = xlatService.xlat('Manual');
                    }
                }
                else{
                    alert(xlatService.xlat('Please enter valid Pin'));
                }

                OneViewConsole.Debug("SubmitAutoManualPin End", "SettingsFacade.SubmitAutoManualPin");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.SubmitAutoManualPin", xlatService);
            }
        }

        var ShowSettingsPageBack = function ($scope, xlatService) {
            try {
                OneViewConsole.Debug("ShowSettingsPageBack Start", "SettingsFacade.ShowSettingsPageBack");

                $scope.settingvisible = true;
                $scope.probevisible = false;
                $scope.LogsVisible = false;
                $scope.BackVisible = false;
                $scope.UpdatePassword = false;
                $scope.PasswordUpdateButton = false;
                $scope.ShiftsVisible = false;
                $scope.NewProbevisible = false;
                $scope.ShowAutoManualValidationPage = false;

                OneViewConsole.Debug("ShowSettingsPageBack End", "SettingsFacade.ShowSettingsPageBack");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SettingsFacade.ShowSettingsPageBack", xlatService);
            }
        }
}


function BluetoothTemperatureLoggerBO() {

    this.IsConnectionAlive = function (DeviceName,IsNewProbe) {
        try {
            OneViewConsole.Debug("IsConnectionAlive Start", "BluetoothTemperatureLoggerBO.IsConnectionAlive");

        
            if (IsNewProbe == true) {

                var _oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
                var ProbeDetails = _oOneViewAppInfoPlugin.GetConnectionStatus(DeviceName);

                if (ProbeDetails.ConnectionState.toUpperCase().trim() == "CONNECTED") {                
                    return true;
                }
                else {
                    return false;
                }
                
            }
            else {

                var oTemperature = oGlobalOneViewBluetoothTemperatureLoggerPlugin.GetTemperature(DeviceName, "BlueThermProbe");
                if (oTemperature.IsAnyException == false) {
                    //dd-MM-yyyy HH:mm:ss
                    var TemperatureReadDateInfo = oTemperature.ReadingDateAndTime.split(' ');
                    var DateInfo = TemperatureReadDateInfo[0].split('-');
                    var TimeInfo = TemperatureReadDateInfo[1].split(':');

                    //new Date(Year, Month, Date, Hr, Min, Sec);
                    var TemperatureReadDate = new Date(DateInfo[2], (DateInfo[1] - 1), DateInfo[0], TimeInfo[0], TimeInfo[1], TimeInfo[2]);
                    var CurrentDateTime = new Date();

                    var difference = (CurrentDateTime - TemperatureReadDate) / 1000;
                    //alert('difference : ' + difference);

                    if (difference > 30) {
                        OneViewConsole.Debug("IsConnectionAlive End", "BluetoothTemperatureLoggerBO.IsConnectionAlive");
                        return false
                    }
                    else {
                        OneViewConsole.Debug("IsConnectionAlive End", "BluetoothTemperatureLoggerBO.IsConnectionAlive");
                        return true;
                    }
                }
                else {
                    OneViewConsole.Debug("IsConnectionAlive End", "BluetoothTemperatureLoggerBO.IsConnectionAlive");
                    return false;
                }
            }

            
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "BluetoothTemperatureLoggerBO.IsConnectionAlive", Excep);
        }
        finally {
            oTemperature = null;
            TemperatureReadDateInfo = null;
            DateInfo = null;
            TimeInfo = null;
            TemperatureReadDate = null;
            CurrentDateTime = null;
            difference = null;
        }
    }
}

/// <summary>
/// Settings presenter (For UI operations)
/// </summary>
function SettingsPresenter() {

    var MyInstance=this;
    
    /// <summary>
    /// LoadAllPairedDevices
    /// </summary>
    /// <param name="$scope">Current scope</param>
    /// <param name="xlatService">xlatService for globalization</param>
    this. PageLoad = function ($scope, xlatService) {
        try {

            OneViewConsole.Debug("PageLoad Start", "SettingsPresenter.PageLoad");
            // Make the probe list to null (empty)
            $scope.probes = {};
            $scope.LogVariableList = {};
            $scope.ShiftsData = {};            
            // Show the settings page to visible
            // Bydefault this page will visible
            $scope.settingvisible = true;
            $scope.BackVisible = false;
            $scope.NewProbes = {};

            var _DOM = new DOM();
            var TemperatureAutoMaualBadgetxt = 'Auto';
            var _oSettingsBO = new SettingsBO();
            _oSettingsBO.UpdateManualPinValidityStatus();

            if (IsGlobalAutoTemperatureManualAllowed == true){
                TemperatureAutoMaualBadgetxt = 'Manual';
                if (document.getElementById('lblTempReading') != null)
                    document.getElementById('lblTempReading').innerHTML = "Manual";

                if (document.getElementById('lblBlueThermStatus') != null) {
                    document.getElementById('lblBlueThermStatus').className = "assertive";
                    document.getElementById('lblBlueThermStatus').innerHTML = xlatService.xlat('Manual');
                }
            }               
            else {
                TemperatureAutoMaualBadgetxt = 'Auto';
                if (document.getElementById('lblTempReading') != null)
                    document.getElementById('lblTempReading').innerHTML = "Auto";

                if (document.getElementById('lblBlueThermStatus') != null) {
                    document.getElementById('lblBlueThermStatus').className = "balanced";
                    document.getElementById('lblBlueThermStatus').innerHTML = xlatService.xlat('Auto'); 
                }
            }
                

            var oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
            var LocalAppInfo = oOneViewAppInfoPlugin.GetLocalAppInfo();

            var CleaningProfiledownloadViewConfiguration = "Disabled";
            if (document.getElementById('lblMyDownLoadView') != null) {
                document.getElementById('lblMyDownLoadView').innerHTML = "Disabled";
            }
            if (IsGlobalCleaningProfiledownloadView == true) {
                CleaningProfiledownloadViewConfiguration = "Enabled";
                if (document.getElementById('lblMyDownLoadView') != null) {
                    document.getElementById('lblMyDownLoadView').innerHTML = "Enabled";
                }
            }
            else {
                CleaningProfiledownloadViewConfiguration = "Disabled";
                if (document.getElementById('lblMyDownLoadView') != null) {
                    document.getElementById('lblMyDownLoadView').innerHTML = "Disabled";
                }
            }

            var ConflictResolveModeConfiguration = "Use Mine";
            if (document.getElementById('lblResolveMode') != null)
                document.getElementById('lblResolveMode').innerHTML = "Use Mine";
            if (OneViewGlobalConflictResolveMode == 2) {
                ConflictResolveModeConfiguration = "Use Server";
                if (document.getElementById('lblResolveMode') != null)
                    document.getElementById('lblResolveMode').innerHTML = "Use Server";
            }           
            else {
                ConflictResolveModeConfiguration = "Use Mine";
                if (document.getElementById('lblResolveMode') != null)
                    document.getElementById('lblResolveMode').innerHTML = "Use Mine";
            }
            
            var GlobalOVGuidChecking = "Disabled";
            if (document.getElementById('lblGlobalOVGuidChecking') != null) {
                document.getElementById('lblGlobalOVGuidChecking').innerHTML = "Disabled";
            }
            if (IsGlobalOVGuidCheckingEnabled == true) {
                GlobalOVGuidChecking = "Enabled";
                if (document.getElementById('lblGlobalOVGuidChecking') != null) {
                    document.getElementById('lblGlobalOVGuidChecking').innerHTML = "Enabled";
                }
            }
            else {
                GlobalOVGuidChecking = "Disabled";
                if (document.getElementById('lblGlobalOVGuidChecking') != null) {
                    document.getElementById('lblGlobalOVGuidChecking').innerHTML = "Disabled";
                }
            }

            //State Mangement : New Dc
            // alert('IsGlobal_NewDc_StateManagementEnabled kkkk ' + IsGlobal_NewDc_StateManagementEnabled);
            if (IsGlobal_NewDc_StateManagementEnabled == true) {
                _DOM.AddInnerHtml('lblNewDcState', "Enable");
            }
            else {
                _DOM.AddInnerHtml('lblNewDcState', "Disable");
            }


            //Probe Indicator : Hide and Show            
            //alert('IsGlobalBlueThermLiveTemperatureIndicatorEnabled : ' + IsGlobalBlueThermLiveTemperatureIndicatorEnabled);
            if (IsGlobalBlueThermLiveTemperatureIndicatorEnabled == true) {
                if (document.getElementById('lblTempIndicator') != null) {
                    document.getElementById('lblTempIndicator').innerHTML = "Enabled";
                }
            }

            else {
                if (document.getElementById('lblTempIndicator') != null) {
                    document.getElementById('lblTempIndicator').innerHTML = "Disabled";
                }
            }



            if (IsNewDcPageDcStartDateSelectionEnabled == true) {
                _DOM.AddInnerHtml('lblNewDcStartDateSelection', "Enable");               
            }

            else {
                _DOM.AddInnerHtml('lblNewDcStartDateSelection', "Disable");
            }
            
            if (OneViewLocalStorage.Get("IsAutoUploadEnabled") == null || OneViewLocalStorage.Get("IsAutoUploadEnabled") == "false") {
                _DOM.AddInnerHtml('lblAutoUpload', "Disable");
                
            }
            else {
                _DOM.AddInnerHtml('lblAutoUpload', "Enable");
            }

            if (OneViewLocalStorage.Get("IsAutoProfileDownloadEnabled") == null || OneViewLocalStorage.Get("IsAutoProfileDownloadEnabled") == "false") {
                _DOM.AddInnerHtml('lblAutolblAutoProfileDownloadUpload', "Disable");

            }
            else {
                _DOM.AddInnerHtml('lblAutoProfileDownload', "Enable");
            }

            if (OneViewLocalStorage.Get("IsAutoActionFollowupDownloadEnabled") == null || OneViewLocalStorage.Get("IsAutoActionFollowupDownloadEnabled") == "false") {
                _DOM.AddInnerHtml('lblAutoActionFollowupDownload', "Disable");

            }
            else {
                _DOM.AddInnerHtml('lblAutoActionFollowupDownload', "Enable");
            }

            if (OneViewLocalStorage.Get("IsAutoSyncEnabled") == 'true') {
                _DOM.AddInnerHtml('lblAutoSync', xlatService.xlat('Enable'));
            }
            else {
                _DOM.AddInnerHtml('lblAutoSync', xlatService.xlat('Disable'));
            }

            if (OneViewLocalStorage.Get("IsAutoMetadataDownload") == 'true') {
                _DOM.AddInnerHtml('lblAutoMetadataDownload', xlatService.xlat('Enable'));
            }
            else {
                _DOM.AddInnerHtml('lblAutoMetadataDownload', xlatService.xlat('Disable'));
            }

            if (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") == null) {
                _DOM.AddInnerHtml('lblEnableGeoLocationValidation', "Disable");
            }
            else {
                if (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") == "true") {
                    _DOM.AddInnerHtml('lblEnableGeoLocationValidation', "Enable");
                    if (OneViewLocalStorage.Get("LocalStorageDistanceSpan") != null) {
                        _DOM.AddInnerHtml('lblDistanceSpan',  OneViewLocalStorage.Get("LocalStorageDistanceSpan") + "(m)&nbsp;&nbsp;&nbsp;");
                    }
                }
                else {
                    _DOM.AddInnerHtml('lblEnableGeoLocationValidation', "Disable");
                }               
            }

            if (OneViewLocalStorage.Get("IsGlobalLandingpagedailysyncEnabled") == null) {
                _DOM.AddInnerHtml('lblLandingpagedailysync', "Disable");
            }
            else {
                if (OneViewLocalStorage.Get("IsGlobalLandingpagedailysyncEnabled") == "true") {
                    _DOM.AddInnerHtml('lblLandingpagedailysync', "Enable");
                }
                else {
                    _DOM.AddInnerHtml('lblLandingpagedailysync', "Disable");
                }
            }

            // Show all settings
            //$scope.settings = [
            //    { title: "Probe Configuration", newpage: true, enabled: true, icon: "ion-thermometer" },
            //    { title: "Auto/Manual Temperature Configuration", enabled: true, badge: true, badgetxt: TemperatureAutoMaualBadgetxt, icon: "ion-edit" },
            //    { title: "My Downloads : Cleaning View", enabled: true, badge: true, badgetxt: CleaningProfiledownloadViewConfiguration, icon: "ion-edit" },
            //    { title: "Conflict Resolve Mode", enabled: true, badge: true, badgetxt: ConflictResolveModeConfiguration, icon: "ion-edit" },
            //    { title: "Copy DB", enabled: true, icon: "ion-gear-a" },
            //    { title: "Upload DB", enabled: true, icon: "ion-gear-a" },
            //    { title: "Upload Logs", enabled: true, icon: "ion-gear-a" },
            //    { title: "Restore DB", enabled: true, icon: "ion-gear-a" },
            //    { title: "ClearAll DC And Actions", enabled: true, icon: "ion-gear-a" },
            //    { title: "Clean DB", enabled: true, icon: "ion-gear-a" },
            //    { title: "Enable Logs", newpage: true, enabled: true, icon: "ion-gear-a" },
            //    { title: "Check For Updates", newpage: true, enabled: true, icon: "ion-gear-a" },
            //    { title: "Refresh Page Globalization", newpage: true, enabled: true, icon: "ion-gear-a" },
            //    { title: "Refresh", newpage: true, enabled: true, icon: "ion-gear-a" },
            //    { title: "Version : OneView " + LocalAppInfo.VersionName, enabled: true, icon: "ion-gear-a" },
            //    { title: "Reset Password", enabled: true, icon: "ion-gear-a" }
            //];

            $scope.settings = [
               { Id: "Setting_ProbeConfiguration_ProbeSynchronize", title: "Probe Configuration", newpage: true, enabled: true, icon: "ion-thermometer" },
               { Id: 'Setting_ProbeConfiguration_TemperatureReading', title: "Auto/Manual Temperature Configuration", enabled: true, badge: true, badgetxt: TemperatureAutoMaualBadgetxt, icon: "ion-edit" },
               { Id: "Setting_Download_CleaningView", title: "My Downloads : Cleaning View", enabled: true, badge: true, badgetxt: CleaningProfiledownloadViewConfiguration, icon: "ion-edit" },
               { Id: "Setting_Application_ConflictResolveMode", title: "Conflict Resolve Mode", enabled: true, badge: true, badgetxt: ConflictResolveModeConfiguration, icon: "ion-edit" },
               { Id: "Setting_Application_GlobalOVGuidChecking", title: "OneView Version Conflict", enabled: true, badge: true, badgetxt: GlobalOVGuidChecking, icon: "ion-edit" },
               { Id: "Setting_Log_EnableLogs", title: "Enable Logs", newpage: true, enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_Log_UploadLogs", title: "Upload Logs", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_DB_CopyDB", title: "Copy DB", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_DB_UploadDB", title: "Upload DB", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_DB_RestoreDB", title: "Restore DB", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_DB_CleanDB", title: "Clean DB", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_DB_CleanDCActions", title: "ClearAll DC And Actions", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_Application_CheckUpdates", title: "Check For Updates", newpage: true, enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_Application_RefreshGlobalization", title: "Refresh Page Globalization", newpage: true, enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_Application_Refresh", title: "Refresh", newpage: true, enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_Version_VersionName", title: "Version : OneView " + LocalAppInfo.VersionName, enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_Profile_ChangePassword", title: "Reset Password", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_StateManagement_NewDc", title: "New Dc State Enable", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_ProbeConfiguration_TempIndicator", title: "Live Temperature Indicator Enable", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_NewDcDateSelectionEnable_DcStartDate", title: "New Dc Page Dc Start Date Selection Enable", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_ShiftSelection", title: "Shift Selection", newpage: true, enabled: true, icon: "ion-thermometer" },
               { Id: "Setting_DB_UploadImagesAndDbAcrossService", title: "Upload Across Service Image and Database", enabled: true, icon: "ion-gear-a" },

               { Id: "Setting_AutoSync_StartSync", title: "Sync", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_AutoMetadataDownload", title: "Auto Master Data Download", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_AutoMasterMetadataDownload", title: "Auto Download", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_Application_GlobalOVGuidChecking", title: "OneView Version Conflict", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_Application_GeoLocationValidation", title: "GeoLocation Validation in landing page", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_Application_Landingpagedailysync", title: "Landing page daily sync", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_MobileAutoSync_Sync", title: "Sync", enabled: true, icon: "ion-gear-a" },
               { Id: "Setting_MobileAutoSync_Refresh", title: "Refresh Mobile Auto Sync Metadata", enabled: true, icon: "ion-gear-a" },
            ];

            //var SettingMetadata = {
            //    "ServiceId": 1,                
            //    "UserId": -1,
            //    "OperationTagList": [
            //        {
            //            "OperationTag": "Setting_ProbeConfiguration_TemperatureReading", Hide: false,

            //        }
            //    ]
            //}
            //for (var Key in SettingMetadata) {
           
            //    if (Key == "OperationTagList") {
            //        if (SettingMetadata[Key].length > 0) {
                       
            //            var _OperationTag = SettingMetadata[Key];
            //            for (var i = 0; i < _OperationTag.length; i++) {
            //                $scope[_OperationTag[i]["OperationTag"] ]= _OperationTag[i]["Hide"];
            //            }
            //        }
            //    }
            //}
            var EventArgs = { GroupId: 'Setting', oScope: $scope };
            var _ACLEnableHandler = new ACLEnableHandler();
            _ACLEnableHandler.handleACLEnableJob(EventArgs);

           

            if (document.getElementById('lblVersion') != null)
                document.getElementById('lblVersion').innerHTML = "OneView " + LocalAppInfo.VersionName;
 
            MyInstance.SetupForOS($scope);
            
            OneViewConsole.Debug("PageLoad End", "SettingsPresenter.PageLoad");
        }

        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("Presenter", "SettingsPresenter.PageLoad", Excep);
        }
        finally {
            TemperatureAutoMaualBadgetxt = null;
            oOneViewAppInfoPlugin = null;
            LocalAppInfo = null;
        }
    }
    
    this.SetupForOS=function($scope)
    {
        if(OSType == OSTypeEnum.IOS)
        {
            //$scope.Setting_ProbeConfiguration=true;
            $scope.Setting_Log=true;
            $scope.Setting_DB_CopyDB=true;
            $scope.Setting_DB_RestoreDB=true;
            $scope.Setting_Application_CheckForUpdates=true;
        }
    }

    /// <summary>
    /// LoadAllPairedDevices
    /// </summary>
    /// <param name="$scope">Current scope</param>
    /// <param name="DeviceLst">List of paired devices</param>
    /// <param name=SettingsObj>selected settings object</param>   
    this.ShowPairedDevices = function ($scope, DeviceLst, SettingsObj) {
        try {
            OneViewConsole.Debug("ShowPairedDevices Start", "SettingsPresenter.ShowPairedDevices");
            // Updating the model with available devices
            for (var i = 0; i < DeviceLst.length; i++) {

                if (ConnectedProbe[0] != undefined) {
                    if (DeviceLst[i].DeviceName == ConnectedProbe[0].Name) {

                        var oBluetoothTemperatureLoggerBO = new BluetoothTemperatureLoggerBO()
                        var IsConnectionAlive = oBluetoothTemperatureLoggerBO.IsConnectionAlive(ConnectedProbe[0].Name);

                        if (IsConnectionAlive)
                            $scope.probes[i + 1] = { "Index": i + 1, "Id": DeviceLst[i].DeviceName, "Name": DeviceLst[i].DeviceName, "selected": 'selected' };
                        else {
                            ConnectedProbe[0] = undefined;
                            $scope.probes[i + 1] = { "Index": i + 1, "Id": DeviceLst[i].DeviceName, "Name": DeviceLst[i].DeviceName };
                        }
                    }
                    else {
                        $scope.probes[i + 1] = { "Index": i + 1, "Id": DeviceLst[i].DeviceName, "Name": DeviceLst[i].DeviceName };
                    }               
                }
                else {
                    $scope.probes[i + 1] = { "Index": i + 1, "Id": DeviceLst[i].DeviceName, "Name": DeviceLst[i].DeviceName };              
                }
            }

            // Show the new page with available devices
            if (SettingsObj.newpage) {
                $scope.settingvisible = false;
                $scope.probevisible = true;
                $scope.BackVisible = true;
                $scope.UpdatePassword = false;

                $scope.Settings = false;
                $scope.ChangePassword = false;
                $scope.SettingsToolBar = true;
                $scope.ProbeList = true;

                $scope.ShiftsVisible = false;
            }
            OneViewConsole.Debug("ShowPairedDevices End", "SettingsPresenter.ShowPairedDevices");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "SettingsPresenter.ShowPairedDevices", Excep);
        }
    }

    this.ShowNewPairedProbeDevices = function ($scope, DeviceLst, SettingsObj) {
        try {
            OneViewConsole.Debug("ShowPairedDevices Start", "SettingsPresenter.ShowPairedDevices");
         
            $scope.probes = {};
            for (var i = 0; i < DeviceLst.length; i++) {
             
                if (ConnectedProbe[0] != undefined) {
                    if (DeviceLst[i].DeviceName == ConnectedProbe[0].Name) {

                        var oBluetoothTemperatureLoggerBO = new BluetoothTemperatureLoggerBO()
                        var IsConnectionAlive = oBluetoothTemperatureLoggerBO.IsConnectionAlive(ConnectedProbe[0].Name,true);

                        if (IsConnectionAlive)
                            $scope.probes[i + 1] = { "Index": i + 1, "Id": DeviceLst[i].DeviceName, "Name": DeviceLst[i].DeviceName, "selected": 'selected' };
                        else {
                            ConnectedProbe[0] = undefined;
                            $scope.probes[i + 1] = { "Index": i + 1, "Id": DeviceLst[i].DeviceName, "Name": DeviceLst[i].DeviceName };
                        }
                    }
                    else {
                        $scope.probes[i + 1] = { "Index": i + 1, "Id": DeviceLst[i].DeviceName, "Name": DeviceLst[i].DeviceName };
                    }
                }
                else {

                    $scope.probes[i + 1] = { "Index": i + 1, "Id": DeviceLst[i].DeviceName, "Name": DeviceLst[i].DeviceName, "selected": '' };
                    $scope.probes[i + 1].selected = '';
                   
                }
            }

            // Show the new page with available devices
            if (SettingsObj.newpage) {
                $scope.settingvisible = false;
                $scope.NewProbevisible = true;
                $scope.probevisible = false;
                $scope.BackVisible = true;
                $scope.UpdatePassword = false;

                $scope.Settings = false;
                $scope.ChangePassword = false;
                $scope.SettingsToolBar = true;
                $scope.ProbeList = true;

                $scope.ShiftsVisible = false;
            }
            OneViewConsole.Debug("ShowPairedDevices End", "SettingsPresenter.ShowPairedDevices");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "SettingsPresenter.ShowPairedDevices", Excep);
        }
    }


    /// <summary>
    /// SaveSelectedDevice
    /// </summary>
    /// <param name="probeObj">Probe info</param>   
    this.SaveSelectedDevice = function (probeObj) {
        try {
            OneViewConsole.Debug("SaveSelectedDevice Start", "SettingsPresenter.SaveSelectedDevice");
            //Selected probe information
            ConnectedProbe[0] = { "Index": probeObj.Index, "Id": probeObj.Name, "Name": probeObj.Name };

            OneViewConsole.Debug("SaveSelectedDevice End", "SettingsPresenter.SaveSelectedDevice");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "SettingsPresenter.SaveSelectedDevice", Excep);
        }
    }

    /// <summary>
    /// UpdateProbeDisconnectStatus
    /// </summary>
    /// <param name="$scope">Current scope</param>   
    /// <param name="probeObj">Probe info</param>   
    this.UpdateProbeDisconnectStatus = function ($scope, probeObj) {
        try {
            OneViewConsole.Debug("UpdateProbeDisconnectStatus Start", "SettingsPresenter.UpdateProbeDisconnectStatus");

            $scope.probes[probeObj.Index].selected = '';

            OneViewConsole.Debug("UpdateProbeDisconnectStatus End", "SettingsPresenter.UpdateProbeDisconnectStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "SettingsPresenter.UpdateProbeDisconnectStatus", Excep);
        }
    }

    /// <summary>
    /// UpdateProbeDisconnectStatus
    /// </summary>
    /// <param name="$scope">Current scope</param>   
    /// <param name="probeObj">Probe info</param>   
    this.UpdateNewProbeDisconnectStatus = function ($scope, probeObj) {
        try {
            OneViewConsole.Debug("UpdateNewProbeDisconnectStatus Start", "SettingsPresenter.UpdateNewProbeDisconnectStatus");

            $scope.probes[probeObj.Index].selected = '';

            OneViewConsole.Debug("UpdateNewProbeDisconnectStatus End", "SettingsPresenter.UpdateNewProbeDisconnectStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "SettingsPresenter.UpdateNewProbeDisconnectStatus", Excep);
        }
    }

    /// <summary>
    /// UpdateProbeSelectedStatus
    /// </summary>
    /// <param name="$scope">Current scope</param>   
    /// <param name="probeObj">Probe info</param>   
    this.UpdateProbeSelectedStatus = function ($scope, probeObj) {
        try {
            OneViewConsole.Debug("UpdateProbeSelectedStatus Start", "SettingsPresenter.UpdateProbeSelectedStatus");

            $scope.probes[probeObj.Index].selected = 'selected';

            OneViewConsole.Debug("UpdateProbeSelectedStatus End", "SettingsPresenter.UpdateProbeSelectedStatus");
          
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "SettingsPresenter.UpdateProbeSelectedStatus", Excep);
        }
    }



    this.ShowAllValidShifts = function ($scope, ShiftsList, SettingsObj) {
        try {
            OneViewConsole.Debug("ShowAllValidShifts Start", "SettingsPresenter.ShowAllValidShifts");
            //alert('ShiftsList : ' + JSON.stringify(ShiftsList));
            // Updating the model with available data
            //for (var i = 0; i < ShiftsList.length; i++) {
            //    $scope.ShiftsData[ShiftsList[i].ServerId] = { "Index": ShiftsList[i].ServerId, "Id": ShiftsList[i].ServerId, "Name": ShiftsList[i].Name };
            //}

            var Data = OneViewLocalStorage.Get("SelectedShiftData");
            //alert(Data + "," + JSON.stringify(Data));
            if (Data != "" && Data != null && Data != undefined) {
                SelectedShiftData = JSON.parse(Data);
            }
            //alert(SelectedShiftData + 'SelectedShiftData : ' + JSON.stringify(SelectedShiftData));
            for (var i = 0; i < ShiftsList.length; i++) {
                if (SelectedShiftData != undefined) {
                    if (ShiftsList[i].Name == SelectedShiftData.Name) {
                        $scope.ShiftsData[ShiftsList[i].ServerId] = { "Index": ShiftsList[i].ServerId, "Id": ShiftsList[i].ServerId, "Name": ShiftsList[i].Name, "selected": 'selected' };

                    }
                    else {
                        $scope.ShiftsData[ShiftsList[i].ServerId] = { "Index": ShiftsList[i].ServerId, "Id": ShiftsList[i].ServerId, "Name": ShiftsList[i].Name };
                    }
                }
                else {
                    $scope.ShiftsData[ShiftsList[i].ServerId] = { "Index": ShiftsList[i].ServerId, "Id": ShiftsList[i].ServerId, "Name": ShiftsList[i].Name };
                }
            }

            // Show the new page with available devices
            if (SettingsObj.newpage) {
                $scope.settingvisible = false;
                $scope.probevisible = false;
                $scope.NewProbevisible = false;
                $scope.BackVisible = true;
                $scope.UpdatePassword = false;

                $scope.Settings = false;
                $scope.ChangePassword = false;
                $scope.SettingsToolBar = true;
                $scope.ProbeList = true;

                $scope.ShiftsVisible = true;
            }
            OneViewConsole.Debug("ShowAllValidShifts End", "SettingsPresenter.ShowAllValidShifts");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "SettingsPresenter.ShowAllValidShifts", Excep);
        }
    }
      

    /// <summary>
    /// SaveSelectedShift
    /// </summary>
    /// <param name="shiftObj">Shift info</param>   
    this.SaveSelectedShift = function (shiftObj) {
        try {
            OneViewConsole.Debug("SaveSelectedShift Start", "SettingsPresenter.SaveSelectedShift");
            //alert('shiftObj :' + JSON.stringify(shiftObj));
            //Selected shift information

            if (shiftObj.selected == true) {
                SelectedShiftData = { "Index": shiftObj.Index, "Id": shiftObj.Id, "Name": shiftObj.Name };
            }
            else {
                SelectedShiftData = {};
            }
            //alert('SelectedShiftData' + JSON.stringify(SelectedShiftData));
            OneViewLocalStorage.Save("SelectedShiftData", JSON.stringify(SelectedShiftData));

            OneViewConsole.Debug("SaveSelectedShift End", "SettingsPresenter.SaveSelectedShift");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "SettingsPresenter.SaveSelectedShift", Excep);
        }
    }

}

function SettingsBO() {

    //################# auto /Manual Status Start ####################
    
    this.ShowAutoManualStatus = function (oScope) {
        try {
            OneViewConsole.Debug("ShowAutoManualStatus start", "SettingsBO.ShowAutoManualStatus");
            
            this.UpdateManualPinValidityStatus();

            if (IsGlobalAutoTemperatureManualAllowed == false) {
                if (oScope != null) {
                    oScope.Status = 'Auto';
                }
            }
            else
                if (oScope != null) {
                    oScope.Status = 'Manual';
                }

            OneViewConsole.Debug("ShowAutoManualStatus end", "SettingsBO.ShowAutoManualStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.ShowAutoManualStatus", Excep);
        }
    }

    //################# auto /Manual Status End ####################

    this.ProbeStatus = function (toaster, xlatService) {
        try {
            OneViewConsole.Debug("ProbeStatus Start", "SettingsBO.ProbeStatus");
            
            if (ConnectedProbe[0] != undefined) {
                //  alert($scope.NewProbes);
                if (IsNewProbe == true) {
                    //   alert('New Probe');
                    var oBluetoothTemperatureLoggerBO = new BluetoothTemperatureLoggerBO()
                    var IsConnectionAlive = oBluetoothTemperatureLoggerBO.IsConnectionAlive(ConnectedProbe[0].Name,true);
                    if (IsConnectionAlive == false) {
                        //// alert("Probe" + ConnectedProbe[0].Name + " is disconnected ,please go to  settings page and reconnect the probe");
                        var msg = xlatService.xlat('Probe') + " " + ConnectedProbe[0].Name + " " + xlatService.xlat('ProbeConnectionLost');
                        // toaster.pop('info', xlatService.xlat('Title_Notification'), msg);
                        alert(msg);
                    }
                    else {
                        //// alert("Probe" + ConnectedProbe[0].Name + " is connected , go ahead");
                        var msg = xlatService.xlat('Probe') + " " + ConnectedProbe[0].Name + " " + xlatService.xlat('ProbeConnected');
                        // toaster.pop('success', xlatService.xlat('Title_Success'), msg);
                        alert(msg);
                    }
                }
                else {
                    var oBluetoothTemperatureLoggerBO = new BluetoothTemperatureLoggerBO()
                    var IsConnectionAlive = oBluetoothTemperatureLoggerBO.IsConnectionAlive(ConnectedProbe[0].Name);
                    if (IsConnectionAlive == false) {
                        //// alert("Probe" + ConnectedProbe[0].Name + " is disconnected ,please go to  settings page and reconnect the probe");
                        var msg = xlatService.xlat('Probe') + " " + ConnectedProbe[0].Name + " " + xlatService.xlat('ProbeConnectionLost');
                        // toaster.pop('info', xlatService.xlat('Title_Notification'), msg);
                        alert(msg);
                    }
                    else {
                        //// alert("Probe" + ConnectedProbe[0].Name + " is connected , go ahead");
                        var msg = xlatService.xlat('Probe') + " " + ConnectedProbe[0].Name + " " + xlatService.xlat('ProbeConnected');
                        // toaster.pop('success', xlatService.xlat('Title_Success'), msg);
                        alert(msg);
                    }
                }
              
            }
            else {
                ////alert("No Probe is connected ,please go to  settings page and connect the probe");
                var msg = xlatService.xlat('ProbeConnectionLostOrNoProbe');
                // toaster.pop('warning', xlatService.xlat('Title_Notification'), msg);
                alert(msg);

                var obj = document.getElementById('txtTemperatureLoggerControlId');
                if (obj != null) {
                    obj.innerHTML = "00.0000";
                }
            }
            OneViewConsole.Debug("ProbeStatus End", "SettingsBO.ProbeStatus");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.ProbeStatus", Excep);
        }
        finally {
            oBluetoothTemperatureLoggerBO = null;
            IsConnectionAlive = null;
            msg = null;
        }
    }


    this.RefreshCloudManagerBO = function (xlatService) {
        try {
            OneViewConsole.Debug("RefreshCloudManagerBO Start", "SettingsBO.RefreshCloudManagerBO");

            var IsSuccess = false;
            oOneViewProgressbar.Start("Refreshing CloudManager");

            oOneViewProgressbar.SetProgressValue(50);
            var _oCloudManagerBO = new CloudManagerBO(xlatService);
            var CloudManagerResponse = [];

            _oCloudManagerBO.GetAllServicesByUserIdFromServer();
            IsSuccess = true;
            oOneViewProgressbar.SetProgressValue(100);
           
            oOneViewProgressbar.Stop();
            return IsSuccess;
            OneViewConsole.Debug("RefreshCloudManagerBO End", "SettingsBO.RefreshCloudManagerBO");

        }
        catch (Excep) {

            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.RefreshMetadataConfigurationBO", Excep);
        }

    }


    this.RefreshMetadataConfigurationBO = function (xlatService, $scope, $compile) {
        try {
            OneViewConsole.Debug("RefreshMetadataConfigurationBO Start", "SettingsBO.RefreshMetadataConfigurationBO");

            var IsSuccess = false;
            oOneViewProgressbar.Start("Refreshing Configuration");
           
       
            var PageIds = [];
            var _oDefaultPageConfigMetaDataBO = new DefaultPageConfigMetaDataBO(xlatService);
            var IsPageConfigMetaDataSuccess = _oDefaultPageConfigMetaDataBO.Download(PageIds);
      
            if (IsPageConfigMetaDataSuccess == true) {
                oOneViewProgressbar.SetProgressValue(20);
                var _oACLConfigMetaDataBO = new ACLConfigMetaDataBO(xlatService);
                var IsACLConfigMetaDataSuccess = _oACLConfigMetaDataBO.Download();
       
                if (IsACLConfigMetaDataSuccess == true) {
                    oOneViewProgressbar.SetProgressValue(30);
                    var _oMenuConfigMetaDataBO = new MenuConfigMetaDataBO(xlatService);
                    var MenuConfigMetaDataSuccess = _oMenuConfigMetaDataBO.Download();
                  
                    if (MenuConfigMetaDataSuccess == true) {
                        oOneViewProgressbar.SetProgressValue(40);
                        var _oRouterConfigMetaDataBO = new RouterConfigMetaDataBO(xlatService);
                        var RouterConfigMetaDatasuccess = _oRouterConfigMetaDataBO.Download();
                    
                        if (RouterConfigMetaDatasuccess == true) {
                            oOneViewProgressbar.SetProgressValue(50);
                            var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(xlatService);
                            var GlobalizationMetdataSuccess = _oGlobalizationMetadataBO.DownloadPageWiseMetadata(true);
                         
                            if (GlobalizationMetdataSuccess == true) {

                                oOneViewProgressbar.SetProgressValue(60);

                                GlobalizationMetadata = {};

                                //GetMetadata for static pages from Db
                                var oGlobalizationComponent = new GlobalizationComponent();
                                var MetaDataList = oGlobalizationComponent.LoadLocalizedMetadata(OneViewStaticPageList);
                              
                                oOneViewProgressbar.SetProgressValue(75);

                                //Form metadata to required structure
                                oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, OneViewGlobalcurrentLanguage);


                                // Router Resetting
                                var _oOneViewRouterComponet = new OneViewRouterComponet();
                                _oOneViewRouterComponet.ResetRouter();

                                // Menu Loading
                                var _oDefaultMenuComponent = new DefaultMenuComponent();
                                _oDefaultMenuComponent.ResetMenu($scope, $compile);

                                //Settings page Reseting

                                var EventArgs = { GroupId: 'Setting', oScope: $scope };
                                var _ACLEnableHandler = new ACLEnableHandler();
                                _ACLEnableHandler.handleACLEnableJob(EventArgs);
                                                               
                               
                                // Resetting Band, TemplateMetada, and DAT Entities
                                var _RefreshMetadataHandler = new RefreshMetadataHandler(xlatService);
                                _RefreshMetadataHandler.Refresh();
                               
                                oOneViewProgressbar.SetProgressValue(100);
                                IsSuccess = true;

                               
                              
                            }
                        }

                    }
                }
            }
            oOneViewProgressbar.Stop();
            return IsSuccess;
            OneViewConsole.Debug("RefreshMetadataConfigurationBO End", "SettingsBO.RefreshMetadataConfigurationBO");

        }
        catch (Excep) {
            
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.RefreshMetadataConfigurationBO", Excep);
        }
       
    }


    this.RefreshDATEntityTypesBO = function (xlatService) {
        try {
            OneViewConsole.Debug("RefreshDATEntityTypesBO Start", "SettingsBO.RefreshDATEntityTypesBO");

            var IsSuccess = false;
            oOneViewProgressbar.Start("Refreshing DATEntity Types");

            oOneViewProgressbar.SetProgressValue(50);

            var _oDATEntityTypesBO = new DATEntityTypesBO(xlatService); 
            var _oDATEntityTypessuccess = _oDATEntityTypesBO.Download();

            IsSuccess = true;
            oOneViewProgressbar.SetProgressValue(100);

            oOneViewProgressbar.Stop();
            return IsSuccess;
            OneViewConsole.Debug("RefreshDATEntityTypesBO End", "SettingsBO.RefreshDATEntityTypesBO");

        }
        catch (Excep) {

            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.RefreshDATEntityTypesBO", Excep);
        }

    }

    this.RefreshMobileAutoSyncMetadata = function (xlatService) {
        try {
            OneViewConsole.Debug("RefreshMobileAutoSyncMetadata Start", "SettingsBO.RefreshMobileAutoSyncMetadata");

            var IsSuccess = false;
            oOneViewProgressbar.Start(xlatService.xlat("Refreshing Mobile Auto Sync Metadata Types"));

            oOneViewProgressbar.SetProgressValue(50);

            var _oDefaultMasterDAO = new DefaultMasterDAO("BusinessEventEntity");
            var IsExist = _oDefaultMasterDAO.IsTableExist();

            if (IsExist == true) {
                OneViewLocalStorage.Remove("AutoDownloadMetadataForBE");
                var _oMobileAutoSyncMetadataDownloadBO = new MobileAutoSyncMetadataDownloadBO(xlatService);
                var _oMobileAutoSyncMetadataSuccess = _oMobileAutoSyncMetadataDownloadBO.Download();

                var _oBusinessEventFramework = new BusinessEventFramework();
                _oBusinessEventFramework.GenerateAutoDownloadMetadataForBE();
            }
            IsSuccess = true;

            oOneViewProgressbar.SetProgressValue(100);

            oOneViewProgressbar.Stop();

            OneViewConsole.Debug("RefreshMobileAutoSyncMetadata End", "SettingsBO.RefreshMobileAutoSyncMetadata");

            return IsSuccess;

        }
        catch (Excep) {

            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.RefreshMobileAutoSyncMetadata", Excep);
        }

    }

    this.IsAutoManualPinValidationRequired = function (oScope) {
        try {
            OneViewConsole.Debug("ShowAutoManualStatus start", "SettingsBO.ShowAutoManualStatus");

            var IsValidationRequired = false;
           
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var _MobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();
            var BusinessEventDetails = _MobileAutoSyncMetadataDAO.GetBusinessEventEntityByServiceAndUserId(ServiceId, LoginUserId);
       
            if (BusinessEventDetails.length > 0) {

                for (var i = 0; i < BusinessEventDetails.length ; i++) {

                    if (BusinessEventDetails[i].ClassName == "SettingsBO" && BusinessEventDetails[i].MethodName == "IsAutoManualPinValidationRequired") {

                        var BusinessEventHandlers = BusinessEventDetails[i].BusinessEventHandlers;

                        for (var b = 0; b < BusinessEventHandlers.length; b++) {
                            var BusinessEventHandlerObjectKeys = BusinessEventHandlers[b].BusinessEventHandlerObjectKeys;

                            for (var j = 0; j < BusinessEventHandlerObjectKeys.length; j++) {

                                if (IsGlobalAutoTemperatureManualAllowed == true) {
                                    if (BusinessEventHandlerObjectKeys[j] == "ValidatePinForAutoTempReading") {
                                        IsValidationRequired = true;
                                        break;
                                    }
                                }
                                else {
                                  
                                    if (BusinessEventHandlerObjectKeys[j] == "ValidatePinForManualTempReading") {
                                        IsValidationRequired = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }

                }
            }
            else {             
                this.DeleteManualPinValidationDetailsFromLocalbyUser();
            }

            OneViewConsole.Debug("ShowAutoManualStatus end", "SettingsBO.ShowAutoManualStatus");
           
            return IsValidationRequired;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.ShowAutoManualStatus", Excep);
        }
    }

    this.IsPinValid = function (Pin,$scope, xlatService) {
        try {
            OneViewConsole.Debug("IsPinValid start", "SettingsBO.IsPinValid");
        
            var IsPinValidationSuccess = true;
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var ManualPinValidityDetailsResponse = this.GetManualPinValidityStatus({ "LoginUserId": LoginUserId, "ServiceId": ServiceId, "$scope": $scope, "xlatService": xlatService });
            if (ManualPinValidityDetailsResponse != null) {
                ManualPinValidityDetailsResponse =JSON.parse(ManualPinValidityDetailsResponse.GetManualPinDetails_JsonResult);
            }

            if (ManualPinValidityDetailsResponse != null && ManualPinValidityDetailsResponse.isAnyException == false) {

                if (Pin === ManualPinValidityDetailsResponse.PIN) {

                    var oDateTime = new DateTime();
                    CurrentDateAndTime = oDateTime.GetDateAndTime();               
              
                    var ManualPinValidationDetails = {};

                    if (OneViewLocalStorage.Get("ManualPinValidationDetails") != null) {
                        ManualPinValidationDetails = JSON.parse(OneViewLocalStorage.Get("ManualPinValidationDetails"));
                    }

                    if (ManualPinValidationDetails[ServiceId + "_" + LoginUserId] == undefined) {
                        //var CurrentDateAndTime1 = new Date();
                   
                        ManualPinValidationDetails[ServiceId + "_" + LoginUserId] = { ValidityPeriod: ManualPinValidityDetailsResponse.ValidityPeriod, ValidityType: ManualPinValidityDetailsResponse.ManualPinDetailValidatity, ValidityStartTime: CurrentDateAndTime };
                        
                        OneViewLocalStorage.Save("ManualPinValidationDetails", JSON.stringify(ManualPinValidationDetails));
                   
                    }
                    else {
                      //  var CurrentDateAndTime1 = new Date();
                        ManualPinValidationDetails[ServiceId + "_" + LoginUserId].ValidityPeriod = ManualPinValidityDetailsResponse.ValidityPeriod;
                        ManualPinValidationDetails[ServiceId + "_" + LoginUserId].ValidityType = ManualPinValidityDetailsResponse.ManualPinDetailValidatity;
                        ManualPinValidationDetails[ServiceId + "_" + LoginUserId].ValidityStartTime = CurrentDateAndTime;
                    }

                    
                }
                else {
                    IsPinValidationSuccess = false;                    
                }
            }                
            else if (ManualPinValidityDetailsResponse != null && ManualPinValidityDetailsResponse.isAnyException == true) {
                alert(xlatService.xlat('ER-CU-MSE-001 ::Server error, Please contact Administrator'));
            }


            OneViewConsole.Debug("IsPinValid end", "SettingsBO.IsPinValid");

            return IsPinValidationSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.IsPinValid", Excep);
        }
    }

    this.GetManualPinValidityStatus = function (Req) {
        try {
            OneViewConsole.Debug("GetManualPinValidityStatus start", "SettingsBO.GetManualPinValidityStatus");

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "SettingsBO.ResetPassword");
            var $scope=Req.$scope;
            var xlatService = Req.xlatService;

            var ManualPinDetailsresponse = null;


            if (NetworkStatus.IsNetworkAvailable == true) {

                oSetDefaultSpinner.Start();

                var _oSettingsIL = new SettingsIL();
                var RequestParam = { "OSGuid": Req.ServiceId, "UserId": Req.LoginUserId };
                ManualPinDetailsresponse = _oSettingsIL.GetManualPinDetails(RequestParam);             

                oSetDefaultSpinner.Stop();
            }
            else {
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No Internet Connection", "SettingsBO.GetManualPinValidityStatus");
            }

            OneViewConsole.Debug("GetManualPinValidityStatus end", "SettingsBO.GetManualPinValidityStatus");
            return ManualPinDetailsresponse;
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.GetManualPinValidityStatus", Excep);
        }
    }

    this.UpdateManualPinValidityStatus = function () {
        try {
            OneViewConsole.Debug("UpdateManualPinValidityStatus start", "SettingsBO.UpdateManualPinValidityStatus");

            var Response = this.ManualPinValidityStatusHandler();

            if (Response.IsValid) {
                IsGlobalAutoTemperatureManualAllowed = true;
            }
      
            OneViewConsole.Debug("UpdateManualPinValidityStatus start", "SettingsBO.UpdateManualPinValidityStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.ManualPinValidityStatus", Excep);
        }
    }

    this.ManualPinValidityStatusHandler = function () {
        try {
            OneViewConsole.Debug("ManualPinValidityStatusHandler start", "SettingsBO.ManualPinValidityStatusHandler");

            var Response = {IsValid:false};

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            if (OneViewLocalStorage.Get("ManualPinValidationDetails") != null) {

                var ManualPinValidationDetails = JSON.parse(OneViewLocalStorage.Get("ManualPinValidationDetails"));

                if (ManualPinValidationDetails[ServiceId + "_" + LoginUserId] != undefined) {
                    //var PinValidityPeriod = ManualPinValidationDetails[ServiceId + "_" + LoginUserId].ValidityPeriod;
                    var _IsManualValidationPinIsActive = IsManualValidationPinIsActive();
                    if (_IsManualValidationPinIsActive==true) {
                        Response.IsValid = true;
                    }
                    else {             
                        IsGlobalAutoTemperatureManualAllowed = false;
                        this.DeleteManualPinValidationDetailsFromLocalbyUser();
                    }
                }

            }

            OneViewConsole.Debug("ManualPinValidityStatusHandler start", "SettingsBO.ManualPinValidityStatusHandler");
            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.ManualPinValidityStatusHandler", Excep);
        }
    }

    var IsManualValidationPinIsActive = function (Pin) {
        try {
            OneViewConsole.Debug("IsManualValidationPinIsActive start", "SettingsBO.IsManualValidationPinIsActive");

            var IsPinActive = true;
         
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
            //   ManualPinValidationDetails[ServiceId + "_" + LoginUserId] = { PinValidityPeriod: ManualPinValidityDetailsResponse.ValidityPeriod, ValidityType: ManualPinValidityDetailsResponse.ValidityType };
            if (OneViewLocalStorage.Get("ManualPinValidationDetails") != null) {
               // alert("ManualPinValidationDetails : " + OneViewLocalStorage.Get("ManualPinValidationDetails"));        
          
                var ManualPinValidationDetails = JSON.parse(OneViewLocalStorage.Get("ManualPinValidationDetails"));

                if (ManualPinValidationDetails[ServiceId + "_" + LoginUserId] != undefined) {

                    var ValidityType = ManualPinValidationDetails[ServiceId + "_" + LoginUserId].ValidityType;

                    if (ValidityType == 1)//Hour
                    //if (ValidityType == "Hour")
                    {
                        var ValidityPeriod = ManualPinValidationDetails[ServiceId + "_" + LoginUserId].ValidityPeriod;                        
                        var ValidityStartDateAndTime = ManualPinValidationDetails[ServiceId + "_" + LoginUserId].ValidityStartTime;                      

                        var ValidityPeriodAndTime = GetValidityPeriodAndTime(ValidityPeriod, ValidityStartDateAndTime);

                        var oDateTime = new DateTime();                      
                        var CurrentDate = oDateTime.GetDateAndTime();
                    
                        var intValidityPeriodAndTime = oDateTime.ConvertDateTimeToInteger(ValidityPeriodAndTime);
                        var intCurrentDate = oDateTime.ConvertDateTimeToInteger(CurrentDate);

                        if (intValidityPeriodAndTime < intCurrentDate) {
                            IsPinActive = false;
                        }
                     
                    }
                }
            }

            return IsPinActive;

            OneViewConsole.Debug("IsManualValidationPinIsActive start", "SettingsBO.IsManualValidationPinIsActive");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.IsManualValidationPinIsActive", Excep);
        }
    }

    var GetValidityPeriodAndTime = function (ValidityPeriod, ValidityStartTime) {
        try {
            OneViewConsole.Debug("GetValidityPeriodAndTime start", "SettingsBO.GetValidityPeriodAndTime");

            var m_names = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");

            //var d = new Date();

            var _DateTime = new DateTime();
            var d = _DateTime.GetDateByString(ValidityStartTime);

            //var d = Date.parse(ValidityStartDateTime);
            d.setHours(d.getHours() +parseInt(ValidityPeriod));

            var curr_date = d.getDate();
            curr_date = (curr_date <= 9) ? ("0" + curr_date) : curr_date;

            var curr_month = d.getMonth();
            //curr_month = (curr_month < 9) ? ("0" + curr_month) : curr_month;

            var curr_year = d.getFullYear();
            //curr_year = (curr_year < 9) ? ("0" + curr_year) : curr_year;

            var Curr_hours = d.getHours();
            Curr_hours = (Curr_hours <= 9) ? ("0" + Curr_hours) : Curr_hours;

            var Curr_minutes = d.getMinutes();
            Curr_minutes = (Curr_minutes <= 9) ? ("0" + Curr_minutes) : Curr_minutes;

            var Curr_seconds = d.getSeconds();
            Curr_seconds = (Curr_seconds <= 9) ? ("0" + Curr_seconds) : Curr_seconds;


            var Cuur_Time = Curr_hours + ":" + Curr_minutes + ":" + Curr_seconds;
            var ValidityPeriodAndTime = curr_date + "-" + m_names[curr_month] + "-" + curr_year + " " + Cuur_Time;


            OneViewConsole.Debug("GetValidityPeriodAndTime start", "SettingsBO.GetValidityPeriodAndTime");

            return ValidityPeriodAndTime;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.IsManualValidationPinIsActive", Excep);
        }
    }

    this.DeleteManualPinValidationDetailsFromLocalbyUser = function () {
        try {
            OneViewConsole.Debug("DeleteManualPinValidationDetailsFromLocalbyUser start", "SettingsBO.DeleteManualPinValidationDetailsFromLocalbyUser");

            if (OneViewLocalStorage.Get("ManualPinValidationDetails") != null) {
         
                var ServiceId = OneViewSessionStorage.Get("ServiceId");
                var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
             
                var ManualPinValidationDetails = JSON.parse(OneViewLocalStorage.Get("ManualPinValidationDetails"));
                if (ManualPinValidationDetails[ServiceId + "_" + LoginUserId] != undefined) {
                    OneViewLocalStorage.Remove("ManualPinValidationDetails");
                    delete ManualPinValidationDetails[ServiceId + "_" + LoginUserId];
                    OneViewLocalStorage.Save("ManualPinValidationDetails", JSON.stringify(ManualPinValidationDetails));
                }
            }

            OneViewConsole.Debug("DeleteManualPinValidationDetailsFromLocalbyUser start", "SettingsBO.DeleteManualPinValidationDetailsFromLocalbyUser");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SettingsBO.DeleteManualPinValidationDetailsFromLocalbyUser", Excep);
        }
    }
}


function StateManagementComponent(xlatService) {

    var MyInstance = this;

    this.GetAndUpdatePageState = function (PageStateKey) {
        try {
            OneViewConsole.Debug("GetAndUpdatePageState end", "StateManagementComponent.GetAndUpdatePageState");


            if (PageStateKey == "Setting_StateManagement_NewDc") {
                //alert('IsGlobal_NewDc_StateManagementEnabled : ' + IsGlobal_NewDc_StateManagementEnabled);
                var DisplayString = "";
                var Message = "";
                var TitleMsg = xlatService.xlat('NewDcState_Confirm_Title');
                if (IsGlobal_NewDc_StateManagementEnabled == true) {
                    DisplayString = "Disable";
                    Message = xlatService.xlat('NewDcState_Confirm_Disable_Message');
                }
                else {
                    DisplayString = "Enable";
                    Message = xlatService.xlat('NewDcState_Confirm_Enable_Message');
                }
                MyInstance.CheckAndEnableState(PageStateKey, IsGlobal_NewDc_StateManagementEnabled, 'lblNewDcState', DisplayString, TitleMsg, Message);

            }

            OneViewConsole.Debug("GetAndUpdatePageState end", "StateManagementComponent.GetAndUpdatePageState");
        }
        catch (Excep) {
            // alert('GetAndUpdatePageState Excep : ' + Excep);
            throw oOneViewExceptionHandler.Create("BO", "StateManagementComponent.GetAndUpdatePageState", Excep);

        }
    }



    this.CheckAndEnableState = function (PageStateKey, IsEnableState, DomId, DisplayString, TitleMsg, Message) {
        try {
            OneViewConsole.Debug("CheckAndEnableState end", "StateManagementComponent.CheckAndEnableState");

            var _DOM = new DOM();
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            if (IsEnableState == true) {

                oOneViewCordovaPlugin.DefaultConfirmBox(TitleMsg, Message, function (ConfirmationId) {
                    if (ConfirmationId == "2") {
                        IsEnableState = false;
                        MyInstance.SetStateVariable(PageStateKey, IsEnableState);
                        _DOM.AddInnerHtml(DomId, DisplayString);
                    }
                });
            }
            else {
                oOneViewCordovaPlugin.DefaultConfirmBox(TitleMsg, Message, function (ConfirmationId) {
                    if (ConfirmationId == "2") {
                        IsEnableState = true;
                        MyInstance.SetStateVariable(PageStateKey, IsEnableState);
                        _DOM.AddInnerHtml(DomId, DisplayString);
                    }
                });
            }



            OneViewConsole.Debug("CheckAndEnableState end", "StateManagementComponent.CheckAndEnableState");


        }
        catch (Excep) {
            //alert('CheckAndEnableState Excep : ' + Excep);
            throw oOneViewExceptionHandler.Create("BO", "StateManagementComponent.CheckAndEnableState", Excep);

        }

    }


    this.SetStateVariable = function (PageStateKey, IsEnableState) {
        try {
            if (PageStateKey == "Setting_StateManagement_NewDc") {
                IsGlobal_NewDc_StateManagementEnabled = IsEnableState;
            }
        }
        catch (Excep) {
            //alert('CheckAndEnableState Excep : ' + Excep);
            throw oOneViewExceptionHandler.Create("BO", "StateManagementComponent.CheckAndEnableState", Excep);

        }
    }


}

// SettingsIL
function SettingsIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// Ajax call for Reset Password
    /// </summary>
    /// <param name="UserId">UserId</param>
    /// <param name="ServiceId">ServiceId</param>
    /// <returns>_oManualPinDetailsresponse:{Pin:'123',ValidityPeriod:'24',ValidityType:Hour}</returns>//ValidityType:(Hour,Day,Month,year)
    this.GetManualPinDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetManualPinDetails start", "UserMasterIL.GetProfileDcPlaceView");
            debugger;
            //{ "OSGuid": Req.ServiceId, "UserId": Req.LoginUserId }
            var RequestParam = { "OSGuid": Req.OSGuid, "UserId": Req.UserId };
            
            OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "SettingsIL.GetManualPinDetails");
           
            var _oOneViewChannel = new OneViewChannel();
      
               _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetManualPinDetails_Json";
           // _oOneViewChannel.url = "http://169.254.80.80:8090/Oneviewdev/Service/UserProfileFacedService.svc/GetManualPinDetails_Json";
            _oOneViewChannel.parameter = JSON.stringify(RequestParam);
            var _oManualPinDetailsresponse = _oOneViewChannel.Send();

            OneViewConsole.Debug("GetProfileDcPlaceView end", "UserMasterIL.ResetPassword");

            if (_oManualPinDetailsresponse != null) {

                OneViewConsole.DataLog("Response from server : " + JSON.stringify(_oManualPinDetailsresponse), "UserMasterIL.ResetPassword");
                //_oManualPinDetailsresponse = JSON.parse(_oManualPinDetailsresponse);

                return _oManualPinDetailsresponse;
            }
            else {
                return _oManualPinDetailsresponse;
            }
            

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "SettingsIL.GetManualPinDetails", Excep);
        }
    }

}



