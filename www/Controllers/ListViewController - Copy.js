
        var LVPaginationSize = 50;
        var LVLastScrollTop = 0;
        var LVPageNumber = 1;
        var LVPageHeight = 0;

        var LVTemplateNodesLength = 0;
       
        var LVParentAttributeGroupId = 0;
        var LVCurrentAttributeGroupId = 0;
        var LVCurrentAttributeId = 0;
        var LVCurrentControlId = "";
        var LVCurrentDCBlockerTemplateId = 0;
        
        var LVBandDetailsCacheDict = {};
        var LVBreadCrumbDetails = [];
        var LVVisitedNodes = [];
        var LVTemplateResult = {};
        var LVActionResult = {};
        var LVDCBlockerTemplateResult = {};
        var LVDCBlockerTemplateResultDict = {};
        var LVFormatedDCBlockerTemplateMetadata = {};
        var LVIsTemplateHeaderEnable = false;
        var LVIsTemplateFooterEnable = false;
        var LVAttributeGroupSummaryDisplayConfig = null;

        var LVBreadCrumbId = "BreadCrumb";
        var LVPageContentId = "Attributes";

        var LVDataCaptureId = 0;
        var LVDcResultsId = 0;
        var LVDataCaptureClientGuid = "";
        var LVDcResultsClientGuid = "";

        var LVDefaultValueConfigMetaData = null;
        var LVHistoryConfigMetaData = null;
        var LVNAConfigMetaData = null;
        var LVHelpDocumentConfigMetaData = null;
        var LVUserWiseLastDC = null;
        var LVDcPlaceWiseLastDC = null;
        var LVIsOnlineSave = false;
        var LVIsEdit = false;

        var LVxlatService = null;

        var LVAttributeDCHistoryMetadata = null;

        var LVDcStartDate = "";
        var LVDcEndDate = "";

        var LVsnapRemote = null;
        var LVscope = null;
        var LVcompile = null;
        var LVlocation = null;
        var LVtimeout = null;

        var AnswerModeLoadType = 1; // 1-> Last Updated Answer, 2-> Login User Answer, 3-> Most Common Answer
        var LVSavePreEventHandler = null;
        var LVSavePostEventHandler = null;
        
        var LVRightPanelTab = { "Comments": 1, "Action": 2 };        
        var LVRightPanelTabLength = 2;

        var LVRightPanelCurrentHeaderId = 0; // 1-> Comments, 2-> Action


        var LVTemplateConfigMetaData = null;
        var LVFormattedTemplateMetadata = null;
        var LVTemplateUIEventJobConfigMetaData = null;
        var LVTemplateMandatoryValidationMetaData = null;

        var LVIsScoringLogicEnabled = false;
        var LVScoringLogicType = 0;  // 1-> Default
        var ActionNCProfile = null;

        var LVPreviousPageId = 1; // 1-> New Dc Page, 2-> View Records Page
        var LVActionType = { "CustomAction": 1, "PredefinedAction": 2, "FormAction": 3 };
        var LVMultiMediaDeleteEventHandler = null;

        var LVAnswerModeComponent = null;
        var LVAsyncTimeOut = 1000;
        var LVLastTimeOutId = null;

        var LVDCSummary = {
            "CommentsInfo" : {
                "Comments": "",
                "IsModified": false
            }
        }

        var LVDcReStartDate = "";
        var LVDcStopDate = "";

        var CompleteMultiMediaSubElementsAnswerModeDict = {};
        // ListViewController
        MyApp.controller('ListViewController', function ($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

            var oLVPageComponent = new LVPageComponent($scope, xlatService, $location, snapRemote, $compile, $timeout);
            oLVPageComponent.Init();
            oLVPageComponent.PageLoad();

            $scope.Save = function () {
                oLVPageComponent.Save();
            }

            $scope.Approve = function () {
                oLVPageComponent.Approve();
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
                oLVPageComponent.RightPanelTabClick(HeaderId);
            }

            $scope.ClearComments = function () {                
                oLVPageComponent.ClearComments();
            }

            OpenRightPanel = function (TemplateNodeId, FirstControlId, HeaderId) {
                oLVPageComponent.OpenRightPanel(TemplateNodeId, FirstControlId, HeaderId);
            }

            $scope.AddCustomAction = function (CustomAction, RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeIds) {
                oLVPageComponent.AddCustomAction(CustomAction, RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeIds);
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

            $rootScope.AddDcComments = function () {
                try{                  
                    var DcComments = "";
                    var _oDcComments = document.getElementById('DcComments');
                    if (_oDcComments != null) {
                        DcComments = _oDcComments.value;
                        var _oLVSpecialCharacterValidationComponent = new LVSpecialCharacterValidationComponent();
                        DcComments = _oLVSpecialCharacterValidationComponent.RemoveSpecialCharacters(DcComments);
                    }
                   
                    LVDCSummary.CommentsInfo.Comments = DcComments;
                    LVDCSummary.CommentsInfo.IsModified = true;
                    $rootScope.PopCommentBox = false;
                }
                catch (Exception) {
                }
            }

            $rootScope.ClearDcComments = function () {
                try{
                    var _oDcComments = document.getElementById('DcComments');
                    if (_oDcComments != null) {
                        _oDcComments.value = "";
                    }
                    LVDCSummary.CommentsInfo.Comments = "";
                    LVDCSummary.CommentsInfo.IsModified = true;                    
                }
                catch (Exception) {
                }
            }

            $scope.PopCommentBoxShow = function () {
                try {
                    var DcComments = "";
                    var _oDcComments = document.getElementById('DcComments');
                    if (_oDcComments != null) {
                        _oDcComments.value = LVDCSummary.CommentsInfo.Comments;
                    }                   
                    $rootScope.PopCommentBox = true;
                }
                catch (Exception) {                   
                }
            }

            $rootScope.PopCommentBoxHide = function () {
                $rootScope.PopCommentBox = false;
            }

            $scope.SaveShift = function (selectedShift) {
                oLVPageComponent.SaveShift(selectedShift);
            }

            LoadDCBlockerTemplate = function (TemplateNodeId, ControlId, AttributeName, DOMObj) {                
                var _oLVDCBlockerPageComponent = new LVDCBlockerPageComponent();
                _oLVDCBlockerPageComponent.Load(TemplateNodeId, ControlId, AttributeName, DOMObj);
            }

            $scope.$on('$destroy', function () {
                oLVPageComponent.Destroy();
            });

            snapRemote.getSnapper().then(function (snapper) {
                snapper.on('close', function () {
                    oLVPageComponent.SnapRemoteClose();
                });
            });

        })    

        // LVPageComponent
        function LVPageComponent($scope, xlatService, $location, snapRemote, $compile, $timeout) {

            var MyInstance = this;
            
            this.AttributeGroupComponentKey = "LVDefaultAttributeGroupComponent";
            this.AttributeComponentKey = "LVDefaultAttributeComponent";
            this.NAComponentKey = "LVDefaultNAComponent";
            this.AnswerModeComponentKey = "LVDefaultAnswerModeComponent";
            this.DefaultValueComponentKey = "LVDefaultDefaultValueComponent";
            this.BreadCrumbComponentKey = "LVDefaultBreadCrumbComponent";
            this.HistoryComponentKey = "LVHistoryComponent";
            this.RightPanelComponentKey = "LVDefaultRightPanelComponent";
            this.DefaultJavaScriptAlert = "DefaultJavaScriptAlert";
            this.DefaultNativeToast = "DefaultNativeToast";
            this.LVDefaultNotificationComponentKey = "LVDefaultNotificationComponent";
            this.ActionNCComponentKey = "LVActionNCComponent";

            var oLVFactory = new LVFactory();
            var oNotificationComponent = oLVFactory.GetNotificationComponent(this.LVDefaultNotificationComponentKey);

            this.Init = function () {

                try {
                    OneViewConsole.Debug("Init Start", "LVPageComponent.Init");

                  if(OneViewSessionStorage.Get("ServiceId") == 13){
                        LVRightPanelTab = "";
                        LVRightPanelTab = { "Comments": 1, "Action": 2, "ActionInfo": 3 };
                        LVRightPanelTabLength = 3;
                  }
 				// Todo(Added by Sangeeta Bhatt(19-05-2017) : Need to change, temporarily enabled for Elcita Services for different predefined action loading)
                  else if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 18 && OneViewSessionStorage.Get("TemplateId") == 625) {
                      LVRightPanelTab = "";
                      LVRightPanelTab = { "Comments": 1, "Action": 2, "ActionInfo": 3 };
                      LVRightPanelTabLength = 3;
                  }
                   

                    // Registering page name for globalization
                    //xlatService.setCurrentPage('LVContent_Page');
                   // document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle_' + OneViewSessionStorage.Get("TemplateId"));
                    var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
                    xlatService.setCurrentPage(currentPage, true);
                    document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');


                    LVxlatService = xlatService;
                    LoadTemplateOtherConfigMetaData();

                    LVsnapRemote = snapRemote;
                    LVscope = $scope;
                    LVcompile = $compile;
                    LVlocation = $location;
                    LVtimeout = $timeout;

                    $scope.PredefinedActions = [];
                    $scope.CustomActions = [];
                    $scope.ActionMultiMediaSubElements = [];
                    $scope.ShiftOptions = [];
                    $scope.MultiMediaSubElementsAnswerModeList = [];

                    // Need to replace with new feature (Risk master and Rco master need to support as band data source config)
                    if (OneViewSessionStorage.Get("ServiceId") == 1) {
                        LVBandDetailsCacheDict[20] = [
                            { 'Id': 1, 'Name': "High", "Value": 0, 'Sequence': 1, 'ColourCode': '#ff0000' },
                            { 'Id': 2, 'Name': "Medium", "Value": 1, 'Sequence': 2, 'ColourCode': 'orange' },
                            { 'Id': 3, 'Name': "Low", "Value": 2, 'Sequence': 3, 'ColourCode': '#00ff00' }
                        ];
                        LVBandDetailsCacheDict[1000] = [
                            { 'Id': 3, 'Name': "EKFC 1", "Value": 0, 'Sequence': 1, 'ColourCode': '#00ff00' },
                            { 'Id': 4, 'Name': "EKFC 2", "Value": 1, 'Sequence': 2, 'ColourCode': '#00ff00' }
                        ]
                    }

                    //Dc start date
                    if (IsNewDcPageDcStartDateSelectionEnabled == true) {
                        LVDcStartDate = OneViewSessionStorage.Get("DcStartDate");                       
                    }
                    else {
                        LVDcStartDate = new DateTime().GetDateAndTime();
                    }

                    
                    //LVTemplateConfigMetaData = LVTemplateMetaData[OneViewSessionStorage.Get("ServiceId")][OneViewSessionStorage.Get("TemplateId")];                 
                    LoadTemplateConfigMetaData();

                    if (LVTemplateConfigMetaData != null && LVTemplateConfigMetaData != undefined) {
                        LVIsScoringLogicEnabled = (LVTemplateConfigMetaData.IsScoringLogicEnabled != undefined) ? LVTemplateConfigMetaData.IsScoringLogicEnabled : false;
                        LVScoringLogicType = (LVTemplateConfigMetaData.ScoringLogicType != undefined) ? LVTemplateConfigMetaData.ScoringLogicType : 0;

                        LVAttributeGroupSummaryDisplayConfig =
                            (LVTemplateConfigMetaData.AttributeGroupSummaryDisplayConfig != undefined && LVTemplateConfigMetaData.AttributeGroupSummaryDisplayConfig != "")
                            ? JSON.parse(LVTemplateConfigMetaData.AttributeGroupSummaryDisplayConfig)
                            : {
                                IsScoreValueEnabed: true,
                                IsScorePercentageEnabed: true,
                                IsESTEnabed: true,
                                IsAttributeCountEnabed: true,
                                IsNcCountEnabed: true,
                                IsActionCountEnabed: true,
                            };

                        LVFormattedTemplateMetadata = new LVTemplateMetadataFormatterComponent().Format(LVTemplateConfigMetaData.TemplateConfigMetaDataDetails);
                    }                   

                    //ActionNCProfile = LVActionNCProfile[OneViewSessionStorage.Get("ServiceId")][OneViewSessionStorage.Get("TemplateId")];
                    LoadActionNCMetaData();

                    if (OneViewSessionStorage.Get("ServiceId") == 1 && OneViewSessionStorage.Get("TemplateId") == 6252) {
                        if (TemplateUIEventJobMetaData[OneViewSessionStorage.Get("ServiceId")] != undefined && TemplateUIEventJobMetaData[OneViewSessionStorage.Get("ServiceId")][OneViewSessionStorage.Get("TemplateId")] != undefined) {
                            LVTemplateUIEventJobConfigMetaData = TemplateUIEventJobMetaData[OneViewSessionStorage.Get("ServiceId")][OneViewSessionStorage.Get("TemplateId")];                            
                        }
                    }
                    else {
                        LoadTemplateUIEventJobMetaData();
                    }

                    LoadTemplateMandatoryValidationMetaData();
                    
                    LoadRightPanel();

                   // SetCurrentShift();

                    var _oLVShiftHandler = new LVShiftHandler();
                    _oLVShiftHandler.LoadShift($scope);

                    $scope.LVFooterPanel = true;

                    // Setting approval button ui status base on approval profile
                    SetApprovalButtonUIStatus();

                    LVMultiMediaDeleteEventHandler = oLVFactory.GetActionNCComponent(this.ActionNCComponentKey).MultiMediaDeleteEventHandler;
                    LVAnswerModeComponent = new LVDefaultAnswerModeComponent();

                    //intialize Dcstart time whenever datacapture starting
                    LVDcReStartDate = new DateTime().GetDateAndTime();

                    OneViewConsole.Debug("Init End", "LVPageComponent.Init");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.Init", xlatService);
                }
            }

            this.PageLoad = function () {

                try {
                    OneViewConsole.Debug("PageLoad Start", "LVPageComponent.PageLoad");

                    // Edit
                    if (OneViewSessionStorage.Get("DcId") != null) {
                        this.Edit(OneViewSessionStorage.Get("DcId"));
                    }
                    // New DC
                    else {

                        if (LVTemplateConfigMetaData != null && LVTemplateConfigMetaData != undefined) {

                            this.RenderPage(1);
                            this.RenderPage(2);

                            var _oLVFactory = new LVFactory();
                            var oBreadCrumbComponent = _oLVFactory.GetBreadCrumbComponent(this.BreadCrumbComponentKey);
                            oBreadCrumbComponent.UpdateUI(OneViewSessionStorage.Get("TemplateName"), LVBreadCrumbId);

                            var _oLVTemplateHeaderComponent = new LVTemplateHeaderComponent();
                            _oLVTemplateHeaderComponent.Update();
                        }
                    }

                    OneViewConsole.Debug("PageLoad End", "LVPageComponent.PageLoad");
                }
                catch (Excep) {                    
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.PageLoad", xlatService);
                }
            }

            this.Destroy = function () {

                try {
                    OneViewConsole.Debug("Destroy Start", "LVPageComponent.Destroy");

                    LVPaginationSize = 50;
                    LVLastScrollTop = 0;
                    LVPageNumber = 1;
                    LVPageHeight = 0;

                    LVTemplateNodesLength = 0;

                    LVParentAttributeGroupId = 0;
                    LVCurrentAttributeGroupId = 0;
                    LVCurrentAttributeId = 0;
                    LVCurrentControlId = "";
                    LVCurrentDCBlockerTemplateId = 0;

                    LVBandDetailsCacheDict = {};
                    LVBreadCrumbDetails = [];
                    LVVisitedNodes = [];
                    LVTemplateResult = {};
                    LVActionResult = {};
                    LVDCBlockerTemplateResult = {};
                    LVFormatedDCBlockerTemplateMetadata = {};
                    LVAttributeGroupSummaryDisplayConfig = null;

                    LVDataCaptureId = 0;
                    LVDcResultsId = 0;
                    LVDataCaptureClientGuid = "";
                    LVDcResultsClientGuid = "";

                    LVDefaultValueConfigMetaData = null;
                    LVIsOnlineSave = false;
                    LVIsEdit = false;

                    LVxlatService = null;

                    LVDcStartDate = "";
                    LVDcEndDate = "";

                    LVsnapRemote = null;
                    LVscope = null;
                    LVcompile = null;
                    LVlocation = null;
                    LVtimeout - null;

                    AnswerModeLoadType = 1;
                    LVSavePreEventHandler = null;
                    LVSavePostEventHandler = null;

                    LVRightPanelCurrentHeaderId = 0;
                    LVRightPanelTabLength = 2;

                    LVTemplateConfigMetaData = null;
                    LVFormattedTemplateMetadata = null;
                    LVTemplateUIEventJobConfigMetaData = null;
                    LVTemplateMandatoryValidationMetaData = null;

                    ActionNCProfile = null;
                    LVPreviousPageId = 1;

                    LVMultiMediaDeleteEventHandler = null;
                    LVAnswerModeComponent = null;

                    LVAsyncTimeOut = 1000;
                    LVLastTimeOutId = null;

                    LVDCSummary = {
                        "CommentsInfo": {
                            "Comments": "",
                            "IsModified": false
                        }
                    }

                    var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
                    xlatService.RemoveCurrentPageMetadata(currentPage);

                    //Todo :(06-03-2017) Sangeeta Bhatt , added for custom default value for QaaS. Have to remove later
                    QaaS_LastDcValue_DcResultDetails = null;
                    OneViewConsole.Debug("Destroy End", "LVPageComponent.Destroy");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.PageLoad", xlatService);
                }
            }

            this.Approve = function () {

                try {
                    OneViewConsole.Debug("Approve Start", "LVPageComponent.Approve");

                    if (LVDataCaptureClientGuid == "") {
                        alert("Please complete the Data Capture to Finalize");
                    }

                    else if (LVDataCaptureClientGuid != "" && OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == "true") {
                        
                        var ApprovalProfileReq = {
                            ServiceId: OneViewSessionStorage.Get("ServiceId"),
                            UserId: OneViewSessionStorage.Get("LoginUserId"),
                            TemplateNodeId: OneViewSessionStorage.Get("TemplateId"),
                            PlaceId: OneViewSessionStorage.Get("DcPlaceId"),
                            DcPlaceDimension: 16,
                            DCPlaceRCOType: -1,
                            DCPlaceKeyElementIsGroup: false,
                            TemplateKeyElementIsGroup: false,
                            DcClientGuidLst: [],
                        }

                        ApprovalProfileReq.DcClientGuidLst.push(LVDataCaptureClientGuid);

                        var _oDcApprovalBO = new DcApprovalBO();
                        var ApprovalInfoResponse = _oDcApprovalBO.GetApprovalInfo(ApprovalProfileReq);

                        if (ApprovalInfoResponse.length == 0) {

                            alert("Approval profile not available");
                        }
                        else if (ApprovalInfoResponse.length == 1) {

                            DcOnDeviceApprovalInfoLst = ApprovalInfoResponse;
                            // $location.url('/my-approval');

                            var Level = oPageNavigationFramework.GetApprovalLevelKey(ApprovalInfoResponse);
                            var OperationKey = oPageNavigationFramework.GetOperationKey("Approve", Level);
                            oPageNavigationFramework.RedirectByPreference(OperationKey, $location, xlatService, $scope);                           
                        }
                        else {
                            alert("Conflicted data captures found. Please contact administrator");
                        }
                    }
                    else {
                        alert("Please complete the data capture and approve");
                    }
                                       
                    OneViewConsole.Debug("Approve End", "LVPageComponent.Approve");
                }
                catch (Excep) {                    
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.Approve", xlatService);
                }
            }

            var SetApprovalButtonUIStatus = function () {

                try {
                    OneViewConsole.Debug("SetApprovalButtonUIStatus Start", "LVPageComponent.SetApprovalButtonUIStatus");

                    var ApprovalProfileReq = {
                        ServiceId: OneViewSessionStorage.Get("ServiceId"),
                        UserId: OneViewSessionStorage.Get("LoginUserId"),
                        TemplateNodeId: OneViewSessionStorage.Get("TemplateId"),
                        PlaceId: OneViewSessionStorage.Get("DcPlaceId"),
                        DcPlaceDimension: 16,
                        DCPlaceRCOType: -1,
                        DCPlaceKeyElementIsGroup: false,
                        TemplateKeyElementIsGroup: false,
                        DcClientGuidLst: [],
                    }

                    var _oDcApprovalProfileDAO = new DcApprovalProfileDAO();
                    var ApprovalProfile = _oDcApprovalProfileDAO.GetByAllDimensions(ApprovalProfileReq);

                    if (ApprovalProfile.length == 0) {
                        $scope.DivApproveBtn = false;
                    }
                    else {
                        $scope.DivApproveBtn = true;
                    }

                    OneViewConsole.Debug("SetApprovalButtonUIStatus End", "LVPageComponent.SetApprovalButtonUIStatus");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.SetApprovalButtonUIStatus", xlatService);
                }
            }

            this.Save = function (IsGoBack) {

                try {
                    OneViewConsole.Debug("Save Start", "LVPageComponent.Save");
                   
                    var IsPreEventSuccess = true;
                    LVDcStopDate = new DateTime().GetDateAndTime();

                    if (LVSavePreEventHandler != null) {
                        IsPreEventSuccess = LVSavePreEventHandler();
                    }

                    var IsSaveSuccess = false;

                    if (IsPreEventSuccess == true) {
                        IsSaveSuccess = Save();
                        if (IsSaveSuccess == true && EnableAutoUpload == true) {                          
                            window.OneViewAutoUpload.Start();
                        }
                    }

                    var IsPostEventSuccess = true;

                    if (IsSaveSuccess == true && LVSavePostEventHandler != null) {
                        IsPostEventSuccess = LVSavePostEventHandler();
                    }

                    if (IsPreEventSuccess == true && IsSaveSuccess == true && IsPostEventSuccess == true && IsGoBack != false) {
                        MyInstance.Back();
                    }

                    LVDcReStartDate = new DateTime().GetDateAndTime();
                    LVDcStopDate = "";
                  
                    OneViewConsole.Debug("Save End", "LVPageComponent.Save");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.Save", xlatService);
                }
            }

            var Save = function () {

                try {
                    OneViewConsole.Debug("Save Start", "LVPageComponent.Save");
  
                    var IsSaveSuccess = false;

                    if (LVIsOnlineSave == false) {
                        var _oLVDataCaptureBO = new LVDataCaptureBO();
                        var _oLVFactory = new LVFactory();
                        var oBreadCrumbComponent = _oLVFactory.GetBreadCrumbComponent(this.BreadCrumbComponentKey);

                        var ValidationResponse = _oLVDataCaptureBO.IsValidationSuccess(LVTemplateResult);
                        //alert(JSON.stringify(ValidationResponse));
                       
                        if (ValidationResponse.IsSaveValidationSuccess == true) {

                            var TemplateId = OneViewSessionStorage.Get("TemplateId");

                            var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];

                            if (LVIsEdit == false) {

                                var DcActionInfo = _oLVDataCaptureBO.Save(LVTemplateResult, LVDcStartDate, ValidationResponse.IsSubmitValidationSuccess, LVDCSummary, MultiMediaSubElementsAnswerModeDict);

                                if (DcActionInfo.DcInfo != null) {

                                    var DcInfo = DcActionInfo.DcInfo;
                                    var ActionInfo = DcActionInfo.AttributeActionInfo;

                                    LVDataCaptureId = DcInfo.DcId;
                                    LVDcResultsId = DcInfo.DcResultsId;

                                    for (var itrAttributes in LVTemplateResult) {
                                        //alert(JSON.stringify(LVTemplateResult[itrAttributes]));
                                        var oAnswers = LVTemplateResult[itrAttributes].Answers;
                                        for (var i = 0; i < oAnswers.length; i++) {
                                            oAnswers[i].ClientId = DcInfo.DcResultDetails[oAnswers[i].ControlId].ClientId;
                                            oAnswers[i].ClientGuid = DcInfo.DcResultDetails[oAnswers[i].ControlId].ClientGuid;
                                            oAnswers[i].IsModified = false;
                                        }
                                    }

                                    var Key;
                                    for (var itrLVActionResult in LVActionResult) {
                                        LVActionResult[itrLVActionResult].ActionClientId = ActionInfo[itrLVActionResult].ActionClientId;
                                        LVActionResult[itrLVActionResult].ActionClientGuid = ActionInfo[itrLVActionResult].ActionClientGuid;
                                        LVActionResult[itrLVActionResult].DCNCMappingClientId = ActionInfo[itrLVActionResult].DCNCMappingClientId;
                                        for (var i = 0; i < LVActionResult[itrLVActionResult].Actions.length; i++) {
                                            if (LVActionResult[itrLVActionResult].Actions[i].ActionType == LVActionType.CustomAction) {
                                                Key = LVActionResult[itrLVActionResult].Actions[i].Name;
                                            }
                                            else if (LVActionResult[itrLVActionResult].Actions[i].ActionType == LVActionType.PredefinedAction) {
                                                Key = LVActionResult[itrLVActionResult].Actions[i].PreDefinedActionId;
                                            }
                                            LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId = ActionInfo[itrLVActionResult].ActionDetails[Key].ActionDetailsClientId;
                                        }
                                        for (var j = 0; j < LVActionResult[itrLVActionResult].MultimediaSubElements.length; j++) {
                                            LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId = ActionInfo[itrLVActionResult].MultiMediaSubElements[LVActionResult[itrLVActionResult].MultimediaSubElements[j].LocalURL].ClientId;
                                            LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientGuid = ActionInfo[itrLVActionResult].MultiMediaSubElements[LVActionResult[itrLVActionResult].MultimediaSubElements[j].LocalURL].ClientGuid;
                                        }
                                    }

                                    //update multimedia model
                                    var CreatedMultiMediaSubElementsAnswerModeList = DcActionInfo.CreatedMultiMediaSubElementsAnswerModeList;
                                    if (CreatedMultiMediaSubElementsAnswerModeList != null) {
                                        MyInstance.UpdateMultiMediaSubElementsAnswerModeModel(MultiMediaSubElementsAnswerModeDict, CreatedMultiMediaSubElementsAnswerModeList);
                                    }

                                    var OperationKey = oPageNavigationFramework.GetOperationKey("SaveAutoSubmit");
                                    oPageNavigationFramework.RedirectByPreference(OperationKey, $location, xlatService, $scope);

                                    
                                    //if (OneViewSessionStorage.Get("ServiceId") == 5) {
                                    //    AutoSubmitRouterNavigation_Save();
                                    //}
                                    //else {
                                    //oNotificationComponent.Notify(LVxlatService.xlat("IN-SU-LVI-001 :: Record added successfully"), MyInstance.DefaultJavaScriptAlert);
                                    //}
                                    IsSaveSuccess = true;
                                    LVIsEdit = true;
                                }
                                else {
                                    oNotificationComponent.Notify(LVxlatService.xlat("IN-ER-LVI-001 :: Error while saving"), MyInstance.DefaultJavaScriptAlert);
                                }
                            }
                            else {
                                var Result = _oLVDataCaptureBO.Update(LVTemplateResult, LVDataCaptureId, LVDcResultsId, LVIsEdit, ValidationResponse.IsSubmitValidationSuccess, LVDCSummary, MultiMediaSubElementsAnswerModeDict);
                                LVDcResultsId = Result.DcResultsId;
                                LVDcResultsClientGuid = Result.DcResultsClientGuid;

                                if (Result.IsSuccess == true && Result.DcResultDetails != null) {

                                    for (var itrAttributes in LVTemplateResult) {
                                        var oAnswers = LVTemplateResult[itrAttributes].Answers;
                                        for (var i = 0; i < oAnswers.length; i++) {
                                            if (Result.DcResultDetails[oAnswers[i].ControlId] != undefined) {
                                                oAnswers[i].ClientId = Result.DcResultDetails[oAnswers[i].ControlId].ClientId;
                                                oAnswers[i].ClientGuid = Result.DcResultDetails[oAnswers[i].ControlId].ClientGuid;
                                                oAnswers[i].IsModified = false;
                                            }
                                        }
                                    }
                                }

                                if (Result.IsSuccess == true) {
                                    //if (OneViewSessionStorage.Get("ServiceId") == 5) {
                                    //    AutoSubmitRouterNavigation_Update();
                                    //}
                                    //else {
                                    //    oNotificationComponent.Notify(LVxlatService.xlat("IN-SU-LVI-002 :: Record updated successfully"), MyInstance.DefaultJavaScriptAlert);
                                    //}

                                    //update multimedia model
                                    var CreatedMultiMediaSubElementsAnswerModeList = Result.CreatedMultiMediaSubElementsAnswerModeList;

                                    if (CreatedMultiMediaSubElementsAnswerModeList != null) {
                                        MyInstance.UpdateMultiMediaSubElementsAnswerModeModel(MultiMediaSubElementsAnswerModeDict, CreatedMultiMediaSubElementsAnswerModeList);
                                    }

                                    var OperationKey = oPageNavigationFramework.GetOperationKey("UpdateAutoSubmit");
                                    oPageNavigationFramework.RedirectByPreference(OperationKey, $location, xlatService, $scope);
                                    IsSaveSuccess = true;
                                }
                                else {
                                    oNotificationComponent.Notify(LVxlatService.xlat("IN-ER-LVI-002 :: Error while updating"), MyInstance.DefaultJavaScriptAlert);
                                }
                            }
                        }
                    }
                    else {
                        oNotificationComponent.Notify("Online save : Not implemented exception", MyInstance.DefaultJavaScriptAlert);
                    }

                    OneViewConsole.Debug("Save End", "LVPageComponent.Save");

                    return IsSaveSuccess;
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.Save", xlatService);
                }
            }

            var AutoSubmitRouterNavigation_Save = function () {

                try {
                    OneViewConsole.Debug("AutoSubmitRouterNavigation_Save Start", "LVPageComponent.AutoSubmitRouterNavigation_Save");
                    
                    if (OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == 'true' || OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == true) {

                        oNotificationComponent.Notify("IN-SU-LVI-001 :: Record added successfully", MyInstance.DefaultJavaScriptAlert);

                        var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

                        if (LandingPageViewInfo != null) {

                            LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                            $location.url(LandingPageViewInfo.BackRouteKey);

                            $scope.$apply();
                        }
                    }
                    else {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox("Confirm", "IN-SU-LVI-001 :: Record added successfully. Are you sure, you want to navigate back ?", function (ConfirmationId) {

                            if (ConfirmationId == '2') {

                                var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

                                if (LandingPageViewInfo != null) {

                                    LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                                    $location.url(LandingPageViewInfo.BackRouteKey);

                                    $scope.$apply();
                                }
                            }
                        });
                    }

                    OneViewConsole.Debug("AutoSubmitRouterNavigation_Save End", "LVPageComponent.AutoSubmitRouterNavigation_Save");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.AutoSubmitRouterNavigation_Save", xlatService);
                }
            }

            var AutoSubmitRouterNavigation_Update = function () {

                try {
                    OneViewConsole.Debug("AutoSubmitRouterNavigation_Update Start", "LVPageComponent.AutoSubmitRouterNavigation_Update");

                    if (OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == 'true' || OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == true) {

                        oNotificationComponent.Notify("IN-SU-LVI-002 :: Record updated successfully", MyInstance.DefaultJavaScriptAlert);

                        if (OneViewSessionStorage.Get("ViewRecordsForm") == 'true') {
                            $location.url('/ViewRecords');

                            $scope.$apply();
                        }
                        else {
                            var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

                            if (LandingPageViewInfo != null) {

                                LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                                $location.url(LandingPageViewInfo.BackRouteKey);

                                $scope.$apply();
                            }
                        }
                    }
                    else {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox("Confirm", "IN-SU-LVI-002 :: Record updated successfully. Are you sure, you want to navigate back ?", function (ConfirmationId) {

                            if (ConfirmationId == '2') {

                                if (OneViewSessionStorage.Get("ViewRecordsForm") == 'true') {
                                    $location.url('/ViewRecords');

                                    $scope.$apply();
                                }
                                else {
                                    var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

                                    if (LandingPageViewInfo != null) {

                                        LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                                        $location.url(LandingPageViewInfo.BackRouteKey);

                                        $scope.$apply();
                                    }
                                }
                            }
                        });
                    }

                    OneViewConsole.Debug("AutoSubmitRouterNavigation_Update End", "LVPageComponent.AutoSubmitRouterNavigation_Update");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.AutoSubmitRouterNavigation_Update", xlatService);
                }
            }


            this.UpdateMultiMediaSubElementsAnswerModeModel = function (MultiMediaSubElementsAnswerModeDict, CreatedMultiMediaSubElementsAnswerModeList) {
                try {
                    OneViewConsole.Debug("UpdateMultiMediaSubElementsAnswerModeModel Start", "LVPageComponent.UpdateMultiMediaSubElementsAnswerModeModel");

                    for (var AttributeId in MultiMediaSubElementsAnswerModeDict) {
                        var ControlWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                        for (var ControlId in ControlWiseMultiMediaSubElementsAnswerModeDict) {
                            var MultiMediaSubElementsAnswerModeList = ControlWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                            for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length; i++) {
                                for (var j = 0; j < CreatedMultiMediaSubElementsAnswerModeList.length; j++) {
                                    if (MultiMediaSubElementsAnswerModeList[i].LocalURL == CreatedMultiMediaSubElementsAnswerModeList[j].LocalURL) {
                                        MultiMediaSubElementsAnswerModeList[i].Id = CreatedMultiMediaSubElementsAnswerModeList[j].Id;
                                        MultiMediaSubElementsAnswerModeList[i].ServerId = (CreatedMultiMediaSubElementsAnswerModeList[j].ServerId != "INT" ? CreatedMultiMediaSubElementsAnswerModeList[j].ServerId : 0);
                                        MultiMediaSubElementsAnswerModeList[i].MappedEntityClientGuid = CreatedMultiMediaSubElementsAnswerModeList[j].MappedEntityClientGuid;
                                        break;
                                    }
                                }
                            }

                            var UpdatedMultiMediaSubElementsAnswerModeList = [];
                            for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length; i++) {
                                if (MultiMediaSubElementsAnswerModeList[i].IsDisabled != true) {
                                    UpdatedMultiMediaSubElementsAnswerModeList.push(MultiMediaSubElementsAnswerModeList[i]);
                                }
                            }

                            ControlWiseMultiMediaSubElementsAnswerModeDict[ControlId] = UpdatedMultiMediaSubElementsAnswerModeList;

                        }
                    }

                    OneViewConsole.Debug("UpdateMultiMediaSubElementsAnswerModeModel End", "LVPageComponent.UpdateMultiMediaSubElementsAnswerModeModel");
                }
                catch (Excep) {
                    alert('UpdateMultiMediaSubElementsAnswerModeModel Excep 11 : ' + Excep);
                    alert('UpdateMultiMediaSubElementsAnswerModeModel Excep  22 : ' + JSON.stringify(Excep));
                    throw oOneViewExceptionHandler.Create("Framework", "LVPageComponent.UpdateMultiMediaSubElementsAnswerModeModel", Excep);
                }
            }

            this.Edit = function (DcId) {

                try {
                    OneViewConsole.Debug("Edit Start", "LVPageComponent.Edit");

                    var oDOM = new DOM();
                    oDOM.RemoveInnerHtml(LVPageContentId);
                    
                    var _oLVDataCaptureBO = new LVDataCaptureBO();
                    var IsSuccess = _oLVDataCaptureBO.LoadTemplateResult(DcId, OneViewSessionStorage.Get("LoginUserId"), AnswerModeLoadType);

                    if (IsSuccess == true) {
                        LVIsEdit = true;
                        OneViewSessionStorage.Remove("DcId");
                        LVPreviousPageId = 2;
                        this.PageLoad();
                    }
                    else {
                        MyInstance.ViewRecords();
                    }

                    OneViewConsole.Debug("Edit End", "LVPageComponent.Edit");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.Edit", xlatService);
                }
            }

            this.ViewRecords = function () {

                try {
                    OneViewConsole.Debug("ViewRecords Start", "LVPageComponent.ViewRecords");

                    LVParentAttributeGroupId = 0;
                    LVCurrentAttributeGroupId = 0;

                    LVBreadCrumbDetails = [];
                    LVVisitedNodes = [];
                    LVTemplateResult = {};

                    LVIsEdit = false

                    OneViewConsole.Debug("ViewRecords End", "LVPageComponent.ViewRecords");
                    
                    $location.url('/ViewRecords');                               
                }
                catch (Excep) {                  
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.ViewRecords", xlatService);
                }
            }

            this.Back = function () {

                try {
                    OneViewConsole.Debug("Back Start", "LVPageComponent.Back");

                    if (LVBreadCrumbDetails.length > 0) {

                        LVCurrentAttributeGroupId = LVParentAttributeGroupId;

                        var oDOM = new DOM();
                        oDOM.RemoveInnerHtml(LVPageContentId);

                        LVPageNumber = 1;

                        var _oLVFactory = new LVFactory();
                        var oBreadCrumbComponent = _oLVFactory.GetBreadCrumbComponent(this.BreadCrumbComponentKey);
                        oBreadCrumbComponent.RemoveLastNode();

                        this.RenderPage(1);
                        this.RenderPage(2);
                    
                        oBreadCrumbComponent.UpdateUI(OneViewSessionStorage.Get("TemplateName"), LVBreadCrumbId);
                        
                        var _oLVTemplateHeaderComponent = new LVTemplateHeaderComponent();
                        _oLVTemplateHeaderComponent.Update();
                    }
                    else {
                        //var Title = "Confirm";
                        //var Message = "Do you want to save the Data Capture ?";

                        //var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        //oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                        //    if (ConfirmationId == '2') {
                        //        MyInstance.Save(false);
                        //        if (LVPreviousPageId == 2) {
                        //            $location.url('/ViewRecords');
                        //        }
                        //        else {
                        //            $location.url('/newdc');
                        //        }
                        //    }
                        //    else {
                        //        if (LVPreviousPageId == 2) {
                        //            $location.url('/ViewRecords');
                        //        }
                        //        else {
                        //            $location.url('/newdc');
                        //        }
                        //    }

                        //    $scope.$apply();
                        //});
                    }

                    OneViewConsole.Debug("Back End", "LVPageComponent.Back");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.Back", xlatService);
                }
            }

            this.RenderPage = function (LVPageNumber) {
               
                try {
                    OneViewConsole.Debug("RenderPage Start", "LVPageComponent.RenderPage");

                    var CurrentPageId = "Page" + LVPageNumber;
                    var oCurrentPageNo = document.getElementById(CurrentPageId);
              
                    var TemplateAnswerModeConfigForPage = GetAnswerModeMetaData();

                    //first time
                    if (oCurrentPageNo == null) {

                        var TemplateNodesHtml = GetTemplateNodes(LVPageNumber, TemplateAnswerModeConfigForPage, true);
                        var PageHtml = '<div id="' + CurrentPageId + '" style="100%">' + TemplateNodesHtml + '</div>';

                        var oDOM = new DOM();
                        oDOM.Append(LVPageContentId, PageHtml);

                        if (LVPageHeight == 0) {                         
                            LVPageHeight =  $("#Page" + LVPageNumber).height()
                        }
                    }
                    else {                  
                        oCurrentPageNo.innerHTML = GetTemplateNodes(LVPageNumber, TemplateAnswerModeConfigForPage, false);
                        $("#Page" + LVPageNumber).height('100%');  
                        //this.Show('Page' + LVPageNumber);
                    }

                    for (var i = 0; i < SignatutePadInfo.length; i++) {
                        LoadSignaturePad(SignatutePadInfo[i].ControlId);
                        var TemplateNodeObj = LVTemplateResult[SignatutePadInfo[i].TemplateNodeId];
                        if (TemplateNodeObj != undefined) {
                            for (var j = 0; j < TemplateNodeObj.Answers.length; j++) {                              
                                if (TemplateNodeObj.Answers[j].ControlId == SignatutePadInfo[i].ControlId && TemplateNodeObj.Answers[j].Answer != "") {
                                    if (SignatutePadObjects[SignatutePadInfo[i].ControlId] != undefined) {
                                        SignatutePadObjects[SignatutePadInfo[i].ControlId].fromDataURL(TemplateNodeObj.Answers[j].Answer);                                       
                                    }
                                }
                                else if (TemplateNodeObj.NA == true || TemplateNodeObj.IsBlocker == true) {
                                    if (SignatutePadObjects[SignatutePadInfo[i].ControlId] != undefined) {
                                        SignatutePadObjects[SignatutePadInfo[i].ControlId].off();
                                    }
                                }
                            }
                        }                       
                    }

                    OneViewConsole.Debug("RenderPage End", "LVPageComponent.RenderPage");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.RenderPage", xlatService);
                }
            }
            
            // Description : Creating the Html wrt Template metadata
            // Step 1 : Find the stating and ending index for Template metadata (Pagination)
            // Step 2 : Create oAttributeComponent, oAttributeGroupComponent, oAnswerModeComponent, oNAComponent, oDefaultValueComponent wrt LVFactory keys
            // Step 3 : Find CurrentAttributeGroup visited or not
            // Step 4 : Create Html 
            // Step 4.1 : Iterate the Template metadata base on start and end index (From Step 1)
            var GetTemplateNodes = function (LVPageNumber, TemplateNodes, IsNew) {

                try {
                    OneViewConsole.Debug("GetTemplateNodes Start", "LVPageComponent.GetTemplateNodes");

                    var TemplateNodesHtml = "";
                   
                    var Key = (LVPageNumber - 1) * LVPaginationSize;
                    var Length = Key + LVPaginationSize;
                    
                    var oAttributeComponent = oLVFactory.GetAttributeComponent(MyInstance.AttributeComponentKey);
                    var oAttributeGroupComponent = oLVFactory.GetAttributeGroupComponent(MyInstance.AttributeGroupComponentKey);
                    var oAnswerModeComponent = oLVFactory.GetAnswerModeComponent(MyInstance.AnswerModeComponentKey);
                    var oNAComponent = oLVFactory.GetNAComponent(MyInstance.NAComponentKey);
              
                    //Find any default value for attribute group
                    var oDefaultValueComponent = oLVFactory.GetDefaultValueComponent(MyInstance.DefaultValueComponentKey);                    
                    var oDefaultValue = oDefaultValueComponent.GetDefaultValue(OneViewSessionStorage.Get("TemplateId"));
                   
                    if (oDefaultValue.Answer == '' && LVBreadCrumbDetails.length > 0) {
                        for (var i = 0; i < LVBreadCrumbDetails.length; i++) {
                            oDefaultValue = oDefaultValueComponent.GetDefaultValue(LVBreadCrumbDetails[i].AttributeGroupId);                         
                            if (oDefaultValue.Answer != '') {
                                break;
                            }
                        }
                    }

                    var IsVisited = IsAlreadyVisited(LVCurrentAttributeGroupId);
                    //alert(IsVisited);
                   
                    for (var itrTemplateNode = Key; itrTemplateNode < Length; itrTemplateNode++) {
                       
                        if (TemplateNodes[itrTemplateNode] != undefined) {
                            var IsNAselected = false;
                            
                            var AttributeHtml = "";
                            var ImageHtml = "";                            
                            var AnswerModeHtml = "";                            
                            var AttributeGroupHtml = "";
                            var StatusHtml = "";
                            var NAHtml = "";

                            if (TemplateNodes[itrTemplateNode].IsAttributeGroup == false) {

                                AttributeHtml = oAttributeComponent.GetHtml(TemplateNodes[itrTemplateNode]);
                                ImageHtml = oAttributeComponent.GetImageHtml();
                               
                                //if (oDefaultValue.Answer == '') {
                                    oDefaultValue = oDefaultValueComponent.GetDefaultValue(TemplateNodes[itrTemplateNode].Id);                                    
                                //}
                             
                                AnswerModeHtml = oAnswerModeComponent.GetHtml(TemplateNodes[itrTemplateNode], oDefaultValue, IsNew, IsVisited);
                            }
                            else if (TemplateNodes[itrTemplateNode].IsAttributeGroup == true) {
                               
                                AttributeGroupHtml = oAttributeGroupComponent.GetHtml(TemplateNodes[itrTemplateNode]);
                                ImageHtml = oAttributeGroupComponent.GetImageHtml();
                                if (TemplateNodes[itrTemplateNode].Childs.length > 0) {
                                    var AttributeAnswerStatus = oAttributeGroupComponent.GetSummary(TemplateNodes[itrTemplateNode], true, true);
                                    StatusHtml = oAttributeGroupComponent.GetStatusHtml(AttributeAnswerStatus, TemplateNodes[itrTemplateNode].Id);
                                }
                            }
                          
                            if (OneViewSessionStorage.Get("ServiceId") != 8) { // Need to change, temporaryly enabled for EY release
                                if ((OneViewSessionStorage.Get("ServiceId") == 13 && OneViewSessionStorage.Get("TemplateId") == 625)) {
                                    // Need to change, temporaryly enabled for hyde house release
                                }
                                else if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 18 && OneViewSessionStorage.Get("TemplateId") == 625) {
                                    // Todo(Added by Sangeeta Bhatt(19-05-2017) : Need to change, temporarily enabled for Elcita Services for different predefined action loading)
                                }
                                else {
                                    IsNAselected = (oDefaultValue.Answer == "NA" || (LVTemplateResult[TemplateNodes[itrTemplateNode].Id] != undefined && LVTemplateResult[TemplateNodes[itrTemplateNode].Id].NA == true)) ? true : false;
                                    NAHtml = oNAComponent.GetHtml(TemplateNodes[itrTemplateNode].Id, IsNAselected);
                                }
                            }

                            if (TemplateNodes[itrTemplateNode].IsAttributeGroup == false) {
                                TemplateNodesHtml += MakeAttributeBlock(ImageHtml, AttributeHtml, NAHtml, AnswerModeHtml, TemplateNodes[itrTemplateNode].Id, TemplateNodes[itrTemplateNode].AnswerModes[0].ControlId, TemplateNodes[itrTemplateNode].Name);
                            }
                            else {
                                var HasChilds = (TemplateNodes[itrTemplateNode].Childs.length == 0) ? false : true;
                                TemplateNodesHtml += MakeAttributeGroupBlock(ImageHtml, AttributeGroupHtml, StatusHtml, HasChilds, itrTemplateNode, TemplateNodes[itrTemplateNode].Id, TemplateNodes[itrTemplateNode].Name, TemplateNodes[itrTemplateNode].AttributeGroupType, TemplateNodes[itrTemplateNode].ControlId);
                            }
                        }
                        else {
                            break;
                        }
                    }

                    OneViewConsole.Debug("GetTemplateNodes End", "LVPageComponent.GetTemplateNodes");

                    return TemplateNodesHtml;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var IsAlreadyVisited = function (TemplateNodeId) {
               
                try {
                    OneViewConsole.Debug("IsAlreadyVisited Start", "LVPageComponent.IsAlreadyVisited");

                    var IsVisited = true;              
                    if (LVVisitedNodes.indexOf(TemplateNodeId) == -1) {
                        IsVisited = false;
                    }

                    OneViewConsole.Debug("IsAlreadyVisited End", "LVPageComponent.IsAlreadyVisited");

                    return IsVisited;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var MakeAttributeGroupBlock = function (ImageHtml, AttributeGroupHtml, StatusHtml, HasChilds, ArrayIndex, AttributeGroupId, AttributeGroupName, AttributeGroupType, ControlId) {

                try {
                    OneViewConsole.Debug("MakeAttributeGroupBlock Start", "LVPageComponent.MakeAttributeGroupBlock");

                    var Name = "'" + AttributeGroupName + "'";
                    var Control = (ControlId != undefined && ControlId != "") ? "'" + ControlId + "'" : "'ControlId" + AttributeGroupId + "'";
                    var AttributeGroupBlokHtml = "";

                    if (AttributeGroupType != 2) {
                       
                        AttributeGroupBlokHtml = '<div class="item item-button-right" id="TemplateNodeBlock_' + AttributeGroupId + '">' +
                                                       '<div onclick="new LVDefaultAttributeGroupComponent().Load(' + ArrayIndex + ',' + AttributeGroupId + ',' + Name + ',' + Control + ')">' +
                                                            AttributeGroupHtml +
                                                           '<span class="item-note">' +                                                         
                                                                StatusHtml +
                                                               '<i class="icon icon-angle-right i-arrow"></i>' +
                                                           '</span>' +
                                                       '</div>' +
                                                       '<button class="button more-btn">' +
                                                          '<i class="icon icon-ellipsis-v"></i>' +
                                                        '</button>' +
                                                   '</div>';
                    }

                    else {
                       
                        AttributeGroupBlokHtml = '<div class="row responsive-sm dc-button-holder margin-top-md" id="TemplateNodeBlock_' + AttributeGroupId + '">' +
                                                   '<div class="col no-padding" onclick="new LVDefaultAttributeGroupComponent().Load(' + ArrayIndex + ',' + AttributeGroupId + ',' + Name + ',' + Control + ')">' +
                                                       '<a href="javascript:void(0)" class="button button-block button-calm">' + AttributeGroupHtml + '</a>' +
                                                   '</div>';

                        $scope.LVFooterPanel = false;

                        var _oDOM = new DOM();
                        _oDOM.RemoveClass("ContentId", "has-footer");
                    }

                    OneViewConsole.Debug("MakeAttributeGroupBlock End", "LVPageComponent.MakeAttributeGroupBlock");

                    return AttributeGroupBlokHtml;                   
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var MakeAttributeBlock = function (ImageHtml, AttributeHtml, NAHtml, AnswerModeHtml, TemplateNodeId, ControlId, AttributeName) {

                try {
                    OneViewConsole.Debug("MakeAttributeBlock Start", "LVPageComponent.MakeAttributeBlock");

                    var ActualTimeHtml = "";
                    var _oLVDefaultActualTimeComponent = new LVDefaultActualTimeComponent();
                    if (_oLVDefaultActualTimeComponent.IsESTEnabled(TemplateNodeId) == true) {
                        ActualTimeHtml = _oLVDefaultActualTimeComponent.GetHtml(TemplateNodeId);
                    }

                    var _oLVDefaultHelpDocumentComponent = new LVDefaultHelpDocumentComponent();
                    var IsExist = _oLVDefaultHelpDocumentComponent.IsExist(TemplateNodeId);

                    var _oDCBlockerConfigProfileComponent = new DCBlockerConfigProfileComponent();
                    var IsDCBlockerEnable = _oDCBlockerConfigProfileComponent.IsEnable(TemplateNodeId);

                    var AttControlId = "'" + ControlId + "'";
                    var AttName = "'" + AttributeName + "'";

                    var DCBlockerHtml = (IsDCBlockerEnable == true) ? '<button class="button button-clear info np-but" onclick="LoadDCBlockerTemplate(' + TemplateNodeId + ',' + AttControlId + ',' + AttName + ',this)">N/P</button>' : '';
                   
                    if (LVTemplateResult[TemplateNodeId] != undefined) {
                        DCBlockerHtml = (LVTemplateResult[TemplateNodeId].IsBlocker == true) ? '<button class="button button-clear info active np-but" onclick="LoadDCBlockerTemplate(' + TemplateNodeId + ',' + AttControlId + ',' + AttName + ',this)">N/P</button>' : DCBlockerHtml;
                    }
                    var InfoHtml = (IsExist == true) ? '<a class="button button-clear info" onclick="ShowHelpDocument(' + TemplateNodeId + ')"><i class="icon icon-info-circle"></i></a>' : '';

                    var FirstControlId = "'" + ControlId + "'";
                    var Style = (LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVFormattedTemplateMetadata[TemplateNodeId].DefaultHide != undefined && LVFormattedTemplateMetadata[TemplateNodeId].DefaultHide == true) ? "display: none;" : "";

                    //if (Style == "") {                        
                    //    Style = (LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVFormattedTemplateMetadata[TemplateNodeId].DefaultDisable != undefined && LVFormattedTemplateMetadata[TemplateNodeId].DefaultDisable == true) ? "pointer-events: none; opacity: 0.5;" : "";                        
                    //}

                    if (NAHtml == "") {
                        Style += "padding-left:10px;";
                    }

                    var NAOrNPClass = (LVTemplateResult[TemplateNodeId].NA == true) ? "na" : "";
                    NAOrNPClass = (NAOrNPClass == "" && LVTemplateResult[TemplateNodeId].IsBlocker == true) ? "np" : NAOrNPClass;
                   
                    var AttributeBlokHtml = '<div style="' + Style + '" class="item attribute item-button-right item-button-l ' + NAOrNPClass + '" id="TemplateNodeBlock_' + TemplateNodeId + '">' +
                                                NAHtml +
                                                AttributeHtml +
                                                DCBlockerHtml +
                                                InfoHtml +
                                                AnswerModeHtml +
                                                ActualTimeHtml +
                                            '<button class="button more-btn" onclick="OpenRightPanel(' + TemplateNodeId + ',' + FirstControlId + ',' + LVRightPanelTab.Comments + ')">' +
                                              '<i class="icon icon-ellipsis-v"></i>' +
                                            '</button>' +
                                            '</div>';

                    //alert(AttributeBlokHtml);

                    OneViewConsole.Debug("MakeAttributeBlock End", "LVPageComponent.MakeAttributeBlock");

                    return AttributeBlokHtml;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var GetAnswerModeMetaData = function () {

                try {
                    OneViewConsole.Debug("GetAnswerModeMetaData Start", "LVPageComponent.GetAnswerModeMetaData");

                    var Childs = LVTemplateConfigMetaData.TemplateConfigMetaDataDetails.Childs;

                    var Size = 0, key;

                    // Need to change with array last index value
                    for (var i = 0; i < LVBreadCrumbDetails.length; i++) {
                        var ArrayIndex = LVBreadCrumbDetails[i].ArrayIndex;
                        Childs = Childs[ArrayIndex].Childs;
                    }

                    LVTemplateNodesLength = Childs.length;

                    OneViewConsole.Debug("GetAnswerModeMetaData End", "LVPageComponent.GetAnswerModeMetaData");

                    return Childs;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var LoadTemplateOtherConfigMetaData = function () {

                try {
                    OneViewConsole.Debug("LoadMetaData Start", "LVPageComponent.LoadMetaData");

                    var ServiceId = OneViewSessionStorage.Get("ServiceId");
                    var TemplateId = OneViewSessionStorage.Get("TemplateId");                  
                    var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");//- 1;
                    var DcPlaceDimension = - 1; // Need to access from session
                    var DcUserId = OneViewSessionStorage.Get("LoginUserId");// - 1;

                    //User nd place specific
                    var MetaData = GetAttributeOtherConfigMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId);

                    //MetaData = LVTemplateOtherConfigMetaData[ServiceId][TemplateId];
                    //alert(JSON.stringify(MetaData));

                    if (MetaData == null) {
                        //User specific
                        DcPlaceId = -1;
                        DcPlaceDimension = -1
                        MetaData = GetAttributeOtherConfigMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId);
                    }
                    if (MetaData == null) {
                        //Place specific
                        DcUserId = -1;
                        MetaData = GetAttributeOtherConfigMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId);
                    }
                    if (MetaData == null) {
                        //none
                       DcPlaceId = -1;
                       DcUserId = -1;
                       DcPlaceDimension = -1
                       MetaData = GetAttributeOtherConfigMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId);
                    }
                    if (MetaData != null) {
                        LVDefaultValueConfigMetaData = MetaData.AttributeDefaultValueMetaDataDict;
                        LVHistoryConfigMetaData = MetaData.HistoryMetaDataDict;
                        LVNAConfigMetaData = MetaData.NAMetaDataDict;
                        LVHelpDocumentConfigMetaData = MetaData.HelpDocumentMetaDataDict;
                        LVUserWiseLastDC = MetaData.UserWiseLastDC;
                        LVDcPlaceWiseLastDC = MetaData.DcPlaceWiseLastDC;                       
                    }                

                   OneViewConsole.Debug("LoadMetaData End", "LVPageComponent.LoadMetaData");
                }
                catch(Excep){
                    throw Excep;
                }
            }

            var GetAttributeOtherConfigMetaData = function (ServiceId, DcPlaceId, DcPlaceDimension, DcUserId) {
                try {
                    OneViewConsole.Debug("GetAttributeOtherConfigMetaData Start", "LVPageComponent.GetAttributeOtherConfigMetaData");

                    var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
                    var _oAttributeOtherConfigDAO = new AttributeOtherConfigDAO();
                    var MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId);

                    OneViewConsole.Debug("GetAttributeOtherConfigMetaData End", "LVPageComponent.GetAttributeOtherConfigMetaData");

                    return MetaData;
                }
                catch (Excep) {
                    throw Excep;
                }
            }
            
            var LoadActionNCMetaData = function () {
                try {
                    var ServiceId = OneViewSessionStorage.Get("ServiceId");
                    var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
                    var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
                    var DcPlaceDimension;               
                    var DcUserId = OneViewSessionStorage.Get("LoginUserId");

                    var MetaData = GetActionNCMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);

                    if (MetaData != null) {                        
                        ActionNCProfile = MetaData;
                        //alert(JSON.stringify(ActionNCProfile));
                    }
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var GetActionNCMetaData = function (ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension) {
                try {
                    var _oActionNCProfilingDAO = new ActionNCProfilingDAO();
                    var MetaData = _oActionNCProfilingDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);

                    if (MetaData == null) {                    
                        MetaData = _oActionNCProfilingDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, -1, -1);
                    }
                    if (MetaData == null) {                        
                        MetaData = _oActionNCProfilingDAO.GetMetaData(ServiceId, -1, TemplateNodeId, DcPlaceId, DcPlaceDimension);
                    }
                    if (MetaData == null) {                                                           
                        MetaData = _oActionNCProfilingDAO.GetMetaData(ServiceId, -1, TemplateNodeId, -1, DcPlaceDimension);
                    }

                    return MetaData;
                }
                catch (Excep) {                   
                    throw Excep;
                }
            }

            var LoadTemplateUIEventJobMetaData = function () {
                try {
                    var ServiceId = OneViewSessionStorage.Get("ServiceId");
                    var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
                    var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
                    var DcPlaceDimension = 16; // Need to take from session
                    var DcUserId = OneViewSessionStorage.Get("LoginUserId");

                    var MetaData = GetTemplateUIEventJobMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);

                    if (MetaData != null) {
                        LVTemplateUIEventJobConfigMetaData = MetaData;
                    }
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var GetTemplateUIEventJobMetaData = function (ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension) {
                try {
                    var _oTemplateUIEventJobConfigMetaDataDAO = new TemplateUIEventJobConfigMetaDataDAO();
                    var MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);

                    if (MetaData == null) {
                        MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, -1, -1);
                    }
                    if (MetaData == null) {
                        MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, -1, TemplateNodeId, DcPlaceId, DcPlaceDimension);
                    }
                    if (MetaData == null) {
                        MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, -1, TemplateNodeId, -1, DcPlaceDimension);
                    }

                    return MetaData;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var LoadTemplateConfigMetaData = function () {
                try {
                    var ServiceId = OneViewSessionStorage.Get("ServiceId");
                    var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
                   
                    var MetaData = GetTemplateConfigMetaData(ServiceId, TemplateNodeId);

                    if (MetaData != null) {
                        LVTemplateConfigMetaData = MetaData;                       
                    }
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var GetTemplateConfigMetaData = function (ServiceId, TemplateNodeId) {
                try {
                    var _oTemplateConfigDAO = new TemplateConfigDAO();
                    var MetaData = _oTemplateConfigDAO.GetMetaData(ServiceId, TemplateNodeId);

                    return MetaData;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var LoadTemplateMandatoryValidationMetaData = function () {
                try {
                    var ServiceId = OneViewSessionStorage.Get("ServiceId");
                    var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
                    var TemplateId = OneViewSessionStorage.Get("TemplateId");
                    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

                    var MetaData = GetTemplateMandatoryValidationMetaData(ServiceId, LoginUserId, TemplateId, DcPlaceId);
                    
                    if (MetaData != null) {
                        LVTemplateMandatoryValidationMetaData = MetaData;
                    }
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var GetTemplateMandatoryValidationMetaData = function (ServiceId, LoginUserId, TemplateId, DcPlaceId) {
                try {

                    DcPlaceDimension = "OrganizationAssetsNode";
                    //  alert('Request : ' + ServiceId + "," + LoginUserId + "," + TemplateId + "," + DcPlaceId + "," + DcPlaceDimension);
                    var _oTemplatValidationConfigMetaDataDAO = new TemplatValidationConfigMetaDataDAO();
                    var MetaDataList = _oTemplatValidationConfigMetaDataDAO.GetMetaData(ServiceId, LoginUserId, TemplateId, DcPlaceId, DcPlaceDimension);

                    if (MetaDataList == null) {
                        //User specific
                        // DcPlaceId = -1;
                        //  DcPlaceDimension = -1
                        MetaDataList = _oTemplatValidationConfigMetaDataDAO.GetMetaData(ServiceId, LoginUserId, TemplateId, -1, -1);
                    }

                    if (MetaDataList == null) {
                        //Place specific
                        // LoginUserId = -1;
                        MetaDataList = _oTemplatValidationConfigMetaDataDAO.GetMetaData(ServiceId, -1, TemplateId, DcPlaceId, DcPlaceDimension);
                    }

                    if (MetaDataList == null) {
                        //none
                        DcPlaceId = -1;
                        LoginUserId = -1;
                        //DcPlaceDimension = -1
                        MetaDataList = _oTemplatValidationConfigMetaDataDAO.GetMetaData(ServiceId, LoginUserId, TemplateId, DcPlaceId, DcPlaceDimension);
                    }

                    return MetaDataList;
                }
                catch (Excep) {                   
                    throw Excep;
                }
            }
            
            var LoadRightPanel = function () {
                try {
                    OneViewConsole.Debug("LoadRightPanel Start", "LVPageComponent.LoadRightPanel");

                    var _oRightPanelComponent = oLVFactory.GetRightPanelComponent(MyInstance.RightPanelComponentKey);
                    _oRightPanelComponent.Load();

                    OneViewConsole.Debug("LoadRightPanel End", "LVPageComponent.LoadRightPanel");
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            this.OpenRightPanel = function (TemplateNodeId, FirstControlId, HeaderId) {
                try {
                    OneViewConsole.Debug("OpenRightPanel Start", "LVPageComponent.OpenRightPanel");

                    if (LVTemplateResult[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA != true) {

                        LVCurrentAttributeId = TemplateNodeId;
                        LVCurrentControlId = FirstControlId; // Need to discuss
                        LVRightPanelCurrentHeaderId = HeaderId;

                        var _oRightPanelComponent = oLVFactory.GetRightPanelComponent(MyInstance.RightPanelComponentKey);
                        _oRightPanelComponent.Open(HeaderId, false);
                    }                    

                    OneViewConsole.Debug("OpenRightPanel End", "LVPageComponent.OpenRightPanel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.OpenRightPanel", xlatService);
                }
            }

            this.CloseRightPanel = function () {
                try {
                    OneViewConsole.Debug("CloseRightPanel Start", "LVPageComponent.CloseRightPanel");

                    var _oRightPanelComponent = oLVFactory.GetRightPanelComponent(MyInstance.RightPanelComponentKey);
                    _oRightPanelComponent.Close();

                    OneViewConsole.Debug("CloseRightPanel End", "LVPageComponent.CloseRightPanel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.CloseRightPanel", xlatService);
                }
            }

            this.RightPanelTabClick = function (HeaderId) {
                try {
                    OneViewConsole.Debug("RightPanelTabClick Start", "LVPageComponent.RightPanelTabClick");

                    LVRightPanelCurrentHeaderId = HeaderId;

                    var _oRightPanelComponent = oLVFactory.GetRightPanelComponent(MyInstance.RightPanelComponentKey);
                    _oRightPanelComponent.Open(HeaderId, true);

                    OneViewConsole.Debug("RightPanelTabClick End", "LVPageComponent.RightPanelTabClick");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.RightPanelTabClick", xlatService);
                }
            }

            this.RightPanelSave = function () {
                try {
                    OneViewConsole.Debug("RightPanelSave Start", "LVPageComponent.RightPanelSave");

                    if (LVRightPanelCurrentHeaderId == 1) {
                        if ($scope.CommentsRightPanel != "" && $scope.CommentsRightPanel != undefined) {
                            var oAttributeComponent = oLVFactory.GetAttributeComponent(MyInstance.AttributeComponentKey);
                            oAttributeComponent.UpdateCommentsModel(LVCurrentAttributeId, $scope.CommentsRightPanel);
                            MyInstance.CloseRightPanel();
                        }
                        else {
                            oNotificationComponent.Notify(LVxlatService.xlat("MN-RQ-LVI-001 :: Please enter valid comment"), MyInstance.DefaultJavaScriptAlert);
                        }
                    }
                    else {
                        var _oRightPanelComponent = oLVFactory.GetRightPanelComponent(MyInstance.RightPanelComponentKey);
                        _oRightPanelComponent.Close();
                    }

                    OneViewConsole.Debug("RightPanelSave End", "LVPageComponent.RightPanelSave");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.RightPanelSave", xlatService);
                }
            }

            this.UpdateRightPanelComments = function (CommentsRightPanel) {
                try {
                    OneViewConsole.Debug("UpdateRightPanelComments Start", "LVPageComponent.UpdateRightPanelComments");

                    if (CommentsRightPanel != "" && CommentsRightPanel != undefined) {

                        var _oLVSpecialCharacterValidationComponent = new LVSpecialCharacterValidationComponent();
                        CommentsRightPanel = _oLVSpecialCharacterValidationComponent.RemoveSpecialCharacters(CommentsRightPanel);

                        var oAttributeComponent = oLVFactory.GetAttributeComponent(MyInstance.AttributeComponentKey);
                        oAttributeComponent.UpdateCommentsModel(LVCurrentAttributeId, CommentsRightPanel);                       
                    }
                    else {
                        oNotificationComponent.Notify(LVxlatService.xlat("MN-RQ-LVI-001 ::Please enter valid comment"), MyInstance.DefaultJavaScriptAlert);
                    }

                    OneViewConsole.Debug("UpdateRightPanelComments End", "LVPageComponent.UpdateRightPanelComments");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.UpdateRightPanelComments", xlatService);
                }
            }

            this.ClearComments = function () {
                try {
                    OneViewConsole.Debug("ClearComments Start", "LVPageComponent.ClearComments");

                    $scope.CommentsRightPanel = "";

                    var oAttributeComponent = oLVFactory.GetAttributeComponent(MyInstance.AttributeComponentKey);
                    oAttributeComponent.UpdateCommentsModel(LVCurrentAttributeId, "");

                    OneViewConsole.Debug("ClearComments End", "LVPageComponent.ClearComments");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.ClearComments", xlatService);
                }
            }

            this.PredefinedActionChanged = function (Action) {
                try {  
                    var _oLVDataCaptureBO = new LVDataCaptureBO();
                    var GeoLocationResponse = _oLVDataCaptureBO.GetLatitudeAndLongitude();

                    if (LVActionResult[Action.RuleId] == undefined) {
                        LVActionResult[Action.RuleId] = {
                            "IsDisable": false,
                            "IsNC": Action.IsNC,
                            "IsObservation": Action.IsObservation,
                            "IsManualRule": Action.IsManualRule,
                            "ActionClientId": "",
                            "ActionClientGuid": "",
                            "DCNCMappingClientId": "",
                            "DNNCMappimgServerId": 0,
                            "TemplateNodeIds" : Action.TemplateNodeIds,
                            "Actions": [
                                {
                                    "PreDefinedActionId": Action.Id,
                                    "Name": Action.Name,
                                    "ActionDetailsClientId": "",
                                    "IsDisable": false,
                                    "ActionType": LVActionType.PredefinedAction,
                                    "ActionDetailsServerId": 0,
                                    "Latitude": GeoLocationResponse.Latitude,
                                    "Longitude": GeoLocationResponse.Longitude
                                }
                            ],
                            "MultimediaSubElements": []
                        };                       
                    }
                    else {
                        var DeletedActionIndexLst = [];
                        var IsExist = false;
                        var IsRuleDisabled = true;                        
                        for (var i = 0; i < LVActionResult[Action.RuleId].Actions.length; i++) {
                          
                            if (LVActionResult[Action.RuleId].Actions[i].PreDefinedActionId == Action.Id && LVActionResult[Action.RuleId].Actions[i].ActionType == LVActionType.PredefinedAction) {
                                IsExist = true;                               
                                if (LVActionResult[Action.RuleId].Actions[i].ActionDetailsClientId == "") {
                                    //LVActionResult[Action.RuleId].Actions.splice(i, 1);
                                    DeletedActionIndexLst.push(i);
                                }
                                else {
                                    LVActionResult[Action.RuleId].Actions[i].IsDisable = !(LVActionResult[Action.RuleId].Actions[i].IsDisable);                                    
                                }                               
                            }
                            else if (LVActionResult[Action.RuleId].Actions[i].IsDisable == false) {
                                IsRuleDisabled = false;                              
                            }
                        }
                        for (var i = 0; i < DeletedActionIndexLst.length; i++) {
                            LVActionResult[Action.RuleId].Actions.splice(DeletedActionIndexLst[i], 1);
                        }                     
                        if (IsExist == false) {
                            LVActionResult[Action.RuleId].Actions.push(
                                 {
                                     "PreDefinedActionId": Action.Id,
                                     "Name": "",
                                     "ActionDetailsClientId": "",
                                     "IsDisable": false,
                                     "ActionType": LVActionType.PredefinedAction,
                                     "ActionDetailsServerId": 0,
                                     "Latitude": GeoLocationResponse.Latitude,
                                     "Longitude": GeoLocationResponse.Longitude
                                 }
                           );
                            LVActionResult[Action.RuleId].IsDisable = false;
                            IsRuleDisabled = false;
                        }                      
                        if (IsRuleDisabled == true) {
                            if (LVActionResult[Action.RuleId].DCNCMappingClientId == "") {
                                delete LVActionResult[Action.RuleId];
                            }
                            else {
                                LVActionResult[Action.RuleId].IsDisable = true;
                                LVActionResult[Action.RuleId].IsNC = false;
                            }
                            $scope.ActionMultiMediaSubElements = [];
                        }
                        else {
                            LVActionResult[Action.RuleId].IsDisable = false;
                        }
                    }

                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.PredefinedActionChanged", xlatService);
                }
            }

            this.AddCustomAction = function (CustomAction, RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeIds) {
                try {
                    OneViewConsole.Debug("AddCustomAction Start", "LVPageComponent.AddCustomAction");
                    var IsValid = true;

                    if (CustomAction != "" && CustomAction != null && CustomAction != undefined) {

                        var _oLVDataCaptureBO = new LVDataCaptureBO();
                        var GeoLocationResponse = _oLVDataCaptureBO.GetLatitudeAndLongitude();

                        var _oLVSpecialCharacterValidationComponent = new LVSpecialCharacterValidationComponent();
                        CustomAction = _oLVSpecialCharacterValidationComponent.RemoveSpecialCharacters(CustomAction);
                        
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
                                "TemplateNodeIds" :TemplateNodeIds,
                                "Actions": [
                                    {
                                        "PreDefinedActionId": 0,
                                        "Name": CustomAction,
                                        "ActionDetailsClientId": "",
                                        "IsDisable": false,
                                        "ActionType": LVActionType.CustomAction,
                                        "ActionDetailsServerId": 0,
                                        "Latitude": GeoLocationResponse.Latitude,
                                        "Longitude": GeoLocationResponse.Longitude
                                    }
                                ],
                                "MultimediaSubElements":[]
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
                                         "ActionDetailsServerId": 0,
                                         "Latitude": GeoLocationResponse.Latitude,
                                         "Longitude": GeoLocationResponse.Longitude
                                     }
                               );
                                LVActionResult[RuleId].IsDisable = false;
                            }
                            else {
                                IsValid = false;
                                oNotificationComponent.Notify(LVxlatService.xlat("IN-MG-LVI-001 :: The action already exists, Please enter new action"), MyInstance.DefaultJavaScriptAlert);
                            }
                        }

                        if (IsValid == true) {
                            $scope.CustomActions.push({ "RuleId": RuleId, "label": CustomAction });
                            $scope.CustomAction = "";
                        }
                    }
                    else {
                        oNotificationComponent.Notify(LVxlatService.xlat("MN-RQ-LVI-002 :: Please enter valid action"), MyInstance.DefaultJavaScriptAlert);
                    }

                    //alert(JSON.stringify(LVActionResult[RuleId]));
                    //alert(JSON.stringify(LVActionResult));

                    OneViewConsole.Debug("AddCustomAction End", "LVPageComponent.AddCustomAction");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.AddCustomAction", xlatService);
                }
            }

            this.DeleteCustomAction = function (CustomAction) {
                try {
                    OneViewConsole.Debug("DeleteCustomAction Start", "LVPageComponent.DeleteCustomAction");

                    for (var i = 0; i < $scope.CustomActions.length; i++) {                      
                        if ($scope.CustomActions[i].label == CustomAction.label) {
                            $scope.CustomActions.splice(i, 1);
                            break;
                        }
                    }

                    var IsRuleDisabled = true;

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
                        else if(LVActionResult[CustomAction.RuleId].Actions[i].IsDisable == false){
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
                        $scope.ActionMultiMediaSubElements = [];                        
                    }
                  
                    //alert(JSON.stringify(LVActionResult[CustomAction.RuleId]));
                    //alert(JSON.stringify(LVActionResult));

                    OneViewConsole.Debug("DeleteCustomAction End", "LVPageComponent.DeleteCustomAction");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.DeleteCustomAction", xlatService);
                }
            }

            this.ShowHelpDocument = function (TemplateNodeId) {

                try {
                    OneViewConsole.Debug("ShowHelpDocument Start", "LVPageComponent.ShowHelpDocument");

                    var _oLVDefaultHelpDocumentComponent = new LVDefaultHelpDocumentComponent();
                    var HelpDocument = _oLVDefaultHelpDocumentComponent.Get(TemplateNodeId);

                    var _oLVFactory = new LVFactory();
                    var _oNotificationComponent = _oLVFactory.GetNotificationComponent(this.LVDefaultNotificationComponentKey);
                    _oNotificationComponent.Notify(HelpDocument, this.DefaultJavaScriptAlert);

                    OneViewConsole.Debug("ShowHelpDocument End", "LVPageComponent.ShowHelpDocument");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.ShowHelpDocument", xlatService);
                }
            }

            this.AttachPictureToAction = function (RuleId, IsNC, IsObservation, IsManualRule) {

                try {
                    OneViewConsole.Debug("AttachPictureToAction Start", "LVPageComponent.AttachPictureToAction");

                    if (IsActionExist(RuleId)) {
                        var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
                        _oOneViewCordovaCameraPlugin.CaptureImage(function (LocalURL) {
                            var _oLVDataCaptureBO = new LVDataCaptureBO();
                            var GeoLocationResponse = _oLVDataCaptureBO.GetLatitudeAndLongitude();

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
                                "Latitude": GeoLocationResponse.Latitude,
                                "Longitude": GeoLocationResponse.Longitude
                            }
                            LVActionResult[RuleId].MultimediaSubElements.push(Picture);
                            $scope.ActionMultiMediaSubElements.push(Picture);
                            $scope.$apply();
                        });
                    }
                    else {
                        oNotificationComponent.Notify(LVxlatService.xlat("IN-MG-LVI-002 :: Please select/add atleast one action"), MyInstance.DefaultJavaScriptAlert);
                    }
                    OneViewConsole.Debug("AttachPictureToAction End", "LVPageComponent.AttachPictureToAction");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.AttachPictureToAction", xlatService);
                }              
            }

            var IsActionExist = function (RuleId) {

                try {
                    OneViewConsole.Debug("IsActionExist Start", "LVPageComponent.IsActionExist");

                    var IsActionExist = false;

                    if (LVActionResult[RuleId] != undefined) {
                        for (var i = 0; i < LVActionResult[RuleId].Actions.length; i++) {
                            if (LVActionResult[RuleId].Actions[i].IsDisable == false) {
                                IsActionExist = true;
                                break;
                            }
                        }
                    }

                    OneViewConsole.Debug("IsActionExist End", "LVPageComponent.IsActionExist");

                    return IsActionExist;
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.IsActionExist", xlatService);
                }
            }

            var SetCurrentShift = function () {
                try {
                    OneViewConsole.Debug("SetCurrentShift Start", "LVPageComponent.SetCurrentShift");

                    var _oDefaultMasterDAO = new DefaultMasterDAO("ShiftMasterEntity");
                    var Shifts = _oDefaultMasterDAO.GetAllMasters();
                   
                    if (Shifts.length == 0) {
                        OneViewSessionStorage.Save("CurrentShiftId", 0);
                        OneViewSessionStorage.Save("CurrentShiftName", "");
                    }
                    else {
                        for (var itr = 0; itr < Shifts.length ; itr++) {
                            if (IsCurrentShift(Shifts[itr])) {
                                OneViewSessionStorage.Save("CurrentShiftId", Shifts[itr].ServerId);
                                OneViewSessionStorage.Save("CurrentShiftName", Shifts[itr].Name);
                            }
                        }
                    }

                    OneViewConsole.Debug("SetCurrentShift End", "LVPageComponent.SetCurrentShift");
                }
                catch (Excep) {
                    throw Excep;
                }                
            }

            var IsCurrentShift = function (Shift) {
                try {
                    OneViewConsole.Debug("IsCurrentShift Start", "LVPageComponent.IsCurrentShift");

                    var IsCurrentShift = false;
                    var _oDateTime = new DateTime();
                    var EndDate = "";

                    /////StartDate
                    var StartDateParts = (Shift.StartDate).split("-");
                    var tempStartDateParts = StartDateParts[2].split(" ");
                    var StartDateTimeParts = tempStartDateParts[1].split(":");
                    var StartDate = new Date((parseInt(tempStartDateParts[0])), (parseInt(StartDateParts[1] - 1)), (parseInt(StartDateParts[0])), (parseInt(StartDateTimeParts[0])), (parseInt(StartDateTimeParts[1])), (parseInt(StartDateTimeParts[2])));

                    /////EndDate
                    var EndDateParts = (Shift.EndDate).split("-");
                    var tempEndDateParts = StartDateParts[2].split(" ");
                    var EndDateTimeParts = tempStartDateParts[1].split(":");
                    if (Shift.EndDate != "" || Shift.EndDate != undefined || Shift.EndDate != null || Shift.EndDate != " ") {
                        EndDate = new Date((parseInt(tempEndDateParts[0])), (parseInt(EndDateParts[1] - 1)), (parseInt(EndDateParts[0])), (parseInt(EndDateTimeParts[0])), (parseInt(EndDateTimeParts[1])), (parseInt(EndDateTimeParts[2])));
                    }

                    /////CurrentDate
                    var CurrentStringDate = _oDateTime.GetDateAndTime();
                    var currentDateParts = CurrentStringDate.split("-");
                    var tempParts = currentDateParts[2].split(" ");
                    var currentTimeParts = tempParts[1].split(":");
                    var CurrentDate = new Date((parseInt(tempParts[0])), (parseInt(currentDateParts[1] - 1)), (parseInt(currentDateParts[0])), (parseInt(currentTimeParts[0])), (parseInt(currentTimeParts[1])), (parseInt(currentTimeParts[2])));

                    var CurrentStringTime = _oDateTime.GetTime();
                    var startParts = (Shift.StartTime).split(":");
                    var currentParts = CurrentStringTime.split(":");
                    var endParts = (Shift.EndTime).split(":");

                    var StartTime = ((parseInt(startParts[0] * 3600)) + (parseInt(startParts[1] * 60)) + (parseInt(startParts[2])));
                    var CurrentTime = ((parseInt(currentParts[0] * 3600)) + (parseInt(currentParts[1] * 60)) + (parseInt(currentParts[2])));
                    var EndTime = ((parseInt(endParts[0] * 3600)) + (parseInt(endParts[1] * 60)) + parseInt(endParts[2]));

                    if (StartDate <= CurrentDate && (CurrentDate <= EndDate || EndDate == "" || EndDate == undefined || EndDate == "Invalid Date")) {

                        ///case 1-  StartTime > EndTime (20 > 02 )
                        if (StartTime > EndTime) {
                            ////case -A1 ////20 <= 21, 21 <= 02
                            if (StartTime <= CurrentTime) {
                                // end = '23:59:59';
                                EndTime = (parseInt(23) * 3600 + parseInt(59) * 60 + parseInt(59));


                                if (CurrentTime <= EndTime)
                                    IsCurrentShift = true;  //////// return true;

                            }
                                ////case -A2 ////20 <= 01, 01 <= 02
                            else {
                                ///start = "00:00:00";
                                StartTime = parseInt('0');
                                if (StartTime <= CurrentTime && CurrentTime <= EndTime)
                                    IsCurrentShift = true;    //////// return true;
                            }
                        }

                            ///case 2-  StartTime < EndTime (08 > 14 )    
                        else if (StartTime <= CurrentTime && CurrentTime <= EndTime) {
                            IsCurrentShift = true;             //////// return true;
                        }
                    }

                    OneViewConsole.Debug("IsCurrentShift End", "LVPageComponent.IsCurrentShift");

                    return IsCurrentShift;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            this.SaveShift = function (selectedShift) {
                try {
                    OneViewConsole.Debug("SaveShift Start", "LVPageComponent.SaveShift");

                    var _oLVShiftHandler = new LVShiftHandler().SaveInSession(selectedShift.id, selectedShift.text);

                    OneViewConsole.Debug("SaveShift End", "LVPageComponent.SaveShift");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.SaveShift", xlatService);
                }
            }

            this.SnapRemoteClose = function () {
                try {
                    OneViewConsole.Debug("SnapRemoteClose Start", "LVPageComponent.SnapRemoteClose");

                    var _oRightPanelComponent = oLVFactory.GetRightPanelComponent(MyInstance.RightPanelComponentKey);
                    _oRightPanelComponent.SnapRemoteClose();

                    OneViewConsole.Debug("SnapRemoteClose End", "LVPageComponent.SnapRemoteClose");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVPageComponent.SnapRemoteClose", xlatService);
                }
            }
        }
        
        // LVShiftHandler
        function LVShiftHandler() {

            var MyInstance = this;

            this.SetCurrentShift = function () {
                try {
                    OneViewConsole.Debug("SetCurrentShift Start", "LVShiftHandler.SetCurrentShift");

                    //alert('GlobalShiftId 1  : ' + GlobalShiftId);

                    var oDateTime = new DateTime();
                    var DCDateTime = oDateTime.GetDateAndTime(); // CurrentDateTime : (dd-mm-yyyy hh:mm:ss)
                    DCDateTime = oDateTime.ConvertDateTimeToInteger(DCDateTime);

                    var _oShiftMasterDAO = new ShiftMasterDAO();
                    if (GlobalShiftId == "" || GlobalShiftId == undefined || GlobalShiftId == null) {
                        var ShiftList = _oShiftMasterDAO.GetValidShiftByService(OneViewSessionStorage.Get("ServiceId"), DCDateTime);
                        if (ShiftList.length > 0) {
                            GlobalShiftId = ShiftList[0].ServerId;
                            OneViewLocalStorage.Save("GlobalShiftId", GlobalShiftId);
                        }
                    }

                    var ShiftDetailsList = _oShiftMasterDAO.GetShiftDetailsForSelectedShift(GlobalShiftId);

                    if (ShiftDetailsList == null || ShiftDetailsList.length == 0) {
                        OneViewSessionStorage.Save("CurrentShiftId", 0);
                        OneViewSessionStorage.Save("CurrentShiftName", "");
                    }
                    else {
                        for (var itr = 0; itr < ShiftDetailsList.length ; itr++) {
                            if (IsCurrentShift(ShiftDetailsList[itr])) {
                                OneViewSessionStorage.Save("CurrentShiftId", ShiftDetailsList[itr].ServerId);
                                OneViewSessionStorage.Save("CurrentShiftName", ShiftDetailsList[itr].Name);
                            }
                        }
                    }

                    //alert('GlobalShiftId 2  : ' + GlobalShiftId);

                    OneViewConsole.Debug("SetCurrentShift End", "LVShiftHandler.SetCurrentShift");
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            this.GetCurrentShift = function () {
                try {
                    OneViewConsole.Debug("GetCurrentShift Start", "LVShiftHandler.GetCurrentShift");

                    //alert('GlobalShiftId 1  : ' + GlobalShiftId);

                    var oDateTime = new DateTime();
                    var DCDateTime = oDateTime.GetDateAndTime(); // CurrentDateTime : (dd-mm-yyyy hh:mm:ss)
                    DCDateTime = oDateTime.ConvertDateTimeToInteger(DCDateTime);

                    var _oShiftMasterDAO = new ShiftMasterDAO();
                    if (GlobalShiftId == "" || GlobalShiftId == undefined || GlobalShiftId == null) {
                        var ShiftList = _oShiftMasterDAO.GetValidShiftByService(OneViewSessionStorage.Get("ServiceId"), DCDateTime);
                        if (ShiftList.length > 0) {
                            GlobalShiftId = ShiftList[0].ServerId;
                            OneViewLocalStorage.Save("GlobalShiftId", GlobalShiftId);
                        }
                    }

                    var ShiftDetailsList = _oShiftMasterDAO.GetShiftDetailsForSelectedShift(GlobalShiftId);

                    var CurrentShift = { Id: 0, Name: "" };

                    if (ShiftDetailsList == null || ShiftDetailsList.length == 0) {
                        OneViewSessionStorage.Save("CurrentShiftId", 0);
                        OneViewSessionStorage.Save("CurrentShiftName", "");
                    }
                    else {
                        for (var itr = 0; itr < ShiftDetailsList.length ; itr++) {
                            if (IsCurrentShift(ShiftDetailsList[itr])) {
                                CurrentShift = { Id: ShiftDetailsList[itr].ServerId, Name: ShiftDetailsList[itr].Name };
                            }
                        }
                    }

                    return CurrentShift;

                    OneViewConsole.Debug("GetCurrentShift End", "LVShiftHandler.GetCurrentShift");
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var IsCurrentShift = function (Shift) {
                try {
                    OneViewConsole.Debug("IsCurrentShift Start", "LVShiftHandler.IsCurrentShift");

                    var IsCurrentShift = false;
                    var _oDateTime = new DateTime();
                    var EndDate = "";

                    ///////StartDate
                    //var StartDateParts = (Shift.StartDate).split("-");
                    //var tempStartDateParts = StartDateParts[2].split(" ");
                    //var StartDateTimeParts = tempStartDateParts[1].split(":");
                    //var StartDate = new Date((parseInt(tempStartDateParts[0])), (parseInt(StartDateParts[1] - 1)), (parseInt(StartDateParts[0])), (parseInt(StartDateTimeParts[0])), (parseInt(StartDateTimeParts[1])), (parseInt(StartDateTimeParts[2])));

                    ///////EndDate
                    //var EndDateParts = (Shift.EndDate).split("-");
                    //var tempEndDateParts = StartDateParts[2].split(" ");
                    //var EndDateTimeParts = tempStartDateParts[1].split(":");
                    //if (Shift.EndDate != "" || Shift.EndDate != undefined || Shift.EndDate != null || Shift.EndDate != " ") {
                    //    EndDate = new Date((parseInt(tempEndDateParts[0])), (parseInt(EndDateParts[1] - 1)), (parseInt(EndDateParts[0])), (parseInt(EndDateTimeParts[0])), (parseInt(EndDateTimeParts[1])), (parseInt(EndDateTimeParts[2])));
                    //}

                    ///////CurrentDate
                    //var CurrentStringDate = _oDateTime.GetDateAndTime();
                    //var currentDateParts = CurrentStringDate.split("-");
                    //var tempParts = currentDateParts[2].split(" ");
                    //var currentTimeParts = tempParts[1].split(":");
                    //var CurrentDate = new Date((parseInt(tempParts[0])), (parseInt(currentDateParts[1] - 1)), (parseInt(currentDateParts[0])), (parseInt(currentTimeParts[0])), (parseInt(currentTimeParts[1])), (parseInt(currentTimeParts[2])));

                    var CurrentStringTime = _oDateTime.GetTime();
                    var startParts = (Shift.StartTime).split(":");
                    var currentParts = CurrentStringTime.split(":");
                    var endParts = (Shift.EndTime).split(":");

                    var StartTime = ((parseInt(startParts[0] * 3600)) + (parseInt(startParts[1] * 60)) + (parseInt(startParts[2])));
                    var CurrentTime = ((parseInt(currentParts[0] * 3600)) + (parseInt(currentParts[1] * 60)) + (parseInt(currentParts[2])));
                    var EndTime = ((parseInt(endParts[0] * 3600)) + (parseInt(endParts[1] * 60)) + parseInt(endParts[2]));

                    //if (StartDate <= CurrentDate && (CurrentDate <= EndDate || EndDate == "" || EndDate == undefined || EndDate == "Invalid Date")) {

                        ///case 1-  StartTime > EndTime (20 > 02 )
                        if (StartTime > EndTime) {
                            ////case -A1 ////20 <= 21, 21 <= 02
                            if (StartTime <= CurrentTime) {
                                // end = '23:59:59';
                                EndTime = (parseInt(23) * 3600 + parseInt(59) * 60 + parseInt(59));


                                if (CurrentTime <= EndTime)
                                    IsCurrentShift = true;  //////// return true;

                            }
                                ////case -A2 ////20 <= 01, 01 <= 02
                            else {
                                ///start = "00:00:00";
                                StartTime = parseInt('0');
                                if (StartTime <= CurrentTime && CurrentTime <= EndTime)
                                    IsCurrentShift = true;    //////// return true;
                            }
                        }

                            ///case 2-  StartTime < EndTime (08 > 14 )    
                        else if (StartTime <= CurrentTime && CurrentTime <= EndTime) {
                            IsCurrentShift = true;             //////// return true;
                        }
                    //}

                    OneViewConsole.Debug("IsCurrentShift End", "LVShiftHandler.IsCurrentShift");

                    return IsCurrentShift;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            this.LoadShift = function ($scope) {
                try {
                    OneViewConsole.Debug("LoadShift start", "LVShiftHandler.LoadShift");

                    //alert('GlobalShiftId 1  : ' + GlobalShiftId);

                    var oDateTime = new DateTime();
                    var DCDateTime = oDateTime.GetDateAndTime(); // CurrentDateTime : (dd-mm-yyyy hh:mm:ss)
                    DCDateTime = oDateTime.ConvertDateTimeToInteger(DCDateTime);

                    var _oShiftMasterDAO = new ShiftMasterDAO();
                    if (GlobalShiftId == "" || GlobalShiftId == undefined || GlobalShiftId == null) {
                        var ShiftList = _oShiftMasterDAO.GetValidShiftByService(OneViewSessionStorage.Get("ServiceId"), DCDateTime);
                        //alert('ShiftList : ' + JSON.stringify(ShiftList));
                        if (ShiftList.length > 0) {
                            GlobalShiftId = ShiftList[0].ServerId;
                            OneViewLocalStorage.Save("GlobalShiftId", GlobalShiftId);
                        }
                        else {
                            OneViewSessionStorage.Save("CurrentShiftId", 0);
                            OneViewSessionStorage.Save("CurrentShiftName", "");
                            $scope.DivShift = false;
                        }
                    }

                    if (GlobalShiftId != "" && GlobalShiftId != undefined && GlobalShiftId != null) {
                        var ShiftDetailsList = _oShiftMasterDAO.GetShiftDetailsForSelectedShift(GlobalShiftId);
                        var IsCurrent = false;

                        $scope.chkShift = {
                            text: "Select Shift", id: '0'
                        };

                        if (ShiftDetailsList == null || ShiftDetailsList.length == 0) {
                            OneViewSessionStorage.Save("CurrentShiftId", 0);
                            OneViewSessionStorage.Save("CurrentShiftName", "");
                            $scope.DivShift = false;
                        }

                        else {
                            for (var i = 0; i < ShiftDetailsList.length ; i++) {
                                IsCurrent = IsCurrentShift(ShiftDetailsList[i]);

                                if (IsCurrent == true) {
                                    $scope.chkShift = {
                                        text: ShiftDetailsList[i].Name, id: ShiftDetailsList[i].ServerId
                                    };

                                    MyInstance.SaveInSession(ShiftDetailsList[i].ServerId, ShiftDetailsList[i].Name);
                                }

                                $scope.ShiftOptions.push({ id: ShiftDetailsList[i].ServerId, text: ShiftDetailsList[i].Name });

                                IsCurrent = false;
                            }

                            $scope.DivShift = true;
                        }
                    }

                    //alert('GlobalShiftId 2  : ' + GlobalShiftId);

                    OneViewConsole.Debug("LoadShift end", "LVShiftHandler.LoadShift");

                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVShiftHandler.LoadShift", Excep);
                }
                finally {
                    _oShiftMasterDAO = null;
                    ShiftDetailsList = null;
                }
            }

            this.SaveInSession = function (Id, Name) {
                try {
                    OneViewConsole.Debug("SaveInSession start", "LVShiftHandler.SaveInSession");

                    OneViewSessionStorage.Save("CurrentShiftId", Id);
                    OneViewSessionStorage.Save("CurrentShiftName", Name);

                    OneViewConsole.Debug("SaveInSession end", "LVShiftHandler.SaveInSession");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVShiftHandler.SaveInSession", Excep);
                }
                finally {
                }
            }

            this.SetAndSaveShift = function (Id, Name) {
                try {
                    OneViewConsole.Debug("SetAndSaveShift start", "LVShiftHandler.SetAndSaveShift");

                    if (Id == 0) {
                        LVscope.chkShift = {
                            text: "Select Shift", id: '0'
                        };
                    }
                    else {
                        LVscope.chkShift = {
                            text: Name, id: Id
                        };
                    }

                    MyInstance.SaveInSession(Id, Name);
                    OneViewConsole.Debug("SetAndSaveShift end", "LVShiftHandler.SetAndSaveShift");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVShiftHandler.SetAndSaveShift", Excep);
                }
                finally {
                }
            }
        }

        // LVDefaultRightPanelComponent
        function LVDefaultRightPanelComponent() {

            var MyInstance = this;
            var oLVFactory = new LVFactory();

            this.RightPanelContentId = "RightPanelContent";
            this.AttributeComponentKey = "LVDefaultAttributeComponent";
            this.ActionNCComponentKey = "LVActionNCComponent";
            this.ActionPageComponentKey = "LVDefaultActionPageComponent";
            this.LVDefaultBandControlKey = "LVDefaultBandControl";
            this.LVDefaultRadioButtonControlKey = "LVDefaultRadioButtonControl";
            this.LVNumericTextBoxControlKey = "LVDefaultNumericTextBoxControl";

            this.Load = function () {
                try {
                    OneViewConsole.Debug("Load Start", "LVDefaultRightPanelComponent.Load");

                    var _oOneViewSidePanel = new OneViewSidePanel(LVsnapRemote);
                    _oOneViewSidePanel.Clear();

                    var Html =     '<div class="bar bar-header no-padding">' +
                                       '<div class="button-bar my-audit">' +
                                            '<a class="button button-clear" id="Tab_1" ng-click="RightPanelTabClick(' + LVRightPanelTab.Comments + ')"><i class="icon icon-comments"></i> {{"Comments" | xlat}}</a>' +
                                            '<a class="button button-clear" id="Tab_2" ng-click="RightPanelTabClick(' + LVRightPanelTab.Action + ')"><i class="icon icon-edit"></i> {{"Action" | xlat}}</a>' +                                            
                                            
                                       '</div>'+
                                   '</div>' +
                                   '<div class="scroll-content has-header has-footer action" style="background: #eef3f5;">' +
                                       '<div class="full-height scrollable" id="RightPanelContent">' +
                                       '</div>' +
                                    '</div>' +
                                    '<div class="bar bar-footer no-padding">' +
                                        '<div class="row">' +
                                            '<div class="col"><a class="button button-block button-clear" ng-click="CloseRightPanel()"><i class="icon icon-cancel-circle"></i> {{"Close" | xlat}}</a></div>' +
                                            //'<div class="col"><a class="button button-block button-clear" ng-click="RightPanelSave()"><i class="icon ion-close-round"></i>Save</a></div>' +
                                        '</div>' +                                   
                                    '</div>';


                    if (OneViewSessionStorage.Get("ServiceId") == 13) {
                        Html = '<div class="bar bar-header no-padding">' +
                                      '<div class="button-bar my-audit">' +
                                           '<a class="button button-clear" id="Tab_1" ng-click="RightPanelTabClick(' + LVRightPanelTab.Comments + ')"><i class="icon icon-comments"></i> {{"Comments" | xlat}}</a>' +
                                           '<a class="button button-clear" id="Tab_2" ng-click="RightPanelTabClick(' + LVRightPanelTab.Action + ')"><i class="icon icon-edit"></i> {{"Action" | xlat}}</a>' +
                                           '<a class="button button-clear" id="Tab_3" ng-click="RightPanelTabClick(' + LVRightPanelTab.ActionInfo + ')"><i class="icon icon-edit"></i> {{"ActionInfo" | xlat}}</a>' +

                                      '</div>' +
                                  '</div>' +
                                  '<div class="scroll-content has-header has-footer action" style="background: #eef3f5;">' +
                                      '<div class="full-height scrollable" id="RightPanelContent">' +
                                      '</div>' +
                                   '</div>' +
                                   '<div class="bar bar-footer no-padding">' +
                                       '<div class="row">' +
                                           '<div class="col"><a class="button button-block button-clear" ng-click="CloseRightPanel()"><i class="icon icon-cancel-circle"></i> {{"Close" | xlat}}</a></div>' +
                                           //'<div class="col"><a class="button button-block button-clear" ng-click="RightPanelSave()"><i class="icon ion-close-round"></i>Save</a></div>' +
                                       '</div>' +
                                   '</div>';
                    }


                    // Todo(Added by Sangeeta Bhatt(19-05-2017) : Need to change, temporarily enabled for Elcita Services for different predefined action loading)
                    else if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 18 && OneViewSessionStorage.Get("TemplateId") == 625) {
                        Html = '<div class="bar bar-header no-padding">' +
                                      '<div class="button-bar my-audit">' +
                                           '<a class="button button-clear" id="Tab_1" ng-click="RightPanelTabClick(' + LVRightPanelTab.Comments + ')"><i class="icon icon-comments"></i> {{"Comments" | xlat}}</a>' +
                                           '<a class="button button-clear" id="Tab_2" ng-click="RightPanelTabClick(' + LVRightPanelTab.Action + ')"><i class="icon icon-edit"></i> {{"Action" | xlat}}</a>' +
                                           '<a class="button button-clear" id="Tab_3" ng-click="RightPanelTabClick(' + LVRightPanelTab.ActionInfo + ')"><i class="icon icon-edit"></i> {{"ActionInfo" | xlat}}</a>' +

                                      '</div>' +
                                  '</div>' +
                                  '<div class="scroll-content has-header has-footer action" style="background: #eef3f5;">' +
                                      '<div class="full-height scrollable" id="RightPanelContent">' +
                                      '</div>' +
                                   '</div>' +
                                   '<div class="bar bar-footer no-padding">' +
                                       '<div class="row">' +
                                           '<div class="col"><a class="button button-block button-clear" ng-click="CloseRightPanel()"><i class="icon icon-cancel-circle"></i> {{"Close" | xlat}}</a></div>' +
                                           //'<div class="col"><a class="button button-block button-clear" ng-click="RightPanelSave()"><i class="icon ion-close-round"></i>Save</a></div>' +
                                       '</div>' +
                                   '</div>';
                    }
                    var _oOneViewCompiler = new OneViewCompiler();
                    _oOneViewCompiler.CompileAndApeend(LVscope, LVcompile, Html, "divAutocomplatePopUp");

                    OneViewConsole.Debug("Load End", "LVDefaultRightPanelComponent.Load");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.Load", Excep);
                }
            }

            this.Open = function (HeaderId, IsTabClick) {
                try {
                    OneViewConsole.Debug("Open Start", "LVDefaultRightPanelComponent.Open");

                    MyInstance.Load();
                    
                    var IsOpenRightPanel = true;
                    var ActionNCConfigList;
                    
                    if (HeaderId == 1) {
                        LoadInnerContent(HeaderId);

                        var oAttributeComponent = oLVFactory.GetAttributeComponent(MyInstance.AttributeComponentKey);
                        LVscope.CommentsRightPanel = oAttributeComponent.GetComments(LVCurrentAttributeId);
                    }
                    else if (HeaderId == 2) {
                        _oLVFactory = new LVFactory();
                        var _oActionNCComponent = oLVFactory.GetActionNCComponent(MyInstance.ActionNCComponentKey);
                        ActionNCConfigList = _oActionNCComponent.CheckActionNC(LVCurrentAttributeId, IsTabClick);
                        
                        if (ActionNCConfigList == undefined || (ActionNCConfigList != undefined && ActionNCConfigList.length == 0)) {
                            IsOpenRightPanel = false;                           
                        }
                        else if (ActionNCConfigList != undefined && ActionNCConfigList.length > 1) {
                            alert("LVDefaultRightPanelComponent.Open actions for multiple rules : Not implemented exception");
                        }
                        else if (ActionNCConfigList[0].IsRuleViolated == true) {

                            LoadInnerContent(HeaderId, ActionNCConfigList);

                            var _oActionPageComponent = oLVFactory.GetActionPageComponent(MyInstance.ActionPageComponentKey);
                            _oActionPageComponent.Load(ActionNCConfigList, LVCurrentAttributeId, LVCurrentControlId);
                        }
                    }
                    else if (HeaderId == 3) {
                        LoadInnerContent(HeaderId);

                        var oAttributeComponent = oLVFactory.GetAttributeComponent(MyInstance.AttributeComponentKey);
                        LVscope.CommentsRightPanel = oAttributeComponent.GetComments(LVCurrentAttributeId);
                    }

                    if (IsTabClick != true && IsOpenRightPanel == true) {
                        
                        if (HeaderId == 2) {

                            var Title = LVxlatService.xlat('MannualNCConfirmBoxHeader');
                            var Message = ActionNCConfigList[0].CriteriaDisplayLabelKey;

                            if (Message != "") {
                                
                                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                                oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                                    if (ConfirmationId == '2') {

                                        var _oOneViewSidePanel = new OneViewSidePanel(LVsnapRemote);
                                        _oOneViewSidePanel.Toggle(LVsnapRemote);

                                        $scope.$apply();
                                    }
                                });
                            }
                            else {
                                var _oOneViewSidePanel = new OneViewSidePanel(LVsnapRemote);
                                _oOneViewSidePanel.Toggle(LVsnapRemote);
                            }
                        }
                        else {
                            var _oOneViewSidePanel = new OneViewSidePanel(LVsnapRemote);
                            _oOneViewSidePanel.Toggle(LVsnapRemote);
                        }
                    }

                    OneViewConsole.Debug("Open End", "LVDefaultRightPanelComponent.Open");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.Open", Excep);
                }
            }

            this.Close = function () {
                try {
                    OneViewConsole.Debug("Close Start", "LVDefaultRightPanelComponent.Close");

                    var _oOneViewSidePanel = new OneViewSidePanel(LVsnapRemote);
                    _oOneViewSidePanel.Toggle(LVsnapRemote);
                    MyInstance.SnapRemoteClose();

                    OneViewConsole.Debug("Close End", "LVDefaultRightPanelComponent.Close");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.Close", Excep);
                }
            }

            var LoadInnerContent = function (HeaderId, ActionNCConfigList) {
                try {
                    OneViewConsole.Debug("LoadInnerContent Start", "LVDefaultRightPanelComponent.LoadInnerContent");

                    ClearInnerContent(MyInstance.RightPanelContentId);

                    var Html = GetHtml(HeaderId, ActionNCConfigList);

                    var _oOneViewCompiler = new OneViewCompiler();
                    _oOneViewCompiler.CompileAndApeend(LVscope, LVcompile, Html, MyInstance.RightPanelContentId);

                    DeActivateAllTabs();
                    ActivateCurrentTab(HeaderId);

                    OneViewConsole.Debug("LoadInnerContent End", "LVDefaultRightPanelComponent.LoadInnerContent");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.LoadInnerContent", Excep);
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

            var DeActivateAllTabs = function () {
                try {
                    OneViewConsole.Debug("DeActivateCurrentTab Start", "LVDefaultRightPanelComponent.DeActivateCurrentTab");

                    var RegularExpressionForRemoveClass = new RegExp('(\\s|^)activated(\\s|$)');

                    for (var i = 0; i < LVRightPanelTabLength; i++) {
                        var ObservationTab = document.getElementById('Tab_' + (i + 1));
                        if (ObservationTab != null) {
                            ObservationTab.className = ObservationTab.className.replace(RegularExpressionForRemoveClass, ' ');
                        }
                    }

                    OneViewConsole.Debug("DeActivateCurrentTab End", "LVDefaultRightPanelComponent.DeActivateCurrentTab");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.DeActivateCurrentTab", Excep);
                }
            }

            var ActivateCurrentTab = function (HeaderId) {
                try {
                    OneViewConsole.Debug("ActivateCurrentTab Start", "LVDefaultRightPanelComponent.ActivateCurrentTab");

                    var NCTab = document.getElementById('Tab_' + HeaderId);
                    if (NCTab != null) {
                        NCTab.className = NCTab.className + " activated";
                    }

                    OneViewConsole.Debug("ActivateCurrentTab End", "LVDefaultRightPanelComponent.ActivateCurrentTab");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.ActivateCurrentTab", Excep);
                }
            }

            var GetHtml = function (HeaderId, ActionNCConfigList) {
                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultRightPanelComponent.GetHtml");
                   
                    
                    var Html = '';

                    // Comments Tab Html
                    if (HeaderId == 1) {
                        Html += '<div class="list comment-box">' +
                                    '<div class="item item-divider item-icon-left"><i class="icon icon-comment-o"></i> {{"Comments" | xlat}}</div>' +
                                    '<div class="item item-button-right">' +
                                        '<textarea rows="6" ng-model="CommentsRightPanel" ng-change="UpdateRightPanelComments(CommentsRightPanel)"></textarea>' +
                                        '<a class="button button-calm" ng-click="ClearComments()">{{"Clear" | xlat}}</a>' +
                                    '</div>' +
                               '</div>';
                               //'<div class="row responsive-sm dc-button-holder"><div class="col no-padding text-right"></div></div>';
                    }
                    // Action Tab Html
                    else if (HeaderId == 2) {

                        if (ActionNCConfigList.length > 1) {
                            alert("LVDefaultRightPanelComponent.GetHtml actions for multiple rules : Not implemented exception");
                        }
                        else {
                            var TemplateNodeIds = "'" + ActionNCConfigList[0].TemplateNodeIds + "'";
                            
                            var PredefinedHtml = '<tick-list multiple="true" selected-icon="icon-check">'+
                                                    '<div class="item item-divider item-icon-left">'+
                                                        '<i class="icon icon-edit"></i> {{"Predefined Actions" | xlat}}' +
                                                    '</div>'+
                                                    //'<tick-list-item ng-repeat="action in PredefinedActions" selected="{{action.selected}}" selected-icon="{{action.icon}}" model="action" on-change="PredefinedActionChanged(action)">{{action.Name}}</tick-list-item-settings>' +
                                                    '<tick-list-item-pre ng-repeat="action in PredefinedActions" selected="{{action.selected}}" selected-icon="{{action.icon}}" model="action" on-change="PredefinedActionChanged(action)" >{{action.Name}}</tick-list-item-pre>' +
                                                 '</tick-list>';

                            var CustomHtml = '<div class="list">' +
                                               '<div class="item item-divider item-icon-left">' +
                                                   '<i class="icon icon-edit"></i> {{"Custom Actions" | xlat}}' +
                                               '</div>' +
                                               '<div class="item no-padding">' +
                                                   '<div class="cus-action">' +
                                                     '<div class="list no-margin">' +
                                                       '<div class="item item-button-right" ng-repeat="CustomAction in CustomActions" style="text-overflow: inherit;white-space: normal;overflow: inherit;">' +
                                                         '{{CustomAction.label}}' +
                                                         '<a class="button button-clear hide" ng-click="DeleteCustomAction(CustomAction)"><i class="icon icon-minus-circle"></i></a>' +
                                                       '</div>' +
                                                     '</div>' +
                                                     '<div class="item item-input-inset">' +
                                                       '<label class="item-input-wrapper"><textarea msd-elastic="/n/n" ng-model="CustomAction"></textarea></label>' +
                                                       '<a class="button button-calm" ng-click="AddCustomAction(CustomAction,' + ActionNCConfigList[0].RuleId + ',' + ActionNCConfigList[0].IsNC + ',' + ActionNCConfigList[0].IsObservation + ',' + ActionNCConfigList[0].IsManual + ',' + TemplateNodeIds + ')"><i class="icon icon-plus"></i> {{"Add" | xlat}}</a>' +
                                                     '</div>' +
                                                   '</div>' +
                                               '</div>' +
                                             '</div>';

                            var MediaHtml = '<div class="list">' +
                                                '<div class="item item-divider item-icon-left">' +
                                                    '<i class="icon icon-photo"></i> {{"Add Media" | xlat}}' +
                                                '</div>' +
                                                '<div class="item">' +
                                                    '<a class="button button-block button-calm no-margin" ng-click="AttachPictureToAction(' + ActionNCConfigList[0].RuleId + ',' + ActionNCConfigList[0].IsNC + ',' + ActionNCConfigList[0].IsObservation + ',' + ActionNCConfigList[0].IsManual + ')"><i class="icon icon-camera"></i> {{"Camera" | xlat}}</a>' +
                                                    '<div class="cam-photo">' +
                                                        '<div ng-repeat="MultiMediaSubElement in ActionMultiMediaSubElements">' +
                                                            //'<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="1" id="' + ActionNCConfigList[0].RuleId + '"><img src="{{MultiMediaSubElement.LocalURL}}" alt="{{MultiMediaSubElement.AlternateName}}"></a>' +
                                                            '<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="' + Math.random() + '" id="' + ActionNCConfigList[0].RuleId + '"><img src="{{MultiMediaSubElement.LocalURL}}" alt="{{MultiMediaSubElement.AlternateName}}"></a>' +
                                                        '</div>' +
                                                    '</div>' +                                                   
                                                '</div>' +
                                            '</div>';

                            if (ActionNCConfigList[0].ActionList.length > 0 && ActionNCConfigList[0].IsCustomActionEnabled == true) {
                                Html += PredefinedHtml + CustomHtml;
                            }
                            else  if (ActionNCConfigList[0].ActionList.length > 0){
                                Html += PredefinedHtml;
                            }
                            else if (ActionNCConfigList[0].IsCustomActionEnabled == true){
                                Html += CustomHtml;
                            }
                            Html += MediaHtml;
                            //alert(Html);
                        }
                    }
                    else if (HeaderId == 3) {
                        

                        var _oActionDAO = new ActionDAO();
                        var DcList = _oActionDAO.GetLastActionInfoByAttributeId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("TemplateId"), OneViewSessionStorage.Get("DcPlaceId"), 16, -1, LVCurrentAttributeId);
                        ////Response Format =[{CustomAction:"","PreDefinedActionId":'',"PreDefinedActionName":'',"ActionFollowUpStatus":"","ActionResolveStartDate,":"","ActionResolveDate":'',"ActionFollowUpComments":'',"ActionFollowUpBySystemUserId":''}]
                        var CustomAction = "";
                        var PredefinedAction = "";
         

                        for (var i = 0; i < DcList.length; i++) {
                            var ActionStatus = "Pending";

                            if (DcList[i].ActionFollowUpStatus != "") {
                                ActionStatus = "Resolved";
                            }
                            
                            if (DcList[i].CustomAction != "") {

                              
                                 Html += '<div class="list list-view">' +
                                                   '<div class="item item-icon-right">' +
                                                      '<h1 class="no-margin" style="font-size:16px">' + DcList[i].CustomAction + '</h1>' +
                                                      '<span class="badge badge-assertive" style="font-weight: normal;background:#333;">' + ActionStatus + '</span>' +
                                                   '</div>'+
                                                 '</div>';
                             }
                             if (DcList[i].PreDefinedActionName != "" && DcList[i].PreDefinedActionName != undefined) {
                                 // alert(DcList[i].PreDefinedActionName);
                          
                                 Html += '<div class="list list-view">' +
                                                   '<div class="item item-icon-right">' +
                                                      '<h1 class="no-margin" style="font-size:16px">' + DcList[i].PreDefinedActionName + '</h1>' +
                                                      '<span class="badge badge-assertive" style="font-weight: normal;background:#333;">' + ActionStatus + '</span>' +
                                                   '</div>' +
                                                 '</div>';
                             }
                         }
                   
                        if (Html == "") {
                            Html += '<div class="list list-view"></div>';
                        }
                  

                        ///alert(Html);
                    }

                    //Html += '</div>';

                    OneViewConsole.Debug("GetHtml End", "LVDefaultRightPanelComponent.GetHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.GetHtml", Excep);
                }
            }

            this.SnapRemoteClose = function () {
                try {
                    OneViewConsole.Debug("SnapRemoteClose Start", "LVPageComponent.SnapRemoteClose");

                    var AttributeResult = LVTemplateResult[LVCurrentAttributeId];

                    var _oActionNCComponent = oLVFactory.GetActionNCComponent(MyInstance.ActionNCComponentKey);
                    var oActionNCConfigList = _oActionNCComponent.CheckActionNC(LVCurrentAttributeId, true);

                    if (oActionNCConfigList != null && oActionNCConfigList != undefined) {

                        for (var i = 0; i < oActionNCConfigList.length; i++) {

                            if (oActionNCConfigList[i].IsRuleViolated == true) {

                                var ActionResult = LVActionResult[oActionNCConfigList[i].RuleId];
                                
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

                                        if (AttributeResult != undefined) {

                                            for (var k = 0; k < AttributeResult.Answers.length; k++) {

                                                if (AttributeResult.Answers[k].ControlId == oActionNCConfigList[i].ControlId) {
                                                    //alert(JSON.stringify(AttributeResult.Answers[k]));

                                                    var ControlConfig = LVFormattedTemplateMetadata[LVCurrentAttributeId][oActionNCConfigList[i].ControlId];

                                                    if (ControlConfig != undefined) {

                                                        if (AttributeResult.Answers[k].AnswerMode == "DCListViewControlConfig" && ControlConfig.ListViewDisplay == 0) {

                                                            var _oAnswerMode = oLVFactory.GetBandControl(MyInstance.LVDefaultBandControlKey);
                                                            _oAnswerMode.ClearAnswerModel(LVCurrentAttributeId, AttributeResult.Answers[k].ControlId);
                                                        }
                                                        else if (AttributeResult.Answers[k].AnswerMode == "DCListViewControlConfig" && ControlConfig.ListViewDisplay == 1) {

                                                            var _oAnswerMode = oLVFactory.GetRadioButtonControl(MyInstance.LVDefaultRadioButtonControlKey);
                                                            _oAnswerMode.ClearAnswerModel(LVCurrentAttributeId, AttributeResult.Answers[k].ControlId);
                                                        }
                                                        else if (AttributeResult.Answers[k].AnswerMode == "DCNumericTextBoxControlConfig") {

                                                            var _oAnswerMode = oLVFactory.GetNumericTextBoxControl(MyInstance.LVNumericTextBoxControlKey);
                                                            _oAnswerMode.Clear(LVCurrentAttributeId, AttributeResult.Answers[k].ControlId);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (AttributeResult != undefined) {

                                        for (var k = 0; k < AttributeResult.Answers.length; k++) {

                                            if (AttributeResult.Answers[k].ControlId == oActionNCConfigList[i].ControlId) {
                                                //alert(JSON.stringify(AttributeResult.Answers[k]));

                                                var ControlConfig = LVFormattedTemplateMetadata[LVCurrentAttributeId][oActionNCConfigList[i].ControlId];

                                                if (AttributeResult.Answers[k].AnswerMode == "DCListViewControlConfig" && ControlConfig.ListViewDisplay == 0) {

                                                    var _oAnswerMode = oLVFactory.GetBandControl(MyInstance.LVDefaultBandControlKey);
                                                    _oAnswerMode.ClearAnswerModel(LVCurrentAttributeId, AttributeResult.Answers[k].ControlId);
                                                }
                                                else if (AttributeResult.Answers[k].AnswerMode == "DCListViewControlConfig" && ControlConfig.ListViewDisplay == 1) {

                                                    var _oAnswerMode = oLVFactory.GetRadioButtonControl(MyInstance.LVDefaultRadioButtonControlKey);
                                                    _oAnswerMode.ClearAnswerModel(LVCurrentAttributeId, AttributeResult.Answers[k].ControlId);
                                                }
                                                else if (AttributeResult.Answers[k].AnswerMode == "DCNumericTextBoxControlConfig") {

                                                    var _oAnswerMode = oLVFactory.GetNumericTextBoxControl(MyInstance.LVNumericTextBoxControlKey);
                                                    _oAnswerMode.Clear(LVCurrentAttributeId, AttributeResult.Answers[k].ControlId);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    var _oLVTemplateHeaderComponent = new LVTemplateHeaderComponent();
                    _oLVTemplateHeaderComponent.Update();

                    OneViewConsole.Debug("SnapRemoteClose End", "LVPageComponent.SnapRemoteClose");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRightPanelComponent.SnapRemoteClose", Excep);
                }
            }
        }
        
        // LVDefaultScoringLogicComponent
        function LVDefaultScoringLogicComponent() {

            /// <summary>
            /// Get Score based on Weightage
            /// </summary>
            /// <param name="TemplateNodeId">TemplateNodeId</param>
            /// <param name="ControlId">ControlId</param>
            /// <param name="Value">Selected value score</param>
            /// <returns>Final score based on Weightage</returns>     
            this.GetScore = function (TemplateNodeId, ControlId, Value) {
                try {
                    OneViewConsole.Debug("GetScore Start", "LVDefaultScoreCalculationComponent.GetScore");

                    var Score = 0;
                    var MaxScore = 0;
                    var TotalCount = 0;
                    var CompletedCount = 0;
                    var CompletedAttributeCount = 0;
                    var TotalAttributeCount = 0;

                    if (LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVFormattedTemplateMetadata[TemplateNodeId][ControlId] != undefined) {

                        var Weightage = LVFormattedTemplateMetadata[TemplateNodeId][ControlId].Weightage;
                        Weightage = (Weightage != undefined) ? Weightage : 0;

                        Score = Weightage * Value;                       
                        MaxScore = (LVFormattedTemplateMetadata[TemplateNodeId][ControlId].MaxScore != undefined) ? LVFormattedTemplateMetadata[TemplateNodeId][ControlId].MaxScore : 0;
                    }
                   
                    return {
                        "CompletedCount": CompletedCount,
                        "TotalCount": TotalCount,
                        "Score": Score,
                        "MaxScore": MaxScore,
                        "Percentage": (MaxScore > 0) ? ((Score / MaxScore) * 100).toFixed(2) : 0,
                        "CompletedAttributeCount": CompletedAttributeCount,
                        "TotalAttributeCount": TotalAttributeCount
                    };
                   
                    OneViewConsole.Debug("GetScore End", "LVDefaultScoreCalculationComponent.GetScore");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultScoreCalculationComponent.GetScore", Excep);
                }
            }

            /// <summary>
            /// Update Parent Score
            /// </summary>
            /// <param name="ParentNode">ParentNode</param>               
            this.UpdateParentScore = function (ParentNode) {
                try {
                    OneViewConsole.Debug("UpdateParentScore Start", "LVDefaultScoreCalculationComponent.UpdateParentScore");

                    if (ParentNode.IsAttributeGroup == true) {
                        var Score = 0;
                        for (var i = 0; i < ParentNode.Childs.length; i++) {
                            if (LVTemplateResult[ParentNode.Childs[i].Id] != undefined)
                                Score += LVTemplateResult[ParentNode.Childs[i].Id].Answers[0].Score;
                        }
                        if (LVTemplateResult[ParentNode.Id] != undefined) {
                            LVTemplateResult[ParentNode.Id].Answers[0].Score = Score;
                            LVTemplateResult[ParentNode.Id].Answers[0].IsModified = true;
                        }
                        if (ParentNode.Parent != undefined) {
                            this.UpdateParentScore(ParentNode.Parent);
                        }
                    }

                    OneViewConsole.Debug("UpdateParentScore End", "LVDefaultScoreCalculationComponent.UpdateParentScore");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultScoreCalculationComponent.UpdateParentScore", Excep);
                }                
            }
        }

        // LVDefaultActualTimeComponent
        function LVDefaultActualTimeComponent() {

            var MyInstance = this;

            this.GetHtml = function (TemplateNodeId) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultActualTimeComponent.GetHtml");

                    var ESTTime = MyInstance.GetESTDisplayTime(MyInstance.GetESTTime(TemplateNodeId), TemplateNodeId);
                    var ActualTime = MyInstance.GetActualTime(TemplateNodeId);
                    ActualTime = MyInstance.GetESTDisplayTime(ActualTime, TemplateNodeId);
                    ActualTime = (ActualTime != 0) ? ActualTime : "";
                   
                    var Html = '';
                    Html += '<div class="row responsive-md" id="ActualTimeBlock_' + TemplateNodeId + '"><div class="col">';
                    Html += '<div>Actual Time (Minutes) (Estimated Time : ' + ESTTime + ' Minutes)</div><label>';
                    if (LVTemplateResult[TemplateNodeId] != undefined && (LVTemplateResult[TemplateNodeId].NA != true && LVTemplateResult[TemplateNodeId].IsBlocker != true)) {
                        Html += '<input value="' + ActualTime + '" id="ActualTime_' + TemplateNodeId + '" type="tel" oninput="new LVDefaultActualTimeComponent().UpdateModel(' + TemplateNodeId + ',this)"/>';
                    }
                    else {
                        Html += '<input value="' + ActualTime + '" id="ActualTime_' + TemplateNodeId + '" type="tel" oninput="new LVDefaultActualTimeComponent().UpdateModel(' + TemplateNodeId + ',this)" disabled/>';
                    }
                    Html += '</label></div></div>';
               
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultActualTimeComponent.GetHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActualTimeComponent.GetHtml", Excep);
                }
            }

            this.UpdateModel = function (TemplateNodeId, DOMObj) {

                try {
                    OneViewConsole.Debug("UpdateModel Start", "LVDefaultActualTimeComponent.UpdateModel");

                    if (LVTemplateResult[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA != true) {

                        var ActualTime = DOMObj.value.trim();                       
                        ActualTime = new LVSpecialCharacterValidationComponent().RemoveSpecialCharacters(ActualTime);

                        if (MyInstance.Validate(ActualTime)) {

                            LVTemplateResult[TemplateNodeId].ActualTime = MyInstance.ConvertActualTime(ActualTime, TemplateNodeId);
                            
                            for (var i = 0; i < LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                                LVTemplateResult[TemplateNodeId].Answers[i].IsModified = true;
                            }
                        }
                        else {                           
                            var PreviousActualTime = MyInstance.GetESTDisplayTime(LVTemplateResult[TemplateNodeId].ActualTime, TemplateNodeId);
                            DOMObj.value = (PreviousActualTime != 0) ? PreviousActualTime : "";
                        }
                    }

                    //alert(JSON.stringify(LVTemplateResult[TemplateNodeId]));

                    OneViewConsole.Debug("UpdateModel End", "LVDefaultActualTimeComponent.UpdateModel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultActualTimeComponent.UpdateModel", LVxlatService);
                }
            }

            this.Clear = function (TemplateNodeId) {

                try {
                    OneViewConsole.Debug("Clear Start", "LVDefaultActualTimeComponent.Clear");

                    if (LVTemplateResult[TemplateNodeId] != undefined) {

                        LVTemplateResult[TemplateNodeId].ActualTime = 0;

                        for (var i = 0; i < LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                            LVTemplateResult[TemplateNodeId].Answers[i].IsModified = true;
                        }
                    }

                    var _oDOM = new DOM();
                    _oDOM.Clear("ActualTime_" + TemplateNodeId);

                    OneViewConsole.Debug("Clear End", "LVDefaultActualTimeComponent.Clear");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActualTimeComponent.Clear", Excep);
                }              
            }

            this.Disable = function (TemplateNodeId) {

                try {
                    OneViewConsole.Debug("Disable Start", "LVDefaultActualTimeComponent.Disable");

                    var _oDOM = new DOM();
                    _oDOM.Disable("ActualTime_" + TemplateNodeId);

                    OneViewConsole.Debug("Disable End", "LVDefaultActualTimeComponent.Disable");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActualTimeComponent.Disable", Excep);
                }
                finally {
                }
            }

            this.Enable = function (TemplateNodeId) {

                try {
                    OneViewConsole.Debug("Enable Start", "LVDefaultActualTimeComponent.Enable");

                    var _oDOM = new DOM();
                    _oDOM.Enable("ActualTime_" + TemplateNodeId);

                    OneViewConsole.Debug("Enable End", "LVDefaultActualTimeComponent.Enable");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActualTimeComponent.Enable", Excep);
                }
                finally {
                }
            }

            this.IsESTEnabled = function (TemplateNodeId) {

                try {
                    OneViewConsole.Debug("IsESTEnabled start", "LVDefaultActualTimeComponent.IsESTEnabled");

                    var IsESTEnabled = false;
                   
                    if (LVFormattedTemplateMetadata != null && LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVFormattedTemplateMetadata[TemplateNodeId].IsESTEnabled != undefined) {
                        IsESTEnabled = LVFormattedTemplateMetadata[TemplateNodeId].IsESTEnabled;
                    }

                    OneViewConsole.Debug("IsESTEnabled start", "LVDefaultActualTimeComponent.IsESTEnabled");

                    return IsESTEnabled;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActualTimeComponent.IsESTEnabled", Excep);
                }
            }

            this.GetActualTime = function (TemplateNodeId) {

                try {
                    OneViewConsole.Debug("GetActualTime start", "LVDefaultActualTimeComponent.GetActualTime");

                    var ActualTime = 0;

                    if (LVTemplateResult[TemplateNodeId] != undefined) {
                        ActualTime = LVTemplateResult[TemplateNodeId].ActualTime;                        
                    }

                    OneViewConsole.Debug("GetActualTime start", "LVDefaultActualTimeComponent.GetActualTime");

                    return ActualTime;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActualTimeComponent.GetActualTime", Excep);
                }
            }

            this.ConvertActualTime = function (ActualTime, TemplateNodeId) {

                try {
                    OneViewConsole.Debug("ConvertActualTime start", "LVDefaultActualTimeComponent.ConvertActualTime");

                    var FinalActualTime = 0;

                    if (LVFormattedTemplateMetadata != null && LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVFormattedTemplateMetadata[TemplateNodeId].ESTDisplayTimeMode != undefined) {
                        if (LVFormattedTemplateMetadata[TemplateNodeId].ESTDisplayTimeMode == 1) {
                            FinalActualTime = ActualTime * 60;
                        }
                    }

                    OneViewConsole.Debug("ConvertActualTime start", "LVDefaultActualTimeComponent.ConvertActualTime");

                    return FinalActualTime;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActualTimeComponent.ConvertActualTime", Excep);
                }
            }

            this.GetESTTime = function (TemplateNodeId) {

                try {
                    OneViewConsole.Debug("GetESTTime start", "LVDefaultActualTimeComponent.GetESTTime");

                    var ESTTime = 0;

                    if (LVFormattedTemplateMetadata != null && LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVFormattedTemplateMetadata[TemplateNodeId].ESTTime != undefined) {
                        ESTTime = LVFormattedTemplateMetadata[TemplateNodeId].ESTTime;
                    }

                    OneViewConsole.Debug("GetESTTime start", "LVDefaultActualTimeComponent.GetESTTime");

                    return ESTTime;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActualTimeComponent.GetESTTime", Excep);
                }
            }

            this.GetESTDisplayTime = function (Time, TemplateNodeId) {

                try {
                    OneViewConsole.Debug("GetESTDisplayTime start", "LVDefaultActualTimeComponent.GetESTDisplayTime");

                    var DisplayTime = 0;

                    if (LVFormattedTemplateMetadata != null && LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVFormattedTemplateMetadata[TemplateNodeId].ESTDisplayTimeMode != undefined) {
                        if (LVFormattedTemplateMetadata[TemplateNodeId].ESTDisplayTimeMode == 1) {
                            DisplayTime = Time / 60;
                        }
                        else {
                            alert("Not implemented exception, ESTDisplayTimeMode = " + LVFormattedTemplateMetadata[TemplateNodeId].ESTDisplayTimeMode + " ,LVDefaultActualTimeComponent.GetESTDisplayTime");
                        }
                    }

                    OneViewConsole.Debug("GetESTDisplayTime start", "LVDefaultActualTimeComponent.GetESTDisplayTime");

                    return DisplayTime;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActualTimeComponent.GetESTDisplayTime", Excep);
                }
            }

            this.Validate = function (ActualTime) {

                try {
                    OneViewConsole.Debug("Validate Start", "LVDefaultActualTimeComponent.Validate");

                    var RegExp = /^\d*\.?\d*$/;
                    return RegExp.test(ActualTime);
                    
                    OneViewConsole.Debug("Validate End", "LVDefaultActualTimeComponent.Validate");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActualTimeComponent.Validate", Excep);
                }
            }
        }

        // LVDefaultBreadCrumbComponent
        function LVDefaultBreadCrumbComponent() {

            this.CreateNode = function (ArrayIndex, AttributeGroupId, AttributeGroupName, TotalAttributes, PendingAttributes, IsCompleted) {

                try {
                    OneViewConsole.Debug("CreateNode Start", "LVDefaultBreadCrumbComponent.CreateNode");

                    LVBreadCrumbDetails.push(
                        {
                            "ArrayIndex": ArrayIndex,
                            "AttributeGroupId": AttributeGroupId,
                            "AttributeGroupName": AttributeGroupName,
                            "TotalAttributes": TotalAttributes,
                            "PendingAttributes": PendingAttributes,
                            "IsCompleted": IsCompleted
                        }
                    );

                    OneViewConsole.Debug("CreateNode End", "LVDefaultBreadCrumbComponent.CreateNode");
                }
                catch(Excep){                   
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBreadCrumbComponent.CreateNode", Excep);
                }
            }

            this.UpdateUI = function (TepmlateName, LVBreadCrumbId) {

                try {
                    OneViewConsole.Debug("UpdateUI Start", "LVDefaultBreadCrumbComponent.UpdateUI");

                    var Html = "";
                    for (var i = 0; i < LVBreadCrumbDetails.length; i++) {
                        Html += " -> " + LVBreadCrumbDetails[i].AttributeGroupName;
                    }

                    var oDOM = new DOM();
                    oDOM.AddInnerHtml(LVBreadCrumbId, TepmlateName + Html);

                    OneViewConsole.Debug("UpdateUI End", "LVDefaultBreadCrumbComponent.UpdateUI");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBreadCrumbComponent.UpdateUI", Excep);
                }
            }

            this.RemoveLastNode = function () {

                try {
                    OneViewConsole.Debug("RemoveLastNode Start", "LVDefaultBreadCrumbComponent.RemoveLastNode");

                    LVBreadCrumbDetails.pop();

                    OneViewConsole.Debug("RemoveLastNode End", "LVDefaultBreadCrumbComponent.RemoveLastNode");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBreadCrumbComponent.RemoveLastNode", Excep);
                }
            }

            this.Clear = function () {

                try {
                    OneViewConsole.Debug("Clear Start", "LVDefaultBreadCrumbComponent.Clear");

                    LVBreadCrumbDetails = [];

                    OneViewConsole.Debug("Clear End", "LVDefaultBreadCrumbComponent.Clear");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBreadCrumbComponent.Clear", Excep);
                }
            }
        }

        // LVDefaultAttributeGroupComponent
        function LVDefaultAttributeGroupComponent() {

            var MyInstance = this;

            this.BreadCrumbComponentKey = "LVDefaultBreadCrumbComponent";

            this.Load = function (ArrayIndex, AttributeGroupId, AttributeGroupName, ControlId) {

                try {
                    OneViewConsole.Debug("Load Start", "LVDefaultAttributeGroupComponent.Load");

                    //alert("ArrayIndex : " + ArrayIndex + ", AttributeGroupId : " + AttributeGroupId + ", AttributeGroupName : " + AttributeGroupName);

                    LVParentAttributeGroupId = LVCurrentAttributeGroupId;
                    LVCurrentAttributeGroupId = AttributeGroupId;

                    var _oDOM = new DOM();
                    _oDOM.RemoveInnerHtml(LVPageContentId);

                    LVPageNumber = 1;

                    //LVBreadCrumbDetails.push({ "ArrayIndex": ArrayIndex, "AttributeGroupId": AttributeGroupId, "AttributeGroupName": AttributeGroupName, TotalAttribute: 2, TotalPending: 2, IsCompleted: false });
                    var _oLVFactory = new LVFactory();
                    var oBreadCrumbComponent = _oLVFactory.GetBreadCrumbComponent(this.BreadCrumbComponentKey);
                    oBreadCrumbComponent.CreateNode(ArrayIndex, AttributeGroupId, AttributeGroupName);

                    MyInstance.CreateModel(AttributeGroupId, AttributeGroupName, ControlId);

                    var oLVPageComponent = new LVPageComponent(LVscope, LVxlatService, LVlocation, LVsnapRemote, LVcompile);
                    oLVPageComponent.RenderPage(1);
                    oLVPageComponent.RenderPage(2);

                    LVVisitedNodes.push(AttributeGroupId);
                    oBreadCrumbComponent.UpdateUI(OneViewSessionStorage.Get("TemplateName"), LVBreadCrumbId);

                    var _oLVTemplateHeaderComponent = new LVTemplateHeaderComponent();
                    _oLVTemplateHeaderComponent.Update();
                  
                    _oDOM.AddClass("ContentId", "has-footer");
                    LVscope.LVFooterPanel = true;
                    LVscope.$apply();

                    OneViewConsole.Debug("Load End", "LVDefaultAttributeGroupComponent.Load");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultAttributeGroupComponent.Load", LVxlatService);
                }
            }

            this.GetHtml = function (TemplateNode) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultAttributeGroupComponent.GetHtml");
                   
                    var Style = '';

                    if (TemplateNode.FontColor != undefined && TemplateNode.FontColor != "") {
                        Style += 'color:' + TemplateNode.FontColor;
                    }

                    var AttributeGroupHtml = '<span style="' + Style + '">' + TemplateNode.Name + '</span>';

                    OneViewConsole.Debug("GetHtml End", "LVDefaultAttributeGroupComponent.GetHtml");

                    return AttributeGroupHtml;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.GetHtml", Excep);
                }
            }

            this.GetImageHtml = function (ImageUrl) {

                try {
                    OneViewConsole.Debug("GetImageHtml Start", "LVDefaultAttributeGroupComponent.GetImageHtml");
                    
                    var ImageHtml = '';

                    OneViewConsole.Debug("GetImageHtml End", "LVDefaultAttributeGroupComponent.GetImageHtml");

                    return "";
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.GetImageHtml", Excep);
                }
            }

            this.GetStatusHtml = function (AttributeAnswerStatus, TemplateNodeId) {

                try {
                    OneViewConsole.Debug("GetStatusHtml Start", "LVDefaultAttributeGroupComponent.GetStatusHtml");

                    var Result = AttributeAnswerStatus.CompletedCount + "/" + AttributeAnswerStatus.TotalCount;
                    var ScoreStatusHtml = "";
                    var CompletedStatusHtml = "";

                    if (LVIsScoringLogicEnabled == true && IsAttributeGroupSummaryDisplayStatusEnabled("IsScorePercentageEnabed", TemplateNodeId) == true) {
                        var Percentage = AttributeAnswerStatus.Percentage;
                        if (Percentage == 100) {
                            Percentage = "100.00";
                        }
                        else if (Percentage == 0) {
                            Percentage = "0.00";
                        }
                        //ScoreStatusHtml = (AttributeAnswerStatus.Percentage == 100) ? '<span class="summary completed">' + AttributeAnswerStatus.Percentage + '%</span>' : '<span class="summary pending">' + AttributeAnswerStatus.Percentage + '%</span>';
                        ScoreStatusHtml = (AttributeAnswerStatus.Percentage == 100) ? '<span class="summary completed">' + Percentage + '%</span>' : '<span class="summary pending">' + Percentage + '%</span>';
                    }

                    if (IsAttributeGroupSummaryDisplayStatusEnabled("IsAttributeCountEnabed", TemplateNodeId) == true) {
                        CompletedStatusHtml = (AttributeAnswerStatus.CompletedCount == AttributeAnswerStatus.TotalCount) ? '<span class="summary completed">' + Result + '</span>' : '<span class="summary pending">' + Result + '</span>';
                    }

                    var StatusHtml = ScoreStatusHtml + CompletedStatusHtml;

                    OneViewConsole.Debug("GetStatusHtml End", "LVDefaultAttributeGroupComponent.GetStatusHtml");

                    return StatusHtml;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.GetStatusHtml", Excep);
                }
            }

            var IsAttributeGroupSummaryDisplayStatusEnabled = function (DisplayProperty, TemplateNodeId) {

                try {
                    OneViewConsole.Debug("IsAttributeGroupSummaryDisplayStatusEnabled Start", "LVDefaultAttributeGroupComponent.IsAttributeGroupSummaryDisplayStatusEnabled");

                    var IsSuccess = false;

                    if (LVAttributeGroupSummaryDisplayConfig != null) {

                        IsSuccess = LVAttributeGroupSummaryDisplayConfig[DisplayProperty];
                    }
                    else if (
                        LVFormattedTemplateMetadata[TemplateNodeId] != undefined &&
                        LVFormattedTemplateMetadata[TemplateNodeId].AttributeGroupSummaryDisplayConfig != undefined &&
                        LVFormattedTemplateMetadata[TemplateNodeId].AttributeGroupSummaryDisplayConfig != null
                        )
                    {
                        var AttributeGroupSummaryDisplayConfig = JSON.parse(LVFormattedTemplateMetadata[TemplateNodeId].AttributeGroupSummaryDisplayConfig);
                        IsSuccess = AttributeGroupSummaryDisplayConfig[DisplayProperty];
                    }

                    OneViewConsole.Debug("IsAttributeGroupSummaryDisplayStatusEnabled End", "LVDefaultAttributeGroupComponent.IsAttributeGroupSummaryDisplayStatusEnabled");

                    return IsSuccess;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.IsAttributeGroupSummaryDisplayStatusEnabled", Excep);
                }
            }

            this.CreateModel = function (AttributeGroupId, AttributeGroupName, ControlId) {

                try {
                    OneViewConsole.Debug("CreateModel Start", "LVDefaultAttributeGroupComponent.CreateModel");

                    if (LVTemplateResult[AttributeGroupId] == undefined) {
                        var AnswerModeObj = {
                            "ServerId": '',
                            "ClientId": '',
                            "ClientGuid": '',
                            "ControlId": ControlId,
                            "Comments": '',
                            "Answer": '',
                            "AnswerValue": '',
                            "AnswerFKType": '',
                            "AnswerDataType": '',
                            "AnswerMode": '',
                            "IsModified": true,
                            "IsManual": true,
                            "IsDynamicAttribute": false,
                            "IsDynamicAnswer": false,
                            "IndexId": 0,
                            "IsMulti": false,
                            "AutomaticDeviceId": "",
                            "Score": 0,
                            "MaxScore": 0,
                            "Percentage": 0,
                            "CompletedChildCount": 0,
                            "TotalChildCount": 0,
                            "CompletedAttributeCount": 0,
                            "TotalAttributeCount": 0,
                            "Latitude": "",
                            "Longitude": ""
                        }
                        LVTemplateResult[AttributeGroupId] = {
                            IsAttributeGroup: true,
                            NA: false,
                            IsBlocker: false,
                            Comments: "",
                            Id: AttributeGroupId,
                            Name: AttributeGroupName,
                            Answers: [],
                            ESTTime: 0,
                            ActualTime: 0,
                            IsManualESTEnabled: true,
                            MultiMediaSubElements: [],
                            ActionInfo: { ActionClientId: "", DCNCMappingClientId: "", Actions: {} },
                            IsSubmitMandatoryExist: false,
                            IsSaveMandatoryExist: false,
                            SaveMandatoryInfo: {},
                            SubmitMandatoryInfo: {}
                        }

                        LVTemplateResult[AttributeGroupId].Answers.push(AnswerModeObj);                        
                    }

                    OneViewConsole.Debug("CreateModel End", "LVDefaultAttributeGroupComponent.CreateModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.CreateModel", Excep);
                }
            }

            // ConsiderPendingAttributeScore = true => It will consider pending attribute score (Considers Only answered controls score under attribute)
            // ConsiderMaxScoreForPendingAttribute = true => It will consider max score for pending attribute (Only answered controls max score under attribute)
            this.GetSummary = function (TemplateNode, ConsiderPendingAttributeScore, ConsiderMaxScoreForPendingAttribute) {

                try {
                    OneViewConsole.Debug("GetSummary Start", "LVDefaultAttributeGroupComponent.GetSummary");

                    if (TemplateNode.Childs.length == 0) {
                        var AttributeSummary = GetAttributeSummary(TemplateNode, ConsiderPendingAttributeScore, ConsiderMaxScoreForPendingAttribute);
                        return AttributeSummary.IsAnswered ? new SummaryResult(1, 1, AttributeSummary.Score, AttributeSummary.MaxScore, 1, 1, AttributeSummary.ESTTime, AttributeSummary.ActualTime) : new SummaryResult(0, 1, AttributeSummary.Score, AttributeSummary.MaxScore, 0, 1, AttributeSummary.ESTTime, AttributeSummary.ActualTime);
                    }
                    else {
                        var CompletedCount = 0, Score = 0, MaxScore = 0, CompletedAttributeCount = 0, TotalAttributeCount = 0, ESTTime = 0, ActualTime = 0;
                        var TotalCount = TemplateNode.Childs.length;

                        for (var i = 0; i < TotalCount; i++) {

                            var Summary = MyInstance.GetSummary(TemplateNode.Childs[i], ConsiderPendingAttributeScore, ConsiderMaxScoreForPendingAttribute);

                            MaxScore += Summary.MaxScore;
                            Score += Summary.Score;
                            
                            CompletedAttributeCount += Summary.CompletedAttributeCount;
                            TotalAttributeCount += Summary.TotalAttributeCount;

                            ESTTime += Summary.ESTTime;
                            ActualTime += Summary.ActualTime;

                            if (Summary.CompletedCount == Summary.TotalCount)
                                CompletedCount++;                                                     
                        }

                        UpdateScore(TemplateNode, Score, MaxScore, CompletedCount, TotalCount, CompletedAttributeCount, TotalAttributeCount, ESTTime, ActualTime);
                        return new SummaryResult(CompletedCount, TotalCount, Score, MaxScore, CompletedAttributeCount, TotalAttributeCount, ESTTime, ActualTime);
                    }

                    OneViewConsole.Debug("GetSummary End", "LVDefaultAttributeGroupComponent.GetSummary");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.GetSummary", Excep);
                }
            }

            var SummaryResult = function (CompletedCount, TotalCount, Score, MaxScore, CompletedAttributeCount, TotalAttributeCount, ESTTime, ActualTime) {

                try {
                    OneViewConsole.Debug("SummaryResult Start", "LVDefaultAttributeGroupComponent.SummaryResult");

                    OneViewConsole.Debug("SummaryResult End", "LVDefaultAttributeGroupComponent.SummaryResult");

                    return {
                        "CompletedCount": CompletedCount,
                        "TotalCount": TotalCount,
                        "Score": Score,
                        "MaxScore": MaxScore,
                        "Percentage": (MaxScore > 0) ? ((Score == MaxScore) ? 100 : ((Score / MaxScore) * 100).toFixed(2)) : 0,
                        "CompletedAttributeCount": CompletedAttributeCount,
                        "TotalAttributeCount": TotalAttributeCount,
                        "ESTTime": ESTTime,
                        "ActualTime": ActualTime
                    };
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.SummaryResult", Excep);
                }
            }

            var GetAttributeSummary = function (TemplateNode, ConsiderPendingAttributeScore, ConsiderMaxScoreForPendingAttribute) {

                try {
                    OneViewConsole.Debug("GetAttributeSummary Start", "LVDefaultAttributeGroupComponent.GetAttributeSummary");

                    if (LVTemplateResult[TemplateNode.Id] == undefined) {

                        OneViewConsole.Debug("GetAttributeSummary End", "LVDefaultAttributeGroupComponent.GetAttributeSummary");

                        return { IsAnswered: false, Score: 0, MaxScore: (ConsiderMaxScoreForPendingAttribute == false ? GetMaxScore(TemplateNode.AnswerModes) : 0), ESTTime: 0, ActualTime: 0 };
                    }
                  
                    if (LVTemplateResult[TemplateNode.Id].NA || LVTemplateResult[TemplateNode.Id].IsBlocker) {

                        OneViewConsole.Debug("GetAttributeSummary End", "LVDefaultAttributeGroupComponent.GetAttributeSummary");

                        return { IsAnswered: true, Score: 0, MaxScore: 0, ESTTime: 0, ActualTime: 0 };
                    }

                    var Score = 0, IsPending = true, MaxScore = 0, ESTTime = 0, ActualTime = LVTemplateResult[TemplateNode.Id].ActualTime;

                    for (var i = 0; i < LVTemplateResult[TemplateNode.Id].Answers.length; i++) {
                       
                        Score += LVTemplateResult[TemplateNode.Id].Answers[i].Score;
                      
                        if (ConsiderMaxScoreForPendingAttribute == false || (ConsiderMaxScoreForPendingAttribute == true && LVTemplateResult[TemplateNode.Id].Answers[i].Answer != "")) {
                            MaxScore += LVFormattedTemplateMetadata[TemplateNode.Id][LVTemplateResult[TemplateNode.Id].Answers[i].ControlId].MaxScore;
                            ESTTime += LVFormattedTemplateMetadata[TemplateNode.Id].ESTTime;
                        }
                        //if (LVTemplateResult[TemplateNode.Id].Answers[i].Answer == "") {
                        //    IsPending = false;
                        //}

                        if (IsPending == true && LVTemplateResult[TemplateNode.Id].IsSubmitMandatoryExist == false) {
                            if (LVTemplateResult[TemplateNode.Id].Answers[i].Answer == "") {
                                IsPending = false;
                            }
                        }
                        // Need to check from TemplateConfig Metadata (SaveMandatoryInfo or SubmitMandatoryInfo for attribute answer status (Completed or pending))
                        else if (IsPending == true
                            && LVTemplateResult[TemplateNode.Id].SubmitMandatoryInfo[LVTemplateResult[TemplateNode.Id].Answers[i].ControlId] != undefined
                            && LVTemplateResult[TemplateNode.Id].SubmitMandatoryInfo[LVTemplateResult[TemplateNode.Id].Answers[i].ControlId].CurrentMandatoryStatus == false) {
                            IsPending = false;                              
                        } 
                        //else if (IsPending == true
                        //    && LVTemplateResult[TemplateNode.Id].SaveMandatoryInfo[LVTemplateResult[TemplateNode.Id].Answers[i].ControlId] != undefined
                        //    && LVTemplateResult[TemplateNode.Id].SaveMandatoryInfo[LVTemplateResult[TemplateNode.Id].Answers[i].ControlId].CurrentMandatoryStatus == false) {
                        //    IsPending = false;
                        //}
                    }

                    OneViewConsole.Debug("GetAttributeSummary End", "LVDefaultAttributeGroupComponent.GetAttributeSummary");

                    if (ConsiderPendingAttributeScore) {
                        return { "IsAnswered": IsPending, "Score": Score, "MaxScore": MaxScore, "ESTTime": ESTTime, "ActualTime": (IsPending ? ActualTime : 0) };
                    }
                    else {
                        return { "IsAnswered": IsPending, "Score": (IsPending ? Score : 0), "MaxScore": MaxScore, "ESTTime": ESTTime, "ActualTime": (IsPending ? ActualTime : 0) };
                    }
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.GetAttributeSummary", Excep);
                }              
            }

            var GetMaxScore = function (Answermodes) {

                try {
                    OneViewConsole.Debug("GetMaxScore Start", "LVDefaultAttributeGroupComponent.GetMaxScore");

                    var MaxScore = 0;

                    for (var i = 0; i < Answermodes.length; i++) {
                        MaxScore += Answermodes[i].MaxScore;
                    }

                    OneViewConsole.Debug("GetMaxScore End", "LVDefaultAttributeGroupComponent.GetMaxScore");

                    return MaxScore;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.GetMaxScore", Excep);
                }                
            }

            var GetESTTime = function (Answermodes) {

                try {
                    OneViewConsole.Debug("GetESTTime Start", "LVDefaultAttributeGroupComponent.GetESTTime");

                    var ESTTime = 0;

                    for (var i = 0; i < Answermodes.length; i++) {
                        ESTTime += Answermodes[i].ESTTime;
                    }

                    OneViewConsole.Debug("GetESTTime End", "LVDefaultAttributeGroupComponent.GetESTTime");

                    return ESTTime;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.GetESTTime", Excep);
                }
            }

            var UpdateScore = function (TemplateNode, Score, MaxScore, CompletedCount, TotalCount, CompletedAttributeCount, TotalAttributeCount, ESTTime, ActualTime) {

                try {
                    OneViewConsole.Debug("UpdateScore Start", "LVDefaultAttributeGroupComponent.UpdateScore");

                    if (LVTemplateResult[TemplateNode.Id] != undefined) {
                        LVTemplateResult[TemplateNode.Id].Answers[0].Score = Score;
                        LVTemplateResult[TemplateNode.Id].Answers[0].MaxScore = MaxScore;
                        LVTemplateResult[TemplateNode.Id].Answers[0].Percentage = (MaxScore > 0) ? ((Score / MaxScore) * 100).toFixed(2) : 0;
                        LVTemplateResult[TemplateNode.Id].Answers[0].CompletedChildCount = CompletedCount;
                        LVTemplateResult[TemplateNode.Id].Answers[0].TotalChildCount = TotalCount;
                        LVTemplateResult[TemplateNode.Id].Answers[0].CompletedAttributeCount = CompletedAttributeCount;
                        LVTemplateResult[TemplateNode.Id].Answers[0].TotalAttributeCount = TotalAttributeCount;
                        if (ESTTime > 0) {
                            LVTemplateResult[TemplateNode.Id].ESTTime = ESTTime;
                            LVTemplateResult[TemplateNode.Id].ActualTime = ActualTime;
                        }
                        LVTemplateResult[TemplateNode.Id].Answers[0].IsModified = true;
                    }

                    OneViewConsole.Debug("UpdateScore End", "LVDefaultAttributeGroupComponent.UpdateScore");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeGroupComponent.UpdateScore", Excep);
                }
            }
        }

        // LVDefaultAttributeComponent
        function LVDefaultAttributeComponent() {

            this.GetHtml = function (TemplateNode) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultAttributeComponent.GetHtml");
                   
                    var Style = '';
                    
                    if (TemplateNode.FontColor != undefined && TemplateNode.FontColor != "") {
                        Style += 'color:' + TemplateNode.FontColor;
                    }

                    var AttributeHtml = '<span style="' + Style + '">' + TemplateNode.Name + '</span>';

                    OneViewConsole.Debug("GetHtml End", "LVDefaultAttributeComponent.GetHtml");

                    return AttributeHtml;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeComponent.GetHtml", Excep);
                }
            }

            this.GetImageHtml = function (ImageUrl) {

                try {
                    OneViewConsole.Debug("GetImageHtml Start", "LVDefaultAttributeComponent.GetImageHtml");
                
                    var ImageHtml = '';

                    OneViewConsole.Debug("GetImageHtml End", "LVDefaultAttributeComponent.GetImageHtml");

                    return "";
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeComponent.GetImageHtml", Excep);
                }               
            }

            this.UpdateCommentsModel = function (TemplateNodeId, Comments) {

                try {
                    OneViewConsole.Debug("UpdateCommentsModel Start", "LVDefaultAttributeComponent.UpdateCommentsModel");

                    if(LVTemplateResult[TemplateNodeId] != undefined){
                        LVTemplateResult[TemplateNodeId].Comments = Comments;

                        for (var i = 0; i < LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                            LVTemplateResult[TemplateNodeId].Answers[i].IsModified = true;
                        }
                    }

                    OneViewConsole.Debug("UpdateCommentsModel End", "LVDefaultAttributeComponent.UpdateCommentsModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeComponent.UpdateCommentsModel", Excep);
                }
            }

            this.GetComments = function (TemplateNodeId) {

                try {
                    OneViewConsole.Debug("UpdateCommentsModel Start", "LVDefaultAttributeComponent.UpdateCommentsModel");

                    var Comments = "";

                    if (LVTemplateResult[TemplateNodeId] != undefined) {
                        Comments = LVTemplateResult[TemplateNodeId].Comments;;
                    }

                    OneViewConsole.Debug("UpdateCommentsModel End", "LVDefaultAttributeComponent.UpdateCommentsModel");

                    return Comments;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeComponent.UpdateCommentsModel", Excep);
                }
            }
        }

        // LVDefaultAnswerModeComponent
        function LVDefaultAnswerModeComponent() {

            var MyInstance = this;

            this.LVDefaultDefaultValueComponentKey = "LVDefaultDefaultValueComponent";
            this.LVDefaultTextBoxControlKey = "LVDefaultTextBoxControl";
            this.LVDefaultBandControlKey = "LVDefaultBandControl";
            this.LVDefaultRadioButtonControlKey = "LVDefaultRadioButtonControl";
            this.LVDefaultScoringLogicComponentKey = "LVDefaultScoringLogicComponent";
            this.LvDefaultImageCaptureComponenetKey = "LVDefaultCameraAnswerModeComponent";

            var oLVFactory = new LVFactory();

            this.GetHtml = function (TemplateNode, oDefaultValue, IsNew, IsVisited) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultAnswerModeComponent.GetHtml");

                    //alert("IsNew : " + IsNew + ", IsVisited : " + IsVisited + ", LVIsEdit : " + LVIsEdit);

                    var AnswerModesHtml = "";
                    var TemplateId = OneViewSessionStorage.Get("TemplateId");

                    for (var i = 0; i < TemplateNode.AnswerModes.length; i++) {

                        var Answerlst = [];
                        var AnswerModeType = TemplateNode.AnswerModes[i].Type;
                        var oAnswerMode = null;
                        var Answer = oDefaultValue.Answer;
                        var AnswerValue = oDefaultValue.AnswerValue;
                        var AnswerFKType = "";

                        if (AnswerModeType == "DCListViewControlConfig") {
                            Answerlst.push({ "Answer": Answer, "AnswerValue": AnswerValue });
                            AnswerFKType = TemplateNode.AnswerModes[i].FKType;
                        }

                        var AnswerDataType = TemplateNode.AnswerModes[i].DataType;                        
                        var ControlId = TemplateNode.AnswerModes[i].ControlId;

                        if (LVTemplateResult[TemplateNode.Id] != undefined) {

                            if (AnswerModeType == "DCListViewControlConfig") {
                                Answerlst = [];
                                for (var j = 0; j < LVTemplateResult[TemplateNode.Id].Answers.length; j++) {
                                    if (LVTemplateResult[TemplateNode.Id].Answers[j].ControlId == ControlId) {
                                        Answerlst.push({ "Answer": LVTemplateResult[TemplateNode.Id].Answers[j].Answer, "AnswerValue": LVTemplateResult[TemplateNode.Id].Answers[j].AnswerValue });
                                    }
                                }
                            }
                            else if (AnswerModeType == "DCImageCaptureControlConfig") {
                                Answerlst = [];
                                for (var j = 0; j < LVTemplateResult[TemplateNode.Id].Answers.length; j++) {
                                    if (LVTemplateResult[TemplateNode.Id].Answers[j].ControlId == ControlId) {
                                        Answer = LVTemplateResult[TemplateNode.Id].Answers[j].Answer;
                                        AnswerValue = LVTemplateResult[TemplateNode.Id].Answers[j].AnswerValue;
                                        ClientGuid = LVTemplateResult[TemplateNode.Id].Answers[j].ClientGuid;
                                        ClientId = LVTemplateResult[TemplateNode.Id].Answers[j].ClientId;
                                        Answerlst.push({ "Answer": LVTemplateResult[TemplateNode.Id].Answers[j].Answer, "AnswerValue": LVTemplateResult[TemplateNode.Id].Answers[j].AnswerValue, "ClientGuid": ClientGuid, "ClientId": ClientId });
                                        MyInstance.InitializeMultiMediaSubElementsModel(AnswerModeType, TemplateId, TemplateNode.Id, ControlId, ClientId, ClientGuid);
                                    }
                                }
                            }
                            else {
                                    for (var j = 0; j < LVTemplateResult[TemplateNode.Id].Answers.length; j++) {
                                        if (LVTemplateResult[TemplateNode.Id].Answers[j].ControlId == ControlId) {
                                            Answer = LVTemplateResult[TemplateNode.Id].Answers[j].Answer;
                                            AnswerValue = LVTemplateResult[TemplateNode.Id].Answers[j].AnswerValue;
                                        }
                                    }
                                }
                        }
                        else if ((IsNew == true && IsVisited == false && LVIsEdit == false) || LVTemplateResult[TemplateNode.Id] == undefined) {

                            var oDefaultValueComponent = oLVFactory.GetDefaultValueComponent(this.LVDefaultDefaultValueComponentKey);

                            // For control wise default value checking
                            if (oDefaultValue.Answer != "NA" && oDefaultValue.Answer == "") {

                                var ODefaultValueResponse = oDefaultValueComponent.GetDefaultValue(TemplateNode.Id, ControlId);
                                Answer = ODefaultValueResponse.Answer;
                                AnswerValue = ODefaultValueResponse.AnswerValue;
                                if (AnswerModeType == "DCListViewControlConfig") {
                                    Answerlst = [];
                                    Answerlst.push({ "Answer": Answer, "AnswerValue": AnswerValue });
                                }
                                if (AnswerModeType == "DCImageCaptureControlConfig") {
                                    Answerlst = [];
                                    Answerlst.push({ "Answer": Answer, "AnswerValue": AnswerValue, "ClientGuid": "", "ClientId": "" });
                                }
                            }

                            //CreateModel(TemplateNode.Id, TemplateNode.Name, TemplateNode.AnswerModes[i].ControlId, Answer, AnswerValue, AnswerFKType, AnswerDataType, AnswerModeType);
                        }

                        CreateModel(TemplateNode.Id, TemplateNode.Name, TemplateNode.AnswerModes[i].ControlId, Answer, AnswerValue, AnswerFKType, AnswerDataType, AnswerModeType, TemplateNode.ESTTime);

                        if (AnswerModeType == "DCTextBoxControlConfig" || AnswerModeType == "DCNumericTextBoxControlConfig") {
                            oAnswerMode = oLVFactory.GetTextBoxControl(this.LVDefaultTextBoxControlKey);
                        }
                        else if (AnswerModeType == "DCListViewControlConfig") {
                            if (TemplateNode.AnswerModes[i].ListViewDisplay == 1) {
                                oAnswerMode = oLVFactory.GetRadioButtonControl(this.LVDefaultRadioButtonControlKey);
                            }
                            else if (TemplateNode.AnswerModes[i].ListViewDataSourceConfig.Type == "BandListViewDataSourceConfig" || TemplateNode.AnswerModes[i].ListViewDataSourceConfig.Type == "_oBandListViewDataSourceConfig") {
                                oAnswerMode = oLVFactory.GetBandControl(this.LVDefaultBandControlKey);
                            }
                            else if (TemplateNode.AnswerModes[i].ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig" && TemplateNode.AnswerModes[i].ListViewDisplay === 3) {
                                oAnswerMode = new LVDefaultHtmlDropdownControl();
                            }
                        }
                        else if (AnswerModeType == "DCSignaturePadControlConfig") {
                            oAnswerMode = new LVDefaultSignatutePadControl();
                        }
                        else if (AnswerModeType == "DCImageCaptureControlConfig") {
                            oAnswerMode = new LVDefaultCameraAnswerModeComponent(TemplateNode.Id, TemplateNode.AnswerModes[i].ControlId, TemplateNode.AnswerModes[i].SelectionType);
                        }

                        if (AnswerModeType == "DCListViewControlConfig") {

                            AnswerModesHtml += (TemplateNode.AnswerModes[i].LabelKey != undefined && TemplateNode.AnswerModes[i].LabelKey != null) ? '<div>' + TemplateNode.AnswerModes[i].LabelKey + '</div>' : "";

                            if (TemplateNode.AnswerModes[i].ListViewDisplay == 1) {
                                AnswerModesHtml += oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answerlst);
                            }
                            else if (TemplateNode.AnswerModes[i].ListViewDataSourceConfig.Type == "BandListViewDataSourceConfig" || TemplateNode.AnswerModes[i].ListViewDataSourceConfig.Type == "_oBandListViewDataSourceConfig") {
                                //AnswerModesHtml += '<div class="item-input-inset">' + oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answerlst) + '</div>';
                                AnswerModesHtml += oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answerlst);
                            }
                            else if (TemplateNode.AnswerModes[i].ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig" && TemplateNode.AnswerModes[i].ListViewDisplay === 3) {
                                //var _oListViewDataSourceComponent = new ListViewDataSourceComponent();
                                //var ListViewDataSourceResponseLst = _oListViewDataSourceComponent.GetDataSource(TemplateNode.Id, ControlId);
                                var ListViewDataSourceResponseLst = oAnswerMode.GetData(TemplateNode.Id, ControlId);
                                AnswerModesHtml += oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answerlst, ListViewDataSourceResponseLst);
                            }                          
                        }
                        else if (AnswerModeType == "DCSignaturePadControlConfig") {
                            AnswerModesHtml += oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answer, AnswerValue);
                        }
                        else if (AnswerModeType == "DCImageCaptureControlConfig") {
                            AnswerModesHtml += oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answerlst)
                        }
                        else {
                            //AnswerModesHtml += '<div class="item-input-inset">' + oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answer, AnswerValue) + '</div>';
                            AnswerModesHtml += oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answer, AnswerValue);
                        }
                    }

                    OneViewConsole.Debug("GetHtml End", "LVDefaultAnswerModeComponent.GetHtml");

                    return AnswerModesHtml;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerModeComponent.GetHtml", Excep);
                }
            }
           
            this.CreateModel = function (TemplateNodeId, TemplateNodeName, ControlId, Answer, AnswerValue, AnswerFKType, AnswerDataType, AnswerMode) {

                try {
                    OneViewConsole.Debug("CreateModel Start", "LVDefaultAnswerModeComponent.CreateModel");

                    CreateModel(TemplateNodeId, TemplateNodeName, ControlId, Answer, AnswerValue, AnswerFKType, AnswerDataType, AnswerMode);

                    OneViewConsole.Debug("CreateModel End", "LVDefaultAnswerModeComponent.CreateModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerModeComponent.CreateModel", Excep);
                }
            }

            var CreateModel = function (TemplateNodeId, TemplateNodeName, ControlId, Answer, AnswerValue, AnswerFKType, AnswerDataType, AnswerMode, ESTTime) {
               
                try {
                    OneViewConsole.Debug("CreateModel Start", "LVDefaultAnswerModeComponent.CreateModel");

                    var IsNewControl = false;

                    if (LVTemplateResult[TemplateNodeId] == undefined) {
                        LVTemplateResult[TemplateNodeId] = {
                            IsAttributeGroup: false,
                            NA: false,
                            IsBlocker: false,
                            Comments: "",
                            Id: TemplateNodeId,
                            Name: TemplateNodeName,
                            Answers: [],
                            ESTTime: ESTTime,
                            ActualTime: 0,
                            IsManualESTEnabled: true,
                            //IsAnyAction: false,
                            //IsAnyNC: false,
                            //IsAnyObservation: false
                            //MultiMediaSubElements: [],
                            //ActionInfo: { ActionClientId : "", DCNCMappingClientId : "", Actions: {} }
                            IsSubmitMandatoryExist: false,
                            IsSaveMandatoryExist: false,
                            SaveMandatoryInfo: {},
                            SubmitMandatoryInfo: {}
                        }
                        IsNewControl = true;
                    }
                    else {
                        for (var i = 0; i < LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                            if (LVTemplateResult[TemplateNodeId].Answers[i].ControlId == ControlId) {
                                IsNewControl = false;
                                break;
                            }
                            else {
                                IsNewControl = true;
                            }
                        }
                    }
                    if (IsNewControl == true) {

                        // DC Result Detail Table info
                        var AnswerModeObj = {
                            "ServerId": '',
                            "ClientId": '', // Primary key of the DC Result Detail
                            "ClientGuid": '',
                            "ControlId": ControlId,
                            "Comments": '',
                            "Answer": Answer,
                            "AnswerValue": AnswerValue,
                            "AnswerFKType": AnswerFKType,
                            "AnswerDataType": AnswerDataType,
                            "AnswerMode": AnswerMode,
                            "IsModified": true,
                            "IsManual": true,
                            "IsDynamicAttribute": false,
                            "IsDynamicAnswer": false,
                            "IndexId": 0,
                            "IsMulti": false,
                            "AutomaticDeviceId": "",
                            "Score": 0,                            
                            "MaxScore": 0,
                            "Percentage": 0,
                            "CompletedChildCount": 0,
                            "TotalChildCount": 0,
                            "CompletedAttributeCount": 0,
                            "TotalAttributeCount": 0,
                            "Latitude": "",
                            "Longitude": "",
                            "ActionInfo": {}
                            //"MultiMediaSubElements": [],
                        }


                        //TODO:(Siva, 08-Mar-2017) need to remove this code with Default value component make it as platform code
                        //For a urgent release did this
                        if (OneViewSessionStorage.Get("ServiceName") == "QaaS") {
                            if (Answer == 3) {
                                AnswerModeObj.Score = 3;
                                AnswerModeObj.MaxScore = 3;
                                AnswerModeObj.Percentage = 100;
                            }
                        }
                        //else {
                        //    AnswerModeObj.Score = 0;
                        //    AnswerModeObj.MaxScore = 3;
                        //}

                        MyInstance.RefreshMandatoryInfo(TemplateNodeId, ControlId);
                        LVTemplateResult[TemplateNodeId].Answers.push(AnswerModeObj);
                        //alert(JSON.stringify(LVTemplateResult[TemplateNodeId]));
                    }

                    OneViewConsole.Debug("CreateModel End", "LVDefaultAnswerModeComponent.CreateModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerModeComponent.CreateModel", Excep);
                } 
            }

            this.UpdateAnswerModel = function (TemplateNodeId, ControlId, Answer, AnswerValue, Value) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultAnswerModeComponent.UpdateAnswerModel");

                    AnswerValue = (AnswerValue == undefined) ? "" : AnswerValue;
                    //alert("TemplateNodeId : " + TemplateNodeId + "\n" + "ControlId : " + ControlId + "\n" + "Answer : " + Answer + "\n" + "AnswerValue : " + AnswerValue);
                    var AnswersLength = LVTemplateResult[TemplateNodeId].Answers.length;

                    var ScoreSummary = null;

                    if (LVIsScoringLogicEnabled == true && LVScoringLogicType == 1 && Value != undefined && Value != null && Value != "") {
                        var _oScoreCalculationComponent = oLVFactory.GetScoringLogicComponent(this.LVDefaultScoringLogicComponentKey);
                        ScoreSummary = _oScoreCalculationComponent.GetScore(TemplateNodeId, ControlId, Value);
                    }

                    var _oLVDataCaptureBO = new LVDataCaptureBO();
                    var GeoLocationResponse = _oLVDataCaptureBO.GetLatitudeAndLongitude();
                   
                    for (var i = 0; i < AnswersLength; i++) {

                        if (LVTemplateResult[TemplateNodeId].Answers[i].ControlId == ControlId) {

                            LVTemplateResult[TemplateNodeId].Answers[i].Answer = Answer;
                            LVTemplateResult[TemplateNodeId].Answers[i].AnswerValue = AnswerValue;
                            LVTemplateResult[TemplateNodeId].Answers[i].Latitude = GeoLocationResponse.Latitude;
                            LVTemplateResult[TemplateNodeId].Answers[i].Longitude = GeoLocationResponse.Longitude;
                            LVTemplateResult[TemplateNodeId].Answers[i].IsModified = true;

                            if (ScoreSummary != null) {
                                LVTemplateResult[TemplateNodeId].Answers[i].Score = ScoreSummary.Score;
                                LVTemplateResult[TemplateNodeId].Answers[i].MaxScore = ScoreSummary.MaxScore;
                                LVTemplateResult[TemplateNodeId].Answers[i].Percentage = ScoreSummary.Percentage;
                                LVTemplateResult[TemplateNodeId].Answers[i].CompletedChildCount = ScoreSummary.CompletedCount;
                                LVTemplateResult[TemplateNodeId].Answers[i].TotalChildCount = ScoreSummary.TotalCount;
                                LVTemplateResult[TemplateNodeId].Answers[i].CompletedAttributeCount = ScoreSummary.CompletedAttributeCount;
                                LVTemplateResult[TemplateNodeId].Answers[i].TotalAttributeCount = ScoreSummary.TotalAttributeCount;
                            }
                            else {
                                LVTemplateResult[TemplateNodeId].Answers[i].Score = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].MaxScore = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].Percentage = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].CompletedChildCount = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].TotalChildCount = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].CompletedAttributeCount = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].TotalAttributeCount = 0;
                            }
                        }
                    }

                    MyInstance.UpdateMandatoryInfoCurrentStatus(TemplateNodeId, ControlId);
                    //alert(JSON.stringify(LVTemplateResult[TemplateNodeId]));

                    var _oLVTemplateHeaderComponent = new LVTemplateHeaderComponent();
                    _oLVTemplateHeaderComponent.Update();

                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultAnswerModeComponent.UpdateAnswerModel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultAnswerModeComponent.UpdateAnswerModel", LVxlatService);                    
                }               
            }

            this.ClearAnswerModel = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("ClearAnswerModel Start", "LVDefaultAnswerModeComponent.ClearAnswerModel");

                    if (LVTemplateResult[TemplateNodeId] != undefined) {

                        var _oLVDataCaptureBO = new LVDataCaptureBO();
                        var GeoLocationResponse = _oLVDataCaptureBO.GetLatitudeAndLongitude();

                        LVTemplateResult[TemplateNodeId].Comments = "";

                        for (var i = 0; i < LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                            if (ControlId == undefined || (ControlId != undefined && LVTemplateResult[TemplateNodeId].Answers[i].ControlId == ControlId)) {
                                LVTemplateResult[TemplateNodeId].Answers[i].Answer = "";
                                LVTemplateResult[TemplateNodeId].Answers[i].AnswerValue = "";
                                LVTemplateResult[TemplateNodeId].Answers[i].Comments = "";
                                LVTemplateResult[TemplateNodeId].Answers[i].Score = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].MaxScore = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].Percentage = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].CompletedChildCount = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].TotalChildCount = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].CompletedAttributeCount = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].TotalAttributeCount = 0;
                                LVTemplateResult[TemplateNodeId].Answers[i].Latitude = GeoLocationResponse.Latitude;
                                LVTemplateResult[TemplateNodeId].Answers[i].Longitude = GeoLocationResponse.Longitude;
                                LVTemplateResult[TemplateNodeId].Answers[i].IsModified = true;

                                MyInstance.RefreshMandatoryInfo(TemplateNodeId, LVTemplateResult[TemplateNodeId].Answers[i].ControlId);
                                MyInstance.UpdateMandatoryInfoCurrentStatus(TemplateNodeId, LVTemplateResult[TemplateNodeId].Answers[i].ControlId);
                            }

                            if (ControlId == undefined) {
                                MyInstance.RefreshMandatoryInfo(TemplateNodeId, LVTemplateResult[TemplateNodeId].Answers[i].ControlId);
                                MyInstance.UpdateMandatoryInfoCurrentStatus(TemplateNodeId, LVTemplateResult[TemplateNodeId].Answers[i].ControlId);
                            }
                        }
                    }

                    OneViewConsole.Debug("ClearAnswerModel End", "LVDefaultAnswerModeComponent.ClearAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerModeComponent.ClearAnswerModel", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            this.GetAnswer = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("GetAnswer Start", "LVDefaultAnswerModeComponent.GetAnswer");

                    var Answer = "";

                    if (LVTemplateResult[TemplateNodeId] != undefined) {

                        for (var i = 0; i < LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                            if (LVTemplateResult[TemplateNodeId].Answers[i].ControlId == ControlId) {
                                Answer = LVTemplateResult[TemplateNodeId].Answers[i].Answer;
                            }
                        }
                    }

                    return Answer;

                    OneViewConsole.Debug("GetAnswer End", "LVDefaultAnswerModeComponent.GetAnswer");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerModeComponent.GetAnswer", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            this.GetAnswerValue = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("GetAnswerValue Start", "LVDefaultAnswerModeComponent.GetAnswerValue");

                    var AnswerValue = "";

                    if (LVTemplateResult[TemplateNodeId] != undefined) {

                        for (var i = 0; i < LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                            if (LVTemplateResult[TemplateNodeId].Answers[i].ControlId == ControlId) {
                                AnswerValue = LVTemplateResult[TemplateNodeId].Answers[i].AnswerValue;
                            }
                        }
                    }

                    return AnswerValue;

                    OneViewConsole.Debug("GetAnswerValue End", "LVDefaultAnswerModeComponent.GetAnswerValue");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerModeComponent.GetAnswerValue", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            this.RefreshMandatoryInfo = function (AttributeNodeId, ControlId) {
                try {
                    OneViewConsole.Debug("RefreshMandatoryInfo Start", "LVDefaultAnswerModeComponent.RefreshMandatoryInfo");

                    //alert("AttributeNodeId : " + AttributeNodeId + ", ControlId : " + ControlId);

                    if (LVTemplateMandatoryValidationMetaData != null && LVTemplateMandatoryValidationMetaData != undefined) {

                        var SaveValidationMetaData = LVTemplateMandatoryValidationMetaData["SaveValidationMetaData"];
                        var SubmitValidationMetaData = LVTemplateMandatoryValidationMetaData["SubmitValidationMetaData"];

                        if (SaveValidationMetaData != undefined) {

                            var MandatoryMetData = SaveValidationMetaData.DCValidationRuleMetaData;

                            if (MandatoryMetData != undefined) {

                                for (var itr1 = 0; itr1 < MandatoryMetData.length; itr1++) {

                                    if (MandatoryMetData[itr1].Type == "DefaultDCValidationRuleMetaData") {

                                        var MandatoryElements = MandatoryMetData[itr1].MandatoryElements;

                                        for (var i = 0; i < MandatoryElements.length; i++) {

                                            if (AttributeNodeId == MandatoryElements[i].AttributeNodeId && ControlId == MandatoryElements[i].ControlId && LVTemplateResult[MandatoryElements[i].AttributeNodeId] != undefined) {

                                                var SaveMandatoryInfo = LVTemplateResult[MandatoryElements[i].AttributeNodeId].SaveMandatoryInfo;

                                                if (SaveMandatoryInfo[ControlId] == undefined) {
                                                    SaveMandatoryInfo[ControlId] = {
                                                        IsMandatory: false,
                                                        CurrentMandatoryStatus: false,
                                                        RuleType: "",
                                                        MandatoryErrorMessage: "",
                                                        MandatoryRules: {}
                                                    };
                                                }

                                                SaveMandatoryInfo[ControlId].IsMandatory = true;
                                                SaveMandatoryInfo[ControlId].CurrentMandatoryStatus = false;
                                                SaveMandatoryInfo[ControlId].RuleType = "";
                                                SaveMandatoryInfo[ControlId].MandatoryErrorMessage = "";
                                                SaveMandatoryInfo[ControlId].MandatoryRules = {};

                                                LVTemplateResult[MandatoryElements[i].AttributeNodeId].IsSaveMandatoryExist = true;
                                            }
                                        }
                                    }
                                    else if (MandatoryMetData[itr1].Type == "CustomDCValidationRuleMetaData") {
                                        alert("CustomDCValidationRuleMetaData not Implemented");
                                    }
                                    else if (MandatoryMetData[itr1].Type == "AdvanceDCValidationRuleMetaData") {
                                        //alert("AdvanceDCValidationRuleMetaData not Implemented");
                                    }
                                }
                            }
                        }

                        if (SubmitValidationMetaData != undefined) {

                            var MandatoryMetData = SubmitValidationMetaData.DCValidationRuleMetaData;

                            if (MandatoryMetData != undefined) {

                                for (var itr1 = 0; itr1 < MandatoryMetData.length; itr1++) {

                                    if (MandatoryMetData[itr1].Type == "DefaultDCValidationRuleMetaData") {

                                        var MandatoryElements = MandatoryMetData[itr1].MandatoryElements;

                                        for (var i = 0; i < MandatoryElements.length; i++) {

                                            if (AttributeNodeId == MandatoryElements[i].AttributeNodeId && ControlId == MandatoryElements[i].ControlId && LVTemplateResult[MandatoryElements[i].AttributeNodeId] != undefined) {

                                                var SubmitMandatoryInfo = LVTemplateResult[MandatoryElements[i].AttributeNodeId].SubmitMandatoryInfo;

                                                if (SubmitMandatoryInfo[ControlId] == undefined) {
                                                    SubmitMandatoryInfo[ControlId] = {
                                                        IsMandatory: false,
                                                        CurrentMandatoryStatus: false,
                                                        RuleType: "",
                                                        MandatoryErrorMessage: "",
                                                        MandatoryRules: {}
                                                    };
                                                }
                                              
                                                SubmitMandatoryInfo[ControlId].IsMandatory = true;
                                                SubmitMandatoryInfo[ControlId].CurrentMandatoryStatus = false;
                                                SubmitMandatoryInfo[ControlId].RuleType = "";
                                                SubmitMandatoryInfo[ControlId].MandatoryErrorMessage = "";
                                                SubmitMandatoryInfo[ControlId].MandatoryRules = {};

                                                LVTemplateResult[MandatoryElements[i].AttributeNodeId].IsSubmitMandatoryExist = true;
                                            }
                                        }
                                    }
                                    else if (MandatoryMetData[itr1].Type == "CustomDCValidationRuleMetaData") {
                                        alert("CustomDCValidationRuleMetaData not Implemented");
                                    }
                                    else if (MandatoryMetData[itr1].Type == "AdvanceDCValidationRuleMetaData") {
                                        //alert("AdvanceDCValidationRuleMetaData not Implemented");
                                    }
                                }
                            }
                        }
                    }

                    //alert("RefreshMandatoryInfo : " + JSON.stringify(LVTemplateResult[AttributeNodeId]));

                    OneViewConsole.Debug("RefreshMandatoryInfo End", "LVDefaultAnswerModeComponent.RefreshMandatoryInfo");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDefaultAnswerModeComponent.RefreshMandatoryInfo", Excep);
                }
                finally {
                }
            }

            this.UpdateMandatoryInfoCurrentStatus = function (AttributeNodeId, ControlId) {
                try {
                    OneViewConsole.Debug("UpdateMandatoryInfoCurrentStatus Start", "LVDefaultAnswerModeComponent.UpdateMandatoryInfoCurrentStatus");

                    //alert("AttributeNodeId : " + AttributeNodeId + ", ControlId : " + ControlId);

                    if (LVTemplateResult[AttributeNodeId] != undefined) {

                        if (LVTemplateResult[AttributeNodeId].SaveMandatoryInfo[ControlId] != undefined) {

                            if (LVTemplateResult[AttributeNodeId].SaveMandatoryInfo[ControlId].IsMandatory == true) {

                                for (var i = 0; i < LVTemplateResult[AttributeNodeId].Answers.length; i++) {

                                    if (LVTemplateResult[AttributeNodeId].Answers[i].ControlId == ControlId) {

                                        if (LVTemplateResult[AttributeNodeId].Answers[i].Answer != "" || LVTemplateResult[AttributeNodeId].NA == true || LVTemplateResult[AttributeNodeId].IsBlocker == true) {
                                            LVTemplateResult[AttributeNodeId].SaveMandatoryInfo[ControlId].CurrentMandatoryStatus = true;
                                        }
                                        else {
                                            LVTemplateResult[AttributeNodeId].SaveMandatoryInfo[ControlId].CurrentMandatoryStatus = false;
                                        }
                                    }                                   
                                }
                            }
                        }

                        if (LVTemplateResult[AttributeNodeId].SubmitMandatoryInfo[ControlId] != undefined) {

                            if (LVTemplateResult[AttributeNodeId].SubmitMandatoryInfo[ControlId].IsMandatory == true) {

                                for (var i = 0; i < LVTemplateResult[AttributeNodeId].Answers.length; i++) {

                                    if (LVTemplateResult[AttributeNodeId].Answers[i].ControlId == ControlId) {

                                        if (LVTemplateResult[AttributeNodeId].Answers[i].Answer != "" || LVTemplateResult[AttributeNodeId].NA == true || LVTemplateResult[AttributeNodeId].IsBlocker == true) {
                                            LVTemplateResult[AttributeNodeId].SubmitMandatoryInfo[ControlId].CurrentMandatoryStatus = true;
                                        }
                                        else {
                                            LVTemplateResult[AttributeNodeId].SubmitMandatoryInfo[ControlId].CurrentMandatoryStatus = false;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    //alert("UpdateMandatoryInfoCurrentStatus : " + JSON.stringify(LVTemplateResult[AttributeNodeId]));

                    OneViewConsole.Debug("UpdateMandatoryInfoCurrentStatus End", "LVDefaultAnswerModeComponent.UpdateMandatoryInfoCurrentStatus");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDefaultAnswerModeComponent.UpdateMandatoryInfoCurrentStatus", Excep);
                }
                finally {
                }
            }

            this.InitializeMultiMediaSubElementsModel = function (Type, TemplateId, AttributeId, ControlId, DcResultDetailsId, DCResultDetailClientGuid) {
                try {
                    OneViewConsole.Debug("InitializeMultiMediaSubElementsModel Start", "LVDefaultAnswerModeComponent.InitializeMultiMediaSubElementsModel");

                    if (Type == 'DCImageCaptureControlConfig') {
                        var Req = {
                            'TemplateId': TemplateId,
                            'AttributeId': AttributeId,
                            'ControlId': ControlId,
                            'DcResultDetailsId': DcResultDetailsId,
                            'DCResultDetailClientGuid': DCResultDetailClientGuid,
                        };
                        //alert('Req : ' + JSON.stringify(Req));

                        //var _oPlatformPeriodicsBO = new PlatformPeriodicsBO();
                        //var Response = _oPlatformPeriodicsBO.GetMultiMediaSubElementsByDcResultDetailsId(Req);


                        var Dimension = DATEntityType.DCResultDetails;
                        var Request = { 'Dimension': Dimension, 'MappedClientGuid': DCResultDetailClientGuid };
                        var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
                        var Response = _oMultiMediaSubElementsDAO.GetMultiMediaSubElementsByMappedEntityClientGuidDimension(Request);


                        // alert('Response : ' + JSON.stringify(Response));

                        if (Response != null && Response.length > 0) {
                            var MultiMediaElementList = [];
                            for (var i = 0; i < Response.length ; i++) {
                                var MultiMediaElement = {
                                    "Id": Response[i].Id,
                                    "ServerId": Response[i].ServerId,
                                    "MappedEntityClientGuid": Response[i].MappedEntityClientGuid,
                                    "Dimension": DATEntityType.DCResultDetails,
                                    "MultiMediaType": "image/jpg",
                                    "LocalURL": Response[i].LocalURL,
                                    "Comments": Response[i].Comments,
                                    "IsDisabled": Response[i].IsDisabled
                                };

                                MultiMediaElementList.push(MultiMediaElement);
                            }

                            var ControlDict = {};
                            ControlDict[ControlId] = MultiMediaElementList;

                            var AttributeDict = {};
                            AttributeDict[AttributeId] = ControlDict;

                            LVTemplateResult[AttributeId].MultiMediaElementList = MultiMediaElementList;

                            CompleteMultiMediaSubElementsAnswerModeDict[TemplateId] = AttributeDict;

                            //alert('CompleteMultiMediaSubElementsAnswerModeDict : ' + JSON.stringify(CompleteMultiMediaSubElementsAnswerModeDict));
                        }
                        else {
                            CompleteMultiMediaSubElementsAnswerModeDict[TemplateId] = undefined;
                        }
                    }
                    OneViewConsole.Debug("InitializeMultiMediaSubElementsModel End", "LVDefaultAnswerModeComponent.InitializeMultiMediaSubElementsModel");

                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerModeComponent.InitializeMultiMediaSubElementsModel", Excep);
                }
            }
        }

        // LVDefaultTextBoxControl
        function LVDefaultTextBoxControl() {

            this.GetHtml = function (TemplateNodeId, AnswerMode, Answer, AnswerValue) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultTextBoxControl.GetHtml");

                        if (AnswerMode != undefined && (AnswerMode.DataType == "DATETIMELOCAL" || AnswerMode.DataType == "DATE" || AnswerMode.DataType == "MONTHYEAR")) {
                            var _oLVDefaultDateTimeFormater = new LVDefaultDateTimeFormater();
                            Answer = _oLVDefaultDateTimeFormater.GetFormatedValueForUI(AnswerMode, Answer);
                        }

                        var AttributeNodeId = "'" + TemplateNodeId + "'";
                        var ControlId = "'" + AnswerMode.ControlId + "'";

                        var InputType = GetInputType(AnswerMode.DataType);
                        
                        var Html = '<div class="row responsive-md"><div class="col">';
                        Html += (AnswerMode.LabelKey != undefined && AnswerMode.LabelKey != null) ? '<div>' + AnswerMode.LabelKey + '</div>' : "";

                        if (AnswerMode.Type == "DCNumericTextBoxControlConfig") {
                            Html += '<label>';
                            if (LVTemplateResult[TemplateNodeId] != undefined && (LVTemplateResult[TemplateNodeId].NA != true && LVTemplateResult[TemplateNodeId].IsBlocker != true)) {
                                Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" onblur="new LVDefaultNumericTextBoxControl().OnBlur(' + AttributeNodeId + ',' + ControlId + ',this)" />';
                            }
                            else {
                                Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" onblur="new LVDefaultNumericTextBoxControl().OnBlur(' + AttributeNodeId + ',' + ControlId + ',this)" disabled/>';
                            }
                            Html += '</label>';
                        }
                        else if (AnswerMode.Type == "DCTextBoxControlConfig" && AnswerMode.TextBoxType == 4) {
                            Html += '<label>';
                            if (LVTemplateResult[TemplateNodeId] != undefined && (LVTemplateResult[TemplateNodeId].NA != true && LVTemplateResult[TemplateNodeId].IsBlocker != true)) {
                                Html += '<textarea rows="6" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)">' + Answer + '</textarea>';
                            }
                            else {
                                Html += '<textarea rows="6" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" disabled>' + Answer + '</textarea>';
                            }
                            Html += '</label>';
                        }
                        else if (AnswerMode.Type == "DCTextBoxControlConfig" && (AnswerMode.DataType == "DATETIMELOCAL" || AnswerMode.DataType == "DATE" || AnswerMode.DataType == "MONTHYEAR" || AnswerMode.DataType == "TIME")) {
                            Html += '<div class="field-item with-icon">';
                            Html += '<label>';
                            if (LVTemplateResult[TemplateNodeId] != undefined && (LVTemplateResult[TemplateNodeId].NA != true && LVTemplateResult[TemplateNodeId].IsBlocker != true)) {
                                Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" />';
                            }
                            else {
                                Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" disabled/>';
                            }
                            var Icon = (AnswerMode.DataType == "TIME") ? "clock" : "calendar";
                            Html += '<i class="icon icon-' + Icon + '-o"></i>';
                            Html += '</label>';
                            Html += '</div>';
                        }
                        else {
                            Html += '<label>';
                            if (LVTemplateResult[TemplateNodeId] != undefined && (LVTemplateResult[TemplateNodeId].NA != true && LVTemplateResult[TemplateNodeId].IsBlocker != true)) {
                                Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" />';
                            }
                            else {
                                Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" disabled/>';
                            }
                            Html += '</label>';
                        }

                        Html += '</div></div>';

                        OneViewConsole.Debug("GetHtml Start", "LVDefaultTextBoxControl.GetHtml");

                        return Html;
                    }
                    catch(Excep){
                        throw oOneViewExceptionHandler.Create("Framework", "LVDefaultTextBoxControl.GetHtml", Excep);
                    }
                }

            var GetInputType = function(DataType){

                try {
                    OneViewConsole.Debug("GetInputType Start", "LVDefaultTextBoxControl.GetInputType");

                        switch (DataType) {
                            case "STRING": return "text";
                            case "INTEGER": return "tel";
                            case "TIME": return "time";
                            case "DATE": return "date";
                            case "DATETIME": return "datetime";
                            case "DATETIMELOCAL": return "datetime-local";
                            case "MONTHYEAR": return "month";
                            case "PASSWORD": return "password";
                            default: return "text";
                        }

                        OneViewConsole.Debug("GetInputType Start", "LVDefaultTextBoxControl.GetInputType");
                    }
                    catch (Excep) {
                        throw oOneViewExceptionHandler.Create("Framework", "LVDefaultTextBoxControl.GetInputType", Excep);
                    }
            }

            this.UpdateAnswerModel = function (TemplateNodeId, ControlId, DOMObj) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultTextBoxControl.UpdateAnswerModel");

                    if (LVTemplateResult[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA != true) {

                        LVCurrentAttributeId = TemplateNodeId;
                        LVCurrentControlId = ControlId;

                        var Answer = DOMObj.value;
                        Answer = RemoveSpecialCharacters(Answer);
                      
                        var ControlConfig = LVFormattedTemplateMetadata[TemplateNodeId][ControlId];

                        if (ControlConfig != undefined && ControlConfig.Type == "DCNumericTextBoxControlConfig") {
                            var _oLVDefaultNumericTextBoxControl = new LVDefaultNumericTextBoxControl();
                            Answer = _oLVDefaultNumericTextBoxControl.Validate(DOMObj, ControlConfig);

                            if (LVLastTimeOutId != null) LVtimeout.cancel(LVLastTimeOutId); LVLastTimeOutId = LVtimeout(function () { _oLVDefaultNumericTextBoxControl.ActionNCEvaluation(); }, LVAsyncTimeOut);
                        }                        
                       
                        if (ControlConfig != undefined && (ControlConfig.DataType == "DATETIMELOCAL" || ControlConfig.DataType == "DATE" || ControlConfig.DataType == "MONTHYEAR")) {
                            var _oLVDefaultDateTimeFormater = new LVDefaultDateTimeFormater();
                            Answer = _oLVDefaultDateTimeFormater.GetFormatedValue(ControlConfig, DOMObj);
                        }
                        
                        var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                        _oLVDefaultAnswerModeComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, "");
                    }
                   
                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultTextBoxControl.UpdateAnswerModel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultTextBoxControl.UpdateAnswerModel", LVxlatService);
                }
            }

            this.OnBlur = function (TemplateNodeId, ControlId, DOMObj) {

                try {
                    OneViewConsole.Debug("OnBlur Start", "LVDefaultTextBoxControl.OnBlur");

                    //var IsSuccess = true;
                    //var ControlConfig = LVFormattedTemplateMetadata[TemplateNodeId][ControlId];

                    //if (ControlConfig.Type = "DCNumericTextBoxControlConfig") {
                    //    var _oLVDefaultNumericTextBoxControl = new LVDefaultNumericTextBoxControl();
                    //    IsSuccess = _oLVDefaultNumericTextBoxControl.OnBlur(ControlConfig, DOMObj);
                    //}

                    OneViewConsole.Debug("OnBlur End", "LVDefaultTextBoxControl.OnBlur");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultTextBoxControl.OnBlur", LVxlatService);
                }
            }

            this.Set = function (Id, Value) {

                try {
                    OneViewConsole.Debug("Set Start", "LVDefaultTextBoxControl.Set");

                    var _oDOM = new DOM();
                    _oDOM.SetValue(Id, Value);                  

                    OneViewConsole.Debug("Set End", "LVDefaultTextBoxControl.Set");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultTextBoxControl.Set", LVxlatService);
                }
            }

            this.Get = function (Id) {

                try {
                    OneViewConsole.Debug("Set Start", "LVDefaultTextBoxControl.Set");

                    var _oDOM = new DOM();

                    var Value = "";
                    Value = _oDOM.GetValue();

                    OneViewConsole.Debug("Set End", "LVDefaultTextBoxControl.Set");

                    return Value;
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultTextBoxControl.Set", LVxlatService);
                }
            }

            this.ClearAnswerModel = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("ClearAnswerModel Start", "LVDefaultTextBoxControl.ClearAnswerModel");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);
                    var _oDOM = new DOM();
                    _oDOM.Clear(ControlId);
                    _oDOM.Disable(ControlId);

                    var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                    _oLVDefaultAnswerModeComponent.ClearAnswerModel(TemplateNodeId, ControlId);

                    OneViewConsole.Debug("ClearAnswerModel End", "LVDefaultTextBoxControl.ClearAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultTextBoxControl.ClearAnswerModel", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            this.Clear = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("Clear Start", "LVDefaultTextBoxControl.Clear");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);
                    //var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                    //_oLVDefaultAnswerModeComponent.ClearAnswerModel(TemplateNodeId, ControlId);

                    var _oDOM = new DOM();
                    _oDOM.Clear(ControlId);
                    
                    OneViewConsole.Debug("Clear End", "LVDefaultTextBoxControl.Clear");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultTextBoxControl.Clear", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            var RemoveSpecialCharacters = function (Value) {
                try {
                    if (Value != undefined && Value != null && Value != '' && typeof (Value) == 'string') {
                        Value = Value.replace(/[^-_<>@:()^,&/| 0-9 .a-zA-Z]/g, ' ');
                        //Value = Value.replace(/\s/g, "");
                        //Value = Value.trim();
                    }
                    return Value;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultTextBoxControl.RemoveSpecialCharacters", Excep);
                }
                finally {
                }
            }
        }

        // LVDefaultSignatutePadControl
        function LVDefaultSignatutePadControl() {

            var MyInstance = this;
            var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
            var _oDOM = new DOM();

            this.GetHtml = function (TemplateNodeId, AnswerMode, Answer, AnswerValue, NA) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultSignatutePadControl.GetHtml");

                    var AttributeNodeId = "'" + TemplateNodeId + "'";
                    var ControlId = "'" + AnswerMode.ControlId + "'";

                    var Html = '<div class="row responsive-md"><div class="col">';
                    Html += (AnswerMode.LabelKey != undefined && AnswerMode.LabelKey != null) ? '<div>' + AnswerMode.LabelKey + '</div>' : "";

                    Html += '<div id="' + AnswerMode.ControlId + '" class="inline-sign">' +
                                         '<canvas style="width: 100%; height: 200px; margin: 0px auto;"></canvas>' +
                                     '</div>' +
                                     '<div class="row responsive-md" style="width: 50%;">' +
                                        '<div class="col"><div class="button-bar"><button class="button" onclick="new LVDefaultSignatutePadControl().Clear(' + AttributeNodeId + ',' + ControlId + ')">Clear</button><button class="button" onclick="new LVDefaultSignatutePadControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ')">Save</button></div></div>' +
                                     '</div>';
                    if (AnswerMode.Type == "DCSignaturePadControlConfig" && SignatutePadIds.indexOf(AnswerMode.ControlId) == -1) {
                        SignatutePadInfo.push({ "TemplateNodeId": TemplateNodeId, "ControlId": AnswerMode.ControlId });
                        SignatutePadIds.push(AnswerMode.ControlId);
                        //alert(JSON.stringify(SignatutePadIds));
                    }

                    Html += '</div></div>';

                    OneViewConsole.Debug("GetHtml Start", "LVDefaultSignatutePadControl.GetHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultSignatutePadControl.GetHtml", Excep);
                }
            }

            this.UpdateAnswerModel = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultSignatutePadControl.UpdateAnswerModel");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);

                    Answer = "";

                    if (SignatutePadObjects[ControlId] != undefined) {
                        Answer = SignatutePadObjects[ControlId].toDataURL();
                        if (SignatutePadObjects[ControlId].isEmpty() == true) {
                            alert("MN-RQ-NAF-001 :: Please provide signature first.");
                        }
                        else {
                            alert("MN-RQ-NAF-001 :: Signature saved successfully");
                        }
                    }

                    var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                    _oLVDefaultAnswerModeComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, "");

                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultSignatutePadControl.UpdateAnswerModel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultSignatutePadControl.UpdateAnswerModel", LVxlatService);
                }
            }


            /// <summary>
            /// Clear
            /// </summary>
            /// <param name="TemplateNodeId">TemplateNodeId</param> 
            /// <param name="ControlId">ControlId</param> 
            this.Clear = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("Clear Start", "LVDefaultSignatutePadControl.Clear");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);

                    if (SignatutePadObjects[ControlId] != undefined) {
                        SignatutePadObjects[ControlId].clear();
                    }

                    _oLVDefaultAnswerModeComponent.ClearAnswerModel(TemplateNodeId, ControlId);

                    OneViewConsole.Debug("Clear End", "LVDefaultSignatutePadControl.Clear");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultSignatutePadControl.Clear", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }


            /// <summary>
            /// Disable
            /// </summary>
            /// <param name="ControlId">ControlId</param> 
            this.Disable = function (ControlId) {

                try {
                    OneViewConsole.Debug("Disable Start", "LVDefaultHtmlDropdownControl.Disable");

                    if (SignatutePadObjects[ControlId] != undefined) {
                        SignatutePadObjects[ControlId].off();
                    }

                    OneViewConsole.Debug("Disable End", "LVDefaultHtmlDropdownControl.Disable");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.Disable", Excep);
                }
            }


            /// <summary>
            /// Enable
            /// </summary>
            /// <param name="ControlId">ControlId</param> 
            this.Enable = function (ControlId) {

                try {
                    OneViewConsole.Debug("Enable Start", "LVDefaultHtmlDropdownControl.Enable");

                    if (SignatutePadObjects[ControlId] != undefined) {
                        SignatutePadObjects[ControlId].on();
                    }

                    OneViewConsole.Debug("Enable End", "LVDefaultHtmlDropdownControl.Enable");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.Enable", Excep);
                }
            }
        }

        // LVDefaultNumericTextBoxControl
        function LVDefaultNumericTextBoxControl() {

            var MyInstance = this;

            this.RightPanelComponentKey = "LVDefaultRightPanelComponent";
            var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();

            this.DefaultJavaScriptAlert = "DefaultJavaScriptAlert";
            this.LVDefaultNotificationComponentKey = "LVDefaultNotificationComponent";

            this.Validate = function (DOMObj, ControlConfig) {

                try {
                    OneViewConsole.Debug("Validate Start", "LVDefaultNumericTextBoxControl.Validate");

                    var Format = ControlConfig.Format;

                    if (Format == undefined || Format == null && Format == "") {

                        var value = DOMObj.value;
                        value = value.replace(/\s/g, '');
                        value = value.replace(/[^ 0-9]/g, '');
                        value = value.trim();

                        DOMObj.value = value;

                        return value;
                    }
                    else {

                        var value = DOMObj.value;
                        value = value.replace(/\s/g, '');
                        value = value.replace(/[^- 0-9 .]/g, '');
                        if (value.split(".").length - 1 > 1) {
                            value = value.substring(0, value.length - 1);
                        }
                        else if (value.split("-").length - 1 > 1) {
                            value = value.substring(0, value.length - 1);
                        }
                        else if (value.indexOf("-") > 0) {
                            value = value.substring(0, value.length - 1);
                        }

                        //todo:need make it dynamic with reg exp.(its a temp solution)
                        if (Format != undefined && Format != null && Format != "") {
                            if (Format == '#.#') {
                                if (value != undefined && value != "" && value.indexOf('.') != -1) {
                                    var temp = value.split('.');
                                    if (temp[1].length > 1) {
                                        value = value.substring(0, value.length - 1);
                                    }
                                    if (temp[0].length == 0) {
                                        value = "0" + value;
                                    }
                                    if (temp[0].length == 1) {
                                        if (temp[0] == "-") {
                                            value = temp[0] + "0." + temp[1];
                                        }
                                    }

                                }
                            }
                        }

                        value = value.trim();
                        DOMObj.value = value;

                        return value;
                    }

                    OneViewConsole.Debug("Validate End", "LVDefaultNumericTextBoxControl.Validate");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.Validate", LVxlatService);
                }
            }

            this.ActionNCEvaluation = function () {

                try {
                    OneViewConsole.Debug("dd Start", "LVDefaultNumericTextBoxControl.dd");

                    _oLVFactory = new LVFactory();
                    var _oRightPanelComponent = _oLVFactory.GetRightPanelComponent(this.RightPanelComponentKey);
                    _oRightPanelComponent.Open(LVRightPanelTab.Action, false);

                    OneViewConsole.Debug("dd End", "LVDefaultNumericTextBoxControl.dd");
                }
                catch (Excep) {                   
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.dd", LVxlatService);
                }               
            }

            this.OnBlur = function (TemplateNodeId, ControlId, DOMObj) {

                try {
                    OneViewConsole.Debug("OnBlur Start", "LVDefaultNumericTextBoxControl.OnBlur");
                    
                    var _oLVTemplateUIEventJobComponent = new LVTemplateUIEventJobComponent();
                    _oLVTemplateUIEventJobComponent.ExcecutePostControlUIJobs(TemplateNodeId, ControlId);
                                      
                    OneViewConsole.Debug("OnBlur End", "LVDefaultNumericTextBoxControl.OnBlur");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.OnBlur", LVxlatService);
                }
            }

            var ClearByObj = function (DOMObj) {

                try {
                    OneViewConsole.Debug("Clear Start", "LVDefaultNumericTextBoxControl.Clear");

                    var _oDOM = new DOM();
                    _oDOM.ClearByObj(DOMObj);

                    OneViewConsole.Debug("Clear End", "LVDefaultNumericTextBoxControl.Clear");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.Clear", LVxlatService);
                }
            }

            var SetFocusByObj = function (DOMObj) {

                try {
                    OneViewConsole.Debug("SetFocusByObj Start", "LVDefaultNumericTextBoxControl.SetFocusByObj");

                    var _oDOM = new DOM();
                    _oDOM.SetFocusByObj(DOMObj);

                    OneViewConsole.Debug("SetFocusByObj End", "LVDefaultNumericTextBoxControl.SetFocusByObj");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.SetFocusByObj", LVxlatService);
                }
            }

            var MinMaxValidate = function (ControlConfig, DOMObj) {

                try {
                    OneViewConsole.Debug("MinMaxValidate Start", "LVDefaultNumericTextBoxControl.MinMaxValidate");

                    var oResponse = { "IsSuccess": true, "Msg": "" };
                  
                    if (DOMObj.value < ControlConfig.MinValue || DOMObj.value > ControlConfig.MaxValue) {
                        oResponse.IsSuccess = false;
                        oResponse.Msg = "Value should be between or equals to " + ControlConfig.MinValue + " and " + ControlConfig.MaxValue;
                    }

                    return oResponse;

                    OneViewConsole.Debug("MinMaxValidate End", "LVDefaultNumericTextBoxControl.MinMaxValidate");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.MinMaxValidate", LVxlatService);
                }
            }

            this.Clear = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("Clear Start", "LVDefaultNumericTextBoxControl.Clear");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);
                    var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                    _oLVDefaultAnswerModeComponent.ClearAnswerModel(TemplateNodeId, ControlId);

                    var _oDOM = new DOM();
                    _oDOM.Clear(ControlId);
                   
                    OneViewConsole.Debug("Clear End", "LVDefaultNumericTextBoxControl.Clear");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNumericTextBoxControl.Clear", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            /// <summary>
            /// Set
            /// </summary>
            /// <param name="TemplateNodeId">TemplateNodeId</param> 
            /// <param name="ControlId">ControlId</param> 
            /// <param name="Answer">Answer</param> 
            /// <param name="AnswerValue">AnswerValue</param> 
            this.Set = function (TemplateNodeId, ControlId, Answer, AnswerValue) {

                try {
                    OneViewConsole.Debug("Set Start", "LVDefaultNumericTextBoxControl.Set");

                    _oLVDefaultAnswerModeComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, AnswerValue);

                    var _oDOM = new DOM();
                    _oDOM.SetValue(ControlId, Answer)

                    OneViewConsole.Debug("Set End", "LVDefaultNumericTextBoxControl.Set");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultNumericTextBoxControl.Set", Excep);
                }
            }

            /// <summary>
            /// Refresh
            /// </summary>
            /// <param name="TemplateNodeId">TemplateNodeId</param> 
            /// <param name="ControlId">ControlId</param> 
            this.Refresh = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("Refresh Start", "LVDefaultNumericTextBoxControl.Refresh");

                    var ControlConfig = LVFormattedTemplateMetadata[TemplateNodeId][ControlId];
                  
                    if (ControlConfig != null && ControlConfig != undefined) {

                        if (ControlConfig.AutoAnswerConfig != undefined) {

                            if (ControlConfig.AutoAnswerConfig.Type == "DefaultAutoAnswerConfig") {

                                var _oDefaultAutoAnswerConfig = new DefaultAutoAnswerConfig();
                                var Result = _oDefaultAutoAnswerConfig.Evaluate(ControlConfig.AutoAnswerConfig.FinalJavaScriptEquation);
                                
                                MyInstance.Set(TemplateNodeId, ControlId, Result, "");
                            }
                        }                                              
                    }

                    OneViewConsole.Debug("Refresh End", "LVDefaultNumericTextBoxControl.Refresh");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultNumericTextBoxControl.Refresh", Excep);
                }
            }
        }

        // LVDefaultBandControl
        function LVDefaultBandControl() {

            var MyInstance = this;
        
            this.RightPanelComponentKey = "LVDefaultRightPanelComponent";

            this.GetHtml = function (TemplateNodeId, AnswerMode, Answerlst) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultBandControl.GetHtml");

                    var Html = "";

                    if (AnswerMode.SelectionType == 0 || AnswerMode.SelectionType == 1) {
                        Html = GetBandHtml(TemplateNodeId, AnswerMode, Answerlst);
                    }
                    else{
                        alert("AnswerMode SelectionType : Not implemented exception (GetHtml in LVDefaultBandControl)");
                    }

                    OneViewConsole.Debug("GetHtml End", "LVDefaultBandControl.GetHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.GetHtml", Excep);
                }
            }

            var GetBandHtml = function (TemplateNodeId, AnswerMode, Answerlst) {

                try {
                    OneViewConsole.Debug("GetBandHtml Start", "LVDefaultBandControl.GetBandHtml");

                    var Html = "";

                    if (AnswerMode.DisplayMode == 0) {
                        Html = GetBandHorizontalHtml(TemplateNodeId, AnswerMode, Answerlst);
                    }
                    else {
                        alert("AnswerMode DisplayMode : Not implemented exception (GetBandHtml in LVDefaultBandControl)");
                    }

                    OneViewConsole.Debug("GetBandHtml End", "LVDefaultBandControl.GetBandHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.GetHtml", Excep);
                }               
            }

            var GetBandHorizontalHtml = function (TemplateNodeId, AnswerMode, Answerlst) {

                try {
                    OneViewConsole.Debug("GetBandHorizontalHtml Start", "LVDefaultBandControl.GetBandHorizontalHtml");

                    var _oLVBandDetailsCacheComponent = new LVBandDetailsCacheComponent();
                    var BandDetailsEntityList = _oLVBandDetailsCacheComponent.GetBandDetailsByBandId(AnswerMode.ListViewDataSourceConfig.BandId);

                    var AttributeNodeId = "'" + TemplateNodeId + "'";
                    var ControlId = "'" + AnswerMode.ControlId + "'";
                    var SelectionType = "'" + AnswerMode.SelectionType + "'";

                    var Html = '<div class="row responsive-sm">';

                    for (var i = 0; i < BandDetailsEntityList.length; i++) {

                        var BandDetail = BandDetailsEntityList[i];

                        var ColourCode = "'" + BandDetail.ColourCode + "'";
                        var Id = BandDetail.Name + AnswerMode.ControlId;

                        var BandDetailId = "'" + BandDetail.Id + "'";
                        var BandDetailName = "'" + BandDetail.Name + "'";
                        var Value = BandDetail.Value;

                        var TagId = "'" + Id + "'";

                        var Style = "";

                        for (var j = 0; j < Answerlst.length; j++) {
                            if (Answerlst[j].Answer == BandDetail.Id) {
                                Style += 'background-color:' + BandDetail.ColourCode;
                                Style += ';color:white';
                                break;
                            }
                        }                        
                        Html += '<div class="col"><button class="button button-block" style="' + Style + '" name="' + AnswerMode.ControlId + '" id="' + Id + '" onclick="new LVDefaultBandControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',' + BandDetailId + ',' + BandDetailName + ',' + TagId + ',' + ColourCode + ',' + SelectionType + ',' + Value + ');">' + BandDetail.Name + '</button></div>';
                    }

                    Html += '</div>';

                    OneViewConsole.Debug("GetBandHorizontalHtml End", "LVDefaultBandControl.GetBandHorizontalHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.GetBandHtml", Excep);
                }
            }

            this.UpdateAnswerModel = function (TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode, SelectionType, Value) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultBandControl.UpdateAnswerModel");

                    var _oLVDataCaptureBO = new LVDataCaptureBO();

                    if (_oLVDataCaptureBO.ValidateGeoLocation()) {

                        if (LVTemplateResult[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA != true && LVTemplateResult[TemplateNodeId].IsBlocker != true) {

                            LVCurrentAttributeId = TemplateNodeId;
                            LVCurrentControlId = ControlId;

                            //alert(TemplateNodeId + "," + ControlId + "," + Answer + "," + AnswerValue + "," + TagId + "," + ColourCode);                   

                            if (SelectionType == 0) {
                                SetBandColorForSingleSelection(ControlId, TagId, ColourCode);
                                var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                                _oLVDefaultAnswerModeComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, AnswerValue, Value);
                            }
                            //else if (SelectionType == 1) {
                            //    SetBandColorForMultiSelection(ControlId, TagId, ColourCode);
                            //    UpdateAnswerModelForMultiSelectBand(TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode);
                            //}

                            _oLVFactory = new LVFactory();
                            var _oRightPanelComponent = _oLVFactory.GetRightPanelComponent(this.RightPanelComponentKey);
                            _oRightPanelComponent.Open(LVRightPanelTab.Action, false);
                        }
                    }
                   
                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultBandControl.UpdateAnswerModel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultBandControl.UpdateAnswerModel", LVxlatService);
                }
            }

            this.Set = function (TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode, SelectionType, Value) {

                try {
                    OneViewConsole.Debug("Set Start", "LVDefaultBandControl.Set");

                    MyInstance.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode, SelectionType, Value);

                    OneViewConsole.Debug("Set End", "LVDefaultBandControl.Set");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultBandControl.Set", LVxlatService);
                }
            }

            var UpdateAnswerModelForMultiSelectBand = function (TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModelForMultiSelectBand Start", "LVDefaultBandControl.UpdateAnswerModelForMultiSelectBand");

                    //alert("TemplateNodeId : " + TemplateNodeId + "\n" + "ControlId : " + ControlId + "\n" + "Answer : " + Answer + "\n" + "AnswerValue : " + AnswerValue);
                   
                    var _AnswerValue = (AnswerValue == undefined) ? "" : AnswerValue;                    
                    var AnswersLength = LVTemplateResult[TemplateNodeId].Answers.length;
                    
                    if (AnswersLength > 0 && LVTemplateResult[TemplateNodeId].Answers[0].Answer == "") {
                        UpdateAnswerModel(TemplateNodeId, Answer, _AnswerValue, 0);
                        IsNew = false;
                    }
                    else {
                        var IsNew = true;                      

                        for (var i = 0; i < AnswersLength; i++) {
                           
                            if (LVTemplateResult[TemplateNodeId].Answers[i].ControlId == ControlId && LVTemplateResult[TemplateNodeId].Answers[i].Answer == Answer) {

                                if (LVTemplateResult[TemplateNodeId].Answers.length > 1) {
                                    RemoveAnswerModel(TemplateNodeId, i);
                                }
                                else {
                                    UpdateAnswerModel(TemplateNodeId, "", "", i);
                                }
                                IsNew = false;                               
                                break;
                            }                           
                        }

                        if (IsNew == true) {
                            AddNewAnswerModel(TemplateNodeId, ControlId, Answer, _AnswerValue);
                        }
                    }

                    OneViewConsole.Debug("UpdateAnswerModelForMultiSelectBand End", "LVDefaultBandControl.UpdateAnswerModelForMultiSelectBand");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.UpdateAnswerModelForMultiSelectBand", Excep);
                }
                finally {
                    _AnswerValue = null;
                    AnswersLength = null;
                }
            }

            var AddNewAnswerModel = function (TemplateNodeId, ControlId, Answer, AnswerValue) {

                try {
                    OneViewConsole.Debug("AddNewAnswerModel Start", "LVDefaultBandControl.AddNewAnswerModel");

                    LVTemplateResult[TemplateNodeId].Answers.push({
                        "ServerId": '',
                        "ClientId": '',
                        "ControlId": ControlId,
                        "Answer": Answer,
                        "AnswerValue": AnswerValue,
                        "AnswerFKType": LVTemplateResult[TemplateNodeId].Answers[0].AnswerFKType,
                        "AnswerDataType": LVTemplateResult[TemplateNodeId].Answers[0].AnswerDataType,
                        "AnswerMode": LVTemplateResult[TemplateNodeId].Answers[0].AnswerMode,
                        "IsModified": true,
                        "IsManual": true,
                        "IsDynamicAttribute": false,
                        "IsDynamicAnswer": false,
                        "IndexId": 0,
                        "IsMulti": false,
                        "AutomaticDeviceId": "",
                        "Score": 0,
                        "MaxScore": 0,
                        "Percentage": 0,
                        "CompletedChildCount": 0,
                        "TotalChildCount": 0,
                        "CompletedAttributeCount": 0,
                        "TotalAttributeCount": 0
                    });

                    OneViewConsole.Debug("AddNewAnswerModel End", "LVDefaultBandControl.AddNewAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.AddNewAnswerModel", Excep);
                }
            }

            var UpdateAnswerModel = function (TemplateNodeId, Answer, AnswerValue, Index) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultBandControl.UpdateAnswerModel");

                    LVTemplateResult[TemplateNodeId].Answers[Index].Answer = Answer;
                    LVTemplateResult[TemplateNodeId].Answers[Index].AnswerValue = AnswerValue;
                    LVTemplateResult[TemplateNodeId].Answers[i].IsModified = true;

                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultBandControl.UpdateAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.UpdateAnswerModel", Excep);
                }
            }

            var RemoveAnswerModel = function (TemplateNodeId, Index) {

                try {
                    OneViewConsole.Debug("RemoveAnswerModel Start", "LVDefaultBandControl.RemoveAnswerModel");

                    LVTemplateResult[TemplateNodeId].Answers.splice(Index, 1);

                    OneViewConsole.Debug("RemoveAnswerModel End", "LVDefaultBandControl.RemoveAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.RemoveAnswerModel", Excep);
                }
            }
         
            var SetBandColorForSingleSelection = function (ControlId, TagId, ColourCode) {

                try {
                    OneViewConsole.Debug("SetBandColorForSingleSelection Start", "LVDefaultBandControl.SetBandColorForSingleSelection");

                    var CurrentObj = document.getElementById(TagId);
                    if (CurrentObj != null && CurrentObj.style.backgroundColor == "") {
                        ClearAllColors(ControlId);
                        CurrentObj.style.backgroundColor = ColourCode;
                        CurrentObj.style.color = "white";
                    }

                    OneViewConsole.Debug("SetBandColorForSingleSelection End", "LVDefaultBandControl.SetBandColorForSingleSelection");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.SetBandColorForSingleSelection", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            this.ClearAllColors = function (ControlId) {
                try {
                    OneViewConsole.Debug("ClearAllColors Start", "LVDefaultBandControl.ClearAllColors");

                    ClearAllColors(ControlId);

                    OneViewConsole.Debug("ClearAllColors End", "LVDefaultBandControl.ClearAllColors");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.ClearAllColors", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            var ClearAllColors = function (ControlId) {

                try {
                    OneViewConsole.Debug("ClearAllColors Start", "LVDefaultBandControl.ClearAllColors");
                  
                    var AllObj = document.getElementsByName(ControlId);
                    if (AllObj != null) {
                        for (var i = 0; i < AllObj.length; i++) {
                            AllObj[i].style.backgroundColor = "";
                            AllObj[i].style.color = "#444";
                        }
                    }
                                     
                    OneViewConsole.Debug("ClearAllColors End", "LVDefaultBandControl.ClearAllColors");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.ClearAllColors", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            this.ClearAnswerModel = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("ClearAnswerModel Start", "LVDefaultBandControl.ClearAnswerModel");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);
                    ClearAllColors(ControlId);
                    var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                    _oLVDefaultAnswerModeComponent.ClearAnswerModel(TemplateNodeId, ControlId);

                    OneViewConsole.Debug("ClearAnswerModel End", "LVDefaultBandControl.ClearAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.ClearAnswerModel", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            var SetBandColorForMultiSelection = function (ControlId, TagId, ColourCode) {

                try {
                    OneViewConsole.Debug("SetBandColorForMultiSelection Start", "LVDefaultBandControl.SetBandColorForMultiSelection");

                    var CurrentObj = document.getElementById(TagId);
                    if (CurrentObj != null) {

                        if (CurrentObj.style.backgroundColor == "") {
                            CurrentObj.style.backgroundColor = ColourCode;
                            CurrentObj.style.color = "white";
                        }
                        else {
                            CurrentObj.style.backgroundColor = "";
                            CurrentObj.style.color = "#444";
                        }
                    }

                    OneViewConsole.Debug("SetBandColorForMultiSelection End", "LVDefaultBandControl.SetBandColorForMultiSelection");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.SetBandColorForMultiSelection", Excep);
                }
                finally {
                    CurrentObj = null;
                }
            }

            this.SetColor = function (TemplateNodeId, ControlId, Answer) {

                try {
                    OneViewConsole.Debug("Set Start", "LVDefaultBandControl.SetColor");

                    var _oLVBandDetailsCacheComponent = new LVBandDetailsCacheComponent();

                    var BandID = LVFormattedTemplateMetadata[TemplateNodeId][ControlId].ListViewDataSourceConfig.BandId;
                    var BandDetailsEntityList = _oLVBandDetailsCacheComponent.GetBandDetailsByBandId[BandID];

                    for (var i = 0; i < BandDetailsEntityList.length; i++) {
                        if (Answer == BandDetailsEntityList[i].Id) {
                            var TagId = BandDetailsEntityList[i].Name + ControlId;
                            var ColourCode = BandDetailsEntityList[i].ColourCode;
                            SetBandColorForSingleSelection(ControlId, TagId, ColourCode);
                        }
                    }
                    OneViewConsole.Debug("Set End", "LVDefaultBandControl.SetColor");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultBandControl.SetColor", LVxlatService);
                }
            }
        }

        //LVDefaultCaptureImageControl
        function LVDefaultCameraAnswerModeComponent(TemplateNodeId, ControlId, SelectionType) {

            var MyInstance = this;
            this.AttributeId = TemplateNodeId;
            this.ControlId = ControlId;
            this.SelectionType = SelectionType;

            this.GetHtml = function (TemplateNodeId, AnswerMode, Answerlst) {
                try {

                    var AttributeId = TemplateNodeId;
                    var ControlId = AnswerMode.ControlId ;
                    var SelectionType =  AnswerMode.SelectionType;

                    OneViewConsole.Debug("GetHtml Start", "LVDefaultCameraAnswerModeComponent.GetHtml");
                    var CtrlId = "'" + ControlId + "'";
                    var ImageHtml = MyInstance.GetImageHtml(TemplateNodeId, AnswerMode, Answerlst);
                 //   var InsertPhoto = oXlatService.xlat('Insert Photo');
                    // var Html = '<div class="item-left-edit visible active" id="DivImage_"' + TemplateId + '><button class="button" onclick="new LVDefaultCameraAnswerModeComponent().CaptureImage();"><i style="color:#b3b3b3;" class="icon icon-camera"></i></button></div>';
                    var Html = '   <div class="col rounded light-bg" id="Div_' + ControlId + '">' +
                                        '<div class="item item-button-right no-margin" style="padding: 0px 210px 0px 0px; border:0px;">' +
                                           ' <div class="field-item">' +
                                               ' <label>' +
                                                   ' <span>Insert Photo</span>' +
                                                   ' <input type="text" id="txtInsertPhotoControlId" readonly="true">' +
                                               ' </label>' +
                                           ' </div>' +
                                          ' <div id="DivImage_' + ControlId + '">' +
                                          ImageHtml +
                                         ' </div>' +
                                           ' <div class="button no-padding" style="right: 75px; border:0px;" onclick="new LVDefaultCameraAnswerModeComponent(' + AttributeId + ',' + CtrlId + ',' + SelectionType + ').CaptureImage(' + AttributeId + ',' + CtrlId + ',' + SelectionType + ');">' +
                                              '  <a class="button" style="padding: 9px 20px;"><i class="icon icon-camera"></i></a>' +
                                           ' </div>' +
                                          '  <div class="button no-padding" style="right: 5px; border:0px;" onclick="new LVDefaultCameraAnswerModeComponent(' + AttributeId + ',' + CtrlId + ',' + SelectionType + ').DeleteImage(' + AttributeId + ',' + CtrlId + ',' + SelectionType + ');">' +
                                               ' <a class="button" style="padding: 9px 20px;"><i class="icon icon-cancel-circle"></i></a>' +
                                           ' </div>' +
                                       ' </div>' +
                                    '</div>';

                    OneViewConsole.Debug("GetHtml End", "LVDefaultCameraAnswerModeComponent.GetHtml");
                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.GetHtml", Excep);
                }
            }

            this.GetImageHtml = function (TemplateNodeId, AnswerMode, Answerlst) {
                try {
                    OneViewConsole.Debug("GetImageHtml Start", "LVDefaultCameraAnswerModeComponent.GetImageHtml");

                    var Html = '';
                   // var SelectionType = GetSelectionType();

                    var AttributeId = TemplateNodeId;
                    var ControlId =  AnswerMode.ControlId;
                    var SelectionType =  AnswerMode.SelectionType;

                    var TemplateId = OneViewSessionStorage.Get("TemplateId");
                    if (Answerlst.length > 0) {
                        var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
                        if (MultiMediaSubElementsAnswerModeDict != undefined) {
                            var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                            if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                                var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                                if (SelectionType == 1) {
                                  //  alert("Multiple Image Capture not implemented");
                                    //Html = '<div class="cam-photo"><div ng-repeat="MultiMediaSubElement in MultiMediaSubElementsAnswerModeList">' +
                                    //         '<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="' + Math.random() + '" id="{{MultiMediaSubElement.Id}}"><img src="{{MultiMediaSubElement.LocalURL}}" ></a>' +
                                    //    '</div></div>';
                              
                                }
                                else {
                                    if (MultiMediaSubElementsAnswerModeList.length > 1) {
                                        for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                            if (MultiMediaSubElementsAnswerModeList[i].IsDisabled != true && (MultiMediaSubElementsAnswerModeList[i].MappedEntityClientGuid == Answerlst[i].ClientGuid)) {
                                                 Html += GetImageHtml(ControlId, MultiMediaSubElementsAnswerModeList[i].LocalURL);
                                                //Html += '<div class="cam-photo">' +
                                                // '<div ng-repeat="MultiMediaSubElement in MultiMediaSubElementsAnswerModeList">' +
                                                //      '<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="' + Math.random() + '" id="Image_{{MultiMediaSubElement.Id}}"><img src="{{MultiMediaSubElement.LocalURL}}" alt="{{MultiMediaSubElement.AlternateName}}"></a>' +
                                                // '</div>' 
                                                //'</div>' 


                                                break; //only image saved
                                            }
                                        }
                                    }
                                    else if (MultiMediaSubElementsAnswerModeList.length == 1) { //&& (MultiMediaSubElementsAnswerModeList[0].MappedEntityClientGuid == Answerlst[0].ClientGuid)
                                        Html += GetImageHtml(ControlId, MultiMediaSubElementsAnswerModeList[0].LocalURL);
                                    }
                                }
                            }
                        }
                        Html = '<div class="cam-photo"><div ng-repeat="MultiMediaSubElement in MultiMediaSubElementsAnswerModeList">' +
                                         '<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="' + Math.random() + '" id="{{MultiMediaSubElement.Id}}"><img src="{{MultiMediaSubElement.LocalURL}}" ></a>' +
                                    '</div></div>';
                    }
                    OneViewConsole.Debug("GetImageHtml End", "LVDefaultCameraAnswerModeComponent.GetImageHtml");
                    //alert('Html : ' + Html);
                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.GetImageHtml", Excep);
                }
            }

            var GetMultipleImageHtml = function (AttributeId, ControlId) {

                var TemplateId = OneViewSessionStorage.Get("TemplateId");
                var AttributeId = AttributeId;
                var ControlId = ControlId;
                var Html = "";
                var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
                if (MultiMediaSubElementsAnswerModeDict != undefined) {
                    var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                    if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                        var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                            if (MultiMediaSubElementsAnswerModeList.length > 1) {
                                Html = '<div class="cam-photo"><div ng-repeat="MultiMediaSubElement in MultiMediaSubElementsAnswerModeList">' +
                                            '<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="' + Math.random() + '" id="{{MultiMediaSubElement.Id}}"><img src="{{MultiMediaSubElement.LocalURL}}" ></a>' +
                                       '</div></div>';
                                LVscope.MultiMediaSubElementsAnswerModeList = MultiMediaSubElementsAnswerModeList;
                                LVscope.$apply();
                            }
                            else if (MultiMediaSubElementsAnswerModeList.length == 1) { //&& (MultiMediaSubElementsAnswerModeList[0].MappedEntityClientGuid == Answerlst[0].ClientGuid)
                                Html += GetImageHtml(ControlId, MultiMediaSubElementsAnswerModeList[0].LocalURL);
                            }
                    }
                }
                return Html;
            }

            var GetImageHtml = function (ControlId, LocalURL) {
                try {
                    OneViewConsole.Debug("GetImageHtml Start", "LVDefaultCameraAnswerModeComponent.GetImageHtml");
                    //var Html = ' <a id="Image_' + ControlId + '" href="' + LocalURL + '" class="angularbox" rel="' + LocalURL + '">' +
                    //                                         ' <img src="' + LocalURL + '" alt="No Image" style="margin: 0px 0px 0px 0px; border: 1px #ccc solid; padding: 0px;height:52px;width:52px"  />' +
                    //                                     ' </a>';

                    var Html = '<div class="cam-photo"><div ng-repeat="MultiMediaSubElement in MultiMediaSubElementsAnswerModeList">' +
                                             '<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="' + Math.random() + '" id="{{MultiMediaSubElement.Id}}"><img src="{{MultiMediaSubElement.LocalURL}}" ></a>' +
                                        '</div></div>';
                    //'<div class="cam-photo">' +
                    // '<div ng-repeat="MultiMediaSubElement in ActionMultiMediaSubElements">' +
                    //      '<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="' + Math.random() + '" id="' + ActionNCConfigList[0].RuleId + '"><img src="{{MultiMediaSubElement.LocalURL}}" alt="{{MultiMediaSubElement.AlternateName}}"></a>' +
                    // '</div>' 
                    //'</div>' 

                    OneViewConsole.Debug("GetImageHtml End", "LVDefaultCameraAnswerModeComponent.GetImageHtml");
                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.GetImageHtml", Excep);
                }
            }

            this.CaptureImage = function (AttributeId, ControlId, SelectionType) {
                try {
                    OneViewConsole.Debug("AttachImage Start", "LVDefaultCameraAnswerModeComponent.AttachImage");
                    MyInstance.AttributeId = AttributeId;
                    MyInstance.ControlId = ControlId;
                    MyInstance.SelectionType = SelectionType;
                    var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
                    _oOneViewCordovaCameraPlugin.CaptureImage(function (_ImageURL) {
                        MyInstance.UpdateAnswerModel(_ImageURL);
                    });

                    OneViewConsole.Debug("AttachImage End", "LVDefaultCameraAnswerModeComponent.AttachImage");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.AttachImage", Excep);
                }
            }

            this.UpdateAnswerModel = function (_ImageURL) {
                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultCameraAnswerModeComponent.UpdateAnswerModel");

                    var AttributeId =  this.AttributeId ;
                    var ControlId = this.ControlId;
                    var SelectionType = 0;
                    var TemplateId = OneViewSessionStorage.Get("TemplateId");

                    var MultiMediaSubElementsAnswerMode = null;

                    var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
                    if (MultiMediaSubElementsAnswerModeDict != undefined) {
                        var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                        if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                            var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                            if (MultiMediaSubElementsAnswerModeList != undefined && MultiMediaSubElementsAnswerModeList != null && MultiMediaSubElementsAnswerModeList.length != 0) {
                                if (SelectionType == 0) {
                                    var IsUpdated = false;
                                    if (MultiMediaSubElementsAnswerModeList.length > 1) {
                                        for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                            UpdateMultiMediaElement(i, _ImageURL, MultiMediaSubElementsAnswerModeList, IsUpdated);
                                            for (var j = 0; j < LVTemplateResult[AttributeId].Answers.length; j++) {
                                                if (LVTemplateResult[AttributeId].Answers[j].ControlId == ControlId) {
                                                    LVTemplateResult[AttributeId].Answers[j].IsModified = true;
                                                    LVTemplateResult[AttributeId].Answers[j].ClientId = "";
                                                }
                                            }
                                        }
                                    }
                                    else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                                        UpdateMultiMediaElement(0, _ImageURL, MultiMediaSubElementsAnswerModeList, IsUpdated);
                                        for (var j = 0; j < LVTemplateResult[AttributeId].Answers.length; j++) {
                                            if (LVTemplateResult[AttributeId].Answers[j].ControlId == ControlId) {
                                                LVTemplateResult[AttributeId].Answers[j].IsModified = true;
                                                LVTemplateResult[AttributeId].Answers[j].ClientId = "";
                                            }
                                        }
                                    }
                                }
                                else if (SelectionType == 1) {
                                    //if (MultiMediaSubElementsAnswerModeList.length > 1) {
                                    //    for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                          //UpdateMultiMediaElement(i, _ImageURL, MultiMediaSubElementsAnswerModeList, IsUpdated);

                                    MultiMediaSubElementsAnswerModeList.push(CreateMultiMediaElement(_ImageURL));
                                    LVscope.MultiMediaSubElementsAnswerModeList = MultiMediaSubElementsAnswerModeList;
                                    LVscope.$apply();
                                    //        for (var j = 0; j < LVTemplateResult[AttributeId].Answers.length; j++) {
                                    //            if (LVTemplateResult[AttributeId].Answers[j].ControlId == ControlId) {
                                    //                LVTemplateResult[AttributeId].Answers[j].IsModified = true;
                                    //                LVTemplateResult[AttributeId].Answers[j].ClientId = "";
                                    //            }
                                    //        }
                                    //    }
                                    //}
                                    //else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                                    //    UpdateMultiMediaElement(0, _ImageURL, MultiMediaSubElementsAnswerModeList, IsUpdated);
                                    //    for (var j = 0; j < LVTemplateResult[AttributeId].Answers.length; j++) {
                                    //        if (LVTemplateResult[AttributeId].Answers[j].ControlId == ControlId) {
                                    //            LVTemplateResult[AttributeId].Answers[j].IsModified = true;
                                    //            LVTemplateResult[AttributeId].Answers[j].ClientId = "";
                                    //        }
                                    //    }
                                    //}
                                  //  alert("Multiple image capture not implemented");
                                }
                            }
                            else {
                                MultiMediaSubElementsAnswerModeList = [];
                                MultiMediaSubElementsAnswerMode = CreateMultiMediaElement(_ImageURL);
                                MultiMediaSubElementsAnswerModeList.push(MultiMediaSubElementsAnswerMode);
                            }
                        }
                        else {
                            var AttributeWiseMultiMediaSubElementsAnswerModeDict = {};
                            MultiMediaSubElementsAnswerMode = CreateMultiMediaElement(_ImageURL);
                            AttributeWiseMultiMediaSubElementsAnswerModeDict[AttributeId][ControlId].push(MultiMediaSubElementsAnswerMode);
                        }

                    }
                    else {
                        var AttributeWiseMultiMediaSubElementsAnswerModeDict = {};
                        MultiMediaSubElementsAnswerMode = CreateMultiMediaElement(_ImageURL);

                        var MultiMediaSubElementsAnswerModeList = [];
                        MultiMediaSubElementsAnswerModeList.push(MultiMediaSubElementsAnswerMode);

                        var ControlWiseMultiMediaSubElementsAnswerModeDict = {};
                        ControlWiseMultiMediaSubElementsAnswerModeDict[ControlId] = MultiMediaSubElementsAnswerModeList;

                        AttributeWiseMultiMediaSubElementsAnswerModeDict[AttributeId] = ControlWiseMultiMediaSubElementsAnswerModeDict;

                        CompleteMultiMediaSubElementsAnswerModeDict[TemplateId] = AttributeWiseMultiMediaSubElementsAnswerModeDict;

                        for (var j = 0; j < LVTemplateResult[AttributeId].Answers.length; j++) {
                            if (LVTemplateResult[AttributeId].Answers[j].ControlId == ControlId) {
                                LVTemplateResult[AttributeId].Answers[j].IsModified = true;
                            }
                        }

                        var Html = GetImageHtml(ControlId, _ImageURL);
                        Html = GetMultipleImageHtml(AttributeId, ControlId);

                        var DivId = '' + 'DivImage_' + ControlId + '';
                        var Div = document.getElementById(DivId);
                        Div.innerHTML = "";
                        //  Div.innerHTML = Html;
                        var _oOneViewCompiler = new OneViewCompiler();
                        _oOneViewCompiler.CompileAndApeend(LVscope, LVcompile, Html, DivId);
                    }

                    var ImageDOM = document.getElementById("Image_" + AttributeId);

                    if (ImageDOM != null) {
                        document.getElementById("Image_" + AttributeId).src = _ImageURL;
                    }
                    else {
                        //var Html = GetImageHtml(ControlId, _ImageURL);
                        //Html = GetMultipleImageHtml(AttributeId, ControlId);

                        //var DivId = '' + 'DivImage_' + ControlId + '';
                        //var Div = document.getElementById(DivId);
                        //Div.innerHTML = "";
                        ////  Div.innerHTML = Html;
                        //var _oOneViewCompiler = new OneViewCompiler();
                        //_oOneViewCompiler.CompileAndApeend(LVscope, LVcompile, Html, DivId);
                    }
                    //alert('CompleteMultiMediaSubElementsAnswerModeDict : ' + JSON.stringify(CompleteMultiMediaSubElementsAnswerModeDict));
                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultCameraAnswerModeComponent.UpdateAnswerModel");
                }
                catch (Excep) {
                    alert("LVDefaultCameraAnswerModeComponent.UpdateAnswerModel : " + Excep);
                    alert("LVDefaultCameraAnswerModeComponent.UpdateAnswerModel 22 : " + JSON.stringify(Excep));
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.UpdateAnswerModel", Excep);
                }
            }

            var CreateMultiMediaElement = function (_ImageURL) {
                try {
                    OneViewConsole.Debug("CreateMultiMediaElement Start", "LVDefaultCameraAnswerModeComponent.CreateMultiMediaElement");

                    var MultiMediaElement = {
                        "Id": 0,
                        "ServerId": 0,
                        "MappedEntityClientGuid": "",//""
                        "ClientGuid":"",
                        "Dimension": DATEntityType.DCResultDetails,
                        "MultiMediaType": "image/jpg",
                        "LocalURL": _ImageURL,
                        "Comments": "",
                        "IsDisabled": false,
                    };

                    OneViewConsole.Debug("CreateMultiMediaElement End", "LVDefaultCameraAnswerModeComponent.CreateMultiMediaElement");
                    return MultiMediaElement;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.CreateMultiMediaElement", Excep);
                }
            }

            var UpdateMultiMediaElement = function (i, _ImageURL, MultiMediaSubElementsAnswerModeList, IsUpdated) {
                try {
                    OneViewConsole.Debug("UpdateMultiMediaElement Start", "LVDefaultCameraAnswerModeComponent.UpdateMultiMediaElement");

                    var MultiMediaSubElements = MultiMediaSubElementsAnswerModeList[i];

                    if (MultiMediaSubElements.Id == 0) {
                        IsUpdated = true;
                        MultiMediaSubElements.LocalURL = _ImageURL; //only image saving               
                    }
                    else if (MultiMediaSubElements.ServerId == 0) {
                        MultiMediaSubElements.IsDisabled = true; //disabling old images
                    }

                    if ((MultiMediaSubElementsAnswerModeList.length == (i + 1)) && IsUpdated != true) {
                        MultiMediaSubElementsAnswerModeList.push(CreateMultiMediaElement(_ImageURL));
                    }

                    OneViewConsole.Debug("UpdateMultiMediaElement End", "LVDefaultCameraAnswerModeComponent.UpdateMultiMediaElement");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.UpdateMultiMediaElement", Excep);
                }
            }

            this.DeleteImage = function (AttributeId, ControlId, SelectionType) {
                try {
                    OneViewConsole.Debug("DeleteImage Start", "LVDefaultCameraAnswerModeComponent.DeleteImage");

                    //var AttributeId = "'" + TemplateNodeId + "'";
                    //var ControlId = "'" + AnswerMode.ControlId + "'";
                    //var SelectionType = "'" + AnswerMode.SelectionType + "'";
                    //var TemplateId = OneViewSessionStorage.Get("TemplateId");

                    
                    var IsDelete = CheckAnyImageAvailable(AttributeId, ControlId);
                    if (IsDelete == true) {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(LVxlatService.xlat("Confirmation"), LVxlatService.xlat("Are you sure you want to delete ?"), function (ConfirmationId) {

                            if (ConfirmationId == '2') {
                                DeleteImage(AttributeId, ControlId, SelectionType);
                            }
                        });
                    }
                    else {
                        alert(LVxlatService.xlat('No Image Available'));
                    }
                    OneViewConsole.Debug("DeleteImage End", "LVDefaultCameraAnswerModeComponent.DeleteImage");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.DeleteImage", Excep);
                }
            }

            var DeleteImage = function (AttributeId, ControlId, SelectionType) {
                try {
                    OneViewConsole.Debug("DeleteImage Start", "LVDefaultCameraAnswerModeComponent.DeleteImage");
                    var TemplateId = OneViewSessionStorage.Get("TemplateId");
                    if (SelectionType == 1) {
                        //  alert("Multiple image capture not implemented");
                        var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
                        if (MultiMediaSubElementsAnswerModeDict != undefined) {
                            var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                            if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                                var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                                if (MultiMediaSubElementsAnswerModeList != undefined) {
                                    if (MultiMediaSubElementsAnswerModeList.length > 1) {
                                        for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                            DeleteMultiMediaElement(MultiMediaSubElementsAnswerModeList, i);
                                            for (var j = 0; j < LVTemplateResult[AttributeId].Answers.length; j++) {
                                                if (LVTemplateResult[AttributeId].Answers[j].ControlId == ControlId) {
                                                    LVTemplateResult[AttributeId].Answers[j].IsModified = true;
                                                }
                                            }
                                        }
                                    }
                                    else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                                        DeleteMultiMediaElement(MultiMediaSubElementsAnswerModeList, 0);
                                        for (var j = 0; j < LVTemplateResult[AttributeId].Answers.length; j++) {
                                            if (LVTemplateResult[AttributeId].Answers[j].ControlId == ControlId) {
                                                LVTemplateResult[AttributeId].Answers[j].IsModified = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
                        if (MultiMediaSubElementsAnswerModeDict != undefined) {
                            var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                            if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                                var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                                if (MultiMediaSubElementsAnswerModeList != undefined) {
                                    if (MultiMediaSubElementsAnswerModeList.length > 1) {
                                        for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                            DeleteMultiMediaElement(MultiMediaSubElementsAnswerModeList, i);
                                            for (var j = 0; j < LVTemplateResult[AttributeId].Answers.length; j++) {
                                                if (LVTemplateResult[AttributeId].Answers[j].ControlId == ControlId) {
                                                    LVTemplateResult[AttributeId].Answers[j].IsModified = true;
                                                }
                                            }
                                        }
                                    }
                                    else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                                        DeleteMultiMediaElement(MultiMediaSubElementsAnswerModeList, 0);
                                        for (var j = 0; j < LVTemplateResult[AttributeId].Answers.length; j++) {
                                            if (LVTemplateResult[AttributeId].Answers[j].ControlId == ControlId) {
                                                LVTemplateResult[AttributeId].Answers[j].IsModified = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (MultiMediaSubElementsAnswerModeList == undefined || MultiMediaSubElementsAnswerModeList.length == 0) {
                            CompleteMultiMediaSubElementsAnswerModeDict[TemplateId] = undefined;
                            MyInstance.ClearControl(ControlId);
                        }
                        else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                            if (MultiMediaSubElementsAnswerModeList[0].ServerId != 0 && MultiMediaSubElementsAnswerModeList[0].IsDisabled == true) {
                                CompleteMultiMediaSubElementsAnswerModeDict[TemplateId] = undefined;
                                MyInstance.ClearControl(ControlId);
                            }
                        }
                    }
                    OneViewConsole.Debug("DeleteImage End", "LVDefaultCameraAnswerModeComponent.DeleteImage");
                }
                catch (Excep) {
                    alert("LVDefaultCameraAnswerModeComponent.DeleteImage : " + Excep);
                    alert("LVDefaultCameraAnswerModeComponent.DeleteImage 22 : " + JSON.stringify(Excep));
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.DeleteImage", Excep);
                }
            }

            var CheckAnyImageAvailable = function (AttributeId, ControlId) {
                try {
                    OneViewConsole.Debug("CheckAnyImageAvailable Start", "LVDefaultCameraAnswerModeComponent.CheckAnyImageAvailable");
                    var TemplateId = OneViewSessionStorage.Get("TemplateId");
                    var IsDelete = false;
                    var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
                    if (MultiMediaSubElementsAnswerModeDict != undefined) {
                        var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                        if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                            var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                            for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                if (MultiMediaSubElementsAnswerModeList[i].IsDisabled != true) {
                                    IsDelete = true;
                                    break;
                                }
                            }
                        }
                    }

                    OneViewConsole.Debug("CheckAnyImageAvailable End", "LVDefaultCameraAnswerModeComponent.CheckAnyImageAvailable");
                    return IsDelete;
                }
                catch (Excep) {
                    alert("LVDefaultCameraAnswerModeComponent.CheckAnyImageAvailable : " + Excep);
                    alert("LVDefaultCameraAnswerModeComponent.CheckAnyImageAvailable 22 : " + JSON.stringify(Excep));
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.CheckAnyImageAvailable", Excep);
                }
            }

            var DeleteMultiMediaElement = function (MultiMediaSubElementsAnswerModeList, i) {
                try {
                    OneViewConsole.Debug("UpdateMultiMediaElement Start", "LVDefaultCameraAnswerModeComponent.UpdateMultiMediaElement");

                    if (MultiMediaSubElementsAnswerModeList[i].ServerId == 0) {
                        MultiMediaSubElementsAnswerModeList.splice(i, 1);
                    }
                    else if (MultiMediaSubElementsAnswerModeList[i].ServerId != 0) {
                        MultiMediaSubElementsAnswerModeList[i].IsDisabled = true; //disabling old images
                    }
                    OneViewConsole.Debug("UpdateMultiMediaElement End", "LVDefaultCameraAnswerModeComponent.UpdateMultiMediaElement");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.UpdateMultiMediaElement", Excep);
                }
            }

            var GetSelectionType = function () {
                try {
                    OneViewConsole.Debug("GetSelectionType Start", "LVDefaultCameraAnswerModeComponent.GetSelectionType");
                    var Child = PTempMData[TemplateId].TemplateConfigMetaDataDetails.Childs[0];
                    var SelectionType;
                    for (var i = 0; i < Child.AnswerModes.length ; i++) {
                        var AnswerMode = Child.AnswerModes[i];
                        if (AnswerMode.ControlId == ControlId) {
                            if (AnswerMode.Type == "DCImageCaptureControlConfig") {
                                if (AnswerMode.SelectionType == 0) { //SINGLE
                                    SelectionType = 0;
                                }
                                else if (AnswerMode.SelectionType == 1) { //MULTI
                                    SelectionType = 1;
                                }
                                break;
                            }
                        }
                    }

                    OneViewConsole.Debug("GetSelectionType End", "LVDefaultCameraAnswerModeComponent.GetSelectionType");

                    return SelectionType;
                }
                catch (Excep) {
                    alert("LVDefaultCameraAnswerModeComponent.GetSelectionType : " + Excep);
                    alert("LVDefaultCameraAnswerModeComponent.GetSelectionType 22 : " + JSON.stringify(Excep));
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.GetSelectionType", Excep);
                }
            }

            this.Clear = function () {
                try {
                    OneViewConsole.Debug("Clear Start", "LVDefaultCameraAnswerModeComponent.Clear");

                    MyInstance.ClearAnswerModel();

                    OneViewConsole.Debug("Clear End", "LVDefaultCameraAnswerModeComponent.Clear");

                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.Clear", Excep);
                }

            }

            this.ClearAnswerModel = function () {

                try {
                    OneViewConsole.Debug("ClearAnswerModel Start", "LVDefaultCameraAnswerModeComponent.ClearAnswerModel");

                    //alert("AttributeId : " + AttributeId + ", ControlId : " + ControlId);
                    DeleteImage();

                    var _oPeriodicDefaultAnswerModeComponent = new PeriodicDefaultAnswerModeComponent(TemplateId, AttributeId, ControlId);
                    _oPeriodicDefaultAnswerModeComponent.ClearAnswerModel(AttributeId, ControlId);

                    OneViewConsole.Debug("ClearAnswerModel End", "LVDefaultCameraAnswerModeComponent.ClearAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.ClearAnswerModel", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            this.ClearControl = function (ControlId) {
                try {
                    OneViewConsole.Debug("UpdateAnswerUI Start", "LVDefaultCameraAnswerModeComponent.UpdateAnswerUI");

                    var DivId = '' + 'DivImage_' + ControlId + '';
                    var DOMObj = document.getElementById(DivId);
                    if (DOMObj != null) {
                        DOMObj.innerHTML = "";
                    }

                    OneViewConsole.Debug("UpdateAnswerUI End", "LVDefaultCameraAnswerModeComponent.UpdateAnswerUI");

                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.UpdateAnswerUI", Excep);
                }
            }

            this.GetAnswer = function () {
                try {
                    OneViewConsole.Debug("GetAnswer Start", "LVDefaultCameraAnswerModeComponent.GetAnswer");

                    var SelectionType = GetSelectionType();
                    var LocalURL = "";

                    var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
                    if (MultiMediaSubElementsAnswerModeDict != undefined) {
                        var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                        if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                            var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                            if (MultiMediaSubElementsAnswerModeList != undefined && MultiMediaSubElementsAnswerModeList != null && MultiMediaSubElementsAnswerModeList.length != 0) {
                                if (SelectionType == 0) {
                                    if (MultiMediaSubElementsAnswerModeList.length > 1) {
                                        for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                            var MultiMediaSubElementsAnswerMode = MultiMediaSubElementsAnswerModeList[i];
                                            if (MultiMediaSubElementsAnswerMode.IsDisabled != true && MultiMediaSubElementsAnswerMode.IsDisabled != 'true') {
                                                LocalURL = MultiMediaSubElementsAnswerMode.LocalURL;
                                                break;
                                            }
                                        }
                                    }
                                    else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                                        var MultiMediaSubElementsAnswerMode = MultiMediaSubElementsAnswerModeList[0];
                                        if (MultiMediaSubElementsAnswerMode.IsDisabled != true && MultiMediaSubElementsAnswerMode.IsDisabled != 'true') {
                                            LocalURL = MultiMediaSubElementsAnswerMode.LocalURL;
                                        }
                                    }
                                }
                                else if (SelectionType == 1) {
                                    alert("GetAnswer : Multiple image capture not implemented");
                                }
                            }
                        }
                    }
                    OneViewConsole.Debug("GetAnswer End", "LVDefaultCameraAnswerModeComponent.GetAnswer");
                    return LocalURL;
                }
                catch (Excep) {
                    alert("LVDefaultCameraAnswerModeComponent.GetAnswer 11 : " + Excep);
                    alert("LVDefaultCameraAnswerModeComponent.GetAnswer 22 : " + JSON.stringify(Excep));
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultCameraAnswerModeComponent.GetAnswer", Excep);
                }
            }
        }

        // LVDefaultRadioButtonControl
        function LVDefaultRadioButtonControl() {

            var MyInstance = this;

            this.RightPanelComponentKey = "LVDefaultRightPanelComponent";

            this.GetHtml = function (TemplateNodeId, AnswerMode, Answerlst) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultRadioButtonControl.GetHtml");

                    var ResultEntityList = [];

                    if (AnswerMode.ListViewDataSourceConfig.Type == "BandListViewDataSourceConfig" || AnswerMode.ListViewDataSourceConfig.Type == "_oBandListViewDataSourceConfig") {
                        var _oLVBandDetailsCacheComponent = new LVBandDetailsCacheComponent();
                        ResultEntityList = _oLVBandDetailsCacheComponent.GetBandDetailsByBandId(AnswerMode.ListViewDataSourceConfig.BandId);
                    }
                    else if (AnswerMode.ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig") {
                        alert("Not implemented exception, AnswerMode.ListViewDataSourceConfig.Type = " + AnswerMode.ListViewDataSourceConfig.Type + ", LVDefaultRadioButtonControl.GetHtml");
                    }
                    else {
                        alert("Not implemented exception, AnswerMode.ListViewDataSourceConfig.Type = " + AnswerMode.ListViewDataSourceConfig.Type + ", LVDefaultRadioButtonControl.GetHtml");
                    }

                    var AttributeNodeId = "'" + TemplateNodeId + "'";
                    var ControlId = "'" + AnswerMode.ControlId + "'";

                    var Html = '<div class="row responsive-sm"><div class="col">';

                    for (var i = 0; i < ResultEntityList.length; i++) {

                        var oResultEntity = ResultEntityList[i];

                        var ColourCode = "'" + oResultEntity.ColourCode + "'";
                        var Id = TemplateNodeId + "_" + AnswerMode.ControlId;

                        var ResultEntityId = "'" + oResultEntity.Id + "'";
                        var ResultEntityName = "'" + oResultEntity.Name + "'";
                        var Value = oResultEntity.Value;

                        var TagId = "'" + Id + "'";

                        var checked = "";

                        for (var j = 0; j < Answerlst.length; j++) {
                            if (Answerlst[j].Answer == oResultEntity.Id) {
                                checked = "checked";
                                break;
                            }
                        }

                        Html += '<label class="check-box">' +
                                    '<input style ="margin-right: 10px;" type="radio" id="' + Id + '" name="' + AnswerMode.ControlId + '" onclick="new LVDefaultRadioButtonControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',' + ResultEntityId + ',' + ResultEntityName + ',' + ColourCode + ',' + Value + ');" ' + checked + '/>' +
                                    oResultEntity.Name +
                                '</label>';
                    }

                    Html += '</div></div>';

                    OneViewConsole.Debug("GetHtml End", "LVDefaultBandControl.GetHtml");

                    return Html;                   
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRadioButtonControl.GetHtml", Excep);
                }
                finally {
                    ResultEntityList = null;
                }
            }

            this.UpdateAnswerModel = function (TemplateNodeId, ControlId, Answer, AnswerValue, ColourCode, Value) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultRadioButtonControl.UpdateAnswerModel");

                    if (LVTemplateResult[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA != true && LVTemplateResult[TemplateNodeId].IsBlocker != true) {

                        LVCurrentAttributeId = TemplateNodeId;
                        LVCurrentControlId = ControlId;

                        //alert(TemplateNodeId + "," + ControlId + "," + Answer + "," + AnswerValue + "," + ColourCode);                   

                        var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                        _oLVDefaultAnswerModeComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, AnswerValue, Value);
                       
                        var _oLVFactory = new LVFactory();
                        var _oRightPanelComponent = _oLVFactory.GetRightPanelComponent(this.RightPanelComponentKey);
                        _oRightPanelComponent.Open(LVRightPanelTab.Action, false);
                    }

                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultRadioButtonControl.UpdateAnswerModel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultRadioButtonControl.UpdateAnswerModel", LVxlatService);
                }
                finally {
                    _oLVDefaultAnswerModeComponent = null;
                    _oLVFactory = null;
                    _oRightPanelComponent = null;
                }
            }
           
            this.ClearAnswerModel = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("ClearAnswerModel Start", "LVDefaultRadioButtonControl.ClearAnswerModel");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);
                    ClearAll(ControlId);
                    var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                    _oLVDefaultAnswerModeComponent.ClearAnswerModel(TemplateNodeId, ControlId);                  

                    OneViewConsole.Debug("ClearAnswerModel End", "LVDefaultRadioButtonControl.ClearAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRadioButtonControl.ClearAnswerModel", Excep);
                }
                finally {
                    _oLVDefaultAnswerModeComponent = null;
                }
            }

            var ClearAll = function (ControlId) {

                try {
                    OneViewConsole.Debug("ClearAll Start", "LVDefaultRadioButtonControl.ClearAll");

                    var AllObj = document.getElementsByName(ControlId);
                    if (AllObj != null) {
                        for (var i = 0; i < AllObj.length; i++) {
                            AllObj[i].checked = "";
                        }
                    }

                    OneViewConsole.Debug("ClearAll End", "LVDefaultRadioButtonControl.ClearAll");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultRadioButtonControl.ClearAll", Excep);
                }
                finally {
                    AllObj = null;                    
                }
            }
        }

        // LVTemplateMetadataFormatterComponent
        function LVTemplateMetadataFormatterComponent() {

            var MyInstance = this;

            var Result = {};

            this.Format = function (TemplateNode) {

                try {
                    if (TemplateNode.Childs.length == 0) {

                        var TemplateNodeCopy = GetTemplateNodeCopy(TemplateNode);

                        Result[TemplateNode.Id] = TemplateNodeCopy;

                        for (var i = 0; i < TemplateNode.AnswerModes.length; i++) {
                            Result[TemplateNode.Id][TemplateNode.AnswerModes[i].ControlId] = TemplateNode.AnswerModes[i];
                        }

                        DeleteChilds(TemplateNodeCopy);
                        //DeleteAnswerModes(TemplateNodeCopy);
                    }
                    else {
                        var TotalCount = TemplateNode.Childs.length;

                        if (TotalCount > 0) {

                            var TemplateNodeCopy = GetTemplateNodeCopy(TemplateNode);

                            Result[TemplateNode.Id] = TemplateNodeCopy;

                            for (var i = 0; i < TotalCount; i++) {
                                TemplateNode.Childs[i].Parent = TemplateNode;
                                MyInstance.Format(TemplateNode.Childs[i]);
                            }

                            DeleteChilds(TemplateNodeCopy);
                        }
                    }

                    return Result;
                }
                catch (Excep) {                  
                    throw oOneViewExceptionHandler.Create("Framework", "LVTemplateNodeFormatterComponent.Format", Excep);
                }
            }

            var GetTemplateNodeCopy = function (TemplateNode) {

                try {
                    var TemplateNodeCopy = TemplateNode.constructor();

                    for (var itrNode in TemplateNode) {
                        if (TemplateNode.hasOwnProperty(itrNode)) TemplateNodeCopy[itrNode] = TemplateNode[itrNode];
                    }

                    return TemplateNodeCopy;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var DeleteChilds = function (TemplateNode) {

                try {
                    delete TemplateNode.Childs;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var DeleteAnswerModes = function (TemplateNode) {

                try {
                    delete TemplateNode.AnswerModes;
                }
                catch (Excep) {
                    throw Excep;
                }
            }
        }

        // LVDefaultNotificationComponent
        function LVDefaultNotificationComponent() {

            /// <summary>
            /// Notify
            /// </summary>
            /// <param name="Msg">Msg</param>  
            /// <param name="Type">Type</param>  
            this.Notify = function (Msg, Type) {

                try {
                    OneViewConsole.Debug("Notify Start", "LVDefaultNotificationComponent.Notify");

                    if (Type == "DefaultJavaScriptAlert") {
                        ShowDefaultJavaScriptAlert(Msg);
                    }
                    else if (Type == "DefaultNativeToast") {
                        ShowDefaultNativeToast(Msg);
                    }
                    else {
                        alert(Type + " : Not implemented exception, LVDefaultNotificationComponent.Notify");
                    }

                    OneViewConsole.Debug("Notify End", "LVDefaultNotificationComponent.Notify");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNotificationComponent.Notify", LVxlatService);
                }
            }


            /// <summary>
            /// ShowDefaultJavaScriptAlert
            /// </summary>
            /// <param name="Msg">Msg</param>        
            var ShowDefaultJavaScriptAlert = function (Msg) {

                try {
                    OneViewConsole.Debug("Notify Start", "LVDefaultNotificationComponent.ShowDefaultJavaScriptAlert");

                    navigator.notification.alert(msg, ['OK'], "");

                    OneViewConsole.Debug("Notify End", "LVDefaultNotificationComponent.ShowDefaultJavaScriptAlert");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNotificationComponent.ShowDefaultJavaScriptAlert", LVxlatService);
                }
            }


            /// <summary>
            /// ShowDefaultNativeToast
            /// </summary>
            /// <param name="Msg">Msg</param>           
            var ShowDefaultNativeToast = function (Msg) {

                try {
                    OneViewConsole.Debug("ShowDefaultNativeToast Start", "LVDefaultNotificationComponent.ShowDefaultNativeToast");

                    oOneViewAppInfoPlugin.ShowToast(Msg);

                    OneViewConsole.Debug("ShowDefaultNativeToast End", "LVDefaultNotificationComponent.ShowDefaultNativeToast");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNotificationComponent.ShowDefaultNativeToast", LVxlatService);
                }
            }
        }
        
        // LVFactory
        function LVFactory() {

            /// <summary>
            /// Get AttributeGroup Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetAttributeGroupComponent = function(Type){

                try {
                    OneViewConsole.Debug("GetAttributeGroupComponent Start", "LVFactory.GetAttributeGroupComponent");

                    switch(Type){
                        case "LVDefaultAttributeGroupComponent" : return new LVDefaultAttributeGroupComponent();
                        default : null;
                    }

                    OneViewConsole.Debug("GetAttributeGroupComponent End", "LVFactory.GetAttributeGroupComponent");
                }
                catch(Excep){
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetAttributeGroupComponent", Excep);
                }                
            }


            // <summary>
            /// Get Attribute Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetAttributeComponent = function(Type){

                try {
                    OneViewConsole.Debug("GetAttributeComponent Start", "LVFactory.GetAttributeComponent");

                    switch(Type){
                        case "LVDefaultAttributeComponent" : return new LVDefaultAttributeComponent();
                        default : null;
                    }

                    OneViewConsole.Debug("GetAttributeComponent End", "LVFactory.GetAttributeComponent");
                }
                catch(Excep){
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetAttributeComponent", Excep);
                }                
            }


            // <summary>
            /// Get NA Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetNAComponent = function(Type){

                try {
                    OneViewConsole.Debug("GetNAComponent Start", "LVFactory.GetNAComponent");

                    switch(Type){
                        case "LVDefaultNAComponent" : return new LVDefaultNAComponent();
                        default : null;
                    }

                    OneViewConsole.Debug("GetNAComponent End", "LVFactory.GetNAComponent");
                }
                catch(Excep){
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetNAComponent", Excep);
                }                
            }


            // <summary>
            /// Get DefaultValue Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetDefaultValueComponent = function(Type){

                try {
                    OneViewConsole.Debug("GetDefaultValueComponent Start", "LVFactory.GetDefaultValueComponent");

                    switch(Type){
                        case "LVDefaultDefaultValueComponent": return new LVDefaultValueComponent();
                        default : null;
                    }

                    OneViewConsole.Debug("GetDefaultValueComponent End", "LVFactory.GetDefaultValueComponent");
                }
                catch(Excep){
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetDefaultValueComponent", Excep);
                }                 
            }


            // <summary>
            /// Get BreadCrumb Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetBreadCrumbComponent = function(Type){

                try {
                    OneViewConsole.Debug("GetBreadCrumbComponent Start", "LVFactory.GetBreadCrumbComponent");

                    switch(Type){
                        case "LVDefaultBreadCrumbComponent" : return new LVDefaultBreadCrumbComponent();
                        default : null;
                    }

                    OneViewConsole.Debug("GetBreadCrumbComponent End", "LVFactory.GetBreadCrumbComponent");
                }
                catch(Excep){
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetBreadCrumbComponent", Excep);
                }   
            }


            // <summary>
            /// Get AnswerMode Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetAnswerModeComponent = function (Type) {

                try {
                    OneViewConsole.Debug("GetAnswerModeComponent Start", "LVFactory.GetAnswerModeComponent");

                    switch (Type) {
                        case "LVDefaultAnswerModeComponent": return new LVDefaultAnswerModeComponent();
                        default: null;
                    }

                    OneViewConsole.Debug("GetAnswerModeComponent End", "LVFactory.GetAnswerModeComponent");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetAnswerModeComponent", Excep);
                }
            }


            // <summary>
            /// Get TextBox Control
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetTextBoxControl = function (Type) {

                try {
                    OneViewConsole.Debug("GetTextBoxControl Start", "LVFactory.GetTextBoxControl");

                    switch (Type) {
                        case "LVDefaultTextBoxControl": return new LVDefaultTextBoxControl();
                        default: null;
                    }

                    OneViewConsole.Debug("GetTextBoxControl End", "LVFactory.GetTextBoxControl");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetTextBoxControl", Excep);
                }
            }


            // <summary>
            /// Get Numeric TextBox Control
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetNumericTextBoxControl = function (Type) {

                try {
                    OneViewConsole.Debug("GetNumericTextBoxControl Start", "LVFactory.GetNumericTextBoxControl");

                    switch (Type) {
                        case "LVDefaultNumericTextBoxControl": return new LVDefaultNumericTextBoxControl();
                        default: null;
                    }

                    OneViewConsole.Debug("GetNumericTextBoxControl End", "LVFactory.GetNumericTextBoxControl");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetNumericTextBoxControl", Excep);
                }
            }


            // <summary>
            /// Get Band Control
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetBandControl = function (Type) {

                try {
                    OneViewConsole.Debug("GetBandControl Start", "LVFactory.GetBandControl");

                    switch (Type) {
                        case "LVDefaultBandControl": return new LVDefaultBandControl();
                        default: null;
                    }

                    OneViewConsole.Debug("GetBandControl End", "LVFactory.GetBandControl");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetBandControl", Excep);
                }
            }

            // <summary>
            /// Get Get Capture Image Control
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 

            this.GetImageControl = function (Type) {
                try {
                    OneViewConsole.Debug("GetImageControl Start", "LVFactory.GetImageControl");

                    switch (Type) {
                        case "LVDefaultCameraAnswerModeComponent": return new LVDefaultCameraAnswerModeComponent();
                        default: null;
                    }

                    OneViewConsole.Debug("GetImageControl End", "LVFactory.GetImageControl");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetImageControl", Excep);
                }

            }
            

            // <summary>
            /// Get Radio Button Control
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetRadioButtonControl = function (Type) {

                try {
                    OneViewConsole.Debug("GetRadioButtonControl Start", "LVFactory.GetRadioButtonControl");

                    switch (Type) {
                        case "LVDefaultRadioButtonControl": return new LVDefaultRadioButtonControl();
                        default: null;
                    }

                    OneViewConsole.Debug("GetRadioButtonControl End", "LVFactory.GetRadioButtonControl");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetRadioButtonControl", Excep);
                }
            }


            // <summary>
            /// Get History Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetHistoryComponent = function (Type) {

                try {
                    OneViewConsole.Debug("GetHistoryComponent Start", "LVFactory.GetHistoryComponent");

                    switch (Type) {
                        case "LVHistoryComponent": return new LVHistoryComponent();
                        default: null;
                    }

                    OneViewConsole.Debug("GetHistoryComponent End", "LVFactory.GetHistoryComponent");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetHistoryComponent", Excep);
                }
            }


            // <summary>
            /// Get ActionPage Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetActionPageComponent = function (Type) {

                try {
                    OneViewConsole.Debug("GetActionPageComponent Start", "LVFactory.GetActionPageComponent");

                    switch (Type) {
                        case "LVDefaultActionPageComponent": return new LVDefaultActionPageComponent();
                        default: null;
                    }

                    OneViewConsole.Debug("GetActionPageComponent End", "LVFactory.GetActionPageComponent");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetActionPageComponent", Excep);
                }                
            }


            // <summary>
            /// Get Action NC Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetActionNCComponent = function (Type) {

                try {
                    OneViewConsole.Debug("GetActionNCComponent Start", "LVFactory.GetActionNCComponent");

                    switch (Type) {
                        case "LVActionNCComponent": return new LVActionNCComponent();
                        default: null;
                    }

                    OneViewConsole.Debug("GetActionNCComponent End", "LVFactory.GetActionNCComponent");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetActionNCComponent", Excep);
                }
            }


            // <summary>
            /// Get Notification Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetNotificationComponent = function (Type) {

                try {
                    OneViewConsole.Debug("GetNotificationComponent Start", "LVFactory.GetNotificationComponent");

                    switch (Type) {
                        case "LVDefaultNotificationComponent": return new LVDefaultNotificationComponent();
                        default: null;
                    }

                    OneViewConsole.Debug("GetNotificationComponent End", "LVFactory.GetNotificationComponent");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetNotificationComponent", Excep);
                }
            }


            // <summary>
            /// Get RightPanel Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetRightPanelComponent = function (Type) {

                try {
                    OneViewConsole.Debug("GetRightPanelComponent Start", "LVFactory.GetRightPanelComponent");

                    switch (Type) {
                        case "LVDefaultRightPanelComponent": return new LVDefaultRightPanelComponent();
                        default: null;
                    }

                    OneViewConsole.Debug("GetRightPanelComponent End", "LVFactory.GetRightPanelComponent");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetRightPanelComponent", Excep);
                }
            }


            // <summary>
            /// Get ScoringLogic Component
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetScoringLogicComponent = function (Type) {

                try {
                    OneViewConsole.Debug("GetScoreCalculationComponent Start", "LVFactory.GetScoreCalculationComponent");

                    switch (Type) {
                        case "LVDefaultScoringLogicComponent": return new LVDefaultScoringLogicComponent();
                        default: null;
                    }

                    OneViewConsole.Debug("GetScoreCalculationComponent End", "LVFactory.GetScoreCalculationComponent");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetScoreCalculationComponent", Excep);
                }
            }


            // <summary>
            /// Get DefaultVallidation Handler
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetDefaultVallidationHandler = function (Type) {

                try {
                    OneViewConsole.Debug("GetDefaultVallidationHandler Start", "LVFactory.GetDefaultVallidationHandler");

                    switch (Type) {
                        case "LVDefaultVallidationHandler": return new LVDefaultVallidationHandler();
                        default: null;
                    }

                    OneViewConsole.Debug("GetDefaultVallidationHandler End", "LVFactory.GetDefaultVallidationHandler");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetDefaultVallidationHandler", Excep);
                }
            }


            // <summary>
            /// Get ListViewDataSourceComponent
            /// </summary>
            /// <param name="Type">Factory key</param>    
            /// <returns>object</returns> 
            this.GetListViewDataSourceComponent = function (Type) {

                try {
                    OneViewConsole.Debug("GetListViewDataSourceComponent Start", "LVFactory.GetListViewDataSourceComponent");

                    switch (Type) {
                        case "DefaultTreeListViewDataSourceConfig": return new DefaultTreeListViewDataSourceComponent();
                        default: null;
                    }

                    OneViewConsole.Debug("GetListViewDataSourceComponent End", "LVFactory.GetListViewDataSourceComponent");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Factory", "LVFactory.GetListViewDataSourceComponent", Excep);
                }
            }
            
        }

        // LVDataCaptureBO
        function LVDataCaptureBO() {

            var MyInstance = this;

            var oLVFactory = new LVFactory();
            this.AttributeGroupComponentKey = "LVDefaultAttributeGroupComponent";
            this.VallidationHandler = "LVDefaultVallidationHandler";
            this.AnswerModeComponentKey = "LVDefaultAnswerModeComponent";
            this.DefaultNotificationKey = "DefaultJavaScriptAlert";
            this.LVDefaultNotificationComponentKey = "LVDefaultNotificationComponent";

            var oAnswerModeComponent = oLVFactory.GetAnswerModeComponent(MyInstance.AnswerModeComponentKey);
            
            this.IsValidationSuccess = function (LVTemplateResult) {

                try {
                    OneViewConsole.Debug("IsValidationSuccess Start", "LVDataCaptureBO.IsValidationSuccess");

                    //IsSuccess = false;
                    //if (Object.keys(LVTemplateResult).length > 0) {
                    //    IsSuccess = true;
                    //}

                    var Response = { IsSaveValidationSuccess: false, IsSubmitValidationSuccess: false };

                    if (LVTemplateResult != null && Object.keys(LVTemplateResult).length > 0) {

                        var VallidationHandler = oLVFactory.GetDefaultVallidationHandler(MyInstance.VallidationHandler);
                        var ValidationResponse = VallidationHandler.Validate({ "LVTemplateResult": LVTemplateResult, "Operation": "SaveValidationMetaData", "xlatService": LVxlatService });
                        Response.IsSaveValidationSuccess = ValidationResponse.IsSuccess;

                        //alert(JSON.stringify(ValidationResponse));

                        if (ValidationResponse.IsSuccess == true) {
                            ValidationResponse = VallidationHandler.Validate({ "LVTemplateResult": LVTemplateResult, "Operation": "SubmitValidationMetaData", "xlatService": LVxlatService });
                            Response.IsSubmitValidationSuccess = ValidationResponse.IsSuccess;
                        }
                        else {
                            var _oLVFactory = new LVFactory();
                            var _oNotificationComponent = _oLVFactory.GetNotificationComponent(MyInstance.LVDefaultNotificationComponentKey);
                            _oNotificationComponent.Notify(ValidationResponse.ErrorMessage, MyInstance.DefaultNotificationKey);
                        }

                        //alert(JSON.stringify(ValidationResponse));
                    }
                    else {
                        alert(LVxlatService.xlat("IN-SU-LVI-003 :: Perform data capture for atleast 1 attribute to save record"));
                    }

                    OneViewConsole.Debug("IsValidationSuccess End", "LVDataCaptureBO.IsValidationSuccess");

                    return Response;
                }
                catch(Excep){
                    throw oOneViewExceptionHandler.Create("Factory", "LVDataCaptureBO.IsValidationSuccess", Excep);
                }
            }

            this.GetLatitudeAndLongitude = function () {

                try {
                    OneViewConsole.Debug("GetLatitudeAndLongitude Start", "LVDataCaptureBO.GetLatitudeAndLongitude");

                    var Response = {
                        Latitude: "",
                        Longitude: "",
                        IsGeoLocationMandatory: (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") != "true") ? false : true, 
                        IsGeolocationSuccess: false
                    };

                    var _oOneViewGeolocationPlugin = new OneViewGeolocationPlugin();
                    Response.IsGeolocationSuccess = _oOneViewGeolocationPlugin.CheckGeolocation();
                    
                    if (Response.IsGeolocationSuccess == true) {
                        var GeolocationInfo = _oOneViewGeolocationPlugin.GetLatitudeAndLongitude();
                        if (GeolocationInfo.IsAnyException == false) {
                            Response.Latitude = GeolocationInfo.Latitude;
                            Response.Longitude = GeolocationInfo.Longitude;
                        }
                    }

                    OneViewConsole.Debug("GetLatitudeAndLongitude End", "LVDataCaptureBO.GetLatitudeAndLongitude");

                    return Response;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetLatitudeAndLongitude", Excep);
                }
            }

            this.ValidateGeoLocation = function () {

                try {
                    OneViewConsole.Debug("ValidateGeoLocation Start", "LVDataCaptureBO.ValidateGeoLocation");

                    var IsSuccess = true;
                    var Response = MyInstance.GetLatitudeAndLongitude();
                    var _oNotificationComponent = oLVFactory.GetNotificationComponent(this.LVDefaultNotificationComponentKey);

                    if (Response.IsGeoLocationMandatory == true) {

                        if (Response.IsGeolocationSuccess == false) {
                            _oNotificationComponent.Notify(LVxlatService.xlat("MN-RQ-LVI-015 :: Geo Location not found, Please switch on the Location."), MyInstance.DefaultNotificationKey);
                            IsSuccess = false;
                        }
                        else if (Response.IsGeolocationSuccess == true && Response.Latitude == "") {
                            _oNotificationComponent.Notify(LVxlatService.xlat("MN-RQ-LVI-016 :: Searching your location, Please wait."), MyInstance.DefaultNotificationKey);
                            IsSuccess = false;
                        }
                    }
                    
                    OneViewConsole.Debug("ValidateGeoLocation End", "LVDataCaptureBO.ValidateGeoLocation");

                    return IsSuccess;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.ValidateGeoLocation", Excep);
                }
            }

            this.Update = function (LVTemplateResult, LVDataCaptureId, LVDcResultsId, LVIsEdit, IsVallidationSuccess, LVDCSummary, MultiMediaSubElementsAnswerModeDict) {

                try {
                    OneViewConsole.Debug("Update Start", "LVDataCaptureBO.Update");

                    var DataCaptureRequest = MakeGetCompleteDataCaptureRequest(LVDcStartDate);

                    if (LVDcResultsId == 0) {

                        var oDcResultsEntity = GetDcResultsEntity(DataCaptureRequest, LVDCSummary);
                        oDcResultsEntity.DataCaptureId = LVDataCaptureId;

                        var oDefaultMasterDAO = new DefaultMasterDAO("DcResultsEntity");
                        var oResultDcResultsEntity = oDefaultMasterDAO.CreateMaster(oDcResultsEntity);

                        LVDcResultsId = oResultDcResultsEntity.Id;
                        LVDcResultsClientGuid = oResultDcResultsEntity.ClientGuid;
                    }
                  
                    //alert(JSON.stringify(LVTemplateResult));
                    var IsSuccess = true;

                    var _DateTime = new DateTime();
                    var CurrenntDateAndTime = _DateTime.GetDateAndTime();
                    
                    var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

                    try{
                        _oOneViewSqlitePlugin.StartTransaction();

                        var oDefaultMasterDAO = new DefaultMasterDAO("DcResultDetailsEntity");
                        var DcResultDetailsEntityCount = oDefaultMasterDAO.Count();

                   //     var Result = { DcResultsId: LVDcResultsId, DcResultsClientGuid: LVDcResultsClientGuid, IsSuccess: true, DcResultDetails: {} };

                        var Result = { DcResultsId: LVDcResultsId, DcResultsClientGuid: LVDcResultsClientGuid, IsSuccess: true, DcResultDetails: {}, 'CreatedMultiMediaSubElementsAnswerModeList': null };

                        var DCSummary = GetDCSummary();
                       
                        for (var itrAttributes in LVTemplateResult) {

                            var DataCaptureRequest = MakeGetCompleteDataCaptureRequest(LVDcStartDate);
                            var AttributeNodeId = LVTemplateResult[itrAttributes].Id;
                            var AttributeNodeName = LVTemplateResult[itrAttributes].Name;
                            var Comments = LVTemplateResult[itrAttributes].Comments;
                            var IsNA = LVTemplateResult[itrAttributes].NA;
                            var IsBlocker = LVTemplateResult[itrAttributes].IsBlocker;
                            var ESTTime = LVTemplateResult[itrAttributes].ESTTime;
                            ESTTime = (ESTTime != undefined) ? ESTTime : 0;
                            var ActualTime = LVTemplateResult[itrAttributes].ActualTime;
                            var IsManualESTEnabled = LVTemplateResult[itrAttributes].IsManualESTEnabled;

                            var oAnswers = LVTemplateResult[itrAttributes].Answers;

                            //alert(JSON.stringify(LVTemplateResult[itrAttributes]));
                           
                            for (var i = 0; i < oAnswers.length; i++) {

                                //alert(JSON.stringify(oAnswers[i]));

                                var Latitude = oAnswers[i].Latitude;
                                var Longitude = oAnswers[i].Longitude;
                            
                               

                                if (oAnswers[i].ClientId != "" && oAnswers[i].IsModified == true) {
                                    if (oAnswers[i].AnswerMode == "DCImageCaptureControlConfig") {
                                            var query = "Delete from DcResultDetailsEntity where Id=" + oAnswers[i].ClientId;
                                            window.OneViewSqlite.excecuteSql(query);
                                            var DeleteQuery = "DELETE FROM MultiMediaSubElements WHERE MappedEntityClientGuid  = '"+ oAnswers[i].ClientGuid +"'";
                                            window.OneViewSqlite.excecuteSql(DeleteQuery);
                                            oAnswers[i].IsModified = false;
                                            oAnswers[i].ClientGuid = "";
                                            oAnswers[i].ClientId = "";                                        
                                    }
                                    else {
                                        var Query = "UPDATE DcResultDetailsEntity SET Answer='" + oAnswers[i].Answer + "',AnswerValue='" + oAnswers[i].AnswerValue + "' ,IsSynchronized='false',LastUpdatedDate ='" + CurrenntDateAndTime +
                                        "',Comments = '" + Comments + "',IsNA = '" + IsNA + "',IsBlocker = '" + IsBlocker + "',Score = " + oAnswers[i].Score + ",MaxScore=" + oAnswers[i].MaxScore + ",Percentage=" + oAnswers[i].Percentage + ",CompletedChildCount=" + oAnswers[i].CompletedChildCount +
                                        ",TotalChildCount=" + oAnswers[i].TotalChildCount + ",CompletedAttributeCount=" + oAnswers[i].CompletedAttributeCount + ",TotalAttributeCount=" + oAnswers[i].TotalAttributeCount + ",TimeStamp = '" + CurrenntDateAndTime +
                                        "',ESTTime=" + ESTTime + ",ActualTime=" + ActualTime + ",IsManualESTEnabled='" + IsManualESTEnabled +
                                        "',Latitude = '" + Latitude + "',Longitude = '" + Longitude + "' WHERE Id=" + oAnswers[i].ClientId;
                                        //alert(Query);
                                        window.OneViewSqlite.excecuteSql(Query);
                                        oAnswers[i].IsModified = false;
                                        var LocalDcResultDetails = { 'Id': oAnswers[i].ClientId, 'ClientGuid': oAnswers[i].ClientGuid, 'ControlId': oAnswers[i].ControlId };

                                    }   
                                    Result.CreatedMultiMediaSubElementsAnswerModeList = UpdateMultiMediaSubElementsAnswerMode(AttributeNodeId, LocalDcResultDetails, MultiMediaSubElementsAnswerModeDict);

                                }
                                else if (oAnswers[i].ClientId == "" && oAnswers[i].IsModified == true) {

                                    var oAnswerMode = oAnswers[i];
                                    var DcResultDetailsEntity = GetDcResultDetailsEntity(DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, oAnswerMode, Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled);
                                    
                                    DcResultDetailsEntity.DataCaptureId = LVDataCaptureId;
                                    DcResultDetailsEntity.DataResultsId  = LVDcResultsId;
                                   
                                    var oDcResultDetails = oDefaultMasterDAO.Create(DcResultDetailsEntity, DcResultDetailsEntityCount);                                  
                                    Result.DcResultDetails[oDcResultDetails.ControlId] = { "ClientId": oDcResultDetails.Id, "ClientGuid": oDcResultDetails.ClientGuid };
                                   
                                    DcResultDetailsEntityCount += 1;

                                    Result.CreatedMultiMediaSubElementsAnswerModeList = UpdateMultiMediaSubElementsAnswerMode(AttributeNodeId, oDcResultDetails, MultiMediaSubElementsAnswerModeDict);
                                    //alert(JSON.stringify(DcResultDetailsEntity));
                                }
                             
                            }                           
                        }

                        var _ActionDAO = new ActionDAO();

                        var Actions = {};
                        var IsNC = false;

                        for (var itrLVActionResult in LVActionResult) {
                            if (LVActionResult[itrLVActionResult].IsNC == true) {
                                IsNC = true;
                            }
                            //alert(JSON.stringify(LVActionResult[itrLVActionResult]));
                            if (LVActionResult[itrLVActionResult].DCNCMappingClientId == "") {                             
                                var oAction = GetAction(DataCaptureRequest, LVDataCaptureClientGuid, LVDcResultsClientGuid, itrLVActionResult, "", LVActionResult[itrLVActionResult]);
                                Actions[itrLVActionResult] = oAction;
                                //alert(JSON.stringify(oAction));
                            }
                            else if (LVActionResult[itrLVActionResult].IsDisable == true) {
                                //alert("DCNCMapping : " + LVActionResult[itrLVActionResult].IsDisable + ", RuleId : " + itrLVActionResult + ", DNNCMappimgServerId : " + LVActionResult[itrLVActionResult].DNNCMappimgServerId);
                                if (LVActionResult[itrLVActionResult].DNNCMappimgServerId == 0) {
                                    _ActionDAO.DeleteAction(LVDataCaptureClientGuid, itrLVActionResult);                                    
                                }
                                else {
                                    //alert("Disable action");
                                    _ActionDAO.DisableAction(LVDataCaptureClientGuid, itrLVActionResult);
                                }
                                delete LVActionResult[itrLVActionResult];
                            }
                            else {
                                var DeletedActionIndexLst = [];
                                for (var i = 0; i < LVActionResult[itrLVActionResult].Actions.length; i++) {
                                    //alert("ActionsDetails : " + JSON.stringify(LVActionResult[itrLVActionResult].Actions[i]));
                                    if (LVActionResult[itrLVActionResult].Actions[i].IsDisable == true) {                                       
                                        if (LVActionResult[itrLVActionResult].Actions[i].ActionDetailsServerId == 0) {
                                            _ActionDAO.DeleteActionDetails(LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId);
                                        }
                                        else {
                                            _ActionDAO.DisableActionDetails(LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId, LVDataCaptureClientGuid, itrLVActionResult);
                                        }
                                        //LVActionResult[itrLVActionResult].Actions.splice(i, 1);
                                        DeletedActionIndexLst.push(i);
                                    }
                                    else if (LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId == "") {
                                        //alert(JSON.stringify(LVActionResult[itrLVActionResult].Actions[i]));                                      
                                        var _oActionDetailsEntity = GetActionDetailsEntity(DataCaptureRequest, LVActionResult[itrLVActionResult].ActionClientGuid, "", LVActionResult[itrLVActionResult].Actions[i]);
                                        //alert(JSON.stringify(_oActionDetailsEntity));

                                        var _oActionDetailsDAO = new DefaultMasterDAO("ActionDetailsEntity");
                                        _oActionDetailsEntity = _oActionDetailsDAO.CreateMaster(_oActionDetailsEntity);

                                        _ActionDAO.UpdateSyncStatusForDCNCMappingAndAction(LVDataCaptureClientGuid, itrLVActionResult);

                                        LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId = _oActionDetailsEntity.Id;

                                        //alert(JSON.stringify(LVActionResult[itrLVActionResult]));
                                    }
                                }
                                for (var i = 0; i < DeletedActionIndexLst.length; i++) {
                                    LVActionResult[itrLVActionResult].Actions.splice(DeletedActionIndexLst[i], 1);
                                }
                                var DeletedMultimediaSubElements = [];
                                for (var j = 0; j < LVActionResult[itrLVActionResult].MultimediaSubElements.length; j++) {                                    
                                    if (LVActionResult[itrLVActionResult].MultimediaSubElements[j].IsDisabled == true) {
                                        if (LVActionResult[itrLVActionResult].MultimediaSubElements[j].ServerId == 0) {
                                            _ActionDAO.DeleteMultiMediaSubElements(LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId);
                                        }
                                        else {
                                            _ActionDAO.DisableMultiMediaSubElements(LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId, LVDataCaptureClientGuid, itrLVActionResult);
                                        }
                                        //LVActionResult[itrLVActionResult].MultimediaSubElements.splice(j, 1);
                                        DeletedMultimediaSubElements.push(j);
                                    }
                                    else if (LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId == "") {                                       
                                        LVActionResult[itrLVActionResult].MultimediaSubElements[j].MappedEntityClientGuid = LVActionResult[itrLVActionResult].ActionClientGuid;
                                        var _oMultiMediaSubElements = GetMultiMediaSubElement(DataCaptureRequest, LVActionResult[itrLVActionResult].MultimediaSubElements[j]);
                                       
                                        var _oMultiMediaSubElementsDAO = new DefaultMasterDAO("MultiMediaSubElements");
                                        _oMultiMediaSubElements = _oMultiMediaSubElementsDAO.CreateMaster(_oMultiMediaSubElements);

                                        _ActionDAO.UpdateSyncStatusForDCNCMappingAndAction(LVDataCaptureClientGuid, itrLVActionResult);

                                        LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId = _oMultiMediaSubElements.Id;
                                        LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientGuid = _oMultiMediaSubElements.ClientGuid;
                                    }
                                }
                                for (var j = 0; j < DeletedMultimediaSubElements.length; j++) {
                                    LVActionResult[itrLVActionResult].MultimediaSubElements.splice(DeletedMultimediaSubElements[j], 1);
                                }
                            }                          
                        }

                        if (JSON.stringify(Actions) != '{}') {
                            var ActionInfo = _ActionDAO.CreateActions(Actions);

                            var Key;
                            for (var itrLVActionResult in LVActionResult) {
                                if (ActionInfo[itrLVActionResult] != undefined) {
                                    LVActionResult[itrLVActionResult].ActionClientId = ActionInfo[itrLVActionResult].ActionClientId;
                                    LVActionResult[itrLVActionResult].ActionClientGuid = ActionInfo[itrLVActionResult].ActionClientGuid;
                                    LVActionResult[itrLVActionResult].DCNCMappingClientId = ActionInfo[itrLVActionResult].DCNCMappingClientId;
                                    for (var i = 0; i < LVActionResult[itrLVActionResult].Actions.length; i++) {
                                        if (LVActionResult[itrLVActionResult].Actions[i].ActionType == LVActionType.CustomAction) {
                                            Key = LVActionResult[itrLVActionResult].Actions[i].Name;
                                        }
                                        else if (LVActionResult[itrLVActionResult].Actions[i].ActionType == LVActionType.PredefinedAction) {
                                            Key = LVActionResult[itrLVActionResult].Actions[i].PreDefinedActionId;
                                        }
                                        LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId = ActionInfo[itrLVActionResult].ActionDetails[Key].ActionDetailsClientId;
                                    }
                                    for (var j = 0; j < LVActionResult[itrLVActionResult].MultimediaSubElements.length; j++) {
                                        LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId = ActionInfo[itrLVActionResult].MultiMediaSubElements[LVActionResult[itrLVActionResult].MultimediaSubElements[j].LocalURL].ClientId;
                                        LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientGuid = ActionInfo[itrLVActionResult].MultiMediaSubElements[LVActionResult[itrLVActionResult].MultimediaSubElements[j].LocalURL].ClientGuid;
                                    }
                                }
                            }
                        }

                        var DataCaptureUpdateQuery = "UPDATE DataCaptureEntity SET IsSynchronized='false',TimeStamp = '" + CurrenntDateAndTime + "',IsAnyNC = '" + IsNC + "',IsCompleted = '" + IsVallidationSuccess +
                            "' WHERE Id=" + LVDataCaptureId;
                        window.OneViewSqlite.excecuteSql(DataCaptureUpdateQuery);

                        var DcComments = (LVDCSummary.CommentsInfo.IsModified == true) ? LVDCSummary.CommentsInfo.Comments : "";

                        var DCResultsUpdateQuery = "UPDATE DcResultsEntity SET IsSynchronized='false',TimeStamp = '" + CurrenntDateAndTime + "',LastUpdatedDate = '" + CurrenntDateAndTime + "',Comments = '" + DcComments +
                            "',ShiftId = " + DataCaptureRequest.ShiftId + ",ShiftName = '" + DataCaptureRequest.ShiftName + "' WHERE Id=" + LVDcResultsId;
                        window.OneViewSqlite.excecuteSql(DCResultsUpdateQuery);

                        SaveDCBlockers(LVDcStartDate);

                        var IsCompleted = IsVallidationSuccess;
                        if (IsVallidationSuccess == false && LVTemplateMandatoryValidationMetaData == null) {
                            IsCompleted = (DCSummary.CompletedCount == DCSummary.TotalCount) ? true : false;
                        }

                        var _oDasboardBO = new DasboardBO(LVscope, '', LVxlatService, '', '', '', '');
                        _oDasboardBO.UpdateTaskStatus_EditDC(IsCompleted);

                        UpdateScore(LVDataCaptureId, LVDcResultsId, DCSummary, false, IsVallidationSuccess);

                        _oOneViewSqlitePlugin.EndTransaction();
                    }
                    catch (Excep) {
                        //alert(Excep);
                        //alert(JSON.stringify(Excep));
                        Result.IsSuccess = false;
                        Result.DcResultDetails = null;
                        _oOneViewSqlitePlugin.Rollback();
                    }

                    OneViewConsole.Debug("Update End", "LVDataCaptureBO.Update");

                    return Result;
                }
                catch (Excep) {                  
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.Update", Excep);
                }
                finally {
                    IsSuccess = null;
                    _DateTime = null;
                    CurrenntDateAndTime = null;
                    _oOneViewSqlitePlugin = null;
                    DataCaptureRequest = null;
                    AttributeNodeId = null;
                    AttributeNodeName = null;
                    Comments = null;
                    oAnswers = null;
                }               
            }

            this.Save = function (LVTemplateResult, LVDcStartDate, IsVallidationSuccess, LVDCSummary, MultiMediaSubElementsAnswerModeDict) {

                try {
                    OneViewConsole.Debug("Save Start", "LVDataCaptureBO.Save");

                    var IsDcSaveSuccess = false;
                    var IsActionSaveSuccess = true;

                    var DCSummary = GetDCSummary();

                    var oDataCaptureAndActionEntity = GetCompleteDataCaptureAndActionEntity(LVTemplateResult, LVDcStartDate, LVDCSummary);
                    //alert(JSON.stringify(oDataCaptureEntity));

                    var oDataCaptureEntity = oDataCaptureAndActionEntity.oDataCaptureEntity;
                    oDataCaptureEntity.IsCompleted = IsVallidationSuccess;
                    var Actions = oDataCaptureAndActionEntity.Actions;

                    var _oDcDAO = new DcDAO();
                    var _oActionDAO = new ActionDAO();

                    var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

                    try {
                        _oOneViewSqlitePlugin.StartTransaction();

                        var DcInfo = _oDcDAO.CreateAndReturn(oDataCaptureEntity, false);
                        IsDcSaveSuccess = (DcInfo != null) ? true : false;

                        var CreatedMultiMediaSubElementsAnswerModeList = CreateMultiMediaSubElementsAnswerMode(oDataCaptureEntity, MultiMediaSubElementsAnswerModeDict);

                        var IsMultiMediaSubElementsAnswerModeSuccess = (CreatedMultiMediaSubElementsAnswerModeList != null ? true : false);

                        var AttributeActionInfo = null;

                        if (JSON.stringify(Actions) != '{}') {                          
                            AttributeActionInfo = _oActionDAO.CreateActions(Actions);
                            IsActionSaveSuccess = (AttributeActionInfo != null) ? true : false;                        
                        }

                        if (DcInfo != null && DcInfo != "" && DcInfo != undefined) {

                            LVDataCaptureId = DcInfo.DcId;
                            LVDcResultsId = DcInfo.DcResultsId;

                            SaveDCBlockers(LVDcStartDate);

                            UpdateScore(LVDataCaptureId, LVDcResultsId, DCSummary, true, IsVallidationSuccess);
                        }

                        var _oDasboardBO = new DasboardBO(LVscope, '', LVxlatService, '', '', '', '');
                        _oDasboardBO.UpdateTaskStatus_NewDC((OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == "true") ? true : false);

                        _oOneViewSqlitePlugin.EndTransaction();
                        
                        if (IsDcSaveSuccess == false || IsActionSaveSuccess == false || IsMultiMediaSubElementsAnswerModeSuccess == false) {
                            _oOneViewSqlitePlugin.Rollback();
                        }                        
                    }
                    catch (Excep) {
                        //alert(Excep);
                        //alert(JSON.stringify(Excep));
                        DcInfo = null;
                        AttributeActionInfo = null;
                        _oOneViewSqlitePlugin.Rollback();
                    }

                    OneViewConsole.Debug("Save End", "LVDataCaptureBO.Save");
                    
                    return { "DcInfo": DcInfo, "AttributeActionInfo": AttributeActionInfo };
                }
                catch (Excep) {
                   
                    return { "DcInfo": null, "AttributeActionInfo": null };;
                }
                finally {
                    IsSaveSuccess = null;
                    oDataCaptureEntity = null;
                    _oDcDAO = null;
                    _oOneViewSqlitePlugin = null;
                    IsSuccess = null;                    
                }                
            }

            var CreateMultiMediaSubElementsAnswerMode = function (oDataCaptureEntity, MultiMediaSubElementsAnswerModeDict) {

                try {
                    OneViewConsole.Debug("CreateMultiMediaSubElementsAnswerMode Start", "LVDataCaptureBO.CreateMultiMediaSubElementsAnswerMode");

                    var CreatedMultiMediaSubElementsAnswerModeList = [];

                    var _oPlatformPeriodicsDcMultimediaHandler = new PlatformPeriodicsDcMultimediaHandler();

                    for (var AttributeNodeId in MultiMediaSubElementsAnswerModeDict) {
                        var ControlWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeNodeId];
                        for (var ControlId in ControlWiseMultiMediaSubElementsAnswerModeDict) {
                            var MultiMediaSubElementsList = ControlWiseMultiMediaSubElementsAnswerModeDict[ControlId];

                            for (var i = 0; i < oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList.length ; i++) {
                                var DcResultDetail = oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList[i];
                                if (AttributeNodeId == DcResultDetail.AttributeNodeId && ControlId == DcResultDetail.ControlId) {
                                    ModifyMultiMediaSubElementsAnswerMode(DcResultDetail, MultiMediaSubElementsList, CreatedMultiMediaSubElementsAnswerModeList, _oPlatformPeriodicsDcMultimediaHandler);
                                    //for (var j = 0; j < MultiMediaSubElementsList.length; j++) {
                                    //    var MultiMediaSubElements = MultiMediaSubElementsList[j];
                                    //    if (MultiMediaSubElements.IsDisabled == true) {
                                    //        _oPlatformPeriodicsDcMultimediaHandler.Update(MultiMediaSubElements);
                                    //    }
                                    //    else {
                                    //        var LocalMultiMediaSubElements = _oPlatformPeriodicsDcMultimediaHandler.Get(DcResultDetail.ClientGuid, DATEntityType.DCResultDetails);
                                    //        if (LocalMultiMediaSubElements != null && LocalMultiMediaSubElements.length == 1) {
                                    //            //update
                                    //            MultiMediaSubElements.Id = LocalMultiMediaSubElements[0].Id;
                                    //            MultiMediaSubElements.ServerId = (LocalMultiMediaSubElements[0].ServerId != "INT" ? LocalMultiMediaSubElements[0].ServerId : 0);
                                    //            _oPlatformPeriodicsDcMultimediaHandler.UpdateMultiMedia(MultiMediaSubElements);
                                    //            CreatedMultiMediaSubElementsAnswerModeList.push(MultiMediaSubElements);
                                    //        }
                                    //        else {
                                    //            //create
                                    //            MultiMediaSubElements.MappedEntityClientGuid = DcResultDetail.ClientGuid;
                                    //            var CreatedMultiMediaSubElements = _oPlatformPeriodicsDcMultimediaHandler.Save(MultiMediaSubElements);
                                    //            CreatedMultiMediaSubElementsAnswerModeList.push(CreatedMultiMediaSubElements);
                                    //        }
                                    //    }
                                    //}
                                }

                            }
                        }
                    }

                    OneViewConsole.Debug("CreateMultiMediaSubElementsAnswerMode End", "LVDataCaptureBO.CreateMultiMediaSubElementsAnswerMode");

                    return CreatedMultiMediaSubElementsAnswerModeList;
                }
                catch (Excep) {
                    alert("LVDataCaptureBO.CreateMultiMediaSubElementsAnswerMode : " + Excep);
                    alert("LVDataCaptureBO.CreateMultiMediaSubElementsAnswerMode 22 : " + JSON.stringify(Excep));
                    CreatedMultiMediaSubElementsAnswerModeList = null;
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.CreateMultiMediaSubElementsAnswerMode", Excep);
                }
                finally {

                }
            }

            var UpdateMultiMediaSubElementsAnswerMode = function (AttributeNodeId, DcResultDetail, MultiMediaSubElementsAnswerModeDict) {

                try {
                    OneViewConsole.Debug("UpdateMultiMediaSubElementsAnswerMode Start", "LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode");

                    //alert('MultiMediaSubElementsAnswerModeDict : ' + MultiMediaSubElementsAnswerModeDict);

                    var CreatedMultiMediaSubElementsAnswerModeList = [];
                    var _oPlatformPeriodicsDcMultimediaHandler = new PlatformPeriodicsDcMultimediaHandler();

                    if (MultiMediaSubElementsAnswerModeDict != undefined) {
                        var ControlWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeNodeId];
                        if (ControlWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                            var MultiMediaSubElementsList = ControlWiseMultiMediaSubElementsAnswerModeDict[DcResultDetail.ControlId];
                            ModifyMultiMediaSubElementsAnswerMode(DcResultDetail, MultiMediaSubElementsList, CreatedMultiMediaSubElementsAnswerModeList, _oPlatformPeriodicsDcMultimediaHandler);
                        }
                    }
                    OneViewConsole.Debug("UpdateMultiMediaSubElementsAnswerMode End", "LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode");

                    return CreatedMultiMediaSubElementsAnswerModeList;
                }
                catch (Excep) {
                    alert("LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode : " + Excep);
                    alert("LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode 22 : " + JSON.stringify(Excep));
                    CreatedMultiMediaSubElementsAnswerModeList = null;
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode", Excep);
                }
                finally {

                }
            }

            var ModifyMultiMediaSubElementsAnswerMode = function (DcResultDetail, MultiMediaSubElementsList, CreatedMultiMediaSubElementsAnswerModeList, _oPlatformPeriodicsDcMultimediaHandler) {
                try {
                    OneViewConsole.Debug("ModifyMultiMediaSubElementsAnswerMode Start", "LVDataCaptureBO.ModifyMultiMediaSubElementsAnswerMode");

                    if (MultiMediaSubElementsList != null && MultiMediaSubElementsList.length > 0) {
                        for (var j = 0; j < MultiMediaSubElementsList.length; j++) {
                            var MultiMediaSubElements = MultiMediaSubElementsList[j];
                            if (MultiMediaSubElements.IsDisabled == true) {
                                _oPlatformPeriodicsDcMultimediaHandler.Update(MultiMediaSubElements);
                            }
                            else {
                                var LocalMultiMediaSubElements = _oPlatformPeriodicsDcMultimediaHandler.Get(DcResultDetail.ClientGuid, DATEntityType.DCResultDetails);
                                if (LocalMultiMediaSubElements != null && LocalMultiMediaSubElements.length == 1) {
                                    //update
                                    MultiMediaSubElements.Id = LocalMultiMediaSubElements[0].Id;
                                    MultiMediaSubElements.ServerId = (LocalMultiMediaSubElements[0].ServerId != "INT" ? LocalMultiMediaSubElements[0].ServerId : 0);
                                    _oPlatformPeriodicsDcMultimediaHandler.UpdateMultiMedia(MultiMediaSubElements);
                                    CreatedMultiMediaSubElementsAnswerModeList.push(MultiMediaSubElements);
                                }
                                else {
                                    //create
                                    MultiMediaSubElements.MappedEntityClientGuid = DcResultDetail.ClientGuid;
                                    var CreatedMultiMediaSubElements = _oPlatformPeriodicsDcMultimediaHandler.Save(MultiMediaSubElements);
                                    CreatedMultiMediaSubElementsAnswerModeList.push(CreatedMultiMediaSubElements);
                                }
                            }
                        }
                    }
                    OneViewConsole.Debug("ModifyMultiMediaSubElementsAnswerMode End", "LVDataCaptureBO.ModifyMultiMediaSubElementsAnswerMode");

                    return CreatedMultiMediaSubElementsAnswerModeList;
                }
                catch (Excep) {
                    alert("LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode : " + Excep);
                    alert("LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode 22 : " + JSON.stringify(Excep));
                    CreatedMultiMediaSubElementsAnswerModeList = null;
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode", Excep);
                }
                finally {

                }
            }

            var GetDCSummary = function () {

                try {
                    OneViewConsole.Debug("GetSummary Start", "LVDataCaptureBO.GetSummary");

                    var oAttributeGroupComponent = oLVFactory.GetAttributeGroupComponent(MyInstance.AttributeGroupComponentKey);
                    var Summary = oAttributeGroupComponent.GetSummary(LVTemplateConfigMetaData.TemplateConfigMetaDataDetails, true, true);

                    OneViewConsole.Debug("GetSummary End", "LVDataCaptureBO.GetSummary");

                    return Summary;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetSummary", Excep);
                }
                finally {

                }
            }

            var UpdateScore = function (LVDataCaptureId, LVDcResultsId, DCSummary, IsSave, IsVallidationSuccess) {

                try {
                    OneViewConsole.Debug("UpdateScore Start", "LVDataCaptureBO.UpdateScore");
                    
                    var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();
                    
                    var _DateTime = new DateTime();
                    var CurrenntDateAndTime = _DateTime.GetDateAndTime();

                    var IsCompleted = IsVallidationSuccess;
                    
                    if (IsVallidationSuccess == false && LVTemplateMandatoryValidationMetaData == null) {
                        IsCompleted = (DCSummary.CompletedCount == DCSummary.TotalCount) ? true : false;                       
                    }

                    var IsAnyDCBlocker = GetDcBlockerStatus(LVDataCaptureClientGuid);
                                        
                    var _oLVDcTimeComponent = new LVDcTimeComponent();
                    var DcTimeAndLogsResponse = _oLVDcTimeComponent.GetDcTimeAndLogs(LVDcReStartDate, LVDcStopDate);

                    var GeoLocationResponse = MyInstance.GetLatitudeAndLongitude();
                    
                    var DataCaptureUpdateQuery = "UPDATE DataCaptureEntity SET Score=" + DCSummary.Score + ",MaxScore=" + DCSummary.MaxScore + ",Percentage=" + DCSummary.Percentage + ",CompletedChildCount=" + DCSummary.CompletedCount +
                        ",TotalChildCount=" + DCSummary.TotalCount + ",CompletedAttributeCount=" + DCSummary.CompletedAttributeCount + ",TotalAttributeCount=" + DCSummary.TotalAttributeCount + ",IsCompleted='" + IsCompleted +
                        "',ESTTime = " + DCSummary.ESTTime + ",ActualTime = " + DCSummary.ActualTime + ",IsSynchronized='false',TimeStamp = '" + CurrenntDateAndTime + "',IsAnyDCBlocker = '" + IsAnyDCBlocker +
                        "',Latitude = '" + GeoLocationResponse.Latitude + "',Longitude = '" + GeoLocationResponse.Longitude + "',DcTime = '" + DcTimeAndLogsResponse.Dc_DcTime + "',DcTimeLogs = '" + DcTimeAndLogsResponse.DcTimeLogs + "' WHERE Id=" + LVDataCaptureId;

                    _oOneViewSqlitePlugin.ExcecuteSql(DataCaptureUpdateQuery);

                    var DCResultsUpdateQuery = "UPDATE DcResultsEntity SET Score=" + DCSummary.Score + ",MaxScore=" + DCSummary.MaxScore + ",Percentage=" + DCSummary.Percentage + ",CompletedChildCount=" + DCSummary.CompletedCount +
                        ",TotalChildCount=" + DCSummary.TotalCount + ",CompletedAttributeCount=" + DCSummary.CompletedAttributeCount + ",TotalAttributeCount=" + DCSummary.TotalAttributeCount + ",IsSynchronized='false',TimeStamp = '" + CurrenntDateAndTime +
                        "',ActualTime = " + DCSummary.ActualTime + ",LastUpdatedDate = '" + CurrenntDateAndTime + "',Latitude = '" + GeoLocationResponse.Latitude + "',Longitude = '" + GeoLocationResponse.Longitude + "',DcTime = '" + DcTimeAndLogsResponse.DcR_DcTime + "' WHERE Id=" + LVDcResultsId;

                    _oOneViewSqlitePlugin.ExcecuteSql(DCResultsUpdateQuery);

                    var _oDcPendingTaskBO = new DcPendingTaskBO();
                    _oDcPendingTaskBO.UpdateStatus(IsSave, IsCompleted);

                    OneViewSessionStorage.Save("IsDcCompletedBeforeEdit", IsCompleted);
                    OneViewSessionStorage.Save("IsDcSynchronizedBeforeEdit", 'false');

                    OneViewConsole.Debug("UpdateScore End", "LVDataCaptureBO.UpdateScore");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.UpdateScore", Excep);
                }
                finally {

                }
            }

            var SaveDCBlockers = function (LVDcStartDate) {

                try {
                    OneViewConsole.Debug("SaveDCBlockers Start", "LVDataCaptureBO.SaveDCBlockers");

                    var _oDcDAO = new DcDAO();
                    var DataCaptureRequest = MakeGetCompleteDataCaptureRequest(LVDcStartDate);

                    var _DateTime = new DateTime();
                    var CurrenntDateAndTime = _DateTime.GetDateAndTime();

                    var _oOneViewGeolocationPlugin = new OneViewGeolocationPlugin();
                    var IsGeolocationSuccess = _oOneViewGeolocationPlugin.CheckGeolocation();
                    var Latitude = "";
                    var Longitude = "";

                    if (IsGeolocationSuccess == true) {
                        var GeolocationInfo = _oOneViewGeolocationPlugin.GetLatitudeAndLongitude();
                        if (GeolocationInfo.IsAnyException == false) {
                            Latitude = GeolocationInfo.Latitude;
                            Longitude = GeolocationInfo.Longitude;
                        }
                    }

                    var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();

                    var oDefaultMasterDAO = new DefaultMasterDAO("DcResultDetailsEntity");
                    var DcResultDetailsEntityCount = oDefaultMasterDAO.Count();

                    for (var itrDCBlockerTemplateResult in LVDCBlockerTemplateResult) {                       
                        //alert(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].IsDisable);
                        //alert(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerInfoServerId);
                        if (LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].IsDisable == true) {                           
                            if (LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerInfoServerId == 0) {
                                _oDCBlockerInfoDAO.DeleteDCBlocker(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerInfoClientId, LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DataCaptureClientId);
                            }
                            else {                               
                                _oDCBlockerInfoDAO.DisableDCBlocker(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerInfoClientId, LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DataCaptureClientId);
                            }                            
                        }
                        if (LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DataCaptureClientId == "" && LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].IsDisable == false) {

                            DataCaptureRequest.TemplateNodeId = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerTemplateId;
                            DataCaptureRequest.TemplateNodeName = "Cleaning NP Template"; // Need to change

                            var oDataCaptureEntity = GetCompleteDataCaptureEntity(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult, LVDcStartDate, DataCaptureRequest);
                            oDataCaptureEntity.IsForDCBlocker = true;
                            oDataCaptureEntity.IsAnyDCBlocker = false;
                           
                            var DcInfo = _oDcDAO.CreateAndReturn(oDataCaptureEntity, false);
                            //alert(JSON.stringify(DcInfo));
                            //alert(JSON.stringify(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult]));
                            var Query = "SELECT ClientGuid FROM DcResultDetailsEntity WHERE AttributeNodeId = '" + itrDCBlockerTemplateResult + "' AND DataResultsId = " + LVDcResultsId;                          
                            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
                            Result = JSON.parse(Result);
                            var ClientGuid = "";
                            if (Result.length > 0) {
                                ClientGuid = Result[0].ClientGuid;
                            }
                           
                            var oDCBlockerInfoEntity = GetDCBlockerInfoEntity(DataCaptureRequest, LVDataCaptureClientGuid, LVDcResultsClientGuid, ClientGuid, DcInfo.ClientGuid);
                            //alert(JSON.stringify(oDCBlockerInfoEntity));

                            var _oDCBlockerInfoDAO = new DefaultMasterDAO("DCBlockerInfoEntity");
                            _oDCBlockerInfoEntity = _oDCBlockerInfoDAO.CreateMaster(oDCBlockerInfoEntity);

                            //alert(JSON.stringify(_oDCBlockerInfoEntity));

                            LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DataCaptureClientId = DcInfo.DcId;
                            LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DataCaptureClientGuid = DcInfo.ClientGuid;
                            LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerInfoClientId = _oDCBlockerInfoEntity.Id;
                          
                            for (var itrAttributes in LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult) {
                                //alert(JSON.stringify(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes]));
                                var oAnswers = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].Answers;
                                for (var i = 0; i < oAnswers.length; i++) {
                                    oAnswers[i].ClientId = DcInfo.DcResultDetails[oAnswers[i].ControlId].ClientId;
                                    oAnswers[i].ClientGuid = DcInfo.DcResultDetails[oAnswers[i].ControlId].ClientGuid;
                                    oAnswers[i].IsModified = false;
                                }
                            }
                            //alert(JSON.stringify(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult]));
                        }
                        else {
                            for (var itrAttributes in LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult) {

                                var DataCaptureRequest = MakeGetCompleteDataCaptureRequest(LVDcStartDate);
                                var AttributeNodeId = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].Id;
                                var AttributeNodeName = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].Name;
                                var Comments = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].Comments;
                                var IsNA = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].NA;
                                var IsBlocker = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].IsBlocker;
                                var ESTTime = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].ESTTime;
                                ESTTime = (ESTTime != undefined) ? ESTTime : 0;
                                var ActualTime = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].ActualTime;
                                var IsManualESTEnabled = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].IsManualESTEnabled;

                                var oAnswers = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].Answers;

                                //alert(JSON.stringify(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes]));

                                for (var i = 0; i < oAnswers.length; i++) {

                                    //alert(JSON.stringify(oAnswers[i]));

                                    if (oAnswers[i].ClientId != "" && oAnswers[i].IsModified == true) {

                                        var Query = "UPDATE DcResultDetailsEntity SET Answer='" + oAnswers[i].Answer + "',AnswerValue='" + oAnswers[i].AnswerValue + "' ,IsSynchronized='false',LastUpdatedDate ='" + CurrenntDateAndTime +
                                            "',Comments = '" + Comments + "',IsNA = '" + IsNA + "',IsBlocker = '" + IsBlocker + "',Score = " + oAnswers[i].Score + ",MaxScore=" + oAnswers[i].MaxScore + ",Percentage=" + oAnswers[i].Percentage + ",CompletedChildCount=" + oAnswers[i].CompletedChildCount +
                                            ",TotalChildCount=" + oAnswers[i].TotalChildCount + ",CompletedAttributeCount=" + oAnswers[i].CompletedAttributeCount + ",TotalAttributeCount=" + oAnswers[i].TotalAttributeCount + ",TimeStamp = '" + CurrenntDateAndTime +
                                            "',ESTTime=" + ESTTime + ",ActualTime=" + ActualTime + ",IsManualESTEnabled='" + IsManualESTEnabled +
                                            "',Latitude = '" + Latitude + "',Longitude = '" + Longitude + "' WHERE Id=" + oAnswers[i].ClientId;
                                        //alert(Query);
                                        window.OneViewSqlite.excecuteSql(Query);
                                        oAnswers[i].IsModified = false;
                                    }
                                    else if (oAnswers[i].ClientId == "" && oAnswers[i].IsModified == true) {

                                        var oAnswerMode = oAnswers[i];
                                        var DcResultDetailsEntity = GetDcResultDetailsEntity(DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, oAnswerMode, Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled);

                                        DcResultDetailsEntity.DataCaptureId = LVDataCaptureId;
                                        DcResultDetailsEntity.DataResultsId = LVDcResultsId;

                                        var oDcResultDetails = oDefaultMasterDAO.Create(DcResultDetailsEntity, DcResultDetailsEntityCount);
                                        
                                        DcResultDetailsEntityCount += 1;

                                        //alert(JSON.stringify(DcResultDetailsEntity));
                                    }
                                }
                            }
                        }
                    }

                    OneViewConsole.Debug("SaveDCBlockers End", "LVDataCaptureBO.SaveDCBlockers");
                }
                catch (Excep) {                   
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.SaveDCBlockers", Excep);
                }
                finally {                
                }
            }

            var GetDcBlockerStatus = function (DataCaptureClientGuid) {

                try{
                    OneViewConsole.Debug("GetDcBlockerStatus Start", "LVDataCaptureBO.GetDcBlockerStatus");

                    var DcBlockerStatus = false;

                    if (DataCaptureClientGuid != "" && DataCaptureClientGuid != null && DataCaptureClientGuid != undefined) {

                        var DCBlockerQuery = "SELECT IsDisable FROM DCBlockerInfoEntity WHERE DataCaptureClientGuid = '" + DataCaptureClientGuid + "'";
                        var DCBlockerResult = window.OneViewSqlite.excecuteSqlReader(DCBlockerQuery);
                        DCBlockerResult = JSON.parse(DCBlockerResult);

                        for (i = 0; i < DCBlockerResult.length; i++) {
                            if (DCBlockerResult[i].IsDisable == 'false') {
                                DcBlockerStatus = true;
                                break;
                            }
                        }
                    }
                  
                    return DcBlockerStatus;

                    OneViewConsole.Debug("GetDcBlockerStatus Start", "LVDataCaptureBO.GetDcBlockerStatus");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDcBlockerStatus", Excep);
                }
                finally {
                    DcBlockerStatus = null;
                    DCBlockerQuery = null;
                    DCBlockerResult = null;
                }
            }

            var GetCompleteDataCaptureEntity = function (LVTemplateResult, LVDcStartDate, DataCaptureRequest) {

                try {
                    OneViewConsole.Debug("GetCompleteDataCaptureEntity Start", "LVDataCaptureBO.GetCompleteDataCaptureEntity");

                    var oDataCaptureEntity = new DataCaptureEntity(DataCaptureRequest);

                    oDataCaptureEntity = GetDataCaptureEntity(DataCaptureRequest);
                    oDataCaptureEntity.DcResultsEntitylist[0] = GetDcResultsEntity(DataCaptureRequest);

                    var _oOneViewGeolocationPlugin = new OneViewGeolocationPlugin();
                    var IsGeolocationSuccess = _oOneViewGeolocationPlugin.CheckGeolocation();

                    var Latitude = "";
                    var Longitude = "";

                    if (IsGeolocationSuccess == true) {
                        var GeolocationInfo = _oOneViewGeolocationPlugin.GetLatitudeAndLongitude();
                        if (GeolocationInfo.IsAnyException == false) {
                            Latitude = GeolocationInfo.Latitude;
                            Longitude = GeolocationInfo.Longitude;
                        }
                    }

                    var Count = 0;

                    for (var itrAttributes in LVTemplateResult) {

                        var TemplateNode = LVTemplateResult[itrAttributes];

                        var AttributeNodeId = TemplateNode.Id;
                        var AttributeNodeName = TemplateNode.Name;
                        var Comments = TemplateNode.Comments;
                        var IsNA = TemplateNode.NA;
                        var IsBlocker = TemplateNode.IsBlocker;
                        var ESTTime = TemplateNode.ESTTime;
                        var ActualTime = TemplateNode.ActualTime;
                        var IsManualESTEnabled = TemplateNode.IsManualESTEnabled;

                        for (var i = 0; i < TemplateNode.Answers.length; i++) {
                            oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList[Count] = GetDcResultDetailsEntity(DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, TemplateNode.Answers[i], Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled);
                            Count += 1;
                        }
                    }

                    //oDataCaptureEntity.IsForDCBlocker = true;

                    OneViewConsole.Debug("GetCompleteDataCaptureEntity End", "LVDataCaptureBO.GetCompleteDataCaptureEntity");

                    return oDataCaptureEntity;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetCompleteDataCaptureEntity", Excep);
                }
                finally {
                    oDataCaptureEntity = null;
                }
            }

            var GetCompleteDataCaptureAndActionEntity = function (LVTemplateResult, LVDcStartDate, LVDCSummary) {

                try {
                    OneViewConsole.Debug("GetCompleteDataCaptureAndActionEntity Start", "LVDataCaptureBO.GetCompleteDataCaptureAndActionEntity");

                    var DataCaptureRequest = MakeGetCompleteDataCaptureRequest(LVDcStartDate);

                    var oDataCaptureEntity = new DataCaptureEntity(DataCaptureRequest);

                    oDataCaptureEntity = GetDataCaptureEntity(DataCaptureRequest);
                    oDataCaptureEntity.DcResultsEntitylist[0] = GetDcResultsEntity(DataCaptureRequest, LVDCSummary);

                    var _oOneViewGeolocationPlugin = new OneViewGeolocationPlugin();
                    var IsGeolocationSuccess = _oOneViewGeolocationPlugin.CheckGeolocation();

                    var Latitude = "";
                    var Longitude = "";

                    if (IsGeolocationSuccess == true) {
                        var GeolocationInfo = _oOneViewGeolocationPlugin.GetLatitudeAndLongitude();
                        if (GeolocationInfo.IsAnyException == false) {
                            Latitude = GeolocationInfo.Latitude;
                            Longitude = GeolocationInfo.Longitude;
                        }
                    }

                    var Count = 0;
                   
                    var Actions = {};
                  
                    for (var itrAttributes in LVTemplateResult) {

                        var TemplateNode = LVTemplateResult[itrAttributes];

                        var AttributeNodeId = TemplateNode.Id;
                        var AttributeNodeName = TemplateNode.Name;
                        var Comments = TemplateNode.Comments;
                        var IsNA = TemplateNode.NA;
                        var IsBlocker = TemplateNode.IsBlocker;
                        var ESTTime = TemplateNode.ESTTime;
                        var ActualTime = TemplateNode.ActualTime;
                        var IsManualESTEnabled = TemplateNode.IsManualESTEnabled;

                        for (var i = 0; i<TemplateNode.Answers.length; i++) {                            
                            oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList[Count] = GetDcResultDetailsEntity(DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, TemplateNode.Answers[i], Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled);
                            Count += 1;
                        }                  
                    }

                    var IsNC = false;
                    
                    for (var itrLVActionResult in LVActionResult) {                       
                        var oAction = GetAction(DataCaptureRequest, oDataCaptureEntity.ClientGuid, oDataCaptureEntity.DcResultsEntitylist[0].ClientGuid, itrLVActionResult, "", LVActionResult[itrLVActionResult]);
                        Actions[itrLVActionResult] = oAction;
                        //alert(JSON.stringify(oAction));
                        if (LVActionResult[itrLVActionResult].IsNC == true) {
                            IsNC = true;
                        }
                    }

                    oDataCaptureEntity.IsAnyNC = IsNC;

                    LVDataCaptureClientGuid = oDataCaptureEntity.ClientGuid;
                    LVDcResultsClientGuid = oDataCaptureEntity.DcResultsEntitylist[0].ClientGuid;

                    OneViewConsole.Debug("GetCompleteDataCaptureAndActionEntity End", "LVDataCaptureBO.GetCompleteDataCaptureAndActionEntity");
                  
                    return { "oDataCaptureEntity": oDataCaptureEntity, "Actions": Actions };
                }
                catch (Excep) {                   
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetCompleteDataCaptureEntity", Excep);
                }
                finally {
                    oDataCaptureEntity = null;
                }
            }

            var GetAction = function (DataCaptureRequest, DataCaptureClientGuid, DcResultsClientGuid, NCRuleId, DcResultDetailsClientGuid, ActionResultItem) {

                try {
                    OneViewConsole.Debug("GetAction Start", "LVDataCaptureBO.GetAction");

                    var _oActionEntity = new ActionEntity();
                    _oActionEntity = GetActionEntity(DataCaptureRequest);

                    var ActionDetailsCount = 0;
                   
                    for (var i = 0; i < ActionResultItem.Actions.length; i++) {          
                        _oActionEntity.ActionDetailsEntityList[ActionDetailsCount] = GetActionDetailsEntity(DataCaptureRequest, _oActionEntity.ClientGuid, "", ActionResultItem.Actions[i]);
                        ActionDetailsCount += 1;
                    }

                    var _oDCNCMapping = GetDCNCMapping(DataCaptureRequest, DataCaptureClientGuid, DcResultsClientGuid, NCRuleId, DcResultDetailsClientGuid, _oActionEntity.ClientGuid, ActionResultItem);

                    var MultiMediaSubElements = new Array();
                    for (var i = 0; i < ActionResultItem.MultimediaSubElements.length; i++) {
                        ActionResultItem.MultimediaSubElements[i].MappedEntityClientGuid = _oActionEntity.ClientGuid;
                        MultiMediaSubElements[i] = GetMultiMediaSubElement(DataCaptureRequest, ActionResultItem.MultimediaSubElements[i]);
                    }
                   
                    OneViewConsole.Debug("GetAction End", "LVDataCaptureBO.GetAction");

                    return { "ActionEntity": _oActionEntity, "DCNCMapping": _oDCNCMapping, "MultiMediaSubElements": MultiMediaSubElements }
                }
                catch (Excep) {              
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetAction", Excep);
                }
                finally {
                   
                }
            }

            var GetActionEntity = function (DataCaptureRequest) {

                try {
                    OneViewConsole.Debug("GetActionEntity Start", "LVDataCaptureBO.GetActionEntity");

                    var _oActionEntity = new ActionEntity();

                    _oActionEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                    _oActionEntity.MobileVersionId = 1;
                   
                    _oActionEntity.ServiceId = DataCaptureRequest.ServiceId;

                    _oActionEntity.ActionRaisedBySystemUserId = DataCaptureRequest.SystemUserId;
                    _oActionEntity.ActionRaisedByUserName = DataCaptureRequest.UserName;
                                   
                    _oActionEntity.IsApproved = "false";
                    _oActionEntity.ActionContext = DATActionContext.DataCapture;
                   
                    _oActionEntity.IsSubmited = "true";
                    _oActionEntity.SubmitedDate = DataCaptureRequest.CurrenntDateAndTime;

                    _oActionEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
                    _oActionEntity.IsSynchronized = "false";
                    _oActionEntity.IsDisable = "false";

                    OneViewConsole.Debug("GetActionEntity End", "LVDataCaptureBO.GetActionEntity");

                    return _oActionEntity;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetActionEntity", Excep);
                }
                finally {

                }              
            }

            var GetActionDetailsEntity = function (DataCaptureRequest, ActionClientGuid, DataCaptureClientGuid, Action) {

                try {
                    OneViewConsole.Debug("GetActionDetailsEntity Start", "LVDataCaptureBO.GetActionDetailsEntity");
                  
                    var _oActionDetailsEntity = new ActionDetailsEntity();

                    _oActionDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                    _oActionDetailsEntity.MobileVersionId = 1;
                  
                    _oActionDetailsEntity.ServiceId = DataCaptureRequest.ServiceId;

                    _oActionDetailsEntity.ActionClientGuid = ActionClientGuid;

                    if (Action.ActionType == LVActionType.PredefinedAction) {                      
                        _oActionDetailsEntity.PreDefinedActionId = Action.PreDefinedActionId;
                        _oActionDetailsEntity.CustomAction = "";
                    }
                    else if (Action.ActionType == LVActionType.CustomAction) {
                        _oActionDetailsEntity.CustomAction = Action.Name;
                        _oActionDetailsEntity.PreDefinedActionId = 0;
                    }

                    _oActionDetailsEntity.DataCaptureClientGuid = DataCaptureClientGuid;

                    _oActionDetailsEntity.IsPersonalObservation = "true";

                    _oActionDetailsEntity.ActionRaisedBySystemUserId = DataCaptureRequest.SystemUserId;
                    _oActionDetailsEntity.ActionRaisedByUserName = DataCaptureRequest.UserName;

                    _oActionDetailsEntity.Latitude = Action.Latitude;
                    _oActionDetailsEntity.Longitude = Action.Longitude;
                   
                    _oActionDetailsEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
                    _oActionDetailsEntity.IsSynchronized = "false";
                    _oActionDetailsEntity.IsDisable = "false";

                    OneViewConsole.Debug("GetActionDetailsEntity End", "LVDataCaptureBO.GetActionDetailsEntity");
                  
                    return _oActionDetailsEntity;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetActionDetailsEntity", Excep);
                }
                finally {

                }
            }

            var GetDCNCMapping = function (DataCaptureRequest, DataCaptureClientGuid, DcResultsClientGuid, NCRuleId, DcResultDetailsClientGuid, ActionClientGuid, ActionResultItem) {

                try {
                    OneViewConsole.Debug("GetDCNCMapping Start", "LVDataCaptureBO.GetDCNCMapping");

                    var _oDCNCMapping = new DCNCMapping();

                    _oDCNCMapping.ClientGuid = OneViewUniqueGenerator.GetGuid();
                    _oDCNCMapping.MobileVersionId = 1;
                 
                    _oDCNCMapping.ServiceId = DataCaptureRequest.ServiceId;
                    _oDCNCMapping.RaisedBySystemUserId = DataCaptureRequest.SystemUserId;

                    _oDCNCMapping.NCRuleId = NCRuleId;
                    _oDCNCMapping.IsNC = ActionResultItem.IsNC;
                    _oDCNCMapping.IsObservation = ActionResultItem.IsObservation;
                    _oDCNCMapping.IsManualRule = ActionResultItem.IsManualRule;
                    _oDCNCMapping.TemplateNodeIds = ActionResultItem.TemplateNodeIds;

                    _oDCNCMapping.DataCaptureClientGuid = DataCaptureClientGuid;
                    _oDCNCMapping.DcResultsClientGuid = DcResultsClientGuid;
                    _oDCNCMapping.DcResultDetailsClientGuid = DcResultDetailsClientGuid;
                    _oDCNCMapping.ActionClientGuid = ActionClientGuid;

                    _oDCNCMapping.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
                    _oDCNCMapping.IsSynchronized = "false";
                    _oDCNCMapping.IsDisable = "false";

                    OneViewConsole.Debug("GetDCNCMapping End", "LVDataCaptureBO.GetDCNCMapping");

                    return _oDCNCMapping;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDCNCMapping", Excep);
                }                
            }

            var GetMultiMediaSubElement = function (DataCaptureRequest, _oMultiMediaSubElement) {

                try {

                    OneViewConsole.Debug("GetMultiMediaSubElement Start", "LVDataCaptureBO.MakeGetCompleteDataCaptureRequest");
                    
                    var _oMultiMediaSubElements = new MultiMediaSubElements();

                    _oMultiMediaSubElements.ClientGuid = OneViewUniqueGenerator.GetGuid();
                    _oMultiMediaSubElements.MobileVersionId = 1;
                    _oMultiMediaSubElements.ServiceId = DataCaptureRequest.ServiceId;

                    _oMultiMediaSubElements.MappedEntityClientGuid = _oMultiMediaSubElement.MappedEntityClientGuid;
                    _oMultiMediaSubElements.Dimension = _oMultiMediaSubElement.Dimension;
                    _oMultiMediaSubElements.MultiMediaType = _oMultiMediaSubElement.MultiMediaType;
                    _oMultiMediaSubElements.LocalURL = _oMultiMediaSubElement.LocalURL;

                    _oMultiMediaSubElements.Comments = _oMultiMediaSubElement.Comments;
                    _oMultiMediaSubElements.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
                    _oMultiMediaSubElements.TimeStamp = DataCaptureRequest.CurrenntDateAndTime;
                    _oMultiMediaSubElements.IsSynchronized = false;
                    _oMultiMediaSubElements.IsMultiMediaSynchronized = false;
                    _oMultiMediaSubElements.IsDisabled = _oMultiMediaSubElement.IsDisabled;

                    _oMultiMediaSubElements.Latitude = _oMultiMediaSubElement.Latitude;
                    _oMultiMediaSubElements.Longitude = _oMultiMediaSubElement.Longitude;
                 
                    OneViewConsole.Debug("GetMultiMediaSubElement End", "LVDataCaptureBO.MakeGetCompleteDataCaptureRequest");

                    return _oMultiMediaSubElements;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetMultiMediaSubElement", Excep);
                }
            }

            var MakeGetCompleteDataCaptureRequest = function (LVDcStartDate) {

                try {
                    OneViewConsole.Debug("MakeGetCompleteDataCaptureRequest Start", "LVDataCaptureBO.MakeGetCompleteDataCaptureRequest");

                    var _oLVDataCaptureBO = new LVDataCaptureBO();
                    var GeoLocationResponse = _oLVDataCaptureBO.GetLatitudeAndLongitude();

                    var DataCaptureRequest = {

                        CurrenntDateAndTime: new DateTime().GetDateAndTime(),

                        ServiceId: OneViewSessionStorage.Get("ServiceId"),
                        ServiceName: OneViewSessionStorage.Get("ServiceName"),

                        TemplateNodeId: OneViewSessionStorage.Get("TemplateId"),
                        TemplateNodeName: OneViewSessionStorage.Get("TemplateName"),
                       
                        DcPlaceId: OneViewSessionStorage.Get("DcPlaceId"),
                        DcPlaceName: OneViewSessionStorage.Get("DcPlaceName"),

                        ShiftId: OneViewSessionStorage.Get("CurrentShiftId"),
                        ShiftName: OneViewSessionStorage.Get("CurrentShiftName"),

                        SystemUserId: OneViewSessionStorage.Get("LoginUserId"),
                        UserName: OneViewSessionStorage.Get("LoginUserName"),

                        DcProfileId: OneViewSessionStorage.Get("DcProfileId"),

                        DcPlaceDimension: (OneViewSessionStorage.Get("DcPlaceId") > 0) ? DATEntityType.OrganizationAssestsNode : 0, // Need to access from session

                        DcStartDate: LVDcStartDate,

                        Latitude: GeoLocationResponse.Latitude,
                        Longitude: GeoLocationResponse.Longitude
                    }

                    OneViewConsole.Debug("MakeGetCompleteDataCaptureRequest End", "LVDataCaptureBO.MakeGetCompleteDataCaptureRequest");

                    return DataCaptureRequest;
                }
                catch(Excep){
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.MakeGetCompleteDataCaptureRequest", Excep);
                }
            }

            var GetDataCaptureEntity = function (DataCaptureRequest) {

                try {
                    OneViewConsole.Debug("GetDataCaptureEntity Start", "LVDataCaptureBO.GetDataCaptureEntity");

                    var _oDataCaptureEntity = new DataCaptureEntity();

                    _oDataCaptureEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                    _oDataCaptureEntity.MobileVersionId = 1;

                    _oDataCaptureEntity.ServiceId = DataCaptureRequest.ServiceId;
                    _oDataCaptureEntity.ServiceName = DataCaptureRequest.ServiceName;

                    _oDataCaptureEntity.TemplateNodeId = DataCaptureRequest.TemplateNodeId;
                    _oDataCaptureEntity.TemplateNodeName = DataCaptureRequest.TemplateNodeName;

                    _oDataCaptureEntity.DcPlaceDimension = DataCaptureRequest.DcPlaceDimension;
                    _oDataCaptureEntity.DcPlaceId = DataCaptureRequest.DcPlaceId;
                    _oDataCaptureEntity.DcPlaceName = DataCaptureRequest.DcPlaceName;

                    _oDataCaptureEntity.DcProfileId = DataCaptureRequest.DcProfileId;

                    _oDataCaptureEntity.IsCompleted = "false";
                    _oDataCaptureEntity.IsSynchronized = "false";

                    _oDataCaptureEntity.IsSubmit = "false";                   
                    _oDataCaptureEntity.ApprovalStatus = oDCApprovalStatusEnum.NONE;

                    _oDataCaptureEntity.IsDynamicDCPlace = "false";
                    _oDataCaptureEntity.IsDynamicAttribute = "false";
                    _oDataCaptureEntity.IsDynamicAnswer = "false";

                    _oDataCaptureEntity.IsAnyNC = "false";
                    _oDataCaptureEntity.IsAnyObservation = "false";
                    _oDataCaptureEntity.IsAnyAction = "false";
                    _oDataCaptureEntity.IsForAction = "false";
                    _oDataCaptureEntity.IsForHistory = 'false';
                    _oDataCaptureEntity.IsForDCBlocker = 'false';
                    _oDataCaptureEntity.IsMultiMediaAttached = 'false';

                    _oDataCaptureEntity.DcStartDate = DataCaptureRequest.DcStartDate;
                    _oDataCaptureEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;

                    _oDataCaptureEntity.Latitude = DataCaptureRequest.Latitude;
                    _oDataCaptureEntity.Longitude = DataCaptureRequest.Longitude;

                    OneViewConsole.Debug("GetDataCaptureEntity End", "LVDataCaptureBO.GetDataCaptureEntity");

                    return _oDataCaptureEntity;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDataCaptureEntity", Excep);
                }
                finally {
                    _oDataCaptureEntity = null;
                    CurrenntDateAndTime = null
                }
            }

            var GetDcResultsEntity = function (DataCaptureRequest, LVDCSummary) {

                try {
                    OneViewConsole.Debug("GetDcResultsEntity Start", "LVDataCaptureBO.GetDcResultsEntity");

                    var _oDcResultsEntity = new DcResultsEntity();

                    _oDcResultsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                    _oDcResultsEntity.MobileVersionId = 1;

                    _oDcResultsEntity.ServiceId = DataCaptureRequest.ServiceId;

                    _oDcResultsEntity.SystemUserId = DataCaptureRequest.SystemUserId;
                    _oDcResultsEntity.UserName = DataCaptureRequest.UserName;

                    _oDcResultsEntity.ShiftId = DataCaptureRequest.ShiftId;
                    _oDcResultsEntity.ShiftName = DataCaptureRequest.ShiftName;

                    _oDcResultsEntity.IsSynchronized = "false";

                    _oDcResultsEntity.StartDate = DataCaptureRequest.DcStartDate;

                    _oDcResultsEntity.IsSubmit = "false";
                    _oDcResultsEntity.SubmitDate = "";
                    _oDcResultsEntity.SubmitedUserId = DataCaptureRequest.SystemUserId;
                    _oDcResultsEntity.AnonymousUserId = 0;

                    _oDcResultsEntity.ApprovalStatus = oDCApprovalStatusEnum.NONE;

                    _oDcResultsEntity.IsDynamicAttribute = "false";
                    _oDcResultsEntity.IsDynamicAnswer = "false";
                    _oDcResultsEntity.IsMultiMediaAttached = 'false';

                    _oDcResultsEntity.Comments = (LVDCSummary != undefined) ? ((LVDCSummary.CommentsInfo.IsModified == true) ? LVDCSummary.CommentsInfo.Comments : "") : "";

                    _oDcResultsEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
                    _oDcResultsEntity.LastUpdatedDate = DataCaptureRequest.CurrenntDateAndTime;

                    _oDcResultsEntity.Latitude = DataCaptureRequest.Latitude;
                    _oDcResultsEntity.Longitude = DataCaptureRequest.Longitude;

                    OneViewConsole.Debug("GetDcResultsEntity End", "LVDataCaptureBO.GetDcResultsEntity");

                    return _oDcResultsEntity;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDcResultsEntity", Excep);
                }
                finally {
                    _oDcResultsEntity = null;
                    CurrenntDateAndTime = null
                }
            }

            var GetDcResultDetailsEntity = function (DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, oAnswerMode, Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled) {

                try {
                    OneViewConsole.Debug("GetDcResultDetailsEntity Start", "LVDataCaptureBO.GetDcResultDetailsEntity");

                    var _oDcResultDetailsEntity = new DcResultDetailsEntity();

                    _oDcResultDetailsEntity.ServiceId = DataCaptureRequest.ServiceId;
                    _oDcResultDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();

                    _oDcResultDetailsEntity.MobileVersionId = 1;

                    _oDcResultDetailsEntity.StartDate = DataCaptureRequest.CurrenntDateAndTime;

                    _oDcResultDetailsEntity.IsManual = oAnswerMode.IsManual;
                    _oDcResultDetailsEntity.IsSynchronized = "false";

                    _oDcResultDetailsEntity.AttributeNodeId = AttributeNodeId;
                    _oDcResultDetailsEntity.ControlId = oAnswerMode.ControlId;
                    _oDcResultDetailsEntity.AttributeNodeName = AttributeNodeName;

                    _oDcResultDetailsEntity.Answer = oAnswerMode.Answer;
                    _oDcResultDetailsEntity.AnswerValue = oAnswerMode.AnswerValue;
                    _oDcResultDetailsEntity.AnswerFKType = (oAnswerMode.AnswerFKType != undefined) ? oAnswerMode.AnswerFKType : "";
                    _oDcResultDetailsEntity.AnswerDataType = oAnswerMode.AnswerDataType;
                    _oDcResultDetailsEntity.AnswerMode = oAnswerMode.AnswerMode;

                    _oDcResultDetailsEntity.IsDynamicAttribute = oAnswerMode.IsDynamicAttribute;
                    _oDcResultDetailsEntity.IsDynamicAnswer = oAnswerMode.IsDynamicAnswer;

                    _oDcResultDetailsEntity.IndexId = oAnswerMode.IndexId;
                    _oDcResultDetailsEntity.IsMulti = oAnswerMode.IsMulti;

                    _oDcResultDetailsEntity.Latitude = oAnswerMode.Latitude;
                    _oDcResultDetailsEntity.Longitude = oAnswerMode.Longitude;

                    _oDcResultDetailsEntity.Comments = Comments;

                    _oDcResultDetailsEntity.Score = oAnswerMode.Score;
                    _oDcResultDetailsEntity.MaxScore = oAnswerMode.MaxScore;
                    _oDcResultDetailsEntity.Percentage = oAnswerMode.Percentage;
                    _oDcResultDetailsEntity.CompletedChildCount = oAnswerMode.CompletedChildCount;
                    _oDcResultDetailsEntity.TotalChildCount = oAnswerMode.TotalChildCount;
                    _oDcResultDetailsEntity.CompletedAttributeCount = oAnswerMode.CompletedAttributeCount;
                    _oDcResultDetailsEntity.TotalAttributeCount = oAnswerMode.TotalAttributeCount;

                    _oDcResultDetailsEntity.IsNA = IsNA;
                    _oDcResultDetailsEntity.IsBlocker = IsBlocker;

                    _oDcResultDetailsEntity.ESTTime = ESTTime;
                    _oDcResultDetailsEntity.ActualTime = ActualTime;
                    _oDcResultDetailsEntity.IsManualESTEnabled = IsManualESTEnabled;
                    _oDcResultDetailsEntity.IsMultiMediaAttached = 'false';

                    _oDcResultDetailsEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
                    _oDcResultDetailsEntity.LastUpdatedDate = DataCaptureRequest.CurrenntDateAndTime;

                    OneViewConsole.Debug("GetDcResultDetailsEntity End", "LVDataCaptureBO.GetDcResultDetailsEntity");

                    return _oDcResultDetailsEntity;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDcResultDetailsEntity", Excep);
                }
                finally {
                    _oDcResultDetailsEntity = null;
                    CurrenntDateAndTime = null
                }
            }

            var GetDCBlockerInfoEntity = function (DataCaptureRequest, DataCaptureClientGuid, DcResultsClientGuid, DcResultDetailsClientGuid, DCBlockerDataCaptureClientGuid) {

                try {
                    OneViewConsole.Debug("GetDCBlockerInfoEntity Start", "LVDataCaptureBO.GetDCBlockerInfoEntity");

                    var _oDCBlockerInfoEntity = new DCBlockerInfoEntity();

                    _oDCBlockerInfoEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                    _oDCBlockerInfoEntity.MobileVersionId = 1;

                    _oDCBlockerInfoEntity.ServiceId = DataCaptureRequest.ServiceId;

                    _oDCBlockerInfoEntity.DataCaptureClientGuid = DataCaptureClientGuid;
                    _oDCBlockerInfoEntity.DcResultsClientGuid = DcResultsClientGuid;
                    _oDCBlockerInfoEntity.DcResultDetailsClientGuid = DcResultDetailsClientGuid;
                    _oDCBlockerInfoEntity.DCBlockerDataCaptureClientGuid = DCBlockerDataCaptureClientGuid;

                    _oDCBlockerInfoEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
                    _oDCBlockerInfoEntity.IsSynchronized = "false";
                    _oDCBlockerInfoEntity.IsDisable = "false";

                    OneViewConsole.Debug("GetDCBlockerInfoEntity End", "LVDataCaptureBO.GetDCBlockerInfoEntity");

                    return _oDCBlockerInfoEntity;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDCBlockerInfoEntity", Excep);
                }
                finally {

                }
            }

            this.LoadTemplateResult = function (DcId, DcUserId, AnswerModeLoadType) {

                try {
                    OneViewConsole.Debug("LoadTemplateResult Start", "LVDataCaptureBO.LoadTemplateResult");

                    var IsSuccess = true;

                    var _oDcDAO = new DcDAO();
                    var Dc = _oDcDAO.GetDCById(DcId);

                    LVDataCaptureId = Dc.Id;
                    LVDcResultsId = 0;
                    LVDataCaptureClientGuid = Dc.ClientGuid;
                    LVDcResultsClientGuid = "";

                    var DcResultDetailsForDcUser = {};
                    for (var i = 0; i < Dc.DcResultsEntitylist.length; i++) {
                        
                        if (Dc.DcResultsEntitylist[i].SystemUserId == DcUserId) {

                            LVDcResultsId = Dc.DcResultsEntitylist[i].Id;
                            LVDcResultsClientGuid = Dc.DcResultsEntitylist[i].ClientGuid;

                            for (var j = 0; j < Dc.DcResultsEntitylist[i].DcResultDetailsEntityList.length; j++) {

                                var DcResultsDetails = Dc.DcResultsEntitylist[i].DcResultDetailsEntityList[j];
                                DcResultDetailsForDcUser[DcResultsDetails.ControlId] = { "ClientId": DcResultsDetails.Id, "ServerId": DcResultsDetails.ServerId };
                            }
                        }
                    }

                    SetDcComments(Dc.DcResultsEntitylist, AnswerModeLoadType, DcUserId);

                    var result = new DcDAO().GetDCResultDetailsByDCIdForLV(DcId);
                    var DcResultDetails = GetDCByDCId(result);
                    //alert(JSON.stringify(DcResultDetails));

                    for (var i = 0; i < DcResultDetails.length; i++) {

                        var oAttribute = DcResultDetails[i];

                        LVTemplateResult[oAttribute.AttributeNodeId] = {
                            IsAttributeGroup: false,
                            NA: false,
                            IsBlocker: false,
                            Comments: "",
                            Id: oAttribute.AttributeNodeId,
                            Name: oAttribute.AttributeNodeName,
                            Answers: [],
                            ESTTime: 0,
                            ActualTime: 0,
                            IsManualESTEnabled: true,
                            MultiMediaSubElements: [],
                            ActionInfo: { ActionClientId: "", DCNCMappingClientId: "", Actions: {} },
                            IsSubmitMandatoryExist: false,
                            IsSaveMandatoryExist: false,
                            SaveMandatoryInfo: {},
                            SubmitMandatoryInfo: {}
                        }

                        for (var j = 0; j < oAttribute.Controls.length; j++) {

                            var oControl = oAttribute.Controls[j];
                            var oFinalAnswer = GetFinalAnswerToShow(oControl.Answers, AnswerModeLoadType, DcUserId);

                            var ServerId = "";
                            var ClientId = "";

                            if (oFinalAnswer != null) {

                                if (oFinalAnswer.AnswerMode == "") {
                                    ServerId = oFinalAnswer.ServerId;
                                    ClientId = oFinalAnswer.ClientId;
                                }
                                else {
                                    var oCurrentUserAnswer = DcResultDetailsForDcUser[oFinalAnswer.ControlId];

                                    if (oCurrentUserAnswer != undefined) {
                                        ServerId = oCurrentUserAnswer.ServerId;
                                        ClientId = oCurrentUserAnswer.ClientId;
                                    }
                                }

                                //alert(JSON.stringify(oFinalAnswer));

                                var Answer = {
                                    "ServerId": ServerId,
                                    "ClientId": ClientId,
                                    "ClientGuid": oFinalAnswer.ClientGuid,
                                    "Comments": oFinalAnswer.Comments,
                                    "ControlId": oFinalAnswer.ControlId,
                                    "Answer": oFinalAnswer.Answer,
                                    "AnswerValue": oFinalAnswer.AnswerValue,
                                    "AnswerFKType": oFinalAnswer.AnswerFKType,
                                    "AnswerDataType": oFinalAnswer.AnswerDataType,
                                    "AnswerMode": oFinalAnswer.AnswerMode,
                                    "IsModified": false,
                                    "IsManual": (oFinalAnswer.IsManual == 'true') ? true : false,
                                    "IsDynamicAttribute": (oFinalAnswer.IsDynamicAttribute == 'true') ? true : false,
                                    "IsDynamicAnswer": (oFinalAnswer.IsDynamicAnswer == 'true') ? true : false,
                                    "IndexId": oFinalAnswer.IndexId,
                                    "IsMulti": (oFinalAnswer.IsMulti == 'true') ? true : false,
                                    "AutomaticDeviceId": oFinalAnswer.AutomaticDeviceId,
                                    "Score": oFinalAnswer.Score,
                                    "MaxScore": oFinalAnswer.MaxScore,
                                    "Percentage": oFinalAnswer.Percentage,
                                    "CompletedChildCount": oFinalAnswer.CompletedChildCount,
                                    "TotalChildCount": oFinalAnswer.TotalChildCount,
                                    "CompletedAttributeCount": oFinalAnswer.CompletedAttributeCount,
                                    "TotalAttributeCount": oFinalAnswer.TotalAttributeCount
                                }

                                LVTemplateResult[oAttribute.AttributeNodeId].Comments = oFinalAnswer.Comments;
                                LVTemplateResult[oAttribute.AttributeNodeId].NA = (oFinalAnswer.IsNA == 'true') ? true : false,
                                LVTemplateResult[oAttribute.AttributeNodeId].IsBlocker = (oFinalAnswer.IsBlocker == 'true') ? true : false,                                
                                LVTemplateResult[oAttribute.AttributeNodeId].IsAttributeGroup = (oFinalAnswer.IsAttributeGroup == 'true') ? true : false;
                                LVTemplateResult[oAttribute.AttributeNodeId].ESTTime = oFinalAnswer.ESTTime;
                                LVTemplateResult[oAttribute.AttributeNodeId].ActualTime = oFinalAnswer.ActualTime;
                                LVTemplateResult[oAttribute.AttributeNodeId].IsManualESTEnabled = (oFinalAnswer.IsManualESTEnabled == 'true') ? true : false;
                                LVTemplateResult[oAttribute.AttributeNodeId].Answers.push(Answer);

                                oAnswerModeComponent.RefreshMandatoryInfo(oAttribute.AttributeNodeId, oFinalAnswer.ControlId);
                                oAnswerModeComponent.UpdateMandatoryInfoCurrentStatus(oAttribute.AttributeNodeId, oFinalAnswer.ControlId);

                                //alert(JSON.stringify(LVTemplateResult[oAttribute.AttributeNodeId]));
                            }
                            else {
                                IsSuccess = false;

                                OneViewConsole.Debug("LoadTemplateResult End", "LVDataCaptureBO.LoadTemplateResult");

                                return IsSuccess;
                            }
                        }
                    }

                    //alert(JSON.stringify(LVTemplateResult));
                    //alert(LVDcResultsId); 

                    var _oActionDAO = new ActionDAO();
                    var ActionDCNCMappings = _oActionDAO.GetAllActions(LVDataCaptureClientGuid);

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
                                    "MultimediaSubElements":[]
                                };
                            }
                        }                      
                    }

                    //alert(JSON.stringify(LVActionResult));

                    OneViewConsole.Debug("LoadTemplateResult End", "LVDataCaptureBO.LoadTemplateResult");

                    return IsSuccess;
                }
                catch(Excep){
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.LoadTemplateResult", Excep);
                }
            }

            var GetDCByDCId = function (result) {

                try {
                    OneViewConsole.Debug("GetDCByDCId Start", "LVDataCaptureBO.GetDCByDCId");

                    if (result.length != 0) {
                        var DataCaptureId = result[0].DataCaptureId;                        
                        var i = 0;
                        var totalLength = result.length;
                        var AttributeNodeId = result[i].AttributeNodeId;
                        var AttributeNodeName = result[i].AttributeNodeName;
                        var FormatedAttributeAnswerDetails = [];
                        var DcResultDetails = [];                        

                        //Iterate the wrt Node
                        while (true) {
                            if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId) {
                                
                                var FormatedControlAnswerDetails = [];
                                //{2(ControlId): [ { 'SystemUserId': 1, 'Answer': '1', 'AnswerValue': 'Chicken', 'LastUpdatedDate': '10/5/2012' },{ 'SystemUserId': 2, 'Answer': '2', 'AnswerValue': 'Chicken65', 'LastUpdatedDate': '11/5/2012' } ] }
                                var ControlId = result[i].ControlId;
                                while (true) {
                                   
                                    if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId && ControlId == result[i].ControlId) {
                                        
                                        var anwerArray = result[i];
                                        
                                        var AnwerDetails = {
                                            "SystemUserId": anwerArray.SystemUserId,
                                            "ServerId": anwerArray.ServerId,
                                            "ClientId": anwerArray.DcResultDetailsId,
                                            "ClientGuid": anwerArray.ClientGuid,
                                            "Comments": anwerArray.Comments,
                                            "ControlId": anwerArray.ControlId,
                                            "Answer": anwerArray.Answer,
                                            "AnswerValue": anwerArray.AnswerValue,
                                            "AnswerFKType": anwerArray.AnswerFKType,
                                            "AnswerDataType": anwerArray.AnswerDataType,
                                            "AnswerMode": anwerArray.AnswerMode,
                                            "IsManual": anwerArray.IsManual,
                                            "IsDynamicAttribute": anwerArray.IsDynamicAttribute,
                                            "IsDynamicAnswer": anwerArray.IsDynamicAnswer,
                                            "IndexId": anwerArray.IndexId,
                                            "IsMulti": anwerArray.IsMulti,
                                            "AutomaticDeviceId": anwerArray.AutomaticDeviceId,
                                            "LastUpdatedDate": anwerArray.LastUpdatedDate,
                                            "IsAttributeGroup": anwerArray.IsAttributeGroup,
                                            "Score": anwerArray.Score,
                                            "MaxScore": anwerArray.MaxScore,
                                            "Percentage": anwerArray.Percentage,
                                            "CompletedChildCount": anwerArray.CompletedChildCount,
                                            "TotalChildCount": anwerArray.TotalChildCount,
                                            "CompletedAttributeCount": anwerArray.CompletedAttributeCount,
                                            "TotalAttributeCount": anwerArray.TotalAttributeCount,
                                            "IsNA": anwerArray.IsNA,
                                            "IsBlocker": anwerArray.IsBlocker,
                                            "ESTTime": anwerArray.ESTTime,
                                            "ActualTime": anwerArray.ActualTime,
                                            "IsManualESTEnabled": anwerArray.IsManualESTEnabled                                           
                                        };
                                        
                                        FormatedControlAnswerDetails.push(AnwerDetails);
                                        i = i + 1;
                                    }
                                    else {                                      
                                        FormatedAttributeAnswerDetails.push({ "ControlId": ControlId, "Answers": FormatedControlAnswerDetails });
                                        break;
                                    }
                                }
                            }
                            else {                                                                
                                DcResultDetails.push({ "AttributeNodeId": AttributeNodeId, "AttributeNodeName": AttributeNodeName, "Controls": FormatedAttributeAnswerDetails });
                                FormatedAttributeAnswerDetails = [];
                                if (i < totalLength) {
                                    AttributeNodeId = result[i].AttributeNodeId;
                                    AttributeNodeName = result[i].AttributeNodeName;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }                    
                    
                    OneViewConsole.Debug("GetDCByDCId End", "LVDataCaptureBO.GetDCByDCId");

                    return DcResultDetails;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDCByDCId", Excep);
                }
                finally {
                    result = null;
                    DataCaptureId = null;
                    DcResultDetails = null;
                    i = null;
                    totalLength = null;
                    AttributeNodeId = null;
                    FormatedAttributeAnswerDetails = null;
                    FormatedControlAnswerDetails = null;
                    ControlId = null;
                    anwerArray = null;
                    AnwerDetails = null;
                }
            }

            var GetFinalAnswerToShow = function (AnswerLst, AnswerModeLoadType, UserId) {
                try {
                    OneViewConsole.Debug("FinalAnswer Start", "LVDataCaptureBO.FinalAnswer");

                    var FinalAnswer = null;

                    if (AnswerModeLoadType == 1) {
                        FinalAnswer = GetLastUpdatedAnswer(AnswerLst);
                    }
                    else if (AnswerModeLoadType == 2) {
                        FinalAnswer = GetAnswerByUserId(AnswerLst, UserId);
                    }
                    else if (AnswerModeLoadType == 3) {
                        FinalAnswer = GetMostCommonAnswer(AnswerLst);
                    }
                    else {
                        alert("AnswerModeLoadType = " + AnswerModeLoadType + " Not implemented exception, LVDataCaptureBO.FinalAnswer");
                    }

                    OneViewConsole.Debug("FinalAnswer End", "LVDataCaptureBO.FinalAnswer");

                    return FinalAnswer;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.FinalAnswer", Excep);
                }
                finally {
                }
            }

            var SetDcComments = function (DcResultsEntitylist, AnswerModeLoadType, DcUserId) {
                try {
                    OneViewConsole.Debug("SetDcComments Start", "LVDataCaptureBO.SetDcComments");

                    var DcResult = GetFinalAnswerToShow(DcResultsEntitylist, AnswerModeLoadType, DcUserId);

                    new LVShiftHandler().SetAndSaveShift(DcResult.ShiftId, DcResult.ShiftName);

                    LVDCSummary.CommentsInfo.Comments = DcResult.Comments;

                    OneViewConsole.Debug("SetDcComments End", "LVDataCaptureBO.SetDcComments");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.SetDcComments", Excep);
                }
                finally {
                }                
            }

            var GetLastUpdatedAnswer = function(AnswerLst) {
                try {
                    OneViewConsole.Debug("GetLastUpdatedAnswer Start", "LVDataCaptureBO.GetLastUpdatedAnswer");

                    var AnswerObj = AnswerLst[0];
                 
                    var _DateTime = new DateTime();
                    var LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[0].LastUpdatedDate);

                    if (AnswerLst.length > 1) {
                        for (var i = 0; i < AnswerLst.length; i++) {
                            if (LastUpdatedDate < _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate)) {
                                LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate);
                                AnswerObj = AnswerLst[i];
                            }
                        }
                    }

                    OneViewConsole.Debug("GetLastUpdatedAnswer End", "LVDataCaptureBO.GetLastUpdatedAnswer");

                    return AnswerObj;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetLastUpdatedAnswer", Excep);
                }
                finally {
                    AnswerObj = null;
                    LastUpdatedDate = null;
                }
            }

            var GetAnswerByUserId = function (AnswerLst, UserId) {
                try {
                    OneViewConsole.Debug("GetAnswerByUserId Start", "LVDataCaptureBO.GetAnswerByUserId");

                    alert("Answer By UserId Not implemented exception, LVDataCaptureBO.GetAnswerByUserId");

                    OneViewConsole.Debug("GetAnswerByUserId End", "LVDataCaptureBO.GetAnswerByUserId");

                    return null;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetAnswerByUserId", Excep);
                }
                finally {
                }
            }

            var GetMostCommonAnswer = function (AnswerLst) {
                try {
                    OneViewConsole.Debug("GetMostCommonAnswer Start", "LVDataCaptureBO.GetMostCommonAnswer");

                    alert("Most Common Answer Not implemented exception, LVDataCaptureBO.GetMostCommonAnswer");
                   
                    OneViewConsole.Debug("GetMostCommonAnswer End", "LVDataCaptureBO.GetMostCommonAnswer");

                    return null;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetMostCommonAnswer", Excep);
                }
                finally {                  
                }
            }
        }
        
        // DOM
        function DOM() {

            /// <summary>
            /// Get Object By Id
            /// </summary>
            /// <param name="Id">DOM Id</param>    
            /// <returns>object</returns> 
            this.GetObjectById = function (Id) {

                try {
                    OneViewConsole.Debug("GetObjectById Start", "DOM.GetObjectById");

                    var obj = document.getElementById(Id);
                    return obj;

                    OneViewConsole.Debug("GetObjectById End", "DOM.GetObjectById");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.GetObjectById", Excep);
                }
            }


            /// <summary>
            /// Set Value
            /// </summary>
            /// <param name="Id">DOM Id</param>    
            /// <param name="Value">Value te set</param>               
            this.SetValue = function (Id, Value) {

                try {
                    OneViewConsole.Debug("SetValue Start", "DOM.SetValue");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.value = Value;
                    }

                    OneViewConsole.Debug("SetValue End", "DOM.SetValue");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.SetValue", Excep);
                }
            }


            /// <summary>
            /// Get Value
            /// </summary>
            /// <param name="Id">DOM Id</param>    
            /// <returns>DOM object Value</returns> 
            this.GetValue = function (Id) {

                try {
                    OneViewConsole.Debug("GetValue Start", "DOM.GetValue");

                    var Value = "";

                    var obj = document.getElementById(Id);
                    if (obj != null) {                        
                        Value = obj.value;
                    }

                    OneViewConsole.Debug("GetValue End", "DOM.GetValue");

                    return Value;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.GetValue", Excep);
                }
            }


            /// <summary>
            /// Append Html
            /// </summary>
            /// <param name="Id">DOM Id</param>    
            /// <param name="Html">Html</param>  
            this.Append = function (Id, Html) {

                try {
                    OneViewConsole.Debug("Append Start", "DOM.Append");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.innerHTML += Html;
                    }

                    OneViewConsole.Debug("Append End", "DOM.Append");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.Append", Excep);
                }
            }


            /// <summary>
            /// Remove DOM object
            /// </summary>
            /// <param name="Id">DOM Id</param>             
            this.Remove = function (Id) {

                try {
                    OneViewConsole.Debug("Remove Start", "DOM.Remove");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.remove();
                    }

                    OneViewConsole.Debug("Remove End", "DOM.Remove");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.Remove", Excep);
                }
            }


            /// <summary>
            /// Disable DOM object
            /// </summary>
            /// <param name="Id">DOM Id</param>    
            this.Disable = function (Id) {

                try {
                    OneViewConsole.Debug("Disable Start", "DOM.Disable");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.disabled = true;
                    }

                    OneViewConsole.Debug("Disable End", "DOM.Disable");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.Disable", Excep);
                }
            }


            /// <summary>
            /// Enable DOM object
            /// </summary>
            /// <param name="Id">DOM Id</param> 
            this.Enable = function (Id) {

                try {
                    OneViewConsole.Debug("Enable Start", "DOM.Enable");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.disabled = false;
                    }

                    OneViewConsole.Debug("Enable End", "DOM.Enable");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.Enable", Excep);
                }
            }


            /// <summary>
            /// Remove DOM object
            /// </summary>
            /// <param name="Id">DOM Id</param> 
            this.Remove = function (Id) {

                try {
                    OneViewConsole.Debug("Remove Start", "DOM.Remove");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        $('#' + Id).remove();
                    }

                    OneViewConsole.Debug("Remove End", "DOM.Remove");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.Remove", Excep);
                }             
            }


            /// <summary>
            /// Get Attribute Value
            /// </summary>
            /// <param name="Id">DOM Id</param>   
            /// <param name="AttributeName">AttributeName</param>   
            /// <param name="Value">Value</param>   
            this.GetAttributeValue = function (Id, AttributeName, Value) {

                try {
                    OneViewConsole.Debug("SetAttributeValue Start", "DOM.SetAttributeValue");

                    var Result = "";

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        Result = obj.getAttribute(AttributeName);
                    }

                    return Result;

                    OneViewConsole.Debug("SetAttributeValue End", "DOM.SetAttributeValue");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.SetAttributeValue", Excep);
                }
            }


            /// <summary>
            /// Get Attribute Value By Obj
            /// </summary>
            /// <param name="obj">obj</param>   
            /// <param name="AttributeName">AttributeName</param>   
            /// <param name="Value">Value</param>   
            this.GetAttributeValueByObj = function (obj, AttributeName, Value) {

                try {
                    OneViewConsole.Debug("GetAttributeValueByObj Start", "DOM.GetAttributeValueByObj");

                    var Result = "";

                    if (obj != null) {
                        Result = obj.getAttribute(AttributeName);
                    }

                    return Result;

                    OneViewConsole.Debug("GetAttributeValueByObj End", "DOM.GetAttributeValueByObj");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.GetAttributeValueByObj", Excep);
                }
            }


            /// <summary>
            /// Set Attribute Value
            /// </summary>
            /// <param name="Id">DOM Id</param>   
            /// <param name="AttributeName">AttributeName</param>   
            /// <param name="Value">Value</param>   
            this.SetAttributeValue = function (Id, AttributeName, Value) {

                try {
                    OneViewConsole.Debug("SetAttributeValue Start", "DOM.SetAttributeValue");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.setAttribute(AttributeName, Value);
                    }

                    OneViewConsole.Debug("SetAttributeValue End", "DOM.SetAttributeValue");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.SetAttributeValue", Excep);
                }
            }


            /// <summary>
            /// Set Attribute Value By Obj
            /// </summary>
            /// <param name="obj">obj</param>   
            /// <param name="AttributeName">AttributeName</param>   
            /// <param name="Value">Value</param>   
            this.SetAttributeValueByObj = function (obj, AttributeName, Value) {

                try {
                    OneViewConsole.Debug("SetAttributeValueByObj Start", "DOM.SetAttributeValueByObj");

                    if (obj != null) {
                        obj.setAttribute(AttributeName, Value);
                    }

                    OneViewConsole.Debug("SetAttributeValueByObj End", "DOM.SetAttributeValueByObj");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.SetAttributeValueByObj", Excep);
                }
            }


            /// <summary>
            /// Get InnerHtml
            /// </summary>
            /// <param name="Id">DOM Id</param>            
            this.GetInnerHtml = function (Id) {

                try {
                    OneViewConsole.Debug("GetInnerHtml Start", "DOM.GetInnerHtml");

                    var Result = "";

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        Result = obj.innerHTML;
                    }

                    return Result;

                    OneViewConsole.Debug("GetInnerHtml End", "DOM.GetInnerHtml");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.GetInnerHtml", Excep);
                }
            }


            /// <summary>
            /// Add InnerHtml
            /// </summary>
            /// <param name="Id">DOM Id</param> 
            /// <param name="Html">Html (String format)</param> 
            this.AddInnerHtml = function (Id, Html) {

                try {
                    OneViewConsole.Debug("AddInnerHtml Start", "DOM.AddInnerHtml");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.innerHTML = Html;
                    }

                    OneViewConsole.Debug("AddInnerHtml End", "DOM.AddInnerHtml");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.AddInnerHtml", Excep);
                }
            }


            /// <summary>
            /// Remove InnerHtml
            /// </summary>
            /// <param name="Id">DOM Id</param>           
            this.RemoveInnerHtml = function (Id) {

                try {
                    OneViewConsole.Debug("RemoveInnerHtml Start", "DOM.RemoveInnerHtml");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.innerHTML = "";
                    }

                    OneViewConsole.Debug("RemoveInnerHtml End", "DOM.RemoveInnerHtml");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.RemoveInnerHtml", Excep);
                }
            }


            /// <summary>
            /// Prepend 
            /// </summary>
            /// <param name="Id">DOM Id</param> 
            /// <param name="Html">Html (String format)</param> 
            this.Prepend = function (Id, Html) {

                try {
                    OneViewConsole.Debug("Prepend Start", "DOM.Prepend");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        $('#' + Id).prepend(Html);
                    }

                    OneViewConsole.Debug("Prepend End", "DOM.Prepend");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.Prepend", Excep);
                }
            }


            /// <summary>
            /// Hide DOM object
            /// </summary>
            /// <param name="Id">DOM Id</param> 
            this.Hide = function (Id) {

                try {
                    OneViewConsole.Debug("Hide Start", "DOM.Hide");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        $('#' + Id).hide();
                    }

                    OneViewConsole.Debug("Hide End", "DOM.Hide");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.Hide", Excep);
                }
            }


            // <summary>
            /// Show DOM object
            /// </summary>
            /// <param name="Id">DOM Id</param> 
            this.Show = function (Id) {

                try {
                    OneViewConsole.Debug("Show Start", "DOM.Show");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        $('#' + Id).show();
                    }

                    OneViewConsole.Debug("Show End", "DOM.Show");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.Show", Excep);
                }
            }


            // <summary>
            /// Add Class to DOM object using Id
            /// </summary>
            /// <param name="Id">DOM Id</param> 
            /// <param name="ClassName">ClassName</param> 
            this.AddClass = function (Id, ClassName) {

                try {
                    OneViewConsole.Debug("AddClass Start", "DOM.AddClass");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        $('#' + Id).addClass(ClassName);
                        //obj.className = obj.className + " " + ClassName;
                    }

                    OneViewConsole.Debug("AddClass End", "DOM.AddClass");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.AddClass", Excep);
                }
            }


            // <summary>
            /// Remove Class from DOM object using Id
            /// </summary>
            /// <param name="Id">DOM Id</param> 
            /// <param name="ClassName">ClassName</param> 
            this.RemoveClass = function (Id, ClassName) {

                try {
                    OneViewConsole.Debug("RemoveClass Start", "DOM.RemoveClass");

                    var RegularExpressionForRemoveClass = new RegExp('(\\s|^)' + ClassName + '(\\s|$)');
                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        $('#' + Id).removeClass(ClassName);
                        //obj.className = obj.className.replace(RegularExpressionForRemoveClass, ' ');
                    }

                    OneViewConsole.Debug("RemoveClass End", "DOM.RemoveClass");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.RemoveClass", Excep);
                }
            }


            // <summary>
            /// Remove all Class from DOM object using Id
            /// </summary>
            /// <param name="Id">DOM Id</param>             
            this.RemoveAllClass = function (Id) {

                try {
                    OneViewConsole.Debug("RemoveAllClass Start", "DOM.RemoveAllClass");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.className = "";
                    }

                    OneViewConsole.Debug("RemoveAllClass End", "DOM.RemoveAllClass");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.RemoveAllClass", Excep);
                }
            }


            // <summary>
            /// Add Class to DOM object using Obj
            /// </summary>
            /// <param name="Obj">Obj</param> 
            /// <param name="ClassName">ClassName</param>
            this.AddClassByObj = function (Obj, ClassName) {

                try {
                    OneViewConsole.Debug("AddClassByObj Start", "DOM.AddClassByObj");

                    if (Obj != undefined && Obj != null && Obj != "") {                        
                        Obj.className = Obj.className + " " + ClassName;
                    }

                    OneViewConsole.Debug("AddClassByObj End", "DOM.AddClassByObj");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.AddClassByObj", Excep);
                }
            }


            // <summary>
            /// Remove Class from DOM object using Obj
            /// </summary>
            /// <param name="Obj">Obj</param> 
            /// <param name="ClassName">ClassName</param> 
            this.RemoveClassByObj = function (Obj, ClassName) {

                try {
                    OneViewConsole.Debug("RemoveClassByObj Start", "DOM.RemoveClassByObj");

                    var RegularExpressionForRemoveClass = new RegExp('(\\s|^)' + ClassName + '(\\s|$)');                  
                    if (Obj != undefined && Obj != null && Obj != "") {                       
                        Obj.className = Obj.className.replace(RegularExpressionForRemoveClass, ' ');
                    }

                    OneViewConsole.Debug("RemoveClassByObj End", "DOM.RemoveClassByObj");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.RemoveClassByObj", Excep);
                }
            }


            // <summary>
            /// Toggle Class from DOM object using Id
            /// </summary>
            /// <param name="Id">DOM Id</param> 
            /// <param name="ClassName">ClassName</param>
            this.ToggleClass = function (Id, ClassName) {

                try {
                    OneViewConsole.Debug("RemoveClass Start", "DOM.RemoveClass");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        $('#' + Id).toggleClass(ClassName);
                    }

                    OneViewConsole.Debug("RemoveClass End", "DOM.RemoveClass");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.RemoveClass", Excep);
                }
            }


            // <summary>
            /// Set Height to DOM object using Id
            /// </summary>
            /// <param name="Id">DOM Id</param> 
            /// <param name="Height">Height</param>
            this.SetHeight = function (Id, Height) {

                try {
                    OneViewConsole.Debug("SetHeight Start", "DOM.SetHeight");

                    $("#" + Id).height(Height);

                    OneViewConsole.Debug("SetHeight End", "DOM.SetHeight");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.SetHeight", Excep);
                }
            }


            // <summary>
            /// Set Focus to DOM object using Id
            /// </summary>
            /// <param name="Id">DOM Id</param>            
            this.SetFocus = function (Id) {

                try {
                    OneViewConsole.Debug("SetFocus Start", "DOM.SetFocus");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.focus();
                    }

                    OneViewConsole.Debug("SetFocus End", "DOM.SetFocus");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.SetFocus", Excep);
                }
            }


            // <summary>
            /// Clear DOM object using Id
            /// </summary>
            /// <param name="Id">DOM Id</param>     
            this.Clear = function (Id) {

                try {
                    OneViewConsole.Debug("ClearByDOMobj Start", "DOM.ClearByDOMobj");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.value = "";
                    }

                    OneViewConsole.Debug("ClearByDOMobj End", "DOM.ClearByDOMobj");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.SetFocus", Excep);
                }
            }


            // <summary>
            /// Set Style DOM object using Id
            /// </summary>
            /// <param name="Id">DOM Id</param>   
            /// <param name="Property">Property</param>   
            /// <param name="Value">Value</param>   
            this.SetStyle = function (Id, Property, Value) {

                try {
                    OneViewConsole.Debug("SetBackgroundColor Start", "DOM.SetBackgroundColor");

                    var obj = document.getElementById(Id);
                    if (obj != null) {
                        obj.style[Property] = Value;
                    }

                    OneViewConsole.Debug("SetBackgroundColor End", "DOM.SetBackgroundColor");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.SetBackgroundColor", Excep);
                }
            }


            // <summary>
            /// Set Focus to DOM object using Obj
            /// </summary>
            /// <param name="Obj">Obj</param>            
            this.SetFocusByObj = function (Obj) {

                try {
                    OneViewConsole.Debug("SetFocusByObj Start", "DOM.SetFocusByObj");

                    if (Obj != undefined && Obj != null && Obj != "") {
                        Obj.focus();
                    }

                    OneViewConsole.Debug("SetFocusByObj End", "DOM.SetFocusByObj");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.SetFocus", Excep);
                }
            }


            // <summary>
            /// Clear DOM object using Obj
            /// </summary>
            /// <param name="Obj">Obj</param>  
            this.ClearByObj = function (Obj) {

                try {
                    OneViewConsole.Debug("ClearByObj Start", "DOM.ClearByObj");

                    if (Obj != undefined && Obj != null && Obj != "") {
                        Obj.value = "";
                    }

                    OneViewConsole.Debug("ClearByObj End", "DOM.ClearByObj");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "DOM.ClearByObj", Excep);
                }
            }
        }
        
        // LVScroll
        function LVScroll() {

            /// <summary>
            /// Check up and down scrolling
            /// </summary>
            /// <param name="obj">DOM object to check scrolling</param>              
            this.Check = function (obj) {               
                try {
                    OneViewConsole.Debug("Check Start", "LVScroll.Check");

                    var ScrollTop = this.GetTopValue(obj);
                                   
                    var IsScrollDownSuccess = IsScrollDown(ScrollTop);

                    if (IsScrollDownSuccess == true) {
                        //alert(LVPageNumber);
                        var Length = (LVPageNumber * LVPaginationSize) + (LVPaginationSize * 2);
                        //alert(Length + "," + LVTemplateNodesLength);
                        //if (Length <= LVTemplateNodesLength || Length - LVPaginationSize <= LVTemplateNodesLength) {
                        //    ScrollDown(obj);
                        //}
                        var TotalPages = Math.ceil(LVTemplateNodesLength/LVPaginationSize);
                        if (LVPageNumber != TotalPages) {
                            if (Length <= LVTemplateNodesLength || Length - LVPaginationSize <= LVTemplateNodesLength) {
                                ScrollDown(obj);
                            }                           
                        }                        
                    }
                    else {                                               
                        ScrollUp(obj);
                    }

                    LVLastScrollTop = ScrollTop;

                    OneViewConsole.Debug("Check End", "LVScroll.Check");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVScroll.Check", Excep);
                }
            }


            /// <summary>
            /// Scroll Down
            /// </summary>
            /// <param name="obj">DOM object to check down scrolling</param>      
            var ScrollDown = function (obj) {

                try {
                    OneViewConsole.Debug("ScrollDown Start", "LVScroll.ScrollDown");

                    var oDOM = new DOM();
                    var oLVPageComponent = new LVPageComponent();
                    var CurrentPage = (obj.scrollTop / LVPageHeight) + 1;
                    CurrentPage = Math.ceil(CurrentPage);

                    if (CurrentPage >= LVPageNumber + 1) {

                        var Pagediff = CurrentPage - LVPageNumber;                        

                        if (Pagediff > 1) {

                            //remove pages wrt LVPageNumber (LVPageNumber,LVPageNumber+1,LVPageNumber-1)
                            oDOM.RemoveInnerHtml("Page" + (LVPageNumber));
                            oDOM.SetHeight("Page" + (LVPageNumber), LVPageHeight);

                            oDOM.RemoveInnerHtml("Page" + (LVPageNumber + 1));
                            oDOM.SetHeight("Page" + (LVPageNumber + 1), LVPageHeight);
                            //oDOM.RemoveInnerHtml("Page" + (LVPageNumber + 2));

                            if (LVPageNumber > 1) {
                                oDOM.RemoveInnerHtml("Page" + (LVPageNumber - 1));
                                oDOM.SetHeight("Page" + (LVPageNumber - 1), LVPageHeight);
                            }
                            //if (LVPageNumber > 2) {
                            //    oDOM.RemoveInnerHtml("Page" + (LVPageNumber - 2));
                            //}

                            //generate pages wrt CurrentPage(CurrentPage, CurrentPage+1,CurrentPage-1)
                            oLVPageComponent.RenderPage(CurrentPage);
                            oLVPageComponent.RenderPage(CurrentPage + 1);
                            //oLVPageComponent.RenderPage(CurrentPage + 2);
                           
                            if (CurrentPage > 1) {
                                oLVPageComponent.RenderPage(CurrentPage - 1);
                            }
                            //if (CurrentPage > 2) {
                            //    oLVPageComponent.RenderPage(CurrentPage - 2);       
                            //}
                        }
                        else {

                            if (CurrentPage > 2) {
                                oDOM.RemoveInnerHtml("Page" + (CurrentPage - 2));
                                oDOM.SetHeight("Page" + (CurrentPage - 2), LVPageHeight);
                            }

                            //if (CurrentPage > 3) {
                            //    oDOM.RemoveInnerHtml("Page" + (CurrentPage - 3));
                            //    $("#Page" + (CurrentPage - 3)).height(LVPageHeight);
                            //}

                            oLVPageComponent.RenderPage(CurrentPage + 1);
                            //oDOM.Generate(CurrentPage + 2);
                        }
                        LVPageNumber = CurrentPage;

                        OneViewConsole.Debug("ScrollDown End", "LVScroll.ScrollDown");
                    }
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVScroll.ScrollDown", Excep);
                }
            }


            /// <summary>
            /// Scroll Up
            /// </summary>
            /// <param name="obj">DOM object to check up scrolling</param>  
            var ScrollUp = function (obj) {

                try {
                    OneViewConsole.Debug("ScrollUp Start", "LVScroll.ScrollUp");

                    var oDOM = new DOM();
                    var oLVPageComponent = new LVPageComponent();
                    var CurrentPage = (obj.scrollTop / LVPageHeight) + 1;
                    CurrentPage = Math.ceil(CurrentPage);

                    if (CurrentPage <= LVPageNumber - 1) {

                        var Pagediff = LVPageNumber - CurrentPage;

                        if (Pagediff > 1) {

                            //remove pages wrt LVPageNumber (LVPageNumber,LVPageNumber+1,LVPageNumber-1)
                            oDOM.RemoveInnerHtml("Page" + (LVPageNumber));
                            oDOM.SetHeight("Page" + (LVPageNumber), LVPageHeight);

                            oDOM.RemoveInnerHtml("Page" + (LVPageNumber + 1));
                            oDOM.SetHeight("Page" + (LVPageNumber + 1), LVPageHeight);
                            //oDOM.RemoveInnerHtml("Page" + (LVPageNumber + 2));

                            //if (LVPageNumber > 1) {
                            //    oDOM.RemoveInnerHtml("Page" + (LVPageNumber - 1));
                            //}
                            if (LVPageNumber > 2) {
                                oDOM.RemoveInnerHtml("Page" + (LVPageNumber - 2));
                                oDOM.SetHeight("Page" + (LVPageNumber - 2), LVPageHeight);
                            }

                            //generate pages wrt CurrentPage(CurrentPage, CurrentPage+1,CurrentPage-1)
                            oLVPageComponent.RenderPage(CurrentPage);
                            oLVPageComponent.RenderPage(CurrentPage + 1);
     
                            if (CurrentPage > 2) {
                                oLVPageComponent.RenderPage(CurrentPage - 2);
                            }

                            //if (CurrentPage > 1) {
                            //    oDOM.Generate(CurrentPage - 1);
                            //}
                        }
                        else {
                            if (CurrentPage > 1) {

                                oDOM.RemoveInnerHtml("Page" + (CurrentPage + 2));
                                oDOM.SetHeight("Page" + (CurrentPage + 2), LVPageHeight);
                                //oDOM.RemoveInnerHtml("Page" + (CurrentPage + 3));

                                oLVPageComponent.RenderPage(CurrentPage - 1);

                                //if (CurrentPage > 3)
                                //  oDOM.Generate(CurrentPage - 3);
                            }
                        }
                        LVPageNumber = CurrentPage;

                        OneViewConsole.Debug("ScrollUp End", "LVScroll.ScrollUp");
                    }
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVScroll.ScrollUp", Excep);
                }
            }


            /// <summary>
            /// If it is Scroll Down
            /// </summary>
            /// <param name="obj">DOM object to check down scrolling</param>  
            var IsScrollDown = function (ScrollTop) {

                try {
                    OneViewConsole.Debug("IsScrollDown Start", "LVScroll.IsScrollDown");

                    if (ScrollTop > LVLastScrollTop) {

                        OneViewConsole.Debug("IsScrollDown End", "LVScroll.IsScrollDown");

                        return true;;
                    }
                    else {

                        OneViewConsole.Debug("IsScrollDown End", "LVScroll.IsScrollDown");

                        return false;
                    }
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVScroll.IsScrollDown", Excep);
                }
            }


            /// <summary>
            /// If it is Reached Bottom
            /// </summary>
            /// <param name="obj">DOM object</param>  
            var IsReachedBottom = function (ScaleValue) {

                try {
                    OneViewConsole.Debug("IsReachedBottom Start", "LVScroll.IsReachedBottom");

                    if (ScaleValue >= 1) {

                        OneViewConsole.Debug("IsReachedBottom End", "LVScroll.IsReachedBottom");

                        return true;
                    }
                    else {

                        OneViewConsole.Debug("IsReachedBottom End", "LVScroll.IsReachedBottom");

                        return false;
                    } 
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVScroll.IsReachedBottom", Excep);
                }
            }


            /// <summary>
            /// If it is Reached Top
            /// </summary>
            /// <param name="obj">DOM object</param>  
            var IsReachedTop = function (ScaleValue) {

                try {
                    OneViewConsole.Debug("IsReachedTop Start", "LVScroll.IsReachedTop");

                    if (ScaleValue <= 0) {

                        OneViewConsole.Debug("IsReachedTop End", "LVScroll.IsReachedTop");

                        return true;;
                    }
                    else {

                        OneViewConsole.Debug("IsReachedTop End", "LVScroll.IsReachedTop");

                        return false;
                    }
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVScroll.IsReachedTop", Excep);
                }
            }


            /// <summary>
            /// Get Scroll Top Value
            /// </summary>
            /// <param name="obj">DOM object</param>  
            this.GetTopValue = function (obj) {

                try {
                    OneViewConsole.Debug("GetTopValue Start", "LVScroll.GetTopValue");

                    var value = obj.scrollTop;

                    OneViewConsole.Debug("GetTopValue End", "LVScroll.GetTopValue");

                    return value;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVScroll.GetTopValue", Excep);
                }
            }


            /// <summary>
            /// Get Scroll Scale Value
            /// </summary>
            /// <param name="obj">DOM object</param>  
            this.GetScaleValue = function (obj) {

                try {
                    OneViewConsole.Debug("GetScaleValue Start", "LVScroll.GetScaleValue");

                    var Scale = obj.scrollTop / (obj.scrollHeight - obj.clientHeight);

                    OneViewConsole.Debug("GetScaleValue End", "LVScroll.GetScaleValue");

                    return Scale;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVScroll.GetScaleValue", Excep);
                }
            }


            /// <summary>
            /// Show TempValues (For Testing)
            /// </summary>
            /// <param name="obj">DOM object</param>  
            this.ShowTempValues = function (obj) {

                try {
                    OneViewConsole.Debug("ShowTempValues Start", "LVScroll.ShowTempValues");

                    document.getElementById('scrollTop').innerHTML = obj.scrollTop;
                    document.getElementById('scrollHeight').innerHTML = obj.scrollHeight;
                    document.getElementById('clientHeight').innerHTML = obj.clientHeight;
                   
                    var CurrentPage = (obj.scrollTop / LVPageHeight) + 1;
                    CurrentPage = Math.ceil(CurrentPage);

                    document.getElementById('CurrentPage').innerHTML = CurrentPage;                   
                    document.getElementById('realpageNo').innerHTML = LVPageNumber;

                    OneViewConsole.Debug("ShowTempValues End", "LVScroll.ShowTempValues");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVScroll.ShowTempValues", Excep);
                }
            }
        }
        
        // LVActionNCComponent
        function LVActionNCComponent() {

            this.ActionPageComponentKey = "LVDefaultActionPageComponent";
            this.RightPanelComponentKey = "LVDefaultRightPanelComponent";
            this.DefaultJavaScriptAlert = "DefaultJavaScriptAlert";
            this.LVDefaultNotificationComponentKey = "LVDefaultNotificationComponent";

            /// <summary>
            /// Check ActionNC
            /// </summary>
            /// <param name="TemplateNodeId">TemplateNodeId</param>  
            /// <param name="ControlId">ControlId</param>  
            /// <param name="Answer">Answer</param>  
            /// <param name="AnswerValue">AnswerValue</param>             
            this.CheckActionNC = function (TemplateNodeId, IsTabClick) {

                try {
                    OneViewConsole.Debug("CheckActionNC Start", "LVActionNCComponent.CheckActionNC");

                    if (ActionNCProfile != null && ActionNCProfile != undefined) {

                        var oActionNCConfig = GetActionNCConfig(TemplateNodeId);

                        if (oActionNCConfig != undefined && oActionNCConfig.length > 0) {

                            if (oActionNCConfig.length > 1) {
                                //alert("LVActionNCComponent.CheckActionNC for multiple rules : Not implemented exception");
                                var RuleViolatedCount = 0;
                                var RuleViolatedIndex = 0;
                                
                                for (var i = 0; i < oActionNCConfig.length; i++) {
                                    if (oActionNCConfig[i].IsRuleViolated == true) {
                                        RuleViolatedCount++;
                                        RuleViolatedIndex = i;
                                    }
                                }
                                
                                if (RuleViolatedCount > 1) {
                                    alert("LVActionNCComponent.CheckActionNC for multiple rules violation : Not implemented exception");
                                }
                                else {
                                    if (oActionNCConfig[RuleViolatedIndex].IsRuleViolated == true) {

                                        if (oActionNCConfig[RuleViolatedIndex].IsNC == true && oActionNCConfig[RuleViolatedIndex].IsActionEnable == true) {

                                            if (IsTabClick == false && oActionNCConfig[RuleViolatedIndex].CriteriaDisplayLabelKey != "" && oActionNCConfig[RuleViolatedIndex].IsManual == false) {
                                                var _oLVFactory = new LVFactory();
                                                var _oNotificationComponent = _oLVFactory.GetNotificationComponent(this.LVDefaultNotificationComponentKey);
                                                _oNotificationComponent.Notify(oActionNCConfig[RuleViolatedIndex].CriteriaDisplayLabelKey, this.DefaultJavaScriptAlert);
                                            }

                                            var Result = [];
                                            Result.push(oActionNCConfig[RuleViolatedIndex]);

                                            RemoveUnViolatedRules(oActionNCConfig);

                                            return Result;
                                        }
                                        else if (oActionNCConfig[RuleViolatedIndex].IsNC == true) {
                                            alert("LVActionNCComponent.CheckActionNC IsNC == true: Not implemented exception");
                                        }
                                        else {
                                            alert("LVActionNCComponent.CheckActionNC IsActionEnable == true: Not implemented exception");
                                        }
                                    }
                                    else {
                                        RemoveUnViolatedRules(oActionNCConfig);
                                    }                                    
                                }
                            }
                            else {
                                if (oActionNCConfig[0].IsRuleViolated == true) {

                                    if (oActionNCConfig[0].IsNC == true && oActionNCConfig[0].IsActionEnable == true) {

                                        if (IsTabClick == false && oActionNCConfig[0].CriteriaDisplayLabelKey != "") {
                                            var _oLVFactory = new LVFactory();
                                            var _oNotificationComponent = _oLVFactory.GetNotificationComponent(this.LVDefaultNotificationComponentKey);
                                            _oNotificationComponent.Notify(oActionNCConfig[0].CriteriaDisplayLabelKey, this.DefaultJavaScriptAlert);
                                        }

                                        return oActionNCConfig;
                                    }
                                    else if (oActionNCConfig[0].IsNC == true) {
                                        alert("LVActionNCComponent.CheckActionNC IsNC == true: Not implemented exception");
                                    }
                                    else {
                                        alert("LVActionNCComponent.CheckActionNC IsActionEnable == true: Not implemented exception");
                                    }
                                }
                                else if (LVActionResult[oActionNCConfig[0].RuleId] != undefined) {
                                    if (LVActionResult[oActionNCConfig[0].RuleId].DCNCMappingClientId == "") {
                                        delete LVActionResult[oActionNCConfig[0].RuleId];                                        
                                    }
                                    else {
                                        LVActionResult[oActionNCConfig[0].RuleId].IsDisable = true;
                                        LVActionResult[oActionNCConfig[0].RuleId].IsNC = false;
                                        for (var k = 0; k < LVActionResult[oActionNCConfig[0].RuleId].Actions.length; k++) {
                                            LVActionResult[oActionNCConfig[0].RuleId].Actions[k].IsDisable = true;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            return new Array();
                        }
                    }

                    OneViewConsole.Debug("CheckActionNC End", "LVActionNCComponent.CheckActionNC");                  
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVActionNCComponent.CheckActionNC", Excep);
                }
            }


            /// <summary>
            /// Remove UnViolated Rules
            /// </summary>
            /// <param name="oActionNCConfig">oActionNCConfig</param>               
            var RemoveUnViolatedRules = function (oActionNCConfig) {

                try {
                    OneViewConsole.Debug("RemoveUnViolatedRules Start", "LVActionNCComponent.RemoveUnViolatedRules");

                    for (var i = 0; i < oActionNCConfig.length; i++) {

                        if (oActionNCConfig[i].IsRuleViolated == false &&
                            LVActionResult[oActionNCConfig[i].RuleId] != undefined
                        ) {

                            if (LVActionResult[oActionNCConfig[i].RuleId].DCNCMappingClientId == "") {
                                delete LVActionResult[oActionNCConfig[i].RuleId];
                            }
                            else {
                                LVActionResult[oActionNCConfig[i].RuleId].IsDisable = true;
                                LVActionResult[oActionNCConfig[i].RuleId].IsNC = false;
                                for (var k = 0; k < LVActionResult[oActionNCConfig[i].RuleId].Actions.length; k++) {
                                    LVActionResult[oActionNCConfig[i].RuleId].Actions[k].IsDisable = true;
                                }
                            }
                        }
                    }

                    OneViewConsole.Debug("RemoveUnViolatedRules End", "LVActionNCComponent.RemoveUnViolatedRules");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVActionNCComponent.RemoveUnViolatedRules", Excep);
                }
            }


            /// <summary>
            /// MultiMedia Delete Event Handler
            /// </summary>
            this.MultiMediaDeleteEventHandler = function (RuleId, LocalURL) {

                try {
                    OneViewConsole.Debug("MultiMediaDeleteEventHandler Start", "LVActionNCComponent.MultiMediaDeleteEventHandler");
                  
                    if (RuleId != "" && RuleId != undefined && LocalURL != "" && LocalURL != undefined) {

                        var oOneViewCordovaFilePlugin = new OneViewCordovaFilePlugin();

                        if (LVActionResult[RuleId] != undefined) {
                           
                            for (var i = 0; i < LVActionResult[RuleId].MultimediaSubElements.length; i++) {
                                if (LVActionResult[RuleId].MultimediaSubElements[i].LocalURL == LocalURL) {                                  
                                    if (LVActionResult[RuleId].MultimediaSubElements[i].ClientId == "") {
                                        LVActionResult[RuleId].MultimediaSubElements.splice(i, 1);
                                    }
                                    else {
                                        LVActionResult[RuleId].MultimediaSubElements[i].IsDisabled = true;
                                    }
                                }
                            }                           
                        }                       
                        for (var i = 0; i < LVscope.ActionMultiMediaSubElements.length; i++) {
                            if (LVscope.ActionMultiMediaSubElements[i].LocalURL == LocalURL) {
                                LVscope.ActionMultiMediaSubElements.splice(i, 1);                              
                                oOneViewCordovaFilePlugin.DeleteFile(LocalURL);
                            }
                        }                       
                        LVscope.$apply();
                    }
                    
                    OneViewConsole.Debug("MultiMediaDeleteEventHandler End", "LVActionNCComponent.MultiMediaDeleteEventHandler");                  
                }
                catch (Excep) {                   
                    throw oOneViewExceptionHandler.Create("Framework", "LVActionNCComponent.MultiMediaDeleteEventHandler", Excep);
                }
            }


            /// <summary>
            /// Get ActionNCConfig
            /// </summary>
            /// <param name="AttributeNodeId">Node id of the attribute</param>   
            /// <returns>ActionNCConfig</returns> 
            var GetActionNCConfig = function (TemplateNodeId) {

                try {
                    OneViewConsole.Debug("GetActionNCConfig Start", "LVActionNCComponent.GetActionNCConfig");

                    var oActionNCConfig = new Array();

                    var AttributeWiseActionNCConfigList = CheckAttributeActionNCConfig(TemplateNodeId);
                    var MultipleAttributeActionNCConfigList = CheckMultipleAttributeActionNCConfig(TemplateNodeId);

                    if (AttributeWiseActionNCConfigList.length > 0 && MultipleAttributeActionNCConfigList.length == 0) {
                        oActionNCConfig = AttributeWiseActionNCConfigList;
                    }

                    else if (AttributeWiseActionNCConfigList.length == 0 && MultipleAttributeActionNCConfigList.length > 0) {
                        oActionNCConfig = MultipleAttributeActionNCConfigList;
                    }

                    else if (AttributeWiseActionNCConfigList.length > 0 && MultipleAttributeActionNCConfigList.length > 0) {
                        oActionNCConfig.concat(AttributeWiseActionNCConfigList, MultipleAttributeActionNCConfigList)
                    }

                    OneViewConsole.Debug("GetActionNCConfig End", "LVActionNCComponent.GetActionNCConfig");

                    return oActionNCConfig;
                }
                catch (Excep) {                 
                    throw oOneViewExceptionHandler.Create("Framework", "LVActionNCComponent.GetActionNCConfig", Excep);
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
                    
                    if(AttributeWiseActionNCConfigList == undefined){
                        AttributeWiseActionNCConfigList = new Array();
                    }
                    else {
                        for (var i = 0; i < AttributeWiseActionNCConfigList.length; i++) {
                            AttributeWiseActionNCConfigList[i].TemplateNodeIds = "," + TemplateNodeId + ",";
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
                        var TemplateNodeIds = irtMultipleAttributeActionNCConfigDict.replace(/:/g, ",");

                        for (var i = 0; i < AttributeKeys.length; i++) {
                            if (AttributeKeys[i] == TemplateNodeId) {
                                MultipleAttributeActionNCConfigList = MultipleAttributeActionNCConfigDict[irtMultipleAttributeActionNCConfigDict];
                                if (MultipleAttributeActionNCConfigList == undefined) {
                                    MultipleAttributeActionNCConfigList = new Array();
                                }
                                else {
                                    for (var i = 0; i < MultipleAttributeActionNCConfigList.length; i++) {
                                        MultipleAttributeActionNCConfigList[i].TemplateNodeIds = "," + TemplateNodeIds + ",";
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

                        //for (var i = 0; i < oAttribute.Answers.length; i++) {
                        //    if (oAttribute.Answers[i].Answer == "") { // Need to change
                        //        return false;
                        //    }
                        //    else {
                        //        Model[oAttribute.Answers[i].ControlId] = oAttribute.Answers[i].Answer;
                        //    }
                        //} 
                        if (oAttribute.Answers.length > 1) {
                            if ((oAttribute.Answers[1].AnswerMode == "DCListViewControlConfig" && oAttribute.Answers[1].Answer == "") || (oAttribute.Answers[0].AnswerMode == "DCListViewControlConfig" && oAttribute.Answers[0].Answer == "")) { // Need to change
                                return false;
                            }
                            else {
                                Model[oAttribute.Answers[0].ControlId] = oAttribute.Answers[0].Answer;
                                Model[oAttribute.Answers[1].ControlId] = oAttribute.Answers[1].Answer;
                            }
                        }
                        else {
                            if (oAttribute.Answers[0].Answer == "") { // Need to change
                                return false;
                            }
                            else {
                                Model[oAttribute.Answers[0].ControlId] = oAttribute.Answers[0].Answer;
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
        }
        
        // LVDefaultActionPageComponent
        function LVDefaultActionPageComponent() {

            /// <summary>
            /// Load
            /// </summary>
            /// <param name="oActionNCConfig">oActionNCConfig</param>              
            this.Load = function (oActionNCConfig, TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("Load Start", "LVActionNCComponent.Load");
               
                    LVscope.CustomActions = [];
                    LVscope.CustomAction = "";
                    LVscope.PredefinedActions = [];                   
                    LVscope.ActionMultiMediaSubElements = [];

                    if (oActionNCConfig != undefined && oActionNCConfig.length > 0) {
                        if (oActionNCConfig.length > 1) {
                            alert("LVDefaultActionPageComponent.Load actions for multiple rules : Not implemented exception");
                        }
                        else {
                            var ActionMasterIds = [];
                            var CustomFormTemplateNodeIds = [];
                            var ActionList = oActionNCConfig[0].ActionList;

                            for (var i = 0; i < ActionList.length; i++) {
                                if (ActionList[i].ActionConfigDimension == "PredefinedActionConfig") {                                   
                                    ActionMasterIds.push(ActionList[i].ActionConfig.PreDefinedActionMasterId);                                   
                                }
                                else if (ActionList[i].ActionConfigDimension == "FormActionConfig") {
                                    CustomFormTemplateNodeIds.push(ActionList[i].TemplateNodeId);
                                }
                            }

                            if (ActionMasterIds.length > 0) {

                                //Todo : Siva (14-03-2017) - Need to remove this code for Hyde Housing demo , temporary code
                                if (OneViewSessionStorage.Get("ServiceName") == "QaaS" && OneViewSessionStorage.Get("TemplateId") == 625) {
                                    ActionMasterIds = [];
                                    var Answer = LVTemplateResult[TemplateNodeId].Answers[0].Answer;
                                    if (Answer == "9") //Wooden
                                    {
                                        ActionMasterIds = [156,
                                                                157,
                                                                158,
                                                                159,
                                                                160,
                                                                161,
                                                                162,
                                                                163,
                                                                164,
                                                                165,
                                                                166,
                                                                167,
                                                                168,
                                                                169,
                                                                170,
                                                                171,
                                                                172,
                                                                173,
                                                                174,
                                                                175,
                                                                176,
                                                                177,
                                                                178];

                                    } else if (Answer == "10")//Plumbing 
                                    {
                                        ActionMasterIds = [179,
                                            180,
                                            181,
                                            182,
                                            183,
                                            184,
                                            185]
                                    } else if (Answer == "11")//Tiles
                                    {
                                        ActionMasterIds = [186,
                                                    187,
                                                    188,
                                                    189,
                                                    190,
                                                    191,
                                                    192,
                                                    193,
                                                    194,
                                                    195]
                                    } else if (Answer == "12")//Walls 
                                    {
                                        ActionMasterIds = [196,
                                                        197,
                                                        198,
                                                        199,
                                                        200,
                                                        201,
                                                        202]
                                    }
                                    
                                    if (LVActionResult[oActionNCConfig[0].RuleId] != undefined) {
                                        for (var j = 0; j < LVActionResult[oActionNCConfig[0].RuleId].Actions.length; j++) {
                                            if (ActionMasterIds.indexOf(LVActionResult[oActionNCConfig[0].RuleId].Actions[j].PreDefinedActionId) == -1 && LVActionResult[oActionNCConfig[0].RuleId].Actions[j].Name == "") {
                                                if (LVActionResult[oActionNCConfig[0].RuleId].DCNCMappingClientId == "") {
                                                    delete LVActionResult[oActionNCConfig[0].RuleId];
                                                    break;
                                                }
                                                else {
                                                    LVActionResult[oActionNCConfig[0].RuleId].IsDisable = true;
                                                    LVActionResult[oActionNCConfig[0].RuleId].IsNC = false;
                                                    for (var k = 0; k < LVActionResult[oActionNCConfig[0].RuleId].Actions.length; k++) {
                                                        LVActionResult[oActionNCConfig[0].RuleId].Actions[k].IsDisable = true;
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }

                                else if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 18 && OneViewSessionStorage.Get("TemplateId") == 625) {
                                    // Todo(Added by Sangeeta Bhatt(19-05-2017) : Need to change, temporarily enabled for Elcita Services for different predefined action loading)
                                    ActionMasterIds = LoadPredefinedActionsForElcitaClient(ActionMasterIds, oActionNCConfig, TemplateNodeId, ControlId);
                                }


                                var _oActionDAO = new ActionDAO();
                                var PredefinedActions = _oActionDAO.GetAllByIds(ActionMasterIds);
                                
                                if (PredefinedActions.length > 0) {
                                    LoadPredefinedActions(oActionNCConfig[0], PredefinedActions, TemplateNodeId, ControlId);
                                }
                            }
                            else if (CustomFormTemplateNodeIds.length > 0) {
                                alert('LVDefaultActionPageComponent.Load, ActionConfigDimension == "FormActionConfig" : Not implemented exception');
                            }

                            if (oActionNCConfig[0].IsCustomActionEnabled == true) {
                                LoadCustomActions(oActionNCConfig[0], TemplateNodeId, ControlId);
                            }

                            LoadActionMultimediaSubElements(oActionNCConfig[0], TemplateNodeId, ControlId);
                        }
                    }

                    OneViewConsole.Debug("Load End", "LVActionNCComponent.Load");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActionPageComponent.Load", Excep);
                }
            }

            var LoadPredefinedActionsForElcitaClient = function (ActionMasterIds, oActionNCConfig, TemplateNodeId, ControlId) {
                try {
                    OneViewConsole.Debug("LoadPredefinedActionsForElcitaClient Start", "LVActionNCComponent.LoadPredefinedActionsForElcitaClient");

                    ActionMasterIds = [];
                    var Answer = LVTemplateResult[TemplateNodeId].Answers[0].Answer;
                    if (Answer == "9") //Waste Management
                    {
                        ActionMasterIds = [1,2,3,4,5,6];
                    }
                    else if (Answer == "10")//Lighting
                    {
                        ActionMasterIds = [7, 8, 9, 10, 11];
                    }
                    else if (Answer == "11")//Staff
                    {
                        ActionMasterIds = [12, 13, 14];
                    }
                    else if (Answer == "12")//Walkway
                    {
                        ActionMasterIds = [15, 16, 17, 18];
                    }

                    
                    if (LVActionResult[oActionNCConfig[0].RuleId] != undefined) {
                        for (var j = 0; j < LVActionResult[oActionNCConfig[0].RuleId].Actions.length; j++) {
                            if (ActionMasterIds.indexOf(LVActionResult[oActionNCConfig[0].RuleId].Actions[j].PreDefinedActionId) == -1 && LVActionResult[oActionNCConfig[0].RuleId].Actions[j].Name == "") {
                                if (LVActionResult[oActionNCConfig[0].RuleId].DCNCMappingClientId == "") {
                                    delete LVActionResult[oActionNCConfig[0].RuleId];
                                    break;
                                }
                                else {
                                    LVActionResult[oActionNCConfig[0].RuleId].IsDisable = true;
                                    LVActionResult[oActionNCConfig[0].RuleId].IsNC = false;
                                    for (var k = 0; k < LVActionResult[oActionNCConfig[0].RuleId].Actions.length; k++) {
                                        LVActionResult[oActionNCConfig[0].RuleId].Actions[k].IsDisable = true;
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    
                    OneViewConsole.Debug("LoadPredefinedActionsForElcitaClient End", "LVActionNCComponent.LoadPredefinedActionsForElcitaClient");
                    return ActionMasterIds;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultActionPageComponent.LoadPredefinedActionsForElcitaClient", Excep);
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
                            'Id': PredefinedActions[i].ServerId,
                            'TemplateNodeIds': oActionNCConfig.TemplateNodeIds
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
        }

        // LVDefaultAnswerFormater
        function LVDefaultDateTimeFormater() {


            /// <summary>
            /// Check
            /// </summary>
            /// <param name="ControlConfig">ControlConfig</param>   
            /// <param name="DOMObj">DOMObj</param>
            /// <returns>Formated Value</returns> 
            this.GetFormatedValue = function (ControlConfig, DOMObj) {

                try {
                    OneViewConsole.Debug("GetFormatedValue Start", "LVDefaultAnswerFormater.GetFormatedValue");

                    var Answer = DOMObj.value;

                    if (ControlConfig.DataType == "DATETIMELOCAL") {
                        if (DOMObj != null && DOMObj.value.indexOf('T') != -1) {
                            var DateTime = DOMObj.value.split('T');
                            var Date = DateTime[0].split('-');                               
                            Answer = Date[2] + "-" + Date[1] + "-" + Date[0] + " " + DateTime[1] + ":00";
                        }                          
                    }
                    else if (ControlConfig.DataType == "DATE") {
                        if (DOMObj != null && DOMObj.value.indexOf('-') != -1) {                               
                            var Date = DOMObj.value.split('-');
                            Answer = Date[2] + "-" + Date[1] + "-" + Date[0];
                        }
                    }
                    else if (ControlConfig.DataType == "MONTHYEAR") {
                        if (DOMObj != null && DOMObj.value.indexOf('-') != -1) {
                            var Date = DOMObj.value.split('-');
                            Answer = Date[1] + "-" + Date[0];
                        }
                    }                                    

                    OneViewConsole.Debug("GetFormatedValue End", "LVDefaultAnswerFormater.GetFormatedValue");

                    return Answer;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerFormater.GetFormatedValue", Excep);
                }
            }
            

            /// <summary>
            /// Check
            /// </summary>
            /// <param name="ControlConfig">ControlConfig</param>   
            /// <param name="DOMObj">DOMObj</param>
            /// <returns>Formated Value</returns> 
            this.GetFormatedValueForUI = function (AnswerMode, Answer) {

                try {
                    OneViewConsole.Debug("GetFormatedValueForUI Start", "LVDefaultAnswerFormater.GetFormatedValueForUI");

                    if (AnswerMode.DataType == "DATETIMELOCAL") {
                        if (Answer != "" && Answer.indexOf(' ') != -1) {
                            var DateTime = Answer.split(' ');
                            var Date = DateTime[0].split('-');
                            Answer = Date[2] + "-" + Date[1] + "-" + Date[0] + "T" + DateTime[1];
                        }
                    }
                    else if (AnswerMode.DataType == "DATE") {
                        if (Answer != "" && Answer.indexOf('-') != -1) {
                            var Date = Answer.split('-');
                            Answer = Date[2] + "-" + Date[1] + "-" + Date[0];
                        }
                    }
                    else if (AnswerMode.DataType == "MONTHYEAR") {
                        if (Answer != "" && Answer.indexOf('-') != -1) {
                            var Date = Answer.split('-');
                            Answer = Date[1] + "-" + Date[0];
                        }
                    }                   
                   
                    OneViewConsole.Debug("GetFormatedValueForUI End", "LVDefaultAnswerFormater.GetFormatedValueForUI");

                    return Answer;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerFormater.GetFormatedValueForUI", Excep);
                }
            }
        }
        
        // LVDCBlockerPageComponent
        function LVDCBlockerPageComponent() {

            this.AttributeGroupComponentKey = "LVDefaultAttributeGroupComponent";
            this.AttributeComponentKey = "LVDefaultAttributeComponent";          
            this.AnswerModeComponentKey = "LVDefaultAnswerModeComponent";
            this.DefaultValueComponentKey = "LVDefaultDefaultValueComponent";            
            this.DefaultJavaScriptAlert = "DefaultJavaScriptAlert";
            this.DefaultNativeToast = "DefaultNativeToast";
            this.LVDefaultNotificationComponentKey = "LVDefaultNotificationComponent";
            this.LVDefaultTextBoxControlKey = "LVDefaultTextBoxControl";
            this.LVDefaultBandControlKey = "LVDefaultBandControl";
            this.LVDefaultRadioButtonControlKey = "LVDefaultRadioButtonControl";
            this.LVActionNCComponentKey = "LVActionNCComponent";

            var oLVFactory = new LVFactory();
            var MyInstance = this;

            this.Load = function (TemplateNodeId, ControlId, AttributeName, DOMObj) {

                try {
                    OneViewConsole.Debug("Load Start", "LVDCBlockerPageComponent.Load");

                        LVCurrentAttributeId = TemplateNodeId;
                        LVCurrentControlId = ControlId;

                        var _oDCBlockerConfigProfileComponent = new DCBlockerConfigProfileComponent();
                        var DCBlockerConfig = _oDCBlockerConfigProfileComponent.GetDCBlockerConfig(TemplateNodeId);

                        if (DCBlockerConfig != null) {

                            if (DCBlockerConfig.TemplateId != null && DCBlockerConfig.TemplateId != "" && DCBlockerConfig.TemplateId != 0) {

                                LoadDCBlockerTemplateModel(DCBlockerConfig, ControlId);
                                
                                if (LVDCBlockerTemplateResult[TemplateNodeId] != undefined && LVDCBlockerTemplateResult[TemplateNodeId].IsDisable == false) {

                                    if (LVDCBlockerTemplateResult[TemplateNodeId].DataCaptureClientGuid != "") {
                                        LVDCBlockerTemplateResult[TemplateNodeId].IsDisable = true;
                                    }
                                    else {
                                        delete LVDCBlockerTemplateResult[TemplateNodeId];
                                    }
                                }
                                else {
                                    if (LVDCBlockerTemplateResult[TemplateNodeId] != undefined) {
                                        LVDCBlockerTemplateResult[TemplateNodeId].IsDisable = false;
                                    }

                                    var DCBlockerTemplateMetadata = LVDCBlockerTemplateMetadata[DCBlockerConfig.TemplateId];

                                    if (LVFormatedDCBlockerTemplateMetadata[DCBlockerConfig.TemplateId] == undefined) {
                                        var _oLVTemplateMetadataFormatterComponent = new LVTemplateMetadataFormatterComponent();
                                        LVFormatedDCBlockerTemplateMetadata[DCBlockerConfig.TemplateId] = _oLVTemplateMetadataFormatterComponent.Format(DCBlockerTemplateMetadata.TemplateConfigMetaDataDetails);
                                        LVCurrentDCBlockerTemplateId = DCBlockerConfig.TemplateId;
                                    }

                                    var _oOneViewSidePanel = new OneViewSidePanel(LVsnapRemote);
                                    _oOneViewSidePanel.Clear();

                                    var Html = '<div class="bar bar-header">' +
                                                '<h3 style="width:100%">' + AttributeName + '</h3>' +
                                               '</div>' +

                                              '<div class="scroll-content has-header has-footer padding grid-edit-form" style="background: #eef3f5;">' +
                                                '<div class="full-height scrollable">' +
                                                    GetTemplateNodes(TemplateNodeId, ControlId, DCBlockerTemplateMetadata.TemplateConfigMetaDataDetails.Childs, DCBlockerConfig.TemplateId) +
                                                '</div>' +
                                              '</div>' +

                                              '<div class="bar bar-footer no-padding">' +
                                               '<div class="row">' +
                                                   '<div class="col"><a ng-click="CloseRightPanel()" class="button button-block button-clear">{{"Close" | xlat }}</a></div>' +
                                               '</div>' +
                                              '</div>';

                                    var _oOneViewCompiler = new OneViewCompiler();
                                    _oOneViewCompiler.CompileAndApeend(LVscope, LVcompile, Html, "divAutocomplatePopUp");

                                    for (var i = 0; i < SignatutePadInfo.length; i++) {
                                        LoadSignaturePad(SignatutePadInfo[i].ControlId);
                                        var TemplateNodeObj = LVDCBlockerTemplateResult[TemplateNodeId].LVTemplateResult[SignatutePadInfo[i].TemplateNodeId];                                       
                                        if (TemplateNodeObj != undefined) {
                                            for (var j = 0; j < TemplateNodeObj.Answers.length; j++) {                                               
                                                if (TemplateNodeObj.Answers[j].ControlId == SignatutePadInfo[i].ControlId && TemplateNodeObj.Answers[j].Answer != "") {                                                    
                                                    if (SignatutePadObjects[SignatutePadInfo[i].ControlId] != undefined) {                                                       
                                                        SignatutePadObjects[SignatutePadInfo[i].ControlId].fromDataURL(TemplateNodeObj.Answers[j].Answer);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                 
                                    _oOneViewSidePanel.Toggle(LVsnapRemote);
                                }
                            }
                        }
                                    
                    if (LVTemplateResult[TemplateNodeId] != undefined) {
                        UpdateModel(TemplateNodeId, DOMObj);
                    }

                    var _oLVTemplateHeaderComponent = new LVTemplateHeaderComponent();
                    _oLVTemplateHeaderComponent.Update();

                    var _oLVTemplateUIEventJobComponent = new LVTemplateUIEventJobComponent();
                    _oLVTemplateUIEventJobComponent.ExcecutePostControlUIJobs(TemplateNodeId);

                    OneViewConsole.Debug("Load End", "LVDCBlockerPageComponent.Load");
                }
                catch (Excep) {                  
                    throw oOneViewExceptionHandler.Create("Framework", "LVDCBlockerPageComponent.Load", Excep);
                }               
            }
         
            var UpdateModel = function (TemplateNodeId, DOMObj) {

                try {
                    OneViewConsole.Debug("UpdateModel Start", "LVDefaultNAComponent.UpdateModel");

                    if (LVTemplateResult[TemplateNodeId] != undefined) {

                        SetColor(TemplateNodeId, DOMObj);
                        LVTemplateResult[TemplateNodeId].IsBlocker = !(LVTemplateResult[TemplateNodeId].IsBlocker);

                        for (var i = 0; i < LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                            LVTemplateResult[TemplateNodeId].Answers[i].IsModified = true;
                            LVTemplateResult[TemplateNodeId].Answers[i].Score = 0;
                            LVTemplateResult[TemplateNodeId].Answers[i].MaxScore = 0;
                            LVTemplateResult[TemplateNodeId].Answers[i].Percentage = 0;
                            LVTemplateResult[TemplateNodeId].Answers[i].CompletedChildCount = 0;
                            LVTemplateResult[TemplateNodeId].Answers[i].TotalChildCount = 0;
                            LVTemplateResult[TemplateNodeId].Answers[i].CompletedAttributeCount = 0;
                            LVTemplateResult[TemplateNodeId].Answers[i].TotalAttributeCount = 0;
                        }
                       
                        if (LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].IsBlocker == true) {
                            for (var i = 0; i < LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes.length; i++) {
                                if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCListViewControlConfig") {
                                    if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ListViewDisplay == 1) {
                                        var _oAnswerMode = oLVFactory.GetRadioButtonControl(MyInstance.LVDefaultRadioButtonControlKey);
                                        _oAnswerMode.ClearAnswerModel(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                    }
                                    else if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ListViewDataSourceConfig.Type == "BandListViewDataSourceConfig" || LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ListViewDataSourceConfig.Type == "_oBandListViewDataSourceConfig") {
                                        var _oAnswerMode = oLVFactory.GetBandControl(MyInstance.LVDefaultBandControlKey);
                                        _oAnswerMode.ClearAnswerModel(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                    }
                                    else if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig") {
                                        var _oAnswerMode = new LVDefaultHtmlDropdownControl();
                                        _oAnswerMode.Clear(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                        _oAnswerMode.Disable(LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                    }
                                }
                                else if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCTextBoxControlConfig" || LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCNumericTextBoxControlConfig") {
                                    var _oAnswerMode = oLVFactory.GetTextBoxControl(MyInstance.LVDefaultTextBoxControlKey);
                                    _oAnswerMode.ClearAnswerModel(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                }
                                else if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCSignaturePadControlConfig") {
                                    var _oAnswerMode = new LVDefaultSignatutePadControl();
                                    _oAnswerMode.Clear(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                    _oAnswerMode.Disable(LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                }

                                var _oActionNCComponent = oLVFactory.GetActionNCComponent(MyInstance.LVActionNCComponentKey);
                                var oActionNCConfigList = _oActionNCComponent.CheckActionNC(TemplateNodeId, true);

                                if (oActionNCConfigList != undefined && oActionNCConfigList != null) {
                                    for (var j = 0; j < oActionNCConfigList.length; j++) {
                                        if (LVActionResult[oActionNCConfigList[j].RuleId] != undefined) {
                                            if (LVActionResult[oActionNCConfigList[j].RuleId].DCNCMappingClientId == "") {
                                                delete LVActionResult[oActionNCConfigList[j].RuleId];
                                            }
                                            else {
                                                LVActionResult[oActionNCConfigList[j].RuleId].IsDisable = true;
                                                LVActionResult[oActionNCConfigList[j].RuleId].IsNC = false;
                                                for (var k = 0; k < LVActionResult[oActionNCConfigList[j].RuleId].Actions.length; k++) {
                                                    LVActionResult[oActionNCConfigList[j].RuleId].Actions[k].IsDisable = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            var _oLVDefaultActualTimeComponent = new LVDefaultActualTimeComponent();
                            _oLVDefaultActualTimeComponent.Clear(TemplateNodeId);
                            _oLVDefaultActualTimeComponent.Disable(TemplateNodeId);
                            var _oDOM = new DOM();
                            _oDOM.AddClass("TemplateNodeBlock_" + TemplateNodeId, "np");
                        }
                        else {
                            for (var i = 0; i < LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes.length; i++) {
                                if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCTextBoxControlConfig" || LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCNumericTextBoxControlConfig" || (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCListViewControlConfig" && LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig")) {
                                    var _oDOM = new DOM();
                                    _oDOM.Enable(LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                }
                                else if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCSignaturePadControlConfig") {
                                    var _oAnswerMode = new LVDefaultSignatutePadControl();
                                    _oAnswerMode.Enable(LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                }

                                var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                                _oLVDefaultAnswerModeComponent.UpdateMandatoryInfoCurrentStatus(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);

                                var _oLVDefaultActualTimeComponent = new LVDefaultActualTimeComponent();
                                _oLVDefaultActualTimeComponent.Enable(TemplateNodeId);
                                var _oDOM = new DOM();
                                _oDOM.RemoveClass("TemplateNodeBlock_" + TemplateNodeId, "np");
                            }
                        }
                    }

                    OneViewConsole.Debug("UpdateModel End", "LVDefaultNAComponent.UpdateModel");
                }
                catch (Excep) {                 
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.UpdateModel", Excep);
                }
            }

            var SetColor = function (TemplateNodeId, DOMObj) {

                try {
                    OneViewConsole.Debug("SetColor Start", "LVDefaultNAComponent.SetColor");

                    if (DOMObj != null) {
                        var _oDOM = new DOM();

                        if (LVTemplateResult[TemplateNodeId].IsBlocker) {
                            _oDOM.RemoveClassByObj(DOMObj, "active");
                        }
                        else {
                            _oDOM.AddClassByObj(DOMObj, "active");
                        }
                    }

                    OneViewConsole.Debug("SetColor End", "LVDefaultNAComponent.SetColor");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.SetColor", Excep);
                }
            }

            var LoadDCBlockerTemplateModel = function (DCBlockerConfig, ControlId) {

                try {                    
                    if (LVIsEdit == true && LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId] == undefined) {

                        var DcResultDetailsQuery = "SELECT ClientGuid FROM DcResultDetailsEntity WHERE AttributeNodeId = '" + DCBlockerConfig.TemplateNodeId + "' AND DataResultsId = " + LVDcResultsId;
                        var DcResultDetailsResult = window.OneViewSqlite.excecuteSqlReader(DcResultDetailsQuery);
                        DcResultDetailsResult = JSON.parse(DcResultDetailsResult);

                        //alert(JSON.stringify(DcResultDetailsResult));

                        if (DcResultDetailsResult.length > 0) {

                            var DCBlockerQuery = "SELECT Id,ServerId,DCBlockerDataCaptureClientGuid,IsDisable FROM DCBlockerInfoEntity WHERE DcResultDetailsClientGuid = '" + DcResultDetailsResult[0].ClientGuid + "'";
                            var DCBlockerResult = window.OneViewSqlite.excecuteSqlReader(DCBlockerQuery);
                            DCBlockerResult = JSON.parse(DCBlockerResult);

                            //alert(JSON.stringify(DCBlockerResult));

                            if (DCBlockerResult.length > 0) {

                                var DataCaptureQuery = "SELECT Id,ClientGuid FROM DataCaptureEntity WHERE ClientGuid = '" + DCBlockerResult[0].DCBlockerDataCaptureClientGuid + "'";
                                var DataCaptureResult = window.OneViewSqlite.excecuteSqlReader(DataCaptureQuery);
                                DataCaptureResult = JSON.parse(DataCaptureResult);

                                //alert(JSON.stringify(DataCaptureResult));
                                LoadTemplateResult(DataCaptureResult[0].Id, DataCaptureResult[0].ClientGuid, DCBlockerResult[0].Id, DCBlockerResult[0].ServerId, DCBlockerResult[0].IsDisable, OneViewSessionStorage.Get("LoginUserId"), AnswerModeLoadType, DCBlockerConfig, ControlId);
                            }
                        }
                    }
                }
                catch(Excep){
                    throw oOneViewExceptionHandler.Create("Framework", "LVDCBlockerPageComponent.Load", Excep);
                }
            }

            var GetTemplateNodes = function (TemplateNodeId, ControlId, TemplateNodes, DCBlockerTemplateId) {

                try {
                    OneViewConsole.Debug("GetTemplateNodes Start", "LVPageComponent.GetTemplateNodes");

                    var TemplateNodesHtml = "";

                    var oAttributeComponent = oLVFactory.GetAttributeComponent(MyInstance.AttributeComponentKey);                  
                    var oAnswerModeComponent = new LVDefaultDCBlockerAnswerModeComponent();

                    for (var itrTemplateNode = 0; itrTemplateNode < TemplateNodes.length; itrTemplateNode++) {

                        if (TemplateNodes[itrTemplateNode] != undefined) {
                            
                            var AttributeHtml = "";
                            var ImageHtml = "";
                            var AnswerModeHtml = "";                          
                            var NAHtml = "";

                            if (TemplateNodes[itrTemplateNode].IsAttributeGroup == false) {

                                AttributeHtml = oAttributeComponent.GetHtml(TemplateNodes[itrTemplateNode]);
                                ImageHtml = oAttributeComponent.GetImageHtml();

                                AnswerModeHtml = oAnswerModeComponent.GetHtml(TemplateNodes[itrTemplateNode], TemplateNodeId, ControlId, DCBlockerTemplateId);
                            }                           
                            if (TemplateNodes[itrTemplateNode].IsAttributeGroup == false) {
                                TemplateNodesHtml += MakeAttributeBlock(ImageHtml, AttributeHtml, NAHtml, AnswerModeHtml, TemplateNodes[itrTemplateNode].Id, TemplateNodes[itrTemplateNode].AnswerModes[0].ControlId, TemplateNodes[itrTemplateNode].Name);
                            }                            
                        }
                        else {
                            break;
                        }
                    }

                    OneViewConsole.Debug("GetTemplateNodes End", "LVPageComponent.GetTemplateNodes");
                   
                    return TemplateNodesHtml;
                }
                catch (Excep) {                 
                    throw Excep;
                }
            }

            var MakeAttributeBlock = function (ImageHtml, AttributeHtml, NAHtml, AnswerModeHtml, TemplateNodeId, ControlId, AttributeName) {

                try {
                    OneViewConsole.Debug("MakeAttributeBlock Start", "LVPageComponent.MakeAttributeBlock");

                    var _oLVDefaultHelpDocumentComponent = new LVDefaultHelpDocumentComponent();
                    var IsExist = _oLVDefaultHelpDocumentComponent.IsExist(TemplateNodeId);

                    var InfoHtml = (IsExist == true) ? '<a class="button button-clear info" onclick="ShowHelpDocument(' + TemplateNodeId + ')"><i class="icon icon-info-circle"></i></a>' : '';

                    var FirstControlId = "'" + ControlId + "'";
                    var Style = (LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVFormattedTemplateMetadata[TemplateNodeId].DefaultHide != undefined && LVFormattedTemplateMetadata[TemplateNodeId].DefaultHide == true) ? "display: none;" : "";

                    var AttributeBlokHtml = '<div style="' + Style + '" class="item attribute item-button-l" id="TemplateNodeBlock_' + TemplateNodeId + '">' +
                                                NAHtml +
                                                AttributeHtml +                                             
                                                InfoHtml +
                                                AnswerModeHtml +                                          
                                            '</div>';

                    //alert(AttributeBlokHtml);

                    OneViewConsole.Debug("MakeAttributeBlock End", "LVPageComponent.MakeAttributeBlock");

                    return AttributeBlokHtml;
                }
                catch (Excep) {
                    throw Excep;
                }
            }

            var LoadTemplateResult = function (DcId, DcClientGuid, DCBlockerDataCaptureId, DCBlockerDataCaptureServerId, IsDCBlockerDisable, DcUserId, AnswerModeLoadType, DCBlockerConfig, ControlId) {

                try {
                    OneViewConsole.Debug("LoadTemplateResult Start", "LVDataCaptureBO.LoadTemplateResult");

                    var _oDcDAO = new DcDAO();
                    var Dc = _oDcDAO.GetDCById(DcId);
                    
                    var DcResultDetailsForDcUser = {};
                    for (var i = 0; i < Dc.DcResultsEntitylist.length; i++) {

                        if (Dc.DcResultsEntitylist[i].SystemUserId == DcUserId) {

                            for (var j = 0; j < Dc.DcResultsEntitylist[i].DcResultDetailsEntityList.length; j++) {

                                var DcResultsDetails = Dc.DcResultsEntitylist[i].DcResultDetailsEntityList[j];
                                DcResultDetailsForDcUser[DcResultsDetails.ControlId] = { "ClientId": DcResultsDetails.Id, "ServerId": DcResultsDetails.ServerId };
                            }
                        }
                    }

                    var result = new DcDAO().GetDCResultDetailsByDCIdForLV(DcId);
                    var DcResultDetails = GetDCByDCId(result);
                    //alert(JSON.stringify(DcResultDetails));
                    
                    if (LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId] == undefined) {
                        LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId] = {
                            "DataCaptureClientId": DcId,
                            "DataCaptureClientGuid": DcClientGuid,
                            "LVTemplateResult": {},
                            "DCBlockerInfoClientId": DCBlockerDataCaptureId,
                            "DCBlockerInfoServerId": DCBlockerDataCaptureServerId,
                            "DCBlockerTemplateId": DCBlockerConfig.TemplateId,
                            "DCBlockerTemplateNodeId": DCBlockerConfig.TemplateNodeId,
                            "DCBlockerControlId": ControlId,
                            "IsDisable": (IsDCBlockerDisable == "true") ? true : false
                        };
                    }

                    for (var i = 0; i < DcResultDetails.length; i++) {

                        var oAttribute = DcResultDetails[i];
                      
                        LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult[oAttribute.AttributeNodeId] = {
                            IsAttributeGroup: false,
                            NA: false,
                            IsBlocker: false,
                            Comments: "",
                            Id: oAttribute.AttributeNodeId,
                            Name: oAttribute.AttributeNodeName,
                            Answers: [],
                            ESTTime: 0,
                            ActualTime: 0,
                            IsManualESTEnabled: true,
                            MultiMediaSubElements: [],
                            ActionInfo: { ActionClientId: "", DCNCMappingClientId: "", Actions: {} }
                        }

                        for (var j = 0; j < oAttribute.Controls.length; j++) {

                            var oControl = oAttribute.Controls[j];
                            var oFinalAnswer = GetFinalAnswerToShow(oControl.Answers, AnswerModeLoadType, DcUserId);

                            var ServerId = "";
                            var ClientId = "";

                            if (oFinalAnswer != null) {

                                if (oFinalAnswer.AnswerMode == "") {
                                    ServerId = oFinalAnswer.ServerId;
                                    ClientId = oFinalAnswer.ClientId;
                                }
                                else {
                                    var oCurrentUserAnswer = DcResultDetailsForDcUser[oFinalAnswer.ControlId];

                                    if (oCurrentUserAnswer != undefined) {
                                        ServerId = oCurrentUserAnswer.ServerId;
                                        ClientId = oCurrentUserAnswer.ClientId;
                                    }
                                }

                                //alert(JSON.stringify(oFinalAnswer));

                                var Answer = {
                                    "ServerId": ServerId,
                                    "ClientId": ClientId,
                                    "ClientGuid": oFinalAnswer.ClientGuid,
                                    "Comments": oFinalAnswer.Comments,
                                    "ControlId": oFinalAnswer.ControlId,
                                    "Answer": oFinalAnswer.Answer,
                                    "AnswerValue": oFinalAnswer.AnswerValue,
                                    "AnswerFKType": oFinalAnswer.AnswerFKType,
                                    "AnswerDataType": oFinalAnswer.AnswerDataType,
                                    "AnswerMode": oFinalAnswer.AnswerMode,
                                    "IsModified": false,
                                    "IsManual": (oFinalAnswer.IsManual == 'true') ? true : false,
                                    "IsDynamicAttribute": (oFinalAnswer.IsDynamicAttribute == 'true') ? true : false,
                                    "IsDynamicAnswer": (oFinalAnswer.IsDynamicAnswer == 'true') ? true : false,
                                    "IndexId": oFinalAnswer.IndexId,
                                    "IsMulti": (oFinalAnswer.IsMulti == 'true') ? true : false,
                                    "AutomaticDeviceId": oFinalAnswer.AutomaticDeviceId,
                                    "Score": oFinalAnswer.Score,
                                    "MaxScore": oFinalAnswer.MaxScore,
                                    "Percentage": oFinalAnswer.Percentage,
                                    "CompletedChildCount": oFinalAnswer.CompletedChildCount,
                                    "TotalChildCount": oFinalAnswer.TotalChildCount,
                                    "CompletedAttributeCount": oFinalAnswer.CompletedAttributeCount,
                                    "TotalAttributeCount": oFinalAnswer.TotalAttributeCount
                                }
                                
                                LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult[oAttribute.AttributeNodeId].Comments = oFinalAnswer.Comments;
                                LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult[oAttribute.AttributeNodeId].NA = (oFinalAnswer.IsNA == 'true') ? true : false,
                                LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult[oAttribute.AttributeNodeId].IsBlocker = (oFinalAnswer.IsBlocker == 'true') ? true : false,
                                LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult[oAttribute.AttributeNodeId].IsAttributeGroup = (oFinalAnswer.IsAttributeGroup == 'true') ? true : false;
                                LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult[oAttribute.AttributeNodeId].ESTTime = oFinalAnswer.ESTTime;
                                LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult[oAttribute.AttributeNodeId].ActualTime = oFinalAnswer.ActualTime;
                                LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult[oAttribute.AttributeNodeId].IsManualESTEnabled = (oFinalAnswer.IsManualESTEnabled == 'true') ? true : false;                                
                                LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult[oAttribute.AttributeNodeId].Answers.push(Answer);

                                //alert(JSON.stringify(LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult[oAttribute.AttributeNodeId]));
                            }                           
                        }
                    }


                    //alert(JSON.stringify(LVDCBlockerTemplateResult[DCBlockerConfig.TemplateNodeId].LVTemplateResult));

                    OneViewConsole.Debug("LoadTemplateResult End", "LVDataCaptureBO.LoadTemplateResult");
                   
                }
                catch (Excep) {
                    alert(Excep);
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.LoadTemplateResult", Excep);
                }
            }

            var GetDCByDCId = function (result) {

                try {
                    OneViewConsole.Debug("GetDCByDCId Start", "LVDataCaptureBO.GetDCByDCId");

                    if (result.length != 0) {
                        var DataCaptureId = result[0].DataCaptureId;
                        var i = 0;
                        var totalLength = result.length;
                        var AttributeNodeId = result[i].AttributeNodeId;
                        var AttributeNodeName = result[i].AttributeNodeName;
                        var FormatedAttributeAnswerDetails = [];
                        var DcResultDetails = [];

                        //Iterate the wrt Node
                        while (true) {
                            if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId) {

                                var FormatedControlAnswerDetails = [];
                                //{2(ControlId): [ { 'SystemUserId': 1, 'Answer': '1', 'AnswerValue': 'Chicken', 'LastUpdatedDate': '10/5/2012' },{ 'SystemUserId': 2, 'Answer': '2', 'AnswerValue': 'Chicken65', 'LastUpdatedDate': '11/5/2012' } ] }
                                var ControlId = result[i].ControlId;
                                while (true) {

                                    if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId && ControlId == result[i].ControlId) {

                                        var anwerArray = result[i];

                                        var AnwerDetails = {
                                            "SystemUserId": anwerArray.SystemUserId,
                                            "ServerId": anwerArray.ServerId,
                                            "ClientId": anwerArray.DcResultDetailsId,
                                            "ClientGuid": anwerArray.ClientGuid,
                                            "Comments": anwerArray.Comments,
                                            "ControlId": anwerArray.ControlId,
                                            "Answer": anwerArray.Answer,
                                            "AnswerValue": anwerArray.AnswerValue,
                                            "AnswerFKType": anwerArray.AnswerFKType,
                                            "AnswerDataType": anwerArray.AnswerDataType,
                                            "AnswerMode": anwerArray.AnswerMode,
                                            "IsManual": anwerArray.IsManual,
                                            "IsDynamicAttribute": anwerArray.IsDynamicAttribute,
                                            "IsDynamicAnswer": anwerArray.IsDynamicAnswer,
                                            "IndexId": anwerArray.IndexId,
                                            "IsMulti": anwerArray.IsMulti,
                                            "AutomaticDeviceId": anwerArray.AutomaticDeviceId,
                                            "LastUpdatedDate": anwerArray.LastUpdatedDate,
                                            "IsAttributeGroup": anwerArray.IsAttributeGroup,
                                            "Score": anwerArray.Score,
                                            "MaxScore": anwerArray.MaxScore,
                                            "Percentage": anwerArray.Percentage,
                                            "CompletedChildCount": anwerArray.CompletedChildCount,
                                            "TotalChildCount": anwerArray.TotalChildCount,
                                            "CompletedAttributeCount": anwerArray.CompletedAttributeCount,
                                            "TotalAttributeCount": anwerArray.TotalAttributeCount,
                                            "IsNA": anwerArray.IsNA,
                                            "IsBlocker": anwerArray.IsBlocker,
                                            "ESTTime": anwerArray.ESTTime,
                                            "ActualTime": anwerArray.ActualTime,
                                            "IsManualESTEnabled": anwerArray.IsManualESTEnabled                                           
                                        };

                                        FormatedControlAnswerDetails.push(AnwerDetails);
                                        i = i + 1;
                                    }
                                    else {
                                        FormatedAttributeAnswerDetails.push({ "ControlId": ControlId, "Answers": FormatedControlAnswerDetails });
                                        break;
                                    }
                                }
                            }
                            else {
                                DcResultDetails.push({ "AttributeNodeId": AttributeNodeId, "AttributeNodeName": AttributeNodeName, "Controls": FormatedAttributeAnswerDetails });
                                FormatedAttributeAnswerDetails = [];
                                if (i < totalLength) {
                                    AttributeNodeId = result[i].AttributeNodeId;
                                    AttributeNodeName = result[i].AttributeNodeName;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }

                    OneViewConsole.Debug("GetDCByDCId End", "LVDataCaptureBO.GetDCByDCId");

                    return DcResultDetails;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDCByDCId", Excep);
                }
                finally {
                    result = null;
                    DataCaptureId = null;
                    DcResultDetails = null;
                    i = null;
                    totalLength = null;
                    AttributeNodeId = null;
                    FormatedAttributeAnswerDetails = null;
                    FormatedControlAnswerDetails = null;
                    ControlId = null;
                    anwerArray = null;
                    AnwerDetails = null;
                }
            }

            var GetFinalAnswerToShow = function (AnswerLst, AnswerModeLoadType, UserId) {
                try {
                    OneViewConsole.Debug("FinalAnswer Start", "LVDataCaptureBO.FinalAnswer");

                    var FinalAnswer = null;

                    if (AnswerModeLoadType == 1) {
                        FinalAnswer = GetLastUpdatedAnswer(AnswerLst);
                    }
                    else if (AnswerModeLoadType == 2) {
                        FinalAnswer = GetAnswerByUserId(AnswerLst, UserId);
                    }
                    else if (AnswerModeLoadType == 3) {
                        FinalAnswer = GetMostCommonAnswer(AnswerLst);
                    }
                    else {
                        alert("AnswerModeLoadType = " + AnswerModeLoadType + " Not implemented exception, LVDataCaptureBO.FinalAnswer");
                    }

                    OneViewConsole.Debug("FinalAnswer End", "LVDataCaptureBO.FinalAnswer");

                    return FinalAnswer;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.FinalAnswer", Excep);
                }
                finally {
                }
            }

            var SetDcComments = function (DcResultsEntitylist, AnswerModeLoadType, DcUserId) {
                try {
                    OneViewConsole.Debug("SetDcComments Start", "LVDataCaptureBO.SetDcComments");

                    var DcResult = GetFinalAnswerToShow(DcResultsEntitylist, AnswerModeLoadType, DcUserId);

                    new LVShiftHandler().SetAndSaveShift(DcResult.ShiftId, DcResult.ShiftName);

                    LVDCSummary.CommentsInfo.Comments = DcResult.Comments;

                    OneViewConsole.Debug("SetDcComments End", "LVDataCaptureBO.SetDcComments");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.SetDcComments", Excep);
                }
                finally {
                }
            }

            var GetLastUpdatedAnswer = function (AnswerLst) {
                try {
                    OneViewConsole.Debug("GetLastUpdatedAnswer Start", "LVDataCaptureBO.GetLastUpdatedAnswer");

                    var AnswerObj = AnswerLst[0];

                    var _DateTime = new DateTime();
                    var LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[0].LastUpdatedDate);

                    if (AnswerLst.length > 1) {
                        for (var i = 0; i < AnswerLst.length; i++) {
                            if (LastUpdatedDate < _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate)) {
                                LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate);
                                AnswerObj = AnswerLst[i];
                            }
                        }
                    }

                    OneViewConsole.Debug("GetLastUpdatedAnswer End", "LVDataCaptureBO.GetLastUpdatedAnswer");

                    return AnswerObj;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetLastUpdatedAnswer", Excep);
                }
                finally {
                    AnswerObj = null;
                    LastUpdatedDate = null;
                }
            }

            var GetAnswerByUserId = function (AnswerLst, UserId) {
                try {
                    OneViewConsole.Debug("GetAnswerByUserId Start", "LVDataCaptureBO.GetAnswerByUserId");

                    alert("Answer By UserId Not implemented exception, LVDataCaptureBO.GetAnswerByUserId");

                    OneViewConsole.Debug("GetAnswerByUserId End", "LVDataCaptureBO.GetAnswerByUserId");

                    return null;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetAnswerByUserId", Excep);
                }
                finally {
                }
            }

            var GetMostCommonAnswer = function (AnswerLst) {
                try {
                    OneViewConsole.Debug("GetMostCommonAnswer Start", "LVDataCaptureBO.GetMostCommonAnswer");

                    alert("Most Common Answer Not implemented exception, LVDataCaptureBO.GetMostCommonAnswer");

                    OneViewConsole.Debug("GetMostCommonAnswer End", "LVDataCaptureBO.GetMostCommonAnswer");

                    return null;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetMostCommonAnswer", Excep);
                }
                finally {
                }
            }
        }

        // LVDefaultAnswerModeComponent
        function LVDefaultDCBlockerAnswerModeComponent() {

            this.LVDefaultDefaultValueComponentKey = "LVDefaultDefaultValueComponent";
            this.LVDefaultTextBoxControlKey = "LVDefaultTextBoxControl";
            this.LVDefaultBandControlKey = "LVDefaultBandControl";
            this.LVDefaultScoringLogicComponentKey = "LVDefaultScoringLogicComponent";

            var oLVFactory = new LVFactory();

            this.GetHtml = function (TemplateNode, DCBlockerTemplateNodeId, DCBlockerControlId, DCBlockerTemplateId) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultAnswerModeComponent.GetHtml");

                    var AnswerModesHtml = "";

                    for (var i = 0; i < TemplateNode.AnswerModes.length; i++) {

                        var Answerlst = [];
                        var AnswerModeType = TemplateNode.AnswerModes[i].Type;
                        var oAnswerMode = null;
                        var Answer = "";
                        var AnswerValue = "";

                        if (AnswerModeType == "DCListViewControlConfig") {
                            Answerlst.push({ "Answer": Answer, "AnswerValue": AnswerValue });
                        }

                        var AnswerDataType = TemplateNode.AnswerModes[i].DataType;
                        var AnswerFKType = TemplateNode.AnswerModes[i].FKType;

                        var ControlId = TemplateNode.AnswerModes[i].ControlId;

                        if (LVDCBlockerTemplateResult[DCBlockerTemplateNodeId] != undefined && LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNode.Id] != undefined) {

                            if (AnswerModeType == "DCListViewControlConfig") {
                                Answerlst = [];
                                for (var j = 0; j < LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNode.Id].Answers.length; j++) {
                                    if (LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNode.Id].Answers[j].ControlId == ControlId) {
                                        Answerlst.push({ "Answer": LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNode.Id].Answers[j].Answer, "AnswerValue": LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNode.Id].Answers[j].AnswerValue });
                                    }
                                }
                            }
                            else {
                                for (var j = 0; j < LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNode.Id].Answers.length; j++) {
                                    if (LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNode.Id].Answers[j].ControlId == ControlId) {
                                        Answer = LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNode.Id].Answers[j].Answer;
                                        AnswerValue = LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNode.Id].Answers[j].AnswerValue;
                                    }
                                }
                            }
                        }
                        
                        CreateModel(DCBlockerTemplateNodeId, DCBlockerControlId, DCBlockerTemplateId, TemplateNode.Id, TemplateNode.Name, TemplateNode.AnswerModes[i].ControlId, Answer, AnswerValue, AnswerFKType, AnswerDataType, AnswerModeType, TemplateNode.ESTTime);

                        if (AnswerModeType == "DCTextBoxControlConfig" || AnswerModeType == "DCNumericTextBoxControlConfig") {
                            oAnswerMode = new LVDefaultDCBlockerTextBoxControl();                            
                        }
                        else if (AnswerModeType == "DCListViewControlConfig") {
                            oAnswerMode = new LVDefaultDCBlockerBandControl();
                        }
                        else if (AnswerModeType == "DCSignaturePadControlConfig") {
                            oAnswerMode = new LVDefaultDCBlockerSignatutePadControl();
                        }

                        if (AnswerModeType == "DCListViewControlConfig") {
                            AnswerModesHtml += (TemplateNode.AnswerModes[i].LabelKey != undefined && TemplateNode.AnswerModes[i].LabelKey != null) ? '<div>' + TemplateNode.AnswerModes[i].LabelKey + '</div>' : "";                          
                            AnswerModesHtml += oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answerlst);
                        }
                        else if (AnswerModeType == "DCSignaturePadControlConfig") {
                            AnswerModesHtml += oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answer, AnswerValue);
                        }
                        else {                           
                            AnswerModesHtml += oAnswerMode.GetHtml(TemplateNode.Id, TemplateNode.AnswerModes[i], Answer, AnswerValue);
                        }
                    }

                    OneViewConsole.Debug("GetHtml End", "LVDefaultAnswerModeComponent.GetHtml");
                    
                    return AnswerModesHtml;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerModeComponent.GetHtml", Excep);
                }
            }
          
            var CreateModel = function (DCBlockerTemplateNodeId, DCBlockerControlId, DCBlockerTemplateId, TemplateNodeId, TemplateNodeName, ControlId, Answer, AnswerValue, AnswerFKType, AnswerDataType, AnswerMode, ESTTime) {

                try {
                    OneViewConsole.Debug("CreateModel Start", "LVDefaultAnswerModeComponent.CreateModel");

                    var IsNewControl = false;

                    if (LVDCBlockerTemplateResult[DCBlockerTemplateNodeId] == undefined) {
                        LVDCBlockerTemplateResult[DCBlockerTemplateNodeId] = {
                            "DataCaptureClientId": "",
                            "DataCaptureClientGuid": "",
                            "LVTemplateResult": {},
                            "DCBlockerInfoClientId": "",
                            "DCBlockerInfoServerId": 0,
                            "DCBlockerTemplateId": DCBlockerTemplateId,
                            "DCBlockerTemplateNodeId": DCBlockerTemplateNodeId,
                            "DCBlockerControlId": DCBlockerControlId,
                            "IsDisable": false
                        };
                    }

                    if (LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNodeId] == undefined) {
                        LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNodeId] = {
                            IsAttributeGroup: false,
                            NA: false,
                            IsBlocker: false,
                            Comments: "",
                            Id: TemplateNodeId,
                            Name: TemplateNodeName,
                            Answers: [],
                            ESTTime: ESTTime,
                            ActualTime: 0,
                            IsManualESTEnabled: true,
                        }
                        IsNewControl = true;
                    }
                    else {
                        for (var i = 0; i < LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                            if (LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNodeId].Answers[i].ControlId == ControlId) {
                                IsNewControl = false;
                                break;
                            }
                            else {
                                IsNewControl = true;
                            }
                        }
                    }
                    if (IsNewControl == true) {

                        // DC Result Detail Table info
                        var AnswerModeObj = {
                            "ServerId": '',
                            "ClientId": '', // Primary key of the DC Result Detail
                            "ClientGuid": '',
                            "ControlId": ControlId,
                            "Comments": '',
                            "Answer": Answer,
                            "AnswerValue": AnswerValue,
                            "AnswerFKType": AnswerFKType,
                            "AnswerDataType": AnswerDataType,
                            "AnswerMode": AnswerMode,
                            "IsModified": true,
                            "IsManual": true,
                            "IsDynamicAttribute": false,
                            "IsDynamicAnswer": false,
                            "IndexId": 0,
                            "IsMulti": false,
                            "AutomaticDeviceId": "",
                            "Score": 0,
                            "MaxScore": 0,
                            "Percentage": 0,
                            "CompletedChildCount": 0,
                            "TotalChildCount": 0,
                            "CompletedAttributeCount": 0,
                            "TotalAttributeCount": 0,
                            "ActionInfo": {}
                            //"MultiMediaSubElements": [],
                        }

                        LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNodeId].Answers.push(AnswerModeObj);
                        //alert(JSON.stringify(LVDCBlockerTemplateResult[DCBlockerTemplateNodeId].LVTemplateResult[TemplateNodeId]));
                    }

                    OneViewConsole.Debug("CreateModel End", "LVDefaultAnswerModeComponent.CreateModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerModeComponent.CreateModel", Excep);
                }
            }

            this.UpdateAnswerModel = function (TemplateNodeId, ControlId, Answer, AnswerValue, Value) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultAnswerModeComponent.UpdateAnswerModel");

                    AnswerValue = (AnswerValue == undefined) ? "" : AnswerValue;
                    //alert("TemplateNodeId : " + TemplateNodeId + "\n" + "ControlId : " + ControlId + "\n" + "Answer : " + Answer + "\n" + "AnswerValue : " + AnswerValue + "\n" + "LVCurrentAttributeId : " + LVCurrentAttributeId);
                    var AnswersLength = LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers.length;

                    for (var i = 0; i < AnswersLength; i++) {

                        if (LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].ControlId == ControlId) {

                            LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].Answer = Answer;
                            LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].AnswerValue = AnswerValue;
                            LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].IsModified = true;
                           
                            LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].Score = 0;
                            LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].MaxScore = 0;
                            LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].Percentage = 0;
                            LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].CompletedChildCount = 0;
                            LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].TotalChildCount = 0;
                            LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].CompletedAttributeCount = 0;
                            LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId].Answers[i].TotalAttributeCount = 0;
                        }
                    }

                    //alert(JSON.stringify(LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId]));

                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultAnswerModeComponent.UpdateAnswerModel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultAnswerModeComponent.UpdateAnswerModel", LVxlatService);
                }
            }

            this.ClearAnswerModel = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("ClearAnswerModel Start", "LVDefaultAnswerModeComponent.ClearAnswerModel");

                    if (LVDCBlockerTemplateResult[LVCurrentAttributeId] != undefined && LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId] != undefined) {

                        LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Comments = "";

                        for (var i = 0; i < LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers.length; i++) {
                            if (ControlId == undefined || (ControlId != undefined && LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].ControlId == ControlId)) {
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].Answer = "";
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].AnswerValue = "";
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].Comments = "";
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].Score = 0;
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].MaxScore = 0;
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].Percentage = 0;
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].CompletedChildCount = 0;
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].TotalChildCount = 0;
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].CompletedAttributeCount = 0;
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].TotalAttributeCount = 0;
                                LVDCBlockerTemplateResult[LVCurrentAttributeId][TemplateNodeId].Answers[i].IsModified = true;
                            }
                        }
                    }

                    OneViewConsole.Debug("ClearAnswerModel End", "LVDefaultAnswerModeComponent.ClearAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAnswerModeComponent.ClearAnswerModel", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }
        }

        // LVDefaultDCBlockerTextBoxControl
        function LVDefaultDCBlockerTextBoxControl() {

            this.GetHtml = function (TemplateNodeId, AnswerMode, Answer, AnswerValue) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultDCBlockerTextBoxControl.GetHtml");

                    if (AnswerMode != undefined && (AnswerMode.DataType == "DATETIMELOCAL" || AnswerMode.DataType == "DATE" || AnswerMode.DataType == "MONTHYEAR")) {
                        var _oLVDefaultDateTimeFormater = new LVDefaultDateTimeFormater();
                        Answer = _oLVDefaultDateTimeFormater.GetFormatedValueForUI(AnswerMode, Answer);
                    }

                    var AttributeNodeId = "'" + TemplateNodeId + "'";
                    var ControlId = "'" + AnswerMode.ControlId + "'";

                    var InputType = GetInputType(AnswerMode.DataType);

                    var Html = '<div class="row responsive-md"><div class="col">';
                    Html += (AnswerMode.LabelKey != undefined && AnswerMode.LabelKey != null) ? '<div>' + AnswerMode.LabelKey + '</div>' : "";

                    var LVTemplateResult = LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult;
                    
                    if (AnswerMode.Type == "DCNumericTextBoxControlConfig") {
                        Html += '<label>';
                        if (LVTemplateResult != undefined && LVTemplateResult[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA != true) {
                            Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultDCBlockerTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" onblur="new LVDefaultDCBlockerTextBoxControl().OnBlur(' + AttributeNodeId + ',' + ControlId + ',this)" />';
                        }
                        else {
                            Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultDCBlockerTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" onblur="new LVDefaultDCBlockerTextBoxControl().OnBlur(' + AttributeNodeId + ',' + ControlId + ',this)" disabled/>';
                        }
                        Html += '</label>';
                    }
                    else if (AnswerMode.Type == "DCTextBoxControlConfig" && AnswerMode.TextBoxType == 4) {
                        Html += '<label>';
                        if (LVTemplateResult != undefined && LVTemplateResult[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA != true) {
                            Html += '<textarea rows="6" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultDCBlockerTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)">' + Answer + '</textarea>';
                        }
                        else {
                            Html += '<textarea rows="6" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultDCBlockerTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" disabled>' + Answer + '</textarea>';
                        }
                        Html += '</label>';
                    }
                    else if (AnswerMode.Type == "DCTextBoxControlConfig" && (AnswerMode.DataType == "DATETIMELOCAL" || AnswerMode.DataType == "DATE" || AnswerMode.DataType == "MONTHYEAR" || AnswerMode.DataType == "TIME")) {
                        Html += '<div class="field-item with-icon">';
                        Html += '<label>';
                        if (LVTemplateResult != undefined && LVTemplateResult[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA != true) {
                            Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultDCBlockerTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" />';
                        }
                        else {
                            Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultDCBlockerTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" disabled/>';
                        }
                        var Icon = (AnswerMode.DataType == "TIME") ? "clock" : "calendar";
                        Html += '<i class="icon icon-' + Icon + '-o"></i>';
                        Html += '</label>';
                        Html += '</div>';
                    }                 
                    else {
                        Html += '<label>';                       
                        if (LVTemplateResult != undefined && LVTemplateResult[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA != true) {
                            Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultDCBlockerTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" />';
                        }
                        else {
                            Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + AnswerMode.ControlId + '" oninput="new LVDefaultDCBlockerTextBoxControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this)" disabled/>';
                        }
                        Html += '</label>';                    
                    }

                    Html += '</div></div>';

                    OneViewConsole.Debug("GetHtml Start", "LVDefaultDCBlockerTextBoxControl.GetHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultDCBlockerTextBoxControl.GetHtml", Excep);
                }
            }

            var GetInputType = function (DataType) {

                try {
                    OneViewConsole.Debug("GetInputType Start", "LVDefaultTextBoxControl.GetInputType");

                    switch (DataType) {
                        case "STRING": return "text";
                        case "INTEGER": return "tel";
                        case "TIME": return "time";
                        case "DATE": return "date";
                        case "DATETIME": return "datetime";
                        case "DATETIMELOCAL": return "datetime-local";
                        case "MONTHYEAR": return "month";
                        case "PASSWORD": return "password";
                        default: return "text";
                    }

                    OneViewConsole.Debug("GetInputType Start", "LVDefaultTextBoxControl.GetInputType");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultTextBoxControl.GetInputType", Excep);
                }
            }

            this.UpdateAnswerModel = function (TemplateNodeId, ControlId, DOMObj) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultTextBoxControl.UpdateAnswerModel");

                    if (LVDCBlockerTemplateResult[LVCurrentAttributeId] != undefined && LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId] != undefined) {

                        var Answer = DOMObj.value;
                        Answer = RemoveSpecialCharacters(Answer);

                        //alert(LVCurrentDCBlockerTemplateId + "," + TemplateNodeId + "," + ControlId);
                        var ControlConfig = undefined;                        
                        if (LVFormatedDCBlockerTemplateMetadata[LVCurrentDCBlockerTemplateId] != undefined && LVFormatedDCBlockerTemplateMetadata[LVCurrentDCBlockerTemplateId][TemplateNodeId] != undefined) {
                            var ControlConfig = LVFormatedDCBlockerTemplateMetadata[LVCurrentDCBlockerTemplateId][TemplateNodeId][ControlId];
                            //alert(ControlConfig);
                        }
                       
                        if (ControlConfig != undefined && ControlConfig.Type == "DCNumericTextBoxControlConfig") {
                            var _oLVDefaultNumericTextBoxControl = new LVDefaultDCBlockerNumericTextBoxControl();
                            Answer = _oLVDefaultNumericTextBoxControl.Validate(DOMObj);
                        }

                        if (ControlConfig != undefined && (ControlConfig.DataType == "DATETIMELOCAL" || ControlConfig.DataType == "DATE" || ControlConfig.DataType == "MONTHYEAR")) {
                            var _oLVDefaultDateTimeFormater = new LVDefaultDateTimeFormater();
                            Answer = _oLVDefaultDateTimeFormater.GetFormatedValue(ControlConfig, DOMObj);
                        }

                        var _oLVDefaultAnswerModeComponent = new LVDefaultDCBlockerAnswerModeComponent();
                        _oLVDefaultAnswerModeComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, "");
                    }

                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultTextBoxControl.UpdateAnswerModel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultTextBoxControl.UpdateAnswerModel", LVxlatService);
                }
            }

            this.OnBlur = function (TemplateNodeId, ControlId, DOMObj) {

                try {
                    OneViewConsole.Debug("OnBlur Start", "LVDefaultTextBoxControl.OnBlur");

                    //var IsSuccess = true;
                    //var ControlConfig = LVFormattedTemplateMetadata[TemplateNodeId][ControlId];

                    //if (ControlConfig.Type = "DCNumericTextBoxControlConfig") {
                    //    var _oLVDefaultNumericTextBoxControl = new LVDefaultNumericTextBoxControl();
                    //    IsSuccess = _oLVDefaultNumericTextBoxControl.OnBlur(ControlConfig, DOMObj);
                    //}

                    OneViewConsole.Debug("OnBlur End", "LVDefaultTextBoxControl.OnBlur");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultTextBoxControl.OnBlur", LVxlatService);
                }
            }

            this.Set = function (Id, Value) {

                try {
                    OneViewConsole.Debug("Set Start", "LVDefaultTextBoxControl.Set");

                    var _oDOM = new DOM();
                    _oDOM.SetValue(Id, Value);

                    OneViewConsole.Debug("Set End", "LVDefaultTextBoxControl.Set");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultTextBoxControl.Set", LVxlatService);
                }
            }

            this.Get = function (Id) {

                try {
                    OneViewConsole.Debug("Set Start", "LVDefaultTextBoxControl.Set");

                    var _oDOM = new DOM();

                    var Value = "";
                    Value = _oDOM.GetValue();

                    OneViewConsole.Debug("Set End", "LVDefaultTextBoxControl.Set");

                    return Value;
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultTextBoxControl.Set", LVxlatService);
                }
            }

            this.ClearAnswerModel = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("ClearAnswerModel Start", "LVDefaultTextBoxControl.ClearAnswerModel");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);
                    var _oDOM = new DOM();
                    _oDOM.Clear(ControlId);
                    _oDOM.Disable(ControlId);

                    var _oLVDefaultAnswerModeComponent = new LVDefaultDCBlockerAnswerModeComponent();
                    _oLVDefaultAnswerModeComponent.ClearAnswerModel(TemplateNodeId, ControlId);

                    OneViewConsole.Debug("ClearAnswerModel End", "LVDefaultTextBoxControl.ClearAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultTextBoxControl.ClearAnswerModel", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            this.Clear = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("Clear Start", "LVDefaultTextBoxControl.Clear");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);
                    var _oDOM = new DOM();
                    _oDOM.Clear(ControlId);

                    OneViewConsole.Debug("Clear End", "LVDefaultTextBoxControl.Clear");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultTextBoxControl.Clear", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            var RemoveSpecialCharacters = function (Value) {
                try {
                    if (Value != undefined && Value != null && Value != '' && typeof (Value) == 'string') {
                        Value = Value.replace(/[^-_<>@:()^,&/| 0-9 .a-zA-Z]/g, ' ');
                        //Value = Value.replace(/\s/g, "");
                        //Value = Value.trim();
                    }
                    return Value;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultTextBoxControl.RemoveSpecialCharacters", Excep);
                }
                finally {
                }
            }
        }

        // LVDefaultDCBlockerTextBoxControl
        function LVDefaultDCBlockerSignatutePadControl() {

            this.GetHtml = function (TemplateNodeId, AnswerMode, Answer, AnswerValue) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultDCBlockerSignatutePadControl.GetHtml");
                   
                    var AttributeNodeId = "'" + TemplateNodeId + "'";
                    var ControlId = "'" + AnswerMode.ControlId + "'";

                    var Html = '<div class="row responsive-md"><div class="col">';
                    Html += (AnswerMode.LabelKey != undefined && AnswerMode.LabelKey != null) ? '<div>' + AnswerMode.LabelKey + '</div>' : "";

                    var LVTemplateResult = LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult;

                    Html += '<div id="' + AnswerMode.ControlId + '" class="inline-sign" style="width: 50%;">' +
                                         '<canvas style="width: 100%; height: 200px; margin: 0px auto;"></canvas>' +
                                     '</div>' +
                                     '<div class="row responsive-md" style="width: 50%;">' +
                                        '<div class="col"><div class="button-bar"><button class="button" onclick="new LVDefaultDCBlockerSignatutePadControl().Clear(' + AttributeNodeId + ',' + ControlId + ')">Clear</button><button class="button" onclick="new LVDefaultDCBlockerSignatutePadControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ')">Save</button></div></div>' +
                                     '</div>';
                    if (AnswerMode.Type == "DCSignaturePadControlConfig" && SignatutePadIds.indexOf(AnswerMode.ControlId) == -1) {
                        SignatutePadInfo.push({ "TemplateNodeId": TemplateNodeId, "ControlId": AnswerMode.ControlId });
                        SignatutePadIds.push(AnswerMode.ControlId);
                        //alert(JSON.stringify(SignatutePadIds));
                    }

                    Html += '</div></div>';
                    
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultDCBlockerSignatutePadControl.GetHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultDCBlockerSignatutePadControl.GetHtml", Excep);
                }
            }

            this.UpdateAnswerModel = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultTextBoxControl.UpdateAnswerModel");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);

                    Answer = "";

                    if (SignatutePadObjects[ControlId] != undefined) {
                        Answer = SignatutePadObjects[ControlId].toDataURL();
                        if (SignatutePadObjects[ControlId].isEmpty() == true) {
                            alert("MN-RQ-NAF-001 :: Please provide signature first.");
                        }
                        else {
                            alert("MN-RQ-NAF-001 :: Signature saved successfully");
                        }
                    }
                   
                    var _oLVDefaultAnswerModeComponent = new LVDefaultDCBlockerAnswerModeComponent();
                    _oLVDefaultAnswerModeComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, "");
                    
                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultTextBoxControl.UpdateAnswerModel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultTextBoxControl.UpdateAnswerModel", LVxlatService);
                }
            }

            this.Clear = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("Clear Start", "LVDefaultTextBoxControl.Clear");
                   
                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);

                    if (SignatutePadObjects[ControlId] != undefined) {
                        SignatutePadObjects[ControlId].clear();
                    }

                    OneViewConsole.Debug("Clear End", "LVDefaultTextBoxControl.Clear");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultTextBoxControl.Clear", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }         
        }

        // LVDefaultDCBlockerNumericTextBoxControl
        function LVDefaultDCBlockerNumericTextBoxControl() {

            var MyInstance = this;

            this.DefaultJavaScriptAlert = "DefaultJavaScriptAlert";
            this.LVDefaultNotificationComponentKey = "LVDefaultNotificationComponent";

            this.Validate = function (DOMObj) {

                try {
                    OneViewConsole.Debug("Validate Start", "LVDefaultNumericTextBoxControl.Validate");

                    var IsSuccess = true;

                    var value = DOMObj.value;
                    value = value.replace(/\s/g, '');
                    value = value.replace(/[^ 0-9]/g, '');
                    value = value.trim();

                    DOMObj.value = value;

                    return value;

                    OneViewConsole.Debug("Validate End", "LVDefaultNumericTextBoxControl.Validate");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.Validate", LVxlatService);
                }
            }

            this.OnBlur = function (ControlConfig, DOMObj) {

                try {
                    OneViewConsole.Debug("OnBlur Start", "LVDefaultNumericTextBoxControl.OnBlur");

                    var _oLVFactory = new LVFactory();
                    var _oNotificationComponent = _oLVFactory.GetNotificationComponent(MyInstance.LVDefaultNotificationComponentKey);

                    var oResponse = MinMaxValidate(ControlConfig, DOMObj);
                    if (oResponse.IsSuccess == false) {
                        ClearByObj(DOMObj);
                        SetFocusByObj(DOMObj);
                        _oNotificationComponent.Notify(oResponse.Msg, MyInstance.DefaultJavaScriptAlert);
                    }

                    OneViewConsole.Debug("OnBlur End", "LVDefaultNumericTextBoxControl.OnBlur");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.OnBlur", LVxlatService);
                }
            }

            var ClearByObj = function (DOMObj) {

                try {
                    OneViewConsole.Debug("Clear Start", "LVDefaultNumericTextBoxControl.Clear");

                    var _oDOM = new DOM();
                    _oDOM.ClearByObj(DOMObj);

                    OneViewConsole.Debug("Clear End", "LVDefaultNumericTextBoxControl.Clear");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.Clear", LVxlatService);
                }
            }

            var SetFocusByObj = function (DOMObj) {

                try {
                    OneViewConsole.Debug("SetFocusByObj Start", "LVDefaultNumericTextBoxControl.SetFocusByObj");

                    var _oDOM = new DOM();
                    _oDOM.SetFocusByObj(DOMObj);

                    OneViewConsole.Debug("SetFocusByObj End", "LVDefaultNumericTextBoxControl.SetFocusByObj");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.SetFocusByObj", LVxlatService);
                }
            }

            var MinMaxValidate = function (ControlConfig, DOMObj) {

                try {
                    OneViewConsole.Debug("MinMaxValidate Start", "LVDefaultNumericTextBoxControl.MinMaxValidate");

                    var oResponse = { "IsSuccess": true, "Msg": "" };

                    if (DOMObj.value < ControlConfig.MinValue || DOMObj.value > ControlConfig.MaxValue) {
                        oResponse.IsSuccess = false;
                        oResponse.Msg = "Value should be between or equals to " + ControlConfig.MinValue + " and " + ControlConfig.MaxValue;
                    }

                    return oResponse;

                    OneViewConsole.Debug("MinMaxValidate End", "LVDefaultNumericTextBoxControl.MinMaxValidate");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultNumericTextBoxControl.MinMaxValidate", LVxlatService);
                }
            }
        }

        // LVDefaultDCBlockerBandControl
        function LVDefaultDCBlockerBandControl() {

            var MyInstance = this;

            this.RightPanelComponentKey = "LVDefaultRightPanelComponent";

            this.GetHtml = function (TemplateNodeId, AnswerMode, Answerlst) {

                try {
                    OneViewConsole.Debug("GetHtml Start", "LVDefaultBandControl.GetHtml");

                    var Html = "";

                    if (AnswerMode.SelectionType == 0 || AnswerMode.SelectionType == 1) {
                        Html = GetBandHtml(TemplateNodeId, AnswerMode, Answerlst);
                    }
                    else {
                        alert("AnswerMode SelectionType : Not implemented exception (GetHtml in LVDefaultBandControl)");
                    }

                    OneViewConsole.Debug("GetHtml End", "LVDefaultBandControl.GetHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.GetHtml", Excep);
                }
            }

            var GetBandHtml = function (TemplateNodeId, AnswerMode, Answerlst) {

                try {
                    OneViewConsole.Debug("GetBandHtml Start", "LVDefaultBandControl.GetBandHtml");

                    var Html = "";

                    if (AnswerMode.DisplayMode == 0) {
                        Html = GetBandHorizontalHtml(TemplateNodeId, AnswerMode, Answerlst);
                    }
                    else {
                        alert("AnswerMode DisplayMode : Not implemented exception (GetBandHtml in LVDefaultBandControl)");
                    }

                    OneViewConsole.Debug("GetBandHtml End", "LVDefaultBandControl.GetBandHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.GetHtml", Excep);
                }
            }

            var GetBandHorizontalHtml = function (TemplateNodeId, AnswerMode, Answerlst) {

                try {
                    OneViewConsole.Debug("GetBandHorizontalHtml Start", "LVDefaultBandControl.GetBandHorizontalHtml");

                    var _oLVBandDetailsCacheComponent = new LVBandDetailsCacheComponent();
                    var BandDetailsEntityList = _oLVBandDetailsCacheComponent.GetBandDetailsByBandId(AnswerMode.ListViewDataSourceConfig.BandId);

                    var AttributeNodeId = "'" + TemplateNodeId + "'";
                    var ControlId = "'" + AnswerMode.ControlId + "'";
                    var SelectionType = "'" + AnswerMode.SelectionType + "'";

                    var Html = '<div class="row responsive-md">';

                    for (var i = 0; i < BandDetailsEntityList.length; i++) {

                        var BandDetail = BandDetailsEntityList[i];

                        var ColourCode = "'" + BandDetail.ColourCode + "'";
                        var Id = BandDetail.Name + AnswerMode.ControlId;

                        var BandDetailId = "'" + BandDetail.Id + "'";
                        var BandDetailName = "'" + BandDetail.Name + "'";
                        var Value = BandDetail.Value;

                        var TagId = "'" + Id + "'";

                        var Style = "";

                        for (var j = 0; j < Answerlst.length; j++) {
                            if (Answerlst[j].Answer == BandDetail.Id) {
                                Style += 'background-color:' + BandDetail.ColourCode;
                                Style += ';color:white';
                                break;
                            }
                        }
                        Html += '<div class="col"><button class="button button-block" style="' + Style + '" name="' + AnswerMode.ControlId + '" id="' + Id + '" onclick="new LVDefaultDCBlockerBandControl().UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',' + BandDetailId + ',' + BandDetailName + ',' + TagId + ',' + ColourCode + ',' + SelectionType + ',' + Value + ');">' + BandDetail.Name + '</button></div>';
                    }

                    Html += '</div>';

                    OneViewConsole.Debug("GetBandHorizontalHtml End", "LVDefaultBandControl.GetBandHorizontalHtml");

                    return Html;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.GetBandHtml", Excep);
                }
            }

            this.UpdateAnswerModel = function (TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode, SelectionType, Value) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultBandControl.UpdateAnswerModel");

                    if (LVDCBlockerTemplateResult[LVCurrentAttributeId] != undefined && LVDCBlockerTemplateResult[LVCurrentAttributeId].LVTemplateResult[TemplateNodeId] != undefined) {

                        //alert(TemplateNodeId + "," + ControlId + "," + Answer + "," + AnswerValue + "," + TagId + "," + ColourCode);                   

                        if (SelectionType == 0) {
                            SetBandColorForSingleSelection(ControlId, TagId, ColourCode);
                            var _oLVDefaultAnswerModeComponent = new LVDefaultDCBlockerAnswerModeComponent();
                            _oLVDefaultAnswerModeComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, AnswerValue, Value);
                        }
                        //else if (SelectionType == 1) {
                        //    SetBandColorForMultiSelection(ControlId, TagId, ColourCode);
                        //    UpdateAnswerModelForMultiSelectBand(TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode);
                        //}                      
                    }

                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultBandControl.UpdateAnswerModel");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultBandControl.UpdateAnswerModel", LVxlatService);
                }
            }

            this.Set = function (TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode, SelectionType, Value) {

                try {
                    OneViewConsole.Debug("Set Start", "LVDefaultBandControl.Set");

                    MyInstance.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode, SelectionType, Value);

                    OneViewConsole.Debug("Set End", "LVDefaultBandControl.Set");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultBandControl.Set", LVxlatService);
                }
            }

            var UpdateAnswerModelForMultiSelectBand = function (TemplateNodeId, ControlId, Answer, AnswerValue, TagId, ColourCode) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModelForMultiSelectBand Start", "LVDefaultBandControl.UpdateAnswerModelForMultiSelectBand");

                    //alert("TemplateNodeId : " + TemplateNodeId + "\n" + "ControlId : " + ControlId + "\n" + "Answer : " + Answer + "\n" + "AnswerValue : " + AnswerValue);

                    var _AnswerValue = (AnswerValue == undefined) ? "" : AnswerValue;
                    var AnswersLength = LVTemplateResult[TemplateNodeId].Answers.length;

                    if (AnswersLength > 0 && LVTemplateResult[TemplateNodeId].Answers[0].Answer == "") {
                        UpdateAnswerModel(TemplateNodeId, Answer, _AnswerValue, 0);
                        IsNew = false;
                    }
                    else {
                        var IsNew = true;

                        for (var i = 0; i < AnswersLength; i++) {

                            if (LVTemplateResult[TemplateNodeId].Answers[i].ControlId == ControlId && LVTemplateResult[TemplateNodeId].Answers[i].Answer == Answer) {

                                if (LVTemplateResult[TemplateNodeId].Answers.length > 1) {
                                    RemoveAnswerModel(TemplateNodeId, i);
                                }
                                else {
                                    UpdateAnswerModel(TemplateNodeId, "", "", i);
                                }
                                IsNew = false;
                                break;
                            }
                        }

                        if (IsNew == true) {
                            AddNewAnswerModel(TemplateNodeId, ControlId, Answer, _AnswerValue);
                        }
                    }

                    OneViewConsole.Debug("UpdateAnswerModelForMultiSelectBand End", "LVDefaultBandControl.UpdateAnswerModelForMultiSelectBand");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.UpdateAnswerModelForMultiSelectBand", Excep);
                }
                finally {
                    _AnswerValue = null;
                    AnswersLength = null;
                }
            }

            var AddNewAnswerModel = function (TemplateNodeId, ControlId, Answer, AnswerValue) {

                try {
                    OneViewConsole.Debug("AddNewAnswerModel Start", "LVDefaultBandControl.AddNewAnswerModel");

                    LVTemplateResult[TemplateNodeId].Answers.push({
                        "ServerId": '',
                        "ClientId": '',
                        "ControlId": ControlId,
                        "Answer": Answer,
                        "AnswerValue": AnswerValue,
                        "AnswerFKType": LVTemplateResult[TemplateNodeId].Answers[0].AnswerFKType,
                        "AnswerDataType": LVTemplateResult[TemplateNodeId].Answers[0].AnswerDataType,
                        "AnswerMode": LVTemplateResult[TemplateNodeId].Answers[0].AnswerMode,
                        "IsModified": true,
                        "IsManual": true,
                        "IsDynamicAttribute": false,
                        "IsDynamicAnswer": false,
                        "IndexId": 0,
                        "IsMulti": false,
                        "AutomaticDeviceId": "",
                        "Score": 0,
                        "MaxScore": 0,
                        "Percentage": 0,
                        "CompletedChildCount": 0,
                        "TotalChildCount": 0,
                        "CompletedAttributeCount": 0,
                        "TotalAttributeCount": 0
                    });

                    OneViewConsole.Debug("AddNewAnswerModel End", "LVDefaultBandControl.AddNewAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.AddNewAnswerModel", Excep);
                }
            }

            var UpdateAnswerModel = function (TemplateNodeId, Answer, AnswerValue, Index) {

                try {
                    OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultBandControl.UpdateAnswerModel");

                    LVTemplateResult[TemplateNodeId].Answers[Index].Answer = Answer;
                    LVTemplateResult[TemplateNodeId].Answers[Index].AnswerValue = AnswerValue;
                    LVTemplateResult[TemplateNodeId].Answers[i].IsModified = true;

                    OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultBandControl.UpdateAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.UpdateAnswerModel", Excep);
                }
            }

            var RemoveAnswerModel = function (TemplateNodeId, Index) {

                try {
                    OneViewConsole.Debug("RemoveAnswerModel Start", "LVDefaultBandControl.RemoveAnswerModel");

                    LVTemplateResult[TemplateNodeId].Answers.splice(Index, 1);

                    OneViewConsole.Debug("RemoveAnswerModel End", "LVDefaultBandControl.RemoveAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.RemoveAnswerModel", Excep);
                }
            }

            var SetBandColorForSingleSelection = function (ControlId, TagId, ColourCode) {

                try {
                    OneViewConsole.Debug("SetBandColorForSingleSelection Start", "LVDefaultBandControl.SetBandColorForSingleSelection");

                    var CurrentObj = document.getElementById(TagId);
                    if (CurrentObj != null && CurrentObj.style.backgroundColor == "") {
                        ClearAllColors(ControlId);
                        CurrentObj.style.backgroundColor = ColourCode;
                        CurrentObj.style.color = "white";
                    }

                    OneViewConsole.Debug("SetBandColorForSingleSelection End", "LVDefaultBandControl.SetBandColorForSingleSelection");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.SetBandColorForSingleSelection", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            this.ClearAllColors = function (ControlId) {
                try {
                    OneViewConsole.Debug("ClearAllColors Start", "LVDefaultBandControl.ClearAllColors");

                    ClearAllColors(ControlId);

                    OneViewConsole.Debug("ClearAllColors End", "LVDefaultBandControl.ClearAllColors");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.ClearAllColors", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            var ClearAllColors = function (ControlId) {

                try {
                    OneViewConsole.Debug("ClearAllColors Start", "LVDefaultBandControl.ClearAllColors");

                    var AllObj = document.getElementsByName(ControlId);
                    if (AllObj != null) {
                        for (var i = 0; i < AllObj.length; i++) {
                            AllObj[i].style.backgroundColor = "";
                            AllObj[i].style.color = "#444";
                        }
                    }

                    OneViewConsole.Debug("ClearAllColors End", "LVDefaultBandControl.ClearAllColors");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.ClearAllColors", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            this.ClearAnswerModel = function (TemplateNodeId, ControlId) {

                try {
                    OneViewConsole.Debug("ClearAnswerModel Start", "LVDefaultBandControl.ClearAnswerModel");

                    //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);
                    ClearAllColors(ControlId);
                    var _oLVDefaultAnswerModeComponent = new LVDefaultDCBlockerAnswerModeComponent();
                    _oLVDefaultAnswerModeComponent.ClearAnswerModel(TemplateNodeId, ControlId);

                    OneViewConsole.Debug("ClearAnswerModel End", "LVDefaultBandControl.ClearAnswerModel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.ClearAnswerModel", Excep);
                }
                finally {
                    AllObj = null;
                    CurrentObj = null;
                }
            }

            var SetBandColorForMultiSelection = function (ControlId, TagId, ColourCode) {

                try {
                    OneViewConsole.Debug("SetBandColorForMultiSelection Start", "LVDefaultBandControl.SetBandColorForMultiSelection");

                    var CurrentObj = document.getElementById(TagId);
                    if (CurrentObj != null) {

                        if (CurrentObj.style.backgroundColor == "") {
                            CurrentObj.style.backgroundColor = ColourCode;
                            CurrentObj.style.color = "white";
                        }
                        else {
                            CurrentObj.style.backgroundColor = "";
                            CurrentObj.style.color = "#444";
                        }
                    }

                    OneViewConsole.Debug("SetBandColorForMultiSelection End", "LVDefaultBandControl.SetBandColorForMultiSelection");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.SetBandColorForMultiSelection", Excep);
                }
                finally {
                    CurrentObj = null;
                }
            }

            this.SetColor = function (TemplateNodeId, ControlId, Answer) {

                try {
                    OneViewConsole.Debug("Set Start", "LVDefaultBandControl.SetColor");

                    var _oLVBandDetailsCacheComponent = new LVBandDetailsCacheComponent();

                    var BandID = LVFormattedTemplateMetadata[TemplateNodeId][ControlId].ListViewDataSourceConfig.BandId;
                    var BandDetailsEntityList = _oLVBandDetailsCacheComponent.GetBandDetailsByBandId[BandID];

                    for (var i = 0; i < BandDetailsEntityList.length; i++) {
                        if (Answer == BandDetailsEntityList[i].Id) {
                            var TagId = BandDetailsEntityList[i].Name + ControlId;
                            var ColourCode = BandDetailsEntityList[i].ColourCode;
                            SetBandColorForSingleSelection(ControlId, TagId, ColourCode);
                        }
                    }
                    OneViewConsole.Debug("Set End", "LVDefaultBandControl.SetColor");
                }
                catch (Excep) {
                    oOneViewExceptionHandler.Catch(Excep, "LVDefaultBandControl.SetColor", LVxlatService);
                }
            }
        }

        var SignatutePadIds = [];
        var SignatutePadInfo = [];
        var SignatutePadObjects = {};
        
        // LoadSignaturePad
        function LoadSignaturePad(ControlId) {
            //var signaturePad = SignaturePad + "_" + ControlId;
            var wrapper = document.getElementById(ControlId);
           
            if (wrapper != null) {         
                var clearButton = wrapper.querySelector("[data-action=clear]"),
                saveButton = wrapper.querySelector("[data-action=save]"),
                canvas = wrapper.querySelector("canvas"),
                signaturePad;

                // Adjust canvas coordinate space taking into account pixel ratio,
                // to make it look crisp on mobile devices.
                // This also causes canvas to be cleared.
                function resizeCanvas() {
                    var ratio = window.devicePixelRatio || 1;
                    canvas.width = canvas.offsetWidth * ratio;
                    canvas.height = canvas.offsetHeight * ratio;
                    canvas.getContext("2d").scale(ratio, ratio);
                }

                //window.onresize = resizeCanvas;
                resizeCanvas();

                signaturePad = new SignaturePad(canvas);

                SignatutePadObjects[ControlId] = signaturePad;
            }
        }
       
        // LVTemplateHeaderComponent
        function LVTemplateHeaderComponent() {

            var MyInstance = this;

            var oLVFactory = new LVFactory();
            this.AttributeGroupComponentKey = "LVDefaultAttributeGroupComponent";

            /// <summary>
            /// Update
            /// </summary>           
            this.Update = function () {

                try {
                    OneViewConsole.Debug("Update Start", "LVTemplateHeaderComponent.Update");

                    if (LVTemplateConfigMetaData != null) {

                        var oAttributeGroupComponent = oLVFactory.GetAttributeGroupComponent(MyInstance.AttributeGroupComponentKey);
                        var TemplateSummary = oAttributeGroupComponent.GetSummary(LVTemplateConfigMetaData.TemplateConfigMetaDataDetails, true, true);

                        var TemplateSummaryHtml = TemplateSummary.CompletedAttributeCount + "/" + TemplateSummary.TotalAttributeCount;

                        var _oDOM = new DOM();
                        _oDOM.AddInnerHtml("txtTemplateSummary", TemplateSummaryHtml);

                        if (LVBreadCrumbDetails.length > 0 && LVTemplateResult[LVBreadCrumbDetails[LVBreadCrumbDetails.length - 1].AttributeGroupId] != undefined) {

                            var AttributeGroupSummaryHtml = LVBreadCrumbDetails[LVBreadCrumbDetails.length - 1].AttributeGroupName;
                            AttributeGroupSummaryHtml += " : " + LVTemplateResult[LVBreadCrumbDetails[LVBreadCrumbDetails.length - 1].AttributeGroupId].Answers[0].CompletedAttributeCount + "/" + LVTemplateResult[LVBreadCrumbDetails[LVBreadCrumbDetails.length - 1].AttributeGroupId].Answers[0].TotalAttributeCount;

                            _oDOM.AddInnerHtml("txtAttributeGroupSummary", AttributeGroupSummaryHtml);
                        }
                        else {
                            _oDOM.AddInnerHtml("txtAttributeGroupSummary", OneViewSessionStorage.Get("TemplateName") + " : " + TemplateSummaryHtml);
                        }
                    }

                    OneViewConsole.Debug("Update End", "LVTemplateHeaderComponent.Update");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVTemplateHeaderComponent.Update", Excep);
                }
            }
        }
        
        // LVSpecialCharacterValidationComponent
        function LVSpecialCharacterValidationComponent() {

            var MyInstance = this;

            /// <summary>
            /// RemoveSpecialCharacters
            /// </summary>           
            this.RemoveSpecialCharacters = function (Value) {

                try {
                    OneViewConsole.Debug("RemoveSpecialCharacters Start", "LVSpecialCharacterValidationComponent.RemoveSpecialCharacters");

                    if (OneViewGlobalcurrentLanguage == 'en-us') {
                        if (Value != undefined && Value != null && Value != '' && typeof (Value) == 'string') {
                            Value = Value.replace(/[^-_<>@:()^,&/| 0-9 .a-zA-Z]/g, ' ');
                            //Value = Value.replace(/\s/g, "");
                            //Value = Value.trim();
                        }
                    }

                    return Value;

                    OneViewConsole.Debug("RemoveSpecialCharacters End", "LVSpecialCharacterValidationComponent.RemoveSpecialCharacters");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVSpecialCharacterValidationComponent.RemoveSpecialCharacters", Excep);
                }
            }
        }

        // LVBandDetailsCacheComponent
        function LVBandDetailsCacheComponent() {

            var MyInstance = this;

            /// <summary>
            /// Get Band Details By BandId
            /// <param name="BandId">BandId</param>   
            /// <returns>Band Details List</returns> 
            /// </summary>         
            this.GetBandDetailsByBandId = function (BandId) {

                try {
                    OneViewConsole.Debug("GetBandDetailsByBandId Start", "LVBandDetailsCacheComponent.GetBandDetailsByBandId");

                    var IsExist = true;

                    if (LVBandDetailsCacheDict[BandId] == undefined) {

                        var _oBandDetailsMasterDAO = new BandDetailsMasterDAO();
                        var BandDetailsLst = _oBandDetailsMasterDAO.GetBandDetailsByBandId(BandId);

                        for (var i = 0; i < BandDetailsLst.length; i++) {
                            BandDetailsLst[i].Id = BandDetailsLst[i].ServerId;
                        }

                        if (BandDetailsLst.length > 0) {
                            LVBandDetailsCacheDict[BandId] = BandDetailsLst;
                        }
                        else {
                            IsExist = false;
                        }
                    }

                    if (IsExist == true) {
                        return LVBandDetailsCacheDict[BandId];
                    }
                    else {
                        alert("Band details not available for requested BandId " + BandId);
                        return new Array();
                    }
                   
                    OneViewConsole.Debug("GetBandDetailsByBandId End", "LVBandDetailsCacheComponent.GetBandDetailsByBandId");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVBandDetailsCacheComponent.GetBandDetailsByBandId", Excep);
                }
            }
        }

        // LVDcTimeComponent
        function LVDcTimeComponent() {

            var MyInstance = this;

            this.GetDcTimeForCurrentSession = function (DcStartTime,DcStopTime) {

                try {
                    OneViewConsole.Debug("GetDcTimeForCurrentSession Start", "LVDcTimeComponent.GetDcTimeForCurrentSession");

                   // alert('DcStartTime : ' + DcStartTime + ', DcStopTime : ' + DcStopTime);

                    var DcStartTimeSplitted = DcStartTime.split(' ');
                    var DcStartDateArr = DcStartTimeSplitted[0].split('-');
                    var DcStartTimeArr = DcStartTimeSplitted[1].split(':');
                    var DcStartTimeFormatted = new Date(DcStartDateArr[2], (parseInt(DcStartDateArr[1]) - 1), DcStartDateArr[0], DcStartTimeArr[0], DcStartTimeArr[1], DcStartTimeArr[2]);
                    //alert('DcStartTimeFormatted : ' + DcStartTimeFormatted);

                    var DcStopTimeSplitted = DcStopTime.split(' ');
                    var DcStopDateArr = DcStopTimeSplitted[0].split('-');
                    var DcStopTimeArr = DcStopTimeSplitted[1].split(':');
                    var DcStopTimeFormatted = new Date(DcStopDateArr[2], (parseInt(DcStopDateArr[1]) - 1), DcStopDateArr[0], DcStopTimeArr[0], DcStopTimeArr[1], DcStopTimeArr[2]);
                    //alert('DcStopTimeFormatted : ' + DcStopTimeFormatted);

                    var ElapsedTimeInMilliSecs = DcStopTimeFormatted.getTime() - DcStartTimeFormatted.getTime();
                   // alert('ElapsedTimeInMilliSecs : ' + ElapsedTimeInMilliSecs);

                    var DcTimeArr = [];
                    var OneSecInMilliSec = 1000;
                    var FullElapsedTimeInSeconds = ElapsedTimeInMilliSecs / OneSecInMilliSec;
                   // alert('FullElapsedTimeInSeconds : ' + FullElapsedTimeInSeconds);

                    var ElapsedTimeInMins = 0;
                    if (FullElapsedTimeInSeconds > 60) {
                        ElapsedTimeInMins = Math.floor(FullElapsedTimeInSeconds / 60);
                    }
                   // alert('ElapsedTimeInMins : ' + ElapsedTimeInMins);

                    if (ElapsedTimeInMins > 60) {
                        var ElapsedTimeInHours = Math.floor(ElapsedTimeInMins / 60);
                        var ExtraMins = ElapsedTimeInMins - ElapsedTimeInHours * 60;
                        DcTimeArr[0] = ElapsedTimeInHours;

                        var ExtraMinsWithoutDec = Math.floor(ExtraMins);
                        var ElapsedTimeInSecs = ExtraMins - ExtraMinsWithoutDec * 60;

                        DcTimeArr[1] = ExtraMinsWithoutDec;
                        DcTimeArr[2] = ElapsedTimeInSecs;

                    }
                    else {
                        var ElapsedTimeInSecs = FullElapsedTimeInSeconds - ElapsedTimeInMins * 60;
                        DcTimeArr[0] = 0;
                        DcTimeArr[1] = ElapsedTimeInMins;
                        DcTimeArr[2] = ElapsedTimeInSecs;
                    }

                   

                   // alert('DcTimeArr : ' + JSON.stringify(DcTimeArr));

                    var hh = DcTimeArr[0];
                    var mm = DcTimeArr[1];
                    var ss = DcTimeArr[2];

                    //hours
                    if (hh == 0) {
                        hh = "00";
                    }
                    else if (hh <= 9) {
                        hh = "0" + hh;
                    }

                    //minutes
                    if (mm == 0) {
                        mm = "00";
                    }
                    else if (mm <= 9) {
                        mm = "0" + mm;
                    }

                    //seconds
                    if (ss == 0) {
                        ss = "00";
                    }
                    else if (ss <= 9) {
                        ss = "0" + ss;
                    }

                    var DcTime = hh + ":" + mm + ":" + ss;

                   // alert('DcTime : ' + DcTime);
                    OneViewConsole.Debug("GetDcTimeForCurrentSession End", "LVDcTimeComponent.GetDcTimeForCurrentSession");

                    return DcTime;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDcTimeComponent.GetDcTimeForCurrentSession", Excep);
                }
            }

            this.GetDcTime = function (DcTime, LastDcTime) {

                try {
                    OneViewConsole.Debug("GetDcTime Start", "LVDcTimeComponent.GetDcTime");

                    var TotalDcTime = "";
                    if (LastDcTime != null) {
                        var LastDcTimeArr = LastDcTime.split(":");
                        var DcTimeArr = DcTime.split(":");
                        var hh = (parseInt(LastDcTimeArr[0]) + parseInt(DcTimeArr[0]));
                        var mm = (parseInt(LastDcTimeArr[1]) + parseInt(DcTimeArr[1]));
                        var ss = (parseInt(LastDcTimeArr[2]) + parseInt(DcTimeArr[2]));


                        if (ss > 60) {
                            var ElapsedTimeInMins = Math.floor(ss / 60);
                            var ExtraSecs = ss - (ElapsedTimeInMins * 60);
                            mm = mm + ElapsedTimeInMins;
                            ss = ExtraSecs;
                        }

                        if (mm > 60) {
                            var ElapsedTimeInHours = Math.floor(mm / 60);
                            var ExtraMins = mm - (ElapsedTimeInHours * 60);
                            hh = hh + ElapsedTimeInHours;
                            mm = ExtraMins;
                        }

                        //hours
                        if (hh == 0) {
                            hh = "00";
                        }
                        else if (hh <= 9) {
                            hh = "0" + hh;
                        }
                        
                        //minutes
                        if (mm == 0) {
                            mm = "00";
                        }
                        else if (mm <= 9) {
                            mm = "0" + mm;
                        }

                        //seconds
                        if (ss == 0) {
                            ss = "00";
                        }
                        else if (ss <= 9) {
                            ss = "0" + ss;
                        }

                        TotalDcTime = hh + ":" + mm + ":" + ss;
                    }

                    OneViewConsole.Debug("GetDcTime End", "LVDcTimeComponent.GetDcTime");

                    return TotalDcTime;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDcTimeComponent.GetDcTime", Excep);
                }
            }
            
            this.FormDcTimeLogs = function (DcStartTime, DcStopTime, DcTime, Operation, LogDataDict) {

                try {
                    OneViewConsole.Debug("FormDcTimeLogs Start", "LVDcTimeComponent.FormDcTimeLogs");
                    
                    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

                    if (LogDataDict == undefined) {
                        LogDataDict = {};
                    }

                    var UserWiseDetails = { 'DcStartTime': DcStartTime, 'DcStopTime': DcStopTime, 'ElapsedTime': DcTime, 'OperationPerformed': Operation };
                    if (LogDataDict[LoginUserId] == undefined) {                      
                        LogDataDict[LoginUserId] = [];
                        LogDataDict[LoginUserId].push(UserWiseDetails);
                    }
                    else {
                        LogDataDict[LoginUserId].push(UserWiseDetails);
                    }

                    OneViewConsole.Debug("FormDcTimeLogs End", "LVDcTimeComponent.FormDcTimeLogs");

                    return LogDataDict;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDcTimeComponent.FormDcTimeLogs", Excep);
                }
            }

           

            //API to call
            this.GetDcTimeAndLogs = function (DcStartTime, DcStopTime, Operation) {

                try {
                    OneViewConsole.Debug("GetDcTimeAndLogs Start", "LVDcTimeComponent.GetDcTimeAndLogs");

                    if (Operation == undefined || Operation == "") {
                        if (LVIsEdit == true) {
                            Operation = "Update";
                        }
                        else {
                            Operation = "Save";
                        }
                    }
                    var DcTime = MyInstance.GetDcTimeForCurrentSession(DcStartTime, DcStopTime);
                    var LogDataDict = {};
                    var Dc_LastDcTime = "";
                    var DcR_LastDcTime = "";

                    var _oDcDAO = new DcDAO();
                    if (LVIsEdit == true) {
                        var Response = _oDcDAO.GetDcTimeDetailsByDcId(LVDataCaptureId);
                        if (Response != null) {
                            LogDataDict = Response[0].DcTimeLogs;
                            LogDataDict = JSON.parse(LogDataDict);
                            Dc_LastDcTime = Response[0].DcTime;
                        }

                        var DcRResult = _oDcDAO.GetDcResultDcTimeByDcId(LVDataCaptureId, OneViewSessionStorage.Get("LoginUserId"));
                        if (DcRResult != null) {
                            DcR_LastDcTime = DcRResult[0].DcTime;
                        }
                    }
                    
                    //Form new logs
                    LogDataDict = MyInstance.FormDcTimeLogs(DcStartTime, DcStopTime, DcTime, Operation, LogDataDict);
                    

                    //DataCapture DcTime
                    var TotalDcTime = DcTime;
                    if (Dc_LastDcTime != "") {
                        TotalDcTime = MyInstance.GetDcTime(DcTime, Dc_LastDcTime);
                    }

                    //DcResults DcTime
                    var TotalDcResultTime = DcTime;
                    if (DcR_LastDcTime != "") {
                        TotalDcResultTime = MyInstance.GetDcTime(DcTime, DcR_LastDcTime);
                    }

                    var DcTimeAndLogsResponse = { 'DcTimeLogs': JSON.stringify(LogDataDict), 'Dc_DcTime': TotalDcTime, 'DcR_DcTime': TotalDcResultTime };
                    //alert('DcTimeAndLogsResponse : ' + JSON.stringify(DcTimeAndLogsResponse));
                    OneViewConsole.Debug("GetDcTimeAndLogs End", "LVDcTimeComponent.GetDcTimeAndLogs");

                    return DcTimeAndLogsResponse;

                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "LVDcTimeComponent.GetDcTimeAndLogs", Excep);
                }
            }


        }

       
