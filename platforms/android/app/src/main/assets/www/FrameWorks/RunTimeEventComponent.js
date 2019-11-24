

//Ruin time Event Register

function RunTimeEventHandler() {

    this.handleEventJob = function (EventArgs) {
        try {
            OneViewConsole.Debug("handleEventJob Start", "RunTimeEventComponent.handleEventJob");

            var oScope = EventArgs.oScope;
            var oDefaultValidationResponse = new DefaultValidationResponse();
            var ControlEvents=EventArgs.ControlEvents;
            for (var Key in ControlEvents) {
                var _oJobMetaData = ControlEvents[Key];
             //   alert("EventArgs.EventType=>" + EventArgs.EventType);
                if (_oJobMetaData.JobType == 'DCAttributeValidationJob') {                  
                    var _oAttributeDCValidationJobHandler = new AttributeDCValidationJobHandler();
                    var EventArgs = { JobMetaData: _oJobMetaData, EventType: EventArgs.EventType, AnswerMode: EventArgs.AnswerMode, oScope: EventArgs.oScope, $event: EventArgs.$event };

                    oDefaultValidationResponse = _oAttributeDCValidationJobHandler.Validate(EventArgs);
                    if (oDefaultValidationResponse.IsSuccess == false) {
                        break;
                    }
                }
                else if (_oJobMetaData.JobType == 'DefaultUIJob') {

                }
                else {
                    alert('not implemented exception (RunTimeEventComponent.handleEventJob.: JobType : ' + _oJobType);
                }
               
            }

            OneViewConsole.Debug("handleEventJob End", "RunTimeEventComponent.handleEventJob");
            return oDefaultValidationResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "RunTimeEventComponent.handleEventJob", Excep);
        }
    }
}

function AttributeDCValidationJobHandler() {
    this.Validate = function (EventArgs) {
        try {
            OneViewConsole.Debug("Validate Start", "AttributeValidationJobHandler.Validate");

            var ValidationJobRule = EventArgs.JobMetaData;
            var oScope = EventArgs.oScope;
            var oDefaultValidationResponse = new DefaultValidationResponse();

            if (ValidationJobRule.Dimension == "DefaultDCAttributeValidationRule") {
                alert('not implemented exception (AttributeValidationJobHandler.Validate, ValidationJobRule.Dimension : ' + ValidationJobRule.Dimension);
            }
            else if (ValidationJobRule.Dimension == "AdvanceDCAttributeValidationRule") {              
                var _oAdvanceDCAttributeValidationJobHandler = new AdvanceDCAttributeValidationJobHandler();
                oDefaultValidationResponse= _oAdvanceDCAttributeValidationJobHandler.Validate(EventArgs);
            }
            else if (ValidationJobRule.Dimension == "CustomeDCAttributeValidationRule") {
                alert('not implemented exception (AttributeValidationJobHandler.Validate, ValidationJobRule.Dimension : ' + ValidationJobRule.Dimension);
            }
            else {
                alert('not implemented exception (AttributeValidationJobHandler.Validate, ValidationJobRule.Dimension : ' + ValidationJobRule.Dimension);
            }

            OneViewConsole.Debug("Validate End", "AttributeValidationJobHandler.Validate");
            if (oDefaultValidationResponse.IsSuccess == false) {
                new ShowMessage().Error(oDefaultValidationResponse.MessageKey);
            }

            return oDefaultValidationResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "AttributeValidationJobHandler.Validate", Excep);
        }

    }
}

//Todo:Multiple operation from same eventissue need to fix,Event propagation need to fix
function AdvanceDCAttributeValidationJobHandler() {

    this.Validate = function (EventArgs) {
        try {
            OneViewConsole.Debug("Validate Start", "AdvanceAttributeValidation.Validate");

            var ValidationJobRule = EventArgs.JobMetaData;
            var oScope = EventArgs.oScope;
            var EventType = EventArgs.EventType;

            var oDefaultValidationResponse = new DefaultValidationResponse();       
            //alert(JSON.stringify(EventArgs.AnswerMode));
            OneViewConsole.Debug("Going to evaluvate equation : " + ValidationJobRule.FinalJavaScriptEquation, "AdvanceAttributeValidation.Validate");
            var isValidationSuccess = true;
            //To Do::This is a temperory solution  
            //if (TIME)
            //alert(JSON.stringify(EventArgs.AnswerMode));
            if (EventArgs.AnswerMode.Type == "TIME") {
                isValidationSuccess = eval(ValidationJobRule.FinalJavaScriptEquation);
            }
            else {
                if (oScope.NewDCModel[EventArgs.AnswerMode.ControlId] !=undefined && oScope.NewDCModel[EventArgs.AnswerMode.ControlId] != "-") {
                isValidationSuccess = eval(ValidationJobRule.FinalJavaScriptEquation);
                 }
            }
       
           
            OneViewConsole.Debug("Equation : " + ValidationJobRule.FinalJavaScriptEquation + " ,evaluvated successfully ,Result:' " + isValidationSuccess + " ' ", "AdvanceAttributeValidation.Validate");

           

            if (isValidationSuccess == false) {
              
                if (ValidationJobRule.UIValidationType == 'Blocker') {                   
                    oDefaultValidationResponse.MessageKey = ValidationJobRule.ErrorMessageKey;
                 
                    if (EventType == "PreControlEvent") {
                    
                        DisableControl(EventArgs.AnswerMode, oScope)
                    }
                    else if (EventType == "PostControlEvent") {                      
                        ClearControlValue(EventArgs.AnswerMode, oScope);
                    }
                }
                else if (ValidationJobRule.UIValidationType == 'Warning') {                   
                    oDefaultValidationResponse.MessageKey = ValidationJobRule.ErrorMessageKey;
                }
                
                //Workaround solution for dropdown Prevalidation
                if (EventArgs.$event != null && EventArgs.$event != "")
                   StopEventPropagation(EventArgs.$event);
                
            }
            else {
                EnableControl(EventArgs.AnswerMode, oScope);
                isValidationSuccess = true;
            }

            
            oDefaultValidationResponse.IsSuccess = isValidationSuccess;

            OneViewConsole.Debug("Validate End", "AdvanceAttributeValidation.Validate");
           
            return oDefaultValidationResponse;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "AdvanceAttributeValidation.Validate", Excep);
        }
        finally {

        }
    }

    var ClearControlValue = function (AnswerMode, oScope) {
        try {

            ClearControl(AnswerMode, oScope);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "AdvanceAttributeValidation.ClearControlValue", Excep);

        }
    }

    var DisableControl = function (AnswerMode, oScope) {
        try {
            if (document.getElementById(AnswerMode.ControlId) != null){
                document.getElementById(AnswerMode.ControlId).disabled = true; 
            }
      }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "AdvanceAttributeValidation.DisableControl", Excep);
        }

      
    }

    var StopEventPropagation = function ($event)
    {
        $event.stopPropagation();
    }
    var EnableControl = function (AnswerMode, oScope) {
        try {

          // if (IsGlobalAutoTemperatureManualAllowed == true)
               // {
            //  alert(IsGlobalAutoTemperatureManualAllowed);
            if (document.getElementById(AnswerMode.ControlId) != null){
                document.getElementById(AnswerMode.ControlId).disabled = false;
            }
           // }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "AdvanceAttributeValidation.EnableControl", Excep);
        }       
    }
    var ClearControl = function (_oPrimarayAnswerModeInfo, oScope) {
        try {
            if (_oPrimarayAnswerModeInfo.Type == 'CHECKBOX') {
                oScope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = false;
            }
            else if (_oPrimarayAnswerModeInfo.Type == 'DDL') {

                var _oddl = oScope[_oPrimarayAnswerModeInfo.ControlId];
                _oddl.Clear();
            }
            else if (_oPrimarayAnswerModeInfo.Type == 'Band') {
                var _oddl = oScope[_oPrimarayAnswerModeInfo.ControlId];
                _oddl.Clear();
            }
            else if (_oPrimarayAnswerModeInfo.Type == 'TIME') {
                var temp = document.getElementById(_oPrimarayAnswerModeInfo.ControlId);
                if (temp != null)
                    temp.value = '';
                if (oScope[_oPrimarayAnswerModeInfo.ControlId + "_DateTime"] != undefined || oScope[_oPrimarayAnswerModeInfo.ControlId + "_DateTime"] != "") {
                    oScope[_oPrimarayAnswerModeInfo.ControlId + "_DateTime"] = "";
                }

                //Value not clearing : Date - 29-09-2015 - ng-change event not firing because of this, coz UI data is clearing but from Model its not clearing
                //Added by Sangeeta Bhatt *************START
                if (oScope.NewDCModel != undefined && oScope.NewDCModel != null && oScope.NewDCModel != "") {
                    oScope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = "";
                }
                //*************END
            }
            else if (_oPrimarayAnswerModeInfo.Type == 'AUTOTEMPERATURE') {
                if (oScope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] != undefined) {
                    oScope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = "";
                }
            }
            else {

                oScope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = '';
            }
            if (oScope[_oPrimarayAnswerModeInfo.ControlId + "_IsManual"] != undefined) {
                oScope[_oPrimarayAnswerModeInfo.ControlId + "_IsManual"] = undefined;
            }           
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("FramwWork", "AdvanceDCAttributeValidationJobHandler.ClearControls", Excep);
        }
        finally {
            _oPrimarayAnswerModeInfo = null;
            _oddl = null;
        }
    }
   
}





/////////////////////////////*************************** New Code Start *******************************//////////////////////////////////////////


function UIEventJobHandler() {

    var MyInstance = this;
    this.EvaluatePreControlUIJobs = function (EventArgs) {//ControlEventUIJobs, AttributeId, ControlId, oScope, TemplateNodes, oEvent, AnswerModeObject, AnswerToBind
        try {
            OneViewConsole.Debug("EvaluatePreControlUIJobs Start", "UIEventJobHandler.EvaluatePreControlUIJobs");

            var oDefaultValidationResponse = new DefaultValidationResponse();
            oDefaultValidationResponse.IsSuccess = true;
            
            var UIJobsEventArgs = MyInstance.GetUIJobsEventArgs(EventArgs, 'PreControlUIJobs');
            if (UIJobsEventArgs != null) {                
                oDefaultValidationResponse = MyInstance.EvaluateUIJobs(UIJobsEventArgs);//ControlWiseControlEventUIJobs.PreControlUIJobs, oScope, TemplateNodes, $event, AnswerModeObject, AnswerToBind
            }
            OneViewConsole.Debug("EvaluatePreControlUIJobs End", "UIEventJobHandler.EvaluatePreControlUIJobs");

            return oDefaultValidationResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.EvaluatePreControlUIJobs", Excep);
        }
    }

    this.EvaluatePostControlUIJobs = function (EventArgs) {//ControlEventUIJobs, AttributeId, ControlId, oScope, TemplateNodes, $event, AnswerModeObject, AnswerToBind
        try {
            OneViewConsole.Debug("EvaluatePostControlUIJobs Start", "UIEventJobHandler.EvaluatePostControlUIJobs");

            var oDefaultValidationResponse = new DefaultValidationResponse();
            oDefaultValidationResponse.IsSuccess = true;
            
            var UIJobsEventArgs = MyInstance.GetUIJobsEventArgs(EventArgs, 'PostControlUIJobs');
            if (UIJobsEventArgs != null) {                
                oDefaultValidationResponse = MyInstance.EvaluateUIJobs(UIJobsEventArgs);//ControlWiseControlEventUIJobs.PostControlUIJobs, oScope, TemplateNodes, $event, AttributeId, ControlId, AnswerModeObject, AnswerToBind
            }

            OneViewConsole.Debug("EvaluatePostControlUIJobs End", "UIEventJobHandler.EvaluatePostControlUIJobs");

            return oDefaultValidationResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.EvaluatePostControlUIJobs", Excep);
        }
    }

 

    this.EvaluateUIJobs = function (UIJobsEventArgs) {//ControlUIJobs, oScope, TemplateNodes, $event, AttributeId, ControlId, AnswerModeObject, AnswerToBind
        try {
            OneViewConsole.Debug("EvaluateUIJobs Start", "UIEventJobHandler.EvaluateUIJobs");
            var oDefaultValidationResponse = new DefaultValidationResponse();
            oDefaultValidationResponse.IsSuccess = true;

            var ControlUIJobs = UIJobsEventArgs.ControlUIJobs;
            var AttributeId = UIJobsEventArgs.AttributeId;
            var ControlId = UIJobsEventArgs.ControlId;
            var oScope = UIJobsEventArgs.oScope;
            var TemplateNodes = UIJobsEventArgs.TemplateNodes;
            var oEvent = UIJobsEventArgs.oEvent;
            var AnswerModeObject = UIJobsEventArgs.AnswerModeObject;
            var AnswerToBind = UIJobsEventArgs.AnswerToBind;

            var SuccessResponseList = [];
            for (var i = 0; i < ControlUIJobs.length; i++) {
               
                var Job = ControlUIJobs[i];              
                if (Job.Type == "DefaultControlUIOperationsRule") {
                    Job.FinalJavaScriptEquation = Job.FinalJavaScriptEquation.replace(/#/g, "'");

                    
                    var IsRuleCorrect = eval(Job.FinalJavaScriptEquation);
                    //alert('IsRuleCorrect : ' + IsRuleCorrect + ' , Job.FinalJavaScriptEquation : ' + Job.FinalJavaScriptEquation );
                    SuccessResponseList.push(IsRuleCorrect);
                    if (IsRuleCorrect == false) {
                        oDefaultValidationResponse.IsSuccess = false;
                        //alert('Job.RefreshControls : ' + Job.RefreshControls);
                        if (Job.MessageKey != "" && Job.MessageKey != null && Job.MessageKey != undefined) {
                            //alert(Job.MessageKey);
                            oDefaultValidationResponse.MessageKey = Job.MessageKey;
                            new ShowMessage().Error(oDefaultValidationResponse.MessageKey);
                        }

                       

                        if (Job.EnableControls != null) {
                            // "1" implies Enable
                            MyInstance.IterateControls(Job.EnableControls, oScope, TemplateNodes, "1");
                        }

                        if (Job.DisableControls != null) {
                            if (Job.UIValidationType == 0) {
                                // "2" implies Disable
                                MyInstance.IterateControls(Job.DisableControls, oScope, TemplateNodes, "2");
                                if (oEvent != null && oEvent != "") {
                                    StopEventPropagation(oEvent);
                                }
                            }
                        }

                        if (Job.HideControls != null) {
                            // "3" implies Hide
                        }

                        if (Job.ShowControls != null) {
                            // "4" implies Show
                        }

                        if (Job.RefreshControls != null) {
                            // "5" implies Refresh
                            MyInstance.IterateControls(Job.RefreshControls, oScope, TemplateNodes, "5");
                        }

                        if (Job.ClearControls != null) {
                            // "6" implies Clear
                            MyInstance.IterateControls(Job.ClearControls,oScope, TemplateNodes, "6");
                        }

                        if (Job.NAControls != null) {
                            // "7" implies NA
                        }
                      
                    }

                    else {
                        oDefaultValidationResponse.IsSuccess = true;
                        ////Enable controls
                        //MyInstance.IterateControls(Job.DisableControls, oScope, TemplateNodes, "1");
                    }

                }

                else if (Job.Type == "CustomControlUIOperationsRule") {
                    var obj = new window[Job.OfflineAttributeValidationConfigObjectKey];                    
                    if (obj != null) {                       
                        var AttributeData = TemplateNodes[AttributeId];
                        var ControlData = MyInstance.GetControlData(TemplateNodes, AttributeId, ControlId, oScope);    
                       
                        if (ControlData.AnswerModeInfo.Type == 'Band') {                        
                            obj.Execute(ControlData.Value, AnswerModeObject, AnswerToBind);
                        }

                        else if (ControlData.AnswerModeInfo.Type == 'DCListViewControlConfig') {
                            alert('Answer Mode type = ' + ControlData.AnswerModeInfo.Type + " Not Implemented Exception.");
                        }

                        else {
                            obj.Execute(ControlData.Value, AnswerModeObject, AnswerToBind);
                        }
                                            
                        
                    }
                }

                else {
                    alert('UIEventJobHandler.EvaluateUIJobs Job.Type = ' + Job.Type + 'Not Implemented Exception.');
                }
            }



            OneViewConsole.Debug("EvaluateUIJobs End", "UIEventJobHandler.EvaluateUIJobs");
           
            return oDefaultValidationResponse;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.EvaluateUIJobs", Excep);
        }

    }

    this.GetControlData = function (TemplateNodes, AttributeId, ControlId, oScope) {
        try {
            OneViewConsole.Debug("GetControlData Start", "UIEventJobHandler.GetControlData");

            var Response = { 'AnswerModeInfo': '', 'Value': '' };
            var AttributeData = TemplateNodes[AttributeId];
            for (var k = 0; k < AttributeData.AnswerMode.length ; k++) {
                var _oPrimarayAnswerModeInfo = AttributeData.AnswerMode[k];              
                if (_oPrimarayAnswerModeInfo.Type == 'Band') {
                    if (_oPrimarayAnswerModeInfo.ControlId == ControlId) {
                        var Id = oScope[_oPrimarayAnswerModeInfo.ControlId].GetSelectedValue();                    
                        if (Id != undefined && Id != null && Id != "") {
                            option = {
                                "Id": oScope[_oPrimarayAnswerModeInfo.ControlId].GetSelectedValue(),
                                "ControlId": ControlId,
                                "AttributeNodeId": AttributeId,
                                'Name': (_oPrimarayAnswerModeInfo.BandInfo != undefined ? _oPrimarayAnswerModeInfo.BandInfo[Id].Name : ''),
                                'Sequence': (_oPrimarayAnswerModeInfo.BandInfo != undefined ? _oPrimarayAnswerModeInfo.BandInfo[Id].Sequence : ''),
                                'ColourIndex': (_oPrimarayAnswerModeInfo.BandInfo != undefined ? _oPrimarayAnswerModeInfo.BandInfo[Id].ColourIndex : ''),
                                'Selected': true
                            }
                        }

                        else {
                            option = {
                                "Id": "",
                                "ControlId": ControlId,
                                "AttributeNodeId": AttributeId,
                                'Name': "",
                                'Sequence': "",
                                'ColourIndex': "",
                                'Selected': false
                            }
                        }

                    }

                    Response.AnswerModeInfo = _oPrimarayAnswerModeInfo;
                    Response.Value = option;
                }

                else if (_oPrimarayAnswerModeInfo.Type == 'DCListViewControlConfig') {
                    Response.AnswerModeInfo = _oPrimarayAnswerModeInfo;
                    Response.Value = '';
                }

                else {
                    Response.AnswerModeInfo = _oPrimarayAnswerModeInfo;

                    var AttributeDetails = { 'AttributeId': AttributeId, 'ControlId': _oPrimarayAnswerModeInfo.ControlId };
                    Response.Value = AttributeDetails;
                }

            }

            OneViewConsole.Debug("GetControlData End", "UIEventJobHandler.GetControlData");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.GetControlData", Excep);
        }
    }

    this.EnableControlsOnAllSuccess = function () {

    }

    this.IterateControls = function (AttributeDict, oScope, TemplateNodes, EventTodo) {
        try {
            OneViewConsole.Debug("Validate Start", "UIEventJobHandler.Validate");

            for (var attrId in AttributeDict) {
                var AttributeData = TemplateNodes[attrId];
                for (var i = 0; i < AttributeData.AnswerMode.length ;i++) {
                    var ControlData = AttributeData.AnswerMode[i];

                    var ControlList = AttributeDict[attrId];
                    for (j = 0; i < j < ControlList.length; j++) {
                        if (ControlData.ControlId == ControlList[j]) {

                            if (EventTodo == "1") {
                                MyInstance.EnableControl(ControlData, oScope);
                            }

                            else if (EventTodo == "2") {
                                MyInstance.DisableControl(ControlData, oScope);   
                            }

                            else if (EventTodo == "5") {
                                MyInstance.RefreshControl(ControlData, oScope);
                            }

                            else if (EventTodo == "6") {
                                MyInstance.ClearControl(ControlData, oScope);
                            }
                             
                             
                        }
                    }
                }
               
            }
            OneViewConsole.Debug("Validate End", "UIEventJobHandler.Validate");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.Validate", Excep);
        }

    }


    this.ClearControl = function (_oPrimarayAnswerModeInfo, oScope) {
        try {
            if (_oPrimarayAnswerModeInfo.Type == 'CHECKBOX') {
                oScope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = false;
            }
            else if (_oPrimarayAnswerModeInfo.Type == 'DDL') {

                var _oddl = oScope[_oPrimarayAnswerModeInfo.ControlId];
                _oddl.Clear();
            }
            else if (_oPrimarayAnswerModeInfo.Type == 'Band') {
                var _oddl = oScope[_oPrimarayAnswerModeInfo.ControlId];
                _oddl.Clear();
            }
            else if (_oPrimarayAnswerModeInfo.Type == 'TIME') {
                var temp = document.getElementById(_oPrimarayAnswerModeInfo.ControlId);
                if (temp != null)
                    temp.value = '';
                if (oScope[_oPrimarayAnswerModeInfo.ControlId + "_DateTime"] != undefined || oScope[_oPrimarayAnswerModeInfo.ControlId + "_DateTime"] != "") {
                    oScope[_oPrimarayAnswerModeInfo.ControlId + "_DateTime"] = "";
                }

                //Value not clearing : Date - 29-09-2015 - ng-change event not firing because of this, coz UI data is clearing but from Model its not clearing
                //Added by Sangeeta Bhatt *************START
                if (oScope.NewDCModel != undefined && oScope.NewDCModel != null && oScope.NewDCModel != "") {
                    oScope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = "";
                }
                //*************END
            }
            else if (_oPrimarayAnswerModeInfo.Type == 'AUTOTEMPERATURE') {
                if (oScope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] != undefined) {
                    oScope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = "";
                }
            }
            else {

                oScope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = '';
            }
            if (oScope[_oPrimarayAnswerModeInfo.ControlId + "_IsManual"] != undefined) {
                oScope[_oPrimarayAnswerModeInfo.ControlId + "_IsManual"] = undefined;
            }
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("FramwWork", "UIEventJobHandler.ClearControls", Excep);
        }
        finally {
            _oPrimarayAnswerModeInfo = null;
            _oddl = null;
        }
    }


    this.DisableControl = function (AnswerMode, oScope) {
        try {
            //alert('DisableControl ');
            if (document.getElementById(AnswerMode.ControlId) != null) {
                document.getElementById(AnswerMode.ControlId).disabled = true;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.DisableControl", Excep);
        }


    }

    this.EnableControl = function (AnswerMode, oScope) {
        try {

            if (document.getElementById(AnswerMode.ControlId) != null) {
                document.getElementById(AnswerMode.ControlId).disabled = false;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.EnableControl", Excep);
        }
    }

    this.RefreshControl = function (AnswerMode, oScope) {
        try {
            if (AnswerMode.DataSourceConfig != null) {
                if (AnswerMode.DataSourceConfig.Type == "DefaultDataSourceConfig") {                 
                    AnswerMode.DataSourceConfig.FinalJavaScriptEquation = AnswerMode.DataSourceConfig.FinalJavaScriptEquation.replace(/#/g, "'");                    
                    var value = eval(AnswerMode.DataSourceConfig.FinalJavaScriptEquation);                   
                    MyInstance.SetValue(AnswerMode, oScope, value);
                }
                else {
                    alert("Not implemented exception AnswerMode.DataSourceConfig.Type = " + AnswerMode.DataSourceConfig.Type);
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.RefreshControl", Excep);
        }
    }

    this.HideControl = function (AnswerMode, oScope) {
        try {

            if (document.getElementById(AnswerMode.ControlId) != null) {
                document.getElementById(AnswerMode.ControlId).disabled = false;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.HideControl", Excep);
        }
    }

    this.ShowControl = function (AnswerMode, oScope) {
        try {

            if (document.getElementById(AnswerMode.ControlId) != null) {
                document.getElementById(AnswerMode.ControlId).disabled = false;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.ShowControl", Excep);
        }
    }

    this.SetValue = function (AnswerMode, oScope, value) {
        try {
            OneViewConsole.Debug("SetValue start", "UIEventJobHandler.SetValue");
          
            if (AnswerMode.DataType == 'FLOAT') {
                oScope.NewDCModel[AnswerMode.ControlId] = parseFloat(value);
            }
            else if (AnswerMode.DataType == 'INTEGER') {
                oScope.NewDCModel[AnswerMode.ControlId] = parseInt(value);
            }
            else {
                oScope.NewDCModel[AnswerMode.ControlId] = value;
            }

            OneViewConsole.Debug("SetValue end", "UIEventJobHandler.SetValue");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "UIEventJobHandler.SetValue", Excep);
        }
        finally {
        }
    }


    var StopEventPropagation = function (oEvent) {
        try{
            oEvent.stopPropagation();
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("FramwWork", "UIEventJobHandler.StopEventPropagation", Excep);
        }
        finally {
          
        }
    }

    this.GetUIJobsEventArgs = function (EventArgs, UIJobsType) {
        try {
            var UIJobsEventArgs = null;

            var ControlEventUIJobs = EventArgs.ControlEventUIJobs;
            var AttributeId = EventArgs.AttributeId;
            var ControlId = EventArgs.ControlId;

            var ControlWiseControlEventUIJobs = (ControlEventUIJobs[AttributeId] != undefined ? (ControlEventUIJobs[AttributeId][ControlId] != undefined ? ControlEventUIJobs[AttributeId][ControlId] : null) : null)

            if (ControlWiseControlEventUIJobs != null && ControlWiseControlEventUIJobs[UIJobsType] != null) {
                UIJobsEventArgs = {
                    'ControlUIJobs': ControlWiseControlEventUIJobs[UIJobsType],
                    'AttributeId': EventArgs.AttributeId,
                    'ControlId': EventArgs.ControlId,
                    'oScope': EventArgs.oScope,
                    'TemplateNodes': EventArgs.TemplateNodes,
                    'oEvent': EventArgs.oEvent,
                    'AnswerModeObject': EventArgs.AnswerModeObject,
                    'AnswerToBind': EventArgs.AnswerToBind
                };
            }
            return UIJobsEventArgs;
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("FramwWork", "UIEventJobHandler.GetUIJobsEventArgs", Excep);
        }
        finally {

        }
    }
}



/////////////////////////////*************************** New Code End *******************************//////////////////////////////////////////





