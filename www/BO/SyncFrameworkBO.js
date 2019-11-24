
var DeNormalizeColumnConfig = {};

//SyncFrameworkBO
function SyncFrameworkBO() {

    // Current Scope
    var MyInstance = this;

    /// <summary>
    /// UpdateListLocalSyncStatus
    /// </summary>
    /// <param name="ModifiedEntityList"></param>
    this.UpdateListLocalSyncStatus = function (ModifiedEntityList) {
        try {
            OneViewConsole.Debug("UpdateListLocalSyncStatus start", "SyncFrameworkBO.UpdateListLocalSyncStatus");
            
            var Response = { "IsSuccess": false, "Message": "Local Synched Successfully." };
            if (ModifiedEntityList != null && ModifiedEntityList != "" && ModifiedEntityList != undefined && ModifiedEntityList.length >0 ) {
                //Local Update
                var _oTaskSyncLogDAO = new TaskSyncLogDAO();
                _oTaskSyncLogDAO.UpdateListLocalSyncStatus(ModifiedEntityList);
                Response.IsSuccess = true;
                Response.Message = "Success";
            }

            OneViewConsole.Debug("UpdateListLocalSyncStatus end", "SyncFrameworkBO.UpdateListLocalSyncStatus");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.UpdateListLocalSyncStatus", Excep);
        }
    }



    /// <summary>
    /// UpdateServerSyncStatus(Call Update Server and Local as well)
    /// </summary>
    this.UpdateServerSyncStatus = function () {
        try {
            OneViewConsole.Debug("UpdateServerSyncStatus start", "SyncFrameworkBO.UpdateServerSyncStatus");

            var Response = { "IsSuccess": true, "Message": "Synchronized Master Successfully." };
            //Get all Synced data
            var _oTaskSyncLogDAO=new TaskSyncLogDAO();            
            var SyncedEntityList = _oTaskSyncLogDAO.GetAllSyncedTasks();
           

            if (SyncedEntityList != null && SyncedEntityList.length > 0) {                
                var SyncedFormattedEntityList = [];
                for (var i = 0; i < SyncedEntityList.length; i++) {
                    SyncedFormattedEntityList.push(SyncedEntityList[i].TransactionId);
                }
                if (SyncedFormattedEntityList != null && SyncedFormattedEntityList.length > 0) {
                    //call server
                    var _oUpdatedSyncDetails = MyInstance.UpdateServerSyncStatusInServer(SyncedFormattedEntityList);                    
                    if (_oUpdatedSyncDetails != null){
                        if (_oUpdatedSyncDetails.IsAnyException == false) {
                            if (_oUpdatedSyncDetails._DefaultSyncStatusUpdationResDetail != null && _oUpdatedSyncDetails._DefaultSyncStatusUpdationResDetail.length > 0) {
                                var response = FormInCondition(_oUpdatedSyncDetails._DefaultSyncStatusUpdationResDetail);
                                if (response != null) {
                                    var _oTaskSyncLogDAO = new TaskSyncLogDAO();
                                    _oTaskSyncLogDAO.UpdateServerSyncStatus(response.EntityTypeIncondition, response.EntityIdIncondition);
                                    Response.IsSuccess = true;
                                    Response.Message = "Synchronized Master Successfully."
                                }
                            }
                        }
                        else {
                            Response.IsSuccess = false;
                            Response.Message = "Synchronize Master Failed."
                        }
                    }
                    else {
                        Response.IsSuccess = null;
                        Response.Message = ""
                    }
                }
            }
            OneViewConsole.Debug("UpdateServerSyncStatus end", "SyncFrameworkBO.UpdateServerSyncStatus");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.UpdateServerSyncStatus", Excep);
        }
    }


    /// <summary>
    /// FormInCondition
    /// </summary>
    var FormInCondition = function (DefaultSyncStatusUpdationResDetail) {
        try {
            OneViewConsole.Debug("UpdateServerSyncStatus start", "SyncFrameworkBO.UpdateServerSyncStatus");

            var response = null;
            var IsAnyUpdated = false;
            var Len = DefaultSyncStatusUpdationResDetail.length;
            var EntityIdIncondition = "(";
            var EntityTypeIncondition = "(";

            for (var i = 0; i < Len; i++) {
                EntityData = DefaultSyncStatusUpdationResDetail[i];
                if (EntityData.Status == 'true' || EntityData.Status == true) {
                    IsAnyUpdated = true;
                    EntityIdIncondition = EntityIdIncondition + "'" + EntityData.EntityId + "'";
                    EntityIdIncondition += (i <= Len - 2) ? "," : ")";

                    EntityTypeIncondition += EntityData.EntityType;
                    EntityTypeIncondition += (i <= Len - 2) ? "," : ")";
                }
            }

            if (IsAnyUpdated == true) {
                response = { 'EntityTypeIncondition': EntityTypeIncondition, 'EntityIdIncondition': EntityIdIncondition };
            }
            OneViewConsole.Debug("UpdateServerSyncStatus end", "SyncFrameworkBO.UpdateServerSyncStatus");

            return response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.UpdateServerSyncStatus", Excep);
        }
    }


    /// <summary>
    /// UpdateServerSyncStatusInServer
    /// </summary>
    this.UpdateServerSyncStatusInServer = function (UpdatedEntityList) {

        try {
            OneViewConsole.Debug("UpdateServerSyncStatusInServer start", "SyncFrameworkBO.UpdateServerSyncStatusInServer");
            
            var Result = null;

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "SyncFrameworkBO.UpdateServerSyncStatusInServer");

            if (NetworkStatus.IsNetworkAvailable == true) {
                var _oSyncFrameworkIL = new SyncFrameworkIL();
                Result = _oSyncFrameworkIL.UpdateServerSyncStatus(OneViewLocalStorage.Get("DeviceId"), UpdatedEntityList);                                   
            }
            else {
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No Internet Connection", "SyncFrameworkBO.UpdateServerSyncStatusInServer");
            }

            OneViewConsole.Debug("UpdateServerSyncStatusInServer end", "SyncFrameworkBO.UpdateServerSyncStatusInServer");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.UpdateServerSyncStatusInServer", Excep);
        }
        finally {
        }
    }




    this.DownloadMasters = function (ModifiedEntityList) {
        try {
            OneViewConsole.Debug("DownloadMasters start", "SyncFrameworkBO.DownloadMasters");

            var Response = { "IsSuccess": true, "Message": "" };
          
            //Form Server API Request
            var ModifiedEntityDict;
            if (ModifiedEntityList != null && ModifiedEntityList.length > 0) {
                ModifiedEntityDict = {};
                for (var i = 0; i < ModifiedEntityList.length; i++) {
                    var ModifiedEntity = ModifiedEntityList[i];
                    var EntityId = ModifiedEntity.EntityId ;
                    if (ModifiedEntityDict[ModifiedEntity.EntityType] == undefined) {
                        var EntityIdList = [];
                        EntityIdList.push(EntityId);
                        ModifiedEntityDict[ModifiedEntity.EntityType] = EntityIdList;
                    }
                    else {
                        ModifiedEntityDict[ModifiedEntity.EntityType].push(EntityId);
                    }
                }
            }

            
            if (ModifiedEntityDict != undefined) {
             
                //Server Call
                var Result = MyInstance.DownloadMastersFromServer(ModifiedEntityDict);
                if (Result != null) {                    
                    if (Result.IsAnyException == false && Result._MastersDataDTO != null) {
                        //Local Master Insertion
                        Response.IsSuccess = MyInstance.SyncMasters(Result._MastersDataDTO);
                        if (Response.IsSuccess == true) {
                            Response.Message = "Synchronized Master Successfully.";
                        }
                        else {
                            Response.Message = "Synchronize Master Failed.";
                        }
                    }
                    else {
                        Response.IsSuccess = false;
                        Response.Message = "Synchronize Master Failed.";
                    }
                }
                else {
                    Response.IsSuccess = null;
                    Response.Message = "";
                }
            }

            OneViewConsole.Debug("DownloadMasters end", "SyncFrameworkBO.DownloadMasters");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.DownloadMasters", Excep);
        }
        finally {
        }
    }


    this.DownloadMastersFromServer = function (ModifiedEntityDict) {
        try {
            OneViewConsole.Debug("DownloadMastersFromServer start", "SyncFrameworkBO.DownloadMastersFromServer");

            var Result = null;

            var _oSyncFrameworkIL = new SyncFrameworkIL();
            Result = _oSyncFrameworkIL.DownloadMasters(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), ModifiedEntityDict);

            OneViewConsole.Debug("DownloadMastersFromServer end", "SyncFrameworkBO.DownloadMastersFromServer");

            return Result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.DownloadMastersFromServer", Excep);
        }
        finally {
        }
    }


    this.SyncMasters = function (MastersDataDTO, xlatService) {
        try {
            OneViewConsole.Debug("SyncMasters start", "SyncFrameworkBO.SyncMasters");

            var IsSuccess = false;
            var RcoMasterSuccess = false;
            var _oMasterNormalizer = new MasterNormalizer();          

            var TemplateConfigMetaDataSuccess = false;
            var AttributeGroupMasterSuccess = false;           
            var AttributeMasterSuccess = false;
            var AttributeGroupTypeSuccess = false;
            var BandMasterSuccess = false;
            var BandDetailsMasterSuccess = false;
            var UserMasterSuccess = false;
            var RoleMasterSuccess = false;
            var OrganizationMasterSuccess = false;
            var PreDefinedActionSaveSuccess = false;
            var IsMetaDataSuccess = false;
            var IsTemplateUIEventJobConfigMetaDataSuccess = false;
            var GlobalizationMetdataSuccess = false;
            var ActionNCProfileSaveSuccess = false;
            var IsGarbageCollectorMetadataSuccess = false;
            var IsRouterMetaDataSuccess = false;
            var IsMobileDcPreviewMetadataSuccess = false;
            var IsPageConfigMetaDataSuccess = false;
            var IsTemplatValidationConfigMetaDataSuccess = false;
            var IsMobileViewRecordsMetadataSuccess = false;

            var oProfileDownloadBO = new ProfileDownloadBO();

            var _oDcProfileDAO = new DcProfileDAO();
            var _oDcApprovalUserDetailsDAO = new DcApprovalUserDetailsDAO();
            var _oActionFollowUpDAO = new ActionFollowUpDAO();
            var ServiceId = OneViewSessionStorage.Get("ServiceId");

            //alert('MastersDataDTO : ' + JSON.stringify(MastersDataDTO));
            //insert rco master
            if (MastersDataDTO.RCODTO != null && MastersDataDTO.RCODTO.length > 0) {

                var RcoMasterEntityList = _oMasterNormalizer.NormalizeList("RcoMasterEntity", MastersDataDTO.RCODTO);
               var IsCreateSuccess= MyInstance.DeleteAndInsert("RcoMasterEntity", RcoMasterEntityList);

               if (IsCreateSuccess == true) {
                   MyInstance.UpdateReferEntities(DeNormalizeColumnConfig, ServiceId, MastersDataDTO);
                   RcoMasterSuccess = true;
                }
                
            }
            else {
                RcoMasterSuccess = true;
            }

           //alert('MastersDataDTO.TemplateConfigMetaDataDTO : ' + MastersDataDTO.TemplateConfigMetaDataDTO);
            //insert TemplateConfigMetaData
            if (MastersDataDTO.TemplateConfigMetaDataDTO != null && MastersDataDTO.TemplateConfigMetaDataDTO.length > 0) {
                //Normalize
                var TemplateConfigMetaDataDTOLst = new TemplateConfigNormalizer().NormalizeList(MastersDataDTO.TemplateConfigMetaDataDTO);
                //Insert
                TemplateConfigMetaDataSuccess = oProfileDownloadBO.InsertTemplateConfig(TemplateConfigMetaDataDTOLst);
            }
            else {
                TemplateConfigMetaDataSuccess = true;
            }
            //alert('TemplateConfigMetaDataSuccess : ' + TemplateConfigMetaDataSuccess);

            
            //alert('MastersDataDTO.AttributeDTO : ' + MastersDataDTO.AttributeDTO);
            //insert Attribute
            if (MastersDataDTO.AttributeDTO != null && MastersDataDTO.AttributeDTO.length > 0) {

                var AttributeMasterEntityList = _oMasterNormalizer.NormalizeList("AttributeMasterEntity", MastersDataDTO.AttributeDTO);
                var IsCreateSuccess = MyInstance.DeleteAndInsert("AttributeMasterEntity", AttributeMasterEntityList);
                
                if (IsCreateSuccess == true) {
                    MyInstance.UpdateReferredTemplateNodes(DeNormalizeColumnConfig, ServiceId, MastersDataDTO.AttributeDTO);
                    AttributeMasterSuccess = true;
                }
            }
            else {
                AttributeMasterSuccess = true;
            }
            //alert('AttributeMasterSuccess : ' + AttributeMasterSuccess);

            //alert('MastersDataDTO.AttributeGroupDTO : ' + MastersDataDTO.AttributeGroupDTO);
            //insert AttributeGroup
            if (MastersDataDTO.AttributeGroupDTO != null && MastersDataDTO.AttributeGroupDTO.length > 0) {

                var AttributeGroupMasterEntityList = _oMasterNormalizer.NormalizeList("AttributeGroupMasterEntity", MastersDataDTO.AttributeGroupDTO);
                var IsCreateSuccess = MyInstance.DeleteAndInsert("AttributeGroupMasterEntity", AttributeGroupMasterEntityList);
                
                if (IsCreateSuccess == true) {
                    MyInstance.UpdateReferredTemplateNodes(DeNormalizeColumnConfig, ServiceId, MastersDataDTO.AttributeGroupDTO);
                    AttributeGroupMasterSuccess = true;
                }

            }
            else {
                AttributeGroupMasterSuccess = true;
            }
            //alert('AttributeGroupMasterSuccess :' + AttributeGroupMasterSuccess);
                        
            //alert('MastersDataDTO.AttributeGroupTypeDTO : ' + MastersDataDTO.AttributeGroupTypeDTO);
            //insert AttributeGroupType
            if (MastersDataDTO.AttributeGroupTypeDTO != null && MastersDataDTO.AttributeGroupTypeDTO.length > 0) {
                var AttributeGroupTypeList = _oMasterNormalizer.NormalizeList("AttributeGroupType", MastersDataDTO.AttributeGroupTypeDTO);
                AttributeGroupTypeSuccess = MyInstance.DeleteAndInsert("AttributeGroupType", AttributeGroupTypeList);
            }
            else {
                AttributeGroupTypeSuccess = true;
            }
            //alert('AttributeGroupTypeSuccess :' + AttributeGroupTypeSuccess);

            ////alert('MastersDataDTO.BandDTO : ' + MastersDataDTO.BandDTO);
            ////insert Band 
            //if (MastersDataDTO.BandDTO != null && MastersDataDTO.BandDTO.length > 0) {
            //    var BandMasterEntityList = _oMasterNormalizer.NormalizeList("BandMasterEntity", MastersDataDTO.BandDTO);
            //    BandMasterSuccess = MyInstance.DeleteAndInsert("BandMasterEntity", BandMasterEntityList);
            //}
            //else {
            //    BandMasterSuccess = true;
            //}
            ////alert('BandMasterSuccess :' + BandMasterSuccess);

            //alert('MastersDataDTO.BandDetailsDTO : ' + MastersDataDTO.BandDetailsDTO);
            //insert BandDetails
            if (MastersDataDTO.BandDetailsDTO != null && MastersDataDTO.BandDetailsDTO.length > 0) {
                var BandDetailsMasterEntityList = _oMasterNormalizer.NormalizeList("BandDetailsMasterEntity", MastersDataDTO.BandDetailsDTO);
                BandDetailsMasterSuccess = MyInstance.DeleteAndInsert("BandDetailsMasterEntity", BandDetailsMasterEntityList);               
            }
            else {
                BandDetailsMasterSuccess = true;
            }
            //alert('BandDetailsMasterSuccess :' + BandDetailsMasterSuccess);

           // alert('MastersDataDTO.UserDTO : ' + MastersDataDTO.UserDTO);
            //insert User
            if (MastersDataDTO.UserDTO != null && MastersDataDTO.UserDTO.length > 0) {
                var UserMasterEntityList = _oMasterNormalizer.NormalizeList("UserMasterEntity", MastersDataDTO.UserDTO);               
                UserMasterSuccess = MyInstance.DeleteAndInsertUserMaster("UserMasterEntity", UserMasterEntityList);                
            }
            else {
                UserMasterSuccess = true;
            }
            //alert('UserMasterSuccess :' + UserMasterSuccess);
            
            ////alert('MastersDataDTO.OrganiznationDTO : ' + MastersDataDTO.OrganiznationDTO);
            ////insert Organiznation
            //if (MastersDataDTO.OrganiznationDTO != null && MastersDataDTO.OrganiznationDTO.length > 0) {
            //    var OrganizationMasterEntityList = _oMasterNormalizer.NormalizeList("OrganizationMasterEntity", MastersDataDTO.OrganiznationDTO);
            //    OrganizationMasterSuccess = MyInstance.DeleteAndInsert("OrganizationMasterEntity", OrganizationMasterEntityList);                
            //}
            //else {
            //    OrganizationMasterSuccess = true;
            //}
            ////alert('OrganizationMasterSuccess :' + OrganizationMasterSuccess);

            //alert('MastersDataDTO.PreDefinedActionDTO : ' + MastersDataDTO.PreDefinedActionDTO);
            if (MastersDataDTO.PreDefinedActionDTO != undefined && MastersDataDTO.PreDefinedActionDTO != null && MastersDataDTO.PreDefinedActionDTO.length > 0) {
                var PreDefinedActionDTO = new MasterNormalizer().NormalizeList("PredefinedActionMasterEntity", MastersDataDTO.PreDefinedActionDTO);
                PreDefinedActionSaveSuccess = oProfileDownloadBO.InsertPreDefinedActions(PreDefinedActionDTO);
            }
            else {
                PreDefinedActionSaveSuccess = true;
            }
            //alert('PreDefinedActionSaveSuccess :' + PreDefinedActionSaveSuccess);
            
            //alert('MastersDataDTO.TemplateOtherConfigMetaDataDTO : ' + MastersDataDTO.TemplateOtherConfigMetaDataDTO);
            if (MastersDataDTO.TemplateOtherConfigMetaDataDTO != null && MastersDataDTO.TemplateOtherConfigMetaDataDTO.length > 0) {
                IsMetaDataSuccess = MyInstance.AttributeOtherConfigDeleteAndInsert(MastersDataDTO.TemplateOtherConfigMetaDataDTO);
            }
            else {
                IsMetaDataSuccess = true;
            }
            //alert('IsMetaDataSuccess :' + IsMetaDataSuccess);

            if (MastersDataDTO.TemplatUIEventJobConfigMetaData != null && MastersDataDTO.TemplatUIEventJobConfigMetaData.length > 0) {
                var TemplatUIEventJobConfigMetaDataDTOLst = new TemplateUIEventJobConfigNormalizer().NormalizeList(MastersDataDTO.TemplatUIEventJobConfigMetaData);
                IsTemplateUIEventJobConfigMetaDataSuccess = oProfileDownloadBO.InsertTemplateUIEventJobConfigMetadata(TemplatUIEventJobConfigMetaDataDTOLst);
            }
            else {
                IsTemplateUIEventJobConfigMetaDataSuccess = true;
            }
           // alert('IsTemplateUIEventJobConfigMetaDataSuccess :' + IsTemplateUIEventJobConfigMetaDataSuccess);
           
           //alert('MastersDataDTO.LanguageGlobalizationMetdataDTO : ' + MastersDataDTO.LanguageGlobalizationMetdataDTO);
            if (MastersDataDTO.LanguageGlobalizationMetdataDTO !=null && MastersDataDTO.LanguageGlobalizationMetdataDTO.length > 0) {
                var GlobalizationMetdataDTOLst = new GlobalizationMetdataNormalizer().NormalizeList(MastersDataDTO.LanguageGlobalizationMetdataDTO);                       
                GlobalizationMetdataSuccess = new GlobalizationMetadataBO().InsertGlobalizationMetdata(GlobalizationMetdataDTOLst, true);
            }
            else {
                GlobalizationMetdataSuccess = true;
            }
            //alert('GlobalizationMetdataSuccess :' + GlobalizationMetdataSuccess);
            
            //alert('MastersDataDTO.ActionNCProfileDTO : ' + MastersDataDTO.ActionNCProfileDTO);
            if (MastersDataDTO.ActionNCProfileDTO != null && MastersDataDTO.ActionNCProfileDTO.length > 0) {
                var ActionNCProfileList = new ActionNCProfileNormalizer().NormalizeList(MastersDataDTO.ActionNCProfileDTO);
                ActionNCProfileSaveSuccess = oProfileDownloadBO.InsertActionNCProfiles(ActionNCProfileList);
            }
            else {
                ActionNCProfileSaveSuccess = true;
            }
            //alert('ActionNCProfileSaveSuccess :' + ActionNCProfileSaveSuccess);

            //alert('MastersDataDTO.GarbageCollectorMetadataDTO : ' + MastersDataDTO.GarbageCollectorMetadataDTO);
            if (MastersDataDTO.GarbageCollectorMetadataDTO != null && MastersDataDTO.GarbageCollectorMetadataDTO.length > 0) {
                var GarbageCollectorMetadataDTOLst = new GarbageCollectorMetadataNormalizer().NormalizeList(MastersDataDTO.GarbageCollectorMetadataDTO);
                IsGarbageCollectorMetadataSuccess = oProfileDownloadBO.InsertGarbageCollectorMetadata(GarbageCollectorMetadataDTOLst);
            }
            else {
                IsGarbageCollectorMetadataSuccess = true;
            }
            //alert('IsGarbageCollectorMetadataSuccess :' + IsGarbageCollectorMetadataSuccess);


            //alert('MastersDataDTO.RouterConfigMetaDataDTO : ' + MastersDataDTO.RouterConfigMetaDataDTO);            
            if (MastersDataDTO.RouterConfigMetaDataDTO != null && MastersDataDTO.RouterConfigMetaDataDTO != "" && MastersDataDTO.RouterConfigMetaDataDTO != undefined) {
                new RouterConfigMetaDataBO(xlatService).Create(MastersDataDTO.RouterConfigMetaDataDTO);
                IsRouterMetaDataSuccess = true;

                var RouterConfig = JSON.parse(MastersDataDTO.RouterConfigMetaDataDTO.RouterConfig);
                OneViewLocalStorage.Save("RouterMetaData", JSON.stringify(RouterConfig));

                var _oOneViewRouterComponet = new OneViewRouterComponet();
                _oOneViewRouterComponet.ResetRouter();                
            }
            else {
                IsRouterMetaDataSuccess = true;
            }
            //alert('IsRouterMetaDataSuccess :' + IsRouterMetaDataSuccess);


            //alert('MastersDataDTO.MobileDcPreviewMetadataDTO : ' + MastersDataDTO.MobileDcPreviewMetadataDTO);
            if (MastersDataDTO.MobileDcPreviewMetadataDTO != null && MastersDataDTO.MobileDcPreviewMetadataDTO.length > 0) {
                var MobileDcPreviewMetadataDTOLst = new MobileDcPreviewMetadataNormalizer().NormalizeList(MastersDataDTO.MobileDcPreviewMetadataDTO);
                IsMobileDcPreviewMetadataSuccess = oProfileDownloadBO.InsertMobileDcPreviewMetadata(MobileDcPreviewMetadataDTOLst);
            }
            else {
                IsMobileDcPreviewMetadataSuccess = true;
            }
            //alert('IsMobileDcPreviewMetadataSuccess :' + IsMobileDcPreviewMetadataSuccess);

            //alert('MastersDataDTO.DefaultPageConfigMetaDataDTO : ' + MastersDataDTO.DefaultPageConfigMetaDataDTO);
            if (MastersDataDTO.DefaultPageConfigMetaDataDTO != null && MastersDataDTO.DefaultPageConfigMetaDataDTO.length > 0) {               
                new DefaultPageConfigMetaDataBO(xlatService).Create(MastersDataDTO.DefaultPageConfigMetaDataDTO);
                IsPageConfigMetaDataSuccess = true;
            }
            else {
                IsPageConfigMetaDataSuccess = true;
            }
            //alert('IsPageConfigMetaDataSuccess :' + IsPageConfigMetaDataSuccess);

            //alert('MastersDataDTO.TemplatValidationConfigMetaDataDTO : ' + MastersDataDTO.TemplatValidationConfigMetaDataDTO);
            //alert('MastersDataDTO.TemplatValidationConfigMetaDataDTO 22 : ' + JSON.stringify(MastersDataDTO.TemplatValidationConfigMetaDataDTO));
            if (MastersDataDTO.TemplatValidationConfigMetaDataDTO != null && MastersDataDTO.TemplatValidationConfigMetaDataDTO.length > 0) {
                var TemplatValidationConfigMetaDataDTOLst = new TemplateValidationConfigNormalizer().NormalizeList(MastersDataDTO.TemplatValidationConfigMetaDataDTO);
                IsTemplatValidationConfigMetaDataSuccess = oProfileDownloadBO.InsertTemplateValidationConfigMetadata(TemplatValidationConfigMetaDataDTOLst);                
            }
            else {
                IsTemplatValidationConfigMetaDataSuccess = true;
            }
            //alert('IsTemplatValidationConfigMetaDataSuccess :' + IsTemplatValidationConfigMetaDataSuccess);

            //alert('MastersDataDTO.MobileViewRecordsMetadataDTO : ' + MastersDataDTO.MobileViewRecordsMetadataDTO);           
            if (MastersDataDTO.MobileViewRecordsMetadataDTO != null && MastersDataDTO.MobileViewRecordsMetadataDTO.length > 0) {
                var MobileViewRecordsMetadataDTOLst = new MobileViewRecordsMetadataNormalizer().NormalizeList(MastersDataDTO.MobileViewRecordsMetadataDTO);
                IsMobileViewRecordsMetadataSuccess = oProfileDownloadBO.InsertMobileViewRecordsMetadata(MobileViewRecordsMetadataDTOLst);
            }
            else {
                IsMobileViewRecordsMetadataSuccess = true;
            }
            //alert('IsMobileViewRecordsMetadataSuccess :' + IsMobileViewRecordsMetadataSuccess);
                   
            //alert('RcoMasterSuccess : ' + RcoMasterSuccess + ",TemplateConfigMetaDataSuccess " + TemplateConfigMetaDataSuccess + ",AttributeGroupMasterSuccess " + AttributeGroupMasterSuccess + ",BandDetailsMasterSuccess " + BandDetailsMasterSuccess
            //    + ",AttributeMasterSuccess " + AttributeMasterSuccess + ",UserMasterSuccess " + UserMasterSuccess + ",GlobalizationMetdataSuccess " +
            //     GlobalizationMetdataSuccess + ",PreDefinedActionSaveSuccess " + PreDefinedActionSaveSuccess + ",ActionNCProfileSaveSuccess " + ActionNCProfileSaveSuccess + ",IsRouterMetaDataSuccess " + IsRouterMetaDataSuccess
            //     + ",IsGarbageCollectorMetadataSuccess " + IsGarbageCollectorMetadataSuccess + ",IsTemplatValidationConfigMetaDataSuccess " + IsTemplatValidationConfigMetaDataSuccess +
            //     ", " + IsTemplateUIEventJobConfigMetaDataSuccess + ", IsMobileDcPreviewMetadataSuccess" + IsMobileDcPreviewMetadataSuccess);


            if (RcoMasterSuccess == true && TemplateConfigMetaDataSuccess == true && AttributeGroupMasterSuccess == true && BandDetailsMasterSuccess == true && AttributeMasterSuccess == true && UserMasterSuccess == true
                && GlobalizationMetdataSuccess == true && PreDefinedActionSaveSuccess == true && ActionNCProfileSaveSuccess == true && IsRouterMetaDataSuccess == true && IsGarbageCollectorMetadataSuccess == true
                && IsTemplatValidationConfigMetaDataSuccess == true && IsTemplateUIEventJobConfigMetaDataSuccess == true && IsMobileDcPreviewMetadataSuccess == true) {
                IsSuccess = true;
            }

            //alert('IsSuccess : ' + IsSuccess);
            OneViewConsole.Debug("SyncMasters end", "SyncFrameworkBO.SyncMasters");         
            
            return IsSuccess;
        }
        catch (Excep) {
            //alert('SyncFrameworkBO.SyncMasters Excep 11 : ' + Excep);
            //alert('SyncFrameworkBO.SyncMasters Excep 22  : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.SyncMasters", Excep);
        }
        finally {
        }
    }

    this.UpdateReferEntities = function (DeNormalizeColumnConfig, ServiceId, MastersDataDTO) {
        try {
            OneViewConsole.Debug("SyncMasters start", "SyncFrameworkBO.SyncMasters");

           
            var ServiceSpecificDeNormalizeColumnConfigList = DeNormalizeColumnConfig[ServiceId];

            if (ServiceSpecificDeNormalizeColumnConfigList != undefined && ServiceSpecificDeNormalizeColumnConfigList != null) {
                for (var i = 0; i < ServiceSpecificDeNormalizeColumnConfigList.length; i++) {
                    var EntityWiseDeNormalizeColumnConfig = ServiceSpecificDeNormalizeColumnConfigList[i];
                    MyInstance.UpdateEntity(MastersDataDTO, EntityWiseDeNormalizeColumnConfig);                 
                }
            }

                //:Todo : temporarily if no metadata exists
            else {
                MyInstance.UpdateEntity(MastersDataDTO, null);
            }
            OneViewConsole.Debug("SyncMasters end", "SyncFrameworkBO.SyncMasters");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.SyncMasters", Excep);
        }
        finally {
        }
    }

    this.UpdateEntity = function (MastersDataDTO, EntityWiseDeNormalizeColumnConfig) {
        try {
            OneViewConsole.Debug("SyncMasters start", "SyncFrameworkBO.SyncMasters");

            var _oExpressionEvalFramework = new ExpressionEvalFramework();

            if (MastersDataDTO.RCODTO != null && MastersDataDTO.RCODTO.length > 0) {
                for (var j = 0; j < MastersDataDTO.RCODTO.length; j++) {
                    var _oRCODTO = MastersDataDTO.RCODTO[j];
                    if (EntityWiseDeNormalizeColumnConfig != undefined && EntityWiseDeNormalizeColumnConfig != null && EntityWiseDeNormalizeColumnConfig != "") {
                        if (_oRCODTO.Type == EntityWiseDeNormalizeColumnConfig.EntityType) {
                            for (var k = 0; k < EntityWiseDeNormalizeColumnConfig.DeNormalizeColumnConfigDetails.length; k++) {
                                var ReferEntityTypeDetails = EntityWiseDeNormalizeColumnConfig.DeNormalizeColumnConfigDetails[k];
                                if (ReferEntityTypeDetails.ReferEntityType == 16) {
                                    var ExpressionValue = _oExpressionEvalFramework.EvaluateExpression(ReferEntityTypeDetails, _oRCODTO);
                                    MyInstance.UpdateEntityDAO('OrganizationAssetsNode', 'ChildDbElementId', _oRCODTO.ServerId, 'ChildDbElementName', ExpressionValue);
                                }
                            }
                        }
                    }
                    else {
                        var ExpressionValue = _oExpressionEvalFramework.EvaluateExpression(null, _oRCODTO);
                        MyInstance.UpdateEntityDAO('OrganizationAssetsNode', 'ChildDbElementId', _oRCODTO.ServerId, 'ChildDbElementName', ExpressionValue);
                    }
                }
            }

           //else if (MastersDataDTO.TemplateNodeDTO != null && MastersDataDTO.TemplateNodeDTO.length > 0) {
           //   MyInstance.UpdateTemplateNodes();
           // }
            OneViewConsole.Debug("SyncMasters end", "SyncFrameworkBO.SyncMasters");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.SyncMasters", Excep);
        }
        finally {
        }
    }

  
    this.UpdateEntityDAO = function (EntityName, PKColumnName , EntityId, ColumnName, ExpressionValue) {
        try {
            OneViewConsole.Debug("SyncMasters start", "SyncFrameworkBO.SyncMasters");

            var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

            var Query = "Update " + EntityName + " SET " + ColumnName + " = '" + ExpressionValue + "' WHERE " + PKColumnName + " = '" + EntityId + "'";
            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "TaskSyncLogDAO.UpdateServerSyncStatus");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("SyncMasters end", "SyncFrameworkBO.SyncMasters");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.SyncMasters", Excep);
        }
        finally {
        }
    }

    this.GetRequestForDownloadMasters = function (ModifiedEntityList) {
        try {
            OneViewConsole.Debug("GetRequestForDownloadMasters start", "SyncFrameworkBO.GetRequestForDownloadMasters");

            //Form Server API Request
            var ModifiedEntityDict = {};
            for (var i = 0; i < ModifiedEntityList.length; i++) {
                var ModifiedEntity = ModifiedEntityList[i];
                var EntityId = ModifiedEntity.EntityId;
                if (ModifiedEntityDict[ModifiedEntity.EntityType] == undefined) {
                    var EntityIdList = [];
                    EntityIdList.push(EntityId);
                    ModifiedEntityDict[ModifiedEntity.EntityType] = EntityIdList;
                }
                else {
                    ModifiedEntityDict[ModifiedEntity.EntityType].push(EntityId);
                }
            }

            OneViewConsole.Debug("GetRequestForDownloadMasters end", "SyncFrameworkBO.GetRequestForDownloadMasters");

            return ModifiedEntityDict;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.GetRequestForDownloadMasters", Excep);
        }
        finally {
        }
    }

    this.GetRequestForUpdateServerSyncStatus = function (ModifiedEntityList) {
        try {
            OneViewConsole.Debug("GetRequestForDownloadMasters start", "SyncFrameworkBO.GetRequestForDownloadMasters");

            var SyncedFormattedEntityList = null;
            //Form Server API Request
            //Get all Synced data
            var _oTaskSyncLogDAO = new TaskSyncLogDAO();
            var SyncedEntityList = _oTaskSyncLogDAO.GetAllSyncedTasks();


            if (SyncedEntityList != null && SyncedEntityList.length > 0) {
                SyncedFormattedEntityList = [];
                for (var i = 0; i < SyncedEntityList.length; i++) {
                    SyncedFormattedEntityList.push(SyncedEntityList[i].TransactionId);
                }
            }
            OneViewConsole.Debug("GetRequestForDownloadMasters end", "SyncFrameworkBO.GetRequestForDownloadMasters");

            return SyncedFormattedEntityList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.GetRequestForDownloadMasters", Excep);
        }
        finally {
        }
    }


    this.AutomaticSyncMaster = function () {
        var Response = { "IsSuccess": false, "Message": "" };
        try {
            OneViewConsole.Debug("AutomaticSyncMaster start", "SyncFrameworkBO.AutomaticSyncMaster");

            var _oTaskSyncLogDAO = new TaskSyncLogDAO();
            var ModifiedEntityList = _oTaskSyncLogDAO.GetAllUnSyncedTasksDetails();

            if (ModifiedEntityList != null && ModifiedEntityList.length > 0) {

                var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

                try {
                    _oOneViewSqlitePlugin.StartTransaction();

                    //Get Server API Request
                    var ModifiedEntityDict = MyInstance.GetRequestForDownloadMasters(ModifiedEntityList);
                    var DownloadMastersResponse = { "IsSuccess": false, "Message": "" };
                    if (ModifiedEntityDict != undefined) {
                        //Server Call
                        var Result = MyInstance.DownloadMastersFromServer(ModifiedEntityDict);
                        if (Result != null) {
                            if (Result.IsAnyException == false && Result._MastersDataDTO != null) {
                                //Local Master Insertion
                                DownloadMastersResponse.IsSuccess = MyInstance.SyncMasters(Result._MastersDataDTO);
                                if (DownloadMastersResponse.IsSuccess == true) {
                                    DownloadMastersResponse.Message = "Synchronized Master Successfully.";
                                }
                                else {
                                    DownloadMastersResponse.Message = "Synchronize Master Failed.";
                                }
                            }
                            else {
                                DownloadMastersResponse.IsSuccess = false;
                                DownloadMastersResponse.Message = "Synchronize Master Failed.";
                            }
                        }
                        else {
                            DownloadMastersResponse.IsSuccess = null;
                            DownloadMastersResponse.Message = "";
                        }
                    }

                    var LocalSyncResponse;
                    var ServerSyncResponse = { "IsSuccess": false, "Message": "" };;

                    if (DownloadMastersResponse.IsSuccess == true) {
                        LocalSyncResponse = MyInstance.UpdateListLocalSyncStatus(ModifiedEntityList);

                        if (LocalSyncResponse.IsSuccess == true) {

                            //Get Server API Request
                            var SyncedFormattedEntityList = MyInstance.GetRequestForUpdateServerSyncStatus();
                                if (SyncedFormattedEntityList != null && SyncedFormattedEntityList.length > 0) {
                                    //call server
                                    var _oUpdatedSyncDetails = MyInstance.UpdateServerSyncStatusInServer(SyncedFormattedEntityList);

                                    if (_oUpdatedSyncDetails != null) {
                                        if (_oUpdatedSyncDetails.IsAnyException == false) {
                                            if (_oUpdatedSyncDetails._DefaultSyncStatusUpdationResDetail != null && _oUpdatedSyncDetails._DefaultSyncStatusUpdationResDetail.length > 0) {
                                                var InConditionResponse = FormInCondition(_oUpdatedSyncDetails._DefaultSyncStatusUpdationResDetail);
                                                if (InConditionResponse != null) {
                                                    var _oTaskSyncLogDAO = new TaskSyncLogDAO();
                                                    _oTaskSyncLogDAO.UpdateServerSyncStatus(InConditionResponse.EntityTypeIncondition, InConditionResponse.EntityIdIncondition);
                                                    ServerSyncResponse.IsSuccess = true;
                                                    ServerSyncResponse.Message = "Synchronized Master Successfully.";
                                                }
                                            }
                                        }
                                        else {
                                            ServerSyncResponse.IsSuccess = false;
                                            ServerSyncResponse.Message = "Synchronize Master Failed.";
                                        }
                                    }
                                    else {
                                        ServerSyncResponse.IsSuccess = null;
                                        ServerSyncResponse.Message = "";
                                    }
                                }
                           


                        }
                    }
                    else {
                        _oOneViewSqlitePlugin.Rollback();
                      //  alert(xlatService.xlat(DownloadMastersResponse.Message));
                    }


                    if (DownloadMastersResponse.IsSuccess == true && LocalSyncResponse.IsSuccess == true && ServerSyncResponse.IsSuccess == true) {
                        _oOneViewSqlitePlugin.EndTransaction();
                        Response.IsSuccess = true;
                        Response.Message = "Synchronized Master Successfully.";
                      //  alert(xlatService.xlat(ServerSyncResponse.Message));
                    }
                    else {
                        Response.IsSuccess = false;
                        Response.Message = "Synchronize Master Failed.";
                    }
                }
                catch (Excep) {
                    _oOneViewSqlitePlugin.Rollback();
                }
            }
            else {
                Response = { "IsSuccess": true, "Message": "No Data for Sync" };
            }

            OneViewConsole.Debug("AutomaticSyncMaster end", "SyncFrameworkBO.AutomaticSyncMaster");
        }
        catch (Excep) {
            Response.IsSuccess = false;
            Response.Message = "Exception while AutomaticSyncMaster";         
        }
        finally {
        }

        return Response;
    }

    this.UpdateReferredTemplateNodes = function (DeNormalizeColumnConfig, ServiceId, AttributeDetailsDTOList) {
        try {
            OneViewConsole.Debug("UpdateReferredTemplateNodes start", "SyncFrameworkBO.UpdateReferredTemplateNodes");
            
            var ServiceSpecificDeNormalizeColumnConfigList = DeNormalizeColumnConfig[ServiceId];

            if (ServiceSpecificDeNormalizeColumnConfigList != undefined && ServiceSpecificDeNormalizeColumnConfigList != null) {
                for (var i = 0; i < ServiceSpecificDeNormalizeColumnConfigList.length; i++) {
                    var EntityWiseDeNormalizeColumnConfig = ServiceSpecificDeNormalizeColumnConfigList[i];
                    MyInstance.UpdateTemplateNodes(AttributeDetailsDTOList, EntityWiseDeNormalizeColumnConfig);
                }
            }

                //:Todo : temporarily if no metadata exists
            else {
                MyInstance.UpdateTemplateNodes(AttributeDetailsDTOList, null);
            }
            OneViewConsole.Debug("UpdateReferredTemplateNodes end", "SyncFrameworkBO.UpdateReferredTemplateNodes");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.UpdateReferredTemplateNodes", Excep);
        }
        finally {
        }
    }

    this.UpdateTemplateNodes = function (AttributeDetailsDTOList, EntityWiseDeNormalizeColumnConfig) {
        try {
            OneViewConsole.Debug("UpdateTemplateNodes start", "SyncFrameworkBO.UpdateTemplateNodes");
            
            var _oExpressionEvalFramework = new ExpressionEvalFramework();
            if (AttributeDetailsDTOList != null && AttributeDetailsDTOList.length > 0) {
                for (var j = 0; j < AttributeDetailsDTOList.length; j++) {
                    var _oAttributeDetailsDTO = AttributeDetailsDTOList[j];
                    if (EntityWiseDeNormalizeColumnConfig != undefined && EntityWiseDeNormalizeColumnConfig != null && EntityWiseDeNormalizeColumnConfig != "") {
                        if (_oAttributeDetailsDTO.Type == EntityWiseDeNormalizeColumnConfig.EntityType) {
                            for (var k = 0; k < EntityWiseDeNormalizeColumnConfig.DeNormalizeColumnConfigDetails.length; k++) {
                                var ReferEntityTypeDetails = EntityWiseDeNormalizeColumnConfig.DeNormalizeColumnConfigDetails[k];
                                if (ReferEntityTypeDetails.ReferEntityType == 17) {
                                    var ExpressionValue = _oExpressionEvalFramework.EvaluateExpression(ReferEntityTypeDetails, _oAttributeDetailsDTO);
                                    MyInstance.UpdateEntityDAO('TemplateNode', 'ChildDbElementId', _oAttributeDetailsDTO.ServerId, 'ChildDbElementName', ExpressionValue);
                                }
                            }
                        }
                    }
                    else {                        
                        var ExpressionValue = _oExpressionEvalFramework.EvaluateExpression(null, _oAttributeDetailsDTO);                        
                        MyInstance.UpdateEntityDAO('TemplateNode', 'ChildDbElementId', _oAttributeDetailsDTO.ServerId, 'ChildDbElementName', ExpressionValue);
                    }
                }
            }

            OneViewConsole.Debug("UpdateTemplateNodes end", "SyncFrameworkBO.UpdateTemplateNodes");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.UpdateTemplateNodes", Excep);
        }
        finally {
        }
    }


    this.UpdateReferredOrganizationHierarchy = function (DeNormalizeColumnConfig, ServiceId, MasterDetailsDTOList) {
        try {
            OneViewConsole.Debug("UpdateReferredOrganizationHierarchy start", "SyncFrameworkBO.UpdateReferredOrganizationHierarchy");

            var ServiceSpecificDeNormalizeColumnConfigList = DeNormalizeColumnConfig[ServiceId];

            if (ServiceSpecificDeNormalizeColumnConfigList != undefined && ServiceSpecificDeNormalizeColumnConfigList != null) {
                for (var i = 0; i < ServiceSpecificDeNormalizeColumnConfigList.length; i++) {
                    var EntityWiseDeNormalizeColumnConfig = ServiceSpecificDeNormalizeColumnConfigList[i];
                    MyInstance.UpdateOrganizationHierarchy(MasterDetailsDTOList, EntityWiseDeNormalizeColumnConfig);
                }
            }

                //:Todo : temporarily if no metadata exists
            else {
                MyInstance.UpdateOrganizationHierarchy(MasterDetailsDTOList, null);
            }
            OneViewConsole.Debug("UpdateReferredOrganizationHierarchy end", "SyncFrameworkBO.UpdateReferredOrganizationHierarchy");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.UpdateReferredOrganizationHierarchy", Excep);
        }
        finally {
        }
    }

    this.UpdateOrganizationHierarchy = function (MasterDetailsDTOList, EntityWiseDeNormalizeColumnConfig) {
        try {
            OneViewConsole.Debug("UpdateOrganizationHierarchy start", "SyncFrameworkBO.UpdateOrganizationHierarchy");

            var _oExpressionEvalFramework = new ExpressionEvalFramework();
            if (MasterDetailsDTOList != null && MasterDetailsDTOList.length > 0) {
                for (var j = 0; j < MasterDetailsDTOList.length; j++) {
                    var _oMasterDetailsDTO = MasterDetailsDTOList[j];
                    if (EntityWiseDeNormalizeColumnConfig != undefined && EntityWiseDeNormalizeColumnConfig != null && EntityWiseDeNormalizeColumnConfig != "") {
                        if (_oMasterDetailsDTO.Type == EntityWiseDeNormalizeColumnConfig.EntityType) {
                            for (var k = 0; k < EntityWiseDeNormalizeColumnConfig.DeNormalizeColumnConfigDetails.length; k++) {
                                var ReferEntityTypeDetails = EntityWiseDeNormalizeColumnConfig.DeNormalizeColumnConfigDetails[k];
                                if (ReferEntityTypeDetails.ReferEntityType == 15) {
                                    var ExpressionValue = _oExpressionEvalFramework.EvaluateExpression(ReferEntityTypeDetails, _oMasterDetailsDTO);
                                    MyInstance.UpdateEntityDAO('OrganizationHierarchyNode', 'ChildDbElementId', _oMasterDetailsDTO.ServerId, 'ChildDbElementName', ExpressionValue);
                                }
                            }
                        }
                    }
                    else {
                        var ExpressionValue = _oExpressionEvalFramework.EvaluateExpression(null, _oMasterDetailsDTO);
                        MyInstance.UpdateEntityDAO('OrganizationHierarchyNode', 'ChildDbElementId', _oMasterDetailsDTO.ServerId, 'ChildDbElementName', ExpressionValue);
                    }
                }
            }

            OneViewConsole.Debug("UpdateOrganizationHierarchy end", "SyncFrameworkBO.UpdateOrganizationHierarchy");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.UpdateOrganizationHierarchy", Excep);
        }
        finally {
        }
    }



    this.DeleteAndInsert = function (MasterName, EntityList) {
        try {
            OneViewConsole.Debug("DeleteAndInsert start", "SyncFrameworkBO.DeleteAndInsert");

            var IsSuccess = false;
            var _oDefaultMasterDAO = new DefaultMasterDAO(MasterName); 
            var Count = _oDefaultMasterDAO.Count();
            var _oTaskSyncLogDAO = new TaskSyncLogDAO();

            for (var i = 0; i < EntityList.length; i++) {
                var _oEntity = EntityList[i];           
              
                //Delete
                _oDefaultMasterDAO.DeleteByServerId(_oEntity.ServerId);

                //Insert                
                _oDefaultMasterDAO.Create(_oEntity, Count);
                Count++;

                //Sync TaskSyncLogEntity
                 _oTaskSyncLogDAO.UpdateLocalSyncStatus(_oEntity.ServerId, _oEntity.Type);
            }
                      
            IsSuccess = true;
            OneViewConsole.Debug("DeleteAndInsert end", "SyncFrameworkBO.DeleteAndInsert");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.DeleteAndInsert", Excep);
        }
        finally {
        }

        return Response;
    }

    this.DeleteAndInsertUserMaster = function (MasterName, EntityList) {
        try {
            OneViewConsole.Debug("DeleteAndInsertUserMaster start", "SyncFrameworkBO.DeleteAndInsertUserMaster");

            var IsSuccess = false;
            var _oDefaultMasterDAO = new DefaultMasterDAO(MasterName);
            var Count = _oDefaultMasterDAO.Count();
            var _oTaskSyncLogDAO = new TaskSyncLogDAO();
            var _oDcProfileDAO = new DcProfileDAO();
            var _oDcApprovalUserDetailsDAO = new DcApprovalUserDetailsDAO();
            var _oActionFollowUpDAO = new ActionFollowUpDAO();
            var ServiceId = OneViewSessionStorage.Get("ServiceId");

            for (var i = 0; i < EntityList.length; i++) {
                var _oEntity = EntityList[i];

                //Delete
                _oDefaultMasterDAO.DeleteByServerId(_oEntity.ServerId);

                //Insert                
                _oDefaultMasterDAO.Create(_oEntity, Count);
                Count++;
                
                //Update Hierarchy
                MyInstance.UpdateReferredOrganizationHierarchy(DeNormalizeColumnConfig, ServiceId, EntityList);

                // Updating UserName in existing dc profiles
                _oDcProfileDAO.UpdateUserNameByDcUserId(_oEntity.ServerId, _oEntity.Name);

                // Updating UserName in existing approval profiles
                _oDcApprovalUserDetailsDAO.UpdateUserNameByUserId(_oEntity.ServerId, _oEntity.Name);

                // Updating FollowUpUserName in existing action followup profiles
                _oActionFollowUpDAO.UpdateFollowUpUserNameByFollowUpUserId(_oEntity.ServerId, _oEntity.Name);

                //Sync TaskSyncLogEntity
                _oTaskSyncLogDAO.UpdateLocalSyncStatus(_oEntity.ServerId, _oEntity.Type);
            }

            IsSuccess = true;
            OneViewConsole.Debug("DeleteAndInsertUserMaster end", "SyncFrameworkBO.DeleteAndInsertUserMaster");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.DeleteAndInsertUserMaster", Excep);
        }
        finally {
        }

        return Response;
    }

    this.AttributeOtherConfigDeleteAndInsert = function (AttributeOtherConfigMetaDataDTO) {
        try {
            OneViewConsole.Debug("AttributeOtherConfigDeleteAndInsert start", "SyncFrameworkBO.AttributeOtherConfigDeleteAndInsert");
            var IsMetaDataSuccess = false;

            var oProfileDownloadBO = new ProfileDownloadBO();
            for (var i = 0 ; i < AttributeOtherConfigMetaDataDTO.length; i++) {
                var AttributeOtherConfigMetaData = new AttributeOtherConfigNormalizer().Normalize(AttributeOtherConfigMetaDataDTO[i]);
                IsMetaDataSuccess = oProfileDownloadBO.InsertAttributeOtherConfigMetaData(AttributeOtherConfigMetaData);
            }

            OneViewConsole.Debug("AttributeOtherConfigDeleteAndInsert end", "SyncFrameworkBO.AttributeOtherConfigDeleteAndInsert");
            return IsMetaDataSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "SyncFrameworkBO.AttributeOtherConfigDeleteAndInsert", Excep);
        }
        finally {
        }

        return Response;
    }

}




// SyncFrameworkIL
function SyncFrameworkIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// UpdateServerSyncStatus
    /// </summary>
    /// <param name="DeviceId">DeviceId</param>
    /// <param name="TransactionIdlst">List of TransactionId need to be updated</param>
    this.UpdateServerSyncStatus = function (DeviceId, TransactionIdlst) {
        try {
            OneViewConsole.Debug("UpdateServerSyncStatus Start", "SyncFrameworkIL.UpdateServerSyncStatus");
            
            
            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/UpdateSyncStatus_json";           
            var RequestParam = JSON.stringify({ 'DeviceId': DeviceId, 'TransactionIdlst': TransactionIdlst });
            
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });           
            var oSyncStatusDTO = _oOneViewChannel.Send();

            if (oSyncStatusDTO != null) {               
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oSyncStatusDTO.UpdateSyncStatus_jsonResult), "SyncFrameworkIL.UpdateServerSyncStatus");
                oSyncStatusDTO = JSON.parse(oSyncStatusDTO.UpdateSyncStatus_jsonResult);
            }

            OneViewConsole.Debug("UpdateServerSyncStatus End", "SyncFrameworkIL.UpdateServerSyncStatus");

            return oSyncStatusDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "SyncFrameworkIL.UpdateServerSyncStatus", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oSyncStatusDTO = null;
        }
    }


    /// <summary>
    /// DownloadMasters
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    /// <param name="ModifiedEntityDict">Dictionary having EntityType as key and Entity Id List as value</param>
    this.DownloadMasters = function (ServiceId, LoginUserId, ModifiedEntityDict) {
        try {
            OneViewConsole.Debug("DownloadMasters Start", "SyncFrameworkIL.DownloadMasters");

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetMastersById_json";
            var RequestParam = JSON.stringify({ 'ServiceId': ServiceId, 'UserId': LoginUserId, 'EntityDict': ModifiedEntityDict });
            
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
            
            var oMasterDTO = _oOneViewChannel.Send();

            if (oMasterDTO != null) {               
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oMasterDTO.GetMastersById_jsonResult), "SyncFrameworkIL.DownloadMasters");
                oMasterDTO = JSON.parse(oMasterDTO.GetMastersById_jsonResult);
            }

            OneViewConsole.Debug("DownloadMasters End", "SyncFrameworkIL.DownloadMasters");
            return oMasterDTO;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "SyncFrameworkIL.UpdateServerSyncStatus", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oMasterDTO = null;
        }

    }
}




function ExpressionEvalFramework() {

    this.EvaluateExpression = function (ReferEntityTypeDetails, EntityValues) {
        try {
            OneViewConsole.Debug("EvaluateExpression start", "ExpressionEvalFramework.EvaluateExpression");
            var ExpressionValue = "";
            if (ReferEntityTypeDetails != undefined && ReferEntityTypeDetails != null && ReferEntityTypeDetails != "") {
                var Expression = ReferEntityTypeDetails.Expression;
             
                
                for (var j = 0; j < ReferEntityTypeDetails.RefColumnNames.length; j++) {
                    var RefColumnName = ReferEntityTypeDetails.RefColumnNames[j];
                    var Exp = '$vn$' + RefColumnName + '$vn$';                   
                    ExpressionValue += Expression.replace(Exp, EntityValues[RefColumnName]);
                }
            }
            else {
                ExpressionValue = EntityValues["Name"];

            }
            OneViewConsole.Debug("EvaluateExpression end", "ExpressionEvalFramework.EvaluateExpression");

            return ExpressionValue;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ExpressionEvalFramework.EvaluateExpression", Excep);
        }
        finally {
        }

    }
}


