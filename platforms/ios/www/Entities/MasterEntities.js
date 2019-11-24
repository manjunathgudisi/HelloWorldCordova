
// ServiceMasterEntity
function ServiceMasterEntity() {
    
    // Primary key
    this.Id = "INT PRIMARYKEY";  
    
    // Server id (server side primary key) 
    this.ServerId = "INT";
    
    // Hand shaking id
    this.OSGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";
    
    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";    
    
    // Name of the service
    this.Name = "TEXT";   
    
    // Service type
    this.Type = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";    
}

// OrganizationMasterEntity
function OrganizationMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // Organization type
    this.Type = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";
    this.Latitude = "TEXT";
    this.Longitude = "TEXT";
}

// OrganizationGroupMasterEntity
function OrganizationGroupMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Foreign key for OrganizationGroupType
    this.OrganizationGroupTypeId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT"; 

    // Name of the service
    this.Name = "TEXT";

    // OrganizationGroup type
    this.Type = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";    
}

// OrganizationGroupType
function OrganizationGroupType() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";
   
    // Name of the service
    this.Name = "TEXT";
    
    // OrganizationGroupType type
    this.Type = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";    
}

// RoleMasterEntity
function RoleMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";
 
    // Name of the service
    this.Name = "TEXT";
  
    // Role type
    this.Type = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";  
}

// UserMasterEntity
function UserMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // FirstName of the user
    this.Name = "TEXT";

    // MiddleName of the user
    this.MiddleName = "TEXT";

    // LastName of the user
    this.LastName = "TEXT";

    // Email of the user
    this.Email = "TEXT";

    // LandlineNo of the user
    this.LandlineNo = "TEXT";

    // MobileNo of the user
    this.MobileNo = "TEXT";

    // User type
    this.Type = "TEXT";

    // User of the user (unique name)
    this.UserName = "TEXT";
    
    // Password of the user
    this.Password = "TEXT";

    // Code
    this.Pin = "TEXT";

    // Organization Id for User
    this.OrganizationMasterId = "INT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";


    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";
    this.Latitude = "TEXT";
    this.Longitude = "TEXT";
}

// RcoMasterEntity
function RcoMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Foreign key for RcoType
    this.RcoTypeId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // Code
    this.Code = "TEXT";

    // Code
    this.Pin = "TEXT";

    // Rco type
    this.Type = "TEXT";
    
    // Process count (How many times tried for upload)
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";
    
    // Created date
    this.CreatedDate = "TEXT";
    
    // Created user
    this.CreatedUserId = "INT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    this.Description = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";
    this.Column6 = "TEXT";
    this.Column7 = "TEXT";
    this.Column8 = "TEXT";
    this.Column9 = "TEXT";
    this.Column10 = "TEXT";

    this.IntColumn1 = "TEXT";
    this.IntColumn2 = "TEXT";
    this.IntColumn3 = "TEXT";
    this.IntColumn4 = "TEXT";
    this.IntColumn5 = "TEXT";

    this.DateTimeColumn1 = "TEXT";
    this.DateTimeColumn2 = "TEXT";
    this.DateTimeColumn3 = "TEXT";
    this.DateTimeColumn4 = "TEXT";
    this.DateTimeColumn5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";
    this.Latitude = "TEXT";
    this.Longitude = "TEXT";
}

// RcoType
function RcoType() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // RcoType type
    this.Type = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";
}

// AttributeGroupType
function AttributeGroupType() {

    // Primary key
    this.Id = "INT PRIMARYKEY";
    
    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // AttributeGroupType type
    this.Type = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";   
}

// AttributeGroupMasterEntity
function AttributeGroupMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Foreign key for AttributeGroupType
    this.AttributeGroupTypeId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // AttributeGroup type
    this.Type = "TEXT";

    // Code
    this.Pin = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";
}

// AttributeMasterEntity
function AttributeMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // Attribute type
    this.Type = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";  
}

// Label
function Label() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";
    
    // Foreign key for
    this.LabelTypeId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // Label type
    this.Type = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";
}

// LabelType
function LabelType() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // LabelType type
    this.Type = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";   
}

// MasterdataRegistry
function MasterdataRegistry(){

    // Primary key
    this.Id = "INT PRIMARYKEY";
    
     // Service id
    this.OSGuid = "TEXT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the Entity or DAT Entity Type
    this.EntityName = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";
}

// AnonymousUserMasterEntity
function AnonymousUserMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    this.ClientGuid = "TEXT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // FirstName of the user
    this.Name = "TEXT";

    //// MiddleName of the user
    //this.MiddleName = "TEXT";

    //// LastName of the user
    //this.LastName = "TEXT";

    //// Email of the user
    //this.Email = "TEXT";

    //// LandlineNo of the user
    //this.LandlineNo = "TEXT";

    //// MobileNo of the user
    //this.MobileNo = "TEXT";

    // User type
    this.Type = "TEXT";
   
    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";
}

// IncidentMasterEntity
function IncidentMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Foreign key for IncidentType
    this.IncidentTypeId = "INT";

    // Foreign key for IncidentType
    this.DiplayIndex = "INT";

    // Foreign key for IncidentType
    this.ColourCode = "TEXT";

    // Foreign key for IncidentType
    this.IncidentTypeId = "INT";
 
    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // Rco type
    this.Type = "TEXT";

    // Rco type
    this.Code = "TEXT";

    // Process count (How many times tried for upload)
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // Created date
    this.CreatedDate = "TEXT";

    // Created user
    this.CreatedUserId = "INT";

    // OrganizationId 
    this.OrganizationId = "INT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    this.Description = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";
}

// IncidentType
function IncidentType() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Foreign key for IncidentType
    this.DiplayIndex = "INT";

    // Foreign key for IncidentType
    this.ColourCode = "TEXT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // Rco type
    this.Type = "TEXT";

    // Rco type
    this.Code = "TEXT";

    // Process count (How many times tried for upload)
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // Created date
    this.CreatedDate = "TEXT";

    // Created user
    this.CreatedUserId = "INT";

    // OrganizationId 
    this.OrganizationId = "INT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    this.Description = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";   
}

// RiskMasterEntity
function RiskMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Foreign key for IncidentType
    this.DiplayIndex = "INT";

    // Foreign key for IncidentType
    this.ColourCode = "TEXT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // Rco type
    this.Type = "TEXT";

    // Rco type
    this.Code = "TEXT";

    // Process count (How many times tried for upload)
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // Created date
    this.CreatedDate = "TEXT";

    // Created user
    this.CreatedUserId = "INT";

    // OrganizationId 
    this.OrganizationId = "INT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    this.Description = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";
}

// BandMasterEntity
function BandMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the Band
    this.Name = "TEXT";

    // Band code
    this.Code = "TEXT";

    // Band type
    this.Type = "TEXT";

    // Process count (How many times tried for upload)
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // Created date
    this.CreatedDate = "TEXT";

    // Created user
    this.CreatedUserId = "INT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";
}

// BandDetailsMasterEntity
function BandDetailsMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the BandDetail
    this.Name = "TEXT";

    // BandDetail code
    this.Code = "TEXT";

    // BandDetail type
    this.Type = "TEXT";

    // BandDetail value
    this.Value = "INT";

    // BandDetail Sequence
    this.Sequence = "INT";

    // BandDetail ColourCode
    this.ColourCode = "TEXT";

    // Band MasterId
    this.BandMasterId = "INT";

    // Process count (How many times tried for upload)
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // Created date
    this.CreatedDate = "TEXT";

    // Created user
    this.CreatedUserId = "INT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";	
	
    this.IsCorrectSelection = "TEXT";
}

// PredefinedActionMasterEntity
function PredefinedActionMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the Predefined Action
    this.Name = "TEXT";

    // ShortName of the Predefined Action
    this.ShortName = "TEXT";

    // Name of the Predefined Action
    this.Description = "TEXT";

    // Code
    this.Code = "TEXT";

    // Predefined Action type
    this.Type = "TEXT";

    // Process count (How many times tried for upload)
    this.ProcessCount = "INT";

    // Sync with server or not
    this.IsSynchronized = "TEXT";

    // Created date
    this.CreatedDate = "TEXT";

    // Created user
    this.CreatedUserId = "INT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";
}

// ShiftMasterEntity
function ShiftMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    //ServiceId
    this.ServiceId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // ColorCode
    this.ColorCode = "TEXT";

    // Icon
    this.Icon = "TEXT";

    // LabelType type
    this.Type = "TEXT";

    // shift start date
    this.StartDate = "TEXT";

    // shift end date
    this.EndDate = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";
}

// ShiftDetailsMasterEntity
function ShiftDetailsMasterEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the service
    this.Name = "TEXT";

    // ColorCode
    this.ColorCode = "TEXT";

    // Icon
    this.Icon = "TEXT";

    // LabelType type
    this.Type = "TEXT";

    // shift start time
    this.StartTime = "TEXT";

    // shift end time
    this.EndTime = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";

    // Foreign key for ShiftMasterEntity
    this.ShiftMasterId = "INT";

    // Sparse columns
    this.Column1 = "TEXT";
    this.Column2 = "TEXT";
    this.Column3 = "TEXT";
    this.Column4 = "TEXT";
    this.Column5 = "TEXT";

    // Other Details
    this.ImageIcon = "TEXT";
    this.FontIconId = "INT";
}

// BusinessCalendarEntity
function BusinessCalendarEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    //ServiceId
    this.ServiceId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the Business Calendar
    this.Name = "TEXT";

    // Description of the Business Calendar
    this.Description = "TEXT";

    // Business Calendar type (DAT entity type)
    this.Type = "TEXT";

    // Business Calendar start date
    this.StartDate = "TEXT";

    // Business Calendar end date
    this.EndDate = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";
}

// PeriodTypeEntity
function PeriodTypeEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    //ServiceId
    this.ServiceId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the Period Type
    this.Name = "TEXT";

    // Description of the Period Type
    this.Description = "TEXT";

    // PeriodType type (DAT entity type)
    this.Type = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";
}

// PeriodEntity
function PeriodEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    // BusinessCalendarServerId (server side foreign key) 
    this.BusinessCalendarServerId = "INT";

    // PeriodTypeServerId (server side foreign key) 
    this.PeriodTypeServerId = "INT";

    //ServiceId
    this.ServiceId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // Name of the Period
    this.Name = "TEXT";

    // Description of the Period
    this.Description = "TEXT";

    // Period type (DAT entity type)
    this.Type = "TEXT";

    // Period start date
    this.StartDate = "TEXT";

    // Period end date
    this.EndDate = "TEXT";

    this.IsDisable = "TEXT";
    this.DisableDate = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";
}

// TaskSyncLogEntity
function TaskSyncLogEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";

    //ServiceId
    this.ServiceId = "INT";

    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    // TransactionId for handshaking between mobile and server
    this.TransactionId = "TEXT";

    // NotificationId for user notification
    this.NotificationId = "TEXT";

    //Entity Primary key id which is been modified
    this.EntityId = "TEXT";

    //Entity Type id which has been modified
    this.EntityType = "INT";
    
    this.NewVersionNumber = "TEXT";

    this.OldVersionNumber = "TEXT";

    //Task Completed Device Status
    this.LocalSyncStatus = "TEXT";

    //Task Completed Server Status
    this.ServerSyncStatus = "TEXT";

    //Remarks against Device Status
    this.Remarks = "TEXT";

    //JSON details of entity and properties modified
    this.OfflineTaskDetails_JSON = "TEXT";

    this.ProcessCount = "INT";

    //DAT entity type
    this.Type = "TEXT";

    this.IsDisable = "TEXT";

    this.DisableDate = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";
}

// NotificationPool
function NotificationPoolEntity() {

    // Primary key
    this.Id = "INT PRIMARYKEY";

    // Client Guid( Unique Id for each Notification will used by TaskSyncLogEntity as foreign key)
    this.ClientGuid = "TEXT";

    // Server id (server side primary key) 
    this.ServerId = "INT";
    
    // Hand shaking id
    this.OMGuid = "TEXT";

    // OneView global Version id (for mdm)
    this.OVGuid = "INT";

    // Mobile version id (for audit trial)
    this.MobileVersionId = "INT";

    //ServiceId
    this.ServiceId = "INT";

    //UserId
    this.UserId = "INT";

    //Subject
    this.Subject = "TEXT";

    //Message
    this.Message = "TEXT";

    //IsNativeNotificationRequired
    this.IsNativeNotificationRequired = "TEXT";

    //IsNativeNotification_Delivered
    this.IsNativeNotification_Delivered = "TEXT";

    //IsNativeNotification_Read
    this.IsNativeNotification_Read = "TEXT";

    //IsNativeNotification_Hide
    this.IsNativeNotification_Hide = "TEXT";

    //IsAppNotification_Delivered
    this.IsAppNotification_Delivered = "TEXT";

    //IsAppNotification_Read
    this.IsAppNotification_Read = "TEXT";

    //IsAppNotification_Hide
    this.IsAppNotification_Hide = "TEXT";
    
    //OVNotification_LogId
    this.OVNotification_LogId = "TEXT";

    //OVMobileNotification_LogId
    this.OVMobileNotification_LogId = "TEXT";
   
    this.ProcessCount = "INT";

    //DAT entity type
    this.Type = "TEXT";

    this.IsDisable = "TEXT";

    this.DisableDate = "TEXT";

    // when this row created or modified on mobile
    this.TimeStamp = "TEXT";
}



