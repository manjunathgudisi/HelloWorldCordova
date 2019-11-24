
function Tesco17_ActionNCUIComponent($scope, xlatService, snapRemote, $compile) {

    var MyInstance = this;

    var ActionNCConfigList = [];

    this.Excecute = function (Value, TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid) {
        try {
            OneViewConsole.Debug("Excecute Start", "ActionNCUIComponent_Tesco_17.Excecute");

            CurrentTemplateNodeId = TemplateNodeId;
            CurrentAttributeId = AttributeId;
            CurrentControlId = ControlId;

            ActionNCConfigList = [
              {
                  TemplateNodeIds: "," + AttributeId + ",",
                  RuleId: TemplateNodeId,
                  IsNC: true,
                  IsObservation: false,
                  IsManual: true,
                  IsCustomActionEnabled: true
              },
            ];

            if (Value == "INCOMPLETE") {
                Load(TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid);
            }
            else {
                UpdateModel(TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid);
                MyInstance.DeleteRule(TemplateNodeId);
            }

            OneViewConsole.Debug("Excecute End", "ActionNCUIComponent_Tesco_17.Excecute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionNCUIComponent_Tesco_17.Excecute", Excep);
        }
    }

    var Load = function (TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid) {
        try {
            OneViewConsole.Debug("Load Start", "ActionNCUIComponent_Tesco_17.Load");

            $scope.CustomAction = "";
            $scope.CustomActions = [];
            $scope.ActionMultiMediaSubElements = [];

            UpdateModel(TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid);
            LoadCustomActions(ActionNCConfigList[0], TemplateNodeId);
            LoadActionMultimediaSubElements(ActionNCConfigList[0], TemplateNodeId);

            var _oOneViewSidePanel = new OneViewSidePanel(snapRemote);
            _oOneViewSidePanel.Clear();

            var Html = '<div class="bar bar-header no-padding">' +
                               '<div class="button-bar my-audit">' +
                                    '<a class="button button-clear"><i class="icon icon-edit"></i> {{"Action" | xlat}}</a>' +
                               '</div>' +
                           '</div>' +
                           '<div class="scroll-content has-header has-footer action" style="background: #eef3f5;">' +
                               '<div class="full-height scrollable" id="RightPanelContent">' +
                                    GetHtml(TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid) +
                               '</div>' +
                            '</div>' +
                            '<div class="bar bar-footer no-padding">' +
                                '<div class="row">' +
                                    '<div class="col"><a class="button button-block button-clear" ng-click="CloseRightPanel()"><i class="icon icon-cancel-circle"></i> {{"Close" | xlat}}</a></div>' +
                                '</div>' +
                            '</div>';

            var _oOneViewCompiler = new OneViewCompiler();
            _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "divAutocomplatePopUp");

            _oOneViewSidePanel.Toggle(snapRemote);

            OneViewConsole.Debug("Load End", "ActionNCUIComponent_Tesco_17.Load");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionNCUIComponent_Tesco_17.Load", Excep);
        }
    }

    var UpdateModel = function (TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid) {
        try {
            OneViewConsole.Debug("Load Start", "ActionNCUIComponent_Tesco_17.UpdateModel");

            if (CompleteLVActionResult_Tesco_17[TemplateNodeId] == undefined) {

                CompleteLVActionResult_Tesco_17[TemplateNodeId] = {}            
                var LVActionResult = CompleteLVActionResult_Tesco_17[TemplateNodeId];
                
                var _oActionDAO = new ActionDAO();
                var ActionDCNCMappings = _oActionDAO.GetAllActionsByDataCaptureClientGuidAndRuleId(DataCaptureClientGuid, TemplateNodeId);

                //alert(JSON.stringify(ActionDCNCMappings));

                for (var i = 0; i < ActionDCNCMappings.length; i++) {

                    if (ActionDCNCMappings[i] != undefined) {
                        if (LVActionResult[ActionDCNCMappings[i].RuleId] != undefined) {
                            LVActionResult[ActionDCNCMappings[i].RuleId].Actions.push({
                                "PreDefinedActionId": (ActionDCNCMappings[i].CustomAction != "") ? 0 : ActionDCNCMappings[i].PreDefinedActionId,
                                "Name": ActionDCNCMappings[i].CustomAction,
                                "ActionDetailsClientId": ActionDCNCMappings[i].ActionDetailsClientId,
                                "IsDisable": false,
                                "ActionType": (ActionDCNCMappings[i].CustomAction != "") ? LVActionType.CustomAction : LVActionType.PredefinedAction,
                                "ActionDetailsServerId": ActionDCNCMappings[i].ActionDetailsServerId,
                            });
                        }
                        else {
                            LVActionResult[ActionDCNCMappings[i].RuleId] = {
                                "IsDisable": false,
                                "IsNC": (ActionDCNCMappings[i].IsNC == "true") ? true : false,
                                "IsObservation": (ActionDCNCMappings[i].IsObservation == "true") ? true : false,
                                "IsManualRule": (ActionDCNCMappings[i].IsManualRule == "true") ? true : false,
                                "ActionClientId": ActionDCNCMappings[i].ActionClientId,
                                "ActionClientGuid": ActionDCNCMappings[i].ActionClientGuid,
                                "DCNCMappingClientId": ActionDCNCMappings[i].DCNCMappingClientId,
                                "DNNCMappimgServerId": ActionDCNCMappings[i].DNNCMappimgServerId,
                                "TemplateNodeIds": ActionDCNCMappings[i].TemplateNodeIds,
                                "Actions": [
                                    {
                                        "PreDefinedActionId": (ActionDCNCMappings[i].CustomAction != "") ? 0 : ActionDCNCMappings[i].PreDefinedActionId,
                                        "Name": ActionDCNCMappings[i].CustomAction,
                                        "ActionDetailsClientId": ActionDCNCMappings[i].ActionDetailsClientId,
                                        "IsDisable": false,
                                        "ActionType": (ActionDCNCMappings[i].CustomAction != "") ? LVActionType.CustomAction : LVActionType.PredefinedAction,
                                        "ActionDetailsServerId": ActionDCNCMappings[i].ActionDetailsServerId,
                                    }
                                ],
                                "MultimediaSubElements": []
                            };
                        }
                    }
                }
            }

            OneViewConsole.Debug("Load End", "ActionNCUIComponent_Tesco_17.UpdateModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionNCUIComponent_Tesco_17.UpdateModel", Excep);
        }
    }

    var LoadCustomActions = function (oActionNCConfig, TemplateNodeId) {

        try {
            OneViewConsole.Debug("LoadCustomActions Start", "Tesco17_ActionNCUIComponent.LoadCustomActions");

            var LVActionResult = CompleteLVActionResult_Tesco_17[TemplateNodeId];
            
            if (LVActionResult != undefined) {

                if (LVActionResult[oActionNCConfig.RuleId] != undefined && LVActionResult[oActionNCConfig.RuleId].IsDisable == false) {
                    for (var i = 0; i < LVActionResult[oActionNCConfig.RuleId].Actions.length; i++) {
                        if (LVActionResult[oActionNCConfig.RuleId].Actions[i].IsDisable == false && LVActionResult[oActionNCConfig.RuleId].Actions[i].ActionType == LVActionType.CustomAction) {
                            $scope.CustomActions.push({ "RuleId": oActionNCConfig.RuleId, "label": LVActionResult[oActionNCConfig.RuleId].Actions[i].Name });
                        }
                    }
                }
            }

            OneViewConsole.Debug("LoadCustomActions End", "Tesco17_ActionNCUIComponent.LoadCustomActions");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "Tesco17_ActionNCUIComponent.LoadCustomActions", Excep);
        }
    }

    var LoadActionMultimediaSubElements = function (oActionNCConfig, TemplateNodeId) {

        try {
            OneViewConsole.Debug("LoadActionMultimediaSubElements Start", "Tesco17_ActionNCUIComponent.LoadActionMultimediaSubElements");

            var LVActionResult = CompleteLVActionResult_Tesco_17[TemplateNodeId];

            if (LVActionResult != undefined) {

                if (LVActionResult[oActionNCConfig.RuleId] != undefined && LVActionResult[oActionNCConfig.RuleId].IsDisable == false) {
                    if (LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements.length == 0 && LVActionResult[oActionNCConfig.RuleId].ActionClientGuid != "") {
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
                            $scope.ActionMultiMediaSubElements.push(Picture);
                            LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements.push(Picture);
                        }
                    }
                    else {
                        for (var i = 0; i < LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements.length; i++) {
                            if (LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements[i].IsDisabled == false) {
                                $scope.ActionMultiMediaSubElements.push(LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements[i]);
                            }
                        }
                    }
                    $scope.$apply();
                }
            }

            OneViewConsole.Debug("LoadActionMultimediaSubElements End", "Tesco17_ActionNCUIComponent.LoadActionMultimediaSubElements");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "Tesco17_ActionNCUIComponent.LoadActionMultimediaSubElements", Excep);
        }
    }

    var GetHtml = function (TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid) {
        try {
            OneViewConsole.Debug("GetHtml Start", "ActionNCUIComponent_Tesco_17.GetHtml");

            var Html = '';

            var TemplateNodeIds = "'" + ActionNCConfigList[0].TemplateNodeIds + "'";

            var CustomHtml = '<div class="list">' +
                               '<div class="item item-divider item-icon-left">' +
                                   '<i class="icon icon-edit"></i> {{"Custom Actions" | xlat}}' +
                               '</div>' +
                               '<div class="item no-padding">' +
                                   '<div class="cus-action">' +
                                     '<div class="list no-margin">' +
                                       '<div class="item item-button-right" ng-repeat="CustomAction in CustomActions" style="text-overflow: inherit;white-space: normal;overflow: inherit;">' +
                                         '{{CustomAction.label}}' +
                                         '<a class="button button-clear hide" ng-click="DeleteCustomAction(CustomAction,' + TemplateNodeId + ')"><i class="icon icon-minus-circle"></i></a>' +
                                       '</div>' +
                                     '</div>' +
                                     '<div class="item item-input-inset">' +
                                       '<label class="item-input-wrapper"><textarea msd-elastic="/n/n" ng-model="CustomAction"></textarea></label>' +
                                       '<a class="button button-calm" ng-click="AddCustomAction(CustomAction,' + ActionNCConfigList[0].RuleId + ',' + ActionNCConfigList[0].IsNC + ',' + ActionNCConfigList[0].IsObservation + ',' + ActionNCConfigList[0].IsManual + ',' + TemplateNodeIds + ',' + TemplateNodeId + ')"><i class="icon icon-plus"></i> {{"Add" | xlat}}</a>' +
                                     '</div>' +
                                   '</div>' +
                               '</div>' +
                             '</div>';

            var MediaHtml = '<div class="list">' +
                                '<div class="item item-divider item-icon-left">' +
                                    '<i class="icon icon-photo"></i> {{"Add Media" | xlat}}' +
                                '</div>' +
                                '<div class="item">' +
                                    '<a class="button button-block button-calm no-margin" ng-click="AttachPictureToAction(' + ActionNCConfigList[0].RuleId + ',' + ActionNCConfigList[0].IsNC + ',' + ActionNCConfigList[0].IsObservation + ',' + ActionNCConfigList[0].IsManual + ',' + TemplateNodeId + ')"><i class="icon icon-camera"></i> {{"Camera" | xlat}}</a>' +
                                    '<div class="cam-photo">' +
                                        '<div ng-repeat="MultiMediaSubElement in ActionMultiMediaSubElements">' +
                                            '<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="' + Math.random() + '" id="' + ActionNCConfigList[0].RuleId + '"><img src="{{MultiMediaSubElement.LocalURL}}" alt="{{MultiMediaSubElement.AlternateName}}"></a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

           
            if (ActionNCConfigList[0].IsCustomActionEnabled == true) {
                Html += CustomHtml;
            }
            Html += MediaHtml;
            //alert(Html);

            OneViewConsole.Debug("GetHtml End", "ActionNCUIComponent_Tesco_17.GetHtml");
                
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionNCUIComponent_Tesco_17.GetHtml", Excep);
        }
    }

    this.DeleteRule = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("DeleteRule Start", "ActionNCUIComponent_Tesco_17.DeleteRule");

            var LVActionResult = CompleteLVActionResult_Tesco_17[TemplateNodeId];

            if (LVActionResult != undefined) {

                if (LVActionResult[TemplateNodeId] != undefined) {
                    if (LVActionResult[TemplateNodeId].DCNCMappingClientId == "") {
                        delete LVActionResult[TemplateNodeId];
                    }
                    else {
                        LVActionResult[TemplateNodeId].IsDisable = true;
                        LVActionResult[TemplateNodeId].IsNC = false;
                        for (var k = 0; k < LVActionResult[TemplateNodeId].Actions.length; k++) {
                            LVActionResult[TemplateNodeId].Actions[k].IsDisable = true;
                        }
                    }
                }
            }

            OneViewConsole.Debug("DeleteRule End", "ActionNCUIComponent_Tesco_17.DeleteRule");
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("Framework", "ActionNCUIComponent_Tesco_17.DeleteRule", Excep);
        }
    }

    this.SnapRemoteClose = function () {
        try {
            OneViewConsole.Debug("SnapRemoteClose Start", "ActionNCUIComponent_Tesco_17.SnapRemoteClose");
          
            var LVActionResult = CompleteLVActionResult_Tesco_17[CurrentTemplateNodeId];

            if (LVActionResult != undefined) {
             
                var ActionResult = LVActionResult[CurrentTemplateNodeId];
                
                if (ActionResult != undefined) {

                    var IsActionAvailable = false;

                    if (ActionResult.IsDisable == false) {

                        for (var j = 0; j < ActionResult.Actions.length; j++) {

                            if (ActionResult.Actions[j].IsDisable == false) {

                                IsActionAvailable = true;
                                break;
                            }
                        }
                    }

                    if (IsActionAvailable == false) {
                        if (CompleteLVTemplateResult[CurrentTemplateNodeId] != undefined) {                            
                            MyInstance.ClearRAGBand(CurrentTemplateNodeId, CurrentAttributeId);
                        }
                    }
                }
                else {
                    if (CompleteLVTemplateResult[CurrentTemplateNodeId] != undefined) {                       
                        MyInstance.ClearRAGBand(CurrentTemplateNodeId, CurrentAttributeId);
                    }
                }
            }

            OneViewConsole.Debug("SnapRemoteClose End", "ActionNCUIComponent_Tesco_17.SnapRemoteClose");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionNCUIComponent_Tesco_17.SnapRemoteClose", Excep);
        }
    }

    this.ClearRAGBand = function (TemplateNodeId, AttributeId) {
        try {
            var ControlId = 'BandControlId_' + AttributeId;
            var LVTemplateResult = CompleteLVTemplateResult[TemplateNodeId].LVTemplateResult;

            //TODO:check old value and new value
            CompleteLVTemplateResult[TemplateNodeId].IsUpdated = true;


            //Band make it null
            LVTemplateResult[AttributeId].Answers[0].Answer = '';

            //Band Answer value make it null
            LVTemplateResult[AttributeId].Answers[0].AnswerValue = '';

            //If any blocker make it false
            CompleteLVTemplateResult[TemplateNodeId].IsBlocker = false;

            //IsCompleted make it false
            CompleteLVTemplateResult[TemplateNodeId].IsCompleted = false;

            //IsCompleted make it false
            CompleteLVTemplateResult[TemplateNodeId].IsSubmit = false;


            //Clear Controls
            //Clear band Controls
            var RBand = document.getElementById("R_" + ControlId);
            if (RBand != null) {
                RBand.style.backgroundColor = "";
                RBand.style.color = "black";
            }

            var ABand = document.getElementById("A_" + ControlId);
            if (ABand != null) {                
                ABand.style.backgroundColor = "";
                ABand.style.color = "black";
            }

            var GBand = document.getElementById("G_" + ControlId);
            if (GBand != null) {                
                GBand.style.backgroundColor = "";
                GBand.style.color = "black";
            }

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ExpressComponent.ClearRAGBand", Excep);
        }
    }
}