
// ############################################################################################################## //

// Created User : Siva Prasad
// Created Date : 11-12-2014 09:30 AM

// Last Updated User : Siva Prasad
// Last Updated Date : 23-12-2014 01:00 PM

// Note : Any updation or changes required, Need to discuss with created user or last updated user or full team

// ############################################################################################################## //


// Dont change / remove below variables
var MyAuditTotalDCCountForUpload = 0;
var MyAuditUploadLimit = 50;
var MyAuditUploadProgressValue = 0;
var MyAuditUploadBatchNumber = 1;

var MyAuditPageConfig = null;
var MyAuditDCTemplates = null;
var MyAuditDCPlaces = null;
var MyAuditIsTemplateView = null;

// Tab index
var MyAuditTabIndex = {
    "Pending": 1,
    "Approved": 2,
    "History": 3
}

// MyAuditController
MyApp.controller('MyAuditControllerNew', function ($scope, $compile, $location, xlatService) {

    // Toggle Button Dynamic Loader 
    $scope.MyAuditTab = ["Pending", "Approved", "History"];
    $scope.MyAudit = "Pending";
    var _MyAuditBO = new MyAuditBO($scope, $location, xlatService, '');

    $scope.divPending = true;
    $scope.divApproved = false;
    $scope.divHistory = false;

    $scope.$on('$destroy', function () {
       // alert('destroy');
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();

        MyAuditPageConfig = null;
        MyAuditDCTemplates = null;
        MyAuditDCPlaces = null;
    });

    $scope.$watch('MyAudit', function (TabIndex) {
        //alert(TabIndex);
        if (TabIndex == "Pending") {
            $scope.divPending = true;
            $scope.divApproved = false;
            $scope.divHistory = false;
        }
        else if (TabIndex == "Approved") {
            $scope.divPending = false;
            $scope.divApproved = true;
            $scope.divHistory = false;
        }
        else {
            $scope.divPending = false;
            $scope.divApproved = false;
            $scope.divHistory = true;
        }
        //alert("Pending : " + $scope.divPending + ", Completed : " + $scope.divComplete + ", History : " + $scope.divUploaded);
    });

    var _oMyAuditFacade = new MyAuditFacade($scope, $location, xlatService, '');
    
    _oMyAuditFacade.Init();
    _oMyAuditFacade.PageLoad($compile);
     
    $scope.Edit = function (TemplateId, DcPlaceId, TabIndex, TotalRecordsCount, DcPlaceName, TemplateName) {
        _oMyAuditFacade.Edit(TemplateId, DcPlaceId, TabIndex, TotalRecordsCount, DcPlaceName, TemplateName);
    }
    
    $scope.Delete = function (TemplateId, DcPlaceId, TabIndex, TotalRecordsCount) {
        _oMyAuditFacade.Delete($compile, TemplateId, DcPlaceId, TabIndex);
    }

    $scope.Clear = function (TemplateId, DcPlaceId, TabIndex, TotalRecordsCount) {
        _oMyAuditFacade.Clear($compile, TemplateId, DcPlaceId, TabIndex);
    }

    $scope.Approve = function (TemplateId, DcPlaceId, TabIndex, TotalRecordsCount) {
        _oMyAuditFacade.Approve(TemplateId, DcPlaceId, TabIndex, TotalRecordsCount);
    }

    $scope.Upload = function (TemplateId, DcPlaceId, TabIndex, TotalRecordsCount, DCPlaceName) {
        _oMyAuditFacade.Upload($compile, TemplateId, DcPlaceId, TabIndex, TotalRecordsCount, DCPlaceName);
    }

    $scope.NewDC = function () {        
        _oMyAuditFacade.NewDC();
    }

    $scope.ChangeViewMode = function () {
        $scope.GraphSearchElement = "";
        _oMyAuditFacade.PageLoad($compile, true);
    }

    $scope.GraphSearch = function () {      
        _oMyAuditFacade.GraphSearch($scope, $compile, $scope.GraphSearchElement, MyAuditIsTemplateView);
    }
})


// MyAuditFacade
function MyAuditFacade($scope, $location, xlatService, toaster) {

    var MyInstance = this;

    var _MyAuditBO = new MyAuditBO($scope, $location, xlatService, toaster);
    var _oOneViewGeolocationPlugin = new OneViewGeolocationPlugin();

    /// <summary>
    /// Page initialization
    /// </summary> 
    this.Init = function () {
        try {
            OneViewConsole.Debug("Init start", "MyAuditFacade.Init");

            GlobalxlatService = xlatService;
           // xlatService.setCurrentPage('MyAudit_Page');
            xlatService.setCurrentPage('6');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

            $scope.HideNewDCBtn = CheckIsFollowUpUser();

            if (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") == "true") {
                _oOneViewGeolocationPlugin.RequestLocationUpdates();
            }
            else {
                _oOneViewGeolocationPlugin.RemoveLocationUpdates();
            }

            OneViewConsole.Debug("Init end", "MyAuditFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.Init", xlatService);
        }
    }


    /// <summary>
    /// Page load event registration
    /// </summary>    
    /// <param name="$compile">Angular compilation for making dynamic html</param>
    /// <param name="ChangeViewMode">Templatewise view or place wise view</param>    
    this.PageLoad = function ($compile, ChangeViewMode) {

        try {
            OneViewConsole.Debug("PageLoad start", "MyAuditFacade.PageLoad");
            //Destroy html
            var oOneViewSidePanel = new OneViewSidePanel();
            oOneViewSidePanel.Clear();

            var _oDataCaptureBO = new DataCaptureBO();
            _oDataCaptureBO.SetDefaultAutoTemperatureListener();

            _MyAuditBO.PageLoad($compile, ChangeViewMode);

            OneViewConsole.Debug("PageLoad end", "MyAuditFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.PageLoad", xlatService);
        }
        finally {
            _oDataCaptureBO = null;
        }
    }


    /// <summary>
    /// New dc event registration
    /// </summary>
    this.NewDC = function () {

        try {
            OneViewConsole.Debug("NewDC start", "MyAuditFacade.NewDC");

            _MyAuditBO.NewDC();

            OneViewConsole.Debug("NewDC end", "MyAuditFacade.NewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.NewDc", xlatService);
        }
    }


    /// <summary>
    /// Edit dc event registration
    /// </summary>
    /// <param name="TemplateId">Template id</param>   
    /// <param name="DcPlaceId">DCPlace id</param>      
    /// <param name="TabIndex">Tab index</param>
    this.Edit = function (TemplateId, DcPlaceId, TabIndex, TotalRecordsCount, DcPlaceName, TemplateName) {

        try {
           // alert(TemplateId);
            //alert(DcPlaceId);
            OneViewConsole.Debug("EDIT start", "MyAuditFacade.EDIT");

            _MyAuditBO.LoadViewRecordsPage(TemplateId, DcPlaceId, DcPlaceName, TemplateName);

            OneViewConsole.Debug("EDIT end", "MyAuditFacade.EDIT");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.EDIT", xlatService);
        }
    }


    /// <summary>
    /// Delete dc event registration
    /// </summary>
    /// <param name="TemplateId">Template id</param>   
    /// <param name="DcPlaceId">DCPlace id</param>      
    /// <param name="TabIndex">Tab index</param>
    this.Delete = function ($compile, TemplateId, DcPlaceId, TabIndex, TotalRecordsCount) {
        try {
            OneViewConsole.Debug("DELETE start", "MyAuditFacade.DELETE");

            _MyAuditBO.Delete($compile, TemplateId, DcPlaceId, TabIndex);

            OneViewConsole.Debug("DELETE end", "MyAuditFacade.DELETE");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.DELETE", xlatService);
        }
    }


    /// <summary>
    /// Clear dc event registration
    /// </summary>
    /// <param name="TemplateId">Template id</param>   
    /// <param name="DcPlaceId">DCPlace id</param>      
    /// <param name="TabIndex">Tab index</param>
    this.Clear = function ($compile, TemplateId, DcPlaceId, TabIndex, TotalRecordsCount) {
        try {
            OneViewConsole.Debug("Clear start", "MyAuditFacade.Clear");

            _MyAuditBO.Clear($compile, TemplateId, DcPlaceId, TabIndex);

            OneViewConsole.Debug("Clear end", "MyAuditFacade.Clear");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.Clear", xlatService);
        }
    }


    /// <summary>
    /// Approve dc event registration
    /// TODO:DcPlaceDimension hard code need to change (DATEntityType.OrganizationAssestsNode)
    /// </summary>
    /// <param name="TemplateId">Template id</param>   
    /// <param name="DcPlaceId">DCPlace id</param>      
    /// <param name="TabIndex">Tab index</param>
    this.Approve = function (TemplateId, DcPlaceId, TabIndex, TotalRecordsCount) {
        try {
 

            OneViewConsole.Debug("APPROVE start", "MyAuditFacade.APPROVE");
            var Url = '/my-approval?TemplateId=' + TemplateId + '&DcPlaceId=' + DcPlaceId + '&DcPlaceDimension=' + DATEntityType.OrganizationAssestsNode + '&TotalRecordsCount=' + TotalRecordsCount + '';

            //var Url = '/my-approval'+?page=2';
            $location.url(Url);
           
            OneViewConsole.Debug("APPROVE end", "MyAuditFacade.APPROVE");
        }
        catch (Excep) {

            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.APPROVE", xlatService);
        }
    }


    /// <summary>
    /// Upload dc event registration
    /// </summary>
    /// <param name="$compile">Angular compilation for making dynamic html</param>
    /// <param name="TemplateId">Template id</param>   
    /// <param name="DcPlaceId">DCPlace id</param>      
    /// <param name="TabIndex">Tab index</param>
    this.Upload = function ($compile, TemplateId, DcPlaceId, TabIndex, TotalRecordsCount, DCPlaceName) {

        try {
            OneViewConsole.Debug("Upload start", "MyAuditFacade.Upload");
            var IsCheckForUpdateRequired = true;
            // Network status checking
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

            if (NetworkStatus.IsNetworkAvailable == true) {
                //
                var oAPKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
                var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
                if (oAPKUpgradeProcessStatus != null) {
                    oAPKUpgradeProcessStatus = JSON.parse(oAPKUpgradeProcessStatus);
                    oAPKUpgradeProcessBO.SetUpgradeStepCompleted(oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName, oAPKUpgradeProcessStatus.LatestVersion);
                    if (oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted != true) {
                        IsCheckForUpdateRequired = false;
                        $location.url('/APKUpgrade');
                    }
                    else {
                        OneViewLocalStorage.Remove("APKUpgradeProcessStatus");
                        //check for update
                    }
                }

                if (IsCheckForUpdateRequired == true) {
                    var response = oAPKUpgradeProcessBO.CheckIsUpgradeAvailable();
                    if (response.IsUpgradeAvailable == true) {                        
                        //alert(xlatService.xlat('NewUpdateAvailablePart1') + response.LatestVersion + xlatService.xlat('NewUpdateAvailablePart2') + response.CurrentVersion);
                        //download metadata
                        var _oAPKUpgradeProcessMetadataDownloadBO = new APKUpgradeProcessMetadataDownloadBO(xlatService);
                        var Result = _oAPKUpgradeProcessMetadataDownloadBO.DownloadMetadataFromServer();
                        //Metadata downloaded , then go to APKUpgradePage
                        if (Result.IsSuccess == true) {
                            var IsUpgradeSkipAllowed = oAPKUpgradeProcessBO.CheckUpgradeSkipAllowed(response.CurrentVersion, Result.APKUpgradeProcessMetadata);
                            //alert('IsUpgradeSkipAllowed : ' + IsUpgradeSkipAllowed);
                            var NewUpdateMsg = oAPKUpgradeProcessBO.FormUpgradeStartMessage(xlatService);

                            if (IsUpgradeSkipAllowed == true) {
                                var IsOperationAccessAllowed = oAPKUpgradeProcessBO.ValidationForAPKUpgradeProcess("IsAllowDcUpload");

                                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                                oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat(NewUpdateMsg + '\n\nDo you want to continue ?'), function (ConfirmationId) {

                                    if (ConfirmationId == "2") {
                                        if (IsOperationAccessAllowed == true) {
                                            alert('OperationAccessPermissionKey = IsAllowDcUpload  , IsOperationAccessAllowed = ' + IsOperationAccessAllowed + ' , Not implemented exception.');
                                        }
                                        else {
                                            //navigate to upgrade
                                            $location.url('/APKUpgrade');
                                            $scope.$apply();
                                        }
                                    }                                   
                                });
                            }
                            else {
                                alert(NewUpdateMsg);                               
                                if (IsOperationAccessAllowed == true) {
                                    alert('OperationAccessPermissionKey = IsAllowDcUpload  , IsOperationAccessAllowed = ' + IsOperationAccessAllowed + ' , Not implemented exception.');
                                }
                                else {
                                    //navigate to upgrade
                                    $location.url('/APKUpgrade');
                                }
                            }
                        }
                        else {
                            //go to error page
                            $location.url('/notifycall?MessageKey=' + Result.Message);
                        }
                    }
                    else {
                        ////Upload
                        _MyAuditBO.Upload($compile, TemplateId, DcPlaceId, TabIndex, false, TotalRecordsCount, DCPlaceName);
                    }
                }

               
            }
            else {
                // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No internet connection", "UploadDcFacade.Upload");
            }

            OneViewConsole.Debug("Upload end", "MyAuditFacade.Upload");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.Upload", xlatService);
        }
        finally {
            oOneViewCordovaPlugin = null;
            NetworkStatus = null;
        }
    }


    /// <summary>
    /// GroupUpload dc event registration
    /// </summary>
    /// <param name="TemplateId">Template id</param>       
    /// <param name="TabIndex">Tab index</param>
    this.GroupUpload = function (TemplateId, TabIndex) {

        try {
            OneViewConsole.Debug("GROUP_UPLOAD start", "MyAuditFacade.GROUP_UPLOAD");

            // Network status checking
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

            if (NetworkStatus.IsNetworkAvailable == true) {
                _MyAuditBO.Upload(TemplateId, -1, TabIndex, true);
                MyInstance.Init();
                MyInstance.PageLoad();
            }
            else {
                //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No internet connection", "UploadDcFacade.Upload");
            }

            OneViewConsole.Debug("GROUP_UPLOAD end", "MyAuditFacade.GROUP_UPLOAD");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.UPLOAD", xlatService);
        }
        finally {
            oOneViewCordovaPlugin = null;
            NetworkStatus = null;
        }
    }


    /// <summary>
    /// Graph search
    /// </summary>
    /// <param name="GraphSearchElement">Graph Search Element</param>         
    this.GraphSearch = function ($scope, $compile, GraphSearchElement, MyAuditIsTemplateView) {  
        _MyAuditBO.GraphSearch($scope, $compile, GraphSearchElement, MyAuditIsTemplateView);
    }

    //Note: Only for IFFCO Client -(Follow-up user is determined by Column1 value in UserMasterEntity)
    var CheckIsFollowUpUser = function () {

        var IsFollowUpUser = false;

        try {

            if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 24) {

                var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
                var _oDefaultMasterDAO = new DefaultMasterDAO("UserMasterEntity");
                var UserDetails = _oDefaultMasterDAO.GetByServerId(LoginUserId);
                //alert('UserDetails : ' + JSON.stringify(UserDetails));
                if (UserDetails != null && UserDetails.length > 0) {
                    if (UserDetails[0].Column1 == "AFU") {
                        IsFollowUpUser = true;
                    }
                }
            }

            return IsFollowUpUser;
        }
        catch (Excep) {
            IsFollowUpUser = false;
            throw Excep;
        }

        return IsFollowUpUser;
    }
}


// MyAuditBO
function MyAuditBO($scope, $location, xlatService, toaster) {

    var MyInstance = this;

    this.MyAuditPageComponentKey = "DefaultMyAuditPageComponent";
    
    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    /// <summary>
    /// Page load for MyAuditBO
    /// </summary>    
    /// <param name="$compile">Angular compilation for making dynamic html</param>
    /// <param name="ChangeViewMode">Templatewise view or place wise view</param>    
    this.PageLoad = function ($compile, ChangeViewMode) {

        try {
            OneViewConsole.Debug("PageLoad start", "MyAuditBO.PageLoad");

            if (ChangeViewMode != true) {
                LoadMyAuditPageConfig();
            }
            if (MyAuditPageConfig != null) {

                MyAuditIsTemplateView = (MyAuditIsTemplateView == null) ? MyAuditPageConfig.IsTemplateView : MyAuditIsTemplateView;

                if (ChangeViewMode == true) {
                    MyAuditIsTemplateView = (MyAuditIsTemplateView == true) ? false : true;
                    ClearTabs();
                }
                
                var _oMyAuditFactory = new MyAuditFactory();
                var _oMyAuditPageComponent = _oMyAuditFactory.GetMyAuditPageComponent(this.MyAuditPageComponentKey);
                _oMyAuditPageComponent.Load($scope, $compile, MyAuditPageConfig, MyAuditIsTemplateView);
            }

            OneViewConsole.Debug("PageLoad end", "MyAuditBO.PageLoad");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.PageLoad", Excep);
        }
    }


    /// <summary>
    /// Load ViewRecordsPage
    /// </summary> 
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">DCPlace id</param>  
    this.LoadViewRecordsPage = function (TemplateId, DcPlaceId, DcPlaceName, TemplateName) {

        try {
            OneViewConsole.Debug("LoadViewRecordsPage start", "MyAuditBO.LoadViewRecordsPage");

            SetTemplateAndDcPlaceDetails(TemplateId, DcPlaceId, DcPlaceName, TemplateName);
            OneViewSessionStorage.Remove("DcId");
            OneViewSessionStorage.Save("MyAuditEditForm", true);
            OneViewSessionStorage.Save("LandingPageEditForm", false);

            var IsCompleted = '-1';
            var IsSynchronized = '-1';

            if ($scope.MyAudit == "History") {
                IsCompleted = 'true';
                IsSynchronized = 'true';
            }
            
            var Url = '/ViewRecords?IsCompleted=' + IsCompleted + '&IsSynchronized=' + IsSynchronized + '';
            $location.url(Url);

            OneViewConsole.Debug("LoadViewRecordsPage end", "MyAuditBO.LoadViewRecordsPage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.LoadViewRecordsPage", Excep);
        }
    }


    /// <summary>
    /// Upload dc
    /// </summary>  
    /// <param name="TemplateId">Template id</param>   
    /// <param name="DcPlaceId">DCPlace id</param>      
    /// <param name="TabIndex">Tab index</param>
    /// <param name="IsGroupUpload">true or false</param>
    this.Upload = function ($compile, TemplateId, DcPlaceId, TabIndex, IsGroupUpload, TotalRecordsCount, DCPlaceName) {

        try {
            OneViewConsole.Debug("Upload start", "MyAuditBO.Upload");

            if (TabIndex != 3 ) {

                MyAuditUploadProgressValue = 0;
                MyAuditUploadBatchNumber = 1;

                var DCBOKey = GetDCBOKey(TabIndex);
                var _oDcFilterParamRequest = null;

                if (DCBOKey != "") {
                    var _oMyAuditFactory = new MyAuditFactory();
                    var _oMyAuditBOComponent = _oMyAuditFactory.GetMyAuditBOComponent(DCBOKey);
                    _oDcFilterParamRequest = _oMyAuditBOComponent.MakeDcFilterRequest(TemplateId, DcPlaceId, TabIndex, IsGroupUpload, DCPlaceName);
                }

                var _oDcDAO = new DcDAO();
                MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFilters(_oDcFilterParamRequest);

                var TotalBatches = MyAuditTotalDCCountForUpload / MyAuditUploadLimit;
                TotalBatches = Math.ceil(TotalBatches);

                MyAuditUploadProgressValue = 100 / TotalBatches;

                if (MyAuditTotalDCCountForUpload > 0) {

                    var Message = xlatService.xlat('Upload_confirm_Message');                   

                    var MultiMediaValidationResponse = MultiMediaValidation();
                    if (MultiMediaValidationResponse.IsSuccess == false) {
                        Message = xlatService.xlat(MultiMediaValidationResponse.MessageKey) ;
                    }

                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);
                    if (IsSuccess == true) {

                        oOneViewProgressbar.Start("Uploading");

                        if (MultiMediaValidationResponse.IsSuccess == false) {
                            DeleteUnAvailableMultiMediaSubElements(MultiMediaValidationResponse.ValidationFailedMultiMediaSubElements);
                        }

                        var _oUploadBO = new UploadBO(xlatService, toaster);

                        var _oDcPendingTaskBO = new DcPendingTaskBO();
                        _oDcPendingTaskBO.Download();

                        var IsMultiMediaSubElementsSuccess = _oUploadBO.UploadMultiMediaSubElements();

                        if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == true) {
                            
                            var IsSyncDynamicRcoAndAssetNodesSuccess = _oUploadBO.SyncDynamicRcoAndAssetNodes(true);

                            if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == true) {

                                _oUploadBO.BatchUpload(_oDcFilterParamRequest);

                                var _oDcDeletion = new DcDeletion();
                                _oDcDeletion.DeleteCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                                _oDcDeletion.DeleteInCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                                _oDcDeletion.DeleteInCompleteAndSyncedDataInDays(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                                _oDcDeletion.DeleteInCompleteAndSyncedDataFromNow(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                                _oDcDeletion.DeleteCompletedSyncAndApprovedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                                _oDcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);

                                //var _oOneViewAppConfig = new OneViewAppConfig();
                                //_oOneViewAppConfig.CheckForNewUpdates(toaster);
                            }
                            else if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == false) {
                                navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
                            }
                        }
                        else if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == false) {                           
                            navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
                        }

                        ClearTabs();
                        this.PageLoad($compile);

                        oOneViewProgressbar.Stop();
                    }
                }
                else {
                    //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoDataForUpload'));
                    navigator.notification.alert(xlatService.xlat('NoDataForUpload'), ['OK'], "");
                    OneViewConsole.Info("No dc available", "UploadDcFacade.UploadDcAndAction");
                }
            }
            else {
                //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('AlreadyUpload'));
                navigator.notification.alert(xlatService.xlat('AlreadyUpload'), ['OK'], "");
                OneViewConsole.Info("This records already uploaded", "UploadDcFacade.UploadDcAndAction");
            }

            OneViewConsole.Debug("Upload end", "MyAuditBO.Upload");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.Upload", Excep);
        }
        finally {
            _oDcFilterParamRequest = null;
            _oDcDAO = null;
            TotalBatches = null;
            Message = null;
            IsSuccess = null;
            _oUploadBO = null;
            IsSyncDynamicRcoAndAssetNodesSuccess = null;
            _oDcDeletion = null;
        }
    }


    //
    var MultiMediaValidation = function () {

        try {
            OneViewConsole.Debug("MultiMediaValidation start", "MyAuditBO.MultiMediaValidation");

            var Result = { IsSuccess: true, MessageKey: "", ValidationFailedMultiMediaSubElements: [] };

            var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
            var Response = _oMultiMediaSubElementsDAO.GetAllMultiMediaUnSyncMultiMediaSubElement();

            var _OneViewAppInfoPlugin = new OneViewAppInfoPlugin();
            //var ValidationFailedMultiMediaSubElements = [];
            var IsFileExist = true;


            for (var i = 0; i < Response.length; i++) {
                var IsFileExist = _OneViewAppInfoPlugin.IsFileExist(Response[i].LocalURL.substring(7));
                if (IsFileExist == false) {
                    Result.ValidationFailedMultiMediaSubElements.push(Response[i]);
                }
            }

            if (Result.ValidationFailedMultiMediaSubElements.length > 0) {
                Result.IsSuccess = false;
                //Result.MessageKey = "IN-MG-LDP-001 :: File not exist In local.Are you sure you want to Upload?";
                Result.MessageKey = "Upload_confirm_Message_ForMultiMediaValidation";            
            }
       
            OneViewConsole.Debug("MultiMediaValidation end", "MyAuditBO.MultiMediaValidation");
            return Result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.MultiMediaValidation", Excep);
        }
        finally {
        }
    }

    var DeleteUnAvailableMultiMediaSubElements = function (ValidationFailedMultiMediaSubElementsLst) {

        try {
            OneViewConsole.Debug("MyAuditBO start", "MyAuditBO.DeleteUnAvailableMultiMediaSubElements");

            if (ValidationFailedMultiMediaSubElementsLst.length > 0) {
                var _oMultiMediaSubElements = new DefaultMasterDAO("MultiMediaSubElements");
                var MultiMediaSubElementsList = _oMultiMediaSubElements.DeleteByProperty(ValidationFailedMultiMediaSubElementsLst, "Id", "INT");
            }

            OneViewConsole.Debug("MyAuditBO end", "MyAuditBO.DeleteUnAvailableMultiMediaSubElements");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.DeleteUnAvailableMultiMediaSubElements", Excep);
        }
        finally {
        }
    }

    /// <summary>
    /// Delete dc
    /// </summary>  
    /// <param name="TemplateId">Template id</param>   
    /// <param name="DcPlaceId">DCPlace id</param>      
    /// <param name="TabIndex">Tab index</param>
    this.Delete = function ($compile, TemplateId, DcPlaceId, TabIndex) {

        try {
            OneViewConsole.Debug("Delete start", "MyAuditBO.Delete");

            var Message = 'IN-MG-MAU-001 :: Are you sure you want to Delete ?';
            var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

            if (IsSuccess == true) {

                var DCBOKey = GetDCBOKey(TabIndex);

                if (DCBOKey != "") {
                    var _oMyAuditFactory = new MyAuditFactory();
                    var _oMyAuditBOComponent = _oMyAuditFactory.GetMyAuditBOComponent(DCBOKey);
                    _oMyAuditBOComponent.DeleteAllDC(ServiceId, DcPlaceId, TemplateId, LoginUserId, TabIndex);
                }

                alert("IN-SU-MAU-002 :: Deleted successfully");

                ClearTabs();
                this.PageLoad($compile);
            }

            OneViewConsole.Debug("Delete end", "MyAuditBO.Delete");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.Delete", Excep);
        }
    }


    /// <summary>
    /// Clear dc
    /// </summary>  
    /// <param name="TemplateId">Template id</param>   
    /// <param name="DcPlaceId">DCPlace id</param>      
    /// <param name="TabIndex">Tab index</param>
    this.Clear = function ($compile, TemplateId, DcPlaceId, TabIndex) {

        try {
            OneViewConsole.Debug("Clear start", "MyAuditBO.Clear");

            var DCBOKey = GetDCBOKey(TabIndex);

            if (DCBOKey != "") {

                var _oMyAuditFactory = new MyAuditFactory();
                var _oMyAuditBOComponent = _oMyAuditFactory.GetMyAuditBOComponent(DCBOKey);
                var oDcFilterParamRequest = _oMyAuditBOComponent.MakeClearRequest(ServiceId, DcPlaceId, TemplateId, LoginUserId, TabIndex);

                var _oMyAuditDAO = new MyAuditDAO();
                oDcFilterParamRequest.IsSynchronized = false;

                var DCCount = _oMyAuditDAO.GetAllDCCount(oDcFilterParamRequest);

                if (DCCount > 0) {
                    var Message = 'IN-MG-MAU-003 :: ' + DCCount + ' Data cature(s) not synchronized with server. Are you sure you want to Delete ?';

                }
                else {
                    var Message = 'IN-MG-MAU-004 :: Are you sure you want to Delete ?';
                }

                var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                if (IsSuccess == true) {

                    if (TabIndex == 1) {

                        if (MyAuditPageConfig != null && MyAuditPageConfig.PendingMyDCTabConfigMetaData.ClearConfig != undefined && MyAuditPageConfig.PendingMyDCTabConfigMetaData.ClearConfig != null) {

                            if (MyAuditPageConfig.PendingMyDCTabConfigMetaData.ClearConfig.IsManualSelectionEnable == false) {

                                if (MyAuditPageConfig.PendingMyDCTabConfigMetaData.ClearConfig.IsSynchronized == null) {

                                    oDcFilterParamRequest.IsSynchronized = -1;
                                }
                                else {
                                    oDcFilterParamRequest.IsSynchronized = MyAuditPageConfig.PendingMyDCTabConfigMetaData.ClearConfig.IsSynchronized;
                                }
                            }
                        }
                        _oMyAuditDAO.ClearAllDC(oDcFilterParamRequest);

                        ClearTabs();
                        this.PageLoad($compile);
                    }

                    alert("IN-SU-MAU-005 :: Deleted successfully");
                }
            }

            OneViewConsole.Debug("Clear end", "MyAuditBO.Clear");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.Clear", Excep);
        }
    }


    /// <summary>
    /// Load new dc page
    /// </summary>  
    this.NewDC = function () {

        try {
            OneViewConsole.Debug("Upload start", "MyAuditBO.Upload");

            var UserId = OneViewSessionStorage.Get("LoginUserId");
            var query = "SELECT * FROM DcProfileEntity WHERE DcUserId= " + UserId;
            var result = window.OneViewSqlite.excecuteSqlReader(query);
            var queryresult = JSON.parse(result);
            if (queryresult.length > 0) {
                var oDcScheduleCheckingComponent = new DcScheduleCheckingComponent();
                var IsProfileExists = oDcScheduleCheckingComponent.CheckIsAnyValidProfileExists(-1, -1, -1);
               // alert('oDcProfileList' + JSON.stringify(oDcProfileList));              
                var ShowNotStartedDCProfiles = 1;
                var ShowInProgressDCProfiles = 0;
                var ShowCompletedDCProfiles = 0;
                var ShowInProgressOrCompletedDCProfiles = 0;
                if (IsProfileExists == true) {
                    $location.url('/newdc?ShowNotStartedDCProfiles=' + ShowNotStartedDCProfiles + '&ShowInProgressDCProfiles=' + ShowInProgressDCProfiles + '&ShowCompletedDCProfiles=' + ShowCompletedDCProfiles + '&ShowInProgressOrCompletedDCProfiles=' + ShowInProgressOrCompletedDCProfiles + '');
                }
                else {
                    alert("IN-NF-MAU-004 :: No valid profiles available.");
                }
            }
            else {
                //  toaster.pop('warning', xlatService.xlat('Title_Notification'), "No profiles are available to conduct data capture");
                alert("IN-NF-MAU-003 :: No profiles are available to conduct data capture");
            }

            OneViewConsole.Debug("Upload end", "MyAuditBO.Upload");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.NewDC", Excep);
        }
        finally {
            UserId = null;
            query = null;
            result = null;
            queryresult = null;
        }
    }


    /// <summary>
    /// Graph search
    /// </summary>
    /// <param name="GraphSearchElement">Graph Search Element</param>         
    this.GraphSearch = function ($scope, $compile, GraphSearchElement, MyAuditIsTemplateView) {

        try {          
            if (MyAuditPageConfig != null) {

                ClearTabs();

                var _oMyAuditFactory = new MyAuditFactory();
                var _oMyAuditPageComponent = _oMyAuditFactory.GetMyAuditPageComponent(this.MyAuditPageComponentKey);
                
                if (GraphSearchElement == "") {
                    _oMyAuditPageComponent.LoadHtml($scope, $compile, MyAuditDCTemplates, MyAuditDCPlaces, MyAuditIsTemplateView);
                }
                else {

                    GraphSearchElement = GraphSearchElement.split(" ");

                    //alert(MyAuditIsTemplateView);

                    if (MyAuditIsTemplateView == true) {

                        var SearchDCTemplatesIndex = 0;
                        var SearchDCTemplates = new Array();

                        //alert(JSON.stringify(MyAuditDCTemplates));

                        for (var i = 0; i < MyAuditDCTemplates.length; i++) {

                            var IsSuccess = IsSearchElementsExist(MyAuditDCTemplates[i].TemplateNodeName, GraphSearchElement);

                            if (IsSuccess == true) {
                                SearchDCTemplates[SearchDCTemplatesIndex] = MyAuditDCTemplates[i];
                                SearchDCTemplatesIndex += 1;
                            }
                        }

                        //alert(JSON.stringify(SearchDCTemplates));

                        _oMyAuditPageComponent.LoadHtml($scope, $compile, SearchDCTemplates, MyAuditDCPlaces, MyAuditIsTemplateView);
                    }
                    else {
                        var SearchDCPlacesIndex = 0;
                        var SearchDCPlaces = new Array();

                        //alert(JSON.stringify(MyAuditDCPlaces));

                        for (var i = 0; i < MyAuditDCPlaces.length; i++) {

                            var IsSuccess = IsSearchElementsExist(MyAuditDCPlaces[i].DcPlaceName, GraphSearchElement);

                            if (IsSuccess == true) {
                                SearchDCPlaces[SearchDCPlacesIndex] = MyAuditDCPlaces[i];
                                SearchDCPlacesIndex += 1;
                            }
                        }

                        //alert(JSON.stringify(SearchDCPlaces));

                        _oMyAuditPageComponent.LoadHtml($scope, $compile, MyAuditDCTemplates, SearchDCPlaces, MyAuditIsTemplateView);
                    }
                }
            }
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.GraphSearch", Excep);
        }
    }


    /// <summary>
    /// Search Elements Exist or not
    /// </summary> 
    /// <param name="SearchArray">Array of search elements</param>
    /// <returns>true or false</returns> 
    var IsSearchElementsExist = function (SourceKey, SearchKeys) {

        try {
            var IsSuccess = true;

            for (var i = 0; i < SearchKeys.length; i++) {
                if (SourceKey.toLowerCase().indexOf(SearchKeys[i].toLowerCase()) == -1) {
                    IsSuccess = false;
                    break;              
                }
            }

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.IsSearchElementsExist", Excep);
        }
    }


    /// <summary>
    /// Get DC BO Key
    /// </summary> 
    /// <param name="TabIndex">Tab index</param>
    /// <returns>DCBOKey</returns>  
    var GetDCBOKey = function (TabIndex) {

        try {
            OneViewConsole.Debug("GetDCBOKey start", "MyAuditBO.GetDCBOKey");

            var DCBOKey = "";

            if (MyAuditPageConfig != null) {

                if (TabIndex == 1) {
                    DCBOKey = MyAuditPageConfig.PendingMyDCTabConfigMetaData.PendingDCBOKey;
                }
                else if (TabIndex == 2) {
                    DCBOKey = MyAuditPageConfig.ApprovedMyDCTabConfigMetaData.ApprovedDCBOKey;
                }
                else {
                    DCBOKey = MyAuditPageConfig.HistoryMyDCTabConfigMetaData.HistoryDCBOKey;
                }
            }

            return DCBOKey;

            OneViewConsole.Debug("GetDCBOKey end", "MyAuditBO.GetDCBOKey");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.GetDCBOKey", Excep);
        }      
    }


    /// <summary>
    /// Set Template And DcPlaceDetails for view records
    /// </summary> 
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">DCPlace id</param>  
    var SetTemplateAndDcPlaceDetails = function (TemplateId, DcPlaceId, DcPlaceName, TemplateName) {
        try {
            OneViewConsole.Debug("SetTemplateAndDcPlaceDetails start", "MyAuditBO.SetTemplateAndDcPlaceDetails");

            OneViewSessionStorage.Save("TemplateId", TemplateId);
            OneViewSessionStorage.Save("TemplateName", TemplateName);
            OneViewSessionStorage.Save("DcPlaceId", DcPlaceId);
            OneViewSessionStorage.Save("DcPlaceName", DcPlaceName);

            OneViewConsole.Debug("SetTemplateAndDcPlaceDetails end", "MyAuditBO.SetTemplateAndDcPlaceDetails");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.SetTemplateAndDcPlaceDetails", Excep);
        }
    }


    /// <summary>
    /// Load MyAuditPageConfig
    /// </summary> 
    var LoadMyAuditPageConfig = function () {

        try {
            OneViewConsole.Debug("LoadMyAuditPageConfig start", "MyAuditBO.LoadMyAuditPageConfig");

            var PageConfig = {
                
                "IsTemplateView": true,
           
                "PendingMyDCTabConfigMetaData": {                    
                    "FilterParameterConfig": [],
                    "IsEditEnable": true,
                    "IsClearEnable": true,
                    "IsDeleteEnable": false,
                    "IsUploadEnable": true,
                    "IsApproveEnable": false,
                    "IsMoreEnable": false,
                    "IsHandOverProfileEnable": false,
                    "PendingDCBOKey": "DefaultMyAuditDCBO",
                    "ClearConfig": {
                        "IsAllUser": true,
                        "IsSynchronized": null, // true, false and null
                        "IsCompleted": null, // true, false and null
                        "IsManualSelectionEnable": false // true, false and null
                    }
                },

                "ApprovedMyDCTabConfigMetaData": {                   
                    "FilterParameterConfig": [],
                    "IsDeleteEnable": false,
                    "IsUploadEnable": true,
                    "IsMoreEnable": false,
                    "ApprovedDCBOKey": "DefaultMyAuditDCBO"
                },

                "HistoryMyDCTabConfigMetaData": {                  
                    "FilterParameterConfig": [],
                    "IsDeleteEnable": false,
                    "IsMoreEnable": false,
                    "IsEditEnable": true,
                    "HistoryDCBOKey": "DefaultMyAuditDCBO"
                }                           
            }

            MyAuditPageConfig = PageConfig;

            OneViewConsole.Debug("LoadMyAuditPageConfig end", "MyAuditBO.LoadMyAuditPageConfig");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.LoadMyAuditPageConfig", Excep);
        }
    }


    /// <summary>
    /// Clear All Tabs (Pending, Approved and History)
    /// </summary> 
    var ClearTabs = function () {

        try {
            OneViewConsole.Debug("ClearTabs start", "MyAuditBO.ClearTabs");

            document.getElementById('divPending').innerHTML = "";
            document.getElementById('divApproved').innerHTML = "";
            document.getElementById('divHistory').innerHTML = "";

            OneViewConsole.Debug("ClearTabs end", "MyAuditBO.ClearTabs");
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.ClearTabs", Excep);
        }
    }
}


// DefaultMyAuditPageComponent
function DefaultMyAuditPageComponent() {

    this.MyAuditTabComponent = "DefaultMyAuditTabComponent";

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    /// <summary>
    /// Page load for DefaultMyAuditPageComponent
    /// </summary>
    /// <param name="$scope">Current scope</param>
    /// <param name="$compile">Angular compilation for making dynamic html</param>
    /// <param name="MyAuditPageConfig">Page configuration</param>     
    this.Load = function ($scope, $compile, MyAuditPageConfig, MyAuditIsTemplateView) {

        try {
            OneViewConsole.Debug("Load start", "DefaultMyAuditPageComponent.Load");

            var _oDcDAO = new DcDAO();

            MyAuditDCTemplates = _oDcDAO.GetUserTemplates(LoginUserId, ServiceId);
            MyAuditDCPlaces = _oDcDAO.GetUserDcPlaces(LoginUserId, ServiceId);

            //alert("DCTemplates : " + JSON.stringify(MyAuditDCTemplates));
            //alert("DCPlaces : " + JSON.stringify(MyAuditDCPlaces));

            this.LoadHtml($scope, $compile, MyAuditDCTemplates, MyAuditDCPlaces, MyAuditIsTemplateView);

            OneViewConsole.Debug("Load end", "DefaultMyAuditPageComponent.Load");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditPageComponent.Load", Excep);
        }
    }


    /// <summary>
    /// LoadHtml on page
    /// </summary>
    /// <param name="$scope">Current scope</param>
    /// <param name="$compile">Angular compilation for making dynamic html</param>
    /// <param name="PendingHtml">Html for pennding tab</param>  
    /// <param name="ApprovedHtml">Html for Approved tab</param>  
    /// <param name="HistoryHtml">Html for History tab</param>  
    this.LoadHtml = function ($scope, $compile, DCTemplates, DCPlaces, MyAuditIsTemplateView) {

        try {
            OneViewConsole.Debug("LoadHtml start", "DefaultMyAuditPageComponent.LoadHtml");

            var _oMyAuditFactory = new MyAuditFactory();
            var _oMyAuditTabComponent = _oMyAuditFactory.GetMyAuditTabComponent(this.MyAuditTabComponent);

            var PendingHtml = _oMyAuditTabComponent.GetHtml(MyAuditPageConfig.PendingMyDCTabConfigMetaData, MyAuditPageConfig.PendingMyDCTabConfigMetaData.PendingDCBOKey, MyAuditIsTemplateView, DCTemplates, DCPlaces, LoginUserId, ServiceId, MyAuditTabIndex.Pending);
            var ApprovedHtml = _oMyAuditTabComponent.GetHtml(MyAuditPageConfig.ApprovedMyDCTabConfigMetaData, MyAuditPageConfig.ApprovedMyDCTabConfigMetaData.ApprovedDCBOKey, MyAuditIsTemplateView, DCTemplates, DCPlaces, LoginUserId, ServiceId, MyAuditTabIndex.Approved);
            var HistoryHtml = _oMyAuditTabComponent.GetHtml(MyAuditPageConfig.HistoryMyDCTabConfigMetaData, MyAuditPageConfig.HistoryMyDCTabConfigMetaData.HistoryDCBOKey, MyAuditIsTemplateView, DCTemplates, DCPlaces, LoginUserId, ServiceId, MyAuditTabIndex.History);

            var _oOneViewCompiler = new OneViewCompiler();

            if (PendingHtml != "") {
                _oOneViewCompiler.CompileAndApeend($scope, $compile, PendingHtml, "divPending");
            }

            if (ApprovedHtml != "") {
                _oOneViewCompiler.CompileAndApeend($scope, $compile, ApprovedHtml, "divApproved");
            }

            if (HistoryHtml) {
                _oOneViewCompiler.CompileAndApeend($scope, $compile, HistoryHtml, "divHistory");
            }

            OneViewConsole.Debug("LoadHtml end", "DefaultMyAuditPageComponent.LoadHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditPageComponent.LoadHtml", Excep);
        }
    }
}


// DefaultMyAuditTabComponent
function DefaultMyAuditTabComponent() {


    /// <summary>
    /// Get tab html
    /// </summary>
    /// <param name="TabConfigMetaData">Tab configuration</param>
    /// <param name="DCBOKey">Key of the BO</param>
    /// <param name="IsTemplateView">Template wise view / Place wise view</param>
    /// <param name="DCTemplates">Total dc templates</param>
    /// <param name="DCPlaces">Total dc places</param>   
    /// <param name="LoginUserId">Login user id</param>
    /// <param name="ServiceId">Service id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>Tab html</returns>  
    this.GetHtml = function (TabConfigMetaData, DCBOKey, IsTemplateView, DCTemplates, DCPlaces, LoginUserId, ServiceId, TabIndex) {

        try {
            OneViewConsole.Debug("GetHtml start", "DefaultMyAuditTabComponent.GetHtml");

            var _oDefaultMyAuditTabComponent = new DefaultMyAuditTabComponent();

            var _oMyAuditFactory = new MyAuditFactory();
            var _oMyAuditBOComponent = _oMyAuditFactory.GetMyAuditBOComponent(DCBOKey);

            var _oDcDAO = new DcDAO();

            var Html = "";
            
            if (IsTemplateView == true) {

                for (var i = 0; i < DCTemplates.length; i++) {

                    var TotalRecordsCount = 0;
                    var RejectedRecordsCount = 0;
                    var IsSynchronized = false;
                    var HandoverRecordsCount = 0;
                    var NCRecordsCount = 0;

                    var HeaderHtml = _oDefaultMyAuditTabComponent.GetHeaderHtml(DCTemplates[i].TemplateNodeName.toUpperCase(), DCTemplates[i].TemplateNodeId, -1, TabIndex);
                    var ContentHtml = "";

                    for (var j = 0; j < DCPlaces.length; j++) {

                        if (_oDcDAO.IsProfileExists(LoginUserId, DCTemplates[i].TemplateNodeId, DCPlaces[j].DcPlaceId, ServiceId) && (DCPlaces[j].DcPlaceName != null && DCPlaces[j].DcPlaceName != 'null' && DCPlaces[j].DcPlaceName != '')) {

                            TotalRecordsCount = _oMyAuditBOComponent.GetTotalRecordsCount(ServiceId, DCPlaces[j].DcPlaceId, DCTemplates[i].TemplateNodeId, LoginUserId, TabIndex, DCPlaces[j].DcPlaceName);                            

                            if (DCTemplates[i].TemplateNodeId != 483) {
                                HandoverRecordsCount = (TabIndex != 3 && TabIndex != 2) ? _oMyAuditBOComponent.GetHandoverRecordsCount(ServiceId, DCPlaces[j].DcPlaceId, DCTemplates[i].TemplateNodeId, LoginUserId, TabIndex, DCPlaces[j].DcPlaceName) : HandoverRecordsCount;
                            }

                            if (TotalRecordsCount > 0) {
                                RejectedRecordsCount = (TabIndex == 1) ? _oMyAuditBOComponent.GetRejectedRecordsCount(ServiceId, DCPlaces[j].DcPlaceId, DCTemplates[i].TemplateNodeId, LoginUserId, TabIndex, DCPlaces[j].DcPlaceName) : RejectedRecordsCount;
                                IsSynchronized = (TabIndex != 3) ? _oMyAuditBOComponent.GetSyncStatus(ServiceId, DCPlaces[j].DcPlaceId, DCTemplates[i].TemplateNodeId, LoginUserId, TabIndex, DCPlaces[j].DcPlaceName) : IsSynchronized;
                                NCRecordsCount = _oMyAuditBOComponent.GetNCRecordsCount(ServiceId, DCPlaces[j].DcPlaceId, DCTemplates[i].TemplateNodeId, LoginUserId, TabIndex, DCPlaces[j].DcPlaceName);
                            }

                            if (TotalRecordsCount > 0 || HandoverRecordsCount > 0) {                                
                                ContentHtml += _oDefaultMyAuditTabComponent.GetContentHtml(DCPlaces[j].DcPlaceName.toUpperCase(), IsSynchronized, TotalRecordsCount, NCRecordsCount, HandoverRecordsCount, TabConfigMetaData, DCTemplates[i].TemplateNodeId, DCPlaces[j].DcPlaceId, TabIndex, DCPlaces[j].DcPlaceName, DCTemplates[i].TemplateNodeName, RejectedRecordsCount);                               
                            }
                        }
                    }

                    if (ContentHtml != "") {
                        Html += HeaderHtml + ContentHtml;
                    }
                }
            }
            else {
                for (var i = 0; i < DCPlaces.length; i++) {

                    var TotalRecordsCount = 0;
                    var RejectedRecordsCount = 0;
                    var IsSynchronized = false;
                    var HandoverRecordsCount = 0;
                    var NCRecordsCount = 0;

                    var HeaderHtml = _oDefaultMyAuditTabComponent.GetHeaderHtml(DCPlaces[i].DcPlaceName.toUpperCase(), -1, DCPlaces[i].DcPlaceId, TabIndex);
                    var ContentHtml = "";

                    for (var j = 0; j < DCTemplates.length; j++) {

                        if (_oDcDAO.IsProfileExists(LoginUserId, DCTemplates[j].TemplateNodeId, DCPlaces[i].DcPlaceId, ServiceId) && (DCTemplates[j].TemplateNodeName != null && DCTemplates[j].TemplateNodeName != 'null' && DCTemplates[j].TemplateNodeName != '')) {

                            TotalRecordsCount = _oMyAuditBOComponent.GetTotalRecordsCount(ServiceId, DCPlaces[i].DcPlaceId, DCTemplates[j].TemplateNodeId, LoginUserId, TabIndex, DCPlaces[i].DcPlaceName);

                            if (DCTemplates[i].TemplateNodeId != 483) {
                                HandoverRecordsCount = (TabIndex != 3 && TabIndex != 2) ? _oMyAuditBOComponent.GetHandoverRecordsCount(ServiceId, DCPlaces[i].DcPlaceId, DCTemplates[j].TemplateNodeId, LoginUserId, TabIndex, DCPlaces[i].DcPlaceName) : HandoverRecordsCount;
                            }

                            if (TotalRecordsCount > 0) {
                                RejectedRecordsCount = (TabIndex == 1) ? _oMyAuditBOComponent.GetRejectedRecordsCount(ServiceId, DCPlaces[i].DcPlaceId, DCTemplates[j].TemplateNodeId, LoginUserId, TabIndex, DCPlaces[i].DcPlaceName) : RejectedRecordsCount;
                                IsSynchronized = (TabIndex != 3) ? _oMyAuditBOComponent.GetSyncStatus(ServiceId, DCPlaces[i].DcPlaceId, DCTemplates[j].TemplateNodeId, LoginUserId, TabIndex, DCPlaces[i].DcPlaceName) : IsSynchronized;
                                NCRecordsCount = _oMyAuditBOComponent.GetNCRecordsCount(ServiceId, DCPlaces[i].DcPlaceId, DCTemplates[j].TemplateNodeId, LoginUserId, TabIndex, DCPlaces[i].DcPlaceName);
                            }

                            if (TotalRecordsCount > 0 || HandoverRecordsCount > 0) {
                                ContentHtml += _oDefaultMyAuditTabComponent.GetContentHtml(DCTemplates[j].TemplateNodeName.toUpperCase(), IsSynchronized, TotalRecordsCount, NCRecordsCount, HandoverRecordsCount, TabConfigMetaData, DCTemplates[j].TemplateNodeId, DCPlaces[i].DcPlaceId, TabIndex, DCPlaces[i].DcPlaceName, DCTemplates[j].TemplateNodeName, RejectedRecordsCount);
                            }
                        }
                    }

                    if (ContentHtml != "") {
                        Html += HeaderHtml + ContentHtml;
                    }
                }
            }

            OneViewConsole.Debug("GetHtml end", "DefaultMyAuditTabComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetHtml", Excep);
        }
    }


    /// <summary>
    /// Get tab html
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNode Id</param>
    /// <returns>true or false</returns>  
    var IsValidTemplate = function (TemplateNodeId) {

        try {
            var IsValid = false;
            if (TemplateNodeId != 66) {
                IsValid = true;
            }
            return IsValid;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.IsValidTemplate", Excep);
        }
    }


    /// <summary>
    /// Get header html
    /// </summary>
    /// <param name="Name">Name of the header</param>
    /// <returns>Header html</returns>  
    this.GetHeaderHtml = function (Name, TemplateNodeId, DcPlaceId, TabIndex) {

        try {
            OneViewConsole.Debug("GetHeaderHtml start", "DefaultMyAuditTabComponent.GetHeaderHtml");

            var DCPlaceName = "''";
            var TotalRecordsCount = 0;

            var Html = "";
            
            if (EnableGroupUpload == true && TabIndex == 1) {
                Html = '<div class="item item-button-right title-bar rounded margin-top">' +
                           Name +
                           '<a class="button button-light" style="top: 2px; right: 100px; font-size: 14px;" ng-click="Clear(' + TemplateNodeId + ',' + DcPlaceId + ',' + TabIndex + ',' + TotalRecordsCount + ',' + DCPlaceName + ')">' +
                                '<i class="icon icon-times-circle-o"></i><span class="hide-sm">Delete</span>' +
                           '</a>'+
                           '<a class="button button-light" style="top: 2px; right: 2px; font-size: 14px;" ng-click="Upload(' + TemplateNodeId + ',' + DcPlaceId + ',' + TabIndex + ',' + TotalRecordsCount + ',' + DCPlaceName + ')">' +
                                '<i class="icon icon-cloud-upload"></i><span class="hide-sm">Upload</span>' +
                           '</a>' +
                        '</div>';
            } else {
                Html = '<div class="title-bar rounded margin-top">' + Name + '</div>';              
            }

            return Html;

            OneViewConsole.Debug("GetHeaderHtml end", "DefaultMyAuditTabComponent.GetHeaderHtml");
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetHeaderHtml", Excep);
        }
    }


    /// <summary>
    /// Get content html
    /// </summary>
    /// <param name="Name">Name of the header</param>
    /// <param name="IsSynchronized">Synchronous status</param>
    /// <param name="TotalRecordsCount">Total no.of records</param>
    /// <param name="NCRecordsCount">Total nc records</param>
    /// <param name="HandoverRecordsCount">Total handover records</param>
    /// <param name="TabConfigMetaData">Tab configuration</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">Dc place id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>Content html</returns>  
    this.GetContentHtml = function (Name, IsSynchronized, TotalRecordsCount, NCRecordsCount, HandoverRecordsCount, TabConfigMetaData, TemplateId, DCPlaceId, TabIndex, DcPlaceName, TemplateName, RejectedRecordsCount) {

        try {
            OneViewConsole.Debug("GetContentHtml start", "DefaultMyAuditTabComponent.GetContentHtml");

            var ContentHeaderHtml = GetContentHeaderHtml(Name);
            var StatusHtml = GetStatusHtml(IsSynchronized, TotalRecordsCount, NCRecordsCount, HandoverRecordsCount, RejectedRecordsCount);
            var FooterHtml = GetFooterHtml(TemplateId, DCPlaceId, TabIndex, TabConfigMetaData, TotalRecordsCount, DcPlaceName, TemplateName);

            var Html = '<div class="my-audit-box white-box rounded"><div class="my-audit-box-left">' + ContentHeaderHtml + StatusHtml + FooterHtml + '</div></div>';

            OneViewConsole.Debug("GetContentHtml end", "DefaultMyAuditTabComponent.GetContentHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetContentHtml", Excep);
        }
    }


    /// <summary>
    /// Get content header html
    /// </summary>
    /// <param name="Name">Name of the content header</param>
    /// <returns>Content header html</returns>  
    var GetContentHeaderHtml = function (Name) {

        try {
            OneViewConsole.Debug("GetContentHeaderHtml start", "DefaultMyAuditTabComponent.GetContentHeaderHtml");

            var Html = '<h2>' + Name + '</h2><p class="no-margin"></p>';

            OneViewConsole.Debug("GetContentHeaderHtml end", "DefaultMyAuditTabComponent.GetContentHeaderHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetContentHeaderHtml", Excep);
        }
    }


    /// <summary>
    /// Get status html
    /// </summary>
    /// <param name="IsSynchronized">Synchronous status</param>
    /// <param name="TotalRecordsCount">Total no.of records</param>
    /// <param name="NCRecordsCount">Total nc records</param>
    /// <param name="HandoverRecordsCount">Total handover records</param>
    /// <returns>Status html</returns>  
    var GetStatusHtml = function (IsSynchronized, TotalRecordsCount, NCRecordsCount, HandoverRecordsCount, RejectedRecordsCount) {

        try {
            OneViewConsole.Debug("GetStatusHtml start", "DefaultMyAuditTabComponent.GetStatusHtml");

            var SyncStatusHtml = (IsSynchronized == true) ? GetSyncStatusHtml() : "";
            var TotalRecordsHtml = (TotalRecordsCount > 0) ? GetTotalRecordsHtml(TotalRecordsCount) : "";
            var NCRecordsHtml = (NCRecordsCount > 0) ? GetNCRecordsHtml(NCRecordsCount) : "";
            var RejectedRecordsHtml = (RejectedRecordsCount > 0) ? GetRejectedRecordsHtml(RejectedRecordsCount) : "";
            var HandoverRecordsHtml = (HandoverRecordsCount > 0) ? GetHandoverRecordsHtml(HandoverRecordsCount) : "";

            var Html = '<div class="text-right my-audit-status"><span class="badge no-padding"> </span>' + SyncStatusHtml + TotalRecordsHtml + NCRecordsHtml + RejectedRecordsHtml + HandoverRecordsHtml + '</div>';

            OneViewConsole.Debug("GetStatusHtml end", "DefaultMyAuditTabComponent.GetStatusHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetStatusHtml", Excep);
        }
    }


    /// <summary>
    /// Get sync status html
    /// </summary>   
    /// <returns>Sync status html</returns>  
    var GetSyncStatusHtml = function () {

        try {
            OneViewConsole.Debug("GetSyncStatusHtml start", "DefaultMyAuditTabComponent.GetSyncStatusHtml");

            var Html = '<i class="icon icon-loop balanced" style="margin-right:5px;"></i>';

            OneViewConsole.Debug("GetSyncStatusHtml end", "DefaultMyAuditTabComponent.GetSyncStatusHtml");

            return Html;            
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetSyncStatusHtml", Excep);
        }
    }


    /// <summary>
    /// Get total records html
    /// </summary>   
    /// <param name="TotalRecordsCount">Total no.of records</param>
    /// <returns>Total records html</returns> 
    var GetTotalRecordsHtml = function (TotalRecordsCount) {

        try {
            OneViewConsole.Debug("GetTotalRecordsHtml start", "DefaultMyAuditTabComponent.GetTotalRecordsHtml");

            var Html = '<span class="badge badge-positive" style="margin-right:5px;">Total Records: ' + TotalRecordsCount + '</span>';

            OneViewConsole.Debug("GetTotalRecordsHtml end", "DefaultMyAuditTabComponent.GetTotalRecordsHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetTotalRecordsHtml", Excep);
        }
    }


    // <summary>
    /// Get rejected records html
    /// </summary>   
    /// <param name="RejectedRecordsCount">Total no.of rejected records</param>
    /// <returns>Rejected records html</returns> 
    var GetRejectedRecordsHtml = function (RejectedRecordsCount) {

        try {
            OneViewConsole.Debug("GetRejectedRecordsHtml start", "DefaultMyAuditTabComponent.GetRejectedRecordsHtml");

            var Html = '<span class="badge badge-assertive">Total Rejected: ' + RejectedRecordsCount + '</span>';

            OneViewConsole.Debug("GetRejectedRecordsHtml end", "DefaultMyAuditTabComponent.GetRejectedRecordsHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetRejectedRecordsHtml", Excep);
        }
    }


    /// <summary>
    /// Get nc records html
    /// </summary>   
    /// <param name="NCRecordsCount">Total nc records</param>
    /// <returns>Nc records html</returns> 
    var GetNCRecordsHtml = function (NCRecordsCount) {

        try {
            OneViewConsole.Debug("GetNCRecordsHtml start", "DefaultMyAuditTabComponent.GetNCRecordsHtml");

            var Html = '<span class="badge badge-energized">Total NC: ' + NCRecordsCount + '</span>';

            OneViewConsole.Debug("GetNCRecordsHtml end", "DefaultMyAuditTabComponent.GetNCRecordsHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetNCRecordsHtml", Excep);
        }
    }


    /// <summary>
    /// Get handover records html
    /// </summary>   
    /// <param name="HandoverRecordsCount">Total handover records</param>
    /// <returns>Handover records html</returns> 
    var GetHandoverRecordsHtml = function (HandoverRecordsCount) {

        try {
            OneViewConsole.Debug("GetHandoverRecordsHtml start", "DefaultMyAuditTabComponent.GetHandoverRecordsHtml");

            var Html = '<div class="hand-over"><span class=""> ' + HandoverRecordsCount + '<br /><img src="images/hand_over.png" /></span></div>';

            OneViewConsole.Debug("GetHandoverRecordsHtml end", "DefaultMyAuditTabComponent.GetHandoverRecordsHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetHandoverRecordsHtml", Excep);
        }
    }


    /// <summary>
    /// Get footer html
    /// </summary>   
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">Dc place id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <param name="TabConfigMetaData">Tab configuration</param>  
    /// <param name="TotalRecordsCount">Total no.of records</param>
    /// <returns>Footer html</returns> 
    var GetFooterHtml = function (TemplateId, DCPlaceId, TabIndex, TabConfigMetaData, TotalRecordsCount, DcPlaceName, TemplateName) {

        try {
            OneViewConsole.Debug("GetFooterHtml start", "DefaultMyAuditTabComponent.GetFooterHtml");

            var EditButtonHtml = (TabConfigMetaData.IsEditEnable == true) ? GetEditButtonHtml(TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName, TemplateName) : "";
            var DeleteButtonHtml = (TabConfigMetaData.IsDeleteEnable == true) ? GetDeleteButtonHtml(TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName) : "";
            var ClearButtonHtml = (TabConfigMetaData.IsClearEnable == true) ? GetClearButtonHtml(TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName) : "";
            
            var UploadButtonHtml = (TabConfigMetaData.IsUploadEnable == true) ? GetUploadButtonHtml(TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName) : "";
            var MoreButtonHtml = (TabConfigMetaData.IsMoreOptionsEnable == true) ? GetMoreButtonHtml(TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName) : "";

            var ApproveButtonHtml = "";

            if (TabConfigMetaData.IsApproveEnable == true) {
                var ApprovalProfileStatus = CheckApprovalProfile();
                if(ApprovalProfileStatus == true){
                    ApproveButtonHtml = GetApproveButtonHtml(TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName);
                }
            }

            var Html = '<div class="attr-footer">' + EditButtonHtml + ClearButtonHtml + DeleteButtonHtml + ApproveButtonHtml + UploadButtonHtml + MoreButtonHtml + '</div>';

            OneViewConsole.Debug("GetFooterHtml end", "DefaultMyAuditTabComponent.GetFooterHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetFooterHtml", Excep);
        }
    }


    /// <summary>
    /// Get edit button html
    /// </summary>   
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">Dc place id</param>
    /// <param name="TabIndex">Tab index</param>    
    /// <param name="TotalRecordsCount">Total no.of records</param>
    /// <returns>Edit button html</returns> 
    var GetEditButtonHtml = function (TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName, TemplateName) {

        try {
            OneViewConsole.Debug("GetEditButtonHtml start", "DefaultMyAuditTabComponent.GetEditButtonHtml");

            var DCPlaceName = "'" + DcPlaceName + "'";
            var DCTemplateName = "'" + TemplateName + "'";

            var DisplayName = (TabIndex == 1) ? "Edit" : "View";

            var Html = '<div class="attr-footer-btn" ng-click="Edit(' + TemplateId + ',' + DCPlaceId + ',' + TabIndex + ',' + TotalRecordsCount + ',' + DCPlaceName + ',' + DCTemplateName + ')">' +
                            '<i class="icon icon-eye"></i><span class="hide-sm">' + DisplayName + '</span>' +
                        '</div>';

            OneViewConsole.Debug("GetEditButtonHtml end", "DefaultMyAuditTabComponent.GetEditButtonHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetEditButtonHtml", Excep);
        }
    }


    /// <summary>
    /// Get delete button html
    /// </summary>   
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">Dc place id</param>
    /// <param name="TabIndex">Tab index</param>    
    /// <param name="TotalRecordsCount">Total no.of records</param>
    /// <returns>Delete button html</returns> 
    var GetDeleteButtonHtml = function (TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetDeleteButtonHtml start", "DefaultMyAuditTabComponent.GetDeleteButtonHtml");

            var Html = '<div class="attr-footer-btn" ng-click="Delete(' + TemplateId + ',' + DCPlaceId + ',' + TabIndex + ',' + TotalRecordsCount + ')">' +
                            '<i class="icon icon-times-circle-o"></i><span class="hide-sm">Delete</span>' +
                       '</div>';

            OneViewConsole.Debug("GetDeleteButtonHtml end", "DefaultMyAuditTabComponent.GetDeleteButtonHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetDeleteButtonHtml", Excep);
        }
    }

    
    /// <summary>
    /// Get clear button html
    /// </summary>   
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">Dc place id</param>
    /// <param name="TabIndex">Tab index</param>    
    /// <param name="TotalRecordsCount">Total no.of records</param>
    /// <returns>Delete button html</returns> 
    var GetClearButtonHtml = function (TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetClearButtonHtml start", "DefaultMyAuditTabComponent.GetClearButtonHtml");

            var Html = '<div class="attr-footer-btn" ng-click="Clear(' + TemplateId + ',' + DCPlaceId + ',' + TabIndex + ',' + TotalRecordsCount + ')">' +
                            '<i class="icon icon-times-circle-o"></i><span class="hide-sm">Delete</span>' +
                       '</div>';

            OneViewConsole.Debug("GetClearButtonHtml end", "DefaultMyAuditTabComponent.GetClearButtonHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetClearButtonHtml", Excep);
        }
    }


    /// <summary>
    /// Get approve button html
    /// </summary>   
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">Dc place id</param>
    /// <param name="TabIndex">Tab index</param>    
    /// <param name="TotalRecordsCount">Total no.of records</param>
    /// <returns>Approve button html</returns> 
    var GetApproveButtonHtml = function (TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName) {

 
        try {
            OneViewConsole.Debug("GetApproveButtonHtml start", "DefaultMyAuditTabComponent.GetApproveButtonHtml");

            var Html = '<div class="attr-footer-btn" ng-click="Approve(' + TemplateId + ',' + DCPlaceId + ',' + TabIndex + ',' + TotalRecordsCount + ')">' +
                            '<i class="icon icon-check-circle-o"></i><span class="hide-sm">Approve</span>' +
                       '</div>';

            OneViewConsole.Debug("GetApproveButtonHtml end", "DefaultMyAuditTabComponent.GetApproveButtonHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetApproveButtonHtml", Excep);
        }
    }


    /// <summary>
    /// Get upload button html
    /// </summary>   
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">Dc place id</param>
    /// <param name="TabIndex">Tab index</param>    
    /// <param name="TotalRecordsCount">Total no.of records</param>
    /// <returns>Upload button html</returns> 
    var GetUploadButtonHtml = function (TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetUploadButtonHtml start", "DefaultMyAuditTabComponent.GetUploadButtonHtml");

            var DCPlaceName = "'" + DcPlaceName + "'";

            var Html = '<div class="attr-footer-btn" ng-click="Upload(' + TemplateId + ',' + DCPlaceId + ',' + TabIndex + ',' + TotalRecordsCount + ',' + DCPlaceName + ')">' +
                            '<i class="icon icon-cloud-upload"></i><span class="hide-sm">Upload</span>' +
                       '</div>';

            OneViewConsole.Debug("GetUploadButtonHtml end", "DefaultMyAuditTabComponent.GetUploadButtonHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetUploadButtonHtml", Excep);
        }
    }


    /// <summary>
    /// Get more button html
    /// </summary>   
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">Dc place id</param>
    /// <param name="TabIndex">Tab index</param>    
    /// <param name="TotalRecordsCount">Total no.of records</param>
    /// <returns>More button html</returns> 
    var GetMoreButtonHtml = function (TemplateId, DCPlaceId, TabIndex, TotalRecordsCount, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetMoreButtonHtml start", "DefaultMyAuditTabComponent.GetMoreButtonHtml");

            var Html = '<div class="attr-footer-btn" ng-click="More(' + TemplateId + ',' + DCPlaceId + ',' + TabIndex + ',' + TotalRecordsCount + ')">' +
                            '<i class="icon icon-ellipsis-v"></i><span class="hide-sm">More</span>' +
                       '</div>';

            OneViewConsole.Debug("GetMoreButtonHtml end", "DefaultMyAuditTabComponent.GetMoreButtonHtml");

            return Html;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.GetMoreButtonHtml", Excep);
        }
    }


    /// <summary>
    /// CheckApprovalProfile available or not
    /// </summary>   
    /// <param name="TemplateId">Template id</param>
    /// <param name="DCPlaceId">Dc place id</param>
    /// <param name="TabIndex">Tab index</param>        
    /// <returns>true or false</returns> 
    var CheckApprovalProfile = function (TemplateId, DCPlaceId, TabIndex) {

        try {
            OneViewConsole.Debug("CheckApprovalProfile start", "DefaultMyAuditTabComponent.CheckApprovalProfile");

            var IsSuccess = true;

            OneViewConsole.Debug("CheckApprovalProfile end", "DefaultMyAuditTabComponent.CheckApprovalProfile");

            return IsSuccess;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditTabComponent.CheckApprovalProfile", Excep);
        }
    }
}


// DefaultMyAuditDCBO
function DefaultMyAuditDCBO() {


    /// <summary>
    /// Make DcFilterRequest
    /// </summary>  
    /// <param name="TemplateId">Template id</param>   
    /// <param name="DcPlaceId">DCPlace id</param>      
    /// <param name="TabIndex">Tab index</param>
    /// <param name="IsGroupUpload">true or false</param>
    this.MakeDcFilterRequest = function (TemplateId, DcPlaceId, TabIndex, IsGroupUpload, DCPlaceName) {

        try {
            OneViewConsole.Debug("MakeDcFilterRequest start", "DefaultMyAuditDCBO.MakeDcFilterRequest");

            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var _oDcFilterParamRequest = new DcFilterParamRequest();
            _oDcFilterParamRequest.DcPlaceId = DcPlaceId;
            _oDcFilterParamRequest.TemplateNodeId = TemplateId;
            _oDcFilterParamRequest.SystemUserId = LoginUserId;
            _oDcFilterParamRequest.DcPlaceName = DCPlaceName;
            _oDcFilterParamRequest.IsSynchronized = false;

            if (TabIndex == 1) {
                _oDcFilterParamRequest.ApprovalStatus = false;
            }

            else if (TabIndex == 2) {
                _oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.APPROVED;
            }

            else if (TabIndex == 3) {
                _oDcFilterParamRequest.IsSynchronized = true;
                _oDcFilterParamRequest.IsCompleted = true;
            }

            OneViewConsole.Debug("MakeDcFilterRequest end", "DefaultMyAuditDCBO.MakeDcFilterRequest");

            return _oDcFilterParamRequest;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultMyAuditDCBO.MakeDcFilterRequest", Excep);
        }
        finally {
            LoginUserId = null;
            _oDcFilterParamRequest = null;
        }

    }


    /// <summary>
    /// Get all dc
    /// </summary>   
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>DcInfo</returns>   
    this.GetAllDC = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex) {

        try {
            OneViewConsole.Debug("GetAllDC start", "DefaultMyAuditDCBO.GetAllDC");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;

            oDcFilterParamRequest.IsSynchronized = false;

            if (TabIndex == 1) {
                oDcFilterParamRequest.ApprovalStatus = false;
            }
            else if (TabIndex == 2) {
                oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.APPROVED;
            }
            else if (TabIndex == 3) {
                oDcFilterParamRequest.IsSynchronized = true;
                oDcFilterParamRequest.IsCompleted = true;
            }

            var _oMyAuditDAO = new MyAuditDAO();
            var DcInfo = _oMyAuditDAO.GetAllDC(oDcFilterParamRequest);

            OneViewConsole.Debug("GetAllDC end", "DefaultMyAuditDCBO.GetAllDC");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetAllDC", Excep);
        }
    }


    /// <summary>
    /// Get sync status
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>true or false</returns>  
    this.GetSyncStatus = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetSyncStatus start", "DefaultMyAuditDCBO.GetSyncStatus");

            var SyncStatus = true;

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;           
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.DcPlaceName = DcPlaceName;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;

            oDcFilterParamRequest.IsSynchronized = false;            
            
            if (TabIndex == 1) {
                oDcFilterParamRequest.ApprovalStatus = false;
            }
            else if (TabIndex == 2) {
                oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.APPROVED;
            }
            else if (TabIndex == 3) {
                oDcFilterParamRequest.IsSynchronized = true;
                oDcFilterParamRequest.IsCompleted = true;
            }

            var _oMyAuditDAO = new MyAuditDAO();
            var DCCount = _oMyAuditDAO.GetAllDCCount(oDcFilterParamRequest);

            if (DCCount > 0) {
                SyncStatus = false;
            }

            OneViewConsole.Debug("GetSyncStatus end", "DefaultMyAuditDCBO.GetSyncStatus");

            return SyncStatus;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetSyncStatus", Excep);
        }
    }


    /// <summary>
    /// Get handover sync status
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>true or false</returns>  
    this.GetHandoverSyncStatus = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetSyncStatus start", "DefaultMyAuditDCBO.GetSyncStatus");

            var SyncStatus = true;

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.DcPlaceName = DcPlaceName;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;

            oDcFilterParamRequest.IsSynchronized = false;

            if (TabIndex == 1) {
                oDcFilterParamRequest.ApprovalStatus = false;
            }
            else if (TabIndex == 2) {
                oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.APPROVED;
            }
            else if (TabIndex == 3) {
                oDcFilterParamRequest.IsSynchronized = true;
                oDcFilterParamRequest.IsCompleted = true;
            }

            var _oMyAuditDAO = new MyAuditDAO();
            var DCCount = _oMyAuditDAO.GetAllHandoverDCCount(oDcFilterParamRequest);

            if (DCCount > 0) {
                SyncStatus = false;
            }

            OneViewConsole.Debug("GetSyncStatus end", "DefaultMyAuditDCBO.GetSyncStatus");

            return SyncStatus;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetSyncStatus", Excep);
        }
    }


    /// <summary>
    /// Get total records count
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>Count</returns>   
    this.GetTotalRecordsCount = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetTotalRecordsCount start", "DefaultMyAuditDCBO.GetTotalRecordsCount");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.DcPlaceName = DcPlaceName;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;

            if (TabIndex == 1) {
                oDcFilterParamRequest.ApprovalStatus = false;
            }
            else if (TabIndex == 2) {
                oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.APPROVED;
            }
            else if (TabIndex == 3) {
                oDcFilterParamRequest.IsSynchronized = true;
                oDcFilterParamRequest.IsCompleted = true;
            }

            var _oMyAuditDAO = new MyAuditDAO();
            var DCCount = _oMyAuditDAO.GetAllDCCount(oDcFilterParamRequest);

            OneViewConsole.Debug("GetTotalRecordsCount end", "DefaultMyAuditDCBO.GetTotalRecordsCount");

            return DCCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetTotalRecordsCount", Excep);
        }
    }


    /// <summary>
    /// Get rejected records count
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>Count</returns>   
    this.GetRejectedRecordsCount = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetRejectedRecordsCount start", "DefaultMyAuditDCBO.GetRejectedRecordsCount");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.DcPlaceName = DcPlaceName;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;

            oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.REJECTED;

            var _oMyAuditDAO = new MyAuditDAO();
            var DCCount = _oMyAuditDAO.GetAllDCCount(oDcFilterParamRequest);

            OneViewConsole.Debug("GetRejectedRecordsCount end", "DefaultMyAuditDCBO.GetRejectedRecordsCount");

            return DCCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetRejectedRecordsCount", Excep);
        }
    }


    /// <summary>
    /// Get nc records count
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>Count</returns>  
    this.GetNCRecordsCount = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetNCRecordsCount start", "DefaultMyAuditDCBO.GetNCRecordsCount");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.DcPlaceName = DcPlaceName;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;

            oDcFilterParamRequest.IsAnyNC = true;

            if (TabIndex == 1) {
                oDcFilterParamRequest.ApprovalStatus = false;
            }
            else if (TabIndex == 2) {
                oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.APPROVED;
            }
            else if (TabIndex == 3) {
                oDcFilterParamRequest.IsSynchronized = true;
                oDcFilterParamRequest.IsCompleted = true;
            }

            var _oMyAuditDAO = new MyAuditDAO();
            var DCCount = _oMyAuditDAO.GetAllDCCount(oDcFilterParamRequest);

            OneViewConsole.Debug("GetNCRecordsCount end", "DefaultMyAuditDCBO.GetNCRecordsCount");

            return DCCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetNCRecordsCount", Excep);
        }
    }


    /// <summary>
    /// Get nc rejected records count
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>Count</returns>  
    this.GetNCRejectedRecordsCount = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetNCRejectedRecordsCount start", "DefaultMyAuditDCBO.GetNCRejectedRecordsCount");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.DcPlaceName = DcPlaceName;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;

            oDcFilterParamRequest.IsAnyNC = true;
            oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.REJECTED;

            var _oMyAuditDAO = new MyAuditDAO();
            var DCCount = _oMyAuditDAO.GetAllDCCount(oDcFilterParamRequest);

            OneViewConsole.Debug("GetNCRejectedRecordsCount end", "DefaultMyAuditDCBO.GetNCRejectedRecordsCount");

            return DCCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetNCRejectedRecordsCount", Excep);
        }
    }


    /// <summary>
    /// Get handover nc records count
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>Count</returns>  
    this.GetHandoverNCRecordsCount = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetHandoverNCRecordsCount start", "DefaultMyAuditDCBO.GetHandoverNCRecordsCount");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.DcPlaceName = DcPlaceName;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;

            oDcFilterParamRequest.IsAnyNC = true;

            if (TabIndex == 1) {
                oDcFilterParamRequest.ApprovalStatus = false;
            }
            else if (TabIndex == 2) {
                oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.APPROVED;
            }
            else if (TabIndex == 3) {
                oDcFilterParamRequest.IsSynchronized = true;
                oDcFilterParamRequest.IsCompleted = true;
            }

            var _oMyAuditDAO = new MyAuditDAO();
            var DCCount = _oMyAuditDAO.GetAllHandoverDCCount(oDcFilterParamRequest);

            OneViewConsole.Debug("GetHandoverNCRecordsCount end", "DefaultMyAuditDCBO.GetHandoverNCRecordsCount");

            return DCCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetHandoverNCRecordsCount", Excep);
        }
    }


    /// <summary>
    /// Get handover nc rejected records count
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>Count</returns>  
    this.GetHandoverNCRejectedRecordsCount = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetHandoverNCRejectedRecordsCount start", "DefaultMyAuditDCBO.GetHandoverNCRejectedRecordsCount");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.DcPlaceName = DcPlaceName;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;

            oDcFilterParamRequest.IsAnyNC = true;
            oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.REJECTED;

            var _oMyAuditDAO = new MyAuditDAO();
            var DCCount = _oMyAuditDAO.GetAllHandoverDCCount(oDcFilterParamRequest);

            OneViewConsole.Debug("GetHandoverNCRejectedRecordsCount end", "DefaultMyAuditDCBO.GetHandoverNCRejectedRecordsCount");

            return DCCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetHandoverNCRejectedRecordsCount", Excep);
        }
    }


    /// <summary>
    /// Get handover records count
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>Count</returns>  
    this.GetHandoverRecordsCount = function (ServiceId, DCPlaceId, TemplateId, UserId, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetHandoverRecordsCount start", "DefaultMyAuditDCBO.GetHandoverRecordsCount");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.DcPlaceName = DcPlaceName;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;
           
            oDcFilterParamRequest.ApprovalStatus = false;
            
            var _oMyAuditDAO = new MyAuditDAO();
            var DCCount = _oMyAuditDAO.GetAllHandoverDCCount(oDcFilterParamRequest);

            OneViewConsole.Debug("GetHandoverRecordsCount end", "DefaultMyAuditDCBO.GetHandoverRecordsCount");

            return DCCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetHandoverRecordsCount", Excep);
        }
    }


    /// <summary>
    /// Get handover rejected records count
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    /// <returns>Count</returns>  
    this.GetHandoverRejectedRecordsCount = function (ServiceId, DCPlaceId, TemplateId, UserId, DcPlaceName) {

        try {
            OneViewConsole.Debug("GetHandoverRejectedRecordsCount start", "DefaultMyAuditDCBO.GetHandoverRejectedRecordsCount");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.DcPlaceName = DcPlaceName;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;

            oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.REJECTED;

            var _oMyAuditDAO = new MyAuditDAO();
            var DCCount = _oMyAuditDAO.GetAllHandoverDCCount(oDcFilterParamRequest);

            OneViewConsole.Debug("GetHandoverRejectedRecordsCount end", "DefaultMyAuditDCBO.GetHandoverRejectedRecordsCount");

            return DCCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.GetHandoverRejectedRecordsCount", Excep);
        }
    }


    /// <summary>
    /// Delete all dc
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    this.DeleteAllDC = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex){

        try {
            OneViewConsole.Debug("DeleteAllDC start", "DefaultMyAuditDCBO.DeleteAllDC");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;
            oDcFilterParamRequest.SystemUserId = UserId;
          
            if (TabIndex == 1) {
                oDcFilterParamRequest.ApprovalStatus = false;
            }
            else if (TabIndex == 2) {
                oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.APPROVED;
            }
            else if (TabIndex == 3) {
                oDcFilterParamRequest.IsSynchronized = true;
                oDcFilterParamRequest.IsCompleted = true;
            }

            var _oMyAuditDAO = new MyAuditDAO();
            _oMyAuditDAO.DeleteAllDC(oDcFilterParamRequest);

            OneViewConsole.Debug("DeleteAllDC end", "DefaultMyAuditDCBO.DeleteAllDC");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.DeleteAllDC", Excep);
        }
    }


    /// <summary>
    /// MakeClearRequest
    /// </summary>
    /// <param name="ServiceId">Service id</param>
    /// <param name="DCPlaceId">DCPlace id</param>
    /// <param name="TemplateId">Template id</param>
    /// <param name="UserId">Login user id</param>
    /// <param name="TabIndex">Tab index</param>
    this.MakeClearRequest = function (ServiceId, DCPlaceId, TemplateId, UserId, TabIndex) {

        try {
            OneViewConsole.Debug("MakeClearRequest start", "DefaultMyAuditDCBO.MakeClearRequest");

            var oDcFilterParamRequest = new DcFilterParamRequest();

            oDcFilterParamRequest.ServiceId = ServiceId;
            oDcFilterParamRequest.DcPlaceId = DCPlaceId;
            oDcFilterParamRequest.TemplateNodeId = TemplateId;

            if (MyAuditPageConfig != null && MyAuditPageConfig.ClearConfig != undefined && MyAuditPageConfig.ClearConfig != null) {
                if (MyAuditPageConfig.ClearConfig.IsManualSelectionEnable == false) {
                    if (MyAuditPageConfig.ClearConfig.IsAllUser == false) {
                        oDcFilterParamRequest.SystemUserId = UserId;
                    }
                }
                else {
                    alert("Not implemented exception, IsManualSelectionEnable = " + MyAuditPageConfig.ClearConfig.IsManualSelectionEnable + ", DefaultMyAuditDCBO.MakeClearRequest");
                }
            }

            if (TabIndex == 1) {
                oDcFilterParamRequest.ApprovalStatus = false;
            }
            else if (TabIndex == 2) {
                oDcFilterParamRequest.ApprovalStatus = oDCApprovalStatusEnum.APPROVED;
            }
            else if (TabIndex == 3) {
                oDcFilterParamRequest.IsSynchronized = true;
                oDcFilterParamRequest.IsCompleted = true;
            }

            return oDcFilterParamRequest;

            OneViewConsole.Debug("MakeClearRequest end", "DefaultMyAuditDCBO.MakeClearRequest");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultMyAuditDCBO.MakeClearRequest", Excep);
        }
    }
}


// MyAuditFactory
function MyAuditFactory() {


    /// <summary>
    /// Get MyAuditPageComponent
    /// </summary>
    /// <param name="MyAuditPageComponentKey">Key</param>
    /// <returns>MyAuditPageComponent object</returns>  
    this.GetMyAuditPageComponent = function (MyAuditPageComponentKey) {

        try {
            switch (MyAuditPageComponentKey) {
                case "DefaultMyAuditPageComponent": {
                    var _oDefaultMyAuditPageComponent = new DefaultMyAuditPageComponent();
                    _oDefaultMyAuditPageComponent.PendingTabKey = "DefaultMyAuditPendingTabComponent";
                    _oDefaultMyAuditPageComponent.ApprovedTabKey = "DefaultMyAuditApprovedTabComponent";
                    _oDefaultMyAuditPageComponent.HistoryTabKey = "DefaultMyAuditHistoryTabComponent";
                    return _oDefaultMyAuditPageComponent;
                };
                default: null;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "MyAuditFactory.GetMyAuditPageComponent", Excep);
        }
    }


    /// <summary>
    /// Get MyAuditTabComponent
    /// </summary>
    /// <param name="MyAuditTabComponent">Key</param>
    /// <returns>MyAuditTabComponent object</returns>  
    this.GetMyAuditTabComponent = function (MyAuditTabComponent) {

        try {
            switch (MyAuditTabComponent) {
                case "DefaultMyAuditTabComponent": {
                    var _oDefaultMyAuditTabComponent = new DefaultMyAuditTabComponent();
                    return _oDefaultMyAuditTabComponent;
                };
                default: null;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "MyAuditFactory.GetMyAuditPageComponent", Excep);
        }
    }


    /// <summary>
    /// Get MyAuditBOComponent
    /// </summary>
    /// <param name="MyAuditBOComponentKey">Key/param>
    /// <returns>MyAuditBOComponent object</returns>  
    this.GetMyAuditBOComponent = function (MyAuditBOComponentKey) {
        
        try {
            switch (MyAuditBOComponentKey) {
                case "DefaultMyAuditDCBO": {
                    var _oDefaultMyAuditDCBO = new DefaultMyAuditDCBO();
                    return _oDefaultMyAuditDCBO;
                };
                default: null;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "MyAuditFactory.GetMyAuditBOComponent", Excep);
        }
    }
}


// MyAuditDAO
function MyAuditDAO() {

    var oOneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// Get all dc
    ///todo :dcplace dimension need to add in where , 
    ///Limit need to refactor
    /// </summary>
    /// <param name="FilterParam">Request param</param>
    /// <returns>DcInfo</returns>  
    this.GetAllDC = function (FilterParam,Limit) {

        try {
            OneViewConsole.Debug("GetAllDC start", "MyAuditDAO.GetAllDC");

            var Query = "Select DataCaptureEntity.Id AS Id, DataCaptureEntity.ServerId AS ServerId, DataCaptureEntity.ClientGuid AS ClientGuid,DataCaptureEntity.IsAnyNC AS IsAnyNC, " +
                "DcResultsEntity.Id AS DcResultsId, DcResultsEntity.ServerId AS DcResultsServerId, DcResultsEntity.ClientGuid AS DcResultsClientGuid from DataCaptureEntity " +
                            "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";
                            
                             if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                                 Query += " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                             }
                             else {
                                 Query += " AND (DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                             }

                             if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                                 Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                                " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                             }
                             else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                                 Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                                " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                             }
                             else if (FilterParam.IsCompleted != '-1') {
                                 Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                                " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                             }
                             else {
                                 Query += " AND ((DataCaptureEntity.IsSynchronized = 'true' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'true'))";
                             }

                            if (FilterParam.ApprovalStatus != false) {
                                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                            }
                            else {
                                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                            }
                            
                            Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
                            " AND DataCaptureEntity.IsForHistory = 'false'";
         
            if (Limit != -1)
            {
                Query += " LIMIT 50";
            }
          
            OneViewConsole.DataLog("Requested Query : " + Query, "MyAuditDAO.GetAllDC");
           
            var DcInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
          
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "MyAuditDAO.GetAllDC");
            OneViewConsole.Debug("GetAllDC end", "MyAuditDAO.GetAllDC");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllDC", Excep);
        }
    }


    /// <summary>
    /// Get all dc
    ///todo :dcplace dimension need to add in where , 
    ///Limit need to refactor
    /// </summary>
    /// <param name="FilterParam">Request param</param>
    /// <returns>DcInfo</returns>  
    this.GetAllDCAdv = function (FilterParam, Limit) {

        try {
            OneViewConsole.Debug("GetAllDC start", "MyAuditDAO.GetAllDC");

            var DcPlaceExp = "";

            if (FilterParam.IsDCPlaceGroup == true) {
                var _oDcDAO = new DcDAO();
                DcPlaceExp = _oDcDAO.GetDcPlaceExpByPlaceGroup(FilterParam);
            }

            var DcTemplateExp = "";

            if (FilterParam.IsTemplateGroup == true) {
                var _oDcDAO = new DcDAO();
                DcTemplateExp = _oDcDAO.GetDcTemplateExpByTemplateGroup(FilterParam);
            }

            var Query = "Select DataCaptureEntity.Id AS Id, DataCaptureEntity.ServerId AS ServerId, DataCaptureEntity.ClientGuid AS ClientGuid,DataCaptureEntity.IsAnyNC AS IsAnyNC, " +
                "DcResultsEntity.Id AS DcResultsId, DcResultsEntity.ServerId AS DcResultsServerId, DcResultsEntity.ClientGuid AS DcResultsClientGuid from DataCaptureEntity " +
                            "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")";
                            //" AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";
            
            if (FilterParam.IsDCPlaceGroup == true && DcPlaceExp != "") {
                Query += " AND (DataCaptureEntity.DcPlaceId IN " + DcPlaceExp + ")";
            }
            else {
                if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                    Query += " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                }
                else {
                    Query += " AND (DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                }
            }

            if (FilterParam.IsTemplateGroup == true && DcTemplateExp != "") {
                Query += " AND (DataCaptureEntity.TemplateNodeId IN " + DcTemplateExp + ")";
            }
            else {
                Query += " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";
            }

            if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
               " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
            }
            else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
               " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
            }
            else if (FilterParam.IsCompleted != '-1') {
                Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
               " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
            }
            else {
                Query += " AND ((DataCaptureEntity.IsSynchronized = 'true' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'true'))";
            }

            if (FilterParam.ApprovalStatus != false) {
                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
            }
            else {
                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
            }

            Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
            " AND DataCaptureEntity.IsForHistory = 'false'";

            if (Limit != -1) {
                Query += " LIMIT 50";
            }

            OneViewConsole.DataLog("Requested Query : " + Query, "MyAuditDAO.GetAllDC");

            var DcInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "MyAuditDAO.GetAllDC");
            OneViewConsole.Debug("GetAllDC end", "MyAuditDAO.GetAllDC");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllDC", Excep);
        }
    }


    /// <summary>
    /// Get all handover dc
    /// </summary>
    /// <param name="FilterParam">Request param</param>
    /// <returns>Handover DcInfo</returns>  
    this.GetAllHandoverDC = function (FilterParam) {

        try {
            OneViewConsole.Debug("GetAllHandoverDC start", "MyAuditDAO.GetAllHandoverDC");

            var Query = "Select DataCaptureEntity.Id AS Id,DataCaptureEntity.ClientGuid AS ClientGuid,DataCaptureEntity.IsAnyNC AS IsAnyNC from DataCaptureEntity " +
                            "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";
                            
                             if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                                 Query += " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                             }
                             else {
                                 Query += " AND (DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                             }

                             if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                                 Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                                " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                             }
                             else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                                 Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                                " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                             }
                             else if (FilterParam.IsCompleted != '-1') {
                                 Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                                " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                             }
                             else {
                                 Query += " AND ((DataCaptureEntity.IsSynchronized = 'true' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'true'))";
                             }
                                                        

                             if (FilterParam.ApprovalStatus != false) {
                                 Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                             }
                             else {
                                 Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                             }

                             Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                            " AND (DcResultsEntity.SystemUserId != " + FilterParam.SystemUserId + ")" +
                            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
                            " AND DataCaptureEntity.IsForHistory = 'false'" +
                            " LIMIT 50";

            OneViewConsole.DataLog("Requested Query : " + Query, "MyAuditDAO.GetAllHandoverDC");

            var DcInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "MyAuditDAO.GetAllHandoverDC");
            OneViewConsole.Debug("GetAllHandoverDC end", "MyAuditDAO.GetAllHandoverDC");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllHandoverDC", Excep);
        }
    }


    /// <summary>
    /// Get all dc count
    /// </summary>
    /// <param name="FilterParam">Request param</param>
    /// <returns>Dc count</returns>  
    this.GetAllDCCount = function (FilterParam) {

        try {
            OneViewConsole.Debug("GetAllDCCount start", "MyAuditDAO.GetAllDCCount");
                       
            var Query = "Select count(Distinct DataCaptureEntity.Id) As TotalRecords From DataCaptureEntity" +
                        " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                        " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";

                        if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                            Query += " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                        }
                        else {
                            Query += " AND (DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                        }
                        
                        if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else if (FilterParam.IsCompleted != '-1') {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else {
                            Query += " AND ((DataCaptureEntity.IsSynchronized = 'true' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'true'))";
                        }


                        if (FilterParam.ApprovalStatus != false) {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                        }
                        else {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                        }
                        
                        Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                        " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                        " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
                        " AND DataCaptureEntity.IsForHistory = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "MyAuditDAO.GetAllDCCount");

            //alert(Query);

            var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "MyAuditDAO.GetAllDCCount");
            OneViewConsole.Debug("GetAllDCCount end", "MyAuditDAO.GetAllDCCount");

            return result[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllDCCount", Excep);
        }
    }


    /// <summary>
    /// Get all handover dc count
    /// </summary>
    /// <param name="FilterParam">Request param</param>
    /// <returns>Handover dc count</returns>  
    this.GetAllHandoverDCCount = function (FilterParam) {

        try {
            OneViewConsole.Debug("GetAllDCCount start", "MyAuditDAO.GetAllDCCount");
                       
            var Query = "Select count(Distinct DataCaptureEntity.Id) As TotalRecords From DataCaptureEntity" +
                        " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                        " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")";
                        
                        if (FilterParam.DcPlaceId > 0 || FilterParam.DcPlaceId == -1) {
                            Query += " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")";
                        }
                        else {
                            Query += " AND (DataCaptureEntity.DcPlaceName = '" + FilterParam.DcPlaceName + "')";
                        }

                        if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else if (FilterParam.IsCompleted != '-1') {
                            Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                           " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
                        }
                        else {
                            Query += " AND ((DataCaptureEntity.IsSynchronized = 'true' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'true'))";
                        }

                        if (FilterParam.ApprovalStatus != false) {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
                        }
                        else {
                            Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
                        }
                        
                        Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
                        " AND (DcResultsEntity.SystemUserId != " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                        " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
                        " AND DataCaptureEntity.IsForHistory = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "MyAuditDAO.GetAllDCCount");

            //alert(Query);

            var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "MyAuditDAO.GetAllDCCount");
            OneViewConsole.Debug("GetAllDCCount end", "MyAuditDAO.GetAllDCCount");

            return result[0].TotalRecords;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllDCCount", Excep);
        }
    }


    /// <summary>
    /// Delete all dc count
    /// </summary>
    /// <param name="FilterParam">Request param</param>   
    this.DeleteAllDC = function (FilterParam) {

        try {
            OneViewConsole.Debug("DeleteAllDC start", "MyAuditDAO.DeleteAllDC");

            var DcInfo = this.GetAllDC(FilterParam, -1);
            var Exp = FomatForInConditionById(DcInfo);

            oOneViewSqlitePlugin.ExcecuteSql("DELETE FROM DcResultDetailsEntity WHERE DataCaptureId In " + Exp);
            oOneViewSqlitePlugin.ExcecuteSql("DELETE FROM DcResultsEntity WHERE DataCaptureId In " + Exp);
            oOneViewSqlitePlugin.ExcecuteSql("DELETE FROM DataCaptureEntity WHERE Id In " + Exp);

            OneViewConsole.Debug("DeleteAllDC end", "MyAuditDAO.DeleteAllDC");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.DeleteAllDC", Excep);
        }
        finally {
            DcInfo = null;
            Exp = null;
        }
    }


    /// <summary>
    /// Clear all dc from local db
    /// </summary>
    /// <param name="FilterParam">Request param</param>   
    this.ClearAllDC = function (FilterParam) {

        try {
            OneViewConsole.Debug("ClearAllDC start", "MyAuditDAO.ClearAllDC");

            var DcInfo = this.GetAllDC(FilterParam);

            if (DcInfo.length > 0) {

                var oDcDAO = new DcDAO();
                var oActionDAO = new ActionDAO();
                
                // Data capture deletion
                oDcDAO.DeleteDcResultDetailsByDcId(DcInfo);

                // NC data capture deletion
                oActionDAO.DeleteNCDcResultDetailsByDcId(DcInfo);

                var DcExp = FomatForInConditionById(DcInfo);
                var ActionExp = FomatForInConditionByClientGuid(DcInfo);
                var ActionInfo = oOneViewSqlitePlugin.ExcecuteSqlReader("SELECT DISTINCT ActionClientGuid AS ClientGuid FROM DCNCMapping WHERE DataCaptureClientGuid IN " + ActionExp);

                // Action deletion
                if (ActionInfo.length > 0) {
                    var ActionInfoExp = FomatForInConditionByClientGuid(ActionInfo);
                    oOneViewSqlitePlugin.ExcecuteSql("DELETE FROM DCNCMapping WHERE ActionClientGuid In " + ActionInfoExp);
                    oOneViewSqlitePlugin.ExcecuteSql("DELETE FROM ActionEntity WHERE ClientGuid In " + ActionInfoExp);
                    oOneViewSqlitePlugin.ExcecuteSql("DELETE FROM ActionDetailsEntity WHERE ActionClientGuid In " + ActionInfoExp);
                }

                // Multimedia deletion
                var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
                _oMultiMediaSubElementsDAO.Delete(DcInfo);
                _oMultiMediaSubElementsDAO.Delete(ActionInfo);
            }

            OneViewConsole.Debug("ClearAllDC end", "MyAuditDAO.ClearAllDC");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.ClearAllDC", Excep);
        }
        finally {
            DcInfo = null;
            oDcDAO = null;
            oActionDAO = null;
            DcExp = null;
            ActionExp = null;
            ActionInfo = null;
            _oMultiMediaSubElementsDAO = null;           
        }
    }


    /// <summary>
    /// Format InCondition
    /// </summary>
    /// <param name="DcInfo">Dc Id's</param>   
    /// <returns>In Condition</returns>  
    var FomatForInConditionById = function (DcInfo) {

        try {
            OneViewConsole.Debug("FomatForInConditionById start", "MyAuditDAO.FomatForInConditionById");
            OneViewConsole.DataLog("Request DcInfo : " + JSON.stringify(DcInfo), "MyAuditDAO.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < DcInfo.length; i++) {
                Incondition += DcInfo[i].Id;
                Incondition += (i <= DcInfo.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "MyAuditDAO.FomatForInConditionById");
            OneViewConsole.Debug("FomatForInConditionById end", "MyAuditDAO.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MyAuditDAO.FomatForInConditionById", Excep);
        }
        finally {
            Incondition = null;
        }
    }


    /// <summary>
    /// Format InCondition
    /// </summary>
    /// <param name="DcInfo">Dc ClientGuid's</param>   
    /// <returns>In Condition</returns>  
    var FomatForInConditionByClientGuid = function (DcInfo) {

        try {
            OneViewConsole.Debug("FomatForInConditionByClientGuid start", "MyAuditDAO.FomatForInConditionByClientGuid");
            OneViewConsole.DataLog("Request DcInfo : " + JSON.stringify(DcInfo), "MyAuditDAO.FomatForInConditionByClientGuid");

            var Incondition = "(";

            for (var i = 0; i < DcInfo.length; i++) {
                Incondition += "'" + DcInfo[i].ClientGuid + "'";
                Incondition += (i <= DcInfo.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "MyAuditDAO.FomatForInConditionByClientGuid");
            OneViewConsole.Debug("FomatForInConditionByClientGuid end", "MyAuditDAO.FomatForInConditionByClientGuid");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MyAuditDAO.FomatForInConditionByClientGuid", Excep);
        }
        finally {
            Incondition = null;
        }
    }



    /// <summary>
    /// Get all dc for Auto upload
    /// </summary>
    /// <param name="FilterParam">Request param</param>
    /// <returns>DcInfo</returns>  
    this.GetAllDCForAutoUpload = function (FilterParam, Limit, PlaceFilterParam, TemplateFilterParam) {

        try {
            OneViewConsole.Debug("GetAllDCForAutoUpload start", "MyAuditDAO.GetAllDCForAutoUpload");

            var Query = "Select DataCaptureEntity.Id AS Id, DataCaptureEntity.ServerId AS ServerId, DataCaptureEntity.ClientGuid AS ClientGuid,DataCaptureEntity.IsAnyNC AS IsAnyNC, " +
                "DcResultsEntity.Id AS DcResultsId, DcResultsEntity.ServerId AS DcResultsServerId, DcResultsEntity.ClientGuid AS DcResultsClientGuid from DataCaptureEntity " +
                            "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")";

            if (PlaceFilterParam.IsAnyPlace == true || PlaceFilterParam.IsAnyPlace == 'true') {
                Query += " AND (DataCaptureEntity.DcPlaceId = -1 OR -1=-1)";
            }

            else if (PlaceFilterParam.DCPlaceList != null && PlaceFilterParam.DCPlaceList.length > 0) {
                var PlaceIncondition = "(";
                for (var i = 0; i < PlaceFilterParam.DCPlaceList.length; i++) {
                    PlaceIncondition += PlaceFilterParam.DCPlaceList[i];
                    PlaceIncondition += (i <= PlaceFilterParam.DCPlaceList.length - 2) ? "," : ")";
                }
                Query += " AND (DataCaptureEntity.DcPlaceId IN " + PlaceIncondition + ")";
            }


            if (TemplateFilterParam.IsAnyTemplate == true || TemplateFilterParam.IsAnyTemplate == 'true') {
                Query += " AND (DataCaptureEntity.TemplateNodeId = -1 OR -1=-1)";
            }

            else if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {
                var TemplateIncondition = "(";
                for (var i = 0; i < TemplateFilterParam.DCTemplateList.length; i++) {
                    TemplateIncondition += TemplateFilterParam.DCTemplateList[i];
                    TemplateIncondition += (i <= TemplateFilterParam.DCTemplateList.length - 2) ? "," : ")";
                }

                Query += " AND (DataCaptureEntity.TemplateNodeId IN " + TemplateIncondition + ")";
            }
            

            if ((FilterParam.IsSynchronized == true && FilterParam.IsCompleted == true) || (FilterParam.IsSynchronized == 'true' && FilterParam.IsCompleted == 'true')) {
                Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
               " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
            }
            else if ((FilterParam.IsSynchronized == false && FilterParam.IsCompleted == '-1')) {
                Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
               " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
            }
            else if (FilterParam.IsCompleted != '-1') {
                Query += " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
               " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')";
            }
            else {
                Query += " AND ((DataCaptureEntity.IsSynchronized = 'true' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'false') OR (DataCaptureEntity.IsSynchronized = 'false' AND DataCaptureEntity.IsCompleted = 'true'))";
            }

            if (FilterParam.ApprovalStatus != false) {
                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + FilterParam.ApprovalStatus + "' OR '-1'='" + FilterParam.ApprovalStatus + "')";
            }
            else {
                Query += " AND (DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.NONE + "' OR DataCaptureEntity.ApprovalStatus = '" + oDCApprovalStatusEnum.REJECTED + "')";
            }

            Query += " AND (DataCaptureEntity.IsAnyNC = '" + FilterParam.IsAnyNC + "' OR '-1'='" + FilterParam.IsAnyNC + "')" +
            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")" +
            " AND DataCaptureEntity.IsForHistory = 'false'";

            if (Limit != -1) {
                Query += " LIMIT 50";
            }

            //alert('GetAllDCForAutoUpload Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "MyAuditDAO.GetAllDCForAutoUpload");

            var DcInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
            //alert('GetAllDCForAutoUpload DcInfo : ' + JSON.stringify(DcInfo));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "MyAuditDAO.GetAllDCForAutoUpload");
            OneViewConsole.Debug("GetAllDCForAutoUpload end", "MyAuditDAO.GetAllDCForAutoUpload");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyAuditDAO.GetAllDCForAutoUpload", Excep);
        }
    }
}
