
var DATBand_ServiceID_10 = {
    YesNo: 1,    
    RiskType: 2, // Need to move risk table
}


var Band_ServiceID_10 =
   {
       1: {//YesNo
           1: { 'Name': 'نعم فعلا', 'Value': 1, 'Sequence': 1, 'ColourIndex': 'green' },
           2: { 'Name': 'لا', 'Value': 2, 'Sequence': 2, 'ColourIndex': 'red' }
       },
       2: {//RiskType
           1: { 'Name': 'عالي', 'Value': 1, 'Sequence': 1, 'ColourIndex': 'red' },
           2: { 'Name': 'متوسط', 'Value': 2, 'Sequence': 1, 'ColourIndex': 'orange' },
           3: { 'Name': 'منخفض', 'Value': 3, 'Sequence': 2, 'ColourIndex': 'green' },
       }
   }


DATBand = {};
Band = {};
DATBand = eval("DATBand_ServiceID_10");
Band = eval("Band_ServiceID_10");

var TemplateMetaData_ServiceID_10 =
  {
      10: //ServiceId(all service not supporting)
              {
                  2:
             {   // Food Saftey Shift Report
                 Id: 2, "DATEntityType": DATEntityType.AttributeGroup_Master, Name: "Incident Report ",
                 Childs: [
                  //{
                  //    Id: 4, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Unit', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlUnitControlId', DataType: 'INTEGER' }]
                  //},
                  //{
                  //    Id: 5, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Department', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlDepartmentControlId', DataType: 'INTEGER' }]
                  //},
                  //{
                  //    Id: 6, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Location', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlLocationControlId', DataType: 'INTEGER' }]
                  //},
                  //{
                  //    Id: 7, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Section', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlSectionControlId', DataType: 'INTEGER' }]
                  //},
                  {
                      Id: 9, "DATEntityType": DATEntityType.Attribute_Master, Name: 'ObservationType', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlObservationTypeControlId', DataType: 'INTEGER' }]
                  },
                  {
                      Id: 10, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Observation', AnswerMode: [{ 'Type': 'ListView', 'ControlId': 'AddlObservationControlId', DataType: 'MULTI' }]
                  },
                  {
                      Id: 11, "DATEntityType": DATEntityType.Attribute_Master, Name: 'CustomObservation', AnswerMode: [{ 'Type': 'ListView', 'ControlId': 'AddlCustomObservationControlId', DataType: 'MULTI' }]
                  },
                  {
                      Id: 12, "DATEntityType": DATEntityType.Attribute_Master, Name: 'RiskType',
                      AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.RiskType], DataType: 'INTEGER', 'ControlId': 'chkRiskTypeControlId' }]
                  },
                  {
                      Id: 13, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Comments',
                      AnswerMode: [{
                          'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtCommentsControlId',
                      }]
                  },
                  //{
                  //    Id: 15, "DATEntityType": DATEntityType.Attribute_Master, Name: 'SampleNumber',
                  //    AnswerMode: [{
                  //        'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtSampleNumberControlId',
                  //    }]
                  //},
                  //{
                  //    Id: 16, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Source',
                  //    AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.Source], DataType: 'INTEGER', 'ControlId': 'chkSourceControlId' }]
                  //},
                  //{
                  //    Id: 17, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Supplier', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlSupplierControlId', DataType: 'INTEGER' }]
                  //},
                  //{
                  //    Id: 18, "DATEntityType": DATEntityType.Attribute_Master, Name: 'ComplaintProduct',
                  //    AnswerMode: [{
                  //        'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtComplaintProductControlId',
                  //    }]
                  //},
                  //{
                  //    Id: 19, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Brand',
                  //    AnswerMode: [{
                  //        'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtBrandControlId',
                  //    }]
                  //},
                  //{
                  //    Id: 20, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Batch',
                  //    AnswerMode: [{
                  //        'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtBatchControlId',
                  //    }]
                  //},
                  //{
                  //    Id: 21, "DATEntityType": DATEntityType.Attribute_Master, Name: 'PdDate',
                  //    AnswerMode: [{
                  //        'Type': 'DATE', DataType: 'DATE', 'ControlId': 'DTPdDateControlIdControlId',
                  //    }]
                  //},
                  //{
                  //    Id: 22, "DATEntityType": DATEntityType.Attribute_Master, Name: 'ExDate',
                  //    AnswerMode: [{
                  //        'Type': 'DATE', DataType: 'DATE', 'ControlId': 'DTExDateControlIdControlId',
                  //    }]
                  //},
                  //{
                  //    Id: 23, "DATEntityType": DATEntityType.Attribute_Master, Name: 'ItemCode',
                  //    AnswerMode: [{
                  //        'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtItemCodeControlId',
                  //    }]
                  //},
                  //{
                  //    Id: 24, "DATEntityType": DATEntityType.Attribute_Master, Name: 'ProductDescription',
                  //    AnswerMode: [{
                  //        'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtProductDescriptionControlId',
                  //    }]
                  //},
                  //{
                  //    Id: 25, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Class', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlClassControlId', DataType: 'INTEGER' }]
                  //},
                  //{
                  //    Id: 26, "DATEntityType": DATEntityType.Attribute_Master, Name: 'IsBulkDishing',
                  //    AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkIsBulkDishingControlId' }]
                  //},
                  //{
                  //    Id: 28, "DATEntityType": DATEntityType.Attribute_Master, Name: 'ERPNumber',
                  //    AnswerMode: [{
                  //        'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtERPNumberControlId',
                  //    }]
                  //},
                  //{
                  //    Id: 29, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Name',
                  //    AnswerMode: [{
                  //        'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtNameControlId',
                  //    }]
                  //},
                  //{
                  //    Id: 30, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Department',
                  //    AnswerMode: [{
                  //        'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtDepartmentControlId',
                  //    }]
                  //},
                  {
                      Id: 32, "DATEntityType": DATEntityType.Attribute_Master, Name: 'NotifiedSenior',
                      AnswerMode: [{
                          'Type': 'TEXTBOX', DataType: 'STRING', 'ControlId': 'txtNotifiedSeniorControlId',
                      }]
                  },
                  //{
                  //    Id: 34, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Chiller', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlChillerControlId', DataType: 'INTEGER' }]
                  //},
                  //{
                  //    Id: 35, "DATEntityType": DATEntityType.Attribute_Master, Name: 'BlastChiller', AnswerMode: [{ 'Type': 'DDL', 'ControlId': 'AddlBlastChillerControlId', DataType: 'INTEGER' }]
                  //},
                  //{
                  //    Id: 36, "DATEntityType": DATEntityType.Attribute_Master, Name: 'IsSampleNumber',
                  //    AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkIsSampleNumberControlId' }]
                  //},
                  {
                      Id: 38, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident Date',
                      AnswerMode: [
                          { 'Type': 'DATE', DataType: 'DATE', 'ControlId': 'txtIncidentDateControlId', }
                      ]
                  },
                  {
                      Id: 39, "DATEntityType": DATEntityType.Attribute_Master, Name: 'Incident Time',
                      AnswerMode: [{
                          'Type': 'TIME', IsManualAllowed: false, DataType: 'TIME', 'ControlId': 'txtIncidentTimeControlId',
                      }]
                  }
                 ]
             },

         /*         139:
          {   // Food Preparation
              Id: 139, "DATEntityType": DATEntityType.AttributeGroup_Master, Name: "Food Preparation ",
              Childs: [

               {
                   Id: 141, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_1',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute1_ControlId1' }]
               },
               {
                   Id: 142, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_2',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute2_ControlId2' }]
               },
               {
                   Id: 143, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_3',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute3_ControlId3' }]
               },
               {
                   Id: 144, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_4',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute4_ControlId4' }]
               },
               {
                   Id: 145, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_5',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute5_ControlId5' }]
               },
               {
                   Id: 146, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_6',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute6_ControlId6' }]
               },
               {
                   Id: 147, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_7',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute7_ControlId7' }]
               },
               {
                   Id: 148, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_8',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute8_ControlId8' }]
               },
               {
                   Id: 149, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_9',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute9_ControlId9' }]
               },
               {
                   Id: 151, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_10',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute10_ControlId10' }]
               },
               //{
               //    Id: 152, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_11',
               //    AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute11_ControlId11' }]
               //},


               {
                   Id: 153, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_12',
                   AnswerMode: [{
                       'Type': 'AUTOTEMPERATURE', IsManualAllowed: false, DataType: 'FLOAT', 'ControlId': 'AtAttribute12_ControlId12', Format: '#.#',
                   }]
               },
               {
                   Id: 154, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_13',
                   AnswerMode: [{
                       'Type': 'AUTOTEMPERATURE', IsManualAllowed: false, DataType: 'FLOAT', 'ControlId': 'AtAttribute13_ControlId13', Format: '#.#',
                   }]
               },
               {
                   Id: 155, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_14',
                   AnswerMode: [{
                       'Type': 'AUTOTEMPERATURE', IsManualAllowed: false, DataType: 'FLOAT', 'ControlId': 'AtAttribute14_ControlId14', Format: '#.#',
                   }]
               },

               {
                   Id: 156, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_15',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute15_ControlId15' }]
               },
               {
                   Id: 157, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_16',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute16_ControlId16' }]
               },
               {
                   Id: 158, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_17',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute17_ControlId17' }]
               },
               {
                   Id: 159, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_18',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute18_ControlId18' }]
               },
               {
                   Id: 160, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_19',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute19_ControlId19' }]
               },


               {
                   Id: 161, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_20',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute20_ControlId20' }]
               },
               {
                   Id: 162, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_21',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute21_ControlId21' }]
               },
               {
                   Id: 163, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_22',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute22_ControlId22' }]
               },
               {
                   Id: 164, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_23',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute23_ControlId23' }]
               },
               {
                   Id: 165, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_24',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute24_ControlId24' }]
               },
               {
                   Id: 166, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_25',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute25_ControlId25' }]
               },
               {
                   Id: 167, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_26',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute26_ControlId26' }]
               },
               {
                   Id: 168, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_27',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute27_ControlId27' }]
               },
               {
                   Id: 169, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_28',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute28_ControlId28' }]
               },
               {
                   Id: 170, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_29',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute29_ControlId29' }]
               },

               {
                   Id: 171, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_30',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute30_ControlId30' }]
               },
               {
                   Id: 172, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_31',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute31_ControlId31' }]
               },
               {
                   Id: 173, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_32',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute32_ControlId32' }]
               },
               {
                   Id: 174, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_33',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute33_ControlId33' }]
               },
               {
                   Id: 175, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_34',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute34_ControlId34' }]
               },
               {
                   Id: 177, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_35',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute35_ControlId35' }]
               },
               {
                   Id: 178, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_36',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute36_ControlId36' }]
               },
               {
                   Id: 179, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_37',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute37_ControlId37' }]
               },
               {
                   Id: 180, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_38',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute38_ControlId38' }]
               },
               {
                   Id: 181, "DATEntityType": DATEntityType.Attribute_Master, Name: 'AttributeName_39',
                   AnswerMode: [{ 'Type': 'Band', "BandInfo": Band[DATBand.YesNo], DataType: 'INTEGER', 'ControlId': 'chkAttribute39_ControlId39' }]
               },

              ]
          }*/
              }
  };