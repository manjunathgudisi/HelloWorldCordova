var state = null;
var GridDataSource = null;
var RowIndex = -1;
var GridConfig = null;
var DefaultInlineEditConfig = null;
var ViewRecordsFacadeKey = null;
var FilterRuleConfig = null;
var InlineEditFinishedEventHandler = null;
var GraphSearchTime = 0000; // Millie seconds
var MaxRowCount = 11;
var PageNumber = 1;
var PageCount = 0;
var NormalizedDataCount = 0;
var scope = null;
var Mylocation = null;
var DcInfoViewRecords = null
var oxlatService = null;
var AutoTemperatureListnerControlConfig = null;
//var ViewRecordsNCRuleId = 0;
var ViewRecordsNCRuleHandler = [];
var Compile = null;
var SnapRemote = null;
var IsColumnClick = false;
var GridMetaData = {};
var FilterMetaData = {};

MyApp.controller('DispatchingViewRecordsController', function ($scope, xlatService, $location, $templateCache, $timeout, $compile, snapRemote) {
	  
    
        var IsNavigate = false;
        var Url;
        var oOneViewSidePanel = new OneViewSidePanel();

        ////////////////*********************** Validation for going in Dispatching page when any profile are there only************************ START///////////////////////////
        var UserId = OneViewSessionStorage.Get("LoginUserId");
        var query = "SELECT * FROM DcProfileEntity WHERE DcUserId= " + UserId + " AND TemplateNodeId = 8272";
        var result = window.OneViewSqlite.excecuteSqlReader(query);
        var queryresult = JSON.parse(result);
        if (queryresult.length > 0) {
            //var _oDcDAO = new DcDAO();
            //var DcCount = _oDcDAO.GetDcCountByServiceAndTemplateId(OneViewSessionStorage.Get("ServiceId"), 8272);                
            //if (DcCount > 0) {
            //    OneViewSessionStorage.Remove("DcId");
            //    OneViewSessionStorage.Save("TemplateId", "8272");
            //    $location.url('/8272');
            //}
            //else {
            //    alert("IN-NF-MAU-004 :: No records available");
            //}
            OneViewSessionStorage.Remove("DcId");
            OneViewSessionStorage.Save("TemplateId", "8272");
            //$location.url('/8272');
            IsNavigate = true;
        }
        else {
            //  toaster.pop('warning', xlatService.xlat('Title_Notification'), "No profiles are available to conduct data capture");
            //alert("IN-NF-MAU-003 :: No profiles are available to conduct data capture");
            var MessageKey = "IN-NF-MAU-003 :: No profiles are available to conduct data capture";
            Url = '/notifycall?MessageKey=' + MessageKey + '';
        }
        ////////////////*********************** Validation for going in Dispatching page when any profile are there only************************ END///////////////////////////


        if (IsNavigate == true) {
            //oSetDefaultSpinner.Start();
            Compile = $compile;
            SnapRemote = snapRemote;
            
            oOneViewSidePanel.Clear();

            var _oViewRecordsBO = new ViewRecordsBO();
            _oViewRecordsBO.LoadMetadata();
            _oViewRecordsBO.SetGridConfig();

            var _oDispatchingViewRecordsFacade = new DispatchingViewRecordsFacade($scope, xlatService, '');
            InlineEditFinishedEventHandler = new EkfcViewRecords().InlineEditFinished;
            oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = _oDispatchingViewRecordsFacade.SetTemperature;

            _oDispatchingViewRecordsFacade.Init($location, $compile);

            $scope.divNCButton = false;
            //_oDispatchingViewRecordsFacade.PageLoad();

            //oSetDefaultSpinner.Stop();

        }

        else {
            $location.url(Url);
        }

   
    //$scope.$on('$viewContentLoaded', function () {
    //    alert('monitor viewContentLoaded 1234');
    //    AutoCompleteDestroyHTML();
    //    AutoCompleteGenerateHTML();
    //});


    $scope.$on('CloseRightPanel', function (event, data) {

        
        _oDispatchingViewRecordsFacade.CloseRightPanel(snapRemote)
        

    });

    

    snapRemote.getSnapper().then(function(snapper) {             
        snapper.on('close', function () {
            scope = $scope;
            scope.divNCButton = false;
            xlatService.setCurrentPage('11');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

            if (IsNavigate == true) {
                oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = _oDispatchingViewRecordsFacade.SetTemperature;
                _oDispatchingViewRecordsFacade.PageLoad();
            }
           if (document.getElementById('divHide') != null) {
               document.getElementById('divHide').innerHTML = "";
           }
       });
    });

    $scope.$on('$destroy', function () {       
        oOneViewSidePanel.Clear();
        oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = null;
        oOneViewAppInfoPlugin.UnLockOrientation();

        GridDataSource = null;
        GridConfig = null;
        DefaultInlineEditConfig = null;
        ViewRecordsFacadeKey = null;
        FilterRuleConfig = null;
        InlineEditFinishedEventHandler = null;
        DcInfoViewRecords = null;
        AutoTemperatureListnerControlConfig = null;
        Compile = null;
        SnapRemote = null;
        GridMetaData = {};
        FilterMetaData = {};
    });

    var lastTimeOutId = null;
    $scope.GraphSearch = function () {
        if (lastTimeOutId != null)
            window.clearTimeout(lastTimeOutId);
        lastTimeOutId = window.setTimeout(_oDispatchingViewRecordsFacade.GraphSearch, GraphSearchTime);
    }

    $scope.ShowResponsiveFilter = function ($event) {
        document.body.classList.add('platform-ios');
        $scope.filter.show($event);        
    };
    $scope.CloseResponsiveFilter = function () {
        $scope.filter.hide();
        document.body.classList.remove('platform-ios');        
    };

    $scope.ShowGrigFilter = function ($event) {
        //var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");        
        //if (TemplateNodeId != '44') {
            document.body.classList.add('platform-ios');
            $scope.drop.show($event);
        //}
    };
    $scope.CloseGrigFilter = function () {
        oOneViewSidePanel.Toggle(snapRemote);        
        _oOneViewSidePanel.Clear();
        //$scope.drop.hide();
        //document.body.classList.remove('platform-ios');       
    };

    $scope.EditNCRecords = function (){
        // $state.go('app.NCFormAction' + OneViewSessionStorage.Get("TemplateId"));
        // $location.path('/app-' + OneViewSessionStorage.Get("TemplateId"));    
        //$location.url('/' + OneViewSessionStorage.Get("TemplateId"));
        //OneViewSessionStorage.Save("NCInlineEdit", 'true');
        _oDispatchingViewRecordsFacade.EditNCRecords($compile, snapRemote);
    }
   
    $scope.ResponsiveFieldChanged = function (ResponsiveColumn) {       
        _oDispatchingViewRecordsFacade.ResponsiveFieldChanged(ResponsiveColumn);
    }

    $scope.ApplyFilter = function () {       
        _oDispatchingViewRecordsFacade.ApplyFilter(snapRemote);
        //$scope.drop.hide();
        //document.body.classList.remove('platform-ios');
    }

    $scope.GoBack = function () {        
        _oDispatchingViewRecordsFacade.GoBack();
    }

    $scope.EditRecords = function () {        
        _oDispatchingViewRecordsFacade.EditRecords($location);
    }

    $scope.Previous = function () {       
        _oDispatchingViewRecordsFacade.Previous();
    }

    $scope.Next = function () {       
        _oDispatchingViewRecordsFacade.Next();
    }

    $scope.GetProbeStatus = function () {
        _oDispatchingViewRecordsFacade.GetProbeStatus();
    };

    $scope.ToggleFilterPopUp = function () {
        _oDispatchingViewRecordsFacade.ToggleFilterPopUp($compile, snapRemote);
    }

    $scope.ToggleResponsivePopUp = function () {
        _oDispatchingViewRecordsFacade.ToggleResponsivePopUp($compile, snapRemote);
    }

    $scope.ResetResposiveFilter = function () {
        //alert("Comming soon ....");
        _oDispatchingViewRecordsFacade.ResetResposiveFilter();
        oOneViewSidePanel.Toggle(snapRemote);
    }

    $scope.ProbeTesting = function () {
      //  alert('ProbeTesting');
        _oDispatchingViewRecordsFacade.ProbeTesting();
        
    }

    $scope.LoadFlightList = function () {
        _oDispatchingViewRecordsFacade.LoadFlightList($compile);
    }

    $scope.LoadViewRecords = function (Id, Name,TotalRecords,CompletedRecords) {    
        _oDispatchingViewRecordsFacade.LoadViewRecords(Id, Name, TotalRecords, CompletedRecords, $compile);
    }

    EditButtonClick = function (Id) {
        _oDispatchingViewRecordsFacade.EditButtonClick(Id, $compile, snapRemote);
    }

    DefaultValueClick = function (Id) {
        _oDispatchingViewRecordsFacade.SaveDefaultValue(Id,$compile, $timeout);
    }

    $scope.FaciltyChangeEvent = function () {
        _oDispatchingViewRecordsFacade.FaciltyChangeEvent();
    }

    $scope.StartDispatchingDC = function () {
        _oDispatchingViewRecordsFacade.StartDispatchingDC($compile, snapRemote);
    }

    $scope.FlightChangeEvent = function () {
        OneViewSessionStorage.Save("DcPlaceId", $scope.txtFlightModel.Id);
        OneViewSessionStorage.Save("DcPlaceName", $scope.txtFlightModel.Name);
        _oDispatchingViewRecordsFacade.LoadScheduleTime();
        _oDispatchingViewRecordsFacade.FaciltyChangeEvent();
    }

    $scope.SaveDefaultValue = function () {
        // _oDispatchingViewRecordsFacade.EditNCRecords($compile, snapRemote);
        _oDispatchingViewRecordsFacade.SaveDefaultValue($compile, $timeout);
    }

    $scope.FilterDataChanged = function (Header) {
        _oDispatchingViewRecordsFacade.FilterDataChanged(Header);
    }
});

function DispatchingViewRecordsFacade($scope, xlatService, toaster) {
	
	var MyInstance = this;
	var _oViewRecordsBO = new ViewRecordsBO(xlatService, toaster);
	var _oSettingsBO = new SettingsBO();
	this.AutoTemperature = "";

	this.Init = function ($location, $compile) {
		
        try {
            OneViewConsole.Debug("Init start", "ViewRecordsFacade.Init");

            oOneViewAppInfoPlugin.SetLandScapeOrientation();

            //xlatService.setCurrentPage('ViewRecords_Page');
            OneViewSessionStorage.Save("TemplateId", "8272");
            OneViewSessionStorage.Save("TemplateName", "Temperature Verification of Dispatching");
            xlatService.setCurrentPage('11');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
			Mylocation = $location;
			scope = $scope;
			oxlatService = xlatService;
			$scope.HeaderHeight = 0;
			RowIndex = -1;
			PageNumber = 1;
			PageCount = 0;
			ViewRecordsNCRuleHandler = [];
			var oGridControl = new DispatchingGridControl();
			$scope.GridInstance = oGridControl;		
			_oViewRecordsBO.SetFilterRuleConfig();
			
			if(GridConfig != null){				
				oGridControl.LoadHeaderRow(GridConfig);
				_oViewRecordsBO.LoadResponsiveData($scope, GridConfig);				
			}
			if(FilterRuleConfig != null){
				_oViewRecordsBO.LoadFilterData($scope, FilterRuleConfig);		
			}

			$scope.FlightList = true;
			$scope.ViewRecords = false;
			$scope.Flights = [];

			MyInstance.LoadFlightList($compile);

			OneViewConsole.Debug("Init end", "ViewRecordsFacade.Init");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.Init", xlatService);
		}
        finally {
            oGridControl = null;
        }
	}

	this.LoadFlightListOrg = function ($compile) {

	    try {
	        OneViewConsole.Debug("LoadFlightList start", "ViewRecordsFacade.LoadFlightList");

	        $scope.FlightList = true;
	        $scope.ViewRecords = false;

	        document.getElementById('FlightContent').innerHTML = "";

	        var FlightsInfo = [];

	        var _DcDAO = new DcDAO();
	        var DcPlaces = _DcDAO.GetDcPlacesByServiceAndTemplateId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("TemplateId"));

	        if (DcPlaces.length > 0) {

	            for (var i = 0; i < DcPlaces.length; i++) {

	                var oDcFilterParamRequest = new DcFilterParamRequest();

	                oDcFilterParamRequest.ServiceId = OneViewSessionStorage.Get("ServiceId");
	                oDcFilterParamRequest.DcPlaceId = DcPlaces[i].Id;
	                oDcFilterParamRequest.TemplateNodeId = OneViewSessionStorage.Get("TemplateId");

	                var _oMyAuditDAO = new MyAuditDAO();
	                var TotalDcCount = _oMyAuditDAO.GetAllDCCount(oDcFilterParamRequest);

	                oDcFilterParamRequest.IsCompleted = true;
	                var CompletedDcCount = _oMyAuditDAO.GetAllDCCount(oDcFilterParamRequest);

	                FlightsInfo.push({ Id: DcPlaces[i].Id, Name: DcPlaces[i].Name, CompletedRecords: CompletedDcCount, TotalRecords: TotalDcCount });
	            }

	            var Html = GetFlightsHtml(FlightsInfo);

	            var _oOneViewCompiler = new OneViewCompiler();

	            if (Html != "") {
	                _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "FlightContent");
	            }

	            scope.divNCButton = false;
	        }
	        else {
	            alert("IN-NF-MAU-004 :: No records available");
	        }

	        OneViewConsole.Debug("LoadFlightList end", "ViewRecordsFacade.LoadFlightList");
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.LoadFlightList", xlatService);
	    }
	    finally {
	        oGridControl = null;
	    }
	}

	this.LoadFlightList = function ($compile) {

	    try {
	        OneViewConsole.Debug("LoadFlightList start", "ViewRecordsFacade.LoadFlightList");

	        var _oDcDAO = new DcDAO();

	        $scope.FlightList = true;
	        $scope.ViewRecords = false;

	        document.getElementById('FlightContent').innerHTML = "";

	        var FlightsInfo = [];

	        var _oDcProfileDAO = new DcProfileDAO();
	        var DcPlaces = _oDcProfileDAO.GetAllDcPlacesByServiceTemplateAndUserId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("TemplateId"), OneViewSessionStorage.Get("LoginUserId"));
	       
	        for (var i = 0; i < DcPlaces.length; i++) {

	            var oDcFilterParamRequest = new DcFilterParamRequest();

	            oDcFilterParamRequest.ServiceId = OneViewSessionStorage.Get("ServiceId");
	            oDcFilterParamRequest.DcPlaceId = DcPlaces[i].Id;
	            oDcFilterParamRequest.TemplateNodeId = OneViewSessionStorage.Get("TemplateId");

	            var _oMyAuditDAO = new MyAuditDAO();
	            var TotalDcCount = _oMyAuditDAO.GetAllDCCount(oDcFilterParamRequest);

	            oDcFilterParamRequest.IsCompleted = true;
	            var CompletedDcCount = _oMyAuditDAO.GetAllDCCount(oDcFilterParamRequest);

	            FlightsInfo.push({ Id: DcPlaces[i].Id, Name: DcPlaces[i].Name, CompletedRecords: CompletedDcCount, TotalRecords: TotalDcCount });
	        }

	        if (FlightsInfo.length > 0) {

	            $scope.Flights = FlightsInfo;
	            //alert($scope.Flights.length);
	            //alert(JSON.stringify($scope.Flights));
	            
	            var Html = GetFlightsHtml(FlightsInfo);

	            var _oOneViewCompiler = new OneViewCompiler();

	            if (Html != "") {
	                _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "FlightContent");
	            }
	        }
	        else {
	            alert("IN-NF-MAU-004 :: No records available");
	        }

	        scope.divNCButton = false;
	       
	        OneViewConsole.Debug("LoadFlightList end", "ViewRecordsFacade.LoadFlightList");
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.LoadFlightList", xlatService);
	    }
	    finally {
	        oGridControl = null;
	    }
	}

	var GetFlightsHtml = function (FlightsInfo) {

	    try {
	        OneViewConsole.Debug("Flights start", "ViewRecordsFacade.Flights");

	        var Html = "";

	        for (var i = 0; i < FlightsInfo.length; i++) {

	            var StatusHtml = (FlightsInfo[i].CompletedRecords == FlightsInfo[i].TotalRecords) ? '<span class="summary completed">' + FlightsInfo[i].CompletedRecords + '/' + FlightsInfo[i].TotalRecords + '</span>' : '<span class="summary pending">' + FlightsInfo[i].CompletedRecords + '/' + FlightsInfo[i].TotalRecords + '</span>';

	            Html += '<div class="item item-icon-right" ng-click="LoadViewRecords(' + FlightsInfo[i].Id + ',\'' + FlightsInfo[i].Name + '\',' + FlightsInfo[i].TotalRecords + ',' + FlightsInfo[i].CompletedRecords + ')">' +
                            FlightsInfo[i].Name +
                        '<span class="item-note">' +
                            StatusHtml +
                        '</span>' +
                        '<i class="icon icon-angle-right"></i>' +
                        '</div>';
	        }

	        return Html;

	        OneViewConsole.Debug("Flights end", "ViewRecordsFacade.Flights");
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.Flights", xlatService);
	    }
	    finally {
	        oGridControl = null;
	    }
	}

	this.LoadViewRecords = function (Id, Name,TotalRecords,CompletedRecords, $compile) {

	    try {
	        OneViewConsole.Debug("LoadViewRecords start", "ViewRecordsFacade.LoadViewRecords");
	       
	        if (TotalRecords == 0 && CompletedRecords == 0) {
	            alert("IN-NF-MAU-004 :: There is no menu under this flight for Verification");
	        }
	        else {
	            oSetDefaultSpinner.Start();

	            $scope.FlightList = false;
	            $scope.ViewRecords = true;

	            DcInfoViewRecords = null;
	            OneViewSessionStorage.Save("DcPlaceId", Id);
	            OneViewSessionStorage.Save("DcPlaceName", Name);

	            var otxtFlightModel = document.getElementById("txtFlightModel");
	            if (otxtFlightModel != null) {
	                for (var i = 0; i < otxtFlightModel.options.length; i++) {
	                    if (otxtFlightModel.options[i].text.replace(/ +(?= )/g, '') == Name.replace(/ +(?= )/g, '')) { // replace(/ +(?= )/g, '') for removing multiple spaces (Need to check once)              
	                        otxtFlightModel.selectedIndex = i;
	                        break;
	                    }
	                    //else if (otxtFlightModel.options[i].text === "") {	                   
	                    //    otxtFlightModel.remove(i);
	                    //}
	                }
	            }

	            this.LoadScheduleTime();
	            this.PageLoad($compile);

	            oSetDefaultSpinner.Stop();
	        }
	        OneViewConsole.Debug("LoadViewRecords end", "ViewRecordsFacade.LoadViewRecords");
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.LoadViewRecords", xlatService);
	    }
	    finally {
	        oGridControl = null;
	    }
	}

	this.LoadScheduleTime = function () {

	    try {
	        OneViewConsole.Debug("LoadScheduleTime start", "ViewRecordsFacade.LoadScheduleTime");

	        var oDcFilterParamRequest = new DcFilterParamRequest();
	        oDcFilterParamRequest.DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
	        oDcFilterParamRequest.DcPlaceName = OneViewSessionStorage.Get("DcPlaceName");
	        oDcFilterParamRequest.TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
	        oDcFilterParamRequest.IsSubmit = false;

	        var _oDcDAO = new DcDAO();
	        var Nodes = _oDcDAO.GetAllDistinctAnswersByAttributeNodeId(oDcFilterParamRequest, 8475);

	        $scope.FacilityList = [];
	        $scope.txtScheduleDateandTimeControlId = undefined;

	        $scope.FacilityList.push({ "Answer": "", "AnswerValue": "", "DisplayName": "ALL" });

	        for (var i = 0; i < Nodes.length; i++) {
	            $scope.FacilityList.push({ "Answer": Nodes[i].Answer, "AnswerValue": Nodes[i].AnswerValue, "DisplayName": Nodes[i].Answer });
	        }

	        if ($scope.FacilityList.length > 1){
	            $scope.txtScheduleDateandTimeControlId = $scope.FacilityList[1];
	        }
	        else {
	            $scope.txtScheduleDateandTimeControlId = $scope.FacilityList[0];
	        }

	        OneViewConsole.Debug("LoadScheduleTime end", "ViewRecordsFacade.LoadScheduleTime");
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.LoadScheduleTime", xlatService);
	    }
	    finally {
	        oGridControl = null;
	    }
	}

	this.FaciltyChangeEvent = function () {
	    try {
	        OneViewConsole.Debug("FaciltyChangeEvent start", "ViewRecordsFacade.FaciltyChangeEvent");
	        
	        oSetDefaultSpinner.Start();

	        DcInfoViewRecords = null;
	        GridDataSource = null;

	        PageNumber = 1;
	        $scope.CurrentPage = PageNumber;

	        _oViewRecordsBO.GetDataSourceWithFilters($scope, FilterRuleConfig);
	        _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);

	        ResetGridStatus($scope);

	        oSetDefaultSpinner.Stop();

	        OneViewConsole.Debug("FaciltyChangeEvent end", "ViewRecordsFacade.FaciltyChangeEvent");
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.FaciltyChangeEvent", xlatService);
	    }
	}
	
	this.EditButtonClick = function (Id, $compile, snapRemote) {

	    try {
	        OneViewConsole.Debug("EditButtonClick start", "ViewRecordsFacade.EditButtonClick");

	        _oViewRecordsBO.SaveDcIdIntoSession(Id);
	        OneViewSessionStorage.Remove("NCInlineEdit");	     	     
	        LoadEditPage($compile, snapRemote);
	       
	        OneViewConsole.Debug("EditButtonClick end", "ViewRecordsFacade.EditButtonClick");
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.EditButtonClick", xlatService);
	    }
	    finally {
	        oGridControl = null;
	    }
	}
    
	this.EditNCRecords = function ($compile, snapRemote) {

	    try {
	        OneViewConsole.Debug("EditNCRecords start", "ViewRecordsFacade.EditNCRecords");
	        OneViewSessionStorage.Save("IsEditNCButtonClick", 'true');
	        OneViewSessionStorage.Save("NCInlineEdit", 'true');
	        LoadEditPage($compile, snapRemote);

	        OneViewConsole.Debug("EditNCRecords end", "ViewRecordsFacade.EditNCRecords");
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.EditNCRecords", xlatService);
	    }
	    finally {
	        oGridControl = null;
	    }
	}

	var LoadEditPage = function ($compile, snapRemote, IsNC) {

	    try {
	        var _oOneViewSidePanel = new OneViewSidePanel();
	        _oOneViewSidePanel.Clear();

	        var Html =

                 '<div ng-controller="TemperatureVerificationofDispatchingController">';
               
	        if (IsNC != true) {	          
	            Html += '<div ng-show="divHide"> <input type="time" ng-model="NewDCModel.DTDeliveryTimeControlId" attributenodeid="8291" controlid="DTDeliveryTimeControlId" id="DTDeliveryTimeControlId" />' +
	               '<input type="time" ng-model="NewDCModel.DTDispatchTimeControlId" attributenodeid="8294" controlid="DTDispatchTimeControlId" id="DTDispatchTimeControlId" /></div>';
	        }
	       
            Html +='<div class="bar bar-header">' +
                '<h3 style="width:100%">{{ NewDCModel.TxtFCOTypeControlId }} - {{ NewDCModel.MealControlId }}</h3>' +
            '</div>' +

              '<div class="scroll-content has-header has-footer padding grid-edit-form" style="background: #eef3f5;">' +
                '<div class="full-height scrollable">' +
                '<div ng-show="DivContent">' +

                    '<div class="row responsive-md no-padding-vertical">' +
                        '<div class="col no-padding no-margin">' +
                          '<div class="title-bar rounded">Flight Details</div>' +

                          ' <div class="row no-padding responsive-sm multi-col">' +
                              '<div class="col rounded light-bg">' +
                                '<div class="field-item">' +
                                    '<label>' +
                                        '<span>Sector</span>' +
                                        '<input type="text" ng-model="NewDCModel.AddlSectorControlId" controlid="AddlSectorControlId" id="AddlSectorControlId" attributenodeid="8274" disabled="disabled" />' +
                                         
                                                               
                                    '</label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col rounded light-bg">' +
                                '<div class="field-item">' +
                                    '<label>' +
                                        '<span>Airline</span>' +
                                        '<input type="text" ng-model="NewDCModel.AddlFlightControlId" controlid="AddlFlightControlId" id="AddlFlightControlId" attributenodeid="8275" disabled="disabled">' +
                                    '</label>' +
                                '</div>' +
                            '</div>' +                        
                            '<div class="col rounded light-bg">' +
                                '<div class="field-item">' +
                                    '<label>' +
                                        '<span>Flight</span>' +
                                        '<input type="text" ng-model="NewDCModel.AddlAirlineControlId" controlid="AddlAirlineControlId" id="AddlAirlineControlId" attributenodeid="8276" disabled="disabled">' +
                                    '</label>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +

                        '<div class="row no-padding responsive-sm multi-col">' +

                        '<div class="col rounded light-bg">' +
                            '<div class="field-item">' +
                                '<label>' +
                                    '<span>Class</span>' +
                                    '<input type="text" ng-model="NewDCModel.txtClassControlId" controlid="txtClassControlId" id="txtClassControlId" attributenodeid="8281" disabled="disabled">' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col rounded light-bg" id="Column_339">' +
                            '<div class="field-item with-icon">' +
                                '<label>' +
                                    '<span>EDD</span>' +
                                    '<input type="date" ng-model="NewDCModel.DTETAControlId" attributenodeid="8279" controlid="DTETAControlId" id="DTETAControlId" disabled="disabled">' +
                                    '<i class="icon icon-clock-o"></i>' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col rounded light-bg" id="Column_339">' +
                            '<div class="field-item with-icon">' +
                                '<label>' +
                                    '<span>ETD</span>' +
                                    '<input type="time" ng-model="NewDCModel.DTETDControlId" attributenodeid="8280" controlid="DTETDControlId" id="DTETDControlId" disabled="disabled">' +
                                    '<i class="icon icon-clock-o"></i>' +
                                '</label>' +
                            '</div>' +
                        '</div>' +

                    '</div>' +

                    '</div>' +

                    '</div>' +

                     '<div class="row responsive-md no-padding-vertical">' +

			'<div class="col no-padding">' +

            '<div class="title-bar rounded">Hi-Loader Details</div>' +

             '<div class="row no-padding responsive-sm multi-col">' +


                '<div class="col rounded light-bg">' +
                    '<div class="field-item">' +
                        '<label>' +
                            '<span>Hi-Loader No</span>' +
                            '<input type="text" ng-model="NewDCModel.txtHiLoaderNoControlId" controlid="txtHiLoaderNoControlId" id="txtHiLoaderNoControlId" attributenodeid="8298">' +
                        '</label>' +
                    '</div>' +
                '</div>' +

                '<div class="col rounded light-bg" id="Column_339">' +
                    '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'ATHiLoaderTempControlId\');SetAutoTemperatureListener(\'NewDCModel.ATHiLoaderTempControlId\',\'\')">' +
                        '<label>' +
                            '<span>Hi-Loader Temp(&deg;C)</span>' +
                            '<input type="tel" class="{{ATHiLoaderTempControlId}}" ng-model="NewDCModel.ATHiLoaderTempControlId" attributenodeid="8303" controlid="ATHiLoaderTempControlId" id="ATHiLoaderTempControlId" ng-change="MakeDecimalControl(\'ATHiLoaderTempControlId\',\'#.#\');Temperature_NgKeyUp(2613,\'ATHiLoaderTempControlId\',\'txtTimeofLoadingControlId\', false,8296)">' +
                            '<i class="icon icon-thermometer"></i>' +
                        '</label>' +
                    '</div>' +
                '</div>' +

                 '</div>' +

                '<div class="row no-padding responsive-sm multi-col">' +

                '<div class="col rounded light-bg" id="Column_339">' +
                    '<div class="field-item with-icon">' +
                        '<label>' +
                            '<span>Time Of Loading</span>' +
                            '<input type="datetime-local" ng-model="NewDCModel.txtTimeofLoadingControlId" attributenodeid="8296" controlid="txtTimeofLoadingControlId" id="txtTimeofLoadingControlId">' +
                            '<i class="icon icon-clock-o"></i>' +
                        '</label>' +
                    '</div>' +
                '</div>' +

                '<div class="col rounded light-bg" id="Column_339">' +
                    '<div class="field-item with-icon">' +
                        '<label>' +
                            '<span>Time Of Moving</span>' +
                            '<input type="datetime-local" ng-model="NewDCModel.DTTimeofMovingControlId" attributenodeid="8297" controlid="DTTimeofMovingControlId" id="DTTimeofMovingControlId">' +
                            '<i class="icon icon-clock-o"></i>' +
                        '</label>' +
                    '</div>' +
                '</div>' +


                '</div>' +

                '<div class="title-bar rounded">Refrigerator Details</div>' +

                '<div class="row no-padding responsive-sm multi-col">' +

                '<div class="col rounded light-bg" id="Column_63">' +
                    '<div class="field-item with-icon">' +
                        '<span>Refrigerator Condition</span>' +
                        '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.chkRefrigeratorConditionControlId" options="RefrigeratorConditions" ng-model="NewDCModel.chkRefrigeratorConditionControlId" attributenodeid="8299" controlid="chkRefrigeratorConditionControlId"></buttons-band>' +
                    '</div>' +
                '</div>' +

                '<div class="col rounded light-bg" id="Column_63">' +
                    '<div class="field-item with-icon">' +
                        '<span>Refrigerator Status</span>' +
                        '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.chkRefrigeratorStatusControlId" options="RefrigeratorStatus" ng-model="NewDCModel.chkRefrigeratorStatusControlId" attributenodeid="8300" controlid="chkRefrigeratorStatusControlId"></buttons-band>' +
                    '</div>' +
                '</div>' +

            '</div>' +

              '</div>' +

                 '<div class="col no-padding">' +

            '<div class="title-bar rounded">Other Details</div>' +

            '<div class="row no-padding responsive-sm multi-col">' +

         
              '<div class="col rounded light-bg" id="Column_63">' +
                    '<div class="field-item with-icon">' +
                        '<span>Meals In Oven</span>' +
                        '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.chkMealsinOvenControlId" options="MealsinOvens" ng-model="NewDCModel.chkMealsinOvenControlId" attributenodeid="8302" controlid="chkMealsinOvenControlId"></buttons-band>' +
                    '</div>' +
                '</div>' +

             '<div class="col rounded light-bg" id="Column_63">' +
                    '<div class="field-item with-icon">' +
                        '<span>Dry Ice Added</span>' +
                       // '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.chkMealsinOvenControlId" options="MealsinOvens" ng-model="NewDCModel.chkMealsinOvenControlId" attributenodeid="8302" controlid="chkMealsinOvenControlId"></buttons-band>' +
                        '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.chkDryIceAddedControlId" options="DryIceAddeds" ng-model="NewDCModel.chkDryIceAddedControlId" attributenodeid="8303" controlid="chkDryIceAddedControlId"></buttons-band>' +
                    '</div>' +
                '</div>' +

                 '</div>' +

                '<div class="row no-padding responsive-sm multi-col">' +

                '<div class="col rounded light-bg">' +
                '<div class="field-item">' +
                    '<label>' +
                        '<span>Type Of Meal</span>' +
                        //'<input type="text" ng-model="NewDCModel.TxtFCOTypeControlId" controlid="TxtFCOTypeControlId" id="TxtFCOTypeControlId" attributenodeid="8285">' +
                        '<input type="text" ng-model="NewDCModel.MealMealTypeControlId" controlid="MealMealTypeControlId" id="MealMealTypeControlId" attributenodeid="8285">' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item">' +
                    '<label>' +
                        '<span>Comments</span>' +
                        '<input type="text" ng-model="NewDCModel.txtCommentsControlId" controlid="txtCommentsControlId" id="txtCommentsControlId" attributenodeid="8304">' +
                    '</label>' +
                '</div>' +
            '</div>' +

        '</div>' +

         '<div class="title-bar rounded">Ambient Temp Details</div>' +

            '<div class="row no-padding responsive-sm multi-col">' +

            '<div class="col rounded light-bg" id="Column_8754">' +
                    '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'ATDeliveryAmbientTempControlId\');SetAutoTemperatureListener(\'NewDCModel.ATDeliveryAmbientTempControlId\',\'\')">' +
                        '<label>' +
                            '<span>Delivery Ambient Temp(&deg;C)</span>' +
                            '<input type="tel" class="{{ATDeliveryAmbientTempControlId}}" ng-model="NewDCModel.ATDeliveryAmbientTempControlId" attributenodeid="8754" controlid="ATDeliveryAmbientTempControlId" id="ATDeliveryAmbientTempControlId" ng-change="MakeDecimalControl(\'ATDeliveryAmbientTempControlId\',\'#.#\');Temperature_NgKeyUp(8754,\'ATDeliveryAmbientTempControlId\',\'\', false,\'\')">' +
                            '<i class="icon icon-thermometer"></i>' +
                        '</label>' +
                    '</div>' +
                '</div>' +

                '<div class="col rounded light-bg" id="Column_8755">' +
                    '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'ATDispatchAmbientTempControlId\');SetAutoTemperatureListener(\'NewDCModel.ATDispatchAmbientTempControlId\',\'\')">' +
                        '<label>' +
                            '<span>Dispatch Ambient Temp(&deg;C)</span>' +
                            '<input type="tel" class="{{ATDispatchAmbientTempControlId}}" ng-model="NewDCModel.ATDispatchAmbientTempControlId" attributenodeid="8755" controlid="ATDispatchAmbientTempControlId" id="ATDispatchAmbientTempControlId" ng-change="MakeDecimalControl(\'ATDispatchAmbientTempControlId\',\'#.#\');Temperature_NgKeyUp(8755,\'ATDispatchAmbientTempControlId\',\'\', false,\'\')">' +
                            '<i class="icon icon-thermometer"></i>' +
                        '</label>' +
                    '</div>' +
                '</div>' +

             '</div>' +

      '</div>' +
     '</div>' +
    '</div>' +


'<div ng-show="DivNGForm">' +

'<div class="row responsive-md no-padding-vertical">' +

'<div class="col no-padding">' +

   '<div class="row no-padding responsive-sm multi-col">' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item" >' +
               '<label>' +
                   '<span>Department</span>' +
                   '<input type="text" ng-model="NewDCModel.ddlDepartmentControlId" attributenodeid="117" controlid="ddlDepartmentControlId" >' +
               '</label>' +
           '</div>' +
       '</div>' +

       '<div class="col rounded light-bg">' +

           '<div class="field-item" >' +
               '<label>' +
                   '<span>Section</span>' +
                   '<input type="text" ng-model="NewDCModel.ddlSectionControlId" attributenodeid="117" controlid="ddlSectionControlId">' +
               '</label>' +
           '</div>' +


       '</div>' +

   '</div>' +

   '<div class="title-bar rounded">Flight Details</div>' +

   '<div class="row no-padding responsive-sm multi-col">' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item">' +
               '<label>' +
                   '<span>Flight</span>' +
                   '<input type="text" ng-model="NewDCModel.AddlAirlineControlId" controlid="AddlAirlineControlId" disabled="disabled" />' +
               '</label>' +
           '</div>' +
       '</div>' +

       '<div class="col rounded light-bg" style="display:none;">' +
           '<div class="field-item with-icon">' +
               '<label>' +
                   '<span>E.T.A.</span>' +
                   '<input type="text" ng-model="NewDCModel.DTETAControlId" attributenodeid="120" controlid="DTETAControlId" id="DTETAControlId" disabled="disabled" />' +
                   '<i class="icon icon-clock-o"></i>' +
               '</label>' +
           '</div>' +
       '</div>' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item with-icon">' +
               '<label>' +
                   '<span>E.T.D.</span>' +
                   '<input type="text" ng-model="NewDCModel.DTETDControlId" attributenodeid="120" controlid="DTETDControlId" id="DTETDControlId" disabled="disabled" />' +
                   '<i class="icon icon-clock-o"></i>' +
               '</label>' +
           '</div>' +
       '</div>' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item">' +
               '<label>' +
                   '<span>Class</span>' +
                   '<input type="text" ng-model="NewDCModel.txtClassControlId" attributenodeid="121" controlid="txtClassControlId" disabled="disabled" />' +
               '</label>' +
           '</div>' +
       '</div>' +

   '</div>' +

'</div>' +

'<div class="col no-padding">' +

   '<div class="title-bar rounded">Meal Details</div>' +

   '<div class="row no-padding responsive-sm multi-col">' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item">' +
               '<label>' +
                   '<span>Meal Type</span>' +
                   '<input type="text" ng-model="NewDCModel.MealMealTypeControlId" attributenodeid="121" controlid="MealMealTypeControlId" disabled="disabled" />' +
               '</label>' +
           '</div>' +
       '</div>' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item with-icon">' +
               '<label>' +
                   '<span>Time Inspected</span>' +
                   '<input type="time" ng-model="NewDCModel.DTTimeInspectedControlId" attributenodeid="120" controlid="DTTimeInspectedControlId" id="DTTimeInspectedControlId" />' +
                   '<i class="icon icon-clock-o"></i>' +
               '</label>' +
           '</div>' +
       '</div>' +

   '</div>' +

   '<div class="row no-padding responsive-sm multi-col">' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item">' +
               '<label>' +
                   '<span>Name of the Meal</span>' +
                   '<input type="text" ng-model="NewDCModel.MealControlId" attributenodeid="121" controlid="MealControlId" disabled="disabled" />' +
               '</label>' +
           '</div>' +
       '</div>' +

   '</div>' +

'</div>' +

'</div>' +

'<div class="title-bar rounded">Reading</div>' +

'<div class="row no-padding responsive-md multi-col">' +

'<div class="col rounded light-bg">' +
   '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'Reading1ControlId\');SetAutoTemperatureListener(\'NewDCModel.Reading1ControlId\',\'\')">' +
       '<label>' +
           '<span>Reading 1</span>' +
           '<input type="tel" class="{{Reading1ControlId}}" ng-model="NewDCModel.Reading1ControlId" attributenodeid="119" controlid="Reading1ControlId" ng-change="MakeDecimalControl(\'Reading1ControlId\',\'#.#\');SetHygAvgrageReading();" id="Reading1ControlId">' +
           '<i class="icon icon-thermometer"></i>' +
       '</label>' +
   '</div>' +
'</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'Reading2ControlId\');SetAutoTemperatureListener(\'NewDCModel.Reading2ControlId\',\'\')">' +
                    '<label>' +
                        '<span>Reading 2</span>' +
                        '<input type="tel" class="{{Reading2ControlId}}" ng-model="NewDCModel.Reading2ControlId" attributenodeid="119" controlid="Reading2ControlId" ng-change="MakeDecimalControl(\'Reading2ControlId\',\'#.#\');SetHygAvgrageReading();" id="Reading2ControlId">' +
                        '<i class="icon icon-thermometer"></i>' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'Reading3ControlId\');SetAutoTemperatureListener(\'NewDCModel.Reading3ControlId\',\'\')">' +
                    '<label>' +
                        '<span>Reading 3</span>' +
                        '<input type="tel" class="{{Reading3TempControlId}}" ng-model="NewDCModel.Reading3ControlId" attributenodeid="119" controlid="Reading3ControlId" ng-change="MakeDecimalControl(\'Reading3ControlId\',\'#.#\');SetHygAvgrageReading();" id="Reading3ControlId">' +
                        '<i class="icon icon-thermometer"></i>' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'Reading4ControlId\');SetAutoTemperatureListener(\'NewDCModel.Reading4ControlId\',\'\')">' +
                    '<label>' +
                        '<span>Reading 4</span>' +
                        '<input type="tel" class="{{Reading4TempControlId}}" ng-model="NewDCModel.Reading4ControlId" attributenodeid="119" controlid="Reading4ControlId" ng-change="MakeDecimalControl(\'Reading4ControlId\',\'#.#\');SetHygAvgrageReading();" id="Reading4ControlId">' +
                        '<i class="icon icon-thermometer"></i>' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'Reading5ControlId\');SetAutoTemperatureListener(\'NewDCModel.Reading5ControlId\',\'\')">' +
                    '<label>' +
                        '<span>Reading 5</span>' +
                        '<input type="tel" class="{{Reading5TempControlId}}" ng-model="NewDCModel.Reading5ControlId" attributenodeid="119" controlid="Reading5ControlId" ng-change="MakeDecimalControl(\'Reading5ControlId\',\'#.#\');SetHygAvgrageReading();" id="Reading5ControlId">' +
                        '<i class="icon icon-thermometer"></i>' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon">' +
                    '<label>' +
                        '<span>Average Temp.</span>' +
                        '<input type="text" ng-model="NewDCModel.AverageTempControlId" attributenodeid="121" controlid="AverageTempControlId" disabled="disabled" />' +
                        '<i class="icon icon-thermometer"></i>' +
                    '</label>' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<div class="row no-padding responsive-md multi-col">' +

            '<div class="col rounded light-bg signature">' +
                '<div class="field-item">' +
                    '<div>' +
                        '<span>Enter Name</span>' +
                        '<input type="text" ng-model="NewDCModel.txtNcEnterNameControlId" attributenodeid="10321" controlid="txtNcEnterNameControlId" id="txtNcEnterNameControlId">' +
                    '</div>' +
                    '<div>' +
                        '<label>' +
                            '<span>{{lblSignature}}</span>' +
                        '</label>' +
                    '</div>' +
                    '<a href="javascript:void(0)" ng-click="Signature()" class="button button-icon icon icon-pencil"></a>' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<div class="row responsive-sm dc-button-holder">' +
            '<div class="col no-padding">' +
                '<a href="javascript:void(0)" ng-click="ShowResolution()" class="button button-block button-calm">{{\'Resolution\' | xlat}}</a>' +
            '</div>' +
            //'<div class="col no-padding">' +
            //    '<a href="javascript:void(0)" ng-click="HideNC()" class="button button-block button-stable">{{\'Cancel\' | xlat}}</a>' +
            //'</div>' +
            //'<div class="col no-padding">'+
            //    '<a href="javascript:void(0)" ng-click="SaveNCAction()" class="button button-block  button-calm">{{\'Save\' | xlat}}</a>'+
            //'</div>'+
        '</div>' +

 '</div>' +



'<div class="full-height" ng-show="ResolutionShow">' +

        '<div class="row no-padding responsive-md multi-col">' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon">' +
                    '<span>Decision Made to the Non-Conforming Product</span>' +
                    '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.txtDecisionControlId" options="ResolutionDetails" ng-model="NewDCModel.txtDecisionControlId" controlid="txtDecisionControlId"></buttons-band>' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<div class="row no-padding responsive-md multi-col">' +

            '<div class="col col-33 rounded light-bg">' +
                '<div class="field-item">' +
                    '<label>' +
                        '<span>Quantity of dry Ice Added (slabs)</span>' +
                        '<input type="number" ng-model="NewDCModel.txtQuantityControlId" attributenodeid="121" controlid="txtQuantityControlId" />' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item">' +
                    '<label>' +
                        '<span>Reason for the Above Action</span>' +
                        '<input type="text" ng-model="NewDCModel.txtReasonControlId" attributenodeid="121" controlid="txtReasonControlId" />' +
                    '</label>' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<div class="row no-padding responsive-md multi-col">' +

            '<div class="col rounded light-bg signature">' +
                '<div class="field-item">' +
                    '<div>' +
                        '<span>Enter Name</span>' +
                        //'<input type="text">' +
                           '<input type="text" ng-model="NewDCModel.txtResoultionEnterNameControlId" attributenodeid="10322" controlid="txtResoultionEnterNameControlId" id="txtResoultionEnterNameControlId">' +
                    '</div>' +
                    '<div>' +
                        '<label>' +
                            '<span>{{lblResultionSignature}}</span>' +
                        '</label>' +
                    '</div>' +
                    '<a href="javascript:void(0)" ng-click="ActionSignature()" class="button button-icon icon icon-pencil"></a>' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<div class="row responsive-sm dc-button-holder margin-top-md">' +
            '<div class="col no-padding">' +
                '<a href="javascript:void(0)" class="button button-block button-calm" ng-click="HideResolution();">NCR</a>' +
            '</div>' +

            '<div class="col no-padding">' +
                '<a href="javascript:void(0)" class="button button-block button-calm" ng-click="HideResolution();">Finalize NCR</a>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="scroll-content" ng-show="DivSignature">' +

        '<div class="signature-pad">' +
            '<div id="SignaturePad" class="m-signature-pad">' +
               ' <div class="m-signature-pad--body">' +
                    '<canvas></canvas>' +
                '</div>' +
                '<div class="m-signature-pad--footer">' +
                    '<div class="description">{{\'Signabove\' | xlat}}</div>' +
                    '<button class="button button-assertive clear" data-action="clear">{{\'Clear\' | xlat}}</button>' +
                    '<button class="button button-calm save" data-action="save">{{\'Save\' | xlat}}</button>' +
                '</div>' +
            '</div>' +
        '</div>' +

    '</div>' +
    '<div class="scroll-content" ng-show="DivNCSignature">' +

        '<div class="signature-pad">' +
            '<div id="ActionSignaturePad" class="m-signature-pad">' +
                '<div class="m-signature-pad--body">' +
                    '<canvas></canvas>' +
                '</div>' +
                '<div class="m-signature-pad--footer">' +
                    '<div class="description">{{\'Signabove\' | xlat}}</div>' +
                    '<button class="button button-assertive clear" data-action="clear">{{\'Clear\' | xlat}}</button>' +
                    '<button class="button button-calm save" data-action="save">{{\'Save\' | xlat}}</button>' +
                '</div>' +
            '</div>' +
        '</div>' +

    '</div>' +

                  '</div>' +
                '</div>' +

                '<div class="bar bar-footer no-padding">' +
                   '<div class="row">' +
                       '<div class="col"><a ng-click="ClearForm()" class="button button-block button-clear"><i class="icon icon-cancel-circle"></i> Clear</a></div>' +
                       '<div class="col"><a ng-click="AddRecords()" class="button button-block button-clear"><i class="icon icon-plus"></i> {{"Add" | xlat }}</a></div>' +
                       '<div class="col"><a ng-click="SubmitRecords()" class="button button-block button-clear"><i class="icon icon-check-circle"></i> {{"Save & Submit" | xlat }}</a></div>' +
                   '</div>' +
                '</div>' +

             '</div>'

	        ;

	        var _oOneViewCompiler = new OneViewCompiler();
	        _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "divAutocomplatePopUp");

	        _oOneViewSidePanel.Toggle(snapRemote);

	        $scope.$apply();
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.LoadFilterHtml", xlatService);
	    }
	}


	var LoadNewDispatchingPage = function ($compile, snapRemote, IsNC) {

	    try {
	        var _oOneViewSidePanel = new OneViewSidePanel();
	        _oOneViewSidePanel.Clear();

	        var Html =

                 '<div ng-controller="TemperatureVerificationofDispatchingController">';


	        Html += '<div class="bar bar-header">' +
                '<h3 style="width:100%">{{ NewDCModel.TxtFCOTypeControlId }} - {{ NewDCModel.MealControlId }}</h3>' +
            '</div>' +

              '<div class="scroll-content has-header has-footer padding grid-edit-form" style="background: #eef3f5;">' +
                '<div class="full-height scrollable">' +
                '<div ng-show="DivContent">' +


                ' <div class="row no-padding responsive-sm multi-col">' +
                     '<div class="col rounded light-bg">' +
                           ' <div class="field-item">' +
                               ' <label>' +
                                    '<span>Item No.</span>' +
                                   ' <input type="text" ng-model="NewDCModel.TxtFCOTypeControlId" controlid="TxtFCOTypeControlId" id="TxtFCOTypeControlId" attributenodeid="8288">' +
                                '</label>' +
                           ' </div>' +
                        '</div>' +

                    '<div class="col rounded light-bg">'+                                       
                           ' <div class="field-item">'+ 
                               ' <label>'+ 
                                    '<span>Name Of Meal</span>'+ 
                                   ' <input type="text" ng-model="NewDCModel.MealControlId" controlid="MealControlId" id="MealControlId" attributenodeid="8287">'+ 
                                '</label>'+ 
                           ' </div>'+ 
                        '</div>' +

                        '<div class="col rounded light-bg">' +
                           ' <div class="field-item">' +
                               ' <label>' +
                                    '<span>F&B</span>' +
                                   ' <input type="text" ng-model="NewDCModel.AddlFAndBControlId" controlid="AddlFAndBControlId" id="AddlFAndBControlId" attributenodeid="8277">' +
                                '</label>' +
                           ' </div>' +
                        '</div>' +
                '  </div>'+


                 '<div class="row no-padding responsive-sm multi-col">' +
                    '<div class="col rounded light-bg" id="Column_8290">' +
                            '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'ATDeliveryTempControlId\');SetAutoTemperatureListener(\'NewDCModel.ATDeliveryTempControlId\',\'\')">' +
                                '<label>' +
                                    '<span>Delivery Temp</span>' +
                                    '<input type="tel" ng-readonly="{{ATDeliveryTempControlId_IsReadOnly}}" class="{{ATDeliveryTempControlId}}" ng-model="NewDCModel.ATDeliveryTempControlId" attributenodeid="8290" controlid="ATDeliveryTempControlId" id="ATDeliveryTempControlId" ng-change="MakeDecimalControl(\'ATDeliveryTempControlId\',\'#.#\');Temperature_NgKeyUp(8290,\'ATDeliveryTempControlId\',\'DTDeliveryTimeControlId\', false,8291)">' +
                                    '<i class="icon icon-thermometer"></i>' +
                                '</label>' +
                            '</div>' +
                      '</div>' +

                      '<div class="col rounded light-bg" id="Column_8291">' +
                            '<div class="field-item with-icon">' +
                                '<label>' +
                                    '<span>Delivery Time</span>' +
                                    '<input type="time" ng-disabled="{{DTDeliveryTimeControlId_IsReadOnly}}" ng-change="ngChange_setIsManualFlag(\'DTDeliveryTimeControlId\');ngChange_setDateTime(\'DTDeliveryTimeControlId\');Temperature_NgKeyUp(8291,\'DTDeliveryTimeControlId\', \'\',false,\'\');" ng-model="NewDCModel.DTDeliveryTimeControlId" attributenodeid="8291" controlid="DTDeliveryTimeControlId" id="DTDeliveryTimeControlId">' +
                                    '<i class="icon icon-clock-o"></i>' +
                                '</label>' +
                           ' </div>' +
                       ' </div>' +
               '</div>' +



               '<div class="row no-padding responsive-sm multi-col">' +
                    '<div class="col rounded light-bg" id="Column_8293">' +
                            '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'ATDispatchTempControlId\');SetAutoTemperatureListener(\'NewDCModel.ATDispatchTempControlId\',\'\')">' +
                                '<label>' +
                                    '<span>Dispatch Temp</span>' +
                                    '<input type="tel" ng-readonly="{{ATDispatchTempControlId_IsReadOnly}}" class="{{ATDispatchTempControlId}}" ng-model="NewDCModel.ATDispatchTempControlId" attributenodeid="8293" controlid="ATDispatchTempControlId" id="ATDispatchTempControlId" ng-change="MakeDecimalControl(\'ATDispatchTempControlId\',\'#.#\');Temperature_NgKeyUp(8293,\'ATDispatchTempControlId\',\'DTDispatchTimeControlId\', false,8294)">' +
                                    '<i class="icon icon-thermometer"></i>' +
                                '</label>' +
                            '</div>' +
                      '</div>' +

                      '<div class="col rounded light-bg" id="Column_8294">' +
                            '<div class="field-item with-icon">' +
                                '<label>' +
                                    '<span>Dispatch Time</span>' +
                                    '<input type="time" ng-disabled="{{DTDispatchTimeControlId_IsReadOnly}}" ng-change="ngChange_setIsManualFlag(\'DTDispatchTimeControlId\');ngChange_setDateTime(\'DTDispatchTimeControlId\');Temperature_NgKeyUp(8294,\'DTDispatchTimeControlId\', \'\',false,\'\');" ng-model="NewDCModel.DTDispatchTimeControlId" attributenodeid="8294" controlid="DTDispatchTimeControlId" id="DTDispatchTimeControlId">' +
                                    '<i class="icon icon-clock-o"></i>' +
                                '</label>' +
                           ' </div>' +
                       ' </div>' +
               '</div>' +


                    '<div class="row responsive-md no-padding-vertical">' +
                        '<div class="col no-padding no-margin">' +
                          '<div class="title-bar rounded">Flight Details</div>' +

                          ' <div class="row no-padding responsive-sm multi-col">' +
                              '<div class="col rounded light-bg">' +
                                '<div class="field-item">' +
                                    '<label>' +
                                        '<span>Sector</span>' +
                                        '<input type="text" ng-model="NewDCModel.AddlSectorControlId" controlid="AddlSectorControlId" id="AddlSectorControlId" attributenodeid="8274" />' +


                                    '</label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col rounded light-bg">' +
                                '<div class="field-item">' +
                                    '<label>' +
                                        '<span>Airline</span>' +
                                        '<input type="text" ng-model="NewDCModel.AddlFlightControlId" controlid="AddlFlightControlId" id="AddlFlightControlId" attributenodeid="8275" >' +
                                    '</label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col rounded light-bg">' +
                                '<div class="field-item">' +
                                    '<label>' +
                                        '<span>Flight</span>' +
                                        '<input type="text" ng-model="NewDCModel.AddlAirlineControlId" controlid="AddlAirlineControlId" id="AddlAirlineControlId" attributenodeid="8276" >' +
                                    '</label>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +

                        '<div class="row no-padding responsive-sm multi-col">' +

                        '<div class="col rounded light-bg">' +
                            '<div class="field-item">' +
                                '<label>' +
                                    '<span>Class</span>' +
                                    '<input type="text" ng-model="NewDCModel.txtClassControlId" controlid="txtClassControlId" id="txtClassControlId" attributenodeid="8281" >' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col rounded light-bg" id="Column_339">' +
                            '<div class="field-item with-icon">' +
                                '<label>' +
                                    '<span>EDD</span>' +
                                    '<input type="date" ng-model="NewDCModel.DTETAControlId" attributenodeid="8279" controlid="DTETAControlId" id="DTETAControlId" >' +
                                    '<i class="icon icon-clock-o"></i>' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col rounded light-bg" id="Column_339">' +
                            '<div class="field-item with-icon">' +
                                '<label>' +
                                    '<span>ETD</span>' +
                                    '<input type="time" ng-model="NewDCModel.DTETDControlId" attributenodeid="8280" controlid="DTETDControlId" id="DTETDControlId" >' +
                                    '<i class="icon icon-clock-o"></i>' +
                                '</label>' +
                            '</div>' +
                        '</div>' +

                    '</div>' +

                    '</div>' +

                    '</div>' +

                     '<div class="row responsive-md no-padding-vertical">' +

			'<div class="col no-padding">' +

            '<div class="title-bar rounded">Hi-Loader Details</div>' +

             '<div class="row no-padding responsive-sm multi-col">' +


                '<div class="col rounded light-bg">' +
                    '<div class="field-item">' +
                        '<label>' +
                            '<span>Hi-Loader No</span>' +
                            '<input type="text" ng-model="NewDCModel.txtHiLoaderNoControlId" controlid="txtHiLoaderNoControlId" id="txtHiLoaderNoControlId" attributenodeid="8298">' +
                        '</label>' +
                    '</div>' +
                '</div>' +

                '<div class="col rounded light-bg" id="Column_339">' +
                    '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'ATHiLoaderTempControlId\');SetAutoTemperatureListener(\'NewDCModel.ATHiLoaderTempControlId\',\'\')">' +
                        '<label>' +
                            '<span>Hi-Loader Temp</span>' +
                            '<input type="tel" class="{{ATHiLoaderTempControlId}}" ng-model="NewDCModel.ATHiLoaderTempControlId" attributenodeid="8303" controlid="ATHiLoaderTempControlId" id="ATHiLoaderTempControlId" ng-change="MakeDecimalControl(\'ATHiLoaderTempControlId\',\'#.#\');Temperature_NgKeyUp(2613,\'ATHiLoaderTempControlId\',\'txtTimeofLoadingControlId\', false,8296)">' +
                            '<i class="icon icon-thermometer"></i>' +
                        '</label>' +
                    '</div>' +
                '</div>' +

                 '</div>' +

                '<div class="row no-padding responsive-sm multi-col">' +

                '<div class="col rounded light-bg" id="Column_339">' +
                    '<div class="field-item with-icon">' +
                        '<label>' +
                            '<span>Time Of Loading</span>' +
                            '<input type="datetime-local" ng-model="NewDCModel.txtTimeofLoadingControlId" attributenodeid="8296" controlid="txtTimeofLoadingControlId" id="txtTimeofLoadingControlId">' +
                            '<i class="icon icon-clock-o"></i>' +
                        '</label>' +
                    '</div>' +
                '</div>' +

                '<div class="col rounded light-bg" id="Column_339">' +
                    '<div class="field-item with-icon">' +
                        '<label>' +
                            '<span>Time Of Moving</span>' +
                            '<input type="datetime-local" ng-model="NewDCModel.DTTimeofMovingControlId" attributenodeid="8297" controlid="DTTimeofMovingControlId" id="DTTimeofMovingControlId">' +
                            '<i class="icon icon-clock-o"></i>' +
                        '</label>' +
                    '</div>' +
                '</div>' +


                '</div>' +

                '<div class="title-bar rounded">Refrigerator Details</div>' +

                '<div class="row no-padding responsive-sm multi-col">' +

                '<div class="col rounded light-bg" id="Column_63">' +
                    '<div class="field-item with-icon">' +
                        '<span>Refrigerator Condition</span>' +
                        '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.chkRefrigeratorConditionControlId" options="RefrigeratorConditions" ng-model="NewDCModel.chkRefrigeratorConditionControlId" attributenodeid="8299" controlid="chkRefrigeratorConditionControlId"></buttons-band>' +
                    '</div>' +
                '</div>' +

                '<div class="col rounded light-bg" id="Column_63">' +
                    '<div class="field-item with-icon">' +
                        '<span>Refrigerator Status</span>' +
                        '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.chkRefrigeratorStatusControlId" options="RefrigeratorStatus" ng-model="NewDCModel.chkRefrigeratorStatusControlId" attributenodeid="8300" controlid="chkRefrigeratorStatusControlId"></buttons-band>' +
                    '</div>' +
                '</div>' +

            '</div>' +

              '</div>' +

                 '<div class="col no-padding">' +

            '<div class="title-bar rounded">Other Details</div>' +

            '<div class="row no-padding responsive-sm multi-col">' +


              '<div class="col rounded light-bg" id="Column_63">' +
                    '<div class="field-item with-icon">' +
                        '<span>Meals In Oven</span>' +
                        '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.chkMealsinOvenControlId" options="MealsinOvens" ng-model="NewDCModel.chkMealsinOvenControlId" attributenodeid="8302" controlid="chkMealsinOvenControlId"></buttons-band>' +
                    '</div>' +
                '</div>' +

             '<div class="col rounded light-bg" id="Column_63">' +
                    '<div class="field-item with-icon">' +
                        '<span>Dry Ice Added</span>' +
                       // '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.chkMealsinOvenControlId" options="MealsinOvens" ng-model="NewDCModel.chkMealsinOvenControlId" attributenodeid="8302" controlid="chkMealsinOvenControlId"></buttons-band>' +
                        '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.chkDryIceAddedControlId" options="DryIceAddeds" ng-model="NewDCModel.chkDryIceAddedControlId" attributenodeid="8303" controlid="chkDryIceAddedControlId"></buttons-band>' +
                    '</div>' +
                '</div>' +

                 '</div>' +

                '<div class="row no-padding responsive-sm multi-col">' +

                '<div class="col rounded light-bg">' +
                '<div class="field-item">' +
                    '<label>' +
                        '<span>Type Of Meal</span>' +
                        //'<input type="text" ng-model="NewDCModel.TxtFCOTypeControlId" controlid="TxtFCOTypeControlId" id="TxtFCOTypeControlId" attributenodeid="8285">' +
                        '<input type="text" ng-model="NewDCModel.MealMealTypeControlId" controlid="MealMealTypeControlId" id="MealMealTypeControlId" attributenodeid="8285">' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item">' +
                    '<label>' +
                        '<span>Comments</span>' +
                        '<input type="text" ng-model="NewDCModel.txtCommentsControlId" controlid="txtCommentsControlId" id="txtCommentsControlId" attributenodeid="8304">' +
                    '</label>' +
                '</div>' +
            '</div>' +

        '</div>' +

         '<div class="title-bar rounded">Ambient Temp Details</div>' +

            '<div class="row no-padding responsive-sm multi-col">' +

            '<div class="col rounded light-bg" id="Column_8754">' +
                    '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'ATDeliveryAmbientTempControlId\');SetAutoTemperatureListener(\'NewDCModel.ATDeliveryAmbientTempControlId\',\'\')">' +
                        '<label>' +
                            '<span>Delivery Ambient Temp</span>' +
                            '<input type="tel" class="{{ATDeliveryAmbientTempControlId}}" ng-model="NewDCModel.ATDeliveryAmbientTempControlId" attributenodeid="8754" controlid="ATDeliveryAmbientTempControlId" id="ATDeliveryAmbientTempControlId" ng-change="MakeDecimalControl(\'ATDeliveryAmbientTempControlId\',\'#.#\');Temperature_NgKeyUp(8754,\'ATDeliveryAmbientTempControlId\',\'\', false,\'\')">' +
                            '<i class="icon icon-thermometer"></i>' +
                        '</label>' +
                    '</div>' +
                '</div>' +

                '<div class="col rounded light-bg" id="Column_8755">' +
                    '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'ATDispatchAmbientTempControlId\');SetAutoTemperatureListener(\'NewDCModel.ATDispatchAmbientTempControlId\',\'\')">' +
                        '<label>' +
                            '<span>Dispatch Ambient Temp</span>' +
                            '<input type="tel" class="{{ATDispatchAmbientTempControlId}}" ng-model="NewDCModel.ATDispatchAmbientTempControlId" attributenodeid="8755" controlid="ATDispatchAmbientTempControlId" id="ATDispatchAmbientTempControlId" ng-change="MakeDecimalControl(\'ATDispatchAmbientTempControlId\',\'#.#\');Temperature_NgKeyUp(8755,\'ATDispatchAmbientTempControlId\',\'\', false,\'\')">' +
                            '<i class="icon icon-thermometer"></i>' +
                        '</label>' +
                    '</div>' +
                '</div>' +

             '</div>' +

      '</div>' +
     '</div>' +
    '</div>' +


'<div ng-show="DivNGForm">' +

'<div class="row responsive-md no-padding-vertical">' +

'<div class="col no-padding">' +

   '<div class="row no-padding responsive-sm multi-col">' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item" >' +
               '<label>' +
                   '<span>Department</span>' +
                   '<input type="text" ng-model="NewDCModel.ddlDepartmentControlId" attributenodeid="117" controlid="ddlDepartmentControlId" >' +
               '</label>' +
           '</div>' +
       '</div>' +

       '<div class="col rounded light-bg">' +

           '<div class="field-item" >' +
               '<label>' +
                   '<span>Section</span>' +
                   '<input type="text" ng-model="NewDCModel.ddlSectionControlId" attributenodeid="117" controlid="ddlSectionControlId">' +
               '</label>' +
           '</div>' +


       '</div>' +

   '</div>' +

   '<div class="title-bar rounded">Flight Details</div>' +

   '<div class="row no-padding responsive-sm multi-col">' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item">' +
               '<label>' +
                   '<span>Flight</span>' +
                   '<input type="text" ng-model="NewDCModel.AddlAirlineControlId" controlid="AddlAirlineControlId" disabled="disabled" />' +
               '</label>' +
           '</div>' +
       '</div>' +

       '<div class="col rounded light-bg" style="display:none;">' +
           '<div class="field-item with-icon">' +
               '<label>' +
                   '<span>E.T.A.</span>' +
                   '<input type="text" ng-model="NewDCModel.DTETAControlId" attributenodeid="120" controlid="DTETAControlId" id="DTETAControlId" disabled="disabled" />' +
                   '<i class="icon icon-clock-o"></i>' +
               '</label>' +
           '</div>' +
       '</div>' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item with-icon">' +
               '<label>' +
                   '<span>E.T.D.</span>' +
                   '<input type="text" ng-model="NewDCModel.DTETDControlId" attributenodeid="120" controlid="DTETDControlId" id="DTETDControlId" disabled="disabled" />' +
                   '<i class="icon icon-clock-o"></i>' +
               '</label>' +
           '</div>' +
       '</div>' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item">' +
               '<label>' +
                   '<span>Class</span>' +
                   '<input type="text" ng-model="NewDCModel.txtClassControlId" attributenodeid="121" controlid="txtClassControlId" disabled="disabled" />' +
               '</label>' +
           '</div>' +
       '</div>' +

   '</div>' +

'</div>' +

'<div class="col no-padding">' +

   '<div class="title-bar rounded">Meal Details</div>' +

   '<div class="row no-padding responsive-sm multi-col">' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item">' +
               '<label>' +
                   '<span>Meal Type</span>' +
                   '<input type="text" ng-model="NewDCModel.MealMealTypeControlId" attributenodeid="121" controlid="MealMealTypeControlId" disabled="disabled" />' +
               '</label>' +
           '</div>' +
       '</div>' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item with-icon">' +
               '<label>' +
                   '<span>Time Inspected</span>' +
                   '<input type="time" ng-model="NewDCModel.DTTimeInspectedControlId" attributenodeid="120" controlid="DTTimeInspectedControlId" id="DTTimeInspectedControlId" />' +
                   '<i class="icon icon-clock-o"></i>' +
               '</label>' +
           '</div>' +
       '</div>' +

   '</div>' +

   '<div class="row no-padding responsive-sm multi-col">' +

       '<div class="col rounded light-bg">' +
           '<div class="field-item">' +
               '<label>' +
                   '<span>Name of the Meal</span>' +
                   '<input type="text" ng-model="NewDCModel.MealControlId" attributenodeid="121" controlid="MealControlId" disabled="disabled" />' +
               '</label>' +
           '</div>' +
       '</div>' +

   '</div>' +

'</div>' +

'</div>' +

'<div class="title-bar rounded">Reading</div>' +

'<div class="row no-padding responsive-md multi-col">' +

'<div class="col rounded light-bg">' +
   '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'Reading1ControlId\');SetAutoTemperatureListener(\'NewDCModel.Reading1ControlId\',\'\')">' +
       '<label>' +
           '<span>Reading 1</span>' +
           '<input type="tel" class="{{Reading1ControlId}}" ng-model="NewDCModel.Reading1ControlId" attributenodeid="119" controlid="Reading1ControlId" ng-change="MakeDecimalControl(\'Reading1ControlId\',\'#.#\');SetHygAvgrageReading();" id="Reading1ControlId">' +
           '<i class="icon icon-thermometer"></i>' +
       '</label>' +
   '</div>' +
'</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'Reading2ControlId\');SetAutoTemperatureListener(\'NewDCModel.Reading2ControlId\',\'\')">' +
                    '<label>' +
                        '<span>Reading 2</span>' +
                        '<input type="tel" class="{{Reading2ControlId}}" ng-model="NewDCModel.Reading2ControlId" attributenodeid="119" controlid="Reading2ControlId" ng-change="MakeDecimalControl(\'Reading2ControlId\',\'#.#\');SetHygAvgrageReading();" id="Reading2ControlId">' +
                        '<i class="icon icon-thermometer"></i>' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'Reading3ControlId\');SetAutoTemperatureListener(\'NewDCModel.Reading3ControlId\',\'\')">' +
                    '<label>' +
                        '<span>Reading 3</span>' +
                        '<input type="tel" class="{{Reading3TempControlId}}" ng-model="NewDCModel.Reading3ControlId" attributenodeid="119" controlid="Reading3ControlId" ng-change="MakeDecimalControl(\'Reading3ControlId\',\'#.#\');SetHygAvgrageReading();" id="Reading3ControlId">' +
                        '<i class="icon icon-thermometer"></i>' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'Reading4ControlId\');SetAutoTemperatureListener(\'NewDCModel.Reading4ControlId\',\'\')">' +
                    '<label>' +
                        '<span>Reading 4</span>' +
                        '<input type="tel" class="{{Reading4TempControlId}}" ng-model="NewDCModel.Reading4ControlId" attributenodeid="119" controlid="Reading4ControlId" ng-change="MakeDecimalControl(\'Reading4ControlId\',\'#.#\');SetHygAvgrageReading();" id="Reading4ControlId">' +
                        '<i class="icon icon-thermometer"></i>' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon" ng-click="SetSelectedTextBoxColor(\'Reading5ControlId\');SetAutoTemperatureListener(\'NewDCModel.Reading5ControlId\',\'\')">' +
                    '<label>' +
                        '<span>Reading 5</span>' +
                        '<input type="tel" class="{{Reading5TempControlId}}" ng-model="NewDCModel.Reading5ControlId" attributenodeid="119" controlid="Reading5ControlId" ng-change="MakeDecimalControl(\'Reading5ControlId\',\'#.#\');SetHygAvgrageReading();" id="Reading5ControlId">' +
                        '<i class="icon icon-thermometer"></i>' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon">' +
                    '<label>' +
                        '<span>Average Temp.</span>' +
                        '<input type="text" ng-model="NewDCModel.AverageTempControlId" attributenodeid="121" controlid="AverageTempControlId" disabled="disabled" />' +
                        '<i class="icon icon-thermometer"></i>' +
                    '</label>' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<div class="row no-padding responsive-md multi-col">' +

            '<div class="col rounded light-bg signature">' +
                '<div class="field-item">' +
                    '<div>' +
                        '<span>Enter Name</span>' +
                        '<input type="text" ng-model="NewDCModel.txtNcEnterNameControlId" attributenodeid="10321" controlid="txtNcEnterNameControlId" id="txtNcEnterNameControlId">' +
                    '</div>' +
                    '<div>' +
                        '<label>' +
                            '<span>{{lblSignature}}</span>' +
                        '</label>' +
                    '</div>' +
                    '<a href="javascript:void(0)" ng-click="Signature()" class="button button-icon icon icon-pencil"></a>' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<div class="row responsive-sm dc-button-holder">' +
            '<div class="col no-padding">' +
                '<a href="javascript:void(0)" ng-click="ShowResolution()" class="button button-block button-calm">{{\'Resolution\' | xlat}}</a>' +
            '</div>' +
            '<div class="col no-padding">' +
                '<a href="javascript:void(0)" ng-click="HideNC()" class="button button-block button-stable"><i class="icon icon-cancel-circle"></i> {{\'Cancel\' | xlat}}</a>' +
            '</div>' +
            '<div class="col no-padding">'+
                '<a href="javascript:void(0)" ng-click="SaveNCAction()" class="button button-block  button-calm"><i class="icon icon-plus"></i> {{\'Save\' | xlat}}</a>' +
            '</div>'+
        '</div>' +

 '</div>' +



'<div class="full-height" ng-show="ResolutionShow">' +

        '<div class="row no-padding responsive-md multi-col">' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item with-icon">' +
                    '<span>Decision Made to the Non-Conforming Product</span>' +
                    '<buttons-band class="button-bar" data-toggle="buttons-band" model="NewDCModel.txtDecisionControlId" options="ResolutionDetails" ng-model="NewDCModel.txtDecisionControlId" controlid="txtDecisionControlId"></buttons-band>' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<div class="row no-padding responsive-md multi-col">' +

            '<div class="col col-33 rounded light-bg">' +
                '<div class="field-item">' +
                    '<label>' +
                        '<span>Quantity of dry Ice Added (slabs)</span>' +
                        '<input type="number" ng-model="NewDCModel.txtQuantityControlId" attributenodeid="121" controlid="txtQuantityControlId" />' +
                    '</label>' +
                '</div>' +
            '</div>' +

            '<div class="col rounded light-bg">' +
                '<div class="field-item">' +
                    '<label>' +
                        '<span>Reason for the Above Action</span>' +
                        '<input type="text" ng-model="NewDCModel.txtReasonControlId" attributenodeid="121" controlid="txtReasonControlId" />' +
                    '</label>' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<div class="row no-padding responsive-md multi-col">' +

            '<div class="col rounded light-bg signature">' +
                '<div class="field-item">' +
                    '<div>' +
                        '<span>Enter Name</span>' +
                        //'<input type="text">' +
                           '<input type="text" ng-model="NewDCModel.txtResoultionEnterNameControlId" attributenodeid="10322" controlid="txtResoultionEnterNameControlId" id="txtResoultionEnterNameControlId">' +
                    '</div>' +
                    '<div>' +
                        '<label>' +
                            '<span>{{lblResultionSignature}}</span>' +
                        '</label>' +
                    '</div>' +
                    '<a href="javascript:void(0)" ng-click="ActionSignature()" class="button button-icon icon icon-pencil"></a>' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<div class="row responsive-sm dc-button-holder margin-top-md">' +
            '<div class="col no-padding">' +
                '<a href="javascript:void(0)" class="button button-block button-calm" ng-click="HideResolution();">NCR</a>' +
            '</div>' +

            '<div class="col no-padding">' +
                '<a href="javascript:void(0)" class="button button-block button-calm" ng-click="HideResolution();">Finalize NCR</a>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="scroll-content" ng-show="DivSignature">' +

        '<div class="signature-pad">' +
            '<div id="SignaturePad" class="m-signature-pad">' +
               ' <div class="m-signature-pad--body">' +
                    '<canvas></canvas>' +
                '</div>' +
                '<div class="m-signature-pad--footer">' +
                    '<div class="description">{{\'Signabove\' | xlat}}</div>' +
                    '<button class="button button-assertive clear" data-action="clear">{{\'Clear\' | xlat}}</button>' +
                    '<button class="button button-calm save" data-action="save">{{\'Save\' | xlat}}</button>' +
                '</div>' +
            '</div>' +
        '</div>' +

    '</div>' +
    '<div class="scroll-content" ng-show="DivNCSignature">' +

        '<div class="signature-pad">' +
            '<div id="ActionSignaturePad" class="m-signature-pad">' +
                '<div class="m-signature-pad--body">' +
                    '<canvas></canvas>' +
                '</div>' +
                '<div class="m-signature-pad--footer">' +
                    '<div class="description">{{\'Signabove\' | xlat}}</div>' +
                    '<button class="button button-assertive clear" data-action="clear">{{\'Clear\' | xlat}}</button>' +
                    '<button class="button button-calm save" data-action="save">{{\'Save\' | xlat}}</button>' +
                '</div>' +
            '</div>' +
        '</div>' +

    '</div>' +

                  '</div>' +
                '</div>' +

                '<div class="bar bar-footer no-padding">' +
                   '<div class="row">' +
                       '<div class="col"><a ng-click="ClearForm()" class="button button-block button-clear"><i class="icon icon-cancel-circle"></i> Clear</a></div>' +
                       '<div class="col"><a ng-click="AddRecords()" class="button button-block button-clear"><i class="icon icon-plus"></i> {{"Add" | xlat }}</a></div>' +
                       '<div class="col"><a ng-click="SubmitRecords()" class="button button-block button-clear"><i class="icon icon-check-circle"></i> {{"Save & Submit" | xlat }}</a></div>' +
                   '</div>' +
                '</div>' +

             '</div>'

	        ;

	        var _oOneViewCompiler = new OneViewCompiler();
	        _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "divAutocomplatePopUp");

	        _oOneViewSidePanel.Toggle(snapRemote);

	        $scope.$apply();
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.LoadFilterHtml", xlatService);
	    }
	}

	this.CloseRightPanel = function (snapRemote)
	{	   
	    try {
	        //alert("Close right panel inside check");
	        var _oOneViewSidePanel = new OneViewSidePanel();
	        _oOneViewSidePanel.Toggle(snapRemote);
	        scope = $scope;
	        scope.divNCButton = false;
	        xlatService.setCurrentPage('11');
	        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
	        oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = this.SetTemperature;
	        this.PageLoad();
	        if (document.getElementById('divHide') != null) {
	            document.getElementById('divHide').innerHTML = "";
	        }
	    }
	    catch (Excep) {
	        // alert('CloseRightPanel exception: ' + e);
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.CloseRightPanel", xlatService);
	    }
	}
	
	var GetDCPlaceParentIdByType = function (Type)
	{
	    var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");

	    var DCPlaceQuery = 'select [Left],[Right] from OrganizationAssetsNode where ServerId=' + DCPlaceNodeId;
	    // alert(DCPlaceQuery);
	    var DCPlaceresults = window.OneViewSqlite.excecuteSqlReader(DCPlaceQuery);
	    DCPlaceresults = JSON.parse(DCPlaceresults);

	    //alert('results' + JSON.stringify(DCPlaceresults));

	    var qryParentID = 'select ServerId from OrganizationAssetsNode where [Left]<=' + DCPlaceresults[0].Left + ' and [Right]>=' + DCPlaceresults[0].Right + ' and childDbElementType=' + Type;
	    var qryParentIDResult = window.OneViewSqlite.excecuteSqlReader(qryParentID);
	    qryParentIDResult = JSON.parse(qryParentIDResult);
	    return qryParentIDResult[0].ServerId
	}
	this.SetAutoTemperatureListener = function (FieldName, DataCaptureId) {

	    try {


	        OneViewConsole.Debug("SetAutoTemperatureListener start", "ViewRecordsFacade.SetAutoTemperatureListener");

	        var CurrentRow = document.getElementById("Row_" + RowIndex);

	        if (CurrentRow != null) {
	            var CurrentDataCaptureId = CurrentRow.attributes['DataCaptureId'].value;	           
	            if (CurrentDataCaptureId != DataCaptureId) {
	                if (DefaultInlineEditConfig != null && CurrentDataCaptureId != null) {
	                    RemoveMarker(DefaultInlineEditConfig.FieldName + CurrentDataCaptureId);
	                }
	            }
	        }

	        IsColumnClick = false;
	        
	        if (AutoTemperatureListnerControlConfig != null) {
	            for (var i = 0; i < AutoTemperatureListnerControlConfig.ControlList.length; i++) {
	                if (AutoTemperatureListnerControlConfig.ControlList[i].FieldName == FieldName) {
	                    if (DefaultInlineEditConfig != null) {
	                        RemoveMarker(DefaultInlineEditConfig.FieldName + DataCaptureId);
	                    }
	                   // alert('going to mark');
	                    AddMarker(FieldName + DataCaptureId);
	                    DefaultInlineEditConfig = AutoTemperatureListnerControlConfig.ControlList[i];
	                    IsColumnClick = true;
	                    break;
	                }	                
	            }	           
	        }
	       
	        OneViewConsole.Debug("SetAutoTemperatureListener end", "ViewRecordsFacade.SetAutoTemperatureListener");
	    }
	    catch (Excep) {	       
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.SetAutoTemperatureListener", xlatService);
	    }
	    finally {
	        oGridControl = null;
	    }
	}

	var SetDefaultAutoTemperatureListener = function (PreviousDataCaptureId, CurrentDataCaptureId) {

	    try {
	        OneViewConsole.Debug("SetDefaultAutoTemperatureListener start", "ViewRecordsFacade.SetDefaultAutoTemperatureListener");
	       // alert('SetDefaultAutoTemperatureListener' + PreviousDataCaptureId + ' , ' + CurrentDataCaptureId);

	        if (IsColumnClick != true) {
	         //   alert('IsColumnClick false')
	            if (DefaultInlineEditConfig != null && PreviousDataCaptureId != null) {
	                RemoveMarker(DefaultInlineEditConfig.FieldName + PreviousDataCaptureId);
	            }
	            if (AutoTemperatureListnerControlConfig != null) {

	                if (AutoTemperatureListnerControlConfig.IsColumnWise == true)
	                {
	                    var prevFieldName='';
	                    if(DefaultInlineEditConfig !=null)
	                        prevFieldName=DefaultInlineEditConfig.FieldName;
	                    if(prevFieldName !='')
	                    {
	                        for (var i = 0; i < AutoTemperatureListnerControlConfig.ControlList.length; i++) {
	                            if (AutoTemperatureListnerControlConfig.ControlList[i].FieldName == prevFieldName) {
	                                DefaultInlineEditConfig = AutoTemperatureListnerControlConfig.ControlList[i];
	                                break;
	                            }
	                        }
	                    }
	                    else
	                        DefaultInlineEditConfig=AutoTemperatureListnerControlConfig.ControlList[0];

	                    AddMarker(DefaultInlineEditConfig.FieldName + CurrentDataCaptureId);
                           
	                }
	                else if (AutoTemperatureListnerControlConfig.IsRowWise == true) {

	                    alert('not implemented exception //AutoTemperatureListnerControlConfig.IsRowWise=true');
	                    //for (var i = 0; i < AutoTemperatureListnerControlConfig.length; i++) {
	                    //    var _oColumnDOM = document.getElementById("Span_" + AutoTemperatureListnerControlConfig[i].FieldName + CurrentDataCaptureId);
                        //  if ((_oColumnDOM != null && _oColumnDOM.innerHTML == "") || (i == (AutoTemperatureListnerControlConfig.length - 1))) {
	                    //        //  alert('SetDefaultAutoTemperatureListener going to mark');
	                    //        AddMarker(AutoTemperatureListnerControlConfig[i].FieldName + CurrentDataCaptureId);
	                    //        DefaultInlineEditConfig = AutoTemperatureListnerControlConfig[i];
	                    //        break;
	                    //    }
	                    //}
	                }
	            }
	        }

	        OneViewConsole.Debug("SetDefaultAutoTemperatureListener end", "ViewRecordsFacade.SetDefaultAutoTemperatureListener");
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.SetDefaultAutoTemperatureListener", xlatService);
	    }
	    finally {
	        oGridControl = null;
	    }
	}

	var AddMarker = function (Id) {
	    try {
	        OneViewConsole.Debug("AddMarker start", "ViewRecordsBO.AddMarker");

	        var Row = document.getElementById(Id);
	        if (Row != null) {
	            Row.className = Row.className + " marker";
	        }

	        OneViewConsole.Debug("AddMarker end", "ViewRecordsBO.AddMarker");
	    }
	    catch (Excep) {
	        throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.AddMarker", Excep);
	    }
	    finally {
	        Row = null;
	    }
	}

	var RemoveMarker = function (Id) {
	    try {
	        OneViewConsole.Debug("RemoveMarker start", "ViewRecordsBO.RemoveMarker");

	        var RegularExpressionForRemoveClass = new RegExp('(\\s|^)marker(\\s|$)');
	        var Row = document.getElementById(Id);
	        if (Row != null) {
	            Row.className = Row.className.replace(RegularExpressionForRemoveClass, ' ');
	        }

	        OneViewConsole.Debug("RemoveMarker end", "ViewRecordsBO.RemoveMarker");
	    }
	    catch (Excep) {
	        throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.RemoveMarker", Excep);
	    }
	    finally {
	        RegularExpressionForRemoveClass = null;
	        Row = null;
	    }
	}

	this.PageLoad = function ($compile) {
        try {
            OneViewConsole.Debug("PageLoad start", "ViewRecordsFacade.PageLoad");
            
			_oViewRecordsBO.SetHeaderHeight($scope);			
			if(FilterRuleConfig != null){
				_oViewRecordsBO.SetDCFilterEquation(FilterRuleConfig);	
			}
			if (GridConfig != null) {
			    //_oViewRecordsBO.GetDataSource($scope);
			    DcInfoViewRecords == null;
			    GridDataSource = null;
			    _oViewRecordsBO.GetDataSourceWithFilters($scope, FilterRuleConfig);
			    _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);			  
			}

			$scope.CurrentPage = PageNumber;
					
			if (PageCount == 1 || PageCount == 0) {			   
			    $scope.GridInstance.Hide('Previous');
			    $scope.GridInstance.Hide('Next');			    
			}
			else if (PageCount > 1) {			 
			    $scope.GridInstance.Show('Next');
			}
			
			_oSettingsBO.ShowAutoManualStatus(scope);

			OneViewConsole.Debug("PageLoad end", "ViewRecordsFacade.PageLoad");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.PageLoad", xlatService);
		}        
	}

	this.ToggleFilterPopUp = function ($compile, snapRemote) {
	    try {
	        if (FilterRuleConfig != null) {
	            LoadFilterHtml($compile, snapRemote);
	        }
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ToggleFilterPopUp", xlatService);
	    }
	}

	this.ToggleResponsivePopUp = function ($compile, snapRemote) {
	    try {
	        if (GridConfig != null) {
	            LoadResposiveHtml($compile, snapRemote);
	        }
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ToggleResponsivePopUp", xlatService);
	    }	    
	}

	this.ResetResposiveFilter = function () {
	    try {
	        for (var i = 0; i < $scope.ResponsiveData.length; i++) {
	            if ($scope.ResponsiveData[i].selected != "selected") {
	                $scope.ResponsiveData[i].selected = "selected";
	                this.ResponsiveFieldChanged($scope.ResponsiveData[i]);
	            }
	        }
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ResetResposiveFilter", xlatService);
	    }	    
	}

	var LoadResposiveHtml = function ($compile, snapRemote) {
        
	    try{
	        var _oOneViewSidePanel = new OneViewSidePanel(snapRemote);
	        _oOneViewSidePanel.Clear();

	        var Html = '<div class="bar bar-header"><h3>Show/Hide</h3></div><div class="scroll-content scrollable has-header has-footer">' +
                            '<tick-list multiple="true" selected-icon="ion-checkmark">' +
                               '<tick-list-item ng-repeat="header in ResponsiveData" selected="{{header.selected}}" selected-icon="{{facility.icon}}" model="header" on-change="ResponsiveFieldChanged(header)">{{header.DisplayName}}</tick-list-item>' +
                           '</tick-list></div>' +
                       '<div class="bar bar-footer no-padding"><div class="row"><div class="col"><a class="button button-block button-clear" ng-click="CloseGrigFilter()">Close</a></div><div class="col"><a class="button button-block button-clear" ng-click="ResetResposiveFilter()">Reset</a></div></div></div>';

	        var _oOneViewCompiler = new OneViewCompiler();
	        _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "divAutocomplatePopUp");

	        _oOneViewSidePanel.Toggle(snapRemote);
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.LoadResposiveHtml", xlatService);
	    }
	}

	var LoadFilterHtml = function ($compile, snapRemote) {

	    try {
	        var _oOneViewSidePanel = new OneViewSidePanel();
	        _oOneViewSidePanel.Clear();

	        var Html = '<div class="bar bar-header"><h3>Filter</h3></div><div class="scroll-content scrollable has-header has-footer">' +
                            '<tick-list multiple="true" selected-icon="ion-checkmark">' +
                                '<tick-list-item ng-repeat="header in FilterData" selected="{{header.selected}}" selected-icon="{{facility.icon}}" model="header" on-change="FilterDataChanged(header)">{{header.DisplayName}}</tick-list-item>' +
                            '</tick-list></div>' +
                            '<div class="bar bar-footer no-padding"><div class="row">' +
                                '<div class="col"><a class="button button-block button-clear" ng-click="CloseGrigFilter()"><i class="icon ion-close-round"></i>Close</a></div>' +
                                '<div class="col"><a class="button button-block button-clear" ng-click="ApplyFilter()"><i class="icon ion-close-round"></i>Apply</a></div>' +
                            '</div>' +
                       '</div>';

	        var _oOneViewCompiler = new OneViewCompiler();
	        _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "divAutocomplatePopUp");

	        _oOneViewSidePanel.Toggle(snapRemote);
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.LoadFilterHtml", xlatService);
	    }
	}

    this.GraphSearch = function () {
        try {
            OneViewConsole.Debug("GraphSearch start", "ViewRecordsFacade.GraphSearch");

            DcInfoViewRecords = null;

            PageNumber = 1;
            $scope.CurrentPage = PageNumber;

            _oViewRecordsBO.GetDataSourceWithFilters($scope, FilterRuleConfig);
            _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);
           
            ResetGridStatus($scope);

            OneViewConsole.Debug("GraphSearch end", "ViewRecordsFacade.GraphSearch");
		}
		catch (Excep) {
		    oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.GraphSearch", xlatService);
		}    
    }

    var ResetGridStatus = function ($scope) {

        try {
            OneViewConsole.Debug("ResetGridStatus start", "ViewRecordsFacade.ResetGridStatus");
           
            var IsResetGrid = false;

            if ($scope.TotalRecordsCount == 0) {
                $scope.GridInstance.ResetGrid($scope);
                IsResetGrid = true;
            }
            else if ($scope.TotalPageCount == 1 && IsResetGrid == false) {
                $scope.GridInstance.Hide('Previous');
                $scope.GridInstance.Hide('Next');
            }
            else if ($scope.TotalPageCount > 1 && IsResetGrid == false) {
                $scope.GridInstance.Show('Next');
            }

            OneViewConsole.Debug("ResetGridStatus end", "ViewRecordsFacade.ResetGridStatus");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ResetGridStatus", xlatService);
        }
    }

    this.RowClick = function (DcId, IndexId, IsCompleted, IsSynchronized) {
        try {
            OneViewConsole.Debug("RowClick start", "ViewRecordsFacade.RowClick");
         
                if (RowIndex != -1) {
                    _oViewRecordsBO.RemoveRowColor("Row_" + RowIndex);
                }

                RowIndex = IndexId;
                          
                SetDefaultAutoTemperatureListener(OneViewSessionStorage.Get("DcId"), DcId);

                _oViewRecordsBO.SetRowColor("Row_" + RowIndex);
                _oViewRecordsBO.SaveDcIdIntoSession(DcId);

                OneViewSessionStorage.Save("IsDcCompletedBeforeEdit", IsCompleted);
                OneViewSessionStorage.Save("IsDcSynchronizedBeforeEdit", IsSynchronized);

                var NCDcId = new DataCaptureBO().GetNCDcID(DcId);
                if (NCDcId != undefined) {
                    scope.divNCButton = true;
                }
                else {
                    scope.divNCButton = false;
                }

                scope.$apply();
          
			 OneViewConsole.Debug("RowClick end", "ViewRecordsFacade.RowClick");
		}
        catch (Excep) {           
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.RowClick", xlatService);
		}     
    }

    this.EditRecords = function ($location) {
        try {
            OneViewConsole.Debug("EditRecords start", "ViewRecordsFacade.EditRecords");

			if (RowIndex != -1) {
			    var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");				
				if (TemplateNodeId == '153') {            
					$location.url('/153');
				}
				else {
						OneViewSessionStorage.Remove("NCInlineEdit");
						//_oViewRecordsBO.Navigate('app.'+TemplateNodeId);
						// $location.path('/app-' + TemplateNodeId);
						$location.url('/' + TemplateNodeId);
						_oViewRecordsBO.Init();     
				}				
			}
			else {                      
				_oViewRecordsBO.ShowMsg(xlatService, toaster, "Select_Record");
			}

			OneViewConsole.Debug("EditRecords end", "ViewRecordsFacade.EditRecords");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.EditRecords", xlatService);
        }		                 
    }
  
    this.SetTemperature = function (TemperatureInfo) {
        try {
            OneViewConsole.Debug("SetTemperature start", "ViewRecordsFacade.SetTemperature");
           
           // alert('SetTemperature');
            if (TemperatureInfo != null && TemperatureInfo != undefined && TemperatureInfo != "" && TemperatureInfo.Temperature != "" && TemperatureInfo.Temperature != null && TemperatureInfo.Temperature != undefined) {

                if (RowIndex != -1) {

                    //var _oDataCaptureBO = new DataCaptureBO();
                    //_oDataCaptureBO.SetMandatoryMetaData();

                    //var SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
                    //var AryDcResultDetails = _oDataCaptureBO.GetLastUpdatedDcResultDetailsForViewRecordsInlineEdit(OneViewSessionStorage.Get("DcId"));

                    //var isCompleted = false;
                    //var TemplateId = OneViewSessionStorage.Get("TemplateId");
                    //TODO:Its just temp solution(need to handle via frame wok)
                    //if (TemplateId == 2 || TemplateId == 3) {
                    //    isCompleted = _oDataCaptureBO.CookingAndBlastChillingEKFC1Validation(AryDcResultDetails);
                    //}
                    //else {
                    //    var parm = { DataCaptureEntity: AryDcResultDetails, scope: scope, toaster: '', xlatService: oxlatService, ClientValidatorConfigList: SaveDCValidatorConfigList, Operation: 'Submit' }
                    //    var _oVallidationHandler = new VallidationHandler();
                    //    var oDefaultValidationResponse = _oVallidationHandler.Validate(parm);
                    //    isCompleted = oDefaultValidationResponse.IsSuccess;
                    //}

                    //if (isCompleted) {

                    MyInstance.AutoTemperature = parseFloat(TemperatureInfo.Temperature);

                    if (DefaultInlineEditConfig != null) {

                        if ((DefaultInlineEditConfig.AttributeNodeId == 8290 && MyInstance.AutoTemperature > 6) || (DefaultInlineEditConfig.AttributeNodeId == 8293 && MyInstance.AutoTemperature > 8)) {

                            var Title = OneViewGlobalization[CurrentLanguage].AutoTemperature_Confirm_Title
                            var Message = OneViewGlobalization[CurrentLanguage].AutoTemperature_Confirm_Message + " : " + MyInstance.AutoTemperature + "\u2103";

                            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                            oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, InlineEdit);
                        }
                        else {
                            InlineEdit(2);
                        }
                    }
                   // }
                }
                else {
                    _oViewRecordsBO.ShowMsg(xlatService, toaster, "Select_Record");
                    $scope.$apply();
                }
            }
            else {
                alert("Please press the probe button again");
            }

            OneViewConsole.Debug("SetTemperature end", "ViewRecordsFacade.SetTemperature");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.SetTemperature", xlatService);
        }
        finally {
            Title = null;
            Message = null;
            oOneViewCordovaPlugin = null;
        }
    }

    this.InlineNCFormEventHandler;

    var InlineEditOLD = function (ConfirmationId) {

        try {
            OneViewConsole.Debug("InlineEdit start", "ViewRecordsFacade.InlineEdit");

            if (DefaultInlineEditConfig != null) {
                var TemplateId = OneViewSessionStorage.Get("TemplateId");
                var TemplateName = OneViewSessionStorage.Get("TemplateName");
                var ServiceId = OneViewSessionStorage.Get("ServiceId");
                var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];
                var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': toaster, 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                _oDataCaptureBO.SetMandatoryMetaData();
               
                if (ConfirmationId == '2' && MyInstance.AutoTemperature != "" && MyInstance.AutoTemperature != 'NaN') {

                    document.getElementById(DefaultInlineEditConfig.FieldName + OneViewSessionStorage.Get('DcId')).innerHTML = MyInstance.AutoTemperature;

                    var AttributesList = [{ "AttributeNodeId": DefaultInlineEditConfig.AttributeNodeId, "ControlId": DefaultInlineEditConfig.ControlId, "AnswerValue": "", "Answer": MyInstance.AutoTemperature, "AnswerFKType": "" }];
                   
                        new DataCaptureBO().UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                        if (InlineEditFinishedEventHandler != null) {
                            InlineEditFinishedEventHandler();
                        }

                        if (TemplateId == "2" || TemplateId == "3") {
                            if (MyInstance.AutoTemperature > '5') {
                                OneViewSessionStorage.Save("NCInlineEdit", 'true');

                                var Title = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Title;
                                var Message = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Message;

                                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                                oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                                    if (ConfirmationId == '2') {
                                        // state.go('app.' + OneViewSessionStorage.Get("TemplateId"));
                                        // Mylocation.path('/cookingblastchilling');
                                        // Mylocation.path('/app-' + OneViewSessionStorage.Get("TemplateId"));
                                        Mylocation.url('/' + OneViewSessionStorage.Get("TemplateId"));
                                        scope.$apply();
                                    }
                                    else {
                                        var NextRow = document.getElementById(RowIndex + 1);

                                        if (NextRow != null) {

                                            _oViewRecordsBO.RemoveRowColor(RowIndex);
                                            _oViewRecordsBO.SetRowColor(RowIndex + 1);

                                            var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                            _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                            RowIndex = RowIndex + 1;
                                        }
                                    }
                                });
                            }
                            else {
                                var NCDcId = new DataCaptureBO().GetNCDcID(DCId);
                                if (NCDcId != undefined) {
                                    new DataCaptureBO().DeleteNCReleatedData(NCDcId);
                                }
                                scope.divNCButton = false;
                                scope.$apply();
                                OneViewSessionStorage.Save("NCInlineEdit", 'false');

                                var NextRow = document.getElementById(RowIndex + 1);

                                if (NextRow != null) {

                                    _oViewRecordsBO.RemoveRowColor(RowIndex);
                                    _oViewRecordsBO.SetRowColor(RowIndex + 1);

                                    var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                    _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                    RowIndex = RowIndex + 1;
                                }

                            }
                        }
                        else {
                            var NextRow = document.getElementById(RowIndex + 1);

                            if (NextRow != null) {

                                _oViewRecordsBO.RemoveRowColor(RowIndex);
                                _oViewRecordsBO.SetRowColor(RowIndex + 1);

                                var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                RowIndex = RowIndex + 1;
                            }
                        }

                        _oViewRecordsBO.GetDataSource($scope);
                }
            }

            OneViewConsole.Debug("InlineEdit end", "ViewRecordsFacade.InlineEdit");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.InlineEdit", xlatService);
        }
        finally {
            Title = null;
            Message = null;
            _oOneViewSqlitePlugin = null;
        }
    }

    var InlineEdit = function (ConfirmationId) {

        try {
            OneViewConsole.Debug("InlineEdit start", "ViewRecordsFacade.InlineEdit");

           // alert('InlineEdit');
            if (DefaultInlineEditConfig != null) {
                var TemplateId = OneViewSessionStorage.Get("TemplateId");
                var TemplateName = OneViewSessionStorage.Get("TemplateName");
                var ServiceId = OneViewSessionStorage.Get("ServiceId");
                var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];
                var oScope = $scope;

              
               // alert('TemplateNodes.Childs' + TemplateNodes.Childs);
                //if (TemplateId == '2' || TemplateId == '3' || TemplateId == '44' || TemplateId == '99' || TemplateId == '128' || TemplateId == '140' || TemplateId == '282' || TemplateId == '325' || TemplateId == '342') {
                if (TemplateNodes.Childs != undefined) {
                    var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
                    TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);
                }
                //}



               // alert(ServiceId +","+ TemplateId);
              //  alert('TemplateNodes :' + JSON.stringify(TemplateNodes));
                //Call NC-Action component to load metadata for particular template
              ///  AppendValuesToScope(TemplateNodes, oScope);
                var _oCPActionNCComponent = new CPActionNCComponent(oScope, TemplateNodes, '', xlatService);
                _oCPActionNCComponent.Init();

                var _oDataCaptureBO = new DataCaptureBO({ 'scope': oScope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': toaster, 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                _oDataCaptureBO.SetMandatoryMetaData();

               
                if (ConfirmationId == '2' && MyInstance.AutoTemperature != "" && MyInstance.AutoTemperature != 'NaN') {

                    document.getElementById(DefaultInlineEditConfig.FieldName + OneViewSessionStorage.Get('DcId')).innerHTML = MyInstance.AutoTemperature;

                    var AttributesList = [{ "AttributeNodeId": DefaultInlineEditConfig.AttributeNodeId, "ControlId": DefaultInlineEditConfig.ControlId, "AnswerValue": "", "Answer": MyInstance.AutoTemperature, "AnswerFKType": "" }];

                    var _oVRDataCaptureBO = new DataCaptureBO();
                    //_oVRDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                    //AppendValuesToScope(TemplateNodes, oScope, AttributesList[0].AttributeNodeId, AttributesList[0].Answer);

                    if (InlineEditFinishedEventHandler != null) {                        
                        var InlineAttributesList = InlineEditFinishedEventHandler(_oDataCaptureBO, DefaultInlineEditConfig);
                        if (InlineAttributesList != undefined && InlineAttributesList != null) {
                           
                            //alert(JSON.stringify(InlineAttributesList));
                            AppendValuesToScope(TemplateNodes, oScope, AttributesList[0].AttributeNodeId, AttributesList[0].Answer, InlineAttributesList[0].AttributeNodeId, InlineAttributesList[0].Answer);
                          //  alert('AppendValuesToScope finihs: ');
                            //_oDataCaptureBO.EvaluateActionNCStatus(InlineAttributesList[0].AttributeNodeId, '', true);
                            //if (DefaultInlineEditConfig.AttributeNodeId == 8290) //PRD to OPs temp
                            //    _oDataCaptureBO.EvaluateActionNCStatus(AttributesList[0].AttributeNodeId, '', true);
                          
                           // alert('EvaluateActionNCStatus finihs: ');
                        }
                    }
                    else {                       
                        AppendValuesToScope(TemplateNodes, oScope, AttributesList[0].AttributeNodeId, AttributesList[0].Answer);
                     
                    }
                   
                    _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);
                    if (AttributesList != undefined && (DefaultInlineEditConfig.AttributeNodeId == 8293 || DefaultInlineEditConfig.AttributeNodeId == 8290))//dispatch temp
                    {
                        for (var n = 0; n < AttributesList.length; n++) {
                            // alert('AttributesList[n].AttributeNodeId' + AttributesList[n].AttributeNodeId)


                            //override the DisplayNCMessage,to solve Multi NCR form issue.
                            //TODO(11-Nov-2015): Once more than one NCR form feature enabled,need to remove this code,temporarily we added this
                             _oDataCaptureBO.DisplayNCMessage = function (CriteriaDisplayLabelKey) {
                                 try {
                                     debugger;
                                     if (CriteriaDisplayLabelKey != "") {
                                         if (AttributesList[0].AttributeNodeId == 8293 && AttributesList[0].Answer > 8) //dispatch temp
                                             alert('NC-CP-TVD-018 :: Dispatch Temp should be below or equal to 8\u2103');
                                          
                                         if (AttributesList[0].AttributeNodeId == 8290 && AttributesList[0].Answer > 6) // Delivery temp
                                             alert('NC-CP-TVD-018 :: Delivery Temp should be below or equal to 6\u2103');
                                     }
                                 }
                                 catch (Excep) {
                                     throw oOneViewExceptionHandler.Create("BO Override by DispatchingViewRecordsController", "DataCaptureBO.DisplayNCMessage", Excep);
                                 }
                                 finally {
                                 }
                             }

                            var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributesList[n].AttributeNodeId, '', true);


                            if (ActionResponseList != undefined) {
                                if (ActionResponseList.length > 1) {
                                    alert('More than one action for a single attribute : Not implemeneted');
                                }
                                else {
                                    if (ActionResponseList.length > 0) {
                                        for (var i = 0; i < ActionResponseList.length; i++) {
                                            if (ActionResponseList[i].FormActionList != undefined) {
                                               // alert('ActionResponseList[i].FormActionList' + JSON.stringify(ActionResponseList[i].FormActionList))
                                                for (var j = 0; j < ActionResponseList[i].FormActionList.length ; j++) {

                                                    /**/
                                                    if (AttributesList[n].AttributeNodeId == 8293 && AttributesList[n].Answer > 8) //dispatch temp
                                                    {                                                     
                                                        ActionResponseList[i].RuleDescription = "Dispatch Temp should be below or equal to 8&deg;C for the selected Product";
                                                    }

                                                    if (AttributesList[n].AttributeNodeId == 8290 && AttributesList[n].Answer > 6) // Delivery temp
                                                    {                                         
                                                        ActionResponseList[i].RuleDescription = "Delivery Temp should be below or equal to 6&deg;C for the selected Product";
                                                    }
                                                       

                                                   // alert('ActionResponseList[i].FormActionList[j]' + ActionResponseList[i].FormActionList[j])
                                                    //if ((ActionResponseList[i].FormActionList[j] == 2 || ActionResponseList[i].FormActionList[j] == '2') || (ActionResponseList[i].FormActionList[j] == 3 || ActionResponseList[i].FormActionList[j] == '3')) {
                                                        if ((ActionResponseList[i].IsFormAction == true || ActionResponseList[i].IsFormAction == 'true') && (ActionResponseList[i].IsRuleViolated == true || ActionResponseList[i].IsRuleViolated == 'true')) {
                                                            OneViewSessionStorage.Save("NCInlineEdit", 'true');
                                                            var tempHandler = {
                                                                'NCRuleId': ActionResponseList[i].RuleId,
                                                                'IsNC': ActionResponseList[i].IsRuleViolated,
                                                                "IsObservation": false,
                                                                "Comments": "",
                                                                "IsManualRule": false,
                                                                "RuleName": ActionResponseList[i].RuleName,
                                                                "RuleDescription": ActionResponseList[i].RuleDescription,
                                                                "AttributeGroupId": AttributesList[n].AttributeNodeId,
                                                                "RuleGroup": ActionResponseList[i].RuleGroup,
                                                                "RuleCode": ActionResponseList[i].RuleCode,
                                                                'Deviatedby': ActionResponseList[i].Deviatedby,
                                                                'ExpectedValue': ActionResponseList[i].ExpectedValue,
                                                                'ActualValue': ActionResponseList[i].ActualValue,
                                                                'TemplateNodeIds': AttributesList[n].AttributeNodeId
                                                            };

                                                           // alert(JSON.stringify(tempHandler));
                                                            ViewRecordsNCRuleHandler.push(tempHandler);

                                                            var Title = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Title;
                                                            var Message = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Message;
                                                            //var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                                                            //oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                                                               
                                                                //if (ConfirmationId == '2') {
                                                                   // alert('here');
                                                                   // alert(OneViewSessionStorage.Get("TemplateId"));
                                                                    // state.go('app.' + OneViewSessionStorage.Get("TemplateId"));
                                                                    // Mylocation.path('/cookingblastchilling');
                                                                    // Mylocation.path('/app-' + OneViewSessionStorage.Get("TemplateId"));

                                                                  //  ViewRecordsNCRuleId = ActionResponseList[i].RuleId;
                                                                    
                                                                    
                                                                  
                                                                
                                                                    

                                                               

                                                            //Mylocation.url('/' + OneViewSessionStorage.Get("TemplateId"));

                                                            //addd new condition to load this page
                                                            //TODO(11-Nov-2015): Once more than one NCR form feature enabled,need to remove this code,temporarily we added this
                                                            if ( (AttributesList[0].AttributeNodeId == 8293 && AttributesList[0].Answer > 8) || (AttributesList[0].AttributeNodeId == 8290 && AttributesList[0].Answer > 6) ) {
                                                                LoadEditPage(Compile, SnapRemote, true);
                                                                scope.$apply();
                                                            }
                                                                   // alert('33');
                                                               // }
                                                               // else {
                                                                    //var NextRow = document.getElementById(RowIndex + 1);

                                                                    //if (NextRow != null) {

                                                                    //    _oViewRecordsBO.RemoveRowColor(RowIndex);
                                                                    //    _oViewRecordsBO.SetRowColor(RowIndex + 1);

                                                                    //    var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                                                    //    _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                                                    //    RowIndex = RowIndex + 1;
                                                                    //}
                                                                //}
                                                            //});
                                                        }
                                                        else {
                                                            if (document.getElementById('divHide') != null) {
                                                                document.getElementById('divHide').innerHTML = "";
                                                            }

                                                            //alert('ActionResponseList :' + JSON.stringify(ActionResponseList));
                                                            var DataCaptureId = OneViewSessionStorage.Get('DcId');
                                                            var NCDcId = new DataCaptureBO().GetNCDcID(DataCaptureId);                                                           
                                                            if (NCDcId != undefined) {
                                                                _oDataCaptureBO.DeleteNCDataByActionClientGuid(NCDcId, undefined, ActionResponseList[i].RuleId, undefined, ActionResponseList[i].RuleGroup);
                                                                _oDataCaptureBO.UpdateDataCaptureNCStatusForInlineEdit(DataCaptureId);
                                                            }
                                                            scope.divNCButton = false;
                                                            scope.$apply();
                                                            OneViewSessionStorage.Save("NCInlineEdit", 'false');

                                                            var NextRow = document.getElementById("Row_" + (RowIndex + 1));

                                                            if (NextRow != null) {

                                                                _oViewRecordsBO.RemoveRowColor("Row_" + RowIndex);
                                                                _oViewRecordsBO.SetRowColor("Row_" + (RowIndex + 1));

                                                               
                                                                var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                                                IsColumnClick = false;
                                                                SetDefaultAutoTemperatureListener(OneViewSessionStorage.Get("DcId"), DataCaptureId);
                                                                _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                                                RowIndex = RowIndex + 1;
                                                            }

                                                        }
                                                    //}
                                                }
                                            }

                                        }
                                    }
                                    else {
                                        if (document.getElementById('divHide') != null) {
                                            document.getElementById('divHide').innerHTML = "";
                                        }

                                        var NextRow = document.getElementById("Row_" + (RowIndex + 1));

                                        if (NextRow != null) {

                                            _oViewRecordsBO.RemoveRowColor("Row_" + RowIndex);
                                            _oViewRecordsBO.SetRowColor("Row_" + (RowIndex + 1));

                                            var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                            IsColumnClick = false;
                                            SetDefaultAutoTemperatureListener(OneViewSessionStorage.Get("DcId"), DataCaptureId);
                                            _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                            RowIndex = RowIndex + 1;
                                        }
                                    }

                                }
                            }
                            else {
                                if (document.getElementById('divHide') != null) {
                                    document.getElementById('divHide').innerHTML = "";
                                }
                            }
                        }
                    }
                    else {
                        if (document.getElementById('divHide') != null) {
                            document.getElementById('divHide').innerHTML = "";
                        }
                     
                        var NextRow = document.getElementById("Row_" + (RowIndex + 1));
                      
                        if (NextRow != null) {

                            _oViewRecordsBO.RemoveRowColor("Row_" + RowIndex);
                            _oViewRecordsBO.SetRowColor("Row_" + (RowIndex + 1));

                            var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                            IsColumnClick = false;
                            SetDefaultAutoTemperatureListener(OneViewSessionStorage.Get("DcId"), DataCaptureId);
                            _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                            RowIndex = RowIndex + 1;
                        }
                    }
                    _oViewRecordsBO.GetDataSource($scope);                   
                }
            }
          
            //document.getElementById('divHide').innerHTML = "";         
            scope.$apply();
            OneViewConsole.Debug("InlineEdit end", "ViewRecordsFacade.InlineEdit");
        }
        catch (Excep) {
         //   alert('ViewRecordsFacade.InlineEdit Excep ' + Excep);
         //   alert('ViewRecordsFacade.InlineEdit Excep ' + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.InlineEdit", xlatService);
        }
        finally {
            Title = null;
            Message = null;
            _oOneViewSqlitePlugin = null;
        }
    }

    var AppendValuesToScope = function (oTemplateNodes, oScope, AttributeNodeId, NewAnswer, AttributeNodeId2, NewAnswer2) {
        try {
            OneViewConsole.Debug("AppendValuesToScope start", "ViewRecordsFacade.AppendValuesToScope");
            
            oScope.NewDCModel = [];
            var DCId = OneViewSessionStorage.Get('DcId');
            //alert('DCId' + DCId);
            var DCDetailFromDB = GetDCByDCId(DCId);
            for (NodeId in oTemplateNodes) {
                if (typeof (oTemplateNodes[NodeId]) != 'function') {

                    var TemplateNodeObject = oTemplateNodes[NodeId];
                    for (itrAnswerMode in TemplateNodeObject.AnswerMode) {

                        if (typeof (TemplateNodeObject.AnswerMode[itrAnswerMode]) != 'function') {
                           // var PreEditControlValues = {};
                            var AnswerModeObject = TemplateNodeObject.AnswerMode[itrAnswerMode];
                            var ControlId = AnswerModeObject.ControlId;
                            var AttributeAnswers = DCDetailFromDB.AttributeAnswers[NodeId];
                            if (AttributeAnswers != undefined) {
                                if (AttributeAnswers[ControlId] != undefined) {
                                    var AnswerList = AttributeAnswers[ControlId];
                                    //TODO:This logic may change,need remove coupling between this logic (for ex:Clinet need his own data to view),now couple with LastUpdated Answer

                                   // alert('AnswerList : ' + JSON.stringify(AnswerList))
                                    var AnswerToBind = GetLastUpdatedAnswer(AnswerList);

                                   
                                    if (AttributeNodeId == NodeId) {
                                        AnswerToBind.Answer = NewAnswer;
                                    }
                                    if (AttributeNodeId2 == NodeId) {
                                        AnswerToBind.Answer = NewAnswer2;
                                    }

                                    //alert('AttributeNodeId : ' + AttributeNodeId + "," + NodeId + JSON.stringify(AnswerToBind));
                                    //alert('oScope[ControlId] before' + oScope.NewDCModel[ControlId]);
                                   // alert('AnswerToBind :' + JSON.stringify(AnswerToBind));
                                   // alert('AnswerModeObject :' + JSON.stringify(AnswerModeObject));

                                    SetEditValuesInControls(oScope, AnswerModeObject, AnswerToBind, NodeId)
                                    //alert('oScope[ControlId] after' + oScope.NewDCModel[ControlId]);
                                    //MyInstance.SetEditValuesInControls(scope, AnswerModeObject, AnswerToBind);
                                    //PreEditControlValues[ControlId] = { Answer: AnswerToBind.Answer }
                                }
                                //else {
                                //    oScope[ControlId] = { Answer: '' };
                                //   // PreEditControlValues[ControlId] = { Answer: '' }
                                //}
                            }
                            //MyInstance.PreEditValues[NodeId] = PreEditControlValues;
                        }
                    }
                }
            }
            OneViewConsole.Debug("AppendValuesToScope end", "ViewRecordsFacade.AppendValuesToScope");
        }
        catch (Excep) {
            //alert('AppendValuesToScope' + Excep + JSON.stringify(Excep))
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.AppendValuesToScope", xlatService);
        }
    }

    var SetEditValuesInControls = function (oScope, AnswerModeObject, AnswerToBind, AttributeNodeId) {
        try {
            OneViewConsole.Debug("SetEditValuesInControls start", "ViewRecordsFacade.SetEditValuesInControls");
            OneViewConsole.DataLog("AnswerModeObject : " + JSON.stringify(AnswerModeObject), "ViewRecordsFacade.SetEditValuesInControls");
            OneViewConsole.DataLog("AnswerToBind : " + JSON.stringify(AnswerToBind), "ViewRecordsFacade.SetEditValuesInControls");


            if (AnswerModeObject.Type == 'DDL') {
                //alert('AnswerModeObject : ' + JSON.stringify(AnswerModeObject) + AttributeNodeId);
                var oddl = new AutoCompleteUserControl({ 'Scope': oScope, 'ControlId': AnswerModeObject.ControlId, 'DataSourceModelName': AnswerModeObject.ControlId, 'DisplayElementModelName': 'NewDCModel.' + AnswerModeObject.ControlId, 'DATEntityTypeId': 0, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': AttributeNodeId });
                oddl.Set({ Id: AnswerToBind.Answer, Name: AnswerToBind.AnswerValue, "IsDynamicElement": false });
            }
            //else if (AnswerModeObject.DataType == "BOOLEAN") {
            //    if (AnswerToBind.Answer == "1") {
            //        oScope.NewDCModel[AnswerModeObject.ControlId] = true;
            //    }
            //    else {
            //        oScope.NewDCModel[AnswerModeObject.ControlId] = false;
            //    }
            //}
            //else if (AnswerModeObject.Type == 'Band') {
            //    if (AnswerToBind.Answer != "") {
            //        var Colour = AnswerModeObject.BandInfo[AnswerToBind.Answer];
            //        oScope[AnswerModeObject.ControlId].Set({ Id: AnswerToBind.Answer, Name: AnswerToBind.AnswerValue, ColourIndex: Colour.ColourIndex, selected: true });
            //    }
            //}
            if (AnswerModeObject.Type == 'AUTOTEMPERATURE' && AnswerModeObject.DataType == "FLOAT") {
                if (AnswerToBind.Answer == "") {
                    oScope.NewDCModel[AnswerModeObject.ControlId] = AnswerToBind.Answer;
                }
                else {
                    oScope.NewDCModel[AnswerModeObject.ControlId] = parseFloat(AnswerToBind.Answer);
                }

            }
            //else if (AnswerModeObject.Type == "DATE" && AnswerToBind.Answer != '') {
            //    var date = AnswerToBind.Answer.split('-');
            //    oScope.NewDCModel[AnswerModeObject.ControlId] = new Date(date[2], date[1], date[0]);
            //}
            else if (AnswerModeObject.Type == "TIME") {
                var DateTimeValue = AnswerToBind.Answer.split(' ');
                //oScope.NewDCModel[AnswerModeObject.ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
                if (AnswerToBind.Answer != "") {
                    var x = document.createElement("INPUT");
                    x.setAttribute("id", AnswerModeObject.ControlId);
                    x.setAttribute("type", "time");
                    x.setAttribute("value", DateTimeValue[1]);

                    oScope[AnswerModeObject.ControlId + "_DateTime"] = AnswerToBind.Answer;
                    x.value = AnswerToBind.Answer.split(" ")[1]; //take time 
                    oScope.NewDCModel[AnswerModeObject.ControlId] = x.value;
                    //document.body.appendChild(x);

                    document.getElementById('divHide').appendChild(x);
                }
            }
            else if (AnswerModeObject.Type == "DATETIMELOCAL") {
                // var DateTime = AnswerToBind.Answer.split(' ');
                //oScope.NewDCModel[AnswerModeObject.ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
                //if (AnswerToBind.Answer != "") {
                var temp = "";

                //oScope.NewDCModel[AnswerModeObject.ControlId] = temp;
                if (AnswerToBind.Answer != undefined && AnswerToBind.Answer != "") {
                    temp = new DateTime().GetDateByString(AnswerToBind.Answer);
                }
                oScope.NewDCModel[AnswerModeObject.ControlId] = temp;


                // }
            }
            else {
                if (AnswerModeObject.Type == 'AUTOTEMPERATURE' && AnswerModeObject.DataType == "INTEGER" ) {

                    if (AnswerToBind.Answer != "")
                        oScope.NewDCModel[AnswerModeObject.ControlId] = parseInt(AnswerToBind.Answer);

                    else
                        oScope.NewDCModel[AnswerModeObject.ControlId] = AnswerToBind.Answer;

                }

                //else {
                //    //alert('ssss' + "," + AnswerToBind.Answer + "," + AnswerModeObject.ControlId);
                //    oScope.NewDCModel[AnswerModeObject.ControlId] = AnswerToBind.Answer;
                //}
            }

           
            OneViewConsole.Debug("SetEditValuesInControls end", "ViewRecordsFacade.SetEditValuesInControls");

        }
        catch (Excep) {
            alert('SetEditValuesInControls' + Excep + JSON.stringify(Excep))
            throw oOneViewExceptionHandler.Create("BO", "ViewRecordsFacade.SetEditValuesInControls", Excep);
        }
        finally {
            Colour = null;
        }
    }

    var GetDCByDCId = function (DCId) {
        try {
            OneViewConsole.Debug("GetDCByDCId start", "ViewRecordsFacade.GetDCByDCId");
            OneViewConsole.DataLog("DCId : " + DCId, "ViewRecordsFacade.GetDCByDCId");

            var oDataCaptureDAO = new DcDAO();
            var result = oDataCaptureDAO.GetDCResultDetailsByDCId_DAO(DCId);

            if (result.length != 0) {
                var DataCaptureId = result[0].DataCaptureId;
                var DCAnswerInfo = { 'DataCaptureId': DataCaptureId, 'AttributeAnswers': {} };
                var i = 0;
                var totalLength = result.length;
                var AttributeNodeId = result[i].AttributeNodeId;
                var FormatedAttributeAnswerDetails = [];

                //Iterate the wrt Node
                while (true) {
                    if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId) {

                        var FormatedControlAnswerDetails = [];
                        //{2(ControlId): [ { 'SystemUserId': 1, 'Answer': '1', 'AnswerValue': 'Chicken', 'LastUpdatedDate': '10/5/2012' },{ 'SystemUserId': 2, 'Answer': '2', 'AnswerValue': 'Chicken65', 'LastUpdatedDate': '11/5/2012' } ] }
                        var ControlId = result[i].ControlId;
                        while (true) {
                            if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId && ControlId == result[i].ControlId) {
                                var anwerArray = result[i];
                                var AnwerDetails = { 'SystemUserId': anwerArray.SystemUserId, 'Answer': anwerArray.Answer, 'AnswerValue': anwerArray.AnswerValue, 'LastUpdatedDate': anwerArray.LastUpdatedDate, 'AttributeNodeId': AttributeNodeId, 'ControlId': ControlId }
                                FormatedControlAnswerDetails.push(AnwerDetails);
                                i = i + 1;
                            }
                            else {
                                FormatedAttributeAnswerDetails[ControlId] = FormatedControlAnswerDetails;
                                break;
                            }
                        }
                    }
                    else {
                        DCAnswerInfo.AttributeAnswers[AttributeNodeId] = FormatedAttributeAnswerDetails;
                        FormatedAttributeAnswerDetails = [];
                        if (i < totalLength)
                            AttributeNodeId = result[i].AttributeNodeId;
                        else {
                            break;
                        }
                    }
                }
            }
            OneViewConsole.Debug("GetDCByDCId end", "ViewRecordsFacade.GetDCByDCId");
            return DCAnswerInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ViewRecordsFacade.GetDCByDCId", Excep);
        }
        finally {
            result = null;
            DataCaptureId = null;
            DCAnswerInfo = null;
            i = null;
            totalLength = null;
            AttributeNodeId = null;
            FormatedAttributeAnswerDetails = null;
            FormatedControlAnswerDetails = null;
            ControlId = null;
            anwerArray = null;
            AnwerDetails = null;
        }
    }

    var GetLastUpdatedAnswer = function (AnswerLst) {
        try {
            OneViewConsole.Debug("GetLastUpdatedAnswer start", "ViewRecordsFacade.GetLastUpdatedAnswer");
            OneViewConsole.DataLog("AnswerList : " + JSON.stringify(AnswerLst), "ViewRecordsFacade.GetLastUpdatedAnswer");

            var AnswerObj = AnswerLst[0];
            var _DateTime = new DateTime();
            var LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[0].LastUpdatedDate);

            if (AnswerLst.length > 1) {
                for (var i = 0; i < AnswerLst.length; i++) {
                    if (LastUpdatedDate < _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate)) {
                        LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate);
                        AnswerObj = AnswerLst[i];
                    }
                }
            }
            OneViewConsole.Debug("GetLastUpdatedAnswer end", "ViewRecordsFacade.GetLastUpdatedAnswer");
            return AnswerObj;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ViewRecordsFacade.GetLastUpdatedShift", Excep);
        }
        finally {
            AnswerObj = null;
            LastUpdatedDate = null;
        }
    }

    var EvaluateActionNCStatus = function (AttributeId) {
        try {
            OneViewConsole.Debug("EvaluateActionNCStatus Start", "ViewRecordsFacade.EvaluateActionNCStatus");
            var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
            return ActionResponseList;
            OneViewConsole.Debug("EvaluateActionNCStatus End", "ViewRecordsFacade.EvaluateActionNCStatus");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.InlineEdit", xlatService);
        }
        finally {
        }
    }

    this.ResponsiveFieldChanged = function (ResponsiveColumn) {
        try {
            OneViewConsole.Debug("ResponsiveFieldChanged start", "ViewRecordsFacade.ResponsiveFieldChanged");

            $scope.GridInstance.ResponsiveFieldChanged($scope, ResponsiveColumn);

            OneViewConsole.Debug("ResponsiveFieldChanged end", "ViewRecordsFacade.ResponsiveFieldChanged");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ResponsiveFieldChanged", xlatService);
		}     
    }

    this.ApplyFilter = function (snapRemote) {
        try {
            OneViewConsole.Debug("ApplyFilter start", "ViewRecordsFacade.ApplyFilter");

            DcInfoViewRecords = null;

            PageNumber = 1;
            $scope.CurrentPage = PageNumber;

            _oViewRecordsBO.GetDataSourceWithFilters($scope, FilterRuleConfig);
            _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);

            ResetGridStatus($scope);

            var _oOneViewSidePanel = new OneViewSidePanel();
            _oOneViewSidePanel.Toggle(snapRemote);

			OneViewConsole.Debug("ApplyFilter end", "ViewRecordsFacade.ApplyFilter");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ApplyFilter", xlatService);
		}      
    }

    this.GoBack = function () {
        try {
            OneViewConsole.Debug("GoBack start", "ViewRecordsFacade.GoBack");

			var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
			_oViewRecordsBO.RemoveDcIdFromSession();
			
			if (OneViewSessionStorage.Get("MyAuditEditForm") == 'true') {
				 
			    //_oViewRecordsBO.Navigate('app.my-audit');
			    Mylocation.url('/nav/my-audit');
			}
			else if (OneViewSessionStorage.Get("LandingPageEditForm") == 'true') {

			    //_oViewRecordsBO.Navigate('app.my-audit');
			    //Mylocation.url('/nav/landingPage');

			    var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

			    if (LandingPageViewInfo != null) {

			        LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
			        Mylocation.url(LandingPageViewInfo.BackRouteKey);
			    }
			}
			else
			{
			    //_oViewRecordsBO.Navigate('app.'+TemplateNodeId);
			    Mylocation.url('/' + TemplateNodeId);
			}
			
			_oViewRecordsBO.Init();

			OneViewConsole.Debug("GoBack end", "ViewRecordsFacade.GoBack");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.GoBack", xlatService);
		}                  
    }

    this.Previous = function () {
        try {
            OneViewConsole.Debug("Previous start", "ViewRecordsFacade.Previous");

            if (PageNumber > 1) {
                PageNumber = PageNumber - 1;
                $scope.CurrentPage = PageNumber;

                _oViewRecordsBO.GetDataSource($scope);
                _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);
                //document.getElementById('Next').disabled = "";
                $scope.GridInstance.Show('Next');

                if (PageNumber == 1) {
                    //document.getElementById('Previous').disabled = "disabled";
                    $scope.GridInstance.Hide('Previous');
                }
            }

            OneViewConsole.Debug("Previous end", "ViewRecordsFacade.Previous");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.Previous", xlatService);
        }
    }

    this.Next = function () {
        try {
            OneViewConsole.Debug("Next start", "ViewRecordsFacade.Next");

            if (PageCount != PageNumber) {          
                PageNumber += 1;
                $scope.CurrentPage = PageNumber;

                _oViewRecordsBO.GetDataSource($scope);
                _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);
                //document.getElementById('Previous').disabled = "";
                $scope.GridInstance.Show('Previous');

                if (PageCount == PageNumber) {
                    //document.getElementById('Next').disabled = "disabled";
                    $scope.GridInstance.Hide('Next');
                }
            }

            OneViewConsole.Debug("Next end", "ViewRecordsFacade.Next");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.Next", xlatService);
        }
    }

    ///Gets the probe connected or diconnected Status
    this.GetProbeStatus = function () {
        try {
            OneViewConsole.Debug("GetProbeStatus Start", "CookingAndBlastChillingMonitoringFacade.GetProbeStatus");

            _oSettingsBO.ProbeStatus(toaster, xlatService);
           
            OneViewConsole.Debug("GetProbeStatus End", "CookingAndBlastChillingMonitoringFacade.GetProbeStatus");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.GetProbeStatus", xlatService);
        }
    }

    this.ProbeTesting = function () {
        try {
            var TempFromProbe = $scope.NewDCModel.txtTestTempControlId;
            //alert('TempFromProbe :' + TempFromProbe);
            var TemperatureInfo = { 'Temperature': TempFromProbe };

            //DefaultInlineEditConfig.ControlId
            //alert('DefaultInlineEditConfig.ControlId :' + DefaultInlineEditConfig.ControlId);
           // var ControlId = DefaultInlineEditConfig.ControlId;
          //  $scope.NewDCModel[ControlId] = TempFromProbe;

           // alert(' $scope.NewDCModel[ControlId]  :' + $scope.NewDCModel[ControlId]);

            MyInstance.SetTemperature(TemperatureInfo);

        }
        catch (Excep) {
            // alert(JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ProbeTesting", xlatService);
        }
    }

    this.FilterDataChanged = function (Header) {

        try {
            OneViewConsole.Debug("FilterDataChanged Start", "ViewRecordsFacade.FilterDataChanged");

            if (Header.CriteriaType == "OneViewDCResultDetailsPrimaryCriteria" || Header.CriteriaType == "OneViewGraphSearchCriteria") {
                for (var itr in $scope.FilterData) {
                    if ($scope.FilterData[itr].DisplayName != Header.DisplayName &&
                        ($scope.FilterData[itr].CriteriaType == "OneViewDCResultDetailsPrimaryCriteria" || $scope.FilterData[itr].CriteriaType == "OneViewGraphSearchCriteria") &&
                        ($scope.FilterData[itr].selected == true || $scope.FilterData[itr].selected == "selected")) {
                        $scope.FilterData[itr].selected = "";
                    }
                }
            }

            OneViewConsole.Debug("FilterDataChanged End", "ViewRecordsFacade.FilterDataChanged");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PreAcceptanceCompositionAnalysisFacade2.FilterDataChanged", xlatService);
        }
    }

    this.StartDispatchingDC = function ($compile, snapRemote) {
        try {
            DcInfoViewRecords = null;
            OneViewSessionStorage.Remove("DcId");
            OneViewSessionStorage.Remove("NCInlineEdit");
            LoadNewDispatchingPage($compile, snapRemote);
        }
        catch (Excep) {
            // alert(JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "DispatchingViewRecordsFacade.StartDispatchingDC", xlatService);
        }
    }

    this.SaveDefaultValue = function (DCId,$compile, $timeout) {
        try {
           
            //alert('DCId : ' + JSON.stringify(DCId));
            if (DCId != undefined) {

                var TemplateId = OneViewSessionStorage.Get("TemplateId");
                var TemplateName = OneViewSessionStorage.Get("TemplateName");

                var oLVMetaDataComponent = new LVMetaDataComponent();
                oLVMetaDataComponent.Load();

                var _oDefaultValueComponent = new DefaultValueComponent();
                var oLVFactory = new LVFactory();
                var oDefaultValueComponent = oLVFactory.GetDefaultValueComponent("LVDefaultDefaultValueComponent");
                var oTemplateNodes = TemplateMetaData[OneViewSessionStorage.Get("ServiceId")]['8272'];
                if (oTemplateNodes.Childs != undefined) {
                    var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
                    oTemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(oTemplateNodes);
                }
                var DefaultValueDict = oDefaultValueComponent.GetDefaultValueExtended(oTemplateNodes, 8272);

                //alert('DefaultValueDict : ' + JSON.stringify(DefaultValueDict));

                var PreEditValues = MyInstance.GetValuesFromDB(oTemplateNodes, DCId);

               // alert('PreEditValues FromDB : ' + JSON.stringify(PreEditValues));
                var ValuesToUpdate=  MyInstance.GetDefaultValuesToUpdate(PreEditValues, DefaultValueDict);

                //alert('DefaultValuesToUpdate : ' + JSON.stringify(ValuesToUpdate.DefaultValuesToUpdate));

                //var DCResultDetailEntityLst = MyInstance.GetDcResultDetailsEntity(oTemplateNodes, undefined, undefined, undefined, ValuesToUpdate.DefaultValuesToUpdate);
               // alert(DCResultDetailEntityLst.length + 'DCResultDetailEntityLst : ' + JSON.stringify(DCResultDetailEntityLst));
                OneViewSessionStorage.Save("DcId", DCId);
                var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': oTemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
                _oDataCaptureBO.PreEditValues = ValuesToUpdate.PreEditValues;
                _oDataCaptureBO.SetMandatoryMetaData();

                _oDataCaptureBO.UpdateDCRecords(DCId, ValuesToUpdate.AttributesList, ValuesToUpdate.DefaultValuesToUpdate);

                this.PageLoad();
                alert('Default values saved')
            }

            else {
                alert("Please select a record")
            }
        }
        catch (Excep) {
            // alert(JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "DispatchingViewRecordsFacade.SaveDefaultValue", xlatService);
        }
    }


    this.GetValuesFromDB = function (oTemplateNodes, DCId) {
        try {
            var DCDetailFromDB = this.GetCompletedDCByDCId(DCId);

            var PreEditValues = {};

            for (NodeId in oTemplateNodes) {
                if (typeof (oTemplateNodes[NodeId]) != 'function') {

                    var TemplateNodeObject = oTemplateNodes[NodeId];
                    for (itrAnswerMode in TemplateNodeObject.AnswerMode) {

                        if (typeof (TemplateNodeObject.AnswerMode[itrAnswerMode]) != 'function') {
                            var PreEditControlValues = {};
                            var AnswerModeObject = TemplateNodeObject.AnswerMode[itrAnswerMode];
                            var ControlId = AnswerModeObject.ControlId;
                            var AttributeAnswers = DCDetailFromDB.AttributeAnswers[NodeId];
                            if (AttributeAnswers != undefined) {
                                if (AttributeAnswers[ControlId] != undefined) {
                                    var AnswerList = AttributeAnswers[ControlId];
                                    //TODO:This logic may change,need remove coupling between this logic (for ex:Clinet need his own data to view),now couple with LastUpdated Answer

                                    var AnswerToBind = GetLastUpdatedAnswer(AnswerList);
                                    //alert('AnswerToBind :' + JSON.stringify(AnswerToBind));
                                    PreEditControlValues[ControlId] = { Answer: AnswerToBind.Answer, AnswerValue: AnswerToBind.AnswerValue }
                                }
                                else {
                                    PreEditControlValues[ControlId] = { Answer: '' , AnswerValue :'' }
                                }
                            }
                            PreEditValues[NodeId] = PreEditControlValues;
                        }
                    }
                }
            }
            
            return PreEditValues;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DispatchingViewRecordsFacade.GetValuesFromDB", xlatService);
        }
        finally {
        }
    }

    this.GetDefaultValuesToUpdate = function (PreEditValues, DefaultValueDict) {
        try {
            //alert('DefaultValueDict : ' + JSON.stringify(DefaultValueDict));
            //alert('PreEditValues : ' + JSON.stringify(PreEditValues));
            var DefaultValuesToUpdate = {};
            var ControlWiseDict;
            var AttributesList = [];
            for (NodeId in PreEditValues) {
                if (PreEditValues[NodeId] == "{}") {
                    if (DefaultValueDict[NodeId] != undefined && DefaultValueDict[NodeId] != "{}") {
                        ControlWiseDict = {};
                        for (var ControlId in DefaultValueDict[NodeId]) {
                            if (DefaultValueDict[NodeId][ControlId] != undefined && DefaultValueDict[NodeId][ControlId] != "{}" && DefaultValueDict[NodeId][ControlId] != "" && DefaultValueDict[NodeId][ControlId] != null) {
                                if (DefaultValueDict[NodeId][ControlId].Answer != "" && DefaultValueDict[NodeId][ControlId].Answer != null && DefaultValueDict[NodeId][ControlId].Answer != undefined) {
                                    var AttributeData = { "AttributeNodeId": NodeId, "ControlId": ControlId, "AnswerValue": "", "Answer": DefaultValueDict[NodeId][ControlId], "AnswerFKType": "" };
                                    ControlWiseDict[ControlId] = DefaultValueDict[NodeId][ControlId];
                                    AttributesList.push(AttributeData);
                                }
                            }
                        }
                        DefaultValuesToUpdate[NodeId] = ControlWiseDict;
                    }
                }

                else {
                    //alert('NodeId :' + NodeId + ", DefaultValueDict[NodeId] : " + DefaultValueDict[NodeId]);
                    if (DefaultValueDict[NodeId] != undefined && DefaultValueDict[NodeId] != "{}") {
                        for (var ControlId in DefaultValueDict[NodeId]) {
                            //alert('NodeId :' + NodeId + ",DefaultValueDict[NodeId][ControlId] :" + DefaultValueDict[NodeId][ControlId]);
                            if (DefaultValueDict[NodeId][ControlId] != undefined && DefaultValueDict[NodeId][ControlId] != "{}" && DefaultValueDict[NodeId][ControlId] != "" && DefaultValueDict[NodeId][ControlId] != null) {
                                if (DefaultValueDict[NodeId][ControlId].Answer != "" && DefaultValueDict[NodeId][ControlId].Answer != null && DefaultValueDict[NodeId][ControlId].Answer != undefined) {
                                    ControlWiseDict = {};
                                    ControlWiseDict[ControlId] = DefaultValueDict[NodeId][ControlId];
                                    DefaultValuesToUpdate[NodeId] = ControlWiseDict;
                                    PreEditValues[NodeId] = ControlWiseDict;
                                    var AttributeData = { "AttributeNodeId": NodeId, "ControlId": ControlId, "AnswerValue": DefaultValueDict[NodeId][ControlId].AnswerValue, "Answer": DefaultValueDict[NodeId][ControlId].Answer, "AnswerFKType": "" };
                                    AttributesList.push(AttributeData);
                                    DefaultValuesToUpdate[NodeId] = ControlWiseDict;
                                }
                            }
                        }
                    }
                }
            }

            return { 'PreEditValues': PreEditValues, 'DefaultValuesToUpdate': DefaultValuesToUpdate, 'AttributesList': AttributesList };
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DispatchingViewRecordsFacade.GetDefaultValuesToUpdate", xlatService);
        }
        finally {
        }
    }

    this.GetCompletedDCByDCId= function (DCId) {
        try {
            OneViewConsole.Debug("GetCompletedDCByDCId start", "DataCaptureBO.GetCompletedDCByDCId");
            OneViewConsole.DataLog("DCId : " + DCId, "DataCaptureBO.GetCompletedDCByDCId");

            var oDataCaptureDAO = new DcDAO();
            var result = oDataCaptureDAO.GetDCResultDetailsByDCId_DAO(DCId);

            if (result.length != 0) {
                var DataCaptureId = result[0].DataCaptureId;
                var DCAnswerInfo = { 'DataCaptureId': DataCaptureId, 'AttributeAnswers': {} };
                var i = 0;
                var totalLength = result.length;
                var AttributeNodeId = result[i].AttributeNodeId;
                var FormatedAttributeAnswerDetails = [];

                //Iterate the wrt Node
                while (true) {
                    if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId) {

                        var FormatedControlAnswerDetails = [];

                        //{2(ControlId): [ { 'SystemUserId': 1, 'Answer': '1', 'AnswerValue': 'Chicken', 'LastUpdatedDate': '10/5/2012' },{ 'SystemUserId': 2, 'Answer': '2', 'AnswerValue': 'Chicken65', 'LastUpdatedDate': '11/5/2012' } ] }
                        var ControlId = result[i].ControlId;
                        while (true) {
                            if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId && ControlId == result[i].ControlId) {
                                var anwerArray = result[i];
                                var AnwerDetails = { 'SystemUserId': anwerArray.SystemUserId, 'Answer': anwerArray.Answer, 'AnswerValue': anwerArray.AnswerValue, 'LastUpdatedDate': anwerArray.LastUpdatedDate, 'AttributeNodeId': AttributeNodeId, 'ControlId': ControlId, "DcResultDetailsId": anwerArray.DcResultDetailsId, "IndexId": anwerArray.IndexId }
                                FormatedControlAnswerDetails.push(AnwerDetails);
                                i = i + 1;
                            }
                            else {
                                FormatedAttributeAnswerDetails[ControlId] = FormatedControlAnswerDetails;
                                break;
                            }
                        }
                    }
                    else {
                        DCAnswerInfo.AttributeAnswers[AttributeNodeId] = FormatedAttributeAnswerDetails;
                        FormatedAttributeAnswerDetails = [];
                        if (i < totalLength)
                            AttributeNodeId = result[i].AttributeNodeId;
                        else {
                            break;
                        }
                    }
                }
            }
            OneViewConsole.Debug("GetCompletedDCByDCId end", "DataCaptureBO.GetCompletedDCByDCId");
            return DCAnswerInfo;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DispatchingViewRecordsFacade.GetCompletedDCByDCId", xlatService);
        }
        finally {
        }
    }


    //take data from existing db and compare with default value and create new entity
    this.GetDcResultDetailsEntity = function (TemplateNodes, CurrenntDateAndTime, DCId, DcResultId, PreEditValues) {
        try {
            //alert('GetDcResultDetailsEntity');
            OneViewConsole.Debug("GetDcResultDetailsEntity start", "DataCaptureBO.GetDcResultDetailsEntity");
            OneViewConsole.DataLog("TemplateNodes :" + JSON.stringify(TemplateNodes), "DataCaptureBO.GetDcResultDetailsEntity");
            OneViewConsole.DataLog("DCId :" + DCId, "DataCaptureBO.GetDcResultDetailsEntity");
            OneViewConsole.DataLog("DCResultId :" + DcResultId, "DataCaptureBO.GetDcResultDetailsEntity");
            


            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
            OneViewConsole.DataLog("CurrenntDateAndTime :" + CurrenntDateAndTime, "DataCaptureBO.GetDcResultDetailsEntity");

            var _OneViewGeolocationPlugin = new OneViewGeolocationPlugin();
            var IsSuccess = _OneViewGeolocationPlugin.CheckGeolocation();
            var Latitude = "";
            var Longitude = "";

            if (IsSuccess == true) {
                var result = _OneViewGeolocationPlugin.GetLatitudeAndLongitude();
                Latitude = result.Latitude;
                Longitude = result.Longitude;
            }

            var DCResultDetails = [];
            for (var itrAttrId in PreEditValues) {
                var _oAttributeInfo = PreEditValues[itrAttrId];
                var _oAttributeInfoFromTemplateNodes = TemplateNodes[itrAttrId];

                if (_oAttributeInfo != undefined) {
                    for (var ControlId in _oAttributeInfo) {

                        for (var _oPrimarayAnswerModeInfo in _oAttributeInfoFromTemplateNodes.AnswerMode) {

                            if (typeof (_oAttributeInfoFromTemplateNodes.AnswerMode[_oPrimarayAnswerModeInfo]) != 'function') {

                                var _oDcResultDetailsEntity = new DcResultDetailsEntity();


                                // _oDcResultDetailsEntity.Id = "INT PRIMARYKEY";
                                // _oDcResultDetailsEntity.ServerId = "INT";

                                /// <summary>
                                /// Service id
                                /// </summary>
                                _oDcResultDetailsEntity.ServiceId = OneViewSessionStorage.Get("ServiceId");
                                _oDcResultDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();

                                /// <summary>
                                /// version id
                                /// </summary>
                                _oDcResultDetailsEntity.MobileVersionId = 1;
                                //_oDcResultDetailsEntity.OVGuid = "INT";

                                _oDcResultDetailsEntity.DataCaptureId = DCId;
                                _oDcResultDetailsEntity.DataResultsId = DcResultId;

                                _oDcResultDetailsEntity.StartDate = CurrenntDateAndTime;
                                //  _oDcResultDetailsEntity.LastSyncDate = "TEXT";

                                _oDcResultDetailsEntity.IsManual = "true";
                                _oDcResultDetailsEntity.IsSynchronized = "false";

                                // ServerTemlateNodeId or MobileClinetGUID (in case of Dynamic attribute)
                                _oDcResultDetailsEntity.AttributeNodeId = itrAttrId;

                                //from which control data saved,Its Part of template Managent
                                _oDcResultDetailsEntity.ControlId = ControlId;

                                // Attribute Name (For drop dowen load,grid load : avoid joins)
                                _oDcResultDetailsEntity.AttributeNodeName = _oAttributeInfoFromTemplateNodes.Name;

                                /// <summary>
                                ///String,in case of TextBox answermode,
                                ///FK,in case of dynamic drop dowen.(going to keep,OrgAssetNode-ServerNodeId in case of RCO or OrgAssetNode-MobileClinetGUID in case of dynamic RCO )
                                /// 
                                /// </summary>
                                _oDcResultDetailsEntity.Answer = _oAttributeInfo[ControlId].Answer;

                                /// <summary>
                                ///  If answer is foreign key,value will come here (For drop dowen load,grid load : avoid joins)
                                /// </summary>
                                _oDcResultDetailsEntity.AnswerValue = _oAttributeInfo[ControlId].AnswerValue;

                                /// <summary>
                                /// If answer is foreign key,table name will come here
                                /// OrgHiNode,OrgAssetNode,....
                                /// 
                                /// </summary>
                                // _oDcResultDetailsEntity.AnswerFKType = "TEXT";                            ////Need to check

                                /// <summary>
                                /// DateTime,Int64,String,Boolean
                                /// </summary>
                                _oDcResultDetailsEntity.AnswerDataType = _oAttributeInfoFromTemplateNodes.AnswerMode[_oPrimarayAnswerModeInfo].DataType;;

                                /// <summary>
                                /// Ex:RAG,YN,DropDowen,Picture,Vedio,Audio
                                /// </summary>
                                _oDcResultDetailsEntity.AnswerMode = _oAttributeInfoFromTemplateNodes.AnswerMode[_oPrimarayAnswerModeInfo].Type;

                                /// <summary>
                                /// Ex:If it is dynamic attribute, IsDynamicAttribute = true
                                /// </summary>
                                // _oDcResultDetailsEntity.IsDynamicAttribute = "TEXT";

                                /// <summary>
                                /// Ex:If it is dynamic answer, IsDynamicAnswer = true
                                /// </summary>
                                _oDcResultDetailsEntity.IsDynamicAnswer = "false";

                                /// <summary>
                                /// Comments
                                /// </summary>
                                // _oDcResultDetailsEntity.Comments = "TEXT";

                                /// <summary>
                                /// created date
                                /// </summary>
                                _oDcResultDetailsEntity.CreatedDate = CurrenntDateAndTime;

                                /// <summary>
                                /// Last updated date on AnswerValue
                                /// </summary>
                                // _oDcResultDetailsEntity.LastUpdatedDate = "TEXT";

                                /// <summary>
                                /// Last updated date
                                /// </summary>
                                //  _oDcResultDetailsEntity.TimeStamp = "TEXT";

                                // _oDcResultDetailsEntity.ProcessCount = "INT";

                                // _oDcResultDetailsEntity.IndexId = "INT";                      //Need to check
                                _oDcResultDetailsEntity.IsMulti = "false";

                                _oDcResultDetailsEntity.Latitude = Latitude;

                                _oDcResultDetailsEntity.Longitude = Longitude;

                                //_oDcResultDetailsEntity.Score = "INT";
                                //_oDcResultDetailsEntity.MaxScore = "INT";
                                //_oDcResultDetailsEntity.Percentage = "INT";
                                //_oDcResultDetailsEntity.CompletedChildCount = "INT";
                                //_oDcResultDetailsEntity.TotalChildCount = "INT";
                                //_oDcResultDetailsEntity.CompletedAttributeCount = "INT";
                                //_oDcResultDetailsEntity.TotalAttributeCount = "INT";

                                _oDcResultDetailsEntity.IsNA = "false";
                                _oDcResultDetailsEntity.IsBlocker = "false";

                                //Saves the Bluetooth Probe/ IR device /Bar code reader etc device ids
                                if (ConnectedProbe != undefined && ConnectedProbe != null) {
                                    if (ConnectedProbe[0] != undefined && ConnectedProbe[0] != null)
                                    _oDcResultDetailsEntity.AutomaticDeviceId = ConnectedProbe[0].Id;
                                }
                                
                            }
                        }

                       // alert('_oDcResultDetailsEntity  :' + JSON.stringify(_oDcResultDetailsEntity));
                        DCResultDetails.push(_oDcResultDetailsEntity);
                    }
                }
            }
            OneViewConsole.Debug("GetDcResultDetailsEntity end", "DataCaptureBO.GetDcResultDetailsEntity");

            return DCResultDetails;
        }

        catch (Excep) {
            //alert("11 DataCaptureBO.GetDcResultDetailsEntity" + Excep);
            //alert("22 DataCaptureBO.GetDcResultDetailsEntity" + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "DispatchingViewRecordsFacade.GetDcResultDetailsEntity", xlatService);
        }

        finally {
        }
    }

}





