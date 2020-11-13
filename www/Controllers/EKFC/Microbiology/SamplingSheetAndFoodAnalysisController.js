
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
    
MyApp.controller('SamplingSheetAndFoodAnalysisController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
    //oSetDefaultSpinner.Start();
        //  xlatService.setCurrentPage('SamplingSheetAndFoodAnalysis');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);

        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
	scope = $scope;
	oSnapRemote = snapRemote;


	var oSamplingSheetAndFoodAnalysisController = new SamplingSheetAndFoodAnalysisController({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    oSamplingSheetAndFoodAnalysisController.Init();
    oSamplingSheetAndFoodAnalysisController.PageLoad();
	//oSetDefaultSpinner.Stop();
  
    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oSamplingSheetAndFoodAnalysisController.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oSamplingSheetAndFoodAnalysisController.Destroy();

        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oSamplingSheetAndFoodAnalysisController.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oSamplingSheetAndFoodAnalysisController.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oSamplingSheetAndFoodAnalysisController.SetSelectedTextBoxColor(ControlId);
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
        oSamplingSheetAndFoodAnalysisController.SetAutoTemperatureListener(EventArg, TimeModelId);
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
    ////    oSamplingSheetAndFoodAnalysisController.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc);
        ////}

    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {

        $scope.DisableSave = true;
        $scope.DisableSaveSubmit = true;
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oSamplingSheetAndFoodAnalysisController.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, Timeout);
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
        oSamplingSheetAndFoodAnalysisController.ClearForm();
    }
    $scope.$on('$destroy', function () {

        //oOneViewAppInfoPlugin.ClearCache();
        //$location.replace(); //clear last history route
        //$templateCache.removeAll();

        //  ClearGlobalVariable();
        oSamplingSheetAndFoodAnalysisController.Destroy();
        scope = null;
        ionicBackdrop = null;
        oSamplingSheetAndFoodAnalysisController = null;
        $scope = null;
       
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oSamplingSheetAndFoodAnalysisController.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oSamplingSheetAndFoodAnalysisController.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oSamplingSheetAndFoodAnalysisController.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oSamplingSheetAndFoodAnalysisController.SaveDCRecords(true);
    }



    $scope.CustomNCClick = function () {
        oSamplingSheetAndFoodAnalysisController.CustomNCClick();
    }

    $scope.NCClick = function () {
        oSamplingSheetAndFoodAnalysisController.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oSamplingSheetAndFoodAnalysisController.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oSamplingSheetAndFoodAnalysisController.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oSamplingSheetAndFoodAnalysisController.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oSamplingSheetAndFoodAnalysisController.ProbeTesting();
    };
    $scope.ClearReasons = function () {
        oSamplingSheetAndFoodAnalysisController.ClearReasons();
    }

    $scope.ClearComments = function () {
        oSamplingSheetAndFoodAnalysisController.ClearComments();
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


    $scope.ShowFoodAnalysisForm = function () {
        oSamplingSheetAndFoodAnalysisController.ShowFoodAnalysisForm();
    }

    $scope.ShowSamplingSheet = function () {
        $scope.FoodAnalysisShow = false;
        $scope.SampleSheetHide = false;
        $scope.DisableBack = false;       
    }

    $scope.Signature = function (SignatureControlID) {
        oSamplingSheetAndFoodAnalysisController.Signature(SignatureControlID);
    }

    $scope.UpdateParameterTestedCompletedStatus = function (BandDetailId) {
        oSamplingSheetAndFoodAnalysisController.UpdateParameterTestedCompletedStatus(BandDetailId);
    }

    $scope.CalculateResult = function (Volumeofinoculum, Dilution, Count1, Count2, Result, Paramtertestedvalue) {
        oSamplingSheetAndFoodAnalysisController.CalculateResult(Volumeofinoculum, Dilution, Count1, Count2, Result, Paramtertestedvalue);
    }

});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function SamplingSheetAndFoodAnalysisController(parm) {

    try {
        OneViewConsole.Debug("oSamplingSheetAndFoodAnalysisController Start", "Facade.ThawingVerificationFacade");

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
        var IsPageLoad = true;

        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
      
      //  var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("oSamplingSheetAndFoodAnalysisController End", "Facade.ThawingVerificationFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.oSamplingSheetAndFoodAnalysisController", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "oSamplingSheetAndFoodAnalysisController.Init");

                    $scope.NewDCModel = {};
                    // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];
                   
                    $scope.ConditionOfAreaOnSampling = [];
                    $scope.ConditionOfSampleOnReceipt = [];
                    $scope.ConditionOfSampleAnalysis = [];
                    $scope.AnalysisReason = [];
                    $scope.ParameterTested = [];
                    $scope.FoodReceivedTypes = [];
                    $scope.PreparationShifts = [];
                    $scope.ColiformsTest1s = [];
                    $scope.ColiformsTest2s = [];

                    $scope.EcoliTest1s = [];
                    $scope.EcoliTest2s = [];
                    $scope.EcoliTest3s = [];
                    $scope.EcoliTest4s = [];
                    $scope.EcoliTest5s = [];
                    $scope.EcoliTest6s = [];
                    $scope.EcoliTest7s = [];

                    $scope.SaureusTest1s = [];
                    $scope.SaureusTest2s = [];

                    $scope.BcereusTest1s = [];
                    $scope.BcereusTest2s = [];
                    $scope.BcereusTest3s = [];
                    $scope.BcereusTest4s = [];

                    $scope.VparahaemolyticusTest1s = [];
                    $scope.VparahaemolyticusTest2s = [];
                    $scope.VparahaemolyticusTest3s = [];

                    $scope.SalmonellaTest1s = [];
                    $scope.SalmonellaTest2s = [];
                    $scope.SalmonellaTest3s = [];
                    $scope.SalmonellaTest4s = [];
                    $scope.SalmonellaTest5s = [];
                    
                    $scope.MonocytogenesTest1s = [];
                    $scope.MonocytogenesTest2s = [];
                    $scope.MonocytogenesTest3s = [];
                    $scope.MonocytogenesTest4s = [];
                    $scope.MonocytogenesTest5s = [];

                    $scope.ClostridiumTest1s = [];
                    $scope.ClostridiumTest2s = [];
                    $scope.ClostridiumTest3s = [];

                    $scope.CampylobacterTest1s = [];
                    $scope.CampylobacterTest2s = [];
                    $scope.CampylobacterTest3s = [];
                    $scope.CampylobacterTest4s = [];
                    $scope.CampylobacterTest5s = [];

                    $scope.Result3s = [];
                    $scope.Result7s = [];
                    $scope.Result8s = [];
                    $scope.Result11s = [];
                    $scope.Result6s = [];

                    $scope.YMCTest1s = [];

                    $scope.ShiftOptions = [];
                    
                    $scope.NCOptions = [];
                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                    $scope.NotApplicables = [];
                OneViewConsole.Debug("Init End", "oSamplingSheetAndFoodAnalysisController.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.Init", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "oSamplingSheetAndFoodAnalysisController.PageLoad");

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

                        //Added : 28-12-2015 (Default value at the time of edit)
                        _oDataCaptureBO.setDefaultValue();


                        if (IsHandOverUser(DcId)) {
                            //var FirstName = "";
                            //var _UserMasterDAO = new UserMasterDAO();
                            //var _Userdteials = _UserMasterDAO.GetUserDetails(LoginUserName, OneViewSessionStorage.Get("LoginUserOrgName"));
                            //FirstName = _Userdteials[0].Name;
                            var FirstName = OneViewSessionStorage.Get("LoginUserFirstName");                            
                           
                            if ($scope.NewDCModel.txtVerifiedByControlId == "") {
                                $scope.NewDCModel.txtVerifiedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtAnalysisVerifiedByControlId == "") {
                                $scope.NewDCModel.txtAnalysisVerifiedByControlId = FirstName;
                            }
                            //if ($scope.NewDCModel.txtConductedByControlId == "") {
                            //    $scope.NewDCModel.txtConductedByControlId = FirstName;
                            //}

                            if ($scope.NewDCModel.txtTVBAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtTVBAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtColiAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtColiAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtEcoliAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtEcoliAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtSaurAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtSaurAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtBcerAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtBcerAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtVparaAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtVparaAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtSalmAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtSalmAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtListAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtListAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtClostAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtClostAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtYMCAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtYMCAnalyzedByControlId = FirstName;
                            }
                            if ($scope.NewDCModel.txtCampyAnalyzedByControlId == "") {
                                $scope.NewDCModel.txtCampyAnalyzedByControlId = FirstName;
                            }
                        }
                    }
                    else {
                        $scope.Add = 'Add';
                        _oDataCaptureBO.setDefaultValue();
                        RefreshParameterTested();
                        SetSampleNumber();
                    }

                    ///AuditSummary
                    _oDataCaptureBO.ShowDCSummary();
                    _oSettingsBO.ShowAutoManualStatus($scope);

                  

                    new OnewViewEventListener().RegisterSelectedFieldEvent();
                    IsPageLoad = false;
                OneViewConsole.Debug("PageLoad End", "oSamplingSheetAndFoodAnalysisController.PageLoad");
            }

            catch (Excep) {
                IsPageLoad = false;
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.PageLoad", xlatService);
            }
        }

        var IsHandOverUser = function (DcId) {
            try {
                OneViewConsole.Debug("IsHandOverUser Start", "oSamplingSheetAndFoodAnalysisController.IsHandOverUser");

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
               
                OneViewConsole.Debug("IsHandOverUser End", "oSamplingSheetAndFoodAnalysisController.IsHandOverUser");

                return IsHandover;
            }
            catch (Excep) {
                throw Excep;
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "oSamplingSheetAndFoodAnalysisController.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "oSamplingSheetAndFoodAnalysisController.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "oSamplingSheetAndFoodAnalysisController.SetSelectedTextBoxColor_Private");

                if (ControlId == 'ATSampleCollectionTempControlId') {
                    $scope.ATSampleCollectionTempControlId = 'highlight';
                    $scope.ATAmbientTempControlId = '';
                    $scope.ATLabChillerTempControlId = '';
                    //$scope.ATReceivingTemperatureControlId = '';
                }
                else if (ControlId == 'ATAmbientTempControlId') {
                    $scope.ATSampleCollectionTempControlId = '';
                    $scope.ATAmbientTempControlId = 'highlight';
                    $scope.ATLabChillerTempControlId = '';
                    //$scope.ATReceivingTemperatureControlId = '';
                }
                else if (ControlId == 'ATLabChillerTempControlId') {
                    $scope.ATSampleCollectionTempControlId = '';
                    $scope.ATAmbientTempControlId = '';
                    $scope.ATLabChillerTempControlId = 'highlight';
                    //$scope.ATReceivingTemperatureControlId = '';
                }
                //else if (ControlId == 'ATReceivingTemperatureControlId') {
                //    $scope.ATSampleCollectionTempControlId = '';
                //    $scope.ATAmbientTempControlId = '';
                //    $scope.ATLabChillerTempControlId = '';
                //    $scope.ATReceivingTemperatureControlId = 'highlight';
                //}
                

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "oSamplingSheetAndFoodAnalysisController.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "oSamplingSheetAndFoodAnalysisController.BindNc");

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

                OneViewConsole.Debug("BindNc End", "oSamplingSheetAndFoodAnalysisController.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "oSamplingSheetAndFoodAnalysisController.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "oSamplingSheetAndFoodAnalysisController.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "oSamplingSheetAndFoodAnalysisController.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "oSamplingSheetAndFoodAnalysisController.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "oSamplingSheetAndFoodAnalysisController.SaveDCRecords");

                IsPageLoad = true;
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
                            SetSampleNumber();
                        }

                        else {
                            _oDataCaptureBO.ClearControls(scope, TemplateNodes);
                            alert('IN-SU-SFA-001 :: Data Capture Profiles are expired ');
                        }
                    }
                    _oDataCaptureBO.ShowDCSummary();
                    // SetSelectedTextBoxColor_Private('txtTempControlId');

                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeCheckedControlId';
                
                    IsPageLoad = false;
                OneViewConsole.Debug("SaveDCRecords End", "oSamplingSheetAndFoodAnalysisController.SaveDCRecords");
            }
            catch (Excep) {
                IsPageLoad = false;
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.SaveDCRecords", xlatService);
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

                OneViewConsole.Debug("Loadddl Start", "oSamplingSheetAndFoodAnalysisController.Loadddl");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;


                var oUnitsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlUnitControlId', 'DataSourceModelName': 'Units', 'DisplayElementModelName': 'NewDCModel.AddlUnitControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Kitchen, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1776, 'IsDynamicElementCreationEnabled': false, 'SelectedIndexChangedEventHandler': oUnitsSelectedIndexChanged });
                oUnitsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Kitchen, _TableNamesEnum.OrganizationAssetsNode);

                var oDepartment1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1457, 'IsDynamicElementCreationEnabled': false, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
                //oDepartment1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Department, _TableNamesEnum.OrganizationAssetsNode);

                //var oSamplingDescriptionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSamplingDescriptionControlId', 'DataSourceModelName': 'SampleLocation', 'DisplayElementModelName': 'NewDCModel.AddlSamplingDescriptionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Canteen, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1376 });
                //oSamplingDescriptionddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Canteen, _TableNamesEnum.OrganizationAssetsNode);
                
                //var oSampleLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSampleLocationControlId', 'DataSourceModelName': 'SampleLocation', 'DisplayElementModelName': 'NewDCModel.AddlSampleLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1378 });
                //oSampleLocationddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);

                var oSamplingMethodddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtSamplingMethodControlId', 'DataSourceModelName': 'SamplingMethod', 'DisplayElementModelName': 'NewDCModel.txtSamplingMethodControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_SamplingMethod, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1374 });
                oSamplingMethodddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_SamplingMethod, _TableNamesEnum.OrganizationAssetsNode);
               
                var oAirlineddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airline', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Airline, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1379 });
                oAirlineddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Airline, _TableNamesEnum.OrganizationAssetsNode);

                var oClassddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlClassControlId', 'DataSourceModelName': 'Class', 'DisplayElementModelName': 'NewDCModel.AddlClassControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Class, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1380 });
                oClassddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Class, _TableNamesEnum.OrganizationAssetsNode);

                var oMealTypeddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlMealTypeControlId', 'DataSourceModelName': 'MealTypes', 'DisplayElementModelName': 'NewDCModel.AddlMealTypeControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MealsType, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1381 });
                oMealTypeddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MealsType, _TableNamesEnum.OrganizationAssetsNode);
                
                var oSamplingToolsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSamplingToolsControlId', 'DataSourceModelName': 'SamplingTools', 'DisplayElementModelName': 'NewDCModel.AddlSamplingToolsControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_SampleTools, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1390 });
                oSamplingToolsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_SampleTools, _TableNamesEnum.OrganizationAssetsNode);
                
                var oAreaConditionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAreaConditionUnsatisfactoryControlId', 'DataSourceModelName': 'AreaCondition', 'DisplayElementModelName': 'NewDCModel.AddlAreaConditionUnsatisfactoryControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ConditionOfSampleArea, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1393 });
                oAreaConditionddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_ConditionOfSampleArea, _TableNamesEnum.OrganizationAssetsNode);

                var oSampleConditionUnsatisfactoryddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSampleConditionUnsatisfactoryControlId', 'DataSourceModelName': 'SampleCondition', 'DisplayElementModelName': 'NewDCModel.AddlSampleConditionUnsatisfactoryControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ConditionOfSample, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1397 });
                oSampleConditionUnsatisfactoryddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_ConditionOfSample, _TableNamesEnum.OrganizationAssetsNode);

                var oSampleAnalysisUnsatisfactoryddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSampleAnalysisUnsatisfactoryControlId', 'DataSourceModelName': 'SampleAnalysis', 'DisplayElementModelName': 'NewDCModel.AddlSampleAnalysisUnsatisfactoryControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ConditionOfSample, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1400 });
                oSampleAnalysisUnsatisfactoryddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_ConditionOfSample, _TableNamesEnum.OrganizationAssetsNode);

                //var oShiftddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlShiftControlId', 'DataSourceModelName': 'Shift', 'DisplayElementModelName': 'NewDCModel.AddlShiftControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Canteen, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 2510 });
                //oShiftddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Canteen, _TableNamesEnum.OrganizationAssetsNode);

                var oSectorddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectorControlId', 'DataSourceModelName': 'Sectors', 'DisplayElementModelName': 'NewDCModel.AddlSectorControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Sector, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 3688 });
                oSectorddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Sector, _TableNamesEnum.OrganizationAssetsNode);

                var oFoodAnalysisddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFoodAnalysisTypeControlId', 'DataSourceModelName': 'SampleLocation', 'DisplayElementModelName': 'NewDCModel.AddlFoodAnalysisTypeControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_FoodAnalysisType, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1477, 'SelectedIndexChangedEventHandler': oFoodAnalysisSelectedIndexChanged });
                oFoodAnalysisddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_FoodAnalysisType, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation1ControlId', 'DataSourceModelName': 'Evaluation1', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1426, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation2ControlId', 'DataSourceModelName': 'Evaluation2', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1436, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation3ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation3ControlId', 'DataSourceModelName': 'Evaluation3', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation3ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1446, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation3ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation4ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation4ControlId', 'DataSourceModelName': 'Evaluation4', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation4ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1456, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation4ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation5ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation5ControlId', 'DataSourceModelName': 'Evaluation5', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation5ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1466, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation5ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation6ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation6ControlId', 'DataSourceModelName': 'Evaluation6', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation6ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1476, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation6ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation7ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation7ControlId', 'DataSourceModelName': 'Evaluation7', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation7ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1486, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation7ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation8ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation8ControlId', 'DataSourceModelName': 'Evaluation8', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation8ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1496, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation8ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation9ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation9ControlId', 'DataSourceModelName': 'Evaluation9', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation9ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1506, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation9ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation10ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation10ControlId', 'DataSourceModelName': 'Evaluation10', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation10ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1516, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation10ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);

                var oEvaluation11ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEvaluation11ControlId', 'DataSourceModelName': 'Evaluation11', 'DisplayElementModelName': 'NewDCModel.AddlEvaluation11ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1526, 'SelectedIndexChangedEventHandler': oEvaluationSelectedIndexChanged });
                oEvaluation11ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);
                



                var oEquipmentUsed1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed1ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1421, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsed2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed2ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1431, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsed3ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed3ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed3ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1441, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed3ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsed4ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed4ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed4ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1451, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed4ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsed5ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed5ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed5ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1461, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed5ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsed6ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed6ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed6ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1471, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed6ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsed7ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed7ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed7ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1481, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed7ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsed8ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed8ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed8ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1491, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed8ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsed9ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed9ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed9ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1501, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed9ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsed10ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed10ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed10ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1511, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed10ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsed11ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtEquipmentUsed11ControlId', 'DataSourceModelName': 'EquipmentUsed1', 'DisplayElementModelName': 'NewDCModel.txtEquipmentUsed11ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1521, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsed11ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);
               

                var oDilutionFactor1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst1ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1422, 'SelectedIndexChangedEventHandler': DilutionFactorSelected1IndexChanged });
                oDilutionFactor1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);

                var oDilutionFactor2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst2ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1432, 'SelectedIndexChangedEventHandler': DilutionFactorSelected2IndexChanged });
                oDilutionFactor2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);

                var oDilutionFactor4ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst4ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst4ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1452, 'SelectedIndexChangedEventHandler': DilutionFactorSelected4IndexChanged });
                oDilutionFactor4ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);

                var oDilutionFactor5ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst5ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst5ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1462, 'SelectedIndexChangedEventHandler': DilutionFactorSelected5IndexChanged });
                oDilutionFactor5ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);

                var oDilutionFactor6ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst6ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst6ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1472, 'SelectedIndexChangedEventHandler': DilutionFactorSelected6IndexChanged });
                oDilutionFactor6ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);

                var oDilutionFactor9ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst9ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst9ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1502, 'SelectedIndexChangedEventHandler': DilutionFactorSelected9IndexChanged });
                oDilutionFactor9ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);

                var oDilutionFactor10ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtColonyCountDilutionFirst10ControlId', 'DataSourceModelName': 'DilutionFactor', 'DisplayElementModelName': 'NewDCModel.txtColonyCountDilutionFirst10ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DilutionFactor, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1512, 'SelectedIndexChangedEventHandler': DilutionFactorSelected10IndexChanged });
                oDilutionFactor10ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_DilutionFactor, _TableNamesEnum.OrganizationAssetsNode);


                var oPresumptiveResult1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlPresumptiveResult1ControlId', 'DataSourceModelName': 'PresumptiveResult', 'DisplayElementModelName': 'NewDCModel.AddlPresumptiveResult1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_PresumptiveResult, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8749, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oPresumptiveResult1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_PresumptiveResult, _TableNamesEnum.OrganizationAssetsNode);

                var oPresumptiveResult2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlPresumptiveResult2ControlId', 'DataSourceModelName': 'PresumptiveResult', 'DisplayElementModelName': 'NewDCModel.AddlPresumptiveResult2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_PresumptiveResult, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8750, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oPresumptiveResult2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_PresumptiveResult, _TableNamesEnum.OrganizationAssetsNode);

                var oPresumptiveResult3ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlPresumptiveResult3ControlId', 'DataSourceModelName': 'PresumptiveResult', 'DisplayElementModelName': 'NewDCModel.AddlPresumptiveResult3ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_PresumptiveResult, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8751, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oPresumptiveResult3ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_PresumptiveResult, _TableNamesEnum.OrganizationAssetsNode);

                var oPresumptiveResult4ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlPresumptiveResult4ControlId', 'DataSourceModelName': 'PresumptiveResult', 'DisplayElementModelName': 'NewDCModel.AddlPresumptiveResult4ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_PresumptiveResult, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8752, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oPresumptiveResult4ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_PresumptiveResult, _TableNamesEnum.OrganizationAssetsNode);

                var oPresumptiveResult5ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlPresumptiveResult5ControlId', 'DataSourceModelName': 'PresumptiveResult', 'DisplayElementModelName': 'NewDCModel.AddlPresumptiveResult5ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_PresumptiveResult, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8753, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oPresumptiveResult5ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_PresumptiveResult, _TableNamesEnum.OrganizationAssetsNode);


                var oOverallEvaluationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlOverAllEvaluationControlId', 'DataSourceModelName': 'OverallEvaluation1', 'DisplayElementModelName': 'NewDCModel.AddlOverAllEvaluationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Evaluation, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 8758, 'SelectedIndexChangedEventHandler': oOverallEvaluationSelectedIndexChanged });
                oOverallEvaluationddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Evaluation, _TableNamesEnum.OrganizationAssetsNode);


                // Additional fields for the equipment should be provided if multiselection in dropdown list is not applicable
                var oEquipmentUsedSecond1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond1ControlId', 'DataSourceModelName': 'EquipmentUsedSecond1', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond1ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10405, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond1ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsedSecond2ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond2ControlId', 'DataSourceModelName': 'EquipmentUsedSecond2', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond2ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10406, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond2ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsedSecond3ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond3ControlId', 'DataSourceModelName': 'EquipmentUsedSecond3', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond3ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10407, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond3ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsedSecond4ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond4ControlId', 'DataSourceModelName': 'EquipmentUsedSecond4', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond4ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10408, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond4ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsedSecond5ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond5ControlId', 'DataSourceModelName': 'EquipmentUsedSecond5', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond5ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10409, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond5ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsedSecond6ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond6ControlId', 'DataSourceModelName': 'EquipmentUsedSecond6', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond6ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10410, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond6ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsedSecond7ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond7ControlId', 'DataSourceModelName': 'EquipmentUsedSecond7', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond7ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10411, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond7ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsedSecond8ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond8ControlId', 'DataSourceModelName': 'EquipmentUsedSecond8', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond8ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10412, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond8ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsedSecond9ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond9ControlId', 'DataSourceModelName': 'EquipmentUsedSecond9', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond9ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10413, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond9ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsedSecond10ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond10ControlId', 'DataSourceModelName': 'EquipmentUsedSecond10', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond10ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10414, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond10ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);

                var oEquipmentUsedSecond11ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlEquipmentUsedSecond11ControlId', 'DataSourceModelName': 'EquipmentUsedSecond11', 'DisplayElementModelName': 'NewDCModel.AddlEquipmentUsedSecond11ControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_EquipmentUsed, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10415, 'SelectedIndexChangedEventHandler': EquipmentUsedSelectedIndexChanged });
                oEquipmentUsedSecond11ddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_EquipmentUsed, _TableNamesEnum.OrganizationAssetsNode);


                var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10423, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });
                //oSectionsddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);

                var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1378 });
                //oLocationddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);


                var oSamplingContainerddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSamplingContainerControlId', 'DataSourceModelName': 'SamplingContainers', 'DisplayElementModelName': 'NewDCModel.AddlSamplingContainerControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_SampleContainers, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10424, 'SelectedIndexChangedEventHandler': oSamplingContainerSelectedIndexChanged });
                oSamplingContainerddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_SampleContainers, _TableNamesEnum.OrganizationAssetsNode);

               // var oAnalyzedByUserddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtConductedByControlId', 'DataSourceModelName': 'AnalyzedByUser', 'DisplayElementModelName': 'NewDCModel.txtConductedByControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_AnalyzedByUser, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1427, 'SelectedIndexChangedEventHandler': oAnalyzedByUserSelectedIndexChanged });
                var oAnalyzedByUserddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'txtConductedByControlId', 'DataSourceModelName': 'AnalyzedByUser', 'DisplayElementModelName': 'NewDCModel.txtConductedByControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_AnalyzedByUser, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1427});
                oAnalyzedByUserddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_AnalyzedByUser, _TableNamesEnum.OrganizationAssetsNode);                
                oAnalyzedByUserddl.DefaultRefreshJobs.push({ Type: 'DefaultTextboxRefreshJob', ControlId: 'DCSignature', ColumnNames: ['Column1'], Seperater: '-' });

                OneViewConsole.Debug("Loadddl End", "oSamplingSheetAndFoodAnalysisController.Loadddl");
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
                OneViewConsole.Debug("oSamplingSheetAndFoodAnalysisController Start", "oSamplingSheetAndFoodAnalysisController.oUnitsSelectedIndexChanged");

                var DepartmentId = '';
                var DepartmentName = '';
                if ((($scope['AddlDepartmentControlId'] != undefined && $scope['AddlDepartmentControlId'].GetSelectedText() != undefined) && ($scope['AddlDepartmentControlId'].GetSelectedText() != ''))) {
                    DepartmentId = $scope['AddlDepartmentControlId'].GetSelectedValue();
                    DepartmentName = $scope['AddlDepartmentControlId'].GetSelectedText();

                }

                
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {


                    var oDepartment1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1457, 'IsDynamicElementCreationEnabled': false, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged });
                    oDepartment1ddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyDepartment, _TableNamesEnum.OrganizationAssetsNode);

                    if (DcId == null || IsFirstTimeEdit == false) {
                        // oSectionddl.Clear();      
                        $scope['AddlDepartmentControlId'].Clear();
                        SetSampleNumber();
                    }

                    if (DepartmentId != '' && DepartmentName != '' && IsPageLoad == true) {
                        $scope['AddlDepartmentControlId'].Set({ Id: DepartmentId, Name: DepartmentName, "IsDynamicElement": false });
                    }

                }
                else {
                    var oDepartment1ddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Departments', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyDepartment, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1457, 'IsDynamicElementCreationEnabled': false });
                    $scope['AddlDepartmentControlId'].Clear();

                    if (DepartmentId != '' && DepartmentName != '' && IsPageLoad == true) {
                        $scope['AddlDepartmentControlId'].Set({ Id: DepartmentId, Name: DepartmentName, "IsDynamicElement": false });
                    }
                }


                OneViewConsole.Debug("oSamplingSheetAndFoodAnalysisController End", "oSamplingSheetAndFoodAnalysisController.oUnitsSelectedIndexChanged");
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


                    var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10423, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });
                    //oSectionsddl.SetDataSourceFromTreeChildsWithTypeAndLabel(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologySection, _TableNamesEnum.OrganizationAssetsNode, Microbiology_IceLabelId);
                    oSectionsddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologySection, _TableNamesEnum.OrganizationAssetsNode);

                    if (DcId == null || IsFirstTimeEdit == false) {

                        $scope['AddlSectionControlId'].Clear();
                        $scope['AddlLocationControlId'].Clear();
                        SetSampleNumber();
                    }
                }
                else {
                    var oSectionsddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Sections', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologySection, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10423, 'SelectedIndexChangedEventHandler': oSectionSelectedIndexChanged });

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


                    var LocationsId = '';
                    var LocationsName = '';
                    if ((($scope['AddlLocationControlId'] != undefined && $scope['AddlLocationControlId'].GetSelectedText() != undefined) && ($scope['AddlLocationControlId'].GetSelectedText() != ''))) {
                        //alert('LoadNCddl : ' + $scope['ddlDepartmentControlId'].GetSelectedText() + " : " + $scope['ddlDepartmentControlId'].GetSelectedValue());
                        LocationsId = $scope['AddlLocationControlId'].GetSelectedValue();
                        LocationsName = $scope['AddlLocationControlId'].GetSelectedText();

                    }

                    var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1378 });
                    oLocationddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode);
                    //oLocationddl.SetDataSourceFromTreeChildsWithTypeAndLabel(EventArgs.NewValue.Id, DATEntityType.RCOMaster_MicrobiologyLocation, _TableNamesEnum.OrganizationAssetsNode, Microbiology_IceLabelId);

                    if (DcId == null || IsFirstTimeEdit == false) {
                        $scope['AddlLocationControlId'].Clear();
                        SetSampleNumber();
                    }
                    else {
                        if (LocationsId != '' && LocationsName != '') {
                            $scope['AddlLocationControlId'].Set({ Id: LocationsId, Name: LocationsName, "IsDynamicElement": false });                         
                        }
                    }
                }
                else {
                    var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1378 });

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
    //oSamplingContainerSelectedIndexChanged
        var oSamplingContainerSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("SamplingSheetAndIceAnalysisControllerFacade Start", "SamplingSheetAndIceAnalysisControllerFacade.oSamplingContainerSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {
                    var text = $scope['AddlSamplingContainerControlId'].GetSelectedText();

                    if (text == "Others") {
                        //show textbox
                        $scope.SamplingContainerOthersShow = true;
                    }
                    else {
                        //hide textbox
                        $scope.SamplingContainerOthersShow = false;
                        scope.NewDCModel.txtSamplingContainerOthersControlId = "";
                    }
                }
                else {
                    $scope.SamplingContainerOthersShow = false;
                    scope.NewDCModel.txtSamplingContainerOthersControlId = "";
                    //var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Locations', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MicrobiologyLocation, 'IsDynamicElementCreationEnabled': true, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 1378 });

                    //$scope['AddlLocationControlId'].Clear();
                }


                OneViewConsole.Debug("oSamplingSheetAndIceAnalysisControllerFacade End", "oSamplingSheetAndIceAnalysisControllerFacade.oSamplingContainerSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }
        //var oFoodAnalysisSelectedIndexChanged = function (EventArgs) {
        //    try {
        //        OneViewConsole.Debug("SamplingSheetAndAirAnalysisControllerFacade Start", "SamplingSheetAndAirAnalysisControllerFacade.oUnitsSelectedIndexChanged");

                
        //        if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id !="") {

        //          //  alert('oFoodAnalysisSelectedIndexChanged');
        //            scope[AnswerModeObject.ControlId].Set({ Id: AnswerToBind.Answer, Name: AnswerToBind.AnswerValue, ColourIndex: Colour.ColourIndex, selected: true });

        //            scope[MyInstance.DataSourceModelName].push({ Id: BandDetailsData[itrBand].Value, Name: BandDetailsData[itrBand].Name, 'AttributeNodeId': AttributeNodeId, ControlId: MyInstance.ControlId, ColourIndex: BandDetailsData[itrBand].ColourIndex, Selected: false })

        //            if (DcId == null || IsFirstTimeEdit == false) {

                    
        //            }
        //        }
        //        else {
                  

        //        }


        //        OneViewConsole.Debug("oSamplingSheetAndAirAnalysisControllerFacade End", "oSamplingSheetAndAirAnalysisControllerFacade.oUnitsSelectedIndexChanged");
        //    }
        //    catch (Excep) {
        //        throw Excep;
        //    }
        //    finally {
        //        oSectionddl = null;
        //    }
        //}

        this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
            try {
                
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "oSamplingSheetAndFoodAnalysisController.Temperature_NgKeyUp");
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
                   // alert(ControlId);
                    MyInstance.UpdateParameterTestedCompletedStatus(122);
                    MyInstance.UpdateParameterTestedCompletedStatus(123);
                    MyInstance.UpdateParameterTestedCompletedStatus(124);
                    MyInstance.UpdateParameterTestedCompletedStatus(125);
                    MyInstance.UpdateParameterTestedCompletedStatus(126);
                    MyInstance.UpdateParameterTestedCompletedStatus(127);
                    MyInstance.UpdateParameterTestedCompletedStatus(128);
                    MyInstance.UpdateParameterTestedCompletedStatus(129);
                    MyInstance.UpdateParameterTestedCompletedStatus(130);
                    MyInstance.UpdateParameterTestedCompletedStatus(131);
                    MyInstance.UpdateParameterTestedCompletedStatus(132);
                }
                else if (ControlId == "txtResult3ControlId") {
                    MyInstance.UpdateParameterTestedCompletedStatus(124);
                }
                else if (ControlId == "txtResult6ControlId") {

                    MyInstance.UpdateParameterTestedCompletedStatus(127);

                }
                else if (ControlId == "txtResult7ControlId") {
                    MyInstance.UpdateParameterTestedCompletedStatus(128);
                }
                else if (ControlId == "txtResult8ControlId") {
                    MyInstance.UpdateParameterTestedCompletedStatus(129);
                }
                else if (ControlId == "txtResult11ControlId") {
                    MyInstance.UpdateParameterTestedCompletedStatus(132);
                }
            

                if (ControlId == "ATLabChillerTempControlId" || ControlId == "DTLabChillerTimeControlId") {
                 
                    if (document.getElementById("DTLabChillerTimeControlId").value != "") {
                        var oDateTime = new DateTime();
                        
                        var CurrentDate = oDateTime.GetDate();
                        var CurrentDateSplitted = CurrentDate.split("-");                       
                        var SelectedTime= document.getElementById("DTLabChillerTimeControlId").value;
                        var SelectedTimeSplitted = SelectedTime.split(":");   
                        var Answer = new Date(parseInt(CurrentDateSplitted[2]), parseInt(CurrentDateSplitted[1] - 1), parseInt(CurrentDateSplitted[0]), parseInt(SelectedTimeSplitted[0]), parseInt(SelectedTimeSplitted[1]));
                        document.getElementById("DTDateofReceiptControlId").value = Answer;
                        $scope.NewDCModel.DTDateofReceiptControlId = Answer;                     
                    }
                    else {
                        document.getElementById("DTDateofReceiptControlId").value = "";
                        $scope.NewDCModel.DTDateofReceiptControlId = "";
                    }
                }
                OneViewConsole.Debug("Temperature_NgKeyUp End", "oSamplingSheetAndFoodAnalysisController.Temperature_NgKeyUp");
            }
            catch (Excep) {
               // alert('Temperature_NgKeyUp Excep : ' + Excep)
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.Temperature_NgKeyUp", xlatService);
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
            
                OneViewConsole.Debug("ValidateActionNC Start", "oSamplingSheetAndFoodAnalysisController.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "oSamplingSheetAndFoodAnalysisController.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "oSamplingSheetAndFoodAnalysisController.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "oSamplingSheetAndFoodAnalysisController.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "oSamplingSheetAndFoodAnalysisController.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "oSamplingSheetAndFoodAnalysisController.EvaluateActionNCStatus");
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
                OneViewConsole.Debug("ShowNCFormAction Start", "oSamplingSheetAndFoodAnalysisController.ShowNCFormAction");

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



                OneViewConsole.Debug("ShowNCFormAction End", "oSamplingSheetAndFoodAnalysisController.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.ShowNCFormAction", xlatService);
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
                OneViewConsole.Debug("LoadAnswerModes Start", "oSamplingSheetAndFoodAnalysisController.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                var oConditionOfArea = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkConditionOfAreaOnSampling', 'DataSourceModelName': 'ConditionOfAreaOnSampling', 'DisplayElementModelName': 'NewDCModel.chkConditionOfAreaOnSampling' });
                oConditionOfArea.AnswerModes(TemplateNodes, 1392);

                var oConditionOfSampleType = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkConditionOfSampleOnReceipt', 'DataSourceModelName': 'ConditionOfSampleOnReceipt', 'DisplayElementModelName': 'NewDCModel.chkConditionOfSampleOnReceipt' });
                oConditionOfSampleType.AnswerModes(TemplateNodes, 1396);

                var oConditionOfSampleAnalysis = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkConditionOfSampleAnalysis', 'DataSourceModelName': 'ConditionOfSampleAnalysis', 'DisplayElementModelName': 'NewDCModel.chkConditionOfSampleAnalysis' });
                oConditionOfSampleAnalysis.AnswerModes(TemplateNodes, 1399);

                var oAnalysisReason = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkAnalysisReason', 'DataSourceModelName': 'AnalysisReason', 'DisplayElementModelName': 'NewDCModel.chkAnalysisReason' });
                oAnalysisReason.AnswerModes(TemplateNodes, 1417);

                var oParameterTested = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkParameterTested', 'DataSourceModelName': 'ParameterTested', 'DisplayElementModelName': 'NewDCModel.chkParameterTested' });
                oParameterTested.AnswerModes(TemplateNodes, 1418);

                var oFoodReceivedTypes = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkFoodReceivedType', 'DataSourceModelName': 'FoodReceivedTypes', 'DisplayElementModelName': 'NewDCModel.chkFoodReceivedType' });
                oFoodReceivedTypes.AnswerModes(TemplateNodes, 1437);

                var oPreparationShifts = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkPreparationShiftControlId', 'DataSourceModelName': 'PreparationShifts', 'DisplayElementModelName': 'NewDCModel.chkPreparationShiftControlId' });
                oPreparationShifts.AnswerModes(TemplateNodes, 8491);

                var oColiformsTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkColiformsTest1ControlId', 'DataSourceModelName': 'ColiformsTest1s', 'DisplayElementModelName': 'NewDCModel.chkColiformsTest1ControlId' });
                oColiformsTest2.AnswerModes(TemplateNodes, 8492);

                var oColiformsTest3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkColiformsTest2ControlId', 'DataSourceModelName': 'ColiformsTest2s', 'DisplayElementModelName': 'NewDCModel.chkColiformsTest2ControlId' });
                oColiformsTest3.AnswerModes(TemplateNodes, 8493);

                var oEcoliTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest1ControlId', 'DataSourceModelName': 'EcoliTest1s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest1ControlId' });
                oEcoliTest1.AnswerModes(TemplateNodes, 8494);

                //var oEcoliTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest2ControlId', 'DataSourceModelName': 'EcoliTest2s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest2ControlId' });
                //oEcoliTest2.AnswerModes(TemplateNodes, 8495);

                var oEcoliTest3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest3ControlId', 'DataSourceModelName': 'EcoliTest3s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest3ControlId' });
                oEcoliTest3.AnswerModes(TemplateNodes, 8496);

                var oEcoliTest4 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest4ControlId', 'DataSourceModelName': 'EcoliTest4s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest4ControlId' });
                oEcoliTest4.AnswerModes(TemplateNodes, 8497);

                var oEcoliTest5 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest5ControlId', 'DataSourceModelName': 'EcoliTest5s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest5ControlId' });
                oEcoliTest5.AnswerModes(TemplateNodes, 8498);

                var oEcoliTest6 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest6ControlId', 'DataSourceModelName': 'EcoliTest6s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest6ControlId' });
                oEcoliTest6.AnswerModes(TemplateNodes, 8499);

                var oEcoliTest7 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkEcoliTest7ControlId', 'DataSourceModelName': 'EcoliTest7s', 'DisplayElementModelName': 'NewDCModel.chkEcoliTest7ControlId' });
                oEcoliTest7.AnswerModes(TemplateNodes, 8500);

                var oSaureusTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSaureusTest1ControlId', 'DataSourceModelName': 'SaureusTest1s', 'DisplayElementModelName': 'NewDCModel.chkSaureusTest1ControlId' });
                oSaureusTest1.AnswerModes(TemplateNodes, 8501);

                var oSaureusTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSaureusTest2ControlId', 'DataSourceModelName': 'SaureusTest2s', 'DisplayElementModelName': 'NewDCModel.chkSaureusTest2ControlId' });
                oSaureusTest2.AnswerModes(TemplateNodes, 8502);

                var oBcereus1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkBcereusTest1ControlId', 'DataSourceModelName': 'BcereusTest1s', 'DisplayElementModelName': 'NewDCModel.chkBcereusTest1ControlId' });
                oBcereus1.AnswerModes(TemplateNodes, 8503);

                var oBcereus2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkBcereusTest2ControlId', 'DataSourceModelName': 'BcereusTest2s', 'DisplayElementModelName': 'NewDCModel.chkBcereusTest2ControlId' });
                oBcereus2.AnswerModes(TemplateNodes, 8504);

                var oBcereus3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkBcereusTest3ControlId', 'DataSourceModelName': 'BcereusTest3s', 'DisplayElementModelName': 'NewDCModel.chkBcereusTest3ControlId' });
                oBcereus3.AnswerModes(TemplateNodes, 8505);

                var oBcereus4 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkBcereusTest4ControlId', 'DataSourceModelName': 'BcereusTest4s', 'DisplayElementModelName': 'NewDCModel.chkBcereusTest4ControlId' });
                oBcereus4.AnswerModes(TemplateNodes, 8506);

                var oVparahaemolyticus1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkVparahaemolyticusTest1ControlId', 'DataSourceModelName': 'VparahaemolyticusTest1s', 'DisplayElementModelName': 'NewDCModel.chkVparahaemolyticusTest1ControlId' });
                oVparahaemolyticus1.AnswerModes(TemplateNodes, 8507);

                var oVparahaemolyticus2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkVparahaemolyticusTest2ControlId', 'DataSourceModelName': 'VparahaemolyticusTest2s', 'DisplayElementModelName': 'NewDCModel.chkVparahaemolyticusTest2ControlId' });
                oVparahaemolyticus2.AnswerModes(TemplateNodes, 8508);

                var oVparahaemolyticus3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkVparahaemolyticusTest3ControlId', 'DataSourceModelName': 'VparahaemolyticusTest3s', 'DisplayElementModelName': 'NewDCModel.chkVparahaemolyticusTest3ControlId' });
                oVparahaemolyticus3.AnswerModes(TemplateNodes, 8509);

                //Salmonella
                var oSalmonellaTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaTest1ControlId', 'DataSourceModelName': 'SalmonellaTest1s', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaTest1ControlId' });
                oSalmonellaTest1.AnswerModes(TemplateNodes, 8510);

                var oSalmonellaTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaTest2ControlId', 'DataSourceModelName': 'SalmonellaTest2s', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaTest2ControlId' });
                oSalmonellaTest2.AnswerModes(TemplateNodes, 8511);

                var oSalmonellaTest3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaTest3ControlId', 'DataSourceModelName': 'SalmonellaTest3s', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaTest3ControlId' });
                oSalmonellaTest3.AnswerModes(TemplateNodes, 8512);

                var oSalmonellaTest4 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaTest4ControlId', 'DataSourceModelName': 'SalmonellaTest4s', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaTest4ControlId' });
                oSalmonellaTest4.AnswerModes(TemplateNodes, 8513);

                var oSalmonellaTest5 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSalmonellaTest5ControlId', 'DataSourceModelName': 'SalmonellaTest5s', 'DisplayElementModelName': 'NewDCModel.chkSalmonellaTest5ControlId' });
                oSalmonellaTest5.AnswerModes(TemplateNodes, 8514);

                //monocytogenes
                var oMonocytogenesTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkMonocytogenesTest1ControlId', 'DataSourceModelName': 'MonocytogenesTest1s', 'DisplayElementModelName': 'NewDCModel.chkMonocytogenesTest1ControlId' });
                oMonocytogenesTest1.AnswerModes(TemplateNodes, 8515);

                var oMonocytogenesTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkMonocytogenesTest2ControlId', 'DataSourceModelName': 'MonocytogenesTest2s', 'DisplayElementModelName': 'NewDCModel.chkMonocytogenesTest2ControlId' });
                oMonocytogenesTest2.AnswerModes(TemplateNodes, 8516);

                var oMonocytogenesTest3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkMonocytogenesTest3ControlId', 'DataSourceModelName': 'MonocytogenesTest3s', 'DisplayElementModelName': 'NewDCModel.chkMonocytogenesTest3ControlId' });
                oMonocytogenesTest3.AnswerModes(TemplateNodes, 8517);

                var oMonocytogenesTest4 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkMonocytogenesTest4ControlId', 'DataSourceModelName': 'MonocytogenesTest4s', 'DisplayElementModelName': 'NewDCModel.chkMonocytogenesTest4ControlId' });
                oMonocytogenesTest4.AnswerModes(TemplateNodes, 8518);

                var oMonocytogenesTest5 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkMonocytogenesTest5ControlId', 'DataSourceModelName': 'MonocytogenesTest5s', 'DisplayElementModelName': 'NewDCModel.chkMonocytogenesTest5ControlId' });
                oMonocytogenesTest5.AnswerModes(TemplateNodes, 8519);

                //Clostridium perfringens

                var oClostridiumTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkClostridiumTest1ControlId', 'DataSourceModelName': 'ClostridiumTest1s', 'DisplayElementModelName': 'NewDCModel.chkClostridiumTest1ControlId' });
                oClostridiumTest1.AnswerModes(TemplateNodes, 8520);

                var oClostridiumTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkClostridiumTest2ControlId', 'DataSourceModelName': 'ClostridiumTest2s', 'DisplayElementModelName': 'NewDCModel.chkClostridiumTest2ControlId' });
                oClostridiumTest2.AnswerModes(TemplateNodes, 8521);

                var oClostridiumTest3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkClostridiumTest3ControlId', 'DataSourceModelName': 'ClostridiumTest3s', 'DisplayElementModelName': 'NewDCModel.chkClostridiumTest3ControlId' });
                oClostridiumTest3.AnswerModes(TemplateNodes, 8522);

                //Campylobacter sp

                var oCampylobacterTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCampylobacterTest1ControlId', 'DataSourceModelName': 'CampylobacterTest1s', 'DisplayElementModelName': 'NewDCModel.chkCampylobacterTest1ControlId' });
                oCampylobacterTest1.AnswerModes(TemplateNodes, 8523);

                var oCampylobacterTest2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCampylobacterTest2ControlId', 'DataSourceModelName': 'CampylobacterTest2s', 'DisplayElementModelName': 'NewDCModel.chkCampylobacterTest2ControlId' });
                oCampylobacterTest2.AnswerModes(TemplateNodes, 8524);

                var oCampylobacterTest3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCampylobacterTest3ControlId', 'DataSourceModelName': 'CampylobacterTest3s', 'DisplayElementModelName': 'NewDCModel.chkCampylobacterTest3ControlId' });
                oCampylobacterTest3.AnswerModes(TemplateNodes, 8525);

                var oCampylobacterTest4 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCampylobacterTest4ControlId', 'DataSourceModelName': 'CampylobacterTest4s', 'DisplayElementModelName': 'NewDCModel.chkCampylobacterTest4ControlId' });
                oCampylobacterTest4.AnswerModes(TemplateNodes, 8526);

                var oCampylobacterTest5 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCampylobacterTest5ControlId', 'DataSourceModelName': 'CampylobacterTest5s', 'DisplayElementModelName': 'NewDCModel.chkCampylobacterTest5ControlId' });
                oCampylobacterTest5.AnswerModes(TemplateNodes, 8527);

                //yeast and Mould
                var oYMCTest1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkYMCTest1ControlId', 'DataSourceModelName': 'YMCTest1s', 'DisplayElementModelName': 'NewDCModel.chkYMCTest1ControlId' });
                oYMCTest1.AnswerModes(TemplateNodes, 8528);


                //For Result
                //E.coli
                var oResult1 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtResult3ControlId', 'DataSourceModelName': 'Result3s', 'DisplayElementModelName': 'NewDCModel.txtResult3ControlId' });
                oResult1.AnswerModes(TemplateNodes, 1445);
                //Salmonella
                var oResult2 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtResult7ControlId', 'DataSourceModelName': 'Result7s', 'DisplayElementModelName': 'NewDCModel.txtResult7ControlId' });
                oResult2.AnswerModes(TemplateNodes, 1485);
                //listeria 
                var oResult3 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtResult8ControlId', 'DataSourceModelName': 'Result8s', 'DisplayElementModelName': 'NewDCModel.txtResult8ControlId' });
                oResult3.AnswerModes(TemplateNodes, 1495);
                //campylobacter
                var oResult4 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtResult11ControlId', 'DataSourceModelName': 'Result11s', 'DisplayElementModelName': 'NewDCModel.txtResult11ControlId' });
                oResult4.AnswerModes(TemplateNodes, 1525);
                //vibrio
                var oResult5 = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'txtResult6ControlId', 'DataSourceModelName': 'Result6s', 'DisplayElementModelName': 'NewDCModel.txtResult6ControlId' });
                oResult5.AnswerModes(TemplateNodes, 1475);

                var oNCOptions = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oNCOptions.LoadNCOptions();



                var oNotApplicables = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNAControlId', 'DataSourceModelName': 'NotApplicables', 'DisplayElementModelName': 'NewDCModel.chkNAControlId' });
                oNotApplicables.AnswerModes(TemplateNodes, 10420);

                OneViewConsole.Debug("LoadAnswerModes End", "oSamplingSheetAndFoodAnalysisController.LoadAnswerModes");
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

                    //alert('oFoodAnalysisSelectedIndexChanged');

                    var AnswerModeData = TemplateNodes[1418];
                    var FoodAnalysisType = scope.AddlFoodAnalysisTypeControlId.GetSelectedText();

                    var BandDetailsData = BandDetailsForFoodProducts(FoodAnalysisType);


                    scope['ParameterTested'] = [];
                    for (var itrBand in BandDetailsData) {
                        if (BandDetailsData[itrBand].Name == "TVB") {
                            scope.NewDCModel["txtMaxCriteria1ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria1UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else if (BandDetailsData[itrBand].Name == "Coliforms") {
                            scope.NewDCModel["txtMaxCriteria2ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria2UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else if (BandDetailsData[itrBand].Name == "E.coli") {
                            scope.NewDCModel["txtMaxCriteria3ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria3UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else if (BandDetailsData[itrBand].Name == "C.P.staphylococci") {
                            scope.NewDCModel["txtMaxCriteria4ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria4UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else if (BandDetailsData[itrBand].Name == "B.cereus") {
                            scope.NewDCModel["txtMaxCriteria5ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria5UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else if (BandDetailsData[itrBand].Name == "V.parahaemolyticus") {
                            scope.NewDCModel["txtMaxCriteria6ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria6UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else if (BandDetailsData[itrBand].Name == "Salmonella") {
                            scope.NewDCModel["txtMaxCriteria7ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria7UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else if (BandDetailsData[itrBand].Name == "Listeria monocytogenes") {
                            scope.NewDCModel["txtMaxCriteria8ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria8UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else if (BandDetailsData[itrBand].Name == "Clostridium perfringens") {
                            scope.NewDCModel["txtMaxCriteria9ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria9UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else if (BandDetailsData[itrBand].Name == "YMC") {
                            scope.NewDCModel["txtMaxCriteria10ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria10UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        else if (BandDetailsData[itrBand].Name == "Campylobacter") {
                            scope.NewDCModel["txtMaxCriteria11ControlId"] = BandDetailsData[itrBand].MaxLimt;
                            scope.NewDCModel["txtMaxCriteria11UnitControlId"] = BandDetailsData[itrBand].Unit;
                        }
                        
                        var SelectedStatus = false;
                        if (scope["chkParameterTested"].GetSelectedValue() != "" && scope["chkParameterTested"].GetSelectedValue() != undefined) {
                            
                            if (scope["chkParameterTested"].GetSelectedValue() == BandDetailsData[itrBand].Value) {
                                //alert("oFoodAnalysisSelectedIndexChanged : " + scope["chkParameterTested"].GetSelectedValue() + " BandDetailsData[itrBand].Value :" + BandDetailsData[itrBand].Value);
                                SelectedStatus = true;
                            }

                        }
                        scope['ParameterTested'].push({ Id: BandDetailsData[itrBand].Value, Name: BandDetailsData[itrBand].Name, 'AttributeNodeId': 1418, ControlId: 'chkParameterTested', ColourIndex: BandDetailsData[itrBand].ColourIndex, 'DefaultBackgroundColour': BandDetailsData[itrBand].DefaultBackgroundColour, Selected: SelectedStatus })
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

        var oEvaluationSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oEvaluationSelectedIndexChanged Start", "SamplingSheetAndAirAnalysisControllerFacade.oEvaluationSelectedIndexChanged");

                //if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                //}               

                OneViewConsole.Debug("oEvaluationSelectedIndexChanged End", "oSamplingSheetAndAirAnalysisControllerFacade.oEvaluationSelectedIndexChanged");
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



        var EquipmentUsedSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("EquipmentUsedSelectedIndexChanged Start", "SamplingSheetAndAirAnalysisControllerFacade.EquipmentUsedSelectedIndexChanged");
              
                //if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                //}

                OneViewConsole.Debug("EquipmentUsedSelectedIndexChanged End", "oSamplingSheetAndAirAnalysisControllerFacade.EquipmentUsedSelectedIndexChanged");
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
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "SamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    //MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                    MyInstance.CalculateResult('txtVolumeOfInoculum1ControlId', 'txtColonyCountDilutionFirst1ControlId', 'txtColonyCountDilutionSecond1ControlId', 'txtFactor1ControlId', 'txtResult1ControlId', 122);
                }
                MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
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
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "SamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    //MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                    MyInstance.CalculateResult('txtVolumeOfInoculum2ControlId', 'txtColonyCountDilutionFirst2ControlId', 'txtColonyCountDilutionSecond2ControlId', 'txtFactor2ControlId', 'txtResult2ControlId', 123);
                }
                MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
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
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "SamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    //MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                    MyInstance.CalculateResult('txtVolumeOfInoculum3ControlId', 'txtColonyCountDilutionFirst4ControlId', 'txtColonyCountDilutionSecond4ControlId', 'txtFactor4ControlId', 'txtResult4ControlId', 125);
                }
                MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
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
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "SamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    //MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                    MyInstance.CalculateResult('txtVolumeOfInoculum4ControlId', 'txtColonyCountDilutionFirst5ControlId', 'txtColonyCountDilutionSecond5ControlId', 'txtFactor5ControlId', 'txtResult5ControlId', 126);
                }
                MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }

        var DilutionFactorSelected6IndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "SamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
                //if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());                  
                //}
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }

        var DilutionFactorSelected9IndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "SamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    //MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                    MyInstance.CalculateResult('txtVolumeOfInoculum5ControlId', 'txtColonyCountDilutionFirst9ControlId', 'txtColonyCountDilutionSecond9ControlId', 'txtFactor9ControlId', 'txtResult9ControlId', 130);
                }
                MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }

        var DilutionFactorSelected10IndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged Start", "SamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id != "") {
                    //MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                    MyInstance.CalculateResult('txtVolumeOfInoculum6ControlId', 'txtColonyCountDilutionFirst10ControlId', 'txtColonyCountDilutionSecond10ControlId', 'txtFactor10ControlId', 'txtResult10ControlId', 131);
                }
                MyInstance.UpdateParameterTestedCompletedStatus(scope.chkParameterTested.GetSelectedValue());
                OneViewConsole.Debug("DilutionFactorSelectedIndexChanged End", "oSamplingSheetAndAirAnalysisControllerFacade.DilutionFactorSelectedIndexChanged");
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
        var NewOptionalColor = "#FFCC00";

        var BandDetailsForFoodProducts_OLD = function (FoodAnalysisType) {
            var Band = {
                "01 Poultry": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^5 / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' }
                    //  4: { 'Name': 'YMC', 'Value': 131, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor },
                },
                "02 Meat": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^5 / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' },
                    4: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^3 / gm' }
                    //  5: { 'Name': 'YMC', 'Value': 131, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor },
                },
                "03 Fish and Shell Fish": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^5 / gm' },
                    2: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25 gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' }
                },
                "04 Pasteurized Frozen Whole Egg and Egg Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^4 / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    5: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    6: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' },
                    7: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / gm' }
                },
                //Changed
                "04 Pasteurized Frozen Whole Egg and  Egg Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^4 / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    5: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    6: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' },
                    7: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / gm' }
                },
                "05 Dried Food to be cooked": {
                    1: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100 / gm' },
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "06 U.H.T. Milk, Cream Dairy Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / ml.' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' }
                },
                //changed
                "06 U.H.T. Milk  Cream Dairy Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / ml.' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' }
                },
                "07 Cream and Dairy Products": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm or ml.' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm or ml.' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm or ml.' },
                    5: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm or ml.' },
                    6: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "08 Pasteurized Milk and Cream. Other Pasteurized Milk Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^4 / ml.' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 / ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / ml.' },
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                //Changed
                "08 Pasteurized Milk and Cream. Other  Pasteurized Milk Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^4 / ml.' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 / ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / ml.' },
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "09 Cream with added flavours": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^4 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' }
                },
                "10 Whipped Cream": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^4 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "11 Fermented Cream": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / ml.' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm ' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "12 Ice Cream": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2.5 x 10^4 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                //Changes from server
                "12 Ice   Cream": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2.5 x 10^4 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "13 Processed Cheese": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D /gm' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' }
                },
                "14 Soft Cheese": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "15 Hard, Semi-Hard Cheese (Un-processed)": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                //without comma,from server comma is not displaying in dropdown
                "15 Hard  Semi Hard Cheese  (Un processed)": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                "16 Preserved Food (Heat Treated)": {
                    1: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' },
                    5: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "17 Seafood Dried": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^4 / gm' },
                    2: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25 gm' },
                    3: { 'Name': 'E.coll', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D /gm' }
                },
                "18 Canned, Pouched or Bottled Food": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10 / gm' }
                },
                //without comma,comma is not displaying in dropdown
                "18 Canned  Pouched or Bottled Food": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10 / gm' }
                },
                "19 Dried Heat Processed Foods": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D /gm' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' }
                },
                "20 Dried Heat Processed Foods (Ready to Eat after Rehydration)": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    5: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    6: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' }
                },
                "21 Dried Raw Foods (Ready to Eat)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100,000 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "22 Non-Dairy Fats & Oils": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                //without -, - is not displaying in dropdown
                "22 Non Dairy Fats & Oils": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                "23 Different Types of Chocolates": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                //24. Honey :not added
                "24 Honey": {
                    1: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '102 / gm' },
                },
                "25 Molasses, Hard Brown Sugar": {
                    1: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                //without comma, comma is not displaying in dropdown
                "25 Molasses  Hard Brown Sugar": {
                    1: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "26 Dyes (Food Colours)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^3/ gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "27 Yeast": {
                    1: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "28 Gelatin": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5x 10^3 / gm' },
                    2: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' },
                    3: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' }
                },
                "29 Margarine": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "30 Tea & Coffee": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '0 / gm' }
                },
                "31 Soft Drinks and Alcoholic Beverages": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / ml.' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 / ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / ml.' }
                },
                "32 Jam, Jelly and Marmalade, Fruit in Syrup": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                //without comma, comma is not displaying in dropdown
                "32 Jam  Jelly and Marmalade  Fruit in Syrup": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                "33 Starch – i.e. Corn Flour": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' }
                },
                //without '-', '-' is not displaying in dropdown
                "33 Starch   i.e. Corn Flour": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^3 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' }
                },
                "34 Vinegar": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '3 x 10 ml.' }
                },
                "35 Bread": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' }
                },
                "36 Bottled Water / Ice / Tap Water": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100ml.' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100ml' }
                },
                //without '/', '/' is not displaying in dropdown
                "36 Bottled Water   Ice   Tap Water": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100ml.' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100ml' }
                },
                "37 Bottled Water": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100ml' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100ml' },
                    3: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '1000 / 100 ml' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent / 100 ml' }
                },
                "38 Unsanitized Vegetables/Fruits/Salads": {
                    //1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25gm' },//Changing N.D. per 25gm to ND in 25gm as per the chnage request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    //3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25gm' }
                    3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25gm' }//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                },
                //without '/', '/' is not displaying in dropdown
                "38 Unsanitized Vegetables Fruits Salads": {
                    //1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25gm' },//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    //3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25gm' }
                    3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25gm' }
                },
                "39 Sanitized Vegetables": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    //2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25gm' },
                    //3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25gm' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' }
                },
                "40 Sanitized Fruit and Fruit Juices": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    //2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    //4: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25gm' }
                    4: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25gm' }
                },
                "41 Pasteurized Fruit Juices": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^3 / gm or ml' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm or ml' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm or ml' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / ml.' }
                },
                "42 Part Cooked Foods": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '3 x 10^4/ gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<20 / gm' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^3 / gm' }
                },
                "43 Mayonnaise, Mustard Sauces": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5x 10^3 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / ml' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / ml.' },
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                //without comma,comma is not displaying in dropdown
                "43 Mayonnaise  Mustard Sauces": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5x 10^3 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / ml' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / ml.' },
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "44 Cooked Sea Food": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10^3 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25 gm' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / gm' }
                },
                "45 Caviar": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10 / gm' },
                    3: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25 gm' }
                },
                "46 Cooked Poultry and Poultry Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5/ gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    5: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "47 Processed Foods :- (Ready to Eat)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5000 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                //(Ready to Eat)is not displaying in dropdown
                "47 Processed Foods": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^5 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5000 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                },
                "48 Desserts": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^4 / gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20 / gm' }
                },
                "49 Sauce (In House)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^3/ gm' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' },
                    4: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm' }
                },

                "50 Salad Dressings (In House)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10^3/ gm' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10^2 / gm ' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / gm' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '10^2 / ml' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 / ml' },
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm' }
                }
            }

            if (IsFirstTimeEdit != true) {
                ClearParameterTested();
            }

            RefreshParameterTested();

            return Band[FoodAnalysisType];
        }

        var BandDetailsForFoodProducts = function (FoodAnalysisType) {
            var Band = {
                "01 Poultry": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 100000', 'Unit': 'g' },//'MaxLimt': '5 x 10^5'
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '1000', 'Unit': 'g' },//'MaxLimt': '10^3'
                    //  4: { 'Name': 'YMC', 'Value': 131, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor },
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "02 Meat": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 100000 ', 'Unit': 'g' },//'MaxLimt': '5 x 10^5 '
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '1000 ', 'Unit': 'g' },//'MaxLimt': '10^3 '
                    //4: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'N.D / 25 gm' },
                    4: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    //  5: { 'Name': 'YMC', 'Value': 131, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor },
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "03 Fish and Shell Fish": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 100000', 'Unit': 'g' },//'MaxLimt': '5 x 10^5'
                    2: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW
                    6: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "04 Pasteurized Frozen Whole Egg and Egg Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10000', 'Unit': 'g' },//'MaxLimt': '10^4'
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    5: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    6: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    7: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //Changed
                "04 Pasteurized Frozen Whole Egg and  Egg Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10000', 'Unit': 'g' },//'MaxLimt': '10^4'
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    5: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    6: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    7: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "05 Dried Food to be cooked": {
                    1: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "06 U.H.T. Milk, Cream Dairy Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'ml.' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D ', 'Unit': 'ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'ml.' },
                    //OPTIONAL:NEW
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //changed
                "06 U.H.T. Milk  Cream Dairy Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'ml.' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D', 'Unit': 'ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'ml.' },
                    //OPTIONAL:NEW
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "07 Cream and Dairy Products": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    2: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'gm or ml.' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'gm or ml.' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'gm or ml.' },
                    5: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'gm or ml.' },//'MaxLimt': '10^2'
                    6: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    7: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "08 Pasteurized Milk and Cream. Other Pasteurized Milk Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10000', 'Unit': 'ml.' },//'MaxLimt': '2 x 10^4'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5', 'Unit': 'ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'ml.' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20 ', 'Unit': 'ml.' },
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //Changed
                "08 Pasteurized Milk and Cream. Other  Pasteurized Milk Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10000', 'Unit': 'ml.' },//'MaxLimt': '2 x 10^4'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5', 'Unit': 'ml.' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'ml.' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20', 'Unit': 'ml.' },
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "09 Cream with added flavours": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10000', 'Unit': 'g' },//'MaxLimt': '2 x 10^4'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "10 Whipped Cream": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10000', 'Unit': 'g' },//'MaxLimt': '2 x 10^4'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "11 Fermented Cream": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'ml.' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    3: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'g' },
                    4: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    6: { 'Name': 'TVB', 'Value': 122, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '2 x 10000', 'Unit': 'g' },//'MaxLimt': '2 x 10^4'
                    7: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "12 Ice Cream": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2.5 x 10000', 'Unit': 'g' },//'MaxLimt': '2.5 x 10^4'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'g' },
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //Changes from server
                "12 Ice   Cream": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2.5 x 10000', 'Unit': 'g' },//'MaxLimt': '2.5 x 10^4'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'g' },
                    5: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },

                },
                "13 Processed Cheese": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '1000', 'Unit': 'g' },//'MaxLimt': '10^3'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "14 Soft Cheese": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    3: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    4: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    5: { 'Name': 'TVB', 'Value': 122, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "15 Hard, Semi-Hard Cheese (Un-processed)": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    2: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100 ', 'Unit': 'g' },//'MaxLimt': '10^2 '
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND ', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    5: { 'Name': 'TVB', 'Value': 122, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //without comma,from server comma is not displaying in dropdown
                "15 Hard  Semi Hard Cheese  (Un processed)": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    2: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    5: { 'Name': 'TVB', 'Value': 122, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "16 Preserved Food (Heat Treated)": {
                    1: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'g' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    5: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    6: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW
                    7: { 'Name': 'TVB', 'Value': 122, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "17 Seafood Dried": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10000', 'Unit': 'g' },//'MaxLimt': '10^4'
                    2: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },
                    3: { 'Name': 'E.coll', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    //OPTIONAL:NEW                    
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },

                },
                "18 Canned, Pouched or Bottled Food": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10', 'Unit': 'g' },
                    2: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20', 'Unit': 'g' },
                    //OPTIONAL:NEW   
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //without comma,comma is not displaying in dropdown
                "18 Canned  Pouched or Bottled Food": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 10', 'Unit': 'g' },
                    2: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20', 'Unit': 'g' },
                    //OPTIONAL:NEW   
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "19 Dried Heat Processed Foods": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '1000', 'Unit': 'g' },//'MaxLimt': '10^3'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    4: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW                     
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "20 Dried Heat Processed Foods (Ready to Eat after Rehydration)": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    2: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'g' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    5: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    6: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW
                    7: { 'Name': 'TVB', 'Value': 122, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "21 Dried Raw Foods (Ready to Eat)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100000', 'Unit': 'g' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW                    
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "22 Non-Dairy Fats & Oils": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    //OPTIONAL:NEW     
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //without -, - is not displaying in dropdown
                "22 Non Dairy Fats & Oils": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    //OPTIONAL:NEW     
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "23 Different Types of Chocolates": {
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25 ', 'Unit': 'g' },
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    //OPTIONAL:NEW     
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //24. Honey :not added
                "24 Honey": {
                    1: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW  
                    2: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "25 Molasses, Hard Brown Sugar": {
                    1: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 100', 'Unit': 'g' },//'MaxLimt': '5 x 10^2'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW  
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //without comma, comma is not displaying in dropdown
                "25 Molasses  Hard Brown Sugar": {
                    1: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 100', 'Unit': 'g' },//'MaxLimt': '5 x 10^2'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW  
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "26 Dyes (Food Colours)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 1000', 'Unit': 'g' },//'MaxLimt': '5 x 10^3'
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW                     
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "27 Yeast": {
                    1: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    3: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW  
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "28 Gelatin": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5x 1000', 'Unit': 'g' },//'MaxLimt': '5x 10^3'
                    2: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'g' },
                    3: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW                      
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "29 Margarine": {
                    1: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5x 10', 'Unit': 'g' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW  
                    3: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    4: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "30 Tea & Coffee": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    2: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '0', 'Unit': 'g' },
                    //OPTIONAL:NEW 
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "31 Soft Drinks and Alcoholic Beverages": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '1000', 'Unit': 'ml' },//'MaxLimt': '10^3'
                    2: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'Absent', 'Unit': 'ml' },
                    3: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5', 'Unit': 'ml' },
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'ml' },
                    //OPTIONAL:NEW                     
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "32 Jam, Jelly and Marmalade, Fruit in Syrup": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    //OPTIONAL:NEW                     
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },

                },
                //without comma, comma is not displaying in dropdown
                "32 Jam  Jelly and Marmalade  Fruit in Syrup": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    //OPTIONAL:NEW                     
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "33 Starch – i.e. Corn Flour": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '1000', 'Unit': 'g' },//'MaxLimt': '10^3'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW 
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //without '-', '-' is not displaying in dropdown
                "33 Starch   i.e. Corn Flour": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '1000', 'Unit': 'g' },//'MaxLimt': '10^3'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW 
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "34 Vinegar": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '3 x 10', 'Unit': 'ml' },
                    //OPTIONAL:NEW                     
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "35 Bread": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW    
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "36 Bottled Water / Ice / Tap Water": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100', 'Unit': 'ml' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND / 100', 'Unit': 'ml' },
                    //OPTIONAL:NEW 
                    3: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //without '/', '/' is not displaying in dropdown
                "36 Bottled Water   Ice   Tap Water": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100', 'Unit': 'ml' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND / 100', 'Unit': 'ml' },
                    //OPTIONAL:NEW 
                    3: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "37 Bottled Water": {
                    1: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 100', 'Unit': 'ml' },
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND / 100', 'Unit': 'ml' },
                    3: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '1000 / 100', 'Unit': 'ml' },
                    4: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent / 100', 'Unit': 'ml' },
                    //OPTIONAL:NEW                     
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "38 Unsanitized Vegetables/Fruits/Salads": {
                    //1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25gm' },
                    3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    //OPTIONAL:NEW 
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //without '/', '/' is not displaying in dropdown
                "38 Unsanitized Vegetables Fruits Salads": {
                    //1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    1: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25gm' },
                    3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    //OPTIONAL:NEW 
                    4: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "39 Sanitized Vegetables": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100000', 'Unit': 'g' },//'MaxLimt': '10^5'
                    //2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    //3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    3: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    4: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    //OPTIONAL:NEW                     
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "40 Sanitized Fruit and Fruit Juices": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100000', 'Unit': 'g' },//'MaxLimt': '10^5'
                    //2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25 gm' },
                    2: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '1 x 10000', 'Unit': 'g' },//'MaxLimt': '1 x 10^4'
                    //5: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'N.D / 25gm' },
                    5: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },//Changing N.D. per 25gm to ND in 25gm as per the change request from client for Listera,salmonella,campylobacter,vibrion on 26/11/2015
                    //OPTIONAL:NEW 
                    6: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "41 Pasteurized Fruit Juices": {
                    //1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 10000', 'Unit': 'gm or ml' },//'MaxLimt': '2 x 10^3'
                    //1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 2000', 'Unit': 'gm or ml' },//'MaxLimt': '2 x 10^3'
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2000', 'Unit': 'gm or ml' },//'MaxLimt': '2 x 10^3'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'gm or ml' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'gm or ml' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20', 'Unit': 'ml' },
                    //5: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10000', 'Unit': 'gm or ml' },//'MaxLimt': '10^3'
                    5: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '1000', 'Unit': 'gm or ml' },//'MaxLimt': '10^3'                    
                    //OPTIONAL:NEW 
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "42 Part Cooked Foods": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '3 x 10000', 'Unit': 'g' },//'MaxLimt': '3 x 10^4'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '<20', 'Unit': 'g' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '1000', 'Unit': 'g' },//'MaxLimt': '10^3'
                    //OPTIONAL:NEW 
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "43 Mayonnaise, Mustard Sauces": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5x 1000', 'Unit': 'g' },//'MaxLimt': '5x 10^3'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'ml' },//'MaxLimt': '10^2'
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20', 'Unit': 'ml' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm', 'Unit': 'g' },
                    //OPTIONAL:NEW 
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //without comma,comma is not displaying in dropdown
                "43 Mayonnaise  Mustard Sauces": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5x 1000', 'Unit': 'g' },//'MaxLimt': '5x 10^3'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'ml' },//'MaxLimt': '10^2'
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20', 'Unit': 'ml' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm', 'Unit': 'g' },
                    //OPTIONAL:NEW 
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "44 Cooked Sea Food": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100000', 'Unit': 'g' },//'MaxLimt': '10^5'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '2 x 1000', 'Unit': 'g' },//'MaxLimt': '2 x 10^3'
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },
                    5: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW 
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "45 Caviar": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100000', 'Unit': 'g' },//'MaxLimt': '10^5'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10', 'Unit': 'g' },
                    3: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    4: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "46 Cooked Poultry and Poultry Products": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100000', 'Unit': 'g' },//'MaxLimt': '10^5'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    5: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    6: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "47 Processed Foods :- (Ready to Eat)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100000', 'Unit': 'g' },//'MaxLimt': '10^5'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5000', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "47 Processed Foods :  (Ready to Eat)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100000', 'Unit': 'g' },//'MaxLimt': '10^5'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5000', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                //(Ready to Eat)is not displaying in dropdown
                "47 Processed Foods": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100000', 'Unit': 'g' },//'MaxLimt': '10^5'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5000', 'Unit': 'g' },
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'//HMS issue  In criteria #47 Staph and Bacillus criteria appears by default as 1000/gm instead of 100/gm
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'//HMS issue  In criteria #47 Staph and Bacillus criteria appears by default as 1000/gm instead of 100/gm
                    6: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25', 'Unit': 'g' },
                    //OPTIONAL:NEW
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "48 Desserts": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '10000', 'Unit': 'g' },//'MaxLimt': '10^4'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'g' },
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '20', 'Unit': 'g' },
                    //OPTIONAL:NEW                     
               
                    6: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "49 Sauce (In House)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 1000', 'Unit': 'g' },//'MaxLimt': '5 x 10^3'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    4: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "49 Sauce - (In House)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 1000', 'Unit': 'g' },//'MaxLimt': '5 x 10^3'
                    2: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    3: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    4: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    //OPTIONAL:NEW
                    5: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    7: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    8: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'YMC', 'Value': 131, 'Sequence': 10, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },

                "50 Salad Dressings (In House)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 1000', 'Unit': 'g' },//'MaxLimt': '5 x 10^3'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 1000', 'Unit': 'g' },//'MaxLimt': '5 x 10^3'
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'ml' },//'MaxLimt': '10^2'
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20', 'Unit': 'ml' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm', 'Unit': 'g' },
                    //OPTIONAL:NEW                     
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                },
                "50 Salad Dressings   (In House)": {
                    1: { 'Name': 'TVB', 'Value': 122, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 1000', 'Unit': 'g' },//'MaxLimt': '5 x 10^3'
                    2: { 'Name': 'Coliforms', 'Value': 123, 'Sequence': 2, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '100', 'Unit': 'g' },//'MaxLimt': '10^2'
                    3: { 'Name': 'E.coli', 'Value': 124, 'Sequence': 3, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': 'ND', 'Unit': 'g' },
                    4: { 'Name': 'YMC', 'Value': 131, 'Sequence': 1, 'ColourIndex': 'green', 'DefaultBackgroundColour': MandatoryColor, 'MaxLimt': '5 x 1000', 'Unit': 'g' },//'MaxLimt': '5 x 10^3'
                    5: { 'Name': 'B.cereus', 'Value': 126, 'Sequence': 5, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '100', 'Unit': 'ml' },//'MaxLimt': '10^2'
                    6: { 'Name': 'C.P.staphylococci', 'Value': 125, 'Sequence': 4, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': '20', 'Unit': 'ml' },
                    7: { 'Name': 'Salmonella', 'Value': 128, 'Sequence': 7, 'ColourIndex': 'green', 'DefaultBackgroundColour': OptionalColor, 'MaxLimt': 'Absent in 25 gm', 'Unit': 'g' },
                    //OPTIONAL:NEW                     
                    8: { 'Name': 'V.parahaemolyticus', 'Value': 127, 'Sequence': 6, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    9: { 'Name': 'Listeria monocytogenes', 'Value': 129, 'Sequence': 8, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    10: { 'Name': 'Clostridium perfringens', 'Value': 130, 'Sequence': 9, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
                    11: { 'Name': 'Campylobacter', 'Value': 132, 'Sequence': 11, 'ColourIndex': 'green', 'DefaultBackgroundColour': NewOptionalColor, 'MaxLimt': '', 'Unit': '' },
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

                OneViewConsole.Debug("CreateDynamicElements Start", "oSamplingSheetAndFoodAnalysisController.CreateDynamicElements");

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

                OneViewConsole.Debug("CreateDynamicElements End", "oSamplingSheetAndFoodAnalysisController.CreateDynamicElements");
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
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "oSamplingSheetAndFoodAnalysisController.Temperature_NgKeyUp");

                if (IsNc == true) {
                    ShowNCStatus(AttributeId, ControlId);
                }

                var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var ShowNCStatusOLD = function (AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "oSamplingSheetAndFoodAnalysisController.ShowNCStatus");

                var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
                NormalizeNCEntityListData(DCNCMappingListData);

                OneViewConsole.Debug("ShowNCStatus End", "oSamplingSheetAndFoodAnalysisController.ShowNCStatus");
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
                OneViewConsole.Debug("ClearForm Start", "oSamplingSheetAndFoodAnalysisController.ClearForm");
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
                            SetSampleNumber();
                        }
                        scope.$apply();
                    }

                });


                OneViewConsole.Debug("ClearForm End", "oSamplingSheetAndFoodAnalysisController.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "oSamplingSheetAndFoodAnalysisController.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "oSamplingSheetAndFoodAnalysisController.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "oSamplingSheetAndFoodAnalysisController.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "oSamplingSheetAndFoodAnalysisController.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.PreControlEvents", xlatService);
            }
        }

        this.ngChange_setDateTime = function (ControlId) {
            try {
                _oDataCaptureBO.ngChange_setDateTime(ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.ngChange_setDateTime", xlatService);
            }
        }


        this.SaveSignature = function (ControlId, signaturePad) {
            try {
                OneViewConsole.Debug("SaveSignature Start", "CookingAndBlastChillingMonitoringFacade.SaveSignature");
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

                OneViewConsole.Debug("SaveSignature End", "CookingAndBlastChillingMonitoringFacade.SaveSignature");
            }
            catch (Excep) {
                //alert('SaveSignature :' + Excep + "," + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.SaveSignature", xlatService);
            }
            finally {
                oDateTime = null;
                CurrenntDateAndTime = null;
            }
        }

        this.ClearSignature = function (ControlId) {
            try {
                OneViewConsole.Debug("ClearSignature Start", "CookingAndBlastChillingMonitoringFacade.ClearSignature");

                $scope[ControlId + '_IsModified'] = false;
                $scope[ControlId + '_SignaturePad'] = '';
                $scope.lblSignature = "";

                OneViewConsole.Debug("ClearSignature End", "CookingAndBlastChillingMonitoringFacade.ClearSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ClearSignature", xlatService);
            }
        }

        this.Signature = function (SignatureNameControlId) {
            try {
                OneViewConsole.Debug("Signature Start", "CookingAndBlastChillingMonitoringFacade.Signature");

                //$scope.DivNGForm = true;
                //$scope.DivContent = false;
                //$scope.DivSignature = true;
                $scope[SignatureNameControlId + '_DivSignature'] = true;

                $timeout(function () {
                    SignatureContent(SignatureNameControlId);
                }, 100);


                OneViewConsole.Debug("Signature End", "CookingAndBlastChillingMonitoringFacade.Signature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.Signature", xlatService);
            }
        }

        var SignatureContent = function (SignatureNameControlId) {
            try {
                OneViewConsole.Debug("SignatureContent Start", "CookingAndBlastChillingMonitoringFacade.SignatureContent");

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
                        navigator.notification.alert("MN-RQ-NCF-001 :: Please provide signature first.", ['OK'], "");
                    } else {
                        MyInstance.SaveSignature(SignatureNameControlId, signaturePad);
                    }


                });

                OneViewConsole.Debug("SignatureContent End", "CookingAndBlastChillingMonitoringFacade.SignatureContent");
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
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.ProbeTesting", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.ClearComments", xlatService);
            }
        }

        this.Destroy = function () {
            try {
                _oDataCaptureBO.Destroy();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oSamplingSheetAndFoodAnalysisController.Destroy", xlatService);
            }
        }

        this.ShowFoodAnalysisForm = function () {
            try {
                
                if (ShowFoodAnalysisValidation()) {

                    $scope.FoodAnalysisShow = true;
                    $scope.SampleSheetHide = true;
                    $scope.SampleSheetHide = true;
                    $scope.DisableBack = true;                  

                    MyInstance.UpdateParameterTestedCompletedStatusForEdit();
               }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndFoodAnalysisController.ShowFoodAnalysisValidation", xlatService);
            }
        }

        var ShowFoodAnalysisValidation = function () {
            try {
                var IsSuccess = true;

               
                var CommonMessage = "MN-RQ-SPF-001 :: Please enter ";
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
                if (scope.NewDCModel.txtSamplingPlanRefControlId == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Sampling Plan Ref.";
                    IsSuccess = false;
                }
                if (scope.NewDCModel.txtSamplingDescriptionControlId == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Sample Description";
                    IsSuccess = false;
                }
                if (scope.NewDCModel.DTDateOfCollectionControlId == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Date & Time Of Collection";
                    IsSuccess = false;
                }
                //if (scope.NewDCModel.DTDateOfPreparationControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Date Of Preparation";
                //    IsSuccess = false;
                //}
                //if (scope.NewDCModel.txtSampleLocationControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Sample Location";
                //    IsSuccess = false;
                //}
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
                //if (scope.NewDCModel.ATSampleCollectionTempControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Sample Collection Temp";
                //    IsSuccess = false;
                //}
                //if (scope.NewDCModel.DTSampleCollectionTimeControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Sample Collection Time";
                //    IsSuccess = false;
                //}
                //if (document.getElementById("DTSampleCollectionTimeControlId").value == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Sample Collection Time";
                //    IsSuccess = false;
                //}
                if (scope.NewDCModel.ATAmbientTempControlId === "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Ambient Temp";
                    IsSuccess = false;
                }
                //if (scope.NewDCModel.DTAmbientTimeControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Ambient Time";
                //    IsSuccess = false;
                //}
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
                //if (scope.NewDCModel.DTLabChillerTimeControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Storage in Lab Chiller Time";
                //}
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
                if (scope.NewDCModel.txtCollectedByControlId == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Collected By";
                    IsSuccess = false;
                }

                if (scope["chkNAControlId"].GetSelectedText() == "" && scope["chkConditionOfSampleOnReceipt"].GetSelectedValue() == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Condition of sample";
                    IsSuccess = false;
                }
                else if (scope["chkNAControlId"].GetSelectedText() == "" && scope["chkConditionOfSampleOnReceipt"].GetSelectedValue() == 254 && scope.AddlSampleConditionUnsatisfactoryControlId.GetSelectedText() == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Sampling Condition";
                    IsSuccess = false;
                }
                if (scope["chkNAControlId"].GetSelectedText() == "" && scope.NewDCModel.txtVerifiedByControlId == "") {
                    if (ErrorMessage != "") {
                        ErrorMessage = ErrorMessage + ",";
                    }
                    ErrorMessage = ErrorMessage + "Verified By";
                    IsSuccess = false;
                }
                //if (scope.NewDCModel.txtUponReceiptRemarksControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Upon Receipt Remarks";
                //    IsSuccess = false;
                //}
                //if (scope["chkConditionOfSampleAnalysis"].GetSelectedValue() == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Condition of sample";
                //    IsSuccess = false;
                //}
                //else if (scope["chkConditionOfSampleAnalysis"].GetSelectedValue() == 254 && scope.AddlSampleAnalysisUnsatisfactoryControlId.GetSelectedText() == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Sampling Analysis";
                //    IsSuccess = false;
                //}
                //if (scope.NewDCModel.txtAnalysisVerifiedByControlId == "") {
                //    if (ErrorMessage != "") {
                //        ErrorMessage = ErrorMessage + ",";
                //    }
                //    ErrorMessage = ErrorMessage + "Verified By";
                //    IsSuccess = false;
                //}               
                //if (scope['chkFoodReceivedType'].GetSelectedValue() == 139 || scope['chkFoodReceivedType'].GetSelectedValue() == 141) {                   
                //    if (scope.NewDCModel.txtSampleLocationControlId == "") {
                //        if (ErrorMessage != "") {
                //            ErrorMessage = ErrorMessage + ",";
                //        }
                //        ErrorMessage = ErrorMessage + "Sampling Location";
                //        IsSuccess = false;
                //    }
                //}
                //else if (scope['chkFoodReceivedType'].GetSelectedValue() == 140) {                    
                //    if (scope.NewDCModel.txtCustomerNameControlId == "") {
                //        if (ErrorMessage != "") {
                //            ErrorMessage = ErrorMessage + ",";
                //        }
                //        ErrorMessage = ErrorMessage + "Customer Name";
                //        IsSuccess = false;
                //    }
                //}
                //

                if (IsSuccess == false) {
                    alert(CommonMessage+" "+ErrorMessage);
                }

                
                return IsSuccess;
                
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndFoodAnalysisController.ShowFoodAnalysisValidation", xlatService);
            }
        }

        var RefreshParameterTested = function () {
            try {

                //var _oOneViewSampleGenerator = new OneViewSampleGenerator();
                //var SampleNumber = _oOneViewSampleGenerator.GetNewSampleNumber("F");
                //scope.NewDCModel["txtSamplingNoControlId"] = SampleNumber;
                //SetSampleNumber();
                //TVB
                scope.NewDCModel["txtMediaUsed1ControlId"] = "PCA";
              //  scope.NewDCModel["txtVolumeofSamples1ControlId"] = "100 ml";
                scope.NewDCModel["txtIncubationTimeTemp1ControlId"] = "35C,48h";//"30&deg;C,75h";
                //scope.NewDCModel["txtEquipmentUsed1ControlId"] = "FS 1No5";
                //scope.NewDCModel["txtColonyCountDilutionFirst1ControlId"] = "10-2";
                //scope.NewDCModel["txtColonyCountDilutionSecond1ControlId"] = "17/15";
                //scope.NewDCModel["txtConfirmationTest1ControlId"] = "NA"; 
                //scope.NewDCModel["txtResult1ControlId"] = "1600";
               // scope.NewDCModel["txtEvaluation1ControlId"] = "F";
                //scope.NewDCModel["txtConductedBy1ControlId"] = "Haririram";
                //Total Coliforms
                scope.NewDCModel["txtMediaUsed2ControlId"] = "VRBA";              
                scope.NewDCModel["txtIncubationTimeTemp2ControlId"] = "37C,24+2h";                
                //scope.NewDCModel["txtConfirmationTest2ControlId"] = "BGB@37 C,24h+/-2h,BGB@30 C,24h+/-2h";
                
                //E.coli
                scope.NewDCModel["txtMediaUsed3ControlId"] = "Double strength MB";               
                scope.NewDCModel["txtIncubationTimeTemp3ControlId"] = "37C,24+2h";
                //scope.NewDCModel["txtConfirmationTest3ControlId"] = "BGB@37 C,24h+/-2h,BGB@30 C,24h+/-2h,EMB,Citarte,Indole,MRVP,API20E";
               
                //C.P.staphylococci
                scope.NewDCModel["txtMediaUsed4ControlId"] = "BPA";               
                scope.NewDCModel["txtIncubationTimeTemp4ControlId"] = "37+/-1C ,48+4h";
                //scope.NewDCModel["txtConfirmationTest4ControlId"] = "Coagulase test,API Staph";
              
                //B.cereus
                scope.NewDCModel["txtMediaUsed5ControlId"] = "BCA";                
                scope.NewDCModel["txtIncubationTimeTemp5ControlId"] = "37+/-0.5C ,24+2h";
                //scope.NewDCModel["txtConfirmationTest5ControlId"] = "Motility,Rhizoid growth,VP Test,API 50 CHB/E";
               
                //V. paraheamolyticus
                scope.NewDCModel["txtMediaUsed6ControlId"] = "Pre Enrichment in LEB Selective Enrichment in FB Selective media PALCAM";              
                scope.NewDCModel["txtIncubationTimeTemp6ControlId"] = "37+/-1C or 41.5C+/- 1C,for 18+/-3h. 37+/-1C or 41.5C+/- 1C for 18 to 24 h";
                //scope.NewDCModel["txtConfirmationTest6ControlId"] = "Gram staining,Oxidase,API 20E";

                //Salmonella
                scope.NewDCModel["txtMediaUsed7ControlId"] = "Pre Enrichment in BPW Selective Enrichment in RV TTB Selective media XLD,BGA";
                scope.NewDCModel["txtIncubationTimeTemp7ControlId"] = "37+/-0.5C ,16 to 20h,  42+/-0.5C for 24+/-2 h,37+/-0.5C,16 to 20 h ,37 +/-0.5C,5h ";
                //scope.NewDCModel["txtConfirmationTest7ControlId"] = "TSI/LIA/Urea,Citarte,Indole,MRVP,API 20E";

                //Listeria monocytoge nes
                scope.NewDCModel["txtMediaUsed8ControlId"] = "Pre Enrichment in LEB Selective Enrichment in FB Selective PALCAM";
                scope.NewDCModel["txtIncubationTimeTemp8ControlId"] = "30C ,24+/-2h, 30 C,26+/-2h,30C for 48+/-4h ";
                //scope.NewDCModel["txtConfirmationTest8ControlId"] = "Gram staining,Oxidase,Catalase,API listeria,PCR";

                //Colstridium perfringes
                scope.NewDCModel["txtMediaUsed9ControlId"] = "CPA";
                scope.NewDCModel["txtIncubationTimeTemp9ControlId"] = "37C for 18 to 24 h";
                //scope.NewDCModel["txtConfirmationTest9ControlId"] = "LGM,MNM,API 32A/20A";

                //YMC
                scope.NewDCModel["txtMediaUsed10ControlId"] = "RBA";
                scope.NewDCModel["txtIncubationTimeTemp10ControlId"] = "25 C for 5 days";
                //scope.NewDCModel["txtConfirmationTest10ControlId"] = "Microscopy";

                //Campylobacter
                scope.NewDCModel["txtMediaUsed11ControlId"] = "Pre Encrichment Bolton Broth,Selective media CCDA,PA";
                scope.NewDCModel["txtIncubationTimeTemp11ControlId"] = "41.5+/=0.5 for 44+/- 4h ,41.5+/-0.5 for 48+/-4h";
                //scope.NewDCModel["txtConfirmationTest11ControlId"] = "Gram staining,Oxidase,Catalase,Motility,Aerobic growth";
                

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndWaterAnalysisControllerFacade.RefreshParameterTested", xlatService);
            }
        }

        var ClearParameterTested = function () {

            try {
                OneViewConsole.Debug("ClearParameterTested Start", "SamplingSheetAndAirAnalysisControllerFacade.ClearParameterTested");

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

                OneViewConsole.Debug("ClearParameterTested End", "oSamplingSheetAndAirAnalysisControllerFacade.ClearParameterTested");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
            }
        }

        this.UpdateParameterTestedCompletedStatusForEdit = function () {

            try {
                OneViewConsole.Debug("UpdateParameterTestedCompletedStatusForEdit Start", "SamplingSheetAndAirAnalysisControllerFacade.UpdateParameterTestedCompletedStatusForEdit");

                var BanDetails = [122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132];

                for (var i = 0; i < BanDetails.length; i++) {
                    MyInstance.UpdateParameterTestedCompletedStatus(BanDetails[i]);
                }

                OneViewConsole.Debug("UpdateParameterTestedCompletedStatusForEdit End", "oSamplingSheetAndAirAnalysisControllerFacade.UpdateParameterTestedCompletedStatusForEdit");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndFoodAnalysisController.UpdateParameterTestedCompletedStatusForEdit", xlatService);
            }
            finally {
            }
        }
     
        this.UpdateParameterTestedCompletedStatus = function (BandDetailId) {

            try {
                OneViewConsole.Debug("UpdateParameterTestedCompletedStatus Start", "SamplingSheetAndAirAnalysisControllerFacade.UpdateParameterTestedCompletedStatus");
                if (BandDetailId != "" && BandDetailId != "" && BandDetailId !=null){
                var FoodAnalysisProducts = ["Tvb", "Coliforms", "Ecoll", "Saureus", "Bcereus", "Vparahaemolyticus", "Salmonella", "Listeria", "Clostridium", "Ymc", "Campylobacter"];
                var ControlInfo = _oDataCaptureBO.GetFoodAnalysisControlInfo(FoodAnalysisProducts[BandDetailId - 122]);

                _oDataCaptureBO.CheckCompletedStatusForParameterTested(ControlInfo, BandDetailId);
                }
              
                OneViewConsole.Debug("UpdateParameterTestedCompletedStatus End", "oSamplingSheetAndAirAnalysisControllerFacade.UpdateParameterTestedCompletedStatus");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndFoodAnalysisController.UpdateParameterTestedCompletedStatus", xlatService);
            }
            finally {
            }
        }

        this.CalculateResult = function (Volumeofinoculum, Dilution, Count1, Count2, Result, Paramtertestedvalue) {

            try {
                OneViewConsole.Debug("CalculateResult Start", "SamplingSheetAndAirAnalysisControllerFacade.CalculateResult");
                Volumeofinoculum = $scope.NewDCModel[Volumeofinoculum];
                Dilution = $scope.NewDCModel[Dilution];
                Count1 = $scope.NewDCModel[Count1];
                Count2 = $scope.NewDCModel[Count2];
                var TotalColonyCount = "";
                //alert("Volumeofinoculum : " + Volumeofinoculum + "Dilution : " + Dilution + "Count1 : " + Count1 + "Count2 : " + Count2);
                if ((Volumeofinoculum != undefined && Volumeofinoculum != '') && (Dilution != undefined && Dilution != '') ) {
                 
                    Volumeofinoculum = parseFloat(Volumeofinoculum);
                    Dilution = parseFloat(Dilution);
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

                    
                    //alert("Volumeofinoculum : " + Volumeofinoculum + "Dilution : " + Dilution + "Count1 : " + Count1 + "Count2 : " + Count2);
                    if (TotalColonyCount != "") {
                        TotalColonyCount = parseFloat(TotalColonyCount);
                        var ResultValue = ((Dilution) * (TotalColonyCount) * (1 / Volumeofinoculum));
                        //alert("Result : " + ResultValue);
                        if (!isNaN(ResultValue)) {
                           
                            if ((ResultValue < Dilution) && (Result == "txtResult1ControlId" || Result == "txtResult2ControlId")) {
                                $scope.NewDCModel[Result] = "<" + Dilution;
                            }
                            else{
                                $scope.NewDCModel[Result] = ResultValue.toFixed(0);
                            }
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

                OneViewConsole.Debug("CalculateResult End", "oSamplingSheetAndAirAnalysisControllerFacade.CalculateResult");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndFoodAnalysisController.CalculateResult", xlatService);
            }
            finally {
            }
        }

        var SetSampleNumber = function () {

            try {
                OneViewConsole.Debug("SetSampleNumber Start", "SamplingSheetAndFoodAnalysisController.SetSampleNumber");

                var MasterConfig = {
                    'Key': 'OneViewDCCriteriaNodeElementAdvance',
                    'CriteriaType': '',
                    'TemplateNodeId': 10423,
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
                    MessageKey: "FD_$vn$MasterColumn$vn$_$vn$Month$vn$_",
                    VariablesFinalJavaScriptEquation: {
                        "$vn$MasterColumn$vn$": "(GetRCOMasterAdv('" + JSON.stringify(MasterConfig) + "') != '' && GetRCOMasterAdv('" + JSON.stringify(MasterConfig) + "')) || 'XX'",
                        "$vn$Month$vn$": "GetDateTimeAdv('" + JSON.stringify(DateTimeConfig) + "')"
                    }
                }

                scope.NewDCModel["txtSamplingNoControlId"] = oOneViewDCMessageWithDCCriteriaVariableEvaluationComponent.Evaluvate(oOneViewDCMessageWithDCCriteriaVariable);

                OneViewConsole.Debug("SetSampleNumber End", "SamplingSheetAndFoodAnalysisController.SetSampleNumber");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "SamplingSheetAndFoodAnalysisController.SetSampleNumber", xlatService);
            }
            finally {
            }
        }
}


