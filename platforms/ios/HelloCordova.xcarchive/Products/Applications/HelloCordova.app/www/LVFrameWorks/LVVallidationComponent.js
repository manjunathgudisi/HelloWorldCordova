
function LVDefaultVallidationHandler() {
    try {
        OneViewConsole.Debug("LVVallidationHandler Start", "LVFramework.LVVallidationHandler");

        this.Validate = function (parm) {
            try {
                OneViewConsole.Debug("Validate Start", "VallidationHandler.Validate");

                var oDefaultValidationResponse = null;

                var oMandatoryValidator = new LVMandatoryValidator()
                oDefaultValidationResponse = oMandatoryValidator.Validate(parm);

                OneViewConsole.Debug("Validate End", "LVVallidationHandler.Validate");

                return oDefaultValidationResponse;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("LVFrameWork", "LVVallidationHandler.Validate", Excep);
            }
            finally {                            
                oDefaultValidationResponse = null;              
            }
        }

        OneViewConsole.Debug("LVVallidationHandler End", "LVFrameWork.LVVallidationHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("LVFrameWork", "LVVallidationHandler", Excep);
    }
}

function LVMandatoryValidator() {
    try {
        OneViewConsole.Debug("LVMandatoryValidator Start", "LVFrameWork.LVMandatoryValidator");

        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        var TemplateId = OneViewSessionStorage.Get("TemplateId");

        this.Validate = function (parm) {
            try {
                var LVTemplateResult = parm.LVTemplateResult;
                var xlatService = parm.xlatService;

                var Operation = parm.Operation;
                var MandatoryMetaDataForAll = ReadMandatoryMetaData(Operation);
                var oDefaultValidationResponse = { "IsSuccess": false, "ErrorMessage": "" };
               
                var CombinedMessage = xlatService.xlat('Mandatory');
                var SuffixMessage = xlatService.xlat('and');

                var IsAnyEmpty = false;
                var CountOfEmpty = 0;

                if (MandatoryMetaDataForAll != undefined) {

                    var MandatoryMetData = MandatoryMetaDataForAll.DCValidationRuleMetaData;
                   
                    if (MandatoryMetData != undefined) {

                        oDefaultValidationResponse.IsSuccess = true;

                        for (var itr1 = 0; itr1 < MandatoryMetData.length; itr1++) {

                            if (MandatoryMetData[itr1].Type == "DefaultDCValidationRuleMetaData") {

                                var MandatoryElements = MandatoryMetData[itr1].MandatoryElements;
                              
                                if (MandatoryElements.length > 0) {
                                    for (var i = 0; i < MandatoryElements.length; i++) {
                                        var IsEmpty = false;

                                        if (MandatoryElements[i].AttributeNodeId != undefined) {

                                            var AttributeNodeId = MandatoryElements[i].AttributeNodeId;

                                            if (LVTemplateResult[AttributeNodeId] != undefined) {

                                                if (LVTemplateResult[AttributeNodeId].NA == true || LVTemplateResult[AttributeNodeId].IsBlocker == true) {
                                                }
                                                else {
                                                    var Answer = LVAnswerModeComponent.GetAnswer(MandatoryElements[i].AttributeNodeId, MandatoryElements[i].ControlId);

                                                    if (Answer == "") {
                                                        oDefaultValidationResponse.IsSuccess = false;
                                                        IsAnyEmpty = true;
                                                        IsEmpty = true;
                                                        CountOfEmpty++;
                                                    }
                                                    if (IsEmpty == true && CountOfEmpty == MandatoryElements.length && CountOfEmpty != 1) {
                                                        CombinedMessage = CombinedMessage + SuffixMessage + xlatService.xlat(MandatoryElements[i].ErrorMessageKey);
                                                    }

                                                    else if (CountOfEmpty > 1 && IsEmpty == true) {
                                                        CombinedMessage = CombinedMessage + ", " + xlatService.xlat(MandatoryElements[i].ErrorMessageKey);
                                                    }

                                                    else if (IsEmpty == true) {
                                                        CombinedMessage = CombinedMessage + xlatService.xlat(MandatoryElements[i].ErrorMessageKey);
                                                    }
                                                }
                                            }
                                            else {
                                                if (LVTemplateResult[AttributeNodeId] == undefined) {
                                                    oDefaultValidationResponse.IsSuccess = false;
                                                    IsAnyEmpty = true;
                                                    IsEmpty = true;
                                                    CountOfEmpty++;
                                                }
                                                if (IsEmpty == true && CountOfEmpty == MandatoryElements.length && CountOfEmpty != 1) {
                                                    CombinedMessage = CombinedMessage + SuffixMessage + xlatService.xlat(MandatoryElements[i].ErrorMessageKey);
                                                }

                                                else if (CountOfEmpty > 1 && IsEmpty == true) {
                                                    CombinedMessage = CombinedMessage + ", " + xlatService.xlat(MandatoryElements[i].ErrorMessageKey);
                                                }

                                                else if (IsEmpty == true) {
                                                    CombinedMessage = CombinedMessage + xlatService.xlat(MandatoryElements[i].ErrorMessageKey);
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    // To do : If validaion metadata is not there need to check from configuration (for oDefaultValidationResponse.IsSuccess is true or false)
                                    // For temperary purpose we make it false (It means if there no validation metada we will consider validation failed)
                                    if (Operation == "SubmitValidationMetaData") {
                                        oDefaultValidationResponse.IsSuccess = false;
                                    }
                                }
                            }
                            else if (MandatoryMetData[itr1].Type == "CustomDCValidationRuleMetaData") {
                                alert("CustomDCValidationRuleMetaData not Implemented");
                            }
                            else if (MandatoryMetData[itr1].Type == "AdvanceDCValidationRuleMetaData") {
                                //alert("AdvanceDCValidationRuleMetaData not Implemented");  
                                var FinalJavaScriptEquation = MandatoryMetData[itr1].FinalJavaScriptEquation.replace(/#/g, "'");                                
                                if (eval(FinalJavaScriptEquation) == false) {
                                    oDefaultValidationResponse.IsSuccess = false;
                                    IsAnyEmpty = true;
                                    CountOfEmpty++;
                                    if (CountOfEmpty > 1) {
                                        CombinedMessage = CombinedMessage + "," + xlatService.xlat(MandatoryMetData[itr1].ErrorMessageKey);
                                    }
                                    else {
                                        CombinedMessage = CombinedMessage + xlatService.xlat(MandatoryMetData[itr1].ErrorMessageKey);
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    // To do : If validaion metadata is not there need to check from configuration (for oDefaultValidationResponse.IsSuccess is true or false)
                    // For temperary purpose we make it true (It means if there no validation metada we will consider validation success)
                    if (Operation == "SaveValidationMetaData") {
                        oDefaultValidationResponse.IsSuccess = true;
                    }
                }
               
                oDefaultValidationResponse.ErrorMessage = CombinedMessage;
               
                return oDefaultValidationResponse;
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("LVMandatoryValidator", "Validate", Excep);
            }
            finally {
                MandatoryMetaDataForAll = null;
                oDefaultValidationResponse = null;
                MandatoryMetData = null;
                CombinedMessage = null;
                SuffixMessage = null;
                IsAnyEmpty = null;
                CountOfEmpty = null;
                AttributeNodeId = null;
                defaultValue = null;
                IsEmpty = null;
                LVDcResultDetails = null;
                valueFromPage = null;
            }
        }

        var ReadMandatoryMetaData = function (Operation) {
            try {             
                if (LVTemplateMandatoryValidationMetaData != null && LVTemplateMandatoryValidationMetaData != undefined) {
                   
                    var MandatoryValidationMetaDataForAll = LVTemplateMandatoryValidationMetaData[Operation];                   
                    return MandatoryValidationMetaDataForAll;
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("LVFrameWork", "LVFrameWork.ReadMandatoryMetaData", Excep);
            }
            finally {
                DCPlaceDimension = null;
                MandatoryDataForService = null;                
                MandatoryValidationMetaDataForAll = null;
            }
        }

        OneViewConsole.Debug("LVMandatoryValidator End", "LVFrameWork.LVMandatoryValidator");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("LVFrameWork", "LVMandatoryValidator", Excep);
    }

}
