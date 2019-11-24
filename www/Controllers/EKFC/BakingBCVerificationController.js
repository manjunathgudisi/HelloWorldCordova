var scope = null;
var ionicBackdrop = null;
var Timeout = 1000;
var oSnapRemote = null;


MyApp.controller('BakingBCVerificationController',
    function ($scope, $document, $location, xlatService, $timeout, $templateCache, snapRemote, $compile) {
       // oSetDefaultSpinner.Start();
        scope = $scope;
        oSnapRemote = snapRemote;
        var NCForm_Page = 'T66';
        //ionicBackdrop = $ionicBackdrop;
        //xlatService.setCurrentPage('BakingBCVerification');
        var currentPage = 'T' + OneViewSessionStorage.Get("TemplateId");
        xlatService.setCurrentPage(currentPage, true);
        document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
        var oBakingBCVerificationFacade =
            new BakingBCVerificationFacade({ 'scope': $scope, 'document': $document, 'location': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', '$timeout': $timeout, 'compile': $compile });

        oBakingBCVerificationFacade.Init();
        oBakingBCVerificationFacade.PageLoad(); 
        //oSetDefaultSpinner.Stop();
        //$scope.$on('$viewContentLoaded', function (event, current, previous, rejection) {
        //    clearCache($timeout, $location, $templateCache);
        //});
        if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
            $scope.DivNGForm = true;
            $scope.DivContent = false;
            $scope.DivSignature = false;
            $scope.HideNcCancelBtn = true;
            $scope.DisableBack = true;
            xlatService.setCurrentPage(NCForm_Page, true);
            
            $scope.$apply();
        }
        else
        {
            // xlatService.setCurrentPage('BakingBCVerification');
            xlatService.setCurrentPage(currentPage, true);
            $scope.DivNGForm = false;
            $scope.DivContent = true;
            $scope.DivSignature = false;
        }
      
        $scope.HideNC = function () {
            if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                $location.url('/ViewRecords');
            }
            else {
                $scope.DivNGForm = false;
                $scope.DivContent = true;
                //  xlatService.setCurrentPage('BakingBCVerification');
                xlatService.setCurrentPage(currentPage, true);
            }
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
            xlatService.RemoveCurrentPageMetadata(NCForm_Page);
        });

        $scope.SetSelectedTextBoxColor = function (ControlId) {
            oBakingBCVerificationFacade.SetSelectedTextBoxColor(ControlId);
        }

        $scope.ShowNCPage = function ()
        {
            xlatService.setCurrentPage(NCForm_Page, true);
            $scope.DivNGForm = true;
            $scope.DivContent = false;
            $scope.DivSignature = false;
            $scope.DivNC = false;
        }


        $scope.GetProbeStatus = function () {
            oBakingBCVerificationFacade.GetProbeStatus();
        };


        $scope.AddRecords = function () {
            oBakingBCVerificationFacade.SaveDCRecords();
        };

       
        $scope.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
            oBakingBCVerificationFacade.SetAutoTemperatureListener(EventArg, TimeModelId);
        };
        $scope.divShow = true;
        $scope.ViewRecords = function () {

            var _oDcDAO = new DcDAO();
            var TotalDcCount = _oDcDAO.GetTotalAuditCount(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("TemplateId"), OneViewSessionStorage.Get("DcPlaceId"), OneViewSessionStorage.Get("DcPlaceName"));


            if (TotalDcCount > 0) {
                scope = null;
                //ionicBackdrop = null;
                OneViewSessionStorage.Remove("NCInlineEdit");
                OneViewSessionStorage.Remove("MyAuditEditForm");
                $location.path('/ViewRecords');
            }
            else {              
                //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('No_Records_Available'));
                alert(xlatService.xlat('No_Records_Available'));
            }
        };

        $scope.ngChange_setIsManualFlag = function (ControlId) {
            oBakingBCVerificationFacade.ngChange_setIsManualFlag(ControlId);
        }


        $scope.SaveNCAction = function () {            
            oBakingBCVerificationFacade.SetNCFormAction();
        }
        $scope.ClosePopUp = function () {

        }
        $scope.CloseSignature = function () {
            // $ionicSlideBoxDelegate.previous();
            $scope.DivNGForm = true;
            $scope.DivContent = false;
            $scope.DivSignature = false;
        }

        $scope.toggle = false;

        var lastTimeOutId = null;
        $scope.Temperature_NgKeyUp = function (AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId) {

            $scope.DisableSave = true;
            $scope.DisableSaveSubmit = true;
            if (lastTimeOutId != null)
                $timeout.cancel(lastTimeOutId);
            lastTimeOutId = $timeout(function () { oBakingBCVerificationFacade.Temperature_NgKeyUp(AttributeId, ControlId, RefreshcontrolId, IsNc, RefreshAttributeId); }, Timeout);
        }

        $scope.Signature = function () {
            oBakingBCVerificationFacade.Signature();
        }
        $scope.ClearForm = function () {
            oBakingBCVerificationFacade.ClearForm();
        }
        $scope.Back = function () {
            scope = null;
            //ionicBackdrop = null;
            if (OneViewSessionStorage.Get("DcId") != null) {
                OneViewSessionStorage.Remove("NCInlineEdit");
                OneViewSessionStorage.Remove("MyAuditForm");
                $location.path('/ViewRecords');
            }
            else if (OneViewSessionStorage.Get("MyAuditForm") == 'true') {
                OneViewSessionStorage.Remove("NCInlineEdit");
                OneViewSessionStorage.Remove("MyAuditEditForm");
                $location.path('/my-audit');
            }
            else {
                $location.path('/newdc');
            }
        }


        //$scope.$on('$destroy', function () {

        //    //oOneViewAppInfoPlugin.ClearCache();
        //    //$location.replace(); //clear last history route
        //    //$templateCache.removeAll();

        //  //  ClearGlobalVariable();
        //    scope = null;
        //    ionicBackdrop = null;
        //    oBakingBCVerificationFacade = null;
        //    $scope = null;
        //    oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = null;

        //});
        $scope.PreControlEvents = function (AttributeId, ControlId, $event) {          
                oBakingBCVerificationFacade.PreControlEvents(AttributeId, ControlId, $event);          
        }
        $scope.PostControlEvents = function (AttributeId, ControlId) {

           // oBakingBCVerificationFacade.PostControlEvents(AttributeId, ControlId);
        }

        $scope.ngChange_setDateTime = function (ControlId) {
            oBakingBCVerificationFacade.ngChange_setDateTime(ControlId);
        }

        $scope.CustomNCClick = function () {
            oBakingBCVerificationFacade.CustomNCClick();
        }

        $scope.NCClick = function () {
            oBakingBCVerificationFacade.NCClick($compile);
        }

        $scope.ObservationTabClick = function () {
            oBakingBCVerificationFacade.ObservationTabClick($compile);
        }

        $scope.NCTabClick = function () {
            oBakingBCVerificationFacade.NCTabClick($compile);
        }

        $scope.CloseRightPanel = function () {
            oBakingBCVerificationFacade.CloseRightPanel();
        }

        $scope.SubmitRecords = function () {
            oBakingBCVerificationFacade.SaveDCRecords(true);
        }

        $scope.ClearReasons = function () {
            oBakingBCVerificationFacade.ClearReasons();
        }

        $scope.ClearComments = function () {
            oBakingBCVerificationFacade.ClearComments();
        }

        $scope.ProbeTesting = function () {
            oBakingBCVerificationFacade.ProbeTesting();
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

    }
);




function BakingBCVerificationFacade(parm) {

    try {
        OneViewConsole.Debug("BakingBCVerificationFacade Start", "Facade.BakingBCVerificationFacade");

        var MyInstance = this;
        var $scope = parm.scope;
        var $document = parm.document;
        var $location = parm.location;
        var xlatService = parm.xlatService;
        var $compile = parm.compile;
        //var toaster = parm.toaster;
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
        var IsFirstTimeEditForAirLine = false;

        var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
        TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);

        var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName, 'compile': $compile, 'timeoutService': $timeout });
        //var _oNCComponent = new NCComponent($scope, TemplateNodes, '', xlatService);
        var _oCPActionNCComponent = new CPActionNCComponent($scope, TemplateNodes, '', xlatService);
        var _oSettingsBO = new SettingsBO();

        OneViewConsole.Debug("BakingBCVerificationFacade End", "Facade.BakingBCVerificationFacade");
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "Facade.BakingBCVerificationFacade", xlatService);
    } 


        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "BakingBCVerificationFacade.Init");
                $scope.NewDCModel = {};
                $scope.Products = [];
                $scope.AirlinesJSON = [];
                $scope.ChillersJSON = [];
                $scope.CommentJSON = [];
                var DefaultData = null;
                $scope.ShiftOptions = [];
                $scope.DayMarker = [];
                $scope.NCOptions = [];
                $scope.CookingShiftOptions = [];
                _oDataCaptureBO.TemperatureNgKeyUpEventHandler = this.Temperature_NgKeyUp;

                _oDataCaptureBO.NCTemplateId = 66;
                _oDataCaptureBO.NCTemplateName = "BlastChillerOut NC Form";

                OneViewConsole.Debug("Init End", "BakingBCVerificationFacade.Init");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.Init", xlatService);
            }
            finally {
                DefaultData = null;
            }

        }
        this.Destroy = function () {
            _oDataCaptureBO.TemperatureNgKeyUpEventHandler = null;
        }
        this.ngChange_setIsManualFlag = function (ControlId) {
            try {
                OneViewConsole.Debug("ngChange_setIsManualFlag Start", "BakingBCVerificationFacade.ngChange_setIsManualFlag");

                _oDataCaptureBO.setIsManualFlag(ControlId);

                OneViewConsole.Debug("ngChange_setIsManualFlag End", "BakingBCVerificationFacade.ngChange_setIsManualFlag");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ngChange_setIsManualFlag", xlatService);
            }

        }

       

        this.ClearForm = function () {
            try {
                OneViewConsole.Debug("ClearForm Start", "BakingBCVerificationFacade.ClearForm");

                _oDataCaptureBO.ClearControls();
                if (DcId != null) {
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                }
                else {
                    _oDataCaptureBO.setDefaultValue();
                }
                if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                   // BindNCLoadDatas();
                    $scope.divShow = true;
                    // MyInstance.ShowNCFormAction('ATBlastChillerTempOutControlId');
                }

                OneViewConsole.Debug("ClearForm End", "BakingBCVerificationFacade.ClearForm");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ClearForm", xlatService);
            }
        }

        this.ShowNCButton = function ()
        {
            try {
                OneViewConsole.Debug("ShowNCButton Start", "BakingBCVerificationFacade.ShowNCButton");

                //if ($scope.NewDCModel.ATBlastChillerTempOutControlId > '8' && $scope.NewDCModel.AddlProductControlId != '') {
                    $scope.DivNC = true;
                //}
                //else {
                //    $scope.DivNC = false;
                //}

                OneViewConsole.Debug("ShowNCButton End", "BakingBCVerificationFacade.ShowNCButton");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ShowNCButton", xlatService);
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
                OneViewConsole.Debug("PageLoad Start", "BakingBCVerificationFacade.PageLoad");

                LoadDefaultValueMetaData();

                _oDataCaptureBO.SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
                AutoCompleteGenerateHTML();
                 Loadddl_OneViewAdv();
                 _oDataCaptureBO.LoadShift();
                 LoadAnswerModes();
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
                     IsFirstTimeEditForAirLine = true;
                      $scope.Add = 'Save';
                      _oDataCaptureBO.GetNCComments(DcId);
                    _oDataCaptureBO.LoadEditPage(DcId, $scope);
                    BindNCLoadDatas();

                    SetSelectedTextBoxColor_Private('ATBlastChillerTempOutControlId');
                    ModelIdForAutoTemperatureUpdation = 'NewDCModel.ATBlastChillerTempOutControlId';
                    ModelIdForAutoTimeUpdation = 'NewDCModel.DTBlastChillerTimeOutControlId';
                    IsFirstTimeEditForAirLine = false;
                }
                  else {
                      $scope.Add = 'Add';
                    _oDataCaptureBO.setDefaultValue();
                    SetSelectedTextBoxColor_Private('ATBlastChillerTempInControlId');
                    ModelIdForAutoTemperatureUpdation = 'NewDCModel.ATBlastChillerTempInControlId';
                    ModelIdForAutoTimeUpdation = 'NewDCModel.DTBlastChillerTimeInControlId';

                }

                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = ModelIdForAutoTemperatureUpdation;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = ModelIdForAutoTimeUpdation;
                _oDataCaptureBO.SetDefaultAutoTemperatureListener();

                ///AuditSummary
                _oDataCaptureBO.ShowDCSummary();
               // MyInstance.ShowNCButton();
                _oSettingsBO.ShowAutoManualStatus($scope);
                if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
                    //_oDataCaptureBO.UpdateDC(DcId, undefined, _oDataCaptureBO.PreEditValues);
                    $scope.divShow = true;
                    _oDataCaptureBO.ClearAutoTempAndTime();
                }

                new OnewViewEventListener().RegisterSelectedFieldEvent();

                OneViewConsole.Debug("PageLoad End", "BakingBCVerificationFacade.PageLoad");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.PageLoad", xlatService);
            }
            finally {
                ModelIdForAutoTemperatureUpdation = null;
                ModelIdForAutoTimeUpdation = null;
            }
        }

        this.SetSelectedTextBoxColor = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor Start", "BakingBCVerificationFacade.SetSelectedTextBoxColor");

                SetSelectedTextBoxColor_Private(ControlId);

                OneViewConsole.Debug("SetSelectedTextBoxColor End", "BakingBCVerificationFacade.SetSelectedTextBoxColor");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.SetSelectedTextBoxColor", xlatService);
            }
        }
    
        var SetSelectedTextBoxColor_Private = function (ControlId) {
            try {
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private Start", "BakingBCVerificationFacade.SetSelectedTextBoxColor_Private");

                if (ControlId == 'txtCoreTempControlId') {
                    $scope.txtCoreTempControlId = 'highlight';
                    $scope.ATBlastChillerTempInControlId = '';
                    $scope.ATBlastChillerTempOutControlId = '';
                }
                else if (ControlId == 'ATBlastChillerTempInControlId') {
                    $scope.txtCoreTempControlId = '';
                    $scope.ATBlastChillerTempInControlId = 'highlight';
                    $scope.ATBlastChillerTempOutControlId = '';
                }
                else if (ControlId == 'ATBlastChillerTempOutControlId') {
                    $scope.txtCoreTempControlId = '';
                    $scope.ATBlastChillerTempInControlId = '';
                    $scope.ATBlastChillerTempOutControlId = 'highlight';
                }
                OneViewConsole.Debug("SetSelectedTextBoxColor_Private End", "BakingBCVerificationFacade.SetSelectedTextBoxColor_Private");
            }
            catch (Excep) {
                throw Excep;
            }
        }


        var BindNc = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("BindNc Start", "BakingBCVerificationFacade.BindNc");

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

                OneViewConsole.Debug("BindNc End", "BakingBCVerificationFacade.BindNc");
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
                OneViewConsole.Debug("SetNCFormAction Start", "BakingBCVerificationFacade.SetNCFormAction");
              
                //$ionicSlideBoxDelegate.previous();
                if (OneViewSessionStorage.Get("NCInlineEdit") != 'true') {
                    $scope.DivNGForm = false;
                    $scope.DivContent = true;
                    $scope.DivSignature = false;
                   // xlatService.setCurrentPage('BakingBCVerification');
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
                        $location.path('/ViewRecords');
                    }
                    oSetDefaultSpinner.Stop();
                }
                MyInstance.ShowNCButton();
               

                OneViewConsole.Debug("SetNCFormAction End", "BakingBCVerificationFacade.SetNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.SetNCFormAction", xlatService);
            }
            finally {
                Status = null;
            }
        }

        this.Temperature_NgKeyUpOLD = function (AttributeId, ControlId, RefreshcontrolId, IsNc) {
            try {
                OneViewConsole.Debug("Temperature_NgKeyUp Start", "BakingBCVerificationFacade.Temperature_NgKeyUp");

                if (IsNc == true) {
                    //ShowNCStatus(AttributeId, ControlId);
                }
                var oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': '', 'TemplateId': TemplateId, 'TemplateName': TemplateName });
               // if (RefreshcontrolId != '') {
                oDataCaptureBO.SetDateTime($scope, ControlId, RefreshcontrolId);
               // }
               // MyInstance.ShowNCFormAction(ControlId);

                OneViewConsole.Debug("Temperature_NgKeyUp End", "BakingBCVerificationFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var ShowNCStatusOLD = function (AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "BakingBCVerificationFacade.ShowNCStatus");
                var DCNCMappingListData = $scope['NCComponent'].ShowNCStatus(AttributeId, ControlId);
                NormalizeNCEntityListData(DCNCMappingListData);

                OneViewConsole.Debug("ShowNCStatus End", "BakingBCVerificationFacade.ShowNCStatus");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                DCNCMappingListData = null;
            }
        }

        var IsNCthereOrNot = function (RuleId, isNC) {
            try {
                OneViewConsole.Debug("IsNCthereOrNot Start", "BakingBCVerificationFacade.IsNCthereOrNot");

                var ExistStatus = false;
                for (var r = 0; r < _oDataCaptureBO.DCNCMappingList.length; r++) {
                    if (_oDataCaptureBO.DCNCMappingList[r].NCRuleId == RuleId) {
                        _oDataCaptureBO.DCNCMappingList[r].NCRuleId = RuleId;
                        _oDataCaptureBO.DCNCMappingList[r].IsNC = isNC;
                        ExistStatus = true;
                        break;
                    }
                }

                OneViewConsole.Debug("IsNCthereOrNot End", "BakingBCVerificationFacade.IsNCthereOrNot");

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
                OneViewConsole.Debug("NormalizeNCEntityListData Start", "BakingBCVerificationFacade.NormalizeNCEntityListData");

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

                OneViewConsole.Debug("NormalizeNCEntityListData End", "BakingBCVerificationFacade.NormalizeNCEntityListData");
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
                OneViewConsole.Debug("SaveSignature Start", "BakingBCVerificationFacade.SaveSignature");
                $scope[ControlId + '_IsModified'] = true;
                $scope[ControlId + '_SignaturePad'] = signaturePad.toDataURL();//signaturePad;
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

                OneViewConsole.Debug("SaveSignature End", "BakingBCVerificationFacade.SaveSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.SaveSignature", xlatService);
            }
            finally {
                oDateTime = null;
                CurrenntDateAndTime = null;
            }
        }

        this.ClearSignature = function (ControlId) {
            try {
                OneViewConsole.Debug("ClearSignature Start", "BakingBCVerificationFacade.ClearSignature");

                $scope[ControlId + '_IsModified'] = false;
                $scope[ControlId + '_SignaturePad'] = '';
                $scope.lblSignature = "";

                OneViewConsole.Debug("ClearSignature End", "BakingBCVerificationFacade.ClearSignature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ClearSignature", xlatService);
            }
        }

        this.Signature = function () {
            try {
                OneViewConsole.Debug("Signature Start", "BakingBCVerificationFacade.Signature");

                $scope.DivNGForm = false;
                $scope.DivContent = false;
                $scope.DivSignature = true;

                $timeout(function () {
                    SignatureContent();
                }, 100);


                OneViewConsole.Debug("Signature End", "BakingBCVerificationFacade.Signature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.Signature", xlatService);
            }
        }

        var SignatureContent = function () {
            try {
                OneViewConsole.Debug("SignatureContent Start", "BakingBCVerificationFacade.SignatureContent");

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

                signaturePad = new SignaturePad(canvas);

                clearButton.addEventListener("click", function (event) {
                    signaturePad.clear();
                    MyInstance.ClearSignature('DCBoutNCSignature');
                });

                saveButton.addEventListener("click", function (event) {
                    if (signaturePad.isEmpty()) {
                        alert("MN-RQ-NCF-001 :: Please provide signature first.");
                    } else {
                        MyInstance.SaveSignature('DCBoutNCSignature', signaturePad);
                    }
                });

                OneViewConsole.Debug("SignatureContent End", "BakingBCVerificationFacade.SignatureContent");
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
                OneViewConsole.Debug("GetProbeStatus Start", "BakingBCVerificationFacade.GetProbeStatus");
                               
                _oSettingsBO.ProbeStatus('', xlatService);

                OneViewConsole.Debug("GetProbeStatus End", "BakingBCVerificationFacade.GetProbeStatus");

            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.GetProbeStatus", xlatService);
            }
        }

        this.ShowTemperature = function (temp) {
            try {
                OneViewConsole.Debug("ShowTemperature Start", "BakingBCVerificationFacade.ShowTemperature");

                MyInstance.oscope.NewDCModel.txtCookedByControlId = "xxxxxxx";
                MyInstance.oscope.$apply();
                alert('ShowTemperature came');

                OneViewConsole.Debug("ShowTemperature End", "BakingBCVerificationFacade.ShowTemperature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ShowTemperature", xlatService);
            }
        }

        this.SetAutoTemperatureListener = function (EventArg, TimeModelId) {
            try {
                //alert('SetAutoTemperatureListener');
                //alert(EventArg);
                //alert(TimeModelId);
                OneViewConsole.Debug("SetAutoTemperatureListener Start", "BakingBCVerificationFacade.SetAutoTemperatureListener");
                OneViewConsole.DataLog("modelName :" + EventArg, "BakingBCVerificationFacade.SetAutoTemperatureListener");
                OneViewConsole.DataLog("TimeModelId :" + TimeModelId, "BakingBCVerificationFacade.SetAutoTemperatureListener");

                var modelName = EventArg;// EventArg.target.attributes['ng-model'].value;
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = modelName;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = TimeModelId;

           
                OneViewConsole.Debug("SetAutoTemperatureListener End", "BakingBCVerificationFacade.SetAutoTemperatureListener");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.SetAutoTemperatureListener", xlatService);
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
                OneViewConsole.Debug("SaveDCRecords Start", "BakingBCVerificationFacade.SaveDCRecords");

                var ModelIdForAutoTemperatureUpdation;
                var ModelIdForAutoTimeUpdation;


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
                        $location.path('/ViewRecords');
                    }

                    SetSelectedTextBoxColor_Private('ATBlastChillerTempOutControlId');
                    ModelIdForAutoTemperatureUpdation = 'NewDCModel.ATBlastChillerTempOutControlId';
                    ModelIdForAutoTimeUpdation = 'NewDCModel.DTBlastChillerTimeOutControlId';
                }
                else {
                    var Status = _oDataCaptureBO.SaveDC(IsSubmit);
                    if (Status != false) {
                        _oDataCaptureBO.DCNCMappingList = new Array();
                        _oDataCaptureBO.DeleteNCEventHandler = false;
                        $scope['DCBoutNCSignature_IsModified'] = '';
                        $scope['DCBoutNCSignature_SignaturePad'] = '';
                        // $ionicSlideBoxDelegate.enableSlide(false);
                    }
                    SetSelectedTextBoxColor_Private('ATBlastChillerTempInControlId');
                    ModelIdForAutoTemperatureUpdation = 'NewDCModel.ATBlastChillerTempInControlId';
                    ModelIdForAutoTimeUpdation = 'NewDCModel.DTBlastChillerTimeInControlId';
                }
                $scope.lblSignature = "";
                _oDataCaptureBO.ShowDCSummary();
                MyInstance.ShowNCButton();
                document.getElementById('lblEnterName').value = "";
                _oDataCaptureBO.ModelIdForAutoTemperatureUpdation = ModelIdForAutoTemperatureUpdation;
                _oDataCaptureBO.ModelIdForAutoTimeUpdation = ModelIdForAutoTimeUpdation;


                OneViewConsole.Debug("SaveDCRecords End", "BakingBCVerificationFacade.SaveDCRecords");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.SaveDCRecords", xlatService);
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
                OneViewConsole.Debug("Loadddl_OneViewAdv Start", "BakingBCVerificationFacade.Loadddl_OneViewAdv");

                OneViewAdvAutoCompleteEvent = OneViewAdvAutoCompleteClick;
                AutoCompleteCloseEvent = AutoCompleteCloseClick;

                var oFlightddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFlightControlId', 'DataSourceModelName': 'Flights', 'DisplayElementModelName': 'NewDCModel.AddlFlightControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Airline, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 370, 'SelectedIndexChangedEventHandler': oFlightSelectedIndexChanged, 'IsDynamicElementCreationEnabled': false });
                oFlightddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Airline, _TableNamesEnum.OrganizationAssetsNode);

                var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 90, 'IsDynamicElementCreationEnabled': true });
                oAirlinesddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);

                var oProductddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlProductControlId', 'DataSourceModelName': 'Products', 'DisplayElementModelName': 'NewDCModel.AddlProductControlId', 'DATEntityTypeId': DATEntityType.RCO_WorkOrder, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': 89 });
                oProductddl.SetDataSourceWithWorkOrder(DcPlaceId, DATEntityType.RCO_WorkOrder, _TableNamesEnum.OrganizationAssetsNode, SectionCodesConfig.Bakery);             

                var oChillersddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlBlastChillerNoControlId', 'DataSourceModelName': 'BlastChiller', 'DisplayElementModelName': 'NewDCModel.AddlBlastChillerNoControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_BCChiller, 'xlatService': xlatService, 'ToasterService': '', 'IsDynamicElementCreationEnabled': false, 'MinCharToSearch': 0, 'AttributeNodeId': 93 });
                oChillersddl.SetDataSourceFromTreeChildsWithType(DcPlaceId, DATEntityType.RCOMaster_BCChiller, _TableNamesEnum.OrganizationAssetsNode);

                var oSectorddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlSectorControlId', 'DataSourceModelName': 'Sectors', 'DisplayElementModelName': 'NewDCModel.AddlSectorControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Sector, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 371, 'IsDynamicElementCreationEnabled': false });
                oSectorddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Sector, _TableNamesEnum.OrganizationAssetsNode);

                var oFAndBddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlFAndBControlId', 'DataSourceModelName': 'FAndB', 'DisplayElementModelName': 'NewDCModel.AddlFAndBControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_FandBOutLet, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 372, 'IsDynamicElementCreationEnabled': false });
                oFAndBddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_FandBOutLet, _TableNamesEnum.OrganizationAssetsNode);
              
                OneViewConsole.Debug("Loadddl_OneViewAdv End", "BakingBCVerificationFacade.Loadddl_OneViewAdv");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oAirlinesddl = null;
                oChillersddl = null;
                oProductTypeddl = null;
                oCommentddl = null;
                oProductddl = null;
            }

        }

        var oFlightSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oFlightSelectedIndexChanged Start", "BakingBCVerificationFacade.oFlightSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {
                    var AirlineId = "";
                    var AirlineName = "";
                    if ((DcId != null || IsFirstTimeEditForAirLine == true) && (($scope['AddlAirlineControlId'] != undefined && $scope['AddlAirlineControlId'].GetSelectedText() != undefined) && ($scope['AddlAirlineControlId'].GetSelectedText() != ''))) {
                        AirlineId = $scope['AddlAirlineControlId'].GetSelectedValue();
                        AirlineName = $scope['AddlAirlineControlId'].GetSelectedText();
                    }

                    var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 90, 'IsDynamicElementCreationEnabled': true });
                    oAirlinesddl.SetDataSourceFromTreeChildsWithType(EventArgs.NewValue.Id, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
                    if ((DcId != null || IsFirstTimeEditForAirLine == true) && ((AirlineId != "") && (AirlineName != ''))) {
                        $scope['AddlAirlineControlId'].Set({ Id: AirlineId, Name: AirlineName, "IsDynamicElement": true });
                    }

                    if (DcId == null || IsFirstTimeEditForAirLine == false) {
                        oAirlinesddl.Clear();
                    }
                }
                else {
                    var oAirlinesddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'AddlAirlineControlId', 'DataSourceModelName': 'Airlines', 'DisplayElementModelName': 'NewDCModel.AddlAirlineControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Flight, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 90, 'IsDynamicElementCreationEnabled': true });
                    oAirlinesddl.SetDataSourceFromTreeChildsWithType(OrganizationId, DATEntityType.RCOMaster_Flight, _TableNamesEnum.OrganizationAssetsNode);
                }

                OneViewConsole.Debug("oFlightSelectedIndexChanged End", "BakingBCVerificationFacade.oFlightSelectedIndexChanged");
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

                OneViewConsole.Debug("Temperature_NgKeyUp Start", "BakingBCVerificationFacade.Temperature_NgKeyUp");
                //alert(AttributeId);
                ////if (IsNc == true) {
                //    var ActionResponseList = EvaluateActionNCStatus(AttributeId);
                //// }
                var oDefaultValidationResponse = new DefaultValidationResponse();
                oDefaultValidationResponse = _oDataCaptureBO.PostControlEventsExe(AttributeId, ControlId);
                if (oDefaultValidationResponse.IsSuccess) {
                    ValidateActionNC(AttributeId, ControlId, RefreshcontrolId)
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
                                // _oDataCaptureBO.SetTime($scope, ControlId, RefreshcontrolId);
                                _oDataCaptureBO.SetDateTime($scope, ControlId, RefreshcontrolId)
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
                OneViewConsole.Debug("Temperature_NgKeyUp End", "BakingBCVerificationFacade.Temperature_NgKeyUp");
            }
            catch (Excep) {
                $scope.DisableSave = false;
                $scope.DisableSaveSubmit = false;
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.Temperature_NgKeyUp", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var ValidateActionNC = function (AttributeId, ControlId, RefreshcontrolId) {
            try {
                //alert('here')
                // alert('chkP' + $scope.NewDCModel.chkP);
                // alert('chkG' + $scope.NewDCModel.chkG);
                OneViewConsole.Debug("ValidateActionNC Start", "BakingBCVerificationFacade.ValidateActionNC");
                var ActionResponseList = EvaluateActionNCStatus(AttributeId);
                //alert(ActionResponseList.length);
                if (ActionResponseList != undefined) {
                    if (ActionResponseList.length > 1) {
                        alert('More than one action for a single attribute : Not implemeneted');
                    }
                    else {
                        for (var i = 0; i < ActionResponseList.length; i++) {
                            if ((ActionResponseList[i].IsFormAction == true || ActionResponseList[i].IsFormAction == 'true') && (ActionResponseList[i].IsRuleViolated == true || ActionResponseList[i].IsRuleViolated == 'true')) {
                                MyInstance.ShowNCFormAction(ControlId, RefreshcontrolId);
                            }
                        }
                    }
                }
                OneViewConsole.Debug("ValidateActionNC End", "BakingBCVerificationFacade.ValidateActionNC");
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
                OneViewConsole.Debug("CheckActionNCEvent Start", "BakingBCVerificationFacade.CheckActionNCEvent");
                ValidateActionNC(AttributeId, ControlId);
                OneViewConsole.Debug("CheckActionNCEvent End", "BakingBCVerificationFacade.CheckActionNCEvent");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.CheckActionNCEvent", xlatService);
            }
            finally {
                oDataCaptureBO = null;
            }
        }

        var EvaluateActionNCStatus = function (AttributeId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "BakingBCVerificationFacade.EvaluateActionNCStatus");
                var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
                return ActionResponseList;
                OneViewConsole.Debug("ShowNCStatus End", "BakingBCVerificationFacade.EvaluateActionNCStatus");
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
                        else if (AnswerModeObject.ControlId == "ATBlastChillerTempOutControlId") {
                        }
                        else if (AnswerModeObject.ControlId == 'DTBlastChillerTimeOutControlId') {
                        }
                        else if (AnswerModeObject.ControlId == 'DTBlastChillerTimeOutControlId') {
                        }
                        else if ((AnswerModeObject.DataType == 'DATAURL') && (AnswerToBind.Answer != '')) {
                            $scope.lblSignature = "Signed " + AnswerToBind.LastUpdatedDate;
                        }
                        //else if (AnswerModeObject.ControlId == 'DTNCChillerTimeOutControlId') {

                        //    var NCChillerTimeOut = "";
                        //    if (scope.NewDCModel['DTBlastChillerTimeOutControlId'] != '' && scope.NewDCModel['DTBlastChillerTimeOutControlId'] != undefined && scope.NewDCModel['DTBlastChillerTimeOutControlId'] != null) {
                        //        NCChillerTimeOut = scope.NewDCModel['DTBlastChillerTimeOutControlId'];
                        //    }
                        //    document.getElementById('DTNCChillerTimeOutControlId').value = NCChillerTimeOut;
                        //    scope.NewDCModel['DTNCChillerTimeOutControlId'] = document.getElementById('DTNCChillerTimeOutControlId').value;


                        //    //alert('in DTNCChillerTimeOutControlId' + scope.NewDCModel['DTNCChillerTimeOutControlId']);
                            //}
                        else if (AnswerModeObject.Type == "DATETIMELOCAL" && AnswerToBind.Answer != '') {

                            scope.NewDCModel[AnswerModeObject.ControlId] = new DateTime().GetDateByString(AnswerToBind.Answer);

                        }
                        else if (AnswerModeObject.Type == 'TIME') {
                            if (AnswerToBind.Answer != "") {
                                //var Time = AnswerToBind.Answer.split(" ")[1].split(':');
                                //scope.NewDCModel[AnswerModeObject.ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
                                document.getElementById(AnswerModeObject.ControlId).value = AnswerToBind.Answer.split(" ")[1]; //take time 
                                scope.NewDCModel[AnswerModeObject.ControlId] = document.getElementById(AnswerModeObject.ControlId).value;
                            }
                        }
                        else if (AnswerModeObject.ControlId == 'ATNCChillerTempOutControlId') {

                            var NCChillerTempOut = "";
                            if (scope.NewDCModel['ATBlastChillerTempOutControlId'] != '' && scope.NewDCModel['ATBlastChillerTempOutControlId'] != undefined && scope.NewDCModel['ATBlastChillerTempOutControlId'] != null) {
                                NCChillerTempOut = scope.NewDCModel['ATBlastChillerTempOutControlId'];
                            }

                            document.getElementById('ATNCChillerTempOutControlId').value = NCChillerTempOut;
                            scope.NewDCModel['ATNCChillerTempOutControlId'] = NCChillerTempOut;

                            // alert('in ATNCChillerTempOutControlId' + scope.NewDCModel['ATNCChillerTempOutControlId']);
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

                            if (_oPrimarayAnswerModeInfo.ControlId == "ATNCChillerTempOutControlId") {

                                var NCChillerTempOut = "";
                                if (scope.NewDCModel['ATBlastChillerTempOutControlId'] != '' && scope.NewDCModel['ATBlastChillerTempOutControlId'] != undefined && scope.NewDCModel['ATBlastChillerTempOutControlId'] != null) {
                                    NCChillerTempOut = scope.NewDCModel['ATBlastChillerTempOutControlId'];
                                }

                                document.getElementById('ATNCChillerTempOutControlId').value = NCChillerTempOut;
                                scope.NewDCModel['ATNCChillerTempOutControlId'] = NCChillerTempOut;

                            }
                            else if (_oPrimarayAnswerModeInfo.Type == 'DDL') {
                                if (_oPrimarayAnswerModeInfo.ControlId == 'ddlDepartmentControlId' || _oPrimarayAnswerModeInfo.ControlId == 'ddlSectionControlId') {
                                    var _oddl = $scope[_oPrimarayAnswerModeInfo.ControlId];
                                    _oddl.Clear();
                                }    
                            }
                            else if (_oPrimarayAnswerModeInfo.ControlId == 'DTNCChillerTimeOutControlId') {

                                var NCChillerTimeOut = "";
                                if (scope.NewDCModel['DTBlastChillerTimeOutControlId'] != '' && scope.NewDCModel['DTBlastChillerTimeOutControlId'] != undefined && scope.NewDCModel['DTBlastChillerTimeOutControlId'] != null) {
                                    NCChillerTimeOut = scope.NewDCModel['DTBlastChillerTimeOutControlId'];
                                }
                                document.getElementById('DTNCChillerTimeOutControlId').value = NCChillerTimeOut;
                                scope.NewDCModel['DTNCChillerTimeOutControlId'] = NCChillerTimeOut;

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

        this.ShowNCFormAction = function (ControlId, RefreshcontrolId) {
            try {
                OneViewConsole.Debug("ShowNCFormAction Start", "BakingBCVerificationFacade.ShowNCFormAction");

                var TempOutNCTemplate = TemplateMetaData[ServiceId][_oDataCaptureBO.NCTemplateId];
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
                            $scope.DivContent = false;
                            $scope.DivSignature = false;
                            var NCForm_Page = 'T66';
                            xlatService.setCurrentPage(NCForm_Page, true);
                            _oDataCaptureBO.ClearAutoTempAndTime(ControlId);

                        }
                        else {
                            MyInstance.ShowNCButton();
                        }


                        //var SelectedTime = document.getElementById('DTBlastChillerTimeOutControlId');
                        //SetTimeInFormat(SelectedTime, 'DTBlastChillerTimeOutControlId');

                        //Set temperature in NC form automatically
                        $scope.NewDCModel['ATNCChillerTempOutControlId'] = $scope.NewDCModel[ControlId];
                        var SelectedTime = (document.getElementById(RefreshcontrolId) != null ? document.getElementById(RefreshcontrolId) : '');
                        if (SelectedTime != '') {
                            SetTimeInFormat(SelectedTime, 'DTNCChillerTimeOutControlId', RefreshcontrolId);
                        }

                        $scope.$apply();

                    });

                }



                OneViewConsole.Debug("ShowNCFormAction End", "BakingBCVerificationFacade.ShowNCFormAction");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ShowNCFormAction", xlatService);
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


        var oProductddlSelectedIndexChanged = function (EventArgs) {
            try {
                OneViewConsole.Debug("oProductddlSelectedIndexChanged Start", "BakingBCVerificationFacade.oProductddlSelectedIndexChanged");

                if (EventArgs.NewValue.IsDynamicElement != true && EventArgs.NewValue.Id != "" && EventArgs.NewValue.Id != 0 && EventArgs.NewValue.Id.length != 36) {
                    var _oDefaultTreeDAO = new DefaultTreeDAO();
                    var ParentDetails = _oDefaultTreeDAO.GetParentById(EventArgs.NewValue.Id, 'OrganizationAssetsNode');
                    if (ParentDetails[0].ParentDbElementType == DATEntityType.RCOMaster_ProductType) {
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

                OneViewConsole.Debug("oProductddlSelectedIndexChanged End", "BakingBCVerificationFacade.oProductddlSelectedIndexChanged");
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

        //var Test = function (InpControlId)
        //{
        //    for (NodeId in TemplateNodes) {
        //        if (typeof (TemplateNodes[NodeId]) != 'function') {

        //            var TemplateNodeObject = TemplateNodes[NodeId];

        //            for (itrAnswerMode in TemplateNodeObject.AnswerMode) {

        //                if (typeof (TemplateNodeObject.AnswerMode[itrAnswerMode]) != 'function') {
        //                    var AnswerModeObject = TemplateNodeObject.AnswerMode[itrAnswerMode];
        //                    var ControlId = AnswerModeObject.ControlId;
        //                    if (ControlId == InpControlId)
        //                    {
        //                        MyInstance.Temperature_NgKeyUp(NodeId, ControlId, '', 'true')
        //                    }
        //                }
        //            }
        //        }
        //    }
    //}

        var LoadAnswerModes = function () {
            try {
                OneViewConsole.Debug("LoadAnswerModes Start", "BakingBCVerificationFacade.LoadAnswerModes");

                //var oDayMarker = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkDayMarker', 'DataSourceModelName': 'DayMarker', 'DisplayElementModelName': 'NewDCModel.chkDayMarker' });
                //oDayMarker.AnswerModes(TemplateNodes, 323);

                //var oCookingShift = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkCookingShift', 'DataSourceModelName': 'CookingShiftOptions', 'DisplayElementModelName': 'NewDCModel.chkCookingShift' });
                //oCookingShift.AnswerModes(TemplateNodes, 429);
                var oNCOptions = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkNCBand', 'DataSourceModelName': 'NCOptions', 'DisplayElementModelName': 'NewDCModel.chkNCBand' });
                oNCOptions.LoadNCOptions();

                OneViewConsole.Debug("LoadAnswerModes End", "BakingBCVerificationFacade.LoadAnswerModes");
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
                OneViewConsole.Debug("CreateDynamicElements Start", "BakingBCVerificationFacade.CreateDynamicElements");

                var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");
                for (var i = 0; i < _DcResultDetailsEntityLst.length; i++) {
                    if (_DcResultDetailsEntityLst[i].IsDynamicAnswer == 'true') {
                        var ParentNodeId = DCPlaceNodeId;;
                        var ParentDbElementType = DATEntityType.RCOMaster_Kitchen;;
                        var ParentDbElementId;
                                             
                        var Response;
                        var _oDynamicElementBO = new DynamicElementBO();

                        if (_DcResultDetailsEntityLst[i].AttributeNodeId == 89)//for product
                        {
                            Response = _oDynamicElementBO.AddDynamicOrder(_DcResultDetailsEntityLst[i], ParentNodeId, ParentDbElementType, ParentDbElementId, LabelId, DATEntityType.RCO_WorkOrder, '92892');
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

                            //Update Answer with newly created node
                            _DcResultDetailsEntityLst[i].Answer = Response.NodeClientGuid;

                        }

                       

                    }
                }

                OneViewConsole.Debug("CreateDynamicElements End", "BakingBCVerificationFacade.CreateDynamicElements");
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
                LabelId = null;
                _oDynamicElementBO = null;
                Response = null;
            }
        }

        var GetProductType = function (DcResultDetailsEntityLst) {
            try {
                OneViewConsole.Debug("GetProductType Start", "BakingBCVerificationFacade.GetProductType");

                for (var i = 0; i < DcResultDetailsEntityLst.length; i++) {
                    if (DcResultDetailsEntityLst[i].AttributeNodeId == 5)//for product type
                    {
                        return DcResultDetailsEntityLst[i].Answer;
                    }
                }

                OneViewConsole.Debug("GetProductType End", "BakingBCVerificationFacade.GetProductType");
            }
            catch (Excep) {
                throw Excep;
            }
        }

        this.NotifyTemperature = function (Scope, TemperatureInfo) {
            try {
                OneViewConsole.Debug("NotifyTemperature Start", "BakingBCVerificationFacade.NotifyTemperature");

                Scope.NewDCModel[Scope.CurrentCell] = parseFloat(TemperatureInfo.Temperature);
                Scope.$apply();

                OneViewConsole.Debug("NotifyTemperature End", "BakingBCVerificationFacade.NotifyTemperature");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.NotifyTemperature", xlatService);
            }
        }

        //************* Bout NC Jobs Start****************
        
        //this.ShowNCFormAction = function (ControlId) {
        //    try {
        //        OneViewConsole.Debug("ShowNCFormAction Start", "BakingBCVerificationFacade.ShowNCFormAction");

        //        var TempOutNCTemplate = TemplateMetaData[ServiceId][NCTemplateDetails.TemplateId];
        //        var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': NCTemplateDetails.TemplateId, 'TemplateName': NCTemplateDetails.TemplateName });
        //        _oNCDcDataCaptureBO.ClearControls(TempOutNCTemplate);
        //        if (ControlId == 'ATBlastChillerTempOutControlId' && $scope.NewDCModel.ATBlastChillerTempOutControlId > '8' && $scope.NewDCModel.AddlProductControlId != '') {
        //            //$ionicSlideBoxDelegate.enableSlide(true);
        //            if (OneViewSessionStorage.Get("NCInlineEdit") == 'true') {
        //            }
        //            else {
        //                var Title = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Title;
        //                var Message = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Message;

        //                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
        //                oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

        //                    if (ConfirmationId == '2') {
        //                        document.getElementById('divAutocomplatePopUp').className = 'modal oneview-popup hide';
        //                        ionicBackdrop.release();
        //                        $scope.DivNC = false;
        //                        $scope.DivNGForm = true;
        //                        $scope.DivContent = false;
        //                        $scope.DivSignature = false;
        //                        xlatService.setCurrentPage('NCForm_Page');
        //                         $scope.$apply();
        //                       // $ionicSlideBoxDelegate.slide(1);
        //                    }
        //                    else
        //                    {
        //                        MyInstance.ShowNCButton();
        //                        $scope.$apply();
        //                    }
        //                });
                     
        //            }
        //        }
        //        else if (ControlId == 'ATBlastChillerTempOutControlId' && $scope.NewDCModel.ATBlastChillerTempOutControlId < '8') {
        //            // $ionicSlideBoxDelegate.enableSlide(false);
        //            $scope.DivNC = false;
        //            if (DcId != null) {
        //                var NCDCId = _oNCDcDataCaptureBO.GetNCDcID(DcId);
        //                if (NCDCId != undefined) {
        //                    //Deletion code;
        //                    _oDataCaptureBO.DeleteNCEventHandler = true;

        //                }
        //            }
        //        }
        //        //MyInstance.ShowNCButton();

        //        OneViewConsole.Debug("ShowNCFormAction End", "BakingBCVerificationFacade.ShowNCFormAction");
        //    }
        //    catch (Excep) {
        //        oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ShowNCFormAction", xlatService);
        //    }
        //    finally {
        //        TempOutNCTemplate = null;
        //        _oNCDcDataCaptureBO = null;
        //        Title = null;
        //        Message = null;
        //        oOneViewCordovaPlugin = null;
        //        NCDCId = null;
        //    }
        //}

        var BindNCLoadDatas = function () {
            try {
                OneViewConsole.Debug("BindNCLoadDatas Start", "BakingBCVerificationFacade.BindNCLoadDatas");

                //enable dep section ddl start
                var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");

                var oDepartmentddl =
                    new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'ddlDepartmentControlId', 'DataSourceModelName': 'Department', 'DisplayElementModelName': 'NewDCModel.ddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Department, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10336, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged, 'IsDynamicElementCreationEnabled': false });
                oDepartmentddl.SetDataSourceFromTreeChildsWithType(DCPlaceNodeId, DATEntityType.RCOMaster_Department, _TableNamesEnum.OrganizationAssetsNode);
                $scope.ddlDepartmentControlId = oDepartmentddl;

                var oSectionddl =
                  new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'ddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.ddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10337, 'IsDynamicElementCreationEnabled': false });
                oSectionddl.SetDataSourceFromTreeChildsWithType(DCPlaceNodeId, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);
                $scope.ddlSectionControlId = oSectionddl;
                //enable dep section ddl start

                var TempOutNCTemplate = TemplateMetaData[ServiceId][_oDataCaptureBO.NCTemplateId];
                var _oNCDcDataCaptureBO = GetBoutNCDataCaptureBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': _oDataCaptureBO.NCTemplateId, 'TemplateName': _oDataCaptureBO.NCTemplateName });
                _oNCDcDataCaptureBO.ClearControls(TempOutNCTemplate);
                var NCDCId = _oNCDcDataCaptureBO.GetNCDcID(DcId);
                if (NCDCId != undefined) {
                    _oNCDcDataCaptureBO.LoadEditPage(NCDCId, $scope);
                    _oDataCaptureBO.NCPreEditDataList = _oNCDcDataCaptureBO.PreEditValues;
                }

                OneViewConsole.Debug("BindNCLoadDatas End", "BakingBCVerificationFacade.BindNCLoadDatas");
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
                OneViewConsole.Debug("BeforeSaveDCEventJob Start", "BakingBCVerificationFacade.BeforeSaveDCEventJob");

                //SetBOutNCMapping_BeforeSaveDCEvent(EventArgsDataCaptureBO);

                OneViewConsole.Debug("BeforeSaveDCEventJob End", "BakingBCVerificationFacade.BeforeSaveDCEventJob");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.BeforeSaveDCEventJob", xlatService);
            }
        }

        //Eject Save NC to the event handler
        _oDataCaptureBO.BeforeSaveDCEventHandler = MyInstance.BeforeSaveDCEventJob;
        
        var SetBOutNCMapping_BeforeSaveDCEvent = function (EventArgsDataCaptureBO) {
            try {
                OneViewConsole.Debug("SetBOutNCMapping_BeforeSaveDCEvent Start", "BakingBCVerificationFacade.SetBOutNCMapping_BeforeSaveDCEvent");
                if ($scope.NewDCModel.ATBlastChillerTempOutControlId > '8' && $scope.NewDCModel.AddlProductControlId != '') {
                    var TempOutNCTemplate = TemplateMetaData[ServiceId][NCTemplateDetails.TemplateId];
                    var ActionContext = DATActionContext.DataCapture;
                    var oDCNCMappingBO = new DCNCMappingBO({ 'scope': $scope, 'TemplateNodes': TempOutNCTemplate, 'xlatService': xlatService, 'toaster': '', 'TemplateId': NCTemplateDetails.TemplateId, 'TemplateName': NCTemplateDetails.TemplateName });
                    var oDCNCStatus = oDCNCMappingBO.GetNCFormAction(3, 'true', TempOutNCTemplate, ActionContext);
                    CheckRuleIdExist(oDCNCStatus);
                }

                OneViewConsole.Debug("SetBOutNCMapping_BeforeSaveDCEvent End", "BakingBCVerificationFacade.SetBOutNCMapping_BeforeSaveDCEvent");
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
                OneViewConsole.Debug("CheckRuleIdExist Start", "BakingBCVerificationFacade.CheckRuleIdExist");

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

                OneViewConsole.Debug("CheckRuleIdExist End", "BakingBCVerificationFacade.CheckRuleIdExist");
            }
            catch (Excep) {
                throw Excep;
            }
        }

        this.BeforeUpdateDCEventJob = function (EventArgsDataCaptureBO) {
            try {
                OneViewConsole.Debug("BeforeSaveDCEventJob Start", "BakingBCVerificationFacade.BeforeSaveDCEventJob");

                if ($scope.NewDCModel.ATBlastChillerTempOutControlId > '8') {
                   // SetBOutNCMapping_BeforeSaveDCEvent(EventArgsDataCaptureBO);
                }

                OneViewConsole.Debug("BeforeSaveDCEventJob End", "BakingBCVerificationFacade.BeforeSaveDCEventJob");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.BeforeSaveDCEventJob", xlatService);
            }
        }

        var SetBOutNCMapping_BeforeUpdateDCEvent = function (EventArgsDataCaptureBO) {
            try {
                OneViewConsole.Debug("SetBOutNCMapping_BeforeUpdateDCEvent Start", "BakingBCVerificationFacade.SetBOutNCMapping_BeforeUpdateDCEvent");

                if (DcId != null) {
                    var NCDCId = EventArgsDataCaptureBO.GetNCDcID(DcId);
                    if (NCDCId != undefined) {
                    }
                    else {
                        //SetBOutNCMapping_BeforeSaveDCEvent(EventArgsDataCaptureBO);
                    }
                }

                OneViewConsole.Debug("SetBOutNCMapping_BeforeUpdateDCEvent End", "BakingBCVerificationFacade.SetBOutNCMapping_BeforeUpdateDCEvent");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                NCDCId = null;
            }
        }

       
        var SetTimeInFormatOLD = function (SelectedTime, ControlId) {
            //if (SelectedTime != null) {
            //    var Time = SelectedTime.value;
            //    Time = Time.split(':');
            //    if (Time != "") {
            //        $scope.NewDCModel[ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
            //    }
            //}
            $scope.NewDCModel[ControlId] = SelectedTime.value;
        }


        var SetTimeInFormat = function (SelectedTime, ControlId, RefreshcontrolId) {
            try {
                //if (SelectedTime != null) {
                //    var Time = SelectedTime.value;               
                //    Time = Time.split(':');
                //    if (Time != "") {               
                //        $scope.NewDCModel[ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
                //    }               
                //}
                //$scope.NewDCModel['DTNCChillerTimeOutControlId'] = SelectedTime.value;
                //var dateTime = new DateTime().GetDate() + " " + SelectedTime.value;
                //$scope.NewDCModel["DTNCChillerTimeOutControlId_DateTime"] = dateTime;
                //document.getElementById('DTNCChillerTimeOutControlId').value = dateTime;

                scope.NewDCModel["DTNCChillerTimeOutControlId"] = scope.NewDCModel[RefreshcontrolId];
            }
            catch (Excep) {
                //alert('SetTimeInFormat Excep:' + Excep);
                throw Excep;
            }
            finally {
                TempOutNCTemplate = null;
                _oNCDcDataCaptureBO = null;
                NCDCId = null;
            }
        }

        this.PreControlEvents = function (AttributeId, ControlId, $event) {
            try {

                _oDataCaptureBO.PreControlEvents(AttributeId, ControlId, $event);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.PreControlEvents", xlatService);
            }
        }
        this.PostControlEvents = function (AttributeId, ControlId) {
            try {

                _oDataCaptureBO.PostControlEvents(AttributeId, ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.PostControlEvents", xlatService);
            }
        }
        this.ngChange_setDateTime = function (ControlId) {
            try {
                _oDataCaptureBO.ngChange_setDateTime(ControlId);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ngChange_setDateTime", xlatService);
            }
        }



        this.NCClick = function ($compile) {

            try {
                _oDataCaptureBO.LoadNCCommentsHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.NCClick", xlatService);
            }
            finally {
            }
        }

        this.NCTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendNCHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.NCTabClick", xlatService);
            }
            finally {
            }
        }

        this.ObservationTabClick = function ($compile) {

            try {
                _oDataCaptureBO.AppendObservationHtml($compile);
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ObservationTabClick", xlatService);
            }
            finally {
            }
        }

        this.CustomNCClick = function () {

            try {
                _oDataCaptureBO.CustomNCClick();
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.CustomNCClick", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.CloseRightPanel", xlatService);
            }
        }
        this.ClearReasons = function () {
            try {
                $scope.NewDCModel["NCComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ClearReasons", xlatService);
            }
        }

        this.ClearComments = function () {
            try {
                $scope.NewDCModel["ObservationComments"] = '';
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.ClearComments", xlatService);
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
                oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingVerificationFacade.ProbeTesting", xlatService);
            }
        }

        var LoadNCddl = function () {
            try {
                OneViewConsole.Debug("LoadNCddl Start", "BakingBCVerificationFacade.LoadNCddl");

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
                    new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'ddlDepartmentControlId', 'DataSourceModelName': 'Department', 'DisplayElementModelName': 'NewDCModel.ddlDepartmentControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Department, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10336, 'SelectedIndexChangedEventHandler': oDepartmentSelectedIndexChanged, 'IsDynamicElementCreationEnabled': false });
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
                      new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'ddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.ddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'AttributeNodeId': 10337, 'IsDynamicElementCreationEnabled': false });
                    oSectionddl.Clear();
                    oSectionddl.SetDataSourceFromTreeChildsWithType(DCPlaceNodeId, DATEntityType.RCOMaster_Location, _TableNamesEnum.OrganizationAssetsNode);
                    $scope.ddlSectionControlId = oSectionddl;
                }
                //enable dep section ddl end
                OneViewConsole.Debug("LoadNCddl End", "BakingBCVerificationFacade.LoadNCddl");
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
                OneViewConsole.Debug("oDepartmentSelectedIndexChanged Start", "BakingBCVerificationFacade.oDepartmentSelectedIndexChanged");

                if (EventArgs != null && EventArgs.NewValue.Id != null && EventArgs.NewValue.Id > 0) {

                    var oSectionddl = new AutoCompleteUserControl({ 'Scope': $scope, 'ControlId': 'ddlSectionControlId', 'DataSourceModelName': 'Section', 'DisplayElementModelName': 'NewDCModel.ddlSectionControlId', 'DATEntityTypeId': DATEntityType.RCOMaster_Location, 'xlatService': xlatService, 'ToasterService': '', 'MinCharToSearch': 0, 'IsDynamicElementCreationEnabled': false, 'AttributeNodeId': 10337 });
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

                OneViewConsole.Debug("oDepartmentSelectedIndexChanged End", "BakingBCVerificationFacade.oDepartmentSelectedIndexChanged");
            }
            catch (Excep) {
                throw Excep;
            }
            finally {
                oSectionddl = null;
            }
        }
}






