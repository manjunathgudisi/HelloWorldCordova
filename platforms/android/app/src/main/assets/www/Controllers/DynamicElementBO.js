	 
function DynamicElementBO() {
 
    // Step 1: Create master
    // Step 2: Create node
    // Step 3: reponse master id and node id
    this.AddDynamicRCO = function (RcoObj, ParentNodeId, ParentDbElementType, ParentDbElementId) {
        try {
            OneViewConsole.Debug("AddDynamicRCO start", "DynamicElementBO.AddDynamicRCO");

            var _oRcoMasterEntity = AddRcoMaster(RcoObj);         
            var _oOrganizationAssetsNode = AddOrganizationAssetNode(_oRcoMasterEntity, ParentNodeId, ParentDbElementType, ParentDbElementId);         
            var Response = { "MasterId": _oRcoMasterEntity.Id, "MasterClientGuid": _oRcoMasterEntity.ClientGuid, "NodeClientGuid": _oOrganizationAssetsNode.ClientGuid , "NodeId" : _oOrganizationAssetsNode.Id};

            OneViewConsole.Debug("AddDynamicRCO end", "DynamicElementBO.AddDynamicRCO");
            return Response;
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("BO", "DynamicElementBO.AddDynamicRco", Excep);
        }
        finally {
            _oRcoMasterEntity = null;
            _oOrganizationAssetsNode = null;
            Response = null;
        }
    }

    var AddRcoMaster = function (_oDcResultDetailsEntity) {
        try {
            OneViewConsole.Debug("AddRcoMaster start", "DynamicElementBO.AddRcoMaster");

            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();           
            var _oRcoMasterEntity = new RcoMasterEntity();
            _oRcoMasterEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oRcoMasterEntity.Name = _oDcResultDetailsEntity.AnswerValue;
            _oRcoMasterEntity.IsSynchronized = 'false';
            _oRcoMasterEntity.CreatedDate = CurrenntDateAndTime;
            _oRcoMasterEntity.CreatedUserId = OneViewSessionStorage.Get("LoginUserId");
           // _oRcoMasterEntity.RcoTypeId = _oDcResultDetailsEntity.AnswerFKType;
            _oRcoMasterEntity.Type = _oDcResultDetailsEntity.AnswerFKType;
            _oRcoMasterEntity.MobileVersionId = 1;
            var _outRcoMasterEntity = new DefaultMasterDAO("RcoMasterEntity").CreateMaster(_oRcoMasterEntity);

            OneViewConsole.Debug("AddRcoMaster end", "DynamicElementBO.AddRcoMaster");

            return _outRcoMasterEntity;
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("BO", "DynamicElementBO.AddRcoMaster", Excep);
        }
        finally {
            oDateTime = null;
            CurrenntDateAndTime = null;
            _oRcoMasterEntity = null;
            _outRcoMasterEntity = null;
        }
    }

    var AddOrganizationAssetNode = function (oRcoMasterEntity, ParentNodeId, ParentDbElementType, ParentDbElementId) {
        try {
            OneViewConsole.Debug("AddOrganizationAssetNode start", "DynamicElementBO.AddOrganizationAssetNode");

            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();

            var oDefaultTreeDAO = new DefaultTreeDAO();
            var oObjResult = oDefaultTreeDAO.GetNodeById(ParentNodeId, "OrganizationAssetsNode");

            var MyLeft = oObjResult[0].Right;
            var MyRight = MyLeft + 1;

            var _oOrganizationAssetsNode = new OrganizationAssetsNode();
            _oOrganizationAssetsNode.ClientGuid = OneViewUniqueGenerator.GetGuid();
            // _oOrganizationAssetsNode.Type = "OrganizationAssestsNode";
            _oOrganizationAssetsNode.Type = DATEntityType.OrganizationAssestsNode;

            _oOrganizationAssetsNode.Left = MyLeft;
            _oOrganizationAssetsNode.Right = MyRight;
            _oOrganizationAssetsNode.ParentNodeId = ParentNodeId;
            _oOrganizationAssetsNode.ChildDbElementId = oRcoMasterEntity.Id;
         //   _oOrganizationAssetsNode.ChildDbElementId = oRcoMasterEntity.ClientGuid;
            _oOrganizationAssetsNode.ChildDbElementName = oRcoMasterEntity.Name;
            _oOrganizationAssetsNode.ChildDbElementType = oRcoMasterEntity.Type;
            _oOrganizationAssetsNode.ParentDbElementId = ParentDbElementId;
            //_oOrganizationAssetsNode.ParentDbElementCode = ParentDbElementCode;
            _oOrganizationAssetsNode.ParentDbElementType = ParentDbElementType;
            _oOrganizationAssetsNode.IsSynchronized = "false";
            _oOrganizationAssetsNode.MobileVersionId = 1;
            _oOrganizationAssetsNode.IsDynamicChild = 'true';
            _oOrganizationAssetsNode.IsDynamicParent = 'false';       
            var _outOrganizationAssetsNode = new DefaultMasterDAO("OrganizationAssetsNode").CreateMaster(_oOrganizationAssetsNode);          
            oDefaultTreeDAO.UpdateLeftRight(MyLeft, MyRight, "OrganizationAssetsNode");
  
            OneViewConsole.Debug("AddOrganizationAssetNode end", "DynamicElementBO.AddOrganizationAssetNode");

            return _outOrganizationAssetsNode;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DynamicElementBO.AddOrganizationAssetNode", Excep);
        }
        finally {
            oDateTime = null;
            CurrenntDateAndTime = null;
            oDefaultTreeDAO = null;
            oObjResult = null;
            MyLeft = null;
            MyRight = null;
            _oOrganizationAssetsNode = null;
            _outOrganizationAssetsNode = null;
        }
    }

    this.AddDynamicRCOWithLabel = function (RcoObj, ParentNodeId, ParentDbElementType, ParentDbElementId, LabelId) {
        try {
            OneViewConsole.Debug("AddDynamicRCOWithLabel start", "DynamicElementBO.AddDynamicRCOWithLabel");
            var Response;
            var _oRcoMasterEntity = AddRcoMaster(RcoObj);           
            var _oRcoNode = AddOrganizationAssetNode(_oRcoMasterEntity, ParentNodeId, ParentDbElementType, ParentDbElementId);           
            var _oDefaultMasterDAO = new DefaultMasterDAO('Label');
            var _oLabelEntity = _oDefaultMasterDAO.GetByServerId(LabelId);
            if (_oLabelEntity.length > 0) {
                var _oLabelNode = AddLabelOrganizationAssetNode(_oLabelEntity[0], _oRcoNode.ClientGuid, _oRcoNode.ChildDbElementType, _oRcoNode.ChildDbElementId);             
            }
            Response = { "MasterId": _oRcoMasterEntity.Id, "MasterClientGuid": _oRcoMasterEntity.ClientGuid, "NodeClientGuid": _oRcoNode.ClientGuid, "NodeId": _oRcoNode.Id };

            OneViewConsole.Debug("AddDynamicRCOWithLabel end", "DynamicElementBO.AddDynamicRCOWithLabel");

            return Response;

        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("BO", "DynamicElementBO.AddDynamicRCOWithLabel", Excep);
        }
        finally {
            _oRcoMasterEntity = null;
            _oRcoNode = null;
            _oDefaultMasterDAO = null;
            _oLabelEntity = null;
            _oLabelNode = null;
            Response = null;
        }
    }

    this.AddDynamicOrder = function (RcoObj, ParentNodeId, ParentDbElementType, ParentDbElementId, LabelId, Type, SectionCode) {
        try {
            OneViewConsole.Debug("AddDynamicWorkOrder start", "DynamicElementBO.AddDynamicWorkOrder");
            
            var Response;
            var _oRcoMasterEntity = AddRcoWorkOrder(RcoObj, Type, SectionCode);
            var _oRcoNode = AddRCOAssetNodeSpecialMapping(_oRcoMasterEntity, ParentNodeId, ParentDbElementType, ParentDbElementId);
          
            Response = { "MasterId": _oRcoMasterEntity.Id, "MasterClientGuid": _oRcoMasterEntity.ClientGuid, "NodeClientGuid": _oRcoNode.ClientGuid, "NodeId": _oRcoNode.Id };

            OneViewConsole.Debug("AddDynamicWorkOrder end", "DynamicElementBO.AddDynamicWorkOrder");

            return Response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DynamicElementBO.AddDynamicRCOWithLabel", Excep);
        }
        finally {
            _oRcoMasterEntity = null;
            _oRcoNode = null;
            _oDefaultMasterDAO = null;
            _oLabelEntity = null;
            _oLabelNode = null;
            Response = null;
        }
    }

    var AddRcoWorkOrder = function (_oDcResultDetailsEntity, Type, SectionCode) {
        try {
            OneViewConsole.Debug("AddRcoMaster start", "DynamicElementBO.AddRcoMaster");

            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
            var _oRcoMasterEntity = new RcoMasterEntity();

            _oRcoMasterEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oRcoMasterEntity.Name = "";
            _oRcoMasterEntity.IsSynchronized = 'false';
            _oRcoMasterEntity.CreatedDate = CurrenntDateAndTime;
            _oRcoMasterEntity.CreatedUserId = OneViewSessionStorage.Get("LoginUserId");
            //_oRcoMasterEntity.RcoTypeId = _oDcResultDetailsEntity.AnswerFKType;
            _oRcoMasterEntity.Type = Type;
            _oRcoMasterEntity.MobileVersionId = 1;
            _oRcoMasterEntity.Column1 = (SectionCode != undefined) ? SectionCode : "";
            _oRcoMasterEntity.Column3 = _oDcResultDetailsEntity.AnswerValue;

            //alert(JSON.stringify(_oRcoMasterEntity));

            var _outRcoMasterEntity = new DefaultMasterDAO("RcoMasterEntity").CreateMaster(_oRcoMasterEntity);

            OneViewConsole.Debug("AddRcoMaster end", "DynamicElementBO.AddRcoMaster");

            return _outRcoMasterEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DynamicElementBO.AddRcoMaster", Excep);
        }
        finally {
            oDateTime = null;
            CurrenntDateAndTime = null;
            _oRcoMasterEntity = null;
            _outRcoMasterEntity = null;
        }
    }

    var AddRCOAssetNodeSpecialMapping = function (_oRcoMasterEntity, ParentNodeId, ParentDbElementType, ParentDbElementId) {
        try {
            OneViewConsole.Debug("AddRCOAssetNodeSpecialMapping start", "DynamicElementBO.AddRCOAssetNodeSpecialMapping");

            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();

            var oDefaultMasterDAO = new DefaultMasterDAO("OrganizationAssetsNodeRCOSpecialMapping");
            
            var _oOrganizationAssetsNodeRCOSpecialMapping = new OrganizationAssetsNodeRCOSpecialMapping();
            _oOrganizationAssetsNodeRCOSpecialMapping.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oOrganizationAssetsNodeRCOSpecialMapping.IsSynchronized = "false";
            _oOrganizationAssetsNodeRCOSpecialMapping.MobileVersionId = 1;
            //_oOrganizationAssetsNodeRCOSpecialMapping.Type = 1;
            _oOrganizationAssetsNodeRCOSpecialMapping.OrganizationAssetsNodeId = ParentNodeId;
            //_oOrganizationAssetsNodeRCOSpecialMapping.RCOMasterId = 1;
            _oOrganizationAssetsNodeRCOSpecialMapping.RCOTypeId = _oRcoMasterEntity.Type;
            _oOrganizationAssetsNodeRCOSpecialMapping.RCOMasterClientGuid = _oRcoMasterEntity.ClientGuid;
            _oOrganizationAssetsNodeRCOSpecialMapping.Type = DATEntityType.OrganizationAssetsNodeRCOSpecialMapping;
            
            
            _oOrganizationAssetsNodeRCOSpecialMapping.CreatedDate = CurrenntDateAndTime;

            //alert(JSON.stringify(_oOrganizationAssetsNodeRCOSpecialMapping));

            var _outOrganizationAssetsNodeRCOSpecialMapping = oDefaultMasterDAO.CreateMaster(_oOrganizationAssetsNodeRCOSpecialMapping);
           
            OneViewConsole.Debug("AddRCOAssetNodeSpecialMapping end", "DynamicElementBO.AddRCOAssetNodeSpecialMapping");

            return _outOrganizationAssetsNodeRCOSpecialMapping;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DynamicElementBO.AddRCOAssetNodeSpecialMapping", Excep);
        }
        finally {
            oDateTime = null;
            CurrenntDateAndTime = null;
            oDefaultMasterDAO = null;
            oObjResult = null;
            MyLeft = null;
            MyRight = null;
            _oOrganizationAssetsNode = null;
            _outOrganizationAssetsNode = null;
            oDefaultTreeDAO = null;
        }
    }



    var AddLabelOrganizationAssetNode = function (_oLabelEntity, ParentNodeId, ParentDbElementType, ParentDbElementId) {
        try {
            OneViewConsole.Debug("AddLabelOrganizationAssetNode start", "DynamicElementBO.AddLabelOrganizationAssetNode");

            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
            var oDefaultMasterDAO = new DefaultMasterDAO("OrganizationAssetsNode");
            var oObjResult = oDefaultMasterDAO.GetAllMastersByColumn("ClientGuid", ParentNodeId, "TEXT");
            var MyLeft = oObjResult[0].Right;
            var MyRight = MyLeft + 1;
            var _oOrganizationAssetsNode = new OrganizationAssetsNode();
            _oOrganizationAssetsNode.ClientGuid = OneViewUniqueGenerator.GetGuid();
            // _oOrganizationAssetsNode.Type = "OrganizationAssestsNode";
            _oOrganizationAssetsNode.Type = DATEntityType.OrganizationAssestsNode;
            _oOrganizationAssetsNode.Left = MyLeft;
            _oOrganizationAssetsNode.Right = MyRight;
            _oOrganizationAssetsNode.ParentNodeClientGuid = ParentNodeId;
            _oOrganizationAssetsNode.ChildDbElementId = _oLabelEntity.ServerId;
            //   _oOrganizationAssetsNode.ChildDbElementId = oRcoMasterEntity.ClientGuid;
            _oOrganizationAssetsNode.ChildDbElementName = _oLabelEntity.Name;
            _oOrganizationAssetsNode.ChildDbElementType = _oLabelEntity.Type;
            _oOrganizationAssetsNode.ParentDbElementId = ParentDbElementId; //To do: While creating dynamic products , there is no ServerId for product, need to get ParentDbElementId from server after download
            //_oOrganizationAssetsNode.ParentDbElementCode = ParentDbElementCode;
            _oOrganizationAssetsNode.ParentDbElementType = ParentDbElementType;
            _oOrganizationAssetsNode.IsSynchronized = "false";
            _oOrganizationAssetsNode.MobileVersionId = 1;
            _oOrganizationAssetsNode.IsDynamicChild = 'false';
            _oOrganizationAssetsNode.IsDynamicParent = 'true';
            var _outOrganizationAssetsNode = new DefaultMasterDAO("OrganizationAssetsNode").CreateMaster(_oOrganizationAssetsNode);
            var oDefaultTreeDAO = new DefaultTreeDAO();
            oDefaultTreeDAO.UpdateLeftRight(MyLeft, MyRight, "OrganizationAssetsNode");

            OneViewConsole.Debug("AddLabelOrganizationAssetNode end", "DynamicElementBO.AddLabelOrganizationAssetNode");

            return _outOrganizationAssetsNode;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DynamicElementBO.AddLabelOrganizationAssetNode", Excep);
        }
        finally {
            oDateTime = null;
            CurrenntDateAndTime = null;
            oDefaultMasterDAO = null;
            oObjResult = null;
            MyLeft = null;
            MyRight = null;
            _oOrganizationAssetsNode = null;
            _outOrganizationAssetsNode = null;
            oDefaultTreeDAO = null;
        }
    }
}