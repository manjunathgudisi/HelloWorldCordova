
function VallidationHandler() {
    try {
        OneViewConsole.Debug("VallidationHandler Start", "Framework.VallidationHandler");

        var MyInstance = this;

        //Parm {DataCaptureEntity:DataCaptureEntity,scope:$scope,toaster:toaster;,xlatService:xlatService,ClientValidatorConfigList:ClientValidatorConfigList}
        //this.Validate = function (_oDataCaptureEntity, $scope, toaster, xlatService, ClientValidatorConfigList) {
        this.Validate = function (parm) {
            try {
                OneViewConsole.Debug("Validate Start", "VallidationHandler.Validate");

                var _oDataCaptureEntity = parm.DataCaptureEntity;
                var $scope = parm.scope;
                var toaster = parm.toaster;
                var xlatService = parm.xlatService;
                var ClientValidatorConfigList = parm.ClientValidatorConfigList;
                var Operation = parm.Operation;
                var IsEnableMandatoryStyle = parm.IsEnableMandatoryStyle;
                var IsPageLoad = parm.IsPageLoad;
                var PageLoadMandatoryOperation = parm.PageLoadMandatoryOperation;
                var IsAutoSave = parm.IsAutoSave;

                var oDefaultValidationResponse = null;
                for (var i = 0; i < ClientValidatorConfigList.length; i++) {

                    var _oValidator = ClientValidatorConfigList[i];
                    var oCustomClientValidator = new window[_oValidator.ClassName]();
                    // var oCustomClientValidator = new MandatoryValidation();
                    oDefaultValidationResponse = oCustomClientValidator.Validate(_oDataCaptureEntity, $scope, xlatService, toaster, Operation, IsEnableMandatoryStyle, IsPageLoad, PageLoadMandatoryOperation, IsAutoSave);

                    if (oDefaultValidationResponse.IsSuccess == false) {

                        if (oDefaultValidationResponse.IsPrompt == true) {
                            alert("Not implemented exception");
                            //user not allowed to excecute, break the checking  // break;
                            // If user allows, excecute next set //oDefaultValidationResponse.IsSuccess=true
                        }
                        else {
                            IsValidationSuccess = false;
                            if (oDefaultValidationResponse.IsErrorMessageExecuted == false) {

                                if (oDefaultValidationResponse.FinalFormatedMessage != undefined && oDefaultValidationResponse.FinalFormatedMessage != '') {
                                    alert(xlatService.xlat(oDefaultValidationResponse.MessageKey));
                                   // toaster.pop('error', xlatService.xlat('Title_Error'), xlatService.xlat(oDefaultValidationResponse.MessageKey));
                                }

                                else {
                                    alert(xlatService.xlat(oDefaultValidationResponse.MessageKey));
                                   // toaster.pop('error', xlatService.xlat('Title_Error'), xlatService.xlat(oDefaultValidationResponse.MessageKey));
                                }
                               // $scope.$apply();
                            }
                            break;
                        }
                    }
                }

                OneViewConsole.Debug("Validate End", "VallidationHandler.Validate");

                return oDefaultValidationResponse;
            }
            catch (Excep) {
               // alert("VallidationHandler.Validate" + Excep);
              //  alert("VallidationHandler.Validate" + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("FrameWork", "VallidationHandler.Validate", Excep);
            }
            finally {
                _oDataCaptureEntity = null;
                $scope = null;
                toaster = null;
                xlatService = null;
                ClientValidatorConfigList = null;
                Operation = null;
                oDefaultValidationResponse = null;
                _oValidator = null;
                oCustomClientValidator = null;              
            }
        }


        this.SetMandatoryValidationStyle = function (parm) {
            try {
                OneViewConsole.Debug("SetMandatoryValidationStyle Start", "VallidationHandler.SetMandatoryValidationStyle");

                var oDefaultValidationResponse = MyInstance.Validate(parm);

                OneViewConsole.Debug("SetMandatoryValidationStyle End", "VallidationHandler.SetMandatoryValidationStyle");

                return oDefaultValidationResponse;
            }
            catch (Excep) {
                alert("VallidationHandler.SetMandatoryValidationStyle" + Excep);
                alert("VallidationHandler.SetMandatoryValidationStyle" + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("FrameWork", "VallidationHandler.SetMandatoryValidationStyle", Excep);
            }
            finally {
            }
        }

        OneViewConsole.Debug("VallidationHandler End", "Framework.VallidationHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "VallidationHandler", Excep);
    }
}



function BluetoothOnValidation() {
    try {
        OneViewConsole.Debug("BluetoothOnValidation Start", "Framework.BluetoothOnValidation");

        this.Validate = function ($scope, xlatService) {
            try {
                OneViewConsole.Debug("Validate Start", "BluetoothOnValidation.Validate");

                var _oOneViewBluetoothPlugin = new OneViewBluetoothPlugin();
                var IsSuccess = _oOneViewBluetoothPlugin.IsBluetoothOn();

                var oDefaultValidationResponse = new DefaultValidationResponse();
                oDefaultValidationResponse.IsSuccess = IsSuccess;

                if (IsSuccess == false) {
                    oDefaultValidationResponse.MessageKey = "OnBluetooth";
                }

                OneViewConsole.Debug("Validate End", "BluetoothOnValidation.Validate");

                return oDefaultValidationResponse;
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "BluetoothOnValidation.Validate", Excep);
            }
            finally {
                _oOneViewBluetoothPlugin = null;
                IsSuccess = null;
                oDefaultValidationResponse = null;
            }
        }

        OneViewConsole.Debug("BluetoothOnValidation End", "Framework.BluetoothOnValidation");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "BluetoothOnValidation", Excep);
    }
}

///////************** Validator to check/validate that provided field is not left empty ***********////////////

                     
//TODO:Need to handle with diffrent data type
function MandatoryValidator() {
    try {
        OneViewConsole.Debug("MandatoryValidator Start", "Framework.MandatoryValidator");

        var MyInstance = this;
        var MandatoryMetaDataForAll = OneViewSessionStorage.Get("MandatoryMetaData");

        this.ValidateOLD = function (AryDcResultDetails, $scope, xlatService, toaster, Operation) {
            try {
                OneViewConsole.Debug("Validate Start", "MandatoryValidator.Validate");
                
                MandatoryMetaDataForAll = JSON.parse(MandatoryMetaDataForAll);
                //alert("MandatoryMetaDataForAll : " + JSON.stringify(MandatoryMetaDataForAll));
                var oDefaultValidationResponse = new DefaultValidationResponse();
                oDefaultValidationResponse.IsSuccess = true;
                var MetData = MandatoryMetaDataForAll[Operation];

                var MandatoryElementsArray = MetData.MandatoryElements;
                var CombinedMessage = xlatService.xlat('Mandatory');
                var SuffixMessage = xlatService.xlat('and');
              

                var IsAnyEmpty = false;
                var CountOfEmpty = 0;

                var oScope=$scope;

               
                for (var itr1 = 0; itr1 < MandatoryElementsArray.length ; itr1++) {

                    if (MandatoryElementsArray[itr1].Type == undefined || MandatoryElementsArray[itr1].Type == "DefaultDCValidationRuleMetaData"){

                        var AttributeNodeId = MandatoryElementsArray[itr1].AttributeNodeId;
                    var ControlId = MandatoryElementsArray[itr1].ControlId;
                    var defaultValue = MandatoryElementsArray[itr1].DefaultValue;
                    defaultValue = defaultValue.toLowerCase();
                    for (var itr2 = 0; itr2 < AryDcResultDetails.length ; itr2++) {

                        var IsEmpty = false;
                        var DcResultDetailsEntity = AryDcResultDetails[itr2];
                        var IsListData = false;
                        if (DcResultDetailsEntity.AttributeNodeId == AttributeNodeId && DcResultDetailsEntity.ControlId == ControlId) {
                            var valueFromPage = DcResultDetailsEntity.Answer;
                           
                            if (DcResultDetailsEntity.AnswerDataType == 'STRING' && DcResultDetailsEntity.AnswerDataType != "") {
                                valueFromPage = valueFromPage.toLowerCase();
                            }

                            if (DcResultDetailsEntity.IsDynamicAnswer == 'true') {
                                if (DcResultDetailsEntity.AnswerValue == undefined || DcResultDetailsEntity.AnswerValue == '') {
                                    oDefaultValidationResponse.IsSuccess = false;
                                    IsAnyEmpty = true;
                                    IsEmpty = true;
                                    CountOfEmpty++;
                                }
                            }
                            else if (valueFromPage === defaultValue || valueFromPage === '' || valueFromPage == undefined) {
                                oDefaultValidationResponse.IsSuccess = false;

                                IsAnyEmpty = true;
                                IsEmpty = true;
                                CountOfEmpty++;
                            }

                            if (IsEmpty == true && CountOfEmpty == MandatoryElementsArray.length && CountOfEmpty != 1) {
                                CombinedMessage = CombinedMessage + SuffixMessage + xlatService.xlat(MandatoryElementsArray[itr1].ErrorMessageKey);
                            }

                            else if (CountOfEmpty > 1 && IsEmpty == true) {
                                CombinedMessage = CombinedMessage + "," + xlatService.xlat(MandatoryElementsArray[itr1].ErrorMessageKey);
                            }

                            else if (IsEmpty == true) {
                                CombinedMessage = CombinedMessage + xlatService.xlat(MandatoryElementsArray[itr1].ErrorMessageKey);
                            }

                        }
                    }
                    }
                    else if (MandatoryElementsArray[itr1].Type == "AdvanceDCValidationRuleMetaData") {
                        //alert("MandatoryElementsArray[itr1]" + MandatoryElementsArray[itr1].DCValidationRule);  
                        //alert("Eval " + eval(MandatoryElementsArray[itr1].DCValidationRule));
                        if (eval(MandatoryElementsArray[itr1].DCValidationRule) == false) {
                            oDefaultValidationResponse.IsSuccess = false;
                            IsAnyEmpty = true;
                            CountOfEmpty++;
                            if (CountOfEmpty > 1) {
                                CombinedMessage = CombinedMessage + "," + xlatService.xlat(MandatoryElementsArray[itr1].ErrorMessageKey);
                            }
                            else {
                                CombinedMessage = CombinedMessage +  xlatService.xlat(MandatoryElementsArray[itr1].ErrorMessageKey);
                            }
                        }
                    }

                }
                //if (IsAnyEmpty == true && Operation != 'Submit') {
                if (IsAnyEmpty == true) {
                    // toaster.pop('warning', xlatService.xlat('Title_Notification'), CombinedMessage);
                    alert(CombinedMessage);
                }

                oDefaultValidationResponse.IsErrorMessageExecuted = true;

                OneViewConsole.Debug("Validate End", "MandatoryValidator.Validate");

                return oDefaultValidationResponse;
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "MandatoryValidator.Validate", Excep);
            }
            finally {
                MandatoryMetaDataForAll = null;
                oDefaultValidationResponse = null;
                MetData = null;
                MandatoryElementsArray = null;
                CombinedMessage = null;
                SuffixMessage = null;
                IsAnyEmpty = null;
                CountOfEmpty = null;
                AttributeNodeId = null;
                ControlId = null;
                defaultValue = null;
                IsEmpty = null;
                DcResultDetailsEntity = null;
                IsListData = null;
                valueFromPage = null;
            }
        }

        this.Validate = function (AryDcResultDetails, $scope, xlatService, toaster, Operation, IsEnableMandatoryStyle, IsPageLoad, PageLoadMandatoryOperation, IsAutoSave) {
            try {
                OneViewConsole.Debug("Validate Start", "MandatoryValidator.Validate");
                
                var CombinedMessage = xlatService.xlat('Mandatory');
                var SuffixMessage = xlatService.xlat('and');

                MandatoryMetaDataForAll = JSON.parse(MandatoryMetaDataForAll);

                var oDefaultValidationResponse = new DefaultValidationResponse();
                oDefaultValidationResponse.IsSuccess = true;

                if (IsPageLoad == true && PageLoadMandatoryOperation == 'Save') {
                    var Metadata = MandatoryMetaDataForAll.SaveValidationMetaData;
                    //alert("Metadata : " + JSON.stringify(Metadata));
                    MyInstance.ValidateBeforeSaveOrSubmit(Metadata, CombinedMessage, SuffixMessage, oDefaultValidationResponse, AryDcResultDetails, $scope, xlatService, IsEnableMandatoryStyle, IsPageLoad, IsAutoSave);
                }
                else if (IsPageLoad == true && PageLoadMandatoryOperation == 'Submit') {
                    var Metadata = MandatoryMetaDataForAll.SubmitValidationMetaData;
                    MyInstance.ValidateBeforeSaveOrSubmit(Metadata, CombinedMessage, SuffixMessage, oDefaultValidationResponse, AryDcResultDetails, $scope, xlatService, IsEnableMandatoryStyle, IsPageLoad, IsAutoSave);
                }
                else if (Operation == 'Save') {
                    var Metadata = MandatoryMetaDataForAll.SaveValidationMetaData;
                    //alert("Metadata : " + JSON.stringify(Metadata));
                    MyInstance.ValidateBeforeSaveOrSubmit(Metadata, CombinedMessage, SuffixMessage, oDefaultValidationResponse, AryDcResultDetails, $scope, xlatService, IsEnableMandatoryStyle, IsPageLoad, IsAutoSave);
                }
                else if (Operation == 'Submit') {
                    var Metadata = MandatoryMetaDataForAll.SubmitValidationMetaData;
                    MyInstance.ValidateBeforeSaveOrSubmit(Metadata, CombinedMessage, SuffixMessage, oDefaultValidationResponse, AryDcResultDetails, $scope, xlatService, IsEnableMandatoryStyle, IsPageLoad, IsAutoSave);
                }

                
                OneViewConsole.Debug("Validate End", "MandatoryValidator.Validate");

                return oDefaultValidationResponse;
            }

            catch (Excep) {
               // alert("MandatoryValidator.Validate" + Excep);
               // alert("MandatoryValidator.Validate" + JSON.stringify( Excep));
                throw oOneViewExceptionHandler.Create("FrameWork", "MandatoryValidator.Validate", Excep);
            }
            finally {               
                oDefaultValidationResponse = null;
                MetData = null;
                MandatoryElementsArray = null;
                CombinedMessage = null;
                SuffixMessage = null;
                IsAnyEmpty = null;
                CountOfEmpty = null;
                AttributeNodeId = null;
                ControlId = null;
                defaultValue = null;
                IsEmpty = null;
                IsListData = null;
                valueFromPage = null;
            }
        }

        this.ValidateBeforeSaveOrSubmit = function (Metadata, CombinedMessage, SuffixMessage, oDefaultValidationResponse, AryDcResultDetails, $scope, xlatService, IsEnableMandatoryStyle, IsPageLoad, IsAutoSave) {
            try {
              
                OneViewConsole.Debug("ValidateBeforeSaveOrSubmit Start", "MandatoryValidator.ValidateBeforeSaveOrSubmit");
                
                var IsAnyEmpty = false;
                var CountOfEmpty = 0;

                var oScope = $scope;

                if (Metadata != undefined) {
                    if (Metadata.IsAgainstDC == true) {
                       // alert('Metadata :' + JSON.stringify(Metadata));
                        if (Metadata.DCValidationRuleMetaData != undefined) {
                            for (var i = 0; i < Metadata.DCValidationRuleMetaData.length ; i++) {
                               // alert('Metadata.DCValidationRuleMetaData :' + JSON.stringify(Metadata.DCValidationRuleMetaData));
                                if (Metadata.DCValidationRuleMetaData[i].Type == "DefaultDCValidationRuleMetaData") {
                                    if (Metadata.DCValidationRuleMetaData[i].MandatoryElements != undefined) {
                                        var FailedAttributeNodeList = [];
                                        var PassedAttributeNodeList = [];
                                        var MandatoryElementsArray = Metadata.DCValidationRuleMetaData[i].MandatoryElements;
                                        for (var itr1 = 0; itr1 < MandatoryElementsArray.length ; itr1++) {
                                            var AttributeNodeId = MandatoryElementsArray[itr1].AttributeNodeId;
                                            var ControlId = MandatoryElementsArray[itr1].ControlId;
                                            var defaultValue = MandatoryElementsArray[itr1].DefaultValue;
                                            defaultValue = defaultValue.toLowerCase();

                                            for (var itr2 = 0; itr2 < AryDcResultDetails.length ; itr2++) {

                                                var IsEmpty = false;
                                                var DcResultDetailsEntity = AryDcResultDetails[itr2];
                                                var IsListData = false;
                                                if (DcResultDetailsEntity.AttributeNodeId == AttributeNodeId && DcResultDetailsEntity.ControlId == ControlId) {
                                                    var valueFromPage = DcResultDetailsEntity.Answer;

                                                    if (DcResultDetailsEntity.AnswerDataType == 'STRING' && DcResultDetailsEntity.AnswerDataType != "") {
                                                        valueFromPage = valueFromPage.toLowerCase();
                                                    }

                                                    if (DcResultDetailsEntity.IsDynamicAnswer == 'true') {
                                                        if (DcResultDetailsEntity.AnswerValue == undefined || DcResultDetailsEntity.AnswerValue == '') {
                                                            oDefaultValidationResponse.IsSuccess = false;
                                                            IsAnyEmpty = true;
                                                            IsEmpty = true;
                                                            CountOfEmpty++;
                                                        }
                                                    }
                                                    else if (valueFromPage === defaultValue || valueFromPage === '' || valueFromPage == undefined) {
                                                        oDefaultValidationResponse.IsSuccess = false;

                                                        IsAnyEmpty = true;
                                                        IsEmpty = true;
                                                        CountOfEmpty++;
                                                    }

                                                    if (IsEmpty == true && CountOfEmpty == MandatoryElementsArray.length && CountOfEmpty != 1) {
                                                        CombinedMessage = CombinedMessage + SuffixMessage + xlatService.xlat(MandatoryElementsArray[itr1].ErrorMessageKey);
                                                    }

                                                    else if (CountOfEmpty > 1 && IsEmpty == true) {
                                                        CombinedMessage = CombinedMessage + "," + xlatService.xlat(MandatoryElementsArray[itr1].ErrorMessageKey);
                                                    }

                                                    else if (IsEmpty == true) {
                                                        CombinedMessage = CombinedMessage + xlatService.xlat(MandatoryElementsArray[itr1].ErrorMessageKey);
                                                    }


                                                    if (IsEnableMandatoryStyle == true) {
                                                        if (IsEmpty == true) {
                                                            FailedAttributeNodeList.push({ 'AttributeNodeId': AttributeNodeId, 'ControlId': ControlId });
                                                        }
                                                        else {
                                                            PassedAttributeNodeList.push({ 'AttributeNodeId': AttributeNodeId, 'ControlId': ControlId });
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        if (IsEnableMandatoryStyle == true) {
                                            MyInstance.SetMandatoryFieldsColor(FailedAttributeNodeList, PassedAttributeNodeList, IsPageLoad);
                                        }
                                    }
                                }
                                else if (Metadata.DCValidationRuleMetaData[i].Type == "CustomDCValidationRuleMetaData") {
                              
                                    //alert('CustomDCValidationRuleMetaData'+JSON.stringify(Metadata.DCValidationRuleMetaData[i]));
                                    var Response;

                                    var obj = new window[Metadata.DCValidationRuleMetaData[i].OfflineDCValidationConfigObjectKey];
                                    if (obj != undefined) {
                                        if (IsPageLoad == true) {
                                            //Parameters : AryDcResultDetails, IsAlertMessageEnabled,IsPageLoad
                                            Response = obj.Execute(AryDcResultDetails, false, true);
                                        }
                                        else {
                                            Response = obj.Execute(AryDcResultDetails, true);
                                        }


                                        if (Response.IsSuccess == false) {
                                            IsAnyEmpty = true;
                                            oDefaultValidationResponse.IsSuccess = Response.IsSuccess;
                                            CombinedMessage = CombinedMessage + Response.ErrorMessage;
                                          
                                            if (IsEnableMandatoryStyle == true) {
                                                //alert('Response vv : ' + JSON.stringify(Response));
                                                MyInstance.SetMandatoryFieldsColor(Response.FailedAttributeNodeList, Response.PassedAttributeNodeList, IsPageLoad);
                                            }
                                        }
                                    }
                                }
                                else if (Metadata.DCValidationRuleMetaData[i].Type == "AdvanceDCValidationRuleMetaData") {
                                    //alert('Metadata.DCValidationRuleMetaData[i].FinalJavaScriptEquation) :' + Metadata.DCValidationRuleMetaData[i].FinalJavaScriptEquation);
                                    //alert('eval(Metadata.DCValidationRuleMetaData[i].FinalJavaScriptEquation) : ' + eval(Metadata.DCValidationRuleMetaData[i].FinalJavaScriptEquation));

                                    Metadata.DCValidationRuleMetaData[i].FinalJavaScriptEquation = Metadata.DCValidationRuleMetaData[i].FinalJavaScriptEquation.replace(/#/g, "'");

                                    if (eval(Metadata.DCValidationRuleMetaData[i].FinalJavaScriptEquation) == false) {
                                        oDefaultValidationResponse.IsSuccess = false;
                                        IsAnyEmpty = true;
                                        CountOfEmpty++;
                                        if (CountOfEmpty > 1) {
                                            CombinedMessage = CombinedMessage + "," + xlatService.xlat(Metadata.DCValidationRuleMetaData[i].ErrorMessageKey);
                                        }
                                        else {
                                            CombinedMessage = CombinedMessage + xlatService.xlat(Metadata.DCValidationRuleMetaData[i].ErrorMessageKey);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    else {
                        alert('MandatoryValidator.ValidateBeforeSaveOrSubmit : Not Supported IsAgainstDC=true');
                    }
                }

                //if (IsAnyEmpty == true && Operation != 'Submit') {
                if (IsAnyEmpty == true && IsPageLoad != true) {
                    // toaster.pop('warning', xlatService.xlat('Title_Notification'), CombinedMessage);
                    if (IsAutoSave != true) {
                        alert(CombinedMessage);
                    }
                }

                oDefaultValidationResponse.IsErrorMessageExecuted = true;

                OneViewConsole.Debug("ValidateBeforeSaveOrSubmit End", "MandatoryValidator.ValidateBeforeSaveOrSubmit");

              //  alert('oDefaultValidationResponse :' + JSON.stringify(oDefaultValidationResponse));
                return oDefaultValidationResponse;

            }
            catch (Excep) {
               // alert("MandatoryValidator.ValidateBeforeSaveOrSubmit" + Excep);
              //  alert("MandatoryValidator.ValidateBeforeSaveOrSubmit" + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("FrameWork", "MandatoryValidator.ValidateBeforeSaveOrSubmit", Excep);
            }
        }


        this.SetMandatoryFieldsColor = function (FailedAttributeNodeList, PassedAttributeNodeList, IsPageLoad) {
            try {
              
                OneViewConsole.Debug("SetMandatoryFieldsColor Start", "MandatoryValidator.SetMandatoryFieldsColor");

                var _oDOM = new DOM();
                _oDOM.RemoveClass("ContentId", "has-footer");

                var FailedStyle = "col rounded light-bg  ans-red";             
                if (IsPageLoad == true) {
                    FailedStyle = "col rounded light-bg  ans-mant";
                }

                MyInstance.SetStyleForPassedAttributes(PassedAttributeNodeList);
                MyInstance.SetStyleForFailedAttributes(FailedAttributeNodeList, FailedStyle);
              //  MyInstance.SetOrRemoveClass(FailedAttributeNodeList, FailedStyle, 'AddClass');
              //  MyInstance.SetOrRemoveClass(PassedAttributeNodeList, FailedStyle, 'RemoveClass');

                OneViewConsole.Debug("SetMandatoryFieldsColor End", "MandatoryValidator.SetMandatoryFieldsColor");


            }
            catch (Excep) {
                // alert("MandatoryValidator.SetMandatoryFieldsColor" + Excep);
                //  alert("MandatoryValidator.SetMandatoryFieldsColor" + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("FrameWork", "MandatoryValidator.SetMandatoryFieldsColor", Excep);
            }
        }

        this.SetStyleForPassedAttributes = function (AttributeNodeList) {
            try {

                OneViewConsole.Debug("SetStyleForPassedAttributes Start", "MandatoryValidator.SetStyleForPassedAttributes");

                var PassedStyle = "ans-mant";
                var FailedStyle = "ans-red";
                var _oDOM = new DOM();
                if (AttributeNodeList != undefined && AttributeNodeList != null) {
                    for (var i = 0; i < AttributeNodeList.length; i++) {
                        var TemplateData = AttributeNodeList[i];
                        var DivId = 'Column_' + TemplateData.AttributeNodeId;
                        _oDOM.RemoveClass(DivId, FailedStyle);
                        _oDOM.AddClass(DivId, PassedStyle);
                       
                    }
                }
                OneViewConsole.Debug("SetStyleForPassedAttributes End", "MandatoryValidator.SetStyleForPassedAttributes");


            }
            catch (Excep) {
                alert("MandatoryValidator.SetStyleForPassedAttributes" + Excep);
                alert("MandatoryValidator.SetStyleForPassedAttributes" + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("FrameWork", "MandatoryValidator.SetStyleForPassedAttributes", Excep);
            }
        }


        this.SetStyleForFailedAttributes = function (AttributeNodeList, FailedStyle) {
            try {

                OneViewConsole.Debug("SetStyleForFailedAttributes Start", "MandatoryValidator.SetStyleForFailedAttributes");

                var _oDOM = new DOM();
                var PassedStyle = "col rounded light-bg  ans-mant";
                if (AttributeNodeList != undefined && AttributeNodeList != null) {
                    for (var i = 0; i < AttributeNodeList.length; i++) {
                        var TemplateData = AttributeNodeList[i];
                        var DivId = 'Column_' + TemplateData.AttributeNodeId;
                        _oDOM.RemoveClass(DivId,  "ans-mant");
                        _oDOM.RemoveClass(DivId, "ans-red");
                        _oDOM.AddClass(DivId, FailedStyle);                       
                    }
                }
                OneViewConsole.Debug("SetStyleForFailedAttributes End", "MandatoryValidator.SetStyleForFailedAttributes");


            }
            catch (Excep) {
                alert("MandatoryValidator.SetStyleForFailedAttributes" + Excep);
                alert("MandatoryValidator.SetStyleForFailedAttributes" + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("FrameWork", "MandatoryValidator.SetStyleForFailedAttributes", Excep);
            }
        }


        this.SetOrRemoveClass = function (AttributeNodeList, Class, OperationToDo) {
            try {

                OneViewConsole.Debug("SetOrRemoveClass Start", "MandatoryValidator.SetOrRemoveClass");

                var _oDOM = new DOM();
                if (AttributeNodeList != undefined && AttributeNodeList != null) {
                    for (var i = 0; i < AttributeNodeList.length; i++) {
                        var TemplateData = AttributeNodeList[i];
                        var DivId = 'Div_' + TemplateData.AttributeNodeId + '_' + TemplateData.ControlId;
                        //alert(DivId  + ", "+ OperationToDo + ' , TemplateData : ' + JSON.stringify(TemplateData));
                        if (OperationToDo == 'AddClass') {
                            _oDOM.AddClass(DivId, Class);
                        }
                        else if (OperationToDo == 'RemoveClass') {
                            _oDOM.RemoveClass(DivId, Class);
                        }
                    }
                }
                OneViewConsole.Debug("SetOrRemoveClass End", "MandatoryValidator.SetOrRemoveClass");


            }
            catch (Excep) {
                alert("MandatoryValidator.SetOrRemoveClass" + Excep);
                alert("MandatoryValidator.SetOrRemoveClass" + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("FrameWork", "MandatoryValidator.SetOrRemoveClass", Excep);
            }
        }


        OneViewConsole.Debug("MandatoryValidator End", "Framework.MandatoryValidator");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "MandatoryValidator", Excep);
    }

}



        //    for (var itr1 = 0; itr1 < MandatoryMetaDataForSpecific.MandatoryElements.length ; itr1++) {

        //            for (var itr2 = 0; itr2 < _oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList.length ; itr2++) {

        //                if (MandatoryMetaDataForSpecific.MandatoryElements[itr1].AttributeNodeId == _oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList[itr2].AttributeNodeId
        //                    && MandatoryMetaDataForSpecific.MandatoryElements[itr1].ControlId == _oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList[itr2].ControlId) {

        //                    var entityColumnValue = _oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList[itr2].AnswerValue;
        //                    var defaultValue= MandatoryMetaDataForSpecific.MandatoryElements[itr1].DefaultValue;

        //                    var defaultValueLowerCase = defaultValue.toLowerCase();
        //                    var pattern = "[^" + defaultValue + "|" + defaultValueLowerCase + "|" + '""' + "|\s" + " ]";
        //                    var regexValidateResponse = entityColumnValue.match(pattern);

        //                    if (regexValidateResponse != null) {
        //                        oDefaultValidationResponse.IsSuccess = true;
        //                    }
        //                    else {
        //                        oDefaultValidationResponse.IsSuccess = false;
        //                        oDefaultValidationResponse.MessageKey = "Mandatory";
        //                    }
        //            }
        //        }

        //    }    
          
        //    return oDefaultValidationResponse;
        //}
        //catch (Excep) {
        //    alert("MandatoryValidation.Validate" + Excep)
        //    oOneViewExceptionHandler.Catch(Excep, "MandatoryValidation.Validate");
//        //}
//    }
//}




//function MandatoryValidationOLD() {
//    try {
//        var _oDefaultValidationResponse = new DefaultValidationResponse();

//        /// <summary>
//        /// To Check user credentials is provided or not.
//        /// </summary>
//        /// <param name="User">UserName and Password Provided</param>
//        /// <returns>ValidationResponse :1. It returns false if user credentials field is empty with the message to display to user and retuns true if it is not empty</returns>


//        this.Validate = function (User, xlatService) {
//            try {
//                OneViewConsole.Debug("MandatoryValidation Start", "MandatoryValidation.Validate");
//                OneViewConsole.Debug("User :", JSON.stringify(User));
//                if (User == undefined) {
//                    _oDefaultValidationResponse.IsSuccess = false;

//                    _oDefaultValidationResponse.MessageKey = xlatService.xlat("ProvideCredentials");
//                }
//                else if (User.UserName != undefined && User.Password != undefined && User.UserName != "" && User.Password != "") {

//                    _oDefaultValidationResponse.IsSuccess = true;
//                }
//                else {
//                    _oDefaultValidationResponse.IsSuccess = false;

//                    _oDefaultValidationResponse.MessageKey = xlatService.xlat("ProvideCredentials");
//                }
//                OneViewConsole.Debug("Response from validation" + JSON.stringify(_oDefaultValidationResponse), "MandatoryValidation.Validate");
//                OneViewConsole.Debug("MandatoryValidation End", "MandatoryValidation.Validate");
//                return _oDefaultValidationResponse;
//            }

//            catch (Excep) {
//                oOneViewExceptionHandler.Catch(Excep, "MandatoryValidation.Validate");
//            }
//        }
//    }
//    catch (Excep) {
//        alert("MandatoryValidation" + Excep)
//        oOneViewExceptionHandler.Catch(Excep, "MandatoryValidation");
//    }
//}


