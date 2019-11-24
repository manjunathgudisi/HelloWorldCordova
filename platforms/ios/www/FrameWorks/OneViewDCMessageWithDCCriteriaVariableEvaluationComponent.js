
// OneViewDCMessageWithDCCriteriaVariableEvaluationComponent
function OneViewDCMessageWithDCCriteriaVariableEvaluationComponent() {

    this.Evaluvate = function (oOneViewDCMessageWithDCCriteriaVariable) {

        try {
            var MessageKey = null;

            if (oOneViewDCMessageWithDCCriteriaVariable != undefined && oOneViewDCMessageWithDCCriteriaVariable != null) {

                MessageKey = oOneViewDCMessageWithDCCriteriaVariable.MessageKey;

                for (var key in oOneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation) {

                    if (oOneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key] != undefined && oOneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key] != null) {

                        oOneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key] = oOneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key].replace(/#/g, "'");
                        MessageKey = MessageKey.replace(key, eval(oOneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key]));
                    }
                }
            }

            return MessageKey;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewDCMessageWithDCCriteriaVariableEvaluationComponent.Evaluvate", Excep);
        }
        finally {
        }
    }

    var GetRCOMaster = function(ControlId, ColumnName, Separator) {
        try {
            var Result = "";

            if (scope[ControlId].GetSelectedValue() != "" && scope[ControlId].GetSelectedValue() != undefined) {
                var _oOrganizationAssetsNodeDAO = new DefaultMasterDAO("OrganizationAssetsNode");
                var AssetsNode = _oOrganizationAssetsNodeDAO.GetByServerId(scope[ControlId].GetSelectedValue());

                if (AssetsNode.length > 0 && ColumnName == undefined) {
                    Result = AssetsNode[0].ChildDbElementName;
                }

                else if (AssetsNode.length > 0 && ColumnName != undefined) {
                    var _oRcoMasterDAO = new DefaultMasterDAO("RcoMasterEntity");
                    var Rco = _oRcoMasterDAO.GetByServerId(AssetsNode[0].ChildDbElementId);
                    if (Rco.length > 0) {
                        if (ColumnName.indexOf(',') == -1) {
                            Result = Rco[0][ColumnName];
                        }
                        else {
                            var ColumnNames = ColumnName.split(",");
                            for (var i = 0; i < ColumnNames.length; i++) {
                                Result += Rco[0][ColumnNames[0]] + (i = ColumnNames.length - 2) ? Separator : "";
                            }
                        }
                    }
                }
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "GetRCOMaster", Excep);
        }
    }

    var GetRCOMasterAdv = function (Config) {
        try {
            var Result = "";

            if (Config != undefined) {
                var _oOneViewDCCriteriaNodeElementAdvanceComponent = new OneViewDCCriteriaNodeElementAdvanceComponent();
                Result = _oOneViewDCCriteriaNodeElementAdvanceComponent.Evaluate(JSON.parse(Config));
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewDCMessageWithDCCriteriaVariableEvaluationComponent.GetRCOMasterAdv", Excep);
        }
    }

    var GetDateTimeAdv = function (Config) {
        try {
            var Result = "";

            if (Config != undefined) {

                var _oOneViewDCCriteriaCurrentDateTimeComponent = new OneViewDCCriteriaCurrentDateTimeComponent();
                Result = _oOneViewDCCriteriaCurrentDateTimeComponent.Evaluate(JSON.parse(Config));
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewDCMessageWithDCCriteriaVariableEvaluationComponent.GetDateTimeAdv", Excep);
        }
    }
}

// OneViewDCCriteriaCurrentDateTimeComponent
function OneViewDCCriteriaCurrentDateTimeComponent() {

    this.Evaluate = function (Config) {

        try {
            var Result = "";
          
            if (Config.Key == "OneViewDCCriteriaCurrentDateTime") {

                if (Config.IsDeviceTime == true) {

                    if (Config.DateTimeOperationConfig != null) {

                        var _oDefaultDateTimeColumnDisplayConfigComponent = new DefaultDateTimeColumnDisplayConfigComponent();
                        Result = _oDefaultDateTimeColumnDisplayConfigComponent.Evaluate(Config.DateTimeOperationConfig);
                    }
                }
                else if (Config.IsServerTime == true) {
                    alert("Not implemented Exception IsServerTime = " + Config.IsServerTime + ", OneViewDCMessageWithDCCriteriaVariableEvaluationComponent.Evaluate");
                }
            }
            else {
                alert("Not implemented Exception Key = " + Config.Key + ", OneViewDCMessageWithDCCriteriaVariableEvaluationComponent.Evaluate");
            }
              
            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "OneViewDCCriteriaCurrentDateTimeComponent.Evaluate", Excep);
        }
        finally {
            Expression = null;
            _oLVDefaultAnswerModeComponent = null;
        }
    }
}

// OneViewDCCriteriaNodeElementAdvanceComponent
function OneViewDCCriteriaNodeElementAdvanceComponent() {

    this.Evaluate = function (Config) {

        try {
            var Expression = "";
           
            if (Config.DisplayCloumnConfigDict != null) {

                var Answer = "";

                if (LVscope == null) {
                    if (Config.AnswerModeType == "DDL") {                      
                        Answer = scope[Config.ControlId].GetSelectedValue();
                    }
                    else {
                        alert("Not implemented Exception AnswerModeType = " + Config.AnswerModeType + ", DefaultStringCloumnDisplayConfigComponent.Evaluate");
                    }
                }
                else {
                    Answer = LVAnswerModeComponent.GetAnswer(Config.TemplateNodeId, Config.ControlId);
                }

                var Master = new Array();

                if (Answer != "") {
                    var _oOrganizationAssetsNodeDAO = new DefaultMasterDAO("OrganizationAssetsNode");
                    var AssetsNode = _oOrganizationAssetsNodeDAO.GetByServerId(Answer);

                    if (AssetsNode.length > 0) {
                        Master = new DefaultMasterDAO("RcoMasterEntity").GetByServerId(AssetsNode[0].ChildDbElementId);
                    }
                }

                Expression = Config.Expression;

                var _oMaster = null;
                if (Master.length > 0) {
                    _oMaster = Master[0];
                }
               
                for (var itrDisplayCloumnConfigDictKey in Config.DisplayCloumnConfigDict) {

                    var Result = (_oMaster != null) ? _oMaster[Config.DisplayCloumnConfigDict[itrDisplayCloumnConfigDictKey].ColumnName] : "";
                  
                    if (Config.DisplayCloumnConfigDict[itrDisplayCloumnConfigDictKey].Key == "DefaultStringCloumnDisplayConfig") {

                        if (Result != "") {
                            var _oDefaultStringCloumnDisplayConfigComponent = new DefaultStringCloumnDisplayConfigComponent();
                            Result = _oDefaultStringCloumnDisplayConfigComponent.Evaluate(Result, Config.DisplayCloumnConfigDict[itrDisplayCloumnConfigDictKey]);
                        }
                    }
                    else {
                        alert("Not implemented Exception Key = " + Config.DisplayCloumnConfigDict[itrDisplayCloumnConfigDictKey].Key + ", DefaultStringCloumnDisplayConfigComponent.Evaluate");
                    }

                    Expression = Expression.replace('$vn$' + itrDisplayCloumnConfigDictKey + '$vn$', Result);
                }
            }           

            return Expression;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "OneViewDCCriteriaNodeElementAdvanceComponent.Evaluate", Excep);
        }
        finally {
            Expression = null;
            _oLVDefaultAnswerModeComponent = null;
        }
    }
}

// DefaultStringCloumnDisplayConfigComponent
function DefaultStringCloumnDisplayConfigComponent() {

    this.Evaluate = function (InputString, Config) {

        try {
            var Result = "";

            if (Config.StringOperationConfig != null && Config.StringCaseFormat != null) {
                alert("Not implemented Exception StringOperationConfig and StringCaseFormat, DefaultStringCloumnDisplayConfigComponent.Evaluate");
            }
            else if (Config.StringOperationConfig != null && Config.StringCaseFormat == null) {
                alert("Not implemented Exception StringOperationConfig, DefaultStringCloumnDisplayConfigComponent.Evaluate");
            }
            else if (Config.StringOperationConfig == null && Config.StringCaseFormat != null) {
                alert("Not implemented Exception StringCaseFormat, DefaultStringCloumnDisplayConfigComponent.Evaluate");
            }
            else {
                Result = InputString;
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "DefaultStringCloumnDisplayConfigComponent.Evaluate", Excep);
        }
        finally {
            Result = null;
        }
    }
}

// DefaultDateTimeColumnDisplayConfigComponent
function DefaultDateTimeColumnDisplayConfigComponent() {

    this.Evaluate = function (Config) {

        try {       
            var Result = "";

            if (Config.DateTimeMode == 1) {

                if (Config.Format == "MM") {
                    Result = new DateTime().GetMonth();
                }
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "DefaultStringCloumnDisplayConfigComponent.Evaluate", Excep);
        }
        finally {
            Result = null;
        }
    }
}

