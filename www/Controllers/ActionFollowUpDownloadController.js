
// ############################################################################################################## //

// Created User : Siva Prasad
// Created Date : 09-09-2015 09:30 AM

// Last Updated User : Siva Prasad
// Last Updated Date : 11-09-2015 09:30 PM

// Note : Any updation or changes required, Need to discuss with created user or last updated user or full team

// ############################################################################################################## //


    // Dont change / remove below variables
    var ActionFollowUpProfiles = [];

    // ActionFollowUpDownloadPageConfiguration for displaying content element
    var ActionFollowUpDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };

    // Controller
    MyApp.controller('ActionFollowUpDownloadController', function ($scope, $timeout, xlatService, $location, $routeSegment) {


        var IsNavigate = false;
        var Url;

        ////////////////*********************** Validation for Internet checking before going to ActionFollowUpDownload page when any profile are there only************************ START///////////////////////////
        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
        var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

        // If network is available
        if (NetworkDetails.IsNetworkAvailable == true) {

            //var _oOneViewAppConfig = new OneViewAppConfig();
            //_oOneViewAppConfig.CheckForNewUpdates('');
            //$location.url('/nav/actionfollowupdownloads');
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

            var oActionFollowUpDownloadFacade = new ActionFollowUpDownloadFacade();

            // Initialize page 
            oActionFollowUpDownloadFacade.Init($scope, xlatService);

            // Page load
            oActionFollowUpDownloadFacade.PageLoad($scope, $timeout, xlatService, '', '');

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

            var _oProfileDownloadFacade = new ActionFollowUpDownloadFacade();
            _oProfileDownloadFacade.SelectAllContents($scope, '', xlatService);
        };

        /// <summary>
        /// Profile download event registration
        /// </summary>
        $scope.DownLoad = function () {
            var oActionFollowUpDownloadFacade = new ActionFollowUpDownloadFacade();
            oActionFollowUpDownloadFacade.DownLoad($scope, xlatService, '', '', $location);           
        };


        /// <summary>
        /// GraphSearch event registration
        /// </summary>
        $scope.GraphSearch = function () {
            var oActionFollowUpDownloadFacade = new ActionFollowUpDownloadFacade();
            oActionFollowUpDownloadFacade.GraphSearch($scope, $scope.GraphSearchElement);
        }

        /// <summary>
        /// Change Dimension
        /// </summary>
        $scope.ChangeDimension = function () {
            var oActionFollowUpDownloadFacade = new ActionFollowUpDownloadFacade();
            oActionFollowUpDownloadFacade.ChangeDimension($scope, $timeout, xlatService, '', '');
        }

        $scope.$on('$destroy', function () {
            $scope.Dimension = "Template";
            ActionFollowUpDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };
        });
     
        $scope.UnitChangeEvent = function (Unit) {            
            var oActionFollowUpDownloadFacade = new ActionFollowUpDownloadFacade();
            oActionFollowUpDownloadFacade.UnitChangeEvent($scope, xlatService, Unit);
        }

        $scope.AirlineChangeEvent = function (Airline) {            
            var oActionFollowUpDownloadFacade = new ActionFollowUpDownloadFacade();
            oActionFollowUpDownloadFacade.AirlineChangeEvent($scope, xlatService, Airline);
        }
    })

    // Facade (Assembler code / Work flow code)
    function ActionFollowUpDownloadFacade() {

        // ActionFollowUpDownloadFacade object
        var MyInstance = this;


        /// <summary>
        /// Select all contents
        /// </summary>
        /// <param name="$scope">Current scope</param>   
        /// <param name="xlatService">xlatService for globalization</param>
        this.Init = function ($scope, xlatService) {
            try {
                OneViewConsole.Debug("Init start", "ActionFollowUpDownloadFacade.Init");

                // Registering page name for globalization
                // xlatService.setCurrentPage('ProfileDownload_Page');
                xlatService.setCurrentPage('14');
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

                OneViewConsole.Debug("Init end", "ActionFollowUpDownloadFacade.Init");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDownloadFacade.Init", xlatService);
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
                OneViewConsole.Debug("PageLoad start", "ActionFollowUpDownloadFacade.PageLoad");

                var IsLoadView = true;
                var _oActionFollowUpDownloadPresenter = new ActionFollowUpDownloadPresenter();
                _oActionFollowUpDownloadPresenter.PageLoad($scope, $timeout, xlatService, toaster, SpinService);
              
                $scope.Selectedfacilitys = [];

                if (ActionFollowUpDownloadPageConfiguration.ContentElement == "TemplateNode") {
                    LoadTemplateContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService);
                }
                    //Load all Dc places if Content element is Dc place
                else {
                    //var IsSuccess = LoadUnits($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService);
                    //IsLoadView = IsSuccess;
                 
                    //if (IsSuccess == true) {
                    //    var IsSuccess = LoadAirlines($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService, $scope.Unit.Id);
                    //    if (IsSuccess == true) {
                    //        LoadPlaceContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService, $scope.Airline.Id);
                    //    }
                    //}

                    //if (IsLoadView == false) {
                    //    $scope.ImmediateParentColumn = false;
                    //    alert(xlatService.xlat('NoProfiles'));
                    //}
                 LoadPlaceContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService);
                 
                }


                OneViewConsole.Debug("PageLoad end", "ActionFollowUpDownloadFacade.PageLoad");
                return IsLoadView;
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDownloadFacade.PageLoad", xlatService);
            }
        }


        this.UnitChangeEvent = function ($scope, xlatService, Parent) {
            try {
                OneViewConsole.Debug("UnitChangeEvent start", "ActionFollowUpDownloadFacade.UnitChangeEvent");

                oSetDefaultSpinner.Start();

                var IsSuccess = LoadAirlines($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), '', '', xlatService, Parent.Id);
                if (IsSuccess == true) {
                    LoadPlaceContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), '', '', xlatService, $scope.Airline.Id);
                }

                oSetDefaultSpinner.Stop();
               
                OneViewConsole.Debug("UnitChangeEvent end", "ActionFollowUpDownloadFacade.UnitChangeEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDownloadFacade.UnitChangeEvent", xlatService);
            }
        }

        this.AirlineChangeEvent = function ($scope, xlatService, Parent) {
            try {
                OneViewConsole.Debug("AirlineChangeEvent start", "ActionFollowUpDownloadFacade.AirlineChangeEvent");

                oSetDefaultSpinner.Start();
               
                LoadPlaceContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), '', '', xlatService, Parent.Id);

                oSetDefaultSpinner.Stop();

                OneViewConsole.Debug("AirlineChangeEvent end", "ActionFollowUpDownloadFacade.AirlineChangeEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDownloadFacade.AirlineChangeEvent", xlatService);
            }
        }
     
        var LoadUnits = function ($scope, UserId, ServiceId, SpinService, toaster, xlatService) {
            try {
                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
                $scope.UnitList = [];

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpDownloadFacade.LoadImmediateParentPlaces");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    var UserProfileViewLst = "";                    
                    
                    //Load all template nodes      
                    UserProfileViewLst = new ActionFollowUpDownloadIL(toaster).GetParentPlacesByDATType(ServiceId, UserId, 0, DATEntityType.RCOMaster_Kitchen, (IsGlobalCleaningProfiledownloadView == true) ? DATEntityType.RCOMaster_CleaningType : DATEntityType.RCOMaster_Flight);

                    //Adding user profile list datas into selected facilitys array list
                    if (UserProfileViewLst != null) {

                        UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                        if (UserProfileViewLst.length > 0) {
                            for (r = 0; r < UserProfileViewLst.length; r++) {                             
                                $scope.UnitList.push({ Name: UserProfileViewLst[r].Name, Id: UserProfileViewLst[r].Id });
                            }
                            $scope.Unit = $scope.UnitList[0];
                            return true;
                        }
                        else {
                            return false;
                        }
                    }

                }
                    //If internet connection is not available
                else {
                    return false;
                    // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                    alert(xlatService.xlat('NoInternetConnection'));
                    OneViewConsole.Info("No Internet Connection", "ActionFollowUpDownloadFacade.LoadImmediateParentPlaces");
                }

                OneViewConsole.Debug("LoadUnits end", "ActionFollowUpDownloadFacade.LoadImmediateParentPlaces");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDownloadFacade.LoadImmediateParentPlaces", xlatService);
            }
        }

        var LoadAirlines = function ($scope, UserId, ServiceId, SpinService, toaster, xlatService, ParentId) {
            try {
                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
                $scope.AirlineList = [];

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpDownloadFacade.LoadImmediateParentPlaces");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    var UserProfileViewLst = "";
                    
                    //Load all template nodes      
                    UserProfileViewLst = new ActionFollowUpDownloadIL(toaster).GetParentPlacesByDATType(ServiceId, UserId, ParentId, (IsGlobalCleaningProfiledownloadView == true) ? DATEntityType.RCOMaster_CleaningSection : DATEntityType.RCOMaster_Airline, (IsGlobalCleaningProfiledownloadView == true) ? DATEntityType.RCOMaster_CleaningType : DATEntityType.RCOMaster_Flight);

                    //Adding user profile list datas into selected facilitys array list
                    if (UserProfileViewLst != null) {

                        UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                        if (UserProfileViewLst.length > 0) {
                            for (r = 0; r < UserProfileViewLst.length; r++) {
                                $scope.AirlineList.push({ Name: UserProfileViewLst[r].Name, Id: UserProfileViewLst[r].Id });
                            }
                            $scope.Airline = $scope.AirlineList[0];
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                    //If internet connection is not available
                else {
                    return false;
                    // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                    alert(xlatService.xlat('NoInternetConnection'));
                    OneViewConsole.Info("No Internet Connection", "ActionFollowUpDownloadFacade.LoadImmediateParentPlaces");
                }

                OneViewConsole.Debug("LoadAirlines end", "ActionFollowUpDownloadFacade.LoadImmediateParentPlaces");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDownloadFacade.LoadImmediateParentPlaces", xlatService);
            }
        }

        /// <summary>
        /// Select all contents
        /// </summary>
        /// <param name="$scope">Current scope</param>   
        /// <param name="SpinService">SpinService for loader</param>
        this.SelectAllContents = function ($scope, SpinService, xlatService) {
            try {
                OneViewConsole.Debug("SelectAllContents start", "ActionFollowUpDownloadFacade.SelectAllContents");

                var _oActionFollowUpDownloadPresenter = new ActionFollowUpDownloadPresenter();
                _oActionFollowUpDownloadPresenter.SelectAllContents($scope);

                OneViewConsole.Debug("SelectAllContents end", "ActionFollowUpDownloadFacade.SelectAllContents");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDownloadFacade.SelectAllContents", xlatService);
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
                OneViewConsole.Debug("DownLoad start", "ActionFollowUpDownloadFacade.DownLoad");

                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpDownloadFacade.DownLoad");

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
                            alert(xlatService.xlat('NoTemplatesSelected'));
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
                            alert(xlatService.xlat('NoPlacesSelected'));                            
                        }
                    }
                }
                else {
                    alert(xlatService.xlat('NoInternetConnection'));                   
                    OneViewConsole.Info("No Internet Connection", "ActionFollowUpDownloadFacade.DownLoadProfile");
                }

                OneViewConsole.Debug("DownLoad end", "ActionFollowUpDownloadFacade.DownLoad");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDownloadFacade.DownLoad", xlatService);
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
                var _oActionFollowUpDownloadPresenter = new ActionFollowUpDownloadPresenter();
                var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

                var IsActionFollowUpInfoSuccess = false;
                var IsRollBack = false;

                try {
                    OneViewConsole.Debug("DefaultProfiledownload transaction start", "ActionFollowUpDownloadFacade.DefaultProfiledownload");

                    _oOneViewSqlitePlugin.StartTransaction();

                    IsActionFollowUpInfoSuccess = DownloadActionFollowUpInfo(FilterParams, xlatService, false);
                    //alert('IsActionFollowUpInfoSuccess : ' + IsActionFollowUpInfoSuccess);
                   
                    if (IsActionFollowUpInfoSuccess == null) {
                        
                        OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                        _oOneViewSqlitePlugin.Rollback();
                        OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                    }
                    else {
                        if (IsActionFollowUpInfoSuccess == false) {

                            OneViewConsole.Debug("IsActionFollowUpInfo Success : " + IsActionFollowUpInfoSuccess, "ActionFollowUpDownloadFacade.DefaultProfiledownload");

                            OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                            _oOneViewSqlitePlugin.Rollback();
                            OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpDownloadFacade.DefaultProfiledownload");

                            IsRollBack = true;
                        }

                        if (IsRollBack == false) {
                            _oOneViewSqlitePlugin.EndTransaction();
                            OneViewConsole.Debug("DefaultProfiledownload transaction commit", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                        }
                    }
                }
                catch (Excep) {                  
                    OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                    _oOneViewSqlitePlugin.Rollback();
                    OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
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
                var _oActionFollowUpDownloadPresenter = new ActionFollowUpDownloadPresenter();
                var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

                oOneViewProgressbar.Start("Downloading");
                oOneViewProgressbar.SetProgressValue(25);

                var IsActionFollowUpInfoSuccess = false;
                var IsRollBack = false;

                try {
                    OneViewConsole.Debug("DefaultProfiledownload transaction start", "ActionFollowUpDownloadFacade.DefaultProfiledownload");

                    _oOneViewSqlitePlugin.StartTransaction();
                    oOneViewProgressbar.SetProgressValue(10);

                    IsActionFollowUpInfoSuccess = DownloadActionFollowUpInfo(FilterParams, xlatService, true);
                    //alert('IsActionFollowUpInfoSuccess : ' + IsActionFollowUpInfoSuccess);
                    oOneViewProgressbar.SetProgressValue(75);

                    if (IsActionFollowUpInfoSuccess == null) {
                        oOneViewProgressbar.Stop();

                        OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                        _oOneViewSqlitePlugin.Rollback();
                        OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                    }
                    else {
                        if (IsActionFollowUpInfoSuccess == true) {

                            oOneViewProgressbar.SetProgressValue(80);

                            SetLastResetDate();
                            UpdateDownloadStatus($scope, FilterParams);

                            oOneViewProgressbar.SetProgressValue(100);
                            oOneViewProgressbar.Stop();

                            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                            oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Navigate_confirm_Message'), function (ConfirmationId) {

                                if (ConfirmationId == "2") {
                                    $location.url('/nav/my-actions');
                                    $scope.$apply();
                                }
                                else {
                                    $scope.$apply();
                                }
                            });
                        }
                        else {
                            oOneViewProgressbar.Stop();
                            _oActionFollowUpDownloadPresenter.ShowDownloadFailed(xlatService);

                            OneViewConsole.Debug("IsActionFollowUpInfo Success : " + IsActionFollowUpInfoSuccess, "ActionFollowUpDownloadFacade.DefaultProfiledownload");

                            OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                            _oOneViewSqlitePlugin.Rollback();
                            OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpDownloadFacade.DefaultProfiledownload");

                            IsRollBack = true;
                        }

                        if (IsRollBack == false) {
                            _oOneViewSqlitePlugin.EndTransaction();
                            OneViewConsole.Debug("DefaultProfiledownload transaction commit", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                        }

                        $scope.$apply();
                    }

                    oOneViewProgressbar.Stop();
                }
                catch (Excep) {
                    oOneViewProgressbar.Stop();
                    _oActionFollowUpDownloadPresenter.ShowDownloadFailed(xlatService);

                    OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                    _oOneViewSqlitePlugin.Rollback();
                    OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ActionFollowUpDownloadFacade.DefaultProfiledownload");
                }
            }
            catch (Excep) {               
                throw oOneViewExceptionHandler.Create("Facade", "ActionFollowUpDownloadFacade.DefaultProfiledownload", Excep);
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

                for (var i = 0; i < ActionFollowUpProfiles.length; i++) {

                    var IsSuccess = IsSearchElementsExist(ActionFollowUpProfiles[i].label, GraphSearchElement);
                   
                    if (IsSuccess == true) {
                        SearchedProfiles[SearchedProfilesIndex] = ActionFollowUpProfiles[i];
                        SearchedProfilesIndex += 1;
                    }
                }

                $scope.Selectedfacilitys = SearchedProfiles;
            }
            else {
                $scope.Selectedfacilitys = ActionFollowUpProfiles;
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
                        //alert(xlatService.xlat('NoProfiles'));
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
                oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDownloadFacade.ChangeDimension", xlatService);
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
                throw oOneViewExceptionHandler.Create("Facade", "ActionFollowUpDownloadFacade.IsSearchElementsExist", Excep);
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
                OneViewConsole.Debug("SetLastResetDate start", "ActionFollowUpDownloadFacade.SetLastResetDate");

                if (OneViewLocalStorage.Get("LastResetDate") == null) {
                    var oDateTime = new DateTime();
                    var CurrentDate = oDateTime.GetDate();
                    OneViewLocalStorage.Save("LastResetDate", CurrentDate);
                }

                OneViewConsole.Debug("SetLastResetDate end", "ActionFollowUpDownloadFacade.SetLastResetDate");

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
                OneViewConsole.Debug("LoadTemplateContentBlock start", "ActionFollowUpDownloadFacade.LoadTemplateContentBlock");

                ActionFollowUpProfiles = [];

                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpDownloadFacade.LoadTemplateContentBlock");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    var UserProfileViewLst = "";
                    $scope.Selectedfacilitys = [];                   
                    var _oActionFollowUpDAO = new ActionFollowUpDAO();

                    //Load all template nodes      
                    UserProfileViewLst = new ActionFollowUpDownloadIL(toaster).GetProfileTemplateView(ServiceId, UserId);
                   
                    //Adding user profile list datas into selected facilitys array list
                    if (UserProfileViewLst != null) {

                        UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                        if (UserProfileViewLst.length > 0) {
                            for (r = 0; r < UserProfileViewLst.length; r++) {
                                var IsDownloaded = false;                                
                                IsDownloaded = _oActionFollowUpDAO.IsTemplateExist(ServiceId, UserId, UserProfileViewLst[r].Id);
                               
                                //$scope.Selectedfacilitys.push({ label: UserProfileViewLst[r].Name, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
                                ActionFollowUpProfiles.push({ label: UserProfileViewLst[r].Name, ActionCount: UserProfileViewLst[r].ActionCount, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
                                $scope.Selectedfacilitys = ActionFollowUpProfiles;
                            }
                        }
                        else {
                            // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoProfiles'));
                            alert(xlatService.xlat('NoProfiles'));
                            OneViewConsole.Info("NoProfiles", "ActionFollowUpDownloadFacade.LoadTemplateContentBlock");
                        }
                    }
                }
                    //If internet connection is not available
                else {

                    // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                    alert(xlatService.xlat('NoInternetConnection'));
                    OneViewConsole.Info("No Internet Connection", "ActionFollowUpDownloadFacade.LoadTemplateContentBlock");
                }

                OneViewConsole.Debug("LoadTemplateContentBlock end", "ActionFollowUpDownloadFacade.LoadTemplateContentBlock");
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
                OneViewConsole.Debug("LoadPlaceContentBlock start", "ActionFollowUpDownloadFacade.LoadPlaceContentBlock");

                ActionFollowUpProfiles = [];

                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpDownloadFacade.LoadPlaceContentBlock");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    var UserProfileViewLst = "";
                    $scope.Selectedfacilitys = [];                    
                    var _oActionFollowUpDAO = new ActionFollowUpDAO();
                
                    //UserProfileViewLst = new ActionFollowUpDownloadIL(toaster).GetProfileDcPlaceView(ServiceId, UserId, ParentNodeId, (IsGlobalCleaningProfiledownloadView == true) ? DATEntityType.RCOMaster_CleaningType : DATEntityType.RCOMaster_Flight);
                    UserProfileViewLst = new ActionFollowUpDownloadIL(toaster).GetProfileDcPlaceView(ServiceId, UserId);
                    //alert("UserProfileViewLst : " + JSON.stringify(UserProfileViewLst));
                    //Adding user profile list datas into selected facilitys array list
                    if (UserProfileViewLst != null) {

                        UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                        if (UserProfileViewLst.length > 0) {
                            for (r = 0; r < UserProfileViewLst.length; r++) {
                                var IsDownloaded = false;                                
                                IsDownloaded = _oActionFollowUpDAO.IsDcPlaceExist(ServiceId, UserId, UserProfileViewLst[r].Id);
                                
                                //$scope.Selectedfacilitys.push({ label: UserProfileViewLst[r].Name, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
                                ActionFollowUpProfiles.push({ label: UserProfileViewLst[r].Name, ActionCount: UserProfileViewLst[r].ActionCount, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
                                $scope.Selectedfacilitys = ActionFollowUpProfiles;
                            }
                        }
                        else {
                            // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoProfiles'));
                            //alert(xlatService.xlat('NoProfiles'));
                            alert(xlatService.xlat('No Places available'));
                            OneViewConsole.Info("NoProfiles", "ActionFollowUpDownloadFacade.LoadPlaceContentBlock");
                        }
                    }
                }
                    //If internet connection is not available
                else {

                    // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                    alert(xlatService.xlat('NoInternetConnection'));
                    OneViewConsole.Info("No Internet Connection", "ActionFollowUpDownloadFacade.LoadPlaceContentBlock");
                }

                OneViewConsole.Debug("LoadPlaceContentBlock end", "ActionFollowUpDownloadFacade.LoadPlaceContentBlock");
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
                OneViewConsole.Debug("NormalizeDownloadDataReqParm start", "ActionFollowUpDownloadFacade.NormalizeDownloadDataReqParm");

                var filterList = [];

                var reqParm = { OSGuid: ServiceId, UserId: UserId, TemplateId: '', FromDate: '', ToDate: '', DcPlaceDimension: 0, DcPlaceIds: '' };

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
                OneViewConsole.Debug("NormalizeDownloadDataReqParm end", "ActionFollowUpDownloadFacade.NormalizeDownloadDataReqParm");
                return reqParm;
            }
            catch (Excep) {
                throw Excep;
            }
        }

        
        /// <summary>
        /// API for download TemplatValidationConfigMetaData
        /// </summary
        var DownloadActionFollowUpInfo = function (DownloadList, xlatService, ShowExceptionMessage) {

            var IsActionFollowUpInfoSuccess = false;

            try {
                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpDownloadFacade.DownloadActionFollowUpInfo");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    //alert("DownloadList : " + JSON.stringify(DownloadList));

                    var ActionFollowUpDTO = new ActionFollowUpDownloadIL().DownloadActionFollowUpInfo(DownloadList, ShowExceptionMessage);                    
                    oOneViewProgressbar.SetProgressValue(25);

                    //alert(ActionFollowUpDTO.IsAnyException);
                    //alert(ActionFollowUpDTO.ExceptionMessage);
                   
                    if (ActionFollowUpDTO != null && ActionFollowUpDTO.IsAnyException == false) {
                       
                        if (ActionFollowUpDTO.ActionFollowUpInfoDTOLst.length > 0) {

                            var _oActionFollowUpDownloadBO = new ActionFollowUpDownloadBO();

                            var UserMasterDTOLst = new MasterNormalizer().NormalizeList("UserMasterEntity", ActionFollowUpDTO.UserMasterDTOLst);
                            _oActionFollowUpDownloadBO.InsertUserMaters(UserMasterDTOLst);

                            var BandMasterDTOLst = new MasterNormalizer().NormalizeList("BandMasterEntity", ActionFollowUpDTO.BandMasterDTOLst);
                            _oActionFollowUpDownloadBO.InsertBandMaters(BandMasterDTOLst);

                            var BandDetailsMasterDTOLst = new MasterNormalizer().NormalizeList("BandDetailsMasterEntity", ActionFollowUpDTO.BandDetailsMasterDTOLst);
                            _oActionFollowUpDownloadBO.InsertBandDetailMaters(BandDetailsMasterDTOLst);

                            oOneViewProgressbar.SetProgressValue(30);
                          
                            var ActionFollowUpInfoDTOLst = new ActionFollowUpInfoNormalizer().NormalizeList(ActionFollowUpDTO.ActionFollowUpInfoDTOLst,'false');                          
                            IsActionFollowUpInfoSuccess = _oActionFollowUpDownloadBO.InsertActionFollowUpInfo(ActionFollowUpInfoDTOLst);

                            if (IsActionFollowUpInfoSuccess == true) {                            
                                var MultiMediaSubElementsDTOLst = new MultiMediaSubElementsNormalizer().NormalizeList(ActionFollowUpDTO.MultiMediaSubElementsDTOLst);
                                IsActionFollowUpInfoSuccess = _oActionFollowUpDownloadBO.InsertMultiMediaSubElements(MultiMediaSubElementsDTOLst, xlatService);
                            }

                            oOneViewProgressbar.SetProgressValue(35);
                            
                            if (IsActionFollowUpInfoSuccess == true && ActionFollowUpDTO.DataCaptureDTO != null && ActionFollowUpDTO.DataCaptureDTO.length != 0) {
                                var HistoryDcData = new DataCaptureNormalizer().NormalizeList(ActionFollowUpDTO.DataCaptureDTO);
                                IsActionFollowUpInfoSuccess = new DcDAO().InsertDCList(HistoryDcData);
                            }
                            
                            if (IsActionFollowUpInfoSuccess == true && ActionFollowUpDTO.Action != null) {                               
                                var _oActionBO = new ActionBO();
                                IsActionFollowUpInfoSuccess = _oActionBO.InsertAction(ActionFollowUpDTO.Action);
                            }

                            oOneViewProgressbar.SetProgressValue(40);

                            DownloadList.DcPlaceIds = [];
                            DownloadList.TemplateId = [];

                            var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
                            var Query = "SELECT DISTINCT TemplateNodeId FROM ActionDataCaptureInfoEntity WHERE TemplateNodeId NOT IN (SELECT TemplateNodeId FROM TemplateConfigMetaData)";                               
                            
                            var DcTemplates = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
                            
                            for (var i = 0; i < DcTemplates.length; i++) {
                                DownloadList.TemplateId.push(DcTemplates[i].TemplateNodeId);
                            }

                            var TemplateConfigDTO = new ProfileDownloadIL('').GetTemplateConfig(DownloadList);
                            oOneViewProgressbar.SetProgressValue(50);
                            
                            if (TemplateConfigDTO != null && TemplateConfigDTO.IsAnyException == false) {

                                if (TemplateConfigDTO.TemplateConfigMetaDataDTOLst.length > 0) {

                                    var oProfileDownloadBO = new ProfileDownloadBO();

                                    var TemplateConfigMetaDataDTOLst = new TemplateConfigNormalizer().NormalizeList(TemplateConfigDTO.TemplateConfigMetaDataDTOLst);                                    
                                    IsActionFollowUpInfoSuccess = oProfileDownloadBO.InsertTemplateConfig(TemplateConfigMetaDataDTOLst);
                                }
                                else {
                                    IsActionFollowUpInfoSuccess = true;
                                }
                            }
                            else {
                                IsActionFollowUpInfoSuccess = (TemplateConfigDTO != null) ? false : TemplateConfigDTO;
                            }

                            var MetaDataDTO = new ProfileDownloadIL('').GetMobileDcPreviewMetadata(DownloadList);
                            oOneViewProgressbar.SetProgressValue(55);
                            
                            if (MetaDataDTO != null && MetaDataDTO.IsAnyException == false) {

                                if (MetaDataDTO.MobileDcPreviewMetadataDTOLst.length > 0) {

                                    var oProfileDownloadBO = new ProfileDownloadBO();

                                    var MobileDcPreviewMetadataDTOLst = new MobileDcPreviewMetadataNormalizer().NormalizeList(MetaDataDTO.MobileDcPreviewMetadataDTOLst);
                                    IsActionFollowUpInfoSuccess = oProfileDownloadBO.InsertMobileDcPreviewMetadata(MobileDcPreviewMetadataDTOLst);
                                }
                                else {
                                    IsActionFollowUpInfoSuccess = true;
                                }
                            }
                            else {
                                IsActionFollowUpInfoSuccess = (MetaDataDTO != null) ? false : MetaDataDTO;
                            }

                            oOneViewProgressbar.SetProgressValue(60);
                        }
                        else {
                            IsActionFollowUpInfoSuccess = true;
                        }
                    }
                    else {
                        IsActionFollowUpInfoSuccess = (ActionFollowUpDTO != null) ? false : ActionFollowUpDTO;
                    }
                }
                    //If no internet connection
                else if (ShowExceptionMessage != false) {
                    IsDownLoadProfileSuccess = false;
                    alert(xlatService.xlat('NoInternetConnection'));
                    OneViewConsole.Info("No Internet Connection", "ActionFollowUpDownloadFacade.DownloadActionFollowUpInfo");
                }
            }
            catch (Excep) {
                IsActionFollowUpInfoSuccess = false;
                throw Excep;
            }

            return IsActionFollowUpInfoSuccess;
        }
    }

    // Presenter
    function ActionFollowUpDownloadPresenter() {

        /// <summary>
        /// Select all contents
        /// </summary>
        this.PageLoad = function ($scope, $timeout, xlatService, toaster, SpinService) {
            try {
                OneViewConsole.Debug("PageLoad start", "ActionFollowUpDownloadPresenter.PageLoad");

                // Bydefault content selection is false for all
                $scope.IsAllSelected = false;

                OneViewConsole.Debug("PageLoad end", "ActionFollowUpDownloadPresenter.PageLoad");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "ActionFollowUpDownloadPresenter.PageLoad", Excep);
            }
        }


        this.ShowDownloadFailed = function (xlatService) {
            try {
                OneViewConsole.Debug("ShowDownloadFailed start", "ActionFollowUpDownloadPresenter.ShowDownloadFailed");

                alert(xlatService.xlat('DownloadFailed'));
                OneViewConsole.Info("Download Failed", "ActionFollowUpDownloadFacade.ShowDownloadFailed");

                OneViewConsole.Debug("ShowDownloadFailed end", "ActionFollowUpDownloadPresenter.ShowDownloadFailed");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "ActionFollowUpDownloadPresenter.ShowDownloadFailed", Excep);
            }           
        }

        /// <summary>
        /// Select all contents
        /// </summary>
        /// <param name="$scope">Current scope</param>
        this.SelectAllContents = function ($scope) {
            try {
                OneViewConsole.Debug("SelectAllContents start", "ActionFollowUpDownloadPresenter.SelectAllContents");

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

                OneViewConsole.Debug("SelectAllContents end", "ActionFollowUpDownloadPresenter.SelectAllContents");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "ActionFollowUpDownloadPresenter.SelectAllContents", Excep);
            }
        }
    }

    // Integration
    function ActionFollowUpDownloadIL() {

        // ActionFollowUpDownloadIL object
        var MyInstance = this;

        /// <summary>
        /// Ajax call for get all templates
        /// </summary>
        /// <param name="OSGuid">Service id</param>
        /// <param name="UserId">User id</param>
        /// <returns>Template list</returns>       
        this.GetProfileTemplateView = function (OSGuid, UserId) {
            try {
                OneViewConsole.Debug("GetProfileTemplateView start", "ActionFollowUpDownloadIL.GetProfileTemplateView");

                var RequestParam = { "OSGuid": OSGuid, "UserId": UserId };

                OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "ActionFollowUpDownloadIL.GetProfileTemplateView");

                var _oOneViewChannel = new OneViewChannel();
                // _oOneViewChannel.toaster = toaster;
                _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetActionTemplate";
                _oOneViewChannel.parameter = JSON.stringify(RequestParam);
                var oUserTemplateViewLst = _oOneViewChannel.Send();

                OneViewConsole.Debug("GetProfileTemplateView end", "ActionFollowUpDownloadIL.GetProfileTemplateView");

                if (oUserTemplateViewLst != null) {

                    OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUserTemplateViewLst.GetActionTemplateResult), "ActionFollowUpDownloadIL.GetProfileTemplateView");

                    return oUserTemplateViewLst.GetActionTemplateResult;
                }
                else {
                    return oUserTemplateViewLst;
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "ActionFollowUpDownloadIL.GetProfileTemplateView", Excep);
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

                OneViewConsole.Debug("GetProfileDcPlaceView start", "ActionFollowUpDownloadIL.GetProfileDcPlaceView");

                //var RequestParam = { "OSGuid": OSGuid, "UserId": UserId, "ParentNodeId": ParentNodeId, "DCPlaceRCOType": DCPlaceRCOType };
                var RequestParam = { "OSGuid": OSGuid, "UserId": UserId };

                OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "ActionFollowUpDownloadIL.GetProfileDcPlaceView");

                var _oOneViewChannel = new OneViewChannel();
                // _oOneViewChannel.toaster = toaster;
                _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetActionPlace";
                _oOneViewChannel.parameter = JSON.stringify(RequestParam);
                var oUserDcPlaceViewLst = _oOneViewChannel.Send();

                OneViewConsole.Debug("GetProfileDcPlaceView end", "ActionFollowUpDownloadIL.GetProfileDcPlaceView");

                if (oUserDcPlaceViewLst != null) {

                    OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUserDcPlaceViewLst.GetActionPlaceResult), "ActionFollowUpDownloadIL.GetProfileDcPlaceView");

                    return oUserDcPlaceViewLst.GetActionPlaceResult;
                }
                else {
                    return oUserDcPlaceViewLst;
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "ActionFollowUpDownloadIL.GetProfileDcPlaceView", Excep);
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

                OneViewConsole.Debug("GetProfileDcPlaceView start", "ActionFollowUpDownloadIL.GetProfileDcPlaceView");

                var RequestParam = { "OSGuid": OSGuid, "UserId": UserId, "ImmediateParentId": ImmediateParentId, "DcChildPlaceRCOType": DcChildPlaceRCOType, "DCPlaceRCOType": DCPlaceRCOType };

                OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "ActionFollowUpDownloadIL.GetProfileDcPlaceView");

                var _oOneViewChannel = new OneViewChannel();
                // _oOneViewChannel.toaster = toaster;
                _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetParentPlacesByDATType";
                _oOneViewChannel.parameter = JSON.stringify(RequestParam);
                var oUserDcPlaceViewLst = _oOneViewChannel.Send();

                OneViewConsole.Debug("GetProfileDcPlaceView end", "ActionFollowUpDownloadIL.GetProfileDcPlaceView");

                if (oUserDcPlaceViewLst != null) {

                    OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUserDcPlaceViewLst.GetParentPlacesByDATTypeResult), "ActionFollowUpDownloadIL.GetProfileDcPlaceView");

                    return oUserDcPlaceViewLst.GetParentPlacesByDATTypeResult;
                }
                else {
                    return oUserDcPlaceViewLst;
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "ActionFollowUpDownloadIL.GetProfileDcPlaceView", Excep);
            }
        }


        /// <summary>
        /// Ajax call for Download ActionFollowUp      
        /// </summary>
        /// <param name="DownloadList"></param>
        /// <returns>MetaData list</returns>  
        this.DownloadActionFollowUpInfo = function (DownloadList, ShowExceptionMessage) {
            try {
                OneViewConsole.Debug("DownloadActionFollowUpInfo start", "ActionFollowUpDownloadIL.DownloadActionFollowUpInfo");

                var RequestParam = JSON.stringify(DownloadList);

                OneViewConsole.DataLog("Request from device : " + RequestParam, "ActionFollowUpDownloadIL.DownloadActionFollowUpInfo");

                var _oOneViewChannel = new OneViewChannel();
                          
                _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetAction_Json";
                _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
                var oActionFollowUp = _oOneViewChannel.Send({ "ShowExceptionMessage": (ShowExceptionMessage != undefined) ? ShowExceptionMessage : true });

                if (oActionFollowUp != null) {
                    oActionFollowUp = JSON.parse(oActionFollowUp.GetAction_JsonResult);

                    OneViewConsole.DataLog("Response from server : " + oActionFollowUp.GetAction_JsonResult, "ActionFollowUpDownloadIL.DownloadActionFollowUpInfo");
                    return oActionFollowUp;
                }
                else {
                    return oActionFollowUp;
                }

                OneViewConsole.Debug("DownloadActionFollowUp end", "ActionFollowUpDownloadIL.DownloadActionFollowUpInfo");

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "ActionFollowUpDownloadIL.DownloadActionFollowUpInfo", Excep);
            }
        }
    }
    
    // ActionFollowUpDownloadBO
    function ActionFollowUpDownloadBO() {

        /// <summary>
        /// Insert User Masters
        /// </summary>
        /// <param name="UserEntitieslst">User entity list</param>
        /// <returns>true or false</returns>  
        this.InsertUserMaters = function (UserEntitieslst) {
            try {
                OneViewConsole.Debug("InsertUserMaters start", "ActionFollowUpDownloadBO.InsertUserMaters");

                var _oDefaultMasterDAO = new DefaultMasterDAO("UserMasterEntity");
                var Count = _oDefaultMasterDAO.Count();

                // User Master data insertion
                for (i = 0; i < UserEntitieslst.length; i++) {
                    _oDefaultMasterDAO.DeleteByServerId(UserEntitieslst[i].ServerId);
                    _oDefaultMasterDAO.Create(UserEntitieslst[i], Count);
                    Count += 1;
                }

                OneViewConsole.Debug("InsertUserMaters end", "ActionFollowUpDownloadBO.InsertUserMaters");

                return true;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDownloadBO.InsertUserMaters", Excep);
            }
        }

        /// <summary>
        /// Insert Band Masters
        /// </summary>
        /// <param name="BandEntitieslst">Band entity list</param>
        /// <returns>true or false</returns>  
        this.InsertBandMaters = function (BandEntitieslst) {
            try {
                OneViewConsole.Debug("InsertBandMaters start", "ActionFollowUpDownloadBO.InsertBandMaters");

                var _oDefaultMasterDAO = new DefaultMasterDAO("BandMasterEntity");
                var Count = _oDefaultMasterDAO.Count();

                // User Master data insertion
                for (i = 0; i < BandEntitieslst.length; i++) {
                    _oDefaultMasterDAO.DeleteByServerId(BandEntitieslst[i].ServerId);
                    _oDefaultMasterDAO.Create(BandEntitieslst[i], Count);
                    Count += 1;
                }

                OneViewConsole.Debug("InsertBandMaters end", "ActionFollowUpDownloadBO.InsertBandMaters");

                return true;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDownloadBO.InsertBandMaters", Excep);
            }
        }

        /// <summary>
        /// Insert Band Details Masters
        /// </summary>
        /// <param name="BandDetailsEntitieslst">Band Details entity list</param>
        /// <returns>true or false</returns>  
        this.InsertBandDetailMaters = function (BandDetailsEntitieslst) {
            try {
                OneViewConsole.Debug("InsertBandDetailMaters start", "ActionFollowUpDownloadBO.InsertBandDetailMaters");

                var _oDefaultMasterDAO = new DefaultMasterDAO("BandDetailsMasterEntity");
                var Count = _oDefaultMasterDAO.Count();

                // User Master data insertion
                for (i = 0; i < BandDetailsEntitieslst.length; i++) {
                    _oDefaultMasterDAO.DeleteByServerId(BandDetailsEntitieslst[i].ServerId);
                    _oDefaultMasterDAO.Create(BandDetailsEntitieslst[i], Count);
                    Count += 1;
                }

                OneViewConsole.Debug("InsertBandDetailMaters end", "ActionFollowUpDownloadBO.InsertBandDetailMaters");

                return true;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDownloadBO.InsertBandDetailMaters", Excep);
            }
        }

        /// <summary>
        /// Insert all ActionFollowUpInfo list
        /// </summary>
        /// <param name="ActionFollowUpInfoLst">ActionFollowUpInfo list</param>
        /// <returns>true or false</returns>  
        this.InsertActionFollowUpInfo = function (ActionFollowUpInfoLst) {
            try {
                OneViewConsole.Debug("InsertActionFollowUpInfo start", "ActionFollowUpDownloadBO.InsertActionFollowUpInfo");
              
                var _oActionFollowUpDefaultMasterDAO = new DefaultMasterDAO("ActionFollowUpInfoEntity");
                var _oActionDataCaptureDefaultMasterDAO = new DefaultMasterDAO("ActionDataCaptureInfoEntity");

                var _oActionFollowUpDAO = new ActionFollowUpDAO();
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
                    var oActionFollowUp = _oActionFollowUpDAO.GetByAllDimensions(ActionFollowUpInfoLst[i].ServiceId, ActionFollowUpInfoLst[i].ActionProfileId, ActionFollowUpInfoLst[i].FollowUpUserId, ActionFollowUpInfoLst[i].ActionDetailsId);

                    // If its not available, create new 
                    if (oActionFollowUp.length == 0) {
                        
                        _oActionFollowUpDefaultMasterDAO.Create(ActionFollowUpInfoLst[i], ActionFollowUpCount);

                        ActionFollowUpCount += 1;
                    }

                    // If its available              
                    else {
                    }
                }

                OneViewConsole.Debug("InsertActionFollowUpInfo end", "ActionFollowUpDownloadBO.InsertActionFollowUpInfo");

                return true;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDownloadBO.InsertActionFollowUpInfo", Excep);
            }
        }


        /// <summary>
        /// Insert MultiMediaSubElements list
        /// </summary>
        /// <param name="MultiMediaSubElementsLst">MultiMediaSubElements list</param>
        /// <returns>true or false</returns>  
        this.InsertMultiMediaSubElements = function (MultiMediaSubElementsLst, xlatService) {
            try {
                OneViewConsole.Debug("InsertMultiMediaSubElements start", "ActionFollowUpDownloadBO.InsertMultiMediaSubElements");

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

                OneViewConsole.Debug("InsertMultiMediaSubElements end", "ActionFollowUpDownloadBO.InsertMultiMediaSubElements");
            }
            catch (Excep) {              
                IsSuccess = false;
                throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDownloadBO.InsertMultiMediaSubElements", Excep);              
            }

            return IsSuccess;
        }
    }

    //ActionFollowUpInfo Normalizer
    function ActionFollowUpInfoNormalizer() {
        
        // ActionFollowUpInfoNormalizer object
        var MyInstance = this;

        var _oDateTime = new DateTime();
        var CurrentDateAndTime = _oDateTime.GetDateAndTime();

        var oActionDataCaptureInfoNormalizer = new ActionDataCaptureInfoNormalizer();

        /// <summary>
        /// DTO to ActionFollowUpInfoDTO conversion
        /// </summary>
        /// <param name="ActionFollowUpInfoDTO">ActionFollowUpInfoDTO DTO (DTO from server)</param>
        /// <returns>ActionFollowUpInfoDTO (Mobile entity format)</returns> 
        this.Normalize = function (ActionFollowUpInfoDTO,IsForApproval) {
            try {
                OneViewConsole.Debug("Normalize start", "TemplateValidationConfigNormalizer.Normalize");

                var _oActionFollowUpInfoEntity = new ActionFollowUpInfoEntity();

                _oActionFollowUpInfoEntity.ServiceId = ActionFollowUpInfoDTO.ServiceId;
                _oActionFollowUpInfoEntity.MobileVersionId = 1;

                _oActionFollowUpInfoEntity.ActionProfileOVGuid = ActionFollowUpInfoDTO.ActionProfileOVGuid;
                _oActionFollowUpInfoEntity.ActionProfileId = ActionFollowUpInfoDTO.ActionProfileId;

                _oActionFollowUpInfoEntity.FollowUpUserId = ActionFollowUpInfoDTO.FollowUpUserId;
                _oActionFollowUpInfoEntity.FollowUpUserName = ActionFollowUpInfoDTO.FollowUpUserName;

                _oActionFollowUpInfoEntity.ActionId = ActionFollowUpInfoDTO.ActionId;
                _oActionFollowUpInfoEntity.ActionDetailsId = ActionFollowUpInfoDTO.ActionDetailsId;
                _oActionFollowUpInfoEntity.PredefinedActionId = ActionFollowUpInfoDTO.PredefinedActionId;
                _oActionFollowUpInfoEntity.PredefinedActionName = ActionFollowUpInfoDTO.PredefinedActionName;
                _oActionFollowUpInfoEntity.CustomAction = ActionFollowUpInfoDTO.CustomAction;
                _oActionFollowUpInfoEntity.FormActionDataCaptureId = ActionFollowUpInfoDTO.FormActionDataCaptureId;

                _oActionFollowUpInfoEntity.ActionComments = ActionFollowUpInfoDTO.ActionComments;
                _oActionFollowUpInfoEntity.ActionRaisedDate = ActionFollowUpInfoDTO.ActionRaisedDate;

                _oActionFollowUpInfoEntity.RectificationTime = ActionFollowUpInfoDTO.RectificationTime;
                _oActionFollowUpInfoEntity.ActionRaisedUserId = ActionFollowUpInfoDTO.ActionRaisedUserId;
                _oActionFollowUpInfoEntity.ActionRaisedUserName = ActionFollowUpInfoDTO.ActionRaisedUserName;
                _oActionFollowUpInfoEntity.AnonymousActionRaisedUserInfo = ActionFollowUpInfoDTO.AnonymousActionRaisedUserInfo;

                if (ActionFollowUpInfoDTO.ActionNCRuleInfo != null) {
                    _oActionFollowUpInfoEntity.ActionNCRuleInfo = JSON.stringify(JSON.parse(ActionFollowUpInfoDTO.ActionNCRuleInfo));
                }
                if (ActionFollowUpInfoDTO.ActionAttributeInfo != null) {
                    _oActionFollowUpInfoEntity.ActionAttributeInfo = JSON.stringify(JSON.parse(ActionFollowUpInfoDTO.ActionAttributeInfo));
                }

                _oActionFollowUpInfoEntity.ActionMultimediaClientGuids = ActionFollowUpInfoDTO.ActionMultimediaClientGuids;
                _oActionFollowUpInfoEntity.ActionDetailsMultimediaClientGuids = ActionFollowUpInfoDTO.ActionDetailsMultimediaClientGuids;
                
                _oActionFollowUpInfoEntity.AttributeIds = ActionFollowUpInfoDTO.AttributeIds;
                _oActionFollowUpInfoEntity.AttributeNames = ActionFollowUpInfoDTO.AttributeNames;
              
                _oActionFollowUpInfoEntity.CreatedDate = CurrentDateAndTime;
                _oActionFollowUpInfoEntity.LastsyncDate = CurrentDateAndTime;

                _oActionFollowUpInfoEntity.ActionDataCaptureInfoEntity = oActionDataCaptureInfoNormalizer.Normalize(ActionFollowUpInfoDTO.ActionDataCaptureInfoDTO);
                
               
                if(IsForApproval==undefined || IsForApproval==""||IsForApproval==null){
                  
                    _oActionFollowUpInfoEntity.IsForApproval= "false";
                }
                else{
                    _oActionFollowUpInfoEntity.IsForApproval=IsForApproval;
                }
                
                
                return _oActionFollowUpInfoEntity;
            }
            catch (Excep) {              
                throw oOneViewExceptionHandler.Create("Normalizer", "TemplateValidationConfigNormalizer.Normalize", Excep);
            }
        }


        /// <summary>
        /// DTO list to ActionFollowUpInfo list conversion
        /// </summary>
        /// <param name="ActionFollowUpInfoDTOList">ActionFollowUpInfo list dto (DTO from server)</param>
        /// <returns>ActionFollowUpInfo list (Mobile entity format)</returns> 
        this.NormalizeList = function (ActionFollowUpInfoDTOList,IsForApproval) {
            try {
                OneViewConsole.Debug("NormalizeList start", "ActionFollowUpInfoNormalizer.NormalizeList");

                var ActionFollowUpInfoList = new Array();
                for (var i = 0; i < ActionFollowUpInfoDTOList.length; i++) {
                    ActionFollowUpInfoList[i] = MyInstance.Normalize(ActionFollowUpInfoDTOList[i],IsForApproval);
                }

                OneViewConsole.Debug("NormalizeList end", "ActionFollowUpInfoNormalizer.NormalizeList");

                return ActionFollowUpInfoList;
            }
            catch (Excep) {               
                throw oOneViewExceptionHandler.Create("Normalizer", "ActionFollowUpInfoNormalizer.NormalizeList", Excep);
            }
        }
    }

    //ActionDataCaptureInfo Normalizer
    function ActionDataCaptureInfoNormalizer() {

        // ActionDataCaptureInfoNormalizer object
        var MyInstance = this;

        var _oDateTime = new DateTime();
        var CurrentDateAndTime = _oDateTime.GetDateAndTime();

        /// <summary>
        /// DTO to ActionDataCaptureInfo conversion
        /// </summary>
        /// <param name="ActionDataCaptureInfoDTO">ActionDataCaptureInfo DTO (DTO from server)</param>
        /// <returns>ActionDataCaptureInfo (Mobile entity format)</returns> 
        this.Normalize = function (ActionDataCaptureInfoDTO) {
            try {
                OneViewConsole.Debug("Normalize start", "ActionDataCaptureInfoNormalizer.Normalize");

                var _oActionDataCaptureInfoEntity = new ActionDataCaptureInfoEntity();

                _oActionDataCaptureInfoEntity.DocId = ActionDataCaptureInfoDTO.DocId;
                _oActionDataCaptureInfoEntity.DataCaptureServerId = ActionDataCaptureInfoDTO.DataCaptureServerId;
                _oActionDataCaptureInfoEntity.ServiceId = ActionDataCaptureInfoDTO.ServiceId;

                _oActionDataCaptureInfoEntity.DcPlaceId = ActionDataCaptureInfoDTO.DcPlaceId;
                _oActionDataCaptureInfoEntity.DcPlaceName = ActionDataCaptureInfoDTO.DcPlaceName;
                _oActionDataCaptureInfoEntity.DcPlaceMaterializedPath = ActionDataCaptureInfoDTO.DcPlaceMaterializedPath;
                _oActionDataCaptureInfoEntity.DcPlaceNameHierarchy = ActionDataCaptureInfoDTO.DcPlaceNameHierarchy;
                _oActionDataCaptureInfoEntity.DcPlaceDimension = ActionDataCaptureInfoDTO.DcPlaceDimension;

                _oActionDataCaptureInfoEntity.TemplateNodeId = ActionDataCaptureInfoDTO.TemplateNodeId;
                _oActionDataCaptureInfoEntity.TemplateNodeName = ActionDataCaptureInfoDTO.TemplateNodeName;
                
                if(ActionDataCaptureInfoDTO.FollowUpUserInfo!=undefined){
               
                    _oActionDataCaptureInfoEntity.FollowUpUserInfo = ActionDataCaptureInfoDTO.FollowUpUserInfo;
                }
                
                _oActionDataCaptureInfoEntity.DcUserId = ActionDataCaptureInfoDTO.DcUserId;;
                _oActionDataCaptureInfoEntity.DcUserName = ActionDataCaptureInfoDTO.DcUserName;
                
                _oActionDataCaptureInfoEntity.DataCaptureComments = ActionDataCaptureInfoDTO.DataCaptureComments;

                _oActionDataCaptureInfoEntity.CreatedDate = CurrentDateAndTime;
                _oActionDataCaptureInfoEntity.LastsyncDate = CurrentDateAndTime;

                return _oActionDataCaptureInfoEntity;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Normalizer", "ActionDataCaptureInfoNormalizer.Normalize", Excep);
            }
        }


        /// <summary>
        /// DTO list to ActionDataCaptureInfo list conversion
        /// </summary>
        /// <param name="ActionDataCaptureInfoDTOList">ActionDataCaptureInfo list dto (DTO from server)</param>
        /// <returns>ActionDataCaptureInfo list (Mobile entity format)</returns> 
        this.NormalizeList = function (ActionDataCaptureInfoDTOList) {
            try {
                OneViewConsole.Debug("NormalizeList start", "ActionDataCaptureInfoNormalizer.NormalizeList");

                var ActionDataCaptureInfoList = new Array();
                for (var i = 0; i < ActionDataCaptureInfoDTOList.length; i++) {
                    ActionDataCaptureInfoList[i] = MyInstance.Normalize(ActionDataCaptureInfoDTOList[i]);
                }

                OneViewConsole.Debug("NormalizeList end", "ActionDataCaptureInfoNormalizer.NormalizeList");

                return ActionDataCaptureInfoList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Normalizer", "ActionDataCaptureInfoNormalizer.NormalizeList", Excep);
            }
        }
    }

    // ActionDataCaptureDAO
    function ActionDataCaptureDAO() {

        var MyInstance = this;

        var _oDateTime = new DateTime();
        var CurrentDateAndTime = _oDateTime.GetDateAndTime();

        var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

        this.GetByAllDimensions = function (ServiceId, DcPlaceId, TemplateNodeId, DcUserId, DocId) {

            try {
                OneViewConsole.Debug("GetByAllDimensions start", "ActionDataCaptureDAO.GetByAllDimensions");

                var Query = "SELECT Id FROM ActionDataCaptureInfoEntity WHERE ServiceId = " + ServiceId + " AND DcPlaceId = " + DcPlaceId + " AND TemplateNodeId = " + TemplateNodeId + " AND DcUserId = " + DcUserId + " AND DocId = '" + DocId + "'";
               
                OneViewConsole.DataLog("Requested Query : " + Query, "ActionDataCaptureDAO.GetByAllDimensions");

                var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
                
                OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionDataCaptureDAO.GetByAllDimensions");

                OneViewConsole.Debug("GetByAllDimensions end", "ActionDataCaptureDAO.GetByAllDimensions");

                return Result;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "ActionDataCaptureDAO.GetByAllDimensions", Excep);
            }
            finally {
                Query = null;
                Result = null;
            }
        }
    }

    function ValidateActionFollowUpBeforeNewDCHandler(xlatService) {
        var MyInstance = this;

        this.DownlaodActionFollowUpDetails = function (Req) {

            try {
                OneViewConsole.Debug("DownlaodActionFollowUpDetails start", "DasboardBO.DownlaodActionFollowUpDetails");
           
                var FilterParams = {
                    OSGuid: OneViewSessionStorage.Get("ServiceId"),
                    UserId: OneViewSessionStorage.Get("LoginUserId"),
                    TemplateId: [],
                    FromDate: '',
                    ToDate: '',
                    DcPlaceDimension: 0,
                    DcPlaceIds: [],
                    IsDCPlaceGroup: false,
                    IsTemplateGroup: false,
                    IsOnDeviceApprovalProfileNeeded: false,
                    DCPlaceRCOType: -1
                }
                var _TemplateIdLst = [];
                var IsTemplateValidationRequired = false;
                if (Req != undefined) {
                    IsTemplateValidationRequired = true;

                    if (Req.TemplateNodeId == undefined && Req["TemplateId"] != undefined) {
                        if (Req.TemplateId.length > 0) {
                            FilterParams.TemplateId = Req.TemplateId;
                        }
                        else if (Req.TemplateNodeId != undefined) {
                            FilterParams.TemplateId.push(Req.TemplateNodeId);
                        }
                        else {
                            IsTemplateValidationRequired = false;
                        }
                    }
                    else {
                        FilterParams.TemplateId.push(Req.TemplateNodeId);
                    }

                    if (Req.DcPlaceId == undefined && Req["DcPlaceIds"] != undefined) {
                        if (Req.DcPlaceIds.length > 0) {
                            FilterParams.DcPlaceIds = Req.DcPlaceIds;
                        }
                        else if (Req.DcPlaceId != undefined) {
                            FilterParams.DcPlaceIds.push(Req.DcPlaceId);
                        }                        
                    }
                    else {
                        FilterParams.DcPlaceIds.push(Req.DcPlaceId);
                    }


                  
          
                    //  FilterParams.DcPlaceDimension = Req.DCPlaceKeyDimension;
                    FilterParams.IsDCPlaceGroup = Req.IsDCPlaceGroup;
                    FilterParams.IsTemplateGroup = Req.IsTemplateGroup;
                    FilterParams.IsOnDeviceApprovalProfileNeeded = IsOnDeviceApprovalProfileNeeded;
                    FilterParams.DCPlaceRCOType = Req.DCPlaceRCOType;
                }
              
                var ReqObjForValidateActionFollowUpBeforeNewDC = { TemplateIdLst: FilterParams.TemplateId, IsTemplateValidationRequired: IsTemplateValidationRequired };

                if (MyInstance.IsNeedToValidateActionFollowUpBeforeNewDC(ReqObjForValidateActionFollowUpBeforeNewDC)) {
           
                    MyInstance.Download(FilterParams, xlatService, "false");
                }

                OneViewConsole.Debug("DownlaodActionFollowUpDetails end", "DasboardBO.DownlaodActionFollowUpDetails");
            }
            catch (Excep) {            
                  throw oOneViewExceptionHandler.Create("BO", "DasboardBO.DownlaodActionFollowUpDetails", Excep);
            }
            finally {
            }
        } 

        this.Download = function (DownloadList, xlatService, ShowExceptionMessage) {

            try {
                OneViewConsole.Debug("Download start", "ValidateActionFollowUpBeforeNewDC.Download");
               
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpDownloadFacade.DownloadActionFollowUpInfo");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {

                    var _oActionFollowUpDownloadBO = new ActionFollowUpDownloadBO();

                    var ActionFollowUpDTO = new ActionFollowUpDownloadIL().DownloadActionFollowUpInfo(DownloadList, ShowExceptionMessage);


                    if (ActionFollowUpDTO != null && ActionFollowUpDTO.IsAnyException == false) {

                        if (ActionFollowUpDTO.ActionFollowUpInfoDTOLst.length > 0) {


                            var ActionFollowUpInfoDTOLst = new ActionFollowUpInfoNormalizer().NormalizeList(ActionFollowUpDTO.ActionFollowUpInfoDTOLst, 'false');
                            IsActionFollowUpInfoSuccess = _oActionFollowUpDownloadBO.InsertActionFollowUpInfo(ActionFollowUpInfoDTOLst);

                            if (IsActionFollowUpInfoSuccess == true) {
                                var MultiMediaSubElementsDTOLst = new MultiMediaSubElementsNormalizer().NormalizeList(ActionFollowUpDTO.MultiMediaSubElementsDTOLst);
                                IsActionFollowUpInfoSuccess = _oActionFollowUpDownloadBO.InsertMultiMediaSubElements(MultiMediaSubElementsDTOLst, xlatService);
                            }


                            if (IsActionFollowUpInfoSuccess == true && ActionFollowUpDTO.DataCaptureDTO != null && ActionFollowUpDTO.DataCaptureDTO.length != 0) {
                                var HistoryDcData = new DataCaptureNormalizer().NormalizeList(ActionFollowUpDTO.DataCaptureDTO);
                                IsActionFollowUpInfoSuccess = new DcDAO().InsertDCList(HistoryDcData);
                            }

                            if (IsActionFollowUpInfoSuccess == true && ActionFollowUpDTO.Action != null) {
                                var _oActionBO = new ActionBO();
                                IsActionFollowUpInfoSuccess = _oActionBO.InsertAction(ActionFollowUpDTO.Action);
                            }
                        }
                    }

                }


                OneViewConsole.Debug("Download End", "ValidateActionFollowUpBeforeNewDC.Download");

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "ActionDataCaptureDAO.GetByAllDimensions", Excep);
            }
            finally {
                Query = null;
                Result = null;
            }
        }

        this.IsNeedToValidateActionFollowUpBeforeNewDC = function (Req) {
            try {
                OneViewConsole.Debug("IsNeedToValidateActionFollowUpBeforeNewDC start", "ValidateActionFollowUpBeforeNewDCHandler.IsNeedToValidateActionFollowUpBeforeNewDC");
    
                var IsValidationRequired = false;

                var _MobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();
                var BusinessEventDetails = _MobileAutoSyncMetadataDAO.GetByServiceAndUserId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

                if (BusinessEventDetails.length > 0) {
            
                    for (var i = 0; i < BusinessEventDetails.length ; i++) {
                        if (BusinessEventDetails[i].ClassName == "ValidateActionFollowUpBeforeNewDCHandler" && BusinessEventDetails[i].MethodName == "IsNeedToValidateActionFollowUpBeforeNewDC") {
                            var BusinessEventDefinition=BusinessEventDetails[i].BusinessEventDefinition;
                            if(BusinessEventDefinition.Type =="LoginUserWiseBusinessEventDefinition"){
                                var _oLoginUserWiseBusinessEventDefinition = new LoginUserWiseBusinessEventDefinition();
                              //  IsEvaluationStatusSuccess = _oLoginUserWiseBusinessEventDefinition.Evaluate(BusinessEventDefinition);

                              //  if (IsEvaluationStatusSuccess) {
                                    
                                    var BusinessEventHandlers = BusinessEventDetails[i].BusinessEventHandlers;

                                    for (var b = 0; b < BusinessEventHandlers.length; b++) {
                                      
                                        var BusinessEventHandlerObjectKeys=BusinessEventHandlers[b].BusinessEventHandlerObjectKeys;

                                        for (var j = 0; j < BusinessEventHandlerObjectKeys.length; j++) {

                                            if (BusinessEventHandlerObjectKeys[j] == "ValidateActionFollowUpBeforeNewDC") {

                                                var IsTemplateValidationRequired = Req.IsTemplateValidationRequired;
                                               
                                                if (IsTemplateValidationRequired == true) {

                                                    var TemplateFilterParam = BusinessEventHandlers[b].Parameters.TemplateFilterParam;
                                                    if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {

                                                        var TemplateIdLst = Req.TemplateIdLst;

                                                        for (var t = 0; t < TemplateIdLst.length; t++) {

                                                            if (TemplateFilterParam.DCTemplateList.indexOf(parseInt(TemplateIdLst[t])) != -1) {
                                                                IsValidationRequired = true;
                                                                break;
                                                            }
                                                        }
                                                    }

                                                }
                                                else {
                                                    IsValidationRequired = true;
                                                    break;
                                                }

                                            }
                                        }
                                    }


                                  //  }
                            }

                            
                        }
                    }
                }


                OneViewConsole.Debug("IsNeedToValidateActionFollowUpBeforeNewDC end", "ValidateActionFollowUpBeforeNewDCHandler.IsNeedToValidateActionFollowUpBeforeNewDC");

                return IsValidationRequired;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "ValidateActionFollowUpBeforeNewDCHandler.IsNeedToValidateActionFollowUpBeforeNewDC", Excep);
            }
            finally {
            }
        }

    }
