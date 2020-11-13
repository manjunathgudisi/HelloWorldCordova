
// DcProfileSyncStatusBO
function DcProfileSyncStatusBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    var oDateTime = new DateTime();
    var _oDcProfileSyncStatusDAO = new DcProfileSyncStatusDAO();

    /// <summary>
    /// Download
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "DcProfileSyncStatusBO.Download");

            var IsSuccess = false;

            var _DefaultMasterDAO = new DefaultMasterDAO("DcProfileSyncStatus");
            var IsExist = _DefaultMasterDAO.IsTableExist();

            if (IsExist == false) {
                var oSqliteQG = new SqliteQG();
                var Query = oSqliteQG.GetCreateTableQuery(new window["DcProfileSyncStatus"]);
                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }
           
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "DcProfileSyncStatusBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {

                var CurrentDate = oDateTime.GetDateAndTime();
                var Req = {
                    "ServiceId": ServiceId,
                    "UserId": LoginUserId,
                    "StartDate": CurrentDate,
                    "EndDate": CurrentDate
                }
                //navigator.notification.alert(("Req : " + JSON.stringify(Req)), ['OK'], "");

                var DcProfileLst = _oDcProfileSyncStatusDAO.GetByAllDcProfilesWithPeriodDetails(Req);
                //alert("DcProfileLst : " + JSON.stringify(DcProfileLst));

                if (DcProfileLst.length > 0) {

                    var _oDcProfileSyncStatusIL = new DcProfileSyncStatusIL();
                    var _oDcProfileSyncStatusDetails = _oDcProfileSyncStatusIL.GetDcProfileSyncStatus(DcProfileLst);

                    //alert(JSON.stringify("_oDcProfileSyncStatusDetails : " + JSON.stringify(_oDcProfileSyncStatusDetails)));

                    //alert("IsAnyException : " + _oDcProfileSyncStatusDetails.IsAnyException);
                    //alert("ExceptionMsg : " + _oDcProfileSyncStatusDetails.ExceptionMsg);

                    if (_oDcProfileSyncStatusDetails != null && _oDcProfileSyncStatusDetails.IsAnyException == false) {

                        var DcProfileSyncStatusDTOLst = new DcProfileSyncStatusNormalizer().NormalizeList(_oDcProfileSyncStatusDetails.DcProfileSyncStatusDTOLst);
                        IsSuccess = MyInstance.Create(DcProfileSyncStatusDTOLst);
                    }
                }
                else {
                    IsSuccess = true;
                }
            }
            else {
                //navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
				navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "DcProfileSyncStatusBO.Download");
            }

            OneViewConsole.Debug("Download end", "DcProfileSyncStatusBO.Download");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcProfileSyncStatusBO.Download", Excep);
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
    /// <param name="DcProfileSyncStatusDTOLst">DcProfileSyncStatusDTOLst</param> 
    this.Create = function (DcProfileSyncStatusDTOLst) {

        try {
            OneViewConsole.Debug("Create start", "DcProfileSyncStatusBO.Create");

            OneViewConsole.Debug("InsertDcCustomPageHtml start", "ProfileDownloadBO.InsertDcCustomPageHtml");
            
            var _oDefaultMasterDAO = new DefaultMasterDAO("DcProfileSyncStatus");            

            // Check the count of ActionNCProfile
            var DcProfileSyncStatusCount = _oDefaultMasterDAO.Count();

            for (var i = 0; i < DcProfileSyncStatusDTOLst.length; i++) {

                // Checking this profile is already available in local db
                var obj = new DcProfileSyncStatusDAO().GetByAllDimensions(DcProfileSyncStatusDTOLst[i]);

                // If its not available, create new profile
                if (obj.length == 0) {

                    _oDefaultMasterDAO.Create(DcProfileSyncStatusDTOLst[i], DcProfileSyncStatusCount);
                    DcProfileSyncStatusCount += 1;
                }

                else {

                    _oDefaultMasterDAO.DeleteById(obj[0].Id);

                    _oDefaultMasterDAO.Create(DcProfileSyncStatusDTOLst[i], DcProfileSyncStatusCount);
                    DcProfileSyncStatusCount += 1;
                }
            }

            OneViewConsole.Debug("InsertDcCustomPageHtml end", "ProfileDownloadBO.InsertDcCustomPageHtml");

            return true;

            OneViewConsole.Debug("Create end", "DcProfileSyncStatusBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcProfileSyncStatusBO.Create", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }
}

// DcProfileSyncStatusIL
function DcProfileSyncStatusIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetDcProfileSyncStatus
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    this.GetDcProfileSyncStatus = function (DcProfileLst) {
        try {
            OneViewConsole.Debug("GetDcProfileSyncStatus Start", "DcProfileSyncStatusIL.GetDcProfileSyncStatus");
            OneViewConsole.DataLog("DcProfileLst :" + JSON.stringify(DcProfileLst));

            var RequestParam = JSON.stringify(DcProfileLst);

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetDcProfileSyncStatus_json";
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
            var oDcProfileSyncStatusDTO = _oOneViewChannel.Send();
            
            if (oDcProfileSyncStatusDTO != null) {
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oDcProfileSyncStatusDTO.GetDcProfileSyncStatus_jsonResult), "DcProfileSyncStatusIL.GetDcProfileSyncStatus");
                oDcProfileSyncStatusDTO = JSON.parse(oDcProfileSyncStatusDTO.GetDcProfileSyncStatus_jsonResult);
            }
            
            OneViewConsole.Debug("GetDcProfileSyncStatus End", "DcProfileSyncStatusIL.GetDcProfileSyncStatus");

            return oDcProfileSyncStatusDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "DcProfileSyncStatusIL.DcPendingTaskIL", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oDcProfileSyncStatusDTO = null;
        }
    }
}

// DcProfileSyncStatusNormalizer
function DcProfileSyncStatusNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();
    

    /// <summary>
    /// DTO to DcProfileSyncStatusDTO conversion
    /// </summary>
    /// <param name="DcProfileSyncStatusDTO">DcProfileSyncStatus DTO (DTO from server)</param>
    /// <returns>DcProfileSyncStatusDTO (Mobile entity format)</returns> 
    this.Normalize = function (DcProfileSyncStatusDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "DcProfileSyncStatusNormalizer.Normalize");

            var _oDcProfileSyncStatus = new DcProfileSyncStatus();

            _oDcProfileSyncStatus.ServiceId = DcProfileSyncStatusDTO.ServiceId;
            _oDcProfileSyncStatus.DcProfileId = DcProfileSyncStatusDTO.DcProfileId;

            _oDcProfileSyncStatus.TemplateNodeId = DcProfileSyncStatusDTO.TemplateNodeId;
            _oDcProfileSyncStatus.DcPlaceId = DcProfileSyncStatusDTO.DcPlaceId;
            _oDcProfileSyncStatus.DcPlaceDimension = DcProfileSyncStatusDTO.DcPlaceDimension;
            _oDcProfileSyncStatus.DcUserId = DcProfileSyncStatusDTO.DcUserId;

            _oDcProfileSyncStatus.Occurence = DcProfileSyncStatusDTO.Occurence;
            _oDcProfileSyncStatus.InprogressCount = DcProfileSyncStatusDTO.InprogressCount;
            _oDcProfileSyncStatus.CompletedCount = DcProfileSyncStatusDTO.CompletedCount;
            _oDcProfileSyncStatus.ApprovedCount = DcProfileSyncStatusDTO.ApprovedCount;

            _oDcProfileSyncStatus.InprogressServerIds = DcProfileSyncStatusDTO.InprogressServerIds;
            _oDcProfileSyncStatus.CompletedServerIds = DcProfileSyncStatusDTO.CompletedServerIds;
            _oDcProfileSyncStatus.ApprovedServerIds = DcProfileSyncStatusDTO.ApprovedServerIds;

            _oDcProfileSyncStatus.PeriodServerId = (DcProfileSyncStatusDTO.PeriodServerId != undefined) ? DcProfileSyncStatusDTO.PeriodServerId : 0;
            _oDcProfileSyncStatus.StartDate = DcProfileSyncStatusDTO.StartDate;
            _oDcProfileSyncStatus.EndDate = DcProfileSyncStatusDTO.EndDate;

            _oDcProfileSyncStatus.TimeStamp = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "DcProfileSyncStatusNormalizer.Normalize");

            return _oDcProfileSyncStatus;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DcProfileSyncStatusNormalizer.Normalize", Excep);
        }
        finally {
        }
    }


    /// <summary>
    /// DTO list to DcProfileSyncStatusDTO list conversion
    /// </summary>
    /// <param name="DcProfileSyncStatusList">DcProfileSyncStatusDTO list dto (DTO from server)</param>
    /// <returns>DcProfileSyncStatusDTO list (Mobile entity format)</returns> 
    this.NormalizeList = function (DcProfileSyncStatusDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "DcProfileSyncStatusNormalizer.NormalizeList");

            var DcProfileSyncStatusList = new Array();
            for (var i = 0; i < DcProfileSyncStatusDTOList.length; i++) {

                DcProfileSyncStatusList[i] = MyInstance.Normalize(DcProfileSyncStatusDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "DcProfileSyncStatusNormalizer.NormalizeList");

            return DcProfileSyncStatusList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DcProfileSyncStatusNormalizer.NormalizeList", Excep);
        }
        finally {
            DcProfileSyncStatusList = null;
        }
    }
}

// DcProfileSyncStatusDAO
function DcProfileSyncStatusDAO() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var oDateTime = new DateTime();
  

    /// <summary>
    /// GetByAllDimensions
    /// </summary>   
    /// <param name="Req">Req</param> 
    this.GetByAllDimensions = function (Req) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "DcProfileSyncStatusDAO.GetByAllDimensions");

            var Query = "SELECT * FROM DcProfileSyncStatus WHERE ServiceId = " + Req.ServiceId + " And DcProfileId = '" + Req.DcProfileId +
                        "' And TemplateNodeId = " + Req.TemplateNodeId + " And DcPlaceId = " + Req.DcPlaceId + " And DcPlaceDimension = '" + Req.DcPlaceDimension +
                        "' And DcUserId = " + Req.DcUserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileSyncStatusDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileSyncStatusDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByServiceAndUserId end", "DcProfileSyncStatusDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcProfileSyncStatusDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// GetByAllDcProfilesWithPeriodDetails
    /// </summary>   
    /// <param name="Req">Req</param> 
    this.GetByAllDcProfilesWithPeriodDetails = function (Req) {

        try {
            OneViewConsole.Debug("GetByAllDcProfilesWithPeriodDetails start", "DcProfileSyncStatusDAO.GetByAllDcProfilesWithPeriodDetails");

            var Query = "SELECT DcProfileEntity.ServiceId, DcProfileEntity.ServerId, DcProfileEntity.DcUserId, DcProfileEntity.TemplateNodeId, "+
                "DcProfileEntity.DcPlaceId, DcProfileEntity.DcPlaceDimension, DefaultScheduleEntity.StartDate, DefaultScheduleEntity.EndDate, " +
                "DefaultScheduleEntity.ReccurenceId, DefaultScheduleEntity.Occurence FROM DcProfileEntity " +
                "INNER JOIN DefaultScheduleEntity ON DcProfileEntity.Id = DefaultScheduleEntity.DcProfileId "+
                "WHERE DcProfileEntity.ServiceId = " + Req.ServiceId + " And DcProfileEntity.DcUserId = " + Req.UserId + " And DefaultScheduleEntity.Occurence > 0";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileSyncStatusDAO.GetByAllDcProfilesWithPeriodDetails");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileSyncStatusDAO.GetByAllDcProfilesWithPeriodDetails");

            for (var i = 0; i < Result.length; i++) {

                if (Result[i].ReccurenceId != 0 && Result[i].Occurence > 0) {

                    var PeriodEntityResult = GetPeriodEntity({ "PeriodTypeServerId": Result[i].ReccurenceId, "StartDate": Req.StartDate, "EndDate": Req.EndDate });

                    if (PeriodEntityResult.length > 0) {

                        Result[i].StartDate = PeriodEntityResult[0].StartDate;
                        Result[i].EndDate = PeriodEntityResult[0].EndDate;
                    }
                }
            }

            OneViewConsole.Debug("GetByAllDcProfilesWithPeriodDetails end", "DcProfileSyncStatusDAO.GetByAllDcProfilesWithPeriodDetails");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcProfileSyncStatusDAO.GetByAllDcProfilesWithPeriodDetails", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// GetPeriodEntity
    /// </summary>   
    /// <param name="Req">Req</param> 
    var GetPeriodEntity = function (Req) {
        try {
            OneViewConsole.Debug("GetPeriodEntity Start ", "DcProfileSyncStatusDAO.GetPeriodEntity");

            var StartDate = oDateTime.ConvertDateTimeToInteger(Req.StartDate);
            var EndDate = oDateTime.ConvertDateTimeToInteger(Req.EndDate);

            var Query = "Select *," +
                        "(SUBSTR(StartDate, 7, 4) || SUBSTR(StartDate, 4, 2) || SUBSTR(StartDate, 1, 2) || SUBSTR(StartDate, 12, 2) || " +
                        "SUBSTR(StartDate, 15, 2) || SUBSTR(StartDate, 18, 2) ) AS SD ,(SUBSTR(EndDate, 7, 4) ||SUBSTR(EndDate, 4, 2) ||" +
                        "SUBSTR(EndDate, 1, 2) || SUBSTR(EndDate, 12, 2) || SUBSTR(EndDate, 15, 2) || SUBSTR(EndDate, 18, 2) ) AS ED " +
                        "From PeriodEntity Where PeriodTypeServerId=" + Req.PeriodTypeServerId + " and SD<='" + StartDate + "' and ED>='" + EndDate + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileSyncStatusDAO.GetPeriodEntity");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetPeriodEntity end ", "DcProfileSyncStatusDAO.GetPeriodEntity");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileSyncStatusDAO.GetPeriodEntity", Excep);
        }

    }
}


