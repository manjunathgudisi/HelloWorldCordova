
// ActionFollowUpController
MyApp.controller('ActionFollowUpController', function ($scope, $document, xlatService, $timeout, $location, $templateCache, $compile) {

    $scope.MyActionId = "";
    $scope.MyActionName = "";
    $scope.MyActionIsTemplateView = "";

    var _oActionFollowUpFacade = new ActionFollowUpFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'toaster': '', 'SpinService': '', 'compile': $compile, '$timeout': $timeout });

    var HeaderName;
    _oActionFollowUpFacade.Init();
    _oActionFollowUpFacade.PageLoad();

    $scope.AttributeOnClick = function (ActionDetailsId, AttributeName) {
        _oActionFollowUpFacade.AttributeOnClick(ActionDetailsId, AttributeName);
    }

    $scope.Back = function () {
        _oActionFollowUpFacade.BackClick();
    }
})

// ActionFollowUpFacade
function ActionFollowUpFacade(parm) {

    var MyInstance = this;
    var $scope = parm.scope;
    var $document = parm.document;
    var $location = parm.Mylocation;
    var xlatService = parm.xlatService;
    var $compile = parm.compile;
    var $timeout = parm.$timeout;

    var _ActionFollowUpBO = new ActionFollowUpBO({ 'scope': $scope, 'xlatService': xlatService, 'compile': $compile, '$timeout': $timeout });

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "ActionFollowUpFacade.Init");

            // xlatService.setCurrentPage('MyAudit_Page');
            xlatService.setCurrentPage('12');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

            OneViewConsole.Debug("Init end", "ActionFollowUpFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpFacade.Init", xlatService);
        }
    }

    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "ActionFollowUpFacade.PageLoad");
            
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
        
            var ActionFollowUpList = _ActionFollowUpBO.LoadActionFollowUpPage($scope.MyActionId);
            GenerateHtml(ActionFollowUpList);

            OneViewConsole.Debug("PageLoad end", "ActionFollowUpFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpFacade.PageLoad", xlatService);
        }
        finally {
            _oDataCaptureBO = null;
        }
    }

    this.AttributeOnClick = function (ActionDetailsId, AttributeName) {

        try {
           // alert("AttributeName : " + AttributeName);
            var Url = 'nav/my-action-followup-details?ActionDetailsId=' + ActionDetailsId + '&Id=' + $scope.MyActionId + '&Name=' + $scope.MyActionName + '&IsTemplateView=' + $scope.MyActionIsTemplateView + '&AttributeName=' + AttributeName + '';
            $location.url(Url);
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "BakingBCVerificationFacade.PreControlEvents", xlatService);
        }
    }

    var GenerateHtml = function (ActionFollowUpList) {

        try {
            OneViewConsole.Debug("GenerateHtml start", "ActionFollowUpFacade.GenerateHtml");

            var TotalActionCount = 0;
            var TotalResolveCount = 0;
           
            if (ActionFollowUpList != undefined) {
                var ContentHtml = "";
                var Html = "";
                for (var Template in ActionFollowUpList) {

                    var TemplateNodeName = ActionFollowUpList[Template].Name;
                    var TemplateActionCount = ActionFollowUpList[Template].TotalCount;
                    var TemplateResolveCount = ActionFollowUpList[Template].TotalResolveCount;
                    var AttributeDetails = ActionFollowUpList[Template].AttributeDetails;

                    TotalActionCount = TotalActionCount + TemplateActionCount;
                    TotalResolveCount = TotalResolveCount + TemplateResolveCount;

                    var AttributeHtml = "";
                    for (var Attribute in AttributeDetails) {

                        var AttributeNames = AttributeDetails[Attribute].AttributeNames;
                        var ActionCount = AttributeDetails[Attribute].Count;
                        var ResolveCount = AttributeDetails[Attribute].ResolveCount;
                        
                        var ActionDetailsId = AttributeDetails[Attribute].ActionDetailsId;

                        AttributeHtml = AttributeHtml + GenerateAttributeBlock(AttributeNames, ResolveCount, ActionCount, ActionDetailsId);

                    }
                    ContentHtml = ContentHtml + GenerateContentBlock(TemplateNodeName, TemplateResolveCount, TemplateActionCount, AttributeHtml);
                }
      
                var HeaderHtml = GenerateHeaderHtml(HeaderName, TotalResolveCount, TotalActionCount);


                var _oOneViewCompiler = new OneViewCompiler();

                if (HeaderHtml != "") {
                    _oOneViewCompiler.CompileAndApeend($scope, $compile, HeaderHtml, "DivHeader");
                }
                if (ContentHtml != "") {
                    _oOneViewCompiler.CompileAndApeend($scope, $compile, ContentHtml, "DivContent");
                }
            }
            OneViewConsole.Debug("GenerateHtml end", "ActionFollowUpFacade.GenerateHtml");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpFacade.GenerateHtml", xlatService);
        }
        finally {
            ActionFollowUpList = null;
            TemplateBlockHtml = null;
        }
    }

    var GenerateHeaderHtml = function (HeaderName, ResolveCount, ActionCount) {

        try {
            OneViewConsole.Debug("GenerateHeaderHtml Start", "LVDefaultAttributeComponent.GenerateHeaderHtml");

            var HeaderHtml = '<span class="light" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"> ' + HeaderName + '</span> <label class="item-input-wrapper"> </label><div class="margin-right light">' + ResolveCount + '/' + ActionCount + ' </div>';

            OneViewConsole.Debug("GenerateHeaderHtml End", "LVDefaultAttributeComponent.GenerateHeaderHtml");

            return HeaderHtml;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultAttributeComponent.GenerateHeaderHtml", Excep);
        }
    }

    var GenerateContentBlock = function (ContentHeaderName, ResolveCount, ActionCount, AttributeHtml) {

        try {
            OneViewConsole.Debug("GenerateContentBlock start", "ActionFollowUpFacade.GenerateContentBlock");

            var BadgeColor = (ResolveCount == ActionCount) ? "balanced" : "energized";
            var ContentHeaderHtml = '<div class="list settings"><div class="item item-divider">' + ContentHeaderName + '<span class="badge badge-' + BadgeColor + '">' + ResolveCount + '/' + ActionCount + ' </span> </div>' + AttributeHtml + '</div>';
           
            OneViewConsole.Debug("GenerateContentBlock end", "ActionFollowUpFacade.GenerateContentBlock");

            return ContentHeaderHtml;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpFacade.GenerateContentBlock", xlatService);
        }
        finally {
            _oDataCaptureBO = null;
        }
    }

    var GenerateAttributeBlock = function (AttributeName, ResolveCount, ActionCount, ActionDetailsId) {

        try {
            OneViewConsole.Debug("GenerateAttributeBlock start", "ActionFollowUpFacade.GenerateAttributeBlock");

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
            var AttributeBlockHtml = '<div class="item item-icon-right" ng-click="AttributeOnClick(' + _ActionDetailsId + ',' + oAttributeName + ')">  <p class="no-margin">' + GlobalizedAttributeName + '</p> <span class="badge badge-light"> ' + ResolveCount + '/' + ActionCount + ' </span> <i class="icon icon-angle-right"></i></div>';
                    
            OneViewConsole.Debug("GenerateAttributeBlock end", "ActionFollowUpFacade.GenerateAttributeBlock");

            return AttributeBlockHtml;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpFacade.GenerateAttributeBlock", xlatService);
        }
        finally {
            _oDataCaptureBO = null;
        }
    }
 
    this.BackClick = function () {
        try {

            var Url = 'nav/my-actions';
            $location.url(Url);

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpFacade.BackClick", xlatService);
        }
    }
}

// ActionFollowUpBO
function ActionFollowUpBO(InputParm) {

    var MyInstance = this;
    var scope = InputParm.scope;
    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
    var _ActionFollowUpDAO = new ActionFollowUpDAO();

    this.LoadActionFollowUpPage = function (Id) {
        try {
            OneViewConsole.Debug("LoadActionFollowUpPage start", "ActionFollowUpBO.LoadActionFollowUpPage");
            var Param;

            if (scope.MyActionIsTemplateView == true) {
                Param = { "FollowUpUserId": LoginUserId, "ServiceId": ServiceId, "TemplateNodeId": Id, "DcPlaceId": -1, "PredefinedActionId": -1 }
            }
            else {
                Param = { "FollowUpUserId": LoginUserId, "ServiceId": ServiceId, "TemplateNodeId": -1, "DcPlaceId": Id, "PredefinedActionId": -1 }
            }
       
            var Result = _ActionFollowUpDAO.GetAllActionFollowUp(Param);
            //var Result = TestTabledata;//Want to change

            var _ActionFollowUpComponent = new ActionFollowUpComponent();
            var ActionFollowUpList = _ActionFollowUpComponent.FormatActionFollowUp(Result);

            OneViewConsole.Debug("LoadActionFollowUpPage end", "ActionFollowUpBO.LoadActionFollowUpPage");

            return ActionFollowUpList;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpBO.LoadActionFollowUpPage", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }
}

//ActionFollowUpComponent
function ActionFollowUpComponent() {

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    var _ActionFollowUpDAO = new ActionFollowUpDAO();
    var _oActionResolveDAO = new ActionResolveDAO();

    this.FormatActionFollowUp = function (ActionFollowUpResult) {

        try {
            OneViewConsole.Debug("FormatActionFollowUp start", "ActionFollowUpComponent.FormatActionFollowUp");

            var FinalFormattedActionFollowUpDict = {};

            if (ActionFollowUpResult != null) {

                if (ActionFollowUpResult.length > 0) {
                    for (var i = 0; i < ActionFollowUpResult.length; i++) {
                       
                        var PalceId = ActionFollowUpResult[i].DcPlaceId;
                        var TemplateNodeId = ActionFollowUpResult[i].TemplateNodeId;
                        var TemplateNodeName = ActionFollowUpResult[i].TemplateNodeName;
                        //var AttributeIds = ActionFollowUpResult[i].AttributeIds;
                        var AttributeIds = SelectAttributeId(ActionFollowUpResult[i].AttributeIds);
                        //var AttributeNames = ActionFollowUpResult[i].AttributeNames;
                       //var AttributeNames = SelectAttributeNames(ActionFollowUpResult[i].AttributeNames);
                        var AttributeNames = SelectAttributeNames(ActionFollowUpResult[i].ActionAttributeInfo)
                        //alert(AttributeNames);
                        var ActionDetailsId = ActionFollowUpResult[i].ActionDetailsId;
                        var ResolveCount = GetResolvedActionFollowupCount(ActionDetailsId);

                      
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
                    }
                }

            }
            
            OneViewConsole.Debug("FormatActionFollowUp start", "ActionFollowUpComponent.FormatActionFollowUp");

            return FinalFormattedActionFollowUpDict;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("ActionFollowUpComponent", "ActionFollowUpComponent.GetAllDC", Excep);
        }
    }

    var GenerateTemplateDetails = function (TemplateNodeId, TemplateNodeName) {

        try {
            OneViewConsole.Debug("GenerateTemplateDetails start", "ActionFollowUpComponent.GenerateTemplateDetails");
            var TemplateDetails = {
                "Id": TemplateNodeId,
                "Name": TemplateNodeName,
                "TotalCount": 1,
                "TotalResolveCount": 0,
                "AttributeDetails": {}
            }

            OneViewConsole.Debug("GenerateTemplateDetails End", "ActionFollowUpComponent.GenerateTemplateDetails");

            return TemplateDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("ActionFollowUpComponent", "ActionFollowUpComponent.GenerateTemplateDetails", Excep);
        }
    }

    var GenerateAttributeDetails = function (AttributeIds, AttributeNames, ActionDetailsId) {

        try {
            OneViewConsole.Debug("GenerateAttributeDetails start", "ActionFollowUpComponent.GenerateAttributeDetails");

            var AttributeDetails = {
                "AttributeIds": AttributeIds,
                "AttributeNames": AttributeNames,
                "ActionDetailsId": [ActionDetailsId],
                "Count": 1,
                "ResolveCount": 0
            }

            OneViewConsole.Debug("GenerateAttributeDetails End", "ActionFollowUpComponent.GenerateAttributeDetails");

            return AttributeDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("ActionFollowUpComponent", "ActionFollowUpComponent.GenerateAttributeDetails", Excep);
        }
    }

    var GetResolvedActionFollowupCount = function (ActionId) {

        try {
            OneViewConsole.Debug("GetResolvedActionFollowupCount start", "ActionFollowUpComponent.GetResolvedActionFollowupCount");

            var Param = { "FollowUpUserId": LoginUserId, "ServiceId": ServiceId, "ActionId": ActionId }

            var GetResolvedActionFollowupCount = _oActionResolveDAO.GetResolvedActionsCount(ActionId)
                       
            OneViewConsole.Debug("GetResolvedActionFollowupCount end", "ActionFollowUpComponent.GetResolvedActionFollowupCount");

            return GetResolvedActionFollowupCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("ActionFollowUpComponent", "ActionFollowUpComponent.GetResolvedActionFollowupCount", Excep);
        }
    }

    var SelectAttributeNames_OLD = function (AttributeNames, ActionAttributeInfo) {

        try {
            OneViewConsole.Debug("SelectAttributeNames start", "ActionFollowUpComponent.SelectAttributeNames");

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
           
            OneViewConsole.Debug("SelectAttributeNames end", "ActionFollowUpComponent.SelectAttributeNames");

            return ListOfAttributeNames;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpComponent.SelectTemplateNodeName", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }


    var SelectAttributeNames = function (strActionAttributeInfoLst) {

        try {
            var ActionAttributeInfoLst = JSON.parse(strActionAttributeInfoLst);

            OneViewConsole.Debug("SelectAttributeNames start", "ActionFollowUpComponent.SelectAttributeNames");
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

            OneViewConsole.Debug("SelectAttributeNames end", "ActionFollowUpComponent.SelectAttributeNames");

            return ListOfAttributeNames;
        }
        catch (Excep) {
           // alert(JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpComponent.SelectTemplateNodeName", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }
    var SelectAttributeId = function (AttributeIds) {

        try {
            OneViewConsole.Debug("SelectAttributeId start", "ActionFollowUpComponent.SelectAttributeId");

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
           
            OneViewConsole.Debug("SelectAttributeId end", "ActionFollowUpComponent.SelectAttributeId");

            return ListOfAttributeIds;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpComponent.SelectAttributeId", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }
}

