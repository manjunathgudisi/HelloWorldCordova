
function DcApprovalProfileEntity() {

    this.DcApprovalLevelInfoEntityList = new Array();

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.Type = "TEXT";
    this.Code = "TEXT";

    this.ServiceId = "INT";

    ///who did dc
    this.DcUserId = "INT";   
    this.IsAnonymousDcUser = "TEXT";

    this.TemplateNodeId = "INT";    

    this.DcPlaceId = "INT";    
    this.DcPlaceDimension = "TEXT";
    this.DcPlaceType = "INT";
    this.AdvanceDcPlace = "TEXT";

    this.OverallApprovalLevels = "INT";
    this.OnDeviceApprovalLevels = "INT";

    this.ValidityStartDate = "TEXT";
    this.ValidityEndDate = "TEXT";

    this.TimeStamp = "TEXT";
}

function DcApprovalLevelInfoEntity() {

    this.DcApprovalUserDetailsEntityList = new Array();

    this.Id = "INT PRIMARYKEY";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";

    this.DcApprovalProfileId = "INT";//Primary key of DcApprovalProfileEntity
    this.ApprovalIndex = "INT";

    this.IsAnonymousUser = "TEXT";

    /// <summary>
    /*
    {
    TotalRows:1,
    MaxNoOfColumn:10,   
    SummaryViewConfig:
    { 
        IsDCSummaryEnabled:true,
        IsOverAllScoreSummaryEnabled:false,
        IsAttributeGroupScoreSummaryEnabled:false,
        IsNCActionSummaryEnabled:false,
        OverAllScoreHistoryCount:0,
        ActionHistoryCount:0
    },
        OnDeviceApprovalConfigControls:[
            {
                Type:"UserIdPasswordApprovalType",
                RowIndex:1,
                ColIndex:1,
                DisplayOrder:1,
                IsManadatory:true,
                LabelKey:"",
                ErrorMessageKey:""
            }
        ]
     }

  */

    this.OnDeviceApprovalConfigJSON = "TEXT";

    /// <summary>
    /// IsApprovalPreviewAllowed = true => Approval user can preview the data capture
    /// </summary>
    this.IsApprovalPreviewAllowed = "TEXT";

    /// <summary>
    /// IsApprovalReviewAllowed = true => Approval user can review the data capture (He can modify the dc)
    /// </summary>
    this.IsApprovalReviewAllowed = "TEXT";

    this.IsOnDeviceApproval = "TEXT";

    this.TimeStamp = "TEXT";
}

function DcApprovalUserDetailsEntity() {

    this.Id = "INT PRIMARYKEY";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";

    this.DcApprovalLevelInfoId = "INT";//Primary key of DcApprovalLevelInfoEntity
    this.DcApprovalProfileId = "INT";//Primary key of DcApprovalProfileEntity

    this.UserId = "INT";
    this.UserName = "TEXT";

    this.TimeStamp = "TEXT";
}



