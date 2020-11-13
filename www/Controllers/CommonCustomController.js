
var QuestionnaireHTML = "";
var QuestionnaireJS = "";

var LocalWasteHTML = "";
var LocalWasteJS = "";

var CAHTML = "";
var CAJS = "";

var IsPageLoadWhileEdit = false;
//This template using different timeout for TemperatureNgkeyup method , see down the variable : FCCTimeOut
MyApp.controller('CommonCustomController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
        //oSetDefaultSpinner.Start();
      
        try{
           // alert('here OneViewSessionStorage.Get("TemplateId") :' + OneViewSessionStorage.Get("TemplateId"));
            var Url;

            var _oDcCustomPageHtmlDAO = new DcCustomPageHtmlDAO();        
            var response = _oDcCustomPageHtmlDAO.GetByTemplateNodeId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("TemplateId"));

            if (response != null) {
                var ConvertBack = new RegExp("~", 'g');//$vn$SingleQuote$vn$ //$vn$singlequote$vn$
                var Html = response.Html.replace(ConvertBack, "'");
                var JS = response.Code.replace(ConvertBack, "'");

                var _oDynamicScriptComponent = new DynamicScriptComponent();
                _oDynamicScriptComponent.LoadCustomTemplateHTML($scope, $compile, Html, "CustomTemplateContentDiv");
                
                _oDynamicScriptComponent.LoadCustomTemplateScript(JS);

                var oPreAcceptanceQuestionnaireFacade = new CommonCustomFacade({ 'scope': $scope, 'document': $document, 'location': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout, 'snapRemote': snapRemote });

                oPreAcceptanceQuestionnaireFacade.Init();
                oPreAcceptanceQuestionnaireFacade.PageLoad();
            }
            else {                
                var MessageKey = "IN-ER-MAU-001 :: Error while loading the page.";
                Url = '/notifycall?MessageKey=' + MessageKey + '';
                $location.url(Url);
            }
        }

        catch (Excep) {
            //alert('CommonCustomController Excep 1 : ' + Excep);
            //alert('CommonCustomController Excep 2 : ' + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "CommonCustomController", xlatService);
        }
    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oPreAcceptanceQuestionnaireFacade.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {

        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.RemoveCurrentPageMetadata(currentPage);
        GlobalTemplateUIEventJobConfigMetaData = null;


        NCActionProfileMetaData = undefined;
        CommentsResult = {};
        ObservationResult = {};
        NCSelectedAttributeId = 0;

        //Put the variables to be destroyed in facade
        oPreAcceptanceQuestionnaireFacade.Destroy();

        scope = null;
        ionicBackdrop = null;
        oPreAcceptanceQuestionnaireFacade = null;
        $scope = null;
        GlobalFormattedTemplateMetadata = null;
        IsPageLoadWhileEdit = false;
        _oDataCaptureBO.Destroy();
    });

    $scope.GetProbeStatus = function () {
        oPreAcceptanceQuestionnaireFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
		window.MyProgressHUD.ShowProgress();
        oPreAcceptanceQuestionnaireFacade.SaveDCRecords();
		window.MyProgressHUD.HideProgress();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oPreAcceptanceQuestionnaireFacade.SetSelectedTextBoxColor(ControlId);
    };

    $scope.ViewRecords = function () {
        oPreAcceptanceQuestionnaireFacade.ViewRecords();       
    };

    $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId,Req) {
        oPreAcceptanceQuestionnaireFacade.SetAutoTemperatureListener(EventArg, TimeModelId,Req);
    };  


    $scope.ShowNCStatus = function (AttributeId, ControlId) {
        $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
    }


    //var lastTimeOutId = null;
    //var FCCTimeOut = 2000;
    //$scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {      
    //    if (lastTimeOutId != null)
    //        $timeout.cancel(lastTimeOutId);
    //    lastTimeOutId = $timeout(function () { oPreAcceptanceQuestionnaireFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, FCCTimeOut);
        //}

    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
        //Temperature_NgKeyUp is calling OnInputChange event in facade, OnInputChange event will call Temperature_NgKeyUp in the facade
        //this is to move timeout for raising NC in the method "OnInputChange"
        oPreAcceptanceQuestionnaireFacade.OnInputChange(AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId);
    }

    $scope.Back = function () {
        oPreAcceptanceQuestionnaireFacade.Back();
    }

    $scope.toggle = false;

    $scope.ClearForm = function () {
        oPreAcceptanceQuestionnaireFacade.ClearForm();
    }    

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {       
        oPreAcceptanceQuestionnaireFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oPreAcceptanceQuestionnaireFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oPreAcceptanceQuestionnaireFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
		window.MyProgressHUD.ShowProgress();
        oPreAcceptanceQuestionnaireFacade.SaveDCRecords(true);
		window.MyProgressHUD.HideProgress();
    }

    $scope.CustomNCClick = function () {
        oPreAcceptanceQuestionnaireFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oPreAcceptanceQuestionnaireFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oPreAcceptanceQuestionnaireFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oPreAcceptanceQuestionnaireFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oPreAcceptanceQuestionnaireFacade.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oPreAcceptanceQuestionnaireFacade.ProbeTesting();
    };

    $scope.ClearReasons = function () {
        oPreAcceptanceQuestionnaireFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oPreAcceptanceQuestionnaireFacade.ClearComments();
    }  

    
    $scope.MakeDecimalControl = function (ControlId, Format) {
        oPreAcceptanceQuestionnaireFacade.MakeDecimalControl(ControlId, Format);
    }

    $scope.ngChange_SetObservedvalueDifference = function (ControlId, UnitofReferenceControlId) {
        oPreAcceptanceQuestionnaireFacade.ngChange_SetObservedvalueDifference(ControlId, UnitofReferenceControlId);
     
    }

    $scope.MakeNumericControl = function (ControlId) {
        oPreAcceptanceQuestionnaireFacade.MakeNumericControl(ControlId);      
    }

    $scope.AttachPicture = function (DATEntityType) {
        oPreAcceptanceQuestionnaireFacade.AttachPicture(DATEntityType);
    }

    $scope.BrowsePicture = function () {
        oPreAcceptanceQuestionnaireFacade.BrowsePicture();
    }

    $scope.LoadNewDc = function () {
        oPreAcceptanceQuestionnaireFacade.LoadNewDc();
    }


    snapRemote.getSnapper().then(function (snapper) {
        snapper.on('close', function () {           
            if (MultiSelectControlData != null) {
                oPreAcceptanceQuestionnaireFacade.Temperature_NgKeyUp(MultiSelectControlData.AttributeId, MultiSelectControlData.ControlId);
                MultiSelectControlData = null;
            }
            
        });
    });

        //InfoClick
    $scope.InfoClick = function () {       
        oPreAcceptanceQuestionnaireFacade.InfoClick();
    }

    $scope.SaveRecords = function () {
        window.MyProgressHUD.ShowProgress();
		oPreAcceptanceQuestionnaireFacade.SaveDCRecords(false,false);
		window.MyProgressHUD.HideProgress();
    };

    //$scope.WasteTypeChangeEvent = function (Id, Name) {
    //    oPreAcceptanceQuestionnaireFacade.WasteTypeChangeEvent(Id, Name);
    //}

    $scope.CustomEvent = function (OperationName, EventArgs) {
       
        oPreAcceptanceQuestionnaireFacade[OperationName](EventArgs);
       // oPreAcceptanceQuestionnaireFacade.ContainerTypeChangeEvent(Id, Name);
    }

    //$scope.ContainerTypeChangeEvent = function (Id, Name) {
    //    oPreAcceptanceQuestionnaireFacade.ContainerTypeChangeEvent(Id, Name);
    //}

    //$scope.ContainerTypeSubTabChangeEvent = function (Id) {
    //    oPreAcceptanceQuestionnaireFacade.ContainerTypeSubTabChangeEvent(Id);
    //}
     
    $scope.Signature = function (SignatureControlID) {
        oPreAcceptanceQuestionnaireFacade.Signature(SignatureControlID);
    }

    $scope.DCImageCaptureAnswerModeSaveEventHandler = function (AttributeNodeId, ControlId, SelectionType) {
        oPreAcceptanceQuestionnaireFacade.DCImageCaptureAnswerModeSaveEventHandler(AttributeNodeId, ControlId, SelectionType);
    }

    $scope.DCImageCaptureAnswerModeDeleteEventHandler = function (AttributeNodeId, ControlId, SelectionType) {
        oPreAcceptanceQuestionnaireFacade.DCImageCaptureAnswerModeDeleteEventHandler(AttributeNodeId, ControlId, SelectionType);
    }
        
    $scope.OnCheckboxChange = function (AttributeId, ControlId, obj) {
        oPreAcceptanceQuestionnaireFacade.OnCheckboxChange(AttributeId, ControlId, obj);
    }

    $scope.RightPanelTabClick = function (HeaderId, AttributeId) {       
        oPreAcceptanceQuestionnaireFacade.RightPanelTabClick(HeaderId, AttributeId);
    }


    $scope.AddCustomAction = function (CustomAction, RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeIds) {
        oPreAcceptanceQuestionnaireFacade.AddCustomAction(CustomAction, RuleId, IsNC, IsObservation, IsManualRule, TemplateNodeIds);
    }

    $scope.DeleteCustomAction = function (CustomAction) {
        oPreAcceptanceQuestionnaireFacade.DeleteCustomAction(CustomAction);
    }

    $scope.UpdateRightPanelComments = function (CommentsRightPanel, AttributeId) {
        oPreAcceptanceQuestionnaireFacade.UpdateRightPanelComments(CommentsRightPanel, AttributeId);
    }

    $scope.ClearCustomActionComments = function (AttributeId) {
        oPreAcceptanceQuestionnaireFacade.ClearCustomActionComments(AttributeId);
    }

    $scope.AttachPictureToAction = function (RuleId, IsNC, IsObservation, IsManualRule) {
        oPreAcceptanceQuestionnaireFacade.AttachPictureToAction(RuleId, IsNC, IsObservation, IsManualRule);
    }

    $scope.ScrollListSearchEvent = function (EventArgs) {
        oPreAcceptanceQuestionnaireFacade.ScrollListSearchEvent(EventArgs);
    }

    $scope.HideNC = function () {
        oPreAcceptanceQuestionnaireFacade.HideNC();
    }

    $scope.ShowNCPage = function () {
        oPreAcceptanceQuestionnaireFacade.ShowNCPage();
    }

    $scope.OnDate_Change = function (SelectedControlId, IsNc) {
        oPreAcceptanceQuestionnaireFacade.OnDate_Change(SelectedControlId, IsNc);
    }

    $scope.SaveNCAction = function () {
        oPreAcceptanceQuestionnaireFacade.SetNCFormAction();
    }

    $scope.AttachPictureToAction = function (RuleId, IsNC, IsObservation, IsManualRule) {
        oPreAcceptanceQuestionnaireFacade.AttachPictureToAction(RuleId, IsNC, IsObservation, IsManualRule);
    }
});



