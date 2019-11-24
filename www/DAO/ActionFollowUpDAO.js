
// ActionFollowUpDAO
function ActionFollowUpDAO() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetByAllDimensions = function (ServiceId, ActionProfileId, FollowUpUserId, ActionDetailsId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "ActionFollowUpDAO.GetByAllDimensions");

            var Query = "SELECT Id FROM ActionFollowUpInfoEntity WHERE ServiceId = " + ServiceId + " AND ActionProfileId = '" + ActionProfileId + "' AND FollowUpUserId = " + FollowUpUserId + " AND ActionDetailsId = " + ActionDetailsId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "ActionFollowUpDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.IsTemplateExist = function (ServiceId, UserId, TemplateId) {

        try {
            OneViewConsole.Debug("IsTemplateExist start", "ActionFollowUpDAO.IsTemplateExist");

            var Query = "SELECT COUNT(*) AS TemplateCount FROM ActionFollowUpInfoEntity INNER JOIN ActionDataCaptureInfoEntity ON ActionFollowUpInfoEntity.ActionDataCaptureInfoId = ActionDataCaptureInfoEntity.Id WHERE ActionFollowUpInfoEntity.ServiceId = " + ServiceId + " AND ActionFollowUpInfoEntity.FollowUpUserId = " + UserId + " AND ActionDataCaptureInfoEntity.TemplateNodeId = " + TemplateId +
                        " AND ActionFollowUpInfoEntity.IsForApproval != 'true' ";

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpDAO.IsTemplateExist");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpDAO.IsTemplateExist");

            var IsDownloaded = (Result[0].TemplateCount > 0) ? true : false;

            OneViewConsole.Debug("IsTemplateExist end", "ActionFollowUpDAO.IsTemplateExist");

            return IsDownloaded;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpDAO.IsTemplateExist", Excep);
        }
        finally {
            Query = null;
            Result = null;
            IsDownloaded = null;
        }
    }

    this.IsDcPlaceExist = function (ServiceId, UserId, DcPlaceId) {

        try {
            OneViewConsole.Debug("IsDcPlaceExist start", "ActionFollowUpDAO.IsDcPlaceExist");

            var Query = "SELECT COUNT(*) AS DcPlaceCount FROM ActionFollowUpInfoEntity INNER JOIN ActionDataCaptureInfoEntity ON ActionFollowUpInfoEntity.ActionDataCaptureInfoId = ActionDataCaptureInfoEntity.Id WHERE ActionFollowUpInfoEntity.ServiceId = " + ServiceId + " AND ActionFollowUpInfoEntity.FollowUpUserId = " + UserId + " AND ActionDataCaptureInfoEntity.DcPlaceId = " + DcPlaceId +
                        " AND ActionFollowUpInfoEntity.IsForApproval != 'true' ";

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpDAO.IsDcPlaceExist");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpDAO.IsDcPlaceExist");

            var IsDownloaded = (Result[0].DcPlaceCount > 0) ? true : false;

            OneViewConsole.Debug("IsDcPlaceExist end", "ActionFollowUpDAO.IsDcPlaceExist");

            return IsDownloaded;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpDAO.IsDcPlaceExist", Excep);
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
            OneViewConsole.Debug("GetAllAction start", "ActionFollowUpDAO.GetAllAction");

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
                        " AND ActionFollowUpInfoEntity.IsForApproval  != 'true'"+
                         "order by DcPlaceName ";



            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpDAO.GetAllAction");

            var ActionInfo = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionInfo), "ActionFollowUpDAO.GetAllAction");
            OneViewConsole.Debug("GetAllAction end", "ActionFollowUpDAO.GetAllAction");

            return ActionInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllDC", Excep);
        }
    }

    this.UpdateFollowUpUserNameByFollowUpUserId = function (FollowUpUserId, FollowUpUserName) {

        try {
            OneViewConsole.Debug("UpdateFollowUpUserNameByFollowUpUserId start", "ActionFollowUpDAO.UpdateFollowUpUserNameByFollowUpUserId");

            var ActionFollowUpInfoUpdateQuery = "UPDATE ActionFollowUpInfoEntity SET FollowUpUserName = '" + FollowUpUserName + "', TimeStamp = '" + CurrentDateAndTime + "' WHERE FollowUpUserId = " + FollowUpUserId;
            _OneViewSqlitePlugin.ExcecuteSql(ActionFollowUpInfoUpdateQuery);

            var ActionDataCaptureInfoUpdateQuery = "UPDATE ActionDataCaptureInfoEntity SET DcUserName = '" + FollowUpUserName + "', TimeStamp = '" + CurrentDateAndTime + "' WHERE DcUserId = " + FollowUpUserId;
            _OneViewSqlitePlugin.ExcecuteSql(ActionDataCaptureInfoUpdateQuery);

            OneViewConsole.Debug("UpdateFollowUpUserNameByFollowUpUserId end", "ActionFollowUpDAO.UpdateFollowUpUserNameByFollowUpUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpDAO.UpdateFollowUpUserNameByFollowUpUserId", Excep);
        }
        finally {
            ActionFollowUpInfoUpdateQuery = null;
            ActionDataCaptureInfoUpdateQuery = null;
        }
    }

    this.UpdateDcPlaceNameByDcPlaceId = function (DcPlaceId, DcPlaceName) {

        try {
            OneViewConsole.Debug("UpdateDcPlaceNameByDcPlaceId start", "ActionFollowUpDAO.UpdateDcPlaceNameByDcPlaceId");

            var Query = "UPDATE ActionDataCaptureInfoEntity SET DcPlaceName = '" + DcPlaceName + "', TimeStamp = '" + CurrentDateAndTime + "' WHERE DcPlaceId = " + DcPlaceId;
            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateDcPlaceNameByDcPlaceId end", "ActionFollowUpDAO.UpdateDcPlaceNameByDcPlaceId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpDAO.UpdateDcPlaceNameByDcPlaceId", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateTemplateNodeNameByTemplateNodeId = function (TemplateNodeId, TemplateNodeName) {

        try {
            OneViewConsole.Debug("UpdateTemplateNodeNameByTemplateNodeId start", "ActionFollowUpDAO.UpdateTemplateNodeNameByTemplateNodeId");

            var Query = "UPDATE ActionDataCaptureInfoEntity SET TemplateNodeName = '" + TemplateNodeName + "', TimeStamp = '" + CurrentDateAndTime + "' WHERE TemplateNodeId = " + TemplateNodeId;
            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateTemplateNodeNameByTemplateNodeId end", "ActionFollowUpDAO.UpdateTemplateNodeNameByTemplateNodeId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpDAO.UpdateTemplateNodeNameByTemplateNodeId", Excep);
        }
        finally {
            Query = null;
        }
    }

    /// <summary>
    /// Get all Action   
    /// </summary>
    /// <param name="FilterParam">Request param</param>
    //Need to action id and time for filteration
    /// <returns>DcInfo</returns>  
    this.GetAllActionFollowUpByFollowUpUsers = function (FilterParam) {

        try {
            OneViewConsole.Debug("GetAllAction start", "ActionFollowUpDAO.GetAllAction");
           
            var Query = "Select ActionFollowUpInfoEntity.*,ActionDataCaptureInfoEntity.* " +
                        "from  ActionFollowUpInfoEntity " +
                        "INNER JOIN ActionDataCaptureInfoEntity ON ActionFollowUpInfoEntity.ActionDataCaptureInfoId = ActionDataCaptureInfoEntity.Id " +
                         " INNER JOIN ActionResolveEntity AR ON AR.FollowUpUserId = ActionFollowUpInfoEntity.FollowUpUserId AND AR.ActionDetailsId = ActionFollowUpInfoEntity.ActionDetailsId " +
                         " AND AR.ActionStatus = '1' " +
                        "where (ActionFollowUpInfoEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                        " AND (ActionFollowUpInfoEntity.FollowUpUserId IN " + FilterParam.FollowUpUserId + ")" +
                        " AND (ActionDataCaptureInfoEntity.TemplateNodeId  = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                        " AND (ActionDataCaptureInfoEntity.DcPlaceId  = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")" +
                        " AND (ActionFollowUpInfoEntity.PredefinedActionId  = " + FilterParam.PredefinedActionId + " OR -1=" + FilterParam.PredefinedActionId + ")" +
                         " AND ActionFollowUpInfoEntity.IsForApproval != 'false' order by DcPlaceName ";

            // AND AR.IsOnDeviceApprovalFinished != 'true' 

           // alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpDAO.GetAllAction");

            var ActionInfo = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            //alert('ActionInfo : ' + JSON.stringify(ActionInfo));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionInfo), "ActionFollowUpDAO.GetAllAction");
            OneViewConsole.Debug("GetAllAction end", "ActionFollowUpDAO.GetAllAction");

            return ActionInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllDC", Excep);
        }
    }
}

function ActionFollowUpDetailsDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// Get all Action   
    /// </summary>
    /// <param name="FilterParam">Request param</param>
    //Need to action id and time for filteration
    /// <returns>DcInfo</returns>  
    this.GetActionFollowUpDetails = function (ActionDetailsId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetAllAction start", "ActionFollowUpDAO.GetAllAction");

            var Query = "Select ActionFollowUpInfoEntity.FollowUpUserName as FollowUpUserName,ActionFollowUpInfoEntity.ActionId as ActionId,ActionFollowUpInfoEntity.FollowUpUserId as FollowUpUserId,ActionFollowUpInfoEntity.ServiceId as ServiceId, " +
                        "ActionFollowUpInfoEntity.PredefinedActionName as PredefinedActionName, ActionFollowUpInfoEntity.CustomAction as CustomAction,ActionFollowUpInfoEntity.ActionComments as ActionComments," +
                        "ActionFollowUpInfoEntity.ActionRaisedDate as ActionRaisedDate, ActionFollowUpInfoEntity.RectificationTime as RectificationTime,ActionFollowUpInfoEntity.ActionRaisedUserName as ActionRaisedUserName," +
                        "ActionFollowUpInfoEntity.ActionNCRuleInfo as ActionNCRuleInfo,ActionFollowUpInfoEntity.ActionAttributeInfo as ActionAttributeInfo, " +
                        //ActionFollowUpInfoEntity.ActionMultimediaSubElementsInfo as ActionMultimediaSubElementsInfo," +
                        "ActionFollowUpInfoEntity.AttributeNames as AttributeNames,ActionFollowUpInfoEntity.ActionMultimediaClientGuids as ActionMultimediaClientGuids, ActionFollowUpInfoEntity.ActionDetailsMultimediaClientGuids as ActionDetailsMultimediaClientGuids," +
                        "ActionDataCaptureInfoEntity.DcPlaceName as DcPlaceName,ActionDataCaptureInfoEntity.TemplateNodeName as TemplateNodeName,ActionFollowUpInfoEntity.ActionDetailsId as ActionDetailsId, " +
                        "ActionDataCaptureInfoEntity.DcPlaceMaterializedPath as DcPlaceMaterializedPath,ActionDataCaptureInfoEntity.DcPlaceNameHierarchy as DcPlaceNameHierarchy " +

                        //"ActionResolveEntity.Comments as ActionResolveComments,ActionResolveEntity.ActionStatus as ActionStatus,ActionResolveEntity.Id as  ActionResolveClientId,ActionResolveEntity.IsAllActions as  IsAllActions " +
                        "from  ActionFollowUpInfoEntity " +
                        "INNER JOIN ActionDataCaptureInfoEntity ON ActionFollowUpInfoEntity.ActionDataCaptureInfoId = ActionDataCaptureInfoEntity.Id " +
                        //"INNER JOIN ActionResolveEntity ON ActionFollowUpInfoEntity.ActionDetailsId = ActionResolveEntity.ActionDetailsId " +
                        "where ActionFollowUpInfoEntity.ActionDetailsId  = " + ActionDetailsId +
                        " AND ActionFollowUpInfoEntity.FollowUpUserId = " + FollowUpUserId;
       

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpDAO.GetAllAction");

            var ActionInfo = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionInfo), "ActionFollowUpDAO.GetAllAction");
            OneViewConsole.Debug("GetAllAction end", "ActionFollowUpDAO.GetAllAction");

            return ActionInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllDC", Excep);
        }
    }


     /// <summary>
    /// Get all Action   
    /// </summary>
    /// <param name="FilterParam">Request param</param>
    //Need to action id and time for filteration
    /// <returns>DcInfo</returns>  
    this.GetActionFollowUpDetailsByActionDetailsId = function (ActionDetailsId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetAllAction start", "ActionFollowUpDAO.GetAllAction");

            var Query = "Select ActionFollowUpInfoEntity.FollowUpUserName as FollowUpUserName,ActionFollowUpInfoEntity.ActionId as ActionId,ActionFollowUpInfoEntity.FollowUpUserId as FollowUpUserId,ActionFollowUpInfoEntity.ServiceId as ServiceId, " +
                        "ActionFollowUpInfoEntity.PredefinedActionName as PredefinedActionName, ActionFollowUpInfoEntity.CustomAction as CustomAction,ActionFollowUpInfoEntity.ActionComments as ActionComments," +
                        "ActionFollowUpInfoEntity.ActionRaisedDate as ActionRaisedDate, ActionFollowUpInfoEntity.RectificationTime as RectificationTime,ActionFollowUpInfoEntity.ActionRaisedUserName as ActionRaisedUserName," +
                        "ActionFollowUpInfoEntity.ActionNCRuleInfo as ActionNCRuleInfo,ActionFollowUpInfoEntity.ActionAttributeInfo as ActionAttributeInfo, " +
                        //ActionFollowUpInfoEntity.ActionMultimediaSubElementsInfo as ActionMultimediaSubElementsInfo," +
                        "ActionFollowUpInfoEntity.AttributeNames as AttributeNames,ActionFollowUpInfoEntity.ActionMultimediaClientGuids as ActionMultimediaClientGuids, ActionFollowUpInfoEntity.ActionDetailsMultimediaClientGuids as ActionDetailsMultimediaClientGuids," +
                        "ActionDataCaptureInfoEntity.DcPlaceName as DcPlaceName,ActionDataCaptureInfoEntity.TemplateNodeName as TemplateNodeName,ActionFollowUpInfoEntity.ActionDetailsId as ActionDetailsId, " +
                        "ActionDataCaptureInfoEntity.DcPlaceMaterializedPath as DcPlaceMaterializedPath,ActionDataCaptureInfoEntity.DcPlaceNameHierarchy as DcPlaceNameHierarchy,ActionDataCaptureInfoEntity.FollowUpUserInfo as FollowUpUserInfo  " +

                        //"ActionResolveEntity.Comments as ActionResolveComments,ActionResolveEntity.ActionStatus as ActionStatus,ActionResolveEntity.Id as  ActionResolveClientId,ActionResolveEntity.IsAllActions as  IsAllActions " +
                        "from  ActionFollowUpInfoEntity " +
                        "INNER JOIN ActionDataCaptureInfoEntity ON ActionFollowUpInfoEntity.ActionDataCaptureInfoId = ActionDataCaptureInfoEntity.Id " +
                        //"INNER JOIN ActionResolveEntity ON ActionFollowUpInfoEntity.ActionDetailsId = ActionResolveEntity.ActionDetailsId " +
                        "where ActionFollowUpInfoEntity.ActionDetailsId  = " + ActionDetailsId ;
                        //" AND ActionFollowUpInfoEntity.FollowUpUserId = " + FollowUpUserId;
       

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpDAO.GetAllAction");

            var ActionInfo = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionInfo), "ActionFollowUpDAO.GetAllAction");
            OneViewConsole.Debug("GetAllAction end", "ActionFollowUpDAO.GetAllAction");

            return ActionInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllDC", Excep);
        }
    }

    this.LoadActionMultiMediaSubElements = function (ClientGuidList) {
        try {
            OneViewConsole.Debug("LoadActionMultiMediaSubElements start", "ActionFollowUpDAO.LoadActionMultiMediaSubElements");

            var Exp = FomatForInCondition(ClientGuidList);
            var Query = "Select * from MultiMediaSubElements where ClientGuid in " + Exp;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpDAO.GetAllAction");

            var MultiMediaSubElementsResult = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(MultiMediaSubElementsResult), "ActionFollowUpDAO.LoadActionMultiMediaSubElements");
            OneViewConsole.Debug("LoadActionMultiMediaSubElements end", "ActionFollowUpDAO.LoadActionMultiMediaSubElements");

            return MultiMediaSubElementsResult;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowUpDAO.LoadActionMultiMediaSubElements", Excep);
        }
    }

    var FomatForInCondition = function (Info) {
        try {
            OneViewConsole.Debug("FomatForInCondition start", "ActionFollowUpDAO.FomatForInCondition");
            OneViewConsole.DataLog("Request Info : " + JSON.stringify(Info), "ActionFollowUpDAO.FomatForInCondition");

            var Incondition = "(";

            for (var i = 0; i < Info.length; i++) {
                Incondition += "'" + Info[i] + "'";
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "ActionFollowUpDAO.FomatForInCondition");
            OneViewConsole.Debug("FomatForInCondition end", "ActionFollowUpDAO.FomatForInCondition");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("ActionFollowUpDAO", "ActionFollowUpDAO.FomatForInCondition", Excep);
        }
        finally {
            Incondition = null;
        }
    }


    this.GetDcAndTemplateIdFromActionFollowUp = function (ActionDetailsId) {

        try {
            OneViewConsole.Debug("GetDcandTemplateIdFromActionFollowUp start", "ActionFollowUpDAO.GetDcandTemplateIdFromActionFollowUp");

            var Query = "Select ActionDataCaptureInfoEntity.TemplateNodeId, ActionDataCaptureInfoEntity.DataCaptureServerId " +
                        "from  ActionFollowUpInfoEntity " +
                        "INNER JOIN ActionDataCaptureInfoEntity ON ActionFollowUpInfoEntity.ActionDataCaptureInfoId = ActionDataCaptureInfoEntity.Id " +
                        "where ActionFollowUpInfoEntity.ActionDetailsId  = " + ActionDetailsId;


            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpDAO.GetDcandTemplateIdFromActionFollowUp");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpDAO.GetDcandTemplateIdFromActionFollowUp");
            OneViewConsole.Debug("GetDcandTemplateIdFromActionFollowUp end", "ActionFollowUpDAO.GetDcandTemplateIdFromActionFollowUp");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetDcandTemplateIdFromActionFollowUp", Excep);
        }
    }
}