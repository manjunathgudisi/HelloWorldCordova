function DefaultNumericTextBoxControl() {

    var MyInstance = this;
    var AnswerMode;
    this.Refresh = function (_AnswerMode, oScope) {
        try {
            AnswerMode = _AnswerMode;

            if (AnswerMode.DataSourceConfig != undefined && AnswerMode.DataSourceConfig != '') {
                if (AnswerMode.DataSourceConfig.Type == 'DefaultDataSourceConfig') {

                    var val = eval(AnswerMode.DataSourceConfig.FinalJavaScriptEquation);
                    MyInstance.Set(val, AnswerMode, oScope);
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultNumericTextBoxControl.Refresh", Excep);
        }
    }
    this.Set = function (val, AnswerMode, oScope) {
        if (AnswerMode.DataType == 'FLOAT') {
            oScope.NewDCModel[AnswerMode.ControlId] = parseFloat(val);
        }
        else if (AnswerMode.DataType == 'INTEGER') {
            oScope.NewDCModel[AnswerMode.ControlId] = parseInt(val);
        }
        else {
            oScope.NewDCModel[AnswerMode.ControlId] = val;
        }
    }

}

function DefaultTextBoxControl() {

    this.AttributeId;
    this.ControlId;
    this.AnswerMode;
    var MyInstance = this;
    this.scope;
    this.Refresh = function (_AnswerMode, oScope) {
        try {
            AnswerMode = _AnswerMode;
            // alert("DefaultTextBoxControlAnswerMode " + JSON.stringify(AnswerMode))
            if (AnswerMode.DataSourceConfig != undefined && AnswerMode.DataSourceConfig != '') {
                if (AnswerMode.DataSourceConfig.Type == 'DefaultDataSourceConfig') {
                    //alert("AnswerMode.DataSourceConfig.FinalJavaScriptEquation " + AnswerMode.DataSourceConfig.FinalJavaScriptEquation)
                    var val = eval(AnswerMode.DataSourceConfig.FinalJavaScriptEquation);
                    MyInstance.Set(val, AnswerMode, oScope);
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultTextBoxControl.Refresh", Excep);
        }
    }
    this.Set = function (val, AnswerMode, oScope) {
        oScope.NewDCModel[AnswerMode.ControlId] = val;
    }

}