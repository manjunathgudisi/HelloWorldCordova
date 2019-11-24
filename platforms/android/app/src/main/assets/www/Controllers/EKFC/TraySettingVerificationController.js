
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
    
MyApp.controller('TraySettingVerificationController',
    function ($scope, $document, $location, xlatService, $timeout, $templateCache, snapRemote, $compile) {
        //oSetDefaultSpinner.Start();

        var RemovedNonConformityReportForm_Page = 'T304';
        // xlatService.setCurrentPage('TraySettingVerification');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);

        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
    scope = $scope;
    oSnapRemote = snapRemote;

    var oTraySettingVerificationFacade = new TraySettingVerificationFacade({ 'scope': $scope, 'document': $document, 'location': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', '$timeout': $timeout, 'compile': $compile, '$timeout': $timeout });

    oTraySettingVerificationFacade.Init();
    oTraySettingVerificationFacade.PageLoad();
        //oSetDefaultSpinner.Stop();

    $scope.divShow = true;

    if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
        $scope.DivNGForm = true;
        $scope.ResolutionShow = false;
        $scope.DivContent = false;
        $scope.DivSignature = false;
        $scope.DivNCSignature = false;
        xlatService.setCurrentPage(RemovedNonConformityReportForm_Page);
    }
    else {
        //xlatService.setCurrentPage('TraySettingVerification');  
        xlatService.setCurrentPage(currentPage, true);
        $scope.DivNGForm = false;
        $scope.ResolutionShow = false;
        $scope.DivContent = true;
        $scope.DivSignature = false;
        $scope.DivNCSignature = false;
    }
   
    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = null;
        NCActionProfileMetaData = undefined;
        CommentsResult = {};
        ObservationResult = {};
        NCSelectedAttributeId = 0;

        xlatService.RemoveCurrentPageMetadata(currentPage);
        xlatService.RemoveCurrentPageMetadata(RemovedNonConformityReportForm_Page);
    });

    $scope.HideNC = function () {
        if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
            $location.url('/ViewRecords');
        }
        else {
            $scope.DivNGForm = false;
            $scope.ResolutionShow = false;
            $scope.DivContent = true;
            //  xlatService.setCurrentPage('TraySettingVerification'); 
            xlatService.setCurrentPage(currentPage, true);
        }
    }

    $scope.ShowResolution = function () {
        $scope.ResolutionShow = true;
        $scope.DivNGForm = false;
        $scope.DivContent = false;
        $scope.DivSignature = false;
        $scope.DivNCSignature = false;
    }

    $scope.HideResolution = function () {
        $scope.ResolutionShow = false;
        $scope.DivNGForm = true;
        $scope.DivContent = false;
        $scope.DivSignature = false;
        $scope.DivNCSignature = false;
    }

    $scope.ShowNCPage = function () {
        xlatService.setCurrentPage(RemovedNonConformityReportForm_Page);
        $scope.DivNGForm = true;
        $scope.ResolutionShow = false;
        $scope.DivContent = false;
        $scope.DivSignature = false;
        $scope.DivNCSignature = false;
        $scope.DivNC = false;
    }

    $scope.Signature = function () {
        oTraySettingVerificationFacade.Signature();
    }

    $scope.ActionSignature = function () {
        oTraySettingVerificationFacade.ActionSignature();
    }

    $scope.SaveNCAction = function () {
        oTraySettingVerificationFacade.SetNCFormAction();
    }

    $scope.SetHygAvgrageReading = function () {
        oTraySettingVerificationFacade.SetHygAvgrageReading();
    }

    $scope.GetProbeStatus = function () {
        oTraySettingVerificationFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oTraySettingVerificationFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oTraySettingVerificationFacade.SetSelectedTextBoxColor(ControlId);
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
           // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('No_Records_Available'));
            alert(xlatService.xlat('No_Records_Available'));
        }
    };

    	//$scope.activate = function(option){
    	//    alert(option.Name);
    	//};  

    $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
       
        oTraySettingVerificationFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
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
    ////    oTraySettingVerificationFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc);
        ////}

    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {

        $scope.DisableSave = true;
        $scope.DisableSaveSubmit = true;
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oTraySettingVerificationFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId); }, Timeout);
    }

    $scope.Back = function () {
            scope = null;
           // ionicBackdrop = null;
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
        oTraySettingVerificationFacade.ClearForm();
    }



    $scope.CustomNCClick = function () {
        oTraySettingVerificationFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oTraySettingVerificationFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oTraySettingVerificationFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oTraySettingVerificationFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oTraySettingVerificationFacade.CloseRightPanel();
    }

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oTraySettingVerificationFacade.PreControlEvents(AttributeId, ControlId, $event);
    }
    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oTraySettingVerificationFacade.PostControlEvents(AttributeId, ControlId);
    }
    $scope.ngChange_setDateTime = function (ControlId) {
        oTraySettingVerificationFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oTraySettingVerificationFacade.SaveDCRecords(true);
    }


    $scope.ClearReasons = function () {
        oTraySettingVerificationFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oTraySettingVerificationFacade.ClearComments();
    }
    $scope.ProbeTesting = function () {
        oTraySettingVerificationFacade.ProbeTesting();
    };

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
});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function TraySettingVerificationFacade(parm) {

    try {
        OneViewConsole.Debug("TraySettingVerificationFacade Start", "Facade.TraySettingVerificationFacade");

        var MyInstance = this;
        //$scope, $document, $state, xlatService, toaster, SpinService
        var $scope = parm.scope;
        var $document = parm.document;
        //var $state = parm.state;
        var $location = parm.location;
        var xlatService = parm.xlatService;
        var $compile = parm.compile;
        
        var toaster = parm.toaster;
        var SpinService = parm.SpinService;
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
        //var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);

        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("TraySettingVerificationFacade End", "Facade.TraySettingVerificationFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.TraySettingVerificationFacade", xlatService);
    }

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "TraySettingVerificationFacade.Init");

            $scope.NewDCModel = {};
            // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];
            // $scope.ThawingComplete = [];
            //  $scope.ProductCategory = [];
            $scope.ShiftOptions = [];
            $scope.DayMarker = [];
            $scope.NCOptions = [];
            $scope.ResolutionDetails = [];
            $scope.CookingShiftOptions = [];

            _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;

            _oDataCaptureBO.NCTemplateId = 304;
            _oDataCaptureBO.NCTemplateName = "Record for Food Items Removed";

            OneViewConsole.Debug("Init End", "TraySettingVerificationFacade.Init");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.Init", xlatService);
        }
    }

        this.Destroy = function () {
            _oDataCaptureBO.TemperatureNgKeyUpEventHandler = null;
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
                OneViewConsole.Debug("PageLoad Start", "TraySettingVerificationFacade.PageLoad");

                LoadDefaultValueMetaData();
                AutoCompleteGenerateHTML();
                    Loadddl();
                    _oDataCaptureBO.LoadShift();
                     LoadAnswerModes();
                    _oDataCaptureBO.ClearControls();
                    _oDataCaptureBO.SetMandatoryMetaData();
                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.DTAmbientTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = '';
                //_oNCComponent.Init();
                    _oCPActionNCComponent.Init();

                    SetSelectedTextBoxColor_Private('DTAmbientTempControlId');

                   // _oNCComponent.BindNCSummaryHandler = BindNc;
                    _oDataCaptureBO.SetDefaultAutoTemperatureListener();
                    if (DcId != null) {
                        IsFirstTimeEdit = true;
                        $scope.Add = 'Save';
                        _oDataCaptureBO.GetNCComments(DcId);
                        _oDataCaptureBO.LoadEditPage(DcId, $scope);

                        BindNCLoadDatas();
                        IsFirstTimeEdit = false;
                    }
                    else {
                        $scope.Add = 'Add';
                        _oDataCaptureBO.setDefaultValue();

                        var TempOutNCTemplate = TemplateMetaData[ServiceId][_oDataCaptureBO.NCTemplateId];

                        var oResolutionDetails = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtDecisionControlId', 'DataSourceModelName': 'ResolutionDetails', 'DisplayElementModelName': 'NewDCModel.txtDecisionControlId' });
                        oResolutionDetails.AnswerModes(TempOutNCTemplate, 400);
                    }

                    ///AuditSummary
                    _oDataCaptureBO.ShowDCSummary();
                    _oSettingsBO.ShowAutoManualStatus($scope);
                    if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                        _oDataCaptureBO.ClearAutoTempAndTime();
                    }
                    new OnewViewEventListener().RegisterSelectedFieldEvent();

                OneViewConsole.Debug("PageLoad End", "TraySettingVerificationFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.PageLoad", xlatService);
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "TraySettingVerificationFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "TraySettingVerificationFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "TraySettingVerificationFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'DTAmbientTempControlId') {
                    $scope.DTAmbientTempControlId = 'highlight';
                    $scope.StartingTempInControlId = '';
                    $scope.FinishingTempOutControlId = '';
                }

                else if (ControlId == 'StartingTempInControlId') {
                    $scope.DTAmbientTempControlId = '';
                    $scope.StartingTempInControlId = 'highlight';
                    $scope.FinishingTempOutControlId = '';
                }

                else if (ControlId == 'FinishingTempOutControlId') {
                    $scope.DTAmbientTempControlId = '';
                    $scope.StartingTempInControlId = '';
                    $scope.FinishingTempOutControlId = 'highlight';
                }

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "TraySettingVerificationFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "TraySettingVerificationFacade.BindNc");

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

                OneViewConsole.Debug("BindNc End", "TraySettingVerificationFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "TraySettingVerificationFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "TraySettingVerificationFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "TraySettingVerificationFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;

                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "TraySettingVerificationFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "TraySettingVerificationFacade.SaveDCRecords");

                    _oDataCaptureBO.CreateDynamicElementHandler = CreateDynamicElements;
                    if (DcId != null) {
                        var Status = _oDataCaptureBO.UpdateDC(DcId, undefined, _oDataCaptureBO.PreEditValues, IsSubmit);
                        if (Status != false) {
                            OneViewSessionStorage.Remove("DcId");
                            $scope['DCBoutNCSignature_IsModified'] = '';
                            $scope['DCBoutNCSignature_SignaturePad'] = '';
                            $location.url('/ViewRecords');
                        }
                    }
                    else {
                        var Status = _oDataCaptureBO.SaveDC(IsSubmit);
                        if (Status != false) {
                            $scope['DCBoutNCSignature_IsModified'] = '';
                            $scope['DCBoutNCSignature_SignaturePad'] = '';
                        }
                    }
                    $scope.lblSignature = "";
                    _oDataCaptureBO.ShowDCSummary();
                    SetSelectedTextBoxColor_Private('DTAmbientTempControlId');
                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.DTAmbientTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = '';

                OneViewConsole.Debug("SaveDCRecords End", "TraySettingVerificationFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.SaveDCRecords", xlatService);
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

                //alert(EventArgs.attributes['AttributeNodeId'].value);
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
                OneViewConsole.Debug("Loadddl Start", "TraySettingVerificationFacade.Loadddl");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;

                var oFlightddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFlightControlId', 'DataSourceModelName': 'Flights', 'DisplayElementModelName': 'NewDCModel.AddlFlightControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Airline, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 385, 'SelectedIndexChangedEventHandler': oFlightSelectedIndexChanged });
                oFlightddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Airline, _TableNamesEnum.OrganizationAssetsNode);

                var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 118 });
                oAirlinesddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);

                var oProductddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'MealControlId', 'DataSourceModelName': 'Products', 'DisplayElementModelName': 'NewDCModel.MealControlId', 'DATEntityTypeId': DATEntityType.RCO_WorkOrder, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': 117 });
                oProductddl.SetDataSourceWithWorkOrder(DcPlaceId, DATEntityType.RCO_WorkOrder, _TableNamesEnum.OrganizationAssetsNode);
                
                var oMealTypeddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'MealMealTypeControlId', 'DataSourceModelName': 'MealType', 'DisplayElementModelName': 'NewDCModel.MealMealTypeControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MealsType, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 558 });
                oMealTypeddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MealsType, _TableNamesEnum.OrganizationAssetsNode);
                
                var oSectorddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectorControlId', 'DataSourceModelName': 'Sectors', 'DisplayElementModelName': 'NewDCModel.AddlSectorControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Sector, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 386 });
                oSectorddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Sector, _TableNamesEnum.OrganizationAssetsNode);

                var oFAndBddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFAndBControlId', 'DataSourceModelName': 'FAndB', 'DisplayElementModelName': 'NewDCModel.AddlFAndBControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_FandBOutLet, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 387 });
                oFAndBddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_FandBOutLet, _TableNamesEnum.OrganizationAssetsNode);

                var oClassddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtClassControlId', 'DataSourceModelName': 'Class', 'DisplayElementModelName': 'NewDCModel.txtClassControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Class, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 121 });
                oClassddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Class, _TableNamesEnum.OrganizationAssetsNode);

                OneViewConsole.Debug("Loadddl End", "TraySettingVerificationFacade.Loadddl");
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
                OneViewConsole.Debug("oFlightSelectedIndexChanged Start", "TraySettingVerificationFacade.oFlightSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {                  
                    var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 118 });
                    oAirlinesddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
                    if (DcId == null) {
                        oAirlinesddl.Clear();
                    }
                }
                else {
                    var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 118 });
                    oAirlinesddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
                }

                OneViewConsole.Debug("oFlightSelectedIndexChanged End", "TraySettingVerificationFacade.oFlightSelectedIndexChanged");
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
                OneViewConsole.Debug("oFlightSelectedIndexChanged Start", "TraySettingVerificationFacade.oFlightSelectedIndexChanged");

             
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    var AirlineId="";
                    var AirlineName="";
                    if ((DcId != null || IsFirstTimeEdit == true) && (($scope['AddlAirlineControlId'] != undefined && $scope['AddlAirlineControlId'].GetSelectedText() != undefined) && ($scope['AddlAirlineControlId'].GetSelectedText() != ''))) {
                        AirlineId = $scope['AddlAirlineControlId'].GetSelectedValue();
                        AirlineName = $scope['AddlAirlineControlId'].GetSelectedText();
                    }

                    var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 118 });
                    oAirlinesddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);

                    if ((DcId != null || IsFirstTimeEdit == true) && ((AirlineId != "") && (AirlineName != ''))) {
                        $scope['AddlAirlineControlId'].Set({ Id: AirlineId, Name: AirlineName, "IsDynamicElement": false });
                    }

                    if (DcId == null || IsFirstTimeEdit == false) {
                        oAirlinesddl.Clear();

                    }
                }
                else {
                    var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 118 });
                    oAirlinesddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
                }

                OneViewConsole.Debug("oFlightSelectedIndexChanged End", "TraySettingVerificationFacade.oFlightSelectedIndexChanged");
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
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "TraySettingVerificationFacade.Temperature_NgKeyUp");

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
                OneViewConsole.Debug("Temperature_NgKeyUp End", "TraySettingVerificationFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.Temperature_NgKeyUp", xlatService);
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
                OneViewConsole.Debug("ValidateActionNC Start", "TraySettingVerificationFacade.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "TraySettingVerificationFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "TraySettingVerificationFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "TraySettingVerificationFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "TraySettingVerificationFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "TraySettingVerificationFacade.EvaluateActionNCStatus");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                DCNCMappingListData = null;
            }
        }

        var GetBoutNCDataCaptureBO = function (ConstrParm) {
            try {
                OneViewConsole.Debug("GetBoutNCDataCaptureBO Start", "CookingAndBlastChillingMonitoringFacade.GetBoutNCDataCaptureBO");

                BOUTNCDataCaptureBO.prototype = new DataCaptureBO(ConstrParm);

                //override SetEditValuesInControls ,for solving prepopulated value issues in Bout NC form
                BOUTNCDataCaptureBO.prototype.SetEditValuesInControls = function (scope, AnswerModeObject, AnswerToBind) {
                    try {
                        OneViewConsole.Debug("SetEditValuesInControls Start", "CookingAndBlastChillingMonitoringFacade.GetBoutNCDataCaptureBO.SetEditValuesInControls");

                        

                        if (AnswerModeObject.Type == 'DDL') {                         
                            $scope[AnswerModeObject.ControlId].Set({ Id: AnswerToBind.Answer, Name: AnswerToBind.AnswerValue, "IsDynamicElement": false });
                        }
                        else if (AnswerModeObject.Type == 'Band') {
                            if (AnswerToBind.Answer != "") {                               
                                var Colour = AnswerModeObject.BandInfo[AnswerToBind.Answer];
                                scope[AnswerModeObject.ControlId].Set({ Id: AnswerToBind.Answer, Name: AnswerToBind.AnswerValue, ColourIndex: Colour.ColourIndex, selected: true });
                            }
                        }
                        else if (AnswerModeObject.ControlId == "ATBlastChillerTempOutControlId") {
                        }
                        else if (AnswerModeObject.ControlId == 'DTBlastChillerTimeOutControlId') {
                        }
                        else if (AnswerModeObject.ControlId == 'DTBlastChillerTimeOutControlId') {
                        }
                        else if (AnswerModeObject.ControlId == 'txtQuantityControlId') {
                            if (AnswerToBind.Answer != "") {
                                scope.NewDCModel[AnswerModeObject.ControlId] = parseFloat(AnswerToBind.Answer);
                            }
                        }
                        else if ((AnswerModeObject.DataType == 'DATAURL') && (AnswerToBind.Answer != '')) {

                            if (AnswerModeObject.ControlId == 'DCBoutNCSignature') {
                                $scope.lblSignature = "Signed " + AnswerToBind.LastUpdatedDate;
                            }
                            else {
                                $scope.lblResultionSignature = "Signed " + AnswerToBind.LastUpdatedDate;
                            }
                        }
                        else if (AnswerModeObject.Type == 'TIME') {
                            if (AnswerToBind.Answer != "") {
                                //var Time = AnswerToBind.Answer.split(" ")[1].split(':');
                                //scope.NewDCModel[AnswerModeObject.ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
                                document.getElementById(AnswerModeObject.ControlId).value = AnswerToBind.Answer.split(" ")[1]; //take time 
                                scope.NewDCModel[AnswerModeObject.ControlId] = document.getElementById(AnswerModeObject.ControlId).value;
                            }
                        }//parseFloat(AnswerToBind.Answer);
                        else if (AnswerModeObject.Type == 'AUTOTEMPERATURE') {
                            if (AnswerToBind.Answer != "") {     
                                scope.NewDCModel[AnswerModeObject.ControlId] = parseFloat(AnswerToBind.Answer);
                            }
                        }
                        else if (AnswerModeObject.Type == "DATETIMELOCAL" && AnswerToBind.Answer != '') {

                            scope.NewDCModel[AnswerModeObject.ControlId] = new DateTime().GetDateByString(AnswerToBind.Answer);

                        }
                        else {
                            scope.NewDCModel[AnswerModeObject.ControlId] = AnswerToBind.Answer;
                        }
                        if (scope[AnswerModeObject.ControlId + "_IsModified"] != undefined) {
                            scope[AnswerModeObject.ControlId + "_IsModified"] = undefined;
                        }
                        if (scope[AnswerModeObject.ControlId + "_SignaturePad"] != undefined) {
                            scope[AnswerModeObject.ControlId + "_SignaturePad"] = undefined;
                        }

                        OneViewConsole.Debug("SetEditValuesInControls End", "CookingAndBlastChillingMonitoringFacade.GetBoutNCDataCaptureBO.SetEditValuesInControls");
                    }
                    catch (Excep) {
                        throw Excep;
                    }
                }

                BOUTNCDataCaptureBO.prototype.ClearControls = function (TemplateNodes) {
                    try {
                        OneViewConsole.Debug("ClearControls Start", "CookingAndBlastChillingMonitoringFacade.GetBoutNCDataCaptureBO.ClearControls");

                        for (var itrAttrId in TemplateNodes) {
                            var _oPrimarayAnswerModeInfo = TemplateNodes[itrAttrId].AnswerMode[0];

                            if (_oPrimarayAnswerModeInfo.ControlId == "MealControlId") {
                            }
                            else if (_oPrimarayAnswerModeInfo.ControlId == 'AddlAirlineControlId') {
                            }
                            else if (_oPrimarayAnswerModeInfo.Type == 'DDL' && _oPrimarayAnswerModeInfo.ControlId == 'MealMealTypeControlId') {

                            }
                            else if (_oPrimarayAnswerModeInfo.Type == 'DDL') {
                                var _oddl = $scope[_oPrimarayAnswerModeInfo.ControlId];
                                _oddl.Clear();
                            }
                            else if (_oPrimarayAnswerModeInfo.Type == 'Band') {
                                var _oddl = $scope[_oPrimarayAnswerModeInfo.ControlId];
                                _oddl.Clear();
                            }
                            else if (_oPrimarayAnswerModeInfo.ControlId == 'txtClassControlId') {
                            }
                            else if (_oPrimarayAnswerModeInfo.ControlId == 'DTETDControlId') {
                            }
                            else {
                                $scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = '';
                            }
                        }
                        OneViewConsole.Debug("ClearControls End", "CookingAndBlastChillingMonitoringFacade.GetBoutNCDataCaptureBO.ClearControls");
                    }
                    catch (Excep) {
                        throw Excep;
                    }
                }

                var oBOUTNCDataCaptureBO = new BOUTNCDataCaptureBO();

                OneViewConsole.Debug("GetBoutNCDataCaptureBO End", "CookingAndBlastChillingMonitoringFacade.GetBoutNCDataCaptureBO");

                return oBOUTNCDataCaptureBO;
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oBOUTNCDataCaptureBO = null;
            }
        }

        this.ShowNCFormAction = function (ControlId) {
            try {
                OneViewConsole.Debug("ShowNCFormAction Start", "TraySettingVerificationFacade.ShowNCFormAction");

                var TempOutNCTemplate = TemplateMetaData[ServiceId][_oDataCaptureBO.NCTemplateId];

                //if (DcId == null) {
                //    var oResolutionDetails = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtDecisionControlId', 'DataSourceModelName': 'ResolutionDetails', 'DisplayElementModelName': 'NewDCModel.txtDecisionControlId' });
                //    oResolutionDetails.AnswerModes(TempOutNCTemplate, 400);
                //}

                var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': _oDataCaptureBO.NCTemplateId, 'TemplateName': _oDataCaptureBO.NCTemplateName });

                //Edit case
                if (DcId != null) {
                    LoadNCddl();
                }

               //Save case
                else if (_oDataCaptureBO.FormActionCount <= 1) {
                    LoadNCddl();
                    _oNCDcDataCaptureBO.ClearControls(TempOutNCTemplate);
                }
                else {
                    LoadNCddl();
                }


                if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                }
                else if ($scope.DivContent == true && $scope.DivNGForm != true) {
                    var Title = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Title;
                    var Message = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Message;

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                        if (ConfirmationId == '2') {

                            $scope.DivNC = false;
                            $scope.DivNGForm = true;
                            $scope.ResolutionShow = false;
                            $scope.DivContent = false;
                            $scope.DivSignature = false;
                            $scope.DivNCSignature = false;
                            var RemovedNonConformityReportForm_Page = 'T304';
                            xlatService.setCurrentPage(RemovedNonConformityReportForm_Page);
                            _oDataCaptureBO.ClearAutoTempAndTime(ControlId);
                            //var SelectedTime = document.getElementById('DTETDControlId');
                            //SetTimeInFormat(SelectedTime, 'DTETDControlId');

                            scope.NewDCModel["DTETDControlId"] = scope.NewDCModel["DTETDControlId"];

                            $scope.$apply();
                        }
                        else {
                            MyInstance.ShowNCButton();
                            $scope.$apply();
                        }
                    });

                }



                OneViewConsole.Debug("ShowNCFormAction End", "TraySettingVerificationFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.ShowNCFormAction", xlatService);
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

        var LoadNCddl = function () {
            try {
                OneViewConsole.Debug("LoadNCddl Start", "TraySettingVerificationFacade.LoadNCddl");

                var DepartmentId = '';
                var DepartmentName = '';
                if ((($scope['ddlDepartmentControlId'] != undefined && $scope['ddlDepartmentControlId'].GetSelectedText() != undefined) && ($scope['ddlDepartmentControlId'].GetSelectedText() != ''))) {
                    //alert('LoadNCddl : ' + $scope['ddlDepartmentControlId'].GetSelectedText() + " : " + $scope['ddlDepartmentControlId'].GetSelectedValue());
                    DepartmentId = $scope['ddlDepartmentControlId'].GetSelectedValue();
                    DepartmentName = $scope['ddlDepartmentControlId'].GetSelectedText();

                }

                var SectionId = '';
                var SectionName = '';
                if ((($scope['ddlSectionControlId'] != undefined && $scope['ddlSectionControlId'].GetSelectedText() != undefined) && ($scope['ddlSectionControlId'].GetSelectedText() != ''))) {
                    //alert('LoadNCddl : ' + $scope['ddlDepartmentControlId'].GetSelectedText() + " : " + $scope['ddlDepartmentControlId'].GetSelectedValue());
                    SectionId = $scope['ddlSectionControlId'].GetSelectedValue();
                    SectionName = $scope['ddlSectionControlId'].GetSelectedText();

                }


                //enable dep section ddl start
                var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");
                var oDepartmentddl =
                    new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'ddlDepartmentControlId', 'DataSourceModelName': 'Department', 'DisplayElementModelName': 'NewDCModel.ddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Department, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 305, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged, 'IsDynamicElementCreationEnabled': false });
                oDepartmentddl.Clear();
                oDepartmentddl.SetDataSourceFromTreeChildsWithType(DCPlaceNodeId, DATEntityType.RCOMaster_Department, _TableNamesEnum.OrganizationAssetsNode);
                $scope.ddlDepartmentControlId = oDepartmentddl;

                if (DepartmentId != '' && DepartmentName != '') {
                    $scope['ddlDepartmentControlId'].Set({ Id: DepartmentId, Name: DepartmentName, "IsDynamicElement": false });

                    if (SectionId != '' && SectionName != '') {
                        $scope['ddlSectionControlId'].Set({ Id: SectionId, Name: SectionName, "IsDynamicElement": false });
                    }
                }
                else {

                    var oSectionddl =
                      new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'ddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.ddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 306, 'IsDynamicElementCreationEnabled': false });
                    oSectionddl.Clear();
                    oSectionddl.SetDataSourceFromTreeChildsWithType(DCPlaceNodeId, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);
                    $scope.ddlSectionControlId = oSectionddl;
                }
                //enable dep section ddl end
                OneViewConsole.Debug("LoadNCddl End", "TraySettingVerificationFacade.LoadNCddl");
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
                OneViewConsole.Debug("oDepartmentSelectedIndexChanged Start", "oChillerFreezerChecking.oDepartmentSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    var oSectionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'ddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.ddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'AttributeNodeId': 306 });
                    oSectionddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);


                    if (DcId == null || IsFirstTimeEdit == false) {
                        // oSectionddl.Clear();      
                        $scope['ddlSectionControlId'].Clear();
                    }
                }
                //else {
                //    var oSectionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'AttributeNodeId': 524});
                //    oSectionddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);

                //}

                OneViewConsole.Debug("oDepartmentSelectedIndexChanged End", "oChillerFreezerChecking.oDepartmentSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
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
                OneViewConsole.Debug("LoadAnswerModes Start", "TraySettingVerificationFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                var oDayMarker = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkDayMarker', 'DataSourceModelName': 'DayMarker', 'DisplayElementModelName': 'NewDCModel.chkDayMarker' });
                oDayMarker.AnswerModes(TemplateNodes, 324);

                var oProductStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oProductStatus.LoadNCOptions();

                var oCookingShift = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCookingShift', 'DataSourceModelName': 'CookingShiftOptions', 'DisplayElementModelName': 'NewDCModel.chkCookingShift' });
                oCookingShift.AnswerModes(TemplateNodes, 430);
               
                OneViewConsole.Debug("LoadAnswerModes End", "TraySettingVerificationFacade.LoadAnswerModes");
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
                OneViewConsole.Debug("CreateDynamicElements Start", "TraySettingVerificationFacade.CreateDynamicElements");

                    var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");
                    for (var i = 0; i < _DcResultDetailsEntityLst.length; i++) {
                        if (_DcResultDetailsEntityLst[i].IsDynamicAnswer == 'true') {
                            var ParentNodeId = DCPlaceNodeId;
                            var ParentDbElementType = DATEntityType.RCOMaster_Kitchen;
                            var ParentDbElementId = "0";
                           
                            var Response;
                            var _oDynamicElementBO = new DynamicElementBO();

                            if (_DcResultDetailsEntityLst[i].AttributeNodeId == 117)//for product
                            {
                                Response = _oDynamicElementBO.AddDynamicOrder(_DcResultDetailsEntityLst[i], ParentNodeId, ParentDbElementType, ParentDbElementId, LabelId, DATEntityType.RCO_WorkOrder);
                                _DcResultDetailsEntityLst[i].Answer = _DcResultDetailsEntityLst[i].AnswerValue;
                            }
                            else {
                                //add into Maaster and node
                                var oDefaultTreeDAO = new DefaultTreeDAO();
                                var ParentDbElement = oDefaultTreeDAO.GetNodeById(ParentNodeId, 'OrganizationAssetsNode');
                                ParentDbElementId = ParentDbElement[0].ChildDbElementId;
                                var LabelId = 1;

                                //Dated : 30-12-2015 : Commented, because unnecessary labels were created for each dynamic creation of Node
                                // Now we are creating only Node without Label
                                //Response = _oDynamicElementBO.AddDynamicRCOWithLabel(_DcResultDetailsEntityLst[i], ParentNodeId, ParentDbElementType, ParentDbElementId, LabelId);
                                Response = _oDynamicElementBO.AddDynamicRCO(_DcResultDetailsEntityLst[i], ParentNodeId, ParentDbElementType, ParentDbElementId);

                                _DcResultDetailsEntityLst[i].Answer = Response.NodeClientGuid;
                            }

                            
                        }
                    }

                OneViewConsole.Debug("CreateDynamicElements End", "TraySettingVerificationFacade.CreateDynamicElements");
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
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "TraySettingVerificationFacade.Temperature_NgKeyUp");

                if (IsNc == true) {
                    ShowNCStatus(AttributeId, ControlId);
                }
                var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.Temperature_NgKeyUp", xlatService);
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
                if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                    BindNCLoadDatas();
                    $scope.divShow = true;
                    // MyInstance.ShowNCFormAction('ATBlastChillerTempOutControlId');
                }

                OneViewConsole.Debug("ClearForm End", "TraySettingVerificationFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "TraySettingVerificationFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "TraySettingVerificationFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "TraySettingVerificationFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "TraySettingVerificationFacade.NormalizeNCEntityListData");
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

        var BindNCLoadDatas = function () {
            try {
                OneViewConsole.Debug("BindNCLoadDatas Start", "TraySettingVerificationFacade.BindNCLoadDatas");


                //enable dep section ddl start
                var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");

                var oDepartmentddl =
                    new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'ddlDepartmentControlId', 'DataSourceModelName': 'Department', 'DisplayElementModelName': 'NewDCModel.ddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Department, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 305, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged, 'IsDynamicElementCreationEnabled': false });
                oDepartmentddl.SetDataSourceFromTreeChildsWithType(DCPlaceNodeId, DATEntityType.RCOMaster_Department, _TableNamesEnum.OrganizationAssetsNode);
                $scope.ddlDepartmentControlId = oDepartmentddl;

                var oSectionddl =
                  new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'ddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.ddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 306, 'IsDynamicElementCreationEnabled': false });
                oSectionddl.SetDataSourceFromTreeChildsWithType(DCPlaceNodeId, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);
                $scope.ddlSectionControlId = oSectionddl;
                //enable dep section ddl start

                var TempOutNCTemplate = TemplateMetaData[ServiceId][_oDataCaptureBO.NCTemplateId];

                var oResolutionDetails = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtDecisionControlId', 'DataSourceModelName': 'ResolutionDetails', 'DisplayElementModelName': 'NewDCModel.txtDecisionControlId' });
                oResolutionDetails.AnswerModes(TempOutNCTemplate, 400);

                var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': _oDataCaptureBO.NCTemplateId, 'TemplateName': _oDataCaptureBO.NCTemplateName });
                _oNCDcDataCaptureBO.ClearControls(TempOutNCTemplate);
                var NCDCId = _oNCDcDataCaptureBO.GetNCDcID(DcId);
                if (NCDCId != undefined) {
                    _oNCDcDataCaptureBO.LoadEditPage(NCDCId, $scope);
                    _oDataCaptureBO.NCPreEditDataList = _oNCDcDataCaptureBO.PreEditValues;
                }
             
                OneViewConsole.Debug("BindNCLoadDatas End", "TraySettingVerificationFacade.BindNCLoadDatas");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                TempOutNCTemplate = null;
                _oNCDcDataCaptureBO = null;
                NCDCId = null;
            }
        }

        this.SetNCFormAction = function () {
            try {
                OneViewConsole.Debug("SetNCFormAction Start", "TraySettingVerificationFacade.SetNCFormAction");

                //$ionicSlideBoxDelegate.previous();
                if (OneViewSessionStorage.Get("NCInlineEdit") != 'true') {
                    $scope.DivNGForm = false;
                    $scope.ResolutionShow = false;
                    $scope.DivContent = true;
                    $scope.DivSignature = false;
                    $scope.DivNCSignature = false;
                    //   xlatService.setCurrentPage('TraySettingVerification');  
                    var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
                    xlatService.setCurrentPage(currentPage, true);

                }
                else if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                    oSetDefaultSpinner.Start();
                    var Status = _oDataCaptureBO.UpdateDC(DcId, undefined, _oDataCaptureBO.PreEditValues);
                    if (Status != false) {
                        OneViewSessionStorage.Remove("DcId");
                        OneViewSessionStorage.Remove("NCInlineEdit");
                        _oDataCaptureBO.DCNCMappingList = new Array();
                        _oDataCaptureBO.DeleteNCEventHandler = false;
                        $scope['DCBoutNCSignature_IsModified'] = '';
                        $scope['DCBoutNCSignature_SignaturePad'] = '';
                        $scope['DCBoutNCActionSignature_IsModified'] = '';
                        $scope['DCBoutNCActionSignature_SignaturePad'] = '';
                        $location.url('/ViewRecords');
                    }
                    oSetDefaultSpinner.Stop();
                }
                MyInstance.ShowNCButton();

                AttributeWiseActionDict = {};
                OneViewConsole.Debug("SetNCFormAction End", "TraySettingVerificationFacade.SetNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.SetNCFormAction", xlatService);
            }
            finally {
                Status = null;
            }
        }

        this.SaveSignature = function (ControlId, signaturePad, IsResolution) {
            try {
                OneViewConsole.Debug("SaveSignature Start", "TraySettingVerificationFacade.SaveSignature");              
                $scope[ControlId + '_IsModified'] = true;
                $scope[ControlId + '_SignaturePad'] = signaturePad.toDataURL();//signaturePad;
                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();                
                if (IsResolution != undefined && IsResolution == true) {
                    $scope.DivNGForm = false;
                    $scope.ResolutionShow = true;
                    $scope.lblResultionSignature = "Signed " + CurrenntDateAndTime;
                }
                else {
                    $scope.DivNGForm = true;
                    $scope.ResolutionShow = false;
                    $scope.lblSignature = "Signed " + CurrenntDateAndTime;
                }
                $scope.DivContent = false;
                $scope.DivSignature = false;
                $scope.DivNCSignature = false;
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

                OneViewConsole.Debug("SaveSignature End", "TraySettingVerificationFacade.SaveSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.SaveSignature", xlatService);
            }
            finally {
                oDateTime = null;
                CurrenntDateAndTime = null;
            }
        }

        this.ClearSignature = function (ControlId) {
            try {
                OneViewConsole.Debug("ClearSignature Start", "TraySettingVerificationFacade.ClearSignature");

                $scope[ControlId + '_IsModified'] = false;
                $scope[ControlId + '_SignaturePad'] = '';                

                OneViewConsole.Debug("ClearSignature End", "TraySettingVerificationFacade.ClearSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.ClearSignature", xlatService);
            }
        }

        this.Signature = function () {
            try {
                OneViewConsole.Debug("Signature Start", "TraySettingVerificationFacade.Signature");

                $scope.DivNGForm = true;
                $scope.ResolutionShow = false;
                $scope.DivContent = false;
                $scope.DivSignature = true;
                $scope.DivNCSignature = false;
                $timeout(function () {
                    SignatureContent();
                }, 100);


                OneViewConsole.Debug("Signature End", "TraySettingVerificationFacade.Signature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.Signature", xlatService);
            }
        }

        this.ActionSignature = function () {
            try {
                OneViewConsole.Debug("ActionSignature Start", "TraySettingVerificationFacade.ActionSignature");

                $scope.DivNGForm = true;
                $scope.ResolutionShow = false;
                $scope.DivContent = false;
                $scope.DivSignature = false;
                $scope.DivNCSignature = true;
                $timeout(function () {
                    ActionSignatureContent();
                }, 100);


                OneViewConsole.Debug("ActionSignature End", "TraySettingVerificationFacade.ActionSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.ActionSignature", xlatService);
            }
        }

        var SignatureContent = function () {
            try {
                OneViewConsole.Debug("SignatureContent Start", "TraySettingVerificationFacade.SignatureContent");

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
                    $scope.lblSignature = "";
                });

                saveButton.addEventListener("click", function (event) {
                    if (signaturePad.isEmpty()) {
                        alert("MN-RQ-NCF-001 :: Please provide signature first.");
                    } else {
                        MyInstance.SaveSignature('DCBoutNCSignature', signaturePad);
                    }
                });

                OneViewConsole.Debug("SignatureContent End", "TraySettingVerificationFacade.SignatureContent");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                wrapper = null;
            }
        }

        var ActionSignatureContent = function () {
            try {
                OneViewConsole.Debug("SignatureContent Start", "TraySettingVerificationFacade.SignatureContent");

                var wrapper = document.getElementById("ActionSignaturePad"),
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
                    MyInstance.ClearSignature('DCBoutNCActionSignature');
                    $scope.lblResultionSignature = "";
                });

                saveButton.addEventListener("click", function (event) {
                    if (signaturePad.isEmpty()) {
                        alert("MN-RQ-NCF-001 :: Please provide signature first.");
                    } else {
                        MyInstance.SaveSignature('DCBoutNCActionSignature', signaturePad, true);
                    }
                });

                OneViewConsole.Debug("SignatureContent End", "TraySettingVerificationFacade.SignatureContent");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                wrapper = null;
            }
        }

        this.ShowNCButton = function () {
            try {
                OneViewConsole.Debug("ShowNCButton Start", "TraySettingVerificationFacade.ShowNCButton");

                //if (($scope.NewDCModel.ATBlastChillerTempOutControlId > '5') || ($scope.NewDCModel.ATPreChillerTempOutControlId > '5') && $scope.NewDCModel.AddlProductControlId != '') {
                    $scope.DivNC = true;
                //}
                //else {
                //    $scope.DivNC = false;
                //}

                OneViewConsole.Debug("ShowNCButton End", "TraySettingVerificationFacade.ShowNCButton");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.ShowNCButton", xlatService);
            }
        }

        var SetTimeInFormat = function (SelectedTime, ControlId) {
            //if (SelectedTime != null) {
            //    var Time = SelectedTime.value;
            //    Time = Time.split(':');
            //    if (Time != "") {
            //        $scope.NewDCModel[ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
            //    }
            //}           
            $scope.NewDCModel[ControlId] = SelectedTime.value;
        }

        this.SetHygAvgrageReading = function () {
            try {
                OneViewConsole.Debug("SetHygAvgrageReading Start", "TraySettingVerificationFacade.SetHygAvgrageReading");

                _oDataCaptureBO.SetHygAvgrageReading();

                OneViewConsole.Debug("SetHygAvgrageReading End", "TraySettingVerificationFacade.SetHygAvgrageReading");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.ShowNCButton", xlatService);
            }
        }


        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.CustomNCClick", xlatService);
            }
        }
        this.PreControlEvents = function (AttributeId, ControlId, $event) {
            try {

                _oDataCaptureBO.PreControlEvents(AttributeId, ControlId, $event);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.PreControlEvents", xlatService);
            }
        }
        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.PostControlEvents", xlatService);
            }
        }
        this.ngChange_setDateTime = function (ControlId) {
            try {
                _oDataCaptureBO.ngChange_setDateTime(ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.ngChange_setDateTime", xlatService);
            }
        }
        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.ClearComments", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "TraySettingVerificationFacade.ProbeTesting", xlatService);
            }
        }
}


