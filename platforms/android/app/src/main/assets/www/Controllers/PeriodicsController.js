

////////////////**************** ExpressController START *******************//////////////////////////////


var oScope = null;
var oXlatService = null;
var oCompile = null;
var oSnapRemote = null;
var olocation = null;
var PlatformPeriodicsGraphSearchTime = 0000; // Millie seconds
var PeriodicTotalNoOfLevels = 0;
////////////////**************** PeriodicsController START *******************//////////////////////////////

MyApp.controller("PlatformPeriodicsController", function ($scope, $location, xlatService, $compile, snapRemote) {

  
    var TemplateGroupId = $location.search().TemplateGroupId;
    var TemplateGroupType = $location.search().TemplateGroupType;

    //Todo(09-03-2018 , By Sangeeta Bhatt) :  for urgent release and router issue TemplateGroupId hard code if not receiving from router
    if (TemplateGroupId == undefined) {
        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        if (ServiceId == 17) {
            TemplateGroupId = 2;
        }
        else if (ServiceId == 7) {
            TemplateGroupId = 338;
        }
        else if (ServiceId == 28) {
            TemplateGroupId = 3;
        }
    }
  
  
    var oPlatformPeriodicsFacade = new PlatformPeriodicsFacade({ 'scope': $scope, 'location': $location, 'xlatService': xlatService, 'compile': $compile, 'TemplateGroupId': TemplateGroupId, 'snapRemote': snapRemote });
    oPlatformPeriodicsFacade.Init();
    oPlatformPeriodicsFacade.PageLoad();
    

    LoadSubGroup = function (TemplateNodeId, Index) {
        oPlatformPeriodicsFacade.LoadSubGroup(TemplateNodeId, Index);
    }

    $scope.Back = function (Position) {
        oPlatformPeriodicsFacade.Back(Position);
    }

    $scope.Save = function (Position) {
        oPlatformPeriodicsFacade.Save(Position);
    }

    $scope.SaveDraft = function (Position) {
        oPlatformPeriodicsFacade.SaveDraft(Position);
    }

    $scope.Submit = function (Position) {
        oPlatformPeriodicsFacade.Submit(Position);
    }

    $scope.AddCustomAction = function (CustomAction, RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeIds, TemplateNodeId) {
        oPlatformPeriodicsFacade.AddCustomAction(CustomAction, RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeIds, TemplateNodeId);
    }

    $scope.DeleteCustomAction = function (CustomAction, TemplateNodeId) {
        oPlatformPeriodicsFacade.DeleteCustomAction(CustomAction, TemplateNodeId);
    }

    $scope.AttachPictureToAction = function (RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeId) {
        oPlatformPeriodicsFacade.AttachPictureToAction(RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeId);
    }

    $scope.CloseRightPanel = function () {
        oPlatformPeriodicsFacade.CloseRightPanel();
    }

    snapRemote.getSnapper().then(function (snapper) {
        snapper.on('close', function () {
            oPlatformPeriodicsFacade.SnapRemoteClose();
        });
    });

    var lastTimeOutId = null;
    $scope.GraphSearch = function () {        
        if (lastTimeOutId != null)
            window.clearTimeout(lastTimeOutId);
        lastTimeOutId = window.setTimeout(oPlatformPeriodicsFacade.GraphSearch, PlatformPeriodicsGraphSearchTime);
    }

    $scope.$on('$destroy', function () {
        oPlatformPeriodicsFacade.Destroy();
    });

});

////////////////**************** PeriodicsController END *******************//////////////////////////////






////////////////**************** PlatformPeriodicsFacade START *******************//////////////////////////////


function PlatformPeriodicsFacade(param) {

    var scope = param.scope;
    var location = param.location;
    var xlatService = param.xlatService;
    var compile = param.compile;
    var snapRemote = param.snapRemote;
    var MyInstance = this;
    var TemplateGroupId = param.TemplateGroupId;
    PeriodicMainTemplateGroupId = TemplateGroupId;
    var oPeriodicalWorkComponent = new PeriodicalWorkComponent(xlatService);
    var oDOM = new DOM();
    
    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "PlatformPeriodicsFacade.Init");

            oScope = scope;
            oXlatService = xlatService;
            oCompile = compile;
            oSnapRemote = snapRemote;
            olocation = location;

            scope.periodicsGraphSearchElement = "";
            OneViewSessionStorage.Save("CurrentShiftId", 0);
            OneViewSessionStorage.Save("CurrentShiftName", "");
            oScope.ShowBackDiv = false;
            oScope.ShowFooterDiv = false;
            scope.ShowSearchDiv = false;
            PlatformPeriodicCurrentSubGroupId = TemplateGroupId;
            PlatformPeriodicHierarchyBreadCrumbs.push(TemplateGroupId);

            OneViewConsole.Debug("Init End", "PlatformPeriodicsFacade.Init");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.Init", xlatService);
        }
    }

    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad Start", "PlatformPeriodicsFacade.PageLoad");

            //alert('PeriodicMainTemplateGroupId : ' + PeriodicMainTemplateGroupId);
            oPeriodicalWorkComponent.LoadDcPeriodicDiaplayMetaData(PeriodicMainTemplateGroupId);
            PeriodicTotalNoOfLevels = oPeriodicalWorkComponent.GetTotalNumOfLevels(PeriodicMainTemplateGroupId);
            // var res = oPeriodicalWorkComponent.LoadValidTemplates($location.search().TemplateGroupId);
            var _oPeriodicHierarchyComponent = new PeriodicHierarchyComponent();
            PeriodicHierarchy = _oPeriodicHierarchyComponent.GetFormattedTemplateNodes(TemplateGroupId);
            
            oPeriodicalWorkComponent.FormHTML(PeriodicHierarchy.TemplateConfigMetaDataDetails.Childs);
       
            oPeriodicalWorkComponent.LoadButtonBar();
            OneViewConsole.Debug("PageLoad End", "PlatformPeriodicsFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.PageLoad", xlatService);
        }
    }

    this.LoadSubGroup = function (TemplateNodeId, Index) {
        try {
            OneViewConsole.Debug("LoadSubGroup Start", "PlatformPeriodicsFacade.LoadSubGroup");

            PlatformPeriodicHierarchyBreadCrumbs.push(TemplateNodeId);
            oPeriodicalWorkComponent.UpdateIndex(Index);
            var IsShowBackButton = oPeriodicalWorkComponent.ShowBackButton();            
            oPeriodicalWorkComponent.LoadSubGroup(TemplateNodeId, IsShowBackButton, Index);
            
            OneViewConsole.Debug("LoadSubGroup End", "PlatformPeriodicsFacade.LoadSubGroup");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.LoadSubGroup", xlatService);
        }
    }

    this.SaveDraft = function (Position) {
        try {
            OneViewConsole.Debug("Save Start", "PlatformPeriodicsFacade.Save");

            var Event = oPeriodicalWorkComponent.GetDcPeriodicDisplayEvent(Position);

            if (Event == "") {
                Save(true);
            }
            else {
                alert('Event = ' + Event + ' Not implemented ');
            }
            OneViewConsole.Debug("Save End", "PlatformPeriodicsFacade.Save");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.Save", xlatService);
        }
    }

    this.Save = function (Position) {
        try {
            OneViewConsole.Debug("Save Start", "PlatformPeriodicsFacade.Save");

            var Event = oPeriodicalWorkComponent.GetDcPeriodicDisplayEvent(Position);

            if (Event == "") {
                Save(false);
            }
            else {
                alert('Event = ' + Event + ' Not implemented ');
            }

            //var IsShowBackButton = oPeriodicalWorkComponent.ShowBackButton();
            //oPeriodicalWorkComponent.LoadSubGroup(PlatformPeriodicCurrentSubGroupId, IsShowBackButton);

           //oPeriodicalWorkComponent.DisableTemplate(PlatformPeriodicCurrentSubGroupId);

            OneViewConsole.Debug("Save End", "PlatformPeriodicsFacade.Save");
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.Save", xlatService);
        }
    }

    var Save = function (IsSaveDraft) {
        try {
            OneViewConsole.Debug("Save Start", "PlatformPeriodicsFacade.Save");

            oSetDefaultSpinner.Start();

            var Response = oPeriodicalWorkComponent.SaveTemplateWise('SaveValidationMetaData', IsSaveDraft);
            if (Response.IsSuccess == true) {
                if (Response.NumOfRecordsSaved == 0) {
                    alert(xlatService.xlat('No records to save'));
                }
                else {
                    alert(xlatService.xlat(Response.NumOfRecordsSaved) + " " + xlatService.xlat('Records Saved Successfully'));
                }
            }
            else {
                if (Response.NumOfRecordsSaved == 0) {
                    alert(xlatService.xlat('No records to save'));
                }
                else {
                    alert(xlatService.xlat('Please enter ') + Response.Message);
                }
            }

          

            if (IsSaveDraft == false) {
               
                if (Response.IsSuccess == true) {
                    if (Response.IsTotalSuccess == true) {
                        var res = MyInstance.GoBack();

                        if (res.IsGoBack == true) {
                            MyInstance.Back(res.Position);
                        }
                        else {
                            var IsShowBackButton = oPeriodicalWorkComponent.ShowBackButton();
                            oPeriodicalWorkComponent.LoadSubGroup(PlatformPeriodicCurrentSubGroupId, IsShowBackButton);

                        }
                    }
                    else {
                        // oPeriodicalWorkComponent.DisableTemplate(PlatformPeriodicCurrentSubGroupId);
                        var IsShowBackButton = oPeriodicalWorkComponent.ShowBackButton();
                        oPeriodicalWorkComponent.LoadSubGroup(PlatformPeriodicCurrentSubGroupId, IsShowBackButton);

                        //if (Response.Message != '') {
                        //    alert(Response.Message);
                        //}
                    }
                }
            }

            oSetDefaultSpinner.Stop();
            OneViewConsole.Debug("Save End", "PlatformPeriodicsFacade.Save");
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            throw Excep;
        }
    }



    this.Submit = function (Position) {
        try {
            OneViewConsole.Debug("Submit Start", "PlatformPeriodicsFacade.Submit");

            oSetDefaultSpinner.Start();
            var Event = oPeriodicalWorkComponent.GetDcPeriodicDisplayEvent(Position);
            var Response;
            if (Event == "") {            

                Response = oPeriodicalWorkComponent.SaveTemplateWise('SubmitValidationMetaData');
                if (Response.IsSuccess == true) {
                    if (Response.NumOfRecordsSaved == 0) {
                        alert(xlatService.xlat('No records to save'));
                    }
                    else {
                        alert(xlatService.xlat(Response.NumOfRecordsSaved) + " " + xlatService.xlat('Records Submit Successfully'));
                    }
                }
                else {
                    //if (Response.NumOfRecordsSaved == 0) {
                    //    alert(xlatService.xlat('No records to save'));
                    //}
                    //else {
                        alert(xlatService.xlat('Please enter ') + Response.Message);
                    //}
                }

              
            }
            else {
                alert('Event = ' + Event + ' Not implemented ');
            }
            
            
            if (Response.IsSuccess == true) {
                if (Response.IsTotalSuccess == true) {
                    var res = MyInstance.GoBack();

                    if (res.IsGoBack == true) {
                        MyInstance.Back(res.Position);
                    }
                    else {
                        var IsShowBackButton = oPeriodicalWorkComponent.ShowBackButton();
                        oPeriodicalWorkComponent.LoadSubGroup(PlatformPeriodicCurrentSubGroupId, IsShowBackButton);

                    }
                }
                else {
                    //   oPeriodicalWorkComponent.DisableTemplate(PlatformPeriodicCurrentSubGroupId);
                    var IsShowBackButton = oPeriodicalWorkComponent.ShowBackButton();
                    oPeriodicalWorkComponent.LoadSubGroup(PlatformPeriodicCurrentSubGroupId, IsShowBackButton);


                    //if (Response.Message != '') {
                    //    alert(Response.Message);
                    //}
                }
            }

            oSetDefaultSpinner.Stop();
            OneViewConsole.Debug("Submit End", "PlatformPeriodicsFacade.Submit");

        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.Submit", xlatService);
        }
    }

    this.Back = function (Position) {
        try {
            OneViewConsole.Debug("Back Start", "PlatformPeriodicsFacade.Back");

            oSetDefaultSpinner.Start();

            var Event = oPeriodicalWorkComponent.GetDcPeriodicDisplayEvent(Position);
            if (Event == "") {
                if (oPeriodicalWorkComponent.BackValidation() == true) {
                    PlatformPeriodicHierarchyBreadCrumbs.pop();
                    oPeriodicalWorkComponent.UpdateHierachy();
                   
                    var IsShowBackButton = oPeriodicalWorkComponent.ShowBackButton();                
                    PlatformPeriodicCurrentSubGroupId = PlatformPeriodicHierarchyBreadCrumbs[PlatformPeriodicHierarchyBreadCrumbs.length - 1];

                    
                    oPeriodicalWorkComponent.LoadHierarchy(IsShowBackButton, PlatformPeriodicCurrentSubGroupId);
                }
            }
            else {
                alert('Event = ' + Event + ' Not implemented ');
            }

            oSetDefaultSpinner.Stop();
            OneViewConsole.Debug("Back End", "PlatformPeriodicsFacade.Back");

        }
        catch (Excep) {
           // alert("PlatformPeriodicsFacade.Back Excep : " + Excep);
            // alert("PlatformPeriodicsFacade.Back Excep 22 : " + JSON.stringify(Excep));
            oSetDefaultSpinner.Stop();
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.Back", xlatService);
        }
    }


    this.AddCustomAction = function (CustomAction, RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeIds, TemplateNodeId) {
        try {
            OneViewConsole.Debug("AddCustomAction Start", "PlatformPeriodicsFacade.AddCustomAction");
            var IsValid = true;

            if (CustomAction != "" && CustomAction != null && CustomAction != undefined) {

                var _oLVSpecialCharacterValidationComponent = new LVSpecialCharacterValidationComponent();
                CustomAction = _oLVSpecialCharacterValidationComponent.RemoveSpecialCharacters(CustomAction);

                if (CompletePeriodicActionResult[TemplateNodeId] == undefined) {
                    CompletePeriodicActionResult[TemplateNodeId] = {};
                }

                var LVActionResult = CompletePeriodicActionResult[TemplateNodeId];

                if (LVActionResult[RuleId] == undefined) {
                    LVActionResult[RuleId] = {
                        "IsDisable": false,
                        "IsNC": IsNC,
                        "IsObservation": IsObservation,
                        "IsManualRule": IsManualRule,
                        "ActionClientId": "",
                        "ActionClientGuid": "",
                        "DCNCMappingClientId": "",
                        "DNNCMappimgServerId": 0,
                        "TemplateNodeIds": TemplateNodeIds,
                        "Actions": [
                            {
                                "PreDefinedActionId": 0,
                                "Name": CustomAction,
                                "ActionDetailsClientId": "",
                                "IsDisable": false,
                                "ActionType": LVActionType.CustomAction,
                                "ActionDetailsServerId": 0
                            }
                        ],
                        "MultimediaSubElements": []
                    };
                }
                else {
                    var IsExist = false;
                    for (var i = 0; i < LVActionResult[RuleId].Actions.length; i++) {
                        if (LVActionResult[RuleId].Actions[i].Name == CustomAction && LVActionResult[RuleId].Actions[i].IsDisable == false) {
                            IsExist = true;
                            break;
                        }
                    }
                    if (IsExist == false) {
                        LVActionResult[RuleId].Actions.push(
                             {
                                 "PreDefinedActionId": 0,
                                 "Name": CustomAction,
                                 "ActionDetailsClientId": "",
                                 "IsDisable": false,
                                 "ActionType": LVActionType.CustomAction,
                                 "ActionDetailsServerId": 0
                             }
                       );
                        LVActionResult[RuleId].IsDisable = false;
                    }
                    else {
                        IsValid = false;
                        alert(xlatService.xlat("IN-MG-LVI-001 :: The action already exists, Please enter new action"));
                    }
                }

                if (IsValid == true) {
                    scope.CustomActions.push({ "RuleId": RuleId, "label": CustomAction });
                    scope.CustomAction = "";
                }
            }
            else {
                alert(xlatService.xlat("MN-RQ-LVI-002 :: Please enter valid action"));
            }

            //alert(JSON.stringify(LVActionResult[RuleId]));
            //alert(JSON.stringify(LVActionResult));

            OneViewConsole.Debug("AddCustomAction End", "PlatformPeriodicsFacade.AddCustomAction");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.AddCustomAction", xlatService);
        }
    }

    this.DeleteCustomAction = function (CustomAction, TemplateNodeId) {
        try {
            OneViewConsole.Debug("DeleteCustomAction Start", "PlatformPeriodicsFacade.DeleteCustomAction");

            for (var i = 0; i < scope.CustomActions.length; i++) {
                if (scope.CustomActions[i].label == CustomAction.label) {
                    scope.CustomActions.splice(i, 1);
                    break;
                }
            }

            var IsRuleDisabled = true;

            var LVActionResult = CompletePeriodicActionResult[TemplateNodeId];

            //alert(JSON.stringify(LVActionResult[CustomAction.RuleId]));
            //alert(JSON.stringify(LVActionResult));

            for (var i = 0; i < LVActionResult[CustomAction.RuleId].Actions.length; i++) {

                if (LVActionResult[CustomAction.RuleId].Actions[i].Name == CustomAction.label) {

                    if (LVActionResult[CustomAction.RuleId].Actions[i].ActionDetailsClientId == "") { //if (LVIsEdit == false) {                              
                        LVActionResult[CustomAction.RuleId].Actions.splice(i, 1);
                    }
                    else {
                        LVActionResult[CustomAction.RuleId].Actions[i].IsDisable = true;
                    }
                }
                else if (LVActionResult[CustomAction.RuleId].Actions[i].IsDisable == false) {
                    IsRuleDisabled = false;
                }
            }

            if (IsRuleDisabled == true) {
                if (LVActionResult[CustomAction.RuleId].DCNCMappingClientId == "") { //if (LVIsEdit == false) {
                    delete LVActionResult[CustomAction.RuleId];
                }
                else {
                    LVActionResult[CustomAction.RuleId].IsDisable = true;
                    LVActionResult[CustomAction.RuleId].IsNC = false;
                }
                scope.ActionMultiMediaSubElements = [];
            }

            //alert(JSON.stringify(LVActionResult[CustomAction.RuleId]));
            //alert(JSON.stringify(LVActionResult));

            OneViewConsole.Debug("DeleteCustomAction End", "PlatformPeriodicsFacade.DeleteCustomAction");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.DeleteCustomAction", xlatService);
        }
    }

    this.AttachPictureToAction = function (RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeId) {

        try {
            OneViewConsole.Debug("AttachPictureToAction Start", "PlatformPeriodicsFacade.AttachPictureToAction");

            if (IsActionExist(RuleId, TemplateNodeId)) {
                var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
                _oOneViewCordovaCameraPlugin.CaptureImage(function (LocalURL) {
                    var LVActionResult = CompletePeriodicActionResult[TemplateNodeId];
                    var Picture = {
                        "ClientId": '',
                        "ClientGuid": '',
                        "ServerId": 0,
                        "MappedEntityClientGuid": '',
                        "Dimension": DATEntityType.Action,
                        "MultiMediaType": "image/jpg",
                        "LocalURL": LocalURL,
                        "AlternateName": "No Image",
                        "Comments": "",
                        "IsDisabled": false,
                    }
                    LVActionResult[RuleId].MultimediaSubElements.push(Picture);
                    scope.ActionMultiMediaSubElements.push(Picture);
                    scope.$apply();
                });
            }
            else {
                alert(xlatService.xlat("IN-MG-LVI-002 :: Please select/add atleast one action"));
            }

            OneViewConsole.Debug("AttachPictureToAction End", "PlatformPeriodicsFacade.AttachPictureToAction");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.AttachPictureToAction", xlatService);
        }
    }


    var IsActionExist = function (RuleId, TemplateNodeId) {

        try {
            OneViewConsole.Debug("IsActionExist Start", "PlatformPeriodicsFacade.IsActionExist");

            var IsActionExist = false;
            var LVActionResult = CompletePeriodicActionResult[TemplateNodeId];

            if (LVActionResult != undefined) {

                if (LVActionResult[RuleId] != undefined) {
                    for (var i = 0; i < LVActionResult[RuleId].Actions.length; i++) {
                        if (LVActionResult[RuleId].Actions[i].IsDisable == false) {
                            IsActionExist = true;
                            break;
                        }
                    }
                }
            }

            OneViewConsole.Debug("IsActionExist End", "PlatformPeriodicsFacade.IsActionExist");

            return IsActionExist;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.IsActionExist", xlatService);
        }
    }

    this.CloseRightPanel = function () {
        try {
            OneViewConsole.Debug("CloseRightPanel Start", "PlatformPeriodicsFacade.CloseRightPanel");

            var _oOneViewSidePanel = new OneViewSidePanel(oSnapRemote);
            _oOneViewSidePanel.Toggle(oSnapRemote);
            MyInstance.SnapRemoteClose();

            OneViewConsole.Debug("CloseRightPanel End", "PlatformPeriodicsFacade.CloseRightPanel");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.CloseRightPanel", xlatService);
        }
    }

    this.SnapRemoteClose = function () {
        try {
            OneViewConsole.Debug("SnapRemoteClose Start", "PlatformPeriodicsFacade.SnapRemoteClose");

            var _oPeriodicActionNCUIComponent = new PeriodicActionNCUIComponent(oScope, oXlatService, oSnapRemote, oCompile);
            _oPeriodicActionNCUIComponent.SnapRemoteClose();

          
            var res = new PeriodicUIEventJobHandler(CurrentTemplateNodeId, CurrentAttributeId, CurrentControlId).PostControlEventsExecute(false);

            OneViewConsole.Debug("SnapRemoteClose End", "PlatformPeriodicsFacade.SnapRemoteClose");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.SnapRemoteClose", xlatService);
        }
    }

    this.GraphSearch = function () {
        try {
            OneViewConsole.Debug("GraphSearch Start", "ExpressFacade.GraphSearch");

            oPeriodicalWorkComponent.GraphSearch(scope);
            
            OneViewConsole.Debug("GraphSearch End", "ExpressFacade.GraphSearch");
        }
        catch (Excep) {
            //alert('GraphSearch Excep: ' + Excep);
           // alert("PlatformPeriodicsFacade.GraphSearch Excep 22 : " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "ExpressFacade.GraphSearch", xlatService);
        }
    }

    this.GoBack = function () {
        try {
            OneViewConsole.Debug("GoBack Start", "ExpressFacade.GoBack");

            //alert('PeriodicPropertyToAccess : ' + PeriodicPropertyToAccess + ", " +PlatformPeriodicCurrentSubGroupId + ', CompleteDcStatusCountDict : ' + JSON.stringify(CompleteDcStatusCountDict));
           
            var res = { 'IsGoBack': false , 'Position' : null };
            if (PeriodicPropertyToAccess == 'OverAllCompletedDCCount') {
                CompleteDcStatusCountDict = {};
                CompleteDcStatusCountDict = oPeriodicalWorkComponent.GetDcStatusCountByTemplateGroup(PlatformPeriodicCurrentSubGroupId);

                var IsGoBack = true;
                for (var TemplateId in CompleteDcStatusCountDict.TemplateInfo) {
                    if (TemplateId != PlatformPeriodicCurrentSubGroupId) {
                        //alert('PeriodicPropertyToAccess : ' + PeriodicPropertyToAccess + ", " + CompleteDcStatusCountDict[PeriodicPropertyToAccess] + " , " + CompleteDcStatusCountDict.Occurrence);
                        if (CompleteDcStatusCountDict[PeriodicPropertyToAccess] < CompleteDcStatusCountDict.Occurrence) {
                            IsGoBack = false;
                            break;
                        }

                    }

                }

                //alert('IsGoBack : ' + IsGoBack);
                if (IsGoBack == true) { 
                    var p;
                    if (DcPeriodicDisplayMetaData.ButtonBarConfig.Type == "DcPeriodicDefaultButtonBarConfig") {
                        var DcPeriodicOperationConfigDict = DcPeriodicDisplayMetaData.ButtonBarConfig.DcPeriodicOperationConfigDict;

                        for (var Position in DcPeriodicOperationConfigDict) {
                            var Details = DcPeriodicOperationConfigDict[Position];
                            if (Details.Operation == "Back") {
                                p = Position;
                                break;
                            }
                        }
                       
                    }
                    res = { 'IsGoBack': IsGoBack, 'Position': p };
                }
            }

            OneViewConsole.Debug("GoBack End", "ExpressFacade.GoBack");
           // alert('res 22 : ' + JSON.stringify(res));
          
            return res;
        }
        catch (Excep) {
            //alert('GoBack Excep: ' + Excep);
            // alert("PlatformPeriodicsFacade.GoBack Excep 22 : " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "ExpressFacade.GoBack", xlatService);
        }
    }


    this.Destroy = function () {
        try {
            OneViewConsole.Debug("Destroy Start", "PlatformPeriodicsFacade.Destroy");

            BreadCrumbs = [];
            oScope = null;
            PeriodicMainTemplateGroupId = 0;
            CompletePeriodicTemplateResult = {};
            PeriodicHierarchy = {};
            CompletePeriodicAttributeOtherConfigDict = {};
            CompletePeriodicActionNCProfileDict = {};
            CompletePeriodicActionResult = {};
            LVActionResult = {};
            CurrentTemplateNodeId = 0;
            CurrentAttributeId = 0;
            CurrentControlId = "";
            DcPeriodicDisplayMetaData = {};
            CompleteMultiMediaSubElementsAnswerModeDict = {};
            CompleteDcStatusCountDict = {};            
            PeriodicPropertyToAccess = "";
            PTempMData = {};
            PlatformPeriodicCurrentSubGroupId = 0;
            PlatformPeriodicHierarchyBreadCrumbs = [];
            CurrentRuleId = 0;
            PeriodicMandatoryMetadata = {};
            CompletePeriodicTemplateUIEventJobConfigDict = {};
            PeriodicTotalNoOfLevels = 0;
            PeriodicDCBlockerConfigProfile = {};

            OneViewConsole.Debug("Destroy End", "PlatformPeriodicsFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsFacade.Destroy", xlatService);
        }
    }


}



////////////////**************** PlatformPeriodicsFacade END *******************//////////////////////////////



