
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
var TempformatTimeOut = 2000;
    
MyApp.controller('AircraftLoadingVerificationController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
    //oSetDefaultSpinner.Start();
        //xlatService.setCurrentPage('AircraftLoadingVerification');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);
        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
    scope = $scope;
    oSnapRemote = snapRemote;

    var oAircraftLoadingVerificationFacade = new AircraftLoadingVerificationFacade({ 'scope': $scope, 'document': $document, 'location': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', '$timeout': $timeout, 'compile': $compile });

    oAircraftLoadingVerificationFacade.Init();
    oAircraftLoadingVerificationFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
   
    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = null;

        oAircraftLoadingVerificationFacade.Destroy();

        NCActionProfileMetaData = undefined;
        CommentsResult = {};
        ObservationResult = {};
        NCSelectedAttributeId = 0;

        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oAircraftLoadingVerificationFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oAircraftLoadingVerificationFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oAircraftLoadingVerificationFacade.SetSelectedTextBoxColor(ControlId);
    };

    $scope.ViewRecords = function () {
        var _oDcDAO = new DcDAO();
        var TotalDcCount = _oDcDAO.GetTotalAuditCount(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("TemplateId"), OneViewSessionStorage.Get("DcPlaceId"), OneViewSessionStorage.Get("DcPlaceName"));

        if (TotalDcCount > 0) {
            scope = null;
            //ionicBackdrop = null;
            OneViewSessionStorage.Remove("NCInlineEdit");
            OneViewSessionStorage.Remove("MyAuditEditForm");
            $location.url('/ViewRecords');
        }
        else {
            alert(xlatService.xlat('No_Records_Available'));
            //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('No_Records_Available'));
        }
    };


    $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
        oAircraftLoadingVerificationFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
    };


    $scope.ShowNCStatus = function (AttributeId, ControlId) {
        $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
    }
 
    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
        $scope.DisableSave = true;
        $scope.DisableSaveSubmit = true;
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oAircraftLoadingVerificationFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, Timeout);
    }

    $scope.Back = function () {
            scope = null;
            //ionicBackdrop = null;
            if (OneViewSessionStorage.Get("DcId") != null) {
                OneViewSessionStorage.Remove("NCInlineEdit");
                OneViewSessionStorage.Remove("MyAuditForm");
                $location.url('/ViewRecords');
            }
            else if (OneViewSessionStorage.Get("MyAuditForm") == 'true') {
                OneViewSessionStorage.Remove("NCInlineEdit");
                 OneViewSessionStorage.Remove("MyAuditEditForm");
                 $location.url('/my-audit');
            }
            else
            {
                $location.url('/newdc');
            }
        }
    $scope.toggle = false;

    $scope.ClearForm = function () {
        oAircraftLoadingVerificationFacade.ClearForm();
    }

    $scope.$on('$destroy', function () {
        scope = null;
       // ionicBackdrop = null;
        oAircraftLoadingVerificationFacade = null;
        $scope = null;
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oAircraftLoadingVerificationFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oAircraftLoadingVerificationFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oAircraftLoadingVerificationFacade.ngChange_setDateTime(ControlId);
    }

    $scope.CustomNCClick = function () {
        oAircraftLoadingVerificationFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oAircraftLoadingVerificationFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oAircraftLoadingVerificationFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oAircraftLoadingVerificationFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oAircraftLoadingVerificationFacade.CloseRightPanel();
    }

    $scope.SubmitRecords = function () {
        oAircraftLoadingVerificationFacade.SaveDCRecords(true);
    }

    $scope.ClearReasons = function () {
        oAircraftLoadingVerificationFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oAircraftLoadingVerificationFacade.ClearComments();
    }

    $scope.ProbeTesting = function () {
        oAircraftLoadingVerificationFacade.ProbeTesting();
    };

    var DecimalFormaterTimeOut = null;
    $scope.MakeDecimalControl = function (ControlId,Format) {

        //var value = arg.value;
        var value = document.getElementById(ControlId).value;
        value = value.replace(/\s/g, '');
        value = value.replace(/[^- 0-9 .]/g, '');
        if (value.split(".").length - 1 > 1) {
            value = value.substring(0, value.length - 1);
        }
        else if (value.split("-").length - 1 > 1) {
            value = value.substring(0, value.length - 1);
        }
        else if (value.indexOf("-") > 0) {
            value = value.substring(0, value.length - 1);
        }

        //todo:need make it dynamic with reg exp.(its a temp solution)
        if (Format !=undefined)
        {
            if(Format=='#.#')
            {
                if (value != undefined && value != "" &&  value.indexOf('.') != -1) {
                    var temp = value.split('.');
                    if (temp[1].length > 1) {
                        value = value.substring(0, value.length - 1);
                    }
                    if (temp[0].length ==0 ) {
                        value = "0" + value;
                    }
                    if (temp[0].length == 1) {
                        if (temp[0] == "-") {
                            value = temp[0] + "0." + temp[1];
                        }
                    }
                    
                }

                //if (DecimalFormaterTimeOut != null)
                //    $timeout.cancel(DecimalFormaterTimeOut);
                //DecimalFormaterTimeOut = $timeout(function () {
                //    //alert(temp[1]);
                //    if (value != undefined && value != "" && value.indexOf('.') != -1) {
                //        var temp = value.split('.');
                //        if (temp[1] == undefined || temp[1] == "") {
                //           // alert('value case 2 : ' + value);
                //            value = value + "0";
                //        }
                //    }
                //    else if (value != undefined && value!="" && value.indexOf('.') == -1) {
                //       // alert('value case 3 : ' + value);
                //        value = value + ".0";
                //    }

                //    document.getElementById(ControlId).value = value;
                //    $scope.NewDCModel[ControlId] = value;
                //}, 2000);
            }
        }
        value = value.trim();

       
        //arg.value = value;
        document.getElementById(ControlId).value = value;
        $scope.NewDCModel[ControlId] = value;
        //scope.$apply();
    }

    $scope.MakeDecimalControlNew = function (ControlId) {

        //var value = arg.value;
        var value = document.getElementById(ControlId).value;
        value = value.replace(/\s/g, '');
        value = value.replace(/[^- 0-9 .]/g, '');
        if (value.split(".").length - 1 > 1) {
            value = value.substring(0, value.length - 1);
        }
        else if (value.split("-").length - 1 > 1) {
            value = value.substring(0, value.length - 1);
        }
        else if (value.indexOf("-") > 0) {
            value = value.substring(0, value.length - 1);
        }
        value = value.trim();

        //if (lastTimeOutId != null)
        //    $timeout.cancel(lastTimeOutId);
        //lastTimeOutId = $timeout(function () {
          //  alert('before value :' + value);

            if (value.indexOf('.') != -1) {
                var temp = value.split('.');
                if (temp[1].length > 1) {
                    value = value.substring(0, value.length - 1);
                }
                else if (temp[1].length == 0) {
                    value = value + "0";
                }
                else {
                    //no need to do if length is ok
                }
            }
            else if (value != "") {
                value = value + ".0";
            }

            //alert('after value :' + value);
            document.getElementById(ControlId).value = value;
            $scope.NewDCModel[ControlId] = value;


      //  }, TempformatTimeOut);

        //arg.value = value;

        //scope.$apply();
    }
         
    $scope.FormatDecimalControl = function (ControlId) {

        //var value = arg.value;
        var value = document.getElementById(ControlId).value;

        //if (lastTimeOutId != null)
        //    $timeout.cancel(lastTimeOutId);
        //lastTimeOutId = $timeout(function () {
        //  alert('before value :' + value);

        if (value.indexOf('.') != -1) {
            var temp = value.split('.');
            if (temp[1].length > 1) {
                value = value.substring(0, value.length - 1);
            }
            else if (temp[1].length == 0) {
                value = value + "0";
            }
            else {
                //no need to do if length is ok
            }
        }
        else if (value != "") {
            value = value + ".0";
        }

        //alert('after value :' + value);
        document.getElementById(ControlId).value = value;
        $scope.NewDCModel[ControlId] = value;


        //  }, TempformatTimeOut);

        //arg.value = value;

        //scope.$apply();
    }
});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function AircraftLoadingVerificationFacade(parm) {

    try {
        OneViewConsole.Debug("AircraftLoadingVerificationFacade Start", "Facade.AircraftLoadingVerificationFacade");

        var MyInstance = this;
        //$scope, $document, $state, xlatService, toaster, SpinService
        var $scope = parm.scope;
        var $document = parm.document;
        var $location = parm.location;
        var xlatService = parm.xlatService;
        var $timeout = parm.$timeout;
        var $compile = parm.compile;
        //var toaster = parm.toaster;
        //var SpinService = parm.SpinService;
        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        var TemplateId = OneViewSessionStorage.Get("TemplateId");
        var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];

        //*********** basic meta datas for Cooking and blast chilling varifications

        var TemplateId = OneViewSessionStorage.Get("TemplateId");
        var TemplateName = OneViewSessionStorage.Get("TemplateName");
        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        var ServiceName = OneViewSessionStorage.Get("ServiceName");
        var DcProfileId = 1;
        var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
        var DcPlaceName = OneViewSessionStorage.Get("DcPlaceName");
        var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
        var LoginUserName = OneViewSessionStorage.Get("LoginUserName");
        var DcId = OneViewSessionStorage.Get("DcId");
        var IsFirstTimeEdit = false;

        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
       // var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("AircraftLoadingVerificationFacade End", "Facade.AircraftLoadingVerificationFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.AircraftLoadingVerificationFacade", xlatService);
    }

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "AircraftLoadingVerificationFacade.Init");

            $scope.NewDCModel = {};
            $scope.ShiftOptions = [];
            $scope.RefriStatus = [];

            $scope.DayMarker = [];
            $scope.ChillerAvailability = [];
            $scope.NCOptions = [];
            $scope.CookingShiftOptions = [];

            _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
            _oDataCaptureBO.Init();

            OneViewConsole.Debug("Init End", "AircraftLoadingVerificationFacade.Init");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.Init", xlatService);
        }
    }

    var LoadDefaultValueMetaData = function () {
        try {
            var oLVMetaDataComponent = new LVMetaDataComponent();
            oLVMetaDataComponent.Load();
        }
        catch (Excep) {
            //alert('LoadDefaultValueMetaData Excep :' + Excep)
            throw Excep;
        }
    }
    /// <summary>
    /// Step 1: Load drop down (Load Product,ProductType,Airline,Chiller,Comments.)
    ///        TODO:Cooked need to enable
    /// Step 2: Set DefaultValue from the meta data.
    /// Step 3: Set NC Rules.
    /// </summary>
    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad Start", "AircraftLoadingVerificationFacade.PageLoad");

            var ModelIdForAutoTemperatureUpdation;
           // var ModelIdForAutoTimeUpdation;
            LoadDefaultValueMetaData();
            AutoCompleteGenerateHTML();
            Loadddl();
            _oDataCaptureBO.LoadShift();
            LoadAnswerModes();
            _oDataCaptureBO.ClearControls();
            _oDataCaptureBO.SetMandatoryMetaData();
             //// _oNCComponent.Init();
            _oCPActionNCComponent.Init();

            //// todo : check with pallav and solve document,getelementbyid page load issue
            _oDataCaptureBO.SetControlEnableStatus();

            //// _oNCComponent.BindNCSummaryHandler = BindNc;

            if (DcId != null) {
                IsFirstTimeEdit = true;
                $scope.Add = 'Save';
                _oDataCaptureBO.GetNCComments(DcId);
                _oDataCaptureBO.LoadEditPage(DcId, $scope);

                SetSelectedTextBoxColor_Private('AmbientTempControlId');
                ModelIdForAutoTemperatureUpdation = 'NewDCModel.AmbientTempControlId';
                IsFirstTimeEdit = false;
            }
            else {
                $scope.Add = 'Add';
                _oDataCaptureBO.setDefaultValue();
                SetSelectedTextBoxColor_Private('AmbientTempControlId');
                ModelIdForAutoTemperatureUpdation = 'NewDCModel.AmbientTempControlId';


            }
            _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = ModelIdForAutoTemperatureUpdation;
            _oDataCaptureBO.ModelIdForAutoTimeUpdation = '';
            _oDataCaptureBO.SetDefaultAutoTemperatureListener();


            ///AuditSummary
            _oDataCaptureBO.ShowDCSummary();
            _oSettingsBO.ShowAutoManualStatus($scope);

            new OnewViewEventListener().RegisterSelectedFieldEvent();

            OneViewConsole.Debug("PageLoad End", "AircraftLoadingVerificationFacade.PageLoad");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.PageLoad", xlatService);
        }
    }

    this.SetSelectedTextBoxColor = function (ControlId) {
        try {
            OneViewConsole.Debug("SetSelectedTextBoxColor Start", "AircraftLoadingVerificationFacade.SetSelectedTextBoxColor");

            SetSelectedTextBoxColor_Private(ControlId);

            OneViewConsole.Debug("SetSelectedTextBoxColor End", "AircraftLoadingVerificationFacade.SetSelectedTextBoxColor");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.SetSelectedTextBoxColor", xlatService);
        }
    }

    var SetSelectedTextBoxColor_Private = function (ControlId) {
        try {
            OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "AircraftLoadingVerificationFacade.SetSelectedTextBoxColor_Private");

            if (ControlId == 'AmbientTempControlId') {
                $scope.AmbientTempControlId = 'highlight';
                $scope.AircraftLoadingTempControlId = '';
                $scope.TempControlId = '';
                $scope.ATGalleyChillerTempControlId = '';
            }

            else if (ControlId == 'AircraftLoadingTempControlId') {
                $scope.AmbientTempControlId = '';
                $scope.AircraftLoadingTempControlId = 'highlight';
                $scope.TempControlId = '';
                $scope.ATGalleyChillerTempControlId = '';
            }

            else if (ControlId == 'TempControlId') {
                $scope.AmbientTempControlId = '';
                $scope.AircraftLoadingTempControlId = '';
                $scope.TempControlId = 'highlight';
                $scope.ATGalleyChillerTempControlId = '';
            }
            else if (ControlId == 'ATGalleyChillerTempControlId') {
                $scope.AmbientTempControlId = '';
                $scope.AircraftLoadingTempControlId = '';
                $scope.TempControlId = '';
                $scope.ATGalleyChillerTempControlId = 'highlight';
            }

            OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "AircraftLoadingVerificationFacade.SetSelectedTextBoxColor_Private");
        }
        catch (Excep) {
            throw Excep;
        }
    }


    var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("BindNc Start", "AircraftLoadingVerificationFacade.BindNc");

            var element = document.getElementById("divDeviatedValue");
            if (NcStatus == true) {
                {
                    if (objRule.Rule.CriteriaType == 'OneViewDCPrimaryCriteria') {
                        if (objRule.Rule != undefined) {
                            var Criteria = objRule.Rule;
                            if (Criteria.NodeId == AttributeId) {
                                $scope.toggle = true;
                                $scope.CriteriaDisplayLabel = objRule.CriteriaDisplayLabel;
                                $scope.DisplayDeviatedValue = 'Deviated By' + (Criteria.value - $scope.NewDCModel[ControlId]);
                                element.setAttribute("class", "col red");
                            }
                        }
                    }
                    else {
                        for (var j = 0; j < objRule.Rule.FilterParms.length; j++) {
                            var Criteria = objRule.Rule.FilterParms[j];
                            if (Criteria.NodeId == AttributeId) {
                                $scope.toggle = true;
                                $scope.CriteriaDisplayLabel = objRule.CriteriaDisplayLabel;
                                $scope.DisplayDeviatedValue = 'Deviated By' + (Criteria.value - $scope.NewDCModel[ControlId]);
                                element.setAttribute("class", "col red"); //For Most Browsers
                            }
                        }
                    }
                }
            }
            else {
                $scope.toggle = true;
                $scope.DisplayDeviatedValue = 'Good';
                $scope.CriteriaDisplayLabel = objRule.CriteriaDisplayLabel;
                element.setAttribute("class", "col green"); //For Most Browsers
            }

            OneViewConsole.Debug("BindNc End", "AircraftLoadingVerificationFacade.BindNc");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            element = null;
            Criteria = null;
        }
    }

    this.GetProbeStatus = function () {
        try {
            OneViewConsole.Debug("GetProbeStatus Start", "AircraftLoadingVerificationFacade.GetProbeStatus");

            _oSettingsBO.ProbeStatus('', xlatService);

            OneViewConsole.Debug("GetProbeStatus End", "AircraftLoadingVerificationFacade.GetProbeStatus");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.GetProbeStatus", xlatService);
        }
    }

    this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
        try {
            OneViewConsole.Debug("SetAutoTemperatureListener Start", "AircraftLoadingVerificationFacade.SetAutoTemperatureListener");
            var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
            _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
            _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

            OneViewConsole.Debug("SetAutoTemperatureListener End", "AircraftLoadingVerificationFacade.SetAutoTemperatureListener");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.SetAutoTemperatureListener", xlatService);
        }
        finally {
            modelName = null;
        }
    }


    /// <summary>
    /// Save Data capture records
    /// Step 1: Validations (Mandatory Validations,etc..)
    /// Step 2: If Any Dynamic RCO
    ///      2.1: Create Master
    ///      2.2: Create OrgAssetNode
    ///      2.3: Update the ids
    /// Step 3:Save the record in to local data base
    /// Step 4:Clear the controls
    /// Step 5:Set the default values
    /// </summary>
    this.SaveDCRecords = function (IsSubmit) {
        oSetDefaultSpinner.Start();
        try {
            OneViewConsole.Debug("SaveDCRecords Start", "AircraftLoadingVerificationFacade.SaveDCRecords");

            _oDataCaptureBO.CreateDynamicElementHandler = CreateDynamicElements;
            if (DcId != null) {
                var Status = _oDataCaptureBO.UpdateDC(DcId, undefined, _oDataCaptureBO.PreEditValues, IsSubmit);
                if (Status != false) {
                    OneViewSessionStorage.Remove("DcId");
                    $location.url('/ViewRecords');
                }
            }
            else {
                _oDataCaptureBO.SaveDC(IsSubmit);
            }
            _oDataCaptureBO.ShowDCSummary();
            SetSelectedTextBoxColor_Private('AmbientTempControlId');
            _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.AmbientTempControlId';
            _oDataCaptureBO.ModelIdForAutoTimeUpdation = '';

            OneViewConsole.Debug("SaveDCRecords End", "AircraftLoadingVerificationFacade.SaveDCRecords");
        }
        catch (Excep) {
            //alert('AircraftLoadingVerificationFacade.SaveDCRecords 11 :' + Excep);
           // alert('AircraftLoadingVerificationFacade.SaveDCRecords 22 :' + JSON.stringify( Excep));
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.SaveDCRecords", xlatService);
        }
        finally {
            Status = null;
        }
        oSetDefaultSpinner.Stop();
    }

    var OneViewAdvAutoCompleteClick = function (EventArgs) {
        try {
            //alert('NCAutocompleteEvent OneViewAdvAutoCompleteTest hi here');

            //Autocomplete code
            OneViewAdvAutoCompleteOnclick(EventArgs);

            // alert(EventArgs.attributes['AttributeNodeId'].value);
            //alert('controlId ' + EventArgs.attributes['name'].value);

            //NC Component code
            MyInstance.Temperature_NgKeyUp(EventArgs.attributes['AttributeNodeId'].value, EventArgs.attributes['name'].value, '');

        }
        catch (Excep) {
            //alert('Excep OneViewAdvAutoCompleteTest :' + Excep + JSON.stringify(Excep))
            throw Excep;
        }
    }

    var AutoCompleteCloseClick = function () {
        try {
            //alert('AutoCompleteCloseTest OneViewAdvAutoCompleteTest hi here');
            //Autocomplete code
            AutoCompleteClose();

            var ControlId = document.getElementById('txtAutoCompleteSearch').getAttribute("SearchControlId");
            var AttributeNodeId = document.getElementById('txtAutoCompleteSearch').getAttribute("AttributeNodeId");

            //alert('AutoCompleteCloseTest ControlId' + ControlId);
            //alert('AttributeNodeId' + AttributeNodeId);

            //NC Component code
            MyInstance.Temperature_NgKeyUp(AttributeNodeId, ControlId, '');
        }
        catch (Excep) {
            // alert('Excep AutoCompleteCloseClick :' + Excep + JSON.stringify(Excep))
            throw Excep;
        }
    }

    var Loadddl = function () {
        try {
            OneViewConsole.Debug("Loadddl Start", "AircraftLoadingVerificationFacade.Loadddl");

            OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
            AutoCompleteCloseEvent = AutoCompleteCloseClick;


            var oFlightddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFlightControlId', 'DataSourceModelName': 'Flights', 'DisplayElementModelName': 'NewDCModel.AddlFlightControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Airline, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 412, 'SelectedIndexChangedEventHandler': oFlightSelectedIndexChanged });
            oFlightddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Airline, _TableNamesEnum.OrganizationAssetsNode);

            var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 296 });
            oAirlinesddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);

            //var oTypeOfMealddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlTypeOfMealControlId', 'DataSourceModelName': 'TypeOfMeal', 'DisplayElementModelName': 'NewDCModel.AddlTypeOfMealControlId', 'DATEntityTypeId': DATEntityType.Lbl_ProductType, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 7007 });
            //oTypeOfMealddl.SetDataSourceForProductType(DcPlaceId, DATEntityType.Lbl_ProductType, _TableNamesEnum.OrganizationAssetsNode);

            var oProductddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlProductControlId', 'DataSourceModelName': 'Products', 'DisplayElementModelName': 'NewDCModel.AddlProductControlId', 'DATEntityTypeId': DATEntityType.RCO_WorkOrder, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': 294 });
          //  oProductddl.SetDataSourceWithWorkOrder(OrganizationId, DATEntityType.RCO_WorkOrder, _TableNamesEnum.OrganizationAssetsNode, SectionCodesConfig.BlastChilling);
            oProductddl.SetDataSourceWithWorkOrder(DcPlaceId, DATEntityType.RCO_WorkOrder, _TableNamesEnum.OrganizationAssetsNode);

            var oSectorddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectorControlId', 'DataSourceModelName': 'Sectors', 'DisplayElementModelName': 'NewDCModel.AddlSectorControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Sector, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 413 });
            oSectorddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Sector, _TableNamesEnum.OrganizationAssetsNode);

            var oFAndBddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFAndBControlId', 'DataSourceModelName': 'FAndB', 'DisplayElementModelName': 'NewDCModel.AddlFAndBControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_FandBOutLet, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 414 });
            oFAndBddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_FandBOutLet, _TableNamesEnum.OrganizationAssetsNode);

            var oClassddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtClassControlId', 'DataSourceModelName': 'Class', 'DisplayElementModelName': 'NewDCModel.txtClassControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Class, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 295 });
            oClassddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Class, _TableNamesEnum.OrganizationAssetsNode);

            var oMealTypeddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlTypeOfMealControlId', 'DataSourceModelName': 'MealType', 'DisplayElementModelName': 'NewDCModel.AddlTypeOfMealControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MealsType, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 417 });
            oMealTypeddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MealsType, _TableNamesEnum.OrganizationAssetsNode);

            OneViewConsole.Debug("Loadddl End", "AircraftLoadingVerificationFacade.Loadddl");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oProductddl = null;
        }
    }


    var oFlightSelectedIndexChangedOLD = function (EventArgs) {
        try {
            OneViewConsole.Debug("oFlightSelectedIndexChanged Start", "CookingAndBlastChillingMonitoringFacade.oFlightSelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {
                var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 296, });
                oAirlinesddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
                if (DcId == null) {
                    oAirlinesddl.Clear();
                }
            }
            else {
                var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 296, });
                oAirlinesddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
            }

            OneViewConsole.Debug("oFlightSelectedIndexChanged End", "CookingAndBlastChillingMonitoringFacade.oFlightSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oAirlinesddl = null;
        }
    }

    var oFlightSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oFlightSelectedIndexChanged Start", "CookingAndBlastChillingMonitoringFacade.oFlightSelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                var AirlineId = "";
                var AirlineName = "";

                if ((DcId != null || IsFirstTimeEdit == true) && (($scope['AddlAirlineControlId'] != undefined && $scope['AddlAirlineControlId'].GetSelectedText() != undefined) && ($scope['AddlAirlineControlId'].GetSelectedText() != ''))) {
                    AirlineId = $scope['AddlAirlineControlId'].GetSelectedValue();
                    AirlineName = $scope['AddlAirlineControlId'].GetSelectedText();
                }

                var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 296, });
                oAirlinesddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);

                if ((DcId != null || IsFirstTimeEdit == true) && ((AirlineId != "") && (AirlineName != ''))) {
                    $scope['AddlAirlineControlId'].Set({ Id: AirlineId, Name: AirlineName, "IsDynamicElement": false });
                }

                if (DcId == null || IsFirstTimeEdit == false) {
                    oAirlinesddl.Clear();

                }
            }
            else {
                var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 296, });
                oAirlinesddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
            }

            OneViewConsole.Debug("oFlightSelectedIndexChanged End", "CookingAndBlastChillingMonitoringFacade.oFlightSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oAirlinesddl = null;
        }
    }

 
    this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
        try {
            OneViewConsole.Debug("Temperature_NgKeyUp Start", "AircraftLoadingVerificationFacade.Temperature_NgKeyUp");

            //alert(AttributeId + "," + ControlId + "," + RefreshcontrolId + "," + IsNc)
            ////if (IsNc == true) {
            //    var ActionResponseList = EvaluateActionNCStatus(AttributeId);
            //// }
            var oDefaultValidationResponse = new DefaultValidationResponse();
            oDefaultValidationResponse = _oDataCaptureBO.PostControlEventsExe(AttributeId, ControlId);

            if (oDefaultValidationResponse.IsSuccess) {
                ValidateActionNC(AttributeId, ControlId)
                if (RefreshcontrolId != '') {
                    // var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });

                    if (RefreshAttributeId != undefined || RefreshAttributeId != '') {
                        var Value = document.getElementById(ControlId).value;
                        if ((RefreshcontrolId != "" && RefreshcontrolId != undefined && RefreshcontrolId != null) && (Value == "" || Value == undefined || Value == null)) {
                            document.getElementById(RefreshcontrolId).value = "";
                            $scope.NewDCModel[RefreshcontrolId] = "";
                            $scope[RefreshcontrolId + "_DateTime"] = "";
                        }

                        else {
                            //_oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
                            _oDataCaptureBO.SetDateTime($scope, ControlId, RefreshcontrolId);
                        }

                        ValidateActionNC(RefreshAttributeId, RefreshcontrolId);

                    }

                }

                NCSelectedAttributeId = AttributeId;
            }
            else {

                if (RefreshcontrolId != '') {
                    document.getElementById(RefreshcontrolId).value = "";
                    $scope.NewDCModel[RefreshcontrolId] = "";
                    $scope[RefreshcontrolId + "_DateTime"] = "";
                }
            }



            $scope.DisableSave = false;
            $scope.DisableSaveSubmit = false;
            OneViewConsole.Debug("Temperature_NgKeyUp End", "AircraftLoadingVerificationFacade.Temperature_NgKeyUp");
        }
        catch (Excep) {
            $scope.DisableSave = false;
            $scope.DisableSaveSubmit = false;
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.Temperature_NgKeyUp", xlatService);
        }
        finally {
            oDataCaptureBO = null;
        }
    }

    var ValidateActionNC = function (AttributeId, ControlId) {
        try {
            //alert('here')
            // alert('chkP' + $scope.NewDCModel.chkP);
            // alert('chkG' + $scope.NewDCModel.chkG);
            OneViewConsole.Debug("ValidateActionNC Start", "AircraftLoadingVerificationFacade.ValidateActionNC");
            var ActionResponseList = EvaluateActionNCStatus(AttributeId);

            if (ActionResponseList != undefined) {
                if (ActionResponseList.length > 1) {
                    alert('More than one action for a single attribute : Not implemeneted');
                }
                else {
                    for (var i = 0; i < ActionResponseList.length; i++) {
                        if ((ActionResponseList[i].IsFormAction == true || ActionResponseList[i].IsFormAction == 'true') && (ActionResponseList[i].IsRuleViolated == true || ActionResponseList[i].IsRuleViolated == 'true')) {
                            MyInstance.ShowNCFormAction(ControlId);
                        }
                    }
                }
            }
            OneViewConsole.Debug("ValidateActionNC End", "AircraftLoadingVerificationFacade.ValidateActionNC");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oDataCaptureBO = null;
        }
    }

    this.CheckActionNCEvent = function (AttributeId, ControlId, RefreshcontrolId) {
        try {
            //alert(AttributeId + "," + ControlId);
            OneViewConsole.Debug("CheckActionNCEvent Start", "AircraftLoadingVerificationFacade.CheckActionNCEvent");
            ValidateActionNC(AttributeId, ControlId);
            OneViewConsole.Debug("CheckActionNCEvent End", "AircraftLoadingVerificationFacade.CheckActionNCEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.CheckActionNCEvent", xlatService);
        }
        finally {
            oDataCaptureBO = null;
        }
    }

    var EvaluateActionNCStatus = function (AttributeId) {
        try {
            OneViewConsole.Debug("ShowNCStatus Start", "AircraftLoadingVerificationFacade.EvaluateActionNCStatus");
            var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
            return ActionResponseList;
            OneViewConsole.Debug("ShowNCStatus End", "AircraftLoadingVerificationFacade.EvaluateActionNCStatus");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            DCNCMappingListData = null;
        }
    }

    this.Destroy = function () {
        _oDataCaptureBO.TemperatureNgKeyUpEventHandler = null;
        _oDataCaptureBO.Destroy();
    }

    this.ShowNCFormAction = function (ControlId) {
        try {
            OneViewConsole.Debug("ShowNCFormAction Start", "AircraftLoadingVerificationFacade.ShowNCFormAction");

            //var TempOutNCTemplate = TemplateMetaData[ServiceId][NCTemplateDetails.TemplateId];
            //var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': NCTemplateDetails.TemplateId, 'TemplateName': NCTemplateDetails.TemplateName });
            ////Edit case
            //if (DcId != null) {

            //}

            ////Save case
            //else if (_oDataCaptureBO.FormActionCount <= 1) {
            //    _oNCDcDataCaptureBO.ClearControls(TempOutNCTemplate);
            //}
            //if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
            //}
            //else if ($scope.DivContent == true && $scope.DivNGForm != true) {
            //    var Title = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Title;
            //    var Message = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Message;

            //    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            //    oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

            //        if (ConfirmationId == '2') {

            //            $scope.DivNC = false;
            //            $scope.DivNGForm = true;
            //            $scope.DivContent = false;
            //            $scope.DivSignature = false;
            //            xlatService.setCurrentPage('NCForm_Page');

            //            var SelectedTime = document.getElementById('DTBlastChillerTimeOutControlId');
            //            SetTimeInFormat(SelectedTime, 'DTBlastChillerTimeOutControlId');

            //            $scope.$apply();
            //        }
            //        else {
            //            MyInstance.ShowNCButton();
            //            $scope.$apply();
            //        }
            //    });

            //}



            OneViewConsole.Debug("ShowNCFormAction End", "AircraftLoadingVerificationFacade.ShowNCFormAction");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.ShowNCFormAction", xlatService);
        }
        finally {
            TempOutNCTemplate = null;
            _oNCDcDataCaptureBO = null;
            Title = null;
            Message = null;
            oOneViewCordovaPlugin = null;
            NCDCId = null;
        }
    }

    var OnAnswerModeSelect = function (option) {
        try {
            MyInstance.Temperature_NgKeyUp(option.AttributeNodeId, option.ControlId, '');

        }
        catch (Excep) {
            //alert('Excep OnAnswerModeSelect :' + Excep + JSON.stringify(Excep))
            throw Excep;
        }
    }

    var LoadAnswerModes = function () {
        try {
            OneViewConsole.Debug("LoadAnswerModes Start", "AircraftLoadingVerificationFacade.LoadAnswerModes");

            AnswerModeNCActionEvent = OnAnswerModeSelect;

            var oRefrigeratorStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkRefriStatus', 'DataSourceModelName': 'RefriStatus', 'DisplayElementModelName': 'NewDCModel.chkRefriStatus' });
            oRefrigeratorStatus.AnswerModes(TemplateNodes, 301);

            var oChillerAvailability = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkChillerAvailability', 'DataSourceModelName': 'ChillerAvailability', 'DisplayElementModelName': 'NewDCModel.chkChillerAvailability' });
            oChillerAvailability.AnswerModes(TemplateNodes, 416);

            var oDayMarker = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkDayMarker', 'DataSourceModelName': 'DayMarker', 'DisplayElementModelName': 'NewDCModel.chkDayMarker' });
            oDayMarker.AnswerModes(TemplateNodes, 415);

            var oCookingShift = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCookingShift', 'DataSourceModelName': 'CookingShiftOptions', 'DisplayElementModelName': 'NewDCModel.chkCookingShift' });
            oCookingShift.AnswerModes(TemplateNodes, 525);

            var oProductStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
            oProductStatus.LoadNCOptions();

            OneViewConsole.Debug("LoadAnswerModes End", "AircraftLoadingVerificationFacade.LoadAnswerModes");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oRefrigeratorStatus = null;
        }
    }

    var CreateDynamicElements = function (_DcResultDetailsEntityLst) {
        try {
            OneViewConsole.Debug("CreateDynamicElements Start", "AircraftLoadingVerificationFacade.CreateDynamicElements");

            var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");
            for (var i = 0; i < _DcResultDetailsEntityLst.length; i++) {
                if (_DcResultDetailsEntityLst[i].IsDynamicAnswer == 'true') {
                    var ParentNodeId = DCPlaceNodeId;
                    var ParentDbElementType = DATEntityType.RCOMaster_Kitchen;
                    var ParentDbElementId = "0";


                    var Response;
                    var _oDynamicElementBO = new DynamicElementBO();

                    if (_DcResultDetailsEntityLst[i].AttributeNodeId == 294)//for product
                    {
                        Response = _oDynamicElementBO.AddDynamicOrder(_DcResultDetailsEntityLst[i], ParentNodeId, ParentDbElementType, ParentDbElementId, '', DATEntityType.RCO_WorkOrder, '92685');
                        // _DcResultDetailsEntityLst[i].Answer = "0";
                        _DcResultDetailsEntityLst[i].Answer = _DcResultDetailsEntityLst[i].AnswerValue;
                    }
                    else {
                        //add into Maaster and node
                        var oDefaultTreeDAO = new DefaultTreeDAO();
                        var ParentDbElement = oDefaultTreeDAO.GetNodeById(ParentNodeId, 'OrganizationAssetsNode');
                        ParentDbElementId = ParentDbElement[0].ChildDbElementId;
                     
                        Response = _oDynamicElementBO.AddDynamicRCO(_DcResultDetailsEntityLst[i], ParentNodeId, ParentDbElementType, ParentDbElementId);
                        //Update Answer with newly created node
                        _DcResultDetailsEntityLst[i].Answer = Response.NodeClientGuid;
                       
                    }
                   
                   
                }
            }

            OneViewConsole.Debug("CreateDynamicElements End", "AircraftLoadingVerificationFacade.CreateDynamicElements");
        }

        catch (Excep) {
            throw Excep;
        }
        finally {
            DCPlaceNodeId = null;
            ParentNodeId = null;
            ParentDbElementType = null;
            ParentDbElementId = null;
            oDefaultTreeDAO = null;
            ParentDbElement = null;
            _oDynamicElementBO = null;
            Response = null;
        }
    }

    this.Temperature_NgKeyUpOLD = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
        try {
            OneViewConsole.Debug("Temperature_NgKeyUp Start", "AircraftLoadingVerificationFacade.Temperature_NgKeyUp");

            if (IsNc == true) {
                ShowNCStatus(AttributeId, ControlId);
            }

            var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
            oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.Temperature_NgKeyUp", xlatService);
        }
        finally {
            oDataCaptureBO = null;
        }
    }

    var ShowNCStatusOLD = function (AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("ShowNCStatus Start", "CookingAndBlastChillingVerificationFacade.ShowNCStatus");

            var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
            NormalizeNCEntityListData(DCNCMappingListData);

            OneViewConsole.Debug("ShowNCStatus End", "CookingAndBlastChillingVerificationFacade.ShowNCStatus");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            DCNCMappingListData = null;
        }
    }

    this.ClearForm = function () {
        try {
            OneViewConsole.Debug("ClearForm Start", "CookingAndBlastChillingVerificationFacade.ClearForm");

            _oDataCaptureBO.ClearControls();
            if (DcId != null) {
                _oDataCaptureBO.LoadEditPage(DcId, $scope);
            }
            else {
                _oDataCaptureBO.setDefaultValue();
            }

            OneViewConsole.Debug("ClearForm End", "CookingAndBlastChillingVerificationFacade.ClearForm");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.ClearForm", xlatService);
        }
    }

    var IsNCthereOrNot = function (RuleId, isNC) {
        try {
            OneViewConsole.Debug("IsNCthereOrNot Start", "CookingAndBlastChillingVerificationFacade.IsNCthereOrNot");

            var ExistStatus = false;
            for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                    _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                    _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                    ExistStatus = true;
                    break;
                }
            }

            OneViewConsole.Debug("IsNCthereOrNot End", "CookingAndBlastChillingVerificationFacade.IsNCthereOrNot");
            return ExistStatus;
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            ExistStatus = null;
        }

    }

    var NormalizeNCEntityListData = function (DCNCMappingListData) {
        try {
            OneViewConsole.Debug("NormalizeNCEntityListData Start", "CookingAndBlastChillingVerificationFacade.NormalizeNCEntityListData");

            var _oDCNCMappingBO = new DCNCMappingBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
            for (var i = 0; i < DCNCMappingListData.length; i++) {

                //if rule is there in list or not _oDataCaptureBO.DCNCMappingList
                if (_oDataCaptureBO.DCNCMappingList.length > 0) {
                    var IsNCStatus = IsNCthereOrNot(DCNCMappingListData[i].NCRuleId, DCNCMappingListData[i].IsNC);
                    if (IsNCStatus == false) {
                        var NCMappingList = _oDCNCMappingBO.GetDCNCMapping(DCNCMappingListData[i].NCRuleId, DCNCMappingListData[i].IsNC);
                        _oDataCaptureBO.DCNCMappingList.push(NCMappingList);
                    }

                }
                else {
                    var NCMappingList = _oDCNCMappingBO.GetDCNCMapping(DCNCMappingListData[i].NCRuleId, DCNCMappingListData[i].IsNC);
                    _oDataCaptureBO.DCNCMappingList.push(NCMappingList);
                }

            }

            OneViewConsole.Debug("NormalizeNCEntityListData End", "CookingAndBlastChillingVerificationFacade.NormalizeNCEntityListData");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            _oDCNCMappingBO = null;
            IsNCStatus = null;
            NCMappingList = null;
        }
    }

    this.PreControlEvents = function (AttributeId, ControlId, $event) {
        try {

            _oDataCaptureBO.PreControlEvents(AttributeId, ControlId, $event);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.PreControlEvents", xlatService);
        }
    }
    this.PostControlEvents = function (AttributeId, ControlId) {
        try {

            _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.PostControlEvents", xlatService);
        }
    }

    this.ngChange_setDateTime = function (ControlId) {
        try {
            _oDataCaptureBO.ngChange_setDateTime(ControlId);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.ngChange_setDateTime", xlatService);
        }
    }



    this.NCClick = function ($compile) {

        try {
            _oDataCaptureBO.LoadNCCommentsHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.NgKeyUp", xlatService);
        }
        finally {
        }
    }

    this.NCTabClick = function ($compile) {

        try {
            _oDataCaptureBO.AppendNCHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.AppendNCHtml", xlatService);
        }
        finally {
        }
    }

    this.ObservationTabClick = function ($compile) {

        try {
            _oDataCaptureBO.AppendObservationHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.AppendObservationHtml", xlatService);
        }
        finally {
        }
    }

    this.CustomNCClick = function () {

        try {
            _oDataCaptureBO.CustomNCClick();
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.CustomNCClick", xlatService);
        }
        finally {
        }
    }

    this.CloseRightPanel = function () {

        try {
            var _oOneViewSidePanel = new OneViewSidePanel();

            _oOneViewSidePanel.Toggle(oSnapRemote);
            _oOneViewSidePanel.Clear();
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.CustomNCClick", xlatService);
        }
    }

    this.ClearReasons = function () {
        try {
            $scope.NewDCModel["NCComments"] = '';
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.ClearReasons", xlatService);
        }
    }

    this.ClearComments = function () {
        try {
            $scope.NewDCModel["ObservationComments"] = '';
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.ClearComments", xlatService);
        }
    }

    this.ProbeTesting = function () {
        try {
            var TempFromProbe = $scope.NewDCModel.txtTestTempControlId;
            //alert('TempFromProbe :' + TempFromProbe);
            var TemperatureInfo = { 'Temperature': TempFromProbe };

            //alert('_oDataCaptureBO.ModelIdForAutoTemperatureUpdation :' + _oDataCaptureBO.ModelIdForAutoTemperatureUpdation);
            var ControlId = _oDataCaptureBO.ModelIdForAutoTemperatureUpdation.split('.')[1];
            $scope.NewDCModel[ControlId] = TempFromProbe;

            //alert(' $scope.NewDCModel[ControlId]  :' + $scope.NewDCModel[ControlId]);

            _oDataCaptureBO.SetTemperature(TemperatureInfo);

        }
        catch (Excep) {
            // alert(JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "AircraftLoadingVerificationFacade.ProbeTesting", xlatService);
        }
    }

}


