
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
    
MyApp.controller('AirlineComplaintSampleController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
    //oSetDefaultSpinner.Start();
        //xlatService.setCurrentPage('AirlineComplaintSample');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);

        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
	scope = $scope;
	oSnapRemote = snapRemote;


	var oAirlineComplaintSampleFacade = new AirlineComplaintSampleFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    oAirlineComplaintSampleFacade.Init();
    oAirlineComplaintSampleFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
  
    $scope.ngChange_setIsManualFlag = function (ControlId) {
        oAirlineComplaintSampleFacade.ngChange_setIsManualFlag(ControlId);
    }

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oAirlineComplaintSampleFacade.Destroy();
        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oAirlineComplaintSampleFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oAirlineComplaintSampleFacade.SaveDCRecords();
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oAirlineComplaintSampleFacade.SetSelectedTextBoxColor(ControlId);
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
        oAirlineComplaintSampleFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
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
    ////    oAirlineComplaintSampleFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc);
        ////}

    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {

        $scope.DisableSave = true;
        $scope.DisableSaveSubmit = true;
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oAirlineComplaintSampleFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, Timeout);
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
        oAirlineComplaintSampleFacade.ClearForm();
    }
    $scope.$on('$destroy', function () {

        //oOneViewAppInfoPlugin.ClearCache();
        //$location.replace(); //clear last history route
        //$templateCache.removeAll();

        //  ClearGlobalVariable();
        oAirlineComplaintSampleFacade.Destroy();
        scope = null;
        ionicBackdrop = null;
        oAirlineComplaintSampleFacade = null;
        $scope = null;
       
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oAirlineComplaintSampleFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oAirlineComplaintSampleFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oAirlineComplaintSampleFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oAirlineComplaintSampleFacade.SaveDCRecords(true);
    }



    $scope.CustomNCClick = function () {
        oAirlineComplaintSampleFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oAirlineComplaintSampleFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oAirlineComplaintSampleFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oAirlineComplaintSampleFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oAirlineComplaintSampleFacade.CloseRightPanel();
    }

    $scope.ProbeTesting = function () {
        oAirlineComplaintSampleFacade.ProbeTesting();
    };
    $scope.ClearReasons = function () {
        oAirlineComplaintSampleFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oAirlineComplaintSampleFacade.ClearComments();
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

    $scope.Signature = function () {
        oAirlineComplaintSampleFacade.Signature("DCHandedOverSignature");
    }

    $scope.ReceivedbySignature = function () {
        oAirlineComplaintSampleFacade.Signature("DCReceivedbySignature");
    }

    $scope.AttachPicture = function () {
        var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
        _oOneViewCordovaCameraPlugin.CaptureImage(function (_ImageURL) {
            oAirlineComplaintSampleFacade.AttachPicture(_ImageURL);
        });
    }

});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function AirlineComplaintSampleFacade(parm) {

    try {
        OneViewConsole.Debug("oAirlineComplaintSampleFacade Start", "Facade.AirlineComplaintSampleFacade");

        var Microbiology_WaterLabelId = 11;
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
        var DataCaptureClientGuid = "";

        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
      
      //  var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("oAirlineComplaintSampleFacade End", "Facade.AirlineComplaintSampleFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.oAirlineComplaintSampleFacade", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "oAirlineComplaintSampleFacade.Init");

                    $scope.NewDCModel = {};
                    // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];
       
                    $scope.SourceofForeignObjects = [];
                    $scope.SampleSources = [];

                    $scope.ShiftOptions = [];

                    $scope.MultiMediaSubElements = [];

                    $scope.NCOptions = [];
                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                OneViewConsole.Debug("Init End", "oAirlineComplaintSampleFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.Init", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "oAirlineComplaintSampleFacade.PageLoad");

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

                  // SetSelectedTextBoxColor_Private('ATFoodTempControlId');

                   // _oNCComponent.BindNCSummaryHandler = BindNc;
                    _oDataCaptureBO.SetDefaultAutoTemperatureListener();
                
                    if (DcId != null) {
                        SetDataCaptureClientGuid();
                        IsFirstTimeEdit = true;
                        $scope.Add = 'Save';
                        _oDataCaptureBO.GetNCComments(DcId);
                        _oDataCaptureBO.LoadEditPage(DcId, $scope);
                        IsFirstTimeEdit = false;
                        LoadMultimediaSubElements();
                    }
                    else {
                        $scope.Add = 'Add';
                        _oDataCaptureBO.setDefaultValue();
                       
                    }

                    ///AuditSummary
                    _oDataCaptureBO.ShowDCSummary();
                    _oSettingsBO.ShowAutoManualStatus($scope);
               
                   

                 
            
           
                    new OnewViewEventListener().RegisterSelectedFieldEvent();

                OneViewConsole.Debug("PageLoad End", "oAirlineComplaintSampleFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.PageLoad", xlatService);
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "oAirlineComplaintSampleFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "oAirlineComplaintSampleFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "oAirlineComplaintSampleFacade.SetSelectedTextBoxColor_Private");

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

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "oAirlineComplaintSampleFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "oAirlineComplaintSampleFacade.BindNc");

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

                OneViewConsole.Debug("BindNc End", "oAirlineComplaintSampleFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "oAirlineComplaintSampleFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "oAirlineComplaintSampleFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "oAirlineComplaintSampleFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "oAirlineComplaintSampleFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "oAirlineComplaintSampleFacade.SaveDCRecords");
                var IsValidToSave = _oDataCaptureBO.ValidateDcByOccurence();
               IsValidToSave = true;

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
                    }

                    else {
                        _oDataCaptureBO.ClearControls(scope, TemplateNodes);
                        alert('IN-SU-SWA-001 ::  Data Capture Profiles are expired ');
                    }
                    $scope.MultiMediaSubElements = [];
                    _oDataCaptureBO.MultiMediaSubElementsList = [];
                }
                _oDataCaptureBO.ShowDCSummary();
                //SetSelectedTextBoxColor_Private('txtTempControlId');

                //_oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtTempControlId';
                //_oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeCheckedControlId';


                OneViewConsole.Debug("SaveDCRecords End", "oAirlineComplaintSampleFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.SaveDCRecords", xlatService);
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

        var ShowHideTextBox = function (AttributeNodeId, value, text) {
            try {
                //alert('AttributeNodeId : ' + AttributeNodeId + " ,value :" + value + " ,text :" + text);
                if (AttributeNodeId == 1550) {
                    //if (value == 65700) { //put others id
                    if (text == "Others") { //put others id
                        //show textbox
                        scope.OthersShow = true;
                    }
                    else {
                        //hide textbox
                        scope.OthersShow = false;
                        scope.NewDCModel.txtOthersControlId = "";
                    }
                }
                else if (AttributeNodeId == 1540) {
                    // if (value == 65701) { //put others id
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
                else if (AttributeNodeId == 1557) {
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
                else if (AttributeNodeId == 1560) {
                    //   if (value == 65702) { //put others id
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
                else if (AttributeNodeId == 1553) {
                    // if (value == 65701) { //put others id
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

                OneViewConsole.Debug("Loadddl Start", "oAirlineComplaintSampleFacade.Loadddl");
               

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;
              

                var oSectorddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectorControlId', 'DataSourceModelName': 'Sectors', 'DisplayElementModelName': 'NewDCModel.AddlSectorControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Sector, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 3117 });
                oSectorddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Sector, _TableNamesEnum.OrganizationAssetsNode);

                var oClassdl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlClassControlId', 'DataSourceModelName': 'Classes', 'DisplayElementModelName': 'NewDCModel.AddlClassControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Class, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 3118 });
                oClassdl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Class, _TableNamesEnum.OrganizationAssetsNode);

                var oAirlineddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Airline, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 3119, 'SelectedIndexChangedEventHandler': oAirlineSelectedIndexChanged });
                oAirlineddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Airline, _TableNamesEnum.OrganizationAssetsNode);

                var oFlightddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFlightControlId', 'DataSourceModelName': 'Flight', 'DisplayElementModelName': 'NewDCModel.AddlFlightControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 3120 });
                oFlightddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);

             
                OneViewConsole.Debug("Loadddl End", "oAirlineComplaintSampleFacade.Loadddl");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oProductddl = null;
            }
        }

        var oAirlineSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oAirlineSelectedIndexChanged Start", "CookingAndBlastChillingMonitoringFacade.oAirlineSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    var oFlightddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFlightControlId', 'DataSourceModelName': 'Flight', 'DisplayElementModelName': 'NewDCModel.AddlFlightControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 3120 });
                    oFlightddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
                
                    if (DcId == null || IsFirstTimeEdit == false) {
                        oFlightddl.Clear();
                    }
                }
                else {
                    var oFlightddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFlightControlId', 'DataSourceModelName': 'Flight', 'DisplayElementModelName': 'NewDCModel.AddlFlightControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'IsDynamicElementCreationEnabled': false, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 3120 });
                }

                OneViewConsole.Debug("oAirlineSelectedIndexChanged End", "CookingAndBlastChillingMonitoringFacade.oAirlineSelectedIndexChanged");
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

                OneViewConsole.Debug("Temperature_NgKeyUp Start", "oAirlineComplaintSampleFacade.Temperature_NgKeyUp");
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
                OneViewConsole.Debug("Temperature_NgKeyUp End", "oAirlineComplaintSampleFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.Temperature_NgKeyUp", xlatService);
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
            
                OneViewConsole.Debug("ValidateActionNC Start", "oAirlineComplaintSampleFacade.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "oAirlineComplaintSampleFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "oAirlineComplaintSampleFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "oAirlineComplaintSampleFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "oAirlineComplaintSampleFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "oAirlineComplaintSampleFacade.EvaluateActionNCStatus");
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
                OneViewConsole.Debug("ShowNCFormAction Start", "oAirlineComplaintSampleFacade.ShowNCFormAction");

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



                OneViewConsole.Debug("ShowNCFormAction End", "oAirlineComplaintSampleFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.ShowNCFormAction", xlatService);
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
                OneViewConsole.Debug("LoadAnswerModes Start", "oAirlineComplaintSampleFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;
            

                var oSourceofForeignObject = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSourceofForeignObjectControlId', 'DataSourceModelName': 'SourceofForeignObjects', 'DisplayElementModelName': 'NewDCModel.chkSourceofForeignObjectControlId' });
                oSourceofForeignObject.AnswerModes(TemplateNodes, 3123);

                var oSampleSource = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSampleSourceControlId', 'DataSourceModelName': 'SampleSources', 'DisplayElementModelName': 'NewDCModel.chkSampleSourceControlId' });
                oSampleSource.AnswerModes(TemplateNodes, 3136);

                var oNCOptions = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oNCOptions.LoadNCOptions();

                OneViewConsole.Debug("LoadAnswerModes End", "oAirlineComplaintSampleFacade.LoadAnswerModes");
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

                OneViewConsole.Debug("CreateDynamicElements Start", "oAirlineComplaintSampleFacade.CreateDynamicElements");

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

                OneViewConsole.Debug("CreateDynamicElements End", "oAirlineComplaintSampleFacade.CreateDynamicElements");
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
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "oAirlineComplaintSampleFacade.Temperature_NgKeyUp");

                if (IsNc == true) {
                    ShowNCStatus(AttributeId, ControlId);
                }

                var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var ShowNCStatusOLD = function (AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "oAirlineComplaintSampleFacade.ShowNCStatus");

                var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
                NormalizeNCEntityListData(DCNCMappingListData);

                OneViewConsole.Debug("ShowNCStatus End", "oAirlineComplaintSampleFacade.ShowNCStatus");
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
                OneViewConsole.Debug("ClearForm Start", "oAirlineComplaintSampleFacade.ClearForm");
                $scope.MultiMediaSubElements = [];
                _oDataCaptureBO.MultiMediaSubElementsList = [];

                _oDataCaptureBO.ClearControls();
                if (DcId != null) {
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                    LoadMultimediaSubElements();
                }
                else {
                    _oDataCaptureBO.setDefaultValue();

                  
                }
             
                OneViewConsole.Debug("ClearForm End", "oAirlineComplaintSampleFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "oAirlineComplaintSampleFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "oAirlineComplaintSampleFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "oAirlineComplaintSampleFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "oAirlineComplaintSampleFacade.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.PreControlEvents", xlatService);
            }
        }

        this.ngChange_setDateTime = function (ControlId) {
            try {
                _oDataCaptureBO.ngChange_setDateTime(ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.ngChange_setDateTime", xlatService);
            }
        }


        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.ProbeTesting", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.ClearComments", xlatService);
            }
        }

        this.Destroy = function () {
            try {
                _oDataCaptureBO.Destroy();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "oAirlineComplaintSampleFacade.Destroy", xlatService);
            }
        } 

        this.SaveSignature = function (ControlId, signaturePad) {
            try {
                OneViewConsole.Debug("SaveSignature Start", "AirlineComplaintSampleFacade.SaveSignature");
                
                $scope[ControlId + '_IsModified'] = true;

                $scope[ControlId + '_SignaturePad'] = signaturePad.toDataURL();//signaturePad
                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();
               // $scope.lblSignature = "Signed " + CurrenntDateAndTime;
                $scope[ControlId + '_lblSignature'] = "Signed " + CurrenntDateAndTime;
               // $scope.DivNGForm = true;
                //$scope.DivContent = false;
                // $scope.DivSignature = false;
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

                OneViewConsole.Debug("SaveSignature End", "AirlineComplaintSampleFacade.SaveSignature");
            }
            catch (Excep) {
                //alert('SaveSignature :' + Excep + "," + JSON.stringify(Excep));
                oOneViewExceptionHandler.Catch(Excep, "AirlineComplaintSampleFacade.SaveSignature", xlatService);
            }
            finally {
                oDateTime = null;
                CurrenntDateAndTime = null;
            }
        }

        this.ClearSignature = function (ControlId) {
            try {
                OneViewConsole.Debug("ClearSignature Start", "AirlineComplaintSampleFacade.ClearSignature");

                $scope[ControlId + '_IsModified'] = false;
                $scope[ControlId + '_SignaturePad'] = '';
                $scope.lblSignature = "";

                OneViewConsole.Debug("ClearSignature End", "AirlineComplaintSampleFacade.ClearSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "AirlineComplaintSampleFacade.ClearSignature", xlatService);
            }
        }

        this.Signature = function (SignatureNameControlId) {
            try {
                OneViewConsole.Debug("Signature Start", "AirlineComplaintSampleFacade.Signature");

               // $scope.DivNGForm = true;
               // $scope.DivContent = false;
             //   $scope.DivSignature = true;
                $scope[SignatureNameControlId + '_DivSignature'] = true;

                $timeout(function () {
                    SignatureContent(SignatureNameControlId);
                }, 100);


                OneViewConsole.Debug("Signature End", "AirlineComplaintSampleFacade.Signature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "AirlineComplaintSampleFacade.Signature", xlatService);
            }
        }

        var SignatureContent = function (SignatureNameControlId) {
            try {
                OneViewConsole.Debug("SignatureContent Start", "AirlineComplaintSampleFacade.SignatureContent");

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
                   // alert(signaturePad.toDataURL().length);
                    if (signaturePad.isEmpty()) {
                        alert("MN-RQ-NCF-001 :: Please provide signature first.");
                    } else {
                        MyInstance.SaveSignature(SignatureNameControlId, signaturePad);
                    }


                });

                OneViewConsole.Debug("SignatureContent End", "AirlineComplaintSampleFacade.SignatureContent");
            }
            catch (Excep) {
                // alert('SignatureContent :' + Excep + "," + JSON.stringify(Excep));
                throw Excep;
            }
            finally {
                wrapper = null;
            }
        }

        this.AttachPicture = function (LocalURL) {
            try {
                OneViewConsole.Debug("AttachPicture Start", "AirlineComplaintSampleFacade.AttachPicture");
               // alert("AttachPicture:LocalURL =>" + LocalURL);
                var MultiMediaElement = {
                    "Id": 0,
                    "MappedEntityClientGuid": DataCaptureClientGuid,
                    "Dimension": DATEntityType.DataCapture,
                    "MultiMediaType": "image/jpg",
                    "LocalURL": LocalURL,
                    "AlternateName": "No Image",
                    "Comments": "",
                    "IsDisabled": false,
                };
                scope.MultiMediaSubElements.push(MultiMediaElement);
                _oDataCaptureBO.MultiMediaSubElementsList.push(MultiMediaElement);

                scope.$apply();

                OneViewConsole.Debug("AttachPicture End", "AirlineComplaintSampleFacade.AttachPicture");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "AirlineComplaintSampleFacade.AttachPicture", xlatService);
            }
        }

        var SetDataCaptureClientGuid = function () {

            try {
                var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
                var DataCaptureQuery = "SELECT * FROM DataCaptureEntity WHERE Id = " + DcId;
                var DataCaptureResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DataCaptureQuery);

                if (DataCaptureResult.length > 0) {
                    DataCaptureClientGuid = DataCaptureResult[0].ClientGuid;
                }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "AirlineComplaintSampleFacade.SetDataCaptureClientGuid", xlatService);
            }
        }

        var LoadMultimediaSubElements = function () {
            try {
                var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

                var MultiMediaSubElementsQuery = "SELECT * FROM MultiMediaSubElements WHERE IsDisabled = 'false' AND MappedEntityClientGuid = '" + DataCaptureClientGuid + "'";
                var MultiMediaSubElementsResult = _OneViewSqlitePlugin.ExcecuteSqlReader(MultiMediaSubElementsQuery);

                $scope.MultiMediaSubElements = [];

                for (var i = 0; i < MultiMediaSubElementsResult.length; i++) {

                    $scope.MultiMediaSubElements.push({
                        "Id": MultiMediaSubElementsResult[i].Id,
                        "MappedEntityClientGuid": MultiMediaSubElementsResult[i].MappedEntityClientGuid,
                        "Dimension": MultiMediaSubElementsResult[i].Dimension,
                        "MultiMediaType": "image/jpg",
                        "LocalURL": MultiMediaSubElementsResult[i].LocalURL,
                        "AlternateName": "No Image",
                        "Comments": MultiMediaSubElementsResult[i].Comments,
                        "IsDisabled": false,
                    });
                }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "AirlineComplaintSampleFacade.LoadMultimediaSubElements", xlatService);
            }
        }
}


