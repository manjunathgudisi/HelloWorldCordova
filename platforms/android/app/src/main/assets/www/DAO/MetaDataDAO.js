
// OrganizationAssetsNodeDAO
function AttributeOtherConfigDAO() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetByAllDimensions = function (DcPlaceId, TemplateNodeId, UserId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "AttributeOtherConfigDAO.GetByAllDimensions");

            var Query = "SELECT * FROM AttributeOtherConfigEntity WHERE DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "AttributeOtherConfigDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "AttributeOtherConfigDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "AttributeOtherConfigDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "AttributeOtherConfigDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    this.UpdateById = function (AttributeOtherConfig, Id) {

        try {
            OneViewConsole.Debug("Update start", "AttributeOtherConfigDAO.Update");

            var Query = "UPDATE AttributeOtherConfigEntity SET ";
            Query += "OVGuid = " + AttributeOtherConfig.OVGuid + ", ";
            Query += "AttributeDefaultValueMetaDataDict = '" + AttributeOtherConfig.AttributeDefaultValueMetaDataDict + "', ";
            Query += "HistoryMetaDataDict = '" + AttributeOtherConfig.HistoryMetaDataDict + "', ";
            Query += "NAMetaDataDict = '" + AttributeOtherConfig.NAMetaDataDict + "', ";
            Query += "MutiMediaSubElementMetaDataDict = '" + AttributeOtherConfig.MutiMediaSubElementMetaDataDict + "', ";
            Query += "HelpDocumentMetaDataDict = '" + AttributeOtherConfig.HelpDocumentMetaDataDict + "', ";
            Query += "LastsyncDate = '" + CurrentDateAndTime + "', ";
            Query += "TimeStamp = '" + CurrentDateAndTime + "', ";
            Query += "UserWiseLastDC = '" + AttributeOtherConfig.UserWiseLastDC + "', ";
            Query += "DcPlaceWiseLastDC = '" + AttributeOtherConfig.DcPlaceWiseLastDC + "' ";
            Query += "WHERE Id = " + Id;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "AttributeOtherConfigDAO.Update");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("Update_AssetNode end", "AttributeOtherConfigDAO.Update");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "AttributeOtherConfigDAO.Update", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetMetaData = function (ServiceId, DcPlaceId, DcPlaceDimension, DcUserId,TemplateNodeId) {

        try {
            OneViewConsole.Debug("GetMetaData start", "AttributeOtherConfigDAO.GetMetaData");

            //var Query = "SELECT * FROM AttributeOtherConfigEntity WHERE ServiceId = " + ServiceId + " AND DcPlaceId = " + DcPlaceId;
            //Query += " AND DcPlaceDimension = '" + DcPlaceDimension + "' AND DcUserId = " + DcUserId + " AND TemplateNodeId = " + TemplateNodeId;

            var Query = "SELECT * FROM AttributeOtherConfigEntity WHERE ServiceId = " + ServiceId + " AND (-1 = " + DcPlaceId + " OR DcPlaceId=" + DcPlaceId + ")";
            Query += " AND (-1 = " + DcUserId + " OR DcUserId=" + DcUserId + ") AND TemplateNodeId = " + TemplateNodeId;

            ////" AND UserWiseLastDC = '" + UserWiseLastDC + "' AND DcPlaceWiseLastDC = '" + DcPlaceWiseLastDC + "'";

            //alert('Query:' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "AttributeOtherConfigDAO.Update");

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (MetaData.length > 0) {
                return {
                    "UserWiseLastDC": MetaData[0].UserWiseLastDC,
                    "DcPlaceWiseLastDC": MetaData[0].DcPlaceWiseLastDC,
                    "AttributeDefaultValueMetaDataDict": JSON.parse(MetaData[0].AttributeDefaultValueMetaDataDict),
                    "HistoryMetaDataDict": JSON.parse(MetaData[0].HistoryMetaDataDict),
                    "NAMetaDataDict": JSON.parse(MetaData[0].NAMetaDataDict),
                    "MutiMediaSubElementMetaDataDict": JSON.parse(MetaData[0].MutiMediaSubElementMetaDataDict),
                    "HelpDocumentMetaDataDict": JSON.parse(MetaData[0].HelpDocumentMetaDataDict)
                }
            }
            else {
                return null;
            }

            OneViewConsole.Debug("GetMetaData end", "AttributeOtherConfigDAO.GetMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "AttributeOtherConfigDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }

    this.GetMetaDataNew = function (ServiceId,TemplateNodeId) {

        try {
            OneViewConsole.Debug("Get start", "AttributeOtherConfigDAO.GetMetaDataNew");

            var Query = "SELECT * FROM AttributeOtherConfigEntity WHERE ServiceId = " + ServiceId + " AND TemplateNodeId = " + TemplateNodeId;

            //alert('Query:' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "AttributeOtherConfigDAO.GetMetaDataNew");

            var MetaDataList = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (MetaDataList.length > 0) {
                return MetaDataList;
            }
            else {
                return null;
            }

            OneViewConsole.Debug("GetMetaDataNew end", "AttributeOtherConfigDAO.GetMetaDataNew");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "AttributeOtherConfigDAO.GetMetaDataNew", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
}

// OrganizationAssetsNodeDAO
function AttributeDCHistoryDAO() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.DeleteById = function (Id) {

        try {
            OneViewConsole.Debug("DeleteById start", "AttributeDCHistoryDAO.DeleteById");

            var Query = "DELETE FROM AttributeDCHistoryEntity WHERE Id = " + Id;

            OneViewConsole.DataLog("Requested Query : " + Query, "AttributeOtherConfigDAO.DeleteById");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteById end", "AttributeDCHistoryDAO.DeleteById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "AttributeDCHistoryDAO.DeleteById", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }

    this.GetAttributeDCHistoryId = function (ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId) {

        try {
            OneViewConsole.Debug("GetAttributeDCHistoryId start", "AttributeDCHistoryDAO.GetAttributeDCHistoryId");

            var Query = "SELECT Id FROM AttributeDCHistoryEntity WHERE ServiceId = " + ServiceId + " AND DcPlaceId = " + DcPlaceId;
            Query += " AND DcUserId = " + DcUserId + " AND TemplateNodeId = " + TemplateNodeId;

            OneViewConsole.DataLog("Requested Query : " + Query, "AttributeOtherConfigDAO.Update");

            var oAttributeDCHistory= _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            //alert('oAttributeDCHistory:' + oAttributeDCHistory.length)

            if (oAttributeDCHistory.length > 0)
                return oAttributeDCHistory[0].Id;

            else
                return 0;

            OneViewConsole.Debug("GetAttributeDCHistoryId end", "AttributeDCHistoryDAO.GetAttributeDCHistoryId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "AttributeDCHistoryDAO.GetAttributeDCHistoryId", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }

    this.GetMetaData = function (ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId)
    {
        try {
            OneViewConsole.Debug("GetMetaData start", "AttributeDCHistoryDAO.GetMetaData");

            var Query = "SELECT PreviousDCValuesEntity.* ,AttributeDCHistoryEntity.ServerId FROM AttributeDCHistoryEntity INNER JOIN PreviousDCValuesEntity ON AttributeDCHistoryEntity.Id == PreviousDCValuesEntity.AttributeDCHistoryId";
            Query += " WHERE AttributeDCHistoryEntity.ServiceId = " + ServiceId + " AND AttributeDCHistoryEntity.DcPlaceId = " + DcPlaceId;
            Query += " AND AttributeDCHistoryEntity.DcUserId = " + DcUserId + " AND AttributeDCHistoryEntity.TemplateNodeId = " + TemplateNodeId + " ORDER BY AttributeId,DCDate";

            //alert('AttributeDCHistoryDAO.GetMetaData Query:' + Query)
            OneViewConsole.DataLog("Requested Query : " + Query, "AttributeOtherConfigDAO.GetMetaData");

            var AttributeDCHistoryValues = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
         
            return AttributeDCHistoryValues;

            OneViewConsole.Debug("GetMetaData end", "AttributeDCHistoryDAO.GetMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "AttributeDCHistoryDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
    
    this.Update = function (AttributeDCHistoryId, DcId, ServiceId, DcPlaceId, DcUserId, TemplateNodeId) {
        try {
            OneViewConsole.Debug("AttributeDCHistoryDAO start", "AttributeDCHistoryDAO.Update");

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();
            var query = "UPDATE AttributeDCHistoryEntity SET  ServerId='" + DcId + "',ServiceId=" + ServiceId + ",DcPlaceId=" + DcPlaceId + ",DcUserId=" + DcUserId + ",TemplateNodeId=" + TemplateNodeId;
            query += " ,TimeStamp ='" + CurrenntDateAndTime + "' WHERE Id=" + AttributeDCHistoryId;

           // alert('Update query : ' + query);
            OneViewConsole.DataLog("Requested Query : " + query, "AttributeDCHistoryDAO.Update");

            var queryResult = window.OneViewSqlite.excecuteSql(query);
            OneViewConsole.Debug("AttributeDCHistoryDAO end", "AttributeDCHistoryDAO.Update");

        }
        catch (Excep) {
            alert("AttributeDCHistoryDAO.Update :" + Excep);
            //throw oOneViewExceptionHandler.Create("DAO", "AttributeDCHistoryDAO.Update", Excep);
        }
        finally {
            _DateTime = null;
            CurrenntDateAndTime = null;
            query = null;
            queryResult = null;
        }
    }
 
}

// PreviousDCValuesDAO
function PreviousDCValuesDAO() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.DeleteByAttributeDCHistoryId = function (HistoryId) {

        try {
            OneViewConsole.Debug("DeleteByAttributeDCHistoryId start", "PreviousDCValuesDAO.DeleteByAttributeDCHistoryId");

            var Query = "DELETE FROM PreviousDCValuesEntity WHERE AttributeDCHistoryId = " + HistoryId;

            OneViewConsole.DataLog("Requested Query : " + Query, "PreviousDCValuesDAO.DeleteByAttributeDCHistoryId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByAttributeDCHistoryId end", "PreviousDCValuesDAO.DeleteByAttributeDCHistoryId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "PreviousDCValuesDAO.DeleteByAttributeDCHistoryId", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }

    this.GetByAttributeDCHistoryId = function (AttributeDCHistoryId) {

        try {
            OneViewConsole.Debug("Get start", "PreviousDCValuesDAO.GetByAttributeDCHistoryId");

            var Query = "SELECT * FROM PreviousDCValuesEntity WHERE AttributeDCHistoryId = " + AttributeDCHistoryId + " ORDER BY AttributeId,DCDate";

            OneViewConsole.DataLog("Requested Query : " + Query, "PreviousDCValuesDAO.GetByAttributeDCHistoryId");

            var oAttributeDCHistoryEntity = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

           
            OneViewConsole.Debug("Get end", "PreviousDCValuesDAO.GetByAttributeDCHistoryId");

            return oAttributeDCHistoryEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "PreviousDCValuesDAO.GetByAttributeDCHistoryId", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }

    this.Update = function (AttributeDCHistoryId,AttributeId, Answer, AnswerValue) {
        try {
            OneViewConsole.Debug("PreviousDCValuesDAO start", "PreviousDCValuesDAO.Update");

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();
            var query = "UPDATE PreviousDCValuesEntity SET Answer='" + Answer + "',AnswerValue='" + AnswerValue + "' TimeStamp ='" + CurrenntDateAndTime + "' WHERE AttributeDCHistoryId=" + AttributeDCHistoryId + "AND AttributeId= " + AttributeId;

            OneViewConsole.DataLog("Requested Query : " + query, "PreviousDCValuesDAO.Update");

            var queryResult = window.OneViewSqlite.excecuteSql(query);
            OneViewConsole.Debug("PreviousDCValuesDAO end", "PreviousDCValuesDAO.Update");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "PreviousDCValuesDAO.Update", Excep);
        }
        finally {
            _DateTime = null;
            CurrenntDateAndTime = null;
            query = null;
            queryResult = null;
        }
    }
   
    this.UpdateAllColumns = function (AttributeDCHistoryId, AttributeId,AtttibuteDimension,ControlId,DcResultDetailsId,DCIndex,DCDate, Answer, AnswerValue) {
        try {
            OneViewConsole.Debug("UpdateAllColumns start", "PreviousDCValuesDAO.UpdateAllColumns");

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();
            var query = "UPDATE PreviousDCValuesEntity SET AttributeId= " + AttributeId + " ,AtttibuteDimension='" + AtttibuteDimension + "' ,ControlId='" + ControlId + "' ,DcResultDetailsId=" + DcResultDetailsId + " ,DCIndex=" + DCIndex;
            query += " ,DCDate='" + DCDate + "' ,Answer='" + Answer + "' ,AnswerValue='" + AnswerValue + "' ,LastsyncDate ='" + CurrenntDateAndTime + "' ,TimeStamp ='" + CurrenntDateAndTime + "' WHERE AttributeDCHistoryId=" + AttributeDCHistoryId;
          
           // alert('UpdateAllColumns query : ' + query);
            OneViewConsole.DataLog("Requested Query : " + query, "PreviousDCValuesDAO.UpdateAllColumns");

            var queryResult = window.OneViewSqlite.excecuteSql(query);
            OneViewConsole.Debug("UpdateAllColumns end", "PreviousDCValuesDAO.UpdateAllColumns");

        }
        catch (Excep) {
            alert("PreviousDCValuesDAO.UpdateAllColumns :" + Excep);
           // throw oOneViewExceptionHandler.Create("DAO", "PreviousDCValuesDAO.UpdateAllColumns", Excep);
        }
        finally {
            _DateTime = null;
            CurrenntDateAndTime = null;
            query = null;
            queryResult = null;
        }
    }

    this.GetAttributeWiseDCs = function (ServiceId, TemplateNodeId, DcPlaceId, DcPlaceDimension, DcUserId, AttributeNodeId, HistoryCount) {
        try {
            OneViewConsole.Debug("GetAttributeWiseDCs start", "DcDAO.GetAttributeWiseDCs");
            

            var query1 = "Select DISTINCT DataCaptureEntity.Id AS DataCaptureId from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                            " AND (DataCaptureEntity.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                            " AND (DataCaptureEntity.DcPlaceDimension = '" + DcPlaceDimension + "' OR '-1'='" + DcPlaceDimension + "')" +
                            " AND (DcResultsEntity.SystemUserId = " + DcUserId + " OR -1=" + DcUserId + ")" +
                            "  ORDER BY  DataCaptureEntity.CreatedDate DESC LIMIT " + HistoryCount;


            var DataCaptureList = ExcecuteSqlReader(query1);
            var DcResultDetails = [];

            if (DataCaptureList != undefined) {
                var IdList = DataCaptureList[0].DataCaptureId;

                for (var i = 1; i < DataCaptureList.length; i++) {
                    IdList = IdList + "," + DataCaptureList[i].DataCaptureId;
                }

                if (DataCaptureList != undefined)
                    var IdList = DataCaptureList[0].DataCaptureId;
                for (var i = 1; i < DataCaptureList.length; i++) {
                    IdList = IdList + "," + DataCaptureList[i].DataCaptureId;
                }

                var query2 = "Select Drds.Id, Drds.DataCaptureId, Drds.AttributeNodeId , Drds.ControlId , Drds.Answer,  Drds.AnswerValue ,Drds.LastUpdatedDate from DcResultDetailsEntity AS Drds Where Drds.DataCaptureId In (" + IdList + ")" +
                            " AND Drds.AttributeNodeId = " + AttributeNodeId +
                            " ORDER BY Drds.LastUpdatedDate,Drds.AttributeNodeId,Drds.ControlId ";

                //alert('Query :' + query2);

                DcResultDetails = ExcecuteSqlReader(query2);
            }
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcResultDetails), "DcDAO.GetDCs");
            OneViewConsole.Debug("GetAttributeWiseDCs end", "DcDAO.GetAttributeWiseDCs");

            return DcResultDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetAttributeWiseDCs", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    //Todo : (06-03-2017) Added By Sangeeta Bhatt , Currently IsCompleted passing undefined is allowed , later need to pass true/false only
    this.GetDCs = function (ServiceId, TemplateNodeId, DcPlaceId, DcPlaceDimension, DcUserId, AttributeList, HistoryCount, IsCompleted) {
        try {
            OneViewConsole.Debug("GetDCs start", "DcDAO.GetDCs");
            
            //var query1 = "Select DISTINCT DataCaptureEntity.Id AS DataCaptureId from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
            //                "where (DataCaptureEntity.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
            //                " AND (DataCaptureEntity.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
            //                " AND (DataCaptureEntity.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
            //                " AND (DataCaptureEntity.DcPlaceDimension = '" + DcPlaceDimension + "' OR '-1'='" + DcPlaceDimension + "')" +
            //                " AND (DcResultsEntity.SystemUserId = " + DcUserId + " OR -1=" + DcUserId + ")" +
            //                "  ORDER BY  DataCaptureEntity.CreatedDate DESC LIMIT " + HistoryCount;


            //var query1 = "Select DISTINCT DataCaptureEntity.Id AS DataCaptureId, " +
            //           " (substr(DataCaptureEntity.CreatedDate, 7, 4) || substr(DataCaptureEntity.CreatedDate, 4, 2) || substr(DataCaptureEntity.CreatedDate, 1, 2) || substr(DataCaptureEntity.CreatedDate, 1, 2) " +
            //             " || substr(DataCaptureEntity.CreatedDate, 12, 2) || substr(DataCaptureEntity.CreatedDate, 15, 2) || substr(DataCaptureEntity.CreatedDate, 18, 2)) AS CreatedDate " +
            //               "from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
            //               "where (DataCaptureEntity.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
            //               " AND (DataCaptureEntity.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
            //               " AND (DataCaptureEntity.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
            //               " AND (DataCaptureEntity.DcPlaceDimension = '" + DcPlaceDimension + "' OR '-1'='" + DcPlaceDimension + "')" +
            //               " AND (DcResultsEntity.SystemUserId = " + DcUserId + " OR -1=" + DcUserId + ")" +
            //               " ORDER BY CreatedDate DESC LIMIT " + HistoryCount;


            var query1 = "Select DISTINCT DataCaptureEntity.Id AS DataCaptureId, " +
             " (substr(DataCaptureEntity.TimeStamp, 7, 4) || substr(DataCaptureEntity.TimeStamp, 4, 2) || substr(DataCaptureEntity.TimeStamp, 1, 2) || substr(DataCaptureEntity.TimeStamp, 1, 2) " +
               " || substr(DataCaptureEntity.TimeStamp, 12, 2) || substr(DataCaptureEntity.TimeStamp, 15, 2) || substr(DataCaptureEntity.TimeStamp, 18, 2)) AS oTimeStamp " +
                 "from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                 "where (DataCaptureEntity.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                 " AND (DataCaptureEntity.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                 " AND (DataCaptureEntity.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                 " AND (DataCaptureEntity.DcPlaceDimension = '" + DcPlaceDimension + "' OR '-1'='" + DcPlaceDimension + "')" +
                 " AND (DcResultsEntity.SystemUserId = " + DcUserId + " OR -1=" + DcUserId + ")";


            //Todo : (06-03-2017) Added By Sangeeta Bhatt , IsCompleted passing undefined is allowed , later need to pass true/false only , need to remove undefined condition
            if (IsCompleted != undefined && IsCompleted != false) {
                query1 += " AND DataCaptureEntity.IsCompleted = 'true' ";
            }

            query1 += " ORDER BY oTimeStamp DESC LIMIT " + HistoryCount;

            //alert('query1 :' + query1);
            var DataCaptureList = ExcecuteSqlReader(query1);
            var DcResultDetails = [];
            // alert('DataCaptureList :' + JSON.stringify(DataCaptureList));
            if (DataCaptureList.length > 0) {

                var IdList = DataCaptureList[0].DataCaptureId;
                // alert('IdList :' + JSON.stringify(IdList));
                for (var i = 1; i < DataCaptureList.length; i++) {
                    IdList = IdList + "," + DataCaptureList[i].DataCaptureId;
                }

                if (AttributeList != undefined && AttributeList.length > 0) {
                    var AttributeIds = AttributeList[0].Id;
                    for (var i = 1; i < AttributeList.length; i++) {
                        AttributeIds = AttributeIds + "," + AttributeList[i].Id;
                    }

                    var query2 = "Select Drds.DataCaptureId, Drds.AttributeNodeId , Drds.ControlId , Drds.Answer,  Drds.AnswerValue ,Drds.LastUpdatedDate from DcResultDetailsEntity AS Drds Where Drds.DataCaptureId In (" + IdList + ")" +
                                " AND Drds.AttributeNodeId In (" + AttributeIds + ")" +
                                " ORDER BY Drds.DataCaptureId, Drds.LastUpdatedDate , Drds.AttributeNodeId,Drds.ControlId ";

                    // alert('query2 :' + query2);

                    DcResultDetails = ExcecuteSqlReader(query2);
                    // alert('DcResultDetails :' + JSON.stringify(DcResultDetails));
                    OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcResultDetails), "PreviousDCValuesDAO.GetDCs");
                }
            }

            OneViewConsole.Debug("GetDCs end", "PreviousDCValuesDAO.GetDCs");

            return DcResultDetails;
        }
        catch (Excep) {
            // alert('PreviousDCValuesDAO.GetDCs Excep: ' + JSON.stringify(Excep) + "," + Excep)
            throw oOneViewExceptionHandler.Create("DAO", "PreviousDCValuesDAO.GetDCs", Excep);
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

    this.GetDCsOLD = function (ServiceId, TemplateNodeId, DcPlaceId, DcPlaceDimension, DcUserId, AttributeNodeId, HistoryCount) {
        try {
            OneViewConsole.Debug("GetDCs start", "DcDAO.GetDCs");
            //ExcecuteIndexQueries();

            var query1 = "Select * from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                            " AND (DataCaptureEntity.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                            " AND (DataCaptureEntity.DcPlaceDimension = '" + DcPlaceDimension + "' OR '-1'='" + DcPlaceDimension + "')" +
                            " AND (DcResultsEntity.SystemUserId = " + DcUserId + " OR -1=" + DcUserId + ")" +
                            " LIMIT " + HistoryCount;



            var Query = "Select DataCaptureEntity.Id, DataCaptureEntity.ServerId, DataCaptureEntity.ClientGuid , DataCaptureEntity.CreatedDate, Drds.AttributeNodeId , Drds.ControlId , Drds.Answer,  Drds.AnswerValue ,DcResultsEntity.LastUpdatedDate " +
                            "from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "INNER JOIN DcResultDetailsEntity AS Drds ON Drds.DataResultsId=DcResultsEntity.Id " +
                            "where (DataCaptureEntity.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                            " AND (DataCaptureEntity.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                            " AND (DataCaptureEntity.DcPlaceDimension = '" + DcPlaceDimension + "' OR '-1'='" + DcPlaceDimension + "')" +
                            " AND (DcResultsEntity.SystemUserId = " + DcUserId + " OR -1=" + DcUserId + ")" +
                            " AND Drds.AttributeNodeId = " + AttributeNodeId +
                            " ORDER BY DataCaptureEntity.CreatedDate,DataCaptureEntity.Id,Drds.AttributeNodeId,Drds.ControlId DESC" +
                            " LIMIT " + HistoryCount;

            //var Query = "Select  Drds.AttributeNodeId , Drds.ControlId , Drds.Answer,  Drds.AnswerValue "+
            //                "from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
            //                "INNER JOIN DcResultDetailsEntity AS Drds ON Drds.DataResultsId=DcResultsEntity.Id " +
            //                "where (DataCaptureEntity.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
            //                " AND (DataCaptureEntity.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
            //                " AND (DataCaptureEntity.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
            //                " AND (DataCaptureEntity.DcPlaceDimension = '" + DcPlaceDimension + "' OR '-1'='" + DcPlaceDimension + "')" +
            //                " AND (DcResultsEntity.SystemUserId = " + DcUserId + " OR -1=" + DcUserId + ")" +
            //                " AND Drds.AttributeNodeId = " + AttributeNodeId +
            //                " ORDER BY DataCaptureEntity.CreatedDate,DataCaptureEntity.Id,Drds.AttributeNodeId,Drds.ControlId DESC" +
            //                " LIMIT " + HistoryCount;
            //var Query = "Select Drds.AttributeNodeId , Drds.ControlId , Drds.Answer,  Drds.AnswerValue " +
            //            " from DcResultDetailsEntity Drds "+
            //            " Where Drds.AttributeNodeId = " + AttributeNodeId +
            //            " LIMIT " + HistoryCount;

            // OneViewConsole.DataLog("Requested Query : " + Query, "DcDAO.GetDCs");

            // alert('Query :' + Query);'
            var startdate = new Date().getTime();
            // alert('Query startdate' + startdate);

            var DcInfo = ExcecuteSqlReader(Query);

            var enddate = new Date().getTime();
            var diff = enddate - startdate;
            alert(startdate + ' Query enddate' + enddate + ": diff v1= :    " + diff);

            //  alert('DcInfo :'+ DcInfo.length + JSON.stringify(DcInfo));
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcDAO.GetDCs");
            OneViewConsole.Debug("GetDCs end", "DcDAO.GetDCs");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.GetDCs", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }

    var ExcecuteIndexQueries = function () {

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

            var IndexQuery_AttributeNodeId_DcResultDetailsEntity = "Create INDEX AttributeNodeId On DcResultDetailsEntity(AttributeNodeId)";
            ExcecuteSql(IndexQuery_AttributeNodeId_DcResultDetailsEntity);

            var IndexQuery_DataResultsId_DcResultDetailsEntity = "Create INDEX DcResultDetailsEntityDataResultsId On DcResultDetailsEntity(DataResultsId)";
            ExcecuteSql(IndexQuery_DataResultsId_DcResultDetailsEntity);

            var IndexQuery_DataCaptureId_DcResultDetailsEntity = "Create INDEX DcResultDetailsEntityDataCaptureId On DcResultDetailsEntity(DataCaptureId)";
            ExcecuteSql(IndexQuery_DataCaptureId_DcResultDetailsEntity);

            var endtime = new Date().getTime();
            alert('endtime :' + endtime);
            var diff = endtime - starttime;
            alert('diff :' + diff);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.ExcecuteIndexQueries", Excep);
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
            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.ExcecuteSql", Excep);
        }
        finally {
            result = null;
        }
    }
}

// ActionNCProfileDAO
function ActionNCProfileDAO() {

    var MyInstance = this;

    //var _oDateTime = new DateTime();
    // var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetMetaData = function (ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension) {
        try {
            OneViewConsole.Debug("GetMetaData start", "ActionNCProfileDAO.GetMetaData");

            var Query = "SELECT * FROM ActionNCProfileEntity WHERE ServiceId = " + ServiceId + " AND DcPlaceId = " + DcPlaceId;
            Query += " AND DcUserId = " + DcUserId + " AND TemplateNodeId = " + TemplateNodeId;

            //  Query += " AND DcPlaceDimension = '" + DcPlaceDimension + "'

            //alert('Query:' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionNCProfileDAO.GetMetaData");

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (MetaData.length > 0) {

                var AttributeWiseActionNCConfig = "";
                var MultipleAttributeActionNCConfig = "";
                var TemplateWiseActionNCConfig = "";

                if (MetaData[0].AttributeWiseActionNCConfigJson != 'null') {
                    AttributeWiseActionNCConfig = JSON.parse(MetaData[0].AttributeWiseActionNCConfigJson);
                }
                if (MetaData[0].MultipleAttributeActionNCConfigJson != 'null') {
                    MultipleAttributeActionNCConfig = JSON.parse(MetaData[0].MultipleAttributeActionNCConfigJson);
                }
                if (MetaData[0].TemplateWiseActionNCConfigJson != 'null') {
                    TemplateWiseActionNCConfig = JSON.parse(MetaData[0].TemplateWiseActionNCConfigJson);
                }

                MetaData = {
                    "AttributeWiseActionNCConfig": AttributeWiseActionNCConfig,
                    "MultipleAttributeActionNCConfig": MultipleAttributeActionNCConfig,
                    "TemplateWiseActionNCConfig": TemplateWiseActionNCConfig,
                };
                return MetaData;
            }
            else {
                return null;
            }


            OneViewConsole.Debug("GetMetaData end", "ActionNCProfileDAO.GetMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionNCProfileDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
}

// TemplateConfigDAO
function TemplateConfigDAO() {

    var MyInstance = this;

    //var _oDateTime = new DateTime();
    // var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetByServiceIdAndTemplateNodeId = function (ServiceId, TemplateNodeId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "TemplateConfigDAO.GetByAllDimensions");

            var Query = "SELECT Id FROM TemplateConfigMetaData WHERE ServiceId = " + ServiceId + " AND TemplateNodeId = " + TemplateNodeId;

            OneViewConsole.DataLog("Requested Query : " + Query, "AttributeOtherConfigDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "TemplateConfigDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "TemplateConfigDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TemplateConfigDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetMetaData = function (ServiceId, TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetMetaData start", "TemplateConfigDAO.GetMetaData");

            var Query = "SELECT * FROM TemplateConfigMetaData WHERE ServiceId = " + ServiceId + " AND TemplateNodeId = " + TemplateNodeId;

            OneViewConsole.DataLog("Requested Query : " + Query, "TemplateConfigDAO.GetMetaData");

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (MetaData.length > 0) {

                if (MetaData[0].TemplateConfigMetaDataDetails != 'null') {
                    MetaData[0].TemplateConfigMetaDataDetails = JSON.parse(MetaData[0].TemplateConfigMetaDataDetails);
                }
                if (MetaData[0].RouteKeyConfig != 'null' && MetaData[0].RouteKeyConfig != '') {
                    MetaData[0].RouteKeyConfig = JSON.parse(MetaData[0].RouteKeyConfig);
                }

                MetaData = {
                    "ServiceId": MetaData[0].ServiceId,
                    "TemplateNodeId": MetaData[0].TemplateNodeId,
                    "TemplateName": MetaData[0].TemplateName,
                    "TemplateShortName": MetaData[0].TemplateShortName,
                    "IsHeaderEnable": (MetaData[0].IsHeaderEnable == 'false') ? false : true,
                    "IsFooterEnable": (MetaData[0].IsFooterEnable == 'false') ? false : true,
                    "IsScoringLogicEnabled": (MetaData[0].IsScoringLogicEnabled == 'false') ? false : true,
                    "ScoringLogicType": MetaData[0].ScoringLogicType,
                    "RouteKeyConfig": MetaData[0].RouteKeyConfig,
                    "AttributeGroupSummaryDisplayConfig": MetaData[0].AttributeGroupSummaryDisplayConfig,
                    "TemplateConfigMetaDataDetails": MetaData[0].TemplateConfigMetaDataDetails
                };
                return MetaData;
            }
            else {
                return null;
            }

            OneViewConsole.Debug("GetMetaData end", "TemplateConfigDAO.GetMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TemplateConfigDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }

    this.GetMetaDataList = function (ServiceId, TemplateNodeIdList) {
        try {
            OneViewConsole.Debug("GetMetaDataList start", "TemplateConfigDAO.GetMetaDataList");
            var FormattedMetaDataList = null;
            
            var Incondition = "(";

            for (var i = 0; i < TemplateNodeIdList.length; i++) {
                Incondition += TemplateNodeIdList[i];
                Incondition += (i <= TemplateNodeIdList.length - 2) ? "," : ")";
            }
            
            var Query = "SELECT * FROM TemplateConfigMetaData WHERE ServiceId = " + ServiceId + " AND TemplateNodeId IN " + Incondition;
            //alert(' Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "TemplateConfigDAO.GetMetaDataList");

            var MetaDataList = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);           
            //alert(' MetaDataList  : ' + JSON.stringify(MetaDataList));
          
            if (MetaDataList.length > 0) {
                FormattedMetaDataList = [];
                for (var i = 0; i < MetaDataList.length ; i++) {
                    var MetaData = MetaDataList[i];                    
                    if (MetaData.TemplateConfigMetaDataDetails != 'null') {
                        MetaData.TemplateConfigMetaDataDetails = JSON.parse(MetaData.TemplateConfigMetaDataDetails);
                    }
                    if (MetaData.RouteKeyConfig != 'null' && MetaData.RouteKeyConfig != '') {
                        MetaData.RouteKeyConfig = JSON.parse(MetaData.RouteKeyConfig);
                    }

                    var FormattedMetaData = {
                        "ServiceId": MetaData.ServiceId,
                        "TemplateNodeId": MetaData.TemplateNodeId,
                        "TemplateName": MetaData.TemplateName,
                        "TemplateShortName": MetaData.TemplateShortName,
                        "IsHeaderEnable": (MetaData.IsHeaderEnable == 'false') ? false : true,
                        "IsFooterEnable": (MetaData.IsFooterEnable == 'false') ? false : true,
                        "IsScoringLogicEnabled": (MetaData.IsScoringLogicEnabled == 'false') ? false : true,
                        "ScoringLogicType": MetaData.ScoringLogicType,
                        "RouteKeyConfig": MetaData.RouteKeyConfig,
                        "AttributeGroupSummaryDisplayConfig": MetaData.AttributeGroupSummaryDisplayConfig,
                        "TemplateConfigMetaDataDetails": MetaData.TemplateConfigMetaDataDetails
                    };

                    FormattedMetaDataList.push(FormattedMetaData);
                }
              
            }
          
            //alert(' FormattedMetaDataList  : ' + JSON.stringify(FormattedMetaDataList));

            OneViewConsole.Debug("GetMetaDataList end", "TemplateConfigDAO.GetMetaDataList");
            return FormattedMetaDataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TemplateConfigDAO.GetMetaDataList", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
}

// DCDisplayMetaDataDAO
function DCDisplayMetaDataDAO() {

    var MyInstance = this;

    //var _oDateTime = new DateTime();
    // var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetByServiceId = function (ServiceId) {

        try {
            OneViewConsole.Debug("GetByServiceId start", "DCDisplayMetaDataDAO.GetByServiceId");

            var Query = "SELECT Id FROM DCDisplayMetaData WHERE ServiceId = " + ServiceId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DCDisplayMetaDataDAO.GetByServiceId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DCDisplayMetaDataDAO.GetByServiceId");

            OneViewConsole.Debug("GetByServiceId end", "DCDisplayMetaDataDAO.GetByServiceId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DCDisplayMetaDataDAO.GetByServiceId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetMetaData = function (ServiceId) {
        try {
            OneViewConsole.Debug("GetMetaData start", "DCDisplayMetaDataDAO.GetMetaData");

            var Query = "SELECT * FROM DCDisplayMetaData WHERE ServiceId = " + ServiceId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DCDisplayMetaDataDAO.GetMetaData");

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (MetaData.length > 0) {

                MetaData = {
                    "ServiceId": MetaData[0].ServiceId,
                    "DeviceDisplyMode": MetaData[0].DeviceDisplyMode,
                    "TemplateName": MetaData[0].TemplateName,
                    "IsNameDisplay": (MetaData[0].IsNameDisplay == 'false') ? false : true,
                    "IsShortNameDisplay": (MetaData[0].IsShortNameDisplay == 'false') ? false : true,
                    "IsImageDisplay": (MetaData[0].IsImageDisplay == 'false') ? false : true,
                    "IsTypeIconDisplay": (MetaData[0].IsTypeIconDisplay == 'false') ? false : true,
                    "IsMandatoryDisplay": (MetaData[0].IsMandatoryDisplay == 'false') ? false : true
                };
                return MetaData;
            }
            else {
                return null;
            }

            OneViewConsole.Debug("GetMetaData end", "DCDisplayMetaDataDAO.GetMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DCDisplayMetaDataDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
}

// GlobalizationMetdataDAO
function GlobalizationMetdataDAO() {

    var MyInstance = this;

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetMetaData = function (ServiceId, OrganizationId, PageList, TemplateList) {
        try {
            
            OneViewConsole.Debug("GetMetaData start", "GlobalizationMetdataDAO.GetMetaData");

            var ItrList;
            var Query = "SELECT * FROM GlobalizationMetdataEntity WHERE ServiceId = " + ServiceId + " AND OrganizationId = " + OrganizationId;
            if (PageList == undefined || PageList == '' || PageList == null) {
                Query += " AND TemplateNodeId IN ";
                ItrList = TemplateList;
            }
            else if (TemplateList == undefined || TemplateList == '' || TemplateList == null) {
                Query += " AND PageId IN ";
                ItrList = PageList;
            }

            var Incondition = "(";
            for (var i = 0; i < ItrList.length; i++) {
                Incondition +=ItrList[i] ;
                Incondition += (i <= ItrList.length - 2) ? "," : ")";
            }
            Query += Incondition;

            //alert('Query :' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "GlobalizationMetdataDAO.GetMetaData");

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

           // alert('MetaData :' + JSON.stringify(MetaData));
            var ResponseList = [];
            for (var i = 0; i < MetaData.length ; i++) {
                ResponseList.push({
                    "ServiceId": MetaData[i].ServiceId,
                    "OrganizationId": MetaData[i].OrganizationId,
                    "PageId": MetaData[i].PageId,
                    "TemplateNodeId": MetaData[i].TemplateNodeId,
                    "LocalisedConfig": JSON.parse(MetaData[i].LocalisedConfig)
                });               
            }

            OneViewConsole.DataLog("ResponseList length : " + ResponseList.length.toString(), "GlobalizationMetdataDAO.GetMetaData");

            if (ResponseList.length > 0)
                return ResponseList;

            else
                return null;

            OneViewConsole.Debug("GetMetaData end", "GlobalizationMetdataDAO.GetMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "GlobalizationMetdataDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }

    this.GetByAllDimensions = function (ServiceId, OrganizationId, TemplateNodeId, PageId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "GlobalizationMetdataDAO.GetByAllDimensions");

            var Query = "SELECT Id,ServerId,OVGuid FROM GlobalizationMetdataEntity WHERE ServiceId = " + ServiceId + " AND OrganizationId = " + OrganizationId + " AND TemplateNodeId = " + TemplateNodeId + " AND PageId = " + PageId;

            OneViewConsole.DataLog("Requested Query : " + Query, "GlobalizationMetdataDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "GlobalizationMetdataDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "GlobalizationMetdataDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "GlobalizationMetdataDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetPageCountByPageIds = function (ServiceId, OrganizationId, PageIds) {

        try {
            OneViewConsole.Debug("GetPageCountByPageIds start", "GlobalizationMetdataDAO.GetPageCountByPageIds");

            var Exp = FomatForInCondition(PageIds);
            var Query = "SELECT Count(*) AS TotalCount FROM GlobalizationMetdataEntity WHERE ServiceId = " + ServiceId + " AND OrganizationId = " + OrganizationId + " AND PageId IN " + Exp;

            OneViewConsole.DataLog("Requested Query : " + Query, "GlobalizationMetdataDAO.GetPageCountByPageIds");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "GlobalizationMetdataDAO.GetByPageIds");

            OneViewConsole.Debug("GetPageCountByPageIds end", "GlobalizationMetdataDAO.GetPageCountByPageIds");

            return Result[0].TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "GlobalizationMetdataDAO.GetPageCountByPageIds", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    var FomatForInCondition = function (PageIds) {
        try {
            OneViewConsole.Debug("FomatForInConditionById start", "GlobalizationMetdataDAO.FomatForInConditionById");
            OneViewConsole.DataLog("Request PageIds : " + JSON.stringify(PageIds), "GlobalizationMetdataDAO.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < PageIds.length; i++) {
                Incondition += PageIds[i];
                Incondition += (i <= PageIds.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "GlobalizationMetdataDAO.FomatForInConditionById");
            OneViewConsole.Debug("FomatForInConditionById end", "GlobalizationMetdataDAO.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "GlobalizationMetdataDAO.FomatForInConditionById", Excep);
        }
        finally {
            Incondition = null;
        }
    }
}

//ActionNCProfileDAO
function ActionNCProfilingDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    this.GetByAllDimensions = function (DcPlaceId, TemplateNodeId, UserId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "ActionNCProfilingDAO.GetByAllDimensions");

            var Query = "SELECT * FROM ActionNCProfileEntity WHERE DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionNCProfilingDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionNCProfilingDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "ActionNCProfilingDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionNCProfilingDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.UpdateById = function (ActionNCProfileobj, Id) {

        try {
            OneViewConsole.Debug("UpdateById start", "ActionNCProfilingDAO.UpdateById");

            var Query = "UPDATE ActionNCProfileEntity SET ";
            Query += "OVGuid = " + AttributeOtherConfig.OVGuid + ", ";
            Query += "AttributeWiseActionNCConfigJson = '" + AttributeOtherConfig.AttributeWiseActionNCConfigJson + "', ";
            Query += "MultipleAttributeActionNCConfigJson = '" + AttributeOtherConfig.MultipleAttributeActionNCConfigJson + "', ";
            Query += "TemplateWiseActionNCConfigJson = '" + AttributeOtherConfig.TemplateWiseActionNCConfigJson + "', ";
            Query += "LastsyncDate = '" + CurrentDateAndTime + "', ";
            Query += "TimeStamp = '" + CurrentDateAndTime + "' ";
            Query += "WHERE Id = " + Id;

            OneViewConsole.DataLog("Requested Query : " + Query, "AttributeOtherConfigDAO.UpdateById");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateById end", "ActionNCProfilingDAO.UpdateById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionNCProfilingDAO.UpdateById", Excep);
        }
        finally {
            Query = null;
        }
    }


    this.GetMetaData = function (ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension) {
        try {
            OneViewConsole.Debug("GetMetaData start", "ActionNCProfilingDAO.GetMetaData");

            var Query = "SELECT * FROM ActionNCProfileEntity WHERE ServiceId = " + ServiceId + " AND DcPlaceId = " + DcPlaceId;
            Query += " AND DcUserId = " + DcUserId + " AND TemplateNodeId = " + TemplateNodeId;

            //  Query += " AND DcPlaceDimension = '" + DcPlaceDimension + "'

            // alert('Query:' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionNCProfilingDAO.GetMetaData");

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (MetaData.length > 0) {

                var AttributeWiseActionNCConfig = "";
                var MultipleAttributeActionNCConfig = "";
                var TemplateWiseActionNCConfig = "";

                if (MetaData[0].AttributeWiseActionNCConfigJson != 'null') {
                    AttributeWiseActionNCConfig = JSON.parse(MetaData[0].AttributeWiseActionNCConfigJson);
                }
                if (MetaData[0].MultipleAttributeActionNCConfigJson != 'null') {
                    MultipleAttributeActionNCConfig = JSON.parse(MetaData[0].MultipleAttributeActionNCConfigJson);
                }
                if (MetaData[0].TemplateWiseActionNCConfigJson != 'null') {
                    TemplateWiseActionNCConfig = JSON.parse(MetaData[0].TemplateWiseActionNCConfigJson);
                }

                MetaData = {
                    "AttributeWiseActionNCConfig": AttributeWiseActionNCConfig,
                    "MultipleAttributeActionNCConfig": MultipleAttributeActionNCConfig,
                    "TemplateWiseActionNCConfig": TemplateWiseActionNCConfig,
                };
                return MetaData;
            }
            else {
                return null;
            }


            OneViewConsole.Debug("GetMetaData end", "ActionNCProfilingDAO.GetMetaData");
        }
        catch (Excep) {
            // alert('ActionNCProfilingDAO.GetMetaData :' + Excep);
            //  alert('ActionNCProfilingDAO.GetMetaData :' + JSON.stringify(Excep))
            throw oOneViewExceptionHandler.Create("DAO", "ActionNCProfilingDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
}

//TemplatValidationConfigMetaDataDAO
function TemplatValidationConfigMetaDataDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    this.GetByAllDimensions = function (DcPlaceId, TemplateNodeId, UserId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "TemplatValidationConfigMetaDataDAO.GetByAllDimensions");

            var Query = "SELECT * FROM TemplateValidationConfigMetaDataEntity WHERE DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "TemplatValidationConfigMetaDataDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "TemplatValidationConfigMetaDataDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "TemplatValidationConfigMetaDataDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TemplatValidationConfigMetaDataDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.UpdateById = function (TemplateValidationConfigObj, Id) {

        try {
            OneViewConsole.Debug("UpdateById start", "TemplatValidationConfigMetaDataDAO.UpdateById");

            var Query = "UPDATE TemplateValidationConfigMetaDataEntity SET ";
            Query += "OVGuid = " + TemplateValidationConfigObj.OVGuid + ", ";
            Query += "SaveValidationMetaData = '" + TemplateValidationConfigObj.SaveValidationMetaData + "', ";
            Query += "SubmitValidationMetaData = '" + TemplateValidationConfigObj.SubmitValidationMetaData + "', ";
            Query += "ControlEventValidationJobs = '" + TemplateValidationConfigObj.ControlEventValidationJobs + "', ";
            Query += "LastsyncDate = '" + CurrentDateAndTime + "', ";
            Query += "TimeStamp = '" + CurrentDateAndTime + "' ";
            Query += "WHERE Id = " + Id;

            OneViewConsole.DataLog("Requested Query : " + Query, "TemplatValidationConfigMetaDataDAO.UpdateById");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateById end", "TemplatValidationConfigMetaDataDAO.UpdateById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TemplatValidationConfigMetaDataDAO.UpdateById", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetMetaData = function (ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension) {
        try {
            OneViewConsole.Debug("GetMetaData start", "TemplatValidationConfigMetaDataDAO.GetMetaData");

            var Query = "";

            // Temperaryly added for Elcita release (As per discussion with harshil).
            // Need to replace once issue fixed.
            if (ServiceId == 18) {
                Query = "SELECT * FROM TemplateValidationConfigMetaDataEntity WHERE ServiceId = " + ServiceId + " AND DcPlaceId = " + DcPlaceId + " ";
                Query += "AND DcUserId = " + DcUserId + " AND TemplateNodeId = " + TemplateNodeId;
            }
            else {
                Query = "SELECT * FROM TemplateValidationConfigMetaDataEntity WHERE ServiceId = " + ServiceId + " AND (-1 = " + DcPlaceId + " OR DcPlaceId = " + DcPlaceId + ")";
                Query += "AND (-1 = " + DcUserId + " OR  DcUserId = " + DcUserId + ") AND TemplateNodeId = " + TemplateNodeId;
            }

            //  Query += " AND DcPlaceDimension = '" + DcPlaceDimension + "'

            // alert('Query:' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "TemplatValidationConfigMetaDataDAO.GetMetaData");

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

         //   alert('MetaData here :' + JSON.stringify(MetaData));
            if (MetaData.length > 0) {

                var SaveValidationMetaData = "";
                var SubmitValidationMetaData = "";
                var ControlEventValidationJobs = "";

                if (MetaData[0].SaveValidationMetaData != '') {
                 
                    SaveValidationMetaData = JSON.parse(MetaData[0].SaveValidationMetaData);                   
                }
            
                if (MetaData[0].SubmitValidationMetaData != '') {
                    SubmitValidationMetaData =JSON.parse( MetaData[0].SubmitValidationMetaData);
                }
               
                if (MetaData[0].ControlEventValidationJobs != '') {
                    ControlEventValidationJobs =JSON.parse( MetaData[0].ControlEventValidationJobs);
                }
              
                MetaData = {
                    "SaveValidationMetaData": SaveValidationMetaData,
                    "SubmitValidationMetaData": SubmitValidationMetaData,
                    "ControlEventValidationJobs": ControlEventValidationJobs,
                };

            
                return MetaData;
            }
            else {
                return null;
            }


            OneViewConsole.Debug("GetMetaData end", "TemplatValidationConfigMetaDataDAO.GetMetaData");
        }
        catch (Excep) {
            // alert('TemplatValidationConfigMetaDataDAO.GetMetaData 22:' + Excep);
            //  alert('TemplatValidationConfigMetaDataDAO.GetMetaData 33:' + JSON.stringify(Excep))
            throw oOneViewExceptionHandler.Create("DAO", "TemplatValidationConfigMetaDataDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
}

//TemplateUIEventJobConfigMetaDataDAO
function TemplateUIEventJobConfigMetaDataDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    this.GetByAllDimensions = function (DcPlaceId, TemplateNodeId, UserId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "TemplateUIEventJobConfigMetaDataDAO.GetByAllDimensions");

            var Query = "SELECT Id,ServerId,OVGuid FROM TemplateUIEventJobConfigMetaDataEntity WHERE DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "TemplateUIEventJobConfigMetaDataDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "TemplateUIEventJobConfigMetaDataDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "TemplateUIEventJobConfigMetaDataDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TemplateUIEventJobConfigMetaDataDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetMetaData = function (ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension) {
        try {
            OneViewConsole.Debug("GetMetaData start", "TemplateUIEventJobConfigMetaDataDAO.GetMetaData");

            var Query = "SELECT * FROM TemplateUIEventJobConfigMetaDataEntity WHERE ServiceId = " + ServiceId + " AND (-1 = " + DcPlaceId + " OR DcPlaceId = " + DcPlaceId + ")";
            Query += "AND DcPlaceDimension = " + DcPlaceDimension + " AND (-1 = " + DcUserId + " OR  DcUserId = " + DcUserId + ") AND TemplateNodeId = " + TemplateNodeId;
           
            OneViewConsole.DataLog("Requested Query : " + Query, "TemplateUIEventJobConfigMetaDataDAO.GetMetaData");

           // alert('Query :' + Query);

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

           // alert('MetaData :' + JSON.stringify(MetaData));

            if (MetaData.length > 0) {

                var ControlEventUIJobs = "";              

                if (MetaData[0].ControlEventUIJobs != '') {
                    ControlEventUIJobs =JSON.parse( JSON.parse(MetaData[0].ControlEventUIJobs));
                }

                MetaData = {
                    "ControlEventUIJobs": ControlEventUIJobs
                };

                return MetaData;
            }
            else {
                return null;
            }

            OneViewConsole.Debug("GetMetaData end", "TemplateUIEventJobConfigMetaDataDAO.GetMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TemplateUIEventJobConfigMetaDataDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
}

//MobileViewRecordsMetadataDAO
function MobileViewRecordsMetadataDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    this.GetByAllDimensions = function (DcPlaceId, TemplateNodeId, UserId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "MobileViewRecordsMetadataDAO.GetByAllDimensions");

            var Query = "SELECT Id,ServerId,OVGuid FROM MobileViewRecordsMetadataEntity WHERE DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "MobileViewRecordsMetadataDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MobileViewRecordsMetadataDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "MobileViewRecordsMetadataDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MobileViewRecordsMetadataDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetMetaData = function (ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension) {
        try {
            OneViewConsole.Debug("GetMetaData start", "MobileViewRecordsMetadataDAO.GetMetaData");

            var Query = "SELECT * FROM MobileViewRecordsMetadataEntity WHERE ServiceId = " + ServiceId + " AND DcPlaceId = " + DcPlaceId;
            Query += " AND DcPlaceDimension = " + DcPlaceDimension + " AND DcUserId = " + DcUserId + " AND TemplateNodeId = " + TemplateNodeId;

            //alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "MobileViewRecordsMetadataDAO.GetMetaData");

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            //alert('MetaData : ' + JSON.stringify(MetaData));

            if (MetaData.length > 0) {
                var Response = {
                    ServiceId: 0,
                    DcUserId: 0,
                    TemplateNodeId: 0,
                    DcPlaceId: 0,
                    DcPlaceDimension: "",
                    Config: "",
                    InlineEditConfig: "",
                    ViewRecordsFacadeKey : ""
                };

                Response.ServiceId = MetaData[0].ServiceId;
                Response.DcUserId = MetaData[0].DcUserId;
                Response.TemplateNodeId = MetaData[0].TemplateNodeId;
                Response.DcPlaceId = MetaData[0].DcPlaceId;
                Response.DcPlaceDimension = MetaData[0].DcPlaceDimension;

                if (MetaData[0].ViewRecordsFacadeKey != "") {
                    Response.ViewRecordsFacadeKey = JSON.parse(MetaData[0].ViewRecordsFacadeKey);
                }
                if (MetaData[0].Config != "") {
                    Response.Config =  JSON.parse(JSON.parse(MetaData[0].Config));
                }
                if (MetaData[0].InlineEditConfig != "") {
                    Response.InlineEditConfig =JSON.parse(JSON.parse(MetaData[0].InlineEditConfig));
                }
                if (MetaData[0].Rules != "") {
                    Response.Rules =JSON.parse( JSON.parse(MetaData[0].Rules));
                }

                if (MetaData[0].AutoTemperatureListnerControlConfig != "") {
                    Response.AutoTemperatureListnerControlConfig = JSON.parse(JSON.parse(MetaData[0].AutoTemperatureListnerControlConfig));
                }

                if (MetaData[0].DefaultSearchConfig != "") {
                    Response.DefaultSearchConfig = JSON.parse(JSON.parse(MetaData[0].DefaultSearchConfig));
                }
                //alert('Response : ' + JSON.stringify(Response));

                return Response;
            }
            else {
                return null;
            }           

            OneViewConsole.Debug("GetMetaData end", "MobileViewRecordsMetadataDAO.GetMetaData");
        }
        catch (Excep) {
            //alert('GetMetaData : Excep , ' + Excep);
            throw oOneViewExceptionHandler.Create("DAO", "MobileViewRecordsMetadataDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
}

//GarbageCollectorMetadataDAO
function GarbageCollectorMetadataDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    this.GetByAllDimensions = function (DcPlaceId, TemplateNodeId, UserId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "GarbageCollectorMetadataDAO.GetByAllDimensions");

            var Query = "SELECT Id,ServerId,OVGuid FROM GarbageCollectorMetadataEntity WHERE DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "GarbageCollectorMetadataDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "GarbageCollectorMetadataDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "GarbageCollectorMetadataDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "GarbageCollectorMetadataDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetGarbageCollectorMetadata = function (Req) {
        try {
            OneViewConsole.Debug("GetMetaData start", "MobileViewRecordsMetadataDAO.GetMetaData");

            var Response = null;

            var Query = "Select * From GarbageCollectorMetadataEntity"+
                        " Where ServiceId = " + Req.ServiceId + 
                        " And (DcUserId = " + Req.DcUserId + " OR DcUserId='-1')" +
                        " And (TemplateNodeId = " + Req.TemplateNodeId + " OR TemplateNodeId='-1')" +
                        " And (DcPlaceId = " + Req.DcPlaceId + " OR DcPlaceId='-1')" +
                        " Order by DcUserId desc,TemplateNodeId  desc, DcPlaceId  desc LIMIT 1";

           // alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "MobileViewRecordsMetadataDAO.GetMetaData");

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            //alert('MetaData : ' + JSON.stringify(MetaData));

            if (MetaData.length > 0) {
                Response = {
                    ServiceId: 0,
                    DcUserId: 0,
                    TemplateNodeId: 0,
                    DcPlaceId: 0,
                    DcPlaceDimension: "",
                    Configuration: ""                   
                };

                Response.ServiceId = MetaData[0].ServiceId;
                Response.DcUserId = MetaData[0].DcUserId;
                Response.TemplateNodeId = MetaData[0].TemplateNodeId;
                Response.DcPlaceId = MetaData[0].DcPlaceId;
                Response.DcPlaceDimension = MetaData[0].DcPlaceDimension;
               
                if (MetaData[0].Configuration != "") {
                    Response.Configuration = JSON.parse(JSON.parse(MetaData[0].Configuration));
                }               
                //alert('Response : ' + JSON.stringify(Response));
            }            
           
            OneViewConsole.Debug("GetMetaData end", "MobileViewRecordsMetadataDAO.GetMetaData");

            return Response;
        }
        catch (Excep) {
            //alert('GetMetaData : Excep , ' + Excep);
            throw oOneViewExceptionHandler.Create("DAO", "MobileViewRecordsMetadataDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }

}

//DcCustomPageHtmlDAO
function DcCustomPageHtmlDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    this.GetByAllDimensions = function (ServiceId, TemplateNodeId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "DcCustomPageHtmlDAO.GetByAllDimensions");

            var Query = "SELECT Id,ServerId,OVGuid FROM DcCustomPageHtmlEntity WHERE ServiceId = " + ServiceId + " AND TemplateNodeId = " + TemplateNodeId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcCustomPageHtmlDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetMetaData end", "DcCustomPageHtmlDAO.GetByAllDimensions");

            return Result;            
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcCustomPageHtmlDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
   
    this.GetByTemplateNodeId = function (ServiceId, TemplateNodeId) {

        try {
            OneViewConsole.Debug("GetByTemplateNodeId start", "DcCustomPageHtmlDAO.GetByTemplateNodeId");

            var Query = "SELECT * FROM DcCustomPageHtmlEntity WHERE ServiceId = " + ServiceId + " AND TemplateNodeId = " + TemplateNodeId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DcCustomPageHtmlDAO.GetByTemplateNodeId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetByTemplateNodeId end", "DcCustomPageHtmlDAO.GetByTemplateNodeId");

            if (Result.length > 0) {
                return Result[0];
            }
            else {
                return null;
            }         

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcCustomPageHtmlDAO.GetByTemplateNodeId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }
}

//MobileDcPreviewMetadataDAO
function MobileDcPreviewMetadataDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    this.GetByAllDimensions = function (DcPlaceId, TemplateNodeId, UserId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "MobileDcPreviewMetadataDAO.GetByAllDimensions");

            var Query = "SELECT Id,ServerId,OVGuid FROM MobileDcPreviewMetadataEntity WHERE DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "MobileDcPreviewMetadataDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MobileDcPreviewMetadataDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "MobileDcPreviewMetadataDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MobileDcPreviewMetadataDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetMobileDcPreviewMetadata = function (Req) {

        try {
            OneViewConsole.Debug("GetMobileDcPreviewMetadata start", "MobileDcPreviewMetadataDAO.GetMobileDcPreviewMetadata");

            var Query = "SELECT * FROM MobileDcPreviewMetadataEntity WHERE" +
                        " (DcUserId = " + Req.DcUserId + " OR DcUserId='-1')" +
                        " AND (TemplateNodeId = " + Req.TemplateNodeId + " OR TemplateNodeId='-1')" +
                        " AND (DcPlaceId = " + Req.DcPlaceId + " OR DcPlaceId='-1')" +
                        " ORDER BY DcUserId desc,TemplateNodeId  desc, DcPlaceId  desc LIMIT 1";

            OneViewConsole.DataLog("Requested Query : " + Query, "MobileDcPreviewMetadataDAO.GetMobileDcPreviewMetadata");
            //alert('Query : ' + Query);
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MobileDcPreviewMetadataDAO.GetMobileDcPreviewMetadata");

            OneViewConsole.Debug("GetMobileDcPreviewMetadata end", "MobileDcPreviewMetadataDAO.GetMobileDcPreviewMetadata");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MobileDcPreviewMetadataDAO.GetMobileDcPreviewMetadata", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

}

// ExcludedAttributeMetadataDAO
function ExcludedAttributeMetadataDAO() {

    var MyInstance = this;

    //var _oDateTime = new DateTime();
    // var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetByServiceIdPlaceIDAndTemplateNodeId = function (ServiceId, TemplateNodeId, PlaceId) {

        try {
            OneViewConsole.Debug("GetByAllDimensions start", "ExcludedAttributeMetadataDAO.GetByAllDimensions");

            var Query = "SELECT Id FROM ExcludedAttributeMetadataEntity WHERE ServiceId = " + ServiceId + " AND TemplateNodeId = " + TemplateNodeId + " AND PlaceId=" + PlaceId;

            OneViewConsole.DataLog("Requested Query : " + Query, "AttributeOtherConfigDAO.GetByAllDimensions");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ExcludedAttributeMetadataDAO.GetByAllDimensions");

            OneViewConsole.Debug("GetByAllDimensions end", "ExcludedAttributeMetadataDAO.GetByAllDimensions");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ExcludedAttributeMetadataDAO.GetByAllDimensions", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetMetaData = function (ServiceId, TemplateNodeId, PlaceId) {
        try {
            OneViewConsole.Debug("GetMetaData start", "ExcludedAttributeMetadataDAO.GetMetaData");
         
            var Query = "SELECT * FROM ExcludedAttributeMetadataEntity WHERE ServiceId = " + ServiceId + " AND TemplateNodeId = " + TemplateNodeId + " AND PlaceId=" + PlaceId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ExcludedAttributeMetadataDAO.GetMetaData");

            var MetaData = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (MetaData.length > 0) {

                MetaData = {
                    "ServiceId": MetaData[0].ServiceId,
                    "TemplateNodeId": MetaData[0].TemplateNodeId,
                    "PlaceId": MetaData[0].PlaceId,
                    "AttributeIdLst": JSON.parse(MetaData[0].AttributeIdLst),
                };

                return MetaData;
            }
            else {
                return null;
            }

            OneViewConsole.Debug("GetMetaData end", "ExcludedAttributeMetadataDAO.GetMetaData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ExcludedAttributeMetadataDAO.GetMetaData", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }

    this.GetMetaDataList = function (ServiceId, TemplateNodeIdList) {
        try {
            OneViewConsole.Debug("GetMetaDataList start", "ExcludedAttributeMetadataDAO.GetMetaDataList");
            var FormattedMetaDataList = null;

            var Incondition = "(";

            for (var i = 0; i < TemplateNodeIdList.length; i++) {
                Incondition += TemplateNodeIdList[i];
                Incondition += (i <= TemplateNodeIdList.length - 2) ? "," : ")";
            }

            var Query = "SELECT * FROM ExcludedAttributeMetadataEntity WHERE ServiceId = " + ServiceId + " AND TemplateNodeId IN " + Incondition;
            //alert(' Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ExcludedAttributeMetadataDAO.GetMetaDataList");

            var MetaDataList = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            //alert(' MetaDataList  : ' + JSON.stringify(MetaDataList));

            if (MetaDataList.length > 0) {
                FormattedMetaDataList = [];
                for (var i = 0; i < MetaDataList.length ; i++) {
                    var MetaData = MetaDataList[i];
                    if (MetaData.TemplateConfigMetaDataDetails != 'null') {
                        MetaData.TemplateConfigMetaDataDetails = JSON.parse(MetaData.TemplateConfigMetaDataDetails);
                    }
                    if (MetaData.RouteKeyConfig != 'null' && MetaData.RouteKeyConfig != '') {
                        MetaData.RouteKeyConfig = JSON.parse(MetaData.RouteKeyConfig);
                    }

                    var FormattedMetaData = {
                        "ServiceId": MetaData.ServiceId,
                        "TemplateNodeId": MetaData.TemplateNodeId,
                        "TemplateName": MetaData.TemplateName,
                        "TemplateShortName": MetaData.TemplateShortName,
                        "IsHeaderEnable": (MetaData.IsHeaderEnable == 'false') ? false : true,
                        "IsFooterEnable": (MetaData.IsFooterEnable == 'false') ? false : true,
                        "IsScoringLogicEnabled": (MetaData.IsScoringLogicEnabled == 'false') ? false : true,
                        "ScoringLogicType": MetaData.ScoringLogicType,
                        "RouteKeyConfig": MetaData.RouteKeyConfig,
                        "AttributeGroupSummaryDisplayConfig": MetaData.AttributeGroupSummaryDisplayConfig,
                        "TemplateConfigMetaDataDetails": MetaData.TemplateConfigMetaDataDetails
                    };

                    FormattedMetaDataList.push(FormattedMetaData);
                }

            }

            //alert(' FormattedMetaDataList  : ' + JSON.stringify(FormattedMetaDataList));

            OneViewConsole.Debug("GetMetaDataList end", "ExcludedAttributeMetadataDAO.GetMetaDataList");
            return FormattedMetaDataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ExcludedAttributeMetadataDAO.GetMetaDataList", Excep);
        }
        finally {
            Query = null;
            MetaData = null;
        }
    }
}



