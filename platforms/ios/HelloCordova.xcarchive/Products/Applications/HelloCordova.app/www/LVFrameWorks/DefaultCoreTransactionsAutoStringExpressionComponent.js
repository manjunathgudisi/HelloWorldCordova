// AutoAnswerConfigComponent
function AutoAnswerConfigComponent(xlatService) {

    this.Evaluate = function (Config) {

        try {
            var Result = "";

            if (Config != undefined && Config != null && Config.Type == "DefaultCoreTransactionsAutoStringExpression") {

                var _oDefaultCoreTransactionsAutoStringExpressionComponent = new DefaultCoreTransactionsAutoStringExpressionComponent(xlatService);
                Result = _oDefaultCoreTransactionsAutoStringExpressionComponent.Evaluate(Config);
            }
            else {
                alert("Not implemented exception, Type = " + Config.Type + ", AutoAnswerConfigComponent.Evaluate");
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "AutoAnswerConfigComponent.Evaluate", Excep);
        }
        finally {
            Expression = null;
            Result = null;
        }
    }
}

// DefaultCoreTransactionsAutoStringExpressionComponent
function DefaultCoreTransactionsAutoStringExpressionComponent(xlatService) {

    this.Evaluate = function (Config) {

        try {
            var Expression = "";

            if (Config != undefined && Config != null && Config.CoreTransactionsAutoStringExpressionKeyConfigDict != null) {

                if (Config.IsOnline == false) {

                    Expression = Config.Expression;

                    for (var itrCoreTransactionsAutoStringDisplayConfigKey in Config.CoreTransactionsAutoStringExpressionKeyConfigDict) {

                        var Result = "";

                        if (Config.CoreTransactionsAutoStringExpressionKeyConfigDict[itrCoreTransactionsAutoStringDisplayConfigKey].Type == "StaticStringExpressionKeyConfig") {

                            var _oStaticStringExpressionKeyConfigComponent = new StaticStringExpressionKeyConfigComponent(xlatService);
                            Result = _oStaticStringExpressionKeyConfigComponent.Evaluate(itrCoreTransactionsAutoStringDisplayConfigKey, Config.CoreTransactionsAutoStringExpressionKeyConfigDict[itrCoreTransactionsAutoStringDisplayConfigKey]);
                        }
                        else {
                            var _oCoreTransactionVariableComponent = new CoreTransactionVariableComponent();
                            var InputString = _oCoreTransactionVariableComponent.Get(itrCoreTransactionsAutoStringDisplayConfigKey);

                            if (Config.CoreTransactionsAutoStringExpressionKeyConfigDict[itrCoreTransactionsAutoStringDisplayConfigKey].Type == "DefaultCoreTransactionsAutoStringExpressionKeyConfig") {

                                var _oDefaultCoreTransactionsAutoStringExpressionKeyConfigComponent = new DefaultCoreTransactionsAutoStringExpressionKeyConfigComponent();
                                Result = _oDefaultCoreTransactionsAutoStringExpressionKeyConfigComponent.Evaluate(InputString, Config.CoreTransactionsAutoStringExpressionKeyConfigDict[itrCoreTransactionsAutoStringDisplayConfigKey]);
                            }
                            else if (Config.CoreTransactionsAutoStringExpressionKeyConfigDict[itrCoreTransactionsAutoStringDisplayConfigKey].Type == "MasterFieldCoreTransactionsAutoStringExpressionKeyConfig") {

                                //alert("Not implemented exception, Type = " + Config.CoreTransactionsAutoStringExpressionKeyConfigDict[itrCoreTransactionsAutoStringDisplayConfigKey].Type + ", DefaultCoreTransactionsAutoStringExpressionComponent.Evaluate");
                                var _oMasterFieldCoreTransactionsAutoStringExpressionKeyConfigComponent = new MasterFieldCoreTransactionsAutoStringExpressionKeyConfigComponent();
                                Result = _oMasterFieldCoreTransactionsAutoStringExpressionKeyConfigComponent.Evaluate(itrCoreTransactionsAutoStringDisplayConfigKey, Config.CoreTransactionsAutoStringExpressionKeyConfigDict[itrCoreTransactionsAutoStringDisplayConfigKey]);
                            }
                            else {
                                alert("Not implemented exception, Type = " + Config.Type + ", DefaultCoreTransactionsAutoStringExpressionComponent.Evaluate");
                            }
                        }

                        Expression = Expression.replace('$vn$' + itrCoreTransactionsAutoStringDisplayConfigKey + '$vn$', Result);
                    }
                }
                else {
                    alert("Not implemented exception, IsOnline = " + Config.IsOnline + ", DefaultCoreTransactionsAutoStringExpressionComponent.Evaluate");
                }
            }

            return Expression;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "DefaultCoreTransactionsAutoStringExpressionComponent.Evaluate", Excep);
        }
        finally {
            Expression = null;
            Result = null;
        }
    }
}

// StaticStringExpressionKeyConfigComponent
function StaticStringExpressionKeyConfigComponent(xlatService) {

    this.Evaluate = function (InputString, Config) {

        try {
            var Result = "";

            if (Config.IsGloablizationEnabled == false) {
                Result = InputString;
            }
            else {
                Result = xlatService.xlat(InputString);
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "StaticStringExpressionKeyConfigComponent.Evaluate", Excep);
        }
        finally {
            Result = null;
        }
    }
}

// DefaultCoreTransactionsAutoStringExpressionKeyConfigComponent
function DefaultCoreTransactionsAutoStringExpressionKeyConfigComponent() {

    var MyInstance = this;

    this.Evaluate = function (InputString, Config) {

        try {
            var Result = "";

            if (Config.StringOperationConfig != null && Config.StringCaseFormat != null) {
                Result = MyInstance.GetStringOperationFormat(InputString, Config);
                Result = MyInstance.GetStringCaseFormat(Result, Config);
            }
            else if (Config.StringOperationConfig != null && Config.StringCaseFormat == null) {
                Result = MyInstance.GetStringOperationFormat(InputString, Config);
            }
            else if (Config.StringOperationConfig == null && Config.StringCaseFormat != null) {
                Result = MyInstance.GetStringCaseFormat(InputString, Config);
            }
            else {
                Result = InputString;
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "DefaultCoreTransactionsAutoStringExpressionKeyConfigComponent.Evaluate", Excep);
        }
        finally {
            Result = null;
        }
    }

    this.GetStringOperationFormat = function (InputString, Config) {

        try {
            var Result = "";

            if (Config.StringOperationConfig.Type == "StringFirstLetterOfEachWord") {

                var _oStringFirstLetterOfEachWordComponent = new StringFirstLetterOfEachWordComponent();
                Result = _oStringFirstLetterOfEachWordComponent.Evaluate(InputString, Config);
            }
            else {
                alert("Not implemented exception, Type = " + Config.Type + ", DefaultCoreTransactionsAutoStringExpressionComponent.GetStringOperationFormat");
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "DefaultCoreTransactionsAutoStringExpressionKeyConfigComponent.GetStringOperationFormat", Excep);
        }
        finally {
            Result = null;
        }
    }

    this.GetStringCaseFormat = function (InputString, Config) {

        try {
            var Result = "";

            if (Config.StringCaseFormat == "DefaultString") {
                Result = InputString;
            }
            else if (Config.StringCaseFormat == "UpperCase") {
                Result = InputString.toUpperCase();
            }
            else if (Config.StringCaseFormat == "LowerCase") {
                Result = InputString.toLowerCase();
            }
            else {
                alert("Not implemented exception, StringCaseFormat = " + Config.StringCaseFormat + ", DefaultCoreTransactionsAutoStringExpressionComponent.GetStringCaseFormat");
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "DefaultCoreTransactionsAutoStringExpressionKeyConfigComponent.GetStringCaseFormat", Excep);
        }
        finally {
            Result = null;
        }
    }
}

// StringFirstLetterOfEachWordComponent
function StringFirstLetterOfEachWordComponent() {

    this.Evaluate = function (InputString, Config) {

        try {
            var Result = "";

            if (Config.StringOperationConfig.Type == "StringFirstLetterOfEachWord") {

                WordSeparator = Config.StringOperationConfig.WordSeparator;
                WordSeparator = (WordSeparator != null && WordSeparator != undefined) ? WordSeparator : " ";

                if (InputString.indexOf(WordSeparator) == -1) {
                    Result = InputString.charAt(0);
                }
                else {
                    InputString = InputString.split(" ");
                    for (var i = 0; i < InputString.length; i++) {
                        Result += InputString[i].charAt(0);
                    }
                }
            }
            else {
                alert("Not implemented exception, Type = " + Config.Type + ", StringFirstLetterOfEachWordComponent.Evaluate");
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "StringFirstLetterOfEachWordComponent.Evaluate", Excep);
        }
        finally {
            Result = null;
        }
    }
}

// MasterFieldCoreTransactionsAutoStringExpressionKeyConfigComponent (For Rco Master)
function MasterFieldCoreTransactionsAutoStringExpressionKeyConfigComponent() {

    var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
    var _oCoreTransactionVariableComponent = new CoreTransactionVariableComponent();

    this.Evaluate = function (Key, Config) {

        try {
            var Expression = "";

            if (Config.DisplayCloumnConfigDict != null) {

                var Answer = _oCoreTransactionVariableComponent.Get(Key);

                var Master = new Array();
                if (Answer != "") {
                    Master = new DefaultMasterDAO("").GetByServerId(Answer);
                }

                Expression = Config.Expression;

                var _oMaster = null;
                if (Master.length > 0) {
                    _oMaster = Master[0];
                }

                for (var itrDisplayCloumnConfigDictKey in Config.DisplayCloumnConfigDict) {

                    Result = (_oMaster != null && _oMaster[itrDisplayCloumnConfigDictKey] != undefined) ? _oMaster[itrDisplayCloumnConfigDictKey] : "";

                    if (Config.DisplayCloumnConfigDict[itrDisplayCloumnConfigDictKey].Type == "DefaultStringCloumnDisplayConfig" && Result != "") {

                        var _oDefaultStringCloumnDisplayConfigComponent = new DefaultStringCloumnDisplayConfigComponent();
                        Result = _oDefaultStringCloumnDisplayConfigComponent.Evaluate(Result, Config.DisplayCloumnConfigDict[itrDisplayCloumnConfigDictKey]);
                    }
                    else if (Config.DisplayCloumnConfigDict[itrDisplayCloumnConfigDictKey].Type == "DefaultDateTimeColumnDisplayConfig" && Result != "") {
                        var _oDefaultDateTimeColumnDisplayConfigComponent = new DefaultDateTimeColumnDisplayConfigComponent();
                        Result = _oDefaultDateTimeColumnDisplayConfigComponent.Evaluate(Result, Config.DisplayCloumnConfigDict[itrDisplayCloumnConfigDictKey]);
                    }

                    Expression = Expression.replace('$vn$' + itrDisplayCloumnConfigDictKey + '$vn$', Result);
                }
            }
            else {
                alert("Not implemented exception, Type = " + Config.Type + ", MasterFieldCoreTransactionsAutoStringExpressionKeyConfigComponent.Evaluate");
            }

            return Expression;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "MasterFieldCoreTransactionsAutoStringExpressionKeyConfigComponent.Evaluate", Excep);
        }
        finally {
            Expression = null;
            _oLVDefaultAnswerModeComponent = null;
        }
    }
}

// DefaultStringCloumnDisplayConfigComponent
function DefaultStringCloumnDisplayConfigComponent() {

    var _oDefaultCoreTransactionsAutoStringExpressionKeyConfigComponent = new DefaultCoreTransactionsAutoStringExpressionKeyConfigComponent();

    this.Evaluate = function (InputString, Config) {

        try {
            var Result = "";

            if (Config.StringOperationConfig != null && Config.StringCaseFormat != null) {
                Result = _oDefaultCoreTransactionsAutoStringExpressionKeyConfigComponent.GetStringOperationFormat(InputString, Config);
                Result = _oDefaultCoreTransactionsAutoStringExpressionKeyConfigComponent.GetStringCaseFormat(Result, Config);
            }
            else if (Config.StringOperationConfig != null && Config.StringCaseFormat == null) {
                Result = _oDefaultCoreTransactionsAutoStringExpressionKeyConfigComponent.GetStringOperationFormat(InputString, Config);
            }
            else if (Config.StringOperationConfig == null && Config.StringCaseFormat != null) {
                Result = _oDefaultCoreTransactionsAutoStringExpressionKeyConfigComponent.GetStringCaseFormat(InputString, Config);
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

    this.Evaluate = function (InputString, Config) {

        try {
            var Result = "";

            var Day = 0;
            var Month = 0;
            var Year = 0;
            var Hours = 0;
            var Minutes = 0;
            var Seconds = 0;

            if (InputString != "" && InputString.indexOf(" ") != -1) {

                var oDateAndTime = InputString.split(" ");

                if (oDateAndTime[0].indexOf("-") != -1) {

                    var oDate = oDateAndTime[0].split("-");
                    Day = oDate[0];
                    Month = oDate[0];
                    Year = oDate[0];
                }
                if (oDateAndTime[1].indexOf(":") != -1) {

                    var oTime = oDateAndTime[1].split(":");
                    Hours = oTime[0];
                    Minutes = oTime[0];
                    Seconds = oTime[0];
                }
            }

            if (Config.DateTimeDisplayMode == "Day") {
                Result = Day;
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "DefaultDateTimeColumnDisplayConfigComponent.Evaluate", Excep);
        }
        finally {
            Result = null;
        }
    }
}

// CoreTransactionVariableComponent
function CoreTransactionVariableComponent() {

    var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();

    this.Get = function (TransactionVariable) {

        try {
            var Result = "";

            if (TransactionVariable == "DeviceId") {
                Result = OneViewLocalStorage.Get("DeviceId");
            }
            else if (TransactionVariable == "DeviceSerialNo") {           
                Result = parseInt(OneViewLocalStorage.Get("DeviceSerialNo"));
                OneViewLocalStorage.Save("DeviceSerialNo", Result + 1);
            }
            else if (TransactionVariable == "Service") {
                Result = OneViewSessionStorage.Get("ServiceName");
                Result = (Result != null) ? Result : "";
            }
            else if (TransactionVariable == "Organization") {
                Result = OneViewSessionStorage.Get("LoginUserOrgName");
                Result = (Result != null) ? Result : "";
            }
            else if (TransactionVariable == "DCPlace") {
                Result = OneViewSessionStorage.Get("DcPlaceName");
                Result = (Result != null) ? Result : "";
            }
            else if (TransactionVariable == "DCTemplate") {
                Result = OneViewSessionStorage.Get("TemplateName");
                Result = (Result != null) ? Result : "";
            }
            else if (TransactionVariable.length > 2 && TransactionVariable.charAt(0) + TransactionVariable.charAt(1) == "AM") {
                var AttributeId = 0;
                var ControlId = "";
                if (TransactionVariable.indexOf('$$sp$$') != -1) {
                    var Keys = TransactionVariable.split('$$sp$$');
                    AttributeId = Keys[0].replace("AM", "");
                    ControlId = Keys[1];
                }
                if (AttributeId != 0 && ControlId != "") {
                    //Result = "Panner 65";
                    Result = _oLVDefaultAnswerModeComponent.GetAnswer(AttributeId, ControlId);
                }
            }
            else {
                Result = TransactionVariable;
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "CoreTransactionVariableComponent.Get", Excep);
        }
        finally {
            Result = null;
        }
    }
}

// Test Configuration
var AutoAnswerConfig_Test = {

    Type: "DefaultCoreTransactionsAutoStringExpression",
    IsOnline: false,
    SerialNoResetType: "AllowDuplicate",
    //Expression: "$vn$Service$vn$_$vn$Organization$vn$_$vn$DCPlace$vn$_$vn$A$vn$_$vn$CBM$vn$_$vn$AM1$$sp$$TxtControlId1$vn$_$vn$AM2$$sp$$TxtControlId2$vn$_$vn$DeviceId$vn$_$vn$DeviceSerialNo$vn$",
    Expression: "$vn$Service$vn$_$vn$DCPlace$vn$_$vn$A$vn$_$vn$CBM$vn$_$vn$DeviceId$vn$_$vn$DeviceSerialNo$vn$",
    CoreTransactionsAutoStringExpressionKeyConfigDict: {
        "Service": {
            Type: "DefaultCoreTransactionsAutoStringExpressionKeyConfig",
            StringOperationConfig: {
                Type: "StringFirstLetterOfEachWord",
                WordSeparator: " "
            },
            StringCaseFormat: "UpperCase"
        },
        //"Organization": {
        //    Type: "DefaultCoreTransactionsAutoStringExpressionKeyConfig",
        //    StringOperationConfig: null,
        //    StringCaseFormat: "LowerCase"
        //},
        "DCPlace": {
            Type: "DefaultCoreTransactionsAutoStringExpressionKeyConfig",
            StringOperationConfig: null,
            StringCaseFormat: "LowerCase"
        },
        "A": {
            Type: "StaticStringExpressionKeyConfig",
            IsGloablizationEnabled: false
        },
        "CBM": {
            Type: "StaticStringExpressionKeyConfig",
            IsGloablizationEnabled: true
        },
        //"AM1$$sp$$TxtControlId1": {
        //    Type: "MasterFieldCoreTransactionsAutoStringExpressionKeyConfig",
        //    Expression: "$vn$Column1$vn$_$vn$DateColumn1$vn$",
        //    DisplayCloumnConfigDict: {
        //        "Column1": {
        //            Type: "DefaultStringCloumnDisplayConfig",
        //            CloumnName: "Column1",
        //            StringOperationConfig: {
        //                Type: "StringFirstLetterOfEachWord",
        //                WordSeparator: " "
        //            },
        //            StringCaseFormat: "LowerCase"
        //        },
        //        "DateColumn1": {
        //            Type: "DefaultDateTimeColumnDisplayConfig",
        //            CloumnName: "DateColumn1",
        //            DateTimeDisplayMode: "Day"
        //        }
        //    }
        //},
        //"AM2$$sp$$TxtControlId2": {
        //    Type: "DefaultCoreTransactionsAutoStringExpressionKeyConfig",
        //    StringOperationConfig: {
        //        Type: "StringFirstLetterOfEachWord",
        //        WordSeparator: " "
        //    },
        //    StringCaseFormat: "UpperCase"
        //},
        "DeviceId": {
            Type: "DefaultCoreTransactionsAutoStringExpressionKeyConfig",
            StringOperationConfig: null,
            StringCaseFormat: null
        },
        "DeviceSerialNo": {
            Type: "DefaultCoreTransactionsAutoStringExpressionKeyConfig",
            StringOperationConfig: null,
            StringCaseFormat: null
        }
    }
}
