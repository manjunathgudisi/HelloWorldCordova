
function DataCaptureEntity() {
    
    // Foreign key references (Add starting of the entity only)    
    this.DcResultsEntitylist = new Array();

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.ClientGuid = "TEXT";
    this.ClientDocId = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.ServiceId = "INT";
    this.ServiceName = "TEXT";

    this.TemplateNodeId = "INT";
    this.TemplateNodeName = "TEXT"; 
    
    this.DcProfileId = "TEXT";

    /// <summary>
    /// wich table DCPlace reffer,
    /// Default cases : OrgAssetNode,OrgHierNode,TemplateNode
    /// </summary>
    this.DcPlaceDimension = "TEXT"; 
    /// <summary>
    /// where Audit done,
    /// FK of DcPlaceDimension
    /// </summary>
    this.DcPlaceId = "TEXT";
    /// <summary>
    /// 
    /// </summary>
    this.DcPlaceName = "TEXT";

    this.IsCompleted = "TEXT";
    this.IsSynchronized = "TEXT";     
    
    this.IsSubmit = "TEXT";
    this.SubmitDate = "TEXT";
    this.ApprovalStatus = "TEXT";
    this.ApprovalStatusDate = "TEXT";

    this.IsDynamicDCPlace = "TEXT"; 
    this.IsDynamicAttribute = "TEXT";
    this.IsDynamicAnswer = "TEXT";


	//IsANYNC=true => Dc contains some non-conformance info.
    this.IsAnyNC = "TEXT";

    this.IsAnyObservation = "TEXT";
    
    //IsAnyAction=true => Dc contains some action(Action which are not related NC) info.
    this.IsAnyAction = "TEXT";

    this.IsAnyDCBlocker = "TEXT";
    
    //IsForAction=true => Dc created for(EX : BOut NC Form) action.
    this.IsForAction = "TEXT";
    
    //IsForHistory=true => Dc downloaded for history (Most common value finding).
    this.IsForHistory = "TEXT";

    //IsForDCBlocker=true => DC Blocker
    this.IsForDCBlocker = "TEXT";

    // Datacapture is blocker
    this.IsBlocker = "TEXT";

    this.Score = "INT";
    this.MaxScore = "INT";
    this.Percentage = "INT";
    this.CompletedChildCount = "INT";
    this.TotalChildCount = "INT";
    this.CompletedAttributeCount = "INT";
    this.TotalAttributeCount = "INT";

    this.ESTTime = "INT";
    this.ActualTime = "INT";

    this.Latitude = "TEXT";
    this.Longitude = "TEXT";

    this.IsOnDeviceApprovalFinished = "TEXT";
    
    this.IsMultiMediaAttached = "TEXT";
    this.ProcessCount = "INT";

    this.ServerValidationStatus = "INT";
    this.ServerValidationCode = "TEXT";
    this.ServerValidationMessage = "TEXT";
    this.ServerValidationDate = "TEXT";

    this.DcTime = "TEXT";
    this.DcTimeLogs = "TEXT"; // JSON

    //this.IsDisable = "TEXT";
    //this.DisableDate = "TEXT";

    this.DcStartDate = "TEXT";
    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT"; 

    return this;
}

function DcResultsEntity() {

    // Foreign key reference (Add starting of the entity only)
    this.DcResultDetailsEntityList = new Array();

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.ClientGuid = "TEXT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    
    this.DataCaptureId = "INT";
    this.ServiceId = "INT";

    this.SystemUserId = "INT";
   
    /// <summary>
    /// DC Users created on mobile (//for random auditd)
    /// </summary>
    this.AnonymousUserId = "TEXT";
   
    this.UserName = "TEXT";

    this.ShiftId = "INT";
    this.ShiftName = "TEXT";

    this.IsSynchronized = "TEXT";  
    
    this.StartDate = "TEXT";
    this.LastSyncDate = "TEXT";
    this.TotalTimeForDc = "TEXT";

    this.IsSubmit = "TEXT";
    this.SubmitDate = "TEXT";
    this.SubmitedUserId = "INT";
    this.SubmitedAnonymousUserId = "INT";
    
    this.ApprovalStatus = "TEXT";
    this.ApprovalStatusDate = "TEXT";
    
    this.IsDynamicAttribute = "TEXT";
    this.IsDynamicAnswer = "TEXT";

    this.Score = "INT";
    this.MaxScore = "INT";
    this.Percentage = "INT";
    this.CompletedChildCount = "INT";
    this.TotalChildCount = "INT";
    this.CompletedAttributeCount = "INT";
    this.TotalAttributeCount = "INT";
  
    this.ActualTime = "INT";

    this.Latitude = "TEXT";
    this.Longitude = "TEXT";

    this.IsMultiMediaAttached = "TEXT";
    this.ProcessCount = "INT";

    this.DcTime = "TEXT";

    this.CreatedDate = "TEXT";

    //Dc end date
    this.TimeStamp = "TEXT";

    /// <summary>
    /// Comments
    /// </summary>
    this.Comments = "TEXT";
    
    this.LastUpdatedDate="TEXT";

    return this;
}

function DcResultDetailsEntity() {

    /// <summary>
    /// Id (primary key)
    /// </summary>
    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    /// <summary>
    /// Service id
    /// </summary>
    this.ServiceId = "INT";
    this.ClientGuid = "TEXT";

    /// <summary>
    /// version id
    /// </summary>
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    
    this.DataCaptureId = "INT";
    this.DataResultsId = "INT";

    this.StartDate = "TEXT";
    this.LastSyncDate = "TEXT";

    this.IsManual = "TEXT";
    this.IsSynchronized = "TEXT"; 
   
    // ServerTemlateNodeId or MobileClinetGUID (in case of Dynamic attribute)
    this.AttributeNodeId = "TEXT";
    
    //from which control data saved,Its Part of template Managent
    this.ControlId = "TEXT";
    
    // Attribute Name (For drop dowen load,grid load : avoid joins)
    this.AttributeNodeName = "TEXT";
   
    /// <summary>
    ///String,in case of TextBox answermode,
    ///FK,in case of dynamic drop dowen.(going to keep,OrgAssetNode-ServerNodeId in case of RCO or OrgAssetNode-MobileClinetGUID in case of dynamic RCO )
    /// 
    /// </summary>
    this.Answer = "TEXT";

    /// <summary>
    ///  If answer is foreign key,value will come here (For drop dowen load,grid load : avoid joins)
    /// </summary>
    this.AnswerValue = "TEXT";
        
    /// <summary>
    /// If answer is foreign key,table name will come here
    /// OrgHiNode,OrgAssetNode,....
    /// 
    /// </summary>
    this.AnswerFKType = "TEXT";

    /// <summary>
    /// DateTime,Int64,String,Boolean
    /// </summary>
    this.AnswerDataType = "TEXT";
    
    /// <summary>
    /// Ex:RAG,YN,DropDowen,Picture,Vedio,Audio
    /// </summary>
    this.AnswerMode = "TEXT";

    /// <summary>
    /// Ex:If it is dynamic attribute, IsDynamicAttribute = true
    /// </summary>
    this.IsDynamicAttribute = "TEXT";

    /// <summary>
    /// Ex:If it is dynamic answer, IsDynamicAnswer = true
    /// </summary>
    this.IsDynamicAnswer = "TEXT";

    /// <summary>
    /// Comments
    /// </summary>
    this.Comments = "TEXT";

    /// <summary>
    /// created date
    /// </summary>
    this.CreatedDate = "TEXT";
    
    /// <summary>
    /// Last updated date on AnswerValue
    /// </summary>
    this.LastUpdatedDate = "TEXT";

    /// <summary>
    /// Last updated date
    /// </summary>
    this.TimeStamp = "TEXT";

    this.IsMultiMediaAttached = "TEXT";
    this.ProcessCount = "INT";

    this.IndexId = "INT";
    this.IsMulti = "TEXT";

    this.Latitude = "TEXT";
    this.Longitude = "TEXT";

    this.Score = "INT";
    this.MaxScore = "INT";
    this.Percentage = "INT";
    this.CompletedChildCount = "INT";
    this.TotalChildCount = "INT";
    this.CompletedAttributeCount = "INT";
    this.TotalAttributeCount = "INT";

    this.ESTTime = "INT";
    this.ActualTime = "INT";
    this.IsManualESTEnabled = "TEXT";

    this.IsNA = "TEXT";
    this.IsBlocker = "TEXT";

    //Saves the Bluetooth Probe/ IR device /Bar code reader etc device ids
    this.AutomaticDeviceId = "TEXT";

    this.IsDisable = "TEXT";
    
    return this;
}
