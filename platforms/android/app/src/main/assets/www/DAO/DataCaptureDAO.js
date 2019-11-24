
function DcDAO() {

    var MyInstance = this;  

    this.GetTotalCompletedAuditCount = function (ServiceId, UserId, TemplateNodeId, DCPlaceId, DcPlaceName) {
        try {
            OneViewConsole.Debug("GetTotalCompletedAuditCount start", "DcDAO.GetTotalCompletedAuditCount");
            
            var Query = "";

            if (DCPlaceId > 0) {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity " +
                "WHERE IsForAction != 'true' AND IsForHistory != 'true' AND ServiceId=" + ServiceId + " AND DcPlaceId=" + DCPlaceId + " AND TemplateNodeId=" + TemplateNodeId + " AND IsCompleted='true'";
            }
            else {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity " +
                "WHERE IsForAction != 'true' AND IsForHistory != 'true' AND ServiceId=" + ServiceId + " AND DcPlaceName='" + DcPlaceName + "' AND TemplateNodeId=" + TemplateNodeId + " AND IsCompleted='true'";
            }

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetTotalCompletedAuditCount");

            var results = window.OneViewSqlite.excecuteSqlReader(Query);
            results = JSON.parse(results);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(results), "DcDAO.GetTotalCompletedAuditCount");
            OneViewConsole.Debug("GetTotalCompletedAuditCount end", "DcDAO.GetTotalCompletedAuditCount");

            return results[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetTotalCompletedAuditCount", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.GetTotalCompletedAuditCountForIncidentReport = function (ServiceId, UserId, TemplateNodeId, DCPlaceId, DcPlaceName) {
        try {
            OneViewConsole.Debug("GetTotalCompletedAuditCountForIncidentReport start", "DcDAO.GetTotalCompletedAuditCountForIncidentReport");

            var Query = "";

            if (DCPlaceId > 0) {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity INNER JOIN DcResultsEntity ON DcResultsEntity.DataCaptureId = DataCaptureEntity.Id " +
               "WHERE DataCaptureEntity.IsForAction != 'true' AND DataCaptureEntity.IsForHistory != 'true' AND DataCaptureEntity.ServiceId=" + ServiceId + " AND DataCaptureEntity.DcPlaceId=" + DCPlaceId + " AND DataCaptureEntity.IsCompleted = 'true' AND DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + " AND DcResultsEntity.SystemUserId=" + UserId;
            }
            else {
               Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity INNER JOIN DcResultsEntity ON DcResultsEntity.DataCaptureId = DataCaptureEntity.Id " +
              "WHERE DataCaptureEntity.IsForAction != 'true' AND DataCaptureEntity.IsForHistory != 'true' AND DataCaptureEntity.ServiceId=" + ServiceId + " AND DataCaptureEntity.DcPlaceName='" + DcPlaceName + "' AND DataCaptureEntity.IsCompleted = 'true' AND DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + " AND DcResultsEntity.SystemUserId=" + UserId;
            }

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetTotalCompletedAuditCountForIncidentReport");

            var results = window.OneViewSqlite.excecuteSqlReader(Query);
            results = JSON.parse(results);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(results), "DcDAO.GetTotalCompletedAuditCountForIncidentReport");
            OneViewConsole.Debug("GetTotalCompletedAuditCountForIncidentReport end", "DcDAO.GetTotalCompletedAuditCountForIncidentReport");

            return results[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetTotalCompletedAuditCountForIncidentReport", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.GetTotalAuditCount = function (ServiceId, UserId, TemplateNodeId, DCPlaceId, DcPlaceName) {
        try {
            OneViewConsole.Debug("GetTotalAuditCount start", "DcDAO.GetTotalAuditCount");

            var Query = "";

            if (DCPlaceId > 0) {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity " +
                "WHERE IsForAction != 'true' AND IsForHistory != 'true' AND ServiceId=" + ServiceId + " AND DcPlaceId=" + DCPlaceId + " AND TemplateNodeId=" + TemplateNodeId;
            }
            else {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity " +
                "WHERE IsForAction != 'true' AND IsForHistory != 'true' AND ServiceId=" + ServiceId + " AND DcPlaceName='" + DcPlaceName + "' AND TemplateNodeId=" + TemplateNodeId;
            }

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetTotalAuditCount");

            var results = window.OneViewSqlite.excecuteSqlReader(Query);
            results = JSON.parse(results);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(results), "DcDAO.GetTotalAuditCount");
            OneViewConsole.Debug("GetTotalAuditCount end", "DcDAO.GetTotalAuditCount");

            return results[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetTotalAuditCount", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.GetTotalAuditCountForIncidentReport = function (ServiceId, UserId, TemplateNodeId, DCPlaceId, DcPlaceName) {
        try {
            OneViewConsole.Debug("GetTotalAuditCountForIncidentReport start", "DcDAO.GetTotalAuditCountForIncidentReport");

            var Query = "";

            if (DCPlaceId > 0) {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity INNER JOIN DcResultsEntity ON DcResultsEntity.DataCaptureId = DataCaptureEntity.Id " +
                "WHERE DataCaptureEntity.IsForAction != 'true' AND DataCaptureEntity.IsForHistory != 'true' AND DataCaptureEntity.ServiceId=" + ServiceId + " AND DataCaptureEntity.DcPlaceId=" + DCPlaceId + " AND DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + " AND DcResultsEntity.SystemUserId=" + UserId;
            }
            else {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity INNER JOIN DcResultsEntity ON DcResultsEntity.DataCaptureId = DataCaptureEntity.Id " +
                "WHERE DataCaptureEntity.IsForAction != 'true' AND DataCaptureEntity.IsForHistory != 'true' AND DataCaptureEntity.ServiceId=" + ServiceId + " AND DataCaptureEntity.DcPlaceName='" + DcPlaceName + "' AND DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + " AND DcResultsEntity.SystemUserId=" + UserId;
            }
         
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetTotalAuditCountForIncidentReport");

            var results = window.OneViewSqlite.excecuteSqlReader(Query);
            results = JSON.parse(results);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(results), "DcDAO.GetTotalAuditCountForIncidentReport");
            OneViewConsole.Debug("GetTotalAuditCountForIncidentReport end", "DcDAO.GetTotalAuditCountForIncidentReport");

            return results[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetTotalAuditCountForIncidentReport", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.GetTotalNCCount = function (ServiceId, UserId, TemplateNodeId, DCPlaceId, DcPlaceName) {
        try {
            OneViewConsole.Debug("GetTotalNCCount start", "DcDAO.GetTotalNCCount");

            var Query = "";

            if (DCPlaceId > 0) {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity " +
                "WHERE IsForAction != 'true' AND IsForHistory != 'true' AND ServiceId=" + ServiceId + " AND DcPlaceId=" + DCPlaceId + " AND TemplateNodeId=" + TemplateNodeId + " AND DataCaptureEntity.IsAnyNC = 'true'";
            }
            else {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity " +
                "WHERE IsForAction != 'true' AND IsForHistory != 'true' AND ServiceId=" + ServiceId + " AND DcPlaceName='" + DcPlaceName + "' AND TemplateNodeId=" + TemplateNodeId + " AND DataCaptureEntity.IsAnyNC = 'true'";
            }

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetTotalNCCount");

            var results = window.OneViewSqlite.excecuteSqlReader(Query);
            results = JSON.parse(results);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(results), "DcDAO.GetTotalNCCount");
            OneViewConsole.Debug("GetTotalNCCount end", "DcDAO.GetTotalNCCount");

            return results[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetTotalNCCount", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.GetTotalNCCountForIncidentReport = function (ServiceId, UserId, TemplateNodeId, DCPlaceId, DcPlaceName) {
        try {
            OneViewConsole.Debug("GetTotalNCCountForIncidentReport start", "DcDAO.GetTotalNCCountForIncidentReport");

            var Query = "";

            if (DCPlaceId > 0) {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity INNER JOIN DcResultsEntity ON DcResultsEntity.DataCaptureId = DataCaptureEntity.Id " +
                "WHERE DataCaptureEntity.IsForAction != 'true' AND DataCaptureEntity.IsForHistory != 'true' AND DataCaptureEntity.ServiceId=" + ServiceId + " AND DataCaptureEntity.DcPlaceId=" + DCPlaceId + " AND DataCaptureEntity.IsAnyNC = 'true' AND DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + " AND DcResultsEntity.SystemUserId=" + UserId;
            }
            else {
                Query = "SELECT count(DataCaptureEntity.Id) As TotalRecords FROM  DataCaptureEntity INNER JOIN DcResultsEntity ON DcResultsEntity.DataCaptureId = DataCaptureEntity.Id " +
                "WHERE DataCaptureEntity.IsForAction != 'true' AND DataCaptureEntity.IsForHistory != 'true' AND DataCaptureEntity.ServiceId=" + ServiceId + " AND DataCaptureEntity.DcPlaceName='" + DcPlaceName + "' AND DataCaptureEntity.IsAnyNC = 'true' AND DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + " AND DcResultsEntity.SystemUserId=" + UserId;
            }
          
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetTotalNCCountForIncidentReport");

            var results = window.OneViewSqlite.excecuteSqlReader(Query);
            results = JSON.parse(results);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(results), "DcDAO.GetTotalNCCountForIncidentReport");
            OneViewConsole.Debug("GetTotalNCCountForIncidentReport end", "DcDAO.GetTotalNCCountForIncidentReport");

            return results[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetTotalNCCountForIncidentReport", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.GetDcResultId_DAO = function (DCId, UserId) {
        try {
            OneViewConsole.Debug("GetDcResultId_DAO start", "DcDAO.GetDcResultId_DAO");

            var query = "SELECT DISTINCT DcResultsEntity.Id AS DcResultId FROM DcResultsEntity WHERE DataCaptureId=" + DCId + " AND SystemUserId=" + UserId + "";

            OneViewConsole.DataLog("Requested Query : " + query, "DcDAO.GetDcResultId_DAO");

            var queryResult = window.OneViewSqlite.excecuteSqlReader(query);
            var result = JSON.parse(queryResult);
            var DcResultId = 0;
            if (result.length > 0) {
                DcResultId = result[0].DcResultId;
            }

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetDcResultId_DAO");
            OneViewConsole.Debug("GetDcResultId_DAO end", "DcDAO.GetDcResultId_DAO");

            return DcResultId;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcResultId_DAO", Excep);
        }
        finally {
            query = null;
            queryResult = null;
            result = null;
            DcResultId = null;
        }
    }
   
    this.GetDcResults_DAO = function (DCId) {
        try {
            OneViewConsole.Debug("GetDcResults_DAO start", "DcDAO.GetDcResults_DAO");

            var query = "SELECT * FROM DcResultsEntity WHERE DataCaptureId=" + DCId + "";

            OneViewConsole.DataLog("Requested Query : " + query, "DcDAO.GetDcResults_DAO");

            var queryResult = window.OneViewSqlite.excecuteSqlReader(query);
            var result = JSON.parse(queryResult);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetDcResults_DAO");
            OneViewConsole.Debug("GetDcResults_DAO end", "DcDAO.GetDcResults_DAO");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcResults_DAO", Excep);
        }
        finally {
            query = null;
            queryResult = null;
            result = null;
        }
    }

    this.GetDcResultDetails_DAO = function (DcId, UserId) {
        try {
            OneViewConsole.Debug("GetDcResultDetails_DAO start", "DcDAO.GetDcResultDetails_DAO");

            var query = "SELECT DcResultDetailsEntity.ClientGuid AS ClientGuid,DcResultDetailsEntity.Answer AS Answer,DcResultDetailsEntity.Id AS Id , DcResultDetailsEntity.AttributeNodeId AS AttributeNodeId,DcResultsEntity.Id AS DataResultsId,DcResultDetailsEntity.ControlId AS ControlId,IndexId FROM DcResultsEntity INNER JOIN DcResultDetailsEntity ON DcResultsEntity.Id=DcResultDetailsEntity.DataResultsId WHERE DcResultsEntity.DataCaptureId=" + DcId + " AND DcResultsEntity.SystemUserId=" + UserId + "";

            OneViewConsole.DataLog("Requested Query : " + query, "DcDAO.GetDcResultDetails_DAO");
            
            var queryResult = window.OneViewSqlite.excecuteSqlReader(query);
            queryResult = JSON.parse(queryResult);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(queryResult), "DcDAO.GetDcResultDetails_DAO");
            OneViewConsole.Debug("GetDcResultDetails_DAO end", "DcDAO.GetDcResultDetails_DAO");

            return queryResult;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcResultDetails_DAO", Excep);
        }
        finally {
            query = null;
            queryResult = null;
        }
    }

    this.UpdateDcResultDetails = function (UpdateData) {
        try {
            OneViewConsole.Debug("UpdateDcResultDetails start", "DcDAO.UpdateDcResultDetails");

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();         

            for (var i = 0; i < UpdateData.length; i++) { 
            	if(UpdateData[i].Answer==null)
            	{
            		UpdateData[i].Answer='';
            	}
            	else if(UpdateData[i].AnswerValue==null)   
            	{
            		UpdateData[i].AnswerValue='';
            	}         
            	var query = "UPDATE DcResultDetailsEntity SET Answer='" + UpdateData[i].Answer + "',AnswerValue='" + UpdateData[i].AnswerValue + "' ,IsSynchronized='false',LastUpdatedDate ='" + CurrenntDateAndTime + "'  WHERE Id=" + UpdateData[i].Id + "";

            	OneViewConsole.DataLog("Requested Query : " + query, "DcDAO.UpdateDcResultDetails");

            	var queryResult = window.OneViewSqlite.excecuteSql(query);

            }         
            OneViewConsole.Debug("UpdateDcResultDetails end", "DcDAO.UpdateDcResultDetails");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateDcResultDetails", Excep);
        }
        finally {
            _DateTime = null;
            CurrenntDateAndTime = null;
            query = null;
            queryResult = null;
        }
    }

    this.UpdateDcResultDetails_Obj = function (Answer, AnswerValue, Id, Latitude, Longitude, IsDisable, IndexId)
    {
        try {
            OneViewConsole.Debug("UpdateDcResultDetails_Obj start", "DcDAO.UpdateDcResultDetails_Obj");

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();
            if (Answer == null) {
                Answer = '';
            }
            else if (AnswerValue == null) {
                AnswerValue = '';
            }

            var QueryToAppend = "";
            if (IsDisable != undefined && IndexId != undefined) {
                QueryToAppend = ", IsDisable = '" + IsDisable + "' , IndexId = " + IndexId;
            }
            else if (IsDisable != undefined) {
                QueryToAppend = " IsDisable = '" + IsDisable + "'";
            }
            else if (IndexId != undefined) {
                QueryToAppend = " IndexId = " + IndexId;
            }
            
            var query = "UPDATE DcResultDetailsEntity SET Answer='" + Answer + "',AnswerValue='" + AnswerValue + "' ,LastUpdatedDate ='" + CurrenntDateAndTime + "',IsSynchronized='false',Latitude ='" + Latitude + "',Longitude ='" + Longitude + "' " + QueryToAppend  + "  WHERE Id=" + Id + "";
            //alert(' query : ' + query);
            OneViewConsole.DataLog("Requested Query : " + query, "DcDAO.UpdateDcResultDetails_Obj");

            var queryResult = window.OneViewSqlite.excecuteSql(query);

            OneViewConsole.Debug("UpdateDcResultDetails_Obj end", "DcDAO.UpdateDcResultDetails_Obj");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateDcResultDetails_Obj", Excep);
        }
        finally {
            _DateTime = null;
            CurrenntDateAndTime = null;
            query = null;
            queryResult = null;
        }
    }

    this.GetDCResultDetailsByDCId_DAO = function (DCId) {
        try {
            OneViewConsole.Debug("GetDCResultDetailsByDCId_DAO start", "DcDAO.GetDCResultDetailsByDCId_DAO");

            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId , DataCaptureEntity.ClientGuid AS DataCaptureClientGuid, DcResultsEntity.Id  AS DcResultsId ,Drds1.Id AS DcResultDetailsId ,Drds1.IndexId AS IndexId, DcResultsEntity.SystemUserId AS SystemUserId ," +

                                     "CAST( Drds1.AttributeNodeId AS integer)  AS AttributeNodeId , Drds1.ControlId AS ControlId, Drds1.AttributeNodeName AS AttributeNodeName, Drds1.AnswerValue AS AnswerValue, Drds1.Answer AS Answer, Drds1.ClientGuid AS DcResultDetailsClientGuid, " +

                                     "Drds1.LastUpdatedDate as LastUpdatedDate  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE Drds1.IsDisable != 'true' and  DataCaptureEntity.Id =" + DCId +

            " ORDER BY AttributeNodeId,ControlId";

           // alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDCResultDetailsByDCId_DAO");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);
           // alert('result : ' + result);
            result = JSON.parse(result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetDCResultDetailsByDCId_DAO");
            OneViewConsole.Debug("GetDCResultDetailsByDCId_DAO end", "DcDAO.GetDCResultDetailsByDCId_DAO");

            return result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCResultDetailsByDCId_DAO", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.GetDCResultDetailsByDCIdForLV = function (DCId) {

        try {
            OneViewConsole.Debug("GetDCResultDetailsByDCIdForLV start", "DcDAO.GetDCResultDetailsByDCIdForLV");

            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId ,DcResultsEntity.Id  AS DcResultsId ,Drds1.Id AS DcResultDetailsId ,DcResultsEntity.SystemUserId AS SystemUserId ," +

                                     "CAST( Drds1.AttributeNodeId AS integer)  AS AttributeNodeId , Drds1.ControlId AS ControlId, Drds1.ClientGuid AS ClientGuid, Drds1.AttributeNodeName AS AttributeNodeName, Drds1.AnswerValue AS AnswerValue, Drds1.Answer AS Answer, " +

                                     "Drds1.IsManual AS IsManual, Drds1.IsDynamicAttribute AS IsDynamicAttribute, Drds1.IsDynamicAnswer AS IsDynamicAnswer, Drds1.IndexId AS IndexId, Drds1.IsMulti AS IsMulti, Drds1.AutomaticDeviceId AS AutomaticDeviceId, " +

                                     "Drds1.ServerId AS ServerId, Drds1.AnswerFKType AS AnswerFKType, Drds1.AnswerDataType AS AnswerDataType, Drds1.AnswerMode AS AnswerMode, Drds1.Comments AS Comments, Drds1.Score AS Score, Drds1.IsNA AS IsNA, Drds1.IsBlocker AS IsBlocker, " +

                                     "Drds1.MaxScore AS MaxScore, Drds1.Percentage AS Percentage, Drds1.CompletedChildCount AS CompletedChildCount, Drds1.TotalChildCount AS TotalChildCount, Drds1.CompletedAttributeCount AS CompletedAttributeCount, Drds1.TotalAttributeCount AS TotalAttributeCount, " +

                                     "Drds1.ESTTime AS ESTTime, Drds1.ActualTime AS ActualTime, Drds1.IsManualESTEnabled AS IsManualESTEnabled, " +

                                     "Drds1.LastUpdatedDate as LastUpdatedDate  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE DataCaptureEntity.Id =" + DCId +

            " ORDER BY AttributeNodeId,ControlId";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDCResultDetailsByDCIdForLV");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            result = JSON.parse(result);
            
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetDCResultDetailsByDCIdForLV");
            OneViewConsole.Debug("GetDCResultDetailsByDCIdForLV end", "DcDAO.GetDCResultDetailsByDCIdForLV");

            return result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCResultDetailsByDCIdForLV", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.GetDCResultDetails = function (Param) {

        try {
            OneViewConsole.Debug("GetDCResultDetails start", "DcDAO.GetDCResultDetails");

          
            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId ,DcResultsEntity.Id  AS DcResultsId ,Drds1.Id AS DcResultDetailsId ,DcResultsEntity.SystemUserId AS SystemUserId ," +

                                     "CAST( Drds1.AttributeNodeId AS integer)  AS AttributeNodeId , Drds1.ControlId AS ControlId, Drds1.ClientGuid AS ClientGuid, Drds1.AttributeNodeName AS AttributeNodeName, Drds1.AnswerValue AS AnswerValue, Drds1.Answer AS Answer, " +

                                     "Drds1.IsManual AS IsManual, Drds1.IsDynamicAttribute AS IsDynamicAttribute, Drds1.IsDynamicAnswer AS IsDynamicAnswer, Drds1.IndexId AS IndexId, Drds1.IsMulti AS IsMulti, Drds1.AutomaticDeviceId AS AutomaticDeviceId, " +

                                     "Drds1.ServerId AS ServerId, Drds1.AnswerFKType AS AnswerFKType, Drds1.AnswerDataType AS AnswerDataType, Drds1.AnswerMode AS AnswerMode, Drds1.Comments AS Comments, Drds1.Score AS Score, Drds1.IsNA AS IsNA, Drds1.IsBlocker AS IsBlocker, " +

                                     "Drds1.MaxScore AS MaxScore, Drds1.Percentage AS Percentage, Drds1.CompletedChildCount AS CompletedChildCount, Drds1.TotalChildCount AS TotalChildCount, Drds1.CompletedAttributeCount AS CompletedAttributeCount, Drds1.TotalAttributeCount AS TotalAttributeCount, " +

                                     "Drds1.ESTTime AS ESTTime, Drds1.ActualTime AS ActualTime, Drds1.IsManualESTEnabled AS IsManualESTEnabled, " +

                                     "Drds1.LastUpdatedDate as LastUpdatedDate  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE Drds1.IsDisable !='" + Param.IsDisable + "' AND DataCaptureEntity.Id =" + Param.DcId +

            " ORDER BY AttributeNodeId,ControlId";

            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDCResultDetails");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            result = JSON.parse(result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetDCResultDetails");
            OneViewConsole.Debug("GetDCResultDetails end", "DcDAO.GetDCResultDetails");

            return result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCResultDetails", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }
    this.GetDCResultByDCIdLstForLV = function (DCId) {

        try {
            OneViewConsole.Debug("GetDCResultDetailsByDCIdLstForLV start", "DcDAO.GetDCResultDetailsByDCIdLstForLV");

            var Incondition = "(";
            for (var i = 0; i < DCId.length; i++) {
                Incondition += DCId[i];
                Incondition += (i <= DCId.length - 2) ? "," : ")";
            }

            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId,DataCaptureEntity.TemplateNodeId AS TemplateNodeId ,DataCaptureEntity.ClientGuid AS DcClientGuid ,DcResultsEntity.Id  AS DcResultsId ,Drds1.Id AS DcResultDetailsId ,DcResultsEntity.SystemUserId AS SystemUserId ," +

                                     "CAST( Drds1.AttributeNodeId AS integer)  AS AttributeNodeId , Drds1.ControlId AS ControlId, Drds1.ClientGuid AS ClientGuid, Drds1.AttributeNodeName AS AttributeNodeName, Drds1.AnswerValue AS AnswerValue, Drds1.Answer AS Answer, " +

                                     "Drds1.IsManual AS IsManual, Drds1.IsDynamicAttribute AS IsDynamicAttribute, Drds1.IsDynamicAnswer AS IsDynamicAnswer, Drds1.IndexId AS IndexId, Drds1.IsMulti AS IsMulti, Drds1.AutomaticDeviceId AS AutomaticDeviceId, " +

                                     "Drds1.ServerId AS ServerId, Drds1.AnswerFKType AS AnswerFKType, Drds1.AnswerDataType AS AnswerDataType, Drds1.AnswerMode AS AnswerMode, Drds1.Comments AS Comments, Drds1.Score AS Score, Drds1.IsNA AS IsNA, Drds1.IsBlocker AS IsBlocker, " +

                                     "Drds1.MaxScore AS MaxScore, Drds1.Percentage AS Percentage, Drds1.CompletedChildCount AS CompletedChildCount, Drds1.TotalChildCount AS TotalChildCount, Drds1.CompletedAttributeCount AS CompletedAttributeCount, Drds1.TotalAttributeCount AS TotalAttributeCount, " +

                                     "Drds1.ESTTime AS ESTTime, Drds1.ActualTime AS ActualTime, Drds1.IsManualESTEnabled AS IsManualESTEnabled, " +

                                     "Drds1.LastUpdatedDate as LastUpdatedDate  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE DataCaptureEntity.Id IN " + Incondition;

            " ORDER BY AttributeNodeId,ControlId";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDCResultDetailsByDCIdLstForLV");
            //alert(Query);
            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            result = JSON.parse(result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetDCResultDetailsByDCIdLstForLV");
            OneViewConsole.Debug("GetDCResultDetailsByDCIdLstForLV end", "DcDAO.GetDCResultDetailsByDCIdLstForLV");

            return result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCResultDetailsByDCIdLstForLV", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    // API for create data capture
    this.Create = function(DcEntityObj, IsProfiledownload) {
        try {
            OneViewConsole.Debug("Create start", "DcDAO.Create");

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var DataCaptureEntityCount = new DefaultMasterDAO("DataCaptureEntity").Count();
            var DcResultsEntityCount = new DefaultMasterDAO("DcResultsEntity").Count();
            var DcResultDetailsEntityCount = new DefaultMasterDAO("DcResultDetailsEntity").Count();           
           
            DcEntityObj.TimeStamp = CurrenntDateAndTime;
            SetClientDocId(DcEntityObj, IsProfiledownload);

            new DefaultMasterDAO("DataCaptureEntity").Create(DcEntityObj, DataCaptureEntityCount);                     
  
            for (var i = 0; i < DcEntityObj.DcResultsEntitylist.length; i++) {

                var _DcResultsEntity = new DcResultsEntity();
             
                DcEntityObj.DcResultsEntitylist[i].DataCaptureId = DcEntityObj.Id;
              
                DcEntityObj.DcResultsEntitylist[i].TimeStamp = CurrenntDateAndTime;

                new DefaultMasterDAO("DcResultsEntity").Create(DcEntityObj.DcResultsEntitylist[i], DcResultsEntityCount);

                for (var j = 0; j < DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList.length; j++) {
                
                    DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].DataResultsId = DcEntityObj.DcResultsEntitylist[i].Id
                    DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].DataCaptureId = DcEntityObj.Id;
                   
                    DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].TimeStamp = CurrenntDateAndTime;

                    if (IsProfiledownload != true) {
                        //if Answer is MultiMediaBlobSubElements (for ex:Signature,Image,Vedio etc...)
                        if (DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].AnswerFKType == DATEntityType.MultiMediaBlobSubElements) {
                            var oMultiMediaBlobSubElementEntity = DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].Answer;
                            CreateMultiMediaBlobSubElements(oMultiMediaBlobSubElementEntity);
                            DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].Answer = oMultiMediaBlobSubElementEntity.ClientGuid;
                        }
                    }
                    
                    new DefaultMasterDAO("DcResultDetailsEntity").Create(DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j], DcResultDetailsEntityCount);

                    DcResultDetailsEntityCount += 1;
                }

                DcResultsEntityCount += 1;
            }

            OneViewConsole.Debug("Create end", "DcDAO.Create");

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.Create", Excep);
        }
        finally {
            _DateTime = null;
            CurrenntDateAndTime = null;
            DataCaptureEntityCount = null;
            DcResultsEntityCount = null;
            DcResultDetailsEntityCount = null;
        }
    }

    var SetClientDocId = function (DcEntityObj, IsProfiledownload) {

        try{           
            if (IsProfiledownload != true) {
              
                var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
                var DeviceId = OneViewLocalStorage.Get("DeviceId");
                var ClientDocId = OneViewLocalStorage.Get("ClientDocId");

                if (ClientDocId == null) {
                    OneViewLocalStorage.Save("ClientDocId", 1);
                    ClientDocId = OneViewLocalStorage.Get("ClientDocId");
                }
               
                DcEntityObj.ClientDocId = DeviceId + "_" + LoginUserId + "_" + ClientDocId;
                OneViewLocalStorage.Save("ClientDocId", parseInt(ClientDocId) + 1);
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.SetClientDocId", Excep);
        }
    }

    // API for create data capture
    this.CreateAndReturn = function (DcEntityObj, IsProfiledownload) {
        try {
            OneViewConsole.Debug("CreateAndReturn start", "DcDAO.CreateAndReturn");

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var DcInfo = { "DcId": "", "ClientGuid" : "", "DcResultsId": "", DcResultDetails: {} }
           
            var DataCaptureEntityCount = new DefaultMasterDAO("DataCaptureEntity").Count();
            var DcResultsEntityCount = new DefaultMasterDAO("DcResultsEntity").Count();
            var DcResultDetailsEntityCount = new DefaultMasterDAO("DcResultDetailsEntity").Count();

            DcEntityObj.TimeStamp = CurrenntDateAndTime;
            SetClientDocId(DcEntityObj, IsProfiledownload);

            var Dc = new DefaultMasterDAO("DataCaptureEntity").Create(DcEntityObj, DataCaptureEntityCount);
            DcInfo.DcId = Dc.Id;
            DcInfo.ClientGuid = Dc.ClientGuid;

            for (var i = 0; i < DcEntityObj.DcResultsEntitylist.length; i++) {

                var _DcResultsEntity = new DcResultsEntity();

                DcEntityObj.DcResultsEntitylist[i].DataCaptureId = DcEntityObj.Id;

                DcEntityObj.DcResultsEntitylist[i].TimeStamp = CurrenntDateAndTime;

                var DcResults = new DefaultMasterDAO("DcResultsEntity").Create(DcEntityObj.DcResultsEntitylist[i], DcResultsEntityCount);
                DcInfo.DcResultsId = DcResults.Id;
                
                for (var j = 0; j < DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList.length; j++) {
               
                    DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].DataResultsId = DcEntityObj.DcResultsEntitylist[i].Id
                    DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].DataCaptureId = DcEntityObj.Id;

                    DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].TimeStamp = CurrenntDateAndTime;

                    if (IsProfiledownload != true) {
                        //if Answer is MultiMediaBlobSubElements (for ex:Signature,Image,Vedio etc...)
                        if (DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].AnswerFKType == DATEntityType.MultiMediaBlobSubElements) {
                            var oMultiMediaBlobSubElementEntity = DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].Answer;
                            CreateMultiMediaBlobSubElements(oMultiMediaBlobSubElementEntity);
                            DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].Answer = oMultiMediaBlobSubElementEntity.ClientGuid;
                        }                       
                    }

                    var DcResultDetails = new DefaultMasterDAO("DcResultDetailsEntity").Create(DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j], DcResultDetailsEntityCount);
                    DcInfo.DcResultDetails[DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].ControlId] = { "ClientId": DcResultDetails.Id, "ClientGuid": DcResultDetails.ClientGuid };

                    DcResultDetailsEntityCount += 1;
                }

                DcResultsEntityCount += 1;
            }

            OneViewConsole.Debug("Create end", "DcDAO.CreateAndReturn");

            return DcInfo;
        }
        catch (Excep) {
            //alert(Excep);
            //alert(JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.CreateAndReturn", Excep);
            return null;
        }
        finally {
            _DateTime = null;
            CurrenntDateAndTime = null;
            DataCaptureEntityCount = null;
            DcResultsEntityCount = null;
            DcResultDetailsEntityCount = null;
        }
    }

    // API for insert data capture list (bulk insertion for profile download)
    this.InsertDCList = function (DcEntityLst) {
        try {
            OneViewConsole.Debug("InsertDCList start", "DcDAO.InsertDCList");
            
            if (DcEntityLst.length > 0) {

                var _DateTime = new DateTime();
                var CurrenntDateAndTime = _DateTime.GetDateAndTime();

                var _oDataCaptureDAO = new DefaultMasterDAO("DataCaptureEntity");
                var _oDcResultsDAO = new DefaultMasterDAO("DcResultsEntity");
                var _oDcResultDetailsDAO = new DefaultMasterDAO("DcResultDetailsEntity");

                var DataCaptureEntityCount = _oDataCaptureDAO.Count();
                var DcResultsEntityCount = _oDcResultsDAO.Count();
                var DcResultDetailsEntityCount = _oDcResultDetailsDAO.Count();

                // Get all server id's and ovguid's
                var DuplicateCheckDic = _oDataCaptureDAO.GetAllServerIdAndOVGuid();

                var ServerIdAndIdDic = _oDataCaptureDAO.GetAllServerIdAndId();
                
                for (var k = 0; k < DcEntityLst.length; k++) {

                    // Cheking this dc is already available in local db
                    //var obj = _oDataCaptureDAO.GetByServerId(DcEntityLst[k].ServerId);

                    // If its not available
                    if (DuplicateCheckDic[DcEntityLst[k].ServerId] == undefined) {

                        //DcEntityLst[k].TimeStamp = CurrenntDateAndTime;

                        _oDataCaptureDAO.Create(DcEntityLst[k], DataCaptureEntityCount, true);

                        var DcEntityObj = DcEntityLst[k];

                        for (var i = 0; i < DcEntityObj.DcResultsEntitylist.length; i++) {

                            var _DcResultsEntity = new DcResultsEntity();

                            DcEntityObj.DcResultsEntitylist[i].DataCaptureId = DcEntityObj.Id;

                            DcEntityObj.DcResultsEntitylist[i].TimeStamp = CurrenntDateAndTime;

                            _oDcResultsDAO.Create(DcEntityObj.DcResultsEntitylist[i], DcResultsEntityCount);

                            for (var j = 0; j < DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList.length; j++) {

                                DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].DataResultsId = DcEntityObj.DcResultsEntitylist[i].Id;
                                DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].DataCaptureId = DcEntityObj.Id;

                                DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].TimeStamp = CurrenntDateAndTime;

                                _oDcResultDetailsDAO.Create(DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j], DcResultDetailsEntityCount);

                                DcResultDetailsEntityCount += 1;
                            }

                            DcResultsEntityCount += 1;
                        }

                        DataCaptureEntityCount += 1;
                    }

                        // If its available, check the OVGuid
                        // If OVGuid is mismatch
                        //else if (DuplicateCheckDic[DcEntityLst[k].ServerId] != DcEntityLst[k].OVGuid) {
                        //    alert("DataCapture Updation (OVGuid mismatch) : Not implemented exception");
                        //}

                    else {
                        if (OneViewGlobalConflictResolveMode == 2) {
                            //alert("InsertDCList : " + ServerIdAndIdDic[DcEntityLst[k].ServerId]);

                            MyInstance.DeleteById(ServerIdAndIdDic[DcEntityLst[k].ServerId]);

                            _oDataCaptureDAO.Create(DcEntityLst[k], DataCaptureEntityCount, true);

                            var DcEntityObj = DcEntityLst[k];

                            for (var i = 0; i < DcEntityObj.DcResultsEntitylist.length; i++) {

                                var _DcResultsEntity = new DcResultsEntity();

                                DcEntityObj.DcResultsEntitylist[i].DataCaptureId = DcEntityObj.Id;

                                DcEntityObj.DcResultsEntitylist[i].TimeStamp = CurrenntDateAndTime;

                                _oDcResultsDAO.Create(DcEntityObj.DcResultsEntitylist[i], DcResultsEntityCount);

                                for (var j = 0; j < DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList.length; j++) {

                                    DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].DataResultsId = DcEntityObj.DcResultsEntitylist[i].Id;
                                    DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].DataCaptureId = DcEntityObj.Id;

                                    DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].TimeStamp = CurrenntDateAndTime;

                                    _oDcResultDetailsDAO.Create(DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j], DcResultDetailsEntityCount);

                                    DcResultDetailsEntityCount += 1;
                                }

                                DcResultsEntityCount += 1;
                            }

                            DataCaptureEntityCount += 1;
                        }
                    }
                }

                OneViewConsole.Debug("InsertDCList end", "DcDAO.InsertDCList");
                return true;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.InsertDCList", Excep);
        }
        finally {
            _DateTime = null;
            CurrenntDateAndTime = null;
            DataCaptureEntityCount = null;
            DcResultsEntityCount = null;
            DcResultDetailsEntityCount = null;
        }
    }

    // API for insert data capture list (bulk insertion for profile download)
    this.InsertDCListForDCCreationTool = function (DcEntityLst) {
        try {
            
            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var DataCaptureEntityCount = new DefaultMasterDAO("DataCaptureEntity").Count();
            var DcResultsEntityCount = new DefaultMasterDAO("DcResultsEntity").Count();
            var DcResultDetailsEntityCount = new DefaultMasterDAO("DcResultDetailsEntity").Count();

            for (var k = 0; k < DcEntityLst.length; k++) {

                    DcEntityLst[k].TimeStamp = CurrenntDateAndTime;

                    new DefaultMasterDAO("DataCaptureEntity").Create(DcEntityLst[k], DataCaptureEntityCount);

                    var DcEntityObj = DcEntityLst[k];

                    for (var i = 0; i < DcEntityObj.DcResultsEntitylist.length; i++) {

                        var _DcResultsEntity = new DcResultsEntity();

                        DcEntityObj.DcResultsEntitylist[i].DataCaptureId = DcEntityObj.Id;

                        DcEntityObj.DcResultsEntitylist[i].TimeStamp = CurrenntDateAndTime;

                        new DefaultMasterDAO("DcResultsEntity").Create(DcEntityObj.DcResultsEntitylist[i], DcResultsEntityCount);

                        for (var j = 0; j < DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList.length; j++) {

                            DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].DataResultsId = DcEntityObj.DcResultsEntitylist[i].Id;
                            DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].DataCaptureId = DcEntityObj.Id;

                            DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j].TimeStamp = CurrenntDateAndTime;

                            new DefaultMasterDAO("DcResultDetailsEntity").Create(DcEntityObj.DcResultsEntitylist[i].DcResultDetailsEntityList[j], DcResultDetailsEntityCount);

                            DcResultDetailsEntityCount += 1;
                        }

                        DcResultsEntityCount += 1;
                    }

                    DataCaptureEntityCount += 1;              
            }

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.InsertDCListForDCCreationTool", Excep);
        }
        finally {
            _DateTime = null;
            CurrenntDateAndTime = null;
            DataCaptureEntityCount = null;
            DcResultsEntityCount = null;
            DcResultDetailsEntityCount = null;
        }
    }

    var CreateMultiMediaBlobSubElements = function (oMultiMediaBlobSubElementEntity)
    {
        try {
            OneViewConsole.Debug("CreateMultiMediaBlobSubElements start", "DcDAO.CreateMultiMediaBlobSubElements");

            var MultiMediaBlobSubElementsDAO = new DefaultMasterDAO("MultiMediaBlobSubElements"); // .Count();
            MultiMediaBlobSubElementsDAO.CreateMaster(oMultiMediaBlobSubElementEntity);

            OneViewConsole.Debug("CreateMultiMediaBlobSubElements end", "DcDAO.CreateMultiMediaBlobSubElements");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.CreateMultiMediaBlobSubElements", Excep);
        }
        finally {
            MultiMediaBlobSubElementsDAO = null;
        }
    }

    this.UpdateDCViewResult = function(DataDto) {
        try {
            OneViewConsole.Debug("UpdateDCViewResult start", "DcDAO.UpdateDCViewResult");

            for (var i = 0; i < DataDto.length; i++) {
                var Query = "UPDATE DcResultDetailsEntity SET AnswerValue = '" + DataDto[i].AnswerValue + "' where Id = " + DataDto[i].Id;

                OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.UpdateDCViewResult");

                ExcecuteSql(Query);
            }

            OneViewConsole.Debug("UpdateDCViewResult end", "DcDAO.UpdateDCViewResult");

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateDCViewResult", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateDCResults = function (_oDcResultsEntity, CurrentDateAndTime) {
        try {
            OneViewConsole.Debug("UpdateDCResults start", "DcDAO.UpdateDCResults");

            var Query = "UPDATE DcResultsEntity SET ShiftName = '" + _oDcResultsEntity.ShiftName + "', ShiftId = " + _oDcResultsEntity.ShiftId + " , LastUpdatedDate = '" + CurrentDateAndTime + "' where Id = " + _oDcResultsEntity[0].Id;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.UpdateDCResults");

            ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateDCResults end", "DcDAO.UpdateDCResults");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateDCResults", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateDc = function(DCSyncStatusDTOlst) {
        try {
            OneViewConsole.Debug("UpdateDc start", "DcDAO.UpdateDc");

            for (var i = 0; i < DCSyncStatusDTOlst.length; i++) {

                //UpdateSynchronizedFalgById(DCSyncStatusDTOlst[i].Id, DCSyncStatusDTOlst[i].ServerId, "DataCaptureEntity");
                UpdateDcUploadStatus(DCSyncStatusDTOlst[i]);

                var DCSyncResultStatusDTO = DCSyncStatusDTOlst[i].DCSyncResultStatusDTO;

                //alert(DCSyncResultStatusDTO.length);

                for (var j = 0; j < DCSyncResultStatusDTO.length; j++) {

                    UpdateSynchronizedFalgById(DCSyncResultStatusDTO[j].Id, DCSyncResultStatusDTO[j].ServerId, "DcResultsEntity");

                    var DCSyncResultDetailsDTO = DCSyncResultStatusDTO[j].DCSyncResultDetailsDTOLst;

                    //alert(DCSyncResultDetailsDTO.length);

                    for (var k = 0; k < DCSyncResultDetailsDTO.length; k++) {

                        UpdateSynchronizedFalgById(DCSyncResultDetailsDTO[k].Id, DCSyncResultDetailsDTO[k].ServerId, "DcResultDetailsEntity");
                    }
                }
            }

            OneViewConsole.Debug("UpdateDc end", "DcDAO.UpdateDc");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateDc", Excep);
        }
        finally {
            DCSyncResultStatusDTO = null;
            DCSyncResultDetailsDTO = null;
        }
    }

    var UpdateDcUploadStatus = function (oDCSyncStatusDTO) {
        try {
            OneViewConsole.Debug("UpdateDcUploadStatus start", "DcDAO.UpdateDcUploadStatus");

            var CuurentDateTime = new DateTime().GetDateAndTime();

            var Query = "UPDATE DataCaptureEntity SET " +

                            "ServerId = " + oDCSyncStatusDTO.ServerId + ", "+

                            "ProcessCount = 0, " +
                            "IsSynchronized = 'true',  " +

                            "LastsyncDate = '" + CuurentDateTime + "', "+
                            "TimeStamp = '" + CuurentDateTime + "', " +

                            "ServerValidationStatus = " + oDCSyncStatusDTO.ValidationStatus + ", " +
                            "ServerValidationCode = '" + oDCSyncStatusDTO.ValidationCode + "', " +
                            "ServerValidationMessage = '" + oDCSyncStatusDTO.ValidationMessage + "', " +
                            "ServerValidationDate = '" + oDCSyncStatusDTO.ValidationDate + "' " +

                         "where Id = " + oDCSyncStatusDTO.Id;

            //alert(Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.UpdateDcUploadStatus");

            ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateDcUploadStatus end", "DcDAO.UpdateDcUploadStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateDcUploadStatus", Excep);
        }
        finally {
            CuurentDateTime = null;
            Query = null;
        }
    }

    this.UpdateDynamicAnswers = function(ClientServerDTO) {
        try {
            OneViewConsole.Debug("UpdateDynamicAnswers start", "DcDAO.UpdateDynamicAnswers");

            var CuurentDateTime = new DateTime().GetDateAndTime();

            for (var i = 0; i < ClientServerDTO.length; i++) {

                var Query = "UPDATE DcResultDetailsEntity SET ProcessCount = 0, IsSynchronized = 'true', LastsyncDate = '" + CuurentDateTime +
                        "', TimeStamp = '" + CuurentDateTime + "', Answer = '" + ClientServerDTO[i].ServerId + "' where Answer = '" + ClientServerDTO[i].ClientGuid + "'";

                //alert(Query);

                ExcecuteSql(Query);

                OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.UpdateDynamicAnswers");
            }

            OneViewConsole.Debug("UpdateDynamicAnswers end", "DcDAO.UpdateDynamicAnswers");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateDynamicAnswers", Excep);
        }
        finally {
            CuurentDateTime = null;
            Query = null;
        }
    }

    this.UpdateDCIsCompletedStatus = function (DCId, IsCompleted, CurrenntDateAndTime) {
        try {
            OneViewConsole.Debug("UpdateDCIsCompletedStatus start", "DcDAO.UpdateDCIsCompletedStatus");

            var Query = "UPDATE DataCaptureEntity SET IsCompleted ='" + IsCompleted + "', TimeStamp='" + CurrenntDateAndTime + "', IsSynchronized='false' where Id = " + DCId;          

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.UpdateDCIsCompletedStatus");

            ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateDCIsCompletedStatus end", "DcDAO.UpdateDCIsCompletedStatus");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateDCIsCompletedStatus", Excep);
        }
        finally {
            Query = null;
        }
    }

    var UpdateSynchronizedFalgByIds = function (ClientServerDTO, TableName) {
        try {
            OneViewConsole.Debug("UpdateSynchronizedFalgByIds start", "DcDAO.UpdateSynchronizedFalgByIds");

            var CuurentDateTime = new DateTime().GetDateAndTime();

            for (var i = 0; i < ClientServerDTO.length; i++) {
                UpdateSynchronizedFalgById(ClientServerDTO.Id, ClientServerDTO.ServerId, TableName);
            }

            OneViewConsole.Debug("UpdateSynchronizedFalgByIds end", "DcDAO.UpdateSynchronizedFalgByIds");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateSynchronizedFalgByIds", Excep);
        }
        finally {
            CuurentDateTime = null;
        }
    }

    var UpdateSynchronizedFalgById = function (ClientId, ServerId, TableName) {
        try {
            OneViewConsole.Debug("UpdateSynchronizedFalgById start", "DcDAO.UpdateSynchronizedFalgById");

            var CuurentDateTime = new DateTime().GetDateAndTime();

            var Query = "UPDATE " + TableName + " SET ServerId = " + ServerId + ", ProcessCount = 0, IsSynchronized = 'true',  LastsyncDate = '" + CuurentDateTime + "', TimeStamp = '" + CuurentDateTime + "' where Id = " + ClientId;
            //alert(Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.UpdateSynchronizedFalgById");

            ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateSynchronizedFalgById end", "DcDAO.UpdateSynchronizedFalgById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateSynchronizedFalgById", Excep);
        }
        finally {
            CuurentDateTime = null;
            Query = null;
        }
    }

    this.ExcecuteIndexQueries = function () {

        try {
            var starttime = new Date().getTime();

            var IndexQuery_Id = "Create INDEX Id On DataCaptureEntity(Id)";
            ExcecuteSql(IndexQuery_Id);

            var IndexQuery_ServerId = "Create INDEX ServerId On DataCaptureEntity(ServerId)";
            ExcecuteSql(IndexQuery_ServerId);

            var IndexQuery_ServiceId = "Create INDEX ServiceId On DataCaptureEntity(ServiceId)";
            ExcecuteSql(IndexQuery_ServiceId);

            var IndexQuery_TemplateNodeId = "Create INDEX TemplateNodeId On DataCaptureEntity(TemplateNodeId)";
            ExcecuteSql(IndexQuery_TemplateNodeId);

            var IndexQuery_DcPlaceId = "Create INDEX DcPlaceId On DataCaptureEntity(DcPlaceId)";
            ExcecuteSql(IndexQuery_DcPlaceId);

            var IndexQuery_CreatedDate = "Create INDEX CreatedDate On DataCaptureEntity(CreatedDate)";
            ExcecuteSql(IndexQuery_CreatedDate);

            var IndexQuery_Id_DcResultsEntity = "Create INDEX DcResultsEntityId On DcResultsEntity(Id)";
            ExcecuteSql(IndexQuery_Id_DcResultsEntity);

            var IndexQuery_DataCaptureId_DcResultsEntity = "Create INDEX DcResultsEntityDataCaptureId On DcResultsEntity(DataCaptureId)";
            ExcecuteSql(IndexQuery_DataCaptureId_DcResultsEntity);

            var IndexQuery_Id_DcResultDetailsEntity = "Create INDEX DcResultDetailsEntityId On DcResultDetailsEntity(Id)";
            ExcecuteSql(IndexQuery_Id_DcResultDetailsEntity);

            var IndexQuery_DataResultsId_DcResultDetailsEntity = "Create INDEX DcResultDetailsEntityDataResultsId On DcResultDetailsEntity(DataResultsId)";
            ExcecuteSql(IndexQuery_DataResultsId_DcResultDetailsEntity);

            var IndexQuery_DataCaptureId_DcResultDetailsEntity = "Create INDEX DcResultDetailsEntityDataCaptureId On DcResultDetailsEntity(DataCaptureId)";
            ExcecuteSql(IndexQuery_DataCaptureId_DcResultDetailsEntity);

            var IndexQuery_AttributeNodeId_DcResultDetailsEntity = "Create INDEX AttributeNodeId On DcResultDetailsEntity(AttributeNodeId)";
            ExcecuteSql(IndexQuery_AttributeNodeId_DcResultDetailsEntity);

            var IndexQuery_AttributeNodeName = "Create INDEX AttributeNodeName On DcResultDetailsEntity(AttributeNodeName)";
            ExcecuteSql(IndexQuery_AttributeNodeName);

            var IndexQuery_ControlId = "Create INDEX ControlId On DcResultDetailsEntity(ControlId)";
            ExcecuteSql(IndexQuery_ControlId);

            var IndexQuery_Answer = "Create INDEX Answer On DcResultDetailsEntity(Answer)";
            ExcecuteSql(IndexQuery_Answer);

            var IndexQuery_AnswerValue = "Create INDEX AnswerValue On DcResultDetailsEntity(AnswerValue)";
            ExcecuteSql(IndexQuery_AnswerValue);

            var IndexQuery_CreatedDate = "Create INDEX DcResultDetailsEntityCreatedDate On DcResultDetailsEntity(CreatedDate)";
            ExcecuteSql(IndexQuery_CreatedDate);

            //var IndexQuery_OrderBy = "Create INDEX DcResultDetailsEntityOrderBy On DcResultDetailsEntity(CreatedDate, DataCaptureId, AttributeNodeId)";
            //ExcecuteSql(IndexQuery_OrderBy);

            var endtime = new Date().getTime();
           
            var diff = endtime - starttime;
            alert('diff :' + diff);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.ExcecuteIndexQueries", Excep);
        }
    }

    this.GetAllDcForViewRecordsNew = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetAllDcForViewRecords start", "DcDAO.GetAllDcForViewRecords");
          
            //var Query = "SELECT Id FROM DcResultDetailsEntity";

            //var Query = "SELECT * FROM (SELECT Drds1.DataCaptureId AS DataCaptureId ,DATETIME(SUBSTR(Drds1.CreatedDate, 7, 4) || '-' || SUBSTR(Drds1.CreatedDate, 4, 2) || '-' || SUBSTR(Drds1.CreatedDate, 1, 2)) AS CreatedDate ,DataCaptureEntity.IsCompleted AS IsCompleted, DataCaptureEntity.IsSynchronized AS IsSynchronized, DataCaptureEntity.IsAnyNC AS IsAnyNC, " +

            //            "DcResultsEntity.Id  AS DcResultsId ,Drds1.Id AS DcResultDetailsId ,DcResultsEntity.SystemUserId AS SystemUserId ," +

            //            "CAST( Drds1.AttributeNodeId AS integer)  AS AttributeNodeId ,  Drds1.AttributeNodeName AS AttributeNodeName, Drds1.ControlId AS ControlId, Drds1.AnswerValue AS AnswerValue, Drds1.Answer AS Answer, " +

            //            "Drds1.LastUpdatedDate as LastUpdatedDate  FROM DataCaptureEntity " +

            //            "FROM DataCaptureEntity " +

            //            "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

            //            "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

            //            "WHERE DataCaptureEntity.DcPlaceId=" + FilterParam.DcPlaceId + " AND DataCaptureEntity.TemplateNodeId =" + FilterParam.TemplateNodeId + " ";

            //"AND DataCaptureEntity.ServiceId =" + FilterParam.ServiceId;

            //Query += " ) ORDER BY CreatedDate DESC,DataCaptureId DESC,AttributeNodeId";

           
            //Query += " )";

            var Query = "Select DataCaptureEntity.Id AS Id from DataCaptureEntity " +
                        "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                        "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                        " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                        " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")" +
                        " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                        " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";

                        if (FilterParam.ApprovalStatus != false) {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                        }
                        else {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                        }
                        
                        Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                        " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                        " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
                        " LIMIT 10";
           
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllDcForViewRecords");

            var starttime = new Date().getTime();
            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            var endtime = new Date().getTime();
           // alert('endtime :' + endtime);
            var diff = endtime - starttime;
            alert('diff 12 :' + diff);

            result = JSON.parse(result);

            alert(result.length);
            var Exp = FomatForInConditionById(result);

            var Query2 = "Select DataCaptureEntity.Id AS DataCaptureId,DATETIME(SUBSTR(DataCaptureEntity.CreatedDate, 7, 4) || '-' || SUBSTR(DataCaptureEntity.CreatedDate, 4, 2) || '-' || SUBSTR(DataCaptureEntity.CreatedDate, 1, 2)) AS CreatedDate ,DataCaptureEntity.IsCompleted AS IsCompleted,DataCaptureEntity.IsAnyNC AS IsAnyNC, " +
                        "DcResultsEntity.Id  AS DcResultsId ,DcResultsEntity.Id AS DcResultDetailsId ,DcResultsEntity.SystemUserId AS SystemUserId ," +
                        "CAST( DcResultDetailsEntity.AttributeNodeId AS integer)  AS AttributeNodeId ,  DcResultDetailsEntity.AttributeNodeName AS AttributeNodeName, DcResultDetailsEntity.ControlId AS ControlId, DcResultDetailsEntity.AnswerValue AS AnswerValue, DcResultDetailsEntity.Answer AS Answer, " +
                        "Drds1.LastUpdatedDate as LastUpdatedDate  FROM DataCaptureEntity " +
                        "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                        "INNER JOIN DcResultDetailsEntity ON DcResultDetailsEntity.DataResultsId = DcResultsEntity.Id " +
                        "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                        " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                        " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")" +
                        " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                        " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";

                        if (FilterParam.ApprovalStatus != false) {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                        }
                        else {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                        }
                        
                        Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                        " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                        " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
                        " AND DataCaptureEntity.Id IN " + Exp +
                        " ORDER BY CreatedDate DESC,DataCaptureId DESC,AttributeNodeId";

            alert(Query2);

            var result2 = window.OneViewSqlite.excecuteSqlReader(Query2);

            result2 = JSON.parse(result2);
            alert(result2.length);
            
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetAllDcForViewRecords");
            OneViewConsole.Debug("GetAllDcForViewRecords end", "DcDAO.GetAllDcForViewRecords");

            return result2;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllDcForViewRecords", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.GetAllDcForViewRecords = function (FilterParam, DcInfo) {
        try {
            OneViewConsole.Debug("GetAllDcForViewRecords start", "DcDAO.GetAllDcForViewRecords");

            //TODO:16-07-2015 18:03 Need to remoce code from here and enable via view records metada,(Its a work around for EKFC dispatch release)
            var ViewRecordsOrderBy = " ORDER BY TimeStamp  DESC  ,DataCaptureId  DESC,AttributeNodeId"
            if (FilterParam.TemplateNodeId == 8272)
            {
                ViewRecordsOrderBy = " ORDER BY DataCaptureId  ASC ,AttributeNodeId"
            }

            var result = [];

            if (DcInfo.length > 0) {

                var Exp = FomatForInConditionById(DcInfo);

                var Query = "Select DataCaptureEntity.Id AS DataCaptureId ,(substr(DataCaptureEntity.TimeStamp, 7, 4) || substr(DataCaptureEntity.TimeStamp, 4, 2) || substr(DataCaptureEntity.TimeStamp, 1, 2) || substr(DataCaptureEntity.TimeStamp, 1, 2) || substr(DataCaptureEntity.TimeStamp, 12, 2) || substr(DataCaptureEntity.TimeStamp, 15, 2) || substr(DataCaptureEntity.TimeStamp, 18, 2)) AS TimeStamp ," +
                            "DataCaptureEntity.IsCompleted AS IsCompleted, DataCaptureEntity.ApprovalStatus AS ApprovalStatus, DataCaptureEntity.IsSynchronized AS IsSynchronized, DataCaptureEntity.IsAnyNC AS IsAnyNC, DataCaptureEntity.ClientDocId AS ClientDocId, DataCaptureEntity.TimeStamp AS DCLastUpdatedDate, DataCaptureEntity.DcStartDate, " +
                            "DataCaptureEntity.ServiceName AS ServiceName, DataCaptureEntity.TemplateNodeName AS TemplateNodeName, DataCaptureEntity.DcPlaceName AS DcPlaceName, DcResultsEntity.ShiftName AS ShiftName, " +
                            "DcResultsEntity.Id  AS DcResultsId ,DcResultDetailsEntity.Id AS DcResultDetailsId ,DcResultsEntity.SystemUserId AS SystemUserId ," +
                            "CAST( DcResultDetailsEntity.AttributeNodeId AS integer)  AS AttributeNodeId ,  DcResultDetailsEntity.AttributeNodeName AS AttributeNodeName, DcResultDetailsEntity.ControlId AS ControlId, DcResultDetailsEntity.AnswerValue AS AnswerValue, DcResultDetailsEntity.Answer AS Answer, DcResultDetailsEntity.AnswerDataType AS AnswerDataType, " +
                            "DcResultDetailsEntity.LastUpdatedDate as LastUpdatedDate from DataCaptureEntity " +
                           "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                           "INNER JOIN DcResultDetailsEntity ON DataCaptureEntity.Id = DcResultDetailsEntity.DataCaptureId " +
                           "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                           " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";

                           if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                               Query += " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                           }
                           else {
                               Query += " AND (DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                           }
                           
                           if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                               Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                              " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                           }
                           else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                               Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                              " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                           }
                           else if (FilterParam.IsCompleted != '-1') {
                               Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                              " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                           }
                           else {
                               Query += " AND ((DataCaptureEntity.IsSynchronized = 'true' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'true'))";
                           }

                           if (FilterParam.ApprovalStatus != false) {
                               Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                           }
                           else {
                               Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                           }

                           Query += " AND (DataCaptureEntity.IsSubmit = '" + FilterParam.IsSubmit + "' OR '-1'='" + FilterParam.IsSubmit + "')";
                           Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                           " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                           " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
                          // " AND DataCaptureEntity.Id In " + Exp + " ORDER BY TimeStamp " + ViewRecordsOrderBy + ",DataCaptureId " + ViewRecordsOrderBy + ",AttributeNodeId";
                           " AND DataCaptureEntity.Id In " + Exp + ViewRecordsOrderBy;

                           //alert('Query :' + Query);
                           OneViewConsole.DataLog("Requested Query : " + Query, "ViewRecordsDAO.GetAllDcForViewRecords");

                var DcResultDetails = window.OneViewSqlite.excecuteSqlReader(Query);

                result = JSON.parse(DcResultDetails);

                OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetAllDcForViewRecords");

                OneViewConsole.Debug("GetAllDcForViewRecords end", "DcDAO.GetAllDcForViewRecords");
            }

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllDcForViewRecords", Excep);
        }
        finally {
            Query = null;
            DcResultDetails = null;
            result = null;
        }
    }

    this.GetAllDcInfoViewRecords = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetAllDcInfoViewRecords start", "DcDAO.GetAllDcInfoViewRecords");

            var Query = "Select Distinct(DataCaptureEntity.Id), (substr(DataCaptureEntity.TimeStamp, 7, 4) || substr(DataCaptureEntity.TimeStamp, 4, 2) || substr(DataCaptureEntity.TimeStamp, 1, 2) || substr(DataCaptureEntity.TimeStamp, 1, 2) || substr(DataCaptureEntity.TimeStamp, 12, 2) || substr(DataCaptureEntity.TimeStamp, 15, 2) || substr(DataCaptureEntity.TimeStamp, 18, 2)) AS TimeStamp from DataCaptureEntity " +
                        "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                        "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                        " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";
                       
                        if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                            Query += " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                        }
                        else {
                            Query += " AND (DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                        }

                        if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else if (FilterParam.IsCompleted != '-1') {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else {
                            Query += " AND ((DataCaptureEntity.IsSynchronized = 'true' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'true'))";
                        }

                        if (FilterParam.ApprovalStatus != false) {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                        }
                        else {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                        }
                        
                        Query += " AND (DataCaptureEntity.IsSubmit = '" + FilterParam.IsSubmit + "' OR '-1'='" + FilterParam.IsSubmit + "')";
                        Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                        " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                        " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
                        " ORDER BY TimeStamp DESC";
                      
            var DcInfo = window.OneViewSqlite.excecuteSqlReader(Query);
            var result = JSON.parse(DcInfo);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetAllDcInfoViewRecords");

            OneViewConsole.Debug("GetAllDcInfoViewRecords end", "DcDAO.GetAllDcInfoViewRecords");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllDcInfoViewRecords", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
            result = null;
        }
    }

    this.GetAllDcInfoWithAttributeFilterViewRecords = function (FilterParam, DefaultExp) {
        try {
            OneViewConsole.Debug("GetAllDcInfoWithAttributeFilterViewRecords start", "DcDAO.GetAllDcInfoWithAttributeFilterViewRecords");

            var Query = "Select Distinct(DataCaptureEntity.Id) from DataCaptureEntity " +
                        "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                        "INNER JOIN DcResultDetailsEntity ON DataCaptureEntity.Id = DcResultDetailsEntity.DataCaptureId " +
                        "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                        " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";
                       
                        if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                            Query += " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                        }
                        else {
                            Query += " AND (DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                        }

                        if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else if (FilterParam.IsCompleted != '-1') {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else {
                            Query += " AND ((DataCaptureEntity.IsSynchronized = 'true' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'true'))";
                        }
                        
                        if (FilterParam.ApprovalStatus != false) {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                        }
                        else {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                        }
                        
                        Query += " AND (DataCaptureEntity.IsSubmit = '" + FilterParam.IsSubmit + "' OR '-1'='" + FilterParam.IsSubmit + "')";
                        Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                        " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                        " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")";

            Query += (DefaultExp != "" && DefaultExp != undefined) ? (" AND " + DefaultExp) : DefaultExp;
           
            var DcInfo = window.OneViewSqlite.excecuteSqlReader(Query);
            var result = JSON.parse(DcInfo);
            //alert(JSON.stringify(result));
            
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetAllDcInfoWithAttributeFilterViewRecords");

            OneViewConsole.Debug("GetAllDcInfoWithAttributeFilterViewRecords end", "DcDAO.GetAllDcInfoWithAttributeFilterViewRecords");
                       
            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllDcInfoWithAttributeFilterViewRecords", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
            result = null;
        }
    }

    this.GetAllDcInfoWithGraphSearchViewRecords = function (FilterParam, DcResultCriteriaExp, GraphSearchExp) {
        try {
            OneViewConsole.Debug("GetAllDcInfoWithGraphSearchViewRecords start", "DcDAO.GetAllDcInfoWithGraphSearchViewRecords");

            var Query = "SELECT Id FROM (SELECT dc.Id As Id,GROUP_CONCAT(drds1.AttributeNodeName) GCAttributeNodeName,GROUP_CONCAT(drds1.Answer) " +
                        "GCAnswer,GROUP_CONCAT(drds1.AnswerValue) GCAnswerValue,GROUP_CONCAT(drds1.Comments) GCComments FROM DataCaptureEntity AS dc " +
                        "INNER JOIN DcResultsEntity AS dr ON dc.Id = dr.DataCaptureId " +
                        "INNER JOIN DcResultDetailsEntity AS drds1 ON dc.Id = drds1.DataCaptureId " +
                        "where (dc.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                        " AND (dc.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";
                       
                        if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                            Query += " AND (dc.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                        }
                        else {
                            Query += " AND (dc.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                        }

                        if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                            Query += " AND (dc.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (dc.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                            Query += " AND (dc.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (dc.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else if (FilterParam.IsCompleted != '-1') {
                            Query += " AND (dc.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (dc.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else {
                            Query += " AND ((dc.IsSynchronized = 'true' AND dc.IsCompleted = 'false') OR (dc.IsSynchronized = 'false' AND dc.IsCompleted = 'false') OR (dc.IsSynchronized = 'false' AND dc.IsCompleted = 'true'))";
                        }

                        if (FilterParam.ApprovalStatus != false) {
                            Query += " AND (dc.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                        }
                        else {
                            Query += " AND (dc.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR dc.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                        }
                        
                        Query += " AND (dc.IsSubmit = '" + FilterParam.IsSubmit + "' OR '-1'='" + FilterParam.IsSubmit + "')";
                        Query += " AND (dc.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                        " AND (dr.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                        " AND (dr.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")";

            Query += (DcResultCriteriaExp != "" && DcResultCriteriaExp != undefined) ? (" AND " + DcResultCriteriaExp) : DcResultCriteriaExp;

            Query += " GROUP BY dc.Id)"; 

            Query += (GraphSearchExp != "" && GraphSearchExp != undefined) ? (" WHERE " + GraphSearchExp) : GraphSearchExp;
         
            var DcInfo = window.OneViewSqlite.excecuteSqlReader(Query);
            var result = JSON.parse(DcInfo);
            //alert(JSON.stringify(result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetAllDcInfoWithGraphSearchViewRecords");

            OneViewConsole.Debug("GetAllDcForViewRecords end", "DcDAO.GetAllDcInfoWithGraphSearchViewRecords");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllDcInfoWithGraphSearchViewRecords", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
            result = null;
        }
    }

    this.GetAllDistinctAnswersByAttributeNodeId = function (FilterParam, AttributeNodeId) {
        try {
            OneViewConsole.Debug("GetAllDistinctAnswersByAttributeNodeId start", "DcDAO.GetAllDistinctAnswersByAttributeNodeId");

            var Query = "SELECT Distinct(drds1.Answer), drds1.AnswerValue FROM DataCaptureEntity AS dc " +
                        "INNER JOIN DcResultsEntity AS dr ON dc.Id = dr.DataCaptureId " +
                        "INNER JOIN DcResultDetailsEntity AS drds1 ON dc.Id = drds1.DataCaptureId " +
                        "where (dc.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                        " AND (dc.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";

            if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                Query += " AND (dc.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
            }
            else {
                Query += " AND (dc.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
            }

            if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                Query += " AND (dc.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
               " AND (dc.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
            }
            else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                Query += " AND (dc.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
               " AND (dc.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
            }
            else if (FilterParam.IsCompleted != '-1') {
                Query += " AND (dc.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
               " AND (dc.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
            }
            else {
                Query += " AND ((dc.IsSynchronized = 'true' AND dc.IsCompleted = 'false') OR (dc.IsSynchronized = 'false' AND dc.IsCompleted = 'false') OR (dc.IsSynchronized = 'false' AND dc.IsCompleted = 'true'))";
            }

            if (FilterParam.ApprovalStatus != false) {
                Query += " AND (dc.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
            }
            else {
                Query += " AND (dc.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR dc.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
            }
            
            Query += " AND (dc.IsSubmit = '" + FilterParam.IsSubmit + "' OR '-1'='" + FilterParam.IsSubmit + "')";
            Query += " AND (dc.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
            " AND (dr.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
            " AND (dr.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
            " AND (drds1.AttributeNodeId = '" + AttributeNodeId + "')";

            var DcInfo = window.OneViewSqlite.excecuteSqlReader(Query);
            var result = JSON.parse(DcInfo);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetAllDistinctAnswersByAttributeNodeId");

            OneViewConsole.Debug("GetAllDistinctAnswersByAttributeNodeId end", "DcDAO.GetAllDistinctAnswersByAttributeNodeId");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllDistinctAnswersByAttributeNodeId", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
            result = null;
        }
    }

    this.GetAllDcForViewRecordsOld = function (oDcFilterParamRequest) {
        try {
            OneViewConsole.Debug("GetAllDcForViewRecords start", "DcDAO.GetAllDcForViewRecords");

            var Query = "SELECT * FROM (SELECT DataCaptureEntity.Id AS DataCaptureId ,DATETIME(SUBSTR(DataCaptureEntity.CreatedDate, 7, 4) || '-' || SUBSTR(DataCaptureEntity.CreatedDate, 4, 2) || '-' || SUBSTR(DataCaptureEntity.CreatedDate, 1, 2)) AS CreatedDate ,DataCaptureEntity.IsCompleted AS IsCompleted, DataCaptureEntity.IsSynchronized AS IsSynchronized, DataCaptureEntity.IsAnyNC AS IsAnyNC, " +

                        "DcResultsEntity.Id  AS DcResultsId ,Drds1.Id AS DcResultDetailsId ,DcResultsEntity.SystemUserId AS SystemUserId ," +

                        "CAST( Drds1.AttributeNodeId AS integer)  AS AttributeNodeId ,  Drds1.AttributeNodeName AS AttributeNodeName, Drds1.ControlId AS ControlId, Drds1.AnswerValue AS AnswerValue, Drds1.Answer AS Answer, " +

                        "Drds1.LastUpdatedDate as LastUpdatedDate  FROM DataCaptureEntity " +

                        "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                        "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                        "WHERE DataCaptureEntity.DcPlaceId=" + oDcFilterParamRequest.DcPlaceId + " AND DataCaptureEntity.TemplateNodeId =" + oDcFilterParamRequest.TemplateNodeId + " ";

                        "AND DataCaptureEntity.ServiceId =" + oDcFilterParamRequest.ServiceId + " AND DataCaptureEntity.IsForHistory ='false'";

            Query += ") ORDER BY CreatedDate DESC,DataCaptureId DESC,AttributeNodeId";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllDcForViewRecords");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            result = JSON.parse(result);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetAllDcForViewRecords");
            OneViewConsole.Debug("GetAllDcForViewRecords end", "DcDAO.GetAllDcForViewRecords");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllDcForViewRecords", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    // API for get all dc
    this.GetAll = function () {
        try {
            OneViewConsole.Debug("GetAll start", "DcDAO.GetAll");

            var DcList = new Array();

            DcList[0] = new DefaultMasterDAO("DataCaptureEntity").GetAllMasters();
            DcList[1] = new DefaultMasterDAO("DcResultsEntity").GetAllMasters();
            DcList[2] = new DefaultMasterDAO("DcResultDetailsEntity").GetAllMasters();

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcList), "DcDAO.GetAll");
            OneViewConsole.Debug("GetAll end", "DcDAO.GetAll");

            return NormalizeDcList(DcList);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAll", Excep);
        }
        finally {
            DcList = null;
        }
    }

    this.GetAllDcInfoWithFilterParams = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetAllDcInfoWithFilterParams start", "DcPendingTaskDAO.GetAllDcInfoWithFilterParams");

            var Query = "Select DataCaptureEntity.Id AS Id,DataCaptureEntity.ServerId AS ServerId,DataCaptureEntity.ClientGuid AS ClientGuid,DataCaptureEntity.IsAnyNC AS IsAnyNC from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                            " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")" +
                            " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                            " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')" +
                            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcPendingTaskDAO.GetAllDcInfoWithFilterParams");

            var DcInfo = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcPendingTaskDAO.GetAllDcInfoWithFilterParams");
            OneViewConsole.Debug("GetAllDcInfoWithFilterParams end", "DcPendingTaskDAO.GetAllDcInfoWithFilterParams");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.GetAllDcInfoWithFilterParams", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetAllDcInfoWithSchedule = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetAllDcInfoWithFilterParams start", "DcPendingTaskDAO.GetAllDcInfoWithFilterParams");
            var Query = "Select (SUBSTR(DataCaptureEntity.DcStartDate, 7, 4) || SUBSTR(DataCaptureEntity.DcStartDate, 4, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 1, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 12, 2) || " +
                           " SUBSTR(DataCaptureEntity.DcStartDate, 15, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 18, 2) )  AS DcDate, " +
                           "(SUBSTR(DataCaptureEntity.DcStartDate, 12, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 15, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 18, 2) ) AS DcTime ," +
                        "DataCaptureEntity.Id AS Id,DataCaptureEntity.ServerId AS ServerId,DataCaptureEntity.ClientGuid AS ClientGuid from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                            " AND( (DataCaptureEntity.DcPlaceId = '0' AND DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "') OR (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + "))" +
                            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                            " AND '" + FilterParam.SD + "'  <=  DcDate  and (  DcDate  < '" + FilterParam.ED + "' or  '' = '" + FilterParam.ED + "' ) ";
            //Todo : Coommented coz time not working when we r checking for two different days
                           // " AND ((" + FilterParam.ShiftId + " = 0 and ( DcTime  <= '" + FilterParam.FT + "' and  DcTime   < '" + FilterParam.TT + "' )) or DcResultsEntity.ShiftId= " + FilterParam.ShiftId + " )";

          //  alert('GetAllDcInfoWithSchedule Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcPendingTaskDAO.GetAllDcInfoWithFilterParams");

            var DcInfo = ExcecuteSqlReader(Query);

           // alert('DcInfo :' + JSON.stringify(DcInfo));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcPendingTaskDAO.GetAllDcInfoWithFilterParams");
            OneViewConsole.Debug("GetAllDcInfoWithFilterParams end", "DcPendingTaskDAO.GetAllDcInfoWithFilterParams");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.GetAllDcInfoWithFilterParams", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetDcCountByDcProfileAndSchedule = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetDcCountByDcProfileAndSchedule start", "DcPendingTaskDAO.GetDcCountByDcProfileAndSchedule");

            var oDateTime = new DateTime();
            FilterParam.SD = oDateTime.ConvertDateTimeToInteger(FilterParam.SD);
            FilterParam.ED = oDateTime.ConvertDateTimeToInteger(FilterParam.ED);

            var Query = "Select DataCaptureEntity.ServerId AS ServerId, DataCaptureEntity.IsCompleted as IsCompleted, DataCaptureEntity.IsSynchronized as IsSynchronized, DataCaptureEntity.IsSubmit as IsSubmit, (SUBSTR(DataCaptureEntity.DcStartDate, 7, 4) || SUBSTR(DataCaptureEntity.DcStartDate, 4, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 1, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 12, 2) || " +
                           " SUBSTR(DataCaptureEntity.DcStartDate, 15, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 18, 2) )  AS DcDate, " +
                           "(SUBSTR(DataCaptureEntity.DcStartDate, 12, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 15, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 18, 2) ) AS DcTime ," +
                        "DataCaptureEntity.Id AS Id from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                            " AND( (DataCaptureEntity.DcPlaceId = '0' AND DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "') OR (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + "))" +
                            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                            " AND '" + FilterParam.SD + "'  <=  DcDate  and (  DcDate  < '" + FilterParam.ED + "' or  '' = '" + FilterParam.ED + "' ) ";
            //Todo : Coommented coz time not working when we r checking for two different days
            // " AND ((" + FilterParam.ShiftId + " = 0 and ( DcTime  <= '" + FilterParam.FT + "' and  DcTime   < '" + FilterParam.TT + "' )) or DcResultsEntity.ShiftId= " + FilterParam.ShiftId + " )";

            //  alert('GetDcCountByDcProfileAndSchedule Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcPendingTaskDAO.GetDcCountByDcProfileAndSchedule");

            var DcInfo = ExcecuteSqlReader(Query);

            // alert('DcInfo :' + JSON.stringify(DcInfo));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcPendingTaskDAO.GetDcCountByDcProfileAndSchedule");
            OneViewConsole.Debug("GetDcCountByDcProfileAndSchedule end", "DcPendingTaskDAO.GetDcCountByDcProfileAndSchedule");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.GetDcCountByDcProfileAndSchedule", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetDcDetailsByDcProfileScheduleAndSyncStatus = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetDcDetailsByDcProfileScheduleAndSyncStatus start", "DcPendingTaskDAO.GetDcDetailsByDcProfileScheduleAndSyncStatus");

            var oDateTime = new DateTime();
            FilterParam.SD = oDateTime.ConvertDateTimeToInteger(FilterParam.SD);
            FilterParam.ED = oDateTime.ConvertDateTimeToInteger(FilterParam.ED);
            var DcServerIds = "";

            if (FilterParam.InprogressServerIds != "")
                DcServerIds += FilterParam.InprogressServerIds;

            if (FilterParam.CompletedServerIds != "") {
                DcServerIds = (DcServerIds != "" ? (DcServerIds = DcServerIds + "," + FilterParam.CompletedServerIds) : (DcServerIds += FilterParam.CompletedServerIds));
            }

            var DcServerIdsQuery = "";
            if (DcServerIds != "") {
                DcServerIdsQuery = " AND DataCaptureEntity.ServerId Not In ( " + DcServerIds + " ) ";
            }


            var Query = "Select DataCaptureEntity.IsCompleted as IsCompleted, DataCaptureEntity.IsSynchronized as IsSynchronized, DataCaptureEntity.IsSubmit as IsSubmit, (SUBSTR(DataCaptureEntity.DcStartDate, 7, 4) || SUBSTR(DataCaptureEntity.DcStartDate, 4, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 1, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 12, 2) || " +
                           " SUBSTR(DataCaptureEntity.DcStartDate, 15, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 18, 2) )  AS DcDate, " +
                           "(SUBSTR(DataCaptureEntity.DcStartDate, 12, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 15, 2) || SUBSTR(DataCaptureEntity.DcStartDate, 18, 2) ) AS DcTime ," +
                        "DataCaptureEntity.Id AS Id from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            DcServerIdsQuery +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                            " AND( (DataCaptureEntity.DcPlaceId = '0' AND DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "') OR (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + "))" +
                            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                            " AND '" + FilterParam.SD + "'  <=  DcDate  and (  DcDate  < '" + FilterParam.ED + "' or  '' = '" + FilterParam.ED + "' ) ";
            //Todo : Coommented coz time not working when we r checking for two different days
            // " AND ((" + FilterParam.ShiftId + " = 0 and ( DcTime  <= '" + FilterParam.FT + "' and  DcTime   < '" + FilterParam.TT + "' )) or DcResultsEntity.ShiftId= " + FilterParam.ShiftId + " )";

            //  alert('GetDcDetailsByDcProfileScheduleAndSyncStatus Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcPendingTaskDAO.GetDcDetailsByDcProfileScheduleAndSyncStatus");

            var DcInfo = ExcecuteSqlReader(Query);

            //alert('DcInfo :' + JSON.stringify(DcInfo));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcPendingTaskDAO.GetDcDetailsByDcProfileScheduleAndSyncStatus");
            OneViewConsole.Debug("GetDcDetailsByDcProfileScheduleAndSyncStatus end", "DcPendingTaskDAO.GetDcDetailsByDcProfileScheduleAndSyncStatus");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.GetDcCountByDcProfileAndSchedule", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetAllDcInfoWithFilters = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetAllDcInfoWithFilters start", "DcDAO.GetAllDcInfoWithFilters");

            var Query = "Select DataCaptureEntity.Id AS Id,DataCaptureEntity.ClientGuid AS ClientGuid,DataCaptureEntity.IsAnyNC AS IsAnyNC from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                            " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")" +
                            " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                            " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')" +
                            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
                            " LIMIT 50";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllDcInfoWithFilters");

            var DcInfo = ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.GetAllDcInfoWithFilters");
            OneViewConsole.Debug("GetAllDcInfoWithFilters end", "DcDAO.GetAllDcInfoWithFilters");

            return DcInfo;              
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllWithFilters", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetDCCountWithFilters = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetDCCountWithFilters start", "DcDAO.GetDCCountWithFilters");
           
            var Query = "Select Count(DataCaptureEntity.Id) As TotalCount from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";

                            if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                                Query += " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                            }
                            else {
                                Query += " AND (DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                            }
                            
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                            " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";

                            if (FilterParam.ApprovalStatus != false) {
                                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                            }
                            else {
                                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                            }
                            
                            Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")";
                            
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDCCountWithFilters");

            var DcInfo = ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.GetDCCountWithFilters");
            OneViewConsole.Debug("GetDCCountWithFilters end", "DcDAO.GetDCCountWithFilters");

            return DcInfo[0].TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCCountWithFilters", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetDCCountWithFiltersAdv = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetDCCountWithFiltersAdv start", "DcDAO.GetDCCountWithFiltersAdv");
           
            var DcPlaceExp = "";

            if (FilterParam.IsDCPlaceGroup == true) {
                DcPlaceExp = MyInstance.GetDcPlaceExpByPlaceGroup(FilterParam);                
            }

            var DcTemplateExp = "";

            if (FilterParam.IsTemplateGroup == true) {
                DcTemplateExp = MyInstance.GetDcTemplateExpByTemplateGroup(FilterParam);
            }

            var Query = "Select Count(DataCaptureEntity.Id) As TotalCount from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")";
                            //" AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";

            if (FilterParam.IsDCPlaceGroup == true && DcPlaceExp != "") {
                Query += " AND (DataCaptureEntity.DcPlaceId IN " + DcPlaceExp + ")";                
            }
            else {
                if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                    Query += " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                }
                else {
                    Query += " AND (DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                }
            }

            if (FilterParam.IsTemplateGroup == true && DcTemplateExp != "") {
                Query += " AND (DataCaptureEntity.TemplateNodeId IN " + DcTemplateExp + ")";
            }
            else {
                Query += " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";
            }

            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
            " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";

            if (FilterParam.ApprovalStatus != false) {
                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
            }
            else {
                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
            }

            Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDCCountWithFiltersAdv");

            var DcInfo = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.GetDCCountWithFiltersAdv");
            OneViewConsole.Debug("GetDCCountWithFiltersAdv end", "DcDAO.GetDCCountWithFiltersAdv");

            return DcInfo[0].TotalCount;
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCCountWithFiltersAdv", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetDcPlaceExpByPlaceGroup = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetDCCountWithFiltersAdv start", "DcDAO.GetDCCountWithFiltersAdv");

            var DcPlaceExp = "";

            if (FilterParam.IsDCPlaceGroup == true) {

                var DcPlaceChildResult = MyInstance.GetDcPlaceIdsByPlaceGroupAndDCPlaceRCOType(FilterParam.DcPlaceId, FilterParam.DCPlaceRCOType);

                if (DcPlaceChildResult.length > 0) {
                    DcPlaceExp = FomatForInConditionById(DcPlaceChildResult);
                }
            }

            return DcPlaceExp;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCCountWithFiltersAdv", Excep);
        }
        finally {         
        }
    }

    this.GetDcPlaceIdsByPlaceGroupAndDCPlaceRCOType = function (DcPlaceId, DCPlaceRCOType) {
        try {
            OneViewConsole.Debug("GetDCCountWithFiltersAdv start", "DcDAO.GetDCCountWithFiltersAdv");

            var DcPlaceChildResult = [];

            var DcPlaceQuery = "Select Left,Right from organizationAssetsNode where ServerId = " + DcPlaceId;
            var DcPlaceResult = ExcecuteSqlReader(DcPlaceQuery);

            if (DcPlaceResult.length > 0) {

                var DcPlaceChildQuery = "Select ServerId As Id from organizationAssetsNode where [Left]>=" + DcPlaceResult[0].Left + " and [Right]<=" + DcPlaceResult[0].Right + " and  childDbElementType = '" + DCPlaceRCOType + "'";
                DcPlaceChildResult = ExcecuteSqlReader(DcPlaceChildQuery);
            }

            return DcPlaceChildResult;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCCountWithFiltersAdv", Excep);
        }
        finally {
        }
    }

    this.GetDcTemplateExpByTemplateGroup = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetDcTemplateExpByTemplateGroup start", "DcDAO.GetDcTemplateExpByTemplateGroup");

            var DcTemplateExp = "";

            if (FilterParam.IsTemplateGroup == true) {

                var DcPlaceChildResult = MyInstance.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(FilterParam.TemplateNodeId, FilterParam.AttributeGroupType);

                if (DcPlaceChildResult.length > 0) {
                    DcTemplateExp = FomatForInConditionById(DcPlaceChildResult);
                }
            }

            return DcTemplateExp;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcTemplateExpByPlaceGroup", Excep);
        }
        finally {
        }
    }

    this.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType = function (TemplateNodeId, AttributeGroupType) {
        try {
            OneViewConsole.Debug("GetDcTemplateIdsByTemplateGroupAndAttributeGroupType start", "DcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType");

            var DcTemplateChildResult = [];

            var DcTemplateQuery = "Select Left,Right from TemplateNode where ServerId = " + TemplateNodeId;
            var DcTemplateResult = ExcecuteSqlReader(DcTemplateQuery);

            if (DcTemplateResult.length > 0) {

                var DcTemplateChildQuery = "Select TemplateNode.ServerId As Id,TemplateNode.ServerId As TemplateNodeId,TemplateNode.Left,TemplateNode.Right,AttributeGroupType.ServerId As AttributeGroupTypeId  from TemplateNode " +
                                        "INNER JOIN AttributeGroupMasterEntity ON TemplateNode.ChildDbElementId = AttributeGroupMasterEntity.ServerId " +
                                        "INNER JOIN AttributeGroupType ON  AttributeGroupMasterEntity.AttributeGroupTypeId = AttributeGroupType.ServerId " +
                                        "where [Left]>=" + DcTemplateResult[0].Left + " and [Right]<=" + DcTemplateResult[0].Right + " and ('-1'='" + AttributeGroupType + "' or  AttributeGroupType.ServerId = '" + AttributeGroupType + "') ";
                DcTemplateChildResult = ExcecuteSqlReader(DcTemplateChildQuery);
            }

            return DcTemplateChildResult;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType", Excep);
        }
        finally {
        }
    }

    this.GetAllDcInfoForHistoryMetaData = function (FilterParam) {

        try{
            OneViewConsole.Debug("GetAllDcInfoForHistoryMetaData start", "DcDAO.GetAllDcInfoForHistoryMetaData");

            var Query = "Select DataCaptureEntity.ServerId As ServerId,DataCaptureEntity.ClientGuid As ClientGuid,DataCaptureEntity.CreatedDate As CreatedDate,DataCaptureEntity.OVGuid As OVGuid from DataCaptureEntity" +
                            " where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                            " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                           
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllDcInfoForHistoryMetaData");

            var DcInfo = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.GetAllDcInfoForHistoryMetaData");
            OneViewConsole.Debug("GetAllDcInfoForHistoryMetaData end", "DcDAO.GetAllDcInfoForHistoryMetaData");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllDcInfoForHistoryMetaData", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetAllUnSyncDcCount = function () {
        try {
            OneViewConsole.Debug("GetAllUnSyncDcCount start", "DcDAO.GetAllUnSyncDcCount");
         
            var Query = "Select count(*) As TotalRecords from DataCaptureEntity Where IsSynchronized = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllUnSyncDcCount");

            var DcInfo = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.GetAllUnSyncDcCount");
            OneViewConsole.Debug("GetAllUnSyncDcCount end", "DcDAO.GetAllUnSyncDcCount");

            return DcInfo[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllUnSyncDcCount", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetAllUnSyncDc = function(){
        try {
            OneViewConsole.Debug("GetAllUnSyncDc start", "DcDAO.GetAllUnSyncDc");

            //var Query = "Select DISTINCT TOP 10 Id from DataCaptureEntity Where IsSynchronized = 'false'";   // for batch wise
            var Query = "Select DISTINCT Id from DataCaptureEntity Where IsSynchronized = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllUnSyncDc");

            var DcInfo = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.GetAllUnSyncDc");
            OneViewConsole.Debug("GetAllUnSyncDc end", "DcDAO.GetAllUnSyncDc");

            return MyInstance.GetDcList(DcInfo);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllUnSyncDc", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    var CreateExpressionForAttributeValueLst = function (AttributeValueLst) {
        try {
            OneViewConsole.Debug("CreateExpressionForAttributeValueLst start", "DcDAO.CreateExpressionForAttributeValueLst");

            var Expression = "";

            for (var i = 0; i < AttributeValueLst.length; i++) {
                Expression += (AttributeValueLst[i].Id != 0) ? "Answer = '" + AttributeValueLst[i].Id + "' AND AnswerValue = '" + AttributeValueLst[i].Value + "'" : "AnswerValue = '" + AttributeValueLst[i].Value + "'";
                Expression += (i <= AttributeValueLst.length - 1) ? "" : " AND ";
            }

            OneViewConsole.DataLog("CreateExpressionForAttributeValueLst Expression Formed : " + Expression, "DcDAO.CreateExpressionForAttributeValueLst");
            OneViewConsole.Debug("CreateExpressionForAttributeValueLst end", "DcDAO.CreateExpressionForAttributeValueLst");

            return Expression;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.CreateExpressionForAttributeValueLst", Excep);
        }
        finally {
            Expression = null;
        }
    }

    this.GetDCById = function (DCId) {

        try{
            OneViewConsole.Debug("GetDCById start", "DcDAO.GetDCById");

            var DcList = new Array();

            DcList[0] = ExcecuteSqlReader("Select * from DataCaptureEntity where Id = " + DCId);
            DcList[1] = ExcecuteSqlReader("Select * from DcResultsEntity where DataCaptureId = " + DCId);
            DcList[2] = ExcecuteSqlReader("Select * from DcResultDetailsEntity where DataCaptureId = " + DCId);

            var NormalizedDcList = NormalizeDcList(DcList)

            return NormalizedDcList[0];

            OneViewConsole.Debug("GetDCById end", "DcDAO.GetDCById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCById", Excep);
        }
        finally {
            DcList = null;
            NormalizedDcList = null;
        }
    }

    this.GetDCResultDetailsForInlineEdit = function (DCId) {

        try {
            OneViewConsole.Debug("GetDCById start", "DcDAO.GetDCById");
         
            return ExcecuteSqlReader("Select * from DcResultDetailsEntity where DataCaptureId = " + DCId + " ORDER BY AttributeNodeId,ControlId");
         
            OneViewConsole.Debug("GetDCById end", "DcDAO.GetDCById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCById", Excep);
        }
        finally {
            DcList = null;
            NormalizedDcList = null;
        }
    }

    this.GetRuleIdByDCIdOLD = function (DcClientGuid) {
        try {
            OneViewConsole.Debug("GetRuleIdByDCId start", "DcDAO.GetRuleIdByDCId");
            OneViewConsole.DataLog("Request DcId : " + DcClientGuid, "DcDAO.GetRuleIdByDCId");

           // var Query = "Select DCNCMapping.NCRuleId from DataCaptureEntity INNER JOIN DCNCMapping ON DataCaptureEntity.ClientGuid = DCNCMapping.DataCaptureClientGuid where DataCaptureEntity.Id =" + DcId + " AND DCNCMapping.ActionClientGuid !=''";
            var Query = "Select NCRuleId from DCNCMapping where DataCaptureClientGuid ='" + DcClientGuid + "' AND ActionClientGuid !=''";

            //alert(Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllUnSyncDc");

            var results = ExcecuteSqlReader(Query);

            //alert(JSON.stringify(results));

            OneViewConsole.DataLog("Response from db : " + results, "DcDAO.GetRuleIdByDCId");
            OneViewConsole.Debug("GetRuleIdByDCId end", "DcDAO.GetRuleIdByDCId");

            if (results.length > 0) {
                return results[0].NCRuleId;
            }
            else {
                return 0;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetRuleIdByDCId", Excep);
        }
    }

    this.GetRuleIdByDCId = function (DcClientGuid) {
        try {
            OneViewConsole.Debug("GetRuleIdByDCId start", "DcDAO.GetRuleIdByDCId");
            OneViewConsole.DataLog("Request DcId : " + DcClientGuid, "DcDAO.GetRuleIdByDCId");

            // var Query = "Select DCNCMapping.NCRuleId from DataCaptureEntity INNER JOIN DCNCMapping ON DataCaptureEntity.ClientGuid = DCNCMapping.DataCaptureClientGuid where DataCaptureEntity.Id =" + DcId + " AND DCNCMapping.ActionClientGuid !=''";
            var Query = "Select NCRuleId,RuleGroup,RuleCode,RuleName,RuleDescription,Deviatedby,ExpectedValue,TemplateNodeIds from DCNCMapping where DataCaptureClientGuid ='" + DcClientGuid + "' AND ActionClientGuid !=''";
            
            //alert(Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllUnSyncDc");

            var results = ExcecuteSqlReader(Query);

            //alert(JSON.stringify(results));

            OneViewConsole.DataLog("Response from db : " + results, "DcDAO.GetRuleIdByDCId");
            OneViewConsole.Debug("GetRuleIdByDCId end", "DcDAO.GetRuleIdByDCId");

            if (results.length > 0) {
                return { 'NCRuleId': results[0].NCRuleId, 'RuleGroup': results[0].RuleGroup, 'RuleCode': results[0].RuleCode, 'RuleName': results[0].RuleName, 'RuleDescription': results[0].RuleDescription, 'Deviatedby': results[0].Deviatedby, 'ExpectedValue': results[0].ExpectedValue, 'TemplateNodeIds': results[0].TemplateNodeIds };
            }
            else {
                return 0;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetRuleIdByDCId", Excep);
        }
    }

    this.GetDcList = function (DcInfo) {
        try {
            OneViewConsole.Debug("GetDcList start", "DcDAO.GetDcList");

            var DcList = new Array();

            if (DcInfo.length > 0) {

                OneViewConsole.DataLog("Request : " + JSON.stringify(DcInfo), "DcDAO.GetDcList");

                DcList[0] = GetDcEntitiesByDcId(DcInfo);
                DcList[1] = GetDcResultsByDcId(DcInfo);
                DcList[2] = GetDcResultDetailsByDcId(DcInfo);

                OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcList), "DcDAO.GetDcList");
                OneViewConsole.Debug("GetDcList end", "DcDAO.GetDcList");

                return NormalizeDcList(DcList);
            }
            else {
                OneViewConsole.DataLog("Request : " + JSON.stringify(DcInfo), "DcDAO.GetDcList");
                OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcList), "DcDAO.GetDcList");
                OneViewConsole.Debug("GetDcList end", "DcDAO.GetDcList");

                return DcList;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcList", Excep);
        }
        finally {
            DcList = null;
        }
    }

    this.DeleteDcResultDetailsByDcId = function (resultData) {
        try {
            OneViewConsole.Debug("DeleteDcResultDetailsByDcId start", "DcDAO.DeleteDcResultDetailsByDcId");

            var Exp = FomatForInConditionById(resultData);
         
            window.OneViewSqlite.excecuteSql("DELETE FROM DcResultDetailsEntity WHERE DataCaptureId In " + Exp);
            window.OneViewSqlite.excecuteSql("DELETE FROM DcResultsEntity WHERE DataCaptureId In " + Exp)
            window.OneViewSqlite.excecuteSql("DELETE FROM DataCaptureEntity WHERE Id In " + Exp)
            
            OneViewConsole.Debug("DeleteDcResultDetailsByDcId end", "DcDAO.DeleteDcResultDetailsByDcId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.DeleteDcResultDetailsByDcId", Excep);
        }
        finally {
            Exp = null;
        }
    }

    this.DeleteById = function (Id) {
        try {
            OneViewConsole.Debug("DeleteDcResultDetailsByDcId start", "DcDAO.DeleteDcResultDetailsByDcId");

            window.OneViewSqlite.excecuteSql("DELETE FROM DcResultDetailsEntity WHERE DataCaptureId = " + Id);
            window.OneViewSqlite.excecuteSql("DELETE FROM DcResultsEntity WHERE DataCaptureId = " + Id)
            window.OneViewSqlite.excecuteSql("DELETE FROM DataCaptureEntity WHERE Id = " + Id)

            OneViewConsole.Debug("DeleteDcResultDetailsByDcId end", "DcDAO.DeleteDcResultDetailsByDcId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.DeleteDcResultDetailsByDcId", Excep);
        }
        finally {
            Exp = null;
        }
    }

    var GetDcEntitiesByDcId = function (DcInfo) {
        try {
            OneViewConsole.Debug("GetDcEntitiesByDcId start", "DcDAO.GetDcEntitiesByDcId");
            OneViewConsole.DataLog("Request : " + JSON.stringify(DcInfo), "DcDAO.GetDcEntitiesByDcId");

            var Exp = FomatForInConditionById(DcInfo);
            var Query = "Select * from DataCaptureEntity where Id IN " + Exp;
            //alert(Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllUnSyncDc");

            var results = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + results, "DcDAO.GetDcEntitiesByDcId");
            OneViewConsole.Debug("GetDcEntitiesByDcId end", "DcDAO.GetDcEntitiesByDcId");

            return results;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcEntitiesByDcId", Excep);
        }
        finally {
            Exp = null;
            Query = null;
            results = null;
        }
    }

    var GetDcResultsByDcId = function (DcInfo) {
        try {
            OneViewConsole.Debug("GetDcResultsByDcId start", "DcDAO.GetDcResultsByDcId");
            OneViewConsole.DataLog("Request : " + JSON.stringify(DcInfo), "DcDAO.GetDcResultsByDcId");

            var Exp = FomatForInConditionById(DcInfo);
            var Query = "SELECT * FROM DcResultsEntity where DataCaptureId IN " + Exp;
            //alert(Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcResultsByDcId");

            var results = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + results, "DcDAO.GetDcResultsByDcId");
            OneViewConsole.Debug("GetDcResultsByDcId end", "DcDAO.GetDcResultsByDcId");

            return results;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcResultsByDcId", Excep);
        }
        finally {
            Exp = null;
            Query = null;
            results = null;
        }
    }

    var GetDcResultDetailsByDcId = function (DcInfo) {
        try {
            OneViewConsole.Debug("GetDcResultDetailsByDcId start", "DcDAO.GetDcResultDetailsByDcId");
            OneViewConsole.DataLog("Request : " + JSON.stringify(DcInfo), "DcDAO.GetDcResultDetailsByDcId");

            var Exp = FomatForInConditionById(DcInfo);
            var Query = "Select * from DcResultDetailsEntity where DataCaptureId IN " + Exp;
            //alert(Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcResultDetailsByDcId");

            var results = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + results, "DcDAO.GetDcResultDetailsByDcId");
            OneViewConsole.Debug("GetDcResultDetailsByDcId end", "DcDAO.GetDcResultDetailsByDcId");

            return results;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcResultDetailsByDcId", Excep);
        }
        finally {
            Exp = null;
            Query = null;
            results = null;
        }
    }

    this.GetDataCaptureByDcId = function (DCId) {
        try {
            OneViewConsole.Debug("GetDataCaptureByDcId start", "DcDAO.GetDataCaptureByDcId");
            OneViewConsole.DataLog("Request : " + JSON.stringify(DCId), "DcDAO.GetDataCaptureByDcId");

            var Query = "SELECT * from DataCaptureEntity where Id=" + DCId + "";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDataCaptureByDcId");

            var results = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + results, "DcDAO.GetDataCaptureByDcId");
            OneViewConsole.Debug("GetDataCaptureByDcId end", "DcDAO.GetDataCaptureByDcId");

            return results;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDataCaptureByDcId", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.IsProfileExists = function (DcUserId, TemplateNodeId, DcPlaceId, ServiceId) {
        try {
            OneViewConsole.Debug("IsProfileExists start", "DcDAO.IsProfileExists");
            OneViewConsole.DataLog("Request DcUserId : " + DcUserId + ",TemplateNodeId : " + TemplateNodeId + ",DcPlaceId :" + DcPlaceId, + ",ServiceId :" + ServiceId, "DcDAO.IsProfileExists");

            var GetProfiles = "Select count(*) As TotalProfiles from DcProfileEntity where DcUserId = " + DcUserId + " And TemplateNodeId = " + TemplateNodeId + " And DcPlaceId = " + DcPlaceId + " And ServiceId = " + ServiceId;

            OneViewConsole.DataLog("Requested Query : " + GetProfiles, "DcDAO.IsProfileExists");

            var ProfileInfo = ExcecuteSqlReader(GetProfiles);

            OneViewConsole.DataLog("Response from db : " + ProfileInfo, "DcDAO.IsProfileExists");
            OneViewConsole.Debug("IsProfileExists end", "DcDAO.IsProfileExists");
         
            var IsExists = (ProfileInfo[0].TotalProfiles > 0) ? true : false;

            return IsExists;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUserTemplates", Excep);
        }
        finally {
            GetProfiles = null;
            ProfileInfo = null;
            IsExists = null;
        }
    }

    this.GetUserTemplates = function (UserId, ServiceId) {//TemplateNodeName //DcPlaceName
        try {
            OneViewConsole.Debug("GetUserTemplates start", "DcDAO.GetUserTemplates");
            OneViewConsole.DataLog("Request UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetUserTemplates");

            var GetTemplates = "Select Distinct DataCaptureEntity.TemplateNodeId As TemplateNodeId,DataCaptureEntity.TemplateNodeName As TemplateNodeName From DataCaptureEntity" +
                                " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where" +
                                " DataCaptureEntity.ServiceId = " + ServiceId + //" And DcResultsEntity.SystemUserId = " + UserId +
                                " AND DataCaptureEntity.IsForHistory = 'false' AND DataCaptureEntity.IsForAction != 'true' ORDER BY DataCaptureEntity.TemplateNodeName";

            OneViewConsole.DataLog("Requested Query : " + GetTemplates, "DcDAO.GetUserTemplates");

            var TemplateInfo = ExcecuteSqlReader(GetTemplates);

            OneViewConsole.DataLog("Response from db : " + TemplateInfo, "DcDAO.GetUserTemplates");
            OneViewConsole.Debug("GetUserTemplates end", "DcDAO.GetUserTemplates");

            return TemplateInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUserTemplates", Excep);
        }
        finally {
            GetTemplates = null;
            TemplateInfo = null;
        }
    }

    this.GetUserDcPlaces = function (UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetUserDcPlaces start", "DcDAO.GetUserDcPlaces");
            OneViewConsole.DataLog("Request UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetUserDcPlaces");

            var GetDcPlaces = "Select Distinct DataCaptureEntity.DcPlaceName As DcPlaceName,DataCaptureEntity.DcPlaceId As DcPlaceId From DataCaptureEntity" +
                               " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where" +
                               " DataCaptureEntity.ServiceId = " + ServiceId + //" And DcResultsEntity.SystemUserId = " + UserId +
                               " ORDER BY DataCaptureEntity.DcPlaceName";

            OneViewConsole.DataLog("Requested Query : " + GetDcPlaces, "DcDAO.GetUserDcPlaces");

            var DcPlaceInfo = ExcecuteSqlReader(GetDcPlaces);

            OneViewConsole.DataLog("Response from db : " + DcPlaceInfo, "DcDAO.GetUserDcPlaces");
            OneViewConsole.Debug("GetUserDcPlaces end", "DcDAO.GetUserDcPlaces");
            
            return DcPlaceInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUserDcPlaces", Excep);
        }
        finally {
            GetDcPlaces = null;
            DcPlaceInfo = null;
        }
    }

    this.GetDcPlaceIdTemplateId = function (UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetUserDcPlaces start", "DcDAO.GetUserDcPlaces");
            OneViewConsole.DataLog("Request UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetUserDcPlaces");

            var GetDcPlacesTemplateID = "Select Distinct DataCaptureEntity.DcPlaceId As DcPlaceId,DataCaptureEntity.TemplateNodeId As TemplateId From DataCaptureEntity" +
                               " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where" +
                               " DataCaptureEntity.ServiceId = " + ServiceId + " And DcResultsEntity.SystemUserId = " + UserId +
                               " And DataCaptureEntity.IsSynchronized = 'true'" +
                               " ORDER BY DataCaptureEntity.DcPlaceName";

            OneViewConsole.DataLog("Requested Query : " + GetDcPlacesTemplateID, "DcDAO.GetUserDcPlaces");

            var DcPlaceTemplateIdInfo = ExcecuteSqlReader(GetDcPlacesTemplateID);

            OneViewConsole.DataLog("Response from db : " + DcPlaceTemplateIdInfo, "DcDAO.GetUserDcPlaces");
            OneViewConsole.Debug("GetUserDcPlaces end", "DcDAO.GetUserDcPlaces");

            return DcPlaceTemplateIdInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUserDcPlaces", Excep);
        }
        finally {
            GetDcPlaces = null;
            DcPlaceInfo = null;
        }
    }
    this.GetAllDcPlaceIdTemplateId = function (UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetUserDcPlaces start", "DcDAO.GetUserDcPlaces");
            OneViewConsole.DataLog("Request UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetUserDcPlaces");

            var GetDcPlacesTemplateID = "Select Distinct DataCaptureEntity.DcPlaceId As DcPlaceId,DataCaptureEntity.TemplateNodeId As TemplateId From DataCaptureEntity" +
                               " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where" +
                               " DataCaptureEntity.ServiceId = " + ServiceId + " And DcResultsEntity.SystemUserId = " + UserId +
                              // " And DataCaptureEntity.IsSynchronized = 'true'" +
                               " ORDER BY DataCaptureEntity.DcPlaceName";

            OneViewConsole.DataLog("Requested Query : " + GetDcPlacesTemplateID, "DcDAO.GetUserDcPlaces");

            var DcPlaceTemplateIdInfo = ExcecuteSqlReader(GetDcPlacesTemplateID);

            OneViewConsole.DataLog("Response from db : " + DcPlaceTemplateIdInfo, "DcDAO.GetUserDcPlaces");
            OneViewConsole.Debug("GetUserDcPlaces end", "DcDAO.GetUserDcPlaces");

            return DcPlaceTemplateIdInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUserDcPlaces", Excep);
        }
        finally {
            GetDcPlaces = null;
            DcPlaceInfo = null;
        }
    }

    this.GetDcPlacesByServiceAndTemplateId = function (ServiceId, TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetDcPlacesByServiceAndTemplateId start", "DcDAO.GetDcPlacesByServiceAndTemplateId");
            OneViewConsole.DataLog("Request ServiceId : " + ServiceId + ",TemplateNodeId :" + TemplateNodeId, "DcDAO.GetDcPlacesByServiceAndTemplateId");

            var GetDcPlaces = "Select Distinct DcPlaceName As Name,DcPlaceId As Id From DataCaptureEntity" +                             
                               " where ServiceId = " + ServiceId + " And TemplateNodeId = " + TemplateNodeId +
                               " ORDER BY DcPlaceName";

            OneViewConsole.DataLog("Requested Query : " + GetDcPlaces, "DcDAO.GetDcPlacesByServiceAndTemplateId");

            var DcPlaceInfo = ExcecuteSqlReader(GetDcPlaces);

            OneViewConsole.DataLog("Response from db : " + DcPlaceInfo, "DcDAO.GetDcPlacesByServiceAndTemplateId");
            OneViewConsole.Debug("GetDcPlacesByServiceAndTemplateId end", "DcDAO.GetDcPlacesByServiceAndTemplateId");

            return DcPlaceInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUserDcPlaces", Excep);
        }
        finally {
            GetDcPlaces = null;
            DcPlaceInfo = null;
        }
    }

    this.GetDcCountByServiceAndTemplateId = function (ServiceId, TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetDcCountByServiceAndTemplateId start", "DcDAO.GetDcCountByServiceAndTemplateId");
            OneViewConsole.DataLog("Request ServiceId : " + ServiceId + ",TemplateNodeId :" + TemplateNodeId, "DcDAO.GetDcCountByServiceAndTemplateId");

            var GetDcs = "Select count(*) As Total From DataCaptureEntity" +
                               " where ServiceId = " + ServiceId + " And TemplateNodeId = " + TemplateNodeId;

            OneViewConsole.DataLog("Requested Query : " + GetDcs, "DcDAO.GetDcCountByServiceAndTemplateId");

            var DcInfo = ExcecuteSqlReader(GetDcs);

            OneViewConsole.DataLog("Response from db : " + DcInfo, "DcDAO.GetDcCountByServiceAndTemplateId");
            OneViewConsole.Debug("GetDcCountByServiceAndTemplateId end", "DcDAO.GetDcCountByServiceAndTemplateId");

            return DcInfo[0].Total;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcCountByServiceAndTemplateId", Excep);
        }
        finally {
            GetDcs = null;
            DcInfo = null;
        }
    }

    this.GetHandoverTemplates = function (UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetHandoverTemplates start", "DcDAO.GetHandoverTemplates");
            OneViewConsole.DataLog("Request UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetHandoverTemplates");

            var GetTemplates = "Select Distinct DataCaptureEntity.TemplateNodeId As TemplateNodeId From DataCaptureEntity" +
                                " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where" +
                                " DataCaptureEntity.ServiceId = " + ServiceId + " And DcResultsEntity.SystemUserId != " + UserId;

            OneViewConsole.DataLog("Requested Query : " + GetTemplates, "DcDAO.GetHandoverTemplates");
            
            var TemplateInfo = ExcecuteSqlReader(GetTemplates);

            OneViewConsole.DataLog("Response from db : " + TemplateInfo, "DcDAO.GetHandoverTemplates");
            OneViewConsole.Debug("GetHandoverTemplates end", "DcDAO.GetHandoverTemplates");

            return TemplateInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetHandoverTemplates", Excep);
        }
        finally {
            GetTemplates = null;
            TemplateInfo = null;
        }
    }

    this.GetHandoverDcPlaces = function (UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetHandoverDcPlaces start", "DcDAO.GetHandoverDcPlaces");
            OneViewConsole.DataLog("Request UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetHandoverDcPlaces");

            var GetDcPlaces = "Select Distinct DataCaptureEntity.DcPlaceId As DcPlaceId From DataCaptureEntity" +
                               " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where" +
                               " DataCaptureEntity.ServiceId = " + ServiceId + " And DcResultsEntity.SystemUserId != " + UserId;

            OneViewConsole.DataLog("Requested Query : " + GetDcPlaces, "DcDAO.GetHandoverDcPlaces");

            var DcPlaceInfo = ExcecuteSqlReader(GetDcPlaces);

            OneViewConsole.DataLog("Response from db : " + DcPlaceInfo, "DcDAO.GetHandoverDcPlaces");
            OneViewConsole.Debug("GetHandoverDcPlaces end", "DcDAO.GetHandoverDcPlaces");

            return DcPlaceInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetHandoverDcPlaces", Excep);
        }
        finally {
            GetDcPlaces = null;
            DcPlaceInfo = null;
        }
    }

    this.GetAllRecordsCount = function (TemplateId, DcPlaceId, UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetAllRecordsCount start", "DcDAO.GetAllRecordsCount");
            OneViewConsole.DataLog("Request TemplateId : " + TemplateId + " ,DcPlaceId : " + DcPlaceId + " ,UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetAllRecordsCount");

            var Query = "Select count(DataCaptureEntity.Id) As TotalRecords From DataCaptureEntity" +
                        " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where DataCaptureEntity.TemplateNodeId = " + TemplateId +
                        " And DataCaptureEntity.ServiceId = " + ServiceId + " And DataCaptureEntity.DcPlaceId = " + DcPlaceId +
                        " And DcResultsEntity.SystemUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllRecordsCount");

            var result = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DcDAO.GetAllRecordsCount");
            OneViewConsole.Debug("GetAllRecordsCount end", "DcDAO.GetAllRecordsCount");

            return result[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllRecordsCount", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.GetPendingRecordsCount = function (TemplateId, DcPlaceId, UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetPendingRecordsCount start", "DcDAO.GetPendingRecordsCount");
            OneViewConsole.DataLog("Request TemplateId : " + TemplateId + " ,DcPlaceId : " + DcPlaceId + " ,UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetPendingRecordsCount");

            var Query = "Select count(DataCaptureEntity.Id) As TotalRecords From DataCaptureEntity" +
                        " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where DataCaptureEntity.TemplateNodeId = " + TemplateId +
                        " And DataCaptureEntity.ServiceId = " + ServiceId + " And DataCaptureEntity.IsCompleted = 'false' And DataCaptureEntity.DcPlaceId = " + DcPlaceId +
                        " And DcResultsEntity.SystemUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetPendingRecordsCount");

            var result = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DcDAO.GetPendingRecordsCount");
            OneViewConsole.Debug("GetPendingRecordsCount end", "DcDAO.GetPendingRecordsCount");

            return result[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetPendingRecordsCount", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.GetHandoverRecordsCount = function (TemplateId, DcPlaceId, UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetHandoverRecordsCount start", "DcDAO.GetHandoverRecordsCount");
            OneViewConsole.DataLog("Request TemplateId : " + TemplateId + " ,DcPlaceId : " + DcPlaceId + " ,UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetHandoverRecordsCount");

            var Query = "Select count(DataCaptureEntity.Id) As TotalRecords From DataCaptureEntity" +
                        " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where DataCaptureEntity.TemplateNodeId = " + TemplateId +
                        " And DataCaptureEntity.ServiceId = " + ServiceId + " And DataCaptureEntity.IsCompleted = 'false' And DataCaptureEntity.DcPlaceId = " + DcPlaceId +
                        " And DcResultsEntity.SystemUserId != " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetHandoverRecordsCount");

            var result = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DcDAO.GetHandoverRecordsCount");
            OneViewConsole.Debug("GetHandoverRecordsCount end", "DcDAO.GetHandoverRecordsCount");

            return result[0].TotalRecords;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetHandoverRecordsCount", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.GetCompletedRecordsCount = function (TemplateId, DcPlaceId, UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetCompletedRecordsCount start", "DcDAO.GetCompletedRecordsCount");
            OneViewConsole.DataLog("Request TemplateId : " + TemplateId + " ,DcPlaceId : " + DcPlaceId + " ,UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetCompletedRecordsCount");

            var Query = "Select count(DataCaptureEntity.Id) As TotalRecords From DataCaptureEntity" +
                        " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where DataCaptureEntity.TemplateNodeId = " + TemplateId +
                        " And DataCaptureEntity.ServiceId = " + ServiceId + " And DataCaptureEntity.IsCompleted = 'true' And DataCaptureEntity.DcPlaceId = " + DcPlaceId +
                        " And DataCaptureEntity.IsSynchronized = 'false' And DcResultsEntity.SystemUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetCompletedRecordsCount");

            var result = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DcDAO.GetCompletedRecordsCount");
            OneViewConsole.Debug("GetCompletedRecordsCount end", "DcDAO.GetCompletedRecordsCount");

            return result[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetCompletedRecordsCount", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.GetUploadedRecordsCount = function (TemplateId, DcPlaceId, UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetUploadedRecordsCount start", "DcDAO.GetUploadedRecordsCount");
            OneViewConsole.DataLog("Request TemplateId : " + TemplateId + " ,DcPlaceId : " + DcPlaceId + " ,UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetUploadedRecordsCount");

            var Query = "Select count(DataCaptureEntity.Id) As TotalRecords From DataCaptureEntity" +
                        " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where DataCaptureEntity.TemplateNodeId = " + TemplateId +
                        " And DataCaptureEntity.ServiceId = " + ServiceId + " And DataCaptureEntity.IsSynchronized = 'true' And DataCaptureEntity.DcPlaceId = " + DcPlaceId +
                        " And DcResultsEntity.SystemUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetUploadedRecordsCount");

            var result = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DcDAO.GetUploadedRecordsCount");
            OneViewConsole.Debug("GetUploadedRecordsCount end", "DcDAO.GetUploadedRecordsCount");

            return result[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUploadedRecordsCount", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    this.UpdateDcProcessCountByDcInfo = function (DcInfo) {

        try {
            OneViewConsole.Debug("UpdateDcProcessCountByDcInfo start", "DcDAO.UpdateDcProcessCountByDcInfo");
            OneViewConsole.DataLog("Request DcInfo : " + JSON.stringify(DcInfo), "DcDAO.UpdateDcProcessCountByDcInfo");

            var Exp = FomatForInConditionById(DcInfo);

            var Query1 = "Update DataCaptureEntity Set ProcessCount = ProcessCount+1 where Id In " + Exp;

            OneViewConsole.DataLog("Requested Query : " + Query1, "DcDAO.UpdateDcProcessCountByDcInfo");

            var Query2 = "Update DcResultsEntity Set ProcessCount = ProcessCount+1 where DataCaptureId In " + Exp;

            OneViewConsole.DataLog("Requested Query : " + Query2, "DcDAO.UpdateDcProcessCountByDcInfo");

            var Query3 = "Update DcResultDetailsEntity Set ProcessCount = ProcessCount+1 where DataCaptureId In " + Exp;

            OneViewConsole.DataLog("Requested Query : " + Query3, "DcDAO.UpdateDcProcessCountByDcInfo");

            ExcecuteSql(Query1);
            ExcecuteSql(Query2);
            ExcecuteSql(Query3);

            OneViewConsole.Debug("UpdateDcProcessCountByDcInfo end", "DcDAO.UpdateDcProcessCountByDcInfo");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.UpdateDcProcessCountByDcInfo", Excep);
        }
        finally {
            Exp = null;
            Query1 = null;
            Query2 = null;
            Query3 = null;
        }
    }

    var FomatForInConditionById = function (DcInfo) {
        try {
            OneViewConsole.Debug("FomatForInConditionById start", "DcDAO.FomatForInConditionById");
            OneViewConsole.DataLog("Request DcInfo : " + JSON.stringify(DcInfo), "DcDAO.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < DcInfo.length; i++) {
                Incondition += DcInfo[i].Id;
                Incondition += (i <= DcInfo.length - 2) ? "," : ")";
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
            throw oOneViewExceptionHandler.Create("FrameWork", "DcDAO.FomatForInConditionByMappedEntityClientGuid", Excep);
        }
        finally {
            Incondition = null;
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

    var ExcecuteSql = function (Query) {

        try {
            //alert(Query);
            window.OneViewSqlite.excecuteSql(Query);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.ExcecuteSql", Excep);
        }
    }

    var NormalizeDcList = function (results) {
        try {
            OneViewConsole.Debug("NormalizeDcList start", "DcDAO.NormalizeDcList");
            OneViewConsole.DataLog("Request DcInfo : " + JSON.stringify(results), "DcDAO.NormalizeDcList");

            var DataCaptureList = new Array();

            for (var i = 0; i < results[0].length; i++) {

                var _oDataCaptureEntity = new DataCaptureEntity();

                _oDataCaptureEntity.Id = results[0][i].Id;
                _oDataCaptureEntity.ServerId = results[0][i].ServerId;

                _oDataCaptureEntity.ClientGuid = results[0][i].ClientGuid;
                _oDataCaptureEntity.ClientDocId = results[0][i].ClientDocId;
                _oDataCaptureEntity.MobileVersionId = results[0][i].MobileVersionId;
                _oDataCaptureEntity.OVGuid = results[0][i].OVGuid;

                _oDataCaptureEntity.ServiceId = results[0][i].ServiceId;
                //_oDataCaptureEntity.ServiceName = results[0][i].ServiceName;

                _oDataCaptureEntity.TemplateNodeId = results[0][i].TemplateNodeId;
                //_oDataCaptureEntity.TemplateNodeName = results[0][i].TemplateNodeName;
                _oDataCaptureEntity.DcProfileId = results[0][i].DcProfileId;

                _oDataCaptureEntity.DcPlaceDimension = results[0][i].DcPlaceDimension;
                _oDataCaptureEntity.DcPlaceId = results[0][i].DcPlaceId;
                _oDataCaptureEntity.DcPlaceName = results[0][i].DcPlaceName;

                _oDataCaptureEntity.IsCompleted = results[0][i].IsCompleted;
                _oDataCaptureEntity.IsSynchronized = results[0][i].IsSynchronized;

                _oDataCaptureEntity.IsSubmit = results[0][i].IsSubmit;
                _oDataCaptureEntity.SubmitDate = results[0][i].SubmitDate;
                _oDataCaptureEntity.ApprovalStatus = results[0][i].ApprovalStatus;
                _oDataCaptureEntity.ApprovalStatusDate = results[0][i].ApprovalStatusDate;

                _oDataCaptureEntity.IsDynamicDCPlace = results[0][i].IsDynamicDCPlace;
                _oDataCaptureEntity.IsDynamicAttribute = results[0][i].IsDynamicAttribute;
                _oDataCaptureEntity.IsDynamicAnswer = results[0][i].IsDynamicAnswer;
                _oDataCaptureEntity.ProcessCount = results[0][i].ProcessCount;

                //IsANYNC=true => Dc contains some non-conformance info.
                _oDataCaptureEntity.IsAnyNC = results[0][i].IsAnyNC;

                _oDataCaptureEntity.IsAnyObservation = results[0][i].IsAnyObservation;

                //IsAnyAction=true => Dc contains some action(Action which are not related NC) info.
                _oDataCaptureEntity.IsAnyAction = results[0][i].IsAnyAction;
                _oDataCaptureEntity.IsAnyDCBlocker = results[0][i].IsAnyDCBlocker;

                //IsForAction=true => Dc created for(EX : BOut NC Form) action.
                _oDataCaptureEntity.IsForAction = results[0][i].IsForAction;
                _oDataCaptureEntity.IsForDCBlocker = results[0][i].IsForDCBlocker;
                _oDataCaptureEntity.IsBlocker = results[0][i].IsBlocker;

                _oDataCaptureEntity.DcStartDate = results[0][i].DcStartDate;
                _oDataCaptureEntity.CreatedDate = results[0][i].CreatedDate;
                _oDataCaptureEntity.LastsyncDate = results[0][i].LastsyncDate;
                _oDataCaptureEntity.TimeStamp = results[0][i].TimeStamp;

                _oDataCaptureEntity.Score = results[0][i].Score;
                _oDataCaptureEntity.MaxScore = results[0][i].MaxScore;
                _oDataCaptureEntity.Percentage = results[0][i].Percentage;
                _oDataCaptureEntity.CompletedChildCount = results[0][i].CompletedChildCount;
                _oDataCaptureEntity.TotalChildCount = results[0][i].TotalChildCount;
                _oDataCaptureEntity.CompletedAttributeCount = results[0][i].CompletedAttributeCount;
                _oDataCaptureEntity.TotalAttributeCount = results[0][i].TotalAttributeCount;

                _oDataCaptureEntity.IsMultiMediaAttached = results[0][i].IsMultiMediaAttached;

                _oDataCaptureEntity.ESTTime = results[0][i].ESTTime;
                _oDataCaptureEntity.ActualTime = results[0][i].ActualTime;

                _oDataCaptureEntity.ServerValidationStatus = results[0][i].ServerValidationStatus;
                _oDataCaptureEntity.ServerValidationCode = results[0][i].ServerValidationCode;
                _oDataCaptureEntity.ServerValidationMessage = results[0][i].ServerValidationMessage;
                _oDataCaptureEntity.ServerValidationDate = results[0][i].ServerValidationDate;

                _oDataCaptureEntity.DcTime = results[0][i].DcTime;
                _oDataCaptureEntity.DcTimeLogs = results[0][i].DcTimeLogs;

                _oDataCaptureEntity.Latitude = results[0][i].Latitude;
                _oDataCaptureEntity.Longitude = results[0][i].Longitude;
                _oDataCaptureEntity.IsOnDeviceApprovalFinished = results[0][i].IsOnDeviceApprovalFinished;

                var DcResultsCount = 0;

                for (var k = 0; k < results[1].length; k++) {

                    if (results[1][k].DataCaptureId == _oDataCaptureEntity.Id) {

                        var _oDcResultsEntity = new DcResultsEntity();

                        _oDcResultsEntity.Id = results[1][k].Id;
                        _oDcResultsEntity.ServerId = results[1][k].ServerId;

                        _oDcResultsEntity.ClientGuid = results[1][k].ClientGuid;
                        _oDcResultsEntity.MobileVersionId = results[1][k].MobileVersionId;
                        _oDcResultsEntity.OVGuid = results[1][k].OVGuid;

                        _oDcResultsEntity.DataCaptureId = results[1][k].DataCaptureId;
                        _oDcResultsEntity.ServiceId = results[1][k].ServiceId;

                        _oDcResultsEntity.SystemUserId = results[1][k].SystemUserId;
                        _oDcResultsEntity.AnonymousUserId = results[1][k].AnonymousUserId;
                        // _oDcResultsEntity.UserName = results[1][k].UserName;

                        _oDcResultsEntity.ShiftId = results[1][k].ShiftId;
                        _oDcResultsEntity.ShiftName = results[1][k].ShiftName;

                        _oDcResultsEntity.IsSynchronized = results[0][i].IsSynchronized;

                        _oDcResultsEntity.StartDate = results[1][k].StartDate;
                        _oDcResultsEntity.LastSyncDate = results[1][k].LastSyncDate;
                        _oDcResultsEntity.TotalTimeForDc = results[1][k].TotalTimeForDc;

                        _oDcResultsEntity.IsSubmit = results[1][k].IsSubmit;
                        _oDcResultsEntity.SubmitDate = results[1][k].SubmitDate;
                        _oDcResultsEntity.SubmitedUserId = results[1][k].SubmitedUserId;
                        _oDcResultsEntity.SubmitedAnonymousUserId = results[1][k].SubmitedAnonymousUserId;

                        _oDcResultsEntity.ApprovalStatus = results[1][k].ApprovalStatus;
                        _oDcResultsEntity.ApprovalStatusDate = results[1][k].ApprovalStatusDate;

                        _oDcResultsEntity.IsDynamicAttribute = results[1][k].IsDynamicAttribute;
                        _oDcResultsEntity.IsDynamicAnswer = results[1][k].IsDynamicAnswer;
                        _oDcResultsEntity.ProcessCount = results[1][k].ProcessCount;

                        _oDcResultsEntity.CreatedDate = results[1][k].CreatedDate;
                        _oDcResultsEntity.TimeStamp = results[1][k].TimeStamp;

                        _oDcResultsEntity.Score = results[1][k].Score;
                        _oDcResultsEntity.MaxScore = results[1][k].MaxScore;
                        _oDcResultsEntity.Percentage = results[1][k].Percentage;
                        _oDcResultsEntity.CompletedChildCount = results[1][k].CompletedChildCount;
                        _oDcResultsEntity.TotalChildCount = results[1][k].TotalChildCount;
                        _oDcResultsEntity.CompletedAttributeCount = results[1][k].CompletedAttributeCount;
                        _oDcResultsEntity.TotalAttributeCount = results[1][k].TotalAttributeCount;
                        
                        _oDcResultsEntity.IsMultiMediaAttached = results[1][k].IsMultiMediaAttached;

                        _oDcResultsEntity.ActualTime = results[1][k].ActualTime;

                        _oDcResultsEntity.Comments = results[1][k].Comments;
                        _oDcResultsEntity.LastUpdatedDate = results[1][k].LastUpdatedDate;

                        _oDcResultsEntity.Latitude = results[1][k].Latitude;
                        _oDcResultsEntity.Longitude = results[1][k].Longitude;

                        _oDcResultsEntity.DcTime = results[1][k].DcTime;

                        _oDataCaptureEntity.DcResultsEntitylist[DcResultsCount] = _oDcResultsEntity;

                        DcResultsCount = DcResultsCount + 1;

                        var DcResultsDetailsCount = 0;

                        for (var l = 0; l < results[2].length; l++) {

                            if (results[2][l].DataResultsId == _oDcResultsEntity.Id) {

                                var _oDcResultDetailsEntity = new DcResultDetailsEntity();

                                _oDcResultDetailsEntity.Id = results[2][l].Id;
                                _oDcResultDetailsEntity.ServerId = results[2][l].ServerId;

                                _oDcResultDetailsEntity.ClientGuid = results[2][l].ClientGuid;
                                _oDcResultDetailsEntity.ServiceId = results[2][l].ServiceId;

                                _oDcResultDetailsEntity.MobileVersionId = results[2][l].MobileVersionId;
                                _oDcResultDetailsEntity.OVGuid = results[2][l].OVGuid;

                                _oDcResultDetailsEntity.DataCaptureId = results[2][l].DataCaptureId;
                                _oDcResultDetailsEntity.DataResultsId = results[2][l].DataResultsId;

                                _oDcResultDetailsEntity.StartDate = results[2][l].StartDate;
                                _oDcResultDetailsEntity.LastSyncDate = results[2][l].LastSyncDate;
                                _oDcResultDetailsEntity.IsSynchronized = results[0][i].IsSynchronized;

                                _oDcResultDetailsEntity.AttributeNodeId = results[2][l].AttributeNodeId;
                                // _oDcResultDetailsEntity.AttributeNodeName = results[2][l].AttributeNodeName;
                                _oDcResultDetailsEntity.ControlId = results[2][l].ControlId;

                                _oDcResultDetailsEntity.Answer = results[2][l].Answer;
                                _oDcResultDetailsEntity.AnswerValue = results[2][l].AnswerValue;

                                _oDcResultDetailsEntity.AnswerFKType = results[2][l].AnswerFKType;
                                _oDcResultDetailsEntity.AnswerMode = results[2][l].AnswerMode;
                                _oDcResultDetailsEntity.AnswerDataType = results[2][l].AnswerDataType;

                                _oDcResultDetailsEntity.IsDynamicAttribute = results[2][l].IsDynamicAttribute;
                                _oDcResultDetailsEntity.IsDynamicAnswer = results[2][l].IsDynamicAnswer;

                                _oDcResultDetailsEntity.IsManual = results[2][l].IsManual;
                                _oDcResultDetailsEntity.Comments = results[2][l].Comments;
                                _oDcResultDetailsEntity.AutomaticDeviceId = results[2][l].AutomaticDeviceId;

                                _oDcResultDetailsEntity.IndexId = results[2][l].IndexId;
                                _oDcResultDetailsEntity.IsMulti = results[2][l].IsMulti;

                                _oDcResultDetailsEntity.CreatedDate = results[2][l].CreatedDate;
                                _oDcResultDetailsEntity.LastUpdatedDate = results[2][l].LastUpdatedDate;

                                _oDcResultDetailsEntity.TimeStamp = results[2][l].TimeStamp;
                                _oDcResultDetailsEntity.ProcessCount = results[2][l].ProcessCount;

                                _oDcResultDetailsEntity.Score = results[2][l].Score;
                                _oDcResultDetailsEntity.MaxScore = results[2][l].MaxScore;
                                _oDcResultDetailsEntity.Percentage = results[2][l].Percentage;
                                _oDcResultDetailsEntity.CompletedChildCount = results[2][l].CompletedChildCount;
                                _oDcResultDetailsEntity.TotalChildCount = results[2][l].TotalChildCount;
                                _oDcResultDetailsEntity.CompletedAttributeCount = results[2][l].CompletedAttributeCount;
                                _oDcResultDetailsEntity.TotalAttributeCount = results[2][l].TotalAttributeCount;

                                _oDcResultDetailsEntity.IsMultiMediaAttached = results[2][l].IsMultiMediaAttached;

                                _oDcResultDetailsEntity.ESTTime = results[2][l].ESTTime;
                                _oDcResultDetailsEntity.ActualTime = results[2][l].ActualTime;
                                _oDcResultDetailsEntity.IsManualESTEnabled = results[2][l].IsManualESTEnabled;

                                _oDcResultDetailsEntity.IsNA = results[2][l].IsNA;
                                _oDcResultDetailsEntity.IsBlocker = results[2][l].IsBlocker;

                                _oDcResultDetailsEntity.Latitude = results[2][l].Latitude;
                                _oDcResultDetailsEntity.Longitude = results[2][l].Longitude;

                                _oDcResultDetailsEntity.IsDisable = results[2][l].IsDisable;

                                _oDcResultsEntity.DcResultDetailsEntityList[DcResultsDetailsCount] = _oDcResultDetailsEntity;
                                DcResultsDetailsCount = DcResultsDetailsCount + 1;
                            }
                        }
                    }
                }

                DataCaptureList[i] = _oDataCaptureEntity;
            }

            OneViewConsole.DataLog("Response  : " + JSON.stringify(DataCaptureList), "DcDAO.NormalizeDcList");
            OneViewConsole.Debug("NormalizeDcList end", "DcDAO.NormalizeDcList");

            return DataCaptureList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.NormalizeDcList", Excep);
        }
        finally {
            DataCaptureList = null;
            _oDataCaptureEntity = null;
            DcResultsCount = null;
            _oDcResultsEntity = null;
            DcResultsDetailsCount = null;
            _oDcResultDetailsEntity = null;
        }
    }

    this.GetDcCountByDcProfileId = function (DcProfileId) {
        try {
            // alert('SetDefaultAutoTemperatureListener Start');
            OneViewConsole.Debug("GetDcCountByDcProfileId start", "DataCaptureBO.GetDcCountByDcProfileId");

            var query = "SELECT count(*) AS length FROM  DataCaptureEntity WHERE DcProfileId='" + DcProfileId + "'";
               

            //alert('query :' + query);
            var results = ExcecuteSqlReader(query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(results), "DcDAO.GetDcCountByDcProfileId");
            OneViewConsole.Debug("GetDcCountByDcProfileId end", "DataCaptureBO.GetDcCountByDcProfileId");
            //alert('results' + JSON.stringify(results) + " ," + results[0].length)

            return results[0].length;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcCountByDcProfileId", Excep);
        }
    }

    this.GetDcCountByAllDimensions = function (DcUserId, TemplateNodeId, DcPlaceId, ServiceId) {
        try {
            OneViewConsole.Debug("GetDcCountByAllDimensions start", "DcDAO.GetDcCountByAllDimensions");
            OneViewConsole.DataLog("Request DcUserId : " + DcUserId + ",TemplateNodeId : " + TemplateNodeId + ",DcPlaceId :" + DcPlaceId, + ",ServiceId :" + ServiceId, "DcDAO.GetDcCountByAllDimensions");

            var GetProfiles = "Select count(*) As TotalProfiles from DataCaptureEntity INNER JOIN DcResultsEntity ON DcResultsEntity.DataCaptureId = DataCaptureEntity.Id "+
                " where DataCaptureEntity.TemplateNodeId = " + TemplateNodeId + " And DataCaptureEntity.DcPlaceId = " + DcPlaceId + " And DataCaptureEntity.ServiceId = " + ServiceId +
                " And DcResultsEntity.SystemUserId = " + DcUserId;

            //alert('query :' + query);
            OneViewConsole.DataLog("Requested Query : " + GetProfiles, "DcDAO.GetDcCountByAllDimensions");

            var ProfileInfo = ExcecuteSqlReader(GetProfiles);

            //alert('ProfileInfo :' + JSON.stringify(ProfileInfo));
            OneViewConsole.DataLog("Response from db : " + ProfileInfo, "DcDAO.GetDcCountByAllDimensions");
            OneViewConsole.Debug("GetDcCountByAllDimensions end", "DcDAO.GetDcCountByAllDimensions");

            return ProfileInfo[0].TotalProfiles;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcCountByAllDimensions", Excep);
        }
        finally {
            GetProfiles = null;
            ProfileInfo = null;
            IsExists = null;
        }
    }

    this.GetCompletedAndSynchronizedDcStatus = function (DcId) {
        try {
            OneViewConsole.Debug("GetCompletedAndSynchronizedDcStatus start", "DcDAO.GetCompletedAndSynchronizedDcStatus");
            OneViewConsole.DataLog("Request DcId : " + DcId, "DcDAO.GetCompletedAndSynchronizedDcStatus");

            var Query = "Select IsSynchronized AS IsCompletdSynchronized from DataCaptureEntity where IsCompleted = 'true' AND IsSynchronized='true' AND Id = " + DcId;
            /////////var Query = "Select IsCompleted AS IsCompletdSynchronized from DataCaptureEntity where IsCompleted = 'true' AND Id = " + DcId;

            //alert('Query :' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetCompletedAndSynchronizedDcStatus");

            var DcInfo = ExcecuteSqlReader(Query);

            //alert('DcInfo :' + JSON.stringify(DcInfo));
            OneViewConsole.DataLog("Response from db : " + DcInfo, "DcDAO.GetCompletedAndSynchronizedDcStatus");
            OneViewConsole.Debug("GetCompletedAndSynchronizedDcStatus end", "DcDAO.GetCompletedAndSynchronizedDcStatus");


            if (DcInfo.length > 0) {
                return DcInfo[0].IsCompletdSynchronized;
            }
            else {
                return false;
            }
           
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetCompletedAndSynchronizedDcStatus", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetDcDetailsByDcId = function (DcId) {
        try {
            OneViewConsole.Debug("GetDcDetailsByDcId start", "DcDAO.GetDcDetailsByDcId");

            var Query = "Select * From DataCaptureEntity Where Id=" + DcId + "";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcDetailsByDcId");

            var Result = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Result, "DcDAO.GetDcDetailsByDcId");
            OneViewConsole.Debug("GetDcDetailsByDcId end", "DcDAO.GetDcDetailsByDcId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcDetailsByDcId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetDcDetailsByDcIdLst = function (DcIdLst) {
        try {
            OneViewConsole.Debug("GetDcDetailsByDcIdLst start", "DcDAO.GetDcDetailsByDcIdLst");

            var Incondition = "(";
            for (var i = 0; i < DcIdLst.length; i++) {
                Incondition +=  DcIdLst[i] ;
                Incondition += (i <= DcIdLst.length - 2) ? "," : ")";
            }
          
            var Query = "Select * From DataCaptureEntity Where Id IN " + Incondition;
            //alert(Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcDetailsByDcIdLst");

            var Result = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Result, "DcDAO.GetDcDetailsByDcIdLst");
            OneViewConsole.Debug("GetDcDetailsByDcIdLst end", "DcDAO.GetDcDetailsByDcIdLst");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcDetailsByDcIdLst", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetNACountByDcId = function (Req) {
        try {
            OneViewConsole.Debug("GetDcDetailsByDcId start", "DcDAO.GetDcDetailsByDcId");
           
                var Query = "Select Count(*) as NACount from DcResultDetailsEntity where DataResultsId=" +Req.DataResultsId + " and IsNA='true'";
             
                OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcDetailsByDcId");

                var Result = ExcecuteSqlReader(Query);
             
    

            OneViewConsole.DataLog("Response from db : " + Result, "DcDAO.GetDcDetailsByDcId");
            OneViewConsole.Debug("GetDcDetailsByDcId end", "DcDAO.GetDcDetailsByDcId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcDetailsByDcId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetLastUpdatedDcResultId = function (DcId) {
        try {
            OneViewConsole.Debug("GetLastUpdatedDcResultId start", "DcDAO.GetLastUpdatedDcResultId");

            var Query = "SELECT "+
                        "*,(SUBSTR(LastUpdatedDate, 7, 4) || SUBSTR(LastUpdatedDate, 4, 2) || SUBSTR(LastUpdatedDate, 1, 2) || SUBSTR(LastUpdatedDate, 12, 2) || "+
                        "SUBSTR(LastUpdatedDate, 15, 2) || SUBSTR(LastUpdatedDate, 18, 2) ) AS VSD ,(SUBSTR(LastUpdatedDate, 7, 4) ||SUBSTR(LastUpdatedDate, 4, 2) ||"+
                        "SUBSTR(LastUpdatedDate, 1, 2) || SUBSTR(LastUpdatedDate, 12, 2) || SUBSTR(LastUpdatedDate, 15, 2) || SUBSTR(LastUpdatedDate, 18, 2) ) AS LUDValue" +
                        " From DcResultsEntity Where DataCaptureId=" + DcId + " order by LUDValue desc Limit 1";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcDetailsByDcId");
        
            var Result = ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + Result, "DcDAO.GetLastUpdatedDcResultId");
            OneViewConsole.Debug("GetLastUpdatedDcResultId end", "DcDAO.GetLastUpdatedDcResultId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetLastUpdatedDcResultId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetAnswermodeSummaryCountByDcResultId = function (Req) {
        try {
            OneViewConsole.Debug("GetAnswermodeSummaryCountByDcResultId start", "DcDAO.GetAnswermodeSummaryCountByDcResultId");
         
            var Query = "SELECT count(AnswerMode) as Count,* FROM DcResultDetailsEntity where DataResultsId='" + Req.DataResultsId + "'  GROUP BY AnswerMode,AnswerValue HAVING Answer!=''";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcDetailsByDcId");

            var Result = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Result, "DcDAO.GetAnswermodeSummaryCountByDcResultId");
            OneViewConsole.Debug("GetAnswermodeSummaryCountByDcResultId end", "DcDAO.GetAnswermodeSummaryCountByDcResultId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAnswermodeSummaryCountByDcResultId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetDcListByClientGuids = function (ClientGuidList) {
        try {
            OneViewConsole.Debug("GetDcListByClientGuids start", "DcDAO.GetDcListByClientGuids");

            var Incondition = "(";
            for (var i = 0; i < ClientGuidList.length; i++) {
                Incondition += "'" + ClientGuidList[i].ClientGuid + "'";
                Incondition += (i <= ClientGuidList.length - 2) ? "," : ")";
            }

            var Query = "Select * From DataCaptureEntity Where Id IN " + Incondition;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcListByClientGuids");

            var Result = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Result, "DcDAO.GetDcListByClientGuids");

            OneViewConsole.Debug("GetDcListByClientGuids end", "DcDAO.GetDcListByClientGuids");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcListByClientGuids", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetAllDataCaptures = function () {
        try {
            OneViewConsole.Debug("GetAllDataCaptures start", "DcDAO.GetAllDataCaptures");

            var Query = "SELECT TemplateNodeId,IsOnDeviceApprovalFinished from DataCaptureEntity";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetAllDataCaptures");

            var results = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + results, "DcDAO.GetAllDataCaptures");
            OneViewConsole.Debug("GetAllDataCaptures end", "DcDAO.GetAllDataCaptures");

            return results;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllDataCaptures", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.GetApprovedDcByDataCaptureClientGuid = function (DataCaptureClientGuid) {
        try {
            OneViewConsole.Debug("GetApprovedDcByDataCaptureClientGuid start", "DcDAO.GetApprovedDcByDataCaptureClientGuid");

            var Query = "SELECT TemplateNodeId,IsOnDeviceApprovalFinished from DataCaptureEntity WHERE IsOnDeviceApprovalFinished == 'true' AND ClientGuid = '" + DataCaptureClientGuid + "'";
            //alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetApprovedDcByDataCaptureClientGuid");

            var results = ExcecuteSqlReader(Query);
            //alert('results : ' + JSON.stringify(results));

            OneViewConsole.DataLog("Response from db : " + results, "DcDAO.GetApprovedDcByDataCaptureClientGuid");
            OneViewConsole.Debug("GetApprovedDcByDataCaptureClientGuid end", "DcDAO.GetApprovedDcByDataCaptureClientGuid");

            return results;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetApprovedDcByDataCaptureClientGuid", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.GetUnApprovedDcCountByAllDimensions = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetUnApprovedDcCountByAllDimensions start", "DcDAO.GetUnApprovedDcCountByAllDimensions");
            OneViewConsole.DataLog("Request DcUserId : " + FilterParam.DcUserId + ",TemplateNodeId : " + FilterParam.TemplateNodeId + ",DcPlaceId :" + FilterParam.DcPlaceId, + ",ServiceId :" + FilterParam.ServiceId, "DcDAO.GetUnApprovedDcCountByAllDimensions");

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
                        " AND (DataCaptureEntity.IsOnDeviceApprovalFinished != 'true')";

            //alert('Query :' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetUnApprovedDcCountByAllDimensions");

            var DcCount = ExcecuteSqlReader(Query);           
            //alert('DcCount  : ' + JSON.stringify(DcCount));
            OneViewConsole.DataLog("Response from db : " + DcCount, "DcDAO.GetUnApprovedDcCountByAllDimensions");
            OneViewConsole.Debug("GetUnApprovedDcCountByAllDimensions end", "DcDAO.GetUnApprovedDcCountByAllDimensions");

            return DcCount;
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUnApprovedDcCountByAllDimensions", Excep);
        }
        finally {
            Query = null;
            DcCount = null;
        }
    }

    this.Delete = function (FilterParam) {
        try {
            OneViewConsole.Debug("Delete start", "DcDAO.Delete");

            var oOneViewSqlitePlugin = new OneViewSqlitePlugin();

            var Query = "Select DataCaptureEntity.Id AS Id,DataCaptureEntity.ServerId AS ServerId,DataCaptureEntity.ClientGuid AS ClientGuid from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                            " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")" +
                            " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                            " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')" +
                            " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')" +
                            " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                            " AND (DataCaptureEntity.IsSubmit = '" + FilterParam.IsSubmit + "' OR '-1'='" + FilterParam.IsSubmit + "')" +
                            " AND (DataCaptureEntity.ServerValidationStatus = " + FilterParam.ServerValidationStatus + " OR -1=" + FilterParam.ServerValidationStatus + ")" +
                            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.Delete");
            
            var DcInfo = ExcecuteSqlReader(Query);
            
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.Delete");

            if (DcInfo.length > 0) {

                var oActionDAO = new ActionDAO();

                oActionDAO.DeleteNCDcResultDetailsByDcId(DcInfo);
                MyInstance.DeleteDcResultDetailsByDcId(DcInfo);

                var Exp = FomatForInConditionByClientGuid(DcInfo);
                var Query2 = "SELECT DISTINCT ActionClientGuid AS ClientGuid FROM DCNCMapping WHERE DataCaptureClientGuid IN " + Exp;
                var ActionResult = oOneViewSqlitePlugin.ExcecuteSqlReader(Query2);

                var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
                _oMultiMediaSubElementsDAO.Delete(DcInfo);
                _oMultiMediaSubElementsDAO.Delete(ActionResult);

                var _oDcApprovalDAO = new DcApprovalDAO();
                _oDcApprovalDAO.DeleteByDcInfo(DcInfo);
            }

            OneViewConsole.Debug("Delete end", "DcDAO.Delete");
        }
        catch (Excep) {
            alert(Excep);
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.Delete", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetDcTimeDetailsByDcId = function (DcId) {
        try {
            OneViewConsole.Debug("GetDcTimeLogsByDcId start", "DcDAO.GetDcTimeLogsByDcId");

            var Query = "Select DcTimeLogs, DcTime From DataCaptureEntity Where Id=" + DcId + "";
            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcTimeLogsByDcId");

            var Result = ExcecuteSqlReader(Query);
            //alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + Result, "DcDAO.GetDcTimeLogsByDcId");
            OneViewConsole.Debug("GetDcTimeLogsByDcId end", "DcDAO.GetDcTimeLogsByDcId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcTimeLogsByDcId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetDcResultDcTimeByDcId = function (DcId, LoginUserId) {
        try {
            OneViewConsole.Debug("GetDcResultDcTimeByDcId start", "DcDAO.GetDcResultDcTimeByDcId");

            var Query = "Select DcTime From DcResultsEntity Where DataCaptureId=" + DcId + " AND SystemUserId = " + LoginUserId;
            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcResultDcTimeByDcId");

            var Result = ExcecuteSqlReader(Query);
            //alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + Result, "DcDAO.GetDcResultDcTimeByDcId");
            OneViewConsole.Debug("GetDcResultDcTimeByDcId end", "DcDAO.GetDcResultDcTimeByDcId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcResultDcTimeByDcId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetServiceWiseUnSyncDcCount = function (ServiceId) {
        try {
            OneViewConsole.Debug("GetServiceWiseUnSyncDcCount start", "DcDAO.GetServiceWiseUnSyncDcCount");
            var DcCount = 0;

            var Query = "Select count(*) As TotalRecords from DataCaptureEntity Where IsSynchronized = 'false' AND ServiceId = " + ServiceId;
            //alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetServiceWiseUnSyncDcCount");

            var DcInfo = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.GetServiceWiseUnSyncDcCount");
           
            if (DcInfo != null) {
                DcCount = DcInfo[0].TotalRecords
            }
            OneViewConsole.Debug("GetServiceWiseUnSyncDcCount end", "DcDAO.GetServiceWiseUnSyncDcCount");
            //alert('DcCount : ' + DcCount);
            return DcCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetServiceWiseUnSyncDcCount", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetServiceWiseUnSyncDc = function (Limit) {
        try {
            OneViewConsole.Debug("GetServiceWiseUnSyncDc start", "DcDAO.GetServiceWiseUnSyncDc");

            //var Query = "Select DISTINCT TOP 10 Id from DataCaptureEntity Where IsSynchronized = 'false'";   // for batch wise
            var Query = "Select DISTINCT Id from DataCaptureEntity Where IsSynchronized = 'false'";

            if (Limit != -1 && Limit != undefined) {
                Query += " LIMIT " + Limit;
            }

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetServiceWiseUnSyncDc");

            var DcInfo = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.GetServiceWiseUnSyncDc");
            OneViewConsole.Debug("GetServiceWiseUnSyncDc end", "DcDAO.GetServiceWiseUnSyncDc");

            return MyInstance.GetDcList(DcInfo);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAllUnSyncDc", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    this.GetDcResultDetailsClientGuid = function (DcId, DcResultId, AttributeNodeId) {
        try {
            OneViewConsole.Debug("GetDcResultDetailsClientGuid start", "DcDAO.GetDcResultDetailsClientGuid");

            var Query = "Select ClientGuid from DcResultDetailsEntity Where DataCaptureId = " + DcId + " AND DataResultsId = " + DcResultId + " AND AttributeNodeId = " + AttributeNodeId;
            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcResultDetailsClientGuid");

            var DcResultDetails = ExcecuteSqlReader(Query);

            //alert('DcResultDetails : ' + JSON.stringify( DcResultDetails));
          
            OneViewConsole.Debug("GetDcResultDetailsClientGuid end", "DcDAO.GetDcResultDetailsClientGuid");

            return DcResultDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcResultDetailsClientGuid", Excep);
        }
        finally {
            Query = null;
            DcResultDetails = null;
        }
    }

    this.GetDcResults_OrderByCreatedDate = function (DCId) {
        try {
            OneViewConsole.Debug("GetDcResults_DAO start", "DcDAO.GetDcResults_DAO");

            var query = "SELECT *,(SUBSTR(DcResultsEntity.CreatedDate, 7, 4) || SUBSTR(DcResultsEntity.CreatedDate, 4, 2) || SUBSTR(DcResultsEntity.CreatedDate, 1, 2) || SUBSTR(DcResultsEntity.CreatedDate, 12, 2) || " +
                " SUBSTR(DcResultsEntity.CreatedDate, 15, 2) || SUBSTR(DcResultsEntity.CreatedDate, 18, 2) ) AS CreatedDate FROM DcResultsEntity WHERE DataCaptureId=" + DCId + " ORDER BY CreatedDate";
            
            OneViewConsole.DataLog("Requested Query : " + query, "DcDAO.GetDcResults_DAO");

            var queryResult = window.OneViewSqlite.excecuteSqlReader(query);
            var result = JSON.parse(queryResult);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(result), "DcDAO.GetDcResults_DAO");
            OneViewConsole.Debug("GetDcResults_DAO end", "DcDAO.GetDcResults_DAO");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcResults_DAO", Excep);
        }
        finally {
            query = null;
            queryResult = null;
            result = null;
        }
    }

    this.GetDcIdByDcServerId = function (ServerId) {
        try {
            OneViewConsole.Debug("GetDcIdByDcServerId start", "DcDAO.GetDcIdByDcServerId");

            var Query = "SELECT Id from DataCaptureEntity WHERE ServerId= " + ServerId;
            //alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDcIdByDcServerId");

            var results = ExcecuteSqlReader(Query);

           // alert('results : ' + JSON.stringify(results));
            OneViewConsole.DataLog("Response from db : " + results, "DcDAO.GetDcIdByDcServerId");
            OneViewConsole.Debug("GetDcIdByDcServerId end", "DcDAO.GetDcIdByDcServerId");

            return results;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcIdByDcServerId", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }
    
    this.GetDCCountWithFiltersForAutoUpload = function (FilterParam, PlaceFilterParam, TemplateFilterParam) {
        try {
            OneViewConsole.Debug("GetDCCountWithFiltersForAutoUpload start", "DcDAO.GetDCCountWithFiltersForAutoUpload");

            var Query = "Select Count(DataCaptureEntity.Id) As TotalCount from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")";
                   
            if (PlaceFilterParam.IsAnyPlace == true || PlaceFilterParam.IsAnyPlace == 'true') {
                Query += " AND (DataCaptureEntity.DcPlaceId = -1 OR -1=-1)";
            }

            else if (PlaceFilterParam.DCPlaceList != null && PlaceFilterParam.DCPlaceList.length > 0) {
                var PlaceIncondition = "(";
                for (var i = 0; i < PlaceFilterParam.DCPlaceList.length; i++) {
                    PlaceIncondition += PlaceFilterParam.DCPlaceList[i];
                    PlaceIncondition += (i <= PlaceFilterParam.DCPlaceList.length - 2) ? "," : ")";
                }
                Query += " AND (DataCaptureEntity.DcPlaceId IN " + PlaceIncondition + ")";
            }


            if (TemplateFilterParam.IsAnyTemplate == true || TemplateFilterParam.IsAnyTemplate == 'true') {
                Query += " AND (DataCaptureEntity.TemplateNodeId = -1 OR -1=-1)";
            }

            else if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {
                var TemplateIncondition = "(";
                for (var i = 0; i < TemplateFilterParam.DCTemplateList.length; i++) {
                    TemplateIncondition += TemplateFilterParam.DCTemplateList[i];
                    TemplateIncondition += (i <= TemplateFilterParam.DCTemplateList.length - 2) ? "," : ")";
                }

                Query += " AND (DataCaptureEntity.TemplateNodeId IN " + TemplateIncondition + ")";
            }


            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
            " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";

            if (FilterParam.ApprovalStatus != false) {
                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
            }
            else {
                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
            }

            Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDCCountWithFiltersForAutoUpload");

            //alert('Query : ' + Query);

            var DcInfo = ExcecuteSqlReader(Query);
            //alert('DcInfo : ' + JSON.stringify(DcInfo));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.GetDCCountWithFiltersForAutoUpload");
            OneViewConsole.Debug("GetDCCountWithFiltersForAutoUpload end", "DcDAO.GetDCCountWithFiltersForAutoUpload");

            return DcInfo[0].TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCCountWithFiltersForAutoUpload", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }


    this.GetUserDcProfileByTemplateAndSchedule = function (ServiceId, UserId, DCDateTime, TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetUserDcProfileByTemplateAndSchedule Start", "DcDAO.GetUserDcProfileByTemplateAndSchedule");
            
            var Query = "SELECT  DcProfileEntity.*, DcProfileEntity.ServerId AS DcProfileServerId ," +
                            "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                           " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                           "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                           "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                          " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                           "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " AND DcProfileEntity.ServiceId=" + ServiceId +                          
                           " AND (-1=" + TemplateNodeId + " or  DcProfileEntity.TemplateNodeId=" + TemplateNodeId + ") " +
                            " AND SD <=  '" + DCDateTime + "' AND ( '" + DCDateTime + "'  <  ED or  '' = ED )";

            //alert('GetUserDcProfileByTemplateAndSchedule : ' + Query);

            var result = ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetUserDcProfileByTemplateAndSchedule End", "DcDAO.GetUserDcProfileByTemplateAndSchedule");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUserDcProfileByTemplateAndSchedule", Excep);
        }
    }

    this.GetTotalDcCountByTemplateAndUser = function (ServiceId, UserId, TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetTotalDcCountByTemplateAndUser start", "DcDAO.GetTotalDcCountByTemplateAndUser");

            var Query = "Select count(DataCaptureEntity.Id) As TotalRecords From DataCaptureEntity" +
                    " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where DataCaptureEntity.TemplateNodeId = " + TemplateNodeId +
                    " And DataCaptureEntity.ServiceId = " + ServiceId + " And DataCaptureEntity.IsForAction != 'true' And DataCaptureEntity.IsForHistory != 'true' " +
                    " And DcResultsEntity.SystemUserId = " + UserId;
            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetTotalDcCountByTemplateAndUser");

            var results = window.OneViewSqlite.excecuteSqlReader(Query);
            results = JSON.parse(results);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(results), "DcDAO.GetTotalDcCountByTemplateAndUser");
            OneViewConsole.Debug("GetTotalDcCountByTemplateAndUser end", "DcDAO.GetTotalDcCountByTemplateAndUser");

            return results[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetTotalDcCountByTemplateAndUser", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.GetLocalLastDcDateTemplateAndUser = function (ServiceId, UserId, TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetLocalLastDcDateTemplateAndUser start", "DcDAO.GetLocalLastDcDateTemplateAndUser");

            var Query = "Select DataCaptureEntity.DcStartDate From DataCaptureEntity " +
                    " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where DataCaptureEntity.IsSynchronized != 'true' And DataCaptureEntity.TemplateNodeId = " + TemplateNodeId +
                    " And DataCaptureEntity.ServiceId = " + ServiceId + " And DataCaptureEntity.IsForAction != 'true' And DataCaptureEntity.IsForHistory != 'true' " +
                    " And DcResultsEntity.SystemUserId = " + UserId + " ORDER BY DataCaptureEntity.DcStartDate DESC LIMIT 1";
            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetLocalLastDcDateTemplateAndUser");

            var results = window.OneViewSqlite.excecuteSqlReader(Query);
            results = JSON.parse(results);

            //alert('results : ' + JSON.stringify(results));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(results), "DcDAO.GetLocalLastDcDateTemplateAndUser");
            OneViewConsole.Debug("GetLocalLastDcDateTemplateAndUser end", "DcDAO.GetLocalLastDcDateTemplateAndUser");

            var LastDcDate = '';
            if (results != null && results.length >0) {
                LastDcDate = results[0].DcStartDate;
            }

            return LastDcDate;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetLocalLastDcDateTemplateAndUser", Excep);
        }
        finally {
            Query = null;
            results = null;
        }
    }

    this.GetDcInfo = function (ServiceId, LoginUserId, TemplateId) {

        try {
            OneViewConsole.Debug("GetDcInfo start", "DcDAO.GetDcInfo");

            var Query = "SELECT DataCaptureEntity.* FROM DataCaptureEntity INNER JOIN DcResultsEntity ON DcResultsEntity.DataCaptureId = DataCaptureEntity.Id" +
                        " WHERE DataCaptureEntity.ServiceId=" + ServiceId + " AND DataCaptureEntity.TemplateNodeId=" + TemplateId +
                        " AND DcResultsEntity.SystemUserId=" + LoginUserId + " AND DataCaptureEntity.IsSubmit != 'true' AND DataCaptureEntity.IsForHistory != 'true'";


            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);
            //alert('Result : ' + JSON.stringify(Result));
            OneViewConsole.Debug("GetDcInfo end", "DcDAO.GetDcInfo");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcDAO.GetDcInfo", Excep);
        }
        finally {
        }
    }

    this.GetUserDcProfileByTemplateListAndSchedule = function (ServiceId, UserId, DCDateTime, TemplateNodeIdList) {
        try {
            OneViewConsole.Debug("GetUserDcProfileByTemplateListAndSchedule Start", "DcDAO.GetUserDcProfileByTemplateListAndSchedule");

            var Incondition = "(";
            for (var i = 0; i < TemplateNodeIdList.length; i++) {
                Incondition += TemplateNodeIdList[i];
                Incondition += (i <= TemplateNodeIdList.length - 2) ? "," : ")";
            }

            var Query = "SELECT  DcProfileEntity.*, DcProfileEntity.ServerId AS DcProfileServerId ," +
                            "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                           " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                           "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                           "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                          " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                           "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " AND DcProfileEntity.ServiceId=" + ServiceId +
                           " AND DcProfileEntity.TemplateNodeId IN  " + Incondition + " " +
                            " AND SD <=  '" + DCDateTime + "' AND ( '" + DCDateTime + "'  <  ED or  '' = ED )";

            //alert('GetUserDcProfileByTemplateListAndSchedule : ' + Query);

            var result = ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetUserDcProfileByTemplateListAndSchedule End", "DcDAO.GetUserDcProfileByTemplateListAndSchedule");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUserDcProfileByTemplateListAndSchedule", Excep);
        }
    }

    this.GetUserDcProfileByTemplate = function (ServiceId, UserId, TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetUserDcProfileByTemplate Start", "DcDAO.GetUserDcProfileByTemplate");

            var Query = "SELECT  DcProfileEntity.*, DcProfileEntity.ServerId AS DcProfileServerId ," +
                            "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                           " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                           "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                           "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                          " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                           "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " AND DcProfileEntity.ServiceId=" + ServiceId +
                           " AND (-1=" + TemplateNodeId + " or  DcProfileEntity.TemplateNodeId=" + TemplateNodeId + ") ";

            //alert('GetUserDcProfileByTemplate : ' + Query);

            var result = ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetUserDcProfileByTemplate End", "DcDAO.GetUserDcProfileByTemplate");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetUserDcProfileByTemplate", Excep);
        }
    }

    this.GetDcResultsClientGuidById = function (Id) {
        try {
            OneViewConsole.Debug("GetDcResultsClientGuidById Start", "DcDAO.GetDcResultsClientGuidById");

            var Query = "SELECT ClientGuid FROM DcResultsEntity WHERE Id=" + Id;
            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            result = JSON.parse(result);
           // alert('GetDcResultsClientGuidById result : ' + JSON.stringify(result));

            OneViewConsole.Debug("GetDcResultsClientGuidById End", "DcDAO.GetDcResultsClientGuidById");

            return result[0].ClientGuid;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDcResultsClientGuidById", Excep);
        }
    }

    this.GetDCNCMappingByDataCaptureClientGuid = function (DataCaptureClientGuid) {
        try {
            OneViewConsole.Debug("GetDCNCMappingByDataCaptureClientGuid Start", "DcDAO.GetDCNCMappingByDataCaptureClientGuid");

            var Query = "SELECT IsNC FROM DCNCMapping WHERE DataCaptureClientGuid='" + DataCaptureClientGuid + "'";
            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            result = JSON.parse(result);
           // alert('GetDCNCMappingByDataCaptureClientGuid result : ' + JSON.stringify(result));

            OneViewConsole.Debug("GetDCNCMappingByDataCaptureClientGuid End", "DcDAO.GetDCNCMappingByDataCaptureClientGuid");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCNCMappingByDataCaptureClientGuid", Excep);
        }
    }

    this.GetHandoverRecordsForLandingPage = function (TemplateId, DcPlaceId, UserId, ServiceId) {
        try {
            OneViewConsole.Debug("GetHandoverRecordsForLandingPage start", "DcDAO.GetHandoverRecordsForLandingPage");
            OneViewConsole.DataLog("Request TemplateId : " + TemplateId + " ,DcPlaceId : " + DcPlaceId + " ,UserId : " + UserId + ",ServiceId :" + ServiceId, "DcDAO.GetHandoverRecordsForLandingPage");

            var Query = "Select DataCaptureEntity.* From DataCaptureEntity" +
                        " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where DataCaptureEntity.TemplateNodeId = " + TemplateId +
                        " And DataCaptureEntity.ServiceId = " + ServiceId + " And DataCaptureEntity.IsCompleted = 'false' And DataCaptureEntity.DcPlaceId = " + DcPlaceId +
                        " And DcResultsEntity.SystemUserId != " + UserId ;
                   

            //Added to stop view and edit of approved and history records
            Query += " AND DataCaptureEntity.IsSubmit != 'true' AND DataCaptureEntity.IsForHistory != 'true'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetHandoverRecordsForLandingPage");
            //alert('Query : ' + Query);
            var result = ExcecuteSqlReader(Query);
            //alert('result : ' + JSON.stringify(result));
            OneViewConsole.DataLog("Response from db : " + result, "DcDAO.GetHandoverRecordsForLandingPage");
            OneViewConsole.Debug("GetHandoverRecordsForLandingPage end", "DcDAO.GetHandoverRecordsForLandingPage");

            return result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetHandoverRecordsForLandingPage", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

} 
