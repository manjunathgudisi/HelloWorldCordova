

// UserMasterDAO
function UserMasterDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
    
    /// <summary>
    /// User login validation
    /// OneView local authentication
    /// TODO (Siva, 24-07-2014) : Need to add projection
    /// </summary>
    /// <param name="UserName">User name of the user</param> 
    /// <returns>User details ( mobile user entity fromat)</returns>
    this.GetUserDetails = function (UserName, OrganizationName) {
       
        try {
            OneViewConsole.Debug("GetUserDetails start", "UserMasterDAO.GetUserDetails");            

            var Query = "SELECT usr.* FROM UserMasterEntity usr INNER JOIN OrganizationMasterEntity org ON usr.OrganizationMasterId = org.ServerId  WHERE usr.UserName='" + UserName + "' COLLATE NOCASE and org.Name='" + OrganizationName + "' COLLATE NOCASE";

            //alert('Query : ' + Query)
            OneViewConsole.DataLog("Requested Query : " + Query, "UserMasterDAO.GetUserDetails");

            var User = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(User), "UserMasterDAO.GetUserDetails");
            OneViewConsole.Debug("GetUserDetails end", "UserMasterDAO.GetUserDetails");
           
            return User;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "UserMasterDAO.GetUserDetails", Excep);
        }
        finally {
            Query = null;
            User = null;
        }
    }


    /// <summary>
    /// Reset Password  
    /// </summary>
    /// <param name="UserId">Id of the user</param> 
    /// <param name="NewPassword">New Password</param>   
    this.ResetPassword = function (UserId, NewPassword) {

        try {
            OneViewConsole.Debug("ResetPassword start", "UserMasterDAO.ResetPassword");

            var Query = "UPDATE UserMasterEntity Set Password = '" + NewPassword + "' WHERE ServerId = " + UserId;
 
            OneViewConsole.DataLog("Requested Query : " + Query, "UserMasterDAO.ResetPassword");

            _OneViewSqlitePlugin.ExcecuteSql(Query);
         
            OneViewConsole.Debug("ResetPassword end", "UserMasterDAO.ResetPassword");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "UserMasterDAO.ResetPassword", Excep);
        }
        finally {
            Query = null;          
        }
    }

    this.GetUsersByIds = function (UserList) {

        try {
            OneViewConsole.Debug("GetUsersByIds start", "UserMasterDAO.GetUsersByIds");
            var ResultDict = {};

            var Incondition = "(";
            for (var i = 0; i < UserList.length; i++) {
                Incondition += UserList[i].ServerId;
                Incondition += (i <= UserList.length - 2) ? "," : ")";
            }

            var Query = "SELECT Id,ServerId,Name,UserName,Password FROM UserMasterEntity WHERE ServerId IN " + Incondition;

            //alert('Query : ' + Query)
            OneViewConsole.DataLog("Requested Query : " + Query, "UserMasterDAO.GetUsersByIds");

            var UserList = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
         
            //alert('UserList : ' + JSON.stringify(UserList));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(UserList), "UserMasterDAO.GetUsersByIds");
        
            
            for (var i = 0; i < UserList.length; i++) {
                ResultDict[UserList[i].ServerId] = { "Id": UserList[i].Id, "ServerId": UserList[i].ServerId, "Name": UserList[i].Name, "UserName": UserList[i].UserName, "Password": UserList[i].Password};
            }

            OneViewConsole.Debug("GetUsersByIds end", "UserMasterDAO.GetUsersByIds");
            
            return ResultDict;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "UserMasterDAO.GetUsersByIds", Excep);
        }
        finally {
            Query = null;
            UserList = null;
        }
    }

    this.GetUserAllDataByServerIds = function (UserList) {

        try {
            OneViewConsole.Debug("GetUserAllDataByServerIds start", "UserMasterDAO.GetUserAllDataByServerIds");
            var ResultDict = {};

            var Incondition = "(";
            for (var i = 0; i < UserList.length; i++) {
                Incondition += UserList[i].ServerId;
                Incondition += (i <= UserList.length - 2) ? "," : ")";
            }

            var Query = "SELECT * FROM UserMasterEntity WHERE ServerId IN " + Incondition;

            //alert('Query : ' + Query)
            OneViewConsole.DataLog("Requested Query : " + Query, "UserMasterDAO.GetUserAllDataByServerIds");

            var UserList = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            //alert('UserList : ' + JSON.stringify(UserList));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(UserList), "UserMasterDAO.GetUserAllDataByServerIds");

            OneViewConsole.Debug("GetUserAllDataByServerIds end", "UserMasterDAO.GetUserAllDataByServerIds");

            return UserList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "UserMasterDAO.GetUserAllDataByServerIds", Excep);
        }
        finally {
            Query = null;
            UserList = null;
        }
    }

}

function MultiMediaBlobSubElementsDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetAllUnSyncMultiMediaBlobSubElementsByDimension = function (Dimension) {

        try {
            OneViewConsole.Debug("GetAllUnSyncMultiMediaBlobSubElementsByDimension start", "MultiMediaBlobSubElements.GetAllUnSyncMultiMediaBlobSubElementsByDimension");

            var Query = "SELECT * FROM MultiMediaBlobSubElements WHERE IsSynchronized = 'false' And Dimension='" + Dimension + "'";

            OneViewConsole.Debug("Requested Query : " + Query, "MultiMediaBlobSubElements.GetAllUnSyncMultiMediaBlobSubElementsByDimension");
        
            var BlobSubElements = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + BlobSubElements, "MultiMediaBlobSubElements.GetAllUnSyncMultiMediaBlobSubElementsByDimension");
            OneViewConsole.Debug("GetAllUnSyncMultiMediaBlobSubElementsByDimension end", "MultiMediaBlobSubElements.GetAllUnSyncMultiMediaBlobSubElementsByDimension");

            return BlobSubElements;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MultiMediaBlobSubElements.GetAllUnSyncMultiMediaBlobSubElementsByDimension", Excep);
        }
        finally {
            Query = null;
            BlobSubElements = null;
        }
    }

    this.GetAll_UnSync_MultiMediaBlobSubElements = function () {

        try {
            OneViewConsole.Debug("GetAll_UnSync_MultiMediaBlobSubElements start", "MultiMediaBlobSubElements.GetAll_UnSync_MultiMediaBlobSubElements");

            var Query = "SELECT * FROM MultiMediaBlobSubElements WHERE IsSynchronized = 'false'";

            OneViewConsole.Debug("Requested Query : " + Query, "MultiMediaBlobSubElements.GetAll_UnSync_MultiMediaBlobSubElements");

            var BlobSubElements = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + BlobSubElements, "MultiMediaBlobSubElements.GetAll_UnSync_MultiMediaBlobSubElements");
            OneViewConsole.Debug("GetAll_UnSync_MultiMediaBlobSubElements end", "MultiMediaBlobSubElements.GetAll_UnSync_MultiMediaBlobSubElements");

            return BlobSubElements;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MultiMediaBlobSubElements.GetAllUnSyncMultiMediaBlobSubElementsByDimension", Excep);
        }
        finally {
            Query = null;
            BlobSubElements = null;
        }
    }

    this.GetByMappedEntityClientGuid = function (MappedEntityClientGuid) {

        try {
            OneViewConsole.Debug("GetByMappedEntityClientGuid start", "MultiMediaBlobSubElements.GetByMappedEntityClientGuid");

            var Query = "SELECT * FROM MultiMediaBlobSubElements WHERE MappedEntityClientGuid = '" + MappedEntityClientGuid + "'";

            OneViewConsole.Debug("Requested Query : " + Query, "MultiMediaBlobSubElements.GetByMappedEntityClientGuid");

            var BlobSubElements = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + BlobSubElements, "MultiMediaBlobSubElements.GetByMappedEntityClientGuid");
            OneViewConsole.Debug("GetByMappedEntityClientGuid end", "MultiMediaBlobSubElements.GetByMappedEntityClientGuid");

            return BlobSubElements;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MultiMediaBlobSubElements.GetByMappedEntityClientGuid", Excep);
        }
        finally {
            Query = null;
            BlobSubElements = null;
        }
    }

    this.UpdateProcessCountForUnSyncDataByDimension = function (Dimension) {

        try{
            OneViewConsole.Debug("UpdateProcessCountForUnSyncDataByDimension start", "MultiMediaBlobSubElements.UpdateProcessCountForUnSyncDataByDimension");

            var Query = "Update MultiMediaBlobSubElements Set ProcessCount = ProcessCount+1 WHERE IsSynchronized = 'false' And Dimension='" + Dimension + "'";

            OneViewConsole.Debug("Requested Query : " + Query, "MultiMediaBlobSubElements.UpdateProcessCountForUnSyncDataByDimension");

            _OneViewSqlitePlugin.ExcecuteSql(Query);
           
            OneViewConsole.Debug("UpdateProcessCountForUnSyncDataByDimension end", "MultiMediaBlobSubElements.UpdateProcessCountForUnSyncDataByDimension");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MultiMediaBlobSubElements.UpdateProcessCountForUnSyncDataByDimension", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateProcessCountForUnSyncData = function () {

        try {
            OneViewConsole.Debug("UpdateProcessCountForUnSyncData start", "MultiMediaBlobSubElements.UpdateProcessCountForUnSyncData");

            var Query = "Update MultiMediaBlobSubElements Set ProcessCount = ProcessCount+1 WHERE IsSynchronized = 'false'";

            OneViewConsole.Debug("Requested Query : " + Query, "MultiMediaBlobSubElements.UpdateProcessCountForUnSyncData");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateProcessCountForUnSyncDataByDimension end", "MultiMediaBlobSubElements.UpdateProcessCountForUnSyncData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MultiMediaBlobSubElements.UpdateProcessCountForUnSyncData", Excep);
        }
        finally {
            Query = null;
        }
    }
}

function DcProfileDAO() {

    var MyInstance = this;

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    // Get CurrenntDateAndTime from OneViewDateTime framework
    var oDateTime = new DateTime();
    var CurrenntDateAndTime = oDateTime.GetDateAndTime();

    this.IsTemplateExist = function (ServiceId, UserId, TemplateId) {

        try {
            OneViewConsole.Debug("IsTemplateExist start", "DcProfileDAO.IsTemplateExist");

            var Query = "SELECT COUNT(*) AS TemplateCount FROM DcProfileEntity WHERE ServiceId = " + ServiceId + " AND DcUserId = " + UserId + " AND TemplateNodeId = " + TemplateId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.IsTemplateExist");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.IsTemplateExist");
            
            var IsDownloaded = (Result[0].TemplateCount > 0) ? true : false;

            OneViewConsole.Debug("IsTemplateExist end", "DcProfileDAO.IsTemplateExist");
            
            return IsDownloaded;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.IsTemplateExist", Excep);
        }
        finally {
            Query = null;
            Result = null;
            IsDownloaded = null;
        }
    }

    this.IsDcPlaceExist = function (ServiceId, UserId, DcPlaceId) {

        try {
            OneViewConsole.Debug("IsDcPlaceExist start", "DcProfileDAO.IsDcPlaceExist");

            var Query = "SELECT COUNT(*) AS DcPlaceCount FROM DcProfileEntity WHERE ServiceId = " + ServiceId + " AND DcUserId = " + UserId + " AND DcPlaceId = " + DcPlaceId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.IsDcPlaceExist");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.IsDcPlaceExist");

            var IsDownloaded = (Result[0].DcPlaceCount > 0) ? true : false;

            OneViewConsole.Debug("IsDcPlaceExist end", "DcProfileDAO.IsDcPlaceExist");

            return IsDownloaded;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.IsDcPlaceExist", Excep);
        }
        finally {
            Query = null;
            Result = null;
            IsDownloaded = null;
        }
    }

    this.GetByAllDimensions = function (ServerId, DcPlaceId, TemplateNodeId, UserId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "DcProfileDAO.GetByAllDimensions");

            var Query = "SELECT * FROM DcProfileEntity WHERE ServerId = '" + ServerId + "' AND DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "DcProfileDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetAllDcPlacesByServiceTemplateAndUserId = function (ServiceId, TemplateNodeId, UserId) {

        try {
            OneViewConsole.Debug("GetAllDcPlacesByServiceTemplateAndUserId start", "DcProfileDAO.GetAllDcPlacesByServiceTemplateAndUserId");

            var Query = "SELECT distinct DcPlaceId As Id,DcPlaceName As Name FROM DcProfileEntity WHERE ServiceId = " + ServiceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + UserId + " ORDER BY DcPlaceName ASC";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetAllDcPlacesByServiceTemplateAndUserId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetAllDcPlacesByServiceTemplateAndUserId");

            OneViewConsole.Debug("GetAllDcPlacesByServiceTemplateAndUserId end", "DcProfileDAO.GetAllDcPlacesByServiceTemplateAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetAllDcPlacesByServiceTemplateAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetAllTemplatesByServiceAndUserId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("GetAllTemplatesByServiceAndUserId start", "DcProfileDAO.GetAllTemplatesByServiceAndUserId");

            var Query = "SELECT Distinct TemplateNodeId FROM DcProfileEntity WHERE ServiceId = " + ServiceId + " AND DcUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetAlltemplatesByServiceId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetAllTemplatesByServiceAndUserId");

            OneViewConsole.Debug("GetAllTemplatesByServiceAndUserId end", "DcProfileDAO.GetAllTemplatesByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetAllTemplatesByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.DeleteById = function (Id) {

        try {
            OneViewConsole.Debug("DeleteById start", "DcProfileDAO.DeleteById");

            var Query = "Delete FROM DcProfileEntity WHERE Id = " + Id;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.DeleteById");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            var _oDefaultScheduleDAO = new DefaultScheduleDAO();
            _oDefaultScheduleDAO.DeleteByDcProfileId(Id);

            OneViewConsole.Debug("DeleteById end", "DcProfileDAO.DeleteById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.DeleteById", Excep);
        }
        finally {
            Query = null;         
        }
    }

    this.DeleteByServerId = function (ServerId) {

        try {
            OneViewConsole.Debug("DeleteByServerId start", "DcProfileDAO.DeleteByServerId");

            var Query = "Select Id FROM DcProfileEntity WHERE ServerId = '" + ServerId + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.DeleteByServerId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (Result.length > 0) {

                var Exp = FomatForInConditionById(Result);

                var DcProfileDeleteQuery = "Delete FROM DcProfileEntity WHERE Id IN " + Exp;
                _OneViewSqlitePlugin.ExcecuteSql(DcProfileDeleteQuery);

                var DefaultScheduleDeleteQuery = "Delete FROM DefaultScheduleEntity WHERE DcProfileId IN " + Exp;
                _OneViewSqlitePlugin.ExcecuteSql(DefaultScheduleDeleteQuery);
            }

            OneViewConsole.Debug("DeleteByServerId end", "DcProfileDAO.DeleteByServerId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.DeleteByServerId", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateUserNameByDcUserId = function (DcUserId, UserName) {

        try {
            OneViewConsole.Debug("UpdateUserNameByDcUserId start", "DcProfileDAO.UpdateUserNameByDcUserId");

            var Query = "UPDATE DcProfileEntity SET UserName = '" + UserName + "', TimeStamp = '" + CurrenntDateAndTime + "' WHERE DcUserId = " + DcUserId;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.UpdateUserNameByDcUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateUserNameByDcUserId end", "DcProfileDAO.UpdateUserNameByDcUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.UpdateUserNameByDcUserId", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateTemplateNameByTemplateNodeId = function (TemplateNodeId, TemplateName) {

        try {
            OneViewConsole.Debug("UpdateTemplateNameByTemplateNodeId start", "DcProfileDAO.UpdateTemplateNameByTemplateNodeId");

            var Query = "UPDATE DcProfileEntity SET TemplateName = '" + TemplateName + "', TimeStamp = '" + CurrenntDateAndTime + "' WHERE TemplateNodeId = " + TemplateNodeId;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.UpdateTemplateNameByTemplateNodeId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateTemplateNameByTemplateNodeId end", "DcProfileDAO.UpdateTemplateNameByTemplateNodeId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.UpdateTemplateNameByTemplateNodeId", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateDcPlaceNameByDcPlaceId = function (DcPlaceId, DcPlaceName) {

        try {
            OneViewConsole.Debug("UpdateDcPlaceNameByDcPlaceId start", "DcProfileDAO.UpdateDcPlaceNameByDcPlaceId");

            var Query = "UPDATE DcProfileEntity SET DcPlaceName = '" + DcPlaceName + "', TimeStamp = '" + CurrenntDateAndTime + "' WHERE DcPlaceId = " + DcPlaceId;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.UpdateDcPlaceNameByDcPlaceId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateDcPlaceNameByDcPlaceId end", "DcProfileDAO.UpdateDcPlaceNameByDcPlaceId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.UpdateDcPlaceNameByDcPlaceId", Excep);
        }
        finally {
            Query = null;
        }
    }

    ///
    this.GetProfileDetails = function (Req) {

        try {
            OneViewConsole.Debug("GetProfileDetails start", "DcProfileDAO.GetProfileDetails");

            var ServiceId=Req.ServiceId;
            var UserId=Req.UserId;
            var TemplateNodeId=Req.TemplateNodeId;
            var PlaceId=Req.PlaceId;
            var DcPlaceDimension=Req.DcPlaceDimension;
            var StartDate=Req.StartDate;
            var EndDate = Req.EndDate;

            var oDateTime = new DateTime();
            StartDate = oDateTime.ConvertDateTimeToInteger(StartDate);
            EndDate = oDateTime.ConvertDateTimeToInteger(EndDate);


            var ProfileValidityResponse = {             
                IsProfileValid: false,
                Occurence: 0,
                TotalDc:0,

            }


            //var Query = "SELECT  DcProfileEntity.*,DefaultScheduleEntity.Occurence, DcProfileEntity.ServerId AS DcProfileServerId ," +
            var Query = "SELECT DefaultScheduleEntity.Occurence,DefaultScheduleEntity.ReccurenceId,DcProfileEntity.ServerId DcProfileServerId,DefaultScheduleEntity.StartDate,DefaultScheduleEntity.EndDate," +
                            "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                           " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                           "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                           "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                          " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                           "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " and " +
                           "DcProfileEntity.ServiceId=" + ServiceId + " and DcProfileEntity.DcPlaceDimension = " + DcPlaceDimension + 
                           " AND  DcProfileEntity.TemplateNodeId=" + TemplateNodeId + " AND DcProfileEntity.DcPlaceId=" + PlaceId +
                            " and SD <=  '" + StartDate + "' and ( '" + EndDate + "'  <=  ED or  '' = ED )";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetProfileDetails");
          
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetProfileDetails");

            if (Result.length > 0) {
                ProfileValidityResponse.IsProfileValid = true;
                ProfileValidityResponse.Occurence = Result[0].Occurence;
                var TotalDcCount = 0;
                var ServerIds = [];
              
            
                if (ProfileValidityResponse.Occurence > 0) {

                    Req["DcProfileServerId"] = Result[0].DcProfileServerId;
                    var _DateTime = new DateTime();
                    var currentDateTime = _DateTime.GetDateAndTime();
                    Req.StartDate = currentDateTime;
                    Req.EndDate = currentDateTime;
                
                    var _oDcProfileSyncStatusResult = MyInstance.GetDcProfileSyncStatus(Req);
               
                    if (_oDcProfileSyncStatusResult.length > 0) {

                     
                        if (_oDcProfileSyncStatusResult[0]["InprogressServerIds"] != "") {
                            var InprogressServerIds = _oDcProfileSyncStatusResult[0]["InprogressServerIds"];
                            InprogressServerIds = (InprogressServerIds.length && InprogressServerIds[0] == ',') ? InprogressServerIds.slice(1) : InprogressServerIds;
                            ServerIds.push(InprogressServerIds);
                        }
                        if (_oDcProfileSyncStatusResult[0]["CompletedServerIds"] != "") {                        
                            var CompletedServerIds = _oDcProfileSyncStatusResult[0]["CompletedServerIds"];
                            CompletedServerIds = (CompletedServerIds.length && CompletedServerIds[0] == ',') ? CompletedServerIds.slice(1) : CompletedServerIds;
                            ServerIds.push(CompletedServerIds);
                        }
                   
                        TotalDcCount = parseInt(_oDcProfileSyncStatusResult[0]["InprogressCount"] + _oDcProfileSyncStatusResult[0]["CompletedCount"]);
                    }
                    if (Result[0].ReccurenceId > 0) {
                                          
                        StartDate = oDateTime.ConvertDateTimeToInteger(currentDateTime);
                        EndDate = oDateTime.ConvertDateTimeToInteger(currentDateTime);                        
                        var CurrentPeriod = MyInstance.GetCurrentPeriod({ PeriodTypeServerId: Result[0].ReccurenceId, StartDate: StartDate, EndDate: EndDate });
                        if (CurrentPeriod.length > 0) {
                            ProfileValidityResponse.IsProfileValid = true;
                            Req.StartDate = CurrentPeriod[0].StartDate;
                            Req.EndDate = CurrentPeriod[0].EndDate;

                        }
                        else {
                            ProfileValidityResponse.IsProfileValid = false;
                        }
                  
                    }
                    else {
                        Req.StartDate = Result[0].StartDate;
                        Req.EndDate = Result[0].EndDate;                      
                    }
                  
                }
                else {
                    Req.StartDate = Result[0].StartDate;
                    Req.EndDate = Result[0].EndDate;
                }
                  
                if (ServerIds.length > 0) {
                    Req["ServerIds"] = ServerIds;
                }
             

                var DcResult = MyInstance.GetDcDetailsByServiceUserIdTemplatePlaceIDAndDate(Req);
                ProfileValidityResponse.TotalDc = parseInt(TotalDcCount + DcResult.length);
              
            }
  

            OneViewConsole.Debug("GetProfileDetails end", "DcProfileDAO.GetProfileDetails");
            //alert("ProfileValidityResponse :" + JSON.stringify(ProfileValidityResponse));
            return ProfileValidityResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetProfileDetails", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetDcDetailsByServiceUserIdTemplatePlaceIDAndDate = function (Req) {

        try {
            OneViewConsole.Debug("GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate start", "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            var ServiceId=Req.ServiceId;
            var UserId=Req.UserId;
            var TemplateNodeId=Req.TemplateNodeId;
            var DcPlaceDimension=Req.DcPlaceDimension;
            var StartDate = Req.StartDate;
            var IsCompleted = Req.IsCompleted;
            var IsSynchronized = Req.IsSynchronized;
            var EndDate = Req.EndDate;

            var oDateTime = new DateTime();
            StartDate = oDateTime.ConvertDateTimeToInteger(StartDate);
            EndDate = oDateTime.ConvertDateTimeToInteger(EndDate);  
          
            var IsSubmit = '';
            if (Req.IsSubmit == undefined) {
                IsSubmit = "-1";
            }
            else {
                IsSubmit = Req.IsSubmit;
            }

            var ServerCondition = "";

            if (Req.ServerIds != undefined) {
                var ServerIdList = FomatForListInCondition(Req.ServerIds);              
                ServerCondition = " And Dc.ServerId NOT IN " + ServerIdList;
            }          
         
           
            var Query = "SELECT Dc.IsCompleted as IsCompleted,Dc.IsSubmit as IsSubmit,(SUBSTR(Dc.DcStartDate, 7, 4) || SUBSTR(Dc.DcStartDate, 4, 2) || SUBSTR(Dc.DcStartDate, 1, 2) || SUBSTR(Dc.DcStartDate, 12, 2) || " +
                           "SUBSTR(Dc.DcStartDate, 15, 2) || SUBSTR(Dc.DcStartDate, 18, 2) ) AS DcSD " +
                           "FROM DataCaptureEntity Dc " +
                           "INNER JOIN  DcResultsEntity DcR on Dc.Id=DcR.DataCaptureId " +
                           "Where Dc.ServiceId=" + ServiceId + " And DcR.SystemUserId=" + UserId +                         
                           " And  DcSD <= '" + EndDate + "'  And DcSD >= '" + StartDate + "' " +
                           " And Dc.DcPlaceDimension = '" + DcPlaceDimension + "' And Dc.DcPlaceId = " + Req.PlaceId + "  And Dc.TemplateNodeId=" + TemplateNodeId + " And ('-1'='" + IsCompleted + "' or  Dc.IsCompleted = '" + IsCompleted + "')" +
                           " And Dc.IsBlocker!='true' " + ServerCondition + " And ('-1'='" + IsSynchronized + "' or  Dc.IsSynchronized = '" + IsSynchronized + "')   And ('-1'='" + IsSubmit + "' or  Dc.IsSubmit = '" + IsSubmit + "')";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");
         
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
       
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            OneViewConsole.Debug("GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate end", "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetAllDcPlacesByServiceTemplateAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetProfileDetailsByPlaceGroupId = function (Req) {

        try {
            OneViewConsole.Debug("GetProfileDetailsByPlaceGroupId start", "DcProfileDAO.GetProfileDetailsByPlaceGroupId");

            var ServiceId = Req.ServiceId;
            var UserId = Req.UserId;
            var TemplateNodeId = Req.TemplateNodeId;
            var PlaceGroupId = Req.PlaceId;
            var DcPlaceDimension = Req.DcPlaceDimension;
            var StartDate = Req.StartDate;
            var EndDate = Req.EndDate;
            var DCPlaceRCOType = Req.DCPlaceRCOType;


            var ProfileValidityResponse = {
                IsProfileValid: false,
                Occurence: 0,
                TotalDc: 0,

            }
            var Query = "";

            var LeftRightList = GetLeftRightOrganizationDetails(Req);

            if (LeftRightList.length > 0) {
                if (LeftRightList.length > 1) {
                    navigator.notification.alert(("Not implemented exception : " + LeftRightList.length + ", DcProfileDAO.GetProfileDetailsByPlaceGroupId"), ['OK'], "");
                }
                Query = "select ServerId from organizationAssetsNode where [Left]>=" + LeftRightList[0].Left + " and [Right]<=" + LeftRightList[0].Right + " and  childDbElementType = '" + DCPlaceRCOType + "'";
                
                OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetProfileDetailsByPlaceGroupId");

                var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

                if (Result.length > 0) {
                    Req.PlaceId = Result;
                    ProfileValidityResponse=GetProfileDetailsByPlaceGroupId(Req, ProfileValidityResponse);
                }
            }

            //alert("ProfileValidityResponse : " + JSON.stringify(ProfileValidityResponse));
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetProfileDetailsByPlaceGroupId");

            OneViewConsole.Debug("GetProfileDetailsByPlaceGroupId end", "DcProfileDAO.GetProfileDetailsByPlaceGroupId");

            return ProfileValidityResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetProfileDetailsByPlaceGroupId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    var GetLeftRightOrganizationDetails = function (Req) {

        try {
            OneViewConsole.Debug("GetLeftRightOrganizationDetails start", "DcProfileDAO.GetLeftRightOrganizationDetails");

            var PlaceId = Req.PlaceId;
            var Query = "";

            Query = "select Left,Right from organizationAssetsNode where ServerId=" + PlaceId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetLeftRightOrganizationDetails");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetLeftRightOrganizationDetails");

            OneViewConsole.Debug("GetLeftRightOrganizationDetails end", "DcProfileDAO.GetLeftRightOrganizationDetails");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetLeftRightOrganizationDetails", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    var GetProfileDetailsByPlaceGroupId = function (Req, ProfileValidityResponse) {

        try {
            OneViewConsole.Debug("GetProfileDetailsByPlaceGroupId start", "DcProfileDAO.GetProfileDetailsByPlaceGroupId");

            var ServiceId = Req.ServiceId;
            var UserId = Req.UserId;
            var TemplateNodeId = Req.TemplateNodeId;
            var PlaceId = Req.PlaceId;
            var DcPlaceDimension = Req.DcPlaceDimension;
            var StartDate = Req.StartDate;
            var EndDate = Req.EndDate;
      
            var PlaceIdList = FomatForPlaceIdInCondition(PlaceId);        
            InCondition = "DcProfileEntity.DcPlaceId IN " + PlaceIdList;

            var oDateTime = new DateTime();
            StartDate = oDateTime.ConvertDateTimeToInteger(StartDate);
            EndDate = oDateTime.ConvertDateTimeToInteger(EndDate);

            var Query = "SELECT  DcProfileEntity.*,DefaultScheduleEntity.Occurence, DcProfileEntity.ServerId AS DcProfileServerId ,DefaultScheduleEntity.StartDate as StartDate,DefaultScheduleEntity.EndDate as EndDate," +
                            "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                           " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                           "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                           "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                          " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                           "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " and " +
                           "DcProfileEntity.ServiceId=" + ServiceId + " and DcProfileEntity.DcPlaceDimension = " + DcPlaceDimension +
                           " AND  DcProfileEntity.TemplateNodeId=" + TemplateNodeId + " AND " +
            "SD <=  '" + StartDate + "' and ( '" + EndDate + "'  <=  ED or  '' = ED ) AND " + InCondition;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetProfileDetails");
          
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
          
            if (Result.length > 0) {
                ProfileValidityResponse.IsProfileValid = true;
                var IsOccurenceMinusone=false;
                for (var i = 0; i < Result.length; i++) {
                    if (Result[i].Occurence != -1) {
                        ProfileValidityResponse.Occurence = ProfileValidityResponse.Occurence + parseInt(Result[i].Occurence);
                    }
                    else{
                        IsOccurenceMinusone=true;
                    }
                }
                if (ProfileValidityResponse.Occurence == 0 && IsOccurenceMinusone == true) {
                    ProfileValidityResponse.Occurence = -1;
                }

                Req.StartDate = Result[0].StartDate;
                Req.EndDate = Result[0].EndDate;

                var DcResult = MyInstance.GetDcDetailsByServiceUserIdTemplatePlaceGroupIdAndDate(Req);
                ProfileValidityResponse.TotalDc = DcResult.length;
            }

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetProfileDetails");

            OneViewConsole.Debug("GetProfileDetailsByPlaceGroupId end", "DcProfileDAO.GetProfileDetailsByPlaceGroupId");

            return ProfileValidityResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetProfileDetailsByPlaceGroupId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetByAllDimensionsAndSchedule = function (Req) {

        try {
            OneViewConsole.Debug("GetByAllDimensionsAndSchedule start", "DcProfileDAO.GetByAllDimensionsAndSchedule");
           

            var oDateTime = new DateTime();
            StartDate = oDateTime.ConvertDateTimeToInteger(Req.StartDate);
            EndDate = oDateTime.ConvertDateTimeToInteger(Req.EndDate);

            var Query = "Select  DcProfileEntity.*,DefaultScheduleEntity.Occurence, DcProfileEntity.ServerId As DcProfileServerId ,DcProfileEntity.DcPlaceId As DcPlaceId,DefaultScheduleEntity.StartDate As StartDate,DefaultScheduleEntity.EndDate As EndDate," +
                        "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                        " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) As SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                        " SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) As ED," +
                        " (SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) As FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                        " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) As TT , DefaultScheduleEntity.* From DcProfileEntity " +
                        " Inner Join  DefaultScheduleEntity On DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  Where DcUserId=" + Req.UserId + " And" +
                        " DcProfileEntity.ServiceId=" + Req.ServiceId + " And DcProfileEntity.DcPlaceDimension = " + Req.DcPlaceDimension +
                        " And SD <=  '" + StartDate + "' And ( '" + EndDate + "'  <=  ED Or  '' = ED ) ";


            if (Req.DCPlaceKeyElementIsGroup == true && Req.DcPlaceExp != "") {
                Query += " And (DcProfileEntity.DcPlaceId In " + Req.DcPlaceExp + ")";
            }
            else {
                if (Req.DcPlaceId > 0 || Req.DcPlaceId == -1) {
                    Query += " And (DcProfileEntity.DcPlaceId = " + Req.PlaceId + " Or -1=" + Req.PlaceId + ")";
                }
                else {
                    Query += " And (DcProfileEntity.DcPlaceId = '" + Req.PlaceId + "')";
                }
            }

            if (Req.TemplateKeyElementIsGroup == true && Req.DcTemplateExp != "") {
                Query += " And (DcProfileEntity.TemplateNodeId In " + Req.DcTemplateExp + ")";
            }
            else {
                Query += " And (DcProfileEntity.TemplateNodeId = " + Req.TemplateNodeId + " Or -1=" + Req.TemplateNodeId + ")";
            }

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetProfileDetails");


            OneViewConsole.Debug("GetByAllDimensionsAndSchedule End", "DcProfileDAO.GetByAllDimensionsAndSchedule");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetProfileDetailsByPlaceGroupIdorTemplateGroupId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetDcDetailsByServiceUserIdPlaceInfoDateAndTemplateInfo = function (Req) {

        try {
            OneViewConsole.Debug("GetDcDetailsByServiceUserIdPlaceInfoDateAndTemplateInfo start", "DcProfileDAO.GetDcDetailsByServiceUserIdPlaceInfoDateAndTemplateInfo");

            
            var IsSynchronized = Req.IsSynchronized;

            var Query = "Select Dc.IsCompleted As IsCompleted,Dc.TemplateNodeId As TemplateNodeId,Dc.ServerId As ServerId,Dc.DcPlaceId As DcPlaceId,Dc.DcPlaceDimension As DcPlaceDimension,DcR.SystemUserId As SystemUserId,(SUBSTR(Dc.DcStartDate, 7, 4) || SUBSTR(Dc.DcStartDate, 4, 2) || SUBSTR(Dc.DcStartDate, 1, 2) || SUBSTR(Dc.DcStartDate, 12, 2) || " +
                        "SUBSTR(Dc.DcStartDate, 15, 2) || SUBSTR(Dc.DcStartDate, 18, 2) ) As DcSD " +
                        " From DataCaptureEntity Dc " +
                        " Inner Join  DcResultsEntity DcR On Dc.Id=DcR.DataCaptureId " +
                        " Where Dc.ServiceId=" + Req.ServiceId + " And DcR.SystemUserId=" + Req.UserId +
                        " And Dc.DcPlaceDimension = '" + Req.DcPlaceDimension + "' And ('-1'='" + Req.IsCompleted + "' Or  Dc.IsCompleted = '" + Req.IsCompleted + "')" +
                        " And Dc.IsBlocker!='true'  And ('-1'='" + IsSynchronized + "' Or  Dc.IsSynchronized = '" + IsSynchronized + "') And ('-1'='" + Req.IsSubmit + "' Or  Dc.IsSubmit = '" + Req.IsSubmit + "')";



            if (Req.DCPlaceKeyElementIsGroup == true && Req.DcPlaceExp != "") {
                Query += " And (Dc.DcPlaceId In " + Req.DcPlaceExp + ")";
            }
            else {
                if (Req.PlaceId > 0 || Req.PlaceId == -1) {
                    Query += " And (Dc.DcPlaceId = " + Req.PlaceId + " Or -1=" + Req.PlaceId + ")";
                }
                else {
                    Query += " And Dc.DcPlaceId = '" + Req.PlaceId + "')";
                }
            }

            if (Req.TemplateKeyElementIsGroup == true && Req.DcTemplateExp != "") {
                Query += " And (Dc.TemplateNodeId In " + Req.DcTemplateExp + ")";
            }
            else {
                Query += " And (Dc.TemplateNodeId = " + Req.TemplateNodeId + " Or -1=" + Req.TemplateNodeId + ")";
            }

          

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetDcDetailsByServiceUserIdPlaceInfoDateAndTemplateInfo");
          
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

          
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetDcDetailsByServiceUserIdPlaceInfoDateAndTemplateInfo");

            OneViewConsole.Debug("GetDcDetailsByServiceUserIdPlaceInfoDateAndTemplateInfo end", "DcProfileDAO.GetDcDetailsByServiceUserIdPlaceInfoDateAndTemplateInfo");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetDcDetailsByServiceUserIdPlaceInfoDateAndTemplateInfo", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetDcDetailsByServiceUserIdTemplatePlaceGroupIdAndDate = function (Req) {

        try {
            OneViewConsole.Debug("GetDcDetailsByServiceUserIdTemplatePlaceGroupIdAndDate start", "DcProfileDAO.GetDcDetailsByServiceUserIdTemplatePlaceGroupIdAndDate");

            var ServiceId = Req.ServiceId;
            var UserId = Req.UserId;
            var TemplateNodeId = Req.TemplateNodeId;
            var DcPlaceDimension = Req.DcPlaceDimension;
            var StartDate = Req.StartDate;
            var IsCompleted = Req.IsCompleted;
            var IsSynchronized = Req.IsSynchronized;
            var EndDate = Req.EndDate;

            var oDateTime = new DateTime();
            StartDate = oDateTime.ConvertDateTimeToInteger(StartDate);
            EndDate = oDateTime.ConvertDateTimeToInteger(EndDate);
          
      
            var IsSubmit = '';
            if (Req.IsSubmit == undefined) {
                IsSubmit = "-1";
            }
            else {
                IsSubmit = Req.IsSubmit;
            }

            var ServerCondition = "";

            if (Req.ServerIds != undefined) {
                var ServerIdList = FomatForListInCondition(Req.ServerIds);
                ServerCondition = " And Dc.ServerId NOT IN " + ServerIdList;
            }

            var PlaceIdList = FomatForPlaceIdInCondition(Req.PlaceId);
            PlaceIdInCondition = " And Dc.DcPlaceId IN " + PlaceIdList;
           
            var Query = "SELECT Dc.IsCompleted as IsCompleted,(SUBSTR(Dc.DcStartDate, 7, 4) || SUBSTR(Dc.DcStartDate, 4, 2) || SUBSTR(Dc.DcStartDate, 1, 2) || SUBSTR(Dc.DcStartDate, 12, 2) || " +
                           "SUBSTR(Dc.DcStartDate, 15, 2) || SUBSTR(Dc.DcStartDate, 18, 2) ) AS DcSD " +
                           "FROM DataCaptureEntity Dc " +
                           "INNER JOIN  DcResultsEntity DcR on Dc.Id=DcR.DataCaptureId " +
                           "Where Dc.ServiceId=" + ServiceId + " And DcR.SystemUserId=" + UserId +                         
                           " And  DcSD <= '" + EndDate + "'  And DcSD >= '" + StartDate + "' " +
                           " And Dc.DcPlaceDimension = '" + DcPlaceDimension + "' " + PlaceIdInCondition + "  And Dc.TemplateNodeId=" + TemplateNodeId + " And ('-1'='" + IsCompleted + "' or  Dc.IsCompleted = '" + IsCompleted + "')" +
                           " And Dc.IsBlocker!='true' " + ServerCondition + " And ('-1'='" + IsSynchronized + "' or  Dc.IsSynchronized = '" + IsSynchronized + "')  And ('-1'='" + IsSubmit + "' or  Dc.IsSubmit = '" + IsSubmit + "')";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");
        
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            OneViewConsole.Debug("GetDcDetailsByServiceUserIdTemplatePlaceGroupIdAndDate end", "DcProfileDAO.GetDcDetailsByServiceUserIdTemplatePlaceGroupIdAndDate");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetAllDcPlacesByServiceTemplateAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    var FomatForPlaceIdInCondition = function (Info) {
        try {
            OneViewConsole.Debug("FomatForInCondition Start ", "DcProfileDAO.FomatForInCondition");
        
            var Incondition = "(";
            for (var i = 0; i < Info.length; i++) {
                Incondition += Info[i].ServerId;
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForInCondition Incondition : " + Incondition, "DCBlockerInfoDAO.FomatForInCondition");

            OneViewConsole.Debug("FomatForInCondition end ", "DcProfileDAO.FomatForInCondition");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.FomatForInCondition", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    this.GetPeriodTypeNameById = function (PeriodTypeServerId) {
        try {
            var PeriodTypeName = '';
            OneViewConsole.Debug("GetPeriodTypeNameById Start ", "DcProfileDAO.GetPeriodTypeNameById");
            var Query = "Select Name From PeriodTypeEntity where ServerId=" + PeriodTypeServerId;
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (Result.length > 0) {
                PeriodTypeName = Result[0].Name;
            } else {
                throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetCurrentPeriod", "Period type not available ServerId : " + PeriodTypeServerId);
            }
            OneViewConsole.Debug("GetPeriodTypeNameById end ", "DcProfileDAO.GetPeriodTypeNameById");
            return PeriodTypeName;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetCurrentPeriod", Excep);
        }
    }

    this.GetCurrentPeriod = function (Req) {
        try {
            OneViewConsole.Debug("GetCurrentPeriod Start ", "DcProfileDAO.GetCurrentPeriod");
              

            var Query = "Select *," +
                        "(SUBSTR(StartDate, 7, 4) || SUBSTR(StartDate, 4, 2) || SUBSTR(StartDate, 1, 2) || SUBSTR(StartDate, 12, 2) || " +
                        "SUBSTR(StartDate, 15, 2) || SUBSTR(StartDate, 18, 2) ) AS SD ,(SUBSTR(EndDate, 7, 4) ||SUBSTR(EndDate, 4, 2) ||" +
                        "SUBSTR(EndDate, 1, 2) || SUBSTR(EndDate, 12, 2) || SUBSTR(EndDate, 15, 2) || SUBSTR(EndDate, 18, 2) ) AS ED" +
                        " From PeriodEntity Where PeriodTypeServerId=" + Req.PeriodTypeServerId + " and SD<='" + Req.StartDate + "' and ED>='" + Req.EndDate + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetCurrentPeriod");
       
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetCurrentPeriod end ", "DcProfileDAO.GetCurrentPeriod");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetCurrentPeriod", Excep);
        }
       
    }    

    //TODO:Aiswarya (Remove the code)
    this.GetDcProfileSyncStatus_old = function (Req) {
        try {
            OneViewConsole.Debug("GetDcProfileSyncStatus Start ", "DcProfileDAO.GetDcProfileSyncStatus");


            var Query = "Select * "+
                        "From DcProfileSyncStatus " +                       
                        "Where ServiceId=" + Req.ServiceId + " And DcUserId=" + Req.UserId +
                        " And DcPlaceDimension = '" + Req.DcPlaceDimension + "' And TemplateNodeId=" + Req.TemplateNodeId + 
                       " And DcPlaceId=" + Req.PlaceId + "  And DcProfileId='" + Req.DcProfileServerId + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetProfileDetails");
     
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetDcProfileSyncStatus");
         
            OneViewConsole.Debug("GetDcProfileSyncStatus end ", "DcProfileDAO.GetDcProfileSyncStatus");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetDcProfileSyncStatus", Excep);
        }

    }

    this.GetDcProfileSyncStatus = function (Req) {
        try {
            OneViewConsole.Debug("GetDcProfileSyncStatus Start ", "DcProfileDAO.GetDcProfileSyncStatus");

            var _DateTime = new DateTime();
            var StartDate = _DateTime.ConvertDateTimeToInteger(Req.StartDate);
            var EndDate = _DateTime.ConvertDateTimeToInteger(Req.EndDate);

          var Query = "Select  *  ," +

                      "(SUBSTR(StartDate, 7, 4) || SUBSTR(StartDate, 4, 2) || SUBSTR(StartDate, 1, 2) || SUBSTR(StartDate, 12, 2) || " +
                      "SUBSTR(StartDate, 15, 2) || SUBSTR(StartDate, 18, 2) ) AS SD ,(SUBSTR(EndDate, 7, 4) ||SUBSTR(EndDate, 4, 2) ||" +
                      "SUBSTR(EndDate, 1, 2) || SUBSTR(EndDate, 12, 2) || SUBSTR(EndDate, 15, 2) || SUBSTR(EndDate, 18, 2) ) AS ED " +
                       "From DcProfileSyncStatus " +
                        "Where ServiceId=" + Req.ServiceId + " And DcUserId=" + Req.UserId +
                        " And DcPlaceDimension = '" + Req.DcPlaceDimension + "' And TemplateNodeId=" + Req.TemplateNodeId +
                       " And DcPlaceId=" + Req.PlaceId + "  And DcProfileId='" + Req.DcProfileServerId + "'" + " and SD<='" + StartDate + "' and ED>='" + EndDate + "' And (CompletedServerIds!='' or  InprogressServerIds!='')";

             
          OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetDcProfileSyncStatus");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

           // alert('GetDcProfileSyncStatus_New Result: ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetDcProfileSyncStatus");

            OneViewConsole.Debug("GetDcProfileSyncStatus end ", "DcProfileDAO.GetDcProfileSyncStatus");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetDcProfileSyncStatus", Excep);
        }

    }

    var FomatForListInCondition = function (Info) {
        try {
            OneViewConsole.Debug("FomatForListInCondition Start ", "DcProfileDAO.FomatForListInCondition");

            var Incondition = "(";
            for (var i = 0; i < Info.length; i++) {
                Incondition += "" + Info[i] + "";
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForListInCondition Incondition : " + Incondition, "DCBlockerInfoDAO.FomatForListInCondition");

            OneViewConsole.Debug("FomatForListInCondition end ", "DcProfileDAO.FomatForListInCondition");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.FomatForListInCondition", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    this.GetDcScheduleDetails = function (Req) {

        try {
            OneViewConsole.Debug("GetDcScheduleDetails start", "DcProfileDAO.GetDcScheduleDetails");

            var ServiceId = Req.ServiceId;
            var UserId = Req.UserId;
            var TemplateNodeId = Req.TemplateNodeId;
            var PlaceId = Req.PlaceId;
            var DcPlaceDimension = Req.DcPlaceDimension;
            var StartDate = Req.StartDate;
            var EndDate = Req.EndDate;

            var oDateTime = new DateTime();
            StartDate = oDateTime.ConvertDateTimeToInteger(StartDate);
            EndDate = oDateTime.ConvertDateTimeToInteger(EndDate);     

            var Query = "SELECT DefaultScheduleEntity.Occurence,DefaultScheduleEntity.ReccurenceId,DcProfileEntity.ServerId DcProfileServerId," +
                        "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                        " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                        "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                        "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                        " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                        "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " and " +
                        "DcProfileEntity.ServiceId=" + ServiceId + " and DcProfileEntity.DcPlaceDimension = " + DcPlaceDimension +
                        " AND  DcProfileEntity.TemplateNodeId=" + TemplateNodeId + " AND DcProfileEntity.DcPlaceId=" + PlaceId +
                        " AND SD <=  '" + StartDate + "' AND ( '" + EndDate + "'  <=  ED or  '' = ED )";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetDcScheduleDetails");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetDcScheduleDetails");

            OneViewConsole.Debug("GetDcScheduleDetails end", "DcProfileDAO.GetDcScheduleDetails");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetDcScheduleDetails", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetLastCreatedDcIdByUserIdTemplatePlaceIdAndDate = function (Req) {

        try {
            OneViewConsole.Debug("GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate start", "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            //alert('GetLastCreatedDcIdByUserIdTemplatePlaceIdAndDate : ' + JSON.stringify(Req));

            var EndDate = Req.EndDate;
            var StartDate = Req.StartDate;
            var oDateTime = new DateTime();

            StartDate = oDateTime.ConvertDateTimeToInteger(StartDate);
            EndDate = oDateTime.ConvertDateTimeToInteger(EndDate);

            var ServerCondition = "";

            //if (Req.ServerIds != undefined) {
            //    var ServerIdList = FomatForListInCondition(Req.ServerIds);
            //    ServerCondition = " And Dc.ServerId NOT IN " + ServerIdList;
            //}


            var Query = "Select Dc.Id as DcId,Dc.ClientGuid, DcR.Id as DcRId,(SUBSTR(DcR.CreatedDate, 7, 4) || SUBSTR(Dc.CreatedDate, 4, 2) || SUBSTR(Dc.CreatedDate, 1, 2) || SUBSTR(Dc.CreatedDate, 12, 2) || " +
                   " SUBSTR(Dc.CreatedDate, 15, 2) || SUBSTR(Dc.CreatedDate, 18, 2) ) AS DcRCreatedDate ,(SUBSTR(Dc.DcStartDate, 7, 4) || SUBSTR(Dc.DcStartDate, 4, 2) || SUBSTR(Dc.DcStartDate, 1, 2) || SUBSTR(Dc.DcStartDate, 12, 2) || " +
                   "SUBSTR(Dc.DcStartDate, 15, 2) || SUBSTR(Dc.DcStartDate, 18, 2) ) AS DcSD " +
                   "From DataCaptureEntity Dc " +
                   "Inner Join  DcResultsEntity DcR on Dc.Id=DcR.DataCaptureId " +
                   "Where Dc.ServiceId=" + Req.ServiceId + " AND DcR.SystemUserId=" + Req.UserId +
                   " And  DcSD <= '" + EndDate + "' " + " And  DcSD >= '" + StartDate + "' " +
                    "And Dc.DcPlaceDimension = '" + Req.DcPlaceDimension + "'  AND Dc.DcPlaceId = " + Req.PlaceId + "  AND Dc.TemplateNodeId=" + Req.TemplateNodeId +
                   " And Dc.IsSubmit!='true' " + ServerCondition + " order by DcRCreatedDate desc Limit 1";

           // alert(Query);

            //var Query = "Select Dc.Id as DcId,DcR.Id as DcRId,(SUBSTR(DcR.CreatedDate, 7, 4) || SUBSTR(Dc.CreatedDate, 4, 2) || SUBSTR(Dc.CreatedDate, 1, 2) || SUBSTR(Dc.CreatedDate, 12, 2) || " +
            //            " SUBSTR(Dc.CreatedDate, 15, 2) || SUBSTR(Dc.CreatedDate, 18, 2) ) AS DcRCreatedDate ,(SUBSTR(Dc.DcStartDate, 7, 4) || SUBSTR(Dc.DcStartDate, 4, 2) || SUBSTR(Dc.DcStartDate, 1, 2) || SUBSTR(Dc.DcStartDate, 12, 2) || " +
            //            "SUBSTR(Dc.DcStartDate, 15, 2) || SUBSTR(Dc.DcStartDate, 18, 2) ) AS DcSD " +
            //            "From DataCaptureEntity Dc " +
            //            "Inner Join  DcResultsEntity DcR on Dc.Id=DcR.DataCaptureId " +
            //            "Where Dc.ServiceId=" + Req.ServiceId + " AND DcR.SystemUserId=" + Req.UserId +
            //            " And  DcSD <= '" + EndDate + "' " + " And  DcSD >= '" + StartDate + "' " +
            //             "And Dc.DcPlaceDimension = '" + Req.DcPlaceDimension + "'  AND Dc.TemplateNodeId=" + Req.TemplateNodeId + 
            //            " And Dc.IsSubmit!='true' " + ServerCondition + " order by DcRCreatedDate desc Limit 1";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            OneViewConsole.Debug("GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate end", "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            return Result;
        }
        catch (Excep) {
            //alert('Excep ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetAllDcPlacesByServiceTemplateAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetAllDcPlacesByTemplateGroupId = function (Req) {

        try {
            OneViewConsole.Debug("GetAllDcPlacesByTemplateGroupId start", "DcProfileDAO.GetAllDcPlacesByTemplateGroupId");

            var Result = [];

            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var _oDcDAO = new DcDAO();
            var TemplateLst = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(Req.TemplateNodeId, Req.TemplateGroupType);

            if (TemplateLst.length > 0) {

                var Exp = FomatForInConditionById(TemplateLst);

                var Query = "SELECT Distinct DcPlaceId As Id,DcPlaceName As Name FROM DcProfileEntity WHERE DcUserId = " + LoginUserId + " AND TemplateNodeId IN " + Exp;
                Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            }

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetAllDcPlacesByTemplateGroupId");

            OneViewConsole.Debug("GetAllDcPlacesByTemplateGroupId end", "DcProfileDAO.GetAllDcPlacesByTemplateGroupId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetAllDcPlacesByTemplateGroupId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    var FomatForInConditionById = function (Info) {
        try {
            OneViewConsole.Debug("FomatForInConditionById start", "DcProfileDAO.FomatForInConditionById");
            OneViewConsole.DataLog("Request DcInfo : " + JSON.stringify(Info), "DcDAO.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < Info.length; i++) {
                Incondition += Info[i].Id;
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "DcProfileDAO.FomatForInConditionById");
            OneViewConsole.Debug("FomatForInConditionById end", "DcProfileDAO.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.FomatForInConditionById", Excep);
        }
        finally {
            Incondition = null;
        }
    }


    this.GetDcScheduleDetailsByTemplateIdLst = function (Req) {

        try {
            OneViewConsole.Debug("GetDcScheduleDetailsByTemplateIdLst start", "DcProfileDAO.GetDcScheduleDetailsByTemplateIdLst");

       
            var StartDate = Req.StartDate;
            var EndDate = Req.EndDate;

            var oDateTime = new DateTime();
            StartDate = oDateTime.ConvertDateTimeToInteger(StartDate);
            EndDate = oDateTime.ConvertDateTimeToInteger(EndDate);

            var TemplateNodeIdLstCondition = "";

            if (Req.TemplateNodeId != undefined) {
                var TemplateNodeIdLst = FomatForInConditionById(Req.TemplateNodeId);
                TemplateNodeIdLstCondition = " And DcProfileEntity.TemplateNodeId IN " + TemplateNodeIdLst;
            }


            var Query = "SELECT DcProfileEntity.TemplateNodeId as TemplateNodeId,DefaultScheduleEntity.Occurence,DefaultScheduleEntity.ReccurenceId,DcProfileEntity.ServerId DcProfileServerId," +
                        "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                        " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                        "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                        "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                        " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                        "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + Req.UserId + " and " +
                        "DcProfileEntity.ServiceId=" + Req.ServiceId + " and DcProfileEntity.DcPlaceDimension = " + Req.DcPlaceDimension +
                         TemplateNodeIdLstCondition + " AND DcProfileEntity.DcPlaceId=" + Req.PlaceId +
                        " AND SD <=  '" + StartDate + "' AND ( '" + EndDate + "'  <=  ED or  '' = ED )";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetDcScheduleDetailsByTemplateIdLst");
       
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetDcScheduleDetailsByTemplateIdLst");

            OneViewConsole.Debug("GetDcScheduleDetailsByTemplateIdLst end", "DcProfileDAO.GetDcScheduleDetailsByTemplateIdLst");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetDcScheduleDetailsByTemplateIdLst", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetDcDetailsByServiceUserIdPlaceIdDateAndTemplateLst = function (Req) {

        try {
            OneViewConsole.Debug("GetDcDetailsByServiceUserIdPlaceIdDateAndTemplateLst start", "DcProfileDAO.GetDcDetailsByServiceUserIdPlaceIdDateAndTemplateLst");           
         
            var TemplateNodeId = Req.TemplateNodeId;
            var IsSynchronized = Req.IsSynchronized;

            var TemplateNodeIdLstCondition = "";

            if (Req.TemplateNodeId != undefined) {
                var TemplateNodeIdLst = FomatForInConditionById(Req.TemplateNodeId);
                TemplateNodeIdLstCondition = " And Dc.TemplateNodeId IN " + TemplateNodeIdLst;
            }
            
            var Query = "SELECT Dc.IsCompleted as IsCompleted,Dc.IsSubmit as IsSubmit,Dc.TemplateNodeId as TemplateNodeId,Dc.DcPlaceId as DcPlaceId,Dc.DcPlaceDimension as DcPlaceDimension,DcR.SystemUserId as SystemUserId,(SUBSTR(Dc.DcStartDate, 7, 4) || SUBSTR(Dc.DcStartDate, 4, 2) || SUBSTR(Dc.DcStartDate, 1, 2) || SUBSTR(Dc.DcStartDate, 12, 2) || " +
                           "SUBSTR(Dc.DcStartDate, 15, 2) || SUBSTR(Dc.DcStartDate, 18, 2) ) AS DcSD " +
                           "FROM DataCaptureEntity Dc " +
                           "INNER JOIN  DcResultsEntity DcR on Dc.Id=DcR.DataCaptureId " +
                           "Where Dc.ServiceId=" + Req.ServiceId + " And DcR.SystemUserId=" + Req.UserId +  
                           " And Dc.DcPlaceDimension = '" + Req.DcPlaceDimension + "' And Dc.DcPlaceId = " + Req.PlaceId +" "+ TemplateNodeIdLstCondition + " And ('-1'='" + Req.IsCompleted + "' or  Dc.IsCompleted = '" + Req.IsCompleted + "')" +
                           " And Dc.IsBlocker!='true'  And ('-1'='" + IsSynchronized + "' or  Dc.IsSynchronized = '" + IsSynchronized + "') And ('-1'='" + Req.IsSubmit + "' or  Dc.IsSubmit = '" + Req.IsSubmit + "')";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetDcDetailsByServiceUserIdPlaceIdDateAndTemplateLst");
           // alert(Query);
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetDcDetailsByServiceUserIdPlaceIdDateAndTemplateLst");

            OneViewConsole.Debug("GetDcDetailsByServiceUserIdPlaceIdDateAndTemplateLst end", "DcProfileDAO.GetDcDetailsByServiceUserIdPlaceIdDateAndTemplateLst");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetDcDetailsByServiceUserIdPlaceIdDateAndTemplateLst", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetAllCurrentPeriod = function (Req) {
        try {
            OneViewConsole.Debug("GetAllCurrentPeriod Start ", "DcProfileDAO.GetAllCurrentPeriod");

            var StartDate = Req.StartDate;
            var EndDate = Req.EndDate;

            var oDateTime = new DateTime();
            StartDate = oDateTime.ConvertDateTimeToInteger(StartDate);
            EndDate = oDateTime.ConvertDateTimeToInteger(EndDate);


            var Query = "Select *," +
                        "(SUBSTR(StartDate, 7, 4) || SUBSTR(StartDate, 4, 2) || SUBSTR(StartDate, 1, 2) || SUBSTR(StartDate, 12, 2) || " +
                        "SUBSTR(StartDate, 15, 2) || SUBSTR(StartDate, 18, 2) ) AS SD ,(SUBSTR(EndDate, 7, 4) ||SUBSTR(EndDate, 4, 2) ||" +
                        "SUBSTR(EndDate, 1, 2) || SUBSTR(EndDate, 12, 2) || SUBSTR(EndDate, 15, 2) || SUBSTR(EndDate, 18, 2) ) AS ED" +
                        " From PeriodEntity where SD<='" + StartDate + "' and ED>='" + EndDate + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetAllCurrentPeriod");
           // alert(Query);
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetCurrentPeriod end ", "DcProfileDAO.GetAllCurrentPeriod");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetAllCurrentPeriod", Excep);
        }

    }

    this.GetAllDcProfileSyncStatus = function (Req) {
        try {
            OneViewConsole.Debug("GetAllDcProfileSyncStatus Start ", "DcProfileDAO.GetAllDcProfileSyncStatus");

            var _DateTime = new DateTime();
            var StartDate = _DateTime.ConvertDateTimeToInteger(Req.StartDate);
            var EndDate = _DateTime.ConvertDateTimeToInteger(Req.EndDate);

            var Query = "Select  *  ," +
                        "(SUBSTR(StartDate, 7, 4) || SUBSTR(StartDate, 4, 2) || SUBSTR(StartDate, 1, 2) || SUBSTR(StartDate, 12, 2) || " +
                        "SUBSTR(StartDate, 15, 2) || SUBSTR(StartDate, 18, 2) ) As SD ,(SUBSTR(EndDate, 7, 4) ||SUBSTR(EndDate, 4, 2) ||" +
                        "SUBSTR(EndDate, 1, 2) || SUBSTR(EndDate, 12, 2) || SUBSTR(EndDate, 15, 2) || SUBSTR(EndDate, 18, 2) ) As ED " +
                        "From DcProfileSyncStatus " +
                        "Where ServiceId=" + Req.ServiceId + " And DcUserId=" + Req.UserId +
                        " And DcPlaceDimension = '" + Req.DcPlaceDimension + "'"+ 
                        " And SD<='" + StartDate + "' And ED>='" + EndDate + "' And (CompletedServerIds!='' or  InprogressServerIds!='')";

            if (Req.DCPlaceKeyElementIsGroup == true && Req.DcPlaceExp != "") {
                Query += " And (DcPlaceId In " + Req.DcPlaceExp + ")";
            }
            else {
                if (Req.PlaceId > 0 || Req.PlaceId == -1) {
                    Query += " And (DcPlaceId = " + Req.PlaceId + " Or -1=" + Req.PlaceId + ")";
                }
                else {
                    Query += " And (DcPlaceId = '" + Req.PlaceId + "')";
                }
            }

            if (Req.TemplateKeyElementIsGroup == true && Req.DcTemplateExp != "") {
                Query += " And (TemplateNodeId In " + Req.DcTemplateExp + ")";
            }
            else {
                Query += " And (TemplateNodeId = " + Req.TemplateNodeId + " Or -1=" + Req.TemplateNodeId + ")";
            }
          
            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetAllDcProfileSyncStatus");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
          

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetAllDcProfileSyncStatus");

            OneViewConsole.Debug("GetAllDcProfileSyncStatus end ", "DcProfileDAO.GetAllDcProfileSyncStatus");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetAllDcProfileSyncStatus", Excep);
        }

    }

    this.GetAllLastCreatedDcIdByUserIdTemplatePlaceIdAndDate = function (Req) {

        try {
            OneViewConsole.Debug("GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate start", "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            //alert('GetLastCreatedDcIdByUserIdTemplatePlaceIdAndDate : ' + JSON.stringify(Req));

            var EndDate = Req.EndDate;
            var StartDate = Req.StartDate;
            var oDateTime = new DateTime();

            StartDate = oDateTime.ConvertDateTimeToInteger(StartDate);
            EndDate = oDateTime.ConvertDateTimeToInteger(EndDate);

            var ServerCondition = "";

            //if (Req.ServerIds != undefined) {
            //    var ServerIdList = FomatForListInCondition(Req.ServerIds);
            //    ServerCondition = " And Dc.ServerId NOT IN " + ServerIdList;
            //}


            var Query = "Select Dc.Id as DcId,Dc.ClientGuid, DcR.Id as DcRId,Dc.IsCompleted as IsCompleted,Dc.IsSubmit as IsSubmit,(SUBSTR(DcR.CreatedDate, 7, 4) || SUBSTR(Dc.CreatedDate, 4, 2) || SUBSTR(Dc.CreatedDate, 1, 2) || SUBSTR(Dc.CreatedDate, 12, 2) || " +
                   " SUBSTR(Dc.CreatedDate, 15, 2) || SUBSTR(Dc.CreatedDate, 18, 2) ) AS DcRCreatedDate ,(SUBSTR(Dc.DcStartDate, 7, 4) || SUBSTR(Dc.DcStartDate, 4, 2) || SUBSTR(Dc.DcStartDate, 1, 2) || SUBSTR(Dc.DcStartDate, 12, 2) || " +
                   "SUBSTR(Dc.DcStartDate, 15, 2) || SUBSTR(Dc.DcStartDate, 18, 2) ) AS DcSD , Dc.IsOnDeviceApprovalFinished " +
                   "From DataCaptureEntity Dc " +
                   "Inner Join  DcResultsEntity DcR on Dc.Id=DcR.DataCaptureId " +
                   "Where Dc.ServiceId=" + Req.ServiceId + " AND DcR.SystemUserId=" + Req.UserId +
                   " And  DcSD <= '" + EndDate + "' " + " And  DcSD >= '" + StartDate + "' " +
                    "And Dc.DcPlaceDimension = '" + Req.DcPlaceDimension + "'  AND Dc.DcPlaceId = " + Req.PlaceId + "  AND Dc.TemplateNodeId=" + Req.TemplateNodeId + " order by DcRCreatedDate desc Limit 1";
                   //" And Dc.IsSubmit!='true' " + ServerCondition + " order by DcRCreatedDate desc Limit 1";

             //alert(Query);

            //var Query = "Select Dc.Id as DcId,DcR.Id as DcRId,(SUBSTR(DcR.CreatedDate, 7, 4) || SUBSTR(Dc.CreatedDate, 4, 2) || SUBSTR(Dc.CreatedDate, 1, 2) || SUBSTR(Dc.CreatedDate, 12, 2) || " +
            //            " SUBSTR(Dc.CreatedDate, 15, 2) || SUBSTR(Dc.CreatedDate, 18, 2) ) AS DcRCreatedDate ,(SUBSTR(Dc.DcStartDate, 7, 4) || SUBSTR(Dc.DcStartDate, 4, 2) || SUBSTR(Dc.DcStartDate, 1, 2) || SUBSTR(Dc.DcStartDate, 12, 2) || " +
            //            "SUBSTR(Dc.DcStartDate, 15, 2) || SUBSTR(Dc.DcStartDate, 18, 2) ) AS DcSD " +
            //            "From DataCaptureEntity Dc " +
            //            "Inner Join  DcResultsEntity DcR on Dc.Id=DcR.DataCaptureId " +
            //            "Where Dc.ServiceId=" + Req.ServiceId + " AND DcR.SystemUserId=" + Req.UserId +
            //            " And  DcSD <= '" + EndDate + "' " + " And  DcSD >= '" + StartDate + "' " +
            //             "And Dc.DcPlaceDimension = '" + Req.DcPlaceDimension + "'  AND Dc.TemplateNodeId=" + Req.TemplateNodeId + 
            //            " And Dc.IsSubmit!='true' " + ServerCondition + " order by DcRCreatedDate desc Limit 1";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            OneViewConsole.Debug("GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate end", "DcProfileDAO.GetProfileValidityByServiceUserIdTemplatePlaceIDAndDate");

            return Result;
        }
        catch (Excep) {
            //alert('Excep ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.GetAllDcPlacesByServiceTemplateAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

}

function DefaultScheduleDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.DeleteByDcProfileId = function (DcProfileId) {

        try {
            OneViewConsole.Debug("DeleteById start", "DcProfileDAO.DeleteById");

            var Query = "Delete FROM DefaultScheduleEntity WHERE DcProfileId = " + DcProfileId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcProfileDAO.DeleteById");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("GetByAllDimensions end", "DcProfileDAO.DeleteById");
        }
        catch (Excep) {         
            throw oOneViewExceptionHandler.Create("DAO", "DcProfileDAO.DeleteById", Excep);
        }
        finally {
            Query = null;          
        }
    }
}

function DcApprovalProfileDAO() {

    var MyInstance = this;

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetByAllDimensions = function (Req) {
        try {

            OneViewConsole.Debug("GetByAllDimensions start", "DcApprovalProfileDAO.GetByAllDimensions");

            var oDateTime = new DateTime();
            CurrentDateAndTime = oDateTime.GetDateAndTime();
            CurrentDateAndTime = oDateTime.ConvertDateTimeToInteger(CurrentDateAndTime);           

            var Query = "SELECT *," +
                         "(SUBSTR(DcApprovalProfileEntity.ValidityStartDate, 7, 4) || SUBSTR(DcApprovalProfileEntity.ValidityStartDate, 4, 2) || SUBSTR(DcApprovalProfileEntity.ValidityStartDate, 1, 2) || SUBSTR(DcApprovalProfileEntity.ValidityStartDate, 12, 2) || " +
                         " SUBSTR(DcApprovalProfileEntity.ValidityStartDate, 15, 2) || SUBSTR(DcApprovalProfileEntity.ValidityStartDate, 18, 2) ) AS VSD ,(SUBSTR(DcApprovalProfileEntity.ValidityEndDate, 7, 4) ||SUBSTR(DcApprovalProfileEntity.ValidityEndDate, 4, 2) ||" +
                         " SUBSTR(DcApprovalProfileEntity.ValidityEndDate, 1, 2) || SUBSTR(DcApprovalProfileEntity.ValidityEndDate, 12, 2) || SUBSTR(DcApprovalProfileEntity.ValidityEndDate, 15, 2) || SUBSTR(DcApprovalProfileEntity.ValidityEndDate, 18, 2) ) AS VED" +
                         " FROM DcApprovalProfileEntity" +
                         " WHERE ServiceId =" + Req.ServiceId + " AND DcUserId = " + Req.UserId +
                         " AND (TemplateNodeId = " + Req.TemplateNodeId + " OR TemplateNodeId='-1')" +
                         " AND (DcPlaceId = " + Req.PlaceId + " OR DcPlaceId='-1')" +
                         " AND ('" + CurrentDateAndTime + "'  >=  VSD or  '' = VSD ) AND ('" + CurrentDateAndTime + "'  <=  VED or  '' = VED )" +
                         " Order by TemplateNodeId  desc, DcPlaceId  desc LIMIT 1";
                      

                         //alert("GetByAllDimensions" + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            // Result = JSON.parse(Result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcApprovalProfileDAO.GetByAllDimensions");


            OneViewConsole.Debug("GetByAllDimensions end", "DcApprovalProfileDAO.GetByAllDimensions");

            return Result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("MasterDAO", "DcApprovalProfileDAO.GetByAllDimensions", Excep);
        }
        finally {

            DcResultDetailsEntityCount = null;
        }
    }

    this.IsDCApproved = function (DataCaptureClientGuid) {

        try {
            OneViewConsole.Debug("DcApprovalProfileDAO start", "DcApprovalProfileDAO.IsApproved");

            var Query = "Select * From DataCaptureEntity Where ClientGuid = '" + DataCaptureClientGuid + "' And ApprovalStatus='1'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcApprovalProfileDAO.IsApproved");

            OneViewConsole.Debug("IsApproved end", "DcApprovalProfileDAO.IsApproved");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.IsApproved", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetDcInfoByDcClientGuid = function (DataCaptureClientGuid) {

        try {
            OneViewConsole.Debug("DcApprovalProfileDAO start", "DcApprovalProfileDAO.GetDcInfoByDcClientGuid");

            var DataCaptureClientGuidLst = FomatForListInCondition(DataCaptureClientGuid);
            DataCaptureClientGuidLstInCondition = "ClientGuid In " + DataCaptureClientGuidLst;
            
            var Query = "Select Id,ServiceId,ClientGuid,TemplateNodeId,TemplateNodeName,DcPlaceId,DcPlaceName,DcPlaceDimension,Score,Percentage,CompletedAttributeCount,TotalAttributeCount"+
                        " From DataCaptureEntity Where " + DataCaptureClientGuidLstInCondition + " And ApprovalStatus=0 And IsCompleted='true'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcApprovalProfileDAO.GetDcInfoByDcClientGuid");

            OneViewConsole.Debug("IsApproved end", "DcApprovalProfileDAO.GetDcInfoByDcClientGuid");          
            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.GetDcInfoByDcClientGuid", Excep);
        }
        finally {
            Query = null;
        }

    }

    this.GetByAllDimensions_Profiledownload = function (DcPlaceType, DcPlaceId, TemplateNodeId, DcUserId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions_Profiledownload start", "DcApprovalProfileDAO.GetByAllDimensions_Profiledownload");

            var Query = "SELECT * FROM DcApprovalProfileEntity WHERE DcPlaceType = " + DcPlaceType + " AND DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + DcUserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetByAllDimensions_Profiledownload");
            
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetByAllDimensions_Profiledownload end", "DcApprovalProfileDAO.GetByAllDimensions_Profiledownload");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.GetByAllDimensions_Profiledownload", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetDCListForApproveByTemplatePlaceIdServiceIdUserId = function (Req) {

        try {
            OneViewConsole.Debug("GetDCListForApproveByTemplatePlaceIdServiceIdUserId start", "DcApprovalProfileDAO.GetDCListForApproveByTemplatePlaceIdServiceIdUserId");
        
            var PlaceIdList = FomatForPlaceIdInCondition(Req.PlaceIdLst);
            PlaceIdLstInCondition = "DataCaptureEntity.DcPlaceId In " + PlaceIdList;
           
            var TemplateIdLst = FomatForTemplateInCondition(Req.TemplateIdLst);
            TemplateIdLstInCondition = "DataCaptureEntity.TemplateNodeId In " + TemplateIdLst;
          
            var Query = "Select distinct" +
                        " DataCaptureEntity.Id,DataCaptureEntity.ServiceId,DataCaptureEntity.ClientGuid,DataCaptureEntity.TemplateNodeId," +
                        " DataCaptureEntity.TemplateNodeName,DataCaptureEntity.DcPlaceId,DataCaptureEntity.DcPlaceName,DataCaptureEntity.DcPlaceDimension,DataCaptureEntity.Score," +
                        " DataCaptureEntity.Percentage,DataCaptureEntity.CompletedAttributeCount,DataCaptureEntity.TotalAttributeCount" +
                        " From DataCaptureEntity" +
                        " Inner Join DcResultsEntity" +
                        " On DcResultsEntity.DataCaptureId=DataCaptureEntity.Id " +
                        " Where DataCaptureEntity.ServiceId =" + Req.ServiceId + " And DcResultsEntity.SystemUserId=" + Req.UserId + 
                        " And DataCaptureEntity.ApprovalStatus=0 And DataCaptureEntity.IsCompleted='true'" +
                        " And DataCaptureEntity.IsOnDeviceApprovalFinished !='true'" +
                        " And " + PlaceIdLstInCondition + " And " + TemplateIdLstInCondition;

                        
            //alert(Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetDCListForApproveByTemplatePlaceIdServiceIdUserId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcApprovalProfileDAO.GetDCListForApproveByTemplatePlaceIdServiceIdUserId");

            OneViewConsole.Debug("IsApproved end", "DcApprovalProfileDAO.GetDCListForApproveByTemplatePlaceIdServiceIdUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.GetDCListForApproveByTemplatePlaceIdServiceIdUserId", Excep);
        }
        finally {
            Query = null;
        }
    }
    

    this.DeleteById = function (Id) {

        try {
            OneViewConsole.Debug("DeleteById start", "DcApprovalProfileDAO.DeleteById");

            var Query = "Delete FROM DcApprovalProfileEntity WHERE Id = " + Id;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.DeleteById");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            var _oDcApprovalLevelInfoDAO = new DcApprovalLevelInfoDAO();
            _oDcApprovalLevelInfoDAO.DeleteByDcApprovalProfileId(Id);

            var _oDcApprovalUserDetailsDAO = new DcApprovalUserDetailsDAO();
            _oDcApprovalUserDetailsDAO.DeleteByDcApprovalProfileId(Id);

            OneViewConsole.Debug("DeleteById end", "DcApprovalProfileDAO.DeleteById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.DeleteById", Excep);
        }
        finally {
            Query = null;        
        }
    }

    this.DeleteByServerId = function (ServerId) {

        try {
            OneViewConsole.Debug("DeleteByServerId start", "DcApprovalProfileDAO.DeleteByServerId");

            var Query = "Select Id FROM DcApprovalProfileEntity WHERE ServerId = '" + ServerId + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.DeleteByServerId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (Result.length > 0) {

                var Exp = FomatForInConditionById(Result);

                var DcApprovalProfileDeleteQuery = "Delete FROM DcApprovalProfileEntity WHERE Id IN " + Exp;
                _OneViewSqlitePlugin.ExcecuteSql(DcApprovalProfileDeleteQuery);

                var DcApprovalLevelInfoDeleteQuery = "Delete FROM DcApprovalLevelInfoEntity WHERE DcApprovalProfileId IN " + Exp;
                _OneViewSqlitePlugin.ExcecuteSql(DcApprovalLevelInfoDeleteQuery);

                var DcApprovalUserDetailsDeleteQuery = "Delete FROM DcApprovalUserDetailsEntity WHERE DcApprovalProfileId IN " + Exp;
                _OneViewSqlitePlugin.ExcecuteSql(DcApprovalUserDetailsDeleteQuery);
            }

            OneViewConsole.Debug("DeleteByServerId end", "DcApprovalProfileDAO.DeleteByServerId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.DeleteByServerId", Excep);
        }
        finally {
            Query = null;
        }
    }



    this.DeleteByByAllDimensions = function (DcPlaceType, DcPlaceId, TemplateNodeId, DcUserId) {

        try {
            OneViewConsole.Debug("DeleteByServerId start", "DcApprovalProfileDAO.DeleteByServerId");

            var Query = "SELECT Id FROM DcApprovalProfileEntity WHERE DcPlaceType = " + DcPlaceType + " AND DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + DcUserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.DeleteByServerId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (Result.length > 0) {

                MyInstance.DeleteById(Result[0].Id);
            }
           
            OneViewConsole.Debug("DeleteByServerId end", "DcApprovalProfileDAO.DeleteByServerId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.DeleteByServerId", Excep);
        }
        finally {
            Query = null;
        }
    }


    var FomatForPlaceIdInCondition = function (Info) {
        try {
            OneViewConsole.Debug("FomatForInCondition Start ", "DcApprovalProfileDAO.FomatForInCondition");

            var Incondition = "(";
            for (var i = 0; i < Info.length; i++) {
              
                if (Info[i].ServerId == undefined) {
                    Incondition += Info[i];
                }
                else {
                    Incondition += Info[i].ServerId;                 
                }
               
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForInCondition Incondition : " + Incondition, "DCBlockerInfoDAO.FomatForInCondition");

            OneViewConsole.Debug("FomatForInCondition end ", "DcApprovalProfileDAO.FomatForInCondition");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.FomatForInCondition", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    var FomatForTemplateInCondition = function (Info) {
        try {
            OneViewConsole.Debug("FomatForInCondition Start ", "DcApprovalProfileDAO.FomatForInCondition");

            var Incondition = "(";
            for (var i = 0; i < Info.length; i++) {
                Incondition += Info[i];
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForInCondition Incondition : " + Incondition, "DCBlockerInfoDAO.FomatForInCondition");

            OneViewConsole.Debug("FomatForInCondition end ", "DcApprovalProfileDAO.FomatForInCondition");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.FomatForInCondition", Excep);
        }
        finally {
            Incondition = null;
        }
    }


    var FomatForListInCondition = function (Info) {
        try {
            OneViewConsole.Debug("FomatForListInCondition Start ", "DcApprovalProfileDAO.FomatForListInCondition");

            var Incondition = "(";
            for (var i = 0; i < Info.length; i++) {
                Incondition += "'" + Info[i] + "'";
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForListInCondition Incondition : " + Incondition, "DCBlockerInfoDAO.FomatForListInCondition");

            OneViewConsole.Debug("FomatForListInCondition end ", "DcApprovalProfileDAO.FomatForListInCondition");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.FomatForListInCondition", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    var FomatForInConditionById = function (Info) {
        try {
            OneViewConsole.Debug("FomatForInConditionById start", "DcApprovalProfileDAO.FomatForInConditionById");
            OneViewConsole.DataLog("Request DcInfo : " + JSON.stringify(Info), "DcDAO.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < Info.length; i++) {
                Incondition += Info[i].Id;
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "DcApprovalProfileDAO.FomatForInConditionById");
            OneViewConsole.Debug("FomatForInConditionById end", "DcApprovalProfileDAO.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalProfileDAO.FomatForInConditionById", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    this.GetAllChildsWithType = function (ServerId, Type, TableName) {
        try {
            OneViewConsole.Debug("GetAllChildsWithType start", "DefaultTreeDAO.GetAllChildsWithType");

            var ParentNode = MyInstance.GetNodeById(ServerId, TableName);

            if (ParentNode.length != 0) {
                var Query = "SELECT * FROM " + TableName + " WHERE Left > " + ParentNode[0].Left + " AND Right < " + ParentNode[0].Right + " AND childDbElementType = '" + Type + "'";

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithType");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsWithType");
                OneViewConsole.Debug("GetAllChildsWithType end", "DefaultTreeDAO.GetAllChildsWithType");

                return JSON.parse(Nodes);
            }
            else {
                return new Array();
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChildsWithType", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }

    this.GetNodeById = function (ServerId, TableName) {

        try {
            OneViewConsole.Debug("GetNodeById start", "DefaultTreeDAO.GetNodeById");
            var ParentNodeQuery = "SELECT * FROM " + TableName + " WHERE ServerId = " + ServerId;
            OneViewConsole.DataLog("Requested Query : " + ParentNodeQuery, "DefaultTreeDAO.GetNodeById");

            var Node = window.OneViewSqlite.excecuteSqlReader(ParentNodeQuery);


            OneViewConsole.DataLog("Response from db : " + Node, "DefaultTreeDAO.GetNodeById");
            OneViewConsole.Debug("GetNodeById end", "DefaultTreeDAO.GetNodeById");

            return JSON.parse(Node);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetNodeById", Excep);
        }
        finally {
            ParentNodeQuery = null;
            Node = null;
        }
    }
}

function DcApprovalLevelInfoDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetByAllDimensions = function (DcApprovalProfileId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "DcApprovalLevelInfoDAO.GetByAllDimensions");

            var Query = "Select * From DcApprovalLevelInfoEntity WHERE DcApprovalProfileId = " + DcApprovalProfileId + " And IsOnDeviceApproval='true'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcApprovalLevelInfoDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "DcApprovalLevelInfoDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalLevelInfoDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.DeleteByDcApprovalProfileId = function (DcApprovalProfileId) {

        try {
            OneViewConsole.Debug("DeleteByDcApprovalProfileId start", "DcApprovalLevelInfoDAO.DeleteByDcApprovalProfileId");

            var Query = "Delete FROM DcApprovalLevelInfoEntity WHERE DcApprovalProfileId = " + DcApprovalProfileId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalLevelInfoDAO.DeleteById");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByDcApprovalProfileId end", "DcApprovalLevelInfoDAO.DeleteByDcApprovalProfileId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalLevelInfoDAO.DeleteByDcApprovalProfileId", Excep);
        }
        finally {
            Query = null;         
        }
    }
}

function DcApprovalUserDetailsDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    // Get CurrenntDateAndTime from OneViewDateTime framework
    var oDateTime = new DateTime();
    var CurrenntDateAndTime = oDateTime.GetDateAndTime();

    this.GetByAllDimensions = function (DcApprovalProfileId) {

        try {
            OneViewConsole.Debug("DcApprovalUserDetailsDAO start", "DcApprovalUserDetailsDAO.GetByAllDimensions");

            var Query = "Select * From DcApprovalUserDetailsEntity WHERE DcApprovalProfileId = " + DcApprovalProfileId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcApprovalUserDetailsDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "DcApprovalUserDetailsDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalUserDetailsDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.DeleteByDcApprovalProfileId = function (DcApprovalProfileId) {

        try {
            OneViewConsole.Debug("DeleteByDcApprovalProfileId start", "DcApprovalUserDetailsDAO.DeleteByDcApprovalProfileId");

            var Query = "Delete FROM DcApprovalUserDetailsEntity WHERE DcApprovalProfileId = " + DcApprovalProfileId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalUserDetailsDAO.DeleteById");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByDcApprovalProfileId end", "DcApprovalUserDetailsDAO.DeleteByDcApprovalProfileId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalUserDetailsDAO.DeleteByDcApprovalProfileId", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateUserNameByUserId = function (UserId, UserName) {

        try {
            OneViewConsole.Debug("UpdateUserNameByUserId start", "DcApprovalUserDetailsDAO.UpdateUserNameByUserId");

            var Query = "UPDATE DcApprovalUserDetailsEntity SET UserName = '" + UserName + "', TimeStamp = '" + CurrenntDateAndTime + "' WHERE UserId = " + UserId;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalUserDetailsDAO.UpdateUserNameByUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateUserNameByUserId end", "DcApprovalUserDetailsDAO.UpdateUserNameByUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalUserDetailsDAO.UpdateUserNameByUserId", Excep);
        }
        finally {
            Query = null;
        }
    }
}

function MultiMediaSubElementsDAO() {

    var MyInstance = this;
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
   
    this.Delete = function (MappedEntityLst) {

        try {
            OneViewConsole.Debug("Delete start", "MultiMediaSubElementsDAO.Delete");

            if (MappedEntityLst.length > 0) {

                var Exp = FomatForInConditionByClientGuid(MappedEntityLst);              
                var Query = "SELECT LocalURL FROM MultiMediaSubElements WHERE MappedEntityClientGuid IN " + Exp;
              
                OneViewConsole.Debug("Requested Query : " + Query, "MultiMediaSubElementsDAO.Delete");
                var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
               
                for (var i = 0; i < MappedEntityLst.length; i++) {
                    MyInstance.DeleteByMappedEntityClientGuid(MappedEntityLst[i].ClientGuid);
                }

                for (var i = 0; i < Result.length; i++) {
                    var oOneViewCordovaFilePlugin = new OneViewCordovaFilePlugin();                 
                    oOneViewCordovaFilePlugin.DeleteFile(Result[i].LocalURL);
                }
            }

            OneViewConsole.Debug("Delete end", "MultiMediaSubElementsDAO.Delete");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MultiMediaSubElementsDAO.Delete", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.DeleteByMappedEntityClientGuid = function (MappedEntityClientGuid) {

        try {
            OneViewConsole.Debug("DeleteByMappedEntityClientGuid start", "MultiMediaSubElementsDAO.DeleteByMappedEntityClientGuid");

            var Query = "DELETE FROM MultiMediaSubElements WHERE MappedEntityClientGuid = '" + MappedEntityClientGuid + "'";          
            OneViewConsole.Debug("Requested Query : " + Query, "MultiMediaSubElementsDAO.DeleteByMappedEntityClientGuid");

            _OneViewSqlitePlugin.ExcecuteSql(Query);
       
            OneViewConsole.Debug("DeleteByMappedEntityClientGuid end", "MultiMediaSubElementsDAO.DeleteByMappedEntityClientGuid");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MultiMediaSubElementsDAO.DeleteByMappedEntityClientGuid", Excep);
        }
        finally {
            Query = null;       
        }
    }

    var FomatForInConditionByClientGuid = function (Result) {
        try {
            OneViewConsole.Debug("FomatForInConditionByMappedEntityClientGuid start", "DcDAO.FomatForInConditionByMappedEntityClientGuid");
            OneViewConsole.DataLog("Request Result : " + JSON.stringify(Result), "DcDAO.FomatForInConditionByMappedEntityClientGuid");

            var Incondition = "(";

            for (var i = 0; i < Result.length; i++) {
                Incondition += "'" + Result[i].ClientGuid + "'";
                Incondition += (i <= Result.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "DcDAO.FomatForInConditionByMappedEntityClientGuid");
            OneViewConsole.Debug("FomatForInConditionByMappedEntityClientGuid end", "DcDAO.FomatForInConditionByMappedEntityClientGuid");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.FomatForInConditionByMappedEntityClientGuid", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    this.GetMultiMediaSubElements = function (MappedClientGuid) {

        try {
            OneViewConsole.Debug("GetMultiMediaSubElements start", "MultiMediaSubElementsDAO.GetMultiMediaSubElements");

            var Query = "SELECT * FROM MultiMediaSubElements WHERE IsDisabled = 'false' AND MappedEntityClientGuid = '" + MappedClientGuid + "'";


            OneViewConsole.DataLog("Requested Query : " + Query, "MultiMediaSubElementsDAO.GetMultiMediaSubElements");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionResolveDAO.GetMultiMediaSubElements");
            OneViewConsole.Debug("GetMultiMediaSubElements end", "MultiMediaSubElementsDAO.GetMultiMediaSubElements");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MultiMediaSubElementsDAO.GetMultiMediaSubElements", Excep);
        }
    }

    this.GetAllUnSyncMultiMediaSubElementsForDcUpload = function (DcInfo, ActionInfo) {

        try {
            OneViewConsole.Debug("GetAllUnSyncMultiMediaSubElementsForDcUpload start", "MultiMediaSubElementsDAO.GetAllUnSyncMultiMediaSubElementsForDcUpload");

            //alert("DcInfo : " + JSON.stringify(DcInfo));
            //alert("ActionInfo : " + JSON.stringify(ActionInfo));

            var Result = new Array();

            if (DcInfo.length > 0) {
                var Exp = FomatForInConditionByClientGuid(DcInfo);               
                Result = Result.concat(GetUnSyncMultiMediaSubElementsByExp(Exp, DATEntityType.DataCapture));
                //alert("DcInfo Result : " + JSON.stringify(Result));
            }

            if (ActionInfo != null) {

                var ActionLst = ActionInfo.ActionInfoList.ActionLst;
                //var ActionDetailsLst = ActionInfo.ActionInfoList.ActionDetailsLst;
                var DCNCMappingLst = ActionInfo.ActionInfoList.DCNCMappingLst;

                if (ActionLst.length > 0) {
                    var Exp = FomatForInConditionByClientGuid(ActionLst);
                    Result = Result.concat(GetUnSyncMultiMediaSubElementsByExp(Exp, DATEntityType.Action));
                    //alert("ActionLst Result : " + JSON.stringify(Result));
                }

                if (DCNCMappingLst.length > 0) {
                    var Exp = FomatForInConditionByClientGuid(DCNCMappingLst);
                    Result = Result.concat(GetUnSyncMultiMediaSubElementsByExp(Exp, DATEntityType.DCNCMapping));
                    //alert("DCNCMappingLst Result : " + JSON.stringify(Result));
                }
            }

            //alert("Result : " + JSON.stringify(Result));
         
            OneViewConsole.Debug("GetAllUnSyncMultiMediaSubElementsForDcUpload end", "MultiMediaSubElementsDAO.GetAllUnSyncMultiMediaSubElementsForDcUpload");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MultiMediaSubElementsDAO.GetAllUnSyncMultiMediaSubElementsForDcUpload", Excep);
        }
    }

    var GetUnSyncMultiMediaSubElementsByExp = function (Exp, Dimension) {

        try {
            OneViewConsole.Debug("GetUnSyncMultiMediaSubElementsByExp start", "MultiMediaSubElementsDAO.GetUnSyncMultiMediaSubElementsByExp");

            var Query = "SELECT * FROM MultiMediaSubElements WHERE IsSynchronized = 'false' AND Dimension = '" + Dimension + "' AND MappedEntityClientGuid IN " + Exp;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "MultiMediaSubElementsDAO.GetAllMultiMediaSubElementsForDcUpload");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionResolveDAO.GetUnSyncMultiMediaSubElementsByExp");
            OneViewConsole.Debug("GetUnSyncMultiMediaSubElementsByExp end", "MultiMediaSubElementsDAO.GetUnSyncMultiMediaSubElementsByExp");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MultiMediaSubElementsDAO.GetUnSyncMultiMediaSubElementsByExp", Excep);
        }
    }

    this.GetMultiMediaSubElementsByMappedEntityClientGuidDimension = function (Req) {

        try {
            OneViewConsole.Debug("GetMultiMediaSubElementsByMappedEntityClientGuidDimension start", "MultiMediaSubElementsDAO.GetMultiMediaSubElementsByMappedEntityClientGuidDimension");

            var Query = "SELECT * FROM MultiMediaSubElements WHERE IsDisabled = 'false' AND Dimension = '" + Req.Dimension + "' AND MappedEntityClientGuid = '" + Req.MappedClientGuid + "'";
            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "MultiMediaSubElementsDAO.GetMultiMediaSubElementsByMappedEntityClientGuidDimension");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            //alert('JSON.stringify(Result) : ' + JSON.stringify(Result));
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionResolveDAO.GetMultiMediaSubElementsByMappedEntityClientGuidDimension");
            OneViewConsole.Debug("GetMultiMediaSubElementsByMappedEntityClientGuidDimension end", "MultiMediaSubElementsDAO.GetMultiMediaSubElementsByMappedEntityClientGuidDimension");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MultiMediaSubElementsDAO.GetMultiMediaSubElementsByMappedEntityClientGuidDimension", Excep);
        }
    }

    this.GetAllMultiMediaUnSyncMultiMediaSubElement = function (Req) {

        try {
            OneViewConsole.Debug("GetAllMultiMediaUnSyncMultiMediaSubElement start", "MultiMediaSubElementsDAO.GetAllMultiMediaUnSyncMultiMediaSubElement");

            var Query = "SELECT * FROM MultiMediaSubElements WHERE IsDisabled='false' and IsMultiMediaSynchronized='false'";
            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "MultiMediaSubElementsDAO.GetAllMultiMediaUnSyncMultiMediaSubElement");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            //alert('JSON.stringify(Result) : ' + JSON.stringify(Result));
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionResolveDAO.GetAllMultiMediaUnSyncMultiMediaSubElement");
            OneViewConsole.Debug("GetAllMultiMediaUnSyncMultiMediaSubElement end", "MultiMediaSubElementsDAO.GetAllMultiMediaUnSyncMultiMediaSubElement");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MultiMediaSubElementsDAO.GetAllMultiMediaUnSyncMultiMediaSubElement", Excep);
        }
    }

    this.DisableByMappedEntityClientGuid = function (MappedEntityClientGuid) {

        try {
            OneViewConsole.Debug("DisableByMappedEntityClientGuid start", "MultiMediaSubElementsDAO.DisableByMappedEntityClientGuid");

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var Query = "UPDATE MultiMediaSubElements set IsDisabled='true',IsSynchronized='false', TimeStamp= " + CurrenntDateAndTime + " WHERE MappedEntityClientGuid = '" + MappedEntityClientGuid + "'";
            OneViewConsole.Debug("Requested Query : " + Query, "MultiMediaSubElementsDAO.DisableByMappedEntityClientGuid");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DisableByMappedEntityClientGuid end", "MultiMediaSubElementsDAO.DisableByMappedEntityClientGuid");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MultiMediaSubElementsDAO.DisableByMappedEntityClientGuid", Excep);
        }
        finally {
            Query = null;
        }
    }

 }

           
function ShiftMasterDAO() {

    var MyInstance = this;
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetValidShiftByService = function (ServiceId, DateTime) {
        try {
            OneViewConsole.Debug("GetValidShiftByService start", "ShiftMasterDAO.GetValidShiftByService");

            var Query = "SELECT SM.*,(SUBSTR(SM.StartDate, 7, 4) || SUBSTR(SM.StartDate, 4, 2) || SUBSTR(SM.StartDate, 1, 2) || SUBSTR(SM.StartDate, 12, 2) || SUBSTR(SM.StartDate, 15, 2) || SUBSTR(SM.StartDate, 18, 2) ) AS SD, " +
                                        " (SUBSTR(SM.EndDate, 7, 4) || SUBSTR(SM.EndDate, 4, 2) || SUBSTR(SM.EndDate, 1, 2) || SUBSTR(SM.EndDate, 12, 2) || SUBSTR(SM.EndDate, 15, 2) || SUBSTR(SM.EndDate, 18, 2) ) AS ED " +
                                        " FROM ShiftMasterEntity AS SM WHERE SM.ServiceId = " + ServiceId + " AND SD <=  '" + DateTime + "' AND ( '" + DateTime + "'  <  ED or  '' = ED )";

            OneViewConsole.DataLog("Requested Query : " + Query, "ShiftMasterDAO.GetValidShiftByService");

            //alert('Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            //alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ShiftMasterDAO.GetValidShiftByService");
            OneViewConsole.Debug("GetValidShiftByService end", "ShiftMasterDAO.GetValidShiftByService");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ShiftMasterDAO.GetValidShiftByService", Excep);
        }
    }


    this.GetShiftDetailsForSelectedShift = function (ShiftMasterId) {
        try {
            OneViewConsole.Debug("GetShiftDetailsForSelectedShift start", "ShiftMasterDAO.GetShiftDetailsForSelectedShift");

            var Query = "SELECT * FROM ShiftDetailsMasterEntity WHERE ShiftMasterId = " + ShiftMasterId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ShiftMasterDAO.GetShiftDetailsForSelectedShift");

            //alert('Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            //alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ShiftMasterDAO.GetShiftDetailsForSelectedShift");

            OneViewConsole.Debug("GetShiftDetailsForSelectedShift end", "ShiftMasterDAO.GetShiftDetailsForSelectedShift");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ShiftMasterDAO.GetShiftDetailsForSelectedShift", Excep);
        }
    }
}


function BandDetailsMasterDAO() {

    var MyInstance = this;

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetBandDetailsByBandId = function (BandMasterId) {

        try {
            OneViewConsole.Debug("GetBandDetailsByBandId start", "BandDetailsMasterDAO.GetBandDetailsByBandId");

            var Query = "SELECT * FROM BandDetailsMasterEntity WHERE BandMasterId = " + BandMasterId ;

            OneViewConsole.DataLog("Requested Query : " + Query, "BandDetailsMasterDAO.GetBandDetailsByBandId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "BandDetailsMasterDAO.GetBandDetailsByBandId");
          
            OneViewConsole.Debug("GetBandDetailsByBandId end", "BandDetailsMasterDAO.GetBandDetailsByBandId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "BandDetailsMasterDAO.GetBandDetailsByBandId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetBandDetailsColourCodeById = function (BandDetailsMasterId) {

        try {
            OneViewConsole.Debug("GetBandDetailsColourCodeById start", "BandDetailsMasterDAO.GetBandDetailsColourCodeById");

            var Query = "SELECT ColourCode FROM BandDetailsMasterEntity WHERE ServerId = " + BandDetailsMasterId;

            OneViewConsole.DataLog("Requested Query : " + Query, "BandDetailsMasterDAO.GetBandDetailsColourCodeById");

            //alert('Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            //alert('Result  : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "BandDetailsMasterDAO.GetBandDetailsColourCodeById");

            OneViewConsole.Debug("GetBandDetailsColourCodeById end", "BandDetailsMasterDAO.GetBandDetailsColourCodeById");

            if (Result.length > 0) {
                return Result[0].ColourCode
            }
            else {
                return null;
            }
        }
        catch (Excep) {
            //alert('GetBandDetailsColourCodeById Excep : ' + Excep);
            throw oOneViewExceptionHandler.Create("DAO", "BandDetailsMasterDAO.GetBandDetailsColourCodeById", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    this.GetBandDetailsByServerId = function (ServerIdLst) {
        try {
            OneViewConsole.Debug("GetBandDetailsByServerId start", "DcDAO.GetBandDetailsByServerId");

            var ServerIdLstInLst = FomatForListInCondition(ServerIdLst);
            ServerIdInCondition = "ServerId In " + ServerIdLstInLst;

            var Query = "Select * From BandDetailsMasterEntity where " + ServerIdInCondition + "";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcDetailsByDcId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Result, "DcDAO.GetBandDetailsByServerId");
            OneViewConsole.Debug("GetBandDetailsByServerId end", "DcDAO.GetBandDetailsByServerId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetBandDetailsByServerId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    var FomatForListInCondition = function (Info) {
        try {
            OneViewConsole.Debug("FomatForListInCondition Start ", "DcDAO.FomatForListInCondition");

            var Incondition = "(";
            for (var i = 0; i < Info.length; i++) {
                Incondition += "'" + Info[i] + "'";
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForListInCondition Incondition : " + Incondition, "ActionDAO.FomatForListInCondition");

            OneViewConsole.Debug("FomatForListInCondition end ", "DcDAO.FomatForListInCondition");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.FomatForListInCondition", Excep);
        }
        finally {
            Incondition = null;
        }
    }
}


function TaskSyncLogDAO() {

    var MyInstance = this;

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetAllUnSyncedTasks = function () {
        try {
            OneViewConsole.Debug("GetAllUnSyncedTasks start", "TaskSyncLogDAO.GetAllUnSyncedTasks");

            var Query = "SELECT * FROM TaskSyncLogEntity WHERE LocalSyncStatus = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "TaskSyncLogDAO.GetAllUnSyncedTasks");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "TaskSyncLogDAO.GetAllUnSyncedTasks");

            OneViewConsole.Debug("GetAllUnSyncedTasks end", "TaskSyncLogDAO.GetAllUnSyncedTasks");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TaskSyncLogDAO.GetAllUnSyncedTasks", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetAllUnSyncedTasksDetails = function () {
        try {
            OneViewConsole.Debug("GetAllUnSyncedTasksDetails start", "TaskSyncLogDAO.GetAllUnSyncedTasksDetails");

            var Query = "SELECT EntityType,EntityId FROM TaskSyncLogEntity WHERE LocalSyncStatus = 'false' AND ServerSyncStatus ='false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "TaskSyncLogDAO.GetAllUnSyncedTasksDetails");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "TaskSyncLogDAO.GetAllUnSyncedTasksDetails");

            OneViewConsole.Debug("GetAllUnSyncedTasksDetails end", "TaskSyncLogDAO.GetAllUnSyncedTasksDetails");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TaskSyncLogDAO.GetAllUnSyncedTasksDetails", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    this.GetAllSyncedTasks = function () {
        try {
            OneViewConsole.Debug("GetAllSyncedTasks start", "TaskSyncLogDAO.GetAllSyncedTasks");

            var Query = "SELECT TransactionId FROM TaskSyncLogEntity WHERE LocalSyncStatus = 'true' AND ServerSyncStatus ='false'";
           
            OneViewConsole.DataLog("Requested Query : " + Query, "TaskSyncLogDAO.GetAllSyncedTasks");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "TaskSyncLogDAO.GetAllSyncedTasks");

            OneViewConsole.Debug("GetAllSyncedTasks end", "TaskSyncLogDAO.GetAllSyncedTasks");

            return Result;
        }
        catch (Excep) {
           // alert('GetAllSyncedTasks Excep : ' + Excep);
           // alert('GetAllSyncedTasks Excep : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "TaskSyncLogDAO.GetAllSyncedTasks", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.UpdateLocalSyncStatus = function (EntityId, EntityType) {
        try {
            OneViewConsole.Debug("UpdateLocalSyncStatus start", "TaskSyncLogDAO.UpdateLocalSyncStatus");

            var Query = "UPDATE TaskSyncLogEntity SET LocalSyncStatus = 'true' WHERE EntityId = '" + EntityId + "' AND EntityType = " + EntityType;
           
            OneViewConsole.DataLog("Requested Query : " + Query, "TaskSyncLogDAO.UpdateLocalSyncStatus");

            _OneViewSqlitePlugin.ExcecuteSql(Query);
           
            OneViewConsole.Debug("UpdateLocalSyncStatus end", "TaskSyncLogDAO.UpdateLocalSyncStatus");

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TaskSyncLogDAO.UpdateLocalSyncStatus", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateListLocalSyncStatus = function (ModifiedEntityList) {
        try {
            OneViewConsole.Debug("UpdateListLocalSyncStatus start", "TaskSyncLogDAO.UpdateListLocalSyncStatus");

            var Len=ModifiedEntityList.length;
            var EntityIdIncondition = "(";
            var EntityTypeIncondition = "(";
            for (var i = 0; i < Len; i++) {
                EntityData=ModifiedEntityList[i];
                EntityIdIncondition = EntityIdIncondition + "'" + EntityData.EntityId + "'";
                EntityIdIncondition += (i <= Len - 2) ? "," : ")";

                EntityTypeIncondition += + EntityData.EntityType ;
                EntityTypeIncondition += (i <= Len - 2) ? "," : ")";
            }

            var Query = "UPDATE TaskSyncLogEntity SET LocalSyncStatus = 'true' WHERE EntityId IN " + EntityIdIncondition + " AND EntityType IN " + EntityTypeIncondition;
           
            OneViewConsole.DataLog("Requested Query : " + Query, "TaskSyncLogDAO.UpdateListLocalSyncStatus");

            _OneViewSqlitePlugin.ExcecuteSql(Query);
            
            OneViewConsole.Debug("UpdateListLocalSyncStatus end", "TaskSyncLogDAO.UpdateListLocalSyncStatus");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TaskSyncLogDAO.UpdateListLocalSyncStatus", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateServerSyncStatus = function (EntityTypeIncondition, EntityIdIncondition) {
        try {
            OneViewConsole.Debug("UpdateServerSyncStatus start", "TaskSyncLogDAO.UpdateServerSyncStatus");

            var Query = "UPDATE TaskSyncLogEntity SET ServerSyncStatus = 'true' WHERE EntityId IN " + EntityIdIncondition + " AND EntityType IN " + EntityTypeIncondition;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "TaskSyncLogDAO.UpdateServerSyncStatus");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateServerSyncStatus end", "TaskSyncLogDAO.UpdateServerSyncStatus");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TaskSyncLogDAO.UpdateServerUnSyncedStatus", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }
    

}
              
