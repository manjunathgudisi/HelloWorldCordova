
function DcPendingTaskEntity() {

    this.CompletedRecordsDcIdList = new Array();
    this.InCompletedRecordsDcIdList = new Array();

    this.Id = "INT PRIMARYKEY";  
    this.MobileVersionId = "INT";
    // OneView global Version id (for mdm)
    this.OVGuid = "INT";
  
    this.ServiceId = "INT";
    this.DcProfileId = "TEXT";

    this.DcUserId = "INT";
    this.DcUserName = "TEXT";

    this.DcPlaceId = "INT";
    this.DcPlaceName = "TEXT";
    this.DcPlaceDimension = "TEXT";
    this.CustomPlaceName = "TEXT";

    this.TemplateNodeId = "INT";
    this.TemplateNodeName = "TEXT";

    this.ServerId = "INT";
    this.Message = "TEXT";
    this.MessageReadStatus = "INT";

    this.ShiftId = "INT"
    this.ShiftName = "TEXT"
 
    this.ReccurenceId = "INT";
    this.ReccurenceName = "TEXT";
    this.Occurence = "INT";

    this.StartDate = "TEXT";
    this.EndDate = "TEXT";

    this.FromTime = "TEXT";
    this.ToTime = "TEXT";
    
    // Completed records in server but not in local
    this.CompletedRecordsServer = "INT";

    // InCompleted records in server but not in local
    this.InCompletedRecordsServer = "INT";

    // Completed records in local (It may or may not be in server)
    this.CompletedRecordsLocal = "INT";

    // InCompleted records in local (It may or may not be in server)
    this.InCompletedRecordsLocal = "INT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";
 
    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
  
    return this;
}