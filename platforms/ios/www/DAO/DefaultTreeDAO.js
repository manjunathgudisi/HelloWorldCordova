
// TODO : Siva , 24-07-2014 , Need to test all methods
function DefaultTreeDAO() {

    // DefaultTreeDAO object
    var MyInstance = this;

    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var _oSqliteQG = new SqliteQG();
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// It will give all first level nodes under the particular node
    /// API for get all first level nodes
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllFirstLevelChilds = function(NodeId, TableName) {
        try {
            OneViewConsole.Debug("GetAllFirstLevelChilds start", "DefaultTreeDAO.GetAllFirstLevelChilds");            
            
            var Query = "SELECT * FROM " + TableName + " WHERE ParentNodeId = " + NodeId;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllFirstLevelChilds");

            var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllFirstLevelChilds");
            OneViewConsole.Debug("GetAllFirstLevelChilds end", "DefaultTreeDAO.GetAllFirstLevelChilds");

            return JSON.parse(Nodes);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllFirstLevelChilds", Excep);
        }
        finally {
            Query = null;
            Nodes = null;
        }
    }

 
    /// <summary>
    /// It will give all first level nodes under the particular node filtered by type
    /// API for get all first level nodes with type
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="Type">Type of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllFirstLevelChildsWithType = function(NodeId, Type, TableName) {
        try {
            OneViewConsole.Debug("GetAllFirstLevelChildsWithType start", "DefaultTreeDAO.GetAllFirstLevelChildsWithType");            

            var Query = "SELECT * FROM " + TableName + " WHERE ParentNodeId = " + NodeId + " AND Type = '" + Type + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllFirstLevelChildsWithType");

            var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllFirstLevelChildsWithType");
            OneViewConsole.Debug("GetAllFirstLevelChildsWithType end", "DefaultTreeDAO.GetAllFirstLevelChildsWithType");

            return JSON.parse(Nodes);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllFirstLevelChildsWithType", Excep);
        }
        finally {
            Query = null;
            Nodes = null;
        }
    }


    /// <summary>
    /// It will give all nodes under the particular node
    /// API for get all nodes
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllChilds = function(NodeId, TableName) {
        try {
            OneViewConsole.Debug("GetAllChilds start", "DefaultTreeDAO.GetAllChilds");            

            var ParentNode = MyInstance.GetNodeById(NodeId, TableName);
            

            if (ParentNode.length != 0) {
                var Query = "SELECT * FROM " + TableName + " WHERE Left > " + ParentNode[0].Left + " AND Right < " + ParentNode[0].Right;
                
                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChilds");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChilds");
                OneViewConsole.Debug("GetAllChilds end", "DefaultTreeDAO.GetAllChilds");

                return JSON.parse(Nodes);
            }
            else {
                return new Array();
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChilds", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }

    
    /// <summary>
    /// It will give all nodes under the particular node filtered by type
    /// API for get all nodes with type
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="Type">Type of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllChildsWithType = function(NodeId, Type, TableName) {
        try {
            OneViewConsole.Debug("GetAllChildsWithType start", "DefaultTreeDAO.GetAllChildsWithType");           

            var ParentNode = MyInstance.GetNodeById(NodeId, TableName);

            if (ParentNode.length != 0) {
                var Query = "SELECT * FROM " + TableName + " WHERE Left > " + ParentNode.Left + " AND Right < " + ParentNode.Right + " AND Type = '" + Type + "'";

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithType");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsWithType");
                OneViewConsole.Debug("GetAllChildsWithType end", "DefaultTreeDAO.GetAllChildsWithType");

                return JSON.parse(Nodes);
            }
            else {
                return new Array();
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChildsWithType", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }


    /// <summary>
    /// It will give all nodes under the particular node filtered by type and label
    /// API for get all nodes with type and label
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="Type">Type of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <param name="LabelId">Id of the label</param> 
    /// <returns>List of nodes</returns>
    this.GetAllChildsWithTypeAndLabelDDL = function (NodeId, Type, TableName, LabelId) {

        try {
            OneViewConsole.Debug("GetAllChildsWithTypeAndLabelDDL start", "DefaultTreeDAO.GetAllChildsWithTypeAndLabelDDL");

            var ParentNode = MyInstance.GetNodeById(NodeId, TableName);

            var ddlResult = [];

            if (ParentNode.length != 0) {

                //var Query = "SELECT Distinct OG1.ServerId , OG1.ClientGuid, OG1.ChildDbElementId , OG1.ChildDbElementName AS Name FROM " + TableName + " og1 inner join " + TableName + " OG2 ON (OG1.ServerId = OG2.ParentNodeId) WHERE OG2.ChildDbElementId = " + LabelId +
                //                " AND OG2.ChildDbElementType ='" + DATEntityType.Label + "' AND OG1.ChildDbElementType = '" + Type + "' and OG1.Left > " + ParentNode[0].Left + " and  OG1.Right < " + ParentNode[0].Right + " ORDER BY  OG1.ChildDbElementName COLLATE NOCASE ASC";

                var Query = "SELECT ServerId,ClientGuid,ChildDbElementId,ChildDbElementName AS Name FROM " + TableName + " WHERE Left > " + ParentNode[0].Left + " AND Right < " + ParentNode[0].Right + " AND ChildDbElementType = '" + Type + "' ";

               // var Query = "SELECT ServerId , ClientGuid, ChildDbElementId , ChildDbElementName AS Name FROM " + TableName + " WHERE Left > " + ParentNode.Left + " AND Right < " + ParentNode.Right + " AND Type = '" + Type + "'";
                Query = Query + " AND ( LabelId1 == " + LabelId + " or LabelId2 == " + LabelId + " or LabelId3==" + LabelId + " or LabelId4 == " + LabelId + " or LabelId5 == " + LabelId + ") ORDER BY ChildDbElementName ASC";

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithTypeAndLabelDDL");
                
                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                Nodes = JSON.parse(Nodes);

              
                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsWithTypeAndLabelDDL");

                var Id;
                var IsDynamicElement = false;

                for (i = 0; i < Nodes.length; i++) {
                    if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                        Id = Nodes[i].ClientGuid;
                        IsDynamicElement = true;
                    }
                    else
                        Id = Nodes[i].ServerId;

                    ddlResult.push({
                        "Id": Id,
                        "Name": Nodes[i].Name,
                        "IsDynamicElement": IsDynamicElement
                    });
                }
            }

            OneViewConsole.Debug("GetAllChildsWithTypeAndLabelDDL end", "DefaultTreeDAO.GetAllChildsWithTypeAndLabelDDL");

            return ddlResult;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChildsWithTypeAndLabelDDL", Excep);
        }
        finally {
            ParentNode = null;
            ddlResult = null;
            Query = null;
            Nodes = null;
            Id = null;
            IsDynamicElement = null;
        }
    }


    /// <summary>
    /// It will give all nodes under the particular node filtered by type with specific fields for drop down
    /// API for get all nodes with type for drop down
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="Type">Type of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllChildsWithTypeDDL = function (NodeId, Type, TableName) {

        try {
            OneViewConsole.Debug("GetAllChildsWithTypeDDL start", "DefaultTreeDAO.GetAllChildsWithTypeDDL");


            var ParentNode = MyInstance.GetNodeById(NodeId, TableName);

            var ddlResult = [];
           
            if (ParentNode.length != 0) {

                var Query = "SELECT ServerId,ClientGuid,ChildDbElementId,ChildDbElementName AS Name FROM " + TableName + " WHERE Left > " + ParentNode[0].Left + " AND Right < " + ParentNode[0].Right + " AND ChildDbElementType = '" + Type + "' ORDER BY ChildDbElementName ASC";

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithTypeDDL");
               
                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                Nodes = JSON.parse(Nodes);
               
              OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsWithTypeDDL");

                var Id;
                var IsDynamicElement = false;

                for (i = 0; i < Nodes.length; i++) {
                    if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                        Id = Nodes[i].ClientGuid;
                        IsDynamicElement = true;
                    }
                    else
                        Id = Nodes[i].ServerId;

                    ddlResult.push({
                        "Id": Id,
                        "Name": Nodes[i].Name,
                        "IsDynamicElement": IsDynamicElement
                    });
                }
            }

            OneViewConsole.Debug("GetAllChildsWithTypeDDL end", "DefaultTreeDAO.GetAllChildsWithTypeDDL");

            return ddlResult;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChildsWithTypeDDL", Excep);
        }
        finally {
            ParentNode = null;
            ddlResult = null;
            Query = null;
            Nodes = null;
            Id = null;
            IsDynamicElement = null;
        }
    }

    /// <summary>
    /// It will give all nodes under the particular node filtered by type with specific fields for drop down
    /// API for get all nodes with type for drop down
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="Type">Type of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllChildsWithLeafTypeDDL = function (NodeId, Type, TableName,LeafType1, LeafType2) {

        try {
            OneViewConsole.Debug("GetAllChildsWithLeafTypeDDL start", "DefaultTreeDAO.GetAllChildsWithLeafTypeDDL");


            var ParentNode = MyInstance.GetNodeById(NodeId, TableName);

            var ddlResult = [];

            if (ParentNode.length != 0) {

                var Query = "SELECT ServerId,ClientGuid,ChildDbElementId,ChildDbElementName AS Name,Left,Right  FROM " + TableName + " WHERE Left > " + ParentNode[0].Left + " AND Right < " + ParentNode[0].Right + " AND ChildDbElementType = '" + Type + "' ORDER BY ChildDbElementName ASC";

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithLeafTypeDDL");

                var ParentNodes = window.OneViewSqlite.excecuteSqlReader(Query);
                ParentNodes = JSON.parse(ParentNodes);

                OneViewConsole.DataLog("Response from db : " + ParentNodes, "DefaultTreeDAO.GetAllChildsWithLeafTypeDDL");

                var Nodes = [];

                for (i = 0; i < ParentNodes.length; i++) {
                    
                    var Query1 = "SELECT ServerId,ClientGuid,ChildDbElementId,ChildDbElementName AS Name,Left,Right  FROM " + TableName + " WHERE Left > " + ParentNodes[i].Left + " AND Right < " + ParentNodes[i].Right + " AND (ChildDbElementType = '" + LeafType1 + "' OR ChildDbElementType = '" + LeafType2 + "') ORDER BY ChildDbElementName ASC";
                    var LeafNode = window.OneViewSqlite.excecuteSqlReader(Query1);
                    LeafNode = JSON.parse(LeafNode);
                   
                    if (LeafNode.length > 0) {
                        Nodes.push(ParentNodes[i]);
                    }
                   
                }

                var Id;
                var IsDynamicElement = false;

                for (i = 0; i < Nodes.length; i++) {
                    if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                        Id = Nodes[i].ClientGuid;
                        IsDynamicElement = true;
                    }
                    else
                        Id = Nodes[i].ServerId;

                    ddlResult.push({
                        "Id": Id,
                        "Name": Nodes[i].Name,
                        "IsDynamicElement": IsDynamicElement
                    });
                }
            }
           
            OneViewConsole.Debug("GetAllChildsWithLeafTypeDDL end", "DefaultTreeDAO.GetAllChildsWithLeafTypeDDL");

            return ddlResult;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChildsWithLeafTypeDDL", Excep);
        }
        finally {
            ParentNode = null;
            ddlResult = null;
            Query = null;
            Nodes = null;
            Id = null;
            IsDynamicElement = null;
        }
    }

  
    /// <summary>
    /// It will give all nodes under the particular node filtered by type with specific fields for drop down
    /// API for get all nodes with type for drop down
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="Type">Type of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllChildsWithTypeDDLWorkOrder = function (NodeId, Type, TableName, SectionCodesConfig) {

        try {
            OneViewConsole.Debug("GetAllChildsWithTypeDDLWorkOrder start", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var ddlResult = [];

                var Query = "SELECT (Rco_WorkOrder.Column2 || '-' || Rco_WorkOrder.Column3) AS Name, OrgAstMpng.ClientGuid AS ClientGuid, OrgAstMpng.ServerId AS ServerId FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                             "INNER JOIN RcoMasterEntity Rco_WorkOrder ON OrgAstMpng.RCOMasterId = Rco_WorkOrder.ServerId " +
                             "AND OrgAstMpng.ServerId !=0 and OrgAstMpng.RCOTypeId=Rco_WorkOrder.Type AND OrgAstMpng.OrganizationAssetsNodeId = " + NodeId + " AND OrgAstMpng.RCOTypeId = '" + Type + "'";

                //var Query = "SELECT Distinct(Rco_WorkOrder.Column2 || '-' || Rco_WorkOrder.Column3) AS Name, OrgAstMpng.ServerId AS ServerId  FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                //            "INNER JOIN RcoMasterEntity Rco_WorkOrder ON OrgAstMpng.RCOMasterId = Rco_WorkOrder.ServerId AND OrgAstMpng.RCOTypeId=Rco_WorkOrder.Type AND OrgAstMpng.OrganizationAssetsNodeId = " + NodeId + " AND OrgAstMpng.RCOTypeId = '" + Type + "'";
                
                //var Query = "SELECT (Rco_WorkOrder.Column2 || '-' || Rco_WorkOrder.Column3) AS Name, OrgAstMpng.ClientGuid AS ClientGuid, OrgAstMpng.ServerId AS ServerId FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng "+
                //            "INNER JOIN RcoMasterEntity Rco_WorkOrder ON (OrgAstMpng.RCOMasterId = Rco_WorkOrder.ServerId or OrgAstMpng.RCOMasterId = 0) AND (OrgAstMpng.RCOMasterClientGuid = Rco_WorkOrder.ClientGuid or OrgAstMpng.RCOMasterClientGuid = '') "+
                //            "AND OrgAstMpng.RCOTypeId=Rco_WorkOrder.Type AND OrgAstMpng.OrganizationAssetsNodeId = " + NodeId + " AND OrgAstMpng.RCOTypeId = '" + Type + "'";


                //var Query = "SELECT OrgAstMpng.ServerId AS ServerId FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                //         "INNER JOIN RcoMasterEntity Rco_WorkOrder ON (OrgAstMpng.RCOMasterId = Rco_WorkOrder.ServerId or OrgAstMpng.RCOMasterId = 0) AND (OrgAstMpng.RCOMasterClientGuid = Rco_WorkOrder.ClientGuid or OrgAstMpng.RCOMasterClientGuid = '') " +
                //         "AND OrgAstMpng.RCOTypeId=Rco_WorkOrder.Type AND OrgAstMpng.OrganizationAssetsNodeId = " + NodeId + " AND OrgAstMpng.RCOTypeId = '" + Type + "'";


                //if (SectionCodesConfig != undefined && SectionCodesConfig.length > 0) {
                //    Query += " AND Rco_WorkOrder.Column1 IN " + FomatForInCondition(SectionCodesConfig);
                //}

               // alert(Query);

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                Nodes = JSON.parse(Nodes);
               // alert(JSON.stringify(Nodes));
                //alert(Nodes.length);

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

                var Id;
                var IsDynamicElement = false;
                var Name;

                for (i = 0; i < Nodes.length; i++) {
                    if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                        Id = Nodes[i].ClientGuid;
                        IsDynamicElement = true;
                    }
                    else
                        Id = Nodes[i].ServerId;

                    Name = Nodes[i].Name
                    if (Name.charAt(0) == '-') {
                        Name = Name.substring(1);
                    }

                    ddlResult.push({
                        "Id": Id,
                        "Name": Name,
                        "IsDynamicElement": IsDynamicElement
                    });               
            }

                OneViewConsole.Debug("GetAllChildsWithTypeDDL end", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

            return ddlResult;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder", Excep);
        }
        finally {
            ParentNode = null;
            ddlResult = null;
            Query = null;
            Nodes = null;
            Id = null;
            IsDynamicElement = null;
        }
    }

    var FomatForInCondition = function (Result) {
        try {
            OneViewConsole.Debug("FomatForInConditionById start", "DcDAO.FomatForInConditionById");
            OneViewConsole.DataLog("Request Result : " + JSON.stringify(Result), "DcDAO.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < Result.length; i++) {
                Incondition += Result[i];
                Incondition += (i <= Result.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "DcDAO.FomatForInConditionById");
            OneViewConsole.Debug("FomatForInConditionById end", "DcDAO.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.FomatForInConditionById", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    /// <summary>
    /// It will give all nodes under the particular node filtered by type with specific fields for drop down
    /// API for get all nodes with type for drop down
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="Type">Type of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllChildsWithTypeDDLWorkOrderOld = function (NodeId, Type, TableName) {

        try {
            OneViewConsole.Debug("GetAllChildsWithTypeDDLWorkOrder start", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

            var ddlResult = [];

            var Query = "SELECT Distinct(Rco_WorkOrder.Column2 || '-' || Rco_WorkOrder.Column3) AS Name, OrgAstMpng.ServerId AS ServerId FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                        "INNER JOIN RcoMasterEntity Rco_WorkOrder ON OrgAstMpng.RCOMasterId = Rco_WorkOrder.ServerId AND OrgAstMpng.RCOTypeId=Rco_WorkOrder.Type AND OrgAstMpng.OrganizationAssetsNodeId = " + NodeId + " AND OrgAstMpng.RCOTypeId = '" + Type + "'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

            var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
            Nodes = JSON.parse(Nodes);

            OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

            var Id;
            var IsDynamicElement = false;

            for (i = 0; i < Nodes.length; i++) {
                if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                    Id = Nodes[i].ClientGuid;
                    IsDynamicElement = true;
                }
                else
                    Id = Nodes[i].ServerId;

                ddlResult.push({
                    "Id": Id,
                    "Name": Nodes[i].Name,
                    "IsDynamicElement": IsDynamicElement
                });
            }

            OneViewConsole.Debug("GetAllChildsWithTypeDDL end", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder");

            return ddlResult;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChildsWithTypeDDLWorkOrder", Excep);
        }
        finally {
            ParentNode = null;
            ddlResult = null;
            Query = null;
            Nodes = null;
            Id = null;
            IsDynamicElement = null;
        }
    }


    /// <summary>
    /// It will give all nodes under the particular node filtered by type with specific fields for drop down
    /// API for get all nodes with type for drop down
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="Type">Type of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllChildsWithTypeDDLPurchaseOrder = function (NodeId, Type, TableName) {

        try {
            OneViewConsole.Debug("GetAllChildsWithTypeDDLPurchaseOrder start", "DefaultTreeDAO.GetAllChildsWithTypeDDLPurchaseOrder");

                var ddlResult = [];
           
                var Query = "SELECT Distinct(Rco_WorkOrder.Column5 || '-' || Rco_WorkOrder.Column6) AS Name, OrgAstMpng.ServerId AS ServerId FROM OrganizationAssetsNodeRCOSpecialMapping AS OrgAstMpng " +
                           "INNER JOIN RcoMasterEntity Rco_WorkOrder ON OrgAstMpng.RCOMasterId = Rco_WorkOrder.ServerId AND OrgAstMpng.RCOTypeId=Rco_WorkOrder.Type AND OrgAstMpng.OrganizationAssetsNodeId = " + NodeId + " AND OrgAstMpng.RCOTypeId = '" + Type + "'";

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsWithTypeDDLPurchaseOrder");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                Nodes = JSON.parse(Nodes);

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsWithTypeDDLPurchaseOrder");

                var Id;
                var IsDynamicElement = false;

                for (i = 0; i < Nodes.length; i++) {
                    if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                        Id = Nodes[i].ClientGuid;
                        IsDynamicElement = true;
                    }
                    else
                        Id = Nodes[i].ServerId;

                    ddlResult.push({
                        "Id": Id,
                        "Name": Nodes[i].Name,
                        "IsDynamicElement": IsDynamicElement
                    });                
            }

                OneViewConsole.Debug("GetAllChildsWithTypeDDLPurchaseOrder end", "DefaultTreeDAO.GetAllChildsWithTypeDDLPurchaseOrder");

            return ddlResult;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChildsWithTypeDDLPurchaseOrder", Excep);
        }
        finally {
            ParentNode = null;
            ddlResult = null;
            Query = null;
            Nodes = null;
            Id = null;
            IsDynamicElement = null;
        }
    }


    /// <summary>
    /// It will give all nodes under the particular node filtered by type and value with specific fields for drop down
    /// API for get all nodes with type and value for drop down
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="Type">Type of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <param name="value">value</param> 
    /// <returns>List of nodes</returns>
    this.GetAllChildDbElementNameWithType = function (NodeId, Type, TableName, value) {
        try{
            var ParentNode = MyInstance.GetNodeById(NodeId, TableName);
            if (ParentNode.length != 0) {

                var Query = "SELECT (CASE ServerId WHEN 0 THEN ClientGuid ELSE ServerId END) AS Id,ChildDbElementName FROM " + TableName + " WHERE Left > " + ParentNode[0].Left + " AND Right < " + ParentNode[0].Right + " AND ChildDbElementType = '" + Type + "' AND Upper(ChildDbElementName) = '" + value.toUpperCase() + "'";

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildDbElementNameWithType");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                Nodes = JSON.parse(Nodes);

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildDbElementNameWithType");

                return Nodes;
                //var Id;
                //var IsDynamicElement = false;

                //for (i = 0; i < Nodes.length; i++) {
                //    if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                //        Id = Nodes[i].ClientGuid;
                //        IsDynamicElement = true;
                //    }
                //    else
                //        Id = Nodes[i].ServerId;

                //    ddlResult.push({
                //        "Id": Id,
                //        "Name": Nodes[i].Name,
                //        "IsDynamicElement": IsDynamicElement
                //    });
                //}
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChildDbElementNameWithType", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }

 
    /// <summary>
    /// It will give all leaf level nodes under the particular node
    /// API for get all leaf level nodes
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllLeafLevelChilds = function(NodeId, TableName) {
        try{
            OneViewConsole.Debug("GetAllLeafLevelChilds start", "DefaultTreeDAO.GetAllLeafLevelChilds");           

            var ParentNode = MyInstance.GetNodeById(NodeId, TableName);

            if (ParentNode.length != 0) {
                var Query = "SELECT * FROM " + TableName + " WHERE Left > " + ParentNode.Left + " AND Right < " + ParentNode.Right + " AND " + ParentNode.Left + 1 + " = " + ParentNode.Right;

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllLeafLevelChilds");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllLeafLevelChilds");
                OneViewConsole.Debug("GetAllLeafLevelChilds end", "DefaultTreeDAO.GetAllLeafLevelChilds");

                return JSON.parse(Nodes);
            }
            else {
                return new Array();
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllLeafLevelChilds", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }


    /// <summary>
    /// It will give all leaf level nodes under the particular node filtered by type
    /// API for get all leaf level nodes with type
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="Type">Type of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetAllLeafLevelChildsWithType = function(NodeId, Type, TableName) {
        
        try {
            OneViewConsole.Debug("GetAllLeafLevelChildsWithType start", "DefaultTreeDAO.GetAllLeafLevelChildsWithType");            

            var ParentNode = MyInstance.GetNodeById(NodeId, TableName);

            if (ParentNode.length != 0) {

                var Query = "SELECT * FROM " + TableName + " WHERE Left > " + ParentNode.Left + " AND Right < " + ParentNode.Right + " AND " + ParentNode.Left + 1 + " = " + ParentNode.Right + " AND Type = '" + Type + "'";

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllLeafLevelChildsWithType");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllLeafLevelChildsWithType");

                OneViewConsole.Debug("GetAllLeafLevelChildsWithType end", "DefaultTreeDAO.GetAllLeafLevelChildsWithType");

                return JSON.parse(Nodes);
            }
            else {
                OneViewConsole.Debug("GetAllLeafLevelChildsWithType end", "DefaultTreeDAO.GetAllLeafLevelChildsWithType");

                return new Array();
            }           
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllLeafLevelChildsWithType", Excep);
        }
        finally {
            ParentNode = null;
            Query = null;
            Nodes = null;
        }
    }


    /// <summary>
    /// It will give node details
    /// API for get node by server id
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.GetNodeById = function(NodeId, TableName) {

        try {
            OneViewConsole.Debug("GetNodeById start", "DefaultTreeDAO.GetNodeById");           
            var ParentNodeQuery = "SELECT * FROM " + TableName + " WHERE ServerId = " + NodeId;
            OneViewConsole.DataLog("Requested Query : " + ParentNodeQuery, "DefaultTreeDAO.GetNodeById");

            var Node = window.OneViewSqlite.excecuteSqlReader(ParentNodeQuery);


            OneViewConsole.DataLog("Response from db : " + Node, "DefaultTreeDAO.GetNodeById");
            OneViewConsole.Debug("GetNodeById end", "DefaultTreeDAO.GetNodeById");
        
            return JSON.parse(Node);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetNodeById", Excep);
        }
        finally {
            ParentNodeQuery = null;
            Node = null;
        }
    }
    

    /// <summary>
    /// It will give parent node details
    /// API for get parent node by server id
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>Node</returns>
    this.GetParentById = function (NodeId, TableName) {
        try {
           // alert("dddd" + NodeId + "," + TableName);
            OneViewConsole.Debug("GetParentByIdAndType start", "DefaultTreeDAO.GetParentByIdAndType");
            var query = "SELECT * FROM " + TableName + " WHERE ServerId =" + NodeId;
           
           // alert(query);
            OneViewConsole.DataLog("Requested Query : " + query, "DefaultTreeDAO.GetParentById");
            var Node = window.OneViewSqlite.excecuteSqlReader(query);

            OneViewConsole.DataLog("Response from db : " + Node, "DefaultTreeDAO.GetParentById");
            OneViewConsole.Debug("GetParentById end", "DefaultTreeDAO.GetParentById");

            return JSON.parse(Node);
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetParentById", Excep);
        }
        finally {
            query = null;
            Node = null;
        }
    }


    /// <summary>
    /// It will give parent node details
    /// API for get parent node by server id and type
    /// </summary>
    /// <param name="NodeId">Server id of the node</param> 
    // <param name="TypeId">TypeId</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>Node</returns>
    this.GetNodeByIdAndType = function (NodeId, TypeId, TableName) {
        try {
            OneViewConsole.Debug("GetNodeByIdAndType start", "DefaultTreeDAO.GetNodeByIdAndType");
            var query = "SELECT ServerId AS Id , ChildDbElementName AS Name FROM " + TableName + " WHERE ServerId =" + NodeId + " AND ChildDbElementType = " + TypeId;
           // alert(query);
            OneViewConsole.DataLog("Requested Query : " + query, "DefaultTreeDAO.GetNodeByIdAndType");
            var Node = window.OneViewSqlite.excecuteSqlReader(query);

            OneViewConsole.DataLog("Response from db : " + Node, "DefaultTreeDAO.GetNodeByIdAndType");
            OneViewConsole.Debug("GetNodeByIdAndType end", "DefaultTreeDAO.GetNodeByIdAndType");

            
            return JSON.parse(Node);
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetNodeByIdAndType", Excep);
        }
        finally {
            query = null;
            Node = null;
        }
    }


    /// <summary>
    /// It will give Info With ServerId Dict
    /// API for Get All Info With ServerId Dict
    /// </summary>  
    /// <returns>ResultDic</returns>
    this.GetAllInfoWithServerIdDict = function (TableName) {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdDict start", "DefaultMasterDAO.GetAllInfoWithServerIdDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid,ChildDbElementName FROM " + TableName;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdDict end", "DefaultMasterDAO.GetAllInfoWithServerIdDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = { "Id": result[i].Id, "OVGuid": result[i].OVGuid, "ChildDbElementName": result[i].ChildDbElementName };
            }

            return ResultDic;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }


    /// <summary>
    /// It will update the tree left and right
    /// API for update left and right of the Node table (tree)
    /// </summary>
    /// <param name="Left">Left id of the node</param> 
    /// <param name="Right">Right id of the node</param> 
    /// <param name="TableName">Table name of the node</param> 
    /// <returns>List of nodes</returns>
    this.UpdateLeftRight=function(Left, Right, TableName)
    {
        try {
            OneViewConsole.Debug("UpdateLeftRight start", "DefaultTreeDAO.UpdateLeftRight");            

            var UpdateQuery1 = "UPDATE " + TableName + " SET Right=Right + 2 WHERE Right >= " + Right + " AND Left < " + Left + "";

            OneViewConsole.DataLog("Requested Query1 : " + UpdateQuery1, "DefaultTreeDAO.UpdateLeftRight");
    	
            window.OneViewSqlite.excecuteSql(UpdateQuery1);
    	
            var UpdateQuery2 = "UPDATE " + TableName + " SET Right=Right + 2 WHERE Left < " + Left + " AND Right = " + Left + "";

            OneViewConsole.DataLog("Requested Query2 : " + UpdateQuery2, "DefaultTreeDAO.UpdateLeftRight");
    	
            window.OneViewSqlite.excecuteSql(UpdateQuery2);
    	
            var UpdateQuery3 = "UPDATE " + TableName + " SET Right=Right + 2,Left=Left + 2 WHERE Left > " + Left + "";

            OneViewConsole.DataLog("Requested Query3 : " + UpdateQuery3, "DefaultTreeDAO.UpdateLeftRight");
    	
            window.OneViewSqlite.excecuteSql(UpdateQuery3);

            OneViewConsole.Debug("UpdateLeftRight end", "DefaultTreeDAO.UpdateLeftRight");
        }  
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.UpdateLeftRight", Excep);
        }
        finally {
            UpdateQuery1 = null;
            UpdateQuery2 = null;
            UpdateQuery3 = null;
        }
    }

    
    /// <summary>
    /// API for Update Tree
    /// </summary>
    /// <param name="NodeLst">NodeLst</param> 
    /// Note : Primary key is mandatory to update
    this.UpdateTree = function (NodeLst) {

        try {
            OneViewConsole.Debug("UpdateTree start", "DefaultTreeDAO.UpdateTree");
           
            for (var i = 0; i < NodeLst.length; i++) {
                MyInstance.UpdateNode(NodeLst[i]);
            }

            OneViewConsole.Debug("UpdateTree end", "DefaultTreeDAO.UpdateTree");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.UpdateTree", Excep);
        }        
    }


    /// <summary>
    /// API for Update Node
    /// </summary>
    /// <param name="Node">Node</param>    
    /// Note : Primary key is mandatory to update
    this.UpdateNode = function (Node) {

        try {
            OneViewConsole.Debug("UpdateNode start", "DefaultTreeDAO.UpdateNode");

            var Query = _oSqliteQG.GetUpdateQuery(Node);

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.UpdateNode");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateNode end", "DefaultTreeDAO.UpdateNode");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.UpdateNode", Excep);
        }
        finally {
            Query = null;
        }
    }

    this.GetAllChildsByParentNodeIdAndType = function (NodeId, Type, TableName) {

        try {
            OneViewConsole.Debug("GetAllChildsByParentNodeIdAndType start", "DefaultTreeDAO.GetAllChildsByParentNodeIdAndType");


            var ParentNode = MyInstance.GetNodeById(NodeId, TableName);

            var ddlResult = [];

            if (ParentNode.length != 0) {

                var Query = "SELECT ServerId,ClientGuid,ChildDbElementId,ChildDbElementName AS Name FROM " + TableName + " WHERE Left > " + ParentNode[0].Left + " AND Right < " + ParentNode[0].Right + " AND ChildDbElementType = '" + Type + "' ORDER BY ChildDbElementName ASC";

                OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetAllChildsByParentNodeIdAndType");

                var Nodes = window.OneViewSqlite.excecuteSqlReader(Query);
                Nodes = JSON.parse(Nodes);

                OneViewConsole.DataLog("Response from db : " + Nodes, "DefaultTreeDAO.GetAllChildsByParentNodeIdAndType");

                var Id;
                var IsDynamicElement = false;

                for (i = 0; i < Nodes.length; i++) {
                    if (Nodes[i].ClientGuid != '' && Nodes[i].ServerId == 0) {
                        Id = Nodes[i].ClientGuid;
                        IsDynamicElement = true;
                    }
                    else
                        Id = Nodes[i].ServerId;

                    ddlResult.push({
                        "Id": Id,
                        "Name": Nodes[i].Name,
                        "IsDynamicElement": IsDynamicElement,
                        "Value": 0,
                        "Sequence": 0,
                        "ColourCode": "",
                    });
                }
            }

            OneViewConsole.Debug("GetAllChildsByParentNodeIdAndType end", "DefaultTreeDAO.GetAllChildsByParentNodeIdAndType");

            return ddlResult;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetAllChildsByParentNodeIdAndType", Excep);
        }
        finally {
            ParentNode = null;
            ddlResult = null;
            Query = null;
            Nodes = null;
            Id = null;
            IsDynamicElement = null;
        }
    }


    this.GetLatitudeAndLongitudeByPlaceId = function (PalceId) {

        try {
            OneViewConsole.Debug("GetLatitudeAndLongitudeByPlaceId start", "DefaultTreeDAO.GetLatitudeAndLongitudeByPlaceId");

            var Query = "SELECT RcoMasterEntity.Latitude AS Latitude,RcoMasterEntity.Longitude AS Longitude FROM RcoMasterEntity " +
                        "INNER JOIN OrganizationAssetsNode " +
                        "ON OrganizationAssetsNode.ChildDbElementId=RcoMasterEntity.ServerId " +
                        "WHERE OrganizationAssetsNode.ServerId=" + PalceId;
            //alert(Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultTreeDAO.GetLatitudeAndLongitudeByPlaceId");

            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
             Result = JSON.parse(Result);
         
            OneViewConsole.DataLog("Response from db : " + Result, "DefaultTreeDAO.GetLatitudeAndLongitudeByPlaceId");


            OneViewConsole.Debug("GetLatitudeAndLongitudeByPlaceId end", "DefaultTreeDAO.GetLatitudeAndLongitudeByPlaceId");

            return Result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultTreeDAO.GetLatitudeAndLongitudeByPlaceId", Excep);
        }
        finally {
            Result = null;          
        }
    }


    this.GetAllInfoWithServerIdItemProcessMappingDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdItemProcessMappingDict start", "DefaultMasterDAO.GetAllInfoWithServerIdItemProcessMappingDict");

            var ResultDic = {};

            // var Query = "SELECT Distinct ServerId,Id,OVGuid,ProcessId,ProcessName,DataId,DataName FROM ItemProcessMappingEntity ";
            var Query = "SELECT Distinct ServerId,ProcessMappingDetails FROM ItemProcessMappingEntity ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdItemProcessMappingDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdItemProcessMappingDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdItemProcessMappingDict end", "DefaultMasterDAO.GetAllInfoWithServerIdItemProcessMappingDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = { "Id": result[i].Id, "OVGuid": result[i].OVGuid, "ProcessId": result[i].ProcessId, "ProcessName": result[i].ProcessName, "DataId": result[i].DataId, "DataName": result[i].DataName };
            }

          //  alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
            alert('GetAllInfoWithServerIdItemProcessMappingDict Excep 11 : ' + Excep);
            alert('GetAllInfoWithServerIdItemProcessMappingDict Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdItemProcessMappingDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdOrderDetailsDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdOrderDetailsDict start", "DefaultMasterDAO.GetAllInfoWithServerIdOrderDetailsDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid,RCOMasterId,RCOMasterName FROM OrderDetails ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdOrderDetailsDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdOrderDetailsDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdOrderDetailsDict end", "DefaultMasterDAO.GetAllInfoWithServerIdOrderDetailsDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = { "Id": result[i].Id, "OVGuid": result[i].OVGuid, "RCOMasterId": result[i].RCOMasterId, "RCOMasterName": result[i].RCOMasterName };
            }

           // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
            alert('GetAllInfoWithServerIdOrderDetailsDict Excep 11 : ' + Excep);
            alert('GetAllInfoWithServerIdOrderDetailsDict Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdOrderDetailsDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdRcoAndLabelMappingDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdRcoAndLabelMappingDict start", "DefaultMasterDAO.GetAllInfoWithServerIdRcoAndLabelMappingDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid,RCOMasterId,LabelId FROM RcoAndLabelMapping ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdRcoAndLabelMappingDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdRcoAndLabelMappingDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdRcoAndLabelMappingDict end", "DefaultMasterDAO.GetAllInfoWithServerIdRcoAndLabelMappingDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = { "Id": result[i].Id, "OVGuid": result[i].OVGuid, "RCOMasterId": result[i].RCOMasterId, "LabelId": result[i].LabelId };
            }

           // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
            alert('GetAllInfoWithServerIdRcoAndLabelMappingDict Excep 11 : ' + Excep);
            alert('GetAllInfoWithServerIdRcoAndLabelMappingDict Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdRcoAndLabelMappingDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdPurchaseOrderDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdPurchaseOrderDict start", "DefaultMasterDAO.GetAllInfoWithServerIdPurchaseOrderDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid,BusinessUnitId,BusinessUnitName,ItemMasterId,ItemMasterName,PurchaseOrderNo,SupplierName FROM PurchaseOrder ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdPurchaseOrderDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdPurchaseOrderDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdPurchaseOrderDict end", "DefaultMasterDAO.GetAllInfoWithServerIdPurchaseOrderDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = {
                    "Id": result[i].Id, "OVGuid": result[i].OVGuid, "BusinessUnitId": result[i].BusinessUnitId, "BusinessUnitName": result[i].BusinessUnitName,
                    "ItemMasterId": result[i].ItemMasterId, "ItemMasterName": result[i].ItemMasterName, "PurchaseOrderNo": result[i].PurchaseOrderNo, "SupplierName": result[i].SupplierName
                };
            }

            // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
            alert('GetAllInfoWithServerIdPurchaseOrderDict Excep 11 : ' + Excep);
            alert('GetAllInfoWithServerIdPurchaseOrderDict Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdPurchaseOrderDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdWorkOrderItemDetailsDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdWorkOrderItemDetailsDict start", "DefaultMasterDAO.GetAllInfoWithServerIdWorkOrderItemDetailsDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid,BusinessUnitId,BusinessUnitName,WorkOrderNo FROM WorkOrderItemDetails ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdWorkOrderItemDetailsDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdWorkOrderItemDetailsDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdWorkOrderItemDetailsDict end", "DefaultMasterDAO.GetAllInfoWithServerIdWorkOrderItemDetailsDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = {
                    "Id": result[i].Id, "OVGuid": result[i].OVGuid, "BusinessUnitId": result[i].BusinessUnitId, "BusinessUnitName": result[i].BusinessUnitName,
                    "ItemMasterId": result[i].ItemMasterId, "ItemMasterName": result[i].ItemMasterName, "PurchaseOrderNo": result[i].PurchaseOrderNo, "SupplierName": result[i].SupplierName
                };
            }

            // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
           // alert('GetAllInfoWithServerIdWorkOrderItemDetailsDict Excep 11 : ' + Excep);
          //  alert('GetAllInfoWithServerIdWorkOrderItemDetailsDict Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdWorkOrderItemDetailsDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdFlightBeltPlanDetailsDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdFlightBeltPlanDetailsDict start", "DefaultMasterDAO.GetAllInfoWithServerIdFlightBeltPlanDetailsDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid FROM FlightBeltPlanDetails ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdFlightBeltPlanDetailsDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdFlightBeltPlanDetailsDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdFlightBeltPlanDetailsDict end", "DefaultMasterDAO.GetAllInfoWithServerIdFlightBeltPlanDetailsDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = {
                    "Id": result[i].Id, "OVGuid": result[i].OVGuid
                };
            }

            // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
            // alert('GetAllInfoWithServerIdWorkOrderItemDetailsDict Excep 11 : ' + Excep);
            //  alert('GetAllInfoWithServerIdWorkOrderItemDetailsDict Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdFlightBeltPlanDetailsDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdFlightCellPlanDetailsDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdFlightCellPlanDetailsDict start", "DefaultMasterDAO.GetAllInfoWithServerIdFlightCellPlanDetailsDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid FROM FlightCellPlanDetails ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdFlightCellPlanDetailsDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdFlightCellPlanDetailsDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdFlightCellPlanDetailsDict end", "DefaultMasterDAO.GetAllInfoWithServerIdFlightCellPlanDetailsDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = {
                    "Id": result[i].Id, "OVGuid": result[i].OVGuid
                };
            }

            // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
            // alert('GetAllInfoWithServerIdWorkOrderItemDetailsDict Excep 11 : ' + Excep);
            //  alert('GetAllInfoWithServerIdWorkOrderItemDetailsDict Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdFlightCellPlanDetailsDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdFlightOALPlanDetailsDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdFlightOALPlanDetailsDict start", "DefaultMasterDAO.GetAllInfoWithServerIdFlightOALPlanDetailsDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid FROM FlightOALPlanDetails ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdFlightOALPlanDetailsDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdFlightOALPlanDetailsDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdFlightOALPlanDetailsDict end", "DefaultMasterDAO.GetAllInfoWithServerIdFlightOALPlanDetailsDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = {
                    "Id": result[i].Id, "OVGuid": result[i].OVGuid
                };
            }

            // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
            // alert('GetAllInfoWithServerIdWorkOrderItemDetailsDict Excep 11 : ' + Excep);
            //  alert('GetAllInfoWithServerIdWorkOrderItemDetailsDict Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdFlightBeltPlanDetailsDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdPickListMasterDetailsDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdPickListMasterDetailsDict start", "DefaultMasterDAO.GetAllInfoWithServerIdPickListMasterDetailsDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid FROM PickListMasterDetails ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdPickListMasterDetailsDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdPickListMasterDetailsDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdPickListMasterDetailsDict end", "DefaultMasterDAO.GetAllInfoWithServerIdPickListMasterDetailsDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = {
                    "Id": result[i].Id, "OVGuid": result[i].OVGuid
                };
            }

            // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {         
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdPickListMasterDetailsDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdASOWorkOrderDetailsDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdASOWorkOrderDetailsDict start", "DefaultMasterDAO.GetAllInfoWithServerIdASOWorkOrderDetailsDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid FROM ASOWorkOrderDetails ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdASOWorkOrderDetailsDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdASOWorkOrderDetailsDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdASOWorkOrderDetailsDict end", "DefaultMasterDAO.GetAllInfoWithServerIdASOWorkOrderDetailsDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = {
                    "Id": result[i].Id, "OVGuid": result[i].OVGuid
                };
            }

            // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdASOWorkOrderDetailsDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdRFLWorkOrderDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdRFLWorkOrderDict start", "DefaultMasterDAO.GetAllInfoWithServerIdRFLWorkOrderDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid FROM RFLWorkOrder ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdRFLWorkOrderDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdRFLWorkOrderDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdRFLWorkOrderDict end", "DefaultMasterDAO.GetAllInfoWithServerIdRFLWorkOrderDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = {
                    "Id": result[i].Id, "OVGuid": result[i].OVGuid
                };
            }

            // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdASOWorkOrderDetailsDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    this.GetAllInfoWithServerIdRFLServiceWorkOrderDict = function () {

        try {
            OneViewConsole.Debug("GetAllInfoWithServerIdRFLServiceWorkOrderDict start", "DefaultMasterDAO.GetAllInfoWithServerIdRFLServiceWorkOrderDict");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid FROM RFLServiceWorkOrder ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetAllInfoWithServerIdRFLServiceWorkOrderDict");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetAllInfoWithServerIdRFLServiceWorkOrderDict");

            OneViewConsole.Debug("GetAllInfoWithServerIdRFLServiceWorkOrderDict end", "DefaultMasterDAO.GetAllInfoWithServerIdRFLServiceWorkOrderDict");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = {
                    "Id": result[i].Id, "OVGuid": result[i].OVGuid
                };
            }

            // alert('ResultDic : ' + JSON.stringify(ResultDic));
            return ResultDic;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetAllInfoWithServerIdASOWorkOrderDetailsDict", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }
}
