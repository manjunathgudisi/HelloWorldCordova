
var MobileDATEntityType = {
    16: "OrganizationAssetsNode"         
}  

// DefaultTreeListViewDataSourceComponent
function DefaultTreeListViewDataSourceComponent() {

    var MyInstance = this;
    var _oDefaultTreeDAO = new DefaultTreeDAO();
    this.ChildDbElementTypeId = "";

    /// <summary>
    /// Get Data
    /// </summary>    
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    /// <param name="ControlId">ControlId</param> 
    /// <param name="ControlConfig">AnswerMode config</param>
    /// <returns>ListViewDataSourceResponseLst</returns>
    this.GetData = function (TemplateNodeId, ControlId, ControlConfig) {

        try {
            OneViewConsole.Debug("GetDataSource Start", "DefaultTreeListViewDataSourceComponent.GetData");

            var ListViewDataSourceResponseLst = GetData(TemplateNodeId, ControlId, ControlConfig, true);
            
            OneViewConsole.Debug("GetDataSource End", "DefaultTreeListViewDataSourceComponent.GetData");

            return ListViewDataSourceResponseLst;
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("Factory", "DefaultTreeListViewDataSourceComponent.GetData", Excep);
        }
    }


    /// <summary>
    /// Get Data
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    /// <param name="ControlId">ControlId</param> 
    /// <param name="ControlConfig">AnswerMode config</param>
    /// <param name="IsFirstTime">For recursive call (Intenel use)</param>
    /// <returns>ListViewDataSourceResponseLst</returns>
    var GetData = function (TemplateNodeId, ControlId, ControlConfig, IsFirstTime) {

        try {
            OneViewConsole.Debug("GetDataSource Start", "DefaultTreeListViewDataSourceComponent.GetData");

            var ListViewDataSourceResponseLst = new Array();
            var DAOResponse = new Array();
            MyInstance.ChildDbElementTypeId = (IsFirstTime == false) ? MyInstance.ChildDbElementTypeId : ControlConfig.ListViewDataSourceConfig.ChildDbElementTypeId;

            if (ControlConfig.ListViewDataSourceConfig.IsOnline === false) {

                if (ControlConfig.ListViewDataSourceConfig.LoadParms != null) {

                    var TreeDATEntityTypeId = MobileDATEntityType[ControlConfig.ListViewDataSourceConfig.TreeDATEntityTypeId];

                    if (ControlConfig.ListViewDataSourceConfig.LoadParms['ParentNodeId'] != undefined && ControlConfig.ListViewDataSourceConfig.LoadParms['ParentNodeId'] != "") {

                        DAOResponse = _oDefaultTreeDAO.GetAllChildsWithTypeDDL(ControlConfig.ListViewDataSourceConfig.LoadParms['ParentNodeId'], MyInstance.ChildDbElementTypeId, TreeDATEntityTypeId);
                    }
                    else {
                        var AttributeIdControlId = ControlConfig.ListViewDataSourceConfig.LoadParms['AttributeIdControlId'];

                        if (AttributeIdControlId != undefined && AttributeIdControlId.indexOf('_') != -1) {

                            var AttributeIdControlIds = AttributeIdControlId.split('_');
                            var AttributeId = AttributeIdControlIds[0];
                            var ControlId = AttributeIdControlIds[1];

                            if (LVTemplateResult[AttributeId] != undefined) {

                                for (var i = 0; i < LVTemplateResult[AttributeId].Answers.length; i++) {

                                    if (LVTemplateResult[AttributeId].Answers[i].ControlId == ControlId && LVTemplateResult[AttributeId].Answers[i].Answer != "") {
                                        DAOResponse = _oDefaultTreeDAO.GetAllChildsWithTypeDDL(LVTemplateResult[AttributeId].Answers[i].Answer, MyInstance.ChildDbElementTypeId, TreeDATEntityTypeId);
                                    }
                                    else {
                                        var ControlConfig = LVFormattedTemplateMetadata[AttributeId][ControlId];
                                        if (ControlConfig != null && ControlConfig != undefined) {
                                            ListViewDataSourceResponseLst = GetData(AttributeId, ControlId, ControlConfig, false);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                alert("Not implemented exception, IsOnline = " + ControlConfig.ListViewDataSourceConfig.IsOnline + ", DefaultTreeListViewDataSourceComponent.GetData");
            }

            if (DAOResponse.length > 0) {
                ListViewDataSourceResponseLst = Normalize(DAOResponse);
            }

            OneViewConsole.Debug("GetDataSource End", "DefaultTreeListViewDataSourceComponent.GetData");

            return ListViewDataSourceResponseLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "DefaultTreeListViewDataSourceComponent.GetData", Excep);
        }
    }


    /// <summary>
    /// Normalize
    /// </summary>
    /// <param name="DataSourceLst">DataSource list</param>
    /// <returns>ListViewDataSourceResponseLst</returns>
    var Normalize = function (DataSourceLst) {

        try {
            OneViewConsole.Debug("Normalize Start", "DefaultTreeListViewDataSourceComponent.Normalize");

            var ListViewDataSourceResponseLst = [];

            for (var i = 0; i < DataSourceLst.length; i++) {

                var _oListViewDataSourceResponseDTO = new ListViewDataSourceResponseDTO();

                _oListViewDataSourceResponseDTO.Id = DataSourceLst[i].Id;
                _oListViewDataSourceResponseDTO.Name = DataSourceLst[i].Name;
                _oListViewDataSourceResponseDTO.IsDynamicElement = DataSourceLst[i].IsDynamicElement;

                ListViewDataSourceResponseLst.push(_oListViewDataSourceResponseDTO);
            }

            OneViewConsole.Debug("Normalize End", "DefaultTreeListViewDataSourceComponent.Normalize");

            return ListViewDataSourceResponseLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "DefaultTreeListViewDataSourceComponent.Normalize", Excep);
        }
    }
}

// LVDefaultHtmlDropdownControl
function LVDefaultHtmlDropdownControl() {

    var MyInstance = this;
    var _oLVFactory = new LVFactory();
    var _oLVDefaultAnswerModeComponent = new LVDefaultAnswerModeComponent();
    var _oDOM = new DOM();

    /// <summary>
    /// Get Data
    /// </summary>
    /// <param name="DataSourceLst">DataSource list</param>
    /// <returns>ListViewDataSourceResponseLst</returns>
    this.GetData = function (TemplateNodeId, ControlId) {

        try {
            OneViewConsole.Debug("GetData Start", "LVDefaultHtmlDropdownControl.GetData");
           
            var ListViewDataSourceResponseLst = new Array();
            var ControlConfig = LVFormattedTemplateMetadata[TemplateNodeId][ControlId];

            if (ControlConfig != null && ControlConfig != undefined) {
                _oListViewDataSourceComponent = _oLVFactory.GetListViewDataSourceComponent(ControlConfig.ListViewDataSourceConfig.Type)
                ListViewDataSourceResponseLst = _oListViewDataSourceComponent.GetData(TemplateNodeId, ControlId, ControlConfig);
            }
           
            OneViewConsole.Debug("GetData End", "LVDefaultHtmlDropdownControl.GetData");

            return ListViewDataSourceResponseLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.GetData", Excep);
        }
    }


    /// <summary>
    /// Get Html
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    /// <param name="AnswerMode">AnswerMode</param> 
    /// <param name="Answerlst">Default Answers / Selected Answers</param> 
    /// <param name="DataSourceLst">DataSource list</param>
    /// <returns>Html</returns>
    this.GetHtml = function (TemplateNodeId, AnswerMode, Answerlst, DataSourceLst) {

        try {
            OneViewConsole.Debug("GetHtml Start", "LVDefaultHtmlDropdownControl.GetHtml");

            var ControlId = "'" + AnswerMode.ControlId + "'";

            var Html = '<div class="row responsive-md"><div class="col">';

            if (LVTemplateResult[TemplateNodeId] != undefined && (LVTemplateResult[TemplateNodeId].NA != true && LVTemplateResult[TemplateNodeId].IsBlocker != true)) {
                Html += '<select id="' + AnswerMode.ControlId + '" onChange="new LVDefaultHtmlDropdownControl().UpdateAnswerModel(' + TemplateNodeId + ',' + ControlId + ',this)">';
            }
            else {
                Html += '<select id="' + AnswerMode.ControlId + '" onChange="new LVDefaultHtmlDropdownControl().UpdateAnswerModel(' + TemplateNodeId + ',' + ControlId + ',this)" disabled>';
            }

            Html += '<option value="0">Select</option>';

            var Options = '';

            if (DataSourceLst.length > 0) {

                var ControlId = "'" + AnswerMode.ControlId + "'";
                
                for (var i = 0; i < DataSourceLst.length; i++) {

                    for (var j = 0; j < Answerlst.length; j++) {

                        if (Answerlst[0].Answer == DataSourceLst[i].Id) {
                            Options += '<option value="' + DataSourceLst[i].Id + '" selected>' + DataSourceLst[i].Name + '</option>';
                        }
                        else {
                            Options += '<option value="' + DataSourceLst[i].Id + '">' + DataSourceLst[i].Name + '</option>';
                        }
                    }
                }
            }

            Html += Options + '</select></div></div>';

            OneViewConsole.Debug("GetHtml End", "LVDefaultHtmlDropdownControl.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.GetHtml", Excep);
        }
    }


    /// <summary>
    /// Get Html
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    /// <param name="ControlId">ControlId</param> 
    /// <param name="DOMObj">DOMObj</param> 
    this.UpdateAnswerModel = function (TemplateNodeId, ControlId, DOMObj) {
       
        try {
            OneViewConsole.Debug("UpdateAnswerModel Start", "LVDefaultHtmlDropdownControl.UpdateAnswerModel");
           
            if (LVTemplateResult[TemplateNodeId] != undefined && LVTemplateResult[TemplateNodeId].NA != true) {

                LVCurrentAttributeId = TemplateNodeId;
                LVCurrentControlId = ControlId;

                var Answer = "", AnswerValue = "";

                if (DOMObj.value > 0) {
                    Answer = DOMObj.value;
                    AnswerValue = DOMObj.options[DOMObj.selectedIndex].text;
                }

                _oLVDefaultAnswerModeComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, AnswerValue);

                if (LVFormattedTemplateMetadata[TemplateNodeId] != undefined && LVFormattedTemplateMetadata[TemplateNodeId][ControlId] != undefined) {

                    var _oLVRefreshUIEventJobComponent = new LVRefreshUIEventJobComponent();
                    _oLVRefreshUIEventJobComponent.RefreshControls(LVFormattedTemplateMetadata[TemplateNodeId][ControlId].RefreshControls);

                    var _oLVTemplateHeaderComponent = new LVTemplateHeaderComponent();
                    _oLVTemplateHeaderComponent.Update();
                }
            }

            OneViewConsole.Debug("UpdateAnswerModel End", "LVDefaultHtmlDropdownControl.UpdateAnswerModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.UpdateAnswerModel", Excep);
        }
    }


    /// <summary>
    /// Get Html
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    /// <param name="ControlId">ControlId</param> 
    /// <param name="Answer">Answer</param> 
    /// <param name="AnswerValue">AnswerValue</param> 
    this.Set = function (TemplateNodeId, ControlId, Answer, AnswerValue) {

        try {
            OneViewConsole.Debug("Set Start", "LVDefaultHtmlDropdownControl.Set");

            _oLVDefaultAnswerModeComponent.UpdateAnswerModel(TemplateNodeId, ControlId, Answer, AnswerValue);

            var obj = _oDOM.GetObjectById(ControlId);
            if (obj != null) {
                for (var i = 0; i < obj.options.length; i++) {
                    if (obj.options[i].value === Answer) {
                        obj.selectedIndex = i;
                    }
                }
            }
            
            OneViewConsole.Debug("Set End", "LVDefaultHtmlDropdownControl.Set");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.Set", Excep);
        }
    }


    /// <summary>
    /// Get
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    /// <param name="ControlId">ControlId</param> 
    this.Get = function (TemplateNodeId, ControlId) {

        try {
            OneViewConsole.Debug("Get Start", "LVDefaultHtmlDropdownControl.Get");

            var Response = {
                Answer: _oLVDefaultAnswerModeComponent.GetAnswer(TemplateNodeId, ControlId),
                AnswerValue: _oLVDefaultAnswerModeComponent.GetAnswerValue(TemplateNodeId, ControlId)
            }

            OneViewConsole.Debug("Get End", "LVDefaultHtmlDropdownControl.Get");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.Get", Excep);
        }
    }


    /// <summary>
    /// Clear
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    /// <param name="ControlId">ControlId</param> 
    this.Clear = function (TemplateNodeId, ControlId) {

        try {
            OneViewConsole.Debug("Clear Start", "LVDefaultHtmlDropdownControl.Clear");
            
            _oLVDefaultAnswerModeComponent.ClearAnswerModel(TemplateNodeId, ControlId);
            
            var obj = _oDOM.GetObjectById(ControlId);
            if (obj != null) {
                obj.selectedIndex = 0;
            }

            OneViewConsole.Debug("Clear End", "LVDefaultHtmlDropdownControl.Clear");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.Clear", Excep);
        }
    }


    /// <summary>
    /// Disable
    /// </summary>
    /// <param name="ControlId">ControlId</param> 
    this.Disable = function (ControlId) {

        try {
            OneViewConsole.Debug("Disable Start", "LVDefaultHtmlDropdownControl.Disable");

            _oDOM.Disable(ControlId);

            OneViewConsole.Debug("Disable End", "LVDefaultHtmlDropdownControl.Disable");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.Disable", Excep);
        }
    }


    /// <summary>
    /// Enable
    /// </summary>
    /// <param name="ControlId">ControlId</param> 
    this.Enable = function (ControlId) {

        try {
            OneViewConsole.Debug("Enable Start", "LVDefaultHtmlDropdownControl.Enable");

            _oDOM.Enable(ControlId);

            OneViewConsole.Debug("Enable End", "LVDefaultHtmlDropdownControl.Enable");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.Enable", Excep);
        }
    }


    /// <summary>
    /// Refresh
    /// </summary>
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    /// <param name="ControlId">ControlId</param> 
    this.Refresh = function (TemplateNodeId, ControlId) {

        try {
            OneViewConsole.Debug("Refresh Start", "LVDefaultHtmlDropdownControl.Refresh");

            var ListViewDataSourceResponseLst = new Array();
            var ControlConfig = LVFormattedTemplateMetadata[TemplateNodeId][ControlId];

            if (ControlConfig != null && ControlConfig != undefined) {

                var _oListViewDataSourceComponent = _oLVFactory.GetListViewDataSourceComponent(ControlConfig.ListViewDataSourceConfig.Type);
                ListViewDataSourceResponseLst = _oListViewDataSourceComponent.GetData(TemplateNodeId, ControlId, ControlConfig);

                var Options = GetOptionsHtml(ListViewDataSourceResponseLst);
                _oDOM.AddInnerHtml(ControlId, Options);

                MyInstance.Clear(TemplateNodeId, ControlId);
            }

            OneViewConsole.Debug("Refresh End", "LVDefaultHtmlDropdownControl.Refresh");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.Refresh", Excep);
        }
    }


    /// <summary>
    /// Get Options
    /// </summary>
    /// <param name="DataSourceLst">DataSource list</param>
    /// <returns>Html</returns>
    var GetOptionsHtml = function (DataSourceLst) {

        try {
            OneViewConsole.Debug("GetOptionsHtml Start", "LVDefaultHtmlDropdownControl.GetOptionsHtml");

            var Options = '<option value="0">Select</option>';

            for (var i = 0; i < DataSourceLst.length; i++) {
                Options += '<option value="' + DataSourceLst[i].Id + '">' + DataSourceLst[i].Name + '</option>';
            }

            OneViewConsole.Debug("GetOptionsHtml End", "LVDefaultHtmlDropdownControl.GetOptionsHtml");

            return Options;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "LVDefaultHtmlDropdownControl.GetOptionsHtml", Excep);
        }
    }
}

// ListViewDataSourceResponseDTO
function ListViewDataSourceResponseDTO() {

    this.Id = "";
    this.Name = "";

    this.Value = 0;
    this.ColorCode = "";
    this.IsSelected = false;

    this.IsDynamicElement = false;
}
