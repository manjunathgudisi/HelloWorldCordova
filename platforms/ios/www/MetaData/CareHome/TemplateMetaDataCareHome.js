
var DATBand_ServiceID_3 = {
    RiskType: 1, // Need to move risk table  
}
var Band_ServiceID_3 =
   {
       1: {//RiskType
           1: { 'Name': 'High', 'Value': 1, 'Sequence': 1, 'ColourIndex': 'red' },
           2: { 'Name': 'Medium', 'Value': 2, 'Sequence': 2, 'ColourIndex': 'orange' },
           3: { 'Name': 'Low', 'Value': 3, 'Sequence': 3, 'ColourIndex': 'green' },
       }     
   }

DATBand = {};
Band = {};
DATBand = eval("DATBand_ServiceID_3");
Band = eval("Band_ServiceID_3");



var TemplateMetaData_ServiceID_3 =
  {
      3: //ServiceId(all service not supporting)
          {
              107:
             {   // Incident Report
                 Id: 107, "DATEntityType": DATEntityType.AttributeGroup_Master, Name: "Incident Report ",
                 Childs: [

              {
                  Id: 109, "DATEntityType": DATEntityType.Attribute_Master, Name: 'IncidentOccursOn',
                  AnswerMode: [{
                      'Type': 'Band', "BandInfo": {
                          'Site': { 'Name': 'Site', 'Sequence': 1, 'ColourIndex': 'green' },
                          'Floor': { 'Name': 'Floor', 'Sequence': 2, 'ColourIndex': 'green' },
                          'Room': { 'Name': 'Room', 'Sequence': 3, 'ColourIndex': 'green' },
                          'Other': { 'Name': 'Other', 'Sequence': 4, 'ColourIndex': 'green' },
                      }
                    , DataType: 'INTEGER', 'ControlId': 'chkIncidentOccursOn', 'IsStaticDataSource': true
                  }]
              },
              {
                  Id: 110, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Site', AnswerMode: [
                      {
                          'Type': 'DDL', 'ControlId': 'AddlUnitControlId', DataType: 'INTEGER',
                      },
                  ]
              },
              {
                  Id: 111, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Floor', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlDepartmentControlId', DataType: 'INTEGER' }]
              },
              {
                  Id: 112, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Room', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlLocationControlId', DataType: 'INTEGER' }]
              },
              {
                  Id: 113, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Other',
                  AnswerMode: [{
                      'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtOtherControlId',
                  }]
              },
              //{
              //    Id: 488, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Section', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlSectionControlId', DataType: 'INTEGER' }]
              //},
              {
                  Id: 115, "DATEntityType": DATEntityType.Attribute_Master, Name: 'ObservationType', AnswerMode: [{
                      'Type': 'DDL', 'ControlId': 'AddlObservationTypeControlId', DataType: 'INTEGER',
                      'PreControlEvents': {
                          "1":
                              {
                                  "Dimension": "AdvanceDCAttributeValidationRule", "JobType": "DCAttributeValidationJob", "UIValidationType": "Blocker",
                                  "FinalJavaScriptEquation": "( oScope.chkIncidentOccursOn.GetSelectedText() != '')",
                                  "AttributeValidationCriteria": "", "ErrorMessageKey": "MN-RQ-INR-001 :: Please enter Incident Occurs On."
                              }
                      }
                  }]
              },
              {
                  Id: 116, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Observation', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlObservationControlId', DataType: 'INTEGER' }]
              },
              //{
              //    Id: 492, "DATEntityType": DATEntityType.Attribute_Master, Name: 'CustomObservation', AnswerMode: [{ 'Type': 'ListView', 'ControlId': 'AddlCustomObservationControlId', DataType: 'MULTI' }]
              //},
              {
                  Id: 117, "DATEntityType": DATEntityType.Attribute_Master, Name: 'RiskType',
                  AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.RiskType], DataType: 'INTEGER', 'ControlId': 'chkRiskTypeControlId' }]
              },
              {
                  Id: 120, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Comments',
                  AnswerMode: [{
                      'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtCommentsControlId',
                  }]
              },

              {
                  Id: 118, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident Date',
                  AnswerMode: [
                      { 'Type': 'DATE', DataType: 'DATE', 'ControlId': 'txtIncidentDateControlId', }
                  ]
              },
              {
                  Id: 119, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident Time',
                  AnswerMode: [{
                      'Type': 'TIME', IsManualAllowed: false, DataType: 'TIME', 'ControlId': 'txtIncidentTimeControlId',
                  }]
              }
                 ]
             },


              146:
       {   // Oneview Incident report
           Id: 146, "DATEntityType": DATEntityType.AttributeGroup_Master, Name: "Oneview Incident Report",
           Childs: [
            {
                Id: 148, "DATEntityType": DATEntityType.Attribute_Master, Name: 'IncidentType', AnswerMode: [
                    { 'Type': 'DDL', 'ControlId': 'AddlIncidentTypeControlId', DataType: 'INTEGER' }
                ]
            },
            {
                Id: 149, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident', AnswerMode: [
                   { 'Type': 'ListView', 'ControlId': 'AddlObservationControlId', DataType: 'MULTI' }
                ]
            },
            {
                Id: 150, "DATEntityType": DATEntityType.Attribute_Master, Name: 'RiskType',
                AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.RiskType], DataType: 'INTEGER', 'ControlId': 'chkRiskTypeControlId' }]
            },
            {
                Id: 151, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident Date Time',
                AnswerMode: [
                    { 'Type': 'DATETIMELOCAL', DataType: 'DATETIMELOCAL', 'ControlId': 'DTIncidentDateTimeControlId' }
                ]
            },
            {
                Id: 152, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Comments',
                AnswerMode: [{
                    'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtCommentsControlId',
                }]
            },

           ]
       }
        }
  }

 
                             