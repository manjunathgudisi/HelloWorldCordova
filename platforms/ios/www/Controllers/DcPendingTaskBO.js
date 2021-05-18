var NotificationResultObj = [];
// DcPendingTaskBO
function DcPendingTaskBO() {

    // Current Scope
    var MyInstance = this;

    /// <summary>
    /// Create DcPendingTasks
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "DcPendingTaskBO.Download");

            var _DefaultMasterDAO = new DefaultMasterDAO("DcPendingTaskEntity");
            var IsExist = _DefaultMasterDAO.IsTableExist();
           
            if (IsExist == true) {

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "LoginFacade.Login");

                if (NetworkStatus.IsNetworkAvailable == true) {

                    if (OneViewSessionStorage.Get("ServiceId") == 1 && OneViewSessionStorage.Get("ServiceId") == 2) {
                        var _oDcPendingTaskIL = new DcPendingTaskIL();
                        var _oDcPendingTaskDetails = _oDcPendingTaskIL.GetDcPendingTaskDetails(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

                        //alert(JSON.stringify(_oDcPendingTaskDetails));

                        if (_oDcPendingTaskDetails != null && _oDcPendingTaskDetails.IsAnyException == false) {
                            MyInstance.Create(_oDcPendingTaskDetails.DcPendingTaskDTOLst);
                        }
                    }

                    MyInstance.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));
                }
            }

            OneViewConsole.Debug("Download end", "DcPendingTaskBO.Download");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.Download", Excep);         
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }   
    }

    /// <summary>
    /// Create
    /// </summary>
    /// <param name="DcPendingTaskDTOLst">DcPendingTaskDTOLst</param> 
    this.Create = function (DcPendingTaskDTOLst) {

        try {
            OneViewConsole.Debug("Create start", "DcPendingTaskBO.Create");

            var _oDefaultMasterDAO = new DefaultMasterDAO("DcPendingTaskEntity");
            var Count = _oDefaultMasterDAO.Count();

            var _oDcPendingTaskNormalizer = new DcPendingTaskNormalizer();
            var _oDcPendingTaskDAO = new DcPendingTaskDAO();

            if (DcPendingTaskDTOLst.length > 0) {
                _oDcPendingTaskDAO.DeleteByUserId(DcPendingTaskDTOLst[0].DcUserId);
            }

            for (var i = 0; i < DcPendingTaskDTOLst.length; i++) {

                var oDcPendingTask = _oDcPendingTaskNormalizer.Normalize(DcPendingTaskDTOLst[i]);

                var _oDcFilterParamRequest = new DcFilterParamRequest();
                _oDcFilterParamRequest.DcPlaceId = DcPendingTaskDTOLst[i].DcPlaceId;
                _oDcFilterParamRequest.TemplateNodeId = DcPendingTaskDTOLst[i].TemplateNodeId;
                _oDcFilterParamRequest.SystemUserId = DcPendingTaskDTOLst[i].DcUserId;

                if (_oDcFilterParamRequest.ShiftId != 0)
                    _oDcFilterParamRequest.ShiftId = DcPendingTaskDTOLst[i].ShiftId;

                _oDcFilterParamRequest.IsCompleted = true;
                var CompletedDcInfo = _oDcPendingTaskDAO.GetAllDcInfoWithFilters(_oDcFilterParamRequest);
                //alert(JSON.stringify(CompletedDcInfo));

                _oDcFilterParamRequest.IsCompleted = false;
                var InCompletedDcInfo = _oDcPendingTaskDAO.GetAllDcInfoWithFilters(_oDcFilterParamRequest);
                //alert(JSON.stringify(InCompletedDcInfo));

                oDcPendingTask.CompletedRecordsLocal = CompletedDcInfo.length;
                oDcPendingTask.InCompletedRecordsLocal = InCompletedDcInfo.length;

                oDcPendingTask.CompletedRecordsServer = ValidateDcIds(DcPendingTaskDTOLst[i].CompletedRecordsDcIdList, CompletedDcInfo);
                oDcPendingTask.InCompletedRecordsServer = ValidateDcIds(DcPendingTaskDTOLst[i].InCompletedRecordsDcIdList, InCompletedDcInfo);

                _oDefaultMasterDAO.Create(oDcPendingTask, Count);
                Count += 1;
            }

            //alert("DcPendingTask created successfully");

            OneViewConsole.Debug("Create end", "DcPendingTaskBO.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.Create", Excep);         
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// GetAll
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    this.GetAll = function (DcUserId) {

        try {
            OneViewConsole.Debug("GetAll start", "DcPendingTaskBO.GetAll");

            //var _oLVShiftHandler = new LVShiftHandler();
            //var CurrentShift = _oLVShiftHandler.GetCurrentShift();

            var _oDcPendingTaskDAO = new DcPendingTaskDAO();
            var DcPendingTaskLst = _oDcPendingTaskDAO.GetAll(DcUserId);
            //alert(JSON.stringify(DcPendingTaskLst));

            return DcPendingTaskLst;
           
            OneViewConsole.Debug("GetAll end", "DcPendingTaskBO.GetAll");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.GetAll", Excep);
        }
        finally {           
        }
    }

    /// <summary>
    /// GetAll Notification Count
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    this.UpdateTopRightBell = function (DcUserId) {

        try {
            OneViewConsole.Debug("UpdateTopRightBell start", "DcPendingTaskBO.UpdateTopRightBell");
            
            //var _oLVShiftHandler = new LVShiftHandler();
            //var CurrentShift = _oLVShiftHandler.GetCurrentShift();
            if (OneViewSessionStorage.Get("ServiceId") == 62) {             
           
                PAHTNotificationServer();
            }
            else if (OneViewSessionStorage.Get("ServiceId") == 61) {

                var _oDcPendingTaskDAO = new DcPendingTaskDAO();
                var DcPendingTaskCount = _oDcPendingTaskDAO.DeleteNotificationByDate(DcUserId, OneViewSessionStorage.Get("ServiceId"));

                ShowNotificationCount();
                CallRFLNotificationServer();
                RFLNotificationServer();
            }
            else {
                var _oDcPendingTaskDAO = new DcPendingTaskDAO();
                var DcPendingTaskCount = _oDcPendingTaskDAO.GetAllNotificationCount(DcUserId);
                UpdateUI("TopRightBell", DcPendingTaskCount);
            }
            //alert(DcPendingTaskCount);

           
           
            OneViewConsole.Debug("UpdateTopRightBell end", "DcPendingTaskBO.UpdateTopRightBell");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.UpdateTopRightBell", Excep);
        }
        finally {
        }
    }


    var pollServer = function () {
        //alert("pollServer")
        // var RequestParam = { "OSGuid": OneViewSessionStorage.Get("ServiceId"), "UserId": OneViewSessionStorage.Get("LoginUserId") };
        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        var LoginUserName = OneViewSessionStorage.Get("LoginUserName");
        var LoginUserPassword = OneViewSessionStorage.Get("LoginUserPassword");
        var LoginUserOrgName = OneViewSessionStorage.Get("LoginUserOrgName");
        var urlObj = OneViewGlobalPortalURlName + "Login/MobileLoginRFL?UserName=" + LoginUserName + "&Password=" + LoginUserPassword + "&OrganizationName=" + LoginUserOrgName + "&ServiceId=" + ServiceId + "&reqPage=PAHT/GetNotificationCount";
        window.setTimeout(function () {
            $.ajax({
                //url: OneViewGlobalPortalURlName + "PAHT/GetNotificationCountMobileTest",

               // url:"http://10.20.25.6:8090//OneViewQA/Portal/Login/MobileLoginRFL?UserName=Porter1&Password=Porter1&OrganizationName=PAHT&ServiceId=62&reqPage=PAHT/GetNotificationCount",
                url: urlObj,
                //data: JSON.stringify({ userId: OneViewSessionStorage.Get("LoginUserId")}),
                type: "POST",
                success: function (result) {
                  //  alert("result => "+result)
                    //SUCCESS LOGIC
                   // $(".notification-badge").text(result);
                    UpdateUI("TopRightBell", result);
                    pollServer();
                },
                error: function () {
                    alert("error")
                    //ERROR HANDLING
                    pollServer();
                }
            });

        }, 30000);  //Every 30 Seconds 
        /*
        window.setTimeout(function () {
        var RequestParam = { "OSGuid": OneViewSessionStorage.Get("ServiceId"), "UserId": OneViewSessionStorage.Get("LoginUserId") };
        var _oOneViewChannel = new OneViewChannel();     
        _oOneViewChannel.url = OneViewGlobalPortalURlName + "PAHT/GetNotificationCount";
        _oOneViewChannel.parameter = JSON.stringify(RequestParam);
            var oUserProfileLst = _oOneViewChannel.Send();
            UpdateUI("TopRightBell", oUserProfileLst);        
        }, 30000); 
        */

    }

    var CallRFLNotificationServer = function () {
        try {
            OneViewConsole.Debug("RFLNotificationServer start", "DcPendingTaskBO.RFLNotificationServer");

            //var RequestParam = { "OSGuid": OneViewSessionStorage.Get("ServiceId"), "UserId": OneViewSessionStorage.Get("LoginUserId") };
            var NotificationCount = 0;
            if (OneViewSessionStorage.Get("ServiceId") != null && OneViewSessionStorage.Get("LoginUserId") != null) {
             //   window.setTimeout(function () {

                    var RFLMobileNotificationResult = RFLNotificationIL();
                    if (RFLMobileNotificationResult != null && RFLMobileNotificationResult.IsAnyException == false) {
                        var RFLNotificationDTOLst = RFLMobileNotificationResult.RFLNotificationDTOLst;
                        if (RFLNotificationDTOLst.length > 0) {
                            //  NotificationResultObj = clone(RFLNotificationDTOLst);
                            //UpdateUI("TopRightBell", RFLMobileNotificationResult.Count);
                            NotificationCount = InsertNotification(RFLNotificationDTOLst);
                        }
                    }
                    if ((NotificationCount != 0 || NotificationCount != "0") && NotificationCount != "" && NotificationCount !== null && NotificationCount != undefined) {
                        ShowNotificationCount();
                    }
                    //alert("11");
                    //RFLNotificationServer();

              //  }, RFLcountdown);
            }
            OneViewConsole.Debug("RFLNotificationServer end", "DcPendingTaskBO.RFLNotificationServer");
            //return RFLMobileNotificationResult;
        }
        catch (Excep) {
            // throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.RFLNotificationServer", Excep);
        }
        finally {
        }

    }

    var RFLcountdown = 30 * 60 * 1000;
    //var RFLcountdown = 1000;
    var RFLNotificationServer = function () {
        try {
            OneViewConsole.Debug("RFLNotificationServer start", "DcPendingTaskBO.RFLNotificationServer");

            //var RequestParam = { "OSGuid": OneViewSessionStorage.Get("ServiceId"), "UserId": OneViewSessionStorage.Get("LoginUserId") };
            var NotificationCount = 0;
            if (OneViewSessionStorage.Get("ServiceId") != null && OneViewSessionStorage.Get("LoginUserId") != null) {
                window.setTimeout(function () {

                    var RFLMobileNotificationResult = RFLNotificationIL();
                    if (RFLMobileNotificationResult != null && RFLMobileNotificationResult.IsAnyException == false) {
                        var RFLNotificationDTOLst = RFLMobileNotificationResult.RFLNotificationDTOLst;
                        if (RFLNotificationDTOLst.length > 0) {
                          //  NotificationResultObj = clone(RFLNotificationDTOLst);
                            //UpdateUI("TopRightBell", RFLMobileNotificationResult.Count);
                            NotificationCount= InsertNotification(RFLNotificationDTOLst);
                        }                      
                    }
                    if ((NotificationCount != 0 || NotificationCount != "0"  ) && NotificationCount != "" && NotificationCount !== null && NotificationCount != undefined ) {
                        ShowNotificationCount();
                    }
                    //alert("11");
                    RFLNotificationServer();

                }, RFLcountdown);
            }
            OneViewConsole.Debug("RFLNotificationServer end", "DcPendingTaskBO.RFLNotificationServer");
            //return RFLMobileNotificationResult;
        }
        catch (Excep) {
           // throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.RFLNotificationServer", Excep);
        }
        finally {
        }

    }


    var RFLNotificationIL = function () {
        try {
            OneViewConsole.Debug("RFLNotification start", "DcPendingTaskBO.RFLNotification");
            var RFLMobileNotificationResult = null;
            if (OneViewSessionStorage.Get("ServiceId") != null && OneViewSessionStorage.Get("LoginUserId") != null) {
                // window.setTimeout(function () {
                var RequestParam = { "OSGuid": OneViewSessionStorage.Get("ServiceId"), "UserId": OneViewSessionStorage.Get("LoginUserId") };
                var _oOneViewChannel = new OneViewChannel();
                _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetRFLMobileNotification_json";
                _oOneViewChannel.parameter = JSON.stringify(RequestParam);
                RFLMobileNotificationResult = _oOneViewChannel.Send({ "ShowExceptionMessage": false });
                if (RFLMobileNotificationResult != null) {
                    var RFLMobileNotificationResult = JSON.parse(RFLMobileNotificationResult.GetRFLMobileNotification_jsonResult);
                }
                //alert(JSON.stringify(RFLMobileNotificationResult));
                //UpdateUI("TopRightBell", oUserProfileLst);        
                //  }, 30000); 
            }

            OneViewConsole.Debug("RFLNotification end", "DcPendingTaskBO.RFLNotification");
            return RFLMobileNotificationResult;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.RFLNotification", Excep);
        }
        finally {
        } 

    }



    var PAHTNotificationServer = function () {
        try {
            OneViewConsole.Debug("PAHTNotificationServer start", "DcPendingTaskBO.PAHTNotificationServer");

            //var RequestParam = { "OSGuid": OneViewSessionStorage.Get("ServiceId"), "UserId": OneViewSessionStorage.Get("LoginUserId") };
            if (OneViewSessionStorage.Get("ServiceId") != null && OneViewSessionStorage.Get("LoginUserId") != null) {
                window.setTimeout(function () {

                    var PAHTMobileNotificationResult = PAHTNotificationIL();
                    if (PAHTMobileNotificationResult != null && PAHTMobileNotificationResult.IsAnyException == false) {
                        var PAHTNotificationDTOLst = PAHTMobileNotificationResult.PAHTNotificationDTOLst;
                        if (PAHTNotificationDTOLst.length > 0) {
                            NotificationResultObj = clone(PAHTNotificationDTOLst);
                            UpdateUI("TopRightBell", PAHTMobileNotificationResult.Count);
                        }
                        else {
                            NotificationResultObj = [];
                            UpdateUI("TopRightBell", 0);
                        }
                    }
                    else {
                        NotificationResultObj = [];
                        UpdateUI("TopRightBell", 0);
                    }
                    //alert("11");
                    PAHTNotificationServer();

                }, 30000);
            }
            OneViewConsole.Debug("PAHTNotificationServer end", "DcPendingTaskBO.PAHTNotificationServer");
            //return RFLMobileNotificationResult;
        }
        catch (Excep) {
            // throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.RFLNotificationServer", Excep);
        }
        finally {
        }

    }

    var PAHTNotificationIL = function () {
        try {
            OneViewConsole.Debug("PAHTNotificationIL start", "DcPendingTaskBO.PAHTNotificationIL");
            var PAHTMobileNotificationResult = null;
            if (OneViewSessionStorage.Get("ServiceId") != null && OneViewSessionStorage.Get("LoginUserId") != null) {
                // window.setTimeout(function () {
                var RequestParam = { "OSGuid": OneViewSessionStorage.Get("ServiceId"), "UserId": OneViewSessionStorage.Get("LoginUserId") };
                var _oOneViewChannel = new OneViewChannel();
                _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetPAHTMobileNotification_json";
                _oOneViewChannel.parameter = JSON.stringify(RequestParam);
                PAHTMobileNotificationResult = _oOneViewChannel.Send({ "ShowExceptionMessage": false });
                if (PAHTMobileNotificationResult != null) {
                    var PAHTMobileNotificationResult = JSON.parse(PAHTMobileNotificationResult.GetPAHTMobileNotification_jsonResult);
                }
                //alert(JSON.stringify(RFLMobileNotificationResult));
                //UpdateUI("TopRightBell", oUserProfileLst);        
                //  }, 30000); 
            }

            OneViewConsole.Debug("PAHTNotificationIL end", "DcPendingTaskBO.PAHTNotificationIL");
            return PAHTMobileNotificationResult;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.RFLNotification", Excep);
        }
        finally {
        }

    }

    /// <summary>
    /// Create
    /// </summary>
    /// <param name="DcIdList">DcIdList</param> 
    /// <param name="DcInfo">DcInfo</param> 
    var ValidateDcIds = function (DcIdList, DcInfo) {
        try {
            OneViewConsole.Debug("ValidateDcIds start", "DcPendingTaskBO.ValidateDcIds");

            var DcCount = DcIdList.length;

            for (var i = 0; i < DcInfo.length; i++) {
                if (DcIdList.indexOf(DcInfo[i].Id) != -1) {
                    DcCount = DcCount - 1;
                }
            }

            return DcCount;

            OneViewConsole.Debug("ValidateDcIds end", "DcPendingTaskBO.ValidateDcIds");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.ValidateDcIds", Excep);
        }
        finally {           
        }
    }

    /// <summary>
    /// GetAll
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    this.UpdateStatus = function (IsNew, IsCompleted) {

        try {
            OneViewConsole.Debug("GetAll start", "DcPendingTaskBO.GetAll");
           
            var DcUserId = OneViewSessionStorage.Get("LoginUserId");
            var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
            var DcPlaceName = OneViewSessionStorage.Get("DcPlaceName");
            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");

            var _oDcPendingTaskDAO = new DcPendingTaskDAO();

            if (IsNew == true) {
                if (IsCompleted == true || IsCompleted == 'true')
                    _oDcPendingTaskDAO.IncreaseCompletedRecordsLocalCount(DcUserId, DcPlaceId, TemplateNodeId, DcPlaceName);
                else 
                    _oDcPendingTaskDAO.IncreaseInCompletedRecordsLocalCount(DcUserId, DcPlaceId, TemplateNodeId, DcPlaceName);
            }
            else {               
                var IsDcCompletedBeforeEdit = OneViewSessionStorage.Get("IsDcCompletedBeforeEdit");              
                if ((IsDcCompletedBeforeEdit == true || IsDcCompletedBeforeEdit == 'true') && (IsCompleted == false || IsCompleted == 'false'))
                    _oDcPendingTaskDAO.ChangeCompletedToInComplete(DcUserId, DcPlaceId, TemplateNodeId, DcPlaceName);
                else if ((IsDcCompletedBeforeEdit == false || IsDcCompletedBeforeEdit == 'false') && (IsCompleted == true || IsCompleted == 'true'))
                    _oDcPendingTaskDAO.ChangeInCompletedToComplete(DcUserId, DcPlaceId, TemplateNodeId, DcPlaceName);
            }

            OneViewConsole.Debug("GetAll end", "DcPendingTaskBO.GetAll");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.GetAll", Excep);
        }
        finally {
        }
    }

    /// <summary>
    /// ShowNotificationCount
    /// </summary>
    /// <param name="Count">Count</param> 
    var ShowNotificationCount = function (Id, Count) {

        try {
            OneViewConsole.Debug("ShowNotificationCount start", "DcPendingTaskBO.ShowNotificationCount");

            var oDcPendingTaskDAO = new DcPendingTaskDAO();
            var NotificationCountResult = oDcPendingTaskDAO.GetNotificationCountByMessageReadStatus(OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId") );
            if (NotificationCountResult.length > 0) {
                UpdateUI("TopRightBell", NotificationCountResult.length);
            }
            else {
                UpdateUI("TopRightBell", 0);
            }

            OneViewConsole.Debug("ShowNotificationCount end", "DcPendingTaskBO.ShowNotificationCount");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.ShowNotificationCount", Excep);
        }
        finally {
        }
    }

    /// <summary>
    /// UpdateUI
    /// </summary>
    /// <param name="Count">Count</param> 
    var UpdateUI = function (Id, Count) {

        try {
            OneViewConsole.Debug("UpdateUI start", "DcPendingTaskBO.UpdateUI");

            var _oDOM = new DOM();

            if (Count > 0) {
                var Html = '<div class="badge badge-energized">' + Count + '</div>';              
                _oDOM.AddInnerHtml(Id, Html);
            }
            else {
                _oDOM.RemoveInnerHtml(Id);
            }

            OneViewConsole.Debug("UpdateUI end", "DcPendingTaskBO.UpdateUI");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.UpdateUI", Excep);
        }
        finally {
        }
    }

    /// <summary>
    /// OpenBellPopUp
    /// </summary>
    /// <param name="Count"></param> 
    this.OpenBellPopUp = function ($scope, DcUserId) {

        try {
            OneViewConsole.Debug("OpenBellPopUp start", "DcPendingTaskBO.OpenBellPopUp");
            //alert("OpenBellPopUp");
            //var RequestParam = { "OSGuid": OneViewSessionStorage.Get("ServiceId"), "UserId": OneViewSessionStorage.Get("LoginUserId") };
            if (OneViewSessionStorage.Get("ServiceId") == 62) {

                PAHTNotificationBellPopUp($scope);
            }
            else if (OneViewSessionStorage.Get("ServiceId") == 61) {

                RFLNotificationBellPopUp($scope);
            }
            else {
                var DcPendingTaskLst = MyInstance.GetAll(DcUserId);

                var Html = "";

                var Header = 'Today';
                //var Header = new DateTime().GetDate();

                Html += '<div class="item item-divider">' +
                    Header +
                    '</div>';

                for (var i = 0; i < DcPendingTaskLst.length; i++) {

                    var Place = (DcPendingTaskLst[i].DcPlaceId > 0) ? DcPendingTaskLst[i].DcPlaceName : DcPendingTaskLst[i].CustomPlaceName;
                    //Place = Place + '<span class="badge badge-positive">' + DcPendingTaskLst[i].Occurence + '</span>';
                    var Occurence = (DcPendingTaskLst[i].Occurence > 0) ? '<span class="badge badge-energized">' + DcPendingTaskLst[i].Occurence + '</span>' : "";

                    Html += '<div class="item">' +
                        '<h2>' + DcPendingTaskLst[i].TemplateNodeName + '</h2>' +
                        '<p>' + Place + '</p>' +
                        Occurence +
                        '</div>';
                }

                if (DcPendingTaskLst.length > 0) {

                    var _oDOM = new DOM();
                    _oDOM.AddInnerHtml("NotoficationPanel", Html);

                    $scope.Notification = true;
                }

            }

            OneViewConsole.Debug("OpenBellPopUp end", "DcPendingTaskBO.OpenBellPopUp");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.OpenBellPopUp", Excep);
        }
        finally {
        }
    }

    var pollServerNotificationDetails = function ($scope) {
        try {
            OneViewConsole.Debug("pollServerNotificationDetails start", "DcPendingTaskBO.pollServerNotificationDetails");
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var LoginUserName = OneViewSessionStorage.Get("LoginUserName");
            var LoginUserPassword = OneViewSessionStorage.Get("LoginUserPassword");
            var LoginUserOrgName = OneViewSessionStorage.Get("LoginUserOrgName");
            var urlObj = OneViewGlobalPortalURlName + "Login/MobileLoginRFL?UserName=" + LoginUserName + "&Password=" + LoginUserPassword + "&OrganizationName=" + LoginUserOrgName + "&ServiceId=" + ServiceId + "&reqPage=PAHT/GetNotificationsByUser";

            $.ajax({
                //url: OneViewGlobalPortalURlName + "PAHT/GetNotificationCountMobileTest",
               // url: "http://10.20.25.6:8090//OneViewQA/Portal/Login/MobileLoginRFL?UserName=Porter1&Password=Porter1&OrganizationName=PAHT&ServiceId=62&reqPage=PAHT/GetNotificationsByUser",
                url: urlObj,
                //data: JSON.stringify({ userId: OneViewSessionStorage.Get("LoginUserId")}),
                type: "POST",
                success: function (result) {
                    // alert("result => " + JSON.stringify(result));
                    pollServerNotificationOpenBellPopUp(result, $scope);
                },
                error: function () {
                    //alert("error")
                    //ERROR HANDLING
                    //pollServer();
                }
            });
            OneViewConsole.Debug("pollServerNotificationDetails end", "DcPendingTaskBO.pollServerNotificationDetails");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.pollServerNotificationDetails", Excep);
        }

    }

    var pollServerNotificationOpenBellPopUp = function (DcPendingTaskLst, $scope) {
        try {
            OneViewConsole.Debug("pollServerNotificationOpenBellPopUp start", "DcPendingTaskBO.pollServerNotificationOpenBellPopUp");
            var Html = "";
            //alert(JSON.stringify(DcPendingTaskLst));
            var Header = 'Today';
            //var Header = new DateTime().GetDate();

            Html += '<div class="item item-divider">' +
                Header +
                '</div>';

            for (var i = 0; i < DcPendingTaskLst.length; i++) {

                // var Place = (DcPendingTaskLst[i].DcPlaceId > 0) ? DcPendingTaskLst[i].DcPlaceName : DcPendingTaskLst[i].CustomPlaceName;
                //Place = Place + '<span class="badge badge-positive">' + DcPendingTaskLst[i].Occurence + '</span>';
                var Occurence = '<span class="badge badge-energized">3</span>';

                //Html += '<div class="item">' +
                //    '<h2>' + Header + '</h2>' +
                //    '<p>hello</p>' +
                //    Occurence +
                //    '</div>';

                Html += '<div class="item">' +
                    '<h2>' + DcPendingTaskLst[i].title + '</h2>' +
                    '<p>' + DcPendingTaskLst[i].Details + '</p>' +
                    //    Occurence +
                    '</div>';
            }


            if (DcPendingTaskLst.length > 0) {

                var _oDOM = new DOM();

                _oDOM.AddInnerHtml("NotoficationPanel", Html);

                $scope.Notification = true;
                $scope.$apply();
                // alert(Html);
            }
            OneViewConsole.Debug("pollServerNotificationOpenBellPopUp end", "DcPendingTaskBO.pollServerNotificationOpenBellPopUp");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.pollServerNotificationOpenBellPopUp", Excep);
        }
    }

    var RFLNotificationBellPopUp = function ($scope) {
        try {
            OneViewConsole.Debug("RFLNotificationBellPopUp start", "DcPendingTaskBO.RFLNotificationBellPopUp");
            
            var oDcPendingTaskDAO = new DcPendingTaskDAO();
            var oNotificationResultObj = oDcPendingTaskDAO.GetNotificationMessage(OneViewSessionStorage.Get("LoginUserId"),OneViewSessionStorage.Get("ServiceId") );
            

            if (oNotificationResultObj.length > 0) {

                var Html = "";
                var Header = 'Today';

                Html += '<div class="item item-divider">' +
                    Header +
                    '</div>';

                for (var i = 0; i < oNotificationResultObj.length; i++) {

                   // var Occurence = '<span class="badge badge-energized">3</span>';

                    Html += '<div class="item">' +
                      //  '<h2>' + NotificationResultObj[i].title + '</h2>' +
                        '<p>' + oNotificationResultObj[i].Message + '</p>' +
                        //    Occurence +
                        '</div>';
                }


                if (oNotificationResultObj.length > 0) {

                    oDcPendingTaskDAO.UpdateNotificationForMessageReadStatus(oNotificationResultObj);
                    ShowNotificationCount();
                    var _oDOM = new DOM();

                    _oDOM.AddInnerHtml("NotoficationPanel", Html);

                    $scope.Notification = true;
                    $scope.$apply();
                    // alert(Html);
                }
            }
          
            OneViewConsole.Debug("RFLNotificationBellPopUp end", "DcPendingTaskBO.RFLNotificationBellPopUp");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.RFLNotificationBellPopUp", Excep);
        }

    }

    var PAHTNotificationBellPopUp = function ($scope) {
        try {
            OneViewConsole.Debug("PAHTNotificationBellPopUp start", "DcPendingTaskBO.PAHTNotificationBellPopUp");

            if (NotificationResultObj.length > 0) {

                var Html = "";
                var Header = 'Today';

                Html += '<div class="item item-divider">' +
                    Header +
                    '</div>';

                for (var i = 0; i < NotificationResultObj.length; i++) {

                    // var Occurence = '<span class="badge badge-energized">3</span>';

                    Html += '<div class="item">' +
                        //  '<h2>' + NotificationResultObj[i].title + '</h2>' +
                        '<p>' + NotificationResultObj[i].Message + '</p>' +
                        //    Occurence +
                        '</div>';
                }


                if (NotificationResultObj.length > 0) {

                    var _oDOM = new DOM();

                    _oDOM.AddInnerHtml("NotoficationPanel", Html);

                    $scope.Notification = true;
                    $scope.$apply();
                    // alert(Html);
                }
            }

            OneViewConsole.Debug("PAHTNotificationBellPopUp end", "DcPendingTaskBO.PAHTNotificationBellPopUp");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.PAHTNotificationBellPopUp", Excep);
        }

    }

    /// <summary>
    /// DisableNotification
    /// </summary>
    this.DisableNotification = function (Id) {

        try {
            OneViewConsole.Debug("DisableNotification start", "DcPendingTaskBO.DisableNotification");
           
            var _oDcPendingTaskDAO = new DcPendingTaskDAO();
            _oDcPendingTaskDAO.UpdateDisableStatusById(Id);

            var _oDOM = new DOM();
            _oDOM.Remove("NotificationBlock_" + Id);

            MyInstance.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

            OneViewConsole.Debug("DisableNotification end", "DcPendingTaskBO.DisableNotification");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.DisableNotification", Excep);
        }
        finally {
        }
    }


    /// <summary>
    /// DisableNotification
    /// </summary>
    var InsertNotification = function (NotificationLst) {
        try {
            OneViewConsole.Debug("DisableNotification start", "DcPendingTaskBO.DisableNotification");
            //OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId")
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var UserId = OneViewSessionStorage.Get("LoginUserId");
            
            var NotificationCount = 0;
            if (NotificationLst.length > 0) {
                var _oDefaultMasterDAO = new DefaultMasterDAO("DcPendingTaskEntity");
                var Count = _oDefaultMasterDAO.Count();

                var oDcPendingTaskDAO = new DcPendingTaskDAO();
                var DuplicateCheckDic = oDcPendingTaskDAO.GetServerIdOfNotification();
                var _oDcPendingTaskNormalizer = new DcPendingTaskNormalizer();

                for (var i = 0; i < NotificationLst.length; i++) {

                 

                    NotificationLst[i]["ServiceId"] = ServiceId;
                    NotificationLst[i]["UserId"] = UserId;               
                    
                    var oNotification = _oDcPendingTaskNormalizer.NormalizeUnique(NotificationLst[i]);

                    if (DuplicateCheckDic[NotificationLst[i].Id] == undefined) {
                        _oDefaultMasterDAO.Create(oNotification, Count);
                        Count += 1;
                        NotificationCount += 1;
                    }


                }

                return NotificationCount;
               // if (NotificationCount)
               
            }
           // UpdateUI("TopRightBell", NotificationCount);

            OneViewConsole.Debug("DisableNotification end", "DcPendingTaskBO.DisableNotification");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskBO.DisableNotification", Excep);
        }
        finally {
        }
    }
}

// DcPendingTaskIL
function DcPendingTaskIL() {

    // Current Scope
    var MyInstance = this;

    /// <summary>
    /// GetDcPendingTaskDetails : Get the Dc Pending Task Details for the authenticate user.
    /// </summary>
    /// <param name="ServiceId">ServiceId</param>
    /// <param name="UserId">Logged in userid</param>
    this.GetDcPendingTaskDetails = function (ServiceId, UserId) {
        try {
            OneViewConsole.Debug("GetDcPendingTaskDetails Start", "DcPendingTaskIL.GetDcPendingTaskDetails");
            OneViewConsole.DataLog("ServiceId :", ServiceId + ", UserId :", UserId);

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetDcPendingTaskDetails_json";
            _oOneViewChannel.parameter = JSON.stringify({ "ServiceId": ServiceId, "UserId": UserId });
            var oDcPendingTaskDTO = _oOneViewChannel.Send();
           
            if (oDcPendingTaskDTO != null) {      
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oDcPendingTaskDTO.GetDcPendingTaskDetails_jsonResult), "DcPendingTaskIL.GetDcPendingTaskDetails");
                oDcPendingTaskDTO = JSON.parse(oDcPendingTaskDTO.GetDcPendingTaskDetails_jsonResult);               
            }
            
            OneViewConsole.Debug("GetDcPendingTaskDetails End", "DcPendingTaskIL.GetDcPendingTaskDetails");

            return oDcPendingTaskDTO;           
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "AuthenticationServiceIL.DcPendingTaskIL", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oDcPendingTaskDTO = null;
        }
    }
}

// DcPendingTaskDAO
function DcPendingTaskDAO() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// GetAll
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    this.GetAll = function (DcUserId) {

        try {
            OneViewConsole.Debug("GetAll start", "DcPendingTaskDAO.GetAll");

            //var Query = "SELECT * FROM DcPendingTaskEntity WHERE DcUserId = " + DcUserId;

            var Date = _oDateTime.ConvertDateTimeToInteger(CurrentDateAndTime);
            var Time = _oDateTime.ConvertTimeToInteger(CurrentDateAndTime.split(' ')[1]);

            var Query = "Select Id,DcPlaceId,DcPlaceName,CustomPlaceName,DcUserName,TemplateNodeName,ShiftName,ReccurenceName,Occurence,StartDate,EndDate,FromTime,ToTime,CompletedRecordsServer,InCompletedRecordsServer,CompletedRecordsLocal,InCompletedRecordsLocal," +
            "(" +
               "SUBSTR(DcPendingTaskEntity.StartDate, 7, 4) || " +
               "SUBSTR(DcPendingTaskEntity.StartDate, 4, 2) || " +
               "SUBSTR(DcPendingTaskEntity.StartDate, 1, 2) || " +
               "SUBSTR(DcPendingTaskEntity.StartDate, 12, 2) || " +
               "SUBSTR(DcPendingTaskEntity.StartDate, 15, 2) || " +
               "SUBSTR(DcPendingTaskEntity.StartDate, 18, 2) " +
            ") AS SD," +
            "(" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 7, 4) ||" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 12, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 15, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 18, 2) " +
                ") AS ED," +
            "(" +
                "SUBSTR(DcPendingTaskEntity.FromTime, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.FromTime, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.FromTime, 7, 2) " +
            ") AS FT," +
            "(" +
                "SUBSTR(DcPendingTaskEntity.ToTime, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.ToTime, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.ToTime, 7, 2) " +
            ") AS TT " +
            "From DcPendingTaskEntity " +
            "WHERE SD < '" + Date + "' " +
            "AND ( '" + Date + "' <  ED or  '' = ED ) AND " +
            //"((ShiftId = 0 AND " +
            //"(FT < '" + Time + "' " +
            //"AND  '" + Time + "'  < TT )) " +
            //" or ShiftId = " + ShiftId + " )" +
            " DcUserId = " + DcUserId + " AND IsDisable = 'false'";
           
            OneViewConsole.DataLog("Requested Query : " + Query, "DcPendingTaskDAO.GetAll");
          
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcPendingTaskDAO.GetAll");
           
            OneViewConsole.Debug("GetAll end", "DcPendingTaskDAO.GetAll");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskDAO.GetAll", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    /// <summary>
    /// GetAllNotificationCount
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    this.GetAllNotificationCount = function (DcUserId) {

        try {
            OneViewConsole.Debug("GetAllNotificationCount start", "DcPendingTaskDAO.GetAllNotificationCount");

            //var Query = "SELECT Count(*) AS TotalCount FROM DcPendingTaskEntity WHERE DcUserId = " + DcUserId;

            var Date = _oDateTime.ConvertDateTimeToInteger(CurrentDateAndTime);
            var Time = _oDateTime.ConvertTimeToInteger(CurrentDateAndTime.split(' ')[1]);

            var Query = "Select Id," +
            "(" +
               "SUBSTR(DcPendingTaskEntity.StartDate, 7, 4) || " +
               "SUBSTR(DcPendingTaskEntity.StartDate, 4, 2) || " +
               "SUBSTR(DcPendingTaskEntity.StartDate, 1, 2) || " +
               "SUBSTR(DcPendingTaskEntity.StartDate, 12, 2) || " +
               "SUBSTR(DcPendingTaskEntity.StartDate, 15, 2) || " +
               "SUBSTR(DcPendingTaskEntity.StartDate, 18, 2) " +
            ") AS SD," +
            "(" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 7, 4) ||" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 12, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 15, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 18, 2) " +
                ") AS ED," +
            "(" +
                "SUBSTR(DcPendingTaskEntity.FromTime, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.FromTime, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.FromTime, 7, 2) " +
            ") AS FT," +
            "(" +
                "SUBSTR(DcPendingTaskEntity.ToTime, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.ToTime, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.ToTime, 7, 2) " +
            ") AS TT " +
            "From DcPendingTaskEntity " +
            "WHERE SD < '" + Date + "' " +
            "AND ( '" + Date + "' <  ED or  '' = ED ) AND " +
            //"((ShiftId = 0 AND " +
            //"(FT < '" + Time + "' " +
            //"AND  '" + Time + "'  < TT )) " +
            //" or ShiftId = " + ShiftId + " )" +
            " DcUserId = " + DcUserId + " AND IsDisable = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcPendingTaskDAO.GetAllNotificationCount");
      
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);        

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcPendingTaskDAO.GetAllNotificationCount");

            OneViewConsole.Debug("GetAllNotificationCount end", "DcPendingTaskDAO.GetAllNotificationCount");

            return Result.length;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskDAO.GetAllNotificationCount", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    /// <summary>
    /// DeleteByUserId
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    this.DeleteByUserId = function (DcUserId) {

        try {
            OneViewConsole.Debug("DeleteByUserId start", "DcPendingTaskDAO.DeleteByUserId");

            var Query = "DELETE FROM DcPendingTaskEntity WHERE DcUserId=" + DcUserId;

            OneViewConsole.Debug("Requested Query : " + Query, "DcPendingTaskDAO.DeleteByUserId");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("DeleteByUserId end", "DcPendingTaskDAO.DeleteByUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.DeleteByUserId", Excep);         
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// DeleteByProfileId
    /// </summary>
    /// <param name="Id">Id</param> 
    this.UpdateDisableStatusById = function (Id) {

        try {
            OneViewConsole.Debug("UpdateDisableStatusById start", "DcPendingTaskDAO.UpdateDisableStatusById");

            var Query = "UPDATE DcPendingTaskEntity Set IsDisable = 'true',DisableDate = '" + CurrentDateAndTime + "' WHERE Id=" + Id;

            OneViewConsole.Debug("Requested Query : " + Query, "DcPendingTaskDAO.UpdateDisableStatusById");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("UpdateDisableStatusById end", "DcPendingTaskDAO.UpdateDisableStatusById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.UpdateDisableStatusById", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// IncreaseCompletedRecordsLocalCount
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    /// <param name="DcPlaceId">DcPlaceId</param> 
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    this.IncreaseCompletedRecordsLocalCount = function (DcUserId, DcPlaceId, TemplateNodeId, DcPlaceName) {

        try {
            OneViewConsole.Debug("IncreaseCompletedRecordsLocalCount start", "DcPendingTaskDAO.IncreaseCompletedRecordsLocalCount");

            var Query = "";

            if (DcPlaceId > 0) {
                Query = "Update DcPendingTaskEntity Set CompletedRecordsLocal = CompletedRecordsLocal+1 WHERE DcUserId=" + DcUserId + " AND DcPlaceId=" + DcPlaceId + " AND TemplateNodeId=" + TemplateNodeId + "";
            }
            else {
                Query = "Update DcPendingTaskEntity Set CompletedRecordsLocal = CompletedRecordsLocal+1 WHERE DcUserId=" + DcUserId + " AND CustomPlaceName='" + DcPlaceName + "' AND TemplateNodeId=" + TemplateNodeId + "";
            }

            //alert(Query);

            OneViewConsole.Debug("Requested Query : " + Query, "DcPendingTaskDAO.IncreaseCompletedRecordsLocalCount");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("IncreaseCompletedRecordsLocalCount end", "DcPendingTaskDAO.IncreaseCompletedRecordsLocalCount");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.IncreaseCompletedRecordsLocalCount", Excep);        
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// IncreaseInCompletedRecordsLocalCount
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    /// <param name="DcPlaceId">DcPlaceId</param> 
    /// <param name="TemplateNodeId">TemplateNodeId</param> 
    this.IncreaseInCompletedRecordsLocalCount = function (DcUserId, DcPlaceId, TemplateNodeId, DcPlaceName) {

        try {
            OneViewConsole.Debug("IncreaseInCompletedRecordsLocalCount start", "DcPendingTaskDAO.IncreaseInCompletedRecordsLocalCount");

            var Query = "";

            if (DcPlaceId > 0) {
                Query = "Update DcPendingTaskEntity Set InCompletedRecordsLocal = InCompletedRecordsLocal+1 WHERE DcUserId=" + DcUserId + " AND DcPlaceId=" + DcPlaceId + " AND TemplateNodeId=" + TemplateNodeId + "";
            }
            else {
                Query = "Update DcPendingTaskEntity Set InCompletedRecordsLocal = InCompletedRecordsLocal+1 WHERE DcUserId=" + DcUserId + " AND CustomPlaceName='" + DcPlaceName + "' AND TemplateNodeId=" + TemplateNodeId + "";
            }

            //alert(Query);

            OneViewConsole.Debug("Requested Query : " + Query, "DcPendingTaskDAO.IncreaseInCompletedRecordsLocalCount");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("IncreaseInCompletedRecordsLocalCount end", "DcPendingTaskDAO.IncreaseInCompletedRecordsLocalCount");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.IncreaseInCompletedRecordsLocalCount", Excep);          
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// ChangeCompletedToInComplete
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    /// <param name="DcPlaceId">DcPlaceId</param> 
    /// <param name="TemplateNodeId">TemplateNodeId</param>  
    this.ChangeCompletedToInComplete = function (DcUserId, DcPlaceId, TemplateNodeId, DcPlaceName) {

        try {
            OneViewConsole.Debug("ChangeCompletedToInComplete start", "DcPendingTaskDAO.ChangeCompletedToInComplete");

            var Query = "";

            if (DcPlaceId > 0) {
                Query = "Update DcPendingTaskEntity Set CompletedRecordsLocal = CompletedRecordsLocal-1,InCompletedRecordsLocal = InCompletedRecordsLocal+1 WHERE DcUserId=" + DcUserId + " AND DcPlaceId=" + DcPlaceId + " AND TemplateNodeId=" + TemplateNodeId + "";
            }
            else {
                Query = "Update DcPendingTaskEntity Set CompletedRecordsLocal = CompletedRecordsLocal-1,InCompletedRecordsLocal = InCompletedRecordsLocal+1 WHERE DcUserId=" + DcUserId + " AND CustomPlaceName='" + DcPlaceName + "' AND TemplateNodeId=" + TemplateNodeId + "";
            }

            //alert(Query);

            OneViewConsole.Debug("Requested Query : " + Query, "DcPendingTaskDAO.ChangeCompletedToInComplete");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("ChangeCompletedToInComplete end", "DcPendingTaskDAO.ChangeCompletedToInComplete");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.ChangeCompletedToInComplete", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// ChangeInCompletedToComplete
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    /// <param name="DcPlaceId">DcPlaceId</param> 
    /// <param name="TemplateNodeId">TemplateNodeId</param>  
    this.ChangeInCompletedToComplete = function (DcUserId, DcPlaceId, TemplateNodeId, DcPlaceName) {

        try {
            OneViewConsole.Debug("ChangeInCompletedToComplete start", "DcPendingTaskDAO.ChangeInCompletedToComplete");

            var Query = "";

            if (DcPlaceId > 0) {
                Query = "Update DcPendingTaskEntity Set CompletedRecordsLocal = CompletedRecordsLocal+1,InCompletedRecordsLocal = InCompletedRecordsLocal-1 WHERE DcUserId=" + DcUserId + " AND DcPlaceId=" + DcPlaceId + " AND TemplateNodeId=" + TemplateNodeId + "";
            }
            else {
                Query = "Update DcPendingTaskEntity Set CompletedRecordsLocal = CompletedRecordsLocal+1,InCompletedRecordsLocal = InCompletedRecordsLocal-1 WHERE DcUserId=" + DcUserId + " AND CustomPlaceName='" + DcPlaceName + "' AND TemplateNodeId=" + TemplateNodeId + "";
            }

            //alert(Query);

            OneViewConsole.Debug("Requested Query : " + Query, "DcPendingTaskDAO.ChangeInCompletedToComplete");

            _OneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("ChangeInCompletedToComplete end", "DcPendingTaskDAO.ChangeInCompletedToComplete");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.ChangeInCompletedToComplete", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// GetAllDcInfoWithFilters
    /// </summary>
    /// <param name="FilterParam">FilterParam</param> 
    this.GetAllDcInfoWithFilters = function (FilterParam) {
        try {
            OneViewConsole.Debug("GetAllDcInfoWithFilters start", "DcPendingTaskDAO.GetAllDcInfoWithFilters");

            var Query = "Select DataCaptureEntity.Id AS Id,DataCaptureEntity.ServerId AS ServerId,DataCaptureEntity.ClientGuid AS ClientGuid,DataCaptureEntity.IsAnyNC AS IsAnyNC from DataCaptureEntity INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId " +
                            "where (DataCaptureEntity.ServiceId = " + FilterParam.ServiceId + " OR -1=" + FilterParam.ServiceId + ")" +
                            " AND (DataCaptureEntity.TemplateNodeId = " + FilterParam.TemplateNodeId + " OR -1=" + FilterParam.TemplateNodeId + ")" +
                            " AND (DataCaptureEntity.DcPlaceId = " + FilterParam.DcPlaceId + " OR -1=" + FilterParam.DcPlaceId + ")" +
                            " AND (DataCaptureEntity.IsSynchronized = '" + FilterParam.IsSynchronized + "' OR '-1'='" + FilterParam.IsSynchronized + "')" +
                            " AND (DataCaptureEntity.IsCompleted = '" + FilterParam.IsCompleted + "' OR '-1'='" + FilterParam.IsCompleted + "')" +
                            " AND (DcResultsEntity.SystemUserId = " + FilterParam.SystemUserId + " OR -1=" + FilterParam.SystemUserId + ")" +
                            " AND (DcResultsEntity.ShiftId = " + FilterParam.ShiftId + " OR -1=" + FilterParam.ShiftId + ")";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcPendingTaskDAO.GetAllDcInfoWithFilters");
           
            var DcInfo = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(DcInfo), "DcPendingTaskDAO.GetAllDcInfoWithFilters");
            OneViewConsole.Debug("GetAllDcInfoWithFilters end", "DcPendingTaskDAO.GetAllDcInfoWithFilters");

            return DcInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.GetAllWithFilters", Excep);
        }
        finally {
            Query = null;
            DcInfo = null;
        }
    }


    this.GetServerIdOfNotification = function () {

        try {
            OneViewConsole.Debug("GetServerIdOfNotification start", "DefaultMasterDAO.GetServerIdOfNotification");

            var ResultDic = {};

            var Query = "SELECT Distinct ServerId,Id,OVGuid FROM DcPendingTaskEntity" ;

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultMasterDAO.GetServerIdOfNotification");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + result, "DefaultMasterDAO.GetServerIdOfNotification");

            OneViewConsole.Debug("GetServerIdOfNotification end", "DefaultMasterDAO.GetServerIdOfNotification");

            result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                ResultDic[result[i].ServerId] = { "Id": result[i].Id, "OVGuid": result[i].OVGuid };
            }

            return ResultDic;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultMasterDAO.GetServerIdOfNotification", Excep);
        }
        finally {
            Query = null;
            Exp = null;
            Type = null;
            result = null;
        }
    }

    /// <summary>
    /// GetAllNotificationCount
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    this.GetNotificationCountByMessageReadStatus = function (DcUserId, ServiceId) {

        try {
            OneViewConsole.Debug("GetAllNotificationCount start", "DcPendingTaskDAO.GetAllNotificationCount");

            //var Query = "SELECT Count(*) AS TotalCount FROM DcPendingTaskEntity WHERE DcUserId = " + DcUserId;

            var Date = _oDateTime.ConvertDateTimeToInteger(CurrentDateAndTime);
            var Time = _oDateTime.ConvertTimeToInteger(CurrentDateAndTime.split(' ')[1]);

            var Query = "Select Id," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.StartDate, 7, 4) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 4, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 12, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 15, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 18, 2) " +
                ") AS SD," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 7, 4) ||" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 12, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 15, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 18, 2) " +
                ") AS ED," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.FromTime, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.FromTime, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.FromTime, 7, 2) " +
                ") AS FT," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.ToTime, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.ToTime, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.ToTime, 7, 2) " +
                ") AS TT " +
                "From DcPendingTaskEntity Where " +
               // "WHERE SD < '" + Date + "' AND"  +
                " ( '" + Date + "' <  ED or  '' = ED ) AND " +
                //"((ShiftId = 0 AND " +
                //"(FT < '" + Time + "' " +
                //"AND  '" + Time + "'  < TT )) " +
                //" or ShiftId = " + ShiftId + " )" +
                " DcUserId = " + DcUserId + " AND ServiceId = " + ServiceId + " AND IsDisable = 'false'  AND MessageReadStatus = 0";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcPendingTaskDAO.GetAllNotificationCount");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcPendingTaskDAO.GetAllNotificationCount");

            OneViewConsole.Debug("GetAllNotificationCount end", "DcPendingTaskDAO.GetAllNotificationCount");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskDAO.GetAllNotificationCount", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    /// <summary>
    /// GetAllNotificationCount
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    this.GetNotificationMessage = function (DcUserId, ServiceId) {

        try {
            OneViewConsole.Debug("GetAllNotificationCount start", "DcPendingTaskDAO.GetAllNotificationCount");

            //var Query = "SELECT Count(*) AS TotalCount FROM DcPendingTaskEntity WHERE DcUserId = " + DcUserId;

            var Date = _oDateTime.ConvertDateTimeToInteger(CurrentDateAndTime);
            var Time = _oDateTime.ConvertTimeToInteger(CurrentDateAndTime.split(' ')[1]);

            var Query = "Select Id,ServiceId,ServerId,Message,MessageReadStatus," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.StartDate, 7, 4) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 4, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 12, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 15, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 18, 2) " +
                ") AS SD," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 7, 4) ||" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 12, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 15, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 18, 2) " +
                ") AS ED," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.FromTime, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.FromTime, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.FromTime, 7, 2) " +
                ") AS FT," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.ToTime, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.ToTime, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.ToTime, 7, 2) " +
                ") AS TT " +
                "From DcPendingTaskEntity Where " +
               // "WHERE SD < '" + Date + "' AND " +
                " ( '" + Date + "' <  ED or  '' = ED ) AND " +
                //"((ShiftId = 0 AND " +
                //"(FT < '" + Time + "' " +
                //"AND  '" + Time + "'  < TT )) " +
                //" or ShiftId = " + ShiftId + " )" +
                " DcUserId = " + DcUserId + " AND ServiceId = " + ServiceId + " AND IsDisable = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcPendingTaskDAO.GetAllNotificationCount");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcPendingTaskDAO.GetAllNotificationCount");

            OneViewConsole.Debug("GetAllNotificationCount end", "DcPendingTaskDAO.GetAllNotificationCount");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskDAO.GetAllNotificationCount", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    /// <summary>
    /// DeleteByProfileId
    /// </summary>
    /// <param name="Id">Id</param> 
    this.UpdateNotificationForMessageReadStatus = function (oNotificationLst) {

        try {
            OneViewConsole.Debug("UpdateDisableStatusById start", "DcPendingTaskDAO.UpdateDisableStatusById");

            if (oNotificationLst.length > 0) {

                var Incondition = "(";
                for (var i = 0; i < oNotificationLst.length; i++) {
                    Incondition += oNotificationLst[i].ServerId;

                    if ((oNotificationLst.length - 1) !== i) {
                        Incondition += ",";
                    }
                }
                Incondition += ")";

                var Query = "UPDATE DcPendingTaskEntity Set MessageReadStatus = 1 WHERE ServerId IN " + Incondition;

                OneViewConsole.Debug("Requested Query : " + Query, "DcPendingTaskDAO.UpdateDisableStatusById");

                _OneViewSqlitePlugin.ExcecuteSql(Query);
            }

            OneViewConsole.Debug("UpdateDisableStatusById end", "DcPendingTaskDAO.UpdateDisableStatusById");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.UpdateDisableStatusById", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    /// <summary>
    /// DeleteByUserId
    /// </summary>
    /// <param name="DcUserId">DcUserId</param> 
    this.DeleteNotificationByDate = function (DcUserId, ServiceId) {

        try {
            OneViewConsole.Debug("DeleteByUserId start", "DcPendingTaskDAO.DeleteByUserId");

            var Result = MyInstance.GetExpiredNotificationLst(DcUserId, ServiceId);

            if (Result != null && Result.length > 0) {

                var Incondition = "(";
                for (var i = 0; i < Result.length; i++) {
                    Incondition += Result[i].Id;

                    if ((Result.length - 1) !== i) {
                        Incondition += ",";
                    }
                }
                Incondition += ")";

                var Query = "DELETE FROM DcPendingTaskEntity WHERE Id IN " + Incondition;

                OneViewConsole.Debug("Requested Query : " + Query, "DcPendingTaskDAO.DeleteByUserId");

                _OneViewSqlitePlugin.ExcecuteSql(Query);

            }
            OneViewConsole.Debug("DeleteByUserId end", "DcPendingTaskDAO.DeleteByUserId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcPendingTaskDAO.DeleteByUserId", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
            Count = null;
            _oDcPendingTaskNormalizer = null;
        }
    }

    this.GetExpiredNotificationLst = function (DcUserId, ServiceId) {

        try {
            OneViewConsole.Debug("GetAllNotificationCount start", "DcPendingTaskDAO.GetAllNotificationCount");

            //var Query = "SELECT Count(*) AS TotalCount FROM DcPendingTaskEntity WHERE DcUserId = " + DcUserId;

            var Date = _oDateTime.ConvertDateTimeToInteger(CurrentDateAndTime);
            var Time = _oDateTime.ConvertTimeToInteger(CurrentDateAndTime.split(' ')[1]);

            var Query = "Select Id," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.StartDate, 7, 4) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 4, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 12, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 15, 2) || " +
                "SUBSTR(DcPendingTaskEntity.StartDate, 18, 2) " +
                ") AS SD," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 7, 4) ||" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.EndDate, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 12, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 15, 2) || " +
                "SUBSTR(DcPendingTaskEntity.EndDate, 18, 2) " +
                ") AS ED," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.FromTime, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.FromTime, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.FromTime, 7, 2) " +
                ") AS FT," +
                "(" +
                "SUBSTR(DcPendingTaskEntity.ToTime, 1, 2) || " +
                "SUBSTR(DcPendingTaskEntity.ToTime, 4, 2) ||" +
                "SUBSTR(DcPendingTaskEntity.ToTime, 7, 2) " +
                ") AS TT " +
                "From DcPendingTaskEntity where " +
               // "WHERE SD < '" + Date + "' AND " +
                " ( '" + Date + "' >  ED  ) AND " +
                //"((ShiftId = 0 AND " +
                //"(FT < '" + Time + "' " +
                //"AND  '" + Time + "'  < TT )) " +
                //" or ShiftId = " + ShiftId + " )" +
                " DcUserId = " + DcUserId + "  AND ServiceId = " + ServiceId + "  ";

            OneViewConsole.DataLog("Requested Query : " + Query, "DcPendingTaskDAO.GetAllNotificationCount");

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DcPendingTaskDAO.GetAllNotificationCount");

            OneViewConsole.Debug("GetAllNotificationCount end", "DcPendingTaskDAO.GetAllNotificationCount");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcPendingTaskDAO.GetAllNotificationCount", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }
}

// DcPendingTaskNormalizer
function DcPendingTaskNormalizer() {

    // Current Scope
    var MyInstance = this;

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    /// <summary>
    /// DTO to DcPendingTask conversion
    /// </summary>
    /// <param name="DcPendingTaskDTO">DcPendingTask DTO (DTO from server)</param>
    /// <returns>DcPendingTask (Mobile entity format)</returns> 
    this.Normalize = function (DcPendingTaskDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "DcPendingTaskNormalizer.Normalize");

            var _oDcPendingTaskEntity = new DcPendingTaskEntity();

            _oDcPendingTaskEntity.MobileVersionId = 1;

            _oDcPendingTaskEntity.ServiceId = DcPendingTaskDTO.ServiceId;
            _oDcPendingTaskEntity.DcProfileId = DcPendingTaskDTO.DcProfileId;
                    
            _oDcPendingTaskEntity.DcPlaceId = DcPendingTaskDTO.DcPlaceId;
            _oDcPendingTaskEntity.DcPlaceName = DcPendingTaskDTO.DcPlaceName;
            _oDcPendingTaskEntity.DcPlaceDimension = DcPendingTaskDTO.DcPlaceDimension;
            _oDcPendingTaskEntity.CustomPlaceName = DcPendingTaskDTO.CustomPlaceName;

            _oDcPendingTaskEntity.DcUserId = DcPendingTaskDTO.DcUserId;
            _oDcPendingTaskEntity.DcUserName = DcPendingTaskDTO.DcUserName;

            _oDcPendingTaskEntity.TemplateNodeId = DcPendingTaskDTO.TemplateNodeId;
            _oDcPendingTaskEntity.TemplateNodeName = DcPendingTaskDTO.TemplateNodeName;

            _oDcPendingTaskEntity.ShiftId = DcPendingTaskDTO.ShiftId;
            _oDcPendingTaskEntity.ShiftName = DcPendingTaskDTO.ShiftName;

            _oDcPendingTaskEntity.ReccurenceId = DcPendingTaskDTO.ReccurenceId;
            _oDcPendingTaskEntity.ReccurenceName = DcPendingTaskDTO.ReccurenceName;
            _oDcPendingTaskEntity.Occurence = DcPendingTaskDTO.Occurence;

            _oDcPendingTaskEntity.StartDate = DcPendingTaskDTO.StartDate;
            _oDcPendingTaskEntity.EndDate = DcPendingTaskDTO.EndDate;

            _oDcPendingTaskEntity.FromTime = DcPendingTaskDTO.FromTime;
            _oDcPendingTaskEntity.ToTime = DcPendingTaskDTO.ToTime;

            _oDcPendingTaskEntity.CompletedRecordsServer = DcPendingTaskDTO.CompletedRecordsServer;
            _oDcPendingTaskEntity.InCompletedRecordsServer = DcPendingTaskDTO.InCompletedRecordsServer;            

            _oDcPendingTaskEntity.IsDisable = "false";
           
            _oDcPendingTaskEntity.CreatedDate = CurrentDateAndTime;
            _oDcPendingTaskEntity.LastsyncDate = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "DcPendingTaskNormalizer.Normalize");

            return _oDcPendingTaskEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DcPendingTaskNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }

    /// <summary>
    /// DTO list to DcPendingTask list conversion
    /// </summary>
    /// <param name="DcPendingTaskList">DcPendingTask list dto (DTO from server)</param>
    /// <returns>DcPendingTask list (Mobile entity format)</returns> 
    this.NormalizeList = function (DcPendingTaskDTOList) {
        try {
            OneViewConsole.Debug("NormalizeList start", "DcPendingTaskNormalizer.NormalizeList");

            var DcPendingTaskList = new Array();
            for (var i = 0; i < DcPendingTaskDTOList.length; i++) {

                DcPendingTaskList[i] = MyInstance.Normalize(DcPendingTaskDTOList[i]);
            }

            OneViewConsole.Debug("NormalizeList end", "DcPendingTaskNormalizer.NormalizeList");

            return DcPendingTaskList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DcPendingTaskNormalizer.NormalizeList", Excep);
        }
        finally {
            DcPendingTaskList = null;
        }
    }


    this.NormalizeUnique = function (DcPendingTaskDTO) {
        try {
            OneViewConsole.Debug("Normalize start", "DcPendingTaskNormalizer.Normalize");

            var _oDcPendingTaskEntity = new DcPendingTaskEntity();

            _oDcPendingTaskEntity.MobileVersionId = 1;

            _oDcPendingTaskEntity.ServiceId = DcPendingTaskDTO.ServiceId;
            _oDcPendingTaskEntity.DcUserId = DcPendingTaskDTO.UserId; 
          

            //_oDcPendingTaskEntity.StartDate = DcPendingTaskDTO.StartDate;
            _oDcPendingTaskEntity.EndDate = DcPendingTaskDTO.Column1;

           // _oDcPendingTaskEntity.FromTime = DcPendingTaskDTO.FromTime;
           // _oDcPendingTaskEntity.ToTime = DcPendingTaskDTO.ToTime;
            _oDcPendingTaskEntity.Message = DcPendingTaskDTO.Message;
            _oDcPendingTaskEntity.ServerId = DcPendingTaskDTO.Id;
            _oDcPendingTaskEntity.MessageReadStatus =0;
          

            _oDcPendingTaskEntity.IsDisable = "false";

            _oDcPendingTaskEntity.CreatedDate = CurrentDateAndTime;
            _oDcPendingTaskEntity.LastsyncDate = CurrentDateAndTime;

            OneViewConsole.Debug("Normalize end", "DcPendingTaskNormalizer.Normalize");

            return _oDcPendingTaskEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalizer", "DcPendingTaskNormalizer.Normalize", Excep);
        }
        finally {
            _oDcPendingTaskEntity = null;
        }
    }
}

// GetDcPendingTaskDTOList
function GetDcPendingTaskDTOList() {

    // Current date and time
    var _oDateTime = new DateTime();
    var CurrentDateAndTime = _oDateTime.GetDateAndTime();

    var DcPendingTaskDTOLst = new Array();

    var _oDcPendingTaskEntity = new DcPendingTaskEntity();

    _oDcPendingTaskEntity.CompletedRecordsDcIdList = [1,2];
    _oDcPendingTaskEntity.InCompletedRecordsDcIdList = [2,4,5];

    _oDcPendingTaskEntity.ServiceId = 1;
    _oDcPendingTaskEntity.DcProfileId = "hbfsdbfug839nihyr";

    _oDcPendingTaskEntity.DcUserId = 7;
    _oDcPendingTaskEntity.DcUserName = "Pvaloth";

    _oDcPendingTaskEntity.DcPlaceId = 1;
    _oDcPendingTaskEntity.DcPlaceName = "Food"
    _oDcPendingTaskEntity.DcPlaceDimension = "";
    _oDcPendingTaskEntity.CustomPlaceName = "";

    _oDcPendingTaskEntity.TemplateNodeId = 1;
    _oDcPendingTaskEntity.TemplateNodeName = "T1";

    //_oDcPendingTaskEntity.ShiftId = 1
    //_oDcPendingTaskEntity.ShiftName = "A";

    _oDcPendingTaskEntity.ShiftId = 0
    _oDcPendingTaskEntity.ShiftName = "";

    _oDcPendingTaskEntity.ReccurenceId = 0;
    _oDcPendingTaskEntity.ReccurenceName = "";
    _oDcPendingTaskEntity.Occurence = 2;

    _oDcPendingTaskEntity.StartDate = "10-05-2015 08:00:00";
    _oDcPendingTaskEntity.EndDate = "15-05-2015 08:00:00";

    _oDcPendingTaskEntity.FromTime = "08:00:00";
    _oDcPendingTaskEntity.ToTime = "17:00:00";

    _oDcPendingTaskEntity.CompletedRecordsServer = 2;
    _oDcPendingTaskEntity.InCompletedRecordsServer = 3;

    _oDcPendingTaskEntity.IsDisable = "false";
   
    DcPendingTaskDTOLst[0] = _oDcPendingTaskEntity;

    return DcPendingTaskDTOLst;
}