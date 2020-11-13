
// GlobalizationMetadataBO
function GlobalizationMetadataBO(xlatService) {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// Download Globalization Page Metdata
    /// </summary>
    this.DownloadPageWiseMetadata = function (IsDeleteAndInsert) {

        var GlobalizationMetdataSuccess = false;

        try {
            var _DefaultMasterDAO = new DefaultMasterDAO("GlobalizationMetdataEntity");
            var IsExist = _DefaultMasterDAO.IsTableExist();
           
            if (IsExist != true) {

                var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();
                var oSqliteQG = new SqliteQG();

                var Query = oSqliteQG.GetCreateTableQuery(new GlobalizationMetdataEntity());
                _oOneViewSqlitePlugin.ExcecuteSql(Query);
            }

            var PageCount = 0;
           
            if (IsDeleteAndInsert != true) {               
                var _oGlobalizationMetdataDAO = new GlobalizationMetdataDAO();
                PageCount = _oGlobalizationMetdataDAO.GetPageCountByPageIds(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("OrganizationId"), OneViewStaticPageList);
            }

            if (PageCount == 0) {

                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "GlobalizationMetadataBO.DownloadPageWiseMetadata");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    var ReqParm = { OSGuid: OneViewSessionStorage.Get("ServiceId"), OrganizationId: OneViewSessionStorage.Get("OrganizationId"), PageIds: OneViewStaticPageList };

                    var GlobalizationMetdataDTO = new GlobalizationMetdataIL('').GetGlobalizationPageWiseMetdata(ReqParm);
                    //alert('Globalization Metadata Response From Server : ' + JSON.stringify(GlobalizationMetdataDTO));

                    if (GlobalizationMetdataDTO != null && GlobalizationMetdataDTO.IsAnyException == false) {

                        if (GlobalizationMetdataDTO.GlobalizationMetdataDTOLst.length > 0) {

                            var GlobalizationMetdataDTOLst = new GlobalizationMetdataNormalizer().NormalizeList(GlobalizationMetdataDTO.GlobalizationMetdataDTOLst);
                            //alert('GlobalizationMetdataDTOLst : ' + JSON.stringify(GlobalizationMetdataDTOLst));

                            GlobalizationMetdataSuccess = InsertGlobalizationMetdata(GlobalizationMetdataDTOLst, IsDeleteAndInsert);
                        }
                        else {
                            GlobalizationMetdataSuccess = true;
                        }
                    }
                    else {
                        GlobalizationMetdataSuccess = (GlobalizationMetdataDTO != null) ? false : GlobalizationMetdataDTO;
                    }
                }
                    // If no internet connection
                else {
                    navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                    OneViewConsole.Info("No Internet Connection", "GlobalizationMetadataBO.DownloadPageWiseMetadata");
                    GlobalizationMetdataSuccess = false;
                }
            }
            else {
                GlobalizationMetdataSuccess = true;
            }
        }
        catch (Excep) {
            GlobalizationMetdataSuccess = false;
            throw oOneViewExceptionHandler.Create("BO", "GlobalizationMetadataBO.DownloadPageWiseMetadata", Excep);
        }

        return GlobalizationMetdataSuccess;
    }


    /// <summary>
    /// API for download GlobalizationMetdata
    /// </summary> 
    /// <param name="DownloadList">Downloaded profiles list</param>
    this.DownloadTemplateWiseMetadata = function (DownloadList) {

        var GlobalizationMetdataSuccess = false;

        try {
            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "GlobalizationMetadataBO.DownloadTemplateWiseMetadata");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 1 || OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 2) {  
                    // Need to remove if server side enabled
                    DownloadList.TemplateId.push(66);
                    DownloadList.TemplateId.push(304);
                    DownloadList.TemplateId.push(548);
                }
               
                var GlobalizationMetdataDTO = new GlobalizationMetdataIL('').GetGlobalizationTemplateWiseMetdata(DownloadList);
                //alert('Globalization Metadata Response From Server : ' + JSON.stringify(GlobalizationMetdataDTO));

                if (GlobalizationMetdataDTO != null && GlobalizationMetdataDTO.IsAnyException == false) {

                    if (GlobalizationMetdataDTO.GlobalizationMetdataDTOLst.length > 0) {

                        var GlobalizationMetdataDTOLst = new GlobalizationMetdataNormalizer().NormalizeList(GlobalizationMetdataDTO.GlobalizationMetdataDTOLst);
                        //alert('GlobalizationMetdataDTOLst : ' + JSON.stringify(GlobalizationMetdataDTOLst));

                        GlobalizationMetdataSuccess = InsertGlobalizationMetdata(GlobalizationMetdataDTOLst, true);
                    }
                    else {
                        GlobalizationMetdataSuccess = true;
                    }
                }
                else {
                    GlobalizationMetdataSuccess = (GlobalizationMetdataDTO != null) ? false : GlobalizationMetdataDTO;
                }
            }
                // If no internet connection
            else {
                IsDownLoadProfileSuccess = false;
                GlobalizationMetdataSuccess = false;
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "GlobalizationMetadataBO.DownloadTemplateWiseMetadata");
            }
        }
        catch (Excep) {
            GlobalizationMetdataSuccess = false;
            throw oOneViewExceptionHandler.Create("BO", "GlobalizationMetadataBO.DownloadTemplateWiseMetadata", Excep);
        }

        return GlobalizationMetdataSuccess;
    }

    this.InsertGlobalizationMetdata = function (GlobalizationMetdataList, IsDeleteAndInsert) {        
        try {
            var IsSuccess = InsertGlobalizationMetdata(GlobalizationMetdataList, IsDeleteAndInsert);
            return IsSuccess;
        }
        catch (Excep) {
            GlobalizationMetdataSuccess = false;
            throw oOneViewExceptionHandler.Create("BO", "GlobalizationMetadataBO.InsertGlobalizationMetdata", Excep);
        }
    }
    /// <summary>
    /// Inserts GlobalizationMetdata list
    /// </summary>
    /// <param name="GlobalizationMetdataList">GlobalizationMetdata list</param>
    /// <returns>true or false</returns>  
    var InsertGlobalizationMetdata = function (GlobalizationMetdataList, IsDeleteAndInsert) {
        try {
            OneViewConsole.Debug("InsertTemplateConfig start", "ProfileDownloadBO.InsertTemplateConfig");

            var _oDefaultMasterDAO = new DefaultMasterDAO("GlobalizationMetdataEntity");

            var _oGlobalizationMetdataDAO = new GlobalizationMetdataDAO();
            var _oTaskSyncLogDAO = new TaskSyncLogDAO();
            // Check the count
            var Count = _oDefaultMasterDAO.Count();

            for (var i = 0; i < GlobalizationMetdataList.length; i++) {

                // Cheking it is already available in local db
                var obj = _oGlobalizationMetdataDAO.GetByAllDimensions(GlobalizationMetdataList[i].ServiceId, GlobalizationMetdataList[i].OrganizationId, GlobalizationMetdataList[i].TemplateNodeId, GlobalizationMetdataList[i].PageId);

                // If its not available, create new
                if (obj.length == 0) {
                    _oDefaultMasterDAO.Create(GlobalizationMetdataList[i], Count);
                    Count += 1;
                }
                else if (IsDeleteAndInsert == true) {
                    _oDefaultMasterDAO.DeleteById(obj[0].Id);

                    _oDefaultMasterDAO.Create(GlobalizationMetdataList[i], Count);
                    Count += 1;
                }

                if (IsGlobalAutoSyncEnabled == true) {
                    //Sync TaskSyncLogEntity
                    var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(GlobalizationMetdataList[i].ServerId, GlobalizationMetdataList[i].Type);
                }
            }

            OneViewConsole.Debug("InsertTemplateConfig end", "ProfileDownloadBO.InsertTemplateConfig");
            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertTemplateConfig", Excep);
        }
    }

    /// <summary>
    /// IsExistRouterConfigMetaData
    /// </summary>   
    this.IsExistGlobalizationMetdata = function () {

        try {
            OneViewConsole.Debug("IsExistGlobalizationMetdata start", "GlobalizationMetadataBO.IsExistGlobalizationMetdata");


            var _oServiceId = OneViewSessionStorage.Get("ServiceId");

            var IsExist = false;

            var _GlobalizationMetadataDAO = new GlobalizationMetadataDAO();
            var Result = _GlobalizationMetadataDAO.CheckGlobalization(_oServiceId);


            if (Result.length > 0) {
                if (Result[0].Count > 0) {
                    IsExist = true;
                }
            }


            return IsExist;
            OneViewConsole.Debug("IsExistGlobalizationMetdata end", "GlobalizationMetadataBO.IsExistGlobalizationMetdata");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "GlobalizationMetadataBO.IsExistGlobalizationMetdata", Excep);
        }

    }

}

// GlobalizationMetdataIL
function GlobalizationMetdataIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// Ajax call for get GetGlobalization Page Metdata
    /// </summary>
    /// <param name="ReqParm">(Which Service ,Organization, User, PageIds)</param>
    /// <returns>Globalization Metdata list</returns>
    this.GetGlobalizationPageWiseMetdata = function (ReqParm) {
        try {
            OneViewConsole.Debug("GetGlobalizationPageWiseMetdata start", "AuthenticationServiceIL.GetGlobalizationPageWiseMetdata");

            var RequestParam = JSON.stringify(ReqParm);

            OneViewConsole.DataLog("Request from device : " + RequestParam, "AuthenticationServiceIL.GetGlobalizationPageWiseMetdata");

            var _oOneViewChannel = new OneViewChannel();
            // _oOneViewChannel.toaster = toaster;
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetGlobalizationPageWiseMetdata_json";
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
            var oGlobalizationMetdataList = _oOneViewChannel.Send();

            if (oGlobalizationMetdataList != null) {

                OneViewConsole.DataLog("Response from server : " + oGlobalizationMetdataList.GetGlobalizationPageWiseMetdata_jsonResult, "AuthenticationServiceIL.GetGlobalizationPageWiseMetdata");

                return JSON.parse(oGlobalizationMetdataList.GetGlobalizationPageWiseMetdata_jsonResult);
            }
            else {
                return oGlobalizationMetdataList;
            }

            OneViewConsole.Debug("GetGlobalizationPageWiseMetdata end", "AuthenticationServiceIL.GetGlobalizationPageWiseMetdata");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "AuthenticationServiceIL.GetGlobalizationPageWiseMetdata", Excep);
        }
    }


    /// <summary>
    /// Ajax call for get Globalization Metdata
    /// </summary>
    /// <param name="DownloadList">(Which Service ,Place, User, Template)</param>
    /// <returns>Action-NC profile list</returns>
    this.GetGlobalizationTemplateWiseMetdata = function (DownloadList) {
        try {
            OneViewConsole.Debug("GetGlobalizationTemplateWiseMetdata start", "ProfileDownloadIL.GetGlobalizationTemplateWiseMetdata");

            var RequestParam = JSON.stringify(DownloadList);

            OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetGlobalizationTemplateWiseMetdata");

            var _oOneViewChannel = new OneViewChannel();
            // _oOneViewChannel.toaster = toaster;
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetGlobalizationMetdata_json";
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
            var oGlobalizationMetdataList = _oOneViewChannel.Send();

            if (oGlobalizationMetdataList != null) {

                OneViewConsole.DataLog("Response from server : " + oGlobalizationMetdataList.GetGlobalizationMetdata_jsonResult, "ProfileDownloadIL.GetGlobalizationTemplateWiseMetdata");

                return JSON.parse(oGlobalizationMetdataList.GetGlobalizationMetdata_jsonResult);
            }
            else {
                return oGlobalizationMetdataList;
            }

            OneViewConsole.Debug("GetGlobalizationTemplateWiseMetdata end", "ProfileDownloadIL.GetGlobalizationTemplateWiseMetdata");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetGlobalizationTemplateWiseMetdata", Excep);
        }
    }
}

//GlobalizationMetdata Normalizer
function GlobalizationMetdataNormalizer() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();


    /// <summary>
    /// DTO to GlobalizationMetdata conversion
    /// </summary>
    /// <param name="GlobalizationMetdataDTO">GlobalizationMetdata DTO (DTO from server)</param>
    /// <returns>GlobalizationMetdata (Mobile entity format)</returns> 
    this.Normalize = function (GlobalizationMetdataDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "TemplateConfigNormalizer.Normalize");

            var _oGlobalizationMetdataEntity = new GlobalizationMetdataEntity();

            _oGlobalizationMetdataEntity.ServerId = (GlobalizationMetdataDTO.ServerId != undefined) ? GlobalizationMetdataDTO.ServerId : "";
            _oGlobalizationMetdataEntity.MobileVersionId = 1;
            _oGlobalizationMetdataEntity.OVGuid = (GlobalizationMetdataDTO.OVGuid != undefined) ? GlobalizationMetdataDTO.OVGuid : 0;
            _oGlobalizationMetdataEntity.OMGuid = (GlobalizationMetdataDTO.OMGuid != undefined) ? GlobalizationMetdataDTO.OMGuid : "";
            _oGlobalizationMetdataEntity.Type = GlobalizationMetdataDTO.Type;

            _oGlobalizationMetdataEntity.ServiceId = GlobalizationMetdataDTO.ServiceId;
            _oGlobalizationMetdataEntity.TemplateNodeId = GlobalizationMetdataDTO.TemplateNodeId;
            _oGlobalizationMetdataEntity.OrganizationId = GlobalizationMetdataDTO.OrganizationId;
            _oGlobalizationMetdataEntity.PageId = GlobalizationMetdataDTO.PageId;

            _oGlobalizationMetdataEntity.CreatedUserId = GlobalizationMetdataDTO.CreatedUserId;
            _oGlobalizationMetdataEntity.CreatedDate = GlobalizationMetdataDTO.CreatedDate;
            _oGlobalizationMetdataEntity.LastsyncDate = CurrentDateAndTime;
           
            var LocalisedConfig = '';

            if (GlobalizationMetdataDTO.LocalisedConfig != null)
                LocalisedConfig = JSON.parse(GlobalizationMetdataDTO.LocalisedConfig);

            _oGlobalizationMetdataEntity.LocalisedConfig = JSON.stringify(LocalisedConfig);

            return _oGlobalizationMetdataEntity;
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("Normalizer", "TemplateConfigNormalizer.Normalize", Excep);
        }
    }


    /// <summary>
    /// DTO list to GlobalizationMetdata list conversion
    /// </summary>
    /// <param name="GlobalizationMetdataList">GlobalizationMetdata list dto (DTO from server)</param>
    /// <returns>GlobalizationMetdata list (Mobile entity format)</returns> 
    this.NormalizeList = function (GlobalizationMetdataDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "GlobalizationMetdataNormalizer.NormalizeList");

            var GlobalizationMetdataList = new Array();
            for (var i = 0; i < GlobalizationMetdataDTOList.length; i++) {

                GlobalizationMetdataList[i] = MyInstance.Normalize(GlobalizationMetdataDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "GlobalizationMetdataNormalizer.NormalizeList");

            return GlobalizationMetdataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "GlobalizationMetdataNormalizer.NormalizeList", Excep);
        }
    }
}


// GlobalizationMetadataDAO
function GlobalizationMetadataDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
    /// <summary>
    /// CheckGlobalization : Check Globalization is Exist in system before download.
    /// </summary>   
 
    this.CheckGlobalization = function (ServiceId) {
        try {
            OneViewConsole.Debug("CheckGlobalization Start", "GlobalizationMetadataDAO.CheckGlobalization");

            var GlobalizationMetdataQuery = "Select count(*) as Count from GlobalizationMetdataEntity Where ServiceId =" + ServiceId + " AND OrganizationId = " + OneViewSessionStorage.Get("OrganizationId") + " AND PageId != 0" ;

            OneViewConsole.DataLog("Requested Query : " + GlobalizationMetdataQuery, "GlobalizationMetadataDAO.CheckGlobalization");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(GlobalizationMetdataQuery);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "GlobalizationMetadataDAO.CheckGlobalization");

            OneViewConsole.Debug("CheckGlobalization End", "GlobalizationMetadataDAO.CheckGlobalization");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "GlobalizationMetadataDAO.CheckGlobalization", Excep);
        }
    }
}

