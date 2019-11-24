
function DCBlockerInfoDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var oDateTime = new DateTime();
    var CurrentDateAndTime = oDateTime.GetDateAndTime();

    this.GetAllDCBlockerInfoForUpload = function (DcInfo) {

        try {
            OneViewConsole.Debug("GetAllDCBlockerInfoForUpload Start ", "DCBlockerInfoDAO.GetAllDCBlockerInfoForUpload");
            OneViewConsole.DataLog("Request DcInfo : " + JSON.stringify(DcInfo), "DCBlockerInfoDAO.GetAllDCBlockerInfoForUpload");

            var DCBlockerInfoResponse = {
                "DCBlockerInfoDTOLst": new Array(),
                "DCBlockerDCDTOLst": new Array()
            }

            var DcInfoExp = FomatForInConditionByClientGuid(DcInfo);
            var Query = "Select Distinct DCBlockerDataCaptureClientGuid from DCBlockerInfoEntity Where IsSynchronized = 'false' And DCBlockerDataCaptureClientGuid != '' And DataCaptureClientGuid IN " + DcInfoExp;
            var DCBlockerInfo = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            _OneViewSqlitePlugin.ExcecuteSql("Update DCBlockerInfoEntity Set ProcessCount = ProcessCount+1 Where DataCaptureClientGuid In " + DcInfoExp);

            if (DCBlockerInfo.length > 0) {

                var DCBlockerInfoEntityQuery = "Select * from DCBlockerInfoEntity Where IsSynchronized = 'false' And DataCaptureClientGuid IN " + DcInfoExp;
                var DCBlockerInfoEntityLst = _OneViewSqlitePlugin.ExcecuteSqlReader(DCBlockerInfoEntityQuery);
                DCBlockerInfoResponse.DCBlockerInfoDTOLst = DCBlockerInfoEntityLst;

                var DCBlockerInfoDCList = null;

                var _oDcDAO = new DcDAO();
                var DcInfo = new Array();
              
                var DcExp = FomatForInConditionByDCBlockerDataCaptureClientGuid(DCBlockerInfo);
                var DcQuery = "Select DISTINCT Id from DataCaptureEntity Where IsSynchronized = 'false' And ClientGuid IN " + DcExp;
                DcInfo = _OneViewSqlitePlugin.ExcecuteSqlReader(DcQuery);

                if (DcInfo.length > 0) {
                    _oDcDAO.UpdateDcProcessCountByDcInfo(DcInfo);
                    DCBlockerInfoDCList = _oDcDAO.GetDcList(DcInfo);
                    DCBlockerInfoResponse.DCBlockerDCDTOLst = DCBlockerInfoDCList;
                }
            }

            return DCBlockerInfoResponse;

            OneViewConsole.Debug("GetAllDCBlockerInfoForUpload end ", "DCBlockerInfoDAO.GetAllDCBlockerInfoForUpload");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DCBlockerInfoDAO.GetAllDCBlockerInfoForUpload", Excep);
        }
        finally {           
        }
    }

    var FomatForInConditionByClientGuid = function (DcInfo) {
        try {
            OneViewConsole.Debug("FomatForInConditionByClientGuid Start ", "DCBlockerInfoDAO.FomatForInConditionByClientGuid");

            var Incondition = "(";
            for (var i = 0; i < DcInfo.length; i++) {
                Incondition += "'" + DcInfo[i].ClientGuid + "'";
                Incondition += (i <= DcInfo.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForInConditionByClientGuid Incondition : " + Incondition, "DCBlockerInfoDAO.FomatForInConditionByClientGuid");

            OneViewConsole.Debug("FomatForInConditionByClientGuid end ", "DCBlockerInfoDAO.FomatForInConditionByClientGuid");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DCBlockerInfoDAO.FomatForInConditionByClientGuid", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    var FomatForInConditionByDCBlockerDataCaptureClientGuid = function (DCBlockerInfoDCList) {
        try {
            OneViewConsole.Debug("FomatForInConditionByDCBlockerDataCaptureClientGuid Start ", "DCBlockerInfoDAO.FomatForInConditionByDCBlockerDataCaptureClientGuid");

            var Incondition = "(";
            for (var i = 0; i < DCBlockerInfoDCList.length; i++) {
                Incondition += "'" + DCBlockerInfoDCList[i].DCBlockerDataCaptureClientGuid + "'";
                Incondition += (i <= DCBlockerInfoDCList.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("FomatForInConditionByDCBlockerDataCaptureClientGuid Incondition : " + Incondition, "DCBlockerInfoDAO.FomatForInConditionByDCBlockerDataCaptureClientGuid");

            OneViewConsole.Debug("FomatForInConditionByDCBlockerDataCaptureClientGuid end ", "DCBlockerInfoDAO.FomatForInConditionByDCBlockerDataCaptureClientGuid");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DCBlockerInfoDAO.FomatForInConditionByDCBlockerDataCaptureClientGuid", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    this.DeleteDCBlocker = function (DCBlockerInfoClientId, DataCaptureClientId) {
        try {
            if (DCBlockerInfoClientId != "" && DCBlockerInfoClientId != undefined && DCBlockerInfoClientId != null && DataCaptureClientId != "" && DataCaptureClientId != undefined && DataCaptureClientId != null) {

                var Q1 = "DELETE FROM DCBlockerInfoEntity WHERE Id=" + DCBlockerInfoClientId;
                //alert(Q1);
                _OneViewSqlitePlugin.ExcecuteSql(Q1);

                var Q2 = "DELETE FROM DataCaptureEntity WHERE Id=" + DataCaptureClientId;
                //alert(Q2);
                _OneViewSqlitePlugin.ExcecuteSql(Q2);

                var Q3 = "DELETE FROM DcResultsEntity WHERE DataCaptureId=" + DataCaptureClientId;
                //alert(Q3);
                _OneViewSqlitePlugin.ExcecuteSql(Q3);

                var Q4 = "DELETE FROM DcResultDetailsEntity WHERE DataCaptureId=" + DataCaptureClientId;
                //alert(Q4);
                _OneViewSqlitePlugin.ExcecuteSql(Q4);
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DCBlockerInfoDAO.DeleteDCBlocker", Excep);
        }
    }

    this.DisableDCBlocker = function (DCBlockerInfoClientId, DataCaptureClientId) {
        try {
            if (DCBlockerInfoClientId != "" && DCBlockerInfoClientId != undefined && DCBlockerInfoClientId != null && DataCaptureClientId != "" && DataCaptureClientId != undefined && DataCaptureClientId != null) {

                var Q1 = "UPDATE DCBlockerInfoEntity Set IsDisable = 'true',IsSynchronized = 'false' WHERE Id=" + DCBlockerInfoClientId;
                //alert(Q1);
                _OneViewSqlitePlugin.ExcecuteSql(Q1);
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DCBlockerInfoDAO.DisableDCBlocker", Excep);
        }
    }

    this.GetBlockerByDcClientGuid = function (DcClientGuid) {
        try {
            OneViewConsole.Debug("GetBlockerByDcClientGuid Start ", "ActionDAO.GetBlockerByDcClientGuid");

            var Query = "SELECT count(*) as BlockerCount FROM DCBlockerInfoEntity WHERE DataCaptureClientGuid = '" + DcClientGuid+"'";

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetBlockerByDcClientGuid");

            OneViewConsole.Debug("GetBlockerByDcClientGuid end ", "ActionDAO.GetBlockerByDcClientGuid");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetBlockerByDcClientGuid", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetBlockerByDcClientGuidLst = function (DcClientGuidList) {
        try {
            OneViewConsole.Debug("GetBlockerByDcClientGuid Start ", "ActionDAO.GetBlockerByDcClientGuid");

            var Incondition = "(";
            for (var i = 0; i < DcClientGuidList.length; i++) {
                Incondition += "'" + DcClientGuidList[i] + "'";
                Incondition += (i <= DcClientGuidList.length - 2) ? "," : ")";
            }

            var Query = "SELECT count(*) as BlockerCount FROM DCBlockerInfoEntity WHERE DataCaptureClientGuid IN " + Incondition;

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetBlockerByDcClientGuid");

            OneViewConsole.Debug("GetBlockerByDcClientGuid end ", "ActionDAO.GetBlockerByDcClientGuid");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetBlockerByDcClientGuid", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetAttributeWiseBlockers = function (DcClientGuid, DrdsClientGuid) {
        try {
            OneViewConsole.Debug("GetAttributeWiseBlocker Start ", "ActionDAO.GetAttributeWiseBlocker");

            var Query = "SELECT * FROM DCBlockerInfoEntity WHERE DataCaptureClientGuid = '" + DcClientGuid + "' AND DcResultDetailsClientGuid = '" + DrdsClientGuid + "'";

            //alert('Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            //alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetAttributeWiseBlocker");

            OneViewConsole.Debug("GetAttributeWiseBlocker end ", "ActionDAO.GetAttributeWiseBlocker");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetAttributeWiseBlocker", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }
}

function ActionDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var oDateTime = new DateTime();
    var CurrentDateAndTime = oDateTime.GetDateAndTime();

    this.GetAllUnSyncActions = function () {

        try {
            OneViewConsole.Debug("GetAllUnSyncActions Start ", "ActionDAO.GetAllUnSyncActions");
            
            var ActionInfoList = new Array();
       
            var ActionList = ExcecuteSqlReader("Select * from ActionEntity Where IsSynchronized = 'false'");

            if (ActionList.length > 0) {
                ActionInfoList[0] = ActionList;
                ActionInfoList[1] = ExcecuteSqlReader("Select * from ActionDetailsEntity Where IsSynchronized = 'false'");
                ActionInfoList[2] = ExcecuteSqlReader("Select * from DCActionMapping Where IsSynchronized = 'false'");
                ActionInfoList[3] = ExcecuteSqlReader("Select * from DCNCMapping Where IsSynchronized = 'false'");
                ActionInfoList[4] = ExcecuteSqlReader("Select * from MultiMediaSubElements Where IsSynchronized = 'false'");
            }

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionInfoList), "ActionDAO.GetAllUnSyncActions");

            OneViewConsole.Debug("GetAllUnSyncActions end ", "ActionDAO.GetAllUnSyncActions");
            return ActionInfoList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetAllUnSyncActions", Excep);
        }
        finally {
            ActionInfoList = null;
            ActionList = null;
        }
    }

    this.GetAllUnSyncActionsForUpload = function (DcInfo) {

        try {
            OneViewConsole.Debug("GetAllUnSyncActionsForUpload Start ", "ActionDAO.GetAllUnSyncActionsForUpload");
            OneViewConsole.DataLog("Request DcInfo : " + JSON.stringify(DcInfo), "ActionDAO.GetAllUnSyncActionsForUpload");

            var DcInfoExp = FomatForInConditionByClientGuid(DcInfo);
            var Query = "Select Distinct DCNCMapping.ActionClientGuid As ClientGuid from DCNCMapping Where IsSynchronized = 'false' And DCNCMapping.ActionClientGuid != '' And DataCaptureClientGuid IN " + DcInfoExp;
            var ActionInfo = ExcecuteSqlReader(Query);

            OneViewConsole.Debug("ActionInfo for Request DcInfo , ActionInfo.Length : " + ActionInfo.length, "ActionDAO.GetAllUnSyncActionsForUpload");
            OneViewConsole.DataLog("ActionInfo for Request DcInfo , ActionInfo : " + JSON.stringify(ActionInfo), "ActionDAO.GetAllUnSyncActionsForUpload");
            //alert("ActionInfo : " + JSON.stringify(ActionInfo));

            ExcecuteSql("Update DCNCMapping Set ProcessCount = ProcessCount+1 Where DataCaptureClientGuid In " + DcInfoExp);

            var DCNCMappingQuery = "Select * from DCNCMapping Where IsSynchronized = 'false' And DataCaptureClientGuid In " + DcInfoExp;
            var DCNCMappingLst = ExcecuteSqlReader(DCNCMappingQuery);

            OneViewConsole.DataLog("DCNCMappingLst for Request DcInfo , DCNCMappingLst : " + JSON.stringify(DCNCMappingLst), "ActionDAO.GetAllUnSyncActionsForUpload");
            //alert("DCNCMappingLst : " + JSON.stringify(DCNCMappingLst));

            if (ActionInfo.length > 0) {

                var ActionInfoList = null;

                var _oDcDAO = new DcDAO();
                var DcInfo = new Array();
                var ActionDCList = new Array();

                var ActionExp = FomatForInConditionByClientGuid(ActionInfo);

                ExcecuteSql("Update ActionEntity Set ProcessCount = ProcessCount+1 Where ClientGuid In " + ActionExp);
                var ActionQuery = "Select * from ActionEntity Where ClientGuid In " + ActionExp;               
                var ActionLst = ExcecuteSqlReader(ActionQuery);

                OneViewConsole.DataLog("ActionEntity for Request DcInfo , ActionEntity : " + JSON.stringify(ActionLst), "ActionDAO.GetAllUnSyncActionsForUpload");
                //alert("ActionLst : " + JSON.stringify(ActionLst));

                ExcecuteSql("Update ActionDetailsEntity Set ProcessCount = ProcessCount+1 Where ActionClientGuid In " + ActionExp);
                var ActionDetailsQuery = "Select * from ActionDetailsEntity Where ActionClientGuid In " + ActionExp;
                var ActionDetailsLst = ExcecuteSqlReader(ActionDetailsQuery);

                OneViewConsole.DataLog("ActionDetailsLst for Request DcInfo , ActionDetailsLst : " + JSON.stringify(ActionDetailsLst), "ActionDAO.GetAllUnSyncActionsForUpload");
                //alert("ActionDetailsLst : " + JSON.stringify(ActionDetailsLst));

                ExcecuteSql("Update ActionManualFollowUpEntity Set ProcessCount = ProcessCount+1 Where ActionClientGuid In " + ActionExp);
                var ActionManualFollowUpQuery = "Select * from ActionManualFollowUpEntity Where ActionClientGuid In " + ActionExp;
                var ActionManualFollowUpLst = ExcecuteSqlReader(ActionManualFollowUpQuery);

                OneViewConsole.DataLog("ActionManualFollowUpLst for Request DcInfo , ActionManualFollowUpLst : " + JSON.stringify(ActionManualFollowUpLst), "ActionDAO.GetAllUnSyncActionsForUpload");
                //alert("ActionManualFollowUpLst : " + JSON.stringify(ActionManualFollowUpLst));

                var DcExp = FomatForInConditionByDataCaptureClientGuid(ActionDetailsLst);
                var DcQuery = "Select DISTINCT Id from DataCaptureEntity Where IsSynchronized = 'false' And ClientGuid IN " + DcExp;
                DcInfo = ExcecuteSqlReader(DcQuery);

                if (DcInfo.length > 0) {
                    _oDcDAO.UpdateDcProcessCountByDcInfo(DcInfo);
                    ActionDCList = _oDcDAO.GetDcList(DcInfo);
                }

                OneViewConsole.DataLog("ActionDCList for Request DcInfo , ActionDCList : " + JSON.stringify(ActionDCList), "ActionDAO.GetAllUnSyncActionsForUpload");
                //alert("ActionDCList " + JSON.stringify(ActionDCList));

                var ActionResponse = {
                    "ActionDCDTOLst": ActionDCList,
                    "ActionInfoList": {
                        "ActionLst": ActionLst,
                        "ActionDetailsLst": ActionDetailsLst,
                        "DCActionMappingLst": new Array(),
                        "DCNCMappingLst": DCNCMappingLst,
                        "MultiMediaMappingLst": new Array(),
                        "ActionManualFollowUpLst": ActionManualFollowUpLst
                    }
                }

                return ActionResponse;
            }
            else if (DCNCMappingLst.length > 0) {

                var ActionResponse = {
                    "ActionDCDTOLst": new Array(),
                    "ActionInfoList": {
                        "ActionLst": new Array(),
                        "ActionDetailsLst": new Array(),
                        "DCActionMappingLst": new Array(),
                        "DCNCMappingLst": DCNCMappingLst,
                        "MultiMediaMappingLst": new Array(),
                        "ActionManualFollowUpLst": new Array()
                    }
                }

                return ActionResponse;
            }
            else {
                //alert("No actions");
                return null;
            }

            OneViewConsole.Debug("GetAllUnSyncActionsForUpload end ", "ActionDAO.GetAllUnSyncActionsForUpload");
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetAllUnSyncActions", Excep);
        }
        finally {
            DcInfoExp = null;
            Query = null;
            ActionInfo = null;
            DCNCMappingQuery = null;
            DCNCMappingLst = null;
            ActionInfoList = null;
            _oDcDAO = null;
            DcInfo = null;
            ActionExp = null;
            ActionQuery = null;
            ActionLst = null;
            ActionDetailsQuery = null;
            ActionDetailsLst = null;
            DcExp = null;
            DcQuery = null;
            ActionDCList = null;
            ActionResponse = null;
        }
    }

    this.DeleteNCDcResultDetailsByDcId = function (resultData) {
        try {
            OneViewConsole.Debug("DeleteNCDcResultDetailsByDcId Start ", "ActionDAO.DeleteNCDcResultDetailsByDcId");

            var Exp = FomatForInConditionById(resultData);

            var DataClientGuid = FomatForInConditionByClientGuid(resultData);

            var result = GetNCDCByDCId(Exp);

            var Q1 = "DELETE FROM DCNCMapping WHERE DataCaptureClientGuid IN " + DataClientGuid + " AND ActionClientGuid=''";
            window.OneViewSqlite.excecuteSql(Q1);

            if (result.length > 0) {

                var ExpData = FomatForInConditionById(result);

                var ExpClientGuid = FomatForInConditionByClientGuid(result);
                var Q8 = "DELETE FROM DCNCMapping WHERE ActionClientGuid IN (SELECT ActionClientGuid FROM ActionDetailsEntity WHERE DataCaptureClientGuid IN " + ExpClientGuid + ")";
                var Q3 = "DELETE FROM ActionDetailsEntity WHERE DataCaptureClientGuid IN " + ExpClientGuid + "";
                var Q2 = "DELETE FROM ActionEntity WHERE ClientGuid IN (SELECT ActionClientGuid FROM ActionDetailsEntity WHERE DataCaptureClientGuid IN " + ExpClientGuid + ")"
                var Q4 = "DELETE FROM MultiMediaBlobSubElements WHERE ClientGuid IN (SELECT Answer FROM DcResultDetailsEntity WHERE DcResultDetailsEntity.DataCaptureId IN " + ExpData + ")";
                var Q5 = "DELETE FROM DcResultDetailsEntity WHERE DataCaptureId IN " + ExpData + "";
                var Q6 = "DELETE FROM DcResultsEntity WHERE DataCaptureId IN " + ExpData + "";
                var Q7 = "DELETE FROM DataCaptureEntity WHERE Id IN " + ExpData + "";
                var Q9 = "DELETE FROM ActionManualFollowUpEntity WHERE ActionClientGuid IN (SELECT ActionClientGuid FROM ActionDetailsEntity WHERE DataCaptureClientGuid IN " + ExpClientGuid + ")";

                window.OneViewSqlite.excecuteSql(Q8);
                window.OneViewSqlite.excecuteSql(Q2);
                window.OneViewSqlite.excecuteSql(Q3);
                window.OneViewSqlite.excecuteSql(Q4);
                window.OneViewSqlite.excecuteSql(Q5);
                window.OneViewSqlite.excecuteSql(Q6);
                window.OneViewSqlite.excecuteSql(Q7);
                window.OneViewSqlite.excecuteSql(Q9);
            }

            OneViewConsole.Debug("DeleteNCDcResultDetailsByDcId end ", "ActionDAO.DeleteNCDcResultDetailsByDcId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.DeleteNCDcResultDetailsByDcId", Excep);
        }
        finally {
            Exp = null;
            DataClientGuid = null;
            result = null;
            Q1 = null;
            ExpData = null;
            ExpClientGuid = null;
            Q8 = null;
            Q3 = null;
            Q2 = null;
            Q4 = null;
            Q5 = null;
            Q6 = null;
            Q7 = null;
        }
    }

    var GetNCDCByDCId = function (Exp) {
        try {
            OneViewConsole.Debug("GetNCDCByDCId Start ", "ActionDAO.GetNCDCByDCId");

            var query = "SELECT DISTINCT Id,ClientGuid FROM DataCaptureEntity WHERE ClientGuid IN(SELECT ActionDetailsEntity.DataCaptureClientGuid FROM DCNCMapping INNER JOIN  ActionDetailsEntity  ON DCNCMapping.ActionClientGuid=ActionDetailsEntity.ActionClientGuid  INNER JOIN DataCaptureEntity ON DCNCMapping.DataCaptureClientGuid=DataCaptureEntity.ClientGuid WHERE DataCaptureEntity.IsCompleted='true' AND DataCaptureEntity.IsSynchronized='true' AND DataCaptureEntity.Id IN " + Exp + ")";
            var result = window.OneViewSqlite.excecuteSqlReader(query);
            result = JSON.parse(result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "ActionDAO.GetNCDCByDCId");

            OneViewConsole.Debug("GetNCDCByDCId end ", "ActionDAO.GetNCDCByDCId");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetNCDCByDCId", Excep);
        }
        finally {
            query = null;
            result = null;
        }
    }

    var FomatForInConditionByArrayOfIntegers = function (Array) {
        try {
            OneViewConsole.Debug("FomatForInConditionByArrayOfIntegers Start ", "ActionDAO.FomatForInConditionByArrayOfIntegers");

            var Incondition = "(";
            for (var i = 0; i < Array.length; i++) {
                Incondition += Array[i];
                Incondition += (i <= Array.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("FomatForInConditionByArrayOfIntegers Incondition : " + Incondition, "ActionDAO.FomatForInConditionByArrayOfIntegers");

            OneViewConsole.Debug("FomatForInConditionByArrayOfIntegers end ", "ActionDAO.FomatForInConditionByArrayOfIntegers");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.FomatForInConditionByArrayOfIntegers", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    var FomatForInConditionById= function (DcInfo) {
        try {
            OneViewConsole.Debug("FomatForInConditionById Start ", "ActionDAO.FomatForInConditionById");

            var Incondition = "(";
            for (var i = 0; i < DcInfo.length; i++) {
                Incondition += DcInfo[i].Id;
                Incondition += (i <= DcInfo.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("FomatForInConditionById Incondition : " + Incondition, "ActionDAO.FomatForInConditionById");

            OneViewConsole.Debug("FomatForInConditionById end ", "ActionDAO.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.FomatForInConditionById", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    var FomatForInConditionByClientGuid = function (DcInfo) {
        try {
            OneViewConsole.Debug("FomatForInConditionByClientGuid Start ", "ActionDAO.FomatForInConditionByClientGuid");

            var Incondition = "(";
            for (var i = 0; i < DcInfo.length; i++) {
                Incondition += "'"+DcInfo[i].ClientGuid+"'";
                Incondition += (i <= DcInfo.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForInConditionByClientGuid Incondition : " + Incondition, "ActionDAO.FomatForInConditionByClientGuid");

            OneViewConsole.Debug("FomatForInConditionByClientGuid end ", "ActionDAO.FomatForInConditionByClientGuid");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.FomatForInConditionByClientGuid", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    var FomatForInConditionByDataCaptureClientGuid = function (ActionDetailsInfo) {
        try {
            OneViewConsole.Debug("FomatForInConditionByDataCaptureClientGuid Start ", "ActionDAO.FomatForInConditionByDataCaptureClientGuid");

            var Incondition = "(";
            for (var i = 0; i < ActionDetailsInfo.length; i++) {
                Incondition += "'"+ActionDetailsInfo[i].DataCaptureClientGuid+"'";
                Incondition += (i <= ActionDetailsInfo.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("FomatForInConditionByDataCaptureClientGuid Incondition : " + Incondition, "ActionDAO.FomatForInConditionByDataCaptureClientGuid");

            OneViewConsole.Debug("FomatForInConditionByDataCaptureClientGuid end ", "ActionDAO.FomatForInConditionByDataCaptureClientGuid");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.FomatForInConditionByDataCaptureClientGuid", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    this.UpdateActionProcessCount = function () {
        try {
            OneViewConsole.Debug("UpdateActionProcessCount Start ", "ActionDAO.UpdateActionProcessCount");

            new DefaultMasterDAO("ActionEntity").UpdateProcessCountForUnsyncData();
            new DefaultMasterDAO("ActionDetailsEntity").UpdateProcessCountForUnsyncData();
            new DefaultMasterDAO("DCActionMapping").UpdateProcessCountForUnsyncData();
            new DefaultMasterDAO("DCNCMapping").UpdateProcessCountForUnsyncData();
            new DefaultMasterDAO("MultiMediaSubElements").UpdateProcessCountForUnsyncData();

            OneViewConsole.Debug("UpdateActionProcessCount end ", "ActionDAO.UpdateActionProcessCount");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.UpdateActionProcessCount", Excep);
        }

    }

    this.UpdateSynchronizedFalgAndServerIdByList = function (ClientServerDTOLst, TableName) {
        try {
            OneViewConsole.Debug("UpdateSynchronizedFalgAndServerIdByList Start ", "ActionDAO.UpdateSynchronizedFalgAndServerIdByList");

            var CuurentDateTime = new DateTime().GetDateAndTime();

            for (var i = 0; i < ClientServerDTOLst.length; i++) {
               
                var Query = "UPDATE " + TableName + " SET ServerId = " + ClientServerDTOLst[i].ServerId + ", ProcessCount = 0, IsSynchronized = 'true',  LastsyncDate = '"
                            + CuurentDateTime + "', TimeStamp = '" + CuurentDateTime + "' where Id = " + ClientServerDTOLst[i].Id;

                //alert(Query);
                ExcecuteSql(Query);
            }

            OneViewConsole.Debug("UpdateSynchronizedFalgAndServerIdByList end ", "ActionDAO.UpdateSynchronizedFalgAndServerIdByList");
        }
        catch (Excep) {        
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.UpdateSynchronizedFalgAndServerIdByList", Excep);
        }
        finally {
            CuurentDateTime = null;
            Query = null;
        }
    }

    var ExcecuteSqlReader = function (Query) {
        try {
           
            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.ExcecuteSqlReader", Excep);
        }
        finally {
            result = null;
        }

        
    }

    var ExcecuteSql = function (Query) {
        try {
            window.OneViewSqlite.excecuteSql(Query);

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.ExcecuteSql", Excep);
        }
    }

    this.GetAllByIds = function (ActionMasterIds) {

        try {
            if (ActionMasterIds.length > 0) {

                var Exp = FomatForInConditionByArrayOfIntegers(ActionMasterIds);
                var Query = "SELECT * FROM PredefinedActionMasterEntity Where ServerId IN " + Exp;
              
                return ExcecuteSqlReader(Query);
            }
            else {
                return new Array();
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionDAO.GetAllByIds", Excep);
        }
    }

    this.CreateActions = function (Actions) {

        try {
            OneViewConsole.Debug("CreateActions start", "ActionDAO.CreateActions");

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var ActionEntityCount = new DefaultMasterDAO("ActionEntity").Count();
            var ActionDetailsEntityCount = new DefaultMasterDAO("ActionDetailsEntity").Count();
            var DCNCMappingCount = new DefaultMasterDAO("DCNCMapping").Count();
            var MultiMediaSubElementsCount = new DefaultMasterDAO("MultiMediaSubElements").Count();

            var AttributeActionInfo = {};
           
            for (var itrActions in Actions) {
               
                var ActionInfo = { "ActionClientId": "", "ActionClientGuid": "", "DCNCMappingClientId": "", "ActionDetails": {}, "MultiMediaSubElements": {} };

                if (Actions[itrActions].ActionEntity != null && Actions[itrActions].ActionEntity != undefined && Actions[itrActions].ActionEntity != "") {

                    Actions[itrActions].ActionEntity.TimeStamp = CurrenntDateAndTime;

                    var ActionEntity = new DefaultMasterDAO("ActionEntity").Create(Actions[itrActions].ActionEntity, ActionEntityCount);
                    ActionInfo.ActionClientId = ActionEntity.Id;
                    ActionInfo.ActionClientGuid = ActionEntity.ClientGuid;

                    for (var j = 0; j < Actions[itrActions].ActionEntity.ActionDetailsEntityList.length; j++) {

                        Actions[itrActions].ActionEntity.ActionDetailsEntityList[j].TimeStamp = CurrenntDateAndTime;

                        var ActionDetailsEntity = new DefaultMasterDAO("ActionDetailsEntity").Create(Actions[itrActions].ActionEntity.ActionDetailsEntityList[j], ActionDetailsEntityCount);

                        if (ActionDetailsEntity.CustomAction != "") {
                            ActionInfo.ActionDetails[ActionDetailsEntity.CustomAction] = { "ActionDetailsClientId": ActionDetailsEntity.Id };
                        }
                        else {
                            ActionInfo.ActionDetails[ActionDetailsEntity.PreDefinedActionId] = { "ActionDetailsClientId": ActionDetailsEntity.Id };
                        }

                        ActionDetailsEntityCount += 1;
                    }

                    ActionEntityCount += 1;
                }

                if (Actions[itrActions].DCNCMapping != null) {
                    var DCNCMapping = new DefaultMasterDAO("DCNCMapping").Create(Actions[itrActions].DCNCMapping, DCNCMappingCount);
                    ActionInfo.DCNCMappingClientId = DCNCMapping.Id;

                    DCNCMappingCount += 1;
                }

                if (Actions[itrActions].MultiMediaSubElements != null) {
                    for (var k = 0; k < Actions[itrActions].MultiMediaSubElements.length; k++) {
                        var MultiMediaSubElements = new DefaultMasterDAO("MultiMediaSubElements").Create(Actions[itrActions].MultiMediaSubElements[k], MultiMediaSubElementsCount);
                        ActionInfo.MultiMediaSubElements[Actions[itrActions].MultiMediaSubElements[k].LocalURL] = {
                            "ClientId": Actions[itrActions].MultiMediaSubElements[k].Id,
                            "ClientGuid": Actions[itrActions].MultiMediaSubElements[k].ClientGuid
                        };
                        MultiMediaSubElementsCount += 1;
                    }
                }
                AttributeActionInfo[itrActions] = ActionInfo;              
            }
          
            return AttributeActionInfo;

            OneViewConsole.Debug("CreateActions end", "ActionDAO.CreateActions");
        }
        catch (Excep) {         
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.CreateActions", Excep);
            return null;
        }
    }

    this.Create = function (Actionobj) {

        try {
            OneViewConsole.Debug("CreateActions start", "ActionDAO.CreateActions");

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var ActionEntityCount = new DefaultMasterDAO("ActionEntity").Count();
            var ActionDetailsEntityCount = new DefaultMasterDAO("ActionDetailsEntity").Count();
            var DCNCMappingCount = new DefaultMasterDAO("DCNCMapping").Count();

            var ActionInfo = { "ActionClientId": "", "DCNCMappingClientId": "", "ActionDetails": {} };

            Actionobj.ActionEntity.TimeStamp = CurrenntDateAndTime;
              
            var ActionEntity = new DefaultMasterDAO("ActionEntity").Create(Actionobj.ActionEntity, ActionEntityCount);
            ActionInfo.ActionClientId = ActionEntity.Id;

            for (var j = 0; j < Actionobj.ActionEntity.ActionDetailsEntityList.length; j++) {

                Actionobj.ActionEntity.ActionDetailsEntityList[j].TimeStamp = CurrenntDateAndTime;

                var ActionDetailsEntity = new DefaultMasterDAO("ActionDetailsEntity").Create(Actionobj.ActionEntity.ActionDetailsEntityList[j], ActionDetailsEntityCount);
                ActionInfo.ActionDetails[ActionDetailsEntity.PreDefinedActionId] = { "ActionDetailsClientId": ActionDetailsEntity.Id };

                ActionDetailsEntityCount += 1;
            }

            ActionEntityCount += 1;

            var DCNCMapping = new DefaultMasterDAO("DCNCMapping").Create(Actionobj.DCNCMapping, DCNCMappingCount);
            ActionInfo.DCNCMappingClientId = DCNCMapping.Id;

            DCNCMappingCount += 1;
          
            return ActionInfo;    

            OneViewConsole.Debug("CreateActions end", "ActionDAO.CreateActions");
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.CreateActions", Excep);
            return null;
        }
    }

    this.GetAllActions = function (DataCaptureClientGuid) {

        try {
            OneViewConsole.Debug("GetAllActions start", "ActionDAO.GetAllActions");

            if (DataCaptureClientGuid != "" && DataCaptureClientGuid != undefined && DataCaptureClientGuid != null) {

                var DCNCMappingQuery = "SELECT ncmp.Id AS DCNCMappingClientId,ncmp.ServerId AS DNNCMappimgServerId,ncmp.NCRuleId AS RuleId,ncmp.IsNC,ncmp.IsObservation,ncmp.IsManualRule,ncmp.IsActionNotMandatory,ac.Id AS ActionClientId,ac.ClientGuid AS ActionClientGuid," +
                                        "acd.Id AS ActionDetailsClientId,acd.CustomAction,acd.PreDefinedActionId,acd.ServerId AS ActionDetailsServerId,ncmp.TemplateNodeIds AS TemplateNodeIds,acd.ActionResponsibleFor AS ActionResponsibleFor FROM DCNCMapping AS ncmp " +
                                        "INNER JOIN ActionEntity AS ac ON ac.ClientGuid = ncmp.ActionClientGuid " +
                                        "INNER JOIN ActionDetailsEntity AS acd ON acd.ActionClientGuid = ac.ClientGuid " +
                                        "WHERE ncmp.DataCaptureClientGuid = '" + DataCaptureClientGuid + "' AND ncmp.IsDisable != 'true' AND acd.IsDisable != 'true'";

                //alert(DCNCMappingQuery);

                var DCNCMappingResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCNCMappingQuery);

                //alert(JSON.stringify(DCNCMappingResult));

                OneViewConsole.Debug("GetAllActions end", "ActionDAO.GetAllActions");

                return DCNCMappingResult;
            }
            else {
                OneViewConsole.Debug("GetAllActions end", "ActionDAO.GetAllActions");
                return new Array();
            }          
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetAllActions", Excep);
        }
    }

    this.GetAllActionsByDataCaptureClientGuidAndRuleId = function (DataCaptureClientGuid, RuleId) {

        try {
            OneViewConsole.Debug("GetAllActionsByDataCaptureClientGuidAndRuleId start", "ActionDAO.GetAllActionsByDataCaptureClientGuidAndRuleId");

            if (DataCaptureClientGuid != "" && DataCaptureClientGuid != undefined && DataCaptureClientGuid != null) {

                var DCNCMappingQuery = "SELECT ncmp.Id AS DCNCMappingClientId,ncmp.ServerId AS DNNCMappimgServerId,ncmp.NCRuleId AS RuleId,ncmp.IsNC,ncmp.IsObservation,ncmp.IsManualRule,ac.Id AS ActionClientId,ac.ClientGuid AS ActionClientGuid," +
                                        "acd.Id AS ActionDetailsClientId,acd.CustomAction,acd.PreDefinedActionId,acd.ServerId AS ActionDetailsServerId,ncmp.TemplateNodeIds AS TemplateNodeIds FROM DCNCMapping AS ncmp " +
                                        "INNER JOIN ActionEntity AS ac ON ac.ClientGuid = ncmp.ActionClientGuid " +
                                        "INNER JOIN ActionDetailsEntity AS acd ON acd.ActionClientGuid = ac.ClientGuid " +
                                        "WHERE ncmp.DataCaptureClientGuid = '" + DataCaptureClientGuid + "' AND ncmp.NCRuleId = " + RuleId + " AND ncmp.IsDisable != 'true' AND acd.IsDisable != 'true'";

                //alert(DCNCMappingQuery);

                var DCNCMappingResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCNCMappingQuery);

                //alert(JSON.stringify(DCNCMappingResult));

                OneViewConsole.Debug("GetAllActionsByDataCaptureClientGuidAndRuleId end", "ActionDAO.GetAllActionsByDataCaptureClientGuidAndRuleId");

                return DCNCMappingResult;
            }
            else {
                OneViewConsole.Debug("GetAllActionsByDataCaptureClientGuidAndRuleId end", "ActionDAO.GetAllActionsByDataCaptureClientGuidAndRuleId");
                return new Array();
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetAllActionsByDataCaptureClientGuidAndRuleId", Excep);
        }
    }

    this.DeleteAction = function (DataCaptureClientGuid, NCRuleId) {
        try {          
            if (DataCaptureClientGuid != "" && DataCaptureClientGuid != undefined && DataCaptureClientGuid != null && NCRuleId != undefined && NCRuleId != null) {

                var DCNCMappingQuery = "SELECT * FROM DCNCMapping WHERE DataCaptureClientGuid = '" + DataCaptureClientGuid + "' AND NCRuleId = " + NCRuleId;
                //alert(DCNCMappingQuery);

                var DCNCMappingResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCNCMappingQuery);
                //alert(JSON.stringify(DCNCMappingResult));

                if (DCNCMappingResult.length > 0) {

                    var Q1 = "DELETE FROM DCNCMapping WHERE ActionClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q1);
                    _OneViewSqlitePlugin.ExcecuteSql(Q1);

                    var Q2 = "DELETE FROM ActionEntity WHERE ClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q2);
                    _OneViewSqlitePlugin.ExcecuteSql(Q2);

                    var Q3 = "DELETE FROM ActionDetailsEntity WHERE ActionClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q3);
                    _OneViewSqlitePlugin.ExcecuteSql(Q3);

                    var Q4 = "DELETE FROM MultiMediaSubElements WHERE MappedEntityClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q4);
                    _OneViewSqlitePlugin.ExcecuteSql(Q4);
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.DeleteAction", Excep);
        }
    }

    this.DisableAction = function (DataCaptureClientGuid, NCRuleId) {
        try {
            if (DataCaptureClientGuid != "" && DataCaptureClientGuid != undefined && DataCaptureClientGuid != null && NCRuleId != undefined && NCRuleId != null) {

                var DCNCMappingQuery = "SELECT * FROM DCNCMapping WHERE DataCaptureClientGuid = '" + DataCaptureClientGuid + "' AND NCRuleId = " + NCRuleId;
                //alert(DCNCMappingQuery);

                var DCNCMappingResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCNCMappingQuery);
                //alert(JSON.stringify(DCNCMappingResult));

                if (DCNCMappingResult.length > 0) {

                    var Q1 = "UPDATE DCNCMapping Set IsDisable = 'true',IsSynchronized = 'false' WHERE ActionClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q1);
                    _OneViewSqlitePlugin.ExcecuteSql(Q1);

                    var Q2 = "UPDATE ActionEntity Set IsDisable = 'true',IsSynchronized = 'false' WHERE ClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q2);
                    _OneViewSqlitePlugin.ExcecuteSql(Q2);

                    var Q3 = "DELETE FROM ActionDetailsEntity WHERE ServerId = 0 AND ActionClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q3);
                    _OneViewSqlitePlugin.ExcecuteSql(Q3);

                    var Q4 = "DELETE FROM MultiMediaSubElements WHERE ServerId = 0 AND MappedEntityClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q4);
                    _OneViewSqlitePlugin.ExcecuteSql(Q4);

                    var Q5 = "UPDATE ActionDetailsEntity Set IsDisable = 'true',IsSynchronized = 'false' WHERE ActionClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q5);
                    _OneViewSqlitePlugin.ExcecuteSql(Q5);

                    var Q6 = "UPDATE MultiMediaSubElements Set IsDisabled = 'true',IsSynchronized = 'false' WHERE MappedEntityClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q6);
                    _OneViewSqlitePlugin.ExcecuteSql(Q6);
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.DeleteAction", Excep);
        }
    }

    this.DeleteActionDetails = function (ActionClientId) {
        try {
            if (ActionClientId != "" && ActionClientId != undefined && ActionClientId != null) {
                var Q3 = "DELETE FROM ActionDetailsEntity WHERE Id = " + ActionClientId;
                //alert(Q3);
                _OneViewSqlitePlugin.ExcecuteSql(Q3);
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.DeleteActionDetails", Excep);
        }
    }

    this.DisableActionDetails = function (ActionClientId, DataCaptureClientGuid, NCRuleId) {
        try {
            if (ActionClientId != "" && ActionClientId != undefined && ActionClientId != null && DataCaptureClientGuid != "" && DataCaptureClientGuid != undefined && DataCaptureClientGuid != null && NCRuleId != undefined && NCRuleId != null) {

                var Q3 = "UPDATE ActionDetailsEntity Set IsDisable = 'true',IsSynchronized = 'false' WHERE Id = " + ActionClientId;
                //alert(Q3);
                _OneViewSqlitePlugin.ExcecuteSql(Q3);

                this.UpdateSyncStatusForDCNCMappingAndAction(DataCaptureClientGuid, NCRuleId);
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.DisableActionDetails", Excep);
        }
    }

    this.DeleteMultiMediaSubElements = function (Id) {
        try {
            if (Id != "" && Id != undefined && Id != null) {
                var Q3 = "DELETE FROM MultiMediaSubElements WHERE Id = " + Id;
                //alert(Q3);
                _OneViewSqlitePlugin.ExcecuteSql(Q3);
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.DeleteMultiMediaSubElements", Excep);
        }
    }

    this.DisableMultiMediaSubElements = function (Id, DataCaptureClientGuid, NCRuleId) {
        try {
            if (Id != "" && Id != undefined && Id != null && DataCaptureClientGuid != "" && DataCaptureClientGuid != undefined && DataCaptureClientGuid != null && NCRuleId != undefined && NCRuleId != null) {
                var Q3 = "UPDATE MultiMediaSubElements Set IsDisabled = 'true',IsSynchronized = 'false' WHERE Id = " + Id;
                //alert(Q3);
                _OneViewSqlitePlugin.ExcecuteSql(Q3);

                this.UpdateSyncStatusForDCNCMappingAndAction(DataCaptureClientGuid, NCRuleId);
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.DisableMultiMediaSubElements", Excep);
        }
    }

    this.GetAllMultiMediaSubElementsByActionClientGuid = function (ActionClientGuid) {
        try {
            var Q3 = "SELECT * FROM MultiMediaSubElements WHERE IsDisabled = 'false' AND MappedEntityClientGuid = '" + ActionClientGuid + "'";
            //alert(Q3);
            return _OneViewSqlitePlugin.ExcecuteSqlReader(Q3);           
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetAllMultiMediaSubElementsByActionClientGuid", Excep);
        }
    }

    this.UpdateSyncStatusForDCNCMappingAndAction = function (DataCaptureClientGuid, NCRuleId) {
        try {
            if (DataCaptureClientGuid != "" && DataCaptureClientGuid != undefined && DataCaptureClientGuid != null && NCRuleId != undefined && NCRuleId != null) {

                var DCNCMappingQuery = "SELECT * FROM DCNCMapping WHERE DataCaptureClientGuid = '" + DataCaptureClientGuid + "' AND NCRuleId = " + NCRuleId;
                //alert(DCNCMappingQuery);

                var DCNCMappingResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCNCMappingQuery);
                //alert(JSON.stringify(DCNCMappingResult));

                if (DCNCMappingResult.length > 0) {

                    var Q1 = "UPDATE DCNCMapping Set IsSynchronized = 'false' WHERE ActionClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q1);
                    _OneViewSqlitePlugin.ExcecuteSql(Q1);

                    var Q2 = "UPDATE ActionEntity Set IsSynchronized = 'false' WHERE ClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q2);
                    _OneViewSqlitePlugin.ExcecuteSql(Q2);
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.UpdateSyncStatusForDCNCMappingAndAction", Excep);
        }
    }

    this.GetNCObservation = function (DcClientGuid) {
        try {
            OneViewConsole.Debug("GetNCObservation Start ", "ActionDAO.GetNCObservation");

            // var Query = "SELECT IsNC,IsObservation,ActionClientGuid FROM DCNCMapping WHERE (IsNC = 'true' OR IsObservation = 'true') AND IsDisable != 'true' AND DataCaptureClientGuid = '" + DcClientGuid+"'";
            var Query = "SELECT * FROM DCNCMapping WHERE (IsNC = 'true' OR IsObservation = 'true') AND IsDisable != 'true' AND DataCaptureClientGuid = '" + DcClientGuid + "'";
        
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
   
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetNCObservation");

            OneViewConsole.Debug("GetNCObservation end ", "ActionDAO.GetNCObservation");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetNCObservation", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetNCObservationByDcClientGuidLst = function (DcClientGuidList) {
        try {
            OneViewConsole.Debug("GetNCObservationByDcClientGuidLst Start ", "ActionDAO.GetNCObservationByDcClientGuidLst");
           
            var Incondition = "(";
            for (var i = 0; i < DcClientGuidList.length; i++) {
                Incondition += "'" + DcClientGuidList[i] + "'";
                Incondition += (i <= DcClientGuidList.length - 2) ? "," : ")";
            }
            var Query = "SELECT * FROM DCNCMapping WHERE (IsNC = 'true' OR IsObservation = 'true') AND IsDisable != 'true' AND DataCaptureClientGuid IN " + Incondition;
            //alert(Query);
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetNCObservationByDcClientGuidLst");

            OneViewConsole.Debug("GetNCObservationByDcClientGuidLst end ", "ActionDAO.GetNCObservationByDcClientGuidLst");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetNCObservationByDcClientGuidLst", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetActionCountByActionClientGuid = function (ActionClientGuidLst) {
        try {
            OneViewConsole.Debug("GetDcByDcId start", "DcDAO.GetDcByDcId");

            var ActionClientGuidInLst = FomatForListInCondition(ActionClientGuidLst);
            ActionClientGuidInCondition = "ActionClientGuid In " + ActionClientGuidInLst;

            var Query = "Select count(*) as ActionCount From ActionDetailsEntity Where " + ActionClientGuidInCondition + "";
        
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcByDcId");
      
            var Result = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Result, "DcDAO.GetDcByDcId");
            OneViewConsole.Debug("GetDcByDcId end", "DcDAO.GetDcByDcId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcByDcId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    var FomatForListInCondition = function (Info) {
        try {
            OneViewConsole.Debug("FomatForListInCondition Start ", "ActionDAO.FomatForListInCondition");

            var Incondition = "(";
            for (var i = 0; i < Info.length; i++) {
                Incondition += "'" + Info[i] + "'";
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForListInCondition Incondition : " + Incondition, "ActionDAO.FomatForListInCondition");

            OneViewConsole.Debug("FomatForListInCondition end ", "ActionDAO.FomatForListInCondition");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.FomatForListInCondition", Excep);
        }
        finally {
            Incondition = null;
        }
    }


    this.GetMultiMediaSubElementsByMappedEntityClientGuid = function (ClientGuid, Dimension) {
        try {
            OneViewConsole.Debug("GetMultiMediaSubElementsByMappedEntityClientGuid Start ", "ActionDAO.GetMultiMediaSubElementsByMappedEntityClientGuid");

            var Query = "SELECT * FROM MultiMediaSubElements WHERE IsDisabled = 'false' AND MappedEntityClientGuid = '" + ClientGuid + "' AND Dimension = '" + Dimension + "'";

           // alert(Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetMultiMediaSubElementsByMappedEntityClientGuid");

            OneViewConsole.Debug("GetMultiMediaSubElementsByMappedEntityClientGuid end ", "ActionDAO.GetMultiMediaSubElementsByMappedEntityClientGuid");

           // alert('Result : ' + Result);
            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetAllMultiMediaSubElementsByActionClientGuid", Excep);
        }
    }

    this.GetMultiMediaBlobSubElementsByMappedEntityClientGuid = function (ClientGuid, Dimension) {
        try {
            OneViewConsole.Debug("GetMultiMediaBlobSubElementsByMappedEntityClientGuid Start ", "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid");

            var Query = "SELECT * FROM MultiMediaBlobSubElements WHERE MappedEntityClientGuid = '" + ClientGuid + "' AND Dimension = '" + Dimension + "'";

           // alert(Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

          //  alert('Result : ' + Result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid");

            OneViewConsole.Debug("GetMultiMediaBlobSubElementsByMappedEntityClientGuid end ", "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid", Excep);
        }
    }


    this.GetActionAndActionDetails = function (ActionClientGuid) {
        try {
            OneViewConsole.Debug("GetMultiMediaBlobSubElementsByMappedEntityClientGuid Start ", "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid");

            var Query = "SELECT Ac.Id AS ActionId, Ac.ClientGuid AS ActionClientGuid, Ac.Comments  AS ActionComments , AcD.* FROM ActionEntity Ac INNER JOIN ActionDetailsEntity AcD on Ac.ClientGuid = AcD.ActionClientGuid WHERE Ac.ClientGuid = '" + ActionClientGuid + '"';

            //alert(Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            // alert('Result : ' + Result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid");

            OneViewConsole.Debug("GetMultiMediaBlobSubElementsByMappedEntityClientGuid end ", "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid", Excep);
        }
    }

    this.GetActionListByClientGuids = function (ActionList) {
        try {
            OneViewConsole.Debug("GetMultiMediaBlobSubElementsByMappedEntityClientGuid Start ", "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid");

            var Incondition = "(";
            for (var i = 0; i < ActionList.length; i++) {
                Incondition += "'" + ActionList[i].ClientGuid + "'";
                Incondition += (i <= ActionList.length - 2) ? "," : ")";
            }

            var Query = "SELECT * FROM ActionEntity WHERE  IsDisable !='true' AND ClientGuid IN " + Incondition;

           // alert(Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

          //  alert('Result : ' + Result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid");

            OneViewConsole.Debug("GetMultiMediaBlobSubElementsByMappedEntityClientGuid end ", "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid", Excep);
        }
    }

    this.GetActionDetailsListByActionClientGuids = function (ActionClientGuidList) {
        try {
            OneViewConsole.Debug("GetActionDetailsListByActionClientGuids Start ", "ActionDAO.GetActionDetailsListByActionClientGuids");

            var Incondition = "(";
            for (var i = 0; i < ActionClientGuidList.length; i++) {
                Incondition += "'" + ActionClientGuidList[i].ClientGuid + "'";
                Incondition += (i <= ActionClientGuidList.length - 2) ? "," : ")";
            }

            var Query = "SELECT * FROM ActionDetailsEntity WHERE IsDisable !='true' AND ActionClientGuid IN " + Incondition;

           // alert(Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

           // alert('Result : ' + Result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetActionDetailsListByActionClientGuids");

            OneViewConsole.Debug("GetActionDetailsListByActionClientGuids end ", "ActionDAO.GetActionDetailsListByActionClientGuids");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetActionDetailsListByActionClientGuids", Excep);
        }
    }

    this.GetMultiMediaSubElementsListByMappedEntityClientGuid = function (ClientGuidList, Dimension) {
        try {
            OneViewConsole.Debug("GetMultiMediaSubElementsByMappedEntityClientGuid Start ", "ActionDAO.GetMultiMediaSubElementsByMappedEntityClientGuid");

            var Incondition = "(";
            for (var i = 0; i < ClientGuidList.length; i++) {
                Incondition += "'" + ClientGuidList[i].ClientGuid + "'";
                Incondition += (i <= ClientGuidList.length - 2) ? "," : ")";
            }

            var Query = "SELECT * FROM MultiMediaSubElements WHERE IsDisabled != 'true' AND MappedEntityClientGuid IN " + Incondition + " AND Dimension = '" + Dimension + "'";

            // alert(Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetMultiMediaSubElementsByMappedEntityClientGuid");

            OneViewConsole.Debug("GetMultiMediaSubElementsByMappedEntityClientGuid end ", "ActionDAO.GetMultiMediaSubElementsByMappedEntityClientGuid");

           // alert('Result : ' + Result);
            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetAllMultiMediaSubElementsByActionClientGuid", Excep);
        }
    }

    this.GetMultiMediaBlobSubElementsListByMappedEntityClientGuid = function (ClientGuidList, Dimension) {
        try {
            OneViewConsole.Debug("GetMultiMediaBlobSubElementsListByMappedEntityClientGuid Start ", "ActionDAO.GetMultiMediaBlobSubElementsListByMappedEntityClientGuid");

            var Incondition = "(";
            for (var i = 0; i < ClientGuidList.length; i++) {
                Incondition += "'" + ClientGuidList[i].ClientGuid + "'";
                Incondition += (i <= ClientGuidList.length - 2) ? "," : ")";
            }

            var Query = "SELECT * FROM MultiMediaBlobSubElements WHERE MappedEntityClientGuid IN " + Incondition + " AND Dimension = '" + Dimension + "'";

            // alert(Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

             //alert('Result : ' + Result);

             OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetMultiMediaBlobSubElementsListByMappedEntityClientGuid");

             OneViewConsole.Debug("GetMultiMediaBlobSubElementsListByMappedEntityClientGuid end ", "ActionDAO.GetMultiMediaBlobSubElementsListByMappedEntityClientGuid");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetMultiMediaBlobSubElementsListByMappedEntityClientGuid", Excep);
        }
    }

    this.GetPredefinedActionMasterListByServerIds = function (PredefinedActionMasterIdList) {
        try {
            OneViewConsole.Debug("GetPredefinedActionMasterListByServerIds Start ", "ActionDAO.GetPredefinedActionMasterListByServerIds");

            var Incondition = "(";
            for (var i = 0; i < PredefinedActionMasterIdList.length; i++) {
                Incondition +=  PredefinedActionMasterIdList[i].Id ;
                Incondition += (i <= PredefinedActionMasterIdList.length - 2) ? "," : ")";
            }

            var Query = "SELECT * FROM PredefinedActionMasterEntity WHERE ServerId IN " + Incondition;

            //alert(Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            //alert('Result : ' + Result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetPredefinedActionMasterListByServerIds");

            OneViewConsole.Debug("GetPredefinedActionMasterListByServerIds end ", "ActionDAO.GetPredefinedActionMasterListByServerIds");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetPredefinedActionMasterListByServerIds", Excep);
        }
    }


    //Response Format =[{CustomAction:"","PreDefinedActionId":'',"PreDefinedActionName":'',"ActionFollowUpStatus":"","ActionResolveStartDate,":"","ActionResolveDate":'',"ActionFollowUpComments":'',"ActionFollowUpBySystemUserId":''}]
    this.GetLastActionInfoByAttributeId = function (ServiceId, TemplateNodeId, DcPlaceId, DcPlaceDimension, DcUserId, AttributeId) {
        try {
            OneViewConsole.Debug("GetLastDC start", "DcDAO.GetDCs");

            var Response = [];

            var query1 = "Select DISTINCT DataCaptureEntity.Id AS DataCaptureId,DataCaptureEntity.ClientGuid as ClientGuid, " +
                 " (substr(DataCaptureEntity.TimeStamp, 7, 4) || substr(DataCaptureEntity.TimeStamp, 4, 2) || substr(DataCaptureEntity.TimeStamp, 1, 2) || substr(DataCaptureEntity.TimeStamp, 1, 2) " +
                   " || substr(DataCaptureEntity.TimeStamp, 12, 2) || substr(DataCaptureEntity.TimeStamp, 15, 2) || substr(DataCaptureEntity.TimeStamp, 18, 2)) AS oTimeStamp " +
                     " from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                     "where (DataCaptureEntity.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                     " AND (DataCaptureEntity.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                     " AND DataCaptureEntity.IsCompleted = 'true'" +
                     " AND (DataCaptureEntity.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                     " AND (DataCaptureEntity.DcPlaceDimension = '" + DcPlaceDimension + "' OR '-1'='" + DcPlaceDimension + "')" +
                     " AND (DcResultsEntity.SystemUserId = " + DcUserId + " OR -1=" + DcUserId + ")" +
                     " ORDER BY oTimeStamp DESC LIMIT 1" ;


            //alert('query1 :' + query1);
            var DataCaptureList = ExcecuteSqlReader(query1);
            //alert('DataCaptureList :' + JSON.stringify(DataCaptureList));
            if (DataCaptureList.length > 0) {

                var DataCaptureClientGuid = DataCaptureList[0].ClientGuid;
           

                var query2 = "Select ActionDetailsEntity.CustomAction as CustomAction,ActionDetailsEntity.PreDefinedActionId as PreDefinedActionId,ActionDetailsEntity.ActionFollowUpStatus as ActionFollowUpStatus," +
                    "ActionDetailsEntity.ActionResolveStartDate as ActionResolveStartDate,ActionDetailsEntity.ActionResolveDate as ActionResolveDate,ActionDetailsEntity.ActionFollowUpComments as ActionFollowUpComments,ActionDetailsEntity.ActionFollowUpBySystemUserId as ActionFollowUpBySystemUserId," +
                     "PredefinedActionMasterEntity.Name as PreDefinedActionName from DCNCMapping INNER JOIN ActionEntity ON DCNCMapping.ActionClientGuid = ActionEntity.ClientGuid " +
                    "INNER JOIN ActionDetailsEntity ON ActionDetailsEntity.ActionClientGuid = ActionEntity.ClientGuid " +
                    "Left Outer JOIN PredefinedActionMasterEntity ON PredefinedActionMasterEntity.ServerId = ActionDetailsEntity.PreDefinedActionId " +
                    "where DCNCMapping.DataCaptureClientGuid = '" + DataCaptureClientGuid + "'" +
                    " AND DCNCMapping.TemplateNodeIds Like '%," + AttributeId + ",%'";

                //alert('query2 :' + query2);
                var ActionDetailsList = ExcecuteSqlReader(query2);
                //alert('ActionDetailsList :' + JSON.stringify(ActionDetailsList));
                if (ActionDetailsList.length > 0) {
                    //var ActionInfoRsponse = { CustomAction: "", PreDefinedActionId: '',PreDefinedActionName: '', ActionFollowUpStatus: "", ActionResolveStartDate: "", ActionResolveDate: '', ActionFollowUpComments: '', ActionFollowUpBySystemUserId: '' }
                    for (var i = 0; i < ActionDetailsList.length; i++) {
                        Response.push({ CustomAction: ActionDetailsList[i].CustomAction, PreDefinedActionId: ActionDetailsList[i].PreDefinedActionId, PreDefinedActionName: ActionDetailsList[i].PreDefinedActionName, ActionFollowUpStatus: ActionDetailsList[i].ActionFollowUpStatus, ActionResolveStartDate: ActionDetailsList[i].ActionResolveStartDate, ActionResolveDate: ActionDetailsList[i].ActionResolveDate, ActionFollowUpComments: ActionDetailsList[i].ActionFollowUpComments, ActionFollowUpBySystemUserId: ActionDetailsList[i].ActionFollowUpBySystemUserId });
                    }
                }

            }
              
            //alert("Response : " + JSON.stringify(Response));
            OneViewConsole.Debug("GetLastDC end", "PreviousDCValuesDAO.GetLastDC");

            return Response;
        }
        catch (Excep) {
            // alert('PreviousDCValuesDAO.GetDCs Excep: ' + JSON.stringify(Excep) + "," + Excep)
            throw oOneViewExceptionHandler.Create("DAO", "PreviousDCValuesDAO.GetLastDC", Excep);
        }
        finally {
            query1 = null;
            query2 = null;
            DataCaptureList = null;
            DcResultDetails = null;
            IdList = null;
            AttributeIds = null;
        }
    }

    this.GetActionByActionServerIdAndRaisedBySystemUserId = function (ServerId ,ActionRaisedBySystemUserId ) {
        try {
            OneViewConsole.Debug("GetActionByActionServerIdAndRaisedBySystemUserId Start ", "ActionDAO.GetActionByActionServerIdAndRaisedBySystemUserId");

            var Query = "SELECT Id FROM ActionEntity Ac WHERE ServerId = " + ServerId + " AND ActionRaisedBySystemUserId = " + ActionRaisedBySystemUserId;

           // alert(Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

          //  alert('11 Result : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetActionByActionServerIdAndRaisedBySystemUserId");

            OneViewConsole.Debug("GetActionByActionServerIdAndRaisedBySystemUserId end ", "ActionDAO.GetActionByActionServerIdAndRaisedBySystemUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetActionByActionServerIdAndRaisedBySystemUserId", Excep);
        }
    }

    this.GetActionDetailsByActionDetailsClientGuidAndRaisedBySystemUserId = function (ActionDetailsClientGuid, ActionRaisedBySystemUserId) {
        try {
            OneViewConsole.Debug("GetActionDetailsByActionDetailsClientGuidAndRaisedBySystemUserId Start ", "ActionDAO.GetActionDetailsByActionDetailsClientGuidAndRaisedBySystemUserId");

            var Query = "SELECT Id FROM ActionDetailsEntity Ac WHERE ClientGuid = '" + ActionDetailsClientGuid + "' AND ActionRaisedBySystemUserId = " + ActionRaisedBySystemUserId;

           // alert(Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

          //  alert('22 Result : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDAO.GetActionDetailsByActionDetailsClientGuidAndRaisedBySystemUserId");

            OneViewConsole.Debug("GetActionDetailsByActionDetailsClientGuidAndRaisedBySystemUserId end ", "ActionDAO.GetActionDetailsByActionDetailsClientGuidAndRaisedBySystemUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetActionDetailsByActionDetailsClientGuidAndRaisedBySystemUserId", Excep);
        }
    }

    this.GetNCsWithoutActions = function (DataCaptureClientGuid) {

        try {
            OneViewConsole.Debug("GetAlGetNCsWithoutActionslActions start", "ActionDAO.GetNCsWithoutActions");

            if (DataCaptureClientGuid != "" && DataCaptureClientGuid != undefined && DataCaptureClientGuid != null) {

                var DCNCMappingQuery = "SELECT ncmp.Id AS DCNCMappingClientId,ncmp.ServerId AS DNNCMappimgServerId,ncmp.NCRuleId AS RuleId,ncmp.IsNC,ncmp.IsObservation,ncmp.IsManualRule,ncmp.TemplateNodeIds AS TemplateNodeIds,ncmp.IsActionNotMandatory FROM DCNCMapping AS ncmp " +
                                     " WHERE ncmp.DataCaptureClientGuid = '" + DataCaptureClientGuid + "' AND ncmp.IsDisable != 'true' AND ncmp.ActionClientGuid = ''";

                //alert(DCNCMappingQuery);

                var DCNCMappingResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCNCMappingQuery);

                //alert(JSON.stringify(DCNCMappingResult));

                OneViewConsole.Debug("GetNCsWithoutActions end", "ActionDAO.GetNCsWithoutActions");

                return DCNCMappingResult;
            }
            else {
                OneViewConsole.Debug("GetNCsWithoutActions end", "ActionDAO.GetNCsWithoutActions");
                return new Array();
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetNCsWithoutActions", Excep);
        }
    }

    this.UpdateActionIdInDCNCMapping = function (ActionClientGuid, Id) {
        try {
            if (ActionClientGuid != "" && ActionClientGuid != undefined && ActionClientGuid != null && Id != undefined && Id != null) {
                
                var Q1 = "UPDATE DCNCMapping Set ActionClientGuid = '" + ActionClientGuid + "' WHERE Id=" + Id;
                //alert(Q1);
                _OneViewSqlitePlugin.ExcecuteSql(Q1);

            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.UpdateActionIdInDCNCMapping", Excep);
        }
    }

}

function CreatePredefinedActions() {

    try {
        var PredefinedActionMasterEntityCount = new DefaultMasterDAO("PredefinedActionMasterEntity").Count();

        for (var i = 1; i<= 10; i++) {

            var _oPredefinedActionMasterEntity = new PredefinedActionMasterEntity();
            _oPredefinedActionMasterEntity.ServerId = i;
            _oPredefinedActionMasterEntity.Name = "PredefinedAction-" + i;

            new DefaultMasterDAO("PredefinedActionMasterEntity").Create(_oPredefinedActionMasterEntity, PredefinedActionMasterEntityCount);
            PredefinedActionMasterEntityCount += 1;
        }
    }
    catch (Excep) {
        alert("CreatePredefinedActions : " + Excep);
    }
}
