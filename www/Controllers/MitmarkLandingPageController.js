

// MitmarkLandingPageController
MyApp.controller('MitmarkLandingPageController', function ($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote) {
   
    var _oMitmarkLandingPageFacade = new MitmarkLandingPageFacade($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote);

    _oMitmarkLandingPageFacade.Init();
    _oMitmarkLandingPageFacade.PageLoad();


    $scope.$on('$destroy', function () {
        _oMitmarkLandingPageFacade.Destroy();
    });

    $scope.TaskGroupClick = function (TemplateGroupId) {
        //alert('TaskGroupClick : ' + TemplateGroupId);
        _oMitmarkLandingPageFacade.TaskGroupClick(TemplateGroupId);
    }

    $scope.BulkDownload = function () {
        _oMitmarkLandingPageFacade.BulkDownload();
    }

    $scope.BulkUpload = function () {
        _oMitmarkLandingPageFacade.BulkUpload();
    }

});

// MitmarkLandingPageFacade
function MitmarkLandingPageFacade($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote) {

    var MyInstance = this;
    var _oDOM = new DOM();
    var _oDateTime = new DateTime();

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
    var _oMitmarkLandingPageConfigBO = new MitmarkLandingPageConfigBO(xlatService);
    var _oMitmarkLandingPageViewReponseBO = new MitmarkLandingPageViewReponseBO(xlatService);
    var _oMitmarkLandingPageBO = new MitmarkLandingPageBO($scope, $location, xlatService, $compile);
    var _oCloudManagerBO = new CloudManagerBO(xlatService);
    var DownloadedTGIdList = [];
    var DownloadedTemplateIdList = [];

    this.Destroy = function () {

        try {
            OneViewConsole.Debug("Destroy start", "MitmarkLandingPageFacade.Destroy");

            _oDOM.Hide('DivServiceDropdown');

            OneViewConsole.Debug("Destroy end", "MitmarkLandingPageFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkLandingPageFacade.Destroy", xlatService);
        }
    }

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "MitmarkLandingPageFacade.Init");
            
            xlatService.setCurrentPage('18');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
            $scope.SimpleStorageURL = oneViewGlobalVariables.SimpleStorageURL;
            
            OneViewConsole.Debug("Init end", "MitmarkLandingPageFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkLandingPageFacade.Init", xlatService);
        }
    }

    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "MitmarkLandingPageFacade.PageLoad");

            var IsExistMitmarkLandingPageConfig = MyInstance.Download();

            var _oDefaultMasterDAO = new DefaultMasterDAO("BusinessEventEntity");
            var IsExist = _oDefaultMasterDAO.IsTableExist();

            if (IsExist == true) {
                var _oBusinessEventFramework = new BusinessEventFramework();
                _oBusinessEventFramework.TriggerEvent("Dashboard", "PageLoad");
            }

            if (IsExistMitmarkLandingPageConfig != true) {
                $scope.NoDataAvailable = true;
                $scope.DataAvailable = false;
            }
            else {               
                $scope.NoDataAvailable = false;
                $scope.DataAvailable = true;
                oSetDefaultSpinner.Start();
                _oMitmarkLandingPageBO.LoadHtml(DownloadedTGIdList);
                oSetDefaultSpinner.Stop();
            }
           
            OneViewConsole.Debug("PageLoad end", "MitmarkLandingPageFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkLandingPageFacade.PageLoad", xlatService);
        }
    }


    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "DasboardBO.Download");

            var _DefaultMasterDAO = new DefaultMasterDAO("MitmarkLandingPageConfigEntity");
            var IsTableExist = _DefaultMasterDAO.IsTableExist();

            var IsExistMitmarkLandingPageConfig = false;

            if (IsTableExist == true) {
                //Step 1: Check MitmarkLandingPageConfig exists locally
                IsExistMitmarkLandingPageConfig = _oMitmarkLandingPageConfigBO.IsExistMitmarkLandingPageConfig(ServiceId, LoginUserId);
            }

            //alert('IsExistMitmarkLandingPageConfig : ' + IsExistMitmarkLandingPageConfig);
            if (IsExistMitmarkLandingPageConfig == false) {

                //Step 1: Download MitmarkLandingPageConfig
                IsExistMitmarkLandingPageConfig = _oMitmarkLandingPageConfigBO.Download();
                if (IsExistMitmarkLandingPageConfig == true) {
                    //Step 2: Get TemplateGroupIds from Mitmark Landing page config
                    DownloadedTGIdList = _oMitmarkLandingPageBO.GetTemplateGroupIds();//[3, 30]; //Take from db
                    //alert('DownloadedTGIdList 1 : ' + JSON.stringify(DownloadedTGIdList));
                    ////Step 3: Load Html/UI
                    //_oMitmarkLandingPageBO.LoadHtml(DownloadedTGIdList);
                    //Step 4: Download Tasks
                    _oMitmarkLandingPageViewReponseBO.Download(DownloadedTGIdList);
                    //Step 5: Get TemplateIds from MitmarkLandingPageViewReponseEntity
                    DownloadedTemplateIdList = _oMitmarkLandingPageBO.GetTemplateIds();
                    //alert('DownloadedTemplateIdList : ' + JSON.stringify(DownloadedTemplateIdList));
                    //Step 6: Profile Download
                    // MyInstance.DownloadProfile(DownloadedTemplateIdList);

                }
            }
            else {
                DownloadedTGIdList = _oMitmarkLandingPageBO.GetTemplateGroupIds();
                //alert('DownloadedTGIdList 2 : ' + JSON.stringify(DownloadedTGIdList));
                DownloadedTemplateIdList = _oMitmarkLandingPageBO.GetTemplateIds();
                //alert('2 DownloadedTemplateIdList : ' + JSON.stringify(DownloadedTemplateIdList));
            }

            OneViewConsole.Debug("Download end", "DasboardBO.Download");

            return IsExistMitmarkLandingPageConfig;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DasboardBO.Download", Excep);
        }
        finally {
        }
    }

    this.DownloadProfile = function (TemplateIdList) {
        try {
            OneViewConsole.Debug("DownloadProfile start", "MitmarkLandingPageFacade.DownloadProfile");

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

            if (NetworkStatus.IsNetworkAvailable == true) {
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
                    IsOnDeviceApprovalProfileNeeded: false,
                    DCPlaceRCOType: -1
                };

                FilterParams.TemplateId = TemplateIdList;
                //alert('FilterParams : ' + JSON.stringify(FilterParams));

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Download_confirm_Message'), function (ConfirmationId) {

                    if (ConfirmationId == "2") {
                        var _oProfileDownloadFacade = new ProfileDownloadFacade();
                        var IsSuccess = _oProfileDownloadFacade.DefaultProfiledownload(FilterParams, $scope, xlatService, '', '', $location);
                    }
                });
                //alert('IsSuccess : ' + IsSuccess);
            }
            else {
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No Internet Connection", "MitmarkLandingPageFacade.DownloadProfile");
            }
            OneViewConsole.Debug("DownloadProfile end", "MitmarkLandingPageFacade.DownloadProfile");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkLandingPageFacade.DownloadProfile", xlatService);
        }
    }

    this.TaskGroupClick = function (TemplateGroupId) {
        try {
            OneViewConsole.Debug("TaskGroupClick start", "MitmarkLandingPageFacade.TaskGroupClick");

            if (TemplateGroupId != undefined) {

                var IsValidProfiles = _oMitmarkLandingPageBO.ValidateDcProfileByUserTemplateListAndSchedule(TemplateGroupId);
                if (IsValidProfiles == true) {
                    OneViewSessionStorage.Save("TemplateGroupId", TemplateGroupId);
                    var URL = "/MitmarkTaskPage?TemplateGroupId=" + TemplateGroupId;
                    //alert('URL : ' + URL);
                    $location.url(URL);
                }
                else {
                    alert(xlatService.xlat('No Valid Profiles'));
                }
            }

            OneViewConsole.Debug("TaskGroupClick end", "MitmarkLandingPageFacade.TaskGroupClick");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkLandingPageFacade.TaskGroupClick", xlatService);
        }
    }

    this.LoadServices = function () {

        try {
            OneViewConsole.Debug("LoadServices start", "MitmarkLandingPageFacade.LoadServices");

            var CloudManagerResponse = _oCloudManagerBO.GetAllServicesByUserIdFromLocal();

            var OptionsHtml = '';

            for (var i = 0; i < CloudManagerResponse.ServicesLst.length; i++) {

                if (CloudManagerResponse.ServicesLst[i].Id == OneViewSessionStorage.Get("ServiceId")) {
                    OptionsHtml += '<option selected>' + CloudManagerResponse.ServicesLst[i].Name + '</option>';
                }
                else {
                    OptionsHtml += '<option>' + CloudManagerResponse.ServicesLst[i].Name + '</option>';
                }
            }

            _oDOM.AddInnerHtml('ServiceDropdown', OptionsHtml);

            if (CloudManagerResponse.ServicesLst.length > 1) {
                _oDOM.Show('DivServiceDropdown');
            }
            else {
                _oDOM.Hide('DivServiceDropdown');
            }

            OneViewConsole.Debug("LoadServices end", "MitmarkLandingPageFacade.LoadServices");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkLandingPageFacade.LoadServices", xlatService);
        }
    }

    this.ServiceChangeEvent = function ($location) {

        try {
            OneViewConsole.Debug("ServiceChangeEvent start", "MitmarkLandingPageFacade.ServiceChangeEvent");

            var CloudManagerResponse = _oCloudManagerBO.GetAllServicesByUserIdFromLocal();

            var ServiceInfo = {};

            var ServiceName = _oDOM.GetValue('ServiceDropdown');

            for (var i = 0; i < CloudManagerResponse.ServicesLst.length; i++) {

                if (CloudManagerResponse.ServicesLst[i].Name == ServiceName) {
                    ServiceInfo = CloudManagerResponse.ServicesLst[i];
                    break;
                }
            }

            UpdateCloudManagerUserServiceMapping(ServiceInfo);

            alert(xlatService.xlat('IN-SU-MDB-001 :: Service Changed successfully.Please login to Continue.'));
            $location.url('/login');

            OneViewSessionStorage.Clear();
            ClearGlobalVariable();

            $scope.$apply();

            OneViewConsole.Debug("ServiceChangeEvent end", "MitmarkLandingPageFacade.ServiceChangeEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkLandingPageFacade.ServiceChangeEvent", xlatService);
        }
    }

    var UpdateCloudManagerUserServiceMapping = function (ServiceInfo) {
        try {
            OneViewConsole.Debug("UpdateCloudManagerUserServiceMapping start", "MitmarkLandingPageFacade.UpdateCloudManagerUserServiceMapping");

            var UserId = OneViewSessionStorage.Get("LoginUserName");
            UserId = UserId.toLowerCase();

            var CloudManagerUserServiceMapping = {};

            if (OneViewLocalStorage.Get("CloudManagerUserServiceMapping") != null) {
                CloudManagerUserServiceMapping = JSON.parse(OneViewLocalStorage.Get("CloudManagerUserServiceMapping"));
            }

            if (CloudManagerUserServiceMapping[UserId] != undefined && ServiceInfo.Id != undefined && ServiceInfo.Name != undefined) {

                CloudManagerUserServiceMapping[UserId].DefautServiceId = ServiceInfo.Id;
                CloudManagerUserServiceMapping[UserId].DefautServiceName = ServiceInfo.Name;
            }

            OneViewLocalStorage.Save("CloudManagerUserServiceMapping", JSON.stringify(CloudManagerUserServiceMapping));

            OneViewConsole.Debug("UpdateCloudManagerUserServiceMapping end", "MitmarkLandingPageFacade.UpdateCloudManagerUserServiceMapping");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkLandingPageFacade.UpdateCloudManagerUserServiceMapping", xlatService);
        }
    }

    this.BulkDownload = function () {

        try {
            OneViewConsole.Debug("BulkDownload start", "MitmarkLandingPageFacade.BulkDownload");

            if (DownloadedTemplateIdList != null && DownloadedTemplateIdList.length > 0) {
                MyInstance.DownloadProfile(DownloadedTemplateIdList);
            }

            OneViewConsole.Debug("BulkDownload end", "MitmarkLandingPageFacade.BulkDownload");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Facade", "MitmarkLandingPageFacade.BulkDownload", Excep);
        }
        finally {
        }
    }

    this.BulkUpload = function () {

        try {
            OneViewConsole.Debug("BulkUpload start", "MitmarkLandingPageFacade.BulkUpload");

            // Network status checking
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

            if (NetworkStatus.IsNetworkAvailable == true) {
                //IsBulkUploadEnabled = true;
                //var _oOneViewAutoUploadPlugin = new OneViewAutoUploadPlugin();
                //_oOneViewAutoUploadPlugin.Start();
                var _oUploadBO = new UploadBO(xlatService, '');
                var UploadResponse = _oUploadBO.AutoUpload(true);
                //if (UploadResponse != undefined && (UploadResponse.IsSuccess == true && UploadResponse.DCCount > 0)) {
                
                //}
            }
            else {
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No internet connection", "LandingPageFacade.Upload");
            }

            OneViewConsole.Debug("BulkUpload end", "MitmarkLandingPageFacade.BulkUpload");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Facade", "MitmarkLandingPageFacade.BulkUpload", Excep);
        }
        finally {
        }
    }



}

function MitmarkLandingPageBO($scope,$location, xlatService, $compile) {

    var MyInstance = this;

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
    var _oMitmarkLandingPageConfigDAO = new MitmarkLandingPageConfigDAO();
    var _oMitmarkLandingPageViewReponseDAO = new MitmarkLandingPageViewReponseDAO();

    this.GetTemplateGroupIds = function () {

        try {
            OneViewConsole.Debug("GetTemplateGroupIds start", "MitmarkLandingPageBO.GetTemplateGroupIds");

            var MitmarkLandingPageConfigList = _oMitmarkLandingPageConfigDAO.GetTemplateGroupsByServiceAndUserId(ServiceId, LoginUserId);

            var TemplateGroupIdList = [];
            if (MitmarkLandingPageConfigList != null) {
                for (var i = 0; i < MitmarkLandingPageConfigList.length; i++) {
                    var Config = MitmarkLandingPageConfigList[i].MitmarkLandingPageConfig; 
                    Config = JSON.parse(Config);
                    for (var j = 0; j < Config.length;j++) {
                        TemplateGroupIdList.push(Config[j].Id);
                    }
                  
                }
            }

            OneViewConsole.Debug("GetTemplateGroupIds end", "MitmarkLandingPageBO.GetTemplateGroupIds");

            return TemplateGroupIdList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageBO.GetTemplateGroupIds", Excep);
        }
        finally {
        }
    }

    this.GetTemplateIds = function () {

        try {
            OneViewConsole.Debug("GetTemplateIds start", "MitmarkLandingPageBO.GetTemplateIds");

            var MitmarkLandingPageViewReponseList = _oMitmarkLandingPageViewReponseDAO.GetByServiceAndUserId(ServiceId, LoginUserId);
            
            var TemplateIdList = [];
            if (MitmarkLandingPageViewReponseList != null) {
                for (var i = 0; i < MitmarkLandingPageViewReponseList.length; i++) {
                    var LandingPageViewConfig = MitmarkLandingPageViewReponseList[i].LandingPageViewConfig;                    
                    LandingPageViewConfig = JSON.parse(LandingPageViewConfig);
                    for (var j = 0; j < LandingPageViewConfig.length; j++) {
                        TemplateIdList.push(LandingPageViewConfig[j].TemplateId);
                    }

                }
            }

            OneViewConsole.Debug("GetTemplateIds end", "MitmarkLandingPageBO.GetTemplateIds");
            
            return TemplateIdList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageBO.GetTemplateIds", Excep);
        }
        finally {
        }
    }

    this.LoadHtml = function (DownloadedTGIdList) {

        try {
            OneViewConsole.Debug("LoadHtml start", "MitmarkLandingPageBO.LoadHtml");

            var Html = MyInstance.GetHtml(DownloadedTGIdList);
            MyInstance.AppendHtml("TemplateGroupDivId", Html);

            OneViewConsole.Debug("LoadHtml end", "MitmarkLandingPageBO.LoadHtml");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageBO.LoadHtml", Excep);
        }
        finally {
        }
    }

    this.AppendHtml = function (Id, Html) {

        try {
            OneViewConsole.Debug("AppendHtml start", "MitmarkLandingPageBO.AppendHtml");

            if (Html != '') {
                var _oOneViewCompiler = new OneViewCompiler();
                _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, Id);
            }

            OneViewConsole.Debug("AppendHtml end", "MitmarkLandingPageBO.AppendHtml");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageBO.AppendHtml", Excep);
        }
        finally {
        }
    }

    this.GetHtml = function (DownloadedTGIdList) {

        try {
            OneViewConsole.Debug("GetHtml start", "MitmarkLandingPageBO.GetHtml");

            var Html = "";

            //Template Group Ids hard-coded as per Mitmark Client
            var CriminalTGList = [3, 30, 43, 49, 61];
            var NonCriminalTGList = [37, 55, 74, 80, 86, 92, 98, 104];
            var BusinessTGList = [68, 110, 116];
            
            var CriminalTGHtml = "";
            var NonCriminalTGHtml = "";
            var BusinessTGHtml = "";

            var Header1Html = '';
            var Header2Html = '';
            var Header3Html = '';
                        
            for (var i = 0; i < DownloadedTGIdList.length ; i++) {

                var TGId = DownloadedTGIdList[i];
                var TGHtml = '<div class="column1" ng-click="TaskGroupClick(' + TGId + ')">' +
                           '<a href="index.html"><img class="justify-image" src="{{SimpleStorageURL}}CustomHtmlAndCode/32/LandingPageImages/' + TGId + '.jpg" width="60%"></a>' +
                           '</div>';

                for (var j = 0; j < CriminalTGList.length ; j++) {
                    if (TGId == CriminalTGList[j]) {
                        Header1Html = '<p style="font-size:medium"><b>CRIMINAL / TERROR THREATS</b></p>';
                        CriminalTGHtml += TGHtml;
                    }
                }


                for (var j = 0; j < NonCriminalTGList.length ; j++) {
                    if (TGId == NonCriminalTGList[j]) {
                        Header2Html = '<p style="font-size:medium"><b>NON-CRIMINAL / NON-TERROR THREATS</b></p>';
                        NonCriminalTGHtml += TGHtml;
                    }
                }


                for (var j = 0; j < BusinessTGList.length ; j++) {
                    if (TGId == BusinessTGList[j]) {
                        Header3Html = '<p style="font-size:medium"><b>CONTINUITY OF BUSSINESS THREATS</b></p>';
                        BusinessTGHtml += TGHtml;
                    }
                }

            }
            
            //alert('Header1Html : ' + Header1Html);
            //alert('CriminalTGHtml : ' + CriminalTGHtml);
            //alert('Header2Html : ' + Header2Html);
            //alert('NonCriminalTGHtml : ' + NonCriminalTGHtml);
            //alert('Header3Html : ' + Header1Html);
            //alert('BusinessTGHtml : ' + BusinessTGHtml);

            Html = Header1Html + CriminalTGHtml + Header2Html + NonCriminalTGHtml + Header3Html + BusinessTGHtml;

            //alert('Html : ' + Html);
            OneViewConsole.Debug("GetHtml end", "MitmarkLandingPageBO.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageBO.GetHtml", Excep);
        }
        finally {
        }
    }

    this.GetMitmarkLandingPageViewReponseConfig = function (TemplateGroupId) {

        try {
            OneViewConsole.Debug("GetMitmarkLandingPageViewReponseConfig start", "MitmarkLandingPageBO.GetMitmarkLandingPageViewReponseConfig");

            var LandingPageViewConfig = [];
            var MitmarkLandingPageViewReponse = _oMitmarkLandingPageViewReponseDAO.GetByServiceUserAndTemplateGroup(ServiceId, LoginUserId, TemplateGroupId);
            if (MitmarkLandingPageViewReponse != null) {                
                LandingPageViewConfig = MitmarkLandingPageViewReponse[0].LandingPageViewConfig;
                LandingPageViewConfig = JSON.parse(LandingPageViewConfig);
            }

            OneViewConsole.Debug("GetMitmarkLandingPageViewReponseConfig end", "MitmarkLandingPageBO.GetMitmarkLandingPageViewReponseConfig");

            return LandingPageViewConfig;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageBO.GetMitmarkLandingPageViewReponseConfig", Excep);
        }
        finally {
        }
    }

    this.ValidateDcProfileByUserTemplateListAndSchedule = function (TemplateGroupId) {

        try {
            OneViewConsole.Debug("ValidateDcProfileByUserTemplateListAndSchedule start", "MitmarkLandingPageBO.ValidateDcProfileByUserTemplateListAndSchedule");

            var IsSuccess = false;
            var oDateTime = new DateTime();
            var DCDateTime = oDateTime.GetDateAndTime(); // CurrentDateTime : (dd-mm-yyyy hh:mm:ss)
            DCDateTime = oDateTime.ConvertDateTimeToInteger(DCDateTime);
            
            var MitmarkLandingPageViewReponseList = _oMitmarkLandingPageViewReponseDAO.GetByServiceAndUserId(ServiceId, LoginUserId);

            var TemplateIdList = [];
            if (MitmarkLandingPageViewReponseList != null) {
                for (var i = 0; i < MitmarkLandingPageViewReponseList.length; i++) {
                    if (MitmarkLandingPageViewReponseList[i].TemplateGroupId == TemplateGroupId) {
                        var LandingPageViewConfig = MitmarkLandingPageViewReponseList[i].LandingPageViewConfig;
                        LandingPageViewConfig = JSON.parse(LandingPageViewConfig);
                        for (var j = 0; j < LandingPageViewConfig.length; j++) {
                            TemplateIdList.push(LandingPageViewConfig[j].TemplateId);
                        }

                        break;
                    }
                }
            }

            var DcProfileDetails = new DcDAO().GetUserDcProfileByTemplateListAndSchedule(ServiceId, LoginUserId, DCDateTime, TemplateIdList);
            //alert('DcProfileDetails : ' + JSON.stringify(DcProfileDetails));

            if (DcProfileDetails != null && DcProfileDetails.length > 0) {
                IsSuccess = true;
            }

            OneViewConsole.Debug("ValidateDcProfileByUserTemplateListAndSchedule end", "MitmarkLandingPageBO.ValidateDcProfileByUserTemplateListAndSchedule");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkLandingPageBO.ValidateDcProfileByUserTemplateListAndSchedule", Excep);
        }
        finally {
        }
    }
}

