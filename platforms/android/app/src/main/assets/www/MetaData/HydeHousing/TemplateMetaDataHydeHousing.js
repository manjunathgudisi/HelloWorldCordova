
var DATBand_ServiceID_13 = {
    YesNo: 2,    
    Category: 3, // Need to move risk table
}


var Band_ServiceID_13 =
   {
       2: {
           4: { 'Name': 'Yes', 'Value': 4, 'Sequence': 1, 'ColourIndex': 'green' },
           5: { 'Name': 'No', 'Value': 5, 'Sequence': 2, 'ColourIndex': 'red' }
       },
       3: {
           6: { 'Name': 'Compliant', 'Value': 6, 'Sequence': 1, 'ColourIndex': 'red' },
           7: { 'Name': 'Suggestion', 'Value': 7, 'Sequence': 2, 'ColourIndex': '#FFC200' },
           8: { 'Name': 'Request', 'Value': 8, 'Sequence': 3, 'ColourIndex': 'green' },
       }

   }


DATBand = {};
Band = {};
DATBand = eval("DATBand_ServiceID_13");
Band = eval("Band_ServiceID_13");

var TemplateMetaData_ServiceID_13 =
  {
      13: //ServiceId(all service not supporting)
              {
                  625:
             {   // Food Saftey Shift Report
                 Id: 625, "DATEntityType": DATEntityType.AttributeGroup_Master, Name: "Incident Capture ",
                 Childs: [

            {
                Id: 627, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Project', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlProjectControlId', DataType: 'INTEGER' }]
            },
            {
                Id: 628, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Tower', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlTowerControlId', DataType: 'INTEGER' }]
            },
            {
                Id: 629, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Floor', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlFloorControlId', DataType: 'INTEGER' }]
            },
            {
                Id: 630, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Apartment', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlApartmentControlId', DataType: 'INTEGER' }]
            },
            {
                Id: 632, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Defact Category', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlObservationTypeControlId', DataType: 'INTEGER' }]
            },
            {
                Id: 639, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Defact Details', AnswerMode: [{ 'Type': 'ListView', 'ControlId': 'AddlObservationControlId', DataType: 'MULTI' }]
            },
            {
                Id: 637, "DATEntityType": DATEntityType.Attribute_Master, Name: 'CustomObservation', AnswerMode: [{ 'Type': 'ListView', 'ControlId': 'AddlCustomObservationControlId', DataType: 'MULTI' }]
            },
            {
                Id: 633, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Category',
                AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.Category], DataType: 'INTEGER', 'ControlId': 'chkCategoryControlId' }]
            },
            {
                Id: 634, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident Date',
                AnswerMode: [
                    { 'Type': 'DATE', DataType: 'DATE', 'ControlId': 'txtIncidentDateControlId', }
                ]
            },
            {
                Id: 635, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident Time',
                AnswerMode: [{
                    'Type': 'TIME', IsManualAllowed: false, DataType: 'TIME', 'ControlId': 'txtIncidentTimeControlId',
                }]
            },
            {
                Id: 638, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Comments',
                AnswerMode: [{
                    'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtCommentsControlId',
                }]
            },










                
                 ]
             },

              }
  };