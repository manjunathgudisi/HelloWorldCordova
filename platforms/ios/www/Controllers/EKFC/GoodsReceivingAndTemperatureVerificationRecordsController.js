
var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;
var AnswerModeEvent;

//var NCCustomRuleMetaData = {
//    55: { NCRuleId: 1001 },
//    56: { NCRuleId: 1002 },
//    57: { NCRuleId: 1003 },
//    58: { NCRuleId: 1004 },
//    59: { NCRuleId: 1005 },
//    63: { NCRuleId: 1006 },
//    64: { NCRuleId: 1007 }
//};

var CommentsResult = {};
var ObservationResult = {};
var NCSelectedAttributeId = 0;
var NCCurrentTabId = 1;
var IsFirstTimeEdit = false;
    
MyApp.controller('GoodsReceivingAndTemperatureVerificationRecordsController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
	//oSetDefaultSpinner.Start();
        //  xlatService.setCurrentPage('GoodsReceivingAndTemperatureVerificationRecords');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);

        var PageName = "";
        if (OneViewSessionStorage.Get("DcPlaceId") == 3) {
            PageName = xlatService.xlat('PageTitle');
        }
        else {
            PageName = xlatService.xlat('PageTitleUnit2');
        }
        document.getElementById('PageTitle').innerHTML = PageName;
    scope = $scope;
    oSnapRemote = snapRemote;

    var oGoodsReceivingAndTemperatureVerificationRecordsFacade = new GoodsReceivingAndTemperatureVerificationRecordsFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', '$timeout': $timeout, 'compile': $compile });


    oGoodsReceivingAndTemperatureVerificationRecordsFacade.Init();
    oGoodsReceivingAndTemperatureVerificationRecordsFacade.PageLoad();
	//oSetDefaultSpinner.Stop();
   

        //$scope.$on('$viewContentLoaded', function () {
        //    alert('monitor viewContentLoaded 1234');
        //    AutoCompleteDestroyHTML();
        //    AutoCompleteGenerateHTML();
        //});

    $scope.$on('$destroy', function () {
        var oOneViewSidePanel = new OneViewSidePanel();
        oOneViewSidePanel.Clear();
        oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = null;

        CommentsResult = {};
        ObservationResult = {};
        NCSelectedAttributeId = 0;      
        NCCurrentTabId = 1;

        IsFirstTimeEdit = false;
        
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.Destroy();
        NCActionProfileMetaData = undefined;

        xlatService.RemoveCurrentPageMetadata(currentPage);
    });
   
    $scope.GetProbeStatus = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.GetProbeStatus();
    };

    $scope.AddRecords = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.SaveDCRecords();       
    };
    
    $scope.SetSelectedTextBoxColor = function (ControlId) {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.SetSelectedTextBoxColor(ControlId);
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
            navigator.notification.alert(xlatService.xlat('No_Records_Available'), ['OK'], "");
           // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('No_Records_Available'));
        }
    };

    	//$scope.activate = function(option){
    	//    alert(option.Name);
    	//};  

    $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.SetAutoTemperatureListener(EventArg, TimeModelId);      
    };

    //$scope.GoodsType =
    //   {
    //       "Chilled": false,
    //       "Frozen": false,
    //       "Dry": false
    //   };

    //$scope.FrozenType = {
    //    "Hard": false,
    //    "soft": false,
    //    "thawing": false
    //}


    $scope.ShowNCStatus = function (AttributeId, ControlId) {
        $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
    }
    //$scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
    //    oGoodsReceivingAndTemperatureVerificationRecordsFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc);
    //}
    var lastTimeOutId = null;
    $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {

        $scope.DisableSave = true;
        $scope.DisableSaveSubmit = true;
        if (lastTimeOutId != null)
            $timeout.cancel(lastTimeOutId);
        lastTimeOutId = $timeout(function () { oGoodsReceivingAndTemperatureVerificationRecordsFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc); }, Timeout);
    }

    $scope.OnDate_Change = function (SelectedControlId, IsNc) {
        //var TimeoutForDate = 1000;
        //if (lastTimeOutId != null)
        //    $timeout.cancel(lastTimeOutId);
        //lastTimeOutId = $timeout(function () { oGoodsReceivingAndTemperatureVerificationRecordsFacade.OnDate_Change(SelectedControlId, IsNc); }, TimeoutForDate);
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.OnDate_Change(SelectedControlId, IsNc);
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
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.ClearForm();
    }
    
    $scope.CloseRightPanel = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.CloseRightPanel();
    }

    $scope.Attngkeyup = function () {
        //NCSelectedAttributeId = 0;     
    }

    $scope.CustomNCClick = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.CustomNCClick();
    }

    $scope.NCClick = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.NCClick($compile);
    }

    $scope.ObservationTabClick = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.ObservationTabClick($compile);        
    }

    $scope.NCTabClick = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.NCTabClick($compile);     
    }

    $scope.PreControlEvents = function (AttributeId, ControlId, $event) {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.PreControlEvents(AttributeId, ControlId, $event);
    }
    $scope.PostControlEvents = function (AttributeId, ControlId) {

        oGoodsReceivingAndTemperatureVerificationRecordsFacade.PostControlEvents(AttributeId, ControlId);
    }
    $scope.ngChange_setDateTime = function (ControlId) {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.ngChange_setDateTime(ControlId);
    }

    $scope.SubmitRecords = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.SaveDCRecords(true);
    }

    $scope.ClearReasons = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.ClearReasons();
    }

    $scope.ClearComments = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.ClearComments();
    }

    $scope.ProbeTesting = function () {
        oGoodsReceivingAndTemperatureVerificationRecordsFacade.ProbeTesting();
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

});


//{ 'scope': $scope, 'document': $document, 'state': $state, 'xlatService': xlatService, 'toaster': toaster, 'SpinService': SpinService }
function GoodsReceivingAndTemperatureVerificationRecordsFacade(parm) {

    try {
        OneViewConsole.Debug("GoodsReceivingAndTemperatureVerificationRecordsFacade Start", "Facade.GoodsReceivingAndTemperatureVerificationRecordsFacade");

        var MyInstance = this;
        //$scope, $document, $state, xlatService, toaster, SpinService
        var $scope = parm.scope;
        var $document = parm.document;
        var $location = parm.Mylocation;
       // var $state = parm.state;
        var xlatService = parm.xlatService;
        var $compile = parm.compile;
        //var toaster = parm.toaster;
        // var SpinService = parm.SpinService;
        var $timeout = parm.$timeout
        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        var TemplateId = OneViewSessionStorage.Get("TemplateId");
        var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];

        //*********** basic meta datas for Cooking and blast chilling varifications

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
        //var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("GoodsReceivingAndTemperatureVerificationRecordsFacade End", "Facade.GoodsReceivingAndTemperatureVerificationRecordsFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.GoodsReceivingAndTemperatureVerificationRecordsFacade", xlatService);
    }

        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.Init");

                    $scope.NewDCModel = {};
                    // $scope.HI = [{ "Id": 1, "Name": 'Yes' }, { "Id": 2, "Name": 'No' }];
                    $scope.YesNo = [];
                    $scope.PestSign = [];
                    $scope.PackagingIntegrity = [];
                    $scope.TruckStripCurtains = [];
                    $scope.TruckCleanliness = [];
                    $scope.VehicleApprovalTag = [];
                    $scope.DeliveryStaffHairBeardNets = [];
                    $scope.DeliveryStaffUniformCondition = [];
                    $scope.ShiftOptions = [];
                    $scope.GoodsType = [];
                    $scope.FrozenType = [];
                    $scope.WorkingStatus = [];
                    $scope.RefStatus = [];
                    $scope.ProductStatus = [];
                    $scope.NCOptions = [];
                    $scope.ProductionDateMode = [];
                    $scope.ExpiryDateMode = [];
                   
                    $scope.GoodsTypeId = 0;

                    CommentsResult = {};
                    ObservationResult = {};

                    _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;
                    _oDataCaptureBO.Init();

                OneViewConsole.Debug("Init End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.Init", xlatService);
            }
        }
        
        this.Destroy = function () {
            _oDataCaptureBO.TemperatureNgKeyUpEventHandler = null;
            _oDataCaptureBO.Destroy();
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
                OneViewConsole.Debug("PageLoad Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.PageLoad");

                 LoadDefaultValueMetaData();
                    AutoCompleteGenerateHTML();
                    Loadddl();
                    _oDataCaptureBO.LoadShift();
                    //_oDataCaptureBO.LoadNCOptions();
                    LoadAnswerModes();
                    _oDataCaptureBO.ClearControls();
                    _oDataCaptureBO.SetMandatoryMetaData();
                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.ATSurfaceTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeControlId';
                // _oNCComponent.Init();
                    _oCPActionNCComponent.Init();

                    SetSelectedTextBoxColor_Private('ATSurfaceTempControlId');

                   // _oNCComponent.BindNCSummaryHandler = BindNc;
                    _oDataCaptureBO.SetDefaultAutoTemperatureListener();
                    if (DcId != null) {

                        IsFirstTimeEdit = true;
                        $scope.Add = 'Save';
                        _oDataCaptureBO.GetNCComments(DcId);
                        _oDataCaptureBO.LoadEditPage(DcId, $scope);                       
                       
                        if ($scope['AddlPurchaseOrderNoControlId'].GetSelectedText() != "" && $scope['AddlProductControlId'].GetSelectedText() != "") {
                            var Item = $scope['AddlProductControlId'].GetSelectedText().split('-');
                            SupplierList = Get_Supplier_PurchaserOrderRCODAO($scope['AddlPurchaseOrderNoControlId'].GetSelectedText(), Item[0], Item[1]);
                            $scope['Suppliers'] = SupplierList;
                        }

                        IsFirstTimeEdit = false;
                    }
                    else {
                        $scope.Add = 'Add';
                        _oDataCaptureBO.setDefaultValue();                       
                    }

                    ///AuditSummary
                    _oDataCaptureBO.ShowDCSummary();
                    _oSettingsBO.ShowAutoManualStatus($scope);
                    DefaultValueBandSelection();
                    new OnewViewEventListener().RegisterSelectedFieldEvent();
                  
                 
                OneViewConsole.Debug("PageLoad End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.PageLoad", xlatService);
            }
        }

        var DefaultValueBandSelection = function () {
            try {
                OneViewConsole.Debug("DefaultValueBandSelection Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.DefaultValueBandSelection");

                var DMVechicleTag = scope["chkVehicleApprovalTag"].GetSelectedValue();
                if ((DMVechicleTag != "") && (DMVechicleTag != undefined)) {
                    if (DMVechicleTag == "1") {
                        scope.ApprovalTagNo = true;
                    }
                    else {
                        scope.ApprovalTagNo = false;
                    }
                }

                OneViewConsole.Debug("DefaultValueBandSelection End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.DefaultValueBandSelection");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.DefaultValueBandSelection", xlatService);
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetSelectedTextBoxColor", xlatService);
            }
        }

        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'ATSurfaceTempControlId') {
                    $scope.ATSurfaceTempControlId = 'highlight';
                    $scope.ATTruckTempControlId = '';
                }
                else if (ControlId == 'ATTruckTempControlId') {
                    $scope.ATSurfaceTempControlId = '';
                    $scope.ATTruckTempControlId = 'highlight';
                }

                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }

        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.BindNc");

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

                OneViewConsole.Debug("BindNc End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.BindNc");
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
                OneViewConsole.Debug("GetProbeStatus Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.GetProbeStatus", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
            try {
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeModelId;
               
                OneViewConsole.Debug("SetAutoTemperatureListener End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SaveDCRecords");

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

                    _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = 'NewDCModel.ATSurfaceTempControlId';
                    _oDataCaptureBO.ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeControlId';
                    SetSelectedTextBoxColor_Private('ATSurfaceTempControlId');

                    DefaultValueBandSelection();

                OneViewConsole.Debug("SaveDCRecords End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.SaveDCRecords", xlatService);
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
               // alert('Excep OneViewAdvAutoCompleteTest :' + Excep + JSON.stringify(Excep))
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
                OneViewConsole.Debug("Loadddl Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.Loadddl");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;

                var oPurchaseOrder = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlPurchaseOrderNoControlId', 'DataSourceModelName': 'PurchaseOrderNo', 'DisplayElementModelName': 'NewDCModel.AddlPurchaseOrderNoControlId', 'DATEntityTypeId': DATEntityType.RCO_PurchaseOrder, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': 427, 'SelectedIndexChangedEventHandler': oPurchaseOrderSelectedIndexChanged_ProductLoad });
                LoadPurchaseOrderDDL();

                var oProductddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlProductControlId', 'DataSourceModelName': 'Products', 'DisplayElementModelName': 'NewDCModel.AddlProductControlId', 'DATEntityTypeId': DATEntityType.RCO_PurchaseOrder, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 48, 'SelectedIndexChangedEventHandler': oProductSelectedIndexChanged_SupplierLoad });
              
                var oSupplierddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSupplierControlId', 'DataSourceModelName': 'Suppliers', 'DisplayElementModelName': 'NewDCModel.AddlSupplierControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Supplier, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 45 });
             
                var oReceivingUnitddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlReceivingUnitControlId', 'DataSourceModelName': 'ReceivingUnit', 'DisplayElementModelName': 'NewDCModel.AddlReceivingUnitControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_ReceivingUnit, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 534, 'IsDynamicElementCreationEnabled': false });
                oReceivingUnitddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_ReceivingUnit, _TableNamesEnum.OrganizationAssetsNode);

                OneViewConsole.Debug("Loadddl End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.Loadddl");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oProductddl = null;
                oSupplierddl = null;
            }
        }

        var LoadPurchaseOrderDDL = function () {
            try {
                OneViewConsole.Debug("SetAutoCompleteData Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.LoadPurchaseOrder");
                var PurchaseOrder = GetPurchaseOrderDAO();
                MyInstance.SetAutoCompleteData('PurchaseOrderNo', PurchaseOrder);
                OneViewConsole.Debug("SetAutoCompleteData End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.LoadPurchaseOrder");
            }
            catch (Excep) {
                throw Excep;
            }
        }

        var GetPurchaseOrderDAO = function () {
            try {
                OneViewConsole.Debug("GetAllChildsWithTypeDDLWorkOrder start", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var ddlResult = [];


                //var Query = "SELECT Distinct(Rco_PurchaserOrder.Name) AS Name, OrgAstMpng.ServerId AS ServerId FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                //           "INNER JOIN RcoMasterEntity as Rco_PurchaserOrder ON OrgAstMpng.RCOMasterId = Rco_PurchaserOrder.ServerId AND OrgAstMpng.RCOTypeId=Rco_PurchaserOrder.Type AND OrgAstMpng.OrganizationAssetsNodeId = " + DcPlaceId + " AND OrgAstMpng.RCOTypeId = '" + DATEntityType.RCO_PurchaseOrder + "'";


                var Query = "SELECT Distinct(Rco_PurchaserOrder.Name) AS Name FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                            "INNER JOIN RcoMasterEntity as Rco_PurchaserOrder ON OrgAstMpng.RCOMasterId = Rco_PurchaserOrder.ServerId AND OrgAstMpng.RCOTypeId=Rco_PurchaserOrder.Type AND OrgAstMpng.OrganizationAssetsNodeId = " + DcPlaceId + " AND OrgAstMpng.RCOTypeId = '" + DATEntityType.RCO_PurchaseOrder + "'";


             
                //alert(Query);

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                Nodes = JSON.parse(Nodes);

                //alert(Nodes.length + JSON.stringify(Nodes));

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var Id;
                var IsDynamicElement = false;

                for (i = 0; i < Nodes.length; i++) {
                    //if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                    //    Id = Nodes[i].ClientGuid;
                    //    IsDynamicElement = true;
                    //}
                    //else
                    //    Id = Nodes[i].ServerId;

                    Id =Nodes[i].Name
                    ddlResult.push({
                        "Id": Id,
                        "Name": Nodes[i].Name,
                        "IsDynamicElement": IsDynamicElement
                    });
                }

                OneViewConsole.Debug("GetAllChildsWithTypeDDL end", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                return ddlResult;
            }
            catch (Excep) {
                //  alert('GetPurchaseOrderDAO Excep 11 ' + Excep);
                //  alert('GetPurchaseOrderDAO Excep 12 ' + JSON.stringify(Excep));
                throw Excep;
            }
        }

        var oPurchaseOrderSelectedIndexChanged_ProductLoad = function (EventArgs) {
            try {
                //alert('EventArgs :' + JSON.stringify(EventArgs));

                OneViewConsole.Debug("SetAutoCompleteData Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.LoadPurchaseOrder");
                var ProductList = [];
                if (EventArgs.NewValue.Name != undefined && EventArgs.NewValue.Name != '') {
                    ProductList = Get_Product_PurchaserOrderRCODAO(EventArgs.NewValue.Name);
                }
                //alert('ProductList :' + JSON.stringify(ProductList));
                //alert("ProductLoad : " + IsFirstTimeEdit);
                if (DcId == null || IsFirstTimeEdit == false) {
                    ClearValue('NewDCModel.AddlProductControlId');                    
                }
                MyInstance.SetAutoCompleteData('Products', ProductList);
                oProductSelectedIndexChanged_SupplierLoad({ "NewValue": { "Id": $scope['AddlPurchaseOrderNoControlId'].GetSelectedText(), "Name": $scope['AddlPurchaseOrderNoControlId'].GetSelectedText() } });
                OneViewConsole.Debug("SetAutoCompleteData End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.LoadPurchaseOrder");
            }
            catch (Excep) {
               // alert('oPurchaseOrderSelectedIndexChanged_ProductLoad Excep 11 ' + Excep);
               // alert('oPurchaseOrderSelectedIndexChanged_ProductLoad Excep 12 ' + JSON.stringify(Excep));
                throw Excep;
            }
        }
        var Get_Product_PurchaserOrderRCODAO = function (PurchaseOrderNo) {
            try {
                OneViewConsole.Debug("GetAllChildsWithTypeDDLWorkOrder start", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var ddlResult = [];


              
                //var Query = "SELECT Distinct(Rco_PurchaserOrder.Column5 || '-' || Rco_PurchaserOrder.Column6) AS Name, OrgAstMpng.ServerId AS ServerId FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                //               "INNER JOIN RcoMasterEntity as Rco_PurchaserOrder ON OrgAstMpng.RCOMasterId = Rco_PurchaserOrder.ServerId AND OrgAstMpng.RCOTypeId=Rco_PurchaserOrder.Type AND Rco_PurchaserOrder.Name =" + PurchaseOrderNo + " AND OrgAstMpng.OrganizationAssetsNodeId = " + DcPlaceId + " AND OrgAstMpng.RCOTypeId = '" + DATEntityType.RCO_PurchaseOrder + "'";

                //Column5 : Product Code
                //Column6 : Product Name
                var Query = "SELECT Distinct(Rco_PurchaserOrder.Column5 || '-' || Rco_PurchaserOrder.Column6) AS Name FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                             "INNER JOIN RcoMasterEntity as Rco_PurchaserOrder ON OrgAstMpng.RCOMasterId = Rco_PurchaserOrder.ServerId AND OrgAstMpng.RCOTypeId=Rco_PurchaserOrder.Type AND Rco_PurchaserOrder.Name ='" + PurchaseOrderNo + "' AND OrgAstMpng.OrganizationAssetsNodeId = " + DcPlaceId + " AND OrgAstMpng.RCOTypeId = '" + DATEntityType.RCO_PurchaseOrder + "'";


                // alert(Query);

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                Nodes = JSON.parse(Nodes);

                //alert(Nodes.length + JSON.stringify(Nodes));

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var Id;
                var IsDynamicElement = false;

                for (i = 0; i < Nodes.length; i++) {
                    //if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                    //    Id = Nodes[i].ClientGuid;
                    //    IsDynamicElement = true;
                    //}
                    //else
                    //    Id = Nodes[i].ServerId;

                    Id = (Nodes[i].Name).split('-')[0];
                    ddlResult.push({
                        "Id": Id,
                        "Name": Nodes[i].Name,
                        "IsDynamicElement": IsDynamicElement
                    });
                }

                OneViewConsole.Debug("GetAllChildsWithTypeDDL end", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                return ddlResult;
            }
            catch (Excep) {
                //alert('Get_Product_PurchaserOrderRCODAO Excep 11 ' + Excep);
                //alert('Get_Product_PurchaserOrderRCODAO Excep 12 ' + JSON.stringify(Excep));
                throw Excep;
            }
        }

        var ClearValue = function (DisplayElementModelName) {
            try {
                // $scope[DisplayElementModelName] = '';
                var res = DisplayElementModelName.split('.');
                var _oddl = $scope[res[1]];
                _oddl.Clear();
            }
            catch (Excep) {
                 //alert('ClearValue Excep 11 ' + Excep);
                 //alert('ClearValue Excep 12 ' + JSON.stringify(Excep));
                throw Excep;
            }
        }

        var oProductSelectedIndexChanged_SupplierLoad = function (EventArgs) {
            try {
                //alert("oProductSelectedIndexChanged_SupplierLoad");
                OneViewConsole.Debug("SetAutoCompleteData Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.LoadPurchaseOrder");
                //alert('EventArgs :' + JSON.stringify(EventArgs));
                //alert($scope['AddlPurchaseOrderNoControlId'].GetSelectedText());
                var SupplierList = [];
                if (EventArgs.NewValue.Id != undefined && EventArgs.NewValue.Id != '') {
                    var Item = (EventArgs.NewValue.Name).split('-');
                    // alert(Item[0] + "," + Item[1]);
                    if ($scope['AddlPurchaseOrderNoControlId'].GetSelectedText() != "") {
                        SupplierList = Get_Supplier_PurchaserOrderRCODAO($scope['AddlPurchaseOrderNoControlId'].GetSelectedText(), Item[0], Item[1]);
                    }
                }
                //alert('SupplierList :' + JSON.stringify(SupplierList));
                //alert("SupplierLoad : " +IsFirstTimeEdit);
                if (DcId == null || IsFirstTimeEdit == false) {
                    ClearValue('NewDCModel.AddlSupplierControlId');                    
                }

                MyInstance.SetAutoCompleteData('Suppliers', SupplierList);

                OneViewConsole.Debug("SetAutoCompleteData End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.LoadPurchaseOrder");
            }
            catch (Excep) {
                //alert('oProductSelectedIndexChanged_SupplierLoad Excep 11 ' + Excep);
                //alert('oProductSelectedIndexChanged_SupplierLoad Excep 12 ' + JSON.stringify(Excep));
                throw Excep;
            }
        }

        var Get_Supplier_PurchaserOrderRCODAO = function (PurchaseOrderNo, ItemCode, ItemName) {
            try {
                OneViewConsole.Debug("GetAllChildsWithTypeDDLWorkOrder start", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var ddlResult = [];


               // var Query = "SELECT Distinct(Rco_PurchaserOrder.Column3 || '-' || Rco_PurchaserOrder.Column4) AS Name, OrgAstMpng.ServerId AS ServerId FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                 //           "INNER JOIN RcoMasterEntity as Rco_PurchaserOrder ON OrgAstMpng.RCOMasterId = Rco_PurchaserOrder.ServerId AND OrgAstMpng.RCOTypeId=Rco_PurchaserOrder.Type AND Rco_PurchaserOrder.Name =" + PurchaseOrderNo + " AND OrgAstMpng.OrganizationAssetsNodeId = " + DcPlaceId + " AND OrgAstMpng.RCOTypeId = '" + DATEntityType.RCO_PurchaseOrder + "'";

                var Query = "SELECT Distinct(Rco_PurchaserOrder.Column3 || '-' || Rco_PurchaserOrder.Column4) AS Name FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                           "INNER JOIN RcoMasterEntity as Rco_PurchaserOrder ON OrgAstMpng.RCOMasterId = Rco_PurchaserOrder.ServerId AND OrgAstMpng.RCOTypeId=Rco_PurchaserOrder.Type AND Rco_PurchaserOrder.Name ='" + PurchaseOrderNo + "' AND Rco_PurchaserOrder.Column5= '" + ItemCode + "'  AND Rco_PurchaserOrder.Column6= '" + ItemName + "' AND OrgAstMpng.OrganizationAssetsNodeId = " + DcPlaceId + " AND OrgAstMpng.RCOTypeId = '" + DATEntityType.RCO_PurchaseOrder + "'";


                //alert(Query);

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                Nodes = JSON.parse(Nodes);

                //alert(Nodes.length);

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var Id;
                var IsDynamicElement = false;

                for (i = 0; i < Nodes.length; i++) {
                    //if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                    //    Id = Nodes[i].ClientGuid;
                    //    IsDynamicElement = true;
                    //}
                    //else
                    //    Id = Nodes[i].ServerId;

                    Id = (Nodes[i].Name).split('-')[0]; // supplier code

                    ddlResult.push({
                        "Id": Id,
                        "Name": Nodes[i].Name,
                        "IsDynamicElement": IsDynamicElement
                    });
                }

                OneViewConsole.Debug("GetAllChildsWithTypeDDL end", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                return ddlResult;
            }
            catch (Excep) {
              //  alert('Get_Supplier_PurchaserOrderRCODAO Excep 11 ' + Excep);
              //  alert('Get_Supplier_PurchaserOrderRCODAO Excep 12 ' + JSON.stringify(Excep));
                throw Excep;
            }
        }

        this.SetAutoCompleteData = function (DataSourceModelName, result) {
            try {
                OneViewConsole.Debug("SetAutoCompleteData Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetAutoCompleteData");


                $scope[DataSourceModelName] = [];
                $scope[DataSourceModelName] = result;

                OneViewConsole.Debug("SetAutoCompleteData End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetAutoCompleteData");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "GoodsReceivingAndTemperatureVerificationRecordsFacade.SetAutoCompleteData", Excep);
            }
        }

        var OnAnswerModeSelect = function (option) {
            try {

                $scope.DisableSave = true;

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
                OneViewConsole.Debug("LoadAnswerModes Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                    var oPestSign = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkPestSignToggle', 'DataSourceModelName': 'PestSign', 'DisplayElementModelName': 'NewDCModel.chkPestSignToggle' });
                    oPestSign.AnswerModes(TemplateNodes, 63);

                    var oPackagingIntegrity = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkPackagingIntegrity', 'DataSourceModelName': 'PackagingIntegrity', 'DisplayElementModelName': 'NewDCModel.chkPackagingIntegrity' });
                    oPackagingIntegrity.AnswerModes(TemplateNodes, 64);

                    var oTruckStripCurtains = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkTruckStripCurtains', 'DataSourceModelName': 'TruckStripCurtains', 'DisplayElementModelName': 'NewDCModel.chkTruckStripCurtains' });
                    oTruckStripCurtains.AnswerModes(TemplateNodes, 55);

                    var oTruckCleanliness = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkTruckCleanliness', 'DataSourceModelName': 'TruckCleanliness', 'DisplayElementModelName': 'NewDCModel.chkTruckCleanliness' });
                    oTruckCleanliness.AnswerModes(TemplateNodes, 56);

                    var oVehicleApprovalTag = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkVehicleApprovalTag', 'DataSourceModelName': 'VehicleApprovalTag', 'DisplayElementModelName': 'NewDCModel.chkVehicleApprovalTag' });
                    oVehicleApprovalTag.AnswerModes(TemplateNodes, 57);

                    var oDeliveryStaffHairBeardNets = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkDeliveryStaffHairBeardNets', 'DataSourceModelName': 'DeliveryStaffHairBeardNets', 'DisplayElementModelName': 'NewDCModel.chkDeliveryStaffHairBeardNets' });
                    oDeliveryStaffHairBeardNets.AnswerModes(TemplateNodes, 58);

                    var oDeliveryStaffUniformCondition = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkDeliveryStaffUniformCondition', 'DataSourceModelName': 'DeliveryStaffUniformCondition', 'DisplayElementModelName': 'NewDCModel.chkDeliveryStaffUniformCondition' });
                    oDeliveryStaffUniformCondition.AnswerModes(TemplateNodes, 59);

                    var oGoodsType = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkGoodsType', 'DataSourceModelName': 'GoodsType', 'DisplayElementModelName': 'NewDCModel.chkGoodsType' });
                    oGoodsType.AnswerModes(TemplateNodes, 47);

                    var oFrozenType = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkFrozenType', 'DataSourceModelName': 'FrozenType', 'DisplayElementModelName': 'NewDCModel.chkFrozenType' });
                    oFrozenType.AnswerModes(TemplateNodes, 51);

                    var oRefStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkRefStatus', 'DataSourceModelName': 'WorkingStatus', 'DisplayElementModelName': 'NewDCModel.chkRefStatus' });
                    oRefStatus.AnswerModes(TemplateNodes, 479);

                    var oRefStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkRefrigeratorType', 'DataSourceModelName': 'RefStatus', 'DisplayElementModelName': 'NewDCModel.chkRefrigeratorType' });
                    oRefStatus.AnswerModes(TemplateNodes, 514);

                    var oProductStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkProductStatus', 'DataSourceModelName': 'ProductStatus', 'DisplayElementModelName': 'NewDCModel.chkProductStatus' });
                    oProductStatus.AnswerModes(TemplateNodes, 481);

                    var oNCOptions = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                    oNCOptions.LoadNCOptions();

                    var oRefStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkProductionDateMode', 'DataSourceModelName': 'ProductionDateMode', 'DisplayElementModelName': 'NewDCModel.chkProductionDateMode' });
                    oRefStatus.AnswerModes(TemplateNodes, 515);

                    var oRefStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkExpiryDateMode', 'DataSourceModelName': 'ExpiryDateMode', 'DisplayElementModelName': 'NewDCModel.chkExpiryDateMode' });
                    oRefStatus.AnswerModes(TemplateNodes, 517);

               OneViewConsole.Debug("LoadAnswerModes End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.LoadAnswerModes");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oPestSign = null;
                oPackagingIntegrity = null;
                oTruckStripCurtains = null;
                oTruckCleanliness = null;
                oVehicleApprovalTag = null;
                oDeliveryStaffHairBeardNets = null;
                oDeliveryStaffUniformCondition = null;
                oGoodsType = null;
                oFrozenType = null;
            }
        }

        var CreateDynamicElements = function (_DcResultDetailsEntityLst) {
            try {
                OneViewConsole.Debug("CreateDynamicElements Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.CreateDynamicElements");

                    var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");
                    for (var i = 0; i < _DcResultDetailsEntityLst.length; i++) {
                        if (_DcResultDetailsEntityLst[i].IsDynamicAnswer == 'true') {
                            var ParentNodeId = DCPlaceNodeId;
                            var ParentDbElementType = DATEntityType.RCOMaster_Kitchen;
                            var ParentDbElementId = "0";
                            //add into Maaster and node

                            var Response;
                            var _oDynamicElementBO = new DynamicElementBO();

                            
                            if (_DcResultDetailsEntityLst[i].AttributeNodeId == 427) { //Purchase order no.
                               // alert('Purchase order no.');
                                Response = { 'NodeClientGuid':0};
                            }

                            else if (_DcResultDetailsEntityLst[i].AttributeNodeId == 45) { //Supplier
                               // alert('Supplier');
                                Response = { 'NodeClientGuid': 0 };
                            }

                            else if (_DcResultDetailsEntityLst[i].AttributeNodeId == 48)//for product
                            {
                               // alert('Product');
                                Response = { 'NodeClientGuid': 0 };
                                //Response = _oDynamicElementBO.AddDynamicOrder(_DcResultDetailsEntityLst[i], ParentNodeId, ParentDbElementType, ParentDbElementId, LabelId, DATEntityType.RCO_WorkOrder);
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
                            }
                          
                            //Update Answer with newly created node
                            _DcResultDetailsEntityLst[i].Answer = Response.NodeClientGuid;
                        }
                    }

                OneViewConsole.Debug("CreateDynamicElements End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.CreateDynamicElements");
            }

            catch (Excep) {
                //alert(Excep);
                //alert(JSON.stringify(Excep));
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
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.Temperature_NgKeyUp");

                if (IsNc == true) {
                    var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                    oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
                    ShowNCStatus(AttributeId, ControlId);

                    if (ControlId == 'ATSurfaceTempControlId')
                        CheckGoodstypeNC(ControlId);
                }             
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
            try {
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.Temperature_NgKeyUp");

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
                                _oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
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
                OneViewConsole.Debug("Temperature_NgKeyUp End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var ValidateActionNC = function (AttributeId, ControlId) {
            try {
                //alert('here')
                OneViewConsole.Debug("ValidateActionNC Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.ValidateActionNC");
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
                OneViewConsole.Debug("ValidateActionNC End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.ValidateActionNC");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.EvaluateActionNCStatus");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                DCNCMappingListData = null;
            }
        }

        var CheckGoodstypeNC = function (ControlId) {
            try {
                OneViewConsole.Debug("CheckGoodstypeNC Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.CheckGoodstypeNC");
                //alert('GoodsType: ' + $scope.GoodsTypeId + "surfacetemp :"+ $scope.NewDCModel.ATSurfaceTempControlId);

                var DCNCMappingListData = [];
                var DCNCMappingData = { NCRuleId: '', IsNC: 'false' }
             
                if ($scope.GoodsTypeId != 0) {
                    if ($scope.GoodsTypeId == 1) {
                        var ChilledRule = eval($scope.GoodsTypeId == 1 && $scope.NewDCModel.ATSurfaceTempControlId > 8)
                        if (ChilledRule == true) {
                            //alert('NC ChilledRule:');
                            DCNCMappingData.NCRuleId = '401';
                            DCNCMappingData.IsNC = 'true';
                            navigator.notification.alert(xlatService.xlat('ChilledRuleMsg'), ['OK'], "");
                        }
                        else {
                            DCNCMappingData.NCRuleId = '401';
                            DCNCMappingData.IsNC = 'false';
                        }
                    }

                    else if ($scope.GoodsTypeId == 2) {
                        var FrozenRule = eval($scope.GoodsTypeId == 2 && $scope.NewDCModel.ATSurfaceTempControlId > -15)
                        if (FrozenRule == true) {
                            //alert('NC FrozenRule:');
                            DCNCMappingData.NCRuleId = '402';
                            DCNCMappingData.IsNC = 'true';
                            navigator.notification.alert(xlatService.xlat('FrozenRuleMsg'), ['OK'], "");
                        }
                        else {
                            DCNCMappingData.NCRuleId = '402';
                            DCNCMappingData.IsNC = 'false';
                        }
                    }

                }
                if (DCNCMappingData.NCRuleId != '') {
                    DCNCMappingListData.push(DCNCMappingData);
                }
                //alert('DCNCMappingData CheckGoodstypeNC' + JSON.stringify(DCNCMappingListData));
                NormalizeNCEntityListData(DCNCMappingListData);
                OneViewConsole.Debug("CheckGoodstypeNC END", "GoodsReceivingAndTemperatureVerificationRecordsFacade.CheckGoodstypeNC");

            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oDataCaptureBO = null;
            }
        }
      
        this.NCClick = function ($compile) {

            try {                                 
                _oDataCaptureBO.LoadNCCommentsHtml($compile);                
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.CustomNCClick", xlatService);
            }
            finally {
            }
        }

        this.OnDate_Change = function (SelectedControlId, IsNc) {
            try {
                //alert('OnDate_Change');
                OneViewConsole.Debug("OnDate_Change Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.OnDate_Change");

                //alert('OnDate_Change :' + IsNc);
                //if (IsNc == true) {
                //    CheckExpiryDateNC(SelectedControlId);
                //}

                PDExpiryDateValidation(SelectedControlId);

                OneViewConsole.Debug("OnDate_Change End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.OnDate_Change");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.OnDate_Change", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var CheckExpiryDateNC = function (ControlId) {
            try {
                OneViewConsole.Debug("CheckExpiryDateNC Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.CheckExpiryDateNC");

                var DCNCMappingListData = [];
                var DCNCMappingData = { NCRuleId: '', IsNC: 'false' }

                var CurrentDate = new DateTime().GetDate();
                var CurrentDateSplitted = CurrentDate.split("-");
                var CurrentMonth = (CurrentDateSplitted[1] - 1);
                var FormedCurrentDate = new Date(CurrentDateSplitted[2], CurrentMonth, CurrentDateSplitted[0]);

             
                var ExpiryDate;
                if (document.getElementById(ControlId) != null)
                    ExpiryDate = document.getElementById(ControlId).value;

                if (ExpiryDate != undefined) {
                    var ExpiryDateSplitted = ExpiryDate.split("-");
                    var ExpiryMonth = (ExpiryDateSplitted[1] - 1);
                    //from ui first year will come so taking 0th element first
                    var FormedExpiryDate = new Date(ExpiryDateSplitted[0], ExpiryMonth, ExpiryDateSplitted[2]);

                   // alert(ExpiryDate + 'ExpiryDate' + FormedExpiryDate);
                   // alert(CurrentDate + 'CurrentDate' + FormedCurrentDate);

                    if (FormedExpiryDate > FormedCurrentDate) {
                        DCNCMappingData.NCRuleId = '403';
                        DCNCMappingData.IsNC = 'false';
                    }
                    else {
                        DCNCMappingData.NCRuleId = '403';
                        DCNCMappingData.IsNC = 'true';
                        navigator.notification.alert(xlatService.xlat('ExpiryDateNCMsg'), ['OK'], "");
                    }
                }

                if (DCNCMappingData.NCRuleId != '') {
                    DCNCMappingListData.push(DCNCMappingData);
                }
                //alert('DCNCMappingData CheckExpiryDateNC' + JSON.stringify(DCNCMappingListData));
                NormalizeNCEntityListData(DCNCMappingListData);

                OneViewConsole.Debug("CheckExpiryDateNC END", "GoodsReceivingAndTemperatureVerificationRecordsFacade.CheckExpiryDateNC");

            }

            catch (Excep) {
                throw Excep;
            }
        }

        var PDExpiryDateValidation = function (ControlId) {
            try {
                OneViewConsole.Debug("PDExpiryDateValidation Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.PDExpiryDateValidation");

                var CurrentDate = new DateTime().GetDate();
                var CurrentDateSplitted = CurrentDate.split("-");
                var CurrentMonth = (CurrentDateSplitted[1] - 1);
                var FormedCurrentDate = new Date(CurrentDateSplitted[2], CurrentMonth, CurrentDateSplitted[0]);

                var PDDate;
                var FormedPDDate;
                if (document.getElementById('DTDATEControlId') != null) {
                    PDDate = document.getElementById('DTDATEControlId').value;

                    if (PDDate != undefined && PDDate != '') {
                        var PDDateSplitted = PDDate.split("-");
                        var PDMonth = (PDDateSplitted[1] - 1);
                        //from ui first year will come so taking 0th element first
                        FormedPDDate = new Date(PDDateSplitted[0], PDMonth, PDDateSplitted[2]);

                        //if (FormedPDDate > FormedCurrentDate) {
                        //   // $scope.NewDCModel['DTDATEControlId'] = '';
                        //    alert(xlatService.xlat('PDValidationMsg'));
                        //}
                    }
                }

                var ExpiryDate;
                var FormedExpiryDate;
                if (document.getElementById('EXDATEControlId') != null) {
                    ExpiryDate = document.getElementById('EXDATEControlId').value;

                    if (ExpiryDate != undefined && ExpiryDate != '') {
                        var ExpiryDateSplitted = ExpiryDate.split("-");
                        var ExpiryMonth = (ExpiryDateSplitted[1] - 1);
                        //from ui first year will come so taking 0th element first
                        FormedExpiryDate = new Date(ExpiryDateSplitted[0], ExpiryMonth, ExpiryDateSplitted[2]);
                    }
                }



                if (FormedPDDate != undefined && FormedExpiryDate != undefined && FormedPDDate > FormedExpiryDate) {
                    navigator.notification.alert(xlatService.xlat('PDExpiryValidationMsg'), ['OK'], "");
                  //  $scope.NewDCModel[ControlId] = '';
                }

                OneViewConsole.Debug("PDExpiryDateValidation END", "GoodsReceivingAndTemperatureVerificationRecordsFacade.PDExpiryDateValidation");

            }

            catch (Excep) {
                //alert('Excep 1' + Excep);
                //alert('Excep 1' + JSON.stringify(Excep))
                throw Excep;
            }
        }

        this.CloseRightPanel = function () {

            try {
                var _oOneViewSidePanel = new OneViewSidePanel();
                
                _oOneViewSidePanel.Toggle(oSnapRemote);
                _oOneViewSidePanel.Clear();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.CustomNCClick", xlatService);
            }
        }

        var ShowNCStatus = function (AttributeId, ControlId) {
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
                    IsFirstTimeEdit = true;
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                }
                else {
                    _oDataCaptureBO.setDefaultValue();
                }
                DefaultValueBandSelection();
                OneViewConsole.Debug("ClearForm End", "CookingAndBlastChillingVerificationFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.ClearForm", xlatService);
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "CookingAndBlastChillingVerificationFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "CookingAndBlastChillingVerificationFacade.IsNCthereOrNot");
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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "CookingAndBlastChillingVerificationFacade.NormalizeNCEntityListData");
               
                var _oDCNCMappingBO = new DCNCMappingBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                for (var i = 0; i < DCNCMappingListData.length; i++) {

                    //if rule is there in list or not _oDataCaptureBO.DCNCMappingList
                    if (_oDataCaptureBO.DCNCMappingList.length > 0) {
                        var IsNCStatus = IsNCthereOrNot(DCNCMappingListData[i].NCRuleId, DCNCMappingListData[i].IsNC);
                        if (IsNCStatus == false) {
                            var NCMappingList = _oDCNCMappingBO.GetDCNCMapping(DCNCMappingListData[i].NCRuleId, DCNCMappingListData[i].IsNC, DCNCMappingListData[i].Comments);
                            _oDataCaptureBO.DCNCMappingList.push(NCMappingList);
                        }

                    }
                    else {
                        var NCMappingList = _oDCNCMappingBO.GetDCNCMapping(DCNCMappingListData[i].NCRuleId, DCNCMappingListData[i].IsNC, DCNCMappingListData[i].Comments);
                        _oDataCaptureBO.DCNCMappingList.push(NCMappingList);
                    }

                }

             OneViewConsole.Debug("NormalizeNCEntityListData End", "CookingAndBlastChillingVerificationFacade.NormalizeNCEntityListData");
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
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.PreControlEvents", xlatService);
            }
        }
        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.PostControlEvents", xlatService);
            }
        }
        this.ngChange_setDateTime = function (ControlId) {
            try {
                _oDataCaptureBO.ngChange_setDateTime(ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.ngChange_setDateTime", xlatService);
            }
        }

        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "GoodsReceivingAndTemperatureVerificationRecordsFacade.ClearReasons", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "HotMealDishingVerificationFacade.ProbeTesting", xlatService);
            }
        }
}

function DateValidation() {
    var nc = false;
    var expiryDate;
    var expiryDateSplitted;
    var finalExpiry;
    if (document.getElementById("EXDATEControlId") != undefined) {
        expiryDate = document.getElementById("EXDATEControlId").value;
        expiryDateSplitted = expiryDate.split('-');
        finalExpiry = new Date(expiryDateSplitted[0], (parseInt(expiryDateSplitted[1]) - 1), expiryDateSplitted[2]);

       
    }
   
    var oDateTime = new DateTime();
    var currentDate = oDateTime.GetDate();
    if (finalExpiry != undefined && finalExpiry != "" && currentDate != undefined && currentDate != "") {
        if (finalExpiry <= currentDate) {
            nc= true;
        } else {
            nc= false;
        }
    }

    return nc;
}


