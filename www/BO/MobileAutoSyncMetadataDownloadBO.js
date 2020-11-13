


function MobileAutoSyncMetadataDownloadBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
   
    /// <summary>
    /// Download
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "MobileAutoSyncMetadataDownloadBO.Download");

            var IsSuccess = false;

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "MobileAutoSyncMetadataDownloadBO.Download");

            if (NetworkStatus.IsNetworkAvailable == true) {                
                var _oMobileAutoSyncMetadataDownloadIL = new MobileAutoSyncMetadataDownloadIL();
                var _oMobileAutoSyncMetadataDetails = _oMobileAutoSyncMetadataDownloadIL.GetMobileAutoSyncMetadata(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

                //alert('_oMobileAutoSyncMetadataDetails.isAnyException : ' + _oMobileAutoSyncMetadataDetails.isAnyException);
                if (_oMobileAutoSyncMetadataDetails != null && _oMobileAutoSyncMetadataDetails.isAnyException == false) {
                    MyInstance.Create(_oMobileAutoSyncMetadataDetails.BusinessEventMobileDTOLst);
                    IsSuccess = true;
                }
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "MobileAutoSyncMetadataDownloadBO.Download");
            }

            OneViewConsole.Debug("Download end", "MobileAutoSyncMetadataDownloadBO.Download");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MobileAutoSyncMetadataDownloadBO.Download", Excep);
        }
        finally {
      
        }
    }

    /// <summary>
    /// Create
    /// </summary>
    /// <param name="MobileAutoSyncMetadataDTOLst">MobileAutoSyncMetadataDTOLst</param> 
    this.Create = function (MobileAutoSyncMetadataDTOLst) {

        try {
            OneViewConsole.Debug("Create start", "MobileAutoSyncMetadataDownloadBO.Create");

            if (MobileAutoSyncMetadataDTOLst != null) {
                
                var _oDefaultMasterDAO = new DefaultMasterDAO("BusinessEventEntity");
                var Count = _oDefaultMasterDAO.Count();

                var _oMobileAutoSyncMetadataNormalizer = new MobileAutoSyncMetadataNormalizer();
                var _oMobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();

                //need to check
                _oMobileAutoSyncMetadataDAO.DeleteByServiceAndUserId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

                var oMobileAutoSyncMetadata = _oMobileAutoSyncMetadataNormalizer.NormalizeList(MobileAutoSyncMetadataDTOLst);

                if (oMobileAutoSyncMetadata != null && oMobileAutoSyncMetadata != undefined) {
                    for (var i = 0; i < oMobileAutoSyncMetadata.length ; i++) {
                        _oDefaultMasterDAO.Create(oMobileAutoSyncMetadata[i], Count);
                        Count++;
                    }
                }
            }

            OneViewConsole.Debug("Create end", "MobileAutoSyncMetadataDownloadBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MobileAutoSyncMetadataDownloadBO.Create", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// IsExistRouterConfigMetaData
    /// </summary>   
    this.IsExistMobileAutoSyncMetadata = function () {

        try {
            OneViewConsole.Debug("IsExistMobileAutoSyncMetadata start", "RouterConfigMetaDataBO.IsExistMobileAutoSyncMetadata");


            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var UserId = OneViewSessionStorage.Get("LoginUserId");

            var IsExist = false;

            var _oMobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();
            var Result = _oMobileAutoSyncMetadataDAO.CheckMobileAutoSyncMetadata(ServiceId, UserId);


            if (Result.length > 0) {
                if (Result[0].Count > 0) {
                    IsExist = true;
                }
            }                
            
            OneViewConsole.Debug("IsExistMobileAutoSyncMetadata end", "RouterConfigMetaDataBO.IsExistMobileAutoSyncMetadata");

            return IsExist;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "RouterConfigMetaDataBO.IsExistMobileAutoSyncMetadata", Excep);
        }

    }
}


// MobileAutoSyncMetadataDownloadIL
function MobileAutoSyncMetadataDownloadIL() {

    // Current Scope
    var MyInstance = this;

    /// <summary>
    /// GetMobileAutoSyncMetadata
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    /// <param name="UserId">UserId</param>
    this.GetMobileAutoSyncMetadata = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("GetMobileAutoSyncMetadata Start", "MobileAutoSyncMetadataDownloadIL.GetMobileAutoSyncMetadata");
            OneViewConsole.DataLog("OSGuid :", ServiceId + ", UserId :", UserId);

            var RequestParam = { "OSGuid": ServiceId, "UserId": UserId };            
            
            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetMyBusinessEvent_json";
            _oOneViewChannel.parameter = JSON.stringify(RequestParam);
            //alert(' _oOneViewChannel.parameter : ' + _oOneViewChannel.parameter);
            var oMobileAutoSyncMetadataDTO = _oOneViewChannel.Send();
            
            if (oMobileAutoSyncMetadataDTO != null) {
               // alert(' JSON.stringify(oMobileAutoSyncMetadataDTO) : ' + JSON.stringify(oMobileAutoSyncMetadataDTO));
                OneViewConsole.DataLog("Response from Server" + oMobileAutoSyncMetadataDTO.GetMyBusinessEvent_jsonResult, "MobileAutoSyncMetadataDownloadIL.GetMobileAutoSyncMetadata");
                if (oMobileAutoSyncMetadataDTO.GetMyBusinessEvent_jsonResult != "") {
                    oMobileAutoSyncMetadataDTO = JSON.parse(oMobileAutoSyncMetadataDTO.GetMyBusinessEvent_jsonResult);
                }
            }

            OneViewConsole.Debug("GetMobileAutoSyncMetadata End", "MobileAutoSyncMetadataDownloadIL.GetMobileAutoSyncMetadata");

            return oMobileAutoSyncMetadataDTO;
        }
        catch (Excep) {
            //alert('111 GetMobileAutoSyncMetadata Excep : ' + Excep);
            //alert('GetMobileAutoSyncMetadata Excep : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("IL", "MobileAutoSyncMetadataDownloadIL.GetMobileAutoSyncMetadata", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oMobileAutoSyncMetadataDTO = null;
        }
    }
}


// MobileAutoSyncMetadataDAO
function MobileAutoSyncMetadataDAO() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();


    /// <summary>
    /// GetByServiceAndUserId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    this.GetByServiceAndUserId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("GetByServiceAndUserId start", "MobileAutoSyncMetadataDAO.GetByServiceAndUserId");

            var Query = "SELECT * FROM BusinessEventEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;
            //alert('GetByServiceAndUserId Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "MobileAutoSyncMetadataDAO.GetByServiceAndUserId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (Result.length > 0) {

                for (var i = 0; i < Result.length ; i++) {
                    Result[i].BusinessEventDefinition = JSON.parse(Result[i].BusinessEventDefinition);
                    Result[i].BusinessEventHandlers = JSON.parse(Result[i].BusinessEventHandlers);
                }

            }

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MobileAutoSyncMetadataDAO.GetByServiceAndUserId");

            //alert('Result : ' + JSON.stringify(Result));
            OneViewConsole.Debug("GetByServiceAndUserId end", "MobileAutoSyncMetadataDAO.GetByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MobileAutoSyncMetadataDAO.GetByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    /// <summary>
    /// GetByServiceAndUserId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    this.GetBusinessEventEntityByServiceAndUserId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("GetByServiceAndUserId start", "MobileAutoSyncMetadataDAO.GetByServiceAndUserId");

            var Query = "SELECT * FROM BusinessEventEntity WHERE ServiceId = " + ServiceId + " And  (UserId = " + UserId + " OR '-1'=" + UserId + ")";
            //alert('GetByServiceAndUserId Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "MobileAutoSyncMetadataDAO.GetByServiceAndUserId");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (Result.length > 0) {

                for (var i = 0; i < Result.length ; i++) {
                    Result[i].BusinessEventDefinition = JSON.parse(Result[i].BusinessEventDefinition);
                    Result[i].BusinessEventHandlers = JSON.parse(Result[i].BusinessEventHandlers);
                }

            }

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MobileAutoSyncMetadataDAO.GetByServiceAndUserId");

            //alert('Result : ' + JSON.stringify(Result));
            OneViewConsole.Debug("GetByServiceAndUserId end", "MobileAutoSyncMetadataDAO.GetByServiceAndUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MobileAutoSyncMetadataDAO.GetByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// DeleteByServiceAndUserId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    /// <param name="UserId">UserId</param> 
    this.DeleteByServiceAndUserId = function (ServiceId, UserId) {

        try {
            OneViewConsole.Debug("DeleteByServiceAndUserId start", "MobileAutoSyncMetadataDAO.DeleteByServiceAndUserId");

            var Query = "DELETE FROM BusinessEventEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId;

            OneViewConsole.Debug("Requested Query : " + Query, "MobileAutoSyncMetadataDAO.DeleteByServiceAndUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByServiceAndUserId end", "MobileAutoSyncMetadataDAO.DeleteByServiceAndUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MobileAutoSyncMetadataDAO.DeleteByServiceAndUserId", Excep);
        }
        finally {
            Query = null;
        }
    }


    /// <summary>
    /// CheckMobileAutoSyncMetadata : Check LandingPageConfigMetaData is Exist in system before download.
    /// </summary>   

    this.CheckMobileAutoSyncMetadata = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("CheckMobileAutoSyncMetadata Start", "MobileAutoSyncMetadataDAO.CheckMobileAutoSyncMetadata");

            var Query = "Select count(*) as Count from BusinessEventEntity Where ServiceId =" + ServiceId + " and UserId=" + UserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultPageConfigMetaDataDAO.CheckDefaultPageConfigMeta");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultPageConfigMetaDataDAO.CheckMobileAutoSyncMetadata");

            OneViewConsole.Debug("CheckMobileAutoSyncMetadata End", "MobileAutoSyncMetadataDAO.CheckMobileAutoSyncMetadata");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MobileAutoSyncMetadataDAO.CheckMobileAutoSyncMetadata", Excep);
        }
    }

    /// <summary>
    /// GetByServiceAndUserId
    /// </summary>   
    /// <param name="ServiceId">ServiceId</param> 
    /// <param name="UserId">UserId</param> 
    /// <param name="ClassName">ClassName</param> 
    /// <param name="MethodName">MethodName</param> 
    this.GetByServiceAndUserIdAndEvent = function (ServiceId, UserId, ClassName, MethodName) {

        try {
            OneViewConsole.Debug("GetByServiceAndUserIdAndEvent start", "MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent");

            var Query = "SELECT * FROM BusinessEventEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId + " AND ClassName = '" + ClassName + "' And MethodName = '" + MethodName + "'";
            //alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (Result.length > 0) {

                for (var i = 0; i < Result.length ; i++) {
                    Result[i].BusinessEventDefinition = JSON.parse(Result[i].BusinessEventDefinition);
                    Result[i].BusinessEventHandlers = JSON.parse(Result[i].BusinessEventHandlers);
                }
               
            }
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent");

            OneViewConsole.Debug("GetByServiceAndUserIdAndEvent end", "MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent");

            //alert('Result : ' + JSON.stringify(Result));
            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }
}


// MobileAutoSyncMetadataNormalizer
function MobileAutoSyncMetadataNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to MobileAutoSyncMetadataDTO conversion
    /// </summary>
    /// <param name="MobileAutoSyncMetadataDTO">MobileAutoSyncMetadata DTO (DTO from server)</param>
    /// <returns>MobileAutoSyncMetadataDTO (Mobile entity format)</returns> 
    this.Normalize = function (MobileAutoSyncMetadataDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "MobileAutoSyncMetadataNormalizer.Normalize");
            
            var _oBusinessEventEntity = new BusinessEventEntity();

            _oBusinessEventEntity.ServerId = MobileAutoSyncMetadataDTO.ServerId;
            _oBusinessEventEntity.MobileVersionId = 1;
            _oBusinessEventEntity.OVGuid = MobileAutoSyncMetadataDTO.OVGuid;

            _oBusinessEventEntity.ServiceId = MobileAutoSyncMetadataDTO.ServiceId;
            _oBusinessEventEntity.UserId = MobileAutoSyncMetadataDTO.UserId;
            _oBusinessEventEntity.EventName = MobileAutoSyncMetadataDTO.EventName;
            _oBusinessEventEntity.EventDesc = MobileAutoSyncMetadataDTO.EventDesc;
            _oBusinessEventEntity.IsOperationEvent = MobileAutoSyncMetadataDTO.IsOperationEvent;
            _oBusinessEventEntity.ClassName = MobileAutoSyncMetadataDTO.ClassName;
            _oBusinessEventEntity.MethodName = MobileAutoSyncMetadataDTO.MethodName;
            _oBusinessEventEntity.OperationCategory = MobileAutoSyncMetadataDTO.OperationCategory;
            _oBusinessEventEntity.IsTimerEvent = MobileAutoSyncMetadataDTO.IsTimerEvent;
            _oBusinessEventEntity.CRONExpression = MobileAutoSyncMetadataDTO.CRONExpression;
            _oBusinessEventEntity.IsSyncEvent = MobileAutoSyncMetadataDTO.IsSyncEvent;
                        
            if (MobileAutoSyncMetadataDTO.BusinessEventDefinition != null) {
                var BusinessEventDefinition = JSON.parse(MobileAutoSyncMetadataDTO.BusinessEventDefinition);
                _oBusinessEventEntity.BusinessEventDefinition =JSON.stringify( BusinessEventDefinition);
            }
            if (MobileAutoSyncMetadataDTO.BusinessEventHandlers != null) {        
                _oBusinessEventEntity.BusinessEventHandlers = JSON.stringify(MobileAutoSyncMetadataDTO.BusinessEventHandlers);
            }
            _oBusinessEventEntity.CreatedDate = CurrentDateAndTime;
            _oBusinessEventEntity.LastsyncDate = CurrentDateAndTime;
            _oBusinessEventEntity.TimeStamp = CurrentDateAndTime;

            
            OneViewConsole.Debug("Normalize end", "MobileAutoSyncMetadataNormalizer.Normalize");            
            return _oBusinessEventEntity;
        }
        catch (Excep) {
            //alert('Excep Normalize : ' + Excep);
            //alert('Excep Normalize 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Normalizer", "MobileAutoSyncMetadataNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }


    /// <summary>
    /// DTO list to MobileAutoSyncMetadataDTO list conversion
    /// </summary>
    /// <param name="MobileAutoSyncMetadataList">MobileAutoSyncMetadataDTO list dto (DTO from server)</param>
    /// <returns>MobileAutoSyncMetadataDTO list (Mobile entity format)</returns> 
    this.NormalizeList = function (MobileAutoSyncMetadataDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "MobileAutoSyncMetadataNormalizer.NormalizeList");

            var MobileAutoSyncMetadataList = new Array();
            for (var i = 0; i < MobileAutoSyncMetadataDTOList.length; i++) {

                MobileAutoSyncMetadataList[i] = MyInstance.Normalize(MobileAutoSyncMetadataDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "MobileAutoSyncMetadataNormalizer.NormalizeList");

            
            return MobileAutoSyncMetadataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "MobileAutoSyncMetadataNormalizer.NormalizeList", Excep);
        }
        finally {
            MobileAutoSyncMetadataList = null;
        }
    }
}


function BusinessEventEntityBO(xlatService) {

    // Current Scope
    var MyInstance = this;

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// ReqParameter:{ClassName:"",MethodName:"",RequiredBusinessEventHandlerObjectKeys:{}}
    /// </summary>
    this.IsBussinessEventExist = function (Req) {

        try {
            OneViewConsole.Debug("Download start", "MobileAutoSyncMetadataDownloadBO.Download");

            var Response = { IsSuccess: false, BusinessEventHandlersObjectKeysDetails: {} };

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var _MobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();
            var BusinessEventDetails = _MobileAutoSyncMetadataDAO.GetBusinessEventEntityByServiceAndUserId(ServiceId, LoginUserId);

            if (BusinessEventDetails.length > 0) {

                for (var i = 0; i < BusinessEventDetails.length ; i++) {

                    if (BusinessEventDetails[i].ClassName == Req.ClassName && BusinessEventDetails[i].MethodName == Req.MethodName) {

                        var BusinessEventHandlers = BusinessEventDetails[i].BusinessEventHandlers;

                        for (var b = 0; b < BusinessEventHandlers.length; b++) {
                            var BusinessEventHandlerObjectKeys = BusinessEventHandlers[b].BusinessEventHandlerObjectKeys;
                            var RequiredBusinessEventHandlerObjectKeys = Req.RequiredBusinessEventHandlerObjectKeys;

                            for (var j = 0; j < BusinessEventHandlerObjectKeys.length; j++) {
                              

                                if (RequiredBusinessEventHandlerObjectKeys[BusinessEventHandlerObjectKeys[j]] != undefined) {
                                    // 
                                    var IsTemplateValidationRequired = Req.IsTemplateValidationRequired;
                                    if (IsTemplateValidationRequired == true) {

                                        var TemplateFilterParam = BusinessEventHandlers[b].Parameters.TemplateFilterParam;
                                        if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {

                                            var TemplateIdLst = Req.TemplateIdLst;

                                            for (var t = 0; t < TemplateIdLst.length; t++) {

                                                if (TemplateFilterParam.DCTemplateList.indexOf(parseInt(TemplateIdLst[t])) != -1) {
                                                    Response.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys[j]] = {IsSuccess:true};
                                                    Response.IsSuccess = true;
                                                    break;
                                                }
                                            }
                                        }

                                    }
                                    else {
                                        Response.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys[j]] = { IsSuccess: true };
                                        Response.IsSuccess = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }

                }
            }

            
            OneViewConsole.Debug("Download end", "MobileAutoSyncMetadataDownloadBO.Download");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MobileAutoSyncMetadataDownloadBO.Download", Excep);
        }
        finally {

        }
    }

    this.IsBussinessEventExistWithOrWithoutTemplateId = function (Req) {

        try {
            OneViewConsole.Debug("Download start", "MobileAutoSyncMetadataDownloadBO.Download");

            var Response = { IsSuccess: false, BusinessEventHandlersObjectKeysDetails: {} };

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var _MobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();
            var BusinessEventDetails = _MobileAutoSyncMetadataDAO.GetBusinessEventEntityByServiceAndUserId(ServiceId, LoginUserId);

            if (BusinessEventDetails.length > 0) {

                for (var i = 0; i < BusinessEventDetails.length ; i++) {

                    if (BusinessEventDetails[i].ClassName == Req.ClassName && BusinessEventDetails[i].MethodName == Req.MethodName) {

                        var BusinessEventHandlers = BusinessEventDetails[i].BusinessEventHandlers;

                        for (var b = 0; b < BusinessEventHandlers.length; b++) {
                            var BusinessEventHandlerObjectKeys = BusinessEventHandlers[b].BusinessEventHandlerObjectKeys;
                            var RequiredBusinessEventHandlerObjectKeys = Req.RequiredBusinessEventHandlerObjectKeys;

                            for (var j = 0; j < BusinessEventHandlerObjectKeys.length; j++) {


                                if (RequiredBusinessEventHandlerObjectKeys[BusinessEventHandlerObjectKeys[j]] != undefined) {
                                    // 
                                    //var IsTemplateValidationRequired = Req.IsTemplateValidationRequired;
                                    //if (IsTemplateValidationRequired == true) {

                                        var TemplateFilterParam = BusinessEventHandlers[b].Parameters.TemplateFilterParam;
                                        if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {

                                            var TemplateIdLst = Req.TemplateIdLst;
                                            if (TemplateIdLst.length > 0) {
                                                for (var t = 0; t < TemplateIdLst.length; t++) {

                                                    if (TemplateFilterParam.DCTemplateList.indexOf(parseInt(TemplateIdLst[t])) != -1) {
                                                        Response.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys[j]] = { IsSuccess: true };
                                                        Response.IsSuccess = true;
                                                        break;
                                                    }
                                                }
                                            }
                                            else {
                                                Response.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys[j]] = { IsSuccess: true };
                                                Response.IsSuccess = true;
                                                break;
                                            }
                                        }
                                        else {
                                            Response.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys[j]] = { IsSuccess: true };
                                            Response.IsSuccess = true;
                                            break;
                                        }

                                    //}
                                    //else {
                                    //    Response.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys[j]] = { IsSuccess: true };
                                    //    Response.IsSuccess = true;
                                    //    break;
                                    //}
                                }
                            }
                        }
                    }

                }
            }


            OneViewConsole.Debug("Download end", "MobileAutoSyncMetadataDownloadBO.Download");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MobileAutoSyncMetadataDownloadBO.Download", Excep);
        }
        finally {

        }
    }

    this.GetTemplateIdDetailsOfBussinessEvent = function (ServiceId, UserId, ClassName, MethodName) {

        try {
            OneViewConsole.Debug("GetTemplateIdDetailsOfBussinessEvent start", "MobileAutoSyncMetadataDAO.GetTemplateIdDetailsOfBussinessEvent");

            var Query = "SELECT * FROM BusinessEventEntity WHERE ServiceId = " + ServiceId + " And UserId = " + UserId + " AND ClassName = '" + ClassName + "' And MethodName = '" + MethodName + "'";
            //alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            var TemplateIdLst = [];

            if (Result.length > 0) {

                for (var i = 0; i < Result.length ; i++) {
                    
                    var BusinessEventHandlers = JSON.parse(Result[i].BusinessEventHandlers);

                    for (var b = 0; b < BusinessEventHandlers.length; b++) {
                        var TemplateFilterParam = BusinessEventHandlers[b].Parameters.TemplateFilterParam;

                        if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {
                            TemplateIdLst = TemplateFilterParam.DCTemplateList;
                        }
                    }
                }

            }
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent");

            OneViewConsole.Debug("GetByServiceAndUserIdAndEvent end", "MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent");

            //alert('Result : ' + JSON.stringify(Result));
            return TemplateIdLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }



    this.IsBusinessEventMetadataExist = function (Req) {

        try {
            OneViewConsole.Debug("IsBusinessEventMetadataExist start", "DasboardFacade.IsBusinessEventMetadataExist");

            var IsSuccess = false;

            var BusinessEventHandlerObjectKeys = Req.RequiredBusinessEventHandlerObjectKeys;
            var TemplateId = Req.TemplateId;

          
            var ReqParameter = { ClassName: Req.ClassName, MethodName: Req.MethodName, RequiredBusinessEventHandlerObjectKeys: {}, TemplateIdLst: TemplateId, };
            ReqParameter.RequiredBusinessEventHandlerObjectKeys[BusinessEventHandlerObjectKeys] = "";

        
            var _IsBussinessEventExist = MyInstance.IsBussinessEventExistWithOrWithoutTemplateId(ReqParameter);

            if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys] != undefined) {
                if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys].IsSuccess == true) {
                    IsSuccess = true;
                }
            }


            OneViewConsole.Debug("IsBusinessEventMetadataExist end", "DasboardFacade.IsBusinessEventMetadataExist");

            return IsSuccess;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.IsBusinessEventMetadataExist", xlatService);
        }
    }

}
