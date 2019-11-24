
function DcApprovalDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
    var _oSqliteQG = new SqliteQG();

    this.UpdateDcResultApprove = function (Req) {

        try {
            OneViewConsole.Debug("UpdateDcResultApprove start", "DcApprovalDAO.InsertApprovalProfile");

            var Query = "Update DataCaptureEntity Set ApprovalStatus='" + Req.ApprovalStatus + "',ApprovalStatusDate='" + Req.ApprovalStatusDate + "',IsSynchronized='" + Req.IsSynchronized + "',IsOnDeviceApprovalFinished='" + Req.IsOnDeviceApprovalFinished + "',TimeStamp='" + Req.TimeStamp + "' Where ClientGuid='" + Req.ClientGuid + "'";
        
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.UpdateDcResultApprove");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateDcResultApprove end", "DcApprovalDAO.UpdateDcResultApprove");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.UpdateDcResultApprove", Excep);
        }
        finally {
          
            Query1 = null;
           
        }
    }

    this.UpdateDataCaptureSubmit = function (Req) {

        try {
            OneViewConsole.Debug("UpdateDataCaptureSubmit start", "DcApprovalDAO.UpdateDataCaptureSubmit");

            var Query = "Update DataCaptureEntity Set IsSubmit='" + Req.IsSubmit + "',SubmitDate='" + Req.SubmitDate + "',IsSynchronized='" + Req.IsSynchronized + "',TimeStamp='" + Req.TimeStamp + "' Where ClientGuid='" + Req.ClientGuid + "'";
         
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.UpdateDataCaptureSubmit");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateDataCaptureSubmit end", "DcApprovalDAO.UpdateDataCaptureSubmit");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.UpdateDataCaptureSubmit", Excep);
        }
        finally {

            Query1 = null;

        }
    }

    this.GetUserMasterEntityPin = function (UserID) {

        try {
            OneViewConsole.Debug("GetUserMasterEntityPin start", "DcApprovalDAO.GetUserMasterEntityPin");

            var Query = "SELECT Pin FROM UserMasterEntity WHERE  ServerId='" + UserID + "'";

            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.GetUserMasterEntityPin");

            var Pin = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Pin, "DcApprovalDAO.GetUserMasterEntityPin");
            OneViewConsole.Debug("GetUserMasterEntityPin end", "DcApprovalDAO.GetUserMasterEntityPin");

            return Pin;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.GetUserMasterEntityPin", Excep);
        }
        finally {
            Query = null;
            BlobSubElements = null;
        }
    }

    this.GetUserIdAndPassword = function (ApproverUserIds, UserId, Password) {

        try {         
           OneViewConsole.Debug("GetUserIdAndPassword start", "DcApprovalDAO.GetUserIdAndPassword");

           var Query = "SELECT * FROM UserMasterEntity WHERE  ServerId='" + ApproverUserIds + "' and UserName='" + UserId + "'and Password='" + Password + "'";          
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.GetUserIdAndPassword");
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Result, "DcApprovalDAO.GetUserIdAndPassword");
            OneViewConsole.Debug("GetUserIdAndPassword end", "DcApprovalDAO.GetUserIdAndPassword");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.GetUserIdAndPassword", Excep);
        }
        finally {
            Query = null;
            BlobSubElements = null;
        }
    }

    this.GetDcApprovalByDCId = function (DataCaptureClientGuid) {

        try {
            OneViewConsole.Debug("GetDcApprovalByDCId start", "DcApprovalDAO.GetDcApprovalByDCId");

            var Query = "SELECT (CASE WHEN MAX(ApprovalIndex) IS NULL THEN 0 ELSE MAX(ApprovalIndex) END) as ApprovalIndex  FROM DcApprovalEntity WHERE  DataCaptureClientGuid='" + DataCaptureClientGuid + "' and ApprovalStatus=1 order by Id Desc";

            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.GetDcApprovalByDCId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Result, "DcApprovalDAO.GetDcApprovalByDCId");
            OneViewConsole.Debug("GetDcApprovalByDCId end", "DcApprovalDAO.GetDcApprovalByDCId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.GetDcApprovalByDCId", Excep);
        }
        finally {
            Query = null;
            BlobSubElements = null;
        }
    }

    this.GetAllDcApprovalInfoForUpload = function (DcInfo) {

        try {
            OneViewConsole.Debug("GetAllDcApprovalInfoForUpload start", "DcApprovalDAO.GetAllDcApprovalInfoForUpload");

            OneViewConsole.DataLog("Request DcInfo : " + JSON.stringify(DcInfo), "DCBlockerInfoDAO.GetAllDCBlockerInfoForUpload");

            var DcApprovalDTOLst = [];

            var DcInfoExp = FomatForInConditionByClientGuid(DcInfo);
            var Query = "Select * from DcApprovalEntity Where IsSynchronized = 'false' And DataCaptureClientGuid IN " + DcInfoExp;

            _OneViewSqlitePlugin.ExcecuteSql("Update DcApprovalEntity Set ProcessCount = ProcessCount+1 Where DataCaptureClientGuid IN " + DcInfoExp);
            var DcApprovalEntityLst = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (DcApprovalEntityLst.length > 0) {

                var DcApprovalInfoExp = FomatForInConditionById(DcApprovalEntityLst);
                var DCApprovalOtherInfoExp = FomatForInConditionByDCApprovalOtherInfoId(DcApprovalEntityLst);

                var DcApprovalDetailsQuery = "Select * from DcApprovalDetailsEntity Where IsSynchronized = 'false' And DcApprovalId IN " + DcApprovalInfoExp;

                _OneViewSqlitePlugin.ExcecuteSql("Update DcApprovalDetailsEntity Set ProcessCount = ProcessCount+1 Where IsSynchronized = 'false' And DcApprovalId IN " + DcApprovalInfoExp);
                var DcApprovalDetailsEntityLst = _OneViewSqlitePlugin.ExcecuteSqlReader(DcApprovalDetailsQuery);
                
                var DcApprovalHistoryQuery = "Select * from DcApprovalHistoryEntity Where IsSynchronized = 'false' And DcApprovalId IN " + DcApprovalInfoExp;

                _OneViewSqlitePlugin.ExcecuteSql("Update DcApprovalHistoryEntity Set ProcessCount = ProcessCount+1 Where IsSynchronized = 'false' And DcApprovalId IN " + DcApprovalInfoExp);
                var DcApprovalHistoryEntityLst = _OneViewSqlitePlugin.ExcecuteSqlReader(DcApprovalHistoryQuery);
                
                var DCApprovalOtherInfoQuery = "Select * from DCApprovalOtherInfoEntity Where IsSynchronized = 'false' And Id IN " + DCApprovalOtherInfoExp;

                _OneViewSqlitePlugin.ExcecuteSql("Update DCApprovalOtherInfoEntity Set ProcessCount = ProcessCount+1 Where IsSynchronized = 'false' And Id IN " + DCApprovalOtherInfoExp);
                var DCApprovalOtherInfoEntityLst = _OneViewSqlitePlugin.ExcecuteSqlReader(DCApprovalOtherInfoQuery);

                var MultiMediaBlobSubElementsLst = [];

                if (DCApprovalOtherInfoEntityLst.length > 0) {

                    var DCApprovalOtherInfoMultimediaQuery = "Select ClientGuid FROM DCApprovalOtherInfoEntity Where Id IN " + DCApprovalOtherInfoExp;
                    
                    var DCApprovalOtherInfoMultimediaResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCApprovalOtherInfoMultimediaQuery);                    
                    var DCApprovalOtherInfoMultimediaExp = FomatForInConditionByClientGuid(DCApprovalOtherInfoMultimediaResult);

                    _OneViewSqlitePlugin.ExcecuteSql("Update MultiMediaBlobSubElements Set ProcessCount = ProcessCount+1 Where IsSynchronized = 'false' And MappedEntityClientGuid IN " + DCApprovalOtherInfoMultimediaExp);
                    var MultiMediaBlobSubElementsDeleteQuery = "SELECT * FROM MultiMediaBlobSubElements WHERE MappedEntityClientGuid IN " + DCApprovalOtherInfoMultimediaExp;
                    MultiMediaBlobSubElementsLst = _OneViewSqlitePlugin.ExcecuteSqlReader(MultiMediaBlobSubElementsDeleteQuery);                    
                }
                
                DcApprovalDTOLst = NormalizeDcApprovalList(DcApprovalEntityLst, DcApprovalDetailsEntityLst, DcApprovalHistoryEntityLst, DCApprovalOtherInfoEntityLst, MultiMediaBlobSubElementsLst);
            }
          
            OneViewConsole.Debug("GetAllDcApprovalInfoForUpload end", "DcApprovalDAO.GetAllDcApprovalInfoForUpload");

            return DcApprovalDTOLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.GetAllDcApprovalInfoForUpload", Excep);
        }
        finally {           
        }
    }

    this.UpdateDcApprovalInfo = function (DcApprovalInfoResponceLst) {
        try {
            OneViewConsole.Debug("UpdateDcApprovalInfo start", "DcApprovalDAO.UpdateDcApprovalInfo");
            
            for (var i = 0; i < DcApprovalInfoResponceLst.length; i++) {

                UpdateSynchronizedFalgById(DcApprovalInfoResponceLst[i].Id, DcApprovalInfoResponceLst[i].ServerId, "DcApprovalEntity");

                var DcApprovalDetailsSyncStatusDTOLst = DcApprovalInfoResponceLst[i].DcApprovalDetailsSyncStatusDTOLst;

                for (var j = 0; j < DcApprovalDetailsSyncStatusDTOLst.length; j++) {

                    UpdateSynchronizedFalgById(DcApprovalDetailsSyncStatusDTOLst[j].Id, DcApprovalDetailsSyncStatusDTOLst[j].ServerId, "DcApprovalDetailsEntity");
                }

                var DcApprovalHistorySyncStatusDTOLst = DcApprovalInfoResponceLst[i].DcApprovalHistorySyncStatusDTOLst;

                for (var j = 0; j < DcApprovalHistorySyncStatusDTOLst.length; j++) {

                    UpdateSynchronizedFalgById(DcApprovalHistorySyncStatusDTOLst[j].Id, DcApprovalHistorySyncStatusDTOLst[j].ServerId, "DcApprovalHistoryEntity");
                }

                var DCApprovalOtherInfoSyncStatusDTO = DcApprovalInfoResponceLst[i].DCApprovalOtherInfoSyncStatusDTO;
               
                if (DCApprovalOtherInfoSyncStatusDTO != null) {
                    
                    UpdateSynchronizedFalgById(DCApprovalOtherInfoSyncStatusDTO.Id, DCApprovalOtherInfoSyncStatusDTO.ServerId, "DCApprovalOtherInfoEntity");

                    var MultiMediaBlobSubElementResponce = DCApprovalOtherInfoSyncStatusDTO.MultiMediaBlobSubElementResponce;

                    if (MultiMediaBlobSubElementResponce != null) {
                        
                        UpdateSynchronizedFalgById(MultiMediaBlobSubElementResponce.Id, MultiMediaBlobSubElementResponce.ServerId, "MultiMediaBlobSubElements");
                    }
                }
            }

            OneViewConsole.Debug("UpdateDcApprovalInfo end", "DcApprovalDAO.UpdateDcApprovalInfo");
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.UpdateDcApprovalInfo", Excep);
        }
        finally {
            DCSyncResultStatusDTO = null;
            DCSyncResultDetailsDTO = null;
        }
    }

    var UpdateSynchronizedFalgById = function (ClientId, ServerId, TableName) {
        try {
            OneViewConsole.Debug("UpdateSynchronizedFalgById start", "DcApprovalDAO.UpdateSynchronizedFalgById");

            var CuurentDateTime = new DateTime().GetDateAndTime();

            var Query = "UPDATE " + TableName + " SET ServerId = " + ServerId + ", ProcessCount = 0, IsSynchronized = 'true',  LastsyncDate = '" + CuurentDateTime + "', TimeStamp = '" + CuurentDateTime + "' where Id = " + ClientId;
            //alert(Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalDAO.UpdateSynchronizedFalgById");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateSynchronizedFalgById end", "DcApprovalDAO.UpdateSynchronizedFalgById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.UpdateSynchronizedFalgById", Excep);
        }
        finally {
            CuurentDateTime = null;
            Query = null;
        }
    }

    var FomatForInConditionById = function (DcApprovalInfo) {
        try {
            OneViewConsole.Debug("FomatForInConditionById start", "DcDAO.FomatForInConditionById");
            OneViewConsole.DataLog("Request DcApprovalInfo : " + JSON.stringify(DcApprovalInfo), "DcDAO.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < DcApprovalInfo.length; i++) {
                Incondition += DcApprovalInfo[i].Id;
                Incondition += (i <= DcApprovalInfo.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "DcDAO.FomatForInConditionById");
            OneViewConsole.Debug("FomatForInConditionById end", "DcDAO.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.FomatForInConditionById", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    var FomatForInConditionByDCApprovalOtherInfoId = function (DcApprovalInfo) {
        try {
            OneViewConsole.Debug("FomatForInConditionByDCApprovalOtherInfoId start", "DcDAO.FomatForInConditionByDCApprovalOtherInfoId");
            OneViewConsole.DataLog("Request DcApprovalInfo : " + JSON.stringify(DcApprovalInfo), "DcDAO.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < DcApprovalInfo.length; i++) {
                Incondition += DcApprovalInfo[i].DCApprovalOtherInfoId;
                Incondition += (i <= DcApprovalInfo.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "DcDAO.FomatForInConditionByDCApprovalOtherInfoId");
            OneViewConsole.Debug("FomatForInConditionByDCApprovalOtherInfoId end", "DcDAO.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.FomatForInConditionByDCApprovalOtherInfoId", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    var FomatForInConditionByClientGuid = function (DcInfo) {
        try {
            OneViewConsole.Debug("FomatForInConditionByClientGuid Start ", "DcApprovalDAO.FomatForInConditionByClientGuid");

            var Incondition = "(";
            for (var i = 0; i < DcInfo.length; i++) {
                Incondition += "'" + DcInfo[i].ClientGuid + "'";
                Incondition += (i <= DcInfo.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForInConditionByClientGuid Incondition : " + Incondition, "DcApprovalDAO.FomatForInConditionByClientGuid");

            OneViewConsole.Debug("FomatForInConditionByClientGuid end ", "DcApprovalDAO.FomatForInConditionByClientGuid");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.FomatForInConditionByClientGuid", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    var NormalizeDcApprovalList = function (DcApprovalEntityLst, DcApprovalDetailsEntityLst, DcApprovalHistoryEntityLst, DCApprovalOtherInfoEntityLst, MultiMediaBlobSubElementsLst) {
        try {
            OneViewConsole.Debug("NormalizeDcApprovalList start", "DcApprovalDAO.NormalizeDcApprovalList");
            OneViewConsole.DataLog("Request DcApprovalEntityLst : " + JSON.stringify(DcApprovalEntityLst), "DcApprovalDAO.NormalizeDcApprovalList");
            OneViewConsole.DataLog("Request DcApprovalDetailsEntityLst : " + JSON.stringify(DcApprovalDetailsEntityLst), "DcApprovalDAO.NormalizeDcApprovalList");
            OneViewConsole.DataLog("Request DcApprovalHistoryEntityLst : " + JSON.stringify(DcApprovalHistoryEntityLst), "DcApprovalDAO.NormalizeDcApprovalList");
            OneViewConsole.DataLog("Request DCApprovalOtherInfoEntityLst : " + JSON.stringify(DCApprovalOtherInfoEntityLst), "DcApprovalDAO.NormalizeDcApprovalList");
            OneViewConsole.DataLog("Request MultiMediaBlobSubElementsLst : " + JSON.stringify(MultiMediaBlobSubElementsLst), "DcApprovalDAO.MultiMediaBlobSubElementsLst");

            var DcApprovalList = new Array();

            for (var i = 0; i < DcApprovalEntityLst.length; i++) {
                
                var _oDcApprovalEntity = new DcApprovalEntity();
                _oDcApprovalEntity = _oSqliteQG.Normalize(_oDcApprovalEntity, DcApprovalEntityLst[i]);

                var DcApprovalDetailsCount = 0;
                
                for (var j = 0; j < DcApprovalDetailsEntityLst.length; j++) {

                    if (DcApprovalDetailsEntityLst[j].DcApprovalId == DcApprovalEntityLst[i].Id) {

                        var _oDcApprovalDetailsEntity = new DcApprovalDetailsEntity();
                        _oDcApprovalEntity.DcApprovalDetailsEntityList[DcApprovalDetailsCount] = _oSqliteQG.Normalize(_oDcApprovalDetailsEntity, DcApprovalDetailsEntityLst[j]);

                        DcApprovalDetailsCount++;
                    }
                }

                var DcApprovalHistoryCount = 0;
                
                for (var j = 0; j < DcApprovalHistoryEntityLst.length; j++) {
                    
                    if (DcApprovalHistoryEntityLst[j].DcApprovalId == DcApprovalEntityLst[i].Id) {

                        var _oDcApprovalHistoryEntity = new DcApprovalHistoryEntity();
                        _oDcApprovalEntity.DcApprovalHistoryEntityList[DcApprovalHistoryCount] = _oSqliteQG.Normalize(_oDcApprovalHistoryEntity, DcApprovalHistoryEntityLst[j]);

                        DcApprovalHistoryCount++;
                    }
                }
                
                for (var j = 0; j < DCApprovalOtherInfoEntityLst.length; j++) {

                    if (DCApprovalOtherInfoEntityLst[j].Id == DcApprovalEntityLst[i].DCApprovalOtherInfoId) {

                        var _oDCApprovalOtherInfoEntity = new DCApprovalOtherInfoEntity();
                        _oDcApprovalEntity.DCApprovalOtherInfoEntity = _oSqliteQG.Normalize(_oDCApprovalOtherInfoEntity, DCApprovalOtherInfoEntityLst[j]);

                        for (var k = 0; k < MultiMediaBlobSubElementsLst.length; k++) {

                            if (MultiMediaBlobSubElementsLst[k].MappedEntityClientGuid == DCApprovalOtherInfoEntityLst[j].ClientGuid) {

                                var _oMultiMediaBlobSubElements = new MultiMediaBlobSubElements();
                                _oDcApprovalEntity.DCApprovalOtherInfoEntity.MultiMediaBlobSubElements = _oSqliteQG.Normalize(_oMultiMediaBlobSubElements, MultiMediaBlobSubElementsLst[k]);

                                break;
                            }
                        }

                        break;
                    }
                }

                DcApprovalList[i] = _oDcApprovalEntity;
            }

            OneViewConsole.DataLog("Response  : " + JSON.stringify(DcApprovalList), "DcDAO.NormalizeDcApprovalList");
            OneViewConsole.Debug("NormalizeDcApprovalList end", "DcDAO.NormalizeDcApprovalList");
            
            return DcApprovalList;
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.NormalizeDcApprovalList", Excep);
        }
        finally {           
        }
    }

    this.DeleteByDcInfo = function (DcInfo) {
        try {
            OneViewConsole.Debug("DeleteByDcInfo Start", "DcApprovalDAO.DeleteByDcInfo");
            
            if (DcInfo.length > 0) {

                var DcInfoExp = FomatForInConditionByClientGuid(DcInfo);
                var DcApprovalQuery = "Select Id,DCApprovalOtherInfoId FROM DcApprovalEntity Where DataCaptureClientGuid IN " + DcInfoExp;

                var DcApprovalResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DcApprovalQuery);
                
                if (DcApprovalResult.length > 0) {

                    var DcapprovalInfoExp = FomatForInConditionById(DcApprovalResult);
                    var DCApprovalOtherInfoExp = FomatForInConditionByDCApprovalOtherInfoId(DcApprovalResult);

                    var DcApprovalDeleteQuery = "DELETE FROM DcApprovalEntity WHERE Id IN " + DcapprovalInfoExp;
                    _OneViewSqlitePlugin.ExcecuteSql(DcApprovalDeleteQuery);

                    var DcApprovalDetailsDeleteQuery = "DELETE FROM DcApprovalDetailsEntity WHERE DcApprovalId IN " + DcapprovalInfoExp;
                    _OneViewSqlitePlugin.ExcecuteSql(DcApprovalDetailsDeleteQuery);

                    var DcApprovalHistoryDeleteQuery = "DELETE FROM DcApprovalHistoryEntity WHERE DcApprovalId IN " + DcapprovalInfoExp;
                    _OneViewSqlitePlugin.ExcecuteSql(DcApprovalHistoryDeleteQuery);
                    
                    var DCApprovalOtherInfoMultimediaQuery = "Select ClientGuid FROM DCApprovalOtherInfoEntity Where Id IN " + DCApprovalOtherInfoExp;
                    var DCApprovalOtherInfoMultimediaResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCApprovalOtherInfoMultimediaQuery);
                    
                    if (DCApprovalOtherInfoMultimediaResult.length > 0) {

                        var DCApprovalOtherInfoMultimediaExp = FomatForInConditionByClientGuid(DCApprovalOtherInfoMultimediaResult);
                        
                        var MultiMediaBlobSubElementsDeleteQuery = "DELETE FROM MultiMediaBlobSubElements WHERE MappedEntityClientGuid IN " + DCApprovalOtherInfoMultimediaExp;
                        _OneViewSqlitePlugin.ExcecuteSql(MultiMediaBlobSubElementsDeleteQuery);
                    }

                    var DCApprovalOtherInfoDeleteQuery = "DELETE FROM DCApprovalOtherInfoEntity WHERE Id IN " + DCApprovalOtherInfoExp;
                    _OneViewSqlitePlugin.ExcecuteSql(DCApprovalOtherInfoDeleteQuery);
                }
            }

            OneViewConsole.Debug("DeleteByDcInfo End", "DcApprovalDAO.DeleteByDcInfo");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcApprovalDAO.DeleteByDcInfo", Excep);
        }
        finally {           
        }
    }

    this.UpdateDCApprovalOtherInfoId = function (Req) {
        try {
            OneViewConsole.Debug("UpdateDCApprovalOtherInfoId start", "DcApprovalDAO.UpdateDCApprovalOtherInfoId");

            var CuurentDateTime = new DateTime().GetDateAndTime();

            var Query = "UPDATE DcApprovalEntity SET DCApprovalOtherInfoId = " + Req.DCApprovalOtherInfoId + ", IsSynchronized = 'false', TimeStamp = '" + CuurentDateTime + "' where Id = " + Req.Id;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcApprovalDAO.UpdateDCApprovalOtherInfoId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateDCApprovalOtherInfoId end", "DcApprovalDAO.UpdateDCApprovalOtherInfoId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.UpdateDCApprovalOtherInfoId", Excep);
        }
        finally {
            DCSyncResultStatusDTO = null;
            DCSyncResultDetailsDTO = null;
        }
    }

    this.GetInCompleteAprovedDCByTemplates = function (TemplateNodeIdCondition) {

        try {
            OneViewConsole.Debug("GetInCompleteAprovedDCByTemplates start", "DcApprovalDAO.GetInCompleteAprovedDCByTemplates");

            var Query = "SELECT TemplateNodeId,IsOnDeviceApprovalFinished , ApprovalStatus from DataCaptureEntity WHERE ApprovalStatus > 0 AND IsOnDeviceApprovalFinished != 'true' AND TemplateNodeId IN " + TemplateNodeIdCondition;
            //alert('Query : ' + Query);
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.GetInCompleteAprovedDCByTemplates");

            var result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            //alert('result : ' + JSON.stringify(result));
            OneViewConsole.DataLog("Response from db : " + result, "DcApprovalDAO.GetInCompleteAprovedDCByTemplates");
            OneViewConsole.Debug("GetInCompleteAprovedDCByTemplates end", "DcApprovalDAO.GetInCompleteAprovedDCByTemplates");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.GetInCompleteAprovedDCByTemplates", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.GetTemplateWiseInCompleteAprovedDC = function (TemplateNodeId) {

        try {
            OneViewConsole.Debug("GetTemplateWiseInCompleteAprovedDC start", "DcApprovalDAO.GetTemplateWiseInCompleteAprovedDC");

            var Query = "SELECT TemplateNodeId, IsOnDeviceApprovalFinished , ApprovalStatus from DataCaptureEntity WHERE ApprovalStatus > 0 AND IsOnDeviceApprovalFinished != 'true' AND TemplateNodeId = " + TemplateNodeId;
            
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.GetTemplateWiseInCompleteAprovedDC");

            var result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DcApprovalDAO.GetTemplateWiseInCompleteAprovedDC");
            OneViewConsole.Debug("GetTemplateWiseInCompleteAprovedDC end", "DcApprovalDAO.GetTemplateWiseInCompleteAprovedDC");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.GetTemplateWiseInCompleteAprovedDC", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.GetPartialAprovedDCByTemplateList = function (TemplateNodeIdCondition) {

        try {
            OneViewConsole.Debug("GetPartialAprovedDCByTemplateList start", "DcApprovalDAO.GetPartialAprovedDCByTemplateList");

            var Query = "SELECT TemplateNodeId, IsOnDeviceApprovalFinished , ApprovalStatus,IsSubmit from DataCaptureEntity WHERE IsSubmit = 'true' AND IsOnDeviceApprovalFinished != 'true' AND TemplateNodeId IN " + TemplateNodeIdCondition;
            
            //alert('Query : ' + Query);
            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.GetPartialAprovedDCByTemplateList");

            var result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            //alert('GetPartialAprovedDCByTemplateList result  : ' + JSON.stringify(result));
            OneViewConsole.DataLog("Response from db : " + result, "DcApprovalDAO.GetPartialAprovedDCByTemplateList");
            OneViewConsole.Debug("GetPartialAprovedDCByTemplateList end", "DcApprovalDAO.GetPartialAprovedDCByTemplateList");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.GetPartialAprovedDCByTemplateList", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.GetPartialAprovedDCByAllDimensions = function (FilterParam) {

        try {
            OneViewConsole.Debug("GetPartialAprovedDCByAllDimensions start", "DcApprovalDAO.GetPartialAprovedDCByAllDimensions");
            
            var Incondition = "(";

            for (var i = 0; i < FilterParam.TemplateNodeIdList.length; i++) {
                Incondition += FilterParam.TemplateNodeIdList[i].Id;
                Incondition += (i <= FilterParam.TemplateNodeIdList.length - 2) ? "," : ")";
            }

            var Query = "Select count(*) as DcCount from DataCaptureEntity " +
                        "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                        "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                        " AND DataCaptureEntity.TemplateNodeId IN " + Incondition +
                        " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")" +
                        " AND (DataCaptureEntity.DcPlaceDimension = " + FilterParam.DcPlaceDimension + " OR -1=" + FilterParam.DcPlaceDimension + ")" +
                        " AND (DcResultsEntity.SystemUserId = " + FilterParam.DcUserId + " OR -1=" + FilterParam.DcUserId + ")" +
                        " AND (DataCaptureEntity.IsSubmit = 'true') AND (DataCaptureEntity.IsOnDeviceApprovalFinished != 'true')";

            //alert('Query :' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetPartialAprovedDCByAllDimensions");

            var DcCount = ExcecuteSqlReader(Query);
            //alert('DcCount  : ' + JSON.stringify(DcCount));

            OneViewConsole.Debug("GetPartialAprovedDCByAllDimensions end", "DcApprovalDAO.GetPartialAprovedDCByAllDimensions");

            return DcCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.GetPartialAprovedDCByAllDimensions", Excep);
        }
        finally {
            Query = null;
            DcCount = null;
        }
    }


    var ExcecuteSqlReader = function (Query) {

        try {
            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.ExcecuteSqlReader", Excep);
        }
        finally {
            result = null;
        }
    }

}

function DcApprovalHistoryDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetPerivousApprovalStatus = function (Req) {

        try {
            OneViewConsole.Debug("GetPerivousApprovalStatus start", "DcApprovalDAO.GetPerivousApprovalStatus");

            var Query = "Select * From DcApprovalHistoryEntity Where  DcApprovalId='" + Req.DcApprovalId + "' order by Id desc";

            OneViewConsole.Debug("Requested Query : " + Query, "DcApprovalDAO.GetUserMasterEntityPin");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Result, "DcApprovalDAO.GetPerivousApprovalStatus");

            OneViewConsole.Debug("GetPerivousApprovalStatus end", "DcApprovalDAO.GetPerivousApprovalStatus");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcApprovalDAO.GetPerivousApprovalStatus", Excep);
        }
        finally {
            Query = null;
          
        }
    }
}