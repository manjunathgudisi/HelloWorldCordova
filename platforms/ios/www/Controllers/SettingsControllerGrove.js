
// Global variable for saving selected probe
var ConnectedProbe = {};


/// <summary>
/// Settings controller (For event registration)
/// </summary>
MyApp.controller('SettingsCtrl', function ($scope, $location, xlatService, $timeout) {
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
        _oSettingsFacade.SettingsOnChange($scope, SettingsObj, xlatService, '', '');
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
        this.SettingsOnChange = function ($scope, SettingsObj, xlatService, toaster, SpinService) {
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

                        oOneViewProgressbar.Start("Refreshing OneView Updates");

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
                            oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, 'en-us');

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
                            oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, 'en-us');

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


        var LoadAllLogVariables = function ($scope, SettingsObj, xlatService, toaster) {
            try {
                OneViewConsole.Debug("LoadAllLogVariables Start", "SettingsFacade.LoadAllLogVariables");

                $scope.LogVariableList = [
                                         { "Id": 1, "Name": "IsDataLogModeEnabled", "selected": IsDataLogModeEnabled },
                                         { "Id": 2, "Name": "IsDebugModeEnabled", "selected": IsDebugModeEnabled },
                                         { "Id": 3, "Name": "IsInfoModeEnabled", "selected": IsInfoModeEnabled },
                                         { "Id": 4, "Name": "IsWarnModeEnabled", "selected": IsWarnModeEnabled },
                                         { "Id": 5, "Name": "IsFatalModeEnabled", "selected": IsFatalModeEnabled }
                ];

                if (SettingsObj.newpage) {
                    $scope.settingvisible = false;
                    $scope.probevisible = false;
                    $scope.LogsVisible = true;
                    $scope.BackVisible = true;
                    $scope.UpdatePassword = false;
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

    
}


function BluetoothTemperatureLoggerBO() {

    this.IsConnectionAlive = function (DeviceName) {
        try {
            OneViewConsole.Debug("IsConnectionAlive Start", "BluetoothTemperatureLoggerBO.IsConnectionAlive");

            var oTemperature = oGlobalOneViewBluetoothTemperatureLoggerPlugin.GetTemperature(DeviceName, "BlueThermProbe");
            // alert('oTemperature : ' + JSON.stringify(oTemperature));


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

    /// <summary>
    /// LoadAllPairedDevices
    /// </summary>
    /// <param name="$scope">Current scope</param>
    /// <param name="xlatService">xlatService for globalization</param>
    this.PageLoad = function ($scope, xlatService) {
        try {

            OneViewConsole.Debug("PageLoad Start", "SettingsPresenter.PageLoad");
            // Make the probe list to null (empty)
            $scope.probes = {};
            $scope.LogVariableList = {};

            // Show the settings page to visible
            // Bydefault this page will visible
            $scope.settingvisible = true;
            $scope.BackVisible = false;

            var TemperatureAutoMaualBadgetxt = 'Auto';
            if (IsGlobalAutoTemperatureManualAllowed == true)
                TemperatureAutoMaualBadgetxt = 'Manual';
            else
                TemperatureAutoMaualBadgetxt = 'Auto';

            var oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
            var LocalAppInfo = oOneViewAppInfoPlugin.GetLocalAppInfo();

            // Show all settings
            $scope.settings = [
                //{ title: "Probe Configuration", newpage: true, enabled: true, icon: "ion-thermometer" },
                //{ title: "Auto/Manual Temperature Configuration", enabled: true, badge: true, badgetxt: TemperatureAutoMaualBadgetxt, icon: "ion-edit" },
                { title: "Copy DB", enabled: true, icon: "ion-gear-a" },
                { title: "Upload DB", enabled: true, icon: "ion-gear-a" },
                { title: "Upload Logs", enabled: true, icon: "ion-gear-a" },
                { title: "Restore DB", enabled: true, icon: "ion-gear-a" },
                { title: "ClearAll DC And Actions", enabled: true, icon: "ion-gear-a" },
                { title: "Clean DB", enabled: true, icon: "ion-gear-a" },
                { title: "Enable Logs", newpage: true, enabled: true, icon: "ion-gear-a" },
                { title: "Check For Updates", newpage: true, enabled: true, icon: "ion-gear-a" },
                { title: "Refresh Page Globalization", newpage: true, enabled: true, icon: "ion-gear-a" },
                { title: "Refresh", newpage: true, enabled: true, icon: "ion-gear-a" },
                { title: "Version : OneView " + LocalAppInfo.VersionName, enabled: true, icon: "ion-gear-a" },
                { title: "Reset Password", enabled: true, icon: "ion-gear-a" }
            ];
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
}

function SettingsBO() {

    //################# auto /Manual Status Start ####################
    
    this.ShowAutoManualStatus = function (oScope) {
        try {
            OneViewConsole.Debug("ShowAutoManualStatus start", "SettingsBO.ShowAutoManualStatus");

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

}


