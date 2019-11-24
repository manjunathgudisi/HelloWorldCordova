
// LandingPageConfigMetaDataBO
function LandingPageConfigMetaDataBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// Download
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "LandingPageConfigMetaDataBO.Download");

            var IsSuccess = false;

            var _DefaultMasterDAO = new DefaultMasterDAO("LandingPageConfigMetaDataEntity");
            var IsExist = _DefaultMasterDAO.IsTableExist();

            if (IsExist == false) {
                var oSqliteQG = new SqliteQG();
                var Query = oSqliteQG.GetCreateTableQuery(new window["LandingPageConfigMetaDataEntity"]);
                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }
           
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "LandingPageConfigMetaDataBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {

                var _oLandingPageConfigMetaDataIL = new LandingPageConfigMetaDataIL();
                var _oLandingPageConfigDetails = _oLandingPageConfigMetaDataIL.GetLandingPageConfig(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

                //alert(JSON.stringify("_oLandingPageConfigDetails : " + JSON.stringify(_oLandingPageConfigDetails)));

                if (_oLandingPageConfigDetails != null && _oLandingPageConfigDetails.IsAnyException == false) {

                    MyInstance.Create(_oLandingPageConfigDetails.LandingPageConfigMetaDataDTO);
                    IsSuccess = true;
                }
            }
            else {
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No Internet Connection", "LandingPageConfigMetaDataBO.Download");
            }

            OneViewConsole.Debug("Download end", "LandingPageConfigMetaDataBO.Download");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageConfigMetaDataBO.Download", Excep);
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
    /// <param name="LandingPageConfigMetaDataDTO">LandingPageConfigMetaDataDTO</param> 
    this.Create = function (LandingPageConfigMetaDataDTO) {

        try {
            OneViewConsole.Debug("Create start", "LandingPageConfigMetaDataBO.Create");

            if (LandingPageConfigMetaDataDTO != null) {
               
                var _oDefaultMasterDAO = new DefaultMasterDAO("LandingPageConfigMetaDataEntity");
                var Count = _oDefaultMasterDAO.Count();
               
                var _oLandingPageConfigMetaDataNormalizer = new LandingPageConfigMetaDataNormalizer();
                var _oLandingPageConfigMetaDataDAO = new LandingPageConfigMetaDataDAO();
              
                _oLandingPageConfigMetaDataDAO.DeleteByServiceAndUserId(LandingPageConfigMetaDataDTO.ServiceId);
              
                var oLandingPageConfigMetaData = _oLandingPageConfigMetaDataNormalizer.Normalize(LandingPageConfigMetaDataDTO);
                _oDefaultMasterDAO.Create(oLandingPageConfigMetaData, Count);              
            }

            OneViewConsole.Debug("Create end", "LandingPageConfigMetaDataBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageConfigMetaDataBO.Create", Excep);
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
    this.IsExistLandingPageConfigMetaData = function () {

        try {
            OneViewConsole.Debug("IsExistLandingPageConfigMetaData start", "LandingPageConfigMetaDataBO.IsExistLandingPageConfigMetaData");

            var _Userid = OneViewSessionStorage.Get("LoginUserId");
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");

            var IsExist = false;

            var _LandingPageConfigMetaDataDAO = new LandingPageConfigMetaDataDAO();
            var Result = _LandingPageConfigMetaDataDAO.CheckLandingPageConfigMetaData(_oServiceId, _Userid);

            if (Result.length > 0) {
                if (Result[0].Count > 0) {
                    IsExist = true;
                }
            }

            OneViewConsole.Debug("IsExistLandingPageConfigMetaData end", "LandingPageConfigMetaDataBO.IsExistLandingPageConfigMetaData");

            return IsExist;            
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageConfigMetaDataBO.IsExistLandingPageConfigMetaData", Excep);
        }

    }
}

// LandingPageConfigMetaDataIL
function LandingPageConfigMetaDataIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetLandingPageConfig
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    this.GetLandingPageConfig = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("GetLandingPageConfig Start", "LandingPageConfigMetaDataIL.GetLandingPageConfig");
            OneViewConsole.DataLog("ServiceId :", ServiceId + ", UserId :", UserId);

            var LandingPageRequest = { "ServiceId": ServiceId, "UserId": UserId, "RoleNodeIds": [], "UserGroupIds": [], "IsforForMobile": true, "IsforForPortal": false };
            var RequestParam = JSON.stringify(LandingPageRequest);

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetLandingPageConfig_json";
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
            var oLandingPageConfigDTO = _oOneViewChannel.Send();
           
            if (oLandingPageConfigDTO != null) {
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oLandingPageConfigDTO.GetLandingPageConfig_jsonResult), "LandingPageConfigMetaDataIL.GetLandingPageConfig");
                oLandingPageConfigDTO = JSON.parse(oLandingPageConfigDTO.GetLandingPageConfig_jsonResult);
            }
            
            OneViewConsole.Debug("GetLandingPageConfig End", "LandingPageConfigMetaDataIL.GetLandingPageConfig");

            return oLandingPageConfigDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "LandingPageConfigMetaDataIL.DcPendingTaskIL", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oLandingPageConfigDTO = null;
        }
    }
}

// LandingPageConfigMetaDataDAO
function LandingPageConfigMetaDataDAO() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();


    /// <summary>
    /// GetByServiceAndUserId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    this.GetByServiceAndUserId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("GetByServiceAndUserId start", "LandingPageConfigMetaDataDAO.GetByServiceAndUserId");

            var Query = "SELECT * FROM LandingPageConfigMetaDataEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "LandingPageConfigMetaDataDAO.GetByServiceAndUserId");
          
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "LandingPageConfigMetaDataDAO.GetByServiceAndUserId");
           
            OneViewConsole.Debug("GetByServiceAndUserId end", "LandingPageConfigMetaDataDAO.GetByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageConfigMetaDataDAO.GetByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// DeleteByServiceAndUserId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    this.DeleteByServiceAndUserId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("DeleteByServiceAndUserId start", "LandingPageConfigMetaDataDAO.DeleteByServiceAndUserId");

            var Query = "DELETE FROM LandingPageConfigMetaDataEntity WHERE ServiceId = " + ServiceId;

            OneViewConsole.Debug("Requested Query : " + Query, "LandingPageConfigMetaDataDAO.DeleteByServiceAndUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByServiceAndUserId end", "LandingPageConfigMetaDataDAO.DeleteByServiceAndUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "LandingPageConfigMetaDataDAO.DeleteByServiceAndUserId", Excep);
        }
        finally {
            Query = null;          
        }
    }


    /// <summary>
    /// CheckLandingPageConfigMetaData : Check LandingPageConfigMetaData is Exist in system before download.
    /// </summary>   

    this.CheckLandingPageConfigMetaData = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("CheckLandingPageConfigMetaData Start", "LandingPageConfigMetaDataDAO.CheckLandingPageConfigMetaData");
           
            var LandingPageConfigMetaDataQuery = "Select count(*) as Count from LandingPageConfigMetaDataEntity Where ServiceId =" + ServiceId + " and UserId=" + UserId;

            OneViewConsole.DataLog("Requested Query : " + LandingPageConfigMetaDataQuery, "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(LandingPageConfigMetaDataQuery);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            OneViewConsole.Debug("CheckLandingPageConfigMetaData End", "LandingPageConfigMetaDataDAO.CheckLandingPageConfigMetaData");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "LandingPageConfigMetaDataDAO.CheckLandingPageConfigMetaData", Excep);
        }
    }
}

// LandingPageConfigMetaDataNormalizer
function LandingPageConfigMetaDataNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to LandingPageConfigMetaDataDTO conversion
    /// </summary>
    /// <param name="LandingPageConfigMetaDataDTO">LandingPageConfigMetaData DTO (DTO from server)</param>
    /// <returns>LandingPageConfigMetaDataDTO (Mobile entity format)</returns> 
    this.Normalize = function (LandingPageConfigMetaDataDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "LandingPageConfigMetaDataNormalizer.Normalize");

            var _oLandingPageConfigMetaDataEntity = new LandingPageConfigMetaDataEntity();

            _oLandingPageConfigMetaDataEntity.ServerId = LandingPageConfigMetaDataDTO.ServerId;
            _oLandingPageConfigMetaDataEntity.MobileVersionId = 1;
            _oLandingPageConfigMetaDataEntity.OVGuid = LandingPageConfigMetaDataDTO.OVGuid;
            _oLandingPageConfigMetaDataEntity.ServiceId = LandingPageConfigMetaDataDTO.ServiceId;
            _oLandingPageConfigMetaDataEntity.UserId = LandingPageConfigMetaDataDTO.UserId;

            if (LandingPageConfigMetaDataDTO.LandingPageConfig != null) {
                _oLandingPageConfigMetaDataEntity.LandingPageConfig = JSON.stringify(LandingPageConfigMetaDataDTO.LandingPageConfig);
            }
            
            _oLandingPageConfigMetaDataEntity.CreatedDate = CurrentDateAndTime;
            _oLandingPageConfigMetaDataEntity.LastsyncDate = CurrentDateAndTime;
            _oLandingPageConfigMetaDataEntity.TimeStamp = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "LandingPageConfigMetaDataNormalizer.Normalize");

            return _oLandingPageConfigMetaDataEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "LandingPageConfigMetaDataNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }


    /// <summary>
    /// DTO list to LandingPageConfigMetaDataDTO list conversion
    /// </summary>
    /// <param name="LandingPageConfigMetaDataList">LandingPageConfigMetaDataDTO list dto (DTO from server)</param>
    /// <returns>LandingPageConfigMetaDataDTO list (Mobile entity format)</returns> 
    this.NormalizeList = function (LandingPageConfigMetaDataDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "LandingPageConfigMetaDataNormalizer.NormalizeList");

            var LandingPageConfigMetaDataList = new Array();
            for (var i = 0; i < LandingPageConfigMetaDataDTOList.length; i++) {

                LandingPageConfigMetaDataList[i] = MyInstance.Normalize(LandingPageConfigMetaDataDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "LandingPageConfigMetaDataNormalizer.NormalizeList");

            return LandingPageConfigMetaDataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "LandingPageConfigMetaDataNormalizer.NormalizeList", Excep);
        }
        finally {
            LandingPageConfigMetaDataList = null;
        }
    }
}
