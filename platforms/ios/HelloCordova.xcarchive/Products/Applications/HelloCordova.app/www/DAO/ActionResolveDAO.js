
// ActionResolveDAO
function ActionResolveDAO() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.Create = function (oActionResolveEntity) {

        try {
            OneViewConsole.Debug("Create start", "ActionResolveDAO.Create");

            var oActionResolveEntity = new DefaultMasterDAO("ActionResolveEntity").CreateMaster(oActionResolveEntity);

            OneViewConsole.Debug("Create end", "ActionResolveDAO.Create");

            return oActionResolveEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionResolveDAO.Create", Excep);
        }
        finally {         
            oActionResolveEntity = null;
        }
    }

    this.UpdateByActionDetailsId = function (ActionDetailsId, Comments, ActionStatus) {

        try {
            OneViewConsole.Debug("UpdateByActionDetailsId start", "ActionResolveDAO.UpdateByActionDetailsId");

            var ActionResolveDate = (ActionStatus === 1) ? CurrentDateAndTime : "";
            var Query = "UPDATE ActionResolveEntity SET Comments = '" + Comments + "',ActionStatus = '" + ActionStatus + "',IsSynchronized = 'false',ActionResolveDate = '" + ActionResolveDate + "',TimeStamp = '" + CurrentDateAndTime + "' WHERE ActionDetailsId = " + ActionDetailsId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionResolveDAO.UpdateByActionDetailsId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateByActionDetailsId end", "ActionResolveDAO.UpdateByActionDetailsId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionResolveDAO.UpdateByActionDetailsId", Excep);
        }
        finally {
            Query = null;          
        }
    }

    this.GetByActionDetailsId = function (ActionDetailsId) {

        try {
            OneViewConsole.Debug("GetByActionDetailsId start", "ActionResolveDAO.GetByActionDetailsId");

            var Query = "SELECT * from ActionFollowUpInfoEntity  WHERE ActionDetailsId = " + ActionDetailsId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionResolveDAO.GetByActionDetailsId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionResolveDAO.GetByActionDetailsId");

            OneViewConsole.Debug("GetByActionDetailsId end", "ActionResolveDAO.GetByActionDetailsId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionResolveDAO.GetByActionDetailsId", Excep);
        }
        finally {
            Query = null;
            Result = null;          
        }
    }

    this.GetActionResolveId = function (ActionDetailsId) {

        try {
            OneViewConsole.Debug("GetByActionDetailsId start", "ActionResolveDAO.GetByActionDetailsId");

            var Query = "SELECT * from ActionResolveEntity  WHERE ActionDetailsId = " + ActionDetailsId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionResolveDAO.GetByActionDetailsId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionResolveDAO.GetByActionDetailsId");

            OneViewConsole.Debug("GetByActionDetailsId end", "ActionResolveDAO.GetByActionDetailsId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionResolveDAO.GetByActionDetailsId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetResolvedActionsCount = function (ActionDetailsId) {

        try {
            OneViewConsole.Debug("GetAllTemplates start", "MyActionDAO.GetAllResolvedActionsCount");

            var Query = "SELECT Count(*) AS TotalCount FROM ActionResolveEntity  WHERE ActionDetailsId = " + ActionDetailsId + " And ActionStatus=1";
                       
                       

            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetAllTemplates");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MyActionDAO.GetAllResolvedActionsCount");
            OneViewConsole.Debug("GetAllTemplates end", "MyActionDAO.GetAllResolvedActionsCount");

            return Result[0].TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionResolveDAO.GetAllResolvedActionsCount", Excep);
        }
    }

    this.DisableByActionDetailsId = function (ActionDetailsId, Comments, ActionStatus) {

        try {
            OneViewConsole.Debug("DisableByActionDetailsId start", "ActionResolveDAO.DisableByActionDetailsId");

            var ActionResolveDate = (ActionStatus === 1) ? CurrentDateAndTime : "";
            var Query = "UPDATE ActionResolveEntity SET Comments = '" + Comments + "',ActionStatus = '" + ActionStatus + "',IsSynchronized = 'false',ActionResolveDate = '" + ActionResolveDate + "',TimeStamp = '" + CurrentDateAndTime + "'"+
                        ", IsDisable = 'true' WHERE ActionDetailsId = " + ActionDetailsId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionResolveDAO.DisableByActionDetailsId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DisableByActionDetailsId end", "ActionResolveDAO.DisableByActionDetailsId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionResolveDAO.DisableByActionDetailsId", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.DeleteActionDetailsId = function (ActionDetailsId, Comments, ActionStatus) {

        try {
            OneViewConsole.Debug("DeleteActionDetailsId start", "ActionResolveDAO.DeleteActionDetailsId");

            var Query = "DELETE FROM ActionResolveEntity WHERE ActionDetailsId = " + ActionDetailsId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionResolveDAO.DeleteActionDetailsId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteActionDetailsId end", "ActionResolveDAO.DeleteActionDetailsId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionResolveDAO.DeleteActionDetailsId", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetApprovedActionsCount = function (ActionDetailsId) {

        try {
            OneViewConsole.Debug("GetApprovedActionsCount start", "MyActionDAO.GetApprovedActionsCount");

            var Query = "SELECT Count(*) AS TotalCount FROM ActionResolveEntity WHERE ActionDetailsId = " + ActionDetailsId + " And IsOnDeviceApprovalFinished='true'";
            //alert(' Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetApprovedActionsCount");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MyActionDAO.GetApprovedActionsCount");
            OneViewConsole.Debug("GetApprovedActionsCount end", "MyActionDAO.GetApprovedActionsCount");

            var TotalCount = 0;
            if (Result != null && Result.length > 0) {
                TotalCount = Result[0].TotalCount;
            }
            return TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionResolveDAO.GetApprovedActionsCount", Excep);
        }
    }

    this.GetUnSyncApprovedActionResolveCount = function (ServiceId, DcPlaceId, TemplateNodeId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetUnSyncActionResolveCount start", "MyActionDAO.GetUnSyncActionResolveCount");

            var Query = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity AS AFI" +
                        " INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " INNER JOIN ActionResolveEntity AS AR ON AR.ActionDetailsId = AFI.ActionDetailsId" +
                        " WHERE (AFI.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                        " AND (ADI.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                        " AND (ADI.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                        " AND (AFI.FollowUpUserId = " + FollowUpUserId + " OR -1=" + FollowUpUserId + ")" +
                        " AND AR.IsSubmited = 'true' AND AR.IsSynchronized = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetUnSyncActionResolveCount");

            var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MyActionDAO.GetUnSyncActionResolveCount");
            OneViewConsole.Debug("GetUnSyncActionResolveCount end", "MyActionDAO.GetUnSyncActionResolveCount");

            return Result[0].TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.GetUnSyncActionResolveCount", Excep);
        }
    }

    this.GetByFollowUpUserAndActionDetailsId = function (FollowUpUserId, ActionDetailsId) {

        try {
            OneViewConsole.Debug("GetByFollowUpUserAndActionDetailsId start", "ActionResolveDAO.GetByFollowUpUserAndActionDetailsId");

            var Query = "SELECT * from ActionFollowUpInfoEntity WHERE FollowUpUserId = " + FollowUpUserId + " AND ActionDetailsId = " + ActionDetailsId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionResolveDAO.GetByFollowUpUserAndActionDetailsId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionResolveDAO.GetByFollowUpUserAndActionDetailsId");

            OneViewConsole.Debug("GetByFollowUpUserAndActionDetailsId end", "ActionResolveDAO.GetByFollowUpUserAndActionDetailsId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionResolveDAO.GetByFollowUpUserAndActionDetailsId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.DeleteByFollowUpUserAndActionDetailsId = function (FollowUpUserId, ActionDetailsId) {

        try {
            OneViewConsole.Debug("DeleteByFollowUpUserAndActionDetailsId start", "ActionResolveDAO.DeleteByFollowUpUserAndActionDetailsId");

            var Query = "DELETE FROM ActionResolveEntity WHERE FollowUpUserId = " + FollowUpUserId + " AND ActionDetailsId = " + ActionDetailsId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionResolveDAO.DeleteByFollowUpUserAndActionDetailsId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByFollowUpUserAndActionDetailsId end", "ActionResolveDAO.DeleteByFollowUpUserAndActionDetailsId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionResolveDAO.DeleteByFollowUpUserAndActionDetailsId", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetByServerId = function (ServerId) {

        try {
            OneViewConsole.Debug("GetByServerId start", "ActionResolveDAO.GetByServerId");

            var Query = "SELECT * from ActionResolveEntity WHERE ServerId = " + ServerId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionResolveDAO.GetByServerId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionResolveDAO.GetByServerId");

            OneViewConsole.Debug("GetByServerId end", "ActionResolveDAO.GetByServerId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionResolveDAO.GetByServerId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

}


function ActionFollowUpApprovalProfileDAO(){

    var MyInstance = this;

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetByAllDimensions = function (Req) {
        try {

            OneViewConsole.Debug("GetByAllDimensions start", "ActionFollowUpApprovalProfileDAO.GetByAllDimensions");

            var oDateTime = new DateTime();
            CurrentDateAndTime = oDateTime.GetDateAndTime();
            CurrentDateAndTime = oDateTime.ConvertDateTimeToInteger(CurrentDateAndTime);           
           // alert(Req.PlaceId);
            var Query = "SELECT ActionFollowUpApprovalProfileEntity.*," +
                         "(SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 7, 4) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 4, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 1, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 12, 2) || " +
                         " SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 15, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 18, 2) ) AS VSD ,(SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 7, 4) ||SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 4, 2) ||" +
                         " SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 1, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 12, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 15, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 18, 2) ) AS VED" +
                         " FROM ActionFollowUpApprovalProfileEntity" +
                         " WHERE ServiceId =" + Req.ServiceId + " AND UserId = " + Req.UserId +
                         " AND (FollowUpUserId = " + Req.ActionFollowUpUserId + " OR -1 = " + Req.ActionFollowUpUserId + ")" +
                         " AND (TemplateNodeId = " + Req.TemplateNodeId + " OR -1 = " + Req.TemplateNodeId + ")" +
                         " AND (PlaceId = " + Req.PlaceId + " OR -1 = " + Req.PlaceId + ")" +
                         " AND ( VSD <= '" + CurrentDateAndTime + "' or  '' = VSD ) AND ('" + CurrentDateAndTime + "'  <=  VED or  '' = VED )" +
                         " Order by TemplateNodeId  desc, PlaceId  desc LIMIT 1";
     


            //alert("GetByAllDimensions" + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowUpApprovalProfileDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
           // alert('Result : ' + JSON.stringify(Result));
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpApprovalProfileDAO.GetByAllDimensions");
          
            OneViewConsole.Debug("ActionFollowUpApprovalProfileDAO end", "ActionFollowUpApprovalProfileDAO.ActionFollowUpApprovalProfileDAO");

            return Result;

        }
        catch (Excep) {
           // alert('Excep : ' + Excep);
            throw oOneViewExceptionHandler.Create("MasterDAO", "ActionFollowUpApprovalProfileDAO.ActionFollowUpApprovalProfileDAO", Excep);
        }
      
    }


    this.GetProfilesByAllDimensions = function (Req) {
        try {

            OneViewConsole.Debug("GetProfilesByAllDimensions start", "ActionFollowUpApprovalProfileDAO.GetProfilesByAllDimensions");

            var oDateTime = new DateTime();
            CurrentDateAndTime = oDateTime.GetDateAndTime();
            CurrentDateAndTime = oDateTime.ConvertDateTimeToInteger(CurrentDateAndTime);
            // alert(Req.PlaceId);
            var Query = "SELECT ActionFollowUpApprovalProfileEntity.*," +
                         "(SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 7, 4) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 4, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 1, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 12, 2) || " +
                         " SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 15, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityStartDate, 18, 2) ) AS VSD ,(SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 7, 4) ||SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 4, 2) ||" +
                         " SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 1, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 12, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 15, 2) || SUBSTR(ActionFollowUpApprovalProfileEntity.ValidityEndDate, 18, 2) ) AS VED" +
                         " FROM ActionFollowUpApprovalProfileEntity" +
                         " WHERE ServiceId =" + Req.ServiceId + " AND UserId = " + Req.UserId +
                         " AND (TemplateNodeId = " + Req.TemplateNodeId + " OR -1 = " + Req.TemplateNodeId + ")" +
                         " AND (PlaceId = " + Req.PlaceId + " OR -1 = " + Req.PlaceId + ")" +
                         " AND ( VSD <= '" + CurrentDateAndTime + "' or  '' = VSD ) AND ('" + CurrentDateAndTime + "'  <=  VED or  '' = VED )" +
                         " Order by TemplateNodeId  desc, PlaceId  desc ";



            //alert("GetProfilesByAllDimensions" + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetProfilesByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            //alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpApprovalProfileDAO.GetProfilesByAllDimensions");
           
            OneViewConsole.Debug("ActionFollowUpApprovalProfileDAO end", "ActionFollowUpApprovalProfileDAO.GetProfilesByAllDimensions");

            return Result;

        }
        catch (Excep) {
            // alert('Excep : ' + Excep);
            throw oOneViewExceptionHandler.Create("MasterDAO", "ActionFollowUpApprovalProfileDAO.GetProfilesByAllDimensions", Excep);
        }

    }


    this.GetFollowUpUserByActionDetailsId = function ( Req) {

        try {
            OneViewConsole.Debug("GetFollowUpUserByActionDetailsId start", "ActionResolveDAO.GetFollowUpUserByActionDetailsId");

            var Query = "SELECT * from ActionFollowUpInfoEntity WHERE ActionDetailsId = " + Req.ActionDetailsId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionResolveDAO.GetFollowUpUserByActionDetailsId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionResolveDAO.GetFollowUpUserByActionDetailsId");

            OneViewConsole.Debug("GetFollowUpUserByActionDetailsId end", "ActionResolveDAO.GetFollowUpUserByActionDetailsId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionResolveDAO.GetFollowUpUserByActionDetailsId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    
    
}

function ActionFollowUpApprovalLevelInfoDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetByAllDimensions = function (ActionFollowUpApprovalProfileId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "ActionFollowUpApprovalLevelInfoDAO.GetByAllDimensions");

            var Query = "Select * From ActionFollowUpApprovalLevelInfoEntity WHERE ActionFollowUpApprovalProfileId = " + ActionFollowUpApprovalProfileId + " And IsOnDeviceApproval='true'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
  
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpApprovalLevelInfoDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "ActionFollowUpApprovalLevelInfoDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpApprovalLevelInfoDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
        }
    }

}


function ActionFollowUpApprovalUserDetailsDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    // Get CurrenntDateAndTime from OneViewDateTime framework
    var oDateTime = new DateTime();
    var CurrenntDateAndTime = oDateTime.GetDateAndTime();

    this.GetByAllDimensions = function (ActionFollowUpApprovalProfileId) {

        try {
            OneViewConsole.Debug("ActionFollowUpApprovalUserDetailsDAO start", "ActionFollowUpApprovalUserDetailsDAO.GetByAllDimensions");

            var Query = "Select * From ActionFollowUpApprovalUserDetailsEntity WHERE ActionFollowUpApprovalProfileId = " + ActionFollowUpApprovalProfileId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpApprovalUserDetailsDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "ActionFollowUpApprovalUserDetailsDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionFollowUpApprovalUserDetailsDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
        }
    }

}


function ActionFollowUpApprovalDAO(){

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
    var _oSqliteQG = new SqliteQG();

    this.UpdateActionResolveSubmit = function (Req) {

        try {
            OneViewConsole.Debug("UpdateActionResolveSubmit start", "DcApprovalDAO.UpdateActionResolveSubmit");

            var Query = "Update ActionResolveEntity Set IsSubmited='" + Req.IsSubmit + "',SubmitedDate='" + Req.SubmitDate + "',IsSynchronized='" + Req.IsSynchronized + "',TimeStamp='" + Req.TimeStamp + "' Where ClientGuid='" + Req.ClientGuid + "'";
         
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.UpdateActionResolveSubmit");
            //alert(Query);
            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateActionResolveSubmit end", "DcApprovalDAO.UpdateActionResolveSubmit");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.UpdateActionResolveSubmit", Excep);
        }
        finally {

            Query1 = null;

        }
    }


    this.UpdateActionResolveForApprove = function (Req) {

        try {
            OneViewConsole.Debug("UpdateActionResolveForApprove start", "DcApprovalDAO.UpdateActionResolveForApprove");

            
            var Query = "Update ActionResolveEntity Set ApprovalStatus='" + Req.ApprovalStatus + "',ApprovalStatusDate='" + Req.ApprovalStatusDate + "',IsSynchronized='" + Req.IsSynchronized + "',IsOnDeviceApprovalFinished='" + Req.IsOnDeviceApprovalFinished + "',TimeStamp='" + Req.TimeStamp + "' Where ClientGuid='" + Req.ClientGuid + "'";
         
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.UpdateActionResolveSubmit");
            //alert(Query);
            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateActionResolveForApprove end", "DcApprovalDAO.UpdateActionResolveForApprove");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.UpdateActionResolveForApprove", Excep);
        }
        finally {

            Query1 = null;

        }
    }

    this.GetActionResolveApprovalByActionResolveClientGuid = function (Req) {
        try {

            OneViewConsole.Debug("GetActionResolveApprovalByActionResolveClientGuid start", "ActionFollowUpApprovalProfileDAO.GetActionResolveApprovalByActionResolveClientGuid");

            var Query = "SELECT *" +
                         " FROM ActionResolveApprovalEntity" +
                         " WHERE ActionResolveClientGuid ='" + Req.ActionResolveClientGuid + "' ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalProfileDAO.GetActionResolveApprovalByActionResolveClientGuid");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            //alert('Result : ' + JSON.stringify(Result));
            // Result = JSON.parse(Result);
           //  alert('kkk 11');
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowUpApprovalProfileDAO.GetActionResolveApprovalByActionResolveClientGuid");
          //  alert("Result : " + JSON.stringify(Result));

            OneViewConsole.Debug("GetActionResolveApprovalByActionResolveClientGuid end", "DcApprovalProfileDAO.GetActionResolveApprovalByActionResolveClientGuid");

            return Result;

        }
        catch (Excep) {
           // alert('Excep : ' + Excep);
            throw oOneViewExceptionHandler.Create("MasterDAO", "DcApprovalProfileDAO.GetActionResolveApprovalByActionResolveClientGuid", Excep);
        }
      
    }


    this.UpdateActionResolveApprovalById = function (Req) {

        try {
            OneViewConsole.Debug("UpdateActionResolveApprovalById start", "DcApprovalDAO.UpdateActionResolveApprovalById");

            
            var Query = "Update ActionResolveApprovalEntity Set Comments='" + Req.Comments + "',ApprovalStatusDate='" + Req.ApprovalStatusDate + "',IsSynchronized='" + Req.IsSynchronized + "'  Where Id='" + Req.Id + "'";
         
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.UpdateActionResolveSubmit");
            //alert(Query);
            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateActionResolveApprovalById end", "DcApprovalDAO.UpdateActionResolveApprovalById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.UpdateActionResolveApprovalById", Excep);
        }
        finally {

            Query1 = null;

        }
    }


    this.DeleteActionResolveApprovalById = function (Req) {

        try {
            OneViewConsole.Debug("DeleteActionResolveApprovalById start", "DcApprovalDAO.DeleteActionResolveApprovalById");

            
            var Query = "Delete from ActionResolveApprovalEntity Where Id='" + Req.Id + "'";
         
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.UpdateActionResolveSubmit");
            //alert(Query);
            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteActionResolveApprovalById end", "DcApprovalDAO.DeleteActionResolveApprovalById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.DeleteActionResolveApprovalById", Excep);
        }
        finally {

            Query1 = null;

        }
    }

    this.UpdateApprovalStatusInActionResolveByClientGuid = function (Req) {

        try {
            OneViewConsole.Debug("UpdateApprovalStatusInActionResolveByClientGuid start", "DcApprovalDAO.UpdateApprovalStatusInActionResolveByClientGuid");

            
            var Query = "Update ActionResolveEntity Set IsSubmited='" + Req.IsSubmit + "',SubmitedDate='" + Req.SubmitedDate + "',ApprovalStatus='" + Req.ApprovalStatus + "',ApprovalStatusDate='" + Req.ApprovalStatusDate + "',IsSynchronized='" + Req.IsSynchronized + "',IsOnDeviceApprovalFinished='" + Req.IsOnDeviceApprovalFinished + "',TimeStamp='" + Req.TimeStamp + "' Where ClientGuid='" + Req.ResolveClientGuid + "'";
         
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.UpdateActionResolveSubmit");
            //alert(Query);
            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateApprovalStatusInActionResolveByClientGuid end", "DcApprovalDAO.UpdateApprovalStatusInActionResolveByClientGuid");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.UpdateApprovalStatusInActionResolveByClientGuid", Excep);
        }
        finally {

            Query1 = null;

        }
    }

}