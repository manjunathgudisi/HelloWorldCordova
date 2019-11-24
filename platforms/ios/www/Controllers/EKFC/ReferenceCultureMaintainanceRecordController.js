
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
    
MyApp.controller('ReferenceCultureMaintainanceRecordController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
    //oSetDefaultSpinner.Start();
        // xlatService.setCurrentPage('ReferenceCultureMaintainanceRecord');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);
        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
	scope = $scope;
	oSnapRemote = snapRemote;


	var oReferenceCultureMaintainanceRecordControllerFacade = new ReferenceCultureMaintainanceRecordControllerFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    oReferenceCultureMaintainanceRecordControllerFacade.Init();
    oReferenceCultureMaintainanceRecordControllerFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
  
    

    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oReferenceCultureMaintainanceRecordControllerFacade.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oReferenceCultureMaintainanceRecordControllerFacade.Destroy();

        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oReferenceCultureMaintainanceRecordControllerFacade.SetSelectedTextBoxColor(ControlId);
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
        oReferenceCultureMaintainanceRecordControllerFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
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
        lastTimeOutId = $timeout(function () { oReferenceCultureMaintainanceRecordControllerFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId); }, Timeout);
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
        oReferenceCultureMaintainanceRecordControllerFacade.ClearForm();
    }
    $scope.$on('$destroy', function () {

        //oOneViewAppInfoPlugin.ClearCache();
        //$location.replace(); //clear last history route
        //$templateCache.removeAll();

        //  ClearGlobalVariable();
        scope = null;
        ionicBackdrop = null;
        oReferenceCultureMaintainanceRecordControllerFacade = null;
        $scope = null;
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oReferenceCultureMaintainanceRecordControllerFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oReferenceCultureMaintainanceRecordControllerFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oReferenceCultureMaintainanceRecordControllerFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.SaveDCRecords(true);
    }



    $scope.CustomNCClick = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.ProbeTesting();
    };
    $scope.ClearReasons = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oReferenceCultureMaintainanceRecordControllerFacade.ClearComments();
    } 
    var DecimalFormaterTimeOut = null;
    $scope.MakeDecimalControl = function (ControlId, Format) {

        //var value = arg.value;
        var value = document.getElementById(ControlId).value;
        value = value.replace(/\s/g, '');
        value = value.replace(/[^ 0-9 .]/g, '');
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
        oReferenceCultureMaintainanceRecordControllerFacade.ngChange_SetObservedvalueDifference(ControlId, CorrectionControlId, UnitofReferenceControlId, DifferenceValue);
    }

    $scope.Signature = function (SignatureControlID) {
       // alert(SignatureControlID)
        oReferenceCultureMaintainanceRecordControllerFacade.Signature(SignatureControlID);
    }

 
});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function ReferenceCultureMaintainanceRecordControllerFacade(parm) {

    try {
        OneViewConsole.Debug("ReferenceCultureMaintainanceRecordControllerFacade Start", "Facade.ReferenceCultureMaintainanceRecordControllerFacade");

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

        OneViewConsole.Debug("ReferenceCultureMaintainanceRecordControllerFacade End", "Facade.ReferenceCultureMaintainanceRecordControllerFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.ReferenceCultureMaintainanceRecordControllerFacade", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "ReferenceCultureMaintainanceRecordControllerFacade.Init");

                    $scope.NewDCModel = {};
                    // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];
                    //$scope.ExternalCaliberations = [];
                    //$scope.InternalCaliberations = [];
                    //$scope.PreventionMaintanences = [];
                    $scope.ShiftOptions = [];
                    $scope.WCMonth1Statuss = [];
                    $scope.WCMonth2Statuss = [];
                    $scope.WCMonth3Statuss = [];
                    $scope.WCMonth4Statuss = [];
                    $scope.WCMonth5Statuss = [];
                    $scope.WCMonth6Statuss = [];
                    $scope.WCMonth7Statuss = [];
                    $scope.WCMonth8Statuss = [];
                    $scope.WCMonth9Statuss = [];
                    $scope.WCMonth10Statuss = [];
                    $scope.WCMonth11Statuss = [];
                    $scope.WCMonth12Statuss = [];
                  
                 
                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                OneViewConsole.Debug("Init End", "ReferenceCultureMaintainanceRecordControllerFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.Init", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "ReferenceCultureMaintainanceRecordControllerFacade.PageLoad");

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

                OneViewConsole.Debug("PageLoad End", "ReferenceCultureMaintainanceRecordControllerFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.PageLoad", xlatService);
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "ReferenceCultureMaintainanceRecordControllerFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "ReferenceCultureMaintainanceRecordControllerFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "ReferenceCultureMaintainanceRecordControllerFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'txtTempControlId') {
                    $scope.txtTempControlId = 'highlight';
                }

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "ReferenceCultureMaintainanceRecordControllerFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "ReferenceCultureMaintainanceRecordControllerFacade.BindNc");

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

                OneViewConsole.Debug("BindNc End", "ReferenceCultureMaintainanceRecordControllerFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "ReferenceCultureMaintainanceRecordControllerFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "ReferenceCultureMaintainanceRecordControllerFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "ReferenceCultureMaintainanceRecordControllerFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "ReferenceCultureMaintainanceRecordControllerFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "ReferenceCultureMaintainanceRecordControllerFacade.SaveDCRecords");

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
     
                OneViewConsole.Debug("SaveDCRecords End", "ReferenceCultureMaintainanceRecordControllerFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.SaveDCRecords", xlatService);
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
                OneViewConsole.Debug("Loadddl Start", "ReferenceCultureMaintainanceRecordControllerFacade.Loadddl");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;

                var oNameofMasterCultureddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtNameofMasterCultureControlId', 'DataSourceModelName': 'NameofMasterCulture', 'DisplayElementModelName': 'NewDCModel.txtNameofMasterCultureControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MasterCulture, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 688, 'IsDynamicElementCreationEnabled': true });
                oNameofMasterCultureddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MasterCulture, _TableNamesEnum.OrganizationAssetsNode);

                OneViewConsole.Debug("Loadddl End", "ReferenceCultureMaintainanceRecordControllerFacade.Loadddl");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oProductddl = null;
            }
        }

        var oEquipmentNameSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oEquipmentNameSelectedIndexChanged Start", "pHMeterCalibrationRecordsFacade.oEquipmentNameSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {
                    var oEquipmentNumberddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentCodeControlId', 'DataSourceModelName': 'EquipmentNumber', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentCodeControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentNumber, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': 577 });
                    oEquipmentNumberddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_EquipmentNumber, _TableNamesEnum.OrganizationAssetsNode);

                    if (DcId == null || IsFirstTimeEdit == false) {
                        oEquipmentNumberddl.Clear();
                    }
                }

                OneViewConsole.Debug("oEquipmentNameSelectedIndexChanged End", "pHMeterCalibrationRecordsFacade.oEquipmentNameSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oEquipmentNumberddl = null;
            }
        }

        this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
            try {

                OneViewConsole.Debug("Temperature_NgKeyUp Start", "ReferenceCultureMaintainanceRecordControllerFacade.Temperature_NgKeyUp");

                ////if (IsNc == true) {
                //    var ActionResponseList = EvaluateActionNCStatus(AttributeId);
                //// }
                var oDefaultValidationResponse = new DefaultValidationResponse();
                oDefaultValidationResponse = _oDataCaptureBO.PostControlEventsExe(AttributeId, ControlId);

                if (oDefaultValidationResponse.IsSuccess) {
                    ValidateActionNC(AttributeId, ControlId)
                    if (RefreshcontrolId != '') {
                        // var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                        _oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
                        if (RefreshAttributeId != undefined || RefreshAttributeId != '') {
                            ValidateActionNC(RefreshAttributeId, RefreshcontrolId)
                        }
                    }
                    NCSelectedAttributeId = AttributeId;                  
                }              

                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                OneViewConsole.Debug("Temperature_NgKeyUp End", "ReferenceCultureMaintainanceRecordControllerFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.Temperature_NgKeyUp", xlatService);
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
                OneViewConsole.Debug("ValidateActionNC Start", "ReferenceCultureMaintainanceRecordControllerFacade.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "ReferenceCultureMaintainanceRecordControllerFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "ReferenceCultureMaintainanceRecordControllerFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "ReferenceCultureMaintainanceRecordControllerFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "ReferenceCultureMaintainanceRecordControllerFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "ReferenceCultureMaintainanceRecordControllerFacade.EvaluateActionNCStatus");
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
                OneViewConsole.Debug("ShowNCFormAction Start", "ReferenceCultureMaintainanceRecordControllerFacade.ShowNCFormAction");



                OneViewConsole.Debug("ShowNCFormAction End", "ReferenceCultureMaintainanceRecordControllerFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.ShowNCFormAction", xlatService);
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
                OneViewConsole.Debug("LoadAnswerModes Start", "ReferenceCultureMaintainanceRecordControllerFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                //var oExternalCaliberation = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkExternalCaliberation', 'DataSourceModelName': 'ExternalCaliberations', 'DisplayElementModelName': 'NewDCModel.chkExternalCaliberation' });
                //oExternalCaliberation.AnswerModes(TemplateNodes, 579);

                //var oInternalCaliberations = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkInternalCaliberation', 'DataSourceModelName': 'InternalCaliberations', 'DisplayElementModelName': 'NewDCModel.chkInternalCaliberation' });
                //oInternalCaliberations.AnswerModes(TemplateNodes, 584);               

                //var oPreventionMaintanence = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkPreventionMaintanence', 'DataSourceModelName': 'PreventionMaintanences', 'DisplayElementModelName': 'NewDCModel.chkPreventionMaintanence' });
                //oPreventionMaintanence.AnswerModes(TemplateNodes, 586);
               
                var oWCMonth1Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth1StatusControlId', 'DataSourceModelName': 'WCMonth1Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth1StatusControlId' });
                oWCMonth1Statuss.AnswerModes(TemplateNodes, 10521);

                var oWCMonth2Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth2StatusControlId', 'DataSourceModelName': 'WCMonth2Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth2StatusControlId' });
                oWCMonth2Statuss.AnswerModes(TemplateNodes, 10522);

                var oWCMonth3Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth3StatusControlId', 'DataSourceModelName': 'WCMonth3Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth3StatusControlId' });
                oWCMonth3Statuss.AnswerModes(TemplateNodes, 10523);

                var oWCMonth4Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth4StatusControlId', 'DataSourceModelName': 'WCMonth4Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth4StatusControlId' });
                oWCMonth4Statuss.AnswerModes(TemplateNodes, 10524);

                var oWCMonth5Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth5StatusControlId', 'DataSourceModelName': 'WCMonth5Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth5StatusControlId' });
                oWCMonth5Statuss.AnswerModes(TemplateNodes, 10525);

                var oWCMonth6Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth6StatusControlId', 'DataSourceModelName': 'WCMonth6Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth6StatusControlId' });
                oWCMonth6Statuss.AnswerModes(TemplateNodes, 10526);


                var oWCMonth7Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth7StatusControlId', 'DataSourceModelName': 'WCMonth7Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth7StatusControlId' });
                oWCMonth7Statuss.AnswerModes(TemplateNodes, 10527);

                var oWCMonth8Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth8StatusControlId', 'DataSourceModelName': 'WCMonth8Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth8StatusControlId' });
                oWCMonth8Statuss.AnswerModes(TemplateNodes, 10528);

                var oWCMonth9Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth9StatusControlId', 'DataSourceModelName': 'WCMonth9Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth9StatusControlId' });
                oWCMonth9Statuss.AnswerModes(TemplateNodes, 10529);

                var oWCMonth10Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth10StatusControlId', 'DataSourceModelName': 'WCMonth10Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth10StatusControlId' });
                oWCMonth10Statuss.AnswerModes(TemplateNodes, 10530);

                var oWCMonth11Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth11StatusControlId', 'DataSourceModelName': 'WCMonth11Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth11StatusControlId' });
                oWCMonth11Statuss.AnswerModes(TemplateNodes, 10531);

                var oWCMonth12Statuss = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'ChkWCMonth12StatusControlId', 'DataSourceModelName': 'WCMonth12Statuss', 'DisplayElementModelName': 'NewDCModel.ChkWCMonth12StatusControlId' });
                oWCMonth12Statuss.AnswerModes(TemplateNodes, 10532);

                //var oProductStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                //oProductStatus.LoadNCOptions();

                OneViewConsole.Debug("LoadAnswerModes End", "ReferenceCultureMaintainanceRecordControllerFacade.LoadAnswerModes");
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

                OneViewConsole.Debug("CreateDynamicElements Start", "ReferenceCultureMaintainanceRecordControllerFacade.CreateDynamicElements");

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

                OneViewConsole.Debug("CreateDynamicElements End", "ReferenceCultureMaintainanceRecordControllerFacade.CreateDynamicElements");
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
                OneViewConsole.Debug("ClearForm Start", "ReferenceCultureMaintainanceRecordControllerFacade.ClearForm");

                _oDataCaptureBO.ClearControls();
                if (DcId != null) {
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                }
                else {
                    _oDataCaptureBO.setDefaultValue();
                }

                OneViewConsole.Debug("ClearForm End", "ReferenceCultureMaintainanceRecordControllerFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "ReferenceCultureMaintainanceRecordControllerFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "ReferenceCultureMaintainanceRecordControllerFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "ReferenceCultureMaintainanceRecordControllerFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "ReferenceCultureMaintainanceRecordControllerFacade.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.PreControlEvents", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.ngChange_setDateTime", xlatService);
            }
        }


        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.ProbeTesting", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.ClearComments", xlatService);
            }
        }

        this.Destroy = function () {
            _oDataCaptureBO.Destroy();
        }

        this.SaveSignature = function (ControlId, signaturePad) {
            try {
                
                OneViewConsole.Debug("SaveSignature Start", "ReferenceCultureMaintainanceRecordControllerFacade.SaveSignature");
                $scope[ControlId + '_IsModified'] = true;

                $scope[ControlId + '_SignaturePad'] = signaturePad.toDataURL();//signaturePad
                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();
                //$scope.lblSignature = "Signed " + CurrenntDateAndTime;
                $scope[ControlId + '_lblSignature'] = "Signed " + CurrenntDateAndTime;
                //$scope.DivNGForm = true;
                //$scope.DivContent = false;
                $scope[ControlId + '_DivSignature'] = false;
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

                OneViewConsole.Debug("SaveSignature End", "ReferenceCultureMaintainanceRecordControllerFacade.SaveSignature");
            }
            catch (Excep) {
                //alert('SaveSignature :' + Excep + "," + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.SaveSignature", xlatService);
            }
            finally {
                oDateTime = null;
                CurrenntDateAndTime = null;
            }
        }

        this.ClearSignature = function (ControlId) {
            try {
                OneViewConsole.Debug("ClearSignature Start", "ReferenceCultureMaintainanceRecordControllerFacade.ClearSignature");               
                $scope[ControlId + '_IsModified'] = false;
                $scope[ControlId + '_SignaturePad'] = '';
                $scope.lblSignature = "";

                OneViewConsole.Debug("ClearSignature End", "ReferenceCultureMaintainanceRecordControllerFacade.ClearSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.ClearSignature", xlatService);
            }
        }

        this.Signature = function (SignatureNameControlId) {
            try {
                OneViewConsole.Debug("Signature Start", "ReferenceCultureMaintainanceRecordControllerFacade.Signature");

                //$scope.DivNGForm = true;
                //$scope.DivContent = false;
                //$scope.DivSignature = true;
                $scope[SignatureNameControlId + '_DivSignature'] = true;

                $timeout(function () {
                    SignatureContent(SignatureNameControlId);
                }, 100);


                OneViewConsole.Debug("Signature End", "ReferenceCultureMaintainanceRecordControllerFacade.Signature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.Signature", xlatService);
            }
        }

        var SignatureContent = function (SignatureNameControlId) {
            try {
               
                OneViewConsole.Debug("SignatureContent Start", "ReferenceCultureMaintainanceRecordControllerFacade.SignatureContent");
                
                var wrapper = document.getElementById(SignatureNameControlId + "_SignaturePad"),
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
                    //MyInstance.ClearSignature('DCSignature');
                    MyInstance.ClearSignature(SignatureNameControlId);
                });
               
                saveButton.addEventListener("click", function (event) {                  
                    //alert(signaturePad.toDataURL().length);
                    if (signaturePad.isEmpty()) {
                        alert("MN-RQ-NCF-001 :: Please provide signature first.");
                    } else {
                        // MyInstance.SaveSignature('DCSignature', signaturePad);
                        MyInstance.SaveSignature(SignatureNameControlId, signaturePad);
                    }


                });

                OneViewConsole.Debug("SignatureContent End", "ReferenceCultureMaintainanceRecordControllerFacade.SignatureContent");
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
                oOneViewExceptionHandler.Catch(Excep, "ReferenceCultureMaintainanceRecordControllerFacade.ngChange_SetObservedvalueDifference", xlatService);
            }
        }
}


