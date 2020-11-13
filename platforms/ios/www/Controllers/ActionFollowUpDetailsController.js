
// ActionFollowUpDetailsController
var oxlatService = null;
var FollowupPageData = {
    ActionDetailsId: 0,
    Id: 0,
    Name :'',
    IsTemplateView: '',
    AttributeName: '',
    CurrentPage :0
};

MyApp.controller('ActionFollowUpDetailsController', function ($scope, $document, xlatService, $location, $compile, $timeout) {
  
    $scope.ActionDetailsList;
    $scope.MyActionId = "";
    $scope.MyActionName = "";
    $scope.MyActionIsTemplateView = "";
    oxlatService = xlatService;

        var _oActionFollowUpDetailsFacade = new ActionFollowUpDetailsFacade({ 'scope': $scope, 'document': $document, 'Mylocation': $location, 'xlatService': xlatService, 'compile': $compile, '$timeout': $timeout });

        _oActionFollowUpDetailsFacade.Init();
        _oActionFollowUpDetailsFacade.PageLoad();

        
        $scope.SaveClick = function () {

            _oActionFollowUpDetailsFacade.SaveClick();
        }

        $scope.PreviousClick = function () {

            _oActionFollowUpDetailsFacade.PreviousClick();
        }

        $scope.NextClick = function () {

            _oActionFollowUpDetailsFacade.NextClick();
        }


        $scope.Back = function () {            
            _oActionFollowUpDetailsFacade.BackClick();
        }

        $scope.AttachPicture = function () {
            var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
            _oOneViewCordovaCameraPlugin.CaptureImage(function (_ImageURL) {
                _oActionFollowUpDetailsFacade.AttachPicture(_ImageURL);
            });
        }

        $scope.PreviewDC = function () {           
            _oActionFollowUpDetailsFacade.PreviewDC();
        }

})

// ActionFollowUpDetailsFacade
function ActionFollowUpDetailsFacade(parm) {

    var MyInstance = this;
    var $scope = parm.scope;
    var $document = parm.document;
    var $location = parm.Mylocation;
    var xlatService = parm.xlatService;
    var $compile = parm.compile;
    var $timeout = parm.$timeout;

    var _ActionFollowUpDetailsBO = new ActionFollowUpDetailsBO({ 'scope': $scope, 'xlatService': xlatService, 'compile': $compile, '$timeout': $timeout });

    /// <summary>
    /// Page initialization
    /// </summary> 
    this.Init = function () {
        try {
            OneViewConsole.Debug("Init start", "ActionFollowUpDetailsFacade.Init");

         
            $scope.DisablePrevious = true;
            //$scope.DisableNext = true;
            $scope.NextButton = "Close";
          
            // xlatService.setCurrentPage('MyAudit_Page');
            xlatService.setCurrentPage('12');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
       

            $scope.CurrentActionFollowUpDetails = [{

                FollowUpUserName: "",
                ActionDetailsId:"",
                ActionName: "",
                ActionComments: "",
                ActionRaisedDate: "",
                RectificationTime: "",
                ActionRaisedUserName: "",
                ActionNCRuleInfo: "",
                ActionAttributeInfo: "",
               // ActionMultimediaSubElementsInfo: "",
                AttributeNames: "",
                DcPlaceName: "",
                DcPlaceMaterializedPath: "",
                DcPlaceNameHierarchy: "",
                TemplateNodeName: "",
                AttributeNames: "",
                Comments: "",
                Id:"",
                ActionStatus: 0,
                ActionResolveClientId: "",
                IsAllActions: "",
                ServiceId: "",
                ActionId: "",
                FollowUpUserId: "",
                ActionMultimediaClientGuids: "",
                ActionDetailsMultimediaClientGuids: "",
                ClientGuid:"",
                ActionNCRuleInfo:""             

            },

            ];
            $scope.CurrentPage = 0;
            $scope.PageCount = 0;
            $scope.ActionMultiMediaSubElements = [];

            $scope.MultiMediaSubElements = [];

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            if (ServiceId == 36 || ServiceId == 5 || ServiceId == 40 || ServiceId == 6 || ServiceId == 7 || ServiceId == 12 || ServiceId == 14 || ServiceId == 26 || ServiceId == 29 || ServiceId == 37 || ServiceId == 38 || ServiceId == 43 || ServiceId == 45 || ServiceId == 46 || ServiceId == 52) {
                $scope.HidePreviewButton = true;
            }
            else {
                $scope.HidePreviewButton = false;
            }


            var IsHidePreviewButton = _ActionFollowUpDetailsBO.IsNeedtoHidePreviewButton();
            if (IsHidePreviewButton == true) {
                $scope.HidePreviewButton = true;
            }
            OneViewConsole.Debug("Init end", "ActionFollowUpDetailsFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsFacade.Init", xlatService);
        }
    }


    /// <summary>
    /// Page load event registration
    /// </summary>    
    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "ActionFollowUpDetailsFacade.PageLoad");

            var ActionDetailsId = $location.search().ActionDetailsId;
            $scope.MyActionId = $location.search().Id;
            $scope.MyActionName = $location.search().Name;
            $scope.MyActionIsTemplateView = $location.search().IsTemplateView;
            var AttributeName = $location.search().AttributeName;
 
           
            $scope.ActionDetailsList = _ActionFollowUpDetailsBO.MakeActionDetailsId(ActionDetailsId);
            _ActionFollowUpDetailsBO.LoadActionFollowUpDetails($scope.ActionDetailsList[0]);
            
            if ($scope.ActionDetailsList.length > 0) {
                $scope.CurrentPage = 1;
                $scope.PageCount = $scope.ActionDetailsList.length;
                if ($scope.ActionDetailsList.length > 1) {
                    //$scope.DisableNext = false;
                    $scope.NextButton = "Next";
                }
                else {
                    $scope.NextButton = "Close";
                }
            }

            //document.getElementById('DivParentHierarchy').innerHTML = AttributeName;
            
            MyInstance.LoadFollowupData(ActionDetailsId, $scope.MyActionId,$scope.MyActionName, $scope.MyActionIsTemplateView, AttributeName);
           
            if ($location.search().CurrentPage != undefined) {
                $scope.CurrentPage = parseInt($location.search().CurrentPage);
               // alert('$scope.CurrentPage : ' + $scope.CurrentPage);
               // alert('$scope.PageCount : ' + $scope.PageCount);
            }
            if ($scope.CurrentPage > 1) {
                var n = $scope.CurrentPage;
                $scope.CurrentPage = 1;
                for (var i = 2 ; i <= n ; i++) {
                    MyInstance.NextClick();
                }
            }
            OneViewConsole.Debug("PageLoad end", "ActionFollowUpDetailsFacade.PageLoad");
        }
        catch (Excep) {
           // alert("PageLoad: " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsFacade.PageLoad", xlatService);
        }
        finally {
            _oDataCaptureBO = null;
        }
    }

    this.LoadFollowupData = function (ActionDetailsId, MyActionId, MyActionName, MyActionIsTemplateView, AttributeName) {
        try {
            // alert(ActionDetailsId + "," + MyActionId + "," + MyActionName + "," + MyActionIsTemplateView + "," + AttributeName);
            FollowupPageData.ActionDetailsId = ActionDetailsId;
            FollowupPageData.Id = MyActionId;
            FollowupPageData.Name = MyActionName;
            FollowupPageData.IsTemplateView = MyActionIsTemplateView;
            FollowupPageData.AttributeName = AttributeName;
            FollowupPageData.CurrentPage = $scope.CurrentPage;
           // alert('FollowupPageData : ' + JSON.stringify(FollowupPageData));
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsFacade.LoadFollowupData", xlatService);
        }
    }

    /// <summary>
    /// Save
    /// </summary>  
    this.SaveClick = function () {
        try {

          _ActionFollowUpDetailsBO.Save($scope.CurrentActionFollowUpDetails[0]);

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsFacade.SaveClick", xlatService);
        }
    }


    /// <summary>
    /// Previous
    /// </summary>  
    this.PreviousClick = function () {
        try {

            //alert('PreviousClick')
            MyInstance.SaveClick();            
            if ($scope.CurrentPage > 1) {
                $scope.CurrentPage -= 1;
                _ActionFollowUpDetailsBO.LoadActionFollowUpDetails($scope.ActionDetailsList[$scope.CurrentPage - 1]);
                if ($scope.CurrentPage == 1) {
                    $scope.DisablePrevious = true;
                }
                if ($scope.PageCount > 1) {
                    //$scope.DisableNext = false;
                    $scope.NextButton = "Next";
                }
                else {
                    $scope.NextButton = "Close";
                }
            }

            FollowupPageData.CurrentPage = $scope.CurrentPage;
           
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsFacade.PreviousClick", xlatService);
        }
    }


    /// <summary>
    /// Next
    /// </summary>  
    this.NextClick = function () {
        try {
            //alert('NextClick')

            MyInstance.SaveClick();

            if ($scope.NextButton == "Close") {
                MyInstance.BackClick();
            }
            if ($scope.CurrentPage != $scope.PageCount) {
                $scope.CurrentPage += 1;
                FollowupPageData.CurrentPage = $scope.CurrentPage;
                _ActionFollowUpDetailsBO.LoadActionFollowUpDetails($scope.ActionDetailsList[$scope.CurrentPage - 1]);
                $scope.DisablePrevious = false;
                if ($scope.CurrentPage == $scope.PageCount) {
                    //$scope.DisableNext = true;
                    $scope.NextButton = "Close";
                }              
            }
          
        }
        catch (Excep) {
           // alert("NextClick: " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsFacade.NextClick", xlatService);
        }
    }


    /// <summary>
    /// Back
    /// </summary>  
    this.BackClick = function () {
        try {
            FollowupPageData.CurrentPage = $scope.CurrentPage;
            var Url = 'nav/my-action-followup?Id=' + $scope.MyActionId + '&Name=' + $scope.MyActionName + '&IsTemplateView=' + $scope.MyActionIsTemplateView + '';
            $location.url(Url);

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsFacade.BackClick", xlatService);
        }
    }


    /// <summary>
    /// AttachPicture
    /// </summary>  
    this.AttachPicture = function (LocalURL) {
        try {
            OneViewConsole.Debug("AttachPicture Start", "ActionFollowUpDetailsFacade.AttachPicture");
            // alert("AttachPicture:LocalURL =>" + LocalURL);
            var MultiMediaElement = {
                "Id": 0,
                "MappedEntityClientGuid": "",
                "Dimension": DATEntityType.ActionResolve,
                "MultiMediaType": "image/jpg",
                "LocalURL": LocalURL,
                "AlternateName": "No Image",
                "Comments": "",
                "IsDisabled": false,
            };
            $scope.MultiMediaSubElements.push(MultiMediaElement);     
            _ActionFollowUpDetailsBO.MultiMediaSubElementsList.push(MultiMediaElement);

            $scope.$apply();

            OneViewConsole.Debug("AttachPicture End", "ActionFollowUpDetailsFacade.AttachPicture");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsFacade.AttachPicture", xlatService);
        }
    }


    this.PreviewDC = function () {
        try {
            OneViewConsole.Debug("PreviewDC Start", "ActionFollowUpDetailsFacade.PreviewDC");
           
            var TemplateNodeId = 0;
            var DcId;

           // alert('$scope.CurrentPage : ' + $scope.CurrentPage);
            var ActionDetailId = $scope.ActionDetailsList[$scope.CurrentPage - 1];
            if (ActionDetailId != null) {
                var _oActionFollowUpDetailsDAO = new ActionFollowUpDetailsDAO();
               var response= _oActionFollowUpDetailsDAO.GetDcAndTemplateIdFromActionFollowUp(ActionDetailId);

               //alert('response : ' + JSON.stringify(response));
               if (response != null && response.length > 0) {
                   TemplateNodeId = response[0].TemplateNodeId;
                   //alert('TemplateNodeId : ' + TemplateNodeId);

                   var DcData = new DcDAO().GetDcIdByDcServerId(response[0].DataCaptureServerId);

                   if (DcData != null && DcData.length > 0) {
                       DcId = DcData[0].Id;
                       //alert('DcId : ' + DcId);

                       var URL = '/ActionPreview?TemplateId=' + TemplateNodeId + '&DcId=' + DcId + '&PageName=/nav/my-action-followup-details';

                       $location.url(URL);
                       $scope.$apply();
                   }
                   else {
                       alert('Data capture for preview not found, please contact administrator');
                   }
               }
            }


            OneViewConsole.Debug("PreviewDC End", "ActionFollowUpDetailsFacade.PreviewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsFacade.PreviewDC", xlatService);
        }
    }
       
}

// ActionFollowUpDetailsBO
function ActionFollowUpDetailsBO(InputParm) {

    var MyInstance = this;
    var oScope = InputParm.scope;
    var $compile = InputParm.compile;
    this.MultiMediaSubElementsList = [];
    var xlatService;

    if (InputParm.xlatService != undefined) {
        xlatService = InputParm.xlatService;
    }

    var _oActionFollowUpDetailsDAO = new ActionFollowUpDetailsDAO();
    var _oActionResolveDAO = new ActionResolveDAO();

    this.MakeActionDetailsId = function (ActionDetailsId) {
        try {
            OneViewConsole.Debug("GetActionDetails start", "ActionFollowUpDetailsBO.LoadActionFollowUpPage");

            var ActionDetailsArray = ActionDetailsId.split(",");

            return ActionDetailsArray;

            OneViewConsole.Debug("GetActionDetails end", "ActionFollowUpDetailsBO.LoadActionFollowUpPage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.GetActionDetails", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }

    this.LoadActionFollowUpDetails = function (ActionDetailsId) {
        try {
            OneViewConsole.Debug("MakeActionDetailsId start", "ActionFollowUpDetailsBO.MakeActionDetailsId");

            ActionFollowUpClear();
            //For ActionFollowUpPage
            var ActionFollowUpDetails = _oActionFollowUpDetailsDAO.GetActionFollowUpDetails(ActionDetailsId, OneViewSessionStorage.Get("LoginUserId"));
            LoadActionDetailsinCurrentActionFollowUpDetails(ActionFollowUpDetails);
            //For ActionResolve Data
            var ActionResolveData = _oActionResolveDAO.GetActionResolveId(ActionDetailsId);      
            LoadResolveDetailsinCurrentActionFollowUpDetails(ActionResolveData);
            //For multimedia
            LoadMultimediaSubElements(oScope.CurrentActionFollowUpDetails[0].ClientGuid); 
            SetValues(oScope.CurrentActionFollowUpDetails);
            OneViewConsole.Debug("MakeActionDetailsId end", "ActionFollowUpDetailsBO.MakeActionDetailsId");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.LoadActionFollowUpDetails", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }

    var LoadActionDetailsinCurrentActionFollowUpDetails = function (Details) {
        try {
            OneViewConsole.Debug("LoadActionDetailsinCurrentActionFollowUpDetails start", "ActionFollowUpDetailsBO.LoadActionDetailsinCurrentActionFollowUpDetails");


            if (Details.length > 0) {
             
                var _CurrentActionFollowUpDetails = oScope.CurrentActionFollowUpDetails[0];
                Details = Details[0];
                var ActionName = "";              

                if (Details.CustomAction == "") {
                    ActionName = Details.PredefinedActionName;
                }
                else {
                    ActionName = Details.CustomAction;
                }

                var _oActionNCRuleInfo=JSON.parse(Details.ActionNCRuleInfo);

                oScope.CurrentActionFollowUpDetails[0].FollowUpUserName = Details.FollowUpUserName,
                oScope.CurrentActionFollowUpDetails[0].ActionName = ActionName,
                //.CustomAction = Details.CustomAction,
                oScope.CurrentActionFollowUpDetails[0].ActionComments = Details.ActionComments,
                oScope.CurrentActionFollowUpDetails[0].ActionRaisedDate = Details.ActionRaisedDate,
                oScope.CurrentActionFollowUpDetails[0].RectificationTime = Details.RectificationTime,
                oScope.CurrentActionFollowUpDetails[0].ActionRaisedUserName = Details.ActionRaisedUserName,
                oScope.CurrentActionFollowUpDetails[0].ActionNCRuleInfo = Details.ActionNCRuleInfo,
                oScope.CurrentActionFollowUpDetails[0].ActionAttributeInfo = Details.ActionAttributeInfo,
                //oScope.CurrentActionFollowUpDetails[0].ActionMultimediaSubElementsInfo = Details.ActionMultimediaSubElementsInfo,
                oScope.CurrentActionFollowUpDetails[0].AttributeNames = Details.AttributeNames,
                oScope.CurrentActionFollowUpDetails[0].DcPlaceName = Details.DcPlaceName,
                oScope.CurrentActionFollowUpDetails[0].DcPlaceMaterializedPath = Details.DcPlaceMaterializedPath,
                oScope.CurrentActionFollowUpDetails[0].DcPlaceNameHierarchy = Details.DcPlaceNameHierarchy,
                oScope.CurrentActionFollowUpDetails[0].TemplateNodeName = Details.TemplateNodeName,
                oScope.CurrentActionFollowUpDetails[0].AttributeNames = Details.AttributeNames,
                oScope.CurrentActionFollowUpDetails[0].ActionDetailsId = Details.ActionDetailsId,
                //: "",
                oScope.CurrentActionFollowUpDetails[0].ServiceId = Details.ServiceId,
                oScope.CurrentActionFollowUpDetails[0].ActionId = Details.ActionId,
                oScope.CurrentActionFollowUpDetails[0].FollowUpUserId = Details.FollowUpUserId,
                oScope.CurrentActionFollowUpDetails[0].ActionMultimediaClientGuids = Details.ActionMultimediaClientGuids,
                oScope.CurrentActionFollowUpDetails[0].ActionDetailsMultimediaClientGuids = Details.ActionDetailsMultimediaClientGuids
                oScope.CurrentActionFollowUpDetails[0].ActionNCRuleInfo= JSON.parse(Details.ActionNCRuleInfo);

              
            }

            OneViewConsole.Debug("LoadActionDetailsinCurrentActionFollowUpDetails end", "ActionFollowUpDetailsBO.LoadActionDetailsinCurrentActionFollowUpDetails");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.LoadActionDetailsinCurrentActionFollowUpDetails", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }   

    var LoadResolveDetailsinCurrentActionFollowUpDetails = function (Details) {
        try {
            OneViewConsole.Debug("LoadResolveDetailsinCurrentActionFollowUpDetails start", "ActionFollowUpDetailsBO.LoadResolveDetailsinCurrentActionFollowUpDetails");


            if (Details.length > 0) {
             
                var _CurrentActionFollowUpDetails = oScope.CurrentActionFollowUpDetails[0];
                Details = Details[0];
            
                //ResolveDetails
                oScope.CurrentActionFollowUpDetails[0].Comments = Details.Comments,
                oScope.CurrentActionFollowUpDetails[0].ActionStatus = Details.ActionStatus,
                oScope.CurrentActionFollowUpDetails[0].Id = Details.Id,
                oScope.CurrentActionFollowUpDetails[0].IsAllActions = Details.IsAllActions,
                oScope.CurrentActionFollowUpDetails[0].ClientGuid = Details.ClientGuid
                
            }
            OneViewConsole.Debug("LoadResolveDetailsinCurrentActionFollowUpDetails end", "ActionFollowUpDetailsBO.LoadResolveDetailsinCurrentActionFollowUpDetails");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.LoadResolveDetailsinCurrentActionFollowUpDetails", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }

    var SetValues = function (CurrentActionFollowUpDetails) {
        try {
            OneViewConsole.Debug("SetValues start", "ActionFollowUpDetailsBO.SetValues");
       

            for (var i = 0; i < CurrentActionFollowUpDetails.length; i++) {
                
                //oScope.DcPlaceName = CurrentActionFollowUpDetails[i].DcPlaceName;
                oScope.TemplateNodeName = CurrentActionFollowUpDetails[i].TemplateNodeName;
                oScope.ActionName = CurrentActionFollowUpDetails[i].ActionName;
                oScope.ActionRaisedUserName = CurrentActionFollowUpDetails[i].ActionRaisedUserName;
                oScope.ActionRaisedDate = CurrentActionFollowUpDetails[i].ActionRaisedDate;
                oScope.RectificationTime = CurrentActionFollowUpDetails[i].RectificationTime;
    
                if (CurrentActionFollowUpDetails[i].ActionStatus == 1) {
                    document.getElementById("ActionStatus").checked = true;
                }
                else {
                    document.getElementById("ActionStatus").checked = false;
                }
          
                oScope.Comments = CurrentActionFollowUpDetails[i].Comments;
                SetPlaceNameHierarchy(CurrentActionFollowUpDetails[i].DcPlaceNameHierarchy);
                SetDynamicHtml(CurrentActionFollowUpDetails[i]);
                BindActionMultiMediaSubElement(CurrentActionFollowUpDetails[i].ActionMultimediaClientGuids, CurrentActionFollowUpDetails[i].ActionDetailsMultimediaClientGuids);
            }

            OneViewConsole.Debug("SetValues end", "ActionFollowUpDetailsBO.SetValues");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.SetValues", Excep);
        }
    }

    var SetDynamicHtml = function (CurrentActionFollowUpDetails) {
        try {
            OneViewConsole.Debug("GetActionDetails start", "ActionFollowUpDetailsBO.LoadActionFollowUpPage");
            

            var Html = "";
         

            var _oOneViewCompiler = new OneViewCompiler();
            var  DcPlaceName=CurrentActionFollowUpDetails.DcPlaceName;

            if(DcPlaceName !=""){
             Html += GenerateCommonHTML({Label:"Unit",Answer:DcPlaceName});
            }

            var AttributeNames=CurrentActionFollowUpDetails.AttributeNames;
            if(AttributeNames !=""){

               /* if(AttributeNames !=""  && AttributeNames.indexOf(",")!=-1){

                    var AttributeNamesArray = AttributeNames.split(",");

                    for (var i = 0; i < AttributeNamesArray.length; i++) {
    
                        var AttributeNamesArrayDetails = AttributeNamesArray[i].split("$$");
                   
                         
                        var FindIndex = AttributeNamesArrayDetails.indexOf(":");
                        if (FindIndex !=-1) {
                            Html += GenerateCommonHTML({Label:"Attribute",Answer:AttributeNamesArrayDetails[(FindIndex + 1)]});
                        }
                    }
              
                }*/
                var ActionAttributeInfo=JSON.parse(CurrentActionFollowUpDetails.ActionAttributeInfo);
                for (var i=0;i<ActionAttributeInfo.length;i++){
                    Html += GenerateCommonHTML({Label:"Attribute",Answer: ActionAttributeInfo[i].AttributeNodeName});
                }
            }

            var ActionNCRuleInfo=CurrentActionFollowUpDetails.ActionNCRuleInfo;
            if(AttributeNames !=""){
                //Html += GenerateCommonHTML({Label:"Attribute",Answer:AttributeNames});
                //alert("ActionNCRuleInfo 1: "+ActionNCRuleInfo.DeviatedBy);
                if(ActionNCRuleInfo.ActualValue !=""){
                    Html += GenerateCommonHTML({Label:"Captured Value",Answer:ActionNCRuleInfo.ActualValue});
                }
                if(ActionNCRuleInfo.ExpectedValue !=""){
                    Html += GenerateCommonHTML({Label:"Expected Value",Answer:ActionNCRuleInfo.ExpectedValue});
                }
                if(ActionNCRuleInfo.DeviatedBy !=""){
                    Html += GenerateCommonHTML({Label:"Deviation from Expected",Answer:ActionNCRuleInfo.DeviatedBy});
                }
                if (ActionNCRuleInfo.ActionResponsibleFor != undefined && ActionNCRuleInfo.ActionResponsibleFor != "") {
                    Html += GenerateCommonHTML({ Label: "Responsibility", Answer: ActionNCRuleInfo.ActionResponsibleFor });
                }
            }

            if (Html != "") {
                _oOneViewCompiler.CompileAndApeend(oScope, $compile, Html, "DivDcDetails");
            }
          

            OneViewConsole.Debug("GetActionDetails end", "ActionFollowUpDetailsBO.LoadActionFollowUpPage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.GetActionDetails", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }

    var GenerateCommonHTML=function(Req){
        try {
            OneViewConsole.Debug("GenerateCommonHTML start", "ActionFollowUpDetailsBO.GenerateCommonHTML");

            var Label=Req.Label;
            var Answer=Req.Answer;
           
            var Html = '<div class="item no-padding">' +
                      '<div class="row">' +
                      '<div class="col col-33 padding stable-bg border-right text-right">' + xlatService.xlat(Label) + ' </div>' +
                      '<div class="col padding">' + Answer + '</div>' +
                      '</div>' +
                      '</div>';

         
            return Html;

            OneViewConsole.Debug("GenerateCommonHTML end", "ActionFollowUpDetailsBO.GenerateCommonHTML");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.GenerateCommonHTML", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }

    this.Save = function (CurrentActionFollowUpDetails) {
        try {
            OneViewConsole.Debug("Save start", "ActionFollowUpDetailsBO.Save");


            CurrentActionFollowUpDetails = SetValuesinCurrentActionFollowUpDetails(CurrentActionFollowUpDetails);
            if (CurrentActionFollowUpDetails.ActionStatus == 1) {
                if (ActionFollowUpMandatoryValidation(CurrentActionFollowUpDetails)) {
                    if (CurrentActionFollowUpDetails.Id == "") {
                        var _oActionResolveEntity = ActionResolveNormalize(CurrentActionFollowUpDetails);
                        _oActionResolveDAO.Create(_oActionResolveEntity);
                        //ShowDefaultJavaScriptAlert("Saved Successfully");
                    }
                    else {
                        Update(CurrentActionFollowUpDetails);
                        //ShowDefaultJavaScriptAlert("Updated Successfully");
                    }
                    var ActionResolveData = _oActionResolveDAO.GetActionResolveId(CurrentActionFollowUpDetails.ActionDetailsId);
                    LoadResolveDetailsinCurrentActionFollowUpDetails(ActionResolveData);
                    CreateMultiMediaSubElements(CurrentActionFollowUpDetails);
                    LoadMultimediaSubElements(oScope.CurrentActionFollowUpDetails[0].ClientGuid);
                }
                //else {
                //    ShowDefaultJavaScriptAlert("Please select Resolve Details");
                //}
            }
            else {
                if (CurrentActionFollowUpDetails.ActionDetailsId != undefined && CurrentActionFollowUpDetails.ActionDetailsId != "") {
                    var ActionResolveData = _oActionResolveDAO.GetActionResolveId(CurrentActionFollowUpDetails.ActionDetailsId);
                   // alert('ActionResolveData  : ' + JSON.stringify(ActionResolveData));
                    if (ActionResolveData != undefined && ActionResolveData.length > 0  && ActionResolveData[0].ServerId != 0) {
                       // alert('disable');
                        DisableActionResolve(CurrentActionFollowUpDetails);
                    }
                    else if (CurrentActionFollowUpDetails.Id != "") {
                       // alert('delete');
                        DeleteActionResolve(CurrentActionFollowUpDetails);
                    }
                    LoadResolveDetailsinCurrentActionFollowUpDetails(ActionResolveData);
                }
            }

            OneViewConsole.Debug("Save end", "ActionFollowUpDetailsBO.Save");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.Save", Excep);
        }
    }

    var Update = function (CurrentActionFollowUpDetails) {
        try {
            OneViewConsole.Debug("Update start", "ActionFollowUpDetailsBO.Update");

            var _oActionResolveDAO = new ActionResolveDAO();
            _oActionResolveDAO.UpdateByActionDetailsId(CurrentActionFollowUpDetails.ActionDetailsId, CurrentActionFollowUpDetails.Comments, CurrentActionFollowUpDetails.ActionStatus);

            OneViewConsole.Debug("Update end", "ActionFollowUpDetailsBO.Update");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.Update", Excep);
        }
    }

    var DisableActionResolve = function (CurrentActionFollowUpDetails) {
        try {
            OneViewConsole.Debug("DisableActionResolve start", "ActionFollowUpDetailsBO.DisableActionResolve");

            var _oActionResolveDAO = new ActionResolveDAO();
            _oActionResolveDAO.DisableByActionDetailsId(CurrentActionFollowUpDetails.ActionDetailsId, CurrentActionFollowUpDetails.Comments, CurrentActionFollowUpDetails.ActionStatus);
            
            var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
            _oMultiMediaSubElementsDAO.DisableByMappedEntityClientGuid(CurrentActionFollowUpDetails.ActionDetailsId);

            OneViewConsole.Debug("DisableActionResolve end", "ActionFollowUpDetailsBO.DisableActionResolve");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.DisableActionResolve", Excep);
        }
    }

    var DeleteActionResolve = function (CurrentActionFollowUpDetails) {
        try {
            OneViewConsole.Debug("DeleteActionResolve start", "ActionFollowUpDetailsBO.DeleteActionResolve");

            var _oActionResolveDAO = new ActionResolveDAO();
            _oActionResolveDAO.DeleteActionDetailsId(CurrentActionFollowUpDetails.ActionDetailsId);

            var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
            _oMultiMediaSubElementsDAO.DeleteByMappedEntityClientGuid(CurrentActionFollowUpDetails.ClientGuid);

            OneViewConsole.Debug("DeleteActionResolve end", "ActionFollowUpDetailsBO.DeleteActionResolve");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.DeleteActionResolve", Excep);
        }
    }


    var ActionResolveNormalize = function (CurrentActionFollowUpDetails) {
        try {
            OneViewConsole.Debug("ActionResolveNormalize start", "ActionFollowUpDetailsBO.ActionResolveNormalize");
           
            var _oActionResolveEntity = new ActionResolveEntity();

            var oDateTime = new DateTime();
            var CurrentDateAndTime = oDateTime.GetDateAndTime();

            _oActionResolveEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oActionResolveEntity.ServiceId = CurrentActionFollowUpDetails.ServiceId;
            _oActionResolveEntity.MobileVersionId = 1;
            _oActionResolveEntity.ActionId = CurrentActionFollowUpDetails.ActionId;

            _oActionResolveEntity.IsAllActions = CurrentActionFollowUpDetails.IsAllActions;
            _oActionResolveEntity.ActionDetailsId = CurrentActionFollowUpDetails.ActionDetailsId;
            _oActionResolveEntity.FollowUpUserId = CurrentActionFollowUpDetails.FollowUpUserId;
            _oActionResolveEntity.FollowUpUserName = CurrentActionFollowUpDetails.FollowUpUserName;

            _oActionResolveEntity.ActionStatus = CurrentActionFollowUpDetails.ActionStatus;
            _oActionResolveEntity.Comments = CurrentActionFollowUpDetails.Comments;
            _oActionResolveEntity.IsSynchronized = "false";

            _oActionResolveEntity.ActionResolveDate = (CurrentActionFollowUpDetails.ActionStatus === 1) ? CurrentDateAndTime : "";
            _oActionResolveEntity.CreatedDate = CurrentDateAndTime;
            
            OneViewConsole.Debug("ActionResolveNormalize end", "ActionFollowUpDetailsBO.ActionResolveNormalize");

            return _oActionResolveEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.ActionResolveNormalize", Excep);
        }
    }

    var ActionFollowUpClear = function () {
        try {
            OneViewConsole.Debug("Clear start", "ActionFollowUpDetailsBO.Clear");

          document.getElementById("ActionStatus").checked=false;
          oScope.Comments = "";
          oScope.MultiMediaSubElements = [];
          MyInstance.MultiMediaSubElementsList = [];
          oScope.CurrentActionFollowUpDetails[0].Id = "";
          oScope.CurrentActionFollowUpDetails[0].Comments = "";
          oScope.CurrentActionFollowUpDetails[0].ActionStatus = 0;
          oScope.CurrentActionFollowUpDetails[0].ClientGuid = "";
          var node = document.getElementById('DivDcPlaceNameHierarchy');
          while (node.hasChildNodes()) {
              node.removeChild(node.firstChild);
          }
          var DivDcDetailsnode = document.getElementById('DivDcDetails');
          while (DivDcDetailsnode.hasChildNodes()) {
            DivDcDetailsnode.removeChild(DivDcDetailsnode.firstChild);
          }

          OneViewConsole.Debug("Clear end", "ActionFollowUpDetailsBO.Save");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.Clear", Excep);
        }
    }

    var SetValuesinCurrentActionFollowUpDetails = function (CurrentActionFollowUpDetails) {

        try {
            OneViewConsole.Debug("SetValuesinCurrentActionFollowUpDetails start", "ActionFollowUpDetailsBO.SetValuesinCurrentActionFollowUpDetails");
  
            if (document.getElementById("ActionStatus").checked==true) {
                CurrentActionFollowUpDetails.ActionStatus = 1;
            }
            else {
                CurrentActionFollowUpDetails.ActionStatus = 0;
            }           
            CurrentActionFollowUpDetails.Comments = oScope.Comments;


            return CurrentActionFollowUpDetails;

            OneViewConsole.Debug("SetValuesinCurrentActionFollowUpDetails end", "ActionFollowUpDetailsBO.SetValuesinCurrentActionFollowUpDetails");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.SetValuesinCurrentActionFollowUpDetails", Excep);
        }
         
    }
          
    var ShowDefaultJavaScriptAlert = function (Msg) {

        try {
            OneViewConsole.Debug("ShowDefaultJavaScriptAlert Start", "ActionFollowUpDetailsBO.ShowDefaultJavaScriptAlert");

            alert(Msg);

            OneViewConsole.Debug("ShowDefaultJavaScriptAlert End", "ActionFollowUpDetailsBO.ShowDefaultJavaScriptAlert");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsBO.ShowDefaultJavaScriptAlert", LVxlatService);
        }
    }

    var ActionFollowUpMandatoryValidation = function (CurrentActionFollowUpDetails) {
        try {
            OneViewConsole.Debug("ActionFollowUpMandatoryValidation Start", "ActionFollowUpDetailsBO.ActionFollowUpMandatoryValidation");

            var ISSuccess = true;
            if (CurrentActionFollowUpDetails.Id == "" && CurrentActionFollowUpDetails.ActionStatus == 0 && CurrentActionFollowUpDetails.Comments == "") {
                ISSuccess = false;
            }
           
            return ISSuccess;

            OneViewConsole.Debug("ActionFollowUpMandatoryValidation End", "ActionFollowUpDetailsBO.ActionFollowUpMandatoryValidation");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsBO.ActionFollowUpMandatoryValidation", LVxlatService);
        }
    }

    var SetPlaceNameHierarchy = function (DcPlaceNameHierarchy) {
        try {
            OneViewConsole.Debug("GetActionDetails start", "ActionFollowUpDetailsBO.LoadActionFollowUpPage");

            if(DcPlaceNameHierarchy !=""  && DcPlaceNameHierarchy.indexOf(",")!=-1){

                var PlaceNameHierarchyArray = DcPlaceNameHierarchy.split(",");
                var Html = "";
         

                var _oOneViewCompiler = new OneViewCompiler();
          
                for (var i = 0; i < PlaceNameHierarchyArray.length; i++) {

                    var PlaceNameHierarchyDetails = PlaceNameHierarchyArray[i].split("$$");
               
                     
                    var FindIndex = PlaceNameHierarchyDetails.indexOf(":");
                    if (FindIndex !=-1) {
                        Html += GenerateHtmlForPlaceName(PlaceNameHierarchyDetails, FindIndex);
                    }
                }
       
          

                if (Html != "") {
                    _oOneViewCompiler.CompileAndApeend(oScope, $compile, Html, "DivDcPlaceNameHierarchy");
                }
                //return ActionDetailsArray;
            }

            OneViewConsole.Debug("GetActionDetails end", "ActionFollowUpDetailsBO.LoadActionFollowUpPage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.GetActionDetails", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }

    var GenerateHtmlForPlaceName = function (PlaceNameHierarchyDetails, Index) {
        try {
            OneViewConsole.Debug("GenerateHtmlForPlaceName start", "ActionFollowUpDetailsBO.GenerateHtmlForPlaceName");

           
            var Html = '<div class="item no-padding">' +
                      '<div class="row">' +
                      '<div class="col col-33 padding stable-bg border-right text-right">' + oxlatService.xlat(PlaceNameHierarchyDetails[(Index - 1)]) + ' </div>' +
                      '<div class="col padding">' + oxlatService.xlat(PlaceNameHierarchyDetails[(Index + 1)]) + '</div>' +
                      '</div>' +
                      '</div>';

         
            return Html;

          

            OneViewConsole.Debug("GenerateHtmlForPlaceName end", "ActionFollowUpDetailsBO.GenerateHtmlForPlaceName");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.GenerateHtmlForPlaceName", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }

    var BindActionMultiMediaSubElement = function (ActionMultimediaClientGuids,ActionDetailsMultimediaClientGuids) {
        try {
            OneViewConsole.Debug("BindActionMultiMediaSubElement start", "ActionFollowUpDetailsBO.BindActionMultiMediaSubElement");

            var MultiMediaClientGuid=[];

            //if(ActionDetailsMultimediaClientGuids !=""  ){
            //    if(ActionDetailsMultimediaClientGuids.indexOf(",")!=-1){
            //        MultiMediaClientGuid.concat(ActionDetailsMultimediaClientGuids.split(","));                    
            //    }
            //    else{
            //        MultiMediaClientGuid.push(ActionDetailsMultimediaClientGuids);
            //    }
            //}         
            if(ActionMultimediaClientGuids !="" ){
             
                if(ActionMultimediaClientGuids.indexOf(",")!=-1){
                  
                    var ActionMultimediaClientGuidsArray = ActionMultimediaClientGuids.split(",");
                    for (var Multimedia in ActionMultimediaClientGuidsArray) {
                        if (ActionMultimediaClientGuidsArray[Multimedia] != "" && ActionMultimediaClientGuidsArray[Multimedia] != null && ActionMultimediaClientGuidsArray[Multimedia] != 'null') {
                            MultiMediaClientGuid.push(ActionMultimediaClientGuidsArray[Multimedia]);
                        }
                    }
                }
                else{
                    MultiMediaClientGuid.push(ActionMultimediaClientGuids);
                }
            }          
            if(MultiMediaClientGuid.length>0){
                oScope.ActionMultiMediaSubElements=_oActionFollowUpDetailsDAO.LoadActionMultiMediaSubElements(MultiMediaClientGuid);
            }           
          
            OneViewConsole.Debug("BindActionMultiMediaSubElement end", "ActionFollowUpDetailsBO.BindActionMultiMediaSubElement");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.BindActionMultiMediaSubElement", Excep);
        }
        finally {
            MultiMediaClientGuid = null;
          
        }
    }

    var LoadMultimediaSubElements = function (MappedClientGuid) {
        try {

            if (MappedClientGuid != "") {
            
                var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
                var MultiMediaSubElementsResult = _oMultiMediaSubElementsDAO.GetMultiMediaSubElements(MappedClientGuid);

               
                oScope.MultiMediaSubElements = [];
                MyInstance.MultiMediaSubElementsList = [];
                for (var i = 0; i < MultiMediaSubElementsResult.length; i++) {

                    oScope.MultiMediaSubElements.push({
                        "Id": MultiMediaSubElementsResult[i].Id,
                        "MappedEntityClientGuid": MultiMediaSubElementsResult[i].MappedEntityClientGuid,
                        "Dimension": MultiMediaSubElementsResult[i].Dimension,
                        "MultiMediaType": "image/jpg",
                        "LocalURL": MultiMediaSubElementsResult[i].LocalURL,
                        "AlternateName": "No Image",
                        "Comments": MultiMediaSubElementsResult[i].Comments,
                        "IsDisabled": false,
                    });
                }
            }
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AirlineComplaintSampleFacade.LoadMultimediaSubElements", xlatService);
        }
    }

    var CreateMultiMediaSubElements = function (CurrentActionFollowUpDetails) {

        try {
           
            for (var i = 0; i < MyInstance.MultiMediaSubElementsList.length; i++) {

                //if (DcId == null) {
                    MyInstance.MultiMediaSubElementsList[i].MappedEntityClientGuid = CurrentActionFollowUpDetails.ClientGuid;
                //}

                if (MyInstance.MultiMediaSubElementsList[i].Id == 0 && (MyInstance.MultiMediaSubElementsList[i].IsDisabled == false || MyInstance.MultiMediaSubElementsList[i].IsDisabled == 'false')) {

                    var oDateTime = new DateTime();
                    var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                    var _oMultiMediaSubElements = new MultiMediaSubElements();

                    _oMultiMediaSubElements.ClientGuid = OneViewUniqueGenerator.GetGuid();
                    _oMultiMediaSubElements.MobileVersionId = 1;
                    _oMultiMediaSubElements.ServiceId = OneViewSessionStorage.Get("ServiceId");

                    _oMultiMediaSubElements.MappedEntityClientGuid = MyInstance.MultiMediaSubElementsList[i].MappedEntityClientGuid;
                    _oMultiMediaSubElements.Dimension = MyInstance.MultiMediaSubElementsList[i].Dimension;
                    _oMultiMediaSubElements.MultiMediaType = MyInstance.MultiMediaSubElementsList[i].MultiMediaType;
                    _oMultiMediaSubElements.LocalURL = MyInstance.MultiMediaSubElementsList[i].LocalURL;

                    _oMultiMediaSubElements.Comments = MyInstance.MultiMediaSubElementsList[i].Comments;
                    _oMultiMediaSubElements.CreatedDate = CurrenntDateAndTime;
                    _oMultiMediaSubElements.TimeStamp = CurrenntDateAndTime;
                    _oMultiMediaSubElements.IsSynchronized = "false";
                    _oMultiMediaSubElements.IsMultiMediaSynchronized = "false";
                    _oMultiMediaSubElements.IsDisabled = MyInstance.MultiMediaSubElementsList[i].IsDisabled;

                    var _oDcResultDetailsEntityDAO = new DefaultMasterDAO("MultiMediaSubElements");
                    _oDcResultDetailsEntityDAO.CreateMaster(_oMultiMediaSubElements);
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DataCaptureBO.CreateMultiMediaSubElements", Excep);
        }
    }


    this.IsNeedtoHidePreviewButton = function (Req) {
        try {
            OneViewConsole.Debug("ViewButtonHandler start", "LandingPageFacade.ViewButtonHandler");
            var IsSuccess = false;

            var BusinessEventHandlerObjectKeys = "IsNeedtoHidePreviewButton";
            //var TemplateId = Req.TemplateId;

            var _BusinessEventEntityBO = new BusinessEventEntityBO();
            //   var ViewRecordHandlerObj = { RequiredBusinessEventHandlerObjectKeys: "ValidateImageExistForAction", TemplateId: "" };
            var ReqParameter = { ClassName: "HidePreviewButtonComponent", MethodName: "IsNeedtoHidePreviewButton", RequiredBusinessEventHandlerObjectKeys: {}, IsTemplateValidationRequired: false, TemplateIdLst: "", };
            ReqParameter.RequiredBusinessEventHandlerObjectKeys[BusinessEventHandlerObjectKeys] = "";

            var _BusinessEventEntityBO = new BusinessEventEntityBO();
            var _IsBussinessEventExist = _BusinessEventEntityBO.IsBussinessEventExist(ReqParameter);

            if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys] != undefined) {
                if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys].IsSuccess == true) {
                    IsSuccess = true;
                }

            }

            OneViewConsole.Debug("ViewButtonHandler end", "LandingPageFacade.ViewButtonHandler");
            //alert("IsSuccess : " + IsSuccess);
            // alert(IsSuccess);
            return IsSuccess;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.ViewButtonHandler", xlatService);
        }
    }
}

