
// LandingPageViewReponseBO
function LandingPageViewReponseBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();


    /// <summary>
    /// Download
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "LandingPageViewReponseBO.Download");

            var IsSuccess = false;

            var _DefaultMasterDAO = new DefaultMasterDAO("LandingPageViewReponseEntity");
            var IsExist = _DefaultMasterDAO.IsTableExist();

            if (IsExist == false) {
                var oSqliteQG = new SqliteQG();
                var Query = oSqliteQG.GetCreateTableQuery(new window["LandingPageViewReponseEntity"]);
                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }
           
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "LandingPageViewReponseBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {

                var RequestParam = {
                    ServiceId: OneViewSessionStorage.Get("ServiceId"),
                    UserId: OneViewSessionStorage.Get("LoginUserId"),
                    LandingPageMetaDataId: [],
                    Today: true,
                    Past: true,
                    Future: true
                };

                var _oLandingPageViewReponseIL = new LandingPageViewReponseIL();               
                var _oLandingPageViewReponseDetails = _oLandingPageViewReponseIL.GetLandingPageViewReponse(RequestParam);

                //alert(JSON.stringify("_oLandingPageViewReponseDetails : " + JSON.stringify(_oLandingPageViewReponseDetails)));

                if (_oLandingPageViewReponseDetails != null && _oLandingPageViewReponseDetails.isAnyException == false) {

                    MyInstance.Create(_oLandingPageViewReponseDetails.DCTaskViewInfolst);
                    IsSuccess = true;
                }
                else {
                    IsSuccess = _oLandingPageViewReponseDetails;
                }
            }          

            OneViewConsole.Debug("Download end", "LandingPageViewReponseBO.Download");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageViewReponseBO.Download", Excep);
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
    /// <param name="DCTaskViewInfolst">DCTaskViewInfolst</param> 
    this.Create = function (DCTaskViewInfolst) {

        try {
            OneViewConsole.Debug("Create start", "LandingPageViewReponseBO.Create");

            if (DCTaskViewInfolst != null) {
               
                var _oDefaultMasterDAO = new DefaultMasterDAO("LandingPageViewReponseEntity");
                var Count = _oDefaultMasterDAO.Count();
               
                var _oLandingPageViewReponseNormalizer = new LandingPageViewReponseNormalizer();
                var _oLandingPageViewReponseDAO = new LandingPageViewReponseDAO();
              
                _oLandingPageViewReponseDAO.DeleteByServiceAndUserId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));
              
                var oLandingPageDCTaskViewInfolst = _oLandingPageViewReponseNormalizer.NormalizeList(DCTaskViewInfolst);
                
                for (var i = 0; i < oLandingPageDCTaskViewInfolst.length; i++) {
                    _oDefaultMasterDAO.Create(oLandingPageDCTaskViewInfolst[i], Count);
                    Count += 1;
                }
            }

            OneViewConsole.Debug("Create end", "LandingPageViewReponseBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageViewReponseBO.Create", Excep);
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
    this.IsExistLandingPageViewReponse = function () {

        try {
            OneViewConsole.Debug("IsExistLandingPageViewReponse start", "LandingPageViewReponseBO.IsExistLandingPageViewReponse");

            var _Userid = OneViewSessionStorage.Get("LoginUserId");
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");

            var IsExist = false;

            var _LandingPageViewReponseDAO = new LandingPageViewReponseDAO();
            var Result = _LandingPageViewReponseDAO.CheckLandingPageViewReponse(_oServiceId, _Userid);

            if (Result.length > 0) {
                if (Result[0].Count > 0) {
                    IsExist = true;
                }
            }

            return IsExist;

            OneViewConsole.Debug("IsExistLandingPageViewReponse end", "LandingPageViewReponseBO.IsExistLandingPageViewReponse");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageViewReponseBO.IsExistLandingPageViewReponse", Excep);
        }

    }

    this.DeleteLandingPageViewReponse = function () {
        try {
            OneViewConsole.Debug("DeleteLandingPageViewReponse start", "LandingPageViewReponseBO.DeleteLandingPageViewReponse");

            var _Userid = OneViewSessionStorage.Get("LoginUserId");
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");


            var _LandingPageViewReponseDAO = new LandingPageViewReponseDAO();
            _LandingPageViewReponseDAO.DeleteByServiceAndUserId(_oServiceId, _Userid);


            OneViewConsole.Debug("DeleteLandingPageViewReponse end", "LandingPageViewReponseBO.DeleteLandingPageViewReponse");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageViewReponseBO.DeleteLandingPageViewReponse", Excep);
        }
    }
}

// LandingPageViewReponseIL
function LandingPageViewReponseIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetLandingPageViewReponse
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    this.GetLandingPageViewReponse = function (LandingPageRequestParam) {
        try {
            OneViewConsole.Debug("GetLandingPageViewReponse Start", "LandingPageViewReponseIL.GetLandingPageViewReponse");
            OneViewConsole.DataLog("LandingPageRequestParam :" + JSON.stringify(LandingPageRequestParam));
           
            var RequestParam = JSON.stringify(LandingPageRequestParam);

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetDCTaskList_json";
            
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
            var oLandingPageViewReponseDTO = _oOneViewChannel.Send();
           
            if (oLandingPageViewReponseDTO != null) {
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oLandingPageViewReponseDTO.GetDCTaskList_jsonResult), "LandingPageViewReponseIL.GetLandingPageViewReponse");
                oLandingPageViewReponseDTO = JSON.parse(oLandingPageViewReponseDTO.GetDCTaskList_jsonResult);
            }
            
            OneViewConsole.Debug("GetLandingPageViewReponse End", "LandingPageViewReponseIL.GetLandingPageViewReponse");

            return oLandingPageViewReponseDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "LandingPageViewReponseIL.DcPendingTaskIL", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oLandingPageViewReponseDTO = null;
        }
    }
}

// LandingPageViewReponseDAO
function LandingPageViewReponseDAO() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();


    /// <summary>
    /// GetAllViewsByServiceAndUserId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    /// <param name="UserId">UserId</param> 
    this.GetAllViewsByServiceAndUserId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("GetAllViewsByServiceAndUserId start", "LandingPageViewReponseDAO.GetAllViewsByServiceAndUserId");

            var Query = "SELECT LastsyncDate,LandingPageViewName FROM LandingPageViewReponseEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "LandingPageViewReponseDAO.GetByServiceAndUserId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "LandingPageViewReponseDAO.GetAllViewsByServiceAndUserId");

            OneViewConsole.Debug("GetAllViewsByServiceAndUserId end", "LandingPageViewReponseDAO.GetAllViewsByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageViewReponseDAO.GetAllViewsByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// GetByServiceAndUserId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    /// <param name="UserId">UserId</param> 
    this.GetByServiceAndUserId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("GetByServiceAndUserId start", "LandingPageViewReponseDAO.GetByServiceAndUserId");

            var Query = "SELECT * FROM LandingPageViewReponseEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "LandingPageViewReponseDAO.GetByServiceAndUserId");
          
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "LandingPageViewReponseDAO.GetByServiceAndUserId");
           
            OneViewConsole.Debug("GetByServiceAndUserId end", "LandingPageViewReponseDAO.GetByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageViewReponseDAO.GetByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// GetByServiceAndUserId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    /// <param name="UserId">UserId</param> 
    this.GetByServiceUserAndLandingPageViewName = function (ServiceId, UserId, LandingPageViewName) {

        try {
            OneViewConsole.Debug("GetByServiceAndUserId start", "LandingPageViewReponseDAO.GetByServiceAndUserId");

            var Query = "SELECT * FROM LandingPageViewReponseEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId + " And LandingPageViewName = '" + LandingPageViewName + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "LandingPageViewReponseDAO.GetByServiceAndUserId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "LandingPageViewReponseDAO.GetByServiceAndUserId");

            OneViewConsole.Debug("GetByServiceAndUserId end", "LandingPageViewReponseDAO.GetByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageViewReponseDAO.GetByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// UpdateLandingPageViewReponseToday
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    this.UpdateLandingPageViewReponseToday = function (ServiceId, UserId, LandingPageViewName, LandingPageViewReponseToday) {

        try {
            OneViewConsole.Debug("UpdateLandingPageViewReponseToday start", "LandingPageViewReponseDAO.UpdateLandingPageViewReponseToday");

            var Query = "UPDATE LandingPageViewReponseEntity SET LandingPageViewReponseToday = '" + LandingPageViewReponseToday + "' WHERE ServiceId = " + ServiceId + " And UserId = " + UserId + " And LandingPageViewName = '" + LandingPageViewName + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "LandingPageViewReponseDAO.GetByServiceAndUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateLandingPageViewReponseToday end", "LandingPageViewReponseDAO.UpdateLandingPageViewReponseToday");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageViewReponseDAO.GetByServiceAndUserId", Excep);
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
            OneViewConsole.Debug("DeleteByServiceAndUserId start", "LandingPageViewReponseDAO.DeleteByServiceAndUserId");

            var Query = "DELETE FROM LandingPageViewReponseEntity WHERE ServiceId = " + ServiceId + " and UserId=" + UserId;

            OneViewConsole.Debug("Requested Query : " + Query, "LandingPageViewReponseDAO.DeleteByServiceAndUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByServiceAndUserId end", "LandingPageViewReponseDAO.DeleteByServiceAndUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "LandingPageViewReponseDAO.DeleteByServiceAndUserId", Excep);
        }
        finally {
            Query = null;          
        }
    }


    /// <summary>
    /// CheckLandingPageViewReponse : Check LandingPageViewReponse is Exist in system before download.
    /// </summary>   
    this.CheckLandingPageViewReponse = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("CheckLandingPageViewReponse Start", "LandingPageViewReponseDAO.CheckLandingPageViewReponse");
           
            var LandingPageViewReponseQuery = "Select count(*) as Count from LandingPageViewReponseEntity Where ServiceId =" + ServiceId + " and UserId=" + UserId;
            
            OneViewConsole.DataLog("Requested Query : " + LandingPageViewReponseQuery, "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(LandingPageViewReponseQuery);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            OneViewConsole.Debug("CheckLandingPageViewReponse End", "LandingPageViewReponseDAO.CheckLandingPageViewReponse");

            return Result;
        }
        catch (Excep) {
            alert(Excep);
            throw oOneViewExceptionHandler.Create("DAO", "LandingPageViewReponseDAO.CheckLandingPageViewReponse", Excep);
        }
    }
}

// LandingPageViewReponseNormalizer
function LandingPageViewReponseNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to LandingPageViewReponseDTO conversion
    /// </summary>
    /// <param name="LandingPageViewReponseDTO">LandingPageViewReponse DTO (DTO from server)</param>
    /// <returns>LandingPageViewReponseDTO (Mobile entity format)</returns> 
    this.Normalize = function (LandingPageViewReponseDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "LandingPageViewReponseNormalizer.Normalize");

            var _oLandingPageViewReponseEntity = new LandingPageViewReponseEntity();

            _oLandingPageViewReponseEntity.ServerId = LandingPageViewReponseDTO.LandingPageMetaDataServerId;
            _oLandingPageViewReponseEntity.MobileVersionId = 1;
            _oLandingPageViewReponseEntity.ServiceId = LandingPageViewReponseDTO.ServiceId;
            _oLandingPageViewReponseEntity.UserId = LandingPageViewReponseDTO.UserId;
            _oLandingPageViewReponseEntity.LandingPageViewName = LandingPageViewReponseDTO.LandingPageViewDisplayName;
            _oLandingPageViewReponseEntity.IsOnDeviceApprovalProfileNeeded = LandingPageViewReponseDTO.IsOnDeviceApprovalProfileNeeded;

            if (LandingPageViewReponseDTO.LandingPageViewDisplayConfig != null) {
                _oLandingPageViewReponseEntity.LandingPageViewDisplayConfig = JSON.stringify(LandingPageViewReponseDTO.LandingPageViewDisplayConfig);
            }
            if (LandingPageViewReponseDTO.LandingPageViewReponsePast != null) {
                _oLandingPageViewReponseEntity.LandingPageViewReponsePast = JSON.stringify(LandingPageViewReponseDTO.LandingPageViewReponsePast);
            }
            if (LandingPageViewReponseDTO.LandingPageViewReponseToday != null) {
                _oLandingPageViewReponseEntity.LandingPageViewReponseToday = JSON.stringify(LandingPageViewReponseDTO.LandingPageViewReponseToday);
            }
            if (LandingPageViewReponseDTO.LandingPageViewReponseFuture != null) {
                _oLandingPageViewReponseEntity.LandingPageViewReponseFuture = JSON.stringify(LandingPageViewReponseDTO.LandingPageViewReponseFuture);
            }
            
            _oLandingPageViewReponseEntity.CreatedDate = CurrentDateAndTime;
            _oLandingPageViewReponseEntity.LastsyncDate = CurrentDateAndTime;
            _oLandingPageViewReponseEntity.TimeStamp = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "LandingPageViewReponseNormalizer.Normalize");

            return _oLandingPageViewReponseEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "LandingPageViewReponseNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }


    /// <summary>
    /// DTO list to LandingPageViewReponseDTO list conversion
    /// </summary>
    /// <param name="LandingPageViewReponseList">LandingPageViewReponseDTO list dto (DTO from server)</param>
    /// <returns>LandingPageViewReponseDTO list (Mobile entity format)</returns> 
    this.NormalizeList = function (LandingPageViewReponseDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "LandingPageViewReponseNormalizer.NormalizeList");

            var LandingPageViewReponseList = new Array();
            for (var i = 0; i < LandingPageViewReponseDTOList.length; i++) {

                LandingPageViewReponseList[i] = MyInstance.Normalize(LandingPageViewReponseDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "LandingPageViewReponseNormalizer.NormalizeList");

            return LandingPageViewReponseList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "LandingPageViewReponseNormalizer.NormalizeList", Excep);
        }
        finally {
            LandingPageViewReponseList = null;
        }
    }
}
