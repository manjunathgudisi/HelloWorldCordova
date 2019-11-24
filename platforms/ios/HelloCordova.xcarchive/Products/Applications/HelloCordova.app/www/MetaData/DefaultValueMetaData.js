

var GlobalDefaultValueMetaData = [
    {
        ServiceId: 1, // all service not supporting.
        ServiceDefaultValueMetaData: [
        {
            'UserId': 0, //all Users
            DefaultValueMetaDatas: [
                {
                TemplateNodeId: "3", //Cooking and Blast chilling Verification
                DCPlaceNodeId: "2",//any place
                DCPlaceDimension: "OrganizationHierachyNode",  //remove this,if DCPlaceNodeId=0
                DefaultValue: [
                {
                  'ControlId': 'txtCookedByControlId',
                   'AttributeNodeId': 33,
                   'Answer': "Ek Chef"
                },
                {
                    'ControlId': 'AddlAirlineControlId',
                    'AttributeNodeId': 30,
                    "Answer": "EK",
                    "AnswerValue": 812 //for DDL,need to mention ID
                }]
                },
                {
                    TemplateNodeId: "3", //Cooking and Blast chilling Verification
                    DCPlaceNodeId: "3",//any place
                    DCPlaceDimension: "OrganizationHierachyNode",  //remove this,if DCPlaceNodeId=0
                    DefaultValue: [
                    {
                        'ControlId': 'txtCookedByControlId',
                        'AttributeNodeId': 33,
                        'Answer': "Ek Chef"
                    },
                    {
                        'ControlId': 'AddlAirlineControlId',
                        'AttributeNodeId': 30,
                        "Answer": "EK",
                        "AnswerValue": 818 //for DDL,need to mention ID
                    }]
                },
            {
                TemplateNodeId: "2",//Cooking and Blast chilling Monitoring
                DCPlaceNodeId: "2",////any place
                DCPlaceDimension: "OrganizationHierachyNode", //remove this,if DCPlaceNodeId=0
                DefaultValue: [
                   
                {
                    'ControlId': 'txtCookedByControlId',
                    'AttributeNodeId': 13,
                    "Answer": "Ek Chef",
                },
                {
                    'ControlId': 'AddlAirlineControlId',
                    'AttributeNodeId': 10,
                    "Answer": "EK",
                    "AnswerValue": 812 //for DDL,need to mention ID
                }
                //{
                //    'ControlId': 'AddlProductControlId',
                //    'AttributeNodeId': 4,
                //    "Answer": "EGG BURJI",
                //    "AnswerValue": 287 //for DDL,need to mention ID
                //}
                ]
            },
            {
                TemplateNodeId: "2",//Cooking and Blast chilling Monitoring
                DCPlaceNodeId: "3",////any place
                DCPlaceDimension: "OrganizationHierachyNode", //remove this,if DCPlaceNodeId=0
                DefaultValue: [

                {
                    'ControlId': 'txtCookedByControlId',
                    'AttributeNodeId': 13,
                    "Answer": "Ek Chef",
                },
                {
                    'ControlId': 'AddlAirlineControlId',
                    'AttributeNodeId': 10,
                    "Answer": "EK",
                    "AnswerValue": 818 //for DDL,need to mention ID
                }
                //{
                //    'ControlId': 'AddlProductControlId',
                //    'AttributeNodeId': 4,
                //    "Answer": "EGG BURJI",
                //    "AnswerValue": 287 //for DDL,need to mention ID
                //}
                ]
            }
            //,{
            //    TemplateNodeId: "0", //Goods-Receipts
            //    DCPlaceNodeId: "0",////any place
            //    DCPlaceDimension: "OrganizationHierachyNode", //remove this,if DCPlaceNodeId=0
            //    DefaultValue: [
            //    {
            //        'ControlId': 'AddlSupplierControlId',
            //        'AttributeNodeId': 45,
            //        "Answer": "Supplier",
            //        "AnswerValue": 0 //for DDL,need to mention ID
            //    }]
            //}
            ]
        }]
    }];












//var GlobalDefaultValueMetaData = [
//    {
//        ServiceId: 1, // all service not supporting.
//        ServiceDefaultValueMetaData: [
//        {
//           'UserId': 0, //all Users
//            DefaultValueMetaDatas: [{
//                TemplateNodeId: "3", //Cooking and Blast chilling Verification
//                DCPlaceNodeId: "0",//any place
//                DCPlaceDimension: "OrganizationHierachyNode",  //remove this,if DCPlaceNodeId=0
//                DefaultValue: [{
//                    'ControlId': 'txtCookedByControlId',
//                    'AttributeNodeId': 33,
//                    "Answer": "Verify-Ek Chef ",
//                },
//                {
//                    'ControlId': 'AddlAirlineControlId',
//                    'AttributeNodeId': 30,
//                    "Answer": "Verify-Ek",
//                    "AnswerValue": 530 //for DDL,need to mention ID
//                }]
//            },
//            {
//                TemplateNodeId: "2",//Cooking and Blast chilling Monitoring
//                DCPlaceNodeId: "0",////any place
//                DCPlaceDimension: "OrganizationHierachyNode", //remove this,if DCPlaceNodeId=0
//                DefaultValue: [{
//                    'ControlId': 'txtCookedByControlId',
//                    'AttributeNodeId': 13,
//                    "Answer": "Monitor-Ek Chef",
//                },
//                {
//                    'ControlId': 'AddlAirlineControlId',
//                    'AttributeNodeId': 10,
//                    "Answer": "Monitor-Ek",
//                    "AnswerValue": 530 //for DDL,need to mention ID
//                }]
//            },

//            {
//                TemplateNodeId: "0", //Goods-Receipts
//                DCPlaceNodeId: "0",////any place
//                DCPlaceDimension: "OrganizationHierachyNode", //remove this,if DCPlaceNodeId=0
//                DefaultValue: [
//                {
//                    'ControlId': 'AddlSupplierControlId',
//                    'AttributeNodeId': 45,
//                    "Answer": "Supplier",
//                    "AnswerValue": 0 //for DDL,need to mention ID
//                }]
//            }
//            ]
//        }]
//    }];
    
    
    
