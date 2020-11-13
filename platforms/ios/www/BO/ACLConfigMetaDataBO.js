
// ACLConfigMetaDataBO
function ACLConfigMetaDataBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// Download
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "ACLConfigMetaDataBO.Download");

            var IsSuccess = false;

            var _DefaultMasterDAO = new DefaultMasterDAO("ACLConfigMetaDataEntity");
            var IsExist = _DefaultMasterDAO.IsTableExist();

            if (IsExist == false) {
                var oSqliteQG = new SqliteQG();
                var Query = oSqliteQG.GetCreateTableQuery(new window["ACLConfigMetaDataEntity"]);
                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "ACLConfigMetaDataBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {

                var _oACLConfigMetaDataIL = new ACLConfigMetaDataIL();
                var _oACLConfigDetails = _oACLConfigMetaDataIL.GetACLConfig(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

                //alert(JSON.stringify(_oACLConfigDetails));

                if (_oACLConfigDetails != null && _oACLConfigDetails.IsAnyException == false) {

                    MyInstance.Create(_oACLConfigDetails.ACLConfigMetaDataDTO);
                    IsSuccess = true;
                }
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "ACLConfigMetaDataBO.Download");
            }

            OneViewConsole.Debug("Download end", "ACLConfigMetaDataBO.Download");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ACLConfigMetaDataBO.Download", Excep);
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
    /// <param name="ACLConfigMetaDataDTO">ACLConfigMetaDataDTO</param> 
    this.Create = function (ACLConfigMetaDataDTO) {

        try {
            OneViewConsole.Debug("Create start", "ACLConfigMetaDataBO.Create");

            if (ACLConfigMetaDataDTO != null) {

                var _oDefaultMasterDAO = new DefaultMasterDAO("ACLConfigMetaDataEntity");
                var Count = _oDefaultMasterDAO.Count();

                var _oACLConfigMetaDataNormalizer = new ACLConfigMetaDataNormalizer();
                var _oACLConfigMetaDataDAO = new ACLConfigMetaDataDAO();

                _oACLConfigMetaDataDAO.DeleteByServiceId(ACLConfigMetaDataDTO.ServiceId, ACLConfigMetaDataDTO.UserId);

                var oACLConfigMetaData = _oACLConfigMetaDataNormalizer.Normalize(ACLConfigMetaDataDTO);
                _oDefaultMasterDAO.Create(oACLConfigMetaData, Count);
            }

            OneViewConsole.Debug("Create end", "ACLConfigMetaDataBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ACLConfigMetaDataBO.Create", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }


    /// <summary>
    /// IsExistACLConfigMetaData
    /// </summary>   
    this.IsExistACLConfigMetaData = function () {

        try {
            OneViewConsole.Debug("IsExistACLConfigMetaData start", "ACLConfigMetaDataBO.IsExistACLConfigMetaData");

            var _Userid = OneViewSessionStorage.Get("LoginUserId");
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");

            var IsExist = false;

            var _ACLConfigMetaDataDAO = new ACLConfigMetaDataDAO();
            var Result = _ACLConfigMetaDataDAO.CheckACLConfigMetaData(_oServiceId, _Userid);


            if (Result.length > 0) {
                if (Result[0].Count > 0) {
                    IsExist = true;
                }
            }


            return IsExist;
            OneViewConsole.Debug("IsExistACLConfigMetaData end", "ACLConfigMetaDataBO.IsExistACLConfigMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ACLConfigMetaDataBO.IsExistACLConfigMetaData", Excep);
        }

    }
}

// ACLConfigMetaDataIL
function ACLConfigMetaDataIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetACLConfig
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    /// <param name="UserId">Logged in UserId</param>
    this.GetACLConfig = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("GetACLConfig Start", "ACLConfigMetaDataIL.GetACLConfig");
            OneViewConsole.DataLog("ServiceId :", ServiceId + ", UserId :", UserId);

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetACLConfigMob_json";
            _oOneViewChannel.parameter = JSON.stringify({ "ServiceId": ServiceId, "UserId": UserId, "OperationLst": [] });
            var oACLConfigDTO = _oOneViewChannel.Send();

            if (oACLConfigDTO != null) {
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oACLConfigDTO.GetACLConfigMob_jsonResult), "ACLConfigMetaDataIL.GetACLConfig");
                oACLConfigDTO = JSON.parse(oACLConfigDTO.GetACLConfigMob_jsonResult);
             
            }

            OneViewConsole.Debug("GetACLConfig End", "ACLConfigMetaDataIL.GetACLConfig");

            return oACLConfigDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "ACLConfigMetaDataIL.DcPendingTaskIL", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oACLConfigDTO = null;
        }
    }
}

// ACLConfigMetaDataDAO
function ACLConfigMetaDataDAO() {

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
    /// <param name="UserId">UserId</param>
    this.GetByServiceId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("GetByServiceId start", "ACLConfigMetaDataDAO.GetByServiceId");

            var Query = "SELECT * FROM ACLConfigMetaDataEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ACLConfigMetaDataDAO.GetAll");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ACLConfigMetaDataDAO.GetByServiceId");

            OneViewConsole.Debug("GetByServiceId end", "ACLConfigMetaDataDAO.GetByServiceId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ACLConfigMetaDataDAO.GetByServiceId", Excep);
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
    /// <param name="UserId">UserId</param> 
    this.DeleteByServiceId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("DeleteByServiceAndUserId start", "ACLConfigMetaDataDAO.DeleteByServiceAndUserId");

            var Query = "DELETE FROM ACLConfigMetaDataEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;

            OneViewConsole.Debug("Requested Query : " + Query, "ACLConfigMetaDataDAO.DeleteByServiceAndUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByServiceAndUserId end", "ACLConfigMetaDataDAO.DeleteByServiceAndUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ACLConfigMetaDataDAO.DeleteByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
        }
    }

    /// <summary>
    /// CheckACLConfigMetaData : Check ACLConfigMetaData is Exist in system before download.
    /// </summary>   

    this.CheckACLConfigMetaData = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("CheckACLConfigMetaData Start", "ACLConfigMetaDataDAO.CheckACLConfigMetaData");
            

            var ACLConfigMetaDataQuery = "Select count(*) as Count from ACLConfigMetaDataEntity Where ServiceId =" + ServiceId + " and UserId=" + UserId;

            OneViewConsole.DataLog("Requested Query : " + ACLConfigMetaDataQuery, "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(ACLConfigMetaDataQuery);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            OneViewConsole.Debug("CheckACLConfigMetaData End", "ACLConfigMetaDataDAO.CheckACLConfigMetaData");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ACLConfigMetaDataDAO.CheckACLConfigMetaData", Excep);
        }
    }
}

// ACLConfigMetaDataNormalizer
function ACLConfigMetaDataNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to ACLConfigMetaDataDTO conversion
    /// </summary>
    /// <param name="ACLConfigMetaDataDTO">ACLConfigMetaData DTO (DTO from server)</param>
    /// <returns>ACLConfigMetaDataDTO (Mobile entity format)</returns> 
    this.Normalize = function (ACLConfigMetaDataDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "ACLConfigMetaDataNormalizer.Normalize");

            var _oACLConfigMetaDataEntity = new ACLConfigMetaDataEntity();

            _oACLConfigMetaDataEntity.ServerId = ACLConfigMetaDataDTO.ServerId;
            _oACLConfigMetaDataEntity.MobileVersionId = 1;
            _oACLConfigMetaDataEntity.OVGuid = ACLConfigMetaDataDTO.OVGuid;
            _oACLConfigMetaDataEntity.ServiceId = ACLConfigMetaDataDTO.ServiceId;
            _oACLConfigMetaDataEntity.UserId = ACLConfigMetaDataDTO.UserId;

            if (ACLConfigMetaDataDTO.ACLConfig != null) {
                _oACLConfigMetaDataEntity.ACLConfig = JSON.stringify(ACLConfigMetaDataDTO.ACLConfig);
            }

            _oACLConfigMetaDataEntity.CreatedDate = CurrentDateAndTime;
            _oACLConfigMetaDataEntity.LastsyncDate = CurrentDateAndTime;
            _oACLConfigMetaDataEntity.TimeStamp = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "ACLConfigMetaDataNormalizer.Normalize");

            return _oACLConfigMetaDataEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "ACLConfigMetaDataNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }


    /// <summary>
    /// DTO list to ACLConfigMetaDataDTO list conversion
    /// </summary>
    /// <param name="ACLConfigMetaDataList">ACLConfigMetaDataDTO list dto (DTO from server)</param>
    /// <returns>ACLConfigMetaDataDTO list (Mobile entity format)</returns> 
    this.NormalizeList = function (ACLConfigMetaDataDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "ACLConfigMetaDataNormalizer.NormalizeList");

            var ACLConfigMetaDataList = new Array();
            for (var i = 0; i < ACLConfigMetaDataDTOList.length; i++) {

                ACLConfigMetaDataList[i] = MyInstance.Normalize(ACLConfigMetaDataDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "ACLConfigMetaDataNormalizer.NormalizeList");

            return ACLConfigMetaDataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "ACLConfigMetaDataNormalizer.NormalizeList", Excep);
        }
        finally {
            ACLConfigMetaDataList = null;
        }
    }
}
