
// Data Capture History
function DcResultDetailsHistory() {

    this.Id = "INT PRIMARYKEY";
    this.ServerId = "INT";

    this.AuditLogClientGuid = "TEXT";
    this.DcResultDetailsClientGuid = "TEXT";

    // Answer
    this.OldValue = "TEXT";

    // Answer
    this.NewValue = "TEXT";

    this.SystemUserId = "INT";
    this.AnonymousUserId = "TEXT";

    this.Type = "INT";

    this.IsManual = "TEXT";
    this.IsSynchronized = "TEXT";

    this.Latitude = "TEXT";
    this.Longitude = "TEXT";

    this.CreatedDate = "TEXT";
    this.ProcessCount = "INT";

    this.TimeStamp = "TEXT";

    return this;
}