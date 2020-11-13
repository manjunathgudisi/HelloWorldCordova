function DCNCMappingBO(InputParm) {
    try {
        OneViewConsole.Debug("DCNCMappingBO start", "BO.DCNCMappingBO");

        var TemplateId;
        var TemplateName;
        var oScope;
        var xlatService;
        var toaster;
        var MyInstance = this;
        if (InputParm != undefined) {
            TemplateId = InputParm.TemplateId;
            TemplateName = InputParm.TemplateName;
            if (InputParm.scope != undefined) {
                oScope = InputParm.scope;
            }
            if (InputParm.toaster != undefined) {
                toaster = InputParm.toaster;
            }
            if (InputParm.xlatService != undefined) {
                xlatService = InputParm.xlatService;
            }
        }

        OneViewConsole.Debug("DCNCMappingBO end", "BO.DCNCMappingBO");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("BO", "BO.DCNCMappingBO", Excep);
    }
    this.GetDefaultActionEntity = function () {

    }


    //return DCNCMapping object
    this.GetDCNCMapping = function (oDCNCMappingListData) {
        try {
            OneViewConsole.Debug("GetDCNCMapping start", "DCNCMappingBO.GetDCNCMapping");
                   
            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
            var _oDCNCMapping = new DCNCMapping();
            _oDCNCMapping.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oDCNCMapping.MobileVersionId = 1;
            // _oDCNCStatus.OVGuid = "TEXT";
            _oDCNCMapping.ServiceId = OneViewSessionStorage.Get("ServiceId");
            _oDCNCMapping.RaisedBySystemUserId = OneViewSessionStorage.Get("LoginUserId");
            _oDCNCMapping.NCRuleId = oDCNCMappingListData.NCRuleId;
            _oDCNCMapping.IsNC = (oDCNCMappingListData.IsNC != undefined) ? oDCNCMappingListData.IsNC : false;
            _oDCNCMapping.AttributeGroupId = oDCNCMappingListData.AttributeGroupId;
            _oDCNCMapping.CreatedDate = CurrenntDateAndTime;
            _oDCNCMapping.IsSynchronized = 'false';
            _oDCNCMapping.IsManualRule = (oDCNCMappingListData.IsManualRule != undefined) ? oDCNCMappingListData.IsManualRule : false;
            _oDCNCMapping.Comments = (oDCNCMappingListData.Comments != undefined) ? oDCNCMappingListData.Comments : "";
            _oDCNCMapping.IsObservation = (oDCNCMappingListData.IsObservation != undefined) ? oDCNCMappingListData.IsObservation : false;
            _oDCNCMapping.RuleName = (oDCNCMappingListData.RuleName != undefined) ? oDCNCMappingListData.RuleName : "";
            _oDCNCMapping.RuleDescription = (oDCNCMappingListData.RuleDescription != undefined) ? oDCNCMappingListData.RuleDescription : "";
            _oDCNCMapping.RuleGroup = (oDCNCMappingListData.RuleGroup != undefined) ? oDCNCMappingListData.RuleGroup : "",
            _oDCNCMapping.RuleCode = (oDCNCMappingListData.RuleCode != undefined) ? oDCNCMappingListData.RuleCode : "",

            _oDCNCMapping.Deviatedby = (oDCNCMappingListData.Deviatedby != null) ? oDCNCMappingListData.Deviatedby : "",
            _oDCNCMapping.ExpectedValue = (oDCNCMappingListData.ExpectedValue != undefined) ? oDCNCMappingListData.ExpectedValue : "",
            _oDCNCMapping.ActualValue = (oDCNCMappingListData.ActualValue != undefined) ? oDCNCMappingListData.ActualValue : "",
            _oDCNCMapping.TemplateNodeIds = (oDCNCMappingListData.TemplateNodeIds != undefined) ? oDCNCMappingListData.TemplateNodeIds : "",

            OneViewConsole.Debug("GetDCNCMapping end", "DCNCMappingBO.GetDCNCMapping");
            return _oDCNCMapping;
        }
        catch (Excep) {
            //alert('GetDCNCMapping Excep ' + Excep);
            //alert('GetDCNCMapping Excep ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "DCNCMappingBO.GetDCNCMapping", Excep);
        }
        finally {
            oDateTime = null;
            CurrenntDateAndTime = null;
            _oDCNCMapping = null;
        }
    }

    //return DCNCMapping object with Action and Datacapture details
    this.GetNCFormAction = function (NCRuleId, IsNC, oTemplateNodes, ActionContext, TemplateId, TemplateName, RuleGroup, RuleCode, RuleName, RuleDescription, Deviatedby, ExpectedValue, ActualValue, TemplateNodeIds) {
        try {
            OneViewConsole.Debug("GetNCFormAction start", "DCNCMappingBO.GetNCFormAction");
            OneViewConsole.DataLog("NCRuleId : " + NCRuleId, "DCNCMappingBO.GetNCFormAction");
            OneViewConsole.DataLog("IsNC : " + IsNC, "DCNCMappingBO.GetNCFormAction");
            OneViewConsole.DataLog("TemplateNodes : " + JSON.stringify(oTemplateNodes), "DCNCMappingBO.GetNCFormAction");
            OneViewConsole.DataLog("ActionContext : " + ActionContext, "DCNCMappingBO.GetNCFormAction");

            var oDCNCMappingListData = { 'NCRuleId': NCRuleId, 'IsNC': IsNC, "IsObservation": false, "Comments": "", "IsManualRule": false, 'RuleGroup': RuleGroup, 'RuleCode': RuleCode, 'RuleName': RuleName, 'RuleDescription': RuleDescription, 'Deviatedby': Deviatedby, 'ExpectedValue': ExpectedValue, 'ActualValue': ActualValue, 'TemplateNodeIds': TemplateNodeIds };
            var oDCNCMapping = MyInstance.GetDCNCMapping(oDCNCMappingListData);
            var oActionBO = new ActionBO(InputParm);
            var _oActionEntity = oActionBO.GetFormActionEntity(oTemplateNodes, ActionContext, TemplateId, TemplateName);
            oDCNCMapping.oActionEntity = _oActionEntity;

            OneViewConsole.Debug("GetNCFormAction end", "DCNCMappingBO.GetNCFormAction");
            return oDCNCMapping;
        }
        catch (Excep) {
            //alert('GetNCFormAction Excep ' + Excep);
            //alert('GetNCFormAction Excep ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "DCNCMappingBO.GetNCFormAction", Excep);
        }
        finally {
            oDCNCMapping = null;
            oActionBO = null;
            _oActionEntity = null;
        }
    }

    this.GetNCPreDefinedAction = function () {

    }
    this.GetNCCustomeActionAction = function () {

    }

    this.GetNCWithOutActionAction = function (NCRuleId, IsNC) {
        try {
            OneViewConsole.Debug("GetNCWithOutActionAction start", "DCNCMappingBO.GetNCWithOutActionAction");
            OneViewConsole.DataLog("NCRuleId : " + NCRuleId, "DCNCMappingBO.GetNCWithOutActionAction");
            OneViewConsole.DataLog("IsNC : " + IsNC, "DCNCMappingBO.GetNCWithOutActionAction");

            var oDCNCMappingListData = { 'NCRuleId': NCRuleId, 'IsNC': IsNC, "IsObservation": false, "Comments": "", "IsManualRule": false };
            var oDCNCMapping = MyInstance.GetDCNCMapping(oDCNCMappingListData);
            OneViewConsole.Debug("GetNCWithOutActionAction end", "DCNCMappingBO.GetNCWithOutActionAction");

            return oDCNCMapping;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DCNCMappingBO.GetNCWithOutActionAction", Excep);
        }
        finally {
            oDCNCMapping = null;
        }
    }



    //this.GetNCDataCapture = function () {

    //    var oDataCaptureBO = new DataCaptureBO();
    //    var oDataCapture = oDataCaptureBO.GetCompleteDataCaptureEntity(oScope, oTemplateNodes);
    //    return oDataCapture;
    //}

}


function ActionBO(InputParm)
{
    try {
        OneViewConsole.Debug("ActionBO start", "BO.ActionBO");

        var TemplateId;
        var TemplateName;
        var oScope;
        var xlatService;
        var toaster;
        if (InputParm != undefined) {
            TemplateId = InputParm.TemplateId;
            TemplateName = InputParm.TemplateName;
            if (InputParm.scope != undefined) {
                oScope = InputParm.scope;
            }
            if (InputParm.toaster != undefined) {
                toaster = InputParm.toaster;
            }
            if (InputParm.xlatService != undefined) {
                xlatService = InputParm.xlatService;
            }
        }

        OneViewConsole.Debug("ActionBO end", "BO.ActionBO");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("BO", "BO.ActionBO", Excep);
    }

    this.GetFormDCActionMapping = function (oTemplateNodes) {
        navigator.notification.alert(('GetFormDCActionMapping :not implemented exception'), ['OK'], "")
    }

    //return ActionEntity
    this.GetPreDefinedDCActionMapping = function () {
        navigator.notification.alert(('GetPreDefinedDCActionMapping :not implemented exception'), ['OK'], "")
    }

    //return ActionEntity
    this.GetCustomeDCActionMapping = function () {
        navigator.notification.alert(('GetCustomeDCActionMapping :not implemented exception'), ['OK'], "")
    }

   
    var GetActionEntity = function (ActionContext) {
        try
        {
            OneViewConsole.Debug("GetActionEntity start", "ActionBO.GetActionEntity");
            OneViewConsole.DataLog("ActionContext : " + ActionContext, "ActionBO.GetActionEntity");

            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
            var _oActionEntity = new ActionEntity();

            _oActionEntity.ServiceId = OneViewSessionStorage.Get("ServiceId");

            _oActionEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oActionEntity.MobileVersionId = 1;

            _oActionEntity.ActionContext = ActionContext;

            _oActionEntity.ActionRaisedBySystemUserId = OneViewSessionStorage.Get("LoginUserId");
            _oActionEntity.ActionRaisedByUserName = OneViewSessionStorage.Get("LoginUserName");

            _oActionEntity.CreatedDate = CurrenntDateAndTime

            _oActionEntity.IsSynchronized = "false";

            OneViewConsole.Debug("GetActionEntity end", "ActionBO.GetActionEntity");

            return _oActionEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionBO.GetActionEntity", Excep);
        }
        finally {
            oDateTime = null;
            CurrenntDateAndTime = null;
            _oActionEntity = null;
        }
    }
    

    var GetFormActionDetailsEntity = function (oTemplateNodes, TemplateId, TemplateName) {
        try {

            OneViewConsole.Debug("GetFormActionDetailsEntity start", "ActionBO.GetFormActionDetailsEntity");
            OneViewConsole.DataLog("TemplateNodes : " + JSON.stringify(oTemplateNodes), "ActionBO.GetFormActionDetailsEntity");

            var _oActionDetailsEntity = new ActionDetailsEntity();
            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
            var _oDataCapture = GetDataCaptureEntity(oTemplateNodes, TemplateId, TemplateName);

            _oActionDetailsEntity.oDataCapture = _oDataCapture;

            _oActionDetailsEntity.ServiceId = OneViewSessionStorage.Get("ServiceId");

            _oActionDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oActionDetailsEntity.MobileVersionId = 1;

            _oActionDetailsEntity.IsPersonalObservation = "true";

            _oActionDetailsEntity.CreatedDate = CurrenntDateAndTime;

            _oActionDetailsEntity.IsSynchronized = "false";

            OneViewConsole.Debug("GetFormActionDetailsEntity end", "ActionBO.GetFormActionDetailsEntity");


            return _oActionDetailsEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionBO.GetFormActionDetailsEntity", Excep);
        }
        finally {
            _oActionDetailsEntity = null;
            oDateTime = null;
            CurrenntDateAndTime = null;
            _oDataCapture = null;
        }
    }
    
    var GetPreDefinedActionDetailsEntityList = function () {
        navigator.notification.alert(('GetPreDefinedActionDetailsEntityList :not implemented exception'), ['OK'], "")
    }
    var GetCustomeActionDetailsEntityList = function () {
        navigator.notification.alert(('GetCustomeActionDetailsEntityList :not implemented exception'), ['OK'], "")
    }


    var GetDataCaptureEntity = function (oTemplateNodes, TemplateId, TemplateName) {
        try
        {
            OneViewConsole.Debug("GetDataCaptureEntity start", "ActionBO.GetDataCaptureEntity");
            OneViewConsole.DataLog("TemplateNodes : " + JSON.stringify(oTemplateNodes), "ActionBO.GetDataCaptureEntity");

            var oDataCaptureBO = new DataCaptureBO({ 'scope': oScope, 'TemplateNodes': oTemplateNodes, 'xlatService': xlatService, 'toaster': toaster, 'TemplateId': TemplateId, 'TemplateName': TemplateName });
            var oDataCapture = oDataCaptureBO.GetCompleteDataCaptureEntity(oScope, oTemplateNodes);
            oDataCapture.IsForAction = 'true';

            OneViewConsole.Debug("GetDataCaptureEntity end", "ActionBO.GetDataCaptureEntity");

            return oDataCapture;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionBO.GetDataCaptureEntity", Excep);
        }
        finally {
            oDataCaptureBO = null;
            oDataCapture = null;
        }
    }


    ///*********** ActionEntity Normalizer Start**********
    //return ActionEntity
    this.GetFormActionEntity = function (oTemplateNodes, ActionContext, TemplateId, TemplateName) {
        try
        {
            OneViewConsole.Debug("GetFormActionEntity start", "ActionBO.GetFormActionEntity");
            OneViewConsole.DataLog("TemplateNodes : " + JSON.stringify(oTemplateNodes), "ActionBO.GetFormActionEntity");
            OneViewConsole.DataLog("ActionContext : " + ActionContext, "ActionBO.GetFormActionEntity");

            var oActionEntity = GetActionEntity(ActionContext);
            var oActionDetailsEntity = GetFormActionDetailsEntity(oTemplateNodes, TemplateId, TemplateName);
            oActionEntity.ActionDetailsEntityList.push(oActionDetailsEntity);

            OneViewConsole.Debug("GetFormActionEntity end", "ActionBO.GetFormActionEntity");

            return oActionEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionBO.GetFormActionEntity", Excep);
        }
        finally {
            oActionEntity = null;
            oActionDetailsEntity = null;
        }
    }

    this.GetPreDefinedActionEntity = function () {
        alert('GetPreDefinedActionEntity :not implemented exception');
    }


    this.GetCustomeActionEntity = function () {
        alert('GetCustomeActionEntity :not implemented exception');
    }

    this.InsertAction = function (ActionInfoLst) {
        try {         
            OneViewConsole.Debug("InsertAction start", "ActionBO.InsertAction");
            OneViewConsole.DataLog("ActionInfoLst : " + JSON.stringify(ActionInfoLst), "ActionBO.InsertAction");
          
            var _oActionNormalizer = new ActionNormalizer();
            var _oActionDetailsNormalizer = new ActionDetailsNormalizer();
            var _oDCNCMappingNormalizer = new DCNCMappingNormalizer();
            var _oMultiMediaSubElementsNormalizer = new MultiMediaSubElementsNormalizer();

            var ActionInfo = new Array();        

            ActionInfo[0] = _oActionNormalizer.NormalizeList(ActionInfoLst.ActionLst);         
            ActionInfo[1] = _oActionDetailsNormalizer.NormalizeList(ActionInfoLst.ActionDetailsLst);       
            ActionInfo[2] = new Array();
            ActionInfo[3] = _oDCNCMappingNormalizer.NormalizeList(ActionInfoLst.DCNCMappingLst);            
            ActionInfo[4] = new Array();
            ActionInfo[5] = new Array();
            
            InsertActionInfo(ActionInfo);
            
            if (ActionInfoLst.PreDefinedActionDTOLst != undefined && ActionInfoLst.PreDefinedActionDTOLst != null && ActionInfoLst.PreDefinedActionDTOLst.length > 0) {
                var PreDefinedActionDTOLst = new MasterNormalizer().NormalizeList("PredefinedActionMasterEntity", ActionInfoLst.PreDefinedActionDTOLst);
                var _oProfileDownloadBO = new ProfileDownloadBO();
                _oProfileDownloadBO.InsertPreDefinedActions(PreDefinedActionDTOLst);
            }
            
            if (ActionInfoLst.ActionManualFollowUpLst != undefined && ActionInfoLst.ActionManualFollowUpLst != null && ActionInfoLst.ActionManualFollowUpLst.length > 0) {
                var ActionManualFollowUpDTOLst = new ActionManualFollowUpInfoNormalizer().NormalizeList(ActionInfoLst.ActionManualFollowUpLst);
                var _oProfileDownloadBO = new ProfileDownloadBO();
                _oProfileDownloadBO.InsertActionManualFollowUpLst(ActionManualFollowUpDTOLst);
            }

            OneViewConsole.Debug("InsertAction end", "ActionBO.InsertAction");

            return true;
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("BO", "ActionBO.InsertAction", Excep);
        }
        finally {
            _oActionNormalizer = null;
            _oActionDetailsNormalizer = null;
            _oDCNCMappingNormalizer = null;
            ActionInfo = null;
        }
    }

    var InsertActionInfo = function (InsertActionInfo) {

        try {
            OneViewConsole.Debug("InsertActionInfo start", "ActionBO.InsertActionInfo");
            OneViewConsole.DataLog("InsertActionInfo : " + JSON.stringify(InsertActionInfo), "ActionBO.InsertActionInfo");

            // Action info insertion
            for (i = 0; i < ActionTables.length; i++) {
                
                var _oDefaultMasterDAO = new DefaultMasterDAO(ActionTables[i]);

                var Count = _oDefaultMasterDAO.Count();               

                for (var j = 0; j < InsertActionInfo[i].length; j++) {
                 
                    // Cheking this data is already available in local db
                    var obj = _oDefaultMasterDAO.GetByServerId(InsertActionInfo[i][j].ServerId);

                    // If its not available, create new master
                    if (obj.length == 0) {
                        _oDefaultMasterDAO.Create(InsertActionInfo[i][j], Count);
                        Count += 1;
                    }

                    // If its available, check the OVGuid
                    // If OVGuid is mismatch
                    //else if (obj[0].OVGuid != InsertActionInfo[i][j].OVGuid) {
                    //    alert("Insert Action : Not implemented exception");
                    //    OneViewConsole.Debug("Insert Action : Not implemented exception", "ProfileDownloadBO.InsertActionInfo");
                    //}

                    else {
                        if (OneViewGlobalConflictResolveMode == 2) {
                            //alert("InsertActionInfo : " + obj[0].Id);
                            _oDefaultMasterDAO.DeleteById(obj[0].Id);

                            _oDefaultMasterDAO.Create(InsertActionInfo[i][j], Count);
                            Count += 1;
                        }
                    }
                }
            }

            OneViewConsole.Debug("InsertActionInfo end", "ActionBO.InsertActionInfo");
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("BO", "ActionBO.InsertActionInfo", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            obj = null;
        }
    }

    this.GetAllUnSyncActions = function () {
        try {
            OneViewConsole.Debug("GetAllUnSyncActions start", "ActionBO.GetAllUnSyncActions");

            var _oActionDAO = new ActionDAO();
            var ActionInfoList = _oActionDAO.GetAllUnSyncActions();

            OneViewConsole.Debug("GetAllUnSyncActions end", "ActionBO.GetAllUnSyncActions");

            return ActionInfoList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionBO.GetAllUnSyncActions", Excep);
        }
        finally {
            _oActionDAO = null;
            ActionInfoList = null;
        }
    }

    this.UpdateActionProcessCount = function () {
        try {
            OneViewConsole.Debug("UpdateActionProcessCount start", "ActionBO.UpdateActionProcessCount");

            var _oActionDAO = new ActionDAO();
            _oActionDAO.UpdateActionProcessCount();

            OneViewConsole.Debug("UpdateActionProcessCount end", "ActionBO.UpdateActionProcessCount");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionBO.UpdateActionProcessCount", Excep);
        }
        finally {
            _oActionDAO = null;
        }
    }

    this.UpdateActionUploadResponse = function (ActionResponseDTO) {
        try {
            OneViewConsole.Debug("UpdateActionUploadResponse start", "ActionBO.UpdateActionUploadResponse");

            var _oActionDAO = new ActionDAO();
            _oActionDAO.UpdateSynchronizedFalgAndServerIdByList(ActionResponseDTO.ActionResponseLst, "ActionEntity");
            _oActionDAO.UpdateSynchronizedFalgAndServerIdByList(ActionResponseDTO.ActionDetailsResponseLst, "ActionDetailsEntity");
            _oActionDAO.UpdateSynchronizedFalgAndServerIdByList(ActionResponseDTO.DCActionMappingResponseLst, "DCActionMapping");
            _oActionDAO.UpdateSynchronizedFalgAndServerIdByList(ActionResponseDTO.DCNCMappingResponseLst, "DCNCMapping");
            _oActionDAO.UpdateSynchronizedFalgAndServerIdByList(ActionResponseDTO.MultiMediaSubElementsResponseLst, "MultiMediaSubElements");           
            _oActionDAO.UpdateSynchronizedFalgAndServerIdByList(ActionResponseDTO.ActionManualFollowUpResponseLst, "ActionManualFollowUpEntity");

            OneViewConsole.Debug("UpdateActionProcessCount end", "ActionBO.UpdateActionUploadResponse");
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("BO", "ActionBO.UpdateActionUploadResponse", Excep);
        }
        finally {
            _oActionDAO = null;
        }
    }

    ///*********** ActionEntity Normalizer End**********
}


// Action normalizer
function ActionNormalizer() {

    // ActionNormalizer object
    var MyInstance = this;

    this.Normalize = function (ActionObj) {
        try {
            OneViewConsole.Debug("Normalize start", "ActionNormalizer.Normalize");
            OneViewConsole.DataLog("ActionObj : " + JSON.stringify(ActionObj), "ActionNormalizer.Normalize");

            var _oActionEntity = new ActionEntity();

            _oActionEntity.ServerId = ActionObj.ServerId;
            
            _oActionEntity.ClientGuid = ActionObj.ClientGuid;
            _oActionEntity.MobileVersionId = 1;
            _oActionEntity.OVGuid = ActionObj.OVGuid;
            _oActionEntity.ServiceId = ActionObj.ServiceId;

            _oActionEntity.ActionContext = ActionObj.ActionContext;

            // Who raised the action
            _oActionEntity.ActionRaisedBySystemUserId = ActionObj.ActionRaisedBySystemUserId;
            _oActionEntity.ActionRaisedByAnonymousUserId = ActionObj.ActionRaisedByAnonymousUserId;
            _oActionEntity.ActionRaisedByUserName = ActionObj.ActionRaisedByUserName;

            _oActionEntity.Comments = ActionObj.Comments;

            // Approval status 
            _oActionEntity.IsApproved = ActionObj.IsApproved;
            _oActionEntity.ApprovedDate = ActionObj.ApprovedDate;
            _oActionEntity.IsRejected = ActionObj.IsRejected;
            _oActionEntity.RejectedDate = ActionObj.RejectedDate;

            // Submitted status
            _oActionEntity.IsSubmited = ActionObj.IsSubmited;
            _oActionEntity.SubmitedDate = ActionObj.SubmitedDate;

            _oActionEntity.IsMultiMediaAttached = (ActionObj.IsMultiMediaAttached != undefined) ? ActionObj.IsMultiMediaAttached : "false";

            _oActionEntity.IsDisable = false;
            
            _oActionEntity.CreatedDate = ActionObj.CreatedDate;
            _oActionEntity.LastsyncDate = new DateTime().GetDateAndTime();
            _oActionEntity.IsSynchronized = "true";

            OneViewConsole.Debug("Normalize end", "ActionNormalizer.Normalize");

            return _oActionEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "ActionNormalizer.Normalize", Excep);
        }
        finally {
            _oActionEntity = null;
        }
    }

    this.NormalizeList = function (ActionLst) {
        try {
            OneViewConsole.Debug("NormalizeList start", "ActionNormalizer.NormalizeList");
            OneViewConsole.DataLog("ActionLst : " + JSON.stringify(ActionLst), "ActionNormalizer.NormalizeList");


            var ActionEntityList = new Array();
            for (var i = 0; i < ActionLst.length; i++) {

                var ActionEntityobj = MyInstance.Normalize(ActionLst[i]);
                ActionEntityList[i] = ActionEntityobj;
            }

            OneViewConsole.Debug("NormalizeList end", "ActionNormalizer.NormalizeList");

            return ActionEntityList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "ActionNormalizer.NormalizeList", Excep);
        }
        finally {
            ActionEntityList = null;
            ActionEntityobj = null;
        }
    }
}

// Action normalizer
function ActionDetailsNormalizer() {

    // ActionNormalizer object
    var MyInstance = this;

    this.Normalize = function (ActionDetailsObj) {
        try {
            OneViewConsole.Debug("Normalize start", "ActionDetailsNormalizer.Normalize");
            OneViewConsole.DataLog("ActionDetailsObj : " + JSON.stringify(ActionDetailsObj), "ActionDetailsNormalizer.Normalize");

            var _oActionDetailsEntity = new ActionDetailsEntity();

            _oActionDetailsEntity.ServerId = ActionDetailsObj.ServerId;

            _oActionDetailsEntity.ClientGuid = ActionDetailsObj.ClientGuid;
            _oActionDetailsEntity.MobileVersionId = 1;
            _oActionDetailsEntity.OVGuid = ActionDetailsObj.OVGuid;
            _oActionDetailsEntity.ServiceId = ActionDetailsObj.ServiceId;

            // Client guid
            _oActionDetailsEntity.ActionClientGuid = ActionDetailsObj.ActionClientGuid;

            // Action info
            _oActionDetailsEntity.PreDefinedActionId = ActionDetailsObj.PreDefinedActionId;
            _oActionDetailsEntity.CustomAction = (ActionDetailsObj.PreDefinedActionId == 0) ? ActionDetailsObj.CustomAction : "";

            if (ActionDetailsObj.ActionResponsibleFor != undefined) {
                _oActionDetailsEntity.ActionResponsibleFor = ActionDetailsObj.ActionResponsibleFor;
            }

            // Client guid
            _oActionDetailsEntity.DataCaptureClientGuid = ActionDetailsObj.DataCaptureClientGuid;

            ///<summary>
            /// true=>no need of followUp
            /// </summary>
            _oActionDetailsEntity.IsPersonalObservation = ActionDetailsObj.IsPersonalObservation;
            _oActionDetailsEntity.ActionExecutionOrder = ActionDetailsObj.ActionExecutionOrder;

            _oActionDetailsEntity.Comments = ActionDetailsObj.Comments;
            _oActionDetailsEntity.IsMultiMediaAttached = (ActionDetailsObj.IsMultiMediaAttached != undefined) ? ActionDetailsObj.IsMultiMediaAttached : "false";

            _oActionDetailsEntity.IsDisable = false;           

            _oActionDetailsEntity.ActionFollowUpStatus = (ActionDetailsObj.ActionFollowUpStatus != undefined) ? ActionDetailsObj.ActionFollowUpStatus : "";
            _oActionDetailsEntity.ActionResolveStartDate = (ActionDetailsObj.ActionResolveStartDate != undefined) ? ActionDetailsObj.ActionResolveStartDate : "";
            _oActionDetailsEntity.ActionResolveDate = (ActionDetailsObj.ActionResolveDate != undefined) ? ActionDetailsObj.ActionResolveDate : "";
            _oActionDetailsEntity.ActionFollowUpComments = (ActionDetailsObj.ActionFollowUpComments != undefined) ? ActionDetailsObj.ActionFollowUpComments : "";
            _oActionDetailsEntity.ActionFollowUpBySystemUserId = (ActionDetailsObj.ActionFollowUpBySystemUserId != undefined) ? ActionDetailsObj.ActionFollowUpBySystemUserId : "";

            // Who raised the action
            _oActionDetailsEntity.ActionRaisedBySystemUserId = (ActionDetailsObj.ActionRaisedBySystemUserId != undefined) ? ActionDetailsObj.ActionRaisedBySystemUserId : 0;
            _oActionDetailsEntity.ActionRaisedByAnonymousUserId = (ActionDetailsObj.ActionRaisedByAnonymousUserId != undefined) ? ActionDetailsObj.ActionRaisedByAnonymousUserId : "";
            _oActionDetailsEntity.ActionRaisedByUserName = (ActionDetailsObj.ActionRaisedByUserName != undefined) ? ActionDetailsObj.ActionRaisedByUserName : "";

            _oActionDetailsEntity.Latitude = (ActionDetailsObj.Latitude != undefined) ? ActionDetailsObj.Latitude : "";
            _oActionDetailsEntity.Longitude = (ActionDetailsObj.Longitude != undefined) ? ActionDetailsObj.Longitude : "";

            _oActionDetailsEntity.CreatedDate = ActionDetailsObj.CreatedDate;
            _oActionDetailsEntity.LastsyncDate = new DateTime().GetDateAndTime();
            _oActionDetailsEntity.IsSynchronized = "true";

            OneViewConsole.Debug("Normalize end", "ActionDetailsNormalizer.Normalize");


            return _oActionDetailsEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "ActionDetailsNormalizer.Normalize", Excep);
        }
        finally {
            _oActionDetailsEntity = null;
        }
    }

    this.NormalizeList = function (ActionDetailsLst) {
        try {

            OneViewConsole.Debug("NormalizeList start", "ActionDetailsNormalizer.NormalizeList");
            OneViewConsole.DataLog("ActionDetailsLst : " + JSON.stringify(ActionDetailsLst), "ActionDetailsNormalizer.NormalizeList");

            var ActionDetailsEntityList = new Array();
            for (var i = 0; i < ActionDetailsLst.length; i++) {
               
                var ActionDetailsEntityobj = MyInstance.Normalize(ActionDetailsLst[i]);
                ActionDetailsEntityList[i] = ActionDetailsEntityobj;
            }

            OneViewConsole.Debug("NormalizeList end", "ActionDetailsNormalizer.NormalizeList");

            return ActionDetailsEntityList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "ActionDetailsNormalizer.NormalizeList", Excep);
        }
        finally {
            ActionDetailsEntityList = null;
            ActionDetailsEntityobj = null;
        }
    }
}

// Action normalizer
function DCNCMappingNormalizer() {

    // ActionNormalizer object
    var MyInstance = this;

    this.Normalize = function (DCNCMappingObj) {
        try {
            OneViewConsole.Debug("Normalize start", "DCNCMappingNormalizer.Normalize");
            OneViewConsole.DataLog("DCNCMappingObj : " + JSON.stringify(DCNCMappingObj), "DCNCMappingNormalizer.Normalize");

            var _oDCNCMapping = new DCNCMapping();

            _oDCNCMapping.ServerId = DCNCMappingObj.ServerId;

            _oDCNCMapping.ClientGuid = DCNCMappingObj.ClientGuid;
            _oDCNCMapping.MobileVersionId = DCNCMappingObj.MobileVersionId;
            _oDCNCMapping.OVGuid = DCNCMappingObj.OVGuid;
            _oDCNCMapping.ServiceId = DCNCMappingObj.ServiceId;

            _oDCNCMapping.NCRuleId = DCNCMappingObj.NCRuleId;
            _oDCNCMapping.IsNC = DCNCMappingObj.IsNC;
            _oDCNCMapping.IsObservation = DCNCMappingObj.IsObservation;
            _oDCNCMapping.AttributeGroupId = DCNCMappingObj.AttributeGroupId;

            // Client guid
            _oDCNCMapping.DataCaptureClientGuid = DCNCMappingObj.DataCaptureClientGuid;
            // Client guid
            _oDCNCMapping.DcResultsClientGuid = DCNCMappingObj.DcResultsClientGuid;
            // Client guid
            _oDCNCMapping.DcResultDetailsClientGuid = DCNCMappingObj.DcResultDetailsClientGuid;
            // Server id
            _oDCNCMapping.AttributeGroupId = DCNCMappingObj.AttributeGroupId;
            // Client guid
            _oDCNCMapping.ActionClientGuid = DCNCMappingObj.ActionClientGuid;

            _oDCNCMapping.Comments = (DCNCMappingObj.Comments != undefined) ? DCNCMappingObj.Comments : "";

            _oDCNCMapping.IsManualRule = (DCNCMappingObj.IsManualRule != undefined) ? DCNCMappingObj.IsManualRule : "";
            _oDCNCMapping.RaisedBySystemUserId = (DCNCMappingObj.RaisedBySystemUserId != undefined) ? DCNCMappingObj.RaisedBySystemUserId : 0;
            _oDCNCMapping.RaisedByAnonymousUserId = (DCNCMappingObj.RaisedByAnonymousUserId != undefined) ? DCNCMappingObj.RaisedByAnonymousUserId : "";

            _oDCNCMapping.RuleName = (DCNCMappingObj.RuleName != undefined) ? DCNCMappingObj.RuleName : "";
            _oDCNCMapping.RuleDescription = (DCNCMappingObj.RuleDescription != undefined) ? DCNCMappingObj.RuleDescription : "";

            _oDCNCMapping.RuleGroup = (DCNCMappingObj.RuleGroup != undefined) ? DCNCMappingObj.RuleGroup : "";
            _oDCNCMapping.RuleCode = (DCNCMappingObj.RuleCode != undefined) ? DCNCMappingObj.RuleCode : "";
            _oDCNCMapping.Deviatedby = (DCNCMappingObj.Deviatedby != undefined) ? DCNCMappingObj.Deviatedby : "";
            _oDCNCMapping.ExpectedValue = (DCNCMappingObj.ExpectedValue != undefined) ? DCNCMappingObj.ExpectedValue : "";
            _oDCNCMapping.ActualValue = (DCNCMappingObj.ActualValue != undefined) ? DCNCMappingObj.ActualValue : "";

            _oDCNCMapping.IsMultiMediaAttached = (DCNCMappingObj.IsMultiMediaAttached != undefined) ? DCNCMappingObj.IsMultiMediaAttached : "false";
            _oDCNCMapping.IsDisable = false;
            _oDCNCMapping.TemplateNodeIds = (DCNCMappingObj.TemplateNodeIds != undefined) ? DCNCMappingObj.TemplateNodeIds : "";
            
            _oDCNCMapping.CreatedDate = DCNCMappingObj.CreatedDate;
            _oDCNCMapping.LastsyncDate = new DateTime().GetDateAndTime();
            _oDCNCMapping.IsSynchronized = "true";

            OneViewConsole.Debug("Normalize end", "DCNCMappingNormalizer.Normalize");

            return _oDCNCMapping;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DCNCMappingNormalizer.Normalize", Excep);
        }
        finally {
            _oDCNCMapping = null;
        }
    }

    this.NormalizeList = function (DCNCMappingLst) {
        try {
            OneViewConsole.Debug("NormalizeList start", "DCNCMappingNormalizer.NormalizeList");
            OneViewConsole.DataLog("DCNCMappingLst : " + JSON.stringify(DCNCMappingLst), "DCNCMappingNormalizer.NormalizeList");

            var DCNCMappingList = new Array();
            for (var i = 0; i < DCNCMappingLst.length; i++) {
             
                var DCNCMappingobj = MyInstance.Normalize(DCNCMappingLst[i]);
                DCNCMappingList[i] = DCNCMappingobj;
            }
            OneViewConsole.Debug("NormalizeList end", "DCNCMappingNormalizer.NormalizeList");

            return DCNCMappingList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DCNCMappingNormalizer.NormalizeList", Excep);
        }
        finally {
            DCNCMappingList = null;
            DCNCMappingobj = null;
        }
    }
}

// Action normalizer
function MultiMediaSubElementsNormalizer() {

    // ActionNormalizer object
    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    this.Normalize = function (MultiMediaSubElementobj) {
        try {
            OneViewConsole.Debug("Normalize start", "MultiMediaSubElementsNormalizer.Normalize");
            OneViewConsole.DataLog("MultiMediaSubElementobj : " + JSON.stringify(MultiMediaSubElementobj), "DCNCMappingNormalizer.Normalize");

            var _oMultiMediaSubElements = new MultiMediaSubElements();

            _oMultiMediaSubElements.ServerId = MultiMediaSubElementobj.ServerId;

            _oMultiMediaSubElements.ClientGuid = MultiMediaSubElementobj.ClientGuid;
            _oMultiMediaSubElements.MobileVersionId = 1;
            _oMultiMediaSubElements.OVGuid = MultiMediaSubElementobj.OVGuid;
            _oMultiMediaSubElements.ServiceId = MultiMediaSubElementobj.ServiceId;

            _oMultiMediaSubElements.MappedEntityClientGuid = MultiMediaSubElementobj.MappedEntityClientGuid;
            _oMultiMediaSubElements.Dimension = MultiMediaSubElementobj.Dimension;
            _oMultiMediaSubElements.MultiMediaType = MultiMediaSubElementobj.MultiMediaType;            
            _oMultiMediaSubElements.RemoteURL = MultiMediaSubElementobj.RemoteURL;
            _oMultiMediaSubElements.Comments = MultiMediaSubElementobj.Comments;

            _oMultiMediaSubElements.CreatedDate = MultiMediaSubElementobj.CreatedDate;
            _oMultiMediaSubElements.LastsyncDate = CurrentDateAndTime;
            _oMultiMediaSubElements.IsSynchronized = true;

            _oMultiMediaSubElements.IsMultiMediaSynchronized = false;
            _oMultiMediaSubElements.MultiMediaSyncDate = "";
            _oMultiMediaSubElements.LocalURL = "";

            _oMultiMediaSubElements.Latitude = (MultiMediaSubElementobj.Latitude != undefined) ? MultiMediaSubElementobj.Latitude : "";
            _oMultiMediaSubElements.Longitude = (MultiMediaSubElementobj.Longitude != undefined) ? MultiMediaSubElementobj.Longitude : "";
           
            _oMultiMediaSubElements.IsDisabled = false;

            OneViewConsole.Debug("Normalize end", "MultiMediaSubElementsNormalizer.Normalize");

            return _oMultiMediaSubElements;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "MultiMediaSubElementsNormalizer.Normalize", Excep);
        }
        finally {
            _oDCNCMapping = null;
        }
    }

    this.NormalizeList = function (MultiMediaSubElementsLst) {
        try {
            OneViewConsole.Debug("NormalizeList start", "MultiMediaSubElementsNormalizer.NormalizeList");
            OneViewConsole.DataLog("MultiMediaSubElementsLst : " + JSON.stringify(MultiMediaSubElementsLst), "MultiMediaSubElementsNormalizer.NormalizeList");

            var MultiMediaSubElementsList = new Array();
            for (var i = 0; i < MultiMediaSubElementsLst.length; i++) {

                var MultiMediaSubElementobj = MyInstance.Normalize(MultiMediaSubElementsLst[i]);
                MultiMediaSubElementsList[i] = MultiMediaSubElementobj;
            }
            OneViewConsole.Debug("NormalizeList end", "MultiMediaSubElementsNormalizer.NormalizeList");

            return MultiMediaSubElementsList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "MultiMediaSubElementsNormalizer.NormalizeList", Excep);
        }
        finally {
            MultiMediaSubElementsList = null;
            MultiMediaSubElementobj = null;
        }
    }
}

//ActionManualFollowUpInfo Normalizer
function ActionManualFollowUpInfoNormalizer() {

    // ActionManualFollowUpInfoNormalizer object
    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();
    
    /// <summary>
    /// DTO to ActionManualFollowUpEntity conversion
    /// </summary>
    /// <param name="ActionManualFollowUpInfoDTO">ActionManualFollowUpInfo DTO (DTO from server)</param>
    /// <returns>ActionManualFollowUpEntity (Mobile entity format)</returns>
    this.Normalize = function (ActionManualFollowUpInfoDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "ActionManualFollowUpInfoNormalizer.Normalize");
           
            var _oActionManualFollowUpEntity = new ActionManualFollowUpEntity();

            _oActionManualFollowUpEntity.Code = ActionManualFollowUpInfoDTO.Code;
            _oActionManualFollowUpEntity.Type = ActionManualFollowUpInfoDTO.Type;

            _oActionManualFollowUpEntity.ServiceId = ActionManualFollowUpInfoDTO.ServiceId;
            _oActionManualFollowUpEntity.ServerId = ActionManualFollowUpInfoDTO.ServerId;
            _oActionManualFollowUpEntity.ClientGuid = ActionManualFollowUpInfoDTO.ClientGuid;
            _oActionManualFollowUpEntity.OVGuid = 1;

            _oActionManualFollowUpEntity.ActionClientGuid = ActionManualFollowUpInfoDTO.ActionClientGuid;
            _oActionManualFollowUpEntity.IsAllActions = ActionManualFollowUpInfoDTO.IsAllActions;
            _oActionManualFollowUpEntity.ActionDetailsClientGuid = ActionManualFollowUpInfoDTO.ActionDetailsClientGuid;

            _oActionManualFollowUpEntity.FollowUpUserId = ActionManualFollowUpInfoDTO.FollowUpUserId;
            _oActionManualFollowUpEntity.FollowUpUserName = ActionManualFollowUpInfoDTO.FollowUpUserName;

            _oActionManualFollowUpEntity.FollowUpUserEmailIds = ActionManualFollowUpInfoDTO.FollowUpUserEmailIds;
            _oActionManualFollowUpEntity.FollowUpUserPhoneNumber = ActionManualFollowUpInfoDTO.FollowUpUserPhoneNumber;

            _oActionManualFollowUpEntity.SLA = ActionManualFollowUpInfoDTO.SLA;
            _oActionManualFollowUpEntity.SLAMode = ActionManualFollowUpInfoDTO.SLAMode;
            _oActionManualFollowUpEntity.ExecutionPriority = ActionManualFollowUpInfoDTO.ExecutionPriority;
            _oActionManualFollowUpEntity.IsResolveAnyTime = ActionManualFollowUpInfoDTO.IsResolveAnyTime;
            _oActionManualFollowUpEntity.SLAStartDate = ActionManualFollowUpInfoDTO.SLAStartDate;
            _oActionManualFollowUpEntity.SLAEndDate = ActionManualFollowUpInfoDTO.SLAEndDate;
            _oActionManualFollowUpEntity.IsSLADateWise = ActionManualFollowUpInfoDTO.IsSLADateWise;

            _oActionManualFollowUpEntity.Comments = ActionManualFollowUpInfoDTO.Comments;
            _oActionManualFollowUpEntity.IsSynchronized = 'true';

            _oActionManualFollowUpEntity.IsDisable = ActionManualFollowUpInfoDTO.IsDisable;
            _oActionManualFollowUpEntity.DisableDate = ActionManualFollowUpInfoDTO.DisableDate;

            _oActionManualFollowUpEntity.CreatedUserId = ActionManualFollowUpInfoDTO.CreatedUserId;
            _oActionManualFollowUpEntity.CreatedDate = ActionManualFollowUpInfoDTO.CreatedDate;

            _oActionManualFollowUpEntity.LastUpdatedUserId = ActionManualFollowUpInfoDTO.LastUpdatedUserId;
            _oActionManualFollowUpEntity.LastsyncDate = CurrentDateAndTime;
            _oActionManualFollowUpEntity.TimeStamp = CurrentDateAndTime;

            return _oActionManualFollowUpEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "ActionManualFollowUpInfoNormalizer.Normalize", Excep);
        }
    }


    /// <summary>
    /// DTO list to ActionManualFollowUpInfo list conversion
    /// </summary>
    /// <param name="ActionManualFollowUpInfoDTOList">ActionManualFollowUpInfo list dto (DTO from server)</param>
    /// <returns>ActionManualFollowUpInfo list (Mobile entity format)</returns>
    this.NormalizeList = function (ActionManualFollowUpInfoDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "ActionManualFollowUpInfoNormalizer.NormalizeList");
            
            var ActionManualFollowUpInfoList = new Array();
            for (var i = 0; i < ActionManualFollowUpInfoDTOList.length; i++) {
                ActionManualFollowUpInfoList[i] = MyInstance.Normalize(ActionManualFollowUpInfoDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "ActionManualFollowUpInfoNormalizer.NormalizeList");

            return ActionManualFollowUpInfoList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "ActionManualFollowUpInfoNormalizer.NormalizeList", Excep);
        }
    }
}
