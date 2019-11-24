
// LVTemplateUIEventJobComponent
function LVTemplateUIEventJobComponent() {

    var MyInstance = this;
    var oLVFactory = new LVFactory();

    this.NotificationDisplayType = "DefaultJavaScriptAlert";
    //this.NotificationType = "DefaultNativeToast";
    this.LVDefaultNotificationComponentKey = "LVDefaultNotificationComponent";

    /// <summary>
    /// Excecute Post Control UI Jobs
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNodeId</param>   
    /// <param name="ControlId">ControlId</param>
    this.ExcecutePostControlUIJobs = function (TemplateNodeId, ControlId) {

        try {
            OneViewConsole.Debug("ExcecutePostControlUIJobs Start", "LVTemplateUIEventJobConfigComponent.ExcecutePostControlUIJobs");
            //alert("TemplateNodeId : " + TemplateNodeId + ", ControlId : " + ControlId);

            if (LVTemplateUIEventJobConfigMetaData != null && LVTemplateUIEventJobConfigMetaData != undefined && LVTemplateUIEventJobConfigMetaData.ControlEventUIJobs != undefined) {

                if (LVTemplateUIEventJobConfigMetaData.ControlEventUIJobs[TemplateNodeId] != undefined && ControlId != undefined && LVTemplateUIEventJobConfigMetaData.ControlEventUIJobs[TemplateNodeId][ControlId] != undefined) {

                    //alert(JSON.stringify(LVTemplateUIEventJobConfigMetaData.ControlEventUIJobs[TemplateNodeId][ControlId]));
                    var PostControlUIJobs = LVTemplateUIEventJobConfigMetaData.ControlEventUIJobs[TemplateNodeId][ControlId].PostControlUIJobs;
                    
                    ExcecutePostUIJobs(PostControlUIJobs);
                }

                else if (LVTemplateUIEventJobConfigMetaData.ControlEventUIJobs[TemplateNodeId] != undefined && ControlId == undefined) {

                    for (var itrTemplateNode in LVTemplateUIEventJobConfigMetaData.ControlEventUIJobs[TemplateNodeId]) {

                        var PostControlUIJobs = LVTemplateUIEventJobConfigMetaData.ControlEventUIJobs[TemplateNodeId][itrTemplateNode].PostControlUIJobs;

                        ExcecutePostUIJobs(PostControlUIJobs);
                    }
                }
            }

            OneViewConsole.Debug("ExcecutePostControlUIJobs End", "LVTemplateUIEventJobConfigComponent.ExcecutePostControlUIJobs");        
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("Framework", "LVTemplateUIEventJobConfigComponent.ExcecutePostControlUIJobs", Excep);
        }
        finally {
            IsSuccess = null;       
            _oLVClearUIEventJobComponent = null;
            _oLVRefreshUIEventJobComponent = null;
        }
    }


    /// <summary>
    /// ExcecutePostUIJobs
    /// </summary>
    /// <param name="PostControlUIJobs">PostControlUIJobs</param>    
    var ExcecutePostUIJobs = function (PostControlUIJobs) {

        try {
            OneViewConsole.Debug("ExcecutePostUIJobs Start", "LVTemplateUIEventJobConfigComponent.ExcecutePostUIJobs");

            for (var i = 0; i < PostControlUIJobs.length; i++) {

                if (PostControlUIJobs[i].Type == "DefaultControlUIOperationsRule") {

                    var IsSuccess = ValidateRule(PostControlUIJobs[i].FinalJavaScriptEquation);

                    if (IsSuccess == true) {

                        if (PostControlUIJobs[i].MessageKey != "") {

                            var _oNotificationComponent = oLVFactory.GetNotificationComponent(MyInstance.LVDefaultNotificationComponentKey);
                            _oNotificationComponent.Notify(PostControlUIJobs[i].MessageKey, MyInstance.NotificationDisplayType);
                        }

                        if (PostControlUIJobs[i].ClearControls != null) {

                            var _oLVClearUIEventJobComponent = new LVClearUIEventJobComponent();
                            _oLVClearUIEventJobComponent.ClearControls(PostControlUIJobs[i].ClearControls);
                        }

                        if (PostControlUIJobs[i].RefreshControls != null) {

                            var _oLVRefreshUIEventJobComponent = new LVRefreshUIEventJobComponent();
                            _oLVRefreshUIEventJobComponent.RefreshControls(PostControlUIJobs[i].RefreshControls);
                        }
                    }
                }
                else {
                    alert("Not implemented exception, Type = " + PostControlUIJobs[i].Type + ", LVTemplateUIEventJobComponent.ExcecutePostUIJobs");
                }
            }
           
            OneViewConsole.Debug("ExcecutePostUIJobs End", "LVTemplateUIEventJobConfigComponent.ExcecutePostUIJobs");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVTemplateUIEventJobConfigComponent.ExcecutePostUIJobs", Excep);
        }
    }


    /// <summary>
    /// Validate Rule
    /// </summary>
    /// <param name="Rule">Rule</param>   
    /// <returns>true or false</returns> 
    var ValidateRule = function (Rule) {

        try {
            OneViewConsole.Debug("ValidateRule Start", "LVTemplateUIEventJobConfigComponent.ValidateRule");

            Rule = Rule.replace(/#/g, "'");           
            var IsSuccess = eval(Rule);

            OneViewConsole.Debug("ValidateRule End", "LVTemplateUIEventJobConfigComponent.ValidateRule");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVTemplateUIEventJobConfigComponent.ValidateRule", Excep);
        }
    }
}

// LVClearUIEventJobComponent
function LVClearUIEventJobComponent() {

    var MyInstance = this;
    
    /// <summary>
    /// Clear Controls
    /// </summary>
    /// <param name="ClearControls">List of ClearControl</param>    
    this.ClearControls = function (ClearControls) {

        try {
            OneViewConsole.Debug("ClearControls Start", "LVClearUIEventJobComponent.ClearControls");

            if (ClearControls != null && ClearControls != undefined) {

                for (var itrClearControl in ClearControls) {

                    for (var i = 0; i < ClearControls[itrClearControl].length; i++) {

                        MyInstance.Clear(itrClearControl, ClearControls[itrClearControl][i]);
                    }
                }
            }

            OneViewConsole.Debug("ClearControls End", "LVClearUIEventJobComponent.ClearControls");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVClearUIEventJobComponent.ClearControls", Excep);
        }
    }


    /// <summary>
    /// Clear
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    /// <param name="ControlId">ControlId</param> 
    this.Clear = function (TemplateNodeId, ControlId) {

        try {
            OneViewConsole.Debug("Clear Start", "LVClearUIEventJobComponent.Clear");

            var ControlConfig = LVFormattedTemplateMetadata[TemplateNodeId][ControlId];

            if (ControlConfig != null && ControlConfig != undefined) {

                if (ControlConfig.Type == "DCListViewControlConfig") {

                    if (ControlConfig.ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig") {

                        if (ControlConfig.ListViewDisplay === 3) {

                            var _oLVDefaultHtmlDropdownControl = new LVDefaultHtmlDropdownControl();
                            _oLVDefaultHtmlDropdownControl.Clear(TemplateNodeId, ControlId);
                        }
                        else {
                            alert("Not implemented exception, ListViewDisplay = " + ControlConfig.ListViewDisplay + ", LVClearUIEventJobComponent.Clear");
                        }
                    }
                    else {
                        alert("Not implemented exception, ListViewDataSourceConfig = " + ControlConfig.ListViewDataSourceConfig + ", LVClearUIEventJobComponent.Clear");
                    }
                }
                else if (ControlConfig.Type == "DCNumericTextBoxControlConfig") {

                    var _oLVDefaultNumericTextBoxControl = new LVDefaultNumericTextBoxControl();
                    _oLVDefaultNumericTextBoxControl.Clear(TemplateNodeId, ControlId);
                }
                else {
                    alert("Not implemented exception, Type = " + ControlConfig.Type + ", LVClearUIEventJobComponent.Clear");
                }
            }

            OneViewConsole.Debug("Refresh End", "LVClearUIEventJobComponent.Clear");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVClearUIEventJobComponent.Clear", Excep);
        }
        finally {
            _oLVDefaultHtmlDropdownControl = null;
            _oLVDefaultNumericTextBoxControl = null;
        }
    }
}

// LVRefreshUIEventJobComponent
function LVRefreshUIEventJobComponent() {

    var MyInstance = this;

    /// <summary>
    /// Refresh Controls
    /// </summary>
    /// <param name="RefreshControls">List of RefreshControl</param>    
    this.RefreshControls = function (RefreshControls) {

        try {
            OneViewConsole.Debug("RefreshControls Start", "LVRefreshControlComponent.RefreshControls");

            if (RefreshControls != null && RefreshControls != undefined) {

                for (var itrRefreshControl in RefreshControls) {

                    for (var i = 0; i < RefreshControls[itrRefreshControl].length; i++) {

                        MyInstance.Refresh(itrRefreshControl, RefreshControls[itrRefreshControl][i]);
                    }
                }
            }

            OneViewConsole.Debug("RefreshControls End", "LVRefreshControlComponent.RefreshControls");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVRefreshControlComponent.RefreshControls", Excep);
        }
    }


    /// <summary>
    /// Refresh
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    /// <param name="ControlId">ControlId</param> 
    this.Refresh = function (TemplateNodeId, ControlId) {

        try {
            OneViewConsole.Debug("Refresh Start", "LVRefreshControlComponent.Refresh");

            var ControlConfig = LVFormattedTemplateMetadata[TemplateNodeId][ControlId];

            if (ControlConfig != null && ControlConfig != undefined) {

                if (ControlConfig.Type == "DCListViewControlConfig") {

                    if (ControlConfig.ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig") {

                        if (ControlConfig.ListViewDisplay === 3) {

                            var _oLVDefaultHtmlDropdownControl = new LVDefaultHtmlDropdownControl();
                            _oLVDefaultHtmlDropdownControl.Refresh(TemplateNodeId, ControlId);
                        }
                        else {
                            alert("Not implemented exception, ListViewDisplay = " + ControlConfig.ListViewDisplay + ", LVRefreshControlComponent.Refresh");
                        }
                    }
                    else {
                        alert("Not implemented exception, ListViewDataSourceConfig = " + ControlConfig.ListViewDataSourceConfig + ", LVRefreshControlComponent.Refresh");
                    }
                }
                else if (ControlConfig.Type == "DCNumericTextBoxControlConfig") {

                    var _oLVDefaultNumericTextBoxControl = new LVDefaultNumericTextBoxControl();
                    _oLVDefaultNumericTextBoxControl.Refresh(TemplateNodeId, ControlId);
                }
                else {
                    alert("Not implemented exception, Type = " + ControlConfig.Type + ", LVRefreshControlComponent.Refresh");
                }
            }

            OneViewConsole.Debug("Refresh End", "LVRefreshControlComponent.Refresh");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVRefreshControlComponent.Refresh", Excep);
        }
        finally {
            _oLVDefaultHtmlDropdownControl = null;
        }
    }
}

// DefaultAutoAnswerConfig
function DefaultAutoAnswerConfig() {

    var MyInstance = this;

    /// <summary>
    /// Evaluate
    /// </summary>
    /// <param name="FinalJavaScriptEquation">FinalJavaScriptEquation</param>   
    this.Evaluate = function (FinalJavaScriptEquation) {

        try {
            OneViewConsole.Debug("Evaluate Start", "DefaultAutoAnswerConfig.Evaluate");

            var Result = ValidateRule(FinalJavaScriptEquation);
            if (Result == undefined) {
                Result = "";
            }

            OneViewConsole.Debug("Evaluate End", "DefaultAutoAnswerConfig.Evaluate");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultAutoAnswerConfig.Evaluate", Excep);
        }
        finally {
            _oLVDefaultHtmlDropdownControl = null;
        }
    }

    /// <summary>
    /// Validate Rule
    /// </summary>
    /// <param name="Rule">Rule</param>   
    /// <returns>Result</returns> 
    var ValidateRule = function (Rule) {

        try {
            OneViewConsole.Debug("ValidateRule Start", "DefaultAutoAnswerConfig.ValidateRule");

            Rule = Rule.replace(/#/g, "'");       
            var Result = eval(Rule);

            OneViewConsole.Debug("ValidateRule End", "DefaultAutoAnswerConfig.ValidateRule");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultAutoAnswerConfig.ValidateRule", Excep);
        }
    }
}