
function OrganizationAssetsNodeRCOSpecialMappingDAO() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.Update_Mapping = function (OrgAssetNodeRCOSpecialMappingDataLst) {

        try {           
            OneViewConsole.Debug("Update_Mapping start", "OrganizationAssetsNodeRCOSpecialMappingDAO.Update_Mapping");

            var _oDateTime = new DateTime();
            var CurrentDateAndTime = _oDateTime.GetDateAndTime();

            for (var i = 0; i < OrgAssetNodeRCOSpecialMappingDataLst.length; i++) {

                var Query = "UPDATE OrganizationAssetsNodeRCOSpecialMapping SET ServerId = " + OrgAssetNodeRCOSpecialMappingDataLst[i].ServerId + "," +
                                "OVGuid = " + OrgAssetNodeRCOSpecialMappingDataLst[i].OVGuid + "," +
                                "ProcessCount = 0" + "," +
                                "RCOMasterId  = " + OrgAssetNodeRCOSpecialMappingDataLst[i].RCOMasterId + "," +
                                "IsSynchronized = 'true', TimeStamp = '" + CurrentDateAndTime + "' WHERE Id = " + OrgAssetNodeRCOSpecialMappingDataLst[i].Id;
              
                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }

            OneViewConsole.Debug("Update_Mapping end", "OrganizationAssetsNodeRCOSpecialMappingDAO.Update_Mapping");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "OrganizationAssetsNodeRCOSpecialMappingDAO.Update_Mapping", Excep);
        }
        finally {
            _oDateTime = null;
            CurrentDateAndTime = null;
        }
    }
}

// OrganizationAssetsNodeDAO
function OrganizationAssetsNodeDAO() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
   
    this.Update_AssetNode_Tree = function (OrgAssetNodeLst) {
       
        try {

            OneViewConsole.Debug("Update_AssetNode_Tree start", "OrganizationAssetsNodeDAO.Update_AssetNode_Tree");

            var _oDateTime = new DateTime();
            var CurrentDateAndTime = _oDateTime.GetDateAndTime();

            for (var i = 0; i < OrgAssetNodeLst.length; i++) {
               
                MyInstance.Update_AssetNode(OrgAssetNodeLst[i]);
            }
            
            OneViewConsole.Debug("Update_AssetNode_Tree end", "OrganizationAssetsNodeDAO.Update_AssetNode_Tree");          
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "OrganizationAssetsNodeDAO.Update_AssetNode_Tree", Excep);
        }
        finally {
            _oDateTime = null;
            CurrentDateAndTime = null;
        }
    }

    this.Update_AssetNode = function (OrgAssetNode) {
        try {

            OneViewConsole.Debug("Update_AssetNode start", "OrganizationAssetsNodeDAO.Update_AssetNode");

            var Query = "UPDATE OrganizationAssetsNode SET ServerId = " + OrgAssetNode.ServerId + "," +
                                "OVGuid = " + OrgAssetNode.OVGuid + ", Left = " + OrgAssetNode.Left + "," +
                                "Right  = " + OrgAssetNode.Right + ", ParentNodeId  = " + OrgAssetNode.ParentNodeId + "," +
                                "ChildDbElementId   = " + OrgAssetNode.ChildDbElementId + ", ChildDbElementCode  = '" + OrgAssetNode.ChildDbElementCode + "', ChildDbElementName  = '" + OrgAssetNode.ChildDbElementName + "'," +
                                "ParentDbElementId   = " + OrgAssetNode.ParentDbElementId + ", ParentDbElementCode  = '" + OrgAssetNode.ParentDbElementCode + "'," +
                                "IsSynchronized = 'true', TimeStamp = '" + CurrentDateAndTime + "' WHERE Id = " + OrgAssetNode.Id;

            OneViewConsole.DataLog("Requested Query : " + Query, "OrganizationAssetsNodeDAO.Update_AssetNode");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("Update_AssetNode end", "OrganizationAssetsNodeDAO.Update_AssetNode");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "OrganizationAssetsNodeDAO.Update_AssetNode", Excep);
        }
        finally {
            Query = null;
        }
    }
}

function TemplateNodeDAO() {

    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetLeftRight = function (ServerId) {
        try {
            OneViewConsole.Debug("GetLeftRight start", "TaskSyncLogDAO.GetLeftRight");

            var Query = "SELECT Left,Right FROM TemplateNode WHERE ServerId = " + ServerId;

            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "TaskSyncLogDAO.GetLeftRight");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
            
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "TaskSyncLogDAO.GetLeftRight");

            OneViewConsole.Debug("GetLeftRight end", "TaskSyncLogDAO.GetLeftRight");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TaskSyncLogDAO.GetLeftRight", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetNodeHierarchy = function (Left, Right) {
        try {
            OneViewConsole.Debug("GetNodeHierarchy start", "TaskSyncLogDAO.GetNodeHierarchy");

            var Query = "SELECT * FROM TemplateNode WHERE Left >= " + Left + " AND Right <= " + Right + " ORDER BY Left ASC";

            //alert('Query : ' + Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "TaskSyncLogDAO.GetNodeHierarchy");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "TaskSyncLogDAO.GetNodeHierarchy");

            OneViewConsole.Debug("GetNodeHierarchy end", "TaskSyncLogDAO.GetNodeHierarchy");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TaskSyncLogDAO.GetNodeHierarchy", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetAllChilds = function (ParentNode) {
        try {
            OneViewConsole.Debug("GetAllChilds start", "TemplateNodeDAO.GetAllChilds");

            if (ParentNode.length != 0) {
                var Query = "SELECT * FROM TemplateNode WHERE Left > " + ParentNode[0].Left + " AND Right < " + ParentNode[0].Right;

                OneViewConsole.DataLog("Requested Query : " + Query, "TemplateNodeDAO.GetAllChilds");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);

                OneViewConsole.DataLog("Response from db : " + Nodes, "TemplateNodeDAO.GetAllChilds");
                OneViewConsole.Debug("GetAllChilds end", "TemplateNodeDAO.GetAllChilds");

                return JSON.parse(Nodes);
            }
            else {
                return new Array();
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "TemplateNodeDAO.GetAllChilds", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }

    this.GetNodeByParentNodeId = function (ParentNodeId) {
        try {
            OneViewConsole.Debug("GetNodeByParentNodeId start", "TemplateNodeDAO.GetNodeByParentNodeId");

            var Query = "SELECT ServerId , ChildDbElementName FROM TemplateNode WHERE ParentNodeId = " + ParentNodeId + "";

            //alert('Query : ' + Query);

            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            result = JSON.parse(result);

            //alert('TemplateNodeDAO.GetNodeByParentNodeId : ' + JSON.stringify(result));

            OneViewConsole.Debug("GetNodeByParentNodeId end", "TemplateNodeDAO.GetNodeByParentNodeId");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "TemplateNodeDAO.GetNodeByParentNodeId", Excep);
        }
    }

    this.GetSingleTemplate = function (Left, Right) {
        try {
            OneViewConsole.Debug("GetNodeByParentNodeId start", "TemplateNodeDAO.GetNodeByParentNodeId");


            var Query = " Select TemplateNode.ServerId As ServerId,TemplateNode.ChildDbElementName,TemplateNode.ChildDbElementType, TemplateNode.ServerId As TemplateNodeId,TemplateNode.[Left],TemplateNode.[Right], "+
                          "  AttributeGroupType.ServerId As AttributeGroupTypeId  from TemplateNode "+
                           " INNER JOIN AttributeGroupMasterEntity ON TemplateNode.ChildDbElementId = AttributeGroupMasterEntity.ServerId and TemplateNode.ChildDbElementType =9 "+
                           " INNER JOIN AttributeGroupType ON  AttributeGroupMasterEntity.AttributeGroupTypeId = AttributeGroupType.ServerId "+
                          "  WHERE TemplateNode.[Left]>= " + Left + " and TemplateNode.[Right]<= " + Right + " and ('-1'='2' or  AttributeGroupType.ServerId = '2') LIMIT 1";

            //alert('Query : ' + Query);

            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            result = JSON.parse(result);

            //alert('TemplateNodeDAO.result : ' + JSON.stringify(result));

            OneViewConsole.Debug("GetNodeByParentNodeId end", "TemplateNodeDAO.GetNodeByParentNodeId");

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "TemplateNodeDAO.GetNodeByParentNodeId", Excep);
        }
    }

    this.GetTotalLevelsByParent = function (TemplateLeft, TemplateRight, ParentLeft, ParentRight) {
        try {
            OneViewConsole.Debug("GetTotalLevelsByParent start", "TemplateNodeDAO.GetTotalLevelsByParent");
            
            var Query = " Select count(*) AS Count FROM TemplateNode WHERE Left <= " + TemplateLeft + " AND Right >= " + TemplateRight + " AND Left >= " + ParentLeft + " AND Right <= " + ParentRight + "";

            //alert('Query : ' + Query);

            var result = window.OneViewSqlite.excecuteSqlReader(Query);           
            result = JSON.parse(result);

            //alert('GetTotalLevelsByParent.result : ' + JSON.stringify(result));

            var Count = 0;
            if (result != null && result.length > 0) {
                Count = result[0].Count;
            }
            OneViewConsole.Debug("GetTotalLevelsByParent end", "TemplateNodeDAO.GetTotalLevelsByParent");
           
            return Count;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "TemplateNodeDAO.GetTotalLevelsByParent", Excep);
        }
    }

}

                     
              