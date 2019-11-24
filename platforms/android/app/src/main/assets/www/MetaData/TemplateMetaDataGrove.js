
var DATBand = {   
    RiskType: 1, // Need to move risk table  
}
var Band =
   {
       1: {//RiskType
           1: { 'Name': 'High', 'Value': 1, 'Sequence': 1, 'ColourIndex': 'red' },
           2: { 'Name': 'Medium', 'Value': 2, 'Sequence': 2, 'ColourIndex': 'orange' },
           3: { 'Name': 'Low', 'Value': 3, 'Sequence': 3, 'ColourIndex': 'green' },
       }     
   }
var TemplateMetaData =
  {
      1: //ServiceId(all service not supporting)
          {
              483:
             {   // Incident Report
                 Id: 483, "DATEntityType": DATEntityType.AttributeGroup_Master, Name: "Incident Report ",
                 Childs: [
                  {
                      Id: 485, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Site', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlUnitControlId', DataType: 'INTEGER' }]
                  },
                  {
                      Id: 486, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Floor/Zone', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlDepartmentControlId', DataType: 'INTEGER' }]
                  },
                  {
                      Id: 487, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Room Type', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlLocationControlId', DataType: 'INTEGER' }]
                  },
                  {
                      Id: 488, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Room', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlSectionControlId', DataType: 'INTEGER' }]
                  },
                  {
                      Id: 490, "DATEntityType": DATEntityType.Attribute_Master, Name: 'ObservationType', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlObservationTypeControlId', DataType: 'INTEGER' }]
                  },
                  {
                      Id: 491, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Observation', AnswerMode: [{ 'Type': 'ListView', 'ControlId': 'AddlObservationControlId', DataType: 'MULTI' }]
                  },
                  {
                      Id: 492, "DATEntityType": DATEntityType.Attribute_Master, Name: 'CustomObservation', AnswerMode: [{ 'Type': 'ListView', 'ControlId': 'AddlCustomObservationControlId', DataType: 'MULTI' }]
                  },
                  {
                      Id: 493, "DATEntityType": DATEntityType.Attribute_Master, Name: 'RiskType',
                      AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.RiskType], DataType: 'INTEGER', 'ControlId': 'chkRiskTypeControlId' }]
                  },
                  {
                      Id: 494, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Comments',
                      AnswerMode: [{
                          'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtCommentsControlId',
                      }]
                  },
                  {
                      Id: 513, "DATEntityType": DATEntityType.Attribute_Master, Name: 'NotifiedSenior',
                      AnswerMode: [{
                          'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtNotifiedSeniorControlId',
                      }]
                  },
                  {
                      Id: 8306, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident Date',
                      AnswerMode: [
                          { 'Type': 'DATE', DataType: 'DATE', 'ControlId': 'txtIncidentDateControlId', }
                      ]
                  },
                  {
                      Id: 8307, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident Time',
                      AnswerMode: [{
                          'Type': 'TIME', IsManualAllowed: false, DataType: 'TIME', 'ControlId': 'txtIncidentTimeControlId',
                      }]
                  }
                 ]
             }
        }
  }

 
                             