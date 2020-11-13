
var templocation = null;
var tempscope = null;

MyApp.controller("PeriodicLandingPageController", function ($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

    var _oPeriodicLandingPageFacade = new PeriodicLandingPageFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout);
    _oPeriodicLandingPageFacade.Init();
    _oPeriodicLandingPageFacade.PageLoad(true);
    
    $scope.$on('$destroy', function () {
        _oPeriodicLandingPageFacade.Destroy();
    });

    PeriodicLandingPageControllerRowClick = function (DcPlaceId, DcPlaceName) {
        try {           
            OneViewSessionStorage.Save("DcPlaceId", DcPlaceId);
            OneViewSessionStorage.Save("DcPlaceName", DcPlaceName);

            templocation.url('/nav/my-TesocDCPeriodic');
            tempscope.$apply();

        } catch (e)
        {
            //alert(e);
        }

    }

    $scope.SyncTask = function () {
        _oPeriodicLandingPageFacade.DownloadDCProfile();
    }

    $scope.Upload = function () {
        _oPeriodicLandingPageFacade.UploadDC();
    }
});

function PeriodicLandingPageFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

    var _oDOM = new DOM();
    var _oPeriodicLandingBO = new PeriodicLandingBO($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout);

    var MyInstance = this;

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init Start", "PeriodicLandingPageFacade.Init");

            templocation = $location;
            tempscope = $scope;
            OneViewConsole.Debug("Init Start", "PeriodicLandingPageFacade.Init");
            
            xlatService.setCurrentPage('-1');
            _oDOM.AddInnerHtml('PageTitle', xlatService.xlat('MyPeriodicsPageTitle'));
            _oPeriodicLandingBO.SetPeriodicLandingPageLastSyncDate();

            _oPeriodicLandingBO.TemplateGroupId = $location.search().TemplateGroupId;
            _oPeriodicLandingBO.TemplateGroupType = $location.search().TemplateGroupType;
            
            OneViewConsole.Debug("Init End", "PeriodicLandingPageFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PeriodicLandingPageFacade.Init", xlatService);
        }
    }

    this.PageLoad = function (ImplicitProfileDownloadRequired) {

        try {
            OneViewConsole.Debug("PageLoad Start", "PeriodicLandingPageFacade.PageLoad");
            
            _oPeriodicLandingBO.PageLoad(ImplicitProfileDownloadRequired);

            OneViewConsole.Debug("PageLoad End", "PeriodicLandingPageFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PeriodicLandingPageFacade.PageLoad", xlatService);
        }
    }

    this.Destroy = function () {

        try {
            OneViewConsole.Debug("Destroy Start", "PeriodicLandingPageFacade.Destroy");

            templocation = null;
            tempscope = null;

            OneViewConsole.Debug("Destroy End", "PeriodicLandingPageFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PeriodicLandingPageFacade.Destroy", xlatService);
        }
    }

    this.DownloadDCProfile = function () {

        try {
            OneViewConsole.Debug("DownloadDCProfile start", "PeriodicLandingPageFacade.DownloadDCProfile");
           
            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "PeriodicLandingPageFacade.DownLoad");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                _oPeriodicLandingBO.DownloadDCProfile();               
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "PeriodicLandingPageFacade.DownLoadProfile");
            }

            OneViewConsole.Debug("DownloadDCProfile end", "PeriodicLandingPageFacade.DownloadDCProfile");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicLandingPageFacade.DownloadDCProfile", Excep);
        }
        finally {
        }
    }

    this.UploadDC = function () {

        try {
            OneViewConsole.Debug("UploadDC start", "PeriodicLandingPageFacade.UploadDC");

            // Network status checking
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

            if (NetworkStatus.IsNetworkAvailable == true) {
                
                _oPeriodicLandingBO.UploadDC();
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No internet connection", "PeriodicLandingPageFacade.Upload");
            }

            OneViewConsole.Debug("UploadDC end", "PeriodicLandingPageFacade.UploadDC");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicLandingPageFacade.UploadDC", Excep);
        }
        finally {
        }
    }
}

function PeriodicLandingBO($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

    this.ContainerId = "MainContainer";
    var _oDOM = new DOM();
    var _oDcDeletion = new DcDeletion();

    this.TemplateGroupId = 0;
    this.TemplateGroupType = 0;

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    var MyInstance = this;

    this.PageLoad = function (ImplicitProfileDownloadRequired) {

        try {
            OneViewConsole.Debug("PageLoad Start", "PeriodicLandingBO.PageLoad");

            var _oDcProfileDAO = new DcProfileDAO();
            var DcPlaceLst = _oDcProfileDAO.GetAllDcPlacesByTemplateGroupId({ "TemplateNodeId": MyInstance.TemplateGroupId, "TemplateGroupType": MyInstance.TemplateGroupType });

            if (DcPlaceLst.length > 0) {
                MyInstance.LoadHtml(DcPlaceLst);
            }
            else if (ImplicitProfileDownloadRequired == true) {
                OneViewLocalStorage.Remove("PeriodicLandingPageLastSyncDate");
                MyInstance.SetPeriodicLandingPageLastSyncDate();

                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "PeriodicLandingPageFacade.PageLoad");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    DownloadDCProfile(false);
                }
            }

            OneViewConsole.Debug("PageLoad End", "PeriodicLandingBO.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PeriodicLandingBO.PageLoad", xlatService);
        }
    }

    this.DownloadDCProfile = function () {

        try {
            OneViewConsole.Debug("DownloadDCProfile start", "DasboardBO.DownloadDCProfile");

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Download_confirm_Message'), function (ConfirmationId) {

                if (ConfirmationId == "2") {

                    DownloadDCProfile(true);
                }
            });            

            OneViewConsole.Debug("DownloadDCProfile end", "DasboardBO.DownloadDCProfile");            
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DasboardBO.DownloadDCProfile", Excep);
        }
        finally {
        }
    }

    var DownloadDCProfile = function (IsShowDownloadSuccessMessage) {

        try {
            OneViewConsole.Debug("DownloadDCProfile start", "DasboardBO.DownloadDCProfile");

            var FilterParams = {
                OSGuid: ServiceId,
                UserId: LoginUserId,
                TemplateId: [],
                FromDate: '',
                ToDate: '',
                DcPlaceDimension: 16,
                DcPlaceIds: [],
                IsDCPlaceGroup: false,
                IsTemplateGroup: true,
                IsOnDeviceApprovalProfileNeeded: false,
                DCPlaceRCOType: -1
            }

            FilterParams.TemplateId.push(MyInstance.TemplateGroupId);

            var _oProfileDownloadFacade = new ProfileDownloadFacade();
            var IsDefaultProfiledownloadSuccess = _oProfileDownloadFacade.DefaultProfiledownload(FilterParams, $scope, xlatService, '', '', $location);

            if (IsDefaultProfiledownloadSuccess == true) {

                OneViewLocalStorage.Save("PeriodicLandingPageLastSyncDate", new DateTime().GetDateAndTime());

                if (IsShowDownloadSuccessMessage == true) {
                    navigator.notification.alert(xlatService.xlat('Periodic_Download_Success_Message'), ['OK'], "");
                }

                oSetDefaultSpinner.Start();

                MyInstance.SetPeriodicLandingPageLastSyncDate();
                MyInstance.PageLoad(false);

                oSetDefaultSpinner.Stop();
            }

            OneViewConsole.Debug("DownloadDCProfile end", "DasboardBO.DownloadDCProfile");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DasboardBO.DownloadDCProfile", Excep);
        }
        finally {
        }
    }

    this.UploadDC = function () {

        try {
            OneViewConsole.Debug("UploadDC start", "DasboardBO.UploadDC");

            MyAuditUploadProgressValue = 0;
            MyAuditUploadBatchNumber = 1;

            var _oDcFilterParamRequest = new DcFilterParamRequest();
            _oDcFilterParamRequest.TemplateNodeId = MyInstance.TemplateGroupId;
            _oDcFilterParamRequest.SystemUserId = LoginUserId;
            _oDcFilterParamRequest.IsSynchronized = false;
            _oDcFilterParamRequest.IsDCPlaceGroup = false;
            _oDcFilterParamRequest.IsTemplateGroup = true;
            _oDcFilterParamRequest.DCPlaceRCOType = -1;
            _oDcFilterParamRequest.AttributeGroupType = MyInstance.TemplateGroupType;

            var _oDcDAO = new DcDAO();
            MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFiltersAdv(_oDcFilterParamRequest);

            var TotalBatches = MyAuditTotalDCCountForUpload / MyAuditUploadLimit;
            TotalBatches = Math.ceil(TotalBatches);

            MyAuditUploadProgressValue = 100 / TotalBatches;

            if (MyAuditTotalDCCountForUpload > 0) {

                var IsSuccess = UploadDC(_oDcFilterParamRequest);

                if (IsSuccess == true) {

                    var DcTemplateChildResult = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(_oDcFilterParamRequest.TemplateNodeId, _oDcFilterParamRequest.AttributeGroupType);

                    for (var i = 0; i < DcTemplateChildResult.length; i++) {

                        _oDcDeletion.ExcecuteGarbageCollector(DcTemplateChildResult[i].Id, -1);
                    }
                }
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoDataForUpload'), ['OK'], "");
                OneViewConsole.Info("No dc available", "DasboardBO.UploadDcAndAction");
            }            

            OneViewConsole.Debug("UploadDC end", "DasboardBO.UploadDC");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DasboardBO.UploadDC", Excep);
        }
        finally {
        }
    }

    var UploadDC = function (_oDcFilterParamRequest) {

        try {
            OneViewConsole.Debug("UploadDC start", "PeriodicLandingPageFacade.UploadDC");

            var Message = xlatService.xlat('Upload_confirm_Message');
            var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

            if (IsSuccess == true) {

                oOneViewProgressbar.Start("Uploading");

                var _oUploadBO = new UploadBO(xlatService, '');

                var _oDcPendingTaskBO = new DcPendingTaskBO();
                _oDcPendingTaskBO.Download();

                var IsMultiMediaSubElementsSuccess = _oUploadBO.UploadMultiMediaSubElements();

                if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == true) {

                    var IsSyncDynamicRcoAndAssetNodesSuccess = _oUploadBO.SyncDynamicRcoAndAssetNodes(true);

                    if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == true) {

                        IsSuccess = _oUploadBO.BatchUploadAdv(_oDcFilterParamRequest);
                    }
                    else if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == false) {
                        navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
                        IsSuccess = false;
                    }
                }
                else if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == false) {
                    navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
                    IsSuccess = false;
                }

                oOneViewProgressbar.Stop();
            }

            OneViewConsole.Debug("UploadDC end", "PeriodicLandingPageFacade.UploadDC");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicLandingPageFacade.UploadDC", Excep);
        }
        finally {
        }
    }

    this.LoadHtml = function (DcPlaceLst) {

        try {
            OneViewConsole.Debug("LoadHtml Start", "PeriodicLandingPageFacade.LoadHtml");

            var Html = '';

            for (var i = 0; i < DcPlaceLst.length; i++) {

                Html += GetHtml(DcPlaceLst[i]);               
            }

            _oDOM.AddInnerHtml(MyInstance.ContainerId, Html);

            OneViewConsole.Debug("LoadHtml End", "PeriodicLandingPageFacade.LoadHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicLandingBO.LoadHtml", Excep);
        }
    }

    var GetHtml = function (DcPlace) {

        try {
            OneViewConsole.Debug("LoadHtml Start", "PeriodicLandingPageFacade.LoadHtml");

            var RequestParam = {
                "ServiceId": ServiceId,
                "UserId": LoginUserId,
                "TemplateNodeId": MyInstance.TemplateGroupId,
                "PlaceId": DcPlace.Id,
                "DcPlaceDimension":16,
                "DCPlaceRCOType": 0,
                "TemplateGroupType": MyInstance.TemplateGroupType,
                "StartDate": "",
                "EndDate": "",
                "IsCompleted": "-1",
                "IsSynchronized": "-1"
            }

            var _oDateTime = new DateTime();
            RequestParam.StartDate = _oDateTime.GetDate() + " " + "00:00:00";
            RequestParam.EndDate = _oDateTime.GetDate() + " " + "23:59:59";

            var _oPeriodicBO = new PeriodicBO();
            var Result = _oPeriodicBO.GetByTemplateGroup(RequestParam);

            var TaskStatus = Result.OverAllCompletedDCCount + "/" + Result.Occurrence;

            var Html = '<a class="item item-icon-right" style="padding-right: 40px;" onclick="PeriodicLandingPageControllerRowClick(' + DcPlace.Id + ',\'' + DcPlace.Name + '\')">' +
                           // '<div class="row responsive-sm" >' +
                              //  '<div class="col col-80 no-padding no-margin">' +
                                    '<div class="heading">' + DcPlace.Name + '</div>' +                                   
                               // '</div>' +
                              //  '<div class="col col-20 no-margin col-center no-padding text-right">' +
                                    //'<i class="icon icon-social13 synced-color"></i>' +
                                    //'<i class="icon icon-checkmark icon-disabled"></i>' +
                                    //'<i class="icon icon-thumb-up-outline-symbol icon-disabled"></i>' +
                                    //'<i class="icon icon-arrow68 icon-disabled"></i>' +
                                    '<span class="badge badge-positive" style="float:right; margin: 2px 25px 0px 5px;">' + TaskStatus + '</span>' +
                               // '</div>' +
                           // '</div>' +
                            '<i class="icon icon-angle-right"></i>' +
                     '</a>';

            return Html;

            OneViewConsole.Debug("LoadHtml End", "PeriodicLandingPageFacade.LoadHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicLandingBO.GetHtml", Excep);
        }
    }

    this.SetPeriodicLandingPageLastSyncDate = function () {

        try {
            OneViewConsole.Debug("SetPeriodicLandingPageLastSyncDate start", "PeriodicLandingPageFacade.SetPeriodicLandingPageLastSyncDate");

            var PeriodicLandingPageLastSyncDate = OneViewLocalStorage.Get("PeriodicLandingPageLastSyncDate");
            if (PeriodicLandingPageLastSyncDate != null) {
                _oDOM.AddInnerHtml('DivPeriodicLandingPageLastSyncDate', "Sync At " + PeriodicLandingPageLastSyncDate);
            }
            else {
                _oDOM.AddInnerHtml('DivPeriodicLandingPageLastSyncDate', "Not Sync with Server");
            }

            OneViewConsole.Debug("SetPeriodicLandingPageLastSyncDate end", "PeriodicLandingPageFacade.SetPeriodicLandingPageLastSyncDate");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicLandingPageFacade.SetPeriodicLandingPageLastSyncDate", Excep);
        }
        finally {
        }        
    }
}
