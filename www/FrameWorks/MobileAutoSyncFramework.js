
function MobileAutoSyncFramework() {

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "MobileAutoSyncFramework.Init");

            var IsGlobalMobileAutoSyncEnabled = OneViewLocalStorage.Get("IsGlobalMobileAutoSyncEnabled");


            OneViewConsole.Debug("Init End", "MobileAutoSyncFramework.Init");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MobileAutoSyncFramework.Init", Excep);
        }
    }
}


/// <summary>
/// BusinessEventFramework
/// </summary>
function BusinessEventFramework() {

    var MyInstance = this;

    this.GetMetadata = function (ClassName, MethodName) {
        try {
            OneViewConsole.Debug("GetMetadata Start", "BusinessEventFramework.GetMetadata");


            //var DownloadMetadata = [{
            //    "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" }, "EventName": null, "EventDesc": null, "IsOperationEvent": false,
            //    "ClassName": "LoginPage", "MethodName": "PageLoad", "OperationCategory": null, "IsTimerEvent": false, "CRONExpression": null, "IsSyncEvent": false,
            //    "BusinessEventDefinition": { "Type": "LoginUserWiseBusinessEventDefinition", "AdviceTypeEnum": 2, "UserIds": [35691, 88], "RoleIds": null, "UserGroups": null, "BusinessEventEvaluatorObjectKey": "" },
            //    "BusinessEventHandlers": [{
            //        "Type": "DefaultMobileEventHandlerMetaData", "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" },
            //        "BusinessEventHandlerObjectKeys": ["AutoProfileDownload_BusinessEventHandler"],
            //        "Parameters": {
            //            "Type": "DefaultMobileFilterParams", "PlaceFilterParam": { "DCPlaceList": null, "DCPlaceDimension": 16, "IsAnyPlace": true, "DCPlaceType": 0 },
            //            "TemplateFilterParam": { "DCTemplateList": [726,756,797], "IsAnyTemplate": false }
            //        }, "EventArgsConfig": null, "ExceptionCategory": 0,
            //        "BusinessEventEvaluatorObjectKey": null, "BusinessEventHandler": 0, "ExecutionOrder": 0, "IsSyncEventHandler": false, "IsSkipException": false
            //    }]
            //}
            //];
            //Metadata = DownloadMetadata;

            //var UploadMetadata = [{
            //    "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" }, "EventName": null, "EventDesc": null, "IsOperationEvent": false,
            //    "ClassName": "LoginPage", "MethodName": "PageLoad", "OperationCategory": null, "IsTimerEvent": false, "CRONExpression": null, "IsSyncEvent": false,
            //    "BusinessEventDefinition": { "Type": "LoginUserWiseBusinessEventDefinition", "AdviceTypeEnum": 2, "UserIds": [35691, 88], "RoleIds": null, "UserGroups": null, "BusinessEventEvaluatorObjectKey": "" },
            //    "BusinessEventHandlers": [{
            //        "Type": "DefaultMobileEventHandlerMetaData", "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" },
            //        "BusinessEventHandlerObjectKeys": ["AutoProfileUpload_BusinessEventHandler"],
            //        "Parameters": {
            //            "Type": "DefaultMobileFilterParams", "PlaceFilterParam": { "DCPlaceList": null, "DCPlaceDimension": 16, "IsAnyPlace": true, "DCPlaceType": 0 },
            //            "TemplateFilterParam": { "DCTemplateList": [756, 797], "IsAnyTemplate": false }
            //        }, "EventArgsConfig": null, "ExceptionCategory": 0,
            //        "BusinessEventEvaluatorObjectKey": null, "BusinessEventHandler": 0, "ExecutionOrder": 0, "IsSyncEventHandler": false, "IsSkipException": false
            //    }]
            //}
            //];
            //var Metadata = UploadMetadata;



            //TCFM
            /*
            var Metadata = [{
                "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" }, "EventName": null, "EventDesc": null, "IsOperationEvent": false,
                "ClassName": "LoginPage", "MethodName": "PageLoad", "OperationCategory": null, "IsTimerEvent": false, "CRONExpression": "00_00_08_*_*_*_*", "IsSyncEvent": true,
                "BusinessEventDefinition": { "Type": "LoginUserWiseBusinessEventDefinition", "AdviceTypeEnum": 2, "UserIds": [35691, 88], "RoleIds": null, "UserGroups": null, "BusinessEventEvaluatorObjectKey": "" },
                "BusinessEventHandlers": [{
                    "Type": "DefaultMobileEventHandlerMetaData", "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" },
                    "BusinessEventHandlerObjectKeys": ["AutoProfileDownload_BusinessEventHandler"],
                    "Parameters": {
                        "Type": "DefaultMobileFilterParams", "PlaceFilterParam": { "DCPlaceList": null, "DCPlaceDimension": 16, "IsAnyPlace": true, "DCPlaceType": 0 },
                        "TemplateFilterParam": { "DCTemplateList": [726,756,797], "IsAnyTemplate": false }
                    }, "EventArgsConfig": null, "ExceptionCategory": 0,
                    "BusinessEventEvaluatorObjectKey": null, "BusinessEventHandler": 0, "ExecutionOrder": 0, "IsSyncEventHandler": false, "IsSkipException": false
                }]
            },
            {
                "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" }, "EventName": null, "EventDesc": null, "IsOperationEvent": false,
                "ClassName": "LoginPage", "MethodName": "PageLoad", "OperationCategory": null, "IsTimerEvent": false, "CRONExpression": null, "IsSyncEvent": false,
                "BusinessEventDefinition": { "Type": "LoginUserWiseBusinessEventDefinition", "AdviceTypeEnum": 2, "UserIds": [35691, 88], "RoleIds": null, "UserGroups": null, "BusinessEventEvaluatorObjectKey": "" },
                "BusinessEventHandlers": [{
                    "Type": "DefaultMobileEventHandlerMetaData", "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" },
                    "BusinessEventHandlerObjectKeys": ["AutoProfileUpload_BusinessEventHandler"],
                    "Parameters": {
                        "Type": "DefaultMobileFilterParams", "PlaceFilterParam": { "DCPlaceList": null, "DCPlaceDimension": 16, "IsAnyPlace": true, "DCPlaceType": 0 },
                        "TemplateFilterParam": { "DCTemplateList": [756, 797], "IsAnyTemplate": false }
                    }, "EventArgsConfig": null, "ExceptionCategory": 0,
                    "BusinessEventEvaluatorObjectKey": null, "BusinessEventHandler": 0, "ExecutionOrder": 0, "IsSyncEventHandler": false, "IsSkipException": false
                }]
            }
            ];
            */

           
            /*
          //IMS
           var Metadata = [{
               "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" }, "EventName": null, "EventDesc": null, "IsOperationEvent": false,
               "ClassName": "LoginPage", "MethodName": "PageLoad", "OperationCategory": null, "IsTimerEvent": false, "CRONExpression": "", "IsSyncEvent": true,
               "BusinessEventDefinition": { "Type": "LoginUserWiseBusinessEventDefinition", "AdviceTypeEnum": 2, "UserIds": [84495], "RoleIds": null, "UserGroups": null, "BusinessEventEvaluatorObjectKey": "" },
               "BusinessEventHandlers": [{
                   "Type": "DefaultMobileEventHandlerMetaData", "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" },
                   "BusinessEventHandlerObjectKeys": ["AutoProfileDownload_BusinessEventHandler"],
                   "Parameters": {
                       "Type": "DefaultMobileFilterParams", "PlaceFilterParam": { "DCPlaceList": null, "DCPlaceDimension": 16, "IsAnyPlace": true, "DCPlaceType": 0 },
                       "TemplateFilterParam": { "DCTemplateList": [3], "IsAnyTemplate": false }
                   }, "EventArgsConfig": null, "ExceptionCategory": 0,
                   "BusinessEventEvaluatorObjectKey": null, "BusinessEventHandler": 0, "ExecutionOrder": 0, "IsSyncEventHandler": false, "IsSkipException": false
               }]
           },
           {
               "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" }, "EventName": null, "EventDesc": null, "IsOperationEvent": false,
               "ClassName": "LoginPage", "MethodName": "PageLoad", "OperationCategory": null, "IsTimerEvent": false, "CRONExpression": null, "IsSyncEvent": false,
               "BusinessEventDefinition": { "Type": "LoginUserWiseBusinessEventDefinition", "AdviceTypeEnum": 2, "UserIds": [84495], "RoleIds": null, "UserGroups": null, "BusinessEventEvaluatorObjectKey": "" },
               "BusinessEventHandlers": [{
                   "Type": "DefaultMobileEventHandlerMetaData", "_id": { "Timestamp": 0, "Machine": 0, "Pid": 0, "Increment": 0, "CreationTime": "\/Date(0)\/" },
                   "BusinessEventHandlerObjectKeys": ["AutoProfileUpload_BusinessEventHandler"],
                   "Parameters": {
                       "Type": "DefaultMobileFilterParams", "PlaceFilterParam": { "DCPlaceList": null, "DCPlaceDimension": 16, "IsAnyPlace": true, "DCPlaceType": 0 },
                       "TemplateFilterParam": { "DCTemplateList": [3], "IsAnyTemplate": false }
                   }, "EventArgsConfig": null, "ExceptionCategory": 0,
                   "BusinessEventEvaluatorObjectKey": null, "BusinessEventHandler": 0, "ExecutionOrder": 0, "IsSyncEventHandler": false, "IsSkipException": false
               }]
           }
           ];
           */

            //alert(OneViewSessionStorage.Get("ServiceId") + "," + OneViewSessionStorage.Get("LoginUserId") + "," + ClassName + "," + MethodName);

           var _oMobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();
           var Metadata = _oMobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), ClassName, MethodName);

           //alert('Metadata : ' + JSON.stringify(Metadata));
            OneViewConsole.Debug("GetMetadata End", "BusinessEventFramework.GetMetadata");

            return Metadata;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "BusinessEventFramework.GetMetadata", Excep);
        }
    }

    this.TriggerEvent = function (ClassName, MethodName) {
        try {
            OneViewConsole.Debug("TriggerEvent Start", "BusinessEventFramework.TriggerEvent");
            //alert('TriggerEvent');
            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
            var BusinessEventEntityList = MyInstance.GetMetadata(ClassName, MethodName);
            MyInstance.Filter(BusinessEventEntityList, CurrenntDateAndTime);

            OneViewConsole.Debug("TriggerEvent End", "BusinessEventFramework.TriggerEvent");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "BusinessEventFramework.TriggerEvent", Excep);
        }
    }

    /// <summary>
    /// Filter
    /// </summary>
    /// <param name="BusinessEventEntityList">BusinessEventEntityList</param>
    this.Filter = function (BusinessEventEntityList, CurrenntDateAndTime) {
        try {
            OneViewConsole.Debug("Filter Start", "BusinessEventFramework.Filter");

             //alert('BusinessEventEntityList : ' + JSON.stringify(BusinessEventEntityList));
             if (BusinessEventEntityList != null && BusinessEventEntityList != undefined && BusinessEventEntityList.length > 0) {
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

                if (NetworkStatus.IsNetworkAvailable == true) {
                    for (var i = 0; i < BusinessEventEntityList.length; i++) {
                        var itrBusinessEventEntity = BusinessEventEntityList[i];

                        var IsCRONExpressionSuccess = false;
                        if (itrBusinessEventEntity.IsTimerEvent == true || itrBusinessEventEntity.IsTimerEvent == 'true') {
                            IsCRONExpressionSuccess = MyInstance.EvaluateCRONExpression(itrBusinessEventEntity.CRONExpression, CurrenntDateAndTime);
                        }
                        else {
                            IsCRONExpressionSuccess = true;
                        }

                        if (IsCRONExpressionSuccess == true) {
                            var oBusinessEventDefinition = itrBusinessEventEntity.BusinessEventDefinition;
                            var IsEvaluationStatusSuccess = false;
                            var oBusinessEventDefinitionObj;
                            try {
                                oBusinessEventDefinitionObj = new window[oBusinessEventDefinition.Type]();
                            }
                            catch (Excep) {
                                navigator.notification.alert(("Error while creating the object : " + oBusinessEventDefinition.Type), ['OK'], "");
                            }

                            if (oBusinessEventDefinitionObj != undefined) {
                                IsEvaluationStatusSuccess = oBusinessEventDefinitionObj.Evaluate(oBusinessEventDefinition);
                            }

                            //if (Type == "LoginUserWiseBusinessEventDefinition") {
                            //    var _oLoginUserWiseBusinessEventDefinitionEvaluator = new LoginUserWiseBusinessEventDefinitionEvaluator();
                            //    IsEvaluationStatusSuccess= _oLoginUserWiseBusinessEventDefinitionEvaluator.Evaluate();
                            //}
                            //else {
                            //    alert("");
                            //}

                            //alert('IsEvaluationStatusSuccess : ' + IsEvaluationStatusSuccess);
                            if (IsEvaluationStatusSuccess == true) {
                                MyInstance.ExecuteHandlers(itrBusinessEventEntity.BusinessEventHandlers);
                            }
                        }
                    }
                }
                else {
                    alert(GlobalxlatService.xlat('IN-ER-MAF-001 :: Unable to Synchronize - Please check your internet connectivity.'));
                }
            }

            OneViewConsole.Debug("Filter End", "BusinessEventFramework.Filter");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "BusinessEventFramework.Filter", Excep);
        }
    }


    /// <summary>
    /// EvaluateCRONExpression
    /// </summary>
    /// <param name="req">req</param>
    this.EvaluateCRONExpression = function (CRONExpression, CurrenntDateAndTime) {
        try {
            OneViewConsole.Debug("EvaluateCRONExpression Start", "BusinessEventFramework.EvaluateCRONExpression");

            var IsSuccess = false;
            //alert('CurrenntDateAndTime : ' + CurrenntDateAndTime);

            var CurrenntDateAndTimeSplitted = CurrenntDateAndTime.split(" ");
            var CurrenntDateSplitted = CurrenntDateAndTimeSplitted[0].split("-");
            var CurrenntTimeSplitted = CurrenntDateAndTimeSplitted[1].split(":");


            var CRONExpressionSplitted = CRONExpression.split("_"); //eg : "00_00_08_*_*_*_*" // //@Scheduled(cron = "[Seconds] [Minutes] [Hours] [Day of month] [Month] [Day of week] [Year]")
                 
            var ss= CRONExpressionSplitted[0];
            var mm= CRONExpressionSplitted[1];
            var hh= CRONExpressionSplitted[2];
            var dd= CRONExpressionSplitted[3];
            var mo= CRONExpressionSplitted[4];
            var day= CRONExpressionSplitted[5]; //1:Sunday, 2: Monday
            var yyyy= CRONExpressionSplitted[6];
           
            ss = (ss != '*' ? ss : 0);
            mm = (mm != '*' ? mm : 0);
            hh = (hh != '*' ? hh : 0);
            dd = (dd != '*' ? dd : 0);
            mo = (mo != '*' ? mo : 0);
            day = (day != '*' ? day : 0);
            yyyy = (yyyy != '*' ? yyyy : 0);
                      
            var _oCRONDateTime = new Date(yyyy, mo, dd, hh, mm, ss);
            var _CurrentDateTimeConverted = new Date(CurrenntDateSplitted[2], (CurrenntDateSplitted[1] - 1), CurrenntDateSplitted[0], CurrenntTimeSplitted[0], CurrenntTimeSplitted[1], CurrenntTimeSplitted[2]);

            if (_oCRONDateTime.getDate() == _CurrentDateTimeConverted.getDate()) {
                if (_oCRONDateTime.getTime() == _CurrentDateTimeConverted.getTime()) {
                    //  if(hh == CurrenntTimeSplitted[0] && mm == CurrenntTimeSplitted[1] && ss == CurrenntTimeSplitted[1]){
                    IsSuccess = true;
                    //alert("equal time");
                }
            }

            //alert("EvaluateCRONExpression IsSuccess : " + IsSuccess);
            OneViewConsole.Debug("EvaluateCRONExpression End", "BusinessEventFramework.EvaluateCRONExpression");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "BusinessEventFramework.EvaluateCRONExpression", Excep);
        }
    }

    /// <summary>
    /// ExecuteHandlers
    /// </summary>
    /// <param name="BusinessEventHandlers">BusinessEventHandlers</param>
    this.ExecuteHandlers = function (BusinessEventHandlers) {
        try {
            OneViewConsole.Debug("ExecuteHandlers Start", "BusinessEventFramework.ExecuteHandlers");

            var Req = {};
            for (var i = 0; i < BusinessEventHandlers.length; i++) {
                var _oBusinessEventHandler = BusinessEventHandlers[i];
                if (_oBusinessEventHandler.Type == "DefaultMobileEventHandlerMetaData") {
                    //Filter by Parameters

                    var Parameters = _oBusinessEventHandler.Parameters;
                    
                    for (var j = 0; j < _oBusinessEventHandler.BusinessEventHandlerObjectKeys.length; j++) {
                         
                        try {
                            var BusinessEventHandlerObject = new window[_oBusinessEventHandler.BusinessEventHandlerObjectKeys[j]]();
                        }
                        catch (Excep) {
                            navigator.notification.alert(("Error while creating the BusinessEventHandlerObject : " + _oBusinessEventHandler.BusinessEventHandlerObjectKeys[j]), ['OK'], "");
                        }

                        if (BusinessEventHandlerObject != null) {
                            BusinessEventHandlerObject.Execute(Parameters);
                        }
                    }
                }

               

               
            }
            OneViewConsole.Debug("ExecuteHandlers End", "BusinessEventFramework.ExecuteHandlers");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "BusinessEventFramework.ExecuteHandlers", Excep);
        }
    }


    this.GenerateAutoDownloadMetadataForBE = function () {
        try {
            OneViewConsole.Debug("GenerateAutoDownloadMetadataForBE Start", "BusinessEventFramework.GenerateAutoDownloadMetadataForBE");

           // alert('GenerateAutoDownloadMetadataForBE');

            var AutoDownloadMetadataForBE = OneViewLocalStorage.Get("AutoDownloadMetadataForBE");

            if (AutoDownloadMetadataForBE != null && AutoDownloadMetadataForBE != "") {
                AutoDownloadMetadataForBE = JSON.parse(AutoDownloadMetadataForBE);
            }
            //alert('AutoDownloadMetadataForBE : ' + AutoDownloadMetadataForBE);
          
            var _oMobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();
            var BusinessEventEntityList = _oMobileAutoSyncMetadataDAO.GetByServiceAndUserId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

            if (BusinessEventEntityList != undefined && BusinessEventEntityList != null) {
                for (var i = 0; i < BusinessEventEntityList.length; i++) {
                    var itrBusinessEventEntity = BusinessEventEntityList[i];
                    var IsEvaluationStatusSuccess = false;
                    var oBusinessEventDefinition = itrBusinessEventEntity.BusinessEventDefinition;
                    var oBusinessEventDefinitionObj;
                    try {
                        oBusinessEventDefinitionObj = new window[oBusinessEventDefinition.Type]();
                    }
                    catch (Excep) {
                        navigator.notification.alert(("Error while creating the object : " + oBusinessEventDefinition.Type), ['OK'], "");
                    }

                    if (oBusinessEventDefinitionObj != undefined) {
                        IsEvaluationStatusSuccess = oBusinessEventDefinitionObj.Evaluate(oBusinessEventDefinition);
                    }

                    //  alert('IsEvaluationStatusSuccess : ' + IsEvaluationStatusSuccess);
                    if (IsEvaluationStatusSuccess == true) {
                        var BusinessEventHandlers = itrBusinessEventEntity.BusinessEventHandlers;
                        for (var j = 0; j < BusinessEventHandlers.length; j++) {
                            var _oBusinessEventHandler = BusinessEventHandlers[j];
                            if (_oBusinessEventHandler.Type == "DefaultMobileEventHandlerMetaData") {


                                var IsDownloadExists = false;
                                for (var k = 0; k < _oBusinessEventHandler.BusinessEventHandlerObjectKeys.length; k++) {
                                    if (_oBusinessEventHandler.BusinessEventHandlerObjectKeys[k] == "AutoProfileDownload_BusinessEventHandler") {
                                        IsDownloadExists = true;
                                        break;
                                    }
                                }

                                //  alert('IsDownloadExists : ' + IsDownloadExists);
                                if (IsDownloadExists == true) {
                                    var IsUpdateMetadata = false;
                                    // alert('AutoDownloadMetadataForBE : ' + AutoDownloadMetadataForBE);
                                    //  alert('AutoDownloadMetadataForBE : ' + JSON.stringify(AutoDownloadMetadataForBE));
                                    var OrganizationStatus;
                                    var UserStatus;
                                    var TemplateStatus;
                                    if (AutoDownloadMetadataForBE == null) {
                                        AutoDownloadMetadataForBE = {};
                                        OrganizationStatus = {};
                                        UserStatus = {}
                                        TemplateStatus = {};
                                    }
                                    else {
                                        //AutoDownloadMetadataForBE = JSON.parse(AutoDownloadMetadataForBE);
                                        OrganizationStatus = AutoDownloadMetadataForBE[parseInt(OneViewSessionStorage.Get("ServiceId"))];                                        
                                        if (OrganizationStatus == null || OrganizationStatus == undefined) {
                                            UserStatus = {}
                                        }
                                        else {                                            
                                            UserStatus = OrganizationStatus[parseInt(OneViewSessionStorage.Get("OrganizationId"))];
                                            
                                            if (UserStatus == null || UserStatus == undefined) {
                                                UserStatus = {}
                                                TemplateStatus = {};
                                            }
                                            else {
                                                TemplateStatus = UserStatus[parseInt(OneViewSessionStorage.Get("LoginUserId"))];
                                                if (TemplateStatus == null || TemplateStatus == undefined) {
                                                    TemplateStatus = {};
                                                }
                                            }
                                        }
                                        
                                    }
                                    //Filter by Parameters
                                    var Parameters = _oBusinessEventHandler.Parameters;
                                    if (Parameters.Type == "DefaultMobileFilterParams") {
                                        var PlaceFilterParam = Parameters.PlaceFilterParam;
                                        var TemplateFilterParam = Parameters.TemplateFilterParam;

                                        if (PlaceFilterParam.DCPlaceList != null && PlaceFilterParam.DCPlaceList.length > 0) {

                                            // FilterParams.DcPlaceDimension = PlaceFilterParam.DCPlaceDimension;
                                            // FilterParams.DcPlaceIds = PlaceFilterParam.DCPlaceList;
                                        }

                                        if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {
                                            // FilterParams.TemplateId = TemplateFilterParam.DCTemplateList;
                                            for (var m = 0; m < TemplateFilterParam.DCTemplateList.length ; m++) {
                                                var TemplateId = TemplateFilterParam.DCTemplateList[m];
                                                if (TemplateStatus[TemplateId] == undefined) {
                                                    TemplateStatus[TemplateId] = { IsDownloadSuccess: false };
                                                }
                                            }
                                        }

                                        if (TemplateStatus != undefined) {
                                              //alert('TemplateStatus 22 : ' + JSON.stringify(TemplateStatus));
                                            UserStatus[parseInt(OneViewSessionStorage.Get("LoginUserId"))] = TemplateStatus;
                                              //alert('UserStatus 22 : ' + JSON.stringify(UserStatus));
                                            OrganizationStatus[parseInt(OneViewSessionStorage.Get("OrganizationId"))] = UserStatus;
                                              //alert('OrganizationId 22 : ' + JSON.stringify(OrganizationId));
                                            AutoDownloadMetadataForBE[parseInt(OneViewSessionStorage.Get("ServiceId"))] = OrganizationStatus;
                                            //alert('AutoDownloadMetadataForBE 22 : ' + JSON.stringify(AutoDownloadMetadataForBE));
                                            IsUpdateMetadata = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


                if (AutoDownloadMetadataForBE != undefined && AutoDownloadMetadataForBE != null && Object.keys(AutoDownloadMetadataForBE).length > 0 && IsUpdateMetadata == true) {
                    OneViewLocalStorage.Save("AutoDownloadMetadataForBE", JSON.stringify(AutoDownloadMetadataForBE));
                }
               
            }
            //alert('AutoDownloadMetadataForBE : ' + OneViewLocalStorage.Get("AutoDownloadMetadataForBE"));


            OneViewConsole.Debug("GenerateAutoDownloadMetadataForBE End", "BusinessEventFramework.GenerateAutoDownloadMetadataForBE");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "BusinessEventFramework.GenerateAutoDownloadMetadataForBE", Excep);
        }
    }

}



function LoginUserWiseBusinessEventDefinition() {

    this.Evaluate = function (param) {
        try {
            OneViewConsole.Debug("Evaluate Start", "LoginUserWiseBusinessEventDefinition.Evaluate");

            var IsValidationSuccess = false;
            if (param.UserIds != null && param.UserIds.length > 0) {
                //alert('param.UserIds : ' + JSON.stringify(param.UserIds));
                if (param.UserIds.indexOf(parseInt(OneViewSessionStorage.Get("LoginUserId"))) != -1) {
                    IsValidationSuccess = true;
                }
            }
            OneViewConsole.Debug("Evaluate End", "LoginUserWiseBusinessEventDefinition.Evaluate");
            //alert('IsValidationSuccess : ' + IsValidationSuccess);
            return IsValidationSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LoginUserWiseBusinessEventDefinition.Evaluate", Excep);
        }
    }
}

//BusinessEventHandlerObjectKey
function AutoProfileDownload_BusinessEventHandler() {

    var MyInstance = this;
    this.Execute = function (Parameters) {
        try {
            OneViewConsole.Debug("Execute Start", "AutoProfileDownload_BusinessEventHandler.Execute");
                        
            if (Parameters.Type == "DefaultMobileFilterParams") {
                var PlaceFilterParam = Parameters.PlaceFilterParam;
                var TemplateFilterParam = Parameters.TemplateFilterParam;
                  
                //var reqParm = { OSGuid: OneViewSessionStorage.Get("ServiceId"), UserId: OneViewSessionStorage.Get("LoginUserId"), TemplateId: '', FromDate: '', ToDate: '', DcPlaceDimension: 0, DcPlaceIds: '', IsDCPlaceGroup: false, IsTemplateGroup: false, IsOnDeviceApprovalProfileNeeded: false, DCPlaceRCOType: -1 };

                var FilterParams = {
                    OSGuid: OneViewSessionStorage.Get("ServiceId"),
                    UserId: OneViewSessionStorage.Get("LoginUserId"),
                    TemplateId: [],
                    FromDate: '',
                    ToDate: '',
                    DcPlaceDimension: 0,
                    DcPlaceIds: [],
                    IsDCPlaceGroup: false,
                    IsTemplateGroup: false,
                    IsOnDeviceApprovalProfileNeeded: false,
                    DCPlaceRCOType: -1
                };

                if (PlaceFilterParam.DCPlaceList != null && PlaceFilterParam.DCPlaceList.length > 0) {
                   
                    //reqParm.DCPlaceDimension = PlaceFilterParam.DCPlaceDimension;
                    //reqParm.DcPlaceIds = PlaceFilterParam.DCPlaceList;
                    //reqParm.TemplateId = new Array();

                    FilterParams.DcPlaceDimension = PlaceFilterParam.DCPlaceDimension;
                    FilterParams.DcPlaceIds = PlaceFilterParam.DCPlaceList;
                }

                if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {
                    //reqParm.TemplateId = TemplateFilterParam.DCTemplateList;
                    //reqParm.DcPlaceIds = new Array();

                    FilterParams.TemplateId = TemplateFilterParam.DCTemplateList;
                }

                //alert('FilterParams : ' + JSON.stringify(FilterParams));

                //var _oProfileDownloadFacade = new ProfileDownloadFacade();
                //_oProfileDownloadFacade.DownLoad(GlobalScope, GlobalxlatService, '', '', GlobalLocation, reqParm);
                       
                //Temporary code for handling single time profile download
                //Todo : (Added By Sangeeta Bhatt(20-06-2018): As per Discussion with Manager, currently for downloading DC Profile only once, we are hard coding this logic)
                var IsDownloadAllowed = false;
                var AutoDownloadMetadataForBE = OneViewLocalStorage.Get("AutoDownloadMetadataForBE");                
                if (AutoDownloadMetadataForBE != null) {
                    AutoDownloadMetadataForBE = JSON.parse(AutoDownloadMetadataForBE);
                    var OrganizationStatus = AutoDownloadMetadataForBE[parseInt(OneViewSessionStorage.Get("ServiceId"))];

                    if (OrganizationStatus != undefined) {
                        var UserStatus = OrganizationStatus[parseInt(OneViewSessionStorage.Get("OrganizationId"))];
                        var TemplateStatus = (UserStatus != undefined && UserStatus != null ? UserStatus[parseInt(OneViewSessionStorage.Get("LoginUserId"))] : undefined);

                        if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {
                            for (var i = 0; i < TemplateFilterParam.DCTemplateList.length; i++) {
                                if (TemplateStatus != undefined && TemplateStatus[TemplateFilterParam.DCTemplateList[i]] != undefined) {
                                    // alert('TemplateStatus[TemplateFilterParam.DCTemplateList[i]].IsDownloadSuccess : ' + TemplateStatus[TemplateFilterParam.DCTemplateList[i]].IsDownloadSuccess);
                                    if (TemplateStatus[TemplateFilterParam.DCTemplateList[i]].IsDownloadSuccess == false) {
                                        IsDownloadAllowed = true;
                                        break;
                                    }
                                }
                            }
                        }
                        else {
                            IsDownloadAllowed = true;
                        }
                    }
                }
                else{
                    IsDownloadAllowed = true;
                }
                //

                if (IsDownloadAllowed == true) {
                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

                    if (NetworkStatus.IsNetworkAvailable == true) {

                        var _oProfileDownloadFacade = new ProfileDownloadFacade();
                        var IsSuccess = _oProfileDownloadFacade.DefaultProfiledownload(FilterParams, GlobalScope, GlobalxlatService, '', '', GlobalLocation);
                        MyInstance.UpdateAutoDownloadStatus(IsSuccess, TemplateFilterParam.DCTemplateList);;
                        
                    }
                }
            }


            OneViewConsole.Debug("Execute End", "AutoProfileDownload_BusinessEventHandler.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AutoProfileDownload_BusinessEventHandler.Execute", Excep);
        }
    }

    this.UpdateAutoDownloadStatus = function (IsSuccess, DCTemplateList) {
        try {
            OneViewConsole.Debug("UpdateAutoDownloadStatus Start", "AutoProfileDownload_BusinessEventHandler.UpdateAutoDownloadStatus");

            if (IsSuccess == true) {
                var IsUpdateMetadata = false;
                var AutoDownloadMetadataForBE = OneViewLocalStorage.Get("AutoDownloadMetadataForBE");
                AutoDownloadMetadataForBE = JSON.parse(AutoDownloadMetadataForBE);
                var OrganizationStatus;
                var UserStatus;
                var TemplateStatus;
                if (AutoDownloadMetadataForBE == null) {
                    AutoDownloadMetadataForBE = {};
                    OrganizationStatus = {};
                    UserStatus = {}
                    TemplateStatus = {};
                }
                else {
                    OrganizationStatus = AutoDownloadMetadataForBE[parseInt(OneViewSessionStorage.Get("ServiceId"))];
                    if (OrganizationStatus == null || OrganizationStatus == undefined) {
                        UserStatus = {}
                    }
                    else {
                        UserStatus = OrganizationStatus[parseInt(OneViewSessionStorage.Get("OrganizationId"))];

                        if (UserStatus == null || UserStatus == undefined) {
                            UserStatus = {}
                            TemplateStatus = {};
                        }
                        else {
                            TemplateStatus = UserStatus[parseInt(OneViewSessionStorage.Get("LoginUserId"))];
                            if (TemplateStatus == null || TemplateStatus == undefined) {
                                TemplateStatus = {};
                            }
                        }
                    }

                }

                if (DCTemplateList != undefined && DCTemplateList != null) {
                    for (var m = 0; m < DCTemplateList.length ; m++) {
                        var TemplateId = DCTemplateList[m];
                        if (TemplateStatus[TemplateId] != undefined) {
                            TemplateStatus[TemplateId].IsDownloadSuccess = true;
                        }
                    }

                    if (TemplateStatus != undefined) {
                        UserStatus[parseInt(OneViewSessionStorage.Get("LoginUserId"))] = TemplateStatus;
                        OrganizationStatus[parseInt(OneViewSessionStorage.Get("OrganizationId"))] = UserStatus;
                        AutoDownloadMetadataForBE[parseInt(OneViewSessionStorage.Get("ServiceId"))] = OrganizationStatus;
                        IsUpdateMetadata = true;
                    }
                }

                if (AutoDownloadMetadataForBE != undefined && Object.keys(AutoDownloadMetadataForBE).length > 0 && IsUpdateMetadata == true) {
                    OneViewLocalStorage.Save("AutoDownloadMetadataForBE", JSON.stringify(AutoDownloadMetadataForBE));
                }
            }

           // alert('UpdateAutoDownloadStatus AutoDownloadMetadataForBE : ' + OneViewLocalStorage.Get("AutoDownloadMetadataForBE"));
            OneViewConsole.Debug("UpdateAutoDownloadStatus End", "AutoProfileDownload_BusinessEventHandler.UpdateAutoDownloadStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AutoProfileDownload_BusinessEventHandler.UpdateAutoDownloadStatus", Excep);
        }
    }
}


function AutoProfileUpload_BusinessEventHandler() {

    var MyInstance = this;

    this.Execute = function (Parameters) {
        try {
            OneViewConsole.Debug("Execute Start", "AutoProfileUpload_BusinessEventHandler.Execute");


            if (Parameters.Type == "DefaultMobileFilterParams") {
                var PlaceFilterParam = Parameters.PlaceFilterParam;
                var TemplateFilterParam = Parameters.TemplateFilterParam;

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

                if (NetworkStatus.IsNetworkAvailable == true) {

                    if (PlaceFilterParam.DCPlaceList != null && PlaceFilterParam.DCPlaceList.length > 0) {

                        //reqParm.DCPlaceDimension = PlaceFilterParam.DCPlaceDimension;
                        //reqParm.DcPlaceIds = PlaceFilterParam.DCPlaceList;
                        //reqParm.TemplateId = new Array();

                        Parameters.DcPlaceDimension = PlaceFilterParam.DCPlaceDimension;
                        Parameters.DcPlaceIds = PlaceFilterParam.DCPlaceList;
                    }

                    if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {
                        //reqParm.TemplateId = TemplateFilterParam.DCTemplateList;
                        //reqParm.DcPlaceIds = new Array();

                        Parameters.TemplateId = TemplateFilterParam.DCTemplateList;
                    }


                    var _oDcFilterParamRequest = new DcFilterParamRequest();
                    _oDcFilterParamRequest.SystemUserId = OneViewSessionStorage.Get("LoginUserId");
                    _oDcFilterParamRequest.IsSynchronized = false;
                    //alert('_oDcFilterParamRequest : ' + JSON.stringify(_oDcFilterParamRequest));

                    var _oDcDAO = new DcDAO();

                    MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFiltersForAutoUpload(_oDcFilterParamRequest, PlaceFilterParam, TemplateFilterParam);
                    var TotalBatches = MyAuditTotalDCCountForUpload / MyAuditUploadLimit;
                    TotalBatches = Math.ceil(TotalBatches);

                    MyAuditUploadProgressValue = 100 / TotalBatches;

                    if (MyAuditTotalDCCountForUpload > 0) {
                        var IsSuccess = UploadDC(_oDcFilterParamRequest, PlaceFilterParam, TemplateFilterParam);

                        if (IsSuccess != true) {
                           // alert(GlobalxlatService.xlat('IN-ER-MLP-001 :: Error while data syncing, please login and try sync manually.'));
                        }
                    }
                    else {
                        //toaster.pop('warning', GlobalxlatService.xlat('Title_Notification'), GlobalxlatService.xlat('NoDataForUpload'));
                       // alert(GlobalxlatService.xlat('NoDataForUpload'));
                        OneViewConsole.Info("No dc available", "AutoProfileUpload_BusinessEventHandler.Execute");
                    }
                }
                else {
                    // alert(GlobalxlatService.xlat('NoInternetConnection'));
                    OneViewConsole.Info("No Internet Connection", "AutoProfileUpload_BusinessEventHandler.Execute");
                }
            }
            OneViewConsole.Debug("Execute End", "AutoProfileUpload_BusinessEventHandler.Execute");
        }
        catch (Excep) {
           // alert("AutoProfileUpload_BusinessEventHandler.Execute 11 : " + Excep);
           // alert("AutoProfileUpload_BusinessEventHandler.Execute 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "AutoProfileUpload_BusinessEventHandler.Execute", Excep);
        }
    }
    
    var UploadDC = function (_oDcFilterParamRequest, PlaceFilterParam, TemplateFilterParam) {

        try {
            OneViewConsole.Debug("UploadDC start", "LandingPageFacade.UploadDC");

         //   var Message = GlobalxlatService.xlat('Upload_confirm_Message');
            
            var MultiMediaValidationResponse = MultiMediaValidation();
            
            if (MultiMediaValidationResponse.IsSuccess == false) {
                Message = GlobalxlatService.xlat(MultiMediaValidationResponse.MessageKey);
            }

         //   var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);
            var IsSuccess = true;
            var IsUploadSuccess = false;
            if (IsSuccess == true && MultiMediaValidationResponse.IsSuccess == true) {

                oOneViewProgressbar.Start(GlobalxlatService.xlat("Auto Sync in-progress"));

                if (MultiMediaValidationResponse.IsSuccess == false) {
                    DeleteUnAvailableMultiMediaSubElements(MultiMediaValidationResponse.ValidationFailedMultiMediaSubElements);
                }

                var _oUploadBO = new UploadBO(GlobalxlatService, '');

                var _oDcPendingTaskBO = new DcPendingTaskBO();
                _oDcPendingTaskBO.Download();

                var IsMultiMediaSubElementsSuccess = _oUploadBO.UploadMultiMediaSubElements();

                if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == true) {

                    var IsSyncDynamicRcoAndAssetNodesSuccess = _oUploadBO.SyncDynamicRcoAndAssetNodes(true);

                    if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == true) {
                     
                        IsUploadSuccess = _oUploadBO.BatchAutoUpload(_oDcFilterParamRequest, PlaceFilterParam, TemplateFilterParam);
                        
                        if (IsUploadSuccess == true && OneViewSessionStorage.Get("ServiceId") == 32) {
                            var DownloadedTGIdList = _oUploadBO.GetTemplateGroupIds();
                            if (DownloadedTGIdList != null && DownloadedTGIdList.length > 0) {
                                var IsMitmarkLandingPageViewReponseSuccess = new MitmarkLandingPageViewReponseBO(GlobalxlatService).Download(DownloadedTGIdList);
                            }
                        }
                        /*
                      
                            oSetDefaultSpinner.Start();
                            //for particular template and place
                            ExecuteGarbageCollector();

                            var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(GlobalxlatService);
                            var LandingPageViewReponseBOIsSuccess = _oLandingPageViewReponseBO.Download();


                            var _oDcProfileSyncStatusBO = new DcProfileSyncStatusBO();
                            var IsDcProfileSyncStatus = _oDcProfileSyncStatusBO.Download(GlobalxlatService);

                            oSetDefaultSpinner.Stop();
                       
                        */

                    }
                    else if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == false) {
                        // alert(GlobalxlatService.xlat('UploadFailed'));
                        //alert(GlobalxlatService.xlat('IN-ER-MLP-001 :: Error while data syncing, please login and try sync manually.'));
                        IsUploadSuccess = false;
                    }
                }
                else if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == false) {
                    //alert(GlobalxlatService.xlat('UploadFailed'));
                    //alert(GlobalxlatService.xlat('IN-ER-MLP-002 :: Error while data syncing, please login and try sync manually.'));
                    IsUploadSuccess = false;
                }

                oOneViewProgressbar.Stop();
            }
            else {
                IsUploadSuccess = false;
                //alert(GlobalxlatService.xlat('IN-ER-MLP-003 :: Error while data syncing, please login and try sync manually.'));
            }

            OneViewConsole.Debug("UploadDC end", "LandingPageFacade.UploadDC");

            return IsUploadSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.UploadDC", Excep);
        }
        finally {
        }
    }

    var MultiMediaValidation = function () {

        try {
            OneViewConsole.Debug("MultiMediaValidation start", "LandingPageFacade.MultiMediaValidation");

            var Result = { IsSuccess: true, MessageKey: "", ValidationFailedMultiMediaSubElements: [] };

            var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
            var Response = _oMultiMediaSubElementsDAO.GetAllMultiMediaUnSyncMultiMediaSubElement();

            var _OneViewAppInfoPlugin = new OneViewAppInfoPlugin();
            //var ValidationFailedMultiMediaSubElements = [];
            var IsFileExist = true;


            for (var i = 0; i < Response.length; i++) {
                var IsFileExist = _OneViewAppInfoPlugin.IsFileExist(Response[i].LocalURL.substring(7));
                if (IsFileExist == false) {
                    Result.ValidationFailedMultiMediaSubElements.push(Response[i]);
                }
            }

            if (Result.ValidationFailedMultiMediaSubElements.length > 0) {
                Result.IsSuccess = false;
                //Result.MessageKey = "IN-MG-LDP-001 :: File not exist In local.Are you sure you want to Upload?";
                Result.MessageKey = "Upload_confirm_Message_ForMultiMediaValidation";
            }
            //alert("Result : " + JSON.stringify(Result));
            OneViewConsole.Debug("MultiMediaValidation end", "LandingPageFacade.MultiMediaValidation");
            return Result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.MultiMediaValidation", Excep);
        }
        finally {
        }
    }

    var DeleteUnAvailableMultiMediaSubElements = function (ValidationFailedMultiMediaSubElementsLst) {

        try {
            OneViewConsole.Debug("DeleteUnAvailableMultiMediaSubElements start", "LandingPageFacade.DeleteUnAvailableMultiMediaSubElements");

            if (ValidationFailedMultiMediaSubElementsLst.length > 0) {
                var _oMultiMediaSubElements = new DefaultMasterDAO("MultiMediaSubElements");
                var MultiMediaSubElementsList = _oMultiMediaSubElements.DeleteByProperty(ValidationFailedMultiMediaSubElementsLst, "Id", "INT");
            }

            OneViewConsole.Debug("DeleteUnAvailableMultiMediaSubElements end", "LandingPageFacade.DeleteUnAvailableMultiMediaSubElements");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.DeleteUnAvailableMultiMediaSubElements", Excep);
        }
        finally {
        }
    }

    var ExecuteGarbageCollector = function () {
        try {
            OneViewConsole.Debug("ExecuteGarbageCollector start", "UploadBO.ExecuteGarbageCollector");


            var _oDcDAO = new DcDAO();
            DcPlaceIdTemplateIdList = _oDcDAO.GetDcPlaceIdTemplateId(OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"));
            var _oDcDeletion = new DcDeletion();

            for (var i = 0; i < DcPlaceIdTemplateIdList.length; i++) {
                var TemplateId = DcPlaceIdTemplateIdList[i].TemplateId;
                var DcPlaceId = DcPlaceIdTemplateIdList[i].DcPlaceId;
                //alert("TemplateId1 : " + TemplateId + " DcPlaceId1 : " + DcPlaceId);
                _oDcDeletion.DeleteCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                _oDcDeletion.DeleteInCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                _oDcDeletion.DeleteInCompleteAndSyncedDataInDays(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                _oDcDeletion.DeleteInCompleteAndSyncedDataFromNow(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                _oDcDeletion.DeleteCompletedSyncAndApprovedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                _oDcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
            }

            OneViewConsole.Debug("ExecuteGarbageCollector end", "UploadBO.ExecuteGarbageCollector");
        }
        catch (Excep) {
            //alert("Excep : " + JSON.stringify(Excep) + Excep)
            throw oOneViewExceptionHandler.Create("BO", "UploadBO.ExecuteGarbageCollector", Excep);
        }
    }

}

function AutoActionFollowUpProfileDownload_BusinessEventHandler() {

    var MyInstance = this;

    this.Execute = function (Parameters) {
        try {
            OneViewConsole.Debug("Execute Start", "AutoActionFollowUpProfileDownload_BusinessEventHandler.Execute");


            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpDownloadFacade.DownLoad");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {

              
                var FilterParams = MyInstance.GetActionFollowUpProfileRequest(Parameters);

                if (FilterParams != undefined && (FilterParams.TemplateId.length > 0 || FilterParams.DcPlaceIds.length > 0)) {
                    oOneViewProgressbar.Start(GlobalxlatService.xlat("Auto Sync in-progress"));
                    //alert('FilterParams : ' + JSON.stringify(FilterParams));
                    var _oActionFollowUpDownloadFacade = new ActionFollowUpDownloadFacade();
                    _oActionFollowUpDownloadFacade.DefaultProfiledownload(FilterParams, GlobalxlatService);
                    oOneViewProgressbar.Stop();
                    
                }
               
            }



            OneViewConsole.Debug("Execute End", "AutoActionFollowUpProfileDownload_BusinessEventHandler.Execute");
        }
        catch (Excep) {
            // alert("AutoActionFollowUpProfileDownload_BusinessEventHandler.Execute 11 : " + Excep);
            // alert("AutoActionFollowUpProfileDownload_BusinessEventHandler.Execute 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "AutoActionFollowUpProfileDownload_BusinessEventHandler.Execute", Excep);
        }
    }


    this.GetActionFollowUpProfileRequest = function (Parameters) {
        try {
            OneViewConsole.Debug("GetActionFollowUpProfileRequest Start", "AutoActionFollowUpProfileDownload_BusinessEventHandler.GetActionFollowUpProfileRequest");

            var FilterParams;
            if (Parameters.Type == "DefaultMobileFilterParams") {

                var _oActionFollowUpDAO = new ActionFollowUpDAO();
                var UserProfileViewLst = "";
                var ServiceId = OneViewSessionStorage.Get("ServiceId");
                var UserId = OneViewSessionStorage.Get("LoginUserId");

                var PlaceFilterParam = Parameters.PlaceFilterParam;
                var TemplateFilterParam = Parameters.TemplateFilterParam;

                var FilterParams = {
                    OSGuid: ServiceId,
                    UserId: UserId,
                    TemplateId: [],
                    FromDate: '',
                    ToDate: '',
                    DcPlaceDimension: 0,
                    DcPlaceIds: []
                }


                if (PlaceFilterParam.DCPlaceList != null && PlaceFilterParam.DCPlaceList.length > 0) {

                    //Place
                    UserProfileViewLst = new ActionFollowUpDownloadIL('').GetProfileDcPlaceView(ServiceId, UserId);

                    if (UserProfileViewLst != null) {
                        UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                        for (var i = 0; i < PlaceFilterParam.DCPlaceList.length ; i++) {
                            for (var j = 0; j < UserProfileViewLst.length ; j++) {
                                //  var IsDownloaded = false;
                                if (PlaceFilterParam.DCPlaceList[i] = UserProfileViewLst[j].Id) {
                                    //  IsDownloaded = _oActionFollowUpDAO.IsDcPlaceExist(ServiceId, UserId, UserProfileViewLst[j].Id);
                                    //   if (IsDownloaded != true) {
                                    FilterParams.DcPlaceIds.push(UserProfileViewLst[j].Id);
                                    //   }
                                }
                            }
                        }

                    }
                }

                if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {

                    UserProfileViewLst = new ActionFollowUpDownloadIL('').GetProfileTemplateView(ServiceId, UserId);

                    if (UserProfileViewLst != null) {
                        UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                        for (var i = 0; i < TemplateFilterParam.DCTemplateList.length ; i++) {
                            for (var j = 0; j < UserProfileViewLst.length ; j++) {
                                // var IsDownloaded = false;
                                if (TemplateFilterParam.DCTemplateList[i] = UserProfileViewLst[j].Id) {
                                    //  IsDownloaded = _oActionFollowUpDAO.IsTemplateExist(ServiceId, UserId, UserProfileViewLst[j].Id);
                                    //   if (IsDownloaded != true) {
                                    FilterParams.TemplateId.push(UserProfileViewLst[j].Id);
                                    //  }
                                }
                            }
                        }

                    }


                }
            }
            OneViewConsole.Debug("GetActionFollowUpProfileRequest End", "AutoActionFollowUpProfileDownload_BusinessEventHandler.GetActionFollowUpProfileRequest");

            return FilterParams;
        }
        catch (Excep) {
            // alert("AutoActionFollowUpProfileDownload_BusinessEventHandler.GetActionFollowUpProfileRequest 11 : " + Excep);
            // alert("AutoActionFollowUpProfileDownload_BusinessEventHandler.GetActionFollowUpProfileRequest 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "AutoActionFollowUpProfileDownload_BusinessEventHandler.GetActionFollowUpProfileRequest", Excep);
        }
    }

}


function AutoActionFollowUpUpload_BusinessEventHandler() {

    var MyInstance = this;
    
    this.Execute = function (Parameters) {
        try {
            OneViewConsole.Debug("Execute Start", "AutoActionFollowUpUpload_BusinessEventHandler.Execute");
           
            var IsSuccess = false;
            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ActionFollowUpDownloadFacade.DownLoad");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {
                var IdList = MyInstance.GetIdListForDownload(Parameters);
                IsSuccess = MyInstance.Upload(IdList);
            }
           // alert('IsSuccess : ' + IsSuccess);
            OneViewConsole.Debug("Execute End", "AutoActionFollowUpUpload_BusinessEventHandler.Execute");

            return IsSuccess;
        }
        catch (Excep) {
            // alert("AutoActionFollowUpUpload_BusinessEventHandler.Execute 11 : " + Excep);
            // alert("AutoActionFollowUpUpload_BusinessEventHandler.Execute 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "AutoActionFollowUpUpload_BusinessEventHandler.Execute", Excep);
        }
    }

    this.GetIdListForDownload = function (Parameters) {
        try {
            OneViewConsole.Debug("GetIdListForDownload Start", "AutoActionFollowUpUpload_BusinessEventHandler.GetIdListForDownload");

            var IdList = [];
            var FilterParams;
            if (Parameters.Type == "DefaultMobileFilterParams") {
                var PlaceFilterParam = Parameters.PlaceFilterParam;
                var TemplateFilterParam = Parameters.TemplateFilterParam;

                if (PlaceFilterParam.DCPlaceList != null && PlaceFilterParam.DCPlaceList.length > 0) {
                    for (var i = 0; i < PlaceFilterParam.DCPlaceList.length; i++) {
                        IdList.push({ 'Id': PlaceFilterParam.DCPlaceList[i] });
                    }
                    
                }

                if (TemplateFilterParam.DCTemplateList != null && TemplateFilterParam.DCTemplateList.length > 0) {
                    navigator.notification.alert("Upload ActionFollowUp as per templates not implemented", ['OK'], "");
                }
            }

            OneViewConsole.Debug("GetIdListForDownload End", "AutoActionFollowUpUpload_BusinessEventHandler.GetIdListForDownload");

            return IdList;
        }
        catch (Excep) {
            // alert("AutoActionFollowUpUpload_BusinessEventHandler.GetIdListForDownload 11 : " + Excep);
            // alert("AutoActionFollowUpUpload_BusinessEventHandler.GetIdListForDownload 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "AutoActionFollowUpUpload_BusinessEventHandler.GetIdListForDownload", Excep);
        }
    }

    this.Upload = function (IdList) {

        try {
            OneViewConsole.Debug("Upload start", "MyActionFacade.Upload");

            var IsSuccess = true;
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

            var UnSyncActionResolveCount = new MyActionDAO().GetUnSyncActionResolveCount(ServiceId, -1, -1, LoginUserId);

            if (UnSyncActionResolveCount > 0) {

                var IsTemplateView = false;
                if (IsTemplateView == false) {

                    var _oUploadBO = new UploadBO(GlobalxlatService, '');
                    var IsMultiMediaSubElementsSuccess = _oUploadBO.UploadMultiMediaSubElements();

                    if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == true) {
                        var _oActionFollowUpUploadBO = new ActionFollowUpUploadBO(GlobalScope, GlobalxlatService);                        
                        IsSuccess = _oActionFollowUpUploadBO.AutoUpload(IdList, LoginUserId, IsTemplateView, -1);
                    }
                    else {
                        IsSuccess = false;
                    }
                }
               

            }
            else {              
                OneViewConsole.Info("No resolve action available", "MyActionFacade.Upload");
            }

            OneViewConsole.Debug("Upload end", "MyActionFacade.Upload");

            return IsSuccess;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyActionFacade.Upload", GlobalxlatService);
        }
        finally {
        }
    }
}

/*
var AutoDownloadMetadataForBE = {
30: { //Service

    36:{ //Org
            94736: { //User
                3: //template
                    {
                        IsDownloadSuccess: false
                    },

                26://template
                    {
                        IsDownloadSuccess: false
                    },

            },
        }
    }
};

*/
