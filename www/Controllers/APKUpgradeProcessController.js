
var APKUpgradeWorkflowUIStatus;
var APKUpgradeProcessMetadata = null;
var GlobalxlatService = null;
var Globaltoaster = null;
var Globallocation = null;
var Globalscope = null;
var Globalcompile = null;
var Global$timeout = null;
var GlobalAPKUpgradeMetadata = {};
var GlobalAPKUpgradeMetadataForCurrentVersion = {};

MyApp.controller('APKUpgradeProcessController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
       
            
            var currentPage = '16';

            scope = $scope;
            oSnapRemote = snapRemote;


            var oAPKUpgradeProcessFacade = new APKUpgradeProcessFacade({ 'scope': $scope, 'document': $document, 'location': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });
            oAPKUpgradeProcessFacade.Init();
            oAPKUpgradeProcessFacade.PageLoad();


            $scope.$on('$destroy', function () {
                var oOneViewSidePanel = new OneViewSidePanel();
                oOneViewSidePanel.Clear();
                oAPKUpgradeProcessFacade.Destroy();
                xlatService.RemoveCurrentPageMetadata(currentPage);
            });

            $scope.Logout = function () {

                var IsSuccess = confirm(OneViewGlobalization[CurrentLanguage].SignOut_Confirm_Message);

                if (IsSuccess == true) {
                    $location.url('/login');
                    OneViewSessionStorage.Clear();
                    ClearGlobalVariable();
                }
            }

            $scope.CopyDbSupportEvent = function () {
                oAPKUpgradeProcessFacade.CopyDbSupportEvent();
            };

            $scope.UploadDbSupportEvent = function () {
                oAPKUpgradeProcessFacade.UploadDbSupportEvent();
            };

            $scope.UploadImagesAndDbAcrossServiceEvent = function () {
                oAPKUpgradeProcessFacade.UploadImagesAndDbAcrossServiceEvent();
            };

            $scope.StepEvent = function (StepNo, ClassName) {                
                oAPKUpgradeProcessFacade.StepEvent(StepNo, ClassName);
            };

            $scope.SkipStepEvent = function (StepNo, ClassName) {
                oAPKUpgradeProcessFacade.SkipStepEvent(StepNo, ClassName);
            };

            
    });


function APKUpgradeProcessFacade(parm) {

    var MyInstance = this;
    var xlatService = parm.xlatService;
    var toaster = parm.toaster;
    var location = parm.location;
    var scope = parm.scope;
    var compile = parm.compile;
    var $timeout = parm.$timeout;     
    APKUpgradeWorkflowUIStatus = {};
    var UpgradedFromVersion;

    GlobalxlatService = parm.xlatService;
    Globaltoaster = parm.toaster;
    Globallocation = parm.location;
    Globalscope = parm.scope;
    Globalcompile = parm.compile;
    Global$timeout = parm.$timeout;

    var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
    var oAPKUpgradeProcessUIComponent = new APKUpgradeProcessUIComponent();

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "APKUpgradeProcessFacade.Init");

            var currentPage = '16';
            xlatService.setCurrentPage(currentPage, false);

            GlobalAPKUpgradeMetadata = oAPKUpgradeProcessBO.GetAPKUpgradeProcessMetadata();
           
            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            if (APKUpgradeProcessStatus != null) {
                APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
                UpgradedFromVersion = APKUpgradeProcessStatus.CurrentVersion;
            }
            else {
                UpgradedFromVersion = oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName;
            }
            //Get Metadata for current version
            GlobalAPKUpgradeMetadataForCurrentVersion = oAPKUpgradeProcessBO.GetAPKUpgradeProcessMetadataForCurrentVersion(UpgradedFromVersion, GlobalAPKUpgradeMetadata);

            //Create and Save APKUpgradeProcessStatus
            if (OneViewLocalStorage.Get("APKUpgradeProcessStatus") == null) {
                oAPKUpgradeProcessBO.CreateAPKUpgradeProcessStatus(UpgradedFromVersion, GlobalAPKUpgradeMetadata.LatestVersion, GlobalAPKUpgradeMetadataForCurrentVersion);
            }
            else {
                oAPKUpgradeProcessBO.CreateUploadProcessStatusIfNotExists();               
            }

            oAPKUpgradeProcessBO.CreateUploadMultipleServicesStatusIfNotExists(xlatService);
            // update Upgrade Step status using current and latest version no.     

            oAPKUpgradeProcessBO.SetAPKUpgradeWorkflowUIStatus(GlobalAPKUpgradeMetadataForCurrentVersion);
            oAPKUpgradeProcessBO.SaveUserCredentialsInLocalStorage();

            OneViewConsole.Debug("Init End", "APKUpgradeProcessFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.Init", xlatService);
        }
    }

    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad Start", "APKUpgradeProcessFacade.PageLoad");
           
            //Generate Html based on metadata and Append Html - UI
            oAPKUpgradeProcessUIComponent.LoadHtml(scope, compile, 'APKUpgradeContentDivId', GlobalAPKUpgradeMetadataForCurrentVersion);
           
            var IsAutoUploadSuccess = MyInstance.AutoUpload(GlobalAPKUpgradeMetadataForCurrentVersion, true);
            var IsAutoUpgradeSuccess = MyInstance.AutoUpgrade(IsAutoUploadSuccess, GlobalAPKUpgradeMetadataForCurrentVersion);
            var IsRefreshSuccess = MyInstance.AutoRefresh(IsAutoUpgradeSuccess, GlobalAPKUpgradeMetadataForCurrentVersion);
          
            OneViewConsole.Debug("PageLoad End", "APKUpgradeProcessFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.PageLoad", xlatService);
        }
    }
    


    ////////////*****************************Auto Upload START*************************///////////////////////////////

    this.AutoUpload = function (GlobalAPKUpgradeMetadataForCurrentVersion, IsHideSuccessMsg) {
        try {
            OneViewConsole.Debug("AutoUpload Start", "APKUpgradeProcessFacade.AutoUpload");
            
            var IsSuccess = true;

            //If first step in upgrade process is Upload then start auto-upload
            if (GlobalAPKUpgradeMetadataForCurrentVersion.Workflow[1] == "Upload") {
                var UploadConfig = GlobalAPKUpgradeMetadataForCurrentVersion.WorkflowConfig["Upload"];
                if (UploadConfig != undefined && UploadConfig.Type == "Upload" && UploadConfig.IsAutoUpload == true) {

                    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");                   
                    var msg = "";

                    //Upload not done for current user and already next step is not done
                    var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
                    if (APKUpgradeProcessStatus != null) {
                        APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
                        var WorkflowStatus = APKUpgradeProcessStatus.WorkflowStatus;
                        var WFLength = Object.keys(WorkflowStatus).length;
                        if ( WorkflowStatus[1].Name == "Upload" && WorkflowStatus[1][LoginUserId] != undefined &&
                           (WorkflowStatus[1][LoginUserId].IsCompleted != true && WorkflowStatus[2] != undefined && WorkflowStatus[2].IsCompleted != true)) {
                            //alert(xlatService.xlat('UploadOnProgress'));
                            //document.getElementById("DivStepMessageId").innerHTML = "Auto upload on-progress.........";
                            //   oOneViewProgressbar.Start("IN-MG-AUP-016 :: We are going to upload all unsynched records. Please wait while the process completes.");
                            var msg = xlatService.xlat('Step') + "1" + xlatService.xlat('of') + WFLength + " : " + xlatService.xlat(UploadConfig.PreMessage);
                            // navigator.notification.alert(msg, ['OK'], "");                            
                            oOneViewProgressbar.Start(GlobalxlatService.xlat(msg));
                            IsSuccess = new window[UploadConfig.ClassName]().UploadHandler("1", IsHideSuccessMsg);
                           // IsSuccess = new APKUpgradeUploadStep().UploadHandler("1", IsHideSuccessMsg);
                            oOneViewProgressbar.Stop();
                            //if (IsSuccess != true) {
                            //    msg = "Error while auto uploading records, please try uploading records manually."                               
                            //}
                            //document.getElementById("DivStepMessageId").innerHTML = msg;
                        }


                    }
               
                }
                else {
                    IsSuccess = false;
                }
            }
            else {
                IsSuccess = false;
            }

            OneViewConsole.Debug("AutoUpload End", "APKUpgradeProcessFacade.AutoUpload");

            
            return IsSuccess;
        }
        catch (Excep) {
            oOneViewProgressbar.Stop();
           // alert('AutoUpload Excep : ' + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.AutoUpload", xlatService);
        }
    }

    ////////////*****************************Auto Upload END*************************///////////////////////////////







    ////////////*****************************Auto Upgrade START*************************///////////////////////////////

    this.AutoUpgrade = function (IsPrevStepSuccess, GlobalAPKUpgradeMetadataForCurrentVersion) {
        try {
            OneViewConsole.Debug("AutoUpgrade Start", "APKUpgradeProcessFacade.AutoUpgrade");

            var IsSuccess = false;
            if (IsPrevStepSuccess == true) {
                
                IsSuccess = oAPKUpgradeProcessBO.CheckUpgradeStepCompleted(oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName);
                if (IsSuccess != true) {
                    var Config = null;
                    var StepNo;
                    for (var i = 1; i <= Object.keys(GlobalAPKUpgradeMetadataForCurrentVersion.Workflow).length ; i++) {                        
                        if (GlobalAPKUpgradeMetadataForCurrentVersion.Workflow[i] == "Upgrade" || GlobalAPKUpgradeMetadataForCurrentVersion.Workflow[i] == "AppStoreUpgrade") {                            
                            StepNo = i;
                            Config = GlobalAPKUpgradeMetadataForCurrentVersion.WorkflowConfig[GlobalAPKUpgradeMetadataForCurrentVersion.Workflow[i]];                            
                            break;
                        }
                    }

                    if (StepNo != undefined) {                        
                       // alert(Config.ClassName);
                        ////new APKUpgradeUpgradeStep().Upgrade(StepNo);
                        var Methodcall = new window[Config.ClassName]().Execute(StepNo);

                    }
                }
            }

            OneViewConsole.Debug("AutoUpgrade End", "APKUpgradeProcessFacade.AutoUpgrade");

            return IsSuccess;
        }
        catch (Excep) {
           // alert('AutoUpgrade Excep : ' + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.AutoUpgrade", xlatService);
        }
    }

    ////////////*****************************Auto Upgrade END*************************///////////////////////////////





    ////////////*****************************Auto Refresh START*************************///////////////////////////////

    this.AutoRefresh = function (IsPrevStepSuccess, GlobalAPKUpgradeMetadataForCurrentVersion) {
        try {
            OneViewConsole.Debug("AutoRefresh Start", "APKUpgradeProcessFacade.AutoRefresh");

            var IsSuccess = false;
            if (IsPrevStepSuccess == true) {
               
                if (IsSuccess != true) {
                    var StepNo;
                    for (var i = 1; i <= Object.keys(GlobalAPKUpgradeMetadataForCurrentVersion.Workflow).length ; i++) {
                        if (GlobalAPKUpgradeMetadataForCurrentVersion.Workflow[i] == "Refresh") {
                            StepNo = i;
                            break;
                        }
                    }

                    if (StepNo != undefined) {
                        //alert(xlatService.xlat('BeforeRefreshStart'));
                        //new APKUpgradeRefreshStep().Refresh(StepNo, true);
                        var Config = GlobalAPKUpgradeMetadataForCurrentVersion.WorkflowConfig[GlobalAPKUpgradeMetadataForCurrentVersion.Workflow[StepNo]];
                        new window[Config.ClassName]().Refresh(StepNo, true);
                    }
                }
            }

            OneViewConsole.Debug("AutoRefresh End", "APKUpgradeProcessFacade.AutoRefresh");

            return IsSuccess;
        }
        catch (Excep) {
           // alert('AutoRefresh Excep : ' + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.AutoRefresh", xlatService);
        }
    }

    ////////////*****************************Auto Refresh END*************************///////////////////////////////

    ////////////*****************************Auto Login START*************************///////////////////////////////

    this.AutoLogin = function (IsPrevStepSuccess) {
        try {
            OneViewConsole.Debug("AutoLogin Start", "APKUpgradeProcessFacade.AutoLogin");
            
            if (IsPrevStepSuccess == true) {
                var oLoginFacade = new LoginFacade(xlatService);
                oLoginFacade.Login(scope, location, '', '');
            }

            OneViewConsole.Debug("AutoLogin End", "APKUpgradeProcessFacade.AutoLogin");

        }
        catch (Excep) {
           // alert('AutoLogin Excep : ' + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.AutoLogin", xlatService);
        }
    }

    ////////////*****************************Auto Refresh END*************************///////////////////////////////


    ////////////*****************************DB Operations Process START*************************///////////////////////////////

    this.CopyDbSupportEvent = function () {
        try {
            OneViewConsole.Debug("CopyDbSupportEvent Start", "APKUpgradeProcessFacade.CopyDbSupportEvent");

            var _oDbStructureController = new DbStructureController();
            _oDbStructureController.CopyDbAcrossServiceEvent(xlatService);


            OneViewConsole.Debug("CopyDbSupportEvent End", "APKUpgradeProcessFacade.CopyDbSupportEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.CopyDbSupportEvent", xlatService);
        }
    }

    this.UploadDbSupportEvent = function () {
        try {
            OneViewConsole.Debug("UploadDbSupportEvent Start", "APKUpgradeProcessFacade.UploadDbSupportEvent");

            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "APKUpgradeProcessFacade.UploadDbSupportEvent");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {
                var _oDbStructureController = new DbStructureController();
                _oDbStructureController.UploadDbAcrossService(xlatService);
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "APKUpgradeProcessFacade.UploadDbSupportEvent");
            }

            OneViewConsole.Debug("UploadDbSupportEvent End", "APKUpgradeProcessFacade.UploadDbSupportEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.UploadDbSupportEvent", xlatService);
        }
    }

    this.UploadImagesAndDbAcrossServiceEvent = function () {
        try {
            OneViewConsole.Debug("UploadImagesAndDbAcrossServiceEvent Start", "APKUpgradeProcessFacade.UploadImagesAndDbAcrossServiceEvent");

            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "APKUpgradeProcessFacade.UploadImagesAndDbAcrossServiceEvent");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {
                var _oDbStructureController = new DbStructureController();
                _oDbStructureController.UploadImagesAndDbAcrossService(xlatService);
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "APKUpgradeProcessFacade.UploadImagesAndDbAcrossServiceEvent");
            }

            OneViewConsole.Debug("UploadImagesAndDbAcrossServiceEvent End", "APKUpgradeProcessFacade.UploadImagesAndDbAcrossServiceEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.UploadImagesAndDbAcrossServiceEvent", xlatService);
        }
    }
    ////////////*****************************DB Operations Process END*************************///////////////////////////////


    ////////////*****************************Common Step Event START*************************///////////////////////////////

    this.StepEvent = function (StepNo, ClassName) {
        try {
            OneViewConsole.Debug("StepEvent Start", "APKUpgradeProcessFacade.StepEvent");
            
            var Methodcall = new window[ClassName]().Execute(StepNo);

            OneViewConsole.Debug("StepEvent End", "APKUpgradeProcessFacade.StepEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.StepEvent", xlatService);
        }
    }

    ////////////*****************************Common Step Event END*************************///////////////////////////////


    this.Destroy = function (StepNo, ClassName) {
        try {
            OneViewConsole.Debug("Destroy Start", "APKUpgradeProcessFacade.Destroy");

            GlobalAPKUpgradeMetadata = {};
            GlobalAPKUpgradeMetadataForCurrentVersion = {};
            GlobalxlatService = null;

            OneViewConsole.Debug("Destroy End", "APKUpgradeProcessFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.Destroy", xlatService);
        }
    }

    this.SkipStepEvent = function (StepNo, ClassName) {
        try {
            OneViewConsole.Debug("SkipStepEvent Start", "APKUpgradeProcessFacade.SkipStepEvent");

            var IsSkipAllowed = true;
            var Methodcall = new window[ClassName]().Execute(StepNo, IsSkipAllowed);

            OneViewConsole.Debug("SkipStepEvent End", "APKUpgradeProcessFacade.SkipStepEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "APKUpgradeProcessFacade.SkipStepEvent", xlatService);
        }
    }

}






function APKUpgradeProcessUIComponent() {

    var MyInstance = this;
    var oScope = null;
    this.LoadHtml = function ($scope, $compile, Id, APKUpgradeMetadataForCurrentVersion) {
        try {
            oScope = $scope;
            var Html = MyInstance.GetHtml(APKUpgradeMetadataForCurrentVersion);            
            MyInstance.AppendHtml(oScope, $compile, Html, Id);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "APKUpgradeProcessUIComponent.LoadHtml", Excep);
        }
        finally {
        }
    }

    this.GetHtml = function (APKUpgradeMetadataForCurrentVersion) {
        try {
            var Html = "";
            
            Html += MyInstance.GetStepAndSkipHtml(APKUpgradeMetadataForCurrentVersion, true);
            Html += "<br/>";
            Html += MyInstance.GetStepAndSkipHtml(APKUpgradeMetadataForCurrentVersion, false);

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "APKUpgradeProcessUIComponent.GetHtml", Excep);
        }
        finally {
        }
    }

    this.GetStepAndSkipHtml = function (APKUpgradeMetadataForCurrentVersion,IsStepHtml) {
        try {
            var Html = "";
            for (var i = 1; i <= Object.keys(APKUpgradeMetadataForCurrentVersion.Workflow).length ; i++) {
                var StepName = APKUpgradeMetadataForCurrentVersion.Workflow[i];
                var StepId = "Step" + i + "ControlId";
                var IsEnabled = APKUpgradeWorkflowUIStatus[i].IsEnabled;
                var IsShowNextIcon = APKUpgradeWorkflowUIStatus[i].IsShowNextIcon;
                var WorkflowConfig = APKUpgradeMetadataForCurrentVersion.WorkflowConfig;
                var ClassName = WorkflowConfig[StepName].ClassName;
                var IsSkipAllowed = WorkflowConfig[StepName].IsSkipAllowed;


                if (IsStepHtml == true) {
                    switch (StepName) {
                        case "Upload": {
                            Html += MyInstance.GetStepHtml(GlobalxlatService.xlat("Upload"), i, StepId, IsEnabled, IsShowNextIcon, ClassName, IsSkipAllowed);
                            break;
                        }
                        case "Upload Db": {
                            Html += MyInstance.GetStepHtml(GlobalxlatService.xlat("Upload Data"), i, StepId, IsEnabled, IsShowNextIcon, ClassName, IsSkipAllowed);
                            break;
                        }
                        case "Upgrade": {
                            Html += MyInstance.GetStepHtml(GlobalxlatService.xlat("Upgrade"), i, StepId, IsEnabled, IsShowNextIcon, ClassName, IsSkipAllowed);
                            break;
                        }
                        case "AppStoreUpgrade": {
                            Html += MyInstance.GetStepHtml(GlobalxlatService.xlat("Upgrade"), i, StepId, IsEnabled, IsShowNextIcon, ClassName, IsSkipAllowed);
                            break;
                        }
                        case "Refresh": {
                            Html += MyInstance.GetStepHtml(GlobalxlatService.xlat("Refresh"), i, StepId, IsEnabled, IsShowNextIcon, ClassName, IsSkipAllowed);
                            break;
                        }
                        case "SchemaModify": {
                            Html += MyInstance.GetStepHtml(GlobalxlatService.xlat("Schema Upgrade"), i, StepId, IsEnabled, IsShowNextIcon, ClassName, IsSkipAllowed);
                            break;
                        }
                        default: {
                            Html += MyInstance.GetStepHtml(GlobalxlatService.xlat(StepName), i, StepId, IsEnabled, IsShowNextIcon, ClassName, IsSkipAllowed);
                            break;
                        }
                    }
                }

                else {
                    Html += MyInstance.GetSKipHtml(i, StepId, IsEnabled, ClassName, IsSkipAllowed);
                }
            }

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "APKUpgradeProcessUIComponent.GetHtml", Excep);
        }
        finally {
        }
    }

    this.GetUploadHtml = function (DisplayName, StepNo, StepId, IsEnabled, IsShowNextIcon) {
        try {
            var DisableStatus = StepId + '_DisableStatus';
            oScope[DisableStatus] = !IsEnabled;
            var Html = ' <a href="javascript:void(0)" class="button button-secondary" id="' + StepId + '" ng-click="Upload(' + StepNo + ')" ng-disabled="' + DisableStatus + '">' + DisplayName ;
            if (IsShowNextIcon == true) {
                Html += '<i class="icon icon-chevron-right"></i>';
            }
            Html += '</a>';

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "APKUpgradeProcessUIComponent.GetUploadHtml", Excep);
        }
        finally {
        }
    }

    this.GetUpgradeHtml = function (DisplayName, StepNo, StepId, IsEnabled, IsShowNextIcon) {
        try {
            var DisableStatus = StepId + '_DisableStatus';
            oScope[DisableStatus] = !IsEnabled;
            var Html = ' <a href="javascript:void(0)" class="button button-secondary" id="' + StepId + '" ng-click="Upgrade(' + StepNo + ')" ng-disabled="' + DisableStatus + '" >' + DisplayName ;
            if (IsShowNextIcon == true) {
                Html += '<i class="icon icon-chevron-right"></i>';
            }
            Html += '</a>';
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "APKUpgradeProcessUIComponent.GetUpgradeHtml", Excep);
        }
        finally {
        }
    }

    this.GetRefreshHtml = function (DisplayName, StepNo, StepId, IsEnabled, IsShowNextIcon) {
        try {
            var DisableStatus = StepId + '_DisableStatus';
            oScope[DisableStatus] = !IsEnabled;
            var Html = ' <a href="javascript:void(0)" class="button button-secondary" id="' + StepId + '" ng-click="Refresh(' + StepNo + ')" ng-disabled="' + DisableStatus + '">' + DisplayName;
            if (IsShowNextIcon == true) {
                Html += '<i class="icon icon-chevron-right"></i>';
            }
            Html += '</a>';
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "APKUpgradeProcessUIComponent.GetRefreshHtml", Excep);
        }
        finally {
        }
    }

    this.GetUploadDbHtml = function (DisplayName, StepNo, StepId, IsEnabled, IsShowNextIcon) {
        try {
            var DisableStatus = StepId + '_DisableStatus';
            oScope[DisableStatus] = !IsEnabled;
            var Html = ' <a href="javascript:void(0)" class="button button-secondary" id="' + StepId + '" ng-click="UploadDb(' + StepNo + ')" ng-disabled="' + DisableStatus + '">' + DisplayName;
            if (IsShowNextIcon == true) {
                Html += '<i class="icon icon-chevron-right"></i>';
            }
            Html += '</a>';
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "APKUpgradeProcessUIComponent.GetUploadDbHtml", Excep);
        }
        finally {
        }
    }

    this.AppendHtml = function ($scope, $compile, Html, Id) {
        try {
            OneViewConsole.Debug("AppendHtml Start", "NewDcBO.AppendHtml");

            var _oOneViewCompiler = new OneViewCompiler();
            _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, Id);

            OneViewConsole.Debug("AppendHtml End", "NewDcBO.AppendHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.AppendHtml", Excep);
        }
    }

    this.RefreshPageHtml = function ($scope) {
        try {
            OneViewConsole.Debug("RefreshPageHtml Start", "NewDcBO.RefreshPageHtml");

            for (var i = 1; i <= Object.keys(APKUpgradeWorkflowUIStatus).length ; i++) {
                var DisableStatus = "Step" + i + "ControlId_DisableStatus";
                $scope[DisableStatus] = !(APKUpgradeWorkflowUIStatus[i].IsEnabled);
            }

            OneViewConsole.Debug("RefreshPageHtml End", "NewDcBO.RefreshPageHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.RefreshPageHtml", Excep);
        }
    }

    this.GetStepHtml = function (DisplayName, StepNo, StepId, IsEnabled, IsShowNextIcon, ClassName, IsSkipAllowed) {
        try {
            var ClassName = "'" + ClassName + "'";
            var DisableStatus = StepId + '_DisableStatus';
            oScope[DisableStatus] = !IsEnabled;            
            var Html = ' <a href="javascript:void(0)" class="button button-secondary" id="' + StepId + '" ng-click="StepEvent(' + StepNo + ',' + ClassName + ')" ng-disabled="' + DisableStatus + '">' + DisplayName;           
            if (IsShowNextIcon == true) {
                Html += '<i class="icon icon-chevron-right"></i>';
            }
            Html += '</a>';

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "APKUpgradeProcessUIComponent.GetStepHtml", Excep);
        }
        finally {
        }
    }

    this.GetSKipHtml = function (StepNo, StepId, IsEnabled, ClassName, IsSkipAllowed) {
        try {
            var ClassName = "'" + ClassName + "'";
            var DisableStatus = StepId + '_DisableStatus';
            oScope[DisableStatus] = !IsEnabled;
            var Html = "";
            if (IsSkipAllowed == true) {
                Html += '<button class="button" ng-click="SkipStepEvent(' + StepNo + ',' + ClassName + ')" ng-disabled="' + DisableStatus + '">' + GlobalxlatService.xlat('Skip') + '</button>';
            }
            else {
                Html += "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;";
            }
           

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "APKUpgradeProcessUIComponent.GetStepHtml", Excep);
        }
        finally {
        }
    }
}



function APKUpgradeProcessBO() {

    var MyInstance = this;
    var oAPKUpgradeProcessUIComponent = new APKUpgradeProcessUIComponent();

    this.CheckIsUpgradeAvailable = function () {
        try {
            OneViewConsole.Debug("CheckIsUpgradeAvailable start", "APKUpgradeProcessBO.CheckIsUpgradeAvailable");

            var response = { IsUpgradeAvailable: false, CurrentVersion: '',LatestVersion :'' };

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                var LocalAppInfo = oOneViewAppInfoPlugin.GetLocalAppInfo();
                var AppInfoResponse = oOneViewAppInfoPlugin.GetRemoteAppInfo(OneViewSessionStorage.Get("ServiceId"), oneViewGlobalVariables.FoodSafetyServiceURL);

                if (AppInfoResponse.IsAnyException != true) {
                    var RemoteAppInfo = AppInfoResponse.AppInfo;
                    response.CurrentVersion = LocalAppInfo.VersionName;
                    response.LatestVersion = RemoteAppInfo.VersionName;
                    if (LocalAppInfo != "" && LocalAppInfo != null && LocalAppInfo != undefined) {
                        LocalAppInfo.VersionName = parseInt(LocalAppInfo.VersionName.replace(/\./g, ''));
                    }
                    if (RemoteAppInfo != "" && RemoteAppInfo != null && RemoteAppInfo != undefined) {
                        RemoteAppInfo.VersionName = parseInt(RemoteAppInfo.VersionName.replace(/\./g, ''));
                    }

                    if (RemoteAppInfo != "") {
                        if (LocalAppInfo.VersionName < RemoteAppInfo.VersionName) {
                            response.IsUpgradeAvailable = true;
                        }
                    }
                }

                else {
                    alert(GlobalxlatService.xlat(AppInfoResponse.Message));
                }
            }

            OneViewConsole.Debug("CheckIsUpgradeAvailable end", "APKUpgradeProcessBO.CheckIsUpgradeAvailable");

            return response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.CheckIsUpgradeAvailable", Excep);
        }
        finally {

        }
    }

    this.GetAPKUpgradeProcessMetadata = function () {
        try {
            OneViewConsole.Debug("GetAPKUpgradeProcessMetadata Start", "APKUpgradeProcessBO.GetAPKUpgradeProcessMetadata");
            //var APKUpgradeMetadata;
            // if (APKUpgradeProcessMetadata == null) {
            APKUpgradeProcessMetadata = OneViewLocalStorage.Get("APKUpgradeProcessMetadata");
            if (APKUpgradeProcessMetadata != null) {
                APKUpgradeProcessMetadata = JSON.parse(APKUpgradeProcessMetadata);
            }
            //}
            // APKUpgradeMetadata = APKUpgradeProcessMetadata;

            OneViewConsole.Debug("GetAPKUpgradeProcessMetadata End", "APKUpgradeProcessBO.GetAPKUpgradeProcessMetadata");

            return APKUpgradeProcessMetadata;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.GetAPKUpgradeProcessMetadata", Excep);
        }
    }

    this.GetAPKUpgradeProcessMetadataForCurrentVersion = function (CurrentVersion, APKUpgradeMetadata) {
        try {
            OneViewConsole.Debug("GetAPKUpgradeProcessMetadataForCurrentVersion start", "APKUpgradeProcessBO.GetAPKUpgradeProcessMetadataForCurrentVersion");

            var APKUpgradeMetadataForCurrentVersion = APKUpgradeMetadata.UpgradtionWorkFlow[CurrentVersion];
            if (APKUpgradeMetadataForCurrentVersion == undefined) {
                APKUpgradeMetadataForCurrentVersion = APKUpgradeMetadata.UpgradtionWorkFlow["Default"];
            }

            OneViewConsole.Debug("GetAPKUpgradeProcessMetadataForCurrentVersion end", "APKUpgradeProcessBO.GetAPKUpgradeProcessMetadataForCurrentVersion");

            return APKUpgradeMetadataForCurrentVersion;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.GetAPKUpgradeProcessMetadataForCurrentVersion", Excep);
        }
        finally {

        }
    }


    this.SetUpgradeStepCompleted = function (CurrentVersion, LatestVersion) {
        try {
            OneViewConsole.Debug("SetUpgradeStepCompleted start", "APKUpgradeProcessBO.SetUpgradeStepCompleted");

            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            if (APKUpgradeProcessStatus != null) {
                APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);

                var WorkflowStatus = APKUpgradeProcessStatus.WorkflowStatus;
                var WorkflowLength = Object.keys(WorkflowStatus).length;
                for (var i = 1; i <= WorkflowLength ; i++) {
                    if (WorkflowStatus[i].Name == 'Upgrade' || WorkflowStatus[i].Name == "AppStoreUpgrade") {                        
                        if (WorkflowStatus[i].IsCompleted != true && CurrentVersion == LatestVersion) {
                            if (i == WorkflowLength) {
                                MyInstance.UpdateAPKUpgradeProcessStatus(true, true, i, true);
                            }
                            else {
                                MyInstance.UpdateAPKUpgradeProcessStatus(true, false, i, true);
                            }
                            break;
                        }
                    }
                }               
            }
            OneViewConsole.Debug("SetUpgradeStepCompleted end", "APKUpgradeProcessBO.SetUpgradeStepCompleted");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.SetUpgradeStepCompleted", Excep);
        }
        finally {

        }
    }

    this.CheckUpgradeStepCompleted = function (CurrentVersion) {
        try {
            OneViewConsole.Debug("CheckUpgradeStepCompleted start", "APKUpgradeProcessBO.CheckUpgradeStepCompleted");

            var IsSuccess = false;
            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            if (APKUpgradeProcessStatus != null) {
                APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);

                var WorkflowStatus = APKUpgradeProcessStatus.WorkflowStatus;
                var WorkflowLength = Object.keys(WorkflowStatus).length;
                for (var i = 1; i <= WorkflowLength ; i++) {
                    if (WorkflowStatus[i].Name == 'Upgrade' || WorkflowStatus[i].Name == "AppStoreUpgrade") {
                        if (CurrentVersion == APKUpgradeProcessStatus.LatestVersion) {
                            IsSuccess = true;
                            break;
                        }
                    }
                }
            }

            OneViewConsole.Debug("CheckUpgradeStepCompleted end", "APKUpgradeProcessBO.CheckUpgradeStepCompleted");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.CheckUpgradeStepCompleted", Excep);
        }
        finally {

        }
    }


    ////////////////////************************************Create and Update APKUpgradeProcess Status START************************************////////////////////

    this.CreateAPKUpgradeProcessStatus = function (CurrentVersion, LatestVersion, APKUpgradeMetadataForCurrentVersion) {
        try {
            OneViewConsole.Debug("CreateAPKUpgradeProcessStatus start", "APKUpgradeProcessBO.CreateAPKUpgradeProcessStatus");

            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
            var LoginUserName = OneViewSessionStorage.Get("LoginUserName");

            var APKUpgradeProcessStatus = {
                IsAPKUpgradeCompleted: false,
                LatestVersion: LatestVersion,
                CurrentVersion: CurrentVersion,
                IsAPKUpgradeProcessStarted: true,
                WorkflowStatus: {}
            };

            for (var i = 1; i <= Object.keys(APKUpgradeMetadataForCurrentVersion.Workflow).length ; i++) {
                var StepDetails = {};

                if (APKUpgradeMetadataForCurrentVersion.Workflow[i] == "Upload") {
                    StepDetails = {
                        Name: APKUpgradeMetadataForCurrentVersion.Workflow[i]
                    };
                    StepDetails[LoginUserId] = {
                        IsCompleted: false,
                        LastUpdatedDate: CurrenntDateAndTime,
                        LastUpdatedUserId: LoginUserId,
                        LastUpdatedUserName: LoginUserName
                    };
                }
                else {
                    StepDetails = {
                        Name: APKUpgradeMetadataForCurrentVersion.Workflow[i],
                        IsCompleted: false,
                        LastUpdatedDate: CurrenntDateAndTime,
                        LastUpdatedUserId: LoginUserId,
                        LastUpdatedUserName: LoginUserName
                    };
                }

                APKUpgradeProcessStatus.WorkflowStatus[i] = StepDetails;
            }

            OneViewLocalStorage.Save("APKUpgradeProcessStatus", JSON.stringify(APKUpgradeProcessStatus));

            //var APKUpgradeProcessStatus = {

            //    IsAPKUpgradeCompleted: "false",
            //    LatestVersion: "5.1.2.45",
            //    CurrentVersion: "5.1.2.44",
            //    IsAPKUpgradeProcessStarted: "false",

            //    WorkflowStatus: {
            //        1: { 
            //            Name: "Upload",
            //            1: {//userid
            //                IsCompleted: "true",
            //                LastUpdatedDate: "",
            //                LastUpdatedUserId: 1,
            //                LastUpdatedUserName: "",
            //            },
            //            2: {//userid
            //                IsCompleted: "false",
            //                LastUpdatedDate: "",
            //                LastUpdatedUserId: 2,
            //                LastUpdatedUserName: "",
            //            },

            //        },
            //        2: {
            //            Name: "Upgrade",
            //            IsCompleted: "true",
            //            LastUpdatedDate: "",
            //            LastUpdatedUserId: 3,
            //            LastUpdatedUserName: "",
            //        }
            //    }
            //};

            OneViewConsole.Debug("CreateAPKUpgradeProcessStatus end", "APKUpgradeProcessBO.CreateAPKUpgradeProcessStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.CreateAPKUpgradeProcessStatus", Excep);
        }
        finally {

        }
    }

    this.UpdateAPKUpgradeProcessStatus = function (IsAPKUpgradeProcessStarted, IsAPKUpgradeCompleted, StepNo, IsCompleted) {
        try {
            OneViewConsole.Debug("UpdateAPKUpgradeProcessStatus start", "APKUpgradeProcessBO.UpdateAPKUpgradeProcessStatus");

            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);

            if (APKUpgradeProcessStatus.WorkflowStatus[StepNo] != undefined) {

                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();
                var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
                var LoginUserName = OneViewSessionStorage.Get("LoginUserName");

                if (APKUpgradeProcessStatus.WorkflowStatus[StepNo].Name == "Upload") {
                    if (APKUpgradeProcessStatus.WorkflowStatus[StepNo][LoginUserId] == undefined) {
                        var LoginUserUploadStatusDetails = {
                            IsCompleted: IsCompleted,
                            LastUpdatedDate: CurrenntDateAndTime,
                            LastUpdatedUserId: LoginUserId,
                            LastUpdatedUserName: LoginUserName
                        };
                        //Create properties userwise for upload
                        APKUpgradeProcessStatus.WorkflowStatus[StepNo][LoginUserId] = LoginUserUploadStatusDetails;
                    }
                    else {
                        //Update properties userwise for upload
                        APKUpgradeProcessStatus.WorkflowStatus[StepNo][LoginUserId].IsCompleted = IsCompleted;
                        APKUpgradeProcessStatus.WorkflowStatus[StepNo][LoginUserId].LastUpdatedDate = CurrenntDateAndTime;
                        APKUpgradeProcessStatus.WorkflowStatus[StepNo][LoginUserId].LastUpdatedUserName = LoginUserName;
                    }
                }
                else {
                    APKUpgradeProcessStatus.WorkflowStatus[StepNo].IsCompleted = IsCompleted;
                    APKUpgradeProcessStatus.WorkflowStatus[StepNo].LastUpdatedDate = CurrenntDateAndTime;
                    APKUpgradeProcessStatus.WorkflowStatus[StepNo].LastUpdatedUserId = LoginUserId;
                    APKUpgradeProcessStatus.WorkflowStatus[StepNo].LastUpdatedUserName = LoginUserName;
                }
                //Update properties
                APKUpgradeProcessStatus.IsAPKUpgradeProcessStarted = IsAPKUpgradeProcessStarted;
                APKUpgradeProcessStatus.IsAPKUpgradeCompleted = IsAPKUpgradeCompleted;

                OneViewLocalStorage.Save("APKUpgradeProcessStatus", JSON.stringify(APKUpgradeProcessStatus));

            }
            OneViewConsole.Debug("UpdateAPKUpgradeProcessStatus end", "APKUpgradeProcessBO.UpdateAPKUpgradeProcessStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.UpdateAPKUpgradeProcessStatus", Excep);
        }
        finally {

        }
    }

    this.CreateUploadProcessStatusIfNotExists = function () {
        try {
            OneViewConsole.Debug("CreateUploadProcessStatusIfNotExists start", "APKUpgradeProcessBO.CreateUploadProcessStatusIfNotExists");

            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            for (var i = 1; i < Object.keys(APKUpgradeProcessStatus).length ; i++) {
                if (APKUpgradeProcessStatus.WorkflowStatus[i] != undefined && APKUpgradeProcessStatus.WorkflowStatus[i].Name == "Upload") {
                    if (APKUpgradeProcessStatus.WorkflowStatus[i][LoginUserId] == undefined) {
                        var CurrenntDateAndTime = new DateTime().GetDateAndTime();
                        var LoginUserName = OneViewSessionStorage.Get("LoginUserName");

                        APKUpgradeProcessStatus.WorkflowStatus[i][LoginUserId] = {
                            IsCompleted: false,
                            LastUpdatedDate: CurrenntDateAndTime,
                            LastUpdatedUserId: LoginUserId,
                            LastUpdatedUserName: LoginUserName
                        };
                        OneViewLocalStorage.Save("APKUpgradeProcessStatus", JSON.stringify(APKUpgradeProcessStatus));
                        break;
                    }
                }
            }



            OneViewConsole.Debug("CreateUploadProcessStatusIfNotExists end", "APKUpgradeProcessBO.CreateUploadProcessStatusIfNotExists");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.CreateUploadProcessStatusIfNotExists", Excep);
        }
        finally {

        }
    }
    ////////////////////************************************Create and Update APKUpgradeProcess Status END************************************////////////////////






    ///////////UI

    ////////////////////************************************Create and Update APKUpgradeWorkflowUIStatus Status START************************************////////////////////


    this.SetAPKUpgradeWorkflowUIStatus = function (APKUpgradeMetadataForCurrentVersion) {
        try {
            OneViewConsole.Debug("SetAPKUpgradeWorkflowUIStatus start", "APKUpgradeProcessBO.SetAPKUpgradeWorkflowUIStatus");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
            //var APKUpgradeWorkflowUIStatus = {
            //    1: {
            //        IsEnabled: true , IsShowNextIcon : true
            //    },
            //    2: {
            //        IsEnabled: false, IsShowNextIcon : true
            //    },
            //    3: {
            //        IsEnabled: false, IsShowNextIcon : false
            //    }
            //};

            if (APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired != true) {
                var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
                if (APKUpgradeProcessStatus != null) {
                    var IsShowNextIcon = true;
                  
                    APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
                    var WorkflowStatus = APKUpgradeProcessStatus.WorkflowStatus;
                    var IsEnabled = true;
                    var IsUploadStepCompleted = MyInstance.GetUploadStepCompletedStatus(APKUpgradeProcessStatus);
                    
                    for (var i = 1; i <= Object.keys(WorkflowStatus).length ; i++) {

                        if (i == Object.keys(WorkflowStatus).length) {
                            IsShowNextIcon = false;
                        }

                        var Status;
                       
                        //if (WorkflowStatus[i].IsCompleted == true ||
                        //    (WorkflowStatus[i].Name == "Upload" && WorkflowStatus[i][LoginUserId] != undefined &&
                        //    (WorkflowStatus[i][LoginUserId].IsCompleted == true || (WorkflowStatus[i][LoginUserId].IsCompleted == false && WorkflowStatus[i + 1] != undefined && WorkflowStatus[i + 1].IsCompleted == true)))) {
                        //    Status = { IsEnabled: false, IsShowNextIcon: IsShowNextIcon };
                        //}
                        if (WorkflowStatus[i].IsCompleted == true ||
                            (WorkflowStatus[i].Name == "Upload" && 
                            (IsUploadStepCompleted == true || (IsUploadStepCompleted == false && WorkflowStatus[i + 1] != undefined && WorkflowStatus[i + 1].IsCompleted == true)))) {
                            Status = { IsEnabled: false, IsShowNextIcon: IsShowNextIcon };
                        }
                        else {
                            Status = { IsEnabled: IsEnabled, IsShowNextIcon: IsShowNextIcon };
                            IsEnabled = false;
                        }

                        APKUpgradeWorkflowUIStatus[i] = Status;
                    }

                }
            }
            else {
                alert('APKUpgradeProcessBO.SetAPKUpgradeWorkflowUIStatus : APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired = ' + APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired + " , Not implemented exception ");
            }

            OneViewConsole.Debug("SetAPKUpgradeWorkflowUIStatus end", "APKUpgradeProcessBO.SetAPKUpgradeWorkflowUIStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.SetAPKUpgradeWorkflowUIStatus", Excep);
        }
        finally {

        }
    }

    this.GetUploadStepCompletedStatus = function (APKUpgradeProcessStatus) {
        try {
            OneViewConsole.Debug("GetUploadStepCompletedStatus start", "APKUpgradeProcessBO.GetUploadStepCompletedStatus");

            var IsCompleted = true;
            if (APKUpgradeProcessStatus.ServiceUploadStatus != undefined && Object.keys(APKUpgradeProcessStatus.ServiceUploadStatus).length > 0) {
                for (var ServiceId in APKUpgradeProcessStatus.ServiceUploadStatus) {
                    var IsServiceUploadCompleted = APKUpgradeProcessStatus.ServiceUploadStatus[ServiceId].IsCompleted;
                    if (IsServiceUploadCompleted == false) {
                        IsCompleted = false;
                        break;
                    }
                }
            }
            //else {
            //    IsCompleted = false;
            //}          
            OneViewConsole.Debug("GetUploadStepCompletedStatus end", "APKUpgradeProcessBO.GetUploadStepCompletedStatus");

            return IsCompleted;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.GetUploadStepCompletedStatus", Excep);
        }
        finally {

        }
    }


    ////////////////////************************************Create and Update APKUpgradeWorkflowUIStatus Status END************************************////////////////////




    this.CheckForUpgradeMismatch = function (APKUpgradeMetadata) {
        try {
            OneViewConsole.Debug("CheckForUpgradeMismatch start", "APKUpgradeProcessBO.CheckForUpgradeMismatch");

            var response = { IsUpgradeMismatch: false, Message: '' };
            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            if (APKUpgradeProcessStatus != null) {
                APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {
                    
                    var AppInfoResponse = oOneViewAppInfoPlugin.GetRemoteAppInfo(OneViewSessionStorage.Get("ServiceId"), oneViewGlobalVariables.FoodSafetyServiceURL);

                    var RemoteAppInfo = AppInfoResponse.AppInfo;

                   
                    if (AppInfoResponse.IsAnyException != true) {
                        if ((RemoteAppInfo != "" && RemoteAppInfo != null && RemoteAppInfo != undefined)) {
                            if (APKUpgradeProcessStatus.LatestVersion != RemoteAppInfo.VersionName) {
                                response.IsUpgradeMismatch = true;
                                response.Message = 'While APK Upgrade, there is mismatch please re-install for avoiding APK corruption. Do you want to continue apk upgrade process.';
                            }
                        }
                        else {
                            response.IsUpgradeMismatch = true;
                            response.Message = "IN-ER-AUP-003 :: Something went wrong. Do you want to continue apk upgrade process.";
                        }
                    }
                    else {
                        alert(GlobalxlatService.xlat(AppInfoResponse.Message));
                    }
                }
                else {
                    if (APKUpgradeProcessStatus.LatestVersion != APKUpgradeMetadata.LatestVersion) {
                        response.IsUpgradeMismatch = true;
                        response.Message = 'While APK Upgrade, there is mismatch please re-install for avoiding APK corruption.';
                    }
                }
            }

            OneViewConsole.Debug("CheckForUpgradeMismatch end", "APKUpgradeProcessBO.CheckForUpgradeMismatch");

            return response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.CheckForUpgradeMismatch", Excep);
        }
        finally {

        }
    }



    this.CheckForAPKUpdateValidationAndRedirect = function ($location, OperationAccessPermissionKey) {
        try {
            OneViewConsole.Debug("CheckForAPKUpdateValidationAndRedirect start", "APKUpgradeProcessBO.CheckForAPKUpdateValidationAndRedirect");

            var IsNavigate = true;
            var response = MyInstance.CheckIsUpgradeAvailable();
            
            if (response.IsUpgradeAvailable == true) {
                //take metadata for current version 
                //check  this page allowed or not
                var IsOperationAccessAllowed = MyInstance.ValidationForAPKUpgradeProcess(OperationAccessPermissionKey);
                
                if (IsOperationAccessAllowed == true) {
                  
                    //alert('OperationAccessPermissionKey = ' + OperationAccessPermissionKey + ' , Not implemented exception.');

                    //show upadate message
                    //var Title = xlatService.xlat('Confirm');
                    //var Message = "New updates are available, press ok to update the apk ?";

                    //var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    //oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                    //    if (ConfirmationId == '2') {
                    //        //navigate to upgrade
                    //        IsNavigate = false;
                    //        $location.url('/APKUpgrade');
                    //    }                        
                    //});

                }
                else {
                    //navigate to upgrade
                    IsNavigate = false;
                    $location.url('/APKUpgrade');
                    
                }

            }

            OneViewConsole.Debug("CheckForAPKUpdateValidationAndRedirect end", "APKUpgradeProcessBO.CheckForAPKUpdateValidationAndRedirect");

            return IsNavigate;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.CheckForAPKUpdateValidationAndRedirect", Excep);
        }
    }


    this.ValidationForAPKUpgradeProcess = function (OperationAccessPermissionKey) {
        try {
            OneViewConsole.Debug("ValidationForAPKUpgradeProcess start", "APKUpgradeProcessBO.ValidationForAPKUpgradeProcess");

            var APKUpgradeMetadata = MyInstance.GetAPKUpgradeProcessMetadata();
            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            var UpgradedFromVersion;
            if (APKUpgradeProcessStatus != null) {
                APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
                UpgradedFromVersion = APKUpgradeProcessStatus.CurrentVersion;
            }
            else {
                UpgradedFromVersion = oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName;
            }

            var APKUpgradeMetadataForCurrentVersion = MyInstance.GetAPKUpgradeProcessMetadataForCurrentVersion(UpgradedFromVersion, APKUpgradeMetadata);

            OneViewConsole.Debug("ValidationForAPKUpgradeProcess end", "APKUpgradeProcessBO.ValidationForAPKUpgradeProcess");

            return APKUpgradeMetadataForCurrentVersion[OperationAccessPermissionKey];
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.CheckForAPKUpdateAndRedirect", Excep);
        }
    }





    ////////////////////////************* Downlaod Metadata From ServerFile and Store in Local Storage START************* ////////////////////////


    this.DownloadAPKUpgradeProcessMetadata = function () {
        try {
            OneViewConsole.Debug("DownloadAPKUpgradeProcessMetadata start", "APKUpgradeProcessBO.DownloadAPKUpgradeProcessMetadata");



            OneViewConsole.Debug("DownloadAPKUpgradeProcessMetadata end", "APKUpgradeProcessBO.DownloadAPKUpgradeProcessMetadata");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.DownloadAPKUpgradeProcessMetadata", Excep);
        }
        finally {

        }
    }


    ////////////////////////************* Downlaod Metadata From ServerFile and Store in Local Storage END************* ////////////////////////





    ////////////////////////************* Save User Credentials  in Local Storage START************* ////////////////////////


    this.SaveUserCredentialsInLocalStorage = function () {
        try {
            OneViewConsole.Debug("SaveUserCredentialsInLocalStorage start", "APKUpgradeProcessBO.SaveUserCredentialsInLocalStorage");

            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            if (APKUpgradeProcessStatus != null) {
                APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
                if (APKUpgradeProcessStatus.IsAPKUpgradeCompleted != true && APKUpgradeProcessStatus.IsAPKUpgradeProcessStarted == true) {
                    if (LoginUserCredentialsForAPKUpgradeProcess != null) {
                        OneViewLocalStorage.Save("LoginUserCredentialsForAPKUpgradeProcess", JSON.stringify(LoginUserCredentialsForAPKUpgradeProcess));
                    }
                    else {
                        alert('APKUpgradeProcessBO.SaveUserCredentialsInLocalStorage , LoginUserCredentialsForAPKUpgradeProcess is null')
                    }
                }
            }
            OneViewConsole.Debug("SaveUserCredentialsInLocalStorage end", "APKUpgradeProcessBO.SaveUserCredentialsInLocalStorage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.SaveUserCredentialsInLocalStorage", Excep);
        }
        finally {

        }
    }


    ////////////////////////************* Downlaod Metadata From ServerFile and Store in Local Storage END************* ////////////////////////


    this.FormUpgradeStartMessage = function (xlatService) {
        try {
            OneViewConsole.Debug("FormUpgradeStartMessage start", "APKUpgradeProcessBO.FormUpgradeStartMessage");

            var _oAPKUpgradeProcessMetadata = MyInstance.GetAPKUpgradeProcessMetadata();

            var _oMetadataForCurrentVersion = MyInstance.GetAPKUpgradeProcessMetadataForCurrentVersion(oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName, _oAPKUpgradeProcessMetadata);
            var FinalMsg = xlatService.xlat(_oMetadataForCurrentVersion.ProcessStartPart1Message) + _oAPKUpgradeProcessMetadata.LatestVersion + xlatService.xlat(_oMetadataForCurrentVersion.ProcessStartPart2Message) + "\n";
            var WorkflowConfig = _oMetadataForCurrentVersion.WorkflowConfig;
            var WFLength = Object.keys(WorkflowConfig).length;
            var i = 1;
            for (var WorkflowName in WorkflowConfig) {
                var CurrentStepWorkflowConfig = WorkflowConfig[WorkflowName];
                //FinalMsg += "\n" + xlatService.xlat('Step') + i + xlatService.xlat('of') + WFLength + " : " + xlatService.xlat(CurrentStepWorkflowConfig.PreMessage);
                FinalMsg += "\n" + xlatService.xlat('Step') + i + " : " + xlatService.xlat(CurrentStepWorkflowConfig.PreMessage);
                i++;
                if (i > WFLength) {
                    break;
                }
            }

            //alert('FinalMsg : ' + FinalMsg);
            OneViewConsole.Debug("FormUpgradeStartMessage end", "APKUpgradeProcessBO.FormUpgradeStartMessage");

            return FinalMsg;
        }
        catch (Excep) {
            //alert("APKUpgradeProcessBO.FormUpgradeStartMessage" + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.FormUpgradeStartMessage", Excep);
        }
        finally {

        }
    }

    this.ShowAPKUpgradeProcessCompleted = function (APKUpgradeMetadataForCurrentVersion, xlatService) {
        try {
            OneViewConsole.Debug("ShowAPKUpgradeProcessCompleted start", "APKUpgradeProcessBO.ShowAPKUpgradeProcessCompleted");
            
            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            if (APKUpgradeProcessStatus != null) {
                APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
                if (APKUpgradeProcessStatus.IsAPKUpgradeCompleted == true) {
                    alert(xlatService.xlat(APKUpgradeMetadataForCurrentVersion.ProcessCompletionMessage) + APKUpgradeProcessStatus.LatestVersion);
                }
            }

            OneViewConsole.Debug("ShowAPKUpgradeProcessCompleted end", "APKUpgradeProcessBO.ShowAPKUpgradeProcessCompleted");
        }
        catch (Excep) {
          //  alert("APKUpgradeProcessBO.ShowAPKUpgradeProcessCompleted" + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.ShowAPKUpgradeProcessCompleted", Excep);
        }
        finally {

        }
    }

    this.RedirectToLoginPageIfUpgradeProcessCompleted = function (location) {
        try {
            OneViewConsole.Debug("RedirectToLoginPageIfUpgradeProcessCompleted start", "APKUpgradeProcessBO.RedirectToLoginPageIfUpgradeProcessCompleted");
          
            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            if (APKUpgradeProcessStatus != null) {              
                APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
                if (APKUpgradeProcessStatus.IsAPKUpgradeCompleted == true) {
                    location.url('/login');
                }
            }

            OneViewConsole.Debug("RedirectToLoginPageIfUpgradeProcessCompleted end", "APKUpgradeProcessBO.RedirectToLoginPageIfUpgradeProcessCompleted");
        }
        catch (Excep) {
            // alert("APKUpgradeProcessBO.RedirectToLoginPageIfUpgradeProcessCompleted" + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.RedirectToLoginPageIfUpgradeProcessCompleted", Excep);
        }
        finally {

        }
    }


    ////////////*****************************Upload Multiple Services START*************************///////////////////////////////

    this.CreateUploadMultipleServicesStatusIfNotExists = function (xlatService) {
        try {
            OneViewConsole.Debug("CreateUploadMultipleServicesStatusIfNotExists Start", "APKUpgradeProcessFacade.CreateUploadMultipleServicesStatusIfNotExists");

            var _oCloudManagerBO = new CloudManagerBO(xlatService);
           // var CloudManagerResponse = _oCloudManagerBO.GetAllServicesByUserIdFromLocal();
            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);

            if (APKUpgradeProcessStatus.ServiceUploadStatus == undefined) {
                APKUpgradeProcessStatus.ServiceUploadStatus = {};
            }

            var _oDcDAO = new DcDAO();
            //Get all services in the device
            var CloudManagerServiceInfo = "";
            if (OneViewLocalStorage.Get("CloudManagerServiceInfo") != null) {
                CloudManagerServiceInfo = JSON.parse(OneViewLocalStorage.Get("CloudManagerServiceInfo"));
              

                var LoginServiceId = OneViewSessionStorage.Get("ServiceId");
                var LoginServiceName = OneViewSessionStorage.Get("ServiceName");

                for (var ServiceId in CloudManagerServiceInfo) {
                    var ServicesDetails = CloudManagerServiceInfo[ServiceId];
                    //Service setting in session
                    OneViewSessionStorage.Save("ServiceId", ServicesDetails.Id);
                    OneViewSessionStorage.Save("ServiceName", ServicesDetails.Name);
                    _oCloudManagerBO.InitializeDBContext(ServicesDetails.Id);
                    var DcCount = _oDcDAO.GetAllUnSyncDcCount();
                    //alert('DcCount:' + DcCount);

                    if (DcCount > 0) {
                        if (APKUpgradeProcessStatus.ServiceUploadStatus[ServicesDetails.Id] == undefined) {
                            APKUpgradeProcessStatus.ServiceUploadStatus[ServicesDetails.Id] = {
                                'Id': ServicesDetails.Id,
                                'Name': ServicesDetails.Name,
                                'IsCompleted': false
                            }
                        }
                    }

                   
                    //if (DcCount > 0) {
                    //    if (APKUpgradeProcessStatus.ServiceUploadStatus[ServicesDetails.Id] == undefined) {
                    //        APKUpgradeProcessStatus.ServiceUploadStatus[ServicesDetails.Id] = {
                    //            'Id': ServicesDetails.Id,
                    //            'Name': ServicesDetails.Name,
                    //            'IsCompleted': false
                    //        }
                    //    }
                    //}
                    //else {
                    //    if (APKUpgradeProcessStatus.ServiceUploadStatus[ServicesDetails.Id] == undefined) {
                    //        APKUpgradeProcessStatus.ServiceUploadStatus[ServicesDetails.Id] = {
                    //            'Id': ServicesDetails.Id,
                    //            'Name': ServicesDetails.Name,
                    //            'IsCompleted': false
                    //        }
                    //    }
                    //}
                }

                OneViewSessionStorage.Save("ServiceId", LoginServiceId);
                OneViewSessionStorage.Save("ServiceName", LoginServiceName);
                _oCloudManagerBO.InitializeDBContext(LoginServiceId);
            }
                       
          
            OneViewLocalStorage.Save("APKUpgradeProcessStatus", JSON.stringify(APKUpgradeProcessStatus));
            //alert(' OneViewLocalStorage.Get("APKUpgradeProcessStatus"); : ' + OneViewLocalStorage.Get("APKUpgradeProcessStatus"));
            
            OneViewConsole.Debug("CreateUploadMultipleServicesStatusIfNotExists End", "APKUpgradeProcessFacade.CreateUploadMultipleServicesStatusIfNotExists");

        }
        catch (Excep) {
            // alert('CreateUploadMultipleServicesStatusIfNotExists Excep : ' + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.CreateUploadMultipleServicesStatusIfNotExists", Excep);
        }
    }


    this.UpdateUploadMultipleServicesStatus = function (xlatService, StepNo, APKUpgradeMetadataForCurrentVersion, location, scope, IsHideSuccessMsg, IsSkipAllowed) {
        try {
            OneViewConsole.Debug("UpdateUploadMultipleServicesStatus Start", "APKUpgradeProcessFacade.UpdateUploadMultipleServicesStatus");

            oSetDefaultSpinner.Start();

            var IsSuccess = false;

            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");            
            APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
           

            var _oCloudManagerBO = new CloudManagerBO(xlatService);
            var CloudManagerResponse = _oCloudManagerBO.GetAllServicesByUserIdFromLocal();

            var LoginServiceId=  OneViewSessionStorage.Get("ServiceId");
            var LoginServiceName = OneViewSessionStorage.Get("ServiceName");

            var _oDcDAO = new DcDAO();
            var IsUserSpecificUploadCompleted = true;
            for (var i = 0; i < CloudManagerResponse.ServicesLst.length; i++) {
                var ServiceDataFromCloudManager = CloudManagerResponse.ServicesLst[i];
               
                var UploadDetails = APKUpgradeProcessStatus.ServiceUploadStatus[ServiceDataFromCloudManager.Id];
                
                if (UploadDetails != undefined && UploadDetails.IsCompleted != true && UploadDetails.IsCompleted != 'true') {

                   // _oCloudManagerBO.UpdateCloudManagerUserServiceMapping(ServiceDataFromCloudManager);

                    //Service setting in session
                    OneViewSessionStorage.Save("ServiceId", ServiceDataFromCloudManager.Id);
                    OneViewSessionStorage.Save("ServiceName", ServiceDataFromCloudManager.Name);

                    _oCloudManagerBO.InitializeDBContext(ServiceDataFromCloudManager.Id);
                   
                    if (IsSkipAllowed == true) {
                        IsSuccess = true;
                    }
                    else {
                        var DcCount = _oDcDAO.GetAllUnSyncDcCount();
                        //alert('DcCount:' + DcCount);
                        if (DcCount > 0) {
                            //Upload
                            // IsSuccess = BulkUpload(true, xlatService);
                            IsSuccess = BatchUpload(true, xlatService);

                            if (IsSuccess != true) {
                                IsUserSpecificUploadCompleted = false;
                            }
                        }
                        else {
                            IsSuccess = true;
                        }
                    }
                    //Set the status of Upload step
                    // UpdateAPKUpgradeProcessStatusOnUpload(StepNo, IsSuccess, APKUpgradeMetadataForCurrentVersion, ServiceDataFromCloudManager);                  
                   
                }
                else {                 
                    IsSuccess = true;
                }
                //else {
                //    APKUpgradeProcessStatus.ServiceUploadStatus[ServiceDataFromCloudManager.Id] = {
                //        'Id': ServiceDataFromCloudManager.Id,
                //        'Name': ServiceDataFromCloudManager.Name,
                //        'IsCompleted': false
                //    };

                //    OneViewLocalStorage.Save("APKUpgradeProcessStatus", JSON.stringify(APKUpgradeProcessStatus));
                //}

              
                //Service-Wise Upload Status
                UpdateServiceUploadStatusOnUpload(ServiceDataFromCloudManager, IsSuccess);

            }
            
            //User-Specific Upload Status
            MyInstance.UpdateAPKUpgradeProcessStatus(true, false, StepNo, IsUserSpecificUploadCompleted);
            
            //UpdateAPKUpgradeProcessStatusOnUpload(StepNo, IsSuccess, APKUpgradeMetadataForCurrentVersion, ServiceDataFromCloudManager);
            UpdateAPKUpgradeProcessCompletedStatusOnUpload(StepNo, APKUpgradeMetadataForCurrentVersion);
            
            MyInstance.SetAPKUpgradeWorkflowUIStatus(APKUpgradeMetadataForCurrentVersion);
            oAPKUpgradeProcessUIComponent.RefreshPageHtml(scope);
                  

            if (IsHideSuccessMsg != true && IsSkipAllowed != true) {
                if (IsUserSpecificUploadCompleted == true) {
                    alert(GlobalxlatService.xlat('IN-SU-AUP-023 :: Upload Process Completed Successfully.'));
                }
                else {
                    alert(GlobalxlatService.xlat('IN-ER-AUP-024 :: Upload Process Failed.'));
                }
            }
            //Service setting in session
            OneViewSessionStorage.Save("ServiceId", LoginServiceId);
            OneViewSessionStorage.Save("ServiceName", LoginServiceName);
            _oCloudManagerBO.InitializeDBContext(LoginServiceId);

          
            MyInstance.RedirectToLoginPageIfUpgradeProcessCompleted(location);
          
            APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");           
            APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
            var Msg = "There are some records pending for upload in the following services :";
            var Count = 0;
            for (var ServiceId in APKUpgradeProcessStatus.ServiceUploadStatus) {
                var ServiceUploadStatus = APKUpgradeProcessStatus.ServiceUploadStatus[ServiceId];
                if (ServiceUploadStatus.IsCompleted != true) {
                    Count++;
                    Msg += " ";
                    if (Count > 1) {
                        Msg += ","
                    }
                    Msg += ServiceUploadStatus.Name;
                }
            }

            if (Msg != "There are some records pending for upload in the following services :") {
                Msg += ". Please contact administrator for upload."
                if (IsUserSpecificUploadCompleted == true) {
                    alert(GlobalxlatService.xlat(Msg));
                }
            }
                       

            OneViewConsole.Debug("UpdateUploadMultipleServicesStatus End", "APKUpgradeProcessFacade.UpdateUploadMultipleServicesStatus");
           
            oSetDefaultSpinner.Stop();

            return IsUserSpecificUploadCompleted;

        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            // alert('UpdateUploadMultipleServicesStatus Excep : ' + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.UpdateUploadMultipleServicesStatus", Excep);
        }
    }


    var BulkUpload = function (IsHideSuccessMsg, xlatService) {
        try {
            var IsSuccess = false;
            var _oUploadBO = new UploadBO(xlatService, '');
            IsSuccess = _oUploadBO.BulkUpload(IsHideSuccessMsg);
            return IsSuccess;
        }
        catch (Excep) {
            // alert('BulkUpload Excep : ' + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.BulkUpload", Excep);
        }
    }

    var BatchUpload = function (IsHideSuccessMsg, xlatService) {
        try {
            var IsSuccess = false;
            var _oUploadBO = new UploadBO(xlatService, '');
            IsSuccess = _oUploadBO.APKUpgradeUpload(IsHideSuccessMsg);
            //alert('IsSuccess : ' + IsSuccess);
            return IsSuccess;
        }
        catch (Excep) {
            // alert('BulkUpload Excep : ' + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.BatchUpload", Excep);
        }
    }

    var UpdateAPKUpgradeProcessStatusOnUpload = function (StepNo, IsSuccess, APKUpgradeMetadataForCurrentVersion, ServiceDataFromCloudManager) {
        try {
            if (APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired == true) {
                alert('APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired = ' + APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired + ' : Not implemented exception');
            }

            else {
                var IsAPKUpgradeCompleted = false;               
                if (IsSuccess == true) {
                    //if (StepNo == Object.keys(APKUpgradeMetadataForCurrentVersion.Workflow).length) {
                    //    IsAPKUpgradeCompleted = true;
                    //}
                

                    var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
                    APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);

                    var IsUploadStepCompleted = MyInstance.GetUploadStepCompletedStatus(APKUpgradeProcessStatus);
                    MyInstance.UpdateAPKUpgradeProcessStatus(true, IsAPKUpgradeCompleted, StepNo, IsUploadStepCompleted);

                    ////Service Status update
                    //APKUpgradeProcessStatus.ServiceUploadStatus[ServiceDataFromCloudManager.Id] = {
                    //    'Id': ServiceDataFromCloudManager.Id,
                    //    'Name': ServiceDataFromCloudManager.Name,
                    //    'IsCompleted': true
                    //};
               
                    OneViewLocalStorage.Save("APKUpgradeProcessStatus", JSON.stringify(APKUpgradeProcessStatus));
                    MyInstance.SetAPKUpgradeWorkflowUIStatus(APKUpgradeMetadataForCurrentVersion);

                    oAPKUpgradeProcessUIComponent.RefreshPageHtml(scope);
                }
            }
        }
        catch (Excep) {
          //  alert('UpdateAPKUpgradeProcessStatusOnUpload Excep : ' + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.UpdateAPKUpgradeProcessStatusOnUpload", Excep);
        }
    }

    var UpdateServiceUploadStatusOnUpload = function (ServiceDataFromCloudManager, IsSuccess) {
        try {
           
            var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
            APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);

            if (APKUpgradeProcessStatus.ServiceUploadStatus[ServiceDataFromCloudManager.Id] != undefined) {
                //Service Status update
                APKUpgradeProcessStatus.ServiceUploadStatus[ServiceDataFromCloudManager.Id] = {
                    'Id': ServiceDataFromCloudManager.Id,
                    'Name': ServiceDataFromCloudManager.Name,
                    'IsCompleted': IsSuccess
                };
            }

            OneViewLocalStorage.Save("APKUpgradeProcessStatus", JSON.stringify(APKUpgradeProcessStatus));

        }
        catch (Excep) {
            //  alert('UpdateServiceUploadStatusOnUpload Excep : ' + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.UpdateServiceUploadStatusOnUpload", Excep);
        }
    }


    var UpdateAPKUpgradeProcessCompletedStatusOnUpload = function (StepNo, APKUpgradeMetadataForCurrentVersion) {
        try {
            if (APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired == true) {
                alert('APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired = ' + APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired + ' : Not implemented exception');
            }

            else {
                var IsAPKUpgradeCompleted = false;
                var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
                APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);

                if (StepNo == Object.keys(APKUpgradeMetadataForCurrentVersion.Workflow).length) {
                    for (var ServiceId in APKUpgradeProcessStatus.ServiceUploadStatus) {
                        if (APKUpgradeProcessStatus.ServiceUploadStatus[ServiceId].IsCompleted == true || APKUpgradeProcessStatus.ServiceUploadStatus[ServiceId].IsCompleted == 'true') {
                            IsAPKUpgradeCompleted = true;
                        }
                        else {
                            IsAPKUpgradeCompleted = false;
                            break;
                        }
                    }
                }

             
                //Update properties
                APKUpgradeProcessStatus.IsAPKUpgradeProcessStarted = true;
                APKUpgradeProcessStatus.IsAPKUpgradeCompleted = IsAPKUpgradeCompleted;
                
                OneViewLocalStorage.Save("APKUpgradeProcessStatus", JSON.stringify(APKUpgradeProcessStatus));

            }
        }
        catch (Excep) {
            //  alert('UpdateAPKUpgradeProcessCompletedStatusOnUpload Excep : ' + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.UpdateAPKUpgradeProcessCompletedStatusOnUpload", Excep);
        }
    }


    ////////////*****************************Upload Multiple Services END*************************///////////////////////////////





    ////////////***************************** DAO START*************************///////////////////////////////

    this.GetAllServicesDAO = function (ServiceIds) {
        try {
            OneViewConsole.Debug("GetAllServicesDAO start", "APKUpgradeProcessBO.GetAllServicesDAO");

            var Incondition = "(";
            for (var i = 0; i < ServiceIds.length; i++) {
                Incondition += "" + ServiceIds[i] + "";
                Incondition += (i <= ServiceIds.length - 2) ? "," : ")";
            }

            var Query = "Select * from ServiceMasterEntity Where ServerId IN " + Incondition;
            
            OneViewConsole.DataLog("Requested Query : " + Query, "APKUpgradeProcessBO.GetAllServicesDAO");

            var response = ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(response), "APKUpgradeProcessBO.GetAllServicesDAO");

            OneViewConsole.Debug("GetAllServicesDAO end", "APKUpgradeProcessBO.GetAllServicesDAO");

            OneViewConsole.Debug("GetAllServicesDAO end", "APKUpgradeProcessBO.GetAllServicesDAO");

            return response;

        }
        catch (Excep) {
            //alert("APKUpgradeProcessBO.GetAllServicesDAO" + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.GetAllServicesDAO", Excep);
        }
        finally {

        }
    }

    var ExcecuteSqlReader = function (Query) {

        try {
            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.ExcecuteSqlReader", Excep);
        }
        finally {
            result = null;
        }
    }


    ////////////*****************************Upload Multiple Services END*************************///////////////////////////////


   this.UpdateAppDetails = function () {

       try {
           OneViewConsole.Debug("UpdateAppDetails start", "APKUpgradeProcessBO.UpdateAppDetails");

           var AppInfoResponse = oOneViewAppInfoPlugin.GetRemoteAppInfo(OneViewSessionStorage.Get("ServiceId"), oneViewGlobalVariables.FoodSafetyServiceURL);           
           var RemoteAppInfo = AppInfoResponse.AppInfo;
          
            var _OneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
            var DeviceInfo = _OneViewDeviceInfoPlugin.GetDeviceInfo();

            DeviceInfo.OneViewVersionCode = RemoteAppInfo.VersionCode;
            DeviceInfo.OneViewVersionName = RemoteAppInfo.VersionName;
           
            var _OneViewAppConfigIL = new OneViewAppConfigIL('');
            var oAppDetailsDTO = _OneViewAppConfigIL.UpdateAppDetails(DeviceInfo);

            OneViewConsole.Debug("UpdateAppDetails start", "APKUpgradeProcessBO.UpdateAppDetails");
            
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.UpdateAppDetails", Excep);
        }
        finally {
            _OneViewDeviceInfoPlugin = null;
            DeviceInfo = null;
            _OneViewAppConfigIL = null;
            oAppDetailsDTO = null;
        }
   }


   this.CheckUpgradeSkipAllowed = function (CurrentVersion, APKUpgradeMetadata) {

       try {
           OneViewConsole.Debug("CheckUpgradeSkipAllowed start", "APKUpgradeProcessBO.CheckUpgradeSkipAllowed");
           var IsUpgradeSkipAllowed = false;

           var APKUpgradeMetadataForCurrentVersion = MyInstance.GetAPKUpgradeProcessMetadataForCurrentVersion(CurrentVersion, APKUpgradeMetadata);
           //alert('APKUpgradeMetadataForCurrentVersion : ' + JSON.stringify(APKUpgradeMetadataForCurrentVersion));
           IsUpgradeSkipAllowed = APKUpgradeMetadataForCurrentVersion.IsUpgradeSkipAllowed;

           OneViewConsole.Debug("CheckUpgradeSkipAllowed start", "APKUpgradeProcessBO.CheckUpgradeSkipAllowed");

           return IsUpgradeSkipAllowed;

       }
       catch (Excep) {
           throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.CheckUpgradeSkipAllowed", Excep);
       }
       finally {
       }
   }


   this.CheckStepSkipAllowed = function (StepNo) {

       try {
           OneViewConsole.Debug("CheckStepSkipAllowed start", "APKUpgradeProcessBO.CheckStepSkipAllowed");
           var IsSkipAllowed = false;

           var APKUpgradeMetadata = OneViewLocalStorage.Get("APKUpgradeProcessMetadata");
           if (APKUpgradeMetadata != null) {
               APKUpgradeMetadata = JSON.parse(APKUpgradeMetadata);
               var APKUpgradeMetadataForCurrentVersion = MyInstance.GetAPKUpgradeProcessMetadataForCurrentVersion(UpgradedFromVersion, APKUpgradeMetadata);
               
               alert('APKUpgradeMetadataForCurrentVersion : ' + JSON.stringify(APKUpgradeMetadataForCurrentVersion));
               var StepKey = APKUpgradeMetadataForCurrentVersion.Workflow[StepNo];

               var StepConfig = APKUpgradeMetadataForCurrentVersion.WorkflowConfig[StepKey];
               navigator.notification.alert(('StepConfig : ' + JSON.stringify(StepConfig)), ['OK'], "")
               IsSkipAllowed = StepConfig.IsSkipAllowed;
           }


           OneViewConsole.Debug("CheckStepSkipAllowed start", "APKUpgradeProcessBO.CheckStepSkipAllowed");

           return IsSkipAllowed;

       }
       catch (Excep) {
           throw oOneViewExceptionHandler.Create("BO", "APKUpgradeProcessBO.CheckStepSkipAllowed", Excep);
       }
       finally {
       }
   }


}






function APKUpgradeUploadStep() {

    var MyInstance = this;
    var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
  
    this.Execute = function (StepNo, IsSkipAllowed) {
        try {
            OneViewConsole.Debug("Execute Start", "APKUpgradeUploadStep.Execute");

            MyInstance.Upload(StepNo, false, IsSkipAllowed);

            OneViewConsole.Debug("Execute End", "APKUpgradeUploadStep.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUploadStep.Execute", Excep);
        }
    }


    ////////////*****************************Upload Process START*************************///////////////////////////////

    this.Upload = function (StepNo, IsHideSuccessMsg, IsSkipAllowed) {
        try {
            OneViewConsole.Debug("Upload Start", "APKUpgradeUploadStep.Upload");

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {
                var UpgradeMismatchResponse = oAPKUpgradeProcessBO.CheckForUpgradeMismatch(GlobalAPKUpgradeMetadata);

                if (UpgradeMismatchResponse.IsUpgradeMismatch == true) {

                    var Title = GlobalxlatService.xlat('Warning');
                    var Message = UpgradeMismatchResponse.Message;

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                        if (ConfirmationId == '2') {
                            MyInstance.UploadHandler(StepNo, IsHideSuccessMsg, IsSkipAllowed);
                        }
                    });
                }

                else {
                    MyInstance.UploadHandler(StepNo, IsHideSuccessMsg, IsSkipAllowed);
                }

            }
            else {
                alert(GlobalxlatService.xlat('NoInternetConnection'));
            }

            OneViewConsole.Debug("Upload End", "APKUpgradeUploadStep.Upload");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUploadStep.Upload", Excep);
        }
    }

    this.UploadHandler = function (StepNo, IsHideSuccessMsg, IsSkipAllowed) {
        try {
            
            var IsSuccess = oAPKUpgradeProcessBO.UpdateUploadMultipleServicesStatus(GlobalxlatService, StepNo, GlobalAPKUpgradeMetadataForCurrentVersion, Globallocation, Globalscope, IsHideSuccessMsg, IsSkipAllowed);
            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUploadStep.UploadHandler", Excep);
        }
    }
   
    ////////////*****************************Upload Process END*************************///////////////////////////////
}



function APKUpgradeUpgradeStep() {

    var MyInstance = this;
    var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();

    this.Execute = function (StepNo) {
        try {
            OneViewConsole.Debug("Execute Start", "APKUpgradeUpgradeStep.Execute");

            MyInstance.Upgrade(StepNo);
         
            OneViewConsole.Debug("Execute End", "APKUpgradeUpgradeStep.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUpgradeStep.Execute", Excep);
        }
    }



    ////////////*****************************Upgrade Process START*************************///////////////////////////////

    this.Upgrade = function (StepNo) {
        try {
            OneViewConsole.Debug("Upgrade Start", "APKUpgradeUpgradeStep.Upgrade");


            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                var UpgradeMismatchResponse = oAPKUpgradeProcessBO.CheckForUpgradeMismatch(GlobalAPKUpgradeMetadata);

                if (UpgradeMismatchResponse.IsUpgradeMismatch == true) {

                    var Title = GlobalxlatService.xlat('Warning');
                    var Message = UpgradeMismatchResponse.Message;

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                        if (ConfirmationId == '2') {
                            MyInstance.UpgradeHandler(StepNo);
                        }
                    });
                }

                else {
                    MyInstance.UpgradeHandler(StepNo);
                }

            }
            else {
                alert(GlobalxlatService.xlat('NoInternetConnection'));
            }
            OneViewConsole.Debug("Upgrade End", "APKUpgradeUpgradeStep.Upgrade");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUpgradeStep.Upgrade", Excep);
        }
    }

    this.UpgradeHandler = function (StepNo) {
        try {
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                var LocalAppInfo = oOneViewAppInfoPlugin.GetLocalAppInfo();
                var AppInfoResponse = oOneViewAppInfoPlugin.GetRemoteAppInfo(OneViewSessionStorage.Get("ServiceId"), oneViewGlobalVariables.FoodSafetyServiceURL);
                var RemoteAppInfo = AppInfoResponse.AppInfo;

                if (AppInfoResponse.IsAnyException != true) {
                    if (RemoteAppInfo != "") {
                        var LocalAppInfoVersionName = null;
                        var RemoteAppInfoVersionName = null;

                        if (LocalAppInfo != "" && LocalAppInfo != null && LocalAppInfo != undefined) {
                            //LocalAppInfo.VersionName = parseInt(LocalAppInfo.VersionName.replace(/\./g, ''));
                            LocalAppInfoVersionName = parseInt(LocalAppInfo.VersionName.replace(/\./g, ''));
                        }
                        if (RemoteAppInfo != "" && RemoteAppInfo != null && RemoteAppInfo != undefined) {
                            //RemoteAppInfo.VersionName = parseInt(RemoteAppInfo.VersionName.replace(/\./g, ''));
                            RemoteAppInfoVersionName = parseInt(RemoteAppInfo.VersionName.replace(/\./g, ''));
                        }
                        //if (LocalAppInfo.VersionName < RemoteAppInfo.VersionName) {
                        if (LocalAppInfoVersionName < RemoteAppInfoVersionName) {

                            var WFLength = Object.keys(GlobalAPKUpgradeMetadataForCurrentVersion.Workflow).length;
                            var WorkflowConfig = GlobalAPKUpgradeMetadataForCurrentVersion.WorkflowConfig[GlobalAPKUpgradeMetadataForCurrentVersion.Workflow[StepNo]];
                            var msg = GlobalxlatService.xlat('Step') + StepNo + GlobalxlatService.xlat('of') + WFLength + " : " + GlobalxlatService.xlat(WorkflowConfig.PreMessage);
                            // navigator.notification.alert(msg, ['OK'], "");

                            //  oSetDefaultSpinner.Start("Downloading new updates");
                            oSetDefaultSpinner.Start(GlobalxlatService.xlat(msg));

                            var IsSuccess = oOneViewAppInfoPlugin.DownloadApk(OneViewSessionStorage.Get("ServiceId"), oneViewGlobalVariables.FoodSafetyServiceURL);
                            oSetDefaultSpinner.Stop();

                            if (IsSuccess == true) {

                                //UpdateAppDetails('', RemoteAppInfo);

                                oOneViewAppInfoPlugin.UpdateApk();
                            }
                            else {
                                //   alert("Apk not available, please contact administrator");
                                alert(GlobalxlatService.xlat("IN-ER-AUP-001 :: Something went wrong , Please check your Internet Connectivity or contact administrator"));
                            }
                        }
                        else {
                            alert(GlobalxlatService.xlat("IN-ER-AUP-003 :: Something went wrong while upgrade, Please check your Internet Connectivity or contact administrator"));
                        }
                    }

                    else {
                        // alert("App info not available, please contact administrator");
                        alert(GlobalxlatService.xlat("IN-ER-AUP-002 :: Something went wrong , Please check your Internet Connectivity or contact administrator"));
                    }
                }

                else {
                    alert(GlobalxlatService.xlat(AppInfoResponse.Message));
                }
            }

            else {
                alert(GlobalxlatService.xlat('NoInternetConnection'));
            }

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUpgradeStep.UpgradeHandler", Excep);
        }
    }

    var UpdateAppDetails = function (toaster, RemoteAppInfo) {

        try {
            var _OneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
            var DeviceInfo = _OneViewDeviceInfoPlugin.GetDeviceInfo();

            DeviceInfo.OneViewVersionCode = RemoteAppInfo.VersionCode;
            DeviceInfo.OneViewVersionName = RemoteAppInfo.VersionName;

            var _OneViewAppConfigIL = new OneViewAppConfigIL(toaster);
            var oAppDetailsDTO = _OneViewAppConfigIL.UpdateAppDetails(DeviceInfo);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUpgradeStep.UpdateAppDetails", Excep);
        }
        finally {
            _OneViewDeviceInfoPlugin = null;
            DeviceInfo = null;
            _OneViewAppConfigIL = null;
            oAppDetailsDTO = null;
        }
    }

    ////////////*****************************Upgrade Process END*************************///////////////////////////////
    

}



function APKAppStoreUpgradeUpgradeStep() {

    var MyInstance = this;
    var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();

    this.Execute = function (StepNo) {
        try {
            OneViewConsole.Debug("Execute Start", "APKAppStoreUpgradeUpgradeStep.Execute");
           
            MyInstance.Upgrade(StepNo);

            OneViewConsole.Debug("Execute End", "APKAppStoreUpgradeUpgradeStep.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKAppStoreUpgradeUpgradeStep.Execute", Excep);
        }
    }



    ////////////*****************************App Store Upgrade Process START*************************///////////////////////////////

    this.Upgrade = function (StepNo) {
        try {
            OneViewConsole.Debug("Upgrade Start", "APKAppStoreUpgradeUpgradeStep.Upgrade");


            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                var UpgradeMismatchResponse = oAPKUpgradeProcessBO.CheckForUpgradeMismatch(GlobalAPKUpgradeMetadata);

                if (UpgradeMismatchResponse.IsUpgradeMismatch == true) {

                    var Title = GlobalxlatService.xlat('Warning');
                    var Message = UpgradeMismatchResponse.Message;

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                        if (ConfirmationId == '2') {
                            MyInstance.UpgradeHandler(StepNo);
                        }
                    });
                }

                else {
                    MyInstance.UpgradeHandler(StepNo);
                }

            }
            else {
                alert(GlobalxlatService.xlat('NoInternetConnection'));
            }
            OneViewConsole.Debug("Upgrade End", "APKAppStoreUpgradeUpgradeStep.Upgrade");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKAppStoreUpgradeUpgradeStep.Upgrade", Excep);
        }
    }



    this.UpgradeHandler = function (StepNo) {
        try {
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                var LocalAppInfo = oOneViewAppInfoPlugin.GetLocalAppInfo();
                var AppInfoResponse = oOneViewAppInfoPlugin.GetRemoteAppInfo(OneViewSessionStorage.Get("ServiceId"), oneViewGlobalVariables.FoodSafetyServiceURL);
                var RemoteAppInfo = AppInfoResponse.AppInfo;

                if (AppInfoResponse.IsAnyException != true) {
                    if (RemoteAppInfo != "") {
                        var LocalAppInfoVersionName = null;
                        var RemoteAppInfoVersionName = null;

                        if (LocalAppInfo != "" && LocalAppInfo != null && LocalAppInfo != undefined) {
                            //LocalAppInfo.VersionName = parseInt(LocalAppInfo.VersionName.replace(/\./g, ''));
                            LocalAppInfoVersionName = parseInt(LocalAppInfo.VersionName.replace(/\./g, ''));
                        }
                        if (RemoteAppInfo != "" && RemoteAppInfo != null && RemoteAppInfo != undefined) {
                            //RemoteAppInfo.VersionName = parseInt(RemoteAppInfo.VersionName.replace(/\./g, ''));
                            RemoteAppInfoVersionName = parseInt(RemoteAppInfo.VersionName.replace(/\./g, ''));
                        }
                        //if (LocalAppInfo.VersionName < RemoteAppInfo.VersionName) {
                        if (LocalAppInfoVersionName < RemoteAppInfoVersionName) {

                            var WFLength = Object.keys(GlobalAPKUpgradeMetadataForCurrentVersion.Workflow).length;
                            var WorkflowConfig = GlobalAPKUpgradeMetadataForCurrentVersion.WorkflowConfig[GlobalAPKUpgradeMetadataForCurrentVersion.Workflow[StepNo]];
                            var msg = GlobalxlatService.xlat('Step') + StepNo + GlobalxlatService.xlat('of') + WFLength + " : " + GlobalxlatService.xlat(WorkflowConfig.PreMessage);
                            // navigator.notification.alert(msg, ['OK'], "");

                            // If network is available
                            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
                            if (NetworkDetails.IsNetworkAvailable == true) {                            
                                oOneViewAppInfoPlugin.RedirectToAppStore();
                            }

                            else {
                                alert(GlobalxlatService.xlat('NoInternetConnection'));
                            }
                            //oSetDefaultSpinner.Start(msg);

                            //var IsSuccess = oOneViewAppInfoPlugin.DownloadApk(OneViewSessionStorage.Get("ServiceId"), oneViewGlobalVariables.FoodSafetyServiceURL);
                            //oSetDefaultSpinner.Stop();

                            //if (IsSuccess == true) {

                            //    UpdateAppDetails('', RemoteAppInfo);

                            //    oOneViewAppInfoPlugin.UpdateApk();
                            //}
                            //else {
                            //    //   alert("Apk not available, please contact administrator");
                            //    alert("IN-ER-AUP-001 :: Something went wrong , Please check your Internet Connectivity or contact administrator");
                            //}
                        }
                        else {
                            alert(GlobalxlatService.xlat("IN-ER-AUP-003 :: Something went wrong while upgrade, Please check your Internet Connectivity or contact administrator"));
                        }
                    }

                    else {
                        // alert("App info not available, please contact administrator");
                        alert(GlobalxlatService.xlat("IN-ER-AUP-002 :: Something went wrong , Please check your Internet Connectivity or contact administrator"));
                    }
                }

                else {
                    alert(GlobalxlatService.xlat(AppInfoResponse.Message));
                }
            }

            else {
                alert(GlobalxlatService.xlat('NoInternetConnection'));
            }

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUpgradeStep.UpgradeHandler", Excep);
        }
    }


    var UpdateAppDetails = function (toaster, RemoteAppInfo) {

        try {
            var _OneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
            var DeviceInfo = _OneViewDeviceInfoPlugin.GetDeviceInfo();

            DeviceInfo.OneViewVersionCode = RemoteAppInfo.VersionCode;
            DeviceInfo.OneViewVersionName = RemoteAppInfo.VersionName;

            var _OneViewAppConfigIL = new OneViewAppConfigIL(toaster);
            var oAppDetailsDTO = _OneViewAppConfigIL.UpdateAppDetails(DeviceInfo);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKAppStoreUpgradeUpgradeStep.UpdateAppDetails", Excep);
        }
        finally {
            _OneViewDeviceInfoPlugin = null;
            DeviceInfo = null;
            _OneViewAppConfigIL = null;
            oAppDetailsDTO = null;
        }
    }

    ////////////*****************************App Store Upgrade Process END*************************///////////////////////////////


}


function APKUpgradeUploadDbStep() {

    var MyInstance = this;
    var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
    var oAPKUpgradeProcessUIComponent = new APKUpgradeProcessUIComponent();

    this.Execute = function (StepNo, IsSkipAllowed) {
        try {
            OneViewConsole.Debug("Execute Start", "APKUpgradeUploadDbStep.Execute");

            MyInstance.UploadDb(StepNo, IsSkipAllowed);

            OneViewConsole.Debug("Execute End", "APKUpgradeUploadDbStep.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUploadDbStep.Execute", Excep);
        }
    }



    ////////////*****************************UploadDb Process START*************************///////////////////////////////

    this.UploadDb = function (StepNo, IsSkipAllowed) {
        try {
            OneViewConsole.Debug("UploadDb Start", "APKUpgradeUploadDbStep.UploadDb");

            MyInstance.UploadDbHandler(StepNo, IsSkipAllowed);

            OneViewConsole.Debug("UploadDb End", "APKUpgradeUploadDbStep.UploadDb");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUploadDbStep.UploadDb", Excep);
        }
    }

    this.UploadDbHandler = function (StepNo, IsSkipAllowed) {
        try {
            OneViewConsole.Debug("UploadDbHandler Start", "APKUpgradeUploadDbStep.UploadDbHandler");

            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "APKUpgradeUploadDbStep.UploadDbHandler");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                if (IsSkipAllowed != true) {
                    var oDbStructureController = new DbStructureController();
                    oDbStructureController.CopyDb();
                    oDbStructureController.UploadDb();
                }

                var IsAPKUpgradeCompleted = false;
                if (StepNo == Object.keys(GlobalAPKUpgradeMetadataForCurrentVersion.Workflow).length) {
                    IsAPKUpgradeCompleted = true;
                }

                oAPKUpgradeProcessBO.UpdateAPKUpgradeProcessStatus(true, IsAPKUpgradeCompleted, StepNo, true);
                oAPKUpgradeProcessBO.SetAPKUpgradeWorkflowUIStatus(GlobalAPKUpgradeMetadataForCurrentVersion);
                oAPKUpgradeProcessUIComponent.RefreshPageHtml(Globalscope);

                //// oAPKUpgradeProcessBO.ShowAPKUpgradeProcessCompleted(GlobalAPKUpgradeMetadataForCurrentVersion, GlobalxlatService);
                oAPKUpgradeProcessBO.RedirectToLoginPageIfUpgradeProcessCompleted(Globallocation);
            }

            else {
                alert(GlobalxlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No Internet Connection", "APKUpgradeUploadDbStep.UploadDbHandler");
            }

            OneViewConsole.Debug("UploadDbHandler End", "APKUpgradeUploadDbStep.UploadDbHandler");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeUploadStep.UploadDbHandler", Excep);
        }
    }

    ////////////*****************************UploadDb Process END*************************///////////////////////////////


}



function APKUpgradeRefreshStep() {

    var MyInstance = this;
    var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
    var oAPKUpgradeProcessUIComponent = new APKUpgradeProcessUIComponent();

    this.Execute = function (StepNo, IsSkipAllowed) {
        try {
            OneViewConsole.Debug("Execute Start", "APKUpgradeRefreshStep.Execute");

            MyInstance.Refresh(StepNo, false, IsSkipAllowed);

            OneViewConsole.Debug("Execute End", "APKUpgradeRefreshStep.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeRefreshStep.Execute", Excep);
        }
    }



    ////////////*****************************Refresh Process START*************************///////////////////////////////

    this.Refresh = function (StepNo, IsAutoRefresh, IsSkipAllowed) {
        try {
            OneViewConsole.Debug("Refresh Start", "APKUpgradeRefreshStep.Refresh");

            if (IsSkipAllowed == true) {
                MyInstance.UpdateAPKUpgradeProcessStatusOnRefresh(StepNo);
                Globallocation.url('/login');

                OneViewSessionStorage.Clear();
                ClearGlobalVariable();
            }
            else {
                var UpgradeMismatchResponse = oAPKUpgradeProcessBO.CheckForUpgradeMismatch(GlobalAPKUpgradeMetadata);

                if (UpgradeMismatchResponse.IsUpgradeMismatch == true) {

                    var Title = GlobalxlatService.xlat('Warning');
                    var Message = UpgradeMismatchResponse.Message;

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                        if (ConfirmationId == '2') {
                            MyInstance.RefreshHandler(StepNo);
                        }
                    });
                }

                else {
                    if (IsAutoRefresh != true) {
                        alert(GlobalxlatService.xlat('BeforeRefreshStart'));
                    }
                    MyInstance.RefreshHandler(StepNo);
                }
            }
            OneViewConsole.Debug("Refresh End", "APKUpgradeRefreshStep.Refresh");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeRefreshStep.Refresh", Excep);
        }
    }

    this.RefreshHandler = function (StepNo) {
        try {
            OneViewConsole.Debug("RefreshHandler Start", "APKUpgradeRefreshStep.RefreshHandler");
            //navigator.notification.alert(msg, ['OK'], "");
            var RetryRefreshLimit = 4;
            var RetryRefreshCount = 0;
            var IsRefreshCompleted = false;

            if (IsRefreshCompleted != true) {
                IsRefreshCompleted = MyInstance.RefreshServices(StepNo, IsRefreshCompleted, RetryRefreshCount, RetryRefreshLimit);
            }

            if (IsRefreshCompleted == true) {
                MyInstance.UpdateAPKUpgradeProcessStatusOnRefresh(StepNo);
                // alert('IN-SU-MSE-011 :: Congratulations ...!!! :: You have successfully upgraded to Latest Version ' + GlobalAPKUpgradeMetadata.LatestVersion );
                Globallocation.url('/login');

                OneViewSessionStorage.Clear();
                ClearGlobalVariable();
            }
            else {
                alert(GlobalxlatService.xlat("IN-ER-AUP-013 :: There is some error while refreshing , please contact administrator."));
            }

            OneViewConsole.Debug("RefreshHandler End", "APKUpgradeRefreshStep.RefreshHandler");
        }
        catch (Excep) {
            //alert('APKUpgradeRefreshStep.RefreshHandler Excep ' + Excep);
            //alert('APKUpgradeRefreshStep.RefreshHandler Excep ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeRefreshStep.RefreshHandler", Excep);
        }
    }

    this.UpdateAPKUpgradeProcessStatusOnRefresh = function (StepNo) {
        try {
            if (GlobalAPKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired == true) {
                alert('APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired = ' + GlobalAPKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired + ' : Not implemented exception');
            }

            else {
                var IsAPKUpgradeCompleted = false;
                if (StepNo == Object.keys(GlobalAPKUpgradeMetadataForCurrentVersion.Workflow).length) {
                    IsAPKUpgradeCompleted = true;
                }
                oAPKUpgradeProcessBO.UpdateAPKUpgradeProcessStatus(true, IsAPKUpgradeCompleted, StepNo, true);
                oAPKUpgradeProcessBO.SetAPKUpgradeWorkflowUIStatus(GlobalAPKUpgradeMetadataForCurrentVersion);

                oAPKUpgradeProcessUIComponent.RefreshPageHtml(Globalscope);
            }
        }
        catch (Excep) {
            //alert('APKUpgradeProcessFacade.UpdateAPKUpgradeProcessStatusOnRefresh Excep ' + Excep);
            //alert('APKUpgradeProcessFacade.UpdateAPKUpgradeProcessStatusOnRefresh Excep ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeRefreshStep.UpdateAPKUpgradeProcessStatusOnRefresh", Excep);
        }
    }

    this.RefreshServices = function (StepNo, IsRefreshCompleted, RetryRefreshCount, RetryRefreshLimit) {
        try {

            var WFLength = Object.keys(GlobalAPKUpgradeMetadataForCurrentVersion.WorkflowConfig).length;
            var WorkflowConfig = GlobalAPKUpgradeMetadataForCurrentVersion.WorkflowConfig["Refresh"];
            var msg = GlobalxlatService.xlat('Step') + StepNo + GlobalxlatService.xlat('of') + WFLength + " : " + GlobalxlatService.xlat(WorkflowConfig.PreMessage);

            oOneViewProgressbar.Start(GlobalxlatService.xlat(msg));


            var LoginServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginServiceName = OneViewSessionStorage.Get("ServiceName");
            
            oOneViewProgressbar.SetProgressValue(25);

            var _oCloudManagerBO = new CloudManagerBO(GlobalxlatService);
            var ServicesIds = _oCloudManagerBO.GetAllServicesIds();

            oOneViewProgressbar.SetProgressValue(50);

            for (var k = 0; k < ServicesIds.length; k++) {

                IsRefreshCompleted = false;
                OneViewSessionStorage.Save("ServiceId", ServicesIds[k]);
                _oCloudManagerBO.InitializeDBContext(ServicesIds[k]);

                var _oDefaultMasterDAO = new DefaultMasterDAO("MultiMediaSubElements");
                var MultiMediaSubElementsLst = _oDefaultMasterDAO.GetAllMasters();

                for (var i = 0; i < MultiMediaSubElementsLst.length; i++) {
                    var oFile = MultiMediaSubElementsLst[i].LocalURL.substring(7).split('/');
                    var FileName = oFile[oFile.length - 1];
                    oOneViewAppInfoPlugin.ClearCacheFilesByName(FileName);
                }

                var _oDbStructureController = new DbStructureController();
                IsRefreshCompleted = _oDbStructureController.ReCreate();

                if (IsRefreshCompleted != true) {
                    break;
                }
                var _DcPendingTaskBO = new DcPendingTaskBO();
                _DcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

                var PageIds = [];
                var _oDefaultPageConfigMetaDataBO = new DefaultPageConfigMetaDataBO(GlobalxlatService);
                var IsPageConfigMetaDataSuccess = _oDefaultPageConfigMetaDataBO.Download(PageIds);

                if (IsPageConfigMetaDataSuccess == true) {

                    var _oACLConfigMetaDataBO = new ACLConfigMetaDataBO(GlobalxlatService);
                    var IsACLConfigMetaDataSuccess = _oACLConfigMetaDataBO.Download();

                    if (IsACLConfigMetaDataSuccess == true) {

                        var _oMenuConfigMetaDataBO = new MenuConfigMetaDataBO(GlobalxlatService);
                        var MenuConfigMetaDataSuccess = _oMenuConfigMetaDataBO.Download();

                        if (MenuConfigMetaDataSuccess == true) {

                            var _oRouterConfigMetaDataBO = new RouterConfigMetaDataBO(GlobalxlatService);
                            var RouterConfigMetaDatasuccess = _oRouterConfigMetaDataBO.Download();
                        }
                    }
                }

                var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(GlobalxlatService);
                var GlobalizationMetdataSuccess = _oGlobalizationMetadataBO.DownloadPageWiseMetadata(true);

                var _oDefaultMasterDAO = new DefaultMasterDAO("BusinessEventEntity");
                var IsExist = _oDefaultMasterDAO.IsTableExist();

                if (IsExist == true) {
                    OneViewLocalStorage.Remove("AutoDownloadMetadataForBE");
                    var _oMobileAutoSyncMetadataDownloadBO = new MobileAutoSyncMetadataDownloadBO(GlobalxlatService);
                    //var _IsExistMobileAutoSyncMetadata = _oMobileAutoSyncMetadataDownloadBO.IsExistMobileAutoSyncMetadata();
                    //if (_IsExistMobileAutoSyncMetadata == false) {
                    var MobileAutoSyncMetadatasuccess = _oMobileAutoSyncMetadataDownloadBO.Download();
                    var _oBusinessEventFramework = new BusinessEventFramework();
                    _oBusinessEventFramework.GenerateAutoDownloadMetadataForBE();
                    //}
                }
            }

            oOneViewProgressbar.SetProgressValue(100);

            oOneViewProgressbar.Stop();

            
            OneViewSessionStorage.Save("ServiceId", LoginServiceId);
            OneViewSessionStorage.Save("ServiceName", LoginServiceName);

            if (IsRefreshCompleted != true && RetryRefreshCount < RetryRefreshLimit) {
                RetryRefreshCount++;
                MyInstance.RefreshServices(ServicesIds, IsRefreshCompleted, RetryRefreshCount, RetryRefreshLimit)
            }

            return IsRefreshCompleted;
        }
        catch (Excep) {
            IsRefreshCompleted = false;
            oOneViewProgressbar.Stop();
            // alert('APKUpgradeRefreshStep.RefreshServices Excep ' + Excep);
            // alert('APKUpgradeRefreshStep.RefreshServices Excep ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeRefreshStep.RefreshServices", Excep);
        }
    }

    ////////////*****************************Refresh Process END*************************///////////////////////////////


}


function APKUpgradeSchemaModifyStep() {

    var MyInstance = this;
    var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();
    var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
    var oAPKUpgradeProcessUIComponent = new APKUpgradeProcessUIComponent();

    /*
    var UpgradeSchemaMetadata = {
        "6.1.3.14": {
            "QueryList": [
                  { "Sequence": 1, "Type": "AlterTable", 'Table': 'LandingPageViewReponseEntity', 'Column': 'IsOnDeviceApprovalProfileNeeded', "Query": "Alter Table LandingPageViewReponseEntity ADD COLUMN IsOnDeviceApprovalProfileNeeded TEXT DEFAULT 'false'" },
                  { "Sequence": 2, "Type": "AlterTable", 'Table': 'LandingPageViewReponseEntity', 'Column': 'LandingPageViewDisplayConfig', "Query": "Alter Table LandingPageViewReponseEntity ADD COLUMN LandingPageViewDisplayConfig TEXT DEFAULT ''" },
                  { "Sequence": 3, "Type": "AlterTable", 'Table': 'DataCaptureEntity', 'Column': 'ServerValidationStatus', "Query": "Alter Table DataCaptureEntity ADD COLUMN ServerValidationStatus INT DEFAULT 0" },
                  { "Sequence": 4, "Type": "AlterTable", 'Table': 'DataCaptureEntity', 'Column': 'ServerValidationCode', "Query": "Alter Table DataCaptureEntity ADD COLUMN ServerValidationCode TEXT DEFAULT ''" },
                  { "Sequence": 5, "Type": "AlterTable", 'Table': 'DataCaptureEntity', 'Column': 'ServerValidationMessage', "Query": "Alter Table DataCaptureEntity ADD COLUMN ServerValidationMessage TEXT DEFAULT ''" },
                  { "Sequence": 6, "Type": "AlterTable", 'Table': 'DataCaptureEntity', 'Column': 'ServerValidationDate', "Query": "Alter Table DataCaptureEntity ADD COLUMN ServerValidationDate TEXT DEFAULT ''" },
                  { "Sequence": 7, "Type": "AlterTable", 'Table': 'ActionDetailsEntity', 'Column': 'ActionRaisedBySystemUserId', "Query": "Alter Table ActionDetailsEntity ADD COLUMN ActionRaisedBySystemUserId INT DEFAULT 0" },
                  { "Sequence": 8, "Type": "AlterTable", 'Table': 'ActionDetailsEntity', 'Column': 'ActionRaisedByAnonymousUserId', "Query": "Alter Table ActionDetailsEntity ADD COLUMN ActionRaisedByAnonymousUserId TEXT DEFAULT ''" },
                  { "Sequence": 9, "Type": "AlterTable", 'Table': 'ActionDetailsEntity', 'Column': 'ActionRaisedByUserName', "Query": "Alter Table ActionDetailsEntity ADD COLUMN ActionRaisedByUserName TEXT DEFAULT ''" }
            ]
        }
    };
    */


    this.Execute = function (StepNo, IsSkipAllowed) {
        try {
            OneViewConsole.Debug("Execute Start", "APKUpgradeSchemaModifyStep.Execute");
            
            if (IsSkipAllowed == true) {
                MyInstance.UpdateCompletedStatus(StepNo);
            }
            else {
                oOneViewProgressbar.Start(GlobalxlatService.xlat("Schema Upgrade in-progress, please be patient.. "));

                var IsStepCompleted = false;
                var APKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");

                if (APKUpgradeProcessStatus != null) {
                    APKUpgradeProcessStatus = JSON.parse(APKUpgradeProcessStatus);
                    oOneViewProgressbar.SetProgressValue(15);

                    var ExecutedQueryCount = 0;
                    var TotalQueryCount = 0;
                    var UpgradeSchemaMetadata = OneViewLocalStorage.Get("APKUpgradeSchemaFile");
                    oOneViewProgressbar.SetProgressValue(20);

                    if (UpgradeSchemaMetadata != null) {

                        var Metadata = JSON.parse(UpgradeSchemaMetadata); //UpgradeSchemaMetadata[VersionName];
                        //alert('Metadata.QueryList.length : ' + Metadata.QueryList.length);
                        TotalQueryCount = Metadata.QueryList.length;

                        var IncrementVal = (70 / TotalQueryCount);
                        var ProgressBarCount = 20 + IncrementVal;
                        for (var i = 0 ; i < TotalQueryCount; i++) {
                            var Details = Metadata.QueryList[i];

                            if (Details.Type == "AlterTable") {
                                var IsExists = MyInstance.CheckIsColumnExists(Details.Table, Details.Column);
                                if (IsExists != true) {
                                    //alert('Details.Query :' + Details.Query);
                                    _oOneViewSqlitePlugin.ExcecuteSql(Details.Query);
                                }
                                ExecutedQueryCount++;
                                oOneViewProgressbar.SetProgressValue(ProgressBarCount);
                            }
                            else {
                                navigator.notification.alert(('IN-ER-AUP-020 :: APKUpgradeSchemaModifyStep Type = ' + Details.Type + 'Not implemented '), ['OK'], "");
                            }
                        }

                        IsStepCompleted = true;
                    }
                    else {
                        navigator.notification.alert(("IN-ER-AUP-021 :: APKUpgradeSchemaFile File Not Found."), ['OK'], "");
                    }
                    //alert(ExecutedQueryCount + ",TotalQueryCount " + TotalQueryCount + " , IsStepCompleted : " + IsStepCompleted);

                }
                else {
                    navigator.notification.alert(("IN-ER-AUP-022 :: APKUpgradeProcessStatus Not Found."), ['OK'], "");
                }

                //alert(' IsStepCompleted : ' + IsStepCompleted);
                if (IsStepCompleted == true) {
                    MyInstance.UpdateCompletedStatus(StepNo);
                }

                oOneViewProgressbar.SetProgressValue(100);

                oOneViewProgressbar.Stop();
            }


            OneViewConsole.Debug("Execute End", "APKUpgradeSchemaModifyStep.Execute");
        }
        catch (Excep) {
            oOneViewProgressbar.Stop();
            alert("APKUpgradeSchemaModifyStep.Execute : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeSchemaModifyStep.Execute", Excep);
        }
    }


    this.CheckIsColumnExists = function (Table, Column) {
        try {
            OneViewConsole.Debug("CheckIsColumnExists Start", "APKUpgradeSchemaModifyStep.CheckIsColumnExists");

            var IsExists = false;
            var Query = "PRAGMA table_info(" + Table + ")";
            // alert('Query : ' + Query);
            var TableSchema = _oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            // alert('TableSchema : ' + JSON.stringify(TableSchema));

            for (var i = 0; i < TableSchema.length ; i++) {
                if (TableSchema[i].name == Column) {
                    IsExists = true;
                    break;
                }
            }

            OneViewConsole.Debug("CheckIsColumnExists End", "APKUpgradeSchemaModifyStep.CheckIsColumnExists");
            return IsExists;
        }
        catch (Excep) {
            alert("APKUpgradeSchemaModifyStep.CheckIsColumnExists : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeSchemaModifyStep.CheckIsColumnExists", Excep);
        }
    }

    this.UpdateCompletedStatus = function (StepNo) {
        try {
            OneViewConsole.Debug("UpdateCompletedStatus Start", "APKUpgradeSchemaModifyStep.UpdateCompletedStatus");

            var IsAPKUpgradeCompleted = false;
            if (StepNo == Object.keys(GlobalAPKUpgradeMetadataForCurrentVersion.Workflow).length) {
                IsAPKUpgradeCompleted = true;
            }

            oAPKUpgradeProcessBO.UpdateAPKUpgradeProcessStatus(true, IsAPKUpgradeCompleted, StepNo, true);
            oAPKUpgradeProcessBO.SetAPKUpgradeWorkflowUIStatus(GlobalAPKUpgradeMetadataForCurrentVersion);
            oAPKUpgradeProcessUIComponent.RefreshPageHtml(Globalscope);
            oAPKUpgradeProcessBO.RedirectToLoginPageIfUpgradeProcessCompleted();

            OneViewConsole.Debug("UpdateCompletedStatus End", "APKUpgradeSchemaModifyStep.UpdateCompletedStatus");
            
        }
        catch (Excep) {
            alert("APKUpgradeSchemaModifyStep.UpdateCompletedStatus : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeSchemaModifyStep.UpdateCompletedStatus", Excep);
        }
    }
}


function APKUpgradeRefreshConfigurationStep() {

    var MyInstance = this;
    var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
    var oAPKUpgradeProcessUIComponent = new APKUpgradeProcessUIComponent();

    this.Execute = function (StepNo, IsSkipAllowed) {
        try {
            OneViewConsole.Debug("Execute Start", "APKUpgradeRefreshConfigurationStep.Execute");

            if (IsSkipAllowed == true || IsSkipAllowed == 'true') {
                var IsAPKUpgradeCompleted = false;
                if (StepNo == Object.keys(GlobalAPKUpgradeMetadataForCurrentVersion.Workflow).length) {
                    IsAPKUpgradeCompleted = true;
                }
                oAPKUpgradeProcessBO.UpdateAPKUpgradeProcessStatus(true, IsAPKUpgradeCompleted, StepNo, true);

                if (IsAPKUpgradeCompleted == true) {
                    Globallocation.url('/login');
                    OneViewSessionStorage.Clear();
                    ClearGlobalVariable();
                }
                else {
                    oAPKUpgradeProcessBO.SetAPKUpgradeWorkflowUIStatus(GlobalAPKUpgradeMetadataForCurrentVersion);
                    oAPKUpgradeProcessUIComponent.RefreshPageHtml(Globalscope);
                }
            }
            else {
                // alert('APKUpgradeRefreshConfigurationStep');
                alert(GlobalxlatService.xlat("IN-ER-AUP-014 :: We are going to refresh few configurations, user will be logged out and asked to login again."));

                var IsTruncateACLConfigMetaDataCompleted = false;

                var _oDefaultMasterDAO = new DefaultMasterDAO("ACLConfigMetaDataEntity");
                _oDefaultMasterDAO.Delete();

                IsTruncateACLConfigMetaDataCompleted = true;

                if (IsTruncateACLConfigMetaDataCompleted == true) {

                    var IsAPKUpgradeCompleted = false;
                    if (StepNo == Object.keys(GlobalAPKUpgradeMetadataForCurrentVersion.Workflow).length) {
                        IsAPKUpgradeCompleted = true;
                    }

                    oAPKUpgradeProcessBO.UpdateAPKUpgradeProcessStatus(true, IsAPKUpgradeCompleted, StepNo, IsTruncateACLConfigMetaDataCompleted);
                    // alert('IN-SU-MSE-011 :: Congratulations ...!!! :: You have successfully upgraded to Latest Version ' + GlobalAPKUpgradeMetadata.LatestVersion );

                    if (IsAPKUpgradeCompleted == true) {
                        Globallocation.url('/login');
                        OneViewSessionStorage.Clear();
                        ClearGlobalVariable();
                    }
                    else {
                        oAPKUpgradeProcessBO.SetAPKUpgradeWorkflowUIStatus(GlobalAPKUpgradeMetadataForCurrentVersion);
                        oAPKUpgradeProcessUIComponent.RefreshPageHtml(Globalscope);
                    }
                }
                else {
                    alert(GlobalxlatService.xlat("IN-ER-AUP-015 :: There is some error while refreshing ACL Configuration , please contact administrator."));
                }
            }
            OneViewConsole.Debug("Execute End", "APKUpgradeRefreshConfigurationStep.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "APKUpgradeRefreshConfigurationStep.Execute", Excep);
        }
    }
    
    ////////////*****************************Refresh Process END*************************///////////////////////////////


}
