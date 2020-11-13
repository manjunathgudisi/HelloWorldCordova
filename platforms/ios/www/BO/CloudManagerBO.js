
// CloudManagerBO
function CloudManagerBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    /// <summary>
    /// GetAllServicesByUserIdFromLocal
    /// </summary>
    this.GetAllServicesByUserIdFromLocal = function (UserId) {

        try {
            OneViewConsole.Debug("GetAllServicesByUserIdFromLocal start", "CloudManagerBO.GetAllServicesByUserIdFromLocal");

            if (UserId == undefined) {
                UserId = OneViewSessionStorage.Get("LoginUserName");              
            }
            UserId = UserId.toLowerCase();

            var CloudManagerServiceInfo = {};
            var CloudManagerUserServiceMapping = {};

            if (OneViewLocalStorage.Get("CloudManagerServiceInfo") != null) {
                CloudManagerServiceInfo = JSON.parse(OneViewLocalStorage.Get("CloudManagerServiceInfo"));
            }
            if (OneViewLocalStorage.Get("CloudManagerUserServiceMapping") != null) {
                CloudManagerUserServiceMapping = JSON.parse(OneViewLocalStorage.Get("CloudManagerUserServiceMapping"));
            }

            var Result = { ServicesLst: [], DefautServiceId: 0, DefautServiceName: "" };
          
            if (CloudManagerUserServiceMapping[UserId] != undefined) {

                for (var i = 0; i < CloudManagerUserServiceMapping[UserId].ServiceIds.length; i++) {

                    var Service = {
                        Id: CloudManagerServiceInfo[CloudManagerUserServiceMapping[UserId].ServiceIds[i]].Id,
                        Name: CloudManagerServiceInfo[CloudManagerUserServiceMapping[UserId].ServiceIds[i]].Name,
                        ServiceUrl: CloudManagerServiceInfo[CloudManagerUserServiceMapping[UserId].ServiceIds[i]].ServiceUrl,
                        SimpleStorageUrl: CloudManagerServiceInfo[CloudManagerUserServiceMapping[UserId].ServiceIds[i]].SimpleStorageUrl
                    }

                    Result.ServicesLst.push(Service);
                }
                
                Result.DefautServiceId = CloudManagerUserServiceMapping[UserId].DefautServiceId;
                Result.DefautServiceName = CloudManagerUserServiceMapping[UserId].DefautServiceName;
            }

            OneViewConsole.Debug("GetAllServicesByUserIdFromLocal end", "CloudManagerBO.GetAllServicesByUserIdFromLocal");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "CloudManagerBO.GetAllServicesByUserIdFromLocal", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }


    /// <summary>
    /// GetAllServicesIds
    /// </summary>
    this.GetAllServicesIds = function () {

        try {
            OneViewConsole.Debug("GetAllServicesIds start", "CloudManagerBO.GetAllServicesIds");

            var Result = [];
            var CloudManagerServiceInfo = {};

            if (OneViewLocalStorage.Get("CloudManagerServiceInfo") != null) {
                CloudManagerServiceInfo = JSON.parse(OneViewLocalStorage.Get("CloudManagerServiceInfo"));
            }

            for (var itr in CloudManagerServiceInfo) {

                if (Result.indexOf(CloudManagerServiceInfo[itr].Id) == -1) {

                    Result.push(CloudManagerServiceInfo[itr].Id);
                }
            }

            OneViewConsole.Debug("GetAllServicesIds end", "CloudManagerBO.GetAllServicesIds");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "CloudManagerBO.GetAllServicesIds", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }


    /// <summary>
    /// GetAllServicesByUserIdFromServer
    /// </summary>
    this.GetAllServicesByUserIdFromServer = function () {

        try {
            OneViewConsole.Debug("GetAllServicesByUserIdFromServer start", "CloudManagerBO.GetAllServicesByUserIdFromServer");
            
            var UserId = OneViewSessionStorage.Get("LoginUserName");
            UserId = UserId.toLowerCase();
            var Result = null;

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "CloudManagerBO.GetAllServicesByUserIdFromServer");

            if (NetworkStatus.IsNetworkAvailable == true) {

                var _oCloudManagerIL = new CloudManagerIL();
                var _oCloudManagerDetails = _oCloudManagerIL.GetMyServiceInfos(OneViewSessionStorage.Get("LoginUserId"));

                //alert("CloudManagerDetails From Server : " + JSON.stringify(_oCloudManagerDetails));
                
                if (_oCloudManagerDetails != null && _oCloudManagerDetails.IsAnyException == false) {

                    MyInstance.Update(UserId, _oCloudManagerDetails.ServiceSettingDetailsDTO);
                    Result = MyInstance.GetAllServicesByUserIdFromLocal();
                }
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "CloudManagerBO.GetAllServicesByUserIdFromServer");
            }

            OneViewConsole.Debug("GetAllServicesByUserIdFromServer end", "CloudManagerBO.GetAllServicesByUserIdFromServer");

            //alert("CloudManagerDetails From Local : " + JSON.stringify(Result));

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "CloudManagerBO.GetAllServicesByUserIdFromServer", Excep);
        }
        finally {          
        }
    }

    
    /// <summary>
    /// Update
    /// </summary>
    this.Update = function (UserId, ServicesLst) {

        try {
            OneViewConsole.Debug("Update start", "CloudManagerBO.Update");
            
            var CloudManagerServiceInfo = {};
            var CloudManagerUserServiceMapping = {};

            if (OneViewLocalStorage.Get("CloudManagerServiceInfo") != null) {
                CloudManagerServiceInfo = JSON.parse(OneViewLocalStorage.Get("CloudManagerServiceInfo"));
            }
            if (OneViewLocalStorage.Get("CloudManagerUserServiceMapping") != null) {
                CloudManagerUserServiceMapping = JSON.parse(OneViewLocalStorage.Get("CloudManagerUserServiceMapping"));
            }

            if (CloudManagerUserServiceMapping[UserId] != undefined) {
                CloudManagerUserServiceMapping[UserId].ServiceIds = [];
            }

            for (var i = 0; i < ServicesLst.length; i++) {

                var OneViewServiceCloudManager = ServicesLst[i].OneViewServiceCloudManager;

                if (CloudManagerServiceInfo[OneViewServiceCloudManager.ServiceId] == undefined) {

                    CloudManagerServiceInfo[OneViewServiceCloudManager.ServiceId] = {
                        Id: OneViewServiceCloudManager.ServiceId,
                        Name: OneViewServiceCloudManager.ServiceName,
                        ServiceUrl: MyInstance.GetUrl(OneViewServiceCloudManager.ServiceHostInfoDict[0]),
                        SimpleStorageUrl: MyInstance.GetUrl(OneViewServiceCloudManager.SimpleStorageHostInfoDict[0]),
                        SqliteDbCreatedStatus: false,
                        SqliteDbCreatedDate: "",
                        SqliteDbLastUpdatedDate: ""
                    }
                }
                else {
                    CloudManagerServiceInfo[OneViewServiceCloudManager.ServiceId].ServiceUrl = MyInstance.GetUrl(OneViewServiceCloudManager.ServiceHostInfoDict[0]);
                    CloudManagerServiceInfo[OneViewServiceCloudManager.ServiceId].SimpleStorageUrl = MyInstance.GetUrl(OneViewServiceCloudManager.SimpleStorageHostInfoDict[0]);
                }
                if (CloudManagerUserServiceMapping[UserId] == undefined) {

                    CloudManagerUserServiceMapping[UserId] = {
                        ServiceIds: [],
                        DefautServiceId: ServicesLst[0].OneViewServiceCloudManager.ServiceId,
                        DefautServiceName: ServicesLst[0].OneViewServiceCloudManager.ServiceName
                    }
                }
                if (CloudManagerUserServiceMapping[UserId].ServiceIds.indexOf(OneViewServiceCloudManager.ServiceId) == -1) {
                    CloudManagerUserServiceMapping[UserId].ServiceIds.push(OneViewServiceCloudManager.ServiceId);
                }
                if (CloudManagerUserServiceMapping[UserId] != undefined) {
                    var IsExist = false;
                    for (var j = 0; j < ServicesLst.length; j++) {
                        if (CloudManagerUserServiceMapping[UserId].DefautServiceId == ServicesLst[j].OneViewServiceCloudManager.ServiceId) {
                            IsExist = true;
                            break;
                        }                        
                    }
                    if (IsExist == false) {
                        CloudManagerUserServiceMapping[UserId].DefautServiceId = ServicesLst[0].OneViewServiceCloudManager.ServiceId,
                        CloudManagerUserServiceMapping[UserId].DefautServiceName = ServicesLst[0].OneViewServiceCloudManager.ServiceName
                    }
                }
            }

            OneViewLocalStorage.Save("CloudManagerServiceInfo", JSON.stringify(CloudManagerServiceInfo));
            OneViewLocalStorage.Save("CloudManagerUserServiceMapping", JSON.stringify(CloudManagerUserServiceMapping));

            OneViewConsole.Debug("Update end", "CloudManagerBO.Update");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "CloudManagerBO.Update", Excep);
        }
        finally {
        }
    }


    /// <summary>
    /// GetUrl
    /// </summary>
    this.GetUrl = function (HostInfo) {

        try {
            OneViewConsole.Debug("GetUrl start", "CloudManagerBO.GetUrl");

            var Url = "http://" + HostInfo.ServerIp + ":" + HostInfo.PortNo + "/" + HostInfo.InstanceName + "/";

            OneViewConsole.Debug("GetUrl end", "CloudManagerBO.GetUrl");

            return Url;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "CloudManagerBO.GetUrl", Excep);
        }
        finally {
        }
    }


    /// <summary>
    /// GetSqliteDbCreatedStatus
    /// </summary>
    this.GetSqliteDbCreatedStatus = function (ServiceId) {

        try {
            OneViewConsole.Debug("GetSqliteDbCreatedStatus start", "CloudManagerBO.GetSqliteDbCreatedStatus");

            var SqliteDbCreatedStatus = false;

            var CloudManagerServiceInfo = {};

            if (OneViewLocalStorage.Get("CloudManagerServiceInfo") != null) {
                CloudManagerServiceInfo = JSON.parse(OneViewLocalStorage.Get("CloudManagerServiceInfo"));
            }

            if (CloudManagerServiceInfo[ServiceId] != undefined) {

                SqliteDbCreatedStatus = CloudManagerServiceInfo[ServiceId].SqliteDbCreatedStatus;
            }

            OneViewConsole.Debug("GetSqliteDbCreatedStatus end", "CloudManagerBO.GetSqliteDbCreatedStatus");

            return SqliteDbCreatedStatus;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "CloudManagerBO.GetSqliteDbCreatedStatus", Excep);
        }
        finally {
        }
    }


    /// <summary>
    /// UpdateSqliteDbCreatedStatus
    /// </summary>
    this.UpdateSqliteDbCreatedStatus = function (ServiceId, Status) {

        try {
            OneViewConsole.Debug("UpdateSqliteDbCreatedStatus start", "CloudManagerBO.UpdateSqliteDbCreatedStatus");

            var CloudManagerServiceInfo = {};
            
            if (OneViewLocalStorage.Get("CloudManagerServiceInfo") != null) {
                CloudManagerServiceInfo = JSON.parse(OneViewLocalStorage.Get("CloudManagerServiceInfo"));
            }
            
            if (CloudManagerServiceInfo[ServiceId] != undefined) {

                CloudManagerServiceInfo[ServiceId].SqliteDbCreatedStatus = Status;
            }

            OneViewLocalStorage.Save("CloudManagerServiceInfo", JSON.stringify(CloudManagerServiceInfo));            

            OneViewConsole.Debug("UpdateSqliteDbCreatedStatus end", "CloudManagerBO.UpdateSqliteDbCreatedStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "CloudManagerBO.UpdateSqliteDbCreatedStatus", Excep);
        }
        finally {
        }
    }


    /// <summary>
    /// IsUserExist
    /// </summary>
    this.IsUserExist = function (UserName) {

        try {
            OneViewConsole.Debug("IsUserExist start", "CloudManagerBO.IsUserExist");
           
            UserName = UserName.toLowerCase();
            var IsSuccess = false;
            var CloudManagerUserServiceMapping = {};
           
            if (OneViewLocalStorage.Get("CloudManagerUserServiceMapping") != null) {
                CloudManagerUserServiceMapping = JSON.parse(OneViewLocalStorage.Get("CloudManagerUserServiceMapping"));
            }

            if (CloudManagerUserServiceMapping[UserName] != undefined) {
                IsSuccess = true;
            }

            OneViewConsole.Debug("IsUserExist end", "CloudManagerBO.IsUserExist");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "CloudManagerBO.IsUserExist", Excep);
        }
        finally {
        }
    }


    /// <summary>
    /// InitializeDBContext
    /// </summary>
    this.InitializeDBContext = function (ServiceId) {

        try {
            OneViewConsole.Debug("InitializeDBContext start", "CloudManagerBO.InitializeDBContext");
            
            var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();
            _oOneViewSqlitePlugin.InitializeDBContext("Service" + ServiceId + "DB");

            if (MyInstance.GetSqliteDbCreatedStatus(ServiceId) == false) {

                var _oDbStructureController = new DbStructureController();
                _oDbStructureController.ReCreate();

                MyInstance.UpdateSqliteDbCreatedStatus(ServiceId, true)
            }

            OneViewConsole.Debug("InitializeDBContext end", "CloudManagerBO.InitializeDBContext");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CloudManagerBO.InitializeDBContext", xlatService);
        }
    }

    /// <summary>
    /// UpdateCloudManagerUserServiceMapping
    /// </summary>
    this.UpdateCloudManagerUserServiceMapping = function (ServiceInfo) {
        try {
            OneViewConsole.Debug("UpdateCloudManagerUserServiceMapping start", "CloudManagerBO.UpdateCloudManagerUserServiceMapping");

            var UserId = OneViewSessionStorage.Get("LoginUserName");
            UserId = UserId.toLowerCase();

            var CloudManagerUserServiceMapping = {};

            if (OneViewLocalStorage.Get("CloudManagerUserServiceMapping") != null) {
                CloudManagerUserServiceMapping = JSON.parse(OneViewLocalStorage.Get("CloudManagerUserServiceMapping"));
            }

            if (CloudManagerUserServiceMapping[UserId] != undefined && ServiceInfo.Id != undefined && ServiceInfo.Name != undefined) {

                CloudManagerUserServiceMapping[UserId].DefautServiceId = ServiceInfo.Id;
                CloudManagerUserServiceMapping[UserId].DefautServiceName = ServiceInfo.Name;
            }

            OneViewLocalStorage.Save("CloudManagerUserServiceMapping", JSON.stringify(CloudManagerUserServiceMapping));

            OneViewConsole.Debug("UpdateCloudManagerUserServiceMapping end", "CloudManagerBO.UpdateCloudManagerUserServiceMapping");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CloudManagerBO.UpdateCloudManagerUserServiceMapping", xlatService);
        }
    }
   
}

// CloudManagerIL
function CloudManagerIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetMyServiceInfos
    /// </summary>
    /// <param name="UserId">Logged in UserId</param>
    this.GetMyServiceInfos = function (UserId) {
        try {
            OneViewConsole.Debug("GetMyServiceInfos Start", "CloudManagerIL.GetMyServiceInfos");
            OneViewConsole.DataLog("UserId :", UserId);

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.RegistryURl + "OneViewTokenFacedService.svc/GetMyServiceInfos_JSON";
            _oOneViewChannel.parameter = JSON.stringify({ "UserId": UserId });
            var oServicesDTO = _oOneViewChannel.Send();
            
            if (oServicesDTO != null) {
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oServicesDTO.GetMyServiceInfos_JSONResult), "CloudManagerIL.GetMyServiceInfos");
                oServicesDTO = JSON.parse(oServicesDTO.GetMyServiceInfos_JSONResult);
            }

            OneViewConsole.Debug("GetMyServiceInfos End", "CloudManagerIL.GetMyServiceInfos");

            return oServicesDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "CloudManagerIL.GetMyServiceInfos", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oServicesDTO = null;
        }
    }
}
