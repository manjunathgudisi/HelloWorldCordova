
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
  

MyApp.controller('IncidentReportController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
       

        var IsNavigate = false;
        var Url;

        ////////////////*********************** Validation for going in Shift Report page when any profile are there only************************ START///////////////////////////
        var UserId = OneViewSessionStorage.Get("LoginUserId");
        var query = "SELECT * FROM DcProfileEntity WHERE DcUserId= " + UserId + " AND TemplateNodeId = 483";
        var result = window.OneViewSqlite.excecuteSqlReader(query);
        var queryresult = JSON.parse(result);
        if (queryresult.length > 0) {
            var IsFromMenu = $location.search().IsFromMenu;
            //alert('IsFromMenu : ' + IsFromMenu);
            if (IsFromMenu != undefined) {
                OneViewSessionStorage.Remove("DcId");
            }
            // $location.url('/483');
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
            var currentPage = 'T483';
            xlatService.setCurrentPage(currentPage, true);
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
            scope = $scope;
            oSnapRemote = snapRemote;

            //$scope.ForeignObjectIncident = true;
            //$scope.PersonalHygineAndBehaviour = true;
            //$scope.InHouse = true;
            //$scope.Supplier = true;

            var oIncidentReportFacade = new IncidentReportFacade({ 'scope': $scope, 'document': $document, 'location': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', '$timeout': $timeout, 'compile': $compile });

            oIncidentReportFacade.Init();
            oIncidentReportFacade.PageLoad();
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
            oIncidentReportFacade.Destroy();
        }

        NCActionProfileMetaData = undefined;
        CommentsResult = {};
        ObservationResult = {};
        NCSelectedAttributeId = 0;

        LVMultiMediaDeleteEventHandler = null;

        xlatService.RemoveCurrentPageMetadata(currentPage);
    });

    $scope.GetProbeStatus = function () {
        oIncidentReportFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oIncidentReportFacade.SaveDCRecords(false);
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oIncidentReportFacade.SetSelectedTextBoxColor(ControlId);
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
        oIncidentReportFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
    };


    $scope.ShowNCStatus = function (AttributeId, ControlId) {
        $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
    }
 
    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oIncidentReportFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, Timeout);
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
        oIncidentReportFacade.ClearForm();
    }

    $scope.$on('$destroy', function () {
        scope = null;
       // ionicBackdrop = null;
        oIncidentReportFacade = null;
        $scope = null;
    });

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oIncidentReportFacade.PreControlEvents(AttributeId, ControlId, $event);
    }

    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oIncidentReportFacade.PostControlEvents(AttributeId, ControlId);
    }

    $scope.ngChange_setDateTime = function (ControlId) {
        oIncidentReportFacade.ngChange_setDateTime(ControlId);
    }

    $scope.CustomNCClick = function () {
        oIncidentReportFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oIncidentReportFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oIncidentReportFacade.ObservationTabClick($compile);
    }

    $scope.NCTabClick = function () {
        oIncidentReportFacade.NCTabClick($compile);
    }

    $scope.CloseRightPanel = function () {
        oIncidentReportFacade.CloseRightPanel();
    }

    $scope.SubmitRecords = function () {
        oIncidentReportFacade.SaveDCRecords(true);
    }

    $scope.ClearReasons = function () {
        oIncidentReportFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oIncidentReportFacade.ClearComments();
    }

    $scope.ProbeTesting = function () {
        oIncidentReportFacade.ProbeTesting();
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
            oIncidentReportFacade.AttachPicture(_ImageURL);
        });
    }

    $scope.BrowsePicture = function () {
        var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
        _oOneViewCordovaCameraPlugin.BrowsePicture(function (_ImageURL) {
            var NewPath = window.OneViewSqlite.RenameImage(_ImageURL);
            oIncidentReportFacade.AttachPicture(NewPath);
        });
    }

});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function IncidentReportFacade(parm) {

    try {
        OneViewConsole.Debug("IncidentReportFacade Start", "Facade.IncidentReportFacade");

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
        var TemplateId = "483";
        var TemplateName = "Food Safety Shift Report Rev - 06 (HYG - 09)";
        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        var ServiceName = OneViewSessionStorage.Get("ServiceName");
        var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];

        //*********** basic meta datas for Cooking and blast chilling varifications

        OneViewSessionStorage.Save("TemplateId", "483");
        OneViewSessionStorage.Save("TemplateName", "Food Safety Shift Report Rev - 06 (HYG - 09)");

        var DcProfileId = 1;
        var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
        var DcPlaceName = OneViewSessionStorage.Get("DcPlaceName");
        var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
        var LoginUserName = OneViewSessionStorage.Get("LoginUserName");
        var DcId = OneViewSessionStorage.Get("DcId");
        var DeviceId = OneViewLocalStorage.Get("DeviceId");
        var DataCaptureClientGuid = "";

        var IsFirstTimeEdit = true;

        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile });
       // var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("IncidentReportFacade End", "Facade.IncidentReportFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.IncidentReportFacade", xlatService);
    }

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "IncidentReportFacade.Init");

            $scope.NewDCModel = {};
            $scope.ShiftOptions = [];

            $scope.RiskType = [];
            $scope.Source = [];
            $scope.IsBulkDishing = [];
            $scope.IsSampleNumber = [];

            $scope.ObservationList = [];
            $scope.CustomObservationList = [];
            $scope.CustomCorrectiveActionList = [];

            $scope.PreObservationList = [];
            $scope.PreCustomObservationList = [];
            $scope.PreCustomCorrectiveActionList = [];

            $scope.MultiMediaSubElements = [];
           
            _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
            _oDataCaptureBO.CorrectiveActionEventHandler = CorrectiveActionEventHandler;

            LVMultiMediaDeleteEventHandler = MultiMediaDeleteEventHandler;

            OneViewConsole.Debug("Init End", "IncidentReportFacade.Init");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.Init", xlatService);
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
            OneViewConsole.Debug("PageLoad Start", "IncidentReportFacade.PageLoad");

            var ModelIdForAutoTemperatureUpdation;
           // var ModelIdForAutoTimeUpdation;
            LoadDefaultValueMetaData();
            AutoCompleteGenerateHTML();
            Loadddl();
            _oDataCaptureBO.LoadShift();
            LoadAnswerModes();                    
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
                LoadCorrectiveActions();
                LoadMultimediaSubElements();
                LoadSource();
                IsFirstTimeEdit = false;

                SetSelectedTextBoxColor_Private('AmbientTempControlId');
                ModelIdForAutoTemperatureUpdation = 'NewDCModel.AmbientTempControlId';
            }
            else {               
                $scope.Add = 'Add';
                _oDataCaptureBO.setDefaultValue();
                SetSelectedTextBoxColor_Private('AmbientTempControlId');
                ModelIdForAutoTemperatureUpdation = 'NewDCModel.AmbientTempControlId';
            }
            _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = ModelIdForAutoTemperatureUpdation;
            _oDataCaptureBO.ModelIdForAutoTimeUpdation = '';
            _oDataCaptureBO.SetDefaultAutoTemperatureListener();

            ///AuditSummary
            //_oDataCaptureBO.ShowDCSummary();
            ShowDCSummary();
            _oSettingsBO.ShowAutoManualStatus($scope);

            new OnewViewEventListener().RegisterSelectedFieldEvent();

            OneViewConsole.Debug("PageLoad End", "IncidentReportFacade.PageLoad");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.PageLoad", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.SetDataCaptureClientGuid", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.SetSampleNumber", xlatService);
        }
    }

    this.AttachPicture = function (LocalURL) {
        try {
            OneViewConsole.Debug("AttachPicture Start", "IncidentReportFacade.AttachPicture");

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

            OneViewConsole.Debug("AttachPicture End", "IncidentReportFacade.AttachPicture");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.SetSelectedTextBoxColor", xlatService);
        }
    }

    this.SetSelectedTextBoxColor = function (ControlId) {
        try {
            OneViewConsole.Debug("SetSelectedTextBoxColor Start", "IncidentReportFacade.SetSelectedTextBoxColor");

            SetSelectedTextBoxColor_Private(ControlId);

            OneViewConsole.Debug("SetSelectedTextBoxColor End", "IncidentReportFacade.SetSelectedTextBoxColor");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.SetSelectedTextBoxColor", xlatService);
        }
    }

    var SetSelectedTextBoxColor_Private = function (ControlId) {
        try {
            OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "IncidentReportFacade.SetSelectedTextBoxColor_Private");

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
            OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "IncidentReportFacade.SetSelectedTextBoxColor_Private");
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("BindNc Start", "IncidentReportFacade.BindNc");

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

            OneViewConsole.Debug("BindNc End", "IncidentReportFacade.BindNc");
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
            OneViewConsole.Debug("GetProbeStatus Start", "IncidentReportFacade.GetProbeStatus");

            _oSettingsBO.ProbeStatus('', xlatService);

            OneViewConsole.Debug("GetProbeStatus End", "IncidentReportFacade.GetProbeStatus");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.GetProbeStatus", xlatService);
        }
    }

    this.SetAutoTemperatureListener = function (EventArg, TimeControlId) {
        try {
            OneViewConsole.Debug("SetAutoTemperatureListener Start", "IncidentReportFacade.SetAutoTemperatureListener");
            var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
            _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
            _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeControlId;

            OneViewConsole.Debug("SetAutoTemperatureListener End", "IncidentReportFacade.SetAutoTemperatureListener");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.SetAutoTemperatureListener", xlatService);
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
            OneViewConsole.Debug("SaveDCRecords Start", "IncidentReportFacade.SaveDCRecords");
           
            var ObservationList = [];
            for (var i = 0; i < $scope.ObservationList.length; i++) {
                if ($scope.ObservationList[i].selected == "selected") {
                    ObservationList.push($scope.ObservationList[i]);
                }
            }

            if (ObservationList.length > 0 || $scope.CustomObservationList.length > 0) {

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
                        $scope.MultiMediaSubElements = [];

                        $scope.ObservationRow = false;
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
                    }                  
                }
                //_oDataCaptureBO.ShowDCSummary();
                ShowDCSummary();
                SetSelectedTextBoxColor_Private('AmbientTempControlId');
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.AmbientTempControlId';
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = '';

                oSetDefaultSpinner.Stop();
            }           
            else {
                alert("MN-RQ-IRE-001 :: Please enter observation and observation type");
            }
           
            OneViewConsole.Debug("SaveDCRecords End", "IncidentReportFacade.SaveDCRecords");
        }
        catch (Excep) {           
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.SaveDCRecords", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.ShowDCSummary", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.LoadCorrectiveActions", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.LoadMultimediaSubElements", xlatService);
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

    var Loadddl = function () {
        try {
            OneViewConsole.Debug("Loadddl Start", "IncidentReportFacade.Loadddl");

            OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
            AutoCompleteCloseEvent = AutoCompleteCloseClick;
         
            var oUnitddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlUnitControlId', 'DataSourceModelName': 'Unit', 'DisplayElementModelName': 'NewDCModel.AddlUnitControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Kitchen, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'SelectedIndexChangedEventHandler': oUnitSelectedIndexChanged, 'AttributeNodeId': 485 });
            //oUnitddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Kitchen, _TableNamesEnum.OrganizationAssetsNode);
            SetDataSourceFromProfile_Unit();
          
            var oObservationTypeddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlObservationTypeControlId', 'DataSourceModelName': 'ObservationType', 'DisplayElementModelName': 'NewDCModel.AddlObservationTypeControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ObservationType, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'SelectedIndexChangedEventHandler': oObservationTypeSelectedIndexChanged, 'AttributeNodeId': 490 });
            oObservationTypeddl.SetDataSourceWithObservationType(OrganizationId, DATEntityType.RCOMaster_ObservationType, _TableNamesEnum.OrganizationAssetsNode);
         
            var oClassddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlClassControlId', 'DataSourceModelName': 'Class', 'DisplayElementModelName': 'NewDCModel.AddlClassControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Class, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 506 });
            oClassddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Class, _TableNamesEnum.OrganizationAssetsNode);

            var oSupplierddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSupplierControlId', 'DataSourceModelName': 'Suppliers', 'DisplayElementModelName': 'NewDCModel.AddlSupplierControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Supplier, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 498 });
            oSupplierddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Supplier, _TableNamesEnum.OrganizationAssetsNode);

            OneViewConsole.Debug("Loadddl End", "IncidentReportFacade.Loadddl");
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
            OneViewConsole.Debug("SetDataSourceFromProfile_Unit Start", "IncidentReportFacade.SetDataSourceFromProfile_Unit");

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

            OneViewConsole.Debug("SetDataSourceFromProfile_Unit End", "IncidentReportFacade.SetDataSourceFromProfile_Unit");
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
            OneViewConsole.Debug("oUnitSelectedIndexChanged Start", "IncidentReportFacade.oUnitSelectedIndexChanged");

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

            var oDepartmentddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDepartmentControlId', 'DataSourceModelName': 'Department', 'DisplayElementModelName': 'NewDCModel.AddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Department, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged, 'AttributeNodeId': 486 });
            oDepartmentddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Department, _TableNamesEnum.OrganizationAssetsNode);

            var oChillerddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlChillerControlId', 'DataSourceModelName': 'Chiller', 'DisplayElementModelName': 'NewDCModel.AddlChillerControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Chiller, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 521 });
            oChillerddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Chiller, _TableNamesEnum.OrganizationAssetsNode);

            var oBlastChillerddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlBlastChillerControlId', 'DataSourceModelName': 'BlastChiller', 'DisplayElementModelName': 'NewDCModel.AddlBlastChillerControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_BCChiller, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 522 });
            oBlastChillerddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_BCChiller, _TableNamesEnum.OrganizationAssetsNode);

            if (DcId == null || IsFirstTimeEdit == false) {
                oDepartmentddl.Clear();              
                oChillerddl.Clear();
                oBlastChillerddl.Clear();
                $scope['AddlLocationControlId'].Clear();
                $scope['AddlSectionControlId'].Clear();
            }

            OneViewConsole.Debug("oUnitSelectedIndexChanged End", "IncidentReportFacade.oUnitSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    var oDepartmentSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oDepartmentSelectedIndexChanged Start", "IncidentReportFacade.oDepartmentSelectedIndexChanged");

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
            
            OneViewConsole.Debug("oDepartmentSelectedIndexChanged End", "IncidentReportFacade.oDepartmentSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    var oLocationSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oLocationSelectedIndexChanged Start", "IncidentReportFacade.oLocationSelectedIndexChanged");

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

            OneViewConsole.Debug("oLocationSelectedIndexChanged End", "IncidentReportFacade.oLocationSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
        }
    }

    var oObservationTypeSelectedIndexChanged = function (EventArgs) {
        try {
            OneViewConsole.Debug("oObservationTypeSelectedIndexChanged Start", "IncidentReportFacade.oObservationTypeSelectedIndexChanged");
         
            if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                var Query = "SELECT ServerId,Name From IncidentMasterEntity WHERE IncidentTypeId = " + EventArgs.NewValue.Id;
              
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

                var IsRiskTypeRequired = false;

                if (EventArgs.NewValue.Id == 1) {                   
                    $scope.ForeignObjectIncident = true;
                    $scope.PersonalHygineAndBehaviour = false;
                    $scope.EuipmentIssue = false;
                    IsRiskTypeRequired = true;
                }
                else if (EventArgs.NewValue.Id == 2) {                   
                    $scope.ForeignObjectIncident = false;
                    $scope.PersonalHygineAndBehaviour = true;
                    $scope.EuipmentIssue = false;
                }
                else if (EventArgs.NewValue.Id == 21) {
                    $scope.ForeignObjectIncident = false;
                    $scope.PersonalHygineAndBehaviour = false;
                    $scope.EuipmentIssue = true;
                }
                else {
                    $scope.ForeignObjectIncident = false;
                    $scope.PersonalHygineAndBehaviour = false;
                    $scope.EuipmentIssue = false;
                }

                if ($scope.ObservationList.length > 0) {
                    $scope.ObservationRow = true;
                }
                else {
                    $scope.ObservationRow = false;
                }

                if (IsRiskTypeRequired == true) {
                    $scope.divRiskType = true;
                }
                else {
                    $scope.divRiskType = false;
                    $scope["chkRiskTypeControlId"].Clear();
                }
            }

            //if (DcId == null) {
            //    SetSampleNumber();
            //}
           
            OneViewConsole.Debug("oObservationTypeSelectedIndexChanged End", "IncidentReportFacade.oObservationTypeSelectedIndexChanged");
        }
        catch (Excep) {
            throw Excep;
        }
        finally {           
        }
    }

    this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
        try {

            OneViewConsole.Debug("Temperature_NgKeyUp Start", "IncidentReportFacade.Temperature_NgKeyUp");

            ////if (IsNc == true) {
            //    var ActionResponseList = EvaluateActionNCStatus(AttributeId);
            //// }
            ValidateActionNC(AttributeId, ControlId)
            if (RefreshcontrolId != '') {
                // var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                _oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
            }

            NCSelectedAttributeId = AttributeId;
            OneViewConsole.Debug("Temperature_NgKeyUp End", "IncidentReportFacade.Temperature_NgKeyUp");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.Temperature_NgKeyUp", xlatService);
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
            OneViewConsole.Debug("ValidateActionNC Start", "IncidentReportFacade.ValidateActionNC");
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
            OneViewConsole.Debug("ValidateActionNC End", "IncidentReportFacade.ValidateActionNC");
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
            OneViewConsole.Debug("CheckActionNCEvent Start", "IncidentReportFacade.CheckActionNCEvent");
            ValidateActionNC(AttributeId, ControlId);
            OneViewConsole.Debug("CheckActionNCEvent End", "IncidentReportFacade.CheckActionNCEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.CheckActionNCEvent", xlatService);
        }
        finally {
            oDataCaptureBO = null;
        }
    }

    var EvaluateActionNCStatus = function (AttributeId) {
        try {
            OneViewConsole.Debug("ShowNCStatus Start", "IncidentReportFacade.EvaluateActionNCStatus");
            var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
            return ActionResponseList;
            OneViewConsole.Debug("ShowNCStatus End", "IncidentReportFacade.EvaluateActionNCStatus");
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
            OneViewConsole.Debug("ShowNCFormAction Start", "IncidentReportFacade.ShowNCFormAction");

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



            OneViewConsole.Debug("ShowNCFormAction End", "IncidentReportFacade.ShowNCFormAction");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.ShowNCFormAction", xlatService);
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
            OneViewConsole.Debug("LoadAnswerModes Start", "IncidentReportFacade.LoadAnswerModes");

            AnswerModeNCActionEvent = OnAnswerModeSelect;

            var oRefrigeratorStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkRiskTypeControlId', 'DataSourceModelName': 'RiskType', 'DisplayElementModelName': 'NewDCModel.chkRiskTypeControlId' });
            oRefrigeratorStatus.AnswerModes(TemplateNodes, 493);

            var oChillerAvailability = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkSourceControlId', 'DataSourceModelName': 'Source', 'DisplayElementModelName': 'NewDCModel.chkSourceControlId' });
            oChillerAvailability.AnswerModes(TemplateNodes, 497);

            var oDayMarker = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkIsBulkDishingControlId', 'DataSourceModelName': 'IsBulkDishing', 'DisplayElementModelName': 'NewDCModel.chkIsBulkDishingControlId' });
            oDayMarker.AnswerModes(TemplateNodes, 507);

            var oIsSampleNumber = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkIsSampleNumberControlId', 'DataSourceModelName': 'IsSampleNumber', 'DisplayElementModelName': 'NewDCModel.chkIsSampleNumberControlId' });
            oIsSampleNumber.AnswerModes(TemplateNodes, 526);

            var oCorrectiveAction = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCoorectiveAction', 'DataSourceModelName': 'CorrectiveAction', 'DisplayElementModelName': 'NewDCModel.chkCoorectiveAction' });
            $scope['CorrectiveAction'] = [];
            $scope['CorrectiveAction'].push({ Id: 1, Name: "Yes", ControlId: "chkCoorectiveAction", 'ColourIndex': 'green', Selected: false });
            $scope['CorrectiveAction'].push({ Id: 2, Name: "NO", ControlId: "chkCoorectiveAction", 'ColourIndex': 'red', Selected: true });
            oCorrectiveAction.Set({ Id: 2, Name: "NO", ControlId: "chkCoorectiveAction", 'ColourIndex': 'red' ,Selected:true});

            OneViewConsole.Debug("LoadAnswerModes End", "IncidentReportFacade.LoadAnswerModes");
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
            OneViewConsole.Debug("CreateDynamicElements Start", "IncidentReportFacade.CreateDynamicElements");

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

            OneViewConsole.Debug("CreateDynamicElements End", "IncidentReportFacade.CreateDynamicElements");
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
            OneViewConsole.Debug("Temperature_NgKeyUp Start", "IncidentReportFacade.Temperature_NgKeyUp");

            if (IsNc == true) {
                ShowNCStatus(AttributeId, ControlId);
            }

            var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
            oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.Temperature_NgKeyUp", xlatService);
        }
        finally {
            oDataCaptureBO = null;
        }
    }

    var ShowNCStatusOLD = function (AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("ShowNCStatus Start", "IncidentReportFacade.ShowNCStatus");

            var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
            NormalizeNCEntityListData(DCNCMappingListData);

            OneViewConsole.Debug("ShowNCStatus End", "IncidentReportFacade.ShowNCStatus");
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
            OneViewConsole.Debug("ClearForm Start", "IncidentReportFacade.ClearForm");

            $scope.ObservationList = [];
            $scope.CustomObservationList = [];
            $scope.CustomCorrectiveActionList = [];
            $scope.MultiMediaSubElements = [];

            $scope.ObservationRow = false;
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
            }

            OneViewConsole.Debug("ClearForm End", "IncidentReportFacade.ClearForm");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.ClearForm", xlatService);
        }
    }

    var IsNCthereOrNot = function (RuleId, isNC) {
        try {
            OneViewConsole.Debug("IsNCthereOrNot Start", "IncidentReportFacade.IsNCthereOrNot");

            var ExistStatus = false;
            for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                    _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                    _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                    ExistStatus = true;
                    break;
                }
            }

            OneViewConsole.Debug("IsNCthereOrNot End", "IncidentReportFacade.IsNCthereOrNot");
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
            OneViewConsole.Debug("NormalizeNCEntityListData Start", "IncidentReportFacade.NormalizeNCEntityListData");

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

            OneViewConsole.Debug("NormalizeNCEntityListData End", "IncidentReportFacade.NormalizeNCEntityListData");
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
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.PreControlEvents", xlatService);
        }
    }

    this.PostControlEvents = function (AttributeId, ControlId) {
        try {

            _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.PostControlEvents", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.ngChange_setDateTime", xlatService);
        }
    }

    this.NCClick = function ($compile) {

        try {
            _oDataCaptureBO.LoadNCCommentsHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.NgKeyUp", xlatService);
        }
        finally {
        }
    }

    this.NCTabClick = function ($compile) {

        try {
            _oDataCaptureBO.AppendNCHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.AppendNCHtml", xlatService);
        }
        finally {
        }
    }

    this.ObservationTabClick = function ($compile) {

        try {
            _oDataCaptureBO.AppendObservationHtml($compile);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.AppendObservationHtml", xlatService);
        }
        finally {
        }
    }

    this.CustomNCClick = function () {

        try {
            _oDataCaptureBO.CustomNCClick();
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.CustomNCClick", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.CustomNCClick", xlatService);
        }
    }

    this.ClearReasons = function () {
        try {
            $scope.NewDCModel["NCComments"] = '';
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.ClearReasons", xlatService);
        }
    }

    this.ClearComments = function () {
        try {
            $scope.NewDCModel["ObservationComments"] = '';
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.ClearComments", xlatService);
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
            oOneViewExceptionHandler.Catch(Excep, "IncidentReportFacade.ProbeTesting", xlatService);
        }
    }

    var LoadSource = function () {
        try {
            OneViewConsole.Debug("LoadSource Start", "IncidentReportFacade.LoadSource");

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

            OneViewConsole.Debug("LoadSource End", "IncidentReportFacade.LoadSource");
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
            OneViewConsole.Debug("MultiMediaDeleteEventHandler Start", "IncidentReportFacade.MultiMediaDeleteEventHandler");

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

            OneViewConsole.Debug("MultiMediaDeleteEventHandler End", "IncidentReportFacade.MultiMediaDeleteEventHandler");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Facade", "IncidentReportFacade.MultiMediaDeleteEventHandler", Excep);
        }
    }
}


