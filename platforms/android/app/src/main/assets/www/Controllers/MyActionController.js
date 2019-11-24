
var MyActionTotalDCCountForUpload = 0;
var MyActionUploadLimit = 50;
var MyActionUploadProgressValue = 0;
var MyActionUploadBatchNumber = 1;

var MyActionPageConfig = {
     "IsTemplateView": false,   
}

// MyActionController
MyApp.controller('MyActionController', function ($scope, $compile, $location, xlatService) {



    var IsNavigate = false;
    var Url;

    ////////////////*********************** Validation for Checking Any action available before going to MyAction page when any profile are there only************************ START///////////////////////////

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var UserId = OneViewSessionStorage.Get("LoginUserId");
    var _oMyActionDAO = new MyActionDAO();
    TotalCount = _oMyActionDAO.GetAllActionsCount(ServiceId, -1, -1, UserId);
    if (TotalCount > 0) {
        //$location.url('nav/my-actions');
        IsNavigate = true;
    }
    else {
        //alert("IN-NF-MAC-001 :: No actions are available to followUp");
        var MessageKey = "IN-NF-MAC-001 :: No actions are available to followUp";
        Url = '/notifycall?MessageKey=' + MessageKey + '';
    }

    ////////////////*********************** Validation for Checking Any action available before going to MyAction page when any profile are there only************************ END///////////////////////////

    if (IsNavigate == true) {
        var _oMyActionFacade = new MyActionFacade($scope, $compile, $location, xlatService);
        _oMyActionFacade.Init();
        _oMyActionFacade.PageLoad();
    }
    else {
        $location.url(Url);
    }


    $scope.Upload = function () {
        _oMyActionFacade.Upload();
    }

    $scope.RowClick = function (Id, Name) {     
        _oMyActionFacade.RowClick(Id, Name);
    }
});

// MyActionFacade
function MyActionFacade($scope, $compile, $location, xlatService) {

    var MyInstance = this;

    var _MyActionBO = new MyActionBO($scope, $compile, $location, xlatService);

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "MyActionFacade.Init");

            xlatService.setCurrentPage('12');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

            $scope.PlaceLst = [];
            $scope.TemplateLst = [];

            OneViewConsole.Debug("Init end", "MyActionFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyActionFacade.Init", xlatService);
        }
        finally {
        }
    }

    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "MyActionFacade.PageLoad");
         
            _MyActionBO.PageLoad();

            OneViewConsole.Debug("PageLoad end", "MyActionFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyActionFacade.PageLoad", xlatService);
        }
        finally {         
        }
    }

    this.Upload = function () {

        try {
            OneViewConsole.Debug("Upload start", "MyActionFacade.Upload");

            _MyActionBO.Upload();

            OneViewConsole.Debug("Upload end", "MyActionFacade.Upload");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyActionFacade.Upload", xlatService);
        }
        finally {          
        }
    }

    this.RowClick = function (Id, Name) {

        try {
            OneViewConsole.Debug("RowClick start", "MyActionFacade.RowClick");

            var Url = 'nav/my-action-followup?Id=' + Id + '&Name=' + Name + '&IsTemplateView=' + MyActionPageConfig.IsTemplateView + '';
            $location.url(Url);

            OneViewConsole.Debug("RowClick end", "MyActionFacade.RowClick");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyActionFacade.RowClick", xlatService);
        }
        finally {
        }
    }
}

// MyActionBO
function MyActionBO($scope, $compile, $location, xlatService) {

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    this.PageLoad = function () {
       
        try {
            OneViewConsole.Debug("PageLoad start", "MyActionFacade.PageLoad");

            var _oMyActionDAO = new MyActionDAO();

            if (MyActionPageConfig.IsTemplateView == false) {
                ResponseLst = _oMyActionDAO.GetAllPlaces(ServiceId, LoginUserId);
                for (var i = 0; i < ResponseLst.length; i++) {
                    ResponseLst[i].TotalActions = _oMyActionDAO.GetAllActionsCount(ServiceId, ResponseLst[i].Id, -1, LoginUserId);
                    ResponseLst[i].CompletedActions = _oMyActionDAO.GetAllResolvedActionsCount(ServiceId, ResponseLst[i].Id, -1, LoginUserId);
                }
                $scope.PlaceLst = ResponseLst;
            }
            else {
                alert("Not implemented exception : Templatewise view");
                //ResponseLst = _oMyActionDAO.GetAllTemplates(ServiceId, LoginUserId);
                //for (var i = 0; i < ResponseLst.length; i++) {
                //    ResponseLst[i].TotalActions = _oMyActionDAO.GetAllActionsCount(ServiceId, -1, ResponseLst[i].Id, LoginUserId);
                //    ResponseLst[i].CompletedActions = _oMyActionDAO.GetAllResolvedActionsCount(ServiceId, -1, ResponseLst[i].Id, LoginUserId);
                //}
                //$scope.TemplateLst = ResponseLst;
            }

            var Html = GetHtml(ResponseLst);

            document.getElementById('ContentBlock').innerHTML = "";
            var _oOneViewCompiler = new OneViewCompiler();

            if (Html != "") {
                _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "ContentBlock");
            }

            OneViewConsole.Debug("PageLoad end", "MyActionFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyActionFacade.PageLoad", xlatService);
        }
        finally {
        }
    }

    var GetHtml = function (ResponseLst) {

        try {
            OneViewConsole.Debug("GetHtml start", "MyActionFacade.GetHtml");

            var Html = "";

            for (var i = 0; i < ResponseLst.length; i++) {

                var Status = (ResponseLst[i].CompletedActions == ResponseLst[i].TotalActions) ? "summary completed" : "summary pending";
                var Name = "'" + ResponseLst[i].Name + "'";

                Html += '<div class="item item-icon-right" ng-click="RowClick(' + ResponseLst[i].Id + ',' + Name + ')">' +
                                ResponseLst[i].Name +
                            '<span class="item-note">'+ 
                               '<span class="'+Status+'">Action Status : ' + ResponseLst[i].CompletedActions + '/' + ResponseLst[i].TotalActions + '</span>' +
                            '</span>'+ 
                               '<i class="icon icon-angle-right"></i>'+ 
                        '</div>';
            }
          
            return Html;

            OneViewConsole.Debug("GetHtml end", "MyActionFacade.GetHtml");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyActionFacade.GetHtml", xlatService);
        }
        finally {
        }
    }

    this.Upload = function () {

        try {
            OneViewConsole.Debug("Upload start", "MyActionFacade.Upload");

            var UnSyncActionResolveCount = new MyActionDAO().GetUnSyncActionResolveCount(ServiceId, -1, -1, LoginUserId);

            if (UnSyncActionResolveCount > 0) {

                var Message = xlatService.xlat('Upload_confirm_Message');
                var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                if (IsSuccess == true) {

                    if (MyActionPageConfig.IsTemplateView == false) {

                        var _oUploadBO = new UploadBO(xlatService, '');

                        var IsMultiMediaSubElementsSuccess = _oUploadBO.UploadMultiMediaSubElements();

                        if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == true) {

                            var _oActionFollowUpUploadBO = new ActionFollowUpUploadBO($scope, xlatService);

                            var IsSuccess = _oActionFollowUpUploadBO.BulkUpload($scope.PlaceLst, LoginUserId, MyActionPageConfig.IsTemplateView, -1);

                            if (IsSuccess == true) {
                                this.PageLoad();
                            }
                        }
                        else if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == false) {
                            alert(xlatService.xlat('UploadFailed'));
                        }
                    }
                    else {
                        alert("Not implemented exception : Templatewise upload");
                    }
                }
            }
            else {
                alert(xlatService.xlat('NoDataForUpload'));
                OneViewConsole.Info("No resolve action available", "MyActionFacade.Upload");
            }

            OneViewConsole.Debug("Upload end", "MyActionFacade.Upload");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyActionFacade.Upload", xlatService);
        }
        finally {         
        }
    }

    this.IsAllActionResolved = function (oChild) {
        try {
            OneViewConsole.Debug("IsAllActionResolved start", "MyActionBO.IsAllActionResolved");
          
            var IsSuccess = true;

            var _oMyActionDAO = new MyActionDAO();
            var TotalActions = _oMyActionDAO.GetAllActionsCount(ServiceId, oChild.DCPlaceKeyId, oChild.TemplateKeyId, LoginUserId);
            var CompletedActions = _oMyActionDAO.GetAllResolvedActionsCount(ServiceId, oChild.DCPlaceKeyId, oChild.TemplateKeyId, LoginUserId);

            if (TotalActions > CompletedActions) {
                IsSuccess = false;
               // alert("Some Actons are pending to resolve do you want to continue for New Dc");
            }


            OneViewConsole.Debug("IsAllActionResolved end", "MyActionBO.IsAllActionResolved");

            return IsSuccess;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyActionBO.IsAllActionResolved", xlatService);
        }
    }

    this.IsActionResolvedIsMandatoryBeforeNewDc = function () {
        try {
            OneViewConsole.Debug("IsAllActionResolved start", "MyActionBO.IsAllActionResolved");

            var IsSuccess = false;

            var _MobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();
            var BusinessEventDetails = _MobileAutoSyncMetadataDAO.GetByServiceAndUserIdAndEvent(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), "ValidateActionFollowUpBeforeNewDCHandler", "IsNeedToValidateActionFollowUpBeforeNewDC");

            if (BusinessEventDetails.length > 0) {

                for (var i = 0; i < BusinessEventDetails.length ; i++) {

                    var BusinessEventHandlers = BusinessEventDetails[i].BusinessEventHandlers;

                    for (var b = 0; b < BusinessEventHandlers.length; b++) {

                        var BusinessEventHandlerObjectKeys=BusinessEventHandlers[b].BusinessEventHandlerObjectKeys;

                        for (var j = 0; j < BusinessEventHandlerObjectKeys.length; j++) {

                            if (BusinessEventHandlerObjectKeys[j] == "ActionResolveIsMandatoryBeforeNewDc") {
                                IsSuccess = true;
                            }
                        }

                    }
                }

            }

            OneViewConsole.Debug("IsAllActionResolved end", "MyActionBO.IsAllActionResolved");

            return IsSuccess;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyActionBO.IsAllActionResolved", xlatService);
        }
    }
}

// MyActionDAO
function MyActionDAO() {

    var oOneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetAllPlaces = function (ServiceId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetAllPlaces start", "MyActionDAO.GetAllPlaces");

            var Query = "SELECT DISTINCT(ADI.DcPlaceId) AS Id,ADI.DcPlaceName AS Name FROM ActionFollowUpInfoEntity AS AFI INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " WHERE AFI.ServiceId = " + ServiceId + " AND AFI.FollowUpUserId = " + FollowUpUserId + " AND AFI.IsForApproval != 'true' " ;
                    
            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetAllPlaces");

            var PlaceInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(PlaceInfo), "MyActionDAO.GetAllPlaces");
            OneViewConsole.Debug("GetAllPlaces end", "MyActionDAO.GetAllPlaces");

            return PlaceInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.GetAllActionInfo", Excep);
        }
    }

    this.GetPlacesNameByPlaceId = function (PlaceId) {

        try {
            OneViewConsole.Debug("GetAllPlaces start", "MyActionDAO.GetAllPlaces");

            //var Query = "SELECT DISTINCT(ADI.DcPlaceId) AS Id,ADI.DcPlaceName AS Name FROM ActionFollowUpInfoEntity AS AFI INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
            //            " WHERE AFI.ServiceId = " + ServiceId + " AND AFI.FollowUpUserId = " + FollowUpUserId + " AND AFI.IsForApproval != 'true' ";

            var Query = "SELECT DISTINCT(DcPlaceName) AS PlaceName FROM ActionDataCaptureInfoEntity" +
                       " WHERE DcPlaceId=" + PlaceId + " ";

            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetAllPlaces");

            var PlaceInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(PlaceInfo), "MyActionDAO.GetAllPlaces");
            OneViewConsole.Debug("GetAllPlaces end", "MyActionDAO.GetAllPlaces");

            return PlaceInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.GetAllActionInfo", Excep);
        }
    }

    this.GetAllTemplates = function (ServiceId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetAllTemplates start", "MyActionDAO.GetAllTemplates");

            var Query = "SELECT DISTINCT(ADI.TemplateNodeId) AS Id,ADI.TemplateNodeName AS Name FROM ActionFollowUpInfoEntity AS AFI INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " WHERE AFI.ServiceId = " + ServiceId + " AND AFI.FollowUpUserId = " + FollowUpUserId + " AND AFI.IsForApproval != 'true' ";

            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetAllTemplates");

            var TemplateInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(TemplateInfo), "MyActionDAO.GetAllTemplates");
            OneViewConsole.Debug("GetAllTemplates end", "MyActionDAO.GetAllTemplates");

            return TemplateInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.GetAllTemplates", Excep);
        }
    }

    this.GetAllActionsCount = function (ServiceId, DcPlaceId, TemplateNodeId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetAllTemplates start", "MyActionDAO.GetAllActionsCount");

            var Query = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity AS AFI INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                       " WHERE (AFI.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                       " AND (ADI.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                       " AND (ADI.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                       " AND (AFI.FollowUpUserId = " + FollowUpUserId + " OR -1=" + FollowUpUserId + ")"+
                       " AND AFI.IsForApproval  != 'true'" ;

            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetAllActionsCount");

            var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MyActionDAO.GetAllActionsCount");
            OneViewConsole.Debug("GetAllTemplates end", "MyActionDAO.GetAllActionsCount");

            return Result[0].TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.GetAllActionsCount", Excep);
        }
    }

    this.GetAllResolvedActionsCount = function (ServiceId, DcPlaceId, TemplateNodeId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetAllTemplates start", "MyActionDAO.GetAllResolvedActionsCount");

            var Query = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity AS AFI" +
                        " INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " INNER JOIN ActionResolveEntity AS AR ON AR.ActionDetailsId = AFI.ActionDetailsId" +
                        " WHERE (AFI.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                        " AND (ADI.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                        " AND (ADI.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                        " AND (AFI.FollowUpUserId = " + FollowUpUserId + " OR -1=" + FollowUpUserId + ")" +
                        " AND AR.ActionStatus = '1' AND AFI.IsForApproval != 'true' ";
                        //AND AFI.IsForApproval != 'true'";

            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetAllTemplates");

            var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MyActionDAO.GetAllResolvedActionsCount");
            OneViewConsole.Debug("GetAllTemplates end", "MyActionDAO.GetAllResolvedActionsCount");

            return Result[0].TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.GetAllResolvedActionsCount", Excep);
        }
    }

    this.GetUnSyncActionResolveCount = function (ServiceId, DcPlaceId, TemplateNodeId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetUnSyncActionResolveCount start", "MyActionDAO.GetUnSyncActionResolveCount");

            var Query = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity AS AFI" +
                        " INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " INNER JOIN ActionResolveEntity AS AR ON AR.ActionDetailsId = AFI.ActionDetailsId" +
                        " WHERE (AFI.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                        " AND (ADI.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                        " AND (ADI.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                        " AND (AFI.FollowUpUserId = " + FollowUpUserId + " OR -1=" + FollowUpUserId + ")" +
                        " AND AR.IsSynchronized = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetUnSyncActionResolveCount");

            var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "MyActionDAO.GetUnSyncActionResolveCount");
            OneViewConsole.Debug("GetUnSyncActionResolveCount end", "MyActionDAO.GetUnSyncActionResolveCount");

            return Result[0].TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.GetUnSyncActionResolveCount", Excep);
        }
    }
   
    this.GetAllActionResolveInfoForUpload = function (FilterParamLst, FollowUpUserId, IsTemplateView, Limit) {

        try {
            OneViewConsole.Debug("GetAllActionResolveInfo start", "MyActionDAO.GetAllActionResolveInfoForUpload");

            var Exp = FomatForInConditionById(FilterParamLst);

            var Query = "SELECT AFI.ActionDetailsId AS Id,AFI.ActionDataCaptureInfoId,AR.ActionStatus,ADI.DataCaptureServerId FROM ActionFollowUpInfoEntity AS AFI" +
                        " INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " INNER JOIN ActionResolveEntity AS AR ON AR.ActionDetailsId = AFI.ActionDetailsId" +
                        " WHERE (AFI.FollowUpUserId = " + FollowUpUserId + " OR -1=" + FollowUpUserId + ")";

            Query += (IsTemplateView == false) ? " AND ADI.DcPlaceId IN " : " AND ADI.TemplateNodeId IN ";
            Query += Exp;

            if (Limit != -1) {
                Query += " LIMIT " + Limit;
            }

            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetAllActionResolveInfoForUpload");

            var ActionInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
          
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionInfo), "MyActionDAO.GetAllActionResolveInfoForUpload");
            OneViewConsole.Debug("GetAllActionResolveInfo end", "MyActionDAO.GetAllActionResolveInfoForUpload");

            return ActionInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.GetAllActionResolveInfoForUpload", Excep);
        }
    }

    this.GetAllActionResolveEntityForUpload = function (ActionInfo) {

        try {
            OneViewConsole.Debug("GetAllResolvedActions start", "MyActionDAO.GetAllActionResolveEntityForUpload");

            var Exp = FomatForInConditionById(ActionInfo);
            var Query = "SELECT * FROM ActionResolveEntity WHERE IsSynchronized = 'false' AND ActionDetailsId IN " + Exp;
          
            OneViewConsole.DataLog("Requested Query : " + Query, "MyActionDAO.GetAllActionResolveEntityForUpload");

            var ActionResolveResponse = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
           
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionResolveResponse), "MyActionDAO.GetAllActionResolveEntityForUpload");
            OneViewConsole.Debug("GetAllResolvedActions end", "MyActionDAO.GetAllActionResolveEntityForUpload");

            return ActionResolveResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.GetAllActionResolveEntityForUpload", Excep);
        }
    }

    this.DeleteAllResolvedActions = function (ActionInfo) {

        try {
            OneViewConsole.Debug("DeleteAllResolvedActions start", "MyActionDAO.DeleteAllResolvedActions");

            var ResolvedActionInfo = [];
            var FollowUpCompletedDcInfo = [];
            var FollowUpPendingDcInfo = [];
           
            for (var i = 0; i < ActionInfo.length; i++) {
                if (ActionInfo[i].ActionStatus === "1") {
                    ResolvedActionInfo.push(ActionInfo[i]);
                    FollowUpCompletedDcInfo.push(ActionInfo[i].DataCaptureServerId);
                }
                else {
                    FollowUpPendingDcInfo.push(ActionInfo[i].DataCaptureServerId);
                }
            }
          
            if (ResolvedActionInfo.length > 0) {

                var Exp = FomatForInConditionById(ResolvedActionInfo);

                var Query1 = "DELETE FROM ActionResolveEntity WHERE ActionDetailsId IN " + Exp;;
                //alert(Query1);
                oOneViewSqlitePlugin.ExcecuteSql(Query1);

                var Query2 = "DELETE FROM ActionFollowUpInfoEntity WHERE ActionDetailsId IN " + Exp;
                //alert(Query2);
                oOneViewSqlitePlugin.ExcecuteSql(Query2);

                for (var i = 0; i < ResolvedActionInfo.length; i++) {

                    var Query3 = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity WHERE ActionDetailsId != " + ResolvedActionInfo[i].Id + " AND ActionDataCaptureInfoId = " + ResolvedActionInfo[i].ActionDataCaptureInfoId;
                    //alert(Query3);
                    var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query3);
                    //alert(JSON.stringify(Result));

                    if (Result[0].TotalCount == 0) {
                        var Query4 = "DELETE FROM ActionDataCaptureInfoEntity WHERE Id = " + ResolvedActionInfo[i].ActionDataCaptureInfoId;
                        //alert(Query4);
                        oOneViewSqlitePlugin.ExcecuteSql(Query4);
                    }
                }

                for (var i = 0; i < FollowUpPendingDcInfo.length; i++){
                    if (FollowUpPendingDcInfo.indexOf(FollowUpPendingDcInfo[i]) != -1) {
                        FollowUpCompletedDcInfo.splice(FollowUpPendingDcInfo.indexOf(FollowUpPendingDcInfo[i]), 1);
                    }
                }

                if (FollowUpCompletedDcInfo.length > 0) {
                    
                    var ServerIdExp = "(";

                    for (var i = 0; i < FollowUpCompletedDcInfo.length; i++) {
                        ServerIdExp += FollowUpCompletedDcInfo[i];
                        ServerIdExp += (i <= FollowUpCompletedDcInfo.length - 2) ? "," : ")";
                    }

                    var DcDeleteQuery = "SELECT Id,ClientGuid FROM DataCaptureEntity WHERE ServerId IN " + ServerIdExp;
                    var DcDeleteResult = oOneViewSqlitePlugin.ExcecuteSqlReader(DcDeleteQuery);

                    DeleteDataCaptures(DcDeleteResult);
                }
            }
         
            OneViewConsole.Debug("DeleteAllResolvedActions end", "MyActionDAO.DeleteAllResolvedActions");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.DeleteAllResolvedActions", Excep);
        }
    }

    /// <summary>
    /// Delete Data Captures
    /// </summary>
    /// <param name="result">result</param>
    var DeleteDataCaptures = function (result) {

        try {
            if (result.length > 0) {

                var oDcDAO = new DcDAO();
                var oActionDAO = new ActionDAO();

                try {
                    oActionDAO.DeleteNCDcResultDetailsByDcId(result);
                    oDcDAO.DeleteDcResultDetailsByDcId(result);

                    var Exp = FomatForInConditionByClientGuid(result);
                    var Query2 = "SELECT DISTINCT ActionClientGuid AS ClientGuid FROM DCNCMapping WHERE DataCaptureClientGuid IN " + Exp;
                    var ActionResult = oOneViewSqlitePlugin.ExcecuteSqlReader(Query2);

                    var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
                    _oMultiMediaSubElementsDAO.Delete(result);
                    _oMultiMediaSubElementsDAO.Delete(ActionResult);

                    var _oDcApprovalDAO = new DcApprovalDAO();
                    _oDcApprovalDAO.DeleteByDcInfo(result);
                }
                catch (e) {
                    OneViewConsole.Error("DataCapture deletion failed", "MyActionDAO.DeleteDataCaptures");
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "MyActionDAO.DeleteDataCaptures", Excep);
        }
        finally {
            oDcDAO = null;
            oActionDAO = null;
            Exp = null;
            Query2 = null;
            ActionResult = null;
            _oMultiMediaSubElementsDAO = null;
        }

    }

    /// <summary>
    /// Format InCondition
    /// </summary>
    /// <param name="Info">Id's</param>   
    /// <returns>In Condition</returns>  
    var FomatForInConditionById = function (Info) {

        try {
            OneViewConsole.Debug("FomatForInConditionById start", "MyAuditDAO.FomatForInConditionById");
            OneViewConsole.DataLog("Request Info : " + JSON.stringify(Info), "MyAuditDAO.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < Info.length; i++) {
                Incondition += Info[i].Id;
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "MyAuditDAO.FomatForInConditionById");
            OneViewConsole.Debug("FomatForInConditionById end", "MyAuditDAO.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MyAuditDAO.FomatForInConditionById", Excep);
        }
        finally {
            Incondition = null;
        }
    }
}

// ActionFollowUpUploadBO
function ActionFollowUpUploadBO($scope, xlatService) {

    var MyInstance = this;

    /// <summary>
    /// Bulk Upload for particular user
    /// </summary>  
    this.BulkUpload = function (FilterParamLst, FollowUpUserId, IsTemplateView, Limit) {

        var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

        try {
            oSetDefaultSpinner.Start();
           
            var IsSuccess = true;

            OneViewConsole.Debug("BulkUpload start", "ActionFollowUpUploadBO.BulkUpload");

            if (FilterParamLst.length > 0) {

                var _oMyActionDAO = new MyActionDAO();

                var ActionResolveInfo = _oMyActionDAO.GetAllActionResolveInfoForUpload(FilterParamLst, FollowUpUserId, IsTemplateView, Limit);

                if (ActionResolveInfo.length > 0) {

                    Update_UnSync_ActionResolve_ProcessCount();
                    var ActionResolveEntityLst = _oMyActionDAO.GetAllActionResolveEntityForUpload(ActionResolveInfo);

                    if (ActionResolveEntityLst.length > 0) {

                        Update_UnSync_MultiMediaSubElementsProcessCount();
                        var MultiMediaSubElementLst = GetAll_UnSync_MultiMediaSubElements();

                        var oUploadrequest = {
                            "ActionResolveEntityLst": ActionResolveEntityLst,
                            "MultiMediaMappingLst": MultiMediaSubElementLst
                        };

                        //alert(JSON.stringify(oUploadrequest));  

                        var _oActionFollowUpUploadIL = new ActionFollowUpUploadIL();
                        var oUploadResponse = _oActionFollowUpUploadIL.Upload(oUploadrequest);

                        //alert(JSON.stringify(oUploadResponse));
                        //alert(oUploadResponse.IsAnyException);

                        if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

                            try {
                                _oOneViewSqlitePlugin.StartTransaction();

                                Update_Upload_Response(oUploadResponse);

                                _oMyActionDAO.DeleteAllResolvedActions(ActionResolveInfo);

                                _oOneViewSqlitePlugin.EndTransaction();

                                alert(xlatService.xlat('UploadSuccess'));
                                OneViewConsole.Info("Upload success", "ActionFollowUpUploadBO.BulkUpload");
                            }
                            catch (Excep) {
                                alert(xlatService.xlat('UploadFailedLocal'));
                                OneViewConsole.Info("Upload failed local", "ActionFollowUpUploadBO.BulkUpload");
                                _oOneViewSqlitePlugin.Rollback();
                                IsSuccess = false;
                            }
                        }
                        else {
                            OneViewConsole.Info("Upload failed", "ActionFollowUpUploadBO.BulkUpload");
                            IsSuccess = false;
                        }
                    }
                    else {
                        alert(xlatService.xlat('NoDataForUpload'));
                        OneViewConsole.Info("No dc available", "ActionFollowUpUploadBO.BulkUpload");
                    }
                }
                else {
                    alert(xlatService.xlat('NoDataForUpload'));
                    OneViewConsole.Info("No dc available", "ActionFollowUpUploadBO.BulkUpload");
                }
            }
            else {
                alert(xlatService.xlat('NoDataForUpload'));
                OneViewConsole.Info("No dc available", "ActionFollowUpUploadBO.BulkUpload");
            }

            OneViewConsole.Debug("Upload end", "ActionFollowUpUploadBO.BulkUpload");
            oSetDefaultSpinner.Stop();

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpUploadBO.BulkUpload", Excep);
            return false;
        }
        finally {         
        }
    }


    /// <summary>
    /// Update_UnSync_ActionResolve_ProcessCount
    /// </summary> 
    var Update_UnSync_ActionResolve_ProcessCount = function () {

        try {
            OneViewConsole.Debug("Update_UnSync_ActionResolve_ProcessCount start", "ActionFollowUpUploadBO.Update_UnSync_ActionResolve_ProcessCount");

            // Update ProcessCount in DcResultDetailsEntity
            new DefaultMasterDAO("ActionResolveEntity").UpdateProcessCountForUnsyncData();

            OneViewConsole.Debug("Update_UnSync_ActionResolve_ProcessCount end", "ActionFollowUpUploadBO.Update_UnSync_ActionResolve_ProcessCount");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpUploadBO.Update_UnSync_ActionResolve_ProcessCount", Excep);
        }
    }


    /// <summary>
    /// Update_Upload_Response
    /// </summary> 
    var Update_Upload_Response = function (oUploadResponse) {

        try {
            OneViewConsole.Debug("Update_Uploaded_Rco_Response start", "ActionFollowUpUploadBO.Update_Uploaded_Rco_Response");

            // Update server id's in ActionResolveEntity                      
            if (oUploadResponse.ActionResolveResponceStatusDTOLst.length != 0) {               
                var oDefaultRcoMasterDAO = new DefaultMasterDAO("ActionResolveEntity");
                oDefaultRcoMasterDAO.UpdateMasterServerIds(oUploadResponse.ActionResolveResponceStatusDTOLst);
            }
            if (oUploadResponse.MultiMediaMappingResponceLst.length > 0) {
                Update_MultiMediaSubElements_Response(oUploadResponse.MultiMediaMappingResponceLst);
            }

            OneViewConsole.Debug("Update_Uploaded_Rco_Response end", "ActionFollowUpUploadBO.Update_Uploaded_Rco_Response");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpUploadBO.Update_Uploaded_Rco_Response", Excep);
        }
        finally {
            oDefaultRcoMasterDAO = null;
        }
    }


    /// <summary>
    /// Update_UnSync_MultiMediaSubElementsProcessCount
    /// </summary>
    var Update_UnSync_MultiMediaSubElementsProcessCount = function () {

        try {
            OneViewConsole.Debug("Update_UnSync_MultiMediaSubElementsProcessCount start", "ActionFollowUpUploadBO.Update_UnSync_MultiMediaSubElementsProcessCount");

            // Update ProcessCount in MultiMediaSubElements
            new DefaultMasterDAO("MultiMediaSubElements").UpdateProcessCountForUnsyncData();

            OneViewConsole.Debug("Update_UnSync_MultiMediaSubElementsProcessCount end", "ActionFollowUpUploadBO.Update_UnSync_MultiMediaSubElementsProcessCount");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpUploadBO.Update_UnSync_MultiMediaSubElementsProcessCount", Excep);
        }
    }


    /// <summary>
    /// GetAll_UnSync_MultiMediaSubElements
    /// </summary>
    var GetAll_UnSync_MultiMediaSubElements = function () {

        try {
            OneViewConsole.Debug("GetAll_UnSync_MultiMediaSubElements start", "ActionFollowUpUploadBO.GetAll_UnSync_MultiMediaSubElements");

            // Get all un-sync GetAll_UnSync_MultiMediaSubElements
            var MultiMediaSubElementsList = new DefaultMasterDAO("MultiMediaSubElements").GetAllUnSyncMasters();

            OneViewConsole.Debug("GetAll_UnSync_MultiMediaSubElements end", "ActionFollowUpUploadBO.GetAll_UnSync_MultiMediaSubElements");

            return MultiMediaSubElementsList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpUploadBO.GetAll_UnSync_MultiMediaSubElements", Excep);
        }
        finally {
            MultiMediaSubElementsList = null;
        }
    }


    /// <summary>
    /// Update_MultiMediaSubElements_Response
    /// </summary>
    /// <param name="MultiMediaSubElementsResponseDTO">MultiMediaSubElementsResponseDTO</param>
    var Update_MultiMediaSubElements_Response = function (MultiMediaSubElementsResponseDTO) {

        try {
            OneViewConsole.Debug("Update_MultiMediaSubElements_Response start", "ActionFollowUpUploadBO.Update_MultiMediaSubElements_Response");
            // alert(MultiMediaSubElementsResponseDTO.length);
            // Update server id's in MultiMediaBlobSubElements                      
            if (MultiMediaSubElementsResponseDTO.length != 0) {
                var oDefaultRcoMasterDAO = new DefaultMasterDAO("MultiMediaSubElements");
                oDefaultRcoMasterDAO.UpdateMasterServerIds(MultiMediaSubElementsResponseDTO);
            }
            OneViewConsole.Debug("Update_MultiMediaSubElements_Response end", "ActionFollowUpUploadBO.Update_MultiMediaSubElements_Response");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpUploadBO.Update_MultiMediaBlobSubElements_Response", Excep);
        }
        finally {
            oDefaultRcoMasterDAO = null;
        }
    }

    /// <summary>
    /// Auto Upload for particular user
    /// </summary>  
    this.AutoUpload = function (FilterParamLst, FollowUpUserId, IsTemplateView, Limit) {

        var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

        try {
         //   oSetDefaultSpinner.Start();

            var IsSuccess = true;

            OneViewConsole.Debug("BulkUpload start", "ActionFollowUpUploadBO.BulkUpload");

            if (FilterParamLst.length > 0) {

                oOneViewProgressbar.Start(xlatService.xlat("Synchronization in-progress"));

                var _oMyActionDAO = new MyActionDAO();

                var ActionResolveInfo = _oMyActionDAO.GetAllActionResolveInfoForUpload(FilterParamLst, FollowUpUserId, IsTemplateView, Limit);

                if (ActionResolveInfo.length > 0) {

                    Update_UnSync_ActionResolve_ProcessCount();
                    var ActionResolveEntityLst = _oMyActionDAO.GetAllActionResolveEntityForUpload(ActionResolveInfo);

                    if (ActionResolveEntityLst.length > 0) {

                        Update_UnSync_MultiMediaSubElementsProcessCount();
                        var MultiMediaSubElementLst = GetAll_UnSync_MultiMediaSubElements();

                        var oUploadrequest = {
                            "ActionResolveEntityLst": ActionResolveEntityLst,
                            "MultiMediaMappingLst": MultiMediaSubElementLst
                        };

                        //alert(JSON.stringify(oUploadrequest));

                        var _oActionFollowUpUploadIL = new ActionFollowUpUploadIL();
                        var oUploadResponse = _oActionFollowUpUploadIL.Upload(oUploadrequest);

                        //alert(JSON.stringify(oUploadResponse));
                        //alert(oUploadResponse.IsAnyException);

                        if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

                            try {
                                _oOneViewSqlitePlugin.StartTransaction();

                                Update_Upload_Response(oUploadResponse);

                                _oMyActionDAO.DeleteAllResolvedActions(ActionResolveInfo);

                                _oOneViewSqlitePlugin.EndTransaction();

                                //alert(xlatService.xlat('UploadSuccess'));
                                OneViewConsole.Info("Upload success", "ActionFollowUpUploadBO.BulkUpload");
                            }
                            catch (Excep) {
                                //alert(xlatService.xlat('UploadFailedLocal'));
                                OneViewConsole.Info("Upload failed local", "ActionFollowUpUploadBO.BulkUpload");
                                _oOneViewSqlitePlugin.Rollback();
                                IsSuccess = false;
                            }
                        }
                        else {
                            OneViewConsole.Info("Upload failed", "ActionFollowUpUploadBO.BulkUpload");
                            IsSuccess = false;
                        }
                    }
                    else {
                        alert(xlatService.xlat('NoDataForUpload'));
                        OneViewConsole.Info("No dc available", "ActionFollowUpUploadBO.BulkUpload");
                    }
                }
                else {
                    //alert(xlatService.xlat('NoDataForUpload'));
                    OneViewConsole.Info("No dc available", "ActionFollowUpUploadBO.BulkUpload");
                }
            }
            else {
               // alert(xlatService.xlat('NoDataForUpload'));
                OneViewConsole.Info("No dc available", "ActionFollowUpUploadBO.BulkUpload");
            }

            OneViewConsole.Debug("Upload end", "ActionFollowUpUploadBO.BulkUpload");
           // oSetDefaultSpinner.Stop();
            oOneViewProgressbar.Stop();
            return IsSuccess;
        }
        catch (Excep) {
            oOneViewProgressbar.Stop();
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpUploadBO.BulkUpload", Excep);
            return false;
        }
        finally {
        }
    }



}

// ActionFollowUpUploadIL
function ActionFollowUpUploadIL() {

    var MyInstance = this;

    // UploadDcIL object
    var MyInstance = this;

    /// <summary>
    /// Upload
    /// </summary>
    /// <param name="UploadReq">UploadReq</param>
    this.Upload = function (UploadReq) {

        try {
            OneViewConsole.Debug("Upload start", "ActionFollowUpUploadIL.Upload");

            var RequestParam = JSON.stringify(UploadReq);

            OneViewConsole.DataLog("RequestParam : " + RequestParam, "ActionFollowUpUploadIL.Upload");

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/UploadActionResolve_Json";
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
            var oUploadResponse = _oOneViewChannel.Send({ "ShowExceptionMessage": false });

            OneViewConsole.Debug("Upload end", "UploadDcIL.Upload");

            if (oUploadResponse != null) {

                oUploadResponse = JSON.parse(oUploadResponse.UploadActionResolve_JsonResult);

                OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUploadResponse), "ActionFollowUpUploadIL.Upload");
            }

            return oUploadResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "ActionFollowUpUploadIL.Upload", Excep);
        }
        finally {
            RequestParam = null;
            _oOneViewChannel = null;
            oUploadResponse = null;
        }
    }
}