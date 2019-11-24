
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
    
MyApp.controller('SamplingSheetaAndHandSwabAnalysisController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
    //oSetDefaultSpinner.Start();
        //xlatService.setCurrentPage('SamplingSheetAndHandswabAnalysis');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);
        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
	scope = $scope;
	oSnapRemote = snapRemote;


	var oSamplingSheetaAndHandSwabAnalysisFacade = new SamplingSheetaAndHandSwabAnalysisFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

	oSamplingSheetaAndHandSwabAnalysisFacade.Init();
	oSamplingSheetaAndHandSwabAnalysisFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
  
    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oSamplingSheetaAndHandSwabAnalysisFacade.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oSamplingSheetaAndHandSwabAnalysisFacade.Destroy();
        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oSamplingSheetaAndHandSwabAnalysisFacade.SetSelectedTextBoxColor(ControlId);
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
        oSamplingSheetaAndHandSwabAnalysisFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
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
        ////    oSamplingSheetaAndHandSwabAnalysisFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc);
        ////}

    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {

        $scope.DisableSave = true;
        $scope.DisableSaveSubmit = true;
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oSamplingSheetaAndHandSwabAnalysisFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, Timeout);
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
        oSamplingSheetaAndHandSwabAnalysisFacade.ClearForm();
    }
    $scope.$on('$destroy', function () {

        //oOneViewAppInfoPlugin.ClearCache();
        //$location.replace(); //clear last history route
        //$templateCache.removeAll();

        //  ClearGlobalVariable();
        oSamplingSheetaAndHandSwabAnalysisFacade.Destroy();
        scope = null;
        ionicBackdrop = null;
        oSamplingSheetaAndHandSwabAnalysisFacade = null;
        $scope = null;
       
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oSamplingSheetaAndHandSwabAnalysisFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oSamplingSheetaAndHandSwabAnalysisFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oSamplingSheetaAndHandSwabAnalysisFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.SaveDCRecords(true);
    }



    $scope.CustomNCClick = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.ProbeTesting();
    };
    $scope.ClearReasons = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.ClearComments();
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


    $scope.ShowAnalysisForm = function () {
        oSamplingSheetaAndHandSwabAnalysisFacade.ShowAnalysisForm();
    }

    $scope.ShowSamplingSheet = function () {
        $scope.FoodAnalysisShow = false;
        $scope.SampleSheetHide = false;
        $scope.DisableBack = false;
    }
           
    $scope.UpdateParameterTestedCompletedStatus = function (BandDetailId) {
        oSamplingSheetaAndHandSwabAnalysisFacade.UpdateParameterTestedCompletedStatus(BandDetailId);
    }


    $scope.Signature = function (SignatureControlID) {
        // alert(SignatureControlID)
        oSamplingSheetaAndHandSwabAnalysisFacade.Signature(SignatureControlID);
    }

});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function SamplingSheetaAndHandSwabAnalysisFacade(parm) {

    try {
        OneViewConsole.Debug("SamplingSheetaAndHandSwabAnalysisFacade Start", "Facade.ThawingVerificationFacade");

        var Microbiology_HandSwabLabelId = 9;
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
       // var DcProfileId = 1;
        var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
        var DcPlaceName = OneViewSessionStorage.Get("DcPlaceName");
        var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
        var LoginUserName = OneViewSessionStorage.Get("LoginUserName");
        var DcId = OneViewSessionStorage.Get("DcId");
        var DcProfileId = OneViewSessionStorage.Get("DcProfileId");
        var DcOccurence = OneViewSessionStorage.Get("DcOccurence");


        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
      
      //  var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("SamplingSheetaAndHandSwabAnalysisFacade End", "Facade.ThawingVerificationFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.SamplingSheetaAndHandSwabAnalysisFacade", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "SamplingSheetaAndHandSwabAnalysisFacade.Init");

                    $scope.NewDCModel = {};
                    // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];
                   
                    $scope.ParameterTested = [];
                    $scope.GeneralAppearance = [];
                    $scope.ActualValueEcoli = [];

                    $scope.ShiftOptions = [];
                    
                    $scope.NCOptions = [];
                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                    OneViewConsole.Debug("Init End", "SamplingSheetaAndHandSwabAnalysisFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.Init", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "SamplingSheetaAndHandSwabAnalysisFacade.PageLoad");

                    AutoCompleteGenerateHTML();
                    Loadddl();
                    LoadDefaultValueMetaData();
                    _oDataCaptureBO.LoadShift();
                     LoadAnswerModes();
                    _oDataCaptureBO.ClearControls();
                    _oDataCaptureBO.SetMandatoryMetaData();

                   // todo : check with pallav and solve document,getelementbyid page load issue
                    _oDataCaptureBO.SetControlEnableStatus();

                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.ATFoodTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTStartingTimeInControlId';
                   // _oNCComponent.Init();
                    _oCPActionNCComponent.Init();

                   //SetSelectedTextBoxColor_Private('ATFoodTempControlId');

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
                        RefreshParameterTested();
                    }

                    ///AuditSummary
                    _oDataCaptureBO.ShowDCSummary();
                    _oSettingsBO.ShowAutoManualStatus($scope);

                    //SetAnalysedby();

                    new OnewViewEventListener().RegisterSelectedFieldEvent();

                OneViewConsole.Debug("PageLoad End", "SamplingSheetaAndHandSwabAnalysisFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.PageLoad", xlatService);
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "SamplingSheetaAndHandSwabAnalysisFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "SamplingSheetaAndHandSwabAnalysisFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "SamplingSheetaAndHandSwabAnalysisFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'ATSampleCollectionTempControlId') {
                    $scope.ATSampleCollectionTempControlId = 'highlight';
                    $scope.ATAmbientTempControlId = '';
                    $scope.ATLabChillerTempControlId = '';
                    $scope.ATReceivingTemperatureControlId = '';
                }
                else if (ControlId == 'ATAmbientTempControlId') {
                    $scope.ATSampleCollectionTempControlId = '';
                    $scope.ATAmbientTempControlId = 'highlight';
                    $scope.ATLabChillerTempControlId = '';
                    $scope.ATReceivingTemperatureControlId = '';
                }
                else if (ControlId == 'ATLabChillerTempControlId') {
                    $scope.ATSampleCollectionTempControlId = '';
                    $scope.ATAmbientTempControlId = '';
                    $scope.ATLabChillerTempControlId = 'highlight';
                    $scope.ATReceivingTemperatureControlId = '';
                }
                else if (ControlId == 'ATReceivingTemperatureControlId') {
                    $scope.ATSampleCollectionTempControlId = '';
                    $scope.ATAmbientTempControlId = '';
                    $scope.ATLabChillerTempControlId = '';
                    $scope.ATReceivingTemperatureControlId = 'highlight';
                }
                

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "SamplingSheetaAndHandSwabAnalysisFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "SamplingSheetaAndHandSwabAnalysisFacade.BindNc");

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

                OneViewConsole.Debug("BindNc End", "SamplingSheetaAndHandSwabAnalysisFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "SamplingSheetaAndHandSwabAnalysisFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "SamplingSheetaAndHandSwabAnalysisFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "SamplingSheetaAndHandSwabAnalysisFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "SamplingSheetaAndHandSwabAnalysisFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "SamplingSheetaAndHandSwabAnalysisFacade.SaveDCRecords");

                var IsValidToSave = _oDataCaptureBO.ValidateDcByOccurence();

                if (IsValidToSave == true) {
                    _oDataCaptureBO.CreateDynamicElementHandler = CreateDynamicElements;
                }
                    if (DcId != null) {
                        var Status = _oDataCaptureBO.UpdateDC(DcId, undefined, _oDataCaptureBO.PreEditValues, IsSubmit);
                        if (Status != false) {
                            OneViewSessionStorage.Remove("DcId");
                            $location.url('/ViewRecords');
                        }
                    }
                    else {
                        if (IsValidToSave == true) {
                            _oDataCaptureBO.SaveDC(IsSubmit);
                            RefreshParameterTested();
                        }

                        else {
                            _oDataCaptureBO.ClearControls(scope, TemplateNodes);
                            alert('IN-MG-SPH-001 :: Data Capture Profiles are expired ');
                        }

                        $scope["AddlUnsatisfactoryExpectedConditionsControlId"].Clear();
                        $scope.divExpectedConditions = false;
                    }
                    _oDataCaptureBO.ShowDCSummary();
                    // SetSelectedTextBoxColor_Private('txtTempControlId');

                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeCheckedControlId';
                    //SetAnalysedby();
                
                OneViewConsole.Debug("SaveDCRecords End", "SamplingSheetaAndHandSwabAnalysisFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.SaveDCRecords", xlatService);
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

                //alert(EventArgs.attributes['AttributeNodeId'].value  + ' EventArgs : ' + EventArgs.attributes['Id'].value + "," + EventArgs.attributes['type'].value);

                // alert(EventArgs.attributes['AttributeNodeId'].value);
                //alert('controlId ' + EventArgs.attributes['name'].value);

                //NC Component code
                MyInstance.Temperature_NgKeyUp(EventArgs.attributes['AttributeNodeId'].value, EventArgs.attributes['name'].value, '');

                ShowHideTextBox(EventArgs.attributes['AttributeNodeId'].value, EventArgs.attributes['Id'].value, EventArgs.attributes['type'].value);

            }
            catch (Excep) {
                alert('Excep OneViewAdvAutoCompleteTest :' + Excep + JSON.stringify(Excep))
                throw Excep;
            }
        }

        var ShowHideTextBox = function (AttributeNodeId, value, text) {
            try {
                //alert('AttributeNodeId : ' + AttributeNodeId + " ,value :" + value);
                if (AttributeNodeId == 1390) {
                    // if (value == 65700) { //put others id
                    if (text == "Others") {
                        //show textbox
                        $scope.OthersShow = true;
                    }
                    else {
                        //hide textbox
                        $scope.OthersShow = false;
                        scope.NewDCModel.txtOthersControlId = "";
                    }
                }
                else if (AttributeNodeId == 1393) {
                    // if (value == 65701) { //put others id
                    if (text == "Others") {
                        //show textbox
                        $scope.OthersAreaConditionShow = true;
                    }
                    else {
                        //hide textbox
                        $scope.OthersAreaConditionShow = false;
                        scope.NewDCModel.txtOthersAreaConditionControlId = "";
                    }
                }
                else if (AttributeNodeId == 1397) {
                    //if (value == 65702) { //put others id
                    if (text == "Others") {
                        //show textbox
                        $scope.OthersSampleReceiptShow = true;
                    }
                    else {
                        //hide textbox
                        $scope.OthersSampleReceiptShow = false;
                        scope.NewDCModel.txtOthersSampleReceiptControlId = "";
                    }
                }
                else if (AttributeNodeId == 1400) {
                    //if (value == 65702) { //put others id
                    if (text == "Others") {
                        //show textbox
                        $scope.OthersSampleAnalysisShow = true;
                    }
                    else {
                        //hide textbox
                        $scope.OthersSampleAnalysisShow = false;
                        scope.NewDCModel.txtOthersSampleAnalysisControlId = "";
                    }
                }
                else {
                    //hide textbox
                    $scope.OthersShow = false;
                    $scope.OthersAreaConditionShow = false;
                    $scope.OthersSampleReceiptShow = false;
                    $scope.OthersSampleAnalysisShow = false;
                }
            }
            catch (Excep) {
                //alert('Excep ShowHideTextBox :' + Excep + JSON.stringify(Excep))
                throw Excep;
            }
        }

        var AutoCompleteCloseClick = function () {
            try {
               // alert('AutoCompleteCloseTest OneViewAdvAutoCompleteTest hi here');
                //Autocomplete code
                AutoCompleteClose();

                var ControlId = document.getElementById('txtAutoCompleteSearch').getAttribute("SearchControlId");
                var AttributeNodeId = document.getElementById('txtAutoCompleteSearch').getAttribute("AttributeNodeId");

                //alert('AutoCompleteCloseTest ControlId' + ControlId);
                //alert('AttributeNodeId' + AttributeNodeId);

                //NC Component code
                MyInstance.Temperature_NgKeyUp(AttributeNodeId, ControlId, '');

                ShowHideTextBox(AttributeNodeId);
            }
            catch (Excep) {
                // alert('Excep AutoCompleteCloseClick :' + Excep + JSON.stringify(Excep))
                throw Excep;
            }
        }



        var Loadddl = function () {
            try {

                OneViewConsole.Debug("Loadddl Start", "SamplingSheetaAndHandSwabAnalysisFacade.Loadddl");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;

                var oExpectedConditionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlUnsatisfactoryExpectedConditionsControlId', 'DataSourceModelName': 'ExpectedConditions', 'DisplayElementModelName': 'NewDCModel.AddlUnsatisfactoryExpectedConditionsControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ExpectedConditions, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8536 });
                oExpectedConditionsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_ExpectedConditions, _TableNamesEnum.OrganizationAssetsNode);

                var oUnitsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlUnitControlId', 'DataSourceModelName': 'Units', 'DisplayElementModelName': 'NewDCModel.AddlUnitControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Kitchen, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1811, 'SelectedIndexChangedEventHandler': oUnitsSelectedIndexChanged });
                oUnitsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Kitchen, _TableNamesEnum.OrganizationAssetsNode);

                var oDepartmentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1812, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
                //oDepartmentsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyDepartment, _TableNamesEnum.OrganizationAssetsNode);

                var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1813, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });
                //oSectionsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);

                var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1814 });
                //oLocationddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation1ControlId', 'DataSourceModelName': 'Evaluation1', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1828, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation2ControlId', 'DataSourceModelName': 'Evaluation2', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1832, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);


                var oOverallEvaluationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlOverAllEvaluationControlId', 'DataSourceModelName': 'OverallEvaluation1', 'DisplayElementModelName': 'NewDCModel.AddlOverAllEvaluationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8762, 'SelectedIndexChangedEventHandler': oOverallEvaluationSelectedIndexChanged });
                oOverallEvaluationddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oAnalyzedByUserddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtConductedByControlId', 'DataSourceModelName': 'AnalyzedByUser', 'DisplayElementModelName': 'NewDCModel.txtConductedByControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_AnalyzedByUser, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1835 });
                oAnalyzedByUserddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_AnalyzedByUser, _TableNamesEnum.OrganizationAssetsNode);
                oAnalyzedByUserddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'DCSignature', ColumnNames: ['Column1'], Seperater: '-' });


                OneViewConsole.Debug("Loadddl End", "SamplingSheetaAndHandSwabAnalysisFacade.Loadddl");
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
                OneViewConsole.Debug("SamplingSheetAndWaterAnalysisControllerFacade Start", "SamplingSheetAndWaterAnalysisControllerFacade.oUnitsSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    var oDepartmentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1812, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
                    //oDepartmentsddl.SetDataSourceFromTreeChildsWithTypeAndLabel(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyDepartment, _TableNamesEnum.OrganizationAssetsNode, Microbiology_HandSwabLabelId);
                    oDepartmentsddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyDepartment, _TableNamesEnum.OrganizationAssetsNode);


                    if (DcId == null || IsFirstTimeEdit == false) {

                        $scope['AddlDepartmentControlId'].Clear();
                        $scope['AddlSectionControlId'].Clear();
                        $scope['AddlLocationControlId'].Clear();
                        SetSampleNumber();
                    }
                }
                else {
                    var oDepartmentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1812, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
                    $scope['AddlDepartmentControlId'].Clear();
                    $scope['AddlSectionControlId'].Clear();
                    $scope['AddlLocationControlId'].Clear();

                }


                OneViewConsole.Debug("oSamplingSheetAndWaterAnalysisControllerFacade End", "oSamplingSheetAndWaterAnalysisControllerFacade.oUnitsSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }

        var oDepartmentSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("SamplingSheetAndWaterAnalysisControllerFacade Start", "SamplingSheetAndWaterAnalysisControllerFacade.oDepartmentSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {


                    var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1813, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });
                    oSectionsddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologySection, _TableNamesEnum.OrganizationAssetsNode);
                    //oSectionsddl.SetDataSourceFromTreeChildsWithTypeAndLabel(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologySection, _TableNamesEnum.OrganizationAssetsNode, Microbiology_HandSwabLabelId);

                    if (DcId == null || IsFirstTimeEdit == false) {

                        $scope['AddlSectionControlId'].Clear();
                        $scope['AddlLocationControlId'].Clear();
                        SetSampleNumber();
                    }
                }
                else {
                    var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1813, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });

                    $scope['AddlSectionControlId'].Clear();
                    $scope['AddlLocationControlId'].Clear();

                }


                OneViewConsole.Debug("oSamplingSheetAndWaterAnalysisControllerFacade End", "oSamplingSheetAndWaterAnalysisControllerFacade.oDepartmentSelectedIndexChanged");
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
                OneViewConsole.Debug("SamplingSheetAndWaterAnalysisControllerFacade Start", "SamplingSheetAndWaterAnalysisControllerFacade.oSectionSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {


                    var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1814 });
                    oLocationddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);
                    //oLocationddl.SetDataSourceFromTreeChildsWithTypeAndLabel(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode, Microbiology_HandSwabLabelId);

                    if (DcId == null || IsFirstTimeEdit == false) {
                        $scope['AddlLocationControlId'].Clear();
                        SetSampleNumber();
                    }
                    
                }
                else {
                    var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1814 });

                    $scope['AddlLocationControlId'].Clear();
                }


                OneViewConsole.Debug("oSamplingSheetAndWaterAnalysisControllerFacade End", "oSamplingSheetAndWaterAnalysisControllerFacade.oSectionSelectedIndexChanged");
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
                
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "SamplingSheetaAndHandSwabAnalysisFacade.Temperature_NgKeyUp");
                // this.PostControlEvents(AttributeId, ControlId);
                // _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);

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

                            ValidateActionNC(RefreshAttributeId, RefreshcontrolId)
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

                if (ControlId == "chkParameterTested") {
                    // alert(ControlId);145,146
                    MyInstance.UpdateParameterTestedCompletedStatus(145);
                    MyInstance.UpdateParameterTestedCompletedStatus(146);
                

                }
                OneViewConsole.Debug("Temperature_NgKeyUp End", "SamplingSheetaAndHandSwabAnalysisFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
               // alert('Temperature_NgKeyUp Excep : ' + Excep)
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.Temperature_NgKeyUp", xlatService);
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
            
                OneViewConsole.Debug("ValidateActionNC Start", "SamplingSheetaAndHandSwabAnalysisFacade.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "SamplingSheetaAndHandSwabAnalysisFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "SamplingSheetaAndHandSwabAnalysisFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "SamplingSheetaAndHandSwabAnalysisFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "SamplingSheetaAndHandSwabAnalysisFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "SamplingSheetaAndHandSwabAnalysisFacade.EvaluateActionNCStatus");
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
                OneViewConsole.Debug("ShowNCFormAction Start", "SamplingSheetaAndHandSwabAnalysisFacade.ShowNCFormAction");

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



                OneViewConsole.Debug("ShowNCFormAction End", "SamplingSheetaAndHandSwabAnalysisFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.ShowNCFormAction", xlatService);
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
                OneViewConsole.Debug("LoadAnswerModes Start", "SamplingSheetaAndHandSwabAnalysisFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                var oParameterTested = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkParameterTested', 'DataSourceModelName': 'ParameterTested', 'DisplayElementModelName': 'NewDCModel.chkParameterTested' });
                oParameterTested.AnswerModes(TemplateNodes, 1824);

                var oGeneralAppearance = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkGeneralAppearance', 'DataSourceModelName': 'GeneralAppearance', 'DisplayElementModelName': 'NewDCModel.chkGeneralAppearance' });
                oGeneralAppearance.AnswerModes(TemplateNodes, 1821);

                var oActualValue = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtActualValue2ControlId', 'DataSourceModelName': 'ActualValueEcoli', 'DisplayElementModelName': 'NewDCModel.txtActualValue2ControlId' });
                oActualValue.AnswerModes(TemplateNodes, 1830);

                var oNCOptions = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oNCOptions.LoadNCOptions();

                OneViewConsole.Debug("LoadAnswerModes End", "SamplingSheetaAndHandSwabAnalysisFacade.LoadAnswerModes");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oMeals = null;
                oMealsType = null;
            }
        }

        var oFoodAnalysisSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("SamplingSheetAndAirAnalysisControllerFacade Start", "SamplingSheetAndAirAnalysisControllerFacade.oUnitsSelectedIndexChanged");


                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {

                    // alert('oFoodAnalysisSelectedIndexChanged');

                    var AnswerModeData = TemplateNodes[1418];
                    var FoodAnalysisType = scope.AddlFoodAnalysisTypeControlId.GetSelectedText();

                    var BandDetailsData = BandDetailsForFoodProducts(FoodAnalysisType);


                    scope['ParameterTested'] = [];
                    for (var itrBand in BandDetailsData) {
                        if (BandDetailsData[itrBand].Name == "TVB") {
                            scope.NewDCModel["txtMaxCriteria1ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        else if (BandDetailsData[itrBand].Name == "Coliforms") {
                            scope.NewDCModel["txtMaxCriteria2ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        else if (BandDetailsData[itrBand].Name == "E.coli") {
                            scope.NewDCModel["txtMaxCriteria3ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        else if (BandDetailsData[itrBand].Name == "S.aureus") {
                            scope.NewDCModel["txtMaxCriteria4ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        else if (BandDetailsData[itrBand].Name == "B.cereus") {
                            scope.NewDCModel["txtMaxCriteria5ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        else if (BandDetailsData[itrBand].Name == "V.parahaemolyticus") {
                            scope.NewDCModel["txtMaxCriteria6ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        else if (BandDetailsData[itrBand].Name == "Salmonella") {
                            scope.NewDCModel["txtMaxCriteria7ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        else if (BandDetailsData[itrBand].Name == "Listeria monocytogenes") {
                            scope.NewDCModel["txtMaxCriteria8ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        else if (BandDetailsData[itrBand].Name == "Clostridium perfringens") {
                            scope.NewDCModel["txtMaxCriteria9ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        else if (BandDetailsData[itrBand].Name == "YMC") {
                            scope.NewDCModel["txtMaxCriteria10ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        else if (BandDetailsData[itrBand].Name == "Campylobacter") {
                            scope.NewDCModel["txtMaxCriteria11ControlId"] = BandDetailsData[itrBand].MaxLimt;
                        }
                        scope['ParameterTested'].push({ Id: BandDetailsData[itrBand].Value, Name: BandDetailsData[itrBand].Name, 'AttributeNodeId': 1418, ControlId: 'chkParameterTested', ColourIndex: BandDetailsData[itrBand].ColourIndex, 'DefaultBackgroundColour': BandDetailsData[itrBand].DefaultBackgroundColour, Selected: false })
                    }
                }
                else {


                }


                OneViewConsole.Debug("oSamplingSheetAndAirAnalysisControllerFacade End", "oSamplingSheetAndAirAnalysisControllerFacade.oUnitsSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }

        var MandatoryColor = "#FF8000";
        var OptionalColor = "#F3F781";

        var BandDetailsForFoodProducts = function (FoodAnalysisType) {
            var Band = {
                "Poultry": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^5 / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' }
                    //  4: { 'Name': 'YMC', 'Value': 131, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor },
                },
                "Meat": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^5 / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' },
                    4: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^3 / gm' }
                    //  5: { 'Name': 'YMC', 'Value': 131, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor },
                },
                "Fish and Shell Fish": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^5 / gm' },
                    2: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25 gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' },
                    5: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' }
                },
                "Pasteurized Frozen Whole Egg and Egg Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^4 / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    5: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    6: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' },
                    7: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / gm' }
                },
                "Dried Food to be cooked": {
                    1: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100 / gm' },
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "U.H.T. Milk, Cream Dairy Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / ml.' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' }
                },
                "Cream and Dairy Products": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm or ml.' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm or ml.' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm or ml.' },
                    5: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm or ml.' },
                    6: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Pasteurized Milk and Cream. Other Pasteurized Milk Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^4 / ml.' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 / ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' },
                    4: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / ml.' },
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Cream with added flavours": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^4 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' }
                },
                "Whipped Cream": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^4 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Fermented Cream": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / ml.' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm ' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Ice Cream": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2.5 x 10^4 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Processed Cheese": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D /gm' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' }
                },
                "Soft Cheese": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Hard, Semi-Hard Cheese (Un-processed)": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                "Preserved Food (Heat Treated)": {
                    1: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' },
                    5: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Seafood Dried": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^4 / gm' },
                    2: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25 gm' },
                    3: { 'Name': 'E.coll', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D /gm' }
                },
                "Canned, Pouched or Bottled Food": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10 / gm' }
                },
                "Dried Heat Processed Foods": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D /gm' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' },
                    5: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' }
                },
                "Dried Heat Processed Foods (Ready to Eat after Rehydration)": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    5: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    6: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' }
                },
                "Dried Raw Foods (Ready to Eat)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100,000 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Non-Dairy Fats & Oils": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                "Different Types of Chocolates": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                //24. Honey :not added
                "Molasses, Hard Brown Sugar": {
                    1: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Dyes (Food Colours)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^3/ gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Yeast": {
                    1: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Gelatin": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5x 10^3 / gm' },
                    2: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    3: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' }
                },
                "Margarine": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Tea & Coffee": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '0 / gm' }
                },
                "Soft Drinks and Alcoholic Beverages": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / ml.' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 / ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' }
                },
                "Jam, Jelly and Marmalade, Fruit in Syrup": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                "Starch – i.e. Corn Flour": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' }
                },
                "Vinegar": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '3 x 10 ml.' }
                },
                "Bread": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' }
                },
                "Bottled Water / Ice / Tap Water": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100ml.' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100ml' }
                },
                "Bottled Water": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100ml' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100ml' },
                    3: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '1000 / 100 ml' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent / 100 ml' }
                },
                "Unsanitized Vegetables/Fruits/Salads": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25gm' }
                },
                "Sanitized Vegetables": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                "Sanitized Fruit and Fruit Juices": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25gm' }
                },
                "Pasteurized Fruit Juices": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^3 / gm or ml' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm or ml' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm or ml' },
                    4: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / ml.' }
                },
                "Part Cooked Foods": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '3 x 10^4/ gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<20 / gm' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^3 / gm' }
                },
                "Mayonnaise, Mustard Sauces": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5x 10^3 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / ml' },
                    5: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / ml.' },
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Cooked Sea Food": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^3 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25 gm' },
                    5: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' }
                },
                "Caviar": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25 gm' }
                },
                "Cooked Poultry and Poultry Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5/ gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    5: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Processed Foods :- (Ready to Eat)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5000 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "Desserts": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^4 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' }
                },
                "Sauce (In House)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^3/ gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' }
                },
                "Salad Dressings (In House)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^3/ gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm ' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / ml' },
                    5: { 'Name': 'S.aureus', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / ml' },
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                }
            }

            if (IsFirstTimeEdit != true) {
                ClearParameterTested();
            }

            RefreshParameterTested();

            return Band[FoodAnalysisType];
        }

        var CreateDynamicElements = function (_DcResultDetailsEntityLst) {
            try {

                OneViewConsole.Debug("CreateDynamicElements Start", "SamplingSheetaAndHandSwabAnalysisFacade.CreateDynamicElements");

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

                OneViewConsole.Debug("CreateDynamicElements End", "SamplingSheetaAndHandSwabAnalysisFacade.CreateDynamicElements");
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
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "SamplingSheetaAndHandSwabAnalysisFacade.Temperature_NgKeyUp");

                if (IsNc == true) {
                    ShowNCStatus(AttributeId, ControlId);
                }

                var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var ShowNCStatusOLD = function (AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "SamplingSheetaAndHandSwabAnalysisFacade.ShowNCStatus");

                var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
                NormalizeNCEntityListData(DCNCMappingListData);

                OneViewConsole.Debug("ShowNCStatus End", "SamplingSheetaAndHandSwabAnalysisFacade.ShowNCStatus");
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
                OneViewConsole.Debug("ClearForm Start", "SamplingSheetaAndHandSwabAnalysisFacade.ClearForm");


                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                oOneViewCordovaPlugin.DefaultConfirmBox("Confirmation", "MN-RQ-SPH-015 :: Are you sure you want to clear the data ?", function (ConfirmationId) {


                    if (ConfirmationId == "2") {
                        _oDataCaptureBO.ClearControls();
                        if (DcId != null) {
                            _oDataCaptureBO.LoadEditPage(DcId, $scope);
                        }
                        else {
                            _oDataCaptureBO.setDefaultValue();
                            RefreshParameterTested();
                        }
                        //SetAnalysedby();
                        scope.$apply();
                    }


                });
                OneViewConsole.Debug("ClearForm End", "SamplingSheetaAndHandSwabAnalysisFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "SamplingSheetaAndHandSwabAnalysisFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "SamplingSheetaAndHandSwabAnalysisFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "SamplingSheetaAndHandSwabAnalysisFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "SamplingSheetaAndHandSwabAnalysisFacade.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.PreControlEvents", xlatService);
            }
        }

        this.ngChange_setDateTime = function (ControlId) {
            try {
                _oDataCaptureBO.ngChange_setDateTime(ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.ngChange_setDateTime", xlatService);
            }
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


        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.ProbeTesting", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.ClearComments", xlatService);
            }
        }

        this.Destroy = function () {
            try {
                _oDataCaptureBO.Destroy();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.Destroy", xlatService);
            }
        }

        this.ShowAnalysisForm = function () {
            try {
                
                if (ShowAnalysisValidation()) {

                    $scope.FoodAnalysisShow = true;
                    $scope.SampleSheetHide = true;
                    $scope.DisableBack = true;
                    MyInstance.UpdateParameterTestedCompletedStatusForEdit();
               }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.ShowAnalysisForm", xlatService);
            }
        }

        var ShowAnalysisValidation = function () {
            try {
                var IsSuccess = true;

               
                var CommonMessage = "MN-RQ-SPH-003 :: Please enter ";
                var ErrorMessage = "";
              
                var IsSuccess = true;
               
                if (scope.NewDCModel.txtSamplingNoControlId == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Sample No.";
                    IsSuccess = false;
                }
                if (scope.NewDCModel.txtStaffNameControlId == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Staff Name";
                    IsSuccess = false;
                }
                if (scope.NewDCModel.txtStaffNumberControlId == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Staff Number";
                    IsSuccess = false;
                }               
                //if (scope.NewDCModel.txtOthersLocationControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Others";
                //    IsSuccess = false;
                //}
                //if (scope.NewDCModel.txtRemarksControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Remarks";
                //    IsSuccess = false;
                //}                                                      

                if (IsSuccess == false) {
                    alert(CommonMessage+" "+ErrorMessage);
                }
               
                return IsSuccess;
                
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.ShowAnalysisValidation", xlatService);
            }
        }

        var RefreshParameterTested = function () {
            try {

                //var _oOneViewSampleGenerator = new OneViewSampleGenerator();
                //var SampleNumber = _oOneViewSampleGenerator.GetNewSampleNumber("H");
                //scope.NewDCModel["txtSamplingNoControlId"] = SampleNumber;

                SetSampleNumber();

                scope.NewDCModel["txtMaxCriteria1ControlId"] = "<20/swab ";
                scope.NewDCModel["txtMaxCriteria2ControlId"] = "ND/swab";
                

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.RefreshParameterTested", xlatService);
            }
        }

        var ClearParameterTested = function () {

            try {
                OneViewConsole.Debug("ClearParameterTested Start", "SamplingSheetaAndHandSwabAnalysisFacade.ClearParameterTested");

                var FoodProducts = ["Tvb", "Salmonella", "Ecoll", "Coliforms", "Saureus", "Bcereus", "Vparahaemolyticus", "Listeria", "Clostridium", "Ymc", "Campylobacter"];

                for (var j = 0; j < FoodProducts.length; j++) {
                    
                    var ControlInfo = _oDataCaptureBO.GetFoodAnalysisControlInfo(FoodProducts[j]);

                    for (var i = 0; i < ControlInfo.length; i++) {

                        if (ControlInfo[i].Type == "TEXTBOX") {
                            if ($scope.NewDCModel[ControlInfo[i].ControlId] != undefined) {
                                $scope.NewDCModel[ControlInfo[i].ControlId] = "";
                            }
                        }
                        else if (ControlInfo[i].Type == "DDL") {
                            if ($scope[ControlInfo[i].ControlId] != undefined) {
                                $scope[ControlInfo[i].ControlId].Clear();
                            }
                        }
                    }
                }

                OneViewConsole.Debug("ClearParameterTested End", "SamplingSheetaAndHandSwabAnalysisFacade.ClearParameterTested");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
            }
        }
        var oEvaluationSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oEvaluationSelectedIndexChanged Start", "SamplingSheetaAndHandSwabAnalysisFacade.oEvaluationSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                }

                OneViewConsole.Debug("oEvaluationSelectedIndexChanged End", "SamplingSheetAndWaterAnalysisController.oEvaluationSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }

        var oOverallEvaluationSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oOverallEvaluationSelectedIndexChanged Start", "SamplingSheetAndAirAnalysisControllerFacade.oOverallEvaluationSelectedIndexChanged");

                var remarks = "";
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {

                    if (EventArgs.NewValue.Name == "P") {
                        remarks = "Required Standards of Quality are met.";
                    }
                    else if (EventArgs.NewValue.Name == "F") {
                        remarks = "Required Standards of Quality are not met. To be followed up.";
                    }

                }

                $scope.NewDCModel.txtOverAllEvaluationRemarksControlId = remarks;


                OneViewConsole.Debug("oOverallEvaluationSelectedIndexChanged End", "SamplingSheetAndAirAnalysisControllerFacade.oOverallEvaluationSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }


        this.UpdateParameterTestedCompletedStatusForEdit = function () {

            try {
                OneViewConsole.Debug("UpdateParameterTestedCompletedStatusForEdit Start", "SamplingSheetaAndHandSwabAnalysisFacade.UpdateParameterTestedCompletedStatusForEdit");

                var BanDetails = [145,146];

                for (var i = 0; i < BanDetails.length; i++) {
                    MyInstance.UpdateParameterTestedCompletedStatus(BanDetails[i]);
                }

                OneViewConsole.Debug("UpdateParameterTestedCompletedStatusForEdit End", "SamplingSheetaAndHandSwabAnalysisFacade.UpdateParameterTestedCompletedStatusForEdit");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetaAndHandSwabAnalysisFacade.UpdateParameterTestedCompletedStatusForEdit", xlatService);
            }
            finally {
            }
        }

        this.UpdateParameterTestedCompletedStatus = function (BandDetailId) {

            try {
                OneViewConsole.Debug("UpdateParameterTestedCompletedStatus Start", "SamplingSheetAndWaterAnalysisControllerFacade.UpdateParameterTestedCompletedStatus");

                var FoodAnalysisProducts = ["Staph", "Ecoli"];
                var ControlInfo = _oDataCaptureBO.GetHandSwabAnalysisControlInfo(FoodAnalysisProducts[BandDetailId - 145]);

                _oDataCaptureBO.CheckCompletedStatusForParameterTested(ControlInfo, BandDetailId);

                OneViewConsole.Debug("UpdateParameterTestedCompletedStatus End", "SamplingSheetAndWaterAnalysisControllerFacade.UpdateParameterTestedCompletedStatus");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndWaterAnalysisControllerFacade.UpdateParameterTestedCompletedStatus", xlatService);
            }
            finally {
            }
        }

        var SetAnalysedby = function () {
            try {

                if ($scope.NewDCModel["txtConductedByControlId"] == undefined || $scope.NewDCModel["txtConductedByControlId"] == "") {

                    $scope.NewDCModel["txtConductedByControlId"] = OneViewSessionStorage.Get("LoginUserName");
                }

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndHandSwabControllerFacade.SetAnalysedby", xlatService);
            }
        }

        var SetSampleNumber = function () {

            try {
                OneViewConsole.Debug("SetSampleNumber Start", "SamplingSheetAndHandSwabControllerFacade.SetSampleNumber");

                var MasterConfig = {
                    'Key': 'OneViewDCCriteriaNodeElementAdvance',
                    'CriteriaType': '',
                    'TemplateNodeId': 1813,
                    'ControlId': 'AddlSectionControlId',
                    'AnswerModeType': 'DDL',
                    'Expression': '$vn$Column1$vn$',
                    'DisplayCloumnConfigDict': {
                        'Column1': {
                            'Key': 'DefaultStringCloumnDisplayConfig',
                            'ColumnName': 'Column1',
                            'StringOperationConfig': null,
                            'StringCaseFormat': null
                        }
                    }
                }

                var DateTimeConfig = {
                    'Key': 'OneViewDCCriteriaCurrentDateTime',
                    'IsDeviceTime': true,
                    'IsServerTime': false,
                    'DateTimeOperationConfig': {
                        'Key': 'OneViewDCCriteriaNodeElementAdvance',
                        'Format': 'MM',
                        'Add': 0,
                        'DateTimeMode': 1
                    }
                }

                var oOneViewDCMessageWithDCCriteriaVariable = {
                    MessageKey: "HS_$vn$MasterColumn$vn$_$vn$Month$vn$_",
                    VariablesFinalJavaScriptEquation: {
                        "$vn$MasterColumn$vn$": "(GetRCOMasterAdv('" + JSON.stringify(MasterConfig) + "') != '' && GetRCOMasterAdv('" + JSON.stringify(MasterConfig) + "')) || 'XX'",
                        "$vn$Month$vn$": "GetDateTimeAdv('" + JSON.stringify(DateTimeConfig) + "')"
                    }
                }

                scope.NewDCModel["txtSamplingNoControlId"] = oOneViewDCMessageWithDCCriteriaVariableEvaluationComponent.Evaluvate(oOneViewDCMessageWithDCCriteriaVariable);

                OneViewConsole.Debug("SetSampleNumber End", "SamplingSheetAndHandSwabControllerFacade.SetSampleNumber");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndHandSwabControllerFacade.SetSampleNumber", xlatService);
            }
            finally {
            }
        }
}


