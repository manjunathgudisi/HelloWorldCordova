

// ActionFollowUpApprovalDownloadDAO

//ActionFollowUpApprovalDownloadDAO
function ActionFollowUpApprovalDownloadDAO() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetByAllDimensions = function (ServiceId, ActionProfileId, FollowUpUserId, ActionDetailsId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "ActionFollowUpApprovalDownloadDAO.GetByAllDimensions");

            var Query = "SELECT Id FROM ActionFollowUpInfoEntity WHERE ServiceId = " + ServiceId + " AND ActionProfileId = '" + ActionProfileId + "' AND FollowUpUserId = " + FollowUpUserId + " AND ActionDetailsId = " + ActionDetailsId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpApprovalDownloadDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpApprovalDownloadDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "ActionFollowUpApprovalDownloadDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpApprovalDownloadDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetByAllDimensions_Profiledownload = function (PlaceType, PlaceId, TemplateNodeId, UserId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions_Profiledownload start", "ActionFollowUpApprovalDownloadDAO.GetByAllDimensions_Profiledownload");

            var Query = "SELECT * FROM ActionFollowUpApprovalProfileEntity WHERE PlaceType = " + PlaceType + " AND PlaceId = " + PlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND UserId = " + UserId + " AND FollowUpUserId = " + FollowUpUserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpApprovalDownloadDAO.GetByAllDimensions_Profiledownload");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetByAllDimensions_Profiledownload end", "ActionFollowUpApprovalDownloadDAO.GetByAllDimensions_Profiledownload");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpApprovalDownloadDAO.GetByAllDimensions_Profiledownload", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.DeleteByByAllDimensions = function (DcPlaceType, PlaceId, TemplateNodeId, UserId) {

        try {
            OneViewConsole.Debug("DeleteByByAllDimensions start", "ActionFollowUpApprovalDownloadDAO.DeleteByByAllDimensions");

            var Query = "SELECT Id FROM ActionFollowUpApprovalProfileEntity WHERE PlaceType = " + PlaceType + " AND PlaceId = " + PlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND UserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpApprovalDownloadDAO.DeleteByByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (Result.length > 0) {

                MyInstance.DeleteById(Result[0].Id);
            }

            OneViewConsole.Debug("DeleteByByAllDimensions end", "ActionFollowUpApprovalDownloadDAO.DeleteByByAllDimensions");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpApprovalDownloadDAO.DeleteByByAllDimensions", Excep);
        }
        finally {
            Query = null;
        }
    }


    this.IsTemplateExist = function (ServiceId, UserId, TemplateId) {

        try {
            OneViewConsole.Debug("IsTemplateExist start", "ActionFollowUpApprovalDownloadDAO.IsTemplateExist");

            var Query = "SELECT COUNT(*) AS TemplateCount FROM ActionFollowUpApprovalProfileEntity AFA INNER JOIN ActionFollowUpApprovalUserDetailsEntity AFAU " +
                            " ON AFA.Id = AFAU.ActionFollowUpApprovalProfileId  WHERE AFA.ServiceId = " + ServiceId + " AND AFAU.UserId = " + UserId + " AND AFA.TemplateNodeId = " + TemplateId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpApprovalDownloadDAO.IsTemplateExist");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpApprovalDownloadDAO.IsTemplateExist");

            var IsDownloaded = false;
            if (Result != null) {
                IsDownloaded = (Result[0].TemplateCount > 0) ? true : false;
            }
            OneViewConsole.Debug("IsTemplateExist end", "ActionFollowUpApprovalDownloadDAO.IsTemplateExist");

            return IsDownloaded;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpApprovalDownloadDAO.IsTemplateExist", Excep);
        }
        finally {
            Query = null;
            Result = null;
            IsDownloaded = null;
        }
    }

    this.IsPlaceExist = function (ServiceId, UserId, PlaceId) {

        try {
            OneViewConsole.Debug("IsPlaceExist start", "ActionFollowUpApprovalDownloadDAO.IsPlaceExist");
            

            var Query = "SELECT COUNT(*) AS DcPlaceCount FROM ActionFollowUpApprovalProfileEntity AFA INNER JOIN ActionFollowUpApprovalUserDetailsEntity AFAU " +
                           " ON AFA.Id = AFAU.ActionFollowUpApprovalProfileId  WHERE AFA.ServiceId = " + ServiceId + " AND AFAU.UserId = " + UserId + " AND AFA.PlaceId = " + PlaceId;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpApprovalDownloadDAO.IsPlaceExist");
          
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpApprovalDownloadDAO.IsPlaceExist");

            var IsDownloaded = false;
            if (Result != null) {
                IsDownloaded = (Result[0].DcPlaceCount > 0) ? true : false;
            }
           
            OneViewConsole.Debug("IsPlaceExist end", "ActionFollowUpApprovalDownloadDAO.IsPlaceExist");

            return IsDownloaded;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpApprovalDownloadDAO.IsPlaceExist", Excep);
        }
        finally {
            Query = null;
            Result = null;
            IsDownloaded = null;
        }
    }

    /// <summary>
    /// Get all Action   
    /// </summary>
    /// <param name="FilterParam">Request param</param>
    //Need to action id and time for filteration
    /// <returns>DcInfo</returns>  
    this.GetAllActionFollowUp = function (FilterParam) {

        try {
            OneViewConsole.Debug("GetAllAction start", "ActionFollowUpApprovalDownloadDAO.GetAllAction");

            //var Query = "Select ActionFollowUpInfoEntity.FollowUpUserName as FollowUpUserName, ActionFollowUpInfoEntity.ActionId as ActionId,ActionFollowUpInfoEntity.ActionDetailsId as ActionDetailsId,ActionFollowUpInfoEntity.PredefinedActionId as PredefinedActionId," +
            //            "ActionFollowUpInfoEntity.PredefinedActionName as PredefinedActionName, ActionFollowUpInfoEntity.CustomAction as CustomAction,ActionFollowUpInfoEntity.FormActionDataCaptureId as FormActionDataCaptureId,ActionFollowUpInfoEntity.ActionComments as ActionComments," +
            //            "ActionFollowUpInfoEntity.ActionRaisedDate as ActionRaisedDate, ActionFollowUpInfoEntity.RectificationTime as RectificationTime, ActionFollowUpInfoEntity.ActionRaisedUserId as ActionRaisedUserId,ActionFollowUpInfoEntity.ActionRaisedUserName as ActionRaisedUserName," +
            //            "ActionFollowUpInfoEntity.AnonymousActionRaisedUserInfo as AnonymousActionRaisedUserInfo,ActionFollowUpInfoEntity.ActionRaisedUserName as ActionRaisedUserName,ActionFollowUpInfoEntity.AnonymousActionRaisedUserInfo as AnonymousActionRaisedUserInfo, " +
            //            "ActionFollowUpInfoEntity.ActionNCRuleInfo as ActionNCRuleInfo,ActionFollowUpInfoEntity.ActionAttributeInfo as ActionAttributeInfo, ActionFollowUpInfoEntity.ActionMultimediaSubElementsInfo as ActionMultimediaSubElementsInfo," +
            //            "ActionFollowUpInfoEntity.AttributeIds as AttributeIds,ActionFollowUpInfoEntity.AttributeNames as AttributeNames,ActionFollowUpInfoEntity.CreatedDate as CreatedDate, " +
            //            "ActionDataCaptureInfoEntity.DcPlaceId as DcPlaceId,ActionDataCaptureInfoEntity.DcPlaceName as DcPlaceName,ActionDataCaptureInfoEntity.TemplateNodeId as TemplateNodeId,ActionDataCaptureInfoEntity.TemplateNodeName as TemplateNodeName ," +
            //            "ActionDataCaptureInfoEntity.DcPlaceMaterializedPath as DcPlaceMaterializedPath,ActionDataCaptureInfoEntity.DcPlaceNameHierarchy as DcPlaceNameHierarchy,ActionDataCaptureInfoEntity.DcPlaceDimension as DcPlaceDimension " +
            //            "from  ActionFollowUpInfoEntity " +
            //            "INNER JOIN ActionDataCaptureInfoEntity ON ActionFollowUpInfoEntity.ActionDataCaptureInfoId = ActionDataCaptureInfoEntity.Id " +
            //            "where (ActionFollowUpInfoEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
            //            " AND (ActionFollowUpInfoEntity.FollowUpUserId = " + FilterParam.FollowUpUserId + " OR -1=" + FilterParam.FollowUpUserId + ")" +
            //            " AND (ActionDataCaptureInfoEntity.TemplateNodeId  = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
            //            " AND (ActionDataCaptureInfoEntity.DcPlaceId  = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")" +
            //            " AND (ActionFollowUpInfoEntity.PredefinedActionId  = " + FilterParam.PredefinedActionId + " OR -1=" + FilterParam.PredefinedActionId + ")" +
            //             "order by DcPlaceName ";

            var Query = "Select * " +
                        "from  ActionFollowUpInfoEntity " +
                        "INNER JOIN ActionDataCaptureInfoEntity ON ActionFollowUpInfoEntity.ActionDataCaptureInfoId = ActionDataCaptureInfoEntity.Id " +
                        "where (ActionFollowUpInfoEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                        " AND (ActionFollowUpInfoEntity.FollowUpUserId = " + FilterParam.FollowUpUserId + " OR -1=" + FilterParam.FollowUpUserId + ")" +
                        " AND (ActionDataCaptureInfoEntity.TemplateNodeId  = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                        " AND (ActionDataCaptureInfoEntity.DcPlaceId  = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")" +
                        " AND (ActionFollowUpInfoEntity.PredefinedActionId  = " + FilterParam.PredefinedActionId + " OR -1=" + FilterParam.PredefinedActionId + ")" +
                         "order by DcPlaceName ";



            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpApprovalDownloadDAO.GetAllAction");

            var ActionInfo = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionInfo), "ActionFollowUpApprovalDownloadDAO.GetAllAction");
            OneViewConsole.Debug("GetAllAction end", "ActionFollowUpApprovalDownloadDAO.GetAllAction");

            return ActionInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllDC", Excep);
        }
    }

    this.UpdateFollowUpUserNameByFollowUpUserId = function (FollowUpUserId, FollowUpUserName) {

        try {
            OneViewConsole.Debug("UpdateFollowUpUserNameByFollowUpUserId start", "ActionFollowUpApprovalDownloadDAO.UpdateFollowUpUserNameByFollowUpUserId");

            var ActionFollowUpInfoUpdateQuery = "UPDATE ActionFollowUpInfoEntity SET FollowUpUserName = '" + FollowUpUserName + "', TimeStamp = '" + CurrentDateAndTime + "' WHERE FollowUpUserId = " + FollowUpUserId;
            _OneViewSqlitePlugin.ExcecuteSql(ActionFollowUpInfoUpdateQuery);

            var ActionDataCaptureInfoUpdateQuery = "UPDATE ActionDataCaptureInfoEntity SET DcUserName = '" + FollowUpUserName + "', TimeStamp = '" + CurrentDateAndTime + "' WHERE DcUserId = " + FollowUpUserId;
            _OneViewSqlitePlugin.ExcecuteSql(ActionDataCaptureInfoUpdateQuery);

            OneViewConsole.Debug("UpdateFollowUpUserNameByFollowUpUserId end", "ActionFollowUpApprovalDownloadDAO.UpdateFollowUpUserNameByFollowUpUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpApprovalDownloadDAO.UpdateFollowUpUserNameByFollowUpUserId", Excep);
        }
        finally {
            ActionFollowUpInfoUpdateQuery = null;
            ActionDataCaptureInfoUpdateQuery = null;
        }
    }

    this.UpdateDcPlaceNameByDcPlaceId = function (DcPlaceId, DcPlaceName) {

        try {
            OneViewConsole.Debug("UpdateDcPlaceNameByDcPlaceId start", "ActionFollowUpApprovalDownloadDAO.UpdateDcPlaceNameByDcPlaceId");

            var Query = "UPDATE ActionDataCaptureInfoEntity SET DcPlaceName = '" + DcPlaceName + "', TimeStamp = '" + CurrentDateAndTime + "' WHERE DcPlaceId = " + DcPlaceId;
            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateDcPlaceNameByDcPlaceId end", "ActionFollowUpApprovalDownloadDAO.UpdateDcPlaceNameByDcPlaceId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpApprovalDownloadDAO.UpdateDcPlaceNameByDcPlaceId", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateTemplateNodeNameByTemplateNodeId = function (TemplateNodeId, TemplateNodeName) {

        try {
            OneViewConsole.Debug("UpdateTemplateNodeNameByTemplateNodeId start", "ActionFollowUpApprovalDownloadDAO.UpdateTemplateNodeNameByTemplateNodeId");

            var Query = "UPDATE ActionDataCaptureInfoEntity SET TemplateNodeName = '" + TemplateNodeName + "', TimeStamp = '" + CurrentDateAndTime + "' WHERE TemplateNodeId = " + TemplateNodeId;
            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateTemplateNodeNameByTemplateNodeId end", "ActionFollowUpApprovalDownloadDAO.UpdateTemplateNodeNameByTemplateNodeId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpApprovalDownloadDAO.UpdateTemplateNodeNameByTemplateNodeId", Excep);
        }
        finally {
            Query = null;
        }
    }
}