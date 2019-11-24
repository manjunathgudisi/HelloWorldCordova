
// RouterConfigMetaDataBO
function RouterConfigMetaDataBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// Download
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "RouterConfigMetaDataBO.Download");
            
            var IsSuccess = false;

            var _DefaultMasterDAO = new DefaultMasterDAO("RouterConfigMetaDataEntity");
            var IsExist = _DefaultMasterDAO.IsTableExist();

            if (IsExist == false) {
                var oSqliteQG = new SqliteQG();
                var Query = oSqliteQG.GetCreateTableQuery(new window["RouterConfigMetaDataEntity"]);
                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }
           
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "RouterConfigMetaDataBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {
                
                var _oRouterConfigMetaDataIL = new RouterConfigMetaDataIL();
                var _oRouterConfigDetails = _oRouterConfigMetaDataIL.GetRouterConfig(OneViewSessionStorage.Get("ServiceId"));

                //alert(JSON.stringify("_oRouterConfigDetails : " + JSON.stringify(_oRouterConfigDetails)));

                if (_oRouterConfigDetails != null && _oRouterConfigDetails.IsAnyException == false) {

                    MyInstance.Create(_oRouterConfigDetails.RouterConfigMetaDataDTO);
                    IsSuccess = true;
                   
                    var RouterConfig = JSON.parse(_oRouterConfigDetails.RouterConfigMetaDataDTO.RouterConfig);
                    OneViewLocalStorage.Save("RouterMetaData", JSON.stringify(RouterConfig));
                   
                    var _oOneViewRouterComponet = new OneViewRouterComponet();
                    _oOneViewRouterComponet.ResetRouter();
                }
            }
            else {
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No Internet Connection", "RouterConfigMetaDataBO.Download");
            }

            OneViewConsole.Debug("Download end", "RouterConfigMetaDataBO.Download");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "RouterConfigMetaDataBO.Download", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }   
    }


    /// <summary>
    /// Create
    /// </summary>
    /// <param name="RouterConfigMetaDataDTO">RouterConfigMetaDataDTO</param> 
    this.Create = function (RouterConfigMetaDataDTO) {

        try {
            OneViewConsole.Debug("Create start", "RouterConfigMetaDataBO.Create");

            if (RouterConfigMetaDataDTO != null) {

                var _oDefaultMasterDAO = new DefaultMasterDAO("RouterConfigMetaDataEntity");
                var Count = _oDefaultMasterDAO.Count();

                var _oRouterConfigMetaDataNormalizer = new RouterConfigMetaDataNormalizer();
                var _oRouterConfigMetaDataDAO = new RouterConfigMetaDataDAO();

                _oRouterConfigMetaDataDAO.DeleteByServiceId(RouterConfigMetaDataDTO.ServiceId);

                var oRouterConfigMetaData = _oRouterConfigMetaDataNormalizer.Normalize(RouterConfigMetaDataDTO);
                _oDefaultMasterDAO.Create(oRouterConfigMetaData, Count);

                if (IsGlobalAutoSyncEnabled == true) {
                    var _oTaskSyncLogDAO = new TaskSyncLogDAO();
                    //Sync TaskSyncLogEntity
                    var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(RouterConfigMetaDataDTO.ServerId, RouterConfigMetaDataDTO.Type);
                }

            }

            OneViewConsole.Debug("Create end", "RouterConfigMetaDataBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "RouterConfigMetaDataBO.Create", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// IsExistRouterConfigMetaData
    /// </summary>   
    this.IsExistRouterConfigMetaData = function () {

        try {
            OneViewConsole.Debug("IsExistRouterConfigMetaData start", "RouterConfigMetaDataBO.IsExistRouterConfigMetaData");

        
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");

            var IsExist = false;

            var _RouterConfigMetaDataDAO = new RouterConfigMetaDataDAO();
            var Result = _RouterConfigMetaDataDAO.CheckRouterConfigMetaData(_oServiceId);


            if (Result.length > 0) {
                if (Result[0].Count > 0) {
                    IsExist = true;
                }
            }


            return IsExist;
            OneViewConsole.Debug("IsExistRouterConfigMetaData end", "RouterConfigMetaDataBO.IsExistRouterConfigMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "RouterConfigMetaDataBO.IsExistRouterConfigMetaData", Excep);
        }

    }
}

// RouterConfigMetaDataIL
function RouterConfigMetaDataIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetRouterConfig
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    this.GetRouterConfig = function (ServiceId) {
        try {
            OneViewConsole.Debug("GetRouterConfig Start", "RouterConfigMetaDataIL.GetRouterConfig");
            OneViewConsole.DataLog("ServiceId :" + ServiceId);

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetRouterConfig_json";
            _oOneViewChannel.parameter = JSON.stringify({ "ServiceId": ServiceId });
            var oRouterConfigDTO = _oOneViewChannel.Send();
           
            if (oRouterConfigDTO != null) {
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oRouterConfigDTO.GetRouterConfig_jsonResult), "RouterConfigMetaDataIL.GetRouterConfig");
                oRouterConfigDTO = JSON.parse(oRouterConfigDTO.GetRouterConfig_jsonResult);
            }
            
            OneViewConsole.Debug("GetRouterConfig End", "RouterConfigMetaDataIL.GetRouterConfig");

            return oRouterConfigDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "RouterConfigMetaDataIL.DcPendingTaskIL", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oRouterConfigDTO = null;
        }
    }
}

// RouterConfigMetaDataDAO
function RouterConfigMetaDataDAO() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();


    /// <summary>
    /// GetByServiceId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    this.GetByServiceId = function (ServiceId) {

        try {
            OneViewConsole.Debug("GetByServiceId start", "RouterConfigMetaDataDAO.GetByServiceId");

            var Query = "SELECT * FROM RouterConfigMetaDataEntity WHERE ServiceId = " + ServiceId;

            OneViewConsole.DataLog("Requested Query : " + Query, "RouterConfigMetaDataDAO.GetAll");
          
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "RouterConfigMetaDataDAO.GetByServiceId");
           
            OneViewConsole.Debug("GetByServiceId end", "RouterConfigMetaDataDAO.GetByServiceId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "RouterConfigMetaDataDAO.GetByServiceId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// DeleteByServiceId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    this.DeleteByServiceId = function (ServiceId) {

        try {
            OneViewConsole.Debug("DeleteByServiceAndUserId start", "RouterConfigMetaDataDAO.DeleteByServiceAndUserId");

            var Query = "DELETE FROM RouterConfigMetaDataEntity WHERE ServiceId = " + ServiceId;

            OneViewConsole.Debug("Requested Query : " + Query, "RouterConfigMetaDataDAO.DeleteByServiceAndUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByServiceAndUserId end", "RouterConfigMetaDataDAO.DeleteByServiceAndUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "RouterConfigMetaDataDAO.DeleteByServiceAndUserId", Excep);
        }
        finally {
            Query = null;          
        }
    }



    /// <summary>
    /// CheckRouterConfigMetaData : Check RouterConfigMetaData is Exist in system before download.
    /// </summary>   

    this.CheckRouterConfigMetaData = function (ServiceId) {
        try {
            OneViewConsole.Debug("CheckRouterConfigMetaData Start", "RouterConfigMetaDataDAO.CheckRouterConfigMetaData");
  

            var RouterConfigMetaDataQuery = "Select count(*) as Count from RouterConfigMetaDataEntity Where ServiceId =" + ServiceId;

            OneViewConsole.DataLog("Requested Query : " + RouterConfigMetaDataQuery, "RouterConfigMetaDataDAO.CheckRouterConfigMetaData");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(RouterConfigMetaDataQuery);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "RouterConfigMetaDataDAO.CheckRouterConfigMetaData");

            OneViewConsole.Debug("CheckRouterConfigMetaData End", "RouterConfigMetaDataDAO.CheckRouterConfigMetaData");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "RouterConfigMetaDataDAO.CheckRouterConfigMetaData", Excep);
        }
    }
}

// RouterConfigMetaDataNormalizer
function RouterConfigMetaDataNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to RouterConfigMetaDataDTO conversion
    /// </summary>
    /// <param name="RouterConfigMetaDataDTO">RouterConfigMetaData DTO (DTO from server)</param>
    /// <returns>RouterConfigMetaDataDTO (Mobile entity format)</returns> 
    this.Normalize = function (RouterConfigMetaDataDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "RouterConfigMetaDataNormalizer.Normalize");

            var _oRouterConfigMetaDataEntity = new RouterConfigMetaDataEntity();

            _oRouterConfigMetaDataEntity.ServerId = RouterConfigMetaDataDTO.ServerId;
            _oRouterConfigMetaDataEntity.MobileVersionId = 1;
            _oRouterConfigMetaDataEntity.OVGuid = RouterConfigMetaDataDTO.OVGuid;
            _oRouterConfigMetaDataEntity.ServiceId = RouterConfigMetaDataDTO.ServiceId;

            if (RouterConfigMetaDataDTO.RouterConfig != null) {
                _oRouterConfigMetaDataEntity.RouterConfig = JSON.stringify(RouterConfigMetaDataDTO.RouterConfig);
            }
            
            _oRouterConfigMetaDataEntity.CreatedDate = CurrentDateAndTime;
            _oRouterConfigMetaDataEntity.LastsyncDate = CurrentDateAndTime;
            _oRouterConfigMetaDataEntity.TimeStamp = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "RouterConfigMetaDataNormalizer.Normalize");

            return _oRouterConfigMetaDataEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "RouterConfigMetaDataNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }


    /// <summary>
    /// DTO list to RouterConfigMetaDataDTO list conversion
    /// </summary>
    /// <param name="RouterConfigMetaDataList">RouterConfigMetaDataDTO list dto (DTO from server)</param>
    /// <returns>RouterConfigMetaDataDTO list (Mobile entity format)</returns> 
    this.NormalizeList = function (RouterConfigMetaDataDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "RouterConfigMetaDataNormalizer.NormalizeList");

            var RouterConfigMetaDataList = new Array();
            for (var i = 0; i < RouterConfigMetaDataDTOList.length; i++) {

                RouterConfigMetaDataList[i] = MyInstance.Normalize(RouterConfigMetaDataDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "RouterConfigMetaDataNormalizer.NormalizeList");

            return RouterConfigMetaDataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "RouterConfigMetaDataNormalizer.NormalizeList", Excep);
        }
        finally {
            RouterConfigMetaDataList = null;
        }
    }
}
