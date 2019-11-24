    ///In first metadata have to change AuditPlaceNodeId=3 , temporarily changed coz place id is coming wrong

var GlobalDCMandatoryValidationMetaData = 
   {
        1: //ServiceId(all service not supporting)
                {
                    2: [
                        { // "2",//Cooking and Blast chilling Monitoring
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 4,
                                        'ControlId': 'AddlProductControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Product",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                                       //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        //{
                                        //    'AttributeNodeId': 4,
                                        //    'ControlId': 'AddlProductControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_Product",
                                        //}
                                        //{
                                        //    'AttributeNodeId': 10,
                                        //    'ControlId': 'AddlAirlineControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_Airline",
                                        //},
                                        //{
                                        //    'AttributeNodeId': 11,
                                        //    'ControlId': 'txtCoreTempControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_CoreTemp",
                                        //},
                                        //{
                                        //    'AttributeNodeId': 12,
                                        //    'ControlId': 'DTCookingTimeControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_CookingTime",
                                        //},
                                        //{
                                        //    'AttributeNodeId': 13,
                                        //    'ControlId': 'txtCookedByControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_CookedBy",
                                        //},
                                        //{
                                        //    'AttributeNodeId': 18,
                                        //    'ControlId': 'AddlBlastChillerNoControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_BlastChillerNo",
                                        //},
                                        // {
                                        //     'AttributeNodeId': 19,
                                        //     'ControlId': 'DTBlastChillerTimeInControlId',
                                        //     "DefaultValue": "",
                                        //     "ErrorMessageKey": "Mandatory_BlastChillerTimeIn",
                                        // },
                                        //  {
                                        //      'AttributeNodeId': 20,
                                        //      'ControlId': 'ATBlastChillerTempInControlId',
                                        //      "DefaultValue": "",
                                        //      "ErrorMessageKey": "Mandatory_BlastChillerTempIn",
                                        //  },
                                        //   {
                                        //       'AttributeNodeId': 21,
                                        //       'ControlId': 'DTBlastChillerTimeOutControlId',
                                        //       "DefaultValue": "",
                                        //       "ErrorMessageKey": "Mandatory_BlastChillerTimeOut",
                                        //   },
                                        //   {
                                        //       'AttributeNodeId': 22,
                                        //       'ControlId': 'ATBlastChillerTempOutControlId',
                                        //       "DefaultValue": "",
                                        //       "ErrorMessageKey": "Mandatory_BlastChillerTempOut",
                                        //   }
                                           //,{
                                           //    'AttributeNodeId': 23,
                                           //    'ControlId': 'AddlCommentControlId',
                                           //    "DefaultValue": "",
                                           //    "ErrorMessageKey": "Mandatory_Comment",
                                           //}

                                    ]
                                }
                            }
                        }
                    ],

                    3: [
                        { // "3",//Cooking and Blast chilling Verification
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 24,
                                        'ControlId': 'AddlProductControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Product",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true,
                                    MandatoryElements: [                                    
                                                        //{
                                                        //     'AttributeNodeId': 24,
                                                        //    'ControlId': 'AddlProductControlId',
                                                        //    "DefaultValue": "",
                                                        //    "ErrorMessageKey": "Mandatory_Product",
                                                        //}
                                                        //{
                                                        //    'AttributeNodeId': 30,
                                                        //    'ControlId': 'AddlAirlineControlId',
                                                        //    "DefaultValue": "",
                                                        //    "ErrorMessageKey": "Mandatory_Airline",
                                                        //},
                                                        //{
                                                        //    'AttributeNodeId': 31,
                                                        //    'ControlId': 'txtCoreTempControlId',
                                                        //    "DefaultValue": "",
                                                        //    "ErrorMessageKey": "Mandatory_CoreTemp",
                                                        //},
                                                        //{
                                                        //    'AttributeNodeId': 32,
                                                        //    'ControlId': 'DTCookingTimeControlId',
                                                        //    "DefaultValue": "",
                                                        //    "ErrorMessageKey": "Mandatory_CookingTime",
                                                        //},
                                                        //{
                                                        //    'AttributeNodeId': 33,
                                                        //    'ControlId': 'txtCookedByControlId',
                                                        //    "DefaultValue": "",
                                                        //    "ErrorMessageKey": "Mandatory_CookedBy",
                                                        //},
                                                        //{
                                                        //    'AttributeNodeId': 38,
                                                        //    'ControlId': 'AddlBlastChillerNoControlId',
                                                        //    "DefaultValue": "",
                                                        //    "ErrorMessageKey": "Mandatory_BlastChillerNo",
                                                        //},
                                                        // {
                                                        //     'AttributeNodeId': 39,
                                                        //     'ControlId': 'DTBlastChillerTimeInControlId',
                                                        //     "DefaultValue": "",
                                                        //     "ErrorMessageKey": "Mandatory_BlastChillerTimeIn",
                                                        // },
                                                        //  {
                                                        //      'AttributeNodeId': 40,
                                                        //      'ControlId': 'ATBlastChillerTempInControlId',
                                                        //      "DefaultValue": "",
                                                        //      "ErrorMessageKey": "Mandatory_BlastChillerTempIn",
                                                        //  },
                                                        //   {
                                                        //       'AttributeNodeId': 41,
                                                        //       'ControlId': 'DTBlastChillerTimeOutControlId',
                                                        //       "DefaultValue": "",
                                                        //       "ErrorMessageKey": "Mandatory_BlastChillerTimeOut",
                                                        //   },
                                                        //   {
                                                        //       'AttributeNodeId': 42,
                                                        //       'ControlId': 'ATBlastChillerTempOutControlId',
                                                        //       "DefaultValue": "",
                                                        //       "ErrorMessageKey": "Mandatory_BlastChillerTempOut",
                                                        //   }
                                                           //,{
                                                           //    'AttributeNodeId': 43,
                                                           //    'ControlId': 'AddlCommentControlId',
                                                           //    "DefaultValue": "",
                                                           //    "ErrorMessageKey": "Mandatory_Comment",
                                                           //}
                                    ]
                                }
                            }
                        }
                    ],
                    44: [
                       { // "4",//Goods Receiving And Temperature Verification Records
                           UserId: -1,  //all Users
                           DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                           DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                           MandatoryValidationMetaData: {
                               'Save': { //(OperationName) ex:Save,Submit 
                                   MandatoryElements: [
                                    {
                                        'AttributeNodeId': 427,
                                        'ControlId': 'AddlPurchaseOrderNoControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_PurchaseOrderNo",
                                    },
                                   {
                                       'AttributeNodeId': 48,
                                       'ControlId': 'AddlProductControlId',
                                       "DefaultValue": "0",
                                       "ErrorMessageKey": "Mandatory_Product",
                                   }
                                   ]
                               },
                               'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                   IsAgainstDC: true,
                                   MandatoryElements: [
                                   //    {
                                   //        'AttributeNodeId': 427,
                                   //        'ControlId': 'AddlPurchaseOrderNoControlId',
                                   //        "DefaultValue": "0",
                                   //        "ErrorMessageKey": "Mandatory_PurchaseOrderNo",
                                   //    },
                                   //    {
                                   //        'AttributeNodeId': 48,
                                   //        'ControlId': 'AddlProductControlId',
                                   //        "DefaultValue": "0",
                                   //        "ErrorMessageKey": "Mandatory_Product",
                                   //    },
                                   //   {
                                   //       'AttributeNodeId': 45,
                                   //       'ControlId': 'AddlSupplierControlId',
                                   //       "DefaultValue": "0",
                                   //       "ErrorMessageKey": "Mandatory_Supplier",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 47,
                                   //       'ControlId': 'chkGoodsType',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_GoodsType",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 534,
                                   //       'ControlId': 'AddlReceivingUnitControlId',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_ReceivingUnit",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 61,
                                   //       'ControlId': 'ATSurfaceTempControlId',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_SurfaceTemp",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 60,
                                   //       'ControlId': 'DTTimeControlId',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_DTTimeControlId",
                                   //   },
                                   //   //{
                                   //   //    'AttributeNodeId': 62,
                                   //   //    'ControlId': 'DTDATEControlId',
                                   //   //    "DefaultValue": "",
                                   //   //    "ErrorMessageKey": "Mandatory_DTDATEControlId",
                                   //   //},
                                   //   //{
                                   //   //    'AttributeNodeId': 305,
                                   //   //    'ControlId': 'EXDATEControlId',
                                   //   //    "DefaultValue": "",
                                   //   //    "ErrorMessageKey": "Mandatory_EXDATEControlId",
                                   //   //},
                                   //   {
                                   //       'AttributeNodeId': 63,
                                   //       'ControlId': 'chkPestSignToggle',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_PestSign",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 64,
                                   //       'ControlId': 'chkPackagingIntegrity',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_PackagingIntegrity",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 479,
                                   //       'ControlId': 'chkRefStatus',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_RefStatus",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 54,
                                   //       'ControlId': 'ATTruckTempControlId',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_TruckTemp",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 55,
                                   //       'ControlId': 'chkTruckStripCurtains',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_TruckStripCurtains",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 56,
                                   //       'ControlId': 'chkTruckCleanliness',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_TruckCleanliness",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 57,
                                   //       'ControlId': 'chkVehicleApprovalTag',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_DMVehicleApprovalTag",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 58,
                                   //       'ControlId': 'chkDeliveryStaffHairBeardNets',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_DeliveryStaffHairBeardNets",
                                   //   },
                                   //   {
                                   //       'AttributeNodeId': 59,
                                   //       'ControlId': 'chkDeliveryStaffUniformCondition',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_DeliveryStaffUniformCondition",
                                   //   },
                                   //    {
                                   //        'AttributeNodeId': 481,
                                   //        'ControlId': 'chkProductStatus',
                                   //        "DefaultValue": "",
                                   //        "ErrorMessageKey": "Mandatory_ProductStatus",
                                   //    },
                                   ////,{
                                   ////    'AttributeNodeId': 65,
                                   ////    'ControlId': 'txtCommentsCorrectiveActionControlId',
                                   ////    "DefaultValue": "",
                                   ////    "ErrorMessageKey": "Mandatory_Supplier",
                                   ////},
                                   //  {
                                   //      'AttributeNodeId': 515,
                                   //       'ControlId': 'chkProductionDateMode',
                                   //       "DefaultValue": "",
                                   //       "ErrorMessageKey": "Mandatory_ProductionDateMode",
                                   //   }
                                   ]
                               }
                           }
                       }
                    ]
                    ,
                    66: [
                    { // "66",//nc 
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                {
                                    'AttributeNodeId': 67,
                                    'ControlId': 'AddlProductControlId',
                                    "DefaultValue": "",
                                    "ErrorMessageKey": "Mandatory_Product",
                                },
                                {
                                    'AttributeNodeId': 68, //supplier
                                    'ControlId': 'ATBlastChillerTempOutControlId',
                                    "DefaultValue": "",
                                    "ErrorMessageKey": "Mandatory_BlastChillerTempOut",
                                },
                                 {
                                     'AttributeNodeId': 69, //supplier
                                     'ControlId': 'DTBlastChillerTimeOutControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_BlastChillerTimeOut",
                                 }
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true,
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 71,
                                        'ControlId': 'ETD',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_ETD",
                                    },
                                {
                                    'AttributeNodeId': 72,
                                    'ControlId': 'TakenBy',
                                    "DefaultValue": "",
                                    "ErrorMessageKey": "Mandatory_TakenBy",
                                },
                                {
                                    'AttributeNodeId': 73,
                                    'ControlId': 'Reason',
                                    "DefaultValue": "",
                                    "ErrorMessageKey": "Mandatory_Reason",
                                },
                                {
                                    'AttributeNodeId': 74,
                                    'ControlId': 'Comments',
                                    "DefaultValue": "",
                                    "ErrorMessageKey": "Mandatory_Comments",
                                }
                                
                                ]
                            }
                        }
                    }
                    ],
                   77: [
                   { // "77",//ThawingVerification
                       UserId: -1,  //all Users
                       DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                       DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                       MandatoryValidationMetaData: {
                           'Save': { //(OperationName) ex:Save,Submit 
                               MandatoryElements: [
                               {
                                   'AttributeNodeId': 78,
                                   'ControlId': 'AddlProductControlId',
                                   "DefaultValue": "",
                                   "ErrorMessageKey": "Mandatory_Product",
                               }
                              
                               ]
                           },
                           'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                               IsAgainstDC: true,
                               MandatoryElements: [
                                   {
                                       'AttributeNodeId': 78,
                                       'ControlId': 'AddlProductControlId',
                                       "DefaultValue": "",
                                       "ErrorMessageKey": "Mandatory_Product",
                                   },
                                   {
                                       'AttributeNodeId': 79,
                                       'ControlId': 'chkProductCategory',
                                       "DefaultValue": "",
                                       "ErrorMessageKey": "Mandatory_ProductCategory",
                                   },
                                   {
                                       'AttributeNodeId': 404,
                                       'ControlId': 'chkProductState',
                                       "DefaultValue": "",
                                       "ErrorMessageKey": "Mandatory_ProductState",
                                   },
                               {
                                   'AttributeNodeId': 80,
                                   'ControlId': 'DTDateCodeControlId',
                                   "DefaultValue": "",
                                   "ErrorMessageKey": "Mandatory_DateCode",
                               },
                               {
                                   'AttributeNodeId': 81,
                                   'ControlId': 'TimeControlId',
                                   "DefaultValue": "",
                                   "ErrorMessageKey": "Mandatory_Time",
                               },
                               {
                                   'AttributeNodeId': 82,
                                   'ControlId': 'DTExpiryDateControlId',
                                   "DefaultValue": "",
                                   "ErrorMessageKey": "Mandatory_ExpiryDate",
                               },
                                  {
                                      'AttributeNodeId': 83,
                                      'ControlId': 'chkThawingComplete',
                                      "DefaultValue": "",
                                      "ErrorMessageKey": "Mandatory_ThawingComplete",
                                  },
                                  {
                                      'AttributeNodeId': 86,
                                      'ControlId': 'chkUsedFor',
                                      "DefaultValue": "",
                                      "ErrorMessageKey": "Mandatory_UsedFor",
                                  },
                               {
                                   'AttributeNodeId': 84,
                                   'ControlId': 'txtTempControlId',
                                   "DefaultValue": "",
                                   "ErrorMessageKey": "Mandatory_Temp",
                               },
                               {
                                   'AttributeNodeId': 85,
                                   'ControlId': 'DTTimeCheckedControlId',
                                   "DefaultValue": "",
                                   "ErrorMessageKey": "Mandatory_TimeChecked",
                               },
                               {
                                   'AttributeNodeId': 405,
                                   'ControlId': 'txtBrandName',
                                   "DefaultValue": "",
                                   "ErrorMessageKey": "Mandatory_BrandName",
                               }

                               ]
                           }
                       }
                   }
                    ],
                    88: [
                        { // "88",//BakingBCVerification
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 89,
                                        'ControlId': 'AddlProductControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Product",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 89,
                                            'ControlId': 'AddlProductControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_Product",
                                        },
                                        //{
                                        //    'AttributeNodeId': 90,
                                        //    'ControlId': 'AddlAirlineControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_Airline",
                                        //},
                                        {
                                            'AttributeNodeId': 91,
                                            'ControlId': 'txtCoreTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_CoreTemp",
                                        },
                                        {
                                            'AttributeNodeId': 92,
                                            'ControlId': 'DTBakingTimeControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_BakingTime",
                                        },
                                        //{
                                        //    'AttributeNodeId': 13,
                                        //    'ControlId': 'txtCookedByControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_CookedBy",
                                        //},
                                        {
                                            'AttributeNodeId': 93,
                                            'ControlId': 'AddlBlastChillerNoControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_BlastChillerNo",
                                        },
                                         {
                                             'AttributeNodeId': 94,
                                             'ControlId': 'DTBlastChillerTimeInControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_BlastChillerTimeIn",
                                         },
                                          {
                                              'AttributeNodeId': 95,
                                              'ControlId': 'ATBlastChillerTempInControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_BlastChillerTempIn",
                                          },
                                           {
                                               'AttributeNodeId': 96,
                                               'ControlId': 'DTBlastChillerTimeOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_BlastChillerTimeOut",
                                           },
                                           {
                                               'AttributeNodeId': 97,
                                               'ControlId': 'ATBlastChillerTempOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_BlastChillerTempOut",
                                           }
                                           //,{
                                           //    'AttributeNodeId': 100,
                                           //    'ControlId': 'AddlCommentControlId',
                                           //    "DefaultValue": "",
                                           //    "ErrorMessageKey": "Mandatory_Comment",
                                           //}

                                    ]
                                }
                            }
                        }
                    ],
                    99: [
                        { // "2",//DispatchingAndVerification
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 100,
                                        'ControlId': 'MealControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Meal",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 100,
                                            'ControlId': 'MealControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "",
                                        },
                                        {
                                            'AttributeNodeId': 101,
                                            'ControlId': 'AddlAirlineControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "",
                                        },
                                        {
                                            'AttributeNodeId': 102,
                                            'ControlId': 'DTAmbientTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "",
                                        },
                                        {
                                            'AttributeNodeId': 103,
                                            'ControlId': 'DTETDControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "",
                                        },
                                        {
                                            'AttributeNodeId': 104,
                                            'ControlId': 'txtMealClassControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "",
                                        },
                                        {
                                            'AttributeNodeId': 105,
                                            'ControlId': 'DTPRDTimeControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "",
                                        },
                                         {
                                             'AttributeNodeId': 106,
                                             'ControlId': 'PRDTempControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "",
                                         },
                                          {
                                              'AttributeNodeId': 107,
                                              'ControlId': 'DTDispatchTimeControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "",
                                          },
                                           {
                                               'AttributeNodeId': 108,
                                               'ControlId': 'AmbientTempControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "",
                                           },
                                           {
                                               'AttributeNodeId': 109,
                                               'ControlId': 'DispatchTempControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "",
                                           }
                                           ,{
                                               'AttributeNodeId': 110,
                                               'ControlId': 'DTLoadingTimeControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "",
                                           }
                                            , {
                                                'AttributeNodeId': 111,
                                                'ControlId': 'DTMovingTimeControlId',
                                                "DefaultValue": "",
                                                "ErrorMessageKey": "",
                                            }
                                           

                                    ]
                                }
                            }
                        }
                    ],
                    116: [
                        { // "116",//Temperature Verification Of Tray-Setting
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 117,
                                        'ControlId': 'MealControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Meal",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 117,
                                            'ControlId': 'MealControlId',
                                            "DefaultValue": "0",
                                            "ErrorMessageKey": "Mandatory_Meal",
                                        },
                                           {
                                               'AttributeNodeId': 558,
                                               'ControlId': 'MealMealTypeControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_MealType",
                                           },
                                        //{
                                        //    'AttributeNodeId': 118,
                                        //    'ControlId': 'AddlAirlineControlId',
                                        //    "DefaultValue": "0",
                                        //    "ErrorMessageKey": "Mandatory_Airline",
                                        //},
                                        {
                                            'AttributeNodeId': 119,
                                            'ControlId': 'DTAmbientTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_AmbientTemp",
                                        },
                                        {
                                            'AttributeNodeId': 120,
                                            'ControlId': 'DTETDControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_ETD",
                                        },
                                        //{
                                        //    'AttributeNodeId': 121,
                                        //    'ControlId': 'txtClassControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_Class",
                                        //},
                                        {
                                            'Type': 'AdvanceDCValidationRuleMetaData',
                                            'DCValidationRule': "((oScope['AddlSectorControlId'].GetSelectedText() != '')&& (oScope['AddlSectorControlId'].GetSelectedText() != undefined))||((oScope['AddlFlightControlId'].GetSelectedText() != '')&& (oScope['AddlFlightControlId'].GetSelectedText() != undefined))||((oScope['AddlAirlineControlId'].GetSelectedText() !='')&& (oScope['AddlAirlineControlId'].GetSelectedText() != undefined)) ? ((oScope['txtClassControlId'].GetSelectedText() != '')&& (oScope['txtClassControlId'].GetSelectedText() != undefined)) : true",
                                            "ErrorMessageKey": "Mandatory_Class",
                                        },
                                        {
                                            'Type': 'AdvanceDCValidationRuleMetaData',
                                            'DCValidationRule': '((oScope["AddlSectorControlId"].GetSelectedText() != "")&& (oScope["AddlSectorControlId"].GetSelectedText() != undefined))||((oScope["AddlFlightControlId"].GetSelectedText() != "")&& (oScope["AddlFlightControlId"].GetSelectedText() != undefined))||((oScope["AddlAirlineControlId"].GetSelectedText() !="")&& (oScope["AddlAirlineControlId"].GetSelectedText() != undefined))||((oScope["AddlFAndBControlId"].GetSelectedText() !="")&& (oScope["AddlFAndBControlId"].GetSelectedText() != undefined))',
                                            "ErrorMessageKey": "Mandatory_CustomerDetails",
                                        },
                                        {
                                            'AttributeNodeId': 122,
                                            'ControlId': 'DTStartingTimeInControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_StartingTimeIn",
                                        },
                                         {
                                             'AttributeNodeId': 123,
                                             'ControlId': 'StartingTempInControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_StartingTempIn",
                                         },
                                          {
                                              'AttributeNodeId': 124,
                                              'ControlId': 'DTFinishingTimeOutControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_FinishingTimeOut",
                                          },
                                           {
                                               'AttributeNodeId': 125,
                                               'ControlId': 'FinishingTempOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_FinishingTempOut",
                                           },
                                           {
                                               'AttributeNodeId': 127,
                                               'ControlId': 'txtNumHotMealControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_NoofTray",
                                           }
                                    ]
                                }
                            }
                        }
                    ],
                    128: [
                        { // "130",//Temperature Verification Of Pastry Portioning
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 129,
                                        'ControlId': 'MealControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Product",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 129,
                                            'ControlId': 'MealControlId',
                                            "DefaultValue": "0",
                                            "ErrorMessageKey": "Mandatory_Product",
                                        },
                                           {
                                               'AttributeNodeId': 559,
                                               'ControlId': 'MealMealTypeControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_MealType",
                                           },
                                        //{
                                        //    'AttributeNodeId': 130,
                                        //    'ControlId': 'AddlAirlineControlId',
                                        //    "DefaultValue": "0",
                                        //    "ErrorMessageKey": "Mandatory_Airline",
                                        //},
                                        {
                                            'AttributeNodeId': 131,
                                            'ControlId': 'DTAmbientTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_AmbientTemp",
                                        },
                                        //{
                                        //    'AttributeNodeId': 132,
                                        //    'ControlId': 'DTETDControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_ETD",
                                        //},
                                        //{
                                        //    'AttributeNodeId': 133,
                                        //    'ControlId': 'txtClassControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_Class",
                                        //},
                                        {
                                            'Type': 'AdvanceDCValidationRuleMetaData',
                                            'DCValidationRule': "((oScope['AddlSectorControlId'].GetSelectedText() != '')&& (oScope['AddlSectorControlId'].GetSelectedText() != undefined))||((oScope['AddlFlightControlId'].GetSelectedText() != '')&& (oScope['AddlFlightControlId'].GetSelectedText() != undefined))||((oScope['AddlAirlineControlId'].GetSelectedText() !='')&& (oScope['AddlAirlineControlId'].GetSelectedText() != undefined)) ? ((oScope['txtClassControlId'].GetSelectedText() != '')&& (oScope['txtClassControlId'].GetSelectedText() != undefined)) : true",
                                            "ErrorMessageKey": "Mandatory_Class",
                                        },
                                        {
                                            'Type': 'AdvanceDCValidationRuleMetaData',
                                            'DCValidationRule': '((oScope["AddlSectorControlId"].GetSelectedText() != "")&& (oScope["AddlSectorControlId"].GetSelectedText() != undefined))||((oScope["AddlFlightControlId"].GetSelectedText() != "")&& (oScope["AddlFlightControlId"].GetSelectedText() != undefined))||((oScope["AddlAirlineControlId"].GetSelectedText() !="")&& (oScope["AddlAirlineControlId"].GetSelectedText() != undefined))||((oScope["AddlFAndBControlId"].GetSelectedText() !="")&& (oScope["AddlFAndBControlId"].GetSelectedText() != undefined))',
                                            "ErrorMessageKey": "Mandatory_CustomerDetails",
                                        },                                        
                                        {
                                            'AttributeNodeId': 134,
                                            'ControlId': 'DTStartingTimeInControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_StartingTimeIn",
                                        },
                                         {
                                             'AttributeNodeId': 135,
                                             'ControlId': 'StartingTempInControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_StartingTempIn",
                                         },
                                          {
                                              'AttributeNodeId': 136,
                                              'ControlId': 'DTFinishingTimeOutControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_FinishingTimeOut",
                                          },
                                           {
                                               'AttributeNodeId': 137,
                                               'ControlId': 'FinishingTempOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_FinishingTempOut",
                                           },
                                           {
                                               'AttributeNodeId': 139,
                                               'ControlId': 'txtNumOfDessertControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_NumOfDessert",
                                           }
                                    ]
                                }
                            }
                        }
                    ],
                    140: [
                        { // "142",//Temperature Verification Of Hot Meal Dishing
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 141,
                                        'ControlId': 'MealControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Product",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 141,
                                            'ControlId': 'MealControlId',
                                            "DefaultValue": "0",
                                            "ErrorMessageKey": "Mandatory_Product",
                                        },
                                           {
                                               'AttributeNodeId': 560,
                                               'ControlId': 'MealMealTypeControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_MealType",
                                           },
                                        //{
                                        //    'AttributeNodeId': 142,
                                        //    'ControlId': 'AddlAirlineControlId',
                                        //    "DefaultValue": "0",
                                        //    "ErrorMessageKey": "Mandatory_Airline",
                                        //},
                                        {
                                            'AttributeNodeId': 143,
                                            'ControlId': 'DTAmbientTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_AmbientTemp",
                                        },
                                        //{
                                        //    'AttributeNodeId': 144,
                                        //    'ControlId': 'DTETDControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_ETD",
                                        //},
                                        {
                                            'Type': 'AdvanceDCValidationRuleMetaData',
                                            'DCValidationRule': '((oScope["AddlSectorControlId"].GetSelectedText() != "")&& (oScope["AddlSectorControlId"].GetSelectedText() != undefined))||((oScope["AddlFlightControlId"].GetSelectedText() != "")&& (oScope["AddlFlightControlId"].GetSelectedText() != undefined))||((oScope["AddlAirlineControlId"].GetSelectedText() !="")&& (oScope["AddlAirlineControlId"].GetSelectedText() != undefined))||((oScope["AddlFAndBControlId"].GetSelectedText() !="")&& (oScope["AddlFAndBControlId"].GetSelectedText() != undefined))',
                                            "ErrorMessageKey": "Mandatory_CustomerDetails",
                                        },
                                        //{
                                        //    'AttributeNodeId': 145,
                                        //    'ControlId': 'txtClassControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_Class",
                                        //},
                                         {
                                             'Type': 'AdvanceDCValidationRuleMetaData',
                                             'DCValidationRule': "((oScope['AddlSectorControlId'].GetSelectedText() != '')&& (oScope['AddlSectorControlId'].GetSelectedText() != undefined))||((oScope['AddlFlightControlId'].GetSelectedText() != '')&& (oScope['AddlFlightControlId'].GetSelectedText() != undefined))||((oScope['AddlAirlineControlId'].GetSelectedText() !='')&& (oScope['AddlAirlineControlId'].GetSelectedText() != undefined)) ? ((oScope['txtClassControlId'].GetSelectedText() != '')&& (oScope['txtClassControlId'].GetSelectedText() != undefined)) : true",
                                             "ErrorMessageKey": "Mandatory_Class",
                                         },
                                        {
                                            'AttributeNodeId': 146,
                                            'ControlId': 'DTStartingTimeInControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_StartingTimeIn",
                                        },
                                         {
                                             'AttributeNodeId': 147,
                                             'ControlId': 'StartingTempInControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_StartingTempIn",
                                         },
                                          {
                                              'AttributeNodeId': 148,
                                              'ControlId': 'DTFinishingTimeOutControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_FinishingTimeOut",
                                          },
                                           {
                                               'AttributeNodeId': 149,
                                               'ControlId': 'FinishingTempOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_FinishingTempOut",
                                           },
                                           {
                                               'AttributeNodeId': 151,
                                               'ControlId': 'txtNumOfMealsControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_NoofTray",
                                           }
                                    ]
                                }
                            }
                        }
                    ],
                    282: [
                        { // "282",//Temperature Verification Of Cold Meal Dishing
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 283,
                                        'ControlId': 'MealControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Product",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 283,
                                            'ControlId': 'MealControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_Product",
                                        },
                                           {
                                               'AttributeNodeId': 561,
                                               'ControlId': 'MealMealTypeControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_MealType",
                                           },
                                       
                                        //{
                                        //    'AttributeNodeId': 284,
                                        //    'ControlId': 'AddlAirlineControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_Airline",
                                        //},
                                        {
                                            'AttributeNodeId': 285,
                                            'ControlId': 'AmbientTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_AmbientTemp",
                                        },
                                        //{
                                        //    'AttributeNodeId': 286,
                                        //    'ControlId': 'DTETDControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_ETD",
                                        //},
                                        {
                                            'AttributeNodeId': 287,
                                            'ControlId': 'txtProcessControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_Process",
                                        },
                                        {
                                            'Type':'AdvanceDCValidationRuleMetaData',                                            
                                            'DCValidationRule': '((oScope["AddlSectorControlId"].GetSelectedText() != "")&& (oScope["AddlSectorControlId"].GetSelectedText() != undefined))||((oScope["AddlFlightControlId"].GetSelectedText() != "")&& (oScope["AddlFlightControlId"].GetSelectedText() != undefined))||((oScope["AddlAirlineControlId"].GetSelectedText() !="")&& (oScope["AddlAirlineControlId"].GetSelectedText() != undefined))||((oScope["AddlFAndBControlId"].GetSelectedText() !="")&& (oScope["AddlFAndBControlId"].GetSelectedText() != undefined))',
                                            "ErrorMessageKey": "Mandatory_CustomerDetails",
                                        },
                                        {
                                            'Type': 'AdvanceDCValidationRuleMetaData',
                                            'DCValidationRule': "((oScope['AddlSectorControlId'].GetSelectedText() != '')&& (oScope['AddlSectorControlId'].GetSelectedText() != undefined))||((oScope['AddlFlightControlId'].GetSelectedText() != '')&& (oScope['AddlFlightControlId'].GetSelectedText() != undefined))||((oScope['AddlAirlineControlId'].GetSelectedText() !='')&& (oScope['AddlAirlineControlId'].GetSelectedText() != undefined)) ? ((oScope['txtClassControlId'].GetSelectedText() != '')&& (oScope['txtClassControlId'].GetSelectedText() != undefined)) : true",
                                            "ErrorMessageKey": "Mandatory_Class",
                                        },
                                        {
                                            'AttributeNodeId': 288,
                                            'ControlId': 'TMStartingTimeInControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_StartingTimeIn",
                                        },
                                         {
                                             'AttributeNodeId': 289,
                                             'ControlId': 'StartingTempInControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_StartingTempIn",
                                         },
                                          {
                                              'AttributeNodeId': 290,
                                              'ControlId': 'TMFinishingTimeOutControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_FinishingTimeOut",
                                          },
                                           {
                                               'AttributeNodeId': 291,
                                               'ControlId': 'FinishingTempOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_FinishingTempOut",
                                           }
                                           //{
                                           //    'AttributeNodeId': 399,
                                           //    'ControlId': 'txtNumOfMealsControlId',
                                           //    "DefaultValue": "",
                                           //    "ErrorMessageKey": "Mandatory_NoofTray",
                                           //}
                                    ]
                                }
                            }
                        }
                    ],
                    293: [
                        { // "293",//Temperature Verification Of Aircraft Loading
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 294,
                                        'ControlId': 'AddlProductControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Product",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 294,
                                            'ControlId': 'AddlProductControlId',
                                            "DefaultValue": "0",
                                            "ErrorMessageKey": "Mandatory_Product",
                                        },
                                        {
                                            'AttributeNodeId': 295,
                                            'ControlId': 'txtClassControlId',
                                            "DefaultValue": "0",
                                            "ErrorMessageKey": "Mandatory_Class",
                                        },
                                        //{
                                        //    'AttributeNodeId': 296,
                                        //    'ControlId': 'AddlAirlineControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "",
                                        //},
                                        {
                                            'AttributeNodeId': 297,
                                            'ControlId': 'AmbientTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_AmbientTemp",
                                        },
                                        {
                                            'AttributeNodeId': 298,
                                            'ControlId': 'TMAircraftLoadingTimeControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_LoadingTime",
                                        },
                                        {
                                            'AttributeNodeId': 299,
                                            'ControlId': 'AircraftLoadingTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_LoadingTemp",
                                        },
                                        {
                                            'AttributeNodeId': 300,
                                            'ControlId': 'txtLoaderNoControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_LoaderNo",
                                        },
                                         {
                                             'AttributeNodeId': 301,
                                             'ControlId': 'chkRefriStatus',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_RefriStatus",
                                         },
                                          {
                                              'AttributeNodeId': 418,
                                              'ControlId': 'DTETDControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_ETD",
                                          },
                                          {
                                              'AttributeNodeId': 302,
                                              'ControlId': 'TempControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_TempControlId",
                                          }
                                    ]
                                }
                            }
                        }
                    ],

                    325: [
                        { // "325",//EKFC-2 Cooking and Blast chilling Monitoring
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 326,
                                        'ControlId': 'AddlProductControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Product",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 326,
                                            'ControlId': 'AddlProductControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_Product",
                                        },
                                        {
                                            'AttributeNodeId': 327,
                                            'ControlId': 'AddlProductTypeControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_ProductType",
                                        },
                                        {
                                            'Type': 'AdvanceDCValidationRuleMetaData',
                                            'DCValidationRule': '((oScope["AddlSectorControlId"].GetSelectedText() != "")&& (oScope["AddlSectorControlId"].GetSelectedText() != undefined))||((oScope["AddlFlightControlId"].GetSelectedText() != "")&& (oScope["AddlFlightControlId"].GetSelectedText() != undefined))||((oScope["AddlAirlineControlId"].GetSelectedText() !="")&& (oScope["AddlAirlineControlId"].GetSelectedText() != undefined))||((oScope["AddlFAndBControlId"].GetSelectedText() !="")&& (oScope["AddlFAndBControlId"].GetSelectedText() != undefined))',
                                            "ErrorMessageKey": "Mandatory_CustomerDetails",
                                        },
                                        //{
                                        //    'AttributeNodeId': 332,
                                        //    'ControlId': 'AddlAirlineControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_Airline",
                                        //},
                                        {
                                            'AttributeNodeId': 333,
                                            'ControlId': 'txtCoreTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_CoreTemp",
                                        },
                                        {
                                            'AttributeNodeId': 334,
                                            'ControlId': 'DTCookingTimeControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_CookingTime",
                                        },
                                        {
                                            'AttributeNodeId': 336,
                                            'ControlId': 'AddlBlastChillerNoControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_BlastChillerNo",
                                        },
                                         {
                                             'AttributeNodeId': 337,
                                             'ControlId': 'DTBlastChillerTimeInControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_BlastChillerTimeIn",
                                         },
                                          {
                                              'AttributeNodeId': 338,
                                              'ControlId': 'ATBlastChillerTempInControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_BlastChillerTempIn",
                                          },
                                           {
                                               'AttributeNodeId': 339,
                                               'ControlId': 'DTBlastChillerTimeOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_BlastChillerTimeOut",
                                           },
                                           {
                                               'AttributeNodeId': 340,
                                               'ControlId': 'ATBlastChillerTempOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_BlastChillerTempOut",
                                           }

                                    ]
                                }
                            }
                        }
                    ],

                    342: [
                        { // "342",//EKFC-2 Cooking and Blast chilling Verification
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 343,
                                        'ControlId': 'AddlProductControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Product",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 343,
                                            'ControlId': 'AddlProductControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_Product",
                                        },
                                        {
                                            'AttributeNodeId': 344,
                                            'ControlId': 'AddlProductTypeControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_ProductType",
                                        },
                                        {
                                            'Type': 'AdvanceDCValidationRuleMetaData',
                                            'DCValidationRule': '((oScope["AddlSectorControlId"].GetSelectedText() != "")&& (oScope["AddlSectorControlId"].GetSelectedText() != undefined))||((oScope["AddlFlightControlId"].GetSelectedText() != "")&& (oScope["AddlFlightControlId"].GetSelectedText() != undefined))||((oScope["AddlAirlineControlId"].GetSelectedText() !="")&& (oScope["AddlAirlineControlId"].GetSelectedText() != undefined))||((oScope["AddlFAndBControlId"].GetSelectedText() !="")&& (oScope["AddlFAndBControlId"].GetSelectedText() != undefined))',
                                            "ErrorMessageKey": "Mandatory_CustomerDetails",
                                        },
                                        //{
                                        //    'AttributeNodeId': 349,
                                        //    'ControlId': 'AddlAirlineControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_Airline",
                                        //},
                                        {
                                            'AttributeNodeId': 350,
                                            'ControlId': 'txtCoreTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_CoreTemp",
                                        },
                                        {
                                            'AttributeNodeId': 351,
                                            'ControlId': 'DTCookingTimeControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_CookingTime",
                                        },
                                        {
                                            'AttributeNodeId': 353,
                                            'ControlId': 'AddlBlastChillerNoControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_BlastChillerNo",
                                        },
                                         {
                                             'AttributeNodeId': 354,
                                             'ControlId': 'DTBlastChillerTimeInControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_BlastChillerTimeIn",
                                         },
                                          {
                                              'AttributeNodeId': 355,
                                              'ControlId': 'ATBlastChillerTempInControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_BlastChillerTempIn",
                                          },
                                           {
                                               'AttributeNodeId': 356,
                                               'ControlId': 'DTBlastChillerTimeOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_BlastChillerTimeOut",
                                           },
                                           {
                                               'AttributeNodeId': 357,
                                               'ControlId': 'ATBlastChillerTempOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_BlastChillerTempOut",
                                           }

                                    ]
                                }
                            }
                        }
                    ],

                    419: [
                        { // "411",//Sanitization Verification
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 420,
                                        'ControlId': 'AddlPlaceOfSample',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_PlaceSample",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 420,
                                            'ControlId': 'AddlPlaceOfSample',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_PlaceSample",
                                        },                                        
                                        {
                                            'AttributeNodeId': 421,
                                            'ControlId': 'txtProductSampled',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_ProductSampled",
                                        },
                                        {
                                            'AttributeNodeId': 422,
                                            'ControlId': 'DTStartingTimeInControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_StartingTime",
                                        },
                                        {
                                            'AttributeNodeId': 423,
                                            'ControlId': 'txtCl2StartTime',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_Cl2StartTime",
                                        },
                                         {
                                             'AttributeNodeId': 424,
                                             'ControlId': 'DTFinishingTimeOutControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_FinishingTimeOut",
                                         },
                                          {
                                              'AttributeNodeId': 425,
                                              'ControlId': 'txtCl2FinishTime',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_Cl2FinishTime",
                                          } 
                                    ]
                                }
                            }
                        }
                    ],
                    434: [
                       { // "5000",//StaffFoodTemperature
                           UserId: -1,  //all Users
                           DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                           DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                           MandatoryValidationMetaData: {
                               'Save': { //(OperationName) ex:Save,Submit 
                                   MandatoryElements: [{
                                       'AttributeNodeId': 435,
                                       'ControlId': 'AddlCanteen',
                                       "DefaultValue": "0",
                                       "ErrorMessageKey": "Mandatory_Canteen",
                                   }]
                               },
                               'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                   IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                   //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                   MandatoryElements: [
                                       {
                                           'AttributeNodeId': 435,
                                           'ControlId': 'AddlCanteen',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_Canteen",
                                       },
                                       {
                                           'AttributeNodeId': 475,
                                           'ControlId': 'txtNameOfMealControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_NameOfMeal",
                                       },                                       
                                       {
                                           'AttributeNodeId': 436,
                                           'ControlId': 'chkMeals',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_Meals",
                                       },                                      
                                        {
                                            'AttributeNodeId': 437,
                                            'ControlId': 'chkMealsType',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_MealsType",
                                        },
                                        {
                                            'AttributeNodeId': 439,
                                            'ControlId': 'ATFoodTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_FoodTemp",
                                        },
                                         {
                                             'AttributeNodeId': 438,
                                             'ControlId': 'DTStartingTimeInControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_Time",
                                         },
                                          {
                                              'AttributeNodeId': 440,
                                              'ControlId': 'ATBainMarieTempControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_BainMarieTemp",
                                          },

                                   ]
                               }
                           }
                       }
                    ],
                    442: [
                    { // "6000",//ChillerFreezerChecking
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                    'AttributeNodeId': 523,
                                    'ControlId': 'AddlDepartmentControlId',
                                    "DefaultValue": "0",
                                    "ErrorMessageKey": "Mandatory_Department",
                                }
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                     {
                                         'AttributeNodeId': 523,
                                         'ControlId': 'AddlDepartmentControlId',
                                         "DefaultValue": "0",
                                         "ErrorMessageKey": "Mandatory_Department",
                                     },
                                     {
                                         'AttributeNodeId': 524,
                                         'ControlId': 'AddlSectionControlId',
                                         "DefaultValue": "0",
                                         "ErrorMessageKey": "Mandatory_Section",
                                     },
                                    {
                                        'AttributeNodeId': 444,
                                        'ControlId': 'AddlLocation',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Location",
                                    },
                                    {
                                        'AttributeNodeId': 445,
                                        'ControlId': 'chkType',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Type",
                                    },
                                    {
                                        'Type': 'AdvanceDCValidationRuleMetaData',
                                        'DCValidationRule': '((oScope["chkType"].GetSelectedText() != "")&& (oScope["chkType"].GetSelectedText() != undefined)) &&((oScope["chkType"].GetSelectedValue() == 18 && oScope["AddlMachineChiller"].GetSelectedText() !="" && oScope["AddlMachineChiller"].GetSelectedText() !=undefined) || (oScope["chkType"].GetSelectedValue() == 19 && oScope["AddlMachineFreezer"].GetSelectedText() !="" && oScope["AddlMachineFreezer"].GetSelectedText() !=undefined))',
                                        "ErrorMessageKey": "Mandatory_Machine",
                                    },
                                    //{
                                    //    'AttributeNodeId': 446,
                                    //    'ControlId': 'AddlMachine',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_Machine",
                                    //},
                                    {
                                        'AttributeNodeId': 447,
                                        'ControlId': 'DTStartingTimeInControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_TimeChecked",
                                    },
                                     {
                                         'AttributeNodeId': 448,
                                         'ControlId': 'ATGaugeTempControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_GaugeTemp",
                                     },
                                      {
                                          'AttributeNodeId': 449,
                                          'ControlId': 'ATAirProbeTempControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_AirProbeTemp",
                                      },
                                      //{
                                      //    'AttributeNodeId': 450,
                                      //    'ControlId': 'ATVariationinTempControlId',
                                      //    "DefaultValue": "",
                                      //    "ErrorMessageKey": "Mandatory_VariationinTemp",
                                      //},

                                ]
                            }
                        }
                    },
                    ],
                    483: [
                    { // "6000",//ChillerFreezerChecking
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 485,
                                        'ControlId': 'AddlUnitControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Unit",
                                    },
                                    {
                                        'AttributeNodeId': 490,
                                        'ControlId': 'AddlObservationTypeControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_ObservationType",
                                    }
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 485,
                                        'ControlId': 'AddlUnitControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Unit",
                                    },
                                    {
                                        'AttributeNodeId': 490,
                                        'ControlId': 'AddlObservationTypeControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_ObservationType",
                                    },
                                    //{
                                    //    'AttributeNodeId': 493,
                                    //    'ControlId': 'chkRiskTypeControlId',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_RiskType",
                                    //},
                                ]
                            }
                        }
                    },
                    ],
                    463: [
                        { // "463",// MEALS DISPATCH TEMPERATURE LOG
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 465,
                                        'ControlId': 'AddlLocation',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Location",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 465,
                                            'ControlId': 'AddlLocation',
                                            "DefaultValue": "0",
                                            "ErrorMessageKey": "Mandatory_Location",
                                        },
                                        {
                                            'AttributeNodeId': 466,
                                            'ControlId': 'txtProductControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_Product",
                                        },
                                        {
                                            'AttributeNodeId': 467,
                                            'ControlId': 'chkProductType',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_ProductType",
                                        },
                                        {
                                            'AttributeNodeId': 468,
                                            'ControlId': 'DTStartingTimeInControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_Time",
                                        },
                                         {
                                             'AttributeNodeId': 469,
                                             'ControlId': 'ATTempControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_Temp",
                                         },
                                          {
                                              'AttributeNodeId': 471,
                                              'ControlId': 'txtVehicleNoControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_VehicleNo",
                                          },
                                          {
                                              'AttributeNodeId': 472,
                                              'ControlId': 'ATVehTempControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_VehTemp",
                                          },
                                           {
                                               'AttributeNodeId': 473,
                                               'ControlId': 'DTMovingTimenControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_MovingTime",
                                           }
                                    ]
                                }
                            }
                        }
                    ],
                    452: [
                      { // "452",// Dispatch Temperature Verification of Food Products EKFC to EKFC - Rev 
                          UserId: -1,  //all Users
                          DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                          DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                          MandatoryValidationMetaData: {
                              'Save': { //(OperationName) ex:Save,Submit 
                                  MandatoryElements: [{
                                      'AttributeNodeId': 454,
                                      'ControlId': 'AddlProduct',
                                      "DefaultValue": "0",
                                      "ErrorMessageKey": "Mandatory_Product",
                                  }]
                              },
                              'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                  IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                  //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                  MandatoryElements: [
                                      {
                                          'AttributeNodeId': 454,
                                          'ControlId': 'AddlProduct',
                                          "DefaultValue": "0",
                                          "ErrorMessageKey": "Mandatory_Product",
                                      },
                                      {
                                          'AttributeNodeId': 457,
                                          'ControlId': 'txtVehicleRegNoControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_VehicleRegNo",
                                      },
                                        {
                                            'AttributeNodeId': 459,
                                            'ControlId': 'ATVehicleTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_VehicleTemp",
                                        },
                                      {
                                          'AttributeNodeId': 456,
                                          'ControlId': 'ATLoadingTempControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_LoadingTemp",
                                      },
                                      {
                                          'AttributeNodeId': 455,
                                          'ControlId': 'DTLoadingTimeControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_LoadingTime",
                                      },
                                       {
                                           'AttributeNodeId': 458,
                                           'ControlId': 'chkRefrigerationStatus',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_RefrigerationStatus",
                                       },
                                         {
                                             'AttributeNodeId': 950,
                                             'ControlId': 'ATOffVehicleTempControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_OffVehicleTemp",
                                         },
                                        {
                                            'AttributeNodeId': 461,
                                            'ControlId': 'ATOffLoadingTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_OffLoadingTemp",
                                        },
                                         {
                                             'AttributeNodeId': 460,
                                             'ControlId': 'DTOffLoadingTimeControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_OffLoadingTime",
                                         }
                                  ]
                              }
                          }
                      }
                    ],
                    528: [
                     { // "528",// Free Chlorine Check
                         UserId: -1,  //all Users
                         DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                         DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                         MandatoryValidationMetaData: {
                             'Save': { //(OperationName) ex:Save,Submit 
                                 MandatoryElements: [{
                                     'AttributeNodeId': 530,
                                     'ControlId': 'AddlSamplingPoint',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_SamplingPoint",
                                 }]
                             },
                             'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                 IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                 //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                 MandatoryElements: [
                                     {
                                         'AttributeNodeId': 530,
                                         'ControlId': 'AddlSamplingPoint',
                                         "DefaultValue": "0",
                                         "ErrorMessageKey": "Mandatory_SamplingPoint",
                                     },
                                     {
                                         'AttributeNodeId': 531,
                                         'ControlId': 'DTStartingTimeInControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_Time",
                                     },
                                     
                                     {
                                         'AttributeNodeId': 532,
                                         'ControlId': 'txtFreeChlorineLevelControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_FreeChlorineLevel",
                                     },                                     
                                 ]
                             }
                         }
                     }
                    ],
                    535: [
                    { // "535",// potwash,trolly wash,dishwash
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                    'AttributeNodeId': 537,
                                    'ControlId': 'chkWashType',
                                    "DefaultValue": "",
                                    "ErrorMessageKey": "Mandatory_WashType",
                                    },
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 537,
                                        'ControlId': 'chkWashType',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_WashType",
                                    },
                                    //{
                                    //    'AttributeNodeId': 538,
                                    //    'ControlId': 'AddlPotMachineControlId',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_PotMachineNumber",
                                    //},
                                    //{
                                    //    'AttributeNodeId': 539,
                                    //    'ControlId': 'AddlTrolleyMachineControlId',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_TrolleyMachineNumber",
                                    //},
                                    //{
                                    //    'AttributeNodeId': 540,
                                    //    'ControlId': 'AddlDishwashMachineControlId',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_DishwashMachineNumber",
                                    //},
                                    {
                                        'AttributeNodeId': 541,
                                        'ControlId': 'DTTimeControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Time",
                                    },
                                    //{
                                    //    'AttributeNodeId': 542,
                                    //    'ControlId': 'txtFinalRinseControlId',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_FinalRinse",
                                    //},
                                    //{
                                    //    'AttributeNodeId': 543,
                                    //    'ControlId': 'chkTestType',
                                    //     "DefaultValue": "",
                                    //     "ErrorMessageKey": "Mandatory_TestType",
                                    //},
                                    //{
                                    //    'AttributeNodeId': 544,
                                    //    'ControlId': 'chkThermoLabel',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_ThermoLabel",
                                    //},
                                    //{
                                    //    'AttributeNodeId': 545,
                                    //    'ControlId': 'txtQuadTestControlId',
                                    //     "DefaultValue": "",
                                    //     "ErrorMessageKey": "Mandatory_QuadTest",
                                    //},
                                    //{
                                    //    'AttributeNodeId': 546,
                                    //    'ControlId': 'txtChlorineTestControlId',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_ChlorineTest",
                                    //},
                                ]
                            }
                        }
                    }
                    ],
                    563: [
                    { // "563",// Access Control Register -Rev 0 - (ML-FRM- 011)
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                    'AttributeNodeId': 565,
                                    'ControlId': 'DTDateControlId',
                                    "DefaultValue": "0",
                                    "ErrorMessageKey": "Mandatory_Date",
                                    },
                                    {
                                            'AttributeNodeId': 566,
                                    'ControlId': 'txtNameControlID',
                                    "DefaultValue": "",
                                    "ErrorMessageKey": "Mandatory_Name",
                                    }
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 565,
                                        'ControlId': 'DTDateControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Date",
                                    },
                                    {
                                        'AttributeNodeId': 566,
                                        'ControlId': 'txtNameControlID',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Name",
                                    },
                                    {
                                        'AttributeNodeId': 567,
                                        'ControlId': 'txtPositionControlID',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Position",
                                    },
                                    {
                                        'AttributeNodeId': 568,
                                        'ControlId': 'txtCompanyControlID',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Company",
                                    },
                                    {
                                        'AttributeNodeId': 570,
                                        'ControlId': 'txtPurposeOfVisitOrEntryControlID',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_PurposeOfVisitOrEntry",
                                    },
                                    {
                                        'AttributeNodeId': 571,
                                        'ControlId': 'DTTimeInControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_TimeIn",
                                    },
                                    {
                                        'AttributeNodeId': 572,
                                        'ControlId': 'DTTimeOutControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_TimeOut",
                                    },
                                    //{
                                    //    'AttributeNodeId': 573,
                                    //    'ControlId': 'DCSignature',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_Signature",
                                    //},
                                ]
                            }
                        }
                    }
                    ],
                    720: [
                    { // "720",// UV Lamp Life Monitoring
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 722,
                                        'ControlId': 'txtHoursOperatedControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_HoursOperated",
                                    }                                    
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 722,
                                        'ControlId': 'txtHoursOperatedControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_HoursOperated",
                                    }, 
                                    {
                                        'AttributeNodeId': 723,
                                        'ControlId': 'txtHoursRemainingControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_HoursRemaining",
                                    },                                    
                                    //{
                                    //    'AttributeNodeId': 573,
                                    //    'ControlId': 'DCSignature',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_Signature",
                                    //},
                                ]
                            }
                        }
                    }
                    ],
                    620: [
                    { // "620",// Media Preparation Report-Rev 1 - (ML-FRM- 016)
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 622,
                                        'ControlId': 'chkTypeofMedia',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_TypeofMedia",
                                    }
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                   {
                                       'AttributeNodeId': 622,
                                       'ControlId': 'chkTypeofMedia',
                                       "DefaultValue": "",
                                       "ErrorMessageKey": "Mandatory_TypeofMedia",
                                   },
                                    {
                                        'AttributeNodeId': 625,
                                        'ControlId': 'txtBrandNameControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_BrandName",
                                    },
                                    {
                                        'AttributeNodeId': 626,
                                        'ControlId': 'DTDateofExpiryControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_DateofExpiry",
                                    },
                                    {
                                        'AttributeNodeId': 628,
                                        'ControlId': 'txtQuantityusedControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Quantityused",
                                    },
                                    {
                                        'AttributeNodeId': 629,
                                        'ControlId': 'txtVolumeofMediaordiluentpreparedControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_VolumeofMedia",
                                    },
                                    {
                                        'AttributeNodeId': 631,
                                        'ControlId': 'txtActualPHControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_ActualPH",
                                    },
                                    {
                                        'AttributeNodeId': 632,
                                        'ControlId': 'txtMeasuredPHControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_MeasuredPH",
                                    }
                                ]
                            }
                        }
                    }
                    ],
                    609: [
                    { // "609",// Laminar Air Flow Monitoring-Rev 1 - (ML-FRM- 010)
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 611,
                                        'ControlId': 'chkTestMethod',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_TestMethod",
                                    },
                                    {
                                        'AttributeNodeId': 612,
                                        'ControlId': 'chkMediaUsed',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Mediaused",
                                    }
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                   {
                                       'AttributeNodeId': 611,
                                       'ControlId': 'chkTestMethod',
                                       "DefaultValue": "",
                                       "ErrorMessageKey": "Mandatory_TestMethod",
                                   },
                                    {
                                        'AttributeNodeId': 612,
                                        'ControlId': 'chkMediaUsed',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Mediaused",
                                    },
                                    {
                                        'AttributeNodeId': 613,
                                        'ControlId': 'DTExposureStartTimeControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_ExposureStartTime",
                                    },
                                    {
                                        'AttributeNodeId': 614,
                                        'ControlId': 'DTExposureEndTimeControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_ExposureEndTime",
                                    },
                                    {
                                        'AttributeNodeId': 615,
                                        'ControlId': 'DTExposureTimeControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_ExposureTime",
                                    },
                                    {
                                        'AttributeNodeId': 617,
                                        'ControlId': 'ATIncubationTempControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_IncubationTemp",
                                    },
                                    //{
                                    //    'AttributeNodeId': 616,
                                    //    'ControlId': 'DTIncubationTimeControlId',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_IncubationTime",
                                    //},
                                    {
                                        'AttributeNodeId': 618,
                                        'ControlId': 'txtColonyCountControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_ColonyCount",
                                    },
                                    {
                                        'AttributeNodeId': 1000,
                                        'ControlId': 'txtResultControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Result",
                                    }
                                ]
                            }
                        }
                    }
                    ],
                    634: [
                    { // "634",// Monthly Verification of Weighing Balance- Rev 1 - ML-FRM- 018
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 636,
                                        'ControlId': 'AddlBalanceNameControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_BalanceName",
                                    },
                                    {
                                        'AttributeNodeId': 637,
                                        'ControlId': 'AddlBalanceNumberControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_BalanceNumber",
                                    }
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 636,
                                        'ControlId': 'AddlBalanceNameControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_BalanceName",
                                    },
                                    {
                                        'AttributeNodeId': 637,
                                        'ControlId': 'AddlBalanceNumberControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_BalanceNumber",
                                    },
                                   {
                                       'AttributeNodeId': 639,
                                       'ControlId': 'txt5gmObservedvalueControlId',
                                       "DefaultValue": "",
                                       "ErrorMessageKey": "Mandatory_5gmObservedvalue",
                                   },
                                    {
                                        'AttributeNodeId': 640,
                                        'ControlId': 'txt5gmCorrectionControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_5gmCorrection",
                                    },
                                    {
                                        'AttributeNodeId': 641,
                                        'ControlId': 'txt5gmUnitofReferenceControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_5gmUnitofReference",
                                    },
                                    {
                                        'AttributeNodeId': 642,
                                        'ControlId': 'txt20gmObservedvalueControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_20gmObservedvalue",
                                    },
                                    {
                                        'AttributeNodeId': 643,
                                        'ControlId': 'txt20gmCorrectionControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_20gmCorrection",
                                    },
                                     {
                                         'AttributeNodeId': 644,
                                         'ControlId': 'txt20gmUnitofReferenceControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_20gmUnitofReference",
                                     },
                                    {
                                        'AttributeNodeId': 645,
                                        'ControlId': 'txt50gmObservedvalueControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_50gmObservedvalue",
                                    },
                                    {
                                        'AttributeNodeId': 646,
                                        'ControlId': 'txt50gmCorrectionControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_50gmCorrection",
                                    },
                                     {
                                         'AttributeNodeId': 647,
                                         'ControlId': 'txt50gmUnitofReferenceControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_50gmUnitofReference",
                                     },
                                     {
                                         'AttributeNodeId': 648,
                                         'ControlId': 'txt200gmObservedvalueControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_200gmObservedvalue",
                                     },
                                    {
                                        'AttributeNodeId': 649,
                                        'ControlId': 'txt200gmCorrectionControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_200gmCorrection",
                                    },
                                    {
                                        'AttributeNodeId': 650,
                                        'ControlId': 'txt200gmUnitofReferenceControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_200gmUnitofReference",
                                    }
                                ]
                            }
                        }
                    }
                    ],
                    711: [
                    { // "634",// Temperature Monitoring Report of Lab Equipment- Rev 1 - (ML-FRM- 017)
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 713,
                                        'ControlId': 'AddlEquipmentNameControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_EquipmentName",
                                    },
                                    {
                                        'AttributeNodeId': 714,
                                        'ControlId': 'AddlEquipmentNumberControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_EquipmentNumber",
                                    }
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                   // {
                                   //     'AttributeNodeId': 713,
                                   //     'ControlId': 'AddlEquipmentNameControlId',
                                   //     "DefaultValue": "0",
                                   //     "ErrorMessageKey": "Mandatory_EquipmentName",
                                   // },
                                   // {
                                   //     'AttributeNodeId': 714,
                                   //     'ControlId': 'AddlEquipmentNumberControlId',
                                   //     "DefaultValue": "0",
                                   //     "ErrorMessageKey": "Mandatory_EquipmentNumber",
                                   // },
                                   // {
                                   //     'AttributeNodeId': 716,
                                   //     'ControlId': 'DTTimeControlId',
                                   //     "DefaultValue": "0",
                                   //     "ErrorMessageKey": "Mandatory_Time",
                                   // },
                                   // {
                                   //     'AttributeNodeId': 717,
                                   //     'ControlId': 'ATObservedTempControlId',
                                   //     "DefaultValue": "0",
                                   //     "ErrorMessageKey": "Mandatory_ObservedTemp",
                                   // },
                                   // {
                                   //     'AttributeNodeId': 10338,
                                   //     'ControlId': 'ATMaxObservedTempControlId',
                                   //     "DefaultValue": "0",
                                   //     "ErrorMessageKey": "Mandatory_MaxObservedTemp",
                                   // },
                                   //{
                                   //    'AttributeNodeId': 718,
                                   //    'ControlId': 'ATMeasuredTempControlId',
                                   //    "DefaultValue": "",
                                   //    "ErrorMessageKey": "Mandatory_MeasuredTemp",
                                   //}                                    
                                ]
                            }
                        }
                    }
                    ],
                    704: [
                    { // "704",// Temperature and Humidity Monitoring Report- Rev 1 - (ML-FRM- 009)
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 706,
                                        'ControlId': 'ATAmbientTempControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_AmbientTemperature",
                                    }                                    
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                     {
                                        'AttributeNodeId': 706,
                                        'ControlId': 'ATAmbientTempControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_AmbientTemperature",
                                    },  
                                    {
                                        'AttributeNodeId': 707,
                                        'ControlId': 'DTTimeControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_Time",
                                    },
                                    {
                                        'AttributeNodeId': 709,
                                        'ControlId': 'txtHumidityControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Humidity",
                                    }                                    
                                ]
                            }
                        }
                    }
                    ],

                    666: [
                   { // "666",//  Quality Check For Newly Purchased Media – Rev 1- ML-FRM-020
                       UserId: -1,  //all Users
                       DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                       DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                       MandatoryValidationMetaData: {
                           'Save': { //(OperationName) ex:Save,Submit 
                               MandatoryElements: [
                                   {
                                       'AttributeNodeId': 668,
                                       'ControlId': 'txtNameofMediaControlId',
                                       "DefaultValue": "",
                                       "ErrorMessageKey": "Mandatory_NameofMedia",
                                   }
                               ]
                           },
                           'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                               IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                               //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                               MandatoryElements: [
                                    {
                                        'AttributeNodeId': 668,
                                        'ControlId': 'txtNameofMediaControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_NameofMedia",
                                    },
                                   {
                                       'AttributeNodeId': 669,
                                       'ControlId': 'DTReceivedDateControlId',
                                       "DefaultValue": "",
                                       "ErrorMessageKey": "Mandatory_ReceivedDate",
                                   },
                                   {
                                       'AttributeNodeId': 670,
                                       'ControlId': 'txtBatchNumberControlId',
                                       "DefaultValue": "0",
                                       "ErrorMessageKey": "Mandatory_BatchNumber",
                                   },
                                      {
                                          'AttributeNodeId': 672,
                                          'ControlId': 'DTDateofAnalysisControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_DateofAnalysis",
                                      },
                                    {
                                       'AttributeNodeId': 673,
                                       'ControlId': 'txtQCorganismControlId',
                                       "DefaultValue": "0",
                                       "ErrorMessageKey": "Mandatory_QCorganism",
                                   },
                                  //{
                                  //     'AttributeNodeId': 674,
                                  //     'ControlId': 'ATIncubationTempControlId',
                                  //     "DefaultValue": "0",
                                  //     "ErrorMessageKey": "Mandatory_IncubationTemp",
                                  // },
                                    //{
                                    // 'AttributeNodeId': 675,
                                    //'ControlId': 'DTIncubationTimeControlId',
                                    //"DefaultValue": "0",
                                    //"ErrorMessageKey": "Mandatory_IncubationTime",
                                    // },
                                    {
                                        'AttributeNodeId': 675,
                                        'ControlId': 'txtBrandNameControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_BrandName",
                                    },
                                    {
                                    'AttributeNodeId': 677,
                                    'ControlId': 'txtEndpointdetailsTestControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_EndpointdetailsTest",
                                     },
                                       {
                                     'AttributeNodeId': 678,
                                     'ControlId': 'txtEndpointdetailsControlControlId',
                                    "DefaultValue": "0",
                                    "ErrorMessageKey": "Mandatory_EndpointdetailsControl",
                                    },
                                       {
                                     'AttributeNodeId': 680,
                                     'ControlId': 'txtAbsoluteGrowthTestControlId',
                                    "DefaultValue": "0",
                                    "ErrorMessageKey": "Mandatory_AbsoluteGrowthTest",
                                       },

                                        {
                                            'AttributeNodeId': 681,
                                            'ControlId': 'txtAbsoluteGrowthControlControlId',
                                            "DefaultValue": "0",
                                            "ErrorMessageKey": "Mandatory_AbsoluteGrowthControl",

                                        },
                                        {
                                            'AttributeNodeId': 683,
                                            'ControlId': 'txtRelativeGrowthIndexControlId',
                                            "DefaultValue": "0",
                                            "ErrorMessageKey": "Mandatory_RelativeGrowthIndex",

                                        },
                            
                               ]
                           }
                       }
                   }
                    ],

                    725: [
                  { // "725",// Weighing Balance Daily Verification Record- Rev 0 - (ML-FRM- 037)
                      UserId: -1,  //all Users
                      DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                      DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                      MandatoryValidationMetaData: {
                          'Save': { //(OperationName) ex:Save,Submit 
                              MandatoryElements: [
                                  {
                                      'AttributeNodeId': 728,
                                      'ControlId': 'AddlEquipmentNumberControlId',
                                      "DefaultValue": "0",
                                      "ErrorMessageKey": "Mandatory_EquipmentNumber",
                                  },
                                  {
                                      'AttributeNodeId': 727,
                                      'ControlId': 'AddlEquipmentNameControlId',
                                      "DefaultValue": "0",
                                      "ErrorMessageKey": "Mandatory_EquipmentName",
                                  }
                              ]
                          },
                          'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                              IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                              //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                              MandatoryElements: [
                                   {
                                       'AttributeNodeId': 728,
                                       'ControlId': 'AddlEquipmentNumberControlId',
                                       "DefaultValue": "0",
                                       "ErrorMessageKey": "Mandatory_EquipmentNumber",
                                   },
                                   {
                                       'AttributeNodeId': 727,
                                       'ControlId': 'AddlEquipmentNameControlId',
                                       "DefaultValue": "0",
                                       "ErrorMessageKey": "Mandatory_EquipmentName",
                                   },                                   
                                  {
                                      'AttributeNodeId':730,
                                      'ControlId': 'txt5gmObservedvalueControlId',
                                      "DefaultValue": "",
                                      "ErrorMessageKey": "Mandatory_5gmObservedvalue",
                                  },
                                  {
                                      'AttributeNodeId': 731,
                                      'ControlId': 'txt5gmCorrectionControlId',
                                      "DefaultValue": "",
                                      "ErrorMessageKey": "Mandatory_5gmCorrection",
                                  },
                                   {
                                       'AttributeNodeId': 732,
                                       'ControlId': 'txt5gmUnitofReferenceControlId',
                                       "DefaultValue": "",
                                       "ErrorMessageKey": "Mandatory_5gmUnitofReference",
                                   },
                                   {
                                        'AttributeNodeId':733 ,
                                        'ControlId': 'txt20gmObservedvalueControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_20gmObservedvalue",
                                   },
                                   {
                                         'AttributeNodeId':734,
                                         'ControlId': 'txt20gmCorrectionControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_20gmCorrection",
                                   },
                                   {
                                          'AttributeNodeId': 735,
                                          'ControlId': 'txt20gmUnitofReferenceControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_20gmUnitofReference",
                                   },
                                  // {
                                  //         'AttributeNodeId': 737,
                                  //         'ControlId': 'DCSignature',
                                  //         "DefaultValue": "",
                                  //         "ErrorMessageKey": "Mandatory_Signature",
                                  //},
                              ]
                          }
                      }
                   }
                    ],
                    575: [
                 { // "575",// Master List of Microbiology Laboratory Equipment Calibration and Maintenance Status- Rev 1 - (ML-REF- 007)
                     UserId: -1,  //all Users
                     DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                     DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                     MandatoryValidationMetaData: {
                         'Save': { //(OperationName) ex:Save,Submit 
                             MandatoryElements: [
                                 {
                                     'AttributeNodeId': 577,
                                     'ControlId': 'AddlEquipmentNameControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_EquipmentName",
                                 },
                                 {
                                     'AttributeNodeId': 578,
                                     'ControlId': 'AddlEquipmentCodeControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_EquipmentCode",
                                 }
                             ]
                         },
                         'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                             IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                             //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                             MandatoryElements: [
                                   {
                                       'AttributeNodeId': 577,
                                       'ControlId': 'AddlEquipmentNameControlId',
                                       "DefaultValue": "0",
                                       "ErrorMessageKey": "Mandatory_EquipmentName",
                                   },
                                 {
                                     'AttributeNodeId': 578,
                                     'ControlId': 'AddlEquipmentCodeControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_EquipmentCode",
                                 },     
                                 {
                                     'AttributeNodeId':579,
                                     'ControlId': 'chkExternalCaliberation',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_ExternalCaliberation",
                                 },
                                 {
                                     'AttributeNodeId': 581,
                                     'ControlId': 'txtServiceProviderControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_ ServiceProvider",
                                 },
                                  {
                                      'AttributeNodeId': 582,
                                      'ControlId': 'DTCaliberationDueDateControlId',
                                      "DefaultValue": "",
                                      "ErrorMessageKey": "Mandatory_CaliberationDueDate",
                                  },
                                  {
                                      'AttributeNodeId':584 ,
                                      'ControlId': 'chkInternalCaliberation',
                                      "DefaultValue": "",
                                      "ErrorMessageKey": "Mandatory_InternalCaliberation",
                                  },
                                  {
                                      'AttributeNodeId':586,
                                      'ControlId': 'chkPreventionMaintanence',
                                      "DefaultValue": "",
                                      "ErrorMessageKey": "Mandatory_Prevention Maintanence",
                                  },
                                  {
                                      'AttributeNodeId': 589,
                                      'ControlId': 'txtServiceProviderControlId',
                                      "DefaultValue": "",
                                      "ErrorMessageKey": "Mandatory_ServiceProvider1",
                                  },
                                 // {
                                 //         'AttributeNodeId': 737,
                                 //         'ControlId': 'DCSignature',
                                 //         "DefaultValue": "",
                                 //         "ErrorMessageKey": "Mandatory_Signature",
                                 //},
                             ]
                         }
                     }
                 }
                    ],
                    653: [
                    { // "653",// pHMeterCalibrationRecords
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 655,
                                        'ControlId': 'AddlEquipmentNameControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_EquipmentName",
                                    }
                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                     {
                                         'AttributeNodeId': 655,
                                         'ControlId': 'AddlEquipmentNameControlId',
                                         "DefaultValue": "0",
                                         "ErrorMessageKey": "Mandatory_EquipmentName",
                                     },
                                    {
                                        'AttributeNodeId': 656,
                                        'ControlId': 'AddlEquipmentNumberControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_EquipmentNumber",
                                    },
                                    {
                                        'AttributeNodeId': 658,
                                        'ControlId': 'txt7ObservedvalueControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_7Observedvalue",
                                    },
                                    {
                                        'AttributeNodeId': 659,
                                        'ControlId': 'txt7CorrectionControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_7Correction",
                                    },
                                    {
                                        'AttributeNodeId': 660,
                                        'ControlId': 'txt7UnitofReferenceControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_7UnitofReference",
                                    },
                                    {
                                        'AttributeNodeId': 661,
                                        'ControlId': 'txt4ObservedvalueControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_4Observedvalue",
                                    },
                                    {
                                        'AttributeNodeId': 662,
                                        'ControlId': 'txt4CorrectionControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_4Correction",
                                    },
                                    {
                                        'AttributeNodeId': 663,
                                        'ControlId': 'txt4UnitofReferenceControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_4UnitofReference",
                                    },
                                    //{
                                    //    'AttributeNodeId': 665,
                                    //    'ControlId': 'DCSignature',
                                    //    "DefaultValue": "",
                                    //    "ErrorMessageKey": "Mandatory_Signature",
                                    //},
                                ]
                            }
                        }
                    }
                    ],
                    575: [
                   { // "575",// Master List of Microbiology Laboratory Equipment Calibration and Maintenance Status- Rev 1 - (ML-REF- 007)
                       UserId: -1,  //all Users
                       DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                       DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                       MandatoryValidationMetaData: {
                           'Save': { //(OperationName) ex:Save,Submit 
                               MandatoryElements: [
                                   {
                                       'AttributeNodeId': 577,
                                       'ControlId': 'AddlEquipmentNameControlId',
                                       "DefaultValue": "0",
                                       "ErrorMessageKey": "Mandatory_EquipmentName",
                                   }
                               ]
                           },
                           'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                               IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                               //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                               MandatoryElements: [
                                   // {
                                   //     'AttributeNodeId': 577,
                                   //     'ControlId': 'AddlEquipmentNameControlId',
                                   //     "DefaultValue": "0",
                                   //     "ErrorMessageKey": "Mandatory_EquipmentName",
                                   // },
                                   //{
                                   //    'AttributeNodeId': 578,
                                   //    'ControlId': 'AddlEquipmentCodeControlId',
                                   //    "DefaultValue": "",
                                   //    "ErrorMessageKey": "Mandatory_EquipmentCode",
                                   //},
                                   //{
                                   //    'AttributeNodeId': 584,
                                   //    'ControlId': 'chkInternalCaliberation',
                                   //    "DefaultValue": "",
                                   //    "ErrorMessageKey": "Mandatory_InternalCaliberation",
                                   //},
                                   //{
                                   //    'AttributeNodeId': 579,
                                   //    'ControlId': 'chkExternalCaliberation',
                                   //    "DefaultValue": "",
                                   //    "ErrorMessageKey": "Mandatory_ExternalCaliberation",
                                   //},
                                   ////{
                                   ////    'AttributeNodeId': 581,
                                   ////    'ControlId': 'txtECServiceProviderControlId',
                                   ////    "DefaultValue": "",
                                   ////    "ErrorMessageKey": "Mandatory_ECServiceProvider",
                                   ////},
                                   //{
                                   //    'AttributeNodeId': 586,
                                   //    'ControlId': 'chkPreventionMaintanence',
                                   //    "DefaultValue": "",
                                   //    "ErrorMessageKey": "Mandatory_PreventionMaintanence",
                                   //},
                                   ////{
                                   ////    'AttributeNodeId': 589,
                                   ////    'ControlId': 'txtPMServiceProviderControlId',
                                   ////    "DefaultValue": "",
                                   ////    "ErrorMessageKey": "Mandatory_PMServiceProvider",
                                   ////}                                   
                                  
                               ]
                           }
                       }
                   }
                    ],
                    686: [
                         { // " 686",//Reference Culture Maintainance Record-Rev 0 - (ML-FRM- 021)
                             UserId: -1,  //all Users
                             DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                             DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                             MandatoryValidationMetaData: {
                                 'Save': { //(OperationName) ex:Save,Submit 
                                     MandatoryElements: [
                                         {
                                             'AttributeNodeId': 688,
                                             'ControlId': 'txtNameofMasterCultureControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_NameofMasterCulture",
                                         }
                                     ]
                                 },
                                 'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                     IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                     //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                     MandatoryElements: [
                                          {
                                              'AttributeNodeId': 688,
                                              'ControlId': 'txtNameofMasterCultureControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_NameofMasterCulture",
                                          },
                                          {
                                              'AttributeNodeId': 689,
                                              'ControlId': 'DTDateofMCPControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_DateofMasterCulturepreparation",
                                          },
                                         {
                                             'AttributeNodeId': 690,
                                             'ControlId': 'DTDueDateofMCPControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_DueDateforMasterCultureprepared",
                                         },
                                         {
                                             'AttributeNodeId': 692,
                                             'ControlId': 'txtNameofStockCultureControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_NameofStockCulture",
                                         },
                                          {
                                              'AttributeNodeId': 693,
                                              'ControlId': 'DTDateofSCControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_DateOfStockCulture",
                                          },
                                          {
                                              'AttributeNodeId': 694,
                                              'ControlId': 'txtNoofStockPreparedControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_No.ofStockPrepared",
                                          },
                                          {
                                              'AttributeNodeId': 695,
                                              'ControlId': 'DTDueDateofSCControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_DueDateforStockCultureprepared",
                                          },
                                          {
                                              'AttributeNodeId': 697,
                                              'ControlId': 'txtNameofWorkingCultureControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_NameofWorkingCulture",
                                          },
                                         {
                                             'AttributeNodeId': 698,
                                             'ControlId': 'DTDateofWCControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_DateOfWorkingCulture",
                                         },
                                          {
                                              'AttributeNodeId': 699,
                                              'ControlId': 'txtNoofWorkingCulturePreparedControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_No.ofWorkingCulturePrepared",
                                          },
                                         {
                                             'AttributeNodeId': 700,
                                             'ControlId': 'DTDueDateofWCControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_DueDateforSubCulture",
                                         },
                                           //{
                                           //    'AttributeNodeId': 703,
                                           //    'ControlId': 'DCSignature',
                                           //    "DefaultValue": "",
                                           //    "ErrorMessageKey": "Mandatory_Signature",
                                           //},
                                     ]
                                 }
                             }
                         }
                    ],

                    591: [
                           { // "591",// Current Stock of Laboratory Media- Rev 0 - (ML-FRM- 041)
                               UserId: -1,  //all Users
                               DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                               DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                               MandatoryValidationMetaData: {
                                   'Save': { //(OperationName) ex:Save,Submit 
                                       MandatoryElements: [
                                           {
                                               'AttributeNodeId': 593,
                                               'ControlId': 'chkStocktype',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_Stocktype",
                                           }

                                       ]
                                   },
                                   'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                       IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                       //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                       MandatoryElements: [

                                            {
                                                'AttributeNodeId': 593,
                                                'ControlId': 'chkStocktype',
                                                "DefaultValue": "",
                                                "ErrorMessageKey": "Mandatory_Stocktype",
                                            },
                                           //  {
                                           //      'AttributeNodeId': 594,
                                           //      'ControlId': 'AddlParameterControlId',
                                           //      "DefaultValue": "0",
                                           //      "ErrorMessageKey": "Mandatory_Parameter",
                                           //  },
                                           //{
                                           //    'AttributeNodeId': 595,
                                           //    'ControlId': 'AddlMediaorReagentsControlId',
                                           //    "DefaultValue": "0",
                                           //    "ErrorMessageKey": "Mandatory_MediaorReagents",
                                           //},
                                           //{
                                           //    'AttributeNodeId': 596,
                                           //    'ControlId': 'AddlBrandNameControlId',
                                           //    "DefaultValue": "0",
                                           //    "ErrorMessageKey": "Mandatory_BrandName",
                                           //},
                                           // {
                                           //     'AttributeNodeId': 597,
                                           //     'ControlId': 'AddlGlasswareControlId',
                                           //     "DefaultValue": "0",
                                           //     "ErrorMessageKey": "Mandatory_Glassware",
                                           // },
                                            {
                                                'AttributeNodeId': 598,
                                                'ControlId': 'DTExpiryDateControlId',
                                                "DefaultValue": "",
                                                "ErrorMessageKey": "Mandatory_ExpiryDate",
                                            },
                                            {
                                                'AttributeNodeId': 600,
                                                'ControlId': 'txtQuantityAvailableControlId',
                                                "DefaultValue": "",
                                                "ErrorMessageKey": "Mandatory_QuantityAvailable",
                                            },
                                            {
                                                'AttributeNodeId': 601,
                                                'ControlId': 'AddlQuantityAvailableUnitControlId',
                                                "DefaultValue": "0",
                                                "ErrorMessageKey": "Mandatory_QuantityAvailableUnit",
                                            },
                                           {
                                               'AttributeNodeId': 602,
                                               'ControlId': 'txtReorderlevelControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_Reorderlevel",
                                           },
                                            {
                                                'AttributeNodeId': 603,
                                                'ControlId': 'AddlReorderlevelUnitControlId',
                                                "DefaultValue": "0",
                                                "ErrorMessageKey": "Mandatory_ReorderlevelUnit",
                                            },
                                              {
                                                  'AttributeNodeId': 604,
                                                  'ControlId': 'txt2MinimumtoOrderControlId',
                                                  "DefaultValue": "",
                                                  "ErrorMessageKey": "Mandatory_MinimumtoOrder",
                                              },
                                            {
                                                'AttributeNodeId': 605,
                                                'ControlId': 'AddlMinimumtoOrderUnitControlId',
                                                "DefaultValue": "0",
                                                "ErrorMessageKey": "Mandatory_MinimumtoOrderUnit",
                                            },
                                              {
                                                  'AttributeNodeId': 606,
                                                  'ControlId': 'txtPurchaserequestnumberControlId',
                                                  "DefaultValue": "",
                                                  "ErrorMessageKey": "Mandatory_Purchaserequestnumber",
                                              },
                                            {
                                                'AttributeNodeId': 607,
                                                'ControlId': 'DTDateofPurchseorderControlId',
                                                "DefaultValue": "",
                                                "ErrorMessageKey": "Mandatory_DateofPurchseorder",
                                            },
                                       ]
                                   }
                               }
                           }
                    ],

                    738: [
                      { // " 738",//TemplateID Yearly Verification Certificate for Probe Thermometer - Rev 1 - (HYG- 056)
                          UserId: -1,  //all Users
                          DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                          DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                          MandatoryValidationMetaData: {
                              'Save': { //(OperationName) ex:Save,Submit 
                                  MandatoryElements: [
                                      {
                                          'AttributeNodeId': 740,
                                          'ControlId': 'AddlDepartmentControlId',
                                          "DefaultValue": "0",
                                          "ErrorMessageKey": "Mandatory_Department",
                                      }

                                  ]
                              },
                              'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                  IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                  //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                  MandatoryElements: [
                                       {
                                           'AttributeNodeId': 740,
                                           'ControlId': 'AddlDepartmentControlId',
                                           "DefaultValue": "0",
                                           "ErrorMessageKey": "Mandatory_Department",
                                       },
                                       {
                                           'AttributeNodeId': 745,
                                           'ControlId': 'AddlThermometerCodeControlId',
                                           "DefaultValue": "0",
                                           "ErrorMessageKey": "Mandatory_ThermometerCode",
                                       },
                                       {
                                           'AttributeNodeId': 741,
                                           'ControlId': 'txtSectionControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_Section",
                                       },
                                      {
                                          'AttributeNodeId': 742,
                                          'ControlId': 'txtAllocationControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_Allocation",
                                      },
                                      //{
                                      //    'AttributeNodeId': 744,
                                      //    'ControlId': 'chkThermometerType',
                                      //    "DefaultValue": "",
                                      //    "ErrorMessageKey": "Mandatory_ThermometerType",
                                      //},
                                       
                                       {
                                           'AttributeNodeId': 746,
                                           'ControlId': 'AddlThermometerSerialNoControlId',
                                           "DefaultValue": "0",
                                           "ErrorMessageKey": "Mandatory_ThermometerSerialNumber",
                                       },
                                       {
                                           'AttributeNodeId': 747,
                                           'ControlId': 'AddlThermometerModelNoControlId',
                                           "DefaultValue": "0",
                                           "ErrorMessageKey": "Mandatory_ThermometerModelNo",
                                       },
                                       {
                                          'AttributeNodeId': 744,
                                          'ControlId': 'DTDDateOfCalibrationControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_DateOfCalibration",
                                       },
                                       {
                                           'AttributeNodeId': 3149,
                                           'ControlId': 'DTDueDateControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_DueDate",
                                       },
                                       /*
                                        {
                                            'AttributeNodeId': 750,
                                            'ControlId': 'txtICEStandardValueControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_ICEStandardValue",
                                        },
                                       {
                                           'AttributeNodeId': 751,
                                           'ControlId': 'txtICEObservedValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_ICEObservedValue",
                                       },
                                      {
                                          'AttributeNodeId': 752,
                                          'ControlId': 'txtICEDeviationValueControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_ICEDeviationValue",
                                      },
                                       {
                                           'AttributeNodeId': 754,
                                           'ControlId': 'txtValidatorStandardValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_ValidatorStandardValue",
                                       },

                                       {
                                           'AttributeNodeId': 755,
                                           'ControlId': 'ttxtValidatorObservedValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_ValidatorObservedValue",
                                       },
                                       {
                                           'AttributeNodeId': 756,
                                           'ControlId': 'txtValidatorDeviationValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_ValidatorDeviationValue",
                                       },
                                       */
                                         {
                                             'AttributeNodeId': 758,
                                             'ControlId': 'txtTestCap1RefNoControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_TestCap1TestCap1RefNo",
                                         },
                                       {
                                           'AttributeNodeId': 759,
                                           'ControlId': 'txtTestCap1StandardValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_TestCap1StandardValue",
                                       },

                                       {
                                           'AttributeNodeId': 760,
                                           'ControlId': 'txtTestCap1ObservedValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_TestCap1ObservedValue",
                                       },
                                       {
                                           'AttributeNodeId': 761,
                                           'ControlId': 'txtTestCap1DeviationValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_TestCap1DeviationValue",
                                       },
                                       {
                                           'AttributeNodeId': 763,
                                           'ControlId': 'txtTestCap2RefNoControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_TestCap2TestCapRefNo",
                                       },
                                       {
                                           'AttributeNodeId': 764,
                                           'ControlId': 'txtTestCap2StandardValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_TestCap2StandardValue",
                                       },

                                       {
                                           'AttributeNodeId': 765,
                                           'ControlId': 'txtTestCap2ObservedValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_TestCap2ObservedValue",
                                       },
                                       {
                                           'AttributeNodeId': 766,
                                           'ControlId': 'txtTestCap2DeviationValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_TestCap2DeviationValue",
                                       },
                                         {
                                             'AttributeNodeId': 768,
                                             'ControlId': 'txtTestCap3RefNoControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_TestCap3TestCapRefNo",
                                         },
                                       {
                                           'AttributeNodeId': 769,
                                           'ControlId': 'txtTestCap3StandardValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_TestCap3StandardValue",
                                       },

                                       {
                                           'AttributeNodeId': 770,
                                           'ControlId': 'txtTestCap3ObservedValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_TestCap3ObservedValue",
                                       },
                                       {
                                           'AttributeNodeId': 771,
                                           'ControlId': 'txtTestCap3DeviationValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_TestCap3DeviationValue",
                                       },
                                          {
                                              'AttributeNodeId': 773,
                                              'ControlId': 'txtBoilingWaterStandardValueControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_BoilingWaterStandardValue",
                                          },

                                       {
                                           'AttributeNodeId': 774,
                                           'ControlId': 'txtBoilingWaterObservedValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_BoilingWaterObservedValue",
                                       },
                                       {
                                           'AttributeNodeId': 775,
                                           'ControlId': 'txtBoilingWaterDeviationValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_BoilingWaterDeviationValue",
                                       }
                                      
                                  ]
                              }
                          }
                      }
                    ],

                    937: [
                      { // " 738",//Monthly Verification of IR Thermometer - Rev 0 - HYG- 094
                          UserId: -1,  //all Users
                          DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                          DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                          MandatoryValidationMetaData: {
                              'Save': { //(OperationName) ex:Save,Submit 
                                  MandatoryElements: [
                                      {
                                          'AttributeNodeId': 939,
                                          'ControlId': 'AddlDepartmentControlId',
                                          "DefaultValue": "0",
                                          "ErrorMessageKey": "Mandatory_Department",
                                      }

                                  ]
                              },
                              'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                  IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                  //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                  MandatoryElements: [
                                       {
                                           'AttributeNodeId': 939,
                                           'ControlId': 'AddlDepartmentControlId',
                                           "DefaultValue": "0",
                                           "ErrorMessageKey": "Mandatory_Department",
                                       },
                                       {
                                           'AttributeNodeId': 940,
                                           'ControlId': 'txtSectionControlId',
                                           "DefaultValue": "0",
                                           "ErrorMessageKey": "Mandatory_Section",
                                       },
                                      {
                                          'AttributeNodeId': 941,
                                          'ControlId': 'txtAllocationControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_Allocation",
                                      },
                                
                                       {
                                           'AttributeNodeId': 943,
                                           'ControlId': 'AddlThermometerCodeControlId',
                                           "DefaultValue": "0",
                                           "ErrorMessageKey": "Mandatory_ThermometerCode",
                                       },
                                       {
                                           'AttributeNodeId': 944,
                                           'ControlId': 'txtThermometerSerialNoControlId',
                                           "DefaultValue": "0",
                                           "ErrorMessageKey": "Mandatory_ThermometerSerialNumber",
                                       },
                                       {
                                           'AttributeNodeId': 945,
                                           'ControlId': 'txtThermometerModelNoControlId',
                                           "DefaultValue": "0",
                                           "ErrorMessageKey": "Mandatory_ThermometerModelNo",
                                       },
                                        {
                                            'AttributeNodeId': 8474,
                                            'ControlId': 'DTDDateOfCalibrationControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_DateOfCalibration",
                                        },

                                        {
                                            'AttributeNodeId': 947,
                                            'ControlId': 'txtICEStandardValueControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_ICEStandardValue",
                                        },
                                       {
                                           'AttributeNodeId': 948,
                                           'ControlId': 'txtICEObservedValueControlId',
                                           "DefaultValue": "",
                                           "ErrorMessageKey": "Mandatory_ICEObservedValue",
                                       },
                                      {
                                          'AttributeNodeId': 949,
                                          'ControlId': 'txtICEDeviationValueControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_ICEDeviationValue",
                                      },   
                                    
                                  ]
                              }
                          }
                      }
                    ],
 


                    923: [
                     { // " 923",//Monthly Verification of Probe Thermometer - Rev 0 - HYG- 093
                         UserId: -1,  //all Users
                         DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                         DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                         MandatoryValidationMetaData: {
                             'Save': { //(OperationName) ex:Save,Submit 
                                 MandatoryElements: [
                                     {
                                         'AttributeNodeId': 925,
                                         'ControlId': 'AddlDepartmentControlId',
                                         "DefaultValue": "0",
                                         "ErrorMessageKey": "Mandatory_Department",
                                     }

                                 ]
                             },
                             'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                 IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                 //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                 MandatoryElements: [
                                      {
                                          'AttributeNodeId': 925,
                                          'ControlId': 'AddlDepartmentControlId',
                                          "DefaultValue": "0",
                                          "ErrorMessageKey": "Mandatory_Department",
                                      },
                                      {
                                          'AttributeNodeId': 926,
                                          'ControlId': 'txtSectionControlId',
                                          "DefaultValue": "0",
                                          "ErrorMessageKey": "Mandatory_Section",
                                      },
                                     {
                                         'AttributeNodeId': 927,
                                         'ControlId': 'txtAllocationControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_Allocation",
                                     },
                                   
                                      {
                                          'AttributeNodeId': 929,
                                          'ControlId': 'AddlThermometerCodeControlId',
                                          "DefaultValue": "0",
                                          "ErrorMessageKey": "Mandatory_ThermometerCode",
                                      },
                                      {
                                          'AttributeNodeId': 930,
                                          'ControlId': 'txtThermometerSerialNoControlId',
                                          "DefaultValue": "0",
                                          "ErrorMessageKey": "Mandatory_ThermometerSerialNumber",
                                      },
                                      {
                                          'AttributeNodeId': 931,
                                          'ControlId': 'txtThermometerModelNoControlId',
                                          "DefaultValue": "0",
                                          "ErrorMessageKey": "Mandatory_ThermometerModelNo",
                                      },
                                      {
                                          'AttributeNodeId': 8473,
                                          'ControlId': 'DTDDateOfCalibrationControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_DateOfCalibration",
                                      },
                                    
                                     {
                                            'AttributeNodeId': 933,
                                            'ControlId': 'txtTestCap1RefNoControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_TestCap1TestCapRefNo",
                                     },
                                     {
                                          'AttributeNodeId': 934,
                                          'ControlId': 'txtTestCap1StandardValueControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_TestCap1StandardValue",
                                      },

                                      {
                                          'AttributeNodeId': 935,
                                          'ControlId': 'txtTestCap1ObservedValueControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_TestCap1ObservedValue",
                                      },
                                      {
                                          'AttributeNodeId': 936,
                                          'ControlId': 'txtTestCap1DeviationValueControlId',
                                          "DefaultValue": "",
                                          "ErrorMessageKey": "Mandatory_TestCap1DeviationValue",
                                      },
                                     

                                 ]
                             }
                         }
                     }
                    ],

                    1369: [
                   { // " 2500",//Sampling Sheet And Food Analysis
                       UserId: -1,  //all Users
                       DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                       DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                       MandatoryValidationMetaData: {
                           'Save': { //(OperationName) ex:Save,Submit 
                               MandatoryElements: [
                                   {
                                       'AttributeNodeId': 1375,
                                       'ControlId': 'txtSamplingNoControlId',
                                       "DefaultValue": "0",
                                       "ErrorMessageKey": "Mandatory_SamplingNo",
                                   }

                               ]
                           },
                           'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                               IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                               //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                               MandatoryElements: [
                                    {
                                        'AttributeNodeId': 1375,
                                        'ControlId': 'txtSamplingNoControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_SamplingNo",
                                    }


                               ]
                           }
                       }
                   }
                    ],

                    1529: [
                 { // " 1529",//Sampling Sheet And Water Analysis
                     UserId: -1,  //all Users
                     DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                     DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                     MandatoryValidationMetaData: {
                         'Save': { //(OperationName) ex:Save,Submit 
                             MandatoryElements: [
                                 {
                                     'AttributeNodeId': 1535,
                                     'ControlId': 'txtSamplingNoControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_SamplingNo",
                                 }
                                 /*
                                 {
                                     'AttributeNodeId': 1534,
                                     'ControlId': 'txtSamplingMethodControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_SamplingMethod",
                                 },
                                 {
                                     'AttributeNodeId': 1536,
                                     'ControlId': 'txtSamplingDescriptionControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_SamplingDescription",
                                 },
                                 {
                                     'AttributeNodeId': 1537,
                                     'ControlId': 'AddlUnitControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_Unit",
                                 },
                                 {
                                     'AttributeNodeId': 1538,
                                     'ControlId': 'AddlDepartmentControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_Department",
                                 },
                                 {
                                     'AttributeNodeId': 1539,
                                     'ControlId': 'AddlSectionControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_Section",
                                 },
                                 {
                                     'AttributeNodeId': 1540,
                                     'ControlId': 'AddlLocationControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_Location",
                                 },
                                 {
                                     'AttributeNodeId': 4000,
                                     'ControlId': 'AddlSectorControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_SampleSector",
                                 },
                                 {
                                     'AttributeNodeId': 4001,
                                     'ControlId': 'AddlAirlineControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_Airline",
                                 },
                                 {
                                     'AttributeNodeId': 4002,
                                     'ControlId': 'AddlClassControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_Class",
                                 },
                                 {
                                     'AttributeNodeId': 1544,
                                     'ControlId': 'ATSampleCollectionTempControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_SampleCollectionTemp",
                                 },
                                 {
                                     'AttributeNodeId': 1545,
                                     'ControlId': 'DTSampleCollectionTimeControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_SampleCollectionTime",
                                 },
                                 {
                                     'AttributeNodeId': 1546,
                                     'ControlId': 'ATAmbientTempControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_AmbientTemp",
                                 },
                                 {
                                     'AttributeNodeId': 1547,
                                     'ControlId': 'DTAmbientTimeControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_AmbientTime",
                                 },
                                 {
                                     'AttributeNodeId': 1548,
                                     'ControlId': 'ATLabChillerTempControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_LabChillerTemp",
                                 },
                                 {
                                     'AttributeNodeId': 1549,
                                     'ControlId': 'DTLabChillerTimeControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_LabChillerTime",
                                 },
                                 {
                                     'AttributeNodeId': 1550,
                                     'ControlId': 'AddlSamplingToolsControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_SamplingTools",
                                 },
                                 {
                                     'AttributeNodeId': 1552,
                                     'ControlId': 'chkConditionOfAreaOnSampling',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_ConditionOfArea",
                                 },

                                 //{
                                 //    'AttributeNodeId': 1554,
                                 //    'ControlId': 'txtCollectedByControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_CollectedBy",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1555,
                                 //    'ControlId': 'txtWittnessedByControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_WittnessedBy",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1556,
                                 //    'ControlId': 'chkConditionOfSampleOnReceipt',
                                 //    "DefaultValue": "0",
                                 //    "ErrorMessageKey": "Mandatory_ConditionOfSample",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1558,
                                 //    'ControlId': 'chkConditionOfSampleOnReceipt',
                                 //    "DefaultValue": "0",
                                 //    "ErrorMessageKey": "Mandatory_ConditionOfSample",
                                 //},
                                 {
                                     'AttributeNodeId': 1570,
                                     'ControlId': 'DTAnalysisDateControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_AnalysisDate",
                                 },
                                 {
                                     'AttributeNodeId': 1571,
                                     'ControlId': 'DTAnalysisCompletionDateControlId',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_AnalysisCompletionDate",
                                 },
                                 {
                                     'AttributeNodeId': 1572,
                                     'ControlId': 'chkAnalysisReason',
                                     "DefaultValue": "",
                                     "ErrorMessageKey": "Mandatory_AnalysisReason",
                                 },
                                 */

                             ]
                         },
                         'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                             IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                             //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                             MandatoryElements: [
                                  {
                                      'AttributeNodeId': 1535,
                                      'ControlId': 'txtSamplingNoControlId',
                                      "DefaultValue": "0",
                                      "ErrorMessageKey": "Mandatory_SamplingNo",
                                  },
                                 // {
                                 //     'AttributeNodeId': 1534,
                                 //     'ControlId': 'txtSamplingMethodControlId',
                                 //     "DefaultValue": "",
                                 //     "ErrorMessageKey": "Mandatory_SamplingMethod",
                                 // },
                                 //{
                                 //    'AttributeNodeId': 1536,
                                 //    'ControlId': 'txtSamplingDescriptionControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_SamplingDescription",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1537,
                                 //    'ControlId': 'AddlUnitControlId',
                                 //    "DefaultValue": "0",
                                 //    "ErrorMessageKey": "Mandatory_Unit",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1538,
                                 //    'ControlId': 'AddlDepartmentControlId',
                                 //    "DefaultValue": "0",
                                 //    "ErrorMessageKey": "Mandatory_Department",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1539,
                                 //    'ControlId': 'AddlSectionControlId',
                                 //    "DefaultValue": "0",
                                 //    "ErrorMessageKey": "Mandatory_Section",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1540,
                                 //    'ControlId': 'AddlLocationControlId',
                                 //    "DefaultValue": "0",
                                 //    "ErrorMessageKey": "Mandatory_Location",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 4000,
                                 //    'ControlId': 'AddlSectorControlId',
                                 //    "DefaultValue": "0",
                                 //    "ErrorMessageKey": "Mandatory_SampleSector",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 4001,
                                 //    'ControlId': 'AddlAirlineControlId',
                                 //    "DefaultValue": "0",
                                 //    "ErrorMessageKey": "Mandatory_Airline",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 4002,
                                 //    'ControlId': 'AddlClassControlId',
                                 //    "DefaultValue": "0",
                                 //    "ErrorMessageKey": "Mandatory_Class",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1544,
                                 //    'ControlId': 'ATSampleCollectionTempControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_SampleCollectionTemp",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1545,
                                 //    'ControlId': 'DTSampleCollectionTimeControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_SampleCollectionTime",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1546,
                                 //    'ControlId': 'ATAmbientTempControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_AmbientTemp",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1547,
                                 //    'ControlId': 'DTAmbientTimeControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_AmbientTime",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1548,
                                 //    'ControlId': 'ATLabChillerTempControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_LabChillerTemp",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1549,
                                 //    'ControlId': 'DTLabChillerTimeControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_LabChillerTime",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1550,
                                 //    'ControlId': 'AddlSamplingToolsControlId',
                                 //    "DefaultValue": "0",
                                 //    "ErrorMessageKey": "Mandatory_SamplingTools",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1552,
                                 //    'ControlId': 'chkConditionOfAreaOnSampling',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_ConditionOfArea",
                                 //},

                                 ////{
                                 ////    'AttributeNodeId': 1554,
                                 ////    'ControlId': 'txtCollectedByControlId',
                                 ////    "DefaultValue": "",
                                 ////    "ErrorMessageKey": "Mandatory_CollectedBy",
                                 ////},
                                 ////{
                                 ////    'AttributeNodeId': 1555,
                                 ////    'ControlId': 'txtWittnessedByControlId',
                                 ////    "DefaultValue": "",
                                 ////    "ErrorMessageKey": "Mandatory_WittnessedBy",
                                 ////},
                                 ////{
                                 ////    'AttributeNodeId': 1556,
                                 ////    'ControlId': 'chkConditionOfSampleOnReceipt',
                                 ////    "DefaultValue": "0",
                                 ////    "ErrorMessageKey": "Mandatory_ConditionOfSample",
                                 ////},
                                 ////{
                                 ////    'AttributeNodeId': 1558,
                                 ////    'ControlId': 'chkConditionOfSampleOnReceipt',
                                 ////    "DefaultValue": "0",
                                 ////    "ErrorMessageKey": "Mandatory_ConditionOfSample",
                                 ////},
                                 //{
                                 //    'AttributeNodeId': 1570,
                                 //    'ControlId': 'DTAnalysisDateControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_AnalysisDate",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1571,
                                 //    'ControlId': 'DTAnalysisCompletionDateControlId',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_AnalysisCompletionDate",
                                 //},
                                 //{
                                 //    'AttributeNodeId': 1572,
                                 //    'ControlId': 'chkAnalysisReason',
                                 //    "DefaultValue": "",
                                 //    "ErrorMessageKey": "Mandatory_AnalysisReason",
                                 //},


                             ]
                         }
                     }
                 }
                    ],

                    1655: [
                { // " 1655",//Sampling Sheet And Ice Analysis
                    UserId: -1,  //all Users
                    DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                    DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                    MandatoryValidationMetaData: {
                        'Save': { //(OperationName) ex:Save,Submit 
                            MandatoryElements: [
                                {
                                    'AttributeNodeId': 1657,
                                    'ControlId': 'txtSamplingNoControlId',
                                    "DefaultValue": "0",
                                    "ErrorMessageKey": "Mandatory_SamplingNo",
                                }

                            ]
                        },
                        'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                            IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                            //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                            MandatoryElements: [
                                 {
                                     'AttributeNodeId': 1657,
                                     'ControlId': 'txtSamplingNoControlId',
                                     "DefaultValue": "0",
                                     "ErrorMessageKey": "Mandatory_SamplingNo",
                                 }


                            ]
                        }
                    }
                }
                    ],

                    1778: [
               { // " 1778",// Sampling Sheet and Air Quality Monitoring
                   UserId: -1,  //all Users
                   DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                   DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                   MandatoryValidationMetaData: {
                       'Save': { //(OperationName) ex:Save,Submit 
                           MandatoryElements: [
                               {
                                   'AttributeNodeId': 1780,
                                   'ControlId': 'txtSamplingNoControlId',
                                   "DefaultValue": "0",
                                   "ErrorMessageKey": "Mandatory_SamplingNo",
                               }

                           ]
                       },
                       'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                           IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                           //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                           MandatoryElements: [
                                {
                                    'AttributeNodeId': 1780,
                                    'ControlId': 'txtSamplingNoControlId',
                                    "DefaultValue": "0",
                                    "ErrorMessageKey": "Mandatory_SamplingNo",
                                }


                           ]
                       }
                   }
               }
                    ],

                    1808: [
                            { // " 1778",// Sampling Sheet and Air Quality Monitoring
                                UserId: -1,  //all Users
                                DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                                DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                                MandatoryValidationMetaData: {
                                    'Save': { //(OperationName) ex:Save,Submit 
                                        MandatoryElements: [
                                            {
                                                'AttributeNodeId': 1810,
                                                'ControlId': 'txtSamplingNoControlId',
                                                "DefaultValue": "0",
                                                "ErrorMessageKey": "Mandatory_SamplingNo",
                                            }

                                        ]
                                    },
                                    'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                        IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                        //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                        MandatoryElements: [
                                             {
                                                 'AttributeNodeId': 1810,
                                                 'ControlId': 'txtSamplingNoControlId',
                                                 "DefaultValue": "0",
                                                 "ErrorMessageKey": "Mandatory_SamplingNo",
                                             }


                                        ]
                                    }
                                }
                            }
                    ],

                    1875: [
             { // " 1875",// Sampling Sheet and LINEN TESTS
                 UserId: -1,  //all Users
                 DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                 DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                 MandatoryValidationMetaData: {
                     'Save': { //(OperationName) ex:Save,Submit 
                         MandatoryElements: [
                             {
                                 'AttributeNodeId': 1877,
                                 'ControlId': 'txtSamplingNoControlId',
                                 "DefaultValue": "0",
                                 "ErrorMessageKey": "Mandatory_SamplingNo",
                             }

                         ]
                     },
                     'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                         IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                         //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                         MandatoryElements: [
                              {
                                  'AttributeNodeId': 1877,
                                  'ControlId': 'txtSamplingNoControlId',
                                  "DefaultValue": "0",
                                  "ErrorMessageKey": "Mandatory_SamplingNo",
                              }


                         ]
                     }
                 }
             }
                    ],

                    1837: [
             { // " 1837",// Sampling Sheet and EQUIPMENT SWAB TESTS
                 UserId: -1,  //all Users
                 DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                 DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                 MandatoryValidationMetaData: {
                     'Save': { //(OperationName) ex:Save,Submit 
                         MandatoryElements: [
                             {
                                 'AttributeNodeId': 1839,
                                 'ControlId': 'txtSamplingNoControlId',
                                 "DefaultValue": "0",
                                 "ErrorMessageKey": "Mandatory_SamplingNo",
                             }

                         ]
                     },
                     'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                         IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                         //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                         MandatoryElements: [
                              {
                                  'AttributeNodeId': 1839,
                                  'ControlId': 'txtSamplingNoControlId',
                                  "DefaultValue": "0",
                                  "ErrorMessageKey": "Mandatory_SamplingNo",
                              }


                         ]
                     }
                 }
             }
                    ],
                    1917: [
             { // " 1917",// Allergen Sample Collection And Report Format - Rev 0 - (HYG- 101)
                 UserId: -1,  //all Users
                 DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                 DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                 MandatoryValidationMetaData: {
                     'Save': { //(OperationName) ex:Save,Submit 
                         MandatoryElements: [
                             {
                                 'AttributeNodeId': 1919,
                                 'ControlId': 'txtSamplingDescriptionControlId',
                                 "DefaultValue": "",
                                 "ErrorMessageKey": "Mandatory_SamplingDescription",
                             }

                         ]
                     },
                     'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                         IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                         //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                         MandatoryElements: [
                              {
                                  'AttributeNodeId': 1919,
                                  'ControlId': 'txtSamplingDescriptionControlId',
                                  "DefaultValue": "",
                                  "ErrorMessageKey": "Mandatory_SamplingDescription",
                              }


                         ]
                     }
                 }
             }
                    ],
                    3115: [
                    { // " 3115",// Airline Complaint Sample First Evaluation Report
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 3117,
                                        'ControlId': 'AddlSectorControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Sector",
                                    }

                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                     {
                                         'AttributeNodeId': 3117,
                                         'ControlId': 'AddlSectorControlId',
                                         "DefaultValue": "0",
                                         "ErrorMessageKey": "Mandatory_Sector",
                                     },                                 
                                     {
                                         'AttributeNodeId': 3118,
                                         'ControlId': 'AddlClassControlId',
                                         "DefaultValue": "0",
                                         "ErrorMessageKey": "Mandatory_Class",
                                     },
                                     {
                                         'AttributeNodeId': 3119,
                                         'ControlId': 'AddlAirlineControlId',
                                         "DefaultValue": "0",
                                         "ErrorMessageKey": "Mandatory_Airline",
                                     },
                                     {
                                         'AttributeNodeId': 3120,
                                         'ControlId': 'AddlFlightControlId',
                                         "DefaultValue": "0",
                                         "ErrorMessageKey": "Mandatory_Flight",
                                     },
                                     {
                                         'AttributeNodeId': 3121,
                                         'ControlId': 'DTDateofRecieptControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_DateofReciept",
                                     },
                                     {
                                         'AttributeNodeId': 3122,
                                         'ControlId': 'DateofFlight',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_DateofFlight",
                                     },
                                     {
                                         'AttributeNodeId': 3123,
                                         'ControlId': 'chkSourceofForeignObjectControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_Sourceofforeignobject",
                                     },

                                     {
                                         'AttributeNodeId': 3125,
                                         'ControlId': 'txtNatureofComplaintControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_NatureofComplaint",
                                     },
                                     {
                                         'AttributeNodeId': 3126,
                                         'ControlId': 'txtSampleRefNoControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_SampleReferenceNumber",
                                     },
                                     //{
                                     //    'AttributeNodeId': 3127,
                                     //    'ControlId': 'txtHandedOverbyNameControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_HandedOverbyName",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 3130,
                                     //    'ControlId': 'txtReceivedbyNameControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_ReceivedbyName",
                                     //},
                                     {
                                         'AttributeNodeId': 3132,
                                         'ControlId': 'DTDateReceivedControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_DateReceived",
                                     },
                                     {
                                         'AttributeNodeId': 3134,
                                         'ControlId': 'txtInitialEvaluationControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_InitialEvaluationOfComplaint",
                                     },
                                     {
                                         'AttributeNodeId': 3135,
                                         'ControlId': 'txtInitialInvestigationControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_InitialInvestigationCarriedOutBy",
                                     },
                                     {
                                         'AttributeNodeId': 3136,
                                         'ControlId': 'chkSampleSourceControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_SampleSource",
                                     },
                                     //{
                                     //    'AttributeNodeId': 3139,
                                     //    'ControlId': 'txtNCRRefNoControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_NCRreferencenumber",
                                     //},
                                     {
                                         'AttributeNodeId': 3140,
                                         'ControlId': 'txtEvaluationCarriedControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_EvaluationCarriedBy",
                                     },
                                     {
                                         'AttributeNodeId': 3141,
                                         'ControlId': 'txtSampleDisposalControlId',
                                         "DefaultValue": "",
                                         "ErrorMessageKey": "Mandatory_SampleDisposalCarriedBy",
                                     },
                                  
                                ]
                            }
                        }
                    }
                    ],
                    8272: [
                    { // " 8272",// Airline Complaint Sample First Evaluation Report
                        UserId: -1,  //all Users
                        DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                        DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                        MandatoryValidationMetaData: {
                            'Save': { //(OperationName) ex:Save,Submit 
                                MandatoryElements: [
                                    {
                                        'AttributeNodeId': 8287,
                                        'ControlId': 'MealControlId',
                                        "DefaultValue": "",
                                        "ErrorMessageKey": "Mandatory_NameOfMeal",
                                    }

                                ]
                            },
                            'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                MandatoryElements: [
                                     //{
                                     //    'AttributeNodeId': 8287,
                                     //    'ControlId': 'MealControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_NameOfMeal",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8274,
                                     //    'ControlId': 'AddlSectorControlId',
                                     //     "DefaultValue": "",
                                     //     "ErrorMessageKey": "Mandatory_Sector",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8275,
                                     //    'ControlId': 'AddlFlightControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_Airline",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8276,
                                     //    'ControlId': 'AddlAirlineControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_Flight",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8279,
                                     //    'ControlId': 'DTETAControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_ETA",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8280,
                                     //    'ControlId': 'DTETDControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_ETD",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8281,
                                     //    'ControlId': 'txtClassControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_Class",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8288,
                                     //    'ControlId': 'MealMealTypeControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_TypeOfMeal",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8290,
                                     //    'ControlId': 'ATDeliveryTempControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_DeliveryTemp",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8291,
                                     //    'ControlId': 'DTDeliveryTimeControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_DeliveryTime",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8293,
                                     //    'ControlId': 'ATDispatchTempControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_DispatchTemp",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8294,
                                     //    'ControlId': 'DTDispatchTimeControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_DispatchTime",
                                     //},
                                     //{
                                     //    'Type': 'AdvanceDCValidationRuleMetaData',
                                     //    'DCValidationRule': '((oScope["AddlSectorControlId"].GetSelectedText() != "")&& (oScope["AddlSectorControlId"].GetSelectedText() != undefined))||((oScope["AddlFlightControlId"].GetSelectedText() != "")&& (oScope["AddlFlightControlId"].GetSelectedText() != undefined))||((oScope["AddlAirlineControlId"].GetSelectedText() !="")&& (oScope["AddlAirlineControlId"].GetSelectedText() != undefined))||((oScope["AddlFAndBControlId"].GetSelectedText() !="")&& (oScope["AddlFAndBControlId"].GetSelectedText() != undefined))',
                                     //    "ErrorMessageKey": "Mandatory_CustomerDetails",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8296,
                                     //    'ControlId': 'txtTimeofLoadingControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_TimeofLoading",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8297,
                                     //    'ControlId': 'DTTimeofMovingControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_TimeofMoving",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8298,
                                     //    'ControlId': 'txtHiLoaderNoControlId',
                                     //    "DefaultValue": "",
                                     //    "ErrorMessageKey": "Mandatory_HiLoaderNo",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8299,
                                     //    'ControlId': 'chkRefrigeratorConditionControlId',
                                     //    "DefaultValue": "0",
                                     //    "ErrorMessageKey": "Mandatory_RefrigeratorCondition",
                                     //},
                                     //{
                                     //    'AttributeNodeId': 8300,
                                     //    'ControlId': 'chkRefrigeratorStatusControlId',
                                     //    "DefaultValue": "0",
                                     //    "ErrorMessageKey": "Mandatory_RefrigeratorStatus",
                                     //}                                     
                                ]
                            }
                        }
                    }
                    ],

                    8314: [
                        { // "8314",//New EKFC-2 Cooking and Blast chilling Monitoring
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 8315,
                                        'ControlId': 'AddlProductControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_Product",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 8315,
                                            'ControlId': 'AddlProductControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_Product",
                                        },
                                        {
                                            'AttributeNodeId': 8316,
                                            'ControlId': 'AddlProductTypeControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_ProductType",
                                        },
                                        {
                                            'Type': 'AdvanceDCValidationRuleMetaData',
                                            'DCValidationRule': '((oScope["AddlSectorControlId"].GetSelectedText() != "")&& (oScope["AddlSectorControlId"].GetSelectedText() != undefined))||((oScope["AddlFlightControlId"].GetSelectedText() != "")&& (oScope["AddlFlightControlId"].GetSelectedText() != undefined))||((oScope["AddlAirlineControlId"].GetSelectedText() !="")&& (oScope["AddlAirlineControlId"].GetSelectedText() != undefined))||((oScope["AddlFAndBControlId"].GetSelectedText() !="")&& (oScope["AddlFAndBControlId"].GetSelectedText() != undefined))',
                                            "ErrorMessageKey": "Mandatory_CustomerDetails",
                                        },
                                        //{
                                        //    'AttributeNodeId': 332,
                                        //    'ControlId': 'AddlAirlineControlId',
                                        //    "DefaultValue": "",
                                        //    "ErrorMessageKey": "Mandatory_Airline",
                                        //},
                                        {
                                            'AttributeNodeId': 8322,
                                            'ControlId': 'txtCoreTempControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_CoreTemp",
                                        },
                                        {
                                            'AttributeNodeId': 8323,
                                            'ControlId': 'DTCookingTimeControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_CookingTime",
                                        },
                                        {
                                            'AttributeNodeId': 8325,
                                            'ControlId': 'AddlBlastChillerNoControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_BlastChillerNo",
                                        },
                                         {
                                             'AttributeNodeId': 8326,
                                             'ControlId': 'DTBlastChillerTimeInControlId',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_BlastChillerTimeIn",
                                         },
                                          {
                                              'AttributeNodeId': 8327,
                                              'ControlId': 'ATBlastChillerTempInControlId',
                                              "DefaultValue": "",
                                              "ErrorMessageKey": "Mandatory_BlastChillerTempIn",
                                          },
                                           {
                                               'AttributeNodeId': 8328,
                                               'ControlId': 'DTBlastChillerTimeOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_BlastChillerTimeOut",
                                           },
                                           {
                                               'AttributeNodeId': 8327,
                                               'ControlId': 'ATBlastChillerTempOutControlId',
                                               "DefaultValue": "",
                                               "ErrorMessageKey": "Mandatory_BlastChillerTempOut",
                                           }

                                    ]
                                }
                            }
                        }
                    ],

                    10323: [
                        { // "10323",//Hi Loaders Cleaning Checklist
                            UserId: -1,  //all Users
                            DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                            DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                            MandatoryValidationMetaData: {
                                'Save': { //(OperationName) ex:Save,Submit 
                                    MandatoryElements: [{
                                        'AttributeNodeId': 10325,
                                        'ControlId': 'AddlHiLoaderNoControlId',
                                        "DefaultValue": "0",
                                        "ErrorMessageKey": "Mandatory_HiLoaderNo",
                                    }]
                                },
                                'Submit': {//(OperationName) ex:Save,Submit //Completed =>if all Submit Mandatory rule passed for all users,make it IsCompleted=true
                                    IsAgainstDC: true, //IsAgainstDC:true  => if all over dc,any body entered following element values will consider for submit status updation(will update Submit status for all users and DC)
                                    //IsAgainstDC:false => dc users(DCResultEntity) entered values only consider for submit status updation(will update Submit status for particuler user)
                                    MandatoryElements: [
                                        {
                                            'AttributeNodeId': 10325,
                                            'ControlId': 'AddlHiLoaderNoControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_HiLoaderNo",
                                        },
                                        {
                                            'AttributeNodeId': 10326,
                                            'ControlId': 'AddlBayNumberControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_BayNumber",
                                        },
                                        {
                                            'AttributeNodeId': 10332,
                                            'ControlId': 'DTTimeControlId',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_Time",
                                        },
                                        {
                                            'AttributeNodeId': 10333,
                                            'ControlId': 'chkHiLoadersCleaned',
                                            "DefaultValue": "",
                                            "ErrorMessageKey": "Mandatory_HiLoaders",
                                        },
                                         {
                                             'AttributeNodeId': 10334,
                                             'ControlId': 'chkIceBinsSanitized',
                                             "DefaultValue": "",
                                             "ErrorMessageKey": "Mandatory_IceBins",
                                         },

                                    ]
                                }
                            }
                        }
                    ],
                }
    }