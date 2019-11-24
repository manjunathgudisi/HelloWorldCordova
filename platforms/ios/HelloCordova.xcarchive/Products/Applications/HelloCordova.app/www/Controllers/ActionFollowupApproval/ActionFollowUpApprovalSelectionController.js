
// ActionFollowUpApprovalSelectionController
MyApp.controller('ActionFollowUpApprovalSelectionController', function ($scope, $document, xlatService, $timeout, $location, $templateCache, $compile) {

    $scope.MyActionId = "";
    $scope.MyActionName = "";
    $scope.MyActionIsTemplateView = "";

    var _oActionFollowUpApprovalSelectionFacade = new ActionFollowUpApprovalSelectionFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    var HeaderName;
    _oActionFollowUpApprovalSelectionFacade.Init();
    _oActionFollowUpApprovalSelectionFacade.PageLoad();

    $scope.AttributeOnClick = function (ActionDetailsId, AttributeName, TemplateNodeId, DcPlaceDimension) {
        _oActionFollowUpApprovalSelectionFacade.AttributeOnClick(ActionDetailsId, AttributeName, TemplateNodeId, DcPlaceDimension);
    }

    $scope.Back = function () {
        _oActionFollowUpApprovalSelectionFacade.BackClick();
    }
})

// ActionFollowUpApprovalSelectionFacade
function ActionFollowUpApprovalSelectionFacade(parm) {

    var MyInstance = this;
    var $scope = parm.scope;
    var $document = parm.document;
    var $location = parm.Mylocation;
    var xlatService = parm.xlatService;
    var $compile = parm.compile;
    var $timeout = parm.$timeout;

    var _ActionFollowUpApprovalSelectionBO = new ActionFollowUpApprovalSelectionBO({ 'scope': $scope, 'xlatService': xlatService, 'compile': $compile, '$timeout': $timeout });

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "ActionFollowUpApprovalSelectionFacade.Init");

            // xlatService.setCurrentPage('MyAudit_Page');
            xlatService.setCurrentPage('23');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

            OneViewConsole.Debug("Init end", "ActionFollowUpApprovalSelectionFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalSelectionFacade.Init", xlatService);
        }
    }

    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "ActionFollowUpApprovalSelectionFacade.PageLoad");
         
            var PlaceId = $location.search().Id;
            $scope.MyActionId = $location.search().Id;
            $scope.MyActionName = $location.search().Name;
            $scope.MyActionIsTemplateView = $location.search().IsTemplateView;

            var _oMyActionDAO = new MyActionDAO();
            var PLaceNameList = _oMyActionDAO.GetPlacesNameByPlaceId(PlaceId);
            if (PLaceNameList.length > 0) {
                $scope.MyActionName = PLaceNameList[0].PlaceName;
            }

            HeaderName = $scope.MyActionName;
           // alert(' $scope.MyActionId : ' + $scope.MyActionId);
            var ActionFollowUpList = _ActionFollowUpApprovalSelectionBO.LoadActionFollowUpPage($scope.MyActionId);
            GenerateHtml(ActionFollowUpList);

            OneViewConsole.Debug("PageLoad end", "ActionFollowUpApprovalSelectionFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalSelectionFacade.PageLoad", xlatService);
        }
        finally {
            _oDataCaptureBO = null;
        }
    }

    this.AttributeOnClick = function (ActionDetailsId, AttributeName, TemplateNodeId, DcPlaceDimension) {

        try {
           
            if ($scope.MyActionIsTemplateView != true) {
                var Url = '/ActionFollowUpApproval?ActionDetailsId=' + ActionDetailsId + '&PlaceId=' + $scope.MyActionId + '&PlaceName=' + $scope.MyActionName + '&DcPlaceDimension=' + DcPlaceDimension + '&TemplateNodeId=' + TemplateNodeId + '&IsTemplateView=' + $scope.MyActionIsTemplateView + '&AttributeName=' + AttributeName + '';
                //alert('Url : ' + Url);
                //'nav/my-action-followup-details?ActionDetailsId=' + ActionDetailsId + '&Id=' + $scope.MyActionId + '&Name=' + $scope.MyActionName + '&IsTemplateView=' + $scope.MyActionIsTemplateView + '&AttributeName=' + AttributeName + '';
                $location.url(Url);
            }
            else {
                alert('Place View Not implemented')
            }
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.PreControlEvents", xlatService);
        }
    }

    var GenerateHtml = function (ActionFollowUpList) {

        try {
            OneViewConsole.Debug("GenerateHtml start", "ActionFollowUpApprovalSelectionFacade.GenerateHtml");

            var TotalActionCount = 0;
            var TotalResolveCount = 0;
            var TotalApprovedActionsCount = 0;
            if (ActionFollowUpList != undefined) {
                var ContentHtml = "";
                var Html = "";
                //alert('ActionFollowUpList : ' + JSON.stringify(ActionFollowUpList));
                for (var Template in ActionFollowUpList) {
                   
                    var TemplateNodeName = ActionFollowUpList[Template].Name;
                    var TemplateActionCount = ActionFollowUpList[Template].TotalCount;
                    var TemplateResolveCount = ActionFollowUpList[Template].TotalResolveCount;
                    var AttributeDetails = ActionFollowUpList[Template].AttributeDetails;
                    var TemplateApprovedActionsCount = ActionFollowUpList[Template].ApprovedActionsCount;
                    var DcPlaceDimension = ActionFollowUpList[Template].DcPlaceDimension
                    
                    //alert('TemplateApprovedActionsCount : ' + TemplateApprovedActionsCount);
                    TotalActionCount = TotalActionCount + TemplateActionCount;
                    TotalResolveCount = TotalResolveCount + TemplateResolveCount;
                    TotalApprovedActionsCount += TemplateApprovedActionsCount;
                    
                    var AttributeHtml = "";
                  
                    for (var Attribute in AttributeDetails) {                       
                        var AttributeNames = AttributeDetails[Attribute].AttributeNames;
                        var ActionCount = AttributeDetails[Attribute].Count;
                        var ResolveCount = AttributeDetails[Attribute].ResolveCount;
                        var ApprovedActionsCount = AttributeDetails[Attribute].ApprovedActionsCount;
                       // alert('ApprovedActionsCount : ' + ApprovedActionsCount);
                        var ActionDetailsId = AttributeDetails[Attribute].ActionDetailsId;                     

                        AttributeHtml = AttributeHtml + GenerateAttributeBlock(AttributeNames, ResolveCount, ApprovedActionsCount, ActionDetailsId, Template, DcPlaceDimension);

                    }
                    ContentHtml = ContentHtml + GenerateContentBlock(TemplateNodeName, TemplateResolveCount, TemplateApprovedActionsCount, AttributeHtml);
                }
      
                var HeaderHtml = GenerateHeaderHtml(HeaderName, TotalResolveCount, TotalApprovedActionsCount);


                var _oOneViewCompiler = new OneViewCompiler();

                if (HeaderHtml != "") {
                    _oOneViewCompiler.CompileAndApeend($scope, $compile, HeaderHtml, "DivHeader");
                }
                if (ContentHtml != "") {
                    _oOneViewCompiler.CompileAndApeend($scope, $compile, ContentHtml, "DivContent");
                }
            }
            OneViewConsole.Debug("GenerateHtml end", "ActionFollowUpApprovalSelectionFacade.GenerateHtml");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalSelectionFacade.GenerateHtml", xlatService);
        }
        finally {
            ActionFollowUpList = null;
            TemplateBlockHtml = null;
        }
    }

    var GenerateHeaderHtml = function (HeaderName, ResolveCount, ApprovedActionsCount) {

        try {
            OneViewConsole.Debug("GenerateHeaderHtml Start", "LVDefaultAttributeComponent.GenerateHeaderHtml");

            var HeaderHtml = '<span class="light" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"> ' + HeaderName + '</span> <label class="item-input-wrapper"> </label><div class="margin-right light">' + ApprovedActionsCount + '/' + ResolveCount + ' </div>';

            OneViewConsole.Debug("GenerateHeaderHtml End", "LVDefaultAttributeComponent.GenerateHeaderHtml");

            return HeaderHtml;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeComponent.GenerateHeaderHtml", Excep);
        }
    }

    var GenerateContentBlock = function (ContentHeaderName, ResolveCount, ApprovedActionCount, AttributeHtml) {

        try {
            OneViewConsole.Debug("GenerateContentBlock start", "ActionFollowUpApprovalSelectionFacade.GenerateContentBlock");

            var BadgeColor = (ResolveCount == ApprovedActionCount) ? "balanced" : "energized";
            var ContentHeaderHtml = '<div class="list settings"><div class="item item-divider">' + ContentHeaderName + '<span class="badge badge-' + BadgeColor + '">' + ApprovedActionCount + '/' + ResolveCount + ' </span> </div>' + AttributeHtml + '</div>';
           
            OneViewConsole.Debug("GenerateContentBlock end", "ActionFollowUpApprovalSelectionFacade.GenerateContentBlock");

            return ContentHeaderHtml;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalSelectionFacade.GenerateContentBlock", xlatService);
        }
        finally {
            _oDataCaptureBO = null;
        }
    }

    var GenerateAttributeBlock = function (AttributeName, ResolveCount, ApprovedActionsCount, ActionDetailsId, TemplateNodeId, DcPlaceDimension) {

        try {
            OneViewConsole.Debug("GenerateAttributeBlock start", "ActionFollowUpApprovalSelectionFacade.GenerateAttributeBlock");

            var _ActionDetailsId="";
       
            for (var i = 0; i < ActionDetailsId.length; i++) {
                _ActionDetailsId += ActionDetailsId[i]+ ",";
            }

            _ActionDetailsId = _ActionDetailsId.slice(0, -1);
            _ActionDetailsId = "'" + _ActionDetailsId + "'";

            //Todo: Need to enable template wise action followup on server side
            AttributeName = (AttributeName != "") ? AttributeName : "Actions";

            var oAttributeName = "'" + AttributeName + "'";
            var GlobalizedAttributeName = xlatService.xlat(AttributeName);
           // alert('GlobalizedAttributeName : ' + GlobalizedAttributeName);
            var AttributeBlockHtml = '<div class="item item-icon-right" ng-click="AttributeOnClick(' + _ActionDetailsId + ',' + oAttributeName + ',' + TemplateNodeId + ',' + DcPlaceDimension + ')">  <p class="no-margin">' + GlobalizedAttributeName + '</p> <span class="badge badge-light"> ' + ApprovedActionsCount + '/' + ResolveCount + ' </span> <i class="icon icon-angle-right"></i></div>';
                    
            OneViewConsole.Debug("GenerateAttributeBlock end", "ActionFollowUpApprovalSelectionFacade.GenerateAttributeBlock");

            return AttributeBlockHtml;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalSelectionFacade.GenerateAttributeBlock", xlatService);
        }
        finally {
            _oDataCaptureBO = null;
        }
    }
 
    this.BackClick = function () {
        try {

            var Url = '/ActionFollowupApprovalPlaceSelection';
            $location.url(Url);

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalSelectionFacade.BackClick", xlatService);
        }
    }
}

// ActionFollowUpApprovalSelectionBO
function ActionFollowUpApprovalSelectionBO(InputParm) {

    var MyInstance = this;
    var scope = InputParm.scope;
    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
    var _ActionFollowUpDAO = new ActionFollowUpDAO();

    this.LoadActionFollowUpPage = function (Id) {
        try {
            OneViewConsole.Debug("LoadActionFollowUpPage start", "ActionFollowUpApprovalSelectionBO.LoadActionFollowUpPage");
            var Param;

           // alert('ActionFollowUpApprovalProfileTempList : ' + JSON.stringify(ActionFollowUpApprovalProfileTempList));

            var Incondition = "(";

            for (var i = 0; i < ActionFollowUpApprovalProfileTempList.length; i++) {
                Incondition += ActionFollowUpApprovalProfileTempList[i].FollowUpUserId;
                Incondition += (i <= ActionFollowUpApprovalProfileTempList.length - 2) ? "," : ")";
            }


            if (scope.MyActionIsTemplateView == true) {
                Param = { "FollowUpUserId": Incondition, "ServiceId": ServiceId, "TemplateNodeId": Id, "DcPlaceId": -1, "PredefinedActionId": -1 }
            }
            else {
                Param = { "FollowUpUserId": Incondition, "ServiceId": ServiceId, "TemplateNodeId": -1, "DcPlaceId": Id, "PredefinedActionId": -1 }
            }
       
            //alert('Param : ' + JSON.stringify(Param));
            var Result = _ActionFollowUpDAO.GetAllActionFollowUpByFollowUpUsers(Param);
           
            var _ActionFollowUpApprovalSelectionComponent = new ActionFollowUpApprovalSelectionComponent();
            var ActionFollowUpList = _ActionFollowUpApprovalSelectionComponent.FormatActionFollowUpApproval(Result);

            OneViewConsole.Debug("LoadActionFollowUpPage end", "ActionFollowUpApprovalSelectionBO.LoadActionFollowUpPage");

            return ActionFollowUpList;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalSelectionBO.LoadActionFollowUpPage", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }
}

//ActionFollowUpApprovalSelectionComponent
function ActionFollowUpApprovalSelectionComponent() {

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    var _ActionFollowUpDAO = new ActionFollowUpDAO();
    var _oActionResolveDAO = new ActionResolveDAO();

    this.FormatActionFollowUpApproval = function (ActionFollowUpResult) {

        try {
            OneViewConsole.Debug("FormatActionFollowUpApproval start", "ActionFollowUpApprovalSelectionComponent.FormatActionFollowUpApproval");

            var FinalFormattedActionFollowUpDict = {};

            if (ActionFollowUpResult != null) {
                
                if (ActionFollowUpResult.length > 0) {
                    for (var i = 0; i < ActionFollowUpResult.length; i++) {
                       // alert('FinalFormattedActionFollowUpDict : ' + JSON.stringify(FinalFormattedActionFollowUpDict));
                        var PalceId = ActionFollowUpResult[i].DcPlaceId;
                        var TemplateNodeId = ActionFollowUpResult[i].TemplateNodeId;
                        var TemplateNodeName = ActionFollowUpResult[i].TemplateNodeName;
                        var DcPlaceDimension = ActionFollowUpResult[i].DcPlaceDimension;
                        
                        //var AttributeIds = ActionFollowUpResult[i].AttributeIds;
                        var AttributeIds = SelectAttributeId(ActionFollowUpResult[i].AttributeIds);
                        //var AttributeNames = ActionFollowUpResult[i].AttributeNames;
                       //var AttributeNames = SelectAttributeNames(ActionFollowUpResult[i].AttributeNames);
                        var AttributeNames = SelectAttributeNames(ActionFollowUpResult[i].ActionAttributeInfo)
                        //alert(AttributeNames);
                        var ActionDetailsId = ActionFollowUpResult[i].ActionDetailsId;
                        var ResolveCount = GetResolvedActionFollowupCount(ActionDetailsId);

                        var ApprovedActionsCount = _oActionResolveDAO.GetApprovedActionsCount(ActionDetailsId)
                        //alert('ApprovedActionsCount : ' + ApprovedActionsCount);
                       // alert('TemplateNodeId : ' + TemplateNodeId + ' , TemplateNodeName : ' + TemplateNodeName + ' , AttributeIds : ' + AttributeIds + ' , AttributeNames : ' + AttributeNames + ' , ActionDetailsId : ' + ActionDetailsId);
                        if (FinalFormattedActionFollowUpDict[TemplateNodeId] == undefined) {// TemplateDetails not there

                            FinalFormattedActionFollowUpDict[TemplateNodeId] = GenerateTemplateDetails(TemplateNodeId, TemplateNodeName);
                            FinalFormattedActionFollowUpDict[TemplateNodeId].AttributeDetails[AttributeIds] = GenerateAttributeDetails(AttributeIds, AttributeNames, ActionDetailsId);
                        
                        }
                        else if (FinalFormattedActionFollowUpDict[TemplateNodeId].AttributeDetails[AttributeIds] == undefined) {//PlaceID, TemplateDetails is there and AttributeDetails is not there
                            FinalFormattedActionFollowUpDict[TemplateNodeId].TotalCount += 1;
                            FinalFormattedActionFollowUpDict[TemplateNodeId].AttributeDetails[AttributeIds] = GenerateAttributeDetails(AttributeIds, AttributeNames, ActionDetailsId);
                           
                        }
                        else {
                         
                            FinalFormattedActionFollowUpDict[TemplateNodeId].TotalCount += 1;
                            FinalFormattedActionFollowUpDict[TemplateNodeId].AttributeDetails[AttributeIds].Count += 1;                         

                            FinalFormattedActionFollowUpDict[TemplateNodeId].AttributeDetails[AttributeIds].ActionDetailsId.push(ActionDetailsId);
                        }
                        //ResolveCount
                        FinalFormattedActionFollowUpDict[TemplateNodeId].TotalResolveCount += ResolveCount;
                        FinalFormattedActionFollowUpDict[TemplateNodeId].AttributeDetails[AttributeIds].ResolveCount += ResolveCount;


                        var TotalApprovedActionsCount = FinalFormattedActionFollowUpDict[TemplateNodeId].ApprovedActionsCount;
                        if (TotalApprovedActionsCount != null && TotalApprovedActionsCount != undefined) {
                            TotalApprovedActionsCount += ApprovedActionsCount;
                        }
                        else {
                            TotalApprovedActionsCount = ApprovedActionsCount;
                        }

                        FinalFormattedActionFollowUpDict[TemplateNodeId].ApprovedActionsCount = TotalApprovedActionsCount;
                        FinalFormattedActionFollowUpDict[TemplateNodeId].DcPlaceDimension = DcPlaceDimension;


                        var AprAcCount = FinalFormattedActionFollowUpDict[TemplateNodeId].AttributeDetails[AttributeIds].ApprovedActionsCount;
                        
                        if (AprAcCount != null && AprAcCount != undefined) {
                            AprAcCount += ApprovedActionsCount;
                        }
                        else {
                            AprAcCount = ApprovedActionsCount;
                        }
                        FinalFormattedActionFollowUpDict[TemplateNodeId].AttributeDetails[AttributeIds].ApprovedActionsCount = AprAcCount;
                    }
                }

            }
            
            OneViewConsole.Debug("FormatActionFollowUpApproval start", "ActionFollowUpApprovalSelectionComponent.FormatActionFollowUpApproval");
          //  alert('FinalFormattedActionFollowUpDict : ' + JSON.stringify(FinalFormattedActionFollowUpDict));
            return FinalFormattedActionFollowUpDict;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("ActionFollowUpApprovalSelectionComponent", "ActionFollowUpApprovalSelectionComponent.GetAllDC", Excep);
        }
    }

    var GenerateTemplateDetails = function (TemplateNodeId, TemplateNodeName) {

        try {
            OneViewConsole.Debug("GenerateTemplateDetails start", "ActionFollowUpApprovalSelectionComponent.GenerateTemplateDetails");
            var TemplateDetails = {
                "Id": TemplateNodeId,
                "Name": TemplateNodeName,
                "TotalCount": 1,
                "TotalResolveCount": 0,
                "AttributeDetails": {}
            }
           // alert('TemplateDetails : ' + JSON.stringify(TemplateDetails));
            OneViewConsole.Debug("GenerateTemplateDetails End", "ActionFollowUpApprovalSelectionComponent.GenerateTemplateDetails");

            return TemplateDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("ActionFollowUpApprovalSelectionComponent", "ActionFollowUpApprovalSelectionComponent.GenerateTemplateDetails", Excep);
        }
    }

    var GenerateAttributeDetails = function (AttributeIds, AttributeNames, ActionDetailsId) {

        try {
            OneViewConsole.Debug("GenerateAttributeDetails start", "ActionFollowUpApprovalSelectionComponent.GenerateAttributeDetails");

            var AttributeDetails = {
                "AttributeIds": AttributeIds,
                "AttributeNames": AttributeNames,
                "ActionDetailsId": [ActionDetailsId],
                "Count": 1,
                "ResolveCount": 0
            }
           // alert('AttributeDetails : ' + JSON.stringify(AttributeDetails));
            OneViewConsole.Debug("GenerateAttributeDetails End", "ActionFollowUpApprovalSelectionComponent.GenerateAttributeDetails");

            return AttributeDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("ActionFollowUpApprovalSelectionComponent", "ActionFollowUpApprovalSelectionComponent.GenerateAttributeDetails", Excep);
        }
    }

    var GetResolvedActionFollowupCount = function (ActionId) {

        try {
            OneViewConsole.Debug("GetResolvedActionFollowupCount start", "ActionFollowUpApprovalSelectionComponent.GetResolvedActionFollowupCount");

            var Param = { "FollowUpUserId": LoginUserId, "ServiceId": ServiceId, "ActionId": ActionId }

            var GetResolvedActionFollowupCount = _oActionResolveDAO.GetResolvedActionsCount(ActionId)
                       
            OneViewConsole.Debug("GetResolvedActionFollowupCount end", "ActionFollowUpApprovalSelectionComponent.GetResolvedActionFollowupCount");

            return GetResolvedActionFollowupCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("ActionFollowUpApprovalSelectionComponent", "ActionFollowUpApprovalSelectionComponent.GetResolvedActionFollowupCount", Excep);
        }
    }

    var SelectAttributeNames_OLD = function (AttributeNames, ActionAttributeInfo) {

        try {
            OneViewConsole.Debug("SelectAttributeNames start", "ActionFollowUpApprovalSelectionComponent.SelectAttributeNames");

            var ListOfAttributeNames = "";

            if (AttributeNames != "" && AttributeNames.indexOf(",") != -1) {

                var AttributeNamesArray = AttributeNames.split(",");

                for (var i = 0; i < AttributeNamesArray.length; i++) {

                    var AttributeNamesList = AttributeNamesArray[i].split("$$");

                    for (var j = 0; j < AttributeNamesList.length; j++) {
                        if (AttributeNamesList[j] != "") {
                            ListOfAttributeNames += AttributeNamesList[j];
                        }
                    }
                }
            }
           
            OneViewConsole.Debug("SelectAttributeNames end", "ActionFollowUpApprovalSelectionComponent.SelectAttributeNames");

            return ListOfAttributeNames;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalSelectionComponent.SelectTemplateNodeName", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }


    var SelectAttributeNames = function (strActionAttributeInfoLst) {

        try {
            var ActionAttributeInfoLst = JSON.parse(strActionAttributeInfoLst);

            OneViewConsole.Debug("SelectAttributeNames start", "ActionFollowUpApprovalSelectionComponent.SelectAttributeNames");
            var ListOfAttributeNames = "";
            for (var i = 0; i < ActionAttributeInfoLst.length; i++)
            {
                
                var ActionAttributeInfo = ActionAttributeInfoLst[i];
                //alert(ActionAttributeInfo.AttributeNodeName);
                var AttributeName = ActionAttributeInfo.AttributeNodeName;
                var AttributeMaterializedPath = ActionAttributeInfo.AttributeNodeNameHierarchy;
                var AttributeParentNameList = AttributeMaterializedPath.split("$$,");
                for (var j = 3; j < AttributeParentNameList.length; j++) {

                    var ParentNameLst = AttributeParentNameList[j].split("$$$$:$$");

                    if (ParentNameLst.length >1) {
                        var ParentName = AttributeParentNameList[j].split("$$$$:$$")[1];
                        ListOfAttributeNames = ListOfAttributeNames + ParentName + " -> ";
                    }
                }
                ListOfAttributeNames = ListOfAttributeNames + AttributeName;

                if (i != ActionAttributeInfoLst.length-1)
                {
                    ListOfAttributeNames = ListOfAttributeNames + " || ";
                }
            }

            OneViewConsole.Debug("SelectAttributeNames end", "ActionFollowUpApprovalSelectionComponent.SelectAttributeNames");

            return ListOfAttributeNames;
        }
        catch (Excep) {
           // alert(JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalSelectionComponent.SelectTemplateNodeName", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }
    var SelectAttributeId = function (AttributeIds) {

        try {
            OneViewConsole.Debug("SelectAttributeId start", "ActionFollowUpApprovalSelectionComponent.SelectAttributeId");

            var ListOfAttributeIds = "";

            if (AttributeIds != "" && AttributeIds.indexOf(",") != -1) {

                var AttributeIdsArray = AttributeIds.split(",");
                
                for (var i = 0; i < AttributeIdsArray.length; i++) {

                    var AttributeIdsList = AttributeIdsArray[i].split("$$");

                    for (var j = 0; j < AttributeIdsList.length; j++) {
                        if (AttributeIdsList[j] != "") {
                            ListOfAttributeIds += AttributeIdsList[j];
                        }
                    }
                }                              
            }
           
            OneViewConsole.Debug("SelectAttributeId end", "ActionFollowUpApprovalSelectionComponent.SelectAttributeId");

            return ListOfAttributeIds;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpApprovalSelectionComponent.SelectAttributeId", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }
}

