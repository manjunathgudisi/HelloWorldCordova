
var OperationDetails =
   {

       'Menu_MySetting': -1,
       'Menu_MyAudit': -1,

       'settingvisible': 1,
       'Setting_ProbeConfiguration': -1,
       'Setting_ProbeConfiguration_TempIndicator': -1,
       'Setting_ProbeConfiguration_ProbeSynchronize': -1,
       'Setting_ProbeConfiguration_TemperatureReading': -1,
       'Setting_ProbeConfiguration_NewProbeSynchronize': -1,
       'Setting_MyDownload': -1,
       'Setting_MyDownload_CleaningView': -1,
       'Setting_Profile': -1,
       'Setting_Profile_ChangePassword': -1,
       'Setting_Log': -1,
       'Setting_Log_Enable': -1,
       'Setting_Log_Upload': -1,
       'Setting_DB': -1,
       'Setting_DB_CopyDB': -1,
       'Setting_DB_UploadDB': -1,
       'Setting_DB_RestoreDB': -1,
       'Setting_DB_CleanDB': -1,
       'Setting_DB_CleanDCAndAction': -1,
       'Setting_Application': -1,
       'Setting_Application_CheckForUpdates': -1,
       'Setting_Application_Refresh': -1,
       'Setting_Application_RefreshPageGlobalization': -1,
       'Setting_Application_ConflictResolveMode': -1,
       'Setting_Application_GlobalOVGuidChecking': -1,
       'Setting_Application_AutoUpload': -1,
       'Setting_Application_AutoActionFollowupDownload': -1,
       'Setting_Version': -1,
       'Setting_Version_Name': -1,
       'Setting_Application_RefreshCloudManager': -1,
       'Setting_Application_RefreshMetadataConfiguration': -1,
       'Setting_Application_RefreshDATEntityTypes': -1,
       'Setting_Application_RefreshDcCustomHtml': -1,
       'Setting_Application_RefreshTab': -1,
       'Setting_StateManagement': -1,
       'Setting_StateManagement_NewDc': -1,

       'Setting_NewDcDateSelectionEnable': -1,
       'Setting_NewDcDateSelectionEnable_DcStartDate': -1,

       'Setting_ShiftSelection': -1,
       'Setting_Application_GeoLocationValidation': -1,
       'Setting_Application_Landingpagedailysync': -1,

       'Setting_AutoSync': -1,
       'Setting_AutoSync_StartSync': -1,
       'Setting_AutoMetadataDownload': -1,
       'Setting_AutoMasterMetadataDownload': -1,
       'Setting_MobileAutoSync': -1,
       'Setting_MobileAutoSync_Sync': -1,
       'Setting_MobileAutoSync_Refresh': -1,

   
   };




function ACLEnableHandler_OLD() {
    
    this.handleACLEnableJob = function (EventArgs) {
        
        try {

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");


            var GroupId = EventArgs.GroupId;
            if (ServiceId != undefined) {
                var acldata = ACL[ServiceId][LoginUserId];

                if (acldata == undefined) {
                    acldata = ACL[ServiceId]["-1"];
                }
                if (acldata != undefined) {
                    for (var operKey in OperationDetails) {
                        if (operKey.indexOf(GroupId) != -1) {
                            if (OperationDetails[operKey] == -1) {
                                var operGroups = operKey.split('_');
                                var Key = '';
                                for (var j = 0; j < operGroups.length; j++) {
                                    Key = Key.replace("_*", "");

                                    //1:Key=Setting+'_*'
                                    //2.1 Key=Setting+
                                    //2.2:Key=Setting+Log+ '_*'
                                    //3.1:Key=Setting+Log
                                    //3.2:Key=Setting+Log+Enable

                                    if (j != operGroups.length - 1) {
                                        if (j == 0) {
                                            Key = Key + operGroups[j] + '_*';
                                        }
                                        else {
                                            Key = Key + "_" + operGroups[j] + '_*';
                                        }

                                    }
                                    else {
                                        Key = Key + "_" + operGroups[j];
                                    }

                                    if ((Key in acldata)) {
                                        var EventArgs = { GroupName: Key, Allow: acldata[Key], oScope: EventArgs.oScope };
                                        setGroupPermission(EventArgs);
                                    }


                                }
                            }
                        }
                    }
                }


            }

            //alert(JSON.stringify(OperationDetails_Setting));
           // document.getElementById("demo").innerHTML = JSON.stringify(OperationDetails_Setting);
        }
        catch (Excep) {
           // alert('FormatTemplateNode :' + JSON.stringify(Excep) + "," + Excep)
            throw oOneViewExceptionHandler.Create("FrameWork", "ACLEnableHandler.handleACLEnableJob", Excep);
        }
    }

    var setGroupPermission = function (EventArgs,GroupName, Allow, oScope) {
        try {
            var GroupName = EventArgs.GroupName;
            var Allow = EventArgs.Allow;
            var oScope = EventArgs.oScope;
            GroupName = GroupName.replace("_*", "");
            for (var operKey in OperationDetails) {
                if (OperationDetails[operKey] == -1) {
               
                    if (operKey.indexOf(GroupName) != -1) {

                       // OperationDetails[operKey] = Allow;
                        oScope[operKey] = Allow;

                    }
                }
            }
        }
        catch (Excep) {
            // alert('FormatTemplateNode :' + JSON.stringify(Excep) + "," + Excep)
            throw oOneViewExceptionHandler.Create("FrameWork", "ACLEnableHandler.setGroupPermission", Excep);
        }
    }

}

function ACLEnableHandler() {

    this.handleACLEnableJob = function (EventArgs) {

        try {

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");


            var GroupId = EventArgs.GroupId;
            if (ServiceId != undefined) {
                var acldata = ACL;
            
                if (acldata != undefined && acldata != null) {
                    for (var Key in acldata) {
                        if (Key.indexOf(GroupId) != -1) {
                            var EventArgs = { GroupName: Key, Allow: acldata[Key], oScope: EventArgs.oScope };
                            setGroupPermission(EventArgs);
                        }
                    }
                }


            }
          
        }
        catch (Excep) {
            // alert('FormatTemplateNode :' + JSON.stringify(Excep) + "," + Excep)
            throw oOneViewExceptionHandler.Create("FrameWork", "ACLEnableHandler.handleACLEnableJob", Excep);
        }
    }

    var setGroupPermission = function (EventArgs, GroupName, Allow, oScope) {
        try {
            var GroupName = EventArgs.GroupName;
            var Allow = EventArgs.Allow;
            var oScope = EventArgs.oScope;
            GroupName = GroupName.replace(/[/]/gi, "_");
            for (var operKey in OperationDetails) {
                if (GroupName == operKey) {
                    oScope[operKey] = Allow;
                }
            }
        }
        catch (Excep) {
            // alert('FormatTemplateNode :' + JSON.stringify(Excep) + "," + Excep)
            throw oOneViewExceptionHandler.Create("FrameWork", "ACLEnableHandler.setGroupPermission", Excep);
        }
    }

}











