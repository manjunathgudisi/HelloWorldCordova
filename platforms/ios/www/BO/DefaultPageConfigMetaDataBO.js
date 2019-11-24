
// DefaultPageConfigMetaDataBO
function DefaultPageConfigMetaDataBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// Download
    /// </summary>
    this.Download = function (PageIds) {

        try {
            OneViewConsole.Debug("Download start", "DefaultPageConfigMetaDataBO.Download");

            var IsSuccess = false;

            var _DefaultMasterDAO = new DefaultMasterDAO("DefaultPageConfigMetaDataEntity");
            var IsExist = _DefaultMasterDAO.IsTableExist();

            if (IsExist == false) {
                var oSqliteQG = new SqliteQG();
                var Query = oSqliteQG.GetCreateTableQuery(new window["DefaultPageConfigMetaDataEntity"]);
                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "DefaultPageConfigMetaDataBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {

                var _oDefaultPageConfigMetaDataIL = new DefaultPageConfigMetaDataIL();
                var _oDefaultPageConfigDetails = _oDefaultPageConfigMetaDataIL.GetDefaultPageConfig(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), PageIds);

                //alert(JSON.stringify(_oDefaultPageConfigDetails));

                if (_oDefaultPageConfigDetails != null && _oDefaultPageConfigDetails.IsAnyException == false) {

                    MyInstance.Create(_oDefaultPageConfigDetails.DefaultPageConfigMetaDataDTOLst);
                    IsSuccess = true;
                }
            }
            else {
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No Internet Connection", "DefaultPageConfigMetaDataBO.Download");
            }
                      
            OneViewConsole.Debug("Download end", "DefaultPageConfigMetaDataBO.Download");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultPageConfigMetaDataBO.Download", Excep);
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
    /// <param name="DefaultPageConfigMetaDataDTOLst">DefaultPageConfigMetaDataDTOLst</param> 
    this.Create = function (DefaultPageConfigMetaDataDTOLst) {

        try {
            OneViewConsole.Debug("Create start", "DefaultPageConfigMetaDataBO.Create");

            if (DefaultPageConfigMetaDataDTOLst != null && DefaultPageConfigMetaDataDTOLst.length > 0) {

                var _oDefaultMasterDAO = new DefaultMasterDAO("DefaultPageConfigMetaDataEntity");
                var Count = _oDefaultMasterDAO.Count();

                var _oDefaultPageConfigMetaDataNormalizer = new DefaultPageConfigMetaDataNormalizer();
                var _oDefaultPageConfigMetaDataDAO = new DefaultPageConfigMetaDataDAO();
                var _oTaskSyncLogDAO = new TaskSyncLogDAO();

                for (var i = 0; i < DefaultPageConfigMetaDataDTOLst.length; i++) {

                    var DefaultPageConfigMetaDataDTO = DefaultPageConfigMetaDataDTOLst[i];
                    _oDefaultPageConfigMetaDataDAO.DeleteByServiceUserAndPageId(DefaultPageConfigMetaDataDTO.ServiceId, DefaultPageConfigMetaDataDTO.UserId, DefaultPageConfigMetaDataDTO.PageId);

                    var oDefaultPageConfigMetaData = _oDefaultPageConfigMetaDataNormalizer.Normalize(DefaultPageConfigMetaDataDTO);
                    _oDefaultMasterDAO.Create(oDefaultPageConfigMetaData, Count);

                    if (IsGlobalAutoSyncEnabled == true) {
                        //Sync TaskSyncLogEntity
                        var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(DefaultPageConfigMetaDataDTO.ServerId, DefaultPageConfigMetaDataDTO.Type);
                    }
                }

                Count += 1;
            }

            OneViewConsole.Debug("Create end", "DefaultPageConfigMetaDataBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultPageConfigMetaDataBO.Create", Excep);
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
    this.IsExistDefaultPageConfigMetaData = function () {

        try {
            OneViewConsole.Debug("IsExistDefaultPageConfigMetaData start", "DefaultPageConfigMetaDataBO.IsExistDefaultPageConfigMetaData");

            var _Userid = OneViewSessionStorage.Get("LoginUserId");
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");

            var IsExist = false;

            var _oDefaultPageConfigMetaDataDAO = new DefaultPageConfigMetaDataDAO();
            var Result = _oDefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta(_oServiceId, _Userid);

            
            if (Result.length > 0) {
                if (Result[0].Count > 0) {
                    IsExist = true;
                }
            }

           
            return IsExist;
            OneViewConsole.Debug("IsExistDefaultPageConfigMetaData end", "DefaultPageConfigMetaDataBO.IsExistDefaultPageConfigMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultPageConfigMetaDataBO.IsExistDefaultPageConfigMetaData", Excep);
        }
      
    }
}

// DefaultPageConfigMetaDataIL
function DefaultPageConfigMetaDataIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetDefaultPageConfig
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    /// <param name="UserId">Logged in UserId</param>
    this.GetDefaultPageConfig = function (ServiceId, UserId, PageIds) {
        try {
            OneViewConsole.Debug("GetDefaultPageConfig Start", "DefaultPageConfigMetaDataIL.GetDefaultPageConfig");
            OneViewConsole.DataLog("ServiceId :", ServiceId + ", UserId :", UserId + ", PageIds :", PageIds);

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetMobileDefaultPageConfigMetaData_json";
            _oOneViewChannel.parameter = JSON.stringify({ "ServiceId": ServiceId, "UserId": UserId });
            //alert(' _oOneViewChannel.parameter  : ' + _oOneViewChannel.parameter);
            var oDefaultPageConfigDTO = _oOneViewChannel.Send();

            if (oDefaultPageConfigDTO != null) {
                //alert('JSON.stringify(oDefaultPageConfigDTO.GetMobileDefaultPageConfigMetaData_jsonResult) : ' + oDefaultPageConfigDTO.GetMobileDefaultPageConfigMetaData_jsonResult);
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oDefaultPageConfigDTO.GetMobileDefaultPageConfigMetaData_jsonResult), "DefaultPageConfigMetaDataIL.GetDefaultPageConfig");
                oDefaultPageConfigDTO = JSON.parse(oDefaultPageConfigDTO.GetMobileDefaultPageConfigMetaData_jsonResult);
            }

            OneViewConsole.Debug("GetDefaultPageConfig End", "DefaultPageConfigMetaDataIL.GetDefaultPageConfig");

            return oDefaultPageConfigDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "DefaultPageConfigMetaDataIL.GetDefaultPageConfig", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oDefaultPageConfigDTO = null;
        }
    }
}

// DefaultPageConfigMetaDataDAO
function DefaultPageConfigMetaDataDAO() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();


    /// <summary>
    /// GetByServiceUserAndPageId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    /// <param name="UserId">UserId</param>
    this.GetByServiceUserAndPageId = function (ServiceId, UserId ,PageId) {

        try {
            OneViewConsole.Debug("GetByServiceUserAndPageId start", "DefaultPageConfigMetaDataDAO.GetByServiceUserAndPageId");

            var Query = "SELECT * FROM DefaultPageConfigMetaDataEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId + " And PageId = " + PageId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultPageConfigMetaDataDAO.GetByServiceUserAndPageId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultPageConfigMetaDataDAO.GetByServiceUserAndPageId");

            OneViewConsole.Debug("GetByServiceUserAndPageId end", "DefaultPageConfigMetaDataDAO.GetByServiceUserAndPageId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultPageConfigMetaDataDAO.GetByServiceUserAndPageId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// DeleteByServiceUserAndPageId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    /// <param name="UserId">UserId</param> 
    this.DeleteByServiceUserAndPageId = function (ServiceId, UserId, PageId) {

        try {
            OneViewConsole.Debug("DeleteByServiceUserAndPageId start", "DefaultPageConfigMetaDataDAO.DeleteByServiceUserAndPageId");

            var Query = "DELETE FROM DefaultPageConfigMetaDataEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId + " And PageId = " + PageId;

            OneViewConsole.Debug("Requested Query : " + Query, "DefaultPageConfigMetaDataDAO.DeleteByServiceUserAndPageId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByServiceUserAndPageId end", "DefaultPageConfigMetaDataDAO.DeleteByServiceUserAndPageId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultPageConfigMetaDataDAO.DeleteByServiceUserAndPageId", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>
    /// CheckDefaultPageConfigMeta : Check DefaultPageConfigMeta is Exist in system before download.
    /// </summary>   

    this.CheckDefaultPageConfigMeta = function (ServiceId, UserId ) {
        try {
            OneViewConsole.Debug("CheckDefaultPageConfigMeta Start", "LoginBO.CheckDefaultPageConfigMeta");
           

            var DefaultPageConfigMetaDataQuery = "Select count(*) as Count from DefaultPageConfigMetaDataEntity Where ServiceId =" + ServiceId + " and UserId=" + UserId;

            OneViewConsole.DataLog("Requested Query : " + DefaultPageConfigMetaDataQuery, "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(DefaultPageConfigMetaDataQuery);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            OneViewConsole.Debug("CheckDefaultPageConfigMeta End", "LoginBO.CheckDefaultPageConfigMeta");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "LoginBO.CheckDefaultPageConfigMeta", Excep);
        }
    }
            
}

// DefaultPageConfigMetaDataNormalizer
function DefaultPageConfigMetaDataNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to DefaultPageConfigMetaDataDTO conversion
    /// </summary>
    /// <param name="DefaultPageConfigMetaDataDTO">DefaultPageConfigMetaData DTO (DTO from server)</param>
    /// <returns>DefaultPageConfigMetaDataDTO (Mobile entity format)</returns> 
    this.Normalize = function (DefaultPageConfigMetaDataDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "DefaultPageConfigMetaDataNormalizer.Normalize");

            var _oDefaultPageConfigMetaDataEntity = new DefaultPageConfigMetaDataEntity();

            _oDefaultPageConfigMetaDataEntity.ServerId = DefaultPageConfigMetaDataDTO.ServerId;
            _oDefaultPageConfigMetaDataEntity.MobileVersionId = 1;
            _oDefaultPageConfigMetaDataEntity.OVGuid = DefaultPageConfigMetaDataDTO.OVGuid;
            _oDefaultPageConfigMetaDataEntity.ServiceId = DefaultPageConfigMetaDataDTO.ServiceId;
            _oDefaultPageConfigMetaDataEntity.UserId = DefaultPageConfigMetaDataDTO.UserId;
            _oDefaultPageConfigMetaDataEntity.PageId = DefaultPageConfigMetaDataDTO.PageId;
            _oDefaultPageConfigMetaDataEntity.Type = DefaultPageConfigMetaDataDTO.Type;

            if (DefaultPageConfigMetaDataDTO.PageConfig != null) {
                _oDefaultPageConfigMetaDataEntity.PageConfig = JSON.stringify(DefaultPageConfigMetaDataDTO.PageConfig);
            }

            _oDefaultPageConfigMetaDataEntity.CreatedDate = CurrentDateAndTime;
            _oDefaultPageConfigMetaDataEntity.LastsyncDate = CurrentDateAndTime;
            _oDefaultPageConfigMetaDataEntity.TimeStamp = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "DefaultPageConfigMetaDataNormalizer.Normalize");

            return _oDefaultPageConfigMetaDataEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DefaultPageConfigMetaDataNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }


    /// <summary>
    /// DTO list to DefaultPageConfigMetaDataDTO list conversion
    /// </summary>
    /// <param name="DefaultPageConfigMetaDataList">DefaultPageConfigMetaDataDTO list dto (DTO from server)</param>
    /// <returns>DefaultPageConfigMetaDataDTO list (Mobile entity format)</returns> 
    this.NormalizeList = function (DefaultPageConfigMetaDataDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "DefaultPageConfigMetaDataNormalizer.NormalizeList");

            var DefaultPageConfigMetaDataList = new Array();
            for (var i = 0; i < DefaultPageConfigMetaDataDTOList.length; i++) {

                DefaultPageConfigMetaDataList[i] = MyInstance.Normalize(DefaultPageConfigMetaDataDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "DefaultPageConfigMetaDataNormalizer.NormalizeList");

            return DefaultPageConfigMetaDataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DefaultPageConfigMetaDataNormalizer.NormalizeList", Excep);
        }
        finally {
            DefaultPageConfigMetaDataList = null;
        }
    }
}
