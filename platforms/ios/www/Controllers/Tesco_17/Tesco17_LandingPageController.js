
var templocation = null;
var tempscope = null;
var TemplateGroupIdForTesco = "";

MyApp.controller("Tesco17_LandingPageController", function ($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

    var LocalDcPlaceId = 0;
    var LocalDcPlaceName = "";

    var _oTesco17PeriodicLandingPageFacade = new Tesco17PeriodicLandingPageFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout);
    _oTesco17PeriodicLandingPageFacade.Init();
    _oTesco17PeriodicLandingPageFacade.PageLoad(true);
    
    $scope.$on('$destroy', function () {
        _oTesco17PeriodicLandingPageFacade.Destroy();
    });

    PeriodicLandingPageControllerRowClick = function (DcPlaceId, DcPlaceName) {
        try {
            LocalDcPlaceId = DcPlaceId;
            LocalDcPlaceName = DcPlaceName;
            tempscope.ActionSheet = true;
            tempscope.$apply();
          
        } catch (e)
        {
           // alert(e);
        }

    }

    $scope.DownloadDCProfile = function () {
        _oTesco17PeriodicLandingPageFacade.DownloadDCProfile();
    }

    $scope.UploadDC = function () {
        _oTesco17PeriodicLandingPageFacade.UploadDC();
    }

    $scope.BackgroundVisble = function () {
        $scope.ActionSheet = false;
    }

    $scope.LoadNewDC = function () {
        _oTesco17PeriodicLandingPageFacade.LoadNewDC(LocalDcPlaceId, LocalDcPlaceName);
    }

    $scope.ApproveDC = function () {        
        _oTesco17PeriodicLandingPageFacade.ApproveDC(LocalDcPlaceId, LocalDcPlaceName);
    
    }

});

function Tesco17PeriodicLandingPageFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

    var _oDOM = new DOM();
    var _oTesco17PeriodicLandingBO = new Tesco17PeriodicLandingBO($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout);

    var MyInstance = this;

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init Start", "Tesco17PeriodicLandingPageFacade.Init");

            templocation = $location;
            tempscope = $scope;
            OneViewConsole.Debug("Init Start", "Tesco17PeriodicLandingPageFacade.Init");
            
            xlatService.setCurrentPage('-1');
            var TitleKey = "";
            var TemplateGroupId = $location.search().TemplateGroupId;
            if (TemplateGroupId == 2) {
                TitleKey = "ExpressPageTitle";
            }
            else {
                TitleKey = "NonExpressPageTitle";
            }
            _oDOM.AddInnerHtml('PageTitle', xlatService.xlat(TitleKey));
            _oTesco17PeriodicLandingBO.SetPeriodicLandingPageLastSyncDate();

            _oTesco17PeriodicLandingBO.TemplateGroupId = 2;//$location.search().TemplateGroupId;
            _oTesco17PeriodicLandingBO.TemplateGroupType = 2;// $location.search().TemplateGroupType;
            
            OneViewConsole.Debug("Init End", "Tesco17PeriodicLandingPageFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "Tesco17PeriodicLandingPageFacade.Init", xlatService);
        }
    }

    this.PageLoad = function (ImplicitProfileDownloadRequired) {

        try {
            OneViewConsole.Debug("PageLoad Start", "Tesco17PeriodicLandingPageFacade.PageLoad");
            
            _oTesco17PeriodicLandingBO.PageLoad(ImplicitProfileDownloadRequired);

            OneViewConsole.Debug("PageLoad End", "Tesco17PeriodicLandingPageFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "Tesco17PeriodicLandingPageFacade.PageLoad", xlatService);
        }
    }

    this.Destroy = function () {

        try {
            OneViewConsole.Debug("Destroy Start", "Tesco17PeriodicLandingPageFacade.Destroy");

            templocation = null;
            tempscope = null;

            OneViewConsole.Debug("Destroy End", "Tesco17PeriodicLandingPageFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "Tesco17PeriodicLandingPageFacade.Destroy", xlatService);
        }
    }

    this.DownloadDCProfile = function () {

        try {
            OneViewConsole.Debug("DownloadDCProfile start", "Tesco17PeriodicLandingPageFacade.DownloadDCProfile");
           
            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "Tesco17PeriodicLandingPageFacade.DownLoad");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                _oTesco17PeriodicLandingBO.DownloadDCProfile();               
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "Tesco17PeriodicLandingPageFacade.DownLoadProfile");
            }

            OneViewConsole.Debug("DownloadDCProfile end", "Tesco17PeriodicLandingPageFacade.DownloadDCProfile");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "Tesco17PeriodicLandingPageFacade.DownloadDCProfile", Excep);
        }
        finally {
        }
    }

    this.UploadDC = function () {

        try {
            OneViewConsole.Debug("UploadDC start", "Tesco17PeriodicLandingPageFacade.UploadDC");

           
                // Network status checking
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

                if (NetworkStatus.IsNetworkAvailable == true) {
                    var IsSuccess = MyInstance.GetAnyUnApprovedDC();

                    if (IsSuccess == true) {
                        _oTesco17PeriodicLandingBO.UploadDC();
                    }
                    else {
                        //navigator.notification.alert(xlatService.xlat('Periodic_Upload_Validation_Message'), ['OK'], "");
						navigator.notification.alert(xlatService.xlat('Periodic_Upload_Validation_Message'), ['OK'], "");
                    }
                }
                else {
                    navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                    OneViewConsole.Info("No internet connection", "Tesco17PeriodicLandingPageFacade.Upload");
                }           
           

            OneViewConsole.Debug("UploadDC end", "Tesco17PeriodicLandingPageFacade.UploadDC");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "Tesco17PeriodicLandingPageFacade.UploadDC", Excep);
        }
        finally {
        }
    }

    this.GetAnyUnApprovedDC = function () {

        try {
            OneViewConsole.Debug("GetAnyUnApprovedDC start", "Tesco17PeriodicLandingPageFacade.GetAnyUnApprovedDC");

            var IsSuccess = true;
            var _oDcDAO = new DcDAO()
            var result = _oDcDAO.GetAllDataCaptures();

            if (result != null && result.length >0) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].IsOnDeviceApprovalFinished != true && result[i].IsOnDeviceApprovalFinished != 'true') {
                        IsSuccess = false;
                        break;
                    }
                }
            }
            //alert('IsSuccess : ' + IsSuccess);
            OneViewConsole.Debug("GetAnyUnApprovedDC end", "Tesco17PeriodicLandingPageFacade.GetAnyUnApprovedDC");
            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "Tesco17PeriodicLandingPageFacade.GetAnyUnApprovedDC", Excep);
        }
        finally {
        }
    }


    this.LoadNewDC = function (DcPlaceId, DcPlaceName) {

        try {
            OneViewConsole.Debug("LoadNewDC start", "Tesco17PeriodicLandingPageFacade.LoadNewDC");

            OneViewSessionStorage.Save("DcPlaceId", DcPlaceId);
            OneViewSessionStorage.Save("DcPlaceName", DcPlaceName);
            var TemplateGroupId = 2;//$location.search().TemplateGroupId;
            var TemplateGroupType = 2;// $location.search().TemplateGroupType;

            templocation.url('/Express?TemplateGroupType=' + TemplateGroupType + '&TemplateGroupId=' + TemplateGroupId);
            tempscope.$apply();

            OneViewConsole.Debug("LoadNewDC end", "Tesco17PeriodicLandingPageFacade.LoadNewDC");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "Tesco17PeriodicLandingPageFacade.LoadNewDC", Excep);
        }
        finally {
        }
    }

    this.ApproveDC = function (DcPlaceId, DcPlaceName) {

        try {
            OneViewConsole.Debug("ApproveDC start", "Tesco17PeriodicLandingPageFacade.ApproveDC");
          
            
            /*
            var oChild = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

            var IsProfileExist = _oDasboardBO.IsProfileExist(oChild);
            */
            var IsProfileExist = true;

            if (IsProfileExist == true) {

                var ApprovalProfileReq = {
                    ServiceId: OneViewSessionStorage.Get("ServiceId"),
                    UserId: OneViewSessionStorage.Get("LoginUserId"),
                    TemplateNodeId: "-1",
                    PlaceId: "",
                    DcPlaceDimension: 16,//Need to access from oChild
                    DCPlaceRCOType: 0,
                    DCPlaceKeyElementIsGroup: false,
                    TemplateKeyElementIsGroup: true,
                    DcClientGuidLst: [],
                }

                ApprovalProfileReq.PlaceId = DcPlaceId;
          

                TemplateGroupIdForTesco = 2; //$location.search().TemplateGroupId;
                var TemplateGroupType = 2;//$location.search().TemplateGroupType;
                 
                ApprovalProfileReq.AttributeGroupType = TemplateGroupType;
                ApprovalProfileReq.TemplateNodeId = TemplateGroupIdForTesco;

                var _oDcApprovalBO = new DcApprovalBO();
                var ApprovalInfoResponse = _oDcApprovalBO.GetApprovalInfo(ApprovalProfileReq);
                
                if (ApprovalInfoResponse.length == 0) {

                    //navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for approve"), ['OK'], "");
					navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for approve"), ['OK'], "");
                }
                else if (ApprovalInfoResponse.length == 1) {
                    DcOnDeviceApprovalInfoLst = ApprovalInfoResponse;
                    $location.url('/my-approval?TemplateGroupId=' + TemplateGroupIdForTesco);
                }
                else if (ApprovalInfoResponse.length > 1) {
             
                    DcOnDeviceApprovalInfoLst = ApprovalInfoResponse;                    
                    var _oDcApprovalBO = new DcApprovalBO();
                    var PreValidationStatus = _oDcApprovalBO.PreValidation(DcOnDeviceApprovalInfoLst);
                    if (PreValidationStatus == false) {
                        $location.url('/my-approval');
                    }
                }

            }
            else {
                //navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for approve"), ['OK'], "");
				navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for approve"), ['OK'], "");
            }

            tempscope.$apply();
            OneViewConsole.Debug("ApproveDC end", "LandingPageFacade.ApproveDC");

            OneViewConsole.Debug("ApproveDC end", "Tesco17PeriodicLandingPageFacade.ApproveDC");
        }
        catch (Excep) {
            alert("Excep : " + Excep+"..."+JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "Tesco17PeriodicLandingPageFacade.ApproveDC", Excep);
        }
        finally {
        }
    }

}

function Tesco17PeriodicLandingBO($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

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
            OneViewConsole.Debug("PageLoad Start", "Tesco17PeriodicLandingBO.PageLoad");

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
                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "Tesco17PeriodicLandingPageFacade.PageLoad");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    DownloadDCProfile(false);
                }
            }

            OneViewConsole.Debug("PageLoad End", "Tesco17PeriodicLandingBO.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "Tesco17PeriodicLandingBO.PageLoad", xlatService);
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
                IsOnDeviceApprovalProfileNeeded: true,
                DCPlaceRCOType: -1
            }

            FilterParams.TemplateId.push(MyInstance.TemplateGroupId);

            var _oProfileDownloadFacade = new ProfileDownloadFacade();
            var IsDefaultProfiledownloadSuccess = _oProfileDownloadFacade.DefaultProfiledownload(FilterParams, $scope, xlatService, '', '', $location);

            if (IsDefaultProfiledownloadSuccess == true) {

                OneViewLocalStorage.Save("PeriodicLandingPageLastSyncDate", new DateTime().GetDateAndTime());

                if (IsShowDownloadSuccessMessage == true) {
                    //navigator.notification.alert(xlatService.xlat('Periodic_Download_Success_Message'), ['OK'], "");
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
                //navigator.notification.alert(xlatService.xlat('NoDataForUpload'), ['OK'], "");
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
            OneViewConsole.Debug("UploadDC start", "Tesco17PeriodicLandingPageFacade.UploadDC");

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
                        //navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
						navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
                        IsSuccess = false;
                    }
                }
                else if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == false) {
                    //navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
					navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
                    IsSuccess = false;
                }

                oOneViewProgressbar.Stop();
            }

            OneViewConsole.Debug("UploadDC end", "Tesco17PeriodicLandingPageFacade.UploadDC");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "Tesco17PeriodicLandingPageFacade.UploadDC", Excep);
        }
        finally {
        }
    }

    this.LoadHtml = function (DcPlaceLst) {

        try {
            OneViewConsole.Debug("LoadHtml Start", "Tesco17PeriodicLandingPageFacade.LoadHtml");

            var Html = '';

            for (var i = 0; i < DcPlaceLst.length; i++) {

                Html += GetHtml(DcPlaceLst[i]);               
            }

            _oDOM.AddInnerHtml(MyInstance.ContainerId, Html);

            OneViewConsole.Debug("LoadHtml End", "Tesco17PeriodicLandingPageFacade.LoadHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "Tesco17PeriodicLandingBO.LoadHtml", Excep);
        }
    }

    var GetHtml = function (DcPlace) {

        try {
            OneViewConsole.Debug("LoadHtml Start", "Tesco17PeriodicLandingPageFacade.LoadHtml");

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

            var _oExpressBO = new ExpressBO();
            var Result = _oExpressBO.GetByTemplateGroup(RequestParam);

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

            OneViewConsole.Debug("LoadHtml End", "Tesco17PeriodicLandingPageFacade.LoadHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "Tesco17PeriodicLandingBO.GetHtml", Excep);
        }
    }

    this.SetPeriodicLandingPageLastSyncDate = function () {

        try {
            OneViewConsole.Debug("SetPeriodicLandingPageLastSyncDate start", "Tesco17PeriodicLandingPageFacade.SetPeriodicLandingPageLastSyncDate");

            var PeriodicLandingPageLastSyncDate = OneViewLocalStorage.Get("PeriodicLandingPageLastSyncDate");
            if (PeriodicLandingPageLastSyncDate != null) {
                _oDOM.AddInnerHtml('DivPeriodicLandingPageLastSyncDate', "Sync At " + PeriodicLandingPageLastSyncDate);
            }
            else {
                _oDOM.AddInnerHtml('DivPeriodicLandingPageLastSyncDate', "Not Sync with Server");
            }

            OneViewConsole.Debug("SetPeriodicLandingPageLastSyncDate end", "Tesco17PeriodicLandingPageFacade.SetPeriodicLandingPageLastSyncDate");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "Tesco17PeriodicLandingPageFacade.SetPeriodicLandingPageLastSyncDate", Excep);
        }
        finally {
        }        
    }
}
