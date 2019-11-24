
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
    
MyApp.controller('CurrentStockofLaboratoryMediaController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
    //oSetDefaultSpinner.Start();
        // xlatService.setCurrentPage('CurrentStockofLaboratoryMedia');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);
        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
	scope = $scope;
	oSnapRemote = snapRemote;


	var oCurrentStockofLaboratoryMediaFacade = new CurrentStockofLaboratoryMediaFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    oCurrentStockofLaboratoryMediaFacade.Init();
    oCurrentStockofLaboratoryMediaFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
  
    $scope.Signature = function () {
        oCurrentStockofLaboratoryMediaFacade.Signature();
    }

    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oCurrentStockofLaboratoryMediaFacade.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oCurrentStockofLaboratoryMediaFacade.Destroy();
        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oCurrentStockofLaboratoryMediaFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oCurrentStockofLaboratoryMediaFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oCurrentStockofLaboratoryMediaFacade.SetSelectedTextBoxColor(ControlId);
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

    $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
        oCurrentStockofLaboratoryMediaFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
    };


    $scope.ShowNCStatus = function (AttributeId, ControlId) {
        $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
    }

    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {

        $scope.DisableSave = true;
        $scope.DisableSaveSubmit = true;
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oCurrentStockofLaboratoryMediaFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId); }, Timeout);
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
        oCurrentStockofLaboratoryMediaFacade.ClearForm();
    }
    $scope.$on('$destroy', function () {

        //oOneViewAppInfoPlugin.ClearCache();
        //$location.replace(); //clear last history route
        //$templateCache.removeAll();

        //  ClearGlobalVariable();
        scope = null;
        ionicBackdrop = null;
        oCurrentStockofLaboratoryMediaFacade = null;
        $scope = null;
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oCurrentStockofLaboratoryMediaFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oCurrentStockofLaboratoryMediaFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oCurrentStockofLaboratoryMediaFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oCurrentStockofLaboratoryMediaFacade.SaveDCRecords(true);
    }



    $scope.CustomNCClick = function () {
        oCurrentStockofLaboratoryMediaFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oCurrentStockofLaboratoryMediaFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oCurrentStockofLaboratoryMediaFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oCurrentStockofLaboratoryMediaFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oCurrentStockofLaboratoryMediaFacade.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oCurrentStockofLaboratoryMediaFacade.ProbeTesting();
    };
    $scope.ClearReasons = function () {
        oCurrentStockofLaboratoryMediaFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oCurrentStockofLaboratoryMediaFacade.ClearComments();
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

    $scope.ngChange_SetObservedvalueDifference = function (ControlId, CorrectionControlId, UnitofReferenceControlId, DifferenceValue) {
        oCurrentStockofLaboratoryMediaFacade.ngChange_SetObservedvalueDifference(ControlId, CorrectionControlId, UnitofReferenceControlId, DifferenceValue);
    }

});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function CurrentStockofLaboratoryMediaFacade(parm) {

    try {
        OneViewConsole.Debug("CurrentStockofLaboratoryMediaFacade Start", "Facade.CurrentStockofLaboratoryMediaFacade");

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
        var $timeout = parm.$timeout;
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
      
      //  var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("CurrentStockofLaboratoryMediaFacade End", "Facade.CurrentStockofLaboratoryMediaFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.CurrentStockofLaboratoryMediaFacade", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "CurrentStockofLaboratoryMediaFacade.Init");

                    $scope.NewDCModel = {};
                    // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];
                    $scope.Stocktypes = [];
                 
                    $scope.ShiftOptions = [];

                   
                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                OneViewConsole.Debug("Init End", "CurrentStockofLaboratoryMediaFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.Init", xlatService);
            }
        }

        this.ngChange_setIsManualFlag = function (ControlId) {
            try {
                OneViewConsole.Debug("ngChange_setIsManualFlag Start", "CookingAndBlastChillingMonitoringFacade.ngChange_setIsManualFlag");

                _oDataCaptureBO.setIsManualFlag(ControlId);

                OneViewConsole.Debug("ngChange_setIsManualFlag End", "CookingAndBlastChillingMonitoringFacade.ngChange_setIsManualFlag");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ngChange_setIsManualFlag", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "CurrentStockofLaboratoryMediaFacade.PageLoad");

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
                        IsFirstTimeEdit = true;
                        $scope.Add = 'Save';
                        _oDataCaptureBO.GetNCComments(DcId);
                        _oDataCaptureBO.LoadEditPage(DcId, $scope);
                        IsFirstTimeEdit = false;
                    }
                    else {
                        $scope.Add = 'Add';
                        _oDataCaptureBO.setDefaultValue();
                    }

                    ///AuditSummary
                    _oDataCaptureBO.ShowDCSummary();
                    _oSettingsBO.ShowAutoManualStatus($scope);

                    new OnewViewEventListener().RegisterSelectedFieldEvent();

                OneViewConsole.Debug("PageLoad End", "CurrentStockofLaboratoryMediaFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.PageLoad", xlatService);
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "CurrentStockofLaboratoryMediaFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "CurrentStockofLaboratoryMediaFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "CurrentStockofLaboratoryMediaFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'txtTempControlId') {
                    $scope.txtTempControlId = 'highlight';
                }

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "CurrentStockofLaboratoryMediaFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "CurrentStockofLaboratoryMediaFacade.BindNc");

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

                OneViewConsole.Debug("BindNc End", "CurrentStockofLaboratoryMediaFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "CurrentStockofLaboratoryMediaFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "CurrentStockofLaboratoryMediaFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "CurrentStockofLaboratoryMediaFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "CurrentStockofLaboratoryMediaFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "CurrentStockofLaboratoryMediaFacade.SaveDCRecords");

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
                    SetSelectedTextBoxColor_Private('txtTempControlId');

                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeCheckedControlId';
     
                OneViewConsole.Debug("SaveDCRecords End", "CurrentStockofLaboratoryMediaFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.SaveDCRecords", xlatService);
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
                OneViewConsole.Debug("Loadddl Start", "CurrentStockofLaboratoryMediaFacade.Loadddl");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;

                var oParameterddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlParameterControlId', 'DataSourceModelName': 'Parameters', 'DisplayElementModelName': 'NewDCModel.AddlParameterControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MediaParameter, 'xlatService': xlatService, 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'ToasterService': '', 'AttributeNodeId': 594, 'SelectedIndexChangedEventHandler': ParameterSelectedIndexChanged });
                oParameterddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MediaParameter, _TableNamesEnum.OrganizationAssetsNode);

                var oMediaorReagentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlMediaorReagentsControlId', 'DataSourceModelName': 'MediaorReagent', 'DisplayElementModelName': 'NewDCModel.AddlMediaorReagentsControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MediaReagents, 'MinCharToSearch': 0, 'xlatService': xlatService, 'IsDynamicElementCreationEnabled': false, 'ToasterService': '', 'AttributeNodeId': 595, 'SelectedIndexChangedEventHandler': MediaorReagentsSelectedIndexChanged });
                oMediaorReagentsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MediaReagents, _TableNamesEnum.OrganizationAssetsNode);

                var oBrandNameReagentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlBrandNameControlId', 'DataSourceModelName': 'BrandNames', 'DisplayElementModelName': 'NewDCModel.AddlBrandNameControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MediaBrandName, 'MinCharToSearch': 0, 'xlatService': xlatService, 'IsDynamicElementCreationEnabled': true, 'ToasterService': '', 'AttributeNodeId': 596 });
                oBrandNameReagentsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MediaBrandName, _TableNamesEnum.OrganizationAssetsNode);

                var oGlasswareddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlGlasswareControlId', 'DataSourceModelName': 'Glasswares', 'DisplayElementModelName': 'NewDCModel.AddlGlasswareControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Glassware, 'MinCharToSearch': 0, 'xlatService': xlatService, 'IsDynamicElementCreationEnabled': false, 'ToasterService': '', 'AttributeNodeId': 597 });
                oGlasswareddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Glassware, _TableNamesEnum.OrganizationAssetsNode);

                var oQuantityAvailableUnitddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlQuantityAvailableUnitControlId', 'DataSourceModelName': 'QuantityAvailableUnits', 'DisplayElementModelName': 'NewDCModel.AddlQuantityAvailableUnitControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MeasuringUnit, 'MinCharToSearch': 0, 'xlatService': xlatService, 'IsDynamicElementCreationEnabled': false, 'ToasterService': '', 'AttributeNodeId': 601 });
                oQuantityAvailableUnitddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MeasuringUnit, _TableNamesEnum.OrganizationAssetsNode);

                var oReorderlevelUnitddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlReorderlevelUnitControlId', 'DataSourceModelName': 'ReorderlevelUnits', 'DisplayElementModelName': 'NewDCModel.AddlReorderlevelUnitControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MeasuringUnit, 'xlatService': xlatService, 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'ToasterService': '', 'AttributeNodeId': 603 });
                oReorderlevelUnitddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MeasuringUnit, _TableNamesEnum.OrganizationAssetsNode);

                var oMinimumtoOrderUnitddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlMinimumtoOrderUnitControlId', 'DataSourceModelName': 'MinimumtoOrderUnits', 'DisplayElementModelName': 'NewDCModel.AddlMinimumtoOrderUnitControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MeasuringUnit, 'xlatService': xlatService, 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'ToasterService': '', 'AttributeNodeId': 605 });
                oMinimumtoOrderUnitddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MeasuringUnit, _TableNamesEnum.OrganizationAssetsNode);
               
                OneViewConsole.Debug("Loadddl End", "CurrentStockofLaboratoryMediaFacade.Loadddl");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oProductddl = null;
            }
        }

        var ParameterSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("ParameterSelectedIndexChanged Start", "CurrentStockofLaboratoryMediaFacade.ParameterSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    //var oSectionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 741 });

                    //oSectionddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);
                    var oMediaorReagentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlMediaorReagentsControlId', 'DataSourceModelName': 'MediaorReagent', 'DisplayElementModelName': 'NewDCModel.AddlMediaorReagentsControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MediaReagents, 'xlatService': xlatService, 'IsDynamicElementCreationEnabled': true, 'MinCharToSearch': 0, 'ToasterService': '', 'AttributeNodeId': 595 });
                    oMediaorReagentsddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MediaReagents, _TableNamesEnum.OrganizationAssetsNode);


                    if (DcId == null || IsFirstTimeEdit == false) {
                        // oSectionddl.Clear();      
                        $scope['AddlMediaorReagentsControlId'].Clear();
                        $scope['AddlBrandNameControlId'].Clear();
                    }
                }
                else {

                    var oMediaorReagentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlMediaorReagentsControlId', 'DataSourceModelName': 'MediaorReagent', 'DisplayElementModelName': 'NewDCModel.AddlMediaorReagentsControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MediaReagents, 'xlatService': xlatService, 'IsDynamicElementCreationEnabled': true, 'MinCharToSearch': 0, 'ToasterService': '', 'AttributeNodeId': 595 });
                    oMediaorReagentsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MediaReagents, _TableNamesEnum.OrganizationAssetsNode);
                }


                OneViewConsole.Debug("ParameterSelectedIndexChanged End", "CurrentStockofLaboratoryMediaFacade.ParameterSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }

        var MediaorReagentsSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("MediaorReagentsSelectedIndexChanged Start", "CurrentStockofLaboratoryMediaFacade.MediaorReagentsSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    var oBrandNameReagentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlBrandNameControlId', 'DataSourceModelName': 'BrandNames', 'DisplayElementModelName': 'NewDCModel.AddlBrandNameControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MediaBrandName, 'xlatService': xlatService, 'IsDynamicElementCreationEnabled': true, 'MinCharToSearch': 0, 'ToasterService': '', 'AttributeNodeId': 596 });
                    oBrandNameReagentsddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MediaBrandName, _TableNamesEnum.OrganizationAssetsNode);

                    if (DcId == null || IsFirstTimeEdit == false) {
                        // oSectionddl.Clear();      
                        $scope['AddlBrandNameControlId'].Clear();
                    }
                }
                else {

                    var oBrandNameReagentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlBrandNameControlId', 'DataSourceModelName': 'BrandNames', 'DisplayElementModelName': 'NewDCModel.AddlBrandNameControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MediaBrandName, 'xlatService': xlatService, 'IsDynamicElementCreationEnabled': true, 'MinCharToSearch': 0, 'ToasterService': '', 'AttributeNodeId': 596 });
                    oBrandNameReagentsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MediaBrandName, _TableNamesEnum.OrganizationAssetsNode);

                }


                OneViewConsole.Debug("MediaorReagentsSelectedIndexChanged End", "CurrentStockofLaboratoryMediaFacade.MediaorReagentsSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }

        this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
            try {

                OneViewConsole.Debug("Temperature_NgKeyUp Start", "CurrentStockofLaboratoryMediaFacade.Temperature_NgKeyUp");

                ////if (IsNc == true) {
                //    var ActionResponseList = EvaluateActionNCStatus(AttributeId);
                //// }
                ValidateActionNC(AttributeId, ControlId)
                if (RefreshcontrolId != '') {
                    // var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                   // _oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
                    if (RefreshAttributeId != undefined || RefreshAttributeId != '') {
                        ValidateActionNC(RefreshAttributeId, RefreshcontrolId)
                    }
                }

                NCSelectedAttributeId = AttributeId;
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                OneViewConsole.Debug("Temperature_NgKeyUp End", "CurrentStockofLaboratoryMediaFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.Temperature_NgKeyUp", xlatService);
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
                OneViewConsole.Debug("ValidateActionNC Start", "CurrentStockofLaboratoryMediaFacade.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "CurrentStockofLaboratoryMediaFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "CurrentStockofLaboratoryMediaFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "CurrentStockofLaboratoryMediaFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "CurrentStockofLaboratoryMediaFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "CurrentStockofLaboratoryMediaFacade.EvaluateActionNCStatus");
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
                OneViewConsole.Debug("ShowNCFormAction Start", "CurrentStockofLaboratoryMediaFacade.ShowNCFormAction");



                OneViewConsole.Debug("ShowNCFormAction End", "CurrentStockofLaboratoryMediaFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.ShowNCFormAction", xlatService);
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
                OneViewConsole.Debug("LoadAnswerModes Start", "CurrentStockofLaboratoryMediaFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                var oStocktype = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkStocktype', 'DataSourceModelName': 'Stocktypes', 'DisplayElementModelName': 'NewDCModel.chkStocktype' });
                oStocktype.AnswerModes(TemplateNodes, 593);
                           


                OneViewConsole.Debug("LoadAnswerModes End", "CurrentStockofLaboratoryMediaFacade.LoadAnswerModes");
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

                OneViewConsole.Debug("CreateDynamicElements Start", "CurrentStockofLaboratoryMediaFacade.CreateDynamicElements");

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

                OneViewConsole.Debug("CreateDynamicElements End", "CurrentStockofLaboratoryMediaFacade.CreateDynamicElements");
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

        this.ClearForm = function () {
            try {
                OneViewConsole.Debug("ClearForm Start", "CurrentStockofLaboratoryMediaFacade.ClearForm");

                _oDataCaptureBO.ClearControls();
                if (DcId != null) {
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                }
                else {
                    _oDataCaptureBO.setDefaultValue();
                }

                OneViewConsole.Debug("ClearForm End", "CurrentStockofLaboratoryMediaFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "CurrentStockofLaboratoryMediaFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "CurrentStockofLaboratoryMediaFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "CurrentStockofLaboratoryMediaFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "CurrentStockofLaboratoryMediaFacade.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.PreControlEvents", xlatService);
            }
        }

        this.ngChange_setDateTime = function (ControlId) {
            try {
                var oDateTime = new DateTime();
                var time = document.getElementById(ControlId).value;               
                if ($scope[ControlId + "_DateTime"] != null && $scope[ControlId + "_DateTime"] != '') {
                    $scope[ControlId + "_DateTime"] = $scope[ControlId + "_DateTime"].split(' ')[0] + " " + time;
                }
                else {                 
                    $scope[ControlId + "_DateTime"] = oDateTime.GetDate() + " " + time;
                }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.ngChange_setDateTime", xlatService);
            }
        }


        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.ProbeTesting", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.ClearComments", xlatService);
            }
        }

        this.Destroy = function () {
            _oDataCaptureBO.Destroy();
        }

        this.SaveSignature = function (ControlId, signaturePad) {
            try {
                
                OneViewConsole.Debug("SaveSignature Start", "CurrentStockofLaboratoryMediaFacade.SaveSignature");
                $scope[ControlId + '_IsModified'] = true;

                $scope[ControlId + '_SignaturePad'] = signaturePad.toDataURL();//signaturePad
                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();
                $scope.lblSignature = "Signed " + CurrenntDateAndTime;
                $scope.DivNGForm = true;
                $scope.DivContent = false;
                $scope.DivSignature = false;
                $scope.$apply();
                //document.getElementById("lblSignature").value = "Signed" + CurrenntDateAndTime;
                //var canvas = document.getElementById('divSignature');
                //var context = canvas.getContext('2d');
                //var imageObj = new Image();
                //imageObj.onload = function () {
                //    context.drawImage(this, 0, 0);
                //};

                //imageObj.src = signaturePad.toDataURL();
                //  $ionicSlideBoxDelegate.previous();

                // alert('ss :' + $scope[ControlId + '_SignaturePad'].toDataURL().length);

                OneViewConsole.Debug("SaveSignature End", "CurrentStockofLaboratoryMediaFacade.SaveSignature");
            }
            catch (Excep) {
                //alert('SaveSignature :' + Excep + "," + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.SaveSignature", xlatService);
            }
            finally {
                oDateTime = null;
                CurrenntDateAndTime = null;
            }
        }

        this.ClearSignature = function (ControlId) {
            try {
                OneViewConsole.Debug("ClearSignature Start", "CurrentStockofLaboratoryMediaFacade.ClearSignature");               
                $scope[ControlId + '_IsModified'] = false;
                $scope[ControlId + '_SignaturePad'] = '';
                $scope.lblSignature = "";

                OneViewConsole.Debug("ClearSignature End", "CurrentStockofLaboratoryMediaFacade.ClearSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.ClearSignature", xlatService);
            }
        }

        this.Signature = function () {
            try {
                OneViewConsole.Debug("Signature Start", "CurrentStockofLaboratoryMediaFacade.Signature");

                $scope.DivNGForm = true;
                $scope.DivContent = false;
                $scope.DivSignature = true;

                $timeout(function () {
                    SignatureContent();
                }, 100);


                OneViewConsole.Debug("Signature End", "CurrentStockofLaboratoryMediaFacade.Signature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.Signature", xlatService);
            }
        }

        var SignatureContent = function () {
            try {
               
                OneViewConsole.Debug("SignatureContent Start", "CurrentStockofLaboratoryMediaFacade.SignatureContent");

                var wrapper = document.getElementById("SignaturePad"),
                             clearButton = wrapper.querySelector("[data-action=clear]"),
                             saveButton = wrapper.querySelector("[data-action=save]"),
                             canvas = wrapper.querySelector("canvas"),
                             signaturePad;

                // Adjust canvas coordinate space taking into account pixel ratio,
                // to make it look crisp on mobile devices.
                // This also causes canvas to be cleared.
                function resizeCanvas() {
                    var ratio = window.devicePixelRatio || 1;
                    canvas.width = canvas.offsetWidth * ratio;
                    canvas.height = canvas.offsetHeight * ratio;
                    canvas.getContext("2d").scale(ratio, ratio);
                }

                window.onresize = resizeCanvas;
                resizeCanvas();
                //clearButton.removeEventListener('click', function (event) {
                //    signaturePad.clear();
                //    MyInstance.ClearSignature('DCBoutNCSignature');
                //}, false);

                //saveButton.removeEventListener('click', function (event) {
                //    signaturePad.clear();
                //    MyInstance.ClearSignature('DCBoutNCSignature');
                //}, false);

                signaturePad = new SignaturePad(canvas);

               
                clearButton.addEventListener("click", function (event) {
                   
                    signaturePad.clear();
                    MyInstance.ClearSignature('DCSignature');
                });
               
                saveButton.addEventListener("click", function (event) {                  
                  //  alert(signaturePad.toDataURL().length);
                    if (signaturePad.isEmpty()) {
                        alert("MN-RQ-NCF-001 :: Please provide signature first.");
                    } else {
                        MyInstance.SaveSignature('DCSignature', signaturePad);
                    }


                });

                OneViewConsole.Debug("SignatureContent End", "CurrentStockofLaboratoryMediaFacade.SignatureContent");
            }
            catch (Excep) {
                // alert('SignatureContent :' + Excep + "," + JSON.stringify(Excep));
                throw Excep;
            }
            finally {
                wrapper = null;
            }
        }

        this.ngChange_SetObservedvalueDifference = function (ControlId, CorrectionControlId, UnitofReferenceControlId, DifferenceValue) {
            try {
                if (($scope.NewDCModel[ControlId] != "" && $scope.NewDCModel[ControlId] != undefined)) {
                    var ObservedvalueDifference = ((parseFloat($scope.NewDCModel[ControlId])) - (parseFloat(DifferenceValue)));
                    var Result = ObservedvalueDifference.toFixed(2);
                    $scope.NewDCModel[CorrectionControlId] = Result;
                    if ((Result > .1) || (Result < -.1)) {
                        $scope.NewDCModel[UnitofReferenceControlId] = "OOT";
                    }
                    else {
                        $scope.NewDCModel[UnitofReferenceControlId] = " WT";
                    }
                }
                else {
                    $scope.NewDCModel[CorrectionControlId] = "";
                    $scope.NewDCModel[UnitofReferenceControlId] = "";
                }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CurrentStockofLaboratoryMediaFacade.ngChange_SetObservedvalueDifference", xlatService);
            }
        }
}


