
// MitmarkLandingPageViewReponseBO
function MitmarkLandingPageViewReponseBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();


    /// <summary>
    /// Download
    /// </summary>
    this.Download = function (TemplateGroupIdList) {

        try {
            OneViewConsole.Debug("Download start", "MitmarkLandingPageViewReponseBO.Download");

            var IsSuccess = false;

            /*
            var _DefaultMasterDAO = new DefaultMasterDAO("MitmarkLandingPageViewReponseEntity");
            var IsExist = _DefaultMasterDAO.IsTableExist();

            if (IsExist == false) {
                var oSqliteQG = new SqliteQG();
                var Query = oSqliteQG.GetCreateTableQuery(new window["MitmarkLandingPageViewReponseEntity"]);
                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }
           */

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "MitmarkLandingPageViewReponseBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {

                var RequestParam = {
                    OSGuid: OneViewSessionStorage.Get("ServiceId"),
                    UserId: OneViewSessionStorage.Get("LoginUserId"),
                    'TemplateGroupIds': TemplateGroupIdList,
                };

                var _oMitmarkLandingPageViewReponseIL = new MitmarkLandingPageViewReponseIL();               
                var _oMitmarkLandingPageViewReponseDetails = _oMitmarkLandingPageViewReponseIL.GetMitmarkLandingPageViewReponse(RequestParam);

                //alert("_oMitmarkLandingPageViewReponseDetails : " + JSON.stringify(_oMitmarkLandingPageViewReponseDetails));

                if (_oMitmarkLandingPageViewReponseDetails != null && _oMitmarkLandingPageViewReponseDetails.isAnyException == false) {
                    MyInstance.Create(_oMitmarkLandingPageViewReponseDetails.DCTaskViewDTOLst);
                    IsSuccess = true;
                }
                else {
                    IsSuccess = _oMitmarkLandingPageViewReponseDetails;
                }
            }          

            OneViewConsole.Debug("Download end", "MitmarkLandingPageViewReponseBO.Download");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageViewReponseBO.Download", Excep);
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
    this.Create = function (DCTaskViewDTOLst) {

        try {
            OneViewConsole.Debug("Create start", "MitmarkLandingPageViewReponseBO.Create");

            if (DCTaskViewDTOLst != null) {
                var _oDefaultMasterDAO = new DefaultMasterDAO("MitmarkLandingPageViewReponseEntity");
                var Count = _oDefaultMasterDAO.Count();
               
                var _oMitmarkLandingPageViewReponseNormalizer = new MitmarkLandingPageViewReponseNormalizer();
                var _oMitmarkLandingPageViewReponseDAO = new MitmarkLandingPageViewReponseDAO();
              
                _oMitmarkLandingPageViewReponseDAO.DeleteByServiceAndUserId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));
              
                var oLandingPageDCTaskViewInfolst = _oMitmarkLandingPageViewReponseNormalizer.NormalizeList(DCTaskViewDTOLst);
                
                for (var i = 0; i < oLandingPageDCTaskViewInfolst.length; i++) {
                    _oDefaultMasterDAO.Create(oLandingPageDCTaskViewInfolst[i], Count);
                    Count += 1;
                }
            }

            OneViewConsole.Debug("Create end", "MitmarkLandingPageViewReponseBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageViewReponseBO.Create", Excep);
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
            OneViewConsole.Debug("IsExistLandingPageViewReponse start", "MitmarkLandingPageViewReponseBO.IsExistLandingPageViewReponse");

            var _Userid = OneViewSessionStorage.Get("LoginUserId");
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");

            var IsExist = false;

            var _LandingPageViewReponseDAO = new MitmarkLandingPageViewReponseDAO();
            var Result = _LandingPageViewReponseDAO.CheckLandingPageViewReponse(_oServiceId, _Userid);

            if (Result.length > 0) {
                if (Result[0].Count > 0) {
                    IsExist = true;
                }
            }

            return IsExist;

            OneViewConsole.Debug("IsExistLandingPageViewReponse end", "MitmarkLandingPageViewReponseBO.IsExistLandingPageViewReponse");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageViewReponseBO.IsExistLandingPageViewReponse", Excep);
        }

    }

    this.DeleteLandingPageViewReponse = function () {
        try {
            OneViewConsole.Debug("DeleteLandingPageViewReponse start", "MitmarkLandingPageViewReponseBO.DeleteLandingPageViewReponse");

            var _Userid = OneViewSessionStorage.Get("LoginUserId");
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");


            var _LandingPageViewReponseDAO = new MitmarkLandingPageViewReponseDAO();
            _LandingPageViewReponseDAO.DeleteByServiceAndUserId(_oServiceId, _Userid);


            OneViewConsole.Debug("DeleteLandingPageViewReponse end", "MitmarkLandingPageViewReponseBO.DeleteLandingPageViewReponse");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageViewReponseBO.DeleteLandingPageViewReponse", Excep);
        }
    }
}

// MitmarkLandingPageViewReponseIL
function MitmarkLandingPageViewReponseIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetMitmarkLandingPageViewReponse
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    this.GetMitmarkLandingPageViewReponse = function (RequestParam) {
        try {
            OneViewConsole.Debug("GetMitmarkLandingPageViewReponse Start", "MitmarkLandingPageViewReponseIL.GetMitmarkLandingPageViewReponse");
            OneViewConsole.DataLog("RequestParam :" + JSON.stringify(RequestParam));
           
            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetMyTask_json";            
            _oOneViewChannel.parameter = JSON.stringify(RequestParam);
            //alert('_oOneViewChannel.parameter : ' + _oOneViewChannel.parameter);

            var oMitmarkLandingPageViewReponseDTO = _oOneViewChannel.Send();
           
            if (oMitmarkLandingPageViewReponseDTO != null) {
                //alert('oMitmarkLandingPageViewReponseDTO : ' + JSON.stringify(oMitmarkLandingPageViewReponseDTO));
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oMitmarkLandingPageViewReponseDTO.GetMyTask_jsonResult), "MitmarkLandingPageViewReponseIL.GetMitmarkLandingPageViewReponse");
                oMitmarkLandingPageViewReponseDTO = JSON.parse(oMitmarkLandingPageViewReponseDTO.GetMyTask_jsonResult);
            }
            
            OneViewConsole.Debug("GetMitmarkLandingPageViewReponse End", "MitmarkLandingPageViewReponseIL.GetMitmarkLandingPageViewReponse");

            return oMitmarkLandingPageViewReponseDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "MitmarkLandingPageViewReponseIL.GetMitmarkLandingPageViewReponse", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oMitmarkLandingPageViewReponseDTO = null;
        }
    }
}

// MitmarkLandingPageViewReponseDAO
function MitmarkLandingPageViewReponseDAO() {

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
            OneViewConsole.Debug("GetAllViewsByServiceAndUserId start", "MitmarkLandingPageViewReponseDAO.GetAllViewsByServiceAndUserId");

            var Query = "SELECT LastsyncDate,LandingPageViewName FROM MitmarkLandingPageViewReponseEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "MitmarkLandingPageViewReponseDAO.GetByServiceAndUserId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MitmarkLandingPageViewReponseDAO.GetAllViewsByServiceAndUserId");

            OneViewConsole.Debug("GetAllViewsByServiceAndUserId end", "MitmarkLandingPageViewReponseDAO.GetAllViewsByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageViewReponseDAO.GetAllViewsByServiceAndUserId", Excep);
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
            OneViewConsole.Debug("GetByServiceAndUserId start", "MitmarkLandingPageViewReponseDAO.GetByServiceAndUserId");

            var Query = "SELECT * FROM MitmarkLandingPageViewReponseEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "MitmarkLandingPageViewReponseDAO.GetByServiceAndUserId");
          
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MitmarkLandingPageViewReponseDAO.GetByServiceAndUserId");
           
            OneViewConsole.Debug("GetByServiceAndUserId end", "MitmarkLandingPageViewReponseDAO.GetByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageViewReponseDAO.GetByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// GetByServiceUserAndTemplateGroup
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    /// <param name="UserId">UserId</param> 
    /// <param name="TemplateGroupId">TemplateGroupId</param> 
    this.GetByServiceUserAndTemplateGroup = function (ServiceId, UserId, TemplateGroupId) {

        try {
            OneViewConsole.Debug("GetByServiceUserAndTemplateGroup start", "MitmarkLandingPageViewReponseDAO.GetByServiceUserAndTemplateGroup");

            var Query = "SELECT * FROM MitmarkLandingPageViewReponseEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId + " And TemplateGroupId = '" + TemplateGroupId + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "MitmarkLandingPageViewReponseDAO.GetByServiceUserAndTemplateGroup");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MitmarkLandingPageViewReponseDAO.GetByServiceUserAndTemplateGroup");

            OneViewConsole.Debug("GetByServiceUserAndTemplateGroup end", "MitmarkLandingPageViewReponseDAO.GetByServiceUserAndTemplateGroup");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageViewReponseDAO.GetByServiceUserAndTemplateGroup", Excep);
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
            OneViewConsole.Debug("UpdateLandingPageViewReponseToday start", "MitmarkLandingPageViewReponseDAO.UpdateLandingPageViewReponseToday");

            var Query = "UPDATE MitmarkLandingPageViewReponseEntity SET LandingPageViewReponseToday = '" + LandingPageViewReponseToday + "' WHERE ServiceId = " + ServiceId + " And UserId = " + UserId + " And LandingPageViewName = '" + LandingPageViewName + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "MitmarkLandingPageViewReponseDAO.GetByServiceAndUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateLandingPageViewReponseToday end", "MitmarkLandingPageViewReponseDAO.UpdateLandingPageViewReponseToday");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageViewReponseDAO.GetByServiceAndUserId", Excep);
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
            OneViewConsole.Debug("DeleteByServiceAndUserId start", "MitmarkLandingPageViewReponseDAO.DeleteByServiceAndUserId");

            var Query = "DELETE FROM MitmarkLandingPageViewReponseEntity WHERE ServiceId = " + ServiceId + " and UserId=" + UserId;

            OneViewConsole.Debug("Requested Query : " + Query, "MitmarkLandingPageViewReponseDAO.DeleteByServiceAndUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByServiceAndUserId end", "MitmarkLandingPageViewReponseDAO.DeleteByServiceAndUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MitmarkLandingPageViewReponseDAO.DeleteByServiceAndUserId", Excep);
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
            OneViewConsole.Debug("CheckLandingPageViewReponse Start", "MitmarkLandingPageViewReponseDAO.CheckLandingPageViewReponse");
           
            var LandingPageViewReponseQuery = "Select count(*) as Count from MitmarkLandingPageViewReponseEntity Where ServiceId =" + ServiceId + " and UserId=" + UserId;
            
            OneViewConsole.DataLog("Requested Query : " + LandingPageViewReponseQuery, "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(LandingPageViewReponseQuery);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            OneViewConsole.Debug("CheckLandingPageViewReponse End", "MitmarkLandingPageViewReponseDAO.CheckLandingPageViewReponse");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MitmarkLandingPageViewReponseDAO.CheckLandingPageViewReponse", Excep);
        }
    }
}

// MitmarkLandingPageViewReponseNormalizer
function MitmarkLandingPageViewReponseNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to MitmarkLandingPageViewReponseDTO conversion
    /// </summary>
    /// <param name="MitmarkLandingPageViewReponseDTO">LandingPageViewReponse DTO (DTO from server)</param>
    /// <returns>MitmarkLandingPageViewReponseDTO (Mobile entity format)</returns> 
    this.Normalize = function (MitmarkLandingPageViewReponseDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "MitmarkLandingPageViewReponseNormalizer.Normalize");
            
            var _oMitmarkLandingPageViewReponseEntity = new MitmarkLandingPageViewReponseEntity();

            _oMitmarkLandingPageViewReponseEntity.ServerId = "";
            _oMitmarkLandingPageViewReponseEntity.MobileVersionId = 1;
            _oMitmarkLandingPageViewReponseEntity.ServiceId = OneViewSessionStorage.Get("ServiceId");
            _oMitmarkLandingPageViewReponseEntity.UserId = OneViewSessionStorage.Get("LoginUserId");
            _oMitmarkLandingPageViewReponseEntity.TemplateGroupId = MitmarkLandingPageViewReponseDTO.TemplateGroupId;
            _oMitmarkLandingPageViewReponseEntity.TemplateGroupName = MitmarkLandingPageViewReponseDTO.TemplateGroupName;

            if (MitmarkLandingPageViewReponseDTO.DCTaskDTOLst != null) {
                _oMitmarkLandingPageViewReponseEntity.LandingPageViewConfig = JSON.stringify(MitmarkLandingPageViewReponseDTO.DCTaskDTOLst);
            }

            _oMitmarkLandingPageViewReponseEntity.CreatedDate = CurrentDateAndTime;
            _oMitmarkLandingPageViewReponseEntity.LastsyncDate = CurrentDateAndTime;
            _oMitmarkLandingPageViewReponseEntity.TimeStamp = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "MitmarkLandingPageViewReponseNormalizer.Normalize");
            
            return _oMitmarkLandingPageViewReponseEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "MitmarkLandingPageViewReponseNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }


    /// <summary>
    /// DTO list to LandingPageViewReponseDTO list conversion
    /// </summary>
    /// <param name="MitmarkLandingPageViewReponseList">LandingPageViewReponseDTO list dto (DTO from server)</param>
    /// <returns>LandingPageViewReponseDTO list (Mobile entity format)</returns> 
    this.NormalizeList = function (MitmarkLandingPageViewReponseDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "MitmarkLandingPageViewReponseNormalizer.NormalizeList");
          
            var MitmarkLandingPageViewReponseList = new Array();
            for (var i = 0; i < MitmarkLandingPageViewReponseDTOList.length; i++) {
                MitmarkLandingPageViewReponseList[i] = MyInstance.Normalize(MitmarkLandingPageViewReponseDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "MitmarkLandingPageViewReponseNormalizer.NormalizeList");

            return MitmarkLandingPageViewReponseList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "MitmarkLandingPageViewReponseNormalizer.NormalizeList", Excep);
        }
        finally {
            MitmarkLandingPageViewReponseList = null;
        }
    }
}
