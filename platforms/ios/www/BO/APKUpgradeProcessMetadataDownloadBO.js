
// APKUpgradeProcessMetadataDownloadBO
function APKUpgradeProcessMetadataDownloadBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    /// <summary>
    /// DownloadMetadataFromServer
    /// </summary>
    this.DownloadMetadataFromServer = function () {

        try {
            OneViewConsole.Debug("DownloadMetadataFromServer start", "APKUpgradeProcessMetadataDownloadBO.DownloadMetadataFromServer");
            
            var Response = { IsSuccess: true, Message: "APKUpgradeProcessMetadata download success", APKUpgradeProcessMetadata : null};

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkStatus : " + JSON.stringify(NetworkStatus), "APKUpgradeProcessMetadataDownloadBO.DownloadMetadataFromServer");
            
            if (NetworkStatus.IsNetworkAvailable == true) {

                var Url = oneViewGlobalVariables.FoodSafetyServiceURL + "ApkUpdation/" + OneViewSessionStorage.Get("ServiceId") + "/APKUpgradeProcessMetadata.txt";                
                var _oAPKUpgradeProcessMetadataDownloadIL = new APKUpgradeProcessMetadataDownloadIL();
                var _oAPKUpgradeProcessMetadata = _oAPKUpgradeProcessMetadataDownloadIL.GetMetadata(Url);

                //alert("APKUpgradeProcessMetadata From Server : " + _oAPKUpgradeProcessMetadata);
                
                if (_oAPKUpgradeProcessMetadata != null) {
                    OneViewLocalStorage.Save("APKUpgradeProcessMetadata", _oAPKUpgradeProcessMetadata);
                    Response.APKUpgradeProcessMetadata = JSON.parse(_oAPKUpgradeProcessMetadata);

                    var SchemaDownloadResponse = MyInstance.DownloadSchemaFileFromServer();
                    if (SchemaDownloadResponse.IsSuccess != true) {
                        Response.IsSuccess = false;
                        Response.Message = ' Schema File Download issue : Please Contact Adiministrator';
                    }
                }
                else {
                    Response.IsSuccess = false;
                    Response.Message = 'No APK Upgrade Process Metadata Found : Please Contact Adiministrator';
                    // alert(Response.Message);
                    OneViewConsole.Error("No APK Upgrade Process Metadata Found : Please Contact Adiministrator", "APKUpgradeProcessMetadataDownloadBO.DownloadMetadataFromServer");
                }
            }
            else {
                Response.IsSuccess = false;
                Response.Message = xlatService.xlat('NoInternetConnection');
                alert(Response.Message);
                OneViewConsole.Info("No Internet Connection", "APKUpgradeProcessMetadataDownloadBO.DownloadMetadataFromServer");
            }

            OneViewConsole.Debug("DownloadMetadataFromServer end", "APKUpgradeProcessMetadataDownloadBO.DownloadMetadataFromServer");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessMetadataDownloadBO.DownloadMetadataFromServer", Excep);
        }
        finally {          
        }
    }


    /// <summary>
    /// DownloadSchemaFileFromServer
    /// </summary>
    this.DownloadSchemaFileFromServer = function () {

        try {
            OneViewConsole.Debug("DownloadSchemaFileFromServer start", "APKUpgradeProcessMetadataDownloadBO.DownloadSchemaFileFromServer");
            var SchemaDownloadResponse = { IsSuccess: true, Message: "APKUpgradeSchemaFile download success", APKUpgradeSchemaFile: null };

            var _oAPKUpgradeProcessMetadata = OneViewLocalStorage.Get("APKUpgradeProcessMetadata");
           
            _oAPKUpgradeProcessMetadata = JSON.parse(_oAPKUpgradeProcessMetadata);

            var LocalAppInfo = oOneViewAppInfoPlugin.GetLocalAppInfo();
            var CurrentVersion = LocalAppInfo.VersionName;
            var FileName = "";
            var APKUpgradeMetadataForCurrentVersion = _oAPKUpgradeProcessMetadata.UpgradtionWorkFlow[CurrentVersion];
            if (APKUpgradeMetadataForCurrentVersion != null) {
                var Config = APKUpgradeMetadataForCurrentVersion.WorkflowConfig["SchemaModify"];                
                if (Config != undefined) {
                    
                    if (Config.FileName != "") {
                        FileName = Config.FileName;
                    }

                   
                    if (FileName != "") {
                        //Download
                        var _oAPKUpgradeSchemaFileDownloadBO = new APKUpgradeSchemaFileDownloadBO(xlatService);
                        SchemaDownloadResponse = _oAPKUpgradeSchemaFileDownloadBO.Download(FileName);

                    }
                    else {
                        SchemaDownloadResponse = { IsSuccess: false, Message: "APKUpgradeSchema File Name not found", APKUpgradeSchemaFile: null };
                    }

                }
                //for (var key in APKUpgradeMetadataForCurrentVersion.Workflow) {
                //    if(APKUpgradeMetadataForCurrentVersion.Workflow[key] == "SchemaModify"){
                      
                //    }
                //}
            }

            else {
                SchemaDownloadResponse = { IsSuccess: true, Message: "APKUpgradeProcessMetadata not found for CurrentVersion", APKUpgradeSchemaFile: null };
            }
            OneViewConsole.Debug("DownloadSchemaFileFromServer end", "APKUpgradeProcessMetadataDownloadBO.DownloadSchemaFileFromServer");

            return SchemaDownloadResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessMetadataDownloadBO.DownloadSchemaFileFromServer", Excep);
        }
        finally {
        }
    }
    
}

// APKUpgradeProcessMetadataDownloadIL
function APKUpgradeProcessMetadataDownloadIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetMetadata
    /// </summary>
    /// <param name="URL">URL from where file need to be downloaded</param>
    this.GetMetadata = function (Url) {
        try {
            OneViewConsole.Debug("GetMetadata Start", "APKUpgradeProcessMetadataDownloadIL.GetMetadata");
            OneViewConsole.DataLog("Url :", Url);

            OneViewConsole.DataLog("Requested Url : " + Url, "ProfileDownloadIL.GetDcCustomPageHtmlUsingHttpGet");

            var _oOneViewChannel = new OneViewChannel();
            var oAPKUpgradeProcessMetadata = _oOneViewChannel.Get(Url);

            //alert('APKUpgradeProcessMetadataDownloadIL  : ' + oAPKUpgradeProcessMetadata);

            OneViewConsole.Debug("GetMetadata End", "APKUpgradeProcessMetadataDownloadIL.GetMetadata");

            return oAPKUpgradeProcessMetadata;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "APKUpgradeProcessMetadataDownloadIL.GetMetadata", Excep);
        }
        finally {
            _oOneViewChannel = null;
        }
    }
}














// APKUpgradeSchemaFileDownloadBO
function APKUpgradeSchemaFileDownloadBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    /// <summary>
    /// Download
    /// </summary>
    this.Download = function (FileName) {

        try {
            OneViewConsole.Debug("Download start", "APKUpgradeSchemaFileDownloadBO.Download");

            var Response = { IsSuccess: true, Message: "APKUpgradeSchemaFile download success", APKUpgradeSchemaFile: null };

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkStatus : " + JSON.stringify(NetworkStatus), "APKUpgradeSchemaFileDownloadBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {

                var Url = oneViewGlobalVariables.FoodSafetyServiceURL + "ApkUpdation/" + OneViewSessionStorage.Get("ServiceId") + "/" + FileName + ".txt";
                var _oAPKUpgradeSchemaFileDownloadIL = new APKUpgradeSchemaFileDownloadIL();
                var _oAPKUpgradeSchemaFile = _oAPKUpgradeSchemaFileDownloadIL.GetFile(Url);

                //alert("APKUpgradeSchemaFile From Server : " + _oAPKUpgradeSchemaFile);

                if (_oAPKUpgradeSchemaFile != null) {
                    OneViewLocalStorage.Save("APKUpgradeSchemaFile", _oAPKUpgradeSchemaFile);
                    Response.APKUpgradeSchemaFile = JSON.parse(_oAPKUpgradeSchemaFile);
                }
                else {
                    Response.IsSuccess = false;
                    Response.Message = 'No APK Upgrade Schema File Found : Please Contact Adiministrator';
                    alert(Response.Message);
                }
            }
            else {
                Response.IsSuccess = false;
                Response.Message = xlatService.xlat('NoInternetConnection');
                alert(Response.Message);
                OneViewConsole.Info("No Internet Connection", "APKUpgradeSchemaFileDownloadBO.Download");
            }

            OneViewConsole.Debug("Download end", "APKUpgradeSchemaFileDownloadBO.Download");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeSchemaFileDownloadBO.Download", Excep);
        }
        finally {
        }
    }

}


// APKUpgradeSchemaFileDownloadIL
function APKUpgradeSchemaFileDownloadIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetFile
    /// </summary>
    /// <param name="URL">URL from where file need to be downloaded</param>
    this.GetFile = function (Url) {
        try {
            OneViewConsole.Debug("GetFile Start", "APKUpgradeSchemaFileDownloadIL.GetFile");
            OneViewConsole.DataLog("Url :", Url);

            OneViewConsole.DataLog("Requested Url : " + Url, "ProfileDownloadIL.GetDcCustomPageHtmlUsingHttpGet");
            //alert('Url : ' + Url);

            var _oOneViewChannel = new OneViewChannel();
            var oFile = _oOneViewChannel.Get(Url);

            //alert('APKUpgradeSchemaFileDownloadIL  : ' + oFile);

            OneViewConsole.Debug("GetFile End", "APKUpgradeSchemaFileDownloadIL.GetFile");

            return oFile;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "APKUpgradeSchemaFileDownloadIL.GetFile", Excep);
        }
        finally {
            _oOneViewChannel = null;
        }
    }
}

