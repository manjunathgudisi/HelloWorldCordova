
function OneViewAppConfig() {

    this.CheckForNewUpdates = function (toaster, IsSettingsPage) {

        try {
            OneViewConsole.Debug("CheckForUpdates start", "OneViewAppConfig.CheckForNewUpdates");

            var IsSuccess = false;

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    var LocalAppInfo = oOneViewAppInfoPlugin.GetLocalAppInfo();
                    var RemoteAppInfo = oOneViewAppInfoPlugin.GetRemoteAppInfo(OneViewSessionStorage.Get("ServiceId"), oneViewGlobalVariables.FoodSafetyServiceURL);

                    var LocalAppInfoVersionName = null;
                    var RemoteAppInfoVersionName = null;
                  
                    if (LocalAppInfo != "" && LocalAppInfo != null && LocalAppInfo != undefined) {
                        //LocalAppInfo.VersionName = parseInt(LocalAppInfo.VersionName.replace(/\./g, ''));
                        LocalAppInfoVersionName = parseInt(LocalAppInfo.VersionName.replace(/\./g, ''));
                    }
                    if (RemoteAppInfo != "" && RemoteAppInfo != null && RemoteAppInfo != undefined) {
                        //RemoteAppInfo.VersionName = parseInt(RemoteAppInfo.VersionName.replace(/\./g, ''));
                        RemoteAppInfoVersionName = parseInt(RemoteAppInfo.VersionName.replace(/\./g, ''));
                    }

                    if (RemoteAppInfo != "" && LocalAppInfoVersionName < RemoteAppInfoVersionName) {

                        var Message = "New updates are available, press ok to update the apk ?";
                        var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                        if (IsSuccess == true) {

                            oSetDefaultSpinner.Start("Downloading new updates");

                            var IsSuccess = oOneViewAppInfoPlugin.DownloadApk(OneViewSessionStorage.Get("ServiceId"), oneViewGlobalVariables.FoodSafetyServiceURL);

                            oSetDefaultSpinner.Stop();

                            if (IsSuccess == true) {

                                UpdateAppDetails(toaster, RemoteAppInfo);
                                oOneViewAppInfoPlugin.UpdateApk();
                            }
                            else {
                                alert("Apk not available, please contact administrator");
                            }
                        }
                    }
                    //else if (RemoteAppInfo != "" && LocalAppInfo.VersionCode < RemoteAppInfo.VersionCode && LocalAppInfo.VersionName < RemoteAppInfo.VersionName) {

                    //    var Message = "IN-MG-ALP-001 :: New updates are available, press ok to update the apk ?";
                    //    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    //    if (IsSuccess == true) {

                    //        oSetDefaultSpinner.Start("Checking existing datacaptures, please wait...");

                    //        var _oDcDAO = new DcDAO();
                    //        var DataCaptureDTOLst = _oDcDAO.GetAllUnSyncDc();

                    //        oSetDefaultSpinner.Stop();

                    //        if (DataCaptureDTOLst.length > 0) {

                    //            var Message = "You might lose all your data capture on clicking ok. Please upload before upgrade.";
                    //            var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    //            if (IsSuccess == true) {

                    //                oSetDefaultSpinner.Start("Downloading new updates, please wait...");

                    //                var IsSuccess = oOneViewAppInfoPlugin.DownloadApk("EKFC", oneViewGlobalVariables.FoodSafetyServiceURL);

                    //                oSetDefaultSpinner.Stop();

                    //                if (IsSuccess == true) {

                    //                    oSetDefaultSpinner.Start("Cleaning the application, please wait...");
                                        
                    //                    UpdateAppDetails(toaster, RemoteAppInfo);
                    //                    oOneViewAppInfoPlugin.UpdateApk();
                                      
                    //                    //var _oDbStructureController = new DbStructureController();
                    //                    //_oDbStructureController.ReCreate();

                    //                    oSetDefaultSpinner.Stop();                                       
                    //                }
                    //                else {
                    //                    alert("IN-MG-ALP-002 :: Apk not available, please contact administrator");
                    //                }
                    //            }
                    //        }
                    //        else {
                    //            oSetDefaultSpinner.Start("Downloading new updates");

                    //            var IsSuccess = oOneViewAppInfoPlugin.DownloadApk("EKFC", oneViewGlobalVariables.FoodSafetyServiceURL);

                    //            oSetDefaultSpinner.Stop();

                    //            if (IsSuccess == true) {

                    //                oSetDefaultSpinner.Start("Cleaning the application, please wait...");

                    //                UpdateAppDetails(toaster, RemoteAppInfo);
                    //                oOneViewAppInfoPlugin.UpdateApk();
                                   
                    //                //var _oDbStructureController = new DbStructureController();
                    //                //_oDbStructureController.ReCreate();

                    //                oSetDefaultSpinner.Stop();
                    //            }
                    //            else {
                    //                alert("IN-MG-ALP-002 :: Apk not available, please contact administrator");
                    //            }
                    //        }
                    //    }
                    //}
                    else if (IsSettingsPage == true) {
                        alert("IN-IN-ALP-001 :: No updates available");
                    }
                }

            OneViewConsole.Debug("CheckForUpdates end", "OneViewAppConfig.CheckForNewUpdates");

            return IsSuccess; 
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("AppConfig", "OneViewAppConfig.CheckForUpdates", Excep);
        }
        finally {
            LocalAppInfo = null;
            RemoteAppInfo = null;
            Message = null;
            IsSuccess = null;
        }
    }

    this.DownloadMetaDataFiles = function () {

        try {
            OneViewConsole.Debug("DownloadMetaDataFiles start", "OneViewAppConfig.DownloadMetaDataFiles");

            var Config = oOneViewAppInfoPlugin.GetConfigFile();

            for (var i = 0; i < Config.MetaData.length; i++) {
                oOneViewAppInfoPlugin.DownloadJsFile("EKFC", "MetaData", Config.MetaData[i].FileName, oneViewGlobalVariables.FoodSafetyServiceURL);
            }

            OneViewConsole.Debug("DownloadMetaDataFiles end", "OneViewAppConfig.DownloadMetaDataFiles");
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("AppConfig", "OneViewAppConfig.DownloadMetaDataFiles", Excep);
        }
        finally {
            Config = null;
        }
    }

    var UpdateAppDetails = function (toaster, RemoteAppInfo) {

        try{
            var _OneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
            var DeviceInfo = _OneViewDeviceInfoPlugin.GetDeviceInfo();

            DeviceInfo.OneViewVersionCode = RemoteAppInfo.VersionCode;
            DeviceInfo.OneViewVersionName = RemoteAppInfo.VersionName;

            var _OneViewAppConfigIL = new OneViewAppConfigIL(toaster);
            var oAppDetailsDTO = _OneViewAppConfigIL.UpdateAppDetails(DeviceInfo);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("AppConfig", "OneViewAppConfig.UpdateAppDetails", Excep);
        }
        finally {
            _OneViewDeviceInfoPlugin = null;
            DeviceInfo = null;
            _OneViewAppConfigIL = null;
            oAppDetailsDTO = null;
        }
    }
}

function OneViewAppConfigIL(toaster) {

    this.UpdateAppDetails = function (DeviceInfo) {

        try {
            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.toaster = toaster;
            _oOneViewChannel.url = oneViewGlobalVariables.RegistryURl + "OneViewTokenFacedService.svc/UpdateAppDetails";
            _oOneViewChannel.parameter = JSON.stringify({ "DeviceInfo": JSON.stringify(DeviceInfo) });
            var oAppDetailsDTO = _oOneViewChannel.Send();

            if (oAppDetailsDTO != null) {
                return oAppDetailsDTO.UpdateAppDetailsResult;
            }
            else {
                return oAppDetailsDTO;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "OneViewAppConfigIL.UpdateAppDetails", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oAppDetailsDTO = null;
        }
    }
}

function OneviewUpgradationComponent() {

    this.APKUpgradeProcess = function () {
        try {

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "OneviewUpgradationComponent.APKUpgradeProcess", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oAppDetailsDTO = null;
        }
    }


    this.Upload = function () {
        try {

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "OneviewUpgradationComponent.APKUpgradeProcess", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oAppDetailsDTO = null;
        }
    }


    this.Upgrade = function () {
        try {

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "OneviewUpgradationComponent.APKUpgradeProcess", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oAppDetailsDTO = null;
        }
    }

    this.Refresh = function () {
        try {

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "OneviewUpgradationComponent.APKUpgradeProcess", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oAppDetailsDTO = null;
        }
    }

    this.CheckIsUpgradeAvailable = function () {
        try {
            OneViewConsole.Debug("CheckIsUpgradeAvailable start", "OneviewUpgradationComponent.CheckIsUpgradeAvailable");

            var IsUpgradeAvailable = false;
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                var LocalAppInfo = oOneViewAppInfoPlugin.GetLocalAppInfo();
                var RemoteAppInfo = oOneViewAppInfoPlugin.GetRemoteAppInfo(OneViewSessionStorage.Get("ServiceId"), oneViewGlobalVariables.FoodSafetyServiceURL);

                if (LocalAppInfo != "" && LocalAppInfo != null && LocalAppInfo != undefined) {
                    LocalAppInfo.VersionName = parseInt(LocalAppInfo.VersionName.replace(/\./g, ''));
                }
                if (RemoteAppInfo != "" && RemoteAppInfo != null && RemoteAppInfo != undefined) {
                    RemoteAppInfo.VersionName = parseInt(RemoteAppInfo.VersionName.replace(/\./g, ''));
                }

                if (RemoteAppInfo != "") {
                    if (LocalAppInfo.VersionName < RemoteAppInfo.VersionName) {
                        IsUpgradeAvailable = true;
                    }                    
                }
            }

            OneViewConsole.Debug("CheckIsUpgradeAvailable end", "OneviewUpgradationComponent.CheckIsUpgradeAvailable");
            return IsUpgradeAvailable;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "OneviewUpgradationComponent.CheckIsUpgradeAvailable", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oAppDetailsDTO = null;
        }
    }
}







