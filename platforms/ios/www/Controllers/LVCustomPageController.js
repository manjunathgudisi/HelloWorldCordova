

MyApp.controller('LVCustomPageController', function ($scope, xlatService, $location, snapRemote, $compile) {

    var oLVPageComponent = new LVPageComponent($scope, xlatService, $location, snapRemote, $compile);
    oLVPageComponent.Init();

    var oLVCustomPageComponent = new LVCustomPageComponent();
    oLVCustomPageComponent.CreateModelForCustomPage(LVTemplateConfigMetaData.TemplateConfigMetaDataDetails.Childs);

    oLVCustomPageComponent.PageLoad();

    oLVPageComponent.PageLoad(false);

    $scope.Save = function () {
        oLVPageComponent.Save();
        oLVCustomPageComponent.ClearControls();
    }

    $scope.UpdateAnswerModel = function (TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode, SelectionType, Value) {
        oLVCustomPageComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode, SelectionType, Value);
    }

    $scope.Back = function () {
        oLVPageComponent.Back();
    }

    $scope.ViewRecords = function () {
        oLVPageComponent.ViewRecords();
    }

    $scope.PredefinedActionChanged = function (Action) {
        oLVPageComponent.PredefinedActionChanged(Action);
    }

    $scope.CloseRightPanel = function () {
        oLVPageComponent.CloseRightPanel();
    }

    $scope.RightPanelSave = function () {
        oLVPageComponent.RightPanelSave();
    }

    $scope.UpdateRightPanelComments = function (CommentsRightPanel) {
        oLVPageComponent.UpdateRightPanelComments(CommentsRightPanel);
    }

    $scope.RightPanelTabClick = function (HeaderId) {
        oLVCustomPageComponent.RightPanelTabClick(HeaderId);
    }

    $scope.ClearComments = function () {
        $scope.CommentsRightPanel = "";
    }

    OpenRightPanel = function (TemplateNodeId, FirstControlId, HeaderId) {
        oLVPageComponent.OpenRightPanel(TemplateNodeId, FirstControlId, HeaderId);
    }

    $scope.AddCustomAction = function (CustomAction, RuleId, IsNC, IsObservation, IsManualRule) {
        oLVPageComponent.AddCustomAction(CustomAction, RuleId, IsNC, IsObservation, IsManualRule);
    }

    $scope.DeleteCustomAction = function (CustomAction) {
        oLVPageComponent.DeleteCustomAction(CustomAction);
    }

    ShowHelpDocument = function (TemplateNodeId) {
        oLVPageComponent.ShowHelpDocument(TemplateNodeId);
    }

    Action = function (TemplateNodeId) {
        alert("Action : Comming soon ...");
    }

    History = function (TemplateNodeId) {
        alert("History : Comming soon ...");
    }

    More = function (TemplateNodeId) {
        alert("More : Comming soon ...");
    }

    $scope.AttachPictureToAction = function (RuleId, IsNC, IsObservation, IsManualRule) {
        oLVPageComponent.AttachPictureToAction(RuleId, IsNC, IsObservation, IsManualRule);
    }

    $scope.$on('$destroy', function () {
        oLVPageComponent.Destroy();
    });
})

function LVCustomPageComponent() {
    try {
        OneViewConsole.Debug("LVCustomPageComponent Start", "LVCustomPageController.LVCustomPageComponent");
        var _oLVFactory = new LVFactory();
        var MyInstance = this;
        this.LVDefaultTextBoxControlKey = "LVDefaultTextBoxControl";
        this.LVDefaultBandControlKey = "LVDefaultBandControl";

        this.PageLoad = function () {

            try {
                OneViewConsole.Debug("PageLoad Start", "LVCustomPageComponent.PageLoad");

                // Edit
                if (OneViewSessionStorage.Get("DcId") != null) {
                    this.Edit(OneViewSessionStorage.Get("DcId"));
                }
               

                OneViewConsole.Debug("PageLoad End", "LVCustomPageComponent.PageLoad");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "LVCustomPageComponent.PageLoad", xlatService);
            }
        }

        this.CreateModelForCustomPage = function (LVFormattedTemplateMetadata) {
            try {
                OneViewConsole.Debug("LVCustomPageComponent Start", "LVCustomPageComponent.CreateModelForCustomPage");

                //alert("LVFormattedTemplateMetadata "+JSON.stringify(LVFormattedTemplateMetadata))
                if (LVFormattedTemplateMetadata != undefined) {

                    var oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                    for (var i = 0 ; i < LVFormattedTemplateMetadata.length ; i++) {

                        var TemplateNodeId = LVFormattedTemplateMetadata[i].Id;
                        var TemplateNodeName = LVFormattedTemplateMetadata[i].Name;
                        var ControlId = "";

                        var Answer = "";
                        var AnswerValue = "";
                        var AnswerFKType = "";

                        var AnswerDataType = "";
                        var AnswrMode = "";

                        var AnswrModes = LVFormattedTemplateMetadata[i].AnswerModes;
                        for (var j = 0; j < AnswrModes.length; j++) {

                            ControlId = AnswrModes[j].ControlId;
                            AnswerDataType = AnswrModes[j].DataType;
                            AnswrMode = AnswrModes[j].Type;
                            if (AnswrMode == "DCListViewControlConfig") {
                                var _LVDefaultBandControl = new LVDefaultBandControl();
                                _LVDefaultBandControl.ClearAllColors(ControlId);
                            }
                            else {
                                var _LVDefaultTextBoxControl = new LVDefaultTextBoxControl();
                                _LVDefaultTextBoxControl.Clear(TemplateNodeId, ControlId);
                            }
                            oLVDefaultAnswerModeComponent.CreateModel(TemplateNodeId, TemplateNodeName, ControlId, Answer, AnswerValue, AnswerFKType, AnswerDataType, AnswrMode);
                        }


                    }
                }
            }
            catch (Excep) {
                //alert("Excep: " + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "LVCustomPageComponent.CreateModelForCustomPage", xlatService);
            }
            finally {
                oDefaultValidationResponse = null;
            }
        }

        this.ClearControls = function () {
            try {
                OneViewConsole.Debug("ClearControls Start", "LVCustomPageComponent.ClearControls");

                LVTemplateResult = {};
                this.CreateModelForCustomPage(LVTemplateConfigMetaData.TemplateConfigMetaDataDetails.Childs);
                LVIsEdit = false;
            }
            catch (Excep) {
                alert("Excep: " + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("LVFrameWork", "LVCustomPageComponent.ClearControls", Excep);
            }
        }

        this.UpdateAnswerModel = function (TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode, SelectionType, Value) {
            try {
                OneViewConsole.Debug("UpdateAnswerModel Start", "LVCustomPageComponent.UpdateAnswerModel");

                new LVDefaultBandControl().UpdateAnswerModel(TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode, SelectionType, Value);

                LVRightPanelCurrentHeaderId = 2;
                var _ActionNCComponent = new ActionNCComponent();
                _ActionNCComponent.Evaluate(TemplateNodeId, ControlId);
                //var oLVDefaultRightPanelComponent = new LVDefaultRightPanelComponent();
                //oLVDefaultRightPanelComponent.Open(LVRightPanelTab.Action, false);
            }
            catch (Excep) {
                alert("Excep: " + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("UpdateAnswerModel", "LVCustomPageComponent.UpdateAnswerModel", Excep);
            }
        }

        this.RightPanelTabClick = function (HeaderId) {
            try {
                OneViewConsole.Debug("RightPanelTabClick Start", "LVPageComponent.RightPanelTabClick");

                LVRightPanelCurrentHeaderId = HeaderId;

                var _ActionNCComponent = new ActionNCComponent();
                _ActionNCComponent.Evaluate(LVCurrentAttributeId, "");

                OneViewConsole.Debug("RightPanelTabClick End", "LVPageComponent.RightPanelTabClick");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.RightPanelTabClick", xlatService);
            }
        }

        this.Edit = function (DcId, IsLVPageLoad) {

            try {
                OneViewConsole.Debug("Edit Start", "LVCustomPageComponent.Edit");


                var _oLVDataCaptureBO = new LVDataCaptureBO();
                var IsSuccess = _oLVDataCaptureBO.LoadTemplateResult(DcId, OneViewSessionStorage.Get("LoginUserId"), AnswerModeLoadType);
                            
                if (IsSuccess == true) {                 
                    for (var Attribute in LVTemplateResult) {
                      
                        SetCustomPageEditValuesInControls(LVTemplateResult[Attribute]);
                    }
                }
                else {
                    MyInstance.ViewRecords();
                }

                OneViewConsole.Debug("Edit End", "LVCustomPageComponent.Edit");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "LVCustomPageComponent.Edit", xlatService);
            }
        }

        OneViewConsole.Debug("LVCustomPageComponent End", "LVCustomPageController.LVCustomPageComponent");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("LVCustomPageController", "LVCustomPageComponent", Excep);
    }

    var SetCustomPageEditValuesInControls = function (AttributeDetails) {
        try {
            OneViewConsole.Debug("SetCustomPageData Start", "LVCustomPageController.SetCustomPageData");

            var Answers = AttributeDetails.Answers;
            
            if (Answers != undefined) {
                for (var j = 0; j < Answers.length; j++) {
                    if (Answers[j].AnswerMode == "DCListViewControlConfig") {
                        var oLVDefaultBandControl = _oLVFactory.GetBandControl(MyInstance.LVDefaultBandControlKey);
                        oLVDefaultBandControl.SetColor(AttributeDetails.Id, Answers[j].ControlId, Answers[j].Answer);
                    }
                    else {
                        // document.getElementById(Answers[j].ControlId).value = Answers[j].Answer;
                        var _LVDefaultTextBoxControl = _oLVFactory.GetTextBoxControl(MyInstance.LVDefaultTextBoxControlKey);
                        _LVDefaultTextBoxControl.Set(Answers[j].ControlId, Answers[j].Answer);
                    }
                }
            }

            OneViewConsole.Debug("SetCustomPageData End", "LVCustomPageController.SetCustomPageData");
        }
        catch (Excep) {
            alert("Excep " + JSON.stringify(Excep) + Excep);
            throw oOneViewExceptionHandler.Create("BO", "LVCustomPageController.SetCustomPageData", Excep);
        }
    }
}

//*************High Level Design NC****************/
function ActionNCComponent() {
    try {
        OneViewConsole.Debug("ActionNCComponent Start", "LVCustomPageController.ActionNCComponent");
        var MyInstance = this;
        this.AttributeComponentKey = "LVDefaultAttributeComponent";
        this.ActionNCComponentKey = "LVActionNCComponent";
        this.DefaultActionNCRightPanelPresenterKey = "DefaultActionNCRightPanelPresenter";

        var _oLVCustomPageFactory = new LVCustomPageFactory();
        var _oLVFactory = new LVFactory();

        this.Evaluate = function (TemplateNodeId, ControlId) {
            try {

                var _DefaultActionNCRightPanelPresenterKey = _oLVCustomPageFactory.GetDefaultActionNCRightPanelPresenter(MyInstance.DefaultActionNCRightPanelPresenterKey);
              
                if (LVRightPanelCurrentHeaderId == 1) {

                    _DefaultActionNCRightPanelPresenterKey.LoadHtml("");
                    var oAttributeComponent = _oLVFactory.GetAttributeComponent(MyInstance.AttributeComponentKey);
                    LVscope.CommentsRightPanel = oAttributeComponent.GetComments(LVCurrentAttributeId);
                 
                }

                else if (LVRightPanelCurrentHeaderId == 2) {

                    var oActionNCResult = GetActionNCResult(TemplateNodeId);
                    //alert("oActionNCResult " + JSON.stringify(oActionNCResult));

                    if (oActionNCResult.length > 1) {
                        alert("LVActionNCComponent.CheckActionNC for multiple rules : Not implemented exception");
                    }
                    else {
                        if (oActionNCResult[0].IsRuleViolated == true) {

                            if (oActionNCResult[0].IsNC == true && oActionNCResult[0].IsActionEnable == true) {
                                _DefaultActionNCRightPanelPresenterKey.Load(oActionNCResult, TemplateNodeId, ControlId);
                            }
                            else if (oActionNCResult[0].IsNC == true) {

                                alert("SaveToDb Want to implement")
                            }
                            else {
                                alert("Not Implemented")
                            }

                        }
                    }
                }

            }
            catch (Excep) {
                //alert("Excep " + Excep + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("LVFrameWork", "LVCustomPageComponent", Excep);
            }
        }

        this.SaveNC = function () {
        }

        this.UpdateNC = function () {
        }

        this.RemoveNC = function () {
        }

        var GetActionNCResult = function (TemplateNodeId) {

            try {
                OneViewConsole.Debug("GetActionNCResult Start", "LVActionNCComponent.GetActionNCResult");

                var oActionNCConfigList = new Array();

                var AttributeWiseActionNCConfigList = CheckAttributeActionNCConfig(TemplateNodeId);
                var MultipleAttributeActionNCConfigList = CheckMultipleAttributeActionNCConfig(TemplateNodeId);

                if (AttributeWiseActionNCConfigList.length > 0 && MultipleAttributeActionNCConfigList.length == 0) {
                    oActionNCConfigList = AttributeWiseActionNCConfigList;
                }

                else if (AttributeWiseActionNCConfigList.length == 0 && MultipleAttributeActionNCConfigList.length > 0) {
                    oActionNCConfigList = MultipleAttributeActionNCConfigList;
                }

                else if (AttributeWiseActionNCConfigList.length > 0 && MultipleAttributeActionNCConfigList.length > 0) {
                    oActionNCConfigList.concat(AttributeWiseActionNCConfigList, MultipleAttributeActionNCConfigList)
                }

                if (oActionNCConfigList.length > 1) {
                    alert("LVDefaultActionPageComponent.Load actions for multiple rules : Not implemented exception");
                }
                else {
                    GetPredefinedOrFormActionResult(oActionNCConfigList);
                }

                OneViewConsole.Debug("GetActionNCResult End", "LVActionNCComponent.GetActionNCResult");
                //alert("oActionNCConfigList!!!!!!!!!!! " + JSON.stringify(oActionNCConfigList));
                return oActionNCConfigList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVActionNCComponent.GetActionNCResult", Excep);
            }
        }

        var GetPredefinedOrFormActionResult = function (ActionNCResult) {
            try {
                OneViewConsole.Debug("GetPredefinedOrFormActionResult Start", "LVActionNCComponent.GetPredefinedOrFormActionResult");


                var PredefinedActionIds = [];
                var FormActionIds = [];
                var PredefinedActions = [];
                var FormActionActions = [];
                var ActionList = ActionNCResult[0].ActionList;
                if (ActionList != undefined) {
                    for (var i = 0; i < ActionList.length; i++) {
                        if (ActionList[i].ActionConfigDimension == "PredefinedActionConfig") {                            
                            PredefinedActionIds.push(ActionList[i].ActionConfig["PredefinedActionMasterId"]);
                        }
                        else if (ActionList[i].ActionConfigDimension == "FormActionConfig") {
                            FormActionIds.push(ActionList[i].TemplateNodeId);
                        }
                    }

                    if (PredefinedActionIds.length > 0) {                        
                        var _oActionDAO = new ActionDAO();
                        PredefinedActions = _oActionDAO.GetAllByIds(PredefinedActionIds);
                    }
                    else if (FormActionIds.length > 0) {
                        alert('LVDefaultActionPageComponent.Load, ActionConfigDimension == "FormActionConfig" : Not implemented exception');
                    }
                }
                ActionNCResult[0]["PredefinedActions"] = PredefinedActions;
                ActionNCResult[0]["FormActionActions"] = FormActionActions;

                OneViewConsole.Debug("GetPredefinedOrFormActionResult End", "LVActionNCComponent.GetPredefinedOrFormActionResult");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVActionNCComponent.GetPredefinedOrFormActionResult", Excep);
            }
        }

        /// <summary>
        /// Get GetAttributeActionNCConfig
        /// </summary>
        /// <param name="AttributeNodeId">Node id of the attribute</param>   
        /// <returns>ActionNCConfig</returns> 
        var CheckAttributeActionNCConfig = function (TemplateNodeId) {

            try {
                OneViewConsole.Debug("CheckAttributeActionNCConfig Start", "LVActionNCComponent.CheckAttributeActionNCConfig");

                var AttributeWiseActionNCConfigList = ActionNCProfile.AttributeWiseActionNCConfig[TemplateNodeId];

                if (AttributeWiseActionNCConfigList == undefined) {
                    AttributeWiseActionNCConfigList = new Array();
                }
                else {
                    for (var i = 0; i < AttributeWiseActionNCConfigList.length; i++) {
                        AttributeWiseActionNCConfigList[i]['IsRuleViolated'] = ValidateRule(AttributeWiseActionNCConfigList[i].FinalJavaScriptEquation, TemplateNodeId);
                    }
                }

                OneViewConsole.Debug("CheckAttributeActionNCConfig End", "LVActionNCComponent.CheckAttributeActionNCConfig");

                return AttributeWiseActionNCConfigList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVActionNCComponent.CheckAttributeActionNCConfig", Excep);
            }
        }


        /// <summary>
        /// Get NA html
        /// </summary>
        /// <param name="AttributeNodeIds">Node id of the attribute</param>   
        /// <returns>ActionNCConfig</returns> 
        var CheckMultipleAttributeActionNCConfig = function (TemplateNodeId) {

            try {
                OneViewConsole.Debug("CheckMultipleAttributeActionNCConfig Start", "LVActionNCComponent.CheckMultipleAttributeActionNCConfig");

                var MultipleAttributeActionNCConfigList = new Array();
                var MultipleAttributeActionNCConfigDict = ActionNCProfile.MultipleAttributeActionNCConfig;

                var IsSuccess = false;

                for (var irtMultipleAttributeActionNCConfigDict in MultipleAttributeActionNCConfigDict) {

                    var AttributeKeys = irtMultipleAttributeActionNCConfigDict.split(':');

                    for (var i = 0; i < AttributeKeys.length; i++) {
                        if (AttributeKeys[i] == TemplateNodeId) {
                            MultipleAttributeActionNCConfigList = MultipleAttributeActionNCConfigDict[irtMultipleAttributeActionNCConfigDict];
                            if (MultipleAttributeActionNCConfigList == undefined) {
                                MultipleAttributeActionNCConfigList = new Array();
                            }
                            else {
                                for (var i = 0; i < MultipleAttributeActionNCConfigList.length; i++) {
                                    MultipleAttributeActionNCConfigList[i]['IsRuleViolated'] = ValidateRule(MultipleAttributeActionNCConfigList[i].FinalJavaScriptEquation, TemplateNodeId);
                                }
                            }
                            IsSuccess = true;
                            break;
                        }
                    }
                }

                OneViewConsole.Debug("CheckMultipleAttributeActionNCConfig End", "LVActionNCComponent.CheckMultipleAttributeActionNCConfig");

                return MultipleAttributeActionNCConfigList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVActionNCComponent.CheckMultipleAttributeActionNCConfig", Excep);
            }
        }


        /// <summary>
        /// Validate Rule
        /// </summary>
        /// <param name="Rule">Rule</param>   
        /// <returns>true or false</returns> 
        var ValidateRule = function (Rule, TemplateNodeId) {

            try {
                OneViewConsole.Debug("ValidateRule Start", "LVActionNCComponent.ValidateRule");

                var IsSuccess = false;
                var Model = {};
                var oAttribute = LVTemplateResult[TemplateNodeId];

                if (oAttribute != undefined) {

                    for (var i = 0; i < oAttribute.Answers.length; i++) {
                        if (oAttribute.Answers[i].Answer == "") { // Need to change
                            return false;
                        }
                        else {
                            Model[oAttribute.Answers[i].ControlId] = oAttribute.Answers[i].Answer;
                        }
                    }
                    Rule = Rule.replace(/#/g, "'");
                    IsSuccess = eval(Rule);
                }

                OneViewConsole.Debug("ValidateRule End", "LVActionNCComponent.ValidateRule");

                return IsSuccess;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVActionNCComponent.ValidateRule", Excep);
            }
        }



        OneViewConsole.Debug("ActionNCComponent End", "LVCustomPageController.ActionNCComponent");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("LVCustomPageController", "ActionNCComponent", Excep);
    }

}

function DefaultActionNCRightPanelPresenter() {
    try {
        OneViewConsole.Debug("DefaultActionNCRightPanelPresenter Start", "LVCustomPageController.DefaultActionNCRightPanelPresenter");

        var MyInstance = this;
        this.RightPanelContentId = "RightPanelContent";

        this.Load = function (ActionNCConfigLst, TemplateNodeId, ControlId) {
            try {
                OneViewConsole.Debug("Load Start", "DefaultActionNCRightPanelPresenter.Load");

                if (ActionNCConfigLst != undefined && ActionNCConfigLst.length > 0) {
                    if (ActionNCConfigLst.length > 1) {
                        alert("LVDefaultActionPageComponent.Load actions for multiple rules : Not implemented exception");
                    }
                    else {
                        LoadHtml(ActionNCConfigLst)

                        var PredefinedActions = ActionNCConfigLst[0].PredefinedActions;
                        var FormActionActions = ActionNCConfigLst[0].FormActionActions;
                        var IsCustomActionEnabled = ActionNCConfigLst[0].IsCustomActionEnabled;

                        if (PredefinedActions.length > 0) {
                            LoadPredefinedActions(ActionNCConfigLst[0], PredefinedActions, TemplateNodeId, ControlId);
                        }
                        if (FormActionActions.length > 0) {
                            alert("Not Implemented");
                        }
                        if (IsCustomActionEnabled == true) {
                            LoadCustomActions(ActionNCConfigLst[0], TemplateNodeId, ControlId);
                        }
                        LoadActionMultimediaSubElements(ActionNCConfigLst[0], TemplateNodeId, ControlId);

                        var _oOneViewSidePanel = new OneViewSidePanel(LVsnapRemote);
                        _oOneViewSidePanel.Toggle(LVsnapRemote);
                    }
                }

                OneViewConsole.Debug("Load End", "DefaultActionNCRightPanelPresenter.Load");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DefaultActionNCRightPanelPresenter.Load", Excep);
            }
        }

        /// <summary>
        /// LoadPredefinedActions
        /// </summary>
        /// <param name="PredefinedActions">PredefinedActions</param>  
        /// <param name="TemplateNodeId">TemplateNodeId</param>  
        var LoadPredefinedActions = function (oActionNCConfig, PredefinedActions, TemplateNodeId, ControlId) {

            try {
                OneViewConsole.Debug("LoadPredefinedActions Start", "LVActionNCComponent.LoadPredefinedActions");

                var SelectedIds = [];

                if (LVActionResult[oActionNCConfig.RuleId] != undefined) {
                    for (var j = 0; j < LVActionResult[oActionNCConfig.RuleId].Actions.length; j++) {
                        if (LVActionResult[oActionNCConfig.RuleId].Actions[j].IsDisable == false && LVActionResult[oActionNCConfig.RuleId].Actions[j].ActionType == LVActionType.PredefinedAction) {
                            SelectedIds.push(LVActionResult[oActionNCConfig.RuleId].Actions[j].PreDefinedActionId);
                        }
                    }
                }

                for (var i = 0; i < PredefinedActions.length; i++) {

                    LVscope.PredefinedActions.push({
                        'RuleId': oActionNCConfig.RuleId,
                        'IsNC': oActionNCConfig.IsNC,
                        'IsObservation': oActionNCConfig.IsObservation,
                        'IsManualRule': oActionNCConfig.IsManualRule,
                        //'TemplateNodeId': TemplateNodeId,
                        //'ControlId': ControlId,                         
                        'Name': PredefinedActions[i].Name,
                        'selected': (SelectedIds.indexOf(PredefinedActions[i].ServerId) != -1) ? 'selected' : '',
                        'Id': PredefinedActions[i].ServerId
                    });
                }

                OneViewConsole.Debug("LoadPredefinedActions End", "LVActionNCComponent.LoadPredefinedActions");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActionPageComponent.LoadPredefinedActions", Excep);
            }
        }


        /// <summary>
        /// LoadPredefinedActions
        /// </summary>
        /// <param name="PredefinedActions">PredefinedActions</param>  
        /// <param name="TemplateNodeId">TemplateNodeId</param>  
        var LoadCustomActions = function (oActionNCConfig, TemplateNodeId, ControlId) {

            try {
                OneViewConsole.Debug("LoadCustomActions Start", "LVActionNCComponent.LoadCustomActions");

                if (LVActionResult[oActionNCConfig.RuleId] != undefined && LVActionResult[oActionNCConfig.RuleId].IsDisable == false) {
                    for (var i = 0; i < LVActionResult[oActionNCConfig.RuleId].Actions.length; i++) {
                        if (LVActionResult[oActionNCConfig.RuleId].Actions[i].IsDisable == false && LVActionResult[oActionNCConfig.RuleId].Actions[i].ActionType == LVActionType.CustomAction) {
                            LVscope.CustomActions.push({ "RuleId": oActionNCConfig.RuleId, "label": LVActionResult[oActionNCConfig.RuleId].Actions[i].Name });
                        }
                    }
                }

                OneViewConsole.Debug("LoadCustomActions End", "LVActionNCComponent.LoadCustomActions");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActionPageComponent.LoadCustomActions", Excep);
            }
        }


        /// <summary>
        /// LoadActionMultimediaSubElements
        /// </summary>
        /// <param name="oActionNCConfig">oActionNCConfig</param>  
        /// <param name="TemplateNodeId">TemplateNodeId</param> 
        /// <param name="ControlId">ControlId</param> 
        var LoadActionMultimediaSubElements = function (oActionNCConfig, TemplateNodeId, ControlId) {

            try {
                OneViewConsole.Debug("LoadActionMultimediaSubElements Start", "LVActionNCComponent.LoadActionMultimediaSubElements");

                if (LVActionResult[oActionNCConfig.RuleId] != undefined && LVActionResult[oActionNCConfig.RuleId].IsDisable == false) {
                    if (LVIsEdit == true && LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements.length == 0 && LVActionResult[oActionNCConfig.RuleId].ActionClientGuid != "") {
                        var _oActionDAO = new ActionDAO();
                        var MediaSubElements = _oActionDAO.GetAllMultiMediaSubElementsByActionClientGuid(LVActionResult[oActionNCConfig.RuleId].ActionClientGuid);
                        for (j = 0; j < MediaSubElements.length; j++) {
                            var Picture = {
                                "ClientId": MediaSubElements[j].Id,
                                "ClientGuid": MediaSubElements[j].ClientGuid,
                                "ServerId": MediaSubElements[j].ServerId,
                                "MappedEntityClientGuid": MediaSubElements[j].MappedEntityClientGuid,
                                "Dimension": MediaSubElements[j].Dimension,
                                "MultiMediaType": MediaSubElements[j].MultiMediaType,
                                "LocalURL": MediaSubElements[j].LocalURL,
                                "AlternateName": "No Image",
                                "Comments": MediaSubElements[j].Comments,
                                "IsDisabled": (MediaSubElements[j].IsDisabled == 'true') ? true : false,
                            }
                            LVscope.ActionMultiMediaSubElements.push(Picture);
                            LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements.push(Picture);
                        }
                    }
                    else {
                        for (var i = 0; i < LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements.length; i++) {
                            if (LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements[i].IsDisabled == false) {
                                LVscope.ActionMultiMediaSubElements.push(LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements[i]);
                            }
                        }
                    }
                    LVscope.$apply();
                }

                OneViewConsole.Debug("LoadActionMultimediaSubElements End", "LVActionNCComponent.LoadActionMultimediaSubElements");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActionPageComponent.LoadActionMultimediaSubElements", Excep);
            }
        }

        var LoadHeader = function () {
            try {
                OneViewConsole.Debug("LoadHeader Start", "DefaultActionNCRightPanelPresenter.LoadHeader");

                var Html = '<div style="background:#eef3f5; position:relative; height:100%; box-shadow: inset 7px 0 9px -7px rgba(0,0,0,0.7);">' +
                               '<div class="button-bar">' +
                                   '<a class="button" id="Tab_1" ng-click="RightPanelTabClick(' + LVRightPanelTab.Comments + ')">Comments</a>' +
                                   '<a class="button" id="Tab_2" ng-click="RightPanelTabClick(' + LVRightPanelTab.Action + ')">Action</a>' +
                               '</div>' +
                              '<div class="right-panel-content has-footer" style="padding:10px;" id="RightPanelContent">' +
                               '</div>' +
                               '<div class="bar bar-footer no-padding">' +
                                   '<div class="row">' +
                                       '<div class="col"><a class="button button-block button-clear" ng-click="CloseRightPanel()"><i class="icon ion-close-round"></i>Close</a></div>' +
                                       //'<div class="col"><a class="button button-block button-clear" ng-click="RightPanelSave()"><i class="icon ion-close-round"></i>Save</a></div>' +
                                   '</div>' +
                               '</div>' +
                          '</div>';


                var _oOneViewCompiler = new OneViewCompiler();
                _oOneViewCompiler.CompileAndApeend(LVscope, LVcompile, Html, "divAutocomplatePopUp");

                OneViewConsole.Debug("LoadHeader Start", "DefaultActionNCRightPanelPresenter.LoadHeader");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DefaultActionNCRightPanelPresenter.LoadHtml", Excep);
            }
        }

        this.LoadHtml = function (ActionNCConfigList) {

            LoadHtml(ActionNCConfigList);

        }

        var LoadHtml = function (ActionNCConfigList) {
            try {
                OneViewConsole.Debug("LoadHtml Start", "DefaultActionNCRightPanelPresenter.LoadHtml");

                LoadHeader();

                ClearInnerContent(MyInstance.RightPanelContentId);

                var Html = GetHtml(ActionNCConfigList);

                var _oOneViewCompiler = new OneViewCompiler();
                _oOneViewCompiler.CompileAndApeend(LVscope, LVcompile, Html, MyInstance.RightPanelContentId);

                DeActivateAllTabs();
                ActivateCurrentTab(LVRightPanelCurrentHeaderId);

                OneViewConsole.Debug("LoadHtml End", "DefaultActionNCRightPanelPresenter.LoadHtml");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DefaultActionNCRightPanelPresenter.LoadHtml", Excep);
            }
        }

        var ClearInnerContent = function (RightPanelContentId) {
            try {
                OneViewConsole.Debug("ClearInnerContent Start", "LVDefaultRightPanelComponent.ClearInnerContent");

                var _oDOM = new DOM();
                _oDOM.RemoveInnerHtml(RightPanelContentId);

                OneViewConsole.Debug("ClearInnerContent End", "LVDefaultRightPanelComponent.ClearInnerContent");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.CloseRightPanel", Excep);
            }
        }

        var GetHtml = function (ActionNCConfigList) {
            try {
                OneViewConsole.Debug("GetHtml Start", "DefaultActionNCRightPanelPresenter.GetHtml");
              
                var Html = '<div class="right-panel-content has-footer">';
                // Comments Tab Html
                if (LVRightPanelCurrentHeaderId == 1) {
                    Html += '<div class="comment-box">' +
                                '<div class="title-bar"><i class="icon icon-comment-o"></i> Comments</div>' +
                                '<textarea rows="6" ng-model="CommentsRightPanel" ng-change="UpdateRightPanelComments(CommentsRightPanel)"></textarea>' +
                           '</div>' +
                           '<div class="row responsive-sm dc-button-holder"><div class="col no-padding text-right"><a class="button button-calm" ng-click="ClearComments()">Clear</a></div></div>';
                }
                else if (LVRightPanelCurrentHeaderId == 2) {

                    if (ActionNCConfigList.length > 1) {
                        alert("LVDefaultRightPanelComponent.GetHtml actions for multiple rules : Not implemented exception");
                    }
                    else {
                        var PredefinedHtml = '<div class="title-bar"><i class="icon icon-edit"></i> Predefined Actions</div>' +
                               '<div class="action-box">' +
                                 '<div class="actions-list list">' +
                                    '<tick-list multiple="true" selected-icon="ion-checkmark">' +
                                          '<tick-list-item ng-repeat="action in PredefinedActions" selected="{{action.selected}}" selected-icon="{{action.icon}}" model="action" on-change="PredefinedActionChanged(action)">{{action.Name}}</tick-list-item>' +
                                    '</tick-list>' +
                                 '</div>' +
                               '</div>';


                        var CustomHtml = '<div class="title-bar"><i class="icon icon-edit"></i> Custom Actions</div>' +
                              '<div class="cus-action margin-bottom">' +
                                '<div class="actions-list list">' +
                                  '<div class="item item-button-right" ng-repeat="CustomAction in CustomActions">' +
                                       '{{CustomAction.label}}' +
                                       '<a class="button hide" ng-click="DeleteCustomAction(CustomAction)"><i class="icon icon-minus-circle"></i></a>' +
                                  '</div>' +
                                '</div>' +
                                '<div class="item item-input-inset">' +
                                  '<label class="item-input-wrapper"><textarea msd-elastic="/n/n" ng-model="CustomAction"></textarea></label>' +
                                  '<a class="button button-calm" ng-click="AddCustomAction(CustomAction,' + ActionNCConfigList[0].RuleId + ',' + ActionNCConfigList[0].IsNC + ',' + ActionNCConfigList[0].IsObservation + ',' + ActionNCConfigList[0].IsManual + ')">ADD</a>' +
                                '</div>' +
                             '</div>';

                        var MediaHtml = '<div class="title-bar margin-top"><i class="icon icon-photo"></i> Add Media</div>' +
                                        '<a class="button button-block" ng-click="AttachPictureToAction(' + ActionNCConfigList[0].RuleId + ',' + ActionNCConfigList[0].IsNC + ',' + ActionNCConfigList[0].IsObservation + ',' + ActionNCConfigList[0].IsManual + ')"><i class="icon icon-camera"></i> Camera</a>' +
                                        '<div class="cam-photo">' +
                                            '<div ng-repeat="MultiMediaSubElement in ActionMultiMediaSubElements">' +
                                                '<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="1" id="' + ActionNCConfigList[0].RuleId + '"><img src="{{MultiMediaSubElement.LocalURL}}" alt="{{MultiMediaSubElement.AlternateName}}"></a>' +
                                            '</div>' +
                                        '</div>';

                        if (ActionNCConfigList[0].ActionList.length > 0 && ActionNCConfigList[0].IsCustomActionEnabled == true) {
                            Html += PredefinedHtml + CustomHtml;
                        }
                        else if (ActionNCConfigList[0].ActionList.length > 0) {
                            Html += PredefinedHtml;
                        }
                        else if (ActionNCConfigList[0].IsCustomActionEnabled == true) {
                            Html += CustomHtml;
                        }
                        Html += MediaHtml;


                    }
                }
                Html += '</div>';
                //alert(Html);
                OneViewConsole.Debug("GetHtml End", "DefaultActionNCRightPanelPresenter.GetHtml");

                return Html;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.GetHtml", Excep);
            }
        }

        var ActivateCurrentTab = function (HeaderId) {
            try {
                OneViewConsole.Debug("ActivateCurrentTab Start", "DefaultActionNCRightPanelPresenter.ActivateCurrentTab");

                var NCTab = document.getElementById('Tab_' + HeaderId);
                NCTab.className = NCTab.className + " activated";

                OneViewConsole.Debug("ActivateCurrentTab End", "DefaultActionNCRightPanelPresenter.ActivateCurrentTab");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DefaultActionNCRightPanelPresenter.ActivateCurrentTab", Excep);
            }
        }

        var DeActivateAllTabs = function () {
            try {
                OneViewConsole.Debug("DeActivateCurrentTab Start", "LVDefaultRightPanelComponent.DeActivateCurrentTab");

                var RegularExpressionForRemoveClass = new RegExp('(\\s|^)activated(\\s|$)');

                for (var i = 0; i < LVRightPanelTabLength; i++) {
                    var ObservationTab = document.getElementById('Tab_' + (i + 1));
                    ObservationTab.className = ObservationTab.className.replace(RegularExpressionForRemoveClass, ' ');
                }

                OneViewConsole.Debug("DeActivateCurrentTab End", "LVDefaultRightPanelComponent.DeActivateCurrentTab");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.DeActivateCurrentTab", Excep);
            }
        }


        OneViewConsole.Debug("DefaultActionNCRightPanelPresenter End", "LVCustomPageController.DefaultActionNCRightPanelPresenter");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("LVCustomPageController", "DefaultActionNCRightPanelPresenter", Excep);
    }
}

function DCNCActionComponent() {
    try {
        OneViewConsole.Debug("DCNCActionComponent Start", "LVCustomPageController.DCNCActionComponent");

        this.CreateAction = function () {

        }

        this.DeleteAction = function () {

        }

        this.AddPredefinedAction = function (RuleId, PredefinedMasterId, Comment) {

        }

        this.UpdatePredefinedActionComment = function (RuleId, PredefinedMasterId, Comment) {

        }

        this.RemovePredefinedAction = function () {

        }

        this.AddCustomAction = function (RuleId, CustomActionName, Comment) {
        }

        this.RemoveCustomAction = function () {
        }

        this.AddFormAction = function (RuleId, LVTemplateResult, Comment) {

        }

        this.RemoveFormAction = function () {
        }

        OneViewConsole.Debug("DCNCActionComponent End", "LVCustomPageController.DCNCActionComponent");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("LVCustomPageController", "DCNCActionComponent", Excep);
    }
}

function DefaultFormActionNCPresenter() {
    try {
        OneViewConsole.Debug("DefaultFormActionNCPresenter Start", "LVCustomPageController.DefaultFormActionNCPresenter");

        this.Load = function (ActionNCConfigLst, TemplateNodeId, ControlID, TemplateConfigMetaData) {

        }

        OneViewConsole.Debug("DefaultFormActionNCPresenter End", "LVCustomPageController.DefaultFormActionNCPresenter");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("LVCustomPageController", "DefaultFormActionNCPresenter", Excep);
    }
}


// LVCustomPageFactory
function LVCustomPageFactory() {

    /// <summary>
    /// Get ActionNC Component
    /// </summary>
    /// <param name="Type">Factory key</param>    
    /// <returns>object</returns> 
    this.GetActionNCComponent = function (Type) {

        try {
            OneViewConsole.Debug("GetActionNCComponent Start", "LVFactory.GetActionNCComponent");

            switch (Type) {
                case "ActionNCComponent": return new ActionNCComponent();
                default: null;
            }

            OneViewConsole.Debug("GetActionNCComponent End", "LVFactory.GetActionNCComponent");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetActionNCComponent", Excep);
        }
    }

    /// <summary>
    /// Get DCNCAction Component 
    /// </summary>
    /// <param name="Type">Factory key</param>    
    /// <returns>object</returns> 
    this.GetDCNCActionComponent = function (Type) {

        try {
            OneViewConsole.Debug("GetDCNCActionComponent Start", "LVFactory.GetDCNCActionComponent");

            switch (Type) {
                case "DCNCActionComponent": return new DCNCActionComponent();
                default: null;
            }

            OneViewConsole.Debug("GetDCNCActionComponent End", "LVFactory.GetDCNCActionComponent");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetDCNCActionComponent", Excep);
        }
    }

    /// <summary>
    /// Get DefaultActionNCRightPanelPresenter  
    /// </summary>
    /// <param name="Type">Factory key</param>    
    /// <returns>object</returns> 
    this.GetDefaultActionNCRightPanelPresenter = function (Type) {

        try {
            OneViewConsole.Debug("GetDefaultActionNCRightPanelPresenter Start", "LVFactory.GetDefaultActionNCRightPanelPresenter");

            switch (Type) {
                case "DefaultActionNCRightPanelPresenter": return new DefaultActionNCRightPanelPresenter();
                default: null;
            }

            OneViewConsole.Debug("GetDefaultActionNCRightPanelPresenter End", "LVFactory.GetDefaultActionNCRightPanelPresenter");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetDefaultActionNCRightPanelPresenter", Excep);
        }
    }

    /// <summary>
    /// Get DefaultFormActionNCPresenter
    /// </summary>
    /// <param name="Type">Factory key</param>    
    /// <returns>object</returns> 
    this.GetDefaultFormActionNCPresenter = function (Type) {

        try {
            OneViewConsole.Debug("GetDefaultFormActionNCPresenter Start", "LVFactory.GetDefaultFormActionNCPresenter");

            switch (Type) {
                case "DefaultFormActionNCPresenter": return new DefaultFormActionNCPresenter();
                default: null;
            }

            OneViewConsole.Debug("GetDefaultFormActionNCPresenter End", "LVFactory.GetDefaultFormActionNCPresenter");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetDefaultFormActionNCPresenter", Excep);
        }
    }

}




