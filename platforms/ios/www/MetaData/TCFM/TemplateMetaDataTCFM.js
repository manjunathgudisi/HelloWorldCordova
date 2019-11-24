
var DATBand_ServiceID_5 = {
    RiskType: 2
    
}
var Band_ServiceID_5 =
   {
       2: {//RiskType
           3: { 'Name': 'High', 'Value': 3, 'Sequence': 1, 'ColourIndex': 'red' },
           4: { 'Name': 'Medium', 'Value': 4, 'Sequence': 2, 'ColourIndex': 'orange' },
           5: { 'Name': 'Low', 'Value': 5, 'Sequence': 3, 'ColourIndex': 'green' },
       }
   }


DATBand = {};
Band = {};
DATBand = eval("DATBand_ServiceID_5");
Band = eval("Band_ServiceID_5");

var TemplateMetaData_ServiceID_5 =
  {

      5: //ServiceId(all service not supporting)
              {
                  650:
                  {
                      Id: 650, "DATEntityType": DATEntityType.AttributeGroup_Master, Name: "Incident Report",
                      Childs: [
                          //{
                          //    Id: 652, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Store', AnswerMode: [
                          //        { 'Type': 'DDL', 'ControlId': 'AddlStoreControlId', DataType: 'INTEGER' }
                          //    ]
                          //},
                       {
                           Id: 653, "DATEntityType": DATEntityType.Attribute_Master, Name: 'IncidentType', AnswerMode: [
                               { 'Type': 'DDL', 'ControlId': 'AddlIncidentTypeControlId', DataType: 'INTEGER' }
                           ]
                       },
                       {
                           Id: 654, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident', AnswerMode: [
                              { 'Type': 'ListView', 'ControlId': 'AddlObservationControlId', DataType: 'MULTI' }
                           ]
                       },
                       {
                           Id: 655, "DATEntityType": DATEntityType.Attribute_Master, Name: 'RiskType',
                           AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.RiskType], DataType: 'INTEGER', 'ControlId': 'chkRiskTypeControlId' }]
                       },
                       {
                           Id: 656, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident Date Time',
                           AnswerMode: [
                               { 'Type': 'DATETIMELOCAL', DataType: 'DATETIMELOCAL', 'ControlId': 'DTIncidentDateTimeControlId' }
                           ]
                       },
                       {
                           Id: 657, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Comments',
                           AnswerMode: [{
                               'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtCommentsControlId',
                           }]
                       }

                      ]
                  }
              }


  }

