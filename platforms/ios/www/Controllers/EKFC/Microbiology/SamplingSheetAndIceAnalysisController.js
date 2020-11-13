
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;

MyApp.controller('SamplingSheetAndIceAnalysisController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
        //oSetDefaultSpinner.Start();
        // xlatService.setCurrentPage('SamplingSheetAndIceAnalysis');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);

        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
        scope = $scope;
        oSnapRemote = snapRemote;


        var oSamplingSheetAndIceAnalysisControllerFacade = new SamplingSheetAndIceAnalysisControllerFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

        oSamplingSheetAndIceAnalysisControllerFacade.Init();
        oSamplingSheetAndIceAnalysisControllerFacade.PageLoad();
        //oSetDefaultSpinner.Stop();

        $scope.ngChange_setIsManualFlag = function (ControlId) {
            oSamplingSheetAndIceAnalysisControllerFacade.ngChange_setIsManualFlag(ControlId);
        }

        $scope.$on('$destroy', function () {
            var oOneViewSidePanel = new OneViewSidePanel();
            oOneViewSidePanel.Clear();
            oSamplingSheetAndIceAnalysisControllerFacade.Destroy();

            xlatService.RemoveCurrentPageMetadata(currentPage);
        });

        $scope.GetProbeStatus = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.GetProbeStatus();
        };

        $scope.AddRecords = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.SaveDCRecords();
        };

        $scope.SetSelectedTextBoxColor = function (ControlId) {
            oSamplingSheetAndIceAnalysisControllerFacade.SetSelectedTextBoxColor(ControlId);
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

        //$scope.activate = function(option){
        //    alert(option.Name);
        //};  

        $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
            oSamplingSheetAndIceAnalysisControllerFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
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
        ////    oSamplingSheetAndIceAnalysisControllerFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc);
        ////}

        var lastTimeOutId = null;
        $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {

            $scope.DisableSave = true;
            $scope.DisableSaveSubmit = true;
            if (lastTimeOutId != null)
                $timeout.cancel(lastTimeOutId);
            lastTimeOutId = $timeout(function () { oSamplingSheetAndIceAnalysisControllerFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, Timeout);
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
            oSamplingSheetAndIceAnalysisControllerFacade.ClearForm();
        }
        $scope.$on('$destroy', function () {

            //oOneViewAppInfoPlugin.ClearCache();
            //$location.replace(); //clear last history route
            //$templateCache.removeAll();

            //  ClearGlobalVariable();
            oSamplingSheetAndIceAnalysisControllerFacade.Destroy();
            scope = null;
            ionicBackdrop = null;
            oSamplingSheetAndIceAnalysisControllerFacade = null;
            $scope = null;

        });

        $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
            oSamplingSheetAndIceAnalysisControllerFacade.PreControlEvents(AttributeId, ControlId, $event);
        }

        $scope.PostControlEvents = function (AttributeId, ControlId) {

            oSamplingSheetAndIceAnalysisControllerFacade.PostControlEvents(AttributeId, ControlId);
        }

        $scope.ngChange_setDateTime = function (ControlId) {
            oSamplingSheetAndIceAnalysisControllerFacade.ngChange_setDateTime(ControlId);
        }

        $scope.SubmitRecords = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.SaveDCRecords(true);
        }



        $scope.CustomNCClick = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.CustomNCClick();
        }

        $scope.NCClick = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.NCClick($compile);
        }

        $scope.ObservationTabClick = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.ObservationTabClick($compile);
        }

        $scope.NCTabClick = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.NCTabClick($compile);
        }

        $scope.CloseRightPanel = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.CloseRightPanel();
        }

        $scope.ProbeTesting = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.ProbeTesting();
        };
        $scope.ClearReasons = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.ClearReasons();
        }

        $scope.ClearComments = function () {
            oSamplingSheetAndIceAnalysisControllerFacade.ClearComments();
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


        $scope.ShowFoodAnalysisForm = function () {

            oSamplingSheetAndIceAnalysisControllerFacade.ShowIceAnalysisForm();

        }

        $scope.ShowSamplingSheet = function () {
            $scope.FoodAnalysisShow = false;
            $scope.SampleSheetHide = false;
            $scope.DisableBack = false;

        }

        $scope.Signature = function (SignatureControlID) {
            oSamplingSheetAndIceAnalysisControllerFacade.Signature(SignatureControlID);
        }
        $scope.UpdateParameterTestedCompletedStatus = function (BandDetailId) {
            oSamplingSheetAndIceAnalysisControllerFacade.UpdateParameterTestedCompletedStatus(BandDetailId);
        }

        $scope.CalculateResult = function (Dilution, Count1, Count2, Result, Paramtertestedvalue) {
            oSamplingSheetAndIceAnalysisControllerFacade.CalculateResult(Dilution, Count1, Count2, Result, Paramtertestedvalue);
        }

    });


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function SamplingSheetAndIceAnalysisControllerFacade(parm) {

    try {
        OneViewConsole.Debug("oSamplingSheetAndIceAnalysisControllerFacade Start", "Facade.SamplingSheetAndIceAnalysisControllerFacade");

        var Microbiology_IceLabelId = 12;
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

        OneViewConsole.Debug("oSamplingSheetAndIceAnalysisControllerFacade End", "Facade.SamplingSheetAndIceAnalysisControllerFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.oSamplingSheetAndIceAnalysisControllerFacade", xlatService);
    }

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "oSamplingSheetAndIceAnalysisControllerFacade.Init");

            $scope.NewDCModel = {};
            // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];

            $scope.ConditionOfAreaOnSampling = [];
            $scope.ConditionOfSampleOnReceipt = [];
            $scope.ConditionOfSampleAnalysis = [];
            $scope.AnalysisReason = [];
            $scope.ParameterTested = [];

            $scope.Result3s = [];
            $scope.Result6s = [];

            $scope.ShiftOptions = [];

            $scope.NCOptions = [];


            $scope.ColiformsTest1s = [];

            $scope.EcoliTest1s = [];
            $scope.EcoliTest2s = [];
            $scope.EcoliTest3s = [];
            $scope.EcoliTest4s = [];

            $scope.SalmonellaTest1s = [];
            $scope.SalmonellaTest2s = [];
            $scope.SalmonellaTest3s = [];
            $scope.SalmonellaTest4s = [];
            $scope.SalmonellaTest5s = [];

            $scope.PseudomonasTest1s = [];
            $scope.PseudomonasTest2s = [];
            $scope.PseudomonasTest3s = [];

            $scope.EnterococcusTest1s = [];
            $scope.EnterococcusTest2s = [];
            $scope.EnterococcusTest3s = [];

            $scope.ColiformsPresumptiveResults = [];
            $scope.EcollPresumptiveResults = [];
            $scope.SalmonellaPresumptiveResults = [];
            $scope.PseudomonasPresumptiveResults = [];
            $scope.EnterococcusPresumptiveResults = [];

            $scope.ProductionShifts = [];

            $scope.NAs = [];

            $scope.ProductTypes = [];

            _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
            _oDataCaptureBO.Init();

            OneViewConsole.Debug("Init End", "oSamplingSheetAndIceAnalysisControllerFacade.Init");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.Init", xlatService);
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
            OneViewConsole.Debug("PageLoad Start", "oSamplingSheetAndIceAnalysisControllerFacade.PageLoad");

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

            SetSelectedTextBoxColor_Private('ATFoodTempControlId');

            // _oNCComponent.BindNCSummaryHandler = BindNc;
            _oDataCaptureBO.SetDefaultAutoTemperatureListener();

            if (DcId != null) {
                IsFirstTimeEdit = true;
                $scope.Add = 'Save';
                _oDataCaptureBO.GetNCComments(DcId);
                _oDataCaptureBO.LoadEditPage(DcId, $scope);
                IsFirstTimeEdit = false;
                //Added : 26-11-2015 (Default value at the time of edit)
                _oDataCaptureBO.setDefaultValue();
            }
            else {
                $scope.Add = 'Add';
                _oDataCaptureBO.setDefaultValue();
                RefreshParameterTested();
            }

            ///AuditSummary
            _oDataCaptureBO.ShowDCSummary();
            _oSettingsBO.ShowAutoManualStatus($scope);






            new OnewViewEventListener().RegisterSelectedFieldEvent();

            OneViewConsole.Debug("PageLoad End", "oSamplingSheetAndIceAnalysisControllerFacade.PageLoad");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.PageLoad", xlatService);
        }
    }

    this.SetSelectedTextBoxColor = function (ControlId) {
        try {
            OneViewConsole.Debug("SetSelectedTextBoxColor Start", "oSamplingSheetAndIceAnalysisControllerFacade.SetSelectedTextBoxColor");

            SetSelectedTextBoxColor_Private(ControlId);

            OneViewConsole.Debug("SetSelectedTextBoxColor End", "oSamplingSheetAndIceAnalysisControllerFacade.SetSelectedTextBoxColor");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.SetSelectedTextBoxColor", xlatService);
        }
    }

    var SetSelectedTextBoxColor_Private = function (ControlId) {
        try {
            OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "oSamplingSheetAndIceAnalysisControllerFacade.SetSelectedTextBoxColor_Private");

            if (ControlId == 'ATSampleCollectionTempControlId') {
                $scope.ATSampleCollectionTempControlId = 'highlight';
                $scope.ATAmbientTempControlId = '';
                $scope.ATLabChillerTempControlId = '';
            }
            else if (ControlId == 'ATAmbientTempControlId') {
                $scope.ATSampleCollectionTempControlId = '';
                $scope.ATAmbientTempControlId = 'highlight';
                $scope.ATLabChillerTempControlId = '';
            }
            else if (ControlId == 'ATLabChillerTempControlId') {
                $scope.ATSampleCollectionTempControlId = '';
                $scope.ATAmbientTempControlId = '';
                $scope.ATLabChillerTempControlId = 'highlight';
            }

            OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "oSamplingSheetAndIceAnalysisControllerFacade.SetSelectedTextBoxColor_Private");
        }
        catch (Excep) {
            throw Excep;
        }
    }


    var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("BindNc Start", "oSamplingSheetAndIceAnalysisControllerFacade.BindNc");

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

            OneViewConsole.Debug("BindNc End", "oSamplingSheetAndIceAnalysisControllerFacade.BindNc");
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
            OneViewConsole.Debug("GetProbeStatus Start", "oSamplingSheetAndIceAnalysisControllerFacade.GetProbeStatus");

            _oSettingsBO.ProbeStatus('', xlatService);

            OneViewConsole.Debug("GetProbeStatus End", "oSamplingSheetAndIceAnalysisControllerFacade.GetProbeStatus");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.GetProbeStatus", xlatService);
        }
    }

    this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
        try {
            OneViewConsole.Debug("SetAutoTemperatureListener Start", "oSamplingSheetAndIceAnalysisControllerFacade.SetAutoTemperatureListener");

            var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
            _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
            _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

            OneViewConsole.Debug("SetAutoTemperatureListener End", "oSamplingSheetAndIceAnalysisControllerFacade.SetAutoTemperatureListener");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.SetAutoTemperatureListener", xlatService);
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
            OneViewConsole.Debug("SaveDCRecords Start", "oSamplingSheetAndIceAnalysisControllerFacade.SaveDCRecords");

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
                    ClearDateofReciept();
                }

                else {
                    _oDataCaptureBO.ClearControls(scope, TemplateNodes);
                    alert('IN-SU-SIA-001 :: Data Capture Profiles are expired ');
                }
            }
            _oDataCaptureBO.ShowDCSummary();
            //SetSelectedTextBoxColor_Private('txtTempControlId');

            //_oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtTempControlId';
            //_oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeCheckedControlId';


            OneViewConsole.Debug("SaveDCRecords End", "oSamplingSheetAndIceAnalysisControllerFacade.SaveDCRecords");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.SaveDCRecords", xlatService);
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

            ShowHideTextBox(EventArgs.attributes['AttributeNodeId'].value, EventArgs.attributes['Id'].value, EventArgs.attributes['type'].value);

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

            ShowHideTextBox(AttributeNodeId);
        }
        catch (Excep) {
            // alert('Excep AutoCompleteCloseClick :' + Excep + JSON.stringify(Excep))
            throw Excep;
        }
    }

    var ShowHideTextBox = function (AttributeNodeId, value,text) {
        try {
            // alert('AttributeNodeId : ' + AttributeNodeId + " ,value :" + value);
            if (AttributeNodeId == 1678) {
                //if (value == 65700) { //put others id
                if (text == "Others") {
                    //show textbox
                    scope.OthersShow = true;
                }
                else {
                    //hide textbox
                    scope.OthersShow = false;
                    scope.NewDCModel.txtOthersControlId = "";
                }
            }
            else if (AttributeNodeId == 1663) {
                //if (value == 65701) { //put others id
                if (text == "Others") {
                    //show textbox
                    scope.OthersLocationShow = true;
                }
                else {
                    //hide textbox
                    scope.OthersLocationShow = false;
                    scope.NewDCModel.txtOthersLocationControlId = "";
                }
            }
            else if (AttributeNodeId == 1687) {
                // if (value == 65702) { //put others id
                if (text == "Others") {
                    //show textbox
                    scope.OthersSampleReceiptShow = true;
                }
                else {
                    //hide textbox
                    scope.OthersSampleReceiptShow = false;
                    scope.NewDCModel.txtOthersSampleReceiptControlId = "";
                }
            }
            else if (AttributeNodeId == 1692) {
                // if (value == 65702) { //put others id
                if (text == "Others") {
                    //show textbox
                    scope.OthersSampleAnalysisShow = true;
                }
                else {
                    //hide textbox
                    scope.OthersSampleAnalysisShow = false;
                    scope.NewDCModel.txtOthersSampleAnalysisControlId = "";
                }
            }
            else if (AttributeNodeId == 1681) {
                //if (value == 65701) { //put others id
                if (text == "Others") {
                    //show textbox
                    scope.OthersAreaConditionShow = true;
                }
                else {
                    //hide textbox
                    scope.OthersAreaConditionShow = false;
                    scope.NewDCModel.txtOthersAreaConditionControlId = "";
                }
            }
            else {
                //hide textbox
                scope.OthersShow = false;
                scope.OthersLocationShow = false;
                scope.OthersSampleReceiptShow = false;
                scope.OthersSampleAnalysisShow = false;
            }
        }
        catch (Excep) {
            //alert('Excep ShowHideTextBox :' + Excep + JSON.stringify(Excep))
            throw Excep;
        }
    }


    var Loadddl = function () {
        try {

            OneViewConsole.Debug("Loadddl Start", "oSamplingSheetAndIceAnalysisControllerFacade.Loadddl");



            OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
            AutoCompleteCloseEvent = AutoCompleteCloseClick;

            var oSamplingMethodddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtSamplingMethodControlId', 'DataSourceModelName': 'SamplingMethod', 'DisplayElementModelName': 'NewDCModel.txtSamplingMethodControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_SamplingMethod, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1658 });
            oSamplingMethodddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_SamplingMethod, _TableNamesEnum.OrganizationAssetsNode);


            /*--------Changes start---------------*/
            var oUnitsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlUnitControlId', 'DataSourceModelName': 'Units', 'DisplayElementModelName': 'NewDCModel.AddlUnitControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Kitchen, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1660, 'SelectedIndexChangedEventHandler': oUnitsSelectedIndexChanged });
            oUnitsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Kitchen, _TableNamesEnum.OrganizationAssetsNode);

            var oDepartmentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1661, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
            //oDepartmentsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyDepartment, _TableNamesEnum.OrganizationAssetsNode);

            var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1662, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });
            //oSectionsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);

            var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1663 });
            //oLocationddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);


            var oAirlineddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Airline, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1665 });
            oAirlineddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Airline, _TableNamesEnum.OrganizationAssetsNode);

            var oClassddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlClassControlId', 'DataSourceModelName': 'Class', 'DisplayElementModelName': 'NewDCModel.AddlClassControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Class, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1666 });
            oClassddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Class, _TableNamesEnum.OrganizationAssetsNode);

            var oSectorddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectorControlId', 'DataSourceModelName': 'Sectors', 'DisplayElementModelName': 'NewDCModel.AddlSectorControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Sector, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1664 });
            oSectorddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Sector, _TableNamesEnum.OrganizationAssetsNode);



            /*---------------Changes end---------------------*/

            //var oShiftddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlShiftControlId', 'DataSourceModelName': 'Shift', 'DisplayElementModelName': 'NewDCModel.AddlShiftControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Canteen, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1543 });
            //oShiftddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Canteen, _TableNamesEnum.OrganizationAssetsNode);

            var oSamplingToolsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSamplingToolsControlId', 'DataSourceModelName': 'SamplingTools', 'DisplayElementModelName': 'NewDCModel.AddlSamplingToolsControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_SampleTools, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1678 });
            oSamplingToolsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_SampleTools, _TableNamesEnum.OrganizationAssetsNode);

            var oSampleContainerddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSampleContainerControlId', 'DataSourceModelName': 'SampleContainers', 'DisplayElementModelName': 'NewDCModel.AddlSampleContainerControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_SampleContainers, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1766 });
            oSampleContainerddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_SampleContainers, _TableNamesEnum.OrganizationAssetsNode);

            var oAreaConditionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAreaConditionUnsatisfactoryControlId', 'DataSourceModelName': 'AreaCondition', 'DisplayElementModelName': 'NewDCModel.AddlAreaConditionUnsatisfactoryControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ConditionOfSampleArea, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1681 });
            oAreaConditionddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_ConditionOfSampleArea, _TableNamesEnum.OrganizationAssetsNode);

            var oSampleConditionUnsatisfactoryddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSampleConditionUnsatisfactoryControlId', 'DataSourceModelName': 'SampleCondition', 'DisplayElementModelName': 'NewDCModel.AddlSampleConditionUnsatisfactoryControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ConditionOfSample, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1687 });
            oSampleConditionUnsatisfactoryddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_ConditionOfSample, _TableNamesEnum.OrganizationAssetsNode);

            var oSampleAnalysisUnsatisfactoryddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSampleAnalysisUnsatisfactoryControlId', 'DataSourceModelName': 'SampleAnalysis', 'DisplayElementModelName': 'NewDCModel.AddlSampleAnalysisUnsatisfactoryControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ConditionOfSample, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1692 });
            oSampleAnalysisUnsatisfactoryddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_ConditionOfSample, _TableNamesEnum.OrganizationAssetsNode);

            var oEvaluation1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation1ControlId', 'DataSourceModelName': 'Evaluation1', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1711, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
            oEvaluation1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

            var oEvaluation2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation2ControlId', 'DataSourceModelName': 'Evaluation2', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1723, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
            oEvaluation2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

            var oEvaluation3ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation3ControlId', 'DataSourceModelName': 'Evaluation3', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation3ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1735, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
            oEvaluation3ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

            var oEvaluation4ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation4ControlId', 'DataSourceModelName': 'Evaluation4', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation4ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1747, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
            oEvaluation4ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

            var oEvaluation5ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation5ControlId', 'DataSourceModelName': 'Evaluation5', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation5ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1759, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
            oEvaluation5ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

            var oEvaluation6ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation6ControlId', 'DataSourceModelName': 'Evaluation6', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation6ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1771, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
            oEvaluation6ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);


            var oOverallEvaluationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlOverAllEvaluationControlId', 'DataSourceModelName': 'OverallEvaluation1', 'DisplayElementModelName': 'NewDCModel.AddlOverAllEvaluationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8760, 'SelectedIndexChangedEventHandler': oOverallEvaluationSelectedIndexChanged });
            oOverallEvaluationddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);


            var oCriteriasddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlCriteriaControlId', 'DataSourceModelName': 'Criterias', 'DisplayElementModelName': 'NewDCModel.AddlCriteriaControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Criteria, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 9673, 'SelectedIndexChangedEventHandler': oCriteriasSelectedIndexChanged });
            oCriteriasddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Criteria, _TableNamesEnum.OrganizationAssetsNode);


            var oEquipmentUsed1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed1ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1705, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
            oEquipmentUsed1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oEquipmentUsed2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed2ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1717, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
            oEquipmentUsed2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oEquipmentUsed3ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed3ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed3ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1729, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
            oEquipmentUsed3ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oEquipmentUsed4ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed4ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed4ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1741, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
            oEquipmentUsed4ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oEquipmentUsed5ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed5ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed5ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1753, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
            oEquipmentUsed5ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oEquipmentUsed6ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed6ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed6ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1765, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
            oEquipmentUsed6ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);


            var oDilutionFactor1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst1ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1706, 'SelectedIndexChangedEventHandler': DilutionFactorSelected1IndexChanged });
            oDilutionFactor1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);

            var oDilutionFactor2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst2ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1718, 'SelectedIndexChangedEventHandler': DilutionFactorSelected2IndexChanged });
            oDilutionFactor2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);

            var oDilutionFactor3ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst3ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst3ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1730, 'SelectedIndexChangedEventHandler': DilutionFactorSelected3IndexChanged });
            oDilutionFactor3ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);

            var oDilutionFactor4ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst4ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst4ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1742, 'SelectedIndexChangedEventHandler': DilutionFactorSelected4IndexChanged });
            oDilutionFactor4ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);

            var oDilutionFactor5ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst5ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst5ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1754, 'SelectedIndexChangedEventHandler': DilutionFactorSelected5IndexChanged });
            oDilutionFactor5ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);


            var oEquipmentUsed1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsedSecond1ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsedSecond1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10377 });
            oEquipmentUsed1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oEquipmentUsed2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsedSecond2ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsedSecond2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10378 });
            oEquipmentUsed2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oEquipmentUsed3ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsedSecond3ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsedSecond3ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10379 });
            oEquipmentUsed3ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oEquipmentUsed4ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsedSecond4ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsedSecond4ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10380});
            oEquipmentUsed4ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oEquipmentUsed5ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsedSecond5ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsedSecond5ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10381});
            oEquipmentUsed5ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oEquipmentUsed6ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsedSecond6ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsedSecond6ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10382 });
            oEquipmentUsed6ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

            var oAnalyzedByUserddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtConductedByControlId', 'DataSourceModelName': 'AnalyzedByUser', 'DisplayElementModelName': 'NewDCModel.txtConductedByControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_AnalyzedByUser, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1774 });
            oAnalyzedByUserddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_AnalyzedByUser, _TableNamesEnum.OrganizationAssetsNode);
            oAnalyzedByUserddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'DCSignature', ColumnNames: ['Column1'], Seperater: '-' });

            OneViewConsole.Debug("Loadddl End", "oSamplingSheetAndIceAnalysisControllerFacade.Loadddl");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oProductddl = null;
        }
    }

    var EquipmentUsedSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("EquipmentUsedSelectedIndexChanged Start", "oSamplingSheetAndIceAnalysisControllerFacade.EquipmentUsedSelectedIndexChanged");

            //if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
            //}

            OneViewConsole.Debug("EquipmentUsedSelectedIndexChanged End", "oSamplingSheetAndIceAnalysisControllerFacade.EquipmentUsedSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oSectionddl = null;
        }
    }

    var oUnitsSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("SamplingSheetAndIceAnalysisControllerFacade Start", "SamplingSheetAndIceAnalysisControllerFacade.oUnitsSelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                var oDepartmentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1661, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
                //oDepartmentsddl.SetDataSourceFromTreeChildsWithTypeAndLabel(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyDepartment, _TableNamesEnum.OrganizationAssetsNode, Microbiology_IceLabelId);
                oDepartmentsddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyDepartment, _TableNamesEnum.OrganizationAssetsNode);


                if (DcId == null || IsFirstTimeEdit == false) {

                    $scope['AddlDepartmentControlId'].Clear();
                    $scope['AddlSectionControlId'].Clear();
                    $scope['AddlLocationControlId'].Clear();
                    SetSampleNumber();
                }
            }
            else {
                var oDepartmentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1661, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
                $scope['AddlDepartmentControlId'].Clear();
                $scope['AddlSectionControlId'].Clear();
                $scope['AddlLocationControlId'].Clear();

            }


            OneViewConsole.Debug("oSamplingSheetAndIceAnalysisControllerFacade End", "oSamplingSheetAndIceAnalysisControllerFacade.oUnitsSelectedIndexChanged");
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
            OneViewConsole.Debug("SamplingSheetAndIceAnalysisControllerFacade Start", "SamplingSheetAndIceAnalysisControllerFacade.oDepartmentSelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {


                var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1662, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });
                //oSectionsddl.SetDataSourceFromTreeChildsWithTypeAndLabel(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologySection, _TableNamesEnum.OrganizationAssetsNode, Microbiology_IceLabelId);
                oSectionsddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologySection, _TableNamesEnum.OrganizationAssetsNode);

                if (DcId == null || IsFirstTimeEdit == false) {

                    $scope['AddlSectionControlId'].Clear();
                    $scope['AddlLocationControlId'].Clear();
                    SetSampleNumber();
                }
            }
            else {
                var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1662, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });

                $scope['AddlSectionControlId'].Clear();
                $scope['AddlLocationControlId'].Clear();

            }


            OneViewConsole.Debug("oSamplingSheetAndIceAnalysisControllerFacade End", "oSamplingSheetAndIceAnalysisControllerFacade.oDepartmentSelectedIndexChanged");
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
            OneViewConsole.Debug("SamplingSheetAndIceAnalysisControllerFacade Start", "SamplingSheetAndIceAnalysisControllerFacade.oSectionSelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {


                var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1663 });
                oLocationddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);
                //oLocationddl.SetDataSourceFromTreeChildsWithTypeAndLabel(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode, Microbiology_IceLabelId);

                if (DcId == null || IsFirstTimeEdit == false) {
                    $scope['AddlLocationControlId'].Clear();
                    SetSampleNumber();
                }
            }
            else {
                var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1663 });

                $scope['AddlLocationControlId'].Clear();
            }


            OneViewConsole.Debug("oSamplingSheetAndIceAnalysisControllerFacade End", "oSamplingSheetAndIceAnalysisControllerFacade.oSectionSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oSectionddl = null;
        }
    }

    var oCriteriasSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("SamplingSheetAndIceAnalysisControllerFacade Start", "SamplingSheetAndIceAnalysisControllerFacade.oCriteriasSelectedIndexChanged");


            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {

                //alert('oFoodAnalysisSelectedIndexChanged');

               // var AnswerModeData = TemplateNodes[1418];
                var CriteriaType = scope.AddlCriteriaControlId.GetSelectedText();
                //alert("CriteriaType : " + CriteriaType);
                var BandDetailsData = BandDetailsForCriteria(CriteriaType);


                scope['ParameterTested'] = [];
                for (var itrBand in BandDetailsData) {
                    //alert(BandDetailsData[itrBand].Name + " -- " + BandDetailsData[itrBand].DefaultBackgroundColour);
                    if (BandDetailsData[itrBand].Name == "TVB") {
                        if (BandDetailsData[itrBand].MaxLimt != "") {
                            scope.NewDCModel["txtMaxCriteria1ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria1UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                       else{
                          document.getElementById("txtMaxCriteria1ControlId").readOnly = false;
                        }
                    }
                    else if (BandDetailsData[itrBand].Name == "Coliforms") {
                        if (BandDetailsData[itrBand].MaxLimt != "") {
                            scope.NewDCModel["txtMaxCriteria2ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria2UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else {
                            document.getElementById("txtMaxCriteria2ControlId").readOnly = false;
                        }
                    }
                    else if (BandDetailsData[itrBand].Name == "E.coli") {
                        if (BandDetailsData[itrBand].MaxLimt != "") {
                            scope.NewDCModel["txtMaxCriteria3ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria3UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else {
                            document.getElementById("txtMaxCriteria3ControlId").readOnly = false;
                        }
                    }
                    else if (BandDetailsData[itrBand].Name == "Pseudomonas") {
                        if (BandDetailsData[itrBand].MaxLimt != "") {
                            scope.NewDCModel["txtMaxCriteria4ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria4UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else {
                            document.getElementById("txtMaxCriteria4ControlId").readOnly = false;
                        }
                    }
                    else if (BandDetailsData[itrBand].Name == "Enterococcus") {
                        if (BandDetailsData[itrBand].MaxLimt != "") {
                            scope.NewDCModel["txtMaxCriteria5ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria5UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else {
                            document.getElementById("txtMaxCriteria5ControlId").readOnly = false;
                        }
                    }
                    else if (BandDetailsData[itrBand].Name == "Salmonella") {
                        if (BandDetailsData[itrBand].MaxLimt != "") {
                            scope.NewDCModel["txtMaxCriteria6ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria6UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else {
                            document.getElementById("txtMaxCriteria6ControlId").readOnly = false;
                        }
                    }

                    var SelectedStatus = false;
                    if (scope["chkParameterTested"].GetSelectedValue() != "" && scope["chkParameterTested"].GetSelectedValue() != undefined) {

                        if (scope["chkParameterTested"].GetSelectedValue() == BandDetailsData[itrBand].Value) {
                            //alert("oFoodAnalysisSelectedIndexChanged : " + scope["chkParameterTested"].GetSelectedValue() + " BandDetailsData[itrBand].Value :" + BandDetailsData[itrBand].Value);
                            SelectedStatus = true;
                        }

                    }

                    scope['ParameterTested'].push({ Id: BandDetailsData[itrBand].Value, Name: BandDetailsData[itrBand].Name, 'AttributeNodeId': 1700, ControlId: 'chkParameterTested', ColourIndex: BandDetailsData[itrBand].ColourIndex, 'DefaultBackgroundColour': BandDetailsData[itrBand].DefaultBackgroundColour, Selected: SelectedStatus })
                }
            }   
            else {


            }


            OneViewConsole.Debug("SamplingSheetAndIceAnalysisControllerFacade End", "SamplingSheetAndIceAnalysisControllerFacade.oCriteriasSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oSectionddl = null;
        }
    }

    var DilutionFactorSelected1IndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "oSamplingSheetAndIceAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                //MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                MyInstance.CalculateResult('txtColonyCountDilutionFirst1ControlId', 'txtColonyCountDilutionSecond1ControlId', 'txtFactor1ControlId', 'txtResult1ControlId', 133);
            }
            MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
            OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndIceAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oSectionddl = null;
        }
    }

    var DilutionFactorSelected2IndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "oSamplingSheetAndIceAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                //MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                MyInstance.CalculateResult('txtColonyCountDilutionFirst2ControlId', 'txtColonyCountDilutionSecond2ControlId', 'txtFactor2ControlId', 'txtResult2ControlId', 134)
            }
            MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
            OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndIceAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oSectionddl = null;
        }
    }

    var DilutionFactorSelected3IndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "oSamplingSheetAndIceAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
               // MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                MyInstance.CalculateResult('txtColonyCountDilutionFirst3ControlId', 'txtColonyCountDilutionSecond3ControlId', 'txtFactor3ControlId', 'txtResult3ControlId',135)
            }
            MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
            OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndIceAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oSectionddl = null;
        }
    }
    var DilutionFactorSelected4IndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "oSamplingSheetAndIceAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                //MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                MyInstance.CalculateResult('txtColonyCountDilutionFirst4ControlId', 'txtColonyCountDilutionSecond4ControlId', 'txtFactor4ControlId', 'txtResult4ControlId',136)
            }
            MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
            OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndIceAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oSectionddl = null;
        }
    }

    var DilutionFactorSelected5IndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "oSamplingSheetAndIceAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                //MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                MyInstance.CalculateResult('txtColonyCountDilutionFirst5ControlId', 'txtColonyCountDilutionSecond5ControlId', 'txtFactor5ControlId', 'txtResult5ControlId', 137);
            }
            MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
            OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndIceAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oSectionddl = null;
        }
    }

    var MandatoryColor = "#FF8000";//if changing change in oCriteriasSelectedIndexChanged also
    var OptionalColor = "#F3F781";
    var NewOptionalColor = "#FFCC00";

    var BandDetailsForCriteria = function (CriteriaType) {
        var Band = {

            "01 Bottled Water / Ice / Tap Water": {
                1: { 'Name': 'TVB', 'Value': 133, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<1000' , 'Unit' : 'mL'},
                2: { 'Name': 'Coliforms', 'Value': 134, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'mL' },
                3: { 'Name': 'E.coli', 'Value': 135, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'mL' },
                //4: { 'Name': 'Pseudomonas', 'Value': 136, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<1 / 250', 'Unit': 'mL' },
                4: { 'Name': 'Pseudomonas', 'Value': 136, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<1', 'Unit': 'mL' },
                5: { 'Name': 'Salmonella', 'Value': 138, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent', 'Unit': 'ml' },
                6: { 'Name': 'Enterococcus', 'Value': 137, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
            },
            //without '/', '/' is not displaying in dropdown
            "01 Bottled Water   Ice   Tap Water": {
                1: { 'Name': 'TVB', 'Value': 133, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<1000', 'Unit': 'mL' },
                2: { 'Name': 'Coliforms', 'Value': 134, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'mL' },
                3: { 'Name': 'E.coli', 'Value': 135, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'mL' },
                //4: { 'Name': 'Pseudomonas', 'Value': 136, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<1 / 250', 'Unit': 'mL' },
                4: { 'Name': 'Pseudomonas', 'Value': 136, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<1', 'Unit': 'mL' },
                5: { 'Name': 'Salmonella', 'Value': 138, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent', 'Unit': 'ml' },
                6: { 'Name': 'Enterococcus', 'Value': 137, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
            },
            "02 Bottled Water": {
                
                1: { 'Name': 'Coliforms', 'Value': 134, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'mL' },
                2: { 'Name': 'E.coli', 'Value': 135, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'mL' },
                3: { 'Name': 'TVB', 'Value': 133, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '1000', 'Unit': 'mL' },
                4: { 'Name': 'Salmonella', 'Value': 138, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent', 'Unit': 'ml' },
                //5: { 'Name': 'Pseudomonas', 'Value': 136, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '<1 / 250', 'Unit': 'mL' },
                5: { 'Name': 'Pseudomonas', 'Value': 136, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '<1', 'Unit': 'mL' },
                6: { 'Name': 'Enterococcus', 'Value': 137, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
            },
         
            
        }

        if (IsFirstTimeEdit != true) {
            ClearParameterTested();
        }

       // RefreshParameterTested();

        return Band[CriteriaType];
    }

    var BandDetailsForCriteriaOLD = function (CriteriaType) {
        var Band = {

            "01 Bottled Water / Ice / Tap Water": {
                1: { 'Name': 'TVB', 'Value': 133, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<1000 / 100', 'Unit': 'mL' },
                2: { 'Name': 'Coliforms', 'Value': 134, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND / 100', 'Unit': 'mL' },
                3: { 'Name': 'E.coli', 'Value': 135, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND / 100', 'Unit': 'mL' },
                4: { 'Name': 'Pseudomonas', 'Value': 136, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<1 / 250', 'Unit': 'mL' },
                5: { 'Name': 'Salmonella', 'Value': 138, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent / 100', 'Unit': 'ml' },
                6: { 'Name': 'Enterococcus', 'Value': 137, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
            },
            //without '/', '/' is not displaying in dropdown
            "01 Bottled Water   Ice   Tap Water": {
                1: { 'Name': 'TVB', 'Value': 133, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<1000 / 100', 'Unit': 'mL' },
                2: { 'Name': 'Coliforms', 'Value': 134, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND / 100', 'Unit': 'mL' },
                3: { 'Name': 'E.coli', 'Value': 135, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND / 100', 'Unit': 'mL' },
                4: { 'Name': 'Pseudomonas', 'Value': 136, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<1 / 250', 'Unit': 'mL' },
                5: { 'Name': 'Salmonella', 'Value': 138, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent / 100', 'Unit': 'ml' },
                6: { 'Name': 'Enterococcus', 'Value': 137, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
            },
            "02 Bottled Water": {

                1: { 'Name': 'Coliforms', 'Value': 134, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND / 100', 'Unit': 'mL' },
                2: { 'Name': 'E.coli', 'Value': 135, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND / 100', 'Unit': 'mL' },
                3: { 'Name': 'TVB', 'Value': 133, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '1000 / 100', 'Unit': 'mL' },
                4: { 'Name': 'Salmonella', 'Value': 138, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent / 100', 'Unit': 'ml' },
                5: { 'Name': 'Pseudomonas', 'Value': 136, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '<1 / 250', 'Unit': 'mL' },
                6: { 'Name': 'Enterococcus', 'Value': 137, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
            },


        }

        if (IsFirstTimeEdit != true) {
            ClearParameterTested();
        }

        // RefreshParameterTested();

        return Band[CriteriaType];
    }

    var ClearParameterTested = function () {

        try {
            OneViewConsole.Debug("ClearParameterTested Start", "SamplingSheetAndIceAnalysisControllerFacade.ClearParameterTested");

            var FoodProducts = ["Tvb", "Coliforms", "Ecoll", "Pseudomonas", "Enterococcus", "Salmonella"];

            for (var j = 0; j < FoodProducts.length; j++) {

                var ControlInfo = _oDataCaptureBO.GetIcAnalysisControlInfo(FoodProducts[j]);

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

            OneViewConsole.Debug("ClearParameterTested End", "SamplingSheetAndIceAnalysisControllerFacade.ClearParameterTested");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
        try {

            OneViewConsole.Debug("Temperature_NgKeyUp Start", "oSamplingSheetAndIceAnalysisControllerFacade.Temperature_NgKeyUp");
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
            if (ControlId == "chkParameterTested") {
                // alert(ControlId);
                MyInstance.UpdateParameterTestedCompletedStatus(133);
                MyInstance.UpdateParameterTestedCompletedStatus(134);
                MyInstance.UpdateParameterTestedCompletedStatus(135);
                MyInstance.UpdateParameterTestedCompletedStatus(136);
                MyInstance.UpdateParameterTestedCompletedStatus(137);
                MyInstance.UpdateParameterTestedCompletedStatus(138);
            }
            if (ControlId == "txtResult6ControlId") {
                MyInstance.UpdateParameterTestedCompletedStatus(138);
            }
            else if (ControlId == "txtResult3ControlId") {
                MyInstance.UpdateParameterTestedCompletedStatus(135);
            }
            $scope.DisableSave = false;
            $scope.DisableSaveSubmit = false;

            if (ControlId == "ATLabChillerTempControlId" || ControlId == "DTLabChillerTimeControlId") {

                if (document.getElementById("DTLabChillerTimeControlId").value != "") {
             
                    //var date = new Date();

                    //var day = date.getDate();
                    //var month = date.getMonth() + 1;
                    //var year = date.getFullYear();

                    //if (month < 10) month = "0" + month;
                    //if (day < 10) day = "0" + day;

                    //var today = year + "-" + month + "-" + day;
                    //document.getElementById("DTDateofRecieptControlId").value = today;
                    //$scope.NewDCModel.DTDateofRecieptControlId = today;

                    var oDateTime = new DateTime();
                    var CurrentDate = oDateTime.GetYear() + "-" + oDateTime.GetMonth() + "-" + oDateTime.GetDay();


                    document.getElementById("DTDateofRecieptControlId").value = CurrentDate;
                    $scope.NewDCModel.DTDateofRecieptControlId = CurrentDate;
              
                }
                else {
                    document.getElementById("DTDateofRecieptControlId").value = "";
                    $scope.NewDCModel.DTDateofRecieptControlId = "";
                }
            }

            OneViewConsole.Debug("Temperature_NgKeyUp End", "oSamplingSheetAndIceAnalysisControllerFacade.Temperature_NgKeyUp");
        }
        catch (Excep) {
            $scope.DisableSave = false;
            $scope.DisableSaveSubmit = false;
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.Temperature_NgKeyUp", xlatService);
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

            OneViewConsole.Debug("ValidateActionNC Start", "oSamplingSheetAndIceAnalysisControllerFacade.ValidateActionNC");
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
            OneViewConsole.Debug("ValidateActionNC End", "oSamplingSheetAndIceAnalysisControllerFacade.ValidateActionNC");
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
            OneViewConsole.Debug("CheckActionNCEvent Start", "oSamplingSheetAndIceAnalysisControllerFacade.CheckActionNCEvent");
            ValidateActionNC(AttributeId, ControlId);
            OneViewConsole.Debug("CheckActionNCEvent End", "oSamplingSheetAndIceAnalysisControllerFacade.CheckActionNCEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.CheckActionNCEvent", xlatService);
        }
        finally {
            oDataCaptureBO = null;
        }
    }

    var EvaluateActionNCStatus = function (AttributeId) {
        try {
            OneViewConsole.Debug("ShowNCStatus Start", "oSamplingSheetAndIceAnalysisControllerFacade.EvaluateActionNCStatus");
            var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
            return ActionResponseList;
            OneViewConsole.Debug("ShowNCStatus End", "oSamplingSheetAndIceAnalysisControllerFacade.EvaluateActionNCStatus");
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
            OneViewConsole.Debug("ShowNCFormAction Start", "oSamplingSheetAndIceAnalysisControllerFacade.ShowNCFormAction");

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



            OneViewConsole.Debug("ShowNCFormAction End", "oSamplingSheetAndIceAnalysisControllerFacade.ShowNCFormAction");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.ShowNCFormAction", xlatService);
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
            OneViewConsole.Debug("LoadAnswerModes Start", "oSamplingSheetAndIceAnalysisControllerFacade.LoadAnswerModes");

            AnswerModeNCActionEvent = OnAnswerModeSelect;

            var oConditionOfArea = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkConditionOfAreaOnSampling', 'DataSourceModelName': 'ConditionOfAreaOnSampling', 'DisplayElementModelName': 'NewDCModel.chkConditionOfAreaOnSampling' });
            oConditionOfArea.AnswerModes(TemplateNodes, 1680);

            var oConditionOfSampleType = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkConditionOfSampleOnReceipt', 'DataSourceModelName': 'ConditionOfSampleOnReceipt', 'DisplayElementModelName': 'NewDCModel.chkConditionOfSampleOnReceipt' });
            oConditionOfSampleType.AnswerModes(TemplateNodes, 1686);

            var oConditionOfSampleAnalysis = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkConditionOfSampleAnalysis', 'DataSourceModelName': 'ConditionOfSampleAnalysis', 'DisplayElementModelName': 'NewDCModel.chkConditionOfSampleAnalysis' });
            oConditionOfSampleAnalysis.AnswerModes(TemplateNodes, 1691);

            var oAnalysisReason = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkAnalysisReason', 'DataSourceModelName': 'AnalysisReason', 'DisplayElementModelName': 'NewDCModel.chkAnalysisReason' });
            oAnalysisReason.AnswerModes(TemplateNodes, 1698);

            var oThermometerType = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkParameterTested', 'DataSourceModelName': 'ParameterTested', 'DisplayElementModelName': 'NewDCModel.chkParameterTested' });
            oThermometerType.AnswerModes(TemplateNodes, 1700);


            //var oResult3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtResult3ControlId', 'DataSourceModelName': 'Result3s', 'DisplayElementModelName': 'NewDCModel.txtResult3ControlId' });
            //oResult3.AnswerModes(TemplateNodes, 1734);

            var oResult6 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtResult6ControlId', 'DataSourceModelName': 'Result6s', 'DisplayElementModelName': 'NewDCModel.txtResult6ControlId' });
            oResult6.AnswerModes(TemplateNodes, 1770);

            var oNCOptions = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
            oNCOptions.LoadNCOptions();


            var oColiformsTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkColiformsTest1ControlId', 'DataSourceModelName': 'ColiformsTest1s', 'DisplayElementModelName': 'NewDCModel.chkColiformsTest1ControlId' });
            oColiformsTest1.AnswerModes(TemplateNodes, 8715);

            var oEcoliTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest1ControlId', 'DataSourceModelName': 'EcoliTest1s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest1ControlId' });
            oEcoliTest1.AnswerModes(TemplateNodes, 8716);

            var oEcoliTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest2ControlId', 'DataSourceModelName': 'EcoliTest2s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest2ControlId' });
            oEcoliTest2.AnswerModes(TemplateNodes, 8717);

            var oEcoliTest3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest3ControlId', 'DataSourceModelName': 'EcoliTest3s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest3ControlId' });
            oEcoliTest3.AnswerModes(TemplateNodes, 8718);

            var oEcoliTest4 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest4ControlId', 'DataSourceModelName': 'EcoliTest4s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest4ControlId' });
            oEcoliTest4.AnswerModes(TemplateNodes, 8719);



            var oSalmonellaTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaTest1ControlId', 'DataSourceModelName': 'SalmonellaTest1s', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaTest1ControlId' });
            oSalmonellaTest1.AnswerModes(TemplateNodes, 8720);

            var oSalmonellaTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaTest2ControlId', 'DataSourceModelName': 'SalmonellaTest2s', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaTest2ControlId' });
            oSalmonellaTest2.AnswerModes(TemplateNodes, 8721);

            var oSalmonellaTest3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaTest3ControlId', 'DataSourceModelName': 'SalmonellaTest3s', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaTest3ControlId' });
            oSalmonellaTest3.AnswerModes(TemplateNodes, 8722);

            var oSalmonellaTest4 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaTest4ControlId', 'DataSourceModelName': 'SalmonellaTest4s', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaTest4ControlId' });
            oSalmonellaTest4.AnswerModes(TemplateNodes, 8723);

            var oSalmonellaTest5 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaTest5ControlId', 'DataSourceModelName': 'SalmonellaTest5s', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaTest5ControlId' });
            oSalmonellaTest5.AnswerModes(TemplateNodes, 8724);



            var oPseudomonasTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkPseudomonasTest1ControlId', 'DataSourceModelName': 'PseudomonasTest1s', 'DisplayElementModelName': 'NewDCModel.chkPseudomonasTest1ControlId' });
            oPseudomonasTest1.AnswerModes(TemplateNodes, 8725);

            var oPseudomonasTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkPseudomonasTest2ControlId', 'DataSourceModelName': 'PseudomonasTest2s', 'DisplayElementModelName': 'NewDCModel.chkPseudomonasTest2ControlId' });
            oPseudomonasTest2.AnswerModes(TemplateNodes, 8726);

            var oPseudomonasTest3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkPseudomonasTest3ControlId', 'DataSourceModelName': 'PseudomonasTest3s', 'DisplayElementModelName': 'NewDCModel.chkPseudomonasTest3ControlId' });
            oPseudomonasTest3.AnswerModes(TemplateNodes, 8727);



            var oEnterococcusTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEnterococcusTest1ControlId', 'DataSourceModelName': 'EnterococcusTest1s', 'DisplayElementModelName': 'NewDCModel.chkEnterococcusTest1ControlId' });
            oEnterococcusTest1.AnswerModes(TemplateNodes, 8728);

            var oEnterococcusTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEnterococcusTest2ControlId', 'DataSourceModelName': 'EnterococcusTest2s', 'DisplayElementModelName': 'NewDCModel.chkEnterococcusTest2ControlId' });
            oEnterococcusTest2.AnswerModes(TemplateNodes, 8729);

            var oEnterococcusTest3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEnterococcusTest3ControlId', 'DataSourceModelName': 'EnterococcusTest3s', 'DisplayElementModelName': 'NewDCModel.chkEnterococcusTest3ControlId' });
            oEnterococcusTest3.AnswerModes(TemplateNodes, 8730);


            //Presumptive result.

            var oColiformsPresumptiveResult = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkColiformsPresumptiveResultControlId', 'DataSourceModelName': 'ColiformsPresumptiveResults', 'DisplayElementModelName': 'NewDCModel.chkColiformsPresumptiveResultControlId' });
            oColiformsPresumptiveResult.AnswerModes(TemplateNodes, 8731);

            var oEcollPresumptiveResult = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcollPresumptiveResultControlId', 'DataSourceModelName': 'EcollPresumptiveResults', 'DisplayElementModelName': 'NewDCModel.chkEcollPresumptiveResultControlId' });
            oEcollPresumptiveResult.AnswerModes(TemplateNodes, 8732);

            var oSalmonellaPresumptiveResult = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaPresumptiveResultControlId', 'DataSourceModelName': 'SalmonellaPresumptiveResults', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaPresumptiveResultControlId' });
            oSalmonellaPresumptiveResult.AnswerModes(TemplateNodes, 8733);

            var oPseudomonasPresumptiveResult = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkPseudomonasPresumptiveResultControlId', 'DataSourceModelName': 'PseudomonasPresumptiveResults', 'DisplayElementModelName': 'NewDCModel.chkPseudomonasPresumptiveResultControlId' });
            oPseudomonasPresumptiveResult.AnswerModes(TemplateNodes, 8734);

            var oEnterococcusPresumptiveResult = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEnterococcusPresumptiveResultControlId', 'DataSourceModelName': 'EnterococcusPresumptiveResults', 'DisplayElementModelName': 'NewDCModel.chkEnterococcusPresumptiveResultControlId' });
            oEnterococcusPresumptiveResult.AnswerModes(TemplateNodes, 8735);

            var oProductionShifts = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkProductionShiftControlId', 'DataSourceModelName': 'ProductionShifts', 'DisplayElementModelName': 'NewDCModel.chkProductionShiftControlId' });
            oProductionShifts.AnswerModes(TemplateNodes, 9669);


            var oNAs = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNAControlId', 'DataSourceModelName': 'NAs', 'DisplayElementModelName': 'NewDCModel.chkNAControlId' });
            oNAs.AnswerModes(TemplateNodes, 1767);


            var oProductType = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkProductTypeControlId', 'DataSourceModelName': 'ProductTypes', 'DisplayElementModelName': 'NewDCModel.chkProductTypeControlId' });
            oProductType.AnswerModes(TemplateNodes, 11736);

            OneViewConsole.Debug("LoadAnswerModes End", "oSamplingSheetAndIceAnalysisControllerFacade.LoadAnswerModes");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oMeals = null;
            oMealsType = null;
        }
    }

    var CreateDynamicElements = function (_DcResultDetailsEntityLst) {
        try {

            OneViewConsole.Debug("CreateDynamicElements Start", "oSamplingSheetAndIceAnalysisControllerFacade.CreateDynamicElements");

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

            OneViewConsole.Debug("CreateDynamicElements End", "oSamplingSheetAndIceAnalysisControllerFacade.CreateDynamicElements");
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
            OneViewConsole.Debug("Temperature_NgKeyUp Start", "oSamplingSheetAndIceAnalysisControllerFacade.Temperature_NgKeyUp");

            if (IsNc == true) {
                ShowNCStatus(AttributeId, ControlId);
            }

            var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
            oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.Temperature_NgKeyUp", xlatService);
        }
        finally {
            oDataCaptureBO = null;
        }
    }

    var ShowNCStatusOLD = function (AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("ShowNCStatus Start", "oSamplingSheetAndIceAnalysisControllerFacade.ShowNCStatus");

            var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
            NormalizeNCEntityListData(DCNCMappingListData);

            OneViewConsole.Debug("ShowNCStatus End", "oSamplingSheetAndIceAnalysisControllerFacade.ShowNCStatus");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            DCNCMappingListData = null;
        }
    }

    var ClearDateofReciept = function () {
        try {
            OneViewConsole.Debug("ClearForm Start", "oSamplingSheetAndIceAnalysisControllerFacade.ClearDateofReciept");

            if (document.getElementById("DTDateofRecieptControlId").value != "") {
                document.getElementById("DTDateofRecieptControlId").value = "";
            }
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.ClearDateofReciept", xlatService);
        }
    }

    this.ClearForm = function () {
        try {
            OneViewConsole.Debug("ClearForm Start", "oSamplingSheetAndIceAnalysisControllerFacade.ClearForm");

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            oOneViewCordovaPlugin.DefaultConfirmBox("Confirmation", "MN-RQ-SPH-015 :: Are you sure you want to clear the data ?", function (ConfirmationId) {
                  
                if (ConfirmationId == "2") {

                    _oDataCaptureBO.ClearControls();
                    ClearDateofReciept();
                    if (DcId != null) {
                        _oDataCaptureBO.LoadEditPage(DcId, $scope);
                    }
                    else {
                        _oDataCaptureBO.setDefaultValue();
                        RefreshParameterTested();
                    }

                    scope.$apply();
                }

            });
            OneViewConsole.Debug("ClearForm End", "oSamplingSheetAndIceAnalysisControllerFacade.ClearForm");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.ClearForm", xlatService);
        }
    }

    var IsNCthereOrNot = function (RuleId, isNC) {
        try {
            OneViewConsole.Debug("IsNCthereOrNot Start", "oSamplingSheetAndIceAnalysisControllerFacade.IsNCthereOrNot");

            var ExistStatus = false;
            for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                    _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                    _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                    ExistStatus = true;
                    break;
                }
            }

            OneViewConsole.Debug("IsNCthereOrNot End", "oSamplingSheetAndIceAnalysisControllerFacade.IsNCthereOrNot");
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
            OneViewConsole.Debug("NormalizeNCEntityListData Start", "oSamplingSheetAndIceAnalysisControllerFacade.NormalizeNCEntityListData");

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

            OneViewConsole.Debug("NormalizeNCEntityListData End", "oSamplingSheetAndIceAnalysisControllerFacade.NormalizeNCEntityListData");
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
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.PreControlEvents", xlatService);
        }
    }

    this.PostControlEvents = function (AttributeId, ControlId) {
        try {

            _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.PreControlEvents", xlatService);
        }
    }

    this.ngChange_setDateTime = function (ControlId) {
        try {
            _oDataCaptureBO.ngChange_setDateTime(ControlId);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.ngChange_setDateTime", xlatService);
        }
    }


    this.NCClick = function ($compile) {

        try {
            _oDataCaptureBO.LoadNCCommentsHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.NgKeyUp", xlatService);
        }
        finally {
        }
    }

    this.NCTabClick = function ($compile) {

        try {
            _oDataCaptureBO.AppendNCHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.AppendNCHtml", xlatService);
        }
        finally {
        }
    }

    this.ObservationTabClick = function ($compile) {

        try {
            _oDataCaptureBO.AppendObservationHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.AppendObservationHtml", xlatService);
        }
        finally {
        }
    }

    this.CustomNCClick = function () {

        try {
            _oDataCaptureBO.CustomNCClick();
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.CustomNCClick", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.CustomNCClick", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.ProbeTesting", xlatService);
        }
    }

    this.ClearReasons = function () {
        try {
            $scope.NewDCModel["NCComments"] = '';
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.ClearReasons", xlatService);
        }
    }

    this.ClearComments = function () {
        try {
            $scope.NewDCModel["ObservationComments"] = '';
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.ClearComments", xlatService);
        }
    }

    this.Destroy = function () {
        try {
            _oDataCaptureBO.Destroy();
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndIceAnalysisControllerFacade.Destroy", xlatService);
        }
    }

    var RefreshParameterTested = function () {
        try {

            //var _oOneViewSampleGenerator = new OneViewSampleGenerator();
            //var SampleNumber = _oOneViewSampleGenerator.GetNewSampleNumber("I");
            //scope.NewDCModel["txtSamplingNoControlId"] = SampleNumber;
            SetSampleNumber();

            scope.NewDCModel["txtMediaUsed1ControlId"] = "m-TGE";
            scope.NewDCModel["txtVolumeofSamples1ControlId"] = "100 ml";
            //scope.NewDCModel["txtIncubationTimeTemp1ControlId"] = "30&deg;C,72h";
            scope.NewDCModel["txtIncubationTimeTemp1ControlId"] = "30C,72h";
            // scope.NewDCModel["txtEquipmentUsed1ControlId"] = "FS 1No5";
            // scope.NewDCModel["txtColonyCountDilutionFirst1ControlId"] = "10-2";
            //scope.NewDCModel["txtColonyCountDilutionSecond1ControlId"] = "17/15";
            scope.NewDCModel["txtConfirmationTest1ControlId"] = "N/A";
            // scope.NewDCModel["txtResult1ControlId"] = "1600";
            // scope.NewDCModel["txtEvaluation1ControlId"] = "F";
            //scope.NewDCModel["txtConductedBy1ControlId"] = "Haririram";
            //scope.NewDCModel["txtMaxCriteria1ControlId"] = "CFU/100ml";

            //alert(scope.NewDCModel["txtMaxCriteria1ControlId"]);

            scope.NewDCModel["txtMediaUsed2ControlId"] = "m-ColiBlue24 broth";
            scope.NewDCModel["txtVolumeofSamples2ControlId"] = "100 ml";
            scope.NewDCModel["txtIncubationTimeTemp2ControlId"] = "35C,24h";
            scope.NewDCModel["txtConfirmationTest2ControlId"] = "BGB @37C,24h";
            //scope.NewDCModel["txtMaxCriteria2ControlId"] = "CFU/100ml";


            scope.NewDCModel["txtMediaUsed3ControlId"] = "m-ColiBlue24 broth";
            scope.NewDCModel["txtVolumeofSamples3ControlId"] = "100 ml";
            scope.NewDCModel["txtIncubationTimeTemp3ControlId"] = "35C,24h";
            scope.NewDCModel["txtConfirmationTest3ControlId"] = "EMB@35C,48h  SS -BGB @44.5C,24h  TW @44.5C,24h";
            //scope.NewDCModel["txtMaxCriteria3ControlId"] = "CFU/100ml";


            scope.NewDCModel["txtMediaUsed4ControlId"] = "m-Pseudomonas selective medium";
            scope.NewDCModel["txtVolumeofSamples4ControlId"] = "250 ml";
            scope.NewDCModel["txtIncubationTimeTemp4ControlId"] = "30C,72h";
            scope.NewDCModel["txtConfirmationTest4ControlId"] = "Milk agar,Oxldase,APL ZONE";
            //scope.NewDCModel["txtMaxCriteria4ControlId"] = "CFU/250ml";


            scope.NewDCModel["txtMediaUsed5ControlId"] = "KFS Streptococcus Agar";
            scope.NewDCModel["txtVolumeofSamples5ControlId"] = "100 ml";
            scope.NewDCModel["txtIncubationTimeTemp5ControlId"] = "35C,24h";
            scope.NewDCModel["txtConfirmationTest5ControlId"] = "Gram staining";
            //scope.NewDCModel["txtMaxCriteria5ControlId"] = "CFU/100ml";


            scope.NewDCModel["txtMediaUsed6ControlId"] = "Pre Enrichment in BPW Selective Enrrichment in RV TTB Selective media XLD,BSA";
            scope.NewDCModel["txtVolumeofSamples6ControlId"] = "25 ml";
            scope.NewDCModel["txtIncubationTimeTemp6ControlId"] = "37+/-0.5C,16 to 20h, 42+/-0.5C for 24+/-2h,37+/-0.5C,16 to 20h,37+/-0.5C,5h";
            scope.NewDCModel["txtConfirmationTest6ControlId"] = "TSI,LIA,Urea agar,Indole,Citrate,MRVP,API 20E";
            //scope.NewDCModel["txtMaxCriteria6ControlId"] = "/100mL";


        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndIceAnalysisControllerFacade.RefreshParameterTested", xlatService);
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
                    navigator.notification.alert("MN-RQ-NCF-001 :: Please provide signature first.", ['OK'], "");
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

    this.ShowIceAnalysisForm = function () {
        try {

            if (ShowIceAnalysisValidation()) {

                $scope.FoodAnalysisShow = true;
                $scope.SampleSheetHide = true;
                $scope.SampleSheetHide = true;
                $scope.DisableBack = true;

                MyInstance.UpdateParameterTestedCompletedStatusForEdit();
            }
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndFoodAnalysisController.ShowIceAnalysisForm", xlatService);
        }
    }

    var ShowIceAnalysisValidation = function () {
        try {
            var IsSuccess = true;


            var CommonMessage = "MN-RQ-SPI-001 :: Please enter ";
            var ErrorMessage = "";


            var IsSuccess = true;


            if (scope.NewDCModel.txtSamplingNoControlId == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Sample No.";
                IsSuccess = false;
            }
            if (scope.txtSamplingMethodControlId.GetSelectedText() == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Sampling Method";
                IsSuccess = false;
            }
            //if (scope.NewDCModel.txtSamplingPlanRefControlId == "") {
            //    if (ErrorMessage != "") {
            //        ErrorMessage = ErrorMessage + ",";
            //    }
            //    ErrorMessage = ErrorMessage + "Sampling Plan Ref.";
            //    IsSuccess = false;
            //}
            if (scope.NewDCModel.txtSamplingDescriptionControlId == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Sample Description";
                IsSuccess = false;
            }
            if (scope.NewDCModel.txtLocationControlId == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Location";
                IsSuccess = false;
            }

            //if (scope.AddlSectorControlId.GetSelectedText() == "") {
            //    if (ErrorMessage != "") {
            //        ErrorMessage = ErrorMessage + ",";
            //    }
            //    ErrorMessage = ErrorMessage + "Sample Sector";
            //    IsSuccess = false;
            //}
            //if (scope.AddlAirlineControlId.GetSelectedText() == "") {
            //    if (ErrorMessage != "") {
            //        ErrorMessage = ErrorMessage + ",";
            //    }
            //    ErrorMessage = ErrorMessage + "Airline";
            //    IsSuccess = false;
            //}
            //if (scope.AddlClassControlId.GetSelectedText() == "") {
            //    if (ErrorMessage != "") {
            //        ErrorMessage = ErrorMessage + ",";
            //    }
            //    ErrorMessage = ErrorMessage + "Class";
            //    IsSuccess = false;
            //}
          
            if (scope.NewDCModel.ATSampleCollectionTempControlId === "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Sample Collection Temp";
                IsSuccess = false;
            }
            
            if (document.getElementById("DTSampleCollectionTimeControlId").value == "" || document.getElementById("DTSampleCollectionTimeControlId").value == null) {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Sample Collection Time";
                IsSuccess = false;
            }
            if (scope.NewDCModel.ATAmbientTempControlId === "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Ambient Temp";
                IsSuccess = false;
            }
            if (document.getElementById("DTAmbientTimeControlId").value == "" || document.getElementById("DTAmbientTimeControlId").value == null) {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Ambient Time";
                IsSuccess = false;
            }
            if (scope["chkNAControlId"].GetSelectedText() == "" && scope.NewDCModel.ATLabChillerTempControlId === "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Storage in Lab Chiller Temp";
                IsSuccess = false;
            }
            if (scope["chkNAControlId"].GetSelectedText() == "" && (document.getElementById("DTLabChillerTimeControlId").value == "" || document.getElementById("DTLabChillerTimeControlId").value == null)) {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Storage in Lab Chiller Time";
            }
            if (scope.AddlSamplingToolsControlId.GetSelectedText() == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Sampling Tools";
                IsSuccess = false;
            }
            if (scope["chkConditionOfAreaOnSampling"].GetSelectedValue() == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Condition of area";
                IsSuccess = false;
            }
            else if (scope["chkConditionOfAreaOnSampling"].GetSelectedValue() == 254 && scope.AddlAreaConditionUnsatisfactoryControlId.GetSelectedText() == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Area condition";
                IsSuccess = false;
            }
            /*
            if (scope.NewDCModel.txtCollectedByControlId == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Collected By";
                IsSuccess = false;
            }

            if (scope["chkConditionOfSampleOnReceipt"].GetSelectedValue() == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Condition of sample";
                IsSuccess = false;
            }
            else if (scope["chkConditionOfSampleOnReceipt"].GetSelectedValue() == 254 && scope.AddlSampleConditionUnsatisfactoryControlId.GetSelectedText() == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Sampling Condition";
                IsSuccess = false;
            }
            if (scope.NewDCModel.txtVerifiedByControlId == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Verified By";
                IsSuccess = false;
            }

            if (scope["chkConditionOfSampleAnalysis"].GetSelectedValue() == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Condition of sample";
                IsSuccess = false;
            }
            else if (scope["chkConditionOfSampleAnalysis"].GetSelectedValue() == 254 && scope.AddlSampleAnalysisUnsatisfactoryControlId.GetSelectedText() == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Sampling Analysis";
                IsSuccess = false;
            }
            if (scope.NewDCModel.txtAnalysisVerifiedByControlId == "") {
                if (ErrorMessage != "") {
                    ErrorMessage = ErrorMessage + ",";
                }
                ErrorMessage = ErrorMessage + "Verified By";
                IsSuccess = false;
            }
            */
            //

            if (IsSuccess == false) {
                alert(CommonMessage + " " + ErrorMessage);
            }
            return IsSuccess;

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndWaterAnalysisController.ShowWaterAnalysisValidation", xlatService);
        }
    }
    var oEvaluationSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oEvaluationSelectedIndexChanged Start", "SamplingSheetAndIceAnalysisControllerFacade.oEvaluationSelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
            }

            OneViewConsole.Debug("oEvaluationSelectedIndexChanged End", "SamplingSheetAndIceAnalysisControllerFacade.oEvaluationSelectedIndexChanged");
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
            OneViewConsole.Debug("oOverallEvaluationSelectedIndexChanged Start", "SamplingSheetAndIceAnalysisControllerFacade.oOverallEvaluationSelectedIndexChanged");

            var remarks = "";
            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {

                if (EventArgs.NewValue.Name == "P") {
                    remarks = "Required Standards of Quality are met.";
                }
                else if (EventArgs.NewValue.Name == "F") {
                    remarks = "Required Standards of Quality are not met. To be followed up.";
                }

            }

            $scope.NewDCModel.txtRemarks1ControlId = remarks;


            OneViewConsole.Debug("oOverallEvaluationSelectedIndexChanged End", "SamplingSheetAndIceAnalysisControllerFacade.oOverallEvaluationSelectedIndexChanged");
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
            OneViewConsole.Debug("UpdateParameterTestedCompletedStatusForEdit Start", "SamplingSheetAndIceAnalysisControllerFacade.UpdateParameterTestedCompletedStatusForEdit");

            var BanDetails = [133, 134, 135, 136, 137, 138];

            for (var i = 0; i < BanDetails.length; i++) {
                MyInstance.UpdateParameterTestedCompletedStatus(BanDetails[i]);
            }

            OneViewConsole.Debug("UpdateParameterTestedCompletedStatusForEdit End", "SamplingSheetAndIceAnalysisControllerFacade.UpdateParameterTestedCompletedStatusForEdit");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndIceAnalysisControllerFacade.UpdateParameterTestedCompletedStatusForEdit", xlatService);
        }
        finally {
        }
    }

    this.UpdateParameterTestedCompletedStatus = function (BandDetailId) {

        try {
            OneViewConsole.Debug("UpdateParameterTestedCompletedStatus Start", "SamplingSheetAndIceAnalysisControllerFacade.UpdateParameterTestedCompletedStatus");

            if (BandDetailId != "" && BandDetailId != "" && BandDetailId != null) {
                var FoodAnalysisProducts = ["Tvb", "Coliforms", "Ecoll", "Pseudomonas", "Enterococcus", "Salmonella"];
                var ControlInfo = _oDataCaptureBO.GetIcAnalysisControlInfo(FoodAnalysisProducts[BandDetailId - 133]);

                _oDataCaptureBO.CheckCompletedStatusForParameterTested(ControlInfo, BandDetailId);
            }

            OneViewConsole.Debug("UpdateParameterTestedCompletedStatus End", "SamplingSheetAndIceAnalysisControllerFacade.UpdateParameterTestedCompletedStatus");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndIceAnalysisControllerFacade.UpdateParameterTestedCompletedStatus", xlatService);
        }
        finally {
        }
    }

    this.CalculateResult = function (Dilution, Count1, Count2, Result, Paramtertestedvalue) {

        try {
            OneViewConsole.Debug("CalculateResult Start", "SamplingSheetAndIceAnalysisControllerFacade.CalculateResult");

            Dilution = $scope.NewDCModel[Dilution];
            Count1 = $scope.NewDCModel[Count1];
            Count2 = $scope.NewDCModel[Count2];
            var TotalColonyCount = "";

            //alert( "Dilution : " + Dilution + "Count1 : " + Count1 + "Count2 : " + Count2);
            if ((Dilution != undefined && Dilution != '')) {
                if ((Count1 != undefined && Count1 != '') && (Count2 != undefined && Count2 != '')) {
                    Count1 = parseFloat(Count1);
                    Count2 = parseFloat(Count2);
                    TotalColonyCount = (Count1 + Count2) / 2;
                }
                else if (Count1 != undefined && Count1 != '') {
                    Count1 = parseFloat(Count1);
                    TotalColonyCount = Count1;
                }
                else if (Count2 != undefined && Count2 != '') {
                    Count2 = parseFloat(Count2);
                    TotalColonyCount = Count2;
                }

                Dilution = parseFloat(Dilution);

                //alert("Dilution : " + Dilution + "Count1 : " + Count1 + "Count2 : " + Count2);
                if (TotalColonyCount != "") {
                    TotalColonyCount = parseFloat(TotalColonyCount);
                    var ResultValue = (Dilution * TotalColonyCount);
                    //alert("Result : " + ResultValue);
                    if (!isNaN(ResultValue)) {
                        $scope.NewDCModel[Result] = ResultValue.toFixed(0);
                    }
                    else {
                        $scope.NewDCModel[Result] = "";
                    }
                }
            }
            else {
                $scope.NewDCModel[Result] = "";
            }
            if (Paramtertestedvalue != undefined) {
                MyInstance.UpdateParameterTestedCompletedStatus(Paramtertestedvalue);
            }

            OneViewConsole.Debug("CalculateResult End", "SamplingSheetAndIceAnalysisControllerFacade.CalculateResult");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndIceAnalysisControllerFacade.CalculateResult", xlatService);
        }
        finally {
        }
    }

    var SetSampleNumber = function () {

        try {
            OneViewConsole.Debug("SetSampleNumber Start", "SamplingSheetAndIceAnalysisControllerFacade.SetSampleNumber");

            var MasterConfig = {
                'Key': 'OneViewDCCriteriaNodeElementAdvance',
                'CriteriaType': '',
                'TemplateNodeId': 1662,
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
                MessageKey: "IC_$vn$MasterColumn$vn$_$vn$Month$vn$_",
                VariablesFinalJavaScriptEquation: {
                    "$vn$MasterColumn$vn$": "(GetRCOMasterAdv('" + JSON.stringify(MasterConfig) + "') != '' && GetRCOMasterAdv('" + JSON.stringify(MasterConfig) + "')) || 'XX'",
                    "$vn$Month$vn$": "GetDateTimeAdv('" + JSON.stringify(DateTimeConfig) + "')"
                }
            }

            scope.NewDCModel["txtSamplingNoControlId"] = oOneViewDCMessageWithDCCriteriaVariableEvaluationComponent.Evaluvate(oOneViewDCMessageWithDCCriteriaVariable);

            OneViewConsole.Debug("SetSampleNumber End", "SamplingSheetAndIceAnalysisControllerFacade.SetSampleNumber");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndIceAnalysisControllerFacade.SetSampleNumber", xlatService);
        }
        finally {
        }
    }

}


