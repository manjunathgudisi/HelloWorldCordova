
function GlobalizationMetdataEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";
  
    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";
    
    this.ServiceId = "INT";
    this.OrganizationId = "INT";
    this.TemplateNodeId = "INT";
    this.PageId = "INT";
  
    /// <summary>
    //Key1: Language
    //Key2: globalization message key
    //Value: globalization message string
    ///LocalisedConfig having key value pairs of globalization key and message
    /// </summary>
    this.LocalisedConfig = "TEXT";

    // Created user
    this.CreatedUserId = "INT";
  
    this.CreatedDate = "TEXT";
    this.LastsyncDate = "TEXT";
    this.TimeStamp = "TEXT";
}




