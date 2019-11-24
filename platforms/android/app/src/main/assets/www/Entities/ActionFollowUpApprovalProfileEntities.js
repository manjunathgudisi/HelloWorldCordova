

//ActionFollowUpApprovalProfileEntity
function ActionFollowUpApprovalProfileEntity() {

    this.ActionFollowUpApprovalLevelInfoEntityList = new Array();

    this.Id = "INT PRIMARYKEY";
    this.Code = "TEXT";
    this.Type = "INT";

    this.ServiceId = "INT";
    this.ServerId = "TEXT";
    this.ClientGuid = "TEXT";
    this.OVGuid = "INT";

    //Approval User
    this.UserId = "INT";
    this.UserName = "TEXT";

    this.FollowUpUserId = "INT";
    this.FollowUpUserName = "TEXT";

    this.PlaceId = "INT";
    this.PlaceName = "TEXT";
    this.PlaceType = "INT";
    this.PlaceDimension = "TEXT";
    
    this.TemplateNodeId = "INT";
    this.TemplateName = "TEXT";

    this.UIDetailsJSON = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    this.CreatedUserId = "TEXT";
    this.CreatedDate = "TEXT";
    this.LastUpdatedUserId = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";


    this.OverallApprovalLevels = "INT";//Now not using
    this.OnDeviceApprovalLevels = "INT";//Now not using

    this.ValidityStartDate = "TEXT";
    this.ValidityEndDate = "TEXT";

    return this;

}

//ActionFollowUpApprovalLevelInfoEntity
function ActionFollowUpApprovalLevelInfoEntity() {

    this.ActionFollowUpApprovalUserDetailsEntityList = new Array();

    this.Id = "INT PRIMARYKEY";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";

    this.ActionFollowUpApprovalProfileId = "INT";//Primary key of ActionFollowUpApprovalProfileEntity
    this.ApprovalIndex = "INT";

    this.IsAnonymousUser = "TEXT";
    
    this.OnDeviceApprovalConfigJSON = "TEXT";
    
    this.IsOnDeviceApproval = "TEXT";

    this.TimeStamp = "TEXT";
}

//ActionFollowUpApprovalUserDetailsEntity
function ActionFollowUpApprovalUserDetailsEntity() {

    this.Id = "INT PRIMARYKEY";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";

    this.ActionFollowUpApprovalLevelInfoId = "INT";//Primary key of ActionFollowUpApprovalLevelInfoEntity
    this.ActionFollowUpApprovalProfileId = "INT";//Primary key of ActionFollowUpApprovalProfileEntity

    this.UserId = "INT";
    this.UserName = "TEXT";

    this.TimeStamp = "TEXT";
}


