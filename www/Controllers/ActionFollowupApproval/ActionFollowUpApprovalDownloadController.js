
// ############################################################################################################## //

// Created User : Sangeeta Bhatt
// Created Date : 16-08-2018 16:04

// Last Updated User : 
// Last Updated Date : 

// Note : Any updation or changes required, Need to discuss with created user or last updated user or full team

// ############################################################################################################## //


    // Dont change / remove below variables
    var ActionFollowUpApprovalProfiles = [];

    // ActionFollowUpDownloadPageConfiguration for displaying content element
    var ActionFollowUpDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };

    // Controller
    MyApp.controller('ActionFollowUpApprovalDownloadController', function ($scope, $timeout, xlatService, $location, $routeSegment) {


        var IsNavigate = false;
        var Url;

        ////////////////*********************** Validation for Internet checking before going to ActionFollowUpDownload page when any profile are there only************************ START///////////////////////////
        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
        var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

        // If network is available
        if (NetworkDetails.IsNetworkAvailable == true) {
            IsNavigate = true;
        }
        else {
            //alert('Notification : ' + OneViewGlobalization[CurrentLanguage].NoInternetConnection);
            var MessageKey = 'Notification : ' + OneViewGlobalization[CurrentLanguage].NoInternetConnection;
            Url = '/notifycall?MessageKey=' + MessageKey + '';
        }

        ////////////////*********************** Validation for Internet checking before going to ActionFollowUpDownload page when any profile are there only************************ END///////////////////////////


        
        if (IsNavigate == true) {
            $scope.$routeSegment = $routeSegment;


            //oSetDefaultSpinner.Start();

            var oActionFollowUpApprovalDownloadFacade = new ActionFollowUpApprovalDownloadFacade();

            // Initialize page 
            oActionFollowUpApprovalDownloadFacade.Init($scope, xlatService);

            // Page load
            oActionFollowUpApprovalDownloadFacade.PageLoad($scope, $timeout, xlatService, '', '');

        }

        else {
            $location.url(Url);
        }

        DownloadFilter = function () {
            ToggleSidePanel();
        }

        //oSetDefaultSpinner.Stop();
        
        /// <summary>
        /// This method is under construction 
        /// </summary>
        $scope.onFacilitylistItemChanged = function (item) {
            
            for (var i = 0; i < $scope.Selectedfacilitys.length; i++){
                var Facility = $scope.Selectedfacilitys[i];
                if (Facility.Id == item.Id) {
                    Facility.selected = !(item.selected);
                }
            }           
        };
        
        /// <summary>
        /// Select all contents event registration
        /// </summary>
        $scope.SelectAllContents = function () {

            var _oProfileDownloadFacade = new ActionFollowUpApprovalDownloadFacade();
            _oProfileDownloadFacade.SelectAllContents($scope, '', xlatService);
        };

        /// <summary>
        /// Profile download event registration
        /// </summary>
        $scope.DownLoad = function () {
            var oActionFollowUpApprovalDownloadFacade = new ActionFollowUpApprovalDownloadFacade();
            oActionFollowUpApprovalDownloadFacade.DownLoad($scope, xlatService, '', '', $location);           
        };


        /// <summary>
        /// GraphSearch event registration
        /// </summary>
        $scope.GraphSearch = function () {
            var oActionFollowUpApprovalDownloadFacade = new ActionFollowUpApprovalDownloadFacade();
            oActionFollowUpApprovalDownloadFacade.GraphSearch($scope, $scope.GraphSearchElement);
        }

        /// <summary>
        /// Change Dimension
        /// </summary>
        $scope.ChangeDimension = function () {
            var oActionFollowUpApprovalDownloadFacade = new ActionFollowUpApprovalDownloadFacade();
            oActionFollowUpApprovalDownloadFacade.ChangeDimension($scope, $timeout, xlatService, '', '');
        }

        $scope.$on('$destroy', function () {
            $scope.Dimension = "Template";
            ActionFollowUpDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };
        });
     
    })

    // Facade (Assembler code / Work flow code)
    function ActionFollowUpApprovalDownloadFacade() {

        // ActionFollowUpApprovalDownloadFacade object
        var MyInstance = this;


        /// <summary>
        /// Select all contents
        /// </summary>
        /// <param name="$scope">Current scope</param>   
        /// <param name="xlatService">xlatService for globalization</param>
        this.Init = function ($scope, xlatService) {
            try {
                OneViewConsole.Debug("Init start", "ActionFollowUpApprovalDownloadFacade.Init");

                // Registering page name for globalization
                xlatService.setCurrentPage('20');
                document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
                
                $scope.UnitList = [];
                $scope.AirlineList = [];

                //if (IsGlobalCleaningProfiledownloadView == true) {
                //    $scope.Dimension = "Template";
                //    ActionFollowUpDownloadPageConfiguration = { 'ContentElement': "DcPlace" };
                //    $scope.ImmediateParentColumn = true;
                //    $scope.FilterDropdown2 = "Section";
                //}
                //else {
                //    $scope.Dimension = "Place";
                //    ActionFollowUpDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };
                //    $scope.ImmediateParentColumn = false;
                //    $scope.FilterDropdown2 = "Airline";
                //}

                $scope.FilterDropdown1 = xlatService.xlat('FilterDropdown1');

                //$scope.Dimension = "Place";
                //ActionFollowUpDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };

                $scope.Dimension = "Template";
                ActionFollowUpDownloadPageConfiguration = { 'ContentElement': "DcPlace" };

                $scope.ImmediateParentColumn = false;
                $scope.FilterDropdown2 = xlatService.xlat('FilterDropdown2');

                OneViewConsole.Debug("Init end", "ActionFollowUpApprovalDownloadFacade.Init");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalDownloadFacade.Init", xlatService);
            }
        }


        /// <summary>
        /// Select all contents
        /// </summary>
        /// <param name="$scope">Current scope</param>   
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="toaster">toaster for toast messages</param>
        /// <param name="SpinService">SpinService for loader</param>
        this.PageLoad = function ($scope, $timeout, xlatService, toaster, SpinService) {           
            try {
                OneViewConsole.Debug("PageLoad start", "ActionFollowUpApprovalDownloadFacade.PageLoad");
                
                var IsLoadView = true;
                var _oActionFollowUpApprovalDownloadPresenter = new ActionFollowUpApprovalDownloadPresenter();
                _oActionFollowUpApprovalDownloadPresenter.PageLoad($scope, $timeout, xlatService, toaster, SpinService);
              
                $scope.Selectedfacilitys = [];

                if (ActionFollowUpDownloadPageConfiguration.ContentElement == "TemplateNode") {
                    LoadTemplateContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService);
                }
                    //Load all Dc places if Content element is Dc place
                else {                   
                    LoadPlaceContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService);                 
                }

                OneViewConsole.Debug("PageLoad end", "ActionFollowUpApprovalDownloadFacade.PageLoad");
                return IsLoadView;
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalDownloadFacade.PageLoad", xlatService);
            }
        }

        /// <summary>
        /// Select all contents
        /// </summary>
        /// <param name="$scope">Current scope</param>   
        /// <param name="SpinService">SpinService for loader</param>
        this.SelectAllContents = function ($scope, SpinService, xlatService) {
            try {
                OneViewConsole.Debug("SelectAllContents start", "ActionFollowUpApprovalDownloadFacade.SelectAllContents");

                var _oActionFollowUpApprovalDownloadPresenter = new ActionFollowUpApprovalDownloadPresenter();
                _oActionFollowUpApprovalDownloadPresenter.SelectAllContents($scope);

                OneViewConsole.Debug("SelectAllContents end", "ActionFollowUpApprovalDownloadFacade.SelectAllContents");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalDownloadFacade.SelectAllContents", xlatService);
            }

        }

    
        /// <summary>
        /// Download the selected profiles by login user
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="toaster">toaster for toast messages</param>
        /// <param name="SpinService">SpinService for loader</param>
        this.DownLoad = function ($scope, xlatService, toaster, SpinService, $location) {
            try {
                OneViewConsole.Debug("DownLoad start", "ActionFollowUpApprovalDownloadFacade.DownLoad");

                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpApprovalDownloadFacade.DownLoad");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    //selected contents 
                    var FilterParams = NormalizeDownloadDataReqParm($scope.Selectedfacilitys, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"));

                    //If selected content elements are template nodes
                    if (ActionFollowUpDownloadPageConfiguration.ContentElement == "TemplateNode") {

                        if (FilterParams.TemplateId.length > 0) {

                            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                            oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Download_confirm_Title'), xlatService.xlat('Download_confirm_Message'), function (ConfirmationId) {

                                if (ConfirmationId == "2") {
                                    DefaultProfiledownload(FilterParams, $scope, xlatService, toaster, SpinService, $location);
                                }
                            });
                        }
                        else {
                            navigator.notification.alert(xlatService.xlat('NoTemplatesSelected'), ['OK'], "");
                            // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoTemplatesSelected'));
                        }
                    }
                    //If selected content elements are Dc places
                    else {

                        if (FilterParams.DcPlaceIds.length > 0) {

                            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                            oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Download_confirm_Title'), xlatService.xlat('Download_confirm_Message'), function (ConfirmationId) {

                                if (ConfirmationId == "2") {
                                    DefaultProfiledownload(FilterParams, $scope, xlatService, toaster, SpinService, $location);
                                }
                            });
                        }
                        else {
                            //navigator.notification.alert(xlatService.xlat('NoPlacesSelected'), ['OK'], "");
							navigator.notification.alert(xlatService.xlat('NoPlacesSelected'), ['OK'], "");
                        }
                    }
                }
                else {
                    navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");                   
                    OneViewConsole.Info("No Internet Connection", "ActionFollowUpApprovalDownloadFacade.DownLoadProfile");
                }

                OneViewConsole.Debug("DownLoad end", "ActionFollowUpApprovalDownloadFacade.DownLoad");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalDownloadFacade.DownLoad", xlatService);
            }
        }


        /// <summary>
        /// DefaultProfiledownload
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="toaster">toaster for toast messages</param>
        /// <param name="SpinService">SpinService for loader</param>
        this.DefaultProfiledownload = function (FilterParams, xlatService) {

            try {
                var _oActionFollowUpApprovalDownloadPresenter = new ActionFollowUpApprovalDownloadPresenter();
                var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

                var IsActionFollowUpApprovalProfileSuccess = false;
                var IsRollBack = false;

                try {
                    OneViewConsole.Debug("DefaultProfiledownload transaction start", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");

                    _oOneViewSqlitePlugin.StartTransaction();

                    IsActionFollowUpApprovalProfileSuccess = DownloadActionFollowUpApprovalProfile(FilterParams, xlatService, false);
                    //alert('IsActionFollowUpApprovalProfileSuccess : ' + IsActionFollowUpApprovalProfileSuccess);
                   
                    if (IsActionFollowUpApprovalProfileSuccess == null) {
                        
                        OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                        _oOneViewSqlitePlugin.Rollback();
                        OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                    }
                    else {
                        if (IsActionFollowUpApprovalProfileSuccess == false) {

                            OneViewConsole.Debug("IsActionFollowUpInfo Success : " + IsActionFollowUpApprovalProfileSuccess, "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");

                            OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                            _oOneViewSqlitePlugin.Rollback();
                            OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");

                            IsRollBack = true;
                        }

                        if (IsRollBack == false) {
                            _oOneViewSqlitePlugin.EndTransaction();
                            OneViewConsole.Debug("DefaultProfiledownload transaction commit", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                        }
                    }
                }
                catch (Excep) {                  
                    OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                    _oOneViewSqlitePlugin.Rollback();
                    OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                }
            }
            catch (Excep) {                
            }
        }


        /// <summary>
        /// DefaultProfiledownload
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="toaster">toaster for toast messages</param>
        /// <param name="SpinService">SpinService for loader</param>
        var DefaultProfiledownload = function (FilterParams, $scope, xlatService, toaster, SpinService, $location) {

            try{
                var _oActionFollowUpApprovalDownloadPresenter = new ActionFollowUpApprovalDownloadPresenter();
                var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

                oOneViewProgressbar.Start("Downloading");
                oOneViewProgressbar.SetProgressValue(5);

                var IsActionFollowUpApprovalProfileSuccess = false;
                var IsRollBack = false;

                try {
                    OneViewConsole.Debug("DefaultProfiledownload transaction start", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");

                    _oOneViewSqlitePlugin.StartTransaction();
                    oOneViewProgressbar.SetProgressValue(10);

                    IsActionFollowUpApprovalProfileSuccess = DownloadActionFollowUpApprovalProfile(FilterParams, xlatService, true);

                   
                    //alert('IsActionFollowUpApprovalProfileSuccess : ' + IsActionFollowUpApprovalProfileSuccess);

                    if (IsActionFollowUpApprovalProfileSuccess == null) {
                        oOneViewProgressbar.Stop();

                        _oActionFollowUpApprovalDownloadPresenter.ShowDownloadFailed(xlatService);

                        OneViewConsole.Debug("IsActionFollowUpApprovalProfile Success : " + IsActionFollowUpApprovalProfileSuccess, "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");


                        OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                        _oOneViewSqlitePlugin.Rollback();
                        OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");

                    }
                    else {
                     
                        if (IsActionFollowUpApprovalProfileSuccess == null) {
                            oOneViewProgressbar.Stop();

                            OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                            _oOneViewSqlitePlugin.Rollback();
                            OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                        }
                        else {
                            if (IsActionFollowUpApprovalProfileSuccess == true) {
                                                            
                                // SetLastResetDate();
                                UpdateDownloadStatus($scope, FilterParams);

                                oOneViewProgressbar.SetProgressValue(100);
                                oOneViewProgressbar.Stop();

                                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                                oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Navigate_confirm_Message'), function (ConfirmationId) {

                                    if (ConfirmationId == "2") {
                                        $location.url('/ActionFollowupApprovalPlaceSelection');
                                        $scope.$apply();
                                    }
                                    else {
                                        $scope.$apply();
                                    }
                                });
                            }
                            else {
                                oOneViewProgressbar.Stop();
                                _oActionFollowUpApprovalDownloadPresenter.ShowDownloadFailed(xlatService);

                                OneViewConsole.Debug("IsActionFollowUpApprovalProfileSuccess Success : " + IsActionFollowUpApprovalProfileSuccess, "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");

                                OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                                _oOneViewSqlitePlugin.Rollback();
                                OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");

                                IsRollBack = true;
                            }

                            if (IsRollBack == false) {
                                _oOneViewSqlitePlugin.EndTransaction();
                                OneViewConsole.Debug("DefaultProfiledownload transaction commit", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                            }

                            $scope.$apply();
                        }

                        oOneViewProgressbar.Stop();
                    }

                }
                catch (Excep) {
                    oOneViewProgressbar.Stop();
                    _oActionFollowUpApprovalDownloadPresenter.ShowDownloadFailed(xlatService);

                    OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                    _oOneViewSqlitePlugin.Rollback();
                    OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload");
                }
            }
            catch (Excep) {               
                throw oOneViewExceptionHandler.Create("Facade", "ActionFollowUpApprovalDownloadFacade.DefaultProfiledownload", Excep);
            }
        }


        /// <summary>
        /// Graph Search
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="GraphSearchElement">Graph Search Element</param>
        this.GraphSearch = function ($scope, GraphSearchElement) {

            $scope.Selectedfacilitys = [];

            if (GraphSearchElement != "") {

                GraphSearchElement = GraphSearchElement.split(" ");

                var SearchedProfilesIndex = 0;
                var SearchedProfiles = new Array();

                for (var i = 0; i < ActionFollowUpApprovalProfiles.length; i++) {

                    var IsSuccess = IsSearchElementsExist(ActionFollowUpApprovalProfiles[i].label, GraphSearchElement);
                   
                    if (IsSuccess == true) {
                        SearchedProfiles[SearchedProfilesIndex] = ActionFollowUpApprovalProfiles[i];
                        SearchedProfilesIndex += 1;
                    }
                }

                $scope.Selectedfacilitys = SearchedProfiles;
            }
            else {
                $scope.Selectedfacilitys = ActionFollowUpApprovalProfiles;
            }
        }


        /// <summary>
        /// Change Dimension (Templatewise or Placewise)
        /// </summary>
        /// <param name="$scope">Current scope</param>   
        /// <param name="xlatService">xlatService for globalization</param>
        /// <param name="toaster">toaster for toast messages</param>
        /// <param name="SpinService">SpinService for loader</param>
        this.ChangeDimension = function ($scope, $timeout, xlatService, toaster, SpinService) {

            try {
                oSetDefaultSpinner.Start();

                if ($scope.Dimension == "Place") {
                    $scope.Dimension = "Template";
                    ActionFollowUpDownloadPageConfiguration = { 'ContentElement': "DcPlace" };
                    //$scope.ImmediateParentColumn = true;
                }
                else {
                    $scope.Dimension = "Place";
                    ActionFollowUpDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };
                    //$scope.ImmediateParentColumn = false;
                }

                $scope.GraphSearchElement = "";


                var IsLoadView = MyInstance.PageLoad($scope, $timeout, xlatService, toaster, SpinService);


                if ($scope.Dimension == "Template") {
                    if (IsLoadView == true) {
                        $scope.ImmediateParentColumn = true;
                    }
                    else {
                        $scope.ImmediateParentColumn = false;
                        //navigator.notification.alert(xlatService.xlat('NoProfiles'), ['OK'], "");
                    }
                }
                else {                  
                    $scope.ImmediateParentColumn = false;
                }

                if (IsGlobalCleaningProfiledownloadView == true) {                    
                    $scope.FilterDropdown2 = xlatService.xlat('FilterDropdown2');;
                }
                else {                    
                    $scope.FilterDropdown2 = xlatService.xlat('FilterDropdown2');;
                }

                oSetDefaultSpinner.Stop();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalDownloadFacade.ChangeDimension", xlatService);
            }
        }


        /// <summary>
        /// Search Elements Exist or not
        /// </summary>
        /// <param name="SourceKey">Source Key</param>
        /// <param name="SearchKeys">Search Keys</param>
        var IsSearchElementsExist = function (SourceKey, SearchKeys) {

            try {                
                var IsSuccess = true;

                SourceKey = SourceKey.toLowerCase();

                for (var i = 0; i < SearchKeys.length; i++) {
                    if (SourceKey.indexOf(SearchKeys[i].toLowerCase()) == -1) {
                        IsSuccess = false;
                        break;
                    }
                }
               
                return IsSuccess;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Facade", "ActionFollowUpApprovalDownloadFacade.IsSearchElementsExist", Excep);
            }
        }


        /// <summary>
        /// Update the download status for icon (black to orange)
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="DownloadList">Downloaded profiles list</param>
        var UpdateDownloadStatus = function ($scope, DownloadList) {

            try{
                for (var i = 0; i < DownloadList.TemplateId.length; i++) {
                    for (j = 0; j < $scope.Selectedfacilitys.length; j++){
                        if (DownloadList.TemplateId[i] == $scope.Selectedfacilitys[j].Id) {
                            $scope.Selectedfacilitys[j].downloaded = true;
                            $scope.Selectedfacilitys[j].selected = false;
                        }
                    }
                }
                for (var i = 0; i < DownloadList.DcPlaceIds.length; i++) {
                    for (j = 0; j < $scope.Selectedfacilitys.length; j++) {
                        if (DownloadList.DcPlaceIds[i] == $scope.Selectedfacilitys[j].Id) {
                            $scope.Selectedfacilitys[j].downloaded = true;
                            $scope.Selectedfacilitys[j].selected = false;
                        }
                    }
                }
            }
            catch (Excep) {               
                throw Excep;
            }
        }


        /// <summary>
        /// API for SetLastResetDate
        /// </summary>
        var SetLastResetDate = function () {
            try
            {
                OneViewConsole.Debug("SetLastResetDate start", "ActionFollowUpApprovalDownloadFacade.SetLastResetDate");

                if (OneViewLocalStorage.Get("LastResetDate") == null) {
                    var oDateTime = new DateTime();
                    var CurrentDate = oDateTime.GetDate();
                    OneViewLocalStorage.Save("LastResetDate", CurrentDate);
                }

                OneViewConsole.Debug("SetLastResetDate end", "ActionFollowUpApprovalDownloadFacade.SetLastResetDate");

            }
            catch (Excep) {
                throw Excep;
            }
        }


        /// <summary>
        /// Content loading based on profile download page configuration
        /// TODO (Siva , 24-07-2014) 1.) Need to change page setting( how to display) 2.) Presenter code need to be change
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="UserId">User id</param>
        /// <param name="ServiceId">Server id</param>        
        var LoadTemplateContentBlock = function ($scope, UserId, ServiceId, SpinService, toaster, xlatService) {
            try {
                OneViewConsole.Debug("LoadTemplateContentBlock start", "ActionFollowUpApprovalDownloadFacade.LoadTemplateContentBlock");

                ActionFollowUpApprovalProfiles = [];

                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpApprovalDownloadFacade.LoadTemplateContentBlock");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    var UserProfileViewLst = "";
                    $scope.Selectedfacilitys = [];                   
                    var _oActionFollowUpApprovalDownloadDAO = new ActionFollowUpApprovalDownloadDAO();

                    //Load all template nodes      
                    UserProfileViewLst = new ActionFollowUpApprovalDownloadIL(toaster).GetProfileTemplateView(ServiceId, UserId);             
                    
                    //Adding user profile list datas into selected facilitys array list
                    if (UserProfileViewLst != null) {

                        UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));   
                        
                        if (UserProfileViewLst.length > 0) {
                            for (r = 0; r < UserProfileViewLst.length; r++) {
                                var IsDownloaded = false;                                
                                IsDownloaded = _oActionFollowUpApprovalDownloadDAO.IsTemplateExist(ServiceId, UserId, UserProfileViewLst[r].Id);
                               
                                //$scope.Selectedfacilitys.push({ label: UserProfileViewLst[r].Name, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
                                ActionFollowUpApprovalProfiles.push({ label: UserProfileViewLst[r].Name, ActionCount: UserProfileViewLst[r].ActionCount, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
                                $scope.Selectedfacilitys = ActionFollowUpApprovalProfiles;
                            }
                        }
                        else {
                            // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoProfiles'));
                            navigator.notification.alert(xlatService.xlat('NoProfiles'), ['OK'], "");
                            OneViewConsole.Info("NoProfiles", "ActionFollowUpApprovalDownloadFacade.LoadTemplateContentBlock");
                        }
                    }
                }
                    //If internet connection is not available
                else {

                    // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                    navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                    OneViewConsole.Info("No Internet Connection", "ActionFollowUpApprovalDownloadFacade.LoadTemplateContentBlock");
                }

                OneViewConsole.Debug("LoadTemplateContentBlock end", "ActionFollowUpApprovalDownloadFacade.LoadTemplateContentBlock");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        /// <summary>
        /// Content loading based on profile download page configuration
        /// TODO (Siva , 24-07-2014) 1.) Need to change page setting( how to display) 2.) Presenter code need to be change
        /// </summary>
        /// <param name="$scope">Current scope</param>
        /// <param name="UserId">User id</param>
        /// <param name="ServiceId">Server id</param>        
        //var LoadPlaceContentBlock = function ($scope, UserId, ServiceId, SpinService, toaster, xlatService, ParentNodeId) {
        var LoadPlaceContentBlock = function ($scope, UserId, ServiceId, SpinService, toaster, xlatService) {
            try {
                OneViewConsole.Debug("LoadPlaceContentBlock start", "ActionFollowUpApprovalDownloadFacade.LoadPlaceContentBlock");

                ActionFollowUpApprovalProfiles = [];

                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpApprovalDownloadFacade.LoadPlaceContentBlock");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {
                    
                    var UserProfileViewLst = "";
                    $scope.Selectedfacilitys = [];                    
                    var _oActionFollowUpApprovalDownloadDAO = new ActionFollowUpApprovalDownloadDAO();
                
                    //UserProfileViewLst = new ActionFollowUpApprovalDownloadIL(toaster).GetProfileDcPlaceView(ServiceId, UserId, ParentNodeId, (IsGlobalCleaningProfiledownloadView == true) ? DATEntityType.RCOMaster_CleaningType : DATEntityType.RCOMaster_Flight);
                    UserProfileViewLst = new ActionFollowUpApprovalDownloadIL(toaster).GetProfileDcPlaceView(ServiceId, UserId);
                  
                    //Adding user profile list datas into selected facilitys array list
                    if (UserProfileViewLst != null) {

                        UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                        if (UserProfileViewLst.length > 0) {
                            for (r = 0; r < UserProfileViewLst.length; r++) {
                                var IsDownloaded = false;                                
                                IsDownloaded = _oActionFollowUpApprovalDownloadDAO.IsPlaceExist(ServiceId, UserId, UserProfileViewLst[r].Id);
                                
                                //$scope.Selectedfacilitys.push({ label: UserProfileViewLst[r].Name, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
                                ActionFollowUpApprovalProfiles.push({ label: UserProfileViewLst[r].Name, ActionCount: UserProfileViewLst[r].ActionCount, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
                                $scope.Selectedfacilitys = ActionFollowUpApprovalProfiles;
                            }
                        }
                        else {
                            // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoProfiles'));
                            //navigator.notification.alert(xlatService.xlat('NoProfiles'), ['OK'], "");
                            alert(xlatService.xlat('No Places available'));
                            OneViewConsole.Info("NoProfiles", "ActionFollowUpApprovalDownloadFacade.LoadPlaceContentBlock");
                        }
                    }
                }
                    //If internet connection is not available
                else {

                    // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                    navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                    OneViewConsole.Info("No Internet Connection", "ActionFollowUpApprovalDownloadFacade.LoadPlaceContentBlock");
                }

                OneViewConsole.Debug("LoadPlaceContentBlock end", "ActionFollowUpApprovalDownloadFacade.LoadPlaceContentBlock");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        /// <summary>
        /// Request parameter for advance profile download (with filter parameters)
        /// </summary>
        /// <param name="DcDownloadList">Filter parameters</param>
        /// <param name="UserId">User id</param>
        /// <param name="ServiceId">Service id</param>
        /// <returns>Request param for profile download</returns>     
        var NormalizeDownloadDataReqParm = function (DcDownloadList, UserId, ServiceId) {
            try {
                OneViewConsole.Debug("NormalizeDownloadDataReqParm start", "ActionFollowUpApprovalDownloadFacade.NormalizeDownloadDataReqParm");

                var filterList = [];

                var reqParm = { OSGuid: ServiceId, UserId: UserId, TemplateId: '', FromDate: '', ToDate: '', DcPlaceDimension: 16, DcPlaceIds: '' };

                for (i = 0; i < DcDownloadList.length ; i++) {
                    if (DcDownloadList[i].selected == "selected" || DcDownloadList[i].selected == true) {
                        filterList.push(DcDownloadList[i].Id);
                    }
                }
                if (ActionFollowUpDownloadPageConfiguration.ContentElement == 'TemplateNode') {
                    reqParm.TemplateId = filterList;
                    reqParm.DcPlaceIds = new Array();
                }
                else {
                    reqParm.DcPlaceIds = filterList;
                    reqParm.TemplateId = new Array();
                }
                
                //reqParm = { OSGuid: ServiceId, UserId: UserId, TemplateId: [2], FromDate: '', ToDate: '', DcPlaceDimension: 0, DcPlaceIds: [] };
                OneViewConsole.Debug("NormalizeDownloadDataReqParm end", "ActionFollowUpApprovalDownloadFacade.NormalizeDownloadDataReqParm");
                return reqParm;
            }
            catch (Excep) {
                throw Excep;
            }
        }

        /// <summary>
        /// API for download TemplatValidationConfigMetaData
        /// </summary
        var DownloadActionFollowUpApprovalProfile = function (DownloadList, xlatService, ShowExceptionMessage) {

            var IsActionFollowUpApprovalProfileSuccess = false;

            try {
                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpApprovalDownloadFacade.DownloadActionFollowUpApprovalProfile");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    //alert("DownloadList : " + JSON.stringify(DownloadList));

                    var ActionFollowUpApprovalDTO = new ActionFollowUpApprovalDownloadIL().DownloadActionFollowUpApprovalProfile(DownloadList, ShowExceptionMessage);
                    oOneViewProgressbar.SetProgressValue(10);

                    //alert(ActionFollowUpApprovalDTO.IsAnyException);
                    //alert(ActionFollowUpApprovalDTO.ExceptionMessage);

                    if (ActionFollowUpApprovalDTO != null && ActionFollowUpApprovalDTO.IsAnyException == false) {
                       
                       // alert('ActionFollowUpApprovalDTO.ActionFollowUpApprovalProfileDTOLst : ' + JSON.stringify(ActionFollowUpApprovalDTO.ActionFollowUpApprovalProfileDTOLst));
                       // alert('ActionFollowUpApprovalDTO : ' + JSON.stringify(ActionFollowUpApprovalDTO));
                        if (ActionFollowUpApprovalDTO.ActionFollowUpApprovalProfileDTOLst.length > 0) {

                            var _oActionFollowUpApprovalDownloadBO = new ActionFollowUpApprovalDownloadBO();

                            var _oActionFollowUpDownloadBO = new ActionFollowUpDownloadBO();

                            var UserMasterDTOLst = new MasterNormalizer().NormalizeList("UserMasterEntity", ActionFollowUpApprovalDTO.UserMasterDTOLst);

                            var IsUserInsertSuccess = _oActionFollowUpApprovalDownloadBO.InsertUserMaters(UserMasterDTOLst);

                            if (IsUserInsertSuccess == true) {

                                oOneViewProgressbar.SetProgressValue(20);

                                var BandMasterDTOLst = new MasterNormalizer().NormalizeList("BandMasterEntity", ActionFollowUpApprovalDTO.BandMasterDTOLst);
                                var IsBandMasterInsertSuccess = _oActionFollowUpDownloadBO.InsertBandMaters(BandMasterDTOLst);

                                //alert('IsBandMasterInsertSuccess : ' + IsBandMasterInsertSuccess);
                                if (IsBandMasterInsertSuccess == true) {

                                    oOneViewProgressbar.SetProgressValue(25);

                                    var BandDetailsMasterDTOLst = new MasterNormalizer().NormalizeList("BandDetailsMasterEntity", ActionFollowUpApprovalDTO.BandDetailsMasterDTOLst);
                                    var IsBandDetailsInsertSuccess = _oActionFollowUpDownloadBO.InsertBandDetailMaters(BandDetailsMasterDTOLst);

                                   // alert('IsBandDetailsInsertSuccess : ' + IsBandDetailsInsertSuccess);
                                    if (IsBandDetailsInsertSuccess == true) {

                                        oOneViewProgressbar.SetProgressValue(30);
                                        
                                        var ActionFollowUpApprovalProfileDTOLst = new ActionFollowUpApprovalDownloadNormalizer().NormalizeList(ActionFollowUpApprovalDTO.ActionFollowUpApprovalProfileDTOLst, UserMasterDTOLst);
                                        IsActionFollowUpApprovalProfileSuccess = _oActionFollowUpApprovalDownloadBO.InsertActionFollowUpApprovalInfo(ActionFollowUpApprovalProfileDTOLst);
                                        // alert('IsActionFollowUpApprovalProfileSuccess : ' + IsActionFollowUpApprovalProfileSuccess);
                                      

                                        if (IsActionFollowUpApprovalProfileSuccess == true) {

                                            oOneViewProgressbar.SetProgressValue(35);

                                            var MultiMediaSubElementsDTOLst = new MultiMediaSubElementsNormalizer().NormalizeList(ActionFollowUpApprovalDTO.MultiMediaSubElementsDTOLst);
                                            IsActionFollowUpApprovalProfileSuccess = _oActionFollowUpDownloadBO.InsertMultiMediaSubElements(MultiMediaSubElementsDTOLst, xlatService);

                                            // alert('IsActionFollowUpApprovalProfileSuccess : ' + IsActionFollowUpApprovalProfileSuccess);
                                            if (IsActionFollowUpApprovalProfileSuccess == true) {
                                                oOneViewProgressbar.SetProgressValue(40);
                                                var IsForApproval = "true";
                                                var ActionFollowUpInfoDTOLst = new ActionFollowUpInfoNormalizer().NormalizeList(ActionFollowUpApprovalDTO.ActionFollowUpApprovalProfileDTOLst, IsForApproval);
                                                // alert('ActionFollowUpInfoDTOLst : ' + JSON.stringify(ActionFollowUpInfoDTOLst));
                                                oOneViewProgressbar.SetProgressValue(45);
                                                IsActionFollowUpApprovalProfileSuccess = _oActionFollowUpDownloadBO.InsertActionFollowUpInfo(ActionFollowUpInfoDTOLst);
                                                // alert('IsActionFollowUpApprovalProfileSuccess : ' + IsActionFollowUpApprovalProfileSuccess);
                                                oOneViewProgressbar.SetProgressValue(50);

                                                if (ActionFollowUpApprovalDTO.DataCaptureDTO != null && ActionFollowUpApprovalDTO.DataCaptureDTO.length != 0) {
                                                    var HistoryDcData = new DataCaptureNormalizer().NormalizeList(ActionFollowUpApprovalDTO.DataCaptureDTO);
                                                    oOneViewProgressbar.SetProgressValue(55);
                                                    IsActionFollowUpApprovalProfileSuccess = new DcDAO().InsertDCList(HistoryDcData);
                                                    oOneViewProgressbar.SetProgressValue(60);
                                                }
                                                //alert('IsActionFollowUpApprovalProfileSuccess : ' + IsActionFollowUpApprovalProfileSuccess);
                                                if (IsActionFollowUpApprovalProfileSuccess == true && ActionFollowUpApprovalDTO.Action != null) {
                                                    var _oActionBO = new ActionBO();
                                                    IsActionFollowUpApprovalProfileSuccess = _oActionBO.InsertAction(ActionFollowUpApprovalDTO.Action);
                                                    oOneViewProgressbar.SetProgressValue(65);
                                                }
                                               // alert('IsActionFollowUpApprovalProfileSuccess : ' + IsActionFollowUpApprovalProfileSuccess);
                                                DownloadList.DcPlaceIds = [];
                                                DownloadList.TemplateId = [];

                                                var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
                                                var Query = "SELECT DISTINCT TemplateNodeId FROM ActionDataCaptureInfoEntity WHERE TemplateNodeId NOT IN (SELECT TemplateNodeId FROM TemplateConfigMetaData)";

                                                var DcTemplates = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

                                                for (var i = 0; i < DcTemplates.length; i++) {
                                                    DownloadList.TemplateId.push(DcTemplates[i].TemplateNodeId);
                                                }


                                                var TemplateConfigDTO = new ProfileDownloadIL('').GetTemplateConfig(DownloadList);

                                                oOneViewProgressbar.SetProgressValue(70);

                                                if (TemplateConfigDTO != null && TemplateConfigDTO.IsAnyException == false) {

                                                    if (TemplateConfigDTO.TemplateConfigMetaDataDTOLst.length > 0) {

                                                        var oProfileDownloadBO = new ProfileDownloadBO();

                                                        var TemplateConfigMetaDataDTOLst = new TemplateConfigNormalizer().NormalizeList(TemplateConfigDTO.TemplateConfigMetaDataDTOLst);
                                                        IsActionFollowUpApprovalProfileSuccess = oProfileDownloadBO.InsertTemplateConfig(TemplateConfigMetaDataDTOLst);

                                                        oOneViewProgressbar.SetProgressValue(75);
                                                    }
                                                    else {
                                                        IsActionFollowUpApprovalProfileSuccess = true;
                                                    }
                                                }
                                                else {
                                                    IsActionFollowUpApprovalProfileSuccess = (TemplateConfigDTO != null) ? false : TemplateConfigDTO;
                                                }


                                                var MetaDataDTO = new ProfileDownloadIL('').GetMobileDcPreviewMetadata(DownloadList);
                                                if (MetaDataDTO != null && MetaDataDTO.IsAnyException == false) {

                                                    if (MetaDataDTO.MobileDcPreviewMetadataDTOLst.length > 0) {

                                                        oOneViewProgressbar.SetProgressValue(80);

                                                        var oProfileDownloadBO = new ProfileDownloadBO();

                                                        var MobileDcPreviewMetadataDTOLst = new MobileDcPreviewMetadataNormalizer().NormalizeList(MetaDataDTO.MobileDcPreviewMetadataDTOLst);
                                                        IsActionFollowUpApprovalProfileSuccess = oProfileDownloadBO.InsertMobileDcPreviewMetadata(MobileDcPreviewMetadataDTOLst);

                                                        oOneViewProgressbar.SetProgressValue(85);

                                                    }
                                                    else {
                                                        IsActionFollowUpApprovalProfileSuccess = true;
                                                    }
                                                }
                                                else {
                                                    IsActionFollowUpApprovalProfileSuccess = (MetaDataDTO != null) ? false : MetaDataDTO;
                                                }


                                                // _oActionFollowUpApprovalDownloadBO.InsertActionAndActionDetailsEntity(ActionFollowUpApprovalDTO.ActionFollowUpApprovalProfileDTOLst);
                                                //  oOneViewProgressbar.SetProgressValue(85);
                                                _oActionFollowUpApprovalDownloadBO.InsertActionResolve(ActionFollowUpApprovalDTO.ActionResolveDTOLst);
                                                oOneViewProgressbar.SetProgressValue(90);
                                            }
                                        }
                                    }
                                    else {
                                        IsActionFollowUpApprovalProfileSuccess = false;
                                    }
                                }
                                else {
                                    IsActionFollowUpApprovalProfileSuccess = false;
                                }
                            }
                            else {
                                IsActionFollowUpApprovalProfileSuccess = false;
                            }

                        }
                        else {
                            IsActionFollowUpApprovalProfileSuccess = true;
                        }
                    }
                    else {
                        IsActionFollowUpApprovalProfileSuccess = (ActionFollowUpApprovalDTO != null) ? false : ActionFollowUpApprovalDTO;
                    }
                }
                    //If no internet connection
                else if (ShowExceptionMessage != false) {
                    IsActionFollowUpApprovalProfileSuccess = false;
                    navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                    OneViewConsole.Info("No Internet Connection", "ActionFollowUpApprovalDownloadFacade.DownloadActionFollowUpApprovalProfile");
                }
            }
            catch (Excep) {
                IsActionFollowUpApprovalProfileSuccess = false;
                throw Excep;
            }

            return IsActionFollowUpApprovalProfileSuccess;
        }
    }

    // Presenter
    function ActionFollowUpApprovalDownloadPresenter() {

        /// <summary>
        /// Select all contents
        /// </summary>
        this.PageLoad = function ($scope, $timeout, xlatService, toaster, SpinService) {
            try {
                OneViewConsole.Debug("PageLoad start", "ActionFollowUpApprovalDownloadPresenter.PageLoad");

                // Bydefault content selection is false for all
                $scope.IsAllSelected = false;

                OneViewConsole.Debug("PageLoad end", "ActionFollowUpApprovalDownloadPresenter.PageLoad");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "ActionFollowUpApprovalDownloadPresenter.PageLoad", Excep);
            }
        }


        this.ShowDownloadFailed = function (xlatService) {
            try {
                OneViewConsole.Debug("ShowDownloadFailed start", "ActionFollowUpApprovalDownloadPresenter.ShowDownloadFailed");

                alert(xlatService.xlat('DownloadFailed'));
                OneViewConsole.Info("Download Failed", "ActionFollowUpApprovalDownloadFacade.ShowDownloadFailed");

                OneViewConsole.Debug("ShowDownloadFailed end", "ActionFollowUpApprovalDownloadPresenter.ShowDownloadFailed");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "ActionFollowUpApprovalDownloadPresenter.ShowDownloadFailed", Excep);
            }           
        }

        /// <summary>
        /// Select all contents
        /// </summary>
        /// <param name="$scope">Current scope</param>
        this.SelectAllContents = function ($scope) {
            try {
                OneViewConsole.Debug("SelectAllContents start", "ActionFollowUpApprovalDownloadPresenter.SelectAllContents");

                if ($scope.IsAllSelected == false) {
                    $scope.IsAllSelected = true;
                }
                else {
                    $scope.IsAllSelected = false;
                }

                for (i = 0; i < $scope.Selectedfacilitys.length; i++) {
                    if ($scope.IsAllSelected == true) {
                        $scope.Selectedfacilitys[i].selected = "selected";
                    }
                    else {
                        $scope.Selectedfacilitys[i].selected = "";
                    }
                }

                OneViewConsole.Debug("SelectAllContents end", "ActionFollowUpApprovalDownloadPresenter.SelectAllContents");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "ActionFollowUpApprovalDownloadPresenter.SelectAllContents", Excep);
            }
        }
    }

    // Integration
    function ActionFollowUpApprovalDownloadIL() {

        // ActionFollowUpApprovalDownloadIL object
        var MyInstance = this;

        /// <summary>
        /// Ajax call for get all templates
        /// </summary>
        /// <param name="OSGuid">Service id</param>
        /// <param name="UserId">User id</param>
        /// <returns>Template list</returns>       
        this.GetProfileTemplateView = function (OSGuid, UserId) {
            try {
                OneViewConsole.Debug("GetProfileTemplateView start", "ActionFollowUpApprovalDownloadIL.GetProfileTemplateView");

                var RequestParam = { "OSGuid": OSGuid, "UserId": UserId };

                OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "ActionFollowUpApprovalDownloadIL.GetProfileTemplateView");

                var _oOneViewChannel = new OneViewChannel();
                // _oOneViewChannel.toaster = toaster;
                _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetActionApprovalTemplate";
                //alert('_oOneViewChannel.url : ' + _oOneViewChannel.url);
                _oOneViewChannel.parameter = JSON.stringify(RequestParam);
                var oUserTemplateViewLst = _oOneViewChannel.Send();
                //alert('oUserTemplateViewLst : ' + JSON.stringify(oUserTemplateViewLst));
                OneViewConsole.Debug("GetProfileTemplateView end", "ActionFollowUpApprovalDownloadIL.GetProfileTemplateView");

                if (oUserTemplateViewLst != null) {

                    OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUserTemplateViewLst.GetActionApprovalTemplateResult), "ActionFollowUpApprovalDownloadIL.GetProfileTemplateView");

                    return oUserTemplateViewLst.GetActionApprovalTemplateResult;
                }
                else {
                    return oUserTemplateViewLst;
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "ActionFollowUpApprovalDownloadIL.GetProfileTemplateView", Excep);
            }
        }


        /// <summary>
        /// Ajax call for get all dc places
        /// </summary>
        /// <param name="OSGuid">Service id</param>
        /// <param name="UserId">User id</param>
        /// <returns>Dc place list</returns>       
        //this.GetProfileDcPlaceView = function (OSGuid, UserId, ParentNodeId, DCPlaceRCOType) {
        this.GetProfileDcPlaceView = function (OSGuid, UserId) {
            try {

                OneViewConsole.Debug("GetProfileDcPlaceView start", "ActionFollowUpApprovalDownloadIL.GetProfileDcPlaceView");

                //var RequestParam = { "OSGuid": OSGuid, "UserId": UserId, "ParentNodeId": ParentNodeId, "DCPlaceRCOType": DCPlaceRCOType };
                var RequestParam = { "OSGuid": OSGuid, "UserId": UserId };

                OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "ActionFollowUpApprovalDownloadIL.GetProfileDcPlaceView");

                var _oOneViewChannel = new OneViewChannel();
                // _oOneViewChannel.toaster = toaster;
                _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetActionApprovalPlace";
                //alert('_oOneViewChannel.url : ' + _oOneViewChannel.url);
                _oOneViewChannel.parameter = JSON.stringify(RequestParam);
                var oUserDcPlaceViewLst = _oOneViewChannel.Send();
                //alert('oUserDcPlaceViewLst : ' + JSON.stringify(oUserDcPlaceViewLst));
                OneViewConsole.Debug("GetProfileDcPlaceView end", "ActionFollowUpApprovalDownloadIL.GetProfileDcPlaceView");

                if (oUserDcPlaceViewLst != null) {

                    OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUserDcPlaceViewLst.GetActionApprovalPlaceResult), "ActionFollowUpApprovalDownloadIL.GetProfileDcPlaceView");

                    return oUserDcPlaceViewLst.GetActionApprovalPlaceResult;
                }
                else {
                    return oUserDcPlaceViewLst;
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "ActionFollowUpApprovalDownloadIL.GetProfileDcPlaceView", Excep);
            }
        }


        /// <summary>
        /// Ajax call for get all dc places
        /// </summary>
        /// <param name="OSGuid">Service id</param>
        /// <param name="UserId">User id</param>
        /// <returns>Dc place list</returns>       
        this.GetParentPlacesByDATType = function (OSGuid, UserId, ImmediateParentId, DcChildPlaceRCOType, DCPlaceRCOType) {
            try {

                OneViewConsole.Debug("GetProfileDcPlaceView start", "ActionFollowUpApprovalDownloadIL.GetProfileDcPlaceView");

                var RequestParam = { "OSGuid": OSGuid, "UserId": UserId, "ImmediateParentId": ImmediateParentId, "DcChildPlaceRCOType": DcChildPlaceRCOType, "DCPlaceRCOType": DCPlaceRCOType };

                OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "ActionFollowUpApprovalDownloadIL.GetProfileDcPlaceView");

                var _oOneViewChannel = new OneViewChannel();
                // _oOneViewChannel.toaster = toaster;
                _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetParentPlacesByDATType";
                _oOneViewChannel.parameter = JSON.stringify(RequestParam);
                var oUserDcPlaceViewLst = _oOneViewChannel.Send();

                OneViewConsole.Debug("GetProfileDcPlaceView end", "ActionFollowUpApprovalDownloadIL.GetProfileDcPlaceView");

                if (oUserDcPlaceViewLst != null) {

                    OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUserDcPlaceViewLst.GetParentPlacesByDATTypeResult), "ActionFollowUpApprovalDownloadIL.GetProfileDcPlaceView");

                    return oUserDcPlaceViewLst.GetParentPlacesByDATTypeResult;
                }
                else {
                    return oUserDcPlaceViewLst;
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "ActionFollowUpApprovalDownloadIL.GetProfileDcPlaceView", Excep);
            }
        }


        /// <summary>
        /// Ajax call for Download ActionFollowUp      
        /// </summary>
        /// <param name="DownloadList"></param>
        /// <returns>MetaData list</returns>  
        this.DownloadActionFollowUpApprovalProfile = function (DownloadList, ShowExceptionMessage) {
            try {
                OneViewConsole.Debug("DownloadActionFollowUpApprovalProfile start", "ActionFollowUpApprovalDownloadIL.DownloadActionFollowUpApprovalProfile");

                var RequestParam = JSON.stringify(DownloadList);

                OneViewConsole.DataLog("Request from device : " + RequestParam, "ActionFollowUpApprovalDownloadIL.DownloadActionFollowUpApprovalProfile");

                var _oOneViewChannel = new OneViewChannel();

                _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetActionFollowUpApprovalProfile";
                _oOneViewChannel.parameter = RequestParam;              
                var oActionFollowUpApproval = _oOneViewChannel.Send({ "ShowExceptionMessage": (ShowExceptionMessage != undefined) ? ShowExceptionMessage : true });


                OneViewConsole.DataLog("Response from server : " + oActionFollowUpApproval, "ActionFollowUpApprovalDownloadIL.DownloadActionFollowUpApprovalProfile");

                OneViewConsole.Debug("DownloadActionFollowUp end", "ActionFollowUpApprovalDownloadIL.DownloadActionFollowUpApprovalProfile");
                return oActionFollowUpApproval;

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "ActionFollowUpApprovalDownloadIL.DownloadActionFollowUpApprovalProfile", Excep);
            }
        }
    }
    
    // ActionFollowUpApprovalDownloadBO
    function ActionFollowUpApprovalDownloadBO() {

        /// <summary>
        /// Insert User Masters
        /// </summary>
        /// <param name="UserEntitieslst">User entity list</param>
        /// <returns>true or false</returns>  
        this.InsertUserMaters = function (UserEntitieslst) {
            try {
                OneViewConsole.Debug("InsertUserMaters start", "ActionFollowUpApprovalDownloadBO.InsertUserMaters");

                var _oDefaultMasterDAO = new DefaultMasterDAO("UserMasterEntity");
                var Count = _oDefaultMasterDAO.Count();

                // User Master data insertion
                for (i = 0; i < UserEntitieslst.length; i++) {
                    _oDefaultMasterDAO.DeleteByServerId(UserEntitieslst[i].ServerId);
                    _oDefaultMasterDAO.Create(UserEntitieslst[i], Count);
                    Count += 1;
                }

                OneViewConsole.Debug("InsertUserMaters end", "ActionFollowUpApprovalDownloadBO.InsertUserMaters");

                return true;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalDownloadBO.InsertUserMaters", Excep);
            }
        }

        /// <summary>
        /// Insert Band Masters
        /// </summary>
        /// <param name="BandEntitieslst">Band entity list</param>
        /// <returns>true or false</returns>  
        this.InsertBandMaters = function (BandEntitieslst) {
            try {
                OneViewConsole.Debug("InsertBandMaters start", "ActionFollowUpApprovalDownloadBO.InsertBandMaters");

                var _oDefaultMasterDAO = new DefaultMasterDAO("BandMasterEntity");
                var Count = _oDefaultMasterDAO.Count();

                // User Master data insertion
                for (i = 0; i < BandEntitieslst.length; i++) {
                    _oDefaultMasterDAO.DeleteByServerId(BandEntitieslst[i].ServerId);
                    _oDefaultMasterDAO.Create(BandEntitieslst[i], Count);
                    Count += 1;
                }

                OneViewConsole.Debug("InsertBandMaters end", "ActionFollowUpApprovalDownloadBO.InsertBandMaters");

                return true;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalDownloadBO.InsertBandMaters", Excep);
            }
        }

        /// <summary>
        /// Insert Band Details Masters
        /// </summary>
        /// <param name="BandDetailsEntitieslst">Band Details entity list</param>
        /// <returns>true or false</returns>  
        this.InsertBandDetailMaters = function (BandDetailsEntitieslst) {
            try {
                OneViewConsole.Debug("InsertBandDetailMaters start", "ActionFollowUpApprovalDownloadBO.InsertBandDetailMaters");

                var _oDefaultMasterDAO = new DefaultMasterDAO("BandDetailsMasterEntity");
                var Count = _oDefaultMasterDAO.Count();

                // User Master data insertion
                for (i = 0; i < BandDetailsEntitieslst.length; i++) {
                    _oDefaultMasterDAO.DeleteByServerId(BandDetailsEntitieslst[i].ServerId);
                    _oDefaultMasterDAO.Create(BandDetailsEntitieslst[i], Count);
                    Count += 1;
                }

                OneViewConsole.Debug("InsertBandDetailMaters end", "ActionFollowUpApprovalDownloadBO.InsertBandDetailMaters");

                return true;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalDownloadBO.InsertBandDetailMaters", Excep);
            }
        }

        /// <summary>
        /// Insert all ActionFollowUpInfo list
        /// </summary>
        /// <param name="ActionFollowUpInfoLst">ActionFollowUpInfo list</param>
        /// <returns>true or false</returns>  
        this.InsertActionFollowUpInfo = function (ActionFollowUpInfoLst) {
            try {
                OneViewConsole.Debug("InsertActionFollowUpInfo start", "ActionFollowUpApprovalDownloadBO.InsertActionFollowUpInfo");
              
                var _oActionFollowUpDefaultMasterDAO = new DefaultMasterDAO("ActionFollowUpInfoEntity");
                var _oActionDataCaptureDefaultMasterDAO = new DefaultMasterDAO("ActionDataCaptureInfoEntity");

                var _oActionFollowUpApprovalDownloadDAO = new ActionFollowUpApprovalDownloadDAO();
                var _oActionDataCaptureDAO = new ActionDataCaptureDAO();

                // Check the count of ActionFollowUpInfoEntity
                var ActionFollowUpCount = _oActionFollowUpDefaultMasterDAO.Count();

                // Check the count of ActionDataCaptureInfoEntity
                var ActionDataCaptureInfoCount = _oActionDataCaptureDefaultMasterDAO.Count();

                for (var i = 0; i < ActionFollowUpInfoLst.length; i++) {

                    //ServiceId, ActionProfileId, FollowUpUserId, ActionDetailsId
                    var oActionDataCapture = _oActionDataCaptureDAO.GetByAllDimensions(ActionFollowUpInfoLst[i].ServiceId, ActionFollowUpInfoLst[i].ActionDataCaptureInfoEntity.DcPlaceId, ActionFollowUpInfoLst[i].ActionDataCaptureInfoEntity.TemplateNodeId, ActionFollowUpInfoLst[i].FollowUpUserId, ActionFollowUpInfoLst[i].ActionDataCaptureInfoEntity.DocId);

                    // If its not available, create new
                    if (oActionDataCapture.length == 0) {

                        var oActionFollowUpInfo = _oActionDataCaptureDefaultMasterDAO.Create(ActionFollowUpInfoLst[i].ActionDataCaptureInfoEntity, ActionDataCaptureInfoCount);
                       
                        ActionFollowUpInfoLst[i].ActionDataCaptureInfoId = oActionFollowUpInfo.Id;
                        
                        ActionDataCaptureInfoCount += 1;
                    }
                    else {
                        ActionFollowUpInfoLst[i].ActionDataCaptureInfoId = oActionDataCapture[0].Id;
                    }

                    //ServiceId, DcPlaceId, TemplateNodeId, DcUserId, DocId
                    var oActionFollowUp = _oActionFollowUpApprovalDownloadDAO.GetByAllDimensions(ActionFollowUpInfoLst[i].ServiceId, ActionFollowUpInfoLst[i].ActionProfileId, ActionFollowUpInfoLst[i].FollowUpUserId, ActionFollowUpInfoLst[i].ActionDetailsId);

                    // If its not available, create new 
                    if (oActionFollowUp.length == 0) {
                        
                        _oActionFollowUpDefaultMasterDAO.Create(ActionFollowUpInfoLst[i], ActionFollowUpCount);

                        ActionFollowUpCount += 1;
                    }

                    // If its available              
                    else {
                    }
                }

                OneViewConsole.Debug("InsertActionFollowUpInfo end", "ActionFollowUpApprovalDownloadBO.InsertActionFollowUpInfo");

                return true;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalDownloadBO.InsertActionFollowUpInfo", Excep);
            }
        }


        /// <summary>
        /// Insert MultiMediaSubElements list
        /// </summary>
        /// <param name="MultiMediaSubElementsLst">MultiMediaSubElements list</param>
        /// <returns>true or false</returns>  
        this.InsertMultiMediaSubElements = function (MultiMediaSubElementsLst, xlatService) {
            try {
                OneViewConsole.Debug("InsertMultiMediaSubElements start", "ActionFollowUpApprovalDownloadBO.InsertMultiMediaSubElements");

                var IsSuccess = true;
                var MultiMediaSubElementsToDownloadFromSimpleStorage = [];

                var _oDefaultMasterDAO = new DefaultMasterDAO("MultiMediaSubElements");

                var Count = _oDefaultMasterDAO.Count();

                // Get all server id's and ovguid's
                var DuplicateCheckDic = _oDefaultMasterDAO.GetAllServerIdAndOVGuid();
               
                for (i = 0; i < MultiMediaSubElementsLst.length; i++) {
                    if (DuplicateCheckDic[MultiMediaSubElementsLst[i].ServerId] == undefined) {                        
                        var NewMultiMediaSubElement = _oDefaultMasterDAO.Create(MultiMediaSubElementsLst[i], Count);
                        MultiMediaSubElementsToDownloadFromSimpleStorage.push(NewMultiMediaSubElement);
                        Count += 1;
                    }                 
                }              
                if (MultiMediaSubElementsToDownloadFromSimpleStorage.length > 0) {
                    var _oUploadBO = new UploadBO(xlatService, '');
                    IsSuccess = _oUploadBO.DownloadMultiMediaSubElements(MultiMediaSubElementsToDownloadFromSimpleStorage);
                }

                OneViewConsole.Debug("InsertMultiMediaSubElements end", "ActionFollowUpApprovalDownloadBO.InsertMultiMediaSubElements");
            }
            catch (Excep) {              
                IsSuccess = false;
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalDownloadBO.InsertMultiMediaSubElements", Excep);              
            }

            return IsSuccess;
        }

        this.InsertActionFollowUpApprovalInfo = function (ActionFollowUpApprovalProfileLst) {
            try {
                OneViewConsole.Debug("InsertActionFollowUpApprovalInfo start", "ActionFollowUpApprovalDownloadBO.InsertActionFollowUpApprovalInfo");

                var _oActionFollowUpDefaultMasterDAO = new DefaultMasterDAO("ActionFollowUpInfoEntity");
                var _oActionDataCaptureDefaultMasterDAO = new DefaultMasterDAO("ActionDataCaptureInfoEntity");



                ///////********************** ActionFollowUpApprovalProfile Save START ******************//////////////////////
                var _oActionFollowUpApprovalProfileDAO = new DefaultMasterDAO("ActionFollowUpApprovalProfileEntity");
                var _oActionFollowUpApprovalLevelInfoDAO = new DefaultMasterDAO("ActionFollowUpApprovalLevelInfoEntity");
                var _oActionFollowUpApprovalUserDetailsDAO = new DefaultMasterDAO("ActionFollowUpApprovalUserDetailsEntity");
                var _oActionFollowUpApprovalDownloadDAO = new ActionFollowUpApprovalDownloadDAO();
                
                var ActionFollowUpApprovalProfileCount = _oActionFollowUpApprovalProfileDAO.Count();
                var ActionFollowUpApprovalLevelInfoCount = _oActionFollowUpApprovalLevelInfoDAO.Count();
                var ActionFollowUpApprovalUserDetailsCount = _oActionFollowUpApprovalUserDetailsDAO.Count();
                
                for (var i = 0; i < ActionFollowUpApprovalProfileLst.length; i++) {
                   
                    var obj = _oActionFollowUpApprovalDownloadDAO.GetByAllDimensions_Profiledownload(ActionFollowUpApprovalProfileLst[i].PlaceType, ActionFollowUpApprovalProfileLst[i].PlaceId, ActionFollowUpApprovalProfileLst[i].TemplateNodeId, ActionFollowUpApprovalProfileLst[i].UserId, ActionFollowUpApprovalProfileLst[i].FollowUpUserId);
                    
                    // Cheking this dc is already available in local db                    
                    // If its not available
                    if (obj.length == 0) {
                        
                        var _oActionFollowUpApprovalProfile = _oActionFollowUpApprovalProfileDAO.Create(ActionFollowUpApprovalProfileLst[i], ActionFollowUpApprovalProfileCount);
                      
                        for (var j = 0; j < ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList.length; j++) {

                            ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j].ActionFollowUpApprovalProfileId = _oActionFollowUpApprovalProfile.Id;
                          
                            var _oActionFollowUpApprovalLevelInfo = _oActionFollowUpApprovalLevelInfoDAO.Create(ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j], ActionFollowUpApprovalLevelInfoCount);

                            for (var k = 0; k < ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j].ActionFollowUpApprovalUserDetailsEntityList.length; k++) {
                                ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j].ActionFollowUpApprovalUserDetailsEntityList[k].ActionFollowUpApprovalProfileId = _oActionFollowUpApprovalProfile.Id;
                                ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j].ActionFollowUpApprovalUserDetailsEntityList[k].ActionFollowUpApprovalLevelInfoId = _oActionFollowUpApprovalLevelInfo.Id;                                
                                _oActionFollowUpApprovalUserDetailsDAO.Create(ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j].ActionFollowUpApprovalUserDetailsEntityList[k], ActionFollowUpApprovalUserDetailsCount);                               
                                ActionFollowUpApprovalUserDetailsCount++;
                            }

                            ActionFollowUpApprovalLevelInfoCount++;
                        }

                        ActionFollowUpApprovalProfileCount++;
                    }

                        // If its available, check the OVGuid
                        // If OVGuid is mismatch
                    else if (IsGlobalOVGuidCheckingEnabled == true && obj[0].OVGuid != ActionFollowUpApprovalProfileLst[i].OVGuid) {

                        _oActionFollowUpApprovalDownloadDAO.DeleteByByAllDimensions(ActionFollowUpApprovalProfileLst[i].PlaceType, ActionFollowUpApprovalProfileLst[i].PlaceId, ActionFollowUpApprovalProfileLst[i].TemplateNodeId, ActionFollowUpApprovalProfileLst[i].UserId);

                        var _oActionFollowUpApprovalProfile = _oActionFollowUpApprovalProfileDAO.Create(ActionFollowUpApprovalProfileLst[i], ActionFollowUpApprovalProfileCount);

                        for (var j = 0; j < ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList.length; j++) {

                            ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j].ActionFollowUpApprovalProfileId = _oActionFollowUpApprovalProfile.Id;

                            var _oActionFollowUpApprovalLevelInfo = __oActionFollowUpApprovalLevelInfoDAO.Create(ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j], ActionFollowUpApprovalLevelInfoCount);

                            for (var k = 0; k < ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j].ActionFollowUpApprovalUserDetailsEntityList.length; k++) {

                                ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j].ActionFollowUpApprovalUserDetailsEntityList[k].ActionFollowUpApprovalProfileId = _oActionFollowUpApprovalProfile.Id;
                                ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j].ActionFollowUpApprovalUserDetailsEntityList[k].ActionFollowUpApprovalLevelInfoId = _oActionFollowUpApprovalLevelInfo.Id;

                                _oActionFollowUpApprovalUserDetailsDAO.Create(ActionFollowUpApprovalProfileLst[i].ActionFollowUpApprovalLevelInfoEntityList[j].ActionFollowUpApprovalUserDetailsEntityList[k], ActionFollowUpApprovalUserDetailsCount);

                                ActionFollowUpApprovalUserDetailsCount++;
                            }

                            ActionFollowUpApprovalLevelInfoCount++;
                        }

                        ActionFollowUpApprovalProfileCount++;
                    }
                }


                ///////********************** ActionFollowUpApprovalProfile Save END ******************//////////////////////
                               
               // alert('done');

                OneViewConsole.Debug("InsertActionFollowUpApprovalInfo end", "ActionFollowUpApprovalDownloadBO.InsertActionFollowUpApprovalInfo");

                return true;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalDownloadBO.InsertActionFollowUpApprovalInfo", Excep);
            }
        }


        this.InsertActionResolve = function (ActionResolveDTOLst) {
            try {
                OneViewConsole.Debug("InsertActionFollowUpApprovalInfo start", "ActionFollowUpApprovalDownloadBO.InsertActionFollowUpApprovalInfo");

                //alert('InsertActionResolve');
                var _oActionResolveDAO = new ActionResolveDAO();

              //  alert('ActionFollowUpApprovalProfileDTOList[i].ActionResolveId : ' + ActionFollowUpApprovalProfileDTOList[i].ActionResolveId);
                //for (var i = 0; i < ActionFollowUpInfoLst.length; i++) {

                //    var ActionFollowUpInfo = ActionFollowUpInfoLst[i];
                //    var ResolveData = _oActionResolveDAO.GetByFollowUpUserAndActionDetailsId(ActionFollowUpInfo.FollowUpUserId, ActionFollowUpInfo.ActionDetailsId);

                //    if (ResolveData != null && ResolveData.length > 0) {
                //        _oActionResolveDAO.DeleteByFollowUpUserAndActionDetailsId(ActionFollowUpInfo.FollowUpUserId, ActionFollowUpInfo.ActionDetailsId);
                //    }

                //}
                //alert('ActionResolveDTOLst : ' + JSON.stringify(ActionResolveDTOLst));
                
                for (var i = 0; i < ActionResolveDTOLst.length; i++) {

                    var ActionResolveDTO = ActionResolveDTOLst[i];
                    var ActionResolveData = _oActionResolveDAO.GetByServerId(ActionResolveDTO.ServerId);
                    //alert('ActionResolveData : ' + ActionResolveData);
                    var IsActionResolveExists = false;
                    if (ActionResolveData != null && ActionResolveData.length > 0) {
                        IsActionResolveExists = true;
                    }
                    //alert('IsActionResolveExists : ' + IsActionResolveExists);
                    if (IsActionResolveExists != true) {

                        var _oActionResolveEntity = new ActionResolveEntity();
                       
                        _oActionResolveEntity.ClientGuid = ActionResolveDTO.ClientGuid;
                        _oActionResolveEntity.ServiceId = ActionResolveDTO.ServiceId;
                        _oActionResolveEntity.ServerId = ActionResolveDTO.ServerId
                        _oActionResolveEntity.MobileVersionId = 1;
                        _oActionResolveEntity.ActionId = ActionResolveDTO.ActionId;
                        _oActionResolveEntity.IsAllActions = ActionResolveDTO.IsAllActions;
                        _oActionResolveEntity.ActionDetailsId = ActionResolveDTO.ActionDetailsId;
                        _oActionResolveEntity.FollowUpUserId = ActionResolveDTO.FollowUpUserId;
                        _oActionResolveEntity.FollowUpUserName = ActionResolveDTO.FollowUpUserName;
                        _oActionResolveEntity.ActionStatus = ActionResolveDTO.ActionStatus;
                        _oActionResolveEntity.Comments = ActionResolveDTO.Comments;
                        _oActionResolveEntity.IsSynchronized = "true";

                        _oActionResolveEntity.ApprovalStatus = ActionResolveDTO.ApprovalStatus;
                        _oActionResolveEntity.ApprovalStatusDate = ActionResolveDTO.ApprovalStatusDate;
                        _oActionResolveEntity.IsOnDeviceApprovalFinished = ActionResolveDTO.IsOnDeviceApprovalFinished;
                        _oActionResolveEntity.IsSubmited = ActionResolveDTO.IsSubmited;
                        _oActionResolveEntity.SubmitedDate = ActionResolveDTO.SubmitedDate;
                        _oActionResolveEntity.IsDisable = ActionResolveDTO.IsDisable;

                        _oActionResolveEntity.ActionResolveDate = ActionResolveDTO.ActionResolveDate;
                        _oActionResolveEntity.CreatedDate = ActionResolveDTO.CreatedDate;
                        _oActionResolveEntity.LastsyncDate = ActionResolveDTO.LastsyncDate;
                        _oActionResolveEntity.TimeStamp = ActionResolveDTO.TimeStamp;
                        //  alert('_oActionResolveEntity : ' + JSON.stringify(_oActionResolveEntity));

                        var _oActionResolveDefaultDAO = new DefaultMasterDAO("ActionResolveEntity");
                        var ActionResolveCount = _oActionResolveDefaultDAO.Count();
                       //  alert('ActionResolveCount : ' + ActionResolveCount);
                         var _oActionResolveInfo = _oActionResolveDefaultDAO.Create(_oActionResolveEntity, ActionResolveCount);
                        
                    }

                }

                OneViewConsole.Debug("InsertActionFollowUpApprovalInfo end", "ActionFollowUpApprovalDownloadBO.InsertActionFollowUpApprovalInfo");

                return true;
            }
            catch (Excep) {
               // alert('InsertActionFollowUpApprovalInfo Excep  : ' + Excep);
              //  alert('InsertActionFollowUpApprovalInfo Excep 22  : ' + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalDownloadBO.InsertActionFollowUpApprovalInfo", Excep);
            }
        }


        this.InsertActionAndActionDetailsEntity = function (ActionFollowUpInfoLst) {
            try {

                OneViewConsole.Debug("InsertActionAndActionDetailsEntity start", "ActionFollowUpApprovalDownloadBO.InsertActionAndActionDetailsEntity");
             
                for (var i = 0; i < ActionFollowUpInfoLst.length; i++) {

                    var ActionFollowUpInfo = ActionFollowUpInfoLst[i];
                    var _oActionDAO = new ActionDAO();
                    var ActionData = _oActionDAO.GetActionByActionServerIdAndRaisedBySystemUserId(ActionFollowUpInfo.ActionId, ActionFollowUpInfo.ActionRaisedUserId);

                    var IsActionExists = false;
                    if (ActionData != null && ActionData.length > 0) {
                        IsActionExists = true;
                    }


                    var oDateTime = new DateTime();
                    var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                    if (IsActionExists != true) {

                        var _oActionEntity = new ActionEntity();
                        _oActionEntity.ServiceId = ActionFollowUpInfo.ServiceId;
                        _oActionEntity.ServerId = ActionFollowUpInfo.ActionId;
                        _oActionEntity.ClientGuid = ActionFollowUpInfo.ActionClientGuid;
                        _oActionEntity.MobileVersionId = 1;

                        //Currently not comming from server, we have to add
                        _oActionEntity.ActionContext = ActionFollowUpInfo.ActionContext;
                        _oActionEntity.IsMultiMediaAttached = ActionFollowUpInfo.ActionIsMultiMediaAttached;
                        // _oActionEntity.ActionRaisedByAnonymousUserId = 0;

                        _oActionEntity.ActionRaisedBySystemUserId = ActionFollowUpInfo.ActionRaisedUserId;
                        _oActionEntity.ActionRaisedByUserName = ActionFollowUpInfo.ActionRaisedUserName;
                        _oActionEntity.Comments = ActionFollowUpInfo.Comments;
                        _oActionEntity.CreatedDate = ActionFollowUpInfo.ActionRaisedDate;
                        _oActionEntity.TimeStamp = CurrenntDateAndTime;
                        _oActionEntity.IsSynchronized = "true";
                        _oActionEntity.IsDisable = "false";

                      //  alert('_oActionEntity : ' + JSON.stringify(_oActionEntity));

                        var _oActionCreationDAO = new DefaultMasterDAO("ActionEntity");
                        var ActionCount = _oActionCreationDAO.Count();
                        //   alert('ActionCount : ' + ActionCount);
                        var _oActionInfo = _oActionCreationDAO.Create(_oActionEntity, ActionCount);

                    }

                   // alert(ActionFollowUpInfo.ActionDetailsClientGuid);
                   // alert('  ActionFollowUpInfo : ' + JSON.stringify(ActionFollowUpInfo));
                    var ActionDetailsData = _oActionDAO.GetActionDetailsByActionDetailsClientGuidAndRaisedBySystemUserId(ActionFollowUpInfo.ActionDetailsClientGuid, ActionFollowUpInfo.ActionRaisedUserId);

                    var IsActionDetailsExists = false;
                    if (ActionData != null && ActionData.length > 0) {
                        IsActionDetailsExists = true;
                    }
                    if (IsActionDetailsExists != true) {
                        
                        var _oActionDetailsEntity = new ActionDetailsEntity();
                        _oActionDetailsEntity.ServiceId = ActionFollowUpInfo.ServiceId;
                        _oActionDetailsEntity.ClientGuid = ActionFollowUpInfo.ActionDetailsClientGuid;
                        _oActionDetailsEntity.MobileVersionId = 1;
                        _oActionDetailsEntity.DataCaptureClientGuid = ActionFollowUpInfo.DataCaptureClientGuid;
                        _oActionDetailsEntity.PreDefinedActionId = ActionFollowUpInfo.PredefinedActionId;
                        _oActionDetailsEntity.CustomAction = ActionFollowUpInfo.CustomAction;
                        _oActionDetailsEntity.Comments = ActionFollowUpInfo.Comments;
                        _oActionDetailsEntity.IsPersonalObservation = ActionFollowUpInfo.IsPersonalObservation;
                        _oActionDetailsEntity.CreatedDate = ActionFollowUpInfo.ActionRaisedDate;
                        _oActionDetailsEntity.TimeStamp = CurrenntDateAndTime;
                        _oActionDetailsEntity.IsSynchronized = "true";
                        _oActionDetailsEntity.IsDisable = "false";
                        _oActionDetailsEntity.IsMultiMediaAttached = ActionFollowUpInfo.ActionDetailIsMultiMediaAttached;

                       // alert('_oActionDetailsEntity : ' + JSON.stringify(_oActionDetailsEntity));

                        var _oActionDetailsDAO = new DefaultMasterDAO("ActionDetailsEntity");
                        var ActionDetailsCount = _oActionDetailsDAO.Count();
                        //   alert('ActionDetailsCount : ' + ActionDetailsCount);
                        var _oActionDetailsInfo = _oActionDetailsDAO.Create(_oActionEntity, ActionDetailsCount);

                    }

                }

                OneViewConsole.Debug("InsertActionAndActionDetailsEntity end", "ActionFollowUpApprovalDownloadBO.InsertActionAndActionDetailsEntity");

            }
            catch (Excep) {
              //  alert('InsertActionAndActionDetailsEntity Excep  : ' + Excep);
              //  alert('InsertActionAndActionDetailsEntity Excep 22  : ' + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalDownloadBO.InsertActionAndActionDetailsEntity", Excep);
            }
            finally {
                oDateTime = null;
                CurrenntDateAndTime = null;
                _oActionEntity = null;
            }
        }



    }

    //ActionFollowUpInfo Normalizer
    function ActionFollowUpApprovalDownloadNormalizer() {
        
        // ActionFollowUpApprovalDownloadNormalizer object
        var MyInstance = this;

        var _oDateTime = new DateTime();
        var CurrentDateAndTime = _oDateTime.GetDateAndTime();

        var oActionDataCaptureInfoNormalizer = new ActionDataCaptureInfoNormalizer();

        /// <summary>
        /// DTO to ActionFollowUpApprovalProfileDTO conversion
        /// </summary>
        /// <param name="ActionFollowUpApprovalProfileDTO">ActionFollowUpApprovalProfileDTO DTO (DTO from server)</param>
        /// <returns>ActionFollowUpApprovalProfileDTO (Mobile entity format)</returns> 
        this.Normalize = function (ActionFollowUpApprovalProfileDTO, UserMasterDTOLst) {
            try {
                OneViewConsole.Debug("Normalize start", "TemplateValidationConfigNormalizer.Normalize");

                var _oActionFollowUpApprovalProfileEntity = new ActionFollowUpApprovalProfileEntity();

                _oActionFollowUpApprovalProfileEntity.ServiceId = ActionFollowUpApprovalProfileDTO.ServiceId;
                _oActionFollowUpApprovalProfileEntity.ServerId = ActionFollowUpApprovalProfileDTO.ActionFollowUpApprovalProfileId;

                _oActionFollowUpApprovalProfileEntity.OVGuid = ActionFollowUpApprovalProfileDTO.ActionFollowUpApprovalProfileOVGuid;
                _oActionFollowUpApprovalProfileEntity.UserId = UserMasterDTOLst[0].ServerId;
                _oActionFollowUpApprovalProfileEntity.UserName = UserMasterDTOLst[0].UserName;

                _oActionFollowUpApprovalProfileEntity.FollowUpUserId = ActionFollowUpApprovalProfileDTO.FollowUpUserId;
                _oActionFollowUpApprovalProfileEntity.FollowUpUserName = ActionFollowUpApprovalProfileDTO.FollowUpUserName;
                _oActionFollowUpApprovalProfileEntity.PlaceId = ActionFollowUpApprovalProfileDTO.PlaceId;
                _oActionFollowUpApprovalProfileEntity.PlaceName = ActionFollowUpApprovalProfileDTO.PlaceName;
                _oActionFollowUpApprovalProfileEntity.PlaceType = ActionFollowUpApprovalProfileDTO.PlaceType;
                _oActionFollowUpApprovalProfileEntity.PlaceDimension = ActionFollowUpApprovalProfileDTO.PlaceDimension;
                _oActionFollowUpApprovalProfileEntity.TemplateNodeId = ActionFollowUpApprovalProfileDTO.TemplateNodeId;
                _oActionFollowUpApprovalProfileEntity.TemplateName = ActionFollowUpApprovalProfileDTO.TemplateName;

                if (ActionFollowUpApprovalProfileDTO.UIDetailsJSON != null) {
                    _oActionFollowUpApprovalProfileEntity.UIDetailsJSON = JSON.stringify(JSON.parse(ActionFollowUpApprovalProfileDTO.UIDetailsJSON));
                }

                _oActionFollowUpApprovalProfileEntity.OverallApprovalLevels = ActionFollowUpApprovalProfileDTO.OverallApprovalLevels;
                _oActionFollowUpApprovalProfileEntity.OnDeviceApprovalLevels = ActionFollowUpApprovalProfileDTO.OnDeviceApprovalLevels;
                _oActionFollowUpApprovalProfileEntity.ValidityStartDate = ActionFollowUpApprovalProfileDTO.ValidityStartDate;
                _oActionFollowUpApprovalProfileEntity.ValidityEndDate = ActionFollowUpApprovalProfileDTO.ValidityEndDate;

                _oActionFollowUpApprovalProfileEntity.IsDisable = false;
                _oActionFollowUpApprovalProfileEntity.CreatedDate = CurrentDateAndTime;
                _oActionFollowUpApprovalProfileEntity.LastsyncDate = CurrentDateAndTime;
                _oActionFollowUpApprovalProfileEntity.TimeStamp = CurrentDateAndTime;

                if (ActionFollowUpApprovalProfileDTO.ActionFollowUpApprovalLevelInfoDTOList != null) {
                    _oActionFollowUpApprovalProfileEntity.ActionFollowUpApprovalLevelInfoEntityList = MyInstance.NormalizeActionFollowUpApprovalLevelInfoEntityList(ActionFollowUpApprovalProfileDTO.ActionFollowUpApprovalLevelInfoDTOList);
                }
            
              //  alert('_oActionFollowUpApprovalProfileEntity : ' + JSON.stringify(_oActionFollowUpApprovalProfileEntity));
                return _oActionFollowUpApprovalProfileEntity;
            }
            catch (Excep) {              
                throw oOneViewExceptionHandler.Create("Normalizer", "TemplateValidationConfigNormalizer.Normalize", Excep);
            }
        }


        /// <summary>
        /// DTO list to ActionFollowUpApprovalProfile list conversion
        /// </summary>
        /// <param name="ActionFollowUpApprovalProfileDTOList">ActionFollowUpApprovalProfile list dto (DTO from server)</param>
        /// <returns>ActionFollowUpApprovalProfile list (Mobile entity format)</returns> 
        this.NormalizeList = function (ActionFollowUpApprovalProfileDTOList, UserMasterDTOLst) {
            try {
                OneViewConsole.Debug("NormalizeList start", "ActionFollowUpApprovalDownloadNormalizer.NormalizeList");

                var ActionFollowUpInfoList = new Array();
                for (var i = 0; i < ActionFollowUpApprovalProfileDTOList.length; i++) {               
                    ActionFollowUpInfoList[i] = MyInstance.Normalize(ActionFollowUpApprovalProfileDTOList[i], UserMasterDTOLst);
                }

                OneViewConsole.Debug("NormalizeList end", "ActionFollowUpApprovalDownloadNormalizer.NormalizeList");

                return ActionFollowUpInfoList;
            }
            catch (Excep) {               
                throw oOneViewExceptionHandler.Create("Normalizer", "ActionFollowUpApprovalDownloadNormalizer.NormalizeList", Excep);
            }
        }

        this.NormalizeActionFollowUpApprovalLevelInfoEntityList = function (ActionFollowUpApprovalLevelInfoDTOList) {
            try {

                OneViewConsole.Debug("NormalizeActionFollowUpApprovalLevelInfoEntityList start", "TemplateValidationConfigNormalizer.NormalizeActionFollowUpApprovalLevelInfoEntityList");

                var ActionFollowUpApprovalLevelInfoEntityList = new Array();
               
                for (var i = 0; i < ActionFollowUpApprovalLevelInfoDTOList.length; i++) {
                   
                    var ActionFollowUpApprovalUserDetailsEntityList = null;
                    if (ActionFollowUpApprovalLevelInfoDTOList[i].ActionFollowUpApprovalUserDetailsDTOList != null) {
                        ActionFollowUpApprovalUserDetailsEntityList =
                            MyInstance.NormalizeActionFollowUpApprovalUserDetailsEntityList(ActionFollowUpApprovalLevelInfoDTOList[i].ActionFollowUpApprovalUserDetailsDTOList, ActionFollowUpApprovalLevelInfoDTOList[i].ServerId);
                    }
                    ActionFollowUpApprovalLevelInfoEntityList[i] = MyInstance.NormalizeActionFollowUpApprovalLevelInfoEntity(ActionFollowUpApprovalLevelInfoDTOList[i], ActionFollowUpApprovalUserDetailsEntityList);

                }
             
                return ActionFollowUpApprovalLevelInfoEntityList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("NormalizeActionFollowUpApprovalLevelInfoEntityList", "TemplateValidationConfigNormalizer.NormalizeActionFollowUpApprovalLevelInfoEntityList", Excep);
            }
        }

        this.NormalizeActionFollowUpApprovalLevelInfoEntity = function (ActionFollowUpApprovalLevelInfoDTO, ActionFollowUpApprovalUserDetailsEntityList) {
            try {
                OneViewConsole.Debug("Normalize start", "TemplateValidationConfigNormalizer.Normalize");
               
                var _oActionFollowUpApprovalLevelInfoEntity = new ActionFollowUpApprovalLevelInfoEntity();

                _oActionFollowUpApprovalLevelInfoEntity.MobileVersionId = 1;
                _oActionFollowUpApprovalLevelInfoEntity.OVGuid = ActionFollowUpApprovalLevelInfoDTO.OVGuid;
                _oActionFollowUpApprovalLevelInfoEntity.ServiceId = ActionFollowUpApprovalLevelInfoDTO.ServiceId;
                _oActionFollowUpApprovalLevelInfoEntity.ApprovalIndex = ActionFollowUpApprovalLevelInfoDTO.ApprovalIndex;

                if (ActionFollowUpApprovalLevelInfoDTO.OnDeviceApprovalConfigJSON != null) {
                    _oActionFollowUpApprovalLevelInfoEntity.OnDeviceApprovalConfigJSON = JSON.stringify(JSON.parse(ActionFollowUpApprovalLevelInfoDTO.OnDeviceApprovalConfigJSON));
                }

                _oActionFollowUpApprovalLevelInfoEntity.ActionFollowUpApprovalUserDetailsEntityList = ActionFollowUpApprovalUserDetailsEntityList;

                _oActionFollowUpApprovalLevelInfoEntity.IsOnDeviceApproval = ActionFollowUpApprovalLevelInfoDTO.IsOnDeviceApproval;
                _oActionFollowUpApprovalLevelInfoEntity.TimeStamp = CurrentDateAndTime;

              
                return _oActionFollowUpApprovalLevelInfoEntity;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Normalizer", "TemplateValidationConfigNormalizer.Normalize", Excep);
            }
        }

        this.NormalizeActionFollowUpApprovalUserDetailsEntityList = function (ActionFollowUpApprovalUserDetailsDTOList, ActionFollowUpApprovalLevelInfoId) {
            try {
                OneViewConsole.Debug("NormalizeActionFollowUpApprovalUserDetailsEntityList start", "TemplateValidationConfigNormalizer.NormalizeActionFollowUpApprovalUserDetailsEntityList");

                var ActionFollowUpApprovalUserDetailsEntityList = new Array();
                for (var i = 0; i < ActionFollowUpApprovalUserDetailsDTOList.length; i++) {
                    ActionFollowUpApprovalUserDetailsEntityList[i] = MyInstance.NormalizeActionFollowUpApprovalUserDetailsEntity(ActionFollowUpApprovalUserDetailsDTOList[i], ActionFollowUpApprovalLevelInfoId);
                }

                return ActionFollowUpApprovalUserDetailsEntityList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("NormalizeActionFollowUpApprovalUserDetailsEntityList", "TemplateValidationConfigNormalizer.NormalizeActionFollowUpApprovalUserDetailsEntityList", Excep);
            }
        }

        this.NormalizeActionFollowUpApprovalUserDetailsEntity = function (ActionFollowUpApprovalUserDetailsDTO,ActionFollowUpApprovalLevelInfoId) {
            try {
                OneViewConsole.Debug("Normalize start", "TemplateValidationConfigNormalizer.Normalize");

                var _oActionFollowUpApprovalUserDetailsEntity = new ActionFollowUpApprovalUserDetailsEntity();
               
                _oActionFollowUpApprovalUserDetailsEntity.MobileVersionId = 1;
                _oActionFollowUpApprovalUserDetailsEntity.OVGuid = ActionFollowUpApprovalUserDetailsDTO.OVGuid;
                _oActionFollowUpApprovalUserDetailsEntity.ServiceId = ActionFollowUpApprovalUserDetailsDTO.ServiceId;
                _oActionFollowUpApprovalUserDetailsEntity.UserId = ActionFollowUpApprovalUserDetailsDTO.UserId;
                _oActionFollowUpApprovalUserDetailsEntity.UserName = ActionFollowUpApprovalUserDetailsDTO.UserName;

                _oActionFollowUpApprovalUserDetailsEntity.TimeStamp = CurrentDateAndTime;
              
                return _oActionFollowUpApprovalUserDetailsEntity;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Normalizer", "TemplateValidationConfigNormalizer.Normalize", Excep);
            }
        }

    }



