function DCNCMapping() {

    this.oActionEntity = null;

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.ClientGuid = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.ServiceId = "INT";

    this.NCRuleId = "INT";
    this.IsNC = "TEXT";
    this.IsObservation = "TEXT";
    this.IsActionNotMandatory = "TEXT";
    
    this.RuleName = "TEXT";
    this.RuleDescription = "TEXT";
    this.RuleGroup = "TEXT";
    this.RuleCode = "TEXT";
    this.Deviatedby = "TEXT";
    this.ExpectedValue = "TEXT";
    this.ActualValue = "TEXT";

    // Manual or automatic
    this.IsManualRule = "TEXT";

    // Who raised 
    this.RaisedBySystemUserId = "INT";   
    this.RaisedByAnonymousUserId = "TEXT";  

    // Client guid
    this.DataCaptureClientGuid = "TEXT";
    // Client guid
    this.DcResultsClientGuid = "TEXT";
    // Client guid
    this.DcResultDetailsClientGuid = "TEXT";
    // Server id
    this.AttributeGroupId = "INT";
    // Client guid
    this.ActionClientGuid = "TEXT";
    
    this.Comments = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    this.IsMultiMediaAttached = "TEXT";
    this.ProcessCount = "INT";

    //List of comma separated attribute/attribute group ids for which nc is configured
    this.TemplateNodeIds = "TEXT";

    this.CreatedDate = "TEXT";
    this.TimeStamp = "TEXT";
    this.LastsyncDate = "TEXT";
    this.IsSynchronized = "TEXT";
}

// ActionEntity 
function ActionEntity() {

    this.ActionDetailsEntityList = new Array();
   
    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.ClientGuid = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.ServiceId = "INT";
   
    this.ActionContext = "TEXT";  
    
    // Who raised the action
    this.ActionRaisedBySystemUserId = "INT";   
    this.ActionRaisedByAnonymousUserId = "TEXT";  
    this.ActionRaisedByUserName = "TEXT";

    this.Comments = "TEXT";

    // Approval status 
    this.IsApproved = "TEXT";
    this.ApprovedDate = "TEXT";
    this.IsRejected = "TEXT";
    this.RejectedDate = "TEXT";

    // Submitted status
    this.IsSubmited = "TEXT";
    this.SubmitedDate = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    this.IsMultiMediaAttached = "TEXT";
    this.ProcessCount = "INT";

    this.CreatedDate = "TEXT";
    this.TimeStamp = "TEXT";
    this.LastsyncDate = "TEXT";
    this.IsSynchronized = "TEXT";
}

function ActionDetailsEntity() {

    //it its form action,DataCapture info keep here
    this.oDataCapture = null;

    // At a time one action details entity contains one action only
    this.SetAction = function (Action, Type) {
        if (Type == "PreDefinedActionId") {
            this.PreDefinedActionId = Action;
        }
        else if (Type == "CustomAction") {
            this.CustomAction = Action;
        }
        else {
            this.DataCaptureId = Action;
        }
    }

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.ClientGuid = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.ServiceId = "INT";

    // Client guid
    this.ActionClientGuid = "TEXT";

    // Action info
    this.PreDefinedActionId = "INT";
    this.CustomAction = "TEXT";

    this.ActionResponsibleFor = "TEXT";

    // Client guid
    this.DataCaptureClientGuid = "TEXT";

    ///<summary>
    /// true=>no need of followUp
    /// </summary>
    this.IsPersonalObservation = "TEXT";
    this.ActionExecutionOrder = "INT";

    this.Comments = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    this.IsMultiMediaAttached = "TEXT";
    this.ProcessCount = "INT";

    //As per Qaas client requirement Added
    //Date:06/03/2017 2:00PM
    this.ActionFollowUpStatus = "TEXT";
    this.ActionResolveStartDate = "TEXT";
    this.ActionResolveDate = "TEXT";
    this.ActionFollowUpComments = "TEXT";
    this.ActionFollowUpBySystemUserId = "INT";

    // Who raised the action
    this.ActionRaisedBySystemUserId = "INT";
    this.ActionRaisedByAnonymousUserId = "TEXT";
    this.ActionRaisedByUserName = "TEXT";

    this.Latitude = "TEXT";
    this.Longitude = "TEXT";

    this.CreatedDate = "TEXT";
    this.TimeStamp = "TEXT";
    this.LastsyncDate = "TEXT";
    this.IsSynchronized = "TEXT";
}

function DCActionMapping() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.ClientGuid = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.ServiceId = "INT";

    // Client guid
    this.DataCaptureClientGuid = "TEXT";
    // Client guid
    this.DcResultsClientGuid = "TEXT";
    // Client guid
    this.DcResultDetailsClientGuid = "TEXT";
    // Server id
    this.AttributeGroupId = "INT";
    // Client guid
    this.ActionClientGuid = "TEXT";
    
    this.Comments = "TEXT";

    this.ProcessCount = "INT";

    this.CreatedDate = "TEXT";
    this.TimeStamp = "TEXT";
    this.LastsyncDate = "TEXT";
    this.IsSynchronized = "TEXT";
}


function MultiMediaSubElements() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.ClientGuid = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.ServiceId = "INT";

    //ex: Action client guid, ....
    this.MappedEntityClientGuid = "TEXT";
    this.Dimension = "TEXT";
    this.MultiMediaType = "TEXT";
    this.LocalURL = "TEXT";
    this.RemoteURL = "TEXT";
    
    this.Comments = "TEXT";

    this.ProcessCount = "INT";

    this.Latitude = "TEXT";
    this.Longitude = "TEXT";

    this.CreatedDate = "TEXT";
    this.TimeStamp = "TEXT";
    this.LastsyncDate = "TEXT";
    this.IsSynchronized = "TEXT";
    
    this.IsMultiMediaSynchronized = "TEXT";
    this.MultiMediaSyncDate = "TEXT";
    this.IsDisabled = "TEXT";
}

function MultiMediaBlobSubElements() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.ClientGuid = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.ServiceId = "INT";
    
    this.Type = "TEXT";

    //ex: Action client guid,DCREsultDetailsEntity Id ....
    //if MappedEntityClientGuid==null =>reference put in 'Dimension' table ,ClientGuid of MultiMediaBlobSubElements used in particular table (bulk approval of datacapture for system user (signature) here we used this case
    //eg:DcApprovalEntity.SignatureMultiMediaBlobSubElements
    this.MappedEntityClientGuid = "TEXT";
    //table name of wich table it reffering ex: DATEntityType.DCREsultDetailsEntity  ....
    this.Dimension = "TEXT";
    this.MultiMediaType = "TEXT";
    this.FileName = "TEXT";
    this.DataURL = "TEXT";
    this.BlobFile = "BLOB";
    
    this.Comments = "TEXT";

    this.ProcessCount = "INT";

    this.CreatedDate = "TEXT";
    this.TimeStamp = "TEXT";
    this.LastsyncDate = "TEXT";
    this.IsSynchronized = "TEXT";
}

function DCBlockerInfoEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.ClientGuid = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.ServiceId = "INT";

    // Client guid
    this.DataCaptureClientGuid = "TEXT";
    // Client guid
    this.DcResultsClientGuid = "TEXT";
    // Client guid
    this.DcResultDetailsClientGuid = "TEXT";
    // Server id
    //this.TemplateNodeId = "INT";
    // Blocker DataCapture Client guid
    this.DCBlockerDataCaptureClientGuid = "TEXT";

    this.Comments = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    this.ProcessCount = "INT";
    this.CreatedUserId = "INT";

    this.CreatedDate = "TEXT";
    this.TimeStamp = "TEXT";
    this.LastsyncDate = "TEXT";
    this.IsSynchronized = "TEXT";
}