
// DefaultMasterDAO
/// <param name="TableName">Name of the table</param>
function DefaultMasterDAO(TableName) {

    // DefaultMasterDAO object
    var MyInstance = this;

    // Get CurrenntDateAndTime from OneViewDateTime framework
    var oDateTime = new DateTime();
    var CurrenntDateAndTime = oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
    
    /// <summary>
    /// It will give total rows count of the table
    /// API get table count
    /// </summary>   
    /// <returns>Rows count of the table</returns>
    this.Count = function () {
        try {
            OneViewConsole.Debug("Count start", "DefaultMasterDAO.Count");
            OneViewConsole.DataLog("TableName : " + TableName, "DefaultMasterDAO.Count");

            var Query = "SELECT (CASE WHEN MAX(Id) IS NULL THEN 0 ELSE MAX(Id) END) AS Count FROM " + TableName;

            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            result = JSON.parse(result);

            OneViewConsole.DataLog("Response from db : " + result[0].Count, "DefaultMasterDAO.Count");
            OneViewConsole.Debug("Count end", "DefaultMasterDAO.Count");
            
            return result[0].Count;
        }
        catch (Excep) {       	
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.Count", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }
  
   
    /// <summary>
    /// It will create master entity
    /// API for create master
    /// </summary>   
    /// <param name="MasterEntityobj">Master entity object</param>
    /// <returns>Created master entity object</returns>
    this.CreateMaster = function (MasterEntityobj) {

        try {

            OneViewConsole.Debug("CreateMaster start : " + MasterEntityobj.constructor.name, "DefaultMasterDAO.CreateMaster");
         
            var Count = MyInstance.Count(TableName);
           
            var CreatedMasterobj = MyInstance.Create(MasterEntityobj, Count);

            OneViewConsole.Debug("CreateMaster end : " + MasterEntityobj.constructor.name, "DefaultMasterDAO.CreateMaster");

            return CreatedMasterobj;
        }
        catch (Excep) {          	       
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.CreateMaster", Excep);
        }
        finally {
            Count = null;
            CreatedMasterobj = null;
        }
    }


    /// <summary>
    /// It will insert master entity into table
    /// API for create
    /// </summary>   
    /// <param name="MasterEntityobj">Master entity object</param>
    /// <param name="Count">Current row count of the table</param>
    /// <returns>Create master entity object</returns>
    this.Create = function (MasterEntityobj, Count, IsProfiledownload) {
    
        try {           
            OneViewConsole.Debug("Create start : " + MasterEntityobj.constructor.name, "DefaultMasterDAO.Create");

            MasterEntityobj.Id = Count + 1;
            if (IsProfiledownload != true) {
                MasterEntityobj.TimeStamp = CurrenntDateAndTime;
            }
            
            var _oSqliteQG = new SqliteQG();
            var Query = _oSqliteQG.GetInsertQuery(MasterEntityobj);
     
            //alert(Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.Create");

            window.OneViewSqlite.excecuteSql(Query);

            OneViewConsole.Debug("Create end : " + MasterEntityobj.constructor.name, "DefaultMasterDAO.Create");

            return MasterEntityobj;
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.Create", Excep);
        }
        finally {
            _oSqliteQG = null;
            Query = null;
        }
    }


    /// <summary>
    /// It will insert master entity list into table
    /// API for bulk create
    /// </summary>   
    /// <param name="MasterEntityobj">Master entity list</param>
    /// <param name="IsProfiledownload">IsProfiledownload</param>
    /// <returns>master entity list</returns>
    this.BulkCreate = function (MasterEntityLst, IsProfiledownload) {

        try {
            OneViewConsole.Debug("BulkCreate start, DefaultMasterDAO.BulkCreate");
            
            if (MasterEntityLst.length > 0) {

                var Count = MyInstance.Count();

                for (var i = 0; i < MasterEntityLst.length; i++) {

                    MasterEntityLst[i].Id = Count + 1;

                    if (IsProfiledownload != true) {
                        MasterEntityLst[i].TimeStamp = CurrenntDateAndTime;
                    }

                    Count++;
                }

                var _oSqliteQG = new SqliteQG();
                var Query = _oSqliteQG.GetBulkInsertQuery(MasterEntityLst);

                //alert(Query);

                window.OneViewSqlite.excecuteSql(Query);
            }
            
            OneViewConsole.Debug("BulkCreate end, DefaultMasterDAO.BulkCreate");
            
            return MasterEntityLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.BulkCreate", Excep);
        }
        finally {
            _oSqliteQG = null;
            Query = null;
        }
    }

    
    /// <summary>
    /// It will insert master entity list into table
    /// API for create masters
    /// </summary>   
    /// <param name="MasterEntitylst">List of master entities</param>
    this.CreateMasters = function(MasterEntitylst) {

        try {
            OneViewConsole.Debug("CreateMasters start", "DefaultMasterDAO.CreateMasters");

            var Count = MyInstance.Count(TableName);

            for (var i = 0; i < MasterEntitylst.length; i++) {
                MyInstance.Create(MasterEntitylst[i], Count);
                Count += 1;
            }

            OneViewConsole.Debug("CreateMasters end", "DefaultMasterDAO.CreateMasters");
        }
        catch (Excep) {
            //alert("DefaultMasterDAO.CreateMasters Excep 1" + Excep);
            //alert("DefaultMasterDAO.CreateMasters Excep 2" + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.CreateMasters", Excep);
        }
        finally {
            Count = null;
        }
    } 
    

    /// <summary>
    /// It will give the master by server id (server id is string)
    /// API for get master by server id
    /// </summary>   
    /// <param name="ServerId">ServerId</param>
    this.GetByServerIdString = function (ServerId) {

        try {
            OneViewConsole.Debug("GetByServerIdString start", "DefaultMasterDAO.GetByServerIdString");

            var Query = "Select * FROM " + TableName + " WHERE ServerId = '" + ServerId + "'";
           // alert(Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetByServerIdString");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetByServerIdString");

            OneViewConsole.Debug("GetByServerIdString end", "DefaultMasterDAO.GetByServerIdString");
            //alert(result);
            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetByServerIdString", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }


    /// <summary>
    /// It will give the master by server id (server id is integer)
    /// API for get master by server id
    /// </summary>   
    /// <param name="ServerId">ServerId</param>
    this.GetByServerId = function (ServerId) {

        try {
            OneViewConsole.Debug("GetByServerId start", "DefaultMasterDAO.GetByServerId");

            var Query = "Select * FROM " + TableName + " WHERE ServerId = " + ServerId;
           // alert(Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetByServerId");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetByServerId");

            OneViewConsole.Debug("GetByServerId end", "DefaultMasterDAO.GetByServerId");
            //alert(result);
            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetByServerId", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }


    /// <summary>
    /// It will give the master by id (id is integer)
    /// API for get master by id
    /// </summary>   
    /// <param name="Id">Id</param>
    this.GetById = function (Id) {

        try {
            OneViewConsole.Debug("GetById start", "DefaultMasterDAO.GetById");

            var Query = "Select * FROM " + TableName + " WHERE Id = " + Id;
            // alert(Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetById");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetById");

            OneViewConsole.Debug("GetById end", "DefaultMasterDAO.GetById");
            //alert(result);
            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetById", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    /// <summary>
    /// It will give the master by ClientGuid (ClientGuid is string)
    /// API for get master by ClientGuid
    /// </summary>   
    /// <param name="ClientGuid">ClientGuid</param>
    this.GetByClientGuid = function (ClientGuid) {

        try {
            OneViewConsole.Debug("GetByClientGuid start", "DefaultMasterDAO.GetByClientGuid");

            var Query = "Select * FROM " + TableName + " WHERE ClientGuid = '" + ClientGuid + "'";
            // alert(Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetByClientGuid");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetByClientGuid");

            OneViewConsole.Debug("GetByClientGuid end", "DefaultMasterDAO.GetByClientGuid");
            //alert(result);
            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetByClientGuid", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }

    
    /// <summary>    
    /// API for get all masters
    /// </summary>   
    /// <returns>List of masters</returns>
    this.GetAllMasters = function() {

        try {
            OneViewConsole.Debug("GetAllMasters start", "DefaultMasterDAO.GetAllMasters");

            var Query = "SELECT * FROM " + TableName;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllMasters");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllMasters");

            OneViewConsole.Debug("GetAllMasters end", "DefaultMasterDAO.GetAllMasters");

            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllMasters", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }


    /// <summary>    
    /// API for get all masters (un synchronized)
    /// </summary>   
    /// <returns>List of masters</returns>
    this.GetAllUnSyncMasters = function() {

        try {
            OneViewConsole.Debug("GetAllUnSyncMasters start", "DefaultMasterDAO.GetAllUnSyncMasters");

            var Query = "SELECT * FROM " + TableName + " WHERE ProcessCount > 0 AND IsSynchronized = 'false'";
            
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllUnSyncMasters");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllUnSyncMasters");

            OneViewConsole.Debug("GetAllUnSyncMasters end", "DefaultMasterDAO.GetAllUnSyncMasters");

            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllUnSyncMasters", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }


    /// <summary>    
    /// API for get all masters with type
    /// </summary>   
    /// <param name="Type">Type</param>
    /// <returns>List of masters</returns>
    this.GetAllMastersWithType = function (Type) {

        try {
            OneViewConsole.Debug("GetAllMastersWithType start", "DefaultMasterDAO.GetAllMastersWithType");

            var Query = "SELECT * FROM " + TableName + " WHERE RcoTypeId = " + Type ;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllMastersWithType");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllMastersWithType");

            OneViewConsole.Debug("GetAllMastersWithType end", "DefaultMasterDAO.GetAllMastersWithType");

            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllMastersWithType", Excep);
        }
        finally {
            Query = null;
            result = null;
        }
    }


    /// <summary>    
    /// API for get all masters by column
    /// </summary>   
    /// <param name="ColumnName">ColumnName</param>
    /// <param name="ColumnValue">ColumnValue</param>
    /// <param name="DataType">DataType</param>
    /// <returns>List of masters</returns>
    this.GetAllMastersByColumn = function (ColumnName, ColumnValue, DataType) {

        try {
            OneViewConsole.Debug("GetAllMastersByColumn start", "DefaultMasterDAO.GetAllMastersByColumn");

            var Query = "SELECT * FROM " + TableName ;
            var Exp = " WHERE " + ColumnName + " = " + ((DataType == "INT") ? ColumnValue : "'" + ColumnValue + "'");
            
            OneViewConsole.DataLog("Requested Query : " + Query + Exp, "DefaultMasterDAO.GetAllMastersByColumn");

          //  alert("quer = " + Query + Exp);

            var result = window.OneViewSqlite.excecuteSqlReader(Query + Exp);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllMastersByColumn");

            OneViewConsole.Debug("GetAllMastersByColumn end", "DefaultMasterDAO.GetAllMastersByColumn");
            
            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllMastersByColumn", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            result = null;
        }
    }


    /// <summary>    
    /// API for get all masters by column and type
    /// </summary>   
    /// <param name="ColumnName">ColumnName</param>
    /// <param name="ColumnValue">ColumnValue</param>
    /// <param name="DataType">DataType</param>
    /// <param name="Type">Type</param>
    /// <returns>List of masters</returns>
    this.GetAllMastersByColumnAndType = function (ColumnName, ColumnValue, DataType, Type) {

        try {
            OneViewConsole.Debug("GetAllMastersByColumnAndType start", "DefaultMasterDAO.GetAllMastersByColumnAndType");

            var Query = "SELECT * FROM " + TableName;
            var Exp = " WHERE " + ColumnName + " = " + ((DataType == "INT") ? ColumnValue : "'" + ColumnValue + "'");
            var Type = " Type = '" + Type + "'" ;

            OneViewConsole.DataLog("Requested Query : " + Query + Exp + Type, "DefaultMasterDAO.GetAllMastersByColumnAndType");

            var result = window.OneViewSqlite.excecuteSqlReader(Query + Exp + Type);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllMastersByColumnAndType");

            OneViewConsole.Debug("GetAllMastersByColumnAndType end", "DefaultMasterDAO.GetAllMastersByColumnAndType");

            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllMastersByColumnAndType", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }


    /// <summary>    
    /// GetAllIdAndOVGuid
    /// </summary>      
    /// <returns>ResultDic</returns>
    this.GetAllServerIdAndOVGuid = function () {

        try {
            OneViewConsole.Debug("GetAllIdAndOVGuid start", "DefaultMasterDAO.GetAllIdAndOVGuid");

            var ResultDic = {};

            var Query = "SELECT ServerId,OVGuid FROM " + TableName;
           
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllIdAndOVGuid");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllIdAndOVGuid");

            OneViewConsole.Debug("GetAllIdAndOVGuid end", "DefaultMasterDAO.GetAllIdAndOVGuid");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = result[i].OVGuid;
            }

            return ResultDic;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllIdAndOVGuid", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }


    /// <summary>    
    /// GetAllServerIdAndId
    /// </summary>      
    /// <returns>ResultDic</returns>
    this.GetAllServerIdAndId = function () {

        try {
            OneViewConsole.Debug("GetAllServerIdAndId start", "DefaultMasterDAO.GetAllServerIdAndId");

            var ResultDic = {};

            var Query = "SELECT ServerId,Id FROM " + TableName;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllServerIdAndId");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllServerIdAndId");

            OneViewConsole.Debug("GetAllServerIdAndId end", "DefaultMasterDAO.GetAllServerIdAndId");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = result[i].Id;
            }

            return ResultDic;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllServerIdAndId", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }


    /// <summary>    
    /// GetAllInfoWithServerIdDict
    /// </summary>      
    /// <returns>ResultDic</returns>
    this.GetAllInfoWithServerIdDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdDict start", "DefaultMasterDAO.GetAllInfoWithServerIdDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid,Name FROM " + TableName;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdDict end", "DefaultMasterDAO.GetAllInfoWithServerIdDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = { "Id": result[i].Id, "OVGuid": result[i].OVGuid, "Name": result[i].Name };
            }

            return ResultDic;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }


    /// <summary>    
    /// API for UpdateMasterServerIds
    /// </summary>   
    /// <param name="ClientServerDTO">ClientServerDTO</param>
    this.UpdateMasterServerIds = function (ClientServerDTO) {

        try {
            OneViewConsole.Debug("UpdateMasterServerIds start", "DefaultMasterDAO.UpdateMasterServerIds");

            for (var i = 0; i < ClientServerDTO.length; i++) {
                MyInstance.UpdateMasterServerId(ClientServerDTO[i].Id, ClientServerDTO[i].ServerId);
            }

            OneViewConsole.Debug("UpdateMasterServerIds end", "DefaultMasterDAO.UpdateMasterServerIds");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.UpdateMasterServerIds", Excep);
        }
    }


    /// <summary>    
    /// API for UpdateMasterServerId
    /// </summary>  
    /// <param name="ClientId">ClientId</param>
    /// <param name="ServerId">ServerId</param>
    this.UpdateMasterServerId = function (ClientId, ServerId) {

        try {
            OneViewConsole.Debug("UpdateMasterServerId start", "DefaultMasterDAO.UpdateMasterServerId");

            var Query = "Update " + TableName + " SET ProcessCount = 0, IsSynchronized = 'true', ServerId = " + ServerId + " WHERE Id = " + ClientId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.UpdateMasterServerId");

            window.OneViewSqlite.excecuteSql(Query);

            OneViewConsole.Debug("UpdateMasterServerId end", "DefaultMasterDAO.UpdateMasterServerId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.UpdateMasterServerId", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>    
    /// API for UpdateNodeServerIds
    /// </summary>  
    /// <param name="ClientServerDTO">ClientServerDTO</param>
    this.UpdateNodeServerIds = function (ClientServerDTO) {

        try {
            OneViewConsole.Debug("UpdateNodeServerIds start", "DefaultMasterDAO.UpdateNodeServerIds");

            for (var i = 0; i < ClientServerDTO.length; i++) {
                MyInstance.UpdateNodeServerId(ClientServerDTO[i].Id, ClientServerDTO[i].ServerId, ClientServerDTO[i].ChildDbElementId, TableName);
            }

            OneViewConsole.Debug("UpdateNodeServerIds end", "DefaultMasterDAO.UpdateNodeServerIds");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.UpdateNodeServerIds", Excep);
        }
    }


    /// <summary>    
    /// API for UpdateNodeServerId
    /// </summary>  
    /// <param name="ClientId">ClientId</param>
    /// <param name="ServerId">ServerId</param>
    /// <param name="ChildDbElementId">ChildDbElementId</param>
    this.UpdateNodeServerId = function (ClientId, ServerId, ChildDbElementId) {

        try {
            OneViewConsole.Debug("UpdateNodeServerId start", "DefaultMasterDAO.UpdateNodeServerId");

            var Query = "Update " + TableName + " SET ProcessCount = 0, IsSynchronized = 'true', ServerId = " + ServerId + ", ChildDbElementId = " + ChildDbElementId + " WHERE Id = " + ClientId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.UpdateNodeServerId");

            window.OneViewSqlite.excecuteSql(Query);

            OneViewConsole.Debug("UpdateNodeServerId end", "DefaultMasterDAO.UpdateNodeServerId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.CreateMasters", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>    
    /// API for UpdateProcessCount
    /// </summary>  
    this.UpdateProcessCount = function () {

        try {
            OneViewConsole.Debug("UpdateProcessCount start", "DefaultMasterDAO.UpdateProcessCount");

            var Query = "Update " + TableName + " SET ProcessCount = ProcessCount+1";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.UpdateProcessCount");

            window.OneViewSqlite.excecuteSql(Query);

            OneViewConsole.Debug("UpdateProcessCount end", "DefaultMasterDAO.UpdateProcessCount");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.UpdateProcessCount", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>    
    /// API for UpdateProcessCountForUnsyncData
    /// </summary>  
    this.UpdateProcessCountForUnsyncData = function () {

        try {
            OneViewConsole.Debug("UpdateProcessCount start", "DefaultMasterDAO.UpdateProcessCount");

            var Query = "Update " + TableName + " SET ProcessCount = ProcessCount+1 where IsSynchronized = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.UpdateProcessCount");

            window.OneViewSqlite.excecuteSql(Query);

            OneViewConsole.Debug("UpdateProcessCount end", "DefaultMasterDAO.UpdateProcessCount");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.UpdateProcessCount", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>    
    /// API for Update
    /// </summary>  
    /// <param name="oEntity">Master or Node Entity</param>
    this.Update = function (oEntity) {

        try {
            OneViewConsole.Debug("Update start : " + oEntity.constructor.name, "DefaultMasterDAO.Update");

            oEntity.TimeStamp = CurrenntDateAndTime;

            var _oSqliteQG = new SqliteQG();
            var Query = _oSqliteQG.GetUpdateQuery(oEntity);

            //alert(Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.Update");

            window.OneViewSqlite.excecuteSql(Query);

            OneViewConsole.Debug("Update end : " + oEntity.constructor.name, "DefaultMasterDAO.Update");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.Update", Excep);
        }
        finally {
            _oSqliteQG = null;
            Query = null;
        }
    }

    
    /// <summary>    
    /// API for DeleteByServerId
    /// </summary>  
    /// <param name="ServerId">ServerId</param>
    this.DeleteByServerId = function (ServerId) {

        try {
            OneViewConsole.Debug("DeleteByServerId start", "DefaultMasterDAO.DeleteByServerId");

            var Query = "Delete FROM " + TableName + " WHERE ServerId = " + ServerId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.DeleteByServerId");

            window.OneViewSqlite.excecuteSql(Query);

            OneViewConsole.Debug("DeleteByServerId end", "DefaultMasterDAO.DeleteByServerId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.DeleteByServerId", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>    
    /// API for DeleteById
    /// </summary>  
    /// <param name="Id">Id</param>
    this.DeleteById = function (Id) {

        try {
            OneViewConsole.Debug("DeleteById start", "DefaultMasterDAO.DeleteById");

            var Query = "Delete FROM " + TableName + " WHERE Id = " + Id;
         
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.DeleteById");

            window.OneViewSqlite.excecuteSql(Query);
          
            OneViewConsole.Debug("DeleteById end", "DefaultMasterDAO.DeleteById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.DeleteById", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>    
    /// API for Delete all rows
    /// </summary>    
    this.Delete = function () {

        try {
            OneViewConsole.Debug("Delete start", "DefaultMasterDAO.Delete");

            var Query = "Delete FROM " + TableName;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.Delete");

            window.OneViewSqlite.excecuteSql(Query);

            OneViewConsole.Debug("Delete end", "DefaultMasterDAO.Delete");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.Delete", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>    
    /// IsTableExist
    /// </summary>    
    this.IsTableExist = function () {

        try {
            OneViewConsole.Debug("IsTableExist start", "DefaultMasterDAO.IsTableExist");

            var IsExist = false;

            var Query = "SELECT name FROM sqlite_master WHERE type='table' AND name='" + TableName + "'";
           
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.IsTableExist");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            result = JSON.parse(result);
        
            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetByServerId");

            if (result.length > 0) {
                IsExist = true;
            }

            OneViewConsole.Debug("IsTableExist end", "DefaultMasterDAO.IsTableExist");

            return IsExist;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.IsTableExist", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>    
    /// API for DeleteByProperty
    /// </summary>  
    /// <param name="Id">Id</param>
    this.DeleteByProperty = function (Result,Property,DataType) {

        try {
            OneViewConsole.Debug("DeleteByProperty start", "DefaultMasterDAO.DeleteByProperty");

            var Exp = FomatForInConditionByProperty(Result, Property, DataType);

            var Query = "DELETE FROM " + TableName + " WHERE " + Property + " In " + Exp;
            //alert("DeleteByIdLst : " + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.DeleteByProperty");

            window.OneViewSqlite.excecuteSql(Query);

            OneViewConsole.Debug("DeleteByProperty end", "DefaultMasterDAO.DeleteByProperty");
        }
        catch (Excep) {
            //alert(Excep + "..." + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.DeleteByProperty", Excep);
        }
        finally {
            Query = null;
        }
    }

    var FomatForInConditionByProperty = function (Result, Property, DataType) {
        try {
            OneViewConsole.Debug("FomatForInConditionByProperty start", "DefaultMasterDAO.FomatForInConditionByProperty");
            OneViewConsole.DataLog("Request Result : " + JSON.stringify(Result), "DefaultMasterDAO.FomatForInConditionByProperty");

            var Incondition = "(";

            for (var i = 0; i < Result.length; i++) {
                if (DataType == "INT") {
                    Incondition +=  Result[i][Property];
                }
                else {
                    Incondition += "'" + Result[i][Property] + "'";
                }
                Incondition += (i <= Result.length - 2) ? "," : ")";
            }
            //alert(Incondition);
            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "DefaultMasterDAO.FomatForInConditionByProperty");
            OneViewConsole.Debug("FomatForInConditionByProperty end", "DefaultMasterDAO.FomatForInConditionByProperty");

            return Incondition;
        }
        catch (Excep) {
            //alert(Excep + "..." + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.FomatForInConditionByProperty", Excep);
        }
        finally {
            Incondition = null;
        }
    }

}