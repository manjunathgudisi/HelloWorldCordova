
// OrganizationHierarchyNode
function OrganizationHierarchyNode() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Hand shaking id
    this.ServerId = "INT";

    // Service id
    this.OSGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";
    
    // OrganizationHierarchyNode code (unique code)
    this.Code = "TEXT";

    // Type of OrganizationHierarchyNode
    this.Type = "TEXT";
   
    // Nested set id for left
    this.Left = "INT";

    // Nested set id for right
    this.Right = "INT";

    // Parent OrganizationHierarchyNode id
    this.ParentNodeId = "INT";

    // Parent OrganizationHierarchyNode Client Guid
    this.ParentNodeClientGuid = "TEXT";

    // Master id of OrganizationHierarchyNode
    this.ChildDbElementId = "INT";

    // Master name of OrganizationHierarchyNode
    this.ChildDbElementName = "TEXT";

    // Master code of OrganizationHierarchyNode
    this.ChildDbElementCode = "TEXT";

    // Master type of OrganizationHierarchyNode
    this.ChildDbElementType = "TEXT";

    // Master id of parent OrganizationHierarchyNode
    this.ParentDbElementId = "INT";

    // Master code of parent OrganizationHierarchyNode
    this.ParentDbElementCode = "TEXT";

    // Master type of parent OrganizationHierarchyNode
    this.ParentDbElementType = "TEXT"; 
    
    // Sequence
    this.SequenceId = "INT";

    // Process count
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // It is dynamic node(when created Node(child) is dynamic and parent is existing , eg: RCO/product under RCO/Kitchen)
    this.IsDynamicChild = "TEXT";
    
    // Parent node is dynamic(when created Node(parent) is dynamic and child is existing , eg : Label under RCO/Product)
    this.IsDynamicParent = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";
}

// OrganizationAssetsNodeRCOSpecialMapping
function OrganizationAssetsNodeRCOSpecialMapping() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Hand shaking id
    this.ServerId = "INT";

    // Service id
    this.OSGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT"; 

    // OrganizationAssetsNodeRCOSpecialMapping code (unique code)
    this.Code = "TEXT";

    // Type of OrganizationAssetsNodeRCOSpecialMapping
    this.Type = "TEXT";

    // OrganizationAssetsNodeId
    this.OrganizationAssetsNodeId = "INT";

    // RCOMasterId
    this.RCOMasterId = "INT";
    
    // RCOMasterId
    this.RCOMasterClientGuid = "TEXT";

    // RCOTypeId
    this.RCOTypeId = "INT";

    // Process count
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";
    
    // when this row created
    this.CreatedDate = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";
}

// OrganizationAssetsNode
function OrganizationAssetsNode() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Hand shaking id
    this.ServerId = "INT";

    // Service id
    this.OSGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT"; 

    // OrganizationAssetsNode code (unique code)
    this.Code = "TEXT";

    // Type of OrganizationAssetsNode
    this.Type = "TEXT";

    // Nested set id for left
    this.Left = "INT";

    // Nested set id for right
    this.Right = "INT";

    // Parent OrganizationAssetsNode id
    this.ParentNodeId = "INT";

    // Parent OrganizationHierarchyNode Client Guid
    this.ParentNodeClientGuid = "TEXT";

    // Master id of OrganizationAssetsNode
    this.ChildDbElementId = "INT";

    // Master name of OrganizationAssetsNode
    this.ChildDbElementName = "TEXT";

    // Master code of OrganizationAssetsNode
    this.ChildDbElementCode = "TEXT";

    // Master type of OrganizationAssetsNode
    this.ChildDbElementType = "TEXT";

    // Master id of parent OrganizationAssetsNode
    this.ParentDbElementId = "INT";

    // Master code of parent OrganizationAssetsNode
    this.ParentDbElementCode = "TEXT";

    // Master type of parent OrganizationAssetsNode
    this.ParentDbElementType = "TEXT";
    
    this.LabelId1 = "INT";
    this.LabelId2 = "INT";
    this.LabelId3 = "INT";
    this.LabelId4 = "INT";
    this.LabelId5 = "INT";

    // Sequence
    this.SequenceId = "INT";

    // Process count
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // It is dynamic node(when created Node(child) is dynamic and parent is existing , eg: RCO/product under RCO/Kitchen)
    this.IsDynamicChild = "TEXT";

    // Parent node is dynamic(when created Node(parent) is dynamic and child is existing , eg : Label under RCO/Product)
    this.IsDynamicParent = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";
}

// TemplateNode
function TemplateNode() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Hand shaking id
    this.ServerId = "INT";

    // Service id
    this.OSGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // TemplateNode code (unique code)
    this.Code = "TEXT";

    // Type of TemplateNode
    this.Type = "TEXT";

    // Nested set id for left
    this.Left = "INT";

    // Nested set id for right
    this.Right = "INT";

    // Parent TemplateNode id
    this.ParentNodeId = "INT";

    // Parent OrganizationHierarchyNode Client Guid
    this.ParentNodeClientGuid = "TEXT";

    // Master id of TemplateNode
    this.ChildDbElementId = "INT";

    // Master name of TemplateNode
    this.ChildDbElementName = "TEXT";

    // Master code of TemplateNode
    this.ChildDbElementCode = "TEXT";

    // Master type of TemplateNode
    this.ChildDbElementType = "TEXT";

    // Master id of parent TemplateNode
    this.ParentDbElementId = "INT";

    // Master code of parent TemplateNode
    this.ParentDbElementCode = "TEXT";

    // Master type of parent TemplateNode
    this.ParentDbElementType = "TEXT";

    // Sequence
    this.SequenceId = "INT";

    // Process count
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // It is dynamic node(when created Node(child) is dynamic and parent is existing , eg: RCO/product under RCO/Kitchen)
    this.IsDynamicChild = "TEXT";

    // Parent node is dynamic(when created Node(parent) is dynamic and child is existing , eg : Label under RCO/Product)
    this.IsDynamicParent = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";
}

//RcoAndLabelMapping
function RcoAndLabelMapping() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Hand shaking id
    this.ServerId = "INT";

    // Service id
    this.OSGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // RcoAndLabelMapping code (unique code)
    this.Code = "TEXT";

    // Type of RcoAndLabelMapping
    this.Type = "TEXT";

    // RCOMasterId
    this.RCOMasterId = "INT";

    // RCOMasterClientGuid
    this.RCOMasterClientGuid = "TEXT";

    // RCOTypeId
    this.RCOTypeId = "INT";

    // LabelTypeId
    this.LabelTypeId = "INT";

    // LabelName
    this.LabelTypeName = "TEXT";

    // LabelId
    this.LabelId = "INT";

    // LabelName
    this.LabelName = "TEXT";

    // Process count
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // when this row created
    this.CreatedDate = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

}

//OrderDetails
function OrderDetails() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Hand shaking id
    this.ServerId = "INT";

    // Service id
    this.OSGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // OrderDetails code (unique code)
    this.Code = "TEXT";

    // Type of OrderDetails
    this.Type = "TEXT";

    // ReceiverBU_Id
    this.ReceiverBUId = "INT";

    // SupplierBU_Id
    this.SupplierBUId = "INT";

    //STNo
    this.STNo = "TEXT";

    //OTNo
    this.OTNo = "TEXT";

    // RCOMasterId
    this.RCOMasterId = "INT";

    // RCOMasterName
    this.RCOMasterName = "TEXT";

    // RCOMasterClientGuid
    //this.RCOMasterClientGuid = "TEXT";

    // RCOTypeId
    //this.RCOTypeId = "INT";

    // ItemSection
    //this.ItemSection = "TEXT";

    // Unit
    this.Unit = "TEXT";

    // OrderQuantity
    this.OrderQuantity = "INT";

    //OrderDate
    this.OrderDate = "TEXT";

    //DeliveredQuantity
    this.DeliveredQuantity = "INT";

    //DeliveredDate
    this.DeliveredDate = "TEXT";

    //OrderType
    //this.OrderType = "TEXT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";
    
    // when this row created
    this.CreatedDate = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    this.RCOMasterType = "INT";

    // ProcessId/Template Id From Col1 to Col15
    this.Col1 = "TEXT";
    this.Col2 = "TEXT";
    this.Col3 = "TEXT";
    this.Col4 = "TEXT";
    this.Col5 = "TEXT";
    this.Col6 = "TEXT";
    this.Col7 = "TEXT";
    this.Col8 = "TEXT";
    this.Col9 = "TEXT";
    this.Col10 = "TEXT";
    this.Col11 = "TEXT";
    this.Col12 = "TEXT";
    this.Col13 = "TEXT";
    this.Col14 = "TEXT";
    this.Col15 = "TEXT";
}

//OrderDetails
function PurchaseOrder() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Hand shaking id
    this.ServerId = "INT";

    // Service id
    this.OSGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // OrderDetails code (unique code)
    this.Code = "TEXT";

    // Type of OrderDetails
    this.Type = "TEXT";

    // BusinessUnitId
    this.BusinessUnitId = "INT";

    // BusinessUnitName
    this.BusinessUnitName = "TEXT";
    
    // ItemMasterId
    this.ItemMasterId = "INT";

    // ItemMasterName
    this.ItemMasterName = "TEXT";

    // ItemCode
    this.ItemCode = "TEXT";

    // RcoTypeId
    this.RcoTypeId = "INT";
    
    //PurchaseOrderNo
    this.PurchaseOrderNo = "TEXT";

    //PurchaseOrderType
    this.PurchaseOrderType = "TEXT";

    // CompanyCode
    this.CompanyCode = "INT";

    // SupplierCode
    this.SupplierCode = "TEXT";

    // SupplierName
    this.SupplierName = "TEXT";

    // RequestDate
    this.RequestDate = "TEXT";

    // DeliveryDate
    this.DeliveryDate = "TEXT";
        
    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // when this row created
    this.CreatedDate = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    //Is Purchaseorder Active or In-Active
    this.IsPOActive = "TEXT";

    //Is Item In-Active
    this.IsItemCompletedorInActive = "TEXT";

    //Is DC completed for the item
    this.IsItemDCCompleted = "TEXT";
}

