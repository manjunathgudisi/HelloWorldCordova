
function AttributeOtherConfigEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";
    
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    this.ServiceId = "INT";
    this.DcPlaceId = "INT";
    this.DcPlaceDimension = "TEXT";
    this.DcUserId = "INT";
    this.TemplateNodeId = "INT";

    this.UserWiseLastDC = "TEXT";
    this.DcPlaceWiseLastDC = "TEXT";

    this.AttributeDefaultValueMetaDataDict = "TEXT";
    this.HistoryMetaDataDict = "TEXT";
    this.NAMetaDataDict = "TEXT";
    this.MutiMediaSubElementMetaDataDict = "TEXT";
    this.HelpDocumentMetaDataDict = "TEXT";   
   
    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
  
    return this;
}

function TemplateConfigMetaData() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    this.ServiceId = "INT"; 
    this.TemplateNodeId = "INT";
    this.TemplateName = "TEXT";
    this.TemplateShortName = "TEXT";

    this.IsHeaderEnable = "TEXT";
    this.IsFooterEnable = "TEXT";

    this.IsScoringLogicEnabled = "TEXT";
    this.ScoringLogicType = "INT";

    this.RouteKeyConfig = "TEXT";
    this.AttributeGroupSummaryDisplayConfig = "TEXT";

    this.TemplateConfigMetaDataDetails = "TEXT";
    
    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";

    return this;
}

function DCDisplayMetaData() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";  
    this.DeviceDisplyMode = "TEXT";
 
    this.IsNameDisplay = "TEXT";
    this.IsShortNameDisplay = "TEXT";
    this.IsImageDisplay = "TEXT";
    this.IsTypeIconDisplay = "TEXT";
    this.IsMandatoryDisplay = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";

    return this;
}

function TemplateValidationConfigMetaDataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";
    
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    this.ServiceId = "INT";
    this.DcUserId = "INT";
    this.TemplateNodeId = "INT";
    this.DcPlaceId = "INT";
    this.DcPlaceDimension = "TEXT";


    //Metadata will be used while save dc
    this.SaveValidationMetaData = "TEXT";

    //Metadata will be used while submit dc
    this.SubmitValidationMetaData = "TEXT";

    //Metadata for ui and other validations
    this.ControlEventValidationJobs = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function TemplateUIEventJobConfigMetaDataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    this.ServiceId = "INT";
    this.DcUserId = "INT";
    this.TemplateNodeId = "INT";
    this.DcPlaceId = "INT";
    this.DcPlaceDimension = "TEXT";

    // Json
    this.ControlEventUIJobs = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function DefaultPageConfigMetaDataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    this.ServiceId = "INT";
    this.UserId = "INT";
    this.PageId = "INT";
   
    // Json
    this.PageConfig = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function ACLConfigMetaDataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";
    this.UserId = "INT";
   
    // Json
    this.ACLConfig = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function MenuConfigMetaDataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";
    this.UserId = "INT";
   
    // Json
    this.MenuConfig = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function RouterConfigMetaDataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    this.ServiceId = "INT";

    // Json
    this.RouterConfig = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function LandingPageConfigMetaDataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";
    this.UserId = "INT";

    // Json
    this.LandingPageConfig = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function LandingPageViewReponseEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";
    this.UserId = "INT";
    this.LandingPageViewName = "TEXT";
    this.IsOnDeviceApprovalProfileNeeded = "TEXT";

    // Json
    this.LandingPageViewDisplayConfig = "TEXT";
    this.LandingPageViewReponsePast = "TEXT";
    this.LandingPageViewReponseToday = "TEXT";
    this.LandingPageViewReponseFuture = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function DcCustomPageHtmlEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";
    this.TemplateNodeId = "INT";

    this.Html = "TEXT";
    this.Code = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function MobileViewRecordsMetadataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    this.ServiceId = "INT";
    this.DcUserId = "INT";
    this.TemplateNodeId = "INT";
    this.DcPlaceId = "INT";
    this.DcPlaceDimension = "TEXT";

    this.ViewRecordsFacadeKey = "TEXT";

    // Json
    this.Config = "TEXT";
    // Json
    this.InlineEditConfig = "TEXT";
    // Json
    this.AutoTemperatureListnerControlConfig = "TEXT";
    // Json
    this.Rules = "TEXT";
    // Json
    this.DefaultSearchConfig = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function GarbageCollectorMetadataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    this.ServiceId = "INT";
    this.DcUserId = "INT";
    this.TemplateNodeId = "INT";
    this.DcPlaceId = "INT";
    this.DcPlaceDimension = "TEXT";

    // Json
    this.Configuration = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function MobileDcPreviewMetadataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    this.ServiceId = "INT";
    this.DcUserId = "INT";
    this.TemplateNodeId = "INT";
    this.DcPlaceId = "INT";
    this.DcPlaceDimension = "TEXT";

    this.IsReferApprovalDcSummaryViewConfig = "TEXT";
    // Json
    this.DcSummaryViewConfig = "TEXT";
    // Json
    this.AttributeSummaryViewConfig = "TEXT";


    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function DATEntityTypes() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT"; 
    this.Name = "TEXT";

    this.EntityName = "TEXT";
    this.Namespace = "TEXT";
    this.MappedTableName = "TEXT";
    this.DisplayName = "TEXT";

    this.OrganizationId_Id = "INT";
    this.ImageIcon = "TEXT";
    this.FontIcon = "INT";
    
    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function BusinessEventEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    this.ServiceId = "INT";
    this.UserId = "INT";

    this.EventName = "TEXT";
    this.EventDesc = "TEXT";
    this.IsOperationEvent = "TEXT";

    this.ClassName = "TEXT";
    this.MethodName = "TEXT";

    this.OperationCategory = "TEXT";
    this.IsTimerEvent = "TEXT";
    this.CRONExpression = "TEXT";
    this.IsSyncEvent = "TEXT";

    // Json
    this.BusinessEventDefinition = "TEXT";

    // Json
    this.BusinessEventHandlers = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function MitmarkLandingPageConfigEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";
    this.UserId = "INT";

    // Json
    this.MitmarkLandingPageConfig = "TEXT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function MitmarkLandingPageViewReponseEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";
    this.UserId = "INT";

    this.TemplateGroupId = "INT";
    this.TemplateGroupName = "TEXT";

    // Json
    this.LandingPageViewConfig = "TEXT";    

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}



function ItemProcessMappingEntity_OLD() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";

    this.ProcessId = "INT";
    this.ProcessName = "TEXT";
    this.ProcessSequence = "INT";

    this.DataId = "INT";
    this.DataName = "TEXT";
    this.DataType = "INT";
       
    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}


function ItemProcessMappingEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";

    //Format {Col1:14026,Col2:14077,Col3:14217,Col4:14227,Col5:14235,Col6:14245,Col7:14254,Col8:14261,Col9:14268,Col10:14278,Col11:14287,Col12:14293,Col13:"",Col14:"",Col15:""}
    this.ProcessMappingDetails = "TEXT";

    this.TimeStamp = "TEXT";
}

function ExcludedAttributeMetadataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";
    this.UserId = "INT";

    this.TemplateNodeId = "INT";

    this.PlaceId = "INT";

    //Format [123,124,125]
    this.AttributeIdLst = "TEXT";

    this.CreatedDate = "TEXT";
    //this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}