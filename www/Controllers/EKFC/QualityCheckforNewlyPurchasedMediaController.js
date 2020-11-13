
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
    
MyApp.controller('QualityCheckforNewlyPurchasedMediaController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
    //oSetDefaultSpinner.Start();
        // xlatService.setCurrentPage('QualityCheckforNewlyPurchasedMedia');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);
        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
	scope = $scope;
	oSnapRemote = snapRemote;


	var oQualityCheckforNewlyPurchasedMediaFacade = new QualityCheckforNewlyPurchasedMediaFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    oQualityCheckforNewlyPurchasedMediaFacade.Init();
    oQualityCheckforNewlyPurchasedMediaFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
  
    $scope.Signature = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.Signature();
    }

    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oQualityCheckforNewlyPurchasedMediaFacade.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oQualityCheckforNewlyPurchasedMediaFacade.Destroy();

        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oQualityCheckforNewlyPurchasedMediaFacade.SetSelectedTextBoxColor(ControlId);
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
        oQualityCheckforNewlyPurchasedMediaFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
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
        lastTimeOutId = $timeout(function () { oQualityCheckforNewlyPurchasedMediaFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId); }, Timeout);
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
        oQualityCheckforNewlyPurchasedMediaFacade.ClearForm();
    }
    $scope.$on('$destroy', function () {

        //oOneViewAppInfoPlugin.ClearCache();
        //$location.replace(); //clear last history route
        //$templateCache.removeAll();

        //  ClearGlobalVariable();
        scope = null;
        ionicBackdrop = null;
        oQualityCheckforNewlyPurchasedMediaFacade = null;
        $scope = null;
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oQualityCheckforNewlyPurchasedMediaFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oQualityCheckforNewlyPurchasedMediaFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oQualityCheckforNewlyPurchasedMediaFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.SaveDCRecords(true);
    }



    $scope.CustomNCClick = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.ProbeTesting();
    };
    $scope.ClearReasons = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oQualityCheckforNewlyPurchasedMediaFacade.ClearComments();
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


    $scope.CalculateResult = function (AbsoluteTest, AbsoluteControl, Result) {
        oQualityCheckforNewlyPurchasedMediaFacade.CalculateResult(AbsoluteTest, AbsoluteControl, Result);
    }

});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function QualityCheckforNewlyPurchasedMediaFacade(parm) {

    try {
        OneViewConsole.Debug("QualityCheckforNewlyPurchasedMediaFacade Start", "Facade.QualityCheckforNewlyPurchasedMediaFacade");

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

        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
      
      //  var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("QualityCheckforNewlyPurchasedMediaFacade End", "Facade.QualityCheckforNewlyPurchasedMediaFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.QualityCheckforNewlyPurchasedMediaFacade", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "QualityCheckforNewlyPurchasedMediaFacade.Init");

                    $scope.NewDCModel = {};
                    // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];
                    $scope.ThawingComplete = [];
                    $scope.ProductCategory = [];
                    $scope.ShiftOptions = [];

                    $scope.NCOptions = [];
                    $scope.ProductState = [];
                    $scope.UsedFor = [];
                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                    OneViewConsole.Debug("Init End", "QualityCheckforNewlyPurchasedMediaFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.Init", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "QualityCheckforNewlyPurchasedMediaFacade.PageLoad");

                    AutoCompleteGenerateHTML();
                    Loadddl();
                    LoadDefaultValueMetaData();
                    _oDataCaptureBO.LoadShift();
                //    LoadAnswerModes();
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

                    OneViewConsole.Debug("PageLoad End", "QualityCheckforNewlyPurchasedMediaFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.PageLoad", xlatService);
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "QualityCheckforNewlyPurchasedMediaFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "QualityCheckforNewlyPurchasedMediaFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "QualityCheckforNewlyPurchasedMediaFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'txtTempControlId') {
                    $scope.txtTempControlId = 'highlight';
                }

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "QualityCheckforNewlyPurchasedMediaFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "QualityCheckforNewlyPurchasedMediaFacade.BindNc");

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

                    OneViewConsole.Debug("BindNc End", "QualityCheckforNewlyPurchasedMediaFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "QualityCheckforNewlyPurchasedMediaFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "QualityCheckforNewlyPurchasedMediaFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "QualityCheckforNewlyPurchasedMediaFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "QualityCheckforNewlyPurchasedMediaFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "QualityCheckforNewlyPurchasedMediaFacade.SaveDCRecords");

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
     
                    OneViewConsole.Debug("SaveDCRecords End", "QualityCheckforNewlyPurchasedMediaFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.SaveDCRecords", xlatService);
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
                OneViewConsole.Debug("Loadddl Start", "QualityCheckforNewlyPurchasedMediaFacade.Loadddl");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;

                var oMediaddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtNameofMediaControlId', 'DataSourceModelName': 'Media', 'DisplayElementModelName': 'NewDCModel.txtNameofMediaControlId', 'IsDynamicElementCreationEnabled': false, 'DATEntityTypeId': DATEntityType.RCOMaster_MediaName, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': 668 });
                oMediaddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'ATIncubationTempControlId', ColumnNames: ['Column1'], Seperater: '-' });
                oMediaddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtQCorganismControlId', ColumnNames: ['Column2'], Seperater: '-' });
                oMediaddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MediaName, _TableNamesEnum.OrganizationAssetsNode);


                var oBrandNameddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtBrandNameControlId', 'DataSourceModelName': 'BrandNames', 'DisplayElementModelName': 'NewDCModel.txtBrandNameControlId', 'IsDynamicElementCreationEnabled': true, 'DATEntityTypeId': DATEntityType.RCOMaster_MediaBrandName, 'MinCharToSearch': 0, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': 675 });
                oBrandNameddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MediaBrandName, _TableNamesEnum.OrganizationAssetsNode);


                var oEndpointdetailsTestddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEndpointdetailsTestControlId', 'DataSourceModelName': 'EndpointdetailsTests', 'DisplayElementModelName': 'NewDCModel.txtEndpointdetailsTestControlId', 'IsDynamicElementCreationEnabled': false, 'DATEntityTypeId': DATEntityType.RCOMaster_EndPoint, 'MinCharToSearch': 0, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': 677, 'SelectedIndexChangedEventHandler': oTestSelectedIndexChanged });
                oEndpointdetailsTestddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtAbsoluteGrowthTestControlId', ColumnNames: ['Column1'], Seperater: '-' });
                oEndpointdetailsTestddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EndPoint, _TableNamesEnum.OrganizationAssetsNode);

                var oEndpointdetailsControlddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEndpointdetailsControlControlId', 'DataSourceModelName': 'EndpointdetailsControls', 'DisplayElementModelName': 'NewDCModel.txtEndpointdetailsControlControlId', 'IsDynamicElementCreationEnabled': false, 'DATEntityTypeId': DATEntityType.RCOMaster_EndPoint, 'MinCharToSearch': 0, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': 678, 'SelectedIndexChangedEventHandler': oControlSelectedIndexChanged });
                oEndpointdetailsControlddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'txtAbsoluteGrowthControlControlId', ColumnNames: ['Column1'], Seperater: '-' });
                oEndpointdetailsControlddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EndPoint, _TableNamesEnum.OrganizationAssetsNode);
               
                OneViewConsole.Debug("Loadddl End", "QualityCheckforNewlyPurchasedMediaFacade.Loadddl");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oProductddl = null;
            }
        }

        var oTestSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oTestSelectedIndexChanged Start", "QualityCheckforNewlyPurchasedMediaFacade.oTestSelectedIndexChanged");
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {

                    MyInstance.CalculateResult('txtAbsoluteGrowthTestControlId', 'txtAbsoluteGrowthControlControlId', 'txtRelativeGrowthIndexControlId');
                }
                else {
                    $scope.NewDCModel["txtAbsoluteGrowthTestControlId"] = "";
                    MyInstance.CalculateResult('txtAbsoluteGrowthTestControlId', 'txtAbsoluteGrowthControlControlId', 'txtRelativeGrowthIndexControlId');
                }
                OneViewConsole.Debug("oTestSelectedIndexChanged End", "QualityCheckforNewlyPurchasedMediaFacade.oTestSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
               // oSectionddl = null;
            }
        }

        var oControlSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oControlSelectedIndexChanged Start", "QualityCheckforNewlyPurchasedMediaFacade.oControlSelectedIndexChanged");
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {

                    MyInstance.CalculateResult('txtAbsoluteGrowthTestControlId', 'txtAbsoluteGrowthControlControlId', 'txtRelativeGrowthIndexControlId');
                }
                else {
                    $scope.NewDCModel["txtAbsoluteGrowthControlControlId"] = "";
                    MyInstance.CalculateResult('txtAbsoluteGrowthTestControlId', 'txtAbsoluteGrowthControlControlId', 'txtRelativeGrowthIndexControlId');
                }
                OneViewConsole.Debug("oControlSelectedIndexChanged End", "QualityCheckforNewlyPurchasedMediaFacade.oControlSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                // oSectionddl = null;
            }
        }

        this.CalculateResult = function (AbsoluteTest, AbsoluteControl, Result) {

            try {
                OneViewConsole.Debug("CalculateResult Start", "SamplingSheetAndAirAnalysisControllerFacade.CalculateResult");
                AbsoluteTest = $scope.NewDCModel[AbsoluteTest];
                AbsoluteControl = $scope.NewDCModel[AbsoluteControl];
           
                //alert("AbsoluteTest : " + AbsoluteTest + "AbsoluteControl : " + AbsoluteControl);
                if ((AbsoluteTest != undefined && AbsoluteTest != '') && (AbsoluteControl != undefined && AbsoluteControl != '')) {
                    AbsoluteTest = parseFloat(AbsoluteTest);
                    AbsoluteControl = parseFloat(AbsoluteControl);

                    //alert("AbsoluteTest : " + AbsoluteTest + "AbsoluteControl : " + AbsoluteControl);
                    var ResultValue =  (AbsoluteTest/AbsoluteControl)* 100;
                    //alert("Result : " + ResultValue);
                    if (!isNaN(ResultValue)) {
                        $scope.NewDCModel[Result] = ResultValue.toFixed(2);
                    }
                    else {
                        $scope.NewDCModel[Result] = "";
                    }
                }
                else {
                    $scope.NewDCModel[Result] = "";
                }

                OneViewConsole.Debug("CalculateResult End", "oSamplingSheetAndAirAnalysisControllerFacade.CalculateResult");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndFoodAnalysisController.CalculateResult", xlatService);
            }
            finally {
            }
        }

        this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
            try {

                OneViewConsole.Debug("Temperature_NgKeyUp Start", "QualityCheckforNewlyPurchasedMediaFacade.Temperature_NgKeyUp");

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
                OneViewConsole.Debug("Temperature_NgKeyUp End", "QualityCheckforNewlyPurchasedMediaFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.Temperature_NgKeyUp", xlatService);
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
                OneViewConsole.Debug("ValidateActionNC Start", "QualityCheckforNewlyPurchasedMediaFacade.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "QualityCheckforNewlyPurchasedMediaFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "QualityCheckforNewlyPurchasedMediaFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "QualityCheckforNewlyPurchasedMediaFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "QualityCheckforNewlyPurchasedMediaFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "QualityCheckforNewlyPurchasedMediaFacade.EvaluateActionNCStatus");
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
                OneViewConsole.Debug("ShowNCFormAction Start", "QualityCheckforNewlyPurchasedMediaFacade.ShowNCFormAction");



                OneViewConsole.Debug("ShowNCFormAction End", "QualityCheckforNewlyPurchasedMediaFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.ShowNCFormAction", xlatService);
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
                OneViewConsole.Debug("LoadAnswerModes Start", "QualityCheckforNewlyPurchasedMediaFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                var oProductCategory = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkProductCategory', 'DataSourceModelName': 'ProductCategory', 'DisplayElementModelName': 'NewDCModel.chkProductCategory' });
                oProductCategory.AnswerModes(TemplateNodes, 79);

                var oThawingComplete = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkThawingComplete', 'DataSourceModelName': 'ThawingComplete', 'DisplayElementModelName': 'NewDCModel.chkThawingComplete' });
                oThawingComplete.AnswerModes(TemplateNodes, 83);

                var oProductState = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkProductState', 'DataSourceModelName': 'ProductState', 'DisplayElementModelName': 'NewDCModel.chkProductState' });
                oProductState.AnswerModes(TemplateNodes, 404);

                var oUsedFor = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkUsedFor', 'DataSourceModelName': 'UsedFor', 'DisplayElementModelName': 'NewDCModel.chkUsedFor' });
                oUsedFor.AnswerModes(TemplateNodes, 86);

                var oProductStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oProductStatus.LoadNCOptions();

                OneViewConsole.Debug("LoadAnswerModes End", "QualityCheckforNewlyPurchasedMediaFacade.LoadAnswerModes");
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

                OneViewConsole.Debug("CreateDynamicElements Start", "QualityCheckforNewlyPurchasedMediaFacade.CreateDynamicElements");

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

                OneViewConsole.Debug("CreateDynamicElements End", "QualityCheckforNewlyPurchasedMediaFacade.CreateDynamicElements");
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
                OneViewConsole.Debug("ClearForm Start", "QualityCheckforNewlyPurchasedMediaFacade.ClearForm");

                _oDataCaptureBO.ClearControls();
                if (DcId != null) {
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                }
                else {
                    _oDataCaptureBO.setDefaultValue();
                }

                OneViewConsole.Debug("ClearForm End", "QualityCheckforNewlyPurchasedMediaFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "QualityCheckforNewlyPurchasedMediaFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "QualityCheckforNewlyPurchasedMediaFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "QualityCheckforNewlyPurchasedMediaFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "QualityCheckforNewlyPurchasedMediaFacade.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.PreControlEvents", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.ngChange_setDateTime", xlatService);
            }
        }


        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.ProbeTesting", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.ClearComments", xlatService);
            }
        }

        this.Destroy = function () {
            _oDataCaptureBO.Destroy();
        }

        this.SaveSignature = function (ControlId, signaturePad) {
            try {
                
                OneViewConsole.Debug("SaveSignature Start", "QualityCheckforNewlyPurchasedMediaFacade.SaveSignature");
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

                OneViewConsole.Debug("SaveSignature End", "QualityCheckforNewlyPurchasedMediaFacade.SaveSignature");
            }
            catch (Excep) {
                //alert('SaveSignature :' + Excep + "," + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.SaveSignature", xlatService);
            }
            finally {
                oDateTime = null;
                CurrenntDateAndTime = null;
            }
        }

        this.ClearSignature = function (ControlId) {
            try {
                OneViewConsole.Debug("ClearSignature Start", "QualityCheckforNewlyPurchasedMediaFacade.ClearSignature");
                //alert('ClearSignature');
                $scope[ControlId + '_IsModified'] = false;
                $scope[ControlId + '_SignaturePad'] = '';
                $scope.lblSignature = "";

                OneViewConsole.Debug("ClearSignature End", "QualityCheckforNewlyPurchasedMediaFacade.ClearSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.ClearSignature", xlatService);
            }
        }

        this.Signature = function () {
            try {
                OneViewConsole.Debug("Signature Start", "QualityCheckforNewlyPurchasedMediaFacade.Signature");

                $scope.DivNGForm = true;
                $scope.DivContent = false;
                $scope.DivSignature = true;

                $timeout(function () {
                    SignatureContent();
                }, 100);


                OneViewConsole.Debug("Signature End", "QualityCheckforNewlyPurchasedMediaFacade.Signature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "QualityCheckforNewlyPurchasedMediaFacade.Signature", xlatService);
            }
        }

        var SignatureContent = function () {
            try {
               
                OneViewConsole.Debug("SignatureContent Start", "QualityCheckforNewlyPurchasedMediaFacade.SignatureContent");

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
                        navigator.notification.alert("MN-RQ-NCF-001 :: Please provide signature first.", ['OK'], "");
                    } else {
                        MyInstance.SaveSignature('DCSignature', signaturePad);
                    }


                });

                OneViewConsole.Debug("SignatureContent End", "QualityCheckforNewlyPurchasedMediaFacade.SignatureContent");
            }
            catch (Excep) {
                // alert('SignatureContent :' + Excep + "," + JSON.stringify(Excep));
                throw Excep;
            }
            finally {
                wrapper = null;
            }
        }
}


