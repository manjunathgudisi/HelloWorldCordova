
// DATEntityTypesBO
function DATEntityTypesBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// Download
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "DATEntityTypesBO.Download");

            var IsSuccess = false;

            var _DefaultMasterDAO = new DefaultMasterDAO("DATEntityTypes");
            var IsExist = _DefaultMasterDAO.IsTableExist();

            if (IsExist == false) {
                var oSqliteQG = new SqliteQG();
                var Query = oSqliteQG.GetCreateTableQuery(new window["DATEntityTypes"]);
                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "DATEntityTypesBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {

                var _oDATEntityTypesIL = new DATEntityTypesIL();
                var _oDATEntityTypes = _oDATEntityTypesIL.GetDATEntityTypes(OneViewSessionStorage.Get("ServiceId"));

                //alert("Download : "+JSON.stringify(_oDATEntityTypes));

                if (_oDATEntityTypes != null && _oDATEntityTypes.IsAnyException == false) {

                    MyInstance.Create(_oDATEntityTypes.DATEntityTypesDTOLst, OneViewSessionStorage.Get("ServiceId"));
                    IsSuccess = true;
                }
            }
            else {
                //navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
				navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "DATEntityTypesBO.Download");
            }

            OneViewConsole.Debug("Download end", "DATEntityTypesBO.Download");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DATEntityTypesBO.Download", Excep);
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
    /// <param name="DATEntityTypesDTO">DATEntityTypesDTO</param> 
    this.Create = function (DATEntityTypesDTO, ServiceId) {

        try {
            OneViewConsole.Debug("Create start", "DATEntityTypesBO.Create");

            if (DATEntityTypesDTO != null) {

                var _oDefaultMasterDAO = new DefaultMasterDAO("DATEntityTypes");
                var Count = _oDefaultMasterDAO.Count();

                var _oDATEntityTypesDAO = new DATEntityTypesDAO();
                _oDATEntityTypesDAO.DeleteByServiceId(ServiceId);

                var _oDATEntityTypesNormalizer = new DATEntityTypesNormalizer();
                var DATEntityTypesDTOList = _oDATEntityTypesNormalizer.NormalizeList(DATEntityTypesDTO);
                for (var i = 0; i < DATEntityTypesDTOList.length; i++) {
                    _oDefaultMasterDAO.Create(DATEntityTypesDTOList[i], Count);
                    Count += 1;
                }
            }

            OneViewConsole.Debug("Create end", "DATEntityTypesBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DATEntityTypesBO.Create", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// Inserts InsertDATEntityTypes
    /// </summary>
    /// <param name="DATEntityTypesDTOList">DATEntityTypesDTO list</param>
    /// <returns>true or false</returns>  
    var InsertDATEntityTypes = function (DATEntityTypesDTOList, Count) {
        try {
            OneViewConsole.Debug("InsertDATEntityTypes start", "DATEntityTypesBO.InsertDATEntityTypes");
            
            var _oDefaultMasterDAO = new DefaultMasterDAO("DATEntityTypes");
            for (var i = 0; i < DATEntityTypesDTOList.length; i++) {
                _oDefaultMasterDAO.Create(DATEntityTypesDTOList[i], Count);
                Count += 1;
            }

            OneViewConsole.Debug("InsertDATEntityTypes end", "DATEntityTypesBO.InsertDATEntityTypes");

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DATEntityTypesBO.InsertDATEntityTypes", Excep);
        }
    }


    /// <summary>
    /// IsExistDATEntityTypes
    /// </summary>   
    this.IsExistDATEntityTypes = function () {

        try {
            OneViewConsole.Debug("IsExistDATEntityTypes start", "DATEntityTypesBO.IsExistDATEntityTypes");

           // var _Userid = OneViewSessionStorage.Get("LoginUserId");
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");

            var _DefaultMasterDAO = new DefaultMasterDAO("DATEntityTypes");
            var IsDATTableExist = _DefaultMasterDAO.IsTableExist();

            var IsExist = false;
            if (IsDATTableExist == true) {

                var _oDATEntityTypesDAO = new DATEntityTypesDAO();
                var Result = _oDATEntityTypesDAO.CheckDATEntityTypes(_oServiceId);

                if (Result.length > 0) {
                    if (Result[0].Count > 0) {
                        IsExist = true;
                    }
                }
            }
            //alert("IsExistDATEntityTypes : " + IsExist);
            return IsExist;
            OneViewConsole.Debug("IsExistDATEntityTypes end", "DATEntityTypesBO.IsExistDATEntityTypes");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DATEntityTypesBO.IsExistDATEntityTypes", Excep);
        }

    }
}

// DATEntityTypesIL
function DATEntityTypesIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetDATEntityTypes
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
   
    this.GetDATEntityTypes = function (ServiceId) {
        try {
            OneViewConsole.Debug("DATEntityTypes Start", "DATEntityTypesIL.DATEntityTypes");
            OneViewConsole.DataLog("ServiceId :", ServiceId );
           
            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetDATEntityTypes_json";
            _oOneViewChannel.parameter = JSON.stringify({ "ServiceId": ServiceId });
            var oDATEntityTypesDTO = _oOneViewChannel.Send();
            
            if (oDATEntityTypesDTO != null) {
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oDATEntityTypesDTO.GetDATEntityTypes_jsonResult), "DATEntityTypesIL.DATEntityTypes");
                oDATEntityTypesDTO = JSON.parse(oDATEntityTypesDTO.GetDATEntityTypes_jsonResult);
             
            }
           // alert("oDATEntityTypesDTO : " + JSON.stringify(oDATEntityTypesDTO));
            OneViewConsole.Debug("DATEntityTypes End", "DATEntityTypesIL.DATEntityTypes");

            return oDATEntityTypesDTO;
        }
        catch (Excep) {
            alert("DATEntityTypesIL.GetDATEntityTypes : " + Excep + "..----.." + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("IL", "DATEntityTypesIL.DATEntityTypes", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oDATEntityTypesDTO = null;
        }
    }

}

// DATEntityTypesDAO
function DATEntityTypesDAO() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// GetDatEntity
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 

    this.GetDatEntity = function (ServiceId) {
        try {
            OneViewConsole.Debug("GetDatEntity start", "DATEntityTypesDAO.GetDatEntity");

            var Query = "Select * From DATEntityTypes Where ServiceId = " + ServiceId;

            OneViewConsole.DataLog("Requested Query : " + Query, "GarbageCollectorMetadataDAO.GetDatEntity");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DATEntityTypesDAO.GetDatEntity");

            OneViewConsole.Debug("GetDatEntity end", "DATEntityTypesDAO.GetDatEntity");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DATEntityTypesDAO.GetDatEntity", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    /// <summary>
    /// DeleteByServiceId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 

    this.DeleteByServiceId = function (ServiceId) {

        try {
            OneViewConsole.Debug("DeleteByServiceId start", "DATEntityTypesDAO.DeleteByServiceId");

            var Query = "DELETE FROM DATEntityTypes WHERE ServiceId = " + ServiceId ;
            //alert("DeleteByServiceId : " + Query);
            OneViewConsole.Debug("Requested Query : " + Query, "DATEntityTypesDAO.DeleteByServiceId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByServiceId end", "DATEntityTypesDAO.DeleteByServiceId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DATEntityTypesDAO.DeleteByServiceId", Excep);
        }
        finally {
            Query = null;
        }
    }

    /// <summary>
    /// CheckDATEntityTypes : Check DATEntityTypes is Exist in system before download.
    /// </summary>   

    this.CheckDATEntityTypes = function (ServiceId) {
        try {
            OneViewConsole.Debug("CheckDATEntityTypes Start", "DATEntityTypesDAO.CheckDATEntityTypes");
            

            var DATEntityTypesQuery = "Select count(*) as Count from DATEntityTypes Where ServiceId =" + ServiceId;
            //alert("CheckDATEntityTypes : " + DATEntityTypesQuery);
            OneViewConsole.DataLog("Requested Query : " + DATEntityTypesQuery, "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(DATEntityTypesQuery);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            OneViewConsole.Debug("CheckDATEntityTypes End", "DATEntityTypesDAO.CheckDATEntityTypes");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DATEntityTypesDAO.CheckDATEntityTypes", Excep);
        }
    }

}

// DATEntityTypesNormalizer
function DATEntityTypesNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to DATEntityTypesDTO conversion
    /// </summary>
    /// <param name="DATEntityTypesDTO">DATEntityTypes DTO (DTO from server)</param>
    /// <returns>DATEntityTypesDTO (Mobile entity format)</returns> 
    this.Normalize = function (DATEntityTypesDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "DATEntityTypesNormalizer.Normalize");

            var _oDATEntityTypes = new DATEntityTypes();

            _oDATEntityTypes.ServerId = DATEntityTypesDTO.ServerId;

            _oDATEntityTypes.MobileVersionId = DATEntityTypesDTO.MobileVersionId;
            _oDATEntityTypes.OVGuid = DATEntityTypesDTO.OVGuid;

            _oDATEntityTypes.ServiceId = DATEntityTypesDTO.ServiceId;
            _oDATEntityTypes.Name = DATEntityTypesDTO.Name;

            _oDATEntityTypes.EntityName = DATEntityTypesDTO.EntityName;
            _oDATEntityTypes.Namespace = DATEntityTypesDTO.Namespace;
            _oDATEntityTypes.MappedTableName = DATEntityTypesDTO.MappedTableName;
            _oDATEntityTypes.DisplayName = DATEntityTypesDTO.DisplayName;

            _oDATEntityTypes.OrganizationId_Id = DATEntityTypesDTO.OrganizationId_Id;
            _oDATEntityTypes.ImageIcon = DATEntityTypesDTO.ImageIcon;
            _oDATEntityTypes.FontIcon = DATEntityTypesDTO.FontIcon;

            _oDATEntityTypes.CreatedDate = CurrentDateAndTime;
            _oDATEntityTypes.LastsyncDate = CurrentDateAndTime;
            _oDATEntityTypes.TimeStamp = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "DATEntityTypesNormalizer.Normalize");

            return _oDATEntityTypes;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DATEntityTypesNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }


    /// <summary>
    /// DTO list to DATEntityTypesDTO list conversion
    /// </summary>
    /// <param name="DATEntityTypesList">DATEntityTypesDTO list dto (DTO from server)</param>
    /// <returns>DATEntityTypesDTO list (Mobile entity format)</returns> 
    this.NormalizeList = function (DATEntityTypesDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "DATEntityTypesNormalizer.NormalizeList");

            var DATEntityTypesList = new Array();
            for (var i = 0; i < DATEntityTypesDTOList.length; i++) {

                DATEntityTypesList[i] = MyInstance.Normalize(DATEntityTypesDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "DATEntityTypesNormalizer.NormalizeList");
            
            return DATEntityTypesList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DATEntityTypesNormalizer.NormalizeList", Excep);
        }
        finally {
            DATEntityTypesList = null;
        }
    }

}
