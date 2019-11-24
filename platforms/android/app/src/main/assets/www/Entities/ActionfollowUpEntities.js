
// ActionFollowUpInfoEntity
function ActionFollowUpInfoEntity() {

    this.ActionDataCaptureInfoEntity = null;

    this.Id = "INT PRIMARYKEY";
    
    this.ServiceId = "INT";
    this.MobileVersionId = "INT";
    this.ActionProfileOVGuid = "INT";

    this.ActionProfileId = "TEXT";
    this.ActionDataCaptureInfoId = "INT"; // foreign key of ActionDataCaptureInfoEntity

    this.FollowUpUserId = "INT";
    this.FollowUpUserName = "TEXT";

    this.ActionId = "INT";
    this.ActionDetailsId = "INT";
    this.PredefinedActionId= "INT";
    this.PredefinedActionName = "TEXT";
    this.CustomAction = "TEXT";
    this.FormActionDataCaptureId = "INT";

    this.ActionComments = "TEXT";
    this.ActionRaisedDate = "TEXT";

    this.RectificationTime = "TEXT";
    this.ActionRaisedUserId = "INT";
    this.ActionRaisedUserName = "TEXT";
    this.AnonymousActionRaisedUserInfo = "TEXT";

    this.ActionNCRuleInfo = "TEXT"; // Json Format
    this.ActionAttributeInfo = "TEXT"; // Json Format
    //this.ActionMultimediaSubElementsInfo = "TEXT"; // Json Format

    this.ActionMultimediaClientGuids = "TEXT"; // Comma separeted MappedEntityClientGuid for action
    this.ActionDetailsMultimediaClientGuids = "TEXT"; // Comma separeted MappedEntityClientGuid for action details

    this.IsForApproval = "TEXT";//For checking whether it is for approval or action followup
    
    this.AttributeIds = "TEXT";
    this.AttributeNames = "TEXT";
    
    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";

    return this;
}

// ActionDataCaptureInfoEntity
function ActionDataCaptureInfoEntity() {

    this.Id = "INT PRIMARYKEY";

    this.DocId = "TEXT";
    this.DataCaptureServerId = "INT";

    this.ServiceId = "INT";

    this.DcPlaceId = "INT";
    this.DcPlaceName = "TEXT";
    this.DcPlaceMaterializedPath = "TEXT";
    this.DcPlaceNameHierarchy = "TEXT";
    this.DcPlaceDimension = "TEXT";

    this.TemplateNodeId = "INT";
    this.TemplateNodeName = "TEXT";

    this.FollowUpUserInfo = "TEXT";//Format--***---$$,$$Department$$:$$HR$$IsDisplay$$=$$true$$,$$User$$:$$Mohammed Zeeshan$$IsDisplay$$=$$true$$,$$

    this.DcUserId = "INT";
    this.DcUserName = "TEXT";

    this.DataCaptureComments = "TEXT";
   
    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";

    return this;
}

// ActionResolveEntity
function ActionResolveEntity() {

    this.Id = "INT PRIMARYKEY";

    this.ServiceId = "INT";

    this.ServerId = "INT";
    this.MobileVersionId = "INT";

    this.ActionId = "INT";
    this.IsAllActions = "TEXT";
    this.ActionDetailsId = "INT";

    this.FollowUpUserId = "INT";
    this.FollowUpUserName = "TEXT";

    this.ActionStatus = "TEXT";
   
    this.Comments = "TEXT";

    this.IsSynchronized = "TEXT";
    this.ProcessCount = "INT";

    this.ApprovalStatus = "TEXT";
    this.ApprovalStatusDate = "TEXT";
    this.IsOnDeviceApprovalFinished = "TEXT";

    this.ClientGuid = "TEXT";
    this.IsSubmited = "TEXT";
    this.SubmitedDate = "TEXT";
    this.IsDisable = "TEXT";
    
    this.ActionResolveDate = "TEXT";
    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";

    return this;
}

// ActionManualFollowUpEntity
function ActionManualFollowUpEntity() {

    this.Id = "INT PRIMARYKEY";
    this.Code = "TEXT";
    this.Type = "INT";

    this.ServiceId = "INT";
    this.ServerId = "INT";
    this.ClientGuid = "TEXT"; 
    this.OVGuid = "INT"; 

    this.ActionClientGuid = "TEXT";
    this.IsAllActions = "TEXT";
    this.ActionDetailsClientGuid = "TEXT";

    this.FollowUpUserId = "INT";
    this.FollowUpUserName = "TEXT";

    this.FollowUpUserEmailIds = "TEXT";
    this.FollowUpUserPhoneNumber = "TEXT";

    this.SLA = "TEXT";
    this.SLAMode = "TEXT";
    this.ExecutionPriority = "INT";
    this.IsResolveAnyTime = "TEXT";
    this.SLAStartDate = "TEXT";
    this.SLAEndDate = "TEXT";
    this.IsSLADateWise = "TEXT";

    this.Comments = "TEXT";

    this.IsSynchronized = "TEXT";
    this.ProcessCount = "INT";
    
    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    this.CreatedUserId = "TEXT";
    this.CreatedDate = "TEXT";
    this.LastUpdatedUserId = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
    
    return this;
}


function ActionResolveApprovalEntity() {    

    this.Id = "INT PRIMARYKEY";
    this.ClientGuid = "TEXT";
    this.ServerId = "INT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.Type = "TEXT";
    this.Code = "TEXT";

    this.ServiceId = "INT";
    this.ActionResolveClientGuid = "TEXT";//Client guid,

    this.ActionFollowUpApprovalProfileId = "TEXT";//ServerId of ActionFollowUpApprovalProfileEntity

    this.ApprovalUserId = "INT";
    this.ApprovalUserName = "TEXT";
    
    this.ApprovalIndex = "TEXT";
    this.Comments = "TEXT";

    this.ApprovalStatus = "TEXT";
    this.ApprovalStatusDate = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    this.Latitude = "TEXT";
    this.Longitude = "TEXT";
    this.IsMultiMediaAttached = "TEXT";

    this.IsSynchronized = "TEXT";

    this.ProcessCount = "INT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}


