
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
    
MyApp.controller('SamplingSheetAndEquipmentSwabAnalysisController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
    //oSetDefaultSpinner.Start();
        //  xlatService.setCurrentPage('SamplingSheetAndEquipmentswabAnalysis');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);

        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
	scope = $scope;
	oSnapRemote = snapRemote;


	var oSamplingSheetAndEquipmentSwabAnalysisFacade = new SamplingSheetAndEquipmentSwabAnalysisFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    oSamplingSheetAndEquipmentSwabAnalysisFacade.Init();
    oSamplingSheetAndEquipmentSwabAnalysisFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
  
    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oSamplingSheetAndEquipmentSwabAnalysisFacade.Destroy();
        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.SetSelectedTextBoxColor(ControlId);
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
        oSamplingSheetAndEquipmentSwabAnalysisFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
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
    ////    oSamplingSheetAndEquipmentSwabAnalysisFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc);
        ////}

    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {

        $scope.DisableSave = true;
        $scope.DisableSaveSubmit = true;
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oSamplingSheetAndEquipmentSwabAnalysisFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, Timeout);
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
        oSamplingSheetAndEquipmentSwabAnalysisFacade.ClearForm();
    }
    $scope.$on('$destroy', function () {

        //oOneViewAppInfoPlugin.ClearCache();
        //$location.replace(); //clear last history route
        //$templateCache.removeAll();

        //  ClearGlobalVariable();
        oSamplingSheetAndEquipmentSwabAnalysisFacade.Destroy();
        scope = null;
        ionicBackdrop = null;
        oSamplingSheetAndEquipmentSwabAnalysisFacade = null;
        $scope = null;
       
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oSamplingSheetAndEquipmentSwabAnalysisFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.SaveDCRecords(true);
    }



    $scope.CustomNCClick = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.ProbeTesting();
    };
    $scope.ClearReasons = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.ClearComments();
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
       
        oSamplingSheetAndEquipmentSwabAnalysisFacade.ShowIceAnalysisForm();
        
    }

    $scope.ShowSamplingSheet = function () {
        $scope.FoodAnalysisShow = false;
        $scope.SampleSheetHide = false;
        $scope.DisableBack = false;
       
    }

    //$scope.Signature = function () {
    //    oSamplingSheetAndEquipmentSwabAnalysisFacade.Signature();
        //}

    $scope.Signature = function (SignatureControlID) {
        // alert(SignatureControlID)
        oSamplingSheetAndEquipmentSwabAnalysisFacade.Signature(SignatureControlID);
    }


    $scope.ngChange_ActualValue = function (AttributeId, ControlId, MaxCriteria) {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.ngChange_ActualValue(AttributeId, ControlId, MaxCriteria);
    }
    $scope.UpdateParameterTestedCompletedStatus = function (BandDetailId) {
        oSamplingSheetAndEquipmentSwabAnalysisFacade.UpdateParameterTestedCompletedStatus(BandDetailId);
    }
   

});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function SamplingSheetAndEquipmentSwabAnalysisFacade(parm) {

    try {
        OneViewConsole.Debug("SamplingSheetAndEquipmentSwabAnalysisFacade Start", "Facade.SamplingSheetAndAirAnalysisControllerFacade");
        var Microbiology_HandSwabLabelId = 9;
        var Microbiology_EqSwabLabelId = 10;
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

        OneViewConsole.Debug("SamplingSheetAndEquipmentSwabAnalysisFacade End", "Facade.SamplingSheetAndAirAnalysisControllerFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.SamplingSheetAndEquipmentSwabAnalysisFacade", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.Init");

                    $scope.NewDCModel = {};
                    // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];

                    $scope.ParameterTested = [];

                    $scope.ShiftOptions = [];

                    $scope.NCOptions = [];
                    $scope.ActualValueResult3 = [];
                    $scope.ActualValueResult4 = [];
                    $scope.VictorySanitizerConcentration = [];

                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                OneViewConsole.Debug("Init End", "SamplingSheetAndEquipmentSwabAnalysisFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.Init", xlatService);
            }
        }

        this.ngChange_setIsManualFlag = function (ControlId) {
            try {
                OneViewConsole.Debug("ngChange_setIsManualFlag Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.ngChange_setIsManualFlag");

                _oDataCaptureBO.setIsManualFlag(ControlId);

                OneViewConsole.Debug("ngChange_setIsManualFlag End", "SamplingSheetAndEquipmentSwabAnalysisFacade.ngChange_setIsManualFlag");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.ngChange_setIsManualFlag", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.PageLoad");

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
                        //   RefreshParameterTested();
                    
                        if (IsHandOverUser(DcId)) {
                            var FirstName = OneViewSessionStorage.Get("LoginUserFirstName");
                            
                            if ($scope.NewDCModel.txtTVBAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtTVBAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtColiformsAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtColiformsAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtEcoliAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtEcoliAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtListeriaAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtListeriaAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtYeasAndMouldAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtYeasAndMouldAnalyzedByControlId = FirstName;
                            }
                            //if ($scope.NewDCModel.txtConductedByControlId == "") {
                            //    $scope.NewDCModel.txtConductedByControlId = FirstName;
                            //}
                           
                            

                          
                        }
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

                OneViewConsole.Debug("PageLoad End", "SamplingSheetAndEquipmentSwabAnalysisFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.PageLoad", xlatService);
            }
        }

        var IsHandOverUser = function (DcId) {
            try {
                OneViewConsole.Debug("IsHandOverUser Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.IsHandOverUser");

                var IsHandover = false;

                var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

                var Query = "Select Count(*) As Count " +
                          " From DcResultsEntity" +
                          " Where SystemUserId !=" + LoginUserId + " And DataCaptureId=" + DcId;

                //alert(Query)
                var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
                if (Result.length > 0) {
                    if (Result[0].Count > 0) {
                        IsHandover = true;
                    }
                }

                OneViewConsole.Debug("IsHandOverUser End", "SamplingSheetAndEquipmentSwabAnalysisFacade.IsHandOverUser");

                return IsHandover;
            }
            catch (Excep) {
                throw Excep;
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "SamplingSheetAndEquipmentSwabAnalysisFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'ATFoodTempControlId') {
                    $scope.ATFoodTempControlId = 'highlight';
                    $scope.ATBainMarieTempControlId = '';
                }
                else if (ControlId == 'ATBainMarieTempControlId') {                   
                    $scope.ATFoodTempControlId = '';
                    $scope.ATBainMarieTempControlId = 'highlight';
                }

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "SamplingSheetAndEquipmentSwabAnalysisFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.BindNc");

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

                OneViewConsole.Debug("BindNc End", "SamplingSheetAndEquipmentSwabAnalysisFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "SamplingSheetAndEquipmentSwabAnalysisFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "SamplingSheetAndEquipmentSwabAnalysisFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.SaveDCRecords");
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
                            alert('IN-MG-SPE-001 :: Data Capture Profiles are expired ');
                        }
                    }
                    _oDataCaptureBO.ShowDCSummary();
                    SetSelectedTextBoxColor_Private('txtTempControlId');

                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeCheckedControlId';
     
                OneViewConsole.Debug("SaveDCRecords End", "SamplingSheetAndEquipmentSwabAnalysisFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.SaveDCRecords", xlatService);
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

                OneViewConsole.Debug("Loadddl Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.Loadddl");



                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;

                var oChemicalsUsedddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlChemicalsUsedControlId', 'DataSourceModelName': 'ExpectedConditions', 'DisplayElementModelName': 'NewDCModel.AddlChemicalsUsedControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ChemicalsUsed, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8683 });
                oChemicalsUsedddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_ChemicalsUsed, _TableNamesEnum.OrganizationAssetsNode);
           
                var oUnitsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlUnitControlId', 'DataSourceModelName': 'Units', 'DisplayElementModelName': 'NewDCModel.AddlUnitControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Kitchen, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1840, 'SelectedIndexChangedEventHandler': oUnitsSelectedIndexChanged });
                oUnitsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Kitchen, _TableNamesEnum.OrganizationAssetsNode);

                var oDepartmentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1841, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
                //oDepartmentsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyDepartment, _TableNamesEnum.OrganizationAssetsNode);

                var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1842, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });
                //oSectionsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);

                var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1843 });
                //oLocationddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);

            

                var oEvaluation1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation1ControlId', 'DataSourceModelName': 'Evaluation1', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1854, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation2ControlId', 'DataSourceModelName': 'Evaluation2', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1858, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation3ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation3ControlId', 'DataSourceModelName': 'Evaluation3', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation3ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1862, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation3ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation4ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation4ControlId', 'DataSourceModelName': 'Evaluation3', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation4ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1866, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation4ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation5ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation5ControlId', 'DataSourceModelName': 'Evaluation3', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation5ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1870, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation5ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oOverallEvaluationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlOverAllEvaluationControlId', 'DataSourceModelName': 'OverallEvaluation1', 'DisplayElementModelName': 'NewDCModel.AddlOverAllEvaluationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8763, 'SelectedIndexChangedEventHandler': oOverallEvaluationSelectedIndexChanged });
                oOverallEvaluationddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oAnalyzedByUserddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtConductedByControlId', 'DataSourceModelName': 'AnalyzedByUser', 'DisplayElementModelName': 'NewDCModel.txtConductedByControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_AnalyzedByUser, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1873 });
                oAnalyzedByUserddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_AnalyzedByUser, _TableNamesEnum.OrganizationAssetsNode);
                oAnalyzedByUserddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'DCSignature', ColumnNames: ['Column1'], Seperater: '-' });
                

                OneViewConsole.Debug("Loadddl End", "SamplingSheetAndEquipmentSwabAnalysisFacade.Loadddl");
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
                OneViewConsole.Debug("SamplingSheetAndAirAnalysisControllerFacade Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.oUnitsSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    var oDepartmentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1841, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
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
                    var oDepartmentsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1841, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
                    $scope['AddlDepartmentControlId'].Clear();
                    $scope['AddlSectionControlId'].Clear();
                    $scope['AddlLocationControlId'].Clear();

                }


                OneViewConsole.Debug("SamplingSheetAndEquipmentSwabAnalysisFacade End", "SamplingSheetAndEquipmentSwabAnalysisFacade.oUnitsSelectedIndexChanged");
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
                OneViewConsole.Debug("SamplingSheetAndEquipmentSwabAnalysisFacade Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.oDepartmentSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {


                    var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1842, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });
                    oSectionsddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologySection, _TableNamesEnum.OrganizationAssetsNode);
                    //oSectionsddl.SetDataSourceFromTreeChildsWithTypeAndLabel(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologySection, _TableNamesEnum.OrganizationAssetsNode, Microbiology_HandSwabLabelId);

                    if (DcId == null || IsFirstTimeEdit == false) {

                        $scope['AddlSectionControlId'].Clear();
                        $scope['AddlLocationControlId'].Clear();
                        SetSampleNumber();
                    }
                }
                else {
                    var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1842, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });

                    $scope['AddlSectionControlId'].Clear();
                    $scope['AddlLocationControlId'].Clear();

                }


                OneViewConsole.Debug("SamplingSheetAndEquipmentSwabAnalysisFacade End", "SamplingSheetAndEquipmentSwabAnalysisFacade.oDepartmentSelectedIndexChanged");
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
                OneViewConsole.Debug("SamplingSheetAndEquipmentSwabAnalysisFacade Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.oSectionSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {


                    var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1843 });
                    oLocationddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);
                    //oLocationddl.SetDataSourceFromTreeChildsWithTypeAndLabel(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode, Microbiology_EqSwabLabelId);

                    if (DcId == null || IsFirstTimeEdit == false) {
                        $scope['AddlLocationControlId'].Clear();
                        SetSampleNumber();
                    }

                }
                else {
                    var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1843 });

                    $scope['AddlLocationControlId'].Clear();
                }


                OneViewConsole.Debug("SamplingSheetAndEquipmentSwabAnalysisFacade End", "SamplingSheetAndEquipmentSwabAnalysisFacade.oSectionSelectedIndexChanged");
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
                OneViewConsole.Debug("oOverallEvaluationSelectedIndexChanged Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.oOverallEvaluationSelectedIndexChanged");

                var remarks = "";
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {

                    if (EventArgs.NewValue.Name == "P") {
                        remarks = "Required Standards of Quality are met.";
                    }
                    else if (EventArgs.NewValue.Name == "F") {
                        remarks = "Required Standards of Quality are not met. To be followed up.";
                    }

                }

                $scope.NewDCModel.txtOverallEvaluationRemarksControlId = remarks;


                OneViewConsole.Debug("oOverallEvaluationSelectedIndexChanged End", "SamplingSheetAndEquipmentSwabAnalysisFacade.oOverallEvaluationSelectedIndexChanged");
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

                OneViewConsole.Debug("Temperature_NgKeyUp Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.Temperature_NgKeyUp");
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
                    // alert(ControlId);147, 148, 149, 150, 151
                    MyInstance.UpdateParameterTestedCompletedStatus(147);
                    MyInstance.UpdateParameterTestedCompletedStatus(148);
                    MyInstance.UpdateParameterTestedCompletedStatus(149);
                    MyInstance.UpdateParameterTestedCompletedStatus(150);
                    MyInstance.UpdateParameterTestedCompletedStatus(151);
                }
                OneViewConsole.Debug("Temperature_NgKeyUp End", "SamplingSheetAndEquipmentSwabAnalysisFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.Temperature_NgKeyUp", xlatService);
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
            
                OneViewConsole.Debug("ValidateActionNC Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "SamplingSheetAndEquipmentSwabAnalysisFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "SamplingSheetAndEquipmentSwabAnalysisFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "SamplingSheetAndEquipmentSwabAnalysisFacade.EvaluateActionNCStatus");
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
                OneViewConsole.Debug("ShowNCFormAction Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.ShowNCFormAction");

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



                OneViewConsole.Debug("ShowNCFormAction End", "SamplingSheetAndEquipmentSwabAnalysisFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.ShowNCFormAction", xlatService);
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
                OneViewConsole.Debug("LoadAnswerModes Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                var oParameterTested = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkParameterTested', 'DataSourceModelName': 'ParameterTested', 'DisplayElementModelName': 'NewDCModel.chkParameterTested' });
                oParameterTested.AnswerModes(TemplateNodes, 1850);

                var oNCOptions = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oNCOptions.LoadNCOptions();

                var oResult1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtActualValue3ControlId', 'DataSourceModelName': 'ActualValueResult3', 'DisplayElementModelName': 'NewDCModel.txtActualValue3ControlId' });
                oResult1.AnswerModes(TemplateNodes, 1860);
                
                var oResult2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtActualValue4ControlId', 'DataSourceModelName': 'ActualValueResult4', 'DisplayElementModelName': 'NewDCModel.txtActualValue4ControlId' });
                oResult2.AnswerModes(TemplateNodes, 1864);

                var _VictorySanitizer = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtVictoryControlId', 'DataSourceModelName': 'VictorySanitizerConcentration', 'DisplayElementModelName': 'NewDCModel.txtVictoryControlId' });
                _VictorySanitizer.AnswerModes(TemplateNodes, 1913);

                OneViewConsole.Debug("LoadAnswerModes End", "SamplingSheetAndEquipmentSwabAnalysisFacade.LoadAnswerModes");
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

                OneViewConsole.Debug("CreateDynamicElements Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.CreateDynamicElements");

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

                OneViewConsole.Debug("CreateDynamicElements End", "SamplingSheetAndEquipmentSwabAnalysisFacade.CreateDynamicElements");
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
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.Temperature_NgKeyUp");

                if (IsNc == true) {
                    ShowNCStatus(AttributeId, ControlId);
                }

                var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var ShowNCStatusOLD = function (AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.ShowNCStatus");

                var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
                NormalizeNCEntityListData(DCNCMappingListData);

                OneViewConsole.Debug("ShowNCStatus End", "SamplingSheetAndEquipmentSwabAnalysisFacade.ShowNCStatus");
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
                OneViewConsole.Debug("ClearForm Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.ClearForm");


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
                            scope.$apply();
                        }
                    }

                });

                

     
                OneViewConsole.Debug("ClearForm End", "SamplingSheetAndEquipmentSwabAnalysisFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "SamplingSheetAndEquipmentSwabAnalysisFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "SamplingSheetAndEquipmentSwabAnalysisFacade.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.PreControlEvents", xlatService);
            }
        }

        this.ngChange_setDateTime = function (ControlId) {
            try {
                _oDataCaptureBO.ngChange_setDateTime(ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.ngChange_setDateTime", xlatService);
            }
        }


        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.ProbeTesting", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.ClearComments", xlatService);
            }
        }

        this.Destroy = function () {
            try {
                _oDataCaptureBO.Destroy();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.Destroy", xlatService);
            }
        }
        
        var RefreshParameterTested = function () {
            try {

                //var _oOneViewSampleGenerator = new OneViewSampleGenerator();
                //var SampleNumber = _oOneViewSampleGenerator.GetNewSampleNumber("E");
                //scope.NewDCModel["txtSamplingNoControlId"] = SampleNumber;

                SetSampleNumber();


                //scope.NewDCModel["txtMaxCriteria1ControlId"] = "180 cfu/50 cm square";
                //scope.NewDCModel["txtMaxCriteria2ControlId"] = "20 cfu/50 cm square";
                //scope.NewDCModel["txtMaxCriteria3ControlId"] = "N.D/50 cm square";
                //scope.NewDCModel["txtMaxCriteria4ControlId"] = "N.D/50 cm square";
                //scope.NewDCModel["txtMaxCriteria5ControlId"] = "";

                scope.NewDCModel["txtMaxCriteria1ControlId"] = "180 cfu/swab";
                scope.NewDCModel["txtMaxCriteria2ControlId"] = "20 cfu/swab";
                scope.NewDCModel["txtMaxCriteria3ControlId"] = "N.D/swab";
                scope.NewDCModel["txtMaxCriteria4ControlId"] = "N.D/swab";
                scope.NewDCModel["txtMaxCriteria5ControlId"] = "<20/swab ";
                
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndAirAnalysisControllerFacade.RefreshParameterTested", xlatService);
            }
        }

        this.SaveSignature = function (ControlId, signaturePad) {
            try {
                OneViewConsole.Debug("SaveSignature Start", "SamplingSheetAndAirAnalysisControllerFacade.SaveSignature");
                $scope[ControlId + '_IsModified'] = true;

                $scope[ControlId + '_SignaturePad'] = signaturePad.toDataURL();//signaturePad
                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();
                //$scope.lblSignature = "Signed " + CurrenntDateAndTime;
                $scope[ControlId + '_lblSignature'] = "Signed " + CurrenntDateAndTime;
                //$scope.DivNGForm = true;
                //$scope.DivContent = false;
                //$scope.DivSignature = false;
                //$scope.$apply();
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

                OneViewConsole.Debug("SaveSignature End", "SamplingSheetAndAirAnalysisControllerFacade.SaveSignature");
            }
            catch (Excep) {
                //alert('SaveSignature :' + Excep + "," + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndAirAnalysisControllerFacade.SaveSignature", xlatService);
            }
            finally {
                oDateTime = null;
                CurrenntDateAndTime = null;
            }
        }

        this.ClearSignature = function (ControlId) {
            try {
                OneViewConsole.Debug("ClearSignature Start", "SamplingSheetAndAirAnalysisControllerFacade.ClearSignature");

                $scope[ControlId + '_IsModified'] = false;
                $scope[ControlId + '_SignaturePad'] = '';
                $scope.lblSignature = "";

                OneViewConsole.Debug("ClearSignature End", "SamplingSheetAndAirAnalysisControllerFacade.ClearSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndAirAnalysisControllerFacade.ClearSignature", xlatService);
            }
        }

        this.Signature = function (SignatureNameControlId) {
            try {
                OneViewConsole.Debug("Signature Start", "SamplingSheetAndAirAnalysisControllerFacade.Signature");

                //$scope.DivNGForm = true;
                //$scope.DivContent = false;
                //$scope.DivSignature = true;

                $scope[SignatureNameControlId + '_DivSignature'] = true;

                $timeout(function () {
                    SignatureContent(SignatureNameControlId);
                }, 100);


                OneViewConsole.Debug("Signature End", "SamplingSheetAndAirAnalysisControllerFacade.Signature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndAirAnalysisControllerFacade.Signature", xlatService);
            }
        }

        var SignatureContent = function (SignatureNameControlId) {
            try {
                OneViewConsole.Debug("SignatureContent Start", "SamplingSheetAndAirAnalysisControllerFacade.SignatureContent");

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
                //    MyInstance.ClearSignature('DCSignature');
                //}, false);

                //saveButton.removeEventListener('click', function (event) {
                //    signaturePad.clear();
                //    MyInstance.ClearSignature('DCSignature');
                //}, false);

                signaturePad = new SignaturePad(canvas);


                clearButton.addEventListener("click", function (event) {
                    signaturePad.clear();
                    MyInstance.ClearSignature(SignatureNameControlId);
                });

                saveButton.addEventListener("click", function (event) {
                    //alert(signaturePad.toDataURL().length);
                    if (signaturePad.isEmpty()) {
                        alert("MN-RQ-SPE-003 :: Please provide signature first.");
                    } else {
                        MyInstance.SaveSignature(SignatureNameControlId, signaturePad);
                    }


                });

                OneViewConsole.Debug("SignatureContent End", "SamplingSheetAndAirAnalysisControllerFacade.SignatureContent");
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

                if (ShowEquipmentSwabValidation()) {

                $scope.FoodAnalysisShow = true;
                $scope.SampleSheetHide = true;
                $scope.DisableBack = true;
                MyInstance.UpdateParameterTestedCompletedStatusForEdit();
               }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndFoodAnalysisController.ShowIceAnalysisForm", xlatService);
            }
        }

        var ShowEquipmentSwabValidation = function () {

            try {
                var IsSuccess = true;

                var CommonMessage = "MN-RQ-SPE-001 :: Please enter ";
                var ErrorMessage = "";

                var IsSuccess = true;

                if (scope.NewDCModel.txtSamplingDescriptionControlId == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Sampling Description";
                    IsSuccess = false;
                }
                //if (scope.NewDCModel.txtRemarksControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Remarks";
                //    IsSuccess = false;
                //}         
                
                if (IsSuccess == false) {
                    alert(CommonMessage + " " + ErrorMessage);
                }

                return IsSuccess;

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndIceAnalysisController.ShowEquipmentSwabValidation", xlatService);
            }
        }


        this.ngChange_ActualValue = function (AttributeId, ControlId, MaxCriteria) {
            try {
                
                if (scope.NewDCModel[ControlId] < 100) {
                    scope.NewDCModel[MaxCriteria]="Excellent";
                }
                else if (scope.NewDCModel[ControlId] > 300) {
                    scope.NewDCModel[MaxCriteria]="Poor";
                }
                else if (scope.NewDCModel[ControlId] == 100) {
                    scope.NewDCModel[MaxCriteria]="Acceptable";
                }
                else{
                    scope.NewDCModel[MaxCriteria]="";
                }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndFoodAnalysisController.ShowIceAnalysisForm", xlatService);
            }
        }
        //$scope.ngChange_ActualValue = function (AttributeId, ControlId, MaxCriteria) {
        //    SamplingSheetAndEquipmentSwabAnalysisFacade.ngChange_ActualValue(AttributeId, ControlId, MaxCriteria);
        //}
   
        var oEvaluationSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oEvaluationSelectedIndexChanged Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.oEvaluationSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                }

                OneViewConsole.Debug("oEvaluationSelectedIndexChanged End", "SamplingSheetAndEquipmentSwabAnalysisFacade.oEvaluationSelectedIndexChanged");
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
                OneViewConsole.Debug("UpdateParameterTestedCompletedStatusForEdit Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.UpdateParameterTestedCompletedStatusForEdit");

                var BanDetails = [147, 148, 149, 150, 151];

                for (var i = 0; i < BanDetails.length; i++) {
                    MyInstance.UpdateParameterTestedCompletedStatus(BanDetails[i]);
                }

                OneViewConsole.Debug("UpdateParameterTestedCompletedStatusForEdit End", "SamplingSheetAndEquipmentSwabAnalysisFacade.UpdateParameterTestedCompletedStatusForEdit");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.UpdateParameterTestedCompletedStatusForEdit", xlatService);
            }
            finally {
            }
        }

        this.UpdateParameterTestedCompletedStatus = function (BandDetailId) {

            try {
                OneViewConsole.Debug("UpdateParameterTestedCompletedStatus Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.UpdateParameterTestedCompletedStatus");

                var FoodAnalysisProducts = ["Tvb", "Coliforms", "Ecoli", "Listeria", "YeasAndMouldShow"];
                var ControlInfo = _oDataCaptureBO.GetEquipmentSwabAnalysisControlInfo(FoodAnalysisProducts[BandDetailId - 147]);

                _oDataCaptureBO.CheckCompletedStatusForParameterTested(ControlInfo, BandDetailId);

                OneViewConsole.Debug("UpdateParameterTestedCompletedStatus End", "SamplingSheetAndEquipmentSwabAnalysisFacade.UpdateParameterTestedCompletedStatus");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.UpdateParameterTestedCompletedStatus", xlatService);
            }
            finally {
            }
        }

        var SetSampleNumber = function () {

            try {
                OneViewConsole.Debug("SetSampleNumber Start", "SamplingSheetAndEquipmentSwabAnalysisFacade.SetSampleNumber");

                var MasterConfig = {
                    'Key': 'OneViewDCCriteriaNodeElementAdvance',
                    'CriteriaType': '',
                    'TemplateNodeId': 1842,
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
                    MessageKey: "ES_$vn$MasterColumn$vn$_$vn$Month$vn$_",
                    VariablesFinalJavaScriptEquation: {
                        "$vn$MasterColumn$vn$": "(GetRCOMasterAdv('" + JSON.stringify(MasterConfig) + "') != '' && GetRCOMasterAdv('" + JSON.stringify(MasterConfig) + "')) || 'XX'",
                        "$vn$Month$vn$": "GetDateTimeAdv('" + JSON.stringify(DateTimeConfig) + "')"
                    }
                }

                scope.NewDCModel["txtSamplingNoControlId"] = oOneViewDCMessageWithDCCriteriaVariableEvaluationComponent.Evaluvate(oOneViewDCMessageWithDCCriteriaVariable);

                OneViewConsole.Debug("SetSampleNumber End", "SamplingSheetAndEquipmentSwabAnalysisFacade.SetSampleNumber");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndEquipmentSwabAnalysisFacade.SetSampleNumber", xlatService);
            }
            finally {
            }
        }
}


