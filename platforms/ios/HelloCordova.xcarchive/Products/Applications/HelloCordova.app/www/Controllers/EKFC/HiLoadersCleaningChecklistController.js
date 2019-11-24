
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
    
MyApp.controller('HiLoadersCleaningChecklistController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
    //oSetDefaultSpinner.Start();
        //xlatService.setCurrentPage('ChillerFreezerChecking');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);

        var PageName = xlatService.xlat('PageTitle');

        //if (OneViewSessionStorage.Get("DcPlaceId") == 3) {
        //    PageName = xlatService.xlat('PageTitle');
        //}
        //else {
        //    PageName = xlatService.xlat('PageTitleUnit2');
        //}
        document.getElementById('PageTitle').innerHTML = PageName;
     
	scope = $scope;
	oSnapRemote = snapRemote;


	var oHiLoadersCleaningChecklistFacade = new HiLoadersCleaningChecklistFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    oHiLoadersCleaningChecklistFacade.Init();
    oHiLoadersCleaningChecklistFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
  
    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oHiLoadersCleaningChecklistFacade.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oHiLoadersCleaningChecklistFacade.Destroy();

        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oHiLoadersCleaningChecklistFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oHiLoadersCleaningChecklistFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oHiLoadersCleaningChecklistFacade.SetSelectedTextBoxColor(ControlId);
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
            alert(xlatService.xlat('Title_Notification') + ': ' + xlatService.xlat('No_Records_Available'));
        }
    };

    $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
        oHiLoadersCleaningChecklistFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
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
        lastTimeOutId = $timeout(function () { oHiLoadersCleaningChecklistFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, Timeout);
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
        oHiLoadersCleaningChecklistFacade.ClearForm();
    }
    $scope.$on('$destroy', function () {

        //oOneViewAppInfoPlugin.ClearCache();
        //$location.replace(); //clear last history route
        //$templateCache.removeAll();

        //  ClearGlobalVariable();
        scope = null;
        ionicBackdrop = null;
        oHiLoadersCleaningChecklistFacade = null;
        $scope = null;
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oHiLoadersCleaningChecklistFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oHiLoadersCleaningChecklistFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oHiLoadersCleaningChecklistFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oHiLoadersCleaningChecklistFacade.SaveDCRecords(true);
    }



    $scope.CustomNCClick = function () {
        oHiLoadersCleaningChecklistFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oHiLoadersCleaningChecklistFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oHiLoadersCleaningChecklistFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oHiLoadersCleaningChecklistFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oHiLoadersCleaningChecklistFacade.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oHiLoadersCleaningChecklistFacade.ProbeTesting();
    };
    $scope.ClearReasons = function () {
        oHiLoadersCleaningChecklistFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oHiLoadersCleaningChecklistFacade.ClearComments();
    }

    $scope.MakeDecimalControlOLD = function (ControlId) {

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

        //arg.value = value;
        document.getElementById(ControlId).value = value;
        $scope.NewDCModel[ControlId] = value;
        //scope.$apply();
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
        }
        value = value.trim();


        //arg.value = value;
        document.getElementById(ControlId).value = value;
        $scope.NewDCModel[ControlId] = value;
        //scope.$apply();
    }
    
    $scope.MakeNumericControl = function (ControlId) {

        //var value = arg.value;
        var value = document.getElementById(ControlId).value;
        value = value.replace(/\s/g, '');
        value = value.replace(/[^ 0-9]/g, '');
        if (value.split(".").length - 1 > 1) {
            value = value.substring(0, value.length - 1);
        }
        value = value.trim();

        //arg.value = value;
        document.getElementById(ControlId).value = value;
        $scope.NewDCModel[ControlId] = value;
        //scope.$apply();
    }

    $scope.ngChange_setVariationTemp = function () {
        oHiLoadersCleaningChecklistFacade.ngChange_setVariationTemp();
    }
});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function HiLoadersCleaningChecklistFacade(parm) {

    try {
        OneViewConsole.Debug("HiLoadersCleaningChecklistFacade Start", "Facade.ChillerFreezerCheckingFacade");

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
      //  alert(JSON.stringify(TemplateNodes));
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
      
      //  var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("HiLoadersCleaningChecklistFacade End", "Facade.ChillerFreezerCheckingFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.HiLoadersCleaningChecklistFacade", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "HiLoadersCleaningChecklistFacade.Init");

                    $scope.NewDCModel = {};
                    // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];
                   
                    $scope.HiLoadersCleaned = [];
                    $scope.IceBinsSanitized = [];

                    $scope.ShiftOptions = [];

                    $scope.NCOptions = [];
                   
                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                OneViewConsole.Debug("Init End", "HiLoadersCleaningChecklistFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.Init", xlatService);
            }
        }

        this.ngChange_setIsManualFlag = function (ControlId) {
            try {
                OneViewConsole.Debug("ngChange_setIsManualFlag Start", "ChillerFreezerCheckingFacade.ngChange_setIsManualFlag");

                _oDataCaptureBO.setIsManualFlag(ControlId);

                OneViewConsole.Debug("ngChange_setIsManualFlag End", "ChillerFreezerCheckingFacade.ngChange_setIsManualFlag");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ChillerFreezerCheckingFacade.ngChange_setIsManualFlag", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "HiLoadersCleaningChecklistFacade.PageLoad");
                
                    AutoCompleteGenerateHTML();
                    //Loadddl();
                    $scope.MachineChiller = false;
                    $scope.MachineFreezer = false;
                    LoadDefaultValueMetaData();
                    _oDataCaptureBO.LoadShift();
                     LoadAnswerModes();
                    _oDataCaptureBO.ClearControls();
                    _oDataCaptureBO.SetMandatoryMetaData();

                   // todo : check with pallav and solve document,getelementbyid page load issue
                    _oDataCaptureBO.SetControlEnableStatus();

                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.ATAirProbeTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTStartingTimeInControlId';
                   // _oNCComponent.Init();
                    _oCPActionNCComponent.Init();
                    

                    SetSelectedTextBoxColor_Private('ATAirProbeTempControlId');

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
                   
                OneViewConsole.Debug("PageLoad End", "HiLoadersCleaningChecklistFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.PageLoad", xlatService);
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "HiLoadersCleaningChecklistFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "HiLoadersCleaningChecklistFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "HiLoadersCleaningChecklistFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'ATGaugeTempControlId') {
                    $scope.ATGaugeTempControlId = 'highlight';
                    $scope.ATAirProbeTempControlId = '';
                    $scope.ATVariationinTempControlId = '';
                }

                else if (ControlId == 'ATAirProbeTempControlId') {
                    $scope.ATGaugeTempControlId = '';
                    $scope.ATAirProbeTempControlId = 'highlight';
                    $scope.ATVariationinTempControlId = '';
                }

                else if (ControlId == 'ATVariationinTempControlId') {
                    $scope.ATGaugeTempControlId = '';
                    $scope.ATAirProbeTempControlId = '';
                    $scope.ATVariationinTempControlId = 'highlight';
                }

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "HiLoadersCleaningChecklistFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "HiLoadersCleaningChecklistFacade.BindNc");

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

                OneViewConsole.Debug("BindNc End", "HiLoadersCleaningChecklistFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "HiLoadersCleaningChecklistFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "HiLoadersCleaningChecklistFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "HiLoadersCleaningChecklistFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "HiLoadersCleaningChecklistFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "HiLoadersCleaningChecklistFacade.SaveDCRecords");

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
     
                OneViewConsole.Debug("SaveDCRecords End", "HiLoadersCleaningChecklistFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.SaveDCRecords", xlatService);
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

                OneViewConsole.Debug("Loadddl Start", "HiLoadersCleaningChecklistFacade.Loadddl");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;
                
                var oHiLoaderNoddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlHiLoaderNoControlId', 'DataSourceModelName': 'HiLoaderNos', 'DisplayElementModelName': 'NewDCModel.AddlHiLoaderNoControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Hiloadernumber, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10325, 'IsDynamicElementCreationEnabled': true });
                oHiLoaderNoddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Hiloadernumber, _TableNamesEnum.OrganizationAssetsNode);

                var oBayNumberddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlBayNumberControlId', 'DataSourceModelName': 'BayNumber', 'DisplayElementModelName': 'NewDCModel.AddlBayNumberControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Baynumber, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10326, 'IsDynamicElementCreationEnabled': true });
                oBayNumberddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Baynumber, _TableNamesEnum.OrganizationAssetsNode);

                var oGeneralAssistant1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtGenAsstNo1ControlId', 'DataSourceModelName': 'GeneralAssistant1', 'DisplayElementModelName': 'NewDCModel.txtGenAsstNo1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_GeneralAssistant, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10328, 'IsDynamicElementCreationEnabled': true });
                oGeneralAssistant1ddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_GeneralAssistant, _TableNamesEnum.OrganizationAssetsNode);

                var oGeneralAssistant2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtGenAsstNo2ControlId', 'DataSourceModelName': 'GeneralAssistant2', 'DisplayElementModelName': 'NewDCModel.txtGenAsstNo2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_GeneralAssistant, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10329, 'IsDynamicElementCreationEnabled': true });
                oGeneralAssistant2ddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_GeneralAssistant, _TableNamesEnum.OrganizationAssetsNode);

                var oGeneralAssistant3ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtGenAsstNo3ControlId', 'DataSourceModelName': 'GeneralAssistant3', 'DisplayElementModelName': 'NewDCModel.txtGenAsstNo3ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_GeneralAssistant, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10330, 'IsDynamicElementCreationEnabled': true });
                oGeneralAssistant3ddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_GeneralAssistant, _TableNamesEnum.OrganizationAssetsNode);

                OneViewConsole.Debug("Loadddl End", "HiLoadersCleaningChecklistFacade.Loadddl");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oProductddl = null;
            }
        }
        
        var oDepartmentSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oDepartmentSelectedIndexChanged Start", "HiLoadersCleaningChecklistFacade.oDepartmentSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {
                    var oSectionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'AttributeNodeId': 524, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });
                    //oSectionddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);
                    oSectionddl.SetDataSourceFromTreeChildsWithLeafType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode, DATEntityType.RCOMaster_Chiller, DATEntityType.RCOMaster_Freezer);
                                     
                    if (DcId == null || IsFirstTimeEdit == false) {                      
                        oSectionddl.Clear();
                        $scope['AddlLocation'].Clear();
                    }
                }
                else {
                    var oSectionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'AttributeNodeId': 524, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });
                    //oSectionddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);
                    oSectionddl.SetDataSourceFromTreeChildsWithLeafType(DcPlaceId, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode, DATEntityType.RCOMaster_Chiller, DATEntityType.RCOMaster_Freezer);

                    var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocation', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocation', 'DATEntityTypeId': DATEntityType.RCOMaster_Section, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'AttributeNodeId': 444, 'SelectedIndexChangedEventHandler': oLocationSelectedIndexChanged });
                    //oLocationddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Section, _TableNamesEnum.OrganizationAssetsNode);
                    oLocationddl.SetDataSourceFromTreeChildsWithLeafType(DcPlaceId, DATEntityType.RCOMaster_Section, _TableNamesEnum.OrganizationAssetsNode, DATEntityType.RCOMaster_Chiller, DATEntityType.RCOMaster_Freezer);
                }

                OneViewConsole.Debug("oDepartmentSelectedIndexChanged End", "HiLoadersCleaningChecklistFacade.oDepartmentSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }

        var oSectionSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oSectionSelectedIndexChanged Start", "HiLoadersCleaningChecklistFacade.oSectionSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    var LocationId;
                    var LocationName;
                    if ((DcId != null || IsFirstTimeEdit == true) && (($scope['AddlLocation'] != undefined && $scope['AddlLocation'].GetSelectedText() != undefined) && ($scope['AddlLocation'].GetSelectedText() != ''))) {
                        LocationId = $scope['AddlLocation'].GetSelectedValue();
                        LocationName = $scope['AddlLocation'].GetSelectedText();
                    }
                 
                    var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocation', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocation', 'DATEntityTypeId': DATEntityType.RCOMaster_Section, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'AttributeNodeId': 444, 'SelectedIndexChangedEventHandler': oLocationSelectedIndexChanged });
                    // oLocationddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Section, _TableNamesEnum.OrganizationAssetsNode);
                    oLocationddl.SetDataSourceFromTreeChildsWithLeafType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Section, _TableNamesEnum.OrganizationAssetsNode, DATEntityType.RCOMaster_Chiller, DATEntityType.RCOMaster_Freezer)
                    
                    if ((DcId != null || IsFirstTimeEdit == true) && (($scope['AddlLocation'].GetSelectedText() == undefined) || ($scope['AddlLocation'].GetSelectedText() == ''))) {
                        if (LocationId != undefined ) {
                            $scope['AddlLocation'].Set({ Id: LocationId, Name: LocationName, "IsDynamicElement": false });
                        }
                    }                    

                    if (DcId == null || IsFirstTimeEdit == false) {
                        oLocationddl.Clear();
 
                    }
                }
                else {
                    var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocation', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocation', 'DATEntityTypeId': DATEntityType.RCOMaster_Section, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'AttributeNodeId': 444, 'SelectedIndexChangedEventHandler': oLocationSelectedIndexChanged });
                    // oLocationddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Section, _TableNamesEnum.OrganizationAssetsNode);
                    oLocationddl.SetDataSourceFromTreeChildsWithLeafType(DcPlaceId, DATEntityType.RCOMaster_Section, _TableNamesEnum.OrganizationAssetsNode, DATEntityType.RCOMaster_Chiller, DATEntityType.RCOMaster_Freezer);
                }

                OneViewConsole.Debug("oSectionSelectedIndexChanged End", "HiLoadersCleaningChecklistFacade.oSectionSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oLocationddl = null;
            }
        }

        var oLocationSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oSectionSelectedIndexChanged Start", "HiLoadersCleaningChecklistFacade.oSectionSelectedIndexChanged");
                
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    var MachineChillerId;
                    var MachineChillerName;

                    if ((DcId != null || IsFirstTimeEdit == true) && (($scope['AddlMachineChiller'] != undefined && $scope['AddlMachineChiller'].GetSelectedText() != undefined) && ($scope['AddlMachineChiller'].GetSelectedText() != ''))) {
                        MachineChillerId = $scope['AddlMachineChiller'].GetSelectedValue();
                        MachineChillerName = $scope['AddlMachineChiller'].GetSelectedText();
                    }

                    var MachineFreezerId;
                    var MachineFreezerName;

                    if ((DcId != null || IsFirstTimeEdit == true) && (($scope['AddlMachineFreezer'] != undefined && $scope['AddlMachineFreezer'].GetSelectedText() != undefined) && ($scope['AddlMachineFreezer'].GetSelectedText() != ''))) {
                        MachineFreezerId = $scope['AddlMachineFreezer'].GetSelectedValue();
                        MachineFreezerName = $scope['AddlMachineFreezer'].GetSelectedText();
                    }

                    var oMachineChiller = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlMachineChiller', 'DataSourceModelName': 'MachineChillers', 'DisplayElementModelName': 'NewDCModel.AddlMachineChiller', 'DATEntityTypeId': DATEntityType.RCOMaster_Chiller, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 446 });
                    oMachineChiller.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Chiller, _TableNamesEnum.OrganizationAssetsNode);

                    var oMachineFreezer = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlMachineFreezer', 'DataSourceModelName': 'MachineFreezers', 'DisplayElementModelName': 'NewDCModel.AddlMachineFreezer', 'DATEntityTypeId': DATEntityType.RCOMaster_Freezer, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 478 });
                    oMachineFreezer.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Freezer, _TableNamesEnum.OrganizationAssetsNode);


                    if ((DcId != null || IsFirstTimeEdit == true) && (($scope['AddlMachineChiller'].GetSelectedText() == undefined) || ($scope['AddlMachineChiller'].GetSelectedText() == ''))) {
                        if (MachineChillerId != undefined ) {                        
                        $scope['AddlMachineChiller'].Set({ Id: MachineChillerId, Name: MachineChillerName, "IsDynamicElement": false });
                        }
                    }

                    if ((DcId != null || IsFirstTimeEdit == true) && (($scope['AddlMachineFreezer'].GetSelectedText() == undefined) || ($scope['AddlMachineFreezer'].GetSelectedText() == ''))) {
                        if (MachineFreezerId != undefined ) {                         
                            $scope['AddlMachineFreezer'].Set({ Id: MachineFreezerId, Name: MachineFreezerName, "IsDynamicElement": false });
                        }
                    }

                   

                    if (DcId == null || IsFirstTimeEdit == false) {
                     oMachineFreezer.Clear();
                     oMachineChiller.Clear();
                    }

                   
                }
                else {
                    var oMachineChiller = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlMachineChiller', 'DataSourceModelName': 'MachineChillers', 'DisplayElementModelName': 'NewDCModel.AddlMachineChiller', 'DATEntityTypeId': DATEntityType.RCOMaster_Chiller, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 446 });
                    oMachineChiller.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Chiller, _TableNamesEnum.OrganizationAssetsNode);

                    var oMachineFreezer = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlMachineFreezer', 'DataSourceModelName': 'MachineFreezers', 'DisplayElementModelName': 'NewDCModel.AddlMachineFreezer', 'DATEntityTypeId': DATEntityType.RCOMaster_Freezer, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 478 });
                    oMachineFreezer.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Freezer, _TableNamesEnum.OrganizationAssetsNode);

                }

                OneViewConsole.Debug("oSectionSelectedIndexChanged End", "HiLoadersCleaningChecklistFacade.oSectionSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oMachineChiller = null;
                oMachineFreezer = null;
            }
        }

        this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
            try {
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "HiLoadersCleaningChecklistFacade.Temperature_NgKeyUp");

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
                OneViewConsole.Debug("Temperature_NgKeyUp End", "HiLoadersCleaningChecklistFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.Temperature_NgKeyUp", xlatService);
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
            
                OneViewConsole.Debug("ValidateActionNC Start", "HiLoadersCleaningChecklistFacade.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "HiLoadersCleaningChecklistFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "HiLoadersCleaningChecklistFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "HiLoadersCleaningChecklistFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "HiLoadersCleaningChecklistFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "HiLoadersCleaningChecklistFacade.EvaluateActionNCStatus");
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
                OneViewConsole.Debug("ShowNCFormAction Start", "HiLoadersCleaningChecklistFacade.ShowNCFormAction");

                //var TempOutNCTemplate = TemplateMetaData[ServiceId][NCTemplateDetails.TemplateId];
                //var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': NCTemplateDetails.TemplateId, 'TemplateName': NCTemplateDetails.TemplateName });
                //_oNCDcDataCaptureBO.ClearControls(TempOutNCTemplate);
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



                OneViewConsole.Debug("ShowNCFormAction End", "HiLoadersCleaningChecklistFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.ShowNCFormAction", xlatService);
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
                OneViewConsole.Debug("LoadAnswerModes Start", "HiLoadersCleaningChecklistFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                
                var oHiLoadersCleaned = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkHiLoadersCleaned', 'DataSourceModelName': 'HiLoadersCleaned', 'DisplayElementModelName': 'NewDCModel.chkHiLoadersCleaned' });
                oHiLoadersCleaned.AnswerModes(TemplateNodes, 10333);

                var oIceBinsSanitized = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkIceBinsSanitized', 'DataSourceModelName': 'IceBinsSanitized', 'DisplayElementModelName': 'NewDCModel.chkIceBinsSanitized' });
                oIceBinsSanitized.AnswerModes(TemplateNodes, 10334);

                var oNCOptions = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oNCOptions.LoadNCOptions();

                OneViewConsole.Debug("LoadAnswerModes End", "HiLoadersCleaningChecklistFacade.LoadAnswerModes");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oHiLoadersCleaned = null;
                oIceBinsSanitized = null;
            }
        }

        var CreateDynamicElements = function (_DcResultDetailsEntityLst) {
            try {

                OneViewConsole.Debug("CreateDynamicElements Start", "HiLoadersCleaningChecklistFacade.CreateDynamicElements");

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

                OneViewConsole.Debug("CreateDynamicElements End", "HiLoadersCleaningChecklistFacade.CreateDynamicElements");
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
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "HiLoadersCleaningChecklistFacade.Temperature_NgKeyUp");

                if (IsNc == true) {
                    ShowNCStatus(AttributeId, ControlId);
                }

                var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var ShowNCStatusOLD = function (AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "HiLoadersCleaningChecklistFacade.ShowNCStatus");

                var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
                NormalizeNCEntityListData(DCNCMappingListData);

                OneViewConsole.Debug("ShowNCStatus End", "HiLoadersCleaningChecklistFacade.ShowNCStatus");
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
                OneViewConsole.Debug("ClearForm Start", "HiLoadersCleaningChecklistFacade.ClearForm");

                _oDataCaptureBO.ClearControls();
                if (DcId != null) {
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                }
                else {
                    _oDataCaptureBO.setDefaultValue();
                }

                OneViewConsole.Debug("ClearForm End", "HiLoadersCleaningChecklistFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "HiLoadersCleaningChecklistFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "HiLoadersCleaningChecklistFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "HiLoadersCleaningChecklistFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "HiLoadersCleaningChecklistFacade.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.PreControlEvents", xlatService);
            }
        }

        this.ngChange_setDateTime = function (ControlId) {
            try {
                _oDataCaptureBO.ngChange_setDateTime(ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.ngChange_setDateTime", xlatService);
            }
        }


        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.ProbeTesting", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.ClearComments", xlatService);
            }
        }

        this.ngChange_setVariationTemp = function () {
            try {              
                if (($scope.NewDCModel.ATGaugeTempControlId != "" && $scope.NewDCModel.ATGaugeTempControlId != undefined) && ($scope.NewDCModel.ATAirProbeTempControlId != "" && $scope.NewDCModel.ATAirProbeTempControlId != undefined)) {
                   var VariationTemp = (parseFloat($scope.NewDCModel.ATGaugeTempControlId)) - (parseFloat($scope.NewDCModel.ATAirProbeTempControlId));                    
                    $scope.NewDCModel.ATVariationinTempControlId = VariationTemp;                  
                }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "HiLoadersCleaningChecklistFacade.ClearComments", xlatService);
            }
        }

        this.Destroy = function () {
            _oDataCaptureBO.Destroy();
        }
}


