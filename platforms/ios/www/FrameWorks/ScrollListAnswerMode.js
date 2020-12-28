var AllDataListItems = [];
//ScrollListAnswerMode
function ScrollListAnswerMode($scope) {

    var MyInstance = this;
    var _oDOM = new DOM();
  
    this.Init = function (DataSourceModelName, ControlId) {
        try {
            OneViewConsole.Debug("Init Start", "ScrollListAnswerMode.Init");

            $scope[DataSourceModelName] = [];
            $scope[ControlId] = MyInstance;          

            OneViewConsole.Debug("Init End", "ScrollListAnswerMode.Init");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.Init", Excep);
        }
        finally {
        }
    }
    // {"LabelId":"-1","OrderById":1}
    this.Load = function (DataSourceModelName, DcPlaceId, AttributeNodeId, ControlId, DATId, DivId, $compile, Req) {
        try {
            OneViewConsole.Debug("Load Start", "ScrollListAnswerMode.Load");

            var LabelId = Req.LabelId;
            var OrderById = Req.OrderById;

            var oDateTime = new DateTime();
           // var DCDateTime = oDateTime.GetDateAndTime(); // CurrentDateTime : (dd-mm-yyyy hh:mm:ss)

            var CurrentDate = oDateTime.GetDate();//CurrentDate

            var ReqObj = { DcPlaceId: DcPlaceId, Type: DATId, LabelId: Req.LabelId, OrderById: Req.OrderById, AttributeNodeId: AttributeNodeId, ControlId: ControlId, Date: CurrentDate ,OrderByName : Req.OrderByName};

            MyInstance.Init(DataSourceModelName, ControlId, DATId);
            var DataList = MyInstance.GetDataByDcPlaceAndType(DcPlaceId, DATId, ReqObj);
          
            var ItemRelatedIds = { 'ItemAttributeNodeId': AttributeNodeId, 'STAttributeNodeId': Req.STNoId, 'OTAttributeNodeId': Req.OTNoId };
            DataList = MyInstance.GetDcDataByItems(DataList, ItemRelatedIds);
            //alert('DataList : ' + JSON.stringify(DataList));
            /*$scope[DataSourceModelName] = DataList;
            // alert('$scope[DataSourceModelName] : ' + JSON.stringify($scope[DataSourceModelName]));

           
            
            MyInstance.LoadHtml($scope, $compile, AttributeNodeId, ControlId, DivId, DataList);
           
            if (DataList != null && DataList != undefined && DataList.length > 0) {
                var FirstData=DataList[0];
                MyInstance.ActivateMenuItem(FirstData);
                MyInstance.Set(FirstData);
            }
            */
            AllDataListItems = clone(DataList);

            var _oDataItemList = MyInstance.LoadItemBasedOnSelectedLabelId($compile);

            MyInstance.LoadItem({ DataSourceModelName: DataSourceModelName, AttributeNodeId: AttributeNodeId, ControlId: ControlId, DivId: DivId, DataList: _oDataItemList, $compile: $compile });

            OneViewConsole.Debug("Load End", "ScrollListAnswerMode.Load");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.Load", Excep);
        }
        finally {
        }
    }

    this.LoadItemBasedOnSelectedLabelId = function ($compile) {
        try {
            OneViewConsole.Debug("GetItemMenuByLabelMenu Start", "LabelMenuFrameWork.GetItemMenuByLabelMenu");

            var DataItemList = [];

            if (LabelList.length > 0) {

                var LabelId = '-1';

                for (var i = 0; i < LabelList.length; i++) {

                    var LabelName = LabelList[i].LabelName;                   
                    if (LabelList[i].IsSelected == 'true') {
                        LabelId = LabelList[i].LabelId;
                        break;
                    }
              
                  
                }

                if (LabelId != '-1') {
                    var _oLabelMenuFrameWork = new LabelMenuFrameWork({ Scope: $scope, Compile: $compile });
                    DataItemList = _oLabelMenuFrameWork.GeNewItemListBasedonLabelIdSelection({ ExistingItemList: AllDataListItems, LabelId: LabelId });
                }
                else {
                    DataItemList = AllDataListItems;
                }
            }
            else {
                DataItemList = AllDataListItems;
            }

            OneViewConsole.Debug("GetItemMenuByLabelMenu End", "LabelMenuFrameWork.GetItemMenuByLabelMenu");

            return DataItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LabelMenuFrameWork.GetItemMenuByLabelMenu", Excep);
        }
        finally {
        }
    }

    this.LoadItem = function (Req) {
        try {
            OneViewConsole.Debug("LoadItem Start", "ScrollListAnswerMode.LoadItem");

            var DataList = Req.DataList;
            $scope[Req.DataSourceModelName] = DataList;           
            MyInstance.LoadHtml($scope, Req.$compile, Req.AttributeNodeId,Req.ControlId,Req.DivId,Req.DataList);

            if (DataList != null && DataList != undefined && DataList.length > 0) {
                var FirstData = DataList[0];               
                MyInstance.ActivateMenuItem(FirstData);
                MyInstance.Set(FirstData);
            }

            OneViewConsole.Debug("LoadItem End", "ScrollListAnswerMode.LoadItem");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.LoadItem", Excep);
        }
        finally {
        }
    }

    ///Req: DcPlaceId, Type
    ///Res: List of OrganizationAssetsNode
    // [ {Id, ServerId, Name, IsDynamicElement ,LabelTypeId, LabelName, LabelId, LabelName} ]
    this.GetDataByDcPlaceAndType = function (DcPlaceId, Type, Req) {
        try {
            OneViewConsole.Debug("GetDataByDcPlaceAndType Start", "ScrollListAnswerMode.GetDataByDcPlaceAndType");

            //DataList************************************************

            var DataList = [];

            /*
            DataList.push({
              SrNo : 1, Id: 1, ServerId: 10, Name: 'Paneer Kurma', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,
              LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 4, LabelName: 'Breakfast' }, { LabelTypeId: 3, LabelTypeName: 'Item Type', LabelId: 7, LabelName: 'Unpasteurized Dairy Product' }
              , { LabelTypeId: 4, LabelTypeName: 'Item Category', LabelId: 12, LabelName: 'Hot' }]
            });

            DataList.push({
                SrNo: 2, Id: 2, ServerId: 11, Name: 'Chicken Tikka', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,
                LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 4, LabelName: 'Breakfast' }, { LabelTypeId: 3, LabelTypeName: 'Item Type', LabelId: 8, LabelName: 'Stuffed Meat' }
                , { LabelTypeId: 4, LabelTypeName: 'Item Category', LabelId: 13, LabelName: 'Dry' }]
            });

            DataList.push({
                SrNo: 3, Id: 3, ServerId: 12, Name: 'White Sauce Pasta', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,
                LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 4, LabelName: 'Breakfast' }, { LabelTypeId: 3, LabelTypeName: 'Item Type', LabelId: 9, LabelName: 'Stuffed Pasta' }
                , { LabelTypeId: 4, LabelTypeName: 'Item Category', LabelId: 14, LabelName: 'Frozen' }]
            });

            DataList.push({
                SrNo: 4, Id: 4, ServerId: 13, Name: 'Chicken Briyani', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,
                LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 6, LabelName: 'Dinner' }, { LabelTypeId: 3, LabelTypeName: 'Item Type', LabelId: 10, LabelName: 'Poultry' }
                , { LabelTypeId: 4, LabelTypeName: 'Item Category', LabelId: 15, LabelName: 'Chilled' }]
            });

            DataList.push({
                SrNo: 5, Id: 5, ServerId: 14, Name: 'Fish Curry', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,
                LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 3, LabelName: 'Low Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 5, LabelName: 'Lunch' }, { LabelTypeId: 3, LabelTypeName: 'Item Type', LabelId: 11, LabelName: 'Seared Foods' }
                 , { LabelTypeId: 4, LabelTypeName: 'Item Category', LabelId: 16, LabelName: 'Beverage' }]
            });

              */

            //DataList************************************************

            var _oItemDAO = new ItemDAO();

            var BUData = _oItemDAO.GetParentByIdAndType(Req.DcPlaceId, DATEntityType.RCOMaster_BusinessUnit);
            var ReqObj = { DcPlaceId: BUData[0].Id, Type: Req.Type, LabelId: Req.LabelId, Date: Req.Date, TemplateId: OneViewSessionStorage.Get("TemplateId") };
            var Response = _oItemDAO.GetItembyDcPlaceLabelDate(ReqObj);

            if (Response.length > 0) {
                var ReqObjFormatDataList = { ItemList: Response, OrderById: Req.OrderById, AttributeNodeId: Req.AttributeNodeId, ControlId: Req.ControlId, OrderByName: Req.OrderByName };
                //alert('ReqObjFormatDataList :  ' + JSON.stringify(ReqObjFormatDataList));
                DataList = FormatDataList(ReqObjFormatDataList);
                // alert('DataList :  ' + JSON.stringify(DataList));

            }


            // alert('DataList 22 :  ' + JSON.stringify(DataList));
            OneViewConsole.Debug("GetDataByDcPlaceAndType End", "ScrollListAnswerMode.GetDataByDcPlaceAndType");

            return DataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDataByDcPlaceAndType", Excep);
        }
    }

    //Re Parameter:{ItemList:"",OrderById:1}
    var FormatDataList = function (Req) {
        try {
            OneViewConsole.Debug("FormatDataList Start", "ScrollListAnswerMode.FormatDataList");

            var DataListResponse = [];
            var DataListObj={};
            var ItemList = Req.ItemList;
            var OrderById = Req.OrderById;
            var OrderByName = Req.OrderByName;
            var TotalOrderByCount = 0;
            if (ItemList.length > 0) {
                
                var count = 1;
                for (var i = 0; i < ItemList.length; i++) {

                    var ItemName = ItemList[i].Name;
                    var ServerId = ItemList[i].ServerId;
                    var Type = ItemList[i].Type;
                    var LabelTypeId = ItemList[i].LabelTypeId;
                    var LabelTypeName = ItemList[i].LabelTypeName;
                    var LabelId = ItemList[i].LabelId;
                    var LabelName = ItemList[i].LabelName;
                    var OrderQuantity=ItemList[i].OrderQuantity;
                    var DeliveredQuantity = ItemList[i].DeliveredQuantity;
                    var STNo = ItemList[i].STNo;
                    var OTNo = ItemList[i].OTNo;
                    var Code = ItemList[i].Code;
                    var OrdrServerId = ItemList[i].OrdrServerId;
                    var UOM = ItemList[i].UOM;
                 
                    var IsOrderbyLabel = false;
                    var IsOrderbyId = 1;
                    

                   // if (LabelId == OrderById) {
                   //     TotalOrderByCount += 1;
                   //     IsOrderbyLabel = true;
                    // }    
                    if (LabelName.toUpperCase().trim() == OrderByName.toUpperCase().trim()) {
                       // TotalOrderByCount += 1;
                        IsOrderbyLabel = true;
                        IsOrderbyId = 0;// IsOrderbyId is making to '0' because sorting is making in ascending order and if label is 'High' it should need to display in top.
                    }

                    var KeyName = ServerId + "_" + STNo + "_" + OTNo;

                    if (i == 0) {
                        DataListObj[KeyName] = {
                            SrNo: count, ServerId: ServerId, Name: ItemName, IsDynamicElement: false, Type: Type, AttributeNodeId: Req.AttributeNodeId, ControlId: Req.ControlId, DataCaptureId: null, DcClientGuid: null, IsDcCompleted: false, IsOrderbyLabel: IsOrderbyLabel, IsOrderbyId: IsOrderbyId, DeliveredDate: ItemList[i].DeliveredDate1, DeliveryOn: ItemList[i].DeliveredDate,UOM:UOM,
                            'OrderQuantity': OrderQuantity, 'DeliveredQuantity': DeliveredQuantity, 'STNo': STNo, 'OTNo': OTNo, 'Code': Code,OrdrServerId:OrdrServerId,
                            LabelDetails: [{ LabelTypeId: LabelTypeId, LabelTypeName: LabelTypeName, LabelId: LabelId, LabelName: LabelName }]
                        };
                     
                        count++;
                    }
                    else {

                        if (DataListObj[KeyName] != undefined) {
                            if (IsOrderbyLabel == true) {
                                DataListObj[KeyName].IsOrderbyLabel = IsOrderbyLabel;
                                DataListObj[KeyName].IsOrderbyId = IsOrderbyId;
                            }
                            DataListObj[KeyName].LabelDetails.push({ LabelTypeId: LabelTypeId, LabelTypeName: LabelTypeName, LabelId: LabelId, LabelName: LabelName });
                        }
                        else {
                            DataListObj[KeyName] = {
                                SrNo: count, ServerId: ServerId, Name: ItemName, IsDynamicElement: false, Type: Type, AttributeNodeId: Req.AttributeNodeId, ControlId: Req.ControlId, DataCaptureId: null, DcClientGuid: null, IsDcCompleted: false, IsOrderbyLabel: IsOrderbyLabel, IsOrderbyId: IsOrderbyId, DeliveredDate: ItemList[i].DeliveredDate1, DeliveryOn: ItemList[i].DeliveredDate, UOM: UOM,
                                'OrderQuantity': OrderQuantity, 'DeliveredQuantity': DeliveredQuantity, 'STNo': STNo, 'OTNo': OTNo, 'Code': Code, OrdrServerId: OrdrServerId,
                                LabelDetails: [{ LabelTypeId: LabelTypeId, LabelTypeName: LabelTypeName, LabelId: LabelId, LabelName: LabelName }]
                            };

                            count++;
                        }
                      
                    }
                }


                //For TotalOrderCount Add ---Start
                //for (var Item in DataListObj) {
                //    if (DataListObj[Item].IsOrderbyLabel == true) {
                //        TotalOrderByCount += 1;
                //    }
                //}

                //For TotalOrderCount End ---Start

                // DataListResponse = FormatIntoOrderById({ 'DataListObj': DataListObj, 'TotalOrderByCount': TotalOrderByCount });

                var sortedItemList = SortItems(DataListObj, 'DeliveredDate', "IsOrderbyId", true, false);
                DataListResponse = MyInstance.UpdateSrNo(sortedItemList);
            }           
          

            OneViewConsole.Debug("FormatDataList End", "ScrollListAnswerMode.FormatDataList");

            return DataListResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.FormatDataList", Excep);
        }
    }



    var SortItems = function (obj, sortedBy1, sortedBy2, isNumericSort, reverse) {
        try {
            OneViewConsole.Debug("SortItems Start", "ScrollListAnswerMode.SortItems");

            sortedBy1 = sortedBy1 || 1; // by default first key
            isNumericSort = isNumericSort || false; // by default text sort
            reverse = reverse || false; // by default no reverse

            var reversed = (reverse) ? -1 : 1;

            var sortable = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // sortable.push([key, obj[key]]);
                    sortable.push(obj[key]);
                }
            }
            i = 0;
            if (isNumericSort)
                sortable.sort(function (a, b) {
                    // alert('hi'+)
                    var xx = reversed * (a[sortedBy1] - b[sortedBy1] || a[sortedBy2] - b[sortedBy2]);

                    i++;
                    //alert(points.indexOf(a);)
                    return xx;
                });
            else
                sortable.sort(function (a, b) {//Only one field sorting added
                    var x = a[1][sortedBy1].toLowerCase(),
                        y = b[1][sortedBy1].toLowerCase();
                    return x < y ? reversed * -1 : x > y ? reversed : 0;
                });



            OneViewConsole.Debug("SortItems End", "ScrollListAnswerMode.SortItems");

            return sortable;// array in format [  val1 ,val2 ]
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.SortItems", Excep);
        }
    }


    this.UpdateSrNo = function (ItemList) {
        try {
            OneViewConsole.Debug("UpdateSrNo Start", "ScrollListAnswerMode.UpdateSrNo");

            var DataList = [];
            for (var i = 0; i < ItemList.length; i++) {

                DataList.push(ItemList[i]);
                DataList[i]["SrNo"] = i + 1;
            }

            return DataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.UpdateSrNo", Excep);
        }
    }



    //Req Parameter:{DataListObj:{'Paneer Kurma':{ SrNo : 1, Id: 1, ServerId: 10, Name: 'Paneer Kurma', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,IsDcCompleted: false, IsOrderbyLabel:false,LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 1, LabelName: 'Breakfast' }]},
    //                             'Green Salad': { SrNo: 2, Id: 2, ServerId: 11, Name: 'Green Salad', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,IsDcCompleted: false, IsOrderbyLabel:true, LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 1, LabelName: 'Breakfast' }]},
    //                              'White Sauce Pasta':{ SrNo: 3, Id: 3, ServerId: 12, Name: 'White Sauce Pasta', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,IsDcCompleted: false, IsOrderbyLabel:true},LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 1, LabelName: 'Breakfast' }]}
    //               TotalOrderByCount: 2  }

    //Response:[
    //          { SrNo: 1, Id: 2, ServerId: 11, Name: 'Green Salad', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null, IsDcCompleted: false,IsOrderbyLabel:true, LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 1, LabelName: 'Breakfast' }]},
    //          { SrNo: 2, Id: 3, ServerId: 12, Name: 'White Sauce Pasta', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,IsDcCompleted: false, IsOrderbyLabel:true},LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 1, LabelName: 'Breakfast' }]},
    //          { SrNo : 3, Id: 1, ServerId: 10, Name: 'Paneer Kurma', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,IsDcCompleted: false, IsOrderbyLabel:false,LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 1, LabelName: 'High Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 1, LabelName: 'Breakfast' }]},
     //       ]
    var FormatIntoOrderById = function (Req) {

        try {
            OneViewConsole.Debug("FormatIntoOrderById Start", "ScrollListAnswerMode.FormatIntoOrderById");

            var DataListResponse = [];
            var DataListObj = Req.DataListObj;     
            var TotalOrderByCount = Req.TotalOrderByCount;
           

            //OredrBy Formating(Eg: Based on HighRisk Formatting)
            var CurrentItemCountForOrderby = 0;
            var CurrentItemCountNotForOrderby = 0;

            for (var Item in DataListObj) {

                if (DataListResponse.length == 0) {
                    if (DataListObj[Item].IsOrderbyLabel == true) {
                        DataListObj[Item].SrNo = 1;
                        CurrentItemCountForOrderby = 1;
                    }
                    else {
                        CurrentItemCountNotForOrderby += 1;
                        DataListObj[Item].SrNo = TotalOrderByCount + 1;
                    }
                    DataListResponse.push(DataListObj[Item]);
                }
                else {
                    if (DataListObj[Item].IsOrderbyLabel == true) {
                        CurrentItemCountForOrderby += 1;
                        DataListObj[Item].SrNo = CurrentItemCountForOrderby;
                        if (CurrentItemCountNotForOrderby == 0) {
                            DataListResponse.push(DataListObj[Item]);
                        }
                        else {
                            DataListResponse.splice((CurrentItemCountForOrderby - 1), 0, DataListObj[Item]);
                        }
                    }
                    else {
                        CurrentItemCountNotForOrderby += 1;
                        DataListObj[Item].SrNo = TotalOrderByCount + CurrentItemCountNotForOrderby;
                        DataListResponse.push(DataListObj[Item]);
                    }
                }

            }

            OneViewConsole.Debug("FormatIntoOrderById End", "ScrollListAnswerMode.FormatIntoOrderById");

            return DataListResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.FormatIntoOrderById", Excep);
        }
    }


    this.Set = function (ItemData) {
        try {
            OneViewConsole.Debug("Set Start", "ScrollListAnswerMode.Set");
            //alert('ItemData : ' + JSON.stringify(ItemData));

            MyInstance.SelectedValue = ItemData.ServerId;
            MyInstance.SelectedText = ItemData.Name;
            MyInstance.IsDynamicElement = ItemData.IsDynamicElement;
            MyInstance.DATEntityTypeId = ItemData.Type;
            if (ItemData.Type == undefined) {
                MyInstance.DATEntityTypeId = "";
            }
           
            
            $scope[ItemData.ControlId] = MyInstance;

            //alert(ItemData.ControlId + ' ,  JSON.stringify($scope[ItemData.ControlId]  : ' + JSON.stringify($scope[ItemData.ControlId]));

            OneViewConsole.Debug("Set End", "ScrollListAnswerMode.Set");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.Set", Excep);
        }
        finally {
        }
    }

    this.GetSelectedValue = function () {
        try {
            OneViewConsole.Debug("GetSelectedValue Start", "ScrollListAnswerMode.GetSelectedValue");
            OneViewConsole.Debug("GetSelectedValue End", "ScrollListAnswerMode.GetSelectedValue");

            return MyInstance.SelectedValue;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetSelectedValue", Excep);
        }
    }

    this.GetSelectedText = function () {
        try {
            OneViewConsole.Debug("GetSelectedText Start", "ScrollListAnswerMode.GetSelectedText");
            OneViewConsole.Debug("GetSelectedText End", "ScrollListAnswerMode.GetSelectedText");

            return MyInstance.SelectedText;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetSelectedText", Excep);
        }
    }

    this.GetDATEntityTypeId = function () {
        try {
            OneViewConsole.Debug("GetDATEntityTypeId Start", "ScrollListAnswerMode.GetDATEntityTypeId");
            OneViewConsole.Debug("GetDATEntityTypeId End", "ScrollListAnswerMode.GetDATEntityTypeId");

            return MyInstance.DATEntityTypeId;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDATEntityTypeId", Excep);
        }
    }

    this.GetList = function (DataSourceModelName) {
        try {
            OneViewConsole.Debug("GetList Start", "ScrollListAnswerMode.GetList");

            var value = $scope[DataSourceModelName];
            
            OneViewConsole.Debug("GetList End", "ScrollListAnswerMode.GetList");

            return value;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetList", Excep);
        }
        finally {
        }
    }

    this.LoadHtml = function ($scope, $compile, AttributeNodeId, ControlId, DivId, ItemList) {
        try {
            OneViewConsole.Debug("LoadHtml Start", "ScrollListAnswerMode.LoadHtml");

            var Html = MyInstance.GetHtml(ItemList, AttributeNodeId, ControlId);

            var DOMElement = document.getElementById(DivId);
           // alert(DivId + ', DOMElement : ' + DOMElement)
            if (DOMElement != '' && DOMElement !=undefined) {
                DOMElement.innerHTML = '';

                if (Html != '') {
                    var _oOneViewCompiler = new OneViewCompiler();
                    _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, DivId);
                }
            }
        

            OneViewConsole.Debug("LoadHtml End", "ScrollListAnswerMode.LoadHtml");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.LoadHtml", Excep);
        }
    }

    /// [ {Id, ServerId, Name, IsDynamicElement ,Type, LabelDetails : [ { LabelTypeId, LabelName, LabelId, LabelName}]} ]
    this.GetHtml = function (ItemList, AttributeNodeId, ControlId) {
        try {
            OneViewConsole.Debug("GetHtml Start", "ScrollListAnswerMode.GetHtml");

            var Html = '';
            for (var i = 0; i < ItemList.length; i++) {
                var ServerId = ItemList[i].ServerId;
                var DataCaptureId = ItemList[i].DataCaptureId;
                var Code = ItemList[i].Code
                var Name = ItemList[i].Name;
                var OrdrServerId = ItemList[i].OrdrServerId;
                var IsDcCompleted = ItemList[i].IsDcCompleted;
                if (OrdrServerId == undefined) {
                    OrdrServerId = ServerId;
                }
                //if (Code != '' && Code != null && Code != 'null' && Code != undefined && Code != 'undefined') {
                //    Name = Code + " - " + ItemList[i].Name;                    
                //}
                //else {
                //    Name = ItemList[i].Name;
                //}
                
                var ItemName = "'" + ItemList[i].Name + "'";
                var IsDynamicElement = "'" + ItemList[i].IsDynamicElement + "'";
                var CtrlId = "'" + ControlId + "'";

                if (DataCaptureId == null || DataCaptureId == undefined) {
                    DataCaptureId = 0;
                }
                var IconHtml = '';
                if (DataCaptureId != 0) {
                    if (IsDcCompleted == true || IsDcCompleted == 'true'){
                        IconHtml = '<i class="icon icon-check"></i>';
                }
                }

                var LabelHtml = '';
                //Get High Risk Data id = 7
                var LabelName = 'high';
                var LabelData;
                if (ItemList[i].LabelDetails != undefined && ItemList[i].LabelDetails != "") {
                    LabelData = MyInstance.GetLabel(ItemList[i].LabelDetails, LabelName);
                }
              
                
                if (LabelData != null && LabelData != undefined) {
                    LabelHtml = 'style="overflow:visible; border-left:7px solid red;"';
                }

                Html += '<a ' + LabelHtml + ' id="DivItem_' + OrdrServerId + '" DataCaptureId="' + ItemList[i].DataCaptureId + '" class="item active grvItemWrap" ng-click="CustomEvent(\'ItemClick\', { \'SrNo\' : ' + ItemList[i].SrNo + ', \'ServerId\': ' + ServerId + ' ,\'OrdrServerId\': ' + OrdrServerId + ' , \'Name\' : ' + ItemName + ' , \'IsDynamicElement\' : ' + IsDynamicElement + ' , \'Type\' : ' + ItemList[i].Type + ', \'DataCaptureId\' : ' + DataCaptureId + ', \'AttributeNodeId\' : ' + AttributeNodeId + ' , \'ControlId\' : ' + CtrlId + ' })"> ' + IconHtml + ' {{\'' + Name + '\' | xlat }} </a>';
            }

            OneViewConsole.Debug("GetHtml End", "ScrollListAnswerMode.GetHtml");
           // alert('Html : ' + Html);
            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetHtml", Excep);
        }
    }

    this.GetLabel = function (LabelDetails, LabelName) {
        try {
            OneViewConsole.Debug("GetLabel Start", "ScrollListAnswerMode.GetLabel");

            var LabelData = null;
            for (var j = 0; j < LabelDetails.length; j++) {
                if (LabelDetails[j].LabelName.toLowerCase() == LabelName) {
                    LabelData = LabelDetails;
                    break;
                }
            }
            OneViewConsole.Debug("GetLabel End", "ScrollListAnswerMode.GetLabel");
            //alert('LabelData : ' + JSON.stringify(LabelData));

            return LabelData;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetLabel", Excep);
        }
    }

    ///Req: List of OrganizationAssetsNode
    //[ {Id, ServerId, Name, IsDynamicElement]
    ///Res: List of Data
    // [ {Id, ServerId, Name, IsDynamicElement, LabelTypeId, LabelName, LabelId, LabelName, DcId} ] 
    //Get all same data which is request along with DcId if any DC available for the particular item/AssetsNodeId
    this.GetDcDataByItemsForSingleAttribute = function (ItemList, AttributeNodeId) {
        try {
            OneViewConsole.Debug("GetDcDataByItemsForSingleAttribute Start", "ScrollListAnswerMode.GetDcDataByItemsForSingleAttribute");


            if (ItemList != null && ItemList.length > 0) {
                var _oItemDAO = new ItemDAO();
                var DcAndItemIdList = _oItemDAO.GetDcDataByItemsForSingleAttribute(ItemList, AttributeNodeId);
                if (DcAndItemIdList != null && DcAndItemIdList.length > 0) {
                    for (var i = 0; i < DcAndItemIdList.length ; i++) {
                        for (var j = 0; j < ItemList.length ; j++) {                         
                            if (DcAndItemIdList[i].Answer == ItemList[j].ServerId) {
                                ItemList[j].DataCaptureId = DcAndItemIdList[i].DataCaptureId;
                                ItemList[j].DcClientGuid = DcAndItemIdList[i].ClientGuid;
                                ItemList[j].IsDcCompleted = DcAndItemIdList[i].IsDcCompleted;
                                break;
                            }
                        }
                    }
                }
            }
            OneViewConsole.Debug("GetDcDataByItemsForSingleAttribute End", "ScrollListAnswerMode.GetDcDataByItemsForSingleAttribute");

            return ItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDcDataByItemsForSingleAttribute", Excep);
        }
    }

    ///Req: List of OrganizationAssetsNode
    //[ {Id, ServerId, Name, IsDynamicElement]
    ///Res: List of Data
    // [ {Id, ServerId, Name, IsDynamicElement, LabelTypeId, LabelName, LabelId, LabelName, DcId} ] 
    //Get all same data which is request along with DcId if any DC available for the particular item/AssetsNodeId
    this.GetDcDataByItems = function (ItemList, ItemRelatedIds) {
        try {
            OneViewConsole.Debug("GetDcDataByItems Start", "ScrollListAnswerMode.GetDcDataByItems");
            

            if (ItemList != null && ItemList.length > 0) {
                var _oItemDAO = new ItemDAO();
                var DcAndItemIdList = _oItemDAO.GetDcDataByItems(ItemList, ItemRelatedIds);
                if (DcAndItemIdList != null && DcAndItemIdList.length > 0) {

                    var DcDataDict = MyInstance.GetDcDataDict(DcAndItemIdList, ItemRelatedIds);
                                      
                    if (DcDataDict != undefined && Object.keys(DcDataDict).length > 0) {                        
                        for (var i = 0; i < ItemList.length ; i++) {
                            for (var DataCaptureId in DcDataDict) {
                                var ItemData = ItemList[i];
                                var DcData = DcDataDict[DataCaptureId]
                                if (ItemList[i].STNo == DcData.STAnswer && ItemList[i].OTNo == DcData.OTAnswer && ItemList[i].ServerId == DcData.ItemAnswer) {
                                    ItemList[i].DataCaptureId = DcData.DataCaptureId;
                                    ItemList[i].DcClientGuid = DcData.ClientGuid;
                                    ItemList[i].IsDcCompleted = DcData.IsDcCompleted;
                                    break;
                                }                              
                            }
                        }                     
                    }
                }
            }
            OneViewConsole.Debug("GetDcDataByItems End", "ScrollListAnswerMode.GetDcDataByItems");

            return ItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDcDataByItems", Excep);
        }
    }

    this.GetDcDataDict = function (DcAndItemIdList, ItemRelatedIds) {
        try {
            OneViewConsole.Debug("GetDcDataByItems Start", "ScrollListAnswerMode.GetDcDataByItems");
            var DcDataDict = {};
            
            if (DcAndItemIdList != null && DcAndItemIdList != undefined && DcAndItemIdList.length > 0) {
                for (var i = 0; i < DcAndItemIdList.length ; i++) {
                    var DcDetails = DcAndItemIdList[i];
                    if (DcDataDict[DcDetails.DataCaptureId] == undefined) {
                        DcDataDict[DcDetails.DataCaptureId] = {
                            'DataCaptureId': DcDetails.DataCaptureId, 'ClientGuid': DcDetails.ClientGuid, 'IsDcCompleted': DcDetails.IsDcCompleted,
                            'ItemAttributeNodeId': 0, 'ItemAnswer': "",
                            'STAttributeNodeId': 0, 'STAnswer': "", 'OTAttributeNodeId': 0, 'OTAnswer': ""
                        }
                    }

                    if (DcDetails.AttributeNodeId == ItemRelatedIds.ItemAttributeNodeId) {
                        DcDataDict[DcDetails.DataCaptureId].ItemAttributeNodeId = ItemRelatedIds.ItemAttributeNodeId;
                        DcDataDict[DcDetails.DataCaptureId].ItemAnswer = DcDetails.Answer;
                    }
                    else if (DcDetails.AttributeNodeId == ItemRelatedIds.STAttributeNodeId) {
                        DcDataDict[DcDetails.DataCaptureId].STAttributeNodeId = ItemRelatedIds.STAttributeNodeId;
                        DcDataDict[DcDetails.DataCaptureId].STAnswer = DcDetails.Answer;
                    }
                    else if (DcDetails.AttributeNodeId == ItemRelatedIds.OTAttributeNodeId) {
                        DcDataDict[DcDetails.DataCaptureId].OTAttributeNodeId = ItemRelatedIds.OTAttributeNodeId;
                        DcDataDict[DcDetails.DataCaptureId].OTAnswer = DcDetails.Answer;
                    }
                }
            }

            OneViewConsole.Debug("GetDcDataByItems End", "ScrollListAnswerMode.GetDcDataByItems");

            return DcDataDict;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDcDataByItems", Excep);
        }
    }

    ///Req: 

    ///Res: List of OrganizationAssetsNode
    // [ {Id, ServerId, Name, IsDynamicElement ,LabelTypeId, LabelName, LabelId, LabelName} ]
    this.LoadItemsByDcPlaceAndLabel = function (DcPlaceId, Type, LabelId) {
        try {
            OneViewConsole.Debug("LoadItemsByDcPlaceAndLabel Start", "ScrollListAnswerMode.LoadItemsByDcPlaceAndLabel");

            OneViewConsole.Debug("LoadItemsByDcPlaceAndLabel End", "ScrollListAnswerMode.LoadItemsByDcPlaceAndLabel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.LoadItemsByDcPlaceAndLabel", Excep);
        }
    }



    this.ActivateMenuItem = function (ItemData) {
        try {
            OneViewConsole.Debug("ActivateMenuItem Start", "ScrollListAnswerMode.ActivateMenuItem");

          //  alert('ItemData : ' + JSON.stringify(ItemData));
            var MenuItemId = ItemData.ServerId;
            var MenuItemServerId = ItemData.OrdrServerId;
            if (ItemData.OrdrServerId == undefined) {
                MenuItemServerId = ItemData.ServerId;
            }

            var DataSourceModelName = ItemData.ControlId + "DataSource";
          //  alert('DataSourceModelName : ' + DataSourceModelName)
            var ItemList = MyInstance.GetList(DataSourceModelName);
          //  alert('ItemList : ' + JSON.stringify(ItemList));
            if (ItemList != null) {
                for (var i = 0; i < ItemList.length; i++) {
                    // alert('ItemList[i] : ' + JSON.stringify(ItemList[i]));

                    var ServerId = ItemList[i].ServerId;
                    var DataCaptureId = ItemList[i].DataCaptureId;
                    var OrdrServerId = ItemList[i].OrdrServerId;
                    if (OrdrServerId == undefined) {
                        OrdrServerId = ServerId;
                    }
                    //  alert('ServerId : ' + ServerId + ' , DataCaptureId : ' + DataCaptureId + ' , MenuItemId : ' + MenuItemId);

                    // if (ServerId != MenuItemId) {
                    if (OrdrServerId != MenuItemServerId) {
                        _oDOM.SetStyle("DivItem_" + OrdrServerId, "background-color", "");
                        _oDOM.SetStyle("DivItem_" + OrdrServerId, "color", "");
                    }

                    /*var LabelName = 'high';
                    var LabelData = MyInstance.GetLabel(ItemList[i].LabelDetails, LabelName);
                    if (LabelData != null && LabelData != undefined) {
                        _oDOM.SetStyle("DivItem_" + ServerId, "overflow", "visible");
                        _oDOM.SetStyle("DivItem_" + ServerId, "border-left", "7px solid red");
                    }*/
                    //IsOrderbyLabel
                    var ISHighRisk = ItemList[i].IsOrderbyLabel;
                    if (ISHighRisk == true ) {
                        _oDOM.SetStyle("DivItem_" + OrdrServerId, "overflow", "visible");
                        _oDOM.SetStyle("DivItem_" + OrdrServerId, "border-left", "7px solid red");
                    }


                    if (OneViewSessionStorage.Get("ServiceId") == 52) {
                        if (OneViewSessionStorage.Get("TemplateId") == 3) {
                          //  alert("IsChecked => " + ItemList[i].IsChecked)
                            if (ItemList[i].IsChecked != undefined) {
                                if ((ItemList[i].IsChecked == "true" || ItemList[i].IsChecked == true) && (ItemList[i].IsNC == "true" || ItemList[i].IsNC == true)) {
                                    _oDOM.SetStyle("DivItem_" + OrdrServerId, "overflow", "visible");
                                    _oDOM.SetStyle("DivItem_" + OrdrServerId, "border-left", "7px solid red");                                  
                                }
                                else if ((ItemList[i].IsChecked == "true" || ItemList[i].IsChecked == true) && (ItemList[i].IsNC == "false" || ItemList[i].IsNC == false || ItemList[i].IsNC == "" || ItemList[i].IsNC == undefined || ItemList[i].IsNC == "null" || ItemList[i].IsNC == null)) {
                                    _oDOM.SetStyle("DivItem_" + OrdrServerId, "overflow", "visible");
                                    _oDOM.SetStyle("DivItem_" + OrdrServerId, "border-left", "7px solid green");
                                }
                            }
                        }
                    }

                    if (OneViewSessionStorage.Get("ServiceId") == 50) {
                        if (ItemList[i].DataCaptureId != undefined) {

                            if (ItemList[i].IsDcCompleted != undefined) {
                                var IsDcCompleted = ItemList[i].IsDcCompleted;

                                if (DataCaptureId != 0) {
                                    if (IsDcCompleted == true || IsDcCompleted == 'true') {
                                        _oDOM.SetStyle("DivItem_" + OrdrServerId, "overflow", "visible");
                                        _oDOM.SetStyle("DivItem_" + OrdrServerId, "border-left", "7px solid green");
                                    }
                                    else {
                                        _oDOM.SetStyle("DivItem_" + OrdrServerId, "overflow", "visible");
                                        _oDOM.SetStyle("DivItem_" + OrdrServerId, "border-left", "7px solid #ffbf00");
                                    }
                                }
                            }

                        }
                    }

                }

                _oDOM.SetStyle("DivItem_" + MenuItemServerId, "background-color", "grey");
                //_oDOM.SetStyle("DivItem_" + MenuItemId, "color", "white");
            }

            OneViewConsole.Debug("ActivateMenuItem End", "ScrollListAnswerMode.ActivateMenuItem");
        }
        catch (Excep) {
            //alert('ActivateMenuItem Excep : ' + Excep + " , Excep :  " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.ActivateMenuItem", Excep);
        }
    }

    this.GetItemsbyProcess = function (ItemList) {
        try {
            OneViewConsole.Debug("GetItemsbyProcess Start", "ScrollListAnswerMode.GetItemsbyProcess");

            var FinalItemList = [];

            var ItemsByProcessFilterationList = new ItemDAO().GetItemsbyProcess(OneViewSessionStorage.Get("TemplateId"), ItemList);
          
            if (ItemsByProcessFilterationList != null && ItemsByProcessFilterationList.length > 0) {
                for (var i = 0; i < ItemsByProcessFilterationList.length ; i++) {
                    for (var j = 0; j < ItemList.length ; j++) {
                        if (ItemsByProcessFilterationList[i].DataId == ItemList[j].ServerId) {
                            FinalItemList.push(ItemList[j]);
                            break;
                        }
                    }
                }
            }


            OneViewConsole.Debug("GetItemsbyProcess End", "ScrollListAnswerMode.GetItemsbyProcess");

            return FinalItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetItemsbyProcess", Excep);
        }
    }

    this.LoadProducts = function (Req) {
        try {
            OneViewConsole.Debug("LoadProducts Start", "ScrollListAnswerMode.LoadProducts");

            var LabelId = Req.LabelId;
            var OrderById = Req.OrderById;

            var DataSourceModelName = Req.DataSourceModelName;
            var DcPlaceId = Req.DcPlaceId;
            var AttributeNodeId = Req.AttributeNodeId;
            var ControlId = Req.ControlId;
            var DATId = Req.DATId;
            var DivId = Req.DivId;
            var $compile = Req.$compile;
            var PONum = Req.PONum;

            var oDateTime = new DateTime();

            // var DCDateTime = oDateTime.GetDateAndTime(); // CurrentDateTime : (dd-mm-yyyy hh:mm:ss)

            var CurrentDate = oDateTime.GetDate();//CurrentDate

            var ReqObj = {
                'DcPlaceId': DcPlaceId, 'Type': DATId, 'LabelId': LabelId, 'OrderById': OrderById,
                'AttributeNodeId': AttributeNodeId, 'ControlId': ControlId, 'Date': CurrentDate, 'OrderByName': Req.OrderByName, PONum: Req.PONum
            };

            MyInstance.Init(DataSourceModelName, ControlId, DATId);
            var DataList = MyInstance.GetDataForPO(ReqObj);
            DataList = MyInstance.GetDcDataByItemsForPO(DataList, AttributeNodeId, ControlId, Req);
            
            /*$scope[DataSourceModelName] = DataList;
            // alert('$scope[DataSourceModelName] : ' + JSON.stringify($scope[DataSourceModelName]));

           
            
            MyInstance.LoadHtml($scope, $compile, AttributeNodeId, ControlId, DivId, DataList);
           
            if (DataList != null && DataList != undefined && DataList.length > 0) {
                var FirstData=DataList[0];
                MyInstance.ActivateMenuItem(FirstData);
                MyInstance.Set(FirstData);
            }
            */
            AllDataListItems = clone(DataList);
            MyInstance.LoadItem({ DataSourceModelName: DataSourceModelName, AttributeNodeId: AttributeNodeId, ControlId: ControlId, DivId: DivId, DataList: DataList, $compile: $compile });

            OneViewConsole.Debug("LoadProducts End", "ScrollListAnswerMode.LoadProducts");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.LoadProducts", Excep);
        }
        finally {
        }
    }


    this.GetDataForPO = function (Req) {
        try {
            OneViewConsole.Debug("GetDataForPO Start", "ScrollListAnswerMode.GetDataForPO");

            //DataList************************************************

            var DataList = [];

            /*
            DataList.push({
                SrNo: 5, Id: 5, ServerId: 14, Name: 'Fish Curry', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,
                LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 3, LabelName: 'Low Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 5, LabelName: 'Lunch' }, { LabelTypeId: 3, LabelTypeName: 'Item Type', LabelId: 11, LabelName: 'Seared Foods' }
                 , { LabelTypeId: 4, LabelTypeName: 'Item Category', LabelId: 16, LabelName: 'Beverage' }]
            });

              */

            //DataList************************************************

            var _oItemDAO = new ItemDAO();
            var Response = _oItemDAO.GetProducts(Req);
           
            //If any processing
            var DataList = Response;
            
            OneViewConsole.Debug("GetDataForPO End", "ScrollListAnswerMode.GetDataForPO");

            return DataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDataForPO", Excep);
        }
    }

    this.GetDcDataByItemsForPO = function (ItemList, AttributeNodeId, ControlId, Req) {
        try {
            OneViewConsole.Debug("GetDcDataByItems Start", "ScrollListAnswerMode.GetDcDataByItems");


            if (ItemList != null && ItemList.length > 0) {
                var _oItemDAO = new ItemDAO();

                // var DcAndItemIdList = _oItemDAO.GetDcDataByItemsForSingleAttribute(ItemList, AttributeNodeId);
                var AttributeLst = [];
                AttributeLst.push(Req.POAttributeNodeId);
                AttributeLst.push(AttributeNodeId);
               

                var DcAndItemIdList = _oItemDAO.GetDcDataByItemsForMultipleAttribute(ItemList, AttributeLst);

                if (DcAndItemIdList != null && DcAndItemIdList.length > 0) {
                   
                    var DcDataDict = {};
                    DcDataDict = MyInstance.GetDcDataDictList({ DcResultDetailsLst: DcAndItemIdList, AttributeListDetails: Req.AttributeListDetails });

                    for(var DcId in DcDataDict) {
                     
                        for (var j = 0; j < ItemList.length ; j++) {
                            ItemList[j].SrNo = j + 1;
                            if (DcDataDict[DcId].PONumber == ItemList[j].PurchaseOrderNo && DcDataDict[DcId].ItemName == ItemList[j].ServerId) {
                            
                                ItemList[j].DataCaptureId = DcDataDict[DcId].DataCaptureId;
                                ItemList[j].DcClientGuid = DcDataDict[DcId].ClientGuid;
                                ItemList[j].IsDcCompleted = DcDataDict[DcId].IsDcCompleted;
                                break;
                            }
                        }
                    }
                    /*
                    for (var i = 0; i < DcAndItemIdList.length ; i++) {
                        for (var j = 0; j < ItemList.length ; j++) {
                            ItemList[j].SrNo = j + 1;
                            if (DcAndItemIdList[i].Answer == ItemList[j].ServerId) {
                                ItemList[j].DataCaptureId = DcAndItemIdList[i].DataCaptureId;
                                ItemList[j].DcClientGuid = DcAndItemIdList[i].ClientGuid;
                                ItemList[j].IsDcCompleted = DcAndItemIdList[i].IsDcCompleted;
                                break;
                            }
                        }
                    }
                    */
               
                }

                for (var j = 0; j < ItemList.length ; j++) {
                    ItemList[j].SrNo = j + 1;
                    ItemList[j].ControlId = ControlId;
                    if (ItemList[j].DataCaptureId == undefined) {
                        ItemList[j].DataCaptureId = null;
                    }
                    if (ItemList[j].DcClientGuid == undefined) {
                        ItemList[j].DcClientGuid = null;
                    }
                    if (ItemList[j].IsDcCompleted == undefined) {
                        ItemList[j].IsDcCompleted = false;
                    }
                    //DataCaptureId: null, DcClientGuid: null, IsDcCompleted: false, 
                }

            }
            OneViewConsole.Debug("GetDcDataByItems End", "ScrollListAnswerMode.GetDcDataByItems");
           
            return ItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDcDataByItems", Excep);
        }
    }


    //var ReqObj = { "AttributeListDetails":  [{ AttributeId: 14486, AttributeName: "PurchaseOrderNo" }, { AttributeId: 14487, AttributeName: "Product" } ], "AttributeList": [14486, 14487],"AnswerList":[123,145] };

    this.GetDcDataForPOByAttibuteAndAnswer = function (Req) {
        try {
            OneViewConsole.Debug("GetDcDataByAttibuteAndAnswer Start", "ScrollListAnswerMode.GetDcDataByAttibuteAndAnswer");

           
            var _oItemDAO = new ItemDAO();
            var DcAndItemIdList = [];
            if (OneViewSessionStorage.Get("ServiceId") == 61) {
                DcAndItemIdList = _oItemDAO.GetDcDataByAttibuteAndAnswerByUserId(Req);
            }
            else {
                DcAndItemIdList = _oItemDAO.GetDcDataByAttibuteAndAnswer(Req);
            }
            //GetDcDataByAttibuteAndAnswerByUserId
            
         
            var DcDataDict = {};
            if (DcAndItemIdList.length > 0) {

                Req["DcResultDetailsLst"] = DcAndItemIdList;              
                DcDataDict = MyInstance.GetDcDataDictList(Req);

            }
           
            OneViewConsole.Debug("GetDcDataByAttibuteAndAnswer End", "ScrollListAnswerMode.GetDcDataByAttibuteAndAnswer");

              return DcDataDict;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDcDataByAttibuteAndAnswer", Excep);
        }
    }

    this.UpdateDatalistItemWithDcId = function (Req) {
        try {
            OneViewConsole.Debug("GetDcDataByItems Start", "ScrollListAnswerMode.GetDcDataByItems");


            var AllItemList = Req.AllItemList;
            var DcDataDict = Req.DcDataDict;
            var AttributeListDetails=Req.AttributeListDetails;

            for (var DcId in DcDataDict) {

              //  for (var i = 0; i < AllItemList.length; i++) {

                    for (var j = 0; j < AttributeListDetails.length; j++) {

                        var AttributeId = AttributeListDetails[j].AttributeId;
                        var AttributeName = AttributeListDetails[j].AttributeName;

                    }

                //}
             
            }

          
            OneViewConsole.Debug("GetDcDataByItems End", "ScrollListAnswerMode.GetDcDataByItems");

          //  return ItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDcDataByItems", Excep);
        }
    }

    this.GetDcDetails = function (Req) {
        try {
            OneViewConsole.Debug("UpdatePOActiveStatus Start", "ScrollListAnswerMode.UpdatePOActiveStatus");

            var _oItemDAO = new ItemDAO();
            var DcResultDetailsLst = _oItemDAO.GetDcDataByDcIdList(Req);
            Req["DcResultDetailsLst"] = DcResultDetailsLst;

            //[{"DataCaptureId":1,"ClientGuid":"1328ba53-3a2c-4546-5d0f-e31f42ec1504","IsDcCompleted":"false","AttributeNodeId":"14500","Answer":""},
            //{"DataCaptureId":1,"ClientGuid":"1328ba53-3a2c-4546-5d0f-e31f42ec1504","IsDcCompleted":"false","AttributeNodeId":"14528","Answer":""},
            //{"DataCaptureId":1,"ClientGuid":"1328ba53-3a2c-4546-5d0f-e31f42ec1504","IsDcCompleted":"false","AttributeNodeId":"14529","Answer":""},{"DataCaptureId":2,"ClientGuid":"40ecb3c2-5377-4f8d-5095-4d80b8fa8b95","IsDcCompleted":"false","AttributeNodeId":"14500","Answer":"79.0"},{"DataCaptureId":2,"ClientGuid":"40ecb3c2-5377-4f8d-5095-4d80b8fa8b95","IsDcCompleted":"false","AttributeNodeId":"14528","Answer":""},{"DataCaptureId":2,"ClientGuid":"40ecb3c2-5377-4f8d-5095-4d80b8fa8b95","IsDcCompleted":"false","AttributeNodeId":"14529","Answer":""}]"

            var DcDataDict = {};
            DcDataDict=MyInstance.GetDcDataDictList(Req);

            OneViewConsole.Debug("GetDcDataByItems End", "ScrollListAnswerMode.GetDcDataByItems");

          

            OneViewConsole.Debug("UpdatePOActiveStatus End", "ScrollListAnswerMode.UpdatePOActiveStatus");

            return DcDataDict;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.UpdatePOActiveStatus", Excep);
        }
    }

    this.GetDcDataDictList = function (Req) {
        try {
            OneViewConsole.Debug("UpdatePOActiveStatus Start", "ScrollListAnswerMode.UpdatePOActiveStatus");

          
            var DcResultDetailsLst = Req.DcResultDetailsLst; 
            var DcDataDict = {};

            if (DcResultDetailsLst != null && DcResultDetailsLst != undefined && DcResultDetailsLst.length > 0) {
                for (var i = 0; i < DcResultDetailsLst.length ; i++) {
                    var DcDetails = DcResultDetailsLst[i];
                    if (DcDataDict[DcDetails.DataCaptureId] == undefined) {
                        DcDataDict[DcDetails.DataCaptureId] = {
                            'DataCaptureId': DcDetails.DataCaptureId, 'ClientGuid': DcDetails.ClientGuid, 'IsDcCompleted': DcDetails.IsDcCompleted

                        }
                    }

                    var AttributeListDetails = Req.AttributeListDetails;
                    for (var j = 0; j < AttributeListDetails.length; j++) {
                        if (DcDetails.AttributeNodeId == AttributeListDetails[j].AttributeId) {
                            var AttributeName = AttributeListDetails[j].AttributeName;
                            DcDataDict[DcDetails.DataCaptureId][AttributeName] = DcDetails.Answer;
                            break;
                        }
                    }
                }
            }

            OneViewConsole.Debug("GetDcDataByItems End", "ScrollListAnswerMode.GetDcDataByItems");

            return DcDataDict;

            OneViewConsole.Debug("UpdatePOActiveStatus End", "ScrollListAnswerMode.UpdatePOActiveStatus");

            //return DcResultDetailsLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.UpdatePOActiveStatus", Excep);
        }
    }

    this.UpdateStatusInPO = function (Req) {
        try {
            OneViewConsole.Debug("UpdatePOActiveStatus Start", "ScrollListAnswerMode.UpdatePOActiveStatus");

            var _oItemDAO = new ItemDAO();
            _oItemDAO.UpdateStatusInPO(Req);

            OneViewConsole.Debug("UpdatePOActiveStatus End", "ScrollListAnswerMode.UpdatePOActiveStatus");

           // return ItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.UpdatePOActiveStatus", Excep);
        }
    }

    /*WorkOrderNo ScrollList Code Start*/

    this.LoadProductsForWorkOrder = function (Req) {
        try {
            OneViewConsole.Debug("LoadProductsForWorkOrder Start", "ScrollListAnswerMode.LoadProductsForWorkOrder");

            var LabelId = Req.LabelId;
            var OrderById = Req.OrderById;

            var DataSourceModelName = Req.DataSourceModelName;
            var DcPlaceId = Req.DcPlaceId;
            var AttributeNodeId = Req.AttributeNodeId;
            var ControlId = Req.ControlId;
            var DATId = Req.DATId;
            var DivId = Req.DivId;
            var $compile = Req.$compile;
            var WorkOrderNum = Req.WorkOrderNum;

            var oDateTime = new DateTime();


            var CurrentDate = oDateTime.GetDate();//CurrentDate

            var ReqObj = {
                'DcPlaceId': DcPlaceId, 'Type': DATId, 'LabelId': LabelId, 'OrderById': OrderById,
                'AttributeNodeId': AttributeNodeId, 'ControlId': ControlId, 'Date': CurrentDate, 'OrderByName': Req.OrderByName, WorkOrderNum: Req.WorkOrderNum
            };

            MyInstance.Init(DataSourceModelName, ControlId, DATId);
            var DataList = MyInstance.GetDataForWorkOrder(ReqObj);
            DataList = MyInstance.GetDcDataByItemsForWorkOrder(DataList, AttributeNodeId, ControlId, Req);

            AllDataListItems = clone(DataList);
            MyInstance.LoadItem({ DataSourceModelName: DataSourceModelName, AttributeNodeId: AttributeNodeId, ControlId: ControlId, DivId: DivId, DataList: DataList, $compile: $compile });

            OneViewConsole.Debug("LoadProductsForWorkOrder End", "ScrollListAnswerMode.LoadProductsForWorkOrder");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.LoadProductsForWorkOrder", Excep);
        }
        finally {
        }
    }


    this.GetDataForWorkOrder = function (Req) {
        try {
            OneViewConsole.Debug("GetDataForPO Start", "ScrollListAnswerMode.GetDataForPO");

            //DataList************************************************

            var DataList = [];

            /*
            DataList.push({
                SrNo: 5, Id: 5, ServerId: 14, Name: 'Fish Curry', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,
                LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 3, LabelName: 'Low Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 5, LabelName: 'Lunch' }, { LabelTypeId: 3, LabelTypeName: 'Item Type', LabelId: 11, LabelName: 'Seared Foods' }
                 , { LabelTypeId: 4, LabelTypeName: 'Item Category', LabelId: 16, LabelName: 'Beverage' }]
            });

              */

            //DataList************************************************

            var _oItemDAO = new ItemDAO();
            var Response = _oItemDAO.GetProductsForWorkOrderNo(Req);

            //If any processing
            var DataList = Response;

            OneViewConsole.Debug("GetDataForPO End", "ScrollListAnswerMode.GetDataForPO");

            return DataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDataForPO", Excep);
        }
    }

    this.GetDcDataByItemsForWorkOrder = function (ItemList, AttributeNodeId, ControlId, Req) {
        try {
            OneViewConsole.Debug("GetDcDataByItemsForWorkOrder Start", "ScrollListAnswerMode.GetDcDataByItemsForWorkOrder");


            if (ItemList != null && ItemList.length > 0) {
                var _oItemDAO = new ItemDAO();

                // var DcAndItemIdList = _oItemDAO.GetDcDataByItemsForSingleAttribute(ItemList, AttributeNodeId);
                var AttributeLst = [];
                if (Req.WorkOrderNoAttributeNodeId != undefined) {
                    AttributeLst.push(Req.WorkOrderNoAttributeNodeId);
                }
                AttributeLst.push(AttributeNodeId);


                var DcAndItemIdList = [];
                //GetDcDataByItemsForMultipleAttributeByUserId
                if (OneViewSessionStorage.Get("ServiceId") == 61) {
                    DcAndItemIdList = _oItemDAO.GetDcDataByItemsForMultipleAttributeByUserId(ItemList, AttributeLst);
                }
                else {
                    DcAndItemIdList = _oItemDAO.GetDcDataByItemsForMultipleAttribute(ItemList, AttributeLst);
                }

                if (DcAndItemIdList != null && DcAndItemIdList.length > 0) {

                    var DcDataDict = {};
                    DcDataDict = MyInstance.GetDcDataDictList({ DcResultDetailsLst: DcAndItemIdList, AttributeListDetails: Req.AttributeListDetails });

                    for (var DcId in DcDataDict) {

                        for (var j = 0; j < ItemList.length ; j++) {
                            ItemList[j].SrNo = j + 1;
                            //if (DcDataDict[DcId].WorkOrderNo == ItemList[j].WorkOrderNo && DcDataDict[DcId].ItemName == ItemList[j].ServerId) { //This will work if work order filteration is there
                            if ( DcDataDict[DcId].ItemName == ItemList[j].ServerId) {
                                ItemList[j].DataCaptureId = DcDataDict[DcId].DataCaptureId;
                                ItemList[j].DcClientGuid = DcDataDict[DcId].ClientGuid;
                                ItemList[j].IsDcCompleted = DcDataDict[DcId].IsDcCompleted;
                                break;
                            }
                        }
                    }                   

                }

                for (var j = 0; j < ItemList.length ; j++) {
                    ItemList[j].SrNo = j + 1;
                    ItemList[j].ControlId = ControlId;
                    if (ItemList[j].DataCaptureId == undefined) {
                        ItemList[j].DataCaptureId = null;
                    }
                    if (ItemList[j].DcClientGuid == undefined) {
                        ItemList[j].DcClientGuid = null;
                    }
                    if (ItemList[j].IsDcCompleted == undefined) {
                        ItemList[j].IsDcCompleted = false;
                    }
                   
                }

            }
            OneViewConsole.Debug("GetDcDataByItemsForWorkOrder End", "ScrollListAnswerMode.GetDcDataByItemsForWorkOrder");

            return ItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDcDataByItemsForWorkOrder", Excep);
        }
    }

    this.UpdateStatusInWorkOrder = function (Req) {
        try {
            OneViewConsole.Debug("UpdateStatusInWorkOrder Start", "ScrollListAnswerMode.UpdateStatusInWorkOrder");

            var _oItemDAO = new ItemDAO();
            _oItemDAO.UpdateItemStatusForWorkOrderNo(Req);

            OneViewConsole.Debug("UpdateStatusInWorkOrder End", "ScrollListAnswerMode.UpdateStatusInWorkOrder");

            // return ItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.UpdateStatusInWorkOrder", Excep);
        }
    }
    /*WorkOrderNo ScrollList Code End*/

    /*FlightBeltPlanDetails Code Start*/

    this.LoadScrollListItem = function (Req) {
        try {
            OneViewConsole.Debug("LoadProductsForWorkOrder Start", "ScrollListAnswerMode.LoadProductsForWorkOrder");

            var LabelId = Req.LabelId;
            var OrderById = Req.OrderById;

            var DataSourceModelName = Req.DataSourceModelName;
            var DcPlaceId = Req.DcPlaceId;
            var AttributeNodeId = Req.AttributeNodeId;
            var ControlId = Req.ControlId;
            var DATId = Req.DATId;
            var DivId = Req.DivId;
            var $compile = Req.$compile;
            var WorkOrderNum = Req.WorkOrderNum;

            var oDateTime = new DateTime();


            var CurrentDate = oDateTime.GetDate();//CurrentDate
            var ServiceDate=CurrentDate;
            if (Req.ServiceDate != undefined) {
                ServiceDate = Req.ServiceDate;
            }
            var CurrentStatus = '';
            if (Req.CurrentStatus != undefined) {
                CurrentStatus = Req.CurrentStatus;
            }

            var ReqObj = {
                'DcPlaceId': DcPlaceId, 'Type': DATId, 'LabelId': LabelId, 'OrderById': OrderById,
                'AttributeNodeId': AttributeNodeId, 'ControlId': ControlId, 'Date': CurrentDate, 'OrderByName': Req.OrderByName, WorkOrderNum: Req.WorkOrderNum,
                'ServiceDate': ServiceDate, 'CurrentStatus': CurrentStatus
            };

            MyInstance.Init(DataSourceModelName, ControlId, DATId);
            var DataList = MyInstance.GetDataForScrollListItem(ReqObj);
            DataList = MyInstance.GetDcDataByItemsForWorkOrder(DataList, AttributeNodeId, ControlId, Req);

            AllDataListItems = clone(DataList);
            MyInstance.LoadItem({ DataSourceModelName: DataSourceModelName, AttributeNodeId: AttributeNodeId, ControlId: ControlId, DivId: DivId, DataList: DataList, $compile: $compile });

            OneViewConsole.Debug("LoadProductsForWorkOrder End", "ScrollListAnswerMode.LoadProductsForWorkOrder");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.LoadProductsForWorkOrder", Excep);
        }
        finally {
        }
    }


    this.GetDataForScrollListItem = function (Req) {
        try {
            OneViewConsole.Debug("GetDataForPO Start", "ScrollListAnswerMode.GetDataForPO");

            //DataList************************************************

            var DataList = [];

            /*
            DataList.push({
                SrNo: 5, Id: 5, ServerId: 14, Name: 'Fish Curry', IsDynamicElement: false, Type: 290, AttributeNodeId: 14027, ControlId: 'ControlId_14027', DataCaptureId: null, DcClientGuid: null,
                LabelDetails: [{ LabelTypeId: 1, LabelTypeName: 'Risk', LabelId: 3, LabelName: 'Low Risk' }, { LabelTypeId: 2, LabelTypeName: 'Meal Type', LabelId: 5, LabelName: 'Lunch' }, { LabelTypeId: 3, LabelTypeName: 'Item Type', LabelId: 11, LabelName: 'Seared Foods' }
                 , { LabelTypeId: 4, LabelTypeName: 'Item Category', LabelId: 16, LabelName: 'Beverage' }]
            });

              */

            //DataList************************************************

            var _oItemDAO = new ItemDAO();
            var Response =[];

            //if (OneViewSessionStorage.Get("TemplateId") != null && OneViewSessionStorage.Get("TemplateId") != undefined && OneViewSessionStorage.Get("TemplateId") != "") {
            //    if (OneViewSessionStorage.Get("TemplateId") == 3) {// BeltPlan Template
            //        Response = _oItemDAO.GetFlightBeltPlanDetails(Req);
            //    }
            //}


            if (OneViewSessionStorage.Get("ServiceId") == 51) {

                if (OneViewSessionStorage.Get("TemplateId") != null && OneViewSessionStorage.Get("TemplateId") != undefined && OneViewSessionStorage.Get("TemplateId") != "") {
                    if (OneViewSessionStorage.Get("TemplateId") == 3) {// BeltPlan Template
                        Response = _oItemDAO.GetFlightBeltPlanDetails(Req);
                    }
                    else if (OneViewSessionStorage.Get("TemplateId") == 26) {
                        Response = _oItemDAO.GetFlightCellPlanDetails(Req);
                    }
                    else if (OneViewSessionStorage.Get("TemplateId") == 47) {
                        Response = _oItemDAO.GetFlightOLAPlanDetails(Req);
                    }
                }
                
               
            }
            else if (OneViewSessionStorage.Get("ServiceId") == 52) { 
                Response = _oItemDAO.GetASOWorkOrderDetails(Req);
            }
            else if (OneViewSessionStorage.Get("ServiceId") == 61) {
                if (OneViewSessionStorage.Get("TemplateId") == 391) {// BeltPlan Template
                    Response = _oItemDAO.GetDistinctRFLServiceWorkOrderDetails(Req);
                }
                else {
                    Response = _oItemDAO.GetRFLWorkOrderDetails(Req);
                }
            }

            //If any processing
            var DataList = Response;

            OneViewConsole.Debug("GetDataForPO End", "ScrollListAnswerMode.GetDataForPO");

            return DataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.GetDataForPO", Excep);
        }
    }

    this.UpdateStatusInScrollListItemTable = function (Req) {
        try {
            OneViewConsole.Debug("UpdateStatusInScrollListItemTable Start", "ScrollListAnswerMode.UpdateStatusInScrollListItemTable");

            var _oItemDAO = new ItemDAO();


            if (OneViewSessionStorage.Get("ServiceId") == 51) {

                if (OneViewSessionStorage.Get("TemplateId") == 3) {
                    _oItemDAO.UpdateItemStatusForFlightBeltPlanDetails(Req);
                }
                else if (OneViewSessionStorage.Get("TemplateId") == 26) {
                    _oItemDAO.UpdateItemStatusForFlightCellPlanDetails(Req);
                }
                else if (OneViewSessionStorage.Get("TemplateId") == 47) {
                    _oItemDAO.UpdateItemStatusForFlightOLAPlanDetails(Req);
                }
            }
            else if (OneViewSessionStorage.Get("ServiceId") == 52) {
                if (OneViewSessionStorage.Get("TemplateId") == 3) {
                    _oItemDAO.UpdateItemStatusForASOWorkOrderDetails(Req);
                }
            }
            else if (OneViewSessionStorage.Get("ServiceId") == 61) {           
               _oItemDAO.UpdateItemStatusForRFLWorkOrderDetails(Req);            
            }
           

            OneViewConsole.Debug("UpdateStatusInScrollListItemTable End", "ScrollListAnswerMode.UpdateStatusInScrollListItemTable");

            // return ItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ScrollListAnswerMode.UpdateStatusInScrollListItemTable", Excep);
        }
    }

    /*FlightBeltPlanDetails Code End*/
}




// ItemDAO
function ItemDAO() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    //Req : DcPlaceId, Type, LabelId
    ///Res: List of OrganizationAssetsNode
    // [ {Id, ServerId, Name, IsDynamicElement,LabelTypeId, LabelName, LabelId, LabelName} ]
    this.GetItembyDcPlaceLabelDate = function (Req) {
        try {
            OneViewConsole.Debug("GetItembyDcPlaceLabelDate start", "ItemDAO.GetItembyDcPlaceLabelDate");

            var DcPlaceId = Req.DcPlaceId;
            var Type = Req.Type;
            var LabelId = Req.LabelId;
            var Date = Req.Date;
            var StartDateTime = Date + " 00:00:00";
            var EndDateTime = Date + " 23:59:59";
            var TemplateId = Req.TemplateId;

     

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();

            var currentDate = oDateTime.GetDateAndTime();

            StartDateTime = oDateTime.ConvertDateTimeToInteger(StartDateTime);
            EndDateTime = oDateTime.ConvertDateTimeToInteger(EndDateTime);
            currentDate = oDateTime.ConvertDateTimeToInteger(currentDate);
           // alert(currentDate);

            /*
            var Query = " Select DISTINCT RcoMstr.ServerId, RcoMstr.*, RLM.LabelTypeId As LabelTypeId,RLM.LabelTypeName As LabelTypeName,RLM.LabelId As LabelId,RLM.LabelName As LabelName,OrdrD.OrderQuantity,OrdrD.DeliveredQuantity,OrdrD.STNo,OrdrD.OTNo " +
                        " (SUBSTR(OrdrD.OrderDate, 7, 4) || SUBSTR(OrdrD.OrderDate, 4, 2) || SUBSTR(OrdrD.OrderDate, 1, 2) || SUBSTR(OrdrD.OrderDate, 12, 2) || " +
                        " SUBSTR(OrdrD.OrderDate, 15, 2) || SUBSTR(OrdrD.OrderDate, 18, 2) ) AS OrderDate ," +
                        "(SUBSTR(OrdrD.DeliveredDate, 7, 4) || SUBSTR(OrdrD.DeliveredDate, 4, 2) || SUBSTR(OrdrD.DeliveredDate, 1, 2) || SUBSTR(OrdrD.DeliveredDate, 12, 2) || " +
                        " SUBSTR(OrdrD.DeliveredDate, 15, 2) || SUBSTR(OrdrD.DeliveredDate, 18, 2) ) AS DeliveredDate " +
                        " FROM RcoMasterEntity RcoMstr INNER JOIN OrderDetails OrdrD ON OrdrD.RCOMasterId=RcoMstr.ServerId " +
                        " INNER JOIN ItemProcessMappingEntity IPM ON IPM.DataId = RcoMstr.ServerId AND IPM.ProcessId = " + TemplateId +
                        " INNER JOIN RcoAndLabelMapping RLM ON RLM.RCOMasterId = RcoMstr.ServerId WHERE OrdrD.ReceiverBUId = " + DcPlaceId + " AND (RLM.LabelId = " + LabelId + " OR -1=" + LabelId + ")" +
                        " AND ( ('" + StartDateTime + "' <=  DeliveredDate  AND  DeliveredDate <= '" + EndDateTime + "' ) or  '' = DeliveredDate ) ";
            */
            /*
            var Query = "SELECT DISTINCT OrdrD.RCOMasterId, OrdrD.RCOMasterId as ServerId,OrdrD.RCOMasterName as Name,OrdrD.Code,IPM.DataType as Type,OrdrD.RCOMasterName as Name,RLM.LabelTypeId As LabelTypeId,RLM.LabelTypeName As LabelTypeName,RLM.LabelId As LabelId,RLM.LabelName As LabelName,OrdrD.OrderQuantity,OrdrD.DeliveredQuantity,OrdrD.STNo,OrdrD.OTNo, " +
                        "OrdrD.ServerId as OrdrServerId,"+
                       "(SUBSTR(OrdrD.OrderDate, 7, 4) || SUBSTR(OrdrD.OrderDate, 4, 2) || SUBSTR(OrdrD.OrderDate, 1, 2) || SUBSTR(OrdrD.OrderDate, 12, 2) ||  SUBSTR(OrdrD.OrderDate, 15, 2) || SUBSTR(OrdrD.OrderDate, 18, 2) ) AS OrderDate ," +
                        "(SUBSTR(OrdrD.DeliveredDate, 7, 4) || SUBSTR(OrdrD.DeliveredDate, 4, 2) || SUBSTR(OrdrD.DeliveredDate, 1, 2) || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) || SUBSTR(OrdrD.DeliveredDate, 18, 2) ) AS DeliveredDate " +
                        " FROM  OrderDetails OrdrD " +
                        " INNER JOIN ItemProcessMappingEntity IPM ON IPM.DataId = OrdrD.RCOMasterId  " +
                        " INNER JOIN RcoAndLabelMapping RLM ON RLM.RCOMasterId = OrdrD.RCOMasterId " +
                        " WHERE OrdrD.ReceiverBUId = " + DcPlaceId + " AND IPM.ProcessId = " + TemplateId + " AND (RLM.LabelId = " + LabelId + " OR -1=" + LabelId + ")" +
                        " AND ( ('" + StartDateTime + "' <=  DeliveredDate  AND  DeliveredDate <= '" + EndDateTime + "' ) or  '' = DeliveredDate )  order by OrdrD.RCOMasterId";
            */
           // debugger;

            /*
            //var Query = "SELECT DISTINCT OrdrD.RCOMasterId, OrdrD.RCOMasterId as ServerId,OrdrD.RCOMasterName as Name,OrdrD.Code,IPM.DataType as Type,OrdrD.RCOMasterName as Name,RLM.LabelTypeId As LabelTypeId,RLM.LabelTypeName As LabelTypeName,RLM.LabelId As LabelId,RLM.LabelName As LabelName,OrdrD.OrderQuantity,OrdrD.DeliveredQuantity,OrdrD.STNo,OrdrD.OTNo, " +
            //           "OrdrD.ServerId as OrdrServerId," +
            //          "(SUBSTR(OrdrD.OrderDate, 7, 4) || SUBSTR(OrdrD.OrderDate, 4, 2) || SUBSTR(OrdrD.OrderDate, 1, 2) || SUBSTR(OrdrD.OrderDate, 12, 2) ||  SUBSTR(OrdrD.OrderDate, 15, 2) || SUBSTR(OrdrD.OrderDate, 18, 2) ) AS OrderDate ," +
            //          //Delivered StartDate
            //           "(SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-28 Hours')) ,1,4) ||" +
            //           "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-28 Hours')) ,6,2) ||" +
            //           "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-28 Hours')) ,9,2) ||" +
            //           "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-28 Hours')) ,12,2) ||" +
            //           "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-28 Hours')) ,15,2) ||" +
            //           "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-28 Hours')) ,18,2) ) as DStartDate," +
            //           //Delivered EndDate
            //            "(SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,1,4) ||" +
            //            "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,6,2) ||" +
            //            "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,9,2) ||" +
            //            "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,12,2) ||" +
            //            "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,15,2) ||" +
            //            "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,18,2) ) as DEndDate," +
            //            "OrdrD.DeliveredDate,"+
            //           "(SUBSTR(OrdrD.DeliveredDate, 7, 4) || SUBSTR(OrdrD.DeliveredDate, 4, 2) || SUBSTR(OrdrD.DeliveredDate, 1, 2) || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) || SUBSTR(OrdrD.DeliveredDate, 18, 2) ) AS DeliveredDate1 " +
            //           " FROM  OrderDetails OrdrD " +
            //           " INNER JOIN ItemProcessMappingEntity IPM ON IPM.DataId = OrdrD.RCOMasterId  " +
            //           " INNER JOIN RcoAndLabelMapping RLM ON RLM.RCOMasterId = OrdrD.RCOMasterId " +
            //           " WHERE OrdrD.ReceiverBUId = " + DcPlaceId + " AND IPM.ProcessId = " + TemplateId + " AND (RLM.LabelId = " + LabelId + " OR -1=" + LabelId + ")" +  
            //          " AND ( (   DStartDate <= '" + currentDate + "' AND    '" + currentDate + "' <=DEndDate ) or  '' = DeliveredDate ) " +
            //           " ORDER By OrdrD.RCOMasterId";

            */

            /*
            var Query = "SELECT DISTINCT OrdrD.RCOMasterId, OrdrD.RCOMasterId as ServerId,OrdrD.RCOMasterName as Name,OrdrD.Code,IPM.DataType as Type,OrdrD.RCOMasterName as Name,RLM.LabelTypeId As LabelTypeId,RLM.LabelTypeName As LabelTypeName,RLM.LabelId As LabelId,RLM.LabelName As LabelName,OrdrD.OrderQuantity,OrdrD.DeliveredQuantity,OrdrD.STNo,OrdrD.OTNo,OrdrD.Unit As UOM , " +
                    "OrdrD.ServerId as OrdrServerId," +
                   "(SUBSTR(OrdrD.OrderDate, 7, 4) || SUBSTR(OrdrD.OrderDate, 4, 2) || SUBSTR(OrdrD.OrderDate, 1, 2) || SUBSTR(OrdrD.OrderDate, 12, 2) ||  SUBSTR(OrdrD.OrderDate, 15, 2) || SUBSTR(OrdrD.OrderDate, 18, 2) ) AS OrderDate ," +
                   //Delivered StartDate(-32 hr)
                    "(SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-32 Hours')) ,1,4) ||" +
                    "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-32 Hours')) ,6,2) ||" +
                    "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-32 Hours')) ,9,2) ||" +
                    "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-32 Hours')) ,12,2) ||" +
                    "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-32 Hours')) ,15,2) ||" +
                    "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-32 Hours')) ,18,2) ) as DStartDate," +
                    //Delivered EndDate(+4 hr)
                     "(SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,1,4) ||" +
                     "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,6,2) ||" +
                     "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,9,2) ||" +
                     "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,12,2) ||" +
                     "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,15,2) ||" +
                     "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,18,2) ) as DEndDate," +
                     "OrdrD.DeliveredDate AS DeliveredDate," +
                    "(SUBSTR(OrdrD.DeliveredDate, 7, 4) || SUBSTR(OrdrD.DeliveredDate, 4, 2) || SUBSTR(OrdrD.DeliveredDate, 1, 2) || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) || SUBSTR(OrdrD.DeliveredDate, 18, 2) ) AS DeliveredDate1 " +
                    " FROM  OrderDetails OrdrD " +
                    " INNER JOIN ItemProcessMappingEntity IPM ON IPM.DataId = OrdrD.RCOMasterId  " +
                    " INNER JOIN RcoAndLabelMapping RLM ON RLM.RCOMasterId = OrdrD.RCOMasterId " +
                    " WHERE OrdrD.ReceiverBUId = " + DcPlaceId + " AND IPM.ProcessId = " + TemplateId + " AND (RLM.LabelId = " + LabelId + " OR -1=" + LabelId + ")" +                 
                   " AND ( (   DStartDate <= DeliveredDate1  AND    DeliveredDate1 <=DEndDate ) or  '' = DeliveredDate ) " +
                    " ORDER By OrdrD.RCOMasterId";
            */


            //ItemProcessMappingEntity Configuration
            var ItemProcessMappingConfig=MyInstance.GetItemProcessMappingConfig();

           // var ItemProcessMappingConfig = { Col1: 14026, Col2: 14077, Col3: 14217, Col4: 14227, Col5: 14235, Col6: 14245, Col7: 14254, Col8: 14261, Col9: 14268, Col10: 14278, Col11: 14287, Col12: 14293, Col13: "", Col14: "", Col15: "" };

            var ColumnName = "";
            if (ItemProcessMappingConfig != null) {
                for (var col in ItemProcessMappingConfig) {
                    if (parseInt(ItemProcessMappingConfig[col]) === parseInt(TemplateId)) {
                        ColumnName = "OrdrD." + col;
                        break;
                    }
                }

                if (ColumnName == "") {
                    ColumnName = "OrdrD.Col1";
                }
            }
            else {
                ColumnName = "OrdrD.Col1";
            }


            var Query = "SELECT DISTINCT OrdrD.RCOMasterId, OrdrD.RCOMasterId as ServerId,OrdrD.RCOMasterName as Name,OrdrD.Code,OrdrD.RCOMasterType as Type,OrdrD.RCOMasterName as Name,RLM.LabelTypeId As LabelTypeId,RLM.LabelTypeName As LabelTypeName,RLM.LabelId As LabelId,RLM.LabelName As LabelName,OrdrD.OrderQuantity,OrdrD.DeliveredQuantity,OrdrD.STNo,OrdrD.OTNo,OrdrD.Unit As UOM , " +
                   "OrdrD.ServerId as OrdrServerId," +
                  "(SUBSTR(OrdrD.OrderDate, 7, 4) || SUBSTR(OrdrD.OrderDate, 4, 2) || SUBSTR(OrdrD.OrderDate, 1, 2) || SUBSTR(OrdrD.OrderDate, 12, 2) ||  SUBSTR(OrdrD.OrderDate, 15, 2) || SUBSTR(OrdrD.OrderDate, 18, 2) ) AS OrderDate ," +
                  //Delivered StartDate(-32 hr) //Changed -32 hr to -44 hr as per change request on 11/11/2019
                   "(SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-44 Hours')) ,1,4) ||" +
                   "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-44 Hours')) ,6,2) ||" +
                   "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-44 Hours')) ,9,2) ||" +
                   "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-44 Hours')) ,12,2) ||" +
                   "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-44 Hours')) ,15,2) ||" +
                   "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-44 Hours')) ,18,2) ) as DStartDate," +
                   //Delivered EndDate(+4 hr)
                    "(SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,1,4) ||" +
                    "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,6,2) ||" +
                    "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,9,2) ||" +
                    "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,12,2) ||" +
                    "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,15,2) ||" +
                    "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,18,2) ) as DEndDate," +
                    "OrdrD.DeliveredDate AS DeliveredDate," +
                   "(SUBSTR(OrdrD.DeliveredDate, 7, 4) || SUBSTR(OrdrD.DeliveredDate, 4, 2) || SUBSTR(OrdrD.DeliveredDate, 1, 2) || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) || SUBSTR(OrdrD.DeliveredDate, 18, 2) ) AS DeliveredDate1 " +
                   " FROM  OrderDetails OrdrD " +
                  // " INNER JOIN ItemProcessMappingEntity IPM ON IPM.DataId = OrdrD.RCOMasterId  " +
                  // " INNER JOIN RcoMasterEntity RcoMstr ON OrdrD.RCOMasterId=RcoMstr.ServerId " +
                   " INNER JOIN RcoAndLabelMapping RLM ON RLM.RCOMasterId = OrdrD.RCOMasterId " +
                   " WHERE OrdrD.ReceiverBUId = " + DcPlaceId + " AND  (UPPER(" + ColumnName + ")= 'TRUE') AND (RLM.LabelId = " + LabelId + " OR -1=" + LabelId + ")" +
                  " AND ( (   DStartDate <= DeliveredDate1  AND    DeliveredDate1 <=DEndDate ) or  '' = DeliveredDate ) " +
                   " ORDER By OrdrD.RCOMasterId";



            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetItembyDcPlaceLabelDate end", "ItemDAO.GetItembyDcPlaceLabelDate");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetItembyDcPlaceLabelDate", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetItemProcessMappingConfig = function () {
        try {
            OneViewConsole.Debug("GetItemProcessMappingConfig start", "ItemDAO.GetItemProcessMappingConfig");

            var ItemProcessMappingConfig=null;

            var GetItemProcessMappingResult = MyInstance.GetItemProcessMapping();
            if (GetItemProcessMappingResult.length > 0) {
                ItemProcessMappingConfig = JSON.parse(GetItemProcessMappingResult[0].ProcessMappingDetails);
            }


            OneViewConsole.Debug("GetItemProcessMappingConfig end", "ItemDAO.GetItemProcessMappingConfig");

            return ItemProcessMappingConfig;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetItemProcessMappingConfig", Excep);
        }
        finally {
            Query = null;
        }
    }


    this.GetItemProcessMapping = function () {
        try {
            OneViewConsole.Debug("GetItemProcessMapping start", "ItemDAO.GetItemProcessMapping");

            var   ServiceId= OneViewSessionStorage.Get("ServiceId");
            var Query = "SELECT * FROM ItemProcessMappingEntity WHERE ServiceId=" + ServiceId + "";

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);


            OneViewConsole.Debug("GetItemProcessMapping end", "ItemDAO.GetItemProcessMapping");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetItemProcessMapping", Excep);
        }
        finally {
            Query = null;
        }
    }


    ///Req: List of OrganizationAssetsNode
    //[ {Id, ServerId, Name, IsDynamicElement]
    ///Res: List of Data
    // [ {Id, ServerId, Name, IsDynamicElement, LabelTypeId, LabelName, LabelId, LabelName, DcId} ] 
    //Get all same data which is request along with DcId if any DC available for the particular item/AssetsNodeId
    this.GetDcDataByItemsForSingleAttribute = function (ItemList, AttributeNodeId) {
        try {
            OneViewConsole.Debug("GetDcDataByItemsForSingleAttribute start", "ItemDAO.GetDcDataByItemsForSingleAttribute");

            var Incondition = "(";
            for (var i = 0; i < ItemList.length; i++) {

                Incondition += ItemList[i].ServerId;
                Incondition += (i <= ItemList.length - 2) ? "," : ")";
            }


            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId , DataCaptureEntity.ClientGuid,DataCaptureEntity.IsCompleted AS IsDcCompleted, Drds1.AttributeNodeId , Drds1.Answer  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE Drds1.IsDisable !='true' AND Drds1.AttributeNodeId = " + AttributeNodeId + " AND Drds1.Answer IN " + Incondition;


            // alert('GetDcDataByItemsForSingleAttribute Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

           // alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.Debug("GetDcDataByItemsForSingleAttribute end", "ItemDAO.GetDcDataByItemsForSingleAttribute");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetDcDataByItemsForSingleAttribute", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }


    ///Req: List of OrganizationAssetsNode
    //[ {Id, ServerId, Name, IsDynamicElement]
    ///Res: List of Data
    // [ {Id, ServerId, Name, IsDynamicElement, LabelTypeId, LabelName, LabelId, LabelName, DcId} ] 
    //Get all same data which is request along with DcId if any DC available for the particular item/AssetsNodeId
    this.GetDcDataByItems = function (ItemList, ItemRelatedIds) {
        try {
            OneViewConsole.Debug("GetDcDataByItems start", "ItemDAO.GetDcDataByItems");

            var Incondition = "(";
            for (var i = 0; i < ItemList.length; i++) {

                Incondition += ItemList[i].ServerId;
                Incondition += ",";
                Incondition += ItemList[i].STNo;
                Incondition += ",";
                Incondition += ItemList[i].OTNo;
                Incondition += (i <= ItemList.length - 2) ? "," : ")";
            }


            var AttributeNodeIncondition = "";
            if (ItemRelatedIds != undefined && ItemRelatedIds != null) {
                AttributeNodeIncondition = "(" + ItemRelatedIds.ItemAttributeNodeId + "," + ItemRelatedIds.STAttributeNodeId + "," + ItemRelatedIds.OTAttributeNodeId + ")";
            }

            //var AttributeNodeIncondition = "(";
            //for (var i = 0; i < AttributeNodeIdList.length; i++) {
            //    var ItemRelatedIds = { 'AttributeNodeId': AttributeNodeId, 'STNoId': Req.STNoId, 'OTNoId': Req.OTNoId };
            //    AttributeNodeIncondition += AttributeNodeIdList[i].AttributeNodeId;
            //    AttributeNodeIncondition += (i <= AttributeNodeIdList.length - 2) ? "," : ")";
            //}

            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId , DataCaptureEntity.ClientGuid,DataCaptureEntity.IsCompleted AS IsDcCompleted, Drds1.AttributeNodeId , Drds1.Answer  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE Drds1.IsDisable !='true' AND Drds1.AttributeNodeId IN " + AttributeNodeIncondition + " AND Drds1.Answer IN " + Incondition + " ORDER BY DataCaptureId ";


            // alert('GetDcDataByItems Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            // alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.Debug("GetDcDataByItems end", "ItemDAO.GetDcDataByItems");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetDcDataByItems", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }


    this.GetDcDataByAttibuteAndAnswer= function (Req) {
        try {
            OneViewConsole.Debug("GetDcDataByItems start", "ItemDAO.GetDcDataByItems");
            //Req={AnswerContainerNameList:[],AttributeContainerList:[],}
            // Req.AnswerContainerNameList=[ServerId,STNo,OTNo]

            var AttributeContainerList = Req.AttributContainerList;
            var AttributeNodeIncondition = "(";
            for (var j = 0; j < AttributeContainerList.length; j++) {

                var AttributeId = "'" + AttributeContainerList[j] + "'";
                AttributeNodeIncondition += AttributeId;

                if ((AttributeContainerList.length - 1) != j) {
                    AttributeNodeIncondition += ",";
                }
            }
            AttributeNodeIncondition += ")";


            var AnswerList = Req.AnswerList;
            var AnswerIncondition = "(";
            for (var i = 0; i < AnswerList.length; i++) {
            
                var Answer = "'" + AnswerList[i] + "'";
                AnswerIncondition += Answer;

                if ((AnswerList.length - 1) != i) {
                    AnswerIncondition += ",";
                }
               
            }
            AnswerIncondition += ")";

            /*
            var AnswerContainerNameList = Req.AnswerContainerNameList;
            var AnswerIncondition = "(";
            for (var i = 0; i < ItemList.length; i++) {

                for (var j = 0; j < AnswerContainerNameList.length; j++) {
                    var AnswerContainerName = AnswerContainerNameList[j];
                    AnswerIncondition += AnswerList[i][AnswerContainerName];
                    if ((ItemList.length - 1) != i) {
                        AnswerIncondition += ",";
                    }
                }            
            }
            AnswerIncondition = ")";
            */


        

   
            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId , DataCaptureEntity.ClientGuid,DataCaptureEntity.IsCompleted AS IsDcCompleted, Drds1.AttributeNodeId , Drds1.Answer  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE Drds1.IsDisable !='true' AND Drds1.AttributeNodeId IN " + AttributeNodeIncondition + " AND Drds1.Answer IN " + AnswerIncondition + " ORDER BY DataCaptureId ";


            // alert('GetDcDataByItems Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            // alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.Debug("GetDcDataByItems end", "ItemDAO.GetDcDataByItems");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetDcDataByItems", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }

    this.GetDcDataByAttibuteAndAnswerByUserId = function (Req) {
        try {
            OneViewConsole.Debug("GetDcDataByAttibuteAndAnswerByUserId start", "ItemDAO.GetDcDataByAttibuteAndAnswerByUserId");
            //Req={AnswerContainerNameList:[],AttributeContainerList:[],}
            // Req.AnswerContainerNameList=[ServerId,STNo,OTNo]

            var AttributeContainerList = Req.AttributContainerList;
            var AttributeNodeIncondition = "(";
            for (var j = 0; j < AttributeContainerList.length; j++) {

                var AttributeId = "'" + AttributeContainerList[j] + "'";
                AttributeNodeIncondition += AttributeId;

                if ((AttributeContainerList.length - 1) != j) {
                    AttributeNodeIncondition += ",";
                }
            }
            AttributeNodeIncondition += ")";


            var AnswerList = Req.AnswerList;
            var AnswerIncondition = "(";
            for (var i = 0; i < AnswerList.length; i++) {

                var Answer = "'" + AnswerList[i] + "'";
                AnswerIncondition += Answer;

                if ((AnswerList.length - 1) != i) {
                    AnswerIncondition += ",";
                }

            }
            AnswerIncondition += ")";

            /*
            var AnswerContainerNameList = Req.AnswerContainerNameList;
            var AnswerIncondition = "(";
            for (var i = 0; i < ItemList.length; i++) {

                for (var j = 0; j < AnswerContainerNameList.length; j++) {
                    var AnswerContainerName = AnswerContainerNameList[j];
                    AnswerIncondition += AnswerList[i][AnswerContainerName];
                    if ((ItemList.length - 1) != i) {
                        AnswerIncondition += ",";
                    }
                }            
            }
            AnswerIncondition = ")";
            */

            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");



            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId , DataCaptureEntity.ClientGuid,DataCaptureEntity.IsCompleted AS IsDcCompleted, Drds1.AttributeNodeId , Drds1.Answer  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE DcResultsEntity.SystemUserId='" + LoginUserId + "' AND Drds1.IsDisable !='true' AND Drds1.AttributeNodeId IN " + AttributeNodeIncondition + " AND Drds1.Answer IN " + AnswerIncondition + " ORDER BY DataCaptureId ";


            // alert('GetDcDataByItems Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            // alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.Debug("GetDcDataByAttibuteAndAnswerByUserId end", "ItemDAO.GetDcDataByAttibuteAndAnswerByUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetDcDataByAttibuteAndAnswerByUserId", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }

    this.GetItemsbyProcess = function (TemplateId, ItemList) {
        try {
            OneViewConsole.Debug("GetItembyDcPlaceLabelDate start", "ItemDAO.GetItembyDcPlaceLabelDate");

            var DataType = ItemList[0].Type;
            var Incondition = "(";
            for (var i = 0; i < ItemList.length; i++) {

                Incondition += ItemList[i].ServerId;
                Incondition += (i <= ItemList.length - 2) ? "," : ")";
            }

            var Query = "SELECT * FROM ItemProcessMappingEntity WHERE DataId IN " + Incondition + " AND DataType = " + DataType + " AND ProcessId = " + TemplateId;
            
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);


            OneViewConsole.Debug("GetItembyDcPlaceLabelDate end", "ItemDAO.GetItembyDcPlaceLabelDate");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetItembyDcPlaceLabelDate", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetParentByIdAndType= function (DcPlaceId , Type) {
        try {
            OneViewConsole.Debug("GetParentByIdAndType start", "ItemDAO.GetParentByIdAndType");

            var ParentResult;

            var Query = "SELECT Left,Right FROM OrganizationAssetsNode WHERE ServerId = " + DcPlaceId;
            //alert('Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            if (Result != null && Result.length > 0) {

                var ParentQuery = "SELECT ServerId as Id , ChildDbElementName as Name FROM OrganizationAssetsNode WHERE Left <= " + Result[0].Left + " AND Right >= " + Result[0].Right + " AND ChildDbElementType = " + Type;
               // alert('ParentQuery : ' + ParentQuery);
                ParentResult = _OneViewSqlitePlugin.ExcecuteSqlReader(ParentQuery);
               // alert('ParentResult : ' + JSON.stringify(ParentResult));
            }

            OneViewConsole.Debug("GetParentByIdAndType end", "ItemDAO.GetParentByIdAndType");

            return ParentResult;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetParentByIdAndType", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetProducts = function (Req) {
        try {
            OneViewConsole.Debug("GetProducts start", "ItemDAO.GetProducts");

            var DcPlaceId = Req.DcPlaceId;
            var Type = Req.Type;
            var LabelId = Req.LabelId;
            var Date = Req.Date;
            var StartDateTime = Date + " 00:00:00";
            var EndDateTime = Date + " 23:59:59";
            var TemplateId = Req.TemplateId;
            var PONum = Req.PONum;
            /*
            var Query = "SELECT DISTINCT PO.* , ( PO.ItemCode || ' - ' || PO.ItemMasterName) AS Name, " +
                        "(PO.SupplierCode || '-' || PO.SupplierName) AS Supplier, " +                     
                        "(SUBSTR(PO.DeliveryDate, 7, 4) || SUBSTR(PO.DeliveryDate, 4, 2) || SUBSTR(PO.DeliveryDate, 1, 2) || SUBSTR(PO.DeliveryDate, 12, 2) ||  SUBSTR(PO.DeliveryDate, 15, 2) || SUBSTR(PO.DeliveryDate, 18, 2) ) AS DeliveryDate " +
                        " FROM PurchaseOrder PO " +
                        " INNER JOIN RcoMasterEntity RCO ON RCO.ServerId = PO.ItemMasterId " +
                        " WHERE PO.BusinessUnitId = " + DcPlaceId + " AND (-1 = " + PONum + " OR PO.PurchaseOrderNo=" + PONum + ")" +
                        " AND ( ('" + StartDateTime + "' <=  DeliveryDate  AND  DeliveryDate <= '" + EndDateTime + "' ) or  '' = DeliveryDate ) ";
            
            */
            var Query = "SELECT DISTINCT PO.Id as Id,PO.ClientGuid as ClientGuid ,PO.OSGuid,PO.OVGuid,PO.MobileVersionId,PO.Code,PO.Type,PO.BusinessUnitId,PO.BusinessUnitName," +
                        "PO.ItemMasterId as ServerId,PO.ItemMasterName,PO.ItemCode,PO.RcoTypeId,PO.PurchaseOrderNo,PO.PurchaseOrderType,PO.CompanyCode,PO.SupplierCode,PO.SupplierName,PO.RequestDate,PO.IsPOActive,PO.IsItemCompletedorInActive,PO.IsItemDCCompleted," +
                        "( PO.ItemCode || ' - ' || PO.ItemMasterName) AS Name, " +
                        "(PO.SupplierCode || '-' || PO.SupplierName) AS Supplier, " +
                        "(SUBSTR(PO.DeliveryDate, 7, 4) || SUBSTR(PO.DeliveryDate, 4, 2) || SUBSTR(PO.DeliveryDate, 1, 2) || SUBSTR(PO.DeliveryDate, 12, 2) ||  SUBSTR(PO.DeliveryDate, 15, 2) || SUBSTR(PO.DeliveryDate, 18, 2) ) AS DeliveryDate " +
                        " FROM PurchaseOrder PO " +
                        " INNER JOIN RcoMasterEntity RCO ON RCO.ServerId = PO.ItemMasterId " +
                        " WHERE PO.BusinessUnitId = " + DcPlaceId + " AND ('-1' = '" + PONum + "' OR PO.PurchaseOrderNo='" + PONum + "')";
                    //    " AND ( ('" + StartDateTime + "' <=  DeliveryDate  AND  DeliveryDate <= '" + EndDateTime + "' ) or  '' = DeliveryDate ) ";
            

            //alert('ItemDAO.GetProducts Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetProducts end", "ItemDAO.GetProducts");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetProducts", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetDcCountByPO = function (DataList, AttributeNodeId) {
        try {
            OneViewConsole.Debug("GetDcCountByPO start", "ItemDAO.GetDcCountByPO");

            var DcCount = 0;

            var Incondition = "(";
            for (var i = 0; i < DataList.length; i++) {
                Incondition += DataList[i].ServerId;
                Incondition += (i <= DataList.length - 2) ? "," : ")";
            }


            var Query = "SELECT count( DataCaptureEntity.Id ) As DcCount FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE Drds1.IsDisable !='true' AND Drds1.AttributeNodeId = " + AttributeNodeId + " AND Drds1.Answer IN " + Incondition;


             //alert('GetDcCountByPO Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

             //alert('Result : ' + JSON.stringify(Result));

             OneViewConsole.Debug("GetDcCountByPO end", "ItemDAO.GetDcCountByPO");

             if (Result != null && Result.length > 0) {
                 DcCount = Result[0].DcCount;
             }

             return DcCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetDcCountByPO", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }

    this.GetDcDataByDcIdList = function (Req) {
        try {
            OneViewConsole.Debug("GetDcDataByItems start", "ItemDAO.GetDcDataByItems");

           

            var DcIdList = Req.DcIdList;
            var DcIdListIncondition = FormatInCondition(DcIdList);
        

            var AttributeList = Req.AttributeList;
            var AttributeNodeIncondition = FormatInCondition(AttributeList);
         

            var AnswerInCondition = "";
            if (Req.AnswerLst != undefined) {
                if (Req.AnswerLst != "") {
                    var AnswerLst = Req.AnswerLst;
                    AnswerInCondition = " AND Answer IN ";
                    AnswerInCondition = FormatInCondition(AnswerLst);

                }
            }
   

            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId , DataCaptureEntity.ClientGuid,DataCaptureEntity.IsCompleted AS IsDcCompleted, Drds1.AttributeNodeId , Drds1.Answer  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE Drds1.IsDisable !='true' AND Drds1.AttributeNodeId IN " + AttributeNodeIncondition + " AND DataCaptureEntity.Id IN " + DcIdListIncondition + " " + AnswerInCondition + " ORDER BY DataCaptureId ";


             //alert('GetDcDataByItems Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

             //alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.Debug("GetDcDataByItems end", "ItemDAO.GetDcDataByItems");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetDcDataByItems", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }

    this.UpdateStatusInPO = function (Req) {
        try {
            OneViewConsole.Debug("UpdatePOActiveStatus start", "ItemDAO.UpdatePOActiveStatus");

            MyInstance.UpdatePOActiveInActiveStatus(Req);
  
            var ServerIdCondition = "";
          
            if ((Req.IsPOActive != 'false' && Req.IsPOActive != false)) {
                ServerIdCondition = " AND ItemMasterId='" + Req.ServerId + "'";
            }
         
            var Query = "UPDATE PurchaseOrder set IsItemCompletedorInActive='" + Req.IsItemCompletedorInActive + "',IsItemDCCompleted='" + Req.IsItemDCCompleted + "' " +
                        " WHERE PurchaseOrderNo='" + Req.PONum + "' " + ServerIdCondition + "";

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdatePOActiveStatus end", "ItemDAO.UpdatePOActiveStatus");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdatePOActiveStatus", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdatePOActiveInActiveStatus = function (Req) {
        try {
            OneViewConsole.Debug("UpdatePOActiveStatus start", "ItemDAO.UpdatePOActiveStatus");
                  
            var Query = "UPDATE PurchaseOrder set IsPOActive='" + Req.IsPOActive + "'"+
                        " WHERE PurchaseOrderNo='" + Req.PONum + "'";

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdatePOActiveStatus end", "ItemDAO.UpdatePOActiveStatus");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdatePOActiveStatus", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.DeletePurchaseOrderById = function (Req) {
        try {
            OneViewConsole.Debug("UpdatePOActiveStatus start", "ItemDAO.UpdatePOActiveStatus");

            //var IdList = Req.Id;
            var Incondition = "(";
            for (var i = 0; i < Req.length; i++) {
                Incondition += Req[i].Id;

                if ((Req.length - 1) !== i) {
                    Incondition += ",";
                }
            }
            Incondition += ")";

            var Query = "Delete FROM  PurchaseOrder WHERE Id IN " + Incondition;
           // alert(Query);

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdatePOActiveStatus end", "ItemDAO.UpdatePOActiveStatus");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdatePOActiveStatus", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.DeleteItemOrders = function (Req) {
        try {
            OneViewConsole.Debug("UpdatePOActiveStatus start", "ItemDAO.UpdatePOActiveStatus");
         
            var Result = Req.Result;
            var Incondition = "(";
            for (var i = 0; i < Result.length; i++) {
                Incondition += Result[i].ServerId;

                if ((Result.length - 1) !== i) {
                    Incondition += ",";
                }
            }
            Incondition += ")";

            var RCOMasterIdIncondition = "(";
            for (var i = 0; i < Result.length; i++) {
                RCOMasterIdIncondition += Result[i].RCOMasterId;

                if ((Result.length - 1) !== i) {
                    RCOMasterIdIncondition += ",";
                }
            }
            RCOMasterIdIncondition += ")";

            //var Query = "DELETE OrdrD,IPM,RLM " +
            //            " FROM  OrderDetails OrdrD " +
            //            " INNER JOIN ItemProcessMappingEntity IPM ON IPM.DataId = OrdrD.RCOMasterId  " +
            //            " INNER JOIN RcoAndLabelMapping RLM ON RLM.RCOMasterId = OrdrD.RCOMasterId " +
            //            " WHERE (-1=" + Req.DCPlaceNodeId + " OR  OrdrD.ReceiverBUId=" + Req.DCPlaceNodeId + ") "+
            //            //AND (-1=" + Req.TemplateId + " OR  IPM.ProcessId=" + Req.TemplateId + ")" +
            //            " AND OrdrD.ServerId IN  " + Incondition + "" +
            //            " ORDER By OrdrD.RCOMasterId";

            var Query = "DELETE  FROM  OrderDetails WHERE ServerId IN" + Incondition;          
            _OneViewSqlitePlugin.ExcecuteSql(Query);


            //var ItemProcessMappingEntityQuery = "DELETE  FROM  ItemProcessMappingEntity WHERE DataId IN" + RCOMasterIdIncondition;
            //_OneViewSqlitePlugin.ExcecuteSql(ItemProcessMappingEntityQuery);

            var RcoAndLabelMappingQuery = "DELETE  FROM  RcoAndLabelMapping WHERE RCOMasterId IN" + RCOMasterIdIncondition;
            _OneViewSqlitePlugin.ExcecuteSql(RcoAndLabelMappingQuery);

            OneViewConsole.Debug("UpdatePOActiveStatus end", "ItemDAO.UpdatePOActiveStatus");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdatePOActiveStatus", Excep);
        }
        finally {
            Query = null;
        }
    }


    var FormatInCondition = function (List) {
        try {
            OneViewConsole.Debug("FormatInCondition start", "ItemDAO.FormatInCondition");


          
            var Incondition = "(";
            for (var j = 0; j < List.length; j++) {
                Incondition += List[j];

                if ((List.length - 1) !== j) {
                    Incondition += ",";
                }
            }
            Incondition += ")";


            return Incondition;
            OneViewConsole.Debug("FormatInCondition end", "ItemDAO.FormatInCondition");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.FormatInCondition", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetDcDataByItemsForMultipleAttribute = function (ItemList, AttributeNodeIdLst) {
        try {
            OneViewConsole.Debug("GetDcDataByItemsForMultipleAttribute start", "ItemDAO.GetDcDataByItemsForMultipleAttribute");
        
            var Incondition = "(";
            for (var i = 0; i < ItemList.length; i++) {
                if (ItemList[i].PurchaseOrderNo === undefined) {
                    Incondition += "'" + ItemList[i].WorkOrderNo + "',";
                }
                else {
                    Incondition += "'" + ItemList[i].PurchaseOrderNo + "',";
                }
                Incondition += ItemList[i].ServerId;
                Incondition += (i <= ItemList.length - 2) ? "," : ")";
            }

            var AttributeIdLst = [];
            if (AttributeNodeIdLst != "") {
           
                AttributeIdLst = FormatInCondition(AttributeNodeIdLst);

            }

            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId , DataCaptureEntity.ClientGuid,DataCaptureEntity.IsCompleted AS IsDcCompleted, Drds1.AttributeNodeId , Drds1.Answer  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE Drds1.IsDisable !='true' AND Drds1.AttributeNodeId IN " + AttributeIdLst + " AND Drds1.Answer IN " + Incondition;


            // alert('GetDcDataByItemsForSingleAttribute Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            // alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.Debug("GetDcDataByItemsForMultipleAttribute end", "ItemDAO.GetDcDataByItemsForMultipleAttribute");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetDcDataByItemsForMultipleAttribute", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }

    this.GetDcDataByItemsForMultipleAttributeByUserId = function (ItemList, AttributeNodeIdLst) {
        try {
            OneViewConsole.Debug("GetDcDataByItemsForMultipleAttributeByUserId start", "ItemDAO.GetDcDataByItemsForMultipleAttributeByUserId");

            var Incondition = "(";
            for (var i = 0; i < ItemList.length; i++) {
                if (ItemList[i].PurchaseOrderNo === undefined) {
                    Incondition += "'" + ItemList[i].WorkOrderNo + "',";
                }
                else {
                    Incondition += "'" + ItemList[i].PurchaseOrderNo + "',";
                }
                Incondition += ItemList[i].ServerId;
                Incondition += (i <= ItemList.length - 2) ? "," : ")";
            }

            var AttributeIdLst = [];
            if (AttributeNodeIdLst != "") {

                AttributeIdLst = FormatInCondition(AttributeNodeIdLst);

            }

            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId , DataCaptureEntity.ClientGuid,DataCaptureEntity.IsCompleted AS IsDcCompleted, Drds1.AttributeNodeId , Drds1.Answer  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE DcResultsEntity.SystemUserId='" + LoginUserId + "' AND Drds1.IsDisable !='true' AND Drds1.AttributeNodeId IN " + AttributeIdLst + " AND Drds1.Answer IN " + Incondition;


            // alert('GetDcDataByItemsForSingleAttribute Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            // alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.Debug("GetDcDataByItemsForMultipleAttributeByUserId end", "ItemDAO.GetDcDataByItemsForMultipleAttributeByUserId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetDcDataByItemsForMultipleAttributeByUserId", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }

    /*WorkOrderNo Data Code Start*/

    this.GetProductsForWorkOrderNo = function (Req) {
        try {
            OneViewConsole.Debug("GetProducts start", "ItemDAO.GetProducts");

            var DcPlaceId = Req.DcPlaceId;
            var Type = Req.Type;
            var LabelId = Req.LabelId;
            var Date = Req.Date;
            var StartDateTime = Date + " 00:00:00";
            var EndDateTime = Date + " 23:59:59";
            var TemplateId = Req.TemplateId;
            var WorkOrderNum = Req.WorkOrderNum;

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();
            var StartDateValidity = '-24 Hours';
            var EndDateValidity = '4 Hours';
            var ReqObj = { "TemplateId": OneViewSessionStorage.Get("TemplateId") };
           // var StartDateEndDateConfiguration = MyInstance.GetStartDateAnEndDateConfiguration(ReqObj);
            // var StartDateEndDateConfiguration = {StartDate:'-24',EndDate:'+4'};
           // StartDateValidity = StartDateEndDateConfiguration.StartDate + ' Hours';
           // EndDateValidity = StartDateEndDateConfiguration.EndDate + ' Hours';


            var Query = "SELECT DISTINCT WrkOrdrD.Id AS Id,WrkOrdrD.ServerId AS ServerId," +
                        "WrkOrdrD.OSGuid,WrkOrdrD.OVGuid,WrkOrdrD.BusinessUnitId,WrkOrdrD.BusinessUnitName,WrkOrdrD.BusinessUnitCode," +
                        "WrkOrdrD.SectionId,WrkOrdrD.SectionName,WrkOrdrD.SectionCode,WrkOrdrD.WorkOrderNo," +
                        "WrkOrdrD.ItemMasterId AS ItemMasterId,WrkOrdrD.ItemMasterName," +
                        //"( WrkOrdrD.ItemMasterCode || ' - ' || WrkOrdrD.ItemMasterName) AS Name," +
                        "CASE WHEN WrkOrdrD.RequiredQuantity=='' then ( WrkOrdrD.ItemMasterCode || ' - ' || WrkOrdrD.ItemMasterName ) " +
                        "ELSE (WrkOrdrD.ItemMasterCode || ' - ' || WrkOrdrD.ItemMasterName ||' (' ||WrkOrdrD.RequiredQuantity || ')' ) " +
                        "END AS Name, " +
                        "WrkOrdrD.ItemMasterCode," +
                        "WrkOrdrD.ParentItemMasterId,WrkOrdrD.ParentItemMasterName  ,WrkOrdrD.ParentItemMasterCode," +
                        "WrkOrdrD.Sector,WrkOrdrD.AirlineId ,WrkOrdrD.AirlineName,WrkOrdrD.FlightId,WrkOrdrD.FlightName," +
                        "WrkOrdrD.Class,WrkOrdrD.MealTypeName ,WrkOrdrD.RequiredQuantity,WrkOrdrD.UOM,WrkOrdrD.Status,WrkOrdrD.CompanyMasterId AS CompanyMasterId," +
                        //StartDate StartDate(-24 hr)
                        //"(SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + StartDateValidity + "')) ,1,4) ||" +
                        //"SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + StartDateValidity + "')) ,6,2) ||" +
                        //"SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + StartDateValidity + "')) ,9,2) ||" +
                        //"SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + StartDateValidity + "')) ,12,2) ||" +
                        //"SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + StartDateValidity + "')) ,15,2) ||" +
                        //"SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) ,  '" + StartDateValidity + "')) ,18,2) ) as DStartDate," +
                        //StartDate EndDate(+4 hr)
                        //"(SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,1,4) ||" +
                        //"SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,6,2) ||" +
                        //"SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,9,2) ||" +
                        //"SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,12,2) ||" +
                        //"SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,15,2) ||" +
                        //"SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,18,2) ) as DEndDate," +
                        "WrkOrdrD.RequestDate AS RequestDate,WrkOrdrD.StartDate AS StartDate,WrkOrdrD.ParentInfo AS ParentInfo," +
                        //"(SUBSTR('" + StartDateTime + "', 7, 4) || SUBSTR('" + StartDateTime + "', 4, 2) || SUBSTR('" + StartDateTime + "', 1, 2) || SUBSTR('" + StartDateTime + "', 12, 2) ||  SUBSTR('" + StartDateTime + "', 15, 2) || SUBSTR('" + StartDateTime + "', 18, 2) ) AS OrderStartDate ," +
                        "(SUBSTR(WrkOrdrD.StartDate, 7, 4) || SUBSTR(WrkOrdrD.StartDate, 4, 2) || SUBSTR(WrkOrdrD.StartDate, 1, 2) || SUBSTR(WrkOrdrD.StartDate, 12, 2) ||  SUBSTR(WrkOrdrD.StartDate, 15, 2) || SUBSTR(WrkOrdrD.StartDate, 18, 2) ) AS StartDate1 " +
                        " FROM  WorkOrderItemDetails WrkOrdrD " +
                        " WHERE WrkOrdrD.SectionId = " + DcPlaceId + " AND ('-1' = '" + WorkOrderNum + "' OR WrkOrdrD.WorkOrderNo='" + WorkOrderNum + "')"+
                        //" AND ( (   OrderStartDate <= StartDate1  AND    StartDate1 <=DEndDate ) or  '' = StartDate ) " +
                        " ORDER By WrkOrdrD.ServerId";


            //alert('ItemDAO.GetProducts Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetProducts end", "ItemDAO.GetProducts");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetProducts", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateItemStatusForWorkOrderNo = function (Req) {
        try {
            OneViewConsole.Debug("UpdateItemStatusForWorkOrderNo start", "ItemDAO.UpdateItemStatusForWorkOrderNo");

            //var ServerIdCondition = "";

            ////if ((Req.IsPOActive != 'false' && Req.IsPOActive != false)) {
            //    ServerIdCondition = " AND ItemMasterId='" + Req.ServerId + "'";
            ////}

            var Query = "UPDATE WorkOrderItemDetails set Status='" + Req.ItemStatus + "' " +
                        " WHERE ServerId='" + Req.ServerId + "'";

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateItemStatusForWorkOrderNo end", "ItemDAO.UpdateItemStatusForWorkOrderNo");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdateItemStatusForWorkOrderNo", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.DeleteWorkOrderItems = function (Req) {
        try {
            OneViewConsole.Debug("DeleteWorkOrderItems start", "ItemDAO.DeleteWorkOrderItems");

            var Result = Req;
            var Incondition = "(";
            for (var i = 0; i < Result.length; i++) {
                Incondition += Result[i].Id;

                if ((Result.length - 1) !== i) {
                    Incondition += ",";
                }
            }
            Incondition += ")";    
         

            var Query = "DELETE  FROM  WorkOrderItemDetails WHERE Id IN" + Incondition;
            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteWorkOrderItems end", "ItemDAO.DeleteWorkOrderItems");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.DeleteWorkOrderItems", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetWorkOrderNo = function (Req) {
        try {
            OneViewConsole.Debug("GetProducts start", "ItemDAO.GetProducts");

            var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
            var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();
            var StartDateValidity = '-24 Hours';
            var EndDateValidity = '4 Hours';
      
            // debugger;
            var Query = "SELECT Distinct WorkOrderNo as WorkOrderNo," +
                       //StartDate StartDate(-24 hr)
                       "(SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + StartDateValidity + "')) ,1,4) ||" +
                       "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + StartDateValidity + "')) ,6,2) ||" +
                       "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + StartDateValidity + "')) ,9,2) ||" +
                       "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + StartDateValidity + "')) ,12,2) ||" +
                       "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + StartDateValidity + "')) ,15,2) ||" +
                       "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) ,  '" + StartDateValidity + "')) ,18,2) ) as DStartDate," +
                       //StartDate EndDate(+4 hr)
                       "(SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,1,4) ||" +
                       "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,6,2) ||" +
                       "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,9,2) ||" +
                       "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,12,2) ||" +
                       "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,15,2) ||" +
                       "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '" + EndDateValidity + "')) ,18,2) ) as DEndDate," +
                       "WrkOrdrD.RequestDate AS RequestDate,WrkOrdrD.StartDate AS StartDate,WrkOrdrD.ParentInfo AS ParentInfo," +
                       "(SUBSTR(WrkOrdrD.StartDate, 7, 4) || SUBSTR(WrkOrdrD.StartDate, 4, 2) || SUBSTR(WrkOrdrD.StartDate, 1, 2) || SUBSTR(WrkOrdrD.StartDate, 12, 2) ||  SUBSTR(WrkOrdrD.StartDate, 15, 2) || SUBSTR(WrkOrdrD.StartDate, 18, 2) ) AS StartDate1 " +
                       " FROM  WorkOrderItemDetails WrkOrdrD " +
                       " WHERE WrkOrdrD.SectionId = " + DcPlaceId +
                       " AND ( (   DStartDate <= StartDate1  AND    StartDate1 <=DEndDate ) or  '' = StartDate ) " +
                       " ORDER By WrkOrdrD.ItemMasterId";


            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetProducts end", "ItemDAO.GetProducts");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetProducts", Excep);
        }
        finally {
            Query = null;
        }
    }


    this.GetStartDateAnEndDateConfiguration = function (Req) {
        var StartDateEndDateConfiguration = {StartDate:'-24',EndDate:'+4',GrabageCollectorDate:'-32'};
        try {
            OneViewConsole.Debug("GetStartDateConfiguration start", "LandingPageFacade.GetStartDateConfiguration");
            var IsSuccess = false;
       
            var _MobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();
            var Result = _MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), "ScrollListItemDAO", "GetWorkOrderItemDetailsTimeConfiguration");
            //alert("Result : " + JSON.stringify(Result));

            if (Result.length > 0) {

                var BusinessEventHandlers = Result[0].BusinessEventHandlers[0];
                var TimeConfiguration = JSON.parse(BusinessEventHandlers.BusinessEventEvaluatorObjectKey);
                var TemplateId = Req.TemplateId;

                for (var i = 0; i < TimeConfiguration.length; i++) {

                    if (TimeConfiguration[i].TemplateId == TemplateId) {

                        StartDateEndDateConfiguration.StartDate = TimeConfiguration[i].StartTime;
                        StartDateEndDateConfiguration.EndDate = TimeConfiguration[i].EndTime;
                        StartDateEndDateConfiguration.GrabageCollectorDate = TimeConfiguration[i].GrabageCollectorDate;

                    }
                }
                
            }
            

            OneViewConsole.Debug("GetStartDateConfiguration end", "LandingPageFacade.GetStartDateConfiguration");

            return StartDateEndDateConfiguration;
          //  return IsSuccess;
        }
        catch (Excep) {
            return StartDateEndDateConfiguration;
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.GetStartDateConfiguration", xlatService);
        }
        
    }

    /*WorkOrderNo Data Code End*/
    /*FlightBeltPlanDetails Data Code Start*/

    this.GetFlightBeltPlanDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetProducts start", "ItemDAO.GetProducts");

            var DcPlaceId = Req.DcPlaceId;
            var Type = Req.Type;
            var LabelId = Req.LabelId;
            var Date = Req.Date;
            var StartDateTime = Date + " 00:00:00";
            var EndDateTime = Date + " 23:59:59";
            var TemplateId = Req.TemplateId;
            var AirlineName = Req.AirlineName;

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();
            var StartDateValidity = '-24 Hours';
            var EndDateValidity = '4 Hours';
            var ReqObj = { "TemplateId": OneViewSessionStorage.Get("TemplateId") };
            // var StartDateEndDateConfiguration = MyInstance.GetStartDateAnEndDateConfiguration(ReqObj);
            // var StartDateEndDateConfiguration = {StartDate:'-24',EndDate:'+4'};
            // StartDateValidity = StartDateEndDateConfiguration.StartDate + ' Hours';
            // EndDateValidity = StartDateEndDateConfiguration.EndDate + ' Hours';


            var Query = "SELECT DISTINCT Id,ServerId," +
                       "Airline,(FlightNo || ' - ' || UPLift|| ' - ' || Class)  As Name,FlightNo,AircraftType,Regn,SDD,ETD,FlightPlanFrom," +
                       "FlightPlanTo,FCONo,Rev,Class,Config,Load,Normal,SPMLTotal," +
                       "SPML,CompanyName,CompanyId,BeltName,BeltId,UPLift" +
                       //"(SUBSTR(WrkOrdrD.StartDate, 7, 4) || SUBSTR(WrkOrdrD.StartDate, 4, 2) || SUBSTR(WrkOrdrD.StartDate, 1, 2) || SUBSTR(WrkOrdrD.StartDate, 12, 2) ||  SUBSTR(WrkOrdrD.StartDate, 15, 2) || SUBSTR(WrkOrdrD.StartDate, 18, 2) ) AS StartDate1 " +
                       " FROM  FlightBeltPlanDetails  " +
                       " WHERE BeltId = " + DcPlaceId +
                       " ORDER By ServerId";


            //alert('ItemDAO.GetProducts Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetProducts end", "ItemDAO.GetProducts");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetProducts", Excep);
        }
        finally {
            Query = null;
        }
    }

  
    this.UpdateItemStatusForFlightBeltPlanDetails = function (Req) {
        try {
            OneViewConsole.Debug("UpdateItemStatusForFlightBeltPlanDetails start", "ItemDAO.UpdateItemStatusForFlightBeltPlanDetails");
         

            var Query = "UPDATE FlightBeltPlanDetails set Status='" + Req.ItemStatus + "' " +
                        " WHERE ServerId='" + Req.ServerId + "'";

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateItemStatusForFlightBeltPlanDetails end", "ItemDAO.UpdateItemStatusForFlightBeltPlanDetails");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdateItemStatusForFlightBeltPlanDetails", Excep);
        }
        finally {
            Query = null;
        }
    }

    /*FlightBeltPlanDetails Data Code end*/


    /*FlightCellPlanDetails Data Code Start*/

    this.GetFlightCellPlanDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetFlightCellPlanDetails start", "ItemDAO.GetFlightCellPlanDetails");

            var DcPlaceId = Req.DcPlaceId;
            var Type = Req.Type;
            var LabelId = Req.LabelId;
            var Date = Req.Date;
            var StartDateTime = Date + " 00:00:00";
            var EndDateTime = Date + " 23:59:59";
            var TemplateId = Req.TemplateId;
            var AirlineName = Req.AirlineName;

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();
            var StartDateValidity = '-24 Hours';
            var EndDateValidity = '4 Hours';
            var ReqObj = { "TemplateId": OneViewSessionStorage.Get("TemplateId") };
            // var StartDateEndDateConfiguration = MyInstance.GetStartDateAnEndDateConfiguration(ReqObj);
            // var StartDateEndDateConfiguration = {StartDate:'-24',EndDate:'+4'};
            // StartDateValidity = StartDateEndDateConfiguration.StartDate + ' Hours';
            // EndDateValidity = StartDateEndDateConfiguration.EndDate + ' Hours';


            var Query = "SELECT DISTINCT Id,ServerId," +
                       "Airline,(FlightNo || ' - ' || UPLift || ' - ' || Class)  As Name,FlightNo,AircraftType,Regn,SDD,ETD,FlightPlanFrom," +
                       "FlightPlanTo,FCONo,Rev,Class,Config,Load,Normal,SPMLTotal," +
                       "SPML,CompanyName,CompanyId,CellName,CellId,UPLift" +
                       //"(SUBSTR(WrkOrdrD.StartDate, 7, 4) || SUBSTR(WrkOrdrD.StartDate, 4, 2) || SUBSTR(WrkOrdrD.StartDate, 1, 2) || SUBSTR(WrkOrdrD.StartDate, 12, 2) ||  SUBSTR(WrkOrdrD.StartDate, 15, 2) || SUBSTR(WrkOrdrD.StartDate, 18, 2) ) AS StartDate1 " +
                       " FROM  FlightCellPlanDetails  " +
                       " WHERE CellId = " + DcPlaceId +
                       " ORDER By ServerId";


            //alert('ItemDAO.GetProducts Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetFlightCellPlanDetails end", "ItemDAO.GetFlightCellPlanDetails");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetFlightCellPlanDetails", Excep);
        }
        finally {
            Query = null;
        }
    }


    this.UpdateItemStatusForFlightCellPlanDetails = function (Req) {
        try {
            OneViewConsole.Debug("UpdateItemStatusForFlightCellPlanDetails start", "ItemDAO.UpdateItemStatusForFlightCellPlanDetails");


            var Query = "UPDATE FlightCellPlanDetails set Status='" + Req.ItemStatus + "' " +
                        " WHERE ServerId='" + Req.ServerId + "'";

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateItemStatusForFlightCellPlanDetails end", "ItemDAO.UpdateItemStatusForFlightCellPlanDetails");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdateItemStatusForFlightCellPlanDetails", Excep);
        }
        finally {
            Query = null;
        }
    }

    /*FlightBeltPlanDetails Data Code end*/


    /*FlightOLAPlanDetails Data Code Start*/

    this.GetFlightOLAPlanDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetFlightOLAPlanDetails start", "ItemDAO.GetFlightOLAPlanDetails");

            var DcPlaceId = Req.DcPlaceId;
            var Type = Req.Type;
            var LabelId = Req.LabelId;
            var Date = Req.Date;
            var StartDateTime = Date + " 00:00:00";
            var EndDateTime = Date + " 23:59:59";
            var TemplateId = Req.TemplateId;
            var AirlineName = Req.AirlineName;

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();
            var StartDateValidity = '-24 Hours';
            var EndDateValidity = '4 Hours';
            var ReqObj = { "TemplateId": OneViewSessionStorage.Get("TemplateId") };
            // var StartDateEndDateConfiguration = MyInstance.GetStartDateAnEndDateConfiguration(ReqObj);
            // var StartDateEndDateConfiguration = {StartDate:'-24',EndDate:'+4'};
            // StartDateValidity = StartDateEndDateConfiguration.StartDate + ' Hours';
            // EndDateValidity = StartDateEndDateConfiguration.EndDate + ' Hours';


            var Query = "SELECT DISTINCT PickList.Id,PickList.ServerId as ServerId,PickList.ItemName as ItemName,(PickList.ITEMCode || ' - ' || PickList.ItemName)  As Name," +
                       "OAL.Airline,OAL.FlightNo,OAL.AircraftType,OAL.Regn,OAL.SDD,OAL.ETD,OAL.FlightPlanFrom," +
                       "OAL.FlightPlanTo,OAL.FCONo,OAL.Rev,OAL.Class,OAL.Config,OAL.Load,OAL.Normal,OAL.SPMLTotal," +
                       "OAL.SPML,OAL.CompanyName,OAL.CompanyId,OAL.CellName,OAL.CellId,OAL.UPLift" +
                       //"(SUBSTR(WrkOrdrD.StartDate, 7, 4) || SUBSTR(WrkOrdrD.StartDate, 4, 2) || SUBSTR(WrkOrdrD.StartDate, 1, 2) || SUBSTR(WrkOrdrD.StartDate, 12, 2) ||  SUBSTR(WrkOrdrD.StartDate, 15, 2) || SUBSTR(WrkOrdrD.StartDate, 18, 2) ) AS StartDate1 " +
                       " FROM  FlightOALPlanDetails OAL " +
                       " INNER JOIN  PickListMasterDetails PickList " +
                       " ON  PickList.FlightPlanId=OAL.ServerId" +
                       " AND  PickList.FlightPlanType=OAL.Type" +
                       " WHERE OAL.FlightId = " + DcPlaceId +
                       " ORDER By ServerId";


            //alert('ItemDAO.GetProducts Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetFlightOLAPlanDetails end", "ItemDAO.GetFlightOLAPlanDetails");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetFlightOLAPlanDetails", Excep);
        }
        finally {
            Query = null;
        }
    }


    this.UpdateItemStatusForFlightOLAPlanDetails = function (Req) {
        try {
            OneViewConsole.Debug("UpdateItemStatusForFlightOLAPlanDetails start", "ItemDAO.UpdateItemStatusForFlightOLAPlanDetails");


            var Query = "UPDATE PickListMasterDetails set Status='" + Req.ItemStatus + "' " +
                        " WHERE ServerId='" + Req.ServerId + "'";

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateItemStatusForFlightOLAPlanDetails end", "ItemDAO.UpdateItemStatusForFlightOLAPlanDetails");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdateItemStatusForFlightOLAPlanDetails", Excep);
        }
        finally {
            Query = null;
        }
    }

    /*FlightBeltPlanDetails Data Code end*/

    /*ASOWorkOrderDetails Data Code Start*/

    this.GetASOWorkOrderDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetProducts start", "ItemDAO.GetProducts");

            var DcPlaceId = Req.DcPlaceId;
            var Type = Req.Type;
            var LabelId = Req.LabelId;
            var Date = Req.Date;
            var StartDateTime = Date + " 00:00:00";
            var EndDateTime = Date + " 23:59:59";
            var TemplateId = Req.TemplateId;
            var AirlineName = Req.AirlineName;

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();
            var StartDateValidity = '-24 Hours';
            var EndDateValidity = '4 Hours';
            var ReqObj = { "TemplateId": OneViewSessionStorage.Get("TemplateId") };
            // var StartDateEndDateConfiguration = MyInstance.GetStartDateAnEndDateConfiguration(ReqObj);
            // var StartDateEndDateConfiguration = {StartDate:'-24',EndDate:'+4'};
            // StartDateValidity = StartDateEndDateConfiguration.StartDate + ' Hours';
            // EndDateValidity = StartDateEndDateConfiguration.EndDate + ' Hours';


            var Query = "SELECT DISTINCT Id,ServerId ,OSGuid ,OVGuid,MobileVersionId ,Type ,AirlineId ,(ItemCode || ' - ' || ItemName)  As Name," +
                        "Airline,FlightId ,FlightNo,Sector,Class,ItemCode,ItemName,MealType ,DespatchGroup," +
                        "ETA , ETD ,WorkOrderFrom ,WorkOrderTo,IsChecked ,IsNC,CompanyId ,CompanyName "+                      
                       " FROM  ASOWorkOrderDetails  " +
                       " WHERE FlightId = " + DcPlaceId +
                       " ORDER By ServerId";


            //alert('ItemDAO.GetProducts Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetProducts end", "ItemDAO.GetProducts");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetProducts", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateItemStatusForASOWorkOrderDetails = function (Req) {
        try {
            OneViewConsole.Debug("UpdateItemStatusForASOWorkOrderDetails start", "ItemDAO.UpdateItemStatusForASOWorkOrderDetails");


            var Query = "UPDATE ASOWorkOrderDetails set Status='" + Req.ItemStatus + "' " +
                        " WHERE ServerId='" + Req.ServerId + "'";
            //alert(Query)

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateItemStatusForASOWorkOrderDetails end", "ItemDAO.UpdateItemStatusForASOWorkOrderDetails");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdateItemStatusForASOWorkOrderDetails", Excep);
        }
        finally {
            Query = null;
        }
    }

    /*ASOWorkOrderDetails Data Code end*/


    /*RFLWorkOrder Data Code Start*/

    this.GetRFLWorkOrderDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetProducts start", "ItemDAO.GetProducts");

            var DcPlaceId = Req.DcPlaceId;
            var Type = Req.Type;
            var LabelId = Req.LabelId;
            var Date = Req.Date;
            var StartDateTime = Date + " 00:00:00";
            var EndDateTime = Date + " 23:59:59";
            var TemplateId = Req.TemplateId;
            var AirlineName = Req.AirlineName;
            var ServiceDate = Req.ServiceDate;
            var CurrentStatus = Req.CurrentStatus;

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();
            var StartDateValidity = '-24 Hours';
            var EndDateValidity = '4 Hours';
            var ReqObj = { "TemplateId": OneViewSessionStorage.Get("TemplateId") };
             // var StartDateEndDateConfiguration = MyInstance.GetStartDateAnEndDateConfiguration(ReqObj);
            // var StartDateEndDateConfiguration = {StartDate:'-24',EndDate:'+4'};
            // StartDateValidity = StartDateEndDateConfiguration.StartDate + ' Hours';
            // EndDateValidity = StartDateEndDateConfiguration.EndDate + ' Hours';
            var oServiceDate = oDateTime.ConvertDateToIntegerFormat(ServiceDate);
            // alert(oServiceDate);
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");


            var Query = "SELECT DISTINCT Id,ServerId ,OSGuid,OVGuid,MobileVersionId,(ItemName ||' (' ||Quantity|| ')' )  As Name,(ItemName ||' (' ||Quantity|| ')' )  As WorkOrderNo," +
                        "WardId,ItemName,ItemId,OrderTypeId,OrderTypeName,DietCode,Allergens,ServiceDate,Quantity,OrderDetails,PackedQuantity,PackedDetails,PackedRemarks," +
                        "CookedQuantity , CookedDate ,CookedRemarks,CookedDetails ,DeliveredQuantity ,DeliveredDetails ,CreatedDate,OrderStatus ,CurrentStatus,TimeStamp, " +
                       "(SUBSTR(ServiceDate, 7, 4) || SUBSTR(ServiceDate, 4, 2) || SUBSTR(ServiceDate, 1, 2) || SUBSTR(ServiceDate, 12, 2) ||  SUBSTR(ServiceDate, 15, 2) || SUBSTR(ServiceDate, 18, 2) ) AS ServiceDateInt " +
                       " FROM  RFLWorkOrder  " +
                       " WHERE WardId = " + DcPlaceId +                    
                       " And CAST(ServiceDateInt as INTEGER) =" + oServiceDate +
                       " And UPPER(CurrentStatus)='" + CurrentStatus + "'" +
                       " And Column1='" + LoginUserId + "'" + //Column1 userid will insert
                       " ORDER By ServerId";


           // alert('ItemDAO.GetRFLWorkOrderDetails Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetProducts end", "ItemDAO.GetProducts");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetProducts", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateItemStatusForRFLWorkOrderDetails = function (Req) {
        try {
            OneViewConsole.Debug("UpdateItemStatusForRFLWorkOrderDetails start", "ItemDAO.UpdateItemStatusForRFLWorkOrderDetails");

            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var Query = "UPDATE RFLWorkOrder set Status='" + Req.ItemStatus + "' " +
                        " WHERE ServerId='" + Req.ServerId + "' And Column1='" + LoginUserId + "' ";
            //alert(Query)

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateItemStatusForRFLWorkOrderDetails end", "ItemDAO.UpdateItemStatusForRFLWorkOrderDetails");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdateItemStatusForASOWorkOrderDetails", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetDistinctRFLServiceWorkOrderDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetProducts start", "ItemDAO.GetProducts");

            var DcPlaceId = Req.DcPlaceId;
            var Type = Req.Type;
            var LabelId = Req.LabelId;
            var Date = Req.Date;
            var StartDateTime = Date + " 00:00:00";
            var EndDateTime = Date + " 23:59:59";
            var TemplateId = Req.TemplateId;
            var AirlineName = Req.AirlineName;
            var ServiceDate = Req.ServiceDate;
            var CurrentStatus = Req.CurrentStatus;

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();
            var StartDateValidity = '-24 Hours';
            var EndDateValidity = '4 Hours';
            var ReqObj = { "TemplateId": OneViewSessionStorage.Get("TemplateId") };
            // var StartDateEndDateConfiguration = MyInstance.GetStartDateAnEndDateConfiguration(ReqObj);
            // var StartDateEndDateConfiguration = {StartDate:'-24',EndDate:'+4'};
            // StartDateValidity = StartDateEndDateConfiguration.StartDate + ' Hours';
            // EndDateValidity = StartDateEndDateConfiguration.EndDate + ' Hours';
            var oServiceDate = oDateTime.ConvertDateToIntegerFormat(ServiceDate);
            // alert(oServiceDate);
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var Query = "SELECT DISTINCT BedId as ServerId,BedName  As Name,BedName  As WorkOrderNo," +                    
                       "(SUBSTR(ServiceDate, 7, 4) || SUBSTR(ServiceDate, 4, 2) || SUBSTR(ServiceDate, 1, 2) || SUBSTR(ServiceDate, 12, 2) ||  SUBSTR(ServiceDate, 15, 2) || SUBSTR(ServiceDate, 18, 2) ) AS ServiceDateInt " +
                       " FROM  RFLServiceWorkOrder  " +
                       " WHERE WardId = " + DcPlaceId +
                       " And CAST(ServiceDateInt as INTEGER) =" + oServiceDate +
                       " And Column1='" + LoginUserId + "'" +
                      // " And UPPER(CurrentStatus)='" + CurrentStatus + "'" +
                       " ORDER By ServerId";


            // alert('ItemDAO.GetRFLWorkOrderDetails Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetProducts end", "ItemDAO.GetProducts");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetProducts", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetRFLServiceWorkOrderDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetRFLServiceWorkOrderDetails start", "ItemDAO.GetRFLServiceWorkOrderDetails");

            var DcPlaceId = Req.DcPlaceId;
            var Type = Req.Type;
            var LabelId = Req.LabelId;
            var Date = Req.Date;
            var StartDateTime = Date + " 00:00:00";
            var EndDateTime = Date + " 23:59:59";
            var TemplateId = Req.TemplateId;
            var AirlineName = Req.AirlineName;
            var ServiceDate = Req.ServiceDate;
            var CurrentStatus = Req.CurrentStatus;

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();
            var StartDateValidity = '-24 Hours';
            var EndDateValidity = '4 Hours';
            var ReqObj = { "TemplateId": OneViewSessionStorage.Get("TemplateId") };
            // var StartDateEndDateConfiguration = MyInstance.GetStartDateAnEndDateConfiguration(ReqObj);
            // var StartDateEndDateConfiguration = {StartDate:'-24',EndDate:'+4'};
            // StartDateValidity = StartDateEndDateConfiguration.StartDate + ' Hours';
            // EndDateValidity = StartDateEndDateConfiguration.EndDate + ' Hours';
            var oServiceDate = oDateTime.ConvertDateToIntegerFormat(ServiceDate);
            // alert(oServiceDate);
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");


            var Query = "SELECT DISTINCT Id,ClientGuid,ServerId ,OSGuid,OVGuid,MobileVersionId,Type,WardId,WardName,BedId,BedName,ItemId,ItemName," +
                        "OrderTypeId,OrderTypeName,ServiceDate,Quantity,OrderStatus,Code,Column1,Column2,Column3,Column4,Column5,Column6,Column7,Column8,Column9,Column10,Status,TimeStamp," +
                       "(SUBSTR(ServiceDate, 7, 4) || SUBSTR(ServiceDate, 4, 2) || SUBSTR(ServiceDate, 1, 2) || SUBSTR(ServiceDate, 12, 2) ||  SUBSTR(ServiceDate, 15, 2) || SUBSTR(ServiceDate, 18, 2) ) AS ServiceDateInt " +
                       " FROM  RFLServiceWorkOrder  " +
                       " WHERE WardId = " + DcPlaceId +
                       " And CAST(ServiceDateInt as INTEGER) =" + oServiceDate +
                       " And Column1='" + LoginUserId + "'" +
                      // " And UPPER(CurrentStatus)='" + CurrentStatus + "'" +
                       " ORDER By ServerId";


            // alert('ItemDAO.GetRFLWorkOrderDetails Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetRFLServiceWorkOrderDetails end", "ItemDAO.GetRFLServiceWorkOrderDetails");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetRFLServiceWorkOrderDetails", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.UpdateItemStatusForRFLWorkOrderDetails = function (Req) {
        try {
            OneViewConsole.Debug("UpdateItemStatusForRFLWorkOrderDetails start", "ItemDAO.UpdateItemStatusForRFLWorkOrderDetails");

            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var Query = "UPDATE RFLWorkOrder set Status='" + Req.ItemStatus + "' " +
                        " WHERE ServerId='" + Req.ServerId + "' And Column1='" + LoginUserId + "' ";
            //alert(Query)

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateItemStatusForRFLWorkOrderDetails end", "ItemDAO.UpdateItemStatusForRFLWorkOrderDetails");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.UpdateItemStatusForASOWorkOrderDetails", Excep);
        }
        finally {
            Query = null;
        }
    }

    /*RFLWorkOrder Data Code end*/
}
