
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
  

MyApp.controller('CustomerComplaintMonitoringController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
       

        var IsNavigate = false;
        var Url;

        ////////////////*********************** Validation for going in Shift Report page when any profile are there only************************ START///////////////////////////
        var UserId = OneViewSessionStorage.Get("LoginUserId");
        var query = "SELECT * FROM DcProfileEntity WHERE DcUserId= " + UserId + " AND TemplateNodeId = 12606";
        
        var result = window.OneViewSqlite.excecuteSqlReader(query);
        var queryresult = JSON.parse(result);
        if (queryresult.length > 0) {
            var IsFromMenu = $location.search().IsFromMenu;
            //alert('IsFromMenu : ' + IsFromMenu);
            if (IsFromMenu != undefined) {
                OneViewSessionStorage.Remove("DcId");
            }
            // $location.url('/12606');
            IsNavigate = true;
        }
        else {
            //  toaster.pop('warning', xlatService.xlat('Title_Notification'), "No profiles are available to conduct data capture");
            //alert("IN-NF-MAU-003 :: No profiles are available to conduct data capture");
            var MessageKey = "IN-NF-MAU-003 :: No profiles are available to conduct data capture";
            Url = '/notifycall?MessageKey=' + MessageKey + '';
        }

        ////////////////*********************** Validation for going in Shift Report page when any profile are there only************************ END///////////////////////////
       
        if (IsNavigate == true) {

            //oSetDefaultSpinner.Start();
            // xlatService.setCurrentPage('IncidentReport');
            var currentPage = 'T12606';
            xlatService.setCurrentPage(currentPage, true);
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
            scope = $scope;
            oSnapRemote = snapRemote;

            //$scope.ForeignObjectIncident = true;
            //$scope.PersonalHygineAndBehaviour = true;
            //$scope.InHouse = true;
            //$scope.Supplier = true;

            var oCustomerComplaintMonitoringFacade = new CustomerComplaintMonitoringFacade({ 'scope': $scope, 'document': $document, 'location': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', '$timeout': $timeout, 'compile': $compile });

            oCustomerComplaintMonitoringFacade.Init();
            oCustomerComplaintMonitoringFacade.PageLoad();
            //oSetDefaultSpinner.Stop();
        }

        else {           
            $location.url(Url);
        }


    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = null;

        if (IsNavigate == true) {
            oCustomerComplaintMonitoringFacade.Destroy();
        }

        NCActionProfileMetaData = undefined;
        CommentsResult = {};
        ObservationResult = {};
        NCSelectedAttributeId = 0;

        LVMultiMediaDeleteEventHandler = null;
        IsNewDcPageDcStartDateSelectionEnabled = false;

        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oCustomerComplaintMonitoringFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oCustomerComplaintMonitoringFacade.SaveDCRecords(false);
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oCustomerComplaintMonitoringFacade.SetSelectedTextBoxColor(ControlId);
    };

    $scope.ViewRecords = function () {
        var _oDcDAO = new DcDAO();
        var TotalDcCount = _oDcDAO.GetTotalAuditCountForIncidentReport(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("TemplateId"), OneViewSessionStorage.Get("DcPlaceId"), OneViewSessionStorage.Get("DcPlaceName"));

        if (TotalDcCount > 0) {
            scope = null;
            //ionicBackdrop = null;
            OneViewSessionStorage.Remove("NCInlineEdit");
            OneViewSessionStorage.Remove("MyAuditEditForm");
            $location.url('/ViewRecords');
        }
        else {
            navigator.notification.alert(xlatService.xlat('No_Records_Available'), ['OK'], "");
            //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('No_Records_Available'));
        }
    };


    $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
        oCustomerComplaintMonitoringFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
    };


    $scope.ShowNCStatus = function (AttributeId, ControlId) {
        $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
    }
 
    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oCustomerComplaintMonitoringFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, Timeout);
    }

    $scope.Back = function () {
            scope = null;
            //ionicBackdrop = null;
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
        oCustomerComplaintMonitoringFacade.ClearForm();
    }

    $scope.$on('$destroy', function () {
        scope = null;
       // ionicBackdrop = null;
        oCustomerComplaintMonitoringFacade = null;
        $scope = null;
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oCustomerComplaintMonitoringFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oCustomerComplaintMonitoringFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oCustomerComplaintMonitoringFacade.ngChange_setDateTime(ControlId);
    }

    $scope.CustomNCClick = function () {
        oCustomerComplaintMonitoringFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oCustomerComplaintMonitoringFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oCustomerComplaintMonitoringFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oCustomerComplaintMonitoringFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oCustomerComplaintMonitoringFacade.CloseRightPanel();
    }

    $scope.SubmitRecords = function () {
        oCustomerComplaintMonitoringFacade.SaveDCRecords(true);
    }

    $scope.ClearReasons = function () {
        oCustomerComplaintMonitoringFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oCustomerComplaintMonitoringFacade.ClearComments();
    }

    $scope.ProbeTesting = function () {
        oCustomerComplaintMonitoringFacade.ProbeTesting();
    };

    $scope.AddCustomObservation = function () {      
        if ($scope.NewDCModel.txtCustomObservation != undefined && $scope.NewDCModel.txtCustomObservation != "") {
            $scope.CustomObservationList.push({ label: $scope.NewDCModel.txtCustomObservation, id: 0 , IndexId: 0});
            $scope.NewDCModel.txtCustomObservation = "";
        }
        else {
            navigator.notification.alert(xlatService.xlat('ValidObservation'), ['OK'], "");
        }
    }

    $scope.DeleteCustomObservation = function (CustomObservation) {     
        for (var i = 0; i < $scope.CustomObservationList.length; i++) {       
            if ($scope.CustomObservationList[i].label == CustomObservation.label) {
                $scope.CustomObservationList.splice(i, 1);
            }
        }
    }

    $scope.AddCustomCorrectiveAction = function () {
        if ($scope.NewDCModel.txtCustomCorrectiveAction != undefined && $scope.NewDCModel.txtCustomCorrectiveAction != "") {
            $scope.CustomCorrectiveActionList.push({ label: $scope.NewDCModel.txtCustomCorrectiveAction, id: 0 });
            $scope.NewDCModel.txtCustomCorrectiveAction = "";
        }
        else {
            navigator.notification.alert(xlatService.xlat('ValidAction'), ['OK'], "");
        }
    }

    $scope.DeleteCustomCorrectiveAction = function (CustomCorrectiveAction) {
        for (var i = 0; i < $scope.CustomCorrectiveActionList.length; i++) {        
            if ($scope.CustomCorrectiveActionList[i].label == CustomCorrectiveAction.label) {
                $scope.CustomCorrectiveActionList.splice(i, 1);
            }
        }
    }
    
    $scope.AttachPicture = function () {
        var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
        _oOneViewCordovaCameraPlugin.CaptureImage(function (_ImageURL) {
            oCustomerComplaintMonitoringFacade.AttachPicture(_ImageURL);
        });
    }

    $scope.BrowsePicture = function () {
        var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
        _oOneViewCordovaCameraPlugin.BrowsePicture(function (_ImageURL) {            
            var NewPath = window.OneViewSqlite.RenameImage(_ImageURL);
            oCustomerComplaintMonitoringFacade.AttachPicture(NewPath);
        });
    }

    $scope.DCImageCaptureAnswerModeSaveEventHandler = function (AttributeNodeId, ControlId, SelectionType) {
        oCustomerComplaintMonitoringFacade.DCImageCaptureAnswerModeSaveEventHandler(AttributeNodeId, ControlId, SelectionType);
    };

    $scope.DCImageCaptureAnswerModeDeleteEventHandler = function (AttributeNodeId, ControlId, SelectionType) {
        oCustomerComplaintMonitoringFacade.DCImageCaptureAnswerModeDeleteEventHandler(AttributeNodeId, ControlId, SelectionType);
    };

    $scope.SaveSignature = function (ControlId, signaturePad) {
        oCustomerComplaintMonitoringFacade.SaveSignature(ControlId, signaturePad);
    };

    $scope.ClearSignature = function (ControlId) {
        oCustomerComplaintMonitoringFacade.ClearSignature(ControlId);
    };

    $scope.Signature = function (SignatureNameControlId) {
        oCustomerComplaintMonitoringFacade.Signature(SignatureNameControlId);
    };

    $scope.SignatureContent = function (SignatureNameControlId) {
        oCustomerComplaintMonitoringFacade.SignatureContent(SignatureNameControlId);
    };

    $scope.TabClickEvent = function (TabId) {
        oCustomerComplaintMonitoringFacade.TabClickEvent(TabId);
    };
});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function CustomerComplaintMonitoringFacade(parm) {

    try {
        OneViewConsole.Debug("CustomerComplaintMonitoringFacade Start", "Facade.CustomerComplaintMonitoringFacade");

        var MyInstance = this;
        //$scope, $document, $state, xlatService, toaster, SpinService
        var $scope = parm.scope;
        var $document = parm.document;
        var $location = parm.location;
        var xlatService = parm.xlatService;
        var $timeout = parm.$timeout;
        var $compile = parm.compile;
        //var toaster = parm.toaster;
        //var SpinService = parm.SpinService;
        var TemplateId = "12606";
        var TemplateName = "CUSTOMER COMPLAINT MONITORING FORM";
        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        var ServiceName = OneViewSessionStorage.Get("ServiceName");
        var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];

        //*********** basic meta datas for Cooking and blast chilling varifications

        OneViewSessionStorage.Save("TemplateId", "12606");
        OneViewSessionStorage.Save("TemplateName", "CUSTOMER COMPLAINT MONITORING FORM");

        var DcProfileId = 1;
        var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
        var DcPlaceName = OneViewSessionStorage.Get("DcPlaceName");
        var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
        var LoginUserName = OneViewSessionStorage.Get("LoginUserName");
        var DcId = OneViewSessionStorage.Get("DcId");
        var DeviceId = OneViewLocalStorage.Get("DeviceId");
        var DataCaptureClientGuid = "";

        var IsFirstTimeEdit = true;
        var IsFirstTimeEditForAirLine = false;

        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile });
       // var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("CustomerComplaintMonitoringFacade End", "Facade.CustomerComplaintMonitoringFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.CustomerComplaintMonitoringFacade", xlatService);
    }

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "CustomerComplaintMonitoringFacade.Init");

            $scope.NewDCModel = {};
            $scope.ShiftOptions = [];

            $scope.RiskType = [];
            $scope.Source = [];
            $scope.IsBulkDishing = [];
            $scope.IsSampleNumber = [];

            $scope.ObservationList = [];
            $scope.CustomObservationList = [];
            $scope.CustomCorrectiveActionList = [];
            $scope.AssignedToList = [];

            $scope.PreObservationList = [];
            $scope.PreCustomObservationList = [];
            $scope.PreCustomCorrectiveActionList = [];
            $scope.PreAssignedToList = [];

            $scope.MultiMediaSubElements = [];

            $scope.ActualForeignObject = [];
            $scope.ClassOfForeignObject = [];
            $scope.SeverityOfForeignObject = [];
            $scope.Conclusion = [];

            SetRcoDataSourceForBand();
           
            _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
            //_oDataCaptureBO.CorrectiveActionEventHandler = CorrectiveActionEventHandler;

            LVMultiMediaDeleteEventHandler = MultiMediaDeleteEventHandler;

            OneViewConsole.Debug("Init End", "CustomerComplaintMonitoringFacade.Init");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.Init", xlatService);
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
            OneViewConsole.Debug("PageLoad Start", "CustomerComplaintMonitoringFacade.PageLoad");

            var ModelIdForAutoTemperatureUpdation;
           // var ModelIdForAutoTimeUpdation;
            LoadDefaultValueMetaData();
            AutoCompleteGenerateHTML();
            Loadddl();
            _oDataCaptureBO.LoadShift();
            LoadAnswerModes();    
            LoadAssignedToList();
            MyInstance.TabClickEvent(1);
            _oDataCaptureBO.ClearControls();
            _oDataCaptureBO.SetMandatoryMetaData();
             //// _oNCComponent.Init();
            _oCPActionNCComponent.Init();

            //// todo : check with pallav and solve document,getelementbyid page load issue
            _oDataCaptureBO.SetControlEnableStatus();

            //// _oNCComponent.BindNCSummaryHandler = BindNc;

            if (DcId != null) {
                SetDataCaptureClientGuid();
                $scope.Add = 'Save';
                _oDataCaptureBO.GetNCComments(DcId);
                _oDataCaptureBO.LoadEditPage(DcId, $scope);
                //LoadCorrectiveActions();
                //LoadMultimediaSubElements();
                //LoadSource();
                IsFirstTimeEdit = false;

                //SetSelectedTextBoxColor_Private('AmbientTempControlId');
                //ModelIdForAutoTemperatureUpdation = 'NewDCModel.AmbientTempControlId';
            }
            else {               
                $scope.Add = 'Add';
                _oDataCaptureBO.setDefaultValue();
                //SetSelectedTextBoxColor_Private('AmbientTempControlId');
                //ModelIdForAutoTemperatureUpdation = 'NewDCModel.AmbientTempControlId';
            }
            //_oDataCaptureBO.ModelIdForAutoTemperatureUpdation = ModelIdForAutoTemperatureUpdation;
            //_oDataCaptureBO.ModelIdForAutoTimeUpdation = '';
            //_oDataCaptureBO.SetDefaultAutoTemperatureListener();

            ///AuditSummary
            //_oDataCaptureBO.ShowDCSummary();
            ShowDCSummary();
            _oSettingsBO.ShowAutoManualStatus($scope);

            new OnewViewEventListener().RegisterSelectedFieldEvent();

            OneViewConsole.Debug("PageLoad End", "CustomerComplaintMonitoringFacade.PageLoad");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.PageLoad", xlatService);
        }
    }

    var SetDataCaptureClientGuid = function () {

        try{
            var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
            var DataCaptureQuery = "SELECT * FROM DataCaptureEntity WHERE Id = " + DcId;
            var DataCaptureResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DataCaptureQuery);

            if (DataCaptureResult.length > 0) {
                DataCaptureClientGuid = DataCaptureResult[0].ClientGuid;
            }
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.SetDataCaptureClientGuid", xlatService);
        }
    }

    var SetSampleNumber = function () {

        try {
            var m_names = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
            var _oDateTime = new DateTime();
            var DayCode = "" + _oDateTime.GetYear() + m_names[_oDateTime.GetMonth()] + _oDateTime.GetDay() + _oDateTime.GetHours() + _oDateTime.GetMinutes() + _oDateTime.GetSeconds();
            $scope.NewDCModel.txtSampleNumberControlId = DeviceId + "_" + LoginUserId + "_" + DayCode;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.SetSampleNumber", xlatService);
        }
    }

    this.AttachPicture = function (LocalURL) {
        try {
            OneViewConsole.Debug("AttachPicture Start", "CustomerComplaintMonitoringFacade.AttachPicture");

            var MultiMediaElement = {
                "Id": 0,
                "ServerId": 0,
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

            OneViewConsole.Debug("AttachPicture End", "CustomerComplaintMonitoringFacade.AttachPicture");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.SetSelectedTextBoxColor", xlatService);
        }
    }

    this.SetSelectedTextBoxColor = function (ControlId) {
        try {
            OneViewConsole.Debug("SetSelectedTextBoxColor Start", "CustomerComplaintMonitoringFacade.SetSelectedTextBoxColor");

            SetSelectedTextBoxColor_Private(ControlId);

            OneViewConsole.Debug("SetSelectedTextBoxColor End", "CustomerComplaintMonitoringFacade.SetSelectedTextBoxColor");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.SetSelectedTextBoxColor", xlatService);
        }
    }

    var SetSelectedTextBoxColor_Private = function (ControlId) {
        try {
            OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "CustomerComplaintMonitoringFacade.SetSelectedTextBoxColor_Private");

            if (ControlId == 'AmbientTempControlId') {
                $scope.AmbientTempControlId = 'highlight';
                $scope.AircraftLoadingTempControlId = '';
                $scope.TempControlId = '';
            }

            else if (ControlId == 'AircraftLoadingTempControlId') {
                $scope.AmbientTempControlId = '';
                $scope.AircraftLoadingTempControlId = 'highlight';
                $scope.TempControlId = '';
            }

            else if (ControlId == 'TempControlId') {
                $scope.AmbientTempControlId = '';
                $scope.AircraftLoadingTempControlId = '';
                $scope.TempControlId = 'highlight';
            }
            OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "CustomerComplaintMonitoringFacade.SetSelectedTextBoxColor_Private");
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("BindNc Start", "CustomerComplaintMonitoringFacade.BindNc");

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

            OneViewConsole.Debug("BindNc End", "CustomerComplaintMonitoringFacade.BindNc");
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
            OneViewConsole.Debug("GetProbeStatus Start", "CustomerComplaintMonitoringFacade.GetProbeStatus");

            _oSettingsBO.ProbeStatus('', xlatService);

            OneViewConsole.Debug("GetProbeStatus End", "CustomerComplaintMonitoringFacade.GetProbeStatus");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.GetProbeStatus", xlatService);
        }
    }

    this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
        try {
            OneViewConsole.Debug("SetAutoTemperatureListener Start", "CustomerComplaintMonitoringFacade.SetAutoTemperatureListener");
            var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
            _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
            _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

            OneViewConsole.Debug("SetAutoTemperatureListener End", "CustomerComplaintMonitoringFacade.SetAutoTemperatureListener");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.SetAutoTemperatureListener", xlatService);
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
        
        try {
            OneViewConsole.Debug("SaveDCRecords Start", "CustomerComplaintMonitoringFacade.SaveDCRecords");
           
            //var ObservationList = [];
            //for (var i = 0; i < $scope.ObservationList.length; i++) {
            //    if ($scope.ObservationList[i].selected == "selected") {
            //        ObservationList.push($scope.ObservationList[i]);
            //    }
            //}

            $scope.NewDCModel.txtIsApprovedControlId = 0;
            UpdateAssignedToValues(); 
            UpdateDcStartDate();

            //if (ObservationList.length > 0 || $scope.CustomObservationList.length > 0) {

                oSetDefaultSpinner.Start();

                _oDataCaptureBO.CreateDynamicElementHandler = CreateDynamicElements;
                if (DcId != null) {
                    var Status = _oDataCaptureBO.UpdateDC(DcId, undefined, _oDataCaptureBO.PreEditValues, IsSubmit);
                    if (Status != false) {
                        OneViewSessionStorage.Remove("DcId");
                        $location.url('/ViewRecords');
                    }
                }
                else {
                    //if ($scope.NewDCModel.txtSampleNumberControlId == "") {
                    //    SetSampleNumber();
                    //}

                    var Status = _oDataCaptureBO.SaveDC(IsSubmit);
                    if (Status != false) {                       
                        $scope.ObservationList = [];
                        $scope.CustomObservationList = [];
                        $scope.CustomCorrectiveActionList = [];
                        $scope.AssignedToList = [];
                        $scope.MultiMediaSubElements = [];

                        $scope.SupplierRow = false;
                        $scope.ObservationRow = false;
                        $scope.TypeOfQualityDefectRow = false;    
                        $scope.ForeignObjectIncident = false;
                        $scope.InHouse = false;
                        $scope.Supplier = false;
                        $scope.PersonalHygineAndBehaviour = false;
                        $scope.EuipmentIssue = false;

                        var oCorrectiveAction = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCoorectiveAction', 'DataSourceModelName': 'CorrectiveAction', 'DisplayElementModelName': 'NewDCModel.chkCoorectiveAction' });
                        $scope['CorrectiveAction'] = [];
                      
                        $scope['CorrectiveAction'].push({ Id: 1, Name: "Yes", ControlId: "chkCoorectiveAction", 'ColourIndex': 'green', Selected: false });
                        $scope['CorrectiveAction'].push({ Id: 2, Name: "NO", ControlId: "chkCoorectiveAction", 'ColourIndex': 'red', Selected: true });
                        oCorrectiveAction.Set({ Id: 2, Name: "NO", ControlId: "chkCoorectiveAction", 'ColourIndex': 'red',Selected:true });

                        $scope.CustomCorrectiveAction = false;
                        $scope.divRiskType = false;

                        MyInstance.TabClickEvent(1);
                        LoadAssignedToList();

                        IsNewDcPageDcStartDateSelectionEnabled = false;
                    }                  
                }
                //_oDataCaptureBO.ShowDCSummary();
                ShowDCSummary();
                SetSelectedTextBoxColor_Private('AmbientTempControlId');
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.AmbientTempControlId';
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = '';

                oSetDefaultSpinner.Stop();
            //}           
            //else {
            //    alert("MN-RQ-IRE-001 :: Please enter observation and observation type");
            //}
           
            OneViewConsole.Debug("SaveDCRecords End", "CustomerComplaintMonitoringFacade.SaveDCRecords");
        }
        catch (Excep) {           
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.SaveDCRecords", xlatService);
        }
        finally {
            Status = null;
        }       
    }

    var ShowDCSummary = function () {
       
        try {
            var oDataCaptureDAO = new DcDAO();
            var TotalDCCount = oDataCaptureDAO.GetTotalAuditCountForIncidentReport(ServiceId, LoginUserId, TemplateId, DcPlaceId, DcPlaceName);
            var CompletedDCCount = oDataCaptureDAO.GetTotalCompletedAuditCountForIncidentReport(ServiceId, LoginUserId, TemplateId, DcPlaceId, DcPlaceName);
            var NCCount = oDataCaptureDAO.GetTotalNCCountForIncidentReport(ServiceId, LoginUserId, TemplateId, DcPlaceId, DcPlaceName);
            var IncompleteDCCount = TotalDCCount - CompletedDCCount;

            var DCSummary = { 'TotalDCCount': TotalDCCount, 'CompletedDCCount': CompletedDCCount, 'IncompleteDCCount': IncompleteDCCount, 'NCCount': NCCount };

            $scope.TotalCount = DCSummary.TotalDCCount;
            $scope.CompletedRecords = DCSummary.CompletedDCCount;
            //oScope.IncompleteRecords = DCSummary.IncompleteDCCount;
            $scope.NCCount = DCSummary.NCCount;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.ShowDCSummary", xlatService);
        }
        finally {
            DCSummary = null;
        }
    }

    var LoadCorrectiveActions = function () {
        try {
            var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

            if (DataCaptureClientGuid != "") {

                var DCNCMappingQuery = "SELECT * FROM DCNCMapping WHERE DataCaptureClientGuid = '" + DataCaptureClientGuid + "'";
                var DCNCMappingResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCNCMappingQuery);

                if (DCNCMappingResult.length > 0) {

                    var ActionDetailsQuery = "SELECT * FROM ActionDetailsEntity WHERE ActionClientGuid = '" + DCNCMappingResult[0].ActionClientGuid + "'";
                    var ActionDetailsResult = _OneViewSqlitePlugin.ExcecuteSqlReader(ActionDetailsQuery);

                    $scope.CustomCorrectiveActionList = [];
                    $scope.PreCustomCorrectiveActionList = [];

                    for (var i = 0; i < ActionDetailsResult.length; i++) {
                        $scope.CustomCorrectiveActionList.push({ label: ActionDetailsResult[i].CustomAction, id: ActionDetailsResult[i].Id });
                    }

                    if ($scope.CustomCorrectiveActionList.length > 0) {

                        for (var i = 0; i < $scope.CustomCorrectiveActionList.length; i++) {
                            $scope.PreCustomCorrectiveActionList.push($scope.CustomCorrectiveActionList[i]);
                        }
                        $scope['chkCoorectiveAction'].Clear();
                        $scope['CorrectiveAction'] = [];
                        $scope['CorrectiveAction'].push({ Id: 1, Name: "Yes", ControlId: "chkCoorectiveAction", 'ColourIndex': 'green', Selected: true });
                        $scope['CorrectiveAction'].push({ Id: 2, Name: "NO", ControlId: "chkCoorectiveAction", 'ColourIndex': 'red', Selected: false });
                        //oCorrectiveAction.Set({ Id: 2, Name: "NO", ControlId: "chkCoorectiveAction", 'ColourIndex': 'red', Selected: true });
                        $scope['chkCoorectiveAction'].Set({ Id: 1, Name: "Yes", ControlId: "chkCoorectiveAction", 'ColourIndex': 'green' ,Selected:true});
                        $scope.CustomCorrectiveAction = true;
                    }
                    else {
                        $scope['chkCoorectiveAction'].Clear();
                        $scope['CorrectiveAction'] = [];
                        $scope['CorrectiveAction'].push({ Id: 1, Name: "Yes", ControlId: "chkCoorectiveAction", 'ColourIndex': 'green', Selected: false });
                        $scope['CorrectiveAction'].push({ Id: 2, Name: "NO", ControlId: "chkCoorectiveAction", 'ColourIndex': 'red', Selected: true });
                        $scope['chkCoorectiveAction'].Set({ Id: 2, Name: "NO", ControlId: "chkCoorectiveAction", 'ColourIndex': 'red', Selected: true });
                        $scope.CustomCorrectiveAction = false;
                    }
                }
            }
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.LoadCorrectiveActions", xlatService);
        }
    }

    var LoadMultimediaSubElements = function () {
        try {
            var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
          
            var MultiMediaSubElementsQuery = "SELECT * FROM MultiMediaSubElements WHERE IsDisabled = 'false' AND MappedEntityClientGuid = '" + DataCaptureClientGuid + "'";
            var MultiMediaSubElementsResult = _OneViewSqlitePlugin.ExcecuteSqlReader(MultiMediaSubElementsQuery);
            
            $scope.MultiMediaSubElements = [];

            for (var i = 0; i < MultiMediaSubElementsResult.length; i++) {

                var MultiMediaSubElement = {
                    "Id": MultiMediaSubElementsResult[i].Id,
                    "ServerId": MultiMediaSubElementsResult[i].ServerId,
                    "MappedEntityClientGuid": MultiMediaSubElementsResult[i].MappedEntityClientGuid,
                    "Dimension": MultiMediaSubElementsResult[i].Dimension,
                    "MultiMediaType": "image/jpg",
                    "LocalURL": MultiMediaSubElementsResult[i].LocalURL,
                    "AlternateName": "No Image",
                    "Comments": MultiMediaSubElementsResult[i].Comments,
                    "IsDisabled": false,
                }
                
                $scope.MultiMediaSubElements.push(MultiMediaSubElement);
                _oDataCaptureBO.MultiMediaSubElementsList.push(MultiMediaSubElement);
            }
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.LoadMultimediaSubElements", xlatService);
        }
    }

    var CorrectiveActionEventHandlerOld = function () {

        try {           
            var ObservationList = [];
            for (var i = 0; i < $scope.ObservationList.length; i++) {
                if ($scope.ObservationList[i].selected == "selected") {
                    ObservationList.push($scope.ObservationList[i]);
                }
            }

            //alert($scope.CustomCorrectiveActionList.length + "," + ObservationList.length + "," + $scope.CustomObservationList.length);
           
            if (DcId != null) {
                if ($scope.CustomCorrectiveActionList.length == 0 && ObservationList.length == 0 && $scope.CustomObservationList.length == 0) {                    
                    DeleteAction();
                }
                else if ($scope.CustomCorrectiveActionList.length > 0) {
                    if ($scope.PreCustomCorrectiveActionList.length == 0) {
                        SetActionDTO($scope.CustomCorrectiveActionList);
                    }
                    else {                        
                        UpdateObservation(true);
                    }
                }
                else if (ObservationList.length > 0 || $scope.CustomObservationList.length > 0) {
                 
                    if ($scope.PreObservationList.length == 0 && $scope.PreCustomObservationList.length == 0) {
                        SetObservation();
                    }
                    else {                       
                        UpdateObservation(false);
                    }
                }               
            }
            else {
                if ($scope.CustomCorrectiveActionList.length > 0) {
                    SetActionDTO($scope.CustomCorrectiveActionList);
                }
                else {
                    SetObservation();
                }
            }
        }

        catch (Excep) {
            throw Excep;
        }
    }

    var CorrectiveActionEventHandler = function () {

        try {
            //var ObservationList = [];
            //for (var i = 0; i < $scope.ObservationList.length; i++) {
            //    if ($scope.ObservationList[i].selected == "selected") {
            //        ObservationList.push($scope.ObservationList[i]);
            //    }
            //}

            //alert($scope.CustomCorrectiveActionList.length + "," + ObservationList.length + "," + $scope.CustomObservationList.length);

            if (DcId != null) {
                //if ($scope.CustomCorrectiveActionList.length == 0 && ObservationList.length == 0 && $scope.CustomObservationList.length == 0) {
                //    DeleteAction();
                //}
                if ($scope.CustomCorrectiveActionList.length > 0) {
                    if ($scope.PreCustomCorrectiveActionList.length == 0) {
                        SetActionDTO($scope.CustomCorrectiveActionList);
                    }
                    else {
                        UpdateObservation(true);
                    }
                }
                    //else if (ObservationList.length > 0 || $scope.CustomObservationList.length > 0) {

                    //    if ($scope.PreObservationList.length == 0 && $scope.PreCustomObservationList.length == 0) {
                    //        SetObservation();
                    //    }
                    //    else {                       
                    //        UpdateObservation(false);
                    //    }
                    //} 
                else {
                    DeleteAction();
                    //var SelectedObservationList = [{ label: "Close the issue" }];
                    var SelectedObservationList = [{ label: "" }];
                    SetActionDTO(SelectedObservationList);
                }
            }
            else {
                if ($scope.CustomCorrectiveActionList.length > 0) {
                    SetActionDTO($scope.CustomCorrectiveActionList);
                }
                else {
                    //SetObservation();
                    //var SelectedObservationList = [{ label: "Close the issue" }];
                    var SelectedObservationList = [{ label: "" }];
                    SetActionDTO(SelectedObservationList);
                }
            }
        }

        catch (Excep) {
            throw Excep;
        }
    }

    var UpdateObservation = function (IsCorrectiveAction) {
        try {
            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();

            var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

            var _oDcResultDetailsEntityDAO = new DefaultMasterDAO("ActionDetailsEntity");

            if (DataCaptureClientGuid != ""){

                var DCNCMappingQuery = "SELECT * FROM DCNCMapping WHERE DataCaptureClientGuid = '" + DataCaptureClientGuid + "'";
                var DCNCMappingResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCNCMappingQuery);

                if (DCNCMappingResult.length > 0) {
                    if (IsCorrectiveAction == true) {

                        for (var i = 0; i < $scope.PreCustomCorrectiveActionList.length; i++) {
                            var IsExist = false;
                            for (var j = 0; j < $scope.CustomCorrectiveActionList.length; j++) {
                                if ($scope.PreCustomCorrectiveActionList[i].id == $scope.CustomCorrectiveActionList[j].id) {
                                    IsExist = true;
                                }
                            }
                            if (IsExist == false) {
                                var Q1 = "DELETE FROM ActionDetailsEntity WHERE Id = " + $scope.PreCustomCorrectiveActionList[i].id;
                                window.OneViewSqlite.excecuteSql(Q1);
                            }
                        }

                        for (var j = 0; j < $scope.CustomCorrectiveActionList.length; j++) {
                            if ($scope.CustomCorrectiveActionList[j].id == 0) {

                                var _oActionDetailsEntity = new ActionDetailsEntity();

                                _oActionDetailsEntity.ServiceId = OneViewSessionStorage.Get("ServiceId");
                                _oActionDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                                _oActionDetailsEntity.MobileVersionId = 1;
                                _oActionDetailsEntity.IsPersonalObservation = "true";
                                _oActionDetailsEntity.CreatedDate = CurrenntDateAndTime;
                                _oActionDetailsEntity.IsSynchronized = "false";
                                _oActionDetailsEntity.CustomAction =removeSpecialCharacter($scope.CustomCorrectiveActionList[j].label);
                                _oActionDetailsEntity.ActionClientGuid = DCNCMappingResult[0].ActionClientGuid;
                                _oActionDetailsEntity.DataCaptureClientGuid = DCNCMappingResult[0].DataCaptureClientGuid;

                                _oDcResultDetailsEntityDAO.CreateMaster(_oActionDetailsEntity);
                            }
                        }
                    }
                    else {

                        for (var i = 0; i < $scope.PreCustomCorrectiveActionList.length; i++) {
                            var Q1 = "DELETE FROM ActionDetailsEntity WHERE Id = " + $scope.PreCustomCorrectiveActionList[i].id;
                            window.OneViewSqlite.excecuteSql(Q1);
                        }

                        for (var j = 0; j < $scope.ObservationList.length; j++) {
                            if ($scope.ObservationList[j].selected == "selected") {

                                var _oActionDetailsEntity = new ActionDetailsEntity();

                                _oActionDetailsEntity.ServiceId = OneViewSessionStorage.Get("ServiceId");
                                _oActionDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                                _oActionDetailsEntity.MobileVersionId = 1;
                                _oActionDetailsEntity.IsPersonalObservation = "true";
                                _oActionDetailsEntity.CreatedDate = CurrenntDateAndTime;
                                _oActionDetailsEntity.IsSynchronized = "false";
                                _oActionDetailsEntity.CustomAction = $scope.ObservationList[j].label;
                                _oActionDetailsEntity.ActionClientGuid = DCNCMappingResult[0].ActionClientGuid;
                                _oActionDetailsEntity.DataCaptureClientGuid = DCNCMappingResult[0].DataCaptureClientGuid;

                                _oDcResultDetailsEntityDAO.CreateMaster(_oActionDetailsEntity);
                            }
                        }
                        for (var j = 0; j < $scope.CustomObservationList.length; j++) {

                            var _oActionDetailsEntity = new ActionDetailsEntity();

                            _oActionDetailsEntity.ServiceId = OneViewSessionStorage.Get("ServiceId");
                            _oActionDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                            _oActionDetailsEntity.MobileVersionId = 1;
                            _oActionDetailsEntity.IsPersonalObservation = "true";
                            _oActionDetailsEntity.CreatedDate = CurrenntDateAndTime;
                            _oActionDetailsEntity.IsSynchronized = "false";
                            _oActionDetailsEntity.CustomAction = $scope.CustomObservationList[j].label;
                            _oActionDetailsEntity.ActionClientGuid = DCNCMappingResult[0].ActionClientGuid;
                            _oActionDetailsEntity.DataCaptureClientGuid = DCNCMappingResult[0].DataCaptureClientGuid;

                            _oDcResultDetailsEntityDAO.CreateMaster(_oActionDetailsEntity);
                        }
                  }
               }
            }
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var SetObservation = function () {
        try{
            var SelectedObservationList = [];
            for (var i = 0; i < $scope.ObservationList.length; i++) {
                if ($scope.ObservationList[i].selected == "selected") {
                    SelectedObservationList.push($scope.ObservationList[i]);
                }
            }
            for (var i = 0; i < $scope.CustomObservationList.length; i++) {
                SelectedObservationList.push($scope.CustomObservationList[i]);
            }
            if (SelectedObservationList.length >0)
                SetActionDTO(SelectedObservationList);
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var DeleteAction = function () {
        try {
            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();

            var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

            if (DataCaptureClientGuid != "") {

                var DCNCMappingQuery = "SELECT * FROM DCNCMapping WHERE DataCaptureClientGuid = '" + DataCaptureClientGuid + "'";
                var DCNCMappingResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DCNCMappingQuery);

                if (DCNCMappingResult.length > 0) {

                    var Q1 = "DELETE FROM DCNCMapping WHERE ActionClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q1);
                    _OneViewSqlitePlugin.ExcecuteSql(Q1);

                    var Q2 = "DELETE FROM ActionEntity WHERE ClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q2);
                    _OneViewSqlitePlugin.ExcecuteSql(Q2);

                    var Q3 = "DELETE FROM ActionDetailsEntity WHERE ActionClientGuid='" + DCNCMappingResult[0].ActionClientGuid + "'";
                    //alert(Q3);
                    _OneViewSqlitePlugin.ExcecuteSql(Q3);

                    var Q4 = "UPDATE DataCaptureEntity SET IsAnyNC='false',IsSynchronized='false',TimeStamp='" + CurrentDateAndTime + "' WHERE Id=" + DcId;
                    //alert(Q4);
                    _OneViewSqlitePlugin.ExcecuteSql(Q4);
                }
            }
        }
        catch (Excep) {           
            throw Excep;
        }
    }

    var SetActionDTO = function (ActionDetailsLst) {

        try {         
            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
       
            var _oDCNCMapping = new DCNCMapping();
            _oDCNCMapping.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oDCNCMapping.MobileVersionId = 1;
            _oDCNCMapping.ServiceId = OneViewSessionStorage.Get("ServiceId");
            _oDCNCMapping.RaisedBySystemUserId = OneViewSessionStorage.Get("LoginUserId");
            _oDCNCMapping.IsNC = true;
            _oDCNCMapping.NCRuleId = 1000;
            _oDCNCMapping.CreatedDate = CurrenntDateAndTime;
            _oDCNCMapping.IsSynchronized = 'false';
            _oDCNCMapping.IsManualRule = true;
            _oDCNCMapping.IsObservation = false;
            _oDCNCMapping.Comments = "";
            _oDCNCMapping.AttributeGroupId = 0;

            _oDataCaptureBO.DCNCMappingList[0] = _oDCNCMapping;
          
            var _oActionEntity = new ActionEntity();

            _oActionEntity.ServiceId = OneViewSessionStorage.Get("ServiceId");
            _oActionEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oActionEntity.MobileVersionId = 1;
            _oActionEntity.ActionContext = DATActionContext.DataCapture;
            _oActionEntity.ActionRaisedBySystemUserId = OneViewSessionStorage.Get("LoginUserId");
            _oActionEntity.ActionRaisedByUserName = OneViewSessionStorage.Get("LoginUserName");
            _oActionEntity.CreatedDate = CurrenntDateAndTime
            _oActionEntity.IsSynchronized = "false";
         
            _oDCNCMapping.ActionClientGuid = _oActionEntity.ClientGuid;
            _oDataCaptureBO.DCNCMappingList[0].oActionEntity = _oActionEntity;
         
            for (var i = 0; i < ActionDetailsLst.length; i++) {
                var _oActionDetailsEntity = new ActionDetailsEntity();

                _oActionDetailsEntity.oDataCapture = null;
                _oActionDetailsEntity.ServiceId = OneViewSessionStorage.Get("ServiceId");
                _oActionDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                _oActionDetailsEntity.MobileVersionId = 1;
                _oActionDetailsEntity.IsPersonalObservation = "true";
                _oActionDetailsEntity.CreatedDate = CurrenntDateAndTime;
                _oActionDetailsEntity.IsSynchronized = "false";
                _oActionDetailsEntity.CustomAction =removeSpecialCharacter(ActionDetailsLst[i].label);

                _oDataCaptureBO.DCNCMappingList[0].oActionEntity.ActionDetailsEntityList[i] = _oActionDetailsEntity;
            }
        }
        catch (Excep) {          
            throw Excep;
        }
        finally {
            oProductddl = null;
        }
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

    var SetRcoDataSourceForBand = function () {

        try {
            OneViewConsole.Debug("SetRcoDataSourceForBand Start", "CustomerComplaintMonitoringFacade.SetRcoDataSourceForBand");

            var Result = [];

            var Query = "SELECT ServerId,ChildDbElementName FROM OrganizationAssetsNode WHERE ChildDbElementType = " + DATEntityType.RCOMaster_ClassofForeignObject;           
            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);
           
            for (var i = 0; i < Result.length; i++) {
                Band_ServiceID_1[100000][Result[i].ServerId] = {
                    'Name': Result[i].ChildDbElementName,
                    'Value': Result[i].ServerId,
                    'Sequence': (i+1),
                    'ColourIndex': 'green'
                };
            }
            
            OneViewConsole.Debug("SetRcoDataSourceForBand End", "CustomerComplaintMonitoringFacade.SetRcoDataSourceForBand");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            ProfileQuery = null;
        }
    }

    var Loadddl = function () {
        try {
            OneViewConsole.Debug("Loadddl Start", "CustomerComplaintMonitoringFacade.Loadddl");

            OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
            AutoCompleteCloseEvent = AutoCompleteCloseClick;
         

            var oBusinessUnitddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlBusinessUnitControlId', 'DataSourceModelName': 'BusinessUnit', 'DisplayElementModelName': 'NewDCModel.AddlBusinessUnitControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Company, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0,  'SelectedIndexChangedEventHandler': oUnitSelectedIndexChanged,'AttributeNodeId': 12607 });
            oBusinessUnitddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Company, _TableNamesEnum.OrganizationAssetsNode);
          
            var oSectorddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectorControlId', 'DataSourceModelName': 'Sector', 'DisplayElementModelName': 'NewDCModel.AddlSectorControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Sector, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 12608 });
            oSectorddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Sector, _TableNamesEnum.OrganizationAssetsNode);
           
            var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'AirlineDataSource', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Airline, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 12609, 'SelectedIndexChangedEventHandler': oAirlineSelectedIndexChanged, 'IsDynamicElementCreationEnabled': false });
            oAirlinesddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Airline, _TableNamesEnum.OrganizationAssetsNode);
           
            var oFlightddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFlightControlId', 'DataSourceModelName': 'Flights', 'DisplayElementModelName': 'NewDCModel.AddlFlightControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 12610, 'IsDynamicElementCreationEnabled': false });
            oFlightddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);

            
            var oTypeOfComplaintddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlTypeOfComplaintControlId', 'DataSourceModelName': 'TypeOfComplaint', 'DisplayElementModelName': 'NewDCModel.AddlTypeOfComplaintControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_TypeOfComplaint, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'SelectedIndexChangedEventHandler': oObservationTypeSelectedIndexChanged, 'AttributeNodeId': 12613 });
            oTypeOfComplaintddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_TypeOfComplaint, _TableNamesEnum.OrganizationAssetsNode);
            
            var oTypeOfQualityDefectCategoryddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlTypeOfQualityDefectControlId', 'DataSourceModelName': 'TypeOfQualityDefect', 'DisplayElementModelName': 'NewDCModel.AddlTypeOfQualityDefectControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_TypeofQualityDefect, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'SelectedIndexChangedEventHandler': oQualityDefectCategorySelectedIndexChanged, 'AttributeNodeId': 12617 });
            oTypeOfQualityDefectCategoryddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_TypeofQualityDefect, _TableNamesEnum.OrganizationAssetsNode);
            
            var oMealCategoryddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlMealCategoryControlId', 'DataSourceModelName': 'MealCategory', 'DisplayElementModelName': 'NewDCModel.AddlMealCategoryControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_MealCategory, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 12619 });
            oMealCategoryddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_MealCategory, _TableNamesEnum.OrganizationAssetsNode);
            
            var oProducedByddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlProducedByControlId', 'DataSourceModelName': 'ProducedBy', 'DisplayElementModelName': 'NewDCModel.AddlProducedByControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ProducedBy, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'SelectedIndexChangedEventHandler': oProducedBySelectedIndexChanged, 'AttributeNodeId': 12620 });
            oProducedByddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_ProducedBy, _TableNamesEnum.OrganizationAssetsNode);
            
            var oSupplierNameddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSupplierNameControlId', 'DataSourceModelName': 'SupplierName', 'DisplayElementModelName': 'NewDCModel.AddlSupplierNameControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Supplier, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 12621 });
            oSupplierNameddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Supplier, _TableNamesEnum.OrganizationAssetsNode);
            
            
            OneViewConsole.Debug("Loadddl End", "CustomerComplaintMonitoringFacade.Loadddl");
        }
        catch (Excep) {            
            throw Excep;
        }
        finally {
            oProductddl = null;
        }
    }

    var SetDataSourceFromProfile_Unit = function () {

        try {
            OneViewConsole.Debug("SetDataSourceFromProfile_Unit Start", "CustomerComplaintMonitoringFacade.SetDataSourceFromProfile_Unit");

            var DcPlaceList = [];

            var ProfileQuery = "SELECT DISTINCT DcPlaceId,DcPlaceDimension FROM DcProfileEntity INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + LoginUserId + " AND (-1=" + TemplateId + " or  TemplateNodeId=" + TemplateId + ") and DcProfileEntity.ServiceId=" + ServiceId + "";
            var result = window.OneViewSqlite.excecuteSqlReader(ProfileQuery);
            var DcProfileResult = JSON.parse(result);
            for (var i = 0; i < DcProfileResult.length; i++) {
                var DcPlaceNodeId = DcProfileResult[i]['DcPlaceId'];
                var DcPlace = "SELECT DISTINCT ChildDbElementName FROM OrganizationAssetsNode WHERE ServerId=" + DcPlaceNodeId + " ORDER BY ChildDbElementName ASC";
                var resultData = window.OneViewSqlite.excecuteSqlReader(DcPlace);
                var resultDcPlace = JSON.parse(resultData);
                var DcPlaceName = resultDcPlace[0].ChildDbElementName;
                var resObj = { Id: DcPlaceNodeId, Name: DcPlaceName, IsDynamicElement: false };
                DcPlaceList.push(resObj);
            }

            //alert(JSON.stringify(DcPlaceList));

            $scope['Unit'] = [];
            $scope['Unit'] = DcPlaceList;

            if (DcPlaceList.length > 0) {

                $scope['AddlUnitControlId'].Set({ "Id": DcPlaceList[0].Id, "Name": DcPlaceList[0].Name, "IsDynamicElement": false });
                OneViewSessionStorage.Save("DcPlaceId", DcPlaceList[0].Id);
                OneViewSessionStorage.Save("DcPlaceName", DcPlaceList[0].Name);
                _oDataCaptureBO.SetDcPlaceDetails(DcPlaceList[0].Id, DcPlaceList[0].Name);

                DcPlaceId = DcPlaceList[0].Id;
                DcPlaceName = DcPlaceList[0].Name;
            }

            OneViewConsole.Debug("SetDataSourceFromProfile_Unit End", "CustomerComplaintMonitoringFacade.SetDataSourceFromProfile_Unit");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            ProfileQuery = null;
        }
    }

    var oUnitSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oUnitSelectedIndexChanged Start", "CustomerComplaintMonitoringFacade.oUnitSelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {
                OneViewSessionStorage.Save("DcPlaceId", EventArgs.NewValue.Id);
                OneViewSessionStorage.Save("DcPlaceName", EventArgs.NewValue.Name);
                _oDataCaptureBO.SetDcPlaceDetails(EventArgs.NewValue.Id, EventArgs.NewValue.Name);

                DcPlaceId = EventArgs.NewValue.Id;
                DcPlaceName = EventArgs.NewValue.Name;
            }
            //else {
            //    $scope['AddlUnitControlId'].Set({ "Id": 3, "Name": "EKFC 1", "IsDynamicElement": false });              
            //    OneViewSessionStorage.Save("DcPlaceId", 3);
            //    OneViewSessionStorage.Save("DcPlaceName", "EKFC 1");
            //    _oDataCaptureBO.SetDcPlaceDetails(3, "EKFC 1");

            //    DcPlaceId = 3;
            //    DcPlaceName = "EKFC 1";
            //}

            if (DcId == null || IsFirstTimeEdit == false) {
               
                //$scope['AddlLocationControlId'].Clear();
                //$scope['AddlSectionControlId'].Clear();
            }

            OneViewConsole.Debug("oUnitSelectedIndexChanged End", "CustomerComplaintMonitoringFacade.oUnitSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    var oAirlineSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oAirlineSelectedIndexChanged Start", "CookingAndBlastChillingMonitoringFacade.oAirlineSelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {
                
                var FlightId = "";
                var FlightName = "";
                if ((DcId != null || IsFirstTimeEditForAirLine == true) && (($scope['AddlFlightControlId'] != undefined && $scope['AddlFlightControlId'].GetSelectedText() != undefined) && ($scope['AddlFlightControlId'].GetSelectedText() != ''))) {
                    FlightId = $scope['AddlFlightControlId'].GetSelectedValue();
                    FlightName = $scope['AddlFlightControlId'].GetSelectedText();
                }

                var oFlightddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFlightControlId', 'DataSourceModelName': 'Flights', 'DisplayElementModelName': 'NewDCModel.AddlFlightControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 12610, 'IsDynamicElementCreationEnabled': false });
                oFlightddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);

                if ((DcId != null || IsFirstTimeEditForAirLine == true) && ((FlightId != "") && (FlightName != ''))) {
                    $scope['AddlFlightControlId'].Set({ Id: FlightId, Name: FlightName, "IsDynamicElement": true });
                }

                if (DcId == null || IsFirstTimeEditForAirLine == false) {
                    
                    oFlightddl.Clear();
                }

            }
            else {
                
                var oFlightddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFlightControlId', 'DataSourceModelName': 'Flights', 'DisplayElementModelName': 'NewDCModel.AddlFlightControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 12610, 'IsDynamicElementCreationEnabled': false });
                oFlightddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);

            }

            OneViewConsole.Debug("oAirlineSelectedIndexChanged End", "CookingAndBlastChillingMonitoringFacade.oAirlineSelectedIndexChanged");
        }
        catch (Excep) {            
            throw Excep;
        }
        finally {
            oFlightddl = null;
        }
    }


    var oDepartmentSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oDepartmentSelectedIndexChanged Start", "CustomerComplaintMonitoringFacade.oDepartmentSelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {
               
                var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Location', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'SelectedIndexChangedEventHandler': oLocationSelectedIndexChanged, 'AttributeNodeId': 487 });
                oLocationddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);

                if (DcId == null || IsFirstTimeEdit == false) {
                    oLocationddl.Clear();
                    $scope['AddlSectionControlId'].Clear();
                }
            }
            else {
                var oLocationddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlLocationControlId', 'DataSourceModelName': 'Location', 'DisplayElementModelName': 'NewDCModel.AddlLocationControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'SelectedIndexChangedEventHandler': oLocationSelectedIndexChanged, 'AttributeNodeId': 487 });
                oLocationddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);
            }
            
            OneViewConsole.Debug("oDepartmentSelectedIndexChanged End", "CustomerComplaintMonitoringFacade.oDepartmentSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    var oLocationSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oLocationSelectedIndexChanged Start", "CustomerComplaintMonitoringFacade.oLocationSelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                var oSectionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Section, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 488 });
                oSectionddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Section, _TableNamesEnum.OrganizationAssetsNode);

                if (DcId == null || IsFirstTimeEdit == false) {
                    oSectionddl.Clear();
                }
            }
            else {
                var oSectionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.AddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Section, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 488 });
                oSectionddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Section, _TableNamesEnum.OrganizationAssetsNode);
            }

            OneViewConsole.Debug("oLocationSelectedIndexChanged End", "CustomerComplaintMonitoringFacade.oLocationSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    var oObservationTypeSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oObservationTypeSelectedIndexChanged Start", "CustomerComplaintMonitoringFacade.oObservationTypeSelectedIndexChanged");
         
            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {
                
                if (EventArgs.NewValue.Name == "Foreign Object") //foreign object
                {
                    var Query = "SELECT ServerId,Name From IncidentMasterEntity WHERE IncidentTypeId = 1";

                    var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                    Nodes = JSON.parse(Nodes);

                    $scope.ObservationList = [];

                    for (i = 0; i < Nodes.length; i++) {
                        $scope.ObservationList.push({
                            label: Nodes[i].Name,
                            id: 0,
                            Answer: Nodes[i].ServerId,
                            IndexId: 0,
                            selected: "",
                        });
                    }

                    if ($scope.ObservationList.length > 0) {
                        $scope.ObservationRow = true;
                    }
                    else {
                        $scope.ObservationRow = false;
                    }

                    $scope.TypeOfQualityDefectRow = false;      
                }
                else if (EventArgs.NewValue.Name == "Quality Defect") //quality defect
                {
                    $scope.TypeOfQualityDefectRow = true;     
                    $scope.ObservationRow = false;       

                     for (var i = 0; i < $scope.ObservationList.length; i++) {
                         $scope.ObservationList[i].selected = "";
                     }
                }
                else {
                    $scope.TypeOfQualityDefectRow = false;
                    $scope.ObservationRow = false;  

                    for (var i = 0; i < $scope.ObservationList.length; i++) {
                        $scope.ObservationList[i].selected = "";
                    }
                }
            }

            if (DcId == null || IsFirstTimeEdit == false) {
                $scope["AddlTypeOfQualityDefectControlId"].Clear();
                $scope["chkClassOfForeignObjectControlId"].Clear();
                $scope["chkSeverityOfForeignObjectControlId"].Clear();
            }

            OneViewConsole.Debug("oObservationTypeSelectedIndexChanged End", "CustomerComplaintMonitoringFacade.oObservationTypeSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {           
        }
    }

    var oQualityDefectCategorySelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oQualityDefectCategorySelectedIndexChanged Start", "CustomerComplaintMonitoringFacade.oQualityDefectCategorySelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                if (EventArgs.NewValue.Name == "Dirty Equipments" || EventArgs.NewValue.Name == "Others") //Dirty Equipments or Others
                {
                    $scope.CommentsForQDShow = true;
                }
                else {
                    $scope.CommentsForQDShow = false;                         
                }
            }

            if (DcId == null || IsFirstTimeEdit == false) {
                $scope.NewDCModel.txtCommentsForQualityDefectControlId = "";   
            }

            OneViewConsole.Debug("oQualityDefectCategorySelectedIndexChanged End", "CustomerComplaintMonitoringFacade.oQualityDefectCategorySelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    var oProducedBySelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oProducedBySelectedIndexChanged Start", "CustomerComplaintMonitoringFacade.oProducedBySelectedIndexChanged");

            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                if (EventArgs.NewValue.Name == "Outsourced") //Outsourced
                {                   
                    $scope.SupplierRow = true;
                }                
                else {
                    $scope.SupplierRow = false;                    
                }
            }

            if (DcId == null || IsFirstTimeEdit == false) {
                $scope["AddlSupplierNameControlId"].Clear();
            }

            OneViewConsole.Debug("oProducedBySelectedIndexChanged End", "CustomerComplaintMonitoringFacade.oProducedBySelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }   

    var LoadAssignedToList = function () {
        try {
            OneViewConsole.Debug("LoadAssignedToList Start", "CustomerComplaintMonitoringFacade.LoadAssignedToList");

            var Query = "SELECT ServerId,ChildDbElementName FROM OrganizationAssetsNode WHERE ChildDbElementType = " + DATEntityType.RCOMaster_AssignedTo;         
            var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
            Nodes = JSON.parse(Nodes);
            
            $scope.AssignedToList = [];

            for (i = 0; i < Nodes.length; i++) {
                $scope.AssignedToList.push({
                    label: Nodes[i].ChildDbElementName,
                    id: 0,
                    Answer: Nodes[i].ServerId,
                    IndexId: 0,
                    selected: "",
                });
            }
            
            OneViewConsole.Debug("LoadAssignedToList End", "CustomerComplaintMonitoringFacade.LoadAssignedToList");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    var UpdateAssignedToValues = function () {
        try {
            OneViewConsole.Debug("UpdateAssignedToValues Start", "CustomerComplaintMonitoringFacade.UpdateAssignedToValues");

            for (var j = 0; j < $scope.AssignedToList.length; j++) {
                
                if ($scope.AssignedToList[j].label == "Food Safety") {
                    if ($scope.AssignedToList[j].selected == "") {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId1"] = 0;
                    }
                    else {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId1"] = 1;
                    }
                }
                else if ($scope.AssignedToList[j].label == "Production") {
                    if ($scope.AssignedToList[j].selected == "") {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId2"] = 0;
                    }
                    else {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId2"] = 1;
                    }
                }
                else if ($scope.AssignedToList[j].label == "Operations") {
                    if ($scope.AssignedToList[j].selected == "") {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId3"] = 0;
                    }
                    else {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId3"] = 1;
                    }
                }
                else if ($scope.AssignedToList[j].label == "Supply Chain") {
                    if ($scope.AssignedToList[j].selected == "") {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId4"] = 0;
                    }
                    else {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId4"] = 1;
                    }
                }
                else if ($scope.AssignedToList[j].label == "Procurement") {
                    if ($scope.AssignedToList[j].selected == "") {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId5"] = 0;
                    }
                    else {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId5"] = 1;
                    }
                }
                else if ($scope.AssignedToList[j].label == "Food point") {
                    if ($scope.AssignedToList[j].selected == "") {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId6"] = 0;
                    }
                    else {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId6"] = 1;
                    }
                }
                else if ($scope.AssignedToList[j].label == "Engineering") {
                    if ($scope.AssignedToList[j].selected == "") {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId7"] = 0;
                    }
                    else {
                        $scope.NewDCModel["txtIsAnalysisStartedControlId7"] = 1;
                    }
                }
            }   

            OneViewConsole.Debug("UpdateAssignedToValues End", "CustomerComplaintMonitoringFacade.UpdateAssignedToValues");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    var UpdateDcStartDate = function () {
        try {
            OneViewConsole.Debug("UpdateDcStartDate Start", "CustomerComplaintMonitoringFacade.UpdateDcStartDate");

            if ($scope.NewDCModel.txtDateOfReceiptOfComplaintControlId != undefined && $scope.NewDCModel.txtDateOfReceiptOfComplaintControlId != "") {

                IsNewDcPageDcStartDateSelectionEnabled = true;

                var otxtDateOfReceiptOfComplaintControlId = document.getElementById("txtDateOfReceiptOfComplaintControlId");

                if (otxtDateOfReceiptOfComplaintControlId != null) {

                    var date = otxtDateOfReceiptOfComplaintControlId.value;

                    if (date != "" && date != undefined && date != null) {

                        var dateArr = date.split('-');

                        var Day = (dateArr[2] <= 9) ? ("0" + dateArr[2]) : dateArr[2];
                        Day = Day.slice(-2);

                        var Month = (dateArr[1] <= 9) ? ("0" + dateArr[1]) : dateArr[1];
                        Month = Month.slice(-2);

                        date = Day + "-" + Month + "-" + dateArr[0] + " 00:00:00";
                        
                        _oDataCaptureBO.SetDcStartDate(date);
                    }                   
                }                                                             
            }
            else {
                IsNewDcPageDcStartDateSelectionEnabled = false;
            }
            
            OneViewConsole.Debug("UpdateDcStartDate End", "CustomerComplaintMonitoringFacade.UpdateDcStartDate");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
        try {

            OneViewConsole.Debug("Temperature_NgKeyUp Start", "CustomerComplaintMonitoringFacade.Temperature_NgKeyUp");

            ////if (IsNc == true) {
            //    var ActionResponseList = EvaluateActionNCStatus(AttributeId);
            //// }
            ValidateActionNC(AttributeId, ControlId)
            if (RefreshcontrolId != '') {
                // var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                _oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
            }

            NCSelectedAttributeId = AttributeId;
            OneViewConsole.Debug("Temperature_NgKeyUp End", "CustomerComplaintMonitoringFacade.Temperature_NgKeyUp");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.Temperature_NgKeyUp", xlatService);
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
            OneViewConsole.Debug("ValidateActionNC Start", "CustomerComplaintMonitoringFacade.ValidateActionNC");
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
            OneViewConsole.Debug("ValidateActionNC End", "CustomerComplaintMonitoringFacade.ValidateActionNC");
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
            OneViewConsole.Debug("CheckActionNCEvent Start", "CustomerComplaintMonitoringFacade.CheckActionNCEvent");
            ValidateActionNC(AttributeId, ControlId);
            OneViewConsole.Debug("CheckActionNCEvent End", "CustomerComplaintMonitoringFacade.CheckActionNCEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.CheckActionNCEvent", xlatService);
        }
        finally {
            oDataCaptureBO = null;
        }
    }

    var EvaluateActionNCStatus = function (AttributeId) {
        try {
            OneViewConsole.Debug("ShowNCStatus Start", "CustomerComplaintMonitoringFacade.EvaluateActionNCStatus");
            var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
            return ActionResponseList;
            OneViewConsole.Debug("ShowNCStatus End", "CustomerComplaintMonitoringFacade.EvaluateActionNCStatus");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            DCNCMappingListData = null;
        }
    }

    this.Destroy = function () {
        _oDataCaptureBO.TemperatureNgKeyUpEventHandler = null;
    }

    this.ShowNCFormAction = function (ControlId) {
        try {
            OneViewConsole.Debug("ShowNCFormAction Start", "CustomerComplaintMonitoringFacade.ShowNCFormAction");

            //var TempOutNCTemplate = TemplateMetaData[ServiceId][NCTemplateDetails.TemplateId];
            //var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': NCTemplateDetails.TemplateId, 'TemplateName': NCTemplateDetails.TemplateName });
            ////Edit case
            //if (DcId != null) {

            //}

            ////Save case
            //else if (_oDataCaptureBO.FormActionCount <= 1) {
            //    _oNCDcDataCaptureBO.ClearControls(TempOutNCTemplate);
            //}
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



            OneViewConsole.Debug("ShowNCFormAction End", "CustomerComplaintMonitoringFacade.ShowNCFormAction");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.ShowNCFormAction", xlatService);
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
            MyInstance.Temperature_NgKeyUp(option.AttributeNodeId, option.ControlId, '');

        }
        catch (Excep) {
            //alert('Excep OnAnswerModeSelect :' + Excep + JSON.stringify(Excep))
            throw Excep;
        }
    }

    var LoadAnswerModes = function () {
        try {
            OneViewConsole.Debug("LoadAnswerModes Start", "CustomerComplaintMonitoringFacade.LoadAnswerModes");

            AnswerModeNCActionEvent = OnAnswerModeSelect;

            var oActualForeignObject = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkActualForeignObjectControlId', 'DataSourceModelName': 'ActualForeignObject', 'DisplayElementModelName': 'NewDCModel.chkActualForeignObjectControlId' });
            oActualForeignObject.AnswerModes(TemplateNodes, 12611);

            var oClassOfForeignObject = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkClassOfForeignObjectControlId', 'DataSourceModelName': 'ClassOfForeignObject', 'DisplayElementModelName': 'NewDCModel.chkClassOfForeignObjectControlId' });
            oClassOfForeignObject.AnswerModes(TemplateNodes, 12615);

            var oSeverityOfForeignObject = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSeverityOfForeignObjectControlId', 'DataSourceModelName': 'SeverityOfForeignObject', 'DisplayElementModelName': 'NewDCModel.chkSeverityOfForeignObjectControlId' });
            oSeverityOfForeignObject.AnswerModes(TemplateNodes, 12616);

            //var oConclusionObject = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkConclusionControlId', 'DataSourceModelName': 'Conclusion', 'DisplayElementModelName': 'NewDCModel.chkConclusionControlId' });
            //oConclusionObject.AnswerModes(TemplateNodes, 12624);

            /*
           

            var oCorrectiveAction = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCoorectiveAction', 'DataSourceModelName': 'CorrectiveAction', 'DisplayElementModelName': 'NewDCModel.chkCoorectiveAction' });
            $scope['CorrectiveAction'] = [];
            $scope['CorrectiveAction'].push({ Id: 1, Name: "Yes", ControlId: "chkCoorectiveAction", 'ColourIndex': 'green', Selected: false });
            $scope['CorrectiveAction'].push({ Id: 2, Name: "NO", ControlId: "chkCoorectiveAction", 'ColourIndex': 'red', Selected: true });
            oCorrectiveAction.Set({ Id: 2, Name: "NO", ControlId: "chkCoorectiveAction", 'ColourIndex': 'red' ,Selected:true});
            */


            OneViewConsole.Debug("LoadAnswerModes End", "CustomerComplaintMonitoringFacade.LoadAnswerModes");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oRefrigeratorStatus = null;
        }
    }

    var CreateDynamicElements = function (_DcResultDetailsEntityLst) {
        try {
            OneViewConsole.Debug("CreateDynamicElements Start", "CustomerComplaintMonitoringFacade.CreateDynamicElements");

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
                    var _oDynamicElementBO = new DynamicElementBO();
                    var Response = _oDynamicElementBO.AddDynamicRCO(_DcResultDetailsEntityLst[i], ParentNodeId, ParentDbElementType, ParentDbElementId);
                    //Update Answer with newly created node
                    _DcResultDetailsEntityLst[i].Answer = Response.NodeClientGuid;
                }
            }

            OneViewConsole.Debug("CreateDynamicElements End", "CustomerComplaintMonitoringFacade.CreateDynamicElements");
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
            OneViewConsole.Debug("Temperature_NgKeyUp Start", "CustomerComplaintMonitoringFacade.Temperature_NgKeyUp");

            if (IsNc == true) {
                ShowNCStatus(AttributeId, ControlId);
            }

            var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
            oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.Temperature_NgKeyUp", xlatService);
        }
        finally {
            oDataCaptureBO = null;
        }
    }

    var ShowNCStatusOLD = function (AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("ShowNCStatus Start", "CustomerComplaintMonitoringFacade.ShowNCStatus");

            var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
            NormalizeNCEntityListData(DCNCMappingListData);

            OneViewConsole.Debug("ShowNCStatus End", "CustomerComplaintMonitoringFacade.ShowNCStatus");
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
            OneViewConsole.Debug("ClearForm Start", "CustomerComplaintMonitoringFacade.ClearForm");

            $scope.ObservationList = [];
            $scope.CustomObservationList = [];
            $scope.CustomCorrectiveActionList = [];
            $scope.AssignedToList = [];
            $scope.MultiMediaSubElements = [];

            $scope.SupplierRow = false;
            $scope.ObservationRow = false;
            $scope.TypeOfQualityDefectRow = false;    
            $scope.ForeignObjectIncident = false;
            $scope.InHouse = false;
            $scope.Supplier = false;
            $scope.PersonalHygineAndBehaviour = false;
            $scope.EuipmentIssue = false;

            _oDataCaptureBO.ClearControls();

            if (DcId != null) {

                IsFirstTimeEdit = true;

                _oDataCaptureBO.LoadEditPage(DcId, $scope);                

                LoadCorrectiveActions();
                LoadMultimediaSubElements();

                IsFirstTimeEdit = false;
            }
            else {
                _oDataCaptureBO.setDefaultValue();
                LoadAssignedToList();
            }

            OneViewConsole.Debug("ClearForm End", "CustomerComplaintMonitoringFacade.ClearForm");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.ClearForm", xlatService);
        }
    }

    var IsNCthereOrNot = function (RuleId, isNC) {
        try {
            OneViewConsole.Debug("IsNCthereOrNot Start", "CustomerComplaintMonitoringFacade.IsNCthereOrNot");

            var ExistStatus = false;
            for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                    _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                    _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                    ExistStatus = true;
                    break;
                }
            }

            OneViewConsole.Debug("IsNCthereOrNot End", "CustomerComplaintMonitoringFacade.IsNCthereOrNot");
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
            OneViewConsole.Debug("NormalizeNCEntityListData Start", "CustomerComplaintMonitoringFacade.NormalizeNCEntityListData");

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

            OneViewConsole.Debug("NormalizeNCEntityListData End", "CustomerComplaintMonitoringFacade.NormalizeNCEntityListData");
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
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.PreControlEvents", xlatService);
        }
    }

    this.PostControlEvents = function (AttributeId, ControlId) {
        try {

            _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.PostControlEvents", xlatService);
        }
    }

    this.ngChange_setDateTime = function (ControlId) {
        try {
            var oDateTime = new DateTime();
            var time = document.getElementById(ControlId).value;
            //   alert($scope[ControlId]);
            if ($scope[ControlId + "_DateTime"] != null && $scope[ControlId + "_DateTime"] != '') {
                $scope[ControlId + "_DateTime"] = $scope[ControlId + "_DateTime"].split(' ')[0] + " " + time;
            }
            else {
                //$scope["NewDCModel." + ControlId + "_DateTime"] = oDateTime.GetDate() + " " + time;
                $scope[ControlId + "_DateTime"] = oDateTime.GetDate() + " " + time;
            }
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.ngChange_setDateTime", xlatService);
        }
    }

    this.NCClick = function ($compile) {

        try {
            _oDataCaptureBO.LoadNCCommentsHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.NgKeyUp", xlatService);
        }
        finally {
        }
    }

    this.NCTabClick = function ($compile) {

        try {
            _oDataCaptureBO.AppendNCHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.AppendNCHtml", xlatService);
        }
        finally {
        }
    }

    this.ObservationTabClick = function ($compile) {

        try {
            _oDataCaptureBO.AppendObservationHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.AppendObservationHtml", xlatService);
        }
        finally {
        }
    }

    this.CustomNCClick = function () {

        try {
            _oDataCaptureBO.CustomNCClick();
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.CustomNCClick", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.CustomNCClick", xlatService);
        }
    }

    this.ClearReasons = function () {
        try {
            $scope.NewDCModel["NCComments"] = '';
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.ClearReasons", xlatService);
        }
    }

    this.ClearComments = function () {
        try {
            $scope.NewDCModel["ObservationComments"] = '';
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.ClearComments", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.ProbeTesting", xlatService);
        }
    }

    this.DCImageCaptureAnswerModeSaveEventHandler = function (AttributeNodeId, ControlId, SelectionType) {
        try {
           
            _oDataCaptureBO.DCImageCaptureAnswerModeSaveEventHandler(AttributeNodeId, ControlId, SelectionType);

        }
        catch (Excep) {
            // alert(JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.DCImageCaptureAnswerModeSaveEventHandler", xlatService);
        }
    }

    this.DCImageCaptureAnswerModeDeleteEventHandler = function (AttributeNodeId, ControlId, SelectionType) {
        try {
            _oDataCaptureBO.DCImageCaptureAnswerModeDeleteEventHandler(AttributeNodeId, ControlId, SelectionType);
        }
        catch (Excep) {
            // alert(JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "CustomerComplaintMonitoringFacade.DCImageCaptureAnswerModeDeleteEventHandler", xlatService);
        }
    }
    var LoadSource = function () {
        try {
            OneViewConsole.Debug("LoadSource Start", "CustomerComplaintMonitoringFacade.LoadSource");

            if ($scope["chkSourceControlId"].GetSelectedValue() != undefined && $scope["chkSourceControlId"].GetSelectedValue() != "") {
                if ($scope["chkSourceControlId"].GetSelectedValue() == 50) {
                    scope.InHouse = true;
                    scope.Supplier = false;
                }
                else if ($scope["chkSourceControlId"].GetSelectedValue()==51) {
                    scope.InHouse = false;
                    scope.Supplier = true;
                }
            }

            OneViewConsole.Debug("LoadSource End", "CustomerComplaintMonitoringFacade.LoadSource");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
           
        }
    }

    /// <summary>
    /// MultiMedia Delete Event Handler
    /// </summary>
    var MultiMediaDeleteEventHandler = function (RuleId, LocalURL) {

        try {
            OneViewConsole.Debug("MultiMediaDeleteEventHandler Start", "CustomerComplaintMonitoringFacade.MultiMediaDeleteEventHandler");

            //alert("RuleId : " + RuleId + ", LocalURL : " + LocalURL);
           
            if (LocalURL != "" && LocalURL != undefined) {
               
                for (var i = 0; i < scope.MultiMediaSubElements.length; i++) {
                    if (scope.MultiMediaSubElements[i].LocalURL == LocalURL) {                        
                        scope.MultiMediaSubElements.splice(i, 1);                       
                    }
                }
                for (var i = 0; i < _oDataCaptureBO.MultiMediaSubElementsList.length; i++) {
                    if (_oDataCaptureBO.MultiMediaSubElementsList[i].LocalURL == LocalURL) {
                        if (_oDataCaptureBO.MultiMediaSubElementsList[i].ServerId == 0) {
                            _oDataCaptureBO.MultiMediaSubElementsList[i].IsDisabled = true;
                        }                                              
                    }
                }              
            }

            OneViewConsole.Debug("MultiMediaDeleteEventHandler End", "CustomerComplaintMonitoringFacade.MultiMediaDeleteEventHandler");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Facade", "CustomerComplaintMonitoringFacade.MultiMediaDeleteEventHandler", Excep);
        }
    }



    this.SaveSignature = function (ControlId, signaturePad) {
        try {
            OneViewConsole.Debug("SaveSignature Start", "ComplianceVisitReportFacade.SaveSignature");
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

            OneViewConsole.Debug("SaveSignature End", "ComplianceVisitReportFacade.SaveSignature");
        }
        catch (Excep) {
            //alert('SaveSignature :' + Excep + "," + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "ComplianceVisitReportFacade.SaveSignature", xlatService);
        }
        finally {
            oDateTime = null;
            CurrenntDateAndTime = null;
        }
    }

    this.ClearSignature = function (ControlId) {
        try {
            OneViewConsole.Debug("ClearSignature Start", "ComplianceVisitReportFacade.ClearSignature");

            $scope[ControlId + '_IsModified'] = false;
            $scope[ControlId + '_SignaturePad'] = '';
            $scope.lblSignature = "";

            OneViewConsole.Debug("ClearSignature End", "ComplianceVisitReportFacade.ClearSignature");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ComplianceVisitReportFacade.ClearSignature", xlatService);
        }
    }

    this.Signature = function (SignatureNameControlId) {
        try {
            OneViewConsole.Debug("Signature Start", "ComplianceVisitReportFacade.Signature");

            //$scope.DivNGForm = true;
            //$scope.DivContent = false;
            //$scope.DivSignature = true;
            $scope[SignatureNameControlId + '_DivSignature'] = true;

            $timeout(function () {
                SignatureContent(SignatureNameControlId);
            }, 100);


            OneViewConsole.Debug("Signature End", "ComplianceVisitReportFacade.Signature");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ComplianceVisitReportFacade.Signature", xlatService);
        }
    }

    var SignatureContent = function (SignatureNameControlId) {
        try {
            OneViewConsole.Debug("SignatureContent Start", "ComplianceVisitReportFacade.SignatureContent");

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

            OneViewConsole.Debug("SignatureContent End", "ComplianceVisitReportFacade.SignatureContent");
        }
        catch (Excep) {
            // alert('SignatureContent :' + Excep + "," + JSON.stringify(Excep));
            throw Excep;
        }
        finally {
            wrapper = null;
        }
    }

    this.TabClickEvent = function (TabId) {
        try {
            OneViewConsole.Debug("TabClickEvent Start", "ComplianceVisitReportFacade.TabClickEvent");

            var _oDOM = new DOM();

            if (TabId == 1) {

                $scope.Tab1Show = true;
                $scope.Tab2Show = false;

                _oDOM.RemoveClass("Tab2", "active");
                _oDOM.AddClass("Tab1", "active");
            }
            else if (TabId == 2) {

                $scope.Tab1Show = false;
                $scope.Tab2Show = true;

                _oDOM.RemoveClass("Tab1", "active");
                _oDOM.AddClass("Tab2", "active");                
            }
            
            OneViewConsole.Debug("TabClickEvent End", "ComplianceVisitReportFacade.TabClickEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ComplianceVisitReportFacade.TabClickEvent", xlatService);
        }
    };
}


