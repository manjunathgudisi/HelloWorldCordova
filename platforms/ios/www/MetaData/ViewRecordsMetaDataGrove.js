var GridMetaData =
{
    1: //ServiceId(all service not supporting)
            {
                0: [ // all templates
                    { // Not supporting morethan 1
                        "UserId": -1,  //all Users only supporting
                        "DCPlaceNodeId": -1,//any place only supporting
                        "ViewRecordsFacadeKey": "Default",
                        "Config": [
                            { "DisplayName": "Service", "FieldName": "ServiceName", "Width": "Auto", "Visible": true, 'TextAlign': 'center' }, // Field name should be column name or alias name of DAO response
                            { "DisplayName": "Template", "FieldName": "TemplateNodeName", "Width": "Auto", "Visible": true, 'TextAlign': 'center' }, // Field name should be column name or alias name of DAO response
                            { "DisplayName": "Site", "FieldName": "DcPlaceName", "Width": "Auto", "Visible": true, 'TextAlign': 'center' }, // Field name should be column name or alias name of DAO response                    
                            {
                                "DisplayName": "DC Details", "FieldName": "DCDetails", "Width": "50", "Visible": true,
                                "SubColumns":
                                    [
                                       { "DisplayName": "Client DocId", "FieldName": "ClientDocId", "Width": "Auto", "Visible": true, 'TextAlign': 'center' }, // Field name should be column name or alias name of DAO response
                                       //{ "DisplayName": "Shift", "FieldName": "ShiftName", "Width": "Auto", "Visible": true, 'TextAlign': 'center' }, // Field name should be column name or alias name of DAO response
                                       { "DisplayName": "Last Updated Date", "FieldName": "DCLastUpdatedDate", "Width": "Auto", "Visible": true, 'TextAlign': 'center' }, // Field name should be column name or alias name of DAO response
                                    ]
                            }
                        ],
                    }
                ],
                483: [ //(TemplateId)IncidentReport
               {
                   "UserId": -1,  //all Users
                   "DCPlaceNodeId": -1,//any place
                   "ViewRecordsFacadeKey": "Default",
                   "Config": [                           
                           { "DisplayName": "Site", "FieldName": "Site", "Width": "Auto", 'TextAlign': 'center', "Visible": true, "AttributeNodeId": 485, 'ControlId': 'AddlUnitControlId' },
                           { "DisplayName": "Floor/Zone", "FieldName": "Floor/Zone", "Width": "Auto", 'TextAlign': 'center', "Visible": true, "AttributeNodeId": 486, 'ControlId': 'AddlDepartmentControlId' },
                           { "DisplayName": "Room Type", "FieldName": "RoomType", "Width": "Auto", 'TextAlign': 'center', "Visible": true, "AttributeNodeId": 487, 'ControlId': 'AddlLocationControlId' },
                           { "DisplayName": "Room", "FieldName": "Room", "Width": "Auto", 'TextAlign': 'center', "Visible": true, "AttributeNodeId": 488, 'ControlId': 'AddlSectionControlId' },
                           {
                               "DisplayName": "Observation And Risk Details", "FieldName": "VehicleDetails", "Width": "50", "Visible": true, "AttributeNodeId": 0,
                               "SubColumns":
                                   [
                                    { "DisplayName": "Observation Type", "FieldName": "ObservationType", "Width": "Auto", 'TextAlign': 'center', "Visible": true, "AttributeNodeId": 490, 'ControlId': 'AddlObservationTypeControlId' },
                                    { "DisplayName": "Risk Type", "FieldName": "RiskType", "Width": "Auto", 'TextAlign': 'center', "Visible": true, "AttributeNodeId": 493, 'ControlId': 'chkRiskTypeControlId' },
                                   ]
                           }
                   ],
               }
                ],
            }
};





var FilterMetaData =
	{
	    1: //ServiceId(all service not supporting)
            {
                0: [ //all templates
                { // Not supporting morethan 1
                    "UserId": -1,  //all Users only supporting
                    "DCPlaceNodeId": -1,//any place only supporting
                    "Rules": [
                        {
                            "ExpressionId": "Pending",
                            "DisplayLabel": "Pending Records",
                            "FinalEquation": "",
                            "Expression": {
                                'CriteriaType': 'OneViewDCPrimaryCriteria',
                                'ColumnName': 'IsCompleted',
                                'Condition': 'Equal',
                                'value': 'false'
                            }
                        },
                        {
                            "ExpressionId": "IsNC",
                            "DisplayLabel": "Non Compliance Records",
                            "FinalEquation": "",
                            "Expression": {
                                'CriteriaType': 'OneViewDCPrimaryCriteria',
                                'ColumnName': 'IsAnyNC',
                                'Condition': 'Equal',
                                'value': 'true'
                            }
                        }
                    ]
                }
                ]
            }
	};

