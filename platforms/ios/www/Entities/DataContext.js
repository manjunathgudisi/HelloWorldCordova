
// Dont change this variable names, order and content 
// Note : If anybody want to change or add any thing discuss with all the team

var SqliteDataContext = [

    // Master tables
	"MasterdataRegistry",
    "ServiceMasterEntity",
    "OrganizationMasterEntity",
    "OrganizationGroupMasterEntity",
    "OrganizationGroupType",
    "RoleMasterEntity",
    "UserMasterEntity",
    "RcoMasterEntity",
    "RcoType",
    "AttributeGroupType",
    "AttributeGroupMasterEntity",
    "AttributeMasterEntity",
    "Label",
    "LabelType",
    "ShiftMasterEntity",
    "ShiftDetailsMasterEntity",
    "AnonymousUserMasterEntity",
    "IncidentMasterEntity",
    "IncidentType",
    "RiskMasterEntity",
    "BandMasterEntity",
    "BandDetailsMasterEntity",
    "BusinessCalendarEntity",
    "PeriodTypeEntity",
    "PeriodEntity",

    // Node tables
    "OrganizationHierarchyNode",
    "OrganizationAssetsNode",
    "TemplateNode",
    "OrganizationAssetsNodeRCOSpecialMapping",
    "RcoAndLabelMapping",
    "OrderDetails",
    "PurchaseOrder",
    "WorkOrderItemDetails",
    "FlightBeltPlanDetails",
    "FlightCellPlanDetails",
    "FlightOALPlanDetails",
    "PickListMasterDetails",
    "ASOWorkOrderDetails",
    "RFLWorkOrder",
    "RFLServiceWorkOrder",

    // Dc Profile tables
    "DcProfileEntity",
    "DefaultScheduleEntity",

    "DcProfileSyncStatus",

    // Dc tables
   	"DataCaptureEntity",   
    "DcResultsEntity",
    "DcResultDetailsEntity",

    // Action tables
    "ActionEntity",
    "ActionDetailsEntity",
    "DCActionMapping",
    "DCNCMapping",
    "MultiMediaSubElements",
    "MultiMediaBlobSubElements",
    "PredefinedActionMasterEntity",
    "ActionManualFollowUpEntity",
    "ActionFollowUpApprovalProfileEntity",
    "ActionFollowUpApprovalLevelInfoEntity",
    "ActionFollowUpApprovalUserDetailsEntity",
    "ActionResolveApprovalEntity",

    // MetaData tables   
    "AttributeOtherConfigEntity",
    "TemplateConfigMetaData",
    "TemplateValidationConfigMetaDataEntity",
    "TemplateUIEventJobConfigMetaDataEntity",
    "MobileViewRecordsMetadataEntity",
    "GarbageCollectorMetadataEntity",
    "MobileDcPreviewMetadataEntity",
    "DcCustomPageHtmlEntity",
    "DefaultPageConfigMetaDataEntity",
    "ACLConfigMetaDataEntity",
    "MenuConfigMetaDataEntity",
    "RouterConfigMetaDataEntity",
    "LandingPageConfigMetaDataEntity",
    "LandingPageViewReponseEntity",
     "DATEntityTypes",
     "BusinessEventEntity",
     "MitmarkLandingPageConfigEntity",
     "MitmarkLandingPageViewReponseEntity",
     "ItemProcessMappingEntity",
     "ExcludedAttributeMetadataEntity",
     
    
    // Dc Approval Profile tables
    "DcApprovalProfileEntity",
    "DcApprovalLevelInfoEntity",
    "DcApprovalUserDetailsEntity",
    
    // Dc Approval tables
    "DcApprovalEntity",
    "DcApprovalDetailsEntity",
    "DcApprovalHistoryEntity",
    "DCApprovalOtherInfoEntity",

    // Action-NC Profile tables
    "ActionNCProfileEntity",
    "DcResultDetailsHistory",

    // Notification tables
    "DcPendingTaskEntity",

    // GlobalizationMetdataEntity
    "GlobalizationMetdataEntity",

    // DCBlockerInfoEntity
    "DCBlockerInfoEntity",

    "ActionFollowUpInfoEntity",
    "ActionDataCaptureInfoEntity",
    "ActionResolveEntity",
   
     "TaskSyncLogEntity",
     "NotificationPoolEntity"
]

var MasterTables = [   
    "ServiceMasterEntity",
    "OrganizationMasterEntity",
    "OrganizationGroupMasterEntity",
    "OrganizationGroupType",
    "RoleMasterEntity",
    "UserMasterEntity",
    "RcoMasterEntity",
    "RcoType",
    "AttributeGroupType",
    "AttributeGroupMasterEntity",
    "AttributeMasterEntity",
    "Label",
    "LabelType",
    "ShiftMasterEntity",
    "ShiftDetailsMasterEntity",
    "IncidentMasterEntity",
    "IncidentType",
    "RiskMasterEntity",
    "BandMasterEntity",
    "BandDetailsMasterEntity",
    "BusinessCalendarEntity",
    "PeriodTypeEntity",
    "PeriodEntity",
]

var NodeTables = [
    "OrganizationHierarchyNode",
    "OrganizationAssetsNode",
    "TemplateNode",
    "OrganizationAssetsNodeRCOSpecialMapping",
    "OrderDetails",
    "RcoAndLabelMapping",
     "ItemProcessMappingEntity",
     "PurchaseOrder",
     "WorkOrderItemDetails",
     "FlightBeltPlanDetails",
     "FlightCellPlanDetails",
     "FlightOALPlanDetails",
     "PickListMasterDetails",
     "ASOWorkOrderDetails",
     "RFLWorkOrder",
     "RFLServiceWorkOrder"
]

var ProfileTables = [
    "DcProfileEntity",
    "DefaultScheduleEntity"   
]

var DcTables = [
    "DataCaptureEntity",
    "DcResultsEntity",
    "DcResultDetailsEntity"
]

var ActionTables=[ 
	"ActionEntity",
    "ActionDetailsEntity",
    "DCActionMapping",
    "DCNCMapping",
    "MultiMediaSubElements",
    "MultiMediaBlobSubElements"   
]

var DcApprovalProfileTables = [
    "DcApprovalProfileEntity",
    "DcApprovalLevelInfoEntity",
    "DcApprovalUserDetailsEntity"
]

var DcApprovalTables = [
    "DcApprovalEntity",
    "DcApprovalDetailsEntity",
    "DcApprovalHistoryEntity",
    "DCApprovalOtherInfoEntity",
]

var AuditTrialTables = [
    "DcResultDetailsHistory",  
]


