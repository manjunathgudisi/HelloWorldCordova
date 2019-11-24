
// DCListViewControlConfig NA Component
function LVDefaultNAComponent() {

    this.LVDefaultTextBoxControlKey = "LVDefaultTextBoxControl";
    this.LVDefaultBandControlKey = "LVDefaultBandControl";
    this.LVDefaultRadioButtonControlKey = "LVDefaultRadioButtonControl";
    this.LVActionNCComponentKey = "LVActionNCComponent";

    var MyInstance = this;
    var oLVFactory = new LVFactory();

    /// <summary>
    /// Get NA html
    /// </summary>
    /// <param name="IsNAselected">NA will select or not</param>   
    /// <returns>NA html</returns>  
    this.GetHtml = function (TemplateNodeId, IsNAselected) {

        try {
            OneViewConsole.Debug("GetHtml Start", "LVDefaultNAComponent.GetHtml");
           
            var NAHtml = '';

            if (IsNAselected != true) {
                NAHtml = '<div class="na-but item-left-edit visible active">' +
                                '<button class="button" onclick="new LVDefaultNAComponent().UpdateModel(' + TemplateNodeId + ',this);">N/A</button>' +
                         '</div>';
            }
            else {
                NAHtml = '<div class="na-but item-left-edit visible active">' +
                                '<button class="button active" onclick="new LVDefaultNAComponent().UpdateModel(' + TemplateNodeId + ',this);">N/A</button>' +
                         '</div>';
            }

            OneViewConsole.Debug("GetHtml End", "LVDefaultNAComponent.GetHtml");
           
            return NAHtml;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.GetHtml", Excep);
        }
    }


    /// <summary>
    /// Update Model
    /// </summary>
    /// <param name="TemplateNodeId">Template Node Id</param>    
    /// <param name="DOMObj">DOMObj</param>    
    this.UpdateModel = function (TemplateNodeId, DOMObj,IsNotFromDOMobj) {

        try {
            OneViewConsole.Debug("UpdateModel Start", "LVDefaultNAComponent.UpdateModel");
            LVIsNonMandatoryActionNCRuleViolated = false;
            var _oLVDataCaptureBO = new LVDataCaptureBO();

            if (_oLVDataCaptureBO.ValidateGeoLocation()) {

                if (LVTemplateResult[TemplateNodeId] != undefined) {
                    if (IsNotFromDOMobj == undefined) {
                        SetColor(TemplateNodeId, DOMObj);
                    }
                  

                    LVTemplateResult[TemplateNodeId].NA = !(LVTemplateResult[TemplateNodeId].NA);

                    for (var i = 0; i < LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                        LVTemplateResult[TemplateNodeId].Answers[i].IsModified = true;
                    }

                    if (LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA == true) {
                        for (var i = 0; i < LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes.length; i++) {
                            if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCListViewControlConfig") {
                                if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ListViewDisplay == 1) {
                                    var _oAnswerMode = oLVFactory.GetRadioButtonControl(MyInstance.LVDefaultRadioButtonControlKey);
                                    _oAnswerMode.ClearAnswerModel(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                }
                                else if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ListViewDataSourceConfig.Type == "BandListViewDataSourceConfig" || LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ListViewDataSourceConfig.Type == "_oBandListViewDataSourceConfig") {
                                    var _oAnswerMode = oLVFactory.GetBandControl(MyInstance.LVDefaultBandControlKey);
                                    _oAnswerMode.ClearAnswerModel(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                }
                                else if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig") {
                                    var _oAnswerMode = new LVDefaultHtmlDropdownControl();
                                    _oAnswerMode.Clear(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                    _oAnswerMode.Disable(LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                }
                            }
                            else if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCTextBoxControlConfig" || LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCNumericTextBoxControlConfig") {
                                var _oAnswerMode = oLVFactory.GetTextBoxControl(MyInstance.LVDefaultTextBoxControlKey);
                                _oAnswerMode.ClearAnswerModel(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                            }
                            else if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCSignaturePadControlConfig") {
                                var _oAnswerMode = new LVDefaultSignatutePadControl();
                                _oAnswerMode.Clear(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                _oAnswerMode.Disable(LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                            }

                            var _oActionNCComponent = oLVFactory.GetActionNCComponent(MyInstance.LVActionNCComponentKey);
                            var oActionNCConfigList = _oActionNCComponent.CheckActionNC(TemplateNodeId, true);

                            if (oActionNCConfigList != undefined && oActionNCConfigList != null) {
                                for (var j = 0; j < oActionNCConfigList.length; j++) {
                                    if (LVActionResult[oActionNCConfigList[j].RuleId] != undefined) {
                                        if (LVActionResult[oActionNCConfigList[j].RuleId].DCNCMappingClientId == "") {
                                            delete LVActionResult[oActionNCConfigList[j].RuleId];
                                        }
                                        else {
                                            LVActionResult[oActionNCConfigList[j].RuleId].IsDisable = true;
                                            LVActionResult[oActionNCConfigList[j].RuleId].IsNC = false;
                                            for (var k = 0; k < LVActionResult[oActionNCConfigList[j].RuleId].Actions.length; k++) {
                                                LVActionResult[oActionNCConfigList[j].RuleId].Actions[k].IsDisable = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        var _oLVDefaultActualTimeComponent = new LVDefaultActualTimeComponent();
                        _oLVDefaultActualTimeComponent.Clear(TemplateNodeId);
                        _oLVDefaultActualTimeComponent.Disable(TemplateNodeId);
                        if (IsNotFromDOMobj == undefined) {
                            var _oDOM = new DOM();
                            _oDOM.AddClass("TemplateNodeBlock_" + TemplateNodeId, "na");
                        }
                    }
                    else {
                        if (LVTemplateResult[TemplateNodeId].IsBlocker == false) {
                            var GeoLocationResponse = _oLVDataCaptureBO.GetLatitudeAndLongitude();

                            for (var i = 0; i < LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes.length; i++) {
                                if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCTextBoxControlConfig" || LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCNumericTextBoxControlConfig" || (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCListViewControlConfig" && LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig")) {
                                    var _oDOM = new DOM();
                                    _oDOM.Enable(LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                }
                                else if (LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].Type == "DCSignaturePadControlConfig") {
                                    var _oAnswerMode = new LVDefaultSignatutePadControl();
                                    _oAnswerMode.Enable(LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);
                                }

                                var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
                                _oLVDefaultAnswerModeComponent.UpdateMandatoryInfoCurrentStatus(TemplateNodeId, LVFormattedTemplateMetadata[TemplateNodeId].AnswerModes[i].ControlId);

                             
                                LVTemplateResult[TemplateNodeId].Answers[i].Latitude = GeoLocationResponse.Latitude;
                                LVTemplateResult[TemplateNodeId].Answers[i].Longitude = GeoLocationResponse.Longitude;
                            }

                            var _oLVDefaultActualTimeComponent = new LVDefaultActualTimeComponent();
                            _oLVDefaultActualTimeComponent.Enable(TemplateNodeId);
                            var _oDOM = new DOM();
                            _oDOM.RemoveClass("TemplateNodeBlock_" + TemplateNodeId, "na");

                          
                        }
                    }
                }

                var _oLVTemplateHeaderComponent = new LVTemplateHeaderComponent();
                _oLVTemplateHeaderComponent.Update();

                var _oLVTemplateUIEventJobComponent = new LVTemplateUIEventJobComponent();
                _oLVTemplateUIEventJobComponent.ExcecutePostControlUIJobs(TemplateNodeId);

            }
            
            OneViewConsole.Debug("UpdateModel End", "LVDefaultNAComponent.UpdateModel");
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.UpdateModel", Excep);
        }
    }


    /// <summary>
    /// Set Color
    /// </summary>
    /// <param name="TemplateNodeId">Template Node Id</param>   
    var SetColor = function (TemplateNodeId, DOMObj) {

        try {
            OneViewConsole.Debug("SetColor Start", "LVDefaultNAComponent.SetColor");

            var _oDOM = new DOM();

            if (LVTemplateResult[TemplateNodeId].NA) {
                _oDOM.RemoveClassByObj(DOMObj, "active");
            }
            else {
                _oDOM.AddClassByObj(DOMObj, "active");
            }

            OneViewConsole.Debug("SetColor End", "LVDefaultNAComponent.SetColor");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.SetColor", Excep);
        }
    }


    /// <summary>
    /// NA Enable or not
    /// </summary>
    /// <param name="AttributeId">Attribute Node Id</param>   
    /// <returns>true or false</returns>  
    this.IsNAEnable = function (AttributeId) {

        try {
            OneViewConsole.Debug("IsNAEnable start", "LVDefaultNAComponent.IsNAEnable");

            var NAEnable = false;

            if (LVNAConfigMetaData != null) {

                if (LVNAConfigMetaData[AttributeId] != undefined) {
                    
                    NAEnable = LVNAConfigMetaData[AttributeId].IsNAEnable;
                }
            }

            OneViewConsole.Debug("IsNAEnable start", "LVDefaultNAComponent.IsNAEnable");

            return NAEnable;
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.IsNAEnable", Excep);
        }
    }


    /// <summary>
    /// NA Exclude or not
    /// </summary>
    /// <param name="AttributeId">Attribute Node Id</param>   
    /// <returns>true or false</returns>  
    this.IsExclude = function (AttributeId) {

        try {
            OneViewConsole.Debug("IsExclude start", "LVDefaultNAComponent.IsExclude");

            var Exclude = false;

            if (LVNAConfigMetaData != null) {

                if (LVNAConfigMetaData[AttributeId] != undefined) {

                    if (LVNAConfigMetaData[AttributeId].IsExcluded == true) {

                        Exclude = CheckNAEnableOrNotForLastDC(AttributeId);
                    }
                }
            }

            OneViewConsole.Debug("IsExclude start", "LVDefaultNAComponent.IsExclude");

            return Exclude;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.IsExclude", Excep);
        }
    }


    /// <summary>
    /// Check NA Enable Or Not For Last DC
    /// </summary>
    /// <param name="AttributeId">Attribute Node Id</param>   
    /// <returns>true or false</returns>  
    var CheckNAEnableOrNotForLastDC = function (AttributeId) {

        try {
            OneViewConsole.Debug("CheckNAEnableOrNotForLastDC start", "LVDefaultNAComponent.CheckNAEnableOrNotForLastDC");

            var Exclude = false;

            OneViewConsole.Debug("CheckNAEnableOrNotForLastDC end", "LVDefaultNAComponent.CheckNAEnableOrNotForLastDC");

            return Exclude;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.CheckNAEnableOrNotForLastDC", Excep);
        }
    }
}