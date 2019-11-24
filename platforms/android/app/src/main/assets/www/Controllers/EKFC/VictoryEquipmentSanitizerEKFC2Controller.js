
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
    
MyApp.controller('VictoryEquipmentSanitizerEKFC2Controller',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
        //oSetDefaultSpinner.Start();
       
        // xlatService.setCurrentPage('SanitizationVerification');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);
        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
	scope = $scope;
	oSnapRemote = snapRemote;


	var oVictoryEquipmentSanitizerEKFC2ControllerFacade = new VictoryEquipmentSanitizerEKFC2ControllerFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    oVictoryEquipmentSanitizerEKFC2ControllerFacade.Init();
    oVictoryEquipmentSanitizerEKFC2ControllerFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
  
    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();

        _oDataCaptureBO.TemperatureNgKeyUpEventHandler = null;
        _oDataCaptureBO.Destroy();

        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.SetSelectedTextBoxColor(ControlId);
    };

    $scope.ViewRecords = function () {
        var _oDcDAO = new DcDAO();
        var TotalDcCount = _oDcDAO.GetTotalAuditCount(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("TemplateId"), OneViewSessionStorage.Get("DcPlaceId"), OneViewSessionStorage.Get("DcPlaceName"));

        if (TotalDcCount > 0) {
            scope = null;
            ionicBackdrop = null;
            OneViewSessionStorage.Remove("NCInlineEdit");
            OneViewSessionStorage.Remove("MyAuditEditForm");
            $location.url('/ViewRecords');
        }
        else {
            //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('No_Records_Available'));
            alert(xlatService.xlat('No_Records_Available'));
        }
    };

    	//$scope.activate = function(option){
    	//    alert(option.Name);
    	//};  

    $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
    };

    ////$scope.GoodsType =
    ////   {
    ////       "Chilled": false,
    ////       "Frozen": false,
    ////       "Dry": false
    ////   };

    ////$scope.FrozenType = {
    ////    "Hard": false,
    ////    "soft": false,
    ////    "thawing": false
    ////}


    $scope.ShowNCStatus = function (AttributeId, ControlId) {
        $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
    }
    ////$scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
    ////    oVictoryEquipmentSanitizerEKFC2ControllerFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc);
        ////}

    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {

        $scope.DisableSave = true;
        $scope.DisableSaveSubmit = true;
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oVictoryEquipmentSanitizerEKFC2ControllerFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId); }, Timeout);
    }

    $scope.Back = function () {
            scope = null;
            ionicBackdrop = null;
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
            else {
                $location.url('/newdc');
            }
        }
    $scope.toggle = false;

    $scope.ClearForm = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.ClearForm();
    }
    $scope.$on('$destroy', function () {

        //oOneViewAppInfoPlugin.ClearCache();
        //$location.replace(); //clear last history route
        //$templateCache.removeAll();

        //  ClearGlobalVariable();
        scope = null;
        ionicBackdrop = null;
        oVictoryEquipmentSanitizerEKFC2ControllerFacade = null;
        $scope = null;
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oVictoryEquipmentSanitizerEKFC2ControllerFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.SaveDCRecords(true);
    }



    $scope.CustomNCClick = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.ProbeTesting();
    };
        
    $scope.ClearReasons = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oVictoryEquipmentSanitizerEKFC2ControllerFacade.ClearComments();
    }

    var DecimalFormaterTimeOut = null;
    $scope.MakeDecimalControl = function (ControlId, Format) {

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
        if (Format != undefined) {
            if (Format == '#.#') {
                if (value != undefined && value != "" && value.indexOf('.') != -1) {
                    var temp = value.split('.');
                    if (temp[1].length > 1) {
                        value = value.substring(0, value.length - 1);
                    }
                    if (temp[0].length == 0) {
                        value = "0" + value;
                    }
                    if (temp[0].length == 1) {
                        if (temp[0] == "-") {
                            value = temp[0] + "0." + temp[1];
                        }
                    }

                }


            }
            else if (Format == '#.##') {
                if (value != undefined && value != "" && value.indexOf('.') != -1) {
                    var temp = value.split('.');
                    if (temp[1].length > 2) {
                        value = value.substring(0, value.length - 1);
                    }
                    if (temp[0].length == 0) {
                        value = "0" + value;
                    }
                    if (temp[0].length == 1) {
                        if (temp[0] == "-") {
                            value = temp[0] + "0." + temp[1];
                        }
                    }

                }

            }
        }
        value = value.trim();


        //arg.value = value;
        document.getElementById(ControlId).value = value;
        $scope.NewDCModel[ControlId] = value;
        //scope.$apply();
    }
});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function VictoryEquipmentSanitizerEKFC2ControllerFacade(parm) {

    try {
        OneViewConsole.Debug("VictoryEquipmentSanitizerEKFC2ControllerFacade Start", "Facade.VictoryEquipmentSanitizerEKFC2ControllerFacade");

        var MyInstance = this;
        //$scope, $document, $state, xlatService, toaster, SpinService
        var $scope = parm.scope;
        var $document = parm.document;
        var $location = parm.Mylocation;
        var xlatService = parm.xlatService;
        var $compile = parm.compile;
        var toaster = '';
        var SpinService = '';
        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        var TemplateId = OneViewSessionStorage.Get("TemplateId");
        var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];

        //*********** basic meta datas for Cooking and blast chilling varifications
        var $timeout = parm.$timeout
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
        var EKFC2NodeId = 4;

        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
      
      //  var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("VictoryEquipmentSanitizerEKFC2ControllerFacade End", "Facade.VictoryEquipmentSanitizerEKFC2ControllerFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.VictoryEquipmentSanitizerEKFC2ControllerFacade", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.Init");

                    $scope.NewDCModel = {};
                    // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];
                  
              
                    $scope.ShiftOptions = [];

                    $scope.NCOptions = [];
                    $scope.ThermoLabels = [];

                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                    OneViewConsole.Debug("Init End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.Init", xlatService);
            }
        }

        this.ngChange_setIsManualFlag = function (ControlId) {
            try {
                OneViewConsole.Debug("ngChange_setIsManualFlag Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.ngChange_setIsManualFlag");

                _oDataCaptureBO.setIsManualFlag(ControlId);

                OneViewConsole.Debug("ngChange_setIsManualFlag End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.ngChange_setIsManualFlag");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.ngChange_setIsManualFlag", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.PageLoad");

                    AutoCompleteGenerateHTML();
                    Loadddl();
                    LoadDefaultValueMetaData();
                    _oDataCaptureBO.LoadShift();
                    LoadAnswerModes();
                    _oDataCaptureBO.ClearControls();
                    _oDataCaptureBO.SetMandatoryMetaData();

                   // todo : check with pallav and solve document,getelementbyid page load issue
                    _oDataCaptureBO.SetControlEnableStatus();

                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeCheckedControlId';
                   // _oNCComponent.Init();
                    _oCPActionNCComponent.Init();

                    SetSelectedTextBoxColor_Private('txtTempControlId');

                   // _oNCComponent.BindNCSummaryHandler = BindNc;
                    _oDataCaptureBO.SetDefaultAutoTemperatureListener();
                
                    if (DcId != null) {
                        $scope.Add = 'Save';
                        _oDataCaptureBO.GetNCComments(DcId);
                        _oDataCaptureBO.LoadEditPage(DcId, $scope);
                    }
                    else {
                        $scope.Add = 'Add';
                        _oDataCaptureBO.setDefaultValue();
                    }

                    ///AuditSummary
                    _oDataCaptureBO.ShowDCSummary();
                    _oSettingsBO.ShowAutoManualStatus($scope);

                    new OnewViewEventListener().RegisterSelectedFieldEvent();

                    OneViewConsole.Debug("PageLoad End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.PageLoad", xlatService);
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'txtTempControlId') {
                    $scope.txtTempControlId = 'highlight';
                }

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.BindNc");

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

                    OneViewConsole.Debug("BindNc End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.SaveDCRecords");
              
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
                  //  SetSelectedTextBoxColor_Private('txtTempControlId');

                   // _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtTempControlId';
                  //  _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeCheckedControlId';
     
                OneViewConsole.Debug("SaveDCRecords End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.SaveDCRecords", xlatService);
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
                OneViewConsole.Debug("Loadddl Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.Loadddl");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;
                
                var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Location', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_VictorySanitizerLocations, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 11602 });
                oLocationddl.SetDataSourceFromTreeChildsWithType(EKFC2NodeId, DATEntityType.RCOMaster_VictorySanitizerLocations, _TableNamesEnum.OrganizationAssetsNode);
               
                OneViewConsole.Debug("Loadddl End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.Loadddl");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oProductddl = null;
            }
        }

        this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
            try {
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.Temperature_NgKeyUp");

                
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
                                _oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
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
                OneViewConsole.Debug("Temperature_NgKeyUp End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.Temperature_NgKeyUp", xlatService);
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
                OneViewConsole.Debug("ValidateActionNC Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.EvaluateActionNCStatus");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                DCNCMappingListData = null;
            }
        }

        this.ShowNCFormAction = function (ControlId) {
            try {
                OneViewConsole.Debug("ShowNCFormAction Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.ShowNCFormAction");

                //var TempOutNCTemplate = TemplateMetaData[ServiceId][NCTemplateDetails.TemplateId];
                //var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': NCTemplateDetails.TemplateId, 'TemplateName': NCTemplateDetails.TemplateName });
                ////Edit case
                //if (DcId != null) {

                //}
                //    //Save case
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



                OneViewConsole.Debug("ShowNCFormAction End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.ShowNCFormAction", xlatService);
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
                // alert('NCAutocompleteEvent OnAnswerModeSelect hi here');
                //alert('option :' + JSON.stringify(option));
                //alert('chkTruckCleanliness: ' + $scope["chkTruckCleanliness"].GetSelectedValue() + "," + $scope["chkTruckCleanliness"].GetSelectedText());

                MyInstance.Temperature_NgKeyUp(option.AttributeNodeId, option.ControlId, '');

            }
            catch (Excep) {
                //alert('Excep OnAnswerModeSelect :' + Excep + JSON.stringify(Excep))
                throw Excep;
            }
        }

        var LoadAnswerModes = function () {
            try {
                OneViewConsole.Debug("LoadAnswerModes Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                var oThermometerStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkThermoLabelControlId', 'DataSourceModelName': 'ThermoLabels', 'DisplayElementModelName': 'NewDCModel.chkThermoLabelControlId' });
                oThermometerStatus.AnswerModes(TemplateNodes, 11606);

                var oProductStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oProductStatus.LoadNCOptions();

                OneViewConsole.Debug("LoadAnswerModes End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.LoadAnswerModes");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oProductCategory = null;
                oThawingComplete = null;
            }
        }

        var CreateDynamicElements = function (_DcResultDetailsEntityLst) {
            try {

                OneViewConsole.Debug("CreateDynamicElements Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.CreateDynamicElements");

                var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");
                for (var i = 0; i < _DcResultDetailsEntityLst.length; i++) {
                    if (_DcResultDetailsEntityLst[i].IsDynamicAnswer == 'true') {
                        var ParentNodeId = DCPlaceNodeId;
                        var ParentDbElementType = DATEntityType.RCOMaster_Kitchen;
                        var ParentDbElementId = "0";                     
                        
                        //add into Maaster and node
                        var oDefaultTreeDAO = new DefaultTreeDAO();
                        var ParentDbElement = oDefaultTreeDAO.GetNodeById(ParentNodeId, 'OrganizationAssetsNode');
                        ParentDbElementId = ParentDbElement[0].ChildDbElementId;
                        ////var LabelId = 1;
                        var _oDynamicElementBO = new DynamicElementBO();
                        var Response = _oDynamicElementBO.AddDynamicRCO(_DcResultDetailsEntityLst[i], ParentNodeId, ParentDbElementType, ParentDbElementId);

                        //Update Answer with newly created node
                        _DcResultDetailsEntityLst[i].Answer = Response.NodeClientGuid;

                    }
                }

                OneViewConsole.Debug("CreateDynamicElements End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.CreateDynamicElements");
            }
            catch (Excep) {
                ////alert('Thawing CreateDynamicElements Excep' + JSON.stringify(Excep));
                throw Excep;
            }
            finally {
                DCPlaceNodeId = null;
                ParentNodeId = null;
                ParentDbElementType = null;
                ParentDbElementId = null;
                oDefaultTreeDAO = null;
                ParentDbElement = null;
                LabelId = null;
                _oDynamicElementBO = null;
                Response = null;
            }
        }

        this.Temperature_NgKeyUpOLD = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
            try {
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.Temperature_NgKeyUp");

                if (IsNc == true) {
                    ShowNCStatus(AttributeId, ControlId);
                }

                var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var ShowNCStatusOLD = function (AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.ShowNCStatus");

                var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
                NormalizeNCEntityListData(DCNCMappingListData);

                OneViewConsole.Debug("ShowNCStatus End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.ShowNCStatus");
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
                OneViewConsole.Debug("ClearForm Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.ClearForm");

                _oDataCaptureBO.ClearControls();
                if (DcId != null) {
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                }
                else {
                    _oDataCaptureBO.setDefaultValue();
                }

                OneViewConsole.Debug("ClearForm End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "VictoryEquipmentSanitizerEKFC2ControllerFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "VictoryEquipmentSanitizerEKFC2ControllerFacade.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.PreControlEvents", xlatService);
            }
        }

        this.ngChange_setDateTime = function (ControlId) {
            try {
                _oDataCaptureBO.ngChange_setDateTime(ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.ngChange_setDateTime", xlatService);
            }
        }



        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.CustomNCClick", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "VictoryEquipmentSanitizerEKFC2ControllerFacade.ClearReasons", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ProbeTesting", xlatService);
            }
        }


}


