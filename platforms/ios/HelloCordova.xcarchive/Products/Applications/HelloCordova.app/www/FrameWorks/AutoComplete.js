
//{ scope: '', controlId:'',DataSourceModelName:'', SearchElementModelName:'',ControlType:'',DBElementType:'',}
function AutoCompleteUserControl(AutoCompleteConstructorParam) { //scope, controlId, DataSourceModelName, SearchElementModelName, ControlType) {
    try {
        
        OneViewConsole.Debug("AutoCompleteUserControl Start", "AutoCompleteUserControl");

        if (AutoCompleteConstructorParam.Scope != null && AutoCompleteConstructorParam.DataSourceModelName != null && AutoCompleteConstructorParam.DisplayElementModelName != null && AutoCompleteConstructorParam.DATEntityTypeId != null
            && AutoCompleteConstructorParam.xlatService != null && AutoCompleteConstructorParam.ToasterService != null) {
            var MyInstance = this;
            var MyControl;
            var ControlType = 'OneViewAdvAutoCompleteUserControl';
            if (AutoCompleteConstructorParam.ControlType != undefined)
                ControlType = AutoCompleteConstructorParam.ControlType;

            //alert(AutoCompleteConstructorParam.ControlType);
            //if (AutoCompleteConstructorParam.ControlType != null)
            //    ControlType = AutoCompleteConstructorParam.ControlType;

            var controlId = AutoCompleteConstructorParam.ControlId;
            var DataSourceModelName = AutoCompleteConstructorParam.DataSourceModelName;
            var DisplayElementModelName = AutoCompleteConstructorParam.DisplayElementModelName;
            var scope = AutoCompleteConstructorParam.Scope;
            var DATEntityTypeId = AutoCompleteConstructorParam.DATEntityTypeId;

            var AttributeNodeId = AutoCompleteConstructorParam.AttributeNodeId;

            //this.RegisterEvent = function (name) {
            //    alert('Register');
            //    MyControl.SelectedIndexChangedEventHandler = name;
            //}

            ///when ever change the value(selected inndex change),this job will fire
            //here can configure,whcih textbox need to refresh, which colum need to set
            //{ Type:'DefaultTextboxRefreshJob',ControlId:'txtno',ColumnNames:[],Seperater:'-' }
            this.DefaultRefreshJobs = [];

            this.IsDynamicElement = false;
            var IsDynamicElementCreationEnabled = true;
            if (AutoCompleteConstructorParam.IsDynamicElementCreationEnabled != undefined)
                IsDynamicElementCreationEnabled = AutoCompleteConstructorParam.IsDynamicElementCreationEnabled;

            //-1 for unlimit
            this.MaxDataToDisplay = 500;
            if (AutoCompleteConstructorParam.MinCharToSearch != undefined) {
                this.MinCharToSearch = AutoCompleteConstructorParam.MinCharToSearch;

            }
            else {
                this.MinCharToSearch = 2;
            }
            var xlatService = AutoCompleteConstructorParam.xlatService;
            var ToasterService = AutoCompleteConstructorParam.ToasterService;

            this.ParentNodeId = "";
      
            if (AutoCompleteConstructorParam.IsDynamicElementCreationEnabled != undefined) {
                this.DynamicElementCreationEnabledStatus = AutoCompleteConstructorParam.IsDynamicElementCreationEnabled;
                //alert(AutoCompleteConstructorParam.ControlId + "      " + DynamicElementCreationEnabledStatus)
            }
            else {
                this.DynamicElementCreationEnabledStatus = true;
            }
               

            if (ControlType == 'OneViewAdvAutoCompleteUserControl') {
                try {
                    MyControl = new OneViewAdvAutoCompleteUserControl();
                    MyControl.IsDynamicElement = MyInstance.IsDynamicElement;
                    MyControl.ControlId = controlId;
                    MyControl.oScope = scope;
                    MyControl.DataSourceModelName = DataSourceModelName;
                    MyControl.DisplayElementModelName = DisplayElementModelName; //Display text box not using for search
                    MyControl.MaxDataToDisplay = MyInstance.MaxDataToDisplay;
                    MyControl.MinCharToSearch = MyInstance.MinCharToSearch;
                    MyControl.xlatService = xlatService;
                    MyControl.IsDynamicElementCreationEnabled = IsDynamicElementCreationEnabled;
                    MyControl.ToasterService = ToasterService;
                    MyControl.AttributeNodeId = AttributeNodeId;
                    MyControl.DefaultRefreshJobs = MyInstance.DefaultRefreshJobs;
                    MyControl.ParentNodeId = MyInstance.ParentNodeId;
                    MyControl.DynamicElementCreationEnabledStatus = MyInstance.DynamicElementCreationEnabledStatus;

                    if (AutoCompleteConstructorParam.SelectedIndexChangedEventHandler != undefined)
                        MyControl.SelectedIndexChangedEventHandler = AutoCompleteConstructorParam.SelectedIndexChangedEventHandler;
                    scope[controlId] = MyInstance;
                }
                catch (Excep) {
                    alert('If ControlType ' + Excep)
                }
            }
            else {
                alert('not implemented exception');
            }



            var SetObjectInScope = function () {
                try {
                    OneViewConsole.Debug("SetObjectInScope Start", "AutoCompleteUserControl.SetObjectInScope");

                    var res = controlId.split('.');
                    if (res.length == 1)
                        MyInstance.scope[controlId] = this;
                    else if (res.length == 2) {
                        MyInstance.scope[res[0]][res[1]] = this;
                    }
                    else
                        alert('SetObjectInScope : not implemented exception');

                    OneViewConsole.Debug("SetObjectInScope End", "AutoCompleteUserControl.SetObjectInScope");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.SetObjectInScope", Excep);
                }
                finally {
                    res = null;
                }
            }

            //alert(controlId);
            //  alert(scope.NewDCModel['AddlAirlineControlId']);

            this.Init = function (reqParm) {
                try {
                    OneViewConsole.Debug("Init Start", "AutoCompleteUserControl.Init");

                        MyControl.Init(reqParm);

                    OneViewConsole.Debug("Init End", "AutoCompleteUserControl.Init");
                }

                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.Init", Excep);
                }
            }

            this.GetControlType = function () {
                try {
                 
                    OneViewConsole.Debug("GetControlType Start", "AutoCompleteUserControl.GetControlType");
                    OneViewConsole.Debug("GetControlType End", "AutoCompleteUserControl.GetControlType");

                    return ControlType;
                }

                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.GetControlType", Excep);
                }
            }

            this.GetDATEntityTypeId = function () {
                try {
                    OneViewConsole.Debug("GetDATEntityTypeId Start", "AutoCompleteUserControl.GetDATEntityTypeId");
                    OneViewConsole.Debug("GetDATEntityTypeId End", "AutoCompleteUserControl.GetDATEntityTypeId");

                    return DATEntityTypeId;
                }

                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.GetDATEntityTypeId", Excep);
                }
            }

            this.Load = function (dataSource) {
                try {
                    OneViewConsole.Debug("Load Start", "AutoCompleteUserControl.Load");
                
                        MyControl.Load(dataSource);

                    OneViewConsole.Debug("Load End", "AutoCompleteUserControl.Load");

                }

                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.Load", Excep);
                }
            }

            this.AddElement = function (element) {
                try {
                    OneViewConsole.Debug("AddElement Start", "AutoCompleteUserControl.AddElement");
                
                        MyControl.AddElement(element);

                    OneViewConsole.Debug("AddElement End", "AutoCompleteUserControl.AddElement");
                }

                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.AddElement", Excep);
                }
            }

            this.Clear = function () {
                try {
                    OneViewConsole.Debug("Clear Start", "AutoCompleteUserControl.Clear");

                    MyControl.Clear();

                    OneViewConsole.Debug("Clear End", "AutoCompleteUserControl.Clear");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.Clear", Excep);
                }
            }

            this.Search = function () {
                try {
                    OneViewConsole.Debug("Search Start", "AutoCompleteUserControl.Search");

                        MyControl.Search();

                    OneViewConsole.Debug("Search End", "AutoCompleteUserControl.Search");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.Search", Excep);
                }
            }

            this.TreeName;

            this.LoadFromTreeChildsWithType = function (ParentNodeId, ChildTypeId, TreeName) {
                try {
                    OneViewConsole.Debug("LoadFromTreeChildsWithType Start", "AutoCompleteUserControl.LoadFromTreeChildsWithType");
                    MyInstance.TreeName = TreeName;
                    MyInstance.ParentNodeId = ParentNodeId;
                        var _oDefaultTreeDAO = new DefaultTreeDAO();
                        var result = _oDefaultTreeDAO.GetAllChildsWithTypeDDL(ParentNodeId, ChildTypeId, TreeName);
                       
                        MyControl.Load(result);

                    OneViewConsole.Debug("LoadFromTreeChildsWithType End", "AutoCompleteUserControl.LoadFromTreeChildsWithType");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.LoadFromTreeChildsWithType", Excep);
                }
                finally {
                    _oDefaultTreeDAO = null;
                    result = null;
                }
            }

            this.SetDataSourceWithWorkOrder = function (ParentNodeId, ChildTypeId, TreeName, SectionCodesConfig) {
                try {
                    MyInstance.TreeName = TreeName;
                    OneViewConsole.Debug("GetAllChildsWithTypeDDLWorkOrder Start", "AutoCompleteUserControl.GetAllChildsWithTypeDDLWorkOrder");
                    var _oDefaultTreeDAO = new DefaultTreeDAO();
                    var result = _oDefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder(ParentNodeId, ChildTypeId, TreeName, SectionCodesConfig);
                     //alert('result:'+JSON.stringify(result));
                    //  var result = LoadDropDown_Test();
                    MyInstance.ParentNodeId = ParentNodeId;
                    MyControl.SetDataSourceFromTreeChildsWithType(result);

                    OneViewConsole.Debug("GetAllChildsWithTypeDDLWorkOrder End", "AutoCompleteUserControl.GetAllChildsWithTypeDDLWorkOrder");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithType", Excep);
                }
            }

            this.SetDataSourceWithPurchaseOrder = function (ParentNodeId, ChildTypeId, TreeName) {
                try {
                    MyInstance.TreeName = TreeName;
                    OneViewConsole.Debug("GetAllChildsWithTypeDDLWorkOrder Start", "AutoCompleteUserControl.GetAllChildsWithTypeDDLWorkOrder");
                    var _oDefaultTreeDAO = new DefaultTreeDAO();
                    var result = _oDefaultTreeDAO.GetAllChildsWithTypeDDLPurchaseOrder(ParentNodeId, ChildTypeId, TreeName);
                    // alert('result:'+JSON.stringify(result));
                    //  var result = LoadDropDown_Test();
                    MyInstance.ParentNodeId = ParentNodeId;
                    MyControl.SetDataSourceFromTreeChildsWithType(result);

                    OneViewConsole.Debug("GetAllChildsWithTypeDDLWorkOrder End", "AutoCompleteUserControl.GetAllChildsWithTypeDDLWorkOrder");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithType", Excep);
                }
            }

            this.SetDataSourceWithObservationType = function (ParentNodeId, ChildTypeId, TreeName) {
                try {
                    MyInstance.TreeName = TreeName;
                    OneViewConsole.Debug("SetDataSourceWithObservationType Start", "AutoCompleteUserControl.SetDataSourceWithObservationType");

                    var result = [];

                    var Query = "SELECT ServerId,Name From IncidentType";

                    OneViewConsole.DataLog("Requested Query : " + Query, "AutoCompleteUserControl.SetDataSourceWithObservationType");

                    var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                    Nodes = JSON.parse(Nodes);

                    OneViewConsole.DataLog("Response from db : " + Nodes, "AutoCompleteUserControl.SetDataSourceWithObservationType");

                    var Id;
                    var IsDynamicElement = false;
                    MyInstance.ParentNodeId = ParentNodeId;
                    for (i = 0; i < Nodes.length; i++) {
                        result.push({
                            "Id": Nodes[i].ServerId,
                            "Name": Nodes[i].Name,
                            "IsDynamicElement": IsDynamicElement
                        });
                    }
                   
                    MyControl.SetDataSourceFromTreeChildsWithType(result);

                    OneViewConsole.Debug("SetDataSourceWithObservationType End", "AutoCompleteUserControl.SetDataSourceWithObservationType");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithType", Excep);
                }
            }
            this.SetDataSourceWithObservationMaster = function (ParentNodeId, ChildTypeId, TreeName) {
                try {
                    MyInstance.TreeName = TreeName;
                    OneViewConsole.Debug("SetDataSourceWithObservationMaster Start", "AutoCompleteUserControl.SetDataSourceWithObservationMaster");

                    var result = [];

                    var Query = "SELECT ServerId,Name From IncidentMasterEntity";
                    //var Query = "SELECT ServerId,Name From IncidentMasterEntity WHERE IncidentTypeId = " + ParentNodeId;

                    OneViewConsole.DataLog("Requested Query : " + Query, "AutoCompleteUserControl.SetDataSourceWithObservationMaster");

                    var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                    Nodes = JSON.parse(Nodes);

                    OneViewConsole.DataLog("Response from db : " + Nodes, "AutoCompleteUserControl.SetDataSourceWithObservationMaster");

                    var Id;
                    var IsDynamicElement = false;
                    MyInstance.ParentNodeId = ParentNodeId;
                    for (i = 0; i < Nodes.length; i++) {
                        result.push({
                            "Id": Nodes[i].ServerId,
                            "Name": Nodes[i].Name,
                            "IsDynamicElement": IsDynamicElement
                        });
                    }
                   
                    MyControl.SetDataSourceFromTreeChildsWithType(result);

                    OneViewConsole.Debug("SetDataSourceWithObservationType End", "AutoCompleteUserControl.SetDataSourceWithObservationMaster");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithType", Excep);
                }
            }

            this.SetDataSourceForProductType = function (ParentNodeId, ChildTypeId, TreeName) {
                try {
                    MyInstance.TreeName = TreeName;
                    OneViewConsole.Debug("SetDataSourceForProductType Start", "AutoCompleteUserControl.SetDataSourceForProductType");
                    var _oDefaultTreeDAO = new DefaultTreeDAO();

                    var result = [];

                    var Query = "SELECT ServerId,Name From Label WHERE LabelTypeId = " + ChildTypeId + "";
                          
                    OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.SetDataSourceForProductType");

                    var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                    Nodes = JSON.parse(Nodes);

                    OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.SetDataSourceForProductType");

                    var Id;
                    var IsDynamicElement = false;
                    MyInstance.ParentNodeId = ParentNodeId;
                    for (i = 0; i < Nodes.length; i++) {                      
                        result.push({
                            "Id": Nodes[i].ServerId,
                            "Name": Nodes[i].Name,
                            "IsDynamicElement": IsDynamicElement
                        });
                    }
                    // alert('result:'+JSON.stringify(result));
                    //  var result = LoadDropDown_Test();
                    MyControl.SetDataSourceFromTreeChildsWithType(result);

                    OneViewConsole.Debug("SetDataSourceForProductType End", "AutoCompleteUserControl.SetDataSourceForProductType");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.SetDataSourceForProductType", Excep);
                }
            }

            this.SetDataSourceFromTreeChildsWithType = function (ParentNodeId, ChildTypeId, TreeName) {
                try {
                    MyInstance.TreeName = TreeName;
                    OneViewConsole.Debug("SetDataSourceFromTreeChildsWithType Start", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithType");
                        var _oDefaultTreeDAO = new DefaultTreeDAO();
                        var result = _oDefaultTreeDAO.GetAllChildsWithTypeDDL(ParentNodeId, ChildTypeId, TreeName);
                       //alert('result:'+JSON.stringify(result));
                    //  var result = LoadDropDown_Test();
                        MyControl.TreeName = TreeName;
                        MyControl.SetDataSourceFromTreeChildsWithType(result);
                        MyControl.ParentNodeIdFromTemplate = ParentNodeId;
                        //alert("1:::> " + JSON.stringify(scope[controlId]));
                        MyInstance.ParentNodeId = ParentNodeId;
                        

                    OneViewConsole.Debug("SetDataSourceFromTreeChildsWithType End", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithType");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithType", Excep);
                }
                //finally {
                //    _oDefaultTreeDAO = null;
                //    result = null;
                //}
            }

            this.SetDataSourceFromTreeChildsWithTypeAndLabel = function (ParentNodeId, ChildTypeId, TreeName, LabelId) {
                try {
                    MyInstance.TreeName = TreeName;
                    OneViewConsole.Debug("SetDataSourceFromTreeChildsWithTypeAndLabel Start", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithTypeAndLabel");

                    var _oDefaultTreeDAO = new DefaultTreeDAO();
                    var result = _oDefaultTreeDAO.GetAllChildsWithTypeAndLabelDDL(ParentNodeId, ChildTypeId, TreeName, LabelId);
                    MyControl.TreeName = TreeName;
                    MyInstance.ParentNodeId = ParentNodeId;
                     MyControl.SetDataSourceFromTreeChildsWithTypeAndLabel(result);

                    OneViewConsole.Debug("SetDataSourceFromTreeChildsWithTypeAndLabel End", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithTypeAndLabel");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithTypeAndLabel", Excep);
                }
                finally {
                    _oDefaultTreeDAO = null;
                    result = null;
                }
            }

            this.SetDataSourceFromTreeChildsWithLeafType = function (ParentNodeId, ChildTypeId, TreeName, LeafType1, LeafType2) {
                try {
                    MyInstance.TreeName = TreeName;
                    OneViewConsole.Debug("SetDataSourceFromTreeChildsWithLeafType Start", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithLeafType");

                    var _oDefaultTreeDAO = new DefaultTreeDAO();
                    var result = _oDefaultTreeDAO.GetAllChildsWithLeafTypeDDL(ParentNodeId, ChildTypeId, TreeName, LeafType1, LeafType2);
                    MyControl.TreeName = TreeName;
                    MyInstance.ParentNodeId = ParentNodeId;
                    MyControl.SetDataSourceFromTreeChildsWithLeafType(result);

                    OneViewConsole.Debug("SetDataSourceFromTreeChildsWithLeafType End", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithLeafType");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.SetDataSourceFromTreeChildsWithLeafType", Excep);
                }
                finally {
                    _oDefaultTreeDAO = null;
                    result = null;
                }
            }

            ////Code for Load Test Start
            function LoadDropDown_Test() {
                try {
                    OneViewConsole.Debug("LoadDropDown_Test Start", "AutoCompleteUserControl.LoadDropDown_Test");

                    var result = [];
                    for (var itr1 = 1; itr1 <= 2500 ; itr1++) {
                        var DropDownData = { "Id": itr1, "Name": controlId + itr1, "IsDynamicElement": false }
                        result.push(DropDownData);
                    }

                    //alert(JSON.stringify(result));
                    OneViewConsole.Debug("LoadDropDown_Test End", "AutoCompleteUserControl.LoadDropDown_Test");

                    return result;
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.LoadDropDown_Test", Excep);
                }
                finally {
                    result = null;
                    DropDownData = null;
                }
            }
            ////Code for Load Test End


            this.SetDataSource = function (result) {
                try {
                    OneViewConsole.Debug("SetDataSource Start", "AutoCompleteUserControl.SetDataSource");

                        MyControl.Load(result);

                    OneViewConsole.Debug("SetDataSource End", "AutoCompleteUserControl.SetDataSource");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.SetDataSource", Excep);
                }
            }

            //{Id:11,Name:'Chicken 65'}
            this.Set = function (value) {
                try {
                    OneViewConsole.Debug("Set Start", "AutoCompleteUserControl.Set");
                    OneViewConsole.Debug("Set End", "AutoCompleteUserControl.Set");
                    return MyControl.Set(value);
                  
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.Set", Excep);
                }
            }

            this.GetSelectedValue = function () {
                try {
                    OneViewConsole.Debug("GetSelectedValue Start", "AutoCompleteUserControl.GetSelectedValue");
                    OneViewConsole.Debug("GetSelectedValue End", "AutoCompleteUserControl.GetSelectedValue");
                
                    return MyControl.GetSelectedValue();
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.GetSelectedValue", Excep);
                }
            }

            this.GetSelectedText = function () {
                try {
                    OneViewConsole.Debug("GetSelectedText Start", "AutoCompleteUserControl.GetSelectedText");
                    OneViewConsole.Debug("GetSelectedText End", "AutoCompleteUserControl.GetSelectedText");
                
                    return MyControl.GetSelectedText();
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.GetSelectedText", Excep);
                }
            }

            this.OnSelect = function (value) {
                try {
                    OneViewConsole.Debug("OnSelect Start", "AutoCompleteUserControl.OnSelect");
                
                        MyControl.OnSelect(value);

                    OneViewConsole.Debug("OnSelect End", "AutoCompleteUserControl.OnSelect");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.OnSelect", Excep);
                }
            }

            this.OnClick = function (value) {
                try {
                    OneViewConsole.Debug("OnClick Start", "AutoCompleteUserControl.OnClick");
                
                    // MyControl.OnSelect(value);
                    OneViewConsole.Debug("OnClick End", "AutoCompleteUserControl.OnClick");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.OnClick", Excep);
                }
            }

            this.OnChange = function () {
                try {
                    OneViewConsole.Debug("OnChange Start", "AutoCompleteUserControl.OnChange");
               
                        MyControl.OnChange();

                    OneViewConsole.Debug("OnChange End", "AutoCompleteUserControl.OnChange");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.OnChange", Excep);
                }
            }

            this.RenderControl = function (ContentPlaceHolderId) {
                try {
                    OneViewConsole.Debug("RenderControl Start", "AutoCompleteUserControl.RenderControl");

                        MyControl.RenderControl(ContentPlaceHolderId);

                    OneViewConsole.Debug("RenderControl End", "AutoCompleteUserControl.RenderControl");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.RenderControl", Excep);
                }
            }

            this.ClearFilterParmeter = function () {
                try {
                    OneViewConsole.Debug("ClearFilterParmeter Start", "AutoCompleteUserControl.ClearFilterParmeter");

                        MyControl.ClearFilterParmeter();

                    OneViewConsole.Debug("ClearFilterParmeter End", "AutoCompleteUserControl.ClearFilterParmeter");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.ClearFilterParmeter", Excep);
                }
            }

        }
        else {
            alert('following elements are mandatory \'scope, DataSourceModelName, SearchElementModelName,DBElementType\'');
        }
        OneViewConsole.Debug("AutoCompleteUserControl End", "AutoCompleteUserControl");
    }

    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl", Excep);
    }
}

function OneViewAdvAutoCompleteUserControl()
{
    var MyInstance=this;
    this.DataSourceModelName;

    //this.SearchElementModelName = 'modelAutoComplteteSearch';
    this.DisplayElementModelName;

    this.HtmlContainerId = 'DivAutocompletelist';
    this.ControlId = '';

    this.Type = 'OneViewAdvAutoCompleteUserControl';
    this.SelectedValue;
    this.SelectedText;
    this.IsDynamicElement = false;
    this.IsDynamicElementCreationEnabled;
    this.TreeName = '';

    this.MinCharToSearch = 1;
    //-1 for unlimit
    this.MaxDataToDisplay = 500;
    this.oScope;
    this.xlatService;
    this.ToasterService;
    var Msg_minCharToSearch = '';
    //set global message for min char to search
   
    ///when ever change the value(selected inndex change),this job will fire
    //here can configure,whcih textbox need to refresh, which colum need to set
    //{ Type:'DefaultTextboxRefreshJob',ControlId:'txtno',ColumnNames:[],Seperater:'-' }
    this.DefaultRefreshJobs = [];

    this.LoadTypeArray;

    this.SelectedIndexChangedEventHandler;

    this.NCAutocompleteEvent;
    this.AttributeNodeId = '';

   // var CompleteResultArray = [];
    this.LoadFromTreeChildsWithType = function (result) {
        try {
            OneViewConsole.Debug("LoadFromTreeChildsWithType Start", "OneViewAdvAutoCompleteUserControl.LoadFromTreeChildsWithType");

                // MyInstance[MyInstance.DataSourceModelName] = result;
                alert('Not implemented exception , LoadFromTreeChildsWithType');

           OneViewConsole.Debug("LoadFromTreeChildsWithType End", "OneViewAdvAutoCompleteUserControl.LoadFromTreeChildsWithType");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.LoadFromTreeChildsWithType", Excep);
        }
    }
    
    //{ 'ControlId': ControlId, 'ControlName': ControlName }
    //this event call from displaytextbox click event
    this.Init = function (reqParm)
    {
        try {
            OneViewConsole.Debug("Init Start", "OneViewAdvAutoCompleteUserControl.Init");

                var ControlId = reqParm.ControlId;
                var ControlName = reqParm.ControlName;
                var DATTypeId = reqParm.DATTypeId;
                var AttributeNodeId = reqParm.AttributeNodeId;
                var parm = [{ key: 'no', value: MyInstance.MinCharToSearch }];
                Msg_minCharToSearch = MyInstance.xlatService.xlat('EnterMinChar', parm);

                //clear the control
                document.getElementById('txtAutoCompleteSearch').value = '';
              
                //set ControlId in SearchControlId attribute (its for hand shaking between pop up and controller)
                document.getElementById('txtAutoCompleteSearch').setAttribute("SearchControlId", ControlId);
                document.getElementById('txtAutoCompleteSearch').setAttribute("DATTypeId", DATTypeId);
                document.getElementById('txtAutoCompleteSearch').setAttribute("AttributeNodeId", AttributeNodeId);

                //set Label in popup
                var divAttributeId = document.getElementById('divAttributeId');
                divAttributeId.innerHTML = MyInstance.xlatService.xlat(ControlName);

                var ElementName = GetSearchElementName();
               
                document.getElementById('txtAutoCompleteSearch').value = ElementName;

                //Load data
                if (ElementName != "") { //Load data with ElementName
                    MyInstance.Search();
                }
                else {
                    MyInstance.Load();
                }

            OneViewConsole.Debug("Init End", "OneViewAdvAutoCompleteUserControl.Init");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.Init", Excep);
        }
        finally {
            ControlId = null;
            ControlName = null;
            DATTypeId = null;
            parm = null;
            divAttributeId = null;
            ElementName = null;
        }
    }



    this.ClearFilterParmeter = function ()
    {
        try {
            OneViewConsole.Debug("ClearFilterParmeter Start", "OneViewAdvAutoCompleteUserControl.ClearFilterParmeter");

                //clear the textbox
                document.getElementById('txtAutoCompleteSearch').value = '';
                //Load the contentPart
                MyInstance.Load();

            OneViewConsole.Debug("ClearFilterParmeter End", "OneViewAdvAutoCompleteUserControl.ClearFilterParmeter");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("OneViewAdvAutoCompleteUserControl", "OneViewAdvAutoCompleteUserControl.ClearFilterParmeter", Excep);
        }
    }

    //this.ClearAndSetContentMessage = function () {
    //    if (MyInstance.MinCharToSearch == 0) {
    //        MyInstance.Load();
    //    }
    //    else {
    //        MyInstance.Search();
    //    }
    //}

    var ContentMessage = function (Message) {
        try {
            OneViewConsole.Debug("ContentMessage Start", "OneViewAdvAutoCompleteUserControl.ContentMessage");

                var html = '';
                var domHtmlContainerObj = document.getElementById(MyInstance.HtmlContainerId);
                domHtmlContainerObj.innerHTML = html;
                html += '<Span>' + Message + '</Span>';
                domHtmlContainerObj.innerHTML = html;

            OneViewConsole.Debug("ContentMessage End", "OneViewAdvAutoCompleteUserControl.ContentMessage");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.ContentMessage", Excep);
        }
        finally {
            html = null;
            domHtmlContainerObj = null;
        }
    }

    this.SetDataSourceFromTreeChildsWithType = function (result) {
        try {
            OneViewConsole.Debug("SetDataSourceFromTreeChildsWithType Start", "OneViewAdvAutoCompleteUserControl.SetDataSourceFromTreeChildsWithType");

            //alert('DataSourceModelName :' + MyInstance.DataSourceModelName);
           // alert('result :' + JSON.stringify(result));

                MyInstance.oScope[MyInstance.DataSourceModelName] = [];
                MyInstance.oScope[MyInstance.DataSourceModelName] = result;

            OneViewConsole.Debug("SetDataSourceFromTreeChildsWithType End", "OneViewAdvAutoCompleteUserControl.SetDataSourceFromTreeChildsWithType");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.SetDataSourceFromTreeChildsWithType", Excep);
        }
    }

    this.SetDataSourceFromTreeChildsWithTypeAndLabel = function (result) {
        try {
            OneViewConsole.Debug("SetDataSourceFromTreeChildsWithTypeAndLabel Start", "OneViewAdvAutoCompleteUserControl.SetDataSourceFromTreeChildsWithTypeAndLabel");

            MyInstance.oScope[MyInstance.DataSourceModelName] = [];
            MyInstance.oScope[MyInstance.DataSourceModelName] = result;

            OneViewConsole.Debug("SetDataSourceFromTreeChildsWithTypeAndLabel End", "OneViewAdvAutoCompleteUserControl.SetDataSourceFromTreeChildsWithTypeAndLabel");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.SetDataSourceFromTreeChildsWithTypeAndLabel", Excep);
        }
    }

    this.SetDataSourceFromTreeChildsWithLeafType = function (result) {
        try {
            OneViewConsole.Debug("SetDataSourceFromTreeChildsWithLeafType Start", "OneViewAdvAutoCompleteUserControl.SetDataSourceFromTreeChildsWithLeafType");

            MyInstance.oScope[MyInstance.DataSourceModelName] = [];
            MyInstance.oScope[MyInstance.DataSourceModelName] = result;

            OneViewConsole.Debug("SetDataSourceFromTreeChildsWithLeafType End", "OneViewAdvAutoCompleteUserControl.SetDataSourceFromTreeChildsWithLeafType");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.SetDataSourceFromTreeChildsWithLeafType", Excep);
        }
    }

    this.SetDataSource = function (result) {
        try {
            OneViewConsole.Debug("SetDataSource Start", "OneViewAdvAutoCompleteUserControl.SetDataSource");

                MyInstance.oScope[MyInstance.DataSourceModelName] = result;

            OneViewConsole.Debug("SetDataSource End", "OneViewAdvAutoCompleteUserControl.SetDataSource");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.SetDataSource", Excep);
        }
    }

    //Load complete data
    //before this operation SetDataSource,must call
    this.Load = function () {
        try {
            OneViewConsole.Debug("Load Start", "OneViewAdvAutoCompleteUserControl.Load");

                ClearHtmlContainer();
                if (MyInstance.MinCharToSearch == 0) {
                    var CompleteResultArray = MyInstance.oScope[MyInstance.DataSourceModelName];
                    BindData(CompleteResultArray);
                }
                else
                    ContentMessage(Msg_minCharToSearch);

            OneViewConsole.Debug("Load End", "OneViewAdvAutoCompleteUserControl.Load");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.Load", Excep);
        }
        finally {
            CompleteResultArray = null;
        }
    }

    //Load filtered data
    //before this operation SetDataSource,must call
    this.Search = function () {
        try {
            OneViewConsole.Debug("Search Start", "OneViewAdvAutoCompleteUserControl.Search");

                var FilterParm = document.getElementById('txtAutoCompleteSearch').value;
                if (SearchParmValidation(FilterParm)) {
                    var CompleteResultArray = MyInstance.oScope[MyInstance.DataSourceModelName];
                    //clear the searchDiv
                    ClearHtmlContainer();
                    var ResultArrayToDisplay = [];
                    FilterParm = FilterParm.toUpperCase();

                    for (var Key in CompleteResultArray) {

                        if (typeof (CompleteResultArray[Key]) != 'function') {

                            var Name = CompleteResultArray[Key].Name.toUpperCase();

                            if (Name.search(FilterParm) != -1) {

                                ResultArrayToDisplay.push({ Id: CompleteResultArray[Key].Id, Name: CompleteResultArray[Key].Name });
                            }
                        }
                    }
                    BindData(ResultArrayToDisplay);
                }

                OneViewConsole.Debug("Search End", "OneViewAdvAutoCompleteUserControl.Search");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.Search", Excep);
        }
        finally {
            FilterParm = null;
            CompleteResultArray = null;
            ResultArrayToDisplay = null;
            Name = null;
        }
    }
    
    var SearchParmValidation = function (FilterParm)
    {
        try {
            OneViewConsole.Debug("SearchParmValidation Start", "OneViewAdvAutoCompleteUserControl.SearchParmValidation");

            var IsValidParm = true;
            if (FilterParm.length < MyInstance.MinCharToSearch) {
                //ClearHtmlContainer();
                ContentMessage(Msg_minCharToSearch);
                IsValidParm = false;
            }

            OneViewConsole.Debug("SearchParmValidation End", "OneViewAdvAutoCompleteUserControl.SearchParmValidation");

            return IsValidParm;         
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.SearchParmValidation", Excep);
        }
        finally {
            IsValidParm = null;
        }
    }

    var BindDataOLD = function (ResultArrayToDisplay) {
        try {
            OneViewConsole.Debug("BindData Start", "OneViewAdvAutoCompleteUserControl.BindData");

                var html = '';
                scope = MyInstance.oScope;
                if (ResultArrayToDisplay.length > 0) {
                    for (var i = 0; i < ResultArrayToDisplay.length; i++) {
                        if (MyInstance.MaxDataToDisplay == -1 || i < MyInstance.MaxDataToDisplay)
                            html += '<a class="item"  id="' + ResultArrayToDisplay[i].Id + '" type="' + ResultArrayToDisplay[i].Name + '" name=' + MyInstance.ControlId + ' onclick="OneViewAdvAutoCompleteOnclick(this)"  >' + ResultArrayToDisplay[i].Name + '</a>';
                        else {
                            var dataPending = ResultArrayToDisplay.length - MyInstance.MaxDataToDisplay;
                            html += '<a class="item red" > Maximum filed length exceeded, use filter parameter to load more ( Remaining fileds :' + dataPending + ' </a>';
                            break;
                        }
                    }
                    var domHtmlContainerObj = document.getElementById(MyInstance.HtmlContainerId);
                    domHtmlContainerObj.innerHTML = html;
                }
                else {
                    ContentMessage("No Records found");
                }

            OneViewConsole.Debug("BindData End", "OneViewAdvAutoCompleteUserControl.BindData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.BindData", Excep);
        }
        finally {
            html = null;
            domHtmlContainerObj = null;
        }

    }



    var BindData = function (ResultArrayToDisplay) {
        try {
            OneViewConsole.Debug("BindData Start", "OneViewAdvAutoCompleteUserControl.BindData");
            var html = '';
            scope = MyInstance.oScope;
            if (ResultArrayToDisplay.length > 0) {
                for (var i = 0; i < ResultArrayToDisplay.length; i++) {
                    if (MyInstance.MaxDataToDisplay == -1 || i < MyInstance.MaxDataToDisplay)
                        html += '<a class="item"  id="' + ResultArrayToDisplay[i].Id + '" type="' + ResultArrayToDisplay[i].Name + '" name=' + MyInstance.ControlId + ' AttributeNodeId="' + MyInstance.AttributeNodeId + '" onclick=OneViewAdvAutoCompleteEvent(this)>' + ResultArrayToDisplay[i].Name + '</a>';
                    else {
                        var dataPending = ResultArrayToDisplay.length - MyInstance.MaxDataToDisplay;
                        html += '<a class="item red" > Maximum filed length exceeded, use filter parameter to load more ( Remaining fileds :' + dataPending + ' </a>';
                        break;
                    }
                }
                var domHtmlContainerObj = document.getElementById(MyInstance.HtmlContainerId);
                domHtmlContainerObj.innerHTML = html;
            }
            else {
                ContentMessage("No Records found");
            }

            OneViewConsole.Debug("BindData End", "OneViewAdvAutoCompleteUserControl.BindData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.BindData", Excep);
        }
        finally {
            html = null;
            domHtmlContainerObj = null;
        }

    }



    var ClearHtmlContainer = function ()
    {
        try {
            OneViewConsole.Debug("ClearHtmlContainer Start", "OneViewAdvAutoCompleteUserControl.ClearHtmlContainer");

                var divAutoComplete = document.getElementById("DivAutocompletelist");
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

    //clear selected text and selected value
    this.Clear = function () {
        try {
            OneViewConsole.Debug("Clear Start", "OneViewAdvAutoCompleteUserControl.Clear");

                //var divAutoComplete = document.getElementById("DivAutocompletelist");
                //divAutoComplete.innerHTML = '';
                MyInstance.Set({ "Id": '', "Name": '', "IsDynamicElement": false });

            OneViewConsole.Debug("Clear End", "OneViewAdvAutoCompleteUserControl.Clear");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.Clear", Excep);
        }
    }

    this.GetSelectedValue = function () {
        try {
            OneViewConsole.Debug("GetSelectedValue Start", "OneViewAdvAutoCompleteUserControl.GetSelectedValue");
            OneViewConsole.Debug("GetSelectedValue End", "OneViewAdvAutoCompleteUserControl.GetSelectedValue");

            return MyInstance.SelectedValue;
          
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.GetSelectedValue", Excep);
        }
    }

    this.GetSelectedText = function () {
        try {
            OneViewConsole.Debug("GetSelectedText Start", "OneViewAdvAutoCompleteUserControl.GetSelectedText");
            OneViewConsole.Debug("GetSelectedText End", "OneViewAdvAutoCompleteUserControl.GetSelectedText");

            return MyInstance.SelectedText;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.GetSelectedText", Excep);
        }
    }

    this.OnSelect = function (value) {
        try {
            OneViewConsole.Debug("OnSelect Start", "OneViewAdvAutoCompleteUserControl.OnSelect");        

                MyInstance.Set(value);

            OneViewConsole.Debug("OnSelect End", "OneViewAdvAutoCompleteUserControl.OnSelect");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.OnSelect", Excep);
        }
    }

    this.AddElement = function (element) {
        try {
            OneViewConsole.Debug("AddElement Start", "OneViewAdvAutoCompleteUserControl.AddElement");
           
            if (MyInstance.oScope[MyInstance.DataSourceModelName] != undefined)
                MyInstance.oScope[MyInstance.DataSourceModelName].push(element);

            OneViewConsole.Debug("AddElement End", "OneViewAdvAutoCompleteUserControl.AddElement");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.AddElement", Excep);
        }
    }

    //{Id:1,Name:'chicken'}
    this.Set = function (value) {
        try {
            OneViewConsole.Debug("Set Start", "OneViewAdvAutoCompleteUserControl.Set");

                var OldValue = { Id: MyInstance.SelectedValue, Name: MyInstance.SelectedText };
                if (value.IsDynamicElement == false || (value.IsDynamicElement == true && MyInstance.IsDynamicElementCreationEnabled == true)) {

                    value.Name = removeSpecialCharacter(value.Name);
                    MyInstance.SelectedValue = value.Id;
                    MyInstance.SelectedText = value.Name;
                    MyInstance.IsDynamicElement = value.IsDynamicElement;
                    //set value in search textbox
                    SetSearchElementName(value.Name);
                }
                else {
                    ///// Need Todo(22-08-2014):  Toaster pop-up is not working without line first and timer
                    ////Need to check pop ,As per discussion with Harshil , let it be for time being due to time constraints
                    ////Need to change
                    ///Commented the Pop-up with timeout , noe toaster is coming properly without timeout - Date :22-09-2014 
                    alert(MyInstance.xlatService.xlat('Title_Notification') + " : " + MyInstance.xlatService.xlat('DynamicCreationNotEnabled')); ////Line-1
                    //setTimeout(function () { MyInstance.ToasterService.pop('custom', MyInstance.xlatService.xlat('Title_Notification'), MyInstance.xlatService.xlat('DynamicCreationNotEnabled')) }, 1000);
                }
                
                //alert('value.Id ' + value.Id);
                if (value.Id != undefined && value.Id!='' && value.Id!=0 && value.Id!=null)
                    DoDefaultRefreshJobs(value.Id);


                if (MyInstance.SelectedIndexChangedEventHandler != undefined) {
                    if (OldValue.Id != value.Id && OldValue.Name != value.Name) {
                        var EventArgs = {};
                        EventArgs.ControlId = MyInstance.ControlId;
                        EventArgs.NewValue = value;
                        EventArgs.OldValue = OldValue;
                        MyInstance.SelectedIndexChangedEventHandler(EventArgs);
                    }
                }

            OneViewConsole.Debug("Set End", "OneViewAdvAutoCompleteUserControl.Set");
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.Set", Excep);
        }
        finally {
            OldValue = null;
            EventArgs = null;
        }
    }

    var DoDefaultRefreshJobs = function (NodeId)
    {
        if (MyInstance.DefaultRefreshJobs != '' && MyInstance.DefaultRefreshJobs.length > 0) {
            for (var i = 0; i < MyInstance.DefaultRefreshJobs.length; i++) {
                var oDefaultRefreshJob = MyInstance.DefaultRefreshJobs[i];

                //{ Type:'DefaultTextboxRefreshJob',ControlId:'txtno',ColumnNames:[],Separator:'-' }
                if (oDefaultRefreshJob.Type == 'DefaultTextboxRefreshJob')
                {
                    DefaultTextboxRefreshJob(oDefaultRefreshJob, NodeId);
                }
            }
        }
    }
    var DefaultTextboxRefreshJob_OLD = function (DefaultTextboxRefreshJob,NodeId)
    {
        try {

            var value = '';
            if (MyInstance.TreeName == _TableNamesEnum.OrganizationAssetsNode) {
                var qry = "select ChildDbElementId from OrganizationAssetsNode where ServerId = " + NodeId;
                //alert("qry  :  " + qry);

                var oNodes = window.OneViewSqlite.excecuteSqlReader(qry);
                oNodes = JSON.parse(oNodes);
                //alert("oNodes  :  " + oNodes);
                qry = '';
                if (oNodes != null && oNodes != undefined && oNodes[0] != null && oNodes[0] != undefined) {
                    var MasterServerId = oNodes[0].ChildDbElementId;
                    //alert(MasterServerId);

                    var qry = "select ";
                    for (var i = 0; i < DefaultTextboxRefreshJob.ColumnNames.length; i++) {

                        qry = qry + DefaultTextboxRefreshJob.ColumnNames;
                        //if (DefaultTextboxRefreshJob.ColumnNames.length-1 != i) {
                        if (DefaultTextboxRefreshJob.ColumnNames.length >1) {
                            //qry = qry + ", '-' ,";
                            //qry = qry + " , ";
                            alert('not impemented exception on DefaultTextboxRefreshJob,: mutiple column ');
                        }
                    }
                    qry = qry + " as value from RcoMasterEntity where ServerId= " + MasterServerId;

                    //alert("qry 2  :  " + qry);
                    var oRcoMasterEntitylst = window.OneViewSqlite.excecuteSqlReader(qry);
                    oRcoMasterEntitylst = JSON.parse(oRcoMasterEntitylst);
                   // alert("oRcoMasterEntitylst : "+JSON.stringify(oRcoMasterEntitylst))
                    if (oRcoMasterEntitylst != null && oRcoMasterEntitylst != undefined && oRcoMasterEntitylst[0] != null && oRcoMasterEntitylst[0] != undefined) {
                        value = oRcoMasterEntitylst[0].value;
                        //alert('value :' + value);
                    }
                }
                //OneViewConsole.DataLog("Response from db : " + Nodes, "AutoCompleteUserControl.SetDataSourceWithObservationType");
            }

            //alert(DefaultTextboxRefreshJob.ControlId);
            //alert(value);
            MyInstance.oScope['NewDCModel'][DefaultTextboxRefreshJob.ControlId] = value;
            MyInstance.oScope.$apply();
        }
        catch (exec)
        {
            //alert("DefaultTextboxRefreshJob, Exception :" + exec);
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.DefaultTextboxRefreshJob", Excep);
        }

    }


    var DefaultTextboxRefreshJob = function (DefaultTextboxRefreshJob, NodeId) {
        try {

            var value = '';
            if (MyInstance.TreeName == _TableNamesEnum.OrganizationAssetsNode) {
                // alert("NodeId:" + NodeId);
                var qry = "select * from OrganizationAssetsNode where ServerId = " + NodeId;
                //alert("qry  :  " + qry);

                var oNodes = window.OneViewSqlite.excecuteSqlReader(qry);
                oNodes = JSON.parse(oNodes);

                qry = '';
                if (oNodes != null && oNodes != undefined && oNodes[0] != null && oNodes[0] != undefined) {

                    var MasterServerId = oNodes[0]["ChildDbElementId"];

                    var qry = "select * from RcoMasterEntity where ServerId= " + MasterServerId;



                    // alert("qry 2  :  " + qry);
                    var oRcoMasterEntitylst = window.OneViewSqlite.excecuteSqlReader(qry);
                    oRcoMasterEntitylst = JSON.parse(oRcoMasterEntitylst);

                    var oLabelEntitylst;

                    for (var i = 0; i < DefaultTextboxRefreshJob.ColumnNames.length; i++) {
                        var ColumnName = DefaultTextboxRefreshJob.ColumnNames[i];

                        if (oRcoMasterEntitylst != null && oRcoMasterEntitylst != undefined && oRcoMasterEntitylst[0] != null && oRcoMasterEntitylst[0] != undefined) {

                            if (ColumnName == "LabelId1" || ColumnName == "LabelId2" || ColumnName == "LabelId3" || ColumnName == "LabelId4" || ColumnName == "LabelId5") {

                                var LabelValue = oNodes[0][ColumnName];
                                var qryLabel = "select Name  from  Label where ServerId='" + LabelValue + "'";
                                oLabelEntitylst = window.OneViewSqlite.excecuteSqlReader(qryLabel);
                                oLabelEntitylst = JSON.parse(oLabelEntitylst);
                                //alert("oLabelEntitylst : " + JSON.stringify(oLabelEntitylst));

                                if (oLabelEntitylst != null && oLabelEntitylst != undefined && oLabelEntitylst[0] != null && oLabelEntitylst[0] != undefined) {
                                    if (value == '') {
                                        value = oLabelEntitylst[0]["Name"];;
                                    }
                                    else {
                                        value = value + "_" + oLabelEntitylst[0]["Name"];;
                                    }
                                }

                            }
                            else {

                                if (value == '') {
                                    value = oRcoMasterEntitylst[0][ColumnName];
                                }
                                else {
                                    value = value + "_" + oRcoMasterEntitylst[0][ColumnName];
                                }
                            }
                        }
                    }

                    //alert("oRcoMasterEntitylst : " + JSON.stringify(oRcoMasterEntitylst))

                }
                //OneViewConsole.DataLog("Response from db : " + Nodes, "AutoCompleteUserControl.SetDataSourceWithObservationType");
            }

            //alert(DefaultTextboxRefreshJob.ControlId);
            // alert("value11111" + value);
            MyInstance.oScope['NewDCModel'][DefaultTextboxRefreshJob.ControlId] = value;
            MyInstance.oScope.$apply();
        }
        catch (exec) {
            alert("DefaultTextboxRefreshJob, Exception :" + exec);
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.DefaultTextboxRefreshJob", Excep);
        }

    }

    var SetSearchElementName = function (value) {
        try {
            OneViewConsole.Debug("SetSearchElementName Start", "OneViewAdvAutoCompleteUserControl.SetSearchElementName");

                var res = MyInstance.DisplayElementModelName.split('.');
                if (res.length == 1) {
                    MyInstance.oScope[MyInstance.DisplayElementModelName] = value;
                }
                else if (res.length == 2) {
                    MyInstance.oScope[res[0]][res[1]] = value;
                }
                else
                    alert('not implemented exception');
                MyInstance.oScope.$apply();

           OneViewConsole.Debug("SetSearchElementName End", "OneViewAdvAutoCompleteUserControl.SetSearchElementName");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.SetSearchElementName", Excep);
        }
        finally {
            res = null;
        }
    }

    this.OnChange = function () {
        try {
            OneViewConsole.Debug("OnChange Start", "OneViewAdvAutoCompleteUserControl.OnChange");

                var SearchElementName = GetSearchElementName();
                if (SearchElementName != MyInstance.SelectedText) {
                    MyInstance.SelectedValue = 0;
                    MyInstance.SelectedText = SearchElementName;
                    MyInstance.IsDynamicElement = false;
                }

           OneViewConsole.Debug("OnChange End", "OneViewAdvAutoCompleteUserControl.OnChange");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAutoCompleteUserControl.OnChange", Excep);
        }
        finally {
            SearchElementName = null;
        }
    }

    var GetSearchElementName = function () {
        try {
            OneViewConsole.Debug("GetSearchElementName Start", "AutoCompleteUserControl.GetSearchElementName");

                var res = MyInstance.DisplayElementModelName.split('.');
                if (res.length == 1)
                    return MyInstance.oScope[MyInstance.DisplayElementModelName];
                else if (res.length == 2) {
                    return MyInstance.oScope[res[0]][res[1]];
                }
                else
                    alert('not implemented exception');

                OneViewConsole.Debug("GetSearchElementName End", "AutoCompleteUserControl.GetSearchElementName");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteUserControl.GetSearchElementName", Excep);
        }
        finally {
            res = null;
        }
    }

    //*************** public methods OneViewAdvAutoCompleteUserControl  Start*******************

    //event call from preseneter html of each control
    //function AutoCompleteStartEvent(ControlId) {
    //    //show the popup
    //    alert(ControlId);
    //    scope.modal.show();
    //    document.getElementById('txtAutoCompleteSearch').value = '';
    //    //set ControlId in SearchControlId attribute (its for hand shaking between pop up and controller)
    //    document.getElementById('txtAutoCompleteSearch').setAttribute("SearchControlId", ControlId);
    //    //Load data
    //    scope[ControlId].Search();
    //}
    //event call from elementes in container html(where all elements load to s
    //function OneViewAdvAutoCompleteOnclick(Id, Name, ControlId) {

    //    var Result = { "Id": Id, "Name": Name, "IsDynamicElement": false };
    //    scope[ControlId].Set(Result);
    //    scope.modal.hide();
    //}

    //*************** public methods OneViewAdvAutoCompleteUserControl End*******************
}


function OneViewAdvAutoCompleteOnclick(EventArgs) {

    try {
        OneViewConsole.Debug("OneViewAdvAutoCompleteOnclick Start", "OneViewAdvAutoCompleteUserControl.OneViewAdvAutoCompleteOnclick");
       // alert(EventArgs.attributes['Id'].value + "," + EventArgs.attributes['type'].value)
       // alert('autocomplete' + EventArgs.attributes['Name'].value);

            var Result = { "Id": EventArgs.attributes['Id'].value, "Name": EventArgs.attributes['type'].value, "IsDynamicElement": false };
            scope[EventArgs.attributes['Name'].value].Set(Result);
            // scope.$apply();
            //ionicBackdrop.release();
        // document.getElementById('divAutocomplatePopUp').className = 'modal hide';
           // alert('before close');
            Close();
            ////Check if any event is there or anything is there to do/load
            //alert('here')
            //if (scope[controlId].LoadTypeArray !=null)
            //{
            //    alert('contains')
            //}

        OneViewConsole.Debug("OneViewAdvAutoCompleteOnclick End", "OneViewAdvAutoCompleteUserControl.OneViewAdvAutoCompleteOnclick");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Event", "OneViewAdvAutoCompleteUserControl.OneViewAdvAutoCompleteOnclick", Excep);
    }
    finally {
        Result = null;
    }

}

function AutoCompleteStartEventOLD(ControlId, ControlName,DATTypeId) {
    try {
        OneViewConsole.Debug("AutoCompleteStartEvent Start", "AutoCompleteUserControl.AutoCompleteStartEvent");

        AutoCompleteGenerateHTML();
            //show the popup
        //document.getElementById('divAutocomplatePopUp').className = 'modal show';
       oSnapRemote.open("right");


        //Need to change : Have to remove the hard code id (txtAutoCompleteSearch)
        document.getElementById("txtAutoCompleteSearch").focus();
            scope[ControlId].Init({ 'ControlId': ControlId, 'ControlName': ControlName, 'DATTypeId': DATTypeId });

        OneViewConsole.Debug("AutoCompleteStartEvent End", "AutoCompleteUserControl.AutoCompleteStartEvent");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Event", "AutoCompleteUserControl.AutoCompleteStartEvent", Excep);
    }
}

function AutoCompleteStartEvent(ControlId, ControlName, DATTypeId, AttributeNodeId, IsNc) {
    try {
        OneViewConsole.Debug("AutoCompleteStartEvent Start", "AutoCompleteUserControl.AutoCompleteStartEvent");

        AutoCompleteGenerateHTML(IsNc);
        //show the popup
        //document.getElementById('divAutocomplatePopUp').className = 'modal show';
        oSnapRemote.open("right");


        //Need to change : Have to remove the hard code id (txtAutoCompleteSearch)
        document.getElementById("txtAutoCompleteSearch").focus();
        scope[ControlId].Init({ 'ControlId': ControlId, 'ControlName': ControlName, 'DATTypeId': DATTypeId, 'AttributeNodeId': AttributeNodeId });

        OneViewConsole.Debug("AutoCompleteStartEvent End", "AutoCompleteUserControl.AutoCompleteStartEvent");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Event", "AutoCompleteUserControl.AutoCompleteStartEvent", Excep);
    }
}


var AutoCompleteSearchChangelastTimeOutId = null;

function AutoCompleteSearchChangeEvent() {
    try {      
        OneViewConsole.Debug("AutoCompleteSearchChangeEvent Start", "AutoCompleteUserControl.AutoCompleteSearchChangeEvent");

            var ControlId = document.getElementById('txtAutoCompleteSearch').getAttribute("SearchControlId");
            if (AutoCompleteSearchChangelastTimeOutId != null)
                window.clearTimeout(AutoCompleteSearchChangelastTimeOutId);
            AutoCompleteSearchChangelastTimeOutId = window.setTimeout(function () { scope[ControlId].Search() }, 1000);

        OneViewConsole.Debug("AutoCompleteSearchChangeEvent End", "AutoCompleteUserControl.AutoCompleteSearchChangeEvent");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Event", "AutoCompleteUserControl.AutoCompleteSearchChangeEvent", Excep);
    }
    ////Dont add finally block here
}

function AutoCompleteClose() {
    try {
        OneViewConsole.Debug("AutoCompleteClose Start", "AutoCompleteUserControl.AutoCompleteClose");

            var ControlId = document.getElementById('txtAutoCompleteSearch').getAttribute("SearchControlId");
            var DATTypeId = document.getElementById('txtAutoCompleteSearch').getAttribute("DATTypeId");
            var value = document.getElementById('txtAutoCompleteSearch').value;
            var Result = ''
            value = value.trim();
            if (value != "") {               
                if (scope[ControlId].DynamicElementCreationEnabledStatus == false) {                   
                    Result = { "Id": 0, "Name": value, "IsDynamicElement": true };
                }
                else {                
                   Result = CheckValueExistOrNot(DATTypeId, value, scope[ControlId].ParentNodeId)
                }
                //Result = { "Id": 0, "Name": value, "IsDynamicElement": true };
                scope[ControlId].Set(Result);
            }
            else {
                Result = { "Id": '', "Name": '', "IsDynamicElement": false };
                scope[ControlId].Set(Result);
            }

            //clearTimeout(AutoCompleteSearchChangelastTimeOutId);

            var divAutoComplete = document.getElementById("DivAutocompletelist");
            divAutoComplete.innerHTML = '';
          ///  ionicBackdrop.release();
        // document.getElementById('divAutocomplatePopUp').className = 'modal hide';

        oSnapRemote.toggle("right");
            //$scope.modal.hide();
            //$scope.modal.remove();

        OneViewConsole.Debug("AutoCompleteClose End", "AutoCompleteUserControl.AutoCompleteClose");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Event", "AutoCompleteUserControl.AutoCompleteClose", Excep);
    }
    finally {
        ControlId = null;
        DATTypeId = null;
        value = null;
        Result = null;
        divAutoComplete = null;
    }
}

function ClearText() {
    try {
        OneViewConsole.Debug("ClearText Start", "AutoCompleteUserControl.ClearText");
       
        var ControlId = document.getElementById('txtAutoCompleteSearch').getAttribute("SearchControlId");
      
            scope[ControlId].ClearFilterParmeter();

        OneViewConsole.Debug("ClearText End", "AutoCompleteUserControl.ClearText");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Event", "AutoCompleteUserControl.ClearText", Excep);
    }
    finally {
        ControlId = null;
    }
}

function Close()
{
    try {
        OneViewConsole.Debug("Close Start", "AutoCompleteUserControl.Close");
        var divAutoComplete = document.getElementById("DivAutocompletelist");
        divAutoComplete.innerHTML = '';
      //  ionicBackdrop.release();
        //   document.getElementById('divAutocomplatePopUp').className = 'modal hide';
        oSnapRemote.toggle("right");

        OneViewConsole.Debug("Close End", "AutoCompleteUserControl.Close");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Event", "AutoCompleteUserControl.ClearText", Excep);
    }
    finally {
        divAutoComplete = null;
    }
}


function CheckValueExistOrNot(DATTypeId, value,ParentNodeId) {
    try {
        OneViewConsole.Debug("CheckValueExistOrNot Start", "AutoCompleteUserControl.CheckValueExistOrNot");

            var Exist = ''
            var _oDefaultTreeDAO = new DefaultTreeDAO();
            var _ParentNodeId=OneViewSessionStorage.Get("DcPlaceId");
            if (ParentNodeId != undefined && ParentNodeId != "") {
                _ParentNodeId = ParentNodeId;
            }

            var result = _oDefaultTreeDAO.GetAllChildDbElementNameWithType(_ParentNodeId, DATTypeId, _TableNamesEnum.OrganizationAssetsNode, value);
            if (result.length > 0) {
                Exist = { "Id": result[0].Id, "Name": value, "IsDynamicElement": false };
            }
            else {
                Exist = { "Id": 0, "Name": value, "IsDynamicElement": true };
            }

       OneViewConsole.Debug("CheckValueExistOrNot End", "AutoCompleteUserControl.CheckValueExistOrNot");

        return Exist;
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Event", "AutoCompleteUserControl.CheckValueExistOrNot", Excep);
    }
    finally {
        Exist = null;
        _oDefaultTreeDAO = null;
        result = null;
    }

}


function AutoCompleteGenerateHTMLOLD() {
    try {
        OneViewConsole.Debug("GenerateHTML Start", "AutoCompleteHTMLOperation.GenerateHTML");     
        AutoCompleteDestroyHTML();
        var DynamicHTML = '<div class="field-item"> ' +
            '<label><span id="divAttributeId"></span>' +
               ' <input id="txtAutoCompleteSearch" type="text" searchcontrolid="" dattypeid="" onkeydown="AutoCompleteSearchChangeEvent()" />' +
            '</label>' +
            '</div>' +
            '<div class="right-panel-content has-autocomplete has-footer list" id="DivAutocompletelist">' +
            '</div>' +
            '<div class="bar bar-footer no-padding">' +
                '<div class="row">' +
                   ' <div class="col"><a class="button button-block button-clear" onclick="ClearText()">Clear</a></div>' +
                   ' <div class="col"><a class="button button-block button-clear" onclick="AutoCompleteClose()">Add</a></div>' +
                '</div>' +
        '</div>';
        document.getElementById('divAutocomplatePopUp').innerHTML = DynamicHTML;

        OneViewConsole.Debug("GenerateHTML End", "AutoCompleteHTMLOperation.GenerateHTML");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteHTMLOperation.GenerateHTML", Excep);
    }
}

function AutoCompleteGenerateHTML() {
    try {
        OneViewConsole.Debug("GenerateHTML Start", "AutoCompleteHTMLOperation.GenerateHTML");
        AutoCompleteDestroyHTML();
        var DynamicHTML = '<div class="field-item"> ' +
            '<label><span id="divAttributeId"></span>' +
               ' <input id="txtAutoCompleteSearch" type="text" searchcontrolid="" dattypeid="" AttributeNodeId="" onkeydown="AutoCompleteSearchChangeEvent()" />' +
            '</label>' +
            '</div>' +
            '<div class="right-panel-content has-autocomplete has-footer list" id="DivAutocompletelist">' +
            '</div>' +
            '<div class="bar bar-footer no-padding">' +
                '<div class="row">' +
                   ' <div class="col"><a class="button button-block button-clear" onclick="ClearText()">' + OneViewGlobalization[OneViewGlobalcurrentLanguage].Clear + '</a></div>' +
                   ' <div class="col"><a class="button button-block button-clear" onclick="AutoCompleteCloseEvent()">' + OneViewGlobalization[OneViewGlobalcurrentLanguage].Add + '</a></div>' +
                '</div>' +
        '</div>';
        document.getElementById('divAutocomplatePopUp').innerHTML = DynamicHTML;

        OneViewConsole.Debug("GenerateHTML End", "AutoCompleteHTMLOperation.GenerateHTML");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteHTMLOperation.GenerateHTML", Excep);
    }
}

function AutoCompleteDestroyHTML()
{
    try {
        OneViewConsole.Debug("DestroyHTML Start", "AutoCompleteHTMLOperation.DestroyHTML");

        var divAutoComplete = document.getElementById("divAutocomplatePopUp");
        divAutoComplete.innerHTML = '';

        OneViewConsole.Debug("DestroyHTML End", "AutoCompleteUserControl.DestroyHTML");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "AutoCompleteHTMLOperation.DestroyHTML", Excep);
    }
}