
function ItemFramework() {
    
    var MyInstance= this;
    this.LoadHtml = function ($scope, $compile, AttributeId, ControlId, DivId, ItemList) {
        try {
            OneViewConsole.Debug("LoadHtml Start", "MenuDisplayFramework.LoadHtml");
            
            var Html = MyInstance.GetHtml(ItemList, AttributeId, ControlId);
            var _oOneViewCompiler = new OneViewCompiler();
            _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, DivId);

            OneViewConsole.Debug("LoadHtml End", "MenuDisplayFramework.LoadHtml");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MenuDisplayFramework.LoadHtml", Excep);
        }
    }
    
    /// [ {Id, ServerId, Name, IsDynamicElement ,Type, LabelDetails : [ { LabelTypeId, LabelName, LabelId, LabelName}]} ]
    this.GetHtml = function (ItemList, AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("GetHtml Start", "MenuDisplayFramework.GetHtml");

            var Html = '';
            for (var i = 0; i < ItemList.length; i++) {
                var ServerId = ItemList[i].ServerId;
                var DataCaptureId = ItemList[i].DataCaptureId;
                var Name = ItemList[i].Name;
                var ItemName = "'" + ItemList[i].Name + "'";
                var IsDynamicElement = "'" + ItemList[i].IsDynamicElement + "'";
                var CtrlId = "'" + ControlId + "'";

                if (DataCaptureId == null || DataCaptureId == undefined) {
                    DataCaptureId = 0;
                }
                var IconHtml = '';
                if (DataCaptureId != 0) {
                    IconHtml = '<i class="icon icon-check"></i>';
                }

                var LabelHtml = '';
                var LabelData = MyInstance.GetLabel(ItemList[i].LabelDetails, 1);

                if (LabelData != null && LabelData != undefined) {
                    LabelHtml = 'style="color:red"';
                }

                Html += '<a ' + LabelHtml + ' id="DivItem_' + ServerId + '" DataCaptureId="' + ItemList[i].DataCaptureId + '" class="item active" ng-click="CustomEvent(\'ItemClick\', { \'ServerId\': ' + ServerId + ' , \'Name\' : ' + ItemName + ' , \'IsDynamicElement\' : ' + IsDynamicElement + ' , \'Type\' : ' + ItemList[i].Type + ', \'DataCaptureId\' : ' + DataCaptureId + ', \'AttributeId\' : ' + AttributeId + ' , \'ControlId\' : ' + CtrlId + ' })"> ' + IconHtml + ' {{\'' + Name + '\' | xlat }} </a>';
            }

            OneViewConsole.Debug("GetHtml End", "MenuDisplayFramework.GetHtml");
            alert('Html : ' + Html);
            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MenuDisplayFramework.GetHtml", Excep);
        }
    }

    this.GetLabel = function (LabelDetails, LabelId) {
        try {
            OneViewConsole.Debug("GetLabel Start", "ItemFramework.GetLabel");

            var LabelData = null;
            for (var j = 0; j < LabelDetails.length; j++) {
                if (LabelDetails[j].LabelId == LabelId) {
                    LabelData = LabelDetails;
                    break;
                }
            }
            OneViewConsole.Debug("GetLabel End", "ItemFramework.GetLabel");
            //alert('LabelData : ' + JSON.stringify(LabelData));

            return LabelData;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ItemFramework.GetLabel", Excep);
        }
    }
    
    ///Req: List of OrganizationAssetsNode
    //[ {Id, ServerId, Name, IsDynamicElement]
    ///Res: List of Data
    // [ {Id, ServerId, Name, IsDynamicElement, LabelTypeId, LabelName, LabelId, LabelName, DcId} ] 
    //Get all same data which is request along with DcId if any DC available for the particular item/AssetsNodeId
    this.GetDcDataByItems = function (ItemList) {
        try {
            OneViewConsole.Debug("GetDcDataByItems Start", "ItemFramework.GetDcDataByItems");
            var FormattedItemList = ItemList;

            if (ItemList != null && ItemList.length > 0) {
                var _oItemDAO = new ItemDAO();
                var DcAndItemIdList = _oItemDAO.GetDcDataByItems(ItemList);

                if (DcAndItemIdList != null && DcAndItemIdList.length > 0) {
                    for (var i = 0; i < DcAndItemIdList.length ; i++) {
                       /// if(DcAndItemIdList[i].AttributeNodeId == )
                    }
                }
            }
            OneViewConsole.Debug("GetDcDataByItems End", "ItemFramework.GetDcDataByItems");

            return FormattedItemList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ItemFramework.GetDcDataByItems", Excep);
        }
    }
    

    ///Req: 

    ///Res: List of OrganizationAssetsNode
    // [ {Id, ServerId, Name, IsDynamicElement ,LabelTypeId, LabelName, LabelId, LabelName} ]
    this.LoadItemsByDcPlaceAndLabel = function (DcPlaceId,Type, LabelId) {
        try {
            OneViewConsole.Debug("LoadItemsByDcPlaceAndLabel Start", "ItemFramework.LoadItemsByDcPlaceAndLabel");

            OneViewConsole.Debug("LoadItemsByDcPlaceAndLabel End", "ItemFramework.LoadItemsByDcPlaceAndLabel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ItemFramework.LoadItemsByDcPlaceAndLabel", Excep);
        }
    }
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
    this.GetItembyDcPlaceOrderbyHighRisk = function (DcPlaceId, Type, LabelId) {
        try {
            OneViewConsole.Debug("GetItembyDcPlaceOrderbyHighRisk start", "ItemDAO.GetItembyDcPlaceOrderbyHighRisk");

            Query = "SELECT OAN.* FROM OrganizationAssetsNode OAN INNER JOIN OrganizationAssetsNodeRCOSpecialMapping OSpM ON OAN.ServerId = OSpM.OrganizationAssetsNodeId " +
                    " INNER JOIN OrgAssetsNodeSpecialAndLabelMapping OLbM ON OSpM.ServerId = OLbM.OrganizationAssetsNodeRCOSpecialMappingId " +
                    " WHERE OSpM.OrganizationAssetsNodeId = " + DcPlaceId + " AND OAN.ChildDbElementType = '" + Type + "' AND OLbM.LabelId = " + LabelId;

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetItembyDcPlaceOrderbyHighRisk end", "ItemDAO.GetItembyDcPlaceOrderbyHighRisk");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ItemDAO.GetItembyDcPlaceOrderbyHighRisk", Excep);
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
    this.GetDcDataByItems = function (ItemList) {
        try {
            OneViewConsole.Debug("GetDcDataByItems start", "ItemDAO.GetDcDataByItems");
                        
            var Incondition = "(";
            for (var i = 0; i < ItemList.length; i++) {

                Incondition += ItemList[i].ServerId;
                Incondition += (i <= ItemList.length - 2) ? "," : ")";
            }
            

            var Query = "SELECT DataCaptureEntity.Id AS DataCaptureId , DataCaptureEntity.ClientGuid, Drds1.AttributeNodeId  FROM DataCaptureEntity " +

                                     "INNER JOIN DcResultsEntity ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId " +

                                     "INNER JOIN DcResultDetailsEntity AS Drds1 ON Drds1.DataResultsId=DcResultsEntity.Id " +

                                     "WHERE Drds1.IsDisable !='true' AND Drds1.AttributeNodeId IN " + Incondition;

            
            //alert('Query : ' + Query);

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

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

    

}

