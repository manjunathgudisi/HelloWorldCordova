
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
    
MyApp.controller('MonthlyVerificationofIRThermometerController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
    //oSetDefaultSpinner.Start();
        // xlatService.setCurrentPage('MonthlyVerificationofIRThermometer');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);

        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
	scope = $scope;
	oSnapRemote = snapRemote;


	var oYearlyVerificationFacade = new MonthlyVerificationofIRThermometerFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    oYearlyVerificationFacade.Init();
    oYearlyVerificationFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
  
    $scope.Signature = function () {
        oYearlyVerificationFacade.Signature();
    }

    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oYearlyVerificationFacade.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oYearlyVerificationFacade.Destroy();

        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oYearlyVerificationFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oYearlyVerificationFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oYearlyVerificationFacade.SetSelectedTextBoxColor(ControlId);
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
            navigator.notification.alert(xlatService.xlat('No_Records_Available'), ['OK'], "");
        }
    };

    $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
        oYearlyVerificationFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
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
        lastTimeOutId = $timeout(function () { oYearlyVerificationFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId); }, Timeout);
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
        oYearlyVerificationFacade.ClearForm();
    }
    $scope.$on('$destroy', function () {

        //oOneViewAppInfoPlugin.ClearCache();
        //$location.replace(); //clear last history route
        //$templateCache.removeAll();

        //  ClearGlobalVariable();
        scope = null;
        ionicBackdrop = null;
        oYearlyVerificationFacade = null;
        $scope = null;
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oYearlyVerificationFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oYearlyVerificationFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oYearlyVerificationFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oYearlyVerificationFacade.SaveDCRecords(true);
    }



    $scope.CustomNCClick = function () {
        oYearlyVerificationFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oYearlyVerificationFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oYearlyVerificationFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oYearlyVerificationFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oYearlyVerificationFacade.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oYearlyVerificationFacade.ProbeTesting();
    };
    $scope.ClearReasons = function () {
        oYearlyVerificationFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oYearlyVerificationFacade.ClearComments();
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

                //if (DecimalFormaterTimeOut != null)
                //    $timeout.cancel(DecimalFormaterTimeOut);
                //DecimalFormaterTimeOut = $timeout(function () {
                //    //alert(temp[1]);
                //    if (value != undefined && value != "" && value.indexOf('.') != -1) {
                //        var temp = value.split('.');
                //        if (temp[1] == undefined || temp[1] == "") {
                //            // alert('value case 2 : ' + value);
                //            value = value + "0";
                //        }
                //    }
                //    else if (value != undefined && value != "" && value.indexOf('.') == -1) {
                //        // alert('value case 3 : ' + value);
                //        value = value + ".0";
                //    }

                //    document.getElementById(ControlId).value = value;
                //    $scope.NewDCModel[ControlId] = value;
                //}, 2000);

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
        oYearlyVerificationFacade.ngChange_SetObservedvalueDifference(ControlId, CorrectionControlId, UnitofReferenceControlId, DifferenceValue);
    }

});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function MonthlyVerificationofIRThermometerFacade(parm) {

    try {
        OneViewConsole.Debug("YearlyVerificationFacade Start", "Facade.YearlyVerificationFacade");

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
        var IsFirstTimeEdit = false;

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

        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
      
      //  var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("YearlyVerificationFacade End", "Facade.YearlyVerificationFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.YearlyVerificationFacade", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "YearlyVerificationFacade.Init");

                    $scope.NewDCModel = {};
                    $scope.ShiftOptions = [];
                    $scope.NCOptions = [];
                    $scope.ThermometerStatuss = [];
                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                    $scope.DateOfVerificationShow = true;
                    $scope.ICECAPmethodShow = true;
                    $scope.ValidatorMethodShow = true;
                    scope.OtherhermometerStatusShow = false;


                OneViewConsole.Debug("Init End", "YearlyVerificationFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.Init", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "YearlyVerificationFacade.PageLoad");

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

                OneViewConsole.Debug("PageLoad End", "YearlyVerificationFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.PageLoad", xlatService);
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "YearlyVerificationFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "YearlyVerificationFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "YearlyVerificationFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'txtTempControlId') {
                    $scope.txtTempControlId = 'highlight';
                }

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "YearlyVerificationFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "YearlyVerificationFacade.BindNc");

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

                OneViewConsole.Debug("BindNc End", "YearlyVerificationFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "YearlyVerificationFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "YearlyVerificationFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "YearlyVerificationFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "YearlyVerificationFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "YearlyVerificationFacade.SaveDCRecords");

                    _oDataCaptureBO.CreateDynamicElementHandler = CreateDynamicElements;
                    if (DcId != null) {
                        var Status = _oDataCaptureBO.UpdateDC(DcId, undefined, _oDataCaptureBO.PreEditValues, IsSubmit);
                        if (Status != false) {
                            OneViewSessionStorage.Remove("DcId");
                            $location.url('/ViewRecords');
                        }
                    }
                    else {
                        var Status = _oDataCaptureBO.SaveDC(IsSubmit);
                        if (Status != false) {
                            $scope.DateOfVerificationShow = true;
                            $scope.ICECAPmethodShow = true;
                            $scope.ValidatorMethodShow = true;
                            scope.OtherhermometerStatusShow = false;
                            scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
                        }
                        else {
                            var ThermometerStatus = $scope["ChkThermometerStatusControlId"].GetSelectedText();
                            if (ThermometerStatus != "") {
                                if (ThermometerStatus == "Not Available" || ThermometerStatus == "Damage" || ThermometerStatus == "Lost") {
                                    $scope.DateOfVerificationShow = false;
                                    $scope.ICECAPmethodShow = false;
                                    $scope.ValidatorMethodShow = false;
                                    $scope.OtherhermometerStatusShow = false;
                                }
                                else if (ThermometerStatus == "Other") {
                                    $scope.DateOfVerificationShow = false;
                                    $scope.ICECAPmethodShow = false;
                                    $scope.ValidatorMethodShow = false;
                                    $scope.OtherhermometerStatusShow = true;
                                }
                              
                            }
                        }
                    }
                    _oDataCaptureBO.ShowDCSummary();
                    SetSelectedTextBoxColor_Private('txtTempControlId');

                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeCheckedControlId';
     
                OneViewConsole.Debug("SaveDCRecords End", "YearlyVerificationFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.SaveDCRecords", xlatService);
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
                OneViewConsole.Debug("Loadddl Start", "YearlyVerificationFacade.Loadddl");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;

                var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");
                var oDepartmentddl =
                    new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Units', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Kitchen, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 939, 'IsDynamicElementCreationEnabled': false, 'SelectedIndexChangedEventHandler': oUnitsSelectedIndexChanged });
                oDepartmentddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Kitchen, _TableNamesEnum.OrganizationAssetsNode);
               
                var oDepartment1ddl =
                 new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartment1ControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartment1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10357, 'IsDynamicElementCreationEnabled': false });
                //oDepartment1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyDepartment, _TableNamesEnum.OrganizationAssetsNode);

                //var oSectionddl =
                //  new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 741 });
                //oSectionddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);

                var oThermometerCodeddl =
                  new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlThermometerCodeControlId', 'DataSourceModelName': 'ThermometerCodes', 'DisplayElementModelName': 'NewDCModel.AddlThermometerCodeControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_IRThermometer, 'xlatService': xlatService, 'IsDynamicElementCreationEnabled': false, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 943 });
                
                oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtThermometerSerialNoControlId', ColumnNames: ['Column1'], Seperater: '-' });
                oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtThermometerModelNoControlId', ColumnNames: ['Column2'], Seperater: '-' });
                oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtSectionControlId', ColumnNames: ['Column3'], Seperater: '-' });
                oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtAllocationControlId', ColumnNames: ['Column4'], Seperater: '-' });


                //oThermometerCodeddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_IRThermometer, _TableNamesEnum.OrganizationAssetsNode);

             
                OneViewConsole.Debug("Loadddl End", "YearlyVerificationFacade.Loadddl");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oProductddl = null;
            }
        }
        
        var oUnitsSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("YearlyVerificationFacade Start", "YearlyVerificationFacade.oDepartmentSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    var oDepartment1ddl =
               new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartment1ControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartment1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10357, 'IsDynamicElementCreationEnabled': false });
                    oDepartment1ddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyDepartment, _TableNamesEnum.OrganizationAssetsNode);

                    var oThermometerCodeddl =
                  new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlThermometerCodeControlId', 'DataSourceModelName': 'ThermometerCodes', 'DisplayElementModelName': 'NewDCModel.AddlThermometerCodeControlId', 'IsDynamicElementCreationEnabled': false, 'DATEntityTypeId': DATEntityType.RCOMaster_IRThermometer, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 943 });
                    oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtThermometerSerialNoControlId', ColumnNames: ['Column1'], Seperater: '-' });
                    oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtThermometerModelNoControlId', ColumnNames: ['Column2'], Seperater: '-' });
                    oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtSectionControlId', ColumnNames: ['Column3'], Seperater: '-' });
                    oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtAllocationControlId', ColumnNames: ['Column4'], Seperater: '-' });

                    oThermometerCodeddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_IRThermometer, _TableNamesEnum.OrganizationAssetsNode);


                    if (DcId == null || IsFirstTimeEdit == false) {
                        // oSectionddl.Clear();      
                        $scope['AddlThermometerCodeControlId'].Clear();
                        $scope.NewDCModel['txtThermometerSerialNoControlId'] = "";
                        $scope.NewDCModel['txtThermometerModelNoControlId'] = "";
                        $scope.NewDCModel['txtSectionControlId'] = "";
                        $scope.NewDCModel['txtAllocationControlId'] = "";

                        $scope['AddlDepartment1ControlId'].Clear();
                    }
                }
                else {
                    var oThermometerCodeddl =
                    new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlThermometerCodeControlId', 'DataSourceModelName': 'ThermometerCodes', 'DisplayElementModelName': 'NewDCModel.AddlThermometerCodeControlId', 'IsDynamicElementCreationEnabled': false, 'DATEntityTypeId': DATEntityType.RCOMaster_IRThermometer, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 943 });
                    oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtThermometerSerialNoControlId', ColumnNames: ['Column1'], Seperater: '-' });
                    oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtThermometerModelNoControlId', ColumnNames: ['Column2'], Seperater: '-' });
                    oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtSectionControlId', ColumnNames: ['Column3'], Seperater: '-' });
                    oThermometerCodeddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtAllocationControlId', ColumnNames: ['Column4'], Seperater: '-' });

                    //oThermometerCodeddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_IRThermometer, _TableNamesEnum.OrganizationAssetsNode);
                    $scope['AddlThermometerCodeControlId'].Clear();
                    $scope.NewDCModel['txtThermometerSerialNoControlId'] = "";
                    $scope.NewDCModel['txtThermometerModelNoControlId'] = "";
                    $scope.NewDCModel['txtSectionControlId'] = "";
                    $scope.NewDCModel['txtAllocationControlId'] = "";
                }
                

                OneViewConsole.Debug("YearlyVerificationFacade End", "YearlyVerificationFacade.oDepartmentSelectedIndexChanged");
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
              
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "YearlyVerificationFacade.Temperature_NgKeyUp");

                ////if (IsNc == true) {
                //    var ActionResponseList = EvaluateActionNCStatus(AttributeId);
                //// }
                ValidateActionNC(AttributeId, ControlId)
                if (RefreshcontrolId != '') {
                    // var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                    _oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
                    if (RefreshAttributeId != undefined || RefreshAttributeId != '') {
                        ValidateActionNC(RefreshAttributeId, RefreshcontrolId)
                    }
                }

                NCSelectedAttributeId = AttributeId;
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                OneViewConsole.Debug("Temperature_NgKeyUp End", "YearlyVerificationFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.Temperature_NgKeyUp", xlatService);
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
                OneViewConsole.Debug("ValidateActionNC Start", "YearlyVerificationFacade.ValidateActionNC");
                var ActionResponseList = EvaluateActionNCStatus(AttributeId);

                if (ActionResponseList != undefined) {
                    if (ActionResponseList.length > 1) {
                        navigator.notification.alert(('More than one action for a single attribute : Not implemeneted'), ['OK'], "");
                    }
                    else {
                        for (var i = 0; i < ActionResponseList.length; i++) {
                            if ((ActionResponseList[i].IsFormAction == true || ActionResponseList[i].IsFormAction == 'true') && (ActionResponseList[i].IsRuleViolated == true || ActionResponseList[i].IsRuleViolated == 'true')) {
                                MyInstance.ShowNCFormAction(ControlId);
                            }
                        }
                    }
                }
                OneViewConsole.Debug("ValidateActionNC End", "YearlyVerificationFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "YearlyVerificationFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "YearlyVerificationFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "YearlyVerificationFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "YearlyVerificationFacade.EvaluateActionNCStatus");
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
                OneViewConsole.Debug("ShowNCFormAction Start", "YearlyVerificationFacade.ShowNCFormAction");



                OneViewConsole.Debug("ShowNCFormAction End", "YearlyVerificationFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.ShowNCFormAction", xlatService);
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
                OneViewConsole.Debug("LoadAnswerModes Start", "YearlyVerificationFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                var oThermometerStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkThermometerStatusControlId', 'DataSourceModelName': 'ThermometerStatuss', 'DisplayElementModelName': 'NewDCModel.ChkThermometerStatusControlId' });
                oThermometerStatus.AnswerModes(TemplateNodes, 10426);
                               
                var oNCOptions = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oNCOptions.LoadNCOptions();

                OneViewConsole.Debug("LoadAnswerModes End", "YearlyVerificationFacade.LoadAnswerModes");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oThermometerType = null;
                oFrequency = null;
            }
        }

        var CreateDynamicElements = function (_DcResultDetailsEntityLst) {
            try {

                OneViewConsole.Debug("CreateDynamicElements Start", "YearlyVerificationFacade.CreateDynamicElements");

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

                OneViewConsole.Debug("CreateDynamicElements End", "YearlyVerificationFacade.CreateDynamicElements");
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
                OneViewConsole.Debug("ClearForm Start", "YearlyVerificationFacade.ClearForm");

                _oDataCaptureBO.ClearControls();
                if (DcId != null) {
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                }
                else {
                    _oDataCaptureBO.setDefaultValue();
                }
                $scope.DateOfVerificationShow = true;
                $scope.ICECAPmethodShow = true;
                $scope.ValidatorMethodShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";

                OneViewConsole.Debug("ClearForm End", "YearlyVerificationFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "YearlyVerificationFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "YearlyVerificationFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "YearlyVerificationFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "YearlyVerificationFacade.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.PreControlEvents", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.ngChange_setDateTime", xlatService);
            }
        }


        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.ProbeTesting", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.ClearComments", xlatService);
            }
        }

        this.Destroy = function () {
            _oDataCaptureBO.Destroy();
        }

        this.SaveSignature = function (ControlId, signaturePad) {
            try {
                
                OneViewConsole.Debug("SaveSignature Start", "YearlyVerificationFacade.SaveSignature");
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

                OneViewConsole.Debug("SaveSignature End", "YearlyVerificationFacade.SaveSignature");
            }
            catch (Excep) {
                //alert('SaveSignature :' + Excep + "," + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.SaveSignature", xlatService);
            }
            finally {
                oDateTime = null;
                CurrenntDateAndTime = null;
            }
        }

        this.ClearSignature = function (ControlId) {
            try {
                OneViewConsole.Debug("ClearSignature Start", "YearlyVerificationFacade.ClearSignature");
               
                $scope[ControlId + '_IsModified'] = false;
                $scope[ControlId + '_SignaturePad'] = '';
                $scope.lblSignature = "";

                OneViewConsole.Debug("ClearSignature End", "YearlyVerificationFacade.ClearSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.ClearSignature", xlatService);
            }
        }

        this.Signature = function () {
            try {
                OneViewConsole.Debug("Signature Start", "YearlyVerificationFacade.Signature");

                $scope.DivNGForm = true;
                $scope.DivContent = false;
                $scope.DivSignature = true;

                $timeout(function () {
                    SignatureContent();
                }, 100);


                OneViewConsole.Debug("Signature End", "YearlyVerificationFacade.Signature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "YearlyVerificationFacade.Signature", xlatService);
            }
        }

        var SignatureContent = function () {
            try {
               
                OneViewConsole.Debug("SignatureContent Start", "YearlyVerificationFacade.SignatureContent");

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
                    MyInstance.ClearSignature('DCBoutNCSignature');
                });
               
                saveButton.addEventListener("click", function (event) {                  
                  //  alert(signaturePad.toDataURL().length);
                    if (signaturePad.isEmpty()) {
                        navigator.notification.alert("MN-RQ-NCF-001 :: Please provide signature first.", ['OK'], "");
                    } else {
                        MyInstance.SaveSignature('DCBoutNCSignature', signaturePad);
                    }


                });

                OneViewConsole.Debug("SignatureContent End", "YearlyVerificationFacade.SignatureContent");
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
           // try { 
           // alert('ngChange_SetObservedvalueDifference');
           // var oScope = $scope;
           // if ((oScope.NewDCModel['txtICEStandardValueControlId'] != undefined && oScope.NewDCModel['txtICEStandardValueControlId'] != "") && (oScope.NewDCModel['txtICEObservedValueControlId'] != undefined && oScope.NewDCModel['txtICEObservedValueControlId'] != "")) {
           //     oScope.NewDCModel['txtICEDeviationValueControlId'] = (oScope.NewDCModel['txtICEObservedValueControlId']) - (oScope.NewDCModel['txtICEStandardValueControlId']);
           // }
           // else {
           //     oScope.NewDCModel['txtICEDeviationValueControlId'] = "";
           // }
           //// var xx = 'if((oScope.NewDCModel["txtICEStandardValueControlId"] != undefined && oScope.NewDCModel["txtICEStandardValueControlId"] != "") && (oScope.NewDCModel["txtICEObservedValueControlId"] != undefined && oScope.NewDCModel["txtICEObservedValueControlId"] != "")) { return ((oScope.NewDCModel["txtICEObservedValueControlId"]) - (oScope.NewDCModel["txtICEStandardValueControlId"]) ) } else { return ""  } ';

           // var xx = '( (oScope.NewDCModel.txtICEStandardValueControlId != undefined && oScope.NewDCModel.txtICEStandardValueControlId != "") && (oScope.NewDCModel.txtICEObservedValueControlId != undefined && oScope.NewDCModel.txtICEObservedValueControlId != "")) ? ((oScope.NewDCModel.txtICEObservedValueControlId) - (oScope.NewDCModel.txtICEStandardValueControlId) ) : ""'
           // alert(eval(xx));
           
           // }
           // catch (Excep) {
           //     alert("Excep" + JSON.stringify(Excep))
           // }


            //var ObserverValue = 2;
            //var DifferenceValue = 7;

            //var s = (((ObserverValue - DifferenceValue) > .1 || (ObserverValue - DifferenceValue)) < -.1) ? "OOT" : "WT";
        }
}


