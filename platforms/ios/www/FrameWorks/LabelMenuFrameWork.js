//Req { Scope: $scope, Compile: $compile };
var LabelList = [];
function LabelMenuFrameWork(ReqObj) {

    var MyInstance = this;
    var _oDOM = new DOM();
    var Scope = ReqObj.Scope;
    var Compile = ReqObj.Compile;

    this.Load = function (Req) {

        try {
            OneViewConsole.Debug("Load Start", "LabelMenuFrameWork.Load");

                LabelList = MyInstance.GetLabelMenu(Req);
                if (LabelList.length > 0) {
                    var ReqObj = { DivId: Req.DivId, LablelList: LabelList };
                    MyInstance.LoadHtml(ReqObj);
                }
                OneViewConsole.Debug("Load End", "LabelMenuFrameWork.Load");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.Load", Excep);
        }
        finally {
        }
    }

    this.GetLabelMenu = function(Req) {
        try {
            OneViewConsole.Debug("GetLabelMenu Start", "LabelMenuFrameWork.GetLabelMenu");

            var LablelList = [];
            /*var _oLabelMenuDAO = new LabelMenuDAO();
            var ReqObj = { LabelTypeId: Req.LabelTypeId, "LabelName": Req.LabelName };
            var Response = _oLabelMenuDAO.GetLabelByLabelType(ReqObj);

            if (Response.length > 0) {
                var i;
                var RLength=Response.length;
                for (i = 0; i < RLength; i++) {                  
                    LablelList.push({ LabelTypeId: Response[i].LabelTypeId, LabelTypeName: Response[i].LabelTypeName, LabelId: Response[i].LabelId, LabelName: Response[i].LabelName, IsSelected: 'false' });
                }
            }
        
            LablelList.push({ LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 4, LabelName: 'BreakFast', IsSelected: 'false' });
            LablelList.push({ LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 5, LabelName: 'Lunch', IsSelected: 'false' });
            LablelList.push({ LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 6, LabelName: 'Dinner', IsSelected: 'false' });
            */


            var Response = GetLabelDetailsFromAllDataListItems (Req);
            for (var Id in Response) {
                //  LablelList.push({ LabelTypeId: Response[Id].LabelTypeId, LabelTypeName: Response[Id].LabelTypeName, LabelId: Response[Id].LabelId, LabelName: Response[Id].LabelName, IsSelected: 'false' });
                LablelList.push(Response[Id]);
            }

            OneViewConsole.Debug("GetLabelMenu End", "LabelMenuFrameWork.GetLabelMenu");

            return LablelList;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.GetLabelMenu", Excep);
        }
        finally {
            LablelList = [];
        }
    }

    ////AllDataListItems :  { SrNo: 1, Id: 2, ServerId: 11, Name: 'Green Salad', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null, IsOrderbyLabel:true,
    //LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 1, LabelName: 'Breakfast' }]},
    var GetLabelDetailsFromAllDataListItems = function (Req) {
        try {
            OneViewConsole.Debug("GetLabelDetailsFromAllDataListItems Start", "LabelMenuFrameWork.GetLabelDetailsFromAllDataListItems");

            //var CurrentItemListbyLabelId = Req.CurrentItemListbyLabelId;
            var ExistingItemList = AllDataListItems;

            if (Req.CurrentDatalistItem != undefined) {              
                ExistingItemList = Req.CurrentDatalistItem;
            }

            var Labelistobj = {};          
            var ReqLabelTypeName = Req.LabelName;

            for (var i = 0; i < ExistingItemList.length; i++) {
               
                var LabelDetails = ExistingItemList[i].LabelDetails;

                for (var j = 0; j < LabelDetails.length; j++) {

                    var LabelId=LabelDetails[j].LabelId;
                    var LabelTypeName = LabelDetails[j].LabelTypeName;

                    if (LabelTypeName.toUpperCase().trim() == ReqLabelTypeName.toUpperCase().trim()) {

                        if (Labelistobj[LabelId] == undefined) {
                            Labelistobj[LabelId] = { LabelTypeId: LabelDetails[j].LabelTypeId, LabelTypeName: LabelDetails[j].LabelTypeName, LabelId: LabelDetails[j].LabelId, LabelName: LabelDetails[j].LabelName, IsSelected: 'false' }
                        }   
                       
                    }

                }

            }

            var keys = Object.keys(Labelistobj);
            keys.sort();

            OneViewConsole.Debug("GetLabelDetailsFromAllDataListItems End", "LabelMenuFrameWork.GetLabelDetailsFromAllDataListItems");

            return Labelistobj;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.GetLabelDetailsFromAllDataListItems", Excep);
        }
        finally {
        }
    }



    //Req Param :{DivId:"DivLablelMenu",LablelList: { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 4, LabelName: 'BreakFast', IsSelected: 'false' }}
    this.LoadHtml = function (Req) {
        try {
            OneViewConsole.Debug("LoadHtml Start", "LabelMenuFrameWork.LoadHtml");
           
            var LablelList = Req.LablelList;
            var DivId = Req.DivId;
            
            var i;
            var LablelListLength = LablelList.length;
            var Html = "";
            for (i = 0; i < LablelListLength; i++) {
                Html += GetHtml(LablelList[i]);               
            }

            if (Html != "") {
                var _oOneViewCompiler = new OneViewCompiler();
                _oOneViewCompiler.CompileAndApeend(Scope, Compile, Html, DivId);
            }

         
            OneViewConsole.Debug("LoadHtml Start", "LabelMenuFrameWork.LoadHtml");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.LoadHtml", Excep);
        }
        finally {
            LablelList = [];
        }
    }

    //Req Param : { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 4, LabelName: 'BreakFast', IsSelected: 'false' };
    //return MenuHtml
    var GetHtml = function (Req) {
        try {
            OneViewConsole.Debug("GetHtml Start", "LabelMenuFrameWork.GetHtml");

            var Id = Req.LabelId;            
            var LabelName = "'" + Req.LabelName + "'";

            var Html = "";
           // var DivId = 'Div' + Req.LabelName + Req.LabelId;
            //  var ITagId = 'ITag' + Req.LabelName + Req.LabelId;
            var DivId = 'Div' + Req.LabelId;
            var ITagId = 'ITag'  + Req.LabelId;

            var _oLabelName = Req.LabelName;

            var ClassName = "button button-block";
            //alert(DivId)
            if (_oLabelName.toUpperCase().trim() == "BREAKFAST") {
                ClassName += " button-energized";
            }
            else if (_oLabelName.toUpperCase().trim() == "LUNCH") {
                ClassName += " button-balanced";
            }
            else if (_oLabelName.toUpperCase().trim() == "DINNER") {
                ClassName += " button-positive";
            }
            else if (_oLabelName.toUpperCase().trim() == "ALL DAY") {
                ClassName += " button-assertive";
            }
            else if (_oLabelName.toUpperCase().trim() == "OTHERS") {
                ClassName += " button-Others";
            }

           /* Html += '<div class="col no-padding" id=' + DivId + '>';
            Html += ' <a href="javascript:void(0)" class="button button-block  button-calm" ng-click="CustomEvent(\'LabelClick\', { \'Id\': ' + Id + ' , \'LabelName\' : ' + LabelName + ' })" ><i id=' + ITagId + '></i>' + Req.LabelName + '</a>';
            Html += '</div>';*/
            Html += '<div class="col no-padding" style="margin:0;" id=' + DivId + '>';
            Html += '<a href="javascript:void(0)" class="' + ClassName + '" ng-click="CustomEvent(\'LabelClick\', { \'Id\': ' + Id + ' , \'LabelName\' : ' + LabelName + ' })" ><i id=' + ITagId + '></i>' + Req.LabelName + '</a>';
            Html += '</div>';

            return Html;

            OneViewConsole.Debug("GetHtml Start", "LabelMenuFrameWork.GetHtml");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.GetHtml", Excep);
        }
        finally {
            
        }
    }

    // var ReqObj = { LabelId: EventArgs.Id, LabelName: EventArgs.LabelName, DataSourceName: 'ControlId_14027DataSource', DcPlaceId: 2, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DATId: 220, DivId: "DivItemsId" }
    this.GetItemMenuByLabelMenu = function (Req) {
        try {
            OneViewConsole.Debug("GetItemMenuByLabelMenu Start", "LabelMenuFrameWork.GetItemMenuByLabelMenu");

            MyInstance.UpdateSelectedStatusForLabelMenu(Req);
           
            var ReqObj = { DcPlaceId: Req.DcPlaceId, Type: Req.DATId, LabelId: '-1' };
            var ReqLabelName = Req.LabelName;
            for (var i = 0; i < LabelList.length; i++) {
                var LabelName = LabelList[i].LabelName;
                //if (LabelList[i].LabelId == Req.LabelId) {
                if (LabelName.toUpperCase().trim() == ReqLabelName.toUpperCase().trim()) {
                    if (LabelList[i].IsSelected == 'true') {
                        ReqObj.LabelId = Req.LabelId;
                    }
                    break;
                }
            }

            var _oScrollListAnswerMode = new ScrollListAnswerMode(Scope);

            var _ExistingItemList = AllDataListItems;

            if (ReqObj.LabelId == '-1') {
                var ReqObjForScrollListAnswerMode = { "LabelId": ReqObj.LabelId, "OrderById": Req.OrderById,"OrderByName": Req.OrderByName };
                //_oScrollListAnswerMode.Load(Req.DataSourceName, Req.DcPlaceId, Req.AttributeNodeId, Req.ControlId, Req.DATId, Req.DivId, Compile, ReqObjForScrollListAnswerMode);
             
                if (Req.CurrentDatalistItem != undefined) {                   
                    _ExistingItemList = Req.CurrentDatalistItem;
                }
                _oScrollListAnswerMode.LoadItem({ DataSourceModelName: Req.DataSourceName, AttributeNodeId: Req.AttributeNodeId, ControlId: Req.ControlId, DivId: Req.DivId, DataList: _ExistingItemList, $compile: Compile });
            }
            else {
                var NewDataItemList = [];
                //var CurrentItemListbyLabelId = GetDataListItems(Req);              
                //if (CurrentItemListbyLabelId.length > 0) {
                //    NewDataItemList = NewItemListBasedonLabelIdSelection({ CurrentItemListbyLabelId: CurrentItemListbyLabelId, ExistingItemList: AllDataListItems,LabelId: Req.LabelId});
                // }
               
                if (Req.CurrentDatalistItem != undefined) {           
                    _ExistingItemList = Req.CurrentDatalistItem;
                }
                NewDataItemList = NewItemListBasedonLabelIdSelection({ ExistingItemList: _ExistingItemList, LabelId: Req.LabelId });
                _oScrollListAnswerMode.LoadItem({ DataSourceModelName: Req.DataSourceName, AttributeNodeId: Req.AttributeNodeId, ControlId: Req.ControlId, DivId: Req.DivId, DataList: NewDataItemList, $compile: Compile });

            }

            OneViewConsole.Debug("GetItemMenuByLabelMenu End", "LabelMenuFrameWork.GetItemMenuByLabelMenu");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.GetItemMenuByLabelMenu", Excep);
        }
        finally {
        }
    }

    //Req: Id,LabelName
    this.UpdateSelectedStatusForLabelMenu = function (Req) {
        try {
            OneViewConsole.Debug("ShowSelectedStatusForLabelMenu Start", "LabelMenuFrameWork.ShowSelectedStatusForLabelMenu");
          
            var ITagId = '';
            var ReqLabelName = Req.LabelName;
            for (var i = 0; i < LabelList.length; i++) {
               
                var ClassName = 'icon icon-check-circle';
                
                var LabelName = LabelList[i].LabelName;
                //_oLabelName.toUpperCase().trim()
                //if (LabelList[i].LabelId == Req.LabelId) {
                if (LabelName.toUpperCase().trim() == ReqLabelName.toUpperCase().trim()) {
                    if (LabelList[i].IsSelected == 'true') {
                        //ITagId = 'ITag' + LabelList[i].LabelName + LabelList[i].LabelId;
                        ITagId = 'ITag'+ LabelList[i].LabelId;
                        _oDOM.RemoveClass(ITagId, ClassName);
                        LabelList[i].IsSelected = 'false';
                    }
                    else {
                        //ITagId = 'ITag' + Req.LabelName + Req.LabelId;
                        ITagId = 'ITag' + Req.LabelId;
                        _oDOM.AddClass(ITagId, ClassName);
                        LabelList[i].IsSelected = 'true';
                    }
                }
                else if (LabelList[i].IsSelected == 'true') {
                    // ITagId = 'ITag' + LabelList[i].LabelName + LabelList[i].LabelId;
                    ITagId = 'ITag' + LabelList[i].LabelId;
                    _oDOM.RemoveClass(ITagId, ClassName);
                    LabelList[i].IsSelected = 'false';
                }
            }
        
            OneViewConsole.Debug("ShowSelectedStatusForLabelMenu End", "LabelMenuFrameWork.ShowSelectedStatusForLabelMenu");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.ShowSelectedStatusForLabelMenu", Excep);
        }
        finally {
        }
    }

    var GetDataListItems = function (Req) {
        try {
            OneViewConsole.Debug("GetDataListItems Start", "LabelMenuFrameWork.GetDataListItems");

            var _oItemDAO = new ItemDAO();
            var oDateTime = new DateTime();
            var CurrentDate = oDateTime.GetDate();//CurrentDate
            var ReqObj1 = { DcPlaceId: Req.DcPlaceId, Type: Req.DATId, LabelId: Req.LabelId, Date: CurrentDate, TemplateId: OneViewSessionStorage.Get("TemplateId") };
            var Response = _oItemDAO.GetItembyDcPlaceLabelDate(ReqObj1);           

            OneViewConsole.Debug("GetDataListItems End", "LabelMenuFrameWork.GetDataListItems");

            return Response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.GetDataListItems", Excep);
        }
        finally {
        }
    }

    var NewItemListBasedonLabelIdSelection = function (Req) {
        try {
            OneViewConsole.Debug("NewItemListBasedonLabelIdSelection Start", "LabelMenuFrameWork.NewItemListBasedonLabelIdSelection");

            //var CurrentItemListbyLabelId = Req.CurrentItemListbyLabelId;
            var ExistingItemList = Req.ExistingItemList;

            var NewDataItemList = [];
            var SrNo = 0;
            var LabelId = Req.LabelId;

            for (var i = 0; i < ExistingItemList.length; i++) {

                var LabelDetails = ExistingItemList[i].LabelDetails;

                for (var j = 0; j < LabelDetails.length; j++) {

                    if (LabelDetails[j].LabelId == LabelId) {
                        SrNo += 1;
                        ExistingItemList[i].SrNo = SrNo;
                        NewDataItemList.push(ExistingItemList[i]);

                        break;
                    }

                }

            }

            OneViewConsole.Debug("NewItemListBasedonLabelIdSelection End", "LabelMenuFrameWork.NewItemListBasedonLabelIdSelection");

            return NewDataItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.NewItemListBasedonLabelIdSelection", Excep);
        }
        finally {
        }
    }

    this.GeNewItemListBasedonLabelIdSelection = function (Req) {
        try {
            OneViewConsole.Debug("GeNewItemListBasedonLabelIdSelection Start", "LabelMenuFrameWork.GeNewItemListBasedonLabelIdSelection");
            var NewDataItemList = [];
            NewDataItemList = NewItemListBasedonLabelIdSelection({ ExistingItemList: AllDataListItems, LabelId: Req.LabelId });

            OneViewConsole.Debug("GeNewItemListBasedonLabelIdSelection End", "LabelMenuFrameWork.GeNewItemListBasedonLabelIdSelection");

            return NewDataItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.GeNewItemListBasedonLabelIdSelection", Excep);
        }
        finally {
        }
    }

}

function LabelMenuDAO() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    //Req : LabelTypeIdLabelName
    ///Response: List of Label
    // [ {Id, ServerId, Name, IsDynamicElement,LabelTypeId, LabelName, LabelId, LabelName} ]
    this.GetLabelByLabelType = function (Req) {
        try {
            OneViewConsole.Debug("GetLabelByLabelType start", "ItemDAO.GetLabelByLabelType");

            /*
            Query = "Select Lbl.*,LblT.Id As LblTypeId,LblT.Name As LblTypeName from Label Lbl" +
                    " Inner Join LabelType LblT On  Lbl.LabelTypeId=LblT.Id" +
                   // " Where LblT.Name=' " + Req.LabelName + "' ";
                    " Where LblT.Id=' " + Req.LabelTypeId + "' ";*/

            var TemplateId = OneViewSessionStorage.Get("TemplateId");
            var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");

            var Query = "SELECT Distinct LabelId ,LabelName,LabelTypeId,LabelTypeName FROM RcoAndLabelMapping RLM " +
                    " INNER JOIN ItemProcessMappingEntity IPM ON IPM.DataId = RLM.RCOMasterId" +
                    " INNER JOIN OrderDetails OrdrD ON OrdrD.RCOMasterId=RLM.RCOMasterId" +
                    " WHERE" +
                    " UPPER(LabelTypeName) LIKE UPPER('%" + Req.LabelName + "%')" +
                    " AND IPM.ProcessId = " + TemplateId + " AND OrdrD.ReceiverBUId = " + DcPlaceId + "" +
                    " ORDER BY LabelId ";


            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetLabelByLabelType end", "ItemDAO.GetLabelByLabelType");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetLabelByLabelType", Excep);
        }
        finally {
            Query = null;
        }
    }

}