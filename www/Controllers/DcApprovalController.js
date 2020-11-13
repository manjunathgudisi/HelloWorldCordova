// ############################################################################################################## //

// Created User : Siva

// Last Updated User : Siva
// Last Updated Date : 26-09-2016 

// ############################################################################################################## //

var DcOnDeviceApprovalInfoLst = [];
var DcApprovalUIInfo = { IsIndividualDcSummary: true };
var DcOnDeviceApprovalInfo = {};
var DcApprovalModel = {};
var DcOnDeviceApprovalConfigControls = [];
var ApprovalDcSummaryConfig = null;
var ApprovalHeaderMessageKey = "";
var ApprovalSuccessMessageKey = "";
var ApprovalUserInfo = {
    "ApprovalUserId": 0,
    "ApprovalUserName": "",
    'IsAllAttributes': false,
    "IsReviewed": false,
    "Latitude": "",
    "Longitude": "",
    "IsMultiMediaAttached": false,
    "Comments": ""
}

var oxlatService = null;
var olocation = null;
var oscope = null;

var IsSignatureSupporting = true;

// DcApprovalController
MyApp.controller('DcApprovalController', function ($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

    var _oDcApprovalFacade = new DcApprovalFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout);

    _oDcApprovalFacade.Init();
    _oDcApprovalFacade.PageLoad();

    $scope.Approve = function () {
        _oDcApprovalFacade.Approve();
    }

    $scope.Reject = function () {
        _oDcApprovalFacade.Reject();
    }

    PreviewDC = function (TemplateNodeId, DcId) {
        _oDcApprovalFacade.PreviewDC(TemplateNodeId, DcId);
    }

    $scope.$on('$destroy', function () {
        _oDcApprovalFacade.Destroy();
    });

    $scope.Cancel = function () {
        _oDcApprovalFacade.Cancel();
    }
});

// DcApprovalFacade
function DcApprovalFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");


    /// <summary>
    /// Init event registration
    /// </summary>   
    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "DcApprovalFacade.Init");

            //document.getElementById('PageTitle').innerHTML = "My Approval";
            xlatService.setCurrentPage('17');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

            oxlatService = xlatService;
            olocation = $location;
            oscope = $scope;

            if (DcOnDeviceApprovalInfoLst.length > 0) {
                DcOnDeviceApprovalInfo = DcOnDeviceApprovalInfoLst[0];
            }

            OneViewConsole.Debug("Init End", "DcApprovalFacade.Init");
        }
        catch (Excep) {           
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalFacade.Init", xlatService);
        }
    }


    /// <summary>
    /// Page load event registration
    /// </summary>   
    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "DcApprovalFacade.PageLoad");

            if (DcOnDeviceApprovalInfoLst.length > 0) {

                var _oDcApprovalBO = new DcApprovalBO();
                var IsValidationFailed = _oDcApprovalBO.PreValidation(DcOnDeviceApprovalInfoLst);
             
                if (IsValidationFailed == false)
                {
                    for (var i = 0; i < DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo.length; i++) {

                        if (DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo[i].ApprovalIndex == DcOnDeviceApprovalInfo.NextApprovalIndex) {
                            var OnDeviceApprovalConfigJSON = JSON.parse(DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo[i].OnDeviceApprovalConfigJSON);
                            DcOnDeviceApprovalConfigControls = OnDeviceApprovalConfigJSON.OnDeviceApprovalConfigControls;
                            ApprovalDcSummaryConfig = (OnDeviceApprovalConfigJSON.SummaryViewConfig != "" && OnDeviceApprovalConfigJSON.SummaryViewConfig != null) ? OnDeviceApprovalConfigJSON.SummaryViewConfig : null;
                            ApprovalHeaderMessageKey = OnDeviceApprovalConfigJSON.ApprovalHeaderMessageKey;
                            ApprovalSuccessMessageKey = OnDeviceApprovalConfigJSON.ApprovalSuccessMessageKey;
                            break;
                        }
                    }

                    if (DcOnDeviceApprovalConfigControls.length > 0) {

                        var _oDcApprovalDetailsUIComponent = new DcApprovalDetailsUIComponent($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout);
                        _oDcApprovalDetailsUIComponent.CreateModel(DcOnDeviceApprovalConfigControls);
                        _oDcApprovalDetailsUIComponent.LoadHtml(DcOnDeviceApprovalConfigControls);
                    }
                    else {
                        navigator.notification.alert("OnDevice approval configuration not found. Please contact administrator", ['OK'], "");
                    }
                }
                else {
                    // $location.url('/dashboard');    
                    var OperationKey = oPageNavigationFramework.GetOperationKey("Approve", "C");
                    oPageNavigationFramework.RedirectByPreference(OperationKey, $location, xlatService, $scope);
                }
                
            }
            else {
                navigator.notification.alert("OnDevice approval configuration not found. Please contact administrator", ['OK'], "");
            }
            
            OneViewConsole.Debug("PageLoad End", "DcApprovalFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalFacade.PageLoad", xlatService);
        }
    }


    /// <summary>
    /// Destroy event registration
    /// </summary>   
    this.Destroy = function () {

        try {
            OneViewConsole.Debug("Destroy start", "DcApprovalFacade.Destroy");

            ////Added By : Sangeeta Bhatt
            ////Added On : 23-09-2016 19:06
            ////When Coming from Preview Page, to maintain the state of approval not clearing any list, when Preview page will be moved from here we'll uncomment this
            //DcOnDeviceApprovalInfoLst = [];
            //DcOnDeviceApprovalInfo = {};
            //DcApprovalModel = {};
            //DcOnDeviceApprovalConfigControls = [];
            //ApprovalUserInfo = {
            //    "ApprovalUserId": 0,
            //    "ApprovalUserName": "",
            //    'IsAllAttributes': false,
            //    "IsReviewed": false,
            //    "Latitude": "",
            //    "Longitude": "",
            //    "IsMultiMediaAttached": false,
            //    "Comments": ""
            //}

            var oxlatService = null;
            olocation = null;
            oscope = null;
            oGlobalOneviewBarcodeReaderPlugin.BarcodeReaderEventHandler = null;

            OneViewConsole.Debug("Destroy End", "DcApprovalFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalFacade.Destroy", xlatService);
        }
    }


    /// <summary>
    /// Approve event registration
    /// </summary>   
    this.Approve = function () {

        try {
            OneViewConsole.Debug("Approve start", "DcApprovalFacade.Approve");

            var _oDcApprovalDetailsUIComponent = new DcApprovalDetailsUIComponent($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout);
            var UIValidationResponse = _oDcApprovalDetailsUIComponent.Validate(DcOnDeviceApprovalConfigControls);

            if (UIValidationResponse.IsSuccess == true) {
                
                var BusinessValidationResponse = _oDcApprovalDetailsUIComponent.BusinessValidatation(DcApprovalModel);

                if (BusinessValidationResponse.IsSuccess == true) {

                    ApprovalUserInfo.ApprovalUserId = BusinessValidationResponse.ApprovalUserId;
                    ApprovalUserInfo.ApprovalUserName = BusinessValidationResponse.ApprovalUserName;

                    var Req = {
                        "DcOnDeviceApprovalInfo": DcOnDeviceApprovalInfoLst,
                        "ApprovalInfo": ApprovalUserInfo,
                        "OtherApprovalInfo": DcApprovalModel
                    }

                    var _oDcApprovalBO = new DcApprovalBO();
                    var IsSuccess = _oDcApprovalBO.Approve(Req);
                    
                    if (IsSuccess == true) {
                        
                        DcOnDeviceApprovalInfo.NextApprovalIndex++;

                        for(var i=0; i<DcOnDeviceApprovalInfoLst.length; i++){
                            DcOnDeviceApprovalInfoLst[i].NextApprovalIndex = DcOnDeviceApprovalInfo.NextApprovalIndex;
                        }

                        if (DcOnDeviceApprovalInfo.NextApprovalIndex <= DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalProfile.OnDeviceApprovalLevels) {
                            // alert("Level " + (DcOnDeviceApprovalInfo.NextApprovalIndex - 1) + " approved successfully. Click ok proceed the next level");                           
                            navigator.notification.alert(xlatService.xlat(ApprovalSuccessMessageKey), ['OK'], "");
                            this.PageLoad();
                        }
                        else {
                            var _oDasboardBO = new DasboardBO($scope, '', xlatService, '', '', '', '');
                            _oDasboardBO.UpdateTaskStatus_ApproveDC(DcOnDeviceApprovalInfoLst.length);

                            //  alert("Approved successfully");
                           //  navigator.notification.alert(xlatService.xlat(ApprovalSuccessMessageKey), ['OK'], "");
                            // $location.url('/dashboard');
                            var OperationKey = oPageNavigationFramework.GetOperationKey("Approve", "C");
                            oPageNavigationFramework.RedirectByPreference(OperationKey, $location, xlatService, $scope);
                        }
                    }
                    else {
                        navigator.notification.alert("Error while approving", ['OK'], "");
                    }
                }
                else {
                    navigator.notification.alert(xlatService.xlat(BusinessValidationResponse.ErrorMessage), ['OK'], "");
                }
            }
            else {
                navigator.notification.alert(xlatService.xlat(UIValidationResponse.ErrorMessage), ['OK'], "");
            }

            OneViewConsole.Debug("Approve End", "DcApprovalFacade.Approve");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalFacade.Approve", xlatService);
        }
    }


    /// <summary>
    /// Reject event registration
    /// </summary>   
    this.Reject = function () {

        try {
            OneViewConsole.Debug("Reject start", "DcApprovalFacade.Reject");

            OneViewConsole.Debug("Reject End", "DcApprovalFacade.Reject");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalFacade.Reject", xlatService);
        }
    }


    /// <summary>
    /// PreviewDC event registration
    /// </summary>  
    this.PreviewDC = function (TemplateNodeId, DcId) {

        try {
            OneViewConsole.Debug("PreviewDC start", "DcApprovalFacade.PreviewDC");

            var URL = '/DcPreview?TemplateId=' + TemplateNodeId + '&DcId=' + DcId;
            olocation.url(URL);
            oscope.$apply();

            OneViewConsole.Debug("PreviewDC End", "DcApprovalFacade.PreviewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalFacade.PreviewDC", xlatService);
        }
    }

    /// <summary>
    /// Cancel event registration
    /// </summary>   
    this.Cancel = function () {

        try {
            OneViewConsole.Debug("Cancel start", "DcApprovalFacade.Cancel");

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Cancel_confirm_Message'), function (ConfirmationId) {

                if (ConfirmationId == "2") {                   
                    if (DcApprovalUIInfo.IsIndividualDcSummary == false) {
                        $location.url('/PlatformPeriodicsLandingPage?TemplateGroupId=2');
                    }
                    else {
                        $location.url('/dashboard');
                    }
                    $scope.$apply();

                }
            });
          
            OneViewConsole.Debug("Cancel End", "DcApprovalFacade.Cancel");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalFacade.Cancel", xlatService);
        }
    }
}

// DcApprovalDetailsUIComponent
function DcApprovalDetailsUIComponent($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

    var MyInstance = this;
    var oDOM = new DOM();

    this.ApproverDetailsHtmlContainerId = "ApproverDetailsHtmlContainer";
    this.DcSummartyHtmlContainerId = "DcSummartyHtmlContainer";

    this.LoadHtml = function (OnDeviceApprovalConfigControls) {

        try {
            OneViewConsole.Debug("GetHtml start", "DcApprovalDetailsUIComponent.GetHtml");

            var DcSummaryHeaderHtml = '<div class="title-bar rounded margin-top">DC Summary</div>';
            var DcSummaryHtml = '';
            var _oDcSummaryUIComponent = new DcSummaryUIComponent();
           
            if (DcApprovalUIInfo.IsIndividualDcSummary == false) {

                var DcIdLst = [];
                var DcClientGuidLst = [];
                var TemplateIdLst = [];
                for (var i = 0; i < DcOnDeviceApprovalInfoLst.length; i++) {
                    var DcInfo = DcOnDeviceApprovalInfoLst[i].DcInfo;
                    DcIdLst.push(DcInfo.Id);
                    DcClientGuidLst.push(DcInfo.ClientGuid);
                    TemplateIdLst.push(DcInfo.TemplateNodeId);
                }
                DcSummaryHtml += _oDcSummaryUIComponent.GetHtmlOverAllForDcLst({ DcId: DcIdLst, DcClientGuid: DcClientGuidLst, TemplateId: TemplateIdLst, DcSummaryConfig: ApprovalDcSummaryConfig, 'IsPreviewButtonEnable': true });
            }
            else {
                for (var i = 0; i < DcOnDeviceApprovalInfoLst.length; i++) {

                    var DcInfo = DcOnDeviceApprovalInfoLst[i].DcInfo;
                    var TemplateId = DcOnDeviceApprovalInfoLst[i].DcInfo.TemplateNodeId;                        
                    DcSummaryHtml += _oDcSummaryUIComponent.GetHtml({ DcId: DcInfo.Id, TemplateId: TemplateId, DcSummaryConfig: ApprovalDcSummaryConfig, 'IsPreviewButtonEnable': true });

                }
            }
            
            if (DcSummaryHtml != '') {
                oDOM.AddInnerHtml(MyInstance.DcSummartyHtmlContainerId, DcSummaryHeaderHtml + DcSummaryHtml);
            }

            var ApproverDetailsHtml = '<div class="title-bar rounded margin-top">' + xlatService.xlat("Approver Details") + '</div>';
            ApproverDetailsHtml += MyInstance.GetHtml(OnDeviceApprovalConfigControls);
            oDOM.AddInnerHtml(MyInstance.ApproverDetailsHtmlContainerId, ApproverDetailsHtml);
            oDOM.AddInnerHtml("DivHeader", xlatService.xlat(ApprovalHeaderMessageKey));
         
  
            OneViewConsole.Debug("GetHtml End", "DcApprovalDetailsUIComponent.GetHtml");           
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsUIComponent.Init", xlatService);
        }
    }

    this.GetHtml = function (OnDeviceApprovalConfigControls) {

        try {
            OneViewConsole.Debug("GetHtml start", "DcApprovalDetailsUIComponent.GetHtml");

            var Html = '';

            for (var i = 0; i < OnDeviceApprovalConfigControls.length; i++) {

                Html += new DcApprovalDetailsAnswerModeComponent($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout).GetHtml(OnDeviceApprovalConfigControls[i]);
            }

            OneViewConsole.Debug("GetHtml End", "DcApprovalDetailsUIComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsUIComponent.Init", xlatService);
        }
    }

    this.CreateModel = function (OnDeviceApprovalConfigControls) {

        try {
            OneViewConsole.Debug("CreateModel start", "DcApprovalDetailsUIComponent.CreateModel");

            DcApprovalModel = {};

            for (var i = 0; i < OnDeviceApprovalConfigControls.length; i++) {

                DcApprovalModel[OnDeviceApprovalConfigControls[i].Type] = {
                    OnDeviceApprovalControlConfig: OnDeviceApprovalConfigControls[i],
                    Answer: "",
                    AnswerValue: "",
                }
            }

            OneViewConsole.Debug("CreateModel End", "DcApprovalDetailsUIComponent.CreateModel");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsUIComponent.CreateModel", xlatService);
        }
    }

    this.Validate = function (OnDeviceApprovalConfigControls) {

        try {
            OneViewConsole.Debug("Validate start", "DcApprovalDetailsUIComponent.Validate");

            var CombinedMessage = xlatService.xlat('Mandatory');
            var SuffixMessage = xlatService.xlat('and');
            var CountOfEmpty = 0;
            var ValidationResponse = { IsSuccess: true, ErrorMessage: "" };

            var MandatoryOnDeviceApprovalConfigControls = [];

            for (var i = 0; i < OnDeviceApprovalConfigControls.length; i++) {
                if (OnDeviceApprovalConfigControls[i].IsManadatory == true) {
                    MandatoryOnDeviceApprovalConfigControls.push(OnDeviceApprovalConfigControls[i]);
                }
            }

            for (var i = 0; i < MandatoryOnDeviceApprovalConfigControls.length; i++) {

                if (DcApprovalModel[MandatoryOnDeviceApprovalConfigControls[i].Type].Answer == "") {

                    if (CountOfEmpty > 0 && CountOfEmpty == MandatoryOnDeviceApprovalConfigControls.length - 1) {
                        CombinedMessage = CombinedMessage + SuffixMessage + xlatService.xlat(MandatoryOnDeviceApprovalConfigControls[i].ErrorMessageKey);
                    }
                    else if (CountOfEmpty > 0) {
                        CombinedMessage = CombinedMessage + "," + xlatService.xlat(MandatoryOnDeviceApprovalConfigControls[i].ErrorMessageKey);
                    }
                    else {
                        CombinedMessage = CombinedMessage + xlatService.xlat(MandatoryOnDeviceApprovalConfigControls[i].ErrorMessageKey);
                    }

                    CountOfEmpty++;                      
                }               
            }

            if (CountOfEmpty > 0) {
                ValidationResponse.IsSuccess = false;
                ValidationResponse.ErrorMessage = CombinedMessage;
            }

            OneViewConsole.Debug("Validate End", "DcApprovalDetailsUIComponent.Validate");

            return ValidationResponse;
        }
        catch (Excep) {            
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsUIComponent.Validate", xlatService);
        }
    }

    this.BusinessValidatation = function (DcApprovalModel) {

        try {
            OneViewConsole.Debug("BusinessValidatation start", "DcApprovalDetailsUIComponent.BusinessValidatation");

            var ValidationResponse = { IsSuccess: true, ErrorMessage: "", ApprovalUserId: 0, ApprovalUserName: "" };

            for (var i in DcApprovalModel) {

                if (DcApprovalModel[i].OnDeviceApprovalControlConfig.Type == "UserIdPasswordApprovalType") {

                    var Answers = DcApprovalModel[i].Answer.split("$vn$");
                    
                    var _oUserMasterDAO = new UserMasterDAO();
                    var Result = _oUserMasterDAO.GetUserDetails(Answers[0], OneViewSessionStorage.Get("LoginUserOrgName"));

                    var IsApprovalUserExist = false;

                    for (var l = 0; l < DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo.length; l++) {

                        if (DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo[l].ApprovalIndex == DcOnDeviceApprovalInfo.NextApprovalIndex) {

                            for (var j = 0; j < DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalUserDetails.length; j++) {

                                if (DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo[l].Id == DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalUserDetails[j].DcApprovalLevelInfoId) {

                                    for (var k = 0; k < Result.length; k++) {

                                        if (DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalUserDetails[j].UserId == Result[k].ServerId) {

                                            IsApprovalUserExist = true;
                                            break;
                                        }
                                    }
                                }
                            }                           
                        }
                    }

                    if (IsApprovalUserExist == true) {

                        if (Result.length == 0) {
                            OneViewConsole.Info("Invalid User Name", "DcApprovalDetailsUIComponent.BusinessValidatation");
                            ValidationResponse.ErrorMessage = "Invalid user name";
                            ValidationResponse.IsSuccess = false;
                            break;
                        }
                        else if (Result.length > 0 && Result[0].Password != Answers[1]) {
                            ValidationResponse.ErrorMessage = "Password mismatch";
                            ValidationResponse.IsSuccess = false;
                            OneViewConsole.Info("Password Mismatch", "DcApprovalDetailsUIComponent.BusinessValidatation");
                            break;
                        }
                        else if (Result[0].Password == Answers[1]) {
                            ValidationResponse.ApprovalUserId = Result[0].ServerId;
                            ValidationResponse.ApprovalUserName = Result[0].Name;
                            ValidationResponse.IsSuccess = true;                           
                        }
                    }
                    else {
                        OneViewConsole.Info("Invalid Approval User", "DcApprovalDetailsUIComponent.BusinessValidatation");
                        ValidationResponse.ErrorMessage = "Invalid approval user";
                        ValidationResponse.IsSuccess = false;
                        break;
                    }
                }
                else if (DcApprovalModel[i].OnDeviceApprovalControlConfig.Type == "PinApprovalType") {

                    if (DcApprovalModel[i].OnDeviceApprovalControlConfig.IsDCPlacePin == true) {

                        var DCPLaceNodeId = DcOnDeviceApprovalInfo.DcInfo.DcPlaceId;
                        var DCPLaceMasterId = new DefaultTreeDAO().GetNodeById(DCPLaceNodeId, "OrganizationAssetsNode")[0].ChildDbElementId;
                        var _oDefaultMasterDAO = new DefaultMasterDAO("RcoMasterEntity");
                        var Result = _oDefaultMasterDAO.GetByServerId(DCPLaceMasterId);
                      
                        if (Result.length > 0) {
                            if (Result.length > 0 && Result[0].Pin == DcApprovalModel[i].Answer) {
                                ValidationResponse.IsSuccess = true;
                            }
                            else {
                                ValidationResponse.ErrorMessage = "Invalid pin";
                                ValidationResponse.IsSuccess = false;
                                break;
                            }
                        }
                        else {
                            ValidationResponse.ErrorMessage = "Invalid pin";
                            ValidationResponse.IsSuccess = false;
                            break;
                        }
                    }

                    else if (DcApprovalModel[i].OnDeviceApprovalControlConfig.IsDCApprovalUserPin == true) {

                        ValidationResponse=  new DcApprovalDetailsPinApprovalTypeAnswerModeComponent().PinValidatation();

                        /*
                        var DcApproverPin = DcApprovalModel[i].Answer;
                        var Result;
                        for (var l = 0; l < DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo.length; l++) {

                            if (DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo[l].ApprovalIndex == DcOnDeviceApprovalInfo.NextApprovalIndex) {

                                for (var j = 0; j < DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalUserDetails.length; j++) {

                                    if (DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo[l].Id == DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalUserDetails[j].DcApprovalLevelInfoId) {

                                        var ApproverUserId = DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalUserDetails[j].UserId;
                                        
                                        //have to change query for userid
                                        var _oDefaultMasterDAO = new DefaultMasterDAO("UserMasterEntity");
                                        Result = _oDefaultMasterDAO.GetByServerId(ApproverUserId);
                                       
                                        if (Result != null && Result.length > 0) {
                                            IsApprovalUserExist = true;
                                            break;
                                        }
                                        else {
                                            alert("Approver user apart from DcUser not allowed to configure.")
                                        }

                                    }
                                }
                            }
                        }



                        if (IsApprovalUserExist == true) {

                            if (Result !=undefined && Result.length > 0 && Result[0].Pin != DcApproverPin) {
                                ValidationResponse.ErrorMessage = "Pin mismatch";
                                ValidationResponse.IsSuccess = false;
                                OneViewConsole.Info("Pin Mismatch", "DcApprovalDetailsUIComponent.BusinessValidatation");
                                break;
                            }
                            else if (Result != undefined && Result[0].Pin == DcApproverPin) {
                                ValidationResponse.ApprovalUserId = Result[0].ServerId;
                                ValidationResponse.ApprovalUserName = Result[0].Name;
                                ValidationResponse.IsSuccess = true;
                            }

                        }
                        else {
                            OneViewConsole.Info("Invalid Approval User", "DcApprovalDetailsUIComponent.BusinessValidatation");
                            ValidationResponse.ErrorMessage = "Invalid approval user";
                            ValidationResponse.IsSuccess = false;
                            break;
                        }


                        */
                    }

                   
                   
                } 
            }

            OneViewConsole.Debug("BusinessValidatation End", "DcApprovalDetailsUIComponent.BusinessValidatation");
            
            return ValidationResponse;
        }
        catch (Excep) {
            
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsUIComponent.BusinessValidatation", xlatService);
        }
    }
}

// DcApprovalDetailsAnswerModeComponent
function DcApprovalDetailsAnswerModeComponent() {

    this.GetHtml = function (OnDeviceApprovalControlConfig) {

        try {
            OneViewConsole.Debug("GetHtml start", "DcApprovalDetailsAnswerModeComponent.GetHtml");

            var Html = '';           

            if (OnDeviceApprovalControlConfig.Type == "UserIdPasswordApprovalType") {
                Html = new DcApprovalDetailsUserIdPasswordAnswerModeComponent().GetHtml(OnDeviceApprovalControlConfig);
            }
            else if (OnDeviceApprovalControlConfig.Type == "PinApprovalType") {
                Html = new DcApprovalDetailsPinApprovalTypeAnswerModeComponent().GetHtml(OnDeviceApprovalControlConfig);
            }
            else if (OnDeviceApprovalControlConfig.Type == "AnonymousApproverNameApprovalType") {
                Html = new AnonymousApproverNameApprovalTypeAnswerModeComponent().GetHtml(OnDeviceApprovalControlConfig);
            }
            else if (OnDeviceApprovalControlConfig.Type == "AnonymousApproverPositionApprovalType") {
                Html = new AnonymousApproverPositionApprovalTypeAnswerModeComponent().GetHtml(OnDeviceApprovalControlConfig);
            }
            else if (OnDeviceApprovalControlConfig.Type == "AnonymousApproverLeadNameApprovalType") {
                Html = new AnonymousApproverLeadNameApprovalTypeAnswerModeComponent().GetHtml(OnDeviceApprovalControlConfig);
            }
            else if (OnDeviceApprovalControlConfig.Type == "AnonymousApproverSignatureApprovalType") {
                Html = new AnonymousApproverSignatureApprovalTypeComponent().GetHtml(OnDeviceApprovalControlConfig);
            }

            OneViewConsole.Debug("GetHtml End", "DcApprovalDetailsAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.GetHtml", oxlatService);
        }
    }
}

// DcApprovalDetailsUserIdPasswordAnswerModeComponent
function DcApprovalDetailsUserIdPasswordAnswerModeComponent() {

    this.GetHtml = function (OnDeviceApprovalControlConfig) {

        try {
            OneViewConsole.Debug("GetHtml start", "DcApprovalDetailsUserIdPasswordAnswerModeComponent.GetHtml");

            var LabelName_UserId = "";
            var LabelName_Password = "";
            var Type = "'" + OnDeviceApprovalControlConfig.Type + "'";

            var Mode_UserId =  "'UserId'";
            var Mode_Password =  "'Password'";

            if (OnDeviceApprovalControlConfig.LabelKey.indexOf("$vn$") != -1) {

                var LabelKeys = OnDeviceApprovalControlConfig.LabelKey.split("$vn$");
                LabelName_UserId = LabelKeys[0];
                LabelName_Password = LabelKeys[1];
            }


            var Html = ' <div class="row no-padding responsive-sm multi-col custom-view"><div class="col rounded light-bg">' +
                        ' <div class="field-item">' +
                        ' <label>' +
                        ' <span>' + oxlatService.xlat(LabelName_UserId) + '</span>' +
                        '<input type="text" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId_UserId" onchange="new DcApprovalDetailsUserIdPasswordAnswerModeComponent().Set(this.value, ' + Type + ',' + Mode_UserId + ')">' +
                        '  </label>' +
                        ' </div>' +
                        ' </div>'+
                        '<div class="col rounded light-bg">' +
                        ' <div class="field-item">' +
                        ' <label>' +
                        ' <span>' + oxlatService.xlat(LabelName_Password) + '</span>' +
                         '<input type="password" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId_Password" onchange="new DcApprovalDetailsUserIdPasswordAnswerModeComponent().Set(this.value, ' + Type + ',' + Mode_Password + ')">' +
                        '  </label>' +
                        ' </div>' +
                        ' </div></div>';

            OneViewConsole.Debug("GetHtml End", "DcApprovalDetailsUserIdPasswordAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsUserIdPasswordAnswerModeComponent.GetHtml", oxlatService);
        }
    }

    this.Set = function (Answer, Type, Mode) {

        try {
            OneViewConsole.Debug("Set start", "DcApprovalDetailsAnswerModeComponent.Set");
                      
            if (DcApprovalModel[Type].Answer == "") {
                if (Mode == "UserId") {
                    DcApprovalModel[Type].Answer = Answer + "$vn$";
                }
                else if(Mode == "Password") {
                    DcApprovalModel[Type].Answer = "$vn$" + Answer;
                }
            }
            else {
                var Answers = DcApprovalModel[Type].Answer.split("$vn$");
                if (Mode == "UserId") {
                    DcApprovalModel[Type].Answer = Answer + "$vn$" + Answers[1]; 
                }
                else if (Mode == "Password") {
                    DcApprovalModel[Type].Answer = Answers[0] + "$vn$" + Answer;
                }
            }

            if (DcApprovalModel[Type].Answer == "$vn$") {
                DcApprovalModel[Type].Answer = "";
            }
            
            OneViewConsole.Debug("Set End", "DcApprovalDetailsAnswerModeComponent.Set");           
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.Set", oxlatService);
        }
    } 
}

// DcApprovalDetailsPinApprovalTypeAnswerModeComponent
function DcApprovalDetailsPinApprovalTypeAnswerModeComponent() {

    var MyInstance = this;

    this.GetHtml = function (OnDeviceApprovalControlConfig) {

        try {
            OneViewConsole.Debug("GetHtml start", "DcApprovalDetailsPinApprovalTypeAnswerModeComponent.GetHtml");

            var LabelName = OnDeviceApprovalControlConfig.LabelKey;
            var Type = "'" + OnDeviceApprovalControlConfig.Type + "'";
            var Html = "";
            var NameAndTypeHtml = GetNameAndTypeHtml(OnDeviceApprovalControlConfig);

            /*var Html = '<div class="row no-padding responsive-sm multi-col custom-view">' +
                        '<div class="col rounded light-bg">' +
                        '<div class="field-item">' +
                        '<label>' +
                        '<span>' + oxlatService.xlat(LabelName) + '</span>' +
                        '<input type="password" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId" oninput="new DcApprovalDetailsPinApprovalTypeAnswerModeComponent().Set(this.value, ' + Type + ')">' +
                        '</label>' +                       
                        '</div>' +
                        '</div>' +
                        ' </div>';

            if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 17) {

                Html = '<div class="row no-padding responsive-sm multi-col custom-view">' +
                            '<div class="col rounded light-bg">' +
                              '<div class="row no-padding no-margin">' +
                        ' <div class="col no-padding no-margin">' +
                            '<div class="field-item">' +
                            '<label>' +
                            '<span>' + oxlatService.xlat(LabelName) + '</span>' +
                            '<input type="text" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId" oninput="new DcApprovalDetailsPinApprovalTypeAnswerModeComponent().Set(this.value, ' + Type + ')" disabled>' +
                            '</label>' +
                            '</div>' +
                            '</div>' +
                               ' <div class="col col-10 no-padding no-margin text-center">' +
                        '   <a href="javascript:void(0)" onclick="new DcApprovalDetailsPinApprovalTypeAnswerModeComponent().OpenBarcodeReader()" class="button button-icon"><i class="icon icon-qrcode"></i></a>' +
                        ' </div>' +
                        ' </div>' +
                        ' </div>' +
                            ' </div>';
            }*/

            if (OnDeviceApprovalControlConfig.IsQRCodeReaderEnabled != undefined && OnDeviceApprovalControlConfig.IsQRCodeReaderEnabled == true) {
                Html = '<div class="row no-padding responsive-sm multi-col custom-view">' +
                            '<div class="col rounded light-bg">' +
                              '<div class="row no-padding no-margin">' +
                        ' <div class="col no-padding no-margin">' +
                            '<div class="field-item">' +
                             NameAndTypeHtml +
                            '</div>' +
                            '</div>' +
                               ' <div class="col col-10 no-padding no-margin text-center">' +
                        '   <a href="javascript:void(0)" onclick="new DcApprovalDetailsPinApprovalTypeAnswerModeComponent().OpenBarcodeReader()" class="button button-icon"><i class="icon icon-qrcode"></i></a>' +
                        ' </div>' +
                        ' </div>' +
                        ' </div>' +
                        ' </div>';
            }
            else {
                Html = '<div class="row no-padding responsive-sm multi-col custom-view">' +
                        '<div class="col rounded light-bg">' +
                        '<div class="field-item">' +
                            NameAndTypeHtml +
                        '</div>' +
                        '</div>' +
                        ' </div>';
            }

            OneViewConsole.Debug("GetHtml End", "DcApprovalDetailsPinApprovalTypeAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsPinApprovalTypeAnswerModeComponent.GetHtml", oxlatService);
        }
    }

    var GetNameAndTypeHtml = function (OnDeviceApprovalControlConfig) {
        try {
            OneViewConsole.Debug("GetNameAndTypeHtml start", "DcApprovalDetailsPinApprovalTypeAnswerModeComponent.GetNameAndTypeHtml");

            var LabelName = OnDeviceApprovalControlConfig.LabelKey;
            var Type = "'" + OnDeviceApprovalControlConfig.Type + "'";



            var Html = '<label>' +
                       '<span>' + oxlatService.xlat(LabelName) + '</span>';

            if (OnDeviceApprovalControlConfig.IsQRCodeReaderEnabled !=undefined &&OnDeviceApprovalControlConfig.IsQRCodeReaderEnabled == true) {
                if (OnDeviceApprovalControlConfig.IsManualPINEnabled == true) {
                    navigator.notification.alert(("Not implemented"), ['OK'], "");
                }
                else {
                    Html += '<input type="text" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId" oninput="new DcApprovalDetailsPinApprovalTypeAnswerModeComponent().Set(this.value, ' + Type + ')" disabled>';
                }
            }
            else {
                Html += '<input type="password" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId" oninput="new DcApprovalDetailsPinApprovalTypeAnswerModeComponent().Set(this.value, ' + Type + ')">';                       
            }
            Html +='</label>';

            OneViewConsole.Debug("GetNameAndTypeHtml End", "DcApprovalDetailsPinApprovalTypeAnswerModeComponent.GetNameAndTypeHtml");

            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsPinApprovalTypeAnswerModeComponent.GetNameAndTypeHtml", oxlatService);
        }
    }

    this.Set = function (Answer, Type) {

        try {
            OneViewConsole.Debug("Set start", "DcApprovalDetailsAnswerModeComponent.Set");
            
            DcApprovalModel[Type].Answer = Answer;
            
            OneViewConsole.Debug("Set End", "DcApprovalDetailsAnswerModeComponent.Set");            
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.Set", oxlatService);
        }
    }

    this.OpenBarcodeReader = function () {

        try {
            OneViewConsole.Debug("OpenBarcodeReader start", "DcApprovalDetailsAnswerModeComponent.OpenBarcodeReader");
            
            //oGlobalOneviewBarcodeReaderPlugin.BarcodeReaderEventHandler = this.BarcodeReaderEventHandler;
            //oGlobalOneviewBarcodeReaderPlugin.ScanCode();

            cordova.plugins.barcodeScanner.scan(
                 function (result) {
                     if (!result.cancelled) {

                         if (result.format == "QR_CODE") {
                             MyInstance.BarcodeReaderEventHandler(result.text);
                         }
                     }
                 },
          function (error) {
              // ReturnMessage.Text = "Scanning failed: " + error;
              navigator.notification.alert(("Scanning failed: " + error), ['OK'], "");
          },
          {
              "resultDisplayDuration": 0
          }
          );
            
            OneViewConsole.Debug("OpenBarcodeReader End", "DcApprovalDetailsAnswerModeComponent.OpenBarcodeReader");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.OpenBarcodeReader", oxlatService);
        }      
    }

    this.BarcodeReaderEventHandler = function (Response) {

        try {
            OneViewConsole.Debug("BarcodeReaderEventHandler start", "DcApprovalDetailsAnswerModeComponent.BarcodeReaderEventHandler");
            var oDOM = new DOM();
            MyInstance.Set(Response, "PinApprovalType");
            var ValidationResponse = MyInstance.PinValidatation();
            if (ValidationResponse.IsSuccess == true) {                
                oDOM.SetValue("PinApprovalTypeControlId", oxlatService.xlat("Pin verified"));
                oDOM.SetStyle('PinApprovalTypeControlId', 'color', 'green');
                oGlobalOneviewBarcodeReaderPlugin.BarcodeReaderEventHandler = null;
            }
            else {
                MyInstance.Set("", "PinApprovalType");                
                oDOM.SetValue("PinApprovalTypeControlId", oxlatService.xlat(ValidationResponse.ErrorMessage));
                oDOM.SetStyle('PinApprovalTypeControlId', 'color', 'red');
                //alert(oxlatService.xlat(ValidationResponse.ErrorMessage));
            }

            OneViewConsole.Debug("BarcodeReaderEventHandler End", "DcApprovalDetailsAnswerModeComponent.BarcodeReaderEventHandler");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.BarcodeReaderEventHandler", oxlatService);
        }       
    }


    this.PinValidatation = function () {

        try {
            OneViewConsole.Debug("PinValidatation start", "DcApprovalDetailsPinApprovalTypeAnswerModeComponent.PinValidatation");

            var ValidationResponse = { IsSuccess: true, ErrorMessage: "" };

            for (var i in DcApprovalModel) {

             
                if (DcApprovalModel[i].OnDeviceApprovalControlConfig.Type == "PinApprovalType") {

                    if (DcApprovalModel[i].OnDeviceApprovalControlConfig.IsDCPlacePin == true) {

                        var DCPLaceNodeId = DcOnDeviceApprovalInfo.DcInfo.DcPlaceId;
                        var DCPLaceMasterId = new DefaultTreeDAO().GetNodeById(DCPLaceNodeId, "OrganizationAssetsNode")[0].ChildDbElementId;
                        var _oDefaultMasterDAO = new DefaultMasterDAO("RcoMasterEntity");
                        var Result = _oDefaultMasterDAO.GetByServerId(DCPLaceMasterId);

                        if (Result.length > 0) {
                            //alert(Result[0].Pin+"...."+DcApprovalModel[i].Answer)
                            if (Result.length > 0 && Result[0].Pin == DcApprovalModel[i].Answer) {
                                ValidationResponse.IsSuccess = true;
                            }
                            else {
                                ValidationResponse.ErrorMessage = "Pin not verified";
                                ValidationResponse.IsSuccess = false;
                                break;
                            }
                        }
                        else {
                            ValidationResponse.ErrorMessage = "Invalid pin";
                            ValidationResponse.IsSuccess = false;
                            break;
                        }
                    }
                    else if (DcApprovalModel[i].OnDeviceApprovalControlConfig.IsDCApprovalUserPin == true) {
                        var IsApprovalUserExist = false;
                        var DcApproverPin = DcApprovalModel[i].Answer;                        

                        var ApproverUserIdList = [];

                        for (var l = 0; l < DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo.length; l++) {
                            if (DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo[l].ApprovalIndex == DcOnDeviceApprovalInfo.NextApprovalIndex) {
                                for (var j = 0; j < DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalUserDetails.length; j++) {
                                    if (DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalLevelInfo[l].Id == DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalUserDetails[j].DcApprovalLevelInfoId) {
                                        var ApprovalUserId = DcOnDeviceApprovalInfo.DcApprovalProfileInfo.DcApprovalUserDetails[j].UserId;
                                        if (ApprovalUserId != undefined && ApprovalUserId != null && ApprovalUserId != 0) {
                                            ApproverUserIdList.push({ 'ServerId': ApprovalUserId });
                                        }
                                    }
                                }
                            }
                        }
                        
                       
                        if (ApproverUserIdList != null && ApproverUserIdList.length > 0) {
                            var _oUserMasterDAO = new UserMasterDAO();
                            var ApproverUserDataList = _oUserMasterDAO.GetUserAllDataByServerIds(ApproverUserIdList);
                            if (ApproverUserDataList != null && ApproverUserDataList != undefined && ApproverUserDataList.length > 0) {
                                var IsPinMatch = false;
                                for (var i = 0; i < ApproverUserDataList.length ; i++) {
                                    var ApproverUserData = ApproverUserDataList[i];
                                    if (ApproverUserData.Pin == DcApproverPin) {
                                        IsPinMatch = true;                                       
                                        ValidationResponse.ApprovalUserId = ApproverUserData.ServerId;
                                        ValidationResponse.ApprovalUserName = ApproverUserData.Name;
                                        ValidationResponse.IsSuccess = true;
                                        break;
                                    }
                                    else {
                                        IsPinMatch = false;                                       
                                    }
                                }

                                if (IsPinMatch != true) {
                                    ValidationResponse.ErrorMessage = "Pin mismatch";
                                    ValidationResponse.IsSuccess = false;
                                    OneViewConsole.Info("Pin Mismatch", "DcApprovalDetailsUIComponent.BusinessValidatation");
                                }
                            }
                            else {
                                //alert("Approver user apart from DcUser not allowed to configure.")
                                OneViewConsole.Info("Invalid Approval User : Approver user apart from DcUser not allowed to configure.", "DcApprovalDetailsUIComponent.BusinessValidatation");
                                ValidationResponse.ErrorMessage = "Invalid Approval User : Approver user apart from DcUser not allowed to configure.";
                                ValidationResponse.IsSuccess = false;
                            }
                        }
                        else {
                            OneViewConsole.Info("Invalid Approval User", "DcApprovalDetailsUIComponent.BusinessValidatation");
                            ValidationResponse.ErrorMessage = "No approval user exists";
                            ValidationResponse.IsSuccess = false;
                        }

                    }


                }
            }

            OneViewConsole.Debug("PinValidatation End", "DcApprovalDetailsPinApprovalTypeAnswerModeComponent.PinValidatation");           
            return ValidationResponse;
        }
        catch (Excep) {

            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsPinApprovalTypeAnswerModeComponent.PinValidatation", xlatService);
        }
    }
}

// AnonymousApproverNameApprovalTypeAnswerModeComponent
function AnonymousApproverNameApprovalTypeAnswerModeComponent() {

    this.GetHtml = function (OnDeviceApprovalControlConfig) {

        try {
            OneViewConsole.Debug("GetHtml start", "AnonymousApproverNameApprovalTypeAnswerModeComponent.GetHtml");

            var LabelName = OnDeviceApprovalControlConfig.LabelKey;
            var Type = "'" + OnDeviceApprovalControlConfig.Type + "'";

      
            var Html = '<div class="row no-padding responsive-sm multi-col custom-view">' +
                        '<div class="col rounded light-bg">' +
                        '<div class="field-item">' +
                        '<label>' +
                        '<span>' + oxlatService.xlat(LabelName) + '</span>' +
                        '<input type="text" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId" oninput="new AnonymousApproverNameApprovalTypeAnswerModeComponent().Set(this.value, ' + Type + ')">' +
                        '</label>' +
                        '</div>' +
                        '</div>' +
                        ' </div>';

            OneViewConsole.Debug("GetHtml End", "AnonymousApproverNameApprovalTypeAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AnonymousApproverNameApprovalTypeAnswerModeComponent.GetHtml", oxlatService);
        }
    }

    this.Set = function (Answer, Type) {

        try {
            OneViewConsole.Debug("Set start", "DcApprovalDetailsAnswerModeComponent.Set");

            DcApprovalModel[Type].Answer = Answer;
            
            OneViewConsole.Debug("Set End", "DcApprovalDetailsAnswerModeComponent.Set");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.Set", oxlatService);
        }
    }
}

// AnonymousApproverPositionApprovalTypeAnswerModeComponent
function AnonymousApproverPositionApprovalTypeAnswerModeComponent() {

    this.GetHtml = function (OnDeviceApprovalControlConfig) {

        try {
            OneViewConsole.Debug("GetHtml start", "AnonymousApproverPositionApprovalTypeAnswerModeComponent.GetHtml");

            var LabelName = OnDeviceApprovalControlConfig.LabelKey;
            var Type = "'" + OnDeviceApprovalControlConfig.Type + "'";


            var Html = '<div class="row no-padding responsive-sm multi-col custom-view">' +
                        '<div class="col rounded light-bg">' +
                        '<div class="field-item">' +
                        '<label>' +
                        '<span>' + oxlatService.xlat(LabelName) + '</span>' +
                        '<input type="text" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId" oninput="new AnonymousApproverPositionApprovalTypeAnswerModeComponent().Set(this.value, ' + Type + ')">' +
                        '</label>' +
                        '</div>' +
                        '</div>' +
                        ' </div>';

            OneViewConsole.Debug("GetHtml End", "AnonymousApproverPositionApprovalTypeAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AnonymousApproverPositionApprovalTypeAnswerModeComponent.GetHtml", oxlatService);
        }
    }

    this.Set = function (Answer, Type) {

        try {
            OneViewConsole.Debug("Set start", "DcApprovalDetailsAnswerModeComponent.Set");

            DcApprovalModel[Type].Answer = Answer;

            OneViewConsole.Debug("Set End", "DcApprovalDetailsAnswerModeComponent.Set");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.Set", oxlatService);
        }
    }
}

// AnonymousApproverLeadNameApprovalTypeAnswerModeComponent
function AnonymousApproverLeadNameApprovalTypeAnswerModeComponent() {

    this.GetHtml = function (OnDeviceApprovalControlConfig) {

        try {
            OneViewConsole.Debug("GetHtml start", "AnonymousApproverLeadNameApprovalTypeAnswerModeComponent.GetHtml");

            var LabelName = OnDeviceApprovalControlConfig.LabelKey;
            var Type = "'" + OnDeviceApprovalControlConfig.Type + "'";

            //var Html = '<label class="item item-input">' +
            //                '<span class="input-label">' + oxlatService.xlat(LabelName) + '</span>' +
            //                '<input type="text" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId" oninput="new AnonymousApproverLeadNameApprovalTypeAnswerModeComponent().Set(this.value, ' + Type + ')">' +
            //            '</label>';

            var Html = '<div class="row no-padding responsive-sm multi-col custom-view">' +
                        '<div class="col rounded light-bg">' +
                        '<div class="field-item">' +
                        '<label>' +
                        '<span>' + oxlatService.xlat(LabelName) + '</span>' +
                        '<input type="text" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId" oninput="new AnonymousApproverLeadNameApprovalTypeAnswerModeComponent().Set(this.value, ' + Type + ')">' +
                        '</label>' +
                        '</div>' +
                        '</div>' +
                        ' </div>';

            OneViewConsole.Debug("GetHtml End", "AnonymousApproverLeadNameApprovalTypeAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AnonymousApproverLeadNameApprovalTypeAnswerModeComponent.GetHtml", oxlatService);
        }
    }

    this.Set = function (Answer, Type) {

        try {
            OneViewConsole.Debug("Set start", "DcApprovalDetailsAnswerModeComponent.Set");

            DcApprovalModel[Type].Answer = Answer;

            OneViewConsole.Debug("Set End", "DcApprovalDetailsAnswerModeComponent.Set");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.Set", oxlatService);
        }
    }
}

// AnonymousApproverSignatureApprovalTypeComponent
function AnonymousApproverSignatureApprovalTypeComponent() {

    this.GetHtml = function (OnDeviceApprovalControlConfig) {

        try {
            OneViewConsole.Debug("GetHtml start", "AnonymousApproverSignatureApprovalTypeComponent.GetHtml");

            var LabelName = OnDeviceApprovalControlConfig.LabelKey;
            var Type = "'" + OnDeviceApprovalControlConfig.Type + "'";
            var Html = "";
       
        
            if (IsSignatureSupporting != true) {
    
                var Html = '<div class="row no-padding responsive-sm multi-col custom-view">' +
                        '<div class="col rounded light-bg">' +
                        '<div class="field-item">' +
                        '<label>' +
                        '<span>' + oxlatService.xlat(LabelName) + '</span>' +
                        '<input type="text" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId" oninput="new AnonymousApproverSignatureApprovalTypeComponent().Set(this.value, ' + Type + ')">' +
                        '</label>' +
                        '</div>' +
                        '</div>' +
                        ' </div>';
           }
            else {
           
        
                Html = ' <div class="row no-padding responsive-sm multi-col custom-view">' +
                        '<div class="col rounded light-bg">' +
                        '<div class="row no-padding no-margin">' +
                        ' <div class="col no-padding no-margin">' +
                        '   <div class="field-item">' +
                        '     <label>' +
                        '       <span>Signature</span>' +
                        '<input type="text" id="lblSignature" readonly>' +
                        '     </label>' +
                        '   </div>' +
                        ' </div>      ' +      
                        ' <div class="col col-10 no-padding no-margin text-center">' +
                        '   <a href="javascript:void(0)" onclick="new AnonymousApproverSignatureApprovalTypeComponent().Signature(' + Type + ')" class="button button-icon icon icon-pencil"></a>' +
                        ' </div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
            }

            OneViewConsole.Debug("GetHtml End", "AnonymousApproverSignatureApprovalTypeComponent.GetHtml");
            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AnonymousApproverSignatureApprovalTypeComponent.GetHtml", oxlatService);
        }
    }

    this.Set = function (Answer, Type) {

        try {
            OneViewConsole.Debug("Set start", "DcApprovalDetailsAnswerModeComponent.Set");

            DcApprovalModel[Type].Answer = Answer;

            OneViewConsole.Debug("Set End", "DcApprovalDetailsAnswerModeComponent.Set");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.Set", oxlatService);
        }
    }

    this.Signature = function (Type) {
        try {
            OneViewConsole.Debug("Signature Start", "DcApprovalDetailsAnswerModeComponent.Signature");
            var SignatureNameControlId = "ApproverSignature";

     
            var DivApproveContent = document.getElementById("DivApproveContent");
            DivApproveContent.style.display = "none";
          
            
            var DivApproveFooter = document.getElementById("DivApproveFooter");
            DivApproveFooter.style.display = "none";

            var ApproverSignature_DivSignature = document.getElementById("ApproverSignature_DivSignature");

            ApproverSignature_DivSignature.style.display = "block";           
           
          //  $timeout(function () {
            SignatureContent(SignatureNameControlId, Type);
           // }, 100);


            OneViewConsole.Debug("Signature End", "DcApprovalDetailsAnswerModeComponent.Signature");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.Signature", oxlatService);
        }
    }

    var SignatureContent = function (SignatureNameControlId, Type) {
        try {
            OneViewConsole.Debug("SignatureContent Start", "DcApprovalDetailsAnswerModeComponent.SignatureContent");

         
            var wrapper = document.getElementById(SignatureNameControlId + "_SignaturePad"),
                         clearButton = wrapper.querySelector("[data-action=clear]"),
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

            window.onresize = resizeCanvas;
            resizeCanvas();

            signaturePad = new SignaturePad(canvas);

            clearButton.addEventListener("click", function (event) {
                signaturePad.clear();
                ClearSignature(SignatureNameControlId, Type);
            });

            saveButton.addEventListener("click", function (event) {
                //alert(signaturePad.toDataURL().length);
                if (signaturePad.isEmpty()) {
                    navigator.notification.alert("MN-RQ-NCF-001 :: Please provide signature first.", ['OK'], "");
                } else {
                    SaveSignature(Type,SignatureNameControlId, signaturePad);
                }


            });

            OneViewConsole.Debug("SignatureContent End", "DcApprovalDetailsAnswerModeComponent.SignatureContent");
        }
        catch (Excep) {
            // alert('SignatureContent :' + Excep + "," + JSON.stringify(Excep));
            throw Excep;
        }
        finally {
            wrapper = null;
        }
    }

    var SaveSignature = function (Type,ControlId, signaturePad) {
        try {
            OneViewConsole.Debug("SaveSignature Start", "DcApprovalDetailsAnswerModeComponent.SaveSignature");         

            DcApprovalModel[Type].Answer = signaturePad.toDataURL();
            var DivApproveContent = document.getElementById("DivApproveContent");
            DivApproveContent.style.display = "block";
            var DivApproveFooter = document.getElementById("DivApproveFooter");
            DivApproveFooter.style.display = "block";
            var ApproverSignature_DivSignature = document.getElementById("ApproverSignature_DivSignature");
            ApproverSignature_DivSignature.style.display = "none";
          

           // alert(document.getElementById("img1").src);
          //  document.getElementById("img1").src = signaturePad.toDataURL();
            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
            document.getElementById("lblSignature").value = "Signed " + CurrenntDateAndTime;

            OneViewConsole.Debug("SaveSignature End", "DcApprovalDetailsAnswerModeComponent.SaveSignature");
        }
        catch (Excep) {
            //alert('SaveSignature :' + Excep + "," + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.SaveSignature", oxlatService);
        }
        finally {
            oDateTime = null;
            CurrenntDateAndTime = null;
        }
    }

    var ClearSignature = function (ControlId, Type) {
        try {
            OneViewConsole.Debug("ClearSignature Start", "DcApprovalDetailsAnswerModeComponent.ClearSignature");

            document.getElementById(ControlId + '_SignaturePad').value = '';
            document.getElementById("lblSignature").value = "";


            OneViewConsole.Debug("ClearSignature End", "DcApprovalDetailsAnswerModeComponent.ClearSignature");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.ClearSignature", oxlatService);
        }
    }
}

// DcSummaryUIComponent
function DcSummaryUIComponent() {

    var MyInstance = this;


    // Req={
    /// DcId:'',
    /// DcSummaryConfig:{
    /// IsTemplateNameRequired :true,
    /// IsDcPlaceNameRequired :true,
    /// IsNCCountRequired:true,
    /// IsObservationCountRequired :true,
    /// IsActionCountRequired :true,
    /// IsBlockerCountRequired :true,
    /// IsNACountRequired :true,
    /// IsESTTimeRequired :true,
    /// IsActualTimeRequired:true,
    /// IsGPSInfoRequired:true,
    /// IsLastUpdatedDateRequired :true,
    /// IsScoreRequired :true,
    /// IsPercentageRequired :true,
    /// IsCommentsRequired :true,
    //}}
    this.GetHtml = function (Req) {

        try {
            OneViewConsole.Debug("GetHtml start", "DcSummaryUIComponent.GetHtml");

            var Html = '';
            var DcId = Req.DcId;
            var _oDcSummaryBO = new DcSummaryBO();
            var DcSummaryResponse = _oDcSummaryBO.Get({ DcId: DcId, Id: DcId, DcSummaryConfig: Req.DcSummaryConfig });
            var TemplateNodeName = DcSummaryResponse.TemplateName;
            var DcPlaceName = DcSummaryResponse.DcPlaceName;

            Html += '<div class="margin-bottom margin-top">' + DcPlaceName + ' - ' + TemplateNodeName + '</div>' +
            '<div class="white-box audit-approval rounded margin-bottom"><div class="row responsive-sm no-padding-vertical">' +
             '<div class="col">' +
                GetOverallSummaryHtml({ DcSummaryResponse: DcSummaryResponse, DcSummaryConfig: Req.DcSummaryConfig }) +
                GetScoreSummaryHtml({ DcSummaryResponse: DcSummaryResponse, DcSummaryConfig: Req.DcSummaryConfig }) +
                    '</div>';
                
            if (Req.IsPreviewButtonEnable != false) {
                Html += '<div class="col col-20" onclick="PreviewDC(' + Req.TemplateId + ',' + DcId + ')">';
                Html += '<a class="button button-block no-margin">Preview</a>';
                Html += '</div>';
            }
            Html += '</div></div>';


            OneViewConsole.Debug("GetHtml End", "DcSummaryUIComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryUIComponent.GetHtml", Excep);
        }
    }

    this.GetHtmlOverAll = function (Req) {

        try {
            OneViewConsole.Debug("GetHtml start", "DcSummaryUIComponent.GetHtml");

            // { DcInfo: DcOnDeviceApprovalInfoLst[i].DcInfo, DcSummaryConfig: ApprovalDcSummaryConfig, 'IsPreviewButtonEnable': true }

            var _DcSummaryResponse = {
                "TemplateName": "",
                "DcPlaceName": "",
                "ESTTime": "",
                "ActualTime": "",
                "Latitude": "",
                "Longitude": "",
                "Score": "",
                "Percentage": "",
                "Comments": "",
                "LastUpdatedDate": "",

                "NCCount": 0,
                "ObservationCount": 0,
                "ActionCount": 0,
                "BlockerCount": 0,

                "NACount": 0,
                "ListviewAnswermodeSummary": [],
                "OtherAnswermodeSummary": 0,
            };
      
            //var DcOnDeviceApprovalInfoLst = Req.DcOnDeviceApprovalInfoLst;
            //alert(JSON.stringify(DcOnDeviceApprovalInfoLst));
            var Html = '';
            var _oListviewAnswermodeSummary = {};
            var TemplateId = 4;
            var DcId1 = 4;
            for (var i = 0; i < DcOnDeviceApprovalInfoLst.length; i++) {
            
                var DcInfo = DcOnDeviceApprovalInfoLst[i].DcInfo;

                var DcId = DcInfo.Id;
                DcId1 = DcInfo.Id;
                TemplateId = DcInfo.TemplateNodeId;
            
                var _oDcSummaryBO = new DcSummaryBO();
                var DcSummaryResponse = _oDcSummaryBO.Get({ DcId: DcId, DcSummaryConfig: Req.DcSummaryConfig });
                var TemplateNodeName = DcSummaryResponse.TemplateName;
                var DcPlaceName = DcSummaryResponse.DcPlaceName;

                

                var ListviewAnswermodeSummaryLst = DcSummaryResponse.ListviewAnswermodeSummary;
               
                if (ListviewAnswermodeSummaryLst.length > 0) {
                    for (var j = 0; j < ListviewAnswermodeSummaryLst.length; j++) {
                        var ListviewAnswermodeSummary = ListviewAnswermodeSummaryLst[j];
                        for (var k in ListviewAnswermodeSummary) {
                        
                            if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 17) {
                               
                                if (k == "INCOMPLETE") {

                                    ListviewAnswermodeSummary["INCOMPLETE"].Name = "INCOMPLETE";
                                    ListviewAnswermodeSummary["INCOMPLETE"].Color = "red";
                                    ListviewAnswermodeSummary["INCOMPLETE"].Sequence = 1;
                                }                                
                                if (k == "COMPLETE") {

                                    ListviewAnswermodeSummary["COMPLETE"].Name = "COMPLETE";
                                    ListviewAnswermodeSummary["COMPLETE"].Color = "green";
                                    ListviewAnswermodeSummary["COMPLETE"].Sequence = 3;
                                }   
                            }
                           
                            if (_oListviewAnswermodeSummary[k] == undefined) {
                                _oListviewAnswermodeSummary[k] = ListviewAnswermodeSummary[k];
                            }
                            else {
                                _oListviewAnswermodeSummary[k].Count = parseInt(_oListviewAnswermodeSummary[k].Count + ListviewAnswermodeSummary[k].Count);
                            }
                        }
                    }                    
                }

                _DcSummaryResponse.NCCount = parseInt(_DcSummaryResponse.NCCount + DcSummaryResponse.NCCount);
                _DcSummaryResponse.ObservationCount = parseInt(_DcSummaryResponse.ObservationCount + DcSummaryResponse.ObservationCount);
                _DcSummaryResponse.ActionCount = parseInt(_DcSummaryResponse.ActionCount + DcSummaryResponse.ActionCount);
                _DcSummaryResponse.BlockerCount = parseInt(_DcSummaryResponse.BlockerCount + DcSummaryResponse.BlockerCount);
                _DcSummaryResponse.NACount = parseInt(_DcSummaryResponse.NACount + DcSummaryResponse.NACount);              
                _DcSummaryResponse.OtherAnswermodeSummary = parseInt(_DcSummaryResponse.OtherAnswermodeSummary + DcSummaryResponse.OtherAnswermodeSummary);
                
               
                
            }
            _DcSummaryResponse.ListviewAnswermodeSummary.push(_oListviewAnswermodeSummary);




            Html += '<div class="margin-bottom margin-top">' + DcPlaceName +'</div>' +
               '<div class="white-box audit-approval rounded margin-bottom"><div class="row responsive-sm no-padding-vertical">' +
                '<div class="col">' +
                   GetOverallSummaryHtml({ DcSummaryResponse: _DcSummaryResponse, DcSummaryConfig: Req.DcSummaryConfig }) +
                   GetScoreSummaryHtml({ DcSummaryResponse: _DcSummaryResponse, DcSummaryConfig: Req.DcSummaryConfig }) +
                       '</div>';

            if (Req.IsPreviewButtonEnable != false) {
                Html += '<div class="col col-20" onclick="PreviewDC(' + TemplateId + ',' + DcId1 + ')">';
                //Html += '<div class="col col-20" onclick="PreviewForMultipleDC(' + TemplateId + ',' + DcId1 + ')">';
                Html += '<a class="button button-block no-margin">Preview</a>';
                Html += '</div>';
            }
            Html += '</div></div>';

           // alert("_oListviewAnswermodeSummary : " + JSON.stringify(_DcSummaryResponse.ListviewAnswermodeSummary));
            
            OneViewConsole.Debug("GetHtml End", "DcSummaryUIComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryUIComponent.GetHtml", Excep);
        }
    }  
    ////Req : { DcId: DcIdLst, DcClientGuid: DcClientGuidLst, TemplateId: TemplateIdLst, DcSummaryConfig: ApprovalDcSummaryConfig, 'IsPreviewButtonEnable': true }
    this.GetHtmlOverAllForDcLst = function (Req) {

        try {
            OneViewConsole.Debug("GetHtmlOverAllForDcLst start", "DcSummaryUIComponent.GetHtmlOverAllForDcLst");           
            

            var Html = '';
            var _oDcSummaryBO = new DcSummaryBO();
            var DcSummaryResponse = _oDcSummaryBO.GetDcSummaryByDcIdLst({ DcId: Req.DcId, DcClientGuid: Req.DcClientGuid, DcSummaryConfig: Req.DcSummaryConfig });
        
            var DcPlaceName = DcSummaryResponse.DcPlaceName;

            Html += '<div class="margin-bottom margin-top">' + DcPlaceName + '</div>' +
            '<div class="white-box audit-approval rounded margin-bottom"><div class="row responsive-sm no-padding-vertical">' +
             '<div class="col">' +
                GetOverallSummaryHtml({ DcSummaryResponse: DcSummaryResponse, DcSummaryConfig: Req.DcSummaryConfig }) +
                GetScoreSummaryHtml({ DcSummaryResponse: DcSummaryResponse, DcSummaryConfig: Req.DcSummaryConfig }) +
                    '</div>';
            var TemplateId = 1, DcId1=10;
            if (Req.IsPreviewButtonEnable != false) {
                Html += '<div class="col col-20" onclick="PreviewDC(' + TemplateId + ',' + DcId1 + ')">';
                Html += '<a class="button button-block no-margin">Preview</a>';
                Html += '</div>';
            }
            Html += '</div></div>';
          

            OneViewConsole.Debug("GetHtmlOverAllForDcLst End", "DcSummaryUIComponent.GetHtmlOverAllForDcLst");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryUIComponent.GetHtmlOverAllForDcLst", Excep);
        }
    }

    var GetCircleHtml = function (Name, Value, Color) {

        try {
            OneViewConsole.Debug("GetCircleHtml start", "DcSummaryUIComponent.GetCircleHtml");

            var Html = '<div style="float: left;" class="margin">' +
                            '<div class="c100 p100 small ' + Color + '">' +
                            '     <span>' + Value + '</span>' +
                            '     <div class="slice">' +
                            '         <div class="baar"></div>' +
                            '         <div class="fill"></div>' +
                            '     </div>' +
                            '</div>' +
                            '<div style="clear: both; float: left; width: 80px; text-align: center;">' + Name + '</div>' +
                            '</div>';

            OneViewConsole.Debug("GetHtml End", "DcSummaryUIComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryUIComponent.GetHtml", Excep);
        }
    }

    var GetBoxHtml= function (Name, Value, Color) {
        try {
            OneViewConsole.Debug("GetBoxHtml start", "DcSummaryUIComponent.GetBoxHtml");


            var Html = '<div  style="float: left; background: ' + Color + '; color: #fff;" class="margin padding">' + Name + ' - <strong>' + Value + '</strong>   </div>';

            OneViewConsole.Debug("GetBoxHtml End", "DcSummaryUIComponent.GetBoxHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryUIComponent.GetBoxHtml", Excep);
        }
    }

    var GetOverallSummaryHtml = function (Req) {
        try {
            OneViewConsole.Debug("GetOverallSummaryHtml start", "DcSummaryUIComponent.GetOverallSummaryHtml");

            var DcSummaryConfig = Req.DcSummaryConfig;
            var DcSummaryResponse = Req.DcSummaryResponse;


            var ListviewAnswermodeSummaryLst = DcSummaryResponse.ListviewAnswermodeSummary;

            var Html = '<div class="title-bar rounded" style="background:#b9c8d0; color:#000;">Overall Summary</div>';

            if (DcSummaryConfig.IsNACountRequired == true && DcSummaryResponse.NACount>0) {
               //   Html += GetCircleHtml("NA", DcSummaryResponse.NACount, '');
                Html += GetBoxHtml("NA", DcSummaryResponse.NACount, 'grey');
                
            }

            //
            if (DcSummaryConfig.IsListviewAnswermodeSummaryRequired == true && ListviewAnswermodeSummaryLst.length > 0) {
                if (ListviewAnswermodeSummaryLst.length > 0) {
                    for (var i = 0; i < ListviewAnswermodeSummaryLst.length; i++) {
                        var ListviewAnswermodeSummary = ListviewAnswermodeSummaryLst[i];
                        for (var i in ListviewAnswermodeSummary) {
                            //    Html += GetCircleHtml(ListviewAnswermodeSummary[i].Name, ListviewAnswermodeSummary[i].Count, ListviewAnswermodeSummary[i].Color);
                            Html += GetBoxHtml(ListviewAnswermodeSummary[i].Name, ListviewAnswermodeSummary[i].Count, ListviewAnswermodeSummary[i].Color);
                        }
                    }
                }
            }

            // Html += GetCircleHtml("Other", DcSummaryResponse.OtherAnswermodeSummary, '');
            if (DcSummaryConfig.IsOtherAnswermodeSummaryRequired == true && DcSummaryResponse.OtherAnswermodeSummary > 0) {
                Html += GetBoxHtml("Other", DcSummaryResponse.OtherAnswermodeSummary, 'black');
            }
            
            if (DcSummaryConfig.IsNCCountRequired == true && DcSummaryResponse.NCCount > 0) {
                Html += GetBoxHtml("NC", DcSummaryResponse.NCCount, 'red');
            }
            if (DcSummaryConfig.IsObservationCountRequired == true && DcSummaryResponse.ObservationCount > 0) {
                Html += GetBoxHtml("Observation", DcSummaryResponse.ObservationCount, 'orange');
            }
            if (DcSummaryConfig.IsActionCountRequired == true && DcSummaryResponse.ActionCount > 0) {
                Html += GetBoxHtml("Action", DcSummaryResponse.ActionCount, 'red');
            }

            OneViewConsole.Debug("GetOverallSummaryHtml End", "DcSummaryUIComponent.GetOverallSummaryHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryUIComponent.GetOverallSummaryHtml", Excep);
        }
    }

    var GetScoreSummaryHtml = function (Req) {
        try {
            OneViewConsole.Debug("GetCircleHtml start", "DcSummaryUIComponent.GetCircleHtml");

            var DcSummaryConfig = Req.DcSummaryConfig;
            var DcSummaryResponse = Req.DcSummaryResponse;

            var ListviewAnswermodeSummaryLst = DcSummaryResponse.ListviewAnswermodeSummary;

            var Html = '';
            var Header = '<div class="title-bar rounded" style="background:#b9c8d0; color:#000;">Score</div>';

            if (DcSummaryConfig.IsScoreRequired == true) {               
                Html += GetBoxHtml("Score", DcSummaryResponse.Score, 'grey');
            }

            if (DcSummaryConfig.IsPercentageRequired == true) {
                Html += GetBoxHtml("Percentage", DcSummaryResponse.Percentage, 'grey');
            }
            if (Html != '') {
                Html = Header + Html;
            }

            OneViewConsole.Debug("GetHtml End", "DcSummaryUIComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryUIComponent.GetHtml", Excep);
        }
    }

    var GetGroupNameHtml = function (Req) {
        try {
            OneViewConsole.Debug("GetCircleHtml start", "DcSummaryUIComponent.GetCircleHtml");

            var DcSummaryConfig = Req.DcSummaryConfig;
            var DcSummaryResponse = Req.DcSummaryResponse;

            var ListviewAnswermodeSummaryLst = DcSummaryResponse.ListviewAnswermodeSummary;

            var Html = '<div class="title-bar rounded" style="background:#b9c8d0; color:#000;">Group Name</div>';
            Html = '<div  style="float: left; background: red; color: #fff;" class="margin padding">' +
                   'RED - <strong>5</strong>' +
                   '</div>' +
                   '<div  style="float: left; background: green; color: #fff;" class="margin padding">' +
                   '  Green - <strong>21</strong>' +
                   '</div>' +
                   '<div  style="float: left; background: orange; color: #fff;" class="margin padding">' +
                   '  Green - <strong>21</strong>' +
                   '</div>';

            OneViewConsole.Debug("GetHtml End", "DcSummaryUIComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryUIComponent.GetHtml", Excep);
        }
    }
}


