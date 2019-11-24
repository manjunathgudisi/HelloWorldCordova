
var LVDCBlockerConfigProfile = {
    1008: {
        "TemplateNodeId": 1008,
        "IsAttributeGroup": true,
        "IsAllAttribute": false,
        "TemplateId": 8450,
        "IsCommantIsMandatory": false,
        "MinimumChar": 0,
        "MaxChar": 0
    },
    1009: {
        "TemplateNodeId": 1009,
        "IsAttributeGroup": true,
        "IsAllAttribute": false,
        "TemplateId": 8450,
        "IsCommantIsMandatory": false,
        "MinimumChar": 0,
        "MaxChar": 0
    }
}

var FoodAndMicroBiologyListViewTemplates = ['1033', '904', '779', '889', '6252', '983', '153', '868', '819', '575'];

var LVDCBlockerTemplateMetadata = {

    8450: {
        ServiceId: 1,
        TemplateNodeId: 8450,
        TemplateName: "Cleaning NP Template",
        TemplateShortName: "",
        IsHeaderEnable: false,
        IsFooterEnable: false,
        IsScoringLogicEnabled: false,
        ScoringLogicType: 0,
        TemplateConfigMetaDataDetails: {
            Id: 8450, "IsAttributeGroup": true, "AttributeGroupType": 0, Name: "Cleaning NP Template", ShortName: "", ControlId: "ControlId_8450",
            Childs: [
                {
                    Id: 8451, "IsAttributeGroup": false, Name: "Service", Childs: [],
                    AnswerModes: [                       
                        { ControlId: "BandControlId_8451", Type: "DCListViewControlConfig", DataType: "INTEGER", ListViewDataSourceConfig: { Type: "BandListViewDataSourceConfig", BandId: 1000, IsOnline: false }, ListViewDisplay: 0, SelectionType: 0, DisplayMode: 0 }
                    ]
                },
                {
                    Id: 8452, "IsAttributeGroup": false, Name: "Date", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8452", Type: "DCTextBoxControlConfig", TextBoxType: 0, DataType: "DATETIMELOCAL" },
                    ]
                },
                {
                    Id: 8453, "IsAttributeGroup": false, Name: "Equipment / Chiller / Freezer / Canopies NOT Given for Cleaning", Childs: [],
                    AnswerModes: [                       
                        { ControlId: "TxtControlId_8453", Type: "DCTextBoxControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                },
                {
                    Id: 8454, "IsAttributeGroup": false, Name: "Reported By", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8454", Type: "DCTextBoxControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                },
                {
                    Id: 8455, "IsAttributeGroup": false, Name: "ERP / ST No.", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8455", Type: "DCTextBoxControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                },
                {
                    Id: 8456, "IsAttributeGroup": false, Name: "Schedule Day Date / Time of Cleaning", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8456", Type: "DCTextBoxControlConfig", TextBoxType: 0, DataType: "DATETIMELOCAL" }
                    ]
                },
                {
                    Id: 8457, "IsAttributeGroup": false, Name: "Team Leader / Team Member Signature", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8457", Type: "DCSignaturePadControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                },
                {
                    Id: 8458, "IsAttributeGroup": false, Name: "Department", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8458", Type: "DCTextBoxControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                },
                {
                    Id: 8459, "IsAttributeGroup": false, Name: "Section", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8459", Type: "DCTextBoxControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                },
                {
                    Id: 8460, "IsAttributeGroup": false, Name: "Objected By (Name & Designation)", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8460", Type: "DCTextBoxControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                },
                {
                    Id: 8461, "IsAttributeGroup": false, Name: "Reason for Objection", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8461", Type: "DCTextBoxControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                },
                {
                    Id: 8464, "IsAttributeGroup": false, Name: "Remarks", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8464", Type: "DCTextBoxControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                },
                {
                    Id: 8462, "IsAttributeGroup": false, Name: "Objecting Persons Signature", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8462", Type: "DCSignaturePadControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                },
                {
                    Id: 8463, "IsAttributeGroup": false, Name: "CLNG Sup / TL / TM Signature", Childs: [],
                    AnswerModes: [
                        { ControlId: "TxtControlId_8463", Type: "DCSignaturePadControlConfig", TextBoxType: 0, DataType: "STRING" }
                    ]
                }                
            ]
        }
     }  
}

// DCBlockerConfigProfileComponent
function DCBlockerConfigProfileComponent() {

    var MyInstance = this;
    
    /// <summary>
    /// DCBlocker Enable or not
    /// </summary>
    /// <param name="AttributeId">Attribute Node Id</param>   
    /// <returns>true or false</returns>  
    this.IsEnable = function (AttributeId) {

        try {
            OneViewConsole.Debug("IsEnable start", "LVDefaultNAComponent.IsEnable");

            var DCBlockerEnable = false;

            if (OneViewSessionStorage.Get("ServiceName") == "Food Safety Service") {

                //if (LVDCBlockerConfigProfile != null && LVDCBlockerConfigProfile[AttributeId] != undefined) {
                //    DCBlockerEnable = true;
                //}

                if (FoodAndMicroBiologyListViewTemplates.indexOf(OneViewSessionStorage.Get("TemplateId")) == -1) {
                    DCBlockerEnable = true;
                }
            }

            OneViewConsole.Debug("IsEnable start", "LVDefaultNAComponent.IsEnable");
            
            return DCBlockerEnable;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.IsEnable", Excep);
        }
    }

    /// <summary>
    /// Get DCBlocker Config
    /// </summary>
    /// <param name="AttributeId">Attribute Node Id</param>   
    /// <returns>DCBlockerConfig</returns>  
    this.GetDCBlockerConfig = function (AttributeId) {

        try {
            OneViewConsole.Debug("IsEnable start", "LVDefaultNAComponent.IsEnable");

            var DCBlockerConfig = null;

            if (OneViewSessionStorage.Get("ServiceName") == "Food Safety Service") {

                //if (LVDCBlockerConfigProfile != null && LVDCBlockerConfigProfile[AttributeId] != undefined) {
                //    DCBlockerConfig = LVDCBlockerConfigProfile[AttributeId];
                //}

                if (FoodAndMicroBiologyListViewTemplates.indexOf(OneViewSessionStorage.Get("TemplateId")) == -1) {
                    DCBlockerConfig = {
                        "TemplateNodeId": AttributeId,
                        "IsAttributeGroup": false,
                        "IsAllAttribute": false,
                        "TemplateId": 8450,
                        "IsCommantIsMandatory": false,
                        "MinimumChar": 0,
                        "MaxChar": 0
                    };
                }
            }

            OneViewConsole.Debug("IsEnable start", "LVDefaultNAComponent.IsEnable");

            return DCBlockerConfig;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.IsEnable", Excep);
        }
    }
}