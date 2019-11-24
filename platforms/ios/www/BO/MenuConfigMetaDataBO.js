
// MenuConfigMetaDataBO
function MenuConfigMetaDataBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// Download
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "MenuConfigMetaDataBO.Download");

            var IsSuccess = false;

            var _DefaultMasterDAO = new DefaultMasterDAO("MenuConfigMetaDataEntity");
            var IsExist = _DefaultMasterDAO.IsTableExist();

            if (IsExist == false) {
                var oSqliteQG = new SqliteQG();
                var Query = oSqliteQG.GetCreateTableQuery(new window["MenuConfigMetaDataEntity"]);
                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }
           
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "MenuConfigMetaDataBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {

                var _oMenuConfigMetaDataIL = new MenuConfigMetaDataIL();
                var _oMenuConfigDetails = _oMenuConfigMetaDataIL.GetMenuConfig(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

                //alert(JSON.stringify("_oMenuConfigDetails : " + JSON.stringify(_oMenuConfigDetails)));

                if (_oMenuConfigDetails != null && _oMenuConfigDetails.IsAnyException == false) {

                    MyInstance.Create(_oMenuConfigDetails.MenuConfigMetaDataDTO);
                    IsSuccess = true;
                }
            }
            else {
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No Internet Connection", "MenuConfigMetaDataBO.Download");
            }

            OneViewConsole.Debug("Download end", "MenuConfigMetaDataBO.Download");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MenuConfigMetaDataBO.Download", Excep);
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
    /// <param name="MenuConfigMetaDataDTO">MenuConfigMetaDataDTO</param> 
    this.Create = function (MenuConfigMetaDataDTO) {

        try {
            OneViewConsole.Debug("Create start", "MenuConfigMetaDataBO.Create");

            if (MenuConfigMetaDataDTO != null) {
               
                var _oDefaultMasterDAO = new DefaultMasterDAO("MenuConfigMetaDataEntity");
                var Count = _oDefaultMasterDAO.Count();
               
                var _oMenuConfigMetaDataNormalizer = new MenuConfigMetaDataNormalizer();
                var _oMenuConfigMetaDataDAO = new MenuConfigMetaDataDAO();
                
                _oMenuConfigMetaDataDAO.DeleteByServiceAndUserId(MenuConfigMetaDataDTO.ServiceId, MenuConfigMetaDataDTO.UserId);
              
                var oMenuConfigMetaData = _oMenuConfigMetaDataNormalizer.Normalize(MenuConfigMetaDataDTO);
                _oDefaultMasterDAO.Create(oMenuConfigMetaData, Count);              
            }

            OneViewConsole.Debug("Create end", "MenuConfigMetaDataBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MenuConfigMetaDataBO.Create", Excep);
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
    this.IsExistMenuConfigMetaData = function () {

        try {
            OneViewConsole.Debug("IsExistMenuConfigMetaData start", "MenuConfigMetaDataBO.IsExistMenuConfigMetaData");

            var _Userid = OneViewSessionStorage.Get("LoginUserId");
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");

            var IsExist = false;

            var _MenuConfigMetaDataDAO = new MenuConfigMetaDataDAO();
            var Result = _MenuConfigMetaDataDAO.CheckMenuConfigMetaData(_oServiceId, _Userid);


            if (Result.length > 0) {
                if (Result[0].Count > 0) {
                    IsExist = true;
                }
            }


            return IsExist;
            OneViewConsole.Debug("IsExistMenuConfigMetaData end", "MenuConfigMetaDataBO.IsExistMenuConfigMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MenuConfigMetaDataBO.IsExistMenuConfigMetaData", Excep);
        }

    }
}

// MenuConfigMetaDataIL
function MenuConfigMetaDataIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetMenuConfig
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    this.GetMenuConfig = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("GetMenuConfig Start", "MenuConfigMetaDataIL.GetMenuConfig");
            OneViewConsole.DataLog("ServiceId :", ServiceId + ", UserId :", UserId);

            var MenuRequest = { "ServiceId": ServiceId, "UserId": UserId, "RoleNodeIds": [], "UserGroupIds": [], "IsforForMobile": true, "IsforForPortal": false };
            var RequestParam = JSON.stringify(MenuRequest);

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetMenuConfig_json";
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
            var oMenuConfigDTO = _oOneViewChannel.Send();
           
            if (oMenuConfigDTO != null) {
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oMenuConfigDTO.GetMenuConfig_jsonResult), "MenuConfigMetaDataIL.GetMenuConfig");
                oMenuConfigDTO = JSON.parse(oMenuConfigDTO.GetMenuConfig_jsonResult);
            }
            
            OneViewConsole.Debug("GetMenuConfig End", "MenuConfigMetaDataIL.GetMenuConfig");

            return oMenuConfigDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "MenuConfigMetaDataIL.DcPendingTaskIL", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oMenuConfigDTO = null;
        }
    }
}

// MenuConfigMetaDataDAO
function MenuConfigMetaDataDAO() {

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
            OneViewConsole.Debug("GetByServiceAndUserId start", "MenuConfigMetaDataDAO.GetByServiceAndUserId");

            var Query = "SELECT * FROM MenuConfigMetaDataEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "MenuConfigMetaDataDAO.GetByServiceAndUserId");
          
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MenuConfigMetaDataDAO.GetByServiceAndUserId");
           
            OneViewConsole.Debug("GetByServiceAndUserId end", "MenuConfigMetaDataDAO.GetByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MenuConfigMetaDataDAO.GetByServiceAndUserId", Excep);
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
            OneViewConsole.Debug("DeleteByServiceAndUserId start", "MenuConfigMetaDataDAO.DeleteByServiceAndUserId");

            //var Query = "DELETE FROM MenuConfigMetaDataEntity WHERE ServiceId = " + ServiceId;
            var Query = "DELETE FROM MenuConfigMetaDataEntity WHERE ServiceId = " + ServiceId + " and UserId=" + UserId;
           
            OneViewConsole.Debug("Requested Query : " + Query, "MenuConfigMetaDataDAO.DeleteByServiceAndUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByServiceAndUserId end", "MenuConfigMetaDataDAO.DeleteByServiceAndUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MenuConfigMetaDataDAO.DeleteByServiceAndUserId", Excep);
        }
        finally {
            Query = null;          
        }
    }



    /// <summary>
    /// CheckMenuConfigMetaData : Check MenuConfigMetaData is Exist in system before download.
    /// </summary>   

    this.CheckMenuConfigMetaData = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("CheckMenuConfigMetaData Start", "MenuConfigMetaDataDAO.CheckMenuConfigMetaData");
           
            var MenuConfigMetaDataQuery = "Select count(*) as Count from MenuConfigMetaDataEntity Where ServiceId =" + ServiceId + " and UserId=" + UserId;

            OneViewConsole.DataLog("Requested Query : " + MenuConfigMetaDataQuery, "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(MenuConfigMetaDataQuery);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            OneViewConsole.Debug("CheckMenuConfigMetaData End", "MenuConfigMetaDataDAO.CheckMenuConfigMetaData");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MenuConfigMetaDataDAO.CheckMenuConfigMetaData", Excep);
        }
    }
}

// MenuConfigMetaDataNormalizer
function MenuConfigMetaDataNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to MenuConfigMetaDataDTO conversion
    /// </summary>
    /// <param name="MenuConfigMetaDataDTO">MenuConfigMetaData DTO (DTO from server)</param>
    /// <returns>MenuConfigMetaDataDTO (Mobile entity format)</returns> 
    this.Normalize = function (MenuConfigMetaDataDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "MenuConfigMetaDataNormalizer.Normalize");

            var _oMenuConfigMetaDataEntity = new MenuConfigMetaDataEntity();

            _oMenuConfigMetaDataEntity.ServerId = MenuConfigMetaDataDTO.ServerId;
            _oMenuConfigMetaDataEntity.MobileVersionId = 1;
            _oMenuConfigMetaDataEntity.OVGuid = MenuConfigMetaDataDTO.OVGuid;
            _oMenuConfigMetaDataEntity.ServiceId = MenuConfigMetaDataDTO.ServiceId;
            _oMenuConfigMetaDataEntity.UserId = MenuConfigMetaDataDTO.UserId;

            if (MenuConfigMetaDataDTO.MenuConfig != null) {
                _oMenuConfigMetaDataEntity.MenuConfig = JSON.stringify(MenuConfigMetaDataDTO.MenuConfig);
            }
            
            _oMenuConfigMetaDataEntity.CreatedDate = CurrentDateAndTime;
            _oMenuConfigMetaDataEntity.LastsyncDate = CurrentDateAndTime;
            _oMenuConfigMetaDataEntity.TimeStamp = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "MenuConfigMetaDataNormalizer.Normalize");

            return _oMenuConfigMetaDataEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "MenuConfigMetaDataNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }


    /// <summary>
    /// DTO list to MenuConfigMetaDataDTO list conversion
    /// </summary>
    /// <param name="MenuConfigMetaDataList">MenuConfigMetaDataDTO list dto (DTO from server)</param>
    /// <returns>MenuConfigMetaDataDTO list (Mobile entity format)</returns> 
    this.NormalizeList = function (MenuConfigMetaDataDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "MenuConfigMetaDataNormalizer.NormalizeList");

            var MenuConfigMetaDataList = new Array();
            for (var i = 0; i < MenuConfigMetaDataDTOList.length; i++) {

                MenuConfigMetaDataList[i] = MyInstance.Normalize(MenuConfigMetaDataDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "MenuConfigMetaDataNormalizer.NormalizeList");

            return MenuConfigMetaDataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "MenuConfigMetaDataNormalizer.NormalizeList", Excep);
        }
        finally {
            MenuConfigMetaDataList = null;
        }
    }
}
