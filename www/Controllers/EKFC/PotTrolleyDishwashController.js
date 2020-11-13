var scope = null;
var ionicBackdrop = null;
var Timeout = 2000;
var oSnapRemote = null;

function clearCache($timeout, $location, $templateCache) {
    $timeout(function () {
        //alert('clearCache start');
        try {
            oOneViewAppInfoPlugin.ClearCache();
            $location.replace(); //clear last history route
            $templateCache.removeAll();
        } catch (e) {
            alert(' clearCache exception : ' + e);
        }
    }, 2000, $location, $templateCache);
}


MyApp.controller('PotTrolleyDishwashController',
    function ($scope, $document, xlatService, $timeout, $location, $templateCache, snapRemote, $compile) {
      //  oSetDefaultSpinner.Start();
        scope = $scope;
        oSnapRemote = snapRemote;
        var WashNC_Page = 'T548';
     //   xlatService.setCurrentPage('PotTrolleyDishwash');
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

        var oCookingAndBlastChillingMonitoringFacade =
            new PotTrolleyDishwashFacade({ 'scope': $scope, 'document': $document, 'location': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', '$timeout': $timeout, 'compile': $compile });

        oCookingAndBlastChillingMonitoringFacade.Init();
        oCookingAndBlastChillingMonitoringFacade.PageLoad();
       // oSetDefaultSpinner.Stop();
       
        if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
            $scope.DivNGForm = true;
            $scope.DivContent = false;
            $scope.DivSignature = false;
            xlatService.setCurrentPage(WashNC_Page, true);

            oCookingAndBlastChillingMonitoringFacade.GetNCPageTitle();
        }
        else {
           // xlatService.setCurrentPage('PotTrolleyDishwash');
            xlatService.setCurrentPage(currentPage, true);
            if (OneViewSessionStorage.Get("DcPlaceId") == 3) {
                PageName = xlatService.xlat('PageTitle');
            }
            else {
                PageName = xlatService.xlat('PageTitleUnit2');
            }
            document.getElementById('PageTitle').innerHTML = PageName;
            $scope.DivNGForm = false;
            $scope.DivContent = true;
            $scope.DivSignature = false;
        }

        //$scope.$on('$viewContentLoaded', function () {
        //    alert('monitor viewContentLoaded 1234');
        //    AutoCompleteDestroyHTML();
        //    AutoCompleteGenerateHTML();
        //});

        $scope.HideRightSnap = function () {          
            snapRemote.toggle("right");
        }

        $scope.$on('$destroy', function () {
            var oOneViewSidePanel = new OneViewSidePanel();
            oOneViewSidePanel.Clear();
            oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = null;
            
            oCookingAndBlastChillingMonitoringFacade.Destroy();

            NCActionProfileMetaData = undefined;
            CommentsResult = {};
            ObservationResult = {};
            NCSelectedAttributeId = 0;

            xlatService.RemoveCurrentPageMetadata(currentPage);
            xlatService.RemoveCurrentPageMetadata(WashNC_Page);
        });

        $scope.HideNC =function()
        {
            if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                $location.url('/ViewRecords');
            }
            else {
                $scope.DivNGForm = false;
                $scope.DivContent = true;
                //xlatService.setCurrentPage('PotTrolleyDishwash'); 
                xlatService.setCurrentPage(currentPage, true);
                if (OneViewSessionStorage.Get("DcPlaceId") == 3) {
                    PageName = xlatService.xlat('PageTitle');
                }
                else {
                    PageName = xlatService.xlat('PageTitleUnit2');
                }
                document.getElementById('PageTitle').innerHTML = PageName;
            }
        }

        $scope.ShowNCPage = function () {
            xlatService.setCurrentPage(WashNC_Page, true);
            //alert('ShowNCPage here');
            oCookingAndBlastChillingMonitoringFacade.GetNCPageTitle();
            $scope.DivNGForm = true;
            $scope.DivContent = false;
            $scope.DivSignature = false;
            $scope.DivNC = false;
        }


        $scope.GetProbeStatus = function () {
            oCookingAndBlastChillingMonitoringFacade.GetProbeStatus();
        };

        $scope.LoadProbe = function () {
            var oSettingsFacade = new SettingsFacade();
            //oSettingsFacade.LoadAllPairedDevices($scope,);
        };


        $scope.AddRecords = function () {
            oCookingAndBlastChillingMonitoringFacade.SaveDCRecords();
        };

        $scope.SetSelectedTextBoxColor = function (ControlId) {
            oCookingAndBlastChillingMonitoringFacade.SetSelectedTextBoxColor(ControlId);
        }

        $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
            oCookingAndBlastChillingMonitoringFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
        };
        $scope.divShow = true;
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

        $scope.ngChange_setIsManualFlag = function (ControlId) {
            oCookingAndBlastChillingMonitoringFacade.ngChange_setIsManualFlag(ControlId);
        }



        $scope.SaveNCAction = function () {
            oCookingAndBlastChillingMonitoringFacade.SetNCFormAction();
        }
        $scope.ClosePopUp = function () {

        }
        $scope.CloseSignature = function () {
            // $ionicSlideBoxDelegate.previous();
            $scope.DivNGForm = true;
            $scope.DivContent = false;
            $scope.DivSignature = false;
        }

        $scope.LoadViewRecord = function () {
            // alert('go to view');
            $location.url('/ViewRecords');
        }

        $scope.toggle = false;

        var lastTimeOutId = null;
        $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
            $scope.DisableSave = true;
            $scope.DisableSaveSubmit = true;

            if (lastTimeOutId != null)
                $timeout.cancel(lastTimeOutId);
            lastTimeOutId = $timeout(function () { oCookingAndBlastChillingMonitoringFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId); }, Timeout);
        }


        $scope.OnTime_Change = function (SelectedControlId, IsNc) {
            if (lastTimeOutId != null)
                $timeout.cancel(lastTimeOutId);
            lastTimeOutId = $timeout(function () { oCookingAndBlastChillingMonitoringFacade.OnTime_Change(SelectedControlId, IsNc); }, Timeout);
        }
 

        $scope.Signature = function () {
            oCookingAndBlastChillingMonitoringFacade.Signature();
        }
        $scope.ClearForm = function () {
            //var oDbStructureController = new DbStructureController();
           // oDbStructureController.CopyDb();
           // alert("Copied Successfully");

            oCookingAndBlastChillingMonitoringFacade.ClearForm();
        }
        $scope.Back = function () {
            scope = null;
            ionicBackdrop = null;
            if (OneViewSessionStorage.Get("DcId") != null) {
                OneViewSessionStorage.Remove("NCInlineEdit");
                OneViewSessionStorage.Remove("MyAuditForm");
                $location.url('/ViewRecords');
               // $location.url('/newdc');
                //$location.url('/nav/listview-group');
            }
            else if (OneViewSessionStorage.Get("MyAuditForm") == 'true') {
                OneViewSessionStorage.Remove("NCInlineEdit");
                OneViewSessionStorage.Remove("MyAuditEditForm");
                //$location.path('/my-audit');these should there
                $location.url('/newdc');
            }
            else {
                //$location.path('/newdc');
                $location.url('/newdc');
            }
        }

        $scope.CookedTypeClick = function (Type) {
            if (Type == 'P') {
                $scope.NewDCModel.chkG = false;
                $scope.NewDCModel.chkR = false;
                $scope.NewDCModel.chkS = false;
            }
            else if (Type == 'G') {
                $scope.NewDCModel.chkP = false;
                $scope.NewDCModel.chkR = false;
                $scope.NewDCModel.chkS = false;
            }
            else if (Type == 'R') {
                $scope.NewDCModel.chkG = false;
                $scope.NewDCModel.chkP = false;
                $scope.NewDCModel.chkS = false;
            }
            else if (Type == 'S') {
                $scope.NewDCModel.chkG = false;
                $scope.NewDCModel.chkR = false;
                $scope.NewDCModel.chkP = false;
            }
        }

        $scope.CheckActionNCEvent = function (AttributeId, ControlId, RefreshcontrolId) {
           // alert('CheckActionNCEvent');
            oCookingAndBlastChillingMonitoringFacade.CheckActionNCEvent(AttributeId, ControlId, RefreshcontrolId);
        }
			 

        $scope.CustomNCClick = function () {
            oCookingAndBlastChillingMonitoringFacade.CustomNCClick();
        }

        $scope.NCClick = function () {
            oCookingAndBlastChillingMonitoringFacade.NCClick($compile);
        }

        $scope.ObservationTabClick = function () {
            oCookingAndBlastChillingMonitoringFacade.ObservationTabClick($compile);
        }

        $scope.NCTabClick = function () {
            oCookingAndBlastChillingMonitoringFacade.NCTabClick($compile);
        }

        $scope.CloseRightPanel = function () {
            oCookingAndBlastChillingMonitoringFacade.CloseRightPanel();
        }
        $scope.PreControlEvents = function (AttributeId, ControlId, $event) {        
                oCookingAndBlastChillingMonitoringFacade.PreControlEvents(AttributeId, ControlId, $event);          
        }
        $scope.PostControlEvents = function (AttributeId, ControlId) {

            oCookingAndBlastChillingMonitoringFacade.PostControlEvents(AttributeId, ControlId);
        }

        $scope.ngChange_setDateTime = function (ControlId) {
            oCookingAndBlastChillingMonitoringFacade.ngChange_setDateTime(ControlId);
        }

        $scope.SubmitRecords = function () {
            oCookingAndBlastChillingMonitoringFacade.SaveDCRecords(true);
        }

        $scope.ClearReasons = function () {
            oCookingAndBlastChillingMonitoringFacade.ClearReasons();
        }

        $scope.ClearComments = function () {
            oCookingAndBlastChillingMonitoringFacade.ClearComments();
        }

        $scope.ProbeTesting = function () {
            oCookingAndBlastChillingMonitoringFacade.ProbeTesting();
        };
        //ClearComments

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

    }
);




function PotTrolleyDishwashFacade(parm) {

    try {
        OneViewConsole.Debug("CookingAndBlastChillingMonitoringFacade Start", "Facade.CookingAndBlastChillingMonitoringFacade");

        var MyInstance = this;
        var $scope = parm.scope;
        var $document = parm.document;
        var $location = parm.location;
        var xlatService = parm.xlatService;
        var $compile = parm.compile;
       // var toaster = parm.toaster;
       // var SpinService = parm.SpinService;
        var $timeout = parm.$timeout
        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        var TemplateId = OneViewSessionStorage.Get("TemplateId");
        var TemplateName = OneViewSessionStorage.Get("TemplateName");
        var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];

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
        this.oscope = $scope;
        var variables = {
            "LocalMyscope": $scope
        };
        var MandatoryValidationMetaDataForAll;

        $scope.NewDCModel = {};

        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
      //  _oDataCaptureBO.timeoutService = $timeout;
        // var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);

        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("CookingAndBlastChillingMonitoringFacade End", "Facade.CookingAndBlastChillingMonitoringFacade");
    }
    catch (Excep) {
       // alert('Facade.CookingAndBlastChillingMonitoringFacade here' + Excep);
       // alert(' Facade.CookingAndBlastChillingMonitoringFacade here' + JSON.stringify(Excep));
        oOneViewExceptionHandler.Catch(Excep, "Facade.CookingAndBlastChillingMonitoringFacade", xlatService);
    } 


        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "CookingAndBlastChillingMonitoringFacade.Init");

                var DefaultData = null;
                $scope.ShiftOptions = [];
                //  $scope.NCOptions = [{ name: "NC", color: "red", Selected: true }, { name: "Observation", color: "orange", Selected: false }];
                $scope.NCOptions = [];
                $scope.NCBandModel = [];

                $scope.WashType = [];
                $scope.TestType = [];
                $scope.ThermoLabel = [];

                _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;

                _oDataCaptureBO.NCTemplateId = 548;
                _oDataCaptureBO.NCTemplateName = "Warewash Machine Non Conformance Notice";
                _oDataCaptureBO.Init();
                OneViewConsole.Debug("Init End", "CookingAndBlastChillingMonitoringFacade.Init");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.Init", xlatService);
            }
            finally {
                DefaultData = null;
            }

        }
        
        this.Destroy = function () {
            _oDataCaptureBO.TemperatureNgKeyUpEventHandler = null;
            _oDataCaptureBO.Destroy();
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

       

        this.ClearForm = function () {
            try {
                OneViewConsole.Debug("ClearForm Start", "CookingAndBlastChillingMonitoringFacade.ClearForm");

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

                OneViewConsole.Debug("ClearForm End", "CookingAndBlastChillingMonitoringFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ClearForm", xlatService);
            }
        }

        this.ShowNCButton = function ()
        {
            try {
                OneViewConsole.Debug("ShowNCButton Start", "CookingAndBlastChillingMonitoringFacade.ShowNCButton");

                if (($scope.NewDCModel.ATBlastChillerTempOutControlId > '6') || ($scope.NewDCModel.ATPreChillerTempOutControlId > '6') && $scope.NewDCModel.AddlProductControlId != '') {
                    $scope.DivNC = true;
                }
                else {
                    $scope.DivNC = false;
                }

                OneViewConsole.Debug("ShowNCButton End", "CookingAndBlastChillingMonitoringFacade.ShowNCButton");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ShowNCButton", xlatService);
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
                OneViewConsole.Debug("LoadAnswerModes Start", "CookingAndBlastChillingMonitoringFacade.LoadAnswerModes");

                AnswerModeNCActionEvent = OnAnswerModeSelect;

                var oWashType = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkWashType', 'DataSourceModelName': 'WashType', 'DisplayElementModelName': 'NewDCModel.chkWashType' });
                oWashType.AnswerModes(TemplateNodes, 537);

                var oTestType = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkTestType', 'DataSourceModelName': 'TestType', 'DisplayElementModelName': 'NewDCModel.chkTestType' });
                oTestType.AnswerModes(TemplateNodes, 543);

                var oThermoLabel = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkThermoLabel', 'DataSourceModelName': 'ThermoLabel', 'DisplayElementModelName': 'NewDCModel.chkThermoLabel' });
                oThermoLabel.AnswerModes(TemplateNodes, 544);

                var oProductStatus = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oProductStatus.LoadNCOptions();

                OneViewConsole.Debug("LoadAnswerModes End", "CookingAndBlastChillingMonitoringFacade.LoadAnswerModes");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oProductStatus = null;
            }
        }

        this.GetNCPageTitle = function () {
            try {
                OneViewConsole.Debug("GetNCPageTitle Start", "PotTrolleyDishwashController.GetNCPageTitle");

                var PageName = "";
                if (DcPlaceId == 3) {
                    PageName = xlatService.xlat('PageTitle');
                }
                else {
                    PageName = xlatService.xlat('PageTitleUnit2');
                }

                document.getElementById('PageTitle').innerHTML = PageName;

                OneViewConsole.Debug("GetNCPageTitle End", "PotTrolleyDishwashController.GetNCPageTitle");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "PotTrolleyDishwashController.GetNCPageTitle", xlatService);
            }
            finally {
                ModelIdForAutoTemperatureUpdation = null;
                ModelIdForAutoTimeUpdation = null;
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
                OneViewConsole.Debug("PageLoad Start", "CookingAndBlastChillingMonitoringFacade.PageLoad");

                _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
                LoadAnswerModes();
                LoadDefaultValueMetaData();
                AutoCompleteGenerateHTML();
                Loadddl_OneViewAdv();
                _oDataCaptureBO.LoadShift();
                //_oDataCaptureBO.LoadNCOptions();
                _oDataCaptureBO.ClearControls();
                // _oNCComponent.Init();
                _oCPActionNCComponent.Init();

                // _oNCComponent.BindNCSummaryHandler = BindNc;
                _oDataCaptureBO.SetMandatoryMetaData();


                var ModelIdForAutoTemperatureUpdation;
                var ModelIdForAutoTimeUpdation;

                // todo : check with pallav and solve document,getelementbyid page load issue
                 _oDataCaptureBO.SetControlEnableStatus();

                //MandatoryValidationMetaDataForAll = ReadMandatoryMetaData();
                //OneViewSessionStorage.Save('MandatoryMetaData', JSON.stringify(MandatoryValidationMetaDataForAll));
                 if (DcId != null) {
                    // alert('DcId' + DcId);
                      $scope.Add = 'Save';
                      _oDataCaptureBO.GetNCComments(DcId);
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                    BindNCLoadDatas();
                    SetTestType();
                    
                    SetSelectedTextBoxColor_Private('txtFinalRinseControlId');
                    ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtFinalRinseControlId';
                    ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeControlId';
                }
                  else {
                      $scope.Add = 'Add';
                    _oDataCaptureBO.setDefaultValue();
                    SetSelectedTextBoxColor_Private('txtFinalRinseControlId');
                    ModelIdForAutoTemperatureUpdation = 'NewDCModel.txtFinalRinseControlId';
                    ModelIdForAutoTimeUpdation = 'NewDCModel.DTTimeControlId';

                }

                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = ModelIdForAutoTemperatureUpdation;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = ModelIdForAutoTimeUpdation;
                _oDataCaptureBO.SetDefaultAutoTemperatureListener();

                ///AuditSummary
                _oDataCaptureBO.ShowDCSummary();
                MyInstance.ShowNCButton();
               _oSettingsBO.ShowAutoManualStatus($scope);
                if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                    //_oDataCaptureBO.UpdateDC(DcId, undefined, _oDataCaptureBO.PreEditValues, true);
                    $scope.divShow = true;
                }
                
                new OnewViewEventListener().RegisterSelectedFieldEvent();
             
                OneViewConsole.Debug("PageLoad End", "CookingAndBlastChillingMonitoringFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.PageLoad", xlatService);
            }
            finally {
                ModelIdForAutoTemperatureUpdation = null;
                ModelIdForAutoTimeUpdation = null;
            }
        }

        var SetTestType = function () {
            try{
                if (scope['chkTestType'].GetSelectedText() != "") {
                    scope['chkTestType'].Set({ Id: scope['chkTestType'].GetSelectedValue(), Name: scope['chkTestType'].GetSelectedText(), ControlId: "chkTestType", 'ColourIndex': 'green' });
                }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.SetTestType", xlatService);
            }
            finally {               
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

      //  var ClearAutoCompleteHTML=function()
       // {
       //     var divAutoComplete = document.getElementById("divAutocomplatePopUp");
       //     divAutoComplete.innerHTML = '';
      //  }
        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "CookingAndBlastChillingMonitoringFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "CookingAndBlastChillingMonitoringFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.SetSelectedTextBoxColor", xlatService);
            }
        }
    
        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "CookingAndBlastChillingMonitoringFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'txtFinalRinseControlId') {
                    $scope.txtFinalRinseControlId = 'highlight';                   
                }  
                else {
                    $scope.txtFinalRinseControlId = '';
                   
                }
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "CookingAndBlastChillingMonitoringFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "CookingAndBlastChillingMonitoringFacade.BindNc");

                var element = document.getElementById("divDeviatedValue");
                if (NcStatus == true) {
                    {
                        if (objRule.Rule.CriteriaType == 'OneViewDCPrimaryCriteria') {
                            if (objRule.Rule != undefined) {
                                var Criteria = objRule.Rule;
                                if (Criteria.NodeId == AttributeId) {
                                    $scope.toggle = true;
                                    $scope.spnCookingTemp = objRule.CriteriaDisplayLabel;
                                    $scope.TempCooking = 'Deviated By' + (Criteria.value - $scope.NewDCModel[ControlId]);
                                    element.setAttribute("class", "col red");
                                }
                            }
                        }
                        else {
                            for (var j = 0; j < objRule.Rule.FilterParms.length; j++) {
                                var Criteria = objRule.Rule.FilterParms[j];
                                if (Criteria.NodeId == AttributeId) {
                                    $scope.toggle = true;
                                    $scope.spnCookingTemp = objRule.CriteriaDisplayLabel;
                                    $scope.TempCooking = 'Deviated By' + (Criteria.value - $scope.NewDCModel[ControlId]);
                                    element.setAttribute("class", "col red"); //For Most Browsers
                                }
                            }
                        }
                    }


                }
                else {
                    $scope.toggle = true;
                    $scope.TempCooking = 'Good';
                    $scope.spnCookingTemp = objRule.CriteriaDisplayLabel;
                    element.setAttribute("class", "col green"); //For Most Browsers
                }

                OneViewConsole.Debug("BindNc End", "CookingAndBlastChillingMonitoringFacade.BindNc");
            }

            catch (Excep) {
                throw Excep;
            }
            finally {
                element = null;
                Criteria = null;
            }
        }

        this.SetNCFormAction = function () {
            try {
                OneViewConsole.Debug("SetNCFormAction Start", "CookingAndBlastChillingMonitoringFacade.SetNCFormAction");

                //$ionicSlideBoxDelegate.previous();
                if (OneViewSessionStorage.Get("NCInlineEdit") != 'true') {
                    //alert('1');
                    $scope.DivNGForm = false;
                    $scope.DivContent = true;
                    $scope.DivSignature = false;
                    // xlatService.setCurrentPage('PotTrolleyDishwash'); 
                    var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
                    xlatService.setCurrentPage(currentPage, true);

                    if (OneViewSessionStorage.Get("DcPlaceId") == 3) {
                        PageName = xlatService.xlat('PageTitle');
                    }
                    else {
                        PageName = xlatService.xlat('PageTitleUnit2');
                    }
                    document.getElementById('PageTitle').innerHTML = PageName;
                   
                }
                else if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                    //alert('2');
                    oSetDefaultSpinner.Start();
                    var Status = _oDataCaptureBO.UpdateDC(DcId, undefined, _oDataCaptureBO.PreEditValues);
                    if (Status != false) {
                        OneViewSessionStorage.Remove("DcId");
                        OneViewSessionStorage.Remove("NCInlineEdit");
                        _oDataCaptureBO.DCNCMappingList = new Array();
                        _oDataCaptureBO.DeleteNCEventHandler = false;
                        $scope['DCBoutNCSignature_IsModified'] = '';
                        $scope['DCBoutNCSignature_SignaturePad'] = '';
                        $location.url('/ViewRecords');
                    }
                    oSetDefaultSpinner.Stop();
                }
                MyInstance.ShowNCButton();
               
               AttributeWiseActionDict = {};
                OneViewConsole.Debug("SetNCFormAction End", "CookingAndBlastChillingMonitoringFacade.SetNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.SetNCFormAction", xlatService);
            }
            finally {
                Status = null;
            }
        }

        this.Temperature_NgKeyUpOLD = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
            try {

                OneViewConsole.Debug("Temperature_NgKeyUp Start", "CookingAndBlastChillingMonitoringFacade.Temperature_NgKeyUp");
               
                if (IsNc == true) {
                    ShowNCStatus(AttributeId, ControlId);
                }
                var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                // if (RefreshcontrolId != '') {
                oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
                // }

                MyInstance.ShowNCFormAction(ControlId);

                if (RefreshcontrolId == 'DTCookingTimeControlId' || RefreshcontrolId == 'DTPreChillerTimeInControlId' || RefreshcontrolId == 'DTBlastChillerTimeInControlId') {
                    CheckCooking_ChillerTimeDiffNC(RefreshcontrolId);
                }

                if (RefreshcontrolId == 'DTPreChillerTimeInControlId' || RefreshcontrolId == 'DTPreChillerTimeOutControlId' || RefreshcontrolId == 'DTBlastChillerTimeInControlId' || RefreshcontrolId == 'DTBlastChillerTimeOutControlId') {
                    CheckPre_BlastChilliingNC(RefreshcontrolId);
                }

                OneViewConsole.Debug("Temperature_NgKeyUp End", "CookingAndBlastChillingMonitoringFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var ShowNCStatusOLD = function (AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "CookingAndBlastChillingMonitoringFacade.ShowNCStatus");
                var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
                NormalizeNCEntityListData(DCNCMappingListData);

                OneViewConsole.Debug("ShowNCStatus End", "CookingAndBlastChillingMonitoringFacade.ShowNCStatus");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                DCNCMappingListData = null;
            }
        }

        this.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {
            try {
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "CookingAndBlastChillingMonitoringFacade.Temperature_NgKeyUp");

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
                OneViewConsole.Debug("Temperature_NgKeyUp End", "CookingAndBlastChillingMonitoringFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.Temperature_NgKeyUp", xlatService);
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
                OneViewConsole.Debug("ValidateActionNC Start", "CookingAndBlastChillingMonitoringFacade.ValidateActionNC");
             //   var response = { 'AttributeId': 0, 'IsRuleViolated': false, 'NCEq': '' };
                var CompleteResponse = { 'ActionResponseList': [], 'response': response }
                CompleteResponse = EvaluateActionNCStatus(AttributeId);
                var ActionResponseList = CompleteResponse.ActionResponseList;
                var response = CompleteResponse.response;

               // alert('CompleteResponse.response ' + JSON.stringify(CompleteResponse.response));
              // alert('ActionResponseList Final' + JSON.stringify(ActionResponseList));
                if (ActionResponseList != undefined) {
                    if (ActionResponseList.length > 1) {
                        navigator.notification.alert(('More than one action for a single attribute : Not implemeneted'), ['OK'], "");
                    }
                    else {
                        for (var i = 0; i < ActionResponseList.length; i++) {
                            if ((ActionResponseList[i].IsFormAction == true || ActionResponseList[i].IsFormAction == 'true') && (ActionResponseList[i].IsRuleViolated == true || ActionResponseList[i].IsRuleViolated == 'true')) {
                                if (response.IsRuleViolated == true) {
                                    MyInstance.ShowNCFormAction(ControlId);
                                }
                            }
                        }
                    }
                }
                OneViewConsole.Debug("ValidateActionNC End", "CookingAndBlastChillingMonitoringFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "CookingAndBlastChillingMonitoringFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "CookingAndBlastChillingMonitoringFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }


        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                            
                OneViewConsole.Debug("EvaluateActionNCStatus Start", "PotTrolleyDishwashFacade.EvaluateActionNCStatus");
               
                var response = { 'AttributeId': 0, 'IsRuleViolated': false, 'NCEq': '' };
                var CompleteResponse = { 'ActionResponseList': [], 'response': response }

                _oDataCaptureBO.DisplayNCMessage = function () {
                    CompleteResponse.response = CustomNC(AttributeId);
                    UpdateNCDetails();
                }

                CompleteResponse.ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);

                
               // alert('EvaluateActionNCStatus CompleteResponse.response : ' + JSON.stringify(CompleteResponse.response));

                OneViewConsole.Debug("EvaluateActionNCStatus End", "PotTrolleyDishwashFacade.EvaluateActionNCStatus");

                return CompleteResponse;
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
            }
        }

        var CustomNC = function (AttributeId) {
            try {
                OneViewConsole.Debug("CustomNC Start", "PotTrolleyDishwashFacade.CustomNC");

               // alert('AttributeId :' + AttributeId);
                var response = {'AttributeId' :0, 'IsRuleViolated' :false, 'NCEq' : ''};

                response.AttributeId = AttributeId;
                var thermo = "(($scope.chkThermoLabel.GetSelectedValue())==67)";
              //  var quad = "((($scope.chkWashType.GetSelectedValue()==60 || $scope.chkWashType.GetSelectedValue()==62) &&  (($scope.chkTestType.GetSelectedValue()) == 63 && (((($scope.NewDCModel.txtQuadTestControlId)!=undefined)&&(($scope.NewDCModel.txtQuadTestControlId)!='') && (parseFloat($scope.NewDCModel.txtQuadTestControlId)<200)) || (($scope.chkThermoLabel.GetSelectedValue())==67))) || ((($scope.NewDCModel.txtQuadTestControlId)!=undefined)&&(($scope.NewDCModel.txtQuadTestControlId)!='') && (parseFloat($scope.NewDCModel.txtQuadTestControlId)<200)) ) || ((($scope.chkWashType.GetSelectedValue())==62) && ((($scope.NewDCModel.txtQuadTestControlId)!=undefined)&&(($scope.NewDCModel.txtQuadTestControlId)!='') && (parseFloat($scope.NewDCModel.txtQuadTestControlId)<200))))";
                var quad = "((($scope.chkWashType.GetSelectedValue()==60 || $scope.chkWashType.GetSelectedValue()==62) &&  (($scope.chkTestType.GetSelectedValue()) == 63 && (((($scope.NewDCModel.txtQuadTestControlId)!=undefined)&&(($scope.NewDCModel.txtQuadTestControlId)!='') && (parseFloat($scope.NewDCModel.txtQuadTestControlId)<200)))) || ((($scope.NewDCModel.txtQuadTestControlId)!=undefined)&&(($scope.NewDCModel.txtQuadTestControlId)!='') && (parseFloat($scope.NewDCModel.txtQuadTestControlId)<200)) ) || ((($scope.chkWashType.GetSelectedValue())==62) && ((($scope.NewDCModel.txtQuadTestControlId)!=undefined)&&(($scope.NewDCModel.txtQuadTestControlId)!='') && (parseFloat($scope.NewDCModel.txtQuadTestControlId)<200))))";
                var chlorine = "(((($scope.NewDCModel.txtChlorineTestControlId)!='') &&(($scope.NewDCModel.txtChlorineTestControlId)!=undefined))&&((parseFloat($scope.NewDCModel.txtChlorineTestControlId)<50)||(parseFloat($scope.NewDCModel.txtChlorineTestControlId)>100)))";
                var finalRinse = "((($scope.chkWashType.GetSelectedValue())==61) && (($scope.AddlTrolleyMachineControlId.GetSelectedText() != undefined && $scope.AddlTrolleyMachineControlId.GetSelectedText() != '' && $scope.AddlTrolleyMachineControlId.GetSelectedText() == 'COLD KITCHEN TROLLEY WASH (1)' || $scope.AddlTrolleyMachineControlId.GetSelectedText() == 'COLD KITCHEN TROLLEY WASH (2)') && ($scope.NewDCModel.txtFinalRinseControlId) != undefined && ($scope.NewDCModel.txtFinalRinseControlId) != '' && parseFloat($scope.NewDCModel.txtFinalRinseControlId) < 82))";
                if (AttributeId == 542) {
                    response.NCEq = finalRinse;
                    var FinalRinseEval = eval(finalRinse);
                    if (FinalRinseEval == true) {
                        response.IsRuleViolated = true;
                        alert("NC-PR-DPT-001 :: Final Rinse is observed to be below 82\u2103.");
                    }
                    else { }
                }
                else if (AttributeId == 544) {
                    response.NCEq = thermo;
                    var ThermoEval = eval(thermo);
                    if (ThermoEval == true) {
                        response.IsRuleViolated = true;
                        alert("NC-PR-DPT-001 :: Thermo label is observed to be white.");
                    }
                    else { }
                }

                else if (AttributeId == 545) {
                    response.NCEq = quad;
                    var QuadEval = eval(quad);
                    if (QuadEval == true) {
                        response.IsRuleViolated = true;
                        alert("NC-PR-DPT-001 :: Quad Test is observed to be below 200 ppm.");
                    }
                    else { }
                }
                else if (AttributeId == 546) {
                    response.NCEq = chlorine;
                    var ChlorineEval = eval(chlorine);
                    if (ChlorineEval == true) {
                        response.IsRuleViolated = true;
                        alert("NC-PR-DPT-001 :: Chlorine Test is observed not within 50 to 100 ppm.");
                    }
                    else { }
                }

                OneViewConsole.Debug("CustomNC End", "PotTrolleyDishwashFacade.CustomNC");
                return response;
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
            }
        }


        var UpdateNCDetails = function () {
            try {
                OneViewConsole.Debug("UpdateNCDetails Start", "PotTrolleyDishwashFacade.UpdateNCDetails");
                var oDateTime = new DateTime();

                var date = (oDateTime.GetDate()).split('-');
                $scope.NewDCModel.DTDcDateControlId = new Date(date[2], date[1] - 1, date[0]);

                $scope.NewDCModel.DTDcTimeControlId = oDateTime.GetHoursAndMinutes();

                var MachineNo = "";

                if ($scope.AddlPotMachineControlId.GetSelectedText() != '') {
                    MachineNo = $scope.AddlPotMachineControlId.GetSelectedText();
                }
                else if ($scope.AddlTrolleyMachineControlId.GetSelectedText() != '') {
                    MachineNo = $scope.AddlTrolleyMachineControlId.GetSelectedText();
                }
                else if ($scope.AddlDishwashMachineControlId.GetSelectedText() != '') {
                    MachineNo = $scope.AddlDishwashMachineControlId.GetSelectedText();
                }

                var ThermoLabel = $scope.chkThermoLabel.GetSelectedValue();

                var ChlorineNCDetails;
                var FinalRinseNCDetails;
                var NCDetail;
                var QuadNCDetail;

                if ($scope.NewDCModel.txtChlorineNCDetailsControlId == "" || $scope.NewDCModel.txtChlorineNCDetailsControlId == undefined || $scope.NewDCModel.txtChlorineNCDetailsControlId == null) {
                    ChlorineNCDetails = "NA";
                    $scope.NewDCModel.txtChlorineNCDetailsControlId = ChlorineNCDetails;
                }
                if ($scope.NewDCModel.txtFinalRinseNCDetailsControlId == "" || $scope.NewDCModel.txtFinalRinseNCDetailsControlId == undefined || $scope.NewDCModel.txtFinalRinseNCDetailsControlId == null) {
                    FinalRinseNCDetails = "NA";
                    $scope.NewDCModel.txtFinalRinseNCDetailsControlId = FinalRinseNCDetails;
                }
                if ($scope.NewDCModel.txtNCDetailsControlId == "" || $scope.NewDCModel.txtNCDetailsControlId == undefined || $scope.NewDCModel.txtNCDetailsControlId == null) {
                    NCDetail = "NA";
                    $scope.NewDCModel.txtNCDetailsControlId = NCDetail;
                }
                if ($scope.NewDCModel.txtQuadNCDetailsControlId == "" || $scope.NewDCModel.txtQuadNCDetailsControlId == undefined || $scope.NewDCModel.txtQuadNCDetailsControlId == null) {
                    QuadNCDetail = "NA";
                    $scope.NewDCModel.txtQuadNCDetailsControlId = QuadNCDetail;
                }
                else {
                    $scope.NewDCModel.txtQuadNCDetailsControlId = "NA";
                }

               

                if (((($scope.NewDCModel.txtChlorineTestControlId) != '') && (($scope.NewDCModel.txtChlorineTestControlId) != undefined)) &&
                    ((($scope.NewDCModel.txtChlorineTestControlId) < 50) || (($scope.NewDCModel.txtChlorineTestControlId) > 100))) {
                    ChlorineNCDetails = "Please note that the Machine No. " + MachineNo + " did not reach the specified Chlorine concentration of 50 to 100 ppm as per the attached sheet.";
                    $scope.NewDCModel.txtChlorineNCDetailsControlId = ChlorineNCDetails;
                }
                else {
                    $scope.NewDCModel.txtChlorineNCDetailsControlId = "NA";
                }

                // else if ((ControlId == "txtFinalRinseControlId") && ($scope.NewDCModel.txtFinalRinseControlId) != undefined && ($scope.NewDCModel.txtFinalRinseControlId) != "" && parseFloat($scope.NewDCModel.txtFinalRinseControlId) < 82) {
                if (($scope.AddlTrolleyMachineControlId.GetSelectedText() != undefined
                    && $scope.AddlTrolleyMachineControlId.GetSelectedText() != ''
                    && $scope.AddlTrolleyMachineControlId.GetSelectedText() == 'COLD KITCHEN TROLLEY WASH (1)'
                    || $scope.AddlTrolleyMachineControlId.GetSelectedText() == 'COLD KITCHEN TROLLEY WASH (2)')
                    && ($scope.NewDCModel.txtFinalRinseControlId) != undefined && ($scope.NewDCModel.txtFinalRinseControlId) != '' && parseFloat($scope.NewDCModel.txtFinalRinseControlId) < 82) {
                    FinalRinseNCDetails = "Please note that the Machine No. " + MachineNo + " did not reach the specified temperature of 82\u2103 as per the attached sheet.";
                    $scope.NewDCModel.txtFinalRinseNCDetailsControlId = FinalRinseNCDetails;
                }
                else {
                    $scope.NewDCModel.txtFinalRinseNCDetailsControlId = "NA";
                }

                if (ThermoLabel == 67) {
                    NCDetail = "Please note that Machine No. " + MachineNo + " did not reach the specified temperature of 71\u2103 as per attached sheet.";
                    $scope.NewDCModel.txtNCDetailsControlId = NCDetail;
                }
                else {
                    $scope.NewDCModel.txtNCDetailsControlId = "NA";
                }

                if (((($scope.NewDCModel.txtQuadTestControlId) != undefined) && (($scope.NewDCModel.txtQuadTestControlId) != '')) && ((parseFloat($scope.NewDCModel.txtQuadTestControlId) < 200))) {
                    QuadNCDetail = "Please note that Machine No. " + MachineNo + " did not reach the specified concentration of 200 ppm as per attached sheet.";
                    $scope.NewDCModel.txtQuadNCDetailsControlId = QuadNCDetail;
                }
                else {
                    $scope.NewDCModel.txtQuadNCDetailsControlId = "NA";
                }

               
                OneViewConsole.Debug("UpdateNCDetails End", "PotTrolleyDishwashFacade.UpdateNCDetails");
            }
            catch (Excep) {
               // alert('UpdateNCDetails Excep : ' + JSON.stringify(Excep));
                throw Excep;
            }
            finally {
            }

        }


        this.ShowNCFormAction = function (ControlId) {
            try {
                OneViewConsole.Debug("ShowNCFormAction Start", "CookingAndBlastChillingMonitoringFacade.ShowNCFormAction");

                var TempOutNCTemplate = TemplateMetaData[ServiceId][_oDataCaptureBO.NCTemplateId];
                var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': _oDataCaptureBO.NCTemplateId, 'TemplateName': _oDataCaptureBO.NCTemplateName });
               // alert('_oDataCaptureBO.FormActionCount : ' + _oDataCaptureBO.FormActionCount);

                //Edit case
                if (DcId != null) {

                }

                //Save case
                    // if (_oDataCaptureBO.FormActionCount <= 1 )
                else {
                   // alert('here DcId :' + DcId);
                    _oNCDcDataCaptureBO.ClearControls(TempOutNCTemplate);
                }
                if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                }
                else if ($scope.DivContent == true && $scope.DivNGForm != true) {
                    var Title = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Title;
                    var Message = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Message;

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                        var oDateTime = new DateTime();

                        var date =(oDateTime.GetDate()).split('-');
                        $scope.NewDCModel.DTDcDateControlId = new Date(date[2], date[1] - 1, date[0]);
                                                
                      //  alert(oDateTime.GetHoursAndMinutes());
                       // document.getElementById('DTDcTimeControlId').value = oDateTime.GetHoursAndMinutes(); //take time 

                        //  alert(document.getElementById('DTDcTimeControlId').value);

                        $scope.NewDCModel.DTDcTimeControlId = oDateTime.GetHoursAndMinutes();

                        //alert($scope.NewDCModel.DTDcTimeControlId);
                        var MachineNo = "";
                       // oScope.AddlProductControlId.GetSelectedText()
                        if ($scope.AddlPotMachineControlId.GetSelectedText() != '')
                        {
                            MachineNo = $scope.AddlPotMachineControlId.GetSelectedText();
                        }
                        else if ($scope.AddlTrolleyMachineControlId.GetSelectedText() != '') {
                            MachineNo = $scope.AddlTrolleyMachineControlId.GetSelectedText();
                        }
                        else if ($scope.AddlDishwashMachineControlId.GetSelectedText() != '') {
                            MachineNo = $scope.AddlDishwashMachineControlId.GetSelectedText();
                        }
                             
                        var ThermoLabel = $scope.chkThermoLabel.GetSelectedValue();

                        var ChlorineNCDetails;
                        var FinalRinseNCDetails;
                        var NCDetail;
                        var QuadNCDetail;

                        if ($scope.NewDCModel.txtChlorineNCDetailsControlId == "" || $scope.NewDCModel.txtChlorineNCDetailsControlId == undefined || $scope.NewDCModel.txtChlorineNCDetailsControlId == null) {
                            ChlorineNCDetails = "NA";
                            $scope.NewDCModel.txtChlorineNCDetailsControlId = ChlorineNCDetails;
                        }
                         if ($scope.NewDCModel.txtFinalRinseNCDetailsControlId == "" || $scope.NewDCModel.txtFinalRinseNCDetailsControlId == undefined || $scope.NewDCModel.txtFinalRinseNCDetailsControlId == null) {
                           FinalRinseNCDetails = "NA";
                            $scope.NewDCModel.txtFinalRinseNCDetailsControlId = FinalRinseNCDetails;
                        }
                        if ($scope.NewDCModel.txtNCDetailsControlId == "" || $scope.NewDCModel.txtNCDetailsControlId == undefined || $scope.NewDCModel.txtNCDetailsControlId == null) {
                            NCDetail = "NA";
                            $scope.NewDCModel.txtNCDetailsControlId = NCDetail;
                        }
                        if ($scope.NewDCModel.txtQuadNCDetailsControlId == "" || $scope.NewDCModel.txtQuadNCDetailsControlId == undefined || $scope.NewDCModel.txtQuadNCDetailsControlId == null) {
                            QuadNCDetail = "NA";
                            $scope.NewDCModel.txtQuadNCDetailsControlId = QuadNCDetail;
                        }


                        if (((($scope.NewDCModel.txtChlorineTestControlId) != '') && (($scope.NewDCModel.txtChlorineTestControlId) != undefined)) &&
                            ((($scope.NewDCModel.txtChlorineTestControlId) < 50) || (($scope.NewDCModel.txtChlorineTestControlId) > 100))) {
                            ChlorineNCDetails = "Please note that the Machine No. " + MachineNo + " did not reach the specified Chlorine concentration of 50 to 100 ppm as per the attached sheet.";
                            $scope.NewDCModel.txtChlorineNCDetailsControlId = ChlorineNCDetails;
                        }

                       // else if ((ControlId == "txtFinalRinseControlId") && ($scope.NewDCModel.txtFinalRinseControlId) != undefined && ($scope.NewDCModel.txtFinalRinseControlId) != "" && parseFloat($scope.NewDCModel.txtFinalRinseControlId) < 82) {
                        if (($scope.AddlTrolleyMachineControlId.GetSelectedText() != undefined
                            && $scope.AddlTrolleyMachineControlId.GetSelectedText() != ''
                            && $scope.AddlTrolleyMachineControlId.GetSelectedText() == 'COLD KITCHEN TROLLEY WASH (1)'
                            || $scope.AddlTrolleyMachineControlId.GetSelectedText() == 'COLD KITCHEN TROLLEY WASH (2)')
                            && ($scope.NewDCModel.txtFinalRinseControlId) != undefined && ($scope.NewDCModel.txtFinalRinseControlId) != '' && parseFloat($scope.NewDCModel.txtFinalRinseControlId) < 82)
                        {
                        FinalRinseNCDetails = "Please note that the Machine No. " + MachineNo + " did not reach the specified temperature of 82\u2103 as per the attached sheet.";
                            $scope.NewDCModel.txtFinalRinseNCDetailsControlId = FinalRinseNCDetails;
                        }
                        if (ThermoLabel == 67) {
                            NCDetail = "Please note that Machine No. " + MachineNo + " did not reach the specified temperature of 71\u2103 as per attached sheet.";
                            $scope.NewDCModel.txtNCDetailsControlId = NCDetail;
                        }

                        if (((($scope.NewDCModel.txtQuadTestControlId) != undefined) && (($scope.NewDCModel.txtQuadTestControlId) != '')) && ((parseFloat($scope.NewDCModel.txtQuadTestControlId) < 200))) {
                            QuadNCDetail = "Please note that Machine No. " + MachineNo + " did not reach the specified concentration of 200 ppm as per attached sheet.";
                            $scope.NewDCModel.txtQuadNCDetailsControlId = QuadNCDetail;
                        }

                      
                       
                     
                        if (ConfirmationId == '2') {

                            $scope.DivNC = false;
                            $scope.DivNGForm = true;
                            $scope.DivContent = false;
                            $scope.DivSignature = false;

                            var WashNC_Page = 'T548';
                            xlatService.setCurrentPage(WashNC_Page, true);

                            MyInstance.GetNCPageTitle();

                            //var SelectedTime = document.getElementById('DTBlastChillerTimeOutControlId');
                            //SetTimeInFormat(SelectedTime, 'DTBlastChillerTimeOutControlId');
                          
                            $scope.$apply();
                        }
                        else {
                            MyInstance.ShowNCButton();
                            $scope.$apply();
                        }
                    });

                }



                OneViewConsole.Debug("ShowNCFormAction End", "CookingAndBlastChillingMonitoringFacade.ShowNCFormAction");
            }
            catch (Excep) {
                alert('Excep :' + Excep + JSON.stringify(Excep))
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ShowNCFormAction", xlatService);
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
    
        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "CookingAndBlastChillingMonitoringFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "CookingAndBlastChillingMonitoringFacade.IsNCthereOrNot");

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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "CookingAndBlastChillingMonitoringFacade.NormalizeNCEntityListData");

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

               // alert(' _oDataCaptureBO.DCNCMappingList' + JSON.stringify(_oDataCaptureBO.DCNCMappingList));
                OneViewConsole.Debug("NormalizeNCEntityListData End", "CookingAndBlastChillingMonitoringFacade.NormalizeNCEntityListData");
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

        this.SaveSignature = function (ControlId, signaturePad) {
            try {
                OneViewConsole.Debug("SaveSignature Start", "CookingAndBlastChillingMonitoringFacade.SaveSignature");
                $scope[ControlId + '_IsModified'] = true;
                $scope[ControlId + '_SignaturePad'] = signaturePad.toDataURL();// signaturePad;
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

                OneViewConsole.Debug("SaveSignature End", "CookingAndBlastChillingMonitoringFacade.SaveSignature");
            }
            catch (Excep) {
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

        this.Signature = function () {
            try {
                OneViewConsole.Debug("Signature Start", "CookingAndBlastChillingMonitoringFacade.Signature");

                $scope.DivNGForm = true;
                $scope.DivContent = false;
                $scope.DivSignature = true;

                $timeout(function () {
                    SignatureContent();
                }, 100);


                OneViewConsole.Debug("Signature End", "CookingAndBlastChillingMonitoringFacade.Signature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.Signature", xlatService);
            }
        }

        var SignatureContent = function () {
            try {
                OneViewConsole.Debug("SignatureContent Start", "CookingAndBlastChillingMonitoringFacade.SignatureContent");

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
                });

                saveButton.addEventListener("click", function (event) {
                    if (signaturePad.isEmpty()) {
                        navigator.notification.alert("MN-RQ-NCF-001 :: Please provide signature first.", ['OK'], "");
                    } else {
                        MyInstance.SaveSignature('DCBoutNCSignature', signaturePad);
                    }
                });

                OneViewConsole.Debug("SignatureContent End", "CookingAndBlastChillingMonitoringFacade.SignatureContent");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                wrapper = null;
            }
        }

        ///Gets the probe connected or diconnected Status
        this.GetProbeStatus = function () {
            try {
                OneViewConsole.Debug("GetProbeStatus Start", "CookingAndBlastChillingMonitoringFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "CookingAndBlastChillingMonitoringFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.GetProbeStatus", xlatService);
            }
        }

        this.ShowTemperature = function (temp) {
            try {
                OneViewConsole.Debug("ShowTemperature Start", "CookingAndBlastChillingMonitoringFacade.ShowTemperature");

                MyInstance.oscope.NewDCModel.txtCookedByControlId = "xxxxxxx";
                MyInstance.oscope.$apply();
                //alert('ShowTemperature came');

                OneViewConsole.Debug("ShowTemperature End", "CookingAndBlastChillingMonitoringFacade.ShowTemperature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ShowTemperature", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
            try {
                //alert('SetAutoTemperatureListener');
                //alert(EventArg);
               // alert(TimeModelId);
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "CookingAndBlastChillingMonitoringFacade.SetAutoTemperatureListener");
                OneViewConsole.DataLog("modelName :" + EventArg, "CookingAndBlastChillingMonitoringFacade.SetAutoTemperatureListener");
                OneViewConsole.DataLog("TimeModelId :" + TimeModelId, "CookingAndBlastChillingMonitoringFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeModelId;

                OneViewConsole.Debug("SetAutoTemperatureListener End", "CookingAndBlastChillingMonitoringFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.SetAutoTemperatureListener", xlatService);
            }
            finally {
                modelName = null;
            }
        }

        /// <summary>
        /// Save Data capture    
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
                OneViewConsole.Debug("SaveDCRecords Start", "CookingAndBlastChillingMonitoringFacade.SaveDCRecords");

                var ModelIdForAutoTemperatureUpdation;
                var ModelIdForAutoTimeUpdation;
               // var response = true;
                _oDataCaptureBO.CreateDynamicElementHandler = CreateDynamicElements;
                if (DcId != null) {
                    var Status = _oDataCaptureBO.UpdateDC(DcId, undefined, _oDataCaptureBO.PreEditValues, IsSubmit);
                    if (Status != false) {
                        OneViewSessionStorage.Remove("DcId");
                        OneViewSessionStorage.Remove("NCInlineEdit");
                        _oDataCaptureBO.DCNCMappingList = new Array();
                        _oDataCaptureBO.DeleteNCEventHandler = false;
                        $scope['DCBoutNCSignature_IsModified'] = '';
                        $scope['DCBoutNCSignature_SignaturePad'] = '';
                        $location.url('/ViewRecords');

                    }

                    ModelIdForAutoTemperatureUpdation = 'NewDCModel.ATBlastChillerTempOutControlId';
                    ModelIdForAutoTimeUpdation = 'NewDCModel.DTBlastChillerTimeOutControlId';
                    SetSelectedTextBoxColor_Private('txtFinalRinseControlId');

                }
                else {
                    _oDataCaptureBO.SaveDC(IsSubmit);
                   // alert('response' + response);
                    _oDataCaptureBO.DCNCMappingList = new Array();
                    _oDataCaptureBO.DeleteNCEventHandler = false;
                    $scope['DCBoutNCSignature_IsModified'] = '';
                    $scope['DCBoutNCSignature_SignaturePad'] = '';
                    // $ionicSlideBoxDelegate.enableSlide(false);

                    ModelIdForAutoTemperatureUpdation = 'NewDCModel.ATBlastChillerTempInControlId';
                    ModelIdForAutoTimeUpdation = 'NewDCModel.DTBlastChillerTimeInControlId';
                    SetSelectedTextBoxColor_Private('txtFinalRinseControlId');


                }
                $scope.lblSignature = "";
                _oDataCaptureBO.ShowDCSummary();
                MyInstance.ShowNCButton();

                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = ModelIdForAutoTemperatureUpdation;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = ModelIdForAutoTimeUpdation;

               

                OneViewConsole.Debug("SaveDCRecords End", "CookingAndBlastChillingMonitoringFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.SaveDCRecords", xlatService);
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


        var Loadddl_OneViewAdv = function () {
            try {
                OneViewConsole.Debug("Loadddl_OneViewAdv Start", "CookingAndBlastChillingMonitoringFacade.Loadddl_OneViewAdv");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;
                
                var oPotMachineddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlPotMachineControlId', 'DataSourceModelName': 'PotMachine', 'DisplayElementModelName': 'NewDCModel.AddlPotMachineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_PotwashEquipement, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 538, 'SelectedIndexChangedEventHandler': oPotMachineSelectedIndexChanged });
                oPotMachineddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_PotwashEquipement, _TableNamesEnum.OrganizationAssetsNode);
                
                var oTrolleyMachineddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlTrolleyMachineControlId', 'DataSourceModelName': 'TrolleyMachine', 'DisplayElementModelName': 'NewDCModel.AddlTrolleyMachineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_TrollyeywashEquipement, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 539, 'SelectedIndexChangedEventHandler': oTrolleyMachineSelectedIndexChanged });
                oTrolleyMachineddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_TrollyeywashEquipement, _TableNamesEnum.OrganizationAssetsNode);
                
                var oDishwashMachineddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlDishwashMachineControlId', 'DataSourceModelName': 'DishwashMachine', 'DisplayElementModelName': 'NewDCModel.AddlDishwashMachineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_DishwashEquipement, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 540, 'SelectedIndexChangedEventHandler': oDishwashMachineSelectedIndexChanged });
                oDishwashMachineddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_DishwashEquipement, _TableNamesEnum.OrganizationAssetsNode);
                             
                OneViewConsole.Debug("Loadddl_OneViewAdv End", "CookingAndBlastChillingMonitoringFacade.Loadddl_OneViewAdv");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oPotMachineddl = null;
                oTrolleyMachineddl = null;
                oDishwashMachineddl = null;
            }

        }

        var oPotMachineSelectedIndexChanged = function (EventArgs) {
            try {
                //alert('EventArgs :' + JSON.stringify(EventArgs));

                OneViewConsole.Debug("oPotMachineSelectedIndexChanged Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.oPotMachineSelectedIndexChanged");
            
               // if (EventArgs.NewValue != undefined && EventArgs.NewValue != '') {
                    scope['TestType'] = [];
                    scope['TestType'].push({ Id: 63, Name: 'Thermo Label', 'Sequence': 1, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });
                    scope['TestType'].push({ Id: 64, Name: 'Quat Test', 'Sequence': 2, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });
                    scope['TestType'].push({ Id: 65, Name: 'Chlorine Test', 'Sequence': 3, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });

                    scope.ThermoLabelReadOnly = false;
                    scope['chkThermoLabel'].Clear();

               // }
                OneViewConsole.Debug("oPotMachineSelectedIndexChanged End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.oPotMachineSelectedIndexChanged");
            }
            catch (Excep) {
                // alert('oPotMachineSelectedIndexChanged Excep 11 ' + Excep);
                // alert('oPotMachineSelectedIndexChanged Excep 12 ' + JSON.stringify(Excep));
                throw Excep;
            }
        }


        var oTrolleyMachineSelectedIndexChanged = function (EventArgs) {
            try {
                //alert('EventArgs :' + JSON.stringify(EventArgs));

                OneViewConsole.Debug("oTrolleyMachineSelectedIndexChanged Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.oTrolleyMachineSelectedIndexChanged");
                      
                if ((EventArgs.NewValue != undefined && EventArgs.NewValue != '') && (EventArgs.NewValue.Name == "COLD KITCHEN TROLLEY WASH (1)" || EventArgs.NewValue.Name == "COLD KITCHEN TROLLEY WASH (2)")) {
                    scope['TestType'] = [];
                    scope['TestType'].push({ Id: 65, Name: 'Chlorine Test', 'Sequence': 3, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });

                }
                OneViewConsole.Debug("oTrolleyMachineSelectedIndexChanged End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.oTrolleyMachineSelectedIndexChanged");
            }
            catch (Excep) {
                // alert('oTrolleyMachineSelectedIndexChanged Excep 11 ' + Excep);
                // alert('oTrolleyMachineSelectedIndexChanged Excep 12 ' + JSON.stringify(Excep));
                throw Excep;
            }
        }

        var oDishwashMachineSelectedIndexChanged = function (EventArgs) {
            try {
                //alert('EventArgs :' + JSON.stringify(EventArgs));

                OneViewConsole.Debug("oDishwashMachineSelectedIndexChanged Start", "GoodsReceivingAndTemperatureVerificationRecordsFacade.oDishwashMachineSelectedIndexChanged");
                           
                if ((EventArgs.NewValue != undefined && EventArgs.NewValue != '') && (EventArgs.NewValue.Name == "HOBART   CR 1" || EventArgs.NewValue.Name == "HOBART   TC 1" || EventArgs.NewValue.Name == "HOBART   C 10")) {
                    scope['TestType'] = [];
                    scope['TestType'].push({ Id: 63, Name: 'Thermo Label', 'Sequence': 1, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });
                    scope['TestType'].push({ Id: 65, Name: 'Chlorine Test', 'Sequence': 3, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });
                    scope.FinalRinseHide = true;
                }
                else {
                    scope['TestType'] = [];
                    scope['TestType'].push({ Id: 63, Name: 'Thermo Label', 'Sequence': 1, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });
                    scope['TestType'].push({ Id: 64, Name: 'Quat Test', 'Sequence': 2, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });
                    scope['TestType'].push({ Id: 65, Name: 'Chlorine Test', 'Sequence': 3, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });
                }

                scope.ThermoLabelReadOnly = false;
                scope['chkThermoLabel'].Clear();

                OneViewConsole.Debug("oDishwashMachineSelectedIndexChanged End", "GoodsReceivingAndTemperatureVerificationRecordsFacade.oDishwashMachineSelectedIndexChanged");
            }
            catch (Excep) {
                //alert('oDishwashMachineSelectedIndexChanged Excep 11 ' + Excep);
               // alert('oDishwashMachineSelectedIndexChanged Excep 12 ' + JSON.stringify(Excep));
                throw Excep;
            }
        }

        var oProductddlSelectedIndexChanged = function (EventArgs) {
            try {              
                OneViewConsole.Debug("oProductddlSelectedIndexChanged Start", "CookingAndBlastChillingMonitoringFacade.oProductddlSelectedIndexChanged");
                if (EventArgs.NewValue.IsDynamicElement != true && EventArgs.NewValue.Id != "" && EventArgs.NewValue.Id != 0 && EventArgs.NewValue.Id.length != 36) {
                    var _oDefaultTreeDAO = new DefaultTreeDAO();
                    var ParentDetails = _oDefaultTreeDAO.GetParentById(EventArgs.NewValue.Id, 'OrganizationAssetsNode');
                 
                    if (ParentDetails.length > 0 && ParentDetails[0].ParentDbElementType == DATEntityType.RCOMaster_ProductType) {
                        var ProductTypeDetails = _oDefaultTreeDAO.GetNodeByIdAndType(ParentDetails[0].ParentNodeId, DATEntityType.RCOMaster_ProductType, 'OrganizationAssetsNode');
                        var ProductTypeValue = { Id: ProductTypeDetails[0].Id, Name: ProductTypeDetails[0].Name, IsDynamicElement: false };
                        $scope['AddlProductTypeControlId'].Set(ProductTypeValue);
                    }
                }

                else {
                    var ProductTypeValue = { Id: 0, Name: '', IsDynamicElement: false };
                    $scope['AddlProductTypeControlId'].Set(ProductTypeValue);
                }
               // MyInstance.Temperature_NgKeyUp(34, 'AddlProductTypeControlId', '', 'true')

                OneViewConsole.Debug("oProductddlSelectedIndexChanged End", "CookingAndBlastChillingMonitoringFacade.oProductddlSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                _oDefaultTreeDAO = null;
                ParentDetails = null;
                ProductTypeDetails = null;
                ProductTypeValue = null;
            }
        }


        var oFlightSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oFlightSelectedIndexChanged Start", "CookingAndBlastChillingMonitoringFacade.oFlightSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {
                    var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10, });
                    oAirlinesddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
                    if (DcId == null) {
                        oAirlinesddl.Clear();
                    }
                }
                else {
                    var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10, });
                    oAirlinesddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
                }

                OneViewConsole.Debug("oFlightSelectedIndexChanged End", "CookingAndBlastChillingMonitoringFacade.oFlightSelectedIndexChanged");
            }
            catch (Excep) {              
                throw Excep;
            }
            finally {
                oAirlinesddl = null;                
            }
        }


        var CreateDynamicElements = function (_DcResultDetailsEntityLst) {
            try {
                OneViewConsole.Debug("CreateDynamicElements Start", "CookingAndBlastChillingMonitoringFacade.CreateDynamicElements");

                var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");
                for (var i = 0; i < _DcResultDetailsEntityLst.length; i++) {
                    if (_DcResultDetailsEntityLst[i].IsDynamicAnswer == 'true') {

                        var ParentNodeId = DCPlaceNodeId;;
                        var ParentDbElementType = DATEntityType.RCOMaster_Kitchen;;
                        var ParentDbElementId;

                        //var ParentNodeId;
                        //var ParentDbElementType;
                        //var ParentDbElementId;
                        //var ProductTypeNodeId;
                        //if (_DcResultDetailsEntityLst[i].AttributeNodeId == 4)//for product
                        //{
                        //    ProductTypeNodeId = GetProductType(_DcResultDetailsEntityLst);
                        //    if (ProductTypeNodeId == 0) {
                        //        ParentNodeId = DCPlaceNodeId;
                        //        ParentDbElementType = DATEntityType.RCOMaster_Kitchen;
                        //    }
                        //    else {
                        //        ParentNodeId = ProductTypeNodeId;
                        //        ParentDbElementType = DATEntityType.RCOMaster_ProductType;
                        //    }
                        //}
                        //else {
                        //    ParentNodeId = DCPlaceNodeId;
                        //    ParentDbElementType = DATEntityType.RCOMaster_Kitchen;
                        //}

                        var Response;
                        var _oDynamicElementBO = new DynamicElementBO();

                        if (_DcResultDetailsEntityLst[i].AttributeNodeId == 4)//for product
                        {
                            Response = _oDynamicElementBO.AddDynamicOrder(_DcResultDetailsEntityLst[i], ParentNodeId, ParentDbElementType, ParentDbElementId, '', DATEntityType.RCO_WorkOrder, '92685');
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

                OneViewConsole.Debug("CreateDynamicElements End", "CookingAndBlastChillingMonitoringFacade.CreateDynamicElements");
            }
            catch (Excep) {
               // alert(Excep);
              //  alert(JSON.stringify(Excep));
                throw Excep;
            }
            finally {
                DCPlaceNodeId = null;
                ParentNodeId = null;
                ParentDbElementType = null;
                ParentDbElementId = null;
                ProductTypeNodeId = null;
                oDefaultTreeDAO = null;
                ParentDbElement = null;
                LabelId = null;
                _oDynamicElementBO = null;
                Response = null;
            }
        }

        var GetProductType = function (DcResultDetailsEntityLst) {
            try {
                OneViewConsole.Debug("GetProductType Start", "CookingAndBlastChillingMonitoringFacade.GetProductType");

                for (var i = 0; i < DcResultDetailsEntityLst.length; i++) {
                    if (DcResultDetailsEntityLst[i].AttributeNodeId == 5)//for product type
                    {
                        return DcResultDetailsEntityLst[i].Answer;
                    }
                }

                OneViewConsole.Debug("GetProductType End", "CookingAndBlastChillingMonitoringFacade.GetProductType");
            }
            catch (Excep) {
                throw Excep;
            }
        }

        this.NotifyTemperature = function (Scope, TemperatureInfo) {
            try {
                OneViewConsole.Debug("NotifyTemperature Start", "CookingAndBlastChillingMonitoringFacade.NotifyTemperature");

                Scope.NewDCModel[Scope.CurrentCell] = parseFloat(TemperatureInfo.Temperature);
                Scope.$apply();

                OneViewConsole.Debug("NotifyTemperature End", "CookingAndBlastChillingMonitoringFacade.NotifyTemperature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.NotifyTemperature", xlatService);
            }
        }

        //************* Bout NC Jobs Start****************
        
        this.ShowNCFormActionOLD = function (ControlId) {
            try {
                OneViewConsole.Debug("ShowNCFormAction Start", "CookingAndBlastChillingMonitoringFacade.ShowNCFormAction");
              
                var TempOutNCTemplate = TemplateMetaData[ServiceId][NCTemplateDetails.TemplateId];
                var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': NCTemplateDetails.TemplateId, 'TemplateName': NCTemplateDetails.TemplateName });
                _oNCDcDataCaptureBO.ClearControls(TempOutNCTemplate);
                if (((ControlId == 'ATBlastChillerTempOutControlId' && $scope.NewDCModel.ATBlastChillerTempOutControlId > '5') || (ControlId == 'ATPreChillerTempOutControlId' && $scope.NewDCModel.ATPreChillerTempOutControlId > '5')) && $scope.NewDCModel.AddlProductControlId != '') {
                    //$ionicSlideBoxDelegate.enableSlide(true);
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
                                $scope.DivContent = false;
                                $scope.DivSignature = false;
                                xlatService.setCurrentPage('WashNC_Page');

                                var SelectedTime = document.getElementById('DTBlastChillerTimeOutControlId');
                                SetTimeInFormat(SelectedTime, 'DTBlastChillerTimeOutControlId');

                                $scope.$apply();
                            }
                            else
                            {
                                MyInstance.ShowNCButton();
                                $scope.$apply();
                            }
                        });
                     
                    }
                }
                else if ((ControlId == 'ATBlastChillerTempOutControlId' && $scope.NewDCModel.ATBlastChillerTempOutControlId < '5') || (ControlId == 'ATPreChillerTempOutControlId' && $scope.NewDCModel.ATPreChillerTempOutControlId < '5')) {
                    // $ionicSlideBoxDelegate.enableSlide(false);
                    $scope.DivNC = false;
                    if (DcId != null) {
                        var NCDCId = _oNCDcDataCaptureBO.GetNCDcID(DcId);
                        if (NCDCId != undefined) {
                            //Deletion code;
                            _oDataCaptureBO.DeleteNCEventHandler = true;

                        }
                    }
                }
                //MyInstance.ShowNCButton();

                OneViewConsole.Debug("ShowNCFormAction End", "CookingAndBlastChillingMonitoringFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ShowNCFormAction", xlatService);
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

        var BindNCLoadDatas = function () {
            try {
                OneViewConsole.Debug("BindNCLoadDatas Start", "CookingAndBlastChillingMonitoringFacade.BindNCLoadDatas");

               // alert('BindNCLoadDatas');
                var TempOutNCTemplate = TemplateMetaData[ServiceId][_oDataCaptureBO.NCTemplateId];
                var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': _oDataCaptureBO.NCTemplateId, 'TemplateName': _oDataCaptureBO.NCTemplateName });
                _oNCDcDataCaptureBO.ClearControls(TempOutNCTemplate);
                var NCDCId = _oNCDcDataCaptureBO.GetNCDcID(DcId);
                if (NCDCId != undefined) {
                    _oNCDcDataCaptureBO.LoadEditPage(NCDCId, $scope);
                    _oDataCaptureBO.NCPreEditDataList = _oNCDcDataCaptureBO.PreEditValues;
                }

                OneViewConsole.Debug("BindNCLoadDatas End", "CookingAndBlastChillingMonitoringFacade.BindNCLoadDatas");
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
        
        this.BeforeSaveDCEventJob = function (EventArgsDataCaptureBO) {
            try {
                OneViewConsole.Debug("BeforeSaveDCEventJob Start", "CookingAndBlastChillingMonitoringFacade.BeforeSaveDCEventJob");

                SetBOutNCMapping_BeforeSaveDCEvent(EventArgsDataCaptureBO);

                OneViewConsole.Debug("BeforeSaveDCEventJob End", "CookingAndBlastChillingMonitoringFacade.BeforeSaveDCEventJob");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.BeforeSaveDCEventJob", xlatService);
            }
        }

        //Eject Save NC to the event handler
        ////_oDataCaptureBO.BeforeSaveDCEventHandler = MyInstance.BeforeSaveDCEventJob;
        
        var SetBOutNCMapping_BeforeSaveDCEvent = function (EventArgsDataCaptureBO) {
            try {
                OneViewConsole.Debug("SetBOutNCMapping_BeforeSaveDCEvent Start", "CookingAndBlastChillingMonitoringFacade.SetBOutNCMapping_BeforeSaveDCEvent");
                if ($scope.NewDCModel.ATBlastChillerTempOutControlId > '5' && $scope.NewDCModel.AddlProductControlId != '') {
                    var TempOutNCTemplate = TemplateMetaData[ServiceId][NCTemplateDetails.TemplateId];
                    var ActionContext = DATActionContext.DataCapture;
                    var oDCNCMappingBO = new DCNCMappingBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': NCTemplateDetails.TemplateId, 'TemplateName': NCTemplateDetails.TemplateName });
                    var oDCNCStatus = oDCNCMappingBO.GetNCFormAction(3, 'true', TempOutNCTemplate, ActionContext);
                    CheckRuleIdExist(oDCNCStatus);
                }
                else if ($scope.NewDCModel.ATPreChillerTempOutControlId > '5' && $scope.NewDCModel.AddlProductControlId != '') {
                    var TempOutNCTemplate = TemplateMetaData[ServiceId][NCTemplateDetails.TemplateId];
                    var ActionContext = DATActionContext.DataCapture;
                    var oDCNCMappingBO = new DCNCMappingBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': NCTemplateDetails.TemplateId, 'TemplateName': NCTemplateDetails.TemplateName });
                    var oDCNCStatus = oDCNCMappingBO.GetNCFormAction(4, 'true', TempOutNCTemplate, ActionContext);
                    CheckRuleIdExist(oDCNCStatus);
                }

                OneViewConsole.Debug("SetBOutNCMapping_BeforeSaveDCEvent End", "CookingAndBlastChillingMonitoringFacade.SetBOutNCMapping_BeforeSaveDCEvent");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                TempOutNCTemplate = null;
                ActionContext = null;
                oDCNCMappingBO = null;
                oDCNCStatus = null;
            }
        }

        var CheckRuleIdExist = function (oDCNCStatus) {
            try {
                OneViewConsole.Debug("CheckRuleIdExist Start", "CookingAndBlastChillingMonitoringFacade.CheckRuleIdExist");

                if (_oDataCaptureBO.DCNCMappingList.length > 0) {
                    for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                        if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == oDCNCStatus.NCRuleId) {
                            _oDataCaptureBO.DCNCMappingList[r].NCRuleId = oDCNCStatus.NCRuleId;
                            _oDataCaptureBO.DCNCMappingList[r].IsNC = oDCNCStatus.IsNC;
                            _oDataCaptureBO.DCNCMappingList[r].oActionEntity = oDCNCStatus.oActionEntity;
                            break;
                        }
                    }
                }
                else {
                    _oDataCaptureBO.DCNCMappingList.push(oDCNCStatus);
                }

                OneViewConsole.Debug("CheckRuleIdExist End", "CookingAndBlastChillingMonitoringFacade.CheckRuleIdExist");
            }
            catch (Excep) {
                throw Excep;
            }
        }

        //this.BeforeUpdateDCEventJob = function (EventArgsDataCaptureBO) {
        //    try {
        //        OneViewConsole.Debug("BeforeSaveDCEventJob Start", "CookingAndBlastChillingMonitoringFacade.BeforeSaveDCEventJob");

        //        if ($scope.NewDCModel.ATBlastChillerTempOutControlId > '5' || $scope.NewDCModel.ATPreChillerTempOutControlId > '5') {
        //            SetBOutNCMapping_BeforeSaveDCEvent(EventArgsDataCaptureBO);
        //        }

        //        OneViewConsole.Debug("BeforeSaveDCEventJob End", "CookingAndBlastChillingMonitoringFacade.BeforeSaveDCEventJob");
        //    }
        //    catch (Excep) {
        //        oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.BeforeSaveDCEventJob", xlatService);
        //    }
        //}

        //var SetBOutNCMapping_BeforeUpdateDCEvent = function (EventArgsDataCaptureBO) {
        //    try {
        //        OneViewConsole.Debug("SetBOutNCMapping_BeforeUpdateDCEvent Start", "CookingAndBlastChillingMonitoringFacade.SetBOutNCMapping_BeforeUpdateDCEvent");

        //        if (DcId != null) {
        //            var NCDCId = EventArgsDataCaptureBO.GetNCDcID(DcId);
        //            if (NCDCId != undefined) {
        //            }
        //            else {
        //                SetBOutNCMapping_BeforeSaveDCEvent(EventArgsDataCaptureBO);
        //            }
        //        }

        //        OneViewConsole.Debug("SetBOutNCMapping_BeforeUpdateDCEvent End", "CookingAndBlastChillingMonitoringFacade.SetBOutNCMapping_BeforeUpdateDCEvent");
        //    }
        //    catch (Excep) {
        //        throw Excep;
        //    }
        //    finally {
        //        NCDCId = null;
        //    }
        //}

        //Eject Update NC to the event handler
       //// _oDataCaptureBO.BeforeUpdateDCEventHandler = MyInstance.BeforeUpdateDCEventJob;

        //************* Bout NC Jobs End****************

        //Create DataCaptureBO for BoutNC Form
        //here override SetEditValuesInControls ,to solving prepopulated value issues
        var GetBoutNCDataCaptureBO = function (ConstrParm)
        {
            try {
                OneViewConsole.Debug("GetBoutNCDataCaptureBO Start", "CookingAndBlastChillingMonitoringFacade.GetBoutNCDataCaptureBO");

                BOUTNCDataCaptureBO.prototype = new DataCaptureBO(ConstrParm);

                //override SetEditValuesInControls ,for solving prepopulated value issues in Bout NC form
                BOUTNCDataCaptureBO.prototype.SetEditValuesInControls = function (scope, AnswerModeObject, AnswerToBind) {
                    try {
                        OneViewConsole.Debug("SetEditValuesInControls Start", "CookingAndBlastChillingMonitoringFacade.GetBoutNCDataCaptureBO.SetEditValuesInControls");

                       
                        if (AnswerModeObject.Type == 'DDL') {
                        }
                        else if (AnswerModeObject.ControlId == "ATBlastChillerTempOutControlId") {
                        }
                        else if (AnswerModeObject.ControlId == 'DTBlastChillerTimeOutControlId') {
                        }
                        else if (AnswerModeObject.ControlId == 'DTBlastChillerTimeOutControlId') {
                        }
                        else if ((AnswerModeObject.DataType == 'DATAURL') && (AnswerToBind.Answer != '')) {
                            $scope.lblSignature = "Signed " + AnswerToBind.LastUpdatedDate;
                        }
                        else if (AnswerModeObject.Type == 'TIME') {
                            if (AnswerToBind.Answer != "") {
                               
                                //var Time = AnswerToBind.Answer.split(" ")[1].split(':');
                                //scope.NewDCModel[AnswerModeObject.ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
                                document.getElementById(AnswerModeObject.ControlId).value = AnswerToBind.Answer.split(" ")[1]; //take time 
                                scope.NewDCModel[AnswerModeObject.ControlId] = document.getElementById(AnswerModeObject.ControlId).value;
                              
                            }
                        }
                        else if (AnswerModeObject.Type == 'DATE') {
                            if (AnswerToBind.Answer != "") {
                              
                                var date = AnswerToBind.Answer.split('-');
                                scope.NewDCModel[AnswerModeObject.ControlId] = new Date(date[2], date[1] - 1, date[0]);
                               
                                //document.getElementById(AnswerModeObject.ControlId).value = AnswerToBind.Answer.split("-")[1]; //take date 
                                //scope.NewDCModel[AnswerModeObject.ControlId] = document.getElementById(AnswerModeObject.ControlId).value;
                            }
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

                            if (_oPrimarayAnswerModeInfo.ControlId == "ATBlastChillerTempOutControlId") {
                            }
                            else if (_oPrimarayAnswerModeInfo.ControlId == 'txtFinalRinseControlId') {
                            }
                            else if (_oPrimarayAnswerModeInfo.Type == 'DDL') {
                            }
                            else if (_oPrimarayAnswerModeInfo.ControlId == 'DTBlastChillerTimeOutControlId') {
                            }
                            else if (_oPrimarayAnswerModeInfo.ControlId == 'chkTestType') {
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

        //_oDataCaptureBO.SetAutoTemperatureEventHandler = MyInstance.ShowNCFormAction;

        
        this.OnTime_Change = function (SelectedControlId,IsNc) {
            try {
                //alert('OnTime_Change');
                OneViewConsole.Debug("OnTime_Change Start", "CookingAndBlastChillingMonitoringFacade.OnTime_Change");

                //alert('OnTime_Change :' + IsNc);
                //if (IsNc == true) {
                //    if (SelectedControlId != 'DTBlastChillerTimeOutControlId' && SelectedControlId != 'DTPreChillerTimeOutControlId')
                //        CheckCooking_ChillerTimeDiffNC(SelectedControlId);

                //    if (SelectedControlId != 'DTCookingTimeControlId')
                //        CheckPre_BlastChilliingNC(SelectedControlId);
                //}
                
                OneViewConsole.Debug("OnTime_Change End", "CookingAndBlastChillingMonitoringFacade.OnTime_Change");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.OnTime_Change", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

    //Rule 1 for - 30 mins
        var CheckCooking_ChillerTimeDiffNC = function (SelectedControlId) {
            try {
               // alert('CheckCooking_ChillerTimeDiffNC');
                var isNC = false;

                var DTCookingTime =((document.getElementById('DTCookingTimeControlId') !=null) ? document.getElementById('DTCookingTimeControlId').value : "");
                var DTBlastChillerTimeIn =((document.getElementById('DTBlastChillerTimeInControlId') !=null) ? document.getElementById('DTBlastChillerTimeInControlId').value : "") ;
                var DTPreChillerTimeIn =((document.getElementById('DTPreChillerTimeInControlId') !=null) ? document.getElementById('DTPreChillerTimeInControlId').value : "") ;

                //alert(DTCookingTime);
                //alert(DTBlastChillerTimeIn);
                //alert(DTPreChillerTimeIn);

                if (DTPreChillerTimeIn != "" && DTCookingTime != "" && DTCookingTime > DTPreChillerTimeIn) {
                    var temp = parseInt(DTPreChillerTimeIn.split(":")[0]) + 24;
                    DTPreChillerTimeIn = temp + ":" + DTPreChillerTimeIn.split(":")[1];
                }

                if (DTBlastChillerTimeIn != "" && DTCookingTime != "" && DTCookingTime > DTBlastChillerTimeIn) {
                    var temp = parseInt(DTBlastChillerTimeIn.split(":")[0]) + 24;
                    DTBlastChillerTimeIn = temp + ":" + DTBlastChillerTimeIn.split(":")[1];
                }

                var DTBlastChillerTimeInSplitted;
                var DTBlastChiller;
                if (DTBlastChillerTimeIn != '' && DTBlastChillerTimeIn != undefined) {
                    DTBlastChillerTimeInSplitted = DTBlastChillerTimeIn.split(":");
                    var temp1 = new Date();
                    DTBlastChiller = temp1.setHours(DTBlastChillerTimeInSplitted[0], DTBlastChillerTimeInSplitted[1], 0);
                }

                var DTPreChillerTimeInSplitted;
                var DTPreChiller;
                if (DTPreChillerTimeIn != '' && DTPreChillerTimeIn != undefined) {
                    DTPreChillerTimeInSplitted = DTPreChillerTimeIn.split(":");
                    var temp2 = new Date();
                    DTPreChiller = temp2.setHours(DTPreChillerTimeInSplitted[0], DTPreChillerTimeInSplitted[1], 0);
                }

                var DTCookingTimeSplitted;
                var DTCooking;
                if (DTCookingTime != '' && DTCookingTime != undefined) {
                    DTCookingTimeSplitted = DTCookingTime.split(":");
                    var temp3 = new Date();
                    DTCooking = temp3.setHours(DTCookingTimeSplitted[0], DTCookingTimeSplitted[1], 0);
                }

                var Pre_CookingTimeDiff;
                if (DTPreChiller != undefined && DTCooking != undefined) {
                    var temp4 = DTPreChiller - DTCooking;
                    Pre_CookingTimeDiff = temp4 / (60000)
                }

                var BlastIn_CookingTimeDiff;
                if (DTBlastChiller != undefined && DTCooking != undefined) {
                    var temp5 = DTBlastChiller - DTCooking;
                    BlastIn_CookingTimeDiff = temp5 / (60000)
                }
                //alert('Pre_CookingTimeDiff :' + Pre_CookingTimeDiff);
                //alert('BlastIn_CookingTimeDiff :' + BlastIn_CookingTimeDiff);


                if (DTCookingTime != '') {
                    if (DTPreChillerTimeIn != '') {
                        if (Pre_CookingTimeDiff > 30) {
                            isNC = true;
                            //Pre-chiller Time In is expected to be 30 minutes less than Cooking Time 
                            if (SelectedControlId != 'DTBlastChillerTimeInControlId')
                                navigator.notification.alert(xlatService.xlat('Pre_CookingTimeNCMsg'), ['OK'], "");
                        }
                    }
                    else if (DTBlastChillerTimeIn != '') {
                        //Blast Chiller Time In is expected to be 30 minutes less than Cooking Time 
                        if (BlastIn_CookingTimeDiff > 30) {
                            isNC = true;
                            navigator.notification.alert(xlatService.xlat('BlastIn_CookingTimeNCMsg'), ['OK'], "");
                        }
                    }
                }
               
                var DCNCMappingListData = [];
                var DCNCMappingData = { NCRuleId: '50', IsNC: isNC }

                //alert('DCNCMappingData for 30 mins' + JSON.stringify(DCNCMappingData));
                DCNCMappingListData.push(DCNCMappingData);
                NormalizeNCEntityListData(DCNCMappingListData);

            }
            catch (Excep) {
               // alert('CheckCooking_ChillerTimeDiffNC 1 Excep' + Excep);
               // alert('CheckCooking_ChillerTimeDiffNC 1 Excep' + JSON.stringify(Excep));
                throw Excep;
            }
            finally {
            }
        }

        var SHowNCMessage = function () {
            navigator.notification.alert('Max 30 mins allowed after time of cooking', ['OK'], "");
        }



    //Rule 2 for - 4 hours
        var CheckPre_BlastChilliingNC = function (SelectedControlId) {
            try {
               // alert('CheckPre_BlastChilliingNC here');
                var isNC = false;

                var DTPreChillerTimeIn =((document.getElementById('DTPreChillerTimeInControlId') != null) ? document.getElementById('DTPreChillerTimeInControlId').value : "");
                var DTPreChillerTimeOut = ((document.getElementById('DTPreChillerTimeOutControlId') != null) ? document.getElementById('DTPreChillerTimeOutControlId').value : "");
                var DTBlastChillerTimeIn = ((document.getElementById('DTBlastChillerTimeInControlId') != null) ? document.getElementById('DTBlastChillerTimeInControlId').value : "");
                var DTBlastChillerTimeOut =((document.getElementById('DTBlastChillerTimeOutControlId') != null) ? document.getElementById('DTBlastChillerTimeOutControlId').value : "");


                if (DTPreChillerTimeIn != "" && DTPreChillerTimeOut != "" && DTPreChillerTimeIn > DTPreChillerTimeOut) {
                    var temp = parseInt(DTPreChillerTimeOut.split(":")[0]) + 24;
                    DTPreChillerTimeOut = temp + ":" + DTPreChillerTimeOut.split(":")[1];
                }

                if (DTBlastChillerTimeIn != "" && DTBlastChillerTimeOut != "" && DTBlastChillerTimeIn > DTBlastChillerTimeOut) {
                    var temp = parseInt(DTBlastChillerTimeOut.split(":")[0]) + 24;
                    DTBlastChillerTimeOut = temp + ":" + DTBlastChillerTimeOut.split(":")[1];
                }

                if (DTPreChillerTimeIn != "" && DTBlastChillerTimeOut != "" && DTPreChillerTimeIn > DTBlastChillerTimeOut) {
                    var temp = parseInt(DTBlastChillerTimeOut.split(":")[0]) + 24;
                    DTBlastChillerTimeOut = temp + ":" + DTBlastChillerTimeOut.split(":")[1];
                }

                var DTPreChillerTimeInSplitted;
                var DTPreChillerTimeInMSec;
                if (DTPreChillerTimeIn != '' && DTPreChillerTimeIn != undefined) {
                    DTPreChillerTimeInSplitted = DTPreChillerTimeIn.split(":");
                    var temp1 = new Date();
                    DTPreChillerTimeInMSec = temp1.setHours(DTPreChillerTimeInSplitted[0], DTPreChillerTimeInSplitted[1], 0);
                }

                var DTPreChillerTimeOutSplitted;
                var DTPreChillerTimeOutMSec;
                if (DTPreChillerTimeOut != '' && DTPreChillerTimeOut != undefined) {
                    DTPreChillerTimeOutSplitted = DTPreChillerTimeOut.split(":");
                    var temp2 = new Date();
                    DTPreChillerTimeOutMSec = temp2.setHours(DTPreChillerTimeOutSplitted[0], DTPreChillerTimeOutSplitted[1], 0);
                }

                var DTBlastChillerTimeInSplitted;
                var DTBlastChillerTimeInMSec;
                if (DTBlastChillerTimeIn != '' && DTBlastChillerTimeIn != undefined) {
                    DTBlastChillerTimeInSplitted = DTBlastChillerTimeIn.split(":");
                    var temp3 = new Date();
                    DTBlastChillerTimeInMSec = temp3.setHours(DTBlastChillerTimeInSplitted[0], DTBlastChillerTimeInSplitted[1], 0);
                }

                var DTBlastChillerTimeOutSplitted;
                var DTBlastChillerTimeOutMSec;
                if (DTBlastChillerTimeOut != '' && DTBlastChillerTimeOut != undefined) {
                    DTBlastChillerTimeOutSplitted = DTBlastChillerTimeOut.split(":");
                    var temp4 = new Date();
                    DTBlastChillerTimeOutMSec = temp4.setHours(DTBlastChillerTimeOutSplitted[0], DTBlastChillerTimeOutSplitted[1], 0);
                }


                //Time Diff between PreTimeIn and PreTimeOut
                var Pre_InOutTimeDiff;
               // alert('DTPreChillerTimeIn : ' + DTPreChillerTimeIn);
                if (DTPreChillerTimeIn != undefined && DTPreChillerTimeOut != undefined) {
                    var temp5 = DTPreChillerTimeOutMSec - DTPreChillerTimeInMSec;
                    Pre_InOutTimeDiff = temp5 / (60000);
                }

                //Time Diff between BlastTimeIn and BlastTimeOut
                var Blast_InOutTimeDiff;
                if (DTBlastChillerTimeIn != undefined && DTBlastChillerTimeOut != undefined) {
                    var temp6 = DTBlastChillerTimeOutMSec - DTBlastChillerTimeInMSec;
                    Blast_InOutTimeDiff = temp6 / (60000);
                }

                //Time Diff between BlastTimeOut and PreTimeIn
                var PreIn_BlastOutTimeDiff;
                if (DTPreChillerTimeIn != undefined && DTBlastChillerTimeOut != undefined) {
                    var temp7 = DTBlastChillerTimeOutMSec - DTPreChillerTimeInMSec;
                    PreIn_BlastOutTimeDiff = temp7 / (60000);
                }

                //alert('Pre_InOutTimeDiff : ' + Pre_InOutTimeDiff);
               // alert('Blast_InOutTimeDiff : ' + Blast_InOutTimeDiff);
              //  alert('PreIn_BlastOutTimeDiff : ' + PreIn_BlastOutTimeDiff);



                if (DTPreChillerTimeIn != undefined && DTPreChillerTimeIn != '') {
                    // 240 mins i.e 4 hours
                    if (DTPreChillerTimeOut != undefined && Pre_InOutTimeDiff > 240) {
                       // alert('1');
                        isNC = true;
                        //show message
                        //Pre-chiller Time Out is expected to be less than 4 hours 
                        if (SelectedControlId != 'DTBlastChillerTimeInControlId' && SelectedControlId != 'DTBlastChillerTimeOutControlId')
                            navigator.notification.alert(xlatService.xlat('Pre_InOutTimeNCMsg'), ['OK'], "");
                    }

                    else if (DTBlastChillerTimeOut != undefined && DTBlastChillerTimeOut != ''  && PreIn_BlastOutTimeDiff > 240) {
                       // alert('2');
                        isNC = true;
                        //show message
                        //Blast Chiller Time Out is expected to be less than 4 hours 
                        if (SelectedControlId != 'DTPreChillerTimeOutControlId' && SelectedControlId != 'DTBlastChillerTimeInControlId')
                            navigator.notification.alert(xlatService.xlat('PreIn_BlastOutTimeNCMsg'), ['OK'], "");

                    }
                }

                else if (DTBlastChillerTimeIn != undefined && DTBlastChillerTimeIn != '') {
                    //alert('3');
                    if (DTBlastChillerTimeOut != undefined && DTBlastChillerTimeOut != '' && Blast_InOutTimeDiff > 240) {
                        //alert('4');
                        isNC = true;
                        //show message
                        //Blast Chiller Time Out is expected to be less than 4 hours 
                        if (SelectedControlId != 'DTPreChillerTimeInControlId' && SelectedControlId != 'DTPreChillerTimeOutControlId')
                            navigator.notification.alert(xlatService.xlat('Blast_InOutTimeNCMsg'), ['OK'], "");
                    }
                }



                var DCNCMappingListData = [];
                var DCNCMappingData = { NCRuleId: '209', IsNC: isNC }

                //alert('DCNCMappingData for 4 hours' + JSON.stringify(DCNCMappingData))
                DCNCMappingListData.push(DCNCMappingData);
                NormalizeNCEntityListData(DCNCMappingListData);

            }
            catch (Excep) {
                //alert('CheckPre_BlastChilliingNC 2 Excep' + Excep);
               // alert('CheckPre_BlastChilliingNC 2 Excep' + JSON.stringify(Excep));
                throw Excep;
            }
            finally {
            }
        }

        var ShowPreBlastChillerNCMessage = function () {
            navigator.notification.alert('Max 4 hours allowed in pre/blast chiller', ['OK'], "");
        }



        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.NgKeyUp", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.AppendNCHtml", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.AppendObservationHtml", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.CloseRightPanel", xlatService);
            }
        }

        this.PreControlEvents = function (AttributeId, ControlId, $event) {
            try {

                _oDataCaptureBO.PreControlEvents(AttributeId, ControlId, $event);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.PreControlEvents", xlatService);
            }
        }

        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.PreControlEvents", xlatService);
            }
        }

        this.ngChange_setDateTime = function (ControlId) {
            try {
                var oDateTime = new DateTime();
                var time = document.getElementById(ControlId).value;
                //   alert($scope[ControlId]);
                if (time != "" && time != undefined && time != null) {
                    if ($scope[ControlId + "_DateTime"] != null && $scope[ControlId + "_DateTime"] != '') {
                        $scope[ControlId + "_DateTime"] = $scope[ControlId + "_DateTime"].split(' ')[0] + " " + time;
                    }
                    else {
                        //$scope["NewDCModel." + ControlId + "_DateTime"] = oDateTime.GetDate() + " " + time;
                        $scope[ControlId + "_DateTime"] = oDateTime.GetDate() + " " + time;
                    }
                }
                else {
                    $scope[ControlId + "_DateTime"] = "";
                }
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingVerificationFacade.ngChange_setDateTime", xlatService);
            }
        }

        this.ClearReasons = function () {
            try{
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ClearReasons", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.ProbeTesting", xlatService);
            }
        }
       
}


function BOUTNCDataCaptureBO() {

}







