
var LandingPageSelectedStatusTypeId = 1;
var DCTaskViewInfoDTO = null;
var LandingPageViewInfo = {
    LandingPageViewName: "",
    ParentIndex: 0,
    ChildIndex: 0,
    BackRouteKey: "",    
    SelectedTab: ""
};

// LandingPageController
MyApp.controller('LandingPageController', function ($scope, $document, xlatService, $timeout, $location, $templateCache, $compile) {

    var _oLandingPageFacade = new LandingPageFacade($scope, $document, xlatService, $timeout, $location, $templateCache, $compile);

    var IsPreInitSuccess = _oLandingPageFacade.PreInit();

    if (IsPreInitSuccess == true) {
        _oLandingPageFacade.Init();
        _oLandingPageFacade.PageLoad();
    }

    $scope.$on('$destroy', function () {
        _oLandingPageFacade.Destroy();
    });

    $scope.StatusTypeChange = function (Id) {
        _oLandingPageFacade.StatusTypeChange(Id);
    }

    $scope.TaskClick = function (LandingPageViewName, ParentIndex, ChildIndex) {
        _oLandingPageFacade.TaskClick(LandingPageViewName, ParentIndex, ChildIndex);
    }

    $scope.LoadNewDC = function () {
        _oLandingPageFacade.LoadNewDC();
    }

    $scope.LoadViewDC = function () {
        _oLandingPageFacade.LoadViewDC();
    }

    $scope.$watch('MyAudit', function (TabIndex) {
        _oLandingPageFacade.WatchMyAudit(TabIndex);      
    });

    $scope.BackgroundVisble = function () {
        $scope.ActionSheet = false;
    }

    $scope.ViewChange = function (ViewName) {
        _oLandingPageFacade.ViewChange(ViewName);
    }

    $scope.DownloadDCProfile = function () {
        _oLandingPageFacade.DownloadDCProfile();
    }

    $scope.AdvFilterChange = function () {
        _oLandingPageFacade.AdvFilterChange();
    }

    $scope.UploadDC = function () {
        _oLandingPageFacade.UploadDC();
    }

    $scope.SyncTask = function () {
        _oLandingPageFacade.SyncTask();
    }

    PageViewChangeEvent = function () {
        _oLandingPageFacade.PageViewChangeEvent();
    }    
});

// LandingPageFacade
function LandingPageFacade($scope, $document, xlatService, $timeout, $location, $templateCache, $compile) {

    var MyInstance = this;
    var _oDOM = new DOM();
    var _oLandingPageBO = new LandingPageBO($scope, $document, xlatService, $timeout, $location, $templateCache, $compile);
    var _oDateTime = new DateTime();

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    this.Destroy = function () {

        try {
            OneViewConsole.Debug("Destroy start", "LandingPageFacade.Destroy");

            LandingPageSelectedStatusTypeId = 1;
            DCTaskViewInfoDTO = null;
            LandingPageViewInfo = {
                LandingPageViewName: "",
                ParentIndex: 0,
                ChildIndex: 0,
                SelectedTab: ""
            };

            OneViewConsole.Debug("Destroy end", "LandingPageFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.Destroy", xlatService);
        }
    }

    this.PreInit = function () {

        try {
            OneViewConsole.Debug("PreInit start", "LandingPageFacade.PreInit");

            var IsPreInitSuccess = _oLandingPageBO.Download();

            OneViewConsole.Debug("PreInit end", "LandingPageFacade.PreInit");

            return IsPreInitSuccess;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.PreInit", xlatService);
        }        
    }

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "LandingPageFacade.Init");

            xlatService.setCurrentPage('15');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
           
            $scope.ActionSheet = false;           
         
            $scope.MyAuditTab = ["Past", "Today", "Future"];
            $scope.MyAudit = "Today";
           
            $scope.TaskContentPast = false;
            $scope.TaskContentToday = true;
            $scope.TaskContentFuture = false;

            _oLandingPageBO.LoadViews();

            var Value = _oDOM.GetValue('ViewDropdown');

            if (Value != "") {
                _oLandingPageBO.SetByView(Value);
            }
           
            OneViewConsole.Debug("Init end", "LandingPageFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.Init", xlatService);
        }
    }

    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "LandingPageFacade.PageLoad");
           
            _oLandingPageBO.UpdateTaskStatus(DCTaskViewInfoDTO);
            _oLandingPageBO.LoadHtml(DCTaskViewInfoDTO, 1);
           
            OneViewConsole.Debug("PageLoad end", "LandingPageFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.PageLoad", xlatService);
        }
    }

    this.StatusTypeChange = function (Id) {

        try {
            OneViewConsole.Debug("StatusTypeChange start", "LandingPageFacade.StatusTypeChange");

            oSetDefaultSpinner.Start();

            LandingPageSelectedStatusTypeId = Id;

            if ($scope.MyAudit == "Today") {

                var RegularExpressionForRemoveClass = new RegExp('(\\s|^)active(\\s|$)');
                var StatusTypeLst = document.getElementsByName("StatusType");
                for (var i = 0; i < StatusTypeLst.length; i++) {
                    StatusTypeLst[i].className = StatusTypeLst[i].className.replace(RegularExpressionForRemoveClass, ' ');
                }

                var CurrentStatusType = document.getElementById("StatusType" + Id);
                if (CurrentStatusType != null) {
                    CurrentStatusType.className = CurrentStatusType.className + " active";
                }

                _oLandingPageBO.LoadHtml(DCTaskViewInfoDTO, Id);
            }

            oSetDefaultSpinner.Stop();

            OneViewConsole.Debug("StatusTypeChange end", "LandingPageFacade.StatusTypeChange");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.StatusTypeChange", xlatService);
        }
    }

    this.TaskClick = function (LandingPageViewName, ParentIndex, ChildIndex) {

        try {
            OneViewConsole.Debug("TaskClick start", "LandingPageFacade.TaskClick");
                                
            //LandingPageViewInfo.LandingPageViewName = LandingPageViewName;
            LandingPageViewInfo.ParentIndex = ParentIndex;
            LandingPageViewInfo.ChildIndex = ChildIndex;
            LandingPageViewInfo.SelectedTab = $scope.MyAudit;

            OneViewSessionStorage.Save("LandingPageViewInfo", JSON.stringify(LandingPageViewInfo));

            $scope.ActionSheet = true;

            //alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));
                        
            OneViewConsole.Debug("TaskClick end", "LandingPageFacade.TaskClick");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.TaskClick", xlatService);
        }
    }

    this.UpdateBackRouteKey = function (BackRouteKey) {

        try {
            OneViewConsole.Debug("UpdateBackRouteKey start", "LandingPageFacade.UpdateBackRouteKey");

            var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

            if (LandingPageViewInfo != null) {

                LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
               
                LandingPageViewInfo.BackRouteKey = BackRouteKey;

                OneViewSessionStorage.Save("LandingPageViewInfo", JSON.stringify(LandingPageViewInfo));
            }

            OneViewConsole.Debug("UpdateBackRouteKey end", "LandingPageFacade.UpdateBackRouteKey");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.UpdateBackRouteKey", xlatService);
        }
    }

    this.LoadNewDC = function () {

        try {
            OneViewConsole.Debug("LoadNewDC start", "LandingPageFacade.LoadNewDC");

            var oChild = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

            var ProfileDetails = _oLandingPageBO.GetProfileDetails(oChild);
            
            if (ProfileDetails != null && ProfileDetails.IsProfileValid == true && (ProfileDetails.Occurence == -1 || (ProfileDetails.Occurence > oChild.DCStatusInfo.OverallCount))) {

                OneViewSessionStorage.Save("MyAuditEditForm", false);
                OneViewSessionStorage.Save("LandingPageEditForm", true);

                if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

                    OneViewSessionStorage.Save("DcPlaceId", oChild.DCPlaceKeyId);
                    OneViewSessionStorage.Save("TemplateId", oChild.TemplateKeyId);

                    OneViewSessionStorage.Save("DcPlaceName", oChild.DCPlaceKeyName);
                    OneViewSessionStorage.Save("TemplateName", oChild.TemplateKeyName);

                    OneViewSessionStorage.Save("DcProfileId", oChild.DCProfileId);
                    OneViewSessionStorage.Save("DcOccurence", oChild.Occurence);

                    MyInstance.UpdateBackRouteKey('/nav/landingPage');
                }
                else {
                    MyInstance.UpdateBackRouteKey(oChild.DCStartRouteKey);
                }

                $location.url(oChild.DCStartRouteKey);               
            }
            else if (ProfileDetails != null && ProfileDetails.IsProfileValid == true && ProfileDetails.Occurence == oChild.DCStatusInfo.OverallCount) {
                alert("IN-NF-LDP-010 :: Task already completed");
            }
            else {
                alert("IN-NF-LDP-001 :: No Profile(s) are available. Please download the profile(s) and continue");
            }

            OneViewConsole.Debug("LoadNewDC end", "LandingPageFacade.LoadNewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.LoadNewDC", xlatService);
        }
    }

    this.LoadViewDC = function () {
        
        try {
            OneViewConsole.Debug("LoadViewDC start", "LandingPageFacade.LoadViewDC");

            var oChild = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

            var IsProfileExist = _oLandingPageBO.IsProfileExist(oChild);
            
            if (IsProfileExist == true) {

                OneViewSessionStorage.Save("MyAuditEditForm", false);
                OneViewSessionStorage.Save("LandingPageEditForm", true);

                if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

                    OneViewSessionStorage.Save("DcPlaceId", oChild.DCPlaceKeyId);
                    OneViewSessionStorage.Save("TemplateId", oChild.TemplateKeyId);

                    OneViewSessionStorage.Save("DcPlaceName", oChild.DCPlaceKeyName);
                    OneViewSessionStorage.Save("TemplateName", oChild.TemplateKeyName);

                    OneViewSessionStorage.Save("DcProfileId", oChild.DCProfileId);
                    OneViewSessionStorage.Save("DcOccurence", oChild.Occurence);

                    MyInstance.UpdateBackRouteKey('/nav/landingPage');

                    $location.url('/ViewRecords');
                }
                else {                    
                    MyInstance.UpdateBackRouteKey(oChild.DCViewRouteKey);

                    $location.url(oChild.DCViewRouteKey);
                }
            }
            else {
                alert("IN-NF-LDP-001 :: No data available for View or Edit");
            }

            OneViewConsole.Debug("LoadViewDC end", "LandingPageFacade.LoadViewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.LoadViewDC", xlatService);
        }
    }

    this.WatchMyAudit = function (TabIndex) {

        try {
            OneViewConsole.Debug("WatchMyAudit start", "LandingPageFacade.WatchMyAudit");

            if (TabIndex != "Today") {
                _oLandingPageBO.ClearTaskStatus();
            }
            else {
                _oLandingPageBO.UpdateTaskStatus(DCTaskViewInfoDTO);
            }

            $scope.TaskContentPast = false;
            $scope.TaskContentToday = false;
            $scope.TaskContentFuture = false;

            $scope["TaskContent" + TabIndex] = true;

            OneViewConsole.Debug("WatchMyAudit end", "LandingPageFacade.WatchMyAudit");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.WatchMyAudit", xlatService);
        }       
    }

    this.ViewChange = function (ViewName) {

        try {
            OneViewConsole.Debug("ViewChange start", "LandingPageFacade.ViewChange");

            _oLandingPageBO.SetByView(ViewName);
            MyInstance.PageLoad();

            OneViewConsole.Debug("ViewChange end", "LandingPageFacade.ViewChange");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.ViewChange", xlatService);
        }       
    }

    this.DownloadDCProfile = function () {

        try {
            OneViewConsole.Debug("DownloadDCProfile start", "LandingPageFacade.DownloadDCProfile");

            _oLandingPageBO.DownloadDCProfile();

            OneViewConsole.Debug("DownloadDCProfile end", "LandingPageFacade.DownloadDCProfile");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.DownloadDCProfile", Excep);
        }
        finally {
        }
    }

    this.AdvFilterChange = function () {
        
        try {
            OneViewConsole.Debug("AdvFilterChange start", "LandingPageFacade.AdvFilterChange");


            OneViewConsole.Debug("AdvFilterChange end", "LandingPageFacade.AdvFilterChange");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.AdvFilterChange", Excep);
        }
        finally {
        }
    }

    this.UploadDC = function () {
        
        try {
            OneViewConsole.Debug("UploadDC start", "LandingPageFacade.UploadDC");
            
            _oLandingPageBO.UploadDC();

            OneViewConsole.Debug("UploadDC end", "LandingPageFacade.UploadDC");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.UploadDC", Excep);
        }
        finally {
        }
    }

    this.SyncTask = function () {
        
        try {
            OneViewConsole.Debug("SyncTask start", "LandingPageFacade.SyncTask");

            var Query = "Select count(DataCaptureEntity.Id) As TotalRecords From DataCaptureEntity" +
                        " INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where DcResultsEntity.SystemUserId = " + LoginUserId +
                        " And DataCaptureEntity.ServiceId = " + ServiceId + " And DataCaptureEntity.IsSynchronized = 'false'";
           
            var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            
            if (Result.length > 0 && Result[0].TotalRecords == 0) {

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Are you sure, you want to synchronize the task ?'), function (ConfirmationId) {

                    if (ConfirmationId == "2") {

                        oSetDefaultSpinner.Start();

                        var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(xlatService);
                        var IsSuccess = _oLandingPageViewReponseBO.Download();

                        if (IsSuccess == true) {

                            MyInstance.Init();
                            MyInstance.PageLoad();

                            alert("IN-NF-LDP-002 :: Task synchronized succsessfully");
                        }
                        else if (IsSuccess != null && IsSuccess == false) {
                            alert("IN-NF-LDP-003 :: Task synchronization failed");
                        }

                        oSetDefaultSpinner.Stop();
                    }
                });
            }
            else {
                alert("IN-NF-LDP-004 :: Please upload the all data captures and try again");
            }

            OneViewConsole.Debug("SyncTask end", "LandingPageFacade.SyncTask");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.SyncTask", Excep);
        }
        finally {
        }
    }

    this.PageViewChangeEvent = function () {
        
        try {
            OneViewConsole.Debug("PageViewChangeEvent start", "LandingPageFacade.PageViewChangeEvent");

            if ($scope.MyAudit == "Today") {
            
                oSetDefaultSpinner.Start();

                var Value = _oDOM.GetValue('ViewDropdown');
           
                if (Value != "") {
                    _oLandingPageBO.SetByView(Value);
                    MyInstance.PageLoad();
                }

                oSetDefaultSpinner.Stop();
            }

            OneViewConsole.Debug("PageViewChangeEvent end", "LandingPageFacade.PageViewChangeEvent");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.PageViewChangeEvent", Excep);
        }
        finally {
        }
    }
}

// LandingPageBO
function LandingPageBO($scope, $document, xlatService, $timeout, $location, $templateCache, $compile) {

    var MyInstance = this;
    var _oDOM = new DOM();
    var _oDateTime = new DateTime();
    var _oLandingPageViewReponseDAO = new LandingPageViewReponseDAO();
    var _oLandingPageViewReponseBO = new LandingPageViewReponseBO();
    var _oDcProfileDAO = new DcProfileDAO();

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
    
    this.LoadHtml = function (DCTaskViewInfoDTO, StatusType) {

        try {
            OneViewConsole.Debug("LoadHtml start", "LandingPageBO.LoadHtml");

            if (DCTaskViewInfoDTO != null) {

                var Html = '';
                var CurrentTab = 'TaskContent' + $scope.MyAudit;

                _oDOM.RemoveInnerHtml(CurrentTab);

                Html = GetHtml(DCTaskViewInfoDTO, StatusType);

                if (Html != '') {
                    var _oOneViewCompiler = new OneViewCompiler();
                    _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, CurrentTab);
                }
            }

            OneViewConsole.Debug("LoadHtml end", "LandingPageBO.LoadHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.LoadHtml", Excep);
        }
        finally {          
        }
    }

    this.UpdateTaskStatus = function (DCTaskViewInfoDTO) {

        try {
            OneViewConsole.Debug("UpdateTaskStatus start", "LandingPageBO.UpdateTaskStatus");

            if (DCTaskViewInfoDTO != null) {

                _oDOM.AddInnerHtml('OverallStatus', DCTaskViewInfoDTO.OverallCount);
                _oDOM.AddInnerHtml('NotStartedStatus', DCTaskViewInfoDTO.NotStartedCount);
                _oDOM.AddInnerHtml('InProgressStatus', DCTaskViewInfoDTO.InProgressCount);
                _oDOM.AddInnerHtml('MissedStatus', DCTaskViewInfoDTO.MissedCount);
                _oDOM.AddInnerHtml('NotSyncedStatus', DCTaskViewInfoDTO.NotSyncedCount);
                _oDOM.AddInnerHtml('CompletedStatus', DCTaskViewInfoDTO.CompletedCount);
                _oDOM.AddInnerHtml('SyncedStatus', DCTaskViewInfoDTO.SyncedCount);
                _oDOM.AddInnerHtml('ApprovedStatus', DCTaskViewInfoDTO.ApprovedCount);
            }

            OneViewConsole.Debug("UpdateTaskStatus end", "LandingPageBO.UpdateTaskStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.UpdateTaskStatus", Excep);
        }
        finally {
        }
    }

    this.ClearTaskStatus = function () {

        try {
            OneViewConsole.Debug("ClearTaskStatus start", "LandingPageBO.ClearTaskStatus");

            _oDOM.AddInnerHtml('OverallStatus', 0);
            _oDOM.AddInnerHtml('NotStartedStatus', 0);
            _oDOM.AddInnerHtml('InProgressStatus', 0);
            _oDOM.AddInnerHtml('MissedStatus', 0);
            _oDOM.AddInnerHtml('NotSyncedStatus', 0);
            _oDOM.AddInnerHtml('CompletedStatus', 0);
            _oDOM.AddInnerHtml('SyncedStatus', 0);
            _oDOM.AddInnerHtml('ApprovedStatus', 0);

            OneViewConsole.Debug("ClearTaskStatus end", "LandingPageBO.ClearTaskStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.ClearTaskStatus", Excep);
        }
        finally {
        }
    }

    this.LoadViews = function () {

        try {
            OneViewConsole.Debug("LoadViews start", "LandingPageBO.LoadViews");

            var LandingPageViewName = "";
            var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

            if (LandingPageViewInfo != null) {

                LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                LandingPageViewName = LandingPageViewInfo.LandingPageViewName;
            }
            
            var LandingPageViewLst = _oLandingPageViewReponseDAO.GetAllViewsByServiceAndUserId(ServiceId, LoginUserId);            

            var OptionsHtml = '';

            for (var i = 0; i < LandingPageViewLst.length; i++) {

                if (LandingPageViewName != "" && LandingPageViewLst[i].LandingPageViewName == LandingPageViewName) {
                    OptionsHtml += '<option selected>' + LandingPageViewLst[i].LandingPageViewName + '</option>';
                }
                else {
                    OptionsHtml += '<option>' + LandingPageViewLst[i].LandingPageViewName + '</option>';
                }
            }
            
            _oDOM.AddInnerHtml('ViewDropdown', OptionsHtml);

            if (LandingPageViewLst.length > 0) {
                _oDOM.AddInnerHtml("TaskSyncStatus", "Last Synchronized At " + LandingPageViewLst[0].LastsyncDate);
            }
            
            OneViewConsole.Debug("LoadViews end", "LandingPageBO.LoadViews");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.LoadViews", Excep);
        }
        finally {
        }
    }

    this.SetByView = function (ViewName) {

        try {
            OneViewConsole.Debug("SetByView start", "LandingPageBO.SetByView");

            var LandingPageViewReponse = _oLandingPageViewReponseDAO.GetByServiceUserAndLandingPageViewName(ServiceId, LoginUserId, ViewName);

            if (LandingPageViewReponse.length > 0) {

                if ($scope.MyAudit == "Past") {
                    DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponsePast);
                }
                if ($scope.MyAudit == "Today") {
                    DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseToday);
                }
                else {
                    DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseFuture);
                }
            }

            LandingPageViewInfo.LandingPageViewName = ViewName;
            
            //alert(JSON.stringify(DCTaskViewInfoDTO));

            OneViewConsole.Debug("SetByView end", "LandingPageBO.SetByView");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.SetByView", Excep);
        }
        finally {
        }
    }

    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "LandingPageBO.Download");

            var _DefaultMasterDAO = new DefaultMasterDAO("LandingPageViewReponseEntity");
            var IsTableExist = _DefaultMasterDAO.IsTableExist();

            var IsExistLandingPageViewReponse = false;

            if (IsTableExist == true) {
                IsExistLandingPageViewReponse = _oLandingPageViewReponseBO.IsExistLandingPageViewReponse();
            }

            if (IsExistLandingPageViewReponse == false) {

                IsExistLandingPageViewReponse = _oLandingPageViewReponseBO.Download();
            }

            OneViewConsole.Debug("Download end", "LandingPageBO.Download");

            return IsExistLandingPageViewReponse
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.Download", Excep);
        }
        finally {
        }
    }

    this.DownloadDCProfile = function () {

        try {
            OneViewConsole.Debug("DownloadDCProfile start", "LandingPageBO.DownloadDCProfile");

            var oParent = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex]
            var oChild = oParent.DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

            var FilterParams = {
                OSGuid: ServiceId,
                UserId: LoginUserId,
                TemplateId: [],
                FromDate: '',
                ToDate: '',
                DcPlaceDimension: 0,
                DcPlaceIds: [],
                IsDCPlaceGroup: false,
                IsTemplateGroup: false,
                DCPlaceRCOType: -1
            }

            FilterParams.TemplateId.push(oChild.TemplateKeyId);
            FilterParams.DcPlaceIds.push(oChild.DCPlaceKeyId);
            FilterParams.DcPlaceDimension = oChild.DCPlaceKeyDimension;
            FilterParams.IsDCPlaceGroup = oChild.DCPlaceKeyElementIsGroup;
            FilterParams.IsTemplateGroup = oChild.TemplateKeyElementIsGroup;
            FilterParams.DCPlaceRCOType = oChild.DCPlaceRCOType;

            if (oChild.TemplateKeyElementIsGroup == false) {

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Download_confirm_Message'), function (ConfirmationId) {

                    if (ConfirmationId == "2") {

                        var _oProfileDownloadFacade = new ProfileDownloadFacade();
                        var IsDefaultProfiledownloadSuccess = _oProfileDownloadFacade.DefaultProfiledownload(FilterParams, $scope, xlatService, '', '', $location);

                        if (IsDefaultProfiledownloadSuccess == true) {

                            alert("IN-SU-LNP-001 :: Profile(s) downloaded successfully");

                            MyInstance.SetByView(LandingPageViewInfo.LandingPageViewName);
                            MyInstance.UpdateTaskStatus(DCTaskViewInfoDTO);
                            MyInstance.LoadHtml(DCTaskViewInfoDTO, LandingPageSelectedStatusTypeId);
                        }
                    }
                });
            }            

            OneViewConsole.Debug("DownloadDCProfile end", "LandingPageBO.DownloadDCProfile");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.DownloadDCProfile", Excep);
        }
        finally {
        }
    }

    this.UploadDC = function () {

        try {
            OneViewConsole.Debug("UploadDC start", "LandingPageBO.UploadDC");
            
            var oChild = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex];
            
            if (oChild.TemplateKeyElementIsGroup == false) {

                MyAuditUploadProgressValue = 0;
                MyAuditUploadBatchNumber = 1;

                var _oDcFilterParamRequest = new DcFilterParamRequest();
                var _oDcDAO = new DcDAO();

                if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

                    _oDcFilterParamRequest = MakeDcFilterRequestForPlaceAndTemplate(oChild);                    
                    MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFilters(_oDcFilterParamRequest);
                }
                else if (oChild.DCPlaceKeyElementIsGroup == true && oChild.TemplateKeyElementIsGroup == false) {

                    _oDcFilterParamRequest = MakeDcFilterRequestForPlaceGroupAndTemplate(oChild);
                    MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFiltersAdv(_oDcFilterParamRequest);
                }

                var TotalBatches = MyAuditTotalDCCountForUpload / MyAuditUploadLimit;
                TotalBatches = Math.ceil(TotalBatches);

                MyAuditUploadProgressValue = 100 / TotalBatches;

                if (MyAuditTotalDCCountForUpload > 0) {

                    var IsSuccess = UploadDC(_oDcFilterParamRequest);                    

                    if (IsSuccess == true) {

                        if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

                            ExcecuteGarbageCollector(oChild.TemplateKeyId, oChild.DCPlaceKeyId);
                        }
                        else if (oChild.DCPlaceKeyElementIsGroup == true && oChild.TemplateKeyElementIsGroup == false) {

                            var DcPlaceChildResult = _oDcDAO.GetDcPlaceIdsByPlaceGroupAndDCPlaceRCOType(_oDcFilterParamRequest.DcPlaceId, _oDcFilterParamRequest.DCPlaceRCOType);

                            for (var i = 0; i < DcPlaceChildResult.length; i++) {

                                ExcecuteGarbageCollector(oChild.TemplateKeyId, DcPlaceChildResult[i].Id);
                            }
                        }

                        MyInstance.UpdateSyncStatus(oChild);
                        MyInstance.SetByView(LandingPageViewInfo.LandingPageViewName);
                        MyInstance.UpdateTaskStatus(DCTaskViewInfoDTO);
                        MyInstance.LoadHtml(DCTaskViewInfoDTO, LandingPageSelectedStatusTypeId);

                        CheckForNewUpdates();
                    }
                }
                else {
                    //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoDataForUpload'));
                    alert(xlatService.xlat('NoDataForUpload'));
                    OneViewConsole.Info("No dc available", "LandingPageBO.UploadDcAndAction");
                }
            }

            OneViewConsole.Debug("UploadDC end", "LandingPageBO.UploadDC");
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.UploadDC", Excep);
        }
        finally {
        }
    }

    var MakeDcFilterRequestForPlaceAndTemplate = function (oChild) {

        try {
            OneViewConsole.Debug("MakeDcFilterRequestForPlaceAndTemplate start", "LandingPageFacade.MakeDcFilterRequestForPlaceAndTemplate");

            var _oDcFilterParamRequest = new DcFilterParamRequest();
            _oDcFilterParamRequest.DcPlaceId = oChild.DCPlaceKeyId;
            _oDcFilterParamRequest.TemplateNodeId = oChild.TemplateKeyId;
            _oDcFilterParamRequest.SystemUserId = LoginUserId;
            _oDcFilterParamRequest.DcPlaceName = "";
            _oDcFilterParamRequest.IsSynchronized = false;
            _oDcFilterParamRequest.ApprovalStatus = false;

            OneViewConsole.Debug("MakeDcFilterRequestForPlaceAndTemplate end", "LandingPageFacade.MakeDcFilterRequestForPlaceAndTemplate");

            return _oDcFilterParamRequest;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.MakeDcFilterRequest", Excep);
        }
        finally {
        }
    }

    var MakeDcFilterRequestForPlaceGroupAndTemplate = function (oChild) {

        try {
            OneViewConsole.Debug("MakeDcFilterRequestForPlaceGroupAndTemplate start", "LandingPageFacade.MakeDcFilterRequestForPlaceGroupAndTemplate");

            var _oDcFilterParamRequest = new DcFilterParamRequest();
            _oDcFilterParamRequest.DcPlaceId = oChild.DCPlaceKeyId;
            _oDcFilterParamRequest.TemplateNodeId = oChild.TemplateKeyId;
            _oDcFilterParamRequest.SystemUserId = LoginUserId;
            _oDcFilterParamRequest.DcPlaceName = "";
            _oDcFilterParamRequest.IsSynchronized = false;
            _oDcFilterParamRequest.ApprovalStatus = false;
            _oDcFilterParamRequest.IsDCPlaceGroup = oChild.DCPlaceKeyElementIsGroup;
            _oDcFilterParamRequest.IsTemplateGroup = oChild.TemplateKeyElementIsGroup;
            _oDcFilterParamRequest.DCPlaceRCOType = oChild.DCPlaceRCOType;

            OneViewConsole.Debug("MakeDcFilterRequestForPlaceGroupAndTemplate end", "LandingPageFacade.MakeDcFilterRequestForPlaceGroupAndTemplate");

            return _oDcFilterParamRequest;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.MakeDcFilterRequestForPlaceGroupAndTemplate", Excep);
        }
        finally {
        }
    }

    var UploadDC = function (_oDcFilterParamRequest) {

        try {
            OneViewConsole.Debug("UploadDC start", "LandingPageFacade.UploadDC");

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

                        _oUploadBO.BatchUploadAdv(_oDcFilterParamRequest);
                        IsSuccess = true;
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

            OneViewConsole.Debug("UploadDC end", "LandingPageFacade.UploadDC");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.UploadDC", Excep);
        }
        finally {
        }
    }

    var ExcecuteGarbageCollector = function (TemplateId, DcPlaceId) {

        try {
            OneViewConsole.Debug("ExcecuteGarbageCollector start", "LandingPageFacade.ExcecuteGarbageCollector");

            var _oDcDeletion = new DcDeletion();
            _oDcDeletion.DeleteCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
            _oDcDeletion.DeleteInCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
            _oDcDeletion.DeleteInCompleteAndSyncedDataInDays(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);

            OneViewConsole.Debug("ExcecuteGarbageCollector end", "LandingPageFacade.ExcecuteGarbageCollector");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.UploadDC", Excep);
        }
        finally {
        }
    }

    var CheckForNewUpdates = function () {

        try {
            OneViewConsole.Debug("CheckForNewUpdates start", "LandingPageFacade.CheckForNewUpdates");

            var _oOneViewAppConfig = new OneViewAppConfig();
            _oOneViewAppConfig.CheckForNewUpdates('');

            OneViewConsole.Debug("CheckForNewUpdates end", "LandingPageFacade.CheckForNewUpdates");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.CheckForNewUpdates", Excep);
        }
        finally {
        }
    }

    this.IsProfileExist = function (oChild) {

        try {
            OneViewConsole.Debug("IsProfileExist start", "LandingPageBO.IsProfileExist");

            var IsProfileExist = false;
            
            var ProfileDetails = MyInstance.GetProfileDetails(oChild);

            if (ProfileDetails != null) {
                IsProfileExist = ProfileDetails.IsProfileValid;
            }

            OneViewConsole.Debug("IsProfileExist end", "LandingPageBO.IsProfileExist");
            
            return IsProfileExist;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.IsProfileExist", Excep);
        }
        finally {
        }
    }

    this.GetProfileDetails = function (oChild) {

        try {
            OneViewConsole.Debug("GetProfileDetails start", "LandingPageBO.GetProfileDetails");

            var ProfileDetails = null;

            var RequestParam = {
                "ServiceId": ServiceId,
                "UserId": LoginUserId,
                "TemplateNodeId": 0,
                "PlaceId": 0,
                "DcPlaceDimension": 0,
                "DCPlaceRCOType": 0,
                "StartDate": "",
                "EndDate": "",
            }

            RequestParam.PlaceId = oChild.DCPlaceKeyId;
            RequestParam.TemplateNodeId = oChild.TemplateKeyId;
            RequestParam.DcPlaceDimension = oChild.DCPlaceKeyDimension;
            RequestParam.DCPlaceRCOType = oChild.DCPlaceRCOType;

            if ($scope.MyAudit == "Today") {
                RequestParam.StartDate = _oDateTime.GetDate() + " " + "00:00:00";
                RequestParam.EndDate = _oDateTime.GetDate() + " " + "23:59:59";
            }

            if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

                ProfileDetails = _oDcProfileDAO.GetProfileDetails(RequestParam);               
            }
            else if (oChild.DCPlaceKeyElementIsGroup == true && oChild.TemplateKeyElementIsGroup == false) {

                ProfileDetails = _oDcProfileDAO.GetProfileDetailsByPlaceGroupId(RequestParam);                
            }

            OneViewConsole.Debug("GetProfileDetails end", "LandingPageBO.GetProfileDetails");

            return ProfileDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.GetProfileDetails", Excep);
        }
        finally {
        }
    }

    var GetHtml = function (DCTaskViewInfoDTO, StatusType) {

        try {
            OneViewConsole.Debug("GetHtml start", "LandingPageBO.GetHtml");

            var Html = "";

            if (DCTaskViewInfoDTO != null) {

                var DCTaskDTOList = DCTaskViewInfoDTO.DCTaskDTOList;

                for (var i = 0; i < DCTaskDTOList.length; i++) {

                    var ParentHtml = GetParentHtml(DCTaskDTOList[i].GroupName);
                    var ChildHtml = '';

                    for (var j = 0; j < DCTaskDTOList[i].DCTaskDetaillst.length; j++) {
                        
                        if (IsValidChild(DCTaskDTOList[i].DCTaskDetaillst[j], StatusType)) {

                            ChildHtml += GetChildHtml(DCTaskViewInfoDTO.LandingPageViewName, i, j, DCTaskDTOList[i].DCTaskDetaillst[j]);
                        }
                    }

                    if (ChildHtml != '') {
                        Html += ParentHtml + ChildHtml;
                    }
                }
            }

            OneViewConsole.Debug("GetHtml end", "LandingPageBO.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.GetHtml", Excep);
        }
        finally {
        }
    }

    var IsValidChild = function (oChild, StatusType) {

        try {
            OneViewConsole.Debug("IsValidChild start", "LandingPageBO.IsValidChild");

            var IsValidChild = false;
            var DCStatusInfo = oChild.DCStatusInfo;

            if (DCStatusInfo != null) {

                if (StatusType == 1) {

                    IsValidChild = true;
                }
                else if (StatusType == 2) {

                    if (DCStatusInfo.NotStartedCount == 0) {

                        IsValidChild = true;
                    }
                }
                else if (StatusType == 3) {

                    if (DCStatusInfo.InProgressCount > 0) {

                        IsValidChild = true;
                    }
                }
                else if (StatusType == 4) {

                    if (DCStatusInfo.MissedCount > 0) {

                        IsValidChild = true;
                    }
                }
                else if (StatusType == 5) {

                    if (DCStatusInfo.NotSyncedCount > 0) {

                        IsValidChild = true;
                    }
                }
                else if (StatusType == 6) {

                    if (DCStatusInfo.CompletedCount > 0) {

                        IsValidChild = true;
                    }
                }
                else if (StatusType == 7) {

                    if (DCStatusInfo.SyncedCount > 0) {

                        IsValidChild = true;
                    }
                }
                else if (StatusType == 8) {

                    if (DCStatusInfo.ApprovedCount > 0) {

                        IsValidChild = true;
                    }
                }
            }
            else {
                IsValidChild = true;
            }

            OneViewConsole.Debug("IsValidChild end", "LandingPageBO.IsValidChild");

            return IsValidChild;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.IsValidChild", Excep);
        }
        finally {
        }
    }

    var GetParentHtml = function (GroupName) {

        try {
            OneViewConsole.Debug("GetParentHtml start", "LandingPageBO.GetParentHtml");

            var Html = '<div class="item item-divider">' + GroupName + '</div>';

            OneViewConsole.Debug("GetParentHtml end", "LandingPageBO.GetParentHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.GetParentHtml", Excep);
        }
        finally {
        }
    }

    var GetChildHtml = function (LandingPageViewName, ParentIndex, ChildIndex, oChild) {

        try {
            OneViewConsole.Debug("GetChildHtml start", "LandingPageBO.GetChildHtml");

            var ProfileDetails = MyInstance.GetProfileDetails(oChild);

            var DownloadStatusHtml = ProfileDetails.IsProfileValid == true
                ? '<i class="icon icon-social13 synced-color"></i>'
                : '<i class="icon icon-social13 icon-disabled"></i>';                   

            var CompletedStatusHtml = ProfileDetails.IsProfileValid == true &&
                ((oChild.Occurence != -1 && oChild.DCStatusInfo.OverallCount > 0 && oChild.DCStatusInfo.NotStartedCount == 0 && oChild.DCStatusInfo.OverallCount == oChild.DCStatusInfo.CompletedCount) ||
                (oChild.Occurence == -1 && oChild.DCStatusInfo.OverallCount > 0 && oChild.DCStatusInfo.NotStartedCount == 0 && oChild.DCStatusInfo.OverallCount == oChild.DCStatusInfo.CompletedCount))
                ? '<i class="icon icon-checkmark"></i>'
                : '<i class="icon icon-checkmark icon-disabled"></i>';

            //var ApprovedStatusHtml = ProfileDetails.IsProfileValid == true
            //? '<i class="icon icon-thumb-up-outline-symbol"></i>' 
            //: '<i class="icon icon-thumb-up-outline-symbol icon-disabled"></i>';
            var ApprovedStatusHtml = '<i class="icon icon-thumb-up-outline-symbol icon-disabled"></i>';

            var UploadedStatusHtml = ProfileDetails.IsProfileValid == true &&
                ((oChild.DCStatusInfo.OverallCount > 0) && oChild.DCStatusInfo.OverallCount == oChild.DCStatusInfo.SyncedCount)
                ? '<i class="icon icon-arrow68"></i>'
                : '<i class="icon icon-arrow68 icon-disabled"></i>';

            var TaskStatus = oChild.Occurence == -1
                ? oChild.DCStatusInfo.OverallCount
                : oChild.DCStatusInfo.OverallCount + '/' + (oChild.DCStatusInfo.OverallCount + oChild.DCStatusInfo.NotStartedCount);
            var TaskStatusHtml = '<span class="badge badge-positive" style="margin-right:5px;">' + TaskStatus + '</span>'

            var TaskDetails = oChild.TaskDetails;

            if (TaskDetails == "") {
                TaskDetails = "&nbsp";
            }

            // If Icon not Exist for Task
            var TaskClassName = "item item-icon-right not-started-con";
            var IconHtml = '';

            // To Do : Need to replace with dynamic icon from task downloaded from server
            // If Icon Exist for Task
            //var TaskClassName = "item item-icon-left item-icon-right not-started-con";
            //var IconHtml = '<i class="icon icon-bluetooth-audio"></i>'; // Icon will come come task details (Dynamically)
            
            var Html = '<a class="' + TaskClassName + '" ng-click="TaskClick(\'' + LandingPageViewName + '\',' + ParentIndex + ',' + ChildIndex + ')">' +
                                IconHtml +
                                '<div class="row">' +
                                    '<div class="col col-80 no-padding no-margin">' +
                                        '<div class="heading">' + oChild.TaskHeader + '</div>' +
                                        '<div class="second-txt">' + TaskDetails + '</div>' +
                                    '</div>' +
                                    '<div class="col col-20 no-margin col-center no-padding text-right">' +                                       
                                        DownloadStatusHtml +
                                        CompletedStatusHtml +
                                        ApprovedStatusHtml +
                                        UploadedStatusHtml +
                                        TaskStatusHtml +
                                    '</div>' +
                                '</div>' +
                                '<i class="icon icon-ellipsis-v"></i>' +
                        '</a>';

            OneViewConsole.Debug("GetChildHtml end", "LandingPageBO.GetChildHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.GetChildHtml", Excep);
        }
        finally {
        }
    }

    this.UpdateTaskStatus_NewDC = function (IsCompleted) {

        try {
            OneViewConsole.Debug("UpdateTaskStatus_NewDC start", "LandingPageBO.UpdateTaskStatus_NewDC");

            var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

            if (LandingPageViewInfo != null) {

                LandingPageViewInfo = JSON.parse(LandingPageViewInfo);

                var LandingPageViewReponse = _oLandingPageViewReponseDAO.GetByServiceUserAndLandingPageViewName(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName);
                var DCTaskViewInfoDTO = null;

                if (LandingPageViewReponse.length > 0) {

                    if (LandingPageViewInfo.SelectedTab == "Past") {
                        DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponsePast);
                    }
                    if (LandingPageViewInfo.SelectedTab == "Today") {
                        DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseToday);
                    }
                    else {
                        DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseFuture);
                    }

                    if (DCTaskViewInfoDTO != null) {

                        //alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));

                        DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.OverallCount += 1;

                        if (DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotStartedCount > 0) {
                            DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotStartedCount -= 1;
                        }

                        DCTaskViewInfoDTO.OverallCount += 1;

                        if (DCTaskViewInfoDTO.NotStartedCount > 0) {
                            DCTaskViewInfoDTO.NotStartedCount -= 1;
                        }

                        if (IsCompleted == true) {

                            DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.CompletedCount += 1;

                            DCTaskViewInfoDTO.CompletedCount += 1;
                        }

                        else if (IsCompleted == false) {

                            DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.InProgressCount += 1;

                            DCTaskViewInfoDTO.InProgressCount += 1;
                        }

                        DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount += 1;
                        DCTaskViewInfoDTO.NotSyncedCount += 1;

                        if (LandingPageViewInfo.SelectedTab == "Today") {
                            _oLandingPageViewReponseDAO.UpdateLandingPageViewReponseToday(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName, JSON.stringify(DCTaskViewInfoDTO));
                        }

                        //alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));
                    }
                }
            }

            OneViewConsole.Debug("UpdateTaskStatus_NewDC end", "LandingPageBO.UpdateTaskStatus_NewDC");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.UpdateTaskStatus_NewDC", Excep);
        }
        finally {
        }
    }

    this.UpdateTaskStatus_EditDC = function (IsCompleted) {

        try {
            OneViewConsole.Debug("UpdateTaskStatus_EditDC start", "LandingPageBO.UpdateTaskStatus_EditDC");

            var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

            if (LandingPageViewInfo != null) {

                var IsDcCompletedBeforeEdit = OneViewSessionStorage.Get("IsDcCompletedBeforeEdit");
                var IsDcSynchronizedBeforeEdit = OneViewSessionStorage.Get("IsDcSynchronizedBeforeEdit");

                LandingPageViewInfo = JSON.parse(LandingPageViewInfo);

                var LandingPageViewReponse = _oLandingPageViewReponseDAO.GetByServiceUserAndLandingPageViewName(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName);
                var DCTaskViewInfoDTO = null;

                if (LandingPageViewReponse.length > 0) {

                    if (LandingPageViewInfo.SelectedTab == "Past") {
                        DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponsePast);
                    }
                    if (LandingPageViewInfo.SelectedTab == "Today") {
                        DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseToday);
                    }
                    else {
                        DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseFuture);
                    }

                    if (DCTaskViewInfoDTO != null) {

                        //alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));
                        //alert(IsCompleted + "," + IsDcCompletedBeforeEdit);

                        if (IsCompleted == true && IsDcCompletedBeforeEdit == "false") {

                            if (DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.InProgressCount > 0) {
                                DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.InProgressCount -= 1;
                            }

                            DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.CompletedCount += 1;
                            
                            if (DCTaskViewInfoDTO.InProgressCount > 0) {
                                DCTaskViewInfoDTO.InProgressCount -= 1;
                            }

                            DCTaskViewInfoDTO.CompletedCount += 1;
                        }

                        else if (IsCompleted == false && IsDcCompletedBeforeEdit == "true") {

                            if (DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.CompletedCount > 0) {
                                DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.CompletedCount -= 1;
                            }

                            DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.InProgressCount += 1;
                            
                            if (DCTaskViewInfoDTO.CompletedCount > 0) {
                                DCTaskViewInfoDTO.CompletedCount -= 1;
                            }

                            DCTaskViewInfoDTO.InProgressCount += 1;
                        }

                        if (IsDcSynchronizedBeforeEdit == "true") {

                            DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount += 1;

                            if (DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.SyncedCount > 0) {
                                DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.SyncedCount -= 1;
                            }

                            DCTaskViewInfoDTO.NotSyncedCount += 1;

                            if (DCTaskViewInfoDTO.SyncedCount > 0) {
                                DCTaskViewInfoDTO.SyncedCount -= 1;
                            }
                        }

                        if (LandingPageViewInfo.SelectedTab == "Today") {
                            _oLandingPageViewReponseDAO.UpdateLandingPageViewReponseToday(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName, JSON.stringify(DCTaskViewInfoDTO));
                        }

                        //alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));
                    }
                }
            }

            OneViewConsole.Debug("UpdateTaskStatus_EditDC end", "LandingPageBO.UpdateTaskStatus_EditDC");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.UpdateTaskStatus_EditDC", Excep);
        }
        finally {
        }
    }

    this.UpdateSyncStatus = function (oChild) {

        try {
            OneViewConsole.Debug("UpdateSyncStatus start", "LandingPageBO.UpdateSyncStatus");

            var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

            if (LandingPageViewInfo != null) {
             
                LandingPageViewInfo = JSON.parse(LandingPageViewInfo);

                var LandingPageViewReponse = _oLandingPageViewReponseDAO.GetByServiceUserAndLandingPageViewName(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName);
                var DCTaskViewInfoDTO = null;

                if (LandingPageViewReponse.length > 0) {

                    if (LandingPageViewInfo.SelectedTab == "Past") {
                        DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponsePast);
                    }
                    if (LandingPageViewInfo.SelectedTab == "Today") {
                        DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseToday);
                    }
                    else {
                        DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseFuture);
                    }

                    if (DCTaskViewInfoDTO != null) {

                        DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.SyncedCount += DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount;
                        DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount = 0;

                        DCTaskViewInfoDTO.SyncedCount += DCTaskViewInfoDTO.NotSyncedCount;
                        DCTaskViewInfoDTO.NotSyncedCount = 0;

                        if (LandingPageViewInfo.SelectedTab == "Today") {
                            _oLandingPageViewReponseDAO.UpdateLandingPageViewReponseToday(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName, JSON.stringify(DCTaskViewInfoDTO));
                        }
                    }
                }
            }

            OneViewConsole.Debug("UpdateSyncStatus end", "LandingPageBO.UpdateSyncStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.UpdateSyncStatus", Excep);
        }
        finally {
        }
    }
}

