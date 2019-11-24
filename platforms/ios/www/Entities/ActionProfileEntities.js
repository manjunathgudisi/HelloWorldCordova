
function ActionNCProfileEntity() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "TEXT";

    this.ServiceId = "INT";

    this.MobileVersionId = "INT";
    this.OVGuid = "INT";
    this.Type = "INT";

    ///who did dc
    this.DcUserId = "INT";

    this.TemplateNodeId = "INT";

    this.DcPlaceId = "INT";
    this.DcPlaceDimension = "TEXT";

    this.AdvanceDcPlace = "TEXT";

    /// <summary>
    /// key - Attribute id
    ///format  reffer ActionNCProfile.cs public IDictionary<Int64,IList<ActionNCConfigSetting>> AttributeWiseActionNCConfig{ get; set; }
    /// </summary>
    this.AttributeWiseActionNCConfigJson = "TEXT";
  

    /// <summary>       
    /// Raise the action when ever the rule satisfied
    /// key - Combination of attribute id's  (Ex-  23:102:34)
    /// key => which and all attributes used to make this rule
    ///format   reffer ActionNCProfile.cs public IDictionary<String,IList<ActionNCConfigSetting>> MultipleAttributeActionNCConfig { get; set; }
    /// </summary>
    this.MultipleAttributeActionNCConfigJson = "TEXT";


    /// <summary>
    /// Evaluate while saving dc
    /// public reffer ActionNCProfile.cs IList<ActionNCConfigSetting> TemplateWiseActionNCConfig { get; set; }
    /// </summary>
    this.TemplateWiseActionNCConfigJson = "TEXT";

    this.TimeStamp = "TEXT";
}




