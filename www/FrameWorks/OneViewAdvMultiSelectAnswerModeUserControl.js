

var MultiSelectControlData = null;

// OneViewAdvMultiSelectAnswerModeUserControl
function OneViewAdvMultiSelectAnswerModeUserControl(ReqParam) {

    var MyInstance = this;
    this.HtmlContainerId = 'DivAutocompletelist';

    this.AttributeId = ReqParam.AttributeId;
    this.ControlId = ReqParam.ControlId;

    this.SelectedIndexChangedEventHandler = null;
    this.MultiSelectPostCloseEventHandler = ReqParam.oMultiSelectPostCloseEventHandler;

    this.DataSourceModelName = [];

    var TemplateNodeObject = ReqParam.TemplateNode;
    var Scope = ReqParam.Scope;

    Scope[ReqParam.ControlId] = MyInstance;

    this.Init = function () {

        try {          
            if (TemplateNodeObject != undefined) {

                for (itrAnswerMode in TemplateNodeObject.AnswerMode) {

                    if (typeof (TemplateNodeObject.AnswerMode[itrAnswerMode]) != 'function') {

                        if (TemplateNodeObject.AnswerMode[itrAnswerMode].ControlId == MyInstance.ControlId) {

                            var _oDOM = new DOM();
                            _oDOM.RemoveInnerHtml(MyInstance.ControlId);

                            var selected = "";
                            var Id = 0;
                            var DCDetailFromDBList = [];
                            Index = 0;
                            var Html = "";

                            if (OneViewSessionStorage.Get("DcId") != null) {
                                var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
                                var Query = "Select * from DcResultDetailsEntity Where AttributeNodeId = '" + MyInstance.AttributeId + "' And ControlId = '" + MyInstance.ControlId + "' And DataCaptureId = " + OneViewSessionStorage.Get("DcId");
                                DCDetailFromDBList = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
                            }

                            for (var itrBandInfo in TemplateNodeObject.AnswerMode[itrAnswerMode].BandInfo) {
                                for (var i = 0; i < DCDetailFromDBList.length; i++) {
                                    if (DCDetailFromDBList[i].ControlId == MyInstance.ControlId && DCDetailFromDBList[i].AnswerValue != "" && DCDetailFromDBList[i].AnswerValue == TemplateNodeObject.AnswerMode[itrAnswerMode].BandInfo[itrBandInfo].Name) {
                                        selected = "selected";
                                        Id = DCDetailFromDBList[i].Id;
                                        Index = DCDetailFromDBList[i].IndexId;
                                        Html += '<span class="' + TemplateNodeObject.AnswerMode[itrAnswerMode].BandInfo[itrBandInfo].ColourIndex + '">' + DCDetailFromDBList[i].AnswerValue + '</span>';
                                        break;
                                    }
                                }
                                MyInstance.DataSourceModelName.push(
                                    {
                                        label: TemplateNodeObject.AnswerMode[itrAnswerMode].BandInfo[itrBandInfo].Name,
                                        id: Id,
                                        Answer: itrBandInfo,
                                        IndexId: Index,
                                        selected: selected,
                                        colorcode: TemplateNodeObject.AnswerMode[itrAnswerMode].BandInfo[itrBandInfo].ColourIndex
                                    }
                                  );

                                selected = "";
                                Id = 0;
                                //Index += 1;
                                Index = 0;
                            }

                            _oDOM.AddInnerHtml(MyInstance.ControlId, Html);

                            if (OneViewSessionStorage.Get("DcId") != null) {
                                if (MyInstance.SelectedIndexChangedEventHandler != null) {
                                    MyInstance.SelectedIndexChangedEventHandler(
                                        {
                                            ControlId: MyInstance.ControlId,
                                            SelectedValues: MyInstance.GetSelectedValue()
                                        });
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewAdvMultiSelectAnswerModeUserControl.Init", Excep);
        }
    }

    this.Load = function (Header) {

        try {
            AutoCompleteDestroyHTML();

            var AtControlId = "'" + MyInstance.ControlId + "'";

            var DynamicHTML = '<div class="field-item"> ' +
               '<label><span id="divAttributeId">' + Header + '</span>' +
                  '<input id="txtMultiSelectSearch" type="text" searchcontrolid="" dattypeid="" AttributeNodeId="" onkeydown="MultiSelectBandSearch(' + AtControlId + ')"/>' +
               '</label>' +
               '</div>' +
               '<div class="right-panel-content has-autocomplete has-footer list" id="DivAutocompletelist">' +
               '</div>' +
               '<div class="bar bar-footer no-padding">' +
                   '<div class="row">' +
                      ' <div class="col"><a class="button button-block button-clear" onclick="MultiSelectBandClose(' + AtControlId + ')">Close</a></div>' +
                      //' <div class="col"><a class="button button-block button-clear">Add</a></div>' +
                   '</div>' +
           '</div>';

            document.getElementById('divAutocomplatePopUp').innerHTML = DynamicHTML;

            BindData(MyInstance.DataSourceModelName);

            oSnapRemote.open("right");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewAdvMultiSelectAnswerModeUserControl.Load", Excep);
        }
    }

    var BindData = function (ResultArrayToDisplay) {

        try {
            var AtControlId = "'" + MyInstance.ControlId + "'";

            var Options = "";
            for (var i = 0; i < ResultArrayToDisplay.length; i++) {
                var Name = "'" + ResultArrayToDisplay[i].label + "'";
                var Id = ResultArrayToDisplay[i].Answer;
                if (ResultArrayToDisplay[i].selected == "") {
                    Options += '<a id="' + Id + '_ATag" class="item ' + ResultArrayToDisplay[i].colorcode + '-boder" onclick="MultiSelectBandClick(' + AtControlId + ',' + Id + ',' + Name + ')">' + ResultArrayToDisplay[i].label + '<i id="' + Id + '_Color" class=""></i></a>';
                }
                else {
                    Options += '<a id="' + Id + '_ATag" class="item ' + ResultArrayToDisplay[i].colorcode + '-boder item-icon-right" onclick="MultiSelectBandClick(' + AtControlId + ',' + Id + ',' + Name + ')">' + ResultArrayToDisplay[i].label + '<i id="' + Id + '_Color" class="icon icon-check"></i></a>';
                }
            }

            document.getElementById(MyInstance.HtmlContainerId).innerHTML = Options;         
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewAdvMultiSelectAnswerModeUserControl.BindData", Excep);
        }
    }

    this.Search = function () {

        try {
            var FilterParm = document.getElementById('txtMultiSelectSearch').value;
            
            if (FilterParm != "") {

                var CompleteResultArray = MyInstance.DataSourceModelName;

                ClearHtmlContainer();

                var ResultArrayToDisplay = [];
                FilterParm = FilterParm.toUpperCase();

                for (var i = 0; i < CompleteResultArray.length; i++) {
                    
                    var Name = CompleteResultArray[i].label.toUpperCase();

                    if (Name.search(FilterParm) != -1) {

                        ResultArrayToDisplay.push(CompleteResultArray[i]);
                    }
                }

                BindData(ResultArrayToDisplay);
            }
            else {
                BindData(MyInstance.DataSourceModelName);
            }
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewAdvMultiSelectAnswerModeUserControl.Search", Excep);
        }
    }

    this.GetSelectedValue = function () {

        try {
            var SelectedValue = [];
            for (i = 0; i < MyInstance.DataSourceModelName.length; i++) {
                if (MyInstance.DataSourceModelName[i].selected == "selected") {
                    SelectedValue.push(MyInstance.DataSourceModelName[i]);
                }
            }
            return SelectedValue;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewAdvMultiSelectAnswerModeUserControl.GetSelectedValue", Excep);
        }
    }

    this.GetDataSource = function () {

        try {
            return MyInstance.DataSourceModelName;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewAdvMultiSelectAnswerModeUserControl.GetDataSource", Excep);
        }
    }

    this.Set = function (Id, Name) {

        try {
            var _oDOM = new DOM();
            _oDOM.RemoveInnerHtml(MyInstance.ControlId);

            var Html = "";

            for (var i = 0; i < MyInstance.DataSourceModelName.length; i++) {

                if (MyInstance.DataSourceModelName[i].label == Name) {

                    if (MyInstance.DataSourceModelName[i].selected == "") {
                        MyInstance.DataSourceModelName[i].selected = "selected";
                        _oDOM.AddClass(Id + "_Color", "icon");
                        _oDOM.AddClass(Id + "_Color", "icon-check");
                        _oDOM.AddClass(Id + "_ATag", "item-icon-right");
                    }
                    else {
                        MyInstance.DataSourceModelName[i].selected = "";
                        _oDOM.RemoveClass(Id + "_Color", "icon");
                        _oDOM.RemoveClass(Id + "_Color", "icon-check");
                        _oDOM.RemoveClass(Id + "_ATag", "item-icon-right");
                    }
                }

                if (OneViewSessionStorage.Get("ServiceId") != 1 && OneViewSessionStorage.Get("TemplateId") != 15629) {
                   // scope[ControlId].Set(Id, Name);

                    if (MyInstance.DataSourceModelName[i].selected == "selected") {
                        Html += '<span class="' + MyInstance.DataSourceModelName[i].colorcode + '">' + MyInstance.DataSourceModelName[i].label + '</span>';
                    }
                }
            }

            _oDOM.AddInnerHtml(MyInstance.ControlId, Html);

            if (MyInstance.SelectedIndexChangedEventHandler != null) {
                MyInstance.SelectedIndexChangedEventHandler(
                    {
                        ControlId: MyInstance.ControlId,
                        SelectedValues: MyInstance.GetSelectedValue()
                    });
            }

            scope.$apply();
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewAdvMultiSelectAnswerModeUserControl.Set", Excep);
        }
    }

    this.ReloadDisplayElement = function () {

        try {
            var _oDOM = new DOM();
            _oDOM.RemoveInnerHtml(MyInstance.ControlId);

            var Html = "";

            for (var i = 0; i < MyInstance.DataSourceModelName.length; i++) {

                if (MyInstance.DataSourceModelName[i].selected == "selected") {
                    Html += '<span class="' + MyInstance.DataSourceModelName[i].colorcode + '">' + MyInstance.DataSourceModelName[i].label + '</span>';
                }
            }

            _oDOM.AddInnerHtml(MyInstance.ControlId, Html);

            if (MyInstance.SelectedIndexChangedEventHandler != null) {
                MyInstance.SelectedIndexChangedEventHandler(
                    {
                        ControlId: MyInstance.ControlId,
                        SelectedValues: MyInstance.GetSelectedValue()
                    });
            }

            scope.$apply();
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewAdvMultiSelectAnswerModeUserControl.ReloadDisplayElement", Excep);
        }
    }

    this.Clear = function () {

        try {
            var _oDOM = new DOM();
            _oDOM.RemoveInnerHtml(MyInstance.ControlId);

            for (var i = 0; i < MyInstance.DataSourceModelName.length; i++) {
                MyInstance.DataSourceModelName[i].selected = "";
            }

            if (MyInstance.SelectedIndexChangedEventHandler != null) {
                MyInstance.SelectedIndexChangedEventHandler(
                    {
                        ControlId: MyInstance.ControlId,
                        SelectedValues: MyInstance.GetSelectedValue()
                    });
            }

            _oDOM.AddInnerHtml(MyInstance.ControlId, "");

            scope.$apply();
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewAdvMultiSelectAnswerModeUserControl.Clear", Excep);
        }
    }

    var ClearHtmlContainer = function () {
        try {
            OneViewConsole.Debug("ClearHtmlContainer Start", "OneViewAdvAutoCompleteUserControl.ClearHtmlContainer");

            var divAutoComplete = document.getElementById(MyInstance.HtmlContainerId);
            divAutoComplete.innerHTML = '';

            OneViewConsole.Debug("ClearHtmlContainer End", "OneViewAdvAutoCompleteUserControl.ClearHtmlContainer");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.ClearHtmlContainer", Excep);
        }
        finally {
            divAutoComplete = null;
        }
    }

    this.SetWhenCloseBand = function () {

        try {
            var _oDOM = new DOM();
            _oDOM.RemoveInnerHtml(MyInstance.ControlId);

            var Html = "";

            for (var i = 0; i < MyInstance.DataSourceModelName.length; i++) {

                    if (MyInstance.DataSourceModelName[i].selected == "selected") {
                        Html += '<span class="' + MyInstance.DataSourceModelName[i].colorcode + '">' + MyInstance.DataSourceModelName[i].label + '</span>';
                    }
                
            }

            _oDOM.AddInnerHtml(MyInstance.ControlId, Html);

           

            scope.$apply();
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewAdvMultiSelectAnswerModeUserControl.Set", Excep);
        }
    }
}

// MultiSelectBandLoad
function MultiSelectBandLoad(Header, ControlId) {
    try {
        OneViewConsole.Debug("GenerateHTML Start", "AutoCompleteHTMLOperation.MultiSelectBandGenerateHTML");
        MultiSelectControlData = { 'AttributeId': scope[ControlId].AttributeId ,'ControlId' : ControlId};

        scope[ControlId].Load(Header);

        OneViewConsole.Debug("GenerateHTML End", "AutoCompleteHTMLOperation.MultiSelectBandGenerateHTML");
    }
    catch (Excep) {
        //alert(Excep);
        throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteHTMLOperation.MultiSelectBandGenerateHTML", Excep);
    }
}

// MultiSelectBandClick
function MultiSelectBandClick(ControlId, Id, Name) {

    try {
        OneViewConsole.Debug("MultiSelectBandClick Start", "MultiSelectBandClick.MultiSelectBandClick");

        scope[ControlId].Set(Id, Name);

        OneViewConsole.Debug("MultiSelectBandClick End", "MultiSelectBandClick.MultiSelectBandClick");
    }
    catch (Excep) {
        //alert(Excep);
        throw oOneViewExceptionHandler.Create("Framework", "MultiSelectBandClick.MultiSelectBandClick", Excep);
    }
}

// MultiSelectBandSearch
function MultiSelectBandSearch(ControlId) {
    try {
        OneViewConsole.Debug("MultiSelectBandSearch Start", "MultiSelectBandClose.MultiSelectBandSearch");

        scope[ControlId].Search();

        OneViewConsole.Debug("MultiSelectBandSearch End", "MultiSelectBandClose.MultiSelectBandSearch");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Event", "AutoCompleteUserControl.MultiSelectBandSearch", Excep);
    }
    finally {
    }
}

// MultiSelectBandClose
function MultiSelectBandClose(ControlId) {
    try {
        OneViewConsole.Debug("MultiSelectBandClose Start", "MultiSelectBandClose.MultiSelectBandClose");
        
        oSnapRemote.toggle("right");

        if(scope[ControlId].MultiSelectPostCloseEventHandler != null)
        {
            scope[ControlId].MultiSelectPostCloseEventHandler(scope[ControlId].AttributeId, ControlId);
        }

        if (OneViewSessionStorage.Get("ServiceId") == 1 && OneViewSessionStorage.Get("TemplateId") == 15629) {

            scope[ControlId].SetWhenCloseBand();
        }

        MultiSelectControlData = null;      

        OneViewConsole.Debug("MultiSelectBandClose End", "MultiSelectBandClose.MultiSelectBandClose");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Event", "AutoCompleteUserControl.MultiSelectBandClose", Excep);
    }
    finally {
    }
}

