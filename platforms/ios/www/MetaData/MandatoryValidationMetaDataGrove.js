    ///In first metadata have to change AuditPlaceNodeId=3 , temporarily changed coz place id is coming wrong

var GlobalDCMandatoryValidationMetaData = 
   {
       1: //ServiceId(all service not supporting)
               {
                   483: [
                   { 
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
                                       "ErrorMessageKey": "Mandatory_Site",
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
                                       "ErrorMessageKey": "Mandatory_Site",
                                   },
                                   {
                                       'AttributeNodeId': 490,
                                       'ControlId': 'AddlObservationTypeControlId',
                                       "DefaultValue": "0",
                                       "ErrorMessageKey": "Mandatory_ObservationType",
                                   },
                                   {
                                       'AttributeNodeId': 493,
                                       'ControlId': 'chkRiskTypeControlId',
                                       "DefaultValue": "",
                                       "ErrorMessageKey": "Mandatory_RiskType",
                                   },
                               ]
                           }
                       }
                   },
                   ],
               }
   }
