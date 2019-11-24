
// MitmarkLandingPageConfigBO
function MitmarkLandingPageConfigBO(xlatService) {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// Download
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "MitmarkLandingPageConfigBO.Download");

            var IsSuccess = true;

            try {               
                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "MitmarkLandingPageConfigBO.Download");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {
                    
                    var FilterParams = { OSGuid: OneViewSessionStorage.Get("ServiceId"), UserId: OneViewSessionStorage.Get("LoginUserId"), Level: 1 };
                    var TemplateGroupDetails = new MitmarkLandingPageConfigIL().GetTemplateGroup(FilterParams);

                    if (TemplateGroupDetails != null && TemplateGroupDetails.isAnyException == false) {
                        MyInstance.Create(TemplateGroupDetails.ListViewDTOLst);
            
                    }
                    else {
                        IsSuccess = (TemplateGroupDetails != null) ? false : TemplateGroupDetails;
                    }
                }

                OneViewConsole.Debug("DownLoadProfile end", "MitmarkLandingPageConfigBO.Download");
            }
            // If any exception
            catch (Excep) {
                IsSuccess = false;
                throw Excep;
            }

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageConfigBO.Download", Excep);
        }
        finally {          
        }   
    }


    /// <summary>
    /// Create
    /// </summary>
    /// <param name="TemplateGroupDataLst">TemplateGroupDataLst</param> 
    this.Create = function (TemplateGroupDataLst) {

        try {
            OneViewConsole.Debug("Create start", "MitmarkLandingPageConfigBO.Create");

            if (TemplateGroupDataLst != null) {
                //alert('TemplateGroupDataLst : ' + JSON.stringify(TemplateGroupDataLst));
                var _oDefaultMasterDAO = new DefaultMasterDAO("MitmarkLandingPageConfigEntity");
                var Count = _oDefaultMasterDAO.Count();
                var _oMitmarkLandingPageConfigDAO = new MitmarkLandingPageConfigDAO();
                _oMitmarkLandingPageConfigDAO.DeleteByServiceAndUserId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));
                var _oMitmarkLandingPageConfigNormalizer = new MitmarkLandingPageConfigNormalizer();
                var MitmarkLandingPageConfig = _oMitmarkLandingPageConfigNormalizer.Normalize(TemplateGroupDataLst);
               
                _oDefaultMasterDAO.Create(MitmarkLandingPageConfig, Count);

            }

            OneViewConsole.Debug("Create end", "MitmarkLandingPageConfigBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageConfigBO.Create", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }


    this.IsExistMitmarkLandingPageConfig = function (ServiceId, LoginUserId) {

        try {
            OneViewConsole.Debug("IsExistMitmarkLandingPageConfig start", "LandingPageViewReponseBO.IsExistMitmarkLandingPageConfig");

            var IsExist = false;

            var _oMitmarkLandingPageConfigDAO = new MitmarkLandingPageConfigDAO();
            var Result = _oMitmarkLandingPageConfigDAO.CheckMitmarkLandingPageConfigExists(ServiceId, LoginUserId);

            if (Result.length > 0) {
                if (Result[0].Count > 0) {
                    IsExist = true;
                }
            }

            return IsExist;

            OneViewConsole.Debug("IsExistMitmarkLandingPageConfig end", "LandingPageViewReponseBO.IsExistMitmarkLandingPageConfig");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageViewReponseBO.IsExistMitmarkLandingPageConfig", Excep);
        }

    }
}

// MitmarkLandingPageConfigIL
function MitmarkLandingPageConfigIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetTemplateGroup
    /// </summary>    
    this.GetTemplateGroup = function (FilterParams) {
        try {
            OneViewConsole.Debug("GetLandingPageConfig Start", "MitmarkLandingPageConfigIL.GetTemplateGroup");

            OneViewConsole.DataLog("Request from device : " + JSON.stringify(FilterParams), "MitmarkLandingPageConfigIL.GetTemplateGroup");

            var _oOneViewChannel = new OneViewChannel();
            // _oOneViewChannel.toaster = toaster;
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetTemplateGroup_json";
            _oOneViewChannel.parameter = JSON.stringify(FilterParams);
            //alert(' _oOneViewChannel.parameter : ' + _oOneViewChannel.parameter);
            var TemplateGroupDataLst = _oOneViewChannel.Send();
            //alert('Response from Server : '+ JSON.stringify(TemplateGroupDataLst));
            if (TemplateGroupDataLst != null) {
                TemplateGroupDataLst = JSON.parse(TemplateGroupDataLst.GetTemplateGroup_jsonResult);
                OneViewConsole.DataLog("Response from server : " + TemplateGroupDataLst.GetTemplateGroup_jsonResult, "MitmarkLandingPageConfigIL.GetTemplateGroup");
               
            }

            return TemplateGroupDataLst;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "MitmarkLandingPageConfigIL.GetTemplateGroup", Excep);
        }
        finally {
            _oOneViewChannel = null;
        }
    }
}

// MitmarkLandingPageConfigDAO
function MitmarkLandingPageConfigDAO() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();


    /// <summary>
    /// GetTemplateGroupsByServiceAndUserId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    /// <param name="UserId">UserId</param> 
    this.GetTemplateGroupsByServiceAndUserId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("GetTemplateGroupsByServiceAndUserId start", "MitmarkLandingPageConfigDAO.GetTemplateGroupsByServiceAndUserId");

            var Query = "SELECT * FROM MitmarkLandingPageConfigEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "MitmarkLandingPageConfigDAO.GetTemplateGroupsByServiceAndUserId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MitmarkLandingPageConfigDAO.GetTemplateGroupsByServiceAndUserId");

            OneViewConsole.Debug("GetTemplateGroupsByServiceAndUserId end", "MitmarkLandingPageConfigDAO.GetTemplateGroupsByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageConfigDAO.GetTemplateGroupsByServiceAndUserId", Excep);
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
            OneViewConsole.Debug("DeleteByServiceAndUserId start", "MitmarkLandingPageConfigDAO.DeleteByServiceAndUserId");

            var Query = "DELETE FROM MitmarkLandingPageConfigEntity WHERE ServiceId = " + ServiceId + " and UserId=" + UserId;

            OneViewConsole.Debug("Requested Query : " + Query, "MitmarkLandingPageConfigDAO.DeleteByServiceAndUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByServiceAndUserId end", "MitmarkLandingPageConfigDAO.DeleteByServiceAndUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MitmarkLandingPageConfigDAO.DeleteByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>
    /// CheckMitmarkLandingPageConfigExists : Check MitmarkLandingPageConfigEntity Exists in system before download.
    /// </summary>   
    this.CheckMitmarkLandingPageConfigExists = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("CheckMitmarkLandingPageConfigExists Start", "MitmarkLandingPageConfigDAO.CheckMitmarkLandingPageConfigExists");

            var LandingPageViewReponseQuery = "Select count(*) as Count from MitmarkLandingPageConfigEntity Where ServiceId =" + ServiceId + " and UserId=" + UserId;

            OneViewConsole.DataLog("Requested Query : " + LandingPageViewReponseQuery, "DefaultPageConfigMetaDataDAO.CheckMitmarkLandingPageConfigExists");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(LandingPageViewReponseQuery);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultPageConfigMetaDataDAO.CheckMitmarkLandingPageConfigExists");

            OneViewConsole.Debug("CheckMitmarkLandingPageConfigExists End", "MitmarkLandingPageConfigDAO.CheckMitmarkLandingPageConfigExists");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MitmarkLandingPageConfigDAO.CheckMitmarkLandingPageConfigExists", Excep);
        }
    }
}

// MitmarkLandingPageConfigNormalizer
function MitmarkLandingPageConfigNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to MitmarkLandingPageConfigDTO conversion
    /// </summary>
    /// <param name="MitmarkLandingPageConfigDTO">LandingPageViewReponse DTO (DTO from server)</param>
    /// <returns>MitmarkLandingPageConfigDTO (Mobile entity format)</returns> 
    this.Normalize = function (TemplateGroupDataLst) {
        try {
            OneViewConsole.Debug("Normalize start", "MitmarkLandingPageConfigNormalizer.Normalize");

            var _oMitmarkLandingPageConfigEntity = new MitmarkLandingPageConfigEntity();

            _oMitmarkLandingPageConfigEntity.ServerId = "";
            _oMitmarkLandingPageConfigEntity.MobileVersionId = 1;
            _oMitmarkLandingPageConfigEntity.OVGuid = 0;
            _oMitmarkLandingPageConfigEntity.ServiceId = OneViewSessionStorage.Get("ServiceId");
            _oMitmarkLandingPageConfigEntity.UserId = OneViewSessionStorage.Get("LoginUserId");

            if (TemplateGroupDataLst != null) {
                //var TemplateGroupDataLst = JSON.parse(TemplateGroupDataLst);
                _oMitmarkLandingPageConfigEntity.MitmarkLandingPageConfig = JSON.stringify(TemplateGroupDataLst);
            }
            _oMitmarkLandingPageConfigEntity.CreatedDate = CurrentDateAndTime;
            _oMitmarkLandingPageConfigEntity.LastsyncDate = CurrentDateAndTime;
            _oMitmarkLandingPageConfigEntity.TimeStamp = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "MitmarkLandingPageConfigNormalizer.Normalize");

            return _oMitmarkLandingPageConfigEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "MitmarkLandingPageConfigNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }
    
  
}

