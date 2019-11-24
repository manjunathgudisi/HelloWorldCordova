
function DcProfileEntity() {

    this.DefaultScheduleEntityList = new Array();

    this.Id = "INT PRIMARYKEY";

    this.ServiceId = "INT";
    this.ServerId = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.IsAnonymousDcUser = "TEXT";
    this.DcUserId = "INT";
    this.UserName = "TEXT";

    this.TemplateNodeId = "INT";
    this.TemplateName = "TEXT";

    // DefaultScheduleEntity
    this.ScheduleDimension = "TEXT";

    this.DcPlaceId = "INT";
    this.DcPlaceName = "TEXT";
    this.DcPlaceDimension = "TEXT";
    this.CustomPlaceName = "TEXT";

    this.AdvanceDcPlace = "TEXT";

    this.DCPlaceNodeHierarchyInfo = "TEXT";
    this.DCPlaceNodeHierarchyCompleteInfo = "TEXT";
    this.TemplateNodeHierarchyInfo = "TEXT";
    this.TemplateNodeHierarchyCompleteInfo = "TEXT";
    this.OverallDCCount = "INT";
    this.OverallDCIds = "TEXT";
    this.InProgressDCCount = "INT";
    this.InProgressDCIds = "TEXT";
    this.CompletedDCCount = "INT";
    this.CompletedDCIds = "TEXT";
    this.ApprovedDCCount = "INT";
    this.ApprovedDCIds = "TEXT";

    this.TimeStamp = "TEXT";

    return this;
}

function DefaultScheduleEntity() {

    //this.ScheduleTimeEntity = "INT";
    this.Id = "INT PRIMARYKEY";

    this.ServerId = "INT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
   
     //2 times,
    this.ReccurenceId = "INT";
    this.ReccurenceName = "TEXT";

    this.FromTime = "TEXT";

    this.ToTime = "TEXT";
    	
    //Only FOr Reference,never going for transaction.
    this.ShiftId = "INT"
   
   	//daily
    this.Occurence = "INT";

    this.StartDate = "TEXT";
    this.EndDate = "TEXT";

    this.DcProfileId = "INT";

    this.TimeStamp = "TEXT";
    
    return this;
}

function DcProfileSyncStatus() {

    this.Id = "INT PRIMARYKEY";
    this.ServiceId = "INT";

    this.DcProfileId = "TEXT";
    this.TemplateNodeId = "INT";
    this.DcPlaceId = "INT";
    this.DcPlaceDimension = "TEXT";
    this.DcUserId = "INT";

    this.Occurence = "INT";
    this.InprogressCount = "INT";
    this.CompletedCount = "INT";
    this.ApprovedCount = "INT";

    // Comma separated ids
    this.InprogressServerIds = "TEXT";
    this.CompletedServerIds = "TEXT";
    this.ApprovedServerIds = "TEXT";

    // Period Details
    this.PeriodServerId = "INT";
    this.StartDate = "TEXT";
    this.EndDate = "TEXT";

    this.TimeStamp = "TEXT";
}
