var GlobalNCRuleMetaData =
  {
      1: //ServiceId(all service not supporting)
              {
                  2: [
                      {    // "2",//Cooking and Blast chilling Monitoring
                          UserId: -1,  //all Users
                          DCPlaceNodeId: 2,//any place ........//"2"-EKFC1
                          DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                          'NCRules': [
                              //4- Poultry EKFC1
                                {
                                    'RuleId': '201',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                    {
                                                        'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                        'NodeId': '9',
                                                        'ControlId': 'chkS',
                                                        'Condition': 'NotEqual',
                                                        'value': '1'
                                                    },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '4'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },

                                //6 - Meat EKFC1
                                {
                                    'RuleId': '202',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 65\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '9',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '6'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '65'
                                                }]
                                            }
                                },

                                //8- Comminuted Meat      EKFC1
                                {
                                    'RuleId': '203',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                    {
                                                        'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                        'NodeId': '9',
                                                        'ControlId': 'chkS',
                                                        'Condition': 'NotEqual',
                                                        'value': '1'
                                                    },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '8'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },

                                //10- Fish, Shell fish, Crustaceans  EKFC1
                                {
                                    'RuleId': '204',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 65\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '9',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '10'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '65'
                                                }]
                                            }
                                },

                                //12- Comminuted fish and shell fish  EKFC1
                                {
                                    'RuleId': '205',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 70\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '9',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '12'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '70'
                                                }]
                                            }
                                },

                                //14 Unpasteurized egg     EKFC1
                                {
                                    'RuleId': '206',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '9',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '14'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },

                                //16- Unpasteurized Diary     EKFC1
                                {
                                    'RuleId': '207',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 72\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '9',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '16'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '72'
                                                }]
                                            }
                                },

                                //18 Stuffed Meat, poultry or pasta  EKFC1
                                {
                                    'RuleId': '208',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '9',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '18'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },

                              {
                                  'RuleId': '3',
                                  'FinalJavaScriptEquation': '',
                                  'CriteriaDisplayLabel': 'Blast chiller Temp Out is expected to be less than or equal to 5\u2103',
                                  'Rule': {
                                      'CriteriaType': 'OneViewDCPrimaryCriteria',
                                      'NodeId': 22, //Bout
                                      'ControlId': 'ATBlastChillerTempOutControlId',
                                      'Condition': 'GreaterThan',
                                      'value': '5'
                                  }
                              },
                              {
                                  'RuleId': '4',
                                  'FinalJavaScriptEquation': '',
                                  'CriteriaDisplayLabel': 'Pre chiller Temp Out is expected to be less than or equal to 5\u2103',
                                  'Rule': {
                                      'CriteriaType': 'OneViewDCPrimaryCriteria',
                                      'NodeId': 17, //PBout
                                      'ControlId': 'ATPreChillerTempOutControlId',
                                      'Condition': 'GreaterThan',
                                      'value': '5'
                                  }
                              }
                          ]
                      },
                      {    // "2",//Cooking and Blast chilling Monitoring
                          UserId: -1,  //all Users
                          DCPlaceNodeId: 3,//any place ........//"3"-EKFC2
                          DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                          'NCRules': [

                              //5- Poultry EKFC2
                                {
                                    'RuleId': '201',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                    {
                                                        'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                        'NodeId': '9',
                                                        'ControlId': 'chkS',
                                                        'Condition': 'NotEqual',
                                                        'value': '1'
                                                    },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '5'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },


                                //7 Meat        EKFC2
                                {
                                    'RuleId': '202',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 65\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                    {
                                                        'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                        'NodeId': '9',
                                                        'ControlId': 'chkS',
                                                        'Condition': 'NotEqual',
                                                        'value': '1'
                                                    },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '7'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '65'
                                                }]
                                            }
                                },

                                //9 Comminuted Meat      EKFC2
                                {
                                    'RuleId': '203',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '9',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '9'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },

                                //11 Fish, Shell fish, Crustaceans  EKFC2
                                {
                                    'RuleId': '204',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 65\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '9',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '11'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '65'
                                                }]
                                            }
                                },

                                //13 Comminuted fish and shell fish  EKFC2
                                {
                                    'RuleId': '205',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 70\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                    {
                                                        'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                        'NodeId': '9',
                                                        'ControlId': 'chkS',
                                                        'Condition': 'NotEqual',
                                                        'value': '1'
                                                    },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '13'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '70'
                                                }]
                                            }
                                },

                                //15 Unpasteurized egg     EKFC2
                                {
                                    'RuleId': '206',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                    {
                                                        'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                        'NodeId': '9',
                                                        'ControlId': 'chkS',
                                                        'Condition': 'NotEqual',
                                                        'value': '1'
                                                    },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '15'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },

                                //17 Unpasteurized Diary     EKFC2
                                {
                                    'RuleId': '207',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 72\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                    {
                                                        'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                        'NodeId': '9',
                                                        'ControlId': 'chkS',
                                                        'Condition': 'NotEqual',
                                                        'value': '1'
                                                    },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '17'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '72'
                                                }]
                                            }
                                },

                                //19 Stuffed Meat, poultry or pasta  EKFC2
                                {
                                    'RuleId': '208',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                    {
                                                        'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                        'NodeId': '9',
                                                        'ControlId': 'chkS',
                                                        'Condition': 'NotEqual',
                                                        'value': '1'
                                                    },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '5',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '19'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '11',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },


                              {
                                  'RuleId': '3',
                                  'FinalJavaScriptEquation': '',
                                  'CriteriaDisplayLabel': 'Blast chiller Temp Out is expected to be less than or equal to 5\u2103',
                                  'Rule': {
                                      'CriteriaType': 'OneViewDCPrimaryCriteria',
                                      'NodeId': 22, //Bout
                                      'ControlId': 'ATBlastChillerTempOutControlId',
                                      'Condition': 'GreaterThan',
                                      'value': '5'
                                  }
                              },
                              {
                                  'RuleId': '4',
                                  'FinalJavaScriptEquation': '',
                                  'CriteriaDisplayLabel': 'Pre-chiller Temp Out is expected to be less than or equal to 5\u2103',
                                  'Rule': {
                                      'CriteriaType': 'OneViewDCPrimaryCriteria',
                                      'NodeId': 17, //Bout
                                      'ControlId': 'ATPreChillerTempOutControlId',
                                      'Condition': 'GreaterThan',
                                      'value': '5'
                                  }
                              }
                          ]
                      }
                  ],
					  3: [
                      {    // "3",//Cooking And BlastChilling Verification
                          UserId: -1,  //all Users
                          DCPlaceNodeId: 2,//any place ........//"4"-EKFC2
                          DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                          'NCRules': [

                               //4- Poultry EKFC1
                                {
                                    'RuleId': '3001',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                    {
                                                        'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                        'NodeId': '29',
                                                        'ControlId': 'chkS',
                                                        'Condition': 'NotEqual',
                                                        'value': '1'
                                                    },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '4'
                                                },
												{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }
												]
                                            }
                                },

                                //6 - Meat EKFC1
                                {
                                    'RuleId': '3002',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 65\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                     {
                                                         'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                         'NodeId': '29',
                                                         'ControlId': 'chkS',
                                                         'Condition': 'NotEqual',
                                                         'value': '1'
                                                     },
                                                     {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '6'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '65'
                                                }]
                                            }
                                },

                                //8- Comminuted Meat      EKFC1
                                {
                                    'RuleId': '3003',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                     {
                                                         'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                         'NodeId': '29',
                                                         'ControlId': 'chkS',
                                                         'Condition': 'NotEqual',
                                                         'value': '1'
                                                     },
                                                     {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '8'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },

                                //10- Fish, Shell fish, Crustaceans  EKFC1
                                {
                                    'RuleId': '3004',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 65\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                     {
                                                         'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                         'NodeId': '29',
                                                         'ControlId': 'chkS',
                                                         'Condition': 'NotEqual',
                                                         'value': '1'
                                                     },
                                                     {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '10'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '65'
                                                }]
                                            }
                                },

                                //12- Comminuted fish and shell fish  EKFC1
                                {
                                    'RuleId': '3005',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 70\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                     {
                                                         'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                         'NodeId': '29',
                                                         'ControlId': 'chkS',
                                                         'Condition': 'NotEqual',
                                                         'value': '1'
                                                     },
                                                     {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '12'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '70'
                                                }]
                                            }
                                },

                                //14 Unpasteurized egg     EKFC1
                                {
                                    'RuleId': '3006',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                     {
                                                         'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                         'NodeId': '29',
                                                         'ControlId': 'chkS',
                                                         'Condition': 'NotEqual',
                                                         'value': '1'
                                                     },
                                                     {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '14'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },

                                //16- Unpasteurized Diary     EKFC1
                                {
                                    'RuleId': '3007',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 72\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                     {
                                                         'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                         'NodeId': '29',
                                                         'ControlId': 'chkS',
                                                         'Condition': 'NotEqual',
                                                         'value': '1'
                                                     },
                                                     {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '16'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '72'
                                                }]
                                            }
                                },

                                //18 Stuffed Meat, poultry or pasta  EKFC1
                                {
                                    'RuleId': '3008',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                     {
                                                         'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                         'NodeId': '29',
                                                         'ControlId': 'chkS',
                                                         'Condition': 'NotEqual',
                                                         'value': '1'
                                                     },
                                                     {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '18'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },


                              {
                                  'RuleId': '5',
                                  'FinalJavaScriptEquation': '',
                                  'CriteriaDisplayLabel': 'Blast chiller Temp Out is expected to be less than or equal to 5\u2103',
                                  'Rule': {
                                      'CriteriaType': 'OneViewDCPrimaryCriteria',
                                      'NodeId': 42, //Bout
                                      'ControlId': 'ATBlastChillerTempOutControlId',
                                      'Condition': 'GreaterThan',
                                      'value': '5'
                                  }
                              },
                              {
                                  'RuleId': '6',
                                  'FinalJavaScriptEquation': '',
                                  'CriteriaDisplayLabel': 'Pre-chiller Temp Out is expected to be less than or equal to 5\u2103',
                                  'Rule': {
                                      'CriteriaType': 'OneViewDCPrimaryCriteria',
                                      'NodeId': 37, //PBout
                                      'ControlId': 'ATPreChillerTempOutControlId',
                                      'Condition': 'GreaterThan',
                                      'value': '5'
                                  }
                              }]
                      },
					  {    // "3",//Cooking And BlastChilling Verification
					      UserId: -1,  //all Users
					      DCPlaceNodeId: 3,//any place ........//"4"-EKFC2
					      DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
					      'NCRules': [
                                {
                                    'RuleId': '3001',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                     {
                                                         'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                         'NodeId': '29',
                                                         'ControlId': 'chkS',
                                                         'Condition': 'NotEqual',
                                                         'value': '1'
                                                     },
                                                    {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '5'
                                                },
												{
												    'CriteriaType': 'OneViewDCPrimaryCriteria',
												    'NodeId': '31',
												    'ControlId': 'txtCoreTempControlId',
												    'Condition': 'LessThan',
												    'value': '74'
												}
                                                ]
                                            }
                                },


                                //7 Meat        EKFC2
                                {
                                    'RuleId': '3002',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 65\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                     {
                                                         'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                         'NodeId': '29',
                                                         'ControlId': 'chkS',
                                                         'Condition': 'NotEqual',
                                                         'value': '1'
                                                     },
                                                     {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '7'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '65'
                                                }]
                                            }
                                },

                                //9 Comminuted Meat      EKFC2
                                {
                                    'RuleId': '3003',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [
                                                     {
                                                         'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                         'NodeId': '29',
                                                         'ControlId': 'chkS',
                                                         'Condition': 'NotEqual',
                                                         'value': '1'
                                                     },
                                                     {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '9'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },

                                //11 Fish, Shell fish, Crustaceans  EKFC2
                                {
                                    'RuleId': '3004',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 65\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '29',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '11'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '65'
                                                }]
                                            }
                                },

                                //13 Comminuted fish and shell fish  EKFC2
                                {
                                    'RuleId': '3005',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 70\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '29',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '13'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '70'
                                                }]
                                            }
                                },

                                //15 Unpasteurized egg     EKFC2
                                {
                                    'RuleId': '3006',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '29',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '15'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },

                                //17 Unpasteurized Diary     EKFC2
                                {
                                    'RuleId': '3007',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 72\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '29',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '17'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '72'
                                                }]
                                            }
                                },

                                //19 Stuffed Meat, poultry or pasta  EKFC2
                                {
                                    'RuleId': '3008',
                                    'FinalJavaScriptEquation': '',
                                    'CriteriaDisplayLabel': 'Cooking Temperature is expected to be greater than or equal to 74\u2103',
                                    'Rule':
                                            {
                                                'CriteriaType': 'OneViewDCAdvCriteria',
                                                'Condition': 'AND',
                                                'FilterParms': [{
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '29',
                                                    'ControlId': 'chkS',
                                                    'Condition': 'NotEqual',
                                                    'value': '1'
                                                },
                                                {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '25',
                                                    'ControlId': 'AddlProductTypeControlId',
                                                    'Condition': 'Equal',
                                                    'value': '19'
                                                }, {
                                                    'CriteriaType': 'OneViewDCPrimaryCriteria',
                                                    'NodeId': '31',
                                                    'ControlId': 'txtCoreTempControlId',
                                                    'Condition': 'LessThan',
                                                    'value': '74'
                                                }]
                                            }
                                },



                              {
                                  'RuleId': '5',
                                  'FinalJavaScriptEquation': '',
                                  'CriteriaDisplayLabel': 'Blast chiller Temp Out is expected to be less than or equal to 5\u2103',
                                  'Rule': {
                                      'CriteriaType': 'OneViewDCPrimaryCriteria',
                                      'NodeId': 42, //Bout
                                      'ControlId': 'ATBlastChillerTempOutControlId',
                                      'Condition': 'GreaterThan',
                                      'value': '5'
                                  }
                              },
                              {
                                  'RuleId': '6',
                                  'FinalJavaScriptEquation': '',
                                  'CriteriaDisplayLabel': 'Pre-chiller Temp Out is expected to be less than or equal to 5\u2103',
                                  'Rule': {
                                      'CriteriaType': 'OneViewDCPrimaryCriteria',
                                      'NodeId': 37, //PBout
                                      'ControlId': 'ATPreChillerTempOutControlId',
                                      'Condition': 'GreaterThan',
                                      'value': '5'
                                  }
                              }
					      ]
					  }],
					 //  44: [
                     //{    // "44",//GoodsReceiving And Temperature Verification Records
                     //    UserId: -1,  //all Users
                     //    DCPlaceNodeId: -1,//any place ........//"4"-EKFC2
                     //    DCPlaceDimension: "OrganizationAssetsNode",  //remove this,if DCPlaceNodeId=0
                     //    'NCRules': [
                     //        {
                     //            'RuleId': '6',
                     //            'FinalJavaScriptEquation': '',
                     //            'CriteriaDisplayLabel': 'Surface Temp is expected to be less than or equal to 8\u2103',
                     //            'Rule': {
                     //                'CriteriaType': 'OneViewDCPrimaryCriteria',
                     //                'NodeId': 61, //Bout
                     //                'ControlId': 'ATSurfaceTempControlId',
                     //                'Condition': 'GreaterThan',
                     //                'value': '8'
                     //            }
                     //        }]
                     //}]
              }
  }
  
   
