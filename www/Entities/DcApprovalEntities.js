
function DcApprovalEntity() {

    this.DcApprovalDetailsEntityList = new Array();
    this.DcApprovalHistoryEntityList = new Array();
    this.DCApprovalOtherInfoEntity = null;

    this.Id = "INT PRIMARYKEY";
    this.ClientGuid = "TEXT";
    this.ServerId = "INT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.Type = "TEXT";
    this.Code = "TEXT";

    this.ServiceId = "INT";
    this.DataCaptureClientGuid = "TEXT";//Client guid,  
    this.DcResultsClientGuid = "TEXT"; // Client guid

    this.DcApprovalProfileId = "TEXT";//ServerId of DcApprovalProfileEntity

    this.ApprovalUserId = "INT";
    this.ApprovalUserName = "TEXT";
    this.DCApprovalOtherInfoId = "INT";

    this.IsAllAttributes = "TEXT";
    this.IsReviewed = "TEXT";
    this.Rating = "TEXT";

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

function DcApprovalDetailsEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ClientGuid = "TEXT";
    this.ServerId = "INT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.Type = "TEXT";
    this.Code = "TEXT";

    this.ServiceId = "INT";
    this.DcApprovalId = "INT";// Foreign key of DcApprovalEntity

    this.DcResultDetailsClientGuid = "TEXT";//use Client guid

    this.IsManual = "TEXT";
    this.AttributeNodeId = "TEXT";

    // Attribute Name (For drop dowen load,grid load : avoid joins)
    this.AttributeNodeName = "TEXT";
    this.ControlId = "TEXT";

    /// <summary>
    ///String,in case of TextBox answermode,
    ///FK,in case of dynamic drop dowen.(going to keep,OrgAssetNode-ServerNodeId in case of RCO or OrgAssetNode-MobileClinetGUID in case of dynamic RCO )
    /// 
    /// </summary>
    this.ReviewedAnswer = "TEXT";

    /// <summary>
    ///  If answer is foreign key,value will come here (For drop dowen load,grid load : avoid joins)
    /// </summary>
    this.ReviewedAnswerValue = "TEXT";

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
    /// Ex:If it is dynamic answer, IsDynamicAnswer = true
    /// </summary>
    this.IsDynamicAnswer = "TEXT";


    this.IndexId = "INT";
    this.IsMulti = "TEXT";

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


    this.ApprovalStatus = "TEXT";
    this.ApprovalStatusDate = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    this.Comments = "TEXT";

    this.Latitude = "TEXT";
    this.Longitude = "TEXT";

    this.IsSynchronized = "TEXT";

    this.IsMultiMediaAttached = "TEXT";

    this.ProcessCount = "INT";

    this.CreatedDate = "TEXT";
    /// <summary>
    /// Last updated date on AnswerValue
    /// </summary>
    this.LastUpdatedDate = "TEXT";

    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function DcApprovalHistoryEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ClientGuid = "TEXT";
    this.ServerId = "INT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.Type = "TEXT";
    this.Code = "TEXT";

    this.ServiceId = "INT";
    this.DcApprovalId = "INT";// Foreign key of DcApprovalEntity
    /// <summary>
    /// Perivous Approval Status of ApprovalUser
    /// </summary>
    this.PerivousApprovalStatus = "TEXT";
    /// <summary>
    /// Current Approval Status of ApprovalUser
    /// </summary>
    this.CurrentApprovalStatus = "TEXT";
    /// <summary>
    /// Who Changed Approval Status
    /// </summary>
    this.ChangedByUserId = "INT";
    this.ChangedByUserName = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    this.Latitude = "TEXT";
    this.Longitude = "TEXT";

    this.IsSynchronized = "TEXT";

    this.ProcessCount = "INT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}

function DCApprovalOtherInfoEntity() {

    this.MultiMediaBlobSubElements = null;

    this.Id = "INT PRIMARYKEY";
    this.ClientGuid = "TEXT";
    this.ServerId = "INT";
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";

    this.Type = "TEXT";
    this.Code = "TEXT";
    /// <summary>
    /// Approver Name (Anonymous or System User)
    /// </summary>
    this.AnonymousApproverName = "TEXT";
    /// <summary>
    /// Approver Signature (Anonymous or System User)
    /// </summary>
    this.IsBlobEnabled = "TEXT";
    /// <summary>
    /// Anonymous Approver AlternateName For Signature (If signature pad not working in particular device then they will enter the name insted of signature)
    /// </summary>
    this.AnonymousApproverAlternateNameForSignature = "TEXT";
    /// <summary>
    /// Approver Position (Anonymous or System User)
    /// </summary>
    this.AnonymousApproverPosition = "TEXT";
    /// <summary>
    /// Approver LeadName (Anonymous or System User)
    /// </summary>
    this.AnonymousApproverLeadName = "TEXT";

    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";

    this.BooleanColumn1 = "TEXT";
    this.BooleanColumn2 = "TEXT";

    this.IntColumn1 = "TEXT";
    this.IntColumn2 = "TEXT";

    this.DateTimeColumn1 = "TEXT";
    this.DateTimeColumn2 = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    this.Latitude = "TEXT";
    this.Longitude = "TEXT";

    this.IsSynchronized = "TEXT";

    this.ProcessCount = "INT";

    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}




