
// Dont change / remove below variables

var TotalDCCountForUpload = 0;
var UploadLimit = 50;
var ProgressValue = 0;
var BatchNumber = 1;

MyApp.controller('MyAuditController', function ($scope, $location, xlatService) {

    //oSetDefaultSpinner.Start();

   
  

    // Toggle Button Dynamic Loader 
    $scope.MyAuditTab = ["Pending", "Completed", "History"];
    $scope.MyAudit = "Pending";
    var _MyAuditBO = new MyAuditBO($scope, $location, xlatService, '');

    $scope.divPending = true;
    $scope.divComplete = false;
    $scope.divUploaded = false;

    //$rootScope.$on('$viewContentLoaded', function () {
    //    alert('viewContentLoaded');
    //    var oAutoCompleteHTMLOperation = new AutoCompleteHTMLOperation();
    //    oAutoCompleteHTMLOperation.DestroyHTML();
    //    oAutoCompleteHTMLOperation.GenerateHTML();

    //});

    $scope.$on('$destroy', function () {
       // alert('destroy');
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();

    });

    $scope.$watch('MyAudit', function (TabIndex) {
        //alert(TabIndex);
        if (TabIndex == "Pending") {
            $scope.divPending = true;
            $scope.divComplete = false;
            $scope.divUploaded = false;
        }
        else if (TabIndex == "Completed") {
            $scope.divPending = false;
            $scope.divComplete = true;
            $scope.divUploaded = false;
        }
        else {
            $scope.divPending = false;
            $scope.divComplete = false;
            $scope.divUploaded = true;
        }

        //alert("Pending : " + $scope.divPending + ", Completed : " + $scope.divComplete + ", History : " + $scope.divUploaded);
    });

    var _oMyAuditFacade = new MyAuditFacade($scope, $location, xlatService, '');
    
    _oMyAuditFacade.Init();
    _oMyAuditFacade.PageLoad();

    //oSetDefaultSpinner.Stop();

    $scope.NEW = function (TemplateId, DcPlaceId, Type) {
        _oMyAuditFacade.NEW(TemplateId, DcPlaceId, Type);
    }

    $scope.EDIT = function (TemplateId, DcPlaceId, Type) {
        _oMyAuditFacade.EDIT(TemplateId, DcPlaceId, Type);
    }

    $scope.APPROVE = function (TemplateId, DcPlaceId, Type) {
        _oMyAuditFacade.APPROVE(TemplateId, DcPlaceId, Type);
    }

    $scope.UPLOAD = function (TemplateId, DcPlaceId, Type) {
        _oMyAuditFacade.UPLOAD(TemplateId, DcPlaceId, Type);
    }

    $scope.NewDC = function () {
        _oMyAuditFacade.NewDC();
    }



})

function MyAuditFacade($scope, $location, xlatService, toaster) {

    var MyInstance = this;

    var _MyAuditBO = new MyAuditBO($scope, $location, xlatService, toaster);

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init start", "MyAuditFacade.Init");

            xlatService.setCurrentPage('MyAudit_Page');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

            // All Templates
            $scope.GoodsTemplate = false;
            $scope.MonitoringTemplate = false;
            $scope.VerificationTemplate = false;
            $scope.ThawingVerificationTemplate = false;
            $scope.BakingBCVerificationTemplate = false;
            $scope.DispatchingAndVerificationTemplate = false;
            $scope.TraySettingVerificationTemplate = false;
            $scope.PastryPortioningVerificationTemplate = false;
            $scope.HotMealDishingVerificationTemplate = false;
            $scope.FoodSafetyAndCleaningTemplate = false;
            $scope.TemperatureVerificationofColdMealDishing = false;
            $scope.TemperatureVerificationofAircraftLoading = false;

            // Template 1
            $scope.K1_T44 = false;
            $scope.K2_T44 = false;
            $scope.K3_T44 = false;

            // Template 2
            $scope.K1_T2 = false;
            $scope.K2_T2 = false;
            $scope.K3_T2 = false;

            // Template 3
            $scope.K1_T3 = false;
            $scope.K2_T3 = false;
            $scope.K3_T3 = false;

            // Template 4
            $scope.K1_T77 = false;
            $scope.K2_T77 = false;
            $scope.K3_T77 = false;

            // Template 5
            $scope.K1_T88 = false;
            $scope.K2_T88 = false;
            $scope.K3_T88 = false;

            // Template 6
            $scope.K1_T99 = false;
            $scope.K2_T99 = false;
            $scope.K3_T99 = false;

            // Template 7
            $scope.K1_T116 = false;
            $scope.K2_T116 = false;
            $scope.K3_T116 = false;

            // Template 8
            $scope.K1_T128 = false;
            $scope.K2_T128 = false;
            $scope.K3_T128 = false;

            // Template 9
            $scope.K1_T140 = false;
            $scope.K2_T140 = false;
            $scope.K3_T140 = false;

            // Template 10
            $scope.K1_T153 = false;
            $scope.K2_T153 = false;
            $scope.K3_T153 = false;

            // Template 11
            $scope.K1_T282 = false;
            $scope.K2_T282 = false;
            $scope.K3_T282 = false;

            // Template 12
            $scope.K1_T293 = false;
            $scope.K2_T293 = false;
            $scope.K3_T293 = false;

            // Goods receiving template
            $scope.PendingRecords_K1_T44 = 0;
            $scope.PendingRecords_K2_T44 = 0;
            $scope.PendingRecords_K3_T44 = 0;

            $scope.HandoverRecords_K1_T44 = 0;
            $scope.HandoverRecords_K2_T44 = 0;
            $scope.HandoverRecords_K3_T44 = 0;

            $scope.CompletedRecords_K1_T44 = 0;
            $scope.CompletedRecords_K2_T44 = 0;
            $scope.CompletedRecords_K3_T44 = 0;

            $scope.UploadedRecords_K1_T44 = 0;
            $scope.UploadedRecords_K2_T44 = 0;
            $scope.UploadedRecords_K3_T44 = 0;

            // Cooking and blast chilling template
            $scope.PendingRecords_K1_T2 = 0;
            $scope.PendingRecords_K2_T2 = 0;
            $scope.PendingRecords_K3_T2 = 0;

            $scope.HandoverRecords_K1_T2 = 0;
            $scope.HandoverRecords_K2_T2 = 0;
            $scope.HandoverRecords_K3_T2 = 0;

            $scope.CompletedRecords_K1_T2 = 0;
            $scope.CompletedRecords_K2_T2 = 0;
            $scope.CompletedRecords_K3_T2 = 0;

            $scope.UploadedRecords_K1_T2 = 0;
            $scope.UploadedRecords_K2_T2 = 0;
            $scope.UploadedRecords_K3_T2 = 0;

            // Cooking and blast chilling verification template
            $scope.PendingRecords_K1_T3 = 0;
            $scope.PendingRecords_K2_T3 = 0;
            $scope.PendingRecords_K3_T3 = 0;

            $scope.HandoverRecords_K1_T3 = 0;
            $scope.HandoverRecords_K2_T3 = 0;
            $scope.HandoverRecords_K3_T3 = 0;

            $scope.CompletedRecords_K1_T3 = 0;
            $scope.CompletedRecords_K2_T3 = 0;
            $scope.CompletedRecords_K3_T3 = 0;

            $scope.UploadedRecords_K1_T3 = 0;
            $scope.UploadedRecords_K2_T3 = 0;
            $scope.UploadedRecords_K3_T3 = 0;

            // Thawing and Verification
            $scope.PendingRecords_K1_T77 = 0;
            $scope.PendingRecords_K2_T77 = 0;
            $scope.PendingRecords_K3_T77 = 0;

            $scope.HandoverRecords_K1_T77 = 0;
            $scope.HandoverRecords_K2_T77 = 0;
            $scope.HandoverRecords_K3_T77 = 0;

            $scope.CompletedRecords_K1_T77 = 0;
            $scope.CompletedRecords_K2_T77 = 0;
            $scope.CompletedRecords_K3_T77 = 0;

            $scope.UploadedRecords_K1_T77 = 0;
            $scope.UploadedRecords_K2_T77 = 0;
            $scope.UploadedRecords_K3_T77 = 0;

            // BakingBC And Verification
            $scope.PendingRecords_K1_T88 = 0;
            $scope.PendingRecords_K2_T88 = 0;
            $scope.PendingRecords_K3_T88 = 0;

            $scope.HandoverRecords_K1_T88 = 0;
            $scope.HandoverRecords_K2_T88 = 0;
            $scope.HandoverRecords_K3_T88 = 0;

            $scope.CompletedRecords_K1_T88 = 0;
            $scope.CompletedRecords_K2_T88 = 0;
            $scope.CompletedRecords_K3_T88 = 0;

            $scope.UploadedRecords_K1_T88 = 0;
            $scope.UploadedRecords_K2_T88 = 0;
            $scope.UploadedRecords_K3_T88 = 0;

            // Dispatching And Verification
            $scope.PendingRecords_K1_T99 = 0;
            $scope.PendingRecords_K2_T99 = 0;
            $scope.PendingRecords_K3_T99 = 0;

            $scope.HandoverRecords_K1_T99 = 0;
            $scope.HandoverRecords_K2_T99 = 0;
            $scope.HandoverRecords_K3_T99 = 0;

            $scope.CompletedRecords_K1_T99 = 0;
            $scope.CompletedRecords_K2_T99 = 0;
            $scope.CompletedRecords_K3_T99 = 0;

            $scope.UploadedRecords_K1_T99 = 0;
            $scope.UploadedRecords_K2_T99 = 0;
            $scope.UploadedRecords_K3_T99 = 0;

            // Temperature Verification Of Tray-Setting
            $scope.PendingRecords_K1_T116 = 0;
            $scope.PendingRecords_K2_T116 = 0;
            $scope.PendingRecords_K3_T116 = 0;

            $scope.HandoverRecords_K1_T116 = 0;
            $scope.HandoverRecords_K2_T116 = 0;
            $scope.HandoverRecords_K3_T116 = 0;

            $scope.CompletedRecords_K1_T116 = 0;
            $scope.CompletedRecords_K2_T116 = 0;
            $scope.CompletedRecords_K3_T116 = 0;

            $scope.UploadedRecords_K1_T116 = 0;
            $scope.UploadedRecords_K2_T116 = 0;
            $scope.UploadedRecords_K3_T116 = 0;

            // Temperature Verification Of Pastry Portioning
            $scope.PendingRecords_K1_T128 = 0;
            $scope.PendingRecords_K2_T128 = 0;
            $scope.PendingRecords_K3_T128 = 0;

            $scope.HandoverRecords_K1_T128 = 0;
            $scope.HandoverRecords_K2_T128 = 0;
            $scope.HandoverRecords_K3_T128 = 0;

            $scope.CompletedRecords_K1_T128 = 0;
            $scope.CompletedRecords_K2_T128 = 0;
            $scope.CompletedRecords_K3_T128 = 0;

            $scope.UploadedRecords_K1_T128 = 0;
            $scope.UploadedRecords_K2_T128 = 0;
            $scope.UploadedRecords_K3_T128 = 0;

            // Temperature Verification Of Hot Meal Dishing
            $scope.PendingRecords_K1_T140 = 0;
            $scope.PendingRecords_K2_T140 = 0;
            $scope.PendingRecords_K3_T140 = 0;

            $scope.HandoverRecords_K1_T140 = 0;
            $scope.HandoverRecords_K2_T140 = 0;
            $scope.HandoverRecords_K3_T140 = 0;

            $scope.CompletedRecords_K1_T140 = 0;
            $scope.CompletedRecords_K2_T140 = 0;
            $scope.CompletedRecords_K3_T140 = 0;

            $scope.UploadedRecords_K1_T140 = 0;
            $scope.UploadedRecords_K2_T140 = 0;
            $scope.UploadedRecords_K3_T140 = 0;

            // FoodSafety And Cleaning
            $scope.PendingRecords_K1_T153 = 0;
            $scope.PendingRecords_K2_T153 = 0;
            $scope.PendingRecords_K3_T153 = 0;

            $scope.HandoverRecords_K1_T153 = 0;
            $scope.HandoverRecords_K2_T153 = 0;
            $scope.HandoverRecords_K3_T153 = 0;

            $scope.CompletedRecords_K1_T153 = 0;
            $scope.CompletedRecords_K2_T153 = 0;
            $scope.CompletedRecords_K3_T153 = 0;

            $scope.UploadedRecords_K1_T153 = 0;
            $scope.UploadedRecords_K2_T153 = 0;
            $scope.UploadedRecords_K3_T153 = 0;

            // Temperature Verification of Cold Meal Dishing
            $scope.PendingRecords_K1_T282 = 0;
            $scope.PendingRecords_K2_T282 = 0;
            $scope.PendingRecords_K3_T282 = 0;

            $scope.HandoverRecords_K1_T282 = 0;
            $scope.HandoverRecords_K2_T282 = 0;
            $scope.HandoverRecords_K3_T282 = 0;

            $scope.CompletedRecords_K1_T282 = 0;
            $scope.CompletedRecords_K2_T282 = 0;
            $scope.CompletedRecords_K3_T282 = 0;

            $scope.UploadedRecords_K1_T282 = 0;
            $scope.UploadedRecords_K2_T282 = 0;
            $scope.UploadedRecords_K3_T282 = 0;

            // Temperature Verification of Aircraft Loading
            $scope.PendingRecords_K1_T293 = 0;
            $scope.PendingRecords_K2_T293 = 0;
            $scope.PendingRecords_K3_T293 = 0;

            $scope.HandoverRecords_K1_T293 = 0;
            $scope.HandoverRecords_K2_T293 = 0;
            $scope.HandoverRecords_K3_T293 = 0;

            $scope.CompletedRecords_K1_T293 = 0;
            $scope.CompletedRecords_K2_T293 = 0;
            $scope.CompletedRecords_K3_T293 = 0;

            $scope.UploadedRecords_K1_T293 = 0;
            $scope.UploadedRecords_K2_T293 = 0;
            $scope.UploadedRecords_K3_T293 = 0;


            OneViewConsole.Debug("Init end", "MyAuditFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.Init", xlatService);
        }
    }

    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "MyAuditFacade.PageLoad");
            //Destroy html
            var oOneViewSidePanel = new OneViewSidePanel();
            oOneViewSidePanel.Clear();

            var _oDataCaptureBO = new DataCaptureBO();
            _oDataCaptureBO.SetDefaultAutoTemperatureListener();
            _MyAuditBO.UpdateUI();

            OneViewConsole.Debug("PageLoad end", "MyAuditFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.PageLoad", xlatService);
        }
        finally {
            _oDataCaptureBO = null;
        }
    }

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

    this.NEW = function (TemplateId, DcPlaceId, Type) {

        try {
            OneViewConsole.Debug("NEW start", "MyAuditFacade.NEW");

            _MyAuditBO.NEW(TemplateId, DcPlaceId, Type);

            OneViewConsole.Debug("NEW end", "MyAuditFacade.NEW");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.PREVIEW", xlatService);
        }
    }

    this.EDIT = function (TemplateId, DcPlaceId, Type) {

        try {
            OneViewConsole.Debug("EDIT start", "MyAuditFacade.EDIT");

            _MyAuditBO.LoadViewRecordsPage(TemplateId, DcPlaceId);

            OneViewConsole.Debug("EDIT end", "MyAuditFacade.EDIT");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.EDIT", xlatService);
        }
    }

    this.DELETE = function (TemplateId, DcPlaceId, Type) {
        try {
            OneViewConsole.Debug("DELETE start", "MyAuditFacade.DELETE");

            //toaster.pop('info', xlatService.xlat('Title_Notification'), xlatService.xlat('Not_Enabled'));
            alert(xlatService.xlat('Not_Enabled'));

            OneViewConsole.Debug("DELETE end", "MyAuditFacade.DELETE");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.DELETE", xlatService);
        }
    }

    this.APPROVE = function (TemplateId, DcPlaceId, Type) {
        try {
            OneViewConsole.Debug("APPROVE start", "MyAuditFacade.APPROVE");

            //toaster.pop('info', xlatService.xlat('Title_Notification'), xlatService.xlat('Not_Enabled'));
            alert(xlatService.xlat('Not_Enabled'));

            OneViewConsole.Debug("APPROVE end", "MyAuditFacade.APPROVE");
        }
        catch (Excep) {

            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.APPROVE", xlatService);
        }
    }

    this.UPLOAD = function (TemplateId, DcPlaceId, Type) {

        try {
            OneViewConsole.Debug("UPLOAD start", "MyAuditFacade.UPLOAD");

            // Network status checking
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

            if (NetworkStatus.IsNetworkAvailable == true) {
                _MyAuditBO.Upload(TemplateId, DcPlaceId, Type, false);
                MyInstance.Init();
                MyInstance.PageLoad();
            }
            else {
                // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No internet connection", "UploadDcFacade.Upload");
            }

            OneViewConsole.Debug("UPLOAD end", "MyAuditFacade.UPLOAD");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyAuditFacade.UPLOAD", xlatService);
        }
        finally {
            oOneViewCordovaPlugin = null;
            NetworkStatus = null;
        }
    }

    this.GROUP_UPLOAD = function (TemplateId, Type) {

        try {
            OneViewConsole.Debug("GROUP_UPLOAD start", "MyAuditFacade.GROUP_UPLOAD");

            // Network status checking
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

            if (NetworkStatus.IsNetworkAvailable == true) {
                _MyAuditBO.Upload(TemplateId, -1, Type, true);
                MyInstance.Init();
                MyInstance.PageLoad();
            }
            else {
                //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                alert(xlatService.xlat('NoInternetConnection'));
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
}

function MyAuditBO($scope, $location, xlatService, toaster) {

    var MyInstance = this;

    this.UpdateUI = function () {

        try {
            OneViewConsole.Debug("UpdateUI start", "MyAuditBO.UpdateUI");

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var _oDcDAO = new DcDAO();

            var TemplateInfo = _oDcDAO.GetUserTemplates(LoginUserId, ServiceId);

            for (var i = 0; i < TemplateInfo.length; i++) {

                if (TemplateInfo[i].TemplateNodeId == 44) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(44, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(44, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(44, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 44, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T44 = true;
                            $scope.PendingRecords_K1_T44 = _oDcDAO.GetPendingRecordsCount(44, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T44 = _oDcDAO.GetCompletedRecordsCount(44, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T44 = _oDcDAO.GetUploadedRecordsCount(44, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 44, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T44 = true;
                            $scope.PendingRecords_K2_T44 = _oDcDAO.GetPendingRecordsCount(44, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T44 = _oDcDAO.GetCompletedRecordsCount(44, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T44 = _oDcDAO.GetUploadedRecordsCount(44, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 44, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T44 = true;
                            $scope.PendingRecords_K3_T44 = _oDcDAO.GetPendingRecordsCount(44, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T44 = _oDcDAO.GetCompletedRecordsCount(44, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T44 = _oDcDAO.GetUploadedRecordsCount(44, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.GoodsTemplate = true;
                    }
                }

                else if (TemplateInfo[i].TemplateNodeId == 2) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(2, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(2, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(2, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 2, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T2 = true;
                            $scope.PendingRecords_K1_T2 = _oDcDAO.GetPendingRecordsCount(2, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T2 = _oDcDAO.GetCompletedRecordsCount(2, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T2 = _oDcDAO.GetUploadedRecordsCount(2, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 2, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T2 = true;
                            $scope.PendingRecords_K2_T2 = _oDcDAO.GetPendingRecordsCount(2, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T2 = _oDcDAO.GetCompletedRecordsCount(2, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T2 = _oDcDAO.GetUploadedRecordsCount(2, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 2, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T2 = true;
                            $scope.PendingRecords_K3_T2 = _oDcDAO.GetPendingRecordsCount(2, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T2 = _oDcDAO.GetCompletedRecordsCount(2, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T2 = _oDcDAO.GetUploadedRecordsCount(2, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.MonitoringTemplate = true;
                    }
                }

                else if (TemplateInfo[i].TemplateNodeId == 3) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(3, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(3, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(3, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 3, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T3 = true;
                            $scope.PendingRecords_K1_T3 = _oDcDAO.GetPendingRecordsCount(3, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T3 = _oDcDAO.GetCompletedRecordsCount(3, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T3 = _oDcDAO.GetUploadedRecordsCount(3, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 3, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T3 = true;
                            $scope.PendingRecords_K2_T3 = _oDcDAO.GetPendingRecordsCount(3, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T3 = _oDcDAO.GetCompletedRecordsCount(3, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T3 = _oDcDAO.GetUploadedRecordsCount(3, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 3, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T3 = true;
                            $scope.PendingRecords_K3_T3 = _oDcDAO.GetPendingRecordsCount(3, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T3 = _oDcDAO.GetCompletedRecordsCount(3, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T3 = _oDcDAO.GetUploadedRecordsCount(3, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.VerificationTemplate = true;
                    }
                }
                else if (TemplateInfo[i].TemplateNodeId == 77) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(77, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(77, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(77, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 77, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T77 = true;
                            $scope.PendingRecords_K1_T77 = _oDcDAO.GetPendingRecordsCount(77, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T77 = _oDcDAO.GetCompletedRecordsCount(77, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T77 = _oDcDAO.GetUploadedRecordsCount(77, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 77, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T77 = true;
                            $scope.PendingRecords_K2_T77 = _oDcDAO.GetPendingRecordsCount(77, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T77 = _oDcDAO.GetCompletedRecordsCount(77, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T77 = _oDcDAO.GetUploadedRecordsCount(77, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 77, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T77 = true;
                            $scope.PendingRecords_K3_T77 = _oDcDAO.GetPendingRecordsCount(77, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T77 = _oDcDAO.GetCompletedRecordsCount(77, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T77 = _oDcDAO.GetUploadedRecordsCount(77, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.ThawingVerificationTemplate = true;
                    }
                }
                else if (TemplateInfo[i].TemplateNodeId == 88) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(88, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(88, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(88, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 88, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T88 = true;
                            $scope.PendingRecords_K1_T88 = _oDcDAO.GetPendingRecordsCount(88, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T88 = _oDcDAO.GetCompletedRecordsCount(88, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T88 = _oDcDAO.GetUploadedRecordsCount(88, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 88, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T88 = true;
                            $scope.PendingRecords_K2_T88 = _oDcDAO.GetPendingRecordsCount(88, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T88 = _oDcDAO.GetCompletedRecordsCount(88, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T88 = _oDcDAO.GetUploadedRecordsCount(88, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 88, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T88 = true;
                            $scope.PendingRecords_K3_T88 = _oDcDAO.GetPendingRecordsCount(88, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T88 = _oDcDAO.GetCompletedRecordsCount(88, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T88 = _oDcDAO.GetUploadedRecordsCount(88, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.BakingBCVerificationTemplate = true;
                    }
                }
                else if (TemplateInfo[i].TemplateNodeId == 99) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(99, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(99, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(99, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 99, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T99 = true;
                            $scope.PendingRecords_K1_T99 = _oDcDAO.GetPendingRecordsCount(99, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T99 = _oDcDAO.GetCompletedRecordsCount(99, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T99 = _oDcDAO.GetUploadedRecordsCount(99, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 99, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T99 = true;
                            $scope.PendingRecords_K2_T99 = _oDcDAO.GetPendingRecordsCount(99, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T99 = _oDcDAO.GetCompletedRecordsCount(99, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T99 = _oDcDAO.GetUploadedRecordsCount(99, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 99, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T99 = true;
                            $scope.PendingRecords_K3_T99 = _oDcDAO.GetPendingRecordsCount(99, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T99 = _oDcDAO.GetCompletedRecordsCount(99, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T99 = _oDcDAO.GetUploadedRecordsCount(99, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.DispatchingAndVerificationTemplate = true;
                    }
                }
                else if (TemplateInfo[i].TemplateNodeId == 116) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(116, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(116, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(116, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 116, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T116 = true;
                            $scope.PendingRecords_K1_T116 = _oDcDAO.GetPendingRecordsCount(116, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T116 = _oDcDAO.GetCompletedRecordsCount(116, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T116 = _oDcDAO.GetUploadedRecordsCount(116, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 116, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T116 = true;
                            $scope.PendingRecords_K2_T116 = _oDcDAO.GetPendingRecordsCount(116, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T116 = _oDcDAO.GetCompletedRecordsCount(116, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T116 = _oDcDAO.GetUploadedRecordsCount(116, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 116, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T116 = true;
                            $scope.PendingRecords_K3_T116 = _oDcDAO.GetPendingRecordsCount(116, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T116 = _oDcDAO.GetCompletedRecordsCount(116, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T116 = _oDcDAO.GetUploadedRecordsCount(116, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.TraySettingVerificationTemplate = true;
                    }
                }
                else if (TemplateInfo[i].TemplateNodeId == 128) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(128, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(128, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(128, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 128, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T128 = true;
                            $scope.PendingRecords_K1_T128 = _oDcDAO.GetPendingRecordsCount(128, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T128 = _oDcDAO.GetCompletedRecordsCount(128, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T128 = _oDcDAO.GetUploadedRecordsCount(128, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 128, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T128 = true;
                            $scope.PendingRecords_K2_T128 = _oDcDAO.GetPendingRecordsCount(128, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T128 = _oDcDAO.GetCompletedRecordsCount(128, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T128 = _oDcDAO.GetUploadedRecordsCount(128, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 128, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T128 = true;
                            $scope.PendingRecords_K3_T128 = _oDcDAO.GetPendingRecordsCount(128, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T128 = _oDcDAO.GetCompletedRecordsCount(128, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T128 = _oDcDAO.GetUploadedRecordsCount(128, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.PastryPortioningVerificationTemplate = true;
                    }
                }
                else if (TemplateInfo[i].TemplateNodeId == 140) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(140, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(140, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(140, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 140, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T140 = true;
                            $scope.PendingRecords_K1_T140 = _oDcDAO.GetPendingRecordsCount(140, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T140 = _oDcDAO.GetCompletedRecordsCount(140, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T140 = _oDcDAO.GetUploadedRecordsCount(140, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 140, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T140 = true;
                            $scope.PendingRecords_K2_T140 = _oDcDAO.GetPendingRecordsCount(140, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T140 = _oDcDAO.GetCompletedRecordsCount(140, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T140 = _oDcDAO.GetUploadedRecordsCount(140, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 140, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T140 = true;
                            $scope.PendingRecords_K3_T140 = _oDcDAO.GetPendingRecordsCount(140, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T140 = _oDcDAO.GetCompletedRecordsCount(140, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T140 = _oDcDAO.GetUploadedRecordsCount(140, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.HotMealDishingVerificationTemplate = true;
                    }
                }
                else if (TemplateInfo[i].TemplateNodeId == 153) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(153, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(153, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(153, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 153, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T153 = true;
                            $scope.PendingRecords_K1_T153 = _oDcDAO.GetPendingRecordsCount(153, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T153 = _oDcDAO.GetCompletedRecordsCount(153, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T153 = _oDcDAO.GetUploadedRecordsCount(153, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 153, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T153 = true;
                            $scope.PendingRecords_K2_T153 = _oDcDAO.GetPendingRecordsCount(153, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T153 = _oDcDAO.GetCompletedRecordsCount(153, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T153 = _oDcDAO.GetUploadedRecordsCount(153, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 153, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T153 = true;
                            $scope.PendingRecords_K3_T153 = _oDcDAO.GetPendingRecordsCount(153, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T153 = _oDcDAO.GetCompletedRecordsCount(153, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T153 = _oDcDAO.GetUploadedRecordsCount(153, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.FoodSafetyAndCleaningTemplate = true;
                    }
                }
                else if (TemplateInfo[i].TemplateNodeId == 282) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(282, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(282, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(282, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 282, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T282 = true;
                            $scope.PendingRecords_K1_T282 = _oDcDAO.GetPendingRecordsCount(282, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T282 = _oDcDAO.GetCompletedRecordsCount(282, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T282 = _oDcDAO.GetUploadedRecordsCount(282, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 282, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T282 = true;
                            $scope.PendingRecords_K2_T282 = _oDcDAO.GetPendingRecordsCount(282, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T282 = _oDcDAO.GetCompletedRecordsCount(282, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T282 = _oDcDAO.GetUploadedRecordsCount(282, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 282, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T282 = true;
                            $scope.PendingRecords_K3_T282 = _oDcDAO.GetPendingRecordsCount(282, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T282 = _oDcDAO.GetCompletedRecordsCount(282, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T282 = _oDcDAO.GetUploadedRecordsCount(282, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.TemperatureVerificationofColdMealDishing = true;
                    }
                }
                else if (TemplateInfo[i].TemplateNodeId == 293) {

                    var IsExist = false;

                    var Kichen1Count = _oDcDAO.GetAllRecordsCount(293, 2, LoginUserId, ServiceId);
                    var Kichen2Count = _oDcDAO.GetAllRecordsCount(293, 3, LoginUserId, ServiceId);
                    var Kichen3Count = _oDcDAO.GetAllRecordsCount(293, 4, LoginUserId, ServiceId);

                    if (Kichen1Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 293, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T293 = true;
                            $scope.PendingRecords_K1_T293 = _oDcDAO.GetPendingRecordsCount(293, 2, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K1_T293 = _oDcDAO.GetCompletedRecordsCount(293, 2, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K1_T293 = _oDcDAO.GetUploadedRecordsCount(293, 2, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen2Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 293, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T293 = true;
                            $scope.PendingRecords_K2_T293 = _oDcDAO.GetPendingRecordsCount(293, 3, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K2_T293 = _oDcDAO.GetCompletedRecordsCount(293, 3, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K2_T293 = _oDcDAO.GetUploadedRecordsCount(293, 3, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }
                    if (Kichen3Count > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 293, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T293 = true;
                            $scope.PendingRecords_K3_T293 = _oDcDAO.GetPendingRecordsCount(293, 4, LoginUserId, ServiceId);
                            $scope.CompletedRecords_K3_T293 = _oDcDAO.GetCompletedRecordsCount(293, 4, LoginUserId, ServiceId);
                            $scope.UploadedRecords_K3_T293 = _oDcDAO.GetUploadedRecordsCount(293, 4, LoginUserId, ServiceId);
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.TemperatureVerificationofAircraftLoading = true;
                    }
                }
            }

            var HandoverTemplateInfo = _oDcDAO.GetHandoverTemplates(LoginUserId, ServiceId);

            for (var i = 0; i < HandoverTemplateInfo.length; i++) {

                if (HandoverTemplateInfo[i].TemplateNodeId == 44) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T44 = _oDcDAO.GetHandoverRecordsCount(44, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T44 = _oDcDAO.GetHandoverRecordsCount(44, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T44 = _oDcDAO.GetHandoverRecordsCount(44, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T44 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 44, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T44 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T44 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 44, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T44 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T44 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 44, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T44 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.GoodsTemplate = true;
                    }
                }

                else if (HandoverTemplateInfo[i].TemplateNodeId == 2) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T2 = _oDcDAO.GetHandoverRecordsCount(2, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T2 = _oDcDAO.GetHandoverRecordsCount(2, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T2 = _oDcDAO.GetHandoverRecordsCount(2, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T2 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 2, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T2 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T2 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 2, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T2 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T2 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 2, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T2 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.MonitoringTemplate = true;
                    }
                }

                else if (HandoverTemplateInfo[i].TemplateNodeId == 3) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T3 = _oDcDAO.GetHandoverRecordsCount(3, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T3 = _oDcDAO.GetHandoverRecordsCount(3, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T3 = _oDcDAO.GetHandoverRecordsCount(3, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T3 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 3, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T3 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T3 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 3, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T3 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T3 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 3, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T3 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.VerificationTemplate = true;
                    }
                }
                else if (HandoverTemplateInfo[i].TemplateNodeId == 77) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T77 = _oDcDAO.GetHandoverRecordsCount(77, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T77 = _oDcDAO.GetHandoverRecordsCount(77, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T77 = _oDcDAO.GetHandoverRecordsCount(77, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T77 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 77, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T77 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T77 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 77, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T77 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T77 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 77, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T77 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.ThawingVerificationTemplate = true;
                    }
                }
                else if (HandoverTemplateInfo[i].TemplateNodeId == 88) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T88 = _oDcDAO.GetHandoverRecordsCount(88, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T88 = _oDcDAO.GetHandoverRecordsCount(88, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T88 = _oDcDAO.GetHandoverRecordsCount(88, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T88 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 88, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T88 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T88 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 88, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T88 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T88 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 88, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T88 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.BakingBCVerificationTemplate = true;
                    }
                }
                else if (HandoverTemplateInfo[i].TemplateNodeId == 99) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T99 = _oDcDAO.GetHandoverRecordsCount(99, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T99 = _oDcDAO.GetHandoverRecordsCount(99, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T99 = _oDcDAO.GetHandoverRecordsCount(99, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T99 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 99, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T99 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T99 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 99, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T99 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T99 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 99, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T99 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.DispatchingAndVerificationTemplate = true;
                    }
                }
                else if (HandoverTemplateInfo[i].TemplateNodeId == 116) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T116 = _oDcDAO.GetHandoverRecordsCount(116, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T116 = _oDcDAO.GetHandoverRecordsCount(116, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T116 = _oDcDAO.GetHandoverRecordsCount(116, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T116 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 116, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T116 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T116 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 116, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T116 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T116 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 116, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T116 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.TraySettingVerificationTemplate = true;
                    }
                }
                else if (HandoverTemplateInfo[i].TemplateNodeId == 128) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T128 = _oDcDAO.GetHandoverRecordsCount(128, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T128 = _oDcDAO.GetHandoverRecordsCount(128, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T128 = _oDcDAO.GetHandoverRecordsCount(128, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T128 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 128, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T128 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T128 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 128, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T128 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T128 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 128, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T128 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.PastryPortioningVerificationTemplate = true;
                    }
                }
                else if (HandoverTemplateInfo[i].TemplateNodeId == 140) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T140 = _oDcDAO.GetHandoverRecordsCount(140, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T140 = _oDcDAO.GetHandoverRecordsCount(140, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T140 = _oDcDAO.GetHandoverRecordsCount(140, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T140 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 140, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T140 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T140 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 140, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T140 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T140 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 140, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T140 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.HotMealDishingVerificationTemplate = true;
                    }
                }
                else if (HandoverTemplateInfo[i].TemplateNodeId == 153) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T153 = _oDcDAO.GetHandoverRecordsCount(153, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T153 = _oDcDAO.GetHandoverRecordsCount(153, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T153 = _oDcDAO.GetHandoverRecordsCount(153, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T153 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 153, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T153 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T153 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 153, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T153 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T153 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 153, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T153 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.FoodSafetyAndCleaningTemplate = true;
                    }
                }
                else if (HandoverTemplateInfo[i].TemplateNodeId == 282) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T282 = _oDcDAO.GetHandoverRecordsCount(282, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T282 = _oDcDAO.GetHandoverRecordsCount(282, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T282 = _oDcDAO.GetHandoverRecordsCount(282, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T282 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 282, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T282 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T282 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 282, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T282 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T282 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 282, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T282 = true;
                            IsExist = true;
                        }
                    }
                    
                    if (IsExist == true) {
                        $scope.TemperatureVerificationofColdMealDishing = true;
                    }
                }
                else if (HandoverTemplateInfo[i].TemplateNodeId == 293) {

                    var IsExist = false;

                    $scope.HandoverRecords_K1_T293 = _oDcDAO.GetHandoverRecordsCount(293, 2, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K2_T293 = _oDcDAO.GetHandoverRecordsCount(293, 3, LoginUserId, ServiceId);
                    $scope.HandoverRecords_K3_T293 = _oDcDAO.GetHandoverRecordsCount(293, 4, LoginUserId, ServiceId);

                    if ($scope.HandoverRecords_K1_T293 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 293, 2, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K1_T293 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K2_T293 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 293, 3, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K2_T293 = true;
                            IsExist = true;
                        }
                    }

                    if ($scope.HandoverRecords_K3_T293 > 0) {
                        var IsProfileExists = _oDcDAO.IsProfileExists(LoginUserId, 293, 4, ServiceId);
                        if (IsProfileExists == true) {
                            $scope.K3_T293 = true;
                            IsExist = true;
                        }
                    }

                    if (IsExist == true) {
                        $scope.TemperatureVerificationofAircraftLoading = true;
                    }
                }
            }
            $scope.$apply();
            OneViewConsole.Debug("UpdateUI end", "MyAuditBO.UpdateUI");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.UpdateUI", Excep);
        }
        finally {
            ServiceId = null;
            LoginUserId = null;
            _oDcDAO = null;
            TemplateInfo = null;
            Kichen1Count = null;
            Kichen2Count = null;
            Kichen3Count = null;
            HandoverTemplateInfo = null;
        }
    }

    this.LoadViewRecordsPage = function (TemplateId, DcPlaceId) {

        try {
            OneViewConsole.Debug("LoadViewRecordsPage start", "MyAuditBO.LoadViewRecordsPage");

            SetTemplateAndDcPlaceDetails(TemplateId, DcPlaceId);
            OneViewSessionStorage.Remove("DcId");
            OneViewSessionStorage.Save("MyAuditEditForm", true);
            $location.path('/ViewRecords');

            OneViewConsole.Debug("LoadViewRecordsPage end", "MyAuditBO.LoadViewRecordsPage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.LoadViewRecordsPage", Excep);
        }
    }

    this.Upload = function (TemplateId, DcPlaceId, Type, IsGroupUpload) {

        try {
            OneViewConsole.Debug("Upload start", "MyAuditBO.Upload");

            if (Type != "Uploaded") {

                ProgressValue = 0;
                BatchNumber = 1;

                var _oDcFilterParamRequest = MakeDcFilterRequest(TemplateId, DcPlaceId, Type, IsGroupUpload);

                var _oDcDAO = new DcDAO();
                TotalDCCountForUpload = _oDcDAO.GetDCCountWithFilters(_oDcFilterParamRequest);

                var TotalBatches = TotalDCCountForUpload / UploadLimit;
                TotalBatches = Math.ceil(TotalBatches);

                ProgressValue = 100 / TotalBatches;

                if (TotalDCCountForUpload > 0) {

                    var Message = xlatService.xlat('Upload_confirm_Message');
                    var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                    if (IsSuccess == true) {

                        oOneViewProgressbar.Start("Uploading");

                        var _oUploadBO = new UploadBO(xlatService, toaster);
                        var IsSyncDynamicRcoAndAssetNodesSuccess = _oUploadBO.SyncDynamicRcoAndAssetNodes(true);

                        if (IsSyncDynamicRcoAndAssetNodesSuccess == true) {

                            _oUploadBO.BatchUpload(_oDcFilterParamRequest);

                            var _oDcDeletion = new DcDeletion();
                            _oDcDeletion.DeleteCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);

                            var _oOneViewAppConfig = new OneViewAppConfig();
                            _oOneViewAppConfig.CheckForNewUpdates(toaster);
                        }
                        else {
                            // toaster.pop('error', xlatService.xlat('Title_Error'), xlatService.xlat('UploadFailed'));
                            alert(xlatService.xlat('UploadFailed'));
                        }

                        oOneViewProgressbar.Stop();
                    }
                }
                else {
                    //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoDataForUpload'));
                    alert(xlatService.xlat('NoDataForUpload'));
                    OneViewConsole.Info("No dc available", "UploadDcFacade.UploadDcAndAction");
                }
            }
            else {
                //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('AlreadyUpload'));
                alert(xlatService.xlat('AlreadyUpload'));
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

    this.NewDC = function () {

        try {
            OneViewConsole.Debug("Upload start", "MyAuditBO.Upload");

            var UserId = OneViewSessionStorage.Get("LoginUserId");
            var query = "SELECT * FROM DcProfileEntity WHERE DcUserId= " + UserId;
            var result = window.OneViewSqlite.excecuteSqlReader(query);
            var queryresult = JSON.parse(result);
            if (queryresult.length > 0) {
                $location.url('/newdc');
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

    this.NEW = function (TemplateId, DcPlaceId, Type) {
        try {
            OneViewConsole.Debug("NEW start", "MyAuditBO.NEW");

            SetTemplateAndDcPlaceDetails(TemplateId, DcPlaceId);
            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
            OneViewSessionStorage.Remove("DefaultValueMetaData");
            OneViewSessionStorage.Remove("DcId");
            OneViewSessionStorage.Remove("NCMetaData");
            OneViewSessionStorage.Save("MyAuditForm", true);
            $location.url('/' + OneViewSessionStorage.Get("TemplateId"));

            OneViewConsole.Debug("NEW end", "MyAuditBO.NEW");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.SetTemplateAndDcPlaceDetails", Excep);
        }
        finally {
            TemplateNodeId = null;
        }
    }

    var MakeDcFilterRequest = function (TemplateId, DcPlaceId, Type, IsGroupUpload) {

        try {
            OneViewConsole.Debug("MakeDcFilterRequest start", "MyAuditBO.MakeDcFilterRequest");

            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var _oDcFilterParamRequest = new DcFilterParamRequest();
            _oDcFilterParamRequest.TemplateNodeId = TemplateId;
            _oDcFilterParamRequest.SystemUserId = LoginUserId;
            _oDcFilterParamRequest.IsSynchronized = 'false';

            if (IsGroupUpload != true) {
                _oDcFilterParamRequest.DcPlaceId = DcPlaceId;
            }

            if (Type == "Pending") {
                _oDcFilterParamRequest.IsCompleted = 'false';
            }

            if (Type == "Completed") {
                _oDcFilterParamRequest.IsCompleted = 'true';
            }

            OneViewConsole.Debug("MakeDcFilterRequest end", "MyAuditBO.MakeDcFilterRequest");

            return _oDcFilterParamRequest;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.MakeDcFilterRequest", Excep);
        }
        finally {
            LoginUserId = null;
            _oDcFilterParamRequest = null;
        }

    }

    var SetTemplateAndDcPlaceDetails = function (TemplateId, DcPlaceId) {
        try {
            OneViewConsole.Debug("SetTemplateAndDcPlaceDetails start", "MyAuditBO.SetTemplateAndDcPlaceDetails");

            OneViewSessionStorage.Save("TemplateId", TemplateId);
            OneViewSessionStorage.Save("DcPlaceId", DcPlaceId);

            OneViewConsole.Debug("SetTemplateAndDcPlaceDetails end", "MyAuditBO.SetTemplateAndDcPlaceDetails");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MyAuditBO.SetTemplateAndDcPlaceDetails", Excep);
        }
    }
}
