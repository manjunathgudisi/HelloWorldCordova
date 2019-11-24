
var MyActionTotalDCCountForUpload = 0;
var MyActionUploadLimit = 50;
var MyActionUploadProgressValue = 0;
var MyActionUploadBatchNumber = 1;

var ActionFollowupApprovalPlaceSelectionConfig = {
     "IsTemplateView": false,   
}

var ActionFollowUpApprovalProfileTempList = null;
// ActionFollowupApprovalPlaceSelectionController
MyApp.controller('ActionFollowupApprovalPlaceSelectionController', function ($scope, $compile, $location, xlatService) {

    var IsNavigate = false;
    var Url;

    ////////////////*********************** Validation for Checking Any action available before going to MyAction page when any profile are there only************************ START///////////////////////////

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var UserId = OneViewSessionStorage.Get("LoginUserId");

    var TotalResolvedActionCount = 0;

    var Req = { 'ServiceId': ServiceId, 'UserId': UserId, 'TemplateNodeId': -1, 'PlaceId': -1 };   
    var _oActionFollowUpApprovalProfileDAO = new ActionFollowUpApprovalProfileDAO();
    ActionFollowUpApprovalProfileTempList = _oActionFollowUpApprovalProfileDAO.GetProfilesByAllDimensions(Req);

    if (ActionFollowUpApprovalProfileTempList != null && ActionFollowUpApprovalProfileTempList.length > 0) {
      //  alert('ActionFollowUpApprovalProfileTempList : ' + JSON.stringify(ActionFollowUpApprovalProfileTempList));

        var _oActionFollowupApprovalPlaceSelectionDAO = new ActionFollowupApprovalPlaceSelectionDAO();
        //for (var i = 0; i < ActionFollowUpApprovalProfileTempList.length ; i++) {
        //    TotalResolvedActionCount += _oActionFollowupApprovalPlaceSelectionDAO.GetAllResolvedActionsCount(ServiceId, -1, -1, ActionFollowUpApprovalProfileTempList[i].FollowUpUserId);
        //}

        TotalResolvedActionCount = _oActionFollowupApprovalPlaceSelectionDAO.GetAllResolvedActionsCount(ServiceId, -1, -1, ActionFollowUpApprovalProfileTempList);
       // alert('TotalResolvedActionCount : ' + TotalResolvedActionCount);
    }

   if (TotalResolvedActionCount > 0) {
        //$location.url('nav/my-actions');
        IsNavigate = true;
    }
    else {
        //alert("IN-NF-MAC-001 :: No actions are available to followUp");
       var MessageKey = xlatService.xlat('IN-NF-MAC-001 :: No actions are available for approval.');
        Url = '/notifycall?MessageKey=' + MessageKey + '';
    }

    ////////////////*********************** Validation for Checking Any action available before going to MyAction page when any profile are there only************************ END///////////////////////////

    if (IsNavigate == true) {
        var _oActionFollowupApprovalPlaceSelectionFacade = new ActionFollowupApprovalPlaceSelectionFacade($scope, $compile, $location, xlatService);
        _oActionFollowupApprovalPlaceSelectionFacade.Init();
        _oActionFollowupApprovalPlaceSelectionFacade.PageLoad();
    }
    else {
        $location.url(Url);
    }


    $scope.Upload = function () {
        _oActionFollowupApprovalPlaceSelectionFacade.Upload();
    }

    $scope.RowClick = function (Id, Name) {     
        _oActionFollowupApprovalPlaceSelectionFacade.RowClick(Id, Name);
    }
});

// ActionFollowupApprovalPlaceSelectionFacade
function ActionFollowupApprovalPlaceSelectionFacade($scope, $compile, $location, xlatService) {

    var MyInstance = this;

    var _ActionFollowupApprovalPlaceSelectionBO = new ActionFollowupApprovalPlaceSelectionBO($scope, $compile, $location, xlatService);

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "ActionFollowupApprovalPlaceSelectionFacade.Init");

            xlatService.setCurrentPage('21');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

            $scope.PlaceLst = [];
            $scope.TemplateLst = [];

            OneViewConsole.Debug("Init end", "ActionFollowupApprovalPlaceSelectionFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowupApprovalPlaceSelectionFacade.Init", xlatService);
        }
        finally {
        }
    }

    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "ActionFollowupApprovalPlaceSelectionFacade.PageLoad");
         
            _ActionFollowupApprovalPlaceSelectionBO.PageLoad();

            OneViewConsole.Debug("PageLoad end", "ActionFollowupApprovalPlaceSelectionFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowupApprovalPlaceSelectionFacade.PageLoad", xlatService);
        }
        finally {         
        }
    }

    this.Upload = function () {

        try {
            OneViewConsole.Debug("Upload start", "ActionFollowupApprovalPlaceSelectionFacade.Upload");

            _ActionFollowupApprovalPlaceSelectionBO.Upload();

            OneViewConsole.Debug("Upload end", "ActionFollowupApprovalPlaceSelectionFacade.Upload");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowupApprovalPlaceSelectionFacade.Upload", xlatService);
        }
        finally {          
        }
    }

    this.RowClick = function (Id, Name) {

        try {
            OneViewConsole.Debug("RowClick start", "ActionFollowupApprovalPlaceSelectionFacade.RowClick");

            var Url = '/ActionFollowUpApprovalSelection?Id=' + Id + '&Name=' + Name + '&IsTemplateView=' + ActionFollowupApprovalPlaceSelectionConfig.IsTemplateView + '';
           // alert('Url : ' + Url);
            // 'nav/my-action-followup?Id=' + Id + '&Name=' + Name + '&IsTemplateView=' + ActionFollowupApprovalPlaceSelectionConfig.IsTemplateView + '';
            $location.url(Url);

            OneViewConsole.Debug("RowClick end", "ActionFollowupApprovalPlaceSelectionFacade.RowClick");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowupApprovalPlaceSelectionFacade.RowClick", xlatService);
        }
        finally {
        }
    }
}

// ActionFollowupApprovalPlaceSelectionBO
function ActionFollowupApprovalPlaceSelectionBO($scope, $compile, $location, xlatService) {

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    this.PageLoad = function () {
       
        try {
            OneViewConsole.Debug("PageLoad start", "ActionFollowupApprovalPlaceSelectionFacade.PageLoad");
           
            var _oActionFollowupApprovalPlaceSelectionDAO = new ActionFollowupApprovalPlaceSelectionDAO();
            var ResponseObj=[];

            if (ActionFollowupApprovalPlaceSelectionConfig.IsTemplateView == false) {
                ResponseLst = _oActionFollowupApprovalPlaceSelectionDAO.GetAllPlaces(ServiceId, ActionFollowUpApprovalProfileTempList);

               // ResponseLst = [{ 'Id': 3, 'Name': 'Tiffany' }, { 'Id': 5, 'Name': 'Unipex Diary' }];
                //alert('ResponseLst : ' + JSON.stringify(ResponseLst));
                for (var i = 0; i < ResponseLst.length; i++) {
                    //ResponseLst[i].TotalActions = _oActionFollowupApprovalPlaceSelectionDAO.GetAllActionsCount(ServiceId, ResponseLst[i].Id, -1, LoginUserId);
                    //ResponseLst[i].CompletedActions = _oActionFollowupApprovalPlaceSelectionDAO.GetAllResolvedActionsCount(ServiceId, ResponseLst[i].Id, -1, LoginUserId);

                    ResponseLst[i].TotalActions = _oActionFollowupApprovalPlaceSelectionDAO.GetAllResolvedActionsCount(ServiceId, ResponseLst[i].Id, -1, ActionFollowUpApprovalProfileTempList); //total resoved action
                    ResponseLst[i].CompletedActions = _oActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionsCount(ServiceId, ResponseLst[i].Id, -1, ActionFollowUpApprovalProfileTempList); //approved actions count
                    //alert(ResponseLst[i].Id+"--TotalActions--"+ResponseLst[i].TotalActions+"--CompletedActions--"+ResponseLst[i].CompletedActions);
                    if(ResponseLst[i].TotalActions >0){
                        ResponseObj.push(ResponseLst[i]);
                    }
                    //alert('ResponseLst : ' + JSON.stringify(ResponseLst));
                }
                //$scope.PlaceLst = ResponseLst;
                $scope.PlaceLst = ResponseObj;
            }
            else {
                alert("Not implemented exception : Templatewise view");
                //ResponseLst = _oActionFollowupApprovalPlaceSelectionDAO.GetAllTemplates(ServiceId, LoginUserId);
                //for (var i = 0; i < ResponseLst.length; i++) {
                //    ResponseLst[i].TotalActions = _oActionFollowupApprovalPlaceSelectionDAO.GetAllActionsCount(ServiceId, -1, ResponseLst[i].Id, LoginUserId);
                //    ResponseLst[i].CompletedActions = _oActionFollowupApprovalPlaceSelectionDAO.GetAllResolvedActionsCount(ServiceId, -1, ResponseLst[i].Id, LoginUserId);
                //}
                //$scope.TemplateLst = ResponseLst;
            }

            //var Html = GetHtml(ResponseLst);
            var Html = GetHtml(ResponseObj);

            document.getElementById('ContentBlock').innerHTML = "";
            var _oOneViewCompiler = new OneViewCompiler();

            if (Html != "") {
                _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "ContentBlock");
            }

            OneViewConsole.Debug("PageLoad end", "ActionFollowupApprovalPlaceSelectionFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowupApprovalPlaceSelectionFacade.PageLoad", xlatService);
        }
        finally {
        }
    }

    var GetHtml = function (ResponseLst) {

        try {
            OneViewConsole.Debug("GetHtml start", "ActionFollowupApprovalPlaceSelectionFacade.GetHtml");

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

            OneViewConsole.Debug("GetHtml end", "ActionFollowupApprovalPlaceSelectionFacade.GetHtml");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowupApprovalPlaceSelectionFacade.GetHtml", xlatService);
        }
        finally {
        }
    }

    this.Upload = function () {

        try {
            OneViewConsole.Debug("Upload start", "MyActionFacade.Upload");

            var _oActionFollowupApprovalPlaceSelectionDAO = new ActionFollowupApprovalPlaceSelectionDAO();

            var UnSyncActionResolveCount = _oActionFollowupApprovalPlaceSelectionDAO.GetUnSyncApprovedActionResolveCount(ServiceId, -1, -1, ActionFollowUpApprovalProfileTempList);

            if (UnSyncActionResolveCount > 0) {

                var Message = xlatService.xlat('Upload_confirm_Message');
                var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

                if (IsSuccess == true) {

                    if (MyActionPageConfig.IsTemplateView == false) {

                        var _oUploadBO = new UploadBO(xlatService, '');

                        var IsMultiMediaSubElementsSuccess = _oUploadBO.UploadMultiMediaSubElements();

                        if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == true) {

                            var _oActionFollowupApprovalUploadBO = new ActionFollowupApprovalUploadBO($scope, xlatService);

                            var IsSuccess = _oActionFollowupApprovalUploadBO.BulkUpload($scope.PlaceLst, ActionFollowUpApprovalProfileTempList, MyActionPageConfig.IsTemplateView, -1);

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
}

// ActionFollowupApprovalPlaceSelectionDAO
function ActionFollowupApprovalPlaceSelectionDAO() {

    var MyInstance = this;
    var oOneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.GetAllPlaces = function (ServiceId, ActionFollowUpApprovalProfileTempList) {

        try {
            OneViewConsole.Debug("GetAllPlaces start", "ActionFollowupApprovalPlaceSelectionDAO.GetAllPlaces");
                    
            
            var PlaceList=[];
            for (var i = 0; i < ActionFollowUpApprovalProfileTempList.length; i++) {
                var ActionFollowUpApprovalProfileData = ActionFollowUpApprovalProfileTempList[i];
               
                if (PlaceList.length > 0) {
                    var IsExists = false;
                    for (var j = 0; j < PlaceList.length; j++) {
                        if (PlaceList[j].Id == ActionFollowUpApprovalProfileData.PlaceId) {
                            IsExists = true;
                            break;
                        }
                    }
                    if (IsExists != true) {
                        PlaceList.push({ 'Id': ActionFollowUpApprovalProfileData.PlaceId, 'Name': ActionFollowUpApprovalProfileData.PlaceName });
                    }
                }
                else {
                    PlaceList.push({ 'Id': ActionFollowUpApprovalProfileData.PlaceId, 'Name': ActionFollowUpApprovalProfileData.PlaceName });
                }
            }

            /*
           
            var Incondition = "(";
            
            for (var i = 0; i < ActionFollowUpApprovalProfileTempList.length; i++) {
                Incondition += ActionFollowUpApprovalProfileTempList[i].FollowUpUserId;
                Incondition += (i <= ActionFollowUpApprovalProfileTempList.length - 2) ? "," : ")";
            }

            alert(' ActionFollowUpApprovalProfileTempList : ' + JSON.stringify(ActionFollowUpApprovalProfileTempList));
            var Query = "SELECT DISTINCT(ADI.DcPlaceId) AS Id,ADI.DcPlaceName AS Name FROM ActionFollowUpInfoEntity AS AFI INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " INNER JOIN ActionResolveEntity AR ON AR.FollowUpUserId = AFI.FollowUpUserId AND AR.ActionDetailsId = AFI.ActionDetailsId AND AR.ActionStatus = '1' " +
                        " WHERE AFI.ServiceId = " + ServiceId + " AND AFI.FollowUpUserId IN " + Incondition;
                    
            // AND AR.IsOnDeviceApprovalFinished != 'true' 
            alert('jj Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetAllPlaces");

            var PlaceInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
            */

           // alert('PlaceList : ' + JSON.stringify(PlaceList));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(PlaceList), "ActionFollowupApprovalPlaceSelectionDAO.GetAllPlaces");
            OneViewConsole.Debug("GetAllPlaces end", "ActionFollowupApprovalPlaceSelectionDAO.GetAllPlaces");

            return PlaceList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetAllActionInfo", Excep);
        }
    }

    this.GetAllTemplates = function (ServiceId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetAllTemplates start", "ActionFollowupApprovalPlaceSelectionDAO.GetAllTemplates");

            var Query = "SELECT DISTINCT(ADI.TemplateNodeId) AS Id,ADI.TemplateNodeName AS Name FROM ActionFollowUpInfoEntity AS AFI INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " WHERE AFI.ServiceId = " + ServiceId + " AND AFI.FollowUpUserId = " + FollowUpUserId;

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetAllTemplates");

            var TemplateInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(TemplateInfo), "ActionFollowupApprovalPlaceSelectionDAO.GetAllTemplates");
            OneViewConsole.Debug("GetAllTemplates end", "ActionFollowupApprovalPlaceSelectionDAO.GetAllTemplates");

            return TemplateInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetAllTemplates", Excep);
        }
    }

    this.GetAllActionsCount = function (ServiceId, DcPlaceId, TemplateNodeId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetAllTemplates start", "ActionFollowupApprovalPlaceSelectionDAO.GetAllActionsCount");

            var Query = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity AS AFI INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                       " WHERE (AFI.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                       " AND (ADI.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                       " AND (ADI.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                       " AND (AFI.FollowUpUserId = " + FollowUpUserId + " OR -1=" + FollowUpUserId + ")";

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetAllActionsCount");

            var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowupApprovalPlaceSelectionDAO.GetAllActionsCount");
            OneViewConsole.Debug("GetAllTemplates end", "ActionFollowupApprovalPlaceSelectionDAO.GetAllActionsCount");

            return Result[0].TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetAllActionsCount", Excep);
        }
    }

    this.GetAllResolvedActionsCount = function (ServiceId, DcPlaceId, TemplateNodeId, ActionFollowUpApprovalProfileTempList) {

        try {
            OneViewConsole.Debug("GetAllTemplates start", "ActionFollowupApprovalPlaceSelectionDAO.GetAllResolvedActionsCount");

            var Incondition;
            if (ActionFollowUpApprovalProfileTempList != -1) {
                Incondition = "(";

                for (var i = 0; i < ActionFollowUpApprovalProfileTempList.length; i++) {
                    Incondition += ActionFollowUpApprovalProfileTempList[i].FollowUpUserId;
                    Incondition += (i <= ActionFollowUpApprovalProfileTempList.length - 2) ? "," : ")";
                }
            }
            else {
                Incondition = -1;
            }
            
            var Query = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity AS AFI" +
                        " INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " INNER JOIN ActionResolveEntity AS AR ON AR.ActionDetailsId = AFI.ActionDetailsId" +
                        " WHERE (AFI.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                        " AND (ADI.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                        " AND (ADI.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                        " AND (AFI.FollowUpUserId IN " + Incondition +  ")" +
                        " AND AFI.IsForApproval != 'false' AND AR.ActionStatus = '1'";

           // alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetAllTemplates");

            var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

           // alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowupApprovalPlaceSelectionDAO.GetAllResolvedActionsCount");
            OneViewConsole.Debug("GetAllTemplates end", "ActionFollowupApprovalPlaceSelectionDAO.GetAllResolvedActionsCount");

            var TotalCount = 0;
            if (Result != null && Result.length > 0) {
                TotalCount = Result[0].TotalCount;
            }
            return TotalCount;
        }
        catch (Excep) {
          //  alert('GetAllResolvedActionsCount Excep 11 : ' + Excep);
           // alert('GetAllResolvedActionsCount Excep : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetAllResolvedActionsCount", Excep);
        }
    }

    this.GetUnSyncActionResolveCount = function (ServiceId, DcPlaceId, TemplateNodeId, FollowUpUserId) {

        try {
            OneViewConsole.Debug("GetUnSyncActionResolveCount start", "ActionFollowupApprovalPlaceSelectionDAO.GetUnSyncActionResolveCount");

            var Query = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity AS AFI" +
                        " INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " INNER JOIN ActionResolveEntity AS AR ON AR.ActionDetailsId = AFI.ActionDetailsId" +
                        " WHERE (AFI.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                        " AND (ADI.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                        " AND (ADI.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                        " AND (AFI.FollowUpUserId = " + FollowUpUserId + " OR -1=" + FollowUpUserId + ")" +
                        " AND AR.IsSynchronized = 'false'";

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetUnSyncActionResolveCount");

            var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowupApprovalPlaceSelectionDAO.GetUnSyncActionResolveCount");
            OneViewConsole.Debug("GetUnSyncActionResolveCount end", "ActionFollowupApprovalPlaceSelectionDAO.GetUnSyncActionResolveCount");

            return Result[0].TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetUnSyncActionResolveCount", Excep);
        }
    }
   
    this.GetAllApprovedActionResolveInfoForUpload = function (FilterParamLst, ActionFollowUpApprovalProfileTempList, IsTemplateView, Limit) {

        try {
            OneViewConsole.Debug("GetAllActionResolveInfo start", "ActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionResolveInfoForUpload");

            var Incondition;
            if (ActionFollowUpApprovalProfileTempList != -1) {
                Incondition = "(";

                for (var i = 0; i < ActionFollowUpApprovalProfileTempList.length; i++) {
                    Incondition += ActionFollowUpApprovalProfileTempList[i].FollowUpUserId;
                    Incondition += (i <= ActionFollowUpApprovalProfileTempList.length - 2) ? "," : ")";
                }
            }
            else {
                Incondition = -1;
            }

            var Exp = FomatForInConditionById(FilterParamLst);

            var Query = "SELECT AFI.ActionDetailsId AS Id,AFI.ActionDataCaptureInfoId,AR.ActionStatus,ADI.DataCaptureServerId,AR.ClientGuid FROM ActionFollowUpInfoEntity AS AFI" +
                        " INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " INNER JOIN ActionResolveEntity AS AR ON AR.ActionDetailsId = AFI.ActionDetailsId" +
                        " WHERE (AFI.FollowUpUserId IN " + Incondition + ")" +
                        " AND AR.IsSubmited = 'true' ";

            Query += (IsTemplateView == false) ? " AND ADI.DcPlaceId IN " : " AND ADI.TemplateNodeId IN ";
            Query += Exp;

            //alert('Query : ' + Query);
            if (Limit != -1) {
                Query += " LIMIT " + Limit;
            }

            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionResolveInfoForUpload");

            var ActionInfo = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
           // alert('ActionInfo : ' + JSON.stringify(ActionInfo));
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionInfo), "ActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionResolveInfoForUpload");
            OneViewConsole.Debug("GetAllActionResolveInfo end", "ActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionResolveInfoForUpload");

            return ActionInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionResolveInfoForUpload", Excep);
        }
    }

    this.GetApprovedActionResolveEntityForUpload = function (ActionInfo) {

        try {
            OneViewConsole.Debug("GetAllResolvedActions start", "ActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityForUpload");

            var Exp = FomatForInConditionById(ActionInfo);
            var Query = "SELECT * FROM ActionResolveEntity WHERE IsSubmited = 'true' AND IsSynchronized = 'false' AND ActionDetailsId IN " + Exp;
           // alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityForUpload");

            var ActionResolveResponse = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
            //alert('ActionResolveResponse : ' + JSON.stringify(ActionResolveResponse));
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionResolveResponse), "ActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityForUpload");
            OneViewConsole.Debug("GetAllResolvedActions end", "ActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityForUpload");

            return ActionResolveResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityForUpload", Excep);
        }
    }

    this.GetActionResolveApprovalEntityForUpload = function (ActionInfo) {

        try {
            OneViewConsole.Debug("GetActionResolveApprovalEntityForUpload start", "ActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForUpload");

            var Exp = FormatForInConditionByClientGuid(ActionInfo);
            var Query = "SELECT * FROM ActionResolveApprovalEntity WHERE ActionResolveClientGuid IN " + Exp;
           // alert('GetActionResolveApprovalEntityForUpload Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForUpload");

            var ActionResolveApprovalResponse = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
           // alert('ActionResolveApprovalResponse : ' + JSON.stringify(ActionResolveApprovalResponse));
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionResolveApprovalResponse), "ActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForUpload");
            OneViewConsole.Debug("GetActionResolveApprovalEntityForUpload end", "ActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForUpload");

            return ActionResolveApprovalResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForUpload", Excep);
        }
    }

    this.GetActionResolveApprovalEntityForDelete = function (ActionInfo) {

        try {
            OneViewConsole.Debug("GetActionResolveApprovalEntityForDelete start", "ActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForDelete");

            var Exp = FormatForInConditionByClientGuid(ActionInfo);
            var Query = "SELECT * FROM ActionResolveApprovalEntity WHERE ActionResolveClientGuid IN " + Exp;
            //alert('GetActionResolveApprovalEntityForDelete Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForDelete");

            var ActionResolveApprovalResponse = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

           // alert('ActionResolveApprovalResponse : ' + JSON.stringify(ActionResolveApprovalResponse));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionResolveApprovalResponse), "ActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForDelete");
            OneViewConsole.Debug("GetActionResolveApprovalEntityForDelete end", "ActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForDelete");

            return ActionResolveApprovalResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForDelete", Excep);
        }
    }

    this.DeleteAllResolvedActions = function (ApproveActionResolveInfo) {

        try {
            OneViewConsole.Debug("DeleteAllResolvedActions start", "ActionFollowupApprovalPlaceSelectionDAO.DeleteAllResolvedActions");

           
            if (ApproveActionResolveInfo.length > 0) {
               // alert('ApproveActionResolveInfo : ' + JSON.stringify(ApproveActionResolveInfo));

                var FullApprovalFinishedActionResolveResponseList = MyInstance.GetApprovedActionResolveEntityByActionResolveClientGuid(ApproveActionResolveInfo);

                if (FullApprovalFinishedActionResolveResponseList != null && FullApprovalFinishedActionResolveResponseList.length > 0) {

                    var Incondition = "(";

                    for (var i = 0; i < FullApprovalFinishedActionResolveResponseList.length; i++) {
                        Incondition += FullApprovalFinishedActionResolveResponseList[i].ActionDetailsId;
                        Incondition += (i <= FullApprovalFinishedActionResolveResponseList.length - 2) ? "," : ")";
                    }

                    var QueryActionDetails = "DELETE FROM ActionDetailsEntity WHERE ServerId IN " + Incondition;
                    // alert(QueryActionDetails);
                     oOneViewSqlitePlugin.ExcecuteSql(QueryActionDetails);
                     //alert('action details deleted');

                     var Query1 = "DELETE FROM ActionResolveEntity WHERE ActionDetailsId IN " + Incondition;
                    // alert(Query1);
                     oOneViewSqlitePlugin.ExcecuteSql(Query1);
                }

               // var ResolveApprovalForDeleteList = MyInstance.GetActionResolveApprovalEntityForDelete(ApproveActionResolveInfo);
               // alert('ResolveApprovalForDeleteList : ' + JSON.stringify(ResolveApprovalForDeleteList));
                var Exp = FomatForInConditionById(ApproveActionResolveInfo);

             


                var ClientGuidExp = FormatForInConditionByClientGuid(ApproveActionResolveInfo);
                var QueryActionResolveApproval = "DELETE FROM ActionResolveApprovalEntity WHERE ActionResolveClientGuid IN " + ClientGuidExp;
                //alert(QueryActionResolveApproval);
                oOneViewSqlitePlugin.ExcecuteSql(QueryActionResolveApproval);

                var Query2 = "DELETE FROM ActionFollowUpInfoEntity WHERE ActionDetailsId IN " + Exp;
               // alert(Query2);
                oOneViewSqlitePlugin.ExcecuteSql(Query2);

                for (var i = 0; i < ApproveActionResolveInfo.length; i++) {

                    var Query3 = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity WHERE ActionDetailsId != " + ApproveActionResolveInfo[i].Id + " AND ActionDataCaptureInfoId = " + ApproveActionResolveInfo[i].ActionDataCaptureInfoId;
                   // alert(Query3);
                    var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query3);
                    //alert(JSON.stringify(Result));

                    if (Result[0].TotalCount == 0) {
                        var Query4 = "DELETE FROM ActionDataCaptureInfoEntity WHERE Id = " + ApproveActionResolveInfo[i].ActionDataCaptureInfoId;
                      //  alert(Query4);
                        oOneViewSqlitePlugin.ExcecuteSql(Query4);
                    }
                }
            }
         
            OneViewConsole.Debug("DeleteAllResolvedActions end", "ActionFollowupApprovalPlaceSelectionDAO.DeleteAllResolvedActions");
        }
        catch (Excep) {
           // alert('DeleteAllResolvedActions Excep : ' + Excep);
           // alert('DeleteAllResolvedActions Excep : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.DeleteAllResolvedActions", Excep);
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
                    OneViewConsole.Error("DataCapture deletion failed", "ActionFollowupApprovalPlaceSelectionDAO.DeleteDataCaptures");
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.DeleteDataCaptures", Excep);
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

    var FormatForInConditionByClientGuid = function (Info) {

        try {
            OneViewConsole.Debug("FormatForInConditionByClientGuid start", "MyAuditDAO.FormatForInConditionByClientGuid");
            OneViewConsole.DataLog("Request Info : " + JSON.stringify(Info), "MyAuditDAO.FormatForInConditionByClientGuid");

            var Incondition = "(";

            for (var i = 0; i < Info.length; i++) {
                var ClientGuid = "'" + Info[i].ClientGuid + "'";
                Incondition += ClientGuid;
                Incondition += (i <= Info.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "MyAuditDAO.FormatForInConditionByClientGuid");
            OneViewConsole.Debug("FormatForInConditionByClientGuid end", "MyAuditDAO.FormatForInConditionByClientGuid");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "MyAuditDAO.FormatForInConditionByClientGuid", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    this.GetAllApprovedActionsCount = function (ServiceId, DcPlaceId, TemplateNodeId, ActionFollowUpApprovalProfileTempList) {

        try {
            OneViewConsole.Debug("GetAllTemplates start", "ActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionsCount");

            var Incondition;
            if (ActionFollowUpApprovalProfileTempList != -1) {
                Incondition = "(";

                for (var i = 0; i < ActionFollowUpApprovalProfileTempList.length; i++) {
                    Incondition += ActionFollowUpApprovalProfileTempList[i].FollowUpUserId;
                    Incondition += (i <= ActionFollowUpApprovalProfileTempList.length - 2) ? "," : ")";
                }
            }
            else {
                Incondition = -1;
            }

            var Query = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity AS AFI" +
                        " INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " INNER JOIN ActionResolveEntity AS AR ON AR.ActionDetailsId = AFI.ActionDetailsId" +
                        " WHERE (AFI.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                        " AND (ADI.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                        " AND (ADI.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                        " AND (AFI.FollowUpUserId IN " + Incondition + ")" +
                        " AND AFI.IsForApproval != 'false' AND AR.IsSubmited = 'true'";

           // alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionsCount");

            var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionsCount");
            OneViewConsole.Debug("GetAllTemplates end", "ActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionsCount");

            var TotalCount = 0;
            if (Result != null && Result.length > 0) {
                TotalCount = Result[0].TotalCount;
            }
            //alert('TotalCount : ' + TotalCount);
            return TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionsCount", Excep);
        }
    }


    this.GetUnSyncApprovedActionResolveCount = function (ServiceId, DcPlaceId, TemplateNodeId, ActionFollowUpApprovalProfileTempList) {

        try {
            OneViewConsole.Debug("GetUnSyncApprovedActionResolveCount start", "ActionFollowupApprovalPlaceSelectionDAO.GetUnSyncApprovedActionResolveCount");

            var Incondition;
            if (ActionFollowUpApprovalProfileTempList != -1) {
                Incondition = "(";

                for (var i = 0; i < ActionFollowUpApprovalProfileTempList.length; i++) {
                    Incondition += ActionFollowUpApprovalProfileTempList[i].FollowUpUserId;
                    Incondition += (i <= ActionFollowUpApprovalProfileTempList.length - 2) ? "," : ")";
                }
            }
            else {
                Incondition = -1;
            }

            var Query = "SELECT Count(*) AS TotalCount FROM ActionFollowUpInfoEntity AS AFI" +
                        " INNER JOIN ActionDataCaptureInfoEntity AS ADI ON AFI.ActionDataCaptureInfoId = ADI.Id" +
                        " INNER JOIN ActionResolveEntity AS AR ON AR.ActionDetailsId = AFI.ActionDetailsId" +
                        " WHERE (AFI.ServiceId = " + ServiceId + " OR -1=" + ServiceId + ")" +
                        " AND (ADI.TemplateNodeId = " + TemplateNodeId + " OR -1=" + TemplateNodeId + ")" +
                        " AND (ADI.DcPlaceId = " + DcPlaceId + " OR -1=" + DcPlaceId + ")" +
                        " AND (AFI.FollowUpUserId IN " + Incondition + ")" +
                        " AND AR.IsSynchronized = 'false' AND AR.IsSubmited = 'true'";

           // alert('Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetUnSyncApprovedActionResolveCount");

            var Result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

           // alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "ActionFollowupApprovalPlaceSelectionDAO.GetUnSyncApprovedActionResolveCount");
            OneViewConsole.Debug("GetUnSyncApprovedActionResolveCount end", "ActionFollowupApprovalPlaceSelectionDAO.GetUnSyncApprovedActionResolveCount");

            var TotalCount = 0;
            if (Result != null && Result.length > 0) {
                TotalCount = Result[0].TotalCount;
            }

            return TotalCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetUnSyncApprovedActionResolveCount", Excep);
        }
    }

    this.GetApprovedActionResolveEntityByActionResolveClientGuid = function (ApproveActionResolveInfo) {

        try {
            OneViewConsole.Debug("GetApprovedActionResolveEntityByActionResolveClientGuid start", "ActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityByActionResolveClientGuid");


            var Incondition = "(";

            for (var i = 0; i < ApproveActionResolveInfo.length; i++) {
                var ClientGuid = "'" + ApproveActionResolveInfo[i].ClientGuid + "'";
                Incondition += ClientGuid;
                Incondition += (i <= ApproveActionResolveInfo.length - 2) ? "," : ")";
            }

            var Query = "SELECT * FROM ActionResolveEntity WHERE IsOnDeviceApprovalFinished = 'true' AND ClientGuid IN " + Incondition;
           // alert('GetApprovedActionResolveEntityByActionResolveClientGuid Query : ' + Query);
            OneViewConsole.DataLog("Requested Query : " + Query, "ActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityByActionResolveClientGuid");

            var ActionResolveResponse = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

         //   alert('ActionResolveResponse : ' + JSON.stringify(ActionResolveResponse));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(ActionResolveResponse), "ActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityByActionResolveClientGuid");
            OneViewConsole.Debug("GetAllResolvedActions end", "ActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityByActionResolveClientGuid");

            return ActionResolveResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityByActionResolveClientGuid", Excep);
        }
    }


}

// ActionFollowupApprovalUploadBO
function ActionFollowupApprovalUploadBO($scope, xlatService) {

    var MyInstance = this;

    /// <summary>
    /// Bulk Upload for particular user
    /// </summary>  
    this.BulkUpload = function (FilterParamLst, ActionFollowUpApprovalProfileTempList, IsTemplateView, Limit) {

        var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

        try {
            oSetDefaultSpinner.Start();
           
            var IsSuccess = true;

            OneViewConsole.Debug("BulkUpload start", "ActionFollowupApprovalUploadBO.BulkUpload");
           // alert('FilterParamLst : ' + JSON.stringify(FilterParamLst));
            if (FilterParamLst.length > 0) {

                var _oActionFollowupApprovalPlaceSelectionDAO = new ActionFollowupApprovalPlaceSelectionDAO();

                var ApproveActionResolveInfo = _oActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionResolveInfoForUpload(FilterParamLst, ActionFollowUpApprovalProfileTempList, IsTemplateView, Limit);

                if (ApproveActionResolveInfo.length > 0) {

                    Update_UnSync_ActionResolve_ProcessCount();
                    var ActionResolveEntityLst = _oActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityForUpload(ApproveActionResolveInfo);
                  //  alert('ActionResolveEntityLst : ' + JSON.stringify(ActionResolveEntityLst));
                    var ActionResolveApprovalEntityList = _oActionFollowupApprovalPlaceSelectionDAO.GetActionResolveApprovalEntityForUpload(ApproveActionResolveInfo);
                  //  alert('ActionResolveApprovalEntityList : ' + JSON.stringify(ActionResolveApprovalEntityList));
                    if (ActionResolveEntityLst.length > 0) {

                        Update_UnSync_MultiMediaSubElementsProcessCount();
                        var MultiMediaSubElementLst = GetAll_UnSync_MultiMediaSubElements();
                    //    alert('MultiMediaSubElementLst : ' + JSON.stringify(MultiMediaSubElementLst));
                        var oUploadrequest = {
                            "ActionResolveEntityLst": ActionResolveEntityLst,
                            "MultiMediaMappingLst": MultiMediaSubElementLst,
                            "ActionResolveApprovalEntityList": ActionResolveApprovalEntityList
                        };

                        //alert(JSON.stringify(oUploadrequest));  

                        var _oActionFollowupApprovalPlaceSelectionIL = new ActionFollowupApprovalPlaceSelectionIL();
                        var oUploadResponse = _oActionFollowupApprovalPlaceSelectionIL.Upload(oUploadrequest);

                       // alert(JSON.stringify(oUploadResponse));
                       // alert('IsAnyException : ' + oUploadResponse.IsAnyException);

                        if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

                            try {
                                _oOneViewSqlitePlugin.StartTransaction();

                                Update_Upload_Response(oUploadResponse);
                                
                                _oActionFollowupApprovalPlaceSelectionDAO.DeleteAllResolvedActions(ApproveActionResolveInfo);
                                
                                _oOneViewSqlitePlugin.EndTransaction();

                                alert(xlatService.xlat('UploadSuccess'));
                                OneViewConsole.Info("Upload success", "ActionFollowupApprovalUploadBO.BulkUpload");
                            }
                            catch (Excep) {
                                alert(xlatService.xlat('UploadFailedLocal'));
                                OneViewConsole.Info("Upload failed local", "ActionFollowupApprovalUploadBO.BulkUpload");
                                _oOneViewSqlitePlugin.Rollback();
                                IsSuccess = false;
                            }
                        }
                        else {
                            OneViewConsole.Info("Upload failed", "ActionFollowupApprovalUploadBO.BulkUpload");
                            IsSuccess = false;
                        }
                    }
                    else {
                        alert(xlatService.xlat('NoDataForUpload'));
                        OneViewConsole.Info("No dc available", "ActionFollowupApprovalUploadBO.BulkUpload");
                    }
                }
                else {
                    alert(xlatService.xlat('NoDataForUpload'));
                    OneViewConsole.Info("No dc available", "ActionFollowupApprovalUploadBO.BulkUpload");
                }
            }
            else {
                alert(xlatService.xlat('NoDataForUpload'));
                OneViewConsole.Info("No dc available", "ActionFollowupApprovalUploadBO.BulkUpload");
            }

            OneViewConsole.Debug("Upload end", "ActionFollowupApprovalUploadBO.BulkUpload");
            oSetDefaultSpinner.Stop();

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalUploadBO.BulkUpload", Excep);
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
            OneViewConsole.Debug("Update_UnSync_ActionResolve_ProcessCount start", "ActionFollowupApprovalUploadBO.Update_UnSync_ActionResolve_ProcessCount");

            // Update ProcessCount in DcResultDetailsEntity
            new DefaultMasterDAO("ActionResolveEntity").UpdateProcessCountForUnsyncData();

            OneViewConsole.Debug("Update_UnSync_ActionResolve_ProcessCount end", "ActionFollowupApprovalUploadBO.Update_UnSync_ActionResolve_ProcessCount");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalUploadBO.Update_UnSync_ActionResolve_ProcessCount", Excep);
        }
    }


    /// <summary>
    /// Update_Upload_Response
    /// </summary> 
    var Update_Upload_Response = function (oUploadResponse) {

        try {
            OneViewConsole.Debug("Update_Uploaded_Rco_Response start", "ActionFollowupApprovalUploadBO.Update_Uploaded_Rco_Response");

           // alert('oUploadResponse : ' + JSON.stringify(oUploadResponse));
           // alert('oUploadResponse.ActionResolveResponceStatusDTOLst : ' + oUploadResponse.ActionResolveResponceStatusDTOLst);
           // alert('oUploadResponse.MultiMediaMappingResponceLst : ' + oUploadResponse.MultiMediaMappingResponceLst);
           // alert('oUploadResponse.ActionResolveApprovalResponceLst : ' + oUploadResponse.ActionResolveApprovalResponceLst);
            // Update server id's in ActionResolveEntity                      
            if (oUploadResponse.ActionResolveResponceStatusDTOLst.length != 0) {
                var oDefaultRcoMasterDAO = new DefaultMasterDAO("ActionResolveEntity");
                oDefaultRcoMasterDAO.UpdateMasterServerIds(oUploadResponse.ActionResolveResponceStatusDTOLst);
            }
            if (oUploadResponse.MultiMediaMappingResponceLst.length > 0) {
                Update_MultiMediaSubElements_Response(oUploadResponse.MultiMediaMappingResponceLst);
            }
            if (oUploadResponse.ActionResolveApprovalResponceLst.length > 0) {
                Update_ActionResolveApproval_Response(oUploadResponse.ActionResolveApprovalResponceLst);
            }

            OneViewConsole.Debug("Update_Uploaded_Rco_Response end", "ActionFollowupApprovalUploadBO.Update_Uploaded_Rco_Response");
        }
        catch (Excep) {
          //  alert('Update_Upload_Response Excep : ' + Excep);
          //  alert('Update_Upload_Response Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalUploadBO.Update_Uploaded_Rco_Response", Excep);
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
            OneViewConsole.Debug("Update_UnSync_MultiMediaSubElementsProcessCount start", "ActionFollowupApprovalUploadBO.Update_UnSync_MultiMediaSubElementsProcessCount");

            // Update ProcessCount in MultiMediaSubElements
            new DefaultMasterDAO("MultiMediaSubElements").UpdateProcessCountForUnsyncData();

            OneViewConsole.Debug("Update_UnSync_MultiMediaSubElementsProcessCount end", "ActionFollowupApprovalUploadBO.Update_UnSync_MultiMediaSubElementsProcessCount");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalUploadBO.Update_UnSync_MultiMediaSubElementsProcessCount", Excep);
        }
    }


    /// <summary>
    /// GetAll_UnSync_MultiMediaSubElements
    /// </summary>
    var GetAll_UnSync_MultiMediaSubElements = function () {

        try {
            OneViewConsole.Debug("GetAll_UnSync_MultiMediaSubElements start", "ActionFollowupApprovalUploadBO.GetAll_UnSync_MultiMediaSubElements");

            // Get all un-sync GetAll_UnSync_MultiMediaSubElements
            var MultiMediaSubElementsList = new DefaultMasterDAO("MultiMediaSubElements").GetAllUnSyncMasters();

            OneViewConsole.Debug("GetAll_UnSync_MultiMediaSubElements end", "ActionFollowupApprovalUploadBO.GetAll_UnSync_MultiMediaSubElements");

            return MultiMediaSubElementsList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalUploadBO.GetAll_UnSync_MultiMediaSubElements", Excep);
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
            OneViewConsole.Debug("Update_MultiMediaSubElements_Response start", "ActionFollowupApprovalUploadBO.Update_MultiMediaSubElements_Response");
            // alert(MultiMediaSubElementsResponseDTO.length);
            // Update server id's in MultiMediaBlobSubElements                      
            if (MultiMediaSubElementsResponseDTO.length != 0) {
                var oDefaultRcoMasterDAO = new DefaultMasterDAO("MultiMediaSubElements");
                oDefaultRcoMasterDAO.UpdateMasterServerIds(MultiMediaSubElementsResponseDTO);
            }
            OneViewConsole.Debug("Update_MultiMediaSubElements_Response end", "ActionFollowupApprovalUploadBO.Update_MultiMediaSubElements_Response");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalUploadBO.Update_MultiMediaBlobSubElements_Response", Excep);
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

            OneViewConsole.Debug("BulkUpload start", "ActionFollowupApprovalUploadBO.BulkUpload");

            if (FilterParamLst.length > 0) {

                oOneViewProgressbar.Start(xlatService.xlat("Synchronization in-progress"));

                var _oActionFollowupApprovalPlaceSelectionDAO = new ActionFollowupApprovalPlaceSelectionDAO();

                var ApproveActionResolveInfo = _oActionFollowupApprovalPlaceSelectionDAO.GetAllApprovedActionResolveInfoForUpload(FilterParamLst, FollowUpUserId, IsTemplateView, Limit);

                if (ApproveActionResolveInfo.length > 0) {

                    Update_UnSync_ActionResolve_ProcessCount();
                    var ActionResolveEntityLst = _oActionFollowupApprovalPlaceSelectionDAO.GetApprovedActionResolveEntityForUpload(ApproveActionResolveInfo);

                    if (ActionResolveEntityLst.length > 0) {

                        Update_UnSync_MultiMediaSubElementsProcessCount();
                        var MultiMediaSubElementLst = GetAll_UnSync_MultiMediaSubElements();

                        var oUploadrequest = {
                            "ActionResolveEntityLst": ActionResolveEntityLst,
                            "MultiMediaMappingLst": MultiMediaSubElementLst
                        };

                        //alert(JSON.stringify(oUploadrequest));

                        var _oActionFollowupApprovalPlaceSelectionIL = new ActionFollowupApprovalPlaceSelectionIL();
                        var oUploadResponse = _oActionFollowupApprovalPlaceSelectionIL.Upload(oUploadrequest);

                        //alert(JSON.stringify(oUploadResponse));
                        //alert(oUploadResponse.IsAnyException);

                        if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

                            try {
                                _oOneViewSqlitePlugin.StartTransaction();

                                Update_Upload_Response(oUploadResponse);

                                _oActionFollowupApprovalPlaceSelectionDAO.DeleteAllResolvedActions(ApproveActionResolveInfo);

                                _oOneViewSqlitePlugin.EndTransaction();

                                //alert(xlatService.xlat('UploadSuccess'));
                                OneViewConsole.Info("Upload success", "ActionFollowupApprovalUploadBO.BulkUpload");
                            }
                            catch (Excep) {
                                //alert(xlatService.xlat('UploadFailedLocal'));
                                OneViewConsole.Info("Upload failed local", "ActionFollowupApprovalUploadBO.BulkUpload");
                                _oOneViewSqlitePlugin.Rollback();
                                IsSuccess = false;
                            }
                        }
                        else {
                            OneViewConsole.Info("Upload failed", "ActionFollowupApprovalUploadBO.BulkUpload");
                            IsSuccess = false;
                        }
                    }
                    else {
                        alert(xlatService.xlat('NoDataForUpload'));
                        OneViewConsole.Info("No dc available", "ActionFollowupApprovalUploadBO.BulkUpload");
                    }
                }
                else {
                    //alert(xlatService.xlat('NoDataForUpload'));
                    OneViewConsole.Info("No dc available", "ActionFollowupApprovalUploadBO.BulkUpload");
                }
            }
            else {
               // alert(xlatService.xlat('NoDataForUpload'));
                OneViewConsole.Info("No dc available", "ActionFollowupApprovalUploadBO.BulkUpload");
            }

            OneViewConsole.Debug("Upload end", "ActionFollowupApprovalUploadBO.BulkUpload");
           // oSetDefaultSpinner.Stop();
            oOneViewProgressbar.Stop();
            return IsSuccess;
        }
        catch (Excep) {
            oOneViewProgressbar.Stop();
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalUploadBO.BulkUpload", Excep);
            return false;
        }
        finally {
        }
    }

    /// <summary>
    /// Update_ActionResolveApproval_Response
    /// </summary>
    /// <param name="ActionResolveApprovalResponseDTO">ActionResolveApprovalResponseDTO</param>
    var Update_ActionResolveApproval_Response = function (ActionResolveApprovalResponseDTO) {

        try {
            OneViewConsole.Debug("Update_ActionResolveApproval_Response start", "ActionFollowupApprovalUploadBO.Update_ActionResolveApproval_Response");
            // alert(ActionResolveApprovalResponseDTO.length);
            // Update server id's in MultiMediaBlobSubElements                      
            if (ActionResolveApprovalResponseDTO.length != 0) {
                var oDefaultRcoMasterDAO = new DefaultMasterDAO("ActionResolveApprovalEntity");
                oDefaultRcoMasterDAO.UpdateMasterServerIds(ActionResolveApprovalResponseDTO);
            }
            OneViewConsole.Debug("Update_ActionResolveApproval_Response end", "ActionFollowupApprovalUploadBO.Update_ActionResolveApproval_Response");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalUploadBO.Update_ActionResolveApproval_Response", Excep);
        }
        finally {
            oDefaultRcoMasterDAO = null;
        }
    }

}

// ActionFollowupApprovalPlaceSelectionIL
function ActionFollowupApprovalPlaceSelectionIL() {

    var MyInstance = this;

    // UploadDcIL object
    var MyInstance = this;

    /// <summary>
    /// Upload
    /// </summary>
    /// <param name="UploadReq">UploadReq</param>
    this.Upload = function (UploadReq) {

        try {
            OneViewConsole.Debug("Upload start", "ActionFollowupApprovalPlaceSelectionIL.Upload");

            var RequestParam = JSON.stringify(UploadReq);

            OneViewConsole.DataLog("RequestParam : " + RequestParam, "ActionFollowupApprovalPlaceSelectionIL.Upload");

            var _oOneViewChannel = new OneViewChannel();
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/UploadApprovedActionResolve_Json";
           
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
           // alert('  _oOneViewChannel.parameter : ' + JSON.stringify(_oOneViewChannel.parameter));
            var oUploadResponse = _oOneViewChannel.Send({ "ShowExceptionMessage": false });
            
            OneViewConsole.Debug("Upload end", "UploadDcIL.Upload");
          //  alert('oUploadResponse : ' + oUploadResponse);

            if (oUploadResponse != null) {               
               
                oUploadResponse = JSON.parse(oUploadResponse.UploadApprovedActionResolve_JsonResult);

                OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUploadResponse), "ActionFollowupApprovalPlaceSelectionIL.Upload");
            }

            return oUploadResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "ActionFollowupApprovalPlaceSelectionIL.Upload", Excep);
        }
        finally {
            RequestParam = null;
            _oOneViewChannel = null;
            oUploadResponse = null;
        }
    }
}