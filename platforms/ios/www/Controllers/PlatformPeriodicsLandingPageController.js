
var templocation = null;
var tempscope = null;
var TemplateGroupIdForTesco = "";
var IsPeriodicApprovalProfileExists = false;

MyApp.controller("PlatformPeriodicsLandingPageController", function ($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {   
    var LocalDcPlaceId = 0;
    var LocalDcPlaceName = "";

    var _oPlatformPeriodicsLandingPageFacade = new PlatformPeriodicsLandingPageFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout);
    _oPlatformPeriodicsLandingPageFacade.Init();
    _oPlatformPeriodicsLandingPageFacade.PageLoad(true);
    
    $scope.$on('$destroy', function () {
        _oPlatformPeriodicsLandingPageFacade.Destroy();
    });

    PeriodicLandingPageControllerRowClick = function (DcPlaceId, DcPlaceName) {
        try {            
            LocalDcPlaceId = DcPlaceId;
            LocalDcPlaceName = DcPlaceName;
            tempscope.ActionSheet = true;
            tempscope.$apply();
            _oPlatformPeriodicsLandingPageFacade.LoadApprovalProfile(DcPlaceId);
            _oPlatformPeriodicsLandingPageFacade.EnableDisableApprovalButton();
        } catch (e)
        {
           // alert(e);
        }

    }

    $scope.DownloadDCProfile = function () {
        _oPlatformPeriodicsLandingPageFacade.DownloadDCProfile();
    }

    $scope.UploadDC = function () {
        _oPlatformPeriodicsLandingPageFacade.UploadDC(LocalDcPlaceId);
    }

    $scope.BackgroundVisble = function () {
        $scope.ActionSheet = false;
    }

    $scope.LoadNewDC = function () {
        _oPlatformPeriodicsLandingPageFacade.LoadNewDC(LocalDcPlaceId, LocalDcPlaceName);
    }

    $scope.ApproveDC = function () {        
        _oPlatformPeriodicsLandingPageFacade.ApproveDC(LocalDcPlaceId, LocalDcPlaceName);
    
    }

});

function PlatformPeriodicsLandingPageFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

    var _oDOM = new DOM();
    var _oPlatformPeriodicsLandingPageBO = new PlatformPeriodicsLandingPageBO($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout);

    var MyInstance = this;
    var TemplateGroupId = $location.search().TemplateGroupId;

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init Start", "PlatformPeriodicsLandingPageFacade.Init");

            templocation = $location;
            tempscope = $scope;
            OneViewConsole.Debug("Init Start", "PlatformPeriodicsLandingPageFacade.Init");
            
            xlatService.setCurrentPage('-1');
            var TitleKey = "PageTitle";
                     
            _oDOM.AddInnerHtml('PageTitle', xlatService.xlat(TitleKey));
            _oPlatformPeriodicsLandingPageBO.SetPeriodicLandingPageLastSyncDate();

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

            _oPlatformPeriodicsLandingPageBO.TemplateGroupId = TemplateGroupId;
            _oPlatformPeriodicsLandingPageBO.TemplateGroupType = 2;// $location.search().TemplateGroupType;
            
            OneViewConsole.Debug("Init End", "PlatformPeriodicsLandingPageFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.Init", xlatService);
        }
    }

    this.PageLoad = function (ImplicitProfileDownloadRequired) {

        try {
            OneViewConsole.Debug("PageLoad Start", "PlatformPeriodicsLandingPageFacade.PageLoad");
            
            _oPlatformPeriodicsLandingPageBO.PageLoad(ImplicitProfileDownloadRequired);

           
            OneViewConsole.Debug("PageLoad End", "PlatformPeriodicsLandingPageFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.PageLoad", xlatService);
        }
    }

    this.Destroy = function () {

        try {
            OneViewConsole.Debug("Destroy Start", "PlatformPeriodicsLandingPageFacade.Destroy");

            templocation = null;
            tempscope = null;

            OneViewConsole.Debug("Destroy End", "PlatformPeriodicsLandingPageFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.Destroy", xlatService);
        }
    }

    this.DownloadDCProfile = function () {

        try {
            OneViewConsole.Debug("DownloadDCProfile start", "PlatformPeriodicsLandingPageFacade.DownloadDCProfile");
           
            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "PlatformPeriodicsLandingPageFacade.DownLoad");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

                _oPlatformPeriodicsLandingPageBO.DownloadDCProfile();               
            }
            else {
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No Internet Connection", "PlatformPeriodicsLandingPageFacade.DownLoadProfile");
            }

            OneViewConsole.Debug("DownloadDCProfile end", "PlatformPeriodicsLandingPageFacade.DownloadDCProfile");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.DownloadDCProfile", xlatService);
        }
        finally {
        }
    }

    this.UploadDC = function (LocalDcPlaceId) {

        try {
            OneViewConsole.Debug("UploadDC start", "PlatformPeriodicsLandingPageFacade.UploadDC");            
           
                // Network status checking
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
                
                if (NetworkStatus.IsNetworkAvailable == true) {
                    var IsExists = false;
                    if (IsPeriodicApprovalProfileExists == true) {
                        IsExists = MyInstance.GetAnyUnApprovedDC(LocalDcPlaceId);
                    }                  
                    if (IsExists == false) {
                        _oPlatformPeriodicsLandingPageBO.UploadDC();
                    }
                    else {
                        alert(xlatService.xlat('Periodic_Upload_Validation_Message'));
                    }
                }
                else {
                    alert(xlatService.xlat('NoInternetConnection'));
                    OneViewConsole.Info("No internet connection", "PlatformPeriodicsLandingPageFacade.Upload");
                }           
           

            OneViewConsole.Debug("UploadDC end", "PlatformPeriodicsLandingPageFacade.UploadDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.UploadDC", xlatService);
        }
        finally {
        }
    }

    this.GetAnyUnApprovedDC = function (LocalDcPlaceId) {

        try {
            OneViewConsole.Debug("GetAnyUnApprovedDC start", "PlatformPeriodicsLandingPageFacade.GetAnyUnApprovedDC");

            var TemplateNodeIdList = new DcDAO().GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(TemplateGroupId, 2);
            
            var Req = {
                ServiceId: OneViewSessionStorage.Get('ServiceId'),
                TemplateNodeIdList: TemplateNodeIdList,
                DcPlaceId: LocalDcPlaceId,
                DcPlaceDimension: DATEntityType.OrganizationAssestsNode,
                DcUserId: OneViewSessionStorage.Get('LoginUserId')
            };
            
            var _oPlatformPeriodicsBO = new PlatformPeriodicsBO();
            var IsExists = _oPlatformPeriodicsBO.CheckAnyUnApprovedDCExists(Req);
                        
            OneViewConsole.Debug("GetAnyUnApprovedDC end", "PlatformPeriodicsLandingPageFacade.GetAnyUnApprovedDC");
            return IsExists;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.GetAnyUnApprovedDC", xlatService);
        }
        finally {
        }
    }


    this.LoadNewDCPage = function (DcPlaceId, DcPlaceName) {

        try {
            OneViewConsole.Debug("LoadNewDC start", "PlatformPeriodicsLandingPageFacade.LoadNewDC");
            
            var TemplateGroupType = 2;// $location.search().TemplateGroupType;
           // alert('PlatformPeriodics html');
            templocation.url('/PlatformPeriodics?TemplateGroupType=' + TemplateGroupType + '&TemplateGroupId=' + TemplateGroupId);
            tempscope.$apply();

            OneViewConsole.Debug("LoadNewDC end", "PlatformPeriodicsLandingPageFacade.LoadNewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.LoadNewDCPage", xlatService);
        }
        finally {
        }
    }

    this.LoadNewDC = function (DcPlaceId, DcPlaceName) {

        try {
            OneViewConsole.Debug("LoadNewDC start", "PlatformPeriodicsLandingPageFacade.LoadNewDC");


            OneViewSessionStorage.Save("DcPlaceId", DcPlaceId);
            OneViewSessionStorage.Save("DcPlaceName", DcPlaceName);

            //alert(DcPlaceId + ","+ TemplateGroupId );
            var _oPeriodicalWorkComponent = new PeriodicalWorkComponent(xlatService);
            var IsProfileValid = _oPeriodicalWorkComponent.GetIsProfileValid(DcPlaceId, TemplateGroupId);
            ////// var res = _oPeriodicalWorkComponent.LoadValidTemplates($location.search().TemplateGroupId);
            if (IsProfileValid == true) {
                var IsPartialApprovedDcAvailable = false;
                if (IsPeriodicApprovalProfileExists == true) {
                    var IsPartialApprovedDcAvailable = MyInstance.CheckAnyPartialApprovedDcAvailable(DcPlaceId);
                }
                if (IsPartialApprovedDcAvailable == false) {
                    MyInstance.LoadNewDCPage(DcPlaceId, DcPlaceName);
                }
                else {
                    alert(xlatService.xlat('Please complete approval and continue.'));
                }
            }
            else {
                alert(xlatService.xlat('No Valid Profile Available'));
            }

            OneViewConsole.Debug("LoadNewDC end", "PlatformPeriodicsLandingPageFacade.LoadNewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.LoadNewDC", xlatService);
        }
        finally {
        }
    }

    this.ApproveDC = function (DcPlaceId, DcPlaceName) {

        try {
            OneViewConsole.Debug("ApproveDC start", "PlatformPeriodicsLandingPageFacade.ApproveDC");
          
            DcApprovalUIInfo.IsIndividualDcSummary = false;

            if (IsPeriodicApprovalProfileExists == true) {
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


                    TemplateGroupIdForTesco = TemplateGroupId; //$location.search().TemplateGroupId;
                    var TemplateGroupType = 2;//$location.search().TemplateGroupType;

                    ApprovalProfileReq.AttributeGroupType = TemplateGroupType;
                    ApprovalProfileReq.TemplateNodeId = TemplateGroupIdForTesco;

                    var _oDcApprovalBO = new DcApprovalBO();
                    var ApprovalInfoResponse = _oDcApprovalBO.GetApprovalInfo(ApprovalProfileReq);

                    if (ApprovalInfoResponse.length == 0) {

                        alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for approve"));
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
                    alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for approve"));
                }

                tempscope.$apply();
            }
            OneViewConsole.Debug("ApproveDC end", "LandingPageFacade.ApproveDC");

            OneViewConsole.Debug("ApproveDC end", "PlatformPeriodicsLandingPageFacade.ApproveDC");
        }
        catch (Excep) {
            //alert("Excep : " + Excep+"..."+JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.ApproveDC", xlatService);
        }
        finally {
        }
    }

    this.LoadApprovalProfile = function (DcPlaceId) {

        try {
            OneViewConsole.Debug("ApproveDC start", "PlatformPeriodicsLandingPageFacade.ApproveDC");

            var ApprovalProfileLst = MyInstance.GetApprovalProfile(DcPlaceId);

            if (ApprovalProfileLst != null && ApprovalProfileLst.length > 0) {
                IsPeriodicApprovalProfileExists = true;
            }
            
            OneViewConsole.Debug("ApproveDC end", "PlatformPeriodicsLandingPageFacade.ApproveDC");
        }
        catch (Excep) {           
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.LoadApprovalProfile", xlatService);
        }
        finally {
        }
    }

    this.GetApprovalProfile = function (DcPlaceId) {

        try {
            OneViewConsole.Debug("ApproveDC start", "PlatformPeriodicsLandingPageFacade.ApproveDC");

            var Req = {
                ServiceId: OneViewSessionStorage.Get("ServiceId"),
                UserId: OneViewSessionStorage.Get("LoginUserId"),
                TemplateNodeId: "-1",
                PlaceId: DcPlaceId,
                DcPlaceDimension: DATEntityType.OrganizationAssestsNode,//Need to access from oChild
                DCPlaceRCOType: 0,
                DCPlaceKeyElementIsGroup: false,
                TemplateKeyElementIsGroup: true,
                DcClientGuidLst: [],
            }
            var _oDcApprovalProfileDAO = new DcApprovalProfileDAO();
            var ApprovalProfileLst = _oDcApprovalProfileDAO.GetByAllDimensions(Req);

            //alert('ApprovalProfileLst : ' + ApprovalProfileLst.length);
            OneViewConsole.Debug("ApproveDC end", "PlatformPeriodicsLandingPageFacade.ApproveDC");

            return ApprovalProfileLst;
        }
        catch (Excep) {
            alert("GetApprovalProfile Excep : " + Excep + "..." + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.GetApprovalProfile", xlatService);
        }
        finally {
        }
    }

    this.CheckAnyPartialApprovedDcAvailable = function (DcPlaceId) {
        try {
            var IsPartialApprovedDcAvailable = false;
            var TemplateNodeIdList = new DcDAO().GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(TemplateGroupId, 2);

            //alert('CompleteDcStatusCountDict : ' + JSON.stringify(CompleteDcStatusCountDict));
            //var TemplateNodeIdList = [];
            //for (var TemplateNodeId in CompleteDcStatusCountDict.TemplateInfo) {
            //    TemplateNodeIdList.push(TemplateNodeId);
            //}
            //alert('TemplateNodeIdList : ' + JSON.stringify(TemplateNodeIdList));

            if (TemplateNodeIdList.length > 0) {
                var Req = {
                    ServiceId: OneViewSessionStorage.Get('ServiceId'),
                    TemplateNodeIdList: TemplateNodeIdList,
                    DcPlaceId: DcPlaceId,
                    DcPlaceDimension: DATEntityType.OrganizationAssestsNode,
                    DcUserId: OneViewSessionStorage.Get('LoginUserId')
                };
                var Result = new DcApprovalDAO().GetPartialAprovedDCByAllDimensions(Req);

                if (Result[0].DcCount > 0) {
                    IsPartialApprovedDcAvailable = true;
                }
            }
            return IsPartialApprovedDcAvailable;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.CheckAnyPartialApprovedDcAvailable", xlatService);
        }
    }


    this.GetAnyPartialApprovedDcAvailable = function (TemplateNodeIdList) {
        try {
            var IsPartialApprovedDcAvailable = false;

            var PartialApprovedDcList = null;
            // var TemplateNodeIdList = new TemplateNodeDAO().GetNodeByParentNodeId(TemplateNodeId);
            var InCondition = "";
            if (TemplateNodeIdList != null && TemplateNodeIdList.length > 0) {
                Incondition = "(";
                for (var i = 0; i < TemplateNodeIdList.length; i++) {
                    Incondition += TemplateNodeIdList[i];
                    Incondition += (i <= TemplateNodeIdList.length - 2) ? "," : ")";
                }

                PartialApprovedDcList = new DcApprovalDAO().GetPartialAprovedDCByTemplateList(Incondition);
            }

            if (PartialApprovedDcList != null && PartialApprovedDcList.length > 0) {
                IsPartialApprovedDcAvailable = true;
            }
            alert('IsPartialApprovedDcAvailable : ' + IsPartialApprovedDcAvailable);
            return IsPartialApprovedDcAvailable;
        }
        catch (Excep) {
            alert('GetAnyPartialApprovedDcAvailable Excep 11 : ' + Excep);
            alert('GetAnyPartialApprovedDcAvailable Excep : ' + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.GetAnyPartialApprovedDcAvailable", xlatService);
        }
    }

    this.EnableDisableApprovalButton = function () {

        try {
            OneViewConsole.Debug("EnableDisableApprovalButton start", "PlatformPeriodicsLandingPageFacade.EnableDisableApprovalButton");
            
            if (IsPeriodicApprovalProfileExists == true) {
                $scope.EnableApproveIcon = true;
                $scope.DisableApproveIcon = false;
            }
            else {
                $scope.EnableApproveIcon = false;
                $scope.DisableApproveIcon = true;
            }
            $scope.$apply();

            OneViewConsole.Debug("EnableDisableApprovalButton end", "PlatformPeriodicsLandingPageFacade.EnableDisableApprovalButton");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageFacade.EnableDisableApprovalButton", xlatService);
        }
        finally {
        }
    }


}

function PlatformPeriodicsLandingPageBO($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {

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
            OneViewConsole.Debug("PageLoad Start", "PlatformPeriodicsLandingPageBO.PageLoad");

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
                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "PlatformPeriodicsLandingPageBO.PageLoad");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    DownloadDCProfile(false);
                }
            }

            OneViewConsole.Debug("PageLoad End", "PlatformPeriodicsLandingPageBO.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PlatformPeriodicsLandingPageBO.PageLoad", xlatService);
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
                DCPlaceRCOType: -1,
                DCTemplateType : 2
            }

            FilterParams.TemplateId.push(MyInstance.TemplateGroupId);

            var _oProfileDownloadFacade = new ProfileDownloadFacade();
            var IsDefaultProfiledownloadSuccess = _oProfileDownloadFacade.DefaultProfiledownload(FilterParams, $scope, xlatService, '', '', $location);

            if (IsDefaultProfiledownloadSuccess == true) {

                OneViewLocalStorage.Save("PeriodicLandingPageLastSyncDate", new DateTime().GetDateAndTime());

                if (IsShowDownloadSuccessMessage == true) {
                    alert(xlatService.xlat('Periodic_Download_Success_Message'));
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
                alert(xlatService.xlat('NoDataForUpload'));
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
            OneViewConsole.Debug("UploadDC start", "PlatformPeriodicsLandingPageFacade.UploadDC");

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
                        alert(xlatService.xlat('UploadFailed'));
                        IsSuccess = false;
                    }
                }
                else if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == false) {
                    alert(xlatService.xlat('UploadFailed'));
                    IsSuccess = false;
                }

                oOneViewProgressbar.Stop();
            }

            OneViewConsole.Debug("UploadDC end", "PlatformPeriodicsLandingPageFacade.UploadDC");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PlatformPeriodicsLandingPageFacade.UploadDC", Excep);
        }
        finally {
        }
    }

    this.LoadHtml = function (DcPlaceLst) {

        try {
            OneViewConsole.Debug("LoadHtml Start", "PlatformPeriodicsLandingPageBO.LoadHtml");

            var Html = '';

            for (var i = 0; i < DcPlaceLst.length; i++) {

                Html += GetHtml(DcPlaceLst[i]);               
            }

            _oDOM.AddInnerHtml(MyInstance.ContainerId, Html);

            OneViewConsole.Debug("LoadHtml End", "PlatformPeriodicsLandingPageBO.LoadHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PlatformPeriodicsLandingPageBO.LoadHtml", Excep);
        }
    }

    var GetHtml = function (DcPlace) {

        try {
            OneViewConsole.Debug("LoadHtml Start", "PlatformPeriodicsLandingPageBO.LoadHtml");

            var RequestParam = {
                "ServiceId": ServiceId,
                "UserId": LoginUserId,
                "TemplateNodeId": MyInstance.TemplateGroupId,
                "PlaceId": DcPlace.Id,
                "DcPlaceDimension": DATEntityType.OrganizationAssestsNode,
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
            
            var _oPlatformPeriodicsBO = new PlatformPeriodicsBO();
            var Result = _oPlatformPeriodicsBO.GetByTemplateGroup(RequestParam);

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

            OneViewConsole.Debug("LoadHtml End", "PlatformPeriodicsLandingPageBO.LoadHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PlatformPeriodicsLandingPageBO.GetHtml", Excep);
        }
    }

    this.SetPeriodicLandingPageLastSyncDate = function () {

        try {
            OneViewConsole.Debug("SetPeriodicLandingPageLastSyncDate start", "PlatformPeriodicsLandingPageBO.SetPeriodicLandingPageLastSyncDate");

            var PeriodicLandingPageLastSyncDate = OneViewLocalStorage.Get("PeriodicLandingPageLastSyncDate");
            if (PeriodicLandingPageLastSyncDate != null) {
                _oDOM.AddInnerHtml('DivPeriodicLandingPageLastSyncDate', "Sync At " + PeriodicLandingPageLastSyncDate);
            }
            else {
                _oDOM.AddInnerHtml('DivPeriodicLandingPageLastSyncDate', "Not Sync with Server");
            }

            OneViewConsole.Debug("SetPeriodicLandingPageLastSyncDate end", "PlatformPeriodicsLandingPageBO.SetPeriodicLandingPageLastSyncDate");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PlatformPeriodicsLandingPageBO.SetPeriodicLandingPageLastSyncDate", Excep);
        }
        finally {
        }        
    }
}